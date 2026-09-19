"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Timer, 
  CheckSquare, 
  Users, 
  Headphones, 
  Sparkles, 
  ArrowRight, 
} from "lucide-react";

type Locale = "en" | "fr";

const hubContent = {
  en: {
    eyebrow: "Collaborative Space & Creative Tools",
    title: "Supercharge Your Productivity",
    description:
      "A suite of interactive tools custom-tailored for CTRL S students and coworkers. Work solo or synchronize your efforts with classmates in our online Study Hub.",
    features: [
      {
        icon: Timer,
        title: "Pomodoro & Deep Work",
        desc: "Synchronize your focus cycles with audio cues and detailed study session tracking.",
      },
      {
        icon: CheckSquare,
        title: "Task & Progress Manager",
        desc: "Organize revision goals by priority with automatic browser saving ('Save Your Progress').",
      },
      {
        icon: Users,
        title: "Collab Mode & Study Rooms",
        desc: "Create a virtual study room with a private code to study in real-time with peers and friends.",
      },
      {
        icon: Headphones,
        title: "Ambient & White Noise Generator",
        desc: "Rain sounds, coffee shop ambience, waves, and alpha waves to block distractions and enter flow state.",
      },
    ],
    bannerBadge: "Dedicated Web App",
    bannerTitle: "CTRL S Focus & Collab Hub",
    bannerDesc:
      "Access the full interactive dashboard with fullscreen timer, group study rooms, and focus soundscapes.",
    bannerBtn: "Launch Workspace",
  },
  fr: {
    eyebrow: "Espace Collaboratif & Outils Créatifs",
    title: "Boostez Votre Productivité",
    description:
      "Une suite d'outils interactifs conçue sur-mesure pour les étudiants et coworkers de CTRL S. Travaillez seul ou synchronisez vos efforts en groupe avec notre Hub en ligne.",
    features: [
      {
        icon: Timer,
        title: "Pomodoro & Deep Work",
        desc: "Synchronisez vos cycles de concentration avec des alertes sonores et un suivi précis de vos sessions d'étude.",
      },
      {
        icon: CheckSquare,
        title: "Gestionnaire de Tâches & Progrès",
        desc: "Organisez vos révisions par priorité avec sauvegarde automatique dans votre navigateur ('Save Your Progress').",
      },
      {
        icon: Users,
        title: "Mode Collab & Salles d'Étude",
        desc: "Créez une salle virtuelle avec code privé pour étudier en groupe avec vos collègues et camarades de fac.",
      },
      {
        icon: Headphones,
        title: "Générateur d'Ambiance & Bruits Blancs",
        desc: "Sons de pluie, café de spécialité, vagues et ondes alpha pour masquer les bruits et maximiser votre flux.",
      },
    ],
    bannerBadge: "Application Web Dédiée",
    bannerTitle: "Espace Focus & Collab CTRL S",
    bannerDesc:
      "Accédez au tableau de bord complet avec timer plein écran, notes de groupe et sons d'ambiance.",
    bannerBtn: "Lancer l'Espace",
  },
};

export default function CreativeCoworkHub() {
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    const checkLang = () => {
      try {
        const stored = localStorage.getItem("ctrl_s_lang");
        if (stored === "fr" || stored === "en") {
          setLocale(stored);
          return;
        }
        if (
          document.documentElement.lang.toLowerCase().startsWith("fr") ||
          (typeof navigator !== "undefined" && navigator.language.toLowerCase().startsWith("fr"))
        ) {
          setLocale("fr");
        }
      } catch {
        // ignore
      }
    };
    checkLang();
    window.addEventListener("storage", checkLang);
    return () => window.removeEventListener("storage", checkLang);
  }, []);

  const t = hubContent[locale];

  return (
    <section id="hub" className="relative py-20 sm:py-24 md:py-32 overflow-hidden bg-[#FAFAFA] border-t border-brand-blue/15">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-0 w-[450px] h-[450px] bg-brand-orange/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[450px] h-[450px] bg-brand-blue/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-xs font-bold uppercase tracking-[0.25em] text-brand-orange font-lemon-milk mb-4"
          >
            <Sparkles className="w-3.5 h-3.5" />
            {t.eyebrow}
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2xl sm:text-4xl md:text-5xl font-semibold uppercase tracking-tight text-brand-blue font-lemon-milk mb-4 sm:mb-6"
          >
            {t.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xs sm:text-sm md:text-base text-brand-blue/80 font-light leading-relaxed max-w-2xl mx-auto px-2"
          >
            {t.description}
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="w-20 h-1 bg-brand-orange mx-auto rounded-full mt-6"
          />
        </div>

        {/* Feature List & Dedicated Page CTA */}
        <div className="max-w-5xl mx-auto flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {t.features.filter((feat) => feat.icon !== Headphones).map((feat, idx) => {
              const IconComponent = feat.icon;
              return (
                <motion.div
                  key={feat.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="p-5 sm:p-6 rounded-2xl bg-white border border-brand-blue/15 hover:border-brand-orange/50 shadow-xs hover:shadow-md transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue mb-3 group-hover:bg-brand-orange/10 group-hover:text-brand-orange transition-colors">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-brand-blue mb-1.5 font-lemon-milk group-hover:text-brand-orange transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-brand-blue/70 font-light leading-relaxed">
                    {feat.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Prominent Highlight Card: Surrounded in Blue, Not black/white/gray, with 100% legible text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative overflow-hidden mt-3 p-5 sm:p-8 rounded-3xl bg-gradient-to-r from-[#edf3fb] via-[#f7f9fd] to-[#eef4fc] border-2 border-brand-blue ring-4 ring-brand-blue/20 shadow-[0_12px_35px_rgba(93,120,163,0.22)] flex flex-col sm:flex-row items-center justify-between gap-6"
          >
            {/* Ambient decorative glow */}
            <div className="pointer-events-none absolute -top-16 -right-16 w-52 h-52 rounded-full bg-brand-orange/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 -left-16 w-52 h-52 rounded-full bg-brand-blue/15 blur-3xl" />

            <div className="relative z-10 space-y-2 text-center sm:text-left max-w-xl">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span className="inline-flex items-center px-3.5 py-1 rounded-full bg-brand-orange text-white text-[11px] font-bold uppercase tracking-wider font-lemon-milk shadow-sm">
                  {t.bannerBadge}
                </span>
              </div>
              <h4 className="text-xl sm:text-2xl font-bold uppercase tracking-wider text-brand-blue font-lemon-milk">
                {t.bannerTitle}
              </h4>
              <p className="text-xs sm:text-sm text-brand-blue/85 font-normal leading-relaxed">
                {t.bannerDesc}
              </p>
            </div>

            <div className="relative z-10 w-full sm:w-auto shrink-0 flex justify-center">
              <Link
                href="/hub"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-brand-orange hover:bg-brand-orange/90 text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-xl shadow-brand-orange/30 hover:scale-105 font-lemon-milk cursor-pointer w-full sm:w-auto text-center"
              >
                <span>{t.bannerBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
