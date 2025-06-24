
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface AIFeedbackChatbotProps {
  analysisData: any;
  isVisible: boolean;
  onToggle: () => void;
}

const AIFeedbackChatbot = ({ analysisData, isVisible, onToggle }: AIFeedbackChatbotProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Hi! I'm your AI career mentor. I've analyzed your profile and I'm here to help you improve. Ask me anything about your analysis results!`,
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Score-related questions
    if (lowerMessage.includes('score') || lowerMessage.includes('low') || lowerMessage.includes('bad')) {
      return `Based on your analysis, your overall score is ${analysisData.overallScore}/100. The main areas affecting your score are: ${analysisData.sections?.slice(0, 2).map((s: any) => s.title).join(' and ')}. Focus on improving these first for maximum impact.`;
    }
    
    // Improvement questions
    if (lowerMessage.includes('improve') || lowerMessage.includes('better') || lowerMessage.includes('fix')) {
      const topPriority = analysisData.improvementAreas?.[0];
      if (topPriority) {
        return `Your top priority should be: ${topPriority.area}. ${topPriority.action} This could improve your score by ${topPriority.expectedImprovement || '5-10 points'} and take about ${topPriority.timeEstimate || '2-4 hours'}.`;
      }
      return 'Focus on your weakest areas first. Check the Priority Actions section for specific steps you can take today.';
    }
    
    // Skills questions
    if (lowerMessage.includes('skill') || lowerMessage.includes('learn') || lowerMessage.includes('technology')) {
      return 'Based on tier-1 company standards, you should focus on the technologies most relevant to your target role. Check the Skill Gap Radar for specific recommendations tailored to your career path.';
    }
    
    // LinkedIn specific
    if (lowerMessage.includes('linkedin') || lowerMessage.includes('headline') || lowerMessage.includes('summary')) {
      return 'Your LinkedIn profile could benefit from a stronger headline with keywords and quantified achievements. Try this formula: "Role + Technology + Impact + Company". For example: "Senior Developer | React Expert | Built Systems for 1M+ Users | Ex-Google"';
    }
    
    // Portfolio specific
    if (lowerMessage.includes('portfolio') || lowerMessage.includes('website') || lowerMessage.includes('design')) {
      return 'Your portfolio should showcase both technical skills and business impact. Add case studies with: Problem → Solution → Results. Include metrics like "Improved user engagement by 40%" or "Reduced load time by 2 seconds".';
    }
    
    // GitHub specific
    if (lowerMessage.includes('github') || lowerMessage.includes('code') || lowerMessage.includes('repository')) {
      return 'Your GitHub needs better READMEs, more meaningful commit messages, and showcase projects. Each repo should have: clear description, setup instructions, screenshots, and live demo links. Pin your 6 best repositories.';
    }
    
    // Career questions
    if (lowerMessage.includes('job') || lowerMessage.includes('career') || lowerMessage.includes('hire')) {
      return 'To stand out to recruiters: 1) Optimize your headlines with keywords, 2) Add quantified achievements, 3) Showcase relevant projects, 4) Get recommendations from colleagues, 5) Stay active with industry content.';
    }
    
    // Time questions
    if (lowerMessage.includes('time') || lowerMessage.includes('long') || lowerMessage.includes('quick')) {
      return 'Quick wins (1-2 hours): Update LinkedIn headline, add project descriptions with metrics, optimize GitHub profile README. Medium term (1 week): Complete top priority improvements, add 2-3 case studies with results.';
    }
    
    // Default responses based on analysis type
    if (analysisData.type === 'portfolio') {
      return 'Your portfolio shows promise! Focus on adding more case studies with business impact, improving mobile responsiveness, and showcasing your problem-solving process. What specific area would you like help with?';
    } else {
      return 'Your LinkedIn profile has good potential! The key is to add more keywords, quantify your achievements, and show the impact of your work. Which section would you like to improve first?';
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI processing time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateAIResponse(inputValue),
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  if (!isVisible) {
    return (
      <Button
        onClick={onToggle}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-brand-500 to-neon-purple shadow-lg hover:shadow-xl transition-all glow"
        size="icon"
      >
        <MessageSquare className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 z-50 w-96 h-[500px] glass border-white/10 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-brand-500 to-neon-purple flex items-center justify-center">
            <Bot className="h-4 w-4 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">AI Career Mentor</h3>
            <p className="text-xs text-muted-foreground">Ask me about your analysis</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onToggle} className="h-8 w-8">
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg text-sm ${
                message.isUser
                  ? 'bg-gradient-to-r from-brand-500 to-neon-purple text-white'
                  : 'bg-white/10 text-white'
              }`}
            >
              <div className="flex items-start gap-2">
                {!message.isUser && (
                  <Bot className="h-4 w-4 mt-0.5 flex-shrink-0" />
                )}
                <p>{message.text}</p>
                {message.isUser && (
                  <User className="h-4 w-4 mt-0.5 flex-shrink-0" />
                )}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white/10 p-3 rounded-lg text-sm">
              <div className="flex items-center gap-2">
                <Bot className="h-4 w-4" />
                <div className="flex gap-1">
                  <div className="w-1 h-1 bg-white rounded-full animate-bounce"></div>
                  <div className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-white/10">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about your analysis..."
            className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/60"
          />
          <Button onClick={handleSendMessage} size="icon" className="bg-gradient-to-r from-brand-500 to-neon-purple">
            <Send className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Quick suggestions */}
        <div className="flex flex-wrap gap-1 mt-2">
          {['Why low score?', 'Quick fixes?', 'Improve LinkedIn'].map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => setInputValue(suggestion)}
              className="text-xs px-2 py-1 rounded bg-white/10 hover:bg-white/20 transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default AIFeedbackChatbot;
