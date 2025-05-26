
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe, User, Code, Link } from 'lucide-react';

interface AnalysisInputProps {
  onAnalyze: (data: { type: string; input: string; inputType: string }) => void;
  isLoading: boolean;
}

const AnalysisInput = ({ onAnalyze, isLoading }: AnalysisInputProps) => {
  const [portfolioInput, setPortfolioInput] = useState('');
  const [portfolioInputType, setPortfolioInputType] = useState('url');
  const [linkedinInput, setLinkedinInput] = useState('');

  const handlePortfolioAnalysis = () => {
    if (portfolioInput.trim()) {
      onAnalyze({
        type: 'portfolio',
        input: portfolioInput.trim(),
        inputType: portfolioInputType
      });
    }
  };

  const handleLinkedInAnalysis = () => {
    if (linkedinInput.trim()) {
      onAnalyze({
        type: 'linkedin',
        input: linkedinInput.trim(),
        inputType: 'url'
      });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Tabs defaultValue="portfolio" className="w-full">
        <TabsList className="grid w-full grid-cols-2 glass">
          <TabsTrigger value="portfolio" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Portfolio Analysis
          </TabsTrigger>
          <TabsTrigger value="linkedin" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            LinkedIn Analysis
          </TabsTrigger>
        </TabsList>

        <TabsContent value="portfolio" className="mt-6">
          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle className="text-gradient">Portfolio Website Analysis</CardTitle>
              <CardDescription>
                Analyze portfolio design, code quality, SEO, and user experience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs value={portfolioInputType} onValueChange={setPortfolioInputType}>
                <TabsList className="glass">
                  <TabsTrigger value="url" className="flex items-center gap-2">
                    <Link className="h-3 w-3" />
                    URL
                  </TabsTrigger>
                  <TabsTrigger value="code" className="flex items-center gap-2">
                    <Code className="h-3 w-3" />
                    Code
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="url" className="mt-4">
                  <Input
                    placeholder="https://your-portfolio.com"
                    value={portfolioInput}
                    onChange={(e) => setPortfolioInput(e.target.value)}
                    className="glass bg-white/5 border-white/10 focus:border-brand-500"
                  />
                </TabsContent>

                <TabsContent value="code" className="mt-4">
                  <Textarea
                    placeholder="Paste your HTML/CSS/JS code here..."
                    value={portfolioInput}
                    onChange={(e) => setPortfolioInput(e.target.value)}
                    rows={8}
                    className="glass bg-white/5 border-white/10 focus:border-brand-500 font-mono text-sm"
                  />
                </TabsContent>
              </Tabs>

              <Button
                onClick={handlePortfolioAnalysis}
                disabled={!portfolioInput.trim() || isLoading}
                className="w-full bg-gradient-to-r from-brand-500 to-neon-purple hover:from-brand-600 hover:to-neon-purple/90 transition-all duration-300 glow"
              >
                {isLoading ? 'Analyzing...' : 'Analyze Portfolio'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="linkedin" className="mt-6">
          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle className="text-gradient">LinkedIn Profile Analysis</CardTitle>
              <CardDescription>
                Compare against top-tier company profiles and get tailored improvement tips
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="https://linkedin.com/in/your-profile"
                value={linkedinInput}
                onChange={(e) => setLinkedinInput(e.target.value)}
                className="glass bg-white/5 border-white/10 focus:border-brand-500"
              />

              <Button
                onClick={handleLinkedInAnalysis}
                disabled={!linkedinInput.trim() || isLoading}
                className="w-full bg-gradient-to-r from-neon-blue to-neon-cyan hover:from-neon-blue/90 hover:to-neon-cyan/90 transition-all duration-300 glow"
              >
                {isLoading ? 'Analyzing...' : 'Analyze LinkedIn Profile'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalysisInput;
