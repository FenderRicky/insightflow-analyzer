
import { LucideIcon } from 'lucide-react';

export interface AnalysisData {
  type: string;
  input: string;
  inputType: string;
}

export interface ScoringBreakdown {
  [key: string]: {
    score: number;
    max: number;
    description: string;
  };
}

export interface AnalysisSection {
  title: string;
  score: number;
  color: string;
  icon: LucideIcon;
  missing?: string[];
  present?: string[];
  insights: string[];
  concreteImprovements?: string[];
}

export interface KeywordAnalysis {
  present: string[];
  missing: string[];
  trending: string[];
}

export interface AnalysisResults {
  overallScore: number;
  rank: string;
  rankColor: string;
  benchmark: string;
  scoringBreakdown: ScoringBreakdown;
  sections: AnalysisSection[];
  keywordAnalysis: KeywordAnalysis;
}
