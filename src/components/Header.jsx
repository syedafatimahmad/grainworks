import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faWheatAwn } from '@fortawesome/free-solid-svg-icons';
import { Menu, X } from 'lucide-react'

export default function Header({ currentPage, onNavigate, cartCount }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navItems = ['home', 'products', 'contact']

  return (
    <header
      className={`fixed left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-[1300px]
      transition-all duration-300 ${scrolled ? 'top-3' : 'top-5'}`}
    >
      <div
        className={`bg-[#2A3A2A]/85 backdrop-blur-2xl border border-[#EBD5AB]/25
        rounded-2xl px-8 transition-all ${scrolled ? 'py-4' : 'py-5'}`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-[#628141] rounded-xl flex items-center justify-center text-[#EBD5AB]">
              <FontAwesomeIcon icon={faWheatAwn} size={40} />
            </div>
            <span className="text-2xl font-serif font-semibold text-[#EBD5AB]">
              Grain<span className="text-[#8BAE66]">Works</span>
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navItems.map(page => (
              <button
                key={page}
                onClick={() => onNavigate(page)}
                className={`capitalize font-medium relative ${currentPage === page
                    ? 'text-[#EBD5AB]'
                    : 'text-[#EBD5AB]/80 hover:text-[#EBD5AB]'
                  }`}
              >
                {page}
                {currentPage === page && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#8BAE66] rounded-full" />
                )}
              </button>
            ))}

            {/* Cart */}
            <button
              onClick={() => onNavigate('cart')}
              className="relative"
            >
              <FontAwesomeIcon icon={faCartShopping} className="text-[#EBD5AB]" size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#628141] text-white text-xs rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-[#EBD5AB]"
            onClick={() => setOpen(o => !o)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden mt-6 flex flex-col gap-4">
            {navItems.map(page => (
              <button
                key={page}
                onClick={() => {
                  onNavigate(page)
                  setOpen(false)
                }}
                className={`capitalize text-left ${currentPage === page
                    ? 'text-[#EBD5AB]'
                    : 'text-[#EBD5AB]/80'
                  }`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}
