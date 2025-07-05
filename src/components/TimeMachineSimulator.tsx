
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Clock, User, Zap, TrendingUp, Calendar, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TimeMachineSimulatorProps {
  companyData: any;
}

const TimeMachineSimulator = ({ companyData }: TimeMachineSimulatorProps) => {
  const [timelineMonths, setTimelineMonths] = useState([6]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationComplete, setSimulationComplete] = useState(false);
  const { toast } = useToast();

  const runSimulation = async () => {
    setIsSimulating(true);
    await new Promise(resolve => setTimeout(resolve, 2500));
    setSimulationComplete(true);
    setIsSimulating(false);
    
    toast({
      title: "Time Machine Complete! ⏰",
      description: `Your future ${companyData.name} profile is ready`,
    });
  };

  const currentProfile = {
    hireability: 35,
    githubRepos: 8,
    linkedinViews: 120,
    skills: ['React', 'JavaScript', 'CSS'],
    projects: 2,
    experience: '2 years',
    weaknesses: ['No distributed systems', 'Missing company tech stack', 'Generic portfolio']
  };

  const futureProfile = {
    hireability: Math.min(90, currentProfile.hireability + (timelineMonths[0] * 12)),
    githubRepos: currentProfile.githubRepos + (timelineMonths[0] * 3),
    linkedinViews: currentProfile.linkedinViews * (1 + timelineMonths[0] * 0.5),
    skills: [...currentProfile.skills, ...companyData.techStack.slice(0, 3)],
    projects: currentProfile.projects + timelineMonths[0],
    experience: currentProfile.experience,
    improvements: [
      `Built ${timelineMonths[0]} production-ready projects`,
      `Mastered ${companyData.name}'s core tech stack`,
      `Contributed to ${Math.floor(timelineMonths[0] / 2)} open source projects`,
      `Optimized LinkedIn for ${companyData.name} recruiters`
    ]
  };

  const milestones = [
    {
      month: 1,
      title: 'Foundation Phase',
      achievements: [`Learn ${companyData.techStack[0]}`, 'Build first targeted project', 'Optimize LinkedIn profile']
    },
    {
      month: 3,
      title: 'Building Phase',
      achievements: ['Complete major project', 'Start OSS contributions', 'Network with company engineers']
    },
    {
      month: 6,
      title: 'Expert Phase',
      achievements: ['Portfolio review-ready', 'Interview preparation', 'Apply with confidence']
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="glass border-white/10">
        <CardHeader>
          <CardTitle className="text-2xl bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent flex items-center gap-2">
            <Clock className="h-6 w-6 text-cyan-400" />
            AI Time Machine: Your Future {companyData.name} Profile
          </CardTitle>
          <p className="text-muted-foreground">
            See exactly how your profile will evolve if you follow our roadmap
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {!simulationComplete ? (
            <>
              {/* Timeline Selector */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Target Timeline</label>
                  <Badge variant="outline">
                    {timelineMonths[0]} {timelineMonths[0] === 1 ? 'month' : 'months'}
                  </Badge>
                </div>
                <Slider
                  value={timelineMonths}
                  onValueChange={setTimelineMonths}
                  max={12}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1 month</span>
                  <span>6 months</span>
                  <span>12 months</span>
                </div>
              </div>

              {/* Simulation Trigger */}
              <div className="text-center py-6">
                <div className="mb-4">
                  <div className="w-24 h-24 mx-auto bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center border-4 border-purple-500/30">
                    <Clock className="h-12 w-12 text-purple-400" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">Ready to See Your Future?</h3>
                <p className="text-muted-foreground mb-4">
                  AI will simulate your profile transformation over {timelineMonths[0]} months
                </p>
                <Button 
                  onClick={runSimulation}
                  disabled={isSimulating}
                  size="lg"
                  className="bg-gradient-to-r from-purple-500 to-pink-500"
                >
                  {isSimulating ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3" />
                      Simulating Future...
                    </>
                  ) : (
                    <>
                      <Zap className="h-5 w-5 mr-2" />
                      Run Time Machine
                    </>
                  )}
                </Button>
              </div>
            </>
          ) : (
            <>
              {/* Before vs After Comparison */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Current Profile */}
                <Card className="glass border-red-500/20">
                  <CardHeader>
                    <CardTitle className="text-red-400 flex items-center gap-2">
                      <User className="h-5 w-5" />
                      You Today
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-red-400 mb-1">{currentProfile.hireability}%</div>
                      <div className="text-sm text-muted-foreground">Hireability Score</div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>GitHub Repos</span>
                        <span>{currentProfile.githubRepos}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>LinkedIn Views/Month</span>
                        <span>{currentProfile.linkedinViews}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Portfolio Projects</span>
                        <span>{currentProfile.projects}</span>
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-medium mb-2">Current Skills</div>
                      <div className="flex flex-wrap gap-1">
                        {currentProfile.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-medium mb-2 text-red-400">Key Weaknesses</div>
                      <ul className="space-y-1">
                        {currentProfile.weaknesses.map((weakness, index) => (
                          <li key={index} className="text-xs text-red-300 flex items-center gap-2">
                            <div className="w-1 h-1 bg-red-500 rounded-full" />
                            {weakness}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Future Profile */}
                <Card className="glass border-green-500/20">
                  <CardHeader>
                    <CardTitle className="text-green-400 flex items-center gap-2">
                      <Star className="h-5 w-5" />
                      You in {timelineMonths[0]} Months
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-400 mb-1">{futureProfile.hireability}%</div>
                      <div className="text-sm text-muted-foreground">Hireability Score</div>
                      <Badge className="bg-green-500/20 text-green-400 mt-2">
                        +{futureProfile.hireability - currentProfile.hireability}% Improvement
                      </Badge>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>GitHub Repos</span>
                        <span className="text-green-400">
                          {futureProfile.githubRepos} 
                          <span className="text-xs ml-1">(+{futureProfile.githubRepos - currentProfile.githubRepos})</span>
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>LinkedIn Views/Month</span>
                        <span className="text-green-400">
                          {Math.floor(futureProfile.linkedinViews)}
                          <span className="text-xs ml-1">(+{Math.floor(futureProfile.linkedinViews - currentProfile.linkedinViews)})</span>
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Portfolio Projects</span>
                        <span className="text-green-400">
                          {futureProfile.projects}
                          <span className="text-xs ml-1">(+{futureProfile.projects - currentProfile.projects})</span>
                        </span>
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-medium mb-2">Enhanced Skills</div>
                      <div className="flex flex-wrap gap-1">
                        {futureProfile.skills.map((skill, index) => (
                          <Badge 
                            key={index} 
                            variant={currentProfile.skills.includes(skill) ? "secondary" : "default"}
                            className={`text-xs ${!currentProfile.skills.includes(skill) ? 'bg-green-500/20 text-green-400' : ''}`}
                          >
                            {skill}
                            {!currentProfile.skills.includes(skill) && ' ✨'}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-medium mb-2 text-green-400">Key Improvements</div>
                      <ul className="space-y-1">
                        {futureProfile.improvements.map((improvement, index) => (
                          <li key={index} className="text-xs text-green-300 flex items-center gap-2">
                            <div className="w-1 h-1 bg-green-500 rounded-full" />
                            {improvement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Timeline Milestones */}
              <Card className="glass border-cyan-500/20">
                <CardHeader>
                  <CardTitle className="text-cyan-400 flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Your Transformation Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {milestones
                      .filter(milestone => milestone.month <= timelineMonths[0])
                      .map((milestone, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                          {milestone.month}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-cyan-400 mb-2">
                            Month {milestone.month}: {milestone.title}
                          </h4>
                          <ul className="space-y-1">
                            {milestone.achievements.map((achievement, achIndex) => (
                              <li key={achIndex} className="text-sm text-muted-foreground flex items-center gap-2">
                                <TrendingUp className="h-3 w-3 text-green-400" />
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Action Button */}
              <div className="text-center">
                <Button size="lg" className="bg-gradient-to-r from-green-500 to-emerald-500">
                  <Zap className="h-5 w-5 mr-2" />
                  Start This Transformation
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TimeMachineSimulator;
