'use client';

import React, { useState, useRef } from 'react';
import { default as gsapDefault } from 'gsap';
import { supabase } from '@/lib/supabase';

const gsapInstance = gsapDefault;

export default function ContactFooter() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', details: '' });
  const [submitted, setSubmitted] = useState(false);
  const submitBtnRef = useRef<HTMLButtonElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.details) return;

    try {
      const { error } = await supabase
        .from('enquiries')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone || null,
            details: formData.details,
          }
        ]);

      if (error) {
        console.error('Error saving enquiry to Supabase:', error.message);
      }
    } catch (err) {
      console.error('Failed to submit enquiry to Supabase:', err);
    }

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', details: '' });
    }, 3000);
  };

  const handleSubmitHoverEnter = () => {
    if (submitBtnRef.current) {
      gsapInstance.to(submitBtnRef.current, {
        scale: 1.03,
        duration: 0.2,
        ease: 'power2.out',
      });
    }
  };

  const handleSubmitHoverLeave = () => {
    if (submitBtnRef.current) {
      gsapInstance.to(submitBtnRef.current, {
        scale: 1,
        duration: 0.2,
        ease: 'power2.out',
      });
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="contact" className="relative w-full bg-[#08090E]">
      
      {/* 1. Contact Form Container (Sits above the footer scroll-wise) */}
      <div className="relative z-10 bg-[#08090E] py-16 md:py-28 px-6 md:px-12 border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            {/* Left Info Column */}
            <div className="md:col-span-5 space-y-8">
              <div className="space-y-3">
                <span className="text-[11px] font-semibold tracking-[0.12em] text-[#00B4D8] uppercase">
                  GET IN TOUCH
                </span>
                <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white leading-tight">
                  Let&apos;s Build <br />Something <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00B4D8] to-[#7C3AED]">
                    Uncompromising
                  </span>
                </h2>
              </div>

              <div className="space-y-4">
                <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">Why reach out</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-[rgba(255,255,255,0.70)] text-sm">
                    <svg className="w-4 h-4 text-[#00B4D8] shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span>Direct collaboration with the technical leads.</span>
                  </li>
                  <li className="flex items-start gap-3 text-[rgba(255,255,255,0.70)] text-sm">
                    <svg className="w-4 h-4 text-[#00B4D8] shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span>Clean codebases engineered for speed and stability.</span>
                  </li>
                  <li className="flex items-start gap-3 text-[rgba(255,255,255,0.70)] text-sm">
                    <svg className="w-4 h-4 text-[#00B4D8] shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span>Clear scope documentation without the agency fluff.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Form Card Column */}
            <div className="md:col-span-7">
              <div className="bg-white/[0.04] border border-[rgba(255,255,255,0.08)] rounded-2xl p-8 relative overflow-hidden shadow-xl">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-[#00B4D8]/10 border border-[#00B4D8]/30 flex items-center justify-center text-[#00B4D8] shadow-[0_0_15px_rgba(0,180,216,0.2)]">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white">Message Transmitted</h3>
                    <p className="text-[rgba(255,255,255,0.75)] text-sm font-light max-w-sm leading-relaxed">
                      Thank you. We review inquiries personally and will respond within 12 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}
                    <div className="flex flex-col space-y-2">
                      <label className="text-[12px] text-[rgba(255,255,255,0.50)] uppercase tracking-wider font-semibold">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.10)] rounded-xl px-4 py-3 text-white text-sm font-medium focus:outline-none focus:border-[#00B4D8] focus:ring-4 focus:ring-[#00B4D8]/15 transition-all duration-300 placeholder:text-zinc-600"
                        placeholder="Rohit Verma"
                      />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col space-y-2">
                      <label className="text-[12px] text-[rgba(255,255,255,0.50)] uppercase tracking-wider font-semibold">
                        Your Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.10)] rounded-xl px-4 py-3 text-white text-sm font-medium focus:outline-none focus:border-[#00B4D8] focus:ring-4 focus:ring-[#00B4D8]/15 transition-all duration-300 placeholder:text-zinc-600"
                        placeholder="rohit@example.com"
                      />
                    </div>

                    {/* Phone Number */}
                    <div className="flex flex-col space-y-2">
                      <label className="text-[12px] text-[rgba(255,255,255,0.50)] uppercase tracking-wider font-semibold">
                        Phone Number <span className="text-[10px] text-zinc-500 font-normal lowercase">(optional)</span>
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.10)] rounded-xl px-4 py-3 text-white text-sm font-medium focus:outline-none focus:border-[#00B4D8] focus:ring-4 focus:ring-[#00B4D8]/15 transition-all duration-300 placeholder:text-zinc-600"
                        placeholder="98765 43210"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex flex-col space-y-2">
                      <label className="text-[12px] text-[rgba(255,255,255,0.50)] uppercase tracking-wider font-semibold">
                        Project Details
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formData.details}
                        onChange={(e) => setFormData(prev => ({ ...prev, details: e.target.value }))}
                        className="w-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.10)] rounded-xl px-4 py-3 text-white text-sm font-medium focus:outline-none focus:border-[#00B4D8] focus:ring-4 focus:ring-[#00B4D8]/15 transition-all duration-300 resize-none placeholder:text-zinc-600"
                        placeholder="Looking to build a custom internal tool..."
                      />
                    </div>

                    {/* Submit button */}
                    <div className="pt-4 flex justify-center md:justify-end">
                      <button
                        type="submit"
                        ref={submitBtnRef}
                        onMouseEnter={handleSubmitHoverEnter}
                        onMouseLeave={handleSubmitHoverLeave}
                        className="w-full md:w-auto px-8 py-4 rounded-[10px] bg-gradient-to-r from-[#00B4D8] to-[#7C3AED] text-white font-semibold text-xs tracking-widest uppercase hover:brightness-110 transition-all duration-300"
                      >
                        Send Message
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Reassurance line below */}
              <p className="text-center text-[rgba(255,255,255,0.35)] text-[13px] italic mt-4 font-light">
                We review parameters manually and reply within 12 hours.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Pinned Footer Reveal (Sticky bottom, lower z-index) */}
      <footer className="sticky bottom-0 left-0 w-full z-0 bg-[#08090E] border-t border-white/10 py-12 px-6 md:px-12 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-gray-400">
          <div className="flex flex-col items-center sm:items-start space-y-1">
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="text-xl font-extrabold text-white tracking-widest uppercase hover:text-brand-blue transition-colors duration-200"
            >
              ONE&apos;O&apos;ONE<span className="text-brand-blue">.</span>
            </a>
            <p className="text-xs font-light text-zinc-500">
              Building things that work.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-xs">
            <a 
              href="#contact" 
              onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
              className="hover:text-white transition-colors duration-200 font-medium"
            >
              Send Enquiry
            </a>
            <span className="hidden sm:inline text-zinc-800">|</span>
            <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
              © {new Date().getFullYear()} ONE&apos;O&apos;ONE
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
