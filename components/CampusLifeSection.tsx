"use client";

import { motion } from "framer-motion";
import { Users } from "lucide-react";
import Image from "next/image";
import FloatingCard from "./ui/FloatingCard";

interface CampusActivityItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  badge: string;
  tags: string[];
}

const activities: CampusActivityItem[] = [
  {
    id: "sports",
    title: "Championship Athletics",
    category: "Sports & Athletics",
    description: "16 competitive inter-school sports disciplines coaching students in grit, strategic sportsmanship, and physical wellness.",
    image: "/images/campus/athletics.jpg",
    badge: "16 Varsity Teams",
    tags: ["Football", "Swimming", "Basketball", "Track & Field"],
  },
  {
    id: "music",
    title: "Philharmonic & Contemporary Music",
    category: "Music & Performance",
    description: "A 60-piece orchestra performing classical masterworks and modern symphonic film scores, alongside jazz ensembles.",
    image: "/images/campus/music.jpg",
    badge: "European Tour '25",
    tags: ["Symphony", "Chamber Choir", "Jazz Band", "Studio Sound"],
  },
  {
    id: "arts",
    title: "Fine Arts & Visual Curation",
    category: "Arts & Expression",
    description: "Sculptural installations, darkroom photography, oil canvases, and digital media showcased in annual public vernissages.",
    image: "/images/campus/visual-arts.jpg",
    badge: "Curated Showcase",
    tags: ["Oil Painting", "Ceramics", "Digital Illustration", "Photography"],
  },
  {
    id: "robotics",
    title: "LAX360 Robotics & AI Guild",
    category: "Clubs & Innovation",
    description: "Engineering autonomous robots, participating in global VEX and FIRST competitions, and exploring generative intelligence.",
    image: "/images/campus/robotics-club.jpg",
    badge: "Global Finalists",
    tags: ["Autonomous Vision", "FIRST Robotics", "3D Printing", "Python"],
  },
  {
    id: "leadership",
    title: "LAX360 Global Diplomacy (MUN)",
    category: "Student Leadership",
    description: "Debating resolution frameworks for global humanitarian crises, economic inequality, and environmental treaties.",
    image: "/images/campus/mun.jpg",
    badge: "Hague & NYC Delegation",
    tags: ["Public Speaking", "Geopolitics", "Treaty Drafting", "Ethics"],
  },
  {
    id: "field-trips",
    title: "Alpine Expeditions & Field Studies",
    category: "Field Trips & Outdoors",
    description: "Annual scientific fieldwork in glacier ecology, marine biodiversity surveys, and wilderness leadership expeditions.",
    image: "/images/campus/field-trips.jpg",
    badge: "Eco-Fellowship",
    tags: ["Glacier Ecology", "Marine Biology", "Orienteering", "Field Botany"],
  },
  {
    id: "culture",
    title: "World Cultural Biennale",
    category: "Cultural Activities",
    description: "A weeklong campus-wide celebration of literature, heritage cuisines, folk traditions, and international theater.",
    image: "/images/campus/cultural-fest.jpg",
    badge: "48+ Nations",
    tags: ["Multicultural Fest", "World Literature", "Culinary Arts", "Folklore"],
  },
  {
    id: "team-projects",
    title: "Collaborative Social Impact Lab",
    category: "Team Projects",
    description: "Multi-grade student syndicates partnering with NGOs to deploy renewable micro-grids and clean water monitoring.",
    image: "/images/campus/social-impact.jpg",
    badge: "UN SDG Partner",
    tags: ["Clean Water Tech", "Micro-Forestry", "Solar Audits", "Social Equity"],
  },
];

export default function CampusLifeSection() {
  return (
    <section id="campus" className="relative py-14 sm:py-16 lg:py-20 bg-transparent overflow-hidden">
      {/* Ambient background decoration */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-orange-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full px-6 sm:px-10 lg:px-16 max-w-[1800px] mx-auto relative z-10">
        {/* Section Header */}
        <div className="max-w-4xl mx-auto text-center mb-10 lg:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#EAE3D7] shadow-sm backdrop-blur-md mb-3"
          >
            <Users className="w-3.5 h-3.5 text-amber-700" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-800">
              Vibrant Student Life
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 mb-3 sm:mb-4"
          >
            More Than a <span className="text-gold-gradient">Classroom</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed"
          >
            Education at LAX360 flourishes through athletic grit, artistic daring,
            scientific innovation, and purposeful community leadership. Discover the
            boundless activities that shape our vibrant campus culture.
          </motion.p>
        </div>

        {/* Cinematic Grid of 8 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {activities.map((act, index) => (
            <motion.div
              key={act.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: (index % 4) * 0.1 }}
              className="h-full"
            >
              <FloatingCard className="group relative h-[400px] rounded-3xl overflow-hidden border border-[#EAE3D7] bg-white flex flex-col justify-end p-6 hover:border-amber-500/50 shadow-md hover:shadow-2xl">
                {/* Background Image with Hover Zoom */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <Image
                    src={act.image}
                    alt={act.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                  />
                  {/* Gradient Overlays for High Contrast Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/45 to-transparent" />
                </div>

                {/* Card Content */}
                <div className="relative z-10 flex flex-col">
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-amber-900 bg-amber-100/95 px-2.5 py-1 rounded-full border border-amber-300 shadow-sm backdrop-blur-md">
                      {act.category}
                    </span>
                    <span className="text-[10px] font-mono font-semibold text-white bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm">
                      {act.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-300 transition-colors leading-snug">
                    {act.title}
                  </h3>

                  <p className="text-xs text-slate-200 font-light line-clamp-3 mb-4 leading-relaxed">
                    {act.description}
                  </p>

                  {/* Activity Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/20">
                    {act.tags.slice(0, 3).map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] text-white/90 bg-white/15 px-2.5 py-0.5 rounded-full font-medium backdrop-blur-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </FloatingCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
