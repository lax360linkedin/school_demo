"use client";

import React, { useState, useEffect } from "react";
import {
  Users,
  Shield,
  Trophy,
  Plus,
  Search,
  Edit3,
  Trash2,
  CheckCircle,
  Calendar,
  Sparkles,
} from "lucide-react";
import { AdminStorage, AdminClubItem, AdminHouseItem } from "@/lib/adminStorage";
import { useAdminToast } from "@/components/admin/AdminToast";
import AdminModal from "@/components/admin/AdminModal";

export default function AdminStudentLifePage() {
  const toast = useAdminToast();
  const [clubs, setClubs] = useState<AdminClubItem[]>([]);
  const [houses, setHouses] = useState<AdminHouseItem[]>([]);
  const [activeTab, setActiveTab] = useState<"clubs" | "houses">("clubs");
  const [search, setSearch] = useState("");

  // Modal for Club
  const [isClubModalOpen, setIsClubModalOpen] = useState(false);
  const [editingClub, setEditingClub] = useState<AdminClubItem | null>(null);

  // Form for Club
  const [clubName, setClubName] = useState("");
  const [clubCategory, setClubCategory] = useState<AdminClubItem["category"]>("Academic");
  const [clubPatron, setClubPatron] = useState("");
  const [clubMembers, setClubMembers] = useState(25);
  const [clubMeetingDay, setClubMeetingDay] = useState("");
  const [clubDescription, setClubDescription] = useState("");

  useEffect(() => {
    setClubs(AdminStorage.getClubs());
    setHouses(AdminStorage.getHouses());
  }, []);

  const handleOpenAddClub = () => {
    setEditingClub(null);
    setClubName("");
    setClubCategory("Academic");
    setClubPatron("");
    setClubMembers(30);
    setClubMeetingDay("Wednesdays (3:45 PM)");
    setClubDescription("");
    setIsClubModalOpen(true);
  };

  const handleOpenEditClub = (club: AdminClubItem) => {
    setEditingClub(club);
    setClubName(club.name);
    setClubCategory(club.category);
    setClubPatron(club.patron);
    setClubMembers(club.members);
    setClubMeetingDay(club.meetingDay);
    setClubDescription(club.description);
    setIsClubModalOpen(true);
  };

  const handleSaveClub = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clubName.trim() || !clubPatron.trim()) {
      toast.error("Please provide club name and faculty patron.");
      return;
    }

    const updated = [...clubs];
    if (editingClub) {
      const idx = updated.findIndex((c) => c.id === editingClub.id);
      if (idx !== -1) {
        updated[idx] = {
          ...editingClub,
          name: clubName,
          category: clubCategory,
          patron: clubPatron,
          members: Number(clubMembers),
          meetingDay: clubMeetingDay,
          description: clubDescription,
        };
        toast.success(`Club "${clubName}" updated.`);
      }
    } else {
      const newClub: AdminClubItem = {
        id: `club-${Date.now()}`,
        name: clubName,
        category: clubCategory,
        patron: clubPatron,
        members: Number(clubMembers),
        meetingDay: clubMeetingDay,
        description: clubDescription,
        status: "Active",
      };
      updated.push(newClub);
      toast.success(`New club "${clubName}" created.`);
    }

    setClubs(updated);
    AdminStorage.saveClubs(updated);
    setIsClubModalOpen(false);
  };

  const handleDeleteClub = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to remove club "${name}"?`)) {
      const updated = clubs.filter((c) => c.id !== id);
      setClubs(updated);
      AdminStorage.saveClubs(updated);
      toast.info(`Club "${name}" removed.`);
    }
  };

  const adjustHousePoints = (id: string, delta: number) => {
    const updated = houses.map((h) => {
      if (h.id === id) {
        const newPts = Math.max(0, h.points + delta);
        toast.success(`${h.name} points updated (${delta > 0 ? "+" : ""}${delta} pts).`);
        return { ...h, points: newPts };
      }
      return h;
    });
    setHouses(updated);
    AdminStorage.saveHouses(updated);
  };

  const filteredClubs = clubs.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.patron.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Student Life & House System
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage student-led societies, faculty patrons, and the Inter-House Championship Points Table
          </p>
        </div>

        {activeTab === "clubs" && (
          <button
            type="button"
            onClick={handleOpenAddClub}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-2 shadow-sm transition-all self-start sm:self-auto cursor-pointer"
          >
            <Plus className="w-4 h-4 text-amber-400" />
            <span>Charter New Club</span>
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-3 border-b border-slate-200">
        <button
          type="button"
          onClick={() => setActiveTab("clubs")}
          className={`pb-3 text-xs font-bold transition-all relative ${
            activeTab === "clubs"
              ? "text-slate-900 border-b-2 border-slate-900"
              : "text-slate-400 hover:text-slate-600"
          }`}
        >
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>Student Societies & Clubs ({clubs.length})</span>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("houses")}
          className={`pb-3 text-xs font-bold transition-all relative ${
            activeTab === "houses"
              ? "text-slate-900 border-b-2 border-slate-900"
              : "text-slate-400 hover:text-slate-600"
          }`}
        >
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-600" />
            <span>House Championship Shield ({houses.length} Houses)</span>
          </div>
        </button>
      </div>

      {/* TAB 1: CLUBS */}
      {activeTab === "clubs" && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-white border border-[#EAE3D7] shadow-xs flex items-center">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search clubs or faculty patrons..."
                className="w-full pl-9 pr-3.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClubs.map((club) => (
              <div
                key={club.id}
                className="p-6 rounded-2xl bg-white border border-[#EAE3D7] hover:border-slate-300 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 text-[10px] font-bold">
                      {club.category}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500">
                      {club.members} Members
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 tracking-tight">
                      {club.name}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed line-clamp-2">
                      {club.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 space-y-1 text-xs text-slate-500">
                    <p>
                      <strong className="text-slate-700">Faculty Patron:</strong> {club.patron}
                    </p>
                    <p>
                      <strong className="text-slate-700">Meets:</strong> {club.meetingDay}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => handleOpenEditClub(club)}
                    className="px-2.5 py-1 rounded-lg border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50 text-xs font-semibold flex items-center gap-1"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>Edit</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteClub(club.id, club.name)}
                    className="px-2.5 py-1 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-semibold flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: HOUSES */}
      {activeTab === "houses" && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/70 text-xs text-amber-950 flex items-center justify-between">
            <div>
              <p className="font-bold text-sm">Annual Inter-House Rolling Shield 2026</p>
              <p className="mt-0.5 text-amber-800 text-[11px]">
                Points are awarded for scholastic distinctions, athletics meet medals, debate tournaments, and community stewardship.
              </p>
            </div>
            <span className="px-3 py-1 bg-amber-200/80 rounded-full font-bold text-xs shrink-0">
              Live Standings
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {houses.map((h, rank) => (
              <div
                key={h.id}
                className="p-6 rounded-2xl bg-white border border-[#EAE3D7] shadow-xs flex flex-col justify-between relative overflow-hidden"
              >
                <div
                  className="absolute top-0 left-0 right-0 h-2"
                  style={{ backgroundColor: h.color }}
                />

                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      House #{rank + 1}
                    </span>
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: h.color }}
                    />
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{h.name}</h3>
                    <p className="text-[11px] italic text-slate-500 mt-0.5">&ldquo;{h.motto}&rdquo;</p>
                  </div>

                  {/* Points Big Display */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-center my-3">
                    <span className="text-3xl font-black text-slate-900 font-mono tracking-tight">
                      {h.points}
                    </span>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-0.5">
                      Championship Points
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-600">
                    <p className="flex justify-between">
                      <span className="text-slate-400">Captain:</span>
                      <strong className="text-slate-800">{h.captain}</strong>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-slate-400">Vice-Captain:</span>
                      <span className="text-slate-700">{h.viceCaptain}</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-slate-400">House Mentor:</span>
                      <span className="text-slate-700">{h.mentor}</span>
                    </p>
                  </div>
                </div>

                {/* Point Controls */}
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase text-slate-400">Adjust:</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => adjustHousePoints(h.id, -25)}
                      className="px-2 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-mono font-bold"
                    >
                      -25
                    </button>
                    <button
                      type="button"
                      onClick={() => adjustHousePoints(h.id, 25)}
                      className="px-2 py-1 rounded-md bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-mono font-bold"
                    >
                      +25
                    </button>
                    <button
                      type="button"
                      onClick={() => adjustHousePoints(h.id, 50)}
                      className="px-2 py-1 rounded-md bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono font-bold"
                    >
                      +50
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add/Edit Club Modal */}
      <AdminModal
        isOpen={isClubModalOpen}
        onClose={() => setIsClubModalOpen(false)}
        title={editingClub ? "Edit Student Club" : "Charter New Student Club"}
        description="Configure student club specifications, meeting schedules, and faculty sponsorship."
      >
        <form onSubmit={handleSaveClub} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Club / Society Name *
            </label>
            <input
              type="text"
              required
              value={clubName}
              onChange={(e) => setClubName(e.target.value)}
              placeholder="e.g. Debating & Public Speaking Society"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Category
              </label>
              <select
                value={clubCategory}
                onChange={(e) =>
                  setClubCategory(e.target.value as AdminClubItem["category"])
                }
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
              >
                <option value="Academic">Academic</option>
                <option value="STEM">STEM & Technology</option>
                <option value="Sports">Sports & Games</option>
                <option value="Arts & Culture">Arts & Culture</option>
                <option value="Leadership">Leadership & Community</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Enrolled Members
              </label>
              <input
                type="number"
                min={5}
                max={200}
                value={clubMembers}
                onChange={(e) => setClubMembers(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Faculty Patron *
              </label>
              <input
                type="text"
                required
                value={clubPatron}
                onChange={(e) => setClubPatron(e.target.value)}
                placeholder="e.g. Dr. Ananya Sharma"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Weekly Meeting Day & Time
              </label>
              <input
                type="text"
                value={clubMeetingDay}
                onChange={(e) => setClubMeetingDay(e.target.value)}
                placeholder="e.g. Tuesdays & Thursdays (3:30 PM)"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Description & Objectives
            </label>
            <textarea
              rows={3}
              value={clubDescription}
              onChange={(e) => setClubDescription(e.target.value)}
              placeholder="What students practice, upcoming competitions, or projects..."
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsClubModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-sm transition-all"
            >
              {editingClub ? "Save Changes" : "Create Club"}
            </button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
