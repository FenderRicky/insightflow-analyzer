
import { URLValidator, RetryManager } from './urlValidation';
import { DeepSeekAnalyzer } from './deepSeekAnalysis';
import { ErrorTracker } from './errorTracking';

export interface RealTimeAnalysisResult {
  isValid: boolean;
  error?: string;
  overallScore: number;
  technicalScore: number;
  professionalScore: number;
  hireabilityScore: number;
  criticalFlaws: string[];
  quickWins: string[];
  careerPlan: {
    phase1: Array<{ task: string; urgency: 'High' | 'Medium' | 'Low'; deadline: string }>;
    phase2: Array<{ task: string; urgency: 'High' | 'Medium' | 'Low'; deadline: string }>;
    phase3: Array<{ task: string; urgency: 'High' | 'Medium' | 'Low'; deadline: string }>;
  };
  rejectionReasons?: string[];
}

export class RealTimeAnalysisEngine {
  static async analyzeProfile(url: string, targetRole: string = 'Software Engineer'): Promise<RealTimeAnalysisResult> {
    console.log('🔍 Starting real-time analysis for:', url, 'Target:', targetRole);
    
    try {
      // Step 1: Validate URL format and accessibility
      const validation = URLValidator.validateURL(url);
      if (!validation.isValid) {
        return {
          isValid: false,
          error: validation.error || 'Invalid URL format',
          overallScore: 0,
          technicalScore: 0,
          professionalScore: 0,
          hireabilityScore: 0,
          criticalFlaws: [],
          quickWins: [],
          careerPlan: { phase1: [], phase2: [], phase3: [] }
        };
      }

      // Step 2: Test URL accessibility with retry logic
      await RetryManager.withRetry(
        () => URLValidator.testURLAccessibility(validation.normalizedUrl!),
        2,
        1000
      );

      // Step 3: Run AI-powered analysis with DeepSeek
      const aiAnalysis = await RetryManager.withRetry(
        () => DeepSeekAnalyzer.analyzeProfile(validation.normalizedUrl!, targetRole),
        3,
        2000
      );

      // Step 4: Generate comprehensive career plan
      const careerPlan = this.generateCareerPlan(aiAnalysis, targetRole);
      const rejectionReasons = this.analyzeRejectionPatterns(aiAnalysis, url);

      const result: RealTimeAnalysisResult = {
        isValid: true,
        overallScore: Math.round((aiAnalysis.scores.technical + aiAnalysis.scores.professional + aiAnalysis.scores.hireability) / 3),
        technicalScore: aiAnalysis.scores.technical,
        professionalScore: aiAnalysis.scores.professional,
        hireabilityScore: aiAnalysis.scores.hireability,
        criticalFlaws: this.extractCriticalFlaws(aiAnalysis),
        quickWins: aiAnalysis.quickWins,
        careerPlan,
        rejectionReasons
      };

      console.log('✅ Real-time analysis completed:', result);
      return result;

    } catch (error) {
      console.error('❌ Real-time analysis failed:', error);
      ErrorTracker.track(error as Error, { url, targetRole, action: 'realtime_analysis' });
      
      return {
        isValid: false,
        error: 'Analysis temporarily unavailable. Please try again in a few minutes.',
        overallScore: 0,
        technicalScore: 0,
        professionalScore: 0,
        hireabilityScore: 0,
        criticalFlaws: [],
        quickWins: [],
        careerPlan: { phase1: [], phase2: [], phase3: [] }
      };
    }
  }

  private static generateCareerPlan(analysis: any, targetRole: string) {
    return {
      phase1: [
        {
          task: `Master ${targetRole} fundamentals identified in skill gaps`,
          urgency: 'High' as const,
          deadline: '30 days'
        },
        {
          task: 'Implement quick wins to boost immediate visibility',
          urgency: 'High' as const,
          deadline: '14 days'
        }
      ],
      phase2: [
        {
          task: 'Build portfolio projects demonstrating technical depth',
          urgency: 'Medium' as const,
          deadline: '60 days'
        },
        {
          task: 'Contribute to open source projects in target domain',
          urgency: 'Medium' as const,
          deadline: '45 days'
        }
      ],
      phase3: [
        {
          task: 'Network with industry professionals and apply strategically',
          urgency: 'High' as const,
          deadline: '90 days'
        },
        {
          task: 'Prepare for technical interviews with mock sessions',
          urgency: 'High' as const,
          deadline: '75 days'
        }
      ]
    };
  }

  private static extractCriticalFlaws(analysis: any): string[] {
    return analysis.criticalGaps.map((gap: string) => `FATAL FLAW: ${gap}`);
  }

  private static analyzeRejectionPatterns(analysis: any, url: string): string[] {
    const reasons = [];
    
    if (analysis.scores.technical < 70) {
      reasons.push('Technical skills below industry standard for target role');
    }
    
    if (url.includes('github') && analysis.scores.professional < 60) {
      reasons.push('GitHub profile lacks professional presentation');
    }
    
    if (url.includes('linkedin') && analysis.scores.hireability < 65) {
      reasons.push('LinkedIn optimization needed for ATS systems');
    }
    
    return reasons;
  }
}
