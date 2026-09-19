"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Calendar,
  Clock,
  MapPin,
  Plus,
  Search,
  Edit3,
  Trash2,
  Users,
  CheckCircle,
} from "lucide-react";
import { AdminStorage, AdminEventItem } from "@/lib/adminStorage";
import { useAdminToast } from "@/components/admin/AdminToast";
import AdminModal from "@/components/admin/AdminModal";

const eventPhotos = [
  { label: "Athletics / Sports Day", path: "/images/campus/athletics.jpg" },
  { label: "Science Lab / Expo", path: "/images/campus/lab.jpg" },
  { label: "Cultural Fest / Annual Day", path: "/images/campus/cultural-fest.jpg" },
  { label: "Parent Teacher Meeting / Class", path: "/images/campus/classroom.jpg" },
  { label: "Model UN (MUN)", path: "/images/campus/mun.jpg" },
  { label: "Robotics League", path: "/images/campus/robotics-club.jpg" },
  { label: "Visual Arts Vernissage", path: "/images/campus/visual-arts.jpg" },
  { label: "Philharmonic Orchestra", path: "/images/campus/music.jpg" },
];

export default function AdminEventsPage() {
  const toast = useAdminToast();
  const [events, setEvents] = useState<AdminEventItem[]>([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<AdminEventItem | null>(null);

  // Form
  const [formTitle, setFormTitle] = useState("");
  const [formDate, setFormDate] = useState("");
  const [formTime, setFormTime] = useState("");
  const [formCategory, setFormCategory] = useState<AdminEventItem["category"]>("Academic");
  const [formLocation, setFormLocation] = useState("");
  const [formTargetGrades, setFormTargetGrades] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formImage, setFormImage] = useState(eventPhotos[0].path);
  const [formStatus, setFormStatus] = useState<"Published" | "Draft">("Published");

  useEffect(() => {
    setEvents(AdminStorage.getEvents());
  }, []);

  const handleOpenAdd = () => {
    setEditingEvent(null);
    setFormTitle("");
    setFormDate("28 Oct 2026");
    setFormTime("09:00 AM – 03:00 PM");
    setFormCategory("Academic");
    setFormLocation("Auditorium & Campus Commons");
    setFormTargetGrades("All Grades (1 to 12)");
    setFormDescription("");
    setFormImage(eventPhotos[0].path);
    setFormStatus("Published");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (evt: AdminEventItem) => {
    setEditingEvent(evt);
    setFormTitle(evt.title);
    setFormDate(evt.date);
    setFormTime(evt.time || "");
    setFormCategory(evt.category);
    setFormLocation(evt.location);
    setFormTargetGrades(evt.targetGrades);
    setFormDescription(evt.description);
    setFormImage(evt.image);
    setFormStatus(evt.status);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formDate.trim() || !formLocation.trim()) {
      toast.error("Please fill in event title, date, and venue location.");
      return;
    }

    const updated = [...events];
    if (editingEvent) {
      const idx = updated.findIndex((e) => e.id === editingEvent.id);
      if (idx !== -1) {
        updated[idx] = {
          ...editingEvent,
          title: formTitle,
          date: formDate,
          time: formTime,
          category: formCategory,
          location: formLocation,
          targetGrades: formTargetGrades,
          description: formDescription,
          image: formImage,
          status: formStatus,
        };
        toast.success(`Event "${formTitle}" updated.`);
      }
    } else {
      const newEvt: AdminEventItem = {
        id: `evt-${Date.now()}`,
        title: formTitle,
        date: formDate,
        time: formTime,
        category: formCategory,
        location: formLocation,
        targetGrades: formTargetGrades || "All Grades",
        description: formDescription,
        image: formImage,
        status: formStatus,
      };
      updated.push(newEvt);
      toast.success(`New event "${formTitle}" published.`);
    }

    setEvents(updated);
    AdminStorage.saveEvents(updated);
    setIsModalOpen(false);
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Delete calendar event "${title}"?`)) {
      const updated = events.filter((e) => e.id !== id);
      setEvents(updated);
      AdminStorage.saveEvents(updated);
      toast.info(`Event "${title}" removed from calendar.`);
    }
  };

  const toggleStatus = (id: string) => {
    const updated = events.map((e) => {
      if (e.id === id) {
        const next = e.status === "Published" ? "Draft" : "Published";
        toast.info(`Event "${e.title}" set to ${next}.`);
        return { ...e, status: next as "Published" | "Draft" };
      }
      return e;
    });
    setEvents(updated);
    AdminStorage.saveEvents(updated);
  };

  const categories = [
    "All",
    "Academic",
    "Sports",
    "Cultural",
    "Parent Meeting",
    "Leadership",
    "Technology",
  ];

  const filteredEvents = events.filter((e) => {
    const matchSearch =
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.location.toLowerCase().includes(search.toLowerCase()) ||
      e.description.toLowerCase().includes(search.toLowerCase());
    const matchCat = categoryFilter === "All" || e.category === categoryFilter;
    return matchSearch && matchCat;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Academic Calendar & Events
          </h2>
          <p className="text-sm text-slate-700 mt-1">
            Schedule inter-school tournaments, parent-teacher conferences, annual days, and science exhibitions
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="min-h-[44px] h-[44px] px-5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold flex items-center gap-2 shadow-xs transition-all self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4 text-amber-400" />
          <span>Publish New Event</span>
        </button>
      </div>

      {/* Filters */}
      <div className="p-4 rounded-2xl bg-white border border-[#EAE3D7] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-[360px]">
          <Search className="w-5 h-5 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search events, venue, or keywords..."
            className="w-full min-h-[46px] h-[46px] pl-11 pr-4 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all shadow-xs"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategoryFilter(cat)}
              className={`h-[38px] px-4 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
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

      {/* Events List */}
      <div className="space-y-4">
        {filteredEvents.map((evt) => (
          <div
            key={evt.id}
            className="p-5 sm:p-6 rounded-2xl bg-white border border-[#EAE3D7] hover:border-slate-300 shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          >
            {/* Left Photo & Info */}
            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 flex-1 min-w-0">
              {/* Photo Thumbnail */}
              <div className="relative w-full sm:w-36 h-28 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                <Image
                  src={evt.image}
                  alt={evt.title}
                  fill
                  className="object-cover"
                />
                <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-md bg-slate-900/80 backdrop-blur-xs text-[10px] font-bold text-amber-300 border border-white/10">
                  {evt.category}
                </span>
              </div>

              {/* Event Text */}
              <div className="space-y-1.5 min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-slate-900 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-amber-600" />
                    {evt.date}
                  </span>
                  {evt.time && (
                    <>
                      <span className="text-slate-300">&bull;</span>
                      <span className="text-xs text-slate-700 font-medium flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-500" />
                        {evt.time}
                      </span>
                    </>
                  )}
                  <button
                    type="button"
                    onClick={() => toggleStatus(evt.id)}
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full cursor-pointer ml-auto sm:ml-2 shadow-xs ${
                      evt.status === "Published"
                        ? "bg-emerald-50 text-emerald-800"
                        : "bg-amber-100 text-amber-900"
                    }`}
                  >
                    {evt.status}
                  </button>
                </div>

                <h3 className="text-base font-bold text-slate-900 tracking-tight">{evt.title}</h3>
                <p className="text-sm text-slate-700 leading-relaxed line-clamp-2">
                  {evt.description}
                </p>

                <div className="pt-1 flex flex-wrap gap-4 text-xs text-slate-700 font-medium">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    {evt.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-slate-500" />
                    {evt.targetGrades}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Action buttons */}
            <div className="flex sm:flex-col items-center gap-2 shrink-0 border-t sm:border-t-0 sm:border-l border-slate-100 pt-3 sm:pt-0 sm:pl-6 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={() => handleOpenEdit(evt)}
                className="min-h-[36px] sm:min-h-[38px] h-[36px] sm:h-[38px] px-3.5 sm:px-4 rounded-xl border border-slate-200 text-slate-800 hover:text-slate-950 hover:bg-slate-50 text-xs sm:text-sm font-semibold flex items-center gap-1.5 w-full justify-center cursor-pointer shadow-xs transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
              <button
                type="button"
                onClick={() => handleDelete(evt.id, evt.title)}
                className="min-h-[36px] sm:min-h-[38px] h-[36px] sm:h-[38px] px-3.5 sm:px-4 rounded-xl border border-rose-200 text-rose-700 hover:bg-rose-50 text-xs sm:text-sm font-semibold flex items-center gap-1.5 w-full justify-center cursor-pointer shadow-xs transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingEvent ? "Edit Calendar Event" : "Publish Calendar Event"}
        description="Schedule school milestones, inter-school tournaments, and community gatherings."
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Event Title *
            </label>
            <input
              type="text"
              required
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              placeholder="e.g. Annual Athletics Meet & Sports Day"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Date (e.g. 25 Sep 2026) *
              </label>
              <input
                type="text"
                required
                value={formDate}
                onChange={(e) => setFormDate(e.target.value)}
                placeholder="e.g. 25 Sep 2026"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Time Window
              </label>
              <input
                type="text"
                value={formTime}
                onChange={(e) => setFormTime(e.target.value)}
                placeholder="e.g. 08:30 AM – 03:30 PM"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Category
              </label>
              <select
                value={formCategory}
                onChange={(e) =>
                  setFormCategory(e.target.value as AdminEventItem["category"])
                }
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
              >
                <option value="Academic">Academic</option>
                <option value="Sports">Sports</option>
                <option value="Cultural">Cultural</option>
                <option value="Parent Meeting">Parent Meeting</option>
                <option value="Leadership">Leadership</option>
                <option value="Technology">Technology</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Publish Status
              </label>
              <select
                value={formStatus}
                onChange={(e) => setFormStatus(e.target.value as "Published" | "Draft")}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
              >
                <option value="Published">Published (Public)</option>
                <option value="Draft">Draft (Internal)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Location / Venue *
              </label>
              <input
                type="text"
                required
                value={formLocation}
                onChange={(e) => setFormLocation(e.target.value)}
                placeholder="e.g. Olympic Sports Ground & Pavilion"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Target Grades
              </label>
              <input
                type="text"
                value={formTargetGrades}
                onChange={(e) => setFormTargetGrades(e.target.value)}
                placeholder="e.g. Grades 6 to 12"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Event Banner Image
            </label>
            <select
              value={formImage}
              onChange={(e) => setFormImage(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
            >
              {eventPhotos.map((p) => (
                <option key={p.path} value={p.path}>
                  {p.label} ({p.path})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Event Description
            </label>
            <textarea
              rows={3}
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
              placeholder="Outline schedules, participating houses, invited dignitaries, and guidelines..."
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
              {editingEvent ? "Save Changes" : "Create Event"}
            </button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
