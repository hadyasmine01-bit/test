"use client";

import { motion } from "framer-motion";
import { Laptop, Cpu, Sofa, Target, Briefcase } from "lucide-react";

const items = [
  {
    icon: Laptop,
    title: "Premium Workspace",
    desc: "Experience high-end furnishings, custom ergonomic seating, and spacious personal workspaces designed for long hours of study or development."
  },
  {
    icon: Cpu,
    title: "Modern Environment",
    desc: "Operate in an elegant workspace equipped with high-speed fiber internet, dual-band Wi-Fi, and smart IoT-enabled lighting."
  },
  {
    icon: Sofa,
    title: "Comfortable Atmosphere",
    desc: "Relax in our breakout lounges, customize your environment with multi-zone climate control, and enjoy a curated sensory ambiance."
  },
  {
    icon: Target,
    title: "Productivity Focused",
    desc: "Work in dedicated silent zones, focus areas, and private phone booths structured to maximize flow state and minimize noise."
  },
  {
    icon: Briefcase,
    title: "Professional Facilities",
    desc: "Access premium printing stations, collaborative smart boards, sleek conference rooms, and support for organizing academic seminars."
  }
];

export default function WhyChooseUs() {
  return (
    <section id="amenities" className="relative py-24 md:py-32 overflow-hidden bg-[#0a0d14] border-y border-dark-border/20">
      {/* Background Gradients */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-brand-orange/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-6">
          <div className="max-w-xl">
            <span className="text-xs uppercase tracking-[0.3em] text-brand-orange font-bold block mb-4">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white uppercase leading-tight">
              An Elevated standard of Work & Study
            </h2>
          </div>
          <div className="h-0.5 bg-dark-border flex-grow mx-8 hidden lg:block" />
          <p className="text-slate-400 font-light max-w-sm md:text-right leading-relaxed">
            Every feature at CTRL S is designed to eliminate friction, helping you lock in your daily achievements seamlessly.
          </p>
        </div>

        {/* Interactive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative bg-[#0D111A] border border-dark-border/60 hover:border-brand-orange/40 rounded-2xl p-8 transition-all duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.15)] flex flex-col justify-between overflow-hidden"
              >
                {/* Glow Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/0 via-transparent to-brand-blue/0 group-hover:from-brand-orange/5 group-hover:to-brand-blue/5 transition-all duration-500 pointer-events-none" />

                <div>
                  {/* Card Icon */}
                  <div className="w-12 h-12 rounded-xl bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center text-brand-orange mb-8 transition-all duration-500 group-hover:scale-110 group-hover:bg-brand-orange group-hover:text-white group-hover:shadow-[0_0_15px_rgba(214,90,45,0.4)]">
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Card Title */}
                  <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-4 transition-colors duration-300 group-hover:text-brand-orange">
                    {card.title}
                  </h3>

                  {/* Card Description */}
                  <p className="text-sm text-slate-400 font-light leading-relaxed mb-6">
                    {card.desc}
                  </p>
                </div>

                {/* Subtle indicator */}
                <div className="w-10 h-0.5 bg-dark-border group-hover:bg-brand-orange transition-colors duration-500" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
