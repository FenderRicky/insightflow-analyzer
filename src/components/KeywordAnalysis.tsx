
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';
import type { KeywordAnalysis } from '../types/analysis';

interface KeywordAnalysisProps {
  keywordAnalysis: KeywordAnalysis;
}

const KeywordAnalysisComponent = ({ keywordAnalysis }: KeywordAnalysisProps) => {
  return (
    <Card className="glass border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5 text-yellow-400" />
          Keyword Strategy Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
            <h4 className="text-sm font-medium text-green-300 mb-2">✅ Keywords Present</h4>
            <div className="flex flex-wrap gap-1">
              {keywordAnalysis.present.map((keyword, i) => (
                <Badge key={i} variant="outline" className="text-xs bg-green-500/20 text-green-300 border-green-500/30">
                  {keyword}
                </Badge>
              ))}
            </div>
          </div>
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
            <h4 className="text-sm font-medium text-red-300 mb-2">❌ Missing Keywords</h4>
            <div className="flex flex-wrap gap-1">
              {keywordAnalysis.missing.map((keyword, i) => (
                <Badge key={i} variant="outline" className="text-xs bg-red-500/20 text-red-300 border-red-500/30">
                  {keyword}
                </Badge>
              ))}
            </div>
          </div>
          <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
            <h4 className="text-sm font-medium text-purple-300 mb-2">🔥 Trending Keywords</h4>
            <div className="flex flex-wrap gap-1">
              {keywordAnalysis.trending.map((keyword, i) => (
                <Badge key={i} variant="outline" className="text-xs bg-purple-500/20 text-purple-300 border-purple-500/30">
                  {keyword}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default KeywordAnalysisComponent;
