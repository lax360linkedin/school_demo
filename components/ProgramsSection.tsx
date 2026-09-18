"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { schoolData } from "@/data/school";
import {
  GraduationCap,
  Award,
  BookOpen,
  Compass,
  CheckCircle2,
  Layers,
} from "lucide-react";
import FloatingCard from "./ui/FloatingCard";

export default function ProgramsSection() {
  const [activeTab, setActiveTab] = useState<string>("early-years");

  const currentProgram =
    schoolData.academicPrograms.find((p) => p.id === activeTab) ||
    schoolData.academicPrograms[0];

  return (
    <section id="programs" className="relative py-28 md:py-36 bg-[#F5F0E8]/60 overflow-hidden">
      {/* Background Lighting Elements */}
      <div className="absolute -top-40 left-1/4 w-96 h-96 bg-amber-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 right-1/4 w-96 h-96 bg-orange-100/20 rounded-full blur-3xl pointer-events-none" />

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
            <GraduationCap className="w-3.5 h-3.5 text-academic-gold" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-academic-gold">
              Educational Pathways
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 mb-5"
          >
            Academic Stages of <span className="text-gold-gradient">Growth</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed"
          >
            From the first spark of wonder in early childhood to pre-university
            scholarship in high school, our continuous educational journey prepares
            students for meaningful lives at LAX360.
          </motion.p>
        </div>

        {/* Navigation Tabs for Educational Stages */}
        <div className="flex justify-center mb-12 overflow-x-auto pb-4 no-scrollbar">
          <div className="inline-flex p-1.5 rounded-2xl bg-[#EFE8DF] border border-[#E0D7C8] shadow-sm">
            {schoolData.academicPrograms.map((program) => {
              const isActive = activeTab === program.id;
              return (
                <button
                  key={program.id}
                  onClick={() => setActiveTab(program.id)}
                  className={`relative px-5 py-3 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2.5 whitespace-nowrap ${
                    isActive
                      ? "text-white shadow-md shadow-slate-900/10"
                      : "text-slate-700 hover:text-slate-950"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabPill"
                      className="absolute inset-0 bg-slate-900 rounded-xl"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{program.name}</span>
                  <span
                    className={`relative z-10 text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md ${
                      isActive ? "bg-white/20 text-amber-300" : "bg-white/60 text-slate-600"
                    }`}
                  >
                    {program.ageRange}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Detailed Program Showcase Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentProgram.id}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <FloatingCard
              maxTilt={3}
              scaleOnHover={1.01}
              elevatedDepth={8}
              className="rounded-3xl bg-white border border-[#EAE3D7] p-8 sm:p-12 shadow-lg hover:shadow-2xl relative overflow-hidden"
            >
            {/* Top Badge & Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-[#EAE3D7]">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-amber-900 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                    {currentProgram.grades}
                  </span>
                  <span className="text-xs text-slate-500 font-mono font-semibold">
                    {currentProgram.ageRange}
                  </span>
                </div>
                <h3 className="text-3xl sm:text-4xl font-black text-slate-900">
                  {currentProgram.name}
                </h3>
                <p className="text-base text-slate-600 font-medium mt-1">
                  {currentProgram.tagline}
                </p>
              </div>

              {/* Quick Highlight Stats */}
              <div className="flex items-center gap-4 sm:gap-6">
                {currentProgram.keyStats.map((stat, idx) => (
                  <div
                    key={idx}
                    className="px-5 py-3 rounded-2xl bg-[#FAF8F5] border border-[#EAE3D7] text-center shadow-sm"
                  >
                    <div className="text-2xl font-black font-mono text-gold-gradient">
                      {stat.value}
                    </div>
                    <div className="text-xs text-slate-600 font-semibold">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Program Details Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8">
              {/* Column 1: Philosophy & Approach */}
              <div className="flex flex-col">
                <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-800 mb-3">
                  <BookOpen className="w-4 h-4 text-blue-700" />
                  <span>Learning Approach</span>
                </div>
                <p className="text-sm text-slate-600 font-normal leading-relaxed mb-6">
                  {currentProgram.description}
                </p>
                <div className="mt-auto p-4 rounded-2xl bg-blue-50/70 border border-blue-100">
                  <span className="text-xs font-bold text-blue-900 block mb-1">
                    Pedagogical Framework
                  </span>
                  <span className="text-xs text-blue-800 leading-relaxed font-medium">{currentProgram.approach}</span>
                </div>
              </div>

              {/* Column 2: Core Subjects */}
              <div>
                <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-800 mb-3">
                  <Layers className="w-4 h-4 text-amber-700" />
                  <span>Core Academic Subjects</span>
                </div>
                <div className="space-y-2.5">
                  {currentProgram.coreSubjects.map((sub, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-3 rounded-xl bg-[#FAF8F5] border border-[#EAE3D7] hover:border-amber-400/60 transition-colors shadow-xs"
                    >
                      <div className="w-2 h-2 rounded-full bg-academic-gold" />
                      <span className="text-xs sm:text-sm font-semibold text-slate-800">
                        {sub}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 3: Development Focus */}
              <div>
                <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-800 mb-3">
                  <Compass className="w-4 h-4 text-emerald-700" />
                  <span>Development Focus</span>
                </div>
                <div className="space-y-3">
                  {currentProgram.developmentFocus.map((focus, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-700 font-medium">
                        {focus}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 rounded-2xl bg-amber-50/80 border border-amber-200">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 uppercase tracking-wider mb-1">
                    <Award className="w-3.5 h-3.5 text-amber-700" />
                    <span>Signature Feature</span>
                  </div>
                  <p className="text-xs text-amber-950 font-medium leading-relaxed">{currentProgram.highlight}</p>
                </div>
              </div>
            </div>
            </FloatingCard>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
