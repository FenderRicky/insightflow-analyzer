
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PortfolioPresets from "./pages/PortfolioPresets";
import PortfolioBuilder from "./pages/PortfolioBuilder";
import RoadmapPage from "./pages/RoadmapPage";
import CompanyRoadmap from "./pages/CompanyRoadmap";
import NotFound from "./pages/NotFound";
import PageTransition from "./components/PageTransition";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            <PageTransition>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/portfolio-presets" element={<PortfolioPresets />} />
                <Route path="/portfolio-builder" element={<PortfolioBuilder />} />
                <Route path="/roadmap" element={<RoadmapPage />} />
                <Route path="/roadmap/:company" element={<CompanyRoadmap />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </PageTransition>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
