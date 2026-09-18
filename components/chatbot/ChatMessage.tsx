"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, GraduationCap } from "lucide-react";
import { ChatMessageItem } from "@/hooks/useSchoolChatbot";

interface ChatMessageProps {
  message: ChatMessageItem;
  onSelectSuggestion?: (question: string) => void;
  isLatest?: boolean;
}

export function ChatMessage({
  message,
  onSelectSuggestion,
  isLatest,
}: ChatMessageProps) {
  const isUser = message.sender === "user";

  if (isUser) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="flex flex-col items-end mb-3.5 space-y-1"
      >
        <div className="max-w-[82%] px-4 py-2.5 rounded-2xl rounded-tr-xs bg-slate-900 text-white text-xs sm:text-sm leading-relaxed shadow-xs selection:bg-amber-400 selection:text-slate-950 break-words">
          {message.text}
        </div>
        <span className="text-[10px] text-slate-400 px-1 font-mono">
          {message.timestamp}
        </span>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.2 }}
      className="flex items-start gap-2.5 mb-4"
    >
      <div className="w-7 h-7 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-900 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
        <GraduationCap className="w-3.5 h-3.5 text-amber-800" />
      </div>

      <div className="flex-1 space-y-2 max-w-[86%]">
        <div className="p-3.5 sm:p-4 rounded-2xl rounded-tl-xs bg-white border border-[#EAE3D7] text-slate-800 text-xs sm:text-sm leading-relaxed shadow-xs space-y-2.5">
          <p className="whitespace-pre-line">{message.text}</p>

          {/* Smart Page Navigation CTA */}
          {message.actionLink && (
            <div className="pt-2 border-t border-slate-100">
              <Link
                href={message.actionLink.href}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAF8F5] border border-[#EAE3D7] text-slate-900 text-xs font-semibold hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all group"
              >
                <span>{message.actionLink.label}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-amber-700 group-hover:text-amber-300 transition-colors" />
              </Link>
            </div>
          )}
        </div>

        {/* Suggested Quick Question Chips on Latest Message */}
        {isLatest &&
          message.suggestedQuestions &&
          message.suggestedQuestions.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {message.suggestedQuestions.map((q, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onSelectSuggestion?.(q)}
                  className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-amber-50 hover:text-amber-900 hover:border-amber-200 border border-slate-200/60 text-[11px] text-slate-600 transition-colors text-left"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

        <span className="text-[10px] text-slate-400 block px-1 font-mono">
          {message.timestamp}
        </span>
      </div>
    </motion.div>
  );
}

/**
 * Animated Typing Indicator with 3 pulsing dots
 */
export function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 6 }}
      className="flex items-start gap-2.5 mb-3"
    >
      <div className="w-7 h-7 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-900 flex items-center justify-center shrink-0 mt-0.5">
        <GraduationCap className="w-3.5 h-3.5 text-amber-800" />
      </div>

      <div className="px-4 py-3 rounded-2xl rounded-tl-xs bg-white border border-[#EAE3D7] text-slate-500 shadow-xs flex items-center gap-1.5">
        <motion.span
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ repeat: Infinity, duration: 0.9, delay: 0 }}
          className="w-1.5 h-1.5 rounded-full bg-slate-500"
        />
        <motion.span
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ repeat: Infinity, duration: 0.9, delay: 0.2 }}
          className="w-1.5 h-1.5 rounded-full bg-slate-500"
        />
        <motion.span
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ repeat: Infinity, duration: 0.9, delay: 0.4 }}
          className="w-1.5 h-1.5 rounded-full bg-slate-500"
        />
      </div>
    </motion.div>
  );
}
