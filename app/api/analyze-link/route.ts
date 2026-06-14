import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { url } = await req.json();
    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    // Fetch the candidate response sheet
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });

    if (!res.ok) {
      return NextResponse.json({ error: `Failed to fetch response sheet: Status ${res.status}` }, { status: 400 });
    }

    const html = await res.text();

    // Parse using simple regex
    const questionIdMatches = html.match(/Question ID\s*:/gi) || html.match(/Question\s*ID/gi) || [];
    const answeredMatches = html.match(/Status\s*:\s*Answered/gi) || html.match(/Answered/gi) || [];

    const totalFetched = questionIdMatches.length;
    const answeredCount = answeredMatches.length;

    if (totalFetched === 0) {
      return NextResponse.json({ 
        error: 'Could not find any questions in this response sheet link. Please make sure it is a valid CAT candidate response URL.' 
      }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      data: {
        totalFetched,
        answeredCount
      }
    });
  } catch (error: any) {
    console.error('Error analyzing response link:', error);
    return NextResponse.json({ 
      error: error.message || 'An error occurred while analyzing the response link' 
    }, { status: 500 });
  }
}
