
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Brain, Target, Zap, Calendar, CheckCircle, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { CareerEngine, type CareerPlan } from '@/utils/careerEngine';

interface CareerArchitectProps {
  profileUrl?: string;
  targetRole?: string;
  targetCompany?: string;
}

const CareerArchitect = ({ profileUrl, targetRole = 'Software Engineer', targetCompany = 'FAANG' }: CareerArchitectProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [careerPlan, setCareerPlan] = useState<CareerPlan | null>(null);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const handleGeneratePlan = async () => {
    if (!profileUrl) {
      toast({
        title: "Profile URL Required",
        description: "Please provide a GitHub, LinkedIn, or portfolio URL",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    try {
      const plan = await CareerEngine.generateCareerPlan(profileUrl, targetCompany);
      setCareerPlan(plan);
      
      toast({
        title: "Career Plan Generated! 🚀",
        description: `Your personalized ${targetCompany} roadmap is ready`,
      });
    } catch (error) {
      console.error('Failed to generate career plan:', error);
      toast({
        title: "Generation Failed",
        description: "Please try again or contact support",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const toggleTask = (taskId: string) => {
    const newCompleted = new Set(completedTasks);
    if (newCompleted.has(taskId)) {
      newCompleted.delete(taskId);
    } else {
      newCompleted.add(taskId);
      toast({
        title: "Task Completed! ✅",
        description: "Great progress on your career journey!",
      });
    }
    setCompletedTasks(newCompleted);
  };

  const completionPercentage = careerPlan ? 
    (completedTasks.size / careerPlan.timeline.reduce((total, phase) => total + phase.tasks.length, 0)) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="glass border-cyan-500/20 bg-gradient-to-r from-cyan-500/5 to-purple-500/5">
        <CardHeader>
          <CardTitle className="text-2xl bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent flex items-center gap-2">
            <Brain className="h-6 w-6 text-cyan-400" />
            AI Career Architect
          </CardTitle>
          <p className="text-muted-foreground">
            Get a personalized 90-day plan to land your dream role at {targetCompany}
          </p>
        </CardHeader>
        <CardContent>
          {!careerPlan ? (
            <div className="text-center py-8">
              <div className="mb-6">
                <div className="w-32 h-32 mx-auto bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full flex items-center justify-center border-4 border-cyan-500/30">
                  <Target className="h-16 w-16 text-cyan-400" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-4">Ready to Engineer Your Career?</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Our AI analyzes your profile against {targetCompany} hiring patterns and creates a battle-tested roadmap
              </p>
              <Button 
                onClick={handleGeneratePlan}
                disabled={isGenerating}
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-purple-500"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3" />
                    Generating Your Plan...
                  </>
                ) : (
                  <>
                    <Zap className="h-5 w-5 mr-2" />
                    Generate My Career Plan
                  </>
                )}
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Progress Overview */}
              <div className="p-4 bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold">Your Progress</h3>
                  <Badge className="bg-green-500/20 text-green-400">
                    {Math.round(completionPercentage)}% Complete
                  </Badge>
                </div>
                <Progress value={completionPercentage} className="h-3 mb-2" />
                <p className="text-sm text-muted-foreground">
                  {completedTasks.size} of {careerPlan.timeline.reduce((total, phase) => total + phase.tasks.length, 0)} tasks completed
                </p>
              </div>

              {/* Skill Deficits */}
              <Card className="glass border-red-500/20">
                <CardHeader>
                  <CardTitle className="text-red-400">🎯 Critical Skill Gaps</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {careerPlan.skillDeficits.map((deficit, index) => (
                      <div key={index} className="p-3 bg-red-500/5 border border-red-500/20 rounded-lg">
                        <p className="text-sm text-red-300">{deficit}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Wins */}
              <Card className="glass border-green-500/20">
                <CardHeader>
                  <CardTitle className="text-green-400">⚡ Quick Wins (Start Today)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {careerPlan.quickWins.map((win, index) => (
                      <div key={index} className="p-3 bg-green-500/5 border border-green-500/20 rounded-lg">
                        <p className="text-sm text-green-300">{win}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Timeline */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-purple-400" />
                  90-Day Battle Plan
                </h3>
                
                {careerPlan.timeline.map((phase, phaseIndex) => (
                  <Card key={phaseIndex} className="glass border-white/10">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold">
                          {phaseIndex + 1}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{phase.phase}</CardTitle>
                          <p className="text-muted-foreground">{phase.duration}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {phase.tasks.map((task, taskIndex) => {
                        const taskId = `${phaseIndex}-${taskIndex}`;
                        const isCompleted = completedTasks.has(taskId);
                        
                        return (
                          <div 
                            key={taskIndex}
                            className={`p-4 rounded-lg border transition-all duration-300 cursor-pointer ${
                              isCompleted 
                                ? 'bg-green-500/5 border-green-500/20' 
                                : 'bg-white/5 border-white/10 hover:border-cyan-500/30'
                            }`}
                            onClick={() => toggleTask(taskId)}
                          >
                            <div className="flex items-start gap-4">
                              <button className="mt-1">
                                {isCompleted ? (
                                  <CheckCircle className="h-6 w-6 text-green-500" />
                                ) : (
                                  <Clock className="h-6 w-6 text-muted-foreground hover:text-cyan-400" />
                                )}
                              </button>
                              
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <h4 className={`font-semibold ${isCompleted ? 'line-through text-muted-foreground' : ''}`}>
                                    {task.title}
                                  </h4>
                                  <Badge className={`text-xs ${
                                    task.impact === 'High' ? 'bg-red-500/20 text-red-400' :
                                    task.impact === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                                    'bg-green-500/20 text-green-400'
                                  }`}>
                                    {task.impact} Impact
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    {task.difficulty}
                                  </Badge>
                                </div>
                                <p className={`text-sm text-muted-foreground ${isCompleted ? 'line-through' : ''}`}>
                                  {task.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CareerArchitect;
