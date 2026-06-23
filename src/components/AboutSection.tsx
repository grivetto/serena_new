import React from "react";
import { motion } from "motion/react";
import { ShieldCheck, Anchor, Compass, Award } from "lucide-react";

export default function AboutSection() {
  const stats = [
    { value: "15m", label: "Altezza Massima", description: "Sospensione in teatri e cattedrali" },
    { value: "24kN", label: "Tensione Tessuto", description: "Resistenza di sicurezza certificata" },
    { value: "12+", label: "Anni di Scena", description: "Tra ginnastica d'élite e danza" },
    { value: "180+", label: "Performance", description: "Spettacoli live in tutto il mondo" },
  ];

  return (
    <section
      id="artista"
      className="relative py-24 md:py-36 bg-transparent overflow-hidden"
    >
      {/* Decorative vertical line */}
      <div className="absolute top-0 left-12 md:left-24 w-[1px] h-full bg-gradient-to-b from-brand-pink/10 via-brand-cyan/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-3 text-brand-pink font-mono text-[11px] tracking-[0.3em] uppercase mb-4"
          >
            <span className="w-6 h-[1.5px] bg-brand-pink" />
            <span>01 / L'ARTISTA & LA FILOSOFIA</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="font-serif text-4xl md:text-6xl text-white font-bold tracking-tight leading-tight max-w-2xl"
          >
            La Sospensione della Gravità come Arte <span className="text-brand-pink italic font-normal">Poetica</span>
          </motion.h2>
        </div>

        {/* Asymmetrical Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* LEFT COLUMN: Narrative & Storytelling */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-8 pr-0 lg:pr-12">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6 text-zinc-300 font-sans font-light leading-relaxed text-base md:text-lg"
            >
              <p className="first-letter:text-5xl first-letter:font-serif first-letter:text-brand-pink first-letter:mr-3 first-letter:float-left first-letter:font-bold">
                Crescere sospesi nel vuoto significa ridefinire il concetto di stabilità. Serena inizia il suo percorso nella ginnastica artistica agonistica all'età di 6 anni, prima di scoprire che la sua vera vocazione risiedeva nel fondere l'esuberanza atletica con l'espressione teatrale contemporanea.
              </p>
              <p>
                Attraverso i <strong>Tessuti Aerei (Aerial Silks)</strong>, Serena esplora la fluidità della seta e la fragilità della figura umana in quota. Ogni performance è una coreografia di cadute controllate, avvitamenti spettacolari e figure statiche di estrema elasticità e forza pura. Non si tratta solo di compiere acrobazie, ma di scolpire l'aria stessa col movimento.
              </p>
            </motion.div>

            {/* Custom Interactive Accordion or Feature Cards */}
            <div className="space-y-4 pt-6">
              {[
                {
                  icon: <Anchor className="w-5 h-5 text-brand-pink" />,
                  title: "Estrema Rigidezza Fisica",
                  desc: "Ogni posa richiede un controllo isometrico millimetrico e una forza dorsale fuori dal comune.",
                },
                {
                  icon: <Compass className="w-5 h-5 text-brand-cyan" />,
                  title: "Fluidità Danzata",
                  desc: "Ispirata alla danza classica e contemporanea russa, per conferire armonia ed eleganza ad ogni risalita.",
                },
                {
                  icon: <ShieldCheck className="w-5 h-5 text-brand-pink" />,
                  title: "Sicurezza e Disciplina",
                  desc: "Utilizzo esclusivo di tessuti certificati ad alta tenuta e calcoli rigorosi dei carichi di rottura.",
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  className="p-5 rounded-2xl bg-white/3 border border-white/5 hover:border-brand-pink/20 hover:bg-brand-pink/2 transition-all duration-300 flex gap-4 items-start"
                  initial={{ opacity: 0, x: -25 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                >
                  <div className="p-2.5 rounded-xl bg-white/2 border border-white/5 shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-sans font-semibold text-white text-sm tracking-wide mb-1.5">{item.title}</h4>
                    <p className="font-sans text-xs text-zinc-400 leading-relaxed font-light">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: Overlapping Parallax Images (Awwwards Style) */}
          <div className="lg:col-span-6 relative flex items-center justify-center pt-16 lg:pt-0">
            {/* Back Glowing Spotlight Aura */}
            <div className="absolute top-1/4 right-1/4 w-72 h-72 rounded-full bg-brand-pink/10 blur-[80px] -z-10 animate-pulse" />

            {/* Main Primary Image */}
            <motion.div
              className="relative w-2/3 aspect-[3/4] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 z-10"
              initial={{ opacity: 0, y: 50, rotate: -2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.02 }}
            >
              <img
                src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=800&auto=format&fit=crop"
                alt="Serena in volo con tessuti"
                className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 hover:scale-105 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-6 text-left">
                <span className="text-[10px] font-mono tracking-widest text-brand-pink">LA GRAZIA</span>
                <p className="text-white font-serif italic text-sm font-semibold">"Studio di flessibilità, Lago di Como"</p>
              </div>
            </motion.div>

            {/* Secondary Overlapping Image (Offset for parallax) */}
            <motion.div
              className="absolute -bottom-10 -left-4 w-1/2 aspect-[3/4] rounded-2xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.6)] border border-brand-pink/10 z-20"
              initial={{ opacity: 0, y: 80, x: -30, rotate: 3 }}
              whileInView={{ opacity: 1, y: -20, x: 0, rotate: 3 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.05, rotate: 0 }}
            >
              <img
                src="https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=800&auto=format&fit=crop"
                alt="Serena acrobatics on silks"
                className="w-full h-full object-cover brightness-75 hover:brightness-100 transition-all duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 text-left">
                <span className="text-[9px] font-mono tracking-widest text-brand-cyan">LA FORZA</span>
                <p className="text-white font-serif text-xs font-semibold">"Vertical Drop, Teatro Regio"</p>
              </div>
            </motion.div>

            {/* Float Element (Athletic Blueprint detail) */}
            <motion.div
              className="absolute -top-6 -right-4 p-4 rounded-xl bg-black/80 border border-white/5 backdrop-blur-md hidden md:flex items-center gap-3 z-20"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 0.9, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <Award className="w-5 h-5 text-yellow-500" />
              <div className="text-left font-mono">
                <div className="text-[10px] text-zinc-400">QUALIFICA CONI</div>
                <div className="text-xs text-white font-bold">Tecnico Nazionale Aereo</div>
              </div>
            </motion.div>
          </div>

        </div>

        {/* Dynamic Metric counters inside custom grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-28 pt-12 border-t border-white/5">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              className="text-left group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.12 }}
            >
              <div className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight group-hover:text-brand-pink transition-colors duration-300">
                {stat.value}
              </div>
              <div className="font-sans font-semibold text-brand-pink/90 text-xs tracking-widest uppercase mt-2.5">
                {stat.label}
              </div>
              <div className="font-sans font-light text-zinc-400 text-xs mt-1 max-w-[180px]">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
