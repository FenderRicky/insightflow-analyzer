// Simple error tracking utility (replace with Sentry in production)
export class ErrorTracker {
  static track(error: Error, context?: any) {
    console.error('Error tracked:', error, context);
    
    // In production, send to Sentry or your error tracking service
    // Sentry.captureException(error, { extra: context });
    
    // For now, store in localStorage for debugging
    const errorLog = {
      timestamp: new Date().toISOString(),
      message: error.message,
      stack: error.stack,
      context,
      userAgent: navigator.userAgent,
      url: window.location.href
    };
    
    const existingLogs = JSON.parse(localStorage.getItem('errorLogs') || '[]');
    existingLogs.push(errorLog);
    
    // Keep only last 50 errors
    if (existingLogs.length > 50) {
      existingLogs.splice(0, existingLogs.length - 50);
    }
    
    localStorage.setItem('errorLogs', JSON.stringify(existingLogs));
  }

  static getLogs() {
    return JSON.parse(localStorage.getItem('errorLogs') || '[]');
  }

  static clearLogs() {
    localStorage.removeItem('errorLogs');
  }
}

// Enhanced URL analysis with error tracking
export async function analyzeUrlWithErrorTracking(url: string, type: string) {
  try {
    // Validate URL format
    new URL(url);
    
    // Mock analysis with potential failure points
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, type })
    });
    
    if (!response.ok) {
      throw new Error(`Analysis failed: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
    
  } catch (error) {
    ErrorTracker.track(error as Error, { url, type, action: 'url_analysis' });
    
    // Return mock data for demo purposes
    return {
      success: false,
      error: 'Analysis temporarily unavailable. Using demo data.',
      mockData: true
    };
  }
}
