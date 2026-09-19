"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Cookie,
  SlidersHorizontal,
  ShieldCheck,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Clock,
  ExternalLink,
  ChevronRight,
  Info,
  Shield,
  Eye,
} from "lucide-react";
import {
  AdminStorage,
  CookiePreferences,
} from "@/lib/adminStorage";
import { useAdminToast } from "@/components/admin/AdminToast";
import AdminStatCard from "@/components/admin/AdminStatCard";

export default function AdminPrivacyCookiesPage() {
  const toast = useAdminToast();

  const [prefs, setPrefs] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    preferences: false,
    marketing: false,
    decided: false,
    lastUpdated: "Not configured",
  });

  const loadPrefs = () => {
    const p = AdminStorage.getCookiePreferences();
    setPrefs(p);
  };

  useEffect(() => {
    loadPrefs();
    const handleUpdate = () => loadPrefs();
    window.addEventListener("cookie-preferences-updated", handleUpdate);
    return () => window.removeEventListener("cookie-preferences-updated", handleUpdate);
  }, []);

  const handleOpenPreferencesModal = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-cookie-preferences"));
    }
  };

  const handleResetPreferences = () => {
    if (confirm("Reset current cookie consent state? The floating cookie banner will reappear on public pages.")) {
      const resetPrefs: CookiePreferences = {
        essential: true,
        analytics: false,
        preferences: false,
        marketing: false,
        decided: false,
      };
      AdminStorage.saveCookiePreferences(resetPrefs);
      setPrefs(resetPrefs);
      toast.info("Cookie consent state reset. Public banner is now active.");
    }
  };

  const cookieRegister = [
    {
      name: "school_cookie_preferences",
      category: "Strictly Necessary",
      duration: "1 Year",
      provider: "Internal (First-party)",
      purpose: "Stores visitor opt-in / opt-out choices for DPDP accountability.",
      dpdpCompliant: true,
    },
    {
      name: "admin_auth_token",
      category: "Strictly Necessary",
      duration: "Session",
      provider: "Internal (First-party)",
      purpose: "Authenticates administrative session on protected admin routes.",
      dpdpCompliant: true,
    },
    {
      name: "_lax_analytics_id",
      category: "Analytics & Performance",
      duration: "6 Months",
      provider: "First-party Telemetry",
      purpose: "Aggregates anonymous view counts across curriculum pages.",
      dpdpCompliant: true,
    },
    {
      name: "user_curriculum_pref",
      category: "Functional & Preferences",
      duration: "90 Days",
      provider: "Internal (First-party)",
      purpose: "Retains parent grade selection between visits.",
      dpdpCompliant: true,
    },
    {
      name: "_camp_ad_referral",
      category: "Marketing & Campaigns",
      duration: "30 Days",
      provider: "External Ad Partner",
      purpose: "Measures open house parent registration traffic attribution.",
      dpdpCompliant: true,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 mb-1">
            <span>DPDP Governance</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-900 font-bold">Cookie Management</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-serif">
            Cookie Governance & Tracker Audit
          </h2>
          <p className="mt-1 text-sm text-slate-700">
            Monitor client tracker categorization, inspect live consent preferences, and test public cookie banner controls.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/cookies"
            target="_blank"
            rel="noreferrer"
            className="min-h-[44px] h-[44px] px-4 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-sm font-semibold transition-all flex items-center gap-2 shadow-xs cursor-pointer"
          >
            <ExternalLink className="w-4 h-4 text-slate-500" />
            <span>Public Cookie Policy</span>
          </Link>
          <button
            onClick={handleOpenPreferencesModal}
            className="min-h-[44px] h-[44px] px-5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold transition-all flex items-center gap-2 shadow-xs cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4 text-amber-400" />
            <span>Open Preferences UI</span>
          </button>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <AdminStatCard
          title="Essential Cookies"
          value="100% Active"
          description="Strictly Necessary for portal operation"
          icon={ShieldCheck}
          accent="emerald"
        />
        <AdminStatCard
          title="Analytics Trackers"
          value={prefs.analytics ? "Opted In" : "Disabled (Default)"}
          change={prefs.analytics ? "Active" : "Protected"}
          changeType={prefs.analytics ? "neutral" : "positive"}
          description="Anonymous discovery metrics"
          icon={Cookie}
          accent={prefs.analytics ? "blue" : "slate"}
        />
        <AdminStatCard
          title="Functional Preferences"
          value={prefs.preferences ? "Opted In" : "Disabled (Default)"}
          change={prefs.preferences ? "Active" : "Protected"}
          changeType={prefs.preferences ? "neutral" : "positive"}
          description="Grade & curriculum settings"
          icon={SlidersHorizontal}
          accent={prefs.preferences ? "purple" : "slate"}
        />
        <AdminStatCard
          title="Marketing Attribution"
          value={prefs.marketing ? "Opted In" : "Disabled (Default)"}
          change={prefs.marketing ? "Active" : "Protected"}
          changeType={prefs.marketing ? "neutral" : "positive"}
          description="Admissions campaign tracking"
          icon={Clock}
          accent={prefs.marketing ? "amber" : "slate"}
        />
      </div>

      {/* Interactive Control Banner */}
      <div className="p-6 rounded-3xl bg-white border border-[#EAE3D7] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-900">
              Live Browser Consent State
            </span>
            <span className="text-xs text-slate-600 font-mono font-medium">
              Status: {prefs.decided ? "Choice Recorded" : "Pending Visitor Decision"}
            </span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mt-1">
            Cookie Banner Verification Desk
          </h3>
          <p className="text-xs sm:text-sm text-slate-700 mt-1 max-w-2xl leading-relaxed">
            Test the visitor experience by previewing the consent customization modal or resetting your stored consent to verify that the floating bottom banner displays properly.
          </p>
          <div className="mt-2 text-xs text-slate-600 font-mono font-medium">
            Last Updated: {prefs.lastUpdated || "Initial Session"}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={handleResetPreferences}
            className="min-h-[40px] h-[40px] px-4 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-800 text-sm font-semibold transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <RotateCcw className="w-4 h-4 text-slate-500" />
            <span>Reset Local Preferences</span>
          </button>
          <button
            onClick={handleOpenPreferencesModal}
            className="min-h-[40px] h-[40px] px-5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <SlidersHorizontal className="w-4 h-4 text-amber-400" />
            <span>Launch Preferences UI</span>
          </button>
        </div>
      </div>

      {/* DPDP Section 9 Child Safety Alert */}
      <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200/80 flex items-start gap-3.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
        <Shield className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold text-amber-950">
            DPDP Act, 2023 &bull; Section 9 Minor Safeguarding Guarantee
          </p>
          <p className="mt-1 text-xs text-slate-700">
            LAX360 enforces a strict technical ban on third-party behavioral profiling and retargeting pixels across all student and learning areas. All marketing trackers remain strictly opt-in and are restricted exclusively to parent admissions inquiry attribution.
          </p>
        </div>
      </div>

      {/* Cookie Register Table */}
      <div className="bg-white rounded-2xl border border-[#EAE3D7] shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h4 className="text-base font-bold text-slate-900">Registered Tracker Inventory</h4>
            <p className="text-xs text-slate-700 mt-0.5">
              Authorized cookies deployed across public and administrative subpaths.
            </p>
          </div>
          <span className="text-xs text-slate-600 font-mono font-semibold">5 Active Trackers</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50/90 border-b border-slate-100 text-slate-700 font-bold uppercase tracking-wider text-xs">
                <th className="p-4 pl-6">Cookie Identifier</th>
                <th className="p-4">Category</th>
                <th className="p-4">Lifespan</th>
                <th className="p-4">Provider Domain</th>
                <th className="p-4">Purpose</th>
                <th className="p-4 text-center pr-6">DPDP Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
              {cookieRegister.map((cookie, index) => (
                <tr key={index} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 pl-6 font-mono font-bold text-slate-950 text-xs">
                    {cookie.name}
                  </td>

                  <td className="p-4 whitespace-nowrap">
                    <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 text-xs font-semibold">
                      {cookie.category}
                    </span>
                  </td>

                  <td className="p-4 whitespace-nowrap text-slate-800 font-medium">{cookie.duration}</td>

                  <td className="p-4 whitespace-nowrap text-slate-700 font-medium">{cookie.provider}</td>

                  <td className="p-4 max-w-sm text-xs leading-relaxed text-slate-700 font-normal">
                    {cookie.purpose}
                  </td>

                  <td className="p-4 text-center pr-6">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200/60 shadow-xs">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Approved
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
