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

  const titleWords = ["Control", "and", "Study"];
  const particles = [
    { left: "12%", top: "22%", size: 7, delay: 0 },
    { left: "84%", top: "19%", size: 5, delay: 0.8 },
    { left: "76%", top: "74%", size: 8, delay: 1.6 },
    { left: "20%", top: "76%", size: 4, delay: 2.3 },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-blue">
      {/* Background Image with Parallax & Overlay */}
      <motion.div
        animate={{ scale: [1.05, 1.12, 1.05], x: [0, -8, 0], y: [0, 6, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('/assets/hero-bg.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-blue via-brand-blue/65 to-brand-blue/40" />

      {/* Animated home atmosphere */}
      <motion.div aria-hidden="true" animate={{ rotate: 360 }} transition={{ duration: 36, repeat: Infinity, ease: "linear" }} className="pointer-events-none absolute -right-24 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full border border-white/15" />
      <motion.div aria-hidden="true" animate={{ rotate: -360 }} transition={{ duration: 28, repeat: Infinity, ease: "linear" }} className="pointer-events-none absolute -left-28 top-[18%] h-[310px] w-[310px] rounded-full border border-brand-orange/35 border-dashed" />
      {particles.map((particle) => (
        <motion.span
          key={`${particle.left}-${particle.top}`}
          aria-hidden="true"
          className="pointer-events-none absolute rounded-full bg-brand-orange shadow-[0_0_18px_rgba(196,99,64,0.9)]"
          style={{ left: particle.left, top: particle.top, width: particle.size, height: particle.size }}
          animate={{ y: [0, -18, 0], opacity: [0.25, 1, 0.25], scale: [0.8, 1.35, 0.8] }}
          transition={{ duration: 4.5, delay: particle.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Decorative Brand Color Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-brand-orange/10 rounded-full blur-[100px] pointer-events-none animate-drift" />
      <div className="absolute bottom-1/3 right-1/4 translate-x-1/2 translate-y-1/2 w-[400px] h-[400px] bg-brand-blue/15 rounded-full blur-[120px] pointer-events-none animate-float" />

      {/* Content - z-20 pour passer devant le dégradé */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 md:px-12 text-center flex flex-col items-center pb-24">
        {/* Top Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
          <span className="text-xs uppercase tracking-[0.25em] text-[#FAFAFA]/80 font-semibold">
            Luxury Coworking & Study Lounge
          </span>
        </motion.div>

        {/* Brand Name Title - Each word on a new line */}
        <h1 className="text-5xl md:text-8xl font-bold tracking-tight text-white mb-6 uppercase leading-tight font-sans">
          {titleWords.map((word, index) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 1, 
                ease: [0.16, 1, 0.3, 1],
                delay: 0.3 + index * 0.15 
              }}
              className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FAFAFA] via-[#FAFAFA] to-[#FAFAFA]/70 notranslate"
              translate="no"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Slogan - League Spartan font */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.9 }}
          className="mb-8"
        >
          <p 
            className="text-shimmer text-2xl md:text-4xl text-brand-orange tracking-wide notranslate uppercase"
            translate="no"
            style={{ fontFamily: "'League Spartan', sans-serif", fontWeight: 700 }}
          >
            &ldquo;Save Your Progress&rdquo;
          </p>
        </motion.div>

        {/* Short Premium Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="text-base md:text-lg text-[#FAFAFA]/80 max-w-xl mx-auto mb-10 leading-relaxed font-light"
        >
          An inspiring study space created for ambitious students. Experience a quiet, comfortable environment designed to boost concentration, encourage collaboration, and help you perform at your best.
        </motion.p>

        {/* CTA Buttons - z-30 pour être au-dessus de tout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="relative z-30 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <motion.button
            onClick={scrollToContact}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.97 }}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-brand-orange text-white font-bold tracking-wide hover:bg-brand-orange/90 transition-all duration-300 hover:shadow-[0_0_20px_rgba(196,99,64,0.4)] cursor-pointer"
          >
            Contact Us
          </motion.button>
          
          <motion.button
            onClick={scrollToAbout}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.97 }}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 text-white font-semibold tracking-wide border border-white/10 transition-all duration-300 backdrop-blur-sm cursor-pointer"
          >
            Explore <span translate="no" className="notranslate">CTRL S</span>
          </motion.button>
        </motion.div>
      </div>

      {/* Floating Bottom Scroll Indicator - z-30 aussi */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 2, delay: 1.5 }}
        onClick={scrollToAbout}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 cursor-pointer"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-brand-blue/75 font-medium">
          Scroll Down
        </span>
        <ArrowDown className="w-4 h-4 text-brand-orange" />
      </motion.div>

      {/* Fade gradient - z-15 pour rester sous les boutons */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 z-[15] h-40 bg-gradient-to-b from-transparent via-[#FAFAFA]/45 to-[#FAFAFA] md:h-56" />
    </section>
  );
}