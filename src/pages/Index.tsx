
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowUp, Brain, Target, TrendingUp, Zap, Palette, Sparkles, Users, Globe, Award } from 'lucide-react';
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
      throw error;
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
    <div className="min-h-screen bg-background relative overflow-hidden">
      <LoadingScreen isVisible={isLoading} />

      {/* Enhanced background with better performance */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/90" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-purple/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
      
      {/* Enhanced Header */}
      <header className="relative z-10 w-full border-b border-border/50 backdrop-blur-xl bg-background/80 supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-brand-500 to-neon-purple rounded-xl flex items-center justify-center shadow-lg">
                  <Brain className="h-5 w-5 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-brand-500 to-neon-purple bg-clip-text text-transparent">
                  InsightFlow AI
                </h1>
                <p className="text-xs text-muted-foreground">Professional Intelligence</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
              <Link to="/portfolio-presets">
                <Button variant="outline" size="sm" className="group hover:bg-brand-500/10 hover:border-brand-500/30 transition-all duration-300">
                  <Palette className="h-4 w-4 mr-2 group-hover:text-brand-500 transition-colors" />
                  <span className="hidden sm:inline">Portfolio Presets</span>
                  <span className="sm:hidden">Presets</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-8">
        {!showResults ? (
          <div className="space-y-16">
            {/* Enhanced Hero Section */}
            <section className="text-center space-y-8 py-12">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-brand-500/10 to-neon-purple/10 border border-brand-500/20 mb-8">
                <Sparkles className="h-4 w-4 text-brand-500 animate-pulse" />
                <span className="text-sm font-medium bg-gradient-to-r from-brand-500 to-neon-purple bg-clip-text text-transparent">
                  AI-Powered Career Intelligence • Real-Time Analysis
                </span>
                <Sparkles className="h-4 w-4 text-neon-purple animate-pulse delay-500" />
              </div>
              
              <div className="max-w-4xl mx-auto space-y-6">
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight">
                  Transform Your
                  <span className="block bg-gradient-to-r from-brand-500 via-neon-purple to-neon-blue bg-clip-text text-transparent animate-gradient-x">
                    Professional Profile
                  </span>
                  <span className="text-2xl sm:text-3xl md:text-5xl block mt-4 text-muted-foreground font-normal">
                    with AI-Driven Insights
                  </span>
                </h1>
                
                <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  Get comprehensive AI analysis of your GitHub, LinkedIn, and portfolio. 
                  Receive industry benchmarks, personalized recommendations, and actionable insights 
                  to accelerate your career growth.
                </p>
              </div>

              {/* Enhanced Stats */}
              <div className="flex flex-wrap justify-center gap-6 pt-8">
                {[
                  { icon: Users, value: '50K+', label: 'Professionals Analyzed' },
                  { icon: Globe, value: '95%', label: 'Accuracy Rate' },
                  { icon: Award, value: '< 2s', label: 'Analysis Speed' },
                  { icon: TrendingUp, value: '4.9/5', label: 'User Rating' }
                ].map((stat, index) => (
                  <div key={index} className="text-center group">
                    <div className="w-12 h-12 mx-auto mb-2 bg-gradient-to-r from-brand-500/20 to-neon-purple/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <stat.icon className="h-6 w-6 text-brand-500" />
                    </div>
                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Enhanced feature grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto pt-12">
                {[
                  { 
                    icon: Brain, 
                    color: 'from-purple-500 to-pink-500', 
                    label: 'AI-Powered Analysis', 
                    desc: 'Advanced algorithms analyze your content',
                    highlight: 'Instant Results'
                  },
                  { 
                    icon: Target, 
                    color: 'from-green-500 to-emerald-500', 
                    label: 'Industry Benchmarks', 
                    desc: 'Compare against top professionals',
                    highlight: 'Real Data'
                  },
                  { 
                    icon: TrendingUp, 
                    color: 'from-blue-500 to-cyan-500', 
                    label: 'Growth Tracking', 
                    desc: 'Monitor your improvement over time',
                    highlight: 'Progressive'
                  },
                  { 
                    icon: Zap, 
                    color: 'from-yellow-500 to-orange-500', 
                    label: 'Actionable Insights', 
                    desc: 'Get specific steps to improve',
                    highlight: 'Practical'
                  }
                ].map((item, index) => (
                  <div key={index} className="group relative p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-brand-500/30 transition-all duration-500 hover:shadow-xl hover:shadow-brand-500/10">
                    <div className="absolute top-4 right-4">
                      <span className="text-xs px-2 py-1 rounded-full bg-gradient-to-r from-brand-500/20 to-neon-purple/20 text-brand-500 font-medium">
                        {item.highlight}
                      </span>
                    </div>
                    <div className={`w-14 h-14 mx-auto mb-4 bg-gradient-to-r ${item.color} bg-opacity-20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300`}>
                      <item.icon className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2 text-foreground group-hover:text-brand-500 transition-colors">
                      {item.label}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Enhanced Analysis Input */}
            <section className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-brand-500 to-neon-purple bg-clip-text text-transparent">
                  Start Your Professional Analysis
                </h2>
                <p className="text-muted-foreground text-lg">
                  Enter your GitHub, LinkedIn, or portfolio URL to receive comprehensive AI insights
                </p>
              </div>
              <CoreAnalysisInput onAnalyze={handleAnalyze} isLoading={isLoading} />
            </section>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Enhanced Results Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-brand-500/10 to-neon-purple/10 border border-brand-500/20">
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-brand-500 to-neon-purple bg-clip-text text-transparent mb-2">
                  Analysis Complete ✨
                </h2>
                <p className="text-muted-foreground">
                  Your professional profile has been analyzed with AI precision
                </p>
              </div>
              <Button 
                onClick={resetAnalysis}
                variant="outline" 
                className="bg-background/80 hover:bg-brand-500/10 hover:border-brand-500/30 transition-all duration-300"
              >
                <Brain className="h-4 w-4 mr-2" />
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
                className="w-12 h-12 rounded-full bg-gradient-to-r from-brand-500 to-neon-purple hover:shadow-lg hover:shadow-brand-500/25 transition-all duration-300"
              >
                <ArrowUp className="h-5 w-5 text-white" />
              </Button>
            </div>
          </div>
        )}
      </main>

      {/* Enhanced Footer */}
      <footer className="relative z-10 border-t border-border/50 backdrop-blur-xl bg-background/80 mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-brand-500 to-neon-purple rounded-lg flex items-center justify-center">
                <Brain className="h-4 w-4 text-white" />
              </div>
              <span className="font-semibold bg-gradient-to-r from-brand-500 to-neon-purple bg-clip-text text-transparent">
                InsightFlow AI
              </span>
            </div>
            <p className="text-muted-foreground max-w-md mx-auto">
              Empowering careers with AI-driven professional intelligence and real-time insights.
            </p>
            <div className="text-sm text-muted-foreground">
              © 2024 InsightFlow AI. Transforming professional development through artificial intelligence.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
