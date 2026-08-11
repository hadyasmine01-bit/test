"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import FocusCalculator from "./FocusCalculator";

const pricingPlans = [
  {
    image: "/assets/day shift.png",
    alt: "Tarifs Day Shift - CTRL S Coworking",
  },
  {
    image: "/assets/Plan de travail 1.png",
    alt: "Tarifs Monthly Plan - CTRL S Coworking",
  },
];

export default function WhyChooseUs() {
  return (
    <section
      id="pricing"
      className="relative py-24 md:py-32 overflow-hidden bg-[#FAFAFA] border-y border-brand-blue/20"
    >
      {/* Background Gradients */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-brand-orange/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-6">
          <div className="max-w-xl">
            <span className="text-xs uppercase tracking-[0.3em] text-brand-orange font-bold block mb-4 font-lemon-milk">
              Nos Tarifs
            </span>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-brand-blue uppercase leading-tight font-lemon-milk">
              Des forfaits adaptés à vos besoins
            </h2>
          </div>
          <div className="h-0.5 bg-brand-blue/20 flex-grow mx-8 hidden lg:block" />
          <p className="text-brand-blue/70 font-light max-w-sm md:text-right leading-relaxed">
            Choisissez le plan qui vous convient et profitez d'un espace de travail premium chez CTRL S.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {pricingPlans.map((plan, idx) => (
            <motion.div
              key={plan.alt}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              whileHover={{ y: -8 }}
              className="group relative bg-white border border-brand-blue/20 hover:border-brand-orange/60 rounded-2xl p-4 md:p-6 transition-all duration-500 shadow-[0_10px_30px_rgba(93,120,163,0.12)] overflow-hidden"
            >
              {/* Glow Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/0 via-transparent to-brand-blue/0 group-hover:from-brand-orange/5 group-hover:to-brand-blue/5 transition-all duration-500 pointer-events-none" />

              {/* Pricing Image Container */}
              <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-[#f8f9fa] border border-brand-blue/5">
                <Image
                  src={plan.image}
                  alt={plan.alt}
                  fill
                  className="object-contain p-3 md:p-5 drop-shadow-md transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Subtle indicator */}
              <div className="w-10 h-0.5 bg-brand-blue/20 group-hover:bg-brand-orange transition-colors duration-500 mt-5 mx-auto" />
            </motion.div>
          ))}
        </div>

        {/* Interactive Focus Yield & Savings Calculator */}
        <FocusCalculator />
      </div>
    </section>
  );
}