'use client';

import React, { useEffect, useRef } from 'react';
import { default as gsapDefault } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const gsapInstance = gsapDefault;

interface Review {
  id: number;
  name: string;
  role: string;
  quote: string;
  rating: number;
  initials: string;
  themeColor: 'blue' | 'violet';
}

const reviews: Review[] = [
  {
    id: 1,
    name: 'Rohit Verma',
    role: 'Gym Owner',
    quote: 'I was skeptical about getting a proper system built, but the team delivered something genuinely useful. Member tracking and fee management are now actually organized. Good communication throughout.',
    rating: 4.5,
    initials: 'RV',
    themeColor: 'blue',
  },
  {
    id: 2,
    name: 'Raunak Manna',
    role: 'Owner, Raunak Manna Films',
    quote: 'The website looks exactly how I imagined — professional without being generic. The dashboard made managing enquiries so much simpler. Really happy with how it came together.',
    rating: 5,
    initials: 'RM',
    themeColor: 'violet',
  },
  {
    id: 3,
    name: 'Deepak Agarwal',
    role: 'Small Business Owner',
    quote: 'Straightforward to use, which is what I needed. No unnecessary complexity. The team was responsive and actually listened to what the workflow needed to look like.',
    rating: 4,
    initials: 'DA',
    themeColor: 'blue',
  },
  {
    id: 4,
    name: 'Dhiman',
    role: 'Staff, Bridal Agency',
    quote: 'The custom dashboard built for our agency has completely streamlined our internal operations. Managing staff salaries, tracking payments, and recording bookings is incredibly fast and hassle-free now.',
    rating: 4.5,
    initials: 'D',
    themeColor: 'blue',
  }
];

export default function Reviews() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsapInstance.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsapInstance.context(() => {
      const validCards = cardsRef.current.filter((c): c is HTMLDivElement => c !== null);
      
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsapInstance.set(validCards, { opacity: 1, y: 0 });
      } else {
        gsapInstance.fromTo(
          validCards,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.12,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none none',
            }
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 !== 0;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <svg key={i} className="w-3.5 h-3.5 text-[#00B4D8]" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      } else if (i === fullStars + 1 && hasHalf) {
        stars.push(
          <svg key={i} className="w-3.5 h-3.5 text-[#00B4D8]" fill="currentColor" viewBox="0 0 20 20">
            <defs>
              <linearGradient id={`halfGrad-${rating}`}>
                <stop offset="50%" stopColor="#00B4D8" />
                <stop offset="50%" stopColor="#3f3f46" />
              </linearGradient>
            </defs>
            <path fill={`url(#halfGrad-${rating})`} d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      } else {
        stars.push(
          <svg key={i} className="w-3.5 h-3.5 text-zinc-700" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      }
    }
    return stars;
  };

  return (
    <section
      ref={sectionRef}
      id="reviews"
      className="relative w-full bg-[#08090E] py-16 md:py-28 px-6 overflow-hidden border-t border-white/10"
    >
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,180,216,0.02)_0%,rgba(0,0,0,0)_70%)] pointer-events-none z-0" />

      <div className="max-w-5xl mx-auto relative z-10 flex flex-col items-center">
        
        {/* Eyebrow and Headline */}
        <div className="text-center mb-16">
          <span className="text-[#00B4D8] tracking-[0.12em] text-[11px] font-semibold uppercase mb-3 block">
            REVIEWS
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            What Clients <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A78BFA] to-[#7C3AED]">Say</span>
          </h2>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {reviews.map((rev, idx) => {
            const isViolet = rev.themeColor === 'violet';
            const accentBorder = isViolet ? 'border-l-2 border-l-[#7C3AED]' : 'border-l-2 border-l-[#00B4D8]';

            return (
              <div
                key={rev.id}
                ref={(el) => {
                  cardsRef.current[idx] = el;
                }}
                className={`opacity-0 relative rounded-2xl border border-white/10 ${accentBorder} bg-white/[0.04] backdrop-blur-md p-6 flex flex-col justify-between h-[250px] transition-all duration-300 hover:border-[#00B4D8]/35 hover:shadow-[0_0_15px_rgba(0,180,216,0.15)] shadow-sm`}
              >
                <div className="space-y-4">
                  {/* Stars container - teal/cyan */}
                  <div className="flex gap-1">
                    {renderStars(rev.rating)}
                  </div>

                  {/* Quote - italic, rgba(255,255,255,0.75) */}
                  <p className="text-[rgba(255,255,255,0.75)] text-xs sm:text-sm italic font-light leading-relaxed">
                    &quot;{rev.quote}&quot;
                  </p>
                </div>

                {/* Client info - avatar + name block */}
                <div className="flex items-center space-x-3 pt-4 border-t border-white/5 mt-auto">
                  {/* Avatar circle - teal-to-purple gradient */}
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#00B4D8] to-[#7C3AED] flex items-center justify-center font-bold text-xs text-white shadow-md">
                    {rev.initials}
                  </div>
                  <div>
                    {/* Name - white, 600 weight */}
                    <h4 className="text-xs font-semibold text-white tracking-wide">
                      {rev.name}
                    </h4>
                    {/* Role - muted, smaller */}
                    <p className="text-[10px] text-[rgba(255,255,255,0.45)] font-light mt-0.5">
                      {rev.role}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
