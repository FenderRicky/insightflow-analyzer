
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Target, Rocket, CheckCircle, Users, Building, Sparkles, ArrowRight, Play } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import FuturisticLogo from '@/components/FuturisticLogo';
import { useTheme } from '@/hooks/useTheme';

const RoadmapPage = () => {
  const [selectedDemo, setSelectedDemo] = useState<string>('');
  const [showDemoResult, setShowDemoResult] = useState(false);
  const { isDark, setTheme } = useTheme();

  const demoOptions = [
    { id: 'tesla-backend', label: 'Tesla Backend Engineer', company: 'Tesla', role: 'Backend Engineer', difficulty: 'Advanced' },
    { id: 'google-swe', label: 'Google Software Engineer', company: 'Google', role: 'Software Engineer', difficulty: 'Advanced' },
    { id: 'netflix-frontend', label: 'Netflix Frontend Dev', company: 'Netflix', role: 'Frontend Developer', difficulty: 'Intermediate' },
    { id: 'startup-fullstack', label: 'Startup Full-Stack', company: 'Startup', role: 'Full-Stack Developer', difficulty: 'Intermediate' }
  ];

  const companies = [
    'Google', 'Meta', 'Amazon', 'Apple', 'Netflix', 'Tesla', 'Uber', 'Airbnb', 'Stripe', 'OpenAI'
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'CS Graduate → Google SWE',
      quote: 'This roadmap helped me land my dream job at Google! The step-by-step plan was exactly what I needed.',
      avatar: '👩‍💻'
    },
    {
      name: 'Marcus Johnson',
      role: 'Bootcamp → Meta Frontend',
      quote: 'Went from bootcamp to Meta in 4 months following the AI-generated roadmap. Game changer!',
      avatar: '👨‍💻'
    },
    {
      name: 'Priya Patel',
      role: 'Student → Tesla AI Engineer',
      quote: 'The Tesla-specific roadmap got me interviews at 3 top companies. Worth every minute!',
      avatar: '👩‍🔬'
    }
  ];

  const handleDemoTry = (demoId: string) => {
    setSelectedDemo(demoId);
    setShowDemoResult(true);
  };

  const getDemoRoadmap = (demoId: string) => {
    const roadmaps = {
      'tesla-backend': {
        title: 'Your 3-Month Tesla Backend Plan',
        weeks: [
          { week: 'Month 1', task: 'Build 2 Go projects (Tesla\'s backend language)', status: 'pending' },
          { week: 'Month 2', task: 'Contribute to Tesla\'s Open Source (e.g., AutoPilot docs)', status: 'pending' },
          { week: 'Month 3', task: 'Add "embedded systems" to LinkedIn + GitHub', status: 'pending' }
        ],
        impact: '+65% hireability for Tesla roles',
        nextStep: 'Get Tesla-optimized portfolio template'
      },
      'google-swe': {
        title: 'Your 4-Month Google SWE Plan',
        weeks: [
          { week: 'Month 1', task: 'Master system design fundamentals', status: 'pending' },
          { week: 'Month 2', task: 'Solve 150 LeetCode problems (focus on Google patterns)', status: 'pending' },
          { week: 'Month 3', task: 'Build distributed system project with microservices', status: 'pending' },
          { week: 'Month 4', task: 'Optimize LinkedIn with Google-specific keywords', status: 'pending' }
        ],
        impact: '+78% hireability for Google roles',
        nextStep: 'Get Google-style portfolio template'
      }
    };
    return roadmaps[demoId] || roadmaps['tesla-backend'];
  };

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Enhanced background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/90" />
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Header */}
      <header className="relative z-10 w-full border-b border-border/50 backdrop-blur-xl bg-background/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost" size="sm" className="hover:bg-brand-500/10">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <FuturisticLogo size="md" animate={true} />
            </div>
            <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
          </div>
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center space-y-8 py-12">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 mb-8">
            <Rocket className="h-4 w-4 text-cyan-400 animate-pulse" />
            <span className="text-sm font-medium bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              AI-Powered Career Acceleration
            </span>
            <Sparkles className="h-4 w-4 text-purple-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight">
              From Rookie to
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient-x">
                Hired
              </span>
              <span className="text-2xl sm:text-3xl md:text-5xl block mt-4 text-muted-foreground font-normal">
                Your AI-Powered Battle Plan
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Get a step-by-step roadmap tailored for your dream company (FAANG, startups, etc.). 
              From skill gaps to portfolio optimization—we handle the strategy, you execute the plan.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link to="/">
              <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:shadow-lg hover:shadow-cyan-500/25 text-lg px-8 py-4">
                <Target className="h-5 w-5 mr-2" />
                Generate My Roadmap
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="border-cyan-500/30 hover:bg-cyan-500/10 text-lg px-8 py-4">
              <Play className="h-5 w-5 mr-2" />
              Try Demo Below
            </Button>
          </div>
        </section>

        {/* Interactive Demo Section */}
        <section className="max-w-6xl mx-auto space-y-8 py-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              See Your Future in 30 Seconds
            </h2>
            <p className="text-muted-foreground text-lg">
              Try our AI roadmap generator with real company examples
            </p>
          </div>

          {/* Demo Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {demoOptions.map((option) => (
              <Card key={option.id} className="glass border-white/10 hover:border-cyan-500/30 transition-all duration-300 cursor-pointer group" onClick={() => handleDemoTry(option.id)}>
                <CardContent className="p-4 text-center space-y-3">
                  <div className="w-12 h-12 mx-auto bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Building className="h-6 w-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{option.label}</h3>
                    <p className="text-sm text-muted-foreground">{option.company} • {option.role}</p>
                  </div>
                  <Badge variant="outline" className={`text-xs ${
                    option.difficulty === 'Advanced' ? 'border-red-500/30 text-red-400' : 'border-yellow-500/30 text-yellow-400'
                  }`}>
                    {option.difficulty}
                  </Badge>
                  <Button size="sm" className="w-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 hover:from-cyan-500/30 hover:to-purple-500/30">
                    Try This Path
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Demo Result */}
          {showDemoResult && selectedDemo && (
            <Card className="glass border-cyan-500/20 bg-gradient-to-r from-cyan-500/5 to-purple-500/5">
              <CardHeader>
                <CardTitle className="text-2xl bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent flex items-center gap-2">
                  <CheckCircle className="h-6 w-6 text-green-400" />
                  {getDemoRoadmap(selectedDemo).title}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    {getDemoRoadmap(selectedDemo).impact}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {getDemoRoadmap(selectedDemo).weeks.map((week, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-background/50">
                      <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-cyan-400">{week.week}</span>
                          <CheckCircle className="h-4 w-4 text-green-400" />
                        </div>
                        <p className="text-foreground">{week.task}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-green-400 mb-1">Next Step</h4>
                      <p className="text-sm text-muted-foreground">{getDemoRoadmap(selectedDemo).nextStep}</p>
                    </div>
                    <Link to="/portfolio-presets">
                      <Button className="bg-gradient-to-r from-green-500 to-emerald-500">
                        <ArrowRight className="h-4 w-4 mr-2" />
                        Get Template
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </section>

        {/* Social Proof Section */}
        <section className="max-w-6xl mx-auto space-y-12 py-16">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20">
              <Users className="h-4 w-4 text-green-400" />
              <span className="text-sm font-medium text-green-400">Used by 10,000+ students</span>
            </div>
            <h2 className="text-3xl font-bold">Success Stories</h2>
            <p className="text-muted-foreground">Real people, real results from following AI-generated roadmaps</p>
          </div>

          {/* Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="glass border-white/10 hover:border-green-500/30 transition-all duration-300">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center text-2xl">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-green-400">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Company Logos */}
          <div className="text-center space-y-6">
            <h3 className="text-xl font-semibold text-muted-foreground">Roadmaps Available For</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {companies.map((company) => (
                <Badge key={company} variant="outline" className="glass border-white/20 px-4 py-2 text-sm">
                  {company}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="text-center space-y-8 py-16">
          <Card className="max-w-4xl mx-auto glass border-cyan-500/20 bg-gradient-to-r from-cyan-500/5 to-purple-500/5">
            <CardContent className="p-8 space-y-6">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Ready to Transform Your Career?
              </h2>
              <p className="text-lg text-muted-foreground">
                Join thousands who've landed their dream jobs with personalized AI roadmaps
              </p>
              <Link to="/">
                <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:shadow-lg hover:shadow-cyan-500/25 text-lg px-12 py-4">
                  <Rocket className="h-5 w-5 mr-2" />
                  Start My Journey
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default RoadmapPage;
