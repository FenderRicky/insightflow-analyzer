
import React, { useState, useEffect } from 'react';
import { Zap, Brain, Target, TrendingUp } from 'lucide-react';

interface LoadingScreenProps {
  isVisible: boolean;
}

const LoadingScreen = ({ isVisible }: LoadingScreenProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const loadingSteps = [
    "Calibrating Insight Engine...",
    "Benchmarking with Tier-1 Profiles...",
    "Analyzing Design Patterns...",
    "Evaluating Content Structure...",
    "Generating Intelligent Insights..."
  ];

  useEffect(() => {
    if (!isVisible) return;

    const stepInterval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % loadingSteps.length);
    }, 400);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 0;
        return prev + 2;
      });
    }, 40);

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
    };
  }, [isVisible, loadingSteps.length]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-xl">
      {/* Background animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-brand-500/30 rounded-full animate-float-up"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Main loading container */}
      <div className="relative text-center space-y-8 max-w-md mx-auto px-6">
        {/* Central AI brain visualization */}
        <div className="relative w-32 h-32 mx-auto">
          {/* Core pulse */}
          <div className="absolute inset-4 bg-gradient-to-r from-brand-500 to-neon-purple rounded-full animate-pulse-glow flex items-center justify-center">
            <Brain className="h-12 w-12 text-white animate-float-up" />
          </div>
          
          {/* Orbiting elements */}
          <div className="absolute inset-0">
            <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-neon-blue rounded-full animate-orbit" style={{ transformOrigin: '-40px 0' }} />
            <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-neon-purple rounded-full animate-orbit-reverse" style={{ transformOrigin: '-60px 0' }} />
            <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-brand-400 rounded-full animate-orbit" style={{ transformOrigin: '-80px 0', animationDuration: '15s' }} />
          </div>

          {/* Data flow streams */}
          <div className="absolute inset-0">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-0.5 h-8 bg-gradient-to-t from-transparent via-brand-500 to-transparent animate-data-flow`}
                style={{
                  top: '50%',
                  left: '50%',
                  transform: `rotate(${i * 90}deg) translateY(-60px)`,
                  animationDelay: `${i * 0.5}s`
                }}
              />
            ))}
          </div>
        </div>

        {/* Loading text with glow effect */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gradient animate-text-glow">
            InsightFlow AI
          </h2>
          
          <div className="min-h-[60px] flex items-center justify-center">
            <p className="text-lg text-muted-foreground animate-fade-in" key={currentStep}>
              {loadingSteps[currentStep]}
            </p>
          </div>
        </div>

        {/* Progress visualization */}
        <div className="space-y-4">
          {/* Progress bar */}
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-brand-500 to-neon-purple rounded-full transition-all duration-300 animate-gradient-shift"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Performance indicators */}
          <div className="flex justify-center gap-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Zap className="h-3 w-3 text-yellow-400" />
              <span>Speed: 2.1s</span>
            </div>
            <div className="flex items-center gap-1">
              <Target className="h-3 w-3 text-green-400" />
              <span>Accuracy: 98%</span>
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-blue-400" />
              <span>Processing...</span>
            </div>
          </div>
        </div>

        {/* Floating insight bubbles */}
        <div className="absolute -top-20 -left-20 w-full h-full pointer-events-none">
          {['Design', 'SEO', 'UX', 'Code'].map((label, i) => (
            <div
              key={label}
              className="absolute w-16 h-16 glass rounded-full flex items-center justify-center text-xs font-medium animate-float-up opacity-60"
              style={{
                left: `${20 + i * 25}%`,
                top: `${10 + (i % 2) * 80}%`,
                animationDelay: `${i * 0.8}s`
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
