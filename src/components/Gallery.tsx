"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Maximize2 } from "lucide-react";

const galleryItems = [
  {
    title: "Premium Workspace",
    category: "Open Space",
    src: "/assets/hero-bg.jpg",
    className: "md:col-span-4 md:row-span-2 aspect-[16/10] md:aspect-auto"
  },
  {
    title: "Collaboration Zone",
    category: "Community",
    src: "/assets/about-collab.jpg",
    className: "md:col-span-2 md:row-span-1 aspect-[4/3]"
  },
  {
    title: "Executive Meeting Room",
    category: "Conference Room",
    src: "/assets/meeting-room.jpg",
    className: "md:col-span-2 md:row-span-2 aspect-[4/3] md:aspect-auto"
  },
  {
    title: "Espresso & Brew Bar",
    category: "Coffee Lounge",
    src: "/assets/coffee-lounge.jpg",
    className: "md:col-span-2 md:row-span-1 aspect-[4/3]"
  },
  {
    title: "Innovation Tech Lab",
    category: "The Lab",
    src: "/assets/study-lab.jpg",
    className: "md:col-span-2 md:row-span-1 aspect-[4/3]"
  }
];

export default function Gallery() {
  return (
    <section id="gallery" className="relative py-24 md:py-32 bg-[#0a0d14]">
      {/* Glow Ambient Decoration */}
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-brand-orange/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
          <span className="text-xs uppercase tracking-[0.3em] text-brand-orange font-bold block mb-4">
            Space Gallery
          </span>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white mb-6 uppercase">
            Inside CTRL S
          </h2>
          <div className="w-20 h-1 bg-brand-orange mx-auto rounded-full origin-center" />
        </div>

        {/* Staggered Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 auto-rows-[250px] md:auto-rows-[220px] lg:auto-rows-[260px]">
          {galleryItems.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className={`relative overflow-hidden rounded-2xl border border-dark-border group cursor-pointer ${item.className}`}
            >
              {/* Image */}
              <Image
                src={item.src}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />

              {/* Hover Dark Overlay */}
              <div className="absolute inset-0 bg-[#07090E]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 z-10" />

              {/* Hover Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between z-20 pointer-events-none">
                {/* Top corner zoom icon */}
                <div className="self-end w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white opacity-0 transform -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <Maximize2 className="w-4 h-4" />
                </div>

                {/* Bottom details */}
                <div className="transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-brand-orange font-bold mb-1 block">
                    {item.category}
                  </span>
                  <h3 className="text-lg font-semibold text-white">
                    {item.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
