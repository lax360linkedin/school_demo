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
  Quote,
  ArrowRight,
  TreePine,
  Target,
  Sparkle,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingCard from "@/components/ui/FloatingCard";
import { schoolData } from "@/data/school";

export default function AboutPage() {
  const leadershipValues = [
    {
      title: "Inquiry-Led Pedagogy",
      description:
        "We foster questioning minds over passive memorization. Our Socratic learning model encourages learners to research, test hypotheses, and articulate original arguments.",
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
        "Pairing IB World School standards and Cambridge International curricula with a deep reverence for Indian cultural heritage, classical arts, and indigenous languages.",
      icon: Compass,
    },
    {
      title: "Eco-Conscious Stewardship",
      description:
        "Our 28-acre bio-campus instills environmental stewardship through 100% solar power, rainwater catchment, organic agriculture, and student-run botanical conservation.",
      icon: TreePine,
    },
  ];

  const distinctivePillars = [
    {
      number: "01",
      title: "11:1 Student-Teacher Ratio",
      description:
        "Small seminar-style learning cohorts ensure every child receives tailored mentorship, proactive academic scaffolding, and attentive pastoral support.",
      icon: Users,
    },
    {
      number: "02",
      title: "Socratic Inquiry & Synthesis",
      description:
        "Classrooms operate as collaborative intellectual workshops where questions are valued as much as answers, building confident independent thinkers.",
      icon: Target,
    },
    {
      number: "03",
      title: "28-Acre Green Bio-Campus",
      description:
        "Designed to merge indoor studio learning with lush outdoor botanical spaces, zero-carbon architecture, and world-class sports grounds.",
      icon: TreePine,
    },
    {
      number: "04",
      title: "Transdisciplinary Arts & STEM",
      description:
        "Students explore robotics, mathematical modeling, and AI alongside classical Indian music, theatre productions, and fine arts exhibitions.",
      icon: Sparkles,
    },
    {
      number: "05",
      title: "Holistic Character & Service",
      description:
        "Through student-led community outreach, environmental initiatives, and house leadership, our scholars graduate with deep ethical responsibility.",
      icon: HeartHandshake,
    },
  ];

  const milestones = [
    {
      year: "2012",
      title: "Foundation of LAX360",
      description:
        "Established on a tranquil 28-acre campus along the Chennai knowledge corridor with an inaugural cohort of 180 curious learners.",
    },
    {
      year: "2015",
      title: "Cambridge & IB Authorization",
      description:
        "Accredited by Cambridge Assessment International Education (CAIE) and authorized for the International Baccalaureate Primary Years Programme.",
    },
    {
      year: "2018",
      title: "Olympic Sports Wing & Performing Arts Hall",
      description:
        "Inauguration of our 50m temperature-controlled aquatic center, FIFA-grade turf ground, and 800-seat multi-tier auditorium.",
    },
    {
      year: "2021",
      title: "Applied STEM & AI Incubator",
      description:
        "Launched a state-of-the-art computational lab and student innovation incubator partnering with premier research institutions.",
    },
    {
      year: "2024",
      title: "Net-Zero Eco-Campus Milestone",
      description:
        "Achieved 100% solar self-sufficiency and full circular water recycling, honored with the Green School Leadership Award.",
    },
    {
      year: "2026",
      title: "Exemplary Academic Distinction",
      description:
        "Over 1,200 scholars thriving across K–12, maintaining a 100% university acceptance rate across premier Indian and international institutions.",
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
                coalesce on a serene 28-acre bio-campus.
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
                      Over 35,000 curated volumes, collaborative pods, and silent research rooms.
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

      {/* Principal / Head of School Leadership Message */}
      <section className="py-20 lg:py-28 bg-[#FAF8F5] border-b border-[#EAE3D7]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-12 lg:p-16 border border-[#EAE3D7] shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              <div className="lg:col-span-4 flex flex-col items-center text-center">
                <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-2xl overflow-hidden border-2 border-[#EAE3D7] shadow-md mb-4 bg-slate-100">
                  <Image
                    src="/images/campus/classroom.jpg"
                    alt="Head of School, LAX360 Academy"
                    fill
                    sizes="220px"
                    className="object-cover"
                  />
                </div>
                <h3 className="font-serif font-bold text-lg text-slate-900">
                  Dr. Rajeshwari Sundaram
                </h3>
                <p className="text-xs font-semibold text-amber-800 uppercase tracking-wider mt-0.5">
                  Head of School & Principal
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Ph.D. Education (Cambridge) • 24 Years in International Pedagogy
                </p>
              </div>

              <div className="lg:col-span-8 space-y-5">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-900 flex items-center justify-center">
                  <Quote className="w-5 h-5 text-amber-800" />
                </div>

                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight leading-snug">
                  &ldquo;We cultivate not merely scholars who pass examinations, but thinkers who
                  interrogate problems with empathy and courage.&rdquo;
                </h2>

                <div className="space-y-3.5 text-sm text-slate-600 leading-relaxed">
                  <p>
                    Welcome to LAX360 Academy. When we founded this institution fourteen years ago,
                    our vision was clear: to create an educational sanctuary where academic rigor is
                    grounded in human warmth, ethical values, and joyful curiosity.
                  </p>
                  <p>
                    Today, as the world navigates unprecedented technological acceleration, the true
                    measure of an education is not what a student memorizes, but how deeply they
                    understand themselves, collaborate across cultures, and formulate compassionate
                    solutions to complex challenges.
                  </p>
                  <p>
                    Every student who walks through our green gates is treated as a distinct universe
                    of capability. Our educators do not lecture from pedestals; they mentor, guide,
                    and inspire learners to discover their own voice.
                  </p>
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <div className="h-0.5 w-10 bg-amber-700" />
                  <span className="font-serif italic text-slate-800 font-medium text-sm">
                    Rajeshwari Sundaram, Ph.D.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes LAX360 Different (5 Distinctive Pillars) */}
      <section className="py-20 lg:py-28 bg-white border-b border-[#EAE3D7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-800">
              DISTINCTIVE ADVANTAGES
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
              What Sets LAX360 Apart
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Our five institutional tenets define everyday student life, intellectual culture, and
              academic success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {distinctivePillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <FloatingCard
                  key={idx}
                  maxTilt={4}
                  className="bg-[#FAF8F5] rounded-3xl p-8 border border-[#EAE3D7] shadow-xs space-y-4 hover:border-amber-200 transition-colors flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-amber-800 px-2.5 py-1 rounded-md bg-amber-100/60">
                        {pillar.number}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-white border border-[#EAE3D7] flex items-center justify-center text-slate-900">
                        <Icon className="w-5 h-5 text-slate-800" />
                      </div>
                    </div>

                    <h3 className="text-xl font-serif font-bold text-slate-900">{pillar.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="pt-2 text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                    <span>Institutional Standard</span>
                    <Sparkle className="w-3 h-3 text-amber-600" />
                  </div>
                </FloatingCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Institutional Milestones Timeline */}
      <section className="py-20 lg:py-28 bg-[#FAF8F5] border-b border-[#EAE3D7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-800">
              OUR JOURNEY
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
              Milestones in Educational Leadership
            </h2>
            <p className="text-base text-slate-600">
              From our founding vision in 2012 to our standing today as a premier Indian educational institution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {milestones.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-8 border border-[#EAE3D7] shadow-xs space-y-4 hover:shadow-md transition-shadow relative overflow-hidden"
              >
                <div className="inline-block px-3 py-1 rounded-full bg-slate-900 text-white font-mono text-xs font-bold">
                  {item.year}
                </div>
                <h3 className="text-xl font-serif font-bold text-slate-900">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Foundational Ethos & Pedagogical Pillars */}
      <section className="py-20 lg:py-28 bg-white border-b border-[#EAE3D7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-800">
              CORE PHILOSOPHY
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
              Educational Pillars at LAX360
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
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
                  className="bg-[#FAF8F5] rounded-3xl p-8 sm:p-10 border border-[#EAE3D7] shadow-xs space-y-4 hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 rounded-xl bg-white text-amber-900 border border-[#EAE3D7] flex items-center justify-center">
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
      <section className="py-20 bg-[#FAF8F5] border-b border-[#EAE3D7]">
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
                className="p-5 rounded-2xl bg-white border border-[#EAE3D7] text-center flex flex-col items-center justify-center space-y-2 shadow-2xs"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                <span className="text-xs font-semibold text-slate-800">{acc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
            Experience the LAX360 Campus
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            We invite prospective parents and scholars to walk our shaded walkways, visit our
            laboratories, and converse with our faculty mentors.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/admissions"
              className="px-8 py-3.5 rounded-xl bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors shadow-sm text-sm flex items-center gap-2"
            >
              <span>Begin Admissions Enquiry</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3.5 rounded-xl bg-[#FAF8F5] text-slate-800 font-medium border border-[#EAE3D7] hover:bg-slate-100 transition-colors text-sm"
            >
              Book a Campus Walkthrough
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
