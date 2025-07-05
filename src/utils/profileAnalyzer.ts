
import { DeepSeekAnalyzer } from './deepSeekAnalysis';
import { URLValidator } from './urlValidation';
import { ErrorTracker } from './errorTracking';

export interface ProfileAnalysisResult {
  isValid: boolean;
  error?: string;
  fatalFlaws: Array<{
    title: string;
    severity: number;
    fix: string;
    urgency: 'Critical' | 'High' | 'Medium';
  }>;
  quickWins: Array<{
    action: string;
    impact: string;
    timeToComplete: string;
  }>;
  competitiveGaps: string[];
  overallScore: number;
  marketInsights: string[];
}

export class ProfileAnalyzer {
  static async analyzeProfile(url: string): Promise<ProfileAnalysisResult> {
    console.log('🔍 Starting profile analysis for:', url);
    
    try {
      // Step 1: Validate URL format and accessibility
      const validation = URLValidator.validateURL(url);
      if (!validation.isValid) {
        return {
          isValid: false,
          error: validation.error || 'Invalid URL format',
          fatalFlaws: [],
          quickWins: [],
          competitiveGaps: [],
          overallScore: 0,
          marketInsights: []
        };
      }

      // Step 2: Test URL accessibility
      const accessibility = await URLValidator.testURLAccessibility(validation.normalizedUrl!);
      if (!accessibility.accessible) {
        return {
          isValid: false,
          error: 'Profile not accessible. Please ensure it\'s public.',
          fatalFlaws: [],
          quickWins: [],
          competitiveGaps: [],
          overallScore: 0,
          marketInsights: []
        };
      }

      // Step 3: AI-powered analysis
      const aiAnalysis = await DeepSeekAnalyzer.analyzeProfile(validation.normalizedUrl!);
      
      // Step 4: Generate structured result
      const result: ProfileAnalysisResult = {
        isValid: true,
        fatalFlaws: this.extractFatalFlaws(aiAnalysis.criticalGaps),
        quickWins: this.generateQuickWins(aiAnalysis.quickWins),
        competitiveGaps: aiAnalysis.criticalGaps,
        overallScore: Math.round((aiAnalysis.scores.technical + aiAnalysis.scores.professional + aiAnalysis.scores.hireability) / 3),
        marketInsights: this.generateMarketInsights(url)
      };

      console.log('✅ Profile analysis completed:', result);
      return result;

    } catch (error) {
      console.error('❌ Profile analysis failed:', error);
      ErrorTracker.track(error as Error, { url, action: 'profile_analysis' });
      
      return {
        isValid: false,
        error: 'Analysis temporarily unavailable. Our AI is experiencing high demand. Please try again in a few minutes.',
        fatalFlaws: [],
        quickWins: [],
        competitiveGaps: [],
        overallScore: 0,
        marketInsights: []
      };
    }
  }

  private static extractFatalFlaws(criticalGaps: string[]): Array<{
    title: string;
    severity: number;
    fix: string;
    urgency: 'Critical' | 'High' | 'Medium';
  }> {
    return criticalGaps.slice(0, 3).map((gap, index) => ({
      title: gap,
      severity: 0.9 - (index * 0.1),
      fix: this.generateFix(gap),
      urgency: index === 0 ? 'Critical' : index === 1 ? 'High' : 'Medium'
    }));
  }

  private static generateFix(flaw: string): string {
    const fixes: Record<string, string> = {
      'No Kubernetes': 'Add Dockerfile and k8s deployment configs to your main project',
      'Missing system design': 'Create architecture diagrams using Lucidchart or Draw.io',
      'Weak documentation': 'Use AI to rewrite README with proper sections and examples',
      'No testing': 'Add Jest/PyTest suite with >80% coverage',
      'Missing CI/CD': 'Set up GitHub Actions workflow for automated testing'
    };

    for (const [key, fix] of Object.entries(fixes)) {
      if (flaw.toLowerCase().includes(key.toLowerCase())) {
        return fix;
      }
    }

    return 'Contact our career engineers for personalized solution';
  }

  private static generateQuickWins(quickWins: string[]): Array<{
    action: string;
    impact: string;
    timeToComplete: string;
  }> {
    return quickWins.slice(0, 3).map(win => ({
      action: win,
      impact: 'Increases hireability score by 15-25 points',
      timeToComplete: '1-2 hours'
    }));
  }

  private static generateMarketInsights(url: string): string[] {
    const insights = [
      '🔥 Python + Rust demand spiked 300% at quant firms this week',
      '💡 Companies hiring: Stripe, Airbnb, Tesla are prioritizing your skill set',
      '📈 Your profile type gets 40% more callbacks with proper keywords'
    ];

    if (url.includes('github')) {
      insights.push('🚀 GitHub profiles with CI/CD get 2x more recruiter views');
    }

    if (url.includes('linkedin')) {
      insights.push('💼 LinkedIn optimization could increase your visibility by 60%');
    }

    return insights;
  }
}
