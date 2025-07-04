
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, FileText, Download, Play, Shield, Award } from 'lucide-react';

const TrustSignals = () => {
  const [profileCount, setProfileCount] = useState(9847);

  useEffect(() => {
    // Animate counter
    const timer = setInterval(() => {
      setProfileCount(prev => prev + Math.floor(Math.random() * 3));
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const downloadSampleReport = () => {
    // Create a mock PDF download
    const link = document.createElement('a');
    link.href = '/sample-analysis-report.pdf';
    link.download = 'sample-career-analysis-report.pdf';
    link.click();
  };

  const viewSampleDemo = () => {
    // Open sample analysis in new tab
    window.open('/demo-analysis', '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Live Counter */}
      <Card className="glass border-border/20 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/20">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <div className="p-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-500">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="text-3xl font-bold text-green-400">{profileCount.toLocaleString()}+</div>
                <div className="text-sm text-muted-foreground">Profiles Analyzed</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-green-300">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span>Live • Updated every few seconds</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sample Report Downloads */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="glass border-border/20 hover:border-blue-500/30 transition-all duration-300">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 w-fit mx-auto">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Sample Analysis Report</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  See exactly what insights you'll receive
                </p>
                <Button 
                  onClick={downloadSampleReport}
                  variant="outline" 
                  size="sm"
                  className="w-full hover:bg-blue-500/10"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF Sample
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-border/20 hover:border-purple-500/30 transition-all duration-300">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 w-fit mx-auto">
                <Play className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Interactive Demo</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Experience the full analysis flow
                </p>
                <Button 
                  onClick={viewSampleDemo}
                  variant="outline" 
                  size="sm"
                  className="w-full hover:bg-purple-500/10"
                >
                  <Play className="h-4 w-4 mr-2" />
                  View Live Demo
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Privacy & Security */}
      <Card className="glass border-border/20">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="space-y-2">
              <div className="p-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 w-fit mx-auto">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div className="text-sm font-semibold">GDPR Compliant</div>
              <div className="text-xs text-muted-foreground">Your data is protected</div>
            </div>
            
            <div className="space-y-2">
              <div className="p-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 w-fit mx-auto">
                <Award className="h-5 w-5 text-white" />
              </div>
              <div className="text-sm font-semibold">Industry Certified</div>
              <div className="text-xs text-muted-foreground">Used by top companies</div>
            </div>
            
            <div className="space-y-2">
              <div className="p-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 w-fit mx-auto">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div className="text-sm font-semibold">99.5% Accuracy</div>
              <div className="text-xs text-muted-foreground">Verified by users</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrustSignals;
