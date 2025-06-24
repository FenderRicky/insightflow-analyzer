
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap } from 'lucide-react';
import type { AnalysisSection } from '../types/analysis';

interface QuickWinsProps {
  sections: AnalysisSection[];
}

const QuickWins = ({ sections }: QuickWinsProps) => {
  return (
    <Card className="glass border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-yellow-400" />
          Quick Wins (30 min each)
        </CardTitle>
        <CardDescription>
          High-impact changes you can make today
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {sections.slice(0, 3).map((section, index) => (
            <div key={index} className="p-3 rounded-lg bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-brand-500 to-neon-purple flex items-center justify-center text-xs font-bold text-white">
                  {index + 1}
                </div>
                <h4 className="font-medium text-sm">{section.title}</h4>
              </div>
              {section.concreteImprovements && (
                <p className="text-xs text-muted-foreground">
                  {section.concreteImprovements[0]}
                </p>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickWins;
