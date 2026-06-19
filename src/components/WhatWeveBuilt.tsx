'use client';

import React, { useState, useRef, useEffect } from 'react';
import { default as gsapDefault } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const gsapInstance = gsapDefault;

interface Project {
  id: string;
  title: string;
  tag: string;
  shortDesc: string;
  fullDesc: string;
  themeColor: 'blue' | 'violet';
}

const projects: Project[] = [
  {
    id: 'gym',
    title: 'Gym Management System',
    tag: 'Web App',
    shortDesc: 'Member tracking, attendance, and fee management — built clean and functional.',
    fullDesc: 'A full gym management platform handling member onboarding, attendance logs, fee collection tracking, and basic reporting. Built as an internal tool for a gym client. Focused on making day-to-day operations less manual.',
    themeColor: 'blue',
  },
  {
    id: 'bridal',
    title: 'Bridal Studio — Website & Dashboard',
    tag: 'Web App + Dashboard',
    shortDesc: 'A public-facing site and internal dashboard for a bridal photography studio.',
    fullDesc: 'Designed and developed a marketing website for a bridal photography agency, paired with an internal dashboard where the studio could manage enquiries, advertise packages, and track basic salary/payment records for their team. Clean frontend, functional backend.',
    themeColor: 'violet',
  },
  {
    id: 'inventory',
    title: 'Product Inventory Manager',
    tag: 'Web App',
    shortDesc: 'Track stock, manage products, and stay on top of inventory without the spreadsheet chaos.',
    fullDesc: 'An inventory management tool for a product-based business. Handles product listings, stock levels, and basic movement tracking. Built to replace manual spreadsheet workflows with a cleaner, more reliable system.',
    themeColor: 'blue',
  },
  {
    id: 'portfolio',
    title: 'Portfolio Website',
    tag: 'Creative Website',
    shortDesc: 'Clean, high-performance portfolio websites built for multiple creative clients.',
    fullDesc: 'Designed and developed high-converting personal and agency portfolio websites with fluid animations and rapid load times. Crafted to help creatives, photographers, and independent professionals showcase their case studies and acquire high-ticket clients.',
    themeColor: 'violet',
  }
];

export default function WhatWeveBuilt() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const modalBackdropRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);

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

  // Modal GSAP Animation
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
      gsapInstance.fromTo(modalBackdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' }
      );
      gsapInstance.fromTo(modalContentRef.current,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.1)' }
      );
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  const handleCloseModal = () => {
    gsapInstance.to(modalBackdropRef.current, {
      opacity: 0,
      duration: 0.25,
      ease: 'power2.in',
    });
    gsapInstance.to(modalContentRef.current, {
      scale: 0.9,
      opacity: 0,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: () => setSelectedProject(null),
    });
  };

  const handleMouseEnter = (index: number) => {
    const card = cardsRef.current[index];
    if (!card) return;
    
    // Whisper border glow
    gsapInstance.to(card, {
      y: -6,
      borderColor: 'rgba(0, 180, 216, 0.5)',
      boxShadow: '0 0 0 1px rgba(0, 180, 216, 0.35)',
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = (index: number) => {
    const card = cardsRef.current[index];
    if (!card) return;

    gsapInstance.to(card, {
      y: 0,
      borderColor: 'rgba(255, 255, 255, 0.08)',
      boxShadow: '0 0 0px 0px rgba(0,0,0,0)',
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  return (
    <section
      ref={sectionRef}
      id="what-we-built"
      className="relative w-full bg-[#08090E] py-16 md:py-28 px-6 overflow-hidden border-t border-white/10"
    >
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,180,216,0.02)_0%,rgba(0,0,0,0)_70%)] pointer-events-none z-0" />

      <div className="max-w-5xl mx-auto relative z-10 flex flex-col items-center">
        
        {/* Eyebrow and Headline */}
        <div className="text-center mb-4">
          <span className="text-[#00B4D8] tracking-[0.12em] text-[11px] font-semibold uppercase mb-3 block">
            OUR WORK
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">
            What <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A78BFA] to-[#7C3AED]">We've Built</span>
          </h2>
        </div>

        {/* Quietly confident intro */}
        <p className="text-[rgba(255,255,255,0.75)] text-sm md:text-base font-light text-center max-w-lg leading-relaxed">
          We're early. But every project we've shipped has been delivered with full seriousness.
        </p>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-14">
          {projects.map((project, idx) => {
            return (
              <div
                key={project.id}
                ref={(el) => {
                  cardsRef.current[idx] = el;
                }}
                onClick={() => setSelectedProject(project)}
                onMouseEnter={() => handleMouseEnter(idx)}
                onMouseLeave={() => handleMouseLeave(idx)}
                className="opacity-0 relative h-[230px] rounded-2xl border border-white/8 bg-white/[0.04] backdrop-blur-md p-6 flex flex-col justify-between cursor-pointer transition-colors duration-300 group overflow-hidden shadow-sm"
              >
                <div>
                  {/* Tag Pill - teal tinted */}
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono border border-[rgba(0,180,216,0.25)] bg-[rgba(0,180,216,0.12)] text-[#00B4D8] uppercase tracking-wider mb-4">
                    {project.tag}
                  </span>

                  {/* Title */}
                  <h3 className="text-[17px] md:text-[18px] font-medium text-white tracking-tight leading-snug">
                    {project.title}
                  </h3>

                  {/* Description text - rgba(255,255,255,0.65) */}
                  <p className="text-[rgba(255,255,255,0.65)] text-xs md:text-[13px] font-light leading-relaxed mt-2.5 line-clamp-3">
                    {project.shortDesc}
                  </p>
                </div>

                {/* Arrow Icon - teal colored */}
                <div className="w-full flex justify-end">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center bg-white/5 border border-white/10 group-hover:border-white/20 transition-all text-[#00B4D8]">
                    <svg
                      className="w-3 h-3 transform group-hover:translate-x-[2px] transition-all"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quiet Trust Line */}
        <p className="mt-14 text-center text-[rgba(255,255,255,0.40)] text-[13px] font-light tracking-wide max-w-md">
          These are real projects, built for real clients. We're growing — and we take every project seriously regardless of size.
        </p>
      </div>

      {/* Expanded Description Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            ref={modalBackdropRef}
            onClick={handleCloseModal}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <div
            ref={modalContentRef}
            className="relative w-full max-w-md rounded-3xl border border-[rgba(255,255,255,0.08)] bg-[#08090E]/95 backdrop-blur-md p-6 md:p-8 shadow-2xl z-10 max-h-[85vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
            >
              <svg className="w-4 h-4 text-zinc-400 hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex flex-col items-start mt-2">
              <span className="inline-block px-2.5 py-0.5 rounded-full text-[9px] font-mono border border-[rgba(0,180,216,0.25)] bg-[rgba(0,180,216,0.12)] text-[#00B4D8] uppercase tracking-wider mb-3">
                {selectedProject.tag}
              </span>

              <h3 className="text-xl md:text-2xl font-semibold text-white tracking-tight leading-snug">
                {selectedProject.title}
              </h3>

              <div className="w-12 h-[1px] bg-white/10 my-4" />

              <p className="text-[rgba(255,255,255,0.75)] text-sm md:text-base font-light leading-relaxed">
                {selectedProject.fullDesc}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
