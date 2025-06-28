
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowUp, Brain, Target, TrendingUp, Zap, Palette } from 'lucide-react';
import CoreAnalysisInput from '@/components/CoreAnalysisInput';
import AnalysisResultsDisplay from '@/components/AnalysisResultsDisplay';
import LoadingScreen from '@/components/LoadingScreen';
import ThemeToggle from '@/components/ThemeToggle';
import { useTheme } from '@/hooks/useTheme';
import { analyzeUrlContent } from '@/utils/realAnalysisEngine';
import type { AnalysisResult } from '@/utils/realAnalysisEngine';

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [analyzedUrl, setAnalyzedUrl] = useState<string>('');
  const [showResults, setShowResults] = useState(false);
  const { theme, setTheme, isDark } = useTheme();

  const handleAnalyze = async (data: { url: string; type: string }) => {
    setIsLoading(true);
    try {
      const result = await analyzeUrlContent(data.url, data.type);
      setAnalysisResult(result);
      setAnalyzedUrl(data.url);
      setShowResults(true);
    } catch (error) {
      console.error('Analysis failed:', error);
      throw error; // Let the input component handle the error display
    } finally {
      setIsLoading(false);
    }
  };

  const resetAnalysis = () => {
    setShowResults(false);
    setAnalysisResult(null);
    setAnalyzedUrl('');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('system');
    } else {
      setTheme('light');
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden transition-colors duration-300">
      {/* Loading Screen */}
      <LoadingScreen isVisible={isLoading} />

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
                <Brain className="h-4 w-4 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gradient">InsightFlow AI</h1>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
              <Link to="/portfolio-presets">
                <Button variant="outline" size="sm" className="glass hover:bg-white/10 dark:hover:bg-white/20">
                  <Palette className="h-4 w-4 mr-2" />
                  Portfolio Presets
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-8">
        {!showResults ? (
          <div className="space-y-12">
            {/* Hero Section */}
            <section className="text-center space-y-8 py-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 mb-6">
                <Brain className="h-4 w-4 text-neon-purple" />
                <span className="text-sm text-muted-foreground">Real-Time AI Career Intelligence</span>
              </div>
              
              <h1 className="text-4xl md:text-7xl font-bold leading-tight">
                Analyze Your
                <span className="text-gradient block">Professional Profile</span>
                <span className="text-3xl md:text-5xl block mt-2 text-muted-foreground">with AI Intelligence</span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                Get instant AI-driven analysis of your GitHub repositories, LinkedIn profile, and portfolio website. 
                Receive professional benchmarking, personalized improvement suggestions, and actionable insights in seconds.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8">
                {[
                  { icon: Brain, color: 'text-purple-400', label: 'Instant Analysis', desc: '< 2 second results' },
                  { icon: Target, color: 'text-green-400', label: 'Professional Benchmarking', desc: 'Compare to industry standards' },
                  { icon: TrendingUp, color: 'text-blue-400', label: 'Real-Time Feedback', desc: 'Live scoring & insights' },
                  { icon: Zap, color: 'text-yellow-400', label: 'Actionable Insights', desc: 'Specific improvements' }
                ].map((item, index) => (
                  <div key={index} className="p-4 rounded-xl glass border border-white/10 text-center hover:border-white/20 group transition-all duration-300">
                    <item.icon className={`h-8 w-8 ${item.color} mx-auto mb-3 transition-all duration-300 group-hover:scale-110`} />
                    <h3 className="font-medium text-sm mb-1 text-white">{item.label}</h3>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Analysis Input */}
            <section>
              <CoreAnalysisInput onAnalyze={handleAnalyze} isLoading={isLoading} />
            </section>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Results Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-gradient">
                Analysis Complete
              </h2>
              <Button 
                onClick={resetAnalysis}
                variant="outline" 
                className="glass hover:bg-white/10 dark:hover:bg-white/20"
              >
                New Analysis
              </Button>
            </div>

            {/* Results Display */}
            {analysisResult && (
              <AnalysisResultsDisplay 
                result={analysisResult} 
                analyzedUrl={analyzedUrl}
              />
            )}

            {/* Scroll to Top */}
            <div className="fixed bottom-6 right-6 z-50">
              <Button
                onClick={scrollToTop}
                size="icon"
                className="glass hover:bg-white/10 dark:hover:bg-white/20 glow"
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
            <p>© 2024 InsightFlow AI. Empowering careers with real-time intelligence.</p>
            <p className="mt-1 text-xs">Powered by advanced AI analysis and professional benchmarking</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
