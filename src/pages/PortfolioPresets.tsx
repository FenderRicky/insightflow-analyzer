
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, Edit, Eye, Sparkles, Code, Palette, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ThemeToggle from '@/components/ThemeToggle';
import TemplatePreview from '@/components/TemplatePreview';
import CodeEditor from '@/components/CodeEditor';
import { portfolioTemplates } from '@/data/portfolioTemplates';

interface Template {
  id: string;
  name: string;
  description: string;
  tags: string[];
  thumbnail: string;
  htmlCode: string;
  cssCode: string;
  jsCode: string;
  category: 'developer' | 'designer' | 'data-scientist' | 'general';
}

const PortfolioPresets = () => {
  const [isDark, setIsDark] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'preview' | 'editor'>('grid');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  useEffect(() => {
    const root = document.documentElement;
    root.className = isDark ? 'dark' : 'light';
  }, [isDark]);

  const filteredTemplates = portfolioTemplates.filter(template => 
    filterCategory === 'all' || template.category === filterCategory
  );

  const handlePreview = (template: Template) => {
    setSelectedTemplate(template);
    setViewMode('preview');
  };

  const handleEdit = (template: Template) => {
    setSelectedTemplate(template);
    setViewMode('editor');
  };

  const handleDownload = (template: Template) => {
    // Create zip file with template files
    const files = {
      'index.html': template.htmlCode,
      'styles.css': template.cssCode,
      'script.js': template.jsCode
    };
    
    // Simple download implementation
    const blob = new Blob([template.htmlCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${template.name.toLowerCase().replace(/\s+/g, '-')}-template.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getTagColor = (tag: string) => {
    const colors = {
      'Beginner': 'bg-green-500/20 text-green-300 border-green-500/30',
      'Advanced': 'bg-red-500/20 text-red-300 border-red-500/30',
      'Multi-page': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      'One-pager': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      'Dark Theme': 'bg-gray-500/20 text-gray-300 border-gray-500/30',
      'Light Theme': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
      'Minimalist': 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
      'Creative': 'bg-pink-500/20 text-pink-300 border-pink-500/30'
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
            Choose from our curated collection of premium portfolio templates. 
            Customize, preview, and download in minutes. No coding experience required.
          </p>

          {/* Filter Categories */}
          <div className="flex flex-wrap justify-center gap-3 pt-6">
            {[
              { id: 'all', label: 'All Templates', icon: Palette },
              { id: 'developer', label: 'Developer', icon: Code },
              { id: 'designer', label: 'Designer', icon: Palette },
              { id: 'data-scientist', label: 'Data Science', icon: Zap },
              { id: 'general', label: 'General', icon: Sparkles }
            ].map((category) => (
              <Button
                key={category.id}
                variant={filterCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterCategory(category.id)}
                className={`glass transition-all duration-300 ${
                  filterCategory === category.id ? 'glow' : 'hover:bg-white/10'
                }`}
              >
                <category.icon className="h-4 w-4 mr-2" />
                {category.label}
              </Button>
            ))}
          </div>
        </section>

        {/* Templates Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className="glass border-white/10 hover:border-white/20 transition-all duration-300 group hover:scale-105">
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={template.thumbnail}
                  alt={template.name}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <CardHeader>
                <CardTitle className="text-gradient">{template.name}</CardTitle>
                <CardDescription>{template.description}</CardDescription>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {template.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-2 py-1 text-xs rounded-full border ${getTagColor(tag)}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handlePreview(template)}
                    className="flex-1 glass hover:bg-white/10"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(template)}
                    className="flex-1 glass hover:bg-white/10"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDownload(template)}
                    className="glass hover:bg-white/10"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

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
