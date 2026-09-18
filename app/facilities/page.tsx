"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Building2,
  CheckCircle2,
  Layers,
  MapPin,
  Calendar,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Activity,
  ArrowRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingCard from "@/components/ui/FloatingCard";
import { AdminStorage, AdminFacilityItem } from "@/lib/adminStorage";

export default function FacilitiesPage() {
  const [facilities, setFacilities] = useState<AdminFacilityItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    setFacilities(AdminStorage.getFacilities());
  }, []);

  const categories = [
    "All",
    "Academic",
    "Sports",
    "STEM",
    "Arts",
    "Library",
    "Eco Campus",
  ];

  const filteredFacilities = facilities.filter(
    (f) => selectedCategory === "All" || f.category.toLowerCase() === selectedCategory.toLowerCase()
  );

  const campusSafetyFeatures = [
    {
      title: "24/7 Access & Biometric Security",
      desc: "Single-entry perimeter gates with automated RFID turnstiles, visitor pre-authorization, and CCTV surveillance covering all public corridors.",
    },
    {
      title: "Full-Time Medical Infirmary",
      desc: "Equipped with dedicated recovery beds, emergency oxygen, automated defibrillator (AED), and two registered full-time paediatric nurses.",
    },
    {
      title: "Clean Air & Acoustic Comfort",
      desc: "Classrooms and indoor sports areas feature HEPA air circulation systems and double-glazed acoustic glass minimizing noise pollution.",
    },
    {
      title: "Fleet Transport with Live GPS",
      desc: "Air-conditioned school buses with speed governors, female security attendants on board, and parent-accessible live mobile tracking.",
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
                <Building2 className="w-3.5 h-3.5 text-amber-700" />
                <span>CAMPUS INFRASTRUCTURE</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-slate-900 tracking-tight leading-[1.12]">
                Architectural Spaces <br />
                <span className="italic font-normal text-slate-700">Engineered for Excellence.</span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl">
                Our 28-acre green campus integrates advanced STEM research laboratories, Olympic-grade
                sports facilities, light-filled collaborative studios, and sustainable architectural
                design tailored for student safety and well-being.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  href="#spaces"
                  className="px-7 py-3.5 rounded-xl bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors shadow-sm text-sm"
                >
                  Explore Campus Spaces
                </a>
                <Link
                  href="/contact"
                  className="px-7 py-3.5 rounded-xl bg-white text-slate-700 font-medium border border-[#EAE3D7] hover:bg-slate-50 transition-colors text-sm"
                >
                  Schedule a Campus Visit
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
                    src="/images/campus/aquatic.jpg"
                    alt="LAX360 Olympic-grade Aquatic Center"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-xs font-semibold uppercase tracking-wider text-amber-300">
                      Olympic Aquatic Complex
                    </p>
                    <p className="text-sm font-medium text-slate-100">
                      Temperature-controlled 50m racing lanes with certified aquatic safety coaches.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Facilities Grid */}
      <section id="spaces" className="py-20 lg:py-28 bg-[#FAF8F5] border-b border-[#EAE3D7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-800">
              CAMPUS HIGHLIGHTS
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
              World-Class Learning Environments
            </h2>
            <p className="text-slate-600 text-base">
              Every facility has been purposely designed to maximize student engagement, safety, and
              creative freedom.
            </p>
          </div>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-white text-slate-600 border border-[#EAE3D7] hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFacilities.map((fac) => (
              <FloatingCard
                key={fac.id}
                maxTilt={4}
                className="bg-white rounded-3xl overflow-hidden border border-[#EAE3D7] shadow-xs flex flex-col justify-between hover:border-amber-200 transition-colors group"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                  <Image
                    src={fac.image || "/images/campus/classroom.jpg"}
                    alt={fac.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-md text-slate-900 font-semibold text-xs border border-white/60">
                    {fac.category}
                  </div>
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-900 font-semibold text-[11px] border border-emerald-200 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                    <span>{fac.status}</span>
                  </div>
                </div>

                <div className="p-6 sm:p-7 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-xl font-serif font-bold text-slate-900">{fac.name}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{fac.description}</p>
                  </div>

                  <div className="space-y-2 pt-3 border-t border-slate-100">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Technical Specs
                    </div>
                    <p className="text-xs text-slate-700 font-medium">{fac.specs}</p>

                    {fac.features && fac.features.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {fac.features.map((feat, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 bg-[#FAF8F5] border border-[#EAE3D7] text-[11px] text-slate-600 rounded-md font-medium"
                          >
                            {feat}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </FloatingCard>
            ))}
          </div>
        </div>
      </section>

      {/* Campus Health, Safety & Pastoral Security */}
      <section className="py-20 lg:py-28 bg-white border-b border-[#EAE3D7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-800">
              SAFETY & CARE
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
              Safety, Health & Campus Well-Being
            </h2>
            <p className="text-slate-600 text-base">
              A secure, serene physical environment where students feel protected, supported, and
              empowered to grow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {campusSafetyFeatures.map((feat, idx) => (
              <div
                key={idx}
                className="bg-[#FAF8F5] rounded-3xl p-8 border border-[#EAE3D7] shadow-xs space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-white border border-[#EAE3D7] text-slate-900 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-emerald-700" />
                </div>
                <h3 className="text-xl font-serif font-bold text-slate-900">{feat.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule Tour Callout */}
      <section className="py-16 bg-[#FAF8F5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
            Tour Our Campus Grounds
          </h3>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            Book an escorted walking tour with our admissions coordinators to inspect our laboratories,
            sports pavilions, and library commons firsthand.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-slate-900 text-white text-xs font-semibold uppercase tracking-wider hover:bg-slate-800 transition-colors"
            >
              <span>Schedule Campus Tour</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
