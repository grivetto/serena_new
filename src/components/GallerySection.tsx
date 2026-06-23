import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Maximize2, Calendar, MapPin, X, Info, Sparkles, Activity } from "lucide-react";

interface PerformanceItem {
  id: number;
  title: string;
  category: string;
  location: string;
  date: string;
  image: string;
  altitude: string;
  musics: string;
  duration: string;
  description: string;
}

export default function GallerySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 });
  const [selectedPerformance, setSelectedPerformance] = useState<PerformanceItem | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const performances: PerformanceItem[] = [
    {
      id: 1,
      title: "Rosso Sospeso",
      category: "Danza Aerea d'Avanguardia",
      location: "Teatro della Pergola, Firenze",
      date: "Marzo 2026",
      image: "https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=800&auto=format&fit=crop",
      altitude: "14 Metri",
      musics: "Ludovico Einaudi - Experience",
      duration: "18 Minuti",
      description: "Una performance incentrata sulla solitudine e l'abbandono. Il tessuto di seta rosso vermiglio agisce come cordone ombelicale dell'anima, teso tra l'aspirazione al volo e l'inesorabile gravità terrestre.",
    },
    {
      id: 2,
      title: "Milano Fashion Gala",
      category: "Performance Haute Couture",
      location: "Piazza Duomo, Milano",
      date: "Gennaio 2026",
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop",
      altitude: "10 Metri",
      musics: "Max Richter - Recomposed Vivaldi",
      duration: "12 Minuti",
      description: "Un'apertura teatrale mozzafiato per la settimana della moda milanese. Serena volteggia vestita con tessuti di seta customizzati da designer d'alta moda, creando giochi geometrici che fluttuano sopra gli spettatori.",
    },
    {
      id: 3,
      title: "Luci e Ombre",
      category: "Teatro-Danza e Acrobatica",
      location: "Teatro Regio, Torino",
      date: "Ottobre 2025",
      image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=800&auto=format&fit=crop",
      altitude: "12 Metri",
      musics: "Hans Zimmer - Interstellar Suite",
      duration: "25 Minuti",
      description: "Uno spettacolo basato sul forte contrasto delle ombre cinesi riflesse su uno schermo di 20 metri. Serena realizza evoluzioni ad altissimo impatto visivo catturate da un singolo fascio di luce ultravioletta.",
    },
    {
      id: 4,
      title: "Gravity Zero Show",
      category: "Contemporary Circus",
      location: "Royal Albert Hall, London",
      date: "Luglio 2025",
      image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800&auto=format&fit=crop",
      altitude: "16 Metri",
      musics: "Woodkid - Run Boy Run",
      duration: "15 Minuti",
      description: "Performance atletica ad altissimo rischio, caratterizzata da tre 'Drop' consecutivi (cadute libere sul tessuto arrestatisi a soli 2 metri da terra). Uno studio estremo sulla forza d'impatto e la precisione geometrica.",
    },
    {
      id: 5,
      title: "Vesperae",
      category: "Poesia in Sospensione",
      location: "Anfiteatro di Pompei",
      date: "Giugno 2025",
      image: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=800&auto=format&fit=crop",
      altitude: "8 Metri",
      musics: "Ólafur Arnalds - Nocturne",
      duration: "20 Minuti",
      description: "Eseguito al tramonto nella suggestiva cornice archeologica di Pompei, lo spettacolo unisce la classicità del canto lirico dal vivo con movimenti sinuosi e scultorei che catturano gli ultimi raggi di sole dorato.",
    },
  ];

  const updateConstraints = () => {
    if (containerRef.current && sliderRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const sliderWidth = sliderRef.current.scrollWidth;
      setDragConstraints({
        left: -(sliderWidth - containerWidth + 60),
        right: 40,
      });
    }
  };

  useEffect(() => {
    updateConstraints();
    window.addEventListener("resize", updateConstraints);
    return () => window.removeEventListener("resize", updateConstraints);
  }, [performances.length]);

  const handleDrag = () => {
    if (sliderRef.current && containerRef.current) {
      const slider = sliderRef.current;
      const container = containerRef.current;
      const totalWidth = slider.scrollWidth - container.offsetWidth;
      const matrix = new WebKitCSSMatrix(window.getComputedStyle(slider).transform);
      const currentX = matrix.m41;
      const progress = Math.min(Math.max(-currentX / totalWidth, 0), 1);
      setScrollProgress(progress);
    }
  };

  return (
    <section
      id="performance"
      className="relative py-24 md:py-36 bg-transparent overflow-hidden border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header Title Grid */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 text-brand-pink font-mono text-[11px] tracking-[0.3em] uppercase mb-4"
            >
              <span className="w-6 h-[1.5px] bg-brand-pink" />
              <span>02 / LIVE PERFORMANCES</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-serif text-4xl md:text-5xl text-white font-bold tracking-tight leading-tight"
            >
              Archivio delle Performance <span className="text-brand-cyan italic font-normal">Iconiche</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.6 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 font-mono text-[10px] text-zinc-500"
          >
            <Activity className="w-4 h-4 text-brand-pink animate-pulse" />
            <span>TIRA PER ESPLORARE LA GALLERIA</span>
          </motion.div>
        </div>
      </div>

      {/* Draggable Slider Stage Container */}
      <div
        ref={containerRef}
        className="w-full px-6 md:px-12 overflow-x-hidden cursor-grab active:cursor-grabbing"
        data-cursor="drag"
        id="draggable-gallery-stage"
      >
        <motion.div
          ref={sliderRef}
          className="flex gap-8 pb-10 select-none pl-6 md:pl-12"
          drag="x"
          dragConstraints={dragConstraints}
          onDrag={handleDrag}
          dragElastic={0.15}
        >
          {performances.map((perf) => (
            <motion.div
              key={perf.id}
              className="min-w-[280px] sm:min-w-[380px] md:min-w-[420px] aspect-[4/5] bg-white/3 border border-white/5 rounded-3xl overflow-hidden relative group shrink-0 flex flex-col justify-end p-6 md:p-8"
              whileHover={{ y: -10 }}
              transition={{ duration: 0.4 }}
            >
              {/* Back Image with Scale Effect */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                  src={perf.image}
                  alt={perf.title}
                  className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110 grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-95"
                  draggable={false}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              </div>

              {/* Float Category Tag */}
              <div className="absolute top-6 left-6 px-3 py-1 bg-black/40 backdrop-blur-md rounded-full border border-white/5 text-[10px] font-mono tracking-widest text-brand-pink">
                {perf.category}
              </div>

              {/* Text metadata */}
              <div className="relative z-10 space-y-3">
                <span className="font-mono text-[10px] text-zinc-400 tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-brand-pink" />
                  {perf.location}
                </span>

                <h3 className="font-serif text-2xl md:text-3xl font-bold text-white leading-tight">
                  {perf.title}
                </h3>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                    {perf.date}
                  </span>

                  <button
                    onClick={() => setSelectedPerformance(perf)}
                    className="p-3 bg-white/10 rounded-full border border-white/5 text-white hover:bg-brand-pink hover:border-brand-pink transition-all duration-300 transform group-hover:scale-105"
                    aria-label="Apri Dettagli"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Progress Bar indicator */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-6">
        <div className="h-[2px] w-full bg-zinc-800 rounded-full overflow-hidden relative">
          <motion.div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-brand-pink to-brand-cyan rounded-full"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
      </div>

      {/* Interactive Lightbox Detailed Modal */}
      <AnimatePresence>
        {selectedPerformance && (
          <motion.div
            className="fixed inset-0 bg-black/90 backdrop-blur-lg z-50 flex items-center justify-center p-4 md:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            id="gallery-item-modal"
          >
            <motion.div
              className="bg-[#0c0c0c] border border-white/10 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative flex flex-col md:flex-row overflow-hidden shadow-2xl"
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 30, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPerformance(null)}
                className="absolute top-5 right-5 p-2.5 bg-black/60 rounded-full border border-white/10 text-white hover:bg-brand-pink transition-colors z-20"
                aria-label="Chiudi"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Photo Area */}
              <div className="w-full md:w-1/2 aspect-[4/5] md:aspect-auto relative shrink-0">
                <img
                  src={selectedPerformance.image}
                  alt={selectedPerformance.title}
                  className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#0c0c0c] pointer-events-none" />
              </div>

              {/* Content Description Area */}
              <div className="w-full md:w-1/2 p-8 flex flex-col justify-between">
                <div className="space-y-6">
                  <div>
                    <span className="px-3 py-1 rounded-full bg-brand-pink/10 border border-brand-pink/20 text-[10px] font-mono tracking-widest text-brand-pink">
                      {selectedPerformance.category}
                    </span>
                    <h3 className="font-serif text-3xl md:text-4xl font-bold text-white tracking-tight mt-3">
                      {selectedPerformance.title}
                    </h3>
                  </div>

                  <p className="font-sans text-sm text-zinc-400 leading-relaxed font-light">
                    {selectedPerformance.description}
                  </p>

                  {/* Technical Specs Bento-Grid */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                    <div className="p-3.5 rounded-xl bg-white/2 border border-white/5">
                      <div className="text-[10px] font-mono text-brand-pink">ALTEZZA ANCHOR</div>
                      <div className="text-sm font-semibold text-white mt-1">{selectedPerformance.altitude}</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-white/2 border border-white/5">
                      <div className="text-[10px] font-mono text-brand-cyan">DURATA ATTO</div>
                      <div className="text-sm font-semibold text-white mt-1">{selectedPerformance.duration}</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-white/2 border border-white/5 col-span-2">
                      <div className="text-[10px] font-mono text-zinc-400">SOUND DESIGN / COLONNA SONORA</div>
                      <div className="text-sm font-semibold text-zinc-200 mt-1 italic">
                        {selectedPerformance.musics}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between text-xs font-mono text-zinc-500">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-brand-pink" />
                    {selectedPerformance.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {selectedPerformance.date}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
