"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { BookOpen, Users, Compass, ShieldCheck } from "lucide-react";

const pillars = [
  {
    icon: Compass,
    title: "Productive Environment",
    desc: "meticulously sound-insulated and designed to help you maintain deep focus, free from distraction."
  },
  {
    icon: BookOpen,
    title: "Learning & Innovation",
    desc: "equipped with state-of-the-art labs and resources to nurture academic research and technical projects."
  },
  {
    icon: ShieldCheck,
    title: "Comfortable Workspace",
    desc: "ergonomic seating, customizable desks, and climate control ensuring maximum physical comfort."
  },
  {
    icon: Users,
    title: "Vibrant Community",
    desc: "connect and network with ambitious peers, students, and professionals in monastir."
  }
];

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-32 overflow-hidden bg-[#FAFAFA]">
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
            className="text-3xl md:text-5xl font-semibold tracking-tight text-brand-blue mb-6 uppercase"
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
            <h3 className="font-[family-name:var(--font-league-spartan)] text-2xl md:text-3xl text-brand-blue mb-6 font-light leading-relaxed">
              We help you lock in your success and <span translate="no" className="notranslate">&ldquo;Save Your Progress&rdquo;</span> at every step.
            </h3>
            
            <div className="text-brand-blue/80 font-light space-y-6 leading-relaxed mb-10 lowercase">
              <p>
                at <strong className="text-brand-blue font-semibold notranslate" translate="no">Control and Study (CTRL S)</strong>, we believe that the right environment can make all the difference. designed primarily for students, our space offers a calm, comfortable, and inspiring atmosphere where you can stay focused, prepare for exams, complete assignments, and achieve your academic goals.
              </p>
              <p>
                located opposite the dental faculty in monastir, <span className="notranslate" translate="no">CTRL S</span> is more than just a study space. it also welcomes freelancers, remote workers, and creative professionals looking for a productive place to work, collaborate, and bring their ideas to life. whether you&apos;re revising for your next exam, attending online classes, or working on your latest project, <span className="notranslate" translate="no">CTRL S</span> provides the space to help you do your best work.
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
                      <h4 className="text-sm font-semibold text-brand-blue uppercase tracking-wider mb-1.5 transition-colors duration-300 group-hover:text-brand-orange">
                        {item.title}
                      </h4>
                      <p className="text-xs text-brand-blue/70 font-light leading-relaxed lowercase">
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
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-dark-border shadow-[0_20px_40px_rgba(93,120,163,0.3)] group">
              <div className="absolute inset-0 bg-brand-blue/10 z-10 transition-colors duration-500 group-hover:bg-transparent" />
              <Image 
                src="/assets/gallery/IMG_1541.jpg"
                alt="Control & Study Workspace"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            
            {/* Absolute Decorative Tag */}
            <div className="absolute -bottom-6 left-2 sm:-left-6 bg-dark-card border border-dark-border p-4 sm:p-5 rounded-xl shadow-2xl flex items-center gap-3 sm:gap-4 z-20 backdrop-blur-md max-w-[calc(100%-1rem)] sm:max-w-xs">
              <span className="text-3xl sm:text-4xl font-extrabold text-brand-orange leading-none font-serif">100%</span>
              <div className="leading-tight">
                <p className="text-xs uppercase font-bold text-brand-blue tracking-wider">Goal Oriented</p>
                <p className="text-[10px] text-brand-blue/70 font-light mt-0.5 lowercase">designed to foster focus, research, and career breakthroughs.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}