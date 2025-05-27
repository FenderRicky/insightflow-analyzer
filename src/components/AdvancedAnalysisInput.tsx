
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Globe, User, Code, Link, Camera, Target, GitBranch, Briefcase, Smartphone, Brain } from 'lucide-react';

interface AdvancedAnalysisInputProps {
  onAnalyze: (data: any) => void;
  isLoading: boolean;
}

const AdvancedAnalysisInput = ({ onAnalyze, isLoading }: AdvancedAnalysisInputProps) => {
  const [analysisType, setAnalysisType] = useState('portfolio');
  const [input, setInput] = useState('');
  const [inputType, setInputType] = useState('url');
  const [careerGoal, setCareerGoal] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [industryFocus, setIndustryFocus] = useState('');
  const [additionalFeatures, setAdditionalFeatures] = useState<string[]>([]);

  const careerGoals = [
    { value: 'frontend-dev', label: 'Frontend Developer', icon: '🎨' },
    { value: 'backend-dev', label: 'Backend Developer', icon: '⚙️' },
    { value: 'fullstack-dev', label: 'Full Stack Developer', icon: '🔗' },
    { value: 'data-scientist', label: 'Data Scientist', icon: '📊' },
    { value: 'ml-engineer', label: 'ML Engineer', icon: '🤖' },
    { value: 'product-manager', label: 'Product Manager', icon: '📱' },
    { value: 'ux-designer', label: 'UX Designer', icon: '🎯' },
    { value: 'devops-engineer', label: 'DevOps Engineer', icon: '☁️' },
    { value: 'security-engineer', label: 'Security Engineer', icon: '🔒' },
    { value: 'tech-lead', label: 'Tech Lead', icon: '👑' }
  ];

  const experienceLevels = [
    { value: 'entry', label: 'Entry Level (0-2 years)' },
    { value: 'mid', label: 'Mid Level (2-5 years)' },
    { value: 'senior', label: 'Senior Level (5-8 years)' },
    { value: 'lead', label: 'Lead/Staff (8+ years)' }
  ];

  const industryFoci = [
    { value: 'fintech', label: 'FinTech' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'ecommerce', label: 'E-commerce' },
    { value: 'social', label: 'Social Media' },
    { value: 'gaming', label: 'Gaming' },
    { value: 'enterprise', label: 'Enterprise' },
    { value: 'startup', label: 'Startup' },
    { value: 'consulting', label: 'Consulting' }
  ];

  const availableFeatures = [
    { id: 'ai-generation', label: 'AI Content Generation', icon: Brain },
    { id: 'benchmark-map', label: 'Real-Time Benchmarking', icon: Target },
    { id: 'visual-feedback', label: 'Visual Design Analysis', icon: Camera },
    { id: 'career-progression', label: 'Career Progression Map', icon: Briefcase },
    { id: 'skill-gap', label: 'Skill Gap Analysis', icon: Code },
    { id: 'github-analysis', label: 'GitHub Deep Dive', icon: GitBranch },
    { id: 'mobile-test', label: 'Mobile Responsiveness', icon: Smartphone },
    { id: 'recruiter-sim', label: 'Mock Recruiter Review', icon: User }
  ];

  const toggleFeature = (featureId: string) => {
    setAdditionalFeatures(prev => 
      prev.includes(featureId) 
        ? prev.filter(id => id !== featureId)
        : [...prev, featureId]
    );
  };

  const handleAnalyze = () => {
    if (input.trim()) {
      onAnalyze({
        type: analysisType,
        input: input.trim(),
        inputType,
        careerGoal,
        experienceLevel,
        industryFocus,
        features: additionalFeatures,
        timestamp: Date.now()
      });
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Analysis Type Selection */}
      <Tabs value={analysisType} onValueChange={setAnalysisType} className="w-full">
        <TabsList className="grid w-full grid-cols-4 glass">
          <TabsTrigger value="portfolio" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Portfolio
          </TabsTrigger>
          <TabsTrigger value="linkedin" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            LinkedIn
          </TabsTrigger>
          <TabsTrigger value="github" className="flex items-center gap-2">
            <GitBranch className="h-4 w-4" />
            GitHub
          </TabsTrigger>
          <TabsTrigger value="comprehensive" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            Full Suite
          </TabsTrigger>
        </TabsList>

        {/* Career Goal & Context */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <Card className="glass border-white/10">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Career Goal</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={careerGoal} onValueChange={setCareerGoal}>
                <SelectTrigger className="glass bg-white/5 border-white/10">
                  <SelectValue placeholder="Select target role" />
                </SelectTrigger>
                <SelectContent>
                  {careerGoals.map(goal => (
                    <SelectItem key={goal.value} value={goal.value}>
                      <span className="flex items-center gap-2">
                        <span>{goal.icon}</span>
                        {goal.label}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card className="glass border-white/10">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Experience Level</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={experienceLevel} onValueChange={setExperienceLevel}>
                <SelectTrigger className="glass bg-white/5 border-white/10">
                  <SelectValue placeholder="Your level" />
                </SelectTrigger>
                <SelectContent>
                  {experienceLevels.map(level => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card className="glass border-white/10">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Industry Focus</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={industryFocus} onValueChange={setIndustryFocus}>
                <SelectTrigger className="glass bg-white/5 border-white/10">
                  <SelectValue placeholder="Target industry" />
                </SelectTrigger>
                <SelectContent>
                  {industryFoci.map(industry => (
                    <SelectItem key={industry.value} value={industry.value}>
                      {industry.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Features Selection */}
        <Card className="glass border-white/10">
          <CardHeader>
            <CardTitle className="text-gradient">AI-Powered Features</CardTitle>
            <CardDescription>
              Select additional analysis features for deeper insights
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {availableFeatures.map(feature => {
                const IconComponent = feature.icon;
                const isSelected = additionalFeatures.includes(feature.id);
                return (
                  <button
                    key={feature.id}
                    onClick={() => toggleFeature(feature.id)}
                    className={`p-3 rounded-lg border transition-all duration-300 text-left ${
                      isSelected 
                        ? 'bg-brand-500/20 border-brand-500/50 text-brand-300' 
                        : 'glass border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <IconComponent className="h-4 w-4" />
                      {isSelected && <Badge className="ml-auto">✓</Badge>}
                    </div>
                    <div className="text-xs font-medium">{feature.label}</div>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Input Sections */}
        <TabsContent value="portfolio" className="mt-6">
          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle className="text-gradient">Portfolio Analysis</CardTitle>
              <CardDescription>
                Advanced portfolio analysis with design, performance, and UX evaluation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs value={inputType} onValueChange={setInputType}>
                <TabsList className="glass">
                  <TabsTrigger value="url" className="flex items-center gap-2">
                    <Link className="h-3 w-3" />
                    URL
                  </TabsTrigger>
                  <TabsTrigger value="code" className="flex items-center gap-2">
                    <Code className="h-3 w-3" />
                    Code
                  </TabsTrigger>
                  <TabsTrigger value="screenshot" className="flex items-center gap-2">
                    <Camera className="h-3 w-3" />
                    Screenshot
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="url" className="mt-4">
                  <Input
                    placeholder="https://your-portfolio.com"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="glass bg-white/5 border-white/10 focus:border-brand-500"
                  />
                </TabsContent>

                <TabsContent value="code" className="mt-4">
                  <Textarea
                    placeholder="Paste your HTML/CSS/JS code here..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    rows={8}
                    className="glass bg-white/5 border-white/10 focus:border-brand-500 font-mono text-sm"
                  />
                </TabsContent>

                <TabsContent value="screenshot" className="mt-4">
                  <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center">
                    <Camera className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Upload a screenshot of your portfolio</p>
                    <p className="text-xs text-muted-foreground mt-1">AI will analyze visual design, layout, and UX</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="linkedin" className="mt-6">
          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle className="text-gradient">LinkedIn Profile Analysis</CardTitle>
              <CardDescription>
                AI-powered LinkedIn optimization with tier-1 company benchmarking
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="https://linkedin.com/in/your-profile"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="glass bg-white/5 border-white/10 focus:border-brand-500"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="github" className="mt-6">
          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle className="text-gradient">GitHub Repository Analysis</CardTitle>
              <CardDescription>
                Deep dive into code quality, documentation, and project structure
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="https://github.com/username/repository"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="glass bg-white/5 border-white/10 focus:border-brand-500"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comprehensive" className="mt-6">
          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle className="text-gradient">Comprehensive Career Analysis</CardTitle>
              <CardDescription>
                Full-spectrum analysis across all platforms with AI-generated improvements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Portfolio URL"
                  className="glass bg-white/5 border-white/10 focus:border-brand-500"
                />
                <Input
                  placeholder="LinkedIn URL"
                  className="glass bg-white/5 border-white/10 focus:border-brand-500"
                />
                <Input
                  placeholder="GitHub Profile URL"
                  className="glass bg-white/5 border-white/10 focus:border-brand-500"
                />
                <Input
                  placeholder="Additional Repository (optional)"
                  className="glass bg-white/5 border-white/10 focus:border-brand-500"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Analyze Button */}
      <Button
        onClick={handleAnalyze}
        disabled={!input.trim() || isLoading}
        className="w-full bg-gradient-to-r from-brand-500 to-neon-purple hover:from-brand-600 hover:to-neon-purple/90 transition-all duration-300 glow py-4 text-lg"
      >
        {isLoading ? 'Analyzing with AI...' : `Start Advanced Analysis`}
      </Button>
    </div>
  );
};

export default AdvancedAnalysisInput;
