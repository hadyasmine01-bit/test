"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, Maximize2, Minimize2, Eye, Compass, RotateCcw, Sparkles } from "lucide-react";
import SlideToUnlock from "./SlideToUnlock";

export default function Hero() {
  const [isEntered, setIsEntered] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

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
        behavior: "smooth",
      });
    }
  };

  const handleEnterSpinview = () => {
    setIsEntered(true);
  };

  const handleExitSpinview = () => {
    setIsEntered(false);
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const toggleFullscreen = () => {
    if (!heroRef.current) return;

    if (!document.fullscreenElement) {
      heroRef.current.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(() => {
        setIsFullscreen(true);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      }).catch(() => {
        setIsFullscreen(false);
      });
    }
  };

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#0a0e17]"
    >
      {/* Background Decorative Circles & Ambient Orbs (Kept safely under the zigzag divider) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-24 -left-24 w-[450px] h-[450px] rounded-full bg-brand-orange/15 blur-[120px]" />
        <div className="absolute top-1/3 -right-24 w-[500px] h-[500px] rounded-full bg-brand-blue/20 blur-[140px]" />
        <div className="absolute bottom-20 left-1/4 w-[380px] h-[380px] rounded-full bg-brand-orange/10 blur-[100px]" />
      </div>

      {/* SPINVIEW 360 Virtual Tour Embed */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-black">
        {/* Loading skeleton placeholder */}
        {!isIframeLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a0e17] z-0 text-white gap-3">
            <div className="w-10 h-10 border-3 border-brand-orange/30 border-t-brand-orange rounded-full animate-spin" />
            <span className="text-xs font-bold uppercase tracking-widest font-lemon-milk opacity-80">
              Chargement de l'Espace 360°...
            </span>
          </div>
        )}

        <iframe
          src="https://spinview360.com/ctrls/"
          title="Control and Study 360 Virtual Tour"
          className="w-full h-full border-0 absolute inset-0"
          allow="accelerometer; gyroscope; magnetometer; fullscreen; vr; xr-spatial-tracking; web-share"
          allowFullScreen
          onLoad={() => setIsIframeLoaded(true)}
          style={{
            pointerEvents: isEntered ? "auto" : "none",
          }}
        />
      </div>

      {/* Default Dark Overlay and Slide to Explore Button (Visible before entering) */}
      <AnimatePresence>
        {!isEntered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="absolute inset-0 z-10 flex flex-col items-center justify-between pb-24 pt-28 px-6 bg-gradient-to-b from-black/75 via-black/45 to-black/85 pointer-events-auto"
          >
            {/* Top Subtitle Badge */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-xl text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] font-lemon-milk"
            >
              <Compass className="w-4 h-4 text-brand-orange animate-spin" style={{ animationDuration: "8s" }} />
              <span>360° Virtual Experience</span>
            </motion.div>

            {/* Central Callout & Slide Button */}
            <div className="flex flex-col items-center gap-6 text-center max-w-2xl mx-auto my-auto py-8">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="space-y-4"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/20 border border-brand-orange/40 text-brand-orange text-[10px] sm:text-xs font-bold uppercase tracking-widest font-lemon-milk mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Espace d'étude & Coworking Monastir
                </div>

                <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-wider text-white font-lemon-milk drop-shadow-[0_4px_25px_rgba(0,0,0,0.8)]">
                  CONTROL & STUDY
                </h1>
                
                <p className="text-xs sm:text-sm md:text-base text-white/90 font-light max-w-lg mx-auto tracking-wide drop-shadow-lg leading-relaxed">
                  Explorez nos espaces de révision, salles silencieuses et zones collaboratives en immersion 360°.
                </p>
              </motion.div>

              {/* Single Slide Button to Explore CTRL S */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.45 }}
                className="pt-2"
              >
                <SlideToUnlock
                  onSuccess={handleEnterSpinview}
                  label="slide to explore CTRL S"
                />
              </motion.div>
            </div>

            {/* Floating Bottom Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2.2, delay: 1 }}
              onClick={scrollToAbout}
              className="flex flex-col items-center gap-2 cursor-pointer group mb-2"
            >
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/80 font-medium group-hover:text-brand-orange transition-colors font-lemon-milk">
                Découvrir l'Espace
              </span>
              <ArrowDown className="w-4 h-4 text-brand-orange group-hover:translate-y-1 transition-transform" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Active 360 Spinview HUD (Visible once entered) */}
      <AnimatePresence>
        {isEntered && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="absolute top-24 inset-x-0 z-30 px-4 sm:px-8 pointer-events-none flex justify-between items-start"
          >
            {/* Active Tour Badge */}
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white text-xs font-lemon-milk uppercase tracking-wider shadow-lg pointer-events-auto">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <Eye className="w-3.5 h-3.5 text-brand-orange" />
              <span className="hidden sm:inline">Spinview 360° Live</span>
              <span className="sm:hidden">360° Live</span>
            </div>

            {/* Floating Controls */}
            <div className="flex items-center gap-2.5 pointer-events-auto">
              <button
                onClick={toggleFullscreen}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 hover:bg-black/90 backdrop-blur-md border border-white/20 text-white text-xs font-lemon-milk uppercase tracking-wider transition-all cursor-pointer shadow-lg hover:border-brand-orange"
                title="Toggle Fullscreen"
              >
                {isFullscreen ? (
                  <>
                    <Minimize2 className="w-3.5 h-3.5 text-brand-orange" />
                    <span className="hidden md:inline">Quitter Plein Écran</span>
                  </>
                ) : (
                  <>
                    <Maximize2 className="w-3.5 h-3.5 text-brand-orange" />
                    <span className="hidden md:inline">Plein Écran</span>
                  </>
                )}
              </button>

              <button
                onClick={handleExitSpinview}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 hover:bg-black/90 backdrop-blur-md border border-white/20 text-white text-xs font-lemon-milk uppercase tracking-wider transition-all cursor-pointer shadow-lg hover:border-brand-orange"
                title="Quitter 360"
              >
                <RotateCcw className="w-3.5 h-3.5 text-brand-orange" />
                <span className="hidden md:inline">Quitter 360</span>
              </button>

              <button
                onClick={scrollToAbout}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-orange hover:bg-brand-orange/90 text-white text-xs font-lemon-milk uppercase tracking-wider transition-all cursor-pointer shadow-lg"
              >
                <span>Explorer le Site</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Precise Zigzag Transition Divider (Positioned cleanly on top with z-20 above all background circles) */}
      <div
        aria-hidden="true"
        className={`absolute inset-x-0 bottom-0 z-20 pointer-events-none overflow-hidden leading-none transition-opacity duration-500 ${
          isEntered ? "opacity-30 hover:opacity-100" : "opacity-100"
        }`}
      >
        <svg
          viewBox="0 0 1440 120"
          className="relative block w-full h-14 sm:h-20 md:h-24 lg:h-28"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Luminous accent gradient for the zigzag line */}
            <linearGradient id="zigzag-accent-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#C46340" stopOpacity="0.9" />
              <stop offset="25%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="50%" stopColor="#5D78A3" stopOpacity="0.9" />
              <stop offset="75%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="100%" stopColor="#C46340" stopOpacity="0.9" />
            </linearGradient>

            {/* Subtle glow filter */}
            <filter id="zigzag-glow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#C46340" floodOpacity="0.35" />
            </filter>
          </defs>

          {/* Crisp, precise Zigzag / Geometric S-Wave Stroke */}
          <path
            d="M 0,38 C 80,5 160,5 240,38 S 400,71 480,38 S 640,5 720,38 S 880,71 960,38 S 1120,5 1200,38 S 1360,71 1440,38"
            fill="none"
            stroke="url(#zigzag-accent-gradient)"
            strokeWidth="3.5"
            strokeLinejoin="round"
            strokeLinecap="round"
            filter="url(#zigzag-glow)"
            className="opacity-90"
          />

          {/* Solid Base Fill transitioning smoothly into next section (#FAFAFA) */}
          <path
            d="M 0,38 C 80,5 160,5 240,38 S 400,71 480,38 S 640,5 720,38 S 880,71 960,38 S 1120,5 1200,38 S 1360,71 1440,38 L 1440,120 L 0,120 Z"
            fill="#FAFAFA"
          />
        </svg>
      </div>
    </section>
  );
}
