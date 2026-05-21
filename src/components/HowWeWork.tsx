'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const steps = [
  {
    num: "01",
    name: "Discovery",
    title: "Discovery & Auditing",
    desc: "We dive deep into your historical brand data, audit existing funnels, analyze competitor blindspots, and interview stakeholders to uncover hidden leverage points.",
    accent: "text-brand-blue",
    glow: "shadow-[0_0_20px_rgba(0,240,255,0.15)]",
  },
  {
    num: "02",
    name: "Strategic",
    title: "Strategic Blueprinting",
    desc: "We construct a custom, high-velocity digital blueprint. This maps out media buying architecture, custom creative styling, user acquisition funnels, and retention systems.",
    accent: "text-brand-violet",
    glow: "shadow-[0_0_20px_rgba(139,92,246,0.15)]",
  },
  {
    num: "03",
    name: "Agile",
    title: "Agile Execution",
    desc: "Our creative and dev squads roll out optimized landing pages, high-converting ad assets, and data setups. We launch fast, testing angles to find the winners.",
    accent: "text-brand-blue",
    glow: "shadow-[0_0_20px_rgba(0,240,255,0.15)]",
  },
  {
    num: "04",
    name: "Scale",
    title: "Scale & Dominate",
    desc: "We compound your success. By scaling winning media budgets, expanding campaign angles, and optimizing the post-click experience, we scale client revenue.",
    accent: "text-brand-violet",
    glow: "shadow-[0_0_20px_rgba(139,92,246,0.15)]",
  }
];

export default function HowWeWork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const beamProgressRef = useRef<SVGLineElement>(null);

  const [activeStep, setActiveStep] = useState(0);
  const [renderStep, setRenderStep] = useState(0);

  const currentStepRef = useRef(0);
  const activePulseTweenRef = useRef<gsap.core.Tween | null>(null);

  // Helper function to get style for card accent bar
  const getAccentStyle = (stepIndex: number) => {
    switch (stepIndex) {
      case 0:
        return { background: '#00f0ff' };
      case 1:
        return { background: '#a855f7' };
      case 2:
        return { background: 'linear-gradient(90deg, #00f0ff, #a855f7)' };
      case 3:
        return { background: 'linear-gradient(90deg, #00f0ff, #fbbf24)' };
      default:
        return { background: '#00f0ff' };
    }
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const pin = pinRef.current;
    const container = containerRef.current;
    if (!pin || !container) return;

    // Selector for nodes, traveler, and progress beam
    const nodes = gsap.utils.toArray('.timeline-node') as HTMLElement[];
    const traveler = document.getElementById('beam-traveler');
    const beamProgress = beamProgressRef.current;

    // Helper to animate node transition
    const animateNodeTransition = (prevIndex: number, nextIndex: number) => {
      // 1. DEACTIVATE previous node
      const prevNode = nodes[prevIndex];
      if (prevNode) {
        const outerRing = prevNode.querySelector('.node-ring-outer');
        const innerRing = prevNode.querySelector('.node-ring-inner');
        const core = prevNode.querySelector('.node-core');

        // Kill active pulse loop
        if (activePulseTweenRef.current) {
          activePulseTweenRef.current.kill();
          activePulseTweenRef.current = null;
        }

        // Animate back to inactive
        gsap.killTweensOf([outerRing, innerRing, core]);
        gsap.to(outerRing, { 
          width: 28, 
          height: 28, 
          scale: 1, 
          boxShadow: "none", 
          backgroundColor: "transparent", 
          borderColor: "rgba(255,255,255,0.12)",
          borderWidth: 1,
          duration: 0.3, 
          ease: "power2.inOut" 
        });
        gsap.to(innerRing, { 
          width: 18, 
          height: 18, 
          backgroundColor: "rgba(255,255,255,0.04)",
          borderColor: "rgba(255,255,255,0.2)",
          borderWidth: 1,
          boxShadow: "none",
          duration: 0.3 
        });
        gsap.to(core, { 
          width: 10, 
          height: 10, 
          scale: 1, 
          background: "rgba(255,255,255,0.25)",
          boxShadow: "none",
          duration: 0.3 
        });
      }

      // 2. ACTIVATE next node
      const nextNode = nodes[nextIndex];
      if (nextNode) {
        const outerRing = nextNode.querySelector('.node-ring-outer');
        const innerRing = nextNode.querySelector('.node-ring-inner');
        const core = nextNode.querySelector('.node-core');

        gsap.killTweensOf([outerRing, innerRing, core]);

        // Stage 1 (0ms): Outer ring bursts to 56px then settles to 48px
        gsap.fromTo(outerRing, 
          { width: 28, height: 28, scale: 1, opacity: 0.3, borderWidth: 1.5, borderColor: "rgba(0,240,255,0.6)", backgroundColor: "rgba(0,240,255,0.05)" },
          { 
            width: 56, 
            height: 56, 
            opacity: 1, 
            duration: 0.2, 
            ease: "power3.out",
            onComplete: () => {
              gsap.to(outerRing, { 
                width: 48, 
                height: 48, 
                duration: 0.25, 
                ease: "elastic.out(1, 0.5)",
                onComplete: () => {
                  // Start looping pulse on active outer ring
                  if (activePulseTweenRef.current) activePulseTweenRef.current.kill();
                  activePulseTweenRef.current = gsap.to(outerRing, {
                    boxShadow: "0 0 30px rgba(0,240,255,0.6), 0 0 60px rgba(0,240,255,0.2)",
                    scale: 1.15,
                    duration: 1.2,
                    ease: "sine.inOut",
                    yoyo: true,
                    repeat: -1
                  });
                }
              });
            }
          }
        );

        // Stage 2 (100ms delay): Inner ring expands
        gsap.to(innerRing, { 
          width: 32, 
          height: 32, 
          backgroundColor: "rgba(168,85,247,0.1)",
          borderColor: "rgba(168,85,247,0.7)",
          borderWidth: 1.5,
          boxShadow: "0 0 12px rgba(168,85,247,0.4)",
          duration: 0.3, 
          delay: 0.1 
        });

        // Stage 3 (150ms delay): Core dot pops with scale bounce
        gsap.fromTo(core, 
          { scale: 0 }, 
          { 
            scale: 1, 
            width: 14, 
            height: 14, 
            background: "linear-gradient(135deg, #00f0ff, #a855f7)", 
            boxShadow: "0 0 8px rgba(0,240,255,0.8)",
            duration: 0.4, 
            delay: 0.15, 
            ease: "back.out(2)" 
          }
        );
      }

      // 3. TRAVELING GLOW DOT
      if (traveler && nextNode) {
        const nextNodeY = nextNode.offsetTop + 14;
        gsap.to(traveler, {
          top: nextNodeY,
          duration: 0.5,
          ease: "power2.inOut"
        });
      }

      // 4. STEP DETAIL CARD (RIGHT SIDE) — TRANSITION UPGRADE
      if (cardRef.current) {
        gsap.killTweensOf(cardRef.current);
        gsap.to(cardRef.current, {
          opacity: 0,
          x: -30,
          rotateY: -8,
          duration: 0.25,
          ease: "power2.in",
          onComplete: () => {
            setRenderStep(nextIndex);
            gsap.fromTo(cardRef.current, 
              { opacity: 0, x: 30, rotateY: 8 },
              { opacity: 1, x: 0, rotateY: 0, duration: 0.4, ease: "power3.out" }
            );
          }
        });
      }
    };

    const ctx = gsap.context(() => {
      // Initialize SVG progress beam line
      if (beamProgress) {
        const length = beamProgress.getTotalLength() || 240;
        gsap.set(beamProgress, {
          strokeDasharray: length,
          strokeDashoffset: length
        });
      }

      // Initialize traveler position on mount (Step 0)
      if (nodes[0] && traveler) {
        const initialY = nodes[0].offsetTop + 14;
        gsap.set(traveler, { top: initialY });
      }

      // Initialize node 0 visual states
      if (nodes[0]) {
        const outerRing = nodes[0].querySelector('.node-ring-outer');
        const innerRing = nodes[0].querySelector('.node-ring-inner');
        const core = nodes[0].querySelector('.node-core');
        if (outerRing && innerRing && core) {
          gsap.set(outerRing, { 
            width: 48, 
            height: 48, 
            borderWidth: 1.5,
            borderColor: "rgba(0,240,255,0.6)",
            backgroundColor: "rgba(0,240,255,0.05)"
          });
          activePulseTweenRef.current = gsap.to(outerRing, {
            boxShadow: "0 0 30px rgba(0,240,255,0.6), 0 0 60px rgba(0,240,255,0.2)",
            scale: 1.15,
            duration: 1.2,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1
          });
          gsap.set(innerRing, { 
            width: 32, 
            height: 32,
            backgroundColor: "rgba(168,85,247,0.1)",
            borderColor: "rgba(168,85,247,0.7)",
            borderWidth: 1.5,
            boxShadow: "0 0 12px rgba(168,85,247,0.4)"
          });
          gsap.set(core, { 
            width: 14, 
            height: 14,
            background: "linear-gradient(135deg, #00f0ff, #a855f7)",
            boxShadow: "0 0 8px rgba(0,240,255,0.8)"
          });
        }
      }

      // Create ScrollTrigger Timeline for pinning & transitions
      const tl = gsap.timeline({
        scrollTrigger: {
          id: "how-we-work-trigger",
          trigger: container,
          start: "top top",
          end: "+=300%", // 3 screens worth of scroll
          pin: pin,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            let stepIndex = 0;
            if (progress < 0.25) stepIndex = 0;
            else if (progress < 0.50) stepIndex = 1;
            else if (progress < 0.75) stepIndex = 2;
            else stepIndex = 3;

            if (stepIndex !== currentStepRef.current) {
              const prevIndex = currentStepRef.current;
              currentStepRef.current = stepIndex;
              animateNodeTransition(prevIndex, stepIndex);
              setActiveStep(stepIndex);
            }
          }
        }
      });

      // Animate progress beam strokeDashoffset
      if (beamProgress) {
        tl.to(beamProgress, {
          strokeDashoffset: 0,
          ease: "none",
        }, 0);
      }

      // Add extra padding at the end of the scroll trigger
      tl.to({}, { duration: 0.1 });

      // Section Entrance Animation (before pinning starts)
      const entranceTl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 75%",
          once: true,
        }
      });

      entranceTl.fromTo('.entrance-title-line',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power3.out" }
      );

      entranceTl.fromTo('.timeline-node',
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" },
        "-=0.6"
      );

      entranceTl.fromTo(cardRef.current,
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      );

    }, containerRef);

    return () => {
      ctx.revert();
      if (activePulseTweenRef.current) {
        activePulseTweenRef.current.kill();
      }
    };
  }, []);

  const handleNodeClick = (index: number) => {
    const trigger = ScrollTrigger.getById("how-we-work-trigger");
    if (trigger) {
      const start = trigger.start;
      const end = trigger.end;
      const total = end - start;
      
      const targetProgress = index === 0 ? 0.1 : index === 1 ? 0.35 : index === 2 ? 0.6 : 0.85;
      const targetY = start + total * targetProgress;
      
      window.scrollTo({
        top: targetY,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div ref={containerRef} id="how-we-work" className="relative w-full bg-black">
      {/* Visual styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        #timeline-track {
          position: relative;
          padding-left: 28px;
        }

        .timeline-node {
          position: relative;
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 52px;
          cursor: pointer;
        }

        .node-visual {
          position: relative;
          width: 28px;
          height: 28px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: -28px;
        }

        .node-ring-outer {
          position: absolute;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .node-ring-inner {
          position: absolute;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.2);
          background: rgba(255, 255, 255, 0.04);
        }

        .node-core {
          position: relative;
          z-index: 2;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .node-number {
          display: none;
        }

        .node-label {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.3);
          transition: color 0.3s ease;
        }

        /* --- ACTIVE node state --- */

        .node--active .node-ring-outer {
          width: 48px;
          height: 48px;
          border: 1.5px solid rgba(0, 240, 255, 0.6);
          box-shadow: 0 0 20px rgba(0, 240, 255, 0.3), 0 0 40px rgba(0, 240, 255, 0.15);
          background: rgba(0, 240, 255, 0.05);
        }

        .node--active .node-ring-inner {
          width: 32px;
          height: 32px;
          border: 1.5px solid rgba(168, 85, 247, 0.7);
          background: rgba(168, 85, 247, 0.1);
          box-shadow: 0 0 12px rgba(168, 85, 247, 0.4);
        }

        .node--active .node-core {
          width: 14px;
          height: 14px;
          background: linear-gradient(135deg, #00f0ff, #a855f7);
          box-shadow: 0 0 8px rgba(0, 240, 255, 0.8);
        }

        .node--active .node-number {
          display: block;
          position: absolute;
          font-size: 9px;
          font-weight: 700;
          color: white;
          z-index: 3;
        }

        .node--active .node-label {
          color: #00f0ff;
          font-size: 12px;
          letter-spacing: 0.12em;
          text-shadow: 0 0 12px rgba(0, 240, 255, 0.5);
        }

        /* Traveling glow dot */
        #beam-traveler {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: radial-gradient(circle, #fff 0%, #00f0ff 60%, transparent 100%);
          box-shadow: 0 0 10px #00f0ff, 0 0 20px rgba(0, 240, 255, 0.6);
          position: absolute;
          left: 11px;
          z-index: 5;
        }
      ` }} />

      {/* Scrollable Pinned Wrapper */}
      <div ref={pinRef} className="h-screen w-full flex items-center overflow-hidden">
        <div className="max-w-7xl mx-auto w-full px-6 md:px-12 grid grid-cols-1 md:grid-cols-[4fr_6fr] gap-12 items-center">
          
          {/* Left Column: Fixed Headers and Progress Tracker */}
          <div className="flex flex-col space-y-8">
            <div className="space-y-3">
              <span className="entrance-title-line block text-xs font-semibold tracking-[0.2em] text-brand-violet uppercase opacity-0">
                Workflow
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                <span className="entrance-title-line block opacity-0">How We Engineer</span>
                <span className="entrance-title-line block text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-violet opacity-0">
                  Exponential Scale
                </span>
              </h2>
            </div>

            {/* Vertical timeline progress track */}
            <div id="timeline-track" className="mt-12">
              
              {/* SVG beam line — drawn behind the nodes */}
              <svg
                id="beam-svg"
                style={{
                  position: 'absolute',
                  left: '13px',         /* centers on the node column */
                  top: '20px',
                  width: '2px',
                  height: 'calc(100% - 20px)',
                  overflow: 'visible',
                }}
              >
                {/* Base track — always visible, very dim */}
                <line
                  x1="1" y1="0" x2="1" y2="100%"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="1.5"
                />
                {/* Progress beam — fills in as user scrolls */}
                <line
                  ref={beamProgressRef}
                  id="beam-progress"
                  x1="1" y1="0" x2="1" y2="100%"
                  stroke="url(#beamGradient)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="1000"
                  strokeDashoffset="1000"   /* starts invisible, GSAP animates to 0 */
                />
                {/* Gradient definition */}
                <defs>
                  <linearGradient id="beamGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00f0ff" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                </defs>
              </svg>
              
              {/* 4 step nodes */}
              {steps.map((step, i) => (
                <div 
                  className={`timeline-node ${activeStep === i ? 'node--active' : ''} opacity-0`} 
                  data-index={i} 
                  key={i}
                  onClick={() => handleNodeClick(i)}
                >
                  {/* Node visual */}
                  <div className="node-visual" id={`node-${i}`}>
                    {/* Outer pulse ring */}
                    <div className="node-ring-outer" />
                    {/* Inner glow ring */}  
                    <div className="node-ring-inner" />
                    {/* Core circle with step number */}
                    <div className="node-core">
                      <span className="node-number">0{i+1}</span>
                    </div>
                  </div>
                  {/* Step label to the right of the node */}
                  <span className="node-label">{step.name}</span>
                </div>
              ))}

              {/* Traveling glow dot (absolutely positioned, moves along the beam) */}
              <div id="beam-traveler" />

            </div>
          </div>

          {/* Right Column: Step Detail Card (Single Card with 3D Flip transitions) */}
          <div style={{ perspective: "1000px" }} className="relative h-[350px] w-full flex items-center justify-center md:justify-start">
            <div
              ref={cardRef}
              className="step-card absolute top-0 left-0 w-full max-w-lg glass-card rounded-2xl p-8 flex flex-col space-y-6 select-none overflow-hidden opacity-0"
            >
              {/* 2px Top Accent Bar */}
              <div 
                className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl transition-all duration-500" 
                style={getAccentStyle(renderStep)}
              />

              {/* Card Top */}
              <div className="flex justify-between items-start">
                <span className={`text-5xl font-black italic tracking-tighter ${steps[renderStep].accent} opacity-90 drop-shadow-[0_0_12px_rgba(255,255,255,0.05)]`}>
                  {steps[renderStep].num}
                </span>
                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-[10px] font-bold text-gray-400">
                  Step
                </div>
              </div>

              {/* Card Title & Content */}
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  {steps[renderStep].title}
                </h3>
                <p className="text-gray-400 text-sm sm:text-base font-light leading-relaxed">
                  {steps[renderStep].desc}
                </p>
              </div>

              {/* Ambient glow decoration */}
              <div className={`absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] rounded-full blur-[40px] pointer-events-none opacity-20 bg-gradient-to-r ${renderStep % 2 === 0 ? 'from-brand-blue' : 'from-brand-violet'} to-transparent`} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
