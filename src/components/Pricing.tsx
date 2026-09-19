"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  Calendar,
  Users,
  Sun,
  Moon,
  Check,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Sparkles,
  Info,
  ShieldAlert,
  ArrowRight,
  Layers,
  Globe,
} from "lucide-react";

type Locale = "en" | "fr";

// Pricing posters
const pricingImages: Record<Locale, Array<{ id: string; title: string; subtitle: string; src: string }>> = {
  en: [
    {
      id: "hourly",
      title: "Hourly Passes - Day & Night Shift",
      subtitle: "Quick sessions from 2h to 16h",
      src: "/assets/ilovepdf_pages-to-jpg/a4_page-0001.jpg",
    },
    {
      id: "abonnement-short",
      title: "Subscriptions - Short Term (1 Week to 3 Months)",
      subtitle: "16h & 24h access packages",
      src: "/assets/ilovepdf_pages-to-jpg/a4_page-0002.jpg",
    },
    {
      id: "abonnement-long",
      title: "Subscriptions - Long Term (6 Months to 1 Year)",
      subtitle: "Extended semester and annual plans",
      src: "/assets/ilovepdf_pages-to-jpg/a4_page-0003.jpg",
    },
    {
      id: "meeting",
      title: "Meeting Room - Private Team Hub",
      subtitle: "Hourly bookings for collaboration and meetings",
      src: "/assets/ilovepdf_pages-to-jpg/a4_page-0004.jpg",
    },
  ],
  fr: [
    {
      id: "hourly",
      title: "Pass Par Heure - Jour & Nuit",
      subtitle: "Sessions flexibles de 2h à 16h",
      src: "/assets/ilovepdf_pages-to-jpg/a4_page-0001.jpg",
    },
    {
      id: "abonnement-short",
      title: "Abonnements - Court Terme (1 Semaine à 3 Mois)",
      subtitle: "Formules d'accès 16h et 24h",
      src: "/assets/ilovepdf_pages-to-jpg/a4_page-0002.jpg",
    },
    {
      id: "abonnement-long",
      title: "Abonnements - Long Terme (6 Mois à 1 An)",
      subtitle: "Plans semestriels et annuels",
      src: "/assets/ilovepdf_pages-to-jpg/a4_page-0003.jpg",
    },
    {
      id: "meeting",
      title: "Salle de Réunion - Espace Équipe Privé",
      subtitle: "Réservation à l'heure pour réunions et travail d'équipe",
      src: "/assets/ilovepdf_pages-to-jpg/a4_page-0004.jpg",
    },
  ],
};

// Hourly rates data
const hourlyData: Record<
  Locale,
  {
    dayShift: Array<{ name: string; hours: string; openSpace: string; lab: string; popular?: boolean }>;
    nightShift: Array<{ name: string; hours: string; openSpace: string; lab: string; popular?: boolean }>;
  }
> = {
  en: {
    dayShift: [
      { name: "Quick Save", hours: "2h", openSpace: "3 DT", lab: "5 DT" },
      { name: "Half-Day Focus", hours: "4h", openSpace: "5 DT", lab: "7 DT", popular: true },
      { name: "Full-Day Sprint", hours: "8h", openSpace: "8 DT", lab: "10 DT" },
      { name: "Marathon Session", hours: "16h", openSpace: "13 DT", lab: "15 DT" },
    ],
    nightShift: [
      { name: "Overnight Sprint", hours: "2h", openSpace: "5 DT", lab: "7 DT" },
      { name: "Overnight Session", hours: "4h", openSpace: "7 DT", lab: "9 DT" },
      { name: "Deep Night Focus", hours: "6h", openSpace: "9 DT", lab: "11 DT", popular: true },
      { name: "Full Night Shift", hours: "8h", openSpace: "10 DT", lab: "12 DT" },
    ],
  },
  fr: {
    dayShift: [
      { name: "Quick Save", hours: "2h", openSpace: "3 DT", lab: "5 DT" },
      { name: "Half-Day Focus", hours: "4h", openSpace: "5 DT", lab: "7 DT", popular: true },
      { name: "Full-Day Sprint", hours: "8h", openSpace: "8 DT", lab: "10 DT" },
      { name: "Marathon Session", hours: "16h", openSpace: "13 DT", lab: "15 DT" },
    ],
    nightShift: [
      { name: "Overnight Sprint", hours: "2h", openSpace: "5 DT", lab: "7 DT" },
      { name: "Overnight Session", hours: "4h", openSpace: "7 DT", lab: "9 DT" },
      { name: "Deep Night Focus", hours: "6h", openSpace: "9 DT", lab: "11 DT", popular: true },
      { name: "Full Night Shift", hours: "8h", openSpace: "10 DT", lab: "12 DT" },
    ],
  },
};

// Subscriptions data
const subscriptionsData: Record<
  Locale,
  {
    shortTerm: Array<{
      code: string;
      duration: string;
      popular?: boolean;
      badge?: string;
      subtext: string;
      access16h: { openSpace: string; lab: string };
      access24h: { openSpace: string; lab: string };
    }>;
    longTerm: Array<{
      code: string;
      duration: string;
      popular?: boolean;
      badge?: string;
      subtext: string;
      access16h: { openSpace: string; lab: string };
      access24h: { openSpace: string; lab: string };
    }>;
  }
> = {
  en: {
    shortTerm: [
      {
        code: "CTRL W1",
        duration: "1 Week",
        subtext: "7 days of productive study",
        access16h: { openSpace: "45 DT", lab: "60 DT" },
        access24h: { openSpace: "65 DT", lab: "80 DT" },
      },
      {
        code: "CTRL W2",
        duration: "2 Weeks",
        subtext: "14 days focused sprint",
        access16h: { openSpace: "80 DT", lab: "95 DT" },
        access24h: { openSpace: "110 DT", lab: "125 DT" },
      },
      {
        code: "CTRL S",
        duration: "1 Month",
        popular: true,
        badge: "Most Popular",
        subtext: "Full monthly study access",
        access16h: { openSpace: "130 DT", lab: "150 DT" },
        access24h: { openSpace: "160 DT", lab: "180 DT" },
      },
      {
        code: "CTRL G",
        duration: "3 Months",
        subtext: "Quarterly exam preparation",
        access16h: { openSpace: "330 DT", lab: "380 DT" },
        access24h: { openSpace: "410 DT", lab: "460 DT" },
      },
    ],
    longTerm: [
      {
        code: "CTRL R",
        duration: "6 Months",
        badge: "Semester Choice",
        subtext: "Ideal for a full academic semester",
        access16h: { openSpace: "625 DT", lab: "720 DT" },
        access24h: { openSpace: "770 DT", lab: "865 DT" },
      },
      {
        code: "CTRL B",
        duration: "9 Months",
        subtext: "Complete academic year coverage",
        access16h: { openSpace: "875 DT", lab: "1010 DT" },
        access24h: { openSpace: "1080 DT", lab: "1215 DT" },
      },
      {
        code: "CTRL F",
        duration: "12 Months",
        badge: "Best Value",
        popular: true,
        subtext: "Annual unlimited priority membership",
        access16h: { openSpace: "1090 DT", lab: "1260 DT" },
        access24h: { openSpace: "1345 DT", lab: "1490 DT" },
      },
    ],
  },
  fr: {
    shortTerm: [
      {
        code: "CTRL W1",
        duration: "1 Semaine",
        subtext: "7 jours de révisions intensives",
        access16h: { openSpace: "45 DT", lab: "60 DT" },
        access24h: { openSpace: "65 DT", lab: "80 DT" },
      },
      {
        code: "CTRL W2",
        duration: "2 Semaines",
        subtext: "14 jours de travail concentré",
        access16h: { openSpace: "80 DT", lab: "95 DT" },
        access24h: { openSpace: "110 DT", lab: "125 DT" },
      },
      {
        code: "CTRL S",
        duration: "1 Mois",
        popular: true,
        badge: "Le Plus Populaire",
        subtext: "Accès mensuel complet à l'espace",
        access16h: { openSpace: "130 DT", lab: "150 DT" },
        access24h: { openSpace: "160 DT", lab: "180 DT" },
      },
      {
        code: "CTRL G",
        duration: "3 Mois",
        subtext: "Trimestre de préparation d'examens",
        access16h: { openSpace: "330 DT", lab: "380 DT" },
        access24h: { openSpace: "410 DT", lab: "460 DT" },
      },
    ],
    longTerm: [
      {
        code: "CTRL R",
        duration: "6 Mois",
        badge: "Choix Semestre",
        subtext: "Idéal pour un semestre universitaire complet",
        access16h: { openSpace: "625 DT", lab: "720 DT" },
        access24h: { openSpace: "770 DT", lab: "865 DT" },
      },
      {
        code: "CTRL B",
        duration: "9 Mois",
        subtext: "Couverture intégrale de l'année scolaire",
        access16h: { openSpace: "875 DT", lab: "1010 DT" },
        access24h: { openSpace: "1080 DT", lab: "1215 DT" },
      },
      {
        code: "CTRL F",
        duration: "12 Mois",
        badge: "Meilleur Rapport",
        popular: true,
        subtext: "Abonnement annuel illimité et prioritaire",
        access16h: { openSpace: "1090 DT", lab: "1260 DT" },
        access24h: { openSpace: "1345 DT", lab: "1490 DT" },
      },
    ],
  },
};

// Meeting Room data
const meetingRoomData: Record<
  Locale,
  Array<{ duration: string; price: string; popular?: boolean; desc: string }>
> = {
  en: [
    { duration: "1 Hour", price: "40 DT", desc: "Quick syncs & brief consultations" },
    { duration: "2 Hours", price: "60 DT", popular: true, desc: "Project workshops & team meetings" },
    { duration: "3 Hours", price: "80 DT", desc: "Extended presentations & training" },
    { duration: "4 Hours", price: "100 DT", desc: "Half-day executive / collaborative sprint" },
  ],
  fr: [
    { duration: "1 Heure", price: "40 DT", desc: "Points rapides & consultations" },
    { duration: "2 Heures", price: "60 DT", popular: true, desc: "Ateliers de projet & réunions d'équipe" },
    { duration: "3 Heures", price: "80 DT", desc: "Présentations approfondies & formations" },
    { duration: "4 Heures", price: "100 DT", desc: "Sprint collaboratif demi-journée" },
  ],
};

// Translations copy
const copy = {
  en: {
    eyebrow: "Pricing & Memberships",
    title: "Choose Your Formula",
    description:
      "Transparent and flexible formulas tailored for study sessions, deep work, subscriptions, and team bookings opposite the Faculty of Dentistry in Monastir.",
    tabs: {
      all: "All Rates",
      hourly: "1. Hourly Passes",
      abonnements: "2. Subscriptions",
      meeting: "3. Meeting Room",
    },
    hourly: {
      tag: "Part 1 • Flexible Hourly Access",
      title: "Day & Night Shift Passes",
      subtitle: "Drop-in sessions from 2 hours to 16 hours. Pay only for the time you need.",
      dayBtn: "Day Shift (09:00 - 01:00)",
      nightBtn: "Night Shift (01:00 - 09:00)",
      dayBanner: "Day Shifts: 09:00 - 01:00",
      nightBanner: "Night Shifts: 01:00 - 09:00",
      spaceSub: "Open space & The lab options",
      duration: "Duration",
      openSpace: "Open Space",
      lab: "The Lab",
      popular: "Popular",
      reservationNotice: "Additional reservation fee:",
      reservationNoticeDetail: "+2 DT to guarantee your dedicated desk in advance.",
      reserveDesk: "Reserve a desk",
      posterTitle: "Hourly Sheet (Day & Night)",
      posterSub: "Full resolution A4 poster",
      officialBadge: "Official Poster",
      enlargeNotice: "Click to enlarge poster",
      zoom: "Zoom",
    },
    abonnements: {
      tag: "Part 2 • Long-Term Memberships",
      title: "Subscriptions & Memberships",
      subtitle:
        "From 1 week up to a full year. Select your access window: 16H daily access or 24/7 unlimited.",
      btn16h: "CTRL + O",
      btn16hSub: "(16H Access)",
      btn24h: "CTRL + A",
      btn24hSub: "(24H Access)",
      scopeLabel: "Plan Scope:",
      scopeAll: "All Durations",
      scopeShort: "Short-Term (1W - 3M)",
      scopeLong: "Long-Term (6M - 1Y)",
      showingFor: "Showing prices for:",
      label16h: "16H Daily Access (CTRL + O)",
      label24h: "24/7 Unlimited Access (CTRL + A)",
      plan16hTag: "16h Access",
      plan24hTag: "24h Access",
      openSpace: "Open Space",
      lab: "The Lab",
      subscribe: "Subscribe",
      officialHeader: "Official Subscription Posters",
      officialSub:
        "Two complementary pages covering 1 Week to 3 Months (Page 2) & 6 Months to 1 Year (Page 3).",
      clickAny: "Click any poster to view full resolution",
      posterShortBadge: "1 Week - 3 Months",
      posterShortTitle: "Short-Term Subscriptions",
      posterShortSub: "16H & 24H access (1W to 3M)",
      posterLongBadge: "6 Months - 1 Year",
      posterLongTitle: "Long-Term Subscriptions",
      posterLongSub: "16H & 24H access (6M to 1Y)",
      viewPoster1: "View Poster 1 (Short Term)",
      viewPoster2: "View Poster 2 (Long Term)",
      zoom: "Zoom",
    },
    meeting: {
      tag: "Part 3 • Private Collaborative Space",
      title: "Meeting Room • Study . Work . Achieve",
      subtitle:
        "A private, high-tech conference room in The Lab for team presentations, group studies, client meetings, and workshops.",
      labTag: "The Lab",
      popular: "Popular",
      termsTitle: "Reservation Terms & Spot Guarantee",
      policy1Label: "Notice",
      policy1Desc: "24h advance notice required",
      policy2Label: "Deposit",
      policy2Desc: "50% deposit needed to lock in your spot",
      policy3Label: "Schedule",
      policy3Desc: "Available from 8:00 AM to 12:00 PM",
      ctaTitle: "Need a Custom Team Booking?",
      ctaDesc:
        "Contact us directly to reserve your meeting slot or inquire about regular team bookings.",
      ctaBtn: "Reserve Meeting Room",
      posterBadge: "Meeting Room",
      posterTitle: "Meeting Room Sheet",
      posterSub: "Full resolution A4 poster",
      enlargeNotice: "Click to enlarge poster",
      zoom: "Zoom",
    },
    lightbox: {
      pageOf: "Page",
      of: "of",
    },
  },
  fr: {
    eyebrow: "Tarifs & Abonnements",
    title: "Choisissez Votre Formule",
    description:
      "Des formules transparentes et flexibles conçues pour vos sessions d'étude, révisions intensives, abonnements et réservations d'équipe face à la Faculté Dentaire de Monastir.",
    tabs: {
      all: "Tous les tarifs",
      hourly: "1. Pass Par Heure",
      abonnements: "2. Les Abonnements",
      meeting: "3. Salle de Réunion",
    },
    hourly: {
      tag: "Partie 1 • Accès Flexible Par Heure",
      title: "Pass Horaires Jour & Nuit",
      subtitle:
        "Sessions à la carte de 2h à 16h. Ne payez que pour le temps dont vous avez réellement besoin.",
      dayBtn: "Horaires de jour (09:00 - 01:00)",
      nightBtn: "Horaires de nuit (01:00 - 09:00)",
      dayBanner: "Horaires de jour : 09:00 - 01:00",
      nightBanner: "Horaires de nuit : 01:00 - 09:00",
      spaceSub: "Options Espace Ouvert & The Lab",
      duration: "Durée",
      openSpace: "Open Space",
      lab: "The Lab",
      popular: "Populaire",
      reservationNotice: "Frais de réservation supplémentaires :",
      reservationNoticeDetail: "+2 DT pour garantir votre place et bureau à l'avance.",
      reserveDesk: "Réserver un bureau",
      posterTitle: "Fiche Horaires (Jour & Nuit)",
      posterSub: "Affiche A4 haute résolution",
      officialBadge: "Affiche Officielle",
      enlargeNotice: "Cliquer pour agrandir l'affiche",
      zoom: "Zoomer",
    },
    abonnements: {
      tag: "Partie 2 • Abonnements Longue Durée",
      title: "Les Abonnements",
      subtitle:
        "De 1 semaine à une année entière. Choisissez votre créneau : accès quotidien 16h ou accès 24/7 illimité.",
      btn16h: "CTRL + O",
      btn16hSub: "(Accès 16H)",
      btn24h: "CTRL + A",
      btn24hSub: "(Accès 24H)",
      scopeLabel: "Période :",
      scopeAll: "Toutes les durées",
      scopeShort: "Court terme (1 sem - 3 mois)",
      scopeLong: "Long terme (6 mois - 1 an)",
      showingFor: "Prix affichés pour :",
      label16h: "Accès Quotidien 16H (CTRL + O)",
      label24h: "Accès Illimité 24/7 (CTRL + A)",
      plan16hTag: "Accès 16h",
      plan24hTag: "Accès 24h",
      openSpace: "Open Space",
      lab: "The Lab",
      subscribe: "S'abonner",
      officialHeader: "Affiches Officielles des Abonnements",
      officialSub:
        "Deux affiches complémentaires couvrant de 1 Semaine à 3 Mois (Page 2) et de 6 Mois à 1 An (Page 3).",
      clickAny: "Cliquez sur une affiche pour la voir en haute résolution",
      posterShortBadge: "1 Semaine - 3 Mois",
      posterShortTitle: "Abonnements Court Terme",
      posterShortSub: "Accès 16H & 24H (1 sem à 3 mois)",
      posterLongBadge: "6 Mois - 1 An",
      posterLongTitle: "Abonnements Long Terme",
      posterLongSub: "Accès 16H & 24H (6 mois à 1 an)",
      viewPoster1: "Voir Affiche 1 (Court Terme)",
      viewPoster2: "Voir Affiche 2 (Long Terme)",
      zoom: "Zoomer",
    },
    meeting: {
      tag: "Partie 3 • Espace Collaboratif Privé",
      title: "Salle de Réunion • Study . Work . Achieve",
      subtitle:
        "Une salle de réunion privée et insonorisée dans The Lab pour travaux d'équipe, réunions professionnelles et soutenances.",
      labTag: "The Lab",
      popular: "Populaire",
      termsTitle: "Conditions de Réservation & Garantie",
      policy1Label: "Préavis",
      policy1Desc: "Préavis de 24h à l'avance requis",
      policy2Label: "Acompte",
      policy2Desc: "Acompte de 50% requis pour verrouiller votre créneau",
      policy3Label: "Horaires",
      policy3Desc: "Disponible de 08h00 à 12h00",
      ctaTitle: "Besoin d'une Réservation sur Mesure ?",
      ctaDesc:
        "Contactez-nous directement pour réserver votre salle ou organiser des créneaux récurrents.",
      ctaBtn: "Réserver la Salle",
      posterBadge: "Salle de Réunion",
      posterTitle: "Fiche Salle de Réunion",
      posterSub: "Affiche A4 haute résolution",
      enlargeNotice: "Cliquer pour agrandir l'affiche",
      zoom: "Zoomer",
    },
    lightbox: {
      pageOf: "Page",
      of: "sur",
    },
  },
};

export default function Pricing() {
  const [locale, setLocale] = useState<Locale>("en");
  const [activeTab, setActiveTab] = useState<"all" | "hourly" | "abonnements" | "meeting">("all");
  const [activeShift, setActiveShift] = useState<"day" | "night">("day");
  const [accessMode, setAccessMode] = useState<"16h" | "24h">("16h");
  const [subTier, setSubTier] = useState<"all" | "short" | "long">("all");
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  // Auto-detect browser/page locale on mount
  useEffect(() => {
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
      // ignore in case of SSR / strict privacy
    }
  }, []);

  const changeLocale = (newLocale: Locale) => {
    setLocale(newLocale);
    try {
      localStorage.setItem("ctrl_s_lang", newLocale);
      document.documentElement.lang = newLocale;
      window.dispatchEvent(new Event("storage"));
    } catch {
      // ignore
    }
  };

  const t = copy[locale];
  const images = pricingImages[locale];
  const shiftList = activeShift === "day" ? hourlyData[locale].dayShift : hourlyData[locale].nightShift;
  const shortPlans = subscriptionsData[locale].shortTerm;
  const longPlans = subscriptionsData[locale].longTerm;
  const meetingTiers = meetingRoomData[locale];

  // Keyboard navigation for image lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      if (e.key === "Escape") setSelectedImageIndex(null);
      if (e.key === "ArrowLeft") {
        setSelectedImageIndex((selectedImageIndex + images.length - 1) % images.length);
      }
      if (e.key === "ArrowRight") {
        setSelectedImageIndex((selectedImageIndex + 1) % images.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImageIndex, images.length]);

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      window.scrollTo({ top: elementRect - bodyRect - offset, behavior: "smooth" });
    }
  };

  return (
    <section id="pricing" className="relative overflow-hidden bg-[#FAFAFA] py-24 md:py-32">
      {/* Background Decorative Glows */}
      <div className="pointer-events-none absolute left-[5%] top-20 h-96 w-96 rounded-full bg-brand-orange/5 blur-[130px]" />
      <div className="pointer-events-none absolute bottom-20 right-[5%] h-96 w-96 rounded-full bg-brand-blue/5 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-12">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
          <div className="flex items-center justify-center gap-2.5 sm:gap-3 mb-3">
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 rounded-full border border-brand-orange/20 bg-brand-orange/10 px-3.5 sm:px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-brand-orange font-lemon-milk"
            >
              <Sparkles className="h-3.5 w-3.5" />
              {t.eyebrow}
            </motion.span>

            {/* Language Switcher Pill */}
            <div className="inline-flex items-center gap-1 rounded-full border border-brand-blue/15 bg-white p-1 text-[11px] font-bold font-lemon-milk shadow-xs">
              <Globe className="h-3 w-3 text-brand-blue/60 ml-1.5 mr-0.5" />
              <button
                onClick={() => changeLocale("en")}
                className={`rounded-full px-2.5 py-0.5 transition-all cursor-pointer ${
                  locale === "en"
                    ? "bg-brand-orange text-white shadow-xs"
                    : "text-brand-blue/70 hover:text-brand-orange"
                }`}
                aria-label="Switch to English"
              >
                EN
              </button>
              <button
                onClick={() => changeLocale("fr")}
                className={`rounded-full px-2.5 py-0.5 transition-all cursor-pointer ${
                  locale === "fr"
                    ? "bg-brand-orange text-white shadow-xs"
                    : "text-brand-blue/70 hover:text-brand-orange"
                }`}
                aria-label="Passer en Français"
              >
                FR
              </button>
            </div>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 sm:mb-5 text-2xl sm:text-4xl md:text-5xl font-semibold uppercase tracking-tight text-brand-blue font-lemon-milk"
          >
            {t.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-xs sm:text-sm md:text-base font-light leading-relaxed text-brand-blue/75 px-2"
          >
            {t.description}
          </motion.p>
          <div className="mx-auto mt-5 sm:mt-6 h-1 w-20 rounded-full bg-brand-orange" />
        </div>

        {/* Section Category Filter Tabs */}
        <div className="mb-12 md:mb-16 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 md:gap-3">
          {[
            { id: "all", label: t.tabs.all, icon: Layers },
            { id: "hourly", label: t.tabs.hourly, icon: Clock },
            { id: "abonnements", label: t.tabs.abonnements, icon: Calendar },
            { id: "meeting", label: t.tabs.meeting, icon: Users },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`inline-flex items-center gap-1.5 sm:gap-2 rounded-full px-3.5 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-300 font-lemon-milk cursor-pointer ${
                  isActive
                    ? "bg-brand-orange text-white shadow-[0_4px_16px_rgba(196,99,64,0.3)] scale-102"
                    : "bg-white text-brand-blue/80 border border-brand-blue/15 hover:border-brand-orange/40 hover:text-brand-orange"
                }`}
              >
                <Icon className="h-3.5 sm:h-4 w-3.5 sm:w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* 1. SUBSECTION: HOURLY PASSES (DAY & NIGHT SHIFT)                          */}
        {/* ========================================================================= */}
        {(activeTab === "all" || activeTab === "hourly") && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-24 rounded-3xl border border-brand-blue/15 bg-white p-6 md:p-10 shadow-[0_4px_24px_rgba(93,120,163,0.06)]"
          >
            {/* Header of Subsection 1 */}
            <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-brand-blue/10 pb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange font-lemon-milk">
                  {t.hourly.tag}
                </span>
                <h3 className="mt-1 text-2xl md:text-3xl font-bold uppercase tracking-tight text-brand-blue font-lemon-milk">
                  {t.hourly.title}
                </h3>
                <p className="mt-1 text-sm font-light text-brand-blue/70">
                  {t.hourly.subtitle}
                </p>
              </div>

              {/* Day / Night Shift Selector Pill */}
              <div className="flex items-center gap-1.5 rounded-full bg-slate-100 p-1.5 border border-brand-blue/10 self-start md:self-auto">
                <button
                  onClick={() => setActiveShift("day")}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all font-lemon-milk cursor-pointer ${
                    activeShift === "day"
                      ? "bg-brand-orange text-white shadow-sm"
                      : "text-brand-blue/70 hover:text-brand-blue"
                  }`}
                >
                  <Sun className="h-3.5 w-3.5" />
                  {t.hourly.dayBtn}
                </button>
                <button
                  onClick={() => setActiveShift("night")}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all font-lemon-milk cursor-pointer ${
                    activeShift === "night"
                      ? "bg-brand-blue text-white shadow-sm"
                      : "text-brand-blue/70 hover:text-brand-blue"
                  }`}
                >
                  <Moon className="h-3.5 w-3.5" />
                  {t.hourly.nightBtn}
                </button>
              </div>
            </div>

            {/* Content Grid: Interactive Table + Poster Visual */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left/Main Column: Pricing Cards / Table */}
              <div className="lg:col-span-7 flex flex-col gap-4">
                {/* Active Shift Banner */}
                <div
                  className={`flex items-center justify-between rounded-2xl px-5 py-3 text-xs font-bold font-lemon-milk ${
                    activeShift === "day"
                      ? "bg-amber-500/10 text-brand-orange border border-brand-orange/20"
                      : "bg-brand-blue/10 text-brand-blue border border-brand-blue/20"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {activeShift === "day" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                    <span>{activeShift === "day" ? t.hourly.dayBanner : t.hourly.nightBanner}</span>
                  </div>
                  <span className="hidden sm:inline text-[11px] opacity-80">
                    {t.hourly.spaceSub}
                  </span>
                </div>

                {/* Cards List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {shiftList.map((item) => (
                    <div
                      key={item.name}
                      className={`relative flex flex-col justify-between rounded-2xl border p-5 transition-all duration-300 hover:shadow-lg ${
                        item.popular
                          ? "border-brand-orange bg-gradient-to-br from-brand-orange/5 via-white to-white shadow-sm"
                          : "border-brand-blue/15 bg-white hover:border-brand-blue/30"
                      }`}
                    >
                      {item.popular && (
                        <span className="absolute -top-3 right-4 rounded-full bg-brand-orange px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white font-lemon-milk shadow-xs">
                          {t.hourly.popular}
                        </span>
                      )}

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-base font-bold uppercase tracking-wide text-brand-blue font-lemon-milk">
                            {item.name}
                          </h4>
                          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-brand-blue font-lemon-milk">
                            <Clock className="h-3 w-3 text-brand-orange" />
                            {item.hours}
                          </span>
                        </div>
                        <p className="text-xs text-brand-blue/60 mb-4">
                          {t.hourly.duration}: {item.hours}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-3 border-t border-brand-blue/10 pt-3">
                        <div className="rounded-xl bg-slate-50 p-2.5 text-center border border-slate-200/60">
                          <span className="block text-[10px] font-bold uppercase tracking-wider text-brand-blue/70 font-lemon-milk">
                            {t.hourly.openSpace}
                          </span>
                          <span className="text-lg font-bold text-brand-blue font-lemon-milk">
                            {item.openSpace}
                          </span>
                        </div>
                        <div className="rounded-xl bg-brand-orange/5 p-2.5 text-center border border-brand-orange/20">
                          <span className="block text-[10px] font-bold uppercase tracking-wider text-brand-orange font-lemon-milk">
                            {t.hourly.lab}
                          </span>
                          <span className="text-lg font-bold text-brand-orange font-lemon-milk">
                            {item.lab}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Additional Information Banner */}
                <div className="mt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-2xl border border-brand-blue/15 bg-slate-50 p-4 text-xs text-brand-blue/80">
                  <div className="flex items-center gap-2">
                    <Info className="h-4 w-4 text-brand-orange shrink-0" />
                    <span>
                      <strong>{t.hourly.reservationNotice}</strong> {t.hourly.reservationNoticeDetail}
                    </span>
                  </div>
                  <button
                    onClick={scrollToContact}
                    className="inline-flex items-center gap-1 text-xs font-bold text-brand-orange hover:underline font-lemon-milk shrink-0 cursor-pointer"
                  >
                    {t.hourly.reserveDesk} <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Right Column: Original Poster Visual with Lightbox Button */}
              <div className="lg:col-span-5 flex flex-col">
                <div className="group relative overflow-hidden rounded-2xl border border-brand-blue/20 bg-slate-900 shadow-md">
                  <div className="relative aspect-[3/4] w-full overflow-hidden">
                    <Image
                      src="/assets/ilovepdf_pages-to-jpg/a4_page-0001.jpg"
                      alt={t.hourly.posterTitle}
                      fill
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 opacity-60 transition-opacity group-hover:opacity-40" />

                    {/* Badge Overlay */}
                    <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-blue shadow-sm font-lemon-milk">
                      <Sparkles className="h-3 w-3 text-brand-orange" />
                      {t.hourly.officialBadge}
                    </span>

                    {/* Enlarge Click Action */}
                    <button
                      onClick={() => setSelectedImageIndex(0)}
                      className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-black/40 cursor-pointer"
                      aria-label={t.hourly.enlargeNotice}
                    >
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-brand-orange shadow-lg transition-transform duration-300 group-hover:scale-110">
                        <Maximize2 className="h-5 w-5" />
                      </span>
                      <span className="rounded-full bg-black/70 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white font-lemon-milk backdrop-blur-xs">
                        {t.hourly.enlargeNotice}
                      </span>
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white border-t border-brand-blue/10">
                    <div>
                      <h4 className="text-xs font-bold uppercase text-brand-blue font-lemon-milk">
                        {t.hourly.posterTitle}
                      </h4>
                      <p className="text-[11px] text-brand-blue/60">{t.hourly.posterSub}</p>
                    </div>
                    <button
                      onClick={() => setSelectedImageIndex(0)}
                      className="inline-flex items-center gap-1 rounded-full bg-brand-orange/10 px-3 py-1 text-xs font-bold uppercase text-brand-orange hover:bg-brand-orange hover:text-white transition-colors font-lemon-milk cursor-pointer"
                    >
                      <Maximize2 className="h-3.5 w-3.5" />
                      {t.hourly.zoom}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================================= */}
        {/* 2. SUBSECTION: SUBSCRIPTIONS & MEMBERSHIPS                                */}
        {/* ========================================================================= */}
        {(activeTab === "all" || activeTab === "abonnements") && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-24 rounded-3xl border border-brand-blue/15 bg-white p-6 md:p-10 shadow-[0_4px_24px_rgba(93,120,163,0.06)]"
          >
            {/* Header of Subsection 2 */}
            <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-brand-blue/10 pb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange font-lemon-milk">
                  {t.abonnements.tag}
                </span>
                <h3 className="mt-1 text-2xl md:text-3xl font-bold uppercase tracking-tight text-brand-blue font-lemon-milk">
                  {t.abonnements.title}
                </h3>
                <p className="mt-1 text-sm font-light text-brand-blue/70">
                  {t.abonnements.subtitle}
                </p>
              </div>

              {/* 16H vs 24H Toggle */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                <div className="flex items-center gap-1.5 rounded-full bg-slate-100 p-1.5 border border-brand-blue/10">
                  <button
                    onClick={() => setAccessMode("16h")}
                    className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all font-lemon-milk cursor-pointer ${
                      accessMode === "16h"
                        ? "bg-brand-blue text-white shadow-sm"
                        : "text-brand-blue/70 hover:text-brand-blue"
                    }`}
                  >
                    <span>{t.abonnements.btn16h}</span>
                    <span className="opacity-80">{t.abonnements.btn16hSub}</span>
                  </button>
                  <button
                    onClick={() => setAccessMode("24h")}
                    className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all font-lemon-milk cursor-pointer ${
                      accessMode === "24h"
                        ? "bg-brand-orange text-white shadow-sm"
                        : "text-brand-blue/70 hover:text-brand-blue"
                    }`}
                  >
                    <span>{t.abonnements.btn24h}</span>
                    <span className="opacity-80">{t.abonnements.btn24hSub}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Sub-Filter: Short Term vs Long Term vs All */}
            <div className="mb-8 flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase text-brand-blue/70 font-lemon-milk">
                  {t.abonnements.scopeLabel}
                </span>
                <div className="inline-flex rounded-lg bg-slate-100 p-1 text-xs font-semibold font-lemon-milk">
                  <button
                    onClick={() => setSubTier("all")}
                    className={`rounded-md px-3 py-1 cursor-pointer transition-colors ${
                      subTier === "all" ? "bg-white text-brand-blue shadow-xs" : "text-brand-blue/60 hover:text-brand-blue"
                    }`}
                  >
                    {t.abonnements.scopeAll}
                  </button>
                  <button
                    onClick={() => setSubTier("short")}
                    className={`rounded-md px-3 py-1 cursor-pointer transition-colors ${
                      subTier === "short" ? "bg-white text-brand-blue shadow-xs" : "text-brand-blue/60 hover:text-brand-blue"
                    }`}
                  >
                    {t.abonnements.scopeShort}
                  </button>
                  <button
                    onClick={() => setSubTier("long")}
                    className={`rounded-md px-3 py-1 cursor-pointer transition-colors ${
                      subTier === "long" ? "bg-white text-brand-blue shadow-xs" : "text-brand-blue/60 hover:text-brand-blue"
                    }`}
                  >
                    {t.abonnements.scopeLong}
                  </button>
                </div>
              </div>

              <div className="text-xs text-brand-blue/70 font-medium">
                {t.abonnements.showingFor}{" "}
                <span className="font-bold text-brand-orange font-lemon-milk">
                  {accessMode === "16h" ? t.abonnements.label16h : t.abonnements.label24h}
                </span>
              </div>
            </div>

            {/* Membership Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
              {(subTier === "long" ? [] : shortPlans).map((plan) => {
                const pricing = accessMode === "16h" ? plan.access16h : plan.access24h;
                return (
                  <div
                    key={plan.code}
                    className={`relative flex flex-col justify-between rounded-2xl border p-5 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                      plan.popular
                        ? "border-brand-orange bg-gradient-to-b from-brand-orange/5 via-white to-white shadow-sm ring-1 ring-brand-orange/30"
                        : "border-brand-blue/15 bg-white"
                    }`}
                  >
                    {plan.badge && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-orange px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white font-lemon-milk shadow-xs whitespace-nowrap">
                        {plan.badge}
                      </span>
                    )}

                    <div>
                      <div className="flex items-center justify-between border-b border-brand-blue/10 pb-3 mb-3">
                        <span className="text-xs font-bold text-brand-orange font-lemon-milk tracking-wider">
                          {plan.code}
                        </span>
                        <span className="text-xs font-semibold text-brand-blue/70">
                          {accessMode === "16h" ? t.abonnements.plan16hTag : t.abonnements.plan24hTag}
                        </span>
                      </div>

                      <h4 className="text-xl font-bold uppercase text-brand-blue font-lemon-milk">
                        {plan.duration}
                      </h4>
                      <p className="text-xs text-brand-blue/60 mb-4">{plan.subtext}</p>
                    </div>

                    <div className="space-y-2.5 border-t border-brand-blue/10 pt-3">
                      <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-xs">
                        <span className="font-semibold text-brand-blue/70">{t.abonnements.openSpace}</span>
                        <span className="text-base font-bold text-brand-blue font-lemon-milk">
                          {pricing.openSpace}
                        </span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-brand-orange/5 px-3 py-2 text-xs border border-brand-orange/15">
                        <span className="font-semibold text-brand-orange">{t.abonnements.lab}</span>
                        <span className="text-base font-bold text-brand-orange font-lemon-milk">
                          {pricing.lab}
                        </span>
                      </div>

                      <button
                        onClick={scrollToContact}
                        className="mt-2 w-full rounded-xl bg-brand-blue/5 hover:bg-brand-orange hover:text-white py-2 text-xs font-bold uppercase tracking-wider text-brand-blue transition-all font-lemon-milk cursor-pointer"
                      >
                        {t.abonnements.subscribe}
                      </button>
                    </div>
                  </div>
                );
              })}

              {(subTier === "short" ? [] : longPlans).map((plan) => {
                const pricing = accessMode === "16h" ? plan.access16h : plan.access24h;
                return (
                  <div
                    key={plan.code}
                    className={`relative flex flex-col justify-between rounded-2xl border p-5 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                      plan.popular
                        ? "border-brand-orange bg-gradient-to-b from-brand-orange/5 via-white to-white shadow-sm ring-1 ring-brand-orange/30"
                        : "border-brand-blue/15 bg-white"
                    }`}
                  >
                    {plan.badge && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-blue px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white font-lemon-milk shadow-xs whitespace-nowrap">
                        {plan.badge}
                      </span>
                    )}

                    <div>
                      <div className="flex items-center justify-between border-b border-brand-blue/10 pb-3 mb-3">
                        <span className="text-xs font-bold text-brand-blue font-lemon-milk tracking-wider">
                          {plan.code}
                        </span>
                        <span className="text-xs font-semibold text-brand-blue/70">
                          {accessMode === "16h" ? t.abonnements.plan16hTag : t.abonnements.plan24hTag}
                        </span>
                      </div>

                      <h4 className="text-xl font-bold uppercase text-brand-blue font-lemon-milk">
                        {plan.duration}
                      </h4>
                      <p className="text-xs text-brand-blue/60 mb-4">{plan.subtext}</p>
                    </div>

                    <div className="space-y-2.5 border-t border-brand-blue/10 pt-3">
                      <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-xs">
                        <span className="font-semibold text-brand-blue/70">{t.abonnements.openSpace}</span>
                        <span className="text-base font-bold text-brand-blue font-lemon-milk">
                          {pricing.openSpace}
                        </span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-brand-orange/5 px-3 py-2 text-xs border border-brand-orange/15">
                        <span className="font-semibold text-brand-orange">{t.abonnements.lab}</span>
                        <span className="text-base font-bold text-brand-orange font-lemon-milk">
                          {pricing.lab}
                        </span>
                      </div>

                      <button
                        onClick={scrollToContact}
                        className="mt-2 w-full rounded-xl bg-brand-blue/5 hover:bg-brand-orange hover:text-white py-2 text-xs font-bold uppercase tracking-wider text-brand-blue transition-all font-lemon-milk cursor-pointer"
                      >
                        {t.abonnements.subscribe}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Official Subscription Posters (Both Page 2 & Page 3) */}
            <div className="border-t border-brand-blue/10 pt-8">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold uppercase text-brand-blue font-lemon-milk">
                    {t.abonnements.officialHeader}
                  </h4>
                  <p className="text-xs text-brand-blue/70">
                    {t.abonnements.officialSub}
                  </p>
                </div>
                <span className="text-xs font-bold text-brand-orange font-lemon-milk hidden sm:inline">
                  {t.abonnements.clickAny}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Poster 2: Short Term */}
                <div className="group relative overflow-hidden rounded-2xl border border-brand-blue/20 bg-slate-900 shadow-md">
                  <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full overflow-hidden">
                    <Image
                      src="/assets/ilovepdf_pages-to-jpg/a4_page-0002.jpg"
                      alt={t.abonnements.posterShortTitle}
                      fill
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 opacity-60 transition-opacity group-hover:opacity-40" />

                    <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-blue shadow-sm font-lemon-milk">
                      <Calendar className="h-3 w-3 text-brand-orange" />
                      {t.abonnements.posterShortBadge}
                    </span>

                    <button
                      onClick={() => setSelectedImageIndex(1)}
                      className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-black/40 cursor-pointer"
                      aria-label={t.abonnements.viewPoster1}
                    >
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-brand-orange shadow-lg transition-transform duration-300 group-hover:scale-110">
                        <Maximize2 className="h-5 w-5" />
                      </span>
                      <span className="rounded-full bg-black/70 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white font-lemon-milk backdrop-blur-xs">
                        {t.abonnements.viewPoster1}
                      </span>
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white border-t border-brand-blue/10">
                    <div>
                      <h5 className="text-xs font-bold uppercase text-brand-blue font-lemon-milk">
                        {t.abonnements.posterShortTitle}
                      </h5>
                      <p className="text-[11px] text-brand-blue/60">{t.abonnements.posterShortSub}</p>
                    </div>
                    <button
                      onClick={() => setSelectedImageIndex(1)}
                      className="inline-flex items-center gap-1 rounded-full bg-brand-orange/10 px-3 py-1 text-xs font-bold uppercase text-brand-orange hover:bg-brand-orange hover:text-white transition-colors font-lemon-milk cursor-pointer"
                    >
                      <Maximize2 className="h-3.5 w-3.5" />
                      {t.abonnements.zoom}
                    </button>
                  </div>
                </div>

                {/* Poster 3: Long Term */}
                <div className="group relative overflow-hidden rounded-2xl border border-brand-blue/20 bg-slate-900 shadow-md">
                  <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full overflow-hidden">
                    <Image
                      src="/assets/ilovepdf_pages-to-jpg/a4_page-0003.jpg"
                      alt={t.abonnements.posterLongTitle}
                      fill
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 opacity-60 transition-opacity group-hover:opacity-40" />

                    <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-blue shadow-sm font-lemon-milk">
                      <Calendar className="h-3 w-3 text-brand-orange" />
                      {t.abonnements.posterLongBadge}
                    </span>

                    <button
                      onClick={() => setSelectedImageIndex(2)}
                      className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-black/40 cursor-pointer"
                      aria-label={t.abonnements.viewPoster2}
                    >
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-brand-orange shadow-lg transition-transform duration-300 group-hover:scale-110">
                        <Maximize2 className="h-5 w-5" />
                      </span>
                      <span className="rounded-full bg-black/70 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white font-lemon-milk backdrop-blur-xs">
                        {t.abonnements.viewPoster2}
                      </span>
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white border-t border-brand-blue/10">
                    <div>
                      <h5 className="text-xs font-bold uppercase text-brand-blue font-lemon-milk">
                        {t.abonnements.posterLongTitle}
                      </h5>
                      <p className="text-[11px] text-brand-blue/60">{t.abonnements.posterLongSub}</p>
                    </div>
                    <button
                      onClick={() => setSelectedImageIndex(2)}
                      className="inline-flex items-center gap-1 rounded-full bg-brand-orange/10 px-3 py-1 text-xs font-bold uppercase text-brand-orange hover:bg-brand-orange hover:text-white transition-colors font-lemon-milk cursor-pointer"
                    >
                      <Maximize2 className="h-3.5 w-3.5" />
                      {t.abonnements.zoom}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================================= */}
        {/* 3. SUBSECTION: MEETING ROOM (SALLE DE RÉUNION)                            */}
        {/* ========================================================================= */}
        {(activeTab === "all" || activeTab === "meeting") && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-brand-blue/15 bg-white p-6 md:p-10 shadow-[0_4px_24px_rgba(93,120,163,0.06)]"
          >
            {/* Header of Subsection 3 */}
            <div className="mb-8 border-b border-brand-blue/10 pb-6">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange font-lemon-milk">
                {t.meeting.tag}
              </span>
              <h3 className="mt-1 text-2xl md:text-3xl font-bold uppercase tracking-tight text-brand-blue font-lemon-milk">
                {t.meeting.title}
              </h3>
              <p className="mt-1 text-sm font-light text-brand-blue/70">
                {t.meeting.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Hourly Breakdown & Policies */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                {/* 4 Pricing Tiers */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {meetingTiers.map((tier) => (
                    <div
                      key={tier.duration}
                      className={`relative flex flex-col justify-between rounded-2xl border p-4 text-center transition-all duration-300 hover:shadow-md ${
                        tier.popular
                          ? "border-brand-orange bg-brand-orange/5 shadow-xs ring-1 ring-brand-orange/30"
                          : "border-brand-blue/15 bg-white"
                      }`}
                    >
                      {tier.popular && (
                        <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-brand-orange px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white font-lemon-milk">
                          {t.meeting.popular}
                        </span>
                      )}
                      <div>
                        <span className="text-xs font-bold text-brand-blue font-lemon-milk block">
                          {tier.duration}
                        </span>
                        <span className="text-[10px] text-brand-blue/60 uppercase font-lemon-milk">
                          {t.meeting.labTag}
                        </span>
                      </div>
                      <div className="my-3">
                        <span className="text-2xl font-bold text-brand-orange font-lemon-milk">
                          {tier.price}
                        </span>
                      </div>
                      <span className="text-[10px] text-brand-blue/70 leading-tight">
                        {tier.desc}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Important Booking Policies from Poster 4 */}
                <div className="rounded-2xl border border-brand-orange/20 bg-brand-orange/5 p-5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-brand-orange font-lemon-milk mb-3 flex items-center gap-2">
                    <ShieldAlert className="h-4 w-4" />
                    {t.meeting.termsTitle}
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-brand-blue/85">
                    <li className="flex items-start gap-2 rounded-xl bg-white/80 p-3 border border-brand-orange/10">
                      <Check className="h-4 w-4 text-brand-orange shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-brand-blue font-lemon-milk text-[11px]">
                          {t.meeting.policy1Label}
                        </strong>
                        {t.meeting.policy1Desc}
                      </div>
                    </li>
                    <li className="flex items-start gap-2 rounded-xl bg-white/80 p-3 border border-brand-orange/10">
                      <Check className="h-4 w-4 text-brand-orange shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-brand-blue font-lemon-milk text-[11px]">
                          {t.meeting.policy2Label}
                        </strong>
                        {t.meeting.policy2Desc}
                      </div>
                    </li>
                    <li className="flex items-start gap-2 rounded-xl bg-white/80 p-3 border border-brand-orange/10">
                      <Check className="h-4 w-4 text-brand-orange shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-brand-blue font-lemon-milk text-[11px]">
                          {t.meeting.policy3Label}
                        </strong>
                        {t.meeting.policy3Desc}
                      </div>
                    </li>
                  </ul>
                </div>

                {/* CTA Box */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl bg-brand-blue p-6 text-white shadow-md">
                  <div>
                    <h4 className="text-base font-bold uppercase font-lemon-milk tracking-wide">
                      {t.meeting.ctaTitle}
                    </h4>
                    <p className="text-xs font-light text-white/80 mt-1">
                      {t.meeting.ctaDesc}
                    </p>
                  </div>
                  <button
                    onClick={scrollToContact}
                    className="inline-flex items-center gap-2 rounded-full bg-brand-orange hover:bg-brand-orange/90 text-white px-6 py-3 text-xs font-bold uppercase tracking-wider transition-all font-lemon-milk whitespace-nowrap shadow-sm cursor-pointer"
                  >
                    {t.meeting.ctaBtn}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Right Column: Original Poster Visual with Lightbox */}
              <div className="lg:col-span-5 flex flex-col">
                <div className="group relative overflow-hidden rounded-2xl border border-brand-blue/20 bg-slate-900 shadow-md">
                  <div className="relative aspect-[3/4] w-full overflow-hidden">
                    <Image
                      src="/assets/ilovepdf_pages-to-jpg/a4_page-0004.jpg"
                      alt={t.meeting.posterTitle}
                      fill
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 opacity-60 transition-opacity group-hover:opacity-40" />

                    <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-blue shadow-sm font-lemon-milk">
                      <Users className="h-3 w-3 text-brand-orange" />
                      {t.meeting.posterBadge}
                    </span>

                    <button
                      onClick={() => setSelectedImageIndex(3)}
                      className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-black/40 cursor-pointer"
                      aria-label={t.meeting.enlargeNotice}
                    >
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-brand-orange shadow-lg transition-transform duration-300 group-hover:scale-110">
                        <Maximize2 className="h-5 w-5" />
                      </span>
                      <span className="rounded-full bg-black/70 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white font-lemon-milk backdrop-blur-xs">
                        {t.meeting.enlargeNotice}
                      </span>
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white border-t border-brand-blue/10">
                    <div>
                      <h4 className="text-xs font-bold uppercase text-brand-blue font-lemon-milk">
                        {t.meeting.posterTitle}
                      </h4>
                      <p className="text-[11px] text-brand-blue/60">{t.meeting.posterSub}</p>
                    </div>
                    <button
                      onClick={() => setSelectedImageIndex(3)}
                      className="inline-flex items-center gap-1 rounded-full bg-brand-orange/10 px-3 py-1 text-xs font-bold uppercase text-brand-orange hover:bg-brand-orange hover:text-white transition-colors font-lemon-milk cursor-pointer"
                    >
                      <Maximize2 className="h-3.5 w-3.5" />
                      {t.meeting.zoom}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* HIGH RESOLUTION LIGHTBOX MODAL FOR ALL 4 POSTERS                          */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-blue/95 p-4 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-label="Price sheet viewer"
          >
            {/* Click backdrop to close */}
            <button
              type="button"
              onClick={() => setSelectedImageIndex(null)}
              className="absolute inset-0 cursor-default"
              aria-label="Close viewer"
            />

            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative z-10 flex flex-col h-full w-full max-w-5xl items-center justify-center pointer-events-none"
            >
              {/* Top Bar with Info & Close */}
              <div className="pointer-events-auto mb-3 flex w-full items-center justify-between px-2 text-white">
                <div>
                  <h3 className="text-sm md:text-base font-bold uppercase tracking-wider font-lemon-milk">
                    {images[selectedImageIndex].title}
                  </h3>
                  <p className="text-xs text-white/70">
                    {images[selectedImageIndex].subtitle} • {t.lightbox.pageOf}{" "}
                    {selectedImageIndex + 1} {t.lightbox.of} {images.length}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedImageIndex(null)}
                  className="rounded-full bg-white/90 p-2.5 text-brand-blue transition-colors hover:bg-brand-orange hover:text-white cursor-pointer shadow-lg"
                  aria-label="Close price poster"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Poster Image Container */}
              <div className="pointer-events-auto relative flex max-h-[82vh] w-auto max-w-full items-center justify-center overflow-hidden rounded-2xl bg-white shadow-2xl">
                <Image
                  src={images[selectedImageIndex].src}
                  alt={images[selectedImageIndex].title}
                  width={1400}
                  height={1980}
                  className="max-h-[82vh] w-auto max-w-full object-contain"
                  priority
                />
              </div>

              {/* Navigation Buttons */}
              <button
                type="button"
                onClick={() =>
                  setSelectedImageIndex(
                    (selectedImageIndex + images.length - 1) % images.length
                  )
                }
                className="pointer-events-auto absolute left-2 md:left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 text-brand-blue transition-colors hover:bg-brand-orange hover:text-white cursor-pointer shadow-xl"
                aria-label="Previous poster"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <button
                type="button"
                onClick={() =>
                  setSelectedImageIndex((selectedImageIndex + 1) % images.length)
                }
                className="pointer-events-auto absolute right-2 md:right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 text-brand-blue transition-colors hover:bg-brand-orange hover:text-white cursor-pointer shadow-xl"
                aria-label="Next poster"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
