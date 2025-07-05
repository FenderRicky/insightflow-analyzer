
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Brain, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/ThemeToggle';
import FuturisticLogo from '@/components/FuturisticLogo';
import { useTheme } from '@/hooks/useTheme';
import CompanyRoadmapSelector from '@/components/CompanyRoadmapSelector';
import InteractiveRoadmapDisplay from '@/components/InteractiveRoadmapDisplay';
import RookieRoadmap from '@/components/RookieRoadmap';

const RoadmapPage = () => {
  const [generatedRoadmap, setGeneratedRoadmap] = useState<any>(null);
  const [profileUrl, setProfileUrl] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'company' | 'rookie'>('company');
  const { isDark, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  const handleRoadmapGenerated = (roadmap: any, url: string) => {
    setGeneratedRoadmap(roadmap);
    setProfileUrl(url);
  };

  const resetRoadmap = () => {
    setGeneratedRoadmap(null);
    setProfileUrl('');
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Enhanced background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/90" />
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Header */}
      <header className="relative z-10 w-full border-b border-border/50 backdrop-blur-xl bg-background/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost" size="sm" className="hover:bg-brand-500/10">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Analysis
                </Button>
              </Link>
              <FuturisticLogo size="md" animate={true} />
            </div>
            <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
          </div>
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-4 py-8">
        {!generatedRoadmap ? (
          <div className="space-y-8">
            {/* Hero Section */}
            <section className="text-center space-y-6 py-12">
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 mb-8">
                <Brain className="h-4 w-4 text-cyan-400 animate-pulse" />
                <span className="text-sm font-medium bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  AI-Powered Career Intelligence
                </span>
                <Zap className="h-4 w-4 text-purple-400" />
              </div>
              
              <div className="max-w-4xl mx-auto space-y-6">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
                  Your Personalized
                  <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient-x">
                    Career Battle Plan
                  </span>
                </h1>
                
                <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  Get AI-generated roadmaps based on real hiring data from 25+ top tech companies. 
                  Every step is reverse-engineered from successful candidates.
                </p>
              </div>
            </section>

            {/* Tab Selection */}
            <div className="flex justify-center mb-8">
              <div className="glass rounded-lg p-1 flex">
                <Button
                  variant={activeTab === 'company' ? 'default' : 'ghost'}
                  onClick={() => setActiveTab('company')}
                  className="flex items-center gap-2"
                >
                  <Building className="h-4 w-4" />
                  Company-Specific
                </Button>
                <Button
                  variant={activeTab === 'rookie' ? 'default' : 'ghost'}
                  onClick={() => setActiveTab('rookie')}
                  className="flex items-center gap-2"
                >
                  <Target className="h-4 w-4" />
                  Rookie Roadmap
                </Button>
              </div>
            </div>

            {/* Content based on active tab */}
            {activeTab === 'company' ? (
              <CompanyRoadmapSelector onRoadmapGenerated={handleRoadmapGenerated} />
            ) : (
              <RookieRoadmap />
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Your Personalized Roadmap</h2>
              <Button onClick={resetRoadmap} variant="outline">
                Generate New Roadmap
              </Button>
            </div>
            <InteractiveRoadmapDisplay roadmap={generatedRoadmap} profileUrl={profileUrl} />
          </div>
        )}
      </main>
    </div>
  );
};

export default RoadmapPage;
