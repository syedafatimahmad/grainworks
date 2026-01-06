// api/place-order.js
import { Resend } from 'resend';

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
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { RESEND_API_KEY, COMPANY_EMAIL } = process.env;
  if (!RESEND_API_KEY) return res.status(500).json({ error: 'Server misconfiguration' });

  const resend = new Resend(RESEND_API_KEY);
  const order = req.body;

  const errors = [];
  if (!order?.name) errors.push('Missing name');
  if (!order?.email || !/^\S+@\S+\.\S+$/.test(order.email)) errors.push('Invalid email');
  if (!order?.orderId) errors.push('Missing orderId');
  if (!order?.total || isNaN(Number(order.total))) errors.push('Invalid total');
  if (!Array.isArray(order.items) || order.items.length === 0) errors.push('No items');

  if (errors.length) return res.status(400).json({ error: 'Invalid order', details: errors });

  const companyEmail = COMPANY_EMAIL || 'fatima.ahmad6543@gmail.com';

  const customerHtml = `
    <h2>Thanks for your order, ${escapeHtml(order.name)}!</h2>
    <p>Order ID: ${escapeHtml(String(order.orderId))}</p>
    <p>Total: Rs ${escapeHtml(String(order.total))}</p>
    <ul>
      ${order.items.map(i => `<li>${escapeHtml(i.name)} x ${escapeHtml(i.quantity)}</li>`).join('')}
    </ul>
  `;

  try {
    await resend.emails.send({
      from: `Website Orders <${companyEmail}>`,
      to: order.email,
      subject: 'Order Confirmed',
      html: customerHtml,
    });

    await resend.emails.send({
      from: `Website Orders <${companyEmail}>`,
      to: companyEmail,
      subject: 'New Order Received',
      html: `<pre>${escapeHtml(JSON.stringify(order, null, 2))}</pre>`
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Error sending emails via Resend:', err);
    return res.status(502).json({ error: 'Failed to send emails', details: err.message });
  }
}
