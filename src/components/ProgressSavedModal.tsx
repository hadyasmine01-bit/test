"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, CheckCircle2, X, Command } from "lucide-react";

export default function ProgressSavedModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Intercept Ctrl+S or Cmd+S
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        setIsOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const scrollToContact = () => {
    setIsOpen(false);
    const element = document.getElementById("contact");
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      window.scrollTo({ top: elementRect - bodyRect - offset, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Keyboard Shortcut Floating Helper Pill at bottom-left */}
      <div className="fixed bottom-6 left-6 z-40 hidden md:block">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/80 border border-brand-blue/20 text-brand-blue text-[10px] font-bold uppercase tracking-wider shadow-sm hover:border-brand-orange hover:text-brand-orange transition-all backdrop-blur-md cursor-pointer font-lemon-milk"
        >
          <Command className="w-3 h-3" />
          Press <kbd className="bg-brand-blue/10 px-1.5 py-0.5 rounded text-brand-blue">Ctrl + S</kbd> to save
        </button>
      </div>

      {/* Full-Screen Progress Saved Celebration Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-blue/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-md rounded-3xl bg-white border border-brand-blue/20 p-8 text-center shadow-2xl overflow-hidden"
            >
              {/* Decorative Animated Glow Circles */}
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-brand-orange/15 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-brand-blue/15 rounded-full blur-2xl pointer-events-none" />

              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-brand-blue/60 hover:text-brand-blue p-2 rounded-full transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-16 h-16 rounded-2xl bg-brand-orange/10 text-brand-orange mx-auto flex items-center justify-center mb-5 border border-brand-orange/20 shadow-inner">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-orange/10 text-brand-orange text-xs font-bold uppercase tracking-wider mb-3 font-lemon-milk">
                <Sparkles className="w-3.5 h-3.5" /> Keybinding Triggered
              </span>

              <h3 className="text-2xl font-bold uppercase tracking-wider text-brand-blue mb-3 font-lemon-milk">
                Progress Saved!
              </h3>

              <p className="text-sm text-brand-blue/80 font-light leading-relaxed mb-6">
                You just used <strong className="font-semibold text-brand-orange">CTRL + S</strong>. Your focus & productivity journey starts right here at Control and Study Monastir.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={scrollToContact}
                  className="w-full py-3.5 rounded-full bg-brand-orange text-white text-xs font-bold uppercase tracking-wider hover:bg-brand-orange/95 transition-all shadow-md font-lemon-milk cursor-pointer"
                >
                  Book Your Seat Now
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full py-3.5 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-bold uppercase tracking-wider hover:bg-brand-blue/20 transition-all font-lemon-milk cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
