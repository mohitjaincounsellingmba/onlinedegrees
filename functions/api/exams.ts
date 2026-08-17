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
      const data = await context.env.LEADS_KV.get('exams_list');
      if (data) {
        return new Response(data, {
          headers: { 'Content-Type': 'application/json' }
        });
      }
    } else {
      console.warn('LEADS_KV binding is missing. Cannot fetch stored exams.');
    }
    return new Response(JSON.stringify([]), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    console.error('Error fetching exams:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function onRequestPost(context: { request: Request; env: Env }): Promise<Response> {
  try {
    const req = context.request;
    const examData = await req.json() as any;
    const { name, email, phone, examName, score, maxScore, percentage, correctAnswers, totalQuestions, status, reason } = examData;

    if (!name || !email) {
      return new Response(JSON.stringify({ error: 'Name and Email are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const newResult = {
      id: Math.random().toString(36).substring(2, 11),
      name,
      email,
      phone: phone || '',
      examName: examName || 'Online Live Test',
      score: score !== undefined ? score : 0,
      maxScore: maxScore !== undefined ? maxScore : 0,
      percentage: percentage !== undefined ? percentage : '0',
      correctAnswers: correctAnswers !== undefined ? correctAnswers : 0,
      totalQuestions: totalQuestions !== undefined ? totalQuestions : 0,
      status: status || 'submitted',
      reason: reason || '',
      timestamp: new Date().toISOString()
    };

    // 1. Dual-Sync to Activepieces Workspaces (as a specialized exam lead)
    let webhookSaved = false;
    const targetWebhooks = [PRIMARY_ACTIVEPIECES_WEBHOOK, BACKUP_ACTIVEPIECES_WEBHOOK];

    for (const webhook of targetWebhooks) {
      try {
        const webhookRes = await fetch(webhook, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...newResult,
            source: `Exam - ${newResult.examName}`,
            message: `Exam finished with score ${newResult.score}/${newResult.maxScore} (${newResult.status})`
          })
        });
        if (webhookRes.ok) {
          webhookSaved = true;
        }
      } catch (webhookErr: any) {
        console.error(`Activepieces Webhook Error for exam result:`, webhookErr.message);
      }
    }

    // 2. Cloudflare KV Storage under 'exams_list'
    let kvSaved = false;
    if (context.env.LEADS_KV) {
      try {
        let exams = [];
        const data = await context.env.LEADS_KV.get('exams_list');
        if (data) {
          exams = JSON.parse(data);
        }
        exams.push(newResult);
        await context.env.LEADS_KV.put('exams_list', JSON.stringify(exams));
        kvSaved = true;
      } catch (e: any) {
        console.error('Exams KV Storage Error:', e.message);
      }
    }

    // 3. Email Notification to Admin via Resend
    let emailSent = false;
    const resendApiKey = context.env.RESEND_API_KEY;
    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);
        const isViolation = newResult.status === 'terminated';
        const subject = isViolation 
          ? `⚠️ CHEATING VIOLATION: ${name} (Exam: ${newResult.examName})`
          : `🎓 Exam Completed: ${name} - ${newResult.percentage}% (Exam: ${newResult.examName})`;

        await resend.emails.send({
          from: 'Online Shiksha Exams <notifications@resend.dev>',
          to: [ADMIN_EMAIL],
          subject: subject,
          html: `
            <h2>Exam Attempt Report - Online Shiksha</h2>
            <p><strong>Candidate Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${newResult.phone || 'N/A'}</p>
            <p><strong>Exam Name:</strong> ${newResult.examName}</p>
            <p><strong>Status:</strong> <span style="color: ${isViolation ? 'red' : 'green'}; font-weight: bold;">${newResult.status.toUpperCase()}</span></p>
            ${isViolation ? `<p style="color: red;"><strong>Violation Reason:</strong> ${reason}</p>` : `
              <p><strong>Marks Obtained:</strong> ${score} / ${maxScore}</p>
              <p><strong>Accuracy:</strong> ${percentage}%</p>
              <p><strong>Questions Attempted:</strong> ${correctAnswers} correct out of ${totalQuestions} total</p>
            `}
            <hr/>
            <p><em>Result ID: ${newResult.id} | Timestamp: ${newResult.timestamp}</em></p>
          `
        });
        emailSent = true;
      } catch (err: any) {
        console.error('Resend Exam Notification Error:', err.message);
      }
    }

    return new Response(JSON.stringify({
      success: true,
      result: newResult,
      webhook: webhookSaved ? 'success' : 'failed',
      storage: kvSaved ? 'kv' : 'error',
      email: emailSent ? 'sent' : 'missed'
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    console.error('Exams API Post Handler Crash:', error);
    // Graceful fallback response
    return new Response(JSON.stringify({
      success: true,
      message: 'Recorded silently'
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
