
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
    
    // Ultra-smooth radial gradient overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: radial-gradient(circle at 50% 0%, rgba(${isDark ? '189, 224, 254' : '30, 41, 59'}, 0.15) 0%, transparent 70%);
      z-index: 9999;
      opacity: 0;
      transition: opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      pointer-events: none;
    `;
    
    document.body.appendChild(overlay);

    // Fade in overlay
    requestAnimationFrame(() => {
      overlay.style.opacity = '1';
    });

    // Apply smooth transition to document
    document.documentElement.style.transition = 'background-color 0.4s ease, color 0.4s ease';

    // Execute theme change at peak of transition
    setTimeout(() => {
      onToggle();
    }, 200);

    // Fade out and cleanup
    setTimeout(() => {
      overlay.style.opacity = '0';
      
      setTimeout(() => {
        if (document.body.contains(overlay)) {
          document.body.removeChild(overlay);
        }
        document.documentElement.style.transition = '';
        setIsTransitioning(false);
      }, 400);
    }, 400);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleToggle}
      disabled={isTransitioning}
      className={`relative overflow-hidden group hover:bg-primary/10 hover:border-primary/20 border border-transparent transition-all duration-300 ${
        isTransitioning ? 'opacity-70 scale-95' : 'opacity-100 scale-100'
      }`}
    >
      <div className="relative w-5 h-5">
        <Sun 
          className={`absolute inset-0 text-yellow-500 dark:text-yellow-400 transition-all duration-500 ease-out ${
            isDark 
              ? 'opacity-0 rotate-180 scale-50' 
              : 'opacity-100 rotate-0 scale-100'
          } group-hover:drop-shadow-[0_0_8px_rgba(234,179,8,0.6)]`} 
        />
        <Moon 
          className={`absolute inset-0 text-primary transition-all duration-500 ease-out ${
            isDark 
              ? 'opacity-100 rotate-0 scale-100' 
              : 'opacity-0 -rotate-180 scale-50'
          } group-hover:drop-shadow-[0_0_8px_hsl(var(--primary)/0.6)]`} 
        />
      </div>
    </Button>
  );
};

export default ThemeToggle;
