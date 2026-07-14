"use client";

import Image from "next/image";
import { Send, MessageSquare, Phone } from "lucide-react";
import { motion } from "framer-motion";

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <footer className="relative overflow-hidden bg-brand-blue border-t border-brand-blue/40 py-16">
      <div className="pointer-events-none absolute -left-20 top-0 h-60 w-60 rounded-full border border-white/10 animate-drift" />
      <div className="pointer-events-none absolute -bottom-28 right-8 h-80 w-80 rounded-full bg-brand-orange/10 blur-[100px] animate-float" />
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center">
        
        {/* Main Footer Brand Info */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }} className="flex flex-col items-center text-center gap-6 mb-12">
          {/* Logo & Name */}
          <button type="button" className="flex items-center gap-3 cursor-pointer group" onClick={scrollToTop} aria-label="Back to top">
            <div className="relative h-16 w-[154px] overflow-hidden rounded-xl bg-[#FAFAFA] px-2 py-1 shadow-[0_8px_24px_rgba(0,0,0,0.18)] transition-transform duration-500 group-hover:scale-105">
              <Image
                src="/assets/logo-2-colors-trim.png"
                alt="Control and Study Logo"
                fill
                className="object-contain p-1"
              />
            </div>
            <div className="flex flex-col items-start leading-none text-left">
              <span className="text-xl font-bold tracking-widest text-white uppercase font-sans">
                CONTROL & STUDY
              </span>
              <span className="text-xs tracking-[0.25em] text-brand-orange font-semibold mt-1">
                CTRL S
              </span>
            </div>
          </button>

          {/* Slogan */}
          <p className="font-serif italic text-lg text-white tracking-wide">
            &ldquo;Save Your Progress&rdquo;
          </p>

          <p className="text-sm text-[#FAFAFA]/80 max-w-md font-light leading-relaxed mt-2">
            A sanctuary of learning, development, and networking facing the Dental Faculty in Monastir. Empowering students and professionals alike.
          </p>
        </motion.div>

        {/* Social Links */}
        <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.12 }} className="flex items-center gap-6 mb-12">
          <a
            href="https://www.instagram.com/control.and.study/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full border border-[#FAFAFA]/50 flex items-center justify-center text-[#FAFAFA]/80 hover:text-brand-orange hover:border-brand-orange/50 hover:bg-brand-orange/5 transition-all duration-300"
            aria-label="Instagram"
          >
            <InstagramIcon className="w-5 h-5" />
          </a>
          <a
            href="https://wa.me/21692277771"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full border border-[#FAFAFA]/50 flex items-center justify-center text-[#FAFAFA]/80 hover:text-brand-orange hover:border-brand-orange/50 hover:bg-brand-orange/5 transition-all duration-300"
            aria-label="WhatsApp"
          >
            <MessageSquare className="w-5 h-5" />
          </a>
          <a
            href="tel:+21670283230"
            className="w-10 h-10 rounded-full border border-[#FAFAFA]/50 flex items-center justify-center text-[#FAFAFA]/80 hover:text-brand-orange hover:border-brand-orange/50 hover:bg-brand-orange/5 transition-all duration-300"
            aria-label="Phone"
          >
            <Phone className="w-5 h-5" />
          </a>
          <a
            href="mailto:contact@controlandstudy.com"
            className="w-10 h-10 rounded-full border border-[#FAFAFA]/50 flex items-center justify-center text-[#FAFAFA]/80 hover:text-brand-orange hover:border-brand-orange/50 hover:bg-brand-orange/5 transition-all duration-300"
            aria-label="Email"
          >
            <Send className="w-5 h-5" />
          </a>
        </motion.div>

        {/* Separator line */}
        <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="w-full max-w-4xl h-[1px] origin-center bg-white/25 mb-8" />

        {/* Bottom copyright and meta links */}
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.18 }} className="flex flex-col md:flex-row items-center justify-between w-full max-w-4xl gap-4 text-xs text-[#FAFAFA]/70 font-light">
          <p>© {currentYear} Control and Study. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#about" className="hover:text-brand-orange transition-colors">Privacy Policy</a>
            <a href="#about" className="hover:text-brand-orange transition-colors">Terms of Service</a>
            <button onClick={scrollToTop} className="hover:text-brand-orange transition-colors cursor-pointer">Back to Top ↑</button>
          </div>
        </motion.div>

      </div>
    </footer>
  );
}
