
import React from 'react';
import { Brain } from 'lucide-react';

interface FuturisticLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  animate?: boolean;
  className?: string;
}

const FuturisticLogo = ({ size = 'md', showText = true, animate = true, className = '' }: FuturisticLogoProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-16 h-16'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-3xl'
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Futuristic Logo Icon */}
      <div className="relative group">
        {/* Outer glow ring */}
        <div className={`absolute inset-0 ${sizeClasses[size]} rounded-xl bg-gradient-to-br from-cyan-400/30 via-blue-500/30 to-purple-600/30 blur-sm ${animate ? 'group-hover:blur-md transition-all duration-500' : ''}`} />
        
        {/* Main logo container */}
        <div className={`relative ${sizeClasses[size]} rounded-xl bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 border border-cyan-400/30 flex items-center justify-center overflow-hidden shadow-2xl ${animate ? 'group-hover:scale-105 transition-all duration-300' : ''}`}>
          {/* Animated background pattern */}
          <div className={`absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-transparent to-purple-500/10 ${animate ? 'animate-pulse' : ''}`} />
          
          {/* Neural network pattern */}
          <div className="absolute inset-0 opacity-20">
            <svg viewBox="0 0 40 40" className="w-full h-full">
              <defs>
                <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgb(34, 211, 238)" />
                  <stop offset="100%" stopColor="rgb(147, 51, 234)" />
                </linearGradient>
              </defs>
              <g stroke="url(#neuralGradient)" strokeWidth="0.5" fill="none">
                <circle cx="10" cy="10" r="1" fill="url(#neuralGradient)" opacity="0.6" />
                <circle cx="30" cy="15" r="1" fill="url(#neuralGradient)" opacity="0.8" />
                <circle cx="20" cy="30" r="1" fill="url(#neuralGradient)" opacity="0.7" />
                <line x1="10" y1="10" x2="30" y2="15" opacity="0.3" />
                <line x1="30" y1="15" x2="20" y2="30" opacity="0.4" />
                <line x1="10" y1="10" x2="20" y2="30" opacity="0.2" />
              </g>
            </svg>
          </div>
          
          {/* Main brain icon */}
          <Brain className={`${size === 'sm' ? 'h-4 w-4' : size === 'md' ? 'h-5 w-5' : 'h-8 w-8'} text-transparent bg-gradient-to-br from-cyan-300 via-blue-400 to-purple-400 bg-clip-text relative z-10`} style={{
            filter: 'drop-shadow(0 0 8px rgba(34, 211, 238, 0.5))'
          }} />
          
          {/* Subtle animated particles */}
          {animate && (
            <>
              <div className="absolute top-2 right-2 w-0.5 h-0.5 bg-cyan-400 rounded-full animate-ping" style={{ animationDelay: '0s' }} />
              <div className="absolute bottom-2 left-2 w-0.5 h-0.5 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
              <div className="absolute bottom-3 right-3 w-0.5 h-0.5 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '2s' }} />
            </>
          )}
        </div>
      </div>

      {/* Brand Text */}
      {showText && (
        <div className="flex flex-col">
          <h1 className={`${textSizeClasses[size]} font-bold leading-none tracking-tight`}>
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              InsightFlow
            </span>
          </h1>
          {size !== 'sm' && (
            <p className="text-xs text-slate-400 leading-none mt-0.5 font-medium tracking-wide">
              AI Intelligence
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default FuturisticLogo;
