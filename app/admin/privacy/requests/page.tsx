"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShieldAlert,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  UserCheck,
  AlertCircle,
  FileText,
  Mail,
  Calendar,
  XCircle,
  ExternalLink,
  ChevronRight,
  Shield,
  HelpCircle,
} from "lucide-react";
import {
  AdminStorage,
  AdminPrivacyRequest,
} from "@/lib/adminStorage";
import { useAdminToast } from "@/components/admin/AdminToast";
import AdminDrawer from "@/components/admin/AdminDrawer";
import AdminStatCard from "@/components/admin/AdminStatCard";

export default function AdminPrivacyRequestsPage() {
  const toast = useAdminToast();

  const [requests, setRequests] = useState<AdminPrivacyRequest[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [typeFilter, setTypeFilter] = useState<string>("All");

  // Drawer State
  const [selectedReq, setSelectedReq] = useState<AdminPrivacyRequest | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<AdminPrivacyRequest["status"]>("Pending");
  const [adminNotes, setAdminNotes] = useState("");

  useEffect(() => {
    setRequests(AdminStorage.getPrivacyRequests());
  }, []);

  const handleOpenDrawer = (req: AdminPrivacyRequest) => {
    setSelectedReq(req);
    setNewStatus(req.status);
    setAdminNotes(req.notes || "");
    setIsDrawerOpen(true);
  };

  const handleSaveStatus = () => {
    if (!selectedReq) return;

    const updated = requests.map((r) =>
      r.id === selectedReq.id ? { ...r, status: newStatus, notes: adminNotes } : r
    );

    setRequests(updated);
    AdminStorage.savePrivacyRequests(updated);
    setSelectedReq({ ...selectedReq, status: newStatus, notes: adminNotes });
    toast.success(`Request ${selectedReq.id} updated to "${newStatus}".`);
  };

  // Filter requests
  const filteredRequests = requests.filter((req) => {
    const matchSearch =
      req.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.requestType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === "All" || req.status === statusFilter;
    const matchType = typeFilter === "All" || req.requestType === typeFilter;
    return matchSearch && matchStatus && matchType;
  });

  const pendingCount = requests.filter((r) => r.status === "Pending").length;
  const inReviewCount = requests.filter((r) => r.status === "In Review").length;
  const fulfilledCount = requests.filter((r) => r.status === "Fulfilled").length;
  const rejectedCount = requests.filter((r) => r.status === "Rejected").length;

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 mb-1">
            <span>DPDP Governance</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-900 font-bold">Citizen Data Requests</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-serif">
            Data Rights & Grievance Desk
          </h2>
          <p className="mt-1 text-sm text-slate-700">
            Process citizen requests submitted under India&apos;s Digital Personal Data Protection Act (DPDP Act, 2023).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/privacy"
            target="_blank"
            rel="noreferrer"
            className="min-h-[44px] h-[44px] px-4 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-sm font-semibold transition-all flex items-center gap-2 shadow-xs cursor-pointer"
          >
            <ExternalLink className="w-4 h-4 text-slate-500" />
            <span>Public Privacy Notice</span>
          </Link>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <AdminStatCard
          title="Pending Action"
          value={pendingCount}
          description="Awaiting initial DPO triage"
          icon={Clock}
          accent="amber"
        />
        <AdminStatCard
          title="Under Legal Review"
          value={inReviewCount}
          description="Verification in progress"
          icon={ShieldAlert}
          accent="blue"
        />
        <AdminStatCard
          title="Fulfilled Requests"
          value={fulfilledCount}
          description="Data provided or corrected"
          icon={CheckCircle2}
          accent="emerald"
        />
        <AdminStatCard
          title="Total Invocations"
          value={requests.length}
          description="Overall data subject queries"
          icon={FileText}
          accent="slate"
        />
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#EAE3D7] shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative w-full sm:w-[360px]">
          <Search className="w-5 h-5 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by parent name, email, or request summary..."
            className="w-full min-h-[46px] h-[46px] pl-11 pr-4 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all shadow-xs"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-[38px] px-3.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 cursor-pointer"
            >
              <option value="All">All Statuses ({requests.length})</option>
              <option value="Pending">Pending ({pendingCount})</option>
              <option value="In Review">In Review ({inReviewCount})</option>
              <option value="Fulfilled">Fulfilled ({fulfilledCount})</option>
              <option value="Rejected">Rejected ({rejectedCount})</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Request Type:</span>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="h-[38px] px-3.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 cursor-pointer"
            >
              <option value="All">All Types</option>
              <option value="Access / Summary of Data">Access / Summary of Data</option>
              <option value="Correction / Updation of Record">Correction / Updation</option>
              <option value="Erasure / Deletion of Personal Data">Erasure / Deletion</option>
              <option value="Grievance / DPO Complaint">Grievance / Complaint</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table of Requests */}
      <div className="rounded-2xl bg-white border border-[#EAE3D7] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[880px] text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70 text-xs font-bold uppercase tracking-wider text-slate-700">
                <th className="py-3.5 px-5 sm:px-6 align-middle w-[26%] min-w-[220px]">Token / Identity</th>
                <th className="py-3.5 px-4 align-middle w-[32%] min-w-[250px]">Classification</th>
                <th className="py-3.5 px-4 align-middle w-[14%] min-w-[120px] whitespace-nowrap">Submitted</th>
                <th className="py-3.5 px-4 align-middle text-center w-[13%] min-w-[110px] whitespace-nowrap">Status</th>
                <th className="py-3.5 px-5 sm:px-6 align-middle text-right w-[15%] min-w-[140px] whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRequests.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500 font-medium">
                    No citizen requests found matching the current search parameters.
                  </td>
                </tr>
              ) : (
                filteredRequests.map((req) => (
                  <tr
                    key={req.id}
                    className={`hover:bg-slate-50/60 transition-colors ${
                      req.status === "Pending" ? "bg-amber-50/20" : ""
                    }`}
                  >
                    <td className="py-4 px-5 sm:px-6 align-middle">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-slate-950">
                          {req.id}
                        </span>
                        {req.verifiedParent && (
                          <span
                            title="Verified Identity"
                            className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded-sm"
                          >
                            <UserCheck className="w-3 h-3" />
                            Verified
                          </span>
                        )}
                      </div>
                      <p className="font-semibold text-slate-900 mt-1">{req.name}</p>
                      <p className="text-xs text-slate-600 font-medium">{req.email}</p>
                    </td>

                    <td className="py-4 px-4 align-middle">
                      <span className="font-semibold text-slate-900 block">{req.requestType}</span>
                      <p className="text-xs text-slate-700 italic line-clamp-2 max-w-sm mt-0.5">
                        &ldquo;{req.message}&rdquo;
                      </p>
                    </td>

                    <td className="py-4 px-4 align-middle whitespace-nowrap text-xs text-slate-700 font-medium">
                      {req.submittedDate}
                    </td>

                    <td className="py-4 px-4 align-middle text-center whitespace-nowrap">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-bold shadow-xs ${
                          req.status === "Pending"
                            ? "bg-amber-100 text-amber-900"
                            : req.status === "In Review"
                            ? "bg-blue-100 text-blue-900"
                            : req.status === "Fulfilled"
                            ? "bg-emerald-100 text-emerald-900"
                            : "bg-rose-100 text-rose-900"
                        }`}
                      >
                        {req.status}
                      </span>
                    </td>

                    <td className="py-4 px-5 sm:px-6 align-middle text-right whitespace-nowrap">
                      <button
                        onClick={() => handleOpenDrawer(req)}
                        className="min-h-[38px] h-[38px] px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer shadow-xs whitespace-nowrap"
                      >
                        Review Request
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Request Details Drawer */}
      <AdminDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={selectedReq ? `Request #${selectedReq.id}` : "Data Request"}
        subtitle={selectedReq ? `Submitted by ${selectedReq.name}` : ""}
        width="lg"
        footer={
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="min-h-[40px] h-[40px] px-4 rounded-xl text-sm text-slate-700 hover:text-slate-950 hover:bg-slate-100 font-semibold transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={handleSaveStatus}
              className="min-h-[44px] h-[44px] px-5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold transition-colors shadow-xs cursor-pointer"
            >
              Update Resolution & Save
            </button>
          </div>
        }
      >
        {selectedReq && (
          <div className="space-y-6">
            {/* Header info */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Request Classification
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {selectedReq.submittedDate}
                </span>
              </div>
              <p className="text-base font-bold text-slate-900">{selectedReq.requestType}</p>

              <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                  <UserCheck className="w-4 h-4" />
                  <span>Self / Legal Guardian Verified</span>
                </div>
                <span className="text-slate-400 font-mono">DPDP-SEC-12</span>
              </div>
            </div>

            {/* Applicant details */}
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Applicant Information
              </h5>
              <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2 text-xs sm:text-sm">
                <p className="font-bold text-slate-900">{selectedReq.name}</p>
                <div className="flex items-center gap-2 text-slate-600">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <a href={`mailto:${selectedReq.email}`} className="hover:underline">
                    {selectedReq.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Full Message */}
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Citizen Statement & Request Details
              </h5>
              <div className="p-4 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed bg-slate-50/50">
                {selectedReq.message}
              </div>
            </div>

            {/* Administrative Resolution Form */}
            <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-200/70 space-y-4">
              <h5 className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-amber-700" />
                Data Protection Officer Resolution
              </h5>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Update Request Status
                </label>
                <select
                  value={newStatus}
                  onChange={(e) =>
                    setNewStatus(e.target.value as AdminPrivacyRequest["status"])
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 cursor-pointer"
                >
                  <option value="Pending">Pending Review</option>
                  <option value="In Review">In Review (Identity verification in progress)</option>
                  <option value="Fulfilled">Fulfilled (Data extract dispatched or purged)</option>
                  <option value="Rejected">Rejected (Ineligible or lack of legal locus)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Internal DPO Notes & Audit Trail
                </label>
                <textarea
                  rows={4}
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Record verification method, data export date, or rationale for resolution..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>
            </div>
          </div>
        )}
      </AdminDrawer>
    </div>
  );
}
