
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Menu, Target, Palette, Home, X } from 'lucide-react';
import FuturisticLogo from './FuturisticLogo';

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { title: 'Home', href: '/', icon: Home },
    { title: 'Roadmaps', href: '/roadmap', icon: Target },
    { title: 'Portfolio Presets', href: '/portfolio-presets', icon: Palette }
  ];

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="md:hidden hover:bg-brand-500/10"
          onClick={() => setIsOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 bg-background/95 backdrop-blur-xl border-border/50">
        <SheetHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <FuturisticLogo size="sm" animate={false} />
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <SheetTitle className="text-left bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Navigation
          </SheetTitle>
        </SheetHeader>
        
        <div className="mt-8 space-y-4">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <Link 
                key={item.href}
                to={item.href} 
                onClick={handleLinkClick}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-brand-500/10 transition-colors group"
              >
                <IconComponent className="h-5 w-5 text-muted-foreground group-hover:text-brand-500 transition-colors" />
                <span className="text-base font-medium group-hover:text-foreground transition-colors">
                  {item.title}
                </span>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 p-4 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-lg">
          <h4 className="font-semibold text-cyan-400 mb-2">Get Started</h4>
          <p className="text-sm text-muted-foreground mb-4">
            Transform your career with AI-powered insights
          </p>
          <Button 
            className="w-full bg-gradient-to-r from-cyan-500 to-purple-500"
            onClick={handleLinkClick}
          >
            Start Analysis
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
