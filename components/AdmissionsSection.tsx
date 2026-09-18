"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { schoolData } from "@/data/school";
import { AdminStorage } from "@/lib/adminStorage";
import {
  Calendar,
  Send,
  CheckCircle,
  Clock,
  FileText,
  UserCheck,
  Building,
  GraduationCap,
  X,
} from "lucide-react";
import FloatingCard from "./ui/FloatingCard";

interface AdmissionsSectionProps {
  isModalOpenExternal?: boolean;
  onCloseExternal?: () => void;
}

export default function AdmissionsSection({
  isModalOpenExternal,
  onCloseExternal,
}: AdmissionsSectionProps) {
  const [modalType, setModalType] = useState<"apply" | "visit" | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);
  const [formData, setFormData] = useState({
    parentName: "",
    studentName: "",
    email: "",
    phone: "",
    grade: "Grade 1 - 5 (Primary)",
    message: "",
  });

  const stepIcons = [FileText, Building, UserCheck, GraduationCap];

  const handleOpenModal = (type: "apply" | "visit") => {
    setModalType(type);
    setSubmitted(false);
    setConsentGiven(false);
  };

  const handleCloseModal = () => {
    setModalType(null);
    setSubmitted(false);
    setConsentGiven(false);
    if (onCloseExternal) onCloseExternal();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consentGiven) return;

    try {
      const enquiries = AdminStorage.getEnquiries();
      enquiries.unshift({
        id: `enq-${Date.now()}`,
        name: formData.parentName,
        parentName: formData.parentName,
        studentName: formData.studentName,
        targetGrade: formData.grade,
        email: formData.email,
        phone: formData.phone,
        type: modalType === "visit" ? "Campus Visit" : "Admission",
        message: formData.message || "Prospective parent admissions inquiry from website.",
        date: new Date().toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        status: "New",
        notes: "Submitted via online admissions modal.",
      });
      AdminStorage.saveEnquiries(enquiries);

      const consents = AdminStorage.getConsentRecords();
      consents.unshift({
        id: `cr-${Date.now()}`,
        user: formData.email,
        purpose: "Admissions Enquiry",
        consent: "Granted",
        date: new Date().toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        status: "Active",
      });
      AdminStorage.saveConsentRecords(consents);
    } catch (err) {
      console.warn("Demo storage write error:", err);
    }

    setSubmitted(true);
  };

  const isModalActive = modalType !== null || Boolean(isModalOpenExternal);

  return (
    <section id="admissions" className="relative py-28 md:py-36 bg-transparent overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-amber-100/30 blur-[140px] pointer-events-none rounded-full" />

      <div className="w-full px-6 sm:px-10 lg:px-16 max-w-[1800px] mx-auto relative z-10">
        {/* Section Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#EAE3D7] shadow-sm backdrop-blur-md mb-4"
          >
            <GraduationCap className="w-3.5 h-3.5 text-academic-gold" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-academic-gold">
              Admissions 2026–2027
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 mb-5"
          >
            Your Journey <span className="text-gold-gradient">Starts Here</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed"
          >
            {schoolData.admissions.description}
          </motion.p>
        </div>

        {/* 4-Step Process Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {schoolData.admissions.steps.map((item, idx) => {
            const IconComponent = stepIcons[idx] || GraduationCap;
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
                className="h-full"
              >
                <FloatingCard className="relative h-full rounded-3xl bg-white border border-[#EAE3D7] p-6 flex flex-col justify-between hover:border-amber-500/40 shadow-sm hover:shadow-xl">
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-2xl font-black font-mono text-gold-gradient">
                        {item.step}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-[#F5F0E8] border border-[#EAE3D7] flex items-center justify-center text-slate-700">
                        <IconComponent className="w-5 h-5 text-amber-700" />
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-1.5">{item.title}</h3>
                    <div className="text-xs font-mono font-semibold text-blue-700 mb-3 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{item.timeline}</span>
                    </div>

                    <p className="text-xs text-slate-600 font-normal leading-relaxed mb-4">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#EAE3D7] space-y-1.5">
                    {item.details.map((detail, dIdx) => (
                      <div key={dIdx} className="flex items-center gap-2 text-[11px] text-slate-700 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-academic-gold flex-shrink-0" />
                        <span className="truncate">{detail}</span>
                      </div>
                    ))}
                  </div>
                </FloatingCard>
              </motion.div>
            );
          })}
        </div>

        {/* Action Callouts & Deadlines Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <FloatingCard
            maxTilt={3}
            scaleOnHover={1.01}
            elevatedDepth={8}
            className="rounded-3xl bg-white border border-[#EAE3D7] p-8 sm:p-12 shadow-md hover:shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8"
          >
            <div className="max-w-xl">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-800 mb-2 block">
                Enrollment Cycle
              </span>
              <h4 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
                Ready to take the next step for your family at LAX360?
              </h4>
              <p className="text-sm text-slate-600 font-normal leading-relaxed">
                Our dedicated admissions counselors are available for one-on-one virtual
                consultations or in-person campus walkthroughs.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
              <button
                onClick={() => handleOpenModal("apply")}
                className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-sm text-white bg-slate-900 hover:bg-slate-800 shadow-md hover:scale-105 transition-all flex items-center justify-center gap-2"
              >
                <GraduationCap className="w-4 h-4 text-amber-300" />
                <span>Begin Admission</span>
              </button>

              <button
                onClick={() => handleOpenModal("visit")}
                className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-sm text-slate-800 bg-[#FAF8F5] border border-[#EAE3D7] hover:bg-white transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <Calendar className="w-4 h-4 text-amber-700" />
                <span>Book a Campus Visit</span>
              </button>
            </div>
          </FloatingCard>
        </motion.div>

        {/* Frequently Asked Questions Accordion */}
        <div className="mt-20 max-w-4xl mx-auto">
          <h4 className="text-2xl font-bold text-center text-slate-900 mb-8">
            Admissions FAQs
          </h4>
          <div className="space-y-4">
            {schoolData.admissions.faqs.map((faq, fIdx) => (
              <FloatingCard
                key={fIdx}
                maxTilt={2}
                scaleOnHover={1.01}
                elevatedDepth={6}
                className="p-6 rounded-2xl bg-white border border-[#EAE3D7] shadow-xs hover:shadow-md"
              >
                <div className="font-bold text-base text-slate-900 mb-2">
                  {faq.question}
                </div>
                <div className="text-sm text-slate-600 font-normal leading-relaxed">
                  {faq.answer}
                </div>
              </FloatingCard>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Admission / Visit Modal */}
      <AnimatePresence>
        {isModalActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg rounded-3xl bg-white border border-[#EAE3D7] p-8 shadow-2xl text-left"
            >
              <button
                onClick={handleCloseModal}
                className="absolute top-6 right-6 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-slate-600 hover:text-slate-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {!submitted ? (
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-800 mb-2">
                    {modalType === "visit" ? (
                      <Building className="w-4 h-4 text-amber-700" />
                    ) : (
                      <FileText className="w-4 h-4 text-amber-700" />
                    )}
                    <span>
                      {modalType === "visit" ? "Book a Campus Tour" : "Student Application"}
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-2">
                    {modalType === "visit"
                      ? "Experience LAX360 in Person"
                      : "Begin Your Application"}
                  </h3>
                  <p className="text-xs text-slate-600 font-normal mb-6">
                    Fill out the form below. An admissions counselor will reach out within
                    24 hours with scheduled dates and application documents.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Parent / Guardian Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.parentName}
                          onChange={(e) =>
                            setFormData({ ...formData, parentName: e.target.value })
                          }
                          placeholder="e.g. Dr. Arthur Pendelton"
                          className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#EAE3D7] text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-600"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Student Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.studentName}
                          onChange={(e) =>
                            setFormData({ ...formData, studentName: e.target.value })
                          }
                          placeholder="e.g. Maya Pendelton"
                          className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#EAE3D7] text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-600"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          placeholder="arthur@example.com"
                          className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#EAE3D7] text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-600"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          placeholder="+1 (555) 019-2834"
                          className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#EAE3D7] text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-600"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Intended Grade Level
                      </label>
                      <select
                        value={formData.grade}
                        onChange={(e) =>
                          setFormData({ ...formData, grade: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#EAE3D7] text-sm text-slate-900 focus:outline-none focus:border-amber-600"
                      >
                        <option>Early Years (Ages 3 – 5)</option>
                        <option>Grade 1 – 5 (Primary School)</option>
                        <option>Grade 6 – 8 (Middle School)</option>
                        <option>Grade 9 – 12 (High School / IB Diploma)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Questions or Aspirations
                      </label>
                      <textarea
                        rows={3}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        placeholder="Tell us about your student's academic interests, sports, or creative passions..."
                        className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#EAE3D7] text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-600"
                      />
                    </div>

                    <div className="pt-1">
                      <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-600 select-none">
                        <input
                          type="checkbox"
                          required
                          checked={consentGiven}
                          onChange={(e) => setConsentGiven(e.target.checked)}
                          className="mt-0.5 rounded border-slate-300 text-slate-900 focus:ring-slate-900 shrink-0 cursor-pointer"
                        />
                        <span className="leading-snug">
                          I understand and agree that the information I provide will be used by LAX360 admissions counselors for enrollment guidance and campus tour scheduling as described in the{" "}
                          <a
                            href="/privacy"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-amber-800 underline font-semibold hover:text-amber-950"
                          >
                            Privacy Notice
                          </a>
                          .
                        </span>
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={!consentGiven}
                      className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-slate-900 hover:bg-slate-800 shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                    >
                      <Send className="w-4 h-4 text-amber-300" />
                      <span>
                        {modalType === "visit" ? "Schedule Visit" : "Submit Enquiry"}
                      </span>
                    </button>
                  </form>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-700 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    Enquiry Received
                  </h3>
                  <p className="text-sm text-slate-600 font-normal mb-6 max-w-sm mx-auto">
                    Thank you, {formData.parentName || "Valued Parent"}. A Senior
                    Admissions Director from LAX360 will contact you at{" "}
                    <span className="font-bold text-amber-800">{formData.email}</span> with
                    detailed next steps.
                  </p>
                  <button
                    onClick={handleCloseModal}
                    className="px-6 py-2.5 rounded-full bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold transition-colors"
                  >
                    Close Window
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
