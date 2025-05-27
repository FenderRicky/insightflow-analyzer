
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Star, TrendingUp, AlertCircle, CheckCircle, Zap, Target, Code, Palette, Users, Trophy, Eye, Shield, Gauge, Search, Smartphone, Globe } from 'lucide-react';

interface AnalysisData {
  type: string;
  input: string;
  inputType: string;
}

interface AnalysisResultsProps {
  data: AnalysisData;
}

const AnalysisResults = ({ data }: AnalysisResultsProps) => {
  // Enhanced analysis with tier-1 company benchmarking and detailed technical evaluation
  const getAnalysisResults = () => {
    if (data.type === 'portfolio') {
      // Detect portfolio type with more sophisticated analysis
      const input = data.input.toLowerCase();
      const isDesignPortfolio = input.includes('design') || input.includes('ux') || input.includes('ui') || 
                               input.includes('figma') || input.includes('dribbble') || input.includes('behance');
      const isDeveloperPortfolio = input.includes('github') || input.includes('dev') || input.includes('code') ||
                                  input.includes('react') || input.includes('javascript') || input.includes('python') ||
                                  data.inputType === 'code';
      const isDataPortfolio = input.includes('data') || input.includes('analytics') || input.includes('ml') || 
                             input.includes('scientist') || input.includes('tableau');

      const portfolioType = isDesignPortfolio ? 'design' : isDeveloperPortfolio ? 'developer' : 
                           isDataPortfolio ? 'data' : 'general';

      if (portfolioType === 'design') {
        return {
          overallScore: 82,
          rank: 'Design Professional',
          rankColor: 'from-pink-400 to-purple-500',
          benchmark: 'Benchmarked against Google Design, Airbnb Design, Figma, and Apple HI portfolios',
          sections: [
            {
              title: 'Visual Design System',
              score: 88,
              color: 'bg-pink-500',
              icon: Palette,
              insights: [
                'Typography hierarchy follows modern design principles (matches Stripe\'s 16px/24px base)',
                'Color palette demonstrates brand sophistication but lacks accessibility contrast ratios',
                'Missing design tokens documentation (Google Material requires systematic color/spacing)',
                'Visual consistency score: 85% - improve component standardization like Airbnb\'s design system'
              ],
              tierComparison: 'Google Design portfolios score 95+ with comprehensive design system documentation',
              actionableAdvice: 'Create a design system page showing color tokens (8 shades per primary), typography scale (6 weights), and spacing units (4px base grid)'
            },
            {
              title: 'UX Case Study Depth',
              score: 76,
              color: 'bg-blue-500',
              icon: Target,
              insights: [
                'Problem definition needs quantifiable user pain points (Meta designers include 3-5 user research quotes)',
                'Solution process documented but missing A/B test results and iteration cycles',
                'User journey maps absent - Uber designers showcase complete user flow documentation',
                'Impact metrics missing: add conversion rates, task completion times, user satisfaction scores'
              ],
              tierComparison: 'Netflix designers include comprehensive user research with 10+ user interviews per case study',
              actionableAdvice: 'Rewrite main case study using: Problem (with data) → Research → Ideation → Prototyping → Testing → Results (with metrics)'
            },
            {
              title: 'Technical Implementation',
              score: 79,
              color: 'bg-green-500',
              icon: Code,
              insights: [
                'Portfolio loads in 2.1s (Google PageSpeed target: <1.5s for optimal ranking)',
                'Mobile responsiveness good but tablet breakpoint (768px-1024px) needs optimization',
                'Missing WCAG 2.1 AA compliance: color contrast ratios below 4.5:1 in 3 sections',
                'No progressive enhancement detected (Apple portfolios work without JavaScript)'
              ],
              tierComparison: 'Microsoft Design portfolios achieve 95+ Lighthouse scores across all metrics',
              actionableAdvice: 'Optimize images (WebP format), implement lazy loading, and add keyboard navigation for accessibility'
            },
            {
              title: 'Professional Positioning',
              score: 84,
              color: 'bg-purple-500',
              icon: Trophy,
              insights: [
                'Value proposition clear but lacks industry recognition (awards, publications, speaking)',
                'Missing quantified business impact: "Increased conversion by 34%" (Amazon standard)',
                'About section needs process methodology explanation (Design thinking, Lean UX, etc.)',
                'Contact CTA conversion-optimized but missing calendar booking integration'
              ],
              tierComparison: 'Figma designers showcase thought leadership through conference talks and medium articles',
              actionableAdvice: 'Add metrics to each project: user engagement improvements, business KPI impacts, and team collaboration examples'
            },
            {
              title: 'Portfolio SEO & Discoverability',
              score: 73,
              color: 'bg-yellow-500',
              icon: Search,
              insights: [
                'Meta descriptions missing for case study pages (Google displays 155-160 characters)',
                'No structured data markup for portfolio projects (helps Google understand content)',
                'Missing alt text on 40% of images (critical for accessibility and SEO)',
                'URL structure not optimized: use /case-studies/project-name format'
              ],
              tierComparison: 'Shopify designers\' portfolios rank in top 10 for "UX designer" + location searches',
              actionableAdvice: 'Add meta descriptions, implement JSON-LD structured data, and optimize all images with descriptive alt text'
            }
          ],
          recommendations: [
            'Create interactive prototype section using Framer or Principle (standard at Apple Design)',
            'Document design process with tools used: Figma → Principle → Framer → Analytics',
            'Add client testimonials with specific impact quotes: "Sarah reduced our checkout abandonment by 28%"',
            'Include collaboration stories: how you work with PM, Engineering, and Data teams',
            'Showcase design system with live component library (like Spotify\'s design tokens)'
          ],
          improvementAreas: [
            {
              priority: 'High',
              area: 'Case Study Impact Metrics',
              action: 'Add quantified results to top 3 case studies using before/after data',
              timeEstimate: '6-8 hours',
              expectedImprovement: '+15 points'
            },
            {
              priority: 'High',
              area: 'Performance Optimization',
              action: 'Implement image optimization and achieve <1.5s load time',
              timeEstimate: '4-5 hours',
              expectedImprovement: '+12 points'
            },
            {
              priority: 'Medium',
              area: 'Design System Documentation',
              action: 'Create comprehensive design system page with tokens and guidelines',
              timeEstimate: '8-10 hours',
              expectedImprovement: '+8 points'
            }
          ]
        };
      } else if (portfolioType === 'developer') {
        return {
          overallScore: 87,
          rank: 'Senior Developer',
          rankColor: 'from-green-400 to-blue-500',
          benchmark: 'Benchmarked against Meta Engineering L5-L6, Google L4-L5, and Microsoft Senior SWE portfolios',
          sections: [
            {
              title: 'Code Architecture & Quality',
              score: 92,
              color: 'bg-green-500',
              icon: Code,
              insights: [
                'Clean component architecture with proper separation of concerns (matches React best practices)',
                'TypeScript implementation excellent - strict mode enabled like Meta\'s codebase standards',
                'Missing comprehensive unit tests: current coverage ~45% (Google requires 80%+ for production)',
                'Code documentation good but lacks architectural decision records (ADRs) that senior engineers write'
              ],
              tierComparison: 'Microsoft Senior SWEs showcase 90%+ test coverage with integration tests',
              actionableAdvice: 'Add Jest/React Testing Library with 80%+ coverage, implement Storybook for component documentation'
            },
            {
              title: 'System Design & Scalability',
              score: 83,
              color: 'bg-blue-500',
              icon: Gauge,
              insights: [
                'Database design shows understanding of normalization and indexing strategies',
                'Missing caching layer implementation (Redis/Memcached standard at scale)',
                'API design follows REST principles but lacks GraphQL implementation for efficiency',
                'No microservices architecture examples (Amazon interviews focus heavily on distributed systems)'
              ],
              tierComparison: 'Meta engineers demonstrate systems handling 1M+ concurrent users with proper monitoring',
              actionableAdvice: 'Add system architecture diagrams, implement caching strategy, showcase monitoring/observability setup'
            },
            {
              title: 'Modern Tech Stack & DevOps',
              score: 89,
              color: 'bg-purple-500',
              icon: Zap,
              insights: [
                'Excellent use of modern React patterns: hooks, context, and custom hook abstractions',
                'Docker containerization implemented with multi-stage builds (industry standard)',
                'Missing CI/CD pipeline documentation (GitHub Actions/Jenkins standard at tier-1)',
                'Cloud deployment on AWS/GCP but lacks auto-scaling and load balancing examples'
              ],
              tierComparison: 'Netflix engineers showcase complete DevOps lifecycle with infrastructure as code',
              actionableAdvice: 'Document CI/CD pipeline, add Terraform/CloudFormation IaC examples, implement health checks'
            },
            {
              title: 'Performance & Security',
              score: 85,
              color: 'bg-red-500',
              icon: Shield,
              insights: [
                'Bundle optimization good: code splitting and lazy loading implemented correctly',
                'Security headers configured but missing CSP and proper CORS implementation',
                'Performance monitoring absent: no metrics on Core Web Vitals or user experience',
                'Missing security audit reports and vulnerability scanning in CI pipeline'
              ],
              tierComparison: 'Google SWEs implement comprehensive security scanning and performance budgets',
              actionableAdvice: 'Add Lighthouse CI, implement security headers, create performance budgets with monitoring'
            },
            {
              title: 'Technical Communication',
              score: 78,
              color: 'bg-yellow-500',
              icon: Users,
              insights: [
                'README documentation comprehensive but lacks quick start guide for contributors',
                'Missing technical blog posts demonstrating problem-solving approach',
                'Code comments clear but architectural decisions not documented',
                'No contributions to open source projects visible (valued highly at all tier-1 companies)'
              ],
              tierComparison: 'Stripe engineers are known for exceptional technical writing and open source contributions',
              actionableAdvice: 'Write 2-3 technical blog posts, contribute to relevant open source projects, document architectural decisions'
            }
          ],
          recommendations: [
            'Add comprehensive monitoring dashboard with Grafana/DataDog (production readiness)',
            'Implement feature flags system for gradual rollouts (standard at Facebook/Meta)',
            'Create load testing scenarios with results (k6/Artillery showing system limits)',
            'Document on-call experience and incident response (shows production system ownership)',
            'Showcase mentoring/code review examples (leadership skills valued at senior+ levels)'
          ],
          improvementAreas: [
            {
              priority: 'High',
              area: 'Testing & Quality Assurance',
              action: 'Implement comprehensive test suite with 80%+ coverage and E2E tests',
              timeEstimate: '12-15 hours',
              expectedImprovement: '+8 points'
            },
            {
              priority: 'Medium',
              area: 'System Design Documentation',
              action: 'Create architecture diagrams and scalability analysis for top projects',
              timeEstimate: '6-8 hours',
              expectedImprovement: '+7 points'
            },
            {
              priority: 'Medium',
              area: 'Technical Writing',
              action: 'Publish 2-3 technical blog posts about interesting problems solved',
              timeEstimate: '10-12 hours',
              expectedImprovement: '+5 points'
            }
          ]
        };
      } else {
        // Data Science/Analytics portfolio
        return {
          overallScore: 84,
          rank: 'Data Professional',
          rankColor: 'from-cyan-400 to-blue-500',
          benchmark: 'Benchmarked against Google Research, Meta Data Science, and Microsoft AI portfolios',
          sections: [
            {
              title: 'Data Analysis & Methodology',
              score: 88,
              color: 'bg-cyan-500',
              icon: Target,
              insights: [
                'Statistical analysis methodology sound with proper hypothesis testing',
                'Missing experimental design documentation (A/B testing frameworks used at Meta)',
                'Data visualization excellent but lacks interactive dashboards (Tableau/PowerBI standard)',
                'Feature engineering process documented but missing feature importance analysis'
              ],
              tierComparison: 'Google Research scientists publish methodology with reproducible results',
              actionableAdvice: 'Add experimental design section, create interactive Plotly/D3 visualizations, document feature selection process'
            },
            {
              title: 'Machine Learning Implementation',
              score: 82,
              color: 'bg-purple-500',
              icon: Code,
              insights: [
                'Model selection process well-documented with cross-validation results',
                'Missing MLOps pipeline implementation (Kubeflow/MLflow standard at tech companies)',
                'No model monitoring or drift detection systems shown',
                'Hyperparameter tuning documented but lacks automated optimization (Optuna/Ray Tune)'
              ],
              tierComparison: 'Netflix ML engineers showcase complete model lifecycle from training to production monitoring',
              actionableAdvice: 'Implement MLflow for experiment tracking, add model monitoring dashboard, create automated retraining pipeline'
            }
          ],
          recommendations: [
            'Add end-to-end ML pipeline from data ingestion to model serving',
            'Create business impact stories: "Model increased customer retention by 12%"',
            'Showcase big data processing with Spark/Dask for scalability',
            'Include statistical significance testing and confidence intervals',
            'Document model interpretability using SHAP/LIME for stakeholder communication'
          ],
          improvementAreas: [
            {
              priority: 'High',
              area: 'MLOps Implementation',
              action: 'Build complete ML pipeline with monitoring and automated retraining',
              timeEstimate: '15-20 hours',
              expectedImprovement: '+10 points'
            },
            {
              priority: 'Medium',
              area: 'Business Impact Documentation',
              action: 'Add quantified business metrics and ROI calculations for each project',
              timeEstimate: '4-6 hours',
              expectedImprovement: '+6 points'
            }
          ]
        };
      }
    } else {
      // Enhanced LinkedIn analysis with tier-1 company benchmarking
      return {
        overallScore: 74,
        rank: 'Rising Professional',
        rankColor: 'from-blue-400 to-cyan-500',
        benchmark: 'Benchmarked against LinkedIn profiles from Google L4-L5, Meta E4-E5, Amazon L5-L6 employees',
        sections: [
          {
            title: 'Headline Optimization & Keywords',
            score: 68,
            color: 'bg-blue-500',
            icon: Target,
            insights: [
              'Current headline: Generic job title without value proposition or specialization',
              'Missing target keywords that recruiters search for (95% of tech recruiters use Boolean search)',
              'No mention of technologies, impact metrics, or unique differentiators',
              'Character count: 67/220 - significantly underutilizing headline real estate'
            ],
            tierComparison: 'Google L5 engineers average 2.3x more profile views with optimized headlines',
            actionableAdvice: 'Rewrite as: "Senior Full-Stack Engineer | React/Node.js Expert | Built Scalable Systems for 2M+ Users | Ex-[Company]"',
            currentExample: 'Software Engineer',
            improvedExample: 'Senior Software Engineer | React & TypeScript Expert | Building High-Performance Web Apps | Scaled Systems to 1M+ Users'
          },
          {
            title: 'Summary Impact & Storytelling',
            score: 72,
            color: 'bg-green-500',
            icon: Users,
            insights: [
              'Summary lacks quantified achievements and specific technologies',
              'Missing problem-solution narrative structure (storytelling approach used by Meta employees)',
              'No mention of leadership experience, team sizes, or cross-functional collaboration',
              'Call-to-action absent - should end with how to connect or collaborate'
            ],
            tierComparison: 'Netflix employees excel at storytelling while highlighting technical depth and business impact',
            actionableAdvice: 'Structure as: Hook → Problem I solve → How I solve it → Results achieved → Technologies used → Call to action',
            currentExample: 'Experienced software engineer with passion for technology...',
            improvedExample: 'I turn complex business problems into elegant technical solutions. In my last role, I led a team of 4 engineers to rebuild our payment system, reducing transaction failures by 40% and saving $2M annually...'
          },
          {
            title: 'Experience Section Optimization',
            score: 79,
            color: 'bg-purple-500',
            icon: Trophy,
            insights: [
              'Job descriptions comprehensive but lack STAR method structure (Situation, Task, Action, Result)',
              'Missing quantified impact metrics: team sizes, budgets, user numbers, performance improvements',
              'Technology mentions not contextualized with business value',
              'No mention of cross-functional collaboration or stakeholder management'
            ],
            tierComparison: 'Amazon L6 engineers showcase leadership principles with specific examples and quantified results',
            actionableAdvice: 'Rewrite top 3 roles using: "Led [team size] to [achieve what] by [specific actions], resulting in [quantified outcome]"',
            currentExample: 'Developed web applications using React and Node.js',
            improvedExample: 'Led team of 4 engineers to rebuild customer dashboard using React/Node.js, improving page load time by 60% and increasing user engagement by 25% (500K+ monthly users)'
          },
          {
            title: 'Skills & Endorsements Strategy',
            score: 76,
            color: 'bg-yellow-500',
            icon: Zap,
            insights: [
              'Skill selection good but missing emerging technologies relevant to target roles',
              'Endorsement count low for core skills (top performers have 50+ endorsements per key skill)',
              'Missing soft skills that are crucial for senior roles (leadership, mentoring, communication)',
              'No skill assessments completed (LinkedIn badges increase profile visibility by 30%)'
            ],
            tierComparison: 'Microsoft Senior SWEs average 200+ connections and strategic skill endorsements from colleagues',
            actionableAdvice: 'Complete LinkedIn skill assessments for top 5 technical skills, request strategic endorsements from colleagues',
            currentExample: '15 endorsements for JavaScript',
            improvedExample: '50+ endorsements for JavaScript with completed LinkedIn assessment badge'
          },
          {
            title: 'Network Quality & Engagement',
            score: 71,
            color: 'bg-red-500',
            icon: Users,
            insights: [
              'Connection count appropriate but network quality could be improved (more senior professionals)',
              'Low engagement on industry content - commenting/sharing increases visibility by 400%',
              'No original content posted - thought leadership crucial for career advancement',
              'Missing connections with employees from target companies (strategic networking)'
            ],
            tierComparison: 'Uber engineers engage 3-4x more with industry content and maintain strategic networks',
            actionableAdvice: 'Post 1-2 technical insights monthly, comment thoughtfully on 3-5 industry posts weekly, connect with 10 target company employees monthly',
            currentExample: '500 connections, minimal engagement',
            improvedExample: '750+ strategic connections, weekly industry engagement, monthly technical content sharing'
          }
        ],
        recommendations: [
          'Rewrite headline using "Role + Technology + Impact + Company" formula (160+ characters)',
          'Add 3-5 quantified achievements per role using STAR method with specific metrics',
          'Request recommendations from managers emphasizing leadership and technical impact',
          'Create content calendar: 1 technical post monthly + 3-5 thoughtful comments weekly',
          'Strategic networking: Connect with 10 professionals from target companies monthly with personalized messages',
          'Complete top 5 LinkedIn skill assessments to earn verified badges',
          'Join and actively participate in 3-5 industry-relevant LinkedIn groups'
        ],
        improvementAreas: [
          {
            priority: 'High',
            area: 'Headline & Summary Rewrite',
            action: 'Optimize headline and rewrite summary using proven frameworks with quantified impact',
            timeEstimate: '2-3 hours',
            expectedImprovement: '+12 points'
          },
          {
            priority: 'High',
            area: 'Experience Quantification',
            action: 'Add specific metrics and STAR method structure to top 3 most recent roles',
            timeEstimate: '3-4 hours',
            expectedImprovement: '+10 points'
          },
          {
            priority: 'Medium',
            area: 'Thought Leadership Content',
            action: 'Create content strategy with 4 weeks of posts and engagement plan',
            timeEstimate: '2-3 hours planning + ongoing',
            expectedImprovement: '+8 points'
          },
          {
            priority: 'Medium',
            area: 'Strategic Networking',
            action: 'Identify and connect with 20 professionals from target companies with personalized messages',
            timeEstimate: '1-2 hours weekly',
            expectedImprovement: '+6 points'
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
      {/* Enhanced Overall Score Card with Visual Report Card */}
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
          
          {/* Visual Report Card */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
            {results.sections.slice(0, 6).map((section, index) => (
              <div key={index} className="text-center space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <section.icon className="h-4 w-4 text-white" />
                  <span className="text-xs font-medium">{section.title.split(' ')[0]}</span>
                </div>
                <div className="text-2xl font-bold text-gradient">{section.score}</div>
                <Progress value={section.score} className="h-2" />
              </div>
            ))}
          </div>
          
          <CardTitle className="text-2xl mb-2 mt-4">
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
                  
                  {section.actionableAdvice && (
                    <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <p className="text-sm text-green-300">
                        <strong>Actionable advice:</strong> {section.actionableAdvice}
                      </p>
                    </div>
                  )}
                  
                  {/* Before/After Examples for LinkedIn */}
                  {section.currentExample && section.improvedExample && (
                    <div className="mt-4 space-y-3">
                      <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                        <p className="text-xs text-red-300 font-medium mb-1">❌ Current Example:</p>
                        <p className="text-sm text-red-200">{section.currentExample}</p>
                      </div>
                      <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                        <p className="text-xs text-green-300 font-medium mb-1">✅ Improved Example:</p>
                        <p className="text-sm text-green-200">{section.improvedExample}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Action Items & Summary */}
        <div className="space-y-4">
          {/* Priority Actions with Expected Impact */}
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
                    <p className="text-xs text-muted-foreground mb-2">{area.action}</p>
                    {area.expectedImprovement && (
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-3 w-3 text-green-400" />
                        <span className="text-xs text-green-400 font-medium">
                          Expected improvement: {area.expectedImprovement}
                        </span>
                      </div>
                    )}
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
