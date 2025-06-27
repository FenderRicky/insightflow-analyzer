
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw, ExternalLink, HelpCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ErrorDisplayProps {
  error: string;
  type?: 'url' | 'network' | 'validation' | 'generic';
  onRetry?: () => void;
  suggestions?: string[];
}

const ErrorDisplay = ({ error, type = 'generic', onRetry, suggestions = [] }: ErrorDisplayProps) => {
  const getErrorIcon = () => {
    switch (type) {
      case 'url':
        return <ExternalLink className="h-8 w-8 text-red-400" />;
      case 'network':
        return <RefreshCw className="h-8 w-8 text-yellow-400" />;
      case 'validation':
        return <HelpCircle className="h-8 w-8 text-blue-400" />;
      default:
        return <AlertCircle className="h-8 w-8 text-red-400" />;
    }
  };

  const getErrorTitle = () => {
    switch (type) {
      case 'url':
        return 'Invalid URL Detected';
      case 'network':
        return 'Connection Error';
      case 'validation':
        return 'Validation Failed';
      default:
        return 'Analysis Error';
    }
  };

  const getDefaultSuggestions = () => {
    switch (type) {
      case 'url':
        return [
          'Ensure your URL starts with https:// or http://',
          'Check for typos in the URL',
          'Make sure the profile/repository is public',
          'Try accessing the URL in your browser first'
        ];
      case 'network':
        return [
          'Check your internet connection',
          'Try again in a few moments',
          'The target website might be temporarily down'
        ];
      case 'validation':
        return [
          'Verify all required fields are filled',
          'Check that your input format is correct',
          'Review the example formats provided'
        ];
      default:
        return [
          'Try refreshing the page',
          'Check your input and try again',
          'Contact support if the problem persists'
        ];
    }
  };

  const allSuggestions = suggestions.length > 0 ? suggestions : getDefaultSuggestions();

  return (
    <Card className="glass border-red-500/20 bg-red-500/5 max-w-2xl mx-auto">
      <CardHeader className="text-center pb-4">
        <div className="flex justify-center mb-4">
          {getErrorIcon()}
        </div>
        <CardTitle className="text-xl text-red-300">
          {getErrorTitle()}
        </CardTitle>
        <CardDescription className="text-red-200/80 text-base">
          {error}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Error Badge */}
        <div className="flex justify-center">
          <Badge variant="destructive" className="bg-red-500/20 text-red-300 border-red-500/30">
            {type.toUpperCase()} ERROR
          </Badge>
        </div>

        {/* Suggestions */}
        {allSuggestions.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium text-white flex items-center gap-2">
              <HelpCircle className="h-4 w-4 text-blue-400" />
              How to Fix This:
            </h4>
            <ul className="space-y-2">
              {allSuggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Common URL Examples */}
        {type === 'url' && (
          <div className="space-y-3 p-4 bg-white/5 rounded-lg border border-white/10">
            <h4 className="font-medium text-white">✅ Valid URL Examples:</h4>
            <div className="space-y-2 text-sm">
              <div className="font-mono text-green-300 bg-green-500/10 p-2 rounded">
                https://linkedin.com/in/johndoe
              </div>
              <div className="font-mono text-blue-300 bg-blue-500/10 p-2 rounded">
                https://github.com/username/repository
              </div>
              <div className="font-mono text-purple-300 bg-purple-500/10 p-2 rounded">
                https://yourportfolio.com
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {onRetry && (
            <Button 
              onClick={onRetry}
              variant="outline"
              className="glass border-white/20 hover:border-white/40"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          )}
          <Button 
            variant="outline"
            className="glass border-white/20 hover:border-white/40"
            onClick={() => window.location.reload()}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Page
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ErrorDisplay;
