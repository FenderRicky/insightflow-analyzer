import React, { useState } from 'react';
import { Zap, Sparkles, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

const BoostModeCard = () => {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [improvements, setImprovements] = useState<string[]>([]);
  const { toast } = useToast();

  const optimizeProfile = async () => {
    setIsOptimizing(true);
    setProgress(0);
    setImprovements([]);

    const steps = [
      "Analyzing profile strength...",
      "Enhancing bio with AI...",
      "Optimizing project descriptions...",
      "Adding power keywords...",
      "Generating impact statements..."
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setProgress((i + 1) * 20);
      setImprovements(prev => [...prev, steps[i]]);
    }

    await new Promise(resolve => setTimeout(resolve, 500));
    setIsOptimizing(false);
    toast({
      title: "Profile Optimized! 🚀",
      description: "Your profile is now 87% more compelling. Ready to stand out!",
    });
  };

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 border-primary/30 backdrop-blur-xl">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative p-8 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium">
              <Zap className="w-4 h-4" />
              Boost Mode
            </div>
            <h3 className="text-2xl font-bold text-foreground">One-Click Profile Optimization</h3>
            <p className="text-muted-foreground">
              Let AI enhance your profile across all platforms instantly
            </p>
          </div>
          <Sparkles className="w-8 h-8 text-accent animate-pulse" />
        </div>

        {/* Progress */}
        {isOptimizing && (
          <div className="space-y-3">
            <Progress value={progress} className="h-2" />
            <div className="space-y-2">
              {improvements.map((improvement, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-sm text-muted-foreground animate-fade-in"
                >
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  {improvement}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Button */}
        <Button
          onClick={optimizeProfile}
          disabled={isOptimizing}
          size="lg"
          className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all text-white font-semibold shadow-lg"
        >
          {isOptimizing ? (
            <>
              <Sparkles className="w-5 h-5 mr-2 animate-spin" />
              Optimizing...
            </>
          ) : (
            <>
              <Zap className="w-5 h-5 mr-2" />
              Boost My Profile Now
            </>
          )}
        </Button>

        {/* Features */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
          <div className="space-y-1">
            <p className="text-sm font-medium">AI Rewrites</p>
            <p className="text-xs text-muted-foreground">Enhanced descriptions</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">Smart Keywords</p>
            <p className="text-xs text-muted-foreground">ATS optimization</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">Impact Focus</p>
            <p className="text-xs text-muted-foreground">Results-driven language</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">Instant Apply</p>
            <p className="text-xs text-muted-foreground">Cross-platform sync</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default BoostModeCard;