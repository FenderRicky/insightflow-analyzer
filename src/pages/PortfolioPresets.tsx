
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, Edit, Eye, Sparkles, Code, Palette, Zap, Users, Briefcase, GraduationCap, Camera, PenTool } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import ThemeToggle from '@/components/ThemeToggle';
import TemplatePreview from '@/components/TemplatePreview';
import CodeEditor from '@/components/CodeEditor';
import { portfolioTemplates, type Template } from '@/data/portfolioTemplates';

const PortfolioPresets = () => {
  const [isDark, setIsDark] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'preview' | 'editor'>('grid');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const root = document.documentElement;
    root.className = isDark ? 'dark' : 'light';
  }, [isDark]);

  const categoryIcons = {
    'all': Palette,
    'developer': Code,
    'designer': PenTool,
    'creative': Camera,
    'business': Briefcase,
    'student': GraduationCap,
    'data-scientist': Zap,
    'general': Users
  };

  const filteredTemplates = portfolioTemplates.filter(template => {
    const matchesCategory = filterCategory === 'all' || template.category === filterCategory;
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
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
    // Create a complete HTML file with embedded CSS and JS
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
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background/80" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-purple/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      {/* Header */}
      <header className="relative z-10 w-full border-b border-white/10 glass">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost" size="sm" className="glass hover:bg-white/10">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-brand-500 to-neon-purple rounded-lg flex items-center justify-center">
                  <Palette className="h-4 w-4 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gradient">Portfolio Presets</h1>
              </div>
            </div>
            <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
          </div>
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center space-y-6 py-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 mb-4">
            <Sparkles className="h-4 w-4 text-neon-purple" />
            <span className="text-sm text-muted-foreground">Professional Portfolio Templates</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Launch Your
            <span className="text-gradient block">Dream Portfolio</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose from our curated collection of {portfolioTemplates.length}+ premium portfolio templates. 
            Customize, preview, and download in minutes. No coding experience required.
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto pt-6">
            <Input
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="glass bg-white/5 border-white/10 focus:border-brand-500"
            />
          </div>

          {/* Filter Categories */}
          <div className="flex flex-wrap justify-center gap-3 pt-6">
            {Object.entries(categoryIcons).map(([categoryId, IconComponent]) => {
              const categoryLabels = {
                'all': 'All Templates',
                'developer': 'Developer',
                'designer': 'Designer',
                'creative': 'Creative',
                'business': 'Business',
                'student': 'Student',
                'data-scientist': 'Data Science',
                'general': 'General'
              };

              return (
                <Button
                  key={categoryId}
                  variant={filterCategory === categoryId ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterCategory(categoryId)}
                  className={`glass transition-all duration-300 ${
                    filterCategory === categoryId ? 'glow' : 'hover:bg-white/10'
                  }`}
                >
                  <IconComponent className="h-4 w-4 mr-2" />
                  {categoryLabels[categoryId]}
                </Button>
              );
            })}
          </div>
        </section>

        {/* Results Count */}
        <div className="text-center mb-8">
          <p className="text-muted-foreground">
            Showing {filteredTemplates.length} of {portfolioTemplates.length} templates
            {searchQuery && ` for "${searchQuery}"`}
          </p>
        </div>

        {/* Templates Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className="glass border-white/10 hover:border-white/20 transition-all duration-300 group hover:scale-[1.02] hover:shadow-2xl">
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={template.thumbnail}
                  alt={template.name}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/api/placeholder/400/300';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-3 right-3">
                  <Badge variant="secondary" className="bg-black/50 text-white border-0">
                    {template.category}
                  </Badge>
                </div>
              </div>
              
              <CardHeader className="pb-3">
                <CardTitle className="text-gradient text-lg">{template.name}</CardTitle>
                <CardDescription className="line-clamp-2">{template.description}</CardDescription>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {template.tags.slice(0, 3).map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className={`text-xs ${getTagColor(tag)}`}
                    >
                      {tag}
                    </Badge>
                  ))}
                  {template.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs bg-gray-500/20 text-gray-300 border-gray-500/30">
                      +{template.tags.length - 3}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
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
                    variant="outline"
                    onClick={() => handleEdit(template)}
                    className="flex-1 glass hover:bg-white/10 hover:border-neon-purple/50 transition-all duration-300"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
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
        </section>

        {/* No Results */}
        {filteredTemplates.length === 0 && (
          <div className="text-center py-16">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold mb-2">No templates found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search or category filters
            </p>
            <Button 
              onClick={() => {
                setSearchQuery('');
                setFilterCategory('all');
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
            
            <Link to="/">
              <Button className="mt-4 glow">
                <Sparkles className="h-4 w-4 mr-2" />
                Get AI Recommendations
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PortfolioPresets;
