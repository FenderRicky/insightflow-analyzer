
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
    
    // Optimized smooth transition
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: radial-gradient(circle at center, rgba(34, 211, 238, 0.08) 0%, rgba(147, 51, 234, 0.06) 50%, transparent 100%);
      backdrop-filter: blur(6px);
      z-index: 9999;
      opacity: 0;
      transition: opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      pointer-events: none;
    `;
    
    document.body.appendChild(overlay);

    // Smooth fade in
    requestAnimationFrame(() => {
      overlay.style.opacity = '1';
    });

    // Enhanced document transition
    setTimeout(() => {
      document.documentElement.style.transition = 'color 0.3s ease, background-color 0.3s ease';
    }, 100);

    // Theme change
    setTimeout(() => {
      onToggle();
    }, 250);

    // Cleanup and restore
    setTimeout(() => {
      overlay.style.opacity = '0';
      
      setTimeout(() => {
        if (document.body.contains(overlay)) {
          document.body.removeChild(overlay);
        }
        document.documentElement.style.transition = '';
        setIsTransitioning(false);
      }, 250);
    }, 500);
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
          className={`absolute inset-0 text-yellow-500 transition-all duration-500 ease-out ${
            isDark 
              ? 'opacity-0 rotate-180 scale-50' 
              : 'opacity-100 rotate-0 scale-100'
          } group-hover:drop-shadow-[0_0_6px_rgba(234,179,8,0.5)]`} 
        />
        <Moon 
          className={`absolute inset-0 text-cyan-400 transition-all duration-500 ease-out ${
            isDark 
              ? 'opacity-100 rotate-0 scale-100' 
              : 'opacity-0 -rotate-180 scale-50'
          } group-hover:drop-shadow-[0_0_6px_rgba(34,211,238,0.5)]`} 
        />
      </div>
    </Button>
  );
};

export default ThemeToggle;
