"use client";

import React from "react";
import { QUICK_QUESTIONS, QuickQuestionItem } from "@/data/schoolChatbotData";

interface QuickQuestionsProps {
  onSelect: (questionText: string) => void;
  disabled?: boolean;
}

export function QuickQuestions({ onSelect, disabled }: QuickQuestionsProps) {
  return (
    <div className="py-2 px-3 bg-[#F8F6F1] border-t border-[#EAE3D7] flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth">
      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 shrink-0 select-none pl-1">
        Quick Topics:
      </span>
      {QUICK_QUESTIONS.map((item: QuickQuestionItem) => (
        <button
          key={item.id}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(item.question)}
          className="whitespace-nowrap px-2.5 py-1 rounded-lg bg-white border border-[#EAE3D7] hover:border-amber-300 hover:bg-amber-50/70 text-[11px] font-medium text-slate-700 hover:text-amber-950 transition-colors shadow-2xs shrink-0 disabled:opacity-50 disabled:pointer-events-none"
        >
          {item.shortLabel}
        </button>
      ))}
    </div>
  );
}
