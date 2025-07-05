
import { URLValidator, RetryManager } from './urlValidation';
import { DeepSeekAnalyzer } from './deepSeekAnalysis';
import { ErrorTracker } from './errorTracking';
import { RealTimeAnalysisEngine } from './realTimeAnalysisEngine';

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
      
      // Use the new real-time analysis engine as the primary method
      const realTimeResult = await RealTimeAnalysisEngine.analyzeProfile(url, targetCompany || 'Software Engineer');
      
      if (!realTimeResult.isValid) {
        return {
          isValid: false,
          error: realTimeResult.error,
          overallScore: 0,
          criticalGaps: [],
          quickWins: [],
          projectSuggestions: [],
          hireabilityScore: 0,
          nextSteps: []
        };
      }

      // Convert real-time result to enhanced format
      const nextSteps = this.generateNextSteps(realTimeResult, targetCompany);

      console.log('✅ Enhanced analysis complete:', {
        overallScore: realTimeResult.overallScore,
        hireabilityScore: realTimeResult.hireabilityScore,
        criticalGaps: realTimeResult.criticalFlaws.length
      });

      return {
        isValid: true,
        overallScore: realTimeResult.overallScore,
        deepSeekAnalysis: {
          analysis: `Real-time AI analysis completed for ${url}`,
          scores: {
            technical: realTimeResult.technicalScore,
            professional: realTimeResult.professionalScore,
            hireability: realTimeResult.hireabilityScore
          }
        },
        criticalGaps: realTimeResult.criticalFlaws,
        quickWins: realTimeResult.quickWins,
        projectSuggestions: realTimeResult.quickWins, // Use quick wins as project suggestions
        hireabilityScore: realTimeResult.hireabilityScore,
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

  private static generateNextSteps(realTimeResult: any, targetCompany?: string): string[] {
    const steps = [
      `Address critical gaps: ${realTimeResult.criticalFlaws.slice(0, 2).join(', ')}`,
      'Complete at least 2 quick wins this week',
      'Follow the 90-day career plan phases systematically'
    ];

    if (targetCompany) {
      steps.push(`Research ${targetCompany}'s recent tech blog posts and incorporate learnings`);
      steps.push(`Connect with ${targetCompany} engineers on LinkedIn`);
    }

    if (realTimeResult.hireabilityScore < 70) {
      steps.push('Schedule a mock interview to practice storytelling');
      steps.push('Get your resume reviewed by someone who works at your target company');
    }

    return steps;
  }
}
