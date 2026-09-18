"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Building2,
  Plus,
  Search,
  Edit3,
  Trash2,
  CheckCircle,
  Wrench,
  AlertTriangle,
} from "lucide-react";
import { AdminStorage, AdminFacilityItem } from "@/lib/adminStorage";
import { useAdminToast } from "@/components/admin/AdminToast";
import AdminModal from "@/components/admin/AdminModal";

const facilityPhotos = [
  { label: "Smart Classroom", path: "/images/campus/classroom.jpg" },
  { label: "Science Laboratories", path: "/images/campus/lab.jpg" },
  { label: "Robotics Hub", path: "/images/campus/robotics.jpg" },
  { label: "Library & Commons", path: "/images/campus/library.jpg" },
  { label: "Olympic Sports Ground", path: "/images/campus/sports.jpg" },
  { label: "Aquatics Complex", path: "/images/campus/aquatic.jpg" },
  { label: "Arts & Performing Studio", path: "/images/campus/arts.jpg" },
  { label: "AI Incubator", path: "/images/campus/innovation.jpg" },
];

export default function AdminFacilitiesPage() {
  const toast = useAdminToast();
  const [facilities, setFacilities] = useState<AdminFacilityItem[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AdminFacilityItem | null>(null);

  // Form
  const [formName, setFormName] = useState("");
  const [formCategory, setFormCategory] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formSpecs, setFormSpecs] = useState("");
  const [formFeatures, setFormFeatures] = useState("");
  const [formImage, setFormImage] = useState(facilityPhotos[0].path);
  const [formStatus, setFormStatus] = useState<"Operational" | "Maintenance" | "Renovating">("Operational");

  useEffect(() => {
    setFacilities(AdminStorage.getFacilities());
  }, []);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormName("");
    setFormCategory("Academic Environments");
    setFormDescription("");
    setFormSpecs("4,000 sq. ft. State-of-the-Art Complex");
    setFormFeatures("Ultra-wide displays, Ergonomic modular seats, Acoustic treatment");
    setFormImage(facilityPhotos[0].path);
    setFormStatus("Operational");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: AdminFacilityItem) => {
    setEditingItem(item);
    setFormName(item.name);
    setFormCategory(item.category);
    setFormDescription(item.description);
    setFormSpecs(item.specs);
    setFormFeatures(item.features.join(", "));
    setFormImage(item.image);
    setFormStatus(item.status);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formDescription.trim()) {
      toast.error("Please enter facility name and description.");
      return;
    }

    const featureArr = formFeatures
      .split(",")
      .map((f) => f.trim())
      .filter(Boolean);

    const updated = [...facilities];

    if (editingItem) {
      const idx = updated.findIndex((f) => f.id === editingItem.id);
      if (idx !== -1) {
        updated[idx] = {
          ...editingItem,
          name: formName,
          category: formCategory,
          description: formDescription,
          specs: formSpecs,
          features: featureArr.length > 0 ? featureArr : ["High-speed Connectivity"],
          image: formImage,
          status: formStatus,
        };
        toast.success(`Facility "${formName}" updated.`);
      }
    } else {
      const newFacility: AdminFacilityItem = {
        id: `fac-${Date.now()}`,
        name: formName,
        category: formCategory || "Campus Facilities",
        description: formDescription,
        specs: formSpecs || "Campus Infrastructure",
        features: featureArr.length > 0 ? featureArr : ["High-speed Connectivity"],
        image: formImage,
        status: formStatus,
      };
      updated.push(newFacility);
      toast.success(`Facility "${formName}" added.`);
    }

    setFacilities(updated);
    AdminStorage.saveFacilities(updated);
    setIsModalOpen(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Delete facility "${name}"?`)) {
      const updated = facilities.filter((f) => f.id !== id);
      setFacilities(updated);
      AdminStorage.saveFacilities(updated);
      toast.info(`Facility "${name}" removed.`);
    }
  };

  const toggleFacilityStatus = (id: string) => {
    const updated = facilities.map((f) => {
      if (f.id === id) {
        const next =
          f.status === "Operational"
            ? "Maintenance"
            : f.status === "Maintenance"
            ? "Renovating"
            : "Operational";
        toast.info(`Status for "${f.name}" set to ${next}.`);
        return { ...f, status: next as AdminFacilityItem["status"] };
      }
      return f;
    });
    setFacilities(updated);
    AdminStorage.saveFacilities(updated);
  };

  const filteredFacilities = facilities.filter((item) => {
    const matchSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.specs.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || item.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Campus Infrastructure & Facilities
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Architectural environments, specifications, operational readiness, and maintenance schedules
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-2 shadow-sm transition-all self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4 text-amber-400" />
          <span>Add Facility Asset</span>
        </button>
      </div>

      {/* Filters */}
      <div className="p-4 rounded-2xl bg-white border border-[#EAE3D7] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search facility name or specifications..."
            className="w-full pl-9 pr-3.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <span className="text-xs text-slate-400 font-medium">Status:</span>
          {(["All", "Operational", "Maintenance", "Renovating"] as const).map((st) => (
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

      {/* Facilities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFacilities.map((fac) => (
          <div
            key={fac.id}
            className="rounded-2xl bg-white border border-[#EAE3D7] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Photo */}
              <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                <Image
                  src={fac.image}
                  alt={fac.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-md text-[10px] font-bold text-amber-300 border border-white/10">
                    {fac.category}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="text-xs font-semibold text-white truncate drop-shadow-sm">
                    {fac.specs}
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleFacilityStatus(fac.id)}
                    title="Click to cycle status"
                    className={`text-[9px] font-bold px-2.5 py-0.5 rounded-full cursor-pointer transition-colors shadow-xs ${
                      fac.status === "Operational"
                        ? "bg-emerald-500 text-white"
                        : fac.status === "Maintenance"
                        ? "bg-amber-400 text-slate-950"
                        : "bg-rose-500 text-white"
                    }`}
                  >
                    {fac.status}
                  </button>
                </div>
              </div>

              {/* Details */}
              <div className="p-5 space-y-2.5">
                <h3 className="text-base font-bold text-slate-900 tracking-tight">{fac.name}</h3>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {fac.description}
                </p>

                {/* Features List */}
                <div className="pt-2">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Specifications & Equipment:
                  </p>
                  <ul className="space-y-1">
                    {fac.features.slice(0, 3).map((feat, idx) => (
                      <li
                        key={idx}
                        className="text-[11px] text-slate-600 flex items-center gap-1.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                        <span className="truncate">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="px-5 py-3.5 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-mono">ID: {fac.id}</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(fac)}
                  className="px-2.5 py-1 rounded-lg border border-slate-200 text-slate-700 hover:text-slate-950 hover:bg-white text-xs font-semibold transition-colors flex items-center gap-1"
                >
                  <Edit3 className="w-3 h-3" />
                  <span>Edit</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(fac.id, fac.name)}
                  className="px-2.5 py-1 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-semibold transition-colors flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? "Edit Facility Specification" : "Add Facility Specification"}
        description="Configure architectural areas, equipment inventory, and operational readiness."
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Facility Name *
              </label>
              <input
                type="text"
                required
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="e.g. Science Laboratories"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Category
              </label>
              <input
                type="text"
                required
                value={formCategory}
                onChange={(e) => setFormCategory(e.target.value)}
                placeholder="e.g. Research & Discovery"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Dimensions / Specs
              </label>
              <input
                type="text"
                value={formSpecs}
                onChange={(e) => setFormSpecs(e.target.value)}
                placeholder="e.g. 6 Specialized Labs | Biosafety Level 1+"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Readiness Status
              </label>
              <select
                value={formStatus}
                onChange={(e) =>
                  setFormStatus(e.target.value as "Operational" | "Maintenance" | "Renovating")
                }
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
              >
                <option value="Operational">Operational (Ready for Students)</option>
                <option value="Maintenance">Maintenance (Scheduled Servicing)</option>
                <option value="Renovating">Renovating (Closed for Upgrades)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Facility Photo Asset
            </label>
            <select
              value={formImage}
              onChange={(e) => setFormImage(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
            >
              {facilityPhotos.map((p) => (
                <option key={p.path} value={p.path}>
                  {p.label} ({p.path})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Description *
            </label>
            <textarea
              rows={3}
              required
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
              placeholder="Architectural features, safety standards, and student capacity..."
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Key Features (comma separated)
            </label>
            <input
              type="text"
              value={formFeatures}
              onChange={(e) => setFormFeatures(e.target.value)}
              placeholder="e.g. Fume extraction, Digital spectrophotometer, Clean room airlocks"
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
              {editingItem ? "Save Changes" : "Create Facility"}
            </button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
