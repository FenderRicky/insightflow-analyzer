-- Create analysis_results table to store user analysis data
CREATE TABLE public.analysis_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  link TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('linkedin', 'github', 'portfolio')),
  score INTEGER NOT NULL CHECK (score >= 0 AND score <= 100),
  feedback JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.analysis_results ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own results
CREATE POLICY "Users can view their own analysis results"
  ON public.analysis_results
  FOR SELECT
  USING (auth.uid() = user_id OR user_id IS NULL);

-- Allow anyone to insert results (for demo purposes without auth)
CREATE POLICY "Anyone can insert analysis results"
  ON public.analysis_results
  FOR INSERT
  WITH CHECK (true);

-- Create index for faster queries
CREATE INDEX idx_analysis_results_user_id ON public.analysis_results(user_id);
CREATE INDEX idx_analysis_results_created_at ON public.analysis_results(created_at DESC);