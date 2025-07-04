
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Wand2, Copy, CheckCircle, Sparkles, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AIPolishProps {
  userProfile?: {
    currentBio?: string;
    skills: string[];
    experience: string;
  };
}

const AIPolish = ({ userProfile }: AIPolishProps) => {
  const [originalText, setOriginalText] = useState(userProfile?.currentBio || '');
  const [polishedVersions, setPolishedVersions] = useState<any>(null);
  const [isPolishing, setIsPolishing] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState('');
  const { toast } = useToast();

  const handlePolish = async () => {
    if (!originalText.trim()) return;
    
    setIsPolishing(true);
    
    // Simulate AI polishing
    setTimeout(() => {
      const mockVersions = {
        concise: {
          title: "Concise Professional",
          text: "Senior Full-Stack Engineer with 5+ years building scalable web applications. Expertise in React, Node.js, and cloud architecture. Led teams of 8+ developers, delivered 20+ production systems serving 100K+ users. Passionate about clean code and system optimization.",
          improvements: ["Reduced length by 60%", "Added quantified metrics", "Focused on key achievements"]
        },
        technical: {
          title: "Technical Deep-Dive",
          text: "Senior Software Engineer specializing in distributed systems and microservices architecture. Built production applications using React, TypeScript, Node.js, PostgreSQL, and AWS. Implemented CI/CD pipelines, reduced deployment time by 75%. Experience with Kubernetes, Docker, and event-driven architectures. Open source contributor with 2K+ GitHub stars.",
          improvements: ["Highlighted technical stack", "Added specific technologies", "Mentioned open source contributions"]
        },
        creative: {
          title: "Creative Storyteller",
          text: "I turn complex problems into elegant digital solutions. As a Full-Stack Engineer, I've helped startups scale from MVP to millions of users. Whether it's architecting microservices or mentoring junior developers, I bring both technical excellence and human-centered thinking to every project. Currently exploring AI/ML integration in web applications.",
          improvements: ["Added personal narrative", "Emphasized problem-solving", "Showed growth mindset"]
        }
      };
      
      setPolishedVersions(mockVersions);
      setSelectedVersion('concise');
      setIsPolishing(false);
    }, 2500);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Polished text copied to clipboard",
    });
  };

  return (
    <div className="space-y-6">
      <Card className="glass border-border/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
              <Wand2 className="h-5 w-5 text-white" />
            </div>
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              1-Click Profile Polish
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Current Bio/About Section
            </label>
            <Textarea
              placeholder="Paste your current LinkedIn About section, GitHub bio, or any professional description..."
              value={originalText}
              onChange={(e) => setOriginalText(e.target.value)}
              className="min-h-32"
            />
          </div>
          
          <Button 
            onClick={handlePolish}
            disabled={isPolishing || !originalText.trim()}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            {isPolishing ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Polishing with Advanced Intelligence...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Generate 3 Polished Versions
              </>
            )}
          </Button>

          {isPolishing && (
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground text-center">
                ✨ Analyzing your content for impact optimization...
              </div>
              <div className="text-xs text-muted-foreground text-center">
                Applying industry-specific keywords and persuasion techniques
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {polishedVersions && (
        <Card className="glass border-border/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-400">
              <CheckCircle className="h-5 w-5" />
              3 Optimized Versions Ready
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={selectedVersion} onValueChange={setSelectedVersion}>
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="concise">Concise</TabsTrigger>
                <TabsTrigger value="technical">Technical</TabsTrigger>
                <TabsTrigger value="creative">Creative</TabsTrigger>
              </TabsList>

              {Object.entries(polishedVersions).map(([key, version]: [string, any]) => (
                <TabsContent key={key} value={key} className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge className="bg-purple-500/20 text-purple-300">
                        {version.title}
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(version.text)}
                        className="hover:bg-purple-500/10"
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy
                      </Button>
                    </div>
                    
                    <div className="p-4 bg-gradient-to-r from-purple-500/5 to-pink-500/5 border border-purple-500/20 rounded-lg">
                      <p className="text-foreground/90 leading-relaxed">
                        {version.text}
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-purple-400">Key Improvements:</h4>
                      <ul className="space-y-1">
                        {version.improvements.map((improvement: string, index: number) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                            <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                            {improvement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AIPolish;
