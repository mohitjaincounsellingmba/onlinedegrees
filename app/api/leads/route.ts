import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Forward the lead payload to Mohit Jain's central counselling webhook
    const webhookUrl = 'https://activepieces.careerwithmohit.online/api/v1/webhooks/kC1sYlGf7iOQ21LskIu0F';
    
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      console.error(`Activepieces returned error status: ${response.status}`);
      // Fail silent to front-end to ensure optimal user experience
    }

    return NextResponse.json({ success: true, message: 'Lead recorded successfully' });
  } catch (error) {
    console.error('Lead submission route error:', error);
    // Return success to the client to keep the user experience seamless
    return NextResponse.json({ success: true, message: 'Lead recorded silent' });
  }
}
