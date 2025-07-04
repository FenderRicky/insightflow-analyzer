
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, Download, Flame, Target, BarChart3 } from 'lucide-react';

interface SkillHeatmapProps {
  userSkills?: string[];
}

const SkillHeatmap = ({ userSkills = [] }: SkillHeatmapProps) => {
  const [heatmapData, setHeatmapData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading heatmap data
    setTimeout(() => {
      const mockData = {
        skillAnalysis: [
          { skill: 'React', userHas: true, demandScore: 95, growth: '+12%', jobCount: '45,230' },
          { skill: 'TypeScript', userHas: true, demandScore: 88, growth: '+18%', jobCount: '32,100' },
          { skill: 'Node.js', userHas: true, demandScore: 82, growth: '+8%', jobCount: '28,900' },
          { skill: 'Python', userHas: false, demandScore: 91, growth: '+15%', jobCount: '52,400' },
          { skill: 'Docker', userHas: false, demandScore: 79, growth: '+22%', jobCount: '19,800' },
          { skill: 'Kubernetes', userHas: false, demandScore: 85, growth: '+28%', jobCount: '15,600' },
          { skill: 'AWS', userHas: true, demandScore: 89, growth: '+14%', jobCount: '38,700' },
          { skill: 'GraphQL', userHas: false, demandScore: 72, growth: '+35%', jobCount: '8,900' },
          { skill: 'Next.js', userHas: true, demandScore: 78, growth: '+42%', jobCount: '12,300' },
          { skill: 'MongoDB', userHas: true, demandScore: 76, growth: '+6%', jobCount: '21,500' }
        ],
        hotCombinations: [
          { combo: 'React + TypeScript', multiplier: '3.2x', avgSalary: '$145k' },
          { combo: 'Python + Docker', multiplier: '2.8x', avgSalary: '$138k' },
          { combo: 'AWS + Kubernetes', multiplier: '3.5x', avgSalary: '$155k' }
        ],
        missingOpportunities: [
          { skill: 'Python', potentialIncrease: '+45%', reason: 'High demand + salary premium' },
          { skill: 'Kubernetes', potentialIncrease: '+32%', reason: 'Fastest growing skill' }
        ]
      };
      
      setHeatmapData(mockData);
      setIsLoading(false);
    }, 1500);
  }, [userSkills]);

  const getHeatColor = (score: number, userHas: boolean) => {
    if (!userHas) return 'from-gray-500 to-gray-600';
    if (score >= 85) return 'from-red-500 to-orange-500';
    if (score >= 70) return 'from-orange-500 to-yellow-500';
    return 'from-yellow-500 to-green-500';
  };

  const downloadHeatmap = () => {
    // Create downloadable heatmap image/PDF
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx || !heatmapData) return;
    
    canvas.width = 800;
    canvas.height = 600;
    
    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, 800, 600);
    gradient.addColorStop(0, '#1a1a2e');
    gradient.addColorStop(1, '#16213e');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 800, 600);
    
    // Title
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Your Skills Demand Heatmap', 400, 50);
    
    // Skills grid
    const skillsPerRow = 5;
    const cellWidth = 140;
    const cellHeight = 80;
    const startX = 50;
    const startY = 100;
    
    heatmapData.skillAnalysis.slice(0, 10).forEach((skill: any, index: number) => {
      const row = Math.floor(index / skillsPerRow);
      const col = index % skillsPerRow;
      const x = startX + col * cellWidth;
      const y = startY + row * cellHeight;
      
      // Skill cell background
      const intensity = skill.demandScore / 100;
      const alpha = skill.userHas ? intensity : 0.3;
      ctx.fillStyle = skill.userHas ? 
        `rgba(239, 68, 68, ${alpha})` : 
        `rgba(107, 114, 128, ${alpha})`;
      ctx.fillRect(x, y, cellWidth - 10, cellHeight - 10);
      
      // Skill name
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 14px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(skill.skill, x + cellWidth/2 - 5, y + 25);
      
      // Demand score
      ctx.font = '12px Arial';
      ctx.fillText(`${skill.demandScore}%`, x + cellWidth/2 - 5, y + 45);
      
      // Growth
      ctx.fillStyle = '#10b981';
      ctx.fillText(skill.growth, x + cellWidth/2 - 5, y + 60);
    });
    
    // Legend
    ctx.fillStyle = '#ffffff';
    ctx.font = '12px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('🔥 Red: High demand skills you have', 50, 550);
    ctx.fillText('⚪ Gray: Missing high-demand skills', 50, 570);
    
    // Download
    const link = document.createElement('a');
    link.download = 'skills-heatmap.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  if (isLoading) {
    return (
      <Card className="glass border-border/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500">
              <Flame className="h-5 w-5 text-white" />
            </div>
            Live Skills Heatmap
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-4" />
            <p className="text-muted-foreground">Analyzing 10,000+ job postings...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="glass border-border/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500">
                <Flame className="h-5 w-5 text-white" />
              </div>
              <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                Live Skills Demand Heatmap
              </span>
            </CardTitle>
            <Button 
              onClick={downloadHeatmap}
              variant="outline"
              size="sm"
              className="hover:bg-orange-500/10"
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Skills Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {heatmapData.skillAnalysis.map((skill: any, index: number) => (
              <div 
                key={index}
                className={`relative p-3 rounded-lg bg-gradient-to-br ${getHeatColor(skill.demandScore, skill.userHas)} ${
                  skill.userHas ? 'border-2 border-white/20' : 'border border-gray-500/30 opacity-60'
                } transition-all duration-300 hover:scale-105`}
              >
                <div className="text-center space-y-1">
                  <div className="font-semibold text-white text-sm">{skill.skill}</div>
                  <div className="text-xs text-white/90">{skill.demandScore}% demand</div>
                  <Badge className={`text-xs ${
                    skill.growth.startsWith('+') ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
                  }`}>
                    {skill.growth}
                  </Badge>
                </div>
                {!skill.userHas && (
                  <div className="absolute top-1 right-1 text-xs bg-gray-800 text-white px-1 rounded">
                    Missing
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 justify-center text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gradient-to-r from-red-500 to-orange-500 rounded" />
              <span>High Demand + You Have It</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-500 rounded opacity-60" />
              <span>Missing High-Demand Skill</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hot Combinations */}
      <Card className="glass border-border/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-400">
            <Target className="h-5 w-5" />
            High-Value Skill Combinations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {heatmapData.hotCombinations.map((combo: any, index: number) => (
            <div key={index} className="p-3 bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-orange-300">{combo.combo}</span>
                <div className="text-right">
                  <Badge className="bg-orange-500/20 text-orange-300 mb-1">
                    {combo.multiplier} job opportunities
                  </Badge>
                  <div className="text-sm text-muted-foreground">{combo.avgSalary} avg</div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Missing Opportunities */}
      <Card className="glass border-border/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-400">
            <TrendingUp className="h-5 w-5" />
            Your Biggest Opportunities
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {heatmapData.missingOpportunities.map((opp: any, index: number) => (
            <div key={index} className="p-3 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-semibold text-yellow-300">Learn {opp.skill}</span>
                  <div className="text-sm text-muted-foreground">{opp.reason}</div>
                </div>
                <Badge className="bg-yellow-500/20 text-yellow-300">
                  {opp.potentialIncrease} more jobs
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default SkillHeatmap;
