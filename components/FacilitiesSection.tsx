"use client";

import { motion } from "framer-motion";
import { schoolData } from "@/data/school";
import Image from "next/image";
import { Building2, Check } from "lucide-react";
import FloatingCard from "./ui/FloatingCard";

export default function FacilitiesSection() {
  return (
    <section id="facilities" className="relative py-28 md:py-36 bg-[#F5F0E8]/60 overflow-hidden">
      {/* Background Decorative Rings */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-amber-100/40 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-orange-100/30 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full px-6 sm:px-10 lg:px-16 max-w-[1800px] mx-auto relative z-10">
        {/* Section Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#EAE3D7] shadow-sm backdrop-blur-md mb-4"
          >
            <Building2 className="w-3.5 h-3.5 text-blue-700" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-800">
              Campus Infrastructure
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 mb-5"
          >
            Spaces That <span className="text-gold-gradient">Inspire Learning</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed"
          >
            Across 68 acres of purposeful architectural design at LAX360, our facilities
            are crafted to ignite wonder, encourage collaborative invention, and support
            physical and artistic mastery.
          </motion.p>
        </div>

        {/* Facilities Grid (8 Facilities) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {schoolData.facilities.map((facility, idx) => (
            <motion.div
              key={facility.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: (idx % 2) * 0.15 }}
              className="h-full"
            >
              <FloatingCard className="group h-full rounded-3xl overflow-hidden bg-white border border-[#EAE3D7] hover:border-amber-500/40 flex flex-col shadow-sm hover:shadow-xl">
                {/* Image Showcase Container */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                  <Image
                    src={facility.image}
                    alt={facility.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/20 to-transparent" />

                  {/* Specs Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-block px-3 py-1 rounded-full text-[11px] font-mono font-bold text-white bg-black/50 backdrop-blur-md border border-white/20">
                      {facility.specs}
                    </span>
                  </div>

                  <div className="absolute top-4 right-4 z-10">
                    <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-amber-950 bg-amber-100/95 backdrop-blur-md border border-amber-300 shadow-sm">
                      {facility.category}
                    </span>
                  </div>
                </div>

                {/* Text & Features Content */}
                <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-amber-800 transition-colors">
                      {facility.name}
                    </h3>
                    <p className="text-sm text-slate-600 font-normal leading-relaxed mb-6">
                      {facility.description}
                    </p>
                  </div>

                  {/* Technical Highlights */}
                  <div className="pt-4 border-t border-[#EAE3D7]">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-3">
                      Key Specifications & Equipment
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {facility.features.map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-amber-700 flex-shrink-0" />
                          <span className="text-xs font-medium text-slate-700 truncate">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </FloatingCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
