
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import type { AnalysisSection } from '../types/analysis';

interface AnalysisSectionProps {
  section: AnalysisSection;
  index: number;
}

const AnalysisSectionComponent = ({ section, index }: AnalysisSectionProps) => {
  const IconComponent = section.icon;

  return (
    <Card className="glass border-white/10 animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${section.color}/20`}>
              <IconComponent className={`h-5 w-5 text-white`} />
            </div>
            <CardTitle className="text-lg">{section.title}</CardTitle>
          </div>
          <div className="text-right">
            <Badge variant="secondary" className="glass text-lg px-3 py-1">
              {section.score}/100
            </Badge>
            <Progress value={section.score} className="mt-2 w-24" />
          </div>
        </div>

        {/* Missing vs Present Analysis */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
            <h4 className="text-sm font-medium text-red-300 mb-2">❌ Missing Elements</h4>
            <ul className="space-y-1">
              {section.missing?.map((item, i) => (
                <li key={i} className="text-xs text-red-200">• {item}</li>
              ))}
            </ul>
          </div>
          <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
            <h4 className="text-sm font-medium text-green-300 mb-2">✅ Present Elements</h4>
            <ul className="space-y-1">
              {section.present?.map((item, i) => (
                <li key={i} className="text-xs text-green-200">• {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Detailed Insights */}
        <div className="space-y-3 mb-4">
          <h4 className="font-medium text-sm">Detailed Analysis:</h4>
          <ul className="space-y-2">
            {section.insights.map((insight, i) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                <div className="w-2 h-2 rounded-full bg-brand-500 mt-2 flex-shrink-0" />
                <span className="text-muted-foreground">{insight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Concrete Improvements */}
        <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <h4 className="text-sm font-medium text-blue-300 mb-2">🎯 Concrete Actions to Take:</h4>
          <ul className="space-y-2">
            {section.concreteImprovements?.map((improvement, i) => (
              <li key={i} className="text-sm text-blue-200 flex items-start gap-2">
                <span className="text-blue-400 font-bold">{i + 1}.</span>
                <span>{improvement}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalysisSectionComponent;
