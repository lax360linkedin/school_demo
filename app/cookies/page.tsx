"use client";

import React from "react";
import Link from "next/link";
import {
  Cookie,
  ShieldCheck,
  SlidersHorizontal,
  Lock,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  HelpCircle,
  Clock,
  Info,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CookiePolicyPage() {
  const handleOpenPreferences = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-cookie-preferences"));
    }
  };

  const cookieList = [
    {
      name: "school_cookie_preferences",
      category: "Strictly Necessary",
      duration: "1 Year",
      provider: "LAX360 Internal",
      purpose: "Stores your consent choices for essential and optional cookies across visits.",
    },
    {
      name: "admin_auth_token",
      category: "Strictly Necessary",
      duration: "Session",
      provider: "LAX360 Internal",
      purpose: "Validates authorized administrative login sessions on internal portal routes.",
    },
    {
      name: "_lax_analytics_id",
      category: "Analytics & Performance",
      duration: "6 Months",
      provider: "Privacy-Preserving Metric",
      purpose: "Aggregates anonymous page visit counts to help improve curriculum discovery.",
    },
    {
      name: "user_curriculum_pref",
      category: "Functional & Preferences",
      duration: "90 Days",
      provider: "LAX360 Internal",
      purpose: "Remembers preferred academic grade filter between visits for parents.",
    },
    {
      name: "_camp_ad_referral",
      category: "Marketing (Disabled by Default)",
      duration: "30 Days",
      provider: "External Ad Partner",
      purpose: "Measures admissions open-house registration campaign reach.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-900 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 pt-24 pb-14">
        {/* Hero Header */}
        <section className="px-6 sm:px-10 lg:px-16 max-w-5xl mx-auto pt-6 pb-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#EAE3D7] shadow-xs backdrop-blur-md mb-4 sm:mb-6">
            <Cookie className="w-4 h-4 text-amber-800" />
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-slate-800">
              Cookie Transparency
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-3 sm:mb-4">
            Cookie Policy
          </h1>
          <p className="text-base sm:text-lg text-slate-600 font-medium max-w-xl mx-auto">
            Understanding how and why we use cookies on the LAX360 digital campus.
          </p>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-2xl mx-auto leading-relaxed">
            We value your digital privacy. This policy explains what cookies are, which cookies we deploy, and how you can exercise complete control over non-essential trackers in alignment with the Digital Personal Data Protection (DPDP) Act.
          </p>
          <p className="text-[11px] text-slate-400 font-mono mt-3">
            Last Updated: September 2026 &bull; Version 2.4
          </p>
        </section>

        {/* Quick Preferences Trigger Card */}
        <section className="px-6 sm:px-10 lg:px-16 max-w-4xl mx-auto mb-8">
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#EAE3D7] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800 mb-1">
                <SlidersHorizontal className="w-4 h-4" />
                <span>Instant Preference Control</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900">
                Manage Your Cookie Consent
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                You can review or change your consent choices at any time. By default, all optional analytics, functional, and marketing cookies are strictly disabled until you opt in.
              </p>
            </div>
            <button
              onClick={handleOpenPreferences}
              className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs tracking-wide flex items-center gap-2 shadow-sm hover:shadow transition-all shrink-0 cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4 text-amber-400" />
              <span>Customize Preferences</span>
            </button>
          </div>
        </section>

        {/* Policy Content Sections */}
        <section className="px-6 sm:px-10 lg:px-16 max-w-4xl mx-auto space-y-6 sm:space-y-8 text-slate-800 leading-relaxed text-sm">
          {/* Section 1 */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#EAE3D7]">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center text-xs font-bold">
                1
              </span>
              What Are Cookies?
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-3">
              Cookies are small text files placed on your computer, smartphone, or browser when you visit a website. They allow the website to recognize your device, remember user preferences, ensure fast page loading, and analyze traffic metrics over time.
            </p>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Cookies may be &ldquo;session&rdquo; cookies (which disappear as soon as you close your browser) or &ldquo;persistent&rdquo; cookies (which remain on your device until they expire or are manually removed).
            </p>
          </div>

          {/* Section 2 */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#EAE3D7]">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center text-xs font-bold">
                2
              </span>
              Cookie Categories Deployed
            </h2>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between mb-1.5">
                  <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    Strictly Necessary / Essential Cookies
                  </h3>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900">
                    Always Active
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  These cookies are vital for the basic operation of the school website, including page navigation, security verification, and remembering your consent status. Without these, core portions of the website cannot function.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between mb-1.5">
                  <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <Info className="w-4 h-4 text-blue-600" />
                    Analytics & Performance Cookies
                  </h3>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                    Opt-in Required
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  These cookies help us understand how parents, students, and educators navigate our campus website. All metrics are aggregated anonymously to help us optimize academic program discovery. Disabled by default.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between mb-1.5">
                  <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4 text-purple-600" />
                    Functional & Preference Cookies
                  </h3>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                    Opt-in Required
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  These cookies remember choices you make, such as grade-level filters, preferred campus tour dates, or language settings, providing an enhanced and personalized institutional experience.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between mb-1.5">
                  <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <Lock className="w-4 h-4 text-amber-600" />
                    Marketing & Outreach Cookies
                  </h3>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                    Opt-in Required
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  These cookies evaluate the effectiveness of school announcements and admissions open house campaigns on external platforms. LAX360 does not sell student or parent data under any circumstances.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: Cookie Audit Table */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#EAE3D7]">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center text-xs font-bold">
                3
              </span>
              Specific Trackers & Durations
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
              Below is an itemized register of primary cookies active on the LAX360 portal:
            </p>

            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-3">Cookie Identifier</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Lifespan</th>
                    <th className="p-3">Primary Purpose</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600">
                  {cookieList.map((item, i) => (
                    <tr key={i} className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-3 font-mono font-semibold text-slate-900">
                        {item.name}
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium">
                          {item.category}
                        </span>
                      </td>
                      <td className="p-3 whitespace-nowrap">{item.duration}</td>
                      <td className="p-3 leading-relaxed">{item.purpose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 4: Child Data Safeguards & DPDP */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#EAE3D7]">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center text-xs font-bold">
                4
              </span>
              Child Safety & DPDP Compliance
            </h2>
            <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/80 text-xs sm:text-sm text-slate-700 leading-relaxed mb-4">
              <p className="font-semibold text-amber-950 mb-1">
                Zero Behavioral Profiling of Minors
              </p>
              In accordance with Section 9 of the Digital Personal Data Protection (DPDP) Act, 2023, LAX360 strictly prohibits tracking, behavioral monitoring, or targeted marketing directed at children. All student learning spaces, curriculum portals, and gallery viewing experiences remain free of tracking mechanisms.
            </div>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Optional cookies are exclusively configured for adult users (parents, prospective faculty applicants, and alumni) seeking general school inquiries, and remain entirely optional at all times.
            </p>
          </div>

          {/* Section 5: Browser Level Controls */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#EAE3D7]">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center text-xs font-bold">
                5
              </span>
              How to Manage Cookies in Your Browser
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
              Beyond our on-site preference manager, you can control or clear cookies directly via your web browser settings. Note that disabling essential cookies may impact certain interactive campus features.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                <p className="font-bold text-slate-900 mb-1">Google Chrome</p>
                <p className="text-slate-600 text-[11px]">
                  Settings &rarr; Privacy and Security &rarr; Third-party cookies &rarr; Block third-party cookies.
                </p>
              </div>
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                <p className="font-bold text-slate-900 mb-1">Apple Safari</p>
                <p className="text-slate-600 text-[11px]">
                  Settings / Preferences &rarr; Privacy &rarr; Prevent cross-site tracking & Block all cookies.
                </p>
              </div>
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                <p className="font-bold text-slate-900 mb-1">Mozilla Firefox</p>
                <p className="text-slate-600 text-[11px]">
                  Settings &rarr; Privacy & Security &rarr; Enhanced Tracking Protection (Strict / Standard).
                </p>
              </div>
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                <p className="font-bold text-slate-900 mb-1">Microsoft Edge</p>
                <p className="text-slate-600 text-[11px]">
                  Settings &rarr; Cookies and site permissions &rarr; Manage and delete cookies and site data.
                </p>
              </div>
            </div>
          </div>

          {/* Section 6: Contact & Privacy Inquiries */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#EAE3D7]">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center text-xs font-bold">
                6
              </span>
              Questions & Grievance Contact
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
              If you have any questions regarding our use of cookies or wish to exercise your data rights, please consult our full Privacy Notice or contact our Data Protection Officer:
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs font-medium">
              <Link
                href="/privacy"
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 transition-colors flex items-center gap-1.5"
              >
                <span>Read Full Privacy Notice</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
              <a
                href="mailto:privacy@lax360school.edu.in"
                className="px-4 py-2 rounded-xl border border-slate-300 hover:border-slate-400 text-slate-800 transition-colors"
              >
                Email: privacy@lax360school.edu.in
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
