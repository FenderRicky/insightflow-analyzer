
import React, { useState, useEffect } from 'react';
import ThemeToggle from '@/components/ThemeToggle';
import AnalysisInput from '@/components/AnalysisInput';
import AnalysisResults from '@/components/AnalysisResults';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowUp, Sparkles, Zap, Target } from 'lucide-react';

interface AnalysisData {
  type: string;
  input: string;
  inputType: string;
}

const Index = () => {
  const [isDark, setIsDark] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    document.documentElement.className = isDark ? 'dark' : 'light';
  }, [isDark]);

  const handleAnalyze = async (data: AnalysisData) => {
    setIsLoading(true);
    setAnalysisData(data);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
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
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background/80" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-purple/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      {/* Header */}
      <header className="relative z-10 w-full border-b border-white/10 glass">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-brand-500 to-neon-purple rounded-lg flex items-center justify-center">
                <Zap className="h-4 w-4 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gradient">AnalyzeMe</h1>
              <Badge variant="secondary" className="glass text-xs">
                AI-Powered
              </Badge>
            </div>
            <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-8">
        {!showResults ? (
          <div className="space-y-12">
            {/* Hero Section */}
            <section className="text-center space-y-6 py-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 mb-6">
                <Sparkles className="h-4 w-4 text-neon-purple" />
                <span className="text-sm text-muted-foreground">Advanced AI Analysis</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Elevate Your
                <span className="text-gradient block">Digital Presence</span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Get instant, intelligent analysis of your portfolio websites and LinkedIn profiles. 
                Discover optimization opportunities and compete with industry leaders.
              </p>

              <div className="flex flex-wrap justify-center gap-4 pt-6">
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg glass">
                  <Target className="h-4 w-4 text-green-400" />
                  <span className="text-sm">Design Analysis</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg glass">
                  <Target className="h-4 w-4 text-blue-400" />
                  <span className="text-sm">Code Quality</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg glass">
                  <Target className="h-4 w-4 text-purple-400" />
                  <span className="text-sm">SEO Optimization</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg glass">
                  <Target className="h-4 w-4 text-yellow-400" />
                  <span className="text-sm">LinkedIn Insights</span>
                </div>
              </div>
            </section>

            {/* Analysis Input */}
            <section>
              <AnalysisInput onAnalyze={handleAnalyze} isLoading={isLoading} />
            </section>

            {/* Loading State */}
            {isLoading && (
              <section className="text-center py-12">
                <div className="glass rounded-2xl p-8 max-w-md mx-auto">
                  <div className="w-16 h-16 bg-gradient-to-r from-brand-500 to-neon-purple rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
                    <Zap className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Analyzing Your Content</h3>
                  <p className="text-muted-foreground text-sm">
                    Our AI is examining every detail to provide comprehensive insights...
                  </p>
                </div>
              </section>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {/* Results Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gradient">Analysis Results</h2>
              <Button 
                onClick={resetAnalysis}
                variant="outline" 
                className="glass hover:bg-white/10"
              >
                New Analysis
              </Button>
            </div>

            {/* Results */}
            {analysisData && <AnalysisResults data={analysisData} />}

            {/* Scroll to Top */}
            <div className="fixed bottom-6 right-6 z-50">
              <Button
                onClick={scrollToTop}
                size="icon"
                className="glass hover:bg-white/10 glow"
              >
                <ArrowUp className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 glass mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2024 AnalyzeMe. Empowering professionals with AI-driven insights.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
