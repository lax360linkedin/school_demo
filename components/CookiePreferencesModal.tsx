"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Cookie, X, Check, ShieldCheck, Info } from "lucide-react";
import { AdminStorage, CookiePreferences } from "@/lib/adminStorage";

interface CookiePreferencesModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function CookiePreferencesModal({
  isOpen: controlledIsOpen,
  onClose: controlledOnClose,
}: CookiePreferencesModalProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  const [analytics, setAnalytics] = useState(false);
  const [preferences, setPreferences] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const handleOpen = () => setInternalIsOpen(true);
    window.addEventListener("open-cookie-preferences", handleOpen);
    return () => window.removeEventListener("open-cookie-preferences", handleOpen);
  }, []);

  useEffect(() => {
    if (isOpen) {
      const prefs = AdminStorage.getCookiePreferences();
      setAnalytics(prefs.analytics);
      setPreferences(prefs.preferences);
      setMarketing(prefs.marketing);
    }
  }, [isOpen]);

  const handleClose = () => {
    if (controlledOnClose) {
      controlledOnClose();
    } else {
      setInternalIsOpen(false);
    }
  };

  const savePreferences = (ana: boolean, pref: boolean, mkt: boolean) => {
    const newPrefs: CookiePreferences = {
      essential: true,
      analytics: ana,
      preferences: pref,
      marketing: mkt,
      decided: true,
      lastUpdated: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    };
    AdminStorage.saveCookiePreferences(newPrefs);

    // Record demo consent in school_privacy_consents
    const consents = AdminStorage.getConsentRecords();
    consents.push({
      id: `cr-${Date.now()}`,
      user: "visitor-session@public",
      purpose: "Analytics Cookies",
      consent: ana ? "Granted" : "Withdrawn",
      date: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      status: "Active",
    });
    AdminStorage.saveConsentRecords(consents);

    // Notify banner to disappear
    window.dispatchEvent(new CustomEvent("cookie-preferences-saved", { detail: newPrefs }));
    handleClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-[#EAE3D7] overflow-hidden z-10 my-6"
          >
            {/* Header */}
            <div className="flex items-start justify-between p-6 sm:p-7 border-b border-slate-100 bg-[#FAF8F5]/80">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-slate-900 text-amber-300 flex items-center justify-center shrink-0">
                  <Cookie className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                    Cookie & Privacy Preferences
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Customize the data technologies used during your visit.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleClose}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-xl transition-colors"
                aria-label="Close preferences"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Categories Body */}
            <div className="p-6 sm:p-7 space-y-4 max-h-[calc(78vh-120px)] overflow-y-auto divide-y divide-slate-100">
              {/* Essential */}
              <div className="pt-2 first:pt-0 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-slate-900">Essential Cookies</h4>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200">
                      Always Active
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Necessary for core website security, navigating pages, form interactions, and storing your privacy preferences. These cannot be switched off.
                  </p>
                </div>
                <div className="shrink-0 pt-1">
                  <div className="w-11 h-6 bg-slate-900 rounded-full flex items-center justify-end px-1 cursor-not-allowed opacity-80">
                    <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-xs">
                      <Check className="w-2.5 h-2.5 text-slate-900 stroke-[3]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Analytics */}
              <div className="pt-4 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-slate-900">Analytics Cookies</h4>
                    <span className="text-[11px] font-medium text-slate-400">Optional</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Helps our academic communications team understand which program pages and campus life stories are most helpful to families. No commercial profiling is performed.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setAnalytics(!analytics)}
                  className={`shrink-0 pt-1 focus:outline-none`}
                  aria-pressed={analytics}
                  aria-label="Toggle Analytics cookies"
                >
                  <div
                    className={`w-11 h-6 rounded-full transition-colors flex items-center px-1 cursor-pointer ${
                      analytics ? "bg-slate-900 justify-end" : "bg-slate-200 justify-start"
                    }`}
                  >
                    <div className="w-4 h-4 bg-white rounded-full shadow-xs" />
                  </div>
                </button>
              </div>

              {/* Preferences */}
              <div className="pt-4 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-slate-900">Preference Cookies</h4>
                    <span className="text-[11px] font-medium text-slate-400">Optional</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Enables the portal to remember your preferred viewing options, active tab filters, and high-contrast readability settings across sessions.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setPreferences(!preferences)}
                  className={`shrink-0 pt-1 focus:outline-none`}
                  aria-pressed={preferences}
                  aria-label="Toggle Preference cookies"
                >
                  <div
                    className={`w-11 h-6 rounded-full transition-colors flex items-center px-1 cursor-pointer ${
                      preferences ? "bg-slate-900 justify-end" : "bg-slate-200 justify-start"
                    }`}
                  >
                    <div className="w-4 h-4 bg-white rounded-full shadow-xs" />
                  </div>
                </button>
              </div>

              {/* Marketing */}
              <div className="pt-4 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-slate-900">Admissions & Outreach</h4>
                    <span className="text-[11px] font-medium text-slate-400">Optional</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Used to notify prospective families about Open House dates, entrance assessment deadlines, and inter-school academic symposiums.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setMarketing(!marketing)}
                  className={`shrink-0 pt-1 focus:outline-none`}
                  aria-pressed={marketing}
                  aria-label="Toggle Admissions outreach cookies"
                >
                  <div
                    className={`w-11 h-6 rounded-full transition-colors flex items-center px-1 cursor-pointer ${
                      marketing ? "bg-slate-900 justify-end" : "bg-slate-200 justify-start"
                    }`}
                  >
                    <div className="w-4 h-4 bg-white rounded-full shadow-xs" />
                  </div>
                </button>
              </div>
            </div>

            {/* Actions Footer */}
            <div className="p-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-[11px] text-slate-500 flex items-center gap-1.5 self-start sm:self-center">
                <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>You can reopen these settings from the website footer anytime.</span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={() => savePreferences(false, false, false)}
                  className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-white transition-colors"
                >
                  Reject Non-Essential
                </button>
                <button
                  type="button"
                  onClick={() => savePreferences(analytics, preferences, marketing)}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs transition-colors"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
