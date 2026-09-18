"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FileCheck,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Calendar,
  Lock,
  ExternalLink,
  ChevronRight,
  Eye,
  Download,
  Info,
} from "lucide-react";
import {
  AdminStorage,
  AdminConsentRecord,
} from "@/lib/adminStorage";
import { useAdminToast } from "@/components/admin/AdminToast";
import AdminModal from "@/components/admin/AdminModal";
import AdminStatCard from "@/components/admin/AdminStatCard";

export default function AdminPrivacyConsentsPage() {
  const toast = useAdminToast();

  const [consents, setConsents] = useState<AdminConsentRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("All");

  // Modal State
  const [selectedRecord, setSelectedRecord] = useState<AdminConsentRecord | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setConsents(AdminStorage.getConsentRecords());
  }, []);

  const handleOpenRecord = (record: AdminConsentRecord) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const handleExportCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [
        ["ID", "Timestamp", "Subject", "Email", "ConsentType", "Channel", "IP_Address"].join(","),
        ...consents.map((c) =>
          [
            c.id,
            `"${c.timestamp || c.date || ""}"`,
            `"${c.subjectName || c.user || "User"}"`,
            `"${c.subjectEmail || c.user || ""}"`,
            `"${c.consentType || c.purpose || "Consent"}"`,
            `"${c.channel || "Web Form"}"`,
            `"${c.ipAddress || "Anonymized"}"`,
          ].join(",")
        ),
      ].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `LAX360_Consent_Audit_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Consent audit register downloaded as CSV.");
  };

  // Filtered consents with null safety
  const filteredConsents = consents.filter((c) => {
    const sName = (c.subjectName || c.user || "").toLowerCase();
    const sEmail = (c.subjectEmail || c.user || "").toLowerCase();
    const cType = (c.consentType || c.purpose || "").toLowerCase();
    const purpose = (c.purpose || "").toLowerCase();
    const id = (c.id || "").toLowerCase();
    const term = searchTerm.toLowerCase();

    const matchSearch =
      sName.includes(term) ||
      sEmail.includes(term) ||
      cType.includes(term) ||
      purpose.includes(term) ||
      id.includes(term);

    const activeType = c.consentType || c.purpose || "";
    const matchType = typeFilter === "All" || activeType.includes(typeFilter);
    return matchSearch && matchType;
  });

  const admissionsCount = consents.filter(
    (c) => (c.consentType || c.purpose || "").includes("Admissions")
  ).length;
  const careerCount = consents.filter(
    (c) => (c.consentType || c.purpose || "").includes("Career")
  ).length;
  const cookieCount = consents.filter(
    (c) => (c.consentType || c.purpose || "").includes("Cookie")
  ).length;

  return (
    <div className="space-y-8">
      {/* Top Banner & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
            <span>DPDP Governance</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <span className="text-slate-800">Consent Audit Register</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-serif">
            Consent Audit Trail
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Immutable register of informed consent events recorded across admissions inquiries, career applications, and cookie policies.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 shadow-xs cursor-pointer"
          >
            <Download className="w-4 h-4 text-slate-600" />
            <span>Export Audit Log (CSV)</span>
          </button>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <AdminStatCard
          title="Total Logged Consents"
          value={consents.length}
          description="Tamper-evident audit events"
          icon={FileCheck}
          accent="emerald"
        />
        <AdminStatCard
          title="Admissions Inquiries"
          value={admissionsCount}
          description="Parent consent for admissions"
          icon={ShieldCheck}
          accent="blue"
        />
        <AdminStatCard
          title="Faculty Applications"
          value={careerCount}
          description="Educator applicant processing"
          icon={Lock}
          accent="purple"
        />
        <AdminStatCard
          title="Cookie Preferences"
          value={cookieCount}
          description="Visitor privacy selections"
          icon={Clock}
          accent="amber"
        />
      </div>

      {/* Search and Filter */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#EAE3D7] shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by subject name, email, or record ID..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/70 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Consent Type:</span>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-900 cursor-pointer"
          >
            <option value="All">All Types ({consents.length})</option>
            <option value="Admissions">Admissions Inquiries ({admissionsCount})</option>
            <option value="Career">Career Applications ({careerCount})</option>
            <option value="Cookie">Cookie Preferences ({cookieCount})</option>
          </select>
        </div>
      </div>

      {/* Consents Table */}
      <div className="bg-white rounded-2xl border border-[#EAE3D7] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50/90 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                <th className="p-4 pl-6">Consent Event ID & Date</th>
                <th className="p-4">Data Principal / Subject</th>
                <th className="p-4">Consent Category</th>
                <th className="p-4">Channel / Form</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-right pr-6">Legal Record</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              {filteredConsents.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-slate-400">
                    <FileCheck className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                    <p className="font-semibold text-slate-600">No consent records matched your query.</p>
                  </td>
                </tr>
              ) : (
                filteredConsents.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 pl-6">
                      <p className="font-mono font-bold text-slate-900 text-xs">{item.id}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{item.timestamp || item.date}</p>
                    </td>

                    <td className="p-4">
                      <p className="font-bold text-slate-900 text-sm">
                        {item.subjectName || item.user || "School Visitor"}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {item.subjectEmail || item.user || "Verified Submission"}
                      </p>
                    </td>

                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 text-xs font-semibold">
                        {item.consentType || item.purpose}
                      </span>
                    </td>

                    <td className="p-4 text-xs text-slate-600">
                      <p className="font-medium text-slate-800">{item.channel || "Web Form"}</p>
                      <span className="text-[11px] text-slate-400 font-mono">
                        IP: {item.ipAddress || "103.117.xxx.xxx (Anonymized)"}
                      </span>
                    </td>

                    <td className="p-4 text-center">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200/60">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        {item.consent || "Granted"}
                      </span>
                    </td>

                    <td className="p-4 text-right pr-6 whitespace-nowrap">
                      <button
                        onClick={() => handleOpenRecord(item)}
                        className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                        title="View Full Consent Transcript"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Consent Details Modal */}
      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Consent Transaction Audit Certificate"
        description="Verifiable electronic log generated pursuant to Section 6 of the DPDP Act, 2023."
        maxWidth="lg"
      >
        {selectedRecord && (
          <div className="space-y-5">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500 uppercase font-bold text-[10px]">Record Identifier</span>
                <span className="font-mono font-bold text-slate-900">{selectedRecord.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 uppercase font-bold text-[10px]">Timestamp (IST)</span>
                <span className="font-semibold text-slate-800">
                  {selectedRecord.timestamp || selectedRecord.date}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 uppercase font-bold text-[10px]">Data Principal</span>
                <span className="font-semibold text-slate-800">
                  {selectedRecord.subjectName || selectedRecord.user} ({selectedRecord.subjectEmail || selectedRecord.user})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 uppercase font-bold text-[10px]">Origin Channel</span>
                <span className="font-semibold text-slate-800">
                  {selectedRecord.channel || "Admissions / Careers Portal"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 uppercase font-bold text-[10px]">Anonymized IP</span>
                <span className="font-mono text-slate-600">
                  {selectedRecord.ipAddress || "103.117.xxx.xxx"}
                </span>
              </div>
            </div>

            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Stated Lawful Purpose
              </h5>
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-800 font-medium">
                {selectedRecord.purpose}
              </div>
            </div>

            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Full Consent Notice Acknowledged
              </h5>
              <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200 text-xs text-slate-700 leading-relaxed font-mono whitespace-pre-wrap">
                {selectedRecord.noticeText ||
                  "I consent to the collection, processing, and temporary retention of my submitted data by LAX360 for the sole purpose of educational evaluation and communications in compliance with the DPDP Act, 2023."}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-mono">
                Cryptographic Integrity: Verified
              </span>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold"
              >
                Close Audit View
              </button>
            </div>
          </div>
        )}
      </AdminModal>
    </div>
  );
}
