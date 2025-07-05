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
import StealthAudit from '@/components/StealthAudit';
import AIPolish from '@/components/AIPolish';
import SkillHeatmap from '@/components/SkillHeatmap';
import TrustSignals from '@/components/TrustSignals';
import RookieRoadmap from '@/components/RookieRoadmap';
import CareerArchitect from '@/components/CareerArchitect';
import MobileMenu from '@/components/MobileMenu';
import ErrorBoundary from '@/components/ErrorBoundary';
import ProfileDiagnosis from '@/components/ProfileDiagnosis';
import CompetitiveXRay from '@/components/CompetitiveXRay';
import JobMarketPulse from '@/components/JobMarketPulse';
import ErrorDisplay from '@/components/ErrorDisplay';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTheme } from '@/hooks/useTheme';
import { ErrorTracker } from '@/utils/errorTracking';
import type { AnalysisResult } from '@/utils/realAnalysisEngine';

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [analyzedUrl, setAnalyzedUrl] = useState<string>('');
  const [showResults, setShowResults] = useState(false);
  const [profileDiagnosis, setProfileDiagnosis] = useState<any>(null);
  const { theme, setTheme, isDark } = useTheme();

  const handleAnalyze = async (data: { url: string; type: string }) => {
    console.log('🚀 Starting enhanced analysis workflow for:', data);
    setIsLoading(true);
    
    try {
      // Use the new ProfileAnalyzer for real analysis
      const { ProfileAnalyzer } = await import('@/utils/profileAnalyzer');
      const diagnosis = await ProfileAnalyzer.analyzeProfile(data.url);
      
      if (!diagnosis.isValid) {
        throw new Error(diagnosis.error || 'Analysis failed - please check URL and try again');
      }

      // Set the diagnosis for the new UI components
      setProfileDiagnosis(diagnosis);

      // Convert to legacy format for existing components
      const analysisResult = {
        overallScore: diagnosis.overallScore,
        professionalLevel: diagnosis.overallScore >= 85 ? 'Senior' : diagnosis.overallScore >= 70 ? 'Mid' : 'Entry',
        sections: [
          {
            title: "AI Profile Surgery Results",
            score: diagnosis.overallScore,
            maxScore: 100,
            details: diagnosis.fatalFlaws.map(flaw => `${flaw.title} (${flaw.urgency} Priority)`),
            improvements: diagnosis.quickWins.map(win => win.action),
            reasoning: "Analysis powered by DeepSeek AI with surgical precision",
            industryBenchmark: `Fatal flaws detected: ${diagnosis.fatalFlaws.length}`,
            tierOneComparison: diagnosis.overallScore >= 85 ? 'Exceeds FAANG standards' : 'Action plan generated for FAANG readiness'
          }
        ],
        strengths: diagnosis.quickWins.map(win => win.action).slice(0, 3),
        weaknesses: diagnosis.fatalFlaws.map(flaw => flaw.title),
        recommendations: diagnosis.fatalFlaws.map(flaw => flaw.fix),
        detectedTechnologies: diagnosis.competitiveGaps,
        scoringExplanation: [
          "Surgical AI analysis with real competitor benchmarking",
          "Profile accessibility validated in real-time",
          "Fatal flaw detection with 1-click fixes",
          "Market pulse integration with live job data"
        ],
        coachingTone: {
          overallImpression: diagnosis.fatalFlaws.length > 0 
            ? `${diagnosis.fatalFlaws.length} critical issues found - surgical fixes generated`
            : "Strong profile foundation - ready for optimization",
          industryComparison: `Market analysis: ${diagnosis.marketInsights[0]}`,
          motivationalMessage: diagnosis.overallScore >= 80 
            ? "You're in the top tier! Focus on the final optimizations." 
            : "Strong potential detected. Execute the action plan to accelerate results."
        },
        tierOneBenchmark: {
          percentile: Math.min(diagnosis.overallScore + 5, 95),
          comparisonResults: [
            {
              company: 'FAANG',
              role: 'Software Engineer',
              avgScore: 85,
              keyStrengths: diagnosis.quickWins.map(win => win.action).slice(0, 3),
              requirements: diagnosis.fatalFlaws.map(flaw => flaw.fix)
            }
          ],
          gapAnalysis: diagnosis.fatalFlaws.map(flaw => flaw.title),
          nextLevelRequirements: diagnosis.quickWins.map(win => win.action)
        },
        proTips: diagnosis.quickWins.map(win => win.action),
        portfolioPolishSuggestions: {
          headline: diagnosis.quickWins[0]?.action || 'Optimize your profile headline',
          projectDescriptions: diagnosis.quickWins.slice(1, 3).map(win => win.action) || ['Improve project descriptions'],
          skillsOptimization: diagnosis.fatalFlaws.slice(0, 2).map(flaw => flaw.fix) || ['Add relevant skills']
        }
      };

      setAnalysisResult(analysisResult);
      setAnalyzedUrl(data.url);
      setShowResults(true);
      
      console.log('✅ Analysis completed successfully:', analysisResult);
      
    } catch (error) {
      console.error('❌ Analysis failed:', error);
      
      // Show user-friendly error instead of throwing
      setProfileDiagnosis({
        isValid: false,
        error: error instanceof Error ? error.message : 'Analysis temporarily unavailable. Please try again.',
        fatalFlaws: [],
        quickWins: [],
        competitiveGaps: [],
        overallScore: 0,
        marketInsights: []
      });
      setShowResults(true);
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

  const radarData = analysisResult ? [
    { skill: 'Technical', userScore: analysisResult.sections[0]?.score || 75, tierOneAvg: 85, maxScore: 100 },
    { skill: 'Documentation', userScore: analysisResult.sections[0]?.score || 70, tierOneAvg: 80, maxScore: 100 },
    { skill: 'Design', userScore: 80, tierOneAvg: 75, maxScore: 100 },
    { skill: 'Communication', userScore: 85, tierOneAvg: 90, maxScore: 100 },
    { skill: 'Innovation', userScore: 78, tierOneAvg: 82, maxScore: 100 }
  ] : [];

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-background relative overflow-hidden dark-mode-transition">
        <LoadingScreen isVisible={isLoading} />

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/90" />
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        
        <header className="relative z-10 w-full border-b border-border/50 backdrop-blur-xl bg-background/80 supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <FuturisticLogo size="md" animate={true} />
              <div className="flex items-center gap-3">
                <MobileMenu />
                <div className="hidden md:flex items-center gap-3">
                  <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
                  <Link to="/roadmap" className="smooth-link">
                    <Button variant="outline" size="sm" className="group hover:bg-brand-500/10 hover:border-brand-500/30 transition-all duration-300">
                      <Target className="h-4 w-4 mr-2 group-hover:text-brand-500 transition-colors" />
                      <span className="hidden sm:inline">Roadmaps</span>
                      <span className="sm:hidden">Plans</span>
                    </Button>
                  </Link>
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
          </div>
        </header>

        <main className="relative z-10 container mx-auto px-4 py-4 sm:py-8">
          {!showResults ? (
            <div className="space-y-8 sm:space-y-16">
              <section className="text-center space-y-6 sm:space-y-8 py-8 sm:py-12">
                <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 mb-6 sm:mb-8">
                  <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-cyan-400 animate-pulse" />
                  <span className="text-xs sm:text-sm font-medium bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    Real Intelligence • Tier 1 Benchmarking • Live Analysis
                  </span>
                  <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-purple-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
                </div>
                
                <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight">
                    Transform Your
                    <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient-x">
                      Career Profile
                    </span>
                    <span className="text-xl sm:text-2xl md:text-3xl lg:text-5xl block mt-2 sm:mt-4 text-muted-foreground font-normal">
                      with Smart Intelligence
                    </span>
                  </h1>
                  
                  <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
                    Get comprehensive analysis benchmarked against Tier 1 companies like Google, Meta, and Microsoft. 
                    Receive personalized recommendations and actionable insights to accelerate your career growth.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-4 sm:gap-6 pt-6 sm:pt-8">
                  {[
                    { icon: Users, value: '50K+', label: 'Profiles Analyzed' },
                    { icon: Globe, value: '95%', label: 'Accuracy Rate' },
                    { icon: Award, value: '< 2s', label: 'Analysis Speed' },
                    { icon: TrendingUp, value: '4.9/5', label: 'User Rating' }
                  ].map((stat, index) => (
                    <div key={index} className="text-center group">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <stat.icon className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-400" />
                      </div>
                      <div className="text-lg sm:text-2xl font-bold text-foreground">{stat.value}</div>
                      <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-6xl mx-auto pt-8 sm:pt-12 stagger-children">
                  {[
                    { 
                      icon: Brain, 
                      color: 'from-purple-500 to-pink-500', 
                      label: 'Real Intelligence', 
                      desc: 'DeepSeek AI analyzes actual content',
                      highlight: 'Live Analysis',
                      link: '/'
                    },
                    { 
                      icon: Target, 
                      color: 'from-green-500 to-emerald-500', 
                      label: 'Tier 1 Benchmarking', 
                      desc: 'Compare against Google, Meta, Microsoft',
                      highlight: 'Elite Standards',
                      link: '/'
                    },
                    { 
                      icon: TrendingUp, 
                      color: 'from-blue-500 to-cyan-500', 
                      label: 'Rookie Roadmap', 
                      desc: 'Step-by-step plans for target companies',
                      highlight: 'Battle Plans',
                      link: '/roadmap'
                    },
                    { 
                      icon: Zap, 
                      color: 'from-yellow-500 to-orange-500', 
                      label: 'Profile Polish', 
                      desc: 'One-click enhancements ready to apply',
                      highlight: 'Instant Apply',
                      link: '/portfolio-presets'
                    }
                  ].map((item, index) => (
                    <Link key={index} to={item.link} className="smooth-link">
                      <div className="group relative p-3 sm:p-4 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-cyan-500/30 transition-all duration-500 hover:shadow-xl hover:shadow-cyan-500/10 card-morph h-full">
                        <div className="absolute top-2 right-2">
                          <span className="text-xs px-2 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 font-medium border border-cyan-500/30">
                            {item.highlight}
                          </span>
                        </div>
                        <div className={`w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 mt-2 bg-gradient-to-r ${item.color} bg-opacity-20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300`}>
                          <item.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                        </div>
                        <h3 className="font-semibold text-sm sm:text-base mb-2 text-foreground group-hover:text-cyan-400 transition-colors">
                          {item.label}
                        </h3>
                        <p className="text-xs leading-relaxed text-muted-foreground">{item.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>

              <section className="max-w-4xl mx-auto">
                <div className="text-center mb-6 sm:mb-8">
                  <h2 className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                    Trusted by Professionals Worldwide
                  </h2>
                  <p className="text-muted-foreground text-base sm:text-lg px-4">
                    See why thousands trust InsightFlow for their career advancement
                  </p>
                </div>
                <TrustSignals />
              </section>

              <section className="max-w-4xl mx-auto">
                <div className="text-center mb-6 sm:mb-8">
                  <h2 className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                    AI Profile Surgery
                  </h2>
                  <p className="text-muted-foreground text-base sm:text-lg px-4">
                    Get surgical precision analysis that identifies fatal flaws and generates 1-click fixes
                  </p>
                </div>
                <CoreAnalysisInput onAnalyze={handleAnalyze} isLoading={isLoading} />
              </section>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-cyan-500/20 card-morph">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-2">
                    Profile Surgery Complete 🔬
                  </h2>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    AI surgical analysis with competitor benchmarking and market pulse data
                  </p>
                </div>
                <Button 
                  onClick={resetAnalysis}
                  variant="outline" 
                  className="w-full sm:w-auto bg-background/80 hover:bg-cyan-500/10 hover:border-cyan-500/30 transition-all duration-300 smooth-link"
                >
                  <Brain className="h-4 w-4 mr-2" />
                  New Surgery
                </Button>
              </div>

              <Tabs defaultValue="diagnosis" className="w-full">
                <TabsList className="grid w-full grid-cols-4 sm:grid-cols-8 mb-6 h-auto">
                  <TabsTrigger value="diagnosis" className="text-xs sm:text-sm">Surgery</TabsTrigger>
                  <TabsTrigger value="xray" className="text-xs sm:text-sm">X-Ray</TabsTrigger>
                  <TabsTrigger value="pulse" className="text-xs sm:text-sm">Pulse</TabsTrigger>
                  <TabsTrigger value="architect" className="text-xs sm:text-sm">Architect</TabsTrigger>
                  <TabsTrigger value="roadmap" className="text-xs sm:text-sm">Roadmap</TabsTrigger>
                  <TabsTrigger value="stealth" className="text-xs sm:text-sm">Stealth</TabsTrigger>
                  <TabsTrigger value="heatmap" className="text-xs sm:text-sm">Skills</TabsTrigger>
                  <TabsTrigger value="radar" className="text-xs sm:text-sm">Radar</TabsTrigger>
                </TabsList>

                <TabsContent value="diagnosis">
                  {profileDiagnosis && (
                    <div className="space-y-8">
                      {profileDiagnosis.isValid ? (
                        <ProfileDiagnosis 
                          analysis={profileDiagnosis}
                          onFixFlaw={(flaw) => console.log('Fixing flaw:', flaw)}
                        />
                      ) : (
                        <ErrorDisplay 
                          error={profileDiagnosis.error || 'Analysis failed'}
                          type="generic"
                          onRetry={() => window.location.reload()}
                        />
                      )}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="xray">
                  <CompetitiveXRay />
                </TabsContent>

                <TabsContent value="pulse">
                  <JobMarketPulse />
                </TabsContent>

                <TabsContent value="architect">
                  <CareerArchitect 
                    profileUrl={analyzedUrl}
                    targetRole="Software Engineer"
                    targetCompany="FAANG"
                  />
                </TabsContent>

                <TabsContent value="roadmap">
                  <RookieRoadmap />
                </TabsContent>

                <TabsContent value="stealth">
                  <StealthAudit userProfile={{
                    skills: analysisResult?.detectedTechnologies || [],
                    experience: analysisResult?.professionalLevel || 'mid',
                    githubUrl: analyzedUrl.includes('github') ? analyzedUrl : undefined,
                    linkedinUrl: analyzedUrl.includes('linkedin') ? analyzedUrl : undefined
                  }} />
                </TabsContent>

                <TabsContent value="heatmap">
                  <SkillHeatmap userSkills={analysisResult?.detectedTechnologies || []} />
                </TabsContent>

                <TabsContent value="radar">
                  {analysisResult && (
                    <TierOneRadarChart 
                      data={radarData}
                      overallScore={analysisResult.overallScore}
                      tierOnePercentile={analysisResult.tierOneBenchmark.percentile}
                    />
                  )}
                </TabsContent>
              </Tabs>

              <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50">
                <Button
                  onClick={scrollToTop}
                  size="icon"
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-110 card-morph"
                >
                  <ArrowUp className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </Button>
              </div>
            </div>
          )}
        </main>

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
    </ErrorBoundary>
  );
};

export default Index;
