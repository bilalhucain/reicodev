import { NextResponse } from 'next/server';

const WP_BASE = process.env.NEXT_PUBLIC_WP_URL ?? 'http://localhost/reicodev-cms';

/**
 * Contact / Quote form submission handler.
 *
 * In production this proxies to Contact Form 7 REST API (wpcf7 plugin).
 * Set NEXT_PUBLIC_WP_URL and CF7_FORM_ID in your .env.local
 *
 * CF7 REST endpoint:
 *   POST /wp-json/contact-form-7/v1/contact-forms/{id}/feedback
 *
 * Required env vars:
 *   NEXT_PUBLIC_WP_URL   — e.g. https://cms.reicodev.com
 *   CF7_FORM_ID          — numeric ID of your CF7 form in WordPress
 */

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      name = '',
      email = '',
      phone = '',
      service = '',
      budget = '',
      timeline = '',
      message = '',
      details = '',
      website = '',
      type = 'contact',
    } = body;

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    const formId = process.env.CF7_FORM_ID;

    if (formId) {
      // ── Forward to Contact Form 7 REST API ──
      const formData = new FormData();
      formData.append('your-name',    name);
      formData.append('your-email',   email);
      formData.append('your-phone',   phone);
      formData.append('your-service', service);
      formData.append('your-budget',  budget);
      formData.append('your-timeline',timeline);
      formData.append('your-website', website);
      formData.append('your-message', message || details);
      formData.append('your-type',    type);

      const cf7Res = await fetch(
        `${WP_BASE}/wp-json/contact-form-7/v1/contact-forms/${formId}/feedback`,
        { method: 'POST', body: formData }
      );

      const cf7Data = await cf7Res.json();

      if (cf7Data.status === 'mail_sent') {
        return NextResponse.json({ ok: true, message: 'Message sent successfully.' });
      } else {
        console.error('CF7 error:', cf7Data);
        return NextResponse.json({ error: cf7Data.message ?? 'CF7 submission failed' }, { status: 500 });
      }
    } else {
      // ── Fallback: log to console (dev mode without CF7 configured) ──
      console.log('[CONTACT FORM SUBMISSION]', { name, email, phone, service, budget, timeline, message: message || details });
      return NextResponse.json({ ok: true, message: 'Received (dev mode — CF7_FORM_ID not set).' });
    }
  } catch (err) {
    console.error('[Contact API] Error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
