
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, AlertTriangle, Target, TrendingUp, Trophy, Star, Heart, MessageCircle, Lightbulb } from 'lucide-react';
import type { AnalysisResult } from '../utils/realAnalysisEngine';

interface AnalysisResultsDisplayProps {
  result: AnalysisResult;
  analyzedUrl: string;
}

const AnalysisResultsDisplay = ({ result, analyzedUrl }: AnalysisResultsDisplayProps) => {
  const getRankColor = (score: number) => {
    if (score >= 90) return 'from-yellow-400 to-orange-500';
    if (score >= 80) return 'from-green-400 to-emerald-500';
    if (score >= 70) return 'from-blue-400 to-cyan-500';
    if (score >= 60) return 'from-purple-400 to-pink-500';
    return 'from-gray-400 to-gray-500';
  };

  const getRankIcon = (score: number) => {
    if (score >= 90) return <Trophy className="h-6 w-6" />;
    if (score >= 80) return <Star className="h-6 w-6" />;
    if (score >= 70) return <Target className="h-6 w-6" />;
    return <TrendingUp className="h-6 w-6" />;
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

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 animate-fade-in">
      {/* Coaching Header with Personal Touch */}
      <Card className="glass border-white/10 overflow-hidden">
        <div className={`h-3 bg-gradient-to-r ${getRankColor(result.overallScore)}`} />
        <CardHeader className="text-center pb-6">
          {/* Coaching Tone Section */}
          <div className="mb-8 p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-white/10">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Heart className="h-5 w-5 text-pink-400" />
              <span className="text-lg font-semibold text-white">Personal Coaching Insights</span>
              <Heart className="h-5 w-5 text-pink-400" />
            </div>
            <p className="text-lg text-blue-200 mb-4 leading-relaxed">
              {result.coachingTone.overallImpression}
            </p>
            <div className="bg-white/5 rounded-lg p-4 border border-blue-500/20">
              <div className="flex items-center gap-2 mb-2">
                <MessageCircle className="h-4 w-4 text-blue-400" />
                <span className="text-sm font-medium text-blue-300">Your Coach Says:</span>
              </div>
              <p className="text-blue-100 text-sm leading-relaxed">
                {result.coachingTone.motivationalMessage}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-8 mb-6">
            <div className="relative">
              <div className={`w-32 h-32 rounded-full bg-gradient-to-r ${getRankColor(result.overallScore)}/20 flex items-center justify-center border-4 border-white/10`}>
                <div className="text-center">
                  <span className="text-4xl font-bold text-white block">{result.overallScore}</span>
                  <span className="text-sm text-gray-400">/ 100</span>
                </div>
              </div>
              <div className="absolute -top-2 -right-2">
                {getRankIcon(result.overallScore)}
              </div>
            </div>
            <div className="text-left space-y-2">
              <Badge className={`bg-gradient-to-r ${getRankColor(result.overallScore)} text-white border-0 text-lg px-4 py-2`}>
                {getRankLabel(result.professionalLevel)}
              </Badge>
              <p className="text-sm text-gray-400 max-w-xs">
                {result.coachingTone.industryComparison}
              </p>
              <div className="text-xs text-gray-500 break-all">
                Analyzed: {analyzedUrl}
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Transparent Scoring Explanation */}
      <Card className="glass border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Lightbulb className="h-5 w-5 text-yellow-400" />
            How We Calculated Your Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {result.scoringExplanation.map((explanation, index) => (
              <div key={index} className="p-3 bg-white/5 rounded-lg border border-white/10">
                <p className="text-sm text-gray-300">{explanation}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Detailed Analysis Sections */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-xl font-semibold text-white mb-4">Detailed Professional Analysis</h3>
          
          {result.sections.map((section, index) => (
            <Card key={index} className="glass border-white/10" style={{ animationDelay: `${index * 100}ms` }}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-4">
                  <CardTitle className="text-lg text-white">{section.title}</CardTitle>
                  <div className="text-right">
                    <Badge variant="secondary" className="text-lg px-3 py-1 bg-white/10">
                      {section.score}/{section.maxScore}
                    </Badge>
                    <Progress value={(section.score / section.maxScore) * 100} className="mt-2 w-24" />
                  </div>
                </div>

                {/* Industry Benchmark Context */}
                <div className="mb-4 p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
                  <h4 className="text-sm font-medium text-indigo-300 mb-1">📊 Industry Benchmark</h4>
                  <p className="text-xs text-indigo-200">{section.industryBenchmark}</p>
                </div>

                {/* Transparent Reasoning */}
                <div className="mb-4 p-3 bg-teal-500/10 border border-teal-500/20 rounded-lg">
                  <h4 className="text-sm font-medium text-teal-300 mb-2">🔍 Why This Score?</h4>
                  <p className="text-sm text-teal-200 leading-relaxed">{section.reasoning}</p>
                </div>

                {/* Section Details */}
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium text-white mb-2">What We Found:</h4>
                    <ul className="space-y-1">
                      {section.details.map((detail, i) => (
                        <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-2 flex-shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {section.improvements.length > 0 && (
                    <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                      <h4 className="text-sm font-medium text-blue-300 mb-2">🎯 Specific Improvements:</h4>
                      <ul className="space-y-1">
                        {section.improvements.map((improvement, i) => (
                          <li key={i} className="text-sm text-blue-200 flex items-start gap-2">
                            <span className="text-blue-400 font-bold">{i + 1}.</span>
                            {improvement}
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

        {/* Summary Sidebar */}
        <div className="space-y-4">
          {/* Strengths */}
          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle className="text-lg text-green-400 flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Your Strengths
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {result.strengths.map((strength, i) => (
                  <li key={i} className="text-sm text-green-300 flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 mt-1 flex-shrink-0" />
                    {strength}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Areas for Growth */}
          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle className="text-lg text-yellow-400 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Growth Opportunities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {result.weaknesses.map((weakness, i) => (
                  <li key={i} className="text-sm text-yellow-300 flex items-start gap-2">
                    <AlertTriangle className="h-3 w-3 mt-1 flex-shrink-0" />
                    {weakness}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Technologies */}
          {result.detectedTechnologies.length > 0 && (
            <Card className="glass border-white/10">
              <CardHeader>
                <CardTitle className="text-lg text-white">Technologies Detected</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {result.detectedTechnologies.map((tech, i) => (
                    <Badge key={i} variant="outline" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Personalized Action Plan */}
          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle className="text-lg text-white">Your Action Plan</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {result.recommendations.slice(0, 5).map((rec, i) => (
                  <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                    <Target className="h-3 w-3 mt-1 flex-shrink-0 text-brand-500" />
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
