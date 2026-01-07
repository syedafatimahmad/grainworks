import { useState } from 'react';

const deliveryCharges = {
  Karachi: 200,
  Lahore: 150,
  Islamabad: 180,
  Other: 250
};

export default function OrderForm({ cart = [], total = 0 }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: 'Karachi',
    payment: 'Cash'
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const delivery = deliveryCharges[form.city] || deliveryCharges['Other'];
  const grandTotal = total + delivery;

  const handlePlaceOrder = async () => {
    setLoading(true);
    const orderData = {
      orderId: Date.now(),
      ...form,
      items: cart,
      total: grandTotal
    };

    try {
      const res = await fetch('/api/place-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        data = { error: text };
      }

      // Log raw text and formatted object for debugging
      console.error('API raw response text:', text);
      try { console.error('API error object:', JSON.stringify(data, null, 2)); } catch (e) { console.error('API error object (could not stringify)'); }

      if (res.ok) {
        alert('✅ Order placed successfully!');
      } else {
        const details = Array.isArray(data.details) ? ' - ' + data.details.join(', ') : '';
        const message = data.error || 'Server error';
        alert(`❌ Something went wrong: ${message}${details}`);
      }
    } catch (err) {
      console.error('Fetch error:', err);
      alert(`❌ Something went wrong: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="pt-36 pb-32 bg-white">
      <div className="max-w-2xl mx-auto px-6">
        <h2 className="text-4xl font-serif font-semibold text-[#2A3A2A] mb-10">
          Place Your Order
        </h2>

        <div className="space-y-6">
          <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Full Name" required className="w-full p-4 border rounded-lg" />
          <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email Address" required className="w-full p-4 border rounded-lg" />
          <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" required className="w-full p-4 border rounded-lg" />
          <input type="text" name="address" value={form.address} onChange={handleChange} placeholder="Address" className="w-full p-4 border rounded-lg" />

          <select name="city" value={form.city} onChange={handleChange} className="w-full p-4 border rounded-lg">
            {Object.keys(deliveryCharges).map(city => <option key={city} value={city}>{city}</option>)}
          </select>

          <select name="payment" value={form.payment} onChange={handleChange} className="w-full p-4 border rounded-lg">
            <option value="Cash">Cash on Delivery</option>
            <option value="Card">Credit/Debit Card</option>
          </select>

          <div className="flex justify-between font-semibold text-lg pt-4">
            <span>Subtotal</span>
            <span>Rs {total}/-</span>
          </div>
          <div className="flex justify-between font-semibold text-lg pt-4">
            <span>Delivery Charges</span>
            <span>Rs {delivery}/-</span>
          </div>
          <div className="flex justify-between font-semibold text-lg pt-2">
            <span>Grand Total</span>
            <span>Rs {grandTotal}/-</span>
          </div>

          <button
            onClick={handlePlaceOrder}
            disabled={loading}
            className={`mt-6 w-full py-4 rounded-xl bg-[#628141] text-white font-medium hover:bg-[#516B36] transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Placing Order...' : 'Confirm Order'}
          </button>
        </div>
      </div>
    </section>
  );
}
