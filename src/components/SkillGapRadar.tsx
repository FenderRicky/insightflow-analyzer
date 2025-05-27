
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Target, TrendingUp, Book, ExternalLink, CheckCircle, AlertCircle } from 'lucide-react';

interface SkillGapRadarProps {
  userSkills: string[];
  targetRole: string;
}

const SkillGapRadar = ({ userSkills, targetRole }: SkillGapRadarProps) => {
  const getSkillAnalysis = () => {
    const roleRequirements = {
      'frontend-dev': {
        required: [
          { skill: 'React', importance: 95, userLevel: 85, marketDemand: 92 },
          { skill: 'TypeScript', importance: 90, userLevel: 70, marketDemand: 88 },
          { skill: 'CSS/SCSS', importance: 85, userLevel: 90, marketDemand: 80 },
          { skill: 'JavaScript ES6+', importance: 95, userLevel: 88, marketDemand: 95 },
          { skill: 'Git/GitHub', importance: 80, userLevel: 75, marketDemand: 85 },
          { skill: 'Responsive Design', importance: 85, userLevel: 80, marketDemand: 78 },
          { skill: 'Testing (Jest/Cypress)', importance: 75, userLevel: 40, marketDemand: 72 },
          { skill: 'Performance Optimization', importance: 70, userLevel: 35, marketDemand: 68 }
        ],
        emerging: [
          { skill: 'Next.js', importance: 80, userLevel: 45, trend: '+25%' },
          { skill: 'GraphQL', importance: 65, userLevel: 20, trend: '+40%' },
          { skill: 'Web3/Blockchain', importance: 45, userLevel: 10, trend: '+60%' },
          { skill: 'AI/ML Integration', importance: 55, userLevel: 15, trend: '+80%' }
        ]
      },
      'data-scientist': {
        required: [
          { skill: 'Python', importance: 95, userLevel: 85, marketDemand: 94 },
          { skill: 'SQL', importance: 90, userLevel: 80, marketDemand: 89 },
          { skill: 'Machine Learning', importance: 90, userLevel: 75, marketDemand: 92 },
          { skill: 'Statistics', importance: 85, userLevel: 70, marketDemand: 78 },
          { skill: 'Data Visualization', importance: 80, userLevel: 85, marketDemand: 75 },
          { skill: 'Pandas/NumPy', importance: 85, userLevel: 80, marketDemand: 82 },
          { skill: 'TensorFlow/PyTorch', importance: 75, userLevel: 45, marketDemand: 85 },
          { skill: 'A/B Testing', importance: 70, userLevel: 50, marketDemand: 68 }
        ],
        emerging: [
          { skill: 'LLMs/GPT', importance: 85, userLevel: 30, trend: '+120%' },
          { skill: 'MLOps', importance: 75, userLevel: 25, trend: '+90%' },
          { skill: 'Computer Vision', importance: 70, userLevel: 35, trend: '+70%' },
          { skill: 'Cloud ML (AWS/GCP)', importance: 80, userLevel: 40, trend: '+85%' }
        ]
      }
    };

    return roleRequirements[targetRole as keyof typeof roleRequirements] || roleRequirements['frontend-dev'];
  };

  const analysis = getSkillAnalysis();
  const overallScore = Math.round(analysis.required.reduce((acc, skill) => acc + skill.userLevel, 0) / analysis.required.length);

  const getSkillStatus = (userLevel: number, importance: number) => {
    const gap = importance - userLevel;
    if (gap <= 10) return { status: 'strong', color: 'text-green-400', icon: CheckCircle };
    if (gap <= 25) return { status: 'moderate', color: 'text-yellow-400', icon: AlertCircle };
    return { status: 'critical', color: 'text-red-400', icon: AlertCircle };
  };

  const getRecommendedResources = (skill: string) => {
    const resources = {
      'TypeScript': [
        { name: 'TypeScript Handbook', type: 'Documentation', url: '#' },
        { name: 'Total TypeScript', type: 'Course', url: '#' }
      ],
      'Testing (Jest/Cypress)': [
        { name: 'Testing Library Docs', type: 'Documentation', url: '#' },
        { name: 'Cypress Real World App', type: 'Project', url: '#' }
      ],
      'Performance Optimization': [
        { name: 'Web.dev Performance', type: 'Guide', url: '#' },
        { name: 'React Performance', type: 'Course', url: '#' }
      ]
    };
    return resources[skill as keyof typeof resources] || [];
  };

  return (
    <div className="space-y-6">
      {/* Overall Skill Score */}
      <Card className="glass border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Target className="h-5 w-5 text-brand-400" />
              Skill Readiness Score
            </span>
            <Badge className={`${
              overallScore >= 80 ? 'bg-green-500/20 text-green-300 border-green-500/30' :
              overallScore >= 60 ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' :
              'bg-red-500/20 text-red-300 border-red-500/30'
            }`}>
              {overallScore}/100
            </Badge>
          </CardTitle>
          <CardDescription>
            Your current skill alignment with {targetRole.replace('-', ' ')} requirements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Progress value={overallScore} className="h-3" />
          </div>
          <p className="text-sm text-muted-foreground">
            {overallScore >= 80 ? '🎉 You\'re well-prepared for this role!' :
             overallScore >= 60 ? '⚡ Focus on key gaps to become competitive' :
             '🚀 Significant upskilling opportunity ahead'}
          </p>
        </CardContent>
      </Card>

      {/* Core Skills Analysis */}
      <Card className="glass border-white/10">
        <CardHeader>
          <CardTitle>Core Skills Gap Analysis</CardTitle>
          <CardDescription>
            Essential skills for {targetRole.replace('-', ' ')} roles at tier-1 companies
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analysis.required.map((skill, index) => {
              const status = getSkillStatus(skill.userLevel, skill.importance);
              const StatusIcon = status.icon;
              const gap = skill.importance - skill.userLevel;
              
              return (
                <div key={index} className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <StatusIcon className={`h-4 w-4 ${status.color}`} />
                      <span className="font-medium">{skill.skill}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="glass text-xs">
                        {skill.marketDemand}% demand
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        Gap: {gap > 0 ? `+${gap}` : gap}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Your Level</span>
                        <span>{skill.userLevel}%</span>
                      </div>
                      <Progress value={skill.userLevel} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Required Level</span>
                        <span>{skill.importance}%</span>
                      </div>
                      <Progress value={skill.importance} className="h-2" />
                    </div>
                  </div>

                  {gap > 15 && (
                    <div className="mt-3 p-2 bg-blue-500/10 border border-blue-500/20 rounded">
                      <p className="text-xs text-blue-300 font-medium mb-2">📚 Recommended Learning:</p>
                      <div className="space-y-1">
                        {getRecommendedResources(skill.skill).map((resource, idx) => (
                          <div key={idx} className="flex items-center justify-between">
                            <span className="text-xs">{resource.name}</span>
                            <Badge variant="outline" className="text-xs">{resource.type}</Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Emerging Skills */}
      <Card className="glass border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-purple-400" />
            Emerging Skills & Trends
          </CardTitle>
          <CardDescription>
            Future-proof your career with these growing technologies
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {analysis.emerging.map((skill, index) => (
              <div key={index} className="p-3 rounded-lg bg-white/5 border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{skill.skill}</span>
                  <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                    {skill.trend}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Your Level</span>
                    <span>{skill.userLevel}%</span>
                  </div>
                  <Progress value={skill.userLevel} className="h-2" />
                  <div className="flex justify-between text-xs">
                    <span>Market Importance</span>
                    <span>{skill.importance}%</span>
                  </div>
                  <Progress value={skill.importance} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Plan */}
      <Card className="glass border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Book className="h-5 w-5 text-green-400" />
            30-Day Action Plan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/20">
              <div>
                <p className="font-medium text-green-300">Week 1-2: Focus on Testing</p>
                <p className="text-sm text-green-200">Biggest impact, highest priority gap</p>
              </div>
              <Button size="sm" variant="outline" className="glass">
                <ExternalLink className="h-3 w-3 mr-1" />
                Start
              </Button>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
              <div>
                <p className="font-medium text-yellow-300">Week 3: Performance Optimization</p>
                <p className="text-sm text-yellow-200">High-value skill for senior roles</p>
              </div>
              <Button size="sm" variant="outline" className="glass">
                <ExternalLink className="h-3 w-3 mr-1" />
                Plan
              </Button>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
              <div>
                <p className="font-medium text-purple-300">Week 4: Explore Next.js</p>
                <p className="text-sm text-purple-200">Future-proof emerging technology</p>
              </div>
              <Button size="sm" variant="outline" className="glass">
                <ExternalLink className="h-3 w-3 mr-1" />
                Explore
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SkillGapRadar;
