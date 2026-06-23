import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, MapPin, CheckCircle, Sparkles, MessageSquare, Mail, User, Instagram, Play, ArrowUpRight } from "lucide-react";

interface Course {
  id: string;
  name: string;
  level: string;
  location: string;
  duration: string;
  description: string;
}

export default function BookingSection() {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const courses: Course[] = [
    {
      id: "mastery",
      name: "Acrobatic Mastery",
      level: "Avanzato / Agonistico",
      location: "Milano, Studio Spazio Aria",
      duration: "Sabato 10:00 - 13:00",
      description: "Per atleti ed esperti di acrobatica. Focus su cadute dinamiche (Drop), avvitamenti balistici complessi e potenziamento isometrico avanzato.",
    },
    {
      id: "poetry",
      name: "Fluid Poetry",
      level: "Intermedio / Coreografico",
      location: "Torino, Loft d'Arte Contemporanea",
      duration: "Martedì & Giovedì 18:30 - 20:30",
      description: "Fusione tra danza classica e aerea. Lavoreremo sulla continuità delle transizioni, sulla postura e sull'espressione drammatica.",
    },
    {
      id: "discovery",
      name: "Sensory Discovery",
      level: "Principiante / Base",
      location: "Roma, Studio Hanging Lights",
      duration: "Lunedì 19:00 - 21:00",
      description: "Aperto a tutti. Scopri la fiducia nel vuoto, la consapevolezza corporea e la forza di base per gestire il tuo peso corporeo sulla seta.",
    },
  ];

  const handleCourseSelect = (courseName: string) => {
    setSelectedCourse(courseName);
    // Smooth scroll down to the contact form so they see it's selected
    const formElement = document.getElementById("contact-form-container");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const validateForm = () => {
    let isValid = true;
    const tempErrors = { name: "", email: "", message: "" };

    if (!formData.name.trim()) {
      tempErrors.name = "Inserisci il tuo nome completo";
      isValid = false;
    }

    if (!formData.email.trim()) {
      tempErrors.email = "L'indirizzo email è obbligatorio";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Inserisci un indirizzo email valido";
      isValid = false;
    }

    if (!formData.message.trim()) {
      tempErrors.message = "Scrivi un breve messaggio con le tue richieste";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      // Simulate premium asynchronous booking submit
      setTimeout(() => {
        setLoading(false);
        setSubmitted(true);
        // Save to localStorage just for a small trace of persistence
        localStorage.setItem("serena_booking", JSON.stringify({ ...formData, course: selectedCourse, timestamp: new Date() }));
      }, 1500);
    }
  };

  return (
    <section
      id="contatti"
      className="relative py-24 md:py-36 bg-transparent overflow-hidden"
    >
      {/* Visual glowing meshes */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-brand-cyan/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] rounded-full bg-brand-pink/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col mb-16 md:mb-24 text-center items-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 text-brand-pink font-mono text-[11px] tracking-[0.3em] uppercase mb-4"
          >
            <span className="w-6 h-[1.5px] bg-brand-pink" />
            <span>03 / ACCADEMIA & CONTATTI</span>
            <span className="w-6 h-[1.5px] bg-brand-pink" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-serif text-4xl md:text-5xl text-white font-bold tracking-tight leading-tight max-w-2xl"
          >
            Corsi di Seta & <span className="text-brand-pink italic font-normal">Collaborazioni</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.6 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-zinc-400 font-sans text-sm md:text-base mt-4 max-w-lg font-light"
          >
            Unisciti a una delle mie classi settimanali, organizza un workshop privato oppure prenota una performance solista per il tuo evento teatrale o gala di lusso.
          </motion.p>
        </div>

        {/* 1. COURSES GRID SELECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
          {courses.map((course, idx) => {
            const isSelected = selectedCourse === course.name;
            return (
              <motion.div
                key={course.id}
                className={`p-8 rounded-3xl border transition-all duration-500 flex flex-col justify-between relative group overflow-hidden ${
                  isSelected
                    ? "bg-brand-pink/5 border-brand-pink/50 shadow-[0_15px_40px_rgba(255,0,128,0.15)]"
                    : "bg-white/3 border-white/5 hover:border-brand-pink/20 hover:bg-brand-pink/1"
                }`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.15 }}
                whileHover={{ y: -6 }}
              >
                <div className="space-y-4">
                  {/* Card Badge */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono tracking-widest text-brand-pink uppercase">
                      {course.level}
                    </span>
                    <span className="text-zinc-500 font-mono text-[10px]">{course.duration}</span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-white group-hover:text-brand-pink transition-colors">
                    {course.name}
                  </h3>

                  <p className="text-zinc-400 font-sans text-xs md:text-sm leading-relaxed font-light">
                    {course.description}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                  <span className="text-zinc-500 text-[11px] font-mono flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-brand-pink" />
                    {course.location}
                  </span>

                  <button
                    onClick={() => handleCourseSelect(course.name)}
                    className={`px-4.5 py-2.5 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase transition-all duration-300 flex items-center gap-1 ${
                      isSelected
                        ? "bg-brand-pink text-white"
                        : "bg-white/5 text-white hover:bg-brand-pink hover:text-white"
                    }`}
                  >
                    <span>SELEZIONA</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* 2. CONTACT / BOOKING FORM SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" id="contact-form-container">
          
          {/* Form left content */}
          <div className="lg:col-span-5 space-y-8 pr-0 lg:pr-8">
            <h3 className="font-serif text-3xl font-bold text-white tracking-tight">
              Invia un Messaggio <span className="text-brand-cyan italic font-normal">Privato</span>
            </h3>
            <p className="font-sans text-zinc-400 text-sm font-light leading-relaxed">
              Hai bisogno di chiarimenti, vuoi concordare una lezione privata o richiedere il preventivo di uno spettacolo? Compila il form a lato. Riceverai un dossier tecnico e artistico entro un giorno lavorativo.
            </p>

            <div className="space-y-4 pt-4 border-t border-white/5">
              <div className="flex items-center gap-4 text-zinc-300">
                <div className="p-3 bg-white/3 rounded-xl border border-white/5">
                  <Mail className="w-5 h-5 text-brand-pink" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-zinc-500">EMAIL GENERALE</div>
                  <a href="mailto:info@serena-aerialsilks.it" className="text-sm font-semibold hover:text-brand-pink transition-colors">
                    info@serena-aerialsilks.it
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 text-zinc-300">
                <div className="p-3 bg-white/3 rounded-xl border border-white/5">
                  <MapPin className="w-5 h-5 text-brand-cyan" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-zinc-500">BASE OPERATIVA</div>
                  <div className="text-sm font-semibold text-zinc-200">
                    Milano / Roma, Italia
                  </div>
                </div>
              </div>
            </div>

            {/* Glowing Social badges */}
            <div className="pt-6">
              <div className="text-[10px] font-mono text-zinc-500 tracking-widest uppercase mb-3">SEGUIMI SUI SOCIAL</div>
              <div className="flex gap-4">
                <motion.a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3.5 rounded-2xl bg-white/3 border border-white/5 hover:border-brand-pink/30 text-zinc-400 hover:text-brand-pink transition-all flex items-center gap-2 font-mono text-xs"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Instagram className="w-4 h-4" />
                  <span>@serena.aerial</span>
                </motion.a>
                <motion.a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3.5 rounded-2xl bg-white/3 border border-white/5 hover:border-brand-cyan/30 text-zinc-400 hover:text-brand-cyan transition-all flex items-center gap-2 font-mono text-xs"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play className="w-4 h-4 rotate-90" />
                  <span>@serenasilks.tiktok</span>
                </motion.a>
              </div>
            </div>
          </div>

          {/* Form right editor */}
          <div className="lg:col-span-7 bg-white/2 border border-white/5 rounded-3xl p-8 md:p-10 relative">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="contact-form"
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  exit={{ opacity: 0, y: -20 }}
                >
                  {selectedCourse && (
                    <motion.div
                      className="p-4 rounded-xl bg-brand-pink/10 border border-brand-pink/20 flex items-center justify-between text-xs font-mono text-brand-pink"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-brand-pink animate-spin" />
                        <span>Corso selezionato: <strong>{selectedCourse}</strong></span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelectedCourse("")}
                        className="hover:text-white underline"
                      >
                        Rimuovi
                      </button>
                    </motion.div>
                  )}

                  {/* Name field */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-zinc-500" />
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      className={`w-full bg-white/3 border ${
                        errors.name ? "border-brand-pink" : "border-white/10"
                      } focus:border-brand-pink/60 rounded-xl px-4 py-3.5 text-sm text-white placeholder-zinc-600 focus:outline-none transition-all`}
                      placeholder="Serena Rossi"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    {errors.name && <p className="text-[10px] font-mono text-brand-pink mt-1">{errors.name}</p>}
                  </div>

                  {/* Email field */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-zinc-500" />
                      Email di Contatto
                    </label>
                    <input
                      type="email"
                      className={`w-full bg-white/3 border ${
                        errors.email ? "border-brand-pink" : "border-white/10"
                      } focus:border-brand-pink/60 rounded-xl px-4 py-3.5 text-sm text-white placeholder-zinc-600 focus:outline-none transition-all`}
                      placeholder="serena@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    {errors.email && <p className="text-[10px] font-mono text-brand-pink mt-1">{errors.email}</p>}
                  </div>

                  {/* Message field */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-zinc-500" />
                      Come Posso Aiutarti?
                    </label>
                    <textarea
                      rows={4}
                      className={`w-full bg-white/3 border ${
                        errors.message ? "border-brand-pink" : "border-white/10"
                      } focus:border-brand-pink/60 rounded-xl px-4 py-3.5 text-sm text-white placeholder-zinc-600 focus:outline-none transition-all resize-none`}
                      placeholder="Inserisci la tua richiesta dettagliata..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                    {errors.message && <p className="text-[10px] font-mono text-brand-pink mt-1">{errors.message}</p>}
                  </div>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-brand-pink to-brand-cyan text-white font-bold text-xs font-mono tracking-widest hover:shadow-[0_10px_30px_rgba(255,0,128,0.25)] transition-all duration-300 flex items-center justify-center gap-2.5"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {loading ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>INVIA MESSAGGIO IN VOLO</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </motion.button>
                </motion.form>
              ) : (
                <motion.div
                  key="success-screen"
                  className="flex flex-col items-center justify-center text-center py-12 space-y-6"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: 360 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="w-16 h-16 rounded-full bg-brand-pink/10 border border-brand-pink/30 flex items-center justify-center"
                  >
                    <CheckCircle className="w-8 h-8 text-brand-pink" />
                  </motion.div>

                  <div className="space-y-2">
                    <h4 className="font-serif text-2xl font-bold text-white">Il Messaggio è Volato in Alto!</h4>
                    <p className="font-sans text-sm text-zinc-400 font-light max-w-sm leading-relaxed mx-auto">
                      Grazie, <strong>{formData.name}</strong>. Ho ricevuto le tue informazioni. Analizzerò le tue esigenze aeree e ti ricontatterò personalmente all'indirizzo <strong>{formData.email}</strong> entro 24 ore.
                    </p>
                  </div>

                  <motion.button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", message: "" });
                      setSelectedCourse("");
                    }}
                    className="px-6 py-2.5 rounded-full border border-white/10 text-[10px] font-mono tracking-widest text-zinc-400 hover:text-white hover:border-brand-pink/40 transition-all"
                    whileHover={{ scale: 1.05 }}
                  >
                    INVIA UN ALTRO MESSAGGIO
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
