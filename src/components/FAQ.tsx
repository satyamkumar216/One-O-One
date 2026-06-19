'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Plus } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    question: "Are you a new agency?",
    answer: "Yes, we're early-stage. One'O'One Agency was started by a small team of developers and a marketing specialist. We don't have years of corporate history — but every project we've taken on has been delivered with full commitment and proper communication. We'd rather be honest about where we are than oversell ourselves."
  },
  {
    question: "What kind of projects do you take on?",
    answer: "Mostly web applications — management systems, dashboards, business websites, and internal tools. If you have a digital problem that needs a clean, functional solution, that's what we build. We're not a design-only studio; we handle full-stack delivery."
  },
  {
    question: "How do you handle projects as a small team?",
    answer: "We keep the scope focused and the communication direct. You deal with the actual people building your product — not account managers. That means faster decisions and fewer miscommunications."
  },
  {
    question: "What does working with you actually look like?",
    answer: "You send us an enquiry, we set up a call to understand what you need, then we give you a clear scope and timeline. We build in stages, share progress, and don't disappear mid-project. It's straightforward."
  },
  {
    question: "Do you work with clients outside your city?",
    answer: "Yes. Everything we've built so far has been handled remotely — calls, shared docs, and regular updates. Location isn't a constraint."
  },
  {
    question: "Why should I trust a new agency?",
    answer: "That's a fair question. The honest answer: you shouldn't trust us blindly. Look at what we've built, talk to us, and judge from there. We're not trying to fake scale we don't have — we're trying to earn trust through actual work."
  }
];

export default function FAQ() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    // Entry animation: Staggered reveal for cards
    const cards = gsap.utils.toArray('.faq-card') as HTMLElement[];
    
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(cards, { opacity: 1, y: 0 });
    } else {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            once: true,
          }
        }
      );
    }
  }, []);

  const handleToggle = (index: number) => {
    const isOpening = openIndex !== index;

    // If another card is open, close it
    if (openIndex !== null) {
      gsap.to(`.faq-answer-${openIndex}`, {
        height: 0,
        duration: 0.35,
        ease: 'power2.inOut',
      });
    }

    // Toggle the clicked card
    if (isOpening) {
      setOpenIndex(index);
      gsap.to(`.faq-answer-${index}`, {
        height: 'auto',
        duration: 0.35,
        ease: 'power2.inOut',
      });
    } else {
      setOpenIndex(null);
    }
  };

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full bg-black py-16 md:py-28 px-6 overflow-hidden border-t border-white/10"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-brand-violet/5 blur-[120px] pointer-events-none z-0" />

      <div className="max-w-3xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-16">
          <span className="text-[11px] font-semibold tracking-[0.12em] text-brand-blue uppercase drop-shadow-[0_0_8px_rgba(0,240,255,0.3)]">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white leading-tight">
            Frequently Asked{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-violet">
              Questions
            </span>
          </h2>
        </div>

        {/* Accordion Stack */}
        <div className="space-y-4">
          {FAQ_DATA.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="faq-card opacity-0 rounded-2xl glass-card border border-white/5 bg-bg-card/40 transition-all duration-300 hover:border-brand-blue/20"
              >
                {/* Header click region */}
                <button
                  onClick={() => handleToggle(index)}
                  className="w-full flex items-center justify-between gap-4 p-6 cursor-pointer text-left focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-bold text-white transition-colors duration-300 group-hover:text-brand-blue leading-tight">
                    {item.question}
                  </span>
                  
                  {/* Plus Icon */}
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10 transition-colors duration-300">
                    <Plus
                      className={`w-4 h-4 transition-all duration-300 transform ${
                        isOpen ? 'rotate-45 text-brand-violet scale-110' : 'text-white/60'
                      }`}
                    />
                  </div>
                </button>

                {/* Answer wrapper */}
                <div
                  className={`faq-answer-${index} overflow-hidden px-6`}
                  style={{ height: 0 }}
                >
                  <p className="pb-6 text-gray-400 font-light text-sm sm:text-base leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
