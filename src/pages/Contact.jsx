import { Mail, Phone, MapPin, Send, ShoppingBag, Wheat } from "lucide-react";

export default function Contact() {
  return (
    <div className="text-[#2B2B2B]">

      {/* Hero */}
      <section className="pt-48 pb-20 text-center bg-[#f4efe3]">
        <h1 className="text-6xl font-serif mb-4">Get in Touch</h1>
        <p className="text-gray-600 text-xl  mx-auto">
          We'd love to hear from you. Reach out for orders, inquiries, or just to say hello.
        </p>
      </section>

      {/* Main Section */}
      <section className="py-24 bg-[#F9F7F2]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 px-6">

          {/* Form */}
          <div className="bg-white/85 backdrop-blur-15px rounded-3xl border border-white/40 shadow-lg p-10">
            <h2 className="text-3xl font-serif mb-8">Send us a Message</h2>

            <form className="space-y-6">
              <div>
                <label className="block mb-2 font-medium">Full Name</label>
                <input className="w-full p-4 rounded-xl border-2 border-[#8BAE66]/20 focus:border-[#628141] focus:ring-2 focus:ring-[#628141]/20 outline-none" />
              </div>

              <div>
                <label className="block mb-2 font-medium">Email Address</label>
                <input type="email" className="w-full p-4 rounded-xl border-2 border-[#8BAE66]/20 focus:border-[#628141] focus:ring-2 focus:ring-[#628141]/20 outline-none" />
              </div>

              <div>
                <label className="block mb-2 font-medium">Subject</label>
                <select className="w-full p-4 rounded-xl border-2 border-[#8BAE66]/20 bg-white focus:border-[#628141]">
                  <option>Select a subject</option>
                  <option>Order Inquiry</option>
                  <option>Product Question</option>
                  <option>Bulk Order</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 font-medium">Message</label>
                <textarea rows="5" className="w-full p-4 rounded-xl border-2 border-[#8BAE66]/20 focus:border-[#628141]" />
              </div>

              <button className="w-full flex items-center justify-center gap-3 p-4 rounded-xl text-white font-semibold bg-gradient-to-r from-[#628141] to-[#8BAE66] hover:-translate-y-1 transition">
                <Send size={18} /> Send Message
              </button>
            </form>
          </div>

          {/* Info */}
          <div className="flex flex-col gap-8">

            <div className="bg-white/85 backdrop-blur-15px rounded-3xl border border-white/40 shadow-lg p-10">
              <h2 className="text-3xl mb-8 font-serif">Contact Information</h2>

              {[
                { icon: Mail, title: "Email", value: "contact@grainworks.com" },
                { icon: Phone, title: "Phone", value: "+92 321 446 2311" },
                { icon: MapPin, title: "Based In", value: "Lahore" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-5 mb-6 p-5 rounded-2xl bg-[#8BAE66]/5 hover:bg-[#8BAE66]/10 hover:translate-x-2 transition">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#628141] to-[#8BAE66] flex items-center justify-center text-white">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold">{item.title}</h4>
                    <p className="text-gray-600">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* FAQ */}
            <section id="FAQ">
              <div className="bg-white/85 backdrop-blur-15px rounded-3xl border border-white/40 shadow-lg p-10">
                <h2 className="text-3xl mb-8 font-serif">Frequently Asked Questions</h2>

                {[
                  {
                    q: "How are your products prepared?",
                    a: "All our staples are hand-cleaned and prepared in small batches with meticulous attention to purity.",
                  },
                  {
                    q: "Do you offer bulk ordering?",
                    a: "Yes, we offer bulk orders for all products. Contact us directly for pricing.",
                  },
                  {
                    q: "What's your delivery time?",
                    a: "Orders ship within 1 business day and arrive in 1–2 business days.",
                  },
                ].map((item, i) => (
                  <div key={i} className="pb-6 mb-6 border-b border-[#8BAE66]/20 last:border-none last:mb-0">
                    <h4 className="font-serif mb-2 text-lg">{item.q}</h4>
                    <p className="text-gray-600 text-sm">{item.a}</p>
                  </div>
                ))}
              </div>
            </section>

          </div>
        </div>
      </section>
    </div>
  );
}
