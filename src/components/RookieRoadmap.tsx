
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Circle, Calendar, Target, Zap, Trophy, Clock, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface RoadmapStep {
  id: string;
  title: string;
  description: string;
  timeframe: string;
  difficulty: 'easy' | 'medium' | 'hard';
  completed: boolean;
  resources: string[];
}

interface CompanyRoadmap {
  company: string;
  duration: string;
  totalSteps: number;
  completedSteps: number;
  steps: RoadmapStep[];
  nextMilestone: string;
}

const RookieRoadmap = () => {
  const [selectedCompany, setSelectedCompany] = useState<string>('');
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [roadmap, setRoadmap] = useState<CompanyRoadmap | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const companies = [
    { value: 'tesla', label: 'Tesla', icon: '⚡' },
    { value: 'netflix', label: 'Netflix', icon: '📺' },
    { value: 'stripe', label: 'Stripe', icon: '💳' },
    { value: 'google', label: 'Google', icon: '🔍' },
    { value: 'meta', label: 'Meta', icon: '📘' },
    { value: 'amazon', label: 'Amazon', icon: '📦' }
  ];

  const levels = [
    { value: 'new-grad', label: 'New Graduate' },
    { value: 'junior', label: 'Junior Developer (0-2 years)' },
    { value: 'mid', label: 'Mid-Level (2-5 years)' },
    { value: 'senior', label: 'Targeting Senior (5+ years)' }
  ];

  const generateRoadmap = async () => {
    if (!selectedCompany || !selectedLevel) {
      toast({
        title: "Missing Information",
        description: "Please select both a target company and your current level",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockRoadmap = generateMockRoadmap(selectedCompany, selectedLevel);
    setRoadmap(mockRoadmap);
    setIsGenerating(false);

    toast({
      title: "Roadmap Generated! 🎯",
      description: `Your personalized ${selectedCompany.toUpperCase()} battle plan is ready`,
    });
  };

  const generateMockRoadmap = (company: string, level: string): CompanyRoadmap => {
    const companySteps: Record<string, RoadmapStep[]> = {
      tesla: [
        {
          id: '1',
          title: 'Build Battery Optimization Model',
          description: 'Create a Python script that optimizes battery charging patterns using linear programming',
          timeframe: 'Week 1-2',
          difficulty: 'medium',
          completed: false,
          resources: ['Python optimization libraries', 'Tesla battery research papers', 'Jupyter notebook template']
        },
        {
          id: '2',
          title: 'Contribute to Tesla Open Source',
          description: 'Make meaningful contributions to Tesla\'s public repositories or automotive open source projects',
          timeframe: 'Week 3-4',
          difficulty: 'hard',
          completed: false,
          resources: ['Tesla GitHub repositories', 'Automotive open source projects', 'Contribution guidelines']
        },
        {
          id: '3',
          title: 'Master Embedded Systems',
          description: 'Build a real-time embedded project using C++ and hardware integration',
          timeframe: 'Week 5-6',
          difficulty: 'hard',
          completed: false,
          resources: ['Arduino/Raspberry Pi', 'Real-time programming guides', 'Automotive protocols']
        },
        {
          id: '4',
          title: 'LinkedIn Profile Overhaul',
          description: 'Rewrite profile with "Electric Vehicle Engineer" + quantified achievements',
          timeframe: 'Week 7',
          difficulty: 'easy',
          completed: false,
          resources: ['Tesla job descriptions', 'EV industry keywords', 'Profile optimization guide']
        }
      ],
      netflix: [
        {
          id: '1',
          title: 'Build Recommendation Engine',
          description: 'Create a content recommendation system using collaborative filtering and A/B testing',
          timeframe: 'Week 1-3',
          difficulty: 'hard',
          completed: false,
          resources: ['Machine learning libraries', 'Netflix dataset', 'A/B testing frameworks']
        },
        {
          id: '2',
          title: 'Microservices Architecture',
          description: 'Design and implement a scalable microservices system using Spring Boot and Kafka',
          timeframe: 'Week 4-6',
          difficulty: 'hard',
          completed: false,
          resources: ['Spring Boot documentation', 'Kafka tutorials', 'Docker containerization']
        },
        {
          id: '3',
          title: 'Performance Optimization',
          description: 'Optimize video streaming performance and implement caching strategies',
          timeframe: 'Week 7-8',
          difficulty: 'medium',
          completed: false,
          resources: ['CDN optimization', 'Caching strategies', 'Performance monitoring tools']
        }
      ],
      stripe: [
        {
          id: '1',
          title: 'Payment Processing System',
          description: 'Build a secure payment system with idempotency keys and webhook handling',
          timeframe: 'Week 1-2',
          difficulty: 'hard',
          completed: false,
          resources: ['Payment gateway APIs', 'Security best practices', 'Webhook implementation']
        },
        {
          id: '2',
          title: 'API Design Mastery',
          description: 'Create a RESTful API with perfect documentation and error handling',
          timeframe: 'Week 3-4',
          difficulty: 'medium',
          completed: false,
          resources: ['API design patterns', 'OpenAPI specification', 'Error handling strategies']
        },
        {
          id: '3',
          title: 'Financial Data Modeling',
          description: 'Design database schemas for complex financial transactions and reporting',
          timeframe: 'Week 5-6',
          difficulty: 'medium',
          completed: false,
          resources: ['Database design patterns', 'Financial data structures', 'ACID compliance']
        }
      ]
    };

    const steps = companySteps[company] || companySteps.tesla;
    const completedSteps = Math.floor(Math.random() * 2); // Random progress

    return {
      company: company.charAt(0).toUpperCase() + company.slice(1),
      duration: '8-12 weeks',
      totalSteps: steps.length,
      completedSteps,
      steps: steps.map((step, index) => ({
        ...step,
        completed: index < completedSteps
      })),
      nextMilestone: steps[completedSteps]?.title || 'All milestones completed!'
    };
  };

  const toggleStepCompletion = (stepId: string) => {
    if (!roadmap) return;

    const updatedSteps = roadmap.steps.map(step => 
      step.id === stepId ? { ...step, completed: !step.completed } : step
    );

    const newCompletedCount = updatedSteps.filter(step => step.completed).length;

    setRoadmap({
      ...roadmap,
      steps: updatedSteps,
      completedSteps: newCompletedCount,
      nextMilestone: updatedSteps.find(step => !step.completed)?.title || 'All milestones completed!'
    });

    toast({
      title: updatedSteps.find(step => step.id === stepId)?.completed ? "Step Completed! 🎉" : "Step Unchecked",
      description: `Progress: ${newCompletedCount}/${roadmap.totalSteps} steps completed`,
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const progressPercentage = roadmap ? (roadmap.completedSteps / roadmap.totalSteps) * 100 : 0;

  return (
    <div className="space-y-6">
      <Card className="glass border-white/10">
        <CardHeader>
          <CardTitle className="text-2xl bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent flex items-center gap-2">
            <Target className="h-6 w-6 text-purple-400" />
            Rookie Roadmap - Your Battle Plan
          </CardTitle>
          <p className="text-muted-foreground">
            Get a hyper-personalized, step-by-step roadmap to land your dream job at top tech companies
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {!roadmap ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Target Company</label>
                  <Select value={selectedCompany} onValueChange={setSelectedCompany}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose your dream company" />
                    </SelectTrigger>
                    <SelectContent>
                      {companies.map(company => (
                        <SelectItem key={company.value} value={company.value}>
                          <div className="flex items-center gap-2">
                            <span>{company.icon}</span>
                            <span>{company.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Current Level</label>
                  <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      {levels.map(level => (
                        <SelectItem key={level.value} value={level.value}>
                          {level.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button 
                onClick={generateRoadmap}
                disabled={isGenerating || !selectedCompany || !selectedLevel}
                className="w-full h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3" />
                    Generating Your Battle Plan...
                  </>
                ) : (
                  <>
                    <Zap className="h-5 w-5 mr-2" />
                    Generate My Roadmap
                  </>
                )}
              </Button>
            </>
          ) : (
            <div className="space-y-6">
              {/* Progress Overview */}
              <div className="p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold">
                    🎯 {roadmap.company} Preparation Plan
                  </h3>
                  <Badge variant="outline" className="glass">
                    {roadmap.duration}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Progress: {roadmap.completedSteps}/{roadmap.totalSteps} steps</span>
                    <span>{Math.round(progressPercentage)}%</span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                </div>
                
                <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Next milestone: {roadmap.nextMilestone}</span>
                </div>
              </div>

              {/* Roadmap Steps */}
              <div className="space-y-4">
                {roadmap.steps.map((step, index) => (
                  <Card key={step.id} className={`glass border-white/10 transition-all duration-300 ${step.completed ? 'bg-green-500/5 border-green-500/20' : ''}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <button
                          onClick={() => toggleStepCompletion(step.id)}
                          className="mt-1 transition-colors"
                        >
                          {step.completed ? (
                            <CheckCircle className="h-6 w-6 text-green-500" />
                          ) : (
                            <Circle className="h-6 w-6 text-muted-foreground hover:text-purple-400" />
                          )}
                        </button>
                        
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-3">
                            <h4 className={`font-semibold ${step.completed ? 'line-through text-muted-foreground' : ''}`}>
                              {step.title}
                            </h4>
                            <Badge className={`text-xs ${getDifficultyColor(step.difficulty)}`}>
                              {step.difficulty}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {step.timeframe}
                            </Badge>
                          </div>
                          
                          <p className={`text-sm text-muted-foreground ${step.completed ? 'line-through' : ''}`}>
                            {step.description}
                          </p>
                          
                          <div className="flex flex-wrap gap-2">
                            {step.resources.map((resource, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {resource}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button 
                  onClick={() => setRoadmap(null)}
                  variant="outline"
                  className="flex-1"
                >
                  Generate New Roadmap
                </Button>
                <Button className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Get Weekly Reminders
                </Button>
              </div>

              {progressPercentage === 100 && (
                <div className="text-center p-6 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-lg">
                  <Trophy className="h-12 w-12 text-yellow-500 mx-auto mb-3" />
                  <h3 className="text-xl font-bold text-yellow-400 mb-2">Roadmap Complete! 🎉</h3>
                  <p className="text-muted-foreground">
                    You're now ready to crush the {roadmap.company} interview process!
                  </p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RookieRoadmap;
