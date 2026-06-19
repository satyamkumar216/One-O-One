'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false); // Close mobile menu if open
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'How We Work', id: 'how-we-work' },
    { name: 'Our Team', id: 'our-work' },
    { name: 'Why Choose Us', id: 'founders-note' },
    { name: 'Reviews', id: 'reviews' },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          isScrolled 
            ? 'bg-black/80 backdrop-blur-xl border-b border-white/5 py-4' 
            : 'bg-transparent border-b border-transparent py-6'
        } px-6 md:px-12`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo */}
          <a 
            href="#" 
            className="relative group text-2xl font-extrabold tracking-wider text-white z-50"
            onClick={(e) => {
              e.preventDefault();
              setIsMobileMenuOpen(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            ONE'O'ONE
            <span className="text-brand-blue">.</span>
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-brand-blue transition-all duration-300 group-hover:w-full shadow-[0_0_8px_#00f0ff]" />
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-400">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => { e.preventDefault(); scrollToSection(link.id); }}
                className="hover:text-white transition-colors relative py-1 group"
              >
                {link.name}
                <span className="absolute -bottom-0.5 left-0 w-0 h-[1.5px] bg-brand-violet transition-all duration-300 group-hover:w-full shadow-[0_0_8px_#8b5cf6]" />
              </a>
            ))}
          </div>

          {/* CTA Button & Mobile Toggle */}
          <div className="flex items-center gap-4 z-50">
            <button
              onClick={() => scrollToSection('contact')}
              className="hidden md:block relative px-5 py-2 rounded-full text-xs font-semibold tracking-wider text-white border border-brand-blue/30 bg-brand-blue/5 overflow-hidden transition-all duration-300 hover:border-brand-blue hover:text-white shadow-[0_0_15px_rgba(0,240,255,0.05)] hover:shadow-[0_0_20px_rgba(0,240,255,0.2)]"
            >
              GET IN TOUCH
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden text-white p-2 focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-brand-blue drop-shadow-[0_0_8px_rgba(0,240,255,0.5)]" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-[90] bg-black/95 backdrop-blur-2xl transition-all duration-500 ease-in-out md:hidden flex flex-col items-center justify-center ${
          isMobileMenuOpen 
            ? 'opacity-100 pointer-events-auto translate-y-0' 
            : 'opacity-0 pointer-events-none -translate-y-8'
        }`}
      >
        <div className="flex flex-col items-center space-y-8 text-center">
          {navLinks.map((link, i) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => { e.preventDefault(); scrollToSection(link.id); }}
              className="text-2xl font-bold text-white tracking-widest hover:text-brand-blue transition-colors duration-300"
              style={{
                transitionDelay: isMobileMenuOpen ? `${100 + i * 50}ms` : '0ms',
                opacity: isMobileMenuOpen ? 1 : 0,
                transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
              }}
            >
              {link.name}
            </a>
          ))}
          
          <button
            onClick={() => scrollToSection('contact')}
            className="mt-8 relative px-8 py-4 rounded-full text-sm font-semibold tracking-widest text-white border border-brand-violet/50 bg-brand-violet/10 overflow-hidden transition-all duration-300 shadow-[0_0_20px_rgba(139,92,246,0.2)]"
            style={{
              transitionDelay: isMobileMenuOpen ? '300ms' : '0ms',
              opacity: isMobileMenuOpen ? 1 : 0,
              transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
            }}
          >
            START A PROJECT
          </button>
        </div>

        {/* Ambient Glows for Mobile Menu */}
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-brand-blue/10 blur-[100px] pointer-events-none" />
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-brand-violet/10 blur-[100px] pointer-events-none" />
      </div>
    </>
  );
}