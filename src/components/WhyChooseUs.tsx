'use client';

import React, { useRef } from 'react';

function BentoCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`group relative overflow-hidden rounded-2xl glass-card p-6 md:p-8 flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-300 border border-white/5 hover:border-brand-blue/20 bg-bg-card/40 ${className}`}
    >
      {/* Tracking Glow Mask */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
        style={{
          background: `radial-gradient(350px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(0, 240, 255, 0.12) 0%, rgba(139, 92, 246, 0.05) 50%, transparent 100%)`,
        }}
      />
      <div className="relative z-10 flex flex-col h-full justify-between gap-6">
        {children}
      </div>
    </div>
  );
}

export default function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="relative w-full bg-black py-24 md:py-32 px-6 md:px-12 overflow-hidden border-t border-white/5">
      {/* Glowing Ambient Light */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-violet/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* Title */}
        <div className="text-center md:text-left space-y-3">
          <span className="text-xs font-semibold tracking-[0.2em] text-brand-blue uppercase">
            Advantages
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Built for the <br className="hidden md:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-violet">
              Modern Attention Economy
            </span>
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px] md:auto-rows-[280px]">
          
          {/* Card 1: Data-Driven Performance (Large Card) */}
          <BentoCard className="md:col-span-2 md:row-span-2">
            <div className="flex justify-between items-start">
              <div className="p-3 bg-brand-blue/10 border border-brand-blue/20 rounded-xl">
                <svg className="w-6 h-6 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <span className="text-xs font-semibold tracking-widest text-gray-500 uppercase">01 / ANALYTICS</span>
            </div>

            {/* Embedded Chart Graphic */}
            <div className="flex-1 flex items-center justify-center py-4">
              <div className="relative w-full h-[120px] border-b border-l border-white/10 flex items-end px-4">
                {/* Neon Glowing Line SVG */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 120" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.8" />
                    </linearGradient>
                    <linearGradient id="chartAreaGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#00f0ff" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  {/* Filled area */}
                  <path 
                    d="M0 120 Q50 90, 100 80 T200 40 T300 20 T400 10 L400 120 Z" 
                    fill="url(#chartAreaGradient)"
                  />
                  {/* Glowing Stroke */}
                  <path 
                    d="M0 120 Q50 90, 100 80 T200 40 T300 20 T400 10" 
                    fill="none" 
                    stroke="url(#chartGradient)" 
                    strokeWidth="3.5" 
                    className="drop-shadow-[0_0_8px_#00f0ff]"
                  />
                  {/* Glowing Dots */}
                  <circle cx="200" cy="40" r="4.5" fill="#00f0ff" className="animate-pulse shadow-[0_0_12px_#00f0ff]" />
                  <circle cx="300" cy="20" r="4.5" fill="#8b5cf6" className="animate-pulse shadow-[0_0_12px_#8b5cf6]" />
                  <circle cx="400" cy="10" r="5" fill="#8b5cf6" className="shadow-[0_0_12px_#8b5cf6]" />
                </svg>
                {/* Legends */}
                <div className="absolute top-2 left-4 text-[10px] font-semibold text-gray-500">CONVERSIONS RATE OVER TIME</div>
                <div className="absolute top-2 right-4 text-[10px] font-semibold text-brand-blue shadow-pulse">+184% GROWTH</div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white tracking-tight">Data-Driven Performance</h3>
              <p className="text-gray-400 text-sm font-light leading-relaxed">
                Precision over guesswork. We analyze over 50+ data channels to capture audience intent, optimize media spends, and predict campaign conversions in real-time.
              </p>
            </div>
          </BentoCard>

          {/* Card 2: Creative Excellence (Medium Card) */}
          <BentoCard className="md:col-span-1 md:row-span-2">
            <div className="flex justify-between items-start">
              <div className="p-3 bg-brand-violet/10 border border-brand-violet/20 rounded-xl">
                <svg className="w-6 h-6 text-brand-violet" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <span className="text-xs font-semibold tracking-widest text-gray-500 uppercase">02 / BRANDING</span>
            </div>

            {/* Glowing abstract graphic */}
            <div className="flex-1 flex items-center justify-center relative py-4">
              <div className="relative w-28 h-28 flex items-center justify-center">
                {/* Dual glowing rings */}
                <div className="absolute w-full h-full border border-dashed border-brand-blue/30 rounded-full animate-[spin_12s_linear_infinite]" />
                <div className="absolute w-[80%] h-[80%] border border-dashed border-brand-violet/30 rounded-full animate-[spin_8s_linear_infinite_reverse]" />
                <div className="w-[50%] h-[50%] rounded-full bg-gradient-to-tr from-brand-blue/30 to-brand-violet/30 backdrop-blur-md flex items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.2)]">
                  <span className="text-[10px] font-black text-white tracking-widest">101</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white tracking-tight">Creative Excellence</h3>
              <p className="text-gray-400 text-sm font-light leading-relaxed">
                Stunning aesthetics engineered for results. We build cinematic assets and copywriting angles that stand out and command action.
              </p>
            </div>
          </BentoCard>

          {/* Card 3: ROI Focused (Row Card) */}
          <BentoCard className="md:col-span-1 md:row-span-1">
            <div className="flex justify-between items-start">
              <span className="text-xs font-semibold tracking-widest text-gray-500 uppercase">03 / METRICS</span>
            </div>

            <div className="flex items-center gap-6 py-2">
              <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-brand-blue font-mono tracking-tighter">
                3.8x
              </div>
              <div className="text-xs font-medium text-gray-400 leading-tight">
                Average client <br />
                <span className="text-brand-blue font-bold">Return on Ad Spend (ROAS)</span>
              </div>
            </div>

            <p className="text-gray-400 text-xs sm:text-sm font-light leading-relaxed">
              Incremental sales, not vanity metrics. Every dollar of investment is fully trackable to revenue.
            </p>
          </BentoCard>

          {/* Card 4: Omnichannel Integration (Horizontal Card) */}
          <BentoCard className="md:col-span-2 md:row-span-1">
            <div className="flex justify-between items-start">
              <span className="text-xs font-semibold tracking-widest text-gray-500 uppercase">04 / INTEGRATIONS</span>
              <div className="text-[10px] font-bold text-brand-violet shadow-pulse uppercase tracking-wider">Omnichannel Sync</div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
              <div className="flex flex-col space-y-1">
                <span className="text-white text-base font-bold">Google Ads</span>
                <span className="text-xs font-light text-gray-400">Search & PMax</span>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-white text-base font-bold">Meta Suite</span>
                <span className="text-xs font-light text-gray-400">Scale campaigns</span>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-white text-base font-bold">TikTok Ads</span>
                <span className="text-xs font-light text-gray-400">Creative loops</span>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-white text-base font-bold">Klaviyo CRM</span>
                <span className="text-xs font-light text-gray-400">Behavioral flows</span>
              </div>
            </div>

            <p className="text-gray-400 text-xs sm:text-sm font-light leading-relaxed">
              We sync your entire acquisition funnel. By aligning traffic, landing pages, and email cycles, we maximize customer lifetime value.
            </p>
          </BentoCard>

        </div>
      </div>
    </section>
  );
}
