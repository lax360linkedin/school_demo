"use client";

import React, { useState, useEffect } from "react";
import {
  BookOpen,
  Plus,
  Search,
  Edit3,
  Trash2,
  CheckCircle,
  Eye,
  Sparkles,
  AlertTriangle,
} from "lucide-react";
import { AdminStorage, AdminProgramItem } from "@/lib/adminStorage";
import { useAdminToast } from "@/components/admin/AdminToast";
import AdminModal from "@/components/admin/AdminModal";

export default function AdminProgramsPage() {
  const toast = useAdminToast();
  const [programs, setPrograms] = useState<AdminProgramItem[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | "Active" | "Draft">("All");

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState<AdminProgramItem | null>(null);

  // Form states
  const [formName, setFormName] = useState("");
  const [formGrades, setFormGrades] = useState("");
  const [formAgeRange, setFormAgeRange] = useState("");
  const [formTagline, setFormTagline] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formApproach, setFormApproach] = useState("");
  const [formHighlight, setFormHighlight] = useState("");
  const [formStatus, setFormStatus] = useState<"Active" | "Draft">("Active");

  useEffect(() => {
    setPrograms(AdminStorage.getPrograms());
  }, []);

  const handleOpenAdd = () => {
    setEditingProgram(null);
    setFormName("");
    setFormGrades("");
    setFormAgeRange("");
    setFormTagline("");
    setFormDescription("");
    setFormApproach("");
    setFormHighlight("");
    setFormStatus("Active");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (prog: AdminProgramItem) => {
    setEditingProgram(prog);
    setFormName(prog.name);
    setFormGrades(prog.grades);
    setFormAgeRange(prog.ageRange);
    setFormTagline(prog.tagline);
    setFormDescription(prog.description);
    setFormApproach(prog.approach);
    setFormHighlight(prog.highlight);
    setFormStatus(prog.status);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formGrades.trim()) {
      toast.error("Please fill in program name and grades.");
      return;
    }

    const updatedList = [...programs];

    if (editingProgram) {
      // Edit existing
      const idx = updatedList.findIndex((p) => p.id === editingProgram.id);
      if (idx !== -1) {
        updatedList[idx] = {
          ...editingProgram,
          name: formName,
          grades: formGrades,
          ageRange: formAgeRange,
          tagline: formTagline,
          description: formDescription,
          approach: formApproach,
          highlight: formHighlight,
          status: formStatus,
          updatedAt: new Date().toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
        };
        toast.success(`Program "${formName}" updated successfully.`);
      }
    } else {
      // Create new
      const newProgram: AdminProgramItem = {
        id: `prog-${Date.now()}`,
        name: formName,
        grades: formGrades,
        ageRange: formAgeRange || "Ages 5 - 18",
        tagline: formTagline,
        description: formDescription,
        approach: formApproach,
        highlight: formHighlight,
        status: formStatus,
        updatedAt: new Date().toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
      };
      updatedList.push(newProgram);
      toast.success(`New program "${formName}" created successfully.`);
    }

    setPrograms(updatedList);
    AdminStorage.savePrograms(updatedList);
    setIsModalOpen(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to remove the program "${name}"?`)) {
      const updatedList = programs.filter((p) => p.id !== id);
      setPrograms(updatedList);
      AdminStorage.savePrograms(updatedList);
      toast.info(`Program "${name}" was deleted.`);
    }
  };

  const toggleStatus = (id: string) => {
    const updatedList = programs.map((p) => {
      if (p.id === id) {
        const nextStatus = p.status === "Active" ? "Draft" : "Active";
        toast.info(`Status for "${p.name}" changed to ${nextStatus}.`);
        return { ...p, status: nextStatus as "Active" | "Draft" };
      }
      return p;
    });
    setPrograms(updatedList);
    AdminStorage.savePrograms(updatedList);
  };

  const filteredPrograms = programs.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.grades.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header with Search & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Academic Programs</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure developmental tiers from Early Childhood to Senior Secondary IB Diploma
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-2 shadow-sm transition-all self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4 text-amber-400" />
          <span>Add Academic Tier</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white border border-[#EAE3D7] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search programs by name or grade..."
            className="w-full pl-9 pr-3.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <span className="text-xs text-slate-400 font-medium">Status:</span>
          {(["All", "Active", "Draft"] as const).map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                statusFilter === st
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Programs List Cards */}
      <div className="space-y-4">
        {filteredPrograms.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-white border border-[#EAE3D7]">
            <BookOpen className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-700">No programs match your search</p>
            <p className="text-xs text-slate-400 mt-1">Try resetting the status filter or search query.</p>
          </div>
        ) : (
          filteredPrograms.map((prog) => (
            <div
              key={prog.id}
              className="p-6 rounded-2xl bg-white border border-[#EAE3D7] hover:border-slate-300 shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row md:items-start justify-between gap-6"
            >
              <div className="flex-1 min-w-0 space-y-2">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-800 font-bold text-xs">
                    {prog.grades}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">&bull;</span>
                  <span className="text-xs font-medium text-slate-500">{prog.ageRange}</span>
                  <button
                    onClick={() => toggleStatus(prog.id)}
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full cursor-pointer transition-colors ${
                      prog.status === "Active"
                        ? "bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
                        : "bg-amber-100 text-amber-900 hover:bg-amber-200"
                    }`}
                  >
                    {prog.status} (Click to toggle)
                  </button>
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                    {prog.name}
                  </h3>
                  {prog.tagline && (
                    <p className="text-xs font-semibold text-amber-700 mt-0.5">{prog.tagline}</p>
                  )}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
                  {prog.description}
                </p>

                <div className="pt-2 flex flex-wrap gap-4 text-[11px] text-slate-500">
                  {prog.approach && (
                    <span>
                      <strong className="text-slate-700">Pedagogical Approach:</strong> {prog.approach}
                    </span>
                  )}
                  {prog.highlight && (
                    <span>
                      <strong className="text-slate-700">Flagship Highlight:</strong> {prog.highlight}
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center md:flex-col gap-2 shrink-0 border-t md:border-t-0 md:border-l border-slate-100 pt-3 md:pt-0 md:pl-6 justify-end">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(prog)}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 hover:border-slate-400 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-colors flex items-center gap-1.5 w-full justify-center"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(prog.id, prog.name)}
                  className="px-3 py-1.5 rounded-xl border border-rose-200 hover:bg-rose-50 text-xs font-semibold text-rose-600 hover:text-rose-700 transition-colors flex items-center gap-1.5 w-full justify-center"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add/Edit Modal */}
      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProgram ? "Edit Academic Tier" : "Add Academic Tier"}
        description="Define curriculum specifications, target age levels, and pedagogical focus."
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Program Title *
              </label>
              <input
                type="text"
                required
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="e.g. Primary School"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Grades Covered *
              </label>
              <input
                type="text"
                required
                value={formGrades}
                onChange={(e) => setFormGrades(e.target.value)}
                placeholder="e.g. Grades 1 to 5"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Age Range
              </label>
              <input
                type="text"
                value={formAgeRange}
                onChange={(e) => setFormAgeRange(e.target.value)}
                placeholder="e.g. Ages 6 – 10"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Publish Status
              </label>
              <select
                value={formStatus}
                onChange={(e) => setFormStatus(e.target.value as "Active" | "Draft")}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
              >
                <option value="Active">Active (Published on Website)</option>
                <option value="Draft">Draft (Internal Review)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Tagline / Subheading
            </label>
            <input
              type="text"
              value={formTagline}
              onChange={(e) => setFormTagline(e.target.value)}
              placeholder="e.g. Building Inquiring Minds & Critical Foundations"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Program Description *
            </label>
            <textarea
              rows={3}
              required
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
              placeholder="Comprehensive summary of curriculum and learning outcomes..."
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Pedagogical Approach
            </label>
            <input
              type="text"
              value={formApproach}
              onChange={(e) => setFormApproach(e.target.value)}
              placeholder="e.g. Transdisciplinary units of inquiry & experiential team challenges"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Flagship Highlight
            </label>
            <input
              type="text"
              value={formHighlight}
              onChange={(e) => setFormHighlight(e.target.value)}
              placeholder="e.g. 100% placement across top global universities"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-sm transition-all"
            >
              {editingProgram ? "Save Changes" : "Create Program"}
            </button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
