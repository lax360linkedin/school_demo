"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Layers,
  Edit3,
  ExternalLink,
  CheckCircle,
  Clock,
  Sparkles,
  Eye,
} from "lucide-react";
import { AdminStorage, AdminContentSection } from "@/lib/adminStorage";
import { useAdminToast } from "@/components/admin/AdminToast";
import AdminModal from "@/components/admin/AdminModal";

export default function AdminContentPage() {
  const toast = useAdminToast();
  const [sections, setSections] = useState<AdminContentSection[]>([]);
  const [editingSection, setEditingSection] = useState<AdminContentSection | null>(null);

  // Form states
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [badge, setBadge] = useState("");
  const [status, setStatus] = useState<"Published" | "Review Required">("Published");

  useEffect(() => {
    setSections(AdminStorage.getContentSections());
  }, []);

  const handleOpenEdit = (sec: AdminContentSection) => {
    setEditingSection(sec);
    setTitle(sec.title);
    setSubtitle(sec.subtitle);
    setDescription(sec.description);
    setBadge(sec.badge);
    setStatus(sec.status);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSection) return;

    const updated = sections.map((s) => {
      if (s.id === editingSection.id) {
        return {
          ...s,
          title,
          subtitle,
          description,
          badge,
          status,
          lastUpdated: new Date().toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
        };
      }
      return s;
    });

    setSections(updated);
    AdminStorage.saveContentSections(updated);
    toast.success(`Section "${title}" updated successfully.`);
    setEditingSection(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Landing Page Content Architecture
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Audit headline copy, narrative badges, scrollytelling stages, and editorial metadata across the public website
          </p>
        </div>

        <Link
          href="/"
          target="_blank"
          rel="noreferrer"
          className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-colors flex items-center gap-1.5 shadow-xs self-start sm:self-auto"
        >
          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          <span>Preview Live Site</span>
        </Link>
      </div>

      {/* Sections List Cards */}
      <div className="space-y-4">
        {sections.map((sec, idx) => (
          <div
            key={sec.id}
            className="p-6 rounded-2xl bg-white border border-[#EAE3D7] hover:border-slate-300 shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row md:items-start justify-between gap-6"
          >
            <div className="space-y-2 flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-slate-900 text-amber-400 text-xs font-bold flex items-center justify-center font-mono">
                  {idx + 1}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 text-[11px] font-bold border border-amber-200/50">
                  {sec.badge}
                </span>
                <span className="text-[11px] font-mono text-slate-400">Section: #{sec.id}</span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    sec.status === "Published"
                      ? "bg-emerald-50 text-emerald-800"
                      : "bg-rose-50 text-rose-800"
                  }`}
                >
                  {sec.status}
                </span>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                  {sec.title}
                </h3>
                <p className="text-xs font-semibold text-amber-800 mt-0.5">{sec.subtitle}</p>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
                {sec.description}
              </p>

              <div className="pt-2 flex items-center gap-2 text-[11px] text-slate-400">
                <Clock className="w-3.5 h-3.5" />
                <span>Last Updated: {sec.lastUpdated}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center md:flex-col gap-2 shrink-0 border-t md:border-t-0 md:border-l border-slate-100 pt-3 md:pt-0 md:pl-6 justify-end">
              <button
                type="button"
                onClick={() => handleOpenEdit(sec)}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1.5 w-full justify-center transition-colors shadow-xs"
              >
                <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                <span>Edit Copy</span>
              </button>
              <Link
                href={`/#${sec.id}`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50 text-xs font-semibold flex items-center gap-1.5 w-full justify-center transition-colors"
              >
                <Eye className="w-3.5 h-3.5 text-slate-400" />
                <span>Jump To</span>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Section Modal */}
      <AdminModal
        isOpen={Boolean(editingSection)}
        onClose={() => setEditingSection(null)}
        title={editingSection ? `Edit Section: ${editingSection.title}` : "Edit Section"}
        description="Update narrative headlines, subheadings, and section badges."
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Section Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Subtitle / Hook
            </label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Badge / Pillar
              </label>
              <input
                type="text"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Section Status
              </label>
              <select
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value as "Published" | "Review Required")
                }
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
              >
                <option value="Published">Published</option>
                <option value="Review Required">Review Required</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Description / Editorial Purpose
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setEditingSection(null)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-sm transition-all"
            >
              Save Changes
            </button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
