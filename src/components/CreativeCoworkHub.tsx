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
  Play, 
  Pause, 
  RotateCcw,
  Check,
  Plus,
  Radio,
  BookOpen,
  Laptop
} from "lucide-react";

export default function CreativeCoworkHub() {
  // Mini interactive preview timer
  const [timerSeconds, setTimerSeconds] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  // Mini interactive preview to-do list
  const [tasks, setTasks] = useState([
    { id: 1, text: "Réviser cours Anatomie & Physiologie", done: true, tag: "Fac Dentaire" },
    { id: 2, text: "Préparer présentation Projet Web", done: false, tag: "Projet" },
    { id: 3, text: "Session Deep Work 50min au Lab", done: false, tag: "Focus" },
  ]);
  const [newTaskInput, setNewTaskInput] = useState("");

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, timerSeconds]);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskInput.trim()) return;
    setTasks([
      ...tasks,
      { id: Date.now(), text: newTaskInput.trim(), done: false, tag: "Personnel" }
    ]);
    setNewTaskInput("");
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const features = [
    {
      icon: Timer,
      title: "Pomodoro & Deep Work",
      desc: "Synchronisez vos cycles de concentration avec des alertes sonores et un suivi précis de vos sessions d'étude."
    },
    {
      icon: CheckSquare,
      title: "Gestionnaire de Tâches & Progrès",
      desc: "Organisez vos révisions par priorité avec sauvegarde automatique dans votre navigateur ('Save Your Progress')."
    },
    {
      icon: Users,
      title: "Mode Collab & Salles d'Étude",
      desc: "Créez une salle virtuelle avec code privé pour étudier en groupe avec vos collègues et camarades de fac."
    },
    {
      icon: Headphones,
      title: "Générateur d'Ambiance & Bruits Blancs",
      desc: "Sons de pluie, café de spécialité, vagues et ondes alpha pour masquer les bruits et maximiser votre flux."
    }
  ];

  return (
    <section id="hub" className="relative py-24 md:py-32 overflow-hidden bg-[#FAFAFA] border-t border-brand-blue/15">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-0 w-[450px] h-[450px] bg-brand-orange/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[450px] h-[450px] bg-brand-blue/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-xs font-bold uppercase tracking-[0.25em] text-brand-orange font-lemon-milk mb-4"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Espace Collaboratif & Outils Créatifs
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-semibold uppercase tracking-tight text-brand-blue font-lemon-milk mb-6"
          >
            Boostez Votre Productivité
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm md:text-base text-brand-blue/80 font-light leading-relaxed max-w-2xl mx-auto"
          >
            Une suite d'outils interactifs conçue sur-mesure pour les étudiants et coworkers de CTRL S. Travaillez seul ou synchronisez vos efforts en groupe avec notre Hub en ligne.
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="w-20 h-1 bg-brand-orange mx-auto rounded-full mt-6"
          />
        </div>

        {/* Interactive Highlight Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Feature List & Dedicated Page CTA */}
          <div className="lg:col-span-10 lg:col-start-2 flex flex-col gap-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {features.filter((feat) => feat.icon !== Headphones).map((feat, idx) => {
                const IconComponent = feat.icon;
                return (
                  <motion.div
                    key={feat.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="p-5 rounded-2xl bg-white border border-brand-blue/15 hover:border-brand-orange/50 shadow-sm hover:shadow-md transition-all group"
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

            {/* Prominent CTA Link to Full Dedicated Hub Page */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-2 p-6 rounded-2xl bg-gradient-to-r from-brand-blue to-brand-blue/90 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6"
            >
              <div className="space-y-1 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-orange font-lemon-milk">Application Web Dédiée</span>
                </div>
                <h4 className="text-lg font-bold uppercase tracking-wider font-lemon-milk">
                  Espace Focus & Collab CTRL S
                </h4>
                <p className="text-xs text-white/80 font-light">
                  Accédez au tableau de bord complet avec timer plein écran, notes de groupe et sons d'ambiance.
                </p>
              </div>

              <Link
                href="/hub"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-brand-orange hover:bg-brand-orange/90 text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-lg hover:shadow-brand-orange/40 hover:scale-105 shrink-0 font-lemon-milk cursor-pointer"
              >
                <span>Lancer l'Espace</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>

          {/* The preview is intentionally removed: the full workspace opens from the CTA above. */}
          {false && <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 bg-white rounded-3xl border border-brand-blue/20 shadow-xl p-6 sm:p-8 flex flex-col gap-6"
          >
            {/* Top Widget Header */}
            <div className="flex items-center justify-between border-b border-brand-blue/10 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="text-xs font-bold text-brand-blue uppercase tracking-widest ml-2 font-lemon-milk">
                  CTRL S Productivity Widget
                </span>
              </div>
              <span className="text-[10px] uppercase font-bold text-brand-orange bg-brand-orange/10 px-2.5 py-1 rounded-full font-lemon-milk">
                Aperçu Interactif
              </span>
            </div>

            {/* Mini Pomodoro Counter */}
            <div className="bg-[#FAFAFA] rounded-2xl p-5 border border-brand-blue/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand-orange/10 text-brand-orange flex items-center justify-center font-bold">
                  <Timer className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] uppercase font-bold text-brand-blue/60 tracking-wider font-lemon-milk block">
                    Pomodoro Session
                  </span>
                  <span className="text-3xl font-extrabold text-brand-blue tracking-tight font-mono">
                    {formatTime(timerSeconds)}
                  </span>
                </div>
              </div>

              {/* Timer Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsRunning(!isRunning)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-orange text-white text-xs font-bold uppercase tracking-wider hover:bg-brand-orange/90 transition-colors font-lemon-milk cursor-pointer shadow-sm"
                >
                  {isRunning ? <><Pause className="w-3.5 h-3.5" /> Pause</> : <><Play className="w-3.5 h-3.5" /> Démarrer</>}
                </button>
                <button
                  onClick={() => { setIsRunning(false); setTimerSeconds(25 * 60); }}
                  className="p-2 rounded-xl bg-brand-blue/10 text-brand-blue hover:bg-brand-blue/20 transition-colors cursor-pointer"
                  title="Réinitialiser"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Mini Interactive Task List */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-brand-blue uppercase tracking-wider font-lemon-milk">
                  Liste des Objectifs du Jour
                </span>
                <span className="text-[11px] text-brand-blue/60">
                  {tasks.filter(t => t.done).length} / {tasks.length} complétés
                </span>
              </div>

              <div className="space-y-2">
                {tasks.map(task => (
                  <div
                    key={task.id}
                    onClick={() => toggleTask(task.id)}
                    className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer select-none ${
                      task.done
                        ? "bg-emerald-50/60 border-emerald-200 text-emerald-800"
                        : "bg-white border-brand-blue/15 hover:border-brand-orange/40 text-brand-blue"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                        task.done ? "bg-emerald-500 border-emerald-500 text-white" : "border-brand-blue/30 bg-white"
                      }`}>
                        {task.done && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <span className={`text-xs ${task.done ? "line-through opacity-70" : "font-medium"}`}>
                        {task.text}
                      </span>
                    </div>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-brand-blue/10 text-brand-blue font-lemon-milk">
                      {task.tag}
                    </span>
                  </div>
                ))}
              </div>

              {/* Add Task Input Form */}
              <form onSubmit={addTask} className="flex gap-2 pt-1">
                <input
                  type="text"
                  value={newTaskInput}
                  onChange={(e) => setNewTaskInput(e.target.value)}
                  placeholder="Ajouter une tâche (ex: Réviser Chapitre 4)..."
                  className="flex-grow px-3.5 py-2 text-xs rounded-xl border border-brand-blue/20 focus:outline-none focus:border-brand-orange bg-white text-brand-blue placeholder:text-brand-blue/40"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 rounded-xl bg-brand-blue text-white text-xs font-bold flex items-center gap-1 hover:bg-brand-blue/90 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Ajouter</span>
                </button>
              </form>
            </div>

            {/* Live Room Peer Preview */}
            <div className="bg-brand-blue/5 rounded-2xl p-4 border border-brand-blue/10 flex items-center justify-between text-xs text-brand-blue">
              <div className="flex items-center gap-2.5">
                <Radio className="w-4 h-4 text-emerald-500 animate-pulse" />
                <span className="font-semibold font-lemon-milk uppercase tracking-wider">Salle #CTRL-S-LAB</span>
              </div>
              <span className="font-light text-[11px] text-brand-blue/70">
                8 coworkers en session focus
              </span>
            </div>
          </motion.div>}

        </div>
      </div>
    </section>
  );
}
