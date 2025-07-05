
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Flame, Briefcase, DollarSign, MapPin } from 'lucide-react';

interface MarketTrend {
  skill: string;
  change: number;
  demand: 'hot' | 'rising' | 'stable' | 'cooling';
  companies: string[];
  avgSalary: string;
}

interface JobOpportunity {
  title: string;
  company: string;
  location: string;
  salary: string;
  matchScore: number;
  postedHours: number;
}

const JobMarketPulse = () => {
  const [trends, setTrends] = useState<MarketTrend[]>([]);
  const [opportunities, setOpportunities] = useState<JobOpportunity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate real-time market data
    setTimeout(() => {
      setTrends([
        {
          skill: 'Python + Rust',
          change: 300,
          demand: 'hot',
          companies: ['Jane Street', 'Two Sigma', 'Citadel'],
          avgSalary: '$280k-450k'
        },
        {
          skill: 'Kubernetes',
          change: 150,
          demand: 'rising',
          companies: ['Netflix', 'Uber', 'Airbnb'],
          avgSalary: '$190k-280k'
        },
        {
          skill: 'React + TypeScript',
          change: 75,
          demand: 'stable',
          companies: ['Meta', 'Stripe', 'Vercel'],
          avgSalary: '$160k-240k'
        },
        {
          skill: 'Java Spring',
          change: -25,
          demand: 'cooling',
          companies: ['Goldman Sachs', 'JPMorgan'],
          avgSalary: '$140k-200k'
        }
      ]);

      setOpportunities([
        {
          title: 'Senior Full Stack Engineer',
          company: 'Stripe',
          location: 'San Francisco, CA',
          salary: '$200k-280k',
          matchScore: 95,
          postedHours: 2
        },
        {
          title: 'Platform Engineer',
          company: 'Airbnb',
          location: 'Remote',
          salary: '$220k-300k',
          matchScore: 88,
          postedHours: 4
        },
        {
          title: 'Machine Learning Engineer',
          company: 'Tesla',
          location: 'Austin, TX',
          salary: '$180k-250k',
          matchScore: 82,
          postedHours: 6
        }
      ]);

      setIsLoading(false);
    }, 2000);
  }, []);

  const getDemandIcon = (demand: string) => {
    switch (demand) {
      case 'hot': return <Flame className="h-4 w-4 text-red-400" />;
      case 'rising': return <TrendingUp className="h-4 w-4 text-green-400" />;
      case 'stable': return <TrendingUp className="h-4 w-4 text-blue-400" />;
      case 'cooling': return <TrendingDown className="h-4 w-4 text-gray-400" />;
      default: return null;
    }
  };

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'hot': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'rising': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'stable': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'cooling': return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
      default: return '';
    }
  };

  if (isLoading) {
    return (
      <Card className="glass border-border/20">
        <CardContent className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500 mx-auto mb-4" />
          <p>Analyzing 10,000+ job postings...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Market Trends */}
      <Card className="glass border-border/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-cyan-400" />
            Market Pulse (Last 7 Days)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {trends.map((trend, index) => (
            <div key={index} className="p-4 bg-background/50 rounded-lg border border-border/50">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getDemandIcon(trend.demand)}
                  <h4 className="font-semibold">{trend.skill}</h4>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getDemandColor(trend.demand)}>
                    {trend.change > 0 ? '+' : ''}{trend.change}%
                  </Badge>
                  <Badge variant="outline">{trend.avgSalary}</Badge>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>Hiring: {trend.companies.join(', ')}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Job Opportunities */}
      <Card className="glass border-border/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-purple-400" />
            Perfect Matches (For Your Profile)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {opportunities.map((job, index) => (
            <div key={index} className="p-4 bg-background/50 rounded-lg border border-border/50 hover:border-purple-500/30 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-semibold text-lg">{job.title}</h4>
                  <p className="text-purple-400 font-medium">{job.company}</p>
                </div>
                <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                  {job.matchScore}% Match
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {job.location}
                </div>
                <div className="flex items-center gap-1">
                  <DollarSign className="h-3 w-3" />
                  {job.salary}
                </div>
                <span>Posted {job.postedHours}h ago</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-xs text-green-400">
                  ✨ Your profile matches their exact requirements
                </div>
                <button className="text-purple-400 hover:text-purple-300 text-sm font-medium">
                  Apply Now →
                </button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default JobMarketPulse;
