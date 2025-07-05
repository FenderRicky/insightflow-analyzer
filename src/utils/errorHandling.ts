
export class RoadmapGenerationError extends Error {
  constructor(message: string, public code: string) {
    super(message);
    this.name = 'RoadmapGenerationError';
  }
}

export class ProfileValidationError extends Error {
  constructor(message: string, public url: string) {
    super(message);
    this.name = 'ProfileValidationError';
  }
}

export const handleRoadmapError = (error: Error): string => {
  console.error('Roadmap generation error:', error);
  
  if (error instanceof ProfileValidationError) {
    return `Invalid profile URL: ${error.message}`;
  }
  
  if (error instanceof RoadmapGenerationError) {
    switch (error.code) {
      case 'COMPANY_NOT_FOUND':
        return 'Company roadmap not available yet. Try a different company.';
      case 'AI_SERVICE_UNAVAILABLE':
        return 'AI service temporarily unavailable. Please try again in a few minutes.';
      case 'PROFILE_ANALYSIS_FAILED':
        return 'Could not analyze your profile. Please check the URL and try again.';
      default:
        return 'Roadmap generation failed. Please try again.';
    }
  }
  
  return 'An unexpected error occurred. Please try again or contact support.';
};

export const validateAndSanitizeUrl = (url: string): string => {
  const trimmedUrl = url.trim();
  
  if (!trimmedUrl) {
    throw new ProfileValidationError('URL cannot be empty', url);
  }
  
  // Add protocol if missing
  let normalizedUrl = trimmedUrl;
  if (!normalizedUrl.startsWith('http://') && !normalizedUrl.startsWith('https://')) {
    normalizedUrl = 'https://' + normalizedUrl;
  }
  
  // Validate URL format
  try {
    const urlObj = new URL(normalizedUrl);
    
    if (!['linkedin.com', 'github.com'].some(domain => 
      urlObj.hostname.includes(domain)
    )) {
      throw new ProfileValidationError(
        'Only LinkedIn and GitHub profiles are supported', 
        url
      );
    }
    
    return normalizedUrl;
  } catch (e) {
    throw new ProfileValidationError('Invalid URL format', url);
  }
};
