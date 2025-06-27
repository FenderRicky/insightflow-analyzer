
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowRight, ArrowLeft, Target, Users, Zap, CheckCircle, Github, Linkedin, Globe } from 'lucide-react';

interface OnboardingFlowProps {
  onComplete: (data: any) => void;
}

const OnboardingFlow = ({ onComplete }: OnboardingFlowProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    experience: '',
    goals: [] as string[],
    interests: [] as string[],
    hasGithub: false,
    hasLinkedIn: false,
    hasPortfolio: false
  });

  const steps = [
    {
      title: "Welcome to InsightFlow!",
      description: "Let's get to know you better",
      icon: Target
    },
    {
      title: "Tell us about yourself",
      description: "Basic information to personalize your experience", 
      icon: Users
    },
    {
      title: "What are your goals?",
      description: "Help us tailor recommendations for you",
      icon: Zap
    },
    {
      title: "Your online presence",
      description: "What profiles do you currently have?",
      icon: Globe
    },
    {
      title: "You're all set!",
      description: "Ready to start your professional growth journey",
      icon: CheckCircle
    }
  ];

  const roles = [
    "Software Developer",
    "Frontend Developer", 
    "Backend Developer",
    "Full Stack Developer",
    "UI/UX Designer",
    "Product Manager",
    "Data Scientist",
    "DevOps Engineer",
    "Student",
    "Career Changer",
    "Other"
  ];

  const experienceLevels = [
    { value: "entry", label: "Entry Level (0-2 years)" },
    { value: "mid", label: "Mid Level (2-5 years)" },
    { value: "senior", label: "Senior Level (5+ years)" },
    { value: "lead", label: "Lead/Principal (8+ years)" }
  ];

  const goalOptions = [
    "Land my first tech job",
    "Get promoted to senior level", 
    "Switch to a new company",
    "Transition into tech",
    "Improve my GitHub presence",
    "Build a standout portfolio",
    "Optimize my LinkedIn profile",
    "Learn new technologies",
    "Build my personal brand"
  ];

  const interestOptions = [
    "Web Development",
    "Mobile Development",
    "Machine Learning",
    "UI/UX Design",
    "DevOps",
    "Cloud Computing",
    "Blockchain",
    "Game Development",
    "Data Science",
    "Cybersecurity"
  ];

  const handleGoalChange = (goal: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({ ...prev, goals: [...prev.goals, goal] }));
    } else {
      setFormData(prev => ({ ...prev, goals: prev.goals.filter(g => g !== goal) }));
    }
  };

  const handleInterestChange = (interest: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({ ...prev, interests: [...prev.interests, interest] }));
    } else {
      setFormData(prev => ({ ...prev, interests: prev.interests.filter(i => i !== interest) }));
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.name.trim() && formData.role && formData.experience;
      case 2:
        return formData.goals.length > 0;
      case 3:
        return true; // Optional step
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(formData);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;
  const currentStepData = steps[currentStep];
  const IconComponent = currentStepData.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl glass border-white/10">
        {/* Progress Header */}
        <div className="p-6 pb-0">
          <div className="flex items-center justify-between mb-4">
            <Badge variant="outline" className="glass border-white/20">
              Step {currentStep + 1} of {steps.length}
            </Badge>
            <span className="text-sm text-muted-foreground">{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="mb-6" />
        </div>

        <CardHeader className="text-center pb-4">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-brand-500/20 to-neon-purple/20 flex items-center justify-center">
            <IconComponent className="h-8 w-8 text-brand-400" />
          </div>
          <CardTitle className="text-2xl text-gradient">{currentStepData.title}</CardTitle>
          <CardDescription className="text-lg">{currentStepData.description}</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Step 0: Welcome */}
          {currentStep === 0 && (
            <div className="text-center space-y-4">
              <p className="text-muted-foreground">
                We'll help you optimize your professional profiles and build an outstanding online presence.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <Target className="h-6 w-6 text-blue-400 mx-auto mb-2" />
                  <h3 className="font-medium text-sm">AI Analysis</h3>
                  <p className="text-xs text-muted-foreground mt-1">Get detailed feedback on your profiles</p>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <Users className="h-6 w-6 text-green-400 mx-auto mb-2" />
                  <h3 className="font-medium text-sm">Community</h3>
                  <p className="text-xs text-muted-foreground mt-1">Connect with like-minded professionals</p>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <Zap className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
                  <h3 className="font-medium text-sm">Growth Tools</h3>
                  <p className="text-xs text-muted-foreground mt-1">Templates, guides, and resources</p>
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">What's your name?</Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="glass border-white/20"
                />
              </div>

              <div className="space-y-2">
                <Label>What's your current role or aspiration?</Label>
                <RadioGroup
                  value={formData.role}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, role: value }))}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {roles.map((role) => (
                      <div key={role} className="flex items-center space-x-2">
                        <RadioGroupItem value={role} id={role} />
                        <Label htmlFor={role} className="text-sm">{role}</Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Experience level</Label>
                <RadioGroup
                  value={formData.experience}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, experience: value }))}
                >
                  {experienceLevels.map((level) => (
                    <div key={level.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={level.value} id={level.value} />
                      <Label htmlFor={level.value}>{level.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          )}

          {/* Step 2: Goals */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <p className="text-muted-foreground">Select all that apply (choose at least 1):</p>
              <div className="grid grid-cols-1 gap-3">
                {goalOptions.map((goal) => (
                  <div key={goal} className="flex items-center space-x-2">
                    <Checkbox
                      id={goal}
                      checked={formData.goals.includes(goal)}
                      onCheckedChange={(checked) => handleGoalChange(goal, checked as boolean)}
                    />
                    <Label htmlFor={goal} className="text-sm">{goal}</Label>
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <Label className="text-sm text-muted-foreground">Interested in these areas? (optional)</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {interestOptions.map((interest) => (
                    <div key={interest} className="flex items-center space-x-2">
                      <Checkbox
                        id={interest}
                        checked={formData.interests.includes(interest)}
                        onCheckedChange={(checked) => handleInterestChange(interest, checked as boolean)}
                      />
                      <Label htmlFor={interest} className="text-xs">{interest}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Online Presence */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <p className="text-muted-foreground">Which platforms do you currently have profiles on?</p>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
                  <div className="flex items-center gap-3">
                    <Github className="h-5 w-5 text-green-400" />
                    <div>
                      <h3 className="font-medium">GitHub</h3>
                      <p className="text-sm text-muted-foreground">Code repositories and contributions</p>
                    </div>
                  </div>
                  <Checkbox
                    checked={formData.hasGithub}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, hasGithub: checked as boolean }))}
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
                  <div className="flex items-center gap-3">
                    <Linkedin className="h-5 w-5 text-blue-400" />
                    <div>
                      <h3 className="font-medium">LinkedIn</h3>
                      <p className="text-sm text-muted-foreground">Professional networking profile</p>
                    </div>
                  </div>
                  <Checkbox
                    checked={formData.hasLinkedIn}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, hasLinkedIn: checked as boolean }))}
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-purple-400" />
                    <div>
                      <h3 className="font-medium">Personal Portfolio</h3>
                      <p className="text-sm text-muted-foreground">Personal website or portfolio</p>
                    </div>
                  </div>
                  <Checkbox
                    checked={formData.hasPortfolio}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, hasPortfolio: checked as boolean }))}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Completion */}
          {currentStep === 4 && (
            <div className="text-center space-y-6">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-green-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Welcome aboard, {formData.name}! 🎉</h3>
                <p className="text-muted-foreground">
                  Your personalized dashboard is ready. Let's start optimizing your professional presence!
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <h4 className="font-medium text-blue-300">First Analysis</h4>
                  <p className="text-xs text-blue-200 mt-1">Get AI feedback on your profiles</p>
                </div>
                <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                  <h4 className="font-medium text-purple-300">Template Gallery</h4>
                  <p className="text-xs text-purple-200 mt-1">Browse our premium templates</p>
                </div>
                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                  <h4 className="font-medium text-green-300">Join Community</h4>
                  <p className="text-xs text-green-200 mt-1">Connect with professionals</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="glass border-white/20 hover:border-white/40"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            
            <Button
              onClick={nextStep}
              disabled={!canProceed()}
              className="bg-gradient-to-r from-brand-500 to-neon-purple hover:from-brand-600 hover:to-neon-purple/80"
            >
              {currentStep === steps.length - 1 ? 'Get Started' : 'Continue'}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingFlow;
