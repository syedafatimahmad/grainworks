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
    // CORS preflight (adjust allowed origins if needed)
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
        if (!RESEND_API_KEY) {
            return res.status(500).json({ error: 'Missing RESEND_API_KEY' });
        }

        const resend = new Resend(RESEND_API_KEY);

        // Ensure we have a parsed object (some hosts give a string body)
        let order = req.body;
        if (typeof order === 'string' && order.trim()) {
            try {
                order = JSON.parse(order);
            } catch {
                return res.status(400).json({ error: 'Invalid JSON body' });
            }
        }
        order = order || {};

        // Ensure server generates an orderId when client doesn't provide one
        if (!order.orderId) {
            order.orderId = typeof crypto.randomUUID === 'function'
                ? crypto.randomUUID()
                : `ORD-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
        }

        // Basic validation
        const errors = [];
        if (!order.name) errors.push('Missing name');
        if (!order.email || !/^\S+@\S+\.\S+$/.test(order.email)) errors.push('Invalid email');
        if (!order.orderId) errors.push('Missing orderId');
        if (order.total == null || isNaN(Number(order.total))) errors.push('Invalid total');
        if (!Array.isArray(order.items) || order.items.length === 0) errors.push('No items');

        if (errors.length) return res.status(400).json({ error: 'Invalid order', details: errors });

        const companyEmail = COMPANY_EMAIL || 'onboarding@resend.dev';
        const fromEmail = FROM_EMAIL || companyEmail;
        // email design
        const customerHtml = `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
  <h2 style="color: #2A3A2A;">Thank you for your order, ${escapeHtml(order.name)}!</h2>
  <p style="font-size: 16px; color: #555;">We have received your order successfully. Here are the details:</p>

  <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
    <tr>
      <td style="font-weight: bold; padding: 8px; border-bottom: 1px solid #ddd;">Order ID:</td>
      <td style="padding: 8px; border-bottom: 1px solid #ddd;">${escapeHtml(order.orderId)}</td>
    </tr>
    <tr>
      <td style="font-weight: bold; padding: 8px; border-bottom: 1px solid #ddd;">Total:</td>
      <td style="padding: 8px; border-bottom: 1px solid #ddd;">Rs ${escapeHtml(order.total)}</td>
    </tr>
  </table>

  <h3 style="margin-top: 20px; color: #2A3A2A;">Items Ordered:</h3>
  <ul style="padding-left: 20px; color: #555;">
    ${order.items.map(i => `<li>${escapeHtml(i.name)} x ${escapeHtml(String(i.quantity))}</li>`).join('')}
  </ul>

  <p style="font-size: 14px; color: #777; margin-top: 30px;">
    Your order is being processed and we will notify you once it’s shipped.<br>
    If you have any questions, reply to this email or contact us at ${escapeHtml(companyEmail)}.
  </p>

  <p style="font-size: 14px; color: #777; margin-top: 10px;">Thank you for choosing GrainWorks!</p>
</div>
`;


        // Send confirmation to customer
        await resend.emails.send({
            from: `Website Orders <${fromEmail}>`,
            to: order.email,
            subject: 'Order Confirmed',
            html: customerHtml,
        });

        // Send internal notification
        await resend.emails.send({
            from: `Website Orders <${fromEmail}>`,
            to: companyEmail,
            subject: `New Order ${escapeHtml(String(order.orderId))}`,
            html: `<pre>${escapeHtml(JSON.stringify(order, null, 2))}</pre>`
        });

        return res.status(200).json({ success: true });
    } catch (err) {
        console.error('place-order error:', err);
        return res.status(500).json({ error: 'Internal server error', details: err.message });
    }
}