"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import SchoolCampusScroll from "@/components/SchoolCampusScroll";
import AcademicSection from "@/components/AcademicSection";
import CampusLifeSection from "@/components/CampusLifeSection";
import ProgramsSection from "@/components/ProgramsSection";
import FacilitiesSection from "@/components/FacilitiesSection";
import AdmissionsSection from "@/components/AdmissionsSection";
import Footer from "@/components/Footer";

export default function Home() {
  const [admissionsModalOpen, setAdmissionsModalOpen] = useState(false);

  const handleOpenAdmissions = () => {
    setAdmissionsModalOpen(true);
  };

  const handleCloseAdmissions = () => {
    setAdmissionsModalOpen(false);
  };

  return (
    <main className="relative min-h-screen bg-transparent text-slate-800 selection:bg-amber-100 selection:text-amber-900">
      {/* Fixed Navigation Bar with Blur & Crest Logo */}
      <Navbar onOpenAdmissions={handleOpenAdmissions} />

      {/* Hero Cinematic Scroll Engine (500vh with Sticky Canvas & 4 Overlays) */}
      <SchoolCampusScroll />

      {/* Academic Excellence Section */}
      <AcademicSection />

      {/* Educational Programs by Stages (Early Years to High School) */}
      <ProgramsSection />

      {/* Campus Life & Student Activities Grid */}
      <CampusLifeSection />

      {/* Campus Facilities & Architectural Spaces Showcase */}
      <FacilitiesSection />

      {/* Admissions Roadmap, Enquiry Modal & Visit Scheduler */}
      <AdmissionsSection
        isModalOpenExternal={admissionsModalOpen}
        onCloseExternal={handleCloseAdmissions}
      />

      {/* Final Cinematic CTA ("SHAPE THE FUTURE") & Institutional Footer */}
      <Footer onOpenAdmissions={handleOpenAdmissions} />
    </main>
  );
}
