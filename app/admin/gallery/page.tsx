"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Image as ImageIcon,
  Plus,
  Search,
  Trash2,
  Filter,
  Eye,
  Calendar,
} from "lucide-react";
import { AdminStorage, AdminGalleryItem } from "@/lib/adminStorage";
import { useAdminToast } from "@/components/admin/AdminToast";
import AdminModal from "@/components/admin/AdminModal";

const libraryPhotos = [
  { label: "Championship Athletics", path: "/images/campus/athletics.jpg" },
  { label: "Philharmonic Music", path: "/images/campus/music.jpg" },
  { label: "Visual Arts Studio", path: "/images/campus/visual-arts.jpg" },
  { label: "Robotics Testing", path: "/images/campus/robotics-club.jpg" },
  { label: "Model UN Delegation", path: "/images/campus/mun.jpg" },
  { label: "Nature Field Trip", path: "/images/campus/field-trips.jpg" },
  { label: "Cultural Fest", path: "/images/campus/cultural-fest.jpg" },
  { label: "Social Impact Lab", path: "/images/campus/social-impact.jpg" },
  { label: "Smart Classroom", path: "/images/campus/classroom.jpg" },
  { label: "Biotechnology Lab", path: "/images/campus/lab.jpg" },
  { label: "Library Sanctuary", path: "/images/campus/library.jpg" },
  { label: "Aquatic Complex", path: "/images/campus/aquatic.jpg" },
  { label: "Olympic Sports Ground", path: "/images/campus/sports.jpg" },
  { label: "Innovation Loft", path: "/images/campus/innovation.jpg" },
];

export default function AdminGalleryPage() {
  const toast = useAdminToast();
  const [gallery, setGallery] = useState<AdminGalleryItem[]>([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const [formCategory, setFormCategory] = useState<AdminGalleryItem["category"]>("Campus");
  const [formImage, setFormImage] = useState(libraryPhotos[0].path);
  const [formCaption, setFormCaption] = useState("");

  useEffect(() => {
    setGallery(AdminStorage.getGallery());
  }, []);

  const handleOpenAdd = () => {
    setFormTitle("");
    setFormCategory("Campus");
    setFormImage(libraryPhotos[0].path);
    setFormCaption("");
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      toast.error("Please enter a media title.");
      return;
    }

    const newItem: AdminGalleryItem = {
      id: `gal-${Date.now()}`,
      title: formTitle,
      category: formCategory,
      image: formImage,
      caption: formCaption,
      uploadDate: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    };

    const updated = [newItem, ...gallery];
    setGallery(updated);
    AdminStorage.saveGallery(updated);
    toast.success(`Photo "${formTitle}" added to campus gallery.`);
    setIsModalOpen(false);
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Delete photo "${title}" from campus gallery?`)) {
      const updated = gallery.filter((g) => g.id !== id);
      setGallery(updated);
      AdminStorage.saveGallery(updated);
      toast.info(`Photo "${title}" removed.`);
    }
  };

  const categories = ["All", "Campus", "Academics", "Sports", "Events", "Student Life"];

  const filteredGallery = gallery.filter((g) => {
    const matchSearch =
      g.title.toLowerCase().includes(search.toLowerCase()) ||
      g.caption.toLowerCase().includes(search.toLowerCase());
    const matchCat = categoryFilter === "All" || g.category === categoryFilter;
    return matchSearch && matchCat;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Campus Media Gallery</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Curate verified photography assets for admissions brochures, website storytelling, and student life highlights
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-2 shadow-sm transition-all self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4 text-amber-400" />
          <span>Upload Media Asset</span>
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
            placeholder="Search gallery captions or titles..."
            className="w-full pl-9 pr-3.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                categoryFilter === cat
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredGallery.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl bg-white border border-[#EAE3D7] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Photo */}
              <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
                <div className="absolute top-2.5 left-2.5">
                  <span className="px-2 py-0.5 rounded-md bg-slate-900/80 backdrop-blur-xs text-[10px] font-bold text-amber-300">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Title & Caption */}
              <div className="p-4 space-y-1.5">
                <h4 className="text-xs font-bold text-slate-900 truncate">{item.title}</h4>
                <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                  {item.caption || "High-resolution campus archive photograph."}
                </p>
              </div>
            </div>

            {/* Bottom Meta & Delete */}
            <div className="px-4 py-2.5 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-[10px] text-slate-400">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {item.uploadDate}
              </span>
              <button
                type="button"
                onClick={() => handleDelete(item.id, item.title)}
                className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                title="Delete from gallery"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Media Modal */}
      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Upload Media to Campus Gallery"
        description="Select verified campus photo assets, add descriptive captions, and assign categories."
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Photograph Title *
            </label>
            <input
              type="text"
              required
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              placeholder="e.g. Symphony Orchestra Rehearsal"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Category
            </label>
            <select
              value={formCategory}
              onChange={(e) =>
                setFormCategory(e.target.value as AdminGalleryItem["category"])
              }
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
            >
              <option value="Campus">Campus & Architecture</option>
              <option value="Academics">Academics & Labs</option>
              <option value="Sports">Sports & Fitness</option>
              <option value="Events">Annual Events</option>
              <option value="Student Life">Student Life</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Select Campus Photo Asset
            </label>
            <select
              value={formImage}
              onChange={(e) => setFormImage(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
            >
              {libraryPhotos.map((p) => (
                <option key={p.path} value={p.path}>
                  {p.label} ({p.path})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Caption / Editorial Note
            </label>
            <textarea
              rows={3}
              value={formCaption}
              onChange={(e) => setFormCaption(e.target.value)}
              placeholder="Contextual description of the activity or facility showcased..."
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
              Add to Gallery
            </button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
