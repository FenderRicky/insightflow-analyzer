
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Wand2, Copy, CheckCircle, Sparkles, RefreshCw, Download, Share2 } from 'lucide-react';

interface PortfolioPolishProps {
  suggestions: {
    headline: string;
    projectDescriptions: string[];
    skillsOptimization: string[];
  };
}

const PortfolioPolish = ({ suggestions }: PortfolioPolishProps) => {
  const [activeTab, setActiveTab] = useState<'headline' | 'projects' | 'skills'>('headline');
  const [isPolishing, setIsPolishing] = useState(false);
  const [isGeneratingBadge, setIsGeneratingBadge] = useState(false);
  const [copiedItems, setCopiedItems] = useState<Set<string>>(new Set());
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleCopy = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItems(prev => new Set([...prev, id]));
      setTimeout(() => {
        setCopiedItems(prev => {
          const newSet = new Set(prev);
          newSet.delete(id);
          return newSet;
        });
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handlePolish = async () => {
    setIsPolishing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsPolishing(false);
  };

  const generateBadge = async () => {
    setIsGeneratingBadge(true);
    
    try {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      // Set canvas size
      canvas.width = 400;
      canvas.height = 200;
      
      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#3b82f6');
      gradient.addColorStop(0.5, '#8b5cf6');
      gradient.addColorStop(1, '#06b6d4');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Add text
      ctx.fillStyle = 'white';
      ctx.font = 'bold 24px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Profile Optimized', canvas.width / 2, 60);
      
      ctx.font = '16px Inter, sans-serif';
      ctx.fillText('InsightFlow Analysis Complete', canvas.width / 2, 90);
      
      ctx.font = 'bold 20px Inter, sans-serif';
      ctx.fillText('Tier 1 Ready', canvas.width / 2, 130);
      
      ctx.font = '12px Inter, sans-serif';
      ctx.fillText('www.insightflow.ai', canvas.width / 2, 170);
      
      // Download the badge
      const link = document.createElement('a');
      link.download = 'insightflow-badge.png';
      link.href = canvas.toDataURL();
      link.click();
      
    } catch (error) {
      console.error('Failed to generate badge:', error);
    } finally {
      setIsGeneratingBadge(false);
    }
  };

  return (
    <Card className="glass border-border/20 overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
            <Wand2 className="h-5 w-5 text-white" />
          </div>
          <span className="bg-gradient-to-r from-brand-500 to-neon-purple bg-clip-text text-transparent">
            Portfolio Polish
          </span>
          <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
            <Sparkles className="h-3 w-3 mr-1" />
            Ready to Apply
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Tab Navigation */}
        <div className="flex gap-2 p-1 rounded-lg bg-background/50 border border-border/50">
          {[
            { id: 'headline', label: 'Headline', icon: '✨' },
            { id: 'projects', label: 'Projects', icon: '🚀' },
            { id: 'skills', label: 'Skills', icon: '⚡' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-brand-500 to-neon-purple text-white shadow-lg'
                  : 'text-muted-foreground hover:text-foreground hover:bg-background/80'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Sections */}
        {activeTab === 'headline' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Optimized Professional Headline</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCopy(suggestions.headline, 'headline')}
                className="gap-2"
              >
                {copiedItems.has('headline') ? (
                  <>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy
                  </>
                )}
              </Button>
            </div>
            
            <div className="p-4 rounded-lg bg-gradient-to-r from-brand-500/10 to-neon-purple/10 border border-brand-500/20">
              <Textarea
                value={suggestions.headline}
                readOnly
                className="min-h-[80px] bg-transparent border-none resize-none text-base leading-relaxed"
              />
            </div>
            
            <div className="text-sm text-muted-foreground space-y-2">
              <p className="font-medium text-green-400">✅ What makes this headline effective:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Keywords optimized for ATS and recruiter searches</li>
                <li>Quantified value proposition and impact</li>
                <li>Professional tone aligned with industry standards</li>
                <li>Balances technical skills with business value</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Enhanced Project Descriptions</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={handlePolish}
                disabled={isPolishing}
                className="gap-2"
              >
                {isPolishing ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Polishing...
                  </>
                ) : (
                  <>
                    <Wand2 className="h-4 w-4" />
                    Generate More
                  </>
                )}
              </Button>
            </div>
            
            <div className="space-y-3">
              {suggestions.projectDescriptions.map((description, index) => (
                <div key={index} className="group p-4 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-200">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="text-sm font-medium text-blue-400 mb-2">Project {index + 1} Description:</div>
                      <p className="text-foreground/90 leading-relaxed">{description}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopy(description, `project-${index}`)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      {copiedItems.has(`project-${index}`) ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Skills Optimization Tips</h3>
            
            <div className="space-y-3">
              {suggestions.skillsOptimization.map((tip, index) => (
                <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold flex-shrink-0 mt-0.5">
                    {index + 1}
                  </div>
                  <p className="text-foreground/90 leading-relaxed">{tip}</p>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-lg bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-yellow-400">💡</span>
                <span className="font-medium text-yellow-400">Pro Tip:</span>
              </div>
              <p className="text-foreground/90 text-sm leading-relaxed">
                Reorder your skills to match the job description keywords. Put your strongest and most relevant skills first to catch recruiter attention immediately.
              </p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t border-border/50">
          <Button className="flex-1 bg-gradient-to-r from-brand-500 to-neon-purple hover:from-brand-600 hover:to-neon-purple/80">
            <Wand2 className="h-4 w-4 mr-2" />
            Apply All Suggestions
          </Button>
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={generateBadge}
            disabled={isGeneratingBadge}
          >
            {isGeneratingBadge ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Download className="h-4 w-4 mr-2" />
                Generate Badge
              </>
            )}
          </Button>
        </div>

        {/* Hidden canvas for badge generation */}
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </CardContent>
    </Card>
  );
};

export default PortfolioPolish;
