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
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
            <span>DPDP Governance</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <span className="text-slate-800">Citizen Data Requests</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-serif">
            Data Rights & Grievance Desk
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Process citizen requests submitted under India&apos;s Digital Personal Data Protection Act (DPDP Act, 2023).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/privacy"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 shadow-xs"
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
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by parent name, email, or request summary..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/70 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-900 cursor-pointer"
            >
              <option value="All">All Statuses ({requests.length})</option>
              <option value="Pending">Pending ({pendingCount})</option>
              <option value="In Review">In Review ({inReviewCount})</option>
              <option value="Fulfilled">Fulfilled ({fulfilledCount})</option>
              <option value="Rejected">Rejected ({rejectedCount})</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Request Type:</span>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-900 cursor-pointer max-w-[200px] truncate"
            >
              <option value="All">All Categories</option>
              <option value="Access my personal data">Access personal data</option>
              <option value="Correction / Update details">Correction / Update</option>
              <option value="Erasure / Deletion of data">Erasure / Deletion</option>
              <option value="Withdrawal of consent">Withdrawal of consent</option>
              <option value="Grievance / Question">Grievance / Question</option>
            </select>
          </div>
        </div>
      </div>

      {/* Requests Table */}
      <div className="bg-white rounded-2xl border border-[#EAE3D7] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50/90 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                <th className="p-4 pl-6">Data Subject / Guardian</th>
                <th className="p-4">Requested Action</th>
                <th className="p-4">Request Summary</th>
                <th className="p-4">Date Filed</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-right pr-6">Review</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              {filteredRequests.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-slate-400">
                    <ShieldAlert className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                    <p className="font-semibold text-slate-600">No data rights requests found.</p>
                    <p className="text-xs mt-1">Adjust filters or submit a demo request via the public /privacy portal.</p>
                  </td>
                </tr>
              ) : (
                filteredRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 pl-6">
                      <p className="font-bold text-slate-900 text-sm">{req.name}</p>
                      <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                        <Mail className="w-3 h-3 text-slate-400" />
                        <span>{req.email}</span>
                      </p>
                      <span className="text-[11px] text-slate-400 font-mono mt-1 block">
                        ID: {req.id}
                      </span>
                    </td>

                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-md bg-amber-50 text-amber-900 text-xs font-semibold border border-amber-200/60 inline-block">
                        {req.requestType}
                      </span>
                    </td>

                    <td className="p-4 max-w-sm">
                      <p className="text-xs text-slate-700 line-clamp-2 leading-relaxed">
                        &ldquo;{req.message}&rdquo;
                      </p>
                    </td>

                    <td className="p-4 whitespace-nowrap text-xs text-slate-500">
                      {req.submittedDate}
                    </td>

                    <td className="p-4 text-center">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
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

                    <td className="p-4 text-right pr-6 whitespace-nowrap">
                      <button
                        onClick={() => handleOpenDrawer(req)}
                        className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors cursor-pointer shadow-xs"
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
              className="px-4 py-2 rounded-xl text-xs sm:text-sm text-slate-600 hover:bg-slate-200/60 font-semibold transition-colors"
            >
              Close
            </button>
            <button
              onClick={handleSaveStatus}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold transition-colors shadow-sm cursor-pointer"
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
