import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const order = req.body; // Expect { name, email, items, total, orderId }

  try {
    // Email to customer
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: order.email,
      subject: 'Order Confirmed',
      html: `
        <h2>Thanks for your order, ${order.name}!</h2>
        <p>Order ID: ${order.orderId}</p>
        <p>Total: Rs ${order.total}</p>
        <ul>
          ${order.items.map(i => `<li>${i.name} x ${i.quantity}</li>`).join('')}
        </ul>
      `
    });

    // Email to company
    await resend.emails.send({
      from: 'Website Orders <onboarding@resend.dev>',
      to: 'fatima.ahmad6543@email.com', // Replace with your actual company email
      subject: 'New Order Received',
      html: `<pre>${JSON.stringify(order, null, 2)}</pre>`
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Email sending failed' });
  }
}
