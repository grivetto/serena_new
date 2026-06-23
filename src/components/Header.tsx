import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Music, Volume2, VolumeX, Menu, X, ArrowRight } from "lucide-react";

interface HeaderProps {
  performanceMode: boolean;
  setPerformanceMode: (mode: boolean) => void;
  activeSection: string;
}

export default function Header({ performanceMode, setPerformanceMode, activeSection }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Inizio", href: "#inizio" },
    { label: "L'Artista", href: "#artista" },
    { label: "Performance", href: "#performance" },
    { label: "Corsi & Contatti", href: "#contatti" },
  ];

  const togglePerformanceMode = () => {
    setPerformanceMode(!performanceMode);
  };

  return (
    <>
      <motion.header
        id="main-navigation-header"
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
          scrolled
            ? "py-4 bg-[#080808]/85 backdrop-blur-md border-b border-brand-pink/15"
            : "py-7 bg-transparent"
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo / Brand */}
          <a
            href="#inizio"
            className="flex items-center gap-2 group cursor-pointer"
            id="logo-brand-link"
          >
            <motion.div
              className="w-8 h-8 rounded-full border border-brand-pink/40 flex items-center justify-center relative overflow-hidden"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-pink to-brand-cyan opacity-20 group-hover:opacity-40 transition-opacity" />
              <Sparkles className="w-4 h-4 text-brand-pink group-hover:rotate-12 transition-transform duration-300" />
            </motion.div>
            <span className="font-sans font-bold text-sm tracking-[0.4em] text-white">
              SERENA
              <span className="text-brand-pink group-hover:animate-pulse">.</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8" id="desktop-nav">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className="relative py-2 text-xs font-mono tracking-widest text-zinc-400 hover:text-white transition-colors duration-300 group"
                >
                  {item.label}
                  {/* Underline indicators */}
                  <span
                    className={`absolute bottom-0 left-0 h-[1.5px] bg-gradient-to-r from-brand-pink to-brand-cyan transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-6">
            {/* Theatrical / Performance Mode Button */}
            <motion.button
              onClick={togglePerformanceMode}
              className={`flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-mono tracking-wider border transition-all duration-300 ${
                performanceMode
                  ? "bg-brand-pink/10 border-brand-pink/40 text-brand-pink shadow-[0_0_15px_rgba(255,0,128,0.2)]"
                  : "bg-white/5 border-white/10 text-zinc-400 hover:border-brand-pink/30 hover:text-white"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              id="performance-mode-toggle"
            >
              {performanceMode ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-brand-pink animate-bounce" />
                  <span>PERFORMANCE MODE: ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span>PERFORMANCE MODE: OFF</span>
                </>
              )}
            </motion.button>

            {/* Direct CTA */}
            <motion.a
              href="#contatti"
              className="px-5 py-2 rounded-full text-xs font-mono tracking-wider bg-gradient-to-r from-brand-pink to-brand-cyan text-white font-medium hover:shadow-[0_0_20px_rgba(255,0,128,0.35)] transition-all duration-300 flex items-center gap-1.5"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              id="direct-cta-btn"
            >
              <span>PRENOTA ORA</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </motion.a>
          </div>

          {/* Mobile Menu & Toggle Buttons */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={togglePerformanceMode}
              className={`p-2 rounded-full border ${
                performanceMode
                  ? "bg-brand-pink/10 border-brand-pink/40 text-brand-pink"
                  : "bg-white/5 border-white/10 text-zinc-400"
              }`}
              id="mobile-performance-toggle"
            >
              {performanceMode ? (
                <Volume2 className="w-4 h-4 animate-bounce" />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 bg-white/5 rounded-full border border-white/10 text-white"
              aria-label="Toggle Menu"
              id="mobile-menu-trigger"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Navigation Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-navigation-dropdown"
            className="fixed inset-0 bg-[#080808] z-30 pt-28 px-8 flex flex-col justify-between pb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex flex-col gap-6">
              <span className="text-[10px] font-mono tracking-widest text-brand-pink">NAVIZAGIONE</span>
              <div className="flex flex-col gap-4">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-3xl font-serif text-white hover:text-brand-pink transition-colors py-2 flex items-center justify-between group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08 }}
                  >
                    <span>{item.label}</span>
                    <ArrowRight className="w-5 h-5 text-zinc-600 group-hover:text-brand-pink group-hover:translate-x-1.5 transition-all" />
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-5 border-t border-white/5 pt-8">
              <motion.a
                href="#contatti"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-4 text-center rounded-xl bg-gradient-to-r from-brand-pink to-brand-cyan text-sm font-mono tracking-widest text-white font-bold"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
              >
                PRENOTA SESSIONE
              </motion.a>
              <div className="flex justify-between items-center text-[11px] font-mono text-zinc-500 px-2">
                <span>MILANO - ROMA - LONDON</span>
                <span className="text-brand-pink">SERENA AERIAL © 2026</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
