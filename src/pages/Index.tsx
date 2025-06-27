
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from '@/components/ThemeToggle';
import AnalysisInput from '@/components/AnalysisInput';
import EnhancedAnalysisResults from '@/components/EnhancedAnalysisResults';
import LoadingScreen from '@/components/LoadingScreen';
import { Button } from '@/components/ui/button';
import { ArrowUp, Sparkles, Zap, Target, Brain, TrendingUp, Palette } from 'lucide-react';

interface AnalysisData {
  type: string;
  input: string;
  inputType: string;
  careerGoal?: string;
  experienceLevel?: string;
  industryFocus?: string;
  features?: string[];
  timestamp?: number;
}

const Index = () => {
  const [isDark, setIsDark] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.className = isDark ? 'dark' : 'light';
  }, [isDark]);

  const handleAnalyze = async (data: AnalysisData) => {
    setIsLoading(true);
    setAnalysisData(data);
    
    // Simulate real-time analysis processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    setShowResults(true);
  };

  const resetAnalysis = () => {
    setShowResults(false);
    setAnalysisData(null);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden transition-all duration-600 ease-out">
      {/* Loading Screen */}
      <LoadingScreen isVisible={isLoading} />

      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background/80 transition-all duration-600 ease-out" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl animate-pulse transition-all duration-600 ease-out" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-purple/10 rounded-full blur-3xl animate-pulse transition-all duration-600 ease-out" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-neon-cyan/5 rounded-full blur-3xl animate-pulse transition-all duration-600 ease-out" style={{ animationDelay: '2s' }} />
      
      {/* Header */}
      <header className="relative z-10 w-full border-b border-white/10 glass transition-all duration-600 ease-out">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-brand-500 to-neon-purple rounded-lg flex items-center justify-center transition-all duration-600 ease-out">
                <Brain className="h-4 w-4 text-white transition-all duration-600 ease-out" />
              </div>
              <h1 className="text-xl font-bold text-gradient transition-all duration-600 ease-out">InsightFlow AI</h1>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/portfolio-presets">
                <Button variant="outline" size="sm" className="glass hover:bg-white/10 transition-all duration-300">
                  <Palette className="h-4 w-4 mr-2" />
                  Portfolio Presets
                </Button>
              </Link>
              <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-8 transition-all duration-600 ease-out">
        {!showResults ? (
          <div className="space-y-12">
            {/* Enhanced Hero Section */}
            <section className="text-center space-y-8 py-16 transition-all duration-600 ease-out">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 mb-6 transition-all duration-600 ease-out">
                <Brain className="h-4 w-4 text-neon-purple transition-all duration-600 ease-out" />
                <span className="text-sm text-muted-foreground transition-all duration-600 ease-out">Real-Time AI Career Intelligence</span>
              </div>
              
              <h1 className="text-4xl md:text-7xl font-bold leading-tight transition-all duration-600 ease-out">
                Transform Your
                <span className="text-gradient block transition-all duration-600 ease-out">Career Journey</span>
                <span className="text-3xl md:text-5xl block mt-2 text-muted-foreground">with AI Intelligence</span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed transition-all duration-600 ease-out">
                Get instant AI-driven analysis of your portfolio, LinkedIn, and GitHub. 
                Receive tier-1 company benchmarking, personalized career progression maps, 
                and real-time actionable insights in under 2 seconds.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8">
                {[
                  { icon: Brain, color: 'text-purple-400', label: 'Instant Analysis', desc: '< 2 second results' },
                  { icon: Target, color: 'text-green-400', label: 'Tier-1 Benchmarking', desc: 'Compare to FAANG standards' },
                  { icon: TrendingUp, color: 'text-blue-400', label: 'Real-Time Feedback', desc: 'Live scoring & insights' },
                  { icon: Sparkles, color: 'text-yellow-400', label: 'Actionable Insights', desc: 'Specific improvements' }
                ].map((item, index) => (
                  <div key={index} className="p-4 rounded-xl glass border border-white/10 text-center transition-all duration-600 ease-out hover:border-white/20 group">
                    <item.icon className={`h-8 w-8 ${item.color} mx-auto mb-3 transition-all duration-300 group-hover:scale-110`} />
                    <h3 className="font-medium text-sm mb-1">{item.label}</h3>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap justify-center gap-3 pt-6">
                <div className="px-4 py-2 rounded-full glass border border-green-500/30 text-green-300 text-sm">
                  ⚡ Instant Results
                </div>
                <div className="px-4 py-2 rounded-full glass border border-blue-500/30 text-blue-300 text-sm">
                  🎯 Professional Benchmarks
                </div>
                <div className="px-4 py-2 rounded-full glass border border-purple-500/30 text-purple-300 text-sm">
                  📊 Real-Time Scoring
                </div>
                <div className="px-4 py-2 rounded-full glass border border-yellow-500/30 text-yellow-300 text-sm">
                  🚀 Actionable Insights
                </div>
              </div>

              {/* Portfolio Presets CTA */}
              <div className="mt-12 p-6 rounded-xl glass border border-white/10">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Palette className="h-6 w-6 text-neon-purple" />
                  <h3 className="text-xl font-bold text-gradient">Need a Portfolio Website?</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Choose from our premium portfolio templates. Customize, edit, and download in minutes.
                </p>
                <Link to="/portfolio-presets">
                  <Button className="glow">
                    <Palette className="h-4 w-4 mr-2" />
                    Explore Portfolio Presets
                  </Button>
                </Link>
              </div>
            </section>

            {/* Real-Time Analysis Input */}
            <section className="transition-all duration-600 ease-out">
              <AnalysisInput onAnalyze={handleAnalyze} isLoading={isLoading} />
            </section>
          </div>
        ) : (
          <div className="space-y-6 transition-all duration-600 ease-out">
            {/* Results Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-gradient transition-all duration-600 ease-out">
                Real-Time Analysis Complete
              </h2>
              <Button 
                onClick={resetAnalysis}
                variant="outline" 
                className="glass hover:bg-white/10 transition-all duration-600 ease-out"
              >
                New Analysis
              </Button>
            </div>

            {/* Enhanced Results */}
            {analysisData && <EnhancedAnalysisResults data={analysisData} />}

            {/* Scroll to Top */}
            <div className="fixed bottom-6 right-6 z-50">
              <Button
                onClick={scrollToTop}
                size="icon"
                className="glass hover:bg-white/10 glow transition-all duration-600 ease-out"
              >
                <ArrowUp className="h-4 w-4 transition-all duration-600 ease-out" />
              </Button>
            </div>
          </div>
        )}
      </main>

      {/* Enhanced Footer */}
      <footer className="relative z-10 border-t border-white/10 glass mt-20 transition-all duration-600 ease-out">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-sm text-muted-foreground transition-all duration-600 ease-out">
            <p>© 2024 InsightFlow AI. Empowering careers with real-time intelligence.</p>
            <p className="mt-1 text-xs">Powered by advanced AI and tier-1 company benchmarking</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
