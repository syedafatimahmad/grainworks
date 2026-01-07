import { Resend } from 'resend';
import crypto from 'crypto';

function escapeHtml(input) {
  if (typeof input !== 'string') return String(input ?? '');
  return input.replace(/[&<>"'`=\/]/g, (s) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;'
  })[s]);
}

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST,OPTIONS');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { RESEND_API_KEY, COMPANY_EMAIL, FROM_EMAIL } = process.env;
    if (!RESEND_API_KEY) return res.status(500).json({ error: 'Missing RESEND_API_KEY' });

    const resend = new Resend(RESEND_API_KEY);

    let body = req.body;
    if (typeof body === 'string') {
      try { body = JSON.parse(body); } catch { return res.status(400).json({ error: 'Invalid JSON' }); }
    }

    const { name, email, subject, message } = body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }

    const companyEmail = COMPANY_EMAIL || 'contact@grainworks.com';
    const fromEmail = FROM_EMAIL || companyEmail;

    const html = `
      <div style="font-family:Arial,sans-serif; max-width:600px; margin:0 auto; padding:20px; background:#fff; border-radius:8px;">
        <h2>New Message from ${escapeHtml(name)}</h2>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Subject:</strong> ${escapeHtml(subject || 'No subject')}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
      </div>
    `;

    await resend.emails.send({
      from: `Website Contact <${fromEmail}>`,
      to: companyEmail,
      subject: `New Contact Form: ${escapeHtml(subject || 'No subject')}`,
      html,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('contact error:', err);
    return res.status(500).json({ error: 'Internal server error', details: err.message });
  }
}
