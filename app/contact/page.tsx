"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  ShieldCheck,
  Building2,
  Calendar,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  AdminStorage,
  AdminEnquiryItem,
  AdminConsentRecord,
} from "@/lib/adminStorage";
import { schoolData } from "@/data/school";

export default function ContactPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("General Enquiry");
  const [message, setMessage] = useState("");
  const [consentGiven, setConsentGiven] = useState(false);

  // Status
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionRef, setSubmissionRef] = useState("");
  const [validationError, setValidationError] = useState("");

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");

    if (!fullName.trim()) {
      setValidationError("Please enter your name.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setValidationError("Please enter a valid email address.");
      return;
    }
    if (!phone.trim()) {
      setValidationError("Please provide your phone number.");
      return;
    }
    if (!message.trim()) {
      setValidationError("Please enter your message or query.");
      return;
    }
    if (!consentGiven) {
      setValidationError("Please consent to the processing of your enquiry.");
      return;
    }

    const refId = `CNT-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const formattedDate = `${now.getDate()} ${now.toLocaleString("en-US", {
      month: "short",
    })} ${now.getFullYear()}`;

    // 1. Save message to admin enquiries
    const newEnquiry: AdminEnquiryItem = {
      id: `enq-${Date.now()}`,
      name: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      type: "General",
      message: `[Subject: ${subject}] ${message.trim()}`,
      date: formattedDate,
      status: "New",
      notes: `Reference ID: ${refId}. Submitted via dedicated contact page.`,
    };
    const currentEnquiries = AdminStorage.getEnquiries();
    AdminStorage.saveEnquiries([newEnquiry, ...currentEnquiries]);

    // 2. Log consent record
    const newConsent: AdminConsentRecord = {
      id: `cr-${Date.now()}`,
      user: email.trim(),
      purpose: "Contact Form",
      consent: "Granted",
      date: formattedDate,
      status: "Active",
      subjectName: fullName.trim(),
      subjectEmail: email.trim(),
      noticeText:
        "I understand that the information I provide may be used to respond to my enquiry as described in the Privacy Notice.",
      timestamp: new Date().toISOString(),
    };
    const currentConsents = AdminStorage.getConsentRecords();
    AdminStorage.saveConsentRecords([newConsent, ...currentConsents]);

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
              <Mail className="w-3.5 h-3.5 text-amber-700" />
              <span>CAMPUS DIRECTORY & ENQUIRIES</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-slate-900 tracking-tight leading-[1.12]">
              Connect With Our <br />
              <span className="italic font-normal text-slate-700">School Community.</span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed">
              Whether you are scheduling a personalized campus tour, inquiring about admissions, or
              seeking administrative assistance, our academic teams are here to help.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Cards & Form Grid */}
      <section className="py-20 lg:py-28 bg-[#FAF8F5] border-b border-[#EAE3D7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: Contact Directory */}
            <div className="lg:col-span-5 space-y-6">
              {/* Campus Address */}
              <div className="p-7 rounded-3xl bg-white border border-[#EAE3D7] shadow-xs space-y-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-900 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-slate-800" />
                </div>
                <h3 className="text-lg font-serif font-bold text-slate-900">Campus Location</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{schoolData.contact.address}</p>
                <p className="text-[11px] text-amber-800 font-medium pt-1">
                  15 minutes from Sholinganallur Junction • Dedicated visitor parking available
                </p>
              </div>

              {/* Admissions Office */}
              <div className="p-7 rounded-3xl bg-white border border-[#EAE3D7] shadow-xs space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-900 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-amber-800" />
                </div>
                <h3 className="text-lg font-serif font-bold text-slate-900">Admissions Advisory</h3>
                <div className="space-y-1.5 text-xs text-slate-600">
                  <p>
                    <span className="font-semibold text-slate-800">Direct Helpline:</span>{" "}
                    {schoolData.contact.admissionsPhone}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-800">Email:</span>{" "}
                    {schoolData.contact.admissionsEmail}
                  </p>
                </div>
              </div>

              {/* Visiting Hours */}
              <div className="p-7 rounded-3xl bg-white border border-[#EAE3D7] shadow-xs space-y-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-900 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-slate-800" />
                </div>
                <h3 className="text-lg font-serif font-bold text-slate-900">Office Hours</h3>
                <div className="space-y-1 text-xs text-slate-600">
                  <p>
                    <span className="font-semibold text-slate-800">Monday – Friday:</span> 8:00 AM –
                    4:30 PM
                  </p>
                  <p>
                    <span className="font-semibold text-slate-800">Saturday:</span> 8:30 AM – 1:00
                    PM (By appointment)
                  </p>
                  <p>
                    <span className="font-semibold text-slate-800">Sunday & Holidays:</span> Closed
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Interactive Message Form */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#EAE3D7] shadow-lg space-y-6">
                {!isSubmitted ? (
                  <>
                    <div className="space-y-1.5">
                      <h3 className="text-2xl font-serif font-bold text-slate-900">
                        Send a Message to LAX360
                      </h3>
                      <p className="text-xs text-slate-500">
                        Fill out the form below and our administrative desk will respond promptly.
                      </p>
                    </div>

                    {validationError && (
                      <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium">
                        {validationError}
                      </div>
                    )}

                    <form onSubmit={handleSubmitContact} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-slate-700">
                            Full Name <span className="text-rose-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="e.g. Priya Sundaram"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE3D7] text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-slate-700">
                            Email Address <span className="text-rose-500">*</span>
                          </label>
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="priya.s@domain.com"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE3D7] text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE3D7] text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-slate-700">
                            Enquiry Category
                          </label>
                          <select
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE3D7] text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800"
                          >
                            <option value="General Enquiry">General Information</option>
                            <option value="Admissions Consultation">Admissions Consultation</option>
                            <option value="Campus Tour Booking">Campus Tour Booking</option>
                            <option value="Transport & Logistics">Student Transport & Routes</option>
                            <option value="Faculty & Academic Query">Academic Query</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700">
                          Message <span className="text-rose-500">*</span>
                        </label>
                        <textarea
                          rows={4}
                          required
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="How can we assist you?"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE3D7] text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800"
                        />
                      </div>

                      {/* Consent Checkbox */}
                      <div className="pt-2 pb-1">
                        <label className="flex items-start gap-2.5 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={consentGiven}
                            onChange={(e) => setConsentGiven(e.target.checked)}
                            className="mt-0.5 w-4 h-4 text-slate-900 rounded-sm border-slate-300 focus:ring-slate-900"
                          />
                          <span className="text-xs text-slate-600 leading-relaxed">
                            I understand that the information I provide may be used to respond to my
                            enquiry as described in the{" "}
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

                      <div className="pt-2">
                        <button
                          type="submit"
                          className="w-full py-3.5 rounded-xl bg-slate-900 text-white font-semibold text-xs uppercase tracking-wider hover:bg-slate-800 transition-colors shadow-xs"
                        >
                          Send Message
                        </button>
                      </div>
                    </form>
                  </>
                ) : (
                  /* Success State */
                  <div className="text-center py-8 space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8 text-emerald-700" />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-slate-900">
                      Message Received
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                      Thank you, <strong>{fullName}</strong>. Your enquiry regarding{" "}
                      <strong>{subject}</strong> has been logged to the administration desk.
                    </p>
                    <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#EAE3D7] text-xs max-w-sm mx-auto space-y-1 text-left">
                      <div className="flex justify-between">
                        <span className="text-slate-500 font-medium">Reference Code:</span>
                        <span className="font-mono font-bold text-slate-900">{submissionRef}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500 font-medium">Consent Status:</span>
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
                          setFullName("");
                          setMessage("");
                          setConsentGiven(false);
                        }}
                        className="px-6 py-2.5 rounded-xl text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 transition-colors"
                      >
                        Send Another Message
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
