
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
    
    // Create the original smooth transition overlay effect
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: radial-gradient(circle at center, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.1) 50%, transparent 100%);
      backdrop-filter: blur(10px);
      z-index: 9999;
      opacity: 0;
      transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
      pointer-events: none;
    `;
    
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';

    // Original smooth fade sequence
    requestAnimationFrame(() => {
      overlay.style.opacity = '1';
    });

    // Phase 1: Gradual fade with transform (300ms)
    setTimeout(() => {
      document.documentElement.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
      document.documentElement.style.transform = 'scale(0.98)';
      document.documentElement.style.filter = 'brightness(0.7)';
    }, 150);

    // Phase 2: Theme change at peak transition (500ms)
    setTimeout(() => {
      onToggle();
    }, 500);

    // Phase 3: Restore with new theme (650ms)
    setTimeout(() => {
      document.documentElement.style.transform = 'scale(1)';
      document.documentElement.style.filter = 'brightness(1)';
    }, 650);

    // Phase 4: Complete transition and cleanup (1200ms total)
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
      }, 400);
    }, 1200);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleToggle}
      disabled={isTransitioning}
      className={`relative overflow-hidden group hover:bg-brand-500/10 hover:border-brand-500/20 border border-transparent transition-all duration-500 ${
        isTransitioning ? 'opacity-70 scale-95' : 'opacity-100 scale-100'
      }`}
    >
      <div className="relative w-5 h-5">
        <Sun 
          className={`absolute inset-0 text-yellow-500 transition-all duration-1000 ease-out ${
            isDark 
              ? 'opacity-0 rotate-180 scale-50' 
              : 'opacity-100 rotate-0 scale-100'
          } group-hover:drop-shadow-[0_0_8px_rgba(234,179,8,0.6)]`} 
        />
        <Moon 
          className={`absolute inset-0 text-blue-400 transition-all duration-1000 ease-out ${
            isDark 
              ? 'opacity-100 rotate-0 scale-100' 
              : 'opacity-0 -rotate-180 scale-50'
          } group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]`} 
        />
      </div>
      
      {/* Enhanced ripple effect on click */}
      <div className={`absolute inset-0 rounded-md bg-gradient-to-r from-brand-500/20 to-neon-purple/20 transition-all duration-700 ${
        isTransitioning ? 'scale-150 opacity-0' : 'scale-0 opacity-100'
      }`} />
    </Button>
  );
};

export default ThemeToggle;
