
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Github, Linkedin, Globe, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ErrorTracker } from '@/utils/errorTracking';

interface CoreAnalysisInputProps {
  onAnalyze: (data: { url: string; type: string }) => Promise<void>;
  isLoading: boolean;
}

const CoreAnalysisInput = ({ onAnalyze, isLoading }: CoreAnalysisInputProps) => {
  const [url, setUrl] = useState('');
  const [type, setType] = useState('');
  const { toast } = useToast();

  const detectUrlType = (inputUrl: string) => {
    if (inputUrl.includes('github.com')) return 'github';
    if (inputUrl.includes('linkedin.com')) return 'linkedin';
    return 'portfolio';
  };

  const validateUrl = (inputUrl: string) => {
    try {
      new URL(inputUrl);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      toast({
        title: "URL Required",
        description: "Please enter a GitHub, LinkedIn, or portfolio URL",
        variant: "destructive"
      });
      return;
    }

    if (!validateUrl(url)) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL starting with http:// or https://",
        variant: "destructive"
      });
      return;
    }

    const detectedType = type || detectUrlType(url);
    
    try {
      await onAnalyze({ url: url.trim(), type: detectedType });
    } catch (error) {
      console.error('Analysis failed:', error);
      ErrorTracker.track(error as Error, { url, type: detectedType });
      
      toast({
        title: "Analysis Error",
        description: "Analysis temporarily unavailable. Please try again or contact support.",
        variant: "destructive"
      });
    }
  };

  const exampleUrls = [
    { type: 'github', url: 'https://github.com/username', icon: Github },
    { type: 'linkedin', url: 'https://linkedin.com/in/username', icon: Linkedin },
    { type: 'portfolio', url: 'https://yourportfolio.com', icon: Globe }
  ];

  return (
    <Card className="glass border-border/20 hover:border-brand-500/30 transition-all duration-500">
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="url" className="block text-sm font-medium mb-3 text-foreground">
                Professional Profile URL
              </label>
              <Input
                id="url"
                type="url"
                placeholder="https://github.com/username or https://linkedin.com/in/username"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="h-12 text-base"
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="type" className="block text-sm font-medium mb-3 text-foreground">
                Profile Type (Auto-detected)
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
          </div>

          <Button
            type="submit"
            disabled={isLoading || !url.trim()}
            className="w-full h-12 text-base bg-gradient-to-r from-brand-500 to-neon-purple hover:from-brand-600 hover:to-neon-purple/90 transition-all duration-300 hover:scale-105"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3" />
                Analyzing with Intelligence...
              </>
            ) : (
              <>
                <Zap className="h-5 w-5 mr-3" />
                Start Smart Analysis
              </>
            )}
          </Button>

          {/* Example URLs */}
          <div className="pt-6 border-t border-border/50">
            <p className="text-sm text-muted-foreground mb-4 text-center">
              Try these example formats:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {exampleUrls.map((example, index) => {
                const IconComponent = example.icon;
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setUrl(example.url)}
                    className="p-3 text-left bg-background/50 hover:bg-brand-500/10 border border-border/50 hover:border-brand-500/30 rounded-lg transition-all duration-200 group"
                    disabled={isLoading}
                  >
                    <div className="flex items-center gap-2">
                      <IconComponent className="h-4 w-4 text-muted-foreground group-hover:text-brand-500 transition-colors" />
                      <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                        {example.url}
                      </span>
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
