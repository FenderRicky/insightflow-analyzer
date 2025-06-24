
import { Users, Palette, BarChart3, Code, Trophy, Target, GitBranch, TrendingUp } from 'lucide-react';
import type { AnalysisData, AnalysisResults } from '../types/analysis';

export const getAnalysisResults = (data: AnalysisData): AnalysisResults => {
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
