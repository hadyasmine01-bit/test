"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Pricing", href: "#pricing" },
  { name: "Services", href: "#services" },
  { name: "Gallery", href: "#gallery" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      window.scrollTo({ top: elementRect - bodyRect - offset, behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-sm border-b border-gray-200 py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Logo */}
          <button onClick={() => scrollToSection("home")} className="flex items-center cursor-pointer group shrink-0">
            {!scrolled ? (
              <div className="relative h-10 w-48 shrink-0">
                <Image
                  src="/assets/study-lab.png"
                  alt="Study Lab"
                  fill
                  className="object-contain object-left transition-transform duration-300 group-hover:scale-105"
                  priority
                  sizes="200px"
                />
              </div>
            ) : (
              <div className="relative h-11 w-11 shrink-0">
                <Image
                  src="/assets/logo-2-colors-transparent.png"
                  alt="Control & Study Logo"
                  fill
                  className="object-contain transition-transform duration-300 group-hover:scale-105"
                  priority
                />
              </div>
            )}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 shrink-0">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href.substring(1))}
                className={`text-sm font-medium uppercase tracking-wide whitespace-nowrap transition-colors duration-300 relative py-2 group cursor-pointer font-lemon-milk shrink-0 ${
                  scrolled ? "text-brand-blue hover:text-brand-orange" : "text-brand-orange hover:text-white"
                }`}
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-orange transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          {/* Contact Button */}
          <div className="hidden md:block shrink-0">
            <button
              onClick={() => scrollToSection("contact")}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-semibold uppercase tracking-wide whitespace-nowrap transition-all duration-500 hover:shadow-[0_0_15px_rgba(196,99,64,0.3)] group cursor-pointer font-lemon-milk shrink-0 ${
                scrolled
                  ? "border-brand-orange text-brand-blue hover:bg-brand-orange hover:text-white"
                  : "border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white"
              }`}
            >
              Contact Us
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden shrink-0">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`transition-colors duration-300 focus:outline-none ${
                scrolled ? "text-brand-blue" : "text-brand-orange"
              }`}
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-[72px] z-40 bg-white border-t border-gray-200 md:hidden flex flex-col justify-between px-6 py-12"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link, idx) => (
                <motion.button
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => scrollToSection(link.href.substring(1))}
                  className="text-left text-xl font-semibold text-brand-blue hover:text-brand-orange transition-colors duration-300 border-b border-gray-200 pb-4 font-lemon-milk uppercase tracking-wide"
                >
                  {link.name}
                </motion.button>
              ))}
            </div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex flex-col gap-6">
              <button 
                onClick={() => scrollToSection("contact")} 
                className="w-full py-4 rounded-full bg-brand-orange text-white text-center font-bold hover:bg-brand-orange/95 transition-all duration-300 font-lemon-milk uppercase tracking-wide"
              >
                Contact Us
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}