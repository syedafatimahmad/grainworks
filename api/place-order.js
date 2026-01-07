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
        // customer email design
        const customerHtml = `
<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 100%; width: 650px; margin: 0 auto; padding: 20px; border-radius: 12px; background-color: #ffffff; box-shadow: 0 4px 12px rgba(0,0,0,0.08); color: #333;">
  <h2 style="color: #2A3A2A; font-size: 22px; margin-bottom: 10px;">Thank you for your order, ${escapeHtml(order.name)}!</h2>
  <p style="font-size: 16px; color: #555; line-height: 1.5; margin-bottom: 20px;">
    Your order has been received and is being processed. Here’s a summary:
  </p>

  <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px;">
    <tr>
      <td style="font-weight: bold; padding: 8px; border-bottom: 1px solid #eee;">Order ID</td>
      <td style="padding: 8px; border-bottom: 1px solid #eee;">${escapeHtml(order.orderId)}</td>
    </tr>
    <tr>
      <td style="font-weight: bold; padding: 8px; border-bottom: 1px solid #eee;">Total</td>
      <td style="padding: 8px; border-bottom: 1px solid #eee;">Rs ${escapeHtml(order.total)}</td>
    </tr>
    <tr>
      <td style="font-weight: bold; padding: 8px; border-bottom: 1px solid #eee;">Phone</td>
      <td style="padding: 8px; border-bottom: 1px solid #eee;">${escapeHtml(order.phone || '-')}</td>
    </tr>
    <tr>
      <td style="font-weight: bold; padding: 8px; border-bottom: 1px solid #eee;">Email</td>
      <td style="padding: 8px; border-bottom: 1px solid #eee;">${escapeHtml(order.email)}</td>
    </tr>
    <tr>
      <td style="font-weight: bold; padding: 8px; border-bottom: 1px solid #eee;">Address</td>
      <td style="padding: 8px; border-bottom: 1px solid #eee;">${escapeHtml(order.address || '-')}, ${escapeHtml(order.city || '-')}</td>
    </tr>
    <tr>
      <td style="font-weight: bold; padding: 8px; border-bottom: 1px solid #eee;">Payment</td>
      <td style="padding: 8px; border-bottom: 1px solid #eee;">${escapeHtml(order.payment)}</td>
    </tr>
  </table>

  <h3 style="margin-top: 20px; font-size: 18px; color: #2A3A2A;">Items Ordered</h3>
  <ul style="padding-left: 20px; margin-top: 10px; margin-bottom: 25px; color: #555; line-height: 1.6;">
    ${order.items.map(i => `<li>${escapeHtml(i.name)} x ${escapeHtml(String(i.quantity))}</li>`).join('')}
  </ul>

  <p style="font-size: 14px; color: #777; line-height: 1.5; margin-bottom: 10px;">
    Your order is being prepared. We will notify you once it is shipped. If you have any questions, reply to this email or contact us at <a href="mailto:${escapeHtml(companyEmail)}" style="color: #628141; text-decoration: none;">${escapeHtml(companyEmail)}</a>.
  </p>

  <p style="font-size: 14px; color: #777; margin-top: 5px;">Thank you for choosing <strong>GrainWorks</strong>!</p>

  <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">

  <p style="font-size: 12px; color: #aaa; text-align: center;">
    &copy; ${new Date().getFullYear()} GrainWorks. All rights reserved.
  </p>
</div>
`;


        // business email design

        const businessHtml = `
<div style="font-family:Arial,sans-serif; max-width:600px; margin:30px auto; background:#fff; padding:20px; border-radius:8px; box-shadow:0 4px 10px rgba(0,0,0,0.1);">
  <h1 style="color:#628141;">New Order Received</h1>
  <p><strong>Order ID:</strong> ${escapeHtml(order.orderId)}</p>
  <p><strong>Total:</strong> Rs ${escapeHtml(String(order.total))}/-</p>
  <p><strong>City:</strong> ${escapeHtml(order.city)}</p>
  <p><strong>Payment Method:</strong> ${escapeHtml(order.payment)}</p>

  <h2 style="margin-top:20px;border-bottom:1px solid #ddd;padding-bottom:5px;">Customer Details</h2>
  <p><strong>Name:</strong> ${escapeHtml(order.name)}</p>
  <p><strong>Email:</strong> ${escapeHtml(order.email)}</p>
  <p><strong>Phone:</strong> ${escapeHtml(order.phone)}</p>
  <p><strong>Address:</strong> ${escapeHtml(order.address)}</p>

  <h2 style="margin-top:20px;border-bottom:1px solid #ddd;padding-bottom:5px;">Order Items</h2>
  <table style="border-collapse:collapse;width:100%;margin-top:10px;">
    <thead>
      <tr>
        <th style="border:1px solid #ddd;padding:10px;background:#f2f2f2;">Item Name</th>
        <th style="border:1px solid #ddd;padding:10px;background:#f2f2f2;">Quantity</th>
      </tr>
    </thead>
    <tbody>
      ${order.items.map(i => `
        <tr>
          <td style="border:1px solid #ddd;padding:10px;">${escapeHtml(i.name)}</td>
          <td style="border:1px solid #ddd;padding:10px;">${escapeHtml(String(i.quantity))}</td>
        </tr>
      `).join('')}
    </tbody>
  </table>
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
            subject: `New Order ${escapeHtml(order.orderId)}`,
            html: businessHtml
        });


        return res.status(200).json({ success: true });
    } catch (err) {
        console.error('place-order error:', err);
        return res.status(500).json({ error: 'Internal server error', details: err.message });
    }
}