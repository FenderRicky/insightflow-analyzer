
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navigation from "./components/Navigation";
import OnboardingFlow from "./components/OnboardingFlow";
import Dashboard from "./pages/Dashboard";
import Index from "./pages/Index";
import PortfolioPresets from "./pages/PortfolioPresets";
import PortfolioBuilder from "./pages/PortfolioBuilder";
import Community from "./pages/Community";
import Resources from "./pages/Resources";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  useEffect(() => {
    // Check if user has completed onboarding
    const hasCompletedOnboarding = localStorage.getItem('insightflow-onboarding-completed');
    const hasVisitedBefore = localStorage.getItem('insightflow-visited');
    
    if (!hasCompletedOnboarding && !hasVisitedBefore) {
      setShowOnboarding(true);
      setIsFirstVisit(true);
    } else {
      setIsFirstVisit(false);
    }
    
    if (!hasVisitedBefore) {
      localStorage.setItem('insightflow-visited', 'true');
    }
  }, []);

  const handleOnboardingComplete = (data: any) => {
    localStorage.setItem('insightflow-onboarding-completed', 'true');
    localStorage.setItem('insightflow-user-data', JSON.stringify(data));
    setShowOnboarding(false);
    setIsFirstVisit(false);
  };

  const skipOnboarding = () => {
    localStorage.setItem('insightflow-onboarding-completed', 'true');
    setShowOnboarding(false);
    setIsFirstVisit(false);
  };

  if (showOnboarding) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <OnboardingFlow onComplete={handleOnboardingComplete} />
          {/* Skip button for development/testing */}
          <button
            onClick={skipOnboarding}
            className="fixed top-4 right-4 text-xs text-muted-foreground hover:text-white transition-colors"
          >
            Skip onboarding
          </button>
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            <Navigation />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/analyze" element={<Index />} />
              <Route path="/portfolio-presets" element={<PortfolioPresets />} />
              <Route path="/portfolio-builder" element={<PortfolioBuilder />} />
              <Route path="/community" element={<Community />} />
              <Route path="/resources" element={<Resources />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
