'use client';

import React, { useState, useRef, useEffect } from 'react';
import { default as gsapDefault } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const gsapInstance = gsapDefault;


interface TeamMember {
  id: string;
  name: string;
  role: string;
  initials: string;
  bio: string;
  skills: string[];
  themeColor: 'blue' | 'violet';
}

const marketingTeam: TeamMember[] = [
  {
    id: 'anurag',
    name: 'Anurag Singh',
    role: 'Marketing Lead',
    initials: 'AS',
    bio: 'Leads marketing strategy and client communication. Handles how the agency presents itself and keeps client relationships strong.',
    skills: ['Marketing Strategy', 'SEO', 'Copywriting', 'Analytics', 'CRM'],
    themeColor: 'blue',
  }
];

const techTeam: TeamMember[] = [
  {
    id: 'satyam',
    name: 'Satyam Kumar',
    role: 'Tech Lead (Head)',
    initials: 'SK',
    bio: 'Heads the tech team. Builds full-stack systems end to end — from backend architecture to deployment. Currently a BTech student at IIIT Dharwad with hands-on experience in NestJS, Next.js, PostgreSQL, and Docker.',
    skills: ['NestJS', 'Next.js', 'PostgreSQL', 'Docker', 'System Design', 'TypeScript'],
    themeColor: 'violet',
  },
  {
    id: 'rupam',
    name: 'Rupam Mandal',
    role: 'Full Stack Developer',
    initials: 'RM',
    bio: 'Full-stack developer who contributes to both frontend UI and backend logic. Focused on building reliable, clean code that scales.',
    skills: ['React', 'Next.js', 'Node.js', 'Express', 'MongoDB'],
    themeColor: 'blue',
  },
  {
    id: 'dilawar',
    name: 'Dilawar',
    role: 'Frontend Developer',
    initials: 'D',
    bio: 'Frontend developer with an eye for clean layouts and smooth user experiences. Handles the visual side of web products.',
    skills: ['React', 'Next.js', 'CSS', 'TailwindCSS', 'Figma'],
    themeColor: 'violet',
  },
  {
    id: 'ayush',
    name: 'Ayush',
    role: 'Frontend Developer',
    initials: 'A',
    bio: 'Frontend developer who works on responsive interfaces and UI components across client projects.',
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'TailwindCSS'],
    themeColor: 'blue',
  }
];

// MemberCard component
const MemberCard: React.FC<{ member: TeamMember; onClick: () => void }> = ({ member, onClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const isViolet = member.themeColor === 'violet';
  const shadowColor = isViolet ? 'rgba(124, 92, 250, 0.35)' : 'rgba(0, 180, 216, 0.35)';

  const handleMouseEnter = () => {
    gsapInstance.to(cardRef.current, {
      y: -6,
      borderColor: isViolet ? 'rgba(124, 92, 250, 0.5)' : 'rgba(0, 180, 216, 0.5)',
      boxShadow: `0 0 0 1px ${shadowColor}`,
      duration: 0.3,
      ease: 'power2.out',
    });
    gsapInstance.to(glowRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    gsapInstance.to(cardRef.current, {
      y: 0,
      borderColor: 'rgba(255, 255, 255, 0.08)',
      boxShadow: '0 0 0px 0px rgba(0,0,0,0)',
      duration: 0.3,
      ease: 'power2.out',
    });
    gsapInstance.to(glowRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="team-card opacity-0 relative w-[180px] h-[230px] rounded-2xl border border-white/8 bg-white/[0.04] backdrop-blur-md p-4 flex flex-col items-center justify-between cursor-pointer transition-colors duration-300 overflow-hidden group shadow-sm"
    >
      {/* Background Hover Glow */}
      <div
        ref={glowRef}
        className={`absolute -inset-1 opacity-0 scale-95 pointer-events-none rounded-2xl bg-gradient-to-b ${
          isViolet ? 'from-purple-600/10 to-transparent' : 'from-cyan-600/10 to-transparent'
        } filter blur-xl`}
      />

      {/* Avatar Circle - Teal-to-purple gradient */}
      <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-tr from-[#00B4D8] to-[#7C3AED] text-white font-semibold text-sm relative z-10 shadow-md">
        {member.initials}
      </div>

      {/* Content */}
      <div className="text-center w-full relative z-10">
        <h4 className="text-[15px] font-medium text-white truncate px-1">
          {member.name}
        </h4>
        <p className="text-[13px] font-light text-[rgba(255,255,255,0.45)] truncate mt-1">
          {member.role}
        </p>
      </div>

      {/* Subtle View / Arrow Icon */}
      <div className="w-full flex justify-end relative z-10">
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
};

// MemberModal component
const MemberModal: React.FC<{ member: TeamMember; onClose: () => void }> = ({ member, onClose }) => {
  const backdropRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    // GSAP Modal Open Animation
    gsapInstance.fromTo(backdropRef.current, 
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: 'power2.out' }
    );
    gsapInstance.fromTo(modalRef.current,
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.1)' }
    );

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleClose = () => {
    // GSAP Modal Close Animation
    gsapInstance.to(backdropRef.current, {
      opacity: 0,
      duration: 0.25,
      ease: 'power2.in',
    });
    gsapInstance.to(modalRef.current, {
      scale: 0.9,
      opacity: 0,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: onClose,
    });
  };

  const isViolet = member.themeColor === 'violet';
  const badgeBorder = isViolet ? 'border-[#7C3AED]/30 bg-[#7C3AED]/10' : 'border-[#00B4D8]/30 bg-[#00B4D8]/10';
  const badgeText = isViolet ? 'text-[#A78BFA]' : 'text-[#00B4D8]';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        ref={backdropRef}
        onClick={handleClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
      />

      {/* Modal Card */}
      <div
        ref={modalRef}
        className="relative w-full max-w-lg rounded-3xl border border-[rgba(255,255,255,0.08)] bg-[#08090E]/95 backdrop-blur-md p-6 md:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
      >
        {/* Close Button - muted white icon */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
        >
          <svg className="w-4 h-4 text-zinc-400 hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col items-center text-center mt-4">
          {/* Larger Initials Avatar - teal-to-purple gradient */}
          <div className="w-20 h-20 rounded-full flex items-center justify-center bg-gradient-to-tr from-[#00B4D8] to-[#7C3AED] text-white font-bold text-2xl mb-4 shadow-lg">
            {member.initials}
          </div>

          <h3 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
            {member.name}
          </h3>
          <p className="text-sm md:text-base font-medium tracking-wide uppercase mt-1 text-[#00B4D8]">
            {member.role}
          </p>

          <div className="w-12 h-[1px] bg-white/10 my-4" />

          {/* Body description - rgba(255,255,255,0.75) */}
          <p className="text-[rgba(255,255,255,0.75)] text-sm md:text-base font-light leading-relaxed max-w-md">
            {member.bio}
          </p>

          <div className="w-full text-left mt-6">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-3">
              Skills / Tools
            </span>
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
              {member.skills.map((skill, index) => (
                <span
                  key={index}
                  className={`text-[10px] font-mono border px-3 py-1.5 rounded-full uppercase tracking-wider ${badgeBorder} ${badgeText}`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function OurWork() {
  const [selectedPerson, setSelectedPerson] = useState<TeamMember | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsapInstance.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section) return;

    const cards = gsapInstance.utils.toArray('.team-card') as HTMLElement[];

    const ctx = gsapInstance.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsapInstance.set(cards, { opacity: 1, y: 0 });
      } else {
        gsapInstance.fromTo(
          cards,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.12,
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

  return (
    <section 
      id="our-work" 
      ref={sectionRef}
      className="relative w-full bg-[#08090E] py-16 md:py-28 px-6 overflow-hidden flex flex-col justify-center border-t border-white/10"
    >
      {/* Background glow elements */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,180,216,0.03)_0%,rgba(0,0,0,0)_70%)] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.03)_0%,rgba(0,0,0,0)_70%)] pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto w-full relative z-10 flex flex-col">
        {/* Intro */}
        <div className="text-center mb-16">
          {/* Eyebrow in teal/cyan */}
          <span className="text-[#00B4D8] tracking-[0.12em] text-[11px] font-semibold uppercase mb-4 block">
            OUR TEAM
          </span>
          {/* Title with purple-violet gradient */}
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            Meet <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A78BFA] to-[#7C3AED]">Our Team</span>
          </h2>
        </div>

        {/* Columns Container */}
        <div className="flex flex-col md:flex-row items-stretch gap-12 md:gap-0 mx-auto w-fit">
          {/* Left Column: Marketing */}
          <div className="flex flex-col items-center md:items-start md:pr-8 md:border-r md:border-white/[0.08]">
            <div className="flex items-center mb-6">
              <span className="w-6 h-[1px] bg-white/20 mr-[10px]" />
              <span className="text-[11px] font-normal text-white/35 uppercase tracking-[0.20em] select-none">
                Marketing
              </span>
            </div>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              {marketingTeam.map((member) => (
                <MemberCard
                  key={member.id}
                  member={member}
                  onClick={() => setSelectedPerson(member)}
                />
              ))}
            </div>
          </div>

          {/* Right Column: Tech */}
          <div className="flex flex-col items-center md:items-start md:pl-8">
            <div className="flex items-center mb-6">
              <span className="w-6 h-[1px] bg-white/20 mr-[10px]" />
              <span className="text-[11px] font-normal text-white/35 uppercase tracking-[0.20em] select-none">
                Tech
              </span>
            </div>
            <div className="grid grid-cols-1 min-[400px]:grid-cols-2 md:grid-cols-4 gap-4">
              {techTeam.map((member) => (
                <MemberCard
                  key={member.id}
                  member={member}
                  onClick={() => setSelectedPerson(member)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedPerson && (
        <MemberModal
          member={selectedPerson}
          onClose={() => setSelectedPerson(null)}
        />
      )}
    </section>
  );
}