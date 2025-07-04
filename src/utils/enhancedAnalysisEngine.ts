
import { URLValidator, RetryManager } from './urlValidation';
import { DeepSeekAnalyzer } from './deepSeekAnalysis';
import { ErrorTracker } from './errorTracking';

export interface EnhancedAnalysisResult {
  isValid: boolean;
  error?: string;
  overallScore: number;
  deepSeekAnalysis?: any;
  criticalGaps: string[];
  quickWins: string[];
  projectSuggestions: string[];
  hireabilityScore: number;
  nextSteps: string[];
}

export class EnhancedAnalysisEngine {
  static async analyzeProfile(url: string, targetCompany?: string): Promise<EnhancedAnalysisResult> {
    try {
      console.log('🚀 Starting enhanced analysis for:', url);
      
      // Step 1: Validate and normalize URL
      const validation = URLValidator.validateURL(url);
      if (!validation.isValid) {
        return {
          isValid: false,
          error: validation.error,
          overallScore: 0,
          criticalGaps: [],
          quickWins: [],
          projectSuggestions: [],
          hireabilityScore: 0,
          nextSteps: []
        };
      }

      // Step 2: Test URL accessibility with retry logic
      const accessibilityCheck = await RetryManager.withRetry(
        () => URLValidator.testURLAccessibility(validation.normalizedUrl!),
        2,
        1000
      );

      // Step 3: Run AI analysis with DeepSeek
      const aiAnalysis = await RetryManager.withRetry(
        () => DeepSeekAnalyzer.analyzeProfile(validation.normalizedUrl!, targetCompany),
        3,
        2000
      );

      // Step 4: Calculate enhanced metrics
      const overallScore = Math.round((aiAnalysis.scores.technical + aiAnalysis.scores.professional + aiAnalysis.scores.hireability) / 3);
      
      const nextSteps = this.generateNextSteps(aiAnalysis, targetCompany);

      console.log('✅ Enhanced analysis complete:', {
        overallScore,
        hireabilityScore: aiAnalysis.scores.hireability,
        criticalGaps: aiAnalysis.criticalGaps.length
      });

      return {
        isValid: true,
        overallScore,
        deepSeekAnalysis: aiAnalysis,
        criticalGaps: aiAnalysis.criticalGaps,
        quickWins: aiAnalysis.quickWins,
        projectSuggestions: aiAnalysis.projectSuggestions,
        hireabilityScore: aiAnalysis.scores.hireability,
        nextSteps
      };

    } catch (error) {
      console.error('❌ Enhanced analysis failed:', error);
      ErrorTracker.track(error as Error, { url, targetCompany, action: 'enhanced_analysis' });
      
      return {
        isValid: false,
        error: 'Analysis temporarily unavailable. Our AI is being updated - please try again in a few minutes.',
        overallScore: 0,
        criticalGaps: [],
        quickWins: [],
        projectSuggestions: [],
        hireabilityScore: 0,
        nextSteps: []
      };
    }
  }

  private static generateNextSteps(analysis: any, targetCompany?: string): string[] {
    const steps = [
      `Focus on your lowest score: ${this.getLowestScoreArea(analysis.scores)}`,
      'Complete at least 2 of the quick wins this week',
      'Start working on the first suggested project'
    ];

    if (targetCompany) {
      steps.push(`Research ${targetCompany}'s recent tech blog posts and incorporate learnings`);
      steps.push(`Connect with ${targetCompany} engineers on LinkedIn`);
    }

    if (analysis.scores.hireability < 70) {
      steps.push('Schedule a mock interview to practice storytelling');
      steps.push('Get your resume reviewed by someone who works at your target company');
    }

    return steps;
  }

  private static getLowestScoreArea(scores: any): string {
    const areas = [
      { name: 'technical skills', score: scores.technical },
      { name: 'professional presentation', score: scores.professional },
      { name: 'overall hireability', score: scores.hireability }
    ];

    const lowest = areas.reduce((prev, current) => 
      prev.score < current.score ? prev : current
    );

    return lowest.name;
  }
}
