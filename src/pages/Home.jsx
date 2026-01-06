import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBowlRice, faSeedling, faCubes } from '@fortawesome/free-solid-svg-icons';
import { faWheatAwn } from '@fortawesome/free-solid-svg-icons/faWheatAwn';

const Home = ({ onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const products = [
    { icon: faSeedling, title: 'Wheat Grains', desc: 'Hand-cleaned premium wheat', link: '#wheat' },
    { icon: faWheatAwn, title: 'Whole Wheat Aata', desc: 'Freshly milled whole wheat flour', link: '#aata' },
    { icon: faBowlRice, title: 'Basmati Rice', desc: 'Aromatic long-grain rice', link: '#rice' },
    { icon: faCubes, title: 'Cane Sugar', desc: 'Natural unrefined cane sugar', link: '#sugar' },
  ];

  const steps = [
    { num: '01', title: 'Hand Selection', desc: 'Each grain is individually selected by hand for quality' },
    { num: '02', title: 'Meticulous Cleaning', desc: 'Thorough cleaning process removes all impurities' },
    { num: '03', title: 'Quality Control', desc: 'Every batch undergoes strict quality checks' },
    { num: '04', title: 'Careful Packaging', desc: 'Packaged with care to preserve freshness' },
  ];
  return (
    <div className="min-h-screen bg-[#f4efe3] overflow-x-hidden">

      {/* Hero Section */}
      <section className="min-h-screen flex items-center pt-[180px] pb-[100px] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[rgba(139,174,102,0.05)] to-[rgba(235,213,171,0.1)] -z-10" />
        <div className="container mx-auto px-10 max-w-[1400px]">
          <div className="w-full flex justify-center">
            <div className="bg-[rgba(255,255,255,0.75)] backdrop-blur-[20px] rounded-[30px] p-[60px] max-w-[800px] text-center border border-[rgba(255,255,255,0.3)] shadow-[0_12px_50px_rgba(27,33,26,0.15)] animate-float">
              <h1 className="font-serif text-4xl md:text-5xl lg:text-[56px] mb-6 text-[#1B211A] leading-[1.1]">
                Hand-prepared Staples, Modern Purity
              </h1>
              <div className="w-20 h-1 bg-gradient-to-r from-[#628141] to-[#8BAE66] mx-auto mb-8 rounded" />
              <p className="text-base md:text-lg text-[#5A6555] mb-10 leading-[1.8]">
                Each grain is prepared by hand with meticulous attention. We combine traditional care with modern standards for essential foods you can trust.
              </p>
              <button
                onClick={() => onNavigate("products")}
                className="inline-flex items-center gap-3 bg-[#1B211A] text-[#EBD5AB] py-4 px-8 rounded-xl font-semibold text-base transition-all duration-500 hover:bg-[#628141] hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(98,129,65,0.3)]"
              >
                Explore Products
                <ArrowRight size={20} />
              </button>

            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Preview */}
      <section className="py-[120px] bg-white">
        <div className="container mx-auto px-10 max-w-[1400px]">
          <div className="text-center mb-20">
            <h2 className="font-serif text-4xl md:text-5xl mb-4 text-[#1B211A]">Our Essentials</h2>
            <p className="text-[#5A6555] text-lg max-w-[600px] mx-auto">
              Four prestigious staples, perfected one batch at a time
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[30px]">
            {products.map((item, idx) => (
              <a
                key={idx}
                href={item.link}
                className="bg-[rgba(139,174,102,0.05)] rounded-[20px] p-10 text-center no-underline transition-all duration-500 border border-[rgba(139,174,102,0.1)] hover:-translate-y-[10px] hover:bg-[rgba(139,174,102,0.1)] hover:border-[rgba(139,174,102,0.3)] hover:shadow-[0_4px_20px_rgba(27,33,26,0.08)]"
              >
                <div className="w-[70px] h-[70px] bg-gradient-to-br from-[#628141] to-[#8BAE66] rounded-[18px] flex items-center justify-center mx-auto mb-6 text-white">
                  <FontAwesomeIcon icon={item.icon} size="2x" />
                </div>
                <h3 className="font-serif text-[22px] mb-3 text-[#1B211A]">{item.title}</h3>
                <p className="text-[#5A6555] text-[15px]">{item.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-[120px] bg-[#F9F7F2]">
        <div className="container mx-auto px-10 max-w-[1400px]">
          <div className="text-center mb-20">
            <h2 className="font-serif text-4xl md:text-5xl mb-4 text-[#1B211A]">The GrainWorks Method</h2>
            <p className="text-[#5A6555] text-lg max-w-[600px] mx-auto">Meticulous attention in every step</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 relative">
            <div className="absolute top-10 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#8BAE66] to-transparent hidden lg:block" />

            {steps.map((step, idx) => (
              <div
                key={idx}
                className="text-center relative z-10 bg-white p-10 rounded-[20px] border border-[rgba(139,174,102,0.1)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_4px_20px_rgba(27,33,26,0.08)] hover:border-[rgba(139,174,102,0.3)]"
              >
                <div className="font-serif text-5xl font-bold text-[rgba(139,174,102,0.1)] mb-4 leading-none">{step.num}</div>
                <h3 className="font-serif text-xl mb-3 text-[#1B211A]">{step.title}</h3>
                <p className="text-[#5A6555] text-[15px]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
