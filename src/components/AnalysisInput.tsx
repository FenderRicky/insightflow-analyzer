
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe, User, Code, Link, AlertCircle, CheckCircle } from 'lucide-react';
import { validateUrl } from '../utils/analysisEngine';
import ErrorDisplay from './ErrorDisplay';

interface AnalysisInputProps {
  onAnalyze: (data: { type: string; input: string; inputType: string }) => void;
  isLoading: boolean;
}

const AnalysisInput = ({ onAnalyze, isLoading }: AnalysisInputProps) => {
  const [portfolioInput, setPortfolioInput] = useState('');
  const [portfolioInputType, setPortfolioInputType] = useState('url');
  const [linkedinInput, setLinkedinInput] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [validationSuccess, setValidationSuccess] = useState<string | null>(null);

  const handleInputChange = (value: string, type: 'portfolio' | 'linkedin') => {
    if (type === 'portfolio') {
      setPortfolioInput(value);
    } else {
      setLinkedinInput(value);
    }
    
    // Clear previous validation messages
    setValidationError(null);
    setValidationSuccess(null);
    
    // Real-time validation for URLs
    if (value.trim() && (portfolioInputType === 'url' || type === 'linkedin')) {
      const validation = validateUrl(value.trim());
      if (!validation.isValid) {
        setValidationError(validation.error);
      } else {
        setValidationSuccess(`✅ Valid ${validation.type} URL detected`);
      }
    }
  };

  const handlePortfolioAnalysis = () => {
    const input = portfolioInput.trim();
    if (!input) return;
    
    if (portfolioInputType === 'url') {
      const validation = validateUrl(input);
      if (!validation.isValid) {
        setValidationError(validation.error);
        return;
      }
    }
    
    onAnalyze({
      type: 'portfolio',
      input,
      inputType: portfolioInputType
    });
  };

  const handleLinkedInAnalysis = () => {
    const input = linkedinInput.trim();
    if (!input) return;
    
    const validation = validateUrl(input);
    if (!validation.isValid) {
      setValidationError(validation.error);
      return;
    }
    
    onAnalyze({
      type: 'linkedin',
      input,
      inputType: 'url'
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Enhanced Error Display */}
      {validationError && (
        <ErrorDisplay 
          error={validationError}
          type="url"
          onRetry={() => {
            setValidationError(null);
            setValidationSuccess(null);
          }}
        />
      )}

      {/* Success Message */}
      {validationSuccess && !validationError && (
        <Card className="glass border-green-500/20 bg-green-500/5">
          <CardContent className="flex items-center gap-3 py-4">
            <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
            <span className="text-green-300 text-sm">{validationSuccess}</span>
          </CardContent>
        </Card>
      )}

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
              <CardTitle className="text-gradient">Advanced Portfolio Analysis</CardTitle>
              <CardDescription>
                AI-powered analysis of design, code quality, SEO, performance, and user experience
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

                <TabsContent value="url" className="mt-4 space-y-3">
                  <Input
                    placeholder="https://your-portfolio.com"
                    value={portfolioInput}
                    onChange={(e) => handleInputChange(e.target.value, 'portfolio')}
                    className={`glass bg-white/5 border-white/10 focus:border-brand-500 ${
                      validationError ? 'border-red-500/50' : validationSuccess ? 'border-green-500/50' : ''
                    }`}
                  />
                  <div className="text-xs text-muted-foreground">
                    💡 <strong>Tip:</strong> Make sure your portfolio is publicly accessible and includes your best projects
                  </div>
                </TabsContent>

                <TabsContent value="code" className="mt-4 space-y-3">
                  <Textarea
                    placeholder="Paste your HTML/CSS/JS code here..."
                    value={portfolioInput}
                    onChange={(e) => handleInputChange(e.target.value, 'portfolio')}
                    rows={8}
                    className="glass bg-white/5 border-white/10 focus:border-brand-500 font-mono text-sm"
                  />
                  <div className="text-xs text-muted-foreground">
                    💡 <strong>Tip:</strong> Include your main HTML structure and key CSS/JS for best analysis results
                  </div>
                </TabsContent>
              </Tabs>

              <Button
                onClick={handlePortfolioAnalysis}
                disabled={!portfolioInput.trim() || isLoading || !!validationError}
                className="w-full bg-gradient-to-r from-brand-500 to-neon-purple hover:from-brand-600 hover:to-neon-purple/90 transition-all duration-300 glow"
              >
                {isLoading ? 'Analyzing Portfolio...' : 'Analyze Portfolio'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="linkedin" className="mt-6">
          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle className="text-gradient">LinkedIn Profile Optimization</CardTitle>
              <CardDescription>
                Advanced LinkedIn analysis with tier-1 company benchmarking and personalized improvement strategies
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Input
                  placeholder="https://linkedin.com/in/your-profile"
                  value={linkedinInput}
                  onChange={(e) => handleInputChange(e.target.value, 'linkedin')}
                  className={`glass bg-white/5 border-white/10 focus:border-brand-500 ${
                    validationError ? 'border-red-500/50' : validationSuccess ? 'border-green-500/50' : ''
                  }`}
                />
                <div className="text-xs text-muted-foreground">
                  💡 <strong>Tip:</strong> Make sure your LinkedIn profile is set to public for comprehensive analysis
                </div>
              </div>

              {/* LinkedIn Pro Tips */}
              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <h4 className="text-sm font-medium text-blue-300 mb-2">🚀 Analysis Includes:</h4>
                <ul className="text-xs text-blue-200 space-y-1">
                  <li>• Headline optimization vs. top performers</li>
                  <li>• Skills & endorsements strategy</li>
                  <li>• Experience section impact scoring</li>
                  <li>• Keyword density analysis</li>
                  <li>• Network quality assessment</li>
                </ul>
              </div>

              <Button
                onClick={handleLinkedInAnalysis}
                disabled={!linkedinInput.trim() || isLoading || !!validationError}
                className="w-full bg-gradient-to-r from-neon-blue to-neon-cyan hover:from-neon-blue/90 hover:to-neon-cyan/90 transition-all duration-300 glow"
              >
                {isLoading ? 'Analyzing LinkedIn Profile...' : 'Analyze LinkedIn Profile'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalysisInput;
