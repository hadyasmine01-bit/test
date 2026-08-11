"use client";

import { motion, Variants } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Image from "next/image";

import SlideToUnlock from "./SlideToUnlock";

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

  // Ultra-fluid, subtle floating animation for the centered logo
  const fluidLogoVariants: Variants = {
    animate: {
      y: [0, -4, 0, 4, 0],
      scale: [1, 1.015, 1, 0.99, 1],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut" as const,
      }
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-blue">
      {/* Background Image with Parallax & Optimization */}
      <motion.div
        animate={{ scale: [1.03, 1.08, 1.03], x: [0, -4, 0], y: [0, 3, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" as const }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/assets/bachground.png"
          alt="Control and Study Background"
          fill
          priority
          className="object-cover object-center pointer-events-none"
          sizes="100vw"
        />
      </motion.div>
      <div className="absolute inset-0 z-[1] bg-black/15 bg-gradient-to-t from-brand-blue/40 via-transparent to-brand-blue/20" />

      {/* Main Central Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-10 max-w-5xl mx-auto px-6 md:px-12 text-center pb-12 pt-20">
        
        {/* Animated Central White Circle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-[330px] lg:h-[330px] rounded-full bg-white flex items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.18)] border border-white/60 overflow-hidden"
        >
          {/* Subtle Inner Glow */}
          <div className="absolute inset-0 rounded-full bg-radial from-white via-white/90 to-transparent pointer-events-none z-[1]" />
          
          {/* Centered Logo Canvas */}
          <div className="relative w-[85%] h-[85%] flex items-center justify-center z-[2]">
            
            {/* Centered Logo with Ultra-Fluid Micro-Movement & Optical Offset */}
            <motion.div
              variants={fluidLogoVariants}
              animate="animate"
              className="relative w-full h-full flex items-center justify-center -translate-y-2.5 sm:-translate-y-3 md:-translate-y-4"
            >
              <div className="relative w-[92%] h-[92%]">
                <Image
                  src="/assets/yasmin-trimmed.png"
                  alt="Control and Study Logo"
                  fill
                  className="object-contain pointer-events-none"
                  priority
                />
              </div>
            </motion.div>

          </div>
        </motion.div>

        {/* iPhone Slide to Unlock CTA Swiper Widget */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto"
        >
          <SlideToUnlock onSuccess={scrollToContact} label="slide to save progress" />

          <motion.button
            onClick={scrollToAbout}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold tracking-wide border border-white/25 transition-all duration-300 backdrop-blur-md cursor-pointer text-xs font-lemon-milk uppercase shadow-[0_4px_15px_rgba(0,0,0,0.1)]"
          >
            Explore CTRL S
          </motion.button>
        </motion.div>
      </div>

      {/* Floating Bottom Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 2, delay: 1.5 }}
        onClick={scrollToAbout}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 cursor-pointer"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-medium">
          Scroll Down
        </span>
        <ArrowDown className="w-4 h-4 text-brand-orange" />
      </motion.div>

      {/* Signature Capital 'S' Curve Section Divider */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 z-[6] pointer-events-none overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 180"
          className="relative block w-full h-20 sm:h-28 md:h-36 lg:h-44"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="s-curve-accent" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#C46340" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#C46340" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          {/* Subtle glowing accent tracing the signature S-curve */}
          <path
            d="M 0,35 C 380,185 340,-15 720,90 C 1100,195 1060,5 1440,145"
            fill="none"
            stroke="url(#s-curve-accent)"
            strokeWidth="3.5"
            className="opacity-80"
          />
          {/* S-shaped divider fill blending smoothly into About section background (#FAFAFA) */}
          <path
            d="M 0,35 C 380,185 340,-15 720,90 C 1100,195 1060,5 1440,145 L 1440,180 L 0,180 Z"
            fill="#FAFAFA"
          />
        </svg>
      </div>
    </section>
  );
}