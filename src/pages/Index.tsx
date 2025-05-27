import React, { useState, useEffect } from 'react';
import ThemeToggle from '@/components/ThemeToggle';
import AnalysisInput from '@/components/AnalysisInput';
import AnalysisResults from '@/components/AnalysisResults';
import LoadingScreen from '@/components/LoadingScreen';
import { Button } from '@/components/ui/button';
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
    const root = document.documentElement;
    root.className = isDark ? 'dark' : 'light';
  }, [isDark]);

  const handleAnalyze = async (data: AnalysisData) => {
    setIsLoading(true);
    setAnalysisData(data);
    
    // Simulate 2-second analysis with our loading screen
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
    <div className="min-h-screen bg-background relative overflow-hidden transition-all duration-600 ease-out">
      {/* Loading Screen */}
      <LoadingScreen isVisible={isLoading} />

      {/* Background Effects with smooth transitions */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background/80 transition-all duration-600 ease-out" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl animate-pulse transition-all duration-600 ease-out" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-purple/10 rounded-full blur-3xl animate-pulse transition-all duration-600 ease-out" style={{ animationDelay: '1s' }} />
      
      {/* Header with enhanced transitions */}
      <header className="relative z-10 w-full border-b border-white/10 glass transition-all duration-600 ease-out">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-brand-500 to-neon-purple rounded-lg flex items-center justify-center transition-all duration-600 ease-out">
                <Zap className="h-4 w-4 text-white transition-all duration-600 ease-out" />
              </div>
              <h1 className="text-xl font-bold text-gradient transition-all duration-600 ease-out">InsightFlow</h1>
            </div>
            <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
          </div>
        </div>
      </header>

      {/* Main Content with transition wrapper */}
      <main className="relative z-10 container mx-auto px-4 py-8 transition-all duration-600 ease-out">
        {!showResults ? (
          <div className="space-y-12">
            {/* Hero Section */}
            <section className="text-center space-y-6 py-12 transition-all duration-600 ease-out">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 mb-6 transition-all duration-600 ease-out">
                <Sparkles className="h-4 w-4 text-neon-purple transition-all duration-600 ease-out" />
                <span className="text-sm text-muted-foreground transition-all duration-600 ease-out">Advanced Analysis Platform</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold leading-tight transition-all duration-600 ease-out">
                Elevate Your
                <span className="text-gradient block transition-all duration-600 ease-out">Digital Presence</span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed transition-all duration-600 ease-out">
                Get instant, intelligent analysis of your portfolio websites and LinkedIn profiles. 
                Discover optimization opportunities and compete with industry leaders.
              </p>

              <div className="flex flex-wrap justify-center gap-4 pt-6">
                {[
                  { icon: Target, color: 'text-green-400', label: 'Design Analysis' },
                  { icon: Target, color: 'text-blue-400', label: 'Code Quality' },
                  { icon: Target, color: 'text-purple-400', label: 'SEO Optimization' },
                  { icon: Target, color: 'text-yellow-400', label: 'LinkedIn Insights' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2 px-4 py-2 rounded-lg glass transition-all duration-600 ease-out">
                    <item.icon className={`h-4 w-4 ${item.color} transition-all duration-600 ease-out`} />
                    <span className="text-sm transition-all duration-600 ease-out">{item.label}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Analysis Input */}
            <section className="transition-all duration-600 ease-out">
              <AnalysisInput onAnalyze={handleAnalyze} isLoading={isLoading} />
            </section>
          </div>
        ) : (
          <div className="space-y-6 transition-all duration-600 ease-out">
            {/* Results Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gradient transition-all duration-600 ease-out">Analysis Results</h2>
              <Button 
                onClick={resetAnalysis}
                variant="outline" 
                className="glass hover:bg-white/10 transition-all duration-600 ease-out"
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
                className="glass hover:bg-white/10 glow transition-all duration-600 ease-out"
              >
                <ArrowUp className="h-4 w-4 transition-all duration-600 ease-out" />
              </Button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 glass mt-20 transition-all duration-600 ease-out">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-sm text-muted-foreground transition-all duration-600 ease-out">
            <p>© 2024 InsightFlow. Empowering professionals with intelligent insights.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
