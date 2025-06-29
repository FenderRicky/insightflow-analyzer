
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
      {/* Simplified background for mobile performance */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background/80" />
      
      {/* Header - Mobile optimized */}
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
        {/* Hero Section - Mobile optimized */}
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
            Customize, preview, and download in minutes. No coding experience required.
          </p>

          {/* Mobile-optimized Search Bar */}
          <div className="max-w-md mx-auto pt-4 sm:pt-6 px-4">
            <Input
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="glass bg-white/5 border-white/10 focus:border-brand-500 text-sm"
            />
          </div>

          {/* Mobile-optimized Filter Categories */}
          <div className="pt-4 sm:pt-6 px-2">
            {/* Mobile: Show first 4 categories, then "More" dropdown for others */}
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap sm:justify-center gap-2 sm:gap-3">
              {Object.entries(categoryIcons).slice(0, 4).map(([categoryId, IconComponent]) => {
                const categoryLabels = {
                  'all': 'All',
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
                    className={`glass transition-all duration-300 text-xs sm:text-sm ${
                      filterCategory === categoryId ? 'glow' : 'hover:bg-white/10'
                    }`}
                  >
                    <IconComponent className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    {categoryLabels[categoryId]}
                  </Button>
                );
              })}
            </div>
            
            {/* Show remaining categories on larger screens */}
            <div className="hidden sm:flex flex-wrap justify-center gap-3 mt-3">
              {Object.entries(categoryIcons).slice(4).map(([categoryId, IconComponent]) => {
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
          </div>
        </section>

        {/* Results Count */}
        <div className="text-center mb-6 sm:mb-8">
          <p className="text-muted-foreground text-sm">
            Showing {filteredTemplates.length} of {portfolioTemplates.length} templates
            {searchQuery && ` for "${searchQuery}"`}
          </p>
        </div>

        {/* Mobile-optimized Templates Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className="glass border-white/10 hover:border-white/20 transition-all duration-300 group hover:scale-[1.02] hover:shadow-2xl">
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={template.thumbnail}
                  alt={template.name}
                  className="w-full h-40 sm:h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                    e.currentTarget.src = '/api/placeholder/400/300';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
                  <Badge variant="secondary" className="bg-black/50 text-white border-0 text-xs">
                    {template.category}
                  </Badge>
                </div>
              </div>
              
              <CardHeader className="pb-2 sm:pb-3 p-3 sm:p-6">
                <CardTitle className="text-gradient text-base sm:text-lg">{template.name}</CardTitle>
                <CardDescription className="line-clamp-2 text-sm">{template.description}</CardDescription>
                
                {/* Mobile-optimized Tags */}
                <div className="flex flex-wrap gap-1 sm:gap-2 pt-2">
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
              
              <CardContent className="pt-0 p-3 sm:p-6 sm:pt-0">
                {/* Mobile-optimized buttons */}
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handlePreview(template)}
                    className="flex-1 glass hover:bg-white/10 hover:border-brand-400 transition-all duration-300 text-xs sm:text-sm"
                  >
                    <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    Preview
                  </Button>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(template)}
                      className="flex-1 glass hover:bg-white/10 hover:border-neon-purple/50 transition-all duration-300 text-xs sm:text-sm"
                    >
                      <Edit className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                      <span className="hidden sm:inline">Edit</span>
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDownload(template)}
                      className="glass hover:bg-white/10 hover:text-green-400 transition-all duration-300 px-2 sm:px-3"
                      title="Download HTML file"
                    >
                      <Download className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* No Results */}
        {filteredTemplates.length === 0 && (
          <div className="text-center py-12 sm:py-16 px-4">
            <div className="text-3xl sm:text-4xl mb-4">🔍</div>
            <h3 className="text-xl sm:text-2xl font-bold mb-2">No templates found</h3>
            <p className="text-muted-foreground mb-4 sm:mb-6">
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

        {/* Mobile-optimized AI Recommendations Section */}
        <section className="mt-12 sm:mt-16 p-4 sm:p-8 rounded-xl glass border border-white/10">
          <div className="text-center space-y-3 sm:space-y-4">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-gradient-to-r from-brand-500/20 to-neon-purple/20 border border-white/10">
              <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-neon-purple" />
              <span className="text-xs sm:text-sm font-medium">AI-Powered Recommendations</span>
            </div>
            
            <h3 className="text-xl sm:text-2xl font-bold text-gradient">Perfect Templates for Your Career</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
              Get personalized template recommendations based on your LinkedIn profile, 
              GitHub activity, and career goals. Let AI find the perfect starting point for your portfolio.
            </p>
            
            <Link to="/">
              <Button className="mt-3 sm:mt-4 glow">
                <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
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
