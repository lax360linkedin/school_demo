"use client";

import React, { useState } from "react";
import {
  MonthlyAnalyticsRecord,
  getAdmissionsData,
  getAnalyticsSummary,
} from "@/data/analyticsData";

interface AdminActivityChartProps {
  initialRange?: "6m" | "1y";
  title?: string;
  subtitle?: string;
}

export default function AdminActivityChart({
  initialRange = "6m",
  title = "Admissions Velocity & Engagement",
  subtitle = "Monthly prospect inquiries and campus walkthrough progression",
}: AdminActivityChartProps) {
  const [timeRange, setTimeRange] = useState<"6m" | "1y">(initialRange);
  const [activeMetric, setActiveMetric] = useState<"enquiries" | "campusVisits" | "enrolments">("enquiries");
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const currentData: MonthlyAnalyticsRecord[] = getAdmissionsData(timeRange);
  const summary = getAnalyticsSummary(currentData);

  const maxValue = Math.max(...currentData.map((d) => d[activeMetric])) * 1.15;

  const metricMeta = {
    enquiries: { label: "Admission Enquiries", color: "#0F172A", bg: "bg-slate-900" },
    campusVisits: { label: "Campus Tours & Visits", color: "#D97706", bg: "bg-amber-600" },
    enrolments: { label: "Offers Finalized", color: "#059669", bg: "bg-emerald-600" },
  };

  return (
    <div className="p-6 rounded-2xl bg-white border border-[#EAE3D7] shadow-xs flex flex-col justify-between">
      {/* Chart Header & Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight">
            {title}
          </h3>
          <p className="text-xs text-slate-700 font-medium mt-0.5">
            {subtitle}
          </p>
        </div>

        {/* Controls: Time Range + Metric Switcher */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Time-Range Filter */}
          <div className="flex items-center gap-1 p-1 bg-slate-100/90 rounded-xl border border-slate-200/60">
            <button
              type="button"
              onClick={() => setTimeRange("6m")}
              className={`h-8 sm:h-9 px-3 sm:px-3.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                timeRange === "6m"
                  ? "bg-slate-900 text-white shadow-xs"
                  : "text-slate-700 hover:text-slate-950 hover:bg-white/60"
              }`}
            >
              Last 6 Months
            </button>
            <button
              type="button"
              onClick={() => setTimeRange("1y")}
              className={`h-8 sm:h-9 px-3 sm:px-3.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                timeRange === "1y"
                  ? "bg-slate-900 text-white shadow-xs"
                  : "text-slate-700 hover:text-slate-950 hover:bg-white/60"
              }`}
            >
              Last 1 Year
            </button>
          </div>

          {/* Metric Switcher Pills */}
          <div className="flex items-center gap-1 p-1 bg-slate-100/90 rounded-xl border border-slate-200/60">
            {(["enquiries", "campusVisits", "enrolments"] as const).map((key) => {
              const isSelected = activeMetric === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveMetric(key)}
                  className={`h-8 sm:h-9 px-2.5 sm:px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? "bg-white text-slate-950 shadow-xs border border-slate-200/80 font-bold"
                      : "text-slate-700 hover:text-slate-950 hover:bg-white/60"
                  }`}
                >
                  {key === "enquiries" && "Enquiries"}
                  {key === "campusVisits" && "Visits"}
                  {key === "enrolments" && "Enrolments"}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* SVG Responsive Bar Graph */}
      <div className="pt-6 relative">
        <div className="h-60 w-full flex items-end justify-between gap-1.5 sm:gap-3 px-1 sm:px-2">
          {currentData.map((item, idx) => {
            const val = item[activeMetric];
            const heightPercent = Math.round((val / (maxValue || 1)) * 100);
            const isHovered = hoveredIdx === idx;

            return (
              <div
                key={`${item.year}-${item.month}`}
                className="flex-1 flex flex-col items-center h-full justify-end group relative cursor-pointer"
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {/* Floating tooltip */}
                {isHovered && (
                  <div className="absolute -top-10 z-20 px-2.5 py-1 bg-slate-900 text-white rounded-lg text-[11px] font-bold shadow-lg pointer-events-none whitespace-nowrap animate-in fade-in zoom-in-90 duration-150">
                    {item.label}: {val} {metricMeta[activeMetric].label}
                  </div>
                )}

                {/* Animated Column Bar */}
                <div className="w-full max-w-[38px] bg-slate-100 rounded-t-lg overflow-hidden flex flex-col justify-end h-full border-x border-t border-slate-200/60">
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className={`w-full rounded-t-lg transition-all duration-300 ${
                      metricMeta[activeMetric].bg
                    } ${isHovered ? "opacity-100 brightness-110" : "opacity-90"}`}
                  />
                </div>

                {/* X-axis Label */}
                <span
                  className={`mt-2 text-[11px] font-bold transition-colors ${
                    isHovered ? "text-slate-950 font-black" : "text-slate-700"
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
      <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-900" />
            <span className="text-slate-700">
              Selected Period Enquiries: <strong className="text-slate-950 font-bold">{summary.totalEnquiries}</strong>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-600" />
            <span className="text-slate-700">
              Campus Tours: <strong className="text-slate-950 font-bold">{summary.totalVisits}</strong>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
            <span className="text-slate-700">
              Conversion Ratio: <strong className="text-slate-950 font-bold">{summary.avgConversion}</strong>
            </span>
          </div>
        </div>

        <span className="text-[11px] text-emerald-800 font-bold bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-md">
          +24% vs Last Academic Year
        </span>
      </div>
    </div>
  );
}
