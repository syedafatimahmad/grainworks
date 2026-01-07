import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import ConfirmationModal from "../components/ConfirmationModal";

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [confirmation, setConfirmation] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSend = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const text = await res.text();
      let data;
      try { data = JSON.parse(text); } catch { data = { error: text }; }

      if (res.ok) {
        setConfirmation({ success: true, name: form.name });
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setConfirmation({ error: data.error || 'Something went wrong' });
      }
    } catch (err) {
      setConfirmation({ error: `Something went wrong: ${err.message}` });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-[#2B2B2B]">
      {/* Hero */}
      <section className="pt-28 sm:pt-48 pb-12 sm:pb-20 text-center bg-[#f4efe3]">
        <h1 className="text-4xl sm:text-6xl font-serif mb-4">Get in Touch</h1>
        <p className="text-gray-600 text-base sm:text-xl mx-auto max-w-2xl px-4">
          We'd love to hear from you. Reach out for orders, inquiries, or just to say hello.
        </p>
      </section>

      {/* Main Section */}
      <section className="py-24 bg-[#F9F7F2]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 px-4 sm:px-6">

          {/* Form */}
          <div className="bg-white/85 backdrop-blur-15px rounded-3xl border border-white/40 shadow-lg p-6 sm:p-10">
            <h2 className="text-2xl sm:text-3xl font-serif mb-6">Send us a Message</h2>

            <div className="space-y-4 sm:space-y-6">
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full p-4 rounded-xl border-2 border-[#8BAE66]/20 focus:border-[#628141] outline-none"
              />
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full p-4 rounded-xl border-2 border-[#8BAE66]/20 focus:border-[#628141] outline-none"
              />
              <select
                name="subject"
                value={form.subject}
                onChange={handleChange}
                className="w-full p-4 rounded-xl border-2 border-[#8BAE66]/20"
              >
                <option value="">Select a subject</option>
                <option value="Order Inquiry">Order Inquiry</option>
                <option value="Product Question">Product Question</option>
                <option value="Bulk Order">Bulk Order</option>
                <option value="Other">Other</option>
              </select>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows="5"
                placeholder="Message"
                className="w-full p-4 rounded-xl border-2 border-[#8BAE66]/20 focus:border-[#628141]"
              />

              <button
                onClick={handleSend}
                disabled={loading}
                className={`w-full flex items-center justify-center gap-3 py-3 sm:py-4 rounded-xl text-white font-semibold bg-gradient-to-r from-[#628141] to-[#8BAE66] hover:-translate-y-1 transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <Send size={18} /> {loading ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col gap-6">
            <div className="bg-white/85 backdrop-blur-15px rounded-3xl border border-white/40 shadow-lg p-6 sm:p-10">
              <h2 className="text-2xl sm:text-3xl mb-6 sm:mb-8 font-serif">Contact Information</h2>
              {[ 
                { icon: Mail, title: "Email", value: "contact@grainworks.com" },
                { icon: Phone, title: "Phone", value: "+92 321 446 2311" },
                { icon: MapPin, title: "Based In", value: "Lahore" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 mb-4 sm:mb-6 p-4 sm:p-5 rounded-2xl bg-[#8BAE66]/5 hover:bg-[#8BAE66]/10 hover:translate-x-2 transition">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-[#628141] to-[#8BAE66] flex items-center justify-center text-white">
                    <item.icon size={18} />
                  </div>
                  <div>
                    <h4 className="font-semibold">{item.title}</h4>
                    <p className="text-gray-600">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Confirmation Modal */}
      {confirmation && (
        <ConfirmationModal
          order={confirmation.success ? { name: confirmation.name } : null}
          error={confirmation.error}
          onClose={() => setConfirmation(null)}
        />
      )}
    </div>
  );
}
