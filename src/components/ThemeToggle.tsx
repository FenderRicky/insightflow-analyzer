
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
    
    // Create enhanced transition overlay with layered fade
    const overlay = document.createElement('div');
    overlay.className = 'theme-transition-overlay';
    document.body.appendChild(overlay);

    // Add fade-in class after a frame to trigger CSS transition
    requestAnimationFrame(() => {
      overlay.classList.add('active');
    });

    // Phase 1: Fade out current theme (200ms)
    setTimeout(() => {
      document.documentElement.style.opacity = '0.95';
    }, 100);

    // Phase 2: Change theme at peak fade (300ms)
    setTimeout(() => {
      onToggle();
    }, 300);

    // Phase 3: Fade back in with new theme (400ms)
    setTimeout(() => {
      document.documentElement.style.opacity = '1';
    }, 400);

    // Phase 4: Remove overlay and reset (600ms total)
    setTimeout(() => {
      overlay.classList.remove('active');
      
      setTimeout(() => {
        if (document.body.contains(overlay)) {
          document.body.removeChild(overlay);
        }
        document.documentElement.style.opacity = '';
        setIsTransitioning(false);
      }, 300);
    }, 600);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleToggle}
      disabled={isTransitioning}
      className={`glass hover:bg-white/10 transition-all duration-500 ease-out ${
        isTransitioning ? 'opacity-80' : 'opacity-100'
      }`}
    >
      <div className="relative w-4 h-4">
        <Sun 
          className={`absolute inset-0 text-yellow-400 transition-all duration-700 ease-out ${
            isDark 
              ? 'opacity-0 rotate-90 scale-75 blur-sm' 
              : 'opacity-100 rotate-0 scale-100 blur-0'
          }`} 
        />
        <Moon 
          className={`absolute inset-0 text-blue-400 transition-all duration-700 ease-out ${
            isDark 
              ? 'opacity-100 rotate-0 scale-100 blur-0' 
              : 'opacity-0 -rotate-90 scale-75 blur-sm'
          }`} 
        />
      </div>
    </Button>
  );
};

export default ThemeToggle;
