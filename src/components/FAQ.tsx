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
    question: "What makes One'O'One different from traditional creative agencies?",
    answer: "We reject the traditional agency bloat. Traditional agencies sell billable hours and vanity metrics like clicks and impressions; we sell business results and incremental revenue. By limiting our client roster to just three active partners per division, our senior talent acts as an extension of your team. We marry high-production-value cinematic creatives with rigorous, data-driven performance analytics to ensure your ad spend actually returns profit."
  },
  {
    question: "How does your 7-day campaign launch guarantee work?",
    answer: "Once we complete our initial alignment workshop and onboard your brand, our sprint methodology kickstarts. Over the next 7 days, we produce all creative assets, construct landing pages, draft copywriting hooks, write technical tracking parameters, and push your campaigns live across platforms (Meta, Google, or TikTok). There are no weeks of deliberation, just focused execution."
  },
  {
    question: "Do you handle all content and production in-house?",
    answer: "Yes, 100%. We have an in-house production studio equipped with cinematic cameras, professional lighting, and sound stages, along with a dedicated editing and post-production suite. This allows us to maintain absolute control over creative quality and iterate on ad hooks in real-time based on live performance data."
  },
  {
    question: "What is the onboarding process for a new brand?",
    answer: "We start with a comprehensive Audit & Deep Dive, analyzing your past campaign data, customer profiles, and product margins. If we see a path to significant scaling, we host a 2-hour alignment workshop. From there, we configure the tracking stack, set up communication channels, and design the initial creative roadmap. We aim to start running ads within 7 days of this kickoff."
  },
  {
    question: "How do you measure and report campaign success?",
    answer: "We look at hard business metrics: Marketing Efficiency Ratio (MER), Customer Acquisition Cost (CAC), and Return on Ad Spend (ROAS) mapped to your actual margin profile. You get access to a real-time, transparent dashboard that syncs platform data with your Shopify or backend sales data. No vanity reports—just direct attribution to your bottom line."
  },
  {
    question: "What channels do you specialize in for performance marketing?",
    answer: "We specialize in high-intent search and high-scale social channels. This includes Meta (Instagram/Facebook) for scalable demand generation, Google Ads (Search, YouTube, and Performance Max) for capturing active intent, TikTok Ads for creative-led viral growth, and Klaviyo/SMS for lifecycle retention marketing."
  },
  {
    question: "Why do you not enforce long-term retainer lock-ins?",
    answer: "We believe in the quality of our work. If we don't deliver value, you shouldn't be locked into paying us. We operate on rolling 30-day agreements. This forces us to remain obsessive about your performance month-over-month, and keeps our partnership healthy, agile, and aligned."
  },
  {
    question: "What minimum budget requirements do you have for partners?",
    answer: "To run statistically significant creative testing and let machine learning algorithms optimize effectively, we generally recommend a minimum ad spend of $10,000 per month. This allows us to iterate on creative variants rapidly and scale winning campaigns without hitting budget ceilings."
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
      className="relative w-full bg-black py-24 px-6 overflow-hidden border-t border-white/5"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-brand-violet/5 blur-[120px] pointer-events-none z-0" />

      <div className="max-w-3xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-16">
          <span className="text-xs font-semibold tracking-[0.2em] text-brand-blue uppercase drop-shadow-[0_0_8px_rgba(0,240,255,0.3)]">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
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
