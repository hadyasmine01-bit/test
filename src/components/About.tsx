"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { BookOpen, Users, Compass, ShieldCheck } from "lucide-react";

const pillars = [
  {
    icon: Compass,
    title: "Productive Environment",
    desc: "Meticulously sound-insulated and designed to help you maintain deep focus, free from distraction."
  },
  {
    icon: BookOpen,
    title: "Learning & Innovation",
    desc: "Equipped with state-of-the-art labs and resources to nurture academic research and technical projects."
  },
  {
    icon: ShieldCheck,
    title: "Comfortable Workspace",
    desc: "Ergonomic seating, customizable desks, and climate control ensuring maximum physical comfort."
  },
  {
    icon: Users,
    title: "Vibrant Community",
    desc: "Connect and network with ambitious peers, students, and professionals in Monastir."
  }
];

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-32 overflow-hidden bg-[#07090E]">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[300px] h-[300px] bg-brand-blue/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[250px] h-[250px] bg-brand-orange/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs uppercase tracking-[0.3em] text-brand-orange font-bold block mb-4"
          >
            About Control & Study
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl md:text-5xl font-semibold tracking-tight text-white mb-6 uppercase"
          >
            Where Ambition Meets Design
          </motion.h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-20 h-1 bg-brand-orange mx-auto rounded-full origin-center"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left Column: Premium Text presentation */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            <h3 className="font-serif italic text-2xl md:text-3xl text-brand-blue mb-6 font-light leading-relaxed">
              We help you lock in your success and <span translate="no" className="notranslate">&ldquo;Save Your Progress&rdquo;</span> at every step.
            </h3>
            
            <div className="text-slate-300 font-light space-y-6 leading-relaxed mb-10">
              <p>
                At <strong className="text-white font-semibold notranslate" translate="no">Control and Study (CTRL S)</strong>, we redefine the modern workspace. We believe that where you work directly impacts your potential. Our space is built for students, freelancers, and businesses who refuse to compromise on quality and focus.
              </p>
              <p>
                Nestled facing the Dental Faculty in Monastir, we bridge the gap between academic focus and professional networking. Whether you are coding your next software release, studying for clinical exams, or drafting a startup plan, our space serves as the ultimate catalog for your daily milestones.
              </p>
            </div>

            {/* Core Values Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {pillars.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <motion.div 
                    key={item.title}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="flex gap-4 group"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-brand-blue transition-colors duration-300 group-hover:bg-brand-orange/10 group-hover:border-brand-orange/20 group-hover:text-brand-orange">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-1.5 transition-colors duration-300 group-hover:text-brand-orange">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-400 font-light leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Column: Floating Picture Frame */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-dark-border shadow-[0_20px_40px_rgba(0,0,0,0.5)] group">
              <div className="absolute inset-0 bg-[#07090E]/10 z-10 transition-colors duration-500 group-hover:bg-transparent" />
              <Image 
                src="/assets/about-collab.jpg"
                alt="Control & Study Collaboration Hub"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            
            {/* Absolute Decorative Tag */}
            <div className="absolute -bottom-6 -left-6 bg-dark-card border border-dark-border p-5 rounded-xl shadow-2xl flex items-center gap-4 z-20 backdrop-blur-md max-w-xs">
              <span className="text-4xl font-extrabold text-brand-orange leading-none font-serif">100%</span>
              <div className="leading-tight">
                <p className="text-xs uppercase font-bold text-white tracking-wider">Goal Oriented</p>
                <p className="text-[10px] text-slate-400 font-light mt-0.5">Designed to foster focus, research, and career breakthroughs.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
