"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, X, Sparkles, MessageSquareQuote } from "lucide-react";

interface ChatbotButtonProps {
  isOpen: boolean;
  onToggle: () => void;
  hasSeenTooltip: boolean;
  onDismissTooltip: () => void;
}

export function ChatbotButton({
  isOpen,
  onToggle,
  hasSeenTooltip,
  onDismissTooltip,
}: ChatbotButtonProps) {
  const [cookieBannerOpen, setCookieBannerOpen] = useState(false);

  useEffect(() => {
    const handleBannerVisibility = (e: Event) => {
      const customEvent = e as CustomEvent<{ visible: boolean }>;
      if (customEvent.detail !== undefined) {
        setCookieBannerOpen(Boolean(customEvent.detail.visible));
      } else if (typeof document !== "undefined") {
        setCookieBannerOpen(
          document.documentElement.getAttribute("data-cookie-banner-open") === "true"
        );
      }
    };

    if (typeof document !== "undefined") {
      setCookieBannerOpen(
        document.documentElement.getAttribute("data-cookie-banner-open") === "true"
      );
    }

    window.addEventListener("cookie-banner-visibility", handleBannerVisibility);
    return () => {
      window.removeEventListener("cookie-banner-visibility", handleBannerVisibility);
    };
  }, []);

  return (
    <div
      className={`floating-chatbot-btn fixed right-4 sm:right-6 z-50 flex flex-col items-end transition-all duration-300 ${
        cookieBannerOpen
          ? "bottom-[360px] sm:bottom-[258px] lg:bottom-[92px]"
          : "bottom-[74px] sm:bottom-[92px]"
      }`}
    >
      {/* First-visit Educational Tooltip */}
      <AnimatePresence>
        {!hasSeenTooltip && !isOpen && !cookieBannerOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ delay: 1.5, duration: 0.3 }}
            className="mb-2.5 mr-1 px-3.5 py-2 rounded-2xl bg-white border border-[#EAE3D7] shadow-lg text-slate-800 text-xs flex items-center gap-2 max-w-[230px]"
          >
            <div className="w-5 h-5 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 flex items-center justify-center shrink-0">
              <Sparkles className="w-3 h-3" />
            </div>
            <span className="font-medium leading-snug">
              Need help exploring our school?
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onDismissTooltip();
              }}
              className="p-1 text-slate-400 hover:text-slate-700 rounded-md transition-colors"
              aria-label="Dismiss helper tooltip"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Button */}
      <motion.button
        type="button"
        onClick={onToggle}
        aria-label={isOpen ? "Close School Assistant" : "Open School Assistant"}
        title={isOpen ? "Close School Assistant" : "Open School Assistant"}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className={`relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-slate-900/30 cursor-pointer ${
          isOpen
            ? "bg-slate-800 text-white shadow-slate-950/30"
            : "bg-slate-900 hover:bg-slate-800 text-white shadow-slate-900/25 border border-slate-700/50"
        }`}
      >
        {/* Subtle Warm Gold Pulse Badge */}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-amber-500 border-2 border-slate-900" />
          </span>
        )}

        {/* Clean Meaningful School Assistant Icon (Chat + Academic Cap) */}
        {isOpen ? (
          <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        ) : (
          <div className="relative flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 sm:w-6 sm:h-6 fill-none stroke-current stroke-2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {/* Speech bubble */}
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
            {/* Embedded miniature graduation cap icon inside speech bubble */}
            <GraduationCap className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400 absolute" />
          </div>
        )}
      </motion.button>
    </div>
  );
}
