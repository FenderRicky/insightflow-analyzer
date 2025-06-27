
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Target, Brain, Zap, Star, Users, Trophy, Clock, ArrowRight, Github, Linkedin, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [userProgress] = useState({
    profileScore: 87,
    completedAnalyses: 3,
    achievementsUnlocked: 5,
    weeklyGoal: 75
  });

  const recentAnalyses = [
    { type: 'github', url: 'github.com/user/project', score: 89, date: '2 hours ago' },
    { type: 'linkedin', url: 'linkedin.com/in/user', score: 76, date: '1 day ago' },
    { type: 'portfolio', url: 'myportfolio.com', score: 92, date: '3 days ago' }
  ];

  const achievements = [
    { name: 'First Analysis', icon: Target, earned: true },
    { name: 'Portfolio Pro', icon: Globe, earned: true },
    { name: 'GitHub Master', icon: Github, earned: true },
    { name: 'LinkedIn Leader', icon: Linkedin, earned: false },
    { name: 'Community Helper', icon: Users, earned: false }
  ];

  const nextSteps = [
    { title: 'Optimize LinkedIn Profile', impact: 'High', time: '15 min' },
    { title: 'Add Portfolio Projects', impact: 'Medium', time: '30 min' },
    { title: 'Update GitHub README', impact: 'High', time: '10 min' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gradient mb-2">Welcome back!</h1>  
          <p className="text-xl text-muted-foreground">Your professional growth dashboard</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="glass border-white/10">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <TrendingUp className="h-5 w-5 text-green-400" />
                <Badge className="bg-green-500/20 text-green-300">+12%</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gradient">{userProgress.profileScore}</div>
              <p className="text-sm text-muted-foreground">Profile Score</p>
              <Progress value={userProgress.profileScore} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="glass border-white/10">
            <CardHeader className="pb-2">
              <Target className="h-5 w-5 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gradient">{userProgress.completedAnalyses}</div>
              <p className="text-sm text-muted-foreground">Analyses Completed</p>
            </CardContent>
          </Card>

          <Card className="glass border-white/10">
            <CardHeader className="pb-2">
              <Trophy className="h-5 w-5 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gradient">{userProgress.achievementsUnlocked}</div>
              <p className="text-sm text-muted-foreground">Achievements</p>
            </CardContent>
          </Card>

          <Card className="glass border-white/10">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <Clock className="h-5 w-5 text-purple-400" />
                <Badge className="bg-purple-500/20 text-purple-300">This Week</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gradient">{userProgress.weeklyGoal}%</div>
              <p className="text-sm text-muted-foreground">Weekly Goal</p>
              <Progress value={userProgress.weeklyGoal} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Analyses */}
          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-blue-400" />
                Recent Analyses
              </CardTitle>
              <CardDescription>Your latest profile improvements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentAnalyses.map((analysis, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded ${
                      analysis.type === 'github' ? 'bg-green-500/20' :
                      analysis.type === 'linkedin' ? 'bg-blue-500/20' :
                      'bg-purple-500/20'
                    }`}>
                      {analysis.type === 'github' ? <Github className="h-4 w-4" /> :
                       analysis.type === 'linkedin' ? <Linkedin className="h-4 w-4" /> :
                       <Globe className="h-4 w-4" />}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{analysis.url}</p>
                      <p className="text-xs text-muted-foreground">{analysis.date}</p>
                    </div>
                  </div>
                  <Badge className={`${
                    analysis.score >= 90 ? 'bg-green-500/20 text-green-300' :
                    analysis.score >= 80 ? 'bg-blue-500/20 text-blue-300' :
                    'bg-yellow-500/20 text-yellow-300'
                  }`}>
                    {analysis.score}/100
                  </Badge>
                </div>
              ))}
              <Link to="/analyze">
                <Button className="w-full glass border-white/20 hover:border-white/40">
                  <Target className="h-4 w-4 mr-2" />
                  New Analysis
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-400" />
                Recommended Actions
              </CardTitle>
              <CardDescription>Quick wins to boost your profile</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {nextSteps.map((step, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                  <div>
                    <p className="font-medium text-sm">{step.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className={`text-xs ${
                        step.impact === 'High' ? 'border-red-500/30 text-red-300' :
                        'border-yellow-500/30 text-yellow-300'
                      }`}>
                        {step.impact} Impact
                      </Badge>
                      <span className="text-xs text-muted-foreground">{step.time}</span>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Achievements */}
        <Card className="glass border-white/10 mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-400" />
              Achievements
            </CardTitle>
            <CardDescription>Track your professional growth milestones</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {achievements.map((achievement, index) => {
                const IconComponent = achievement.icon;
                return (
                  <div key={index} className={`text-center p-4 rounded-lg border ${
                    achievement.earned ? 'bg-white/5 border-white/20' : 'bg-gray-500/5 border-gray-500/20'
                  }`}>
                    <IconComponent className={`h-8 w-8 mx-auto mb-2 ${
                      achievement.earned ? 'text-yellow-400' : 'text-gray-500'
                    }`} />
                    <p className={`text-xs font-medium ${
                      achievement.earned ? 'text-white' : 'text-gray-500'
                    }`}>
                      {achievement.name}
                    </p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
