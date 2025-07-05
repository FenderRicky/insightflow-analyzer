
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Circle, Code, ExternalLink, GitBranch, Clock, Target } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface InteractiveRoadmapDisplayProps {
  roadmap: any;
  profileUrl: string;
}

const InteractiveRoadmapDisplay = ({ roadmap, profileUrl }: InteractiveRoadmapDisplayProps) => {
  const [completedProjects, setCompletedProjects] = useState<Set<string>>(new Set());
  const [activePhase, setActivePhase] = useState(0);
  const { toast } = useToast();

  const toggleProjectCompletion = (projectId: string, projectName: string) => {
    const newCompleted = new Set(completedProjects);
    if (newCompleted.has(projectId)) {
      newCompleted.delete(projectId);
    } else {
      newCompleted.add(projectId);
      toast({
        title: "Project Completed! 🎉",
        description: `Great work on "${projectName}"`,
      });
    }
    setCompletedProjects(newCompleted);
  };

  const totalProjects = roadmap.phases.reduce((total: number, phase: any) => total + phase.projects.length, 0);
  const completedCount = completedProjects.size;
  const progressPercentage = totalProjects > 0 ? (completedCount / totalProjects) * 100 : 0;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'Hard': return 'bg-red-500/20 text-red-300 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Roadmap Header */}
      <Card className="glass border-white/10 overflow-hidden">
        <div className={`h-3 bg-gradient-to-r from-${roadmap.color}-500 to-purple-500`} />
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-4xl">{roadmap.icon}</div>
              <div>
                <CardTitle className="text-2xl">
                  {roadmap.company} Career Roadmap
                </CardTitle>
                <p className="text-muted-foreground mt-1">{roadmap.description}</p>
              </div>
            </div>
            <div className="text-right">
              <Badge className="bg-green-500/20 text-green-300 border-green-500/30 mb-2">
                {roadmap.successRate}% Success Rate
              </Badge>
              <p className="text-sm text-muted-foreground">Avg Salary: ${roadmap.avgSalary}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Progress: {completedCount}/{totalProjects} projects completed</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Core Skills Overview */}
      <Card className="glass border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-cyan-400" />
            Core Skills You'll Master
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {roadmap.coreSkills.map((skill: string, index: number) => (
              <Badge key={index} variant="outline" className="text-cyan-300 border-cyan-500/30">
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Phase Navigation */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {roadmap.phases.map((phase: any, index: number) => (
          <Button
            key={index}
            variant={activePhase === index ? "default" : "outline"}
            onClick={() => setActivePhase(index)}
            className="flex-shrink-0"
          >
            Phase {index + 1}
          </Button>
        ))}
      </div>

      {/* Active Phase Display */}
      {roadmap.phases[activePhase] && (
        <Card className="glass border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {activePhase + 1}
              </div>
              {roadmap.phases[activePhase].title}
              <Badge variant="outline">{roadmap.phases[activePhase].duration}</Badge>
            </CardTitle>
            <p className="text-muted-foreground">{roadmap.phases[activePhase].description}</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {roadmap.phases[activePhase].projects.map((project: any, projectIndex: number) => {
              const projectId = `${activePhase}-${projectIndex}`;
              const isCompleted = completedProjects.has(projectId);
              
              return (
                <div
                  key={projectIndex}
                  className={`p-4 rounded-lg border transition-all duration-300 ${
                    isCompleted 
                      ? 'bg-green-500/5 border-green-500/20' 
                      : 'bg-white/5 border-white/10 hover:border-cyan-500/30'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <button
                      onClick={() => toggleProjectCompletion(projectId, project.name)}
                      className="mt-1 transition-colors"
                    >
                      {isCompleted ? (
                        <CheckCircle className="h-6 w-6 text-green-500" />
                      ) : (
                        <Circle className="h-6 w-6 text-muted-foreground hover:text-cyan-400" />
                      )}
                    </button>
                    
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h4 className={`font-semibold ${isCompleted ? 'line-through text-muted-foreground' : ''}`}>
                          {project.name}
                        </h4>
                        <Badge className={getDifficultyColor(project.difficulty)}>
                          {project.difficulty}
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {project.timeEstimate}
                        </div>
                      </div>
                      
                      <p className={`text-sm text-muted-foreground ${isCompleted ? 'line-through' : ''}`}>
                        {project.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        {project.resources.map((resource: string, resIndex: number) => (
                          <Badge key={resIndex} variant="secondary" className="text-xs">
                            {resource}
                          </Badge>
                        ))}
                      </div>

                      {project.codeExample && (
                        <div className="mt-3 p-3 bg-gray-900/50 rounded border border-gray-700">
                          <div className="flex items-center gap-2 mb-2">
                            <Code className="h-4 w-4 text-cyan-400" />
                            <span className="text-sm font-medium text-cyan-400">Example Implementation</span>
                          </div>
                          <pre className="text-xs text-gray-300 overflow-x-auto">
                            <code>{project.codeExample}</code>
                          </pre>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}

      {/* Open Source Contributions */}
      <Card className="glass border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitBranch className="h-5 w-5 text-green-400" />
            Recommended Open Source Contributions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {roadmap.openSourceContributions.map((repo: string, index: number) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded border border-white/10">
                <span className="font-medium">{repo}</span>
                <Button size="sm" variant="outline">
                  <ExternalLink className="h-3 w-3 mr-1" />
                  View
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Progress Achievement */}
      {progressPercentage === 100 && (
        <Card className="glass border-green-500/20 bg-green-500/5">
          <CardContent className="p-6 text-center">
            <div className="text-4xl mb-4">🎉</div>
            <h3 className="text-xl font-bold text-green-400 mb-2">
              Roadmap Complete!
            </h3>
            <p className="text-muted-foreground">
              You're now ready to crush the {roadmap.company} interview process!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default InteractiveRoadmapDisplay;
