import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Zap, TrendingUp, Clock, Target, Lightbulb } from 'lucide-react';
import { ProfileAnalysisResult } from '@/utils/profileAnalyzer';
import ErrorDisplay from './ErrorDisplay';

interface ProfileDiagnosisProps {
  analysis?: ProfileAnalysisResult | null;
  onFixFlaw?: (flaw: string) => void;
}

const ProfileDiagnosis = ({ analysis, onFixFlaw }: ProfileDiagnosisProps) => {
  if (!analysis) {
    return (
      <Card className="bg-card/50 backdrop-blur-xl border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Profile Diagnosis Preview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Upload your profile to see AI-powered diagnosis with fatal flaw detection and instant fixes.
          </p>
        </CardContent>
      </Card>
    );
  }
  const getSeverityColor = (severity: number) => {
    if (severity >= 0.8) return 'text-red-400 bg-red-500/20 border-red-500/30';
    if (severity >= 0.6) return 'text-orange-400 bg-orange-500/20 border-orange-500/30';
    return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
  };

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case 'Critical': return <AlertTriangle className="h-4 w-4 text-red-400" />;
      case 'High': return <Zap className="h-4 w-4 text-orange-400" />;
      default: return <Clock className="h-4 w-4 text-yellow-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <Card className="glass border-border/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-cyan-400" />
            Profile Diagnosis Complete
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="text-4xl font-bold text-cyan-400">
              {analysis.overallScore}/100
            </div>
            <div className="flex-1">
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-cyan-500 to-purple-500 h-3 rounded-full transition-all duration-1000"
                  style={{ width: `${analysis.overallScore}%` }}
                />
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {analysis.overallScore >= 80 ? 'Elite level' : 
                 analysis.overallScore >= 60 ? 'Strong foundation' : 'Needs improvement'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Fatal Flaws */}
      <Card className="glass border-red-500/20 bg-red-500/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-400">
            <AlertTriangle className="h-5 w-5" />
            Fatal Flaws ({analysis.fatalFlaws.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {analysis.fatalFlaws.map((flaw, index) => (
            <div key={index} className="p-4 bg-background/50 rounded-lg border border-border/50">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getUrgencyIcon(flaw.urgency)}
                  <h4 className="font-semibold">{flaw.title}</h4>
                </div>
                <Badge className={getSeverityColor(flaw.severity)}>
                  {Math.round(flaw.severity * 100)}% Impact
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{flaw.fix}</p>
              <Button 
                size="sm" 
                onClick={() => onFixFlaw?.(flaw.title)}
                className="bg-red-500/20 hover:bg-red-500/30 text-red-300 border-red-500/30"
              >
                <Zap className="h-3 w-3 mr-1" />
                Quick Fix
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Wins */}
      <Card className="glass border-green-500/20 bg-green-500/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Zap className="h-5 w-5" />
            Quick Wins ({analysis.quickWins.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {analysis.quickWins.map((win, index) => (
            <div key={index} className="p-3 bg-background/50 rounded-lg border border-border/50">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-medium text-green-300">{win.action}</h4>
                <Badge variant="outline" className="text-xs">
                  {win.timeToComplete}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">{win.impact}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Market Insights */}
      <Card className="glass border-purple-500/20 bg-purple-500/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <TrendingUp className="h-5 w-5" />
            Market Pulse
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {analysis.marketInsights.map((insight, index) => (
            <div key={index} className="flex items-start gap-2 p-2 bg-background/30 rounded">
              <Lightbulb className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
              <span className="text-sm">{insight}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileDiagnosis;
