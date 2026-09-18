"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Compass,
  Users,
  Trophy,
  HeartHandshake,
  Music,
  Palette,
  Flag,
  Calendar,
  CheckCircle2,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AdminStorage, AdminClubItem, AdminHouseItem } from "@/lib/adminStorage";

export default function CampusLifePage() {
  const [clubs, setClubs] = useState<AdminClubItem[]>([]);
  const [houses, setHouses] = useState<AdminHouseItem[]>([]);

  useEffect(() => {
    setClubs(AdminStorage.getClubs());
    setHouses(AdminStorage.getHouses());
  }, []);

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
                <Compass className="w-3.5 h-3.5 text-amber-700" />
                <span>STUDENT LIFE & EXPERIENCES</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-slate-900 tracking-tight leading-[1.12]">
                A Vibrant Community <br />
                <span className="italic font-normal text-slate-700">Where Passions Flourish.</span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl">
                Beyond the classroom, student life at LAX360 is characterized by passionate student
                clubs, athletic championships, cultural festivals, and an enriching collegiate house
                culture.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  href="#clubs"
                  className="px-7 py-3.5 rounded-xl bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors shadow-sm text-sm"
                >
                  Clubs & Societies
                </a>
                <a
                  href="#houses"
                  className="px-7 py-3.5 rounded-xl bg-white text-slate-700 font-medium border border-[#EAE3D7] hover:bg-slate-50 transition-colors text-sm"
                >
                  House System
                </a>
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
                    src="/images/campus/cultural-fest.jpg"
                    alt="LAX360 Annual Cultural & Arts Festival"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-xs font-semibold uppercase tracking-wider text-amber-300">
                      Festivals & Performances
                    </p>
                    <p className="text-sm font-medium text-slate-100">
                      Celebrating creativity, performing arts, and student leadership on campus.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Clubs & Societies */}
      <section id="clubs" className="py-20 lg:py-28 bg-[#FAF8F5] border-b border-[#EAE3D7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-800">
              CO-CURRICULAR LIFE
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
              Clubs & Student Societies
            </h2>
            <p className="text-slate-600 text-base">
              Empowering students to lead, collaborate, and explore their individual talents.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clubs.map((club) => (
              <div
                key={club.id}
                className="bg-white rounded-2xl p-7 border border-[#EAE3D7] shadow-xs space-y-4 hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 bg-amber-50 text-amber-900 border border-amber-200/60 rounded-md text-xs font-semibold">
                      {club.category}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      {club.meetingDay || "Weekly"}
                    </span>
                  </div>

                  <h3 className="text-xl font-serif font-bold text-slate-900">{club.name}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{club.description}</p>
                </div>

                <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 font-medium flex items-center justify-between">
                  <span>Patron: {club.patron || "Faculty Advisory"}</span>
                  <span className="text-emerald-700 font-semibold">{club.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* House System */}
      <section id="houses" className="py-20 bg-white border-b border-[#EAE3D7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-14">
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-800">
              COLLEGIATE SPIRIT
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
              The Four-House System
            </h2>
            <p className="text-slate-600 text-base">
              Fostering camaraderie, mentorship across grade levels, and friendly inter-house rivalry.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {houses.map((house) => (
              <div
                key={house.id}
                className="p-6 rounded-3xl bg-[#FAF8F5] border border-[#EAE3D7] text-center space-y-3"
              >
                <div
                  className="w-12 h-12 rounded-2xl mx-auto flex items-center justify-center text-white shadow-xs font-bold"
                  style={{ backgroundColor: house.color || "#0F172A" }}
                >
                  <Flag className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-serif font-bold text-slate-900">{house.name}</h4>
                <p className="text-xs font-medium text-amber-800 italic">&ldquo;{house.motto}&rdquo;</p>
                <div className="pt-2 border-t border-[#EAE3D7] text-xs text-slate-600">
                  <span className="font-bold text-slate-900">{house.points || 1200}</span> House Points
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
