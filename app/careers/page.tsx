"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target,
  TrendingUp,
  UsersRound,
  BriefcaseBusiness,
  GraduationCap,
  MapPin,
  Clock,
  Building2,
  BookOpen,
  HeartHandshake,
  CheckCircle2,
  X,
  Search,
  FileText,
  UploadCloud,
  ShieldCheck,
  School,
  Calendar,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  AdminStorage,
  AdminJobItem,
  AdminJobApplication,
  AdminConsentRecord,
  DEFAULT_JOBS,
} from "@/lib/adminStorage";

export default function CareersPage() {
  const [jobs, setJobs] = useState<AdminJobItem[]>(() =>
    DEFAULT_JOBS.filter((j) => j.status === "Published")
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");

  // Modals
  const [detailJob, setDetailJob] = useState<AdminJobItem | null>(null);
  const [applyJob, setApplyJob] = useState<AdminJobItem | null>(null);
  const [isGeneralApply, setIsGeneralApply] = useState(false);

  // Application Form States
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [appliedPosition, setAppliedPosition] = useState("");
  const [qualification, setQualification] = useState("");
  const [experienceYears, setExperienceYears] = useState("");
  const [resumeFileName, setResumeFileName] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [consentGiven, setConsentGiven] = useState(false);

  // Submission Status
  const [validationError, setValidationError] = useState("");
  const [isSubmittedSuccess, setIsSubmittedSuccess] = useState(false);
  const [submittedRef, setSubmittedRef] = useState("");

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = () => {
    const allJobs = AdminStorage.getJobs();
    // Only show published jobs on public careers page
    const published = allJobs.filter((j) => j.status === "Published");
    setJobs(published);
  };

  // Filter Categories
  const filterCategories = [
    "All",
    "Secondary School",
    "Middle School",
    "Primary School",
    "Student Wellbeing",
    "Academic Administration",
    "School Sports",
  ];

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.schoolLevel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.about.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      selectedFilter === "All" ||
      job.schoolLevel.toLowerCase() === selectedFilter.toLowerCase() ||
      job.department.toLowerCase() === selectedFilter.toLowerCase();

    return matchesSearch && matchesFilter;
  });

  const handleOpenDetail = (job: AdminJobItem) => {
    setDetailJob(job);
  };

  const handleOpenApply = (job?: AdminJobItem) => {
    setDetailJob(null);
    if (job) {
      setApplyJob(job);
      setAppliedPosition(job.title);
      setIsGeneralApply(false);
    } else {
      setApplyJob(null);
      setAppliedPosition("General Faculty Application");
      setIsGeneralApply(true);
    }
    setValidationError("");
    setIsSubmittedSuccess(false);
  };

  const handleCloseModals = () => {
    setDetailJob(null);
    setApplyJob(null);
    setIsGeneralApply(false);
    setValidationError("");
    setIsSubmittedSuccess(false);
    // Reset form fields
    setFullName("");
    setEmail("");
    setPhone("");
    setQualification("");
    setExperienceYears("");
    setResumeFileName("");
    setCoverLetter("");
    setPortfolioUrl("");
    setConsentGiven(false);
  };

  const handleFileSimulation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResumeFileName(file.name);
    }
  };

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");

    // Form Validations
    if (!fullName.trim()) {
      setValidationError("Please provide your full legal name.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setValidationError("Please provide a valid contact email address.");
      return;
    }
    if (!phone.trim()) {
      setValidationError("Please enter your active phone number.");
      return;
    }
    if (!qualification.trim()) {
      setValidationError("Please enter your highest educational qualification.");
      return;
    }
    if (!consentGiven) {
      setValidationError(
        "You must consent to the processing of your details for recruitment purposes."
      );
      return;
    }

    const referenceId = `APP-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const formattedDate = `${now.getDate()} ${now.toLocaleString("en-US", {
      month: "short",
    })} ${now.getFullYear()}`;

    const newApplication: AdminJobApplication = {
      id: `app-${Date.now()}`,
      jobId: applyJob ? applyJob.id : "general-faculty",
      position: appliedPosition || (applyJob ? applyJob.title : "General Faculty"),
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      highestQualification: qualification.trim(),
      experienceYears: experienceYears.trim() || "Not specified",
      resumeFileName: resumeFileName || "Curriculum_Vitae_Document.pdf",
      coverLetter: coverLetter.trim(),
      portfolioUrl: portfolioUrl.trim(),
      consentGiven: true,
      appliedDate: formattedDate,
      status: "New",
      notes: isGeneralApply
        ? "Spontaneous faculty application received through careers portal."
        : "Submitted via Careers opportunity listing.",
    };

    // 1. Persist application in local storage
    const currentApplications = AdminStorage.getJobApplications();
    AdminStorage.saveJobApplications([newApplication, ...currentApplications]);

    // 2. Increment job applications count if linked to a specific job
    if (applyJob) {
      const allJobs = AdminStorage.getJobs();
      const updatedJobs = allJobs.map((j) =>
        j.id === applyJob.id
          ? { ...j, applicationsCount: (j.applicationsCount || 0) + 1 }
          : j
      );
      AdminStorage.saveJobs(updatedJobs);
      loadJobs();
    }

    // 3. Log consent record in audit trail
    const currentConsents = AdminStorage.getConsentRecords();
    const newConsentRecord: AdminConsentRecord = {
      id: `cr-${Date.now()}`,
      user: email.trim(),
      purpose: "Career Application",
      consent: "Granted",
      date: formattedDate,
      status: "Active",
      subjectName: fullName.trim(),
      subjectEmail: email.trim(),
      noticeText:
        "I understand that the information I provide may be used for recruitment purposes as described in the Privacy Notice.",
      ipAddress: "127.0.0.1 (Frontend Demo)",
      timestamp: new Date().toISOString(),
    };
    AdminStorage.saveConsentRecords([newConsentRecord, ...currentConsents]);

    setSubmittedRef(referenceId);
    setIsSubmittedSuccess(true);
  };

  return (
    <div className="min-h-screen bg-[#FCFBF7] text-slate-800 flex flex-col selection:bg-amber-100 selection:text-amber-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-28 pb-14 lg:pt-32 lg:pb-16 overflow-hidden border-b border-[#EAE3D7]">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#F7F4EE] via-[#FCFBF7] to-[#FCFBF7]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-5 sm:space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200/80 text-amber-900 text-xs font-semibold uppercase tracking-wider">
                <BriefcaseBusiness className="w-3.5 h-3.5 text-amber-700" />
                <span>CAREERS AT LAX360</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-slate-900 tracking-tight leading-[1.12]">
                Shape Young Minds. <br />
                <span className="italic font-normal text-slate-700">Shape Your Career.</span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl">
                Join a community of educators and professionals who believe that
                meaningful learning begins with inspired people.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  href="#opportunities"
                  className="px-7 py-3.5 rounded-xl bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors shadow-sm"
                >
                  Explore Opportunities
                </a>
                <a
                  href="#why-join"
                  className="px-7 py-3.5 rounded-xl bg-white text-slate-700 font-medium border border-[#EAE3D7] hover:bg-slate-50 transition-colors"
                >
                  Why LAX360
                </a>
              </div>
            </motion.div>

            {/* Right Campus Photography */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="lg:col-span-5"
            >
              <div className="relative rounded-3xl overflow-hidden border border-[#EAE3D7] shadow-xl bg-white p-2">
                <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden">
                  <Image
                    src="/images/campus/classroom.jpg"
                    alt="LAX360 Collaborative Learning Classroom"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-xs font-semibold uppercase tracking-wider text-amber-300">
                      Collaborative Classrooms
                    </p>
                    <p className="text-sm font-medium text-slate-100">
                      Nurturing inquiry, student dialogue, and intellectual wonder.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Introduction / Purpose Section */}
      <section className="py-12 lg:py-16 bg-white border-b border-[#EAE3D7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-8 sm:mb-10">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
              Build a Career With Purpose
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              At LAX360, teaching is not an occupation—it is a calling of profound significance.
              We cultivate an environment where pedagogical innovation, intellectual rigor, and
              genuine child mentorship intersect to create transformative educational experiences.
            </p>
          </div>

          {/* 3 Clean Purpose Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <div className="bg-[#FCFBF7] rounded-2xl p-6 sm:p-7 border border-[#EAE3D7] space-y-4 hover:border-slate-300 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-amber-100/70 text-amber-900 flex items-center justify-center">
                <Target className="w-6 h-6 text-amber-800" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-slate-900">Purpose</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Every role directly impacts young minds and community character, creating lasting
                ripples of positive change.
              </p>
            </div>

            <div className="bg-[#FCFBF7] rounded-2xl p-6 sm:p-7 border border-[#EAE3D7] space-y-4 hover:border-slate-300 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-900 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-slate-800" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-slate-900">Growth</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Continuous professional development, pedagogical workshops, and leadership paths
                empower you to continually master your craft.
              </p>
            </div>

            <div className="bg-[#FCFBF7] rounded-2xl p-6 sm:p-7 border border-[#EAE3D7] space-y-4 hover:border-slate-300 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-amber-100/70 text-amber-900 flex items-center justify-center">
                <UsersRound className="w-6 h-6 text-amber-800" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-slate-900">Community</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                A supportive, values-driven culture where every educator is respected, valued, and
                encouraged to collaborate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Join Our School Community (6 Value Cards) */}
      <section id="why-join" className="py-14 sm:py-16 lg:py-20 bg-[#FAF8F5] border-b border-[#EAE3D7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-8 sm:mb-10">
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-800">
              OUR FACULTY EXPERIENCE
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
              Why Join Our School Community
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              An environment where educators and school professionals thrive.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl p-7 border border-[#EAE3D7] shadow-xs space-y-3.5 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center">
                <HeartHandshake className="w-5 h-5 text-slate-700" />
              </div>
              <h3 className="text-lg font-serif font-semibold text-slate-900">Meaningful Work</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Inspire curious students and contribute to an ethos of deep conceptual learning and
                character formation.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl p-7 border border-[#EAE3D7] shadow-xs space-y-3.5 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-amber-700" />
              </div>
              <h3 className="text-lg font-serif font-semibold text-slate-900">
                Professional Growth
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Continuous professional development through teaching workshops, curriculum
                seminars, and educational leadership programs.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl p-7 border border-[#EAE3D7] shadow-xs space-y-3.5 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center">
                <UsersRound className="w-5 h-5 text-slate-700" />
              </div>
              <h3 className="text-lg font-serif font-semibold text-slate-900">
                Collaborative Culture
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Work alongside dedicated subject specialists and mentor educators in a collegiate,
                respectful atmosphere.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-2xl p-7 border border-[#EAE3D7] shadow-xs space-y-3.5 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-amber-700" />
              </div>
              <h3 className="text-lg font-serif font-semibold text-slate-900">Inspiring Campus</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Teach in modern, light-filled classrooms, advanced science and STEM labs, creative
                arts studios, and sports grounds.
              </p>
            </div>

            {/* Card 5 */}
            <div className="bg-white rounded-2xl p-7 border border-[#EAE3D7] shadow-xs space-y-3.5 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-slate-700" />
              </div>
              <h3 className="text-lg font-serif font-semibold text-slate-900">
                Student-Centred Approach
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Small class sizes that foster strong student-teacher bonds, tailored attention, and
                joyful exploration.
              </p>
            </div>

            {/* Card 6 */}
            <div className="bg-white rounded-2xl p-7 border border-[#EAE3D7] shadow-xs space-y-3.5 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center">
                <School className="w-5 h-5 text-amber-700" />
              </div>
              <h3 className="text-lg font-serif font-semibold text-slate-900">
                Inclusive Community
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                A welcoming, diverse community celebrating Indian heritage alongside global
                pedagogical perspectives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Career Opportunities (Academic vs Non-Academic Pathways) */}
      <section className="py-12 lg:py-16 bg-white border-b border-[#EAE3D7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
              Explore Career Pathways
            </h2>
            <p className="text-slate-600 text-base">
              Discover opportunities across our academic and institutional ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* Academic Roles */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#FAF8F5] border border-[#EAE3D7] space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-slate-900">Academic Roles</h3>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">
                    Instruction & Pedagogical Mentorship
                  </p>
                </div>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Includes Subject Teachers (Primary, Middle & Secondary), Laboratory Instructors,
                Curriculum Heads, and Academic Program Coordinators passionate about nurturing
                curiosity and disciplinary mastery.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="px-3 py-1 bg-white border border-[#EAE3D7] text-xs font-medium text-slate-700 rounded-lg">
                  Mathematics & Sciences
                </span>
                <span className="px-3 py-1 bg-white border border-[#EAE3D7] text-xs font-medium text-slate-700 rounded-lg">
                  Languages & Literature
                </span>
                <span className="px-3 py-1 bg-white border border-[#EAE3D7] text-xs font-medium text-slate-700 rounded-lg">
                  Early Childhood & Primary
                </span>
                <span className="px-3 py-1 bg-white border border-[#EAE3D7] text-xs font-medium text-slate-700 rounded-lg">
                  Robotics & STEM
                </span>
              </div>
            </div>

            {/* Non-Academic & Administrative Roles */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#FAF8F5] border border-[#EAE3D7] space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-slate-900">
                    Non-Academic & Administrative
                  </h3>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">
                    Wellbeing, Operations & Leadership
                  </p>
                </div>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Encompasses Student Counsellors, Sports Coaches, Admissions Counselors, Timetable
                Administrators, and Campus Operational leaders who build the supportive backbone of
                our school.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="px-3 py-1 bg-white border border-[#EAE3D7] text-xs font-medium text-slate-700 rounded-lg">
                  Student Wellbeing & Counselling
                </span>
                <span className="px-3 py-1 bg-white border border-[#EAE3D7] text-xs font-medium text-slate-700 rounded-lg">
                  Physical Education & Sports
                </span>
                <span className="px-3 py-1 bg-white border border-[#EAE3D7] text-xs font-medium text-slate-700 rounded-lg">
                  Academic Coordination
                </span>
                <span className="px-3 py-1 bg-white border border-[#EAE3D7] text-xs font-medium text-slate-700 rounded-lg">
                  Admissions Advisory
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Current Opportunities Section */}
      <section id="opportunities" className="py-14 sm:py-16 lg:py-20 bg-[#FAF8F5] flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-8 sm:mb-10">
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-800">
              OPEN FACULTY & STAFF POSITIONS
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
              Current Opportunities
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Explore open faculty and administrative positions across our campus.
            </p>
          </div>

          {/* Search & Category Filter Tabs */}
          <div className="mb-6 sm:mb-8 space-y-4">
            <div className="max-w-md mx-auto relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search positions, subjects, departments..."
                className="w-full pl-11 pr-4 py-3 bg-white rounded-xl border border-[#EAE3D7] text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800 transition-all shadow-xs"
              />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              {filterCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedFilter(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                    selectedFilter === cat
                      ? "bg-slate-900 text-white shadow-xs"
                      : "bg-white text-slate-600 border border-[#EAE3D7] hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Open Positions Grid */}
          {filteredJobs.length === 0 ? (
            <div className="max-w-md mx-auto text-center py-16 bg-white rounded-2xl border border-[#EAE3D7] p-8 space-y-4">
              <BriefcaseBusiness className="w-10 h-10 text-slate-400 mx-auto" />
              <h3 className="text-lg font-serif font-semibold text-slate-800">
                No matching positions found
              </h3>
              <p className="text-sm text-slate-500">
                We couldn’t find any active listings matching &quot;{searchTerm}&quot;. You can clear
                your search or submit a spontaneous general application.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedFilter("All");
                }}
                className="px-4 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white rounded-2xl p-6 sm:p-7 border border-[#EAE3D7] shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow group"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-3">
                      <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-amber-50 text-amber-900 border border-amber-200/60">
                        {job.schoolLevel}
                      </span>
                      <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {job.location}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl font-serif font-bold text-slate-900 group-hover:text-amber-900 transition-colors">
                        {job.title}
                      </h3>
                      <p className="text-xs font-medium text-slate-500 mt-1">
                        {job.department} • {job.employmentType}
                      </p>
                    </div>

                    <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">
                      {job.about}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-slate-100 mt-6 flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-medium">
                      Apply by: {job.applicationDeadline}
                    </span>
                    <button
                      onClick={() => handleOpenDetail(job)}
                      className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-xs"
                    >
                      View Position
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* General Spontaneous Application Callout */}
          <div className="mt-8 sm:mt-10 max-w-3xl mx-auto rounded-3xl bg-white border border-[#EAE3D7] p-6 sm:p-8 shadow-xs text-center space-y-4">
            <h3 className="text-xl font-serif font-bold text-slate-900">
              Don&apos;t see your specific specialization listed?
            </h3>
            <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              We are always keen to connect with passionate educators, lab specialists, and school
              leaders who share our vision for meaningful, student-centred education.
            </p>
            <div className="pt-2">
              <button
                onClick={() => handleOpenApply()}
                className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium text-sm transition-colors border border-slate-200"
              >
                Submit General Profile
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* JOB DETAILS MODAL */}
      <AnimatePresence>
        {detailJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#EAE3D7] shadow-2xl p-6 sm:p-8 relative space-y-6"
            >
              {/* Close Button */}
              <button
                onClick={handleCloseModals}
                className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Close details"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header */}
              <div className="space-y-3 pr-8">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-md bg-amber-50 text-amber-900 border border-amber-200 text-xs font-semibold">
                    {detailJob.schoolLevel}
                  </span>
                  <span className="px-3 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium">
                    {detailJob.department}
                  </span>
                  <span className="px-3 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium">
                    {detailJob.employmentType}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                  {detailJob.title}
                </h2>
                <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {detailJob.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    Deadline: {detailJob.applicationDeadline}
                  </span>
                </div>
              </div>

              {/* About the Role */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  About the Role
                </h4>
                <p className="text-slate-700 text-sm leading-relaxed">{detailJob.about}</p>
              </div>

              {/* Key Responsibilities */}
              {detailJob.responsibilities && detailJob.responsibilities.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Key Responsibilities
                  </h4>
                  <ul className="space-y-2 text-sm text-slate-700">
                    {detailJob.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Requirements & Qualifications */}
              {detailJob.requirements && detailJob.requirements.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Requirements & Qualifications
                  </h4>
                  <ul className="space-y-2 text-sm text-slate-700">
                    {detailJob.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Preferred Experience */}
              {detailJob.preferredExperience && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Preferred Experience
                  </h4>
                  <p className="text-slate-700 text-sm leading-relaxed bg-[#FAF8F5] p-3.5 rounded-xl border border-[#EAE3D7]">
                    {detailJob.preferredExperience}
                  </p>
                </div>
              )}

              {/* What We Value */}
              {detailJob.whatWeValue && detailJob.whatWeValue.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    What We Value
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {detailJob.whatWeValue.map((item, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-amber-50 text-amber-900 border border-amber-200/70 text-xs rounded-lg font-medium"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Modal Actions */}
              <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCloseModals}
                  className="px-5 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => handleOpenApply(detailJob)}
                  className="px-6 py-2.5 rounded-xl text-sm font-semibold bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-xs"
                >
                  Apply for this Position
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* APPLICATION FORM MODAL */}
      <AnimatePresence>
        {(applyJob || isGeneralApply) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto border border-[#EAE3D7] shadow-2xl p-6 sm:p-8 relative space-y-6"
            >
              {/* Close Button */}
              <button
                onClick={handleCloseModals}
                className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {!isSubmittedSuccess ? (
                <>
                  {/* Header */}
                  <div className="space-y-1 pr-8">
                    <p className="text-xs font-semibold uppercase tracking-wider text-amber-800">
                      CANDIDATE APPLICATION
                    </p>
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                      {applyJob ? applyJob.title : "General Faculty Application"}
                    </h2>
                    <p className="text-xs text-slate-500">
                      {applyJob
                        ? `${applyJob.department} • ${applyJob.schoolLevel} • Chennai`
                        : "Express your interest to join the LAX360 educational community"}
                    </p>
                  </div>

                  {/* Validation Error Message */}
                  {validationError && (
                    <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium">
                      {validationError}
                    </div>
                  )}

                  {/* Application Form */}
                  <form onSubmit={handleSubmitApplication} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Full Name */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700">
                          Full Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Dr. Rajesh Sundaram"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE3D7] text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800"
                        />
                      </div>

                      {/* Email Address */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700">
                          Email Address <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="rajesh.s@domain.in"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE3D7] text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Phone Number */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700">
                          Phone Number <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 98400 12345"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE3D7] text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800"
                        />
                      </div>

                      {/* Position Applied For */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700">
                          Position Applied For <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          readOnly={!!applyJob}
                          value={appliedPosition}
                          onChange={(e) => setAppliedPosition(e.target.value)}
                          className={`w-full px-3.5 py-2.5 rounded-xl border border-[#EAE3D7] text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800 ${
                            applyJob ? "bg-slate-50 cursor-not-allowed text-slate-600" : "bg-white"
                          }`}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Highest Qualification */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700">
                          Highest Qualification <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={qualification}
                          onChange={(e) => setQualification(e.target.value)}
                          placeholder="e.g. M.Sc. Mathematics, B.Ed"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE3D7] text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800"
                        />
                      </div>

                      {/* Total Years of Experience */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700">
                          Total Years of Experience
                        </label>
                        <input
                          type="text"
                          value={experienceYears}
                          onChange={(e) => setExperienceYears(e.target.value)}
                          placeholder="e.g. 5 Years"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE3D7] text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800"
                        />
                      </div>
                    </div>

                    {/* Resume Upload Simulation */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">
                        Resume / CV Document (.pdf, .doc, .docx)
                      </label>
                      <div className="relative border-2 border-dashed border-[#EAE3D7] rounded-xl p-4 text-center hover:border-slate-400 transition-colors bg-[#FAF8F5]">
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileSimulation}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div className="flex flex-col items-center justify-center gap-1.5 pointer-events-none">
                          <UploadCloud className="w-6 h-6 text-slate-400" />
                          <p className="text-xs font-medium text-slate-700">
                            {resumeFileName ? (
                              <span className="text-emerald-700 font-semibold">
                                Attached: {resumeFileName}
                              </span>
                            ) : (
                              "Click or drag your curriculum vitae here to attach"
                            )}
                          </p>
                          <p className="text-[11px] text-slate-400">PDF, DOC up to 10MB</p>
                        </div>
                      </div>
                    </div>

                    {/* Cover Letter / Statement */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">
                        Cover Letter / Statement of Teaching Philosophy
                      </label>
                      <textarea
                        rows={3}
                        value={coverLetter}
                        onChange={(e) => setCoverLetter(e.target.value)}
                        placeholder="Briefly share why you wish to teach at LAX360 and your approach to student learning..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE3D7] text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800"
                      />
                    </div>

                    {/* Portfolio / LinkedIn */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">
                        Portfolio or LinkedIn URL (Optional)
                      </label>
                      <input
                        type="url"
                        value={portfolioUrl}
                        onChange={(e) => setPortfolioUrl(e.target.value)}
                        placeholder="https://linkedin.com/in/username"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE3D7] text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800"
                      />
                    </div>

                    {/* Mandatory Consent Checkbox (UNCHECKED BY DEFAULT) */}
                    <div className="pt-2 pb-1">
                      <label className="flex items-start gap-3 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={consentGiven}
                          onChange={(e) => setConsentGiven(e.target.checked)}
                          className="mt-1 w-4 h-4 text-slate-900 rounded-sm border-slate-300 focus:ring-slate-900"
                        />
                        <span className="text-xs text-slate-600 leading-relaxed">
                          I understand that the information I provide may be used for recruitment
                          purposes as described in the{" "}
                          <Link
                            href="/privacy"
                            target="_blank"
                            className="text-amber-900 underline hover:text-slate-900 font-semibold"
                          >
                            Privacy Notice
                          </Link>
                          .
                        </span>
                      </label>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                      <button
                        type="button"
                        onClick={handleCloseModals}
                        className="px-5 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-7 py-2.5 rounded-xl text-sm font-semibold bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-xs"
                      >
                        Submit Application
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                /* Success State */
                <div className="text-center py-6 space-y-5">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8 text-emerald-700" />
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
                      Application recorded
                    </p>
                    <h3 className="text-2xl font-serif font-bold text-slate-900">
                      Thank you for your interest in joining LAX360
                    </h3>
                    <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                      Your application has been recorded in this demo environment. The Academic
                      Advisory desk has received your profile details and documents.
                    </p>
                  </div>

                  <div className="bg-[#FAF8F5] rounded-2xl border border-[#EAE3D7] p-5 max-w-md mx-auto text-left space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-[#EAE3D7]">
                      <span className="text-slate-500 font-medium">Reference Code:</span>
                      <span className="font-mono font-bold text-slate-900">{submittedRef}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#EAE3D7]">
                      <span className="text-slate-500 font-medium">Applicant:</span>
                      <span className="font-semibold text-slate-900">{fullName}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#EAE3D7]">
                      <span className="text-slate-500 font-medium">Role:</span>
                      <span className="font-semibold text-slate-900">{appliedPosition}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-500 font-medium">Consent Status:</span>
                      <span className="font-semibold text-emerald-700 flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" /> Logged to Audit Trail
                      </span>
                    </div>
                  </div>

                  <div className="pt-3">
                    <button
                      type="button"
                      onClick={handleCloseModals}
                      className="px-7 py-3 rounded-xl text-sm font-semibold bg-slate-900 text-white hover:bg-slate-800 transition-colors"
                    >
                      Return to Careers
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
