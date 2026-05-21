'use client';

import React from 'react';

const reviewsRow1 = [
  {
    name: "Marcus Vance",
    role: "VP of Growth",
    company: "Scribe Media",
    quote: "One'O'One didn't just run ads; they restructured our entire conversion funnel. Our acquisition costs dropped by 42% in under 90 days.",
    stars: 5,
  },
  {
    name: "Evelyn Zhao",
    role: "Founder & CEO",
    company: "Lumiere Skin",
    quote: "The creative assets they developed were breathtaking. Truly world-class styling that skyrocketed our social conversion rates.",
    stars: 5,
  },
  {
    name: "Devin O'Hara",
    role: "Head of Marketing",
    company: "Novus Cloud",
    quote: "A rare breed of agency. They understand deep data modeling just as well as they understand cutting-edge visual layouts. Superb work.",
    stars: 5,
  },
  {
    name: "Sarah Jenkins",
    role: "E-comm Director",
    company: "Vibe Athletics",
    quote: "We went from flatlining to doing multiple seven-figures. Their scale methodology is systematic and highly effective.",
    stars: 5,
  }
];

const reviewsRow2 = [
  {
    name: "Alexandre Dupoint",
    role: "Chief Marketing Officer",
    company: "Aero Dynamics",
    quote: "They act as a true extension of our growth team. The level of communication and strategic execution is unmatched.",
    stars: 5,
  },
  {
    name: "Natasha Romanoff",
    role: "Marketing Lead",
    company: "RedRoom Tech",
    quote: "Clean code, outstanding creatives, and bulletproof media strategies. One'O'One is the best partner we have ever hired.",
    stars: 5,
  },
  {
    name: "Keanu Reaves",
    role: "Creative Director",
    company: "Matrix VR",
    quote: "Their team built an interactive product page that converted 3x better than our old design. Creative excellence at its peak.",
    stars: 5,
  },
  {
    name: "Sonia Patel",
    role: "Growth Advisor",
    company: "Flex Logistics",
    quote: "If you want to scale past 8 figures, stop trying to do it yourself. Hand it over to the specialists at One'O'One.",
    stars: 5,
  }
];

export default function Reviews() {
  return (
    <section id="reviews" className="relative w-full bg-black py-24 md:py-32 overflow-hidden border-t border-white/5">
      {/* Background glow decoration */}
      <div className="absolute top-[-10%] right-[-10%] w-[35%] h-[35%] rounded-full bg-brand-blue/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[35%] h-[35%] rounded-full bg-brand-violet/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 space-y-3 text-center">
        <span className="text-xs font-semibold tracking-[0.2em] text-brand-violet uppercase">
          Validation
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
          Client Success, <br className="md:hidden" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-violet">
            In Their Own Words
          </span>
        </h2>
      </div>

      {/* Marquee Row 1 (Scrolls Left) */}
      <div className="w-full flex overflow-hidden py-4 select-none relative group/marquee1">
        {/* Shadow masks on sides */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        <div className="flex gap-6 animate-marquee-left group-hover/marquee1:[animation-play-state:paused] shrink-0">
          {[...reviewsRow1, ...reviewsRow1].map((rev, idx) => (
            <div
              key={idx}
              className="w-[300px] sm:w-[380px] rounded-2xl glass-card border border-white/5 bg-bg-card/30 p-6 flex flex-col justify-between space-y-6 shrink-0 transition-colors duration-300 hover:border-brand-blue/30"
            >
              <div className="space-y-3">
                {/* Stars */}
                <div className="flex gap-1">
                  {Array.from({ length: rev.stars }).map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-brand-blue drop-shadow-[0_0_6px_#00f0ff]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-300 text-sm font-light leading-relaxed">
                  "{rev.quote}"
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center space-x-3 pt-4 border-t border-white/5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-blue to-brand-violet flex items-center justify-center font-bold text-xs text-white">
                  {rev.name[0]}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white tracking-wide">{rev.name}</h4>
                  <p className="text-[10px] text-gray-500 font-medium">{rev.role} • {rev.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Row 2 (Scrolls Right) */}
      <div className="w-full flex overflow-hidden py-4 select-none relative group/marquee2 mt-4">
        {/* Shadow masks on sides */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        <div className="flex gap-6 animate-marquee-right group-hover/marquee2:[animation-play-state:paused] shrink-0">
          {[...reviewsRow2, ...reviewsRow2].map((rev, idx) => (
            <div
              key={idx}
              className="w-[300px] sm:w-[380px] rounded-2xl glass-card border border-white/5 bg-bg-card/30 p-6 flex flex-col justify-between space-y-6 shrink-0 transition-colors duration-300 hover:border-brand-violet/30"
            >
              <div className="space-y-3">
                {/* Stars */}
                <div className="flex gap-1">
                  {Array.from({ length: rev.stars }).map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-brand-violet drop-shadow-[0_0_6px_#8b5cf6]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-300 text-sm font-light leading-relaxed">
                  "{rev.quote}"
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center space-x-3 pt-4 border-t border-white/5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-violet to-brand-blue flex items-center justify-center font-bold text-xs text-white">
                  {rev.name[0]}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white tracking-wide">{rev.name}</h4>
                  <p className="text-[10px] text-gray-500 font-medium">{rev.role} • {rev.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee-l {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 12px)); }
        }
        @keyframes marquee-r {
          0% { transform: translateX(calc(-50% - 12px)); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left {
          animation: marquee-l 40s linear infinite;
        }
        .animate-marquee-right {
          animation: marquee-r 40s linear infinite;
        }
      `}</style>
    </section>
  );
}
