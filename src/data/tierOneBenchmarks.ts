
import type { TierOneBenchmark } from '@/types/tierOneBenchmark';

// Tier 1 company benchmarks database
export const TIER_ONE_BENCHMARKS: Record<string, TierOneBenchmark[]> = {
  'github': [
    {
      company: 'Google',
      role: 'Software Engineer',
      avgScore: 92,
      keyStrengths: ['Clean code architecture', 'Comprehensive documentation', 'Active open source contributions'],
      requirements: ['5+ substantial projects', 'Test coverage >80%', 'Modern tech stack proficiency']
    },
    {
      company: 'Meta',
      role: 'Frontend Engineer',
      avgScore: 89,
      keyStrengths: ['React ecosystem mastery', 'Performance optimization', 'User experience focus'],
      requirements: ['React/Next.js expertise', 'Mobile-first design', 'Scalable component architecture']
    },
    {
      company: 'Microsoft',
      role: 'Full Stack Developer',
      avgScore: 87,
      keyStrengths: ['Cross-platform development', 'Azure integration', 'Enterprise-scale solutions'],
      requirements: ['Multi-language proficiency', 'Cloud architecture', 'DevOps integration']
    }
  ],
  'linkedin': [
    {
      company: 'Amazon',
      role: 'Senior SDE',
      avgScore: 90,
      keyStrengths: ['Leadership principles demonstration', 'Quantified achievements', 'Technical depth'],
      requirements: ['10+ years experience', 'Team leadership', 'System design expertise']
    },
    {
      company: 'Apple',
      role: 'iOS Engineer',
      avgScore: 94,
      keyStrengths: ['Product focus', 'Design attention', 'Innovation mindset'],
      requirements: ['Swift mastery', 'HIG compliance', 'Performance optimization']
    }
  ]
};
