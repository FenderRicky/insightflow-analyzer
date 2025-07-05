
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Users, Zap, TrendingUp, Target, Upload, CheckCircle, XCircle } from 'lucide-react';

interface CompetitorAnalysis {
  competitorName: string;
  strengths: Array<{ skill: string; theirScore: number; yourScore: number }>;
  weaknesses: Array<{ skill: string; theirScore: number; yourScore: number }>;
  keyDifferentiator: string;
  actionPlan: string[];
}

const CompetitiveXRay = () => {
  const [competitorUrl, setCompetitorUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<CompetitorAnalysis | null>(null);

  const handleAnalyze = async () => {
    if (!competitorUrl.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      setAnalysis({
        competitorName: '@GoogleHire',
        strengths: [
          { skill: 'Python', theirScore: 72, yourScore: 87 },
          { skill: 'React', theirScore: 85, yourScore: 78 }
        ],
        weaknesses: [
          { skill: 'System Design', theirScore: 92, yourScore: 65 },
          { skill: 'DevOps', theirScore: 88, yourScore: 45 }
        ],
        keyDifferentiator: 'They contribute to CNCF projects (you don\'t)',
        actionPlan: [
          'Add Redis/MongoDB project to showcase system design',
          'Contribute to 1 open source project in next 30 days',
          'Add Kubernetes deployment to main project'
        ]
      });
      setIsAnalyzing(false);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <Card className="glass border-border/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-cyan-400" />
            Competitive X-Ray
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-3">
            <Input
              placeholder="Enter competitor's LinkedIn/GitHub URL"
              value={competitorUrl}
              onChange={(e) => setCompetitorUrl(e.target.value)}
              className="flex-1"
            />
            <Button 
              onClick={handleAnalyze}
              disabled={isAnalyzing || !competitorUrl.trim()}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              {isAnalyzing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  X-Ray Analysis
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {analysis && (
        <div className="space-y-4">
          {/* Battle Header */}
          <Card className="glass border-purple-500/20 bg-purple-500/5">
            <CardContent className="p-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">
                  You vs. {analysis.competitorName}
                </h2>
                <p className="text-muted-foreground">Competitive analysis complete</p>
              </div>
            </CardContent>
          </Card>

          {/* Strengths */}
          <Card className="glass border-green-500/20 bg-green-500/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-400">
                <CheckCircle className="h-5 w-5" />
                You Lead In
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {analysis.strengths.map((strength, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                  <span className="font-medium">{strength.skill}</span>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-green-400 font-bold">{strength.yourScore}%</div>
                      <div className="text-xs text-muted-foreground">vs their {strength.theirScore}%</div>
                    </div>
                    <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                      +{strength.yourScore - strength.theirScore}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Weaknesses */}
          <Card className="glass border-red-500/20 bg-red-500/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-400">
                <XCircle className="h-5 w-5" />
                They Destroy You In
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {analysis.weaknesses.map((weakness, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                  <span className="font-medium">{weakness.skill}</span>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-red-400 font-bold">{weakness.yourScore}%</div>
                      <div className="text-xs text-muted-foreground">vs their {weakness.theirScore}%</div>
                    </div>
                    <Badge className="bg-red-500/20 text-red-300 border-red-500/30">
                      -{weakness.theirScore - weakness.yourScore}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Key Differentiator */}
          <Card className="glass border-orange-500/20 bg-orange-500/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-400">
                <Target className="h-5 w-5" />
                Key Differentiator
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-medium">{analysis.keyDifferentiator}</p>
            </CardContent>
          </Card>

          {/* Action Plan */}
          <Card className="glass border-cyan-500/20 bg-cyan-500/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-cyan-400">
                <Zap className="h-5 w-5" />
                Battle Plan (Next 30 Days)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {analysis.actionPlan.map((action, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-background/50 rounded-lg">
                  <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center text-xs font-bold text-cyan-400 mt-0.5">
                    {index + 1}
                  </div>
                  <span className="flex-1">{action}</span>
                  <Button size="sm" variant="outline" className="text-cyan-400 border-cyan-500/30">
                    Start
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CompetitiveXRay;
