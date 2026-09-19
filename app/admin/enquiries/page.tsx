"use client";

import React, { useState, useEffect } from "react";
import {
  Inbox,
  Search,
  Filter,
  Eye,
  Trash2,
  Mail,
  Phone,
  Calendar,
  User,
  Plus,
  Download,
  CheckCircle2,
  Clock,
  FileText,
} from "lucide-react";
import { AdminStorage, AdminEnquiryItem } from "@/lib/adminStorage";
import { useAdminToast } from "@/components/admin/AdminToast";
import AdminDrawer from "@/components/admin/AdminDrawer";
import AdminModal from "@/components/admin/AdminModal";

export default function AdminEnquiriesPage() {
  const toast = useAdminToast();
  const [enquiries, setEnquiries] = useState<AdminEnquiryItem[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | "New" | "Read" | "Resolved">("All");

  // Drawer for dossier details
  const [selectedEnquiry, setSelectedEnquiry] = useState<AdminEnquiryItem | null>(null);
  const [notesDraft, setNotesDraft] = useState("");

  // Modal for adding a walk-in / phone enquiry
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formName, setFormName] = useState("");
  const [formParentName, setFormParentName] = useState("");
  const [formStudentName, setFormStudentName] = useState("");
  const [formGrade, setFormGrade] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formType, setFormType] = useState<AdminEnquiryItem["type"]>("Admission");
  const [formMessage, setFormMessage] = useState("");

  useEffect(() => {
    setEnquiries(AdminStorage.getEnquiries());
  }, []);

  const handleOpenDossier = (enq: AdminEnquiryItem) => {
    setSelectedEnquiry(enq);
    setNotesDraft(enq.notes || "");

    // Automatically mark "New" as "Read" when opened
    if (enq.status === "New") {
      const updated = enquiries.map((item) =>
        item.id === enq.id ? { ...item, status: "Read" as const } : item
      );
      setEnquiries(updated);
      AdminStorage.saveEnquiries(updated);
    }
  };

  const handleSaveNotes = () => {
    if (!selectedEnquiry) return;
    const updated = enquiries.map((item) =>
      item.id === selectedEnquiry.id ? { ...item, notes: notesDraft } : item
    );
    setEnquiries(updated);
    AdminStorage.saveEnquiries(updated);
    setSelectedEnquiry({ ...selectedEnquiry, notes: notesDraft });
    toast.success("Internal counseling notes updated.");
  };

  const handleUpdateStatus = (status: AdminEnquiryItem["status"]) => {
    if (!selectedEnquiry) return;
    const updated = enquiries.map((item) =>
      item.id === selectedEnquiry.id ? { ...item, status } : item
    );
    setEnquiries(updated);
    AdminStorage.saveEnquiries(updated);
    setSelectedEnquiry({ ...selectedEnquiry, status });
    toast.info(`Inquiry marked as "${status}".`);
  };

  const handleDeleteEnquiry = (id: string, name: string) => {
    if (window.confirm(`Delete inquiry record for "${name}"?`)) {
      const updated = enquiries.filter((e) => e.id !== id);
      setEnquiries(updated);
      AdminStorage.saveEnquiries(updated);
      if (selectedEnquiry?.id === id) {
        setSelectedEnquiry(null);
      }
      toast.info(`Inquiry for "${name}" deleted.`);
    }
  };

  const handleCreateEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formEmail.trim() || !formPhone.trim()) {
      toast.error("Please fill in contact name, email, and phone number.");
      return;
    }

    const newEnq: AdminEnquiryItem = {
      id: `enq-${Date.now()}`,
      name: formName,
      parentName: formParentName || formName,
      studentName: formStudentName,
      targetGrade: formGrade,
      email: formEmail,
      phone: formPhone,
      type: formType,
      message: formMessage || "Telephone/walk-in inquiry logged by admissions staff.",
      date: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      status: "New",
      notes: "Direct administrative intake.",
    };

    const updated = [newEnq, ...enquiries];
    setEnquiries(updated);
    AdminStorage.saveEnquiries(updated);
    toast.success(`Inquiry logged for "${formName}".`);
    setIsAddModalOpen(false);

    // Reset
    setFormName("");
    setFormParentName("");
    setFormStudentName("");
    setFormGrade("");
    setFormEmail("");
    setFormPhone("");
    setFormMessage("");
  };

  const handleExportCSV = () => {
    const headers = "ID,Name,Parent,Student,Grade,Email,Phone,Type,Date,Status\n";
    const rows = enquiries
      .map(
        (e) =>
          `"${e.id}","${e.name}","${e.parentName || ""}","${e.studentName || ""}","${
            e.targetGrade || ""
          }","${e.email}","${e.phone}","${e.type}","${e.date}","${e.status}"`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `lax360_enquiries_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Exported inquiries to CSV.");
  };

  const filteredEnquiries = enquiries.filter((e) => {
    const matchSearch =
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      (e.studentName && e.studentName.toLowerCase().includes(search.toLowerCase())) ||
      e.email.toLowerCase().includes(search.toLowerCase()) ||
      e.phone.includes(search) ||
      (e.targetGrade && e.targetGrade.toLowerCase().includes(search.toLowerCase()));
    const matchStatus = statusFilter === "All" || e.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Prospect Enquiries & Applications
          </h2>
          <p className="text-sm text-slate-700 mt-1">
            Real-time pipeline of admissions interest, campus visit requests, and parental consultations
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          <button
            type="button"
            onClick={handleExportCSV}
            className="min-h-[44px] h-[44px] px-4 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-800 hover:text-slate-950 hover:bg-slate-50 transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Export CSV</span>
          </button>
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="min-h-[44px] h-[44px] px-5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold flex items-center gap-2 shadow-xs transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 text-amber-400" />
            <span>Log Walk-in Intake</span>
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="p-4 rounded-2xl bg-white border border-[#EAE3D7] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-[360px]">
          <Search className="w-5 h-5 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by parent, student, email, or grade..."
            className="w-full min-h-[46px] h-[46px] pl-11 pr-4 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all shadow-xs"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end flex-wrap">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider mr-1">Status:</span>
          {(["All", "New", "Read", "Resolved"] as const).map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`h-[38px] px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                statusFilter === st
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-950"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Enquiries Data Table */}
      <div className="rounded-2xl bg-white border border-[#EAE3D7] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70 text-xs font-bold uppercase tracking-wider text-slate-700">
                <th className="py-3.5 px-6">Applicant & Family</th>
                <th className="py-3.5 px-6">Target Grade</th>
                <th className="py-3.5 px-6">Contact Info</th>
                <th className="py-3.5 px-6">Type</th>
                <th className="py-3.5 px-6">Date</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
              {filteredEnquiries.map((enq) => (
                <tr
                  key={enq.id}
                  className={`hover:bg-slate-50/60 transition-colors ${
                    enq.status === "New" ? "bg-amber-50/20" : ""
                  }`}
                >
                  {/* Name */}
                  <td className="py-4 px-6">
                    <div className="font-bold text-slate-900">{enq.name}</div>
                    {enq.studentName && (
                      <div className="text-xs text-slate-600 mt-0.5 font-medium">
                        Student: {enq.studentName}
                      </div>
                    )}
                  </td>

                  {/* Grade */}
                  <td className="py-4 px-6 text-slate-900 font-semibold">
                    {enq.targetGrade || "Not specified"}
                  </td>

                  {/* Contact */}
                  <td className="py-4 px-6">
                    <div className="text-slate-900 font-mono text-xs font-medium">{enq.phone}</div>
                    <div className="text-slate-700 text-xs font-medium truncate max-w-[180px]">{enq.email}</div>
                  </td>

                  {/* Type */}
                  <td className="py-4 px-6">
                    <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 text-xs font-semibold">
                      {enq.type}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="py-4 px-6 text-slate-700 font-medium whitespace-nowrap text-xs">
                    {enq.date}
                  </td>

                  {/* Status */}
                  <td className="py-4 px-6">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow-xs ${
                        enq.status === "New"
                          ? "bg-amber-100 text-amber-900"
                          : enq.status === "Read"
                          ? "bg-blue-50 text-blue-800"
                          : "bg-emerald-50 text-emerald-800"
                      }`}
                    >
                      {enq.status}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="py-4 px-6 text-right whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => handleOpenDossier(enq)}
                      className="min-h-[36px] sm:min-h-[38px] h-[36px] sm:h-[38px] px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Dossier</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slide-over Enquiry Dossier Drawer */}
      <AdminDrawer
        isOpen={Boolean(selectedEnquiry)}
        onClose={() => setSelectedEnquiry(null)}
        title={selectedEnquiry ? `Application Dossier: ${selectedEnquiry.name}` : "Dossier"}
        subtitle={selectedEnquiry?.id}
        footer={
          selectedEnquiry && (
            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() =>
                  handleDeleteEnquiry(selectedEnquiry.id, selectedEnquiry.name)
                }
                className="px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 text-xs font-semibold transition-colors flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
              <div className="flex items-center gap-2">
                <a
                  href={`tel:${selectedEnquiry.phone}`}
                  className="px-3 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-white text-xs font-semibold flex items-center gap-1.5 shadow-xs"
                >
                  <Phone className="w-3.5 h-3.5 text-slate-500" />
                  <span>Call</span>
                </a>
                <a
                  href={`mailto:${selectedEnquiry.email}`}
                  className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm"
                >
                  <Mail className="w-3.5 h-3.5 text-amber-400" />
                  <span>Send Email</span>
                </a>
              </div>
            </div>
          )
        }
      >
        {selectedEnquiry && (
          <div className="space-y-6">
            {/* Status Selector Card */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Dossier Status
                </p>
                <p className="text-xs font-semibold text-slate-900 mt-0.5">
                  Current: {selectedEnquiry.status}
                </p>
              </div>
              <div className="flex items-center gap-1.5">
                {(["New", "Read", "Resolved"] as const).map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => handleUpdateStatus(st)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                      selectedEnquiry.status === st
                        ? "bg-slate-900 text-white"
                        : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Applicant Profile Grid */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Applicant Details
              </h4>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-white border border-slate-200">
                  <span className="text-slate-400 text-[10px] uppercase font-semibold">
                    Primary Contact
                  </span>
                  <p className="font-bold text-slate-900 mt-0.5">{selectedEnquiry.name}</p>
                </div>
                <div className="p-3 rounded-xl bg-white border border-slate-200">
                  <span className="text-slate-400 text-[10px] uppercase font-semibold">
                    Target Grade
                  </span>
                  <p className="font-bold text-slate-900 mt-0.5">
                    {selectedEnquiry.targetGrade || "General Inquiry"}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-white border border-slate-200">
                  <span className="text-slate-400 text-[10px] uppercase font-semibold">
                    Phone Number
                  </span>
                  <p className="font-mono text-slate-900 mt-0.5">{selectedEnquiry.phone}</p>
                </div>
                <div className="p-3 rounded-xl bg-white border border-slate-200">
                  <span className="text-slate-400 text-[10px] uppercase font-semibold">
                    Email Address
                  </span>
                  <p className="text-slate-900 mt-0.5 truncate">{selectedEnquiry.email}</p>
                </div>
              </div>
            </div>

            {/* Message Body */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Inquiry Message / Statement of Interest
              </h4>
              <div className="p-4 rounded-xl bg-amber-50/40 border border-amber-200/60 text-xs text-slate-700 leading-relaxed italic">
                &ldquo;{selectedEnquiry.message}&rdquo;
              </div>
            </div>

            {/* Internal Counseling Notes */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Internal Counselor Notes
                </h4>
                <button
                  type="button"
                  onClick={handleSaveNotes}
                  className="text-xs font-bold text-amber-700 hover:text-amber-800"
                >
                  Save Notes
                </button>
              </div>
              <textarea
                rows={4}
                value={notesDraft}
                onChange={(e) => setNotesDraft(e.target.value)}
                placeholder="Log follow-up calls, assessment scores, interview notes, or visit outcomes..."
                className="w-full p-3 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
              />
            </div>
          </div>
        )}
      </AdminDrawer>

      {/* Log Walk-in Intake Modal */}
      <AdminModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Log Walk-in / Telephone Inquiry"
        description="Capture prospective student intake directly from front-desk consultations."
      >
        <form onSubmit={handleCreateEnquiry} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Parent / Guardian Name *
              </label>
              <input
                type="text"
                required
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="e.g. Mr. Sanjay Raman"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Prospective Student Name
              </label>
              <input
                type="text"
                value={formStudentName}
                onChange={(e) => setFormStudentName(e.target.value)}
                placeholder="e.g. Diya Raman"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                required
                value={formPhone}
                onChange={(e) => setFormPhone(e.target.value)}
                placeholder="+91 98401 23456"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={formEmail}
                onChange={(e) => setFormEmail(e.target.value)}
                placeholder="parent@example.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Target Grade
              </label>
              <input
                type="text"
                value={formGrade}
                onChange={(e) => setFormGrade(e.target.value)}
                placeholder="e.g. Grade 7 (Middle School)"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Inquiry Type
              </label>
              <select
                value={formType}
                onChange={(e) =>
                  setFormType(e.target.value as AdminEnquiryItem["type"])
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
              >
                <option value="Admission">Admission</option>
                <option value="Campus Visit">Campus Visit</option>
                <option value="Transfer">Mid-Year Transfer</option>
                <option value="General">General Query</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Inquiry Summary / Parent Requests
            </label>
            <textarea
              rows={3}
              value={formMessage}
              onChange={(e) => setFormMessage(e.target.value)}
              placeholder="Curriculum inquiries, transport requirements, second language preferences..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="min-h-[40px] h-[40px] px-4 rounded-xl text-sm font-semibold text-slate-700 hover:text-slate-950 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="min-h-[44px] h-[44px] px-5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold shadow-xs transition-all cursor-pointer"
            >
              Save Prospect Intake
            </button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
