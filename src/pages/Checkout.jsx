import { useState } from 'react';
import OrderForm from "../components/OrderForm";

const deliveryCharges = {
  Karachi: 200,
  Lahore: 150,
  Islamabad: 180,
  Other: 250
};

export default function Checkout({ cart = [], onIncrease, onDecrease, onPlaceOrder }) {
  // Ensure cart is an array and has valid items
  const validCart = Array.isArray(cart) ? cart : [];
  const subtotal = validCart.reduce((sum, item) => {
    const price = typeof item.price === 'number' ? item.price : parseInt(item.price) || 0;
    const quantity = typeof item.quantity === 'number' ? item.quantity : parseInt(item.quantity) || 0;
    return sum + (price * quantity);
  }, 0);

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
  const grandTotal = subtotal + delivery;

  return (
    <section className="pt-36 pb-32 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl font-serif font-semibold text-[#2A3A2A] mb-10">
          Checkout
        </h2>

        {validCart.length === 0 ? (
          <p className="text-[#2A3A2A]/70">Your cart is empty.</p>
        ) : (
          <div className="space-y-8">

            {/* Cart Items */}
            {validCart.map(item => (
              <div
                key={item.id + item.size}
                className="flex justify-between items-center border-b border-black/10 pb-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-black/60">Size: {item.size}</p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-1 bg-[#628141]/10 rounded-xl px-4 py-2">
                      <button
                        onClick={() => onDecrease(item.id, item.size)}
                        className="text-xl font-bold px-3"
                      >
                        −
                      </button>
                      <span className="font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => onIncrease(item.id, item.size)}
                        className="text-xl font-bold px-3"
                      >
                        +
                      </button>
                    </div>

                    <p className="mt-1 text-sm text-black/60">
                      Rs {item.price * item.quantity}/-
                    </p>
                  </div>
                </div>
              </div>
            ))}


            {/* Price Summary */}
            <div className="space-y-2 pt-6 border-t border-black/10">
              <div className="flex justify-between font-bold text-xl pt-2">
                <span>Total</span>
                <span>Rs {subtotal}/-</span>
              </div>

              {/* <div className="flex justify-between font-semibold text-lg">
                <span>Delivery Charges</span>
                <span>Rs {delivery}/-</span>
              </div> */}

              {/* <div className="flex justify-between font-bold text-xl pt-2">
                <span>Grand Total</span>
                <span>Rs {grandTotal}/-</span>
              </div>*/}
            </div> 

            <button
              onClick={() => onPlaceOrder(form, subtotal)}
              className="mt-6 w-full py-4 rounded-xl bg-[#628141] text-white font-medium hover:bg-[#516B36] transition"
            >
              Place Order
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
