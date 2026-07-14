"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Amenities", href: "#amenities" },
  { name: "Services", href: "#services" },
  { name: "Gallery", href: "#gallery" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerTextColor = scrolled ? "text-brand-blue" : "text-brand-orange";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // navbar height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
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
            ? "bg-[#FAFAFA]/90 backdrop-blur-md border-b border-brand-blue/20 py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo & Brand Name */}
          <button 
            onClick={() => scrollToSection("home")}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative w-10 h-10 overflow-hidden flex items-center justify-center">
              <Image
                src="/assets/logo-2-colors-transparent.png"
                alt="Control and Study Logo"
                fill
                className="object-contain transition-transform duration-500 group-hover:scale-105"
                priority
              />
            </div>
            <div className="flex flex-col items-start leading-none notranslate" translate="no">
              <span className={`text-lg font-bold tracking-widest uppercase font-sans ${headerTextColor}`}>
                CONTROL & STUDY
              </span>
              <span className={`text-[10px] tracking-[0.25em] font-medium mt-0.5 ${scrolled ? "text-brand-orange" : "text-brand-orange/80"}`}>
                CTRL S
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href.substring(1))}
                className={`text-sm font-medium hover:text-brand-orange transition-colors duration-300 relative py-2 group cursor-pointer ${scrolled ? "text-brand-blue/80" : "text-brand-orange"}`}
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-orange transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          {/* Contact Button */}
          <div className="hidden md:block">
            <button
              onClick={() => scrollToSection("contact")}
              className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-transparent border border-brand-orange hover:bg-brand-orange hover:text-white text-sm font-semibold transition-all duration-500 hover:shadow-[0_0_15px_rgba(196,99,64,0.3)] group cursor-pointer ${headerTextColor}`}
            >
              Contact Us
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`${headerTextColor} hover:text-brand-orange transition-colors duration-300 focus:outline-none`}
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
            className="fixed inset-0 top-[72px] z-40 bg-[#FAFAFA] border-t border-brand-blue/20 md:hidden flex flex-col justify-between px-6 py-12"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link, idx) => (
                <motion.button
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => scrollToSection(link.href.substring(1))}
                  className="text-left text-2xl font-semibold text-brand-blue hover:text-brand-orange transition-colors duration-300 border-b border-brand-blue/20 pb-4"
                >
                  {link.name}
                </motion.button>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col gap-6"
            >
              <button
                onClick={() => scrollToSection("contact")}
                className="w-full py-4 rounded-full bg-brand-orange text-white text-center font-bold hover:bg-brand-orange/95 transition-all duration-300"
              >
                Contact Us
              </button>
              <div className="text-center text-xs text-brand-blue/60">
                © {new Date().getFullYear()} <span translate="no" className="notranslate">Control and Study</span>. All rights reserved.
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
