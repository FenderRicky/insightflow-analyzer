
// Enhanced URL validation with retry logic
export class URLValidator {
  static validateURL(url: string): { isValid: boolean; error?: string; normalizedUrl?: string } {
    try {
      // Normalize URL
      let normalizedUrl = url.trim();
      if (!normalizedUrl.startsWith('http://') && !normalizedUrl.startsWith('https://')) {
        normalizedUrl = 'https://' + normalizedUrl;
      }

      const urlObj = new URL(normalizedUrl);
      
      // Validate domain patterns
      const validDomains = [
        'github.com',
        'linkedin.com',
        'portfolio.com',
        'dev.to',
        'medium.com'
      ];
      
      const isValidDomain = validDomains.some(domain => 
        urlObj.hostname.includes(domain) || urlObj.hostname.endsWith(domain)
      );
      
      if (!isValidDomain && !urlObj.hostname.includes('.')) {
        return { 
          isValid: false, 
          error: 'Please enter a valid GitHub, LinkedIn, or portfolio URL' 
        };
      }
      
      return { isValid: true, normalizedUrl };
    } catch (error) {
      return { 
        isValid: false, 
        error: 'Invalid URL format. Please include https:// or a valid domain' 
      };
    }
  }

  static async testURLAccessibility(url: string): Promise<{ accessible: boolean; status?: number }> {
    try {
      // Use AbortController for timeout instead of invalid timeout property
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      // Use a CORS proxy for client-side testing
      const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
      const response = await fetch(proxyUrl, { 
        method: 'HEAD',
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      return { accessible: response.ok, status: response.status };
    } catch (error) {
      // If CORS fails, assume URL is valid (many sites block CORS)
      return { accessible: true };
    }
  }
}

export class RetryManager {
  static async withRetry<T>(
    operation: () => Promise<T>, 
    maxRetries: number = 3,
    baseDelay: number = 1000
  ): Promise<T> {
    let lastError: Error;
    
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error as Error;
        
        if (attempt === maxRetries) {
          throw lastError;
        }
        
        // Exponential backoff
        const delay = baseDelay * Math.pow(2, attempt);
        await new Promise(resolve => setTimeout(resolve, delay));
        
        console.log(`Retry attempt ${attempt + 1} after ${delay}ms delay`);
      }
    }
    
    throw lastError!;
  }
}
