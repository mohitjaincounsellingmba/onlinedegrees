import { Resend } from 'resend';

const ADMIN_EMAIL = 'advik.mohit.jain@gmail.com';
const PRIMARY_ACTIVEPIECES_WEBHOOK = 'https://activepieces.careerwithmohit.online/api/v1/webhooks/kC1sYlGf7iOQ21LskIu0F';
const BACKUP_ACTIVEPIECES_WEBHOOK = 'https://cloud.activepieces.com/api/v1/webhooks/h3HoLiVtxuydbGOfr11F3';

interface Env {
  RESEND_API_KEY?: string;
  LEADS_KV?: any; // Cloudflare KV namespace
}

export async function onRequestGet(context: { request: Request; env: Env }): Promise<Response> {
  const req = context.request;
  const authHeader = req.headers.get('x-admin-secret');
  if (authHeader !== 'mohitadmin2026') {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    if (context.env.LEADS_KV) {
      const data = await context.env.LEADS_KV.get('leads_list');
      if (data) {
        return new Response(data, {
          headers: { 'Content-Type': 'application/json' }
        });
      }
    } else {
      console.warn('LEADS_KV binding is missing. Cannot fetch stored leads.');
    }
    return new Response(JSON.stringify([]), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    console.error('Error fetching leads:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function onRequestPost(context: { request: Request; env: Env }): Promise<Response> {
  try {
    const req = context.request;
    const lead = await req.json() as any;
    const { name, number, email, location, source, message, ...details } = lead;

    if (!name || !number) {
      return new Response(JSON.stringify({ error: 'Name and number are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const newLead = {
      id: Math.random().toString(36).substring(2, 11),
      name,
      number,
      email: email || '',
      location: location || '',
      source: source || 'Online Shiksha Inquiry',
      message: message || '',
      details: details || {},
      timestamp: new Date().toISOString()
    };

    // 1. Sync to Activepieces Workspaces (Dual-Sync Resilience)
    let webhookSaved = false;
    const targetWebhooks = [PRIMARY_ACTIVEPIECES_WEBHOOK, BACKUP_ACTIVEPIECES_WEBHOOK];

    for (const webhook of targetWebhooks) {
      try {
        const webhookRes = await fetch(webhook, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...newLead,
            ...newLead.details
          })
        });
        if (webhookRes.ok) {
          console.log(`Leads API: Successfully pushed lead ${newLead.id} to Activepieces endpoint: ${webhook}`);
          webhookSaved = true;
        } else {
          console.error(`Activepieces returned status ${webhookRes.status} for ${webhook}`);
        }
      } catch (webhookErr: any) {
        console.error(`Activepieces Webhook Connection Error (${webhook}):`, webhookErr.message);
      }
    }

    // 2. Cloudflare KV Fallback Storage
    let fileSaved = false;
    if (context.env.LEADS_KV) {
      try {
        let leads = [];
        const data = await context.env.LEADS_KV.get('leads_list');
        if (data) {
          leads = JSON.parse(data);
        }
        leads.push(newLead);
        await context.env.LEADS_KV.put('leads_list', JSON.stringify(leads));
        fileSaved = true;
      } catch (e: any) {
        console.error('Leads KV Storage Error:', e.message);
      }
    } else {
      console.warn('LEADS_KV binding is missing. Filesystem fallback is unavailable on Cloudflare Workers.');
    }

    // 3. Email Backup via Resend (Production Alert System)
    let emailSent = false;
    const resendApiKey = context.env.RESEND_API_KEY;
    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);
        await resend.emails.send({
          from: 'Online Shiksha Leads <notifications@resend.dev>',
          to: [ADMIN_EMAIL],
          subject: `New Lead: ${name} (${newLead.source})`,
          html: `
            <h2>New Lead Captured - Online Shiksha</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Phone (WhatsApp):</strong> ${number}</p>
            <p><strong>Email:</strong> ${email || 'N/A'}</p>
            <p><strong>Location:</strong> ${location || 'N/A'}</p>
            <p><strong>Source:</strong> ${newLead.source}</p>
            ${message ? `<p><strong>Message:</strong> ${message}</p>` : ''}
            ${Object.entries(details).length > 0 ? `<p><strong>Details:</strong> ${JSON.stringify(details)}</p>` : ''}
            <hr/>
            <p><em>Lead ID: ${newLead.id}</em></p>
          `
        });
        emailSent = true;
      } catch (err: any) {
        console.error('Resend Lead Notification Error:', err.message);
      }
    } else {
      console.warn('RESEND_API_KEY environment variable is missing.');
    }

    return new Response(JSON.stringify({
      success: true,
      lead: newLead,
      webhook: webhookSaved ? 'success' : 'failed',
      storage: fileSaved ? 'kv' : 'error',
      email: emailSent ? 'sent' : 'missed'
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    console.error('Leads API Handler Crash:', error);
    // Always return success to client to ensure beautiful, uninterrupted user flows
    return new Response(JSON.stringify({
      success: true,
      message: 'Recorded silent'
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
