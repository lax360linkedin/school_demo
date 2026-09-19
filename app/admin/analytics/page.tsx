"use client";

import React, { useState, useEffect } from "react";
import {
  BarChart3,
  TrendingUp,
  Download,
  Users,
  Inbox,
  Briefcase,
  GraduationCap,
  Calendar,
  Compass,
  ArrowUpRight,
  CheckCircle2,
  Filter,
  FileSpreadsheet,
  Layers,
  ChevronDown,
} from "lucide-react";
import AdminStatCard from "@/components/admin/AdminStatCard";
import AdminActivityChart from "@/components/admin/AdminActivityChart";
import { useAdminToast } from "@/components/admin/AdminToast";
import { AdminStorage, AdminEnquiryItem, AdminJobApplication } from "@/lib/adminStorage";
import {
  admissionsAnalyticsData,
  admissionsFunnelData,
  gradeLevelDemands,
  digitalCampusEngagement,
  getAnalyticsSummary,
} from "@/data/analyticsData";
import {
  exportEnquiriesCsv,
  exportApplicationsCsv,
  exportAdmissionsAnalyticsCsv,
  exportCampusVisitsCsv,
  exportCompleteAnalyticsReportCsv,
} from "@/utils/exportCsv";

export default function AdminAnalyticsPage() {
  const toast = useAdminToast();
  const [enquiries, setEnquiries] = useState<AdminEnquiryItem[]>([]);
  const [applications, setApplications] = useState<AdminJobApplication[]>([]);
  const [exportDropdownOpen, setExportDropdownOpen] = useState(false);

  useEffect(() => {
    setEnquiries(AdminStorage.getEnquiries());
    setApplications(AdminStorage.getJobApplications());
  }, []);

  const fullSummary = getAnalyticsSummary(admissionsAnalyticsData);

  const handleExport = (type: "enquiries" | "applications" | "analytics" | "visits" | "all") => {
    setExportDropdownOpen(false);
    switch (type) {
      case "enquiries":
        exportEnquiriesCsv(enquiries);
        break;
      case "applications":
        exportApplicationsCsv(applications);
        break;
      case "analytics":
        exportAdmissionsAnalyticsCsv(admissionsAnalyticsData);
        break;
      case "visits":
        exportCampusVisitsCsv(admissionsAnalyticsData);
        break;
      case "all":
        exportCompleteAnalyticsReportCsv(admissionsAnalyticsData, enquiries.length, applications.length);
        break;
    }
    toast.success("Records exported successfully.");
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#EAE3D7]">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Analytics</h2>
          <p className="text-sm text-slate-700 font-medium mt-1">
            Review website engagement, admissions activity and school enquiries.
          </p>
        </div>

        {/* Export Records Dropdown Button */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setExportDropdownOpen(!exportDropdownOpen)}
            className="min-h-[44px] h-[44px] px-5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold flex items-center gap-2.5 shadow-sm transition-all cursor-pointer"
          >
            <Download className="w-4 h-4 text-amber-400" />
            <span>Export Records</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${exportDropdownOpen ? "rotate-180" : ""}`} />
          </button>

          {exportDropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-30"
                onClick={() => setExportDropdownOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white border border-[#EAE3D7] shadow-xl p-2 z-40 space-y-1 animate-in fade-in slide-in-from-top-2 duration-150">
                <button
                  type="button"
                  onClick={() => handleExport("enquiries")}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-100 flex items-center justify-between transition-colors"
                >
                  <span>Enquiries CSV</span>
                  <FileSpreadsheet className="w-3.5 h-3.5 text-slate-500" />
                </button>
                <button
                  type="button"
                  onClick={() => handleExport("applications")}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-100 flex items-center justify-between transition-colors"
                >
                  <span>Applications CSV</span>
                  <FileSpreadsheet className="w-3.5 h-3.5 text-slate-500" />
                </button>
                <button
                  type="button"
                  onClick={() => handleExport("analytics")}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-100 flex items-center justify-between transition-colors"
                >
                  <span>Admissions Analytics CSV</span>
                  <FileSpreadsheet className="w-3.5 h-3.5 text-slate-500" />
                </button>
                <button
                  type="button"
                  onClick={() => handleExport("visits")}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-100 flex items-center justify-between transition-colors"
                >
                  <span>Campus Visits CSV</span>
                  <FileSpreadsheet className="w-3.5 h-3.5 text-slate-500" />
                </button>
                <div className="border-t border-slate-100 my-1" />
                <button
                  type="button"
                  onClick={() => handleExport("all")}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold text-amber-900 bg-amber-50 hover:bg-amber-100/80 flex items-center justify-between transition-colors"
                >
                  <span>All Analytics CSV</span>
                  <Download className="w-3.5 h-3.5 text-amber-700" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* 4 Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <AdminStatCard
          title="Total Inquiries"
          value={enquiries.length > 0 ? enquiries.length : fullSummary.totalEnquiries}
          change="+18.2% YTD"
          changeType="positive"
          description="Parent applications & walk-ins"
          icon={Inbox}
          accent="slate"
        />
        <AdminStatCard
          title="Campus Visits"
          value={fullSummary.totalVisits}
          change="70.6% of Inquiries"
          changeType="positive"
          description="Escorted campus tours"
          icon={Compass}
          accent="amber"
        />
        <AdminStatCard
          title="Applications"
          value={applications.length > 0 ? applications.length : 48}
          change="Talent Pipeline"
          changeType="positive"
          description="Faculty & leadership files"
          icon={Briefcase}
          accent="blue"
        />
        <AdminStatCard
          title="Enrolments"
          value={fullSummary.totalEnrolments}
          change={`${fullSummary.avgConversion} Conversion`}
          changeType="positive"
          description="Confirmed admissions seats"
          icon={GraduationCap}
          accent="emerald"
        />
      </div>

      {/* Reusable Admissions Velocity & Engagement Chart with 6m / 1y filter */}
      <AdminActivityChart
        title="Admissions Velocity & Engagement"
        subtitle="Monthly prospect inquiries, escorted campus visits, and finalized enrolments"
      />

      {/* 2-Column Section: Funnel Progression & Grade Demand */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        {/* Admissions Funnel */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-white border border-[#EAE3D7] shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900 tracking-tight">
                Admissions Conversion Funnel
              </h3>
              <p className="text-xs text-slate-700 font-medium">
                Progression from prospective family discovery to seat confirmation
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
              36.2% Yield
            </span>
          </div>

          <div className="space-y-4">
            {admissionsFunnelData.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900">{item.stage}</span>
                  <span className="font-mono font-bold text-slate-700">
                    {item.count.toLocaleString()} ({item.percentage}%)
                  </span>
                </div>
                <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${item.percentage}%` }}
                    className={`h-full rounded-full transition-all duration-500 ${
                      idx === 0
                        ? "bg-slate-900"
                        : idx === 1
                        ? "bg-amber-600"
                        : idx === 2
                        ? "bg-blue-600"
                        : "bg-emerald-600"
                    }`}
                  />
                </div>
                <p className="text-[11px] text-slate-600 leading-tight">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Grade-Level Demand */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-white border border-[#EAE3D7] shadow-xs space-y-5">
          <div className="pb-3 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Grade-Level Demand Breakdown
            </h3>
            <p className="text-xs text-slate-700 font-medium">
              Proportion of prospective inquiries by educational division
            </p>
          </div>

          <div className="space-y-3.5">
            {gradeLevelDemands.map((gd, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-between gap-3">
                <div className="space-y-0.5 min-w-0">
                  <p className="text-xs font-bold text-slate-900 truncate">{gd.level}</p>
                  <p className="text-[11px] text-slate-600 truncate">{gd.grades}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-black text-slate-900 font-mono">{gd.percentage}%</span>
                  <p className="text-[10px] text-slate-600 font-semibold">{gd.inquiries} Inquiries</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Website Digital Engagement Section */}
      <div className="p-6 rounded-2xl bg-white border border-[#EAE3D7] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Digital Campus Engagement & Traffic
            </h3>
            <p className="text-xs text-slate-700 font-medium">
              Frontend discovery metrics across key public website sections (September 2026)
            </p>
          </div>
          <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-md self-start sm:self-auto">
            142,860 Total Monthly Pageviews
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-xs sm:text-sm border-collapse">
            <thead className="bg-[#FAF8F5] border-b border-[#EAE3D7] text-slate-700 font-bold uppercase tracking-wider text-xs">
              <tr>
                <th className="px-5 py-3.5 align-middle w-[26%] min-w-[190px]">Section / Page Route</th>
                <th className="px-4 py-3.5 align-middle w-[26%] min-w-[190px]">Page Name</th>
                <th className="px-4 py-3.5 align-middle w-[16%] min-w-[120px] whitespace-nowrap">Unique Views</th>
                <th className="px-4 py-3.5 align-middle w-[17%] min-w-[130px] whitespace-nowrap">Avg Time on Page</th>
                <th className="px-5 py-3.5 align-middle w-[15%] min-w-[110px] whitespace-nowrap">Bounce Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800 font-medium">
              {digitalCampusEngagement.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-4 align-middle font-mono font-bold text-slate-900">{item.path}</td>
                  <td className="px-4 py-4 align-middle text-slate-800">{item.name}</td>
                  <td className="px-4 py-4 align-middle font-bold text-slate-950 font-mono whitespace-nowrap">{item.uniqueViews}</td>
                  <td className="px-4 py-4 align-middle text-slate-700 whitespace-nowrap">{item.avgDuration}</td>
                  <td className="px-5 py-4 align-middle whitespace-nowrap">
                    <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {item.bounceRate}
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
