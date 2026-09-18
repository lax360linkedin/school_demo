"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Calendar,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Send,
  FileText,
  User,
  Mail,
  Phone,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Info,
  ArrowRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingCard from "@/components/ui/FloatingCard";
import {
  AdminStorage,
  AdminAdmissionStepItem,
  AdminAdmissionDeadline,
  AdminEnquiryItem,
  AdminConsentRecord,
} from "@/lib/adminStorage";
import { schoolData } from "@/data/school";

export default function AdmissionsPage() {
  const [steps, setSteps] = useState<AdminAdmissionStepItem[]>([]);
  const [deadlines, setDeadlines] = useState<AdminAdmissionDeadline[]>([]);

  // FAQ Accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Form States
  const [parentName, setParentName] = useState("");
  const [studentName, setStudentName] = useState("");
  const [targetGrade, setTargetGrade] = useState("Grade 1");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [consentGiven, setConsentGiven] = useState(false);

  // Status
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionRef, setSubmissionRef] = useState("");
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    setSteps(AdminStorage.getAdmissionSteps());
    setDeadlines(AdminStorage.getAdmissionDeadlines());
  }, []);

  const handleSubmitEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");

    if (!parentName.trim()) {
      setValidationError("Please enter the parent or guardian name.");
      return;
    }
    if (!studentName.trim()) {
      setValidationError("Please enter the applicant student's name.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setValidationError("Please provide a valid email address.");
      return;
    }
    if (!phone.trim()) {
      setValidationError("Please provide an active phone number.");
      return;
    }
    if (!consentGiven) {
      setValidationError("Please consent to the processing of your details for admissions.");
      return;
    }

    const refId = `ADM-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const formattedDate = `${now.getDate()} ${now.toLocaleString("en-US", {
      month: "short",
    })} ${now.getFullYear()}`;

    // 1. Save enquiry to admin storage
    const newEnquiry: AdminEnquiryItem = {
      id: `enq-${Date.now()}`,
      name: parentName.trim(),
      parentName: parentName.trim(),
      studentName: studentName.trim(),
      targetGrade,
      email: email.trim(),
      phone: phone.trim(),
      type: "Admission",
      message: message.trim() || `Admissions enquiry for ${targetGrade}`,
      date: formattedDate,
      status: "New",
      notes: `Reference ID: ${refId}. Submitted via dedicated admissions page.`,
    };

    const existingEnquiries = AdminStorage.getEnquiries();
    AdminStorage.saveEnquiries([newEnquiry, ...existingEnquiries]);

    // 2. Log consent record
    const newConsent: AdminConsentRecord = {
      id: `cr-${Date.now()}`,
      user: email.trim(),
      purpose: "Admissions Enquiry",
      consent: "Granted",
      date: formattedDate,
      status: "Active",
      subjectName: parentName.trim(),
      subjectEmail: email.trim(),
      noticeText:
        "I understand that the information I provide may be used for admissions processing as described in the Privacy Notice.",
      timestamp: new Date().toISOString(),
    };
    const existingConsents = AdminStorage.getConsentRecords();
    AdminStorage.saveConsentRecords([newConsent, ...existingConsents]);

    setSubmissionRef(refId);
    setIsSubmitted(true);
  };

  const ageEligibilityMatrix = [
    { grade: "Nursery / Early Years", ageRequirement: "3 Years as of 1 June 2026" },
    { grade: "Junior Kindergarten (LKG)", ageRequirement: "4 Years as of 1 June 2026" },
    { grade: "Senior Kindergarten (UKG)", ageRequirement: "5 Years as of 1 June 2026" },
    { grade: "Grade 1", ageRequirement: "6 Years as of 1 June 2026" },
    {
      grade: "Grades 2 to 5 (Primary)",
      ageRequirement: "7 to 10 Years + completion of prior grade",
    },
    {
      grade: "Grades 6 to 8 (Middle School)",
      ageRequirement: "11 to 13 Years + previous recognized board record",
    },
    {
      grade: "Grades 9 & 10 (Cambridge IGCSE)",
      ageRequirement: "14 to 15 Years + Grade 8 diagnostic clearance",
    },
    {
      grade: "Grades 11 & 12 (IBDP / A-Level)",
      ageRequirement: "16 to 17 Years + Grade 10 Board exam completion",
    },
  ];

  const requiredDocuments = [
    {
      title: "Proof of Age & Identity",
      desc: "Original and self-attested copy of the municipal Birth Certificate.",
    },
    {
      title: "Prior Academic Transcripts",
      desc: "Progress reports and report cards for the past 2 academic sessions.",
    },
    {
      title: "Transfer Certificate (TC)",
      desc: "Original TC counter-signed by the relevant educational authority or board.",
    },
    {
      title: "Medical & Immunization Record",
      desc: "Comprehensive paediatric health summary and documented vaccination schedule.",
    },
    {
      title: "Photographs",
      desc: "4 recent colour passport photographs of the student and 2 of each parent.",
    },
    {
      title: "Parent Address Verification",
      desc: "Copy of Aadhaar / Passport / Utility Bill confirming current residential address.",
    },
  ];

  const faqs = [
    {
      question: "What is the teacher-to-student ratio at LAX360 Academy?",
      answer:
        "We maintain a strict institutional ratio of 11:1. In Early Childhood, class cohorts have two certified homeroom educators with a maximum of 16 students. Across Primary and Secondary grades, cohorts are capped at 22 students to guarantee individualized pastoral and academic attention.",
    },
    {
      question: "How does the school support students transitioning from CBSE or ICSE to Cambridge or IB?",
      answer:
        "We have an established Academic Bridge Program. Our faculty provides dedicated scaffolding during the first term to help new students adapt to inquiry-driven assessments, extended essay writing, laboratory practicals, and criterion-based grading rubrics without stress.",
    },
    {
      question: "What second and third languages are offered in the curriculum?",
      answer:
        "We offer Hindi, Tamil, and French from Primary through Secondary grades. In Middle and Senior Secondary, students can also pursue Spanish or Sanskrit as elective languages under Cambridge and IB guidelines.",
    },
    {
      question: "Are daily bus transport services available across the city?",
      answer:
        "Yes. LAX360 operates an air-conditioned fleet of modern school buses covering major residential sectors across Chennai and the ECR/OMR knowledge corridor. Every vehicle is fitted with real-time GPS tracking, speed regulators, CCTV, and trained female attendants.",
    },
    {
      question: "Does LAX360 provide after-school care and athletic coaching?",
      answer:
        "Yes. Our Extended Day & Sports Academy operates from 3:30 PM to 5:30 PM, Monday through Friday. Students can train in swimming, football, basketball, archery, robotics, and classical dance under accredited national coaches, or complete supervised prep in the library.",
    },
    {
      question: "What is the policy for mid-term transfers for relocated families?",
      answer:
        "Subject to grade seat availability and verified transfer documentation from the student's prior accredited school, we consider admissions throughout the academic year for families relocating from other Indian cities or abroad.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FCFBF7] text-slate-800 flex flex-col selection:bg-amber-100 selection:text-amber-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 border-b border-[#EAE3D7] overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#F7F4EE] via-[#FCFBF7] to-[#FCFBF7]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold uppercase tracking-wider mx-auto">
              <GraduationCap className="w-3.5 h-3.5 text-amber-700" />
              <span>ADMISSIONS CYCLE 2026–2027</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-slate-900 tracking-tight leading-[1.12]">
              Begin Your Child&apos;s <br />
              <span className="italic font-normal text-slate-700">Journey of Discovery.</span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed">
              We welcome families who seek an educational community centered on intellectual rigor,
              compassionate character, and joyful exploration on our 28-acre green campus.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#apply-form"
                className="px-7 py-3.5 rounded-xl bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors shadow-sm text-sm"
              >
                Submit Admission Enquiry
              </a>
              <a
                href="#roadmap"
                className="px-7 py-3.5 rounded-xl bg-white text-slate-700 font-medium border border-[#EAE3D7] hover:bg-slate-50 transition-colors text-sm"
              >
                Admissions Roadmap
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Step Admissions Roadmap */}
      <section id="roadmap" className="py-20 lg:py-28 bg-[#FAF8F5] border-b border-[#EAE3D7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-800">
              TRANSPARENT & STUDENT-CENTRED
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
              Four-Step Admissions Roadmap
            </h2>
            <p className="text-slate-600 text-base">
              A holistic evaluation process designed to understand your child&apos;s innate curiosity,
              strengths, and learning preferences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, idx) => (
              <FloatingCard
                key={step.id}
                maxTilt={3}
                className="bg-white rounded-3xl p-7 border border-[#EAE3D7] shadow-xs space-y-4 hover:border-amber-200 transition-colors flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 text-white font-bold text-sm flex items-center justify-center">
                    0{idx + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-serif font-bold text-slate-900">{step.title}</h3>
                    <p className="text-xs font-semibold text-amber-800 mt-0.5">{step.timeline}</p>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{step.description}</p>
                </div>

                {step.requirements && step.requirements.length > 0 && (
                  <ul className="space-y-1.5 pt-3 text-xs text-slate-600 border-t border-slate-100">
                    {step.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                        <span className="leading-snug">{req}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </FloatingCard>
            ))}
          </div>
        </div>
      </section>

      {/* Deadlines & Key Dates */}
      <section className="py-20 bg-white border-b border-[#EAE3D7]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12">
            <h2 className="text-3xl font-serif font-bold text-slate-900">
              Key Dates & Evaluation Rounds
            </h2>
            <p className="text-slate-600 text-sm">
              Please note submission deadlines for the upcoming academic session.
            </p>
          </div>

          <div className="bg-[#FAF8F5] rounded-3xl border border-[#EAE3D7] overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F5EFE6] border-b border-[#EAE3D7] text-slate-700 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="px-5 py-4">Round</th>
                    <th className="px-4 py-4">Target Grades</th>
                    <th className="px-4 py-4">Submission Deadline</th>
                    <th className="px-4 py-4">Interaction Window</th>
                    <th className="px-4 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/60">
                  {deadlines.map((dl) => (
                    <tr key={dl.id} className="hover:bg-white/80 transition-colors">
                      <td className="px-5 py-4 font-bold text-slate-900">{dl.round}</td>
                      <td className="px-4 py-4 text-slate-700">{dl.targetGrades}</td>
                      <td className="px-4 py-4 text-slate-600">{dl.submissionDeadline}</td>
                      <td className="px-4 py-4 text-slate-600">{dl.interviewDate}</td>
                      <td className="px-4 py-4">
                        <span
                          className={`px-2.5 py-1 rounded-md text-[11px] font-semibold ${
                            dl.status === "Open"
                              ? "bg-emerald-100 text-emerald-900 border border-emerald-200"
                              : "bg-amber-100 text-amber-900 border border-amber-200"
                          }`}
                        >
                          {dl.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility & Age Criteria Matrix */}
      <section className="py-20 lg:py-28 bg-[#FAF8F5] border-b border-[#EAE3D7]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-800">
              AGE & READINESS
            </p>
            <h2 className="text-3xl font-serif font-bold text-slate-900">
              Age Eligibility Guidelines (2026–2027)
            </h2>
            <p className="text-slate-600 text-sm">
              Age criteria are aligned with national educational standards and international curricular norms.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-[#EAE3D7] overflow-hidden shadow-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
              <div className="divide-y divide-slate-100">
                {ageEligibilityMatrix.slice(0, 4).map((item, idx) => (
                  <div key={idx} className="p-5 flex items-center justify-between gap-4">
                    <span className="font-serif font-bold text-slate-900 text-sm">{item.grade}</span>
                    <span className="text-xs text-slate-600 font-medium">{item.ageRequirement}</span>
                  </div>
                ))}
              </div>
              <div className="divide-y divide-slate-100">
                {ageEligibilityMatrix.slice(4).map((item, idx) => (
                  <div key={idx} className="p-5 flex items-center justify-between gap-4">
                    <span className="font-serif font-bold text-slate-900 text-sm">{item.grade}</span>
                    <span className="text-xs text-slate-600 font-medium">{item.ageRequirement}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Required Documentation Checklist */}
      <section className="py-20 bg-white border-b border-[#EAE3D7]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-14">
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-800">
              PREPARATION
            </p>
            <h2 className="text-3xl font-serif font-bold text-slate-900">
              Required Application Documents
            </h2>
            <p className="text-slate-600 text-sm">
              Please prepare digital copies for upload or original sets for verification during the advisory meeting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {requiredDocuments.map((doc, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#EAE3D7] space-y-2 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-amber-800 shrink-0" />
                    <h4 className="font-serif font-bold text-slate-900 text-sm">{doc.title}</h4>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{doc.desc}</p>
                </div>
                <div className="pt-2 text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Mandatory for Verification</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Institutional Fee Guidance Disclaimer */}
      <section className="py-16 bg-[#FAF8F5] border-b border-[#EAE3D7]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#EAE3D7] shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-900 flex items-center justify-center shrink-0">
                <Info className="w-5 h-5 text-amber-800" />
              </div>
              <h3 className="text-xl font-serif font-bold text-slate-900">
                Transparent Institutional Fee Policy
              </h3>
            </div>
            <div className="space-y-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <p>
                Fee schedules at LAX360 Academy are structured transparently and reviewed annually
                by the Board of Trustees in adherence to regulatory educational standards.
              </p>
              <p>
                To ensure complete clarity regarding composite tuition, instructional material
                supplies, specialized laboratory access, transport routes, and nutritious meal plans,
                our full itemized fee schedules are shared in person during your Admissions Advisory
                Consultation.
              </p>
              <p className="text-slate-500 italic text-xs">
                * We do not publish partial, estimated, or misleading fee figures online. Please
                contact our admissions coordinators below for the official Schedule of Fees.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Admission Enquiry Form */}
      <section id="apply-form" className="py-20 lg:py-28 bg-white border-b border-[#EAE3D7]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#FAF8F5] rounded-3xl p-8 sm:p-12 border border-[#EAE3D7] shadow-lg space-y-6">
            {!isSubmitted ? (
              <>
                <div className="space-y-2 text-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-900 text-xs font-semibold border border-amber-200">
                    <FileText className="w-3.5 h-3.5 text-amber-700" />
                    <span>ONLINE ADMISSION ENQUIRY</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                    Register Your Interest
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm">
                    Our Admissions Advisory team will contact you within one school working day.
                  </p>
                </div>

                {validationError && (
                  <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium">
                    {validationError}
                  </div>
                )}

                <form onSubmit={handleSubmitEnquiry} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">
                        Parent / Guardian Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={parentName}
                        onChange={(e) => setParentName(e.target.value)}
                        placeholder="e.g. S. Venkatesh"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE3D7] text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800 bg-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">
                        Student Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        placeholder="e.g. Aarav Venkatesh"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE3D7] text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800 bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">
                        Grade Applying For <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={targetGrade}
                        onChange={(e) => setTargetGrade(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE3D7] text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800 bg-white"
                      >
                        <option value="Kindergarten">Kindergarten / Early Years</option>
                        <option value="Grade 1">Grade 1</option>
                        <option value="Grade 2">Grade 2</option>
                        <option value="Grade 3">Grade 3</option>
                        <option value="Grade 4">Grade 4</option>
                        <option value="Grade 5">Grade 5</option>
                        <option value="Grade 6">Grade 6</option>
                        <option value="Grade 7">Grade 7</option>
                        <option value="Grade 8">Grade 8</option>
                        <option value="Grade 9">Grade 9 (Cambridge IGCSE)</option>
                        <option value="Grade 11">Grade 11 (IBDP / Cambridge A-Level)</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">
                        Contact Email <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="parent@domain.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE3D7] text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800 bg-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">
                        Contact Phone <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98400 12345"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE3D7] text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800 bg-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">
                      Message / Previous School Details (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Share questions about curricula, bus transport routes, or any specific educational needs..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE3D7] text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800 bg-white"
                    />
                  </div>

                  {/* Mandatory Privacy Consent */}
                  <div className="pt-2 pb-1">
                    <label className="flex items-start gap-2.5 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={consentGiven}
                        onChange={(e) => setConsentGiven(e.target.checked)}
                        className="mt-0.5 w-4 h-4 text-slate-900 rounded-sm border-slate-300 focus:ring-slate-900"
                      />
                      <span className="text-xs text-slate-600 leading-relaxed">
                        I understand that the information I provide may be used for admissions
                        processing as described in the{" "}
                        <Link
                          href="/privacy"
                          target="_blank"
                          className="text-amber-900 underline font-semibold hover:text-slate-900"
                        >
                          Privacy Notice
                        </Link>
                        .
                      </span>
                    </label>
                  </div>

                  <div className="pt-3">
                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 transition-colors shadow-xs"
                    >
                      Submit Admissions Registration
                    </button>
                  </div>
                </form>
              </>
            ) : (
              /* Success State */
              <div className="text-center py-6 space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8 text-emerald-700" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-slate-900">
                  Admissions Enquiry Recorded
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{parentName}</strong>. Your enquiry for{" "}
                  <strong>{studentName}</strong> ({targetGrade}) has been saved in the LAX360
                  Admissions Portal.
                </p>
                <div className="p-4 rounded-xl bg-white border border-[#EAE3D7] text-xs max-w-sm mx-auto space-y-1 text-left">
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Reference Code:</span>
                    <span className="font-mono font-bold text-slate-900">{submissionRef}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Privacy Consent:</span>
                    <span className="text-emerald-700 font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> Logged to Audit Trail
                    </span>
                  </div>
                </div>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setParentName("");
                      setStudentName("");
                      setMessage("");
                      setConsentGiven(false);
                    }}
                    className="px-6 py-2.5 rounded-xl text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 transition-colors"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-20 lg:py-28 bg-[#FAF8F5] border-b border-[#EAE3D7]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-14">
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-800">
              COMMON QUESTIONS
            </p>
            <h2 className="text-3xl font-serif font-bold text-slate-900">
              Admissions & Campus FAQs
            </h2>
            <p className="text-slate-600 text-sm">
              Answers to frequently asked questions from prospective families.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-[#EAE3D7] overflow-hidden shadow-2xs transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                  >
                    <span className="font-serif font-bold text-slate-900 text-sm sm:text-base">
                      {faq.question}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-[#FAF8F5]/40">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
