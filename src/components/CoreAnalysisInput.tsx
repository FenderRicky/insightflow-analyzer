import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Loader2, Sparkles, Github, Linkedin, Globe } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface CoreAnalysisInputProps {
  onAnalyze: (data: any) => void;
  isLoading: boolean;
}

const CoreAnalysisInput = ({ onAnalyze, isLoading }: CoreAnalysisInputProps) => {
  const [url, setUrl] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const { toast } = useToast();

  const detectUrlType = (url: string): string => {
    const lower = url.toLowerCase();
    if (lower.includes('linkedin.com')) return 'linkedin';
    if (lower.includes('github.com')) return 'github';
    return 'portfolio';
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'linkedin': return <Linkedin className="w-5 h-5" />;
      case 'github': return <Github className="w-5 h-5" />;
      default: return <Globe className="w-5 h-5" />;
    }
  };

  const handleAnalyze = async () => {
    if (!url.trim()) {
      toast({
        title: "URL Required",
        description: "Please enter a LinkedIn, GitHub, or portfolio URL",
        variant: "destructive",
      });
      return;
    }

    // Basic URL validation
    try {
      new URL(url);
    } catch {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL starting with http:// or https://",
        variant: "destructive",
      });
      return;
    }

    setAnalyzing(true);
    const type = detectUrlType(url);

    try {
      console.log('Starting analysis for:', url);
      
      const { data, error } = await supabase.functions.invoke('analyze', {
        body: { link: url }
      });

      if (error) {
        console.error('Edge function error:', error);
        throw error;
      }

      console.log('Analysis complete:', data);

      toast({
        title: "✨ Analysis Complete!",
        description: `Your ${type} profile scored ${data.score}/100`,
      });

      // Pass data to parent component
      onAnalyze({ url, type, ...data });

    } catch (error: any) {
      console.error('Analysis failed:', error);
      
      let errorMessage = 'Failed to analyze profile. Please try again.';
      
      if (error.message?.includes('429')) {
        errorMessage = 'Rate limit exceeded. Please wait a moment and try again.';
      } else if (error.message?.includes('402')) {
        errorMessage = 'AI credits exhausted. Please add credits to continue.';
      }

      toast({
        title: "Analysis Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setAnalyzing(false);
    }
  };

  const urlType = url ? detectUrlType(url) : null;

  return (
    <Card className="p-8 glass border-primary/20 backdrop-blur-xl">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30">
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Quick Analysis</h3>
            <p className="text-sm text-muted-foreground">
              Paste your LinkedIn, GitHub, or portfolio URL
            </p>
          </div>
        </div>

        <div className="relative">
          <Input
            type="url"
            placeholder="https://linkedin.com/in/yourprofile or https://github.com/username"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !analyzing && handleAnalyze()}
            className="h-14 px-6 text-base bg-background/50 border-primary/30 focus:border-primary/50"
            disabled={analyzing}
          />
          {urlType && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-muted-foreground">
              {getIcon(urlType)}
              <span className="text-sm capitalize">{urlType}</span>
            </div>
          )}
        </div>

        <Button
          onClick={handleAnalyze}
          disabled={!url.trim() || analyzing}
          className="w-full h-12 text-base bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] hover:bg-[position:100%] transition-all duration-500"
        >
          {analyzing ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Analyzing with AI...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 mr-2" />
              Analyze My Profile
            </>
          )}
        </Button>

        <div className="flex items-center justify-center gap-6 pt-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Linkedin className="w-4 h-4" />
            LinkedIn
          </div>
          <div className="flex items-center gap-2">
            <Github className="w-4 h-4" />
            GitHub
          </div>
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Portfolio
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CoreAnalysisInput;