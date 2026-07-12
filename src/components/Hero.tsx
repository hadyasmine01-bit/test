"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = contactSection.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = aboutSection.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#05070a]">
      {/* Background Image with Parallax & Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{ 
          backgroundImage: "url('/assets/hero-bg.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#07090E] via-[#07090E]/65 to-[#07090E]/40" />

      {/* Decorative Brand Color Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-brand-orange/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 translate-x-1/2 translate-y-1/2 w-[400px] h-[400px] bg-brand-blue/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center flex flex-col items-center">
        {/* Top Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
          <span className="text-xs uppercase tracking-[0.25em] text-slate-300 font-semibold">
            Luxury Coworking & Study Lounge
          </span>
        </motion.div>

        {/* Brand Name Title */}
        <h1 className="text-5xl md:text-8xl font-bold tracking-tight text-white mb-6 uppercase leading-tight font-sans">
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-slate-400 notranslate"
            translate="no"
          >
            Control and Study
          </motion.span>
        </h1>

        {/* Slogan */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.6 }}
          className="mb-8"
        >
          <p className="font-serif italic text-2xl md:text-4xl text-brand-orange tracking-wide notranslate" translate="no">
            &ldquo;Save Your Progress&rdquo;
          </p>
        </motion.div>

        {/* Short Premium Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-base md:text-lg text-slate-400 max-w-xl mx-auto mb-10 leading-relaxed font-light"
        >
          An elite workspace in Monastir meticulously designed for professionals, creators, and innovators. Elevate your efficiency and unlock your true potential.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <button
            onClick={scrollToContact}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-brand-orange text-white font-bold tracking-wide hover:bg-brand-orange/90 transition-all duration-300 hover:shadow-[0_0_20px_rgba(214,90,45,0.4)] cursor-pointer"
          >
            Contact Us
          </button>
          
          <button
            onClick={scrollToAbout}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 text-white font-semibold tracking-wide border border-white/10 transition-all duration-300 backdrop-blur-sm cursor-pointer"
          >
            Explore <span translate="no" className="notranslate">CTRL S</span>
          </button>
        </motion.div>
      </div>

      {/* Floating Bottom Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 2, delay: 1.5 }}
        onClick={scrollToAbout}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 cursor-pointer"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-medium">
          Scroll Down
        </span>
        <ArrowDown className="w-4 h-4 text-brand-orange" />
      </motion.div>
    </section>
  );
}
