"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Zap, Coffee, Clock, Sparkles } from "lucide-react";

export default function FocusCalculator() {
  const [hours, setHours] = useState(4);

  const weeklyHours = hours * 6;
  const productivityBoost = Math.round(hours * 8.5);
  const espressoCups = Math.min(Math.round(hours * 0.8), 4);
  const recommendedPlan = hours >= 4 ? "Monthly Pass" : "Day Pass";

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-16 bg-white border border-brand-blue/20 rounded-3xl p-6 sm:p-8 md:p-10 shadow-lg relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8 border-b border-brand-blue/10 pb-6">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-brand-orange font-bold font-lemon-milk mb-1">
            <Sparkles className="w-3.5 h-3.5" /> Interactive Calculator
          </span>
          <h3 className="text-2xl font-bold uppercase tracking-wider text-brand-blue font-lemon-milk">
            Calculate Your Focus Yield
          </h3>
        </div>
        <div className="px-4 py-2 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-bold uppercase tracking-wider font-lemon-milk">
          Recommended: {recommendedPlan}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Interactive Slider Input */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <label htmlFor="daily-study-hours" className="text-xs uppercase tracking-wider font-bold text-brand-blue/70 font-lemon-milk flex justify-between">
            <span>Daily Study & Work Target</span>
            <span className="text-brand-orange font-bold text-base">{hours} Hours / Day</span>
          </label>
          <input
            id="daily-study-hours"
            type="range"
            min="1"
            max="12"
            step="1"
            value={hours}
            onChange={(e) => setHours(parseInt(e.target.value))}
            className="w-full h-2.5 bg-brand-blue/10 rounded-lg appearance-none cursor-pointer accent-brand-orange"
          />
          <div className="flex justify-between text-[11px] text-brand-blue/60 font-semibold uppercase tracking-wider font-lemon-milk">
            <span>1 Hour</span>
            <span>6 Hours</span>
            <span>12 Hours</span>
          </div>
        </div>

        {/* Dynamic Calculation Cards */}
        <div className="lg:col-span-6 grid grid-cols-3 gap-3 sm:gap-4">
          <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-[#FAFAFA] border border-brand-blue/15 text-center">
            <Clock className="w-5 h-5 text-brand-orange mb-2" />
            <span className="text-xl sm:text-2xl font-extrabold text-brand-blue font-lemon-milk">
              {weeklyHours}h
            </span>
            <span className="text-[10px] text-brand-blue/70 uppercase font-bold tracking-wider mt-1 font-lemon-milk">
              Weekly Focus
            </span>
          </div>

          <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-[#FAFAFA] border border-brand-blue/15 text-center">
            <Zap className="w-5 h-5 text-brand-orange mb-2" />
            <span className="text-xl sm:text-2xl font-extrabold text-brand-blue font-lemon-milk">
              +{productivityBoost}%
            </span>
            <span className="text-[10px] text-brand-blue/70 uppercase font-bold tracking-wider mt-1 font-lemon-milk">
              Output Gain
            </span>
          </div>

          <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-[#FAFAFA] border border-brand-blue/15 text-center">
            <Coffee className="w-5 h-5 text-brand-orange mb-2" />
            <span className="text-xl sm:text-2xl font-extrabold text-brand-blue font-lemon-milk">
              {espressoCups}
            </span>
            <span className="text-[10px] text-brand-blue/70 uppercase font-bold tracking-wider mt-1 font-lemon-milk">
              Coffee Perks
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
