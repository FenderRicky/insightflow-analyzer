import React from 'react';
import { TrendingUp, Award, Target, Rocket } from 'lucide-react';
import { Card } from '@/components/ui/card';

const milestones = [
  {
    date: 'Week 1',
    title: 'Profile Foundation',
    description: 'Optimized bio and added key skills',
    score: 65,
    icon: Target,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    date: 'Week 2',
    title: 'First Breakthrough',
    description: 'Added portfolio projects with impact metrics',
    score: 78,
    icon: TrendingUp,
    color: 'from-cyan-500 to-blue-500'
  },
  {
    date: 'Week 3',
    title: 'Recognition',
    description: 'Profile views increased by 240%',
    score: 85,
    icon: Award,
    color: 'from-purple-500 to-pink-500'
  },
  {
    date: 'Current',
    title: 'Ready to Launch',
    description: 'Top 10% in your field',
    score: 92,
    icon: Rocket,
    color: 'from-pink-500 to-purple-500'
  }
];

const GrowthTimeline = () => {
  return (
    <Card className="p-8 bg-card/50 backdrop-blur-xl border-primary/20">
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Your Growth Journey
          </h3>
          <p className="text-muted-foreground">
            Track your professional evolution with AI-powered insights
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Glowing Line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary opacity-50" />
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary animate-pulse" style={{ clipPath: 'inset(0 0 20% 0)' }} />

          {/* Milestones */}
          <div className="space-y-8">
            {milestones.map((milestone, index) => {
              const Icon = milestone.icon;
              return (
                <div key={index} className="relative flex gap-6 animate-fade-in" style={{ animationDelay: `${index * 150}ms` }}>
                  {/* Icon */}
                  <div className={`relative z-10 w-12 h-12 rounded-full bg-gradient-to-br ${milestone.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                    <Icon className="w-6 h-6 text-white" />
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${milestone.color} blur-md opacity-50 animate-pulse`} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-8">
                    <div className="bg-muted/30 rounded-lg p-4 border border-border/50 hover:border-primary/50 transition-all">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">{milestone.date}</p>
                          <h4 className="font-semibold text-lg">{milestone.title}</h4>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            {milestone.score}
                          </p>
                          <p className="text-xs text-muted-foreground">score</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{milestone.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border/50">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">+27</p>
            <p className="text-xs text-muted-foreground">Points Gained</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-accent">4</p>
            <p className="text-xs text-muted-foreground">Weeks</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">92%</p>
            <p className="text-xs text-muted-foreground">Current Score</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default GrowthTimeline;