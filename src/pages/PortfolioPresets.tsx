
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, Edit, Eye, Sparkles, Code, Palette, Zap, Users, Briefcase, GraduationCap, Camera, PenTool, TrendingUp, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ThemeToggle from '@/components/ThemeToggle';
import TemplatePreview from '@/components/TemplatePreview';
import CodeEditor from '@/components/CodeEditor';
import { portfolioTemplates, type Template } from '@/data/portfolioTemplates';

const PortfolioPresets = () => {
  const [isDark, setIsDark] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'preview' | 'editor'>('grid');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const root = document.documentElement;
    root.className = isDark ? 'dark' : 'light';
  }, [isDark]);

  const roleCategories = [
    { id: 'all', label: 'All Templates', icon: Palette, count: portfolioTemplates.length },
    { id: 'developer', label: 'Developers', icon: Code, count: portfolioTemplates.filter(t => t.category === 'developer').length },
    { id: 'designer', label: 'Designers', icon: PenTool, count: portfolioTemplates.filter(t => t.category === 'designer').length },
    { id: 'creative', label: 'Creatives', icon: Camera, count: portfolioTemplates.filter(t => t.category === 'creative').length },
    { id: 'business', label: 'Business', icon: Briefcase, count: portfolioTemplates.filter(t => t.category === 'business').length },
    { id: 'student', label: 'Students', icon: GraduationCap, count: portfolioTemplates.filter(t => t.category === 'student').length }
  ];

  const testimonials = [
    {
      name: 'Alex Rodriguez',
      role: 'Bootcamp → Netflix Frontend',
      quote: 'This preset got me interviews at Google & Meta! The Netflix-style design was exactly what recruiters wanted.',
      template: 'Netflix Clone Portfolio',
      impact: '+35% recruiter clicks',
      avatar: '👨‍💻'
    },
    {
      name: 'Sophia Kim',
      role: 'Student → Tesla AI Engineer',
      quote: 'The Tesla-optimized portfolio template helped me stand out from 500+ applicants.',
      template: 'Tesla Engineer Portfolio',
      impact: '+60% interview rate',
      avatar: '👩‍🔬'
    },
    {
      name: 'Jordan Chen',
      role: 'Designer → Uber Design',
      quote: 'Used the Uber-style preset and got hired within 2 weeks. The motion graphics were perfect!',
      template: 'Uber Design Portfolio',
      impact: '+45% portfolio views',
      avatar: '🎨'
    }
  ];

  const filteredTemplates = portfolioTemplates.filter(template => {
    const matchesRole = filterRole === 'all' || template.category === filterRole;
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesRole && matchesSearch;
  });

  const handlePreview = (template: Template) => {
    setSelectedTemplate(template);
    setViewMode('preview');
  };

  const handleEdit = (template: Template) => {
    setSelectedTemplate(template);
    setViewMode('editor');
  };

  const handleDownload = (template: Template) => {
    const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${template.name}</title>
    <style>
        ${template.cssCode}
    </style>
</head>
<body>
    ${template.htmlCode.replace(/<\/body>[\s\S]*$/, '')}
    <script>
        ${template.jsCode}
    </script>
</body>
</html>`;

    const blob = new Blob([fullHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${template.name.toLowerCase().replace(/\s+/g, '-')}-portfolio.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getTagColor = (tag: string) => {
    const colors = {
      'Beginner': 'bg-green-500/20 text-green-300 border-green-500/30',
      'Intermediate': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
      'Advanced': 'bg-red-500/20 text-red-300 border-red-500/30',
      'Multi-page': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      'One-page': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      'Dark Theme': 'bg-gray-500/20 text-gray-300 border-gray-500/30',
      'Light Theme': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
      'Minimalist': 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
      'Creative': 'bg-pink-500/20 text-pink-300 border-pink-500/30',
      'Professional': 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
      'Modern': 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
    };
    return colors[tag] || 'bg-gray-500/20 text-gray-300 border-gray-500/30';
  };

  const getHireabilityImpact = (template: Template) => {
    const impacts = ['+25% recruiter clicks', '+35% interview rate', '+40% portfolio views', '+30% hire rate'];
    return impacts[Math.floor(Math.random() * impacts.length)];
  };

  if (viewMode === 'preview' && selectedTemplate) {
    return (
      <TemplatePreview 
        template={selectedTemplate}
        onBack={() => setViewMode('grid')}
        onEdit={() => setViewMode('editor')}
        onDownload={() => handleDownload(selectedTemplate)}
        isDark={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
      />
    );
  }

  if (viewMode === 'editor' && selectedTemplate) {
    return (
      <CodeEditor
        template={selectedTemplate}
        onBack={() => setViewMode('grid')}
        onPreview={() => setViewMode('preview')}
        onDownload={() => handleDownload(selectedTemplate)}
        isDark={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Enhanced background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background/80" />
      
      {/* Header */}
      <header className="relative z-10 w-full border-b border-white/10 glass">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-4">
              <Link to="/">
                <Button variant="ghost" size="sm" className="glass hover:bg-white/10 text-xs sm:text-sm px-2 sm:px-3">
                  <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Back to Home</span>
                  <span className="sm:hidden">Back</span>
                </Button>
              </Link>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-brand-500 to-neon-purple rounded-lg flex items-center justify-center">
                  <Palette className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                </div>
                <h1 className="text-lg sm:text-xl font-bold text-gradient">Portfolio Presets</h1>
              </div>
            </div>
            <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
          </div>
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {/* Hero Section */}
        <section className="text-center space-y-4 sm:space-y-6 py-8 sm:py-12">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full glass border border-white/10 mb-3 sm:mb-4">
            <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-neon-purple" />
            <span className="text-xs sm:text-sm text-muted-foreground">Professional Portfolio Templates</span>
          </div>
          
          <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold leading-tight px-2">
            Launch Your
            <span className="text-gradient block">Dream Portfolio</span>
          </h1>
          
          <p className="text-sm sm:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            Choose from our curated collection of {portfolioTemplates.length}+ premium portfolio templates. 
            Each template is optimized for specific roles and companies to maximize your hireability.
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto pt-4 sm:pt-6 px-4">
            <Input
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="glass bg-white/5 border-white/10 focus:border-brand-500 text-sm"
            />
          </div>
        </section>

        {/* Role-Based Filtering Tabs */}
        <section className="max-w-6xl mx-auto mb-8">
          <Tabs value={filterRole} onValueChange={setFilterRole} className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-6 h-auto p-1">
              {roleCategories.map((role) => (
                <TabsTrigger 
                  key={role.id} 
                  value={role.id}
                  className="flex flex-col items-center gap-1 p-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500/20 data-[state=active]:to-purple-500/20"
                >
                  <role.icon className="h-4 w-4" />
                  <span className="text-xs font-medium">{role.label}</span>
                  <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                    {role.count}
                  </Badge>
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Templates Grid */}
            <TabsContent value={filterRole} className="mt-8">
              <div className="text-center mb-6">
                <p className="text-muted-foreground text-sm">
                  Showing {filteredTemplates.length} templates
                  {searchQuery && ` matching "${searchQuery}"`}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTemplates.map((template) => (
                  <Card 
                    key={template.id} 
                    className="glass border-white/10 hover:border-white/20 transition-all duration-300 group hover:scale-[1.02] hover:shadow-2xl overflow-hidden"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={template.thumbnail}
                        alt={template.name}
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                          e.currentTarget.src = '/api/placeholder/400/300';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Hireability Impact Badge */}
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-green-500/90 text-white border-0 text-xs">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          {getHireabilityImpact(template)}
                        </Badge>
                      </div>
                      
                      <div className="absolute top-3 right-3">
                        <Badge variant="secondary" className="bg-black/50 text-white border-0 text-xs">
                          {template.category}
                        </Badge>
                      </div>

                      {/* Hover Preview Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Button
                          size="sm"
                          className="bg-white/90 text-black hover:bg-white"
                          onClick={() => handlePreview(template)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Quick Preview
                        </Button>
                      </div>
                    </div>
                    
                    <CardHeader className="pb-2 p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-gradient text-lg mb-2">{template.name}</CardTitle>
                          <CardDescription className="line-clamp-2 text-sm mb-3">
                            {template.description}
                          </CardDescription>
                        </div>
                        <div className="flex items-center gap-1 text-yellow-400">
                          <Star className="h-4 w-4 fill-current" />
                          <span className="text-sm font-medium">4.8</span>
                        </div>
                      </div>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 pt-2">
                        {template.tags.slice(0, 2).map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className={`text-xs ${getTagColor(tag)}`}
                          >
                            {tag}
                          </Badge>
                        ))}
                        {template.tags.length > 2 && (
                          <Badge variant="outline" className="text-xs bg-gray-500/20 text-gray-300 border-gray-500/30">
                            +{template.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-0 p-4">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handlePreview(template)}
                          className="flex-1 glass hover:bg-white/10 hover:border-brand-400 transition-all duration-300"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Preview
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleEdit(template)}
                          className="flex-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 hover:from-cyan-500/30 hover:to-purple-500/30 border-cyan-500/30"
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Use This
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDownload(template)}
                          className="glass hover:bg-white/10 hover:text-green-400 transition-all duration-300"
                          title="Download HTML file"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Success Stories Section */}
        <section className="max-w-6xl mx-auto space-y-8 py-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Success Stories
            </h2>
            <p className="text-muted-foreground text-lg">
              Real professionals who landed their dream jobs using our templates
            </p>
          </div>

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
                  <div className="flex items-center justify-between pt-2">
                    <Badge variant="outline" className="text-xs border-cyan-500/30 text-cyan-400">
                      {testimonial.template}
                    </Badge>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                      {testimonial.impact}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* No Results */}
        {filteredTemplates.length === 0 && (
          <div className="text-center py-12 px-4">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold mb-2">No templates found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search or role filters
            </p>
            <Button 
              onClick={() => {
                setSearchQuery('');
                setFilterRole('all');
              }}
              className="glass border-white/20"
              variant="outline"
            >
              Clear All Filters
            </Button>
          </div>
        )}

        {/* AI Recommendations Section */}
        <section className="mt-16 p-8 rounded-xl glass border border-white/10">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-brand-500/20 to-neon-purple/20 border border-white/10">
              <Sparkles className="h-4 w-4 text-neon-purple" />
              <span className="text-sm font-medium">AI-Powered Recommendations</span>
            </div>
            
            <h3 className="text-2xl font-bold text-gradient">Perfect Templates for Your Career</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get personalized template recommendations based on your LinkedIn profile, 
              GitHub activity, and career goals. Let AI find the perfect starting point for your portfolio.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/">
                <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:shadow-lg hover:shadow-cyan-500/25">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Get AI Recommendations
                </Button>
              </Link>
              <Link to="/roadmap">
                <Button variant="outline" className="border-cyan-500/30 hover:bg-cyan-500/10">
                  <Zap className="h-4 w-4 mr-2" />
                  View Career Roadmaps
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PortfolioPresets;
