"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Clock, Code2, Coffee, Laptop, Printer, Sparkles, Grid, Eye } from "lucide-react";
import Image from "next/image";

const services = [
  { 
    id: "outdoor",
    icon: Laptop, 
    title: "Outdoor Zone", 
    image: "/assets/outdoor.png", 
    desc: "A refreshing open-air space for breaks, brainstorming, and recharging between focused sessions.", 
    highlight: "Hot desks & workstations" 
  },
  { 
    id: "indoor",
    icon: Laptop, 
    title: "Indoor Zone", 
    image: "/assets/indoor.png", 
    desc: "A calm, spacious interior with cozy corners and shared seating for deep work or peaceful collaboration.", 
    highlight: "Focus-ready seating" 
  },
  { 
    id: "lab",
    icon: Code2, 
    title: "The Lab", 
    image: "/assets/lab.png", 
    desc: "A silent and cozy room made for comfort, focus, and peace when you need to truly lock in.", 
    highlight: "Comfort & silence" 
  },
  { 
    id: "247",
    icon: Clock, 
    title: "24/7 Access", 
    image: "/assets/247.png", 
    desc: "Work or study on your own terms with secure smart access, day or night.", 
    highlight: "Keyless digital access" 
  },
  { 
    id: "cafe",
    icon: Coffee, 
    title: "Specialty Coffee", 
    image: "/assets/cafe.png", 
    desc: "Refuel in our modern espresso bar with premium roasted beans and comfort beverages.", 
    highlight: "Coffee, served daily" 
  },
  { 
    id: "print",
    icon: Printer, 
    title: "Professional Printing", 
    image: "/assets/print.png", 
    desc: "High-speed printing, copying, and document services integrated into your workday.", 
    highlight: "Colour & high-volume printing" 
  },
];

export default function Services() {
  const [activeTile, setActiveTile] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"puzzle" | "cards">("puzzle");

  return (
    <section id="services" className="relative overflow-hidden bg-[#FAFAFA] py-24 md:py-32">
      {/* Background Gradients */}
      <div className="pointer-events-none absolute left-[10%] top-20 h-72 w-72 rounded-full bg-brand-orange/5 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-20 right-[10%] h-80 w-80 rounded-full bg-brand-blue/5 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 md:mb-16 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left"
          >
            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.3em] text-brand-orange font-lemon-milk">
              Our Ecosystem
            </span>
            <h2 className="text-3xl font-semibold uppercase tracking-tight text-brand-blue md:text-5xl font-lemon-milk">
              Tailored for Progress
            </h2>
          </motion.div>

          {/* Creative Toggle: Seamless Puzzle vs Interactive Cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-1.5 p-1.5 rounded-full bg-white border border-brand-blue/20 shadow-sm"
          >
            <button
              onClick={() => setViewMode("puzzle")}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer font-lemon-milk ${
                viewMode === "puzzle"
                  ? "bg-brand-orange text-white shadow-sm"
                  : "text-brand-blue hover:text-brand-orange"
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              Puzzle Grid
            </button>
            <button
              onClick={() => setViewMode("cards")}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer font-lemon-milk ${
                viewMode === "cards"
                  ? "bg-brand-orange text-white shadow-sm"
                  : "text-brand-blue hover:text-brand-orange"
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              Cards View
            </button>
          </motion.div>
        </div>

        {/* 3x2 Puzzle Grid Display */}
        <motion.div layout className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ${viewMode === "puzzle" ? "gap-2.5 md:gap-3.5" : "gap-6 md:gap-8"}`}>
          {services.map((service, index) => {
            const Icon = service.icon;
            const isHovered = activeTile === service.id;

            return (
              <motion.article
                key={service.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                onMouseEnter={() => setActiveTile(service.id)}
                onMouseLeave={() => setActiveTile(null)}
                onClick={() => setActiveTile(activeTile === service.id ? null : service.id)}
                className={`group relative aspect-square w-full overflow-hidden rounded-2xl border transition-all duration-500 cursor-pointer shadow-sm ${
                  viewMode === "puzzle"
                    ? "border-brand-blue/15 hover:border-brand-orange/60 hover:shadow-xl hover:z-20"
                    : "border-brand-blue/20 bg-white hover:shadow-2xl hover:-translate-y-1.5"
                }`}
              >
                {/* 100% Complete 1:1 Square Image - Zero Cropping on Sides */}
                <div className="relative w-full h-full bg-[#f4f5f7]">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    priority={index < 3}
                    className="object-cover object-center w-full h-full transition-transform duration-700 group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>

                {/* Default Bottom Title Bar (Visible when not hovered) */}
                <div className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-5 transition-opacity duration-300 ${
                  isHovered || viewMode === "cards" ? "opacity-0" : "opacity-100"
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold uppercase tracking-wider text-white font-lemon-milk drop-shadow">
                      {service.title}
                    </span>
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20 text-white backdrop-blur-md">
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>
                </div>

                {/* Interactive Glassmorphic Hover Overlay (Fully Crisp & Ultra-Legible) */}
                <AnimatePresence>
                  {(isHovered || viewMode === "cards") && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.25 }}
                      className="absolute inset-0 bg-[#5D78A3]/92 backdrop-blur-md p-6 sm:p-7 flex flex-col justify-between z-10 text-white"
                    >
                      {/* Top Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-orange text-white shadow-md">
                          <Icon className="h-6 w-6" />
                        </div>
                        <Sparkles className="h-5 w-5 text-brand-orange" />
                      </div>

                      {/* Content */}
                      <div className="my-auto">
                        <h3 className="text-xl font-bold uppercase tracking-wider text-white mb-2 font-lemon-milk">
                          {service.title}
                        </h3>
                        <p className="text-xs sm:text-sm leading-relaxed text-white/90 font-light">
                          {service.desc}
                        </p>
                      </div>

                      {/* Bottom Tag & Action */}
                      <div className="flex items-center justify-between border-t border-white/25 pt-3">
                        <span className="inline-block rounded-full bg-brand-orange px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                          {service.highlight}
                        </span>
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-brand-blue group-hover:bg-brand-orange group-hover:text-white transition-colors duration-300">
                          <ArrowUpRight className="h-4 w-4" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
