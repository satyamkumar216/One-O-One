'use client';

import React, { useEffect, useRef } from 'react';
import { Clock, Zap, Shield } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function TurnaroundPromise() {
  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const strip = stripRef.current;
    if (!strip) return;

    gsap.fromTo(
      strip,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: strip,
          start: 'top 95%',
          once: true,
        }
      }
    );
  }, []);

  return (
    <div 
      ref={stripRef}
      className="w-full bg-gradient-to-r from-brand-blue/[0.06] to-brand-violet/[0.06] border-t border-b border-brand-blue/12 py-5 px-6 opacity-0"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
        
        {/* Column 1 */}
        <div className="flex items-center gap-3 justify-center py-2 md:py-0 w-full md:w-auto">
          <Clock className="text-brand-blue w-5 h-5 shrink-0 drop-shadow-[0_0_6px_rgba(0,240,255,0.4)]" />
          <span className="text-white font-medium text-sm sm:text-base whitespace-nowrap">
            24-hr response. Guaranteed.
          </span>
        </div>

        {/* Divider 1 / Mobile Line */}
        <div className="hidden md:block w-[1px] h-6 bg-white/15" />
        <hr className="w-full md:hidden border-t border-white/10" />

        {/* Column 2 */}
        <div className="flex items-center gap-3 justify-center py-2 md:py-0 w-full md:w-auto">
          <Zap className="text-brand-violet w-5 h-5 shrink-0 drop-shadow-[0_0_6px_rgba(139,92,246,0.4)]" />
          <span className="text-white font-medium text-sm sm:text-base whitespace-nowrap">
            Campaigns live in 7 days.
          </span>
        </div>

        {/* Divider 2 / Mobile Line */}
        <div className="hidden md:block w-[1px] h-6 bg-white/15" />
        <hr className="w-full md:hidden border-t border-white/10" />

        {/* Column 3 */}
        <div className="flex items-center gap-3 justify-center py-2 md:py-0 w-full md:w-auto">
          <Shield className="text-brand-blue w-5 h-5 shrink-0 drop-shadow-[0_0_6px_rgba(0,240,255,0.4)]" />
          <span className="text-white font-medium text-sm sm:text-base whitespace-nowrap">
            No retainer lock-ins.
          </span>
        </div>

      </div>
    </div>
  );
}
