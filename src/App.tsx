import React, { useState, useEffect, useRef } from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import GallerySection from "./components/GallerySection";
import BookingSection from "./components/BookingSection";
import CustomCursor from "./components/CustomCursor";
import { Volume2, Sparkles, MapPin, Mail, ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [performanceMode, setPerformanceMode] = useState(false);
  const [activeSection, setActiveSection] = useState("inizio");
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Audio synthesizer references
  const audioCtxRef = useRef<AudioContext | null>(null);
  const droneOsc1Ref = useRef<OscillatorNode | null>(null);
  const droneOsc2Ref = useRef<OscillatorNode | null>(null);
  const droneGainRef = useRef<GainNode | null>(null);

  // Intersection Observer to track scroll sections dynamically
  useEffect(() => {
    const sections = ["inizio", "artista", "performance", "contatti"];
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -40% 0px", // triggers when section occupies the middle part of viewport
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    // Handle scroll-to-top button visibility
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 600);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Web Audio API Synthesizer Control
  useEffect(() => {
    if (performanceMode) {
      try {
        // Initialize AudioContext if not already created
        if (!audioCtxRef.current) {
          audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }

        const ctx = audioCtxRef.current;
        if (ctx.state === "suspended") {
          ctx.resume();
        }

        // Create main gain node for volume control
        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0, ctx.currentTime);
        // Smooth fade-in
        masterGain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 3); // soft, elegant volume
        masterGain.connect(ctx.destination);
        droneGainRef.current = masterGain;

        // Lowpass filter for warm theatrical sound
        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(140, ctx.currentTime);
        filter.Q.setValueAtTime(2, ctx.currentTime);
        filter.connect(masterGain);

        // Slow filter sweeps to represent air current
        const sweepFilter = () => {
          if (!filter) return;
          const now = ctx.currentTime;
          filter.frequency.setValueAtTime(140, now);
          filter.frequency.exponentialRampToValueAtTime(320, now + 5);
          filter.frequency.exponentialRampToValueAtTime(140, now + 10);
          setTimeout(sweepFilter, 10000);
        };
        sweepFilter();

        // Deep drone fundamental (C2 = 65.41Hz)
        const osc1 = ctx.createOscillator();
        osc1.type = "triangle";
        osc1.frequency.setValueAtTime(65.41, ctx.currentTime);
        osc1.connect(filter);
        osc1.start();
        droneOsc1Ref.current = osc1;

        // Warm perfect fifth harmonic (G2 = 98Hz)
        const osc2 = ctx.createOscillator();
        osc2.type = "sawtooth";
        osc2.frequency.setValueAtTime(98.0, ctx.currentTime);
        osc2.connect(filter);
        osc2.start();
        droneOsc2Ref.current = osc2;

      } catch (err) {
        console.warn("Web Audio Synthesizer blocked or unsupported:", err);
      }
    } else {
      // Fade-out and stop synthesizer
      const masterGain = droneGainRef.current;
      const ctx = audioCtxRef.current;
      if (masterGain && ctx) {
        masterGain.gain.cancelScheduledValues(ctx.currentTime);
        masterGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.5);
        
        setTimeout(() => {
          try {
            droneOsc1Ref.current?.stop();
            droneOsc2Ref.current?.stop();
            droneOsc1Ref.current = null;
            droneOsc2Ref.current = null;
            droneGainRef.current = null;
          } catch (e) {}
        }, 1600);
      }
    }

    return () => {
      // Clean up sound on unmount
      try {
        droneOsc1Ref.current?.stop();
        droneOsc2Ref.current?.stop();
      } catch (e) {}
    };
  }, [performanceMode]);

  return (
    <div className="relative min-h-screen bg-[#080808] mesh-bg text-zinc-100 overflow-x-hidden antialiased selection:bg-brand-pink selection:text-white font-sans">
      
      {/* 1. Custom Smooth Follow Cursor (Awwwards design) */}
      <CustomCursor />

      {/* 2. Global Performance Mode Overlay Frame */}
      <AnimatePresence>
        {performanceMode && (
          <motion.div
            id="theatrical-performance-frame"
            className="fixed inset-0 pointer-events-none border-[12px] md:border-[20px] border-brand-pink/10 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
          />
        )}
      </AnimatePresence>

      {/* 3. Global Navigation Header */}
      <Header
        performanceMode={performanceMode}
        setPerformanceMode={setPerformanceMode}
        activeSection={activeSection}
      />

      {/* 4. Page Content Sections */}
      <main id="main-scroll-container">
        {/* Hero Stage Section */}
        <HeroSection performanceMode={performanceMode} />

        {/* About / Biography Section */}
        <AboutSection />

        {/* Performances Draggable Slider Grid */}
        <GallerySection />

        {/* Booking / Course / Contacts Section */}
        <BookingSection />
      </main>

      {/* 5. Sleek Elegant Footnote */}
      <footer className="bg-[#040404] border-t border-white/5 py-12 relative z-10 overflow-hidden">
        {/* Soft backlighting */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-40 rounded-full bg-brand-pink/5 blur-[80px]" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left space-y-2">
            <span className="font-sans font-bold text-sm tracking-[0.25em] text-white">
              SERENA<span className="text-brand-pink">.</span>
            </span>
            <p className="text-zinc-500 text-[11px] font-mono tracking-wider">
              AERIAL SILKS ATHLETE & PERFORMANCE ARTIST
            </p>
          </div>

          <div className="flex gap-8 text-[11px] font-mono text-zinc-500">
            <a href="#inizio" className="hover:text-white transition-colors">INIZIO</a>
            <a href="#artista" className="hover:text-white transition-colors">CHI SONO</a>
            <a href="#performance" className="hover:text-white transition-colors">SPETTACOLI</a>
            <a href="#contatti" className="hover:text-white transition-colors">PRENOTA</a>
          </div>

          <div className="text-center md:text-right text-[10px] font-mono text-zinc-600">
            <div>CRAFTED FOR EMOTION © 2026 SERENA AERIAL SILKS. ALL RIGHTS RESERVED.</div>
            <div className="text-zinc-700 mt-1">CODICE CONI: RE-24891 // SAFETY STANDARDS CERTIFIED</div>
          </div>
        </div>
      </footer>

      {/* 6. Floating Scroll to Top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-8 right-8 p-3 bg-brand-pink text-white rounded-full border border-brand-pink shadow-lg z-40 hover:bg-brand-pink hover:shadow-brand-pink/25 transition-all cursor-pointer"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
            id="scroll-to-top-btn"
            aria-label="Torna in alto"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
