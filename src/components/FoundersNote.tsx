'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function FoundersNote() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);

  const headline = "We don't take every project. We take the ones we can actually deliver.";
  const body = "Most agencies say yes to everything and figure it out later. We don't work that way. Before we commit, we understand the problem. We scope it honestly. We tell you if something isn't feasible. And when we do take it on — we see it through completely. That's not a pitch. That's just how we've worked from day one.";

  // Combine and split text for individual word manipulation
  const allWords = [...headline.split(' '), ...body.split(' ')];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(wordsRef.current, { opacity: 1, filter: 'blur(0px)' });
      } else {
        // 1. Scroll Scrub Reveal: Words light up as you scroll down
        gsap.fromTo(
          wordsRef.current,
          { opacity: 0.15, filter: 'blur(4px)' },
          {
            opacity: 1,
            filter: 'blur(0px)',
            stagger: 0.05,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top 60%',
              end: 'bottom 80%',
              scrub: true,
            }
          }
        );
      }
    }, sectionRef);

    // 2. Magnetic Cursor Repel Physics with Dynamic Rainbow Glows
    const handleMouseMove = (e: MouseEvent) => {
      // Disable hover physics on mobile to preserve performance
      if (window.innerWidth < 768) return; 

      const { clientX, clientY } = e;
      
      wordsRef.current.forEach((word, i) => {
        if (!word) return;
        const rect = word.getBoundingClientRect();
        const wordX = rect.left + rect.width / 2;
        const wordY = rect.top + rect.height / 2;
        
        // Calculate distance from cursor to word
        const dist = Math.hypot(clientX - wordX, clientY - wordY);
        const radius = 120; // Magnetic field radius

        const isHeadline = i < headline.split(' ').length;

        if (dist < radius) {
          // Push words away based on proximity
          const angle = Math.atan2(wordY - clientY, wordX - clientX);
          const force = (radius - dist) / radius;
          
          // Dynamic neon hover colors matching the rainbow gradient theme
          const hoverColor = isHeadline 
            ? '#00f0ff' // brand-blue
            : (i % 3 === 0 ? '#a855f7' : (i % 3 === 1 ? '#ec4899' : '#00f0ff'));
          
          gsap.to(word, {
            x: Math.cos(angle) * force * 30,
            y: Math.sin(angle) * force * 30,
            color: hoverColor,
            duration: 0.3,
            ease: 'power2.out',
            overwrite: 'auto'
          });
        } else {
          // Snap back to original position
          gsap.to(word, {
            x: 0,
            y: 0,
            color: 'inherit',
            duration: 0.8,
            ease: 'elastic.out(1, 0.3)',
            overwrite: 'auto'
          });
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      ctx.revert();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section 
      id="founders-note"
      ref={sectionRef} 
      className="relative w-full bg-[#07080a] py-24 md:py-32 px-6 overflow-hidden min-h-[90vh] flex items-center justify-center border-t border-white/5"
    >
      {/* Cyber Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none z-0" />

      {/* Layered vibrant neon background glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.08)_0%,rgba(0,0,0,0)_70%)] pointer-events-none z-0 filter blur-[40px]" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.12)_0%,rgba(0,0,0,0)_70%)] pointer-events-none z-0 filter blur-[40px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.05)_0%,rgba(0,0,0,0)_70%)] pointer-events-none z-0 filter blur-[60px]" />

      <div className="max-w-6xl mx-auto relative z-10 flex flex-col items-center w-full">
        
        {/* Large, colorful, gradient Title with neon drop-shadow */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-wider mb-16 text-center uppercase bg-clip-text text-transparent bg-gradient-to-r from-[#00f0ff] via-[#a855f7] to-[#ec4899] drop-shadow-[0_0_25px_rgba(168,85,247,0.35)] relative select-none">
          {"WHY ONE'O'ONE"}
          <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-32 h-[3px] bg-gradient-to-r from-[#00f0ff] to-[#a855f7] rounded-full shadow-[0_0_10px_rgba(0,240,255,0.5)]" />
        </h2>

        {/* Futuristic Glassmorphic Panel Container */}
        <div className="relative max-w-4xl w-full rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-md p-8 md:p-14 shadow-[0_8px_32px_rgba(0,0,0,0.5)] hover:border-[#00f0ff]/15 transition-all duration-500 group">
          
          {/* Neon Corner Brackets */}
          <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#00f0ff]/30 rounded-tl-xl group-hover:border-[#00f0ff] transition-colors duration-500" />
          <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#a855f7]/30 rounded-tr-xl group-hover:border-[#a855f7] transition-colors duration-500" />
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#a855f7]/30 rounded-bl-xl group-hover:border-[#a855f7] transition-colors duration-500" />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#ec4899]/30 rounded-br-xl group-hover:border-[#ec4899] transition-colors duration-500" />

          {/* Dynamic Interactive Text Grid */}
          <div className="flex flex-wrap justify-center gap-x-2.5 gap-y-2 md:gap-x-3.5 md:gap-y-3 text-center cursor-default mx-auto relative z-10">
            {allWords.map((word, i) => {
              // Differentiate headline styling from body styling
              const isHeadline = i < headline.split(' ').length;
              
              // Key words to emphasize before hover
              const accentWords = ['deliver.', 'understand', 'honestly.', 'completely.', 'pitch.', 'commitment', 'honesty'];
              const isAccent = accentWords.some(accent => word.toLowerCase().includes(accent.toLowerCase()));
              
              return (
                <span
                  key={i}
                  ref={(el) => {
                    wordsRef.current[i] = el;
                  }}
                  className={`inline-block transition-colors duration-300 ${
                    isHeadline 
                      ? 'text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-white' 
                      : isAccent
                        ? 'text-sm sm:text-base md:text-lg font-medium text-[#00B4D8]'
                        : 'text-sm sm:text-base md:text-lg font-light text-white/50'
                  }`}
                >
                  {word}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}