"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Lock,
  UserCheck,
  FileText,
  AlertCircle,
  CheckCircle2,
  Send,
  HelpCircle,
  Mail,
  Phone,
  Building,
  UsersRound,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AdminStorage, AdminPrivacyRequest } from "@/lib/adminStorage";

export default function PrivacyNoticePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [requestType, setRequestType] = useState<AdminPrivacyRequest["requestType"]>(
    "Access my personal data"
  );
  const [message, setMessage] = useState("");
  const [verified, setVerified] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!verified) {
      setErrorMsg("Please verify that you are the data principal or legal guardian.");
      return;
    }

    const newRequest: AdminPrivacyRequest = {
      id: `pr-${Date.now()}`,
      name,
      email,
      requestType,
      message,
      submittedDate: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      status: "Pending",
      notes: "Submitted via Privacy & Data Rights public portal.",
    };

    try {
      const requests = AdminStorage.getPrivacyRequests();
      requests.unshift(newRequest);
      AdminStorage.savePrivacyRequests(requests);
    } catch (err) {
      console.warn("Storage write error:", err);
    }

    setIsSubmitted(true);
    setName("");
    setEmail("");
    setMessage("");
    setVerified(false);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-900 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 pt-24 pb-14">
        {/* Hero Header */}
        <section className="px-6 sm:px-10 lg:px-16 max-w-5xl mx-auto pt-6 pb-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#EAE3D7] shadow-xs backdrop-blur-md mb-4 sm:mb-6">
            <ShieldCheck className="w-4 h-4 text-amber-800" />
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-slate-800">
              Data Governance & Trust
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-3 sm:mb-4">
            Privacy Notice
          </h1>
          <p className="text-base sm:text-lg text-slate-600 font-medium max-w-xl mx-auto">
            Your privacy matters to us.
          </p>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-2xl mx-auto leading-relaxed">
            Privacy information and controls are presented here to support responsible handling of personal data across LAX360 educational programs, campus admissions, and faculty recruitment.
          </p>
          <p className="text-[11px] text-slate-400 font-mono mt-3">
            Last Updated: September 2026 &bull; Reference Code: DPDP-SCH-2026
          </p>
        </section>

        {/* 11 Comprehensive Privacy Sections */}
        <section className="px-6 sm:px-10 lg:px-16 max-w-4xl mx-auto space-y-6">
          <div className="p-6 sm:p-10 rounded-3xl bg-white border border-[#EAE3D7] shadow-xs space-y-6 sm:space-y-8 text-sm text-slate-700 leading-relaxed">
            {/* Section 1 */}
            <div className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-slate-900 text-amber-300 text-xs font-bold flex items-center justify-center font-mono">
                  1
                </span>
                <span>Information We Collect</span>
              </h2>
              <p className="text-slate-600 pl-8">
                We collect only the personal information necessary to fulfill educational, admissions, pastoral, and employment operations. This includes parent and student contact details, date of birth, previous academic transcripts, medical emergency contacts, campus tour requests, and faculty application dossiers.
              </p>
            </div>

            {/* Section 2 */}
            <div className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-slate-900 text-amber-300 text-xs font-bold flex items-center justify-center font-mono">
                  2
                </span>
                <span>Why We Use Personal Data</span>
              </h2>
              <p className="text-slate-600 pl-8">
                Personal data is processed solely for specified, lawful educational purposes: facilitating student admissions and enrolment counseling, scheduling in-person campus walkthroughs, maintaining board-mandated academic transcripts (IB / Cambridge), safeguarding student physical wellbeing, and evaluating prospective educators.
              </p>
            </div>

            {/* Section 3 */}
            <div className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-slate-900 text-amber-300 text-xs font-bold flex items-center justify-center font-mono">
                  3
                </span>
                <span>How We Use Your Information</span>
              </h2>
              <p className="text-slate-600 pl-8">
                Your information is used strictly within authorized school departments. Admissions officers review prospective inquiries to schedule diagnostic assessments; HR committees review faculty resumes; and health staff access emergency contacts when administering student first aid. We do not sell or monetize personal data under any circumstances.
              </p>
            </div>

            {/* Section 4 */}
            <div className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-slate-900 text-amber-300 text-xs font-bold flex items-center justify-center font-mono">
                  4
                </span>
                <span>Data Retention</span>
              </h2>
              <p className="text-slate-600 pl-8">
                Data is retained only as long as necessary to accomplish the educational purpose for which it was gathered, or as required by regulatory academic accreditation bodies. Unsuccessful admissions inquiries and recruitment dossiers are safely archived or purged after the relevant academic cycle.
              </p>
            </div>

            {/* Section 5 */}
            <div className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-slate-900 text-amber-300 text-xs font-bold flex items-center justify-center font-mono">
                  5
                </span>
                <span>Data Sharing & Third Parties</span>
              </h2>
              <p className="text-slate-600 pl-8">
                We share personal information strictly with approved educational bodies (e.g. International Baccalaureate Organization, Cambridge Assessment International Education), regulatory examination councils, emergency healthcare providers, and vetted school transport operators bound by written confidentiality undertakings.
              </p>
            </div>

            {/* Section 6 */}
            <div className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-slate-900 text-amber-300 text-xs font-bold flex items-center justify-center font-mono">
                  6
                </span>
                <span>Your Privacy Rights</span>
              </h2>
              <p className="text-slate-600 pl-8">
                You have the right to request access to the personal data we hold about you or your child, request correction of inaccurate records, request deletion when the data is no longer necessary for educational enrollment, and designate a representative to act on your behalf. You may submit these requests below.
              </p>
            </div>

            {/* Section 7 */}
            <div className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-slate-900 text-amber-300 text-xs font-bold flex items-center justify-center font-mono">
                  7
                </span>
                <span>Consent and Withdrawal</span>
              </h2>
              <p className="text-slate-600 pl-8">
                Where processing is grounded in consent, you retain the right to withdraw that consent at any time without punitive consequences. Withdrawing consent for optional communications does not impact your child&apos;s active academic instruction or foundational school enrollment.
              </p>
            </div>

            {/* Section 8: Children's Personal Data */}
            <div className="p-6 rounded-2xl bg-amber-50/50 border border-amber-200/80 space-y-2">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
                <UsersRound className="w-5 h-5 text-amber-800 shrink-0" />
                <span>8. Children&apos;s Personal Data & Safeguarding</span>
              </h2>
              <p className="text-slate-700 pl-7 leading-relaxed">
                As a primary and secondary school, safeguarding minor students is our paramount institutional duty. All student data collection requires verifiable consent from parents or legal guardians. We never engage in behavioral tracking, automated advertising, or psychological profiling of children. Educational records are safeguarded under strict physical and digital controls.
              </p>
            </div>

            {/* Section 9 */}
            <div className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-slate-900 text-amber-300 text-xs font-bold flex items-center justify-center font-mono">
                  9
                </span>
                <span>Security Measures</span>
              </h2>
              <p className="text-slate-600 pl-8">
                Our institutional infrastructure implements access segmentation, encrypted communication protocols, regular data audits, and trained personnel controls to prevent unauthorized access, alteration, disclosure, or destruction of personal data.
              </p>
            </div>

            {/* Section 10 */}
            <div className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-slate-900 text-amber-300 text-xs font-bold flex items-center justify-center font-mono">
                  10
                </span>
                <span>Contact / Data Grievance Redressal</span>
              </h2>
              <div className="text-slate-600 pl-8 space-y-1">
                <p>
                  For any privacy inquiries or to address a data handling grievance, please reach our designated Data Protection & Grievance Officer:
                </p>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs space-y-1 mt-2 text-slate-800">
                  <p><strong>Grievance Officer:</strong> Office of Academic Administration & Governance</p>
                  <p><strong>Email:</strong> privacy@lax360.edu &bull; info@lax360.edu</p>
                  <p><strong>Address:</strong> LAX360 Boulevard, Innovation Campus, Chennai / Bangalore Corridor</p>
                </div>
              </div>
            </div>

            {/* Section 11 */}
            <div className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-slate-900 text-amber-300 text-xs font-bold flex items-center justify-center font-mono">
                  11
                </span>
                <span>Updates to this Privacy Notice</span>
              </h2>
              <p className="text-slate-600 pl-8">
                We may periodically update this notice to reflect changes in educational practices, operational workflows, or statutory regulations. Any significant updates will be highlighted prominently across our digital platforms.
              </p>
            </div>
          </div>
        </section>

        {/* DPDP DATA RIGHTS INTERACTIVE UI */}
        <section className="px-6 sm:px-10 lg:px-16 max-w-4xl mx-auto pt-10 sm:pt-12">
          <div className="p-6 sm:p-10 rounded-3xl bg-white border border-[#EAE3D7] shadow-lg">
            <div className="max-w-2xl mx-auto text-center mb-8">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 text-amber-300 flex items-center justify-center mx-auto mb-3">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                Privacy & Data Rights Requests
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2">
                Submit an inquiry regarding your personal data or exercise your statutory data rights under our responsible data handling framework.
              </p>
            </div>

            {isSubmitted ? (
              <div className="p-8 text-center space-y-4 max-w-md mx-auto">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-lg font-bold text-slate-900">Privacy Request Recorded</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Your privacy request has been recorded for this demo. Our administrative office logs and reviews all requests within the demo management dashboard.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2 rounded-full bg-slate-900 text-white text-xs font-bold hover:bg-slate-800"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitRequest} className="max-w-xl mx-auto space-y-4 text-xs">
                {errorMsg && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#EAE3D7] text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="email@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#EAE3D7] text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Request Type *</label>
                  <select
                    value={requestType}
                    onChange={(e) =>
                      setRequestType(e.target.value as AdminPrivacyRequest["requestType"])
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#EAE3D7] text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 cursor-pointer"
                  >
                    <option value="Access my personal data">Access my personal data</option>
                    <option value="Correct my personal data">Correct my personal data</option>
                    <option value="Erase my personal data">Erase my personal data</option>
                    <option value="Withdraw consent">Withdraw consent</option>
                    <option value="Raise a grievance">Raise a grievance</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Details of Your Request *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Specify the records, child enrolment ID, or specific clarification you are requesting..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#EAE3D7] text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>

                <div className="pt-2">
                  <label className="flex items-start gap-2.5 cursor-pointer text-slate-600 select-none">
                    <input
                      type="checkbox"
                      required
                      checked={verified}
                      onChange={(e) => setVerified(e.target.checked)}
                      className="mt-0.5 rounded border-slate-300 text-slate-900 focus:ring-slate-900 shrink-0 cursor-pointer"
                    />
                    <span className="leading-relaxed">
                      I confirm that I am the data principal or parent/legal guardian authorized to submit this privacy request, and that the information provided is accurate.
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={!verified}
                  className="w-full mt-2 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4 text-amber-300" />
                  <span>Submit Privacy Request</span>
                </button>
              </form>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
