
import React, { useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

const ThemeToggle = ({ isDark, onToggle }: ThemeToggleProps) => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleToggle = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    
    // Create ultra-smooth transition overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: radial-gradient(circle at center, rgba(34, 211, 238, 0.12) 0%, rgba(147, 51, 234, 0.08) 50%, transparent 100%);
      backdrop-filter: blur(8px);
      z-index: 9999;
      opacity: 0;
      transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      pointer-events: none;
    `;
    
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';

    // Smooth fade in
    requestAnimationFrame(() => {
      overlay.style.opacity = '1';
    });

    // Enhanced smooth document transition
    setTimeout(() => {
      document.documentElement.style.cssText = `
        transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        transform: scale(0.99);
        filter: brightness(0.85) contrast(1.1);
      `;
    }, 100);

    // Theme change at optimal timing
    setTimeout(() => {
      onToggle();
    }, 300);

    // Restore document state
    setTimeout(() => {
      document.documentElement.style.cssText = `
        transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        transform: scale(1);
        filter: brightness(1) contrast(1);
      `;
    }, 400);

    // Complete transition and cleanup
    setTimeout(() => {
      overlay.style.opacity = '0';
      overlay.style.backdropFilter = 'blur(0px)';
      
      setTimeout(() => {
        if (document.body.contains(overlay)) {
          document.body.removeChild(overlay);
        }
        document.documentElement.style.cssText = '';
        document.body.style.overflow = '';
        setIsTransitioning(false);
      }, 300);
    }, 800);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleToggle}
      disabled={isTransitioning}
      className={`relative overflow-hidden group hover:bg-cyan-500/10 hover:border-cyan-500/20 border border-transparent transition-all duration-300 ${
        isTransitioning ? 'opacity-70 scale-95' : 'opacity-100 scale-100'
      }`}
    >
      <div className="relative w-5 h-5">
        <Sun 
          className={`absolute inset-0 text-yellow-500 transition-all duration-700 ease-out ${
            isDark 
              ? 'opacity-0 rotate-180 scale-50' 
              : 'opacity-100 rotate-0 scale-100'
          } group-hover:drop-shadow-[0_0_8px_rgba(234,179,8,0.6)]`} 
        />
        <Moon 
          className={`absolute inset-0 text-cyan-400 transition-all duration-700 ease-out ${
            isDark 
              ? 'opacity-100 rotate-0 scale-100' 
              : 'opacity-0 -rotate-180 scale-50'
          } group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]`} 
        />
      </div>
      
      {/* Enhanced ripple effect */}
      <div className={`absolute inset-0 rounded-md bg-gradient-to-r from-cyan-500/20 to-purple-500/20 transition-all duration-500 ${
        isTransitioning ? 'scale-150 opacity-0' : 'scale-0 opacity-100'
      }`} />
    </Button>
  );
};

export default ThemeToggle;
