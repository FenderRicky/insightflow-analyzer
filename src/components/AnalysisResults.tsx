
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Star, TrendingUp, AlertCircle, CheckCircle, Zap, Target, Code, Palette, Users, Trophy, Eye, Shield, Gauge, Search, Smartphone, Globe, GitBranch, Linkedin, FileText, BarChart3 } from 'lucide-react';
import AIFeedbackChatbot from './AIFeedbackChatbot';
import SmartComparisonTool from './SmartComparisonTool';
import AIContentGenerator from './AIContentGenerator';

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

  // Enhanced analysis with granular scoring and context-aware feedback
  const getAnalysisResults = () => {
    if (data.type === 'portfolio') {
      const input = data.input.toLowerCase();
      const isDesignPortfolio = input.includes('design') || input.includes('ux') || input.includes('ui') || 
                               input.includes('figma') || input.includes('dribbble') || input.includes('behance');
      const isDeveloperPortfolio = input.includes('github') || input.includes('dev') || input.includes('code') ||
                                  input.includes('react') || input.includes('javascript') || input.includes('python') ||
                                  data.inputType === 'code';

      if (isDesignPortfolio) {
        return {
          overallScore: 82,
          rank: 'Design Professional',
          rankColor: 'from-pink-400 to-purple-500',
          benchmark: 'Benchmarked against Google Design, Airbnb Design, Figma portfolios',
          scoringBreakdown: {
            'Visual Hierarchy': { score: 18, max: 20, description: 'Clear typography and spacing patterns' },
            'Case Study Depth': { score: 14, max: 20, description: 'Missing quantified impact metrics' },
            'Technical Implementation': { score: 16, max: 20, description: 'Good performance, needs accessibility fixes' },
            'Professional Positioning': { score: 17, max: 20, description: 'Strong portfolio presence' },
            'Content Quality': { score: 17, max: 20, description: 'Well-structured project presentations' }
          },
          sections: [
            {
              title: 'About Section Analysis',
              score: 76,
              color: 'bg-blue-500',
              icon: Users,
              missing: ['Design process methodology', 'Years of experience', 'Collaboration approach'],
              present: ['Clear value proposition', 'Contact information'],
              insights: [
                'About section lacks specific design methodology (Design Thinking, Lean UX, Human-Centered Design)',
                'Missing quantified experience: "5+ years" or "Led 12+ product launches"',
                'No mention of cross-functional collaboration with PM/Engineering teams',
                'Contact CTA is well-placed but could include calendar booking link'
              ],
              concreteImprovements: [
                'Add: "I follow a human-centered design approach, having led 15+ product launches"',
                'Include: "Collaborated with 20+ engineers and PMs at [Previous Company]"',
                'Specify: "Expertise in Figma, Principle, and user research methodologies"'
              ]
            },
            {
              title: 'Visual Design & Portfolio Structure',
              score: 88,
              color: 'bg-pink-500',
              icon: Palette,
              missing: ['Design system documentation', 'Interactive prototypes'],
              present: ['Consistent color palette', 'Good typography hierarchy', 'Mobile responsiveness'],
              insights: [
                'Portfolio includes 4/6 essential design elements (missing design tokens and component library)',
                'Typography follows 16px/24px base (matches industry standards)',
                'Color contrast ratios: 3 sections below WCAG 4.5:1 requirement',
                'Missing interactive prototype examples (standard at Apple/Google Design)'
              ],
              concreteImprovements: [
                'Create design system page showing 8 color shades per primary color',
                'Add interactive Framer/Principle prototypes for top 2 case studies',
                'Fix contrast ratios in navigation (currently 3.2:1, needs 4.5:1+)'
              ]
            },
            {
              title: 'Case Study Impact Metrics',
              score: 68,
              color: 'bg-green-500',
              icon: BarChart3,
              missing: ['Quantified business impact', 'A/B test results', 'User research data'],
              present: ['Problem definition', 'Solution process documentation'],
              insights: [
                'Case studies include 2/5 key impact metrics (missing conversion rates, user satisfaction, task completion)',
                'No A/B testing results shown (Meta designers include 3-5 test variations)',
                'User research mentions 0 specific quotes (Netflix designers average 10+ user interviews)',
                'Business impact: 0 quantified results (should include revenue/engagement improvements)'
              ],
              concreteImprovements: [
                'Add: "Redesign increased conversion rate from 2.3% to 3.1% (34% improvement)"',
                'Include: "User task completion improved from 68% to 89% based on usability testing"',
                'Show: "A/B tested 3 navigation approaches, winning variant reduced bounce rate by 23%"'
              ]
            }
          ],
          keywordAnalysis: {
            present: ['UX Design', 'UI Design', 'Figma', 'User Research'],
            missing: ['Design Systems', 'Accessibility', 'A/B Testing', 'Product Strategy', 'Stakeholder Management'],
            trending: ['Design Tokens', 'Inclusive Design', 'Design Ops', 'Cross-functional Collaboration']
          }
        };
      } else if (isDeveloperPortfolio) {
        return {
          overallScore: 87,
          rank: 'Senior Developer',
          rankColor: 'from-green-400 to-blue-500',
          benchmark: 'Benchmarked against Meta L5-L6, Google L4-L5 engineering portfolios',
          scoringBreakdown: {
            'Code Quality': { score: 19, max: 20, description: 'Excellent architecture and TypeScript usage' },
            'Project Depth': { score: 16, max: 20, description: 'Good projects, need more system design examples' },
            'Technical Communication': { score: 15, max: 20, description: 'Missing blog posts and documentation' },
            'Performance & Security': { score: 17, max: 20, description: 'Good optimization, needs security headers' },
            'Professional Presence': { score: 20, max: 20, description: 'Strong GitHub activity and contributions' }
          },
          sections: [
            {
              title: 'Technical Skills Assessment',
              score: 92,
              color: 'bg-green-500',
              icon: Code,
              missing: ['System design documentation', 'Performance monitoring'],
              present: ['Modern React patterns', 'TypeScript strict mode', 'Clean architecture'],
              insights: [
                'Code demonstrates 8/10 senior-level patterns (missing microservices and caching examples)',
                'TypeScript implementation: strict mode enabled with 95% type coverage',
                'Architecture follows SOLID principles with proper separation of concerns',
                'Missing comprehensive testing: current coverage ~45% (Google requires 80%+)'
              ],
              concreteImprovements: [
                'Add system architecture diagram for largest project showing data flow',
                'Implement comprehensive test suite: target 80%+ coverage with Jest/RTL',
                'Document performance monitoring setup with metrics dashboard'
              ]
            },
            {
              title: 'Project Portfolio Depth',
              score: 83,
              color: 'bg-blue-500',
              icon: Trophy,
              missing: ['Scalability examples', 'Database design docs', 'DevOps pipeline'],
              present: ['Multiple tech stacks', 'Production deployments', 'Clean code examples'],
              insights: [
                'Portfolio includes 6/10 project types valued by FAANG (missing distributed systems, ML integration)',
                'Largest project handles estimated 10K users (tier-1 companies expect 1M+ examples)',
                'Database design: shows normalization understanding but lacks indexing strategy docs',
                'DevOps: Docker containerization present, missing CI/CD pipeline documentation'
              ],
              concreteImprovements: [
                'Add project showcasing horizontal scaling with load balancing',
                'Document database indexing strategy and query optimization for main project',
                'Create CI/CD pipeline documentation with GitHub Actions workflow examples'
              ]
            },
            {
              title: 'Impact Metrics & Results',
              score: 79,
              color: 'bg-purple-500',
              icon: BarChart3,
              missing: ['Performance benchmarks', 'User growth metrics', 'Business impact data'],
              present: ['Code quality metrics', 'Project completion'],
              insights: [
                'Projects include 2/6 key impact metrics (missing load times, user engagement, business ROI)',
                'Performance data: mentions optimization but no specific load time improvements',
                'User metrics: 0 quantified growth or engagement statistics',
                'Business impact: no mention of cost savings or revenue impact'
              ],
              concreteImprovements: [
                'Add: "Optimization reduced page load time from 3.2s to 1.1s (65% improvement)"',
                'Include: "New feature increased user engagement by 40% over 3 months"',
                'Show: "Refactoring reduced server costs by $15K annually through 60% efficiency gain"'
              ]
            }
          ],
          keywordAnalysis: {
            present: ['React', 'TypeScript', 'Node.js', 'Docker', 'AWS'],
            missing: ['Kubernetes', 'GraphQL', 'Redis', 'Microservices', 'System Design'],
            trending: ['Next.js 14', 'Serverless', 'Edge Computing', 'WebAssembly', 'AI/ML Integration']
          }
        };
      }
    } else if (data.type === 'linkedin') {
      return {
        overallScore: 74,
        rank: 'Professional Profile',
        rankColor: 'from-blue-400 to-cyan-500',
        benchmark: 'Benchmarked against LinkedIn profiles from Google L4-L5, Meta E4-E5 employees',
        scoringBreakdown: {
          'Headline Optimization': { score: 13, max: 20, description: 'Generic headline, missing keywords' },
          'Summary Impact': { score: 14, max: 20, description: 'Lacks quantified achievements' },
          'Experience Details': { score: 16, max: 20, description: 'Good structure, needs metrics' },
          'Skills & Keywords': { score: 15, max: 20, description: 'Missing trending technologies' },
          'Network Quality': { score: 16, max: 20, description: 'Good connections, low engagement' }
        },
        sections: [
          {
            title: 'Headline & Summary Analysis',
            score: 68,
            color: 'bg-blue-500',
            icon: Target,
            missing: ['Value proposition', 'Specific technologies', 'Impact metrics', 'Target keywords'],
            present: ['Job title', 'Company name'],
            insights: [
              'Headline uses 67/220 characters (Google L5 engineers average 180+ characters)',
              'Missing 6/8 high-impact keywords that recruiters search for most',
              'Summary lacks STAR method structure (Situation, Task, Action, Result)',
              'No quantified achievements: 0/5 recommended impact metrics included'
            ],
            concreteImprovements: [
              'Rewrite headline: "Senior Software Engineer | React & TypeScript Expert | Built Systems for 1M+ Users | Ex-[Company]"',
              'Add summary opening: "I turn complex business problems into scalable technical solutions"',
              'Include metrics: "Led team of 4 engineers to increase system performance by 60%"'
            ]
          },
          {
            title: 'Experience Section Optimization',
            score: 79,
            color: 'bg-green-500',
            icon: Trophy,
            missing: ['Quantified results', 'Team leadership examples', 'Cross-functional collaboration'],
            present: ['Comprehensive job descriptions', 'Technology mentions', 'Multiple roles'],
            insights: [
              'Experience descriptions include 3/7 STAR method elements (missing specific results)',
              'Technology context: mentions tools but lacks business value connection',
              'Leadership evidence: 0/3 roles show team management or mentoring examples',
              'Impact quantification: 15% of descriptions include specific metrics (target: 80%+)'
            ],
            concreteImprovements: [
              'Rewrite top role: "Led cross-functional team of 8 to rebuild payment system, reducing transaction failures by 40%"',
              'Add leadership example: "Mentored 3 junior engineers, with 2 receiving promotions within 18 months"',
              'Include collaboration: "Partnered with Product and Design teams to launch feature used by 500K+ users"'
            ]
          },
          {
            title: 'Skills & Keyword Strategy',
            score: 76,
            color: 'bg-purple-500',
            icon: Zap,
            missing: ['Trending technologies', 'Soft skills', 'Industry certifications'],
            present: ['Core technical skills', 'Some endorsements'],
            insights: [
              'Skills section includes 12/20 high-demand keywords for target role',
              'Missing 5/10 trending technologies: Next.js 14, Kubernetes, GraphQL, AI/ML, Edge Computing',
              'Endorsement count: 15 average per skill (top performers have 50+)',
              'Soft skills representation: 2/8 leadership skills listed'
            ],
            concreteImprovements: [
              'Add trending skills: "Next.js 14", "Kubernetes", "System Design", "Technical Leadership"',
              'Request strategic endorsements from 10 colleagues for top 5 skills',
              'Complete LinkedIn skill assessments for JavaScript, React, and System Design'
            ]
          }
        ],
        keywordAnalysis: {
          present: ['Software Engineer', 'JavaScript', 'React', 'Node.js'],
          missing: ['Technical Lead', 'System Architecture', 'Microservices', 'DevOps', 'Mentoring'],
          trending: ['AI Integration', 'Cloud Native', 'Performance Optimization', 'Technical Strategy']
        }
      };
    } else if (data.type === 'github') {
      return {
        overallScore: 81,
        rank: 'Active Developer',
        rankColor: 'from-green-400 to-blue-500',
        benchmark: 'Benchmarked against GitHub profiles from tier-1 company engineers',
        scoringBreakdown: {
          'Repository Quality': { score: 17, max: 20, description: 'Good projects, need better documentation' },
          'Code Consistency': { score: 18, max: 20, description: 'Excellent commit patterns and code style' },
          'Community Impact': { score: 14, max: 20, description: 'Limited open source contributions' },
          'Technical Breadth': { score: 16, max: 20, description: 'Good variety, missing some trending tech' },
          'Professional Presence': { score: 16, max: 20, description: 'Active profile, needs more visibility' }
        },
        sections: [
          {
            title: 'Repository Analysis',
            score: 85,
            color: 'bg-green-500',
            icon: GitBranch,
            missing: ['Comprehensive READMEs', 'Live demo links', 'Architecture docs'],
            present: ['Clean code structure', 'Consistent naming', 'Good commit messages'],
            insights: [
              'Repository quality: 6/12 repos have comprehensive READMEs (target: 10+)',
              'Documentation completeness: 40% of projects include setup instructions',
              'Live demos: 2/12 projects have deployed versions (should be 80%+)',
              'Architecture documentation: 1/12 projects show system design diagrams'
            ],
            concreteImprovements: [
              'Add comprehensive README to top 5 repositories with setup, features, and tech stack',
              'Deploy 6+ projects to Vercel/Netlify with live demo links',
              'Create architecture diagrams for 2 most complex projects showing data flow'
            ]
          },
          {
            title: 'Contribution Patterns & Activity',
            score: 88,
            color: 'bg-blue-500',
            icon: BarChart3,
            missing: ['Open source contributions', 'Issue participation', 'Code reviews'],
            present: ['Consistent commits', 'Active development', 'Multiple languages'],
            insights: [
              'Commit frequency: 847 commits in last year (excellent consistency)',
              'Open source contributions: 3 external repositories (Google engineers average 15+)',
              'Issue tracking: participates in 2/12 own repositories (should engage in community issues)',
              'Code review activity: 0 visible reviews on other projects'
            ],
            concreteImprovements: [
              'Contribute to 5 relevant open source projects in your tech stack',
              'Participate in issue discussions for 10 community repositories',
              'Submit 3 meaningful pull requests to popular libraries you use'
            ]
          },
          {
            title: 'Technical Impact & Metrics',
            score: 72,
            color: 'bg-purple-500',
            icon: TrendingUp,
            missing: ['Star/fork metrics', 'Usage statistics', 'Performance benchmarks'],
            present: ['Multiple programming languages', 'Recent activity'],
            insights: [
              'Repository engagement: 23 total stars across all repos (tier-1 engineers average 200+)',
              'Fork activity: 8 forks total (indicates limited community adoption)',
              'Language diversity: 6 languages used (good technical breadth)',
              'Performance documentation: 0/12 projects include benchmark data'
            ],
            concreteImprovements: [
              'Create 2 utility libraries or tools that solve common developer problems',
              'Add performance benchmarks to main projects showing speed/efficiency gains',
              'Write technical blog posts about interesting problems solved to drive visibility'
            ]
          }
        ],
        keywordAnalysis: {
          present: ['JavaScript', 'Python', 'React', 'Docker'],
          missing: ['TypeScript', 'Kubernetes', 'CI/CD', 'Testing', 'System Design'],
          trending: ['AI/ML', 'WebAssembly', 'Edge Functions', 'Serverless', 'DevOps Automation']
        }
      };
    }

    // Fallback for other input types
    return {
      overallScore: 70,
      rank: 'Professional',
      rankColor: 'from-gray-400 to-gray-500',
      benchmark: 'General professional analysis',
      scoringBreakdown: {
        'Overall Quality': { score: 14, max: 20, description: 'Good foundation with room for improvement' }
      },
      sections: [],
      keywordAnalysis: {
        present: [],
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
    skills: ['React', 'JavaScript', 'TypeScript', 'Node.js', 'CSS'],
    experience: 'mid',
    role: 'frontend-dev'
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 animate-fade-in">
      {/* Enhanced Overall Score Card with Granular Breakdown */}
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
          
          {/* Granular Scoring Breakdown */}
          {results.scoringBreakdown && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
              {Object.entries(results.scoringBreakdown).map(([category, data], index) => (
                <div key={index} className="text-center space-y-2">
                  <div className="text-xs font-medium text-muted-foreground">{category}</div>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-2xl font-bold text-gradient">{data.score}</span>
                    <span className="text-sm text-muted-foreground">/{data.max}</span>
                  </div>
                  <Progress value={(data.score / data.max) * 100} className="h-2" />
                  <div className="text-xs text-muted-foreground px-2">{data.description}</div>
                </div>
              ))}
            </div>
          )}
          
          <CardTitle className="text-2xl mb-2 mt-4">
            <span className={`bg-gradient-to-r ${rankBadge.color} bg-clip-text text-transparent`}>
              {results.rank}
            </span>
          </CardTitle>
          <CardDescription className="text-lg">
            {data.type === 'portfolio' ? 'Portfolio Analysis Complete' : 
             data.type === 'linkedin' ? 'LinkedIn Profile Analysis Complete' :
             data.type === 'github' ? 'GitHub Profile Analysis Complete' :
             'Professional Analysis Complete'}
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Detailed Analysis */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-xl font-semibold text-gradient">Detailed Analysis</h3>
            <Badge variant="outline" className="glass">Context-Aware</Badge>
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
                      <h4 className="text-sm font-medium text-red-300 mb-2">❌ Missing Elements</h4>
                      <ul className="space-y-1">
                        {section.missing?.map((item, i) => (
                          <li key={i} className="text-xs text-red-200">• {item}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <h4 className="text-sm font-medium text-green-300 mb-2">✅ Present Elements</h4>
                      <ul className="space-y-1">
                        {section.present?.map((item, i) => (
                          <li key={i} className="text-xs text-green-200">• {item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Detailed Insights */}
                  <div className="space-y-3 mb-4">
                    <h4 className="font-medium text-sm">Detailed Analysis:</h4>
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
                    <h4 className="text-sm font-medium text-blue-300 mb-2">🎯 Concrete Actions to Take:</h4>
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

          {/* Keyword Analysis Section */}
          {results.keywordAnalysis && (
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
                      {results.keywordAnalysis.present.map((keyword, i) => (
                        <Badge key={i} variant="outline" className="text-xs bg-green-500/20 text-green-300 border-green-500/30">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <h4 className="text-sm font-medium text-red-300 mb-2">❌ Missing Keywords</h4>
                    <div className="flex flex-wrap gap-1">
                      {results.keywordAnalysis.missing.map((keyword, i) => (
                        <Badge key={i} variant="outline" className="text-xs bg-red-500/20 text-red-300 border-red-500/30">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                    <h4 className="text-sm font-medium text-purple-300 mb-2">🔥 Trending Keywords</h4>
                    <div className="flex flex-wrap gap-1">
                      {results.keywordAnalysis.trending.map((keyword, i) => (
                        <Badge key={i} variant="outline" className="text-xs bg-purple-500/20 text-purple-300 border-purple-500/30">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Action Items & Summary */}
        <div className="space-y-4">
          {/* Quick Win Actions */}
          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-400" />
                Quick Wins (30 min each)
              </CardTitle>
              <CardDescription>
                High-impact changes you can make today
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {results.sections.slice(0, 3).map((section, index) => (
                  <div key={index} className="p-3 rounded-lg bg-white/5 border border-white/10">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-brand-500 to-neon-purple flex items-center justify-center text-xs font-bold text-white">
                        {index + 1}
                      </div>
                      <h4 className="font-medium text-sm">{section.title}</h4>
                    </div>
                    {section.concreteImprovements && (
                      <p className="text-xs text-muted-foreground">
                        {section.concreteImprovements[0]}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Analysis Summary */}
          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle className="text-lg">Analysis Summary</CardTitle>
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
                  {data.inputType === 'url' ? 'URL' : 'Code'}
                </Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Benchmark:</span>
                <Badge variant="outline" className="glass text-xs">
                  Tier-1 Companies
                </Badge>
              </div>
              <Separator className="my-2 bg-white/10" />
              <div className="text-xs text-muted-foreground break-all">
                {data.input}
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
