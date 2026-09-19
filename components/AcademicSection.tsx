"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  Laptop,
  HeartHandshake,
  CheckCircle2,
  Award,
} from "lucide-react";
import { schoolData } from "@/data/school";
import FloatingCard from "./ui/FloatingCard";

export default function AcademicSection() {
  const cards = [
    {
      id: "excellence",
      icon: BookOpen,
      badge: "Foundation & Rigor",
      badgeColor: "text-amber-800 bg-amber-50 border-amber-200/80",
      title: "Academic Excellence",
      subtitle: "Strong fundamentals and structured learning.",
      description:
        "A rigorous, inquiry-led curriculum that pairs foundational academic mastery with interdisciplinary problem-solving, preparing students for the world's most demanding universities.",
      points: [
        "Structured international curriculum (IB & Cambridge)",
        "Data-informed personalized learning pathways",
        "Faculty mentorship with 11:1 student-teacher ratio",
        "University-level research colloquia and thesis projects",
      ],
      stats: { label: "Ivy / Top-50 Acceptance", value: "99.4%" },
    },
    {
      id: "future-skills",
      icon: Laptop,
      badge: "Innovation & Tech",
      badgeColor: "text-blue-800 bg-blue-50 border-blue-200/80",
      title: "Future Skills",
      subtitle: "Technology, communication, creativity, and leadership.",
      description:
        "Beyond textbooks, our curriculum immerses students in artificial intelligence, computational thinking, public rhetoric, and collaborative engineering design sprints.",
      points: [
        "Robotics, applied AI, and ethical computation",
        "Socratic debates & global public speaking rhetoric",
        "Cross-disciplinary design thinking laboratories",
        "Entrepreneurial venture pitching and incubation",
      ],
      stats: { label: "STEM & Innovation Awards", value: "45+" },
    },
    {
      id: "personal-growth",
      icon: HeartHandshake,
      badge: "Character & Well-being",
      badgeColor: "text-emerald-800 bg-emerald-50 border-emerald-200/80",
      title: "Personal Growth",
      subtitle: "Confidence, discipline, collaboration, and independence.",
      description:
        "True education cultivates human character. We nurture self-advocacy, empathetic leadership, mental wellness, and community responsibility in every student.",
      points: [
        "Comprehensive social-emotional learning (SEL)",
        "Student-led governance and House honor systems",
        "Global service projects and environmental stewardship",
        "Mindfulness, resilience, and personal wellness coaching",
      ],
      stats: { label: "Annual Service Hours", value: "24,000+" },
    },
  ];

  return (
    <section id="academics" className="relative py-14 sm:py-16 lg:py-20 bg-transparent overflow-hidden">
      {/* Background Decorative Warm Accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-gradient-to-r from-amber-100/30 via-orange-50/20 to-transparent blur-3xl pointer-events-none rounded-full" />

      <div className="w-full px-6 sm:px-10 lg:px-16 max-w-[1800px] mx-auto relative z-10">
        {/* Section Header */}
        <div className="max-w-4xl mx-auto text-center mb-10 lg:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#EAE3D7] shadow-sm backdrop-blur-md mb-3"
          >
            <Award className="w-3.5 h-3.5 text-academic-gold" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-academic-gold">
              Educational Philosophy
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 mb-4"
          >
            Education Designed for the{" "}
            <span className="text-gold-gradient">Future</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed"
          >
            At LAX360, we blend classical intellectual rigor with cutting-edge
            technological mastery. Our pedagogy emphasizes critical thinking, personalized
            coaching, and ethical leadership, ensuring every learner thrives in a rapidly
            transforming world.
          </motion.p>
        </div>

        {/* 3 Core Animated Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-10 lg:mb-12">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: idx * 0.15 }}
                className="h-full"
              >
                <FloatingCard className="group relative h-full rounded-3xl bg-white border border-[#EAE3D7] p-8 sm:p-10 flex flex-col justify-between hover:border-amber-500/40 shadow-sm hover:shadow-xl">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-[#F5F0E8] border border-[#EAE3D7] flex items-center justify-center text-slate-800 group-hover:bg-slate-900 group-hover:text-white transition-all duration-300">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span
                        className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${card.badgeColor}`}
                      >
                        {card.badge}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-amber-800 transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-sm font-semibold text-slate-500 mb-4">
                      {card.subtitle}
                    </p>
                    <p className="text-sm text-slate-600 font-normal leading-relaxed mb-6">
                      {card.description}
                    </p>

                    {/* Bullet Points */}
                    <div className="space-y-2.5 pt-4 border-t border-[#EAE3D7]">
                      {card.points.map((pt, pIdx) => (
                        <div key={pIdx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                          <span className="text-xs font-medium text-slate-700">{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Key Metric Badge */}
                  <div className="mt-8 pt-4 border-t border-[#EAE3D7] flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-semibold">{card.stats.label}</span>
                    <span className="text-lg font-mono font-bold text-slate-900">{card.stats.value}</span>
                  </div>
                </FloatingCard>
              </motion.div>
            );
          })}
        </div>

        {/* Institutional Proof Metrics Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <FloatingCard maxTilt={3} className="rounded-3xl bg-white p-8 sm:p-10 border border-[#EAE3D7] shadow-md hover:shadow-xl">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center divide-y lg:divide-y-0 lg:divide-x divide-[#EAE3D7]">
              {schoolData.stats.map((stat, sIdx) => (
                <div key={sIdx} className={`${sIdx > 0 ? "pt-4 lg:pt-0" : ""}`}>
                  <div className="text-3xl sm:text-4xl md:text-5xl font-black text-gold-gradient font-mono tracking-tight mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm font-bold text-slate-900 mb-0.5">
                    {stat.label}
                  </div>
                  <div className="text-xs text-slate-500 font-medium">
                    {stat.detail}
                  </div>
                </div>
              ))}
            </div>
          </FloatingCard>
        </motion.div>
      </div>
    </section>
  );
}
