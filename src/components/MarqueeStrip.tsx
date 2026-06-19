'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function MarqueeStrip() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  const items = [
    { text: 'Marketing', isAccent: false },
    { text: 'Tech', isAccent: false },
    { text: 'All In One', isAccent: true },
  ];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const ctx = gsap.context(() => {
      // Animate the track horizontally to the left.
      // Translating by -50% shifts it by exactly one full set of items, creating a seamless loop.
      tweenRef.current = gsap.to(track, {
        xPercent: -50,
        ease: 'none',
        duration: 45, // slow and smooth, 40-50 seconds
        repeat: -1,
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const handleMouseEnter = () => {
    if (tweenRef.current) {
      tweenRef.current.pause();
    }
  };

  const handleMouseLeave = () => {
    if (tweenRef.current) {
      tweenRef.current.play();
    }
  };

  // Renders one instance of the items list
  const renderItemsList = () => (
    <div className="flex items-center flex-shrink-0">
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          <span 
            className={`text-[15px] uppercase tracking-[0.15em] select-none ${
              item.isAccent 
                ? 'text-[#00B4D8] font-semibold drop-shadow-[0_0_8px_rgba(0,180,216,0.4)]' 
                : 'text-white font-medium'
            }`}
          >
            {item.text}
          </span>
          <span className="inline-block w-[6px] h-[6px] rounded-full bg-[#00B4D8] mx-[24px] flex-shrink-0" />
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div 
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-14 md:h-16 bg-white/[0.03] border-t border-b border-white/[0.08] flex items-center overflow-hidden z-20 cursor-pointer"
    >
      <div 
        ref={trackRef}
        className="flex whitespace-nowrap flex-row"
      >
        {/* Render two identical groups side-by-side to allow seamless -50% loop */}
        <div className="flex flex-row items-center flex-shrink-0">
          {Array(8).fill(null).map((_, i) => (
            <React.Fragment key={i}>
              {renderItemsList()}
            </React.Fragment>
          ))}
        </div>
        <div className="flex flex-row items-center flex-shrink-0">
          {Array(8).fill(null).map((_, i) => (
            <React.Fragment key={i}>
              {renderItemsList()}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
