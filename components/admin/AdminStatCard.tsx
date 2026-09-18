"use client";

import React from "react";
import { LucideIcon, TrendingUp, TrendingDown, Minus } from "lucide-react";

interface AdminStatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  description?: string;
  icon: LucideIcon;
  accent?: "slate" | "amber" | "emerald" | "blue" | "purple";
}

const accentStyles = {
  slate: {
    iconBg: "bg-slate-100 text-slate-900 border-slate-200",
    badge: "text-slate-600 bg-slate-100",
  },
  amber: {
    iconBg: "bg-amber-50 text-amber-900 border-amber-200/60",
    badge: "text-amber-800 bg-amber-50",
  },
  emerald: {
    iconBg: "bg-emerald-50 text-emerald-800 border-emerald-200/60",
    badge: "text-emerald-800 bg-emerald-50",
  },
  blue: {
    iconBg: "bg-blue-50 text-blue-900 border-blue-200/60",
    badge: "text-blue-800 bg-blue-50",
  },
  purple: {
    iconBg: "bg-purple-50 text-purple-900 border-purple-200/60",
    badge: "text-purple-800 bg-purple-50",
  },
};

export default function AdminStatCard({
  title,
  value,
  change,
  changeType = "positive",
  description,
  icon: Icon,
  accent = "slate",
}: AdminStatCardProps) {
  const currentAccent = accentStyles[accent] || accentStyles.slate;

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#EAE3D7] shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wider">{title}</p>
          <h4 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 tracking-tight">
            {value}
          </h4>
        </div>
        <div
          className={`w-12 h-12 rounded-xl border flex items-center justify-center shrink-0 ${currentAccent.iconBg}`}
        >
          <Icon className="w-5 h-5" />
        </div>
      </div>

      {(change || description) && (
        <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm text-slate-500">
          {change && (
            <span
              className={`inline-flex items-center gap-1 font-bold px-2.5 py-0.5 rounded-md text-xs ${
                changeType === "positive"
                  ? "bg-emerald-50 text-emerald-700"
                  : changeType === "negative"
                  ? "bg-rose-50 text-rose-700"
                  : "bg-slate-100 text-slate-700"
              }`}
            >
              {changeType === "positive" && <TrendingUp className="w-3.5 h-3.5" />}
              {changeType === "negative" && <TrendingDown className="w-3.5 h-3.5" />}
              {changeType === "neutral" && <Minus className="w-3.5 h-3.5" />}
              {change}
            </span>
          )}
          {description && <span className="truncate text-slate-400 text-xs">{description}</span>}
        </div>
      )}
    </div>
  );
}
