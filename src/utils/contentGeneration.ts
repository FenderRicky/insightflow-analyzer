
import type { AIAnalysisResult } from './aiAnalysis';

export function generateProTips(aiAnalysis: AIAnalysisResult, tierBenchmark: any): string[] {
  const tips = [];
  
  if (aiAnalysis.technicalDepth < 80) {
    tips.push("🚀 Pro Tip: Add technical blog posts or detailed project breakdowns to demonstrate deep technical knowledge");
  }
  
  if (tierBenchmark.percentile < 75) {
    tips.push("⭐ Pro Tip: Contribute to popular open source projects to boost your visibility and credibility with Tier 1 recruiters");
  }
  
  return tips.slice(0, 2); // Return max 2 pro tips
}

export function generatePortfolioPolishSuggestions(aiAnalysis: AIAnalysisResult) {
  return {
    headline: "Senior Full Stack Engineer | Building scalable solutions with modern technologies | Open source contributor",
    projectDescriptions: [
      "Architected and deployed a real-time collaboration platform serving 10K+ users with 99.9% uptime",
      "Optimized application performance by 60% through advanced caching strategies and database query optimization"
    ],
    skillsOptimization: [
      "Highlight specific frameworks and libraries you've mastered",
      "Add metrics and quantified achievements to each skill",
      "Group related technologies into coherent skill categories"
    ]
  };
}
