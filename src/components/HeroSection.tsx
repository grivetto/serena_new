import React from "react";
import { motion } from "motion/react";
import { ArrowDown, Sparkles, Trophy, Eye } from "lucide-react";
import SilkCanvas from "./SilkCanvas";

interface HeroSectionProps {
  performanceMode: boolean;
}

export default function HeroSection({ performanceMode }: HeroSectionProps) {
  return (
    <section
      id="inizio"
      className="relative min-h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-transparent pt-20"
    >
      {/* 1. Fluid Silk Canvas Layer */}
      <SilkCanvas />

      {/* 2. Interactive Ambient Spotlights & Theater Backlight */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Deep Ambient Gloom */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] rounded-full bg-brand-pink/5 blur-[160px]" />
        
        {/* Dynamic spotlights that flare up under Performance Mode */}
        <motion.div
          className="absolute -top-40 left-1/4 w-[400px] h-[600px] rounded-full bg-brand-cyan/10 blur-[130px] mix-blend-screen"
          animate={{
            scale: performanceMode ? [1, 1.25, 1] : 1,
            opacity: performanceMode ? [0.4, 0.75, 0.4] : 0.3,
            x: performanceMode ? [0, 60, 0] : 0,
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -top-40 right-1/4 w-[400px] h-[600px] rounded-full bg-brand-pink/10 blur-[130px] mix-blend-screen"
          animate={{
            scale: performanceMode ? [1, 1.3, 1] : 1,
            opacity: performanceMode ? [0.3, 0.7, 0.3] : 0.2,
            x: performanceMode ? [0, -70, 0] : 0,
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Floating particles simulation purely with CSS transitions and React mapping */}
        {performanceMode && (
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 15 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-brand-pink rounded-full opacity-40 filter blur-[0.5px]"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [-20, -120],
                  x: [0, Math.random() * 40 - 20],
                  opacity: [0, 0.7, 0],
                }}
                transition={{
                  duration: 5 + Math.random() * 8,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* 3. Hero Copy Layout */}
      <div className="relative max-w-7xl mx-auto px-6 md:px-12 z-10 flex flex-col items-center justify-center text-center mt-6">
        
        {/* Subtle Athletic / Artistic Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-pink/5 border border-brand-pink/20 text-[10px] font-mono tracking-[0.2em] text-brand-pink uppercase mb-8"
        >
          <Trophy className="w-3 h-3 text-brand-pink animate-pulse" />
          <span>Campionessa Italiana & Artista Internazionale</span>
        </motion.div>

        {/* Immersive Bold Headline Name */}
        <div className="overflow-hidden select-none mb-3">
          <motion.h1
            className="font-serif text-7xl sm:text-8xl md:text-9xl lg:text-[11rem] font-bold tracking-[0.12em] text-white leading-none relative"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            SERENA
          </motion.h1>
        </div>

        {/* Secondary Title Overlay with Silk Motif */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.85 }}
          transition={{ duration: 1.5, delay: 0.7 }}
          className="flex items-center gap-3 text-zinc-400 mb-6"
        >
          <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-brand-pink" />
          <p className="font-mono text-xs md:text-sm tracking-[0.4em] uppercase text-brand-pink/80">
            AERIAL SILKS PERFORMER & ATHLETE
          </p>
          <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-brand-cyan" />
        </motion.div>

        {/* Poetic description / Hook */}
        <motion.p
          className="max-w-xl text-sm md:text-base text-zinc-400 font-sans leading-relaxed tracking-wide font-light mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          La fusione definitiva tra la forza atletica estrema e la fluidità poetica della danza aerea. 
          Un corpo sospeso nel vuoto, sorretto solo da veli di seta, che racconta storie senza peso.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center gap-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
        >
          <motion.a
            href="#artista"
            className="px-8 py-4 rounded-full bg-white text-black font-semibold text-xs font-mono tracking-widest hover:bg-brand-pink hover:text-white transition-all duration-300 shadow-[0_10px_30px_rgba(255,255,255,0.05)] hover:shadow-[0_10px_35px_rgba(255,0,128,0.35)] flex items-center gap-2 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <span>SCOPRI LA MAGIA</span>
            <Eye className="w-4 h-4 group-hover:rotate-6 transition-transform" />
          </motion.a>

          <motion.a
            href="#performance"
            className="px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-medium text-xs font-mono tracking-widest hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            GUARDA I VIDEO
          </motion.a>
        </motion.div>
      </div>

      {/* 4. Elegant Vertical Scroll Down Cue */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2.5 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1.5, duration: 1 }}
        whileHover={{ opacity: 1, y: 4 }}
        onClick={() => {
          document.getElementById("artista")?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-zinc-500">SCROLL DOWN</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-9 rounded-full border border-zinc-700 flex justify-center p-1.5"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-brand-pink" />
        </motion.div>
      </motion.div>

      {/* Side Decorative Metadata lines (Awwwards style) */}
      <div className="absolute bottom-12 left-10 hidden lg:flex flex-col gap-1 text-[10px] font-mono text-zinc-600 select-none pointer-events-none">
        <div>COORDINATES: 45°27'50.9"N 9°11'25.2"E</div>
        <div>GRAVITY: 9.81 M/S² | AIR RESISTANCE: ACTIVE</div>
      </div>
      <div className="absolute bottom-12 right-10 hidden lg:flex flex-col items-end gap-1 text-[10px] font-mono text-zinc-600 select-none pointer-events-none">
        <div>AERIAL SILKS / TESSUTI AEREI</div>
        <div className="text-brand-pink/60 font-semibold animate-pulse">● LIVE PERFORMANCE ARCHIVE</div>
      </div>
    </section>
  );
}
