
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Users, Award, Target } from 'lucide-react';

interface BenchmarkMapProps {
  userScore: number;
  category: string;
  role: string;
}

const BenchmarkMap = ({ userScore, category, role }: BenchmarkMapProps) => {
  const getBenchmarkData = () => {
    return {
      percentile: Math.min(95, Math.max(5, userScore + Math.random() * 20 - 10)),
      totalProfiles: Math.floor(Math.random() * 50000) + 10000,
      roleSpecific: {
        'frontend-dev': {
          topPerformers: ['React expertise: 95th percentile', 'Portfolio design: 89th percentile', 'GitHub activity: 78th percentile'],
          averageScores: { technical: 72, design: 68, communication: 75 },
          industryBenchmarks: [
            { company: 'Meta', avgScore: 92, requirement: 85 },
            { company: 'Google', avgScore: 91, requirement: 87 },
            { company: 'Netflix', avgScore: 89, requirement: 82 },
            { company: 'Airbnb', avgScore: 87, requirement: 80 }
          ]
        },
        'data-scientist': {
          topPerformers: ['Python skills: 92nd percentile', 'ML projects: 88th percentile', 'Research quality: 85th percentile'],
          averageScores: { technical: 78, research: 71, communication: 69 },
          industryBenchmarks: [
            { company: 'Google Research', avgScore: 94, requirement: 88 },
            { company: 'Meta AI', avgScore: 92, requirement: 86 },
            { company: 'OpenAI', avgScore: 96, requirement: 90 },
            { company: 'Microsoft Research', avgScore: 90, requirement: 84 }
          ]
        }
      }
    };
  };

  const data = getBenchmarkData();
  const roleData = data.roleSpecific[role as keyof typeof data.roleSpecific] || data.roleSpecific['frontend-dev'];
  
  const getPercentileMessage = (percentile: number) => {
    if (percentile >= 90) return { message: "Top 10% performer! 🏆", color: "text-yellow-400" };
    if (percentile >= 75) return { message: "Above average performer 🌟", color: "text-green-400" };
    if (percentile >= 50) return { message: "Average performer ⚡", color: "text-blue-400" };
    if (percentile >= 25) return { message: "Room for improvement 📈", color: "text-yellow-400" };
    return { message: "Significant growth opportunity 🚀", color: "text-red-400" };
  };

  const percentileInfo = getPercentileMessage(data.percentile);

  return (
    <div className="space-y-6">
      {/* Overall Ranking */}
      <Card className="glass border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-yellow-400" />
            Your Market Position
          </CardTitle>
          <CardDescription>
            Compared to {data.totalProfiles.toLocaleString()}+ professionals in your field
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-gradient mb-2">{Math.round(data.percentile)}th</div>
              <div className="text-lg text-muted-foreground">percentile</div>
              <p className={`text-sm font-medium ${percentileInfo.color}`}>
                {percentileInfo.message}
              </p>
            </div>
            
            <div className="relative">
              <Progress value={data.percentile} className="h-4" />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Bottom 10%</span>
                <span>Average</span>
                <span>Top 10%</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                <div className="text-lg font-bold text-green-400">{Math.round(data.percentile) > 50 ? Math.round(100 - data.percentile) : Math.round(data.percentile)}%</div>
                <div className="text-xs text-muted-foreground">
                  {Math.round(data.percentile) > 50 ? 'ahead of you' : 'behind you'}
                </div>
              </div>
              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                <div className="text-lg font-bold text-blue-400">{userScore}</div>
                <div className="text-xs text-muted-foreground">your score</div>
              </div>
              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                <div className="text-lg font-bold text-purple-400">{Math.round(roleData.averageScores.technical)}</div>
                <div className="text-xs text-muted-foreground">role average</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tier-1 Company Standards */}
      <Card className="glass border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-brand-400" />
            Tier-1 Company Standards
          </CardTitle>
          <CardDescription>
            How you compare to hiring standards at top tech companies
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {roleData.industryBenchmarks.map((company, index) => {
              const meets = userScore >= company.requirement;
              const gap = company.requirement - userScore;
              
              return (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${meets ? 'bg-green-400' : 'bg-red-400'}`} />
                    <div>
                      <p className="font-medium">{company.company}</p>
                      <p className="text-xs text-muted-foreground">
                        Requirement: {company.requirement}+ | Average: {company.avgScore}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    {meets ? (
                      <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                        ✓ Qualified
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="glass text-red-400 border-red-500/30">
                        +{gap} needed
                      </Badge>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Skill Breakdown */}
      <Card className="glass border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-400" />
            Performance Breakdown
          </CardTitle>
          <CardDescription>
            Your strengths compared to role averages
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(roleData.averageScores).map(([skill, average]) => {
              const userSkillScore = userScore + Math.random() * 20 - 10; // Simulate individual skill scores
              const isAboveAverage = userSkillScore > average;
              
              return (
                <div key={skill} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium capitalize">{skill}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        You: {Math.round(userSkillScore)} | Avg: {average}
                      </span>
                      {isAboveAverage ? (
                        <Badge className="bg-green-500/20 text-green-300 border-green-500/30 text-xs">
                          +{Math.round(userSkillScore - average)}
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="glass text-red-400 border-red-500/30 text-xs">
                          -{Math.round(average - userSkillScore)}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="relative">
                    <Progress value={(userSkillScore / 100) * 100} className="h-2" />
                    <div 
                      className="absolute top-0 w-0.5 h-2 bg-yellow-400"
                      style={{ left: `${average}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Top Performer Insights */}
      <Card className="glass border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-purple-400" />
            Top Performer Patterns
          </CardTitle>
          <CardDescription>
            What separates top 10% performers in your field
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {roleData.topPerformers.map((pattern, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {index + 1}
                </div>
                <span className="text-sm">{pattern}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BenchmarkMap;
