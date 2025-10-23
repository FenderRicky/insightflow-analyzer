import React, { useState, useEffect } from 'react';
import { Sparkles, Zap, TrendingUp, Brain } from 'lucide-react';
import Navigation from '@/components/Navigation';
import CoreAnalysisInput from '@/components/CoreAnalysisInput';
import AIMentorChat from '@/components/AIMentorChat';
import BoostModeCard from '@/components/BoostModeCard';
import GrowthTimeline from '@/components/GrowthTimeline';
import ProfileDiagnosis from '@/components/ProfileDiagnosis';
import CompetitiveXRay from '@/components/CompetitiveXRay';
import JobMarketPulse from '@/components/JobMarketPulse';

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleAnalyze = async (data: { url: string; type: string }) => {
    setIsLoading(true);
    // Simulate analysis
    setTimeout(() => {
      setShowAnalysis(true);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Neural Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <Navigation />
      
      <main className={`container mx-auto px-4 py-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {!showAnalysis ? (
          <div className="space-y-16">
            {/* Hero Section with Emotional Impact */}
            <section className="text-center space-y-8 py-16">
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 backdrop-blur-sm">
                <Brain className="w-4 h-4 text-primary animate-pulse" />
                <span className="text-sm font-medium bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Your Digital Mirror, Powered by Intelligence
                </span>
                <Zap className="w-4 h-4 text-accent" />
              </div>
              
              <div className="max-w-5xl mx-auto space-y-6">
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight">
                  The AI that
                  <span className="block mt-3 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient-x bg-[length:200%_auto]">
                    studies you — and makes you unforgettable
                  </span>
                </h1>
                
                <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                  InsightFlow 2.0 isn't just another tool. It's your personal growth mirror —
                  <span className="text-foreground font-medium"> analyzing, inspiring, and transforming </span>
                  your professional identity with emotional intelligence.
                </p>

                <div className="flex flex-wrap justify-center gap-6 pt-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Sparkles className="w-4 h-4 text-primary" />
                    AI-Powered Insights
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <TrendingUp className="w-4 h-4 text-accent" />
                    Real-Time Growth Tracking
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Zap className="w-4 h-4 text-primary" />
                    Instant Optimization
                  </div>
                </div>
              </div>
            </section>

            {/* Quick Analysis */}
            <section className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-3">Start Your Transformation</h2>
                <p className="text-muted-foreground">
                  Share your LinkedIn, GitHub, or portfolio — get insights in seconds
                </p>
              </div>
              <CoreAnalysisInput onAnalyze={handleAnalyze} isLoading={isLoading} />
            </section>

            {/* AI Mentor Chat */}
            <section className="max-w-5xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Chat with Your AI Career Mentor
                </h2>
                <p className="text-muted-foreground">
                  Choose your mentor's tone and get personalized guidance
                </p>
              </div>
              <AIMentorChat />
            </section>

            {/* Boost Mode */}
            <section className="max-w-4xl mx-auto">
              <BoostModeCard />
            </section>

            {/* Growth Timeline */}
            <section className="max-w-5xl mx-auto">
              <GrowthTimeline />
            </section>

            {/* Features Showcase */}
            <section className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
              <div className="space-y-6">
                <ProfileDiagnosis analysis={null} />
                <CompetitiveXRay />
              </div>
            </section>

            {/* Market Insights */}
            <section className="max-w-7xl mx-auto">
              <JobMarketPulse />
            </section>

            {/* Final CTA */}
            <section className="max-w-4xl mx-auto text-center py-16">
              <div className="space-y-6 p-12 rounded-3xl bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 border border-primary/20 backdrop-blur-xl">
                <h2 className="text-4xl font-bold">
                  Ready to become
                  <span className="block mt-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    unforgettable?
                  </span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Join thousands of professionals who transformed their careers with AI-powered insights
                </p>
              </div>
            </section>
          </div>
        ) : (
          <div className="space-y-8 animate-fade-in">
            <ProfileDiagnosis analysis={null} />
            <CompetitiveXRay />
            <GrowthTimeline />
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;