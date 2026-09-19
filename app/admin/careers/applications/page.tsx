"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Users,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  BriefcaseBusiness,
  FileText,
  Mail,
  Phone,
  GraduationCap,
  Calendar,
  ExternalLink,
  ShieldCheck,
  Download,
  AlertCircle,
  Eye,
  XCircle,
  Award,
} from "lucide-react";
import {
  AdminStorage,
  AdminJobApplication,
  AdminJobItem,
} from "@/lib/adminStorage";
import { useAdminToast } from "@/components/admin/AdminToast";
import AdminDrawer from "@/components/admin/AdminDrawer";
import AdminStatCard from "@/components/admin/AdminStatCard";

function ApplicationsDeskContent() {
  const searchParams = useSearchParams();
  const initialJobFilter = searchParams.get("job") || "All";

  const toast = useAdminToast();

  const [applications, setApplications] = useState<AdminJobApplication[]>([]);
  const [jobs, setJobs] = useState<AdminJobItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [jobFilter, setJobFilter] = useState<string>(initialJobFilter);

  // Drawer State
  const [selectedApp, setSelectedApp] = useState<AdminJobApplication | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<AdminJobApplication["status"]>("New");
  const [internalNotes, setInternalNotes] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setApplications(AdminStorage.getJobApplications());
    setJobs(AdminStorage.getJobs());
  };

  const handleOpenDossier = (app: AdminJobApplication) => {
    setSelectedApp(app);
    setNewStatus(app.status);
    setInternalNotes(app.notes || "");
    setIsDrawerOpen(true);
  };

  const handleUpdateStatus = (targetStatus: AdminJobApplication["status"]) => {
    setNewStatus(targetStatus);
  };

  const handleSaveReview = () => {
    if (!selectedApp) return;

    const updated = applications.map((a) =>
      a.id === selectedApp.id ? { ...a, status: newStatus, notes: internalNotes } : a
    );

    setApplications(updated);
    AdminStorage.saveJobApplications(updated);
    setSelectedApp({ ...selectedApp, status: newStatus, notes: internalNotes });
    toast.success(`Dossier updated: ${selectedApp.fullName} is now "${newStatus}".`);
  };

  // Filter calculations
  const filteredApps = applications.filter((app) => {
    const name = (app.fullName || "").toLowerCase();
    const email = (app.email || "").toLowerCase();
    const position = (app.position || "").toLowerCase();
    const qualification = (app.highestQualification || "").toLowerCase();
    const term = searchTerm.toLowerCase();

    const matchSearch =
      name.includes(term) ||
      email.includes(term) ||
      position.includes(term) ||
      qualification.includes(term);

    const matchStatus = statusFilter === "All" || app.status === statusFilter;
    const matchJob = jobFilter === "All" || (app.position && app.position.toLowerCase() === jobFilter.toLowerCase());

    return matchSearch && matchStatus && matchJob;
  });

  // Metrics
  const newCount = applications.filter((a) => a.status === "New").length;
  const underReviewCount = applications.filter((a) => a.status === "Under Review").length;
  const shortlistedCount = applications.filter((a) => a.status === "Shortlisted").length;
  const selectedCount = applications.filter((a) => a.status === "Selected").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#EAE3D7]">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Career Applications</h1>
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-md bg-amber-100 text-amber-900 border border-amber-200">
              Applications Desk
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Review candidate submissions and manage hiring stages.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/careers"
            target="_blank"
            className="min-h-[44px] h-[44px] px-4 rounded-xl text-sm font-semibold text-slate-800 bg-white border border-[#EAE3D7] hover:bg-slate-50 transition-colors shadow-2xs inline-flex items-center gap-2"
          >
            <ExternalLink className="w-4 h-4 text-slate-500" />
            <span>View Public Careers</span>
          </Link>
          <Link
            href="/admin/careers"
            className="min-h-[44px] h-[44px] px-5 rounded-xl text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 transition-colors shadow-xs inline-flex items-center gap-2 cursor-pointer"
          >
            <BriefcaseBusiness className="w-4 h-4 text-amber-400" />
            <span>Manage Positions</span>
          </Link>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex border-b border-[#EAE3D7] text-sm">
        <Link
          href="/admin/careers"
          className="px-4 py-2.5 font-semibold text-slate-700 hover:text-slate-950 transition-colors flex items-center gap-2"
        >
          <BriefcaseBusiness className="w-4 h-4 text-slate-500" />
          <span>Open Positions ({jobs.length})</span>
        </Link>
        <Link
          href="/admin/careers/applications"
          className="px-4 py-2.5 font-semibold text-slate-900 border-b-2 border-slate-900 -mb-px transition-colors flex items-center gap-2"
        >
          <Users className="w-4 h-4 text-slate-900" />
          <span>Career Applications ({applications.length})</span>
          {newCount > 0 && (
            <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-amber-500 text-white">
              {newCount}
            </span>
          )}
        </Link>
      </div>

      {/* Top 4 Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <AdminStatCard
          title="New Submissions"
          value={newCount}
          change="Awaiting screening"
          icon={Clock}
          changeType="positive"
          accent="amber"
        />
        <AdminStatCard
          title="Under Review"
          value={underReviewCount}
          change="Faculty panel review"
          icon={Users}
          changeType="neutral"
          accent="blue"
        />
        <AdminStatCard
          title="Shortlisted"
          value={shortlistedCount}
          change="Scheduled for demo classes"
          icon={Award}
          changeType="positive"
          accent="purple"
        />
        <AdminStatCard
          title="Selected"
          value={selectedCount}
          change="Offer issued / finalized"
          icon={CheckCircle2}
          changeType="positive"
          accent="emerald"
        />
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-[#EAE3D7] shadow-2xs space-y-3 sm:space-y-0 sm:flex sm:items-center sm:justify-between gap-4">
        {/* Search */}
        <div className="relative w-full sm:w-[360px]">
          <Search className="w-5 h-5 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search candidate name, qualification, or email..."
            className="w-full min-h-[46px] h-[46px] pl-11 pr-4 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all shadow-xs"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Status Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-[38px] px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 font-medium focus:outline-none focus:border-slate-800 cursor-pointer"
            >
              <option value="All">All Stages</option>
              <option value="New">New</option>
              <option value="Under Review">Under Review</option>
              <option value="Shortlisted">Shortlisted</option>
              <option value="Selected">Selected</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          {/* Job Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Role:</span>
            <select
              value={jobFilter}
              onChange={(e) => setJobFilter(e.target.value)}
              className="h-[38px] px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 font-medium focus:outline-none focus:border-slate-800 max-w-[200px] cursor-pointer"
            >
              <option value="All">All Positions</option>
              {jobs.map((j) => (
                <option key={j.id} value={j.title}>
                  {j.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-2xl border border-[#EAE3D7] shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[960px] text-left text-xs sm:text-sm border-collapse">
            <thead className="bg-[#FAF8F5] border-b border-[#EAE3D7] text-slate-700 font-bold uppercase tracking-wider text-xs">
              <tr>
                <th className="px-5 py-3.5 align-middle w-[22%] min-w-[190px]">Candidate Name</th>
                <th className="px-4 py-3.5 align-middle w-[17%] min-w-[170px]">Position</th>
                <th className="px-4 py-3.5 align-middle w-[21%] min-w-[180px]">Highest Qualification</th>
                <th className="px-4 py-3.5 align-middle w-[9%] min-w-[90px] whitespace-nowrap">Experience</th>
                <th className="px-4 py-3.5 align-middle w-[10%] min-w-[110px] whitespace-nowrap">Submitted Date</th>
                <th className="px-4 py-3.5 align-middle w-[9%] min-w-[105px] whitespace-nowrap">Status</th>
                <th className="px-5 py-3.5 align-middle text-right w-[12%] min-w-[130px] whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredApps.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-slate-500 font-medium">
                    No candidate applications match the filter criteria.
                  </td>
                </tr>
              ) : (
                filteredApps.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-5 py-4 align-middle">
                      <div className="font-semibold text-slate-900 text-sm">{app.fullName}</div>
                      <div className="text-xs text-slate-600 flex items-center gap-2 mt-0.5 font-medium flex-wrap">
                        <span>{app.email}</span>
                        <span className="text-slate-400">•</span>
                        <span className="whitespace-nowrap">{app.phone}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 align-middle">
                      <span className="inline-block px-3 py-1 rounded-md bg-amber-50 text-amber-900 border border-amber-200/70 font-semibold text-xs whitespace-nowrap">
                        {app.position}
                      </span>
                    </td>
                    <td className="px-4 py-4 align-middle text-slate-800 font-medium leading-snug">
                      {app.highestQualification}
                    </td>
                    <td className="px-4 py-4 align-middle text-slate-800 font-medium whitespace-nowrap">
                      {app.experienceYears}
                    </td>
                    <td className="px-4 py-4 align-middle text-slate-700 font-medium text-xs whitespace-nowrap">
                      {app.appliedDate}
                    </td>
                    <td className="px-4 py-4 align-middle whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold shadow-xs ${
                          app.status === "New"
                            ? "bg-amber-100 text-amber-900"
                            : app.status === "Under Review"
                            ? "bg-blue-100 text-blue-900"
                            : app.status === "Shortlisted"
                            ? "bg-purple-100 text-purple-900"
                            : app.status === "Selected"
                            ? "bg-emerald-100 text-emerald-900"
                            : "bg-rose-100 text-rose-900"
                        }`}
                      >
                        {app.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 align-middle text-right whitespace-nowrap">
                      <button
                        onClick={() => handleOpenDossier(app)}
                        className="min-h-[38px] h-[38px] px-3.5 sm:px-4 rounded-xl text-xs sm:text-sm font-semibold bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-xs cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap min-w-[120px]"
                      >
                        <Eye className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>View Dossier</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CANDIDATE SLIDE-OVER DRAWER */}
      <AdminDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={selectedApp ? selectedApp.fullName : "Candidate Dossier"}
        subtitle={selectedApp ? `Applied for ${selectedApp.position} on ${selectedApp.appliedDate}` : ""}
        width="xl"
        footer={
          <div className="flex items-center justify-between gap-3 w-full">
            <div className="text-xs text-slate-700 font-medium">
              Current Stage: <span className="font-bold text-slate-950">{newStatus}</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsDrawerOpen(false)}
                className="min-h-[40px] h-[40px] px-4 text-sm font-semibold text-slate-700 hover:text-slate-950 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleSaveReview}
                className="min-h-[44px] h-[44px] px-5 text-sm font-semibold bg-slate-900 text-white hover:bg-slate-800 rounded-xl transition-colors shadow-xs cursor-pointer"
              >
                Save Review Changes
              </button>
            </div>
          </div>
        }
      >
        {selectedApp && (
          <div className="space-y-6">
            {/* Stage Quick Action Buttons */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Update Candidate Stage
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => handleUpdateStatus("Under Review")}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all border ${
                    newStatus === "Under Review"
                      ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                      : "bg-white text-slate-700 border-[#EAE3D7] hover:bg-blue-50"
                  }`}
                >
                  Mark Under Review
                </button>
                <button
                  type="button"
                  onClick={() => handleUpdateStatus("Shortlisted")}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all border ${
                    newStatus === "Shortlisted"
                      ? "bg-purple-600 text-white border-purple-600 shadow-xs"
                      : "bg-white text-slate-700 border-[#EAE3D7] hover:bg-purple-50"
                  }`}
                >
                  Shortlist
                </button>
                <button
                  type="button"
                  onClick={() => handleUpdateStatus("Selected")}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all border ${
                    newStatus === "Selected"
                      ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                      : "bg-white text-slate-700 border-[#EAE3D7] hover:bg-emerald-50"
                  }`}
                >
                  Mark Selected
                </button>
                <button
                  type="button"
                  onClick={() => handleUpdateStatus("Rejected")}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all border ${
                    newStatus === "Rejected"
                      ? "bg-rose-600 text-white border-rose-600 shadow-xs"
                      : "bg-white text-slate-700 border-[#EAE3D7] hover:bg-rose-50"
                  }`}
                >
                  Reject
                </button>
              </div>
            </div>

            {/* Candidate Contact & Profile Card */}
            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#EAE3D7] space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Contact & Credentials
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="space-y-1">
                  <span className="text-slate-400 font-medium">Email:</span>
                  <p className="font-semibold text-slate-900 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-slate-500" />
                    {selectedApp.email}
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-slate-400 font-medium">Phone:</span>
                  <p className="font-semibold text-slate-900 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-slate-500" />
                    {selectedApp.phone}
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-slate-400 font-medium">Highest Qualification:</span>
                  <p className="font-semibold text-slate-900 flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-slate-500" />
                    {selectedApp.highestQualification}
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-slate-400 font-medium">Experience:</span>
                  <p className="font-semibold text-slate-900 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    {selectedApp.experienceYears}
                  </p>
                </div>
              </div>
            </div>

            {/* Resume / CV Document */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Curriculum Vitae Document
              </h4>
              <div className="flex items-center justify-between p-3.5 bg-white border border-[#EAE3D7] rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-900 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-amber-800" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">
                      {selectedApp.resumeFileName || "Curriculum_Vitae.pdf"}
                    </p>
                    <p className="text-[11px] text-slate-400">PDF Application Document • 1.4 MB</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => toast.info(`Downloading ${selectedApp.resumeFileName} (Demo preview)`)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            </div>

            {/* Cover Letter / Teaching Philosophy */}
            {selectedApp.coverLetter && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Cover Letter / Personal Statement
                </h4>
                <div className="p-4 bg-white border border-[#EAE3D7] rounded-xl text-xs text-slate-700 leading-relaxed max-h-48 overflow-y-auto">
                  {selectedApp.coverLetter}
                </div>
              </div>
            )}

            {/* Portfolio / LinkedIn */}
            {selectedApp.portfolioUrl && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Portfolio / Professional Link
                </h4>
                <a
                  href={selectedApp.portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-50 border border-[#EAE3D7] rounded-xl text-xs text-slate-800 hover:text-amber-900 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                  <span>{selectedApp.portfolioUrl}</span>
                </a>
              </div>
            )}

            {/* Privacy Consent Audit Record */}
            <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs space-y-1">
              <div className="flex items-center gap-2 text-emerald-900 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>Privacy Consent Verified</span>
              </div>
              <p className="text-[11px] text-emerald-800 leading-relaxed">
                Candidate explicitly consented to recruitment data processing upon submission on{" "}
                {selectedApp.appliedDate}. Logged into the administration Consent Audit Trail.
              </p>
            </div>

            {/* Internal Review Notes */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Internal Review & Interview Notes
              </label>
              <textarea
                rows={4}
                value={internalNotes}
                onChange={(e) => setInternalNotes(e.target.value)}
                placeholder="Enter evaluation remarks, panel assessment comments, interview scheduling updates..."
                className="w-full px-3.5 py-2.5 bg-white border border-[#EAE3D7] rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800"
              />
            </div>
          </div>
        )}
      </AdminDrawer>
    </div>
  );
}

export default function AdminApplicationsPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-xs text-slate-400">
          Loading applications desk...
        </div>
      }
    >
      <ApplicationsDeskContent />
    </Suspense>
  );
}
