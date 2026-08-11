"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { ChevronsRight, Check } from "lucide-react";

interface SlideToUnlockProps {
  onSuccess?: () => void;
  label?: string;
}

export default function SlideToUnlock({
  onSuccess,
  label = "slide to save progress",
}: SlideToUnlockProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [maxDrag, setMaxDrag] = useState(200);
  const [unlocked, setUnlocked] = useState(false);
  const x = useMotionValue(0);

  // Compute maximum drag distance based on container width minus handle width
  useEffect(() => {
    const updateMaxDrag = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const handleWidth = 48; // 12 * 4 (w-12)
        const padding = 8; // 4px padding on each side
        setMaxDrag(Math.max(0, containerWidth - handleWidth - padding));
      }
    };
    updateMaxDrag();
    window.addEventListener("resize", updateMaxDrag);
    return () => window.removeEventListener("resize", updateMaxDrag);
  }, []);

  // Text opacity fades as user drags right
  const textOpacity = useTransform(x, [0, maxDrag * 0.6], [1, 0.1]);

  const handleDragEnd = () => {
    const currentX = x.get();
    if (currentX >= maxDrag * 0.85) {
      setUnlocked(true);
      if (onSuccess) onSuccess();
      setTimeout(() => {
        setUnlocked(false);
        x.set(0);
      }, 2000);
    } else {
      x.set(0);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-72 sm:w-80 h-14 rounded-full bg-black/40 border border-white/25 backdrop-blur-xl p-1 shadow-[0_10px_30px_rgba(0,0,0,0.3)] overflow-hidden flex items-center select-none"
    >
      {/* Animated Shimmer Background Text */}
      <motion.span
        style={{ opacity: textOpacity }}
        className="absolute inset-0 flex items-center justify-center text-xs font-bold uppercase tracking-[0.2em] text-white/90 font-lemon-milk pointer-events-none pl-6"
      >
        <span className="bg-gradient-to-r from-white/70 via-white to-white/70 bg-clip-text text-transparent animate-pulse">
          {unlocked ? "unlocked!" : label}
        </span>
      </motion.span>

      {/* Draggable Slider Handle (iPhone style) */}
      <motion.div
        drag={unlocked ? false : "x"}
        dragConstraints={{ left: 0, right: maxDrag }}
        dragElastic={0.05}
        dragSnapToOrigin={false}
        style={{ x }}
        onDragEnd={handleDragEnd}
        animate={unlocked ? { x: maxDrag } : undefined}
        className={`z-10 w-12 h-12 rounded-full flex items-center justify-center shadow-lg cursor-grab active:cursor-grabbing transition-colors duration-300 ${
          unlocked
            ? "bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.6)]"
            : "bg-brand-orange text-white hover:bg-brand-orange/90 shadow-[0_0_15px_rgba(196,99,64,0.5)]"
        }`}
      >
        {unlocked ? (
          <Check className="w-5 h-5 animate-bounce" />
        ) : (
          <ChevronsRight className="w-5 h-5 animate-pulse" />
        )}
      </motion.div>
    </div>
  );
}
