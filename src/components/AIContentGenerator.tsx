
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Copy, RefreshCw, Sparkles, CheckCircle, Edit } from 'lucide-react';

interface AIContentGeneratorProps {
  userProfile: any;
  careerGoal: string;
}

const AIContentGenerator = ({ userProfile, careerGoal }: AIContentGeneratorProps) => {
  const [generatedContent, setGeneratedContent] = useState<any>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [editingSection, setEditingSection] = useState<string | null>(null);

  const generateContent = async (section: string) => {
    setIsGenerating(true);
    
    // Simulate AI generation with realistic content
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const generatedSections = {
      headline: {
        current: "Software Engineer at Tech Company",
        improved: "Senior Full-Stack Engineer | React & Node.js Expert | Building Scalable Web Apps for 2M+ Users | Ex-Meta",
        reasoning: "Includes seniority level, specific technologies, quantified impact, and credible background signal",
        score: 92
      },
      summary: {
        current: "Experienced software engineer with passion for technology and problem-solving...",
        improved: "I transform complex business challenges into elegant, scalable solutions. In my 5 years at Meta, I led a team of 6 engineers to rebuild our user authentication system, reducing login failures by 45% and improving user satisfaction scores by 30%.\n\nMy expertise spans the full technology stack - from React frontends that delight users to Node.js backends that handle millions of requests. I've architected systems serving 2M+ daily active users while maintaining 99.9% uptime.\n\nCurrently seeking a Senior Engineering role where I can leverage my experience in distributed systems and team leadership to drive product innovation and engineering excellence.\n\n🔧 Core Tech: React, TypeScript, Node.js, AWS, PostgreSQL\n💡 Specialties: System Architecture, Performance Optimization, Team Leadership\n📈 Impact: $2M+ cost savings through infrastructure optimization",
        reasoning: "Uses STAR method, includes quantified achievements, shows progression, and ends with clear value proposition",
        score: 89
      },
      jobDescription: {
        current: "Developed web applications using React and Node.js. Worked with team to deliver features.",
        improved: "Led cross-functional team of 4 engineers to rebuild customer dashboard using React 18 and TypeScript, resulting in:\n• 60% faster page load times (2.1s → 0.8s average)\n• 25% increase in user engagement (500K+ monthly active users)\n• 40% reduction in customer support tickets related to UI issues\n\nArchitected microservices backend with Node.js and PostgreSQL, implementing caching layer that reduced database queries by 35% and improved API response times by 50%.\n\nEstablished testing standards with Jest and Cypress, achieving 85% code coverage and reducing production bugs by 70%.",
        reasoning: "Follows STAR method with specific metrics, shows leadership and technical depth, includes business impact",
        score: 94
      },
      githubReadme: {
        current: "# My Project\nThis is a web application built with React.",
        improved: "# E-Commerce Platform 🛒\n\n**A full-stack e-commerce solution built for scale and performance**\n\n[![Live Demo](https://img.shields.io/badge/Demo-Live-green)](https://demo-link.com)\n[![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen)]()\n[![Coverage](https://img.shields.io/badge/Coverage-87%25-green)]()\n\n## 🚀 Features\n\n- **Real-time inventory management** with WebSocket updates\n- **Secure payment processing** via Stripe integration\n- **Advanced search & filtering** with Elasticsearch\n- **Mobile-responsive design** with 95+ Lighthouse score\n- **Comprehensive admin dashboard** with analytics\n\n## 🏗️ Architecture\n\n```\nFrontend (React 18 + TypeScript) ↔ API Gateway ↔ Microservices\n     ↓                                    ↓\nRedis Cache                         PostgreSQL + Redis\n```\n\n## 🛠️ Tech Stack\n\n**Frontend:** React 18, TypeScript, Tailwind CSS, Zustand\n**Backend:** Node.js, Express, PostgreSQL, Redis\n**Infrastructure:** AWS (ECS, RDS, ElastiCache), Docker\n**Testing:** Jest, Cypress, React Testing Library\n\n## 📊 Performance\n\n- **Load Time:** < 1s (95th percentile)\n- **Concurrent Users:** 10,000+ tested\n- **Uptime:** 99.9% (last 12 months)\n- **Core Web Vitals:** All green scores\n\n## 🚀 Quick Start\n\n```bash\n# Clone and install\ngit clone https://github.com/username/ecommerce-platform\ncd ecommerce-platform\nnpm install\n\n# Set up environment\ncp .env.example .env\n# Add your API keys\n\n# Run development server\nnpm run dev\n```\n\n## 📈 Key Metrics\n\n- Reduced checkout abandonment by **32%**\n- Improved page load speed by **65%**\n- Increased conversion rate by **18%**\n- Serving **50,000+ monthly transactions**\n\n---\n\n⭐ **Star this repo if you found it helpful!**",
        reasoning: "Professional structure with metrics, clear tech stack, performance data, and visual elements that grab attention",
        score: 91
      }
    };

    setGeneratedContent(prev => ({
      ...prev,
      [section]: generatedSections[section as keyof typeof generatedSections]
    }));
    
    setIsGenerating(false);
  };

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6">
      <Card className="glass border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-400" />
            AI Content Generator
          </CardTitle>
          <CardDescription>
            Generate optimized content based on tier-1 company standards
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="headline" className="w-full">
            <TabsList className="grid w-full grid-cols-4 glass">
              <TabsTrigger value="headline">LinkedIn Headline</TabsTrigger>
              <TabsTrigger value="summary">Profile Summary</TabsTrigger>
              <TabsTrigger value="jobDescription">Job Descriptions</TabsTrigger>
              <TabsTrigger value="githubReadme">GitHub README</TabsTrigger>
            </TabsList>

            {['headline', 'summary', 'jobDescription', 'githubReadme'].map(section => (
              <TabsContent key={section} value={section} className="mt-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium capitalize">
                      {section.replace(/([A-Z])/g, ' $1').trim()}
                    </h3>
                    <Button
                      onClick={() => generateContent(section)}
                      disabled={isGenerating}
                      className="glass hover:bg-white/10"
                    >
                      {isGenerating ? (
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Sparkles className="h-4 w-4 mr-2" />
                      )}
                      Generate AI Content
                    </Button>
                  </div>

                  {generatedContent[section] && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Current Version */}
                      <Card className="bg-red-500/10 border-red-500/20">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm text-red-300 flex items-center gap-2">
                            ❌ Current Version
                            <Badge variant="outline" className="text-red-400 border-red-500/30">
                              Needs Improvement
                            </Badge>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="p-3 rounded bg-red-500/5 border border-red-500/20">
                            <pre className="text-sm text-red-200 whitespace-pre-wrap font-sans">
                              {generatedContent[section].current}
                            </pre>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Improved Version */}
                      <Card className="bg-green-500/10 border-green-500/20">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm text-green-300 flex items-center gap-2">
                            ✅ AI-Optimized Version
                            <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                              Score: {generatedContent[section].score}/100
                            </Badge>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="p-3 rounded bg-green-500/5 border border-green-500/20">
                              {editingSection === section ? (
                                <Textarea
                                  value={generatedContent[section].improved}
                                  onChange={(e) => setGeneratedContent(prev => ({
                                    ...prev,
                                    [section]: { ...prev[section], improved: e.target.value }
                                  }))}
                                  className="w-full bg-transparent border-none resize-none p-0 text-sm text-green-200"
                                  rows={8}
                                />
                              ) : (
                                <pre className="text-sm text-green-200 whitespace-pre-wrap font-sans">
                                  {generatedContent[section].improved}
                                </pre>
                              )}
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                onClick={() => setEditingSection(editingSection === section ? null : section)}
                                variant="outline"
                                className="glass"
                              >
                                <Edit className="h-3 w-3 mr-1" />
                                {editingSection === section ? 'Save' : 'Edit'}
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => copyToClipboard(generatedContent[section].improved)}
                                variant="outline"
                                className="glass"
                              >
                                <Copy className="h-3 w-3 mr-1" />
                                Copy
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => generateContent(section)}
                                variant="outline"
                                className="glass"
                              >
                                <RefreshCw className="h-3 w-3 mr-1" />
                                Regenerate
                              </Button>
                            </div>

                            <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded">
                              <p className="text-xs text-blue-300 font-medium mb-1">💡 Why this works:</p>
                              <p className="text-xs text-blue-200">{generatedContent[section].reasoning}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}

                  {!generatedContent[section] && (
                    <div className="text-center py-8 text-muted-foreground">
                      <Brain className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p>Click "Generate AI Content" to create optimized content</p>
                      <p className="text-sm">Based on analysis of 1000+ successful profiles</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIContentGenerator;
