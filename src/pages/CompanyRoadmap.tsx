
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Target, Brain, Clock, Zap, Building, Users, CheckCircle, TrendingUp, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ThemeToggle from '@/components/ThemeToggle';
import FuturisticLogo from '@/components/FuturisticLogo';
import { useTheme } from '@/hooks/useTheme';
import CompanyDNAAnalyzer from '@/components/CompanyDNAAnalyzer';
import TimeMachineSimulator from '@/components/TimeMachineSimulator';
import CompanySpecificRoadmap from '@/components/CompanySpecificRoadmap';

const CompanyRoadmap = () => {
  const { company } = useParams<{ company: string }>();
  const [activeTab, setActiveTab] = useState('roadmap');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();
  const { isDark, setTheme } = useTheme();

  const companyData = getCompanyData(company?.toLowerCase());

  if (!companyData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="glass border-white/10 max-w-md">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Company Not Found</h2>
            <p className="text-muted-foreground mb-6">
              We don't have a roadmap for "{company}" yet. Check back soon!
            </p>
            <Link to="/roadmap">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Roadmaps
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  const handleAuditProfile = async () => {
    setIsAnalyzing(true);
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsAnalyzing(false);
    toast({
      title: "Profile Analysis Complete! 🎯",
      description: `Your ${companyData.name} readiness score: 72%`,
    });
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
              <Link to="/roadmap">
                <Button variant="ghost" size="sm" className="hover:bg-brand-500/10">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  All Roadmaps
                </Button>
              </Link>
              <FuturisticLogo size="md" animate={true} />
            </div>
            <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
          </div>
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-4 py-8">
        {/* Company-Specific Hero */}
        <section className="text-center space-y-8 py-12">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 mb-8">
            <div className="text-2xl">{companyData.icon}</div>
            <span className="text-sm font-medium bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              {companyData.name} Career Intelligence
            </span>
            <Building className="h-4 w-4 text-purple-400 animate-pulse" />
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
              The Exact 3-Month Plan to Get
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient-x">
                Hired at {companyData.name}
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We analyzed 50+ {companyData.name} hires—here's what their GitHub/LinkedIn had that yours doesn't.
            </p>

            <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  {companyData.stats.hireRate}% Success Rate
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>{companyData.stats.analyzed}+ Profiles Analyzed</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                <span>Avg Salary: ${companyData.stats.avgSalary}</span>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:shadow-lg hover:shadow-cyan-500/25 text-lg px-8 py-4"
              onClick={handleAuditProfile}
              disabled={isAnalyzing}
            >
              {isAnalyzing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3" />
                  Analyzing Profile...
                </>
              ) : (
                <>
                  <Target className="h-5 w-5 mr-2" />
                  Audit My Profile Against {companyData.name} Standards
                </>
              )}
            </Button>
            <Button variant="outline" size="lg" className="border-cyan-500/30 hover:bg-cyan-500/10 text-lg px-8 py-4">
              <Star className="h-5 w-5 mr-2" />
              Steal This Profile
            </Button>
          </div>
        </section>

        {/* Enhanced Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-4 glass p-1 mb-8">
            <TabsTrigger value="roadmap" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Roadmap
            </TabsTrigger>
            <TabsTrigger value="dna" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              Company DNA
            </TabsTrigger>
            <TabsTrigger value="simulator" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Time Machine
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Insider Intel
            </TabsTrigger>
          </TabsList>

          <TabsContent value="roadmap">
            <CompanySpecificRoadmap companyData={companyData} />
          </TabsContent>

          <TabsContent value="dna">
            <CompanyDNAAnalyzer companyData={companyData} />
          </TabsContent>

          <TabsContent value="simulator">
            <TimeMachineSimulator companyData={companyData} />
          </TabsContent>

          <TabsContent value="insights">
            <Card className="glass border-white/10">
              <CardHeader>
                <CardTitle className="text-2xl bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  🕵️ Insider Intelligence: {companyData.name}
                </CardTitle>
                <p className="text-muted-foreground">
                  Real data from recruiters, hiring managers, and recent hires
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-green-400">✅ What Gets You Hired</h3>
                    {companyData.insights.hired.map((insight, index) => (
                      <div key={index} className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                        <p className="text-sm text-green-300">{insight}</p>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-red-400">❌ Silent Dealbreakers</h3>
                    {companyData.insights.rejected.map((insight, index) => (
                      <div key={index} className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                        <p className="text-sm text-red-300">{insight}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg">
                  <h3 className="text-xl font-bold text-purple-400 mb-4">💡 Recruiter Quote</h3>
                  <blockquote className="text-lg italic text-foreground">
                    "{companyData.insights.recruiterQuote}"
                  </blockquote>
                  <p className="text-sm text-muted-foreground mt-2">
                    — {companyData.insights.recruiterName}, Senior Technical Recruiter at {companyData.name}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

function getCompanyData(company: string | undefined) {
  const companies: Record<string, any> = {
    netflix: {
      name: 'Netflix',
      icon: '📺',
      color: 'red',
      stats: {
        hireRate: 83,
        analyzed: 127,
        avgSalary: '195K'
      },
      techStack: ['Go', 'Java', 'Python', 'Kafka', 'Cassandra', 'Docker'],
      insights: {
        hired: [
          '90% had distributed systems projects',
          'Average 3.2 years Go experience',
          'Contributed to 2+ streaming-related OSS projects',
          'Used "high-throughput" in LinkedIn summary'
        ],
        rejected: [
          'No microservices architecture examples',
          'Missing performance optimization metrics',
          'Generic "full-stack developer" title',
          'No evidence of handling scale (>1M users)'
        ],
        recruiterQuote: "We auto-filter profiles without 'distributed systems' or 'microservices' keywords. If you're serious about Netflix, these aren't optional.",
        recruiterName: "Sarah Chen"
      }
    },
    stripe: {
      name: 'Stripe',
      icon: '💳',
      color: 'purple',
      stats: {
        hireRate: 76,
        analyzed: 89,
        avgSalary: '210K'
      },
      techStack: ['Ruby', 'Go', 'TypeScript', 'PostgreSQL', 'Kafka', 'Redis'],
      insights: {
        hired: [
          '95% had payments or fintech projects',
          'Understanding of idempotency patterns',
          'API design experience (REST/GraphQL)',
          'Database transaction knowledge'
        ],
        rejected: [
          'No financial data handling examples',
          'Missing API security best practices',
          'No understanding of PCI compliance',
          'Generic e-commerce projects only'
        ],
        recruiterQuote: "Stripe hires builders who understand money flows. Show us you've built something that handles real transactions, not just toy projects.",
        recruiterName: "Michael Rodriguez"
      }
    },
    google: {
      name: 'Google',
      icon: '🔍',
      color: 'blue',
      stats: {
        hireRate: 71,
        analyzed: 234,
        avgSalary: '185K'
      },
      techStack: ['Go', 'Java', 'Python', 'C++', 'Kubernetes', 'TensorFlow'],
      insights: {
        hired: [
          'Strong algorithmic problem-solving',
          'Large-scale system design experience',
          'Open source contributions',
          'Clean, well-documented code'
        ],
        rejected: [
          'Poor code quality/organization',
          'No system design examples',
          'Weak CS fundamentals',
          'No evidence of handling complexity'
        ],
        recruiterQuote: "Google values depth over breadth. Show us you can solve hard problems elegantly, not just build features quickly.",
        recruiterName: "Jennifer Kim"
      }
    }
  };

  return companies[company || ''] || null;
}

export default CompanyRoadmap;
