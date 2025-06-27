
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Search, BookOpen, Video, FileText, TrendingUp, Clock, Star, Download, ExternalLink, Play, Users } from 'lucide-react';

const Resources = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const guides = [
    {
      title: "The Complete GitHub Profile Optimization Guide",
      description: "Learn how to create a GitHub profile that stands out to recruiters and hiring managers.",
      readTime: "15 min read",
      difficulty: "Beginner",
      downloads: 2456,
      rating: 4.9,
      category: "GitHub"
    },
    {
      title: "LinkedIn Headline Formulas That Work",
      description: "Proven templates and examples for crafting compelling LinkedIn headlines.",
      readTime: "8 min read", 
      difficulty: "Beginner",
      downloads: 1834,
      rating: 4.8,
      category: "LinkedIn"
    },
    {
      title: "Portfolio Project Ideas for Developers",
      description: "50+ project ideas to build an impressive developer portfolio that showcases your skills.",
      readTime: "12 min read",
      difficulty: "Intermediate",
      downloads: 3201,
      rating: 4.7,
      category: "Portfolio"
    },
    {
      title: "Design System Documentation Best Practices",
      description: "How to document and present your design systems in your portfolio.",
      readTime: "20 min read",
      difficulty: "Advanced",
      downloads: 967,
      rating: 4.9,
      category: "Design"
    }
  ];

  const videos = [
    {
      title: "Portfolio Review: From Good to Great",
      description: "Watch a live portfolio review and transformation session.",
      duration: "28:45",
      views: "12.3K views",
      category: "Portfolio Review",
      thumbnail: ""
    },
    {
      title: "GitHub Actions for Your Portfolio",
      description: "Automate your portfolio deployment with GitHub Actions.",
      duration: "15:22",
      views: "8.7K views", 
      category: "Technical",
      thumbnail: ""
    },
    {
      title: "Design Principles for Developers",
      description: "Essential design principles every developer should know.",
      duration: "22:18",
      views: "15.1K views",
      category: "Design",
      thumbnail: ""
    }
  ];

  const templates = [
    {
      name: "Resume Template - Tech Professional",
      description: "ATS-friendly resume template for tech professionals",
      downloads: 5432,
      format: "PDF, DOCX",
      category: "Resume"
    },
    {
      name: "Cover Letter Templates Pack",
      description: "5 customizable cover letter templates for different scenarios",
      downloads: 3210,
      format: "DOCX, PDF",
      category: "Cover Letter"
    },
    {
      name: "LinkedIn Content Calendar",
      description: "30-day content calendar with post ideas and templates",
      downloads: 2876,
      format: "Excel, PDF",
      category: "LinkedIn"
    },
    {
      name: "Portfolio Checklist",
      description: "Complete checklist to ensure your portfolio is industry-ready",
      downloads: 4123,
      format: "PDF",
      category: "Portfolio"
    }
  ];

  const benchmarks = [
    {
      metric: "GitHub Profile Score",
      industry: "Software Development",
      beginner: "60-70",
      intermediate: "70-85",
      expert: "85+"
    },
    {
      metric: "LinkedIn Profile Views",
      industry: "Tech Professional",
      beginner: "50-100/week",
      intermediate: "100-300/week",
      expert: "300+/week"
    },
    {
      metric: "Portfolio Load Time",
      industry: "Web Development",
      beginner: "< 5 seconds",
      intermediate: "< 3 seconds",
      expert: "< 2 seconds"
    },
    {
      metric: "Resume ATS Score",
      industry: "General Tech",
      beginner: "70-80%",
      intermediate: "80-90%",
      expert: "90%+"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gradient mb-2">Resources Hub</h1>  
          <p className="text-xl text-muted-foreground">Everything you need to level up your professional presence</p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search guides, templates, videos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 glass border-white/20 text-center"
            />
          </div>
        </div>

        <Tabs defaultValue="guides" className="w-full">
          <TabsList className="grid w-full grid-cols-4 glass p-1 mb-8">
            <TabsTrigger value="guides" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Guides
            </TabsTrigger>
            <TabsTrigger value="videos" className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              Videos
            </TabsTrigger>
            <TabsTrigger value="templates" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Templates
            </TabsTrigger>
            <TabsTrigger value="benchmarks" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Benchmarks
            </TabsTrigger>
          </TabsList>

          {/* Guides */}
          <TabsContent value="guides" className="space-y-6">
            <div className="grid gap-6">
              {guides.map((guide, index) => (
                <Card key={index} className="glass border-white/10 hover:border-white/20 transition-colors">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <CardTitle className="text-xl">{guide.title}</CardTitle>
                        <CardDescription className="text-base">{guide.description}</CardDescription>
                        <div className="flex items-center gap-4">
                          <Badge variant="outline" className="glass border-white/20">
                            {guide.category}
                          </Badge>
                          <Badge variant="outline" className={`glass border-white/20 ${
                            guide.difficulty === 'Beginner' ? 'text-green-300' :
                            guide.difficulty === 'Intermediate' ? 'text-yellow-300' :
                            'text-red-300'
                          }`}>
                            {guide.difficulty}
                          </Badge>
                          <span className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            {guide.readTime}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 mb-2">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm">{guide.rating}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{guide.downloads} downloads</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Button className="glass border-white/20 hover:border-white/40">
                        <BookOpen className="h-4 w-4 mr-2" />
                        Read Guide
                      </Button>
                      <Button variant="outline" className="glass border-white/20">
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </Button>
                      <Button variant="outline" className="glass border-white/20">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Videos */}
          <TabsContent value="videos" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video, index) => (
                <Card key={index} className="glass border-white/10 hover:border-white/20 transition-colors">
                  <div className="aspect-video bg-gradient-to-br from-brand-500/20 to-purple-500/20 rounded-t-lg flex items-center justify-center relative">
                    <Play className="h-12 w-12 text-white/80" />
                    <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs">
                      {video.duration}
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">{video.title}</CardTitle>
                    <CardDescription>{video.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mb-4">
                      <Badge variant="outline" className="glass border-white/20">
                        {video.category}
                      </Badge>
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {video.views}
                      </span>
                    </div>
                    <Button className="w-full glass border-white/20 hover:border-white/40">
                      <Play className="h-4 w-4 mr-2" />
                      Watch Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Templates */}
          <TabsContent value="templates" className="space-y-6">
            <div className="grid gap-4">
              {templates.map((template, index) => (
                <Card key={index} className="glass border-white/10 hover:border-white/20 transition-colors">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold">{template.name}</h3>
                        <p className="text-muted-foreground">{template.description}</p>
                        <div className="flex items-center gap-4">
                          <Badge variant="outline" className="glass border-white/20">
                            {template.category}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            Format: {template.format}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {template.downloads} downloads
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button className="glass border-white/20 hover:border-white/40">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                        <Button variant="outline" className="glass border-white/20">
                          Preview
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Benchmarks */}
          <TabsContent value="benchmarks" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gradient mb-2">Industry Benchmarks</h2>
              <p className="text-muted-foreground">See how you compare to industry standards</p>
            </div>

            <div className="grid gap-6">
              {benchmarks.map((benchmark, index) => (
                <Card key={index} className="glass border-white/10">
                  <CardHeader>
                    <CardTitle className="text-xl">{benchmark.metric}</CardTitle>
                    <CardDescription>Industry: {benchmark.industry}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                        <h4 className="font-medium text-green-300 mb-2">Beginner</h4>
                        <div className="text-2xl font-bold text-green-400">{benchmark.beginner}</div>
                      </div>
                      <div className="text-center p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <h4 className="font-medium text-yellow-300 mb-2">Intermediate</h4>
                        <div className="text-2xl font-bold text-yellow-400">{benchmark.intermediate}</div>
                      </div>
                      <div className="text-center p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <h4 className="font-medium text-blue-300 mb-2">Expert</h4>
                        <div className="text-2xl font-bold text-blue-400">{benchmark.expert}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Resources;
