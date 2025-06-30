import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowUp, Target, TrendingUp, Zap, Palette, Sparkles, Users, Globe, Award, Brain } from 'lucide-react';
import CoreAnalysisInput from '@/components/CoreAnalysisInput';
import AnalysisResultsDisplay from '@/components/AnalysisResultsDisplay';
import LoadingScreen from '@/components/LoadingScreen';
import ThemeToggle from '@/components/ThemeToggle';
import FuturisticLogo from '@/components/FuturisticLogo';
import TierOneRadarChart from '@/components/TierOneRadarChart';
import PortfolioPolish from '@/components/PortfolioPolish';
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
    setTheme(isDark ? 'light' : 'dark');
  };

  // Mock radar data for demonstration
  const radarData = analysisResult ? [
    { skill: 'Technical', userScore: analysisResult.sections[0]?.score || 75, tierOneAvg: 85, maxScore: 100 },
    { skill: 'Documentation', userScore: analysisResult.sections[1]?.score || 70, tierOneAvg: 80, maxScore: 100 },
    { skill: 'Design', userScore: 80, tierOneAvg: 75, maxScore: 100 },
    { skill: 'Communication', userScore: 85, tierOneAvg: 90, maxScore: 100 },
    { skill: 'Innovation', userScore: 78, tierOneAvg: 82, maxScore: 100 }
  ] : [];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <LoadingScreen isVisible={isLoading} />

      {/* Enhanced background with better performance */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/90" />
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      
      {/* Enhanced Header */}
      <header className="relative z-10 w-full border-b border-border/50 backdrop-blur-xl bg-background/80 supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <FuturisticLogo size="md" animate={true} />
            <div className="flex items-center gap-3">
              <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
              <Link to="/portfolio-presets" className="smooth-link">
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
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 mb-8">
                <Sparkles className="h-4 w-4 text-cyan-400 animate-pulse" />
                <span className="text-sm font-medium bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Smart Career Intelligence • Tier 1 Benchmarking • Real-Time Analysis
                </span>
                <Sparkles className="h-4 w-4 text-purple-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
              </div>
              
              <div className="max-w-4xl mx-auto space-y-6">
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight">
                  Transform Your
                  <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient-x">
                    Professional Profile
                  </span>
                  <span className="text-2xl sm:text-3xl md:text-5xl block mt-4 text-muted-foreground font-normal">
                    with Smart Tier 1 Insights
                  </span>
                </h1>
                
                <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  Get comprehensive analysis benchmarked against Tier 1 companies like Google, Meta, and Microsoft. 
                  Receive personalized recommendations, portfolio polish suggestions, and actionable insights 
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
                    <div className="w-12 h-12 mx-auto mb-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <stat.icon className="h-6 w-6 text-cyan-400" />
                    </div>
                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Fixed feature grid with proper spacing and card morphing */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto pt-12 stagger-children">
                {[
                  { 
                    icon: Brain, 
                    color: 'from-purple-500 to-pink-500', 
                    label: 'Smart Analysis', 
                    desc: 'Advanced algorithms analyze actual content',
                    highlight: 'Real Intelligence'
                  },
                  { 
                    icon: Target, 
                    color: 'from-green-500 to-emerald-500', 
                    label: 'Tier 1 Benchmarking', 
                    desc: 'Compare against Google, Meta, Microsoft',
                    highlight: 'Elite Standards'
                  },
                  { 
                    icon: TrendingUp, 
                    color: 'from-blue-500 to-cyan-500', 
                    label: 'Radar Visualization', 
                    desc: 'Dynamic charts show your skill gaps',
                    highlight: 'Visual Insights'
                  },
                  { 
                    icon: Zap, 
                    color: 'from-yellow-500 to-orange-500', 
                    label: 'Portfolio Polish', 
                    desc: 'One-click enhancements ready to apply',
                    highlight: 'Instant Apply'
                  }
                ].map((item, index) => (
                  <div key={index} className="group relative p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-cyan-500/30 transition-all duration-500 hover:shadow-xl hover:shadow-cyan-500/10 card-morph">
                    <div className="absolute top-3 right-3">
                      <span className="text-xs px-3 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 font-medium border border-cyan-500/30">
                        {item.highlight}
                      </span>
                    </div>
                    <div className={`w-14 h-14 mx-auto mb-6 mt-2 bg-gradient-to-r ${item.color} bg-opacity-20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300`}>
                      <item.icon className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-3 text-foreground group-hover:text-cyan-400 transition-colors">
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
                <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  Start Your Tier 1 Analysis
                </h2>
                <p className="text-muted-foreground text-lg">
                  Enter your GitHub, LinkedIn, or portfolio URL for advanced insights benchmarked against top tech companies
                </p>
              </div>
              <CoreAnalysisInput onAnalyze={handleAnalyze} isLoading={isLoading} />
            </section>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Enhanced Results Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-cyan-500/20 card-morph">
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-2">
                  Analysis Complete ✨
                </h2>
                <p className="text-muted-foreground">
                  Your profile analyzed with Tier 1 benchmarking and advanced precision
                </p>
              </div>
              <Button 
                onClick={resetAnalysis}
                variant="outline" 
                className="bg-background/80 hover:bg-cyan-500/10 hover:border-cyan-500/30 transition-all duration-300 smooth-link"
              >
                <Brain className="h-4 w-4 mr-2" />
                New Analysis
              </Button>
            </div>

            {/* Enhanced Results Display with new components */}
            {analysisResult && (
              <div className="space-y-8">
                {/* Tier One Radar Chart */}
                <TierOneRadarChart 
                  data={radarData}
                  overallScore={analysisResult.overallScore}
                  tierOnePercentile={analysisResult.tierOneBenchmark.percentile}
                />

                {/* Portfolio Polish Component */}
                <PortfolioPolish suggestions={analysisResult.portfolioPolishSuggestions} />

                {/* Original Analysis Results */}
                <AnalysisResultsDisplay 
                  result={analysisResult} 
                  analyzedUrl={analyzedUrl}
                />
              </div>
            )}

            {/* Scroll to Top */}
            <div className="fixed bottom-6 right-6 z-50">
              <Button
                onClick={scrollToTop}
                size="icon"
                className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-110 card-morph"
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
            <FuturisticLogo size="sm" animate={false} />
            <p className="text-muted-foreground max-w-md mx-auto">
              Empowering careers with intelligent professional analysis and Tier 1 benchmarking.
            </p>
            <div className="text-sm text-muted-foreground">
              © 2024 InsightFlow. Transforming professional development through intelligent analysis.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
