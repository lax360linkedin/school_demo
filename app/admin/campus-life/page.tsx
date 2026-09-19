"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Compass,
  Plus,
  Search,
  Edit3,
  Trash2,
  Tag,
  CheckCircle,
  Eye,
} from "lucide-react";
import { AdminStorage, AdminCampusActivityItem } from "@/lib/adminStorage";
import { useAdminToast } from "@/components/admin/AdminToast";
import AdminModal from "@/components/admin/AdminModal";

const availableImages = [
  { label: "Athletics / Sports", path: "/images/campus/athletics.jpg" },
  { label: "Orchestra / Music", path: "/images/campus/music.jpg" },
  { label: "Visual Arts / Studio", path: "/images/campus/visual-arts.jpg" },
  { label: "Robotics & AI Guild", path: "/images/campus/robotics-club.jpg" },
  { label: "Model UN & Leadership", path: "/images/campus/mun.jpg" },
  { label: "Field Trips & Outdoors", path: "/images/campus/field-trips.jpg" },
  { label: "Cultural Fest & Biennale", path: "/images/campus/cultural-fest.jpg" },
  { label: "Social Impact & Labs", path: "/images/campus/social-impact.jpg" },
  { label: "Smart Classroom", path: "/images/campus/classroom.jpg" },
  { label: "Science Lab", path: "/images/campus/lab.jpg" },
  { label: "Library Commons", path: "/images/campus/library.jpg" },
  { label: "Aquatic Center", path: "/images/campus/aquatic.jpg" },
];

export default function AdminCampusLifePage() {
  const toast = useAdminToast();
  const [activities, setActivities] = useState<AdminCampusActivityItem[]>([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AdminCampusActivityItem | null>(null);

  // Form
  const [formTitle, setFormTitle] = useState("");
  const [formCategory, setFormCategory] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formBadge, setFormBadge] = useState("");
  const [formTags, setFormTags] = useState("");
  const [formImage, setFormImage] = useState(availableImages[0].path);
  const [formStatus, setFormStatus] = useState<"Active" | "Draft">("Active");

  useEffect(() => {
    setActivities(AdminStorage.getCampusActivities());
  }, []);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormTitle("");
    setFormCategory("Sports & Athletics");
    setFormDescription("");
    setFormBadge("New Initiative");
    setFormTags("Athletics, Leadership, Teamwork");
    setFormImage(availableImages[0].path);
    setFormStatus("Active");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: AdminCampusActivityItem) => {
    setEditingItem(item);
    setFormTitle(item.title);
    setFormCategory(item.category);
    setFormDescription(item.description);
    setFormBadge(item.badge);
    setFormTags(item.tags.join(", "));
    setFormImage(item.image);
    setFormStatus(item.status);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formDescription.trim()) {
      toast.error("Please fill in activity title and description.");
      return;
    }

    const tagArray = formTags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const updatedList = [...activities];

    if (editingItem) {
      const idx = updatedList.findIndex((a) => a.id === editingItem.id);
      if (idx !== -1) {
        updatedList[idx] = {
          ...editingItem,
          title: formTitle,
          category: formCategory,
          description: formDescription,
          badge: formBadge,
          tags: tagArray.length > 0 ? tagArray : ["Campus Life"],
          image: formImage,
          status: formStatus,
        };
        toast.success(`Activity "${formTitle}" updated.`);
      }
    } else {
      const newItem: AdminCampusActivityItem = {
        id: `act-${Date.now()}`,
        title: formTitle,
        category: formCategory || "Co-Curricular",
        description: formDescription,
        badge: formBadge || "Active",
        tags: tagArray.length > 0 ? tagArray : ["Campus Life"],
        image: formImage,
        status: formStatus,
      };
      updatedList.push(newItem);
      toast.success(`New activity "${formTitle}" added.`);
    }

    setActivities(updatedList);
    AdminStorage.saveCampusActivities(updatedList);
    setIsModalOpen(false);
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to remove "${title}"?`)) {
      const updatedList = activities.filter((a) => a.id !== id);
      setActivities(updatedList);
      AdminStorage.saveCampusActivities(updatedList);
      toast.info(`Activity "${title}" deleted.`);
    }
  };

  const categories = ["All", ...Array.from(new Set(activities.map((a) => a.category)))];

  const filteredActivities = activities.filter((item) => {
    const matchSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchCat = categoryFilter === "All" || item.category === categoryFilter;
    return matchSearch && matchCat;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Vibrant Campus Life & Co-Curriculars
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 font-medium mt-1">
            Houses, clubs, competitive athletics, societies, pastoral care, and co-curricular programs
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="min-h-[44px] h-[44px] px-5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold flex items-center gap-2 shadow-sm transition-all self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4 text-amber-400" />
          <span>Add Campus Activity</span>
        </button>
      </div>

      {/* Filters */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#EAE3D7] shadow-xs flex flex-col xl:flex-row xl:items-center justify-between gap-4 lg:gap-6">
        <div className="relative w-full sm:w-[300px] shrink-0">
          <Search className="w-5 h-5 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search activities or tags..."
            className="w-full min-h-[46px] h-[46px] pl-11 pr-4 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all shadow-xs"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 flex-1 xl:justify-end">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700 mr-1 shrink-0">
            Category:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategoryFilter(cat)}
              className={`h-[38px] px-3.5 sm:px-4 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                categoryFilter === cat
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-950"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Activity Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredActivities.map((act) => (
          <div
            key={act.id}
            className="rounded-2xl bg-white border border-[#EAE3D7] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Image Preview Container */}
              <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                <Image
                  src={act.image}
                  alt={act.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-md text-[10px] font-bold text-amber-300 border border-white/10">
                    {act.category}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="text-xs font-semibold text-white truncate drop-shadow-sm">
                    {act.badge}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      act.status === "Active"
                        ? "bg-emerald-500 text-white"
                        : "bg-amber-400 text-slate-950"
                    }`}
                  >
                    {act.status}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 space-y-2.5">
                <h3 className="text-base font-bold text-slate-900 tracking-tight">{act.title}</h3>
                <p className="text-sm text-slate-700 leading-relaxed line-clamp-3">
                  {act.description}
                </p>

                {/* Tag Pills */}
                <div className="pt-2 flex flex-wrap gap-1.5">
                  {act.tags.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 text-[11px] font-semibold border border-slate-200/60"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="px-5 py-3.5 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <span className="text-xs text-slate-600 font-mono font-bold">ID: {act.id}</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(act)}
                  className="min-h-[36px] h-[36px] px-3.5 rounded-xl border border-slate-200 text-slate-800 hover:text-slate-950 hover:bg-white text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(act.id, act.title)}
                  className="min-h-[36px] h-[36px] px-3.5 rounded-xl border border-rose-200 text-rose-700 hover:bg-rose-50 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
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
        title={editingItem ? "Edit Campus Activity" : "Add Campus Activity"}
        description="Configure student life programs, visual photo assets, badges, and search tags."
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Activity Title *
              </label>
              <input
                type="text"
                required
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                placeholder="e.g. Championship Athletics"
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
                placeholder="e.g. Sports & Athletics"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Badge / Milestone
              </label>
              <input
                type="text"
                value={formBadge}
                onChange={(e) => setFormBadge(e.target.value)}
                placeholder="e.g. 16 Varsity Teams"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Status
              </label>
              <select
                value={formStatus}
                onChange={(e) => setFormStatus(e.target.value as "Active" | "Draft")}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
              >
                <option value="Active">Active (Visible on Website)</option>
                <option value="Draft">Draft (Hidden)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Campus Photo Asset
            </label>
            <select
              value={formImage}
              onChange={(e) => setFormImage(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
            >
              {availableImages.map((img) => (
                <option key={img.path} value={img.path}>
                  {img.label} ({img.path})
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
              placeholder="Detailed description of training, coaching, and student participation..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Tags (comma separated)
            </label>
            <input
              type="text"
              value={formTags}
              onChange={(e) => setFormTags(e.target.value)}
              placeholder="e.g. Football, Swimming, Basketball, Track & Field"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="min-h-[40px] h-[40px] px-4 rounded-xl text-sm font-semibold text-slate-700 hover:text-slate-950 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="min-h-[44px] h-[44px] px-5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold shadow-xs transition-all cursor-pointer"
            >
              {editingItem ? "Save Changes" : "Create Activity"}
            </button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
