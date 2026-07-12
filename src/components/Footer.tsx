"use client";

import Image from "next/image";
import { Send, MessageSquare, Phone } from "lucide-react";

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
    <footer className="bg-[#05070a] border-t border-dark-border/40 py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center">
        
        {/* Main Footer Brand Info */}
        <div className="flex flex-col items-center text-center gap-6 mb-12">
          {/* Logo & Name */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={scrollToTop}>
            <div className="relative w-12 h-12 overflow-hidden flex items-center justify-center">
              <Image
                src="/assets/logo.png"
                alt="Control and Study Logo"
                fill
                className="object-contain transition-transform duration-500 group-hover:scale-105"
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
          </div>

          {/* Slogan */}
          <p className="font-serif italic text-lg text-brand-blue tracking-wide">
            &ldquo;Save Your Progress&rdquo;
          </p>

          <p className="text-sm text-slate-500 max-w-md font-light leading-relaxed mt-2">
            A sanctuary of learning, development, and networking facing the Dental Faculty in Monastir. Empowering students and professionals alike.
          </p>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-6 mb-12">
          <a
            href="https://www.instagram.com/control.and.study/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full border border-dark-border/80 flex items-center justify-center text-slate-400 hover:text-brand-orange hover:border-brand-orange/50 hover:bg-brand-orange/5 transition-all duration-300"
            aria-label="Instagram"
          >
            <InstagramIcon className="w-5 h-5" />
          </a>
          <a
            href="https://wa.me/21692277771"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full border border-dark-border/80 flex items-center justify-center text-slate-400 hover:text-[#25D366] hover:border-[#25D366]/50 hover:bg-[#25D366]/5 transition-all duration-300"
            aria-label="WhatsApp"
          >
            <MessageSquare className="w-5 h-5" />
          </a>
          <a
            href="tel:+21670283230"
            className="w-10 h-10 rounded-full border border-dark-border/80 flex items-center justify-center text-slate-400 hover:text-brand-blue hover:border-brand-blue/50 hover:bg-brand-blue/5 transition-all duration-300"
            aria-label="Phone"
          >
            <Phone className="w-5 h-5" />
          </a>
          <a
            href="mailto:contact@controlandstudy.com"
            className="w-10 h-10 rounded-full border border-dark-border/80 flex items-center justify-center text-slate-400 hover:text-brand-orange hover:border-brand-orange/50 hover:bg-brand-orange/5 transition-all duration-300"
            aria-label="Email"
          >
            <Send className="w-5 h-5" />
          </a>
        </div>

        {/* Separator line */}
        <div className="w-full max-w-4xl h-[1px] bg-dark-border/50 mb-8" />

        {/* Bottom copyright and meta links */}
        <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-4xl gap-4 text-xs text-slate-600 font-light">
          <p>© {currentYear} Control and Study. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#about" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <a href="#about" className="hover:text-slate-400 transition-colors">Terms of Service</a>
            <button onClick={scrollToTop} className="hover:text-slate-400 transition-colors cursor-pointer">Back to Top ↑</button>
          </div>
        </div>

      </div>
    </footer>
  );
}
