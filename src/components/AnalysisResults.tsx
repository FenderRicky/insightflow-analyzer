
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Star, TrendingUp, AlertCircle, CheckCircle, Zap } from 'lucide-react';

interface AnalysisData {
  type: string;
  input: string;
  inputType: string;
}

interface AnalysisResultsProps {
  data: AnalysisData;
}

const AnalysisResults = ({ data }: AnalysisResultsProps) => {
  // Mock analysis results - in a real app, this would come from an API
  const getAnalysisResults = () => {
    if (data.type === 'portfolio') {
      return {
        overallScore: 85,
        rank: 'Senior Developer',
        rankColor: 'from-green-400 to-emerald-500',
        sections: [
          {
            title: 'Design & Visual Appeal',
            score: 88,
            color: 'bg-blue-500',
            insights: [
              'Excellent use of modern design principles',
              'Color scheme is professional and cohesive',
              'Consider adding more micro-interactions'
            ]
          },
          {
            title: 'Code Quality',
            score: 92,
            color: 'bg-green-500',
            insights: [
              'Clean, semantic HTML structure',
              'Well-organized CSS with good naming conventions',
              'JavaScript follows best practices'
            ]
          },
          {
            title: 'SEO Optimization',
            score: 78,
            color: 'bg-yellow-500',
            insights: [
              'Meta tags are properly configured',
              'Missing alt tags on some images',
              'Page loading speed could be improved'
            ]
          },
          {
            title: 'User Experience',
            score: 85,
            color: 'bg-purple-500',
            insights: [
              'Navigation is intuitive and clear',
              'Mobile responsiveness is excellent',
              'Content hierarchy could be enhanced'
            ]
          }
        ],
        recommendations: [
          'Add loading animations for better perceived performance',
          'Implement dark mode for modern appeal',
          'Create a blog section to showcase expertise',
          'Add testimonials or case studies'
        ]
      };
    } else {
      return {
        overallScore: 72,
        rank: 'Rising Professional',
        rankColor: 'from-blue-400 to-cyan-500',
        sections: [
          {
            title: 'Profile Completeness',
            score: 85,
            color: 'bg-green-500',
            insights: [
              'Headline is compelling and keyword-rich',
              'Summary section tells a strong story',
              'Experience details are comprehensive'
            ]
          },
          {
            title: 'Content Quality',
            score: 68,
            color: 'bg-yellow-500',
            insights: [
              'Posts show thought leadership potential',
              'Engagement could be more consistent',
              'Need more industry-specific content'
            ]
          },
          {
            title: 'Network Strength',
            score: 75,
            color: 'bg-blue-500',
            insights: [
              'Good connection count for your level',
              'Connections span relevant industries',
              'Consider connecting with more senior professionals'
            ]
          },
          {
            title: 'Activity & Engagement',
            score: 60,
            color: 'bg-orange-500',
            insights: [
              'Post frequency is below average',
              'Comments and likes need improvement',
              'Share more industry insights'
            ]
          }
        ],
        recommendations: [
          'Post 2-3 times per week with industry insights',
          'Engage with posts from industry leaders daily',
          'Add skills endorsements and recommendations',
          'Update experience with quantified achievements'
        ]
      };
    }
  };

  const results = getAnalysisResults();

  const getRankBadge = (score: number) => {
    if (score >= 90) return { label: 'Elite', color: 'from-yellow-400 to-orange-500' };
    if (score >= 80) return { label: 'Expert', color: 'from-green-400 to-emerald-500' };
    if (score >= 70) return { label: 'Professional', color: 'from-blue-400 to-cyan-500' };
    if (score >= 60) return { label: 'Developing', color: 'from-purple-400 to-pink-500' };
    return { label: 'Beginner', color: 'from-gray-400 to-gray-500' };
  };

  const rankBadge = getRankBadge(results.overallScore);

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 animate-fade-in">
      {/* Overall Score Card */}
      <Card className="glass border-white/10 overflow-hidden">
        <div className={`h-2 bg-gradient-to-r ${rankBadge.color}`} />
        <CardHeader className="text-center pb-4">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-brand-500/20 to-neon-purple/20 flex items-center justify-center">
                <span className="text-3xl font-bold text-gradient">{results.overallScore}</span>
              </div>
              <div className="absolute -top-2 -right-2">
                <Star className="h-6 w-6 text-yellow-400 fill-current" />
              </div>
            </div>
          </div>
          <CardTitle className="text-2xl mb-2">
            <span className={`bg-gradient-to-r ${rankBadge.color} bg-clip-text text-transparent`}>
              {rankBadge.label}
            </span>
          </CardTitle>
          <CardDescription className="text-lg">
            {data.type === 'portfolio' ? 'Portfolio Analysis Complete' : 'LinkedIn Profile Analysis Complete'}
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Detailed Scores */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gradient mb-4">Detailed Analysis</h3>
          {results.sections.map((section, index) => (
            <Card key={index} className="glass border-white/10 animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{section.title}</CardTitle>
                  <Badge variant="secondary" className="glass">
                    {section.score}/100
                  </Badge>
                </div>
                <Progress value={section.score} className="mt-2" />
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {section.insights.map((insight, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      {section.score >= 80 ? (
                        <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      ) : section.score >= 60 ? (
                        <AlertCircle className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      ) : (
                        <TrendingUp className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                      )}
                      {insight}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recommendations */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gradient mb-4">Recommendations</h3>
          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-400" />
                Action Items
              </CardTitle>
              <CardDescription>
                Priority improvements to boost your score
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {results.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-brand-500 to-neon-purple flex items-center justify-center text-xs font-bold text-white mt-0.5">
                      {index + 1}
                    </div>
                    <span className="text-sm">{rec}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Input Summary */}
          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle className="text-lg">Analysis Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Type:</span>
                <Badge variant="outline" className="glass">
                  {data.type === 'portfolio' ? 'Portfolio' : 'LinkedIn'}
                </Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Input Method:</span>
                <Badge variant="outline" className="glass">
                  {data.inputType === 'url' ? 'URL' : 'Code'}
                </Badge>
              </div>
              <Separator className="my-2 bg-white/10" />
              <div className="text-xs text-muted-foreground break-all">
                {data.input}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResults;
