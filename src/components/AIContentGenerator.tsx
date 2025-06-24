import React, { useState } from 'react';
import { Wand2, Copy, RefreshCw, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface GeneratedContent {
  type: 'headline' | 'summary' | 'readme' | 'about';
  content: string;
  tone: string;
}

interface AIContentGeneratorProps {
  userProfile: {
    skills: string[];
    experience: string;
    role: string;
  };
  careerGoal: string;
}

const AIContentGenerator = ({ userProfile, careerGoal }: AIContentGeneratorProps) => {
  const [selectedType, setSelectedType] = useState<string>('headline');
  const [selectedTone, setSelectedTone] = useState<string>('professional');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const { toast } = useToast();

  const contentTypes = [
    { value: 'headline', label: 'LinkedIn Headline', icon: '💼' },
    { value: 'summary', label: 'LinkedIn Summary', icon: '📝' },
    { value: 'readme', label: 'GitHub README', icon: '📋' },
    { value: 'about', label: 'Portfolio About Section', icon: '👤' }
  ];

  const tones = [
    { value: 'professional', label: 'Professional', desc: 'Corporate-friendly, polished' },
    { value: 'minimal', label: 'Minimal', desc: 'Clean, concise, direct' },
    { value: 'bold', label: 'Bold', desc: 'Confident, attention-grabbing' },
    { value: 'friendly', label: 'Friendly', desc: 'Approachable, personable' }
  ];

  const generateContent = async () => {
    setIsGenerating(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockContent = generateMockContent(selectedType, selectedTone);
      setGeneratedContent({
        type: selectedType as any,
        content: mockContent,
        tone: selectedTone
      });
      setIsGenerating(false);
    }, 2000);
  };

  const generateMockContent = (type: string, tone: string): string => {
    const templates = {
      headline: {
        professional: "Senior Full-Stack Engineer | React & Node.js Expert | Building Scalable Systems for 1M+ Users | Ex-Tech Giant",
        minimal: "Full-Stack Engineer | React + Node.js | Scale & Performance",
        bold: "🚀 Senior Engineer Building the Future | React/Node.js | 5+ Years Scaling to Millions",
        friendly: "Passionate Full-Stack Developer | Love building with React & Node.js | Always learning, always growing"
      },
      summary: {
        professional: `I'm a Senior Full-Stack Engineer with 5+ years of experience building scalable web applications that serve millions of users. 

At my current role, I led a team of 6 engineers to rebuild our core platform, resulting in 40% faster load times and 25% higher user engagement. My expertise spans React, Node.js, PostgreSQL, and AWS.

Key achievements:
• Architected microservices handling 10M+ requests/day
• Reduced system downtime by 60% through improved monitoring
• Mentored 15+ junior developers, with 80% receiving promotions

I'm passionate about clean code, system design, and building products that make a real impact. Always excited to tackle new challenges and collaborate with great teams.

Let's connect if you're building something interesting!`,
        minimal: `Full-Stack Engineer with 5+ years experience. Built systems serving 1M+ users.

Tech: React, Node.js, PostgreSQL, AWS
Impact: 40% faster apps, 60% less downtime, 25% higher engagement

Currently leading platform architecture at [Company]. Interested in scalable systems and great user experiences.`,
        bold: `🚀 I DON'T JUST CODE—I BUILD DIGITAL EXPERIENCES THAT SCALE

5+ years turning ideas into reality. My code serves millions of users daily.

RECENT WINS:
⚡ Led 6-person team → rebuilt platform → 40% faster, 25% more engaging
🏗️ Architected microservices → 10M+ requests/day, bulletproof reliability  
👥 Mentored 15+ developers → 80% got promoted (I'm proud of this!)

OBSESSED WITH: React ecosystems, Node.js performance, AWS optimization, and products that actually matter.

Ready for the next big challenge. Let's build something incredible together! 💪`,
        friendly: `Hey there! 👋 I'm a Full-Stack Engineer who loves turning coffee into code and ideas into reality.

For the past 5+ years, I've been building web applications that millions of people use every day. My sweet spot is React and Node.js, but I'm always excited to learn new technologies!

Some fun stuff I've worked on:
🎯 Led a team rebuild that made our app 40% faster (users love it!)
🏗️ Built systems that handle 10M+ requests daily (still amazes me)
🌱 Helped 15+ junior devs grow their careers (my favorite part of the job)

When I'm not coding, you'll find me hiking, trying new coffee shops, or contributing to open source projects.

Always up for interesting conversations about tech, startups, or the best pizza in town! Feel free to reach out. 😊`
      },
      readme: {
        professional: `# Project Name

A comprehensive full-stack application built with React and Node.js, designed for scalability and performance.

## 🚀 Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Real-time Updates**: WebSocket implementation for live data
- **Secure Authentication**: JWT-based auth with role management
- **Database Integration**: PostgreSQL with optimized queries
- **API Documentation**: Comprehensive Swagger/OpenAPI docs

## 🛠️ Tech Stack

**Frontend:** React 18, TypeScript, Tailwind CSS, Zustand
**Backend:** Node.js, Express, PostgreSQL, Redis
**DevOps:** Docker, GitHub Actions, AWS EC2

## 📊 Performance

- **98+ Lighthouse Score**: Optimized for performance and accessibility
- **Sub-200ms API Response**: Efficient database queries and caching
- **99.9% Uptime**: Robust error handling and monitoring

## 🚀 Quick Start

\`\`\`bash
# Clone the repository
git clone https://github.com/username/project-name.git

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Start development server
npm run dev
\`\`\`

## 📸 Screenshots

![Homepage](./screenshots/homepage.png)
![Dashboard](./screenshots/dashboard.png)

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.`,
        minimal: `# Project Name

Full-stack React + Node.js application.

## Stack
- React, TypeScript, Tailwind
- Node.js, Express, PostgreSQL
- Docker, AWS

## Setup
\`\`\`bash
npm install
cp .env.example .env
npm run dev
\`\`\`

## Features
- Authentication & authorization
- Real-time updates
- Responsive design
- API documentation

Live demo: [project-name.com](https://project-name.com)`,
        bold: `# 🚀 PROJECT NAME - NEXT-GEN WEB APP

> **Building the future, one line of code at a time**

## ⚡ What Makes This Special

🎯 **LIGHTNING FAST** - Sub-200ms response times  
🛡️ **BULLETPROOF** - 99.9% uptime, enterprise-grade security  
📱 **UNIVERSAL** - Works flawlessly on every device  
🔥 **MODERN STACK** - Built with cutting-edge technologies  

## 🛠️ TECH ARSENAL

| Frontend | Backend | DevOps |
|----------|---------|--------|
| ⚛️ React 18 | 🟢 Node.js | 🐳 Docker |
| 📘 TypeScript | ⚡ Express | ☁️ AWS |
| 🎨 Tailwind CSS | 🐘 PostgreSQL | 🚀 GitHub Actions |

## 🎬 LIVE DEMO
👉 **[See it in action](https://project-name.com)** 👈

## ⚡ QUICK START
\`\`\`bash
git clone https://github.com/username/project-name.git
npm install && npm run dev
# 🎉 You're ready to rock!
\`\`\`

**⭐ Star this repo if you found it useful!**`,
        friendly: `# 👋 Welcome to My Project!

Hey there! Thanks for checking out my little corner of GitHub. This is a full-stack web app I built with lots of ☕ and a bit of 🎵.

## 🌟 What's This About?

This project started as a personal challenge to build something really useful. It's a [brief description] that helps people [main benefit]. Along the way, I learned a ton about React, Node.js, and how to make things that don't break! 😅

## 🎨 Built With Love Using

- **React** - Because components are awesome
- **Node.js** - JavaScript everywhere! 
- **PostgreSQL** - Reliable data storage
- **Tailwind CSS** - Making things pretty without the CSS headaches

## 🚀 Want to Try It Out?

\`\`\`bash
# Get the code
git clone https://github.com/username/project-name.git

# Install the magic
npm install

# Copy the secrets (don't worry, they're not real secrets)
cp .env.example .env

# Fire it up!
npm run dev
\`\`\`

## 📱 Screenshots

[Include some nice screenshots here - people love visuals!]

## 🤝 Wanna Help Out?

Found a bug? Have a cool idea? I'd love to hear from you! Feel free to open an issue or send a PR. First-time contributors are especially welcome! 

## 📧 Let's Chat!

Questions? Ideas? Just want to say hi? Reach out at [your-email] or find me on [social platforms].

Thanks for stopping by! 🙏`
      },
      about: {
        professional: `I'm a passionate Full-Stack Engineer with 5+ years of experience building scalable web applications that serve millions of users worldwide.

My expertise spans the entire development lifecycle, from initial concept and design to deployment and maintenance. I specialize in React, Node.js, and cloud architecture, with a strong focus on performance optimization and user experience.

## Professional Experience

At my current role, I lead a team of 6 engineers developing mission-critical applications. Some highlights include:

• **Platform Rebuild**: Led complete architecture overhaul resulting in 40% performance improvement
• **Scalability**: Built microservices handling 10M+ requests daily with 99.9% uptime
• **Team Leadership**: Mentored 15+ developers, with 80% receiving promotions within 2 years

## Technical Expertise

**Frontend**: React, TypeScript, Next.js, Tailwind CSS, Redux
**Backend**: Node.js, Express, PostgreSQL, MongoDB, Redis
**Cloud**: AWS, Docker, Kubernetes, CI/CD pipelines
**Tools**: Git, Jest, Webpack, Figma, Linear

## Philosophy

I believe great software comes from understanding both the technical challenges and the human needs behind them. I'm passionate about writing clean, maintainable code and building products that make a real difference in people's lives.

Always excited to take on new challenges and collaborate with teams that share a vision for excellence.`,
        minimal: `Full-Stack Engineer. 5+ years building scalable web applications.

**Focus**: React, Node.js, system architecture, performance optimization.

**Recent impact**: Led team rebuild → 40% faster platform serving 1M+ users.

**Approach**: Clean code, user-first design, continuous learning.

Currently interested in: distributed systems, real-time applications, developer tools.`,
        bold: `🚀 I BUILD DIGITAL EXPERIENCES THAT SCALE AND PERFORM

I'm not just another developer—I'm a problem-solver who happens to love code.

**THE NUMBERS:**
• 5+ years turning ideas into reality
• 1M+ users interact with my code daily  
• 40% performance improvements through smart architecture
• 15+ developers mentored and promoted

**WHAT DRIVES ME:**
Building things that matter. Whether it's shaving 2 seconds off a page load or architecting systems that handle millions of requests, I obsess over the details that create exceptional user experiences.

**MY SUPERPOWER:**
Taking complex business problems and turning them into elegant, scalable solutions. I speak both developer and business fluent, which means I build what actually needs to be built.

**TECH I'M PASSIONATE ABOUT:**
React ecosystems • Node.js performance • AWS architecture • Real-time systems • Developer experience

Ready to build something incredible together? Let's talk.`,
        friendly: `Hey there! 👋

I'm a Full-Stack Engineer who loves turning ideas into digital reality. For the past 5+ years, I've been building web applications that millions of people use every day—and honestly, it still feels pretty magical! ✨

## What I Love Building

I'm passionate about creating applications that are not just functional, but delightful to use. My sweet spot is React and Node.js, but I'm always excited to learn new technologies and approaches.

Some recent projects I'm proud of:
🎯 Led a platform rebuild that made our app 40% faster (our users definitely noticed!)
🏗️ Built real-time systems handling millions of requests (still amazes me when I think about it)
🌱 Mentored junior developers—watching them grow is honestly the best part of my job

## How I Work

I believe the best software comes from really understanding the people who'll use it. I love collaborating with designers, product managers, and other engineers to create something that's both technically solid and genuinely useful.

My approach: start with empathy, build with purpose, iterate with feedback.

## Beyond Code

When I'm not coding, you'll find me hiking local trails, experimenting with new coffee brewing methods, or contributing to open source projects. I'm also slightly obsessed with mechanical keyboards (ask me about switches! 😄).

Always up for interesting conversations about technology, startups, or the best local coffee shops. Feel free to reach out!`
      }
    };

    return templates[type as keyof typeof templates][tone as keyof typeof templates.headline] || "Content generation failed. Please try again.";
  };

  const copyToClipboard = async () => {
    if (generatedContent) {
      await navigator.clipboard.writeText(generatedContent.content);
      toast({
        title: "Copied to clipboard",
        description: "Content has been copied to your clipboard",
      });
    }
  };

  const regenerateContent = () => {
    generateContent();
  };

  return (
    <Card className="glass border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wand2 className="h-5 w-5 text-purple-400" />
          AI Content Generator
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Generate professional content optimized for tier-1 company standards
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Content Type Selection */}
        <div>
          <label className="text-sm font-medium mb-2 block">Content Type</label>
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="bg-white/10 border-white/20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {contentTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.icon} {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Tone Selection */}
        <div>
          <label className="text-sm font-medium mb-2 block">Tone & Style</label>
          <Select value={selectedTone} onValueChange={setSelectedTone}>
            <SelectTrigger className="bg-white/10 border-white/20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {tones.map((tone) => (
                <SelectItem key={tone.value} value={tone.value}>
                  <div>
                    <div className="font-medium">{tone.label}</div>
                    <div className="text-xs text-muted-foreground">{tone.desc}</div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Generate Button */}
        <Button 
          onClick={generateContent}
          disabled={isGenerating}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500"
        >
          {isGenerating ? (
            <>
              <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
              Generating...
            </>
          ) : (
            <>
              <Wand2 className="h-4 w-4 mr-2" />
              Generate Content
            </>
          )}
        </Button>

        {/* Generated Content */}
        {generatedContent && (
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="glass">
                  {contentTypes.find(t => t.value === generatedContent.type)?.label}
                </Badge>
                <Badge variant="outline" className="glass">
                  {tones.find(t => t.value === generatedContent.tone)?.label}
                </Badge>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={regenerateContent} className="glass">
                  <RefreshCw className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={copyToClipboard} className="glass">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Textarea
              value={generatedContent.content}
              onChange={(e) => setGeneratedContent({...generatedContent, content: e.target.value})}
              className="min-h-[200px] bg-white/10 border-white/20 font-mono text-sm"
              placeholder="Generated content will appear here..."
            />

            <div className="flex gap-2">
              <Button variant="outline" className="glass flex-1">
                <Download className="h-4 w-4 mr-2" />
                Download as File
              </Button>
              <Button className="bg-gradient-to-r from-green-500 to-emerald-500 flex-1">
                Use This Content
              </Button>
            </div>
          </div>
        )}

        {/* Tips */}
        <div className="mt-4 p-3 bg-brand-500/10 border border-brand-500/20 rounded-lg">
          <h4 className="font-medium text-sm mb-1">💡 Pro Tips</h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Customize the generated content to match your specific experience</li>
            <li>• Include quantified achievements and specific technologies</li>
            <li>• Test different tones to see what resonates with your audience</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIContentGenerator;
