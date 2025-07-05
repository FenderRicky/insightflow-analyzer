
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Circle, Calendar, Target, Clock, Code, GitBranch } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CompanySpecificRoadmapProps {
  companyData: any;
}

const CompanySpecificRoadmap = ({ companyData }: CompanySpecificRoadmapProps) => {
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const roadmapPhases = generateCompanyRoadmap(companyData);

  const toggleStep = (stepId: string) => {
    const newCompleted = new Set(completedSteps);
    if (newCompleted.has(stepId)) {
      newCompleted.delete(stepId);
    } else {
      newCompleted.add(stepId);
      toast({
        title: "Step Completed! 🎉",
        description: "Great progress towards your goal!",
      });
    }
    setCompletedSteps(newCompleted);
  };

  const totalSteps = roadmapPhases.reduce((total, phase) => total + phase.steps.length, 0);
  const completedCount = completedSteps.size;
  const progressPercentage = (completedCount / totalSteps) * 100;

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card className="glass border-cyan-500/20 bg-gradient-to-r from-cyan-500/5 to-purple-500/5">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">
              🎯 Your {companyData.name} Battle Plan
            </h3>
            <Badge variant="outline" className="glass">
              3-Month Plan
            </Badge>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span>Progress: {completedCount}/{totalSteps} steps completed</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
            <p className="text-sm text-muted-foreground">
              Following this roadmap increases your {companyData.name} hire probability by {companyData.stats.hireRate}%
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Roadmap Phases */}
      <div className="space-y-8">
        {roadmapPhases.map((phase, phaseIndex) => (
          <Card key={phaseIndex} className="glass border-white/10">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold">
                  {phaseIndex + 1}
                </div>
                <div>
                  <CardTitle className="text-xl">
                    {phase.title}
                    <Badge className="ml-3 bg-purple-500/20 text-purple-400">
                      {phase.duration}
                    </Badge>
                  </CardTitle>
                  <p className="text-muted-foreground mt-1">{phase.description}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {phase.steps.map((step, stepIndex) => {
                const stepId = `${phaseIndex}-${stepIndex}`;
                const isCompleted = completedSteps.has(stepId);
                
                return (
                  <div 
                    key={stepIndex} 
                    className={`p-4 rounded-lg border transition-all duration-300 cursor-pointer ${
                      isCompleted 
                        ? 'bg-green-500/5 border-green-500/20' 
                        : 'bg-white/5 border-white/10 hover:border-cyan-500/30'
                    }`}
                    onClick={() => toggleStep(stepId)}
                  >
                    <div className="flex items-start gap-4">
                      <button className="mt-1 transition-colors">
                        {isCompleted ? (
                          <CheckCircle className="h-6 w-6 text-green-500" />
                        ) : (
                          <Circle className="h-6 w-6 text-muted-foreground hover:text-cyan-400" />
                        )}
                      </button>
                      
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-3 flex-wrap">
                          <h4 className={`font-semibold ${isCompleted ? 'line-through text-muted-foreground' : ''}`}>
                            {step.title}
                          </h4>
                          <Badge className={`text-xs ${
                            step.difficulty === 'Hard' ? 'bg-red-500/20 text-red-400' :
                            step.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-green-500/20 text-green-400'
                          }`}>
                            {step.difficulty}
                          </Badge>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {step.timeEstimate}
                          </div>
                        </div>
                        
                        <p className={`text-sm text-muted-foreground ${isCompleted ? 'line-through' : ''}`}>
                          {step.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="text-xs flex items-center gap-1">
                            <Target className="h-3 w-3" />
                            Impact: {step.impact}
                          </Badge>
                          {step.resources.map((resource, resIndex) => (
                            <Badge key={resIndex} variant="secondary" className="text-xs">
                              {resource}
                            </Badge>
                          ))}
                        </div>

                        {step.codeExample && (
                          <div className="mt-3 p-3 bg-gray-900/50 rounded border border-gray-700">
                            <div className="flex items-center gap-2 mb-2">
                              <Code className="h-4 w-4 text-cyan-400" />
                              <span className="text-sm font-medium text-cyan-400">Example Implementation</span>
                            </div>
                            <pre className="text-xs text-gray-300 overflow-x-auto">
                              <code>{step.codeExample}</code>
                            </pre>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-500">
          <GitBranch className="h-4 w-4 mr-2" />
          Get Weekly Reminders
        </Button>
        <Button variant="outline" className="flex-1">
          <Calendar className="h-4 w-4 mr-2" />
          Export to Calendar
        </Button>
      </div>
    </div>
  );
};

function generateCompanyRoadmap(companyData: any) {
  const companyRoadmaps: Record<string, any[]> = {
    Netflix: [
      {
        title: "Phase 1: Close Critical Gaps",
        duration: "Month 1",
        description: "Build foundation in Netflix's core technologies and engineering practices",
        steps: [
          {
            title: "Build a Go Microservice",
            description: "Create a high-throughput service using Go (Netflix's primary backend language)",
            difficulty: "Hard",
            timeEstimate: "2 weeks",
            impact: "High",
            resources: ["Go documentation", "Netflix OSS guides", "Microservices patterns"],
            codeExample: `// Netflix-style service structure
package main

import (
    "github.com/gin-gonic/gin"
    "github.com/prometheus/client_golang/prometheus"
)

func main() {
    r := gin.Default()
    r.GET("/health", healthCheck)
    r.Run(":8080")
}`
          },
          {
            title: "Add 'Distributed Systems' to LinkedIn",
            description: "Optimize your LinkedIn profile with Netflix's key search terms",
            difficulty: "Easy",
            timeEstimate: "1 hour",
            impact: "Medium",
            resources: ["LinkedIn optimization guide", "Netflix job descriptions"]
          },
          {
            title: "Star 5 Netflix OSS Repositories",
            description: "Engage with Netflix's open source ecosystem (Eureka, Hystrix, etc.)",
            difficulty: "Easy",
            timeEstimate: "30 minutes",
            impact: "Low",
            resources: ["Netflix OSS catalog", "GitHub activity guide"]
          }
        ]
      },
      {
        title: "Phase 2: Build Netflix-Level Projects",
        duration: "Month 2-3",
        description: "Create portfolio projects that demonstrate Netflix-scale thinking",
        steps: [
          {
            title: "Build a Content Recommendation Engine",
            description: "Implement collaborative filtering with A/B testing capabilities",
            difficulty: "Hard",
            timeEstimate: "3 weeks",
            impact: "Very High",
            resources: ["ML algorithms", "A/B testing frameworks", "Netflix research papers"],
            codeExample: `// Recommendation algorithm structure
class RecommendationEngine {
    calculateSimilarity(user1, user2) {
        // Collaborative filtering logic
    }
    
    recommendContent(userId, testGroup) {
        // A/B testing logic
    }
}`
          },
          {
            title: "Implement Circuit Breaker Pattern",
            description: "Show understanding of resilience patterns Netflix uses",
            difficulty: "Medium",
            timeEstimate: "1 week",
            impact: "High",
            resources: ["Hystrix documentation", "Circuit breaker patterns"]
          }
        ]
      }
    ],
    Stripe: [
      {
        title: "Phase 1: Master Payment Systems",
        duration: "Month 1",
        description: "Build expertise in financial technology and payment processing",
        steps: [
          {
            title: "Build a Payment Processing System",
            description: "Create a secure payment system with idempotency keys and webhook handling",
            difficulty: "Hard",
            timeEstimate: "2 weeks",
            impact: "Very High",
            resources: ["Stripe API docs", "Payment security guides", "Webhook best practices"],
            codeExample: `// Idempotent payment processing
async function processPayment(paymentData, idempotencyKey) {
    const existingPayment = await findByIdempotencyKey(idempotencyKey);
    if (existingPayment) {
        return existingPayment; // Idempotent response
    }
    
    return await createPayment(paymentData, idempotencyKey);
}`
          },
          {
            title: "Implement PCI Compliance Patterns",
            description: "Demonstrate understanding of financial data security",
            difficulty: "Medium",
            timeEstimate: "1 week",
            impact: "High",
            resources: ["PCI DSS guidelines", "Stripe security docs"]
          }
        ]
      },
      {
        title: "Phase 2: API Design Excellence",
        duration: "Month 2-3",
        description: "Build APIs that match Stripe's legendary developer experience",
        steps: [
          {
            title: "Design a RESTful Financial API",
            description: "Create comprehensive API with perfect documentation and error handling",
            difficulty: "Medium",
            timeEstimate: "2 weeks",
            impact: "High",
            resources: ["API design patterns", "OpenAPI spec", "Stripe API examples"]
          },
          {
            title: "Build Multi-Currency Support",
            description: "Implement currency conversion and international payment flows",
            difficulty: "Hard",
            timeEstimate: "2 weeks",
            impact: "High",
            resources: ["Currency APIs", "International banking", "Stripe global docs"]
          }
        ]
      }
    ]
  };

  return companyRoadmaps[companyData.name] || companyRoadmaps.Netflix;
}

export default CompanySpecificRoadmap;
