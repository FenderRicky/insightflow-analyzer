
// Tier 1 company benchmarking types
export interface TierOneBenchmark {
  company: string;
  role: string;
  avgScore: number;
  keyStrengths: string[];
  requirements: string[];
}

export interface AnalysisResult {
  overallScore: number;
  professionalLevel: string;
  sections: AnalysisSection[];
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  detectedTechnologies: string[];
  scoringExplanation: string[];
  coachingTone: {
    overallImpression: string;
    industryComparison: string;
    motivationalMessage: string;
  };
  tierOneBenchmark: {
    percentile: number;
    comparisonResults: TierOneBenchmark[];
    gapAnalysis: string[];
    nextLevelRequirements: string[];
  };
  proTips: string[];
  portfolioPolishSuggestions: {
    headline: string;
    projectDescriptions: string[];
    skillsOptimization: string[];
  };
}

export interface AnalysisSection {
  title: string;
  score: number;
  maxScore: number;
  details: string[];
  improvements: string[];
  reasoning: string;
  industryBenchmark: string;
  tierOneComparison: string;
}
