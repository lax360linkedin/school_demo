"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  Inbox,
  BookOpen,
  Building2,
  Calendar,
  Image as ImageIcon,
  ArrowRight,
  ExternalLink,
  Briefcase,
  ShieldAlert,
  FileCheck,
  Cookie,
  GraduationCap,
} from "lucide-react";
import {
  AdminStorage,
  AdminEnquiryItem,
  AdminEventItem,
  AdminProgramItem,
  AdminFacilityItem,
  AdminJobItem,
  AdminJobApplication,
  AdminPrivacyRequest,
} from "@/lib/adminStorage";
import AdminStatCard from "@/components/admin/AdminStatCard";
import AdminActivityChart from "@/components/admin/AdminActivityChart";

export default function AdminDashboardPage() {
  const [enquiries, setEnquiries] = useState<AdminEnquiryItem[]>([]);
  const [events, setEvents] = useState<AdminEventItem[]>([]);
  const [programs, setPrograms] = useState<AdminProgramItem[]>([]);
  const [facilities, setFacilities] = useState<AdminFacilityItem[]>([]);
  const [jobs, setJobs] = useState<AdminJobItem[]>([]);
  const [applications, setApplications] = useState<AdminJobApplication[]>([]);
  const [privacyRequests, setPrivacyRequests] = useState<AdminPrivacyRequest[]>([]);

  useEffect(() => {
    setEnquiries(AdminStorage.getEnquiries());
    setEvents(AdminStorage.getEvents());
    setPrograms(AdminStorage.getPrograms());
    setFacilities(AdminStorage.getFacilities());
    setJobs(AdminStorage.getJobs());
    setApplications(AdminStorage.getJobApplications());
    setPrivacyRequests(AdminStorage.getPrivacyRequests());
  }, []);

  const newEnquiries = enquiries.filter((e) => e.status === "New");
  const activeJobs = jobs.filter((j) => j.status === "Published");
  const pendingRequests = privacyRequests.filter((r) => r.status === "Pending");
  const upcomingEvents = events.slice(0, 4);
  const recentEnquiries = enquiries.slice(0, 4);

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-amber-300 text-xs font-bold mb-4 border border-white/10">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            Academic Session 2026–2027 &bull; Term 1 Active
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white font-serif">
            Welcome to the LAX360 Administrative Suite
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
            Monitor institutional enrollment, review admissions inquiries, manage faculty hiring positions, and govern student & parent data privacy compliance across campus operations.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3.5 text-xs sm:text-sm">
            <Link
              href="/admin/enquiries"
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-all flex items-center gap-2 shadow-sm"
            >
              <Inbox className="w-4 h-4" />
              <span>Review {newEnquiries.length} New Inquiries</span>
            </Link>
            <Link
              href="/admin/careers/applications"
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-all flex items-center gap-2 border border-white/15"
            >
              <Briefcase className="w-4 h-4 text-amber-400" />
              <span>{applications.length} Job Applications</span>
            </Link>
            <Link
              href="/"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-all flex items-center gap-2 border border-white/15"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Preview Public Website</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <AdminStatCard
          title="Total Enrollment"
          value="1,450"
          change="+8.4%"
          changeType="positive"
          description="Nursery to Grade 12"
          icon={Users}
          accent="blue"
        />
        <AdminStatCard
          title="Prospect Inquiries"
          value={enquiries.length}
          change={`${newEnquiries.length} Pending`}
          changeType={newEnquiries.length > 0 ? "positive" : "neutral"}
          description="Parent admissions intake"
          icon={Inbox}
          accent="amber"
        />
        <AdminStatCard
          title="Careers & Talent"
          value={activeJobs.length}
          change={`${applications.length} Applicants`}
          changeType="positive"
          description="Active faculty openings"
          icon={Briefcase}
          accent="purple"
        />
        <AdminStatCard
          title="DPDP Privacy Requests"
          value={privacyRequests.length}
          change={`${pendingRequests.length} Pending Review`}
          changeType={pendingRequests.length > 0 ? "negative" : "positive"}
          description="Citizen data requests"
          icon={ShieldAlert}
          accent="slate"
        />
      </div>

      {/* Analytics Chart */}
      <AdminActivityChart />

      {/* Quick Action Hub */}
      <div>
        <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-3.5">
          Quick Management Desks
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          <Link
            href="/admin/careers"
            className="p-4 rounded-2xl bg-white border border-[#EAE3D7] hover:border-slate-400 hover:shadow-md transition-all flex flex-col items-start gap-2.5 group"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-800 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Briefcase className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">Job Openings</p>
              <p className="text-xs text-slate-500 truncate">{activeJobs.length} Active Posts</p>
            </div>
          </Link>

          <Link
            href="/admin/careers/applications"
            className="p-4 rounded-2xl bg-white border border-[#EAE3D7] hover:border-slate-400 hover:shadow-md transition-all flex flex-col items-start gap-2.5 group"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-800 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Users className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">Applications</p>
              <p className="text-xs text-slate-500 truncate">{applications.length} Candidates</p>
            </div>
          </Link>

          <Link
            href="/admin/privacy/requests"
            className="p-4 rounded-2xl bg-white border border-[#EAE3D7] hover:border-slate-400 hover:shadow-md transition-all flex flex-col items-start gap-2.5 group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-900 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">Data Requests</p>
              <p className="text-xs text-slate-500 truncate">{pendingRequests.length} Needs Review</p>
            </div>
          </Link>

          <Link
            href="/admin/privacy/consents"
            className="p-4 rounded-2xl bg-white border border-[#EAE3D7] hover:border-slate-400 hover:shadow-md transition-all flex flex-col items-start gap-2.5 group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <FileCheck className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">Consent Trail</p>
              <p className="text-xs text-slate-500 truncate">DPDP Logs</p>
            </div>
          </Link>

          <Link
            href="/admin/privacy/cookies"
            className="p-4 rounded-2xl bg-white border border-[#EAE3D7] hover:border-slate-400 hover:shadow-md transition-all flex flex-col items-start gap-2.5 group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Cookie className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">Cookie Setup</p>
              <p className="text-xs text-slate-500 truncate">Banner & Policy</p>
            </div>
          </Link>

          <Link
            href="/admin/programs"
            className="p-4 rounded-2xl bg-white border border-[#EAE3D7] hover:border-slate-400 hover:shadow-md transition-all flex flex-col items-start gap-2.5 group"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">Programs</p>
              <p className="text-xs text-slate-500 truncate">{programs.length} Tiers</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Two Column Section: Recent Inquiries & Upcoming Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Recent Inquiries Card */}
        <div className="p-6 rounded-2xl bg-white border border-[#EAE3D7] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Inbox className="w-4 h-4 text-slate-900" />
                <h3 className="text-sm sm:text-base font-bold text-slate-900">Recent Prospect Inquiries</h3>
              </div>
              <Link
                href="/admin/enquiries"
                className="text-xs sm:text-sm text-amber-700 hover:text-amber-800 font-semibold flex items-center gap-1"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="divide-y divide-slate-100 mt-2">
              {recentEnquiries.map((item) => (
                <div key={item.id} className="py-3.5 flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">{item.name}</p>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          item.status === "New"
                            ? "bg-amber-100 text-amber-900"
                            : item.status === "Read"
                            ? "bg-blue-50 text-blue-800"
                            : "bg-emerald-50 text-emerald-800"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 truncate">
                      {item.targetGrade || item.type} &bull; {item.phone}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 line-clamp-1 italic">
                      &ldquo;{item.message}&rdquo;
                    </p>
                  </div>
                  <span className="text-xs text-slate-400 shrink-0 font-medium">{item.date}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <Link
              href="/admin/enquiries"
              className="block w-full py-2.5 text-center rounded-xl bg-slate-50 hover:bg-slate-100 text-xs sm:text-sm font-semibold text-slate-700 transition-colors"
            >
              Open Enquiries Management Desk &rarr;
            </Link>
          </div>
        </div>

        {/* Upcoming Events Card */}
        <div className="p-6 rounded-2xl bg-white border border-[#EAE3D7] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-900" />
                <h3 className="text-sm sm:text-base font-bold text-slate-900">Upcoming Academic Calendar</h3>
              </div>
              <Link
                href="/admin/events"
                className="text-xs sm:text-sm text-amber-700 hover:text-amber-800 font-semibold flex items-center gap-1"
              >
                <span>All Events</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="divide-y divide-slate-100 mt-2">
              {upcomingEvents.map((evt) => (
                <div key={evt.id} className="py-3.5 flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">{evt.title}</p>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        {evt.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 truncate">
                      {evt.location} &bull; {evt.targetGrades}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs sm:text-sm font-bold text-slate-900 block">{evt.date}</span>
                    <span className="text-[11px] text-slate-400">{evt.time || "Full Day"}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <Link
              href="/admin/events"
              className="block w-full py-2.5 text-center rounded-xl bg-slate-50 hover:bg-slate-100 text-xs sm:text-sm font-semibold text-slate-700 transition-colors"
            >
              Add or Edit School Calendar &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
