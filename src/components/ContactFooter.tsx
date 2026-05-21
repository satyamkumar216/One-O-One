'use client';

import React, { useState } from 'react';

export default function ContactFooter() {
  const [formData, setFormData] = useState({ name: '', email: '', details: '' });
  const [focused, setFocused] = useState({ name: false, email: false, details: false });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.details) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', details: '' });
    }, 3000);
  };

  const handleFocus = (field: 'name' | 'email' | 'details') => {
    setFocused(prev => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field: 'name' | 'email' | 'details') => {
    if (!formData[field]) {
      setFocused(prev => ({ ...prev, [field]: false }));
    }
  };

  return (
    <div id="contact" className="relative w-full bg-black">
      
      {/* 1. Contact Form Container (Sits above the footer scroll-wise) */}
      <div className="relative z-10 bg-black py-24 md:py-32 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* Header */}
          <div className="text-center space-y-3">
            <span className="text-xs font-semibold tracking-[0.2em] text-brand-blue uppercase">
              Get in Touch
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Let's Build Something <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-violet">
                Uncompromising
              </span>
            </h2>
          </div>

          {/* Form */}
          <div className="glass-card rounded-2xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-brand-blue to-brand-violet" />

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center space-y-4 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-brand-blue/10 border border-brand-blue/30 flex items-center justify-center text-brand-blue shadow-[0_0_15px_rgba(0,240,255,0.2)]">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white">Message Transmitted</h3>
                <p className="text-gray-400 text-sm font-light max-w-sm">
                  Thank you! Our growth directors will review your parameters and connect within 12 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-10">
                {/* Name */}
                <div className="relative">
                  <label 
                    className={`absolute left-0 bottom-3 transition-all duration-300 pointer-events-none text-sm tracking-wider uppercase font-semibold ${
                      focused.name || formData.name 
                        ? 'translate-y-[-24px] text-[10px] text-brand-blue' 
                        : 'text-gray-500'
                    }`}
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    onFocus={() => handleFocus('name')}
                    onBlur={() => handleBlur('name')}
                    className="w-full border-b border-white/10 bg-transparent py-2.5 text-white font-medium text-sm focus:outline-none focus:border-brand-blue transition-colors duration-300 focus:shadow-[0_1px_0_0_#00f0ff]"
                  />
                </div>

                {/* Email */}
                <div className="relative">
                  <label 
                    className={`absolute left-0 bottom-3 transition-all duration-300 pointer-events-none text-sm tracking-wider uppercase font-semibold ${
                      focused.email || formData.email 
                        ? 'translate-y-[-24px] text-[10px] text-brand-violet' 
                        : 'text-gray-500'
                    }`}
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    onFocus={() => handleFocus('email')}
                    onBlur={() => handleBlur('email')}
                    className="w-full border-b border-white/10 bg-transparent py-2.5 text-white font-medium text-sm focus:outline-none focus:border-brand-violet transition-colors duration-300 focus:shadow-[0_1px_0_0_#8b5cf6]"
                  />
                </div>

                {/* Details */}
                <div className="relative">
                  <label 
                    className={`absolute left-0 top-1 transition-all duration-300 pointer-events-none text-sm tracking-wider uppercase font-semibold ${
                      focused.details || formData.details 
                        ? 'translate-y-[-20px] text-[10px] text-brand-blue' 
                        : 'text-gray-500'
                    }`}
                  >
                    Project Details
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.details}
                    onChange={(e) => setFormData(prev => ({ ...prev, details: e.target.value }))}
                    onFocus={() => handleFocus('details')}
                    onBlur={() => handleBlur('details')}
                    className="w-full border-b border-white/10 bg-transparent py-2 text-white font-medium text-sm focus:outline-none focus:border-brand-blue transition-colors duration-300 focus:shadow-[0_1px_0_0_#00f0ff] resize-none"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-4 flex justify-center md:justify-end">
                  <button
                    type="submit"
                    className="group relative px-8 py-4 rounded-full border border-brand-blue/30 bg-brand-blue/5 text-white font-bold text-xs tracking-widest uppercase transition-all duration-300 shadow-[0_0_15px_rgba(0,240,255,0.05)] hover:shadow-[0_0_25px_rgba(0,240,255,0.25)] hover:border-brand-blue"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Send Message
                      <svg className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-300 text-brand-violet" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* 2. Pinned Footer Reveal (Sticky bottom, lower z-index) */}
      <footer className="sticky bottom-0 left-0 w-full z-0 bg-bg-card/50 border-t border-white/5 py-16 px-6 md:px-12 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-sm text-gray-400">
          
          {/* Logo column */}
          <div className="space-y-4 md:col-span-2">
            <a href="#" className="text-2xl font-extrabold text-white tracking-widest uppercase">
              ONE'O'ONE<span className="text-brand-blue">.</span>
            </a>
            <p className="text-xs font-light max-w-sm leading-relaxed">
              We engineer conversion funnels and high-impact digital experiences for market leaders. Uncompromising performance, creative excellence, scaling systems.
            </p>
            <div className="text-[10px] font-mono text-gray-600">
              © {new Date().getFullYear()} ONE'O'ONE AGENCY. ALL RIGHTS RESERVED.
            </div>
          </div>

          {/* Directory column */}
          <div className="space-y-4">
            <h4 className="text-white font-bold tracking-wider uppercase text-xs">Directory</h4>
            <ul className="space-y-2 text-xs font-light">
              <li>
                <a href="#how-we-work" className="hover:text-white transition-colors duration-200">How We Work</a>
              </li>
              <li>
                <a href="#why-choose-us" className="hover:text-white transition-colors duration-200">Why Choose Us</a>
              </li>
              <li>
                <a href="#our-work" className="hover:text-white transition-colors duration-200">Our Work</a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition-colors duration-200">Client Reviews</a>
              </li>
            </ul>
          </div>

          {/* Social column */}
          <div className="space-y-4">
            <h4 className="text-white font-bold tracking-wider uppercase text-xs">Connect</h4>
            <ul className="space-y-2 text-xs font-light">
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200 flex items-center gap-2">
                  <span className="w-1 h-1 bg-brand-blue rounded-full shadow-[0_0_8px_#00f0ff]" /> X / Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200 flex items-center gap-2">
                  <span className="w-1 h-1 bg-brand-violet rounded-full shadow-[0_0_8px_#8b5cf6]" /> LinkedIn
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200 flex items-center gap-2">
                  <span className="w-1 h-1 bg-brand-blue rounded-full shadow-[0_0_8px_#00f0ff]" /> Instagram
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200 flex items-center gap-2">
                  <span className="w-1 h-1 bg-brand-violet rounded-full shadow-[0_0_8px_#8b5cf6]" /> Dribbble
                </a>
              </li>
            </ul>
          </div>

        </div>
      </footer>
    </div>
  );
}
