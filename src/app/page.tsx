import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MarqueeStrip from "@/components/MarqueeStrip";
import HowWeWork from "@/components/HowWeWork";
import FoundersNote from "@/components/FoundersNote";
import OurWork from "@/components/OurWork";
import WhatWeveBuilt from "@/components/WhatWeveBuilt";
import Reviews from "@/components/Reviews";
import FAQ from "@/components/FAQ";
import TurnaroundPromise from "@/components/TurnaroundPromise";
import ContactFooter from "@/components/ContactFooter";
import MagneticCore from "@/components/MagneticCore";

export default function Home() {
  return (
    <SmoothScroll>
      <Navbar />
      <main className="relative w-full min-h-screen bg-black overflow-x-hidden">
        {/* Main interactive sections (sliding/revealing) */}
        <div className="relative z-10 bg-black w-full shadow-[0_15px_30px_rgba(0,0,0,0.8)]">
          <Hero />
          <MarqueeStrip />
          <HowWeWork />
          <OurWork />
          <MagneticCore />
          <FoundersNote />
          <WhatWeveBuilt />
          <Reviews />
          <FAQ />
          <TurnaroundPromise />
        </div>
        
        {/* Contact form (acts as cover) & Pinned Footer reveal */}
        <ContactFooter />
      </main>
    </SmoothScroll>
  );
}
