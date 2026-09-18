"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, ShieldCheck, Settings2, Check, X } from "lucide-react";
import { AdminStorage, CookiePreferences } from "@/lib/adminStorage";

export default function CookieConsentBanner() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Hide completely on all admin routes
    if (pathname?.startsWith("/admin")) {
      setIsVisible(false);
      return;
    }

    // Check if user already made a preference decision
    try {
      const prefs = AdminStorage.getCookiePreferences();
      if (!prefs.decided) {
        // Slight natural delay so page loads smoothly first
        const timer = setTimeout(() => setIsVisible(true), 1200);
        return () => clearTimeout(timer);
      } else {
        setIsVisible(false);
      }
    } catch (e) {
      console.warn(e);
    }
  }, [pathname]);

  useEffect(() => {
    const handleSaved = () => setIsVisible(false);
    window.addEventListener("cookie-preferences-saved", handleSaved);
    return () => window.removeEventListener("cookie-preferences-saved", handleSaved);
  }, []);

  if (pathname?.startsWith("/admin")) return null;

  const handleAcceptAll = () => {
    const newPrefs: CookiePreferences = {
      essential: true,
      analytics: true,
      preferences: true,
      marketing: true,
      decided: true,
      lastUpdated: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    };
    AdminStorage.saveCookiePreferences(newPrefs);

    const consents = AdminStorage.getConsentRecords();
    consents.push({
      id: `cr-${Date.now()}`,
      user: "visitor-session@public",
      purpose: "Analytics Cookies",
      consent: "Granted",
      date: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      status: "Active",
    });
    AdminStorage.saveConsentRecords(consents);

    setIsVisible(false);
  };

  const handleRejectNonEssential = () => {
    const newPrefs: CookiePreferences = {
      essential: true,
      analytics: false,
      preferences: false,
      marketing: false,
      decided: true,
      lastUpdated: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    };
    AdminStorage.saveCookiePreferences(newPrefs);

    const consents = AdminStorage.getConsentRecords();
    consents.push({
      id: `cr-${Date.now()}`,
      user: "visitor-session@public",
      purpose: "Analytics Cookies",
      consent: "Withdrawn",
      date: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      status: "Active",
    });
    AdminStorage.saveConsentRecords(consents);

    setIsVisible(false);
  };

  const handleManagePreferences = () => {
    window.dispatchEvent(new CustomEvent("open-cookie-preferences"));
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed bottom-4 sm:bottom-6 left-4 right-4 sm:left-auto sm:right-6 z-40 max-w-2xl w-full"
        >
          <div className="p-5 sm:p-6 rounded-3xl bg-white/95 backdrop-blur-lg border border-[#EAE3D7] shadow-2xl shadow-slate-900/10 text-slate-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            {/* Text and Links */}
            <div className="flex items-start gap-3.5 min-w-0">
              <div className="w-9 h-9 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-900 flex items-center justify-center shrink-0 mt-0.5">
                <Cookie className="w-4 h-4" />
              </div>
              <div className="space-y-1.5 text-xs text-slate-600 leading-relaxed">
                <p className="font-semibold text-slate-900 text-[13px]">
                  Privacy & Cookie Choices
                </p>
                <p>
                  We use cookies and similar technologies to provide essential website functionality and, where enabled, improve your experience.
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-0.5 text-[11px] font-medium text-slate-500">
                  <Link
                    href="/privacy"
                    className="text-amber-800 hover:text-amber-950 underline underline-offset-2"
                  >
                    Privacy Notice
                  </Link>
                  <span>&bull;</span>
                  <Link
                    href="/cookies"
                    className="text-amber-800 hover:text-amber-950 underline underline-offset-2"
                  >
                    Cookie Policy
                  </Link>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap sm:flex-col items-center gap-2 w-full sm:w-auto shrink-0 justify-end">
              <button
                type="button"
                onClick={handleAcceptAll}
                className="flex-1 sm:w-full px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-xs transition-colors text-center"
              >
                Accept All
              </button>
              <button
                type="button"
                onClick={handleRejectNonEssential}
                className="flex-1 sm:w-full px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition-colors text-center"
              >
                Reject Non-Essential
              </button>
              <button
                type="button"
                onClick={handleManagePreferences}
                className="w-full text-center text-[11px] font-bold text-slate-500 hover:text-slate-900 py-1 transition-colors flex items-center justify-center gap-1"
              >
                <Settings2 className="w-3 h-3" />
                <span>Manage Preferences</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
