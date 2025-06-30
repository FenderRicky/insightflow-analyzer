
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, AlertTriangle, Target, TrendingUp, Trophy, Star, Heart, MessageCircle, Lightbulb, Brain, Zap, Award, Users } from 'lucide-react';
import type { AnalysisResult } from '../utils/realAnalysisEngine';

interface AnalysisResultsDisplayProps {
  result: AnalysisResult;
  analyzedUrl: string;
}

const AnalysisResultsDisplay = ({ result, analyzedUrl }: AnalysisResultsDisplayProps) => {
  const getRankColor = (score: number) => {
    if (score >= 95) return 'from-yellow-400 via-yellow-500 to-orange-500';
    if (score >= 85) return 'from-green-400 via-green-500 to-emerald-500';
    if (score >= 75) return 'from-blue-400 via-blue-500 to-cyan-500';
    if (score >= 65) return 'from-purple-400 via-purple-500 to-pink-500';
    return 'from-gray-400 via-gray-500 to-gray-600';
  };

  const getRankIcon = (score: number) => {
    if (score >= 95) return <Trophy className="h-6 w-6 text-yellow-500" />;
    if (score >= 85) return <Award className="h-6 w-6 text-green-500" />;
    if (score >= 75) return <Star className="h-6 w-6 text-blue-500" />;
    if (score >= 65) return <Target className="h-6 w-6 text-purple-500" />;
    return <TrendingUp className="h-6 w-6 text-gray-500" />;
  };

  const getRankLabel = (level: string) => {
    const labels = {
      'Lead': 'Lead Professional',
      'Senior': 'Senior Professional', 
      'Mid': 'Mid-Level Professional',
      'Entry': 'Entry-Level Professional'
    };
    return labels[level as keyof typeof labels] || level;
  };

  const getPersonalizedEncouragement = (score: number) => {
    if (score >= 95) return "Outstanding! You're in the top 5% of professionals. Your profile demonstrates exceptional expertise and market readiness.";
    if (score >= 85) return "Excellent work! You're performing above industry standards. With minor refinements, you could reach elite status.";
    if (score >= 75) return "Strong foundation! You're on the right track with solid professional presence. Focus on the specific improvements below.";
    if (score >= 65) return "Good potential! You have valuable skills that need better showcasing. The recommendations below will significantly boost your profile.";
    return "Great starting point! Every expert was once a beginner. Follow the actionable steps below to rapidly improve your professional standing.";
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 animate-fade-in">
      {/* Enhanced Header with Personalized Coaching */}
      <Card className="glass border-border/20 overflow-hidden relative group hover:shadow-2xl hover:shadow-brand-500/10 transition-all duration-500">
        <div className={`h-4 bg-gradient-to-r ${getRankColor(result.overallScore)} animate-gradient-x`} />
        <CardHeader className="text-center pb-8 relative">
          {/* Background Enhancement */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 via-transparent to-neon-purple/5 opacity-50" />
          
          {/* Personalized Coaching Section */}
          <div className="relative mb-10 p-8 bg-gradient-to-r from-brand-500/10 via-neon-purple/10 to-neon-blue/10 rounded-2xl border border-brand-500/20 backdrop-blur-sm">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-2 rounded-full bg-gradient-to-r from-pink-500 to-red-500">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-brand-500 to-neon-purple bg-clip-text text-transparent">
                Your AI Career Coach
              </span>
              <div className="p-2 rounded-full bg-gradient-to-r from-pink-500 to-red-500">
                <Heart className="h-5 w-5 text-white" />
              </div>
            </div>
            
            <div className="space-y-6">
              <p className="text-lg text-foreground/90 leading-relaxed font-medium">
                {result.coachingTone.overallImpression}
              </p>
              
              <div className="bg-background/40 backdrop-blur-sm rounded-xl p-6 border border-brand-500/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500">
                    <MessageCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-semibold text-brand-500">Personal Encouragement:</span>
                </div>
                <p className="text-foreground/80 leading-relaxed">
                  {getPersonalizedEncouragement(result.overallScore)}
                </p>
              </div>
              
              <div className="bg-background/40 backdrop-blur-sm rounded-xl p-6 border border-neon-purple/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500">
                    <Brain className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-semibold text-neon-purple">Industry Context:</span>
                </div>
                <p className="text-foreground/80 leading-relaxed">
                  {result.coachingTone.industryComparison}
                </p>
              </div>
              
              <div className="bg-background/40 backdrop-blur-sm rounded-xl p-6 border border-green-500/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500">
                    <Zap className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-semibold text-green-500">Motivational Message:</span>
                </div>
                <p className="text-foreground/80 leading-relaxed font-medium">
                  {result.coachingTone.motivationalMessage}
                </p>
              </div>
            </div>
          </div>

          {/* Enhanced Score Display */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-10 mb-8">
            <div className="relative group">
              <div className={`w-40 h-40 rounded-full bg-gradient-to-br ${getRankColor(result.overallScore)}/20 flex items-center justify-center border-4 border-white/20 shadow-2xl group-hover:scale-105 transition-all duration-500`}>
                <div className="text-center">
                  <span className="text-5xl font-bold text-foreground block mb-1">{result.overallScore}</span>
                  <span className="text-sm text-muted-foreground">/ 100</span>
                </div>
              </div>
              <div className="absolute -top-3 -right-3 p-2 rounded-full bg-background border-2 border-white/20 shadow-lg">
                {getRankIcon(result.overallScore)}
              </div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-500/20 to-neon-purple/20 animate-pulse-glow" />
            </div>
            
            <div className="text-center lg:text-left space-y-4">
              <Badge className={`bg-gradient-to-r ${getRankColor(result.overallScore)} text-white border-0 text-xl px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300`}>
                {getRankLabel(result.professionalLevel)}
              </Badge>
              <div className="space-y-2">
                <p className="text-muted-foreground max-w-sm leading-relaxed">
                  {result.coachingTone.industryComparison}
                </p>
                <div className="flex items-center justify-center lg:justify-start gap-2 text-xs text-muted-foreground">
                  <Users className="h-3 w-3" />
                  <span>Analyzed: {new URL(analyzedUrl).hostname}</span>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Enhanced Transparent Scoring Explanation */}
      <Card className="glass border-border/20 hover:border-brand-500/30 transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-xl">
            <div className="p-2 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500">
              <Lightbulb className="h-5 w-5 text-white" />
            </div>
            <span className="bg-gradient-to-r from-brand-500 to-neon-purple bg-clip-text text-transparent">
              How We Calculated Your Score
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {result.scoringExplanation.map((explanation, index) => (
              <div key={index} className="group p-4 bg-gradient-to-r from-background/50 to-background/30 rounded-xl border border-border/50 hover:border-brand-500/30 transition-all duration-300">
                <div className="flex items-start gap-3">
                  <div className="p-1.5 rounded-full bg-gradient-to-r from-brand-500 to-neon-purple text-white text-xs font-bold min-w-[24px] h-6 flex items-center justify-center">
                    {index + 1}
                  </div>
                  <p className="text-sm text-foreground/90 leading-relaxed flex-1">{explanation}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Enhanced Detailed Analysis Sections */}
        <div className="xl:col-span-2 space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-gradient-to-r from-brand-500 to-neon-purple">
              <Target className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-brand-500 to-neon-purple bg-clip-text text-transparent">
              Detailed Professional Analysis
            </h3>
          </div>
          
          {result.sections.map((section, index) => (
            <Card key={index} className="glass border-border/20 hover:border-brand-500/30 transition-all duration-500 group" style={{ animationDelay: `${index * 150}ms` }}>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-6">
                  <CardTitle className="text-xl text-foreground flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-brand-500 to-neon-purple">
                      <Target className="h-5 w-5 text-white" />
                    </div>
                    {section.title}
                  </CardTitle>
                  <div className="text-right space-y-2">
                    <Badge variant="secondary" className="text-lg px-4 py-2 bg-gradient-to-r from-brand-500/20 to-neon-purple/20 border border-brand-500/30">
                      {section.score}/{section.maxScore}
                    </Badge>
                    <Progress value={(section.score / section.maxScore) * 100} className="w-32 h-2" />
                  </div>
                </div>

                {/* Enhanced Industry Benchmark Context */}
                <div className="mb-6 p-4 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/30 rounded-xl backdrop-blur-sm">
                  <h4 className="text-sm font-semibold text-indigo-400 mb-2 flex items-center gap-2">
                    <Award className="h-4 w-4" />
                    Industry Benchmark Analysis
                  </h4>
                  <p className="text-sm text-indigo-200/90 leading-relaxed">{section.industryBenchmark}</p>
                </div>

                {/* Enhanced Transparent Reasoning */}
                <div className="mb-6 p-4 bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/30 rounded-xl backdrop-blur-sm">
                  <h4 className="text-sm font-semibold text-teal-400 mb-3 flex items-center gap-2">
                    <Brain className="h-4 w-4" />
                    AI Analysis Reasoning
                  </h4>
                  <p className="text-sm text-teal-200/90 leading-relaxed">{section.reasoning}</p>
                </div>

                {/* Enhanced Section Details */}
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-background/50 to-background/30 rounded-xl border border-border/50">
                    <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      What We Discovered:
                    </h4>
                    <ul className="space-y-2">
                      {section.details.map((detail, i) => (
                        <li key={i} className="text-sm text-foreground/80 flex items-start gap-3 leading-relaxed">
                          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-brand-500 to-neon-purple mt-2 flex-shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {section.improvements.length > 0 && (
                    <div className="p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl backdrop-blur-sm">
                      <h4 className="text-sm font-semibold text-blue-400 mb-3 flex items-center gap-2">
                        <Zap className="h-4 w-4" />
                        Actionable Improvements:
                      </h4>
                      <ul className="space-y-3">
                        {section.improvements.map((improvement, i) => (
                          <li key={i} className="text-sm text-blue-200/90 flex items-start gap-3 leading-relaxed group">
                            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold flex-shrink-0">
                              {i + 1}
                            </div>
                            <span className="group-hover:text-blue-100 transition-colors duration-200">{improvement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Enhanced Summary Sidebar */}
        <div className="space-y-6">
          {/* Strengths */}
          <Card className="glass border-border/20 hover:border-green-500/30 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-lg text-green-400 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500">
                  <CheckCircle className="h-4 w-4 text-white" />
                </div>
                Your Key Strengths
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {result.strengths.map((strength, i) => (
                  <li key={i} className="text-sm text-green-300/90 flex items-start gap-3 p-2 rounded-lg bg-green-500/10 border border-green-500/20 leading-relaxed">
                    <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0 text-green-400" />
                    {strength}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Areas for Growth */}
          <Card className="glass border-border/20 hover:border-yellow-500/30 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-lg text-yellow-400 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500">
                  <AlertTriangle className="h-4 w-4 text-white" />
                </div>
                Growth Opportunities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {result.weaknesses.map((weakness, i) => (
                  <li key={i} className="text-sm text-yellow-300/90 flex items-start gap-3 p-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20 leading-relaxed">
                    <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0 text-yellow-400" />
                    {weakness}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Technologies */}
          {result.detectedTechnologies.length > 0 && (
            <Card className="glass border-border/20 hover:border-purple-500/30 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-lg text-foreground flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
                    <Brain className="h-4 w-4 text-white" />
                  </div>
                  Technologies Detected
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {result.detectedTechnologies.map((tech, i) => (
                    <Badge key={i} variant="outline" className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/40 hover:bg-purple-500/30 transition-all duration-200">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Personalized Action Plan */}
          <Card className="glass border-border/20 hover:border-brand-500/30 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-lg text-foreground flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-r from-brand-500 to-neon-purple">
                  <Target className="h-4 w-4 text-white" />
                </div>
                Your Priority Action Plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {result.recommendations.slice(0, 5).map((rec, i) => (
                  <li key={i} className="text-sm text-foreground/80 flex items-start gap-3 p-2 rounded-lg bg-brand-500/10 border border-brand-500/20 leading-relaxed hover:bg-brand-500/15 transition-all duration-200">
                    <div className="flex items-center justify-center w-5 h-5 rounded-full bg-gradient-to-r from-brand-500 to-neon-purple text-white text-xs font-bold flex-shrink-0">
                      {i + 1}
                    </div>
                    {rec}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResultsDisplay;
