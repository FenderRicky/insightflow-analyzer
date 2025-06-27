
export interface PortfolioTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
  preview: string;
  features: string[];
  techStack: string[];
  targetRole: string;
  estimatedTime: string;
  popularity: number;
  template: {
    colors: {
      primary: string;
      secondary: string;
      accent: string;
      background: string;
      text: string;
    };
    layout: string;
    sections: string[];
    fonts: {
      heading: string;
      body: string;
    };
  };
}

export const enhancedPortfolioTemplates: PortfolioTemplate[] = [
  {
    id: 'modern-minimalist',
    name: 'Modern Minimalist',
    category: 'Developer',
    description: 'Clean, modern design focusing on content over flashiness. Perfect for developers who want to showcase their work professionally.',
    difficulty: 'Beginner',
    tags: ['Clean', 'Modern', 'Professional', 'Responsive'],
    preview: '/templates/modern-minimalist.png',
    features: ['Responsive Design', 'Dark/Light Mode', 'Smooth Animations', 'SEO Optimized'],
    techStack: ['HTML', 'CSS', 'JavaScript', 'React'],
    targetRole: 'Full Stack Developer',
    estimatedTime: '2-3 hours',
    popularity: 95,
    template: {
      colors: {
        primary: '#2563eb',
        secondary: '#64748b',
        accent: '#06b6d4',
        background: '#ffffff',
        text: '#1e293b'
      },
      layout: 'grid',
      sections: ['Hero', 'About', 'Skills', 'Projects', 'Contact'],
      fonts: {
        heading: 'Inter',
        body: 'Inter'
      }
    }
  },
  {
    id: 'creative-designer',
    name: 'Creative Designer',
    category: 'Designer',
    description: 'Bold, creative portfolio template with stunning visuals and interactive elements. Perfect for UI/UX designers and creative professionals.',
    difficulty: 'Intermediate',
    tags: ['Creative', 'Interactive', 'Visual', 'Bold'],
    preview: '/templates/creative-designer.png',
    features: ['Interactive Animations', 'Portfolio Gallery', 'Case Study Layouts', 'Color Palette Showcase'],
    techStack: ['HTML', 'CSS', 'JavaScript', 'Framer Motion', 'React'],
    targetRole: 'UI/UX Designer',
    estimatedTime: '4-5 hours',
    popularity: 88,
    template: {
      colors: {
        primary: '#7c3aed',
        secondary: '#ec4899',
        accent: '#f59e0b',
        background: '#0f0f23',
        text: '#ffffff'
      },
      layout: 'masonry',
      sections: ['Hero', 'Portfolio', 'About', 'Process', 'Contact'],
      fonts: {
        heading: 'Poppins',
        body: 'Open Sans'
      }
    }
  },
  {
    id: 'tech-lead',
    name: 'Tech Leadership',
    category: 'Leadership',
    description: 'Executive-style portfolio for senior developers and tech leads. Emphasizes leadership experience and architectural decisions.',
    difficulty: 'Advanced',
    tags: ['Executive', 'Leadership', 'Professional', 'Corporate'],
    preview: '/templates/tech-lead.png',
    features: ['Team Showcase', 'Architecture Diagrams', 'Impact Metrics', 'Speaking Engagements'],
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    targetRole: 'Tech Lead / Engineering Manager',
    estimatedTime: '6-8 hours',
    popularity: 76,
    template: {
      colors: {
        primary: '#1f2937',
        secondary: '#374151',
        accent: '#10b981',
        background: '#f9fafb',
        text: '#111827'
      },
      layout: 'corporate',
      sections: ['Executive Summary', 'Leadership Experience', 'Technical Vision', 'Team Success', 'Speaking'],
      fonts: {
        heading: 'Playfair Display',
        body: 'Source Sans Pro'
      }
    }
  },
  {
    id: 'startup-founder',
    name: 'Startup Founder',
    category: 'Entrepreneur',
    description: 'Dynamic portfolio for entrepreneurs and startup founders. Highlights ventures, achievements, and vision.',
    difficulty: 'Advanced',
    tags: ['Entrepreneur', 'Dynamic', 'Results-Driven', 'Innovative'],
    preview: '/templates/startup-founder.png',
    features: ['Venture Timeline', 'Success Metrics', 'Media Coverage', 'Investor Relations'],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Chart.js'],
    targetRole: 'Startup Founder / Entrepreneur',
    estimatedTime: '5-7 hours',
    popularity: 82,
    template: {
      colors: {
        primary: '#dc2626',
        secondary: '#ef4444',
        accent: '#fbbf24',
        background: '#ffffff',
        text: '#1f2937'
      },
      layout: 'timeline',
      sections: ['Vision', 'Ventures', 'Achievements', 'Media', 'Contact'],
      fonts: {
        heading: 'Montserrat',
        body: 'Lato'
      }
    }
  },
  {
    id: 'data-scientist',
    name: 'Data Science Pro',
    category: 'Data Science',
    description: 'Analytical portfolio template showcasing data projects, visualizations, and machine learning models.',
    difficulty: 'Intermediate',
    tags: ['Analytical', 'Data-Driven', 'Scientific', 'Technical'],
    preview: '/templates/data-scientist.png',
    features: ['Interactive Charts', 'Model Demonstrations', 'Research Papers', 'Dataset Showcases'],
    techStack: ['Python', 'Jupyter', 'D3.js', 'React', 'Plotly'],
    targetRole: 'Data Scientist / ML Engineer',
    estimatedTime: '4-6 hours',
    popularity: 79,
    template: {
      colors: {
        primary: '#0369a1',
        secondary: '#0284c7',
        accent: '#06b6d4',
        background: '#f8fafc',
        text: '#0f172a'
      },
      layout: 'dashboard',
      sections: ['Research', 'Projects', 'Visualizations', 'Publications', 'Tools'],
      fonts: {
        heading: 'Roboto Slab',
        body: 'Roboto'
      }
    }
  },
  {
    id: 'mobile-developer',
    name: 'Mobile App Developer',
    category: 'Mobile',
    description: 'Mobile-first portfolio template perfect for iOS and Android developers. Features app showcases and mobile design patterns.',
    difficulty: 'Intermediate',
    tags: ['Mobile-First', 'App Showcase', 'Responsive', 'Modern'],
    preview: '/templates/mobile-developer.png',
    features: ['App Store Links', 'Device Mockups', 'Feature Videos', 'Download Statistics'],
    techStack: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'React'],
    targetRole: 'Mobile App Developer',
    estimatedTime: '3-5 hours',
    popularity: 85,
    template: {
      colors: {
        primary: '#6366f1',
        secondary: '#8b5cf6',
        accent: '#ec4899',
        background: '#ffffff',
        text: '#374151'
      },
      layout: 'mobile-first',
      sections: ['Apps', 'Features', 'Technologies', 'Reviews', 'Contact'],
      fonts: {
        heading: 'SF Pro Display',
        body: 'SF Pro Text'
      }
    }
  },
  {
    id: 'game-developer',
    name: 'Game Developer',
    category: 'Gaming',
    description: 'Interactive portfolio for game developers with playable demos, game showcases, and immersive design.',
    difficulty: 'Advanced',
    tags: ['Interactive', 'Gaming', 'Immersive', 'Creative'],
    preview: '/templates/game-developer.png',
    features: ['Playable Demos', 'Game Trailers', '3D Showcase', 'Achievement System'],
    techStack: ['Unity', 'Unreal Engine', 'WebGL', 'Three.js', 'React'],
    targetRole: 'Game Developer',
    estimatedTime: '6-10 hours',
    popularity: 73,
    template: {
      colors: {
        primary: '#7c2d12',
        secondary: '#ea580c',
        accent: '#fbbf24',
        background: '#0c0a09',
        text: '#ffffff'
      },
      layout: 'immersive',
      sections: ['Games', 'Demos', 'Skills', 'Process', 'Community'],
      fonts: {
        heading: 'Orbitron',
        body: 'Exo 2'
      }
    }
  },
  {
    id: 'devops-engineer',
    name: 'DevOps Engineer',
    category: 'DevOps',
    description: 'Technical portfolio emphasizing infrastructure, automation, and system reliability. Perfect for DevOps and Cloud engineers.',
    difficulty: 'Advanced',
    tags: ['Technical', 'Infrastructure', 'Automation', 'Cloud'],
    preview: '/templates/devops-engineer.png',
    features: ['Architecture Diagrams', 'Monitoring Dashboards', 'Automation Scripts', 'Cloud Certifications'],
    techStack: ['Docker', 'Kubernetes', 'AWS', 'Terraform', 'React'],
    targetRole: 'DevOps Engineer / Cloud Architect',
    estimatedTime: '5-7 hours',
    popularity: 71,
    template: {
      colors: {
        primary: '#059669',
        secondary: '#047857',
        accent: '#10b981',
        background: '#f0fdf4',
        text: '#064e3b'
      },
      layout: 'technical',
      sections: ['Infrastructure', 'Automation', 'Monitoring', 'Certifications', 'Tools'],
      fonts: {
        heading: 'JetBrains Mono',
        body: 'Source Code Pro'
      }
    }
  }
];

export const getTemplatesByCategory = (category: string) => {
  return enhancedPortfolioTemplates.filter(template => template.category === category);
};

export const getTemplateById = (id: string) => {
  return enhancedPortfolioTemplates.find(template => template.id === id);
};

export const getPopularTemplates = (limit: number = 5) => {
  return enhancedPortfolioTemplates
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, limit);
};

export const searchTemplates = (query: string) => {
  const lowerQuery = query.toLowerCase();
  return enhancedPortfolioTemplates.filter(template =>
    template.name.toLowerCase().includes(lowerQuery) ||
    template.description.toLowerCase().includes(lowerQuery) ||
    template.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
    template.techStack.some(tech => tech.toLowerCase().includes(lowerQuery))
  );
};
