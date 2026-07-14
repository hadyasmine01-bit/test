"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock, Code2, Coffee, Laptop, Printer, Sparkles } from "lucide-react";

const services = [
  { icon: Laptop, title: "Outdoor Zone", image: "/assets/outdoor.png", desc: "A refreshing open-air space for breaks, brainstorming, and recharging between focused sessions.", highlight: "Hot desks & workstations" },
  { icon: Laptop, title: "Indoor Zone", image: "/assets/indoor.png", desc: "A calm, spacious interior with cozy corners and shared seating for deep work or peaceful collaboration.", highlight: "Focus-ready seating" },
  { icon: Code2, title: "The Lab", image: "/assets/lab.png", desc: "A silent and cozy room made for comfort, focus, and peace when you need to truly lock in.", highlight: "Comfort & silence" },
  { icon: Clock, title: "24/7 Access", image: "/assets/247.png", desc: "Work or study on your own terms with secure smart access, day or night.", highlight: "Keyless digital access" },
  { icon: Coffee, title: "Specialty Coffee", image: "/assets/cafe.png", desc: "Refuel in our modern espresso bar with premium roasted beans and comfort beverages.", highlight: "Coffee, served daily" },
  { icon: Printer, title: "Professional Printing", image: "/assets/print.png", desc: "High-speed printing, copying, and document services integrated into your workday.", highlight: "Colour & high-volume printing" },
];

export default function Services() {
  return (
    <section id="services" className="brand-grid relative overflow-hidden bg-[#FAFAFA] py-24 md:py-32">
      <div className="pointer-events-none absolute left-[8%] top-28 h-64 w-64 rounded-full bg-brand-orange/10 blur-[100px] animate-drift" />
      <div className="pointer-events-none absolute bottom-20 right-[8%] h-80 w-80 rounded-full bg-brand-blue/10 blur-[120px] animate-float" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-12">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mx-auto mb-16 max-w-2xl text-center md:mb-24">
          <span className="mb-4 block text-xs font-bold uppercase tracking-[0.3em] text-brand-orange">Our Services</span>
          <h2 className="mb-6 text-3xl font-semibold uppercase tracking-tight text-brand-blue md:text-5xl">Tailored for Progress</h2>
          <motion.div whileInView={{ scaleX: [0, 1] }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.15 }} className="mx-auto h-1 w-20 origin-center rounded-full bg-brand-orange" />
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 36, rotateX: -6 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                whileHover={{ y: -10, scale: 1.015 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: index * 0.07, ease: "easeOut" }}
                className="group relative isolate flex min-h-[390px] flex-col justify-end overflow-hidden rounded-3xl border border-white/70 p-7 shadow-[0_16px_38px_rgba(93,120,163,0.18)] transition-shadow duration-500 hover:shadow-[0_24px_55px_rgba(93,120,163,0.32)] md:p-8"
              >
                <motion.div
                  aria-hidden="true"
                  className="absolute inset-0 -z-20 bg-cover bg-center brightness-110 saturate-[1.15]"
                  style={{ backgroundImage: `url("${service.image}")` }}
                  animate={{ scale: [1.04, 1.1, 1.04] }}
                  transition={{ duration: 12 + index, repeat: Infinity, ease: "easeInOut" }}
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#17355c]/90 via-[#254b78]/42 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#17355c]/35 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full border border-white/25 opacity-70 animate-float" />
                <div className="absolute left-0 top-0 h-1 w-full origin-left bg-gradient-to-r from-brand-orange via-white to-brand-orange scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />

                <div className="mb-auto flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/40 bg-white/20 text-white shadow-lg backdrop-blur-md transition-all duration-500 group-hover:rotate-6 group-hover:bg-brand-orange group-hover:shadow-[0_0_22px_rgba(196,99,64,0.55)]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <Sparkles className="h-5 w-5 text-brand-orange opacity-0 transition-all duration-500 group-hover:rotate-12 group-hover:opacity-100" />
                </div>

                <div className="relative">
                  <h3 className="mb-3 text-xl font-bold uppercase tracking-wider text-white drop-shadow-sm">{service.title}</h3>
                  <p className="mb-6 max-w-md text-sm leading-relaxed text-white/95 drop-shadow-sm">{service.desc}</p>
                  <div className="flex items-center justify-between border-t border-white/35 pt-4">
                    <span className="text-xs font-bold uppercase tracking-[0.14em] text-white">{service.highlight}</span>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/45 bg-white/10 text-white transition-all duration-300 group-hover:translate-x-1 group-hover:bg-brand-orange group-hover:border-brand-orange"><ArrowRight className="h-4 w-4" /></span>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
