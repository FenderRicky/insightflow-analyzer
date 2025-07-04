
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Github, Linkedin, Globe, Zap, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { EnhancedAnalysisEngine } from '@/utils/enhancedAnalysisEngine';

interface CoreAnalysisInputProps {
  onAnalyze: (data: { url: string; type: string }) => Promise<void>;
  isLoading: boolean;
}

const CoreAnalysisInput = ({ onAnalyze, isLoading }: CoreAnalysisInputProps) => {
  const [url, setUrl] = useState('');
  const [type, setType] = useState('');
  const [targetCompany, setTargetCompany] = useState('');
  const [validationError, setValidationError] = useState('');
  const { toast } = useToast();

  const detectUrlType = (inputUrl: string) => {
    if (inputUrl.includes('github.com')) return 'github';
    if (inputUrl.includes('linkedin.com')) return 'linkedin';
    return 'portfolio';
  };

  const handleUrlChange = (value: string) => {
    setUrl(value);
    setValidationError('');
    
    // Auto-detect type
    if (value.trim()) {
      const detectedType = detectUrlType(value);
      setType(detectedType);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      setValidationError('Please enter a URL');
      toast({
        title: "URL Required",
        description: "Please enter a GitHub, LinkedIn, or portfolio URL",
        variant: "destructive"
      });
      return;
    }

    // Clear previous errors
    setValidationError('');

    try {
      // Use enhanced analysis engine for validation and analysis
      const result = await EnhancedAnalysisEngine.analyzeProfile(url.trim(), targetCompany);
      
      if (!result.isValid) {
        setValidationError(result.error || 'Invalid URL');
        toast({
          title: "Validation Error",
          description: result.error,
          variant: "destructive"
        });
        return;
      }

      // If validation passes, proceed with main analysis
      const detectedType = type || detectUrlType(url);
      await onAnalyze({ url: url.trim(), type: detectedType });
      
    } catch (error) {
      console.error('Analysis failed:', error);
      setValidationError('Analysis failed. Please try again.');
      
      toast({
        title: "Analysis Error",
        description: "Analysis temporarily unavailable. Please try again or contact support.",
        variant: "destructive"
      });
    }
  };

  const companies = [
    'Google', 'Meta', 'Amazon', 'Apple', 'Netflix', 'Tesla', 'Stripe', 'Uber', 'Airbnb', 'Microsoft'
  ];

  const exampleUrls = [
    { type: 'github', url: 'https://github.com/username', icon: Github, label: 'GitHub Profile' },
    { type: 'linkedin', url: 'https://linkedin.com/in/username', icon: Linkedin, label: 'LinkedIn Profile' },
    { type: 'portfolio', url: 'https://yourportfolio.com', icon: Globe, label: 'Portfolio Website' }
  ];

  return (
    <Card className="glass border-border/20 hover:border-brand-500/30 transition-all duration-500">
      <CardContent className="p-4 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {/* URL Input */}
            <div>
              <label htmlFor="url" className="block text-sm font-medium mb-3 text-foreground">
                Professional Profile URL
              </label>
              <div className="relative">
                <Input
                  id="url"
                  type="url"
                  placeholder="https://github.com/username or https://linkedin.com/in/username"
                  value={url}
                  onChange={(e) => handleUrlChange(e.target.value)}
                  className={`h-12 text-base pr-10 ${validationError ? 'border-red-500' : ''}`}
                  disabled={isLoading}
                />
                {validationError && (
                  <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-red-500" />
                )}
              </div>
              {validationError && (
                <p className="mt-2 text-sm text-red-500 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  {validationError}
                </p>
              )}
            </div>

            {/* Profile Type Selection */}
            <div>
              <label htmlFor="type" className="block text-sm font-medium mb-3 text-foreground">
                Profile Type <span className="text-muted-foreground">(Auto-detected)</span>
              </label>
              <Select value={type} onValueChange={setType} disabled={isLoading}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Auto-detect from URL" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="github">
                    <div className="flex items-center gap-2">
                      <Github className="h-4 w-4" />
                      GitHub Repository
                    </div>
                  </SelectItem>
                  <SelectItem value="linkedin">
                    <div className="flex items-center gap-2">
                      <Linkedin className="h-4 w-4" />
                      LinkedIn Profile
                    </div>
                  </SelectItem>
                  <SelectItem value="portfolio">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      Portfolio Website
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Target Company (Optional) */}
            <div>
              <label htmlFor="company" className="block text-sm font-medium mb-3 text-foreground">
                Target Company <span className="text-muted-foreground">(Optional - for personalized insights)</span>
              </label>
              <Select value={targetCompany} onValueChange={setTargetCompany} disabled={isLoading}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select target company for personalized analysis" />
                </SelectTrigger>
                <SelectContent>
                  {companies.map((company) => (
                    <SelectItem key={company.toLowerCase()} value={company.toLowerCase()}>
                      {company}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading || !url.trim() || !!validationError}
            className="w-full h-12 text-base bg-gradient-to-r from-brand-500 to-neon-purple hover:from-brand-600 hover:to-neon-purple/90 transition-all duration-300 hover:scale-105"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3" />
                Analyzing with Real AI...
              </>
            ) : (
              <>
                <Zap className="h-5 w-5 mr-3" />
                Start Enhanced Analysis
              </>
            )}
          </Button>

          {/* Example URLs - Mobile Optimized */}
          <div className="pt-6 border-t border-border/50">
            <p className="text-sm text-muted-foreground mb-4 text-center">
              Try these example formats:
            </p>
            <div className="space-y-2 sm:grid sm:grid-cols-1 lg:grid-cols-3 sm:gap-3 sm:space-y-0">
              {exampleUrls.map((example, index) => {
                const IconComponent = example.icon;
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => {
                      setUrl(example.url);
                      setType(example.type);
                    }}
                    className="w-full p-3 text-left bg-background/50 hover:bg-brand-500/10 border border-border/50 hover:border-brand-500/30 rounded-lg transition-all duration-200 group"
                    disabled={isLoading}
                  >
                    <div className="flex items-center gap-3">
                      <IconComponent className="h-4 w-4 text-muted-foreground group-hover:text-brand-500 transition-colors flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors truncate">
                          {example.label}
                        </div>
                        <div className="text-xs text-muted-foreground truncate">
                          {example.url}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CoreAnalysisInput;
