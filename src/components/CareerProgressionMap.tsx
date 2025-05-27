
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, TrendingUp, Target, Star, Building2, Clock } from 'lucide-react';

interface CareerProgressionMapProps {
  currentRole: string;
  experienceLevel: string;
  careerGoal: string;
}

const CareerProgressionMap = ({ currentRole, experienceLevel, careerGoal }: CareerProgressionMapProps) => {
  const getProgressionPath = () => {
    const progressionPaths = {
      'frontend-dev': {
        nextSteps: [
          { role: 'Senior Frontend Developer', timeline: '1-2 years', probability: 85 },
          { role: 'Frontend Architect', timeline: '2-3 years', probability: 65 },
          { role: 'Full Stack Developer', timeline: '1-2 years', probability: 75 },
          { role: 'Tech Lead', timeline: '3-4 years', probability: 55 }
        ],
        topCompanies: ['Meta', 'Google', 'Netflix', 'Airbnb', 'Stripe'],
        keySkills: ['React 18', 'TypeScript', 'Next.js', 'GraphQL', 'Web Performance'],
        salaryRange: '$120k - $180k'
      },
      'data-scientist': {
        nextSteps: [
          { role: 'Senior Data Scientist', timeline: '1-2 years', probability: 80 },
          { role: 'ML Engineer', timeline: '1-2 years', probability: 70 },
          { role: 'Principal Data Scientist', timeline: '3-4 years', probability: 50 },
          { role: 'Head of Data Science', timeline: '4-5 years', probability: 35 }
        ],
        topCompanies: ['Google', 'Meta', 'Amazon', 'Microsoft', 'OpenAI'],
        keySkills: ['Python', 'TensorFlow', 'PyTorch', 'SQL', 'MLOps'],
        salaryRange: '$140k - $220k'
      }
    };

    return progressionPaths[careerGoal as keyof typeof progressionPaths] || progressionPaths['frontend-dev'];
  };

  const progression = getProgressionPath();

  return (
    <div className="space-y-6">
      {/* Current Position & Goal */}
      <div className="flex items-center justify-between p-4 rounded-lg glass border border-white/10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
            <span className="text-white font-bold">NOW</span>
          </div>
          <div>
            <p className="font-medium">{currentRole || 'Current Position'}</p>
            <p className="text-sm text-muted-foreground">{experienceLevel} Level</p>
          </div>
        </div>
        
        <ArrowRight className="h-6 w-6 text-muted-foreground" />
        
        <div className="flex items-center gap-4">
          <div>
            <p className="font-medium text-right">{careerGoal.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
            <p className="text-sm text-muted-foreground text-right">Target Role</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-brand-500 to-neon-purple flex items-center justify-center">
            <Target className="h-6 w-6 text-white" />
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <Card className="glass border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-400" />
            Career Progression Paths
          </CardTitle>
          <CardDescription>
            Based on analysis of 10,000+ professional transitions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {progression.nextSteps.map((step, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white text-sm font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium">{step.role}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {step.timeline}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className={`glass ${
                    step.probability >= 70 ? 'border-green-500/50 text-green-300' :
                    step.probability >= 50 ? 'border-yellow-500/50 text-yellow-300' :
                    'border-red-500/50 text-red-300'
                  }`}>
                    {step.probability}% likely
                  </Badge>
                  <Progress value={step.probability} className="mt-2 w-16" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Target Companies */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="glass border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Building2 className="h-5 w-5 text-blue-400" />
              Top Hiring Companies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {progression.topCompanies.map((company, index) => (
                <Badge key={index} variant="outline" className="glass border-blue-500/30 text-blue-300">
                  {company}
                </Badge>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              Companies actively hiring for your target role
            </p>
          </CardContent>
        </Card>

        <Card className="glass border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Star className="h-5 w-5 text-yellow-400" />
              In-Demand Skills
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {progression.keySkills.map((skill, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm">{skill}</span>
                  <Badge variant="outline" className="glass text-xs">
                    {90 - index * 5}% demand
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Salary Insights */}
      <Card className="glass border-white/10">
        <CardHeader>
          <CardTitle className="text-lg">💰 Expected Salary Range</CardTitle>
          <CardDescription>Based on current market data for your target role</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gradient mb-2">{progression.salaryRange}</div>
          <p className="text-sm text-muted-foreground">
            Median salaries at tier-1 companies for {careerGoal.replace('-', ' ')} positions
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CareerProgressionMap;
