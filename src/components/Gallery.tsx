"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";

const galleryItems = [
  "IMG_1480", "IMG_1481", "IMG_1482", "IMG_1541", "IMG_1542", "IMG_1543", "IMG_1544", "IMG_1548", "IMG_2412",
].map((name, index) => ({
  title: `Control & Study space ${index + 1}`,
  src: `/assets/gallery/${name}.jpg`,
}));

export default function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (event.key === "Escape") setSelectedIndex(null);
      if (event.key === "ArrowLeft") setSelectedIndex((selectedIndex + galleryItems.length - 1) % galleryItems.length);
      if (event.key === "ArrowRight") setSelectedIndex((selectedIndex + 1) % galleryItems.length);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedIndex]);

  const moveSelection = (direction: number) => {
    setSelectedIndex((current) => current === null ? null : (current + direction + galleryItems.length) % galleryItems.length);
  };

  return (
    <section id="gallery" className="relative overflow-hidden bg-[#FAFAFA] py-24 md:py-32">
      <div className="pointer-events-none absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-brand-orange/5 blur-[100px] animate-float" />

      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }} className="mx-auto mb-16 max-w-2xl text-center md:mb-24">
          <span className="mb-4 block text-xs font-bold uppercase tracking-[0.3em] text-brand-orange">Space Gallery</span>
          <h2 className="mb-6 text-3xl font-semibold uppercase tracking-tight text-brand-blue md:text-5xl">Inside CTRL S</h2>
          <motion.div whileInView={{ scaleX: [0, 1] }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }} className="mx-auto h-1 w-20 origin-center rounded-full bg-brand-orange" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {galleryItems.map((item, index) => (
            <motion.button
              key={item.src}
              type="button"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              onClick={() => setSelectedIndex(index)}
              className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-brand-blue/15 bg-white text-left shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-1.5 focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-orange/40 cursor-pointer"
              aria-label={`Open ${item.title}`}
            >
              <Image 
                src={item.src} 
                alt={item.title} 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-108" 
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" 
              />
              
              {/* Subtle hover overlay without any text */}
              <div className="absolute inset-0 bg-black/15 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              {/* Maximize Icon Badge */}
              <span className="absolute right-4 top-4 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-white/90 text-brand-blue opacity-0 shadow-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <Maximize2 className="h-4 w-4 text-brand-orange" />
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-blue/90 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Photo viewer">
            <button type="button" onClick={() => setSelectedIndex(null)} className="absolute inset-0 cursor-default" aria-label="Close photo viewer" />
            <motion.div initial={{ scale: 0.96 }} animate={{ scale: 1 }} exit={{ scale: 0.96 }} className="relative z-10 flex h-full w-full max-w-6xl items-center justify-center">
              <Image src={galleryItems[selectedIndex].src} alt={galleryItems[selectedIndex].title} width={1600} height={1200} className="max-h-[85vh] w-auto max-w-full rounded-xl object-contain shadow-2xl" priority />
              <button type="button" onClick={() => setSelectedIndex(null)} className="absolute right-1 top-1 rounded-full bg-white/90 p-3 text-brand-blue transition-colors hover:bg-brand-orange hover:text-white" aria-label="Close photo viewer"><X className="h-5 w-5" /></button>
              <button type="button" onClick={() => moveSelection(-1)} className="absolute left-1 rounded-full bg-white/90 p-3 text-brand-blue transition-colors hover:bg-brand-orange hover:text-white" aria-label="Previous photo"><ChevronLeft className="h-6 w-6" /></button>
              <button type="button" onClick={() => moveSelection(1)} className="absolute right-1 rounded-full bg-white/90 p-3 text-brand-blue transition-colors hover:bg-brand-orange hover:text-white" aria-label="Next photo"><ChevronRight className="h-6 w-6" /></button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
