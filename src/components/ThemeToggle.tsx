
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
    setIsTransitioning(true);
    
    // Add transition overlay
    const overlay = document.createElement('div');
    overlay.className = 'theme-transition-overlay active';
    document.body.appendChild(overlay);

    // Trigger theme change after a brief delay
    setTimeout(() => {
      onToggle();
    }, 250);

    // Remove overlay after transition
    setTimeout(() => {
      overlay.classList.remove('active');
      setTimeout(() => {
        document.body.removeChild(overlay);
        setIsTransitioning(false);
      }, 500);
    }, 500);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleToggle}
      disabled={isTransitioning}
      className="glass hover:bg-white/10 transition-all duration-500 ease-out"
    >
      <div className="relative w-4 h-4">
        <Sun 
          className={`absolute inset-0 text-yellow-400 transition-all duration-500 ease-out ${
            isDark ? 'opacity-0 rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100'
          }`} 
        />
        <Moon 
          className={`absolute inset-0 text-blue-400 transition-all duration-500 ease-out ${
            isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-75'
          }`} 
        />
      </div>
    </Button>
  );
};

export default ThemeToggle;
