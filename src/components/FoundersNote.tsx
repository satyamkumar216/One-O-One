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

    // 2. Magnetic Cursor Repel Physics
    const handleMouseMove = (e: MouseEvent) => {
      // Disable hover physics on mobile to preserve performance
      if (window.innerWidth < 768) return; 

      const { clientX, clientY } = e;
      
      wordsRef.current.forEach((word) => {
        if (!word) return;
        const rect = word.getBoundingClientRect();
        const wordX = rect.left + rect.width / 2;
        const wordY = rect.top + rect.height / 2;
        
        // Calculate distance from cursor to word
        const dist = Math.hypot(clientX - wordX, clientY - wordY);
        const radius = 120; // Magnetic field radius

        if (dist < radius) {
          // Push words away based on proximity
          const angle = Math.atan2(wordY - clientY, wordX - clientX);
          const force = (radius - dist) / radius;
          
          gsap.to(word, {
            x: Math.cos(angle) * force * 30,
            y: Math.sin(angle) * force * 30,
            color: '#00f0ff', // Lights up brand blue on hover
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
      className="relative w-full bg-[#0d0d11] py-16 md:py-28 px-6 overflow-hidden min-h-[80vh] flex items-center justify-center border-t border-white/10"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.1)_0%,rgba(0,0,0,0)_70%)] pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto relative z-10 flex flex-col items-center">
        
        <span className="inline-block text-[11px] font-semibold tracking-[0.12em] text-brand-blue uppercase drop-shadow-[0_0_8px_rgba(0,240,255,0.3)] mb-12">
          {"WHY ONE'O'ONE"}
        </span>

        {/* Dynamic Interactive Text Grid */}
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-2 md:gap-x-4 md:gap-y-4 text-center cursor-default max-w-4xl mx-auto">
          {allWords.map((word, i) => {
            // Differentiate headline styling from body styling
            const isHeadline = i < headline.split(' ').length;
            const isAccent = word.includes('honestly');
            
            return (
              <span
                key={i}
                ref={(el) => {
                  wordsRef.current[i] = el;
                }}
                className={`inline-block transition-colors duration-200 ${
                  isHeadline 
                    ? 'text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white' 
                    : isAccent
                      ? 'text-base md:text-lg font-light text-[#00B4D8]'
                      : 'text-base md:text-lg font-light text-[rgba(255,255,255,0.75)]'
                }`}
              >
                {word}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}