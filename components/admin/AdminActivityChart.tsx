"use client";

import React, { useState } from "react";

interface MonthlyDataPoint {
  month: string;
  enquiries: number;
  visits: number;
  admissions: number;
}

const mockActivityData: MonthlyDataPoint[] = [
  { month: "Feb", enquiries: 45, visits: 28, admissions: 12 },
  { month: "Mar", enquiries: 68, visits: 42, admissions: 24 },
  { month: "Apr", enquiries: 85, visits: 56, admissions: 38 },
  { month: "May", enquiries: 110, visits: 74, admissions: 52 },
  { month: "Jun", enquiries: 95, visits: 60, admissions: 44 },
  { month: "Jul", enquiries: 75, visits: 48, admissions: 30 },
  { month: "Aug", enquiries: 130, visits: 88, admissions: 65 },
  { month: "Sep", enquiries: 148, visits: 104, admissions: 78 },
];

export default function AdminActivityChart() {
  const [activeMetric, setActiveMetric] = useState<"enquiries" | "visits" | "admissions">("enquiries");
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const maxValue = Math.max(...mockActivityData.map((d) => d[activeMetric])) * 1.15;

  const metricMeta = {
    enquiries: { label: "Admission Enquiries", color: "#0F172A", bg: "bg-slate-900" },
    visits: { label: "Campus Tours & Visits", color: "#D97706", bg: "bg-amber-600" },
    admissions: { label: "Offers Finalized", color: "#059669", bg: "bg-emerald-600" },
  };

  return (
    <div className="p-6 rounded-2xl bg-white border border-[#EAE3D7] shadow-xs flex flex-col justify-between">
      {/* Chart Header & Metric Selectors */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div>
          <h3 className="text-sm font-bold text-slate-900 tracking-tight">
            Admissions Velocity & Engagement
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Monthly prospect inquiries and campus walkthrough progression
          </p>
        </div>

        {/* Metric Switcher Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100/80 rounded-xl shrink-0 self-start sm:self-auto">
          {(["enquiries", "visits", "admissions"] as const).map((key) => {
            const isSelected = activeMetric === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setActiveMetric(key)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  isSelected
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {key === "enquiries" && "Enquiries"}
                {key === "visits" && "Campus Visits"}
                {key === "admissions" && "Enrolments"}
              </button>
            );
          })}
        </div>
      </div>

      {/* SVG Responsive Bar Graph */}
      <div className="pt-6 relative">
        <div className="h-56 w-full flex items-end justify-between gap-2 sm:gap-4 px-2">
          {mockActivityData.map((item, idx) => {
            const val = item[activeMetric];
            const heightPercent = Math.round((val / maxValue) * 100);
            const isHovered = hoveredIdx === idx;

            return (
              <div
                key={item.month}
                className="flex-1 flex flex-col items-center h-full justify-end group relative cursor-pointer"
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {/* Floating tooltip */}
                {isHovered && (
                  <div className="absolute -top-10 z-20 px-2.5 py-1 bg-slate-900 text-white rounded-lg text-[11px] font-bold shadow-lg pointer-events-none whitespace-nowrap animate-in fade-in zoom-in-90 duration-150">
                    {val} {metricMeta[activeMetric].label}
                  </div>
                )}

                {/* Animated Column Bar */}
                <div className="w-full max-w-[36px] bg-slate-100 rounded-t-lg overflow-hidden flex flex-col justify-end h-full">
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className={`w-full rounded-t-lg transition-all duration-300 ${
                      metricMeta[activeMetric].bg
                    } ${isHovered ? "opacity-100 brightness-110" : "opacity-90"}`}
                  />
                </div>

                {/* X-axis Label */}
                <span
                  className={`mt-2 text-[11px] font-semibold transition-colors ${
                    isHovered ? "text-slate-900" : "text-slate-400"
                  }`}
                >
                  {item.month}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Legend / Summary */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-900" />
            <span className="text-[11px] text-slate-600">Total YTD Enquiries: <strong>756</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-600" />
            <span className="text-[11px] text-slate-600">Conversion Ratio: <strong>32.4%</strong></span>
          </div>
        </div>

        <span className="text-[11px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md">
          +24% vs Last Academic Year
        </span>
      </div>
    </div>
  );
}
