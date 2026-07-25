export async function onRequestPost(context: { request: Request }): Promise<Response> {
  try {
    const { url } = await context.request.json() as { url?: string };
    if (!url) {
      return new Response(JSON.stringify({ error: 'URL is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Fetch the candidate response sheet
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });

    if (!res.ok) {
      return new Response(JSON.stringify({ error: `Failed to fetch response sheet: Status ${res.status}` }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const html = await res.text();

    // Parse using simple regex
    const questionIdMatches = html.match(/Question ID\s*:/gi) || html.match(/Question\s*ID/gi) || [];
    const answeredMatches = html.match(/Status\s*:\s*Answered/gi) || html.match(/Answered/gi) || [];

    const totalFetched = questionIdMatches.length;
    const answeredCount = answeredMatches.length;

    if (totalFetched === 0) {
      return new Response(JSON.stringify({ 
        error: 'Could not find any questions in this response sheet link. Please make sure it is a valid CAT candidate response URL.' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({
      success: true,
      data: {
        totalFetched,
        answeredCount
      }
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    console.error('Error analyzing response link:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'An error occurred while analyzing the response link' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
