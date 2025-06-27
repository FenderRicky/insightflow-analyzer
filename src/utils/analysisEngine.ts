
// Enhanced analysis engine with real URL validation and sophisticated pattern matching
export const validateUrl = (url: string): { isValid: boolean; type: string | null; error: string | null } => {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.toLowerCase();
    
    // LinkedIn validation
    if (hostname.includes('linkedin.com')) {
      if (urlObj.pathname.includes('/in/')) {
        return { isValid: true, type: 'linkedin', error: null };
      }
      return { isValid: false, type: null, error: 'Invalid LinkedIn profile URL. Please use format: https://linkedin.com/in/username' };
    }
    
    // GitHub validation
    if (hostname.includes('github.com')) {
      const pathParts = urlObj.pathname.split('/').filter(Boolean);
      if (pathParts.length >= 1) {
        return { isValid: true, type: 'github', error: null };
      }
      return { isValid: false, type: null, error: 'Invalid GitHub URL. Please provide a valid GitHub profile or repository URL' };
    }
    
    // Portfolio validation (any other valid URL)
    if (hostname && !hostname.includes('localhost')) {
      return { isValid: true, type: 'portfolio', error: null };
    }
    
    return { isValid: false, type: null, error: 'Please provide a valid URL (must include http:// or https://)' };
  } catch {
    return { isValid: false, type: null, error: 'Invalid URL format. Please check your URL and try again.' };
  }
};

export const extractKeywordsFromUrl = (url: string, type: string): string[] => {
  const urlLower = url.toLowerCase();
  const keywords: string[] = [];
  
  // Tech stack detection from URL patterns
  const techPatterns = {
    'react': /react|reactjs/i,
    'vue': /vue|vuejs/i,
    'angular': /angular/i,
    'node': /node|nodejs/i,
    'python': /python|django|flask/i,
    'javascript': /js|javascript/i,
    'typescript': /ts|typescript/i,
    'next': /next|nextjs/i,
    'nuxt': /nuxt/i,
    'svelte': /svelte/i,
    'express': /express/i,
    'mongodb': /mongo|mongodb/i,
    'postgresql': /postgres|postgresql/i,
    'mysql': /mysql/i,
    'redis': /redis/i,
    'docker': /docker/i,
    'kubernetes': /k8s|kubernetes/i,
    'aws': /aws|amazon/i,
    'azure': /azure/i,
    'gcp': /gcp|google-cloud/i
  };
  
  Object.entries(techPatterns).forEach(([tech, pattern]) => {
    if (pattern.test(urlLower)) {
      keywords.push(tech);
    }
  });
  
  return keywords;
};

export const analyzeUrlStructure = (url: string, type: string) => {
  const urlObj = new URL(url);
  const pathParts = urlObj.pathname.split('/').filter(Boolean);
  
  const analysis = {
    hasCustomDomain: !urlObj.hostname.includes('github.io') && !urlObj.hostname.includes('netlify.app') && !urlObj.hostname.includes('vercel.app'),
    pathDepth: pathParts.length,
    hasProjects: urlObj.pathname.includes('project') || urlObj.pathname.includes('work'),
    hasAbout: urlObj.pathname.includes('about') || urlObj.pathname.includes('bio'),
    hasContact: urlObj.pathname.includes('contact'),
    hasBlog: urlObj.pathname.includes('blog') || urlObj.pathname.includes('articles'),
    isHttps: urlObj.protocol === 'https:',
    domainLength: urlObj.hostname.length
  };
  
  return analysis;
};

export const generateDynamicAnalysis = (url: string, type: string, userContext: any) => {
  const validation = validateUrl(url);
  if (!validation.isValid) {
    return {
      error: validation.error,
      isValid: false
    };
  }
  
  const detectedKeywords = extractKeywordsFromUrl(url, type);
  const urlStructure = analyzeUrlStructure(url, type);
  
  // Dynamic scoring based on actual URL analysis
  const baseScore = 60;
  let scoreModifiers = 0;
  
  // URL structure bonuses
  if (urlStructure.isHttps) scoreModifiers += 5;
  if (urlStructure.hasCustomDomain) scoreModifiers += 10;
  if (urlStructure.hasProjects) scoreModifiers += 8;
  if (urlStructure.hasAbout) scoreModifiers += 5;
  if (urlStructure.hasContact) scoreModifiers += 3;
  if (urlStructure.hasBlog) scoreModifiers += 7;
  
  // Keyword bonuses
  scoreModifiers += Math.min(detectedKeywords.length * 2, 15);
  
  const finalScore = Math.min(baseScore + scoreModifiers, 100);
  
  return {
    isValid: true,
    score: finalScore,
    detectedTech: detectedKeywords,
    urlAnalysis: urlStructure,
    recommendations: generateSmartRecommendations(type, urlStructure, detectedKeywords, userContext)
  };
};

const generateSmartRecommendations = (type: string, urlStructure: any, detectedTech: string[], userContext: any) => {
  const recommendations: string[] = [];
  
  if (!urlStructure.isHttps) {
    recommendations.push("Enable HTTPS for security and SEO benefits");
  }
  
  if (!urlStructure.hasCustomDomain && type === 'portfolio') {
    recommendations.push("Consider getting a custom domain for professional branding");
  }
  
  if (!urlStructure.hasProjects && type === 'portfolio') {
    recommendations.push("Add a dedicated projects section to showcase your work");
  }
  
  if (!urlStructure.hasAbout) {
    recommendations.push("Include an about section to tell your professional story");
  }
  
  if (detectedTech.length < 3) {
    recommendations.push("Showcase more technologies in your project names or descriptions");
  }
  
  if (type === 'github' && urlStructure.pathDepth < 2) {
    recommendations.push("Create more repositories to demonstrate diverse skills");
  }
  
  return recommendations;
};
