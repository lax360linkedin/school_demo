"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen,
  GraduationCap,
  Sparkles,
  Award,
  CheckCircle2,
  Clock,
  Layers,
  ArrowUpRight,
  Compass,
  Cpu,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AdminStorage, AdminProgramItem } from "@/lib/adminStorage";
import { schoolData } from "@/data/school";

export default function ProgramsPage() {
  const [programs, setPrograms] = useState<AdminProgramItem[]>([]);

  useEffect(() => {
    const loaded = AdminStorage.getPrograms();
    setPrograms(loaded.filter((p) => p.status === "Active"));
  }, []);

  return (
    <div className="min-h-screen bg-[#FCFBF7] text-slate-800 flex flex-col selection:bg-amber-100 selection:text-amber-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 border-b border-[#EAE3D7] overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#F7F4EE] via-[#FCFBF7] to-[#FCFBF7]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold uppercase tracking-wider mx-auto">
              <BookOpen className="w-3.5 h-3.5 text-amber-700" />
              <span>ACADEMIC FRAMEWORKS & CURRICULA</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-slate-900 tracking-tight leading-[1.12]">
              Inquiry-Led Learning <br />
              <span className="italic font-normal text-slate-700">Across Every Academic Stage.</span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed">
              From Early Childhood curiosity to Senior Secondary Cambridge A-Levels and IBDP, our
              curricula balance conceptual rigor with creative expression and critical reasoning.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#stages"
                className="px-7 py-3.5 rounded-xl bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors shadow-sm text-sm"
              >
                View Educational Stages
              </a>
              <Link
                href="/admissions"
                className="px-7 py-3.5 rounded-xl bg-white text-slate-700 font-medium border border-[#EAE3D7] hover:bg-slate-50 transition-colors text-sm"
              >
                Apply for Admission
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Educational Stages Section */}
      <section id="stages" className="py-20 lg:py-28 bg-[#FAF8F5] border-b border-[#EAE3D7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-800">
              LEARNING PATHWAYS
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
              Curricula Tailored to Every Age
            </h2>
            <p className="text-slate-600 text-base">
              Synchronized with international benchmarks while honoring cultural depth.
            </p>
          </div>

          {/* Program Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {programs.map((program) => (
              <div
                key={program.id}
                className="bg-white rounded-3xl p-8 sm:p-10 border border-[#EAE3D7] shadow-xs flex flex-col justify-between space-y-6 hover:shadow-md transition-shadow"
              >
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="px-3 py-1 bg-amber-50 text-amber-900 border border-amber-200/70 rounded-md text-xs font-semibold">
                      {program.grades}
                    </span>
                    <span className="text-xs font-medium text-slate-500">{program.ageRange}</span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-serif font-bold text-slate-900">{program.name}</h3>
                    <p className="text-xs font-medium text-amber-800 mt-1">{program.tagline}</p>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed">{program.description}</p>

                  <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE3D7] space-y-1.5 text-xs">
                    <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">
                      Pedagogical Approach
                    </span>
                    <p className="text-slate-800 font-medium">{program.approach}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">{program.highlight}</span>
                  <Link
                    href="/admissions"
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 transition-colors"
                  >
                    Enrollment Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transdisciplinary Academic Focus */}
      <section className="py-20 bg-white border-b border-[#EAE3D7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-14">
            <h2 className="text-3xl font-serif font-bold text-slate-900">
              Transdisciplinary Focus Areas
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Preparing scholars with versatile capabilities for tomorrow&apos;s world.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#EAE3D7] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
                <Cpu className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-slate-900">STEM & Applied AI</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Applied robotics, mathematical modeling, and coding-integrated scientific research.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#EAE3D7] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-700 text-white flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-slate-900">Literary Arts & Rhetoric</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Socratic dialogues, international debates, creative writing, and classical literature.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#EAE3D7] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
                <Compass className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-slate-900">Global Perspectives & MUN</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Diplomatic simulations, environmental ethics, and cross-cultural history seminars.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#EAE3D7] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-700 text-white flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-slate-900">Visual & Performing Arts</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Classical Indian music, western orchestra, theatre production, and contemporary studio arts.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
