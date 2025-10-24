import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { link } = await req.json();
    console.log('Analyzing link:', link);

    if (!link || typeof link !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Invalid link provided' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Detect link type
    const type = detectLinkType(link);
    console.log('Detected type:', type);

    // Get AI analysis
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    const systemPrompt = getSystemPrompt(type);
    const userPrompt = `Analyze this ${type} profile: ${link}

Based on the URL and typical ${type} patterns, provide:
1. An overall professional score (0-100)
2. Key strengths (3-5 points)
3. Critical gaps or weaknesses (3-5 points)
4. Actionable recommendations (3-5 specific steps)
5. Industry benchmark comparison

Be specific, actionable, and motivational. Focus on real insights.`;

    console.log('Calling Lovable AI...');
    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('AI API error:', aiResponse.status, errorText);
      
      if (aiResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again in a moment.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      if (aiResponse.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI credits exhausted. Please add credits to continue.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      throw new Error(`AI API returned ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    const aiAnalysis = aiData.choices[0].message.content;
    console.log('AI Analysis received');

    // Parse AI response and structure it
    const structuredFeedback = parseAIResponse(aiAnalysis, type);
    
    // Calculate score from AI analysis (extract or estimate)
    const score = extractScore(aiAnalysis);

    // Store in Supabase
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: result, error: dbError } = await supabase
      .from('analysis_results')
      .insert({
        link,
        type,
        score,
        feedback: structuredFeedback,
        user_id: null, // Anonymous for now
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      throw dbError;
    }

    console.log('Analysis stored successfully');

    return new Response(
      JSON.stringify({
        id: result.id,
        type,
        score,
        feedback: structuredFeedback,
        rawAnalysis: aiAnalysis,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Analysis error:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Analysis failed. Please try again.',
        details: error instanceof Error ? error.stack : undefined
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

function detectLinkType(link: string): string {
  const url = link.toLowerCase();
  if (url.includes('linkedin.com')) return 'linkedin';
  if (url.includes('github.com')) return 'github';
  return 'portfolio';
}

function getSystemPrompt(type: string): string {
  const prompts = {
    linkedin: `You are an expert LinkedIn career coach and recruiter with 15+ years of experience. 
Analyze LinkedIn profiles for professional presentation, keyword optimization, experience depth, 
skills alignment, and hireability. Compare against top performers in tech industries.`,
    
    github: `You are a senior engineering manager and open-source contributor reviewer.
Analyze GitHub profiles for code quality, contribution consistency, project diversity,
documentation standards, and technical depth. Compare against industry best practices.`,
    
    portfolio: `You are a UX/UI expert and web developer with expertise in portfolio design.
Analyze portfolio websites for visual design, user experience, technical implementation,
project showcase quality, and professional presentation. Compare against award-winning portfolios.`
  };
  
  return prompts[type] || prompts.portfolio;
}

function parseAIResponse(analysis: string, type: string): any {
  // Structure the AI response into organized sections
  return {
    summary: extractSection(analysis, ['summary', 'overview', 'impression']),
    strengths: extractListItems(analysis, ['strengths', 'strong points', 'positive']),
    weaknesses: extractListItems(analysis, ['weaknesses', 'gaps', 'areas for improvement']),
    recommendations: extractListItems(analysis, ['recommendations', 'suggestions', 'action items']),
    benchmark: extractSection(analysis, ['benchmark', 'comparison', 'industry standard']),
    fullAnalysis: analysis,
  };
}

function extractSection(text: string, keywords: string[]): string {
  const lines = text.split('\n');
  let capturing = false;
  let result = '';
  
  for (const line of lines) {
    const lowerLine = line.toLowerCase();
    if (keywords.some(kw => lowerLine.includes(kw))) {
      capturing = true;
      continue;
    }
    if (capturing) {
      if (line.trim() === '' || line.match(/^\d+\./)) {
        break;
      }
      result += line + '\n';
    }
  }
  
  return result.trim() || 'Analysis in progress...';
}

function extractListItems(text: string, keywords: string[]): string[] {
  const lines = text.split('\n');
  let capturing = false;
  const items: string[] = [];
  
  for (const line of lines) {
    const lowerLine = line.toLowerCase();
    
    if (keywords.some(kw => lowerLine.includes(kw))) {
      capturing = true;
      continue;
    }
    
    if (capturing) {
      if (line.trim() === '') {
        if (items.length > 0) break;
        continue;
      }
      
      const cleaned = line.replace(/^[-•*\d.)\s]+/, '').trim();
      if (cleaned) {
        items.push(cleaned);
      }
      
      if (items.length >= 5) break;
    }
  }
  
  return items.length > 0 ? items : ['Comprehensive analysis provided in full feedback'];
}

function extractScore(analysis: string): number {
  // Try to extract a score from the analysis
  const scoreMatch = analysis.match(/(?:score|rating)[:s]*(\d+)(?:\/100|\s*out\s*of\s*100)?/i);
  if (scoreMatch) {
    return Math.min(100, Math.max(0, parseInt(scoreMatch[1])));
  }
  
  // Estimate based on sentiment
  const positive = (analysis.match(/excellent|outstanding|strong|great|impressive/gi) || []).length;
  const negative = (analysis.match(/weak|lacking|missing|poor|needs improvement/gi) || []).length;
  
  const baseScore = 70;
  const sentiment = (positive - negative) * 5;
  
  return Math.min(100, Math.max(40, baseScore + sentiment));
}