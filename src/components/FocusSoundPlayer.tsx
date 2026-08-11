"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Play, Pause, Music, CloudRain, Coffee, Sparkles, ChevronDown } from "lucide-react";

interface SoundTrack {
  id: string;
  name: string;
  type: "rain" | "cafe" | "white";
  icon: typeof CloudRain;
}

const tracks: SoundTrack[] = [
  { id: "rain", name: "Focus Rain", type: "rain", icon: CloudRain },
  { id: "cafe", name: "Cozy Lounge", type: "cafe", icon: Coffee },
  { id: "white", name: "Deep Work Noise", type: "white", icon: Sparkles },
];

export default function FocusSoundPlayer() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTrack, setActiveTrack] = useState<SoundTrack>(tracks[0]);
  const [volume, setVolume] = useState(0.4);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const noiseSourceRef = useRef<AudioNode | null>(null);

  // Web Audio Synthesizer for ambient sounds (Rain, Lounge Noise, White Noise)
  const startAudio = (type: "rain" | "cafe" | "white") => {
    stopAudio();

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const bufferSize = 2 * ctx.sampleRate;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);

      // Generate brown/pink noise depending on sound type
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        if (type === "rain") {
          // Brown noise curve (Rain sound)
          output[i] = (lastOut + 0.02 * white) / 1.02;
          lastOut = output[i];
          output[i] *= 3.5;
        } else if (type === "cafe") {
          // Soft ambient filter
          output[i] = (lastOut + 0.05 * white) / 1.05;
          lastOut = output[i];
          output[i] *= 2.0;
        } else {
          // Soft white noise
          output[i] = white * 0.15;
        }
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      // Lowpass filter for smooth warmth
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = type === "rain" ? 800 : type === "cafe" ? 1200 : 3000;

      const gain = ctx.createGain();
      gain.gain.value = volume;
      gainNodeRef.current = gain;

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      whiteNoise.start(0);
      noiseSourceRef.current = whiteNoise;
    } catch {
      // Browser audio policy fallback
    }
  };

  const stopAudio = () => {
    if (noiseSourceRef.current) {
      try {
        (noiseSourceRef.current as AudioBufferSourceNode).stop();
      } catch {
        // Ignored
      }
      noiseSourceRef.current = null;
    }
    if (audioCtxRef.current) {
      try {
        audioCtxRef.current.close();
      } catch {
        // Ignored
      }
      audioCtxRef.current = null;
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopAudio();
      setIsPlaying(false);
    } else {
      startAudio(activeTrack.type);
      setIsPlaying(true);
    }
  };

  const selectTrack = (track: SoundTrack) => {
    setActiveTrack(track);
    if (isPlaying) {
      startAudio(track.type);
    }
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = newVol;
    }
  };

  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  return (
    <aside aria-label="Focus Audio Player" className="fixed bottom-6 right-6 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="mb-3 w-72 rounded-2xl bg-[#5D78A3]/95 border border-white/20 p-5 shadow-2xl backdrop-blur-xl text-white"
          >
            <div className="flex items-center justify-between mb-4 border-b border-white/20 pb-3">
              <div className="flex items-center gap-2">
                <Music className="w-4 h-4 text-brand-orange animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider font-lemon-milk">
                  Focus Ambience
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/70 hover:text-white transition-colors"
                aria-label="Minimize sound player"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {/* Track Selector Buttons */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              {tracks.map((track) => {
                const Icon = track.icon;
                const isActive = activeTrack.id === track.id;
                return (
                  <button
                    key={track.id}
                    onClick={() => selectTrack(track)}
                    className={`flex flex-col items-center gap-1.5 p-2.5 rounded-xl border text-[10px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer font-lemon-milk ${
                      isActive
                        ? "bg-brand-orange border-brand-orange text-white shadow-md"
                        : "bg-white/10 border-white/15 text-white/80 hover:bg-white/20"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="truncate max-w-full">{track.name.split(" ")[0]}</span>
                  </button>
                );
              })}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className="w-10 h-10 rounded-full bg-brand-orange text-white flex items-center justify-center shadow-lg hover:bg-brand-orange/90 transition-all cursor-pointer shrink-0"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              </button>

              <div className="flex-grow flex items-center gap-2">
                <button
                  onClick={() => handleVolumeChange(volume === 0 ? 0.4 : 0)}
                  className="text-white/80 hover:text-white"
                >
                  {volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-brand-orange"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2.5 px-4 py-3 rounded-full shadow-2xl border transition-all duration-300 cursor-pointer backdrop-blur-xl ${
          isPlaying
            ? "bg-brand-orange text-white border-brand-orange/50 shadow-[0_0_20px_rgba(196,99,64,0.5)]"
            : "bg-[#5D78A3] text-white border-white/20 hover:bg-[#5D78A3]/90"
        }`}
      >
        <Music className={`w-4 h-4 ${isPlaying ? "animate-spin" : ""}`} />
        <span className="text-xs font-bold uppercase tracking-wider font-lemon-milk hidden sm:inline">
          {isPlaying ? "Focus Audio On" : "Focus Audio"}
        </span>
        {isPlaying && (
          <span className="flex items-center gap-0.5 h-3">
            <span className="w-0.5 h-3 bg-white animate-pulse" />
            <span className="w-0.5 h-2 bg-white animate-pulse delay-75" />
            <span className="w-0.5 h-4 bg-white animate-pulse delay-150" />
          </span>
        )}
      </motion.button>
    </aside>
  );
}
