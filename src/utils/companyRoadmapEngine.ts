
import { DeepSeekAnalyzer } from './deepSeekAnalysis';

export interface CompanyRoadmapPhase {
  title: string;
  duration: string;
  description: string;
  skills: string[];
  projects: Array<{
    name: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    timeEstimate: string;
    description: string;
    resources: string[];
    codeExample?: string;
  }>;
}

export interface CompanyRoadmap {
  company: string;
  icon: string;
  color: string;
  description: string;
  phases: CompanyRoadmapPhase[];
  totalDuration: string;
  successRate: number;
  avgSalary: string;
  coreSkills: string[];
  openSourceContributions: string[];
  interviewFocus: string[];
}

export class CompanyRoadmapEngine {
  private static companies = new Map<string, CompanyRoadmap>([
    ['netflix', {
      company: 'Netflix',
      icon: '📺',
      color: 'red',
      description: 'Master distributed systems and streaming architecture',
      totalDuration: '3 months',
      successRate: 83,
      avgSalary: '195K',
      coreSkills: ['Go', 'Envoy', 'gRPC', 'Kubernetes', 'Microservices'],
      openSourceContributions: ['Eureka', 'Hystrix', 'Zuul'],
      interviewFocus: ['System Design', 'Distributed Systems', 'Performance'],
      phases: [
        {
          title: 'Foundation - Microservices Mastery',
          duration: 'Month 1',
          description: 'Build the fundamental skills Netflix engineers need',
          skills: ['Go', 'Docker', 'REST APIs', 'Testing'],
          projects: [
            {
              name: 'Build a Go Microservice',
              difficulty: 'Medium',
              timeEstimate: '2 weeks',
              description: 'Create a high-throughput service using Go with proper logging and metrics',
              resources: ['Go documentation', 'Netflix OSS guides', 'Microservices patterns'],
              codeExample: `package main

import (
    "github.com/gin-gonic/gin"
    "github.com/prometheus/client_golang/prometheus"
)

func main() {
    r := gin.Default()
    r.GET("/health", healthCheck)
    r.Run(":8080")
}`
            }
          ]
        }
      ]
    }],
    ['stripe', {
      company: 'Stripe',
      icon: '💳',
      color: 'purple',
      description: 'Master payment systems and API design excellence',
      totalDuration: '3 months',
      successRate: 76,
      avgSalary: '210K',
      coreSkills: ['Ruby', 'Go', 'PostgreSQL', 'API Design', 'PCI Compliance'],
      openSourceContributions: ['Stripe CLI', 'Stripe Node.js'],
      interviewFocus: ['API Design', 'Payment Systems', 'Security'],
      phases: [
        {
          title: 'Payment Systems Fundamentals',
          duration: 'Month 1',
          description: 'Build expertise in financial technology',
          skills: ['Payment Processing', 'Idempotency', 'Webhooks', 'Security'],
          projects: [
            {
              name: 'Payment Processing System',
              difficulty: 'Hard',
              timeEstimate: '3 weeks',
              description: 'Create a secure payment system with idempotency keys and webhook handling',
              resources: ['Stripe API docs', 'Payment security guides', 'PCI compliance'],
              codeExample: `async function processPayment(paymentData, idempotencyKey) {
  const existing = await findByIdempotencyKey(idempotencyKey);
  if (existing) return existing;
  
  return await createPayment(paymentData, idempotencyKey);
}`
            }
          ]
        }
      ]
    }],
    ['spacex', {
      company: 'SpaceX',
      icon: '🚀',
      color: 'blue',
      description: 'Master embedded systems and real-time programming',
      totalDuration: '4 months',
      successRate: 68,
      avgSalary: '165K',
      coreSkills: ['C++', 'RTOS', 'CAN Bus', 'Embedded Linux', 'Control Systems'],
      openSourceContributions: ['PX4', 'ArduPilot', 'CAN utils'],
      interviewFocus: ['Embedded Systems', 'Real-time Programming', 'Hardware'],
      phases: [
        {
          title: 'Embedded Systems Foundation',
          duration: 'Month 1-2',
          description: 'Build core embedded and real-time programming skills',
          skills: ['C++', 'Real-time OS', 'Hardware Interfaces', 'Testing'],
          projects: [
            {
              name: 'Rocket Telemetry Simulator',
              difficulty: 'Hard',
              timeEstimate: '4 weeks',
              description: 'Simulate rocket telemetry system with CAN bus communication',
              resources: ['CAN protocol specs', 'RTOS documentation', 'Embedded C++ guides'],
              codeExample: `class TelemetrySystem {
  void processCANMessage(CANMessage msg) {
    switch(msg.id) {
      case ALTITUDE_ID:
        updateAltitude(msg.data);
        break;
      case VELOCITY_ID:
        updateVelocity(msg.data);
        break;
    }
  }
};`
            }
          ]
        }
      ]
    }]
  ]);

  static async generatePersonalizedRoadmap(
    profileUrl: string, 
    companyName: string, 
    userSkills: string[] = []
  ): Promise<CompanyRoadmap | null> {
    const baseRoadmap = this.companies.get(companyName.toLowerCase());
    if (!baseRoadmap) return null;

    try {
      // Use AI to personalize the roadmap based on user's profile
      const aiPersonalization = await DeepSeekAnalyzer.analyzeProfile(profileUrl);
      
      // Modify roadmap based on user's existing skills
      const personalizedRoadmap = { ...baseRoadmap };
      personalizedRoadmap.phases = this.adjustPhasesForUser(
        baseRoadmap.phases, 
        userSkills, 
        aiPersonalization.scores
      );

      return personalizedRoadmap;
    } catch (error) {
      console.error('AI personalization failed, returning base roadmap:', error);
      return baseRoadmap;
    }
  }

  private static adjustPhasesForUser(
    phases: CompanyRoadmapPhase[], 
    userSkills: string[], 
    scores: any
  ): CompanyRoadmapPhase[] {
    return phases.map(phase => ({
      ...phase,
      projects: phase.projects.map(project => {
        // Adjust difficulty based on user's existing skills
        const hasRelevantSkills = phase.skills.some(skill => 
          userSkills.some(userSkill => 
            userSkill.toLowerCase().includes(skill.toLowerCase())
          )
        );
        
        return {
          ...project,
          difficulty: hasRelevantSkills && project.difficulty === 'Hard' ? 'Medium' : project.difficulty,
          timeEstimate: hasRelevantSkills ? 
            this.reduceTimeEstimate(project.timeEstimate) : 
            project.timeEstimate
        };
      })
    }));
  }

  private static reduceTimeEstimate(estimate: string): string {
    if (estimate.includes('4 weeks')) return '3 weeks';
    if (estimate.includes('3 weeks')) return '2 weeks';
    if (estimate.includes('2 weeks')) return '1.5 weeks';
    return estimate;
  }

  static getAllCompanies(): string[] {
    return Array.from(this.companies.keys());
  }

  static getCompanyRoadmap(companyName: string): CompanyRoadmap | null {
    return this.companies.get(companyName.toLowerCase()) || null;
  }

  static async validateProfileUrl(url: string): Promise<boolean> {
    const urlPattern = /^https?:\/\/(www\.)?(linkedin\.com\/in\/|github\.com\/)/;
    return urlPattern.test(url);
  }
}
