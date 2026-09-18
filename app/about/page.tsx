"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen,
  Award,
  ShieldCheck,
  HeartHandshake,
  Users,
  Compass,
  GraduationCap,
  Sparkles,
  Building2,
  CheckCircle2,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { schoolData } from "@/data/school";

export default function AboutPage() {
  const leadershipValues = [
    {
      title: "Inquiry-Led Pedagogy",
      description:
        "We foster questioning minds over passive memorization. Our Socratic learning model encourages learners to research, test, and articulate original arguments.",
      icon: BookOpen,
    },
    {
      title: "Integrity & Pastoral Care",
      description:
        "Academic excellence is hollow without human kindness. Every student is paired with a faculty advisor ensuring balanced emotional wellness and ethical groundedness.",
      icon: HeartHandshake,
    },
    {
      title: "Global Disciplinary Mastery",
      description:
        "Pairing IB World School standards and Cambridge International curricula with a deep reverence for Indian cultural heritage, arts, and languages.",
      icon: Compass,
    },
    {
      title: "Eco-Conscious Leadership",
      description:
        "Our 28-acre bio-campus instills environmental stewardship through solar power initiatives, rainwater catchment, and student-run botanical conservation.",
      icon: Award,
    },
  ];

  return (
    <div className="min-h-screen bg-[#FCFBF7] text-slate-800 flex flex-col selection:bg-amber-100 selection:text-amber-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 border-b border-[#EAE3D7] overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#F7F4EE] via-[#FCFBF7] to-[#FCFBF7]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                <span>ABOUT LAX360 ACADEMY</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-slate-900 tracking-tight leading-[1.12]">
                Inspiring Young Minds. <br />
                <span className="italic font-normal text-slate-700">Shaping Exemplary Futures.</span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl">
                Founded in 2012, LAX360 is dedicated to providing an exceptional educational
                environment where intellectual curiosity, character formation, and global readiness
                coalesce.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href="/programs"
                  className="px-7 py-3.5 rounded-xl bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors shadow-sm text-sm"
                >
                  Explore Academic Programs
                </Link>
                <Link
                  href="/admissions"
                  className="px-7 py-3.5 rounded-xl bg-white text-slate-700 font-medium border border-[#EAE3D7] hover:bg-slate-50 transition-colors text-sm"
                >
                  Admissions Process
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="lg:col-span-5"
            >
              <div className="relative rounded-3xl overflow-hidden border border-[#EAE3D7] shadow-xl bg-white p-2">
                <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden">
                  <Image
                    src="/images/campus/library.jpg"
                    alt="LAX360 Central Knowledge Commons"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-xs font-semibold uppercase tracking-wider text-amber-300">
                      Central Knowledge Commons
                    </p>
                    <p className="text-sm font-medium text-slate-100">
                      Over 35,000 volumes, collaborative digital pods, and scholarly study zones.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Institutional Numbers */}
      <section className="py-14 bg-white border-b border-[#EAE3D7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-100">
            <div className="pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
                {schoolData.established}
              </div>
              <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mt-1">
                Year Established
              </p>
            </div>
            <div className="pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
                {schoolData.students}
              </div>
              <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mt-1">
                Enrolled Scholars
              </p>
            </div>
            <div className="pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
                {schoolData.studentTeacherRatio}
              </div>
              <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mt-1">
                Student-Teacher Ratio
              </p>
            </div>
            <div className="pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
                {schoolData.campusSize}
              </div>
              <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mt-1">
                Green Campus Acreage
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Institutional Philosophy & Pillars */}
      <section className="py-20 lg:py-28 bg-[#FAF8F5] border-b border-[#EAE3D7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-800">
              FOUNDATIONAL ETHOS
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
              Educational Pillars at LAX360
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              We prepare students not merely for university admissions, but to navigate an
              interconnected world with wisdom, empathy, and creative problem-solving capability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {leadershipValues.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-8 border border-[#EAE3D7] shadow-xs space-y-4 hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-900 border border-amber-200/60 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-amber-800" />
                  </div>
                  <h3 className="text-xl font-serif font-semibold text-slate-900">{val.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{val.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Accreditations & Global Standards */}
      <section className="py-20 bg-white border-b border-[#EAE3D7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
            <h2 className="text-3xl font-serif font-bold text-slate-900">
              Accreditations & Affiliations
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Recognized worldwide for academic integrity, pedagogical innovation, and institutional safety.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {schoolData.accreditations.map((acc, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#EAE3D7] text-center flex flex-col items-center justify-center space-y-2"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                <span className="text-xs font-semibold text-slate-800">{acc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
