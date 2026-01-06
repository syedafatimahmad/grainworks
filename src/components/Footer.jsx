import { WheatIcon } from 'lucide-react'
import { PRODUCTS } from '../data/products'

export default function Footer({ onNavigate }) {
  return (
    <footer className="bg-[#1B211A] text-[#EBD5AB] pt-20 pb-8 ">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-[1fr_2fr] gap-16 mb-16">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-[#628141] rounded-xl flex items-center justify-center">
                <WheatIcon size={20} />
              </div>
              <span className="text-2xl font-serif font-semibold">
                Grain
              <span className="text-[#8BAE66]">Works</span>
              </span>
            </div>
            <p className="text-[#EBD5AB]/70 leading-relaxed max-w-xs">
              Hand-prepared staples with modern purity standards.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
            {/* Products */}
            <div>
              <h4 className="font-semibold font-serif mb-3 text-xl border-b-2 border-[#8BAE66] inline-block pb-2">
                Products
              </h4>
              <div className="mt-6 space-y-3">
                {Object.values(PRODUCTS).map(p => (
                  <button
                    key={p.id}
                    onClick={() => onNavigate('products', p.id)}
                    className="block text-left text-[#EBD5AB]/70 hover:text-[#8BAE66] hover:pl-2 transition-all"
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="mt-6 space-y-3">
              {['home', 'products', 'contact', 'FAQ'].map(p => (
                <button
                  key={p}
                  onClick={() => {
                    if (p === 'FAQ') {
                      onNavigate('contact')
                      setTimeout(() => {
                        document
                          .getElementById('FAQ')
                          ?.scrollIntoView({ behavior: 'smooth' })
                      }, 100)
                    } else {
                      onNavigate(p)
                    }
                  }}
                  className="capitalize block text-left text-[#EBD5AB]/70 hover:text-[#8BAE66] hover:pl-2 transition-all"
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Connect */}
            <div>
              <h4 className="font-semibold font-serif mb-3 text-xl border-b-2 border-[#8BAE66] inline-block pb-2">
                Connect
              </h4>
              <div className="mt-6 space-y-3">
                <a
                  href="mailto:hello@grainworks.com"
                  className="block text-[#EBD5AB]/70 hover:text-[#8BAE66] hover:pl-2 transition-all"
                >
                  Email
                </a>
                <button className="block text-left text-[#EBD5AB]/70 hover:text-[#8BAE66] hover:pl-2 transition-all">
                  Instagram
                </button>
                <button className="block text-left text-[#EBD5AB]/70 hover:text-[#8BAE66] hover:pl-2 transition-all">
                  WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#EBD5AB]/10 pt-8 text-center text-sm text-[#EBD5AB]/50">
          © 2025 GrainWorks. All staples are hand-prepared with care.
        </div>
      </div>
    </footer>
  )
}
