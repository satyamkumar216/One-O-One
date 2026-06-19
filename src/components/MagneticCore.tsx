'use client';

import React, { useEffect, useRef } from 'react';

export default function MagicCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable on touch devices (phones/tablets) so it doesn't get stuck
    if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let isHovering = false;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    // Detect if hovering over a clickable element
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, input, textarea, select, [role="button"], .cursor-pointer')) {
        isHovering = true;
      } else {
        isHovering = false;
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);

    let animationFrameId: number;

    const render = () => {
      // Smooth lerp (linear interpolation) for the trailing ring
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;

      // Update Core Dot (Instant tracking)
      if (dot) {
        dot.style.transform = `translate3d(${mouseX - 4}px, ${mouseY - 4}px, 0)`;
        dot.style.opacity = isHovering ? '0' : '1';
        dot.style.transform += isHovering ? ' scale(0.5)' : ' scale(1)';
      }
      
      // Update Trailing Ring (Smooth physics)
      if (ring) {
        // Expand the ring when hovering over buttons
        const scale = isHovering ? 1.5 : 1;
        ring.style.transform = `translate3d(${ringX - 20}px, ${ringY - 20}px, 0) scale(${scale})`;
        
        // Change colors magnetically on hover
        if (isHovering) {
           ring.style.borderColor = 'rgba(0, 240, 255, 0.8)'; // Brand Blue
           ring.style.backgroundColor = 'rgba(0, 240, 255, 0.05)';
           ring.style.boxShadow = '0 0 15px rgba(0, 240, 255, 0.3)';
        } else {
           ring.style.borderColor = 'rgba(139, 92, 246, 0.5)'; // Brand Violet
           ring.style.backgroundColor = 'transparent';
           ring.style.boxShadow = 'none';
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* Core Glowing Dot */}
      <div 
        ref={dotRef} 
        className="fixed top-0 left-0 w-2 h-2 bg-brand-blue rounded-full pointer-events-none z-[9999] hidden md:block transition-all duration-200 shadow-[0_0_10px_rgba(0,240,255,0.8)]"
        style={{ willChange: 'transform, opacity' }}
      />
      {/* Trailing Geometric Ring */}
      <div 
        ref={ringRef} 
        className="fixed top-0 left-0 w-10 h-10 border-[1.5px] border-brand-violet/50 rounded-full pointer-events-none z-[9998] hidden md:block transition-colors duration-300 ease-out"
        style={{ willChange: 'transform, background-color, border-color, box-shadow' }}
      />
    </>
  );
}