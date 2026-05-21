'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function FoundersNote() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    // Timeline for staggered reveal
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        once: true,
      }
    });

    // Reveal the three headline lines
    tl.fromTo(
      '.founders-line',
      { opacity: 0, y: 40 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        stagger: 0.15, 
        ease: 'power3.out' 
      }
    );

    // Reveal the body paragraph 0.3s after the headline completes
    tl.fromTo(
      bodyRef.current,
      { opacity: 0 },
      { 
        opacity: 1, 
        duration: 0.6, 
        ease: 'power2.out' 
      },
      '+=0.3'
    );
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full bg-[#0d0d11] py-28 px-6 overflow-hidden"
    >
      {/* Centered subtle radial gradient glow behind text */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-violet/10 blur-[120px] pointer-events-none z-0" 
      />

      <div className="max-w-5xl mx-auto relative z-10 space-y-8">
        
        {/* Overline Label */}
        <span className="inline-block text-[12px] font-semibold tracking-[0.25em] text-brand-blue uppercase drop-shadow-[0_0_8px_rgba(0,240,255,0.3)]">
          WHY ONE'O'ONE
        </span>

        {/* Headline */}
        <h2 
          ref={headlineRef} 
          className="flex flex-col text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight"
        >
          <span className="founders-line opacity-0 inline-block">
            We started with 3 brands.
          </span>
          <span className="founders-line opacity-0 inline-block text-white/60">
            Not because we couldn't find more —
          </span>
          <span className="founders-line opacity-0 inline-block text-transparent bg-clip-text bg-gradient-to-r from-brand-violet to-brand-blue">
            because we only take work we can win.
          </span>
        </h2>

        {/* Body Paragraph */}
        <p 
          ref={bodyRef} 
          className="text-gray-400 text-base sm:text-lg max-w-2xl font-light leading-relaxed opacity-0 pt-4"
        >
          Most agencies take every client they can get. We don't. When we partner 
          with a brand, we go all in — strategy, creatives, execution, and obsessive 
          optimization. That's why our first 3 brands saw real results. And why the 
          next ones will too.
        </p>

        {/* Subtle Horizontal Rule */}
        <div className="pt-8">
          <hr className="border-t border-brand-blue/20 w-full" />
        </div>

      </div>
    </section>
  );
}
