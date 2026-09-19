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
  Palette,
  Lightbulb,
  ArrowRight,
  Globe2,
  Atom,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingCard from "@/components/ui/FloatingCard";
import { AdminStorage, AdminProgramItem } from "@/lib/adminStorage";
import { schoolData } from "@/data/school";

interface DetailedProgramStage {
  id: string;
  name: string;
  grades: string;
  ageRange: string;
  tagline: string;
  description: string;
  framework: string;
  learningApproach: string;
  subjects: string[];
  skills: string[];
  highlight: string;
}

export default function ProgramsPage() {
  const [adminPrograms, setAdminPrograms] = useState<AdminProgramItem[]>([]);
  const [activeStage, setActiveStage] = useState<string>("all");

  useEffect(() => {
    const loaded = AdminStorage.getPrograms();
    setAdminPrograms(loaded.filter((p) => p.status === "Active"));
  }, []);

  const academicStages: DetailedProgramStage[] = [
    {
      id: "early-years",
      name: "Early Childhood & Kindergarten",
      grades: "Nursery – KG",
      ageRange: "Ages 3 – 5",
      tagline: "Joyful Sensory Discovery & Foundational Curiosity",
      framework: "Montessori & Reggio Emilia Inspired Inquiry",
      description:
        "Our early childhood program creates a gentle, nurturing bridge between home and school. In light-flooded learning ateliers, young children develop curiosity, phonemic awareness, and self-expression through guided play.",
      learningApproach:
        "Multimodal sensory exploration, natural materials, storytelling circles, and early mathematical play.",
      subjects: [
        "Phonemic Literacy & Story Craft",
        "Sensory Numeracy & Spatial Play",
        "Natural Science & Campus Eco-Garden",
        "Expressive Arts, Clay & Music",
        "Gross & Fine Motor Movement",
      ],
      skills: [
        "Linguistic Fluency",
        "Emotional Self-Regulation",
        "Spatial Coordination",
        "Joy of Questioning",
      ],
      highlight: "Dedicated tactile discovery garden and low 8:1 mentor ratio.",
    },
    {
      id: "primary-school",
      name: "Primary School",
      grades: "Grades 1 – 5",
      ageRange: "Ages 6 – 10",
      tagline: "Building Inquiring Minds & Critical Foundations",
      framework: "IB Primary Years Programme (PYP) & Cambridge Primary",
      description:
        "Primary years focus on active learning where children explore transdisciplinary themes linking traditional subjects. Students learn to hypothesize, conduct simple experiments, and express ideas with clarity.",
      learningApproach:
        "Inquiry units driven by student questions, hands-on scientific projects, and collaborative mathematical investigations.",
      subjects: [
        "Conceptual Mathematics & Problem Solving",
        "Integrated Science & Ecological Studies",
        "English Language Arts & Literature",
        "Hindi, Tamil & World Language Exposure",
        "Visual Arts, Choral Music & Physical Education",
        "Foundational Computing & Block Coding",
      ],
      skills: [
        "Scientific Inquiry",
        "Mathematical Reasoning",
        "Bilingual Expression",
        "Collaborative Empathy",
      ],
      highlight: "Annual student-led science exhibition and young writers anthology.",
    },
    {
      id: "middle-school",
      name: "Middle School",
      grades: "Grades 6 – 8",
      ageRange: "Ages 11 – 14",
      tagline: "Intellectual Agility & Disciplinary Discovery",
      framework: "Cambridge Lower Secondary Framework",
      description:
        "Middle school is a pivotal time of cognitive leap. Our academic program shifts toward deeper disciplinary rigour, introducing dedicated science laboratories, formal debate, and advanced mathematical concepts.",
      learningApproach:
        "Socratic dialogues, laboratory-based experimental learning, and real-world project modules linking science and humanities.",
      subjects: [
        "Pure Sciences (Physics, Chemistry, Biology Labs)",
        "Pre-Algebra, Geometry & Discrete Math",
        "World History, Civics & Geography",
        "Literary Rhetoric, Essay Writing & Debate",
        "Python Programming & Physical Computing",
        "Foreign Languages (French / Spanish / Sanskrit)",
      ],
      skills: [
        "Evidence-Based Argumentation",
        "Analytical Problem Solving",
        "Laboratory Technique",
        "Critical Digital Literacy",
      ],
      highlight: "Inter-school Model UN simulations and regional robotics competitions.",
    },
    {
      id: "secondary-school",
      name: "Secondary School",
      grades: "Grades 9 – 10",
      ageRange: "Ages 14 – 16",
      tagline: "Disciplinary Mastery & Cambridge IGCSE Distinction",
      framework: "Cambridge Assessment International Education (CAIE)",
      description:
        "Students undertake the internationally benchmarked Cambridge IGCSE curriculum. Rigorous coursework develops in-depth subject mastery, independent research habits, and sharp analytical thinking.",
      learningApproach:
        "Collegiate seminars, comprehensive laboratory thesis reports, and structured past-paper problem analysis.",
      subjects: [
        "Physics, Chemistry & Biology (Double/Triple Award)",
        "Extended Mathematics & Additional Mathematics",
        "English Language & English Literature",
        "Economics, Business Studies & Global Perspectives",
        "Computer Science & Algorithmic Problem Solving",
        "Fine Art Studio & Instrumental Music",
      ],
      skills: [
        "Rigorous Academic Writing",
        "Quantitative Data Modeling",
        "Formal Exam Technique",
        "Ethical Reasoning",
      ],
      highlight: "100% distinction pass rate across international board assessments.",
    },
    {
      id: "senior-secondary",
      name: "Senior Secondary & IB Diploma",
      grades: "Grades 11 – 12",
      ageRange: "Ages 16 – 18",
      tagline: "Pre-University Distinction & Global Leadership",
      framework: "IB Diploma Programme (IBDP) & Cambridge A-Levels",
      description:
        "Our culminating pre-university program offers scholars the choice between the IB Diploma and Cambridge International A-Levels. Students complete university-level research, explore Theory of Knowledge, and lead social impact projects.",
      learningApproach:
        "University-style lectures, 4,000-word independent Extended Essay research, and Creativity, Activity, Service (CAS) initiatives.",
      subjects: [
        "Higher & Standard Level Sciences (Physics, Chem, Bio)",
        "Mathematics: Analysis & Approaches (HL/SL)",
        "Economics, Psychology & History of Asia",
        "Theory of Knowledge (TOK) & Epistemology",
        "Computer Science & Applied Machine Learning",
        "Visual Arts (HL) & Theatre Studies",
      ],
      skills: [
        "Independent Research Thesis",
        "Global Collegiate Readiness",
        "Philosophical Reasoning",
        "Leadership Under Pressure",
      ],
      highlight: "100% acceptance to premier Indian and top-tier global universities.",
    },
  ];

  const filteredStages =
    activeStage === "all"
      ? academicStages
      : academicStages.filter((stage) => stage.id === activeStage);

  return (
    <div className="min-h-screen bg-[#FCFBF7] text-slate-800 flex flex-col selection:bg-amber-100 selection:text-amber-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-28 pb-14 lg:pt-32 lg:pb-16 border-b border-[#EAE3D7] overflow-hidden">
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
              From Early Childhood discovery to Senior Secondary Cambridge A-Levels and IBDP, our
              curricula balance conceptual rigor with creative expression, ethical clarity, and critical reasoning.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#stages"
                className="px-7 py-3.5 rounded-xl bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors shadow-sm text-sm"
              >
                Explore Educational Stages
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
      <section id="stages" className="py-14 sm:py-16 lg:py-20 bg-[#FAF8F5] border-b border-[#EAE3D7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-800">
              LEARNING PROGRESSION
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
              Curricula Tailored to Every Age
            </h2>
            <p className="text-slate-600 text-base">
              Synchronized with international benchmarks while honoring cultural depth and individual learning pace.
            </p>
          </div>

          {/* Stage Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            <button
              onClick={() => setActiveStage("all")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeStage === "all"
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-white text-slate-600 border border-[#EAE3D7] hover:bg-slate-50"
              }`}
            >
              All Stages (K–12)
            </button>
            {academicStages.map((stg) => (
              <button
                key={stg.id}
                onClick={() => setActiveStage(stg.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeStage === stg.id
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-white text-slate-600 border border-[#EAE3D7] hover:bg-slate-50"
                }`}
              >
                {stg.name}
              </button>
            ))}
          </div>

          {/* Program Stages List */}
          <div className="space-y-6 sm:space-y-8">
            {filteredStages.map((stage) => (
              <FloatingCard
                key={stage.id}
                maxTilt={2}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE3D7] shadow-xs hover:border-amber-200 transition-colors"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-5 space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-amber-50 text-amber-900 border border-amber-200/70 rounded-md text-xs font-semibold">
                        {stage.grades}
                      </span>
                      <span className="text-xs font-medium text-slate-500">{stage.ageRange}</span>
                    </div>

                    <div>
                      <h3 className="text-2xl font-serif font-bold text-slate-900">{stage.name}</h3>
                      <p className="text-xs font-medium text-amber-800 mt-0.5">{stage.framework}</p>
                    </div>

                    <p className="text-sm text-slate-600 leading-relaxed">{stage.description}</p>

                    <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE3D7] space-y-1 text-xs">
                      <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">
                        Pedagogical Approach
                      </span>
                      <p className="text-slate-800 font-medium leading-relaxed">
                        {stage.learningApproach}
                      </p>
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-xs text-slate-500 italic">{stage.highlight}</span>
                      <Link
                        href="/admissions"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 transition-colors"
                      >
                        <span>Admissions</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>

                  <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 lg:pt-0 lg:border-l lg:border-slate-100 lg:pl-8">
                    {/* Key Subjects */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
                        <BookOpen className="w-4 h-4 text-amber-700" />
                        <span>Core Subject Areas</span>
                      </div>
                      <ul className="space-y-2">
                        {stage.subjects.map((sub, i) => (
                          <li key={i} className="text-xs text-slate-600 flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0" />
                            <span className="leading-snug">{sub}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Competencies Developed */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
                        <GraduationCap className="w-4 h-4 text-slate-800" />
                        <span>Competencies Fostered</span>
                      </div>
                      <ul className="space-y-2">
                        {stage.skills.map((skl, i) => (
                          <li key={i} className="text-xs text-slate-600 flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 mt-0.5 shrink-0" />
                            <span className="leading-snug">{skl}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </FloatingCard>
            ))}
          </div>
        </div>
      </section>

      {/* Transdisciplinary Focus Areas */}
      <section className="py-14 sm:py-16 lg:py-20 bg-white border-b border-[#EAE3D7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-10 lg:mb-12">
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-800">
              HOLISTIC EXCELLENCE
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
              Transdisciplinary Focus Disciplines
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Beyond core academics, we weave technological literacy, global diplomacy, and the arts into every student&apos;s journey.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <FloatingCard
              maxTilt={4}
              className="p-7 rounded-3xl bg-[#FAF8F5] border border-[#EAE3D7] space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-11 h-11 rounded-2xl bg-slate-900 text-white flex items-center justify-center">
                  <Cpu className="w-5 h-5" />
                </div>
                <h4 className="font-serif font-bold text-lg text-slate-900">STEM & Applied AI</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Applied robotics, mathematical modeling, and coding-integrated scientific research starting from primary years.
                </p>
              </div>
              <span className="text-[11px] font-semibold text-amber-800 pt-2">Python • Arduino • Robotics</span>
            </FloatingCard>

            <FloatingCard
              maxTilt={4}
              className="p-7 rounded-3xl bg-[#FAF8F5] border border-[#EAE3D7] space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-11 h-11 rounded-2xl bg-amber-700 text-white flex items-center justify-center">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h4 className="font-serif font-bold text-lg text-slate-900">Literary Arts & Rhetoric</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Socratic dialogues, international debates, creative writing, and classical literature analysis.
                </p>
              </div>
              <span className="text-[11px] font-semibold text-amber-800 pt-2">Essay Craft • Debate • Publishing</span>
            </FloatingCard>

            <FloatingCard
              maxTilt={4}
              className="p-7 rounded-3xl bg-[#FAF8F5] border border-[#EAE3D7] space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-11 h-11 rounded-2xl bg-slate-900 text-white flex items-center justify-center">
                  <Compass className="w-5 h-5" />
                </div>
                <h4 className="font-serif font-bold text-lg text-slate-900">Global MUN & Leadership</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Diplomatic simulations, environmental ethics, multilateral resolution drafting, and Model UN delegations.
                </p>
              </div>
              <span className="text-[11px] font-semibold text-amber-800 pt-2">Diplomacy • Resolving Crises</span>
            </FloatingCard>

            <FloatingCard
              maxTilt={4}
              className="p-7 rounded-3xl bg-[#FAF8F5] border border-[#EAE3D7] space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-11 h-11 rounded-2xl bg-amber-700 text-white flex items-center justify-center">
                  <Palette className="w-5 h-5" />
                </div>
                <h4 className="font-serif font-bold text-lg text-slate-900">Visual & Performing Arts</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Carnatic and Western classical music, orchestra ensemble, theatre production, and contemporary ceramics studio.
                </p>
              </div>
              <span className="text-[11px] font-semibold text-amber-800 pt-2">Music • Fine Arts • Drama</span>
            </FloatingCard>
          </div>
        </div>
      </section>

      {/* Academic Advisory Callout */}
      <section className="py-12 lg:py-14 bg-[#FAF8F5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
            Need Guidance on Choosing the Right Academic Stage?
          </h3>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            Our Academic Dean and Admissions Advisors are available for personalized consultations
            to discuss syllabus transitions, Cambridge vs. IB choices, and student readiness.
          </p>
          <div className="pt-2">
            <Link
              href="/admissions"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-slate-900 text-white text-xs font-semibold uppercase tracking-wider hover:bg-slate-800 transition-colors"
            >
              <span>Schedule Academic Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
