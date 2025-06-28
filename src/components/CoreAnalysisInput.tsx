
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe, Github, Linkedin, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';

interface CoreAnalysisInputProps {
  onAnalyze: (data: { url: string; type: string }) => Promise<void>;
  isLoading: boolean;
}

const CoreAnalysisInput = ({ onAnalyze, isLoading }: CoreAnalysisInputProps) => {
  const [url, setUrl] = useState('');
  const [validationMessage, setValidationMessage] = useState<{ type: 'error' | 'success'; message: string } | null>(null);

  const detectUrlType = (inputUrl: string): string => {
    const urlLower = inputUrl.toLowerCase();
    if (urlLower.includes('github.com')) return 'github';
    if (urlLower.includes('linkedin.com')) return 'linkedin';
    return 'portfolio';
  };

  const validateAndAnalyze = async () => {
    const trimmedUrl = url.trim();
    
    if (!trimmedUrl) {
      setValidationMessage({ type: 'error', message: 'Please enter a URL to analyze' });
      return;
    }

    try {
      new URL(trimmedUrl);
    } catch {
      setValidationMessage({ type: 'error', message: 'Please enter a valid URL (include http:// or https://)' });
      return;
    }

    const urlType = detectUrlType(trimmedUrl);
    setValidationMessage({ type: 'success', message: `Analyzing ${urlType} profile...` });
    
    try {
      await onAnalyze({ url: trimmedUrl, type: urlType });
    } catch (error) {
      setValidationMessage({ 
        type: 'error', 
        message: error instanceof Error ? error.message : 'Analysis failed. Please try again.' 
      });
    }
  };

  const handleUrlChange = (value: string) => {
    setUrl(value);
    setValidationMessage(null);
    
    if (value.trim()) {
      try {
        new URL(value.trim());
        const type = detectUrlType(value);
        setValidationMessage({ 
          type: 'success', 
          message: `Ready to analyze ${type} profile` 
        });
      } catch {
        // Don't show error while typing
      }
    }
  };

  const getTypeIcon = () => {
    const type = detectUrlType(url);
    switch (type) {
      case 'github': return <Github className="h-4 w-4" />;
      case 'linkedin': return <Linkedin className="h-4 w-4" />;
      default: return <Globe className="h-4 w-4" />;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="glass border-white/10">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-gradient flex items-center justify-center gap-2">
            AI Profile Analyzer
          </CardTitle>
          <CardDescription className="text-lg">
            Get instant AI-powered analysis of your GitHub, LinkedIn, or Portfolio
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Input
                  placeholder="Paste your GitHub, LinkedIn, or Portfolio URL here..."
                  value={url}
                  onChange={(e) => handleUrlChange(e.target.value)}
                  className="glass bg-white/5 border-white/10 focus:border-brand-500 pr-12 text-white placeholder:text-gray-400"
                  disabled={isLoading}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  {getTypeIcon()}
                </div>
              </div>
              <Button
                onClick={validateAndAnalyze}
                disabled={!url.trim() || isLoading}
                className="bg-gradient-to-r from-brand-500 to-neon-purple hover:from-brand-600 hover:to-neon-purple/90 px-8"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  'Analyze Now'
                )}
              </Button>
            </div>

            {validationMessage && (
              <div className={`flex items-center gap-2 p-3 rounded-lg ${
                validationMessage.type === 'error' 
                  ? 'bg-red-500/10 border border-red-500/20 text-red-300' 
                  : 'bg-green-500/10 border border-green-500/20 text-green-300'
              }`}>
                {validationMessage.type === 'error' ? (
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                ) : (
                  <CheckCircle className="h-4 w-4 flex-shrink-0" />
                )}
                <span className="text-sm">{validationMessage.message}</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            {[
              { icon: Github, label: 'GitHub Profiles', desc: 'Repository analysis & code quality' },
              { icon: Linkedin, label: 'LinkedIn Profiles', desc: 'Professional branding & optimization' },
              { icon: Globe, label: 'Portfolio Sites', desc: 'Design, UX & technical implementation' }
            ].map((item, index) => (
              <div key={index} className="p-3 rounded-lg bg-white/5 border border-white/10 text-center">
                <item.icon className="h-6 w-6 mx-auto mb-2 text-brand-500" />
                <h4 className="font-medium text-sm text-white">{item.label}</h4>
                <p className="text-xs text-gray-400 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CoreAnalysisInput;
