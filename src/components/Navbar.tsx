'use client';

import React from 'react';

export default function Navbar() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-bg-dark/70 backdrop-blur-md border-b border-white/5 py-4 px-6 md:px-12 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <a 
          href="#" 
          className="relative group text-2xl font-extrabold tracking-wider text-white"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          ONE'O'ONE
          <span className="text-brand-blue">.</span>
          <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-brand-blue transition-all duration-300 group-hover:w-full shadow-[0_0_8px_#00f0ff]" />
        </a>

        {/* Links */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-400">
          <a
            href="#how-we-work"
            onClick={(e) => { e.preventDefault(); scrollToSection('how-we-work'); }}
            className="hover:text-white transition-colors relative py-1 group"
          >
            How We Work
            <span className="absolute -bottom-0.5 left-0 w-0 h-[1.5px] bg-brand-violet transition-all duration-300 group-hover:w-full shadow-[0_0_8px_#8b5cf6]" />
          </a>
          <a
            href="#why-choose-us"
            onClick={(e) => { e.preventDefault(); scrollToSection('why-choose-us'); }}
            className="hover:text-white transition-colors relative py-1 group"
          >
            Why Choose Us
            <span className="absolute -bottom-0.5 left-0 w-0 h-[1.5px] bg-brand-violet transition-all duration-300 group-hover:w-full shadow-[0_0_8px_#8b5cf6]" />
          </a>
          <a
            href="#our-work"
            onClick={(e) => { e.preventDefault(); scrollToSection('our-work'); }}
            className="hover:text-white transition-colors relative py-1 group"
          >
            Our Work
            <span className="absolute -bottom-0.5 left-0 w-0 h-[1.5px] bg-brand-violet transition-all duration-300 group-hover:w-full shadow-[0_0_8px_#8b5cf6]" />
          </a>
          <a
            href="#reviews"
            onClick={(e) => { e.preventDefault(); scrollToSection('reviews'); }}
            className="hover:text-white transition-colors relative py-1 group"
          >
            Reviews
            <span className="absolute -bottom-0.5 left-0 w-0 h-[1.5px] bg-brand-violet transition-all duration-300 group-hover:w-full shadow-[0_0_8px_#8b5cf6]" />
          </a>
        </div>

        {/* CTA Button */}
        <div>
          <button
            onClick={() => scrollToSection('contact')}
            className="relative px-5 py-2 rounded-full text-xs font-semibold tracking-wider text-white border border-brand-blue/30 bg-brand-blue/5 overflow-hidden transition-all duration-300 hover:border-brand-blue hover:text-white shadow-[0_0_15px_rgba(0,240,255,0.05)] hover:shadow-[0_0_20px_rgba(0,240,255,0.2)]"
          >
            GET IN TOUCH
          </button>
        </div>
      </div>
    </nav>
  );
}
