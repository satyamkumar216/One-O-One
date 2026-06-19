'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import * as THREE from 'three';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  const line1Text = "ONE'O'ONE";
  const line2Text = "AGENCY";

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 100;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const particleCount = window.innerWidth < 768 ? 800 : 2000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorBlue = new THREE.Color('#00f0ff');
    const colorViolet = new THREE.Color('#8b5cf6');

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 220;     
      positions[i + 1] = (Math.random() - 0.5) * 220; 
      positions[i + 2] = (Math.random() - 0.5) * 220; 

      const mixedColor = i % 6 === 0 ? colorBlue : colorViolet;
      colors[i] = mixedColor.r;
      colors[i + 1] = mixedColor.g;
      colors[i + 2] = mixedColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const createCircleTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 16;
      canvas.height = 16;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.8)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 16, 16);
      }
      return new THREE.CanvasTexture(canvas);
    };

    const material = new THREE.PointsMaterial({
      size: 1.5,
      map: createCircleTexture(),
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX - window.innerWidth / 2) * 0.05;
      mouseY = (e.clientY - window.innerHeight / 2) * 0.05;
    };

    window.addEventListener('mousemove', handleMouseMove);
    const clock = new THREE.Clock();
    let animationFrameId: number;

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();

      points.rotation.y = elapsedTime * 0.02;
      points.rotation.x = elapsedTime * 0.01;

      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      points.position.x = targetX * 0.5;
      points.position.y = -targetY * 0.5;

      const positionsArray = geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        positionsArray[i3 + 1] += Math.sin(elapsedTime + positionsArray[i3]) * 0.02;
      }
      geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(tick);
    };
    tick();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(labelRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 0.3 });

      tl.fromTo(
        '.hero-char-1',
        { y: -40, opacity: 0, rotateX: 90, scale: 0.6 },
        { y: 0, opacity: 1, rotateX: 0, scale: 1, stagger: 0.045, ease: 'back.out(1.4)', duration: 0.6 },
        '-=0.3'
      );

      tl.fromTo(
        '.hero-char-2',
        { y: 40, opacity: 0, rotateX: -90, scale: 0.6 },
        { y: 0, opacity: 1, rotateX: 0, scale: 1, stagger: 0.055, ease: 'back.out(1.6)', duration: 0.65 },
        '<0.15'
      );

      tl.fromTo('.hero-shimmer', { xPercent: -100 }, { xPercent: 250, duration: 1.2, ease: 'power2.inOut' });

      tl.fromTo(
        [subtitleRef.current, ctaRef.current],
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' },
        '-=0.8'
      );

      tl.eventCallback('onComplete', () => {
        gsap.to(titleRef.current, { y: -8, duration: 3, ease: 'sine.inOut', yoyo: true, repeat: -1 });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const btn = ctaRef.current;
    if (!btn) return;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) return;

    const onButtonMouseMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const btnX = rect.left + rect.width / 2;
      const btnY = rect.top + rect.height / 2;

      const distX = e.clientX - btnX;
      const distY = e.clientY - btnY;

      const distance = Math.hypot(distX, distY);

      if (distance < 120) {
        gsap.to(btn, { x: distX * 0.35, y: distY * 0.35, duration: 0.3, ease: 'power2.out' });
        const text = btn.querySelector('.btn-text');
        if (text) {
          gsap.to(text, { x: distX * 0.15, y: distY * 0.15, duration: 0.3, ease: 'power2.out' });
        }
      } else {
        resetBtn();
      }
    };

    const resetBtn = () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.3)' });
      const text = btn.querySelector('.btn-text');
      if (text) {
        gsap.to(text, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.3)' });
      }
    };

    window.addEventListener('mousemove', onButtonMouseMove);
    return () => window.removeEventListener('mousemove', onButtonMouseMove);
  }, []);

  return (
    // Fixed: Using 100dvh guarantees mobile browsers don't clip the bottom CTA buttons 
    <section ref={containerRef} className="relative w-full h-[100dvh] overflow-hidden flex flex-col justify-center items-center bg-black">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full pointer-events-none z-0" />
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.08)_0%,rgba(0,0,0,0.8)_80%)] pointer-events-none z-0" />
      
      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl px-4 sm:px-6 w-full" style={{ perspective: "800px", perspectiveOrigin: "50% 50%" }}>
        <span ref={labelRef} className="text-[10px] sm:text-xs md:text-sm font-semibold tracking-[0.25em] text-brand-blue mb-4 uppercase drop-shadow-[0_0_8px_rgba(0,240,255,0.4)]">
          Creative Strategy • Performance Marketing
        </span>

        <h1 ref={titleRef} className="text-center select-none mb-4 sm:mb-6 relative w-full">
          <span 
            className="block whitespace-nowrap overflow-hidden text-white tracking-tight leading-none py-1 sm:py-2" 
            id="hero-line-1"
            style={{ fontSize: 'clamp(2.5rem, 11vw, 10rem)', fontWeight: 900 }}
          >
            {line1Text.split('').map((char, index) => (
              <span key={index} className="hero-char-1 inline-block">{char}</span>
            ))}
          </span>
          <span 
            className="block whitespace-nowrap overflow-hidden relative tracking-tight leading-none py-1 sm:py-2" 
            id="hero-line-2"
            style={{ fontSize: 'clamp(2.5rem, 11vw, 10rem)', fontWeight: 900 }}
          >
            {line2Text.split('').map((char, index) => (
              <span 
                key={index} 
                className="hero-char-2 inline-block"
                style={{ 
                  background: 'linear-gradient(90deg, #00f0ff 0%, #a855f7 100%)',
                  backgroundSize: '600% 100%',
                  backgroundPosition: `${(index / (line2Text.length - 1)) * 100}% 0%`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {char}
              </span>
            ))}
            <div className="hero-shimmer absolute top-0 left-0 h-full w-[60%] pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.35) 50%, transparent 100%)', transform: 'skewX(-15deg) translateX(-100%)', mixBlendMode: 'overlay' }} />
          </span>
        </h1>

        <p ref={subtitleRef} className="text-gray-400 text-xs sm:text-sm md:text-xl max-w-2xl font-light tracking-wide mb-8 sm:mb-10 leading-relaxed px-2">
          We build hyper-dynamic brand experiences and scaling campaigns that turn digital noise into compound revenue.
        </p>

        <button
          ref={ctaRef}
          onClick={() => {
            const el = document.getElementById('how-we-work');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="group relative flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 rounded-full border border-brand-violet/40 bg-brand-violet/10 text-white font-semibold text-xs sm:text-sm tracking-widest uppercase transition-all duration-300 shadow-[0_0_20px_rgba(139,92,246,0.15)] hover:shadow-[0_0_35px_rgba(139,92,246,0.45)] hover:border-brand-violet pointer-events-auto"
        >
          <span className="btn-text relative z-10 flex items-center gap-2">
            Get Started
            <svg className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-300 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.15)_0%,transparent_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </button>
      </div>

      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand-blue/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-brand-violet/10 blur-[120px] pointer-events-none" />

      <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 z-10 pointer-events-none opacity-60">
        <span className="text-[9px] sm:text-[10px] font-semibold tracking-widest text-gray-500 uppercase">Scroll Down</span>
        <div className="w-[1.5px] h-8 sm:h-10 bg-gradient-to-b from-brand-blue to-transparent relative overflow-hidden rounded">
          <div className="absolute top-0 left-0 w-full h-[30%] bg-white animate-scroll-indicator" />
        </div>
      </div>
      <style jsx global>{`
        @keyframes scroll-indicator-line {
          0% { top: -100%; }
          70% { top: 100%; }
          100% { top: 100%; }
        }
        .animate-scroll-indicator {
          position: absolute;
          animation: scroll-indicator-line 2s cubic-bezier(0.16, 1, 0.3, 1) infinite;
        }
      `}</style>
    </section>
  );
}