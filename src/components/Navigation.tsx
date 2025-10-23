
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Home, Target, Palette, Users, BookOpen, Menu, Zap, Brain } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import { useTheme } from '@/hooks/useTheme';

const Navigation = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme, isDark } = useTheme();

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

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
                ? 'bg-primary/20 text-primary border border-primary/30'
                : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
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
    <nav className="sticky top-0 z-50 glass border-b border-border/50 backdrop-blur-xl bg-background/80 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">InsightFlow</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <NavLinks />
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
            <Button variant="outline" className="glass border-border/20 hover:border-primary/40">
              <Zap className="h-4 w-4 mr-2" />
              Quick Analyze
            </Button>
            <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
              Upgrade Pro
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="glass border-border/20">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="glass border-border/10 w-80 bg-background/95 backdrop-blur-xl">
                <div className="flex flex-col h-full">
                  {/* Mobile Logo */}
                  <div className="flex items-center gap-2 mb-8">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                      <Brain className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">InsightFlow</span>
                  </div>

                  {/* Mobile Navigation Links */}
                  <div className="flex-1">
                    <NavLinks mobile />
                  </div>

                  {/* Mobile Actions */}
                  <div className="space-y-3 mt-8">
                    <div className="flex justify-center mb-4">
                      <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
                    </div>
                    <Button variant="outline" className="w-full glass border-border/20 hover:border-primary/40">
                      <Zap className="h-4 w-4 mr-2" />
                      Quick Analyze
                    </Button>
                    <Button className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90">
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
