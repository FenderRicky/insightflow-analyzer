
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Brain, Target, TrendingUp, Users, Zap, GitBranch, Smartphone, Camera } from 'lucide-react';
import AnalysisResults from './AnalysisResults';
import CareerProgressionMap from './CareerProgressionMap';
import SkillGapRadar from './SkillGapRadar';
import AIContentGenerator from './AIContentGenerator';
import BenchmarkMap from './BenchmarkMap';

interface EnhancedAnalysisResultsProps {
  data: any;
}

const EnhancedAnalysisResults = ({ data }: EnhancedAnalysisResultsProps) => {
  const [activeTab, setActiveTab] = useState('analysis');

  const hasFeature = (featureId: string) => {
    return data.features?.includes(featureId) || false;
  };

  const availableTabs = [
    { id: 'analysis', label: 'Core Analysis', icon: Target, always: true },
    { id: 'benchmark', label: 'Benchmarking', icon: TrendingUp, feature: 'benchmark-map' },
    { id: 'career', label: 'Career Map', icon: Users, feature: 'career-progression' },
    { id: 'skills', label: 'Skill Gaps', icon: Zap, feature: 'skill-gap' },
    { id: 'ai-content', label: 'AI Generator', icon: Brain, feature: 'ai-generation' },
    { id: 'visual', label: 'Visual Analysis', icon: Camera, feature: 'visual-feedback' },
    { id: 'mobile', label: 'Mobile Test', icon: Smartphone, feature: 'mobile-test' },
    { id: 'github', label: 'GitHub Deep Dive', icon: GitBranch, feature: 'github-analysis' }
  ].filter(tab => tab.always || hasFeature(tab.feature));

  // Simulate some data for the enhanced features
  const mockUserProfile = {
    skills: ['React', 'JavaScript', 'TypeScript', 'Node.js', 'CSS'],
    experience: data.experienceLevel || 'mid',
    role: data.careerGoal || 'frontend-dev'
  };

  const overallScore = 87; // This would come from the analysis

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 animate-fade-in">
      {/* Enhanced Header */}
      <Card className="glass border-white/10 overflow-hidden">
        <div className="h-3 bg-gradient-to-r from-brand-500 via-neon-purple to-neon-cyan" />
        <CardHeader className="text-center pb-4">
          <div className="flex items-center justify-center gap-6 mb-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-brand-500/20 to-neon-purple/20 flex items-center justify-center border-4 border-white/10">
                <div className="text-center">
                  <span className="text-4xl font-bold text-gradient block">{overallScore}</span>
                  <span className="text-sm text-muted-foreground">/ 100</span>
                </div>
              </div>
              <div className="absolute -top-3 -right-3 text-3xl">🚀</div>
            </div>
            <div className="text-left space-y-2">
              <Badge className="bg-gradient-to-r from-green-400 to-emerald-500 text-white border-0 text-lg px-4 py-2">
                Senior Level Ready
              </Badge>
              <div className="text-sm text-muted-foreground max-w-xs">
                AI-powered analysis with {data.features?.length || 0} advanced features
              </div>
            </div>
          </div>
          
          <CardTitle className="text-3xl mb-2 mt-4">
            <span className="bg-gradient-to-r from-brand-500 to-neon-purple bg-clip-text text-transparent">
              Comprehensive Career Intelligence
            </span>
          </CardTitle>
          <CardDescription className="text-lg">
            {data.type === 'portfolio' ? 'Portfolio Analysis Complete' : 
             data.type === 'linkedin' ? 'LinkedIn Profile Analysis Complete' :
             data.type === 'github' ? 'GitHub Repository Analysis Complete' :
             'Full Career Suite Analysis Complete'}
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Enhanced Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full glass p-1" style={{ gridTemplateColumns: `repeat(${availableTabs.length}, 1fr)` }}>
          {availableTabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <TabsTrigger 
                key={tab.id} 
                value={tab.id} 
                className="flex items-center gap-2 text-xs"
              >
                <IconComponent className="h-3 w-3" />
                <span className="hidden sm:inline">{tab.label}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {/* Core Analysis */}
        <TabsContent value="analysis" className="mt-6">
          <AnalysisResults data={data} />
        </TabsContent>

        {/* Benchmarking */}
        {hasFeature('benchmark-map') && (
          <TabsContent value="benchmark" className="mt-6">
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gradient mb-2">Market Benchmarking</h3>
                <p className="text-muted-foreground">See how you compare to 50,000+ professionals</p>
              </div>
              <BenchmarkMap 
                userScore={overallScore} 
                category={data.type} 
                role={data.careerGoal || 'frontend-dev'} 
              />
            </div>
          </TabsContent>
        )}

        {/* Career Progression */}
        {hasFeature('career-progression') && (
          <TabsContent value="career" className="mt-6">
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gradient mb-2">Career Progression Map</h3>
                <p className="text-muted-foreground">Your personalized path to the next level</p>
              </div>
              <CareerProgressionMap 
                currentRole="Software Engineer"
                experienceLevel={data.experienceLevel || 'mid'}
                careerGoal={data.careerGoal || 'frontend-dev'}
              />
            </div>
          </TabsContent>
        )}

        {/* Skill Gap Analysis */}
        {hasFeature('skill-gap') && (
          <TabsContent value="skills" className="mt-6">
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gradient mb-2">Skill Gap Radar</h3>
                <p className="text-muted-foreground">Identify and close critical skill gaps</p>
              </div>
              <SkillGapRadar 
                userSkills={mockUserProfile.skills}
                targetRole={data.careerGoal || 'frontend-dev'}
              />
            </div>
          </TabsContent>
        )}

        {/* AI Content Generator */}
        {hasFeature('ai-generation') && (
          <TabsContent value="ai-content" className="mt-6">
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gradient mb-2">AI Content Generator</h3>
                <p className="text-muted-foreground">Generate optimized content with AI</p>
              </div>
              <AIContentGenerator 
                userProfile={mockUserProfile}
                careerGoal={data.careerGoal || 'frontend-dev'}
              />
            </div>
          </TabsContent>
        )}

        {/* Visual Analysis */}
        {hasFeature('visual-feedback') && (
          <TabsContent value="visual" className="mt-6">
            <Card className="glass border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-5 w-5 text-purple-400" />
                  Visual Design Analysis
                </CardTitle>
                <CardDescription>
                  AI-powered visual hierarchy and design feedback
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-medium">Visual Hierarchy Score: 84/100</h4>
                      <div className="p-3 bg-green-500/10 border border-green-500/20 rounded">
                        <p className="text-sm text-green-300">✅ Clear heading structure</p>
                        <p className="text-sm text-green-300">✅ Good color contrast ratios</p>
                        <p className="text-sm text-green-300">✅ Consistent spacing patterns</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-medium">Areas for Improvement</h4>
                      <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded">
                        <p className="text-sm text-yellow-300">⚠️ Increase button touch targets</p>
                        <p className="text-sm text-yellow-300">⚠️ Improve mobile breakpoints</p>
                        <p className="text-sm text-yellow-300">⚠️ Add more visual breathing room</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {/* Mobile Responsiveness */}
        {hasFeature('mobile-test') && (
          <TabsContent value="mobile" className="mt-6">
            <Card className="glass border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5 text-blue-400" />
                  Mobile Responsiveness Test
                </CardTitle>
                <CardDescription>
                  Multi-device compatibility analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { device: 'Mobile', score: 92, issues: ['Touch targets: 2 small elements'] },
                    { device: 'Tablet', score: 88, issues: ['Layout shifts on rotation'] },
                    { device: 'Desktop', score: 95, issues: ['Perfect implementation'] }
                  ].map((test, index) => (
                    <div key={index} className="p-4 rounded-lg bg-white/5 border border-white/10">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-medium">{test.device}</h4>
                        <Badge className={`${
                          test.score >= 90 ? 'bg-green-500/20 text-green-300' :
                          test.score >= 80 ? 'bg-yellow-500/20 text-yellow-300' :
                          'bg-red-500/20 text-red-300'
                        }`}>
                          {test.score}/100
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        {test.issues.map((issue, idx) => (
                          <p key={idx} className="text-xs text-muted-foreground">{issue}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {/* GitHub Analysis */}
        {hasFeature('github-analysis') && (
          <TabsContent value="github" className="mt-6">
            <Card className="glass border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GitBranch className="h-5 w-5 text-green-400" />
                  GitHub Deep Dive Analysis
                </CardTitle>
                <CardDescription>
                  Comprehensive repository and code quality evaluation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { metric: 'Code Quality', score: 89, color: 'green' },
                      { metric: 'Documentation', score: 76, color: 'yellow' },
                      { metric: 'Test Coverage', score: 82, color: 'green' },
                      { metric: 'Security', score: 91, color: 'green' }
                    ].map((metric, index) => (
                      <div key={index} className="text-center p-4 rounded-lg bg-white/5 border border-white/10">
                        <div className={`text-2xl font-bold mb-2 ${
                          metric.color === 'green' ? 'text-green-400' :
                          metric.color === 'yellow' ? 'text-yellow-400' :
                          'text-red-400'
                        }`}>
                          {metric.score}
                        </div>
                        <div className="text-sm text-muted-foreground">{metric.metric}</div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-medium text-green-400">✅ Strengths</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Consistent commit history</li>
                        <li>• Well-structured project layout</li>
                        <li>• Good use of TypeScript</li>
                        <li>• Security best practices followed</li>
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-medium text-yellow-400">⚠️ Improvements</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Add comprehensive README</li>
                        <li>• Increase test coverage to 80%+</li>
                        <li>• Set up CI/CD pipeline</li>
                        <li>• Add contribution guidelines</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default EnhancedAnalysisResults;
