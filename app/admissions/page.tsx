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
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
              compassionate character, and joyful exploration.
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

      {/* 3-Step Admissions Roadmap */}
      <section id="roadmap" className="py-20 lg:py-28 bg-[#FAF8F5] border-b border-[#EAE3D7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-800">
              SIMPLE & TRANSPARENT
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
              Three-Step Admissions Roadmap
            </h2>
            <p className="text-slate-600 text-base">
              A student-centric admissions evaluation designed to ensure mutual alignment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, idx) => (
              <div
                key={step.id}
                className="bg-white rounded-3xl p-8 border border-[#EAE3D7] shadow-xs space-y-4 hover:shadow-md transition-shadow relative"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-900 text-white font-bold text-sm flex items-center justify-center">
                  0{idx + 1}
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-slate-900">{step.title}</h3>
                  <p className="text-xs font-semibold text-amber-800 mt-1">{step.timeline}</p>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{step.description}</p>
                {step.requirements && (
                  <ul className="space-y-1.5 pt-2 text-xs text-slate-600 border-t border-slate-100">
                    {step.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
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

          <div className="bg-[#FAF8F5] rounded-2xl border border-[#EAE3D7] overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F5EFE6] border-b border-[#EAE3D7] text-slate-700 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="px-5 py-3.5">Round</th>
                    <th className="px-4 py-3.5">Target Grades</th>
                    <th className="px-4 py-3.5">Deadline</th>
                    <th className="px-4 py-3.5">Interaction Window</th>
                    <th className="px-4 py-3.5">Status</th>
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

      {/* Interactive Admission Enquiry Form */}
      <section id="apply-form" className="py-20 lg:py-28 bg-[#FAF8F5] border-b border-[#EAE3D7]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#EAE3D7] shadow-lg space-y-6">
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
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE3D7] text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800"
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
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE3D7] text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800"
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
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE3D7] text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800"
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
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE3D7] text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800"
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
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE3D7] text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">
                      Message / Special Educational Requirements (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Share any questions about curricula, campus transport, or previous school history..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE3D7] text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800"
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
                <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#EAE3D7] text-xs max-w-sm mx-auto space-y-1 text-left">
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

      <Footer />
    </div>
  );
}
