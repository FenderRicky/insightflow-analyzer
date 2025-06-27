
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Search, Plus, Eye, Edit3, Copy, Download, Star, Users, Zap, Palette, Code, Smartphone } from 'lucide-react';
import EnhancedTemplateShowcase from '../components/EnhancedTemplateShowcase';
import { type PortfolioTemplate } from '../data/enhancedPortfolioTemplates';

const PortfolioBuilder = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Templates', count: 24 },
    { id: 'developer', label: 'Developer', count: 8 },
    { id: 'designer', label: 'Designer', count: 6 },
    { id: 'creative', label: 'Creative', count: 5 },
    { id: 'business', label: 'Business', count: 5 }
  ];

  const myProjects = [
    { name: 'Personal Portfolio v2', template: 'Modern Developer', status: 'Published', views: 1247, lastEdit: '2 days ago' },
    { name: 'Design Showcase', template: 'Creative Portfolio', status: 'Draft', views: 0, lastEdit: '1 week ago' },
    { name: 'Business Profile', template: 'Professional', status: 'Published', views: 456, lastEdit: '3 days ago' }
  ];

  const features = [
    { name: 'Drag & Drop Editor', icon: Edit3, description: 'Visual editing with real-time preview' },
    { name: 'Mobile Responsive', icon: Smartphone, description: 'Looks perfect on all devices' },
    { name: 'SEO Optimized', icon: Zap, description: 'Built-in SEO best practices' },
    { name: 'Custom Themes', icon: Palette, description: 'Personalize colors and fonts' },
    { name: 'Code Export', icon: Code, description: 'Export clean, deployable code' },
    { name: 'Analytics Ready', icon: Users, description: 'Track your portfolio performance' }
  ];

  const handleSelectTemplate = (template: PortfolioTemplate) => {
    console.log('Selected template:', template);
    // TODO: Navigate to template editor or show template details
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gradient mb-2">Portfolio Builder</h1>  
          <p className="text-xl text-muted-foreground">Create stunning portfolios with our AI-powered templates</p>
        </div>

        <Tabs defaultValue="templates" className="w-full">
          <TabsList className="grid w-full grid-cols-3 glass p-1 mb-8">
            <TabsTrigger value="templates" className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              Template Gallery
            </TabsTrigger>
            <TabsTrigger value="my-projects" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              My Projects
            </TabsTrigger>
            <TabsTrigger value="features" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Features
            </TabsTrigger>
          </TabsList>

          {/* Template Gallery */}
          <TabsContent value="templates" className="space-y-6">
            {/* Search and Filters */}
            <Card className="glass border-white/10">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-4 items-center">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search templates..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 glass border-white/20"
                    />
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {categories.map((category) => (
                      <Badge
                        key={category.id}
                        variant={selectedCategory === category.id ? "default" : "outline"}
                        className={`cursor-pointer ${
                          selectedCategory === category.id 
                            ? 'bg-brand-500 text-white' 
                            : 'glass border-white/20 hover:border-white/40'
                        }`}
                        onClick={() => setSelectedCategory(category.id)}
                      >
                        {category.label} ({category.count})
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Template Showcase */}
            <EnhancedTemplateShowcase onSelectTemplate={handleSelectTemplate} />

            {/* Quick Actions */}
            <Card className="glass border-white/10">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Get started quickly with these options</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button className="h-16 glass border-white/20 hover:border-white/40 flex flex-col gap-2">
                    <Plus className="h-5 w-5" />
                    Start from Scratch
                  </Button>
                  <Button className="h-16 glass border-white/20 hover:border-white/40 flex flex-col gap-2">
                    <Copy className="h-5 w-5" />
                    Import Existing
                  </Button>
                  <Button className="h-16 glass border-white/20 hover:border-white/40 flex flex-col gap-2">
                    <Zap className="h-5 w-5" />
                    AI Quick Build
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* My Projects */}
          <TabsContent value="my-projects" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gradient">My Projects</h2>
              <Button className="glass border-white/20 hover:border-white/40">
                <Plus className="h-4 w-4 mr-2" />
                New Project
              </Button>
            </div>

            <div className="grid gap-4">
              {myProjects.map((project, index) => (
                <Card key={index} className="glass border-white/10">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-semibold">{project.name}</h3>
                          <Badge variant={project.status === 'Published' ? 'default' : 'secondary'}>
                            {project.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Template: {project.template} • {project.views} views • Last edited {project.lastEdit}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="glass border-white/20">
                          <Eye className="h-4 w-4 mr-2" />
                          Preview
                        </Button>
                        <Button size="sm" className="glass border-white/20 hover:border-white/40">
                          <Edit3 className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Features */}
          <TabsContent value="features" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gradient mb-4">Powerful Portfolio Features</h2>
              <p className="text-xl text-muted-foreground">Everything you need to create professional portfolios</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <Card key={index} className="glass border-white/10 hover:border-white/20 transition-colors">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-brand-500/20">
                          <IconComponent className="h-5 w-5 text-brand-400" />
                        </div>
                        <CardTitle className="text-lg">{feature.name}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <Card className="glass border-white/10 text-center">
              <CardContent className="pt-8 pb-8">
                <h3 className="text-2xl font-bold text-gradient mb-4">Ready to build your portfolio?</h3>
                <p className="text-muted-foreground mb-6">Join thousands of professionals who've built stunning portfolios with InsightFlow</p>
                <Button size="lg" className="glass border-white/20 hover:border-white/40">
                  <Plus className="h-5 w-5 mr-2" />
                  Create Your Portfolio
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PortfolioBuilder;
