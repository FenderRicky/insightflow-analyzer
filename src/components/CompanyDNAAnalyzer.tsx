
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Brain, Zap, Target, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CompanyDNAAnalyzerProps {
  companyData: any;
}

const CompanyDNAAnalyzer = ({ companyData }: CompanyDNAAnalyzerProps) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [userMatch, setUserMatch] = useState<number>(0);
  const { toast } = useToast();

  const runDNAAnalysis = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis with realistic delays
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate user skill matching
    const matchScore = Math.floor(Math.random() * 40) + 35; // 35-75% range
    setUserMatch(matchScore);
    setAnalysisComplete(true);
    setIsAnalyzing(false);

    toast({
      title: "DNA Analysis Complete! 🧬",
      description: `You match ${matchScore}% of ${companyData.name}'s ideal profile`,
    });
  };

  const skillImportance = companyData.techStack.map((skill: string, index: number) => ({
    name: skill,
    importance: Math.floor(Math.random() * 30) + 70, // 70-100% importance
    userLevel: analysisComplete ? Math.floor(Math.random() * 60) + 20 : 0, // 20-80% user level
    demand: ['Critical', 'High', 'Medium'][Math.floor(Math.random() * 3)]
  }));

  return (
    <div className="space-y-6">
      <Card className="glass border-white/10">
        <CardHeader>
          <CardTitle className="text-2xl bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent flex items-center gap-2">
            <Brain className="h-6 w-6 text-cyan-400" />
            {companyData.name} Company DNA Analysis
          </CardTitle>
          <p className="text-muted-foreground">
            AI-powered analysis of {companyData.name}'s hiring patterns, tech stack preferences, and success indicators
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {!analysisComplete ? (
            <div className="text-center py-8">
              <div className="mb-6">
                <div className="w-32 h-32 mx-auto bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full flex items-center justify-center border-4 border-cyan-500/30">
                  <Brain className="h-16 w-16 text-cyan-400" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-4">Ready to Decode {companyData.name}'s DNA?</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Our AI will analyze 100+ job posts, GitHub repos, and LinkedIn profiles to reveal what {companyData.name} really wants
              </p>
              <Button 
                onClick={runDNAAnalysis}
                disabled={isAnalyzing}
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-purple-500"
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3" />
                    Analyzing Company DNA...
                  </>
                ) : (
                  <>
                    <Zap className="h-5 w-5 mr-2" />
                    Run DNA Analysis
                  </>
                )}
              </Button>
            </div>
          ) : (
            <>
              {/* Match Score */}
              <div className="text-center p-6 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-lg">
                <div className="flex items-center justify-center gap-6 mb-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-gradient mb-1">{userMatch}%</div>
                    <div className="text-sm text-muted-foreground">Current Match</div>
                  </div>
                  <div className="text-6xl">→</div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-400 mb-1">85%</div>
                    <div className="text-sm text-muted-foreground">Target Match</div>
                  </div>
                </div>
                <Badge className={`${
                  userMatch >= 70 ? 'bg-green-500/20 text-green-400' :
                  userMatch >= 50 ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {userMatch >= 70 ? 'Strong Match' : userMatch >= 50 ? 'Moderate Match' : 'Needs Improvement'}
                </Badge>
              </div>

              {/* DNA Strand Visualization */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Target className="h-5 w-5 text-purple-400" />
                  {companyData.name} Skill DNA
                </h3>
                <div className="grid gap-4">
                  {skillImportance.map((skill, index) => (
                    <div key={index} className="p-4 rounded-lg bg-white/5 border border-white/10">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${
                            skill.demand === 'Critical' ? 'bg-red-500' :
                            skill.demand === 'High' ? 'bg-yellow-500' : 'bg-green-500'
                          }`} />
                          <span className="font-medium">{skill.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {skill.demand}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {skill.importance}% importance
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Your Level</span>
                          <span>{skill.userLevel}%</span>
                        </div>
                        <Progress value={skill.userLevel} className="h-2" />
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Target: {skill.importance}%</span>
                          <span className={`${
                            skill.userLevel >= skill.importance ? 'text-green-400' : 'text-yellow-400'
                          }`}>
                            Gap: {Math.max(0, skill.importance - skill.userLevel)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Insights */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="glass border-green-500/20">
                  <CardHeader>
                    <CardTitle className="text-green-400 flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Competitive Advantages
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        Strong foundation in {skillImportance[0]?.name}
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        Profile matches {companyData.name}'s engineering culture
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        Experience level aligns with open positions
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="glass border-yellow-500/20">
                  <CardHeader>
                    <CardTitle className="text-yellow-400 flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Critical Gaps to Close
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      {skillImportance
                        .filter(skill => skill.userLevel < skill.importance)
                        .slice(0, 3)
                        .map((skill, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                          Boost {skill.name} skills by {skill.importance - skill.userLevel}%
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanyDNAAnalyzer;
