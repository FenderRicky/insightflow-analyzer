
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Clock, Star, Code, Palette, Briefcase, Users, Search, Filter, TrendingUp } from 'lucide-react';
import { enhancedPortfolioTemplates, getTemplatesByCategory, getPopularTemplates, searchTemplates, type PortfolioTemplate } from '../data/enhancedPortfolioTemplates';

interface EnhancedTemplateShowcaseProps {
  onSelectTemplate: (template: PortfolioTemplate) => void;
}

const EnhancedTemplateShowcase = ({ onSelectTemplate }: EnhancedTemplateShowcaseProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [sortBy, setSortBy] = useState('popularity');

  const categories = ['all', 'Developer', 'Designer', 'Leadership', 'Entrepreneur', 'Data Science', 'Mobile', 'Gaming', 'DevOps'];
  const difficulties = ['all', 'Beginner', 'Intermediate', 'Advanced'];

  const getFilteredTemplates = () => {
    let filtered = enhancedPortfolioTemplates;

    // Search filter
    if (searchQuery.trim()) {
      filtered = searchTemplates(searchQuery);
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(template => template.category === selectedCategory);
    }

    // Difficulty filter
    if (difficultyFilter !== 'all') {
      filtered = filtered.filter(template => template.difficulty === difficultyFilter);
    }

    // Sort
    switch (sortBy) {
      case 'popularity':
        filtered = filtered.sort((a, b) => b.popularity - a.popularity);
        break;
      case 'difficulty':
        const difficultyOrder = { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 3 };
        filtered = filtered.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]);
        break;
      case 'time':
        filtered = filtered.sort((a, b) => parseInt(a.estimatedTime) - parseInt(b.estimatedTime));
        break;
      default:
        break;
    }

    return filtered;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'Intermediate':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'Advanced':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const popularTemplates = getPopularTemplates(3);
  const filteredTemplates = getFilteredTemplates();

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold text-gradient">
          Professional Portfolio Templates
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Choose from our curated collection of industry-specific templates designed by professionals from top-tier companies
        </p>
      </div>

      {/* Popular Templates */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-yellow-400" />
          <h3 className="text-2xl font-bold text-gradient">Most Popular</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {popularTemplates.map((template) => (
            <Card key={template.id} className="glass border-white/10 hover:border-brand-500/50 transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-2 right-2 z-10">
                <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                  <Star className="h-3 w-3 mr-1" />
                  Popular
                </Badge>
              </div>
              <div className="h-40 bg-gradient-to-br from-brand-500/20 to-neon-purple/20 flex items-center justify-center">
                <div className="text-6xl opacity-50">{template.category === 'Developer' ? '💻' : template.category === 'Designer' ? '🎨' : '🚀'}</div>
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <Badge variant="outline" className={`text-xs ${getDifficultyColor(template.difficulty)}`}>
                    {template.difficulty}
                  </Badge>
                </div>
                <CardDescription className="text-sm line-clamp-2">
                  {template.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {template.estimatedTime}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {template.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button 
                    onClick={() => onSelectTemplate(template)}
                    className="w-full bg-gradient-to-r from-brand-500 to-neon-purple hover:from-brand-600 hover:to-neon-purple/90 transition-all duration-300"
                    size="sm"
                  >
                    Use Template
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-blue-400" />
          <h3 className="text-xl font-semibold">Filter & Search</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 glass bg-white/5 border-white/10 focus:border-brand-500"
            />
          </div>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="glass bg-white/5 border-white/10">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
            <SelectTrigger className="glass bg-white/5 border-white/10">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              {difficulties.map(difficulty => (
                <SelectItem key={difficulty} value={difficulty}>
                  {difficulty === 'all' ? 'All Levels' : difficulty}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="glass bg-white/5 border-white/10">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popularity">Popularity</SelectItem>
              <SelectItem value="difficulty">Difficulty</SelectItem>
              <SelectItem value="time">Time to Build</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Template Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">
            {filteredTemplates.length} Template{filteredTemplates.length !== 1 ? 's' : ''} Found
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className="glass border-white/10 hover:border-brand-500/50 transition-all duration-300 group">
              <div className="h-32 bg-gradient-to-br from-brand-500/10 to-neon-purple/10 flex items-center justify-center relative overflow-hidden">
                <div 
                  className="absolute inset-0 opacity-20"
                  style={{ backgroundColor: template.template.colors.primary }}
                />
                <div className="text-4xl opacity-70">
                  {template.category === 'Developer' ? '💻' :
                   template.category === 'Designer' ? '🎨' :
                   template.category === 'Leadership' ? '👔' :
                   template.category === 'Entrepreneur' ? '🚀' :
                   template.category === 'Data Science' ? '📊' :
                   template.category === 'Mobile' ? '📱' :
                   template.category === 'Gaming' ? '🎮' :
                   template.category === 'DevOps' ? '⚙️' : '💼'}
                </div>
              </div>
              
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-lg group-hover:text-brand-400 transition-colors">
                    {template.name}
                  </CardTitle>
                  <Badge variant="outline" className={`text-xs ${getDifficultyColor(template.difficulty)}`}>
                    {template.difficulty}
                  </Badge>
                </div>
                <CardDescription className="text-sm">
                  {template.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {template.estimatedTime}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3" />
                    {template.popularity}%
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-medium text-muted-foreground">Target Role:</div>
                  <Badge variant="secondary" className="text-xs">
                    {template.targetRole}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-medium text-muted-foreground">Tech Stack:</div>
                  <div className="flex flex-wrap gap-1">
                    {template.techStack.slice(0, 3).map((tech, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {template.techStack.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{template.techStack.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>

                <Button 
                  onClick={() => onSelectTemplate(template)}
                  className="w-full bg-gradient-to-r from-brand-500 to-neon-purple hover:from-brand-600 hover:to-neon-purple/90 transition-all duration-300"
                  size="sm"
                >
                  Use This Template
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <Card className="glass border-white/10 p-8 text-center">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No Templates Found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or browse all templates
            </p>
            <Button 
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setDifficultyFilter('all');
              }}
              variant="outline"
              className="glass border-white/20"
            >
              Clear Filters
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};

export default EnhancedTemplateShowcase;
