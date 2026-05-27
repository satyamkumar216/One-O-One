'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// 1. Data Structure combining Departments and People sequentially
type SequenceItem = 
  | { type: 'department'; id: string; chapter: string; title: string; subtitle: string; gradient: string }
  | { type: 'person'; id: string; name: string; role: string; bio: string; skills: string[]; gradient: string; tagColor: string };

const sequence: SequenceItem[] = [
  // --- MARKETING CHAPTER ---
  {
    type: 'department',
    id: 'dept-marketing',
    chapter: '01',
    title: 'MARKETING',
    subtitle: 'Growth, Scale, & Strategy',
    gradient: 'from-brand-blue/20 to-black',
  },
  {
    type: 'person',
    id: 'anurag',
    name: 'Anurag',
    role: 'Head of Marketing',
    bio: 'The mastermind behind viral brand scaling and multi-channel performance marketing. Specializes in driving massive ROI through data-driven campaigns and precision audience targeting.',
    skills: ["Growth Strategy", "Funnel Optimization", "Brand Positioning", "Ad Spend Scale"],
    gradient: "from-brand-blue/30 to-black",
    tagColor: "text-brand-blue border-brand-blue/30",
  },
  
  // --- TECHNOLOGY CHAPTER ---
  {
    type: 'department',
    id: 'dept-tech',
    chapter: '02',
    title: 'TECHNOLOGY',
    subtitle: 'Engineering, AI, & Architecture',
    gradient: 'from-brand-violet/20 to-black',
  },
  {
    type: 'person',
    id: 'sattyam',
    name: 'Sattyam',
    role: 'Head of Technology',
    bio: 'Architect of high-performance digital ecosystems. Specializes in building resilient, scalable Next.js applications, immersive 3D web experiences, and flawless technical infrastructure.',
    skills: ["Next.js Architecture", "Three.js", "System Design", "Web Performance"],
    gradient: "from-brand-violet/30 to-black",
    tagColor: "text-brand-violet border-brand-violet/30",
  },
  {
    type: 'person',
    id: 'ayush',
    name: 'Ayush Vinod Tiwari',
    role: 'AI & Full-Stack Engineer',
    bio: 'Engineers intelligent backend systems and integrates machine learning models into full-stack architectures. Proven expertise in building comprehensive management systems and scalable data solutions.',
    skills: ["Python & TensorFlow", "Database Architecture", "UI/UX Engineering", "Data Automation"],
    gradient: "from-brand-blue/30 to-black",
    tagColor: "text-brand-blue border-brand-blue/30",
  }
];

export default function OurWork() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // State for the Profile Modal
  const [selectedPerson, setSelectedPerson] = useState<any | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // ------------------------------------------
      // DESKTOP ANIMATION
      // ------------------------------------------
      mm.add("(min-width: 768px)", () => {
        // 1. Department Marker Animations
        gsap.utils.toArray('.dept-section').forEach((sec: unknown) => {
          const section = sec as HTMLElement;
          const textWrap = section.querySelector('.dept-text-wrapper');
          
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "+=100%", 
              pin: true,
              scrub: 1, 
              invalidateOnRefresh: true,
            }
          });

          // Replaced scale animation with clean fade+slide to prevent rendering bugs
          tl.fromTo(textWrap, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" })
            .to(textWrap, { opacity: 0, y: -30, duration: 0.4, ease: "power2.in" }, "+=0.2");
        });

        // 2. Team Member Animations
        gsap.utils.toArray('.team-section').forEach((sec: any) => {
          const img = sec.querySelector('.team-img');
          const content = sec.querySelector('.team-content');
          const namePlate = sec.querySelector('.img-name-plate');

          // Initial Layout State (ADDED MARGIN: Now 85vw/85vh instead of 100vw to look like a premium card)
          gsap.set(img, { width: "85vw", height: "85vh", left: "50%", top: "50%", xPercent: -50, yPercent: -50, borderRadius: "32px" });
          gsap.set(content, { opacity: 0, x: 150 });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sec,
              start: "top top",
              end: "+=100%", 
              pin: true,
              scrub: 1, 
              invalidateOnRefresh: true,
            }
          });

          // Animate Image shrinking to the left, text sliding in from the right
          tl.to(img, { width: "420px", height: "550px", left: "10%", xPercent: 0, borderRadius: "24px", ease: "power2.inOut" }, 0)
            .to(namePlate, { opacity: 0, y: 30, ease: "power2.in" }, 0)
            .to(content, { opacity: 1, x: 0, ease: "power2.out" }, 0.2); 
        });
      });

      // ------------------------------------------
      // MOBILE ANIMATION
      // ------------------------------------------
      mm.add("(max-width: 767px)", () => {
        // 1. Department Marker Animations (Mobile)
        gsap.utils.toArray('.dept-section').forEach((sec: any) => {
          const textWrap = sec.querySelector('.dept-text-wrapper');
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sec,
              start: "top top",
              end: "+=80%", 
              pin: true,
              scrub: 1, 
              invalidateOnRefresh: true,
            }
          });
          
          // Replaced scale animation with fade+slide for flawless mobile rendering
          tl.fromTo(textWrap, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4 })
            .to(textWrap, { opacity: 0, y: -20, duration: 0.4 }, "+=0.2"); 
        });

        // 2. Team Member Animations (Mobile)
        gsap.utils.toArray('.team-section').forEach((sec: any) => {
          const img = sec.querySelector('.team-img');
          const content = sec.querySelector('.team-content');
          const namePlate = sec.querySelector('.img-name-plate');

          // Initial Layout State (ADDED MARGIN: Now 90vw/85vh to leave a nice black border around the photo)
          gsap.set(img, { width: "90vw", height: "85vh", left: "50%", top: "50%", xPercent: -50, yPercent: -50, borderRadius: "24px" });
          gsap.set(content, { opacity: 0, y: 100 });

          const tl = gsap.timeline({
            scrollTrigger: { 
              trigger: sec, 
              start: "top top", 
              end: "+=80%", 
              pin: true, 
              scrub: 1,
              invalidateOnRefresh: true,
            } 
          });

          // Animate Image moving up & text sliding in below
          tl.to(img, { width: "90vw", height: "35vh", top: "10%", yPercent: 0, borderRadius: "24px", ease: "power2.inOut" }, 0)
            .to(namePlate, { opacity: 0, y: 20, ease: "power2.in" }, 0)
            .to(content, { opacity: 1, y: 0, ease: "power2.out" }, 0.1);
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} id="our-work" className="w-full bg-black relative">
      
      {/* Intro Section */}
      <div className="h-[60vh] md:h-[80vh] flex flex-col justify-center items-center text-center px-6 relative z-10 bg-black">
        <span className="text-brand-blue tracking-[0.3em] text-xs font-bold uppercase mb-4 drop-shadow-[0_0_8px_rgba(0,240,255,0.4)]">
          The Core Engine
        </span>
        <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
          Meet The Team
        </h2>
        <div className="w-[1.5px] h-16 bg-gradient-to-b from-brand-blue to-transparent mt-12 opacity-60" />
      </div>

      {/* Sequence Render */}
      {sequence.map((item) => {
        
        // ------------------------------------------
        // RENDER: DEPARTMENT CHAPTER
        // ------------------------------------------
        if (item.type === 'department') {
          return (
            <div key={item.id} className="dept-section h-[100dvh] w-full flex items-center justify-center relative overflow-hidden bg-black z-0">
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-20 mix-blend-overlay`} />
              <div className="dept-text-wrapper text-center px-4 w-full max-w-[100vw] overflow-hidden">
                <span className="text-brand-blue text-sm md:text-base font-mono font-bold tracking-[0.3em] uppercase mb-3 md:mb-4 block">
                  CHAPTER {item.chapter}
                </span>
                <h2 className="text-4xl min-[400px]:text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter drop-shadow-2xl mb-2 md:mb-4 w-full break-words">
                  {item.title}
                </h2>
                <p className="text-gray-400 text-xs sm:text-sm md:text-xl font-light uppercase tracking-widest px-2">
                  {item.subtitle}
                </p>
              </div>
            </div>
          );
        }

        // ------------------------------------------
        // RENDER: PERSON SLIDE
        // ------------------------------------------
        return (
          <div key={item.id} className="team-section h-[100dvh] w-full relative overflow-hidden bg-black z-0">
            {/* Animated Image/Portrait Container */}
            <div className="team-img absolute bg-zinc-900 border border-white/5 shadow-2xl overflow-hidden glass-card">
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} mix-blend-overlay`} />
              <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]" />
              
              {/* Initial Background Placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[30vh] font-black text-white/5 uppercase select-none">
                  {item.name.charAt(0)}
                </span>
              </div>

              {/* Big Nameplate (Fades out on scroll) */}
              <div className="img-name-plate absolute bottom-8 left-6 md:bottom-12 md:left-12">
                <h3 className="text-4xl md:text-6xl font-black text-white tracking-tight drop-shadow-xl">
                  {item.name}
                </h3>
              </div>
            </div>

            {/* Reveal Content (Now includes Bio Snippet & Bouncy Button) */}
            <div className="team-content absolute top-[48%] md:top-1/2 left-[5%] md:left-auto md:right-[5%] lg:right-[15%] w-[90%] md:w-[45%] lg:w-[30%] -translate-y-0 md:-translate-y-1/2 z-10 flex flex-col items-start pt-4 md:pt-0">
              
              <span className={`inline-block px-3 py-1 rounded-full text-[9px] md:text-[10px] font-bold tracking-wider uppercase border mb-4 md:mb-6 ${item.tagColor}`}>
                MEMBER PROFILE
              </span>
              
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-2">
                {item.name}
              </h3>
              
              <h4 className="text-gray-400 text-base md:text-xl font-light tracking-wide uppercase mb-3 md:mb-5">
                {item.role}
              </h4>

              {/* Preview Bio - Clamped to 3 lines so it doesn't overwhelm the scroll state */}
              <p className="text-gray-300 text-sm md:text-base font-light leading-relaxed mb-6 md:mb-8 line-clamp-3 overflow-hidden">
                {item.bio}
              </p>

              {/* Bouncy Interactive Button */}
              <button 
                onClick={() => setSelectedPerson(item)}
                className="animate-float-bounce group relative inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-brand-blue rounded-full transition-all duration-300 backdrop-blur-md overflow-hidden cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_rgba(0,240,255,0.2)]"
              >
                <span className="text-xs md:text-sm font-bold text-white tracking-widest uppercase relative z-10">
                  View Profile
                </span>
                <svg className="w-4 h-4 text-brand-blue transform group-hover:translate-x-1 transition-transform duration-300 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
                {/* Glow behind button text */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-blue/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out pointer-events-none" />
              </button>

            </div>
          </div>
        );
      })}

      {/* ------------------------------------------ */}
      {/* MODAL OVERLAY (Reveals Full Details)         */}
      {/* ------------------------------------------ */}
      {selectedPerson && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop Blur */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setSelectedPerson(null)}
          />
          
          {/* Modal Card */}
          <div className="relative glass-card border border-white/10 bg-zinc-950/80 rounded-3xl p-6 md:p-12 w-full max-w-2xl z-10 shadow-2xl scale-100 animate-in fade-in zoom-in-95 duration-300 overflow-y-auto max-h-[90vh]">
            
            {/* Close Button */}
            <button 
              onClick={() => setSelectedPerson(null)}
              className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors group"
            >
              <svg className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            <div className="space-y-4 md:space-y-6 mt-4 md:mt-0">
              <div>
                <h3 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-2 pr-10">
                  {selectedPerson.name}
                </h3>
                <h4 className={`text-xs md:text-base font-semibold tracking-widest uppercase bg-clip-text text-transparent bg-gradient-to-r ${selectedPerson.gradient.replace('to-black', 'to-white')}`}>
                  {selectedPerson.role}
                </h4>
              </div>

              <div className="w-12 h-[1px] bg-white/20" />

              <p className="text-gray-300 text-sm md:text-lg font-light leading-relaxed">
                {selectedPerson.bio}
              </p>

              <div className="pt-4 md:pt-6">
                <span className="text-[10px] md:text-xs font-mono text-gray-500 uppercase tracking-widest block mb-4">
                  Core Expertise & Tech Stack
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedPerson.skills.map((skill: string, sIdx: number) => (
                    <span 
                      key={sIdx} 
                      className="text-[10px] md:text-xs font-mono text-brand-blue bg-brand-blue/5 border border-brand-blue/20 px-3 py-1.5 md:px-4 md:py-2 rounded-md uppercase tracking-wider"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Styles for Bouncing Button & Modal Animations */}
      <style jsx global>{`
        @keyframes float-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float-bounce {
          animation: float-bounce 2.5s ease-in-out infinite;
        }
        .animate-in {
          animation-duration: 0.3s;
          animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
          animation-fill-mode: forwards;
        }
        .fade-in {
          animation-name: fadeIn;
        }
        .zoom-in-95 {
          animation-name: zoomIn95;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes zoomIn95 {
          from { transform: scale(0.95); }
          to { transform: scale(1); }
        }
        /* Tailwind utility for line clamping */
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;  
        }
      `}</style>
    </div>
  );
}