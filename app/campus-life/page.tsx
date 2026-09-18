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
  Cpu,
  Sparkles,
  MapPin,
  Clock,
  ArrowRight,
  ShieldCheck,
  TreePine,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingCard from "@/components/ui/FloatingCard";
import {
  AdminStorage,
  AdminClubItem,
  AdminHouseItem,
  AdminEventItem,
} from "@/lib/adminStorage";

interface LifeFacet {
  title: string;
  category: string;
  description: string;
  image: string;
  tag: string;
}

export default function CampusLifePage() {
  const [clubs, setClubs] = useState<AdminClubItem[]>([]);
  const [houses, setHouses] = useState<AdminHouseItem[]>([]);
  const [events, setEvents] = useState<AdminEventItem[]>([]);
  const [selectedFacetCategory, setSelectedFacetCategory] = useState<string>("All");

  useEffect(() => {
    setClubs(AdminStorage.getClubs());
    setHouses(AdminStorage.getHouses());
    const loadedEvents = AdminStorage.getEvents();
    setEvents(loadedEvents.filter((e) => e.status === "Published"));
  }, []);

  const lifeFacets: LifeFacet[] = [
    {
      title: "Competitive Athletics & Sports",
      category: "Athletics",
      description:
        "From FIFA-standard football turfs to Olympic running tracks, athletic discipline and sportsmanship are integral to every student's daily routine.",
      image: "/images/campus/athletics.jpg",
      tag: "Track & Field • Football • Basketball",
    },
    {
      title: "Olympic Aquatic Center",
      category: "Athletics",
      description:
        "A temperature-controlled 50m racing pool staffed by certified life-saving instructors, hosting inter-school aquatic galas and daily swim training.",
      image: "/images/campus/aquatic.jpg",
      tag: "50m Olympic Pool • Water Polo",
    },
    {
      title: "Classical & Contemporary Music",
      category: "Arts",
      description:
        "Acoustically treated studios where students learn Carnatic vocals, Western orchestral strings, brass ensembles, and digital music production.",
      image: "/images/campus/music.jpg",
      tag: "Vocal • Orchestra • Recording Studio",
    },
    {
      title: "Visual & Studio Arts",
      category: "Arts",
      description:
        "High-ceiling studios illuminated by northern light for oil painting, ceramic wheel pottery, printmaking, and student-curated campus exhibitions.",
      image: "/images/campus/arts.jpg",
      tag: "Fine Art • Ceramics • Sculpture",
    },
    {
      title: "Robotics, AI & STEM Club",
      category: "Innovation",
      description:
        "Student teams construct autonomous rovers, design IoT microcontrollers, and compete nationally in FIRST Tech Challenge and World Robot Olympiad.",
      image: "/images/campus/robotics.jpg",
      tag: "Robotics • Python • Microcontrollers",
    },
    {
      title: "Student Innovation Incubator",
      category: "Innovation",
      description:
        "A collaborative maker space equipped with 3D printers, laser cutters, and rapid electronics prototyping tables for student invention projects.",
      image: "/images/campus/innovation.jpg",
      tag: "Maker Space • Prototyping • Patents",
    },
    {
      title: "Model UN & Diplomatic Leadership",
      category: "Leadership",
      description:
        "Scholars represent sovereign nations in rigorous parliamentary simulations, debating geopolitical crises and drafting binding peace resolutions.",
      image: "/images/campus/mun.jpg",
      tag: "Parliamentary Debate • Diplomacy",
    },
    {
      title: "Field Trips & Experiential Learning",
      category: "Exploration",
      description:
        "Structured journeys beyond campus walls: astronomical observatory visits, wetland bird sanctuaries, historical excavations, and biological reserves.",
      image: "/images/campus/field-trips.jpg",
      tag: "Heritage Walks • Science Treks",
    },
    {
      title: "Social Impact & Community Service",
      category: "Leadership",
      description:
        "Students dedicate weekly hours to rural literacy mentorship, local beach cleanups, book collection drives, and sustainable rural education initiatives.",
      image: "/images/campus/social-impact.jpg",
      tag: "Outreach • 40+ Annual Service Hours",
    },
    {
      title: "28-Acre Green Bio-Campus",
      category: "Exploration",
      description:
        "Living biological learning grounds with student-managed herbal gardens, a butterfly reserve, rainwater harvesting units, and composting pits.",
      image: "/images/campus/eco.jpg",
      tag: "Organic Gardens • Butterfly Haven",
    },
    {
      title: "Annual Cultural & Arts Festival",
      category: "Arts",
      description:
        "Our flagship multi-day celebration of dance, theatre, classical and folk performances, photography exhibits, and collegiate house spirit.",
      image: "/images/campus/cultural-fest.jpg",
      tag: "Theatre • Dance Drama • Exhibitions",
    },
  ];

  const facetCategories = ["All", "Athletics", "Arts", "Innovation", "Leadership", "Exploration"];

  const filteredFacets =
    selectedFacetCategory === "All"
      ? lifeFacets
      : lifeFacets.filter((f) => f.category === selectedFacetCategory);

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
                culture across our 28-acre green campus.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  href="#facets"
                  className="px-7 py-3.5 rounded-xl bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors shadow-sm text-sm"
                >
                  Explore Campus Life
                </a>
                <a
                  href="#events"
                  className="px-7 py-3.5 rounded-xl bg-white text-slate-700 font-medium border border-[#EAE3D7] hover:bg-slate-50 transition-colors text-sm"
                >
                  Campus Events & Calendar
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

      {/* 11 Student Life Facets Showcase */}
      <section id="facets" className="py-20 lg:py-28 bg-[#FAF8F5] border-b border-[#EAE3D7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-800">
              CO-CURRICULAR DIMENSIONS
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
              Life Outside the Lecture Hall
            </h2>
            <p className="text-slate-600 text-base">
              Explore the rich ecosystem of athletics, fine arts, laboratory innovation, and service
              that enlivens our grounds.
            </p>
          </div>

          {/* Facet Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {facetCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFacetCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedFacetCategory === cat
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-white text-slate-600 border border-[#EAE3D7] hover:bg-slate-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Cards Grid with FloatingCard Tilt */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFacets.map((facet, idx) => (
              <FloatingCard
                key={idx}
                maxTilt={4}
                className="bg-white rounded-3xl overflow-hidden border border-[#EAE3D7] shadow-xs hover:border-amber-200 transition-colors flex flex-col justify-between group"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                  <Image
                    src={facet.image}
                    alt={facet.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-md text-slate-900 font-semibold text-xs border border-white/60">
                    {facet.category}
                  </div>
                </div>

                <div className="p-6 sm:p-7 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-xl font-serif font-bold text-slate-900 leading-snug">
                      {facet.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{facet.description}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-100">
                    <span className="text-[11px] font-semibold text-amber-800">{facet.tag}</span>
                  </div>
                </div>
              </FloatingCard>
            ))}
          </div>
        </div>
      </section>

      {/* Four-House Collegiate System */}
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
              Named after the primordial elements, our houses foster cross-grade mentorship, athletic
              camaraderie, and friendly academic rivalry.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {houses.map((house) => (
              <FloatingCard
                key={house.id}
                maxTilt={4}
                className="p-7 rounded-3xl bg-[#FAF8F5] border border-[#EAE3D7] text-center space-y-4 hover:border-amber-200 transition-colors"
              >
                <div
                  className="w-14 h-14 rounded-2xl mx-auto flex items-center justify-center text-white shadow-xs font-bold"
                  style={{ backgroundColor: house.color || "#0F172A" }}
                >
                  <Flag className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-xl font-serif font-bold text-slate-900">{house.name}</h4>
                  <p className="text-xs font-medium text-amber-800 italic mt-0.5">
                    &ldquo;{house.motto}&rdquo;
                  </p>
                </div>
                <div className="pt-3 border-t border-[#EAE3D7] text-xs space-y-1 text-slate-600">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Mentor:</span>
                    <span className="font-semibold text-slate-800">{house.mentor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Captain:</span>
                    <span className="font-semibold text-slate-800">{house.captain}</span>
                  </div>
                  <div className="pt-2 text-center">
                    <span className="font-mono font-bold text-base text-slate-900">
                      {house.points || 1200}
                    </span>{" "}
                    <span className="text-xs text-slate-500 font-medium">Points</span>
                  </div>
                </div>
              </FloatingCard>
            ))}
          </div>
        </div>
      </section>

      {/* Clubs & Student Societies */}
      <section id="clubs" className="py-20 lg:py-28 bg-[#FAF8F5] border-b border-[#EAE3D7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-800">
              STUDENT INITIATIVES
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
              Clubs & Special Interest Societies
            </h2>
            <p className="text-slate-600 text-base">
              Student-led and faculty-mentored weekly co-curricular clubs that foster leadership,
              original research, and artistic depth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clubs.map((club) => (
              <div
                key={club.id}
                className="bg-white rounded-3xl p-7 border border-[#EAE3D7] shadow-xs space-y-4 hover:shadow-md transition-shadow flex flex-col justify-between"
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
                  <span>Faculty Mentor: {club.patron || "Academic Advisory"}</span>
                  <span className="text-emerald-700 font-semibold">{club.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events & Campus Calendar */}
      <section id="events" className="py-20 bg-white border-b border-[#EAE3D7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-14">
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-800">
              CAMPUS SCHEDULE
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
              Upcoming Events & Fixtures
            </h2>
            <p className="text-slate-600 text-base">
              Synchronized live from the LAX360 Administrative Calendar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-[#FAF8F5] rounded-3xl overflow-hidden border border-[#EAE3D7] shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow group"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                  <Image
                    src={event.image || "/images/campus/cultural-fest.jpg"}
                    alt={event.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-md text-slate-900 font-semibold text-xs border border-white/60">
                    {event.category}
                  </div>
                </div>

                <div className="p-6 sm:p-7 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs font-semibold text-amber-800">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{event.date}</span>
                      {event.time && <span>• {event.time}</span>}
                    </div>
                    <h3 className="text-xl font-serif font-bold text-slate-900">{event.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{event.description}</p>
                  </div>

                  <div className="pt-3 border-t border-[#EAE3D7] space-y-1.5 text-xs text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>Grades: {event.targetGrades || "All Cohorts"}</span>
                    </div>
                  </div>
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
