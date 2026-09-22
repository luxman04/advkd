import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { siteConfig } from '@/lib/site-config';

// Very small in-memory rate limiter (per server instance) to blunt basic spam/abuse.
// Fine for a low-traffic single-advocate site; swap for a durable store if traffic grows.
const submissions = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

function isRateLimited(ip: string) {
  const now = Date.now();
  const times = (submissions.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  times.push(now);
  submissions.set(ip, times);
  return times.length > MAX_PER_WINDOW;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') ?? 'unknown';
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: 'Too many requests. Please try again shortly.' }, { status: 429 });
    }

    const body = await req.json();
    const { name, phone, email, city, matter, mode, message } = body ?? {};

    if (!name || !phone || !matter || !message) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    // Basic length guards against abuse.
    if (String(name).length > 200 || String(message).length > 5000) {
      return NextResponse.json({ error: 'Input too long.' }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL || siteConfig.email;

    if (!apiKey) {
      // No email provider configured yet — fail loudly in logs so the site owner notices during setup,
      // but do NOT pretend to the visitor that the message was sent.
      console.error(
        'Contact form submission received but RESEND_API_KEY is not set. See README "Contact form" section.'
      );
      return NextResponse.json(
        { error: 'The contact form is not fully configured yet. Please call or WhatsApp instead.' },
        { status: 503 }
      );
    }

    const resend = new Resend(apiKey);

    const html = `
      <h2>New enquiry from ${siteConfig.name} website</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email || '—')}</p>
      <p><strong>City / Country:</strong> ${escapeHtml(city || '—')}</p>
      <p><strong>Matter:</strong> ${escapeHtml(matter)}</p>
      <p><strong>Preferred mode:</strong> ${escapeHtml(mode || '—')}</p>
      <p><strong>Message:</strong><br/>${escapeHtml(message).replace(/\n/g, '<br/>')}</p>
    `;

    const { error } = await resend.emails.send({
      // On Resend's free tier you must send from a domain you've verified with Resend,
      // or from onboarding@resend.dev during testing. See README.
      from: process.env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev',
      to: toEmail,
      reply_to: email || undefined,
      subject: `New website enquiry — ${matter}`,
      html,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: error.message || 'Could not send your message. Please try again.' },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Contact route error:', err);
    return NextResponse.json({ error: 'Unexpected server error.' }, { status: 500 });
  }
}

function escapeHtml(input: unknown) {
  return String(input ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
