"use client";

import { motion } from "framer-motion";
import { Laptop, Code2, Clock, Coffee, Printer, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Laptop,
    title: "Open Space",
    desc: "A flexible and shared open workspace designed specifically to catalyze productivity, focus, and organic collaboration.",
    highlight: "Hot desks & dedicated workstations"
  },
  {
    icon: Code2,
    title: "The Lab",
    desc: "A silent and cozy room made for comfort, focus, and peace",
    highlight: "Comfort & Silence"
  },
  {
    icon: Clock,
    title: "24/7 Access",
    desc: "Work or study on your own terms. Our secure smart access ensures the space is open for your inspiration day or night.",
    highlight: "Keyless digital authentication"
  },
  {
    icon: Coffee,
    title: "Specialty Coffee",
    desc: "Refuel and relax in our modern espresso bar. Premium roasted beans and comfort beverages are served daily.",
    highlight: "Unlimited premium coffee options"
  },
  {
    icon: Printer,
    title: "Professional Printing",
    desc: "High-speed laser printing, copying, and documentation facilities are fully integrated and accessible to members.",
    highlight: "Color and high-volume document printing"
  }
];

export default function Services() {
  return (
    <section id="services" className="relative py-24 md:py-32 overflow-hidden bg-[#07090E]">
      {/* Decorative Brand Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
          <span className="text-xs uppercase tracking-[0.3em] text-brand-orange font-bold block mb-4">
            Our Services
          </span>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white mb-6 uppercase">
            Tailored for Progress
          </h2>
          <div className="w-20 h-1 bg-brand-orange mx-auto rounded-full origin-center" />
        </div>

        {/* 3 + 2 Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Row 1: 3 cards (spanning 2 columns each on large screens) */}
          {services.slice(0, 3).map((svc, idx) => {
            const Icon = svc.icon;
            return (
              <motion.div
                key={svc.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="lg:col-span-2 group bg-[#0D111A] border border-dark-border/50 hover:border-brand-blue/30 rounded-2xl p-8 flex flex-col justify-between transition-all duration-500 hover:shadow-[0_15px_35px_rgba(85,122,170,0.1)] relative overflow-hidden"
              >
                {/* Accent glow line on top of card */}
                <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-brand-orange to-brand-blue opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div>
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-brand-blue mb-8 group-hover:text-brand-orange group-hover:border-brand-orange/30 group-hover:bg-brand-orange/10 transition-colors duration-500">
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white uppercase tracking-wider mb-4">
                    {svc.title}
                  </h3>

                  {/* Desc */}
                  <p className="text-sm text-slate-400 font-light leading-relaxed mb-6">
                    {svc.desc}
                  </p>
                </div>

                <div>
                  <div className="border-t border-dark-border/60 pt-4 flex items-center justify-between">
                    <span className="text-xs text-brand-blue font-semibold uppercase tracking-wider group-hover:text-brand-orange transition-colors duration-300">
                      {svc.highlight}
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-brand-orange group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* Row 2: 2 cards (spanning 3 columns each on large screens to fill the grid of 6) */}
          {services.slice(3).map((svc, idx) => {
            const Icon = svc.icon;
            return (
              <motion.div
                key={svc.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (idx + 3) * 0.1 }}
                className="lg:col-span-3 group bg-[#0D111A] border border-dark-border/50 hover:border-brand-blue/30 rounded-2xl p-8 flex flex-col justify-between transition-all duration-500 hover:shadow-[0_15px_35px_rgba(85,122,170,0.1)] relative overflow-hidden"
              >
                {/* Accent glow line on top of card */}
                <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-brand-blue to-brand-orange opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div>
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-brand-blue mb-8 group-hover:text-brand-orange group-hover:border-brand-orange/30 group-hover:bg-brand-orange/10 transition-colors duration-500">
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white uppercase tracking-wider mb-4">
                    {svc.title}
                  </h3>

                  {/* Desc */}
                  <p className="text-sm text-slate-400 font-light leading-relaxed mb-6">
                    {svc.desc}
                  </p>
                </div>

                <div>
                  <div className="border-t border-dark-border/60 pt-4 flex items-center justify-between">
                    <span className="text-xs text-brand-blue font-semibold uppercase tracking-wider group-hover:text-brand-orange transition-colors duration-300">
                      {svc.highlight}
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-brand-orange group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
