
import React, { useState } from 'react';
import { ArrowRight, GitBranch, Linkedin, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface ComparisonData {
  category: string;
  yourScore: number;
  theirScore: number;
  gap: number;
  insights: string[];
  improvements: string[];
}

const SmartComparisonTool = () => {
  const [compareUrl, setCompareUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [comparisonResults, setComparisonResults] = useState<ComparisonData[] | null>(null);

  const handleCompare = async () => {
    if (!compareUrl) return;
    
    setIsAnalyzing(true);
    
    // Simulate analysis delay
    setTimeout(() => {
      // Mock comparison data - in real implementation, this would analyze the provided URL
      const mockResults: ComparisonData[] = [
        {
          category: 'Profile Optimization',
          yourScore: 72,
          theirScore: 94,
          gap: -22,
          insights: [
            'Their headline uses 180+ characters with keywords',
            'They have 15+ skills with 50+ endorsements each',
            'Their summary includes quantified achievements'
          ],
          improvements: [
            'Expand your headline with impact metrics',
            'Add more industry-relevant skills',
            'Rewrite summary with specific numbers'
          ]
        },
        {
          category: 'Content & Engagement',
          yourScore: 45,
          theirScore: 89,
          gap: -44,
          insights: [
            'They post 2-3 times per week with industry insights',
            'Average 50+ likes and 10+ comments per post',
            'Actively comment on other professionals\' content'
          ],
          improvements: [
            'Create a content calendar for consistent posting',
            'Share technical insights and learnings',
            'Engage more with industry leaders\' content'
          ]
        },
        {
          category: 'Professional Network',
          yourScore: 68,
          theirScore: 92,
          gap: -24,
          insights: [
            'Connected to 500+ industry professionals',
            'Has connections at Google, Meta, Microsoft',
            'Receives recommendations from senior engineers'
          ],
          improvements: [
            'Connect with professionals at target companies',
            'Request recommendations from past colleagues',
            'Join relevant industry groups and participate'
          ]
        },
        {
          category: 'Experience Presentation',
          yourScore: 79,
          theirScore: 96,
          gap: -17,
          insights: [
            'Each role has 3-4 bullet points with metrics',
            'Uses STAR method for achievement descriptions',
            'Includes technologies and team sizes'
          ],
          improvements: [
            'Add quantified results to each role',
            'Mention team sizes and collaboration',
            'Include specific technologies used'
          ]
        }
      ];
      
      setComparisonResults(mockResults);
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <Card className="glass border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-brand-400" />
          Smart Comparison Tool
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Compare your profile with top-tier professionals and see exactly where you can improve
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* URL Input */}
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                placeholder="Paste LinkedIn or GitHub URL of a top professional..."
                value={compareUrl}
                onChange={(e) => setCompareUrl(e.target.value)}
                className="bg-white/10 border-white/20"
              />
              <p className="text-xs text-muted-foreground mt-1">
                e.g., linkedin.com/in/senior-engineer-google or github.com/top-developer
              </p>
            </div>
            <Button 
              onClick={handleCompare}
              disabled={!compareUrl || isAnalyzing}
              className="bg-gradient-to-r from-brand-500 to-neon-purple"
            >
              {isAnalyzing ? 'Analyzing...' : 'Compare'}
            </Button>
          </div>

          {/* Loading State */}
          {isAnalyzing && (
            <div className="text-center py-8">
              <div className="animate-spin w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-sm text-muted-foreground">Analyzing their profile against yours...</p>
            </div>
          )}

          {/* Comparison Results */}
          {comparisonResults && (
            <div className="space-y-6 mt-6">
              {/* Overall Comparison */}
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gradient">Your Profile</div>
                  <div className="text-sm text-muted-foreground">Current Score</div>
                </div>
                <ArrowRight className="h-6 w-6 text-muted-foreground" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">Their Profile</div>
                  <div className="text-sm text-muted-foreground">Benchmark</div>
                </div>
              </div>

              {/* Detailed Comparison */}
              <div className="space-y-4">
                {comparisonResults.map((item, index) => (
                  <Card key={index} className="glass border-white/10">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold">{item.category}</h4>
                        <Badge 
                          variant={item.gap >= 0 ? "default" : "destructive"}
                          className="glass"
                        >
                          {item.gap >= 0 ? '+' : ''}{item.gap} points
                        </Badge>
                      </div>
                      
                      {/* Score Comparison */}
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Your Score</span>
                            <span>{item.yourScore}/100</span>
                          </div>
                          <Progress value={item.yourScore} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Their Score</span>
                            <span>{item.theirScore}/100</span>
                          </div>
                          <Progress value={item.theirScore} className="h-2 bg-green-400/20" />
                        </div>
                      </div>

                      {/* What They Do Better */}
                      <div className="mb-4">
                        <h5 className="text-sm font-medium mb-2 flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          What they do better:
                        </h5>
                        <ul className="space-y-1">
                          {item.insights.map((insight, i) => (
                            <li key={i} className="text-sm text-muted-foreground pl-6">
                              • {insight}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Your Action Items */}
                      <div>
                        <h5 className="text-sm font-medium mb-2 flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-yellow-400" />
                          Your action items:
                        </h5>
                        <ul className="space-y-1">
                          {item.improvements.map((improvement, i) => (
                            <li key={i} className="text-sm text-green-300 pl-6">
                              • {improvement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Overall Recommendation */}
              <div className="p-4 bg-brand-500/10 border border-brand-500/20 rounded-lg">
                <h4 className="font-semibold mb-2">🎯 Priority Focus Areas</h4>
                <p className="text-sm text-muted-foreground">
                  Based on this comparison, focus on: <strong>Content & Engagement</strong> (biggest gap) and 
                  <strong> Professional Network</strong> for maximum impact. These changes could improve your 
                  overall profile strength by 25-30 points.
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartComparisonTool;
