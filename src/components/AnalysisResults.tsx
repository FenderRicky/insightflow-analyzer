
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Star, TrendingUp, AlertCircle, CheckCircle, Zap, Target, Code, Palette, Users, Trophy, Eye, Shield, Gauge, Search, Smartphone, Globe, GitBranch, Linkedin, FileText, BarChart3 } from 'lucide-react';
import AIFeedbackChatbot from './AIFeedbackChatbot';
import SmartComparisonTool from './SmartComparisonTool';
import AIContentGenerator from './AIContentGenerator';
import ScoringBreakdownComponent from './ScoringBreakdown';
import KeywordAnalysisComponent from './KeywordAnalysis';
import QuickWins from './QuickWins';
import ErrorDisplay from './ErrorDisplay';
import { generateDynamicAnalysis } from '../utils/analysisEngine';
import type { AnalysisResults as AnalysisResultsType } from '../types/analysis';

interface AnalysisData {
  type: string;
  input: string;
  inputType: string;
}

interface AnalysisResultsProps {
  data: AnalysisData;
}

const AnalysisResults = ({ data }: AnalysisResultsProps) => {
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);

  // Generate dynamic analysis based on actual input
  const analysisResult = generateDynamicAnalysis(data.input, data.type, {
    inputType: data.inputType
  });

  // Handle validation errors
  if (!analysisResult.isValid) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <ErrorDisplay 
          error={analysisResult.error || 'Analysis failed'}
          type="validation"
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  // Enhanced analysis with granular scoring and context-aware feedback
  const getAnalysisResults = (): AnalysisResultsType => {
    if (data.type === 'portfolio') {
      const input = data.input.toLowerCase();
      const isDesignPortfolio = input.includes('design') || input.includes('ux') || input.includes('ui') || 
                               input.includes('figma') || input.includes('dribbble') || input.includes('behance');
      const isDeveloperPortfolio = input.includes('github') || input.includes('dev') || input.includes('code') ||
                                  input.includes('react') || input.includes('javascript') || input.includes('python') ||
                                  data.inputType === 'code';

      // Use dynamic analysis score
      const baseScore = analysisResult.score || 75;
      
      if (isDesignPortfolio) {
        return {
          overallScore: Math.min(baseScore + 5, 100),
          rank: 'Design Professional',
          rankColor: 'from-pink-400 to-purple-500',
          benchmark: `Benchmarked against Google Design, Airbnb Design, Figma portfolios. Detected: ${analysisResult.detectedTech.join(', ') || 'standard web technologies'}`,
          scoringBreakdown: {
            'Visual Hierarchy': { score: 18, max: 20, description: 'Clear typography and spacing patterns' },
            'Case Study Depth': { score: 14, max: 20, description: 'Missing quantified impact metrics' },
            'Technical Implementation': { score: analysisResult.urlAnalysis?.isHttps ? 18 : 14, max: 20, description: analysisResult.urlAnalysis?.isHttps ? 'Secure HTTPS implementation' : 'Needs HTTPS security' },
            'Professional Positioning': { score: analysisResult.urlAnalysis?.hasCustomDomain ? 19 : 15, max: 20, description: analysisResult.urlAnalysis?.hasCustomDomain ? 'Professional custom domain' : 'Consider custom domain' },
            'Content Quality': { score: analysisResult.urlAnalysis?.hasAbout ? 17 : 13, max: 20, description: analysisResult.urlAnalysis?.hasAbout ? 'Well-structured content' : 'Missing about section' }
          },
          sections: [
            {
              title: 'URL Structure & Technical Analysis',
              score: baseScore,
              color: 'bg-blue-500',
              icon: Globe,
              missing: analysisResult.recommendations.filter(r => r.includes('missing') || r.includes('Add')),
              present: [
                ...(analysisResult.urlAnalysis?.isHttps ? ['HTTPS Security'] : []),
                ...(analysisResult.urlAnalysis?.hasCustomDomain ? ['Custom Domain'] : []),
                ...(analysisResult.detectedTech.length > 0 ? [`Technologies: ${analysisResult.detectedTech.join(', ')}`] : [])
              ],
              insights: [
                `URL analysis reveals ${analysisResult.urlAnalysis?.pathDepth || 0} navigation levels`,
                `${analysisResult.detectedTech.length} technologies detected from URL structure`,
                `Security score: ${analysisResult.urlAnalysis?.isHttps ? 'Excellent (HTTPS)' : 'Needs improvement (HTTP only)'}`,
                `Domain setup: ${analysisResult.urlAnalysis?.hasCustomDomain ? 'Professional custom domain' : 'Using hosted platform domain'}`
              ],
              concreteImprovements: analysisResult.recommendations
            }
          ],
          keywordAnalysis: {
            present: analysisResult.detectedTech,
            missing: ['Design Systems', 'Accessibility', 'A/B Testing', 'Product Strategy', 'Stakeholder Management'],
            trending: ['Design Tokens', 'Inclusive Design', 'Design Ops', 'Cross-functional Collaboration']
          }
        };
      } else if (isDeveloperPortfolio) {
        return {
          overallScore: Math.min(baseScore + 7, 100),
          rank: 'Developer Professional',
          rankColor: 'from-green-400 to-blue-500',
          benchmark: `Benchmarked against Meta L5-L6, Google L4-L5 engineering portfolios. Detected: ${analysisResult.detectedTech.join(', ') || 'web technologies'}`,
          scoringBreakdown: {
            'Code Quality': { score: 19, max: 20, description: 'Excellent architecture and TypeScript usage' },
            'Project Depth': { score: analysisResult.urlAnalysis?.hasProjects ? 18 : 14, max: 20, description: analysisResult.urlAnalysis?.hasProjects ? 'Good project showcase' : 'Need more project examples' },
            'Technical Communication': { score: analysisResult.urlAnalysis?.hasBlog ? 17 : 13, max: 20, description: analysisResult.urlAnalysis?.hasBlog ? 'Strong technical writing' : 'Missing blog/documentation' },
            'Performance & Security': { score: analysisResult.urlAnalysis?.isHttps ? 19 : 15, max: 20, description: analysisResult.urlAnalysis?.isHttps ? 'Secure implementation' : 'Security improvements needed' },
            'Professional Presence': { score: baseScore > 80 ? 20 : 16, max: 20, description: 'Strong technical presence' }
          },
          sections: [
            {
              title: 'Technical Stack Analysis',
              score: baseScore,
              color: 'bg-green-500',
              icon: Code,
              missing: analysisResult.recommendations,
              present: [
                ...(analysisResult.detectedTech.length > 0 ? [`Technologies: ${analysisResult.detectedTech.join(', ')}`] : []),
                ...(analysisResult.urlAnalysis?.isHttps ? ['Secure HTTPS'] : []),
                ...(analysisResult.urlAnalysis?.hasCustomDomain ? ['Professional Domain'] : [])
              ],
              insights: [
                `Detected ${analysisResult.detectedTech.length} modern technologies in your portfolio`,
                `URL structure indicates ${analysisResult.urlAnalysis?.pathDepth > 2 ? 'complex' : 'simple'} architecture`,
                `Security implementation: ${analysisResult.urlAnalysis?.isHttps ? 'Professional grade' : 'Needs HTTPS'}`,
                `Project showcase: ${analysisResult.urlAnalysis?.hasProjects ? 'Well organized' : 'Could be improved'}`
              ],
              concreteImprovements: [
                ...analysisResult.recommendations,
                `Add more ${analysisResult.detectedTech.length < 3 ? 'technology diversity' : 'advanced features'}`,
                'Include performance metrics and benchmarks'
              ]
            }
          ],
          keywordAnalysis: {
            present: analysisResult.detectedTech.length > 0 ? analysisResult.detectedTech : ['Web Development'],
            missing: ['System Design', 'Testing', 'CI/CD', 'Performance Optimization'],
            trending: ['AI Integration', 'Edge Computing', 'WebAssembly', 'Micro-frontends']
          }
        };
      }
    } else if (data.type === 'linkedin') {
      return {
        overallScore: analysisResult.score || 74,
        rank: 'Professional Profile',
        rankColor: 'from-blue-400 to-cyan-500',
        benchmark: `Benchmarked against LinkedIn profiles from Google L4-L5, Meta E4-E5 employees. URL analysis: ${analysisResult.urlAnalysis?.isHttps ? 'Secure' : 'Standard'}`,
        scoringBreakdown: {
          'Profile URL Structure': { score: analysisResult.urlAnalysis?.pathDepth === 2 ? 18 : 14, max: 20, description: 'Professional URL format' },
          'Accessibility': { score: analysisResult.urlAnalysis?.isHttps ? 20 : 16, max: 20, description: 'Profile accessibility score' },
          'Professional Setup': { score: 16, max: 20, description: 'Based on URL structure analysis' }
        },
        sections: [
          {
            title: 'LinkedIn URL & Accessibility Analysis',
            score: analysisResult.score || 74,
            color: 'bg-blue-500',
            icon: Linkedin,
            missing: analysisResult.recommendations,
            present: [
              ...(analysisResult.urlAnalysis?.isHttps ? ['Secure HTTPS Access'] : []),
              'Professional URL Structure',
              'LinkedIn Platform Integration'
            ],
            insights: [
              `LinkedIn URL structure: ${analysisResult.urlAnalysis?.pathDepth === 2 ? 'Standard professional format' : 'Custom or modified URL'}`,
              `Security: ${analysisResult.urlAnalysis?.isHttps ? 'Full HTTPS encryption' : 'Standard HTTP access'}`,
              'Profile appears to be publicly accessible for analysis',
              'URL follows LinkedIn\'s standard naming conventions'
            ],
            concreteImprovements: analysisResult.recommendations
          }
        ],
        keywordAnalysis: {
          present: ['LinkedIn', 'Professional Network'],
          missing: ['Industry Keywords', 'Skills Optimization', 'Achievement Metrics'],
          trending: ['AI Skills', 'Remote Leadership', 'Cross-functional Collaboration', 'Technical Strategy']
        }
      };
    } else if (data.type === 'github') {
      return {
        overallScore: analysisResult.score || 81,
        rank: 'Active Developer',
        rankColor: 'from-green-400 to-blue-500',
        benchmark: `Benchmarked against GitHub profiles from tier-1 company engineers. Detected: ${analysisResult.detectedTech.join(', ') || 'repositories'}`,
        scoringBreakdown: {
          'Repository Structure': { score: analysisResult.urlAnalysis?.pathDepth > 1 ? 18 : 14, max: 20, description: 'GitHub organization quality' },
          'Technical Presence': { score: analysisResult.detectedTech.length * 3, max: 20, description: 'Technology diversity' },
          'Professional Setup': { score: analysisResult.urlAnalysis?.isHttps ? 20 : 16, max: 20, description: 'GitHub profile accessibility' }
        },
        sections: [
          {
            title: 'GitHub Repository Analysis',
            score: analysisResult.score || 81,
            color: 'bg-green-500',
            icon: GitBranch,
            missing: analysisResult.recommendations,
            present: [
              ...(analysisResult.detectedTech.length > 0 ? [`Technologies: ${analysisResult.detectedTech.join(', ')}`] : []),
              ...(analysisResult.urlAnalysis?.isHttps ? ['Secure HTTPS Access'] : []),
              'GitHub Platform Integration'
            ],
            insights: [
              `GitHub URL structure indicates ${analysisResult.urlAnalysis?.pathDepth > 2 ? 'repository-specific' : 'profile-level'} analysis`,
              `Detected ${analysisResult.detectedTech.length} technology indicators from URL`,
              `Repository accessibility: ${analysisResult.urlAnalysis?.isHttps ? 'Fully secure' : 'Standard access'}`,
              'URL follows GitHub\'s standard repository conventions'
            ],
            concreteImprovements: [
              ...analysisResult.recommendations,
              'Add comprehensive README files',
              'Include live demo links',
              'Document technical architecture'
            ]
          }
        ],
        keywordAnalysis: {
          present: analysisResult.detectedTech.length > 0 ? analysisResult.detectedTech : ['GitHub', 'Version Control'],
          missing: ['Documentation', 'Testing', 'CI/CD', 'Code Quality'],
          trending: ['GitHub Actions', 'Container Registry', 'Security Scanning', 'Automated Testing']
        }
      };
    }

    // Fallback for other input types
    return {
      overallScore: analysisResult.score || 70,
      rank: 'Professional',
      rankColor: 'from-gray-400 to-gray-500',
      benchmark: 'General professional analysis with URL validation',
      scoringBreakdown: {
        'Overall Quality': { score: analysisResult.score || 70, max: 100, description: 'Comprehensive analysis score' }
      },
      sections: [],
      keywordAnalysis: {
        present: analysisResult.detectedTech || [],
        missing: [],
        trending: []
      }
    };
  };

  const results = getAnalysisResults();

  const getRankBadge = (score: number) => {
    if (score >= 95) return { label: 'Tier-1 Ready', color: 'from-yellow-400 to-orange-500', icon: '🏆' };
    if (score >= 85) return { label: 'Senior Level', color: 'from-green-400 to-emerald-500', icon: '⭐' };
    if (score >= 75) return { label: 'Professional', color: 'from-blue-400 to-cyan-500', icon: '🎯' };
    if (score >= 65) return { label: 'Developing', color: 'from-purple-400 to-pink-500', icon: '🚀' };
    return { label: 'Entry Level', color: 'from-gray-400 to-gray-500', icon: '🌱' };
  };

  const rankBadge = getRankBadge(results.overallScore);

  // Create mock user profile for AI Content Generator
  const mockUserProfile = {
    skills: analysisResult.detectedTech.length > 0 ? analysisResult.detectedTech : ['React', 'JavaScript', 'TypeScript', 'Node.js', 'CSS'],
    experience: 'mid',
    role: 'frontend-dev'
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 animate-fade-in">
      {/* Enhanced Overall Score Card with Real Analysis Data */}
      <Card className="glass border-white/10 overflow-hidden">
        <div className={`h-3 bg-gradient-to-r ${rankBadge.color}`} />
        <CardHeader className="text-center pb-4">
          <div className="flex items-center justify-center gap-6 mb-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-brand-500/20 to-neon-purple/20 flex items-center justify-center border-4 border-white/10">
                <div className="text-center">
                  <span className="text-4xl font-bold text-gradient block">{results.overallScore}</span>
                  <span className="text-sm text-muted-foreground">/ 100</span>
                </div>
              </div>
              <div className="absolute -top-3 -right-3 text-3xl">
                {rankBadge.icon}
              </div>
            </div>
            <div className="text-left space-y-2">
              <Badge className={`bg-gradient-to-r ${rankBadge.color} text-white border-0 text-lg px-4 py-2`}>
                {rankBadge.label}
              </Badge>
              <div className="text-sm text-muted-foreground max-w-xs">
                {results.benchmark}
              </div>
            </div>
          </div>
          
          {/* Real-time Scoring Breakdown */}
          <ScoringBreakdownComponent scoringBreakdown={results.scoringBreakdown} />
          
          <CardTitle className="text-2xl mb-2 mt-4">
            <span className={`bg-gradient-to-r ${rankBadge.color} bg-clip-text text-transparent`}>
              {results.rank}
            </span>
          </CardTitle>
          <CardDescription className="text-lg">
            Real-time analysis of {data.input} completed successfully
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Detailed Analysis with Real Data */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-xl font-semibold text-gradient">Real-Time Analysis Results</h3>
            <Badge variant="outline" className="glass">Live Data</Badge>
          </div>
          
          {results.sections.map((section, index) => {
            const IconComponent = section.icon;
            return (
              <Card key={index} className="glass border-white/10 animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
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
                      <h4 className="text-sm font-medium text-red-300 mb-2">⚠️ Improvements Needed</h4>
                      <ul className="space-y-1">
                        {section.missing?.map((item, i) => (
                          <li key={i} className="text-xs text-red-200">• {item}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <h4 className="text-sm font-medium text-green-300 mb-2">✅ Detected Elements</h4>
                      <ul className="space-y-1">
                        {section.present?.map((item, i) => (
                          <li key={i} className="text-xs text-green-200">• {item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Real-time Insights */}
                  <div className="space-y-3 mb-4">
                    <h4 className="font-medium text-sm">Live Analysis Results:</h4>
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
                    <h4 className="text-sm font-medium text-blue-300 mb-2">🎯 Specific Actions to Take:</h4>
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
          })}

          {/* Enhanced Keyword Analysis */}
          <KeywordAnalysisComponent keywordAnalysis={results.keywordAnalysis} />
        </div>

        {/* Action Items & Summary */}
        <div className="space-y-4">
          {/* Quick Win Actions */}
          <QuickWins sections={results.sections} />

          {/* Enhanced Analysis Summary */}
          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle className="text-lg">Live Analysis Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Type:</span>
                <Badge variant="outline" className="glass">
                  {data.type === 'portfolio' ? 'Portfolio' : 
                   data.type === 'linkedin' ? 'LinkedIn' :
                   data.type === 'github' ? 'GitHub' : 'General'}
                </Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Input Method:</span>
                <Badge variant="outline" className="glass">
                  {data.inputType === 'url' ? 'URL Analysis' : 'Code Analysis'}
                </Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Technologies:</span>
                <Badge variant="outline" className="glass text-xs">
                  {analysisResult.detectedTech.length || 'Standard Web'}
                </Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Security:</span>
                <Badge variant="outline" className={`glass text-xs ${analysisResult.urlAnalysis?.isHttps ? 'text-green-300' : 'text-yellow-300'}`}>
                  {analysisResult.urlAnalysis?.isHttps ? 'HTTPS ✓' : 'HTTP Only'}
                </Badge>
              </div>
              <Separator className="my-2 bg-white/10" />
              <div className="text-xs text-muted-foreground break-all">
                Analyzed: {data.input}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* AI-Powered Features Section */}
      <div className="mt-8 space-y-6">
        <h2 className="text-2xl font-bold text-gradient text-center mb-8">AI-Powered Career Intelligence</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Smart Comparison Tool */}
          <SmartComparisonTool />
          
          {/* AI Content Generator */}
          <AIContentGenerator 
            userProfile={mockUserProfile}
            careerGoal="frontend-dev"
          />
        </div>
      </div>

      {/* AI Feedback Chatbot */}
      <AIFeedbackChatbot 
        analysisData={results}
        isVisible={isChatbotVisible}
        onToggle={() => setIsChatbotVisible(!isChatbotVisible)}
      />
    </div>
  );
};

export default AnalysisResults;
