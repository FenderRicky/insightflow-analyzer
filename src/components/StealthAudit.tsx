
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Target, TrendingUp, AlertTriangle, CheckCircle, Building2, Zap } from 'lucide-react';

interface StealthAuditProps {
  userProfile?: {
    skills: string[];
    experience: string;
    githubUrl?: string;
    linkedinUrl?: string;
  };
}

const StealthAudit = ({ userProfile }: StealthAuditProps) => {
  const [targetCompany, setTargetCompany] = useState('');
  const [auditResults, setAuditResults] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleStealthAudit = async () => {
    if (!targetCompany.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate stealth audit analysis
    setTimeout(() => {
      const mockResults = {
        company: targetCompany,
        overallMatch: Math.floor(Math.random() * 40) + 60,
        keywordGaps: [
          { keyword: 'microservices', priority: 'high', usage: '87% of hires' },
          { keyword: 'kubernetes', priority: 'medium', usage: '64% of hires' },
          { keyword: 'payment systems', priority: 'high', usage: '92% of hires' }
        ],
        strengths: [
          { skill: 'Go programming', percentile: 85, note: 'Top 15% of candidates' },
          { skill: 'System design', percentile: 78, note: 'Above average' }
        ],
        redFlags: [
          'No CONTRIBUTING.md in main repositories',
          'Missing production deployment examples',
          'Limited open source contributions'
        ],
        recommendations: [
          'Add 2-3 projects showcasing payment/fintech experience',
          'Contribute to popular Go microservices frameworks',
          'Include Kubernetes deployment configs in your repos'
        ]
      };
      
      setAuditResults(mockResults);
      setIsAnalyzing(false);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <Card className="glass border-border/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-red-500 to-pink-500">
              <Target className="h-5 w-5 text-white" />
            </div>
            <span className="bg-gradient-to-r from-red-400 to-pink-500 bg-clip-text text-transparent">
              Stealth Audit vs Target Company
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-3">
            <Input
              placeholder="Enter target company (e.g., Stripe, Google, Meta)"
              value={targetCompany}
              onChange={(e) => setTargetCompany(e.target.value)}
              className="flex-1"
            />
            <Button 
              onClick={handleStealthAudit}
              disabled={isAnalyzing || !targetCompany.trim()}
              className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
            >
              {isAnalyzing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4 mr-2" />
                  Start Stealth Audit
                </>
              )}
            </Button>
          </div>
          
          {isAnalyzing && (
            <div className="space-y-3">
              <div className="text-sm text-muted-foreground">
                🕵️ Analyzing {targetCompany}'s hiring patterns...
              </div>
              <Progress value={66} className="h-2" />
              <div className="text-xs text-muted-foreground">
                Comparing against 500+ recent hires at {targetCompany}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {auditResults && (
        <div className="space-y-6">
          {/* Overall Match Score */}
          <Card className="glass border-border/20">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-r from-red-500/20 to-pink-500/20 flex items-center justify-center border-4 border-red-500/30">
                    <div className="text-center">
                      <span className="text-4xl font-bold text-red-400">{auditResults.overallMatch}%</span>
                      <div className="text-xs text-muted-foreground">Match Score</div>
                    </div>
                  </div>
                </div>
                <div className="text-lg font-semibold">
                  Profile Match vs {auditResults.company} Hires
                </div>
                <Badge className={`${
                  auditResults.overallMatch >= 80 ? 'bg-green-500/20 text-green-300' :
                  auditResults.overallMatch >= 60 ? 'bg-yellow-500/20 text-yellow-300' :
                  'bg-red-500/20 text-red-300'
                }`}>
                  {auditResults.overallMatch >= 80 ? 'Strong Match' :
                   auditResults.overallMatch >= 60 ? 'Moderate Match' : 'Needs Improvement'}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Keyword Gaps */}
          <Card className="glass border-border/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-400">
                <AlertTriangle className="h-5 w-5" />
                Critical Keyword Gaps
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {auditResults.keywordGaps.map((gap: any, index: number) => (
                <div key={index} className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-red-300">{gap.keyword}</span>
                    <Badge className={`${
                      gap.priority === 'high' ? 'bg-red-500/20 text-red-300' : 'bg-yellow-500/20 text-yellow-300'
                    }`}>
                      {gap.priority} priority
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Missing from your profile • {gap.usage} mention this skill
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Strengths */}
          <Card className="glass border-border/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-400">
                <CheckCircle className="h-5 w-5" />
                Your Competitive Strengths
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {auditResults.strengths.map((strength: any, index: number) => (
                <div key={index} className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-green-300">{strength.skill}</span>
                    <Badge className="bg-green-500/20 text-green-300">
                      {strength.percentile}th percentile
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {strength.note}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Red Flags */}
          <Card className="glass border-border/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-400">
                <AlertTriangle className="h-5 w-5" />
                Recruiter Red Flags
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {auditResults.redFlags.map((flag: string, index: number) => (
                <div key={index} className="p-2 bg-orange-500/10 border border-orange-500/20 rounded text-sm text-orange-300">
                  ⚠️ {flag}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Action Plan */}
          <Card className="glass border-border/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-brand-500">
                <TrendingUp className="h-5 w-5" />
                Immediate Action Plan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {auditResults.recommendations.map((rec: string, index: number) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-brand-500/10 border border-brand-500/20 rounded-lg">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-brand-500 to-neon-purple text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                    {index + 1}
                  </div>
                  <span className="text-sm text-foreground/90">{rec}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default StealthAudit;
