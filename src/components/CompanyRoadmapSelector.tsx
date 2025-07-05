
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Building, TrendingUp, Users, Target } from 'lucide-react';
import { CompanyRoadmapEngine } from '@/utils/companyRoadmapEngine';
import { useToast } from '@/hooks/use-toast';

interface CompanyRoadmapSelectorProps {
  onRoadmapGenerated: (roadmap: any, profileUrl: string) => void;
}

const CompanyRoadmapSelector = ({ onRoadmapGenerated }: CompanyRoadmapSelectorProps) => {
  const [profileUrl, setProfileUrl] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const companies = [
    { name: 'Netflix', icon: '📺', category: 'FAANG', hiring: 'Active', salary: '$195K' },
    { name: 'Stripe', icon: '💳', category: 'Fintech', hiring: 'Hot', salary: '$210K' },
    { name: 'SpaceX', icon: '🚀', category: 'Aerospace', hiring: 'Selective', salary: '$165K' },
    { name: 'Google', icon: '🔍', category: 'FAANG', hiring: 'Active', salary: '$185K' },
    { name: 'Meta', icon: '📘', category: 'FAANG', hiring: 'Moderate', salary: '$190K' },
    { name: 'Tesla', icon: '⚡', category: 'Automotive', hiring: 'Hot', salary: '$155K' },
    { name: 'OpenAI', icon: '🤖', category: 'AI/ML', hiring: 'Hot', salary: '$220K' },
    { name: 'Rippling', icon: '💼', category: 'HR Tech', hiring: 'Active', salary: '$175K' },
    { name: 'Plaid', icon: '🏦', category: 'Fintech', hiring: 'Active', salary: '$180K' },
    { name: 'Jane Street', icon: '📊', category: 'Quant', hiring: 'Selective', salary: '$300K' },
    { name: 'Two Sigma', icon: '📈', category: 'Quant', hiring: 'Selective', salary: '$280K' },
    { name: 'Figma', icon: '🎨', category: 'Design', hiring: 'Active', salary: '$170K' }
  ];

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getHiringColor = (status: string) => {
    switch (status) {
      case 'Hot': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'Active': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'Selective': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const handleGenerateRoadmap = async () => {
    if (!profileUrl || !selectedCompany) {
      toast({
        title: "Missing Information",
        description: "Please enter your profile URL and select a company",
        variant: "destructive"
      });
      return;
    }

    const isValid = await CompanyRoadmapEngine.validateProfileUrl(profileUrl);
    if (!isValid) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid LinkedIn or GitHub profile URL",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      const roadmap = await CompanyRoadmapEngine.generatePersonalizedRoadmap(
        profileUrl,
        selectedCompany
      );
      
      if (roadmap) {
        onRoadmapGenerated(roadmap, profileUrl);
        toast({
          title: "Roadmap Generated! 🎯",
          description: `Your personalized ${selectedCompany} roadmap is ready`,
        });
      } else {
        throw new Error('Roadmap generation failed');
      }
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Please try again or contact support",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Profile URL Input */}
      <Card className="glass border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-cyan-400" />
            Enter Your Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="https://linkedin.com/in/yourprofile or https://github.com/username"
            value={profileUrl}
            onChange={(e) => setProfileUrl(e.target.value)}
            className="glass"
          />
        </CardContent>
      </Card>

      {/* Company Search */}
      <Card className="glass border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5 text-purple-400" />
            Choose Your Target Company
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search companies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 glass"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCompanies.map((company) => (
              <div
                key={company.name}
                className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 ${
                  selectedCompany === company.name
                    ? 'border-cyan-500/50 bg-cyan-500/10'
                    : 'border-white/10 bg-white/5 hover:border-white/20'
                }`}
                onClick={() => setSelectedCompany(company.name)}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{company.icon}</span>
                  <div>
                    <h4 className="font-semibold">{company.name}</h4>
                    <p className="text-sm text-muted-foreground">{company.category}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <Badge className={getHiringColor(company.hiring)}>
                    {company.hiring}
                  </Badge>
                  <span className="text-sm font-medium text-green-400">
                    {company.salary}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Generate Button */}
      <Button
        onClick={handleGenerateRoadmap}
        disabled={isGenerating || !profileUrl || !selectedCompany}
        className="w-full h-12 bg-gradient-to-r from-cyan-500 to-purple-500 hover:shadow-lg hover:shadow-cyan-500/25 text-lg"
      >
        {isGenerating ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3" />
            Generating AI Roadmap...
          </>
        ) : (
          <>
            <TrendingUp className="h-5 w-5 mr-2" />
            Generate My {selectedCompany} Battle Plan
          </>
        )}
      </Button>

      {selectedCompany && (
        <div className="text-center text-sm text-muted-foreground">
          🎯 This roadmap is based on analysis of {selectedCompany} hiring patterns and 
          successful candidate profiles
        </div>
      )}
    </div>
  );
};

export default CompanyRoadmapSelector;
