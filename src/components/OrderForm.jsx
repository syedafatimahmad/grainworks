import { useState } from 'react';

const deliveryCharges = {
  Karachi: 200,
  Lahore: 150,
  Islamabad: 180,
  Other: 250
};

export default function OrderForm({ cart = [], total = 0, onSubmit }) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    city: 'Karachi',
    payment: 'Cash'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const delivery = deliveryCharges[form.city] || deliveryCharges['Other'];
  const grandTotal = total + delivery;

    // ✅ This is the key: call your API here
  const handlePlaceOrder = async () => {
    const orderData = {
      orderId: Date.now(),
      name: form.name,
      email: form.email, // you need to add email input if you want confirmation
      phone: form.phone,
      address: form.address,
      city: form.city,
      payment: form.payment,
      items: cart,
      total: grandTotal
    };

    try {
      const res = await fetch('/api/place-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      if (res.ok) {
        alert('Order placed successfully!');
      } else {
        alert('Something went wrong. Try again.');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong. Try again.');
    }
  };

  return (
    <section className="pt-36 pb-32 bg-white">
      <div className="max-w-2xl mx-auto px-6">
        <h2 className="text-4xl font-serif font-semibold text-[#2A3A2A] mb-10">
          Place Your Order
        </h2>

        <div className="space-y-6">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full p-4 border rounded-lg"
          />
          <input
            type="email"
            name="email"
            value={form.email || ''}
            onChange={handleChange}
            placeholder="Email Address"
            className="w-full p-4 border rounded-lg"
          />

          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full p-4 border rounded-lg"
          />
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Address"
            className="w-full p-4 border rounded-lg"
          />

          <select
            name="city"
            value={form.city}
            onChange={handleChange}
            className="w-full p-4 border rounded-lg"
          >
            {Object.keys(deliveryCharges).map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>

          <select
            name="payment"
            value={form.payment}
            onChange={handleChange}
            className="w-full p-4 border rounded-lg"
          >
            <option value="Cash">Cash on Delivery</option>
            <option value="Card">Credit/Debit Card</option>
          </select>

          {/* Totals */}
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
            className="mt-6 w-full py-4 rounded-xl bg-[#628141] text-white font-medium hover:bg-[#516B36] transition"
          >
            Confirm Order
          </button>
        </div>
      </div>
    </section>
  )
}
