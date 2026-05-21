'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const projects = [
  {
    num: "01",
    tag: "E-Commerce / Scale",
    title: "Aura Cosmetics",
    metric: "+314% Revenue",
    metricDesc: "Scaled monthly recurring revenue from $120k to $500k in 9 months.",
    color: "from-brand-blue/20 to-transparent",
    borderColor: "hover:border-brand-blue/30",
    glowColor: "group-hover:shadow-[0_0_30px_rgba(0,240,255,0.15)]",
    tagColor: "text-brand-blue bg-brand-blue/10",
  },
  {
    num: "02",
    tag: "Lead Generation",
    title: "Zenith Tech",
    metric: "4.2x Pipeline ROI",
    metricDesc: "Optimized landing funnel conversions and automated lead routing.",
    color: "from-brand-violet/20 to-transparent",
    borderColor: "hover:border-brand-violet/30",
    glowColor: "group-hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]",
    tagColor: "text-brand-violet bg-brand-violet/10",
  },
  {
    num: "03",
    tag: "SaaS Performance",
    title: "Velo Energy",
    metric: "8.2% Conversion Rate",
    metricDesc: "Designed high-fidelity product loops increasing user activation by 30%.",
    color: "from-brand-blue/20 to-transparent",
    borderColor: "hover:border-brand-blue/30",
    glowColor: "group-hover:shadow-[0_0_30px_rgba(0,240,255,0.15)]",
    tagColor: "text-brand-blue bg-brand-blue/10",
  },
  {
    num: "04",
    tag: "Brand Authority",
    title: "Apex Apparel",
    metric: "12M Organic Views",
    metricDesc: "Scripted, shot, and distributed viral content campaigns across socials.",
    color: "from-brand-violet/20 to-transparent",
    borderColor: "hover:border-brand-violet/30",
    glowColor: "group-hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]",
    tagColor: "text-brand-violet bg-brand-violet/10",
  }
];

export default function OurWork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const scroll = scrollRef.current;
    if (!container || !scroll) return;

    const getScrollAmount = () => {
      const scrollWidth = scroll.scrollWidth;
      const windowWidth = window.innerWidth;
      return -(scrollWidth - windowWidth);
    };

    const tl = gsap.to(scroll, {
      x: getScrollAmount,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        pin: true,
        start: "top top",
        end: () => `+=${scroll.scrollWidth - window.innerWidth}`,
        scrub: 1,
        invalidateOnRefresh: true,
      }
    });

    return () => {
      tl.scrollTrigger?.kill();
    };
  }, []);

  return (
    <div ref={containerRef} id="our-work" className="relative w-full bg-black">
      {/* Horizontal Scroll Wrapper */}
      <div className="h-screen flex flex-col justify-center overflow-hidden py-12">
        <div className="max-w-7xl mx-auto w-full px-6 md:px-12 mb-8 flex justify-between items-end">
          <div className="space-y-3">
            <span className="text-xs font-semibold tracking-[0.2em] text-brand-blue uppercase">
              Portfolio
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Campaigns that{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-violet">
                Move Markets
              </span>
            </h2>
          </div>
          <div className="hidden md:block text-xs font-semibold tracking-widest text-gray-500 uppercase">
            Scroll Down to Slide →
          </div>
        </div>

        {/* Slides Container */}
        <div className="w-full relative">
          <div 
            ref={scrollRef} 
            className="flex gap-8 px-6 md:px-12 w-max group/gallery"
          >
            {projects.map((proj, idx) => (
              <div
                key={idx}
                className={`group relative w-[320px] sm:w-[420px] h-[480px] rounded-2xl glass-card border border-white/5 bg-gradient-to-b ${proj.color} p-8 flex flex-col justify-between overflow-hidden transition-all duration-500 group-hover/gallery:opacity-30 hover:!opacity-100 ${proj.borderColor} ${proj.glowColor}`}
              >
                {/* Visual Top */}
                <div className="flex justify-between items-start">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase ${proj.tagColor}`}>
                    {proj.tag}
                  </span>
                  <span className="text-xl font-mono text-gray-600 font-bold tracking-tighter">
                    {proj.num}
                  </span>
                </div>

                {/* Performance Metric (Glows on Hover) */}
                <div className="py-8 space-y-2">
                  <span className="text-3xl sm:text-4xl font-black text-white tracking-tight drop-shadow-[0_0_12px_rgba(255,255,255,0.05)] group-hover:text-brand-blue transition-colors duration-300">
                    {proj.metric}
                  </span>
                  <p className="text-gray-400 text-sm font-light leading-relaxed">
                    {proj.metricDesc}
                  </p>
                </div>

                {/* Campaign Mockup Visual & Title */}
                <div className="space-y-4">
                  <div className="border-t border-white/5 pt-4 flex justify-between items-center">
                    <h3 className="text-2xl font-bold text-white tracking-tight">
                      {proj.title}
                    </h3>
                    <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-gray-400 group-hover:text-white group-hover:border-white transition-all duration-300">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Case Study Details Overlay (reveals on card hover) */}
                <div className="absolute inset-x-0 bottom-0 bg-bg-card border-t border-white/10 p-8 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex flex-col justify-between h-[50%] z-20">
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-brand-violet tracking-widest uppercase">THE CASE STUDY</span>
                    <h4 className="text-lg font-bold text-white">{proj.title}</h4>
                    <p className="text-xs text-gray-400 leading-relaxed font-light">
                      We combined targeted creative sequencing, predictive custom audience cohorts, and direct landing page optimization to achieve these growth metrics.
                    </p>
                  </div>
                  
                  <button className="flex items-center gap-2 text-xs font-bold tracking-wider text-brand-blue uppercase hover:text-white transition-colors duration-300">
                    Explore Results
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>

                {/* Ambient lights */}
                <div className="absolute top-[-20%] right-[-20%] w-[50%] h-[50%] rounded-full bg-brand-blue/5 blur-[50px] pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
