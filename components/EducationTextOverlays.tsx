"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { GraduationCap, Compass, Lightbulb, Trophy, Award } from "lucide-react";

interface EducationTextOverlaysProps {
  scrollYProgress: MotionValue<number>;
}

export default function EducationTextOverlays({
  scrollYProgress,
}: EducationTextOverlaysProps) {
  // Intro overlay (0.00 to 0.06)
  const introOpacity = useTransform(scrollYProgress, [0, 0.02, 0.06], [1, 1, 0]);
  const introY = useTransform(scrollYProgress, [0, 0.06], [0, -40]);

  // Overlay 1: 0.10 threshold ("WHERE CURIOSITY BEGINS")
  const op1 = useTransform(scrollYProgress, [0.04, 0.09, 0.17, 0.22], [0, 1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0.04, 0.09, 0.17, 0.22], [50, 0, 0, -40]);
  const scale1 = useTransform(scrollYProgress, [0.04, 0.09, 0.22], [0.95, 1, 1.03]);

  // Overlay 2: 0.30 threshold ("LEARNING WITHOUT LIMITS")
  const op2 = useTransform(scrollYProgress, [0.24, 0.29, 0.39, 0.45], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.24, 0.29, 0.39, 0.45], [50, 0, 0, -40]);
  const scale2 = useTransform(scrollYProgress, [0.24, 0.29, 0.45], [0.95, 1, 1.03]);

  // Overlay 3: 0.60 threshold ("DISCOVER YOUR POTENTIAL")
  const op3 = useTransform(scrollYProgress, [0.49, 0.56, 0.68, 0.74], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.49, 0.56, 0.68, 0.74], [50, 0, 0, -40]);
  const scale3 = useTransform(scrollYProgress, [0.49, 0.56, 0.74], [0.95, 1, 1.03]);

  // Overlay 4: 0.85 threshold ("PREPARE FOR TOMORROW")
  const op4 = useTransform(scrollYProgress, [0.77, 0.83, 0.93, 0.98], [0, 1, 1, 0]);
  const y4 = useTransform(scrollYProgress, [0.77, 0.83, 0.93, 0.98], [50, 0, 0, -40]);
  const scale4 = useTransform(scrollYProgress, [0.77, 0.83, 0.98], [0.95, 1, 1.03]);

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center px-4 sm:px-8 lg:px-16 z-10">
      {/* Intro Presentation (Visible at top) */}
      <motion.div
        style={{ opacity: introOpacity, y: introY }}
        className="text-center max-w-6xl w-full mx-auto flex flex-col items-center gap-4"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-[#EAE3D7] shadow-sm backdrop-blur-md">
          <GraduationCap className="w-3.5 h-3.5 text-academic-gold" />
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-slate-800">
            Welcome to LAX360
          </span>
        </div>
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight uppercase leading-[0.92] text-slate-900 drop-shadow-[0_4px_20px_rgba(255,255,255,0.95)]">
          Inspire. <span className="text-gold-gradient">Learn.</span>{" "}
          <span className="text-blue-gradient">Lead.</span>
        </h1>
        <p className="text-sm sm:text-lg md:text-xl text-slate-700 font-medium tracking-wide max-w-2xl drop-shadow-[0_2px_10px_rgba(255,255,255,0.9)]">
          Scroll down to begin a cinematic journey through our world-class campus.
        </p>
        <div className="mt-4 flex flex-col items-center gap-2 text-slate-600">
          <div className="w-5 h-9 rounded-full border-2 border-slate-400 bg-white/40 flex items-start justify-center p-1">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="w-1.5 h-1.5 rounded-full bg-academic-gold"
            />
          </div>
        </div>
      </motion.div>

      {/* Overlay 1: 0.10 Threshold */}
      <motion.div
        style={{ opacity: op1, y: y1, scale: scale1 }}
        className="absolute inset-x-4 sm:inset-x-8 lg:inset-x-16 max-w-6xl w-full mx-auto text-center flex flex-col items-center gap-5"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 border border-[#EAE3D7] backdrop-blur-md shadow-md">
          <Compass className="w-3.5 h-3.5 text-academic-gold" />
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-academic-gold">
            Stage 01 • Morning Horizons
          </span>
        </div>

        <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight text-slate-900 uppercase drop-shadow-[0_6px_24px_rgba(255,255,255,0.95)]">
          WHERE CURIOSITY <span className="text-gold-gradient">BEGINS</span>
        </h2>

        <p className="text-xl sm:text-2xl md:text-3xl text-slate-800 font-semibold tracking-tight max-w-3xl drop-shadow-[0_2px_12px_rgba(255,255,255,0.9)]">
          Every great journey starts with a question.
        </p>
      </motion.div>

      {/* Overlay 2: 0.30 Threshold */}
      <motion.div
        style={{ opacity: op2, y: y2, scale: scale2 }}
        className="absolute inset-x-4 sm:inset-x-8 lg:inset-x-16 max-w-6xl w-full mx-auto text-center flex flex-col items-center gap-5"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 border border-[#EAE3D7] backdrop-blur-md shadow-md">
          <Lightbulb className="w-3.5 h-3.5 text-blue-600" />
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-blue-700">
            Stage 02 • Immersive Exploration
          </span>
        </div>

        <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight text-slate-900 uppercase drop-shadow-[0_6px_24px_rgba(255,255,255,0.95)]">
          LEARNING WITHOUT <span className="text-blue-gradient">LIMITS</span>
        </h2>

        <p className="text-lg sm:text-2xl md:text-3xl text-slate-800 font-semibold tracking-tight max-w-3xl drop-shadow-[0_2px_12px_rgba(255,255,255,0.9)]">
          Modern classrooms, innovative technology, and inspiring teachers create
          meaningful learning experiences.
        </p>
      </motion.div>

      {/* Overlay 3: 0.60 Threshold */}
      <motion.div
        style={{ opacity: op3, y: y3, scale: scale3 }}
        className="absolute inset-x-4 sm:inset-x-8 lg:inset-x-16 max-w-6xl w-full mx-auto text-center flex flex-col items-center gap-5"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 border border-[#EAE3D7] backdrop-blur-md shadow-md">
          <Trophy className="w-3.5 h-3.5 text-purple-600" />
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-purple-700">
            Stage 03 • Creative Mastery
          </span>
        </div>

        <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight text-slate-900 uppercase drop-shadow-[0_6px_24px_rgba(255,255,255,0.95)]">
          DISCOVER YOUR <span className="text-gold-gradient">POTENTIAL</span>
        </h2>

        <p className="text-lg sm:text-2xl md:text-3xl text-slate-800 font-semibold tracking-tight max-w-3xl drop-shadow-[0_2px_12px_rgba(255,255,255,0.9)]">
          From science and technology to arts and sports, every student gets the
          opportunity to explore their strengths.
        </p>
      </motion.div>

      {/* Overlay 4: 0.85 Threshold */}
      <motion.div
        style={{ opacity: op4, y: y4, scale: scale4 }}
        className="absolute inset-x-4 sm:inset-x-8 lg:inset-x-16 max-w-6xl w-full mx-auto text-center flex flex-col items-center gap-5"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 border border-[#EAE3D7] backdrop-blur-md shadow-md">
          <Award className="w-3.5 h-3.5 text-emerald-600" />
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-emerald-700">
            Stage 04 • Future Horizons
          </span>
        </div>

        <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight text-slate-900 uppercase drop-shadow-[0_6px_24px_rgba(255,255,255,0.95)]">
          PREPARE FOR <span className="text-blue-gradient">TOMORROW</span>
        </h2>

        <p className="text-lg sm:text-2xl md:text-3xl text-slate-800 font-semibold tracking-tight max-w-3xl drop-shadow-[0_2px_12px_rgba(255,255,255,0.9)]">
          We empower students with knowledge, confidence, creativity, and leadership
          skills for the future.
        </p>
      </motion.div>
    </div>
  );
}
