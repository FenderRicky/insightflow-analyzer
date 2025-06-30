
import { TIER_ONE_BENCHMARKS } from '@/data/tierOneBenchmarks';
import type { AIAnalysisResult } from './aiAnalysis';

export function calculateTierOneBenchmark(aiAnalysis: AIAnalysisResult, type: string) {
  const benchmarks = TIER_ONE_BENCHMARKS[type] || TIER_ONE_BENCHMARKS['github'];
  const userScore = (aiAnalysis.contentQuality + aiAnalysis.technicalDepth + aiAnalysis.professionalPresentation) / 3;
  
  const comparisonResults = benchmarks.map(benchmark => ({
    ...benchmark,
    userMeetsRequirement: userScore >= benchmark.avgScore - 10,
    scoreGap: Math.max(0, benchmark.avgScore - userScore)
  }));
  
  const percentile = Math.min(95, Math.max(10, userScore + Math.random() * 15 - 7.5));
  
  return {
    percentile: Math.round(percentile),
    comparisonResults,
    gapAnalysis: generateGapAnalysis(comparisonResults, aiAnalysis),
    nextLevelRequirements: generateNextLevelRequirements(comparisonResults)
  };
}

function generateGapAnalysis(comparisons: any[], aiAnalysis: AIAnalysisResult): string[] {
  const gaps = [];
  
  if (aiAnalysis.documentationQuality < 70) {
    gaps.push("Documentation quality below Tier 1 standards - add comprehensive README files and code comments");
  }
  
  if (aiAnalysis.projectCount < 5) {
    gaps.push("Project portfolio needs expansion - Tier 1 candidates typically showcase 5+ substantial projects");
  }
  
  if (aiAnalysis.codeQuality < 80) {
    gaps.push("Code architecture and quality need improvement for Tier 1 standards");
  }
  
  return gaps.length > 0 ? gaps : ["You're already meeting most Tier 1 benchmarks! Focus on showcasing leadership and system design skills."];
}

function generateNextLevelRequirements(comparisons: any[]): string[] {
  return [
    "Demonstrate system design thinking in your projects",
    "Add quantified impact metrics to your achievements",
    "Contribute to open source projects used by major companies",
    "Showcase leadership experience and mentoring capabilities"
  ];
}
