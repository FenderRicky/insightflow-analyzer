import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, tone = 'balanced' } = await req.json() as { 
      messages: Message[];
      tone?: 'chill' | 'corporate' | 'hustle' | 'balanced';
    };

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    // Define tone-specific system prompts
    const tonePrompts = {
      chill: "You're a laid-back career mentor who keeps things real. Use casual language, be encouraging but honest. Add occasional emojis. Keep responses conversational and friendly.",
      corporate: "You're a professional executive coach. Use clear, strategic language. Focus on metrics, growth, and professional development. Be formal but warm.",
      hustle: "You're a high-energy motivational coach. Be direct, action-oriented, and urgent. Push for immediate improvement. Use powerful, energizing language.",
      balanced: "You're an insightful AI career mentor. Be friendly yet professional, encouraging yet honest. Focus on actionable insights and growth opportunities."
    };

    const systemPrompt = `${tonePrompts[tone]}

Your role: Analyze professional profiles (LinkedIn, GitHub, portfolios) and provide:
- Specific, actionable feedback
- Honest assessments of strengths and gaps
- Quick wins for immediate improvement
- Strategic advice for long-term growth

Keep responses concise (2-3 paragraphs max) unless asked for details.
Always be constructive and motivating.`;

    console.log('Calling AI with tone:', tone);

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages
        ],
        temperature: 0.8,
        max_tokens: 800,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI API error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again in a moment.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI credits depleted. Please add credits to continue.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      throw new Error(`AI API error: ${response.status}`);
    }

    const data = await response.json();
    const aiMessage = data.choices[0].message.content;

    console.log('AI response generated successfully');

    return new Response(
      JSON.stringify({ message: aiMessage }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in ai-mentor function:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});