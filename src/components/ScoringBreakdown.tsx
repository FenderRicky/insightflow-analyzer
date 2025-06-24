
import React from 'react';
import { Progress } from '@/components/ui/progress';
import type { ScoringBreakdown } from '../types/analysis';

interface ScoringBreakdownProps {
  scoringBreakdown: ScoringBreakdown;
}

const ScoringBreakdownComponent = ({ scoringBreakdown }: ScoringBreakdownProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
      {Object.entries(scoringBreakdown).map(([category, data], index) => (
        <div key={index} className="text-center space-y-2">
          <div className="text-xs font-medium text-muted-foreground">{category}</div>
          <div className="flex items-center justify-center gap-2">
            <span className="text-2xl font-bold text-gradient">{data.score}</span>
            <span className="text-sm text-muted-foreground">/{data.max}</span>
          </div>
          <Progress value={(data.score / data.max) * 100} className="h-2" />
          <div className="text-xs text-muted-foreground px-2">{data.description}</div>
        </div>
      ))}
    </div>
  );
};

export default ScoringBreakdownComponent;
