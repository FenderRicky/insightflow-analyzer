
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Award, Target, Zap } from 'lucide-react';

interface RadarData {
  skill: string;
  userScore: number;
  tierOneAvg: number;
  maxScore: number;
}

interface TierOneRadarChartProps {
  data: RadarData[];
  overallScore: number;
  tierOnePercentile: number;
}

const TierOneRadarChart = ({ data, overallScore, tierOnePercentile }: TierOneRadarChartProps) => {
  const size = 200;
  const center = size / 2;
  const radius = 70;
  const angleStep = (2 * Math.PI) / data.length;

  const getPoint = (index: number, value: number, maxValue: number) => {
    const angle = index * angleStep - Math.PI / 2;
    const distance = (value / maxValue) * radius;
    return {
      x: center + Math.cos(angle) * distance,
      y: center + Math.sin(angle) * distance
    };
  };

  const getLabelPoint = (index: number) => {
    const angle = index * angleStep - Math.PI / 2;
    const distance = radius + 20;
    return {
      x: center + Math.cos(angle) * distance,
      y: center + Math.sin(angle) * distance
    };
  };

  const userPath = data.map((item, index) => {
    const point = getPoint(index, item.userScore, item.maxScore);
    return `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`;
  }).join(' ') + ' Z';

  const tierOnePath = data.map((item, index) => {
    const point = getPoint(index, item.tierOneAvg, item.maxScore);
    return `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`;
  }).join(' ') + ' Z';

  const gridLevels = [20, 40, 60, 80, 100];

  return (
    <Card className="glass border-border/20 overflow-hidden">
      <CardHeader className="text-center pb-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
            <Target className="h-5 w-5 text-white" />
          </div>
          <CardTitle className="text-xl bg-gradient-to-r from-brand-500 to-neon-purple bg-clip-text text-transparent">
            Tier 1 Skills Radar
          </CardTitle>
        </div>
        
        <div className="flex items-center justify-center gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-gradient mb-1">{overallScore}</div>
            <div className="text-xs text-muted-foreground">Your Score</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400 mb-1">{tierOnePercentile}%</div>
            <div className="text-xs text-muted-foreground">Percentile</div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex flex-col items-center space-y-6">
        {/* Radar Chart */}
        <div className="relative">
          <svg width={size} height={size} className="overflow-visible">
            <defs>
              <radialGradient id="radarGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgb(99, 102, 241)" stopOpacity="0.1" />
                <stop offset="100%" stopColor="rgb(99, 102, 241)" stopOpacity="0.3" />
              </radialGradient>
              <linearGradient id="userGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgb(34, 211, 238)" stopOpacity="0.8" />
                <stop offset="50%" stopColor="rgb(59, 130, 246)" stopOpacity="0.8" />
                <stop offset="100%" stopColor="rgb(147, 51, 234)" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id="tierOneGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgb(34, 197, 94)" stopOpacity="0.6" />
                <stop offset="100%" stopColor="rgb(22, 163, 74)" stopOpacity="0.6" />
              </linearGradient>
            </defs>

            {/* Grid circles */}
            {gridLevels.map((level, index) => (
              <circle
                key={level}
                cx={center}
                cy={center}
                r={(level / 100) * radius}
                fill="none"
                stroke="rgb(148, 163, 184)"
                strokeOpacity="0.2"
                strokeWidth="1"
              />
            ))}

            {/* Grid lines */}
            {data.map((_, index) => {
              const angle = index * angleStep - Math.PI / 2;
              const endX = center + Math.cos(angle) * radius;
              const endY = center + Math.sin(angle) * radius;
              return (
                <line
                  key={index}
                  x1={center}
                  y1={center}
                  x2={endX}
                  y2={endY}
                  stroke="rgb(148, 163, 184)"
                  strokeOpacity="0.2"
                  strokeWidth="1"
                />
              );
            })}

            {/* Tier One benchmark area */}
            <path
              d={tierOnePath}
              fill="url(#tierOneGradient)"
              stroke="rgb(34, 197, 94)"
              strokeWidth="2"
              strokeOpacity="0.8"
            />

            {/* User performance area */}
            <path
              d={userPath}
              fill="url(#userGradient)"
              stroke="url(#userGradient)"
              strokeWidth="3"
            />

            {/* Data points */}
            {data.map((item, index) => {
              const userPoint = getPoint(index, item.userScore, item.maxScore);
              const tierPoint = getPoint(index, item.tierOneAvg, item.maxScore);
              
              return (
                <g key={index}>
                  {/* Tier One point */}
                  <circle
                    cx={tierPoint.x}
                    cy={tierPoint.y}
                    r="4"
                    fill="rgb(34, 197, 94)"
                    stroke="white"
                    strokeWidth="2"
                  />
                  
                  {/* User point */}
                  <circle
                    cx={userPoint.x}
                    cy={userPoint.y}
                    r="5"
                    fill="url(#userGradient)"
                    stroke="white"
                    strokeWidth="2"
                    className="animate-pulse"
                  />
                </g>
              );
            })}

            {/* Labels */}
            {data.map((item, index) => {
              const labelPoint = getLabelPoint(index);
              return (
                <text
                  key={index}
                  x={labelPoint.x}
                  y={labelPoint.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-xs font-medium fill-foreground"
                >
                  {item.skill}
                </text>
              );
            })}
          </svg>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500"></div>
            <span>Your Performance</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-green-500"></div>
            <span>Tier 1 Average</span>
          </div>
        </div>

        {/* Performance badges */}
        <div className="flex flex-wrap justify-center gap-2">
          {tierOnePercentile >= 85 && (
            <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
              <Award className="h-3 w-3 mr-1" />
              Elite Level
            </Badge>
          )}
          {tierOnePercentile >= 70 && tierOnePercentile < 85 && (
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
              <TrendingUp className="h-3 w-3 mr-1" />
              Above Average
            </Badge>
          )}
          {overallScore >= 80 && (
            <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              <Zap className="h-3 w-3 mr-1" />
              Strong Performer
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TierOneRadarChart;
