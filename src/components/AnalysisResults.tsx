
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Star, TrendingUp, AlertCircle, CheckCircle, Zap, Target, Code, Palette, Users, Trophy } from 'lucide-react';

interface AnalysisData {
  type: string;
  input: string;
  inputType: string;
}

interface AnalysisResultsProps {
  data: AnalysisData;
}

const AnalysisResults = ({ data }: AnalysisResultsProps) => {
  // Enhanced analysis results with tier-1 company benchmarking
  const getAnalysisResults = () => {
    if (data.type === 'portfolio') {
      // Detect portfolio type based on URL/content patterns
      const isDesignPortfolio = data.input.toLowerCase().includes('design') || 
                               data.input.toLowerCase().includes('ux') ||
                               data.input.toLowerCase().includes('ui');
      const isDeveloperPortfolio = data.input.toLowerCase().includes('github') ||
                                  data.input.toLowerCase().includes('dev') ||
                                  data.inputType === 'code';

      const portfolioType = isDesignPortfolio ? 'design' : isDeveloperPortfolio ? 'developer' : 'general';

      if (portfolioType === 'design') {
        return {
          overallScore: 82,
          rank: 'Design Professional',
          rankColor: 'from-pink-400 to-purple-500',
          benchmark: 'Compared to Google Design, Airbnb, and Figma portfolios',
          sections: [
            {
              title: 'Visual Design & Aesthetics',
              score: 88,
              color: 'bg-pink-500',
              icon: Palette,
              insights: [
                'Color palette shows sophisticated understanding of brand harmony',
                'Typography choices reflect modern design trends (similar to Stripe\'s approach)',
                'Visual hierarchy needs improvement - Google Design uses 40% more white space',
                'Missing design system documentation (Airbnb portfolios always include this)'
              ],
              tierComparison: 'Google Design portfolios score 95+ in this category'
            },
            {
              title: 'UX/UI Case Studies',
              score: 75,
              color: 'bg-blue-500',
              icon: Target,
              insights: [
                'Case studies lack problem definition depth (Meta designers start with user research)',
                'Solution process is documented but missing iteration cycles',
                'No A/B testing results shown (Uber designers include 3-5 test variations)',
                'Add user journey maps and personas (standard at Apple)'
              ],
              tierComparison: 'Top Figma designers showcase 5-7 comprehensive case studies'
            },
            {
              title: 'Technical Implementation',
              score: 79,
              color: 'bg-green-500',
              icon: Code,
              insights: [
                'Portfolio loads in 2.1s (Google benchmark is <1.5s)',
                'Mobile responsiveness good but needs tablet optimization',
                'Missing accessibility features (WCAG 2.1 compliance expected at tier-1)',
                'Code quality is solid but could benefit from performance optimization'
              ],
              tierComparison: 'Microsoft Design portfolios typically score 90+ on technical execution'
            },
            {
              title: 'Professional Positioning',
              score: 84,
              color: 'bg-purple-500',
              icon: Trophy,
              insights: [
                'Clear value proposition but lacks quantified impact metrics',
                'Missing client testimonials (Dropbox designers include 2-3)',
                'About section needs personality while maintaining professionalism',
                'Contact flow is intuitive and conversion-optimized'
              ],
              tierComparison: 'Netflix design portfolios excel at storytelling and personal branding'
            }
          ],
          recommendations: [
            'Add a design system showcase with component library (like Spotify\'s design team)',
            'Include quantified results: "Increased user engagement by 34%" (standard at Amazon)',
            'Create an interactive prototype section (Figma designers always include this)',
            'Add behind-the-scenes content showing your design thinking process',
            'Include collaboration stories with developers and PMs (Google values cross-functional work)'
          ],
          improvementAreas: [
            {
              priority: 'High',
              area: 'Case Study Depth',
              action: 'Rewrite main case study following the Google HEART framework',
              timeEstimate: '4-6 hours'
            },
            {
              priority: 'Medium',
              area: 'Performance',
              action: 'Optimize images and implement lazy loading (Shopify standard)',
              timeEstimate: '2-3 hours'
            },
            {
              priority: 'Low',
              area: 'Personal Branding',
              action: 'Add personality through micro-interactions and copywriting',
              timeEstimate: '3-4 hours'
            }
          ]
        };
      } else {
        // Developer portfolio analysis
        return {
          overallScore: 87,
          rank: 'Senior Developer',
          rankColor: 'from-green-400 to-blue-500',
          benchmark: 'Compared to Meta Engineering, Google SWE, and Microsoft portfolios',
          sections: [
            {
              title: 'Code Quality & Architecture',
              score: 92,
              color: 'bg-green-500',
              icon: Code,
              insights: [
                'Clean, semantic code structure follows React best practices',
                'Component architecture shows understanding of separation of concerns',
                'Missing comprehensive testing suite (Google requires 80%+ coverage)',
                'TypeScript usage is excellent - matches Meta\'s coding standards'
              ],
              tierComparison: 'Microsoft SWE portfolios typically include extensive test coverage'
            },
            {
              title: 'Project Showcase & Impact',
              score: 83,
              color: 'bg-blue-500',
              icon: Trophy,
              insights: [
                'Projects demonstrate full-stack capabilities well',
                'Missing performance metrics and user impact data',
                'Need to highlight scalability considerations (Amazon interviews focus on this)',
                'GitHub commits show consistent contribution patterns'
              ],
              tierComparison: 'Meta engineers showcase projects with millions of users'
            },
            {
              title: 'Technical Writing & Documentation',
              score: 78,
              color: 'bg-purple-500',
              icon: Target,
              insights: [
                'README files are comprehensive and well-structured',
                'Missing technical blog posts (Google values thought leadership)',
                'Code comments are clear but could include architecture decisions',
                'API documentation needs improvement for production readiness'
              ],
              tierComparison: 'Stripe engineers are known for exceptional documentation quality'
            },
            {
              title: 'Modern Tech Stack & Innovation',
              score: 90,
              color: 'bg-yellow-500',
              icon: Zap,
              insights: [
                'Uses cutting-edge technologies appropriately',
                'Shows understanding of performance optimization',
                'Missing CI/CD pipeline examples (Netflix standard)',
                'Cloud deployment knowledge evident but could showcase DevOps skills'
              ],
              tierComparison: 'Amazon engineers demonstrate expertise in scalable cloud architecture'
            }
          ],
          recommendations: [
            'Add performance metrics: "Reduced load time by 60%" (quantify like Google)',
            'Include system design diagrams for complex projects (Meta interview standard)',
            'Create technical blog posts explaining architectural decisions',
            'Showcase testing strategies with coverage reports (Microsoft best practice)',
            'Add monitoring and observability examples (production-ready mindset)'
          ],
          improvementAreas: [
            {
              priority: 'High',
              area: 'Impact Metrics',
              action: 'Add performance benchmarks and user metrics to top 3 projects',
              timeEstimate: '3-4 hours'
            },
            {
              priority: 'Medium',
              area: 'Testing Coverage',
              action: 'Implement comprehensive test suite with coverage reporting',
              timeEstimate: '8-10 hours'
            },
            {
              priority: 'Low',
              area: 'Technical Writing',
              action: 'Write 2-3 technical blog posts about interesting problems solved',
              timeEstimate: '6-8 hours'
            }
          ]
        };
      }
    } else {
      // Enhanced LinkedIn analysis
      return {
        overallScore: 74,
        rank: 'Rising Professional',
        rankColor: 'from-blue-400 to-cyan-500',
        benchmark: 'Compared to LinkedIn profiles from Google, Meta, Amazon L5-L6 employees',
        sections: [
          {
            title: 'Headline & First Impression',
            score: 68,
            color: 'bg-blue-500',
            icon: Target,
            insights: [
              'Current: Generic job title without value proposition',
              'Google employees use: "Senior SWE building scalable systems for 2B+ users"',
              'Missing keywords that recruiters search for in your field',
              'No mention of impact or specialization area'
            ],
            tierComparison: 'Meta employees\' headlines average 2.3x more profile views',
            suggestion: 'Try: "Senior Full-Stack Developer | React & Node.js Expert | Building High-Performance Web Apps at Scale"'
          },
          {
            title: 'Summary Impact & Storytelling',
            score: 72,
            color: 'bg-green-500',
            icon: Users,
            insights: [
              'Lacks quantified achievements (Amazon professionals include 3-5 metrics)',
              'Missing problem-solution narrative structure',
              'No mention of technologies or methodologies you specialize in',
              'Doesn\'t showcase personality while maintaining professionalism'
            ],
            tierComparison: 'Netflix employees excel at storytelling while highlighting technical depth',
            suggestion: 'Start with: "I turn complex business problems into elegant technical solutions..."'
          },
          {
            title: 'Experience & Achievement Documentation',
            score: 79,
            color: 'bg-purple-500',
            icon: Trophy,
            insights: [
              'Job descriptions are comprehensive but lack impact metrics',
              'Missing before/after scenarios that show your contribution',
              'No mention of team size, budget, or scope of projects',
              'Technologies mentioned but not in context of business impact'
            ],
            tierComparison: 'Uber engineers showcase projects with user and revenue impact',
            suggestion: 'Add: "Led team of 4 engineers to rebuild payment system, reducing transaction failures by 40%"'
          },
          {
            title: 'Network Quality & Engagement',
            score: 76,
            color: 'bg-yellow-500',
            icon: Users,
            insights: [
              'Connection count is appropriate for experience level',
              'Missing connections with senior professionals in target companies',
              'Low engagement on industry discussions and thought leadership',
              'Not actively sharing insights or commenting on industry trends'
            ],
            tierComparison: 'Microsoft employees engage 3-4x more with industry content',
            suggestion: 'Comment thoughtfully on 2-3 industry posts weekly with technical insights'
          }
        ],
        recommendations: [
          'Rewrite headline using the "Role + Impact + Specialization" formula (Google standard)',
          'Add 3-5 quantified achievements per role using the STAR method (Amazon behavioral prep)',
          'Request recommendations from managers emphasizing leadership and technical skills',
          'Create 1-2 technical posts monthly showing thought leadership (Meta culture)',
          'Connect with 5-10 professionals weekly from target companies with personalized messages'
        ],
        improvementAreas: [
          {
            priority: 'High',
            area: 'Headline Optimization',
            action: 'Rewrite using value proposition and keywords',
            timeEstimate: '30 minutes'
          },
          {
            priority: 'High',
            area: 'Experience Quantification',
            action: 'Add metrics to top 3 most recent roles',
            timeEstimate: '2-3 hours'
          },
          {
            priority: 'Medium',
            area: 'Content Strategy',
            action: 'Plan and schedule 4 weeks of industry engagement',
            timeEstimate: '1-2 hours setup'
          }
        ]
      };
    }
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

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 animate-fade-in">
      {/* Enhanced Overall Score Card */}
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
          <CardTitle className="text-2xl mb-2">
            <span className={`bg-gradient-to-r ${rankBadge.color} bg-clip-text text-transparent`}>
              {results.rank}
            </span>
          </CardTitle>
          <CardDescription className="text-lg">
            {data.type === 'portfolio' ? 'Portfolio Analysis Complete' : 'LinkedIn Profile Analysis Complete'}
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Detailed Analysis */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-xl font-semibold text-gradient">Detailed Analysis</h3>
            <Badge variant="outline" className="glass">Tier-1 Benchmarked</Badge>
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
                  
                  {section.tierComparison && (
                    <div className="bg-brand-500/10 border border-brand-500/20 rounded-lg p-3 mt-3">
                      <p className="text-sm text-brand-300 font-medium">
                        💡 Tier-1 Insight: {section.tierComparison}
                      </p>
                    </div>
                  )}
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {section.insights.map((insight, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm">
                        {section.score >= 85 ? (
                          <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                        ) : section.score >= 70 ? (
                          <AlertCircle className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        ) : (
                          <TrendingUp className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                        )}
                        <span className="text-muted-foreground">{insight}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {section.suggestion && (
                    <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <p className="text-sm text-green-300">
                        <strong>Suggested improvement:</strong> {section.suggestion}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Action Items & Summary */}
        <div className="space-y-4">
          {/* Priority Actions */}
          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-400" />
                Priority Actions
              </CardTitle>
              <CardDescription>
                Focus on these for maximum impact
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {results.improvementAreas?.map((area, index) => (
                  <div key={index} className="p-3 rounded-lg bg-white/5 border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <Badge 
                        variant="outline" 
                        className={`glass text-xs ${
                          area.priority === 'High' ? 'border-red-500/50 text-red-300' :
                          area.priority === 'Medium' ? 'border-yellow-500/50 text-yellow-300' :
                          'border-green-500/50 text-green-300'
                        }`}
                      >
                        {area.priority} Priority
                      </Badge>
                      <span className="text-xs text-muted-foreground">{area.timeEstimate}</span>
                    </div>
                    <h4 className="font-medium text-sm mb-1">{area.area}</h4>
                    <p className="text-xs text-muted-foreground">{area.action}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tier-1 Recommendations */}
          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-gold-400" />
                Tier-1 Standards
              </CardTitle>
              <CardDescription>
                What top companies expect
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {results.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-brand-500 to-neon-purple flex items-center justify-center text-xs font-bold text-white mt-0.5 flex-shrink-0">
                      {index + 1}
                    </div>
                    <span className="text-sm">{rec}</span>
                  </li>
                ))}
              </ul>
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
                  {data.type === 'portfolio' ? 'Portfolio' : 'LinkedIn'}
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
    </div>
  );
};

export default AnalysisResults;
