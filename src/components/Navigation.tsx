
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Home, Target, Palette, Users, BookOpen, Menu, Zap, Brain } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Dashboard', icon: Home },
    { path: '/analyze', label: 'Analyze', icon: Target },
    { path: '/portfolio-builder', label: 'Portfolio Builder', icon: Palette },
    { path: '/community', label: 'Community', icon: Users },
    { path: '/resources', label: 'Resources', icon: BookOpen },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const NavLinks = ({ mobile = false }) => (
    <div className={`flex ${mobile ? 'flex-col space-y-2' : 'items-center space-x-1'}`}>
      {navItems.map((item) => {
        const IconComponent = item.icon;
        return (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => mobile && setIsOpen(false)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
              isActive(item.path)
                ? 'bg-brand-500/20 text-brand-300 border border-brand-500/30'
                : 'text-muted-foreground hover:text-white hover:bg-white/5'
            } ${mobile ? 'w-full justify-start' : ''}`}
          >
            <IconComponent className="h-4 w-4" />
            <span className={mobile ? 'block' : 'hidden lg:block'}>{item.label}</span>
            {item.label === 'Community' && !mobile && (
              <Badge className="bg-green-500/20 text-green-300 text-xs ml-1">New</Badge>
            )}
          </Link>
        );
      })}
    </div>
  );

  return (
    <nav className="sticky top-0 z-50 glass border-b border-white/10 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-neon-purple flex items-center justify-center">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gradient">InsightFlow</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <NavLinks />
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <Button variant="outline" className="glass border-white/20 hover:border-white/40">
              <Zap className="h-4 w-4 mr-2" />
              Quick Analyze
            </Button>
            <Button className="bg-gradient-to-r from-brand-500 to-neon-purple hover:from-brand-600 hover:to-neon-purple/80">
              Upgrade Pro
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="glass border-white/20">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="glass border-white/10 w-80">
                <div className="flex flex-col h-full">
                  {/* Mobile Logo */}
                  <div className="flex items-center gap-2 mb-8">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-neon-purple flex items-center justify-center">
                      <Brain className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-xl font-bold text-gradient">InsightFlow</span>
                  </div>

                  {/* Mobile Navigation Links */}
                  <div className="flex-1">
                    <NavLinks mobile />
                  </div>

                  {/* Mobile Actions */}
                  <div className="space-y-3 mt-8">
                    <Button variant="outline" className="w-full glass border-white/20 hover:border-white/40">
                      <Zap className="h-4 w-4 mr-2" />
                      Quick Analyze
                    </Button>
                    <Button className="w-full bg-gradient-to-r from-brand-500 to-neon-purple hover:from-brand-600 hover:to-neon-purple/80">
                      Upgrade Pro
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
