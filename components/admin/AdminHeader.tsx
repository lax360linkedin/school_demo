"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  Bell,
  Search,
  ChevronRight,
  ExternalLink,
  User,
  LogOut,
} from "lucide-react";
import { AdminAuth } from "@/lib/adminStorage";
import { useAdminToast } from "./AdminToast";

interface AdminHeaderProps {
  onOpenMobileMenu: () => void;
  searchTerm?: string;
  onSearchChange?: (val: string) => void;
  searchPlaceholder?: string;
}

const routeTitles: Record<string, { title: string; category: string }> = {
  "/admin/dashboard": { title: "Executive Overview", category: "Dashboard" },
  "/admin/programs": { title: "Academic Programs", category: "Academics" },
  "/admin/campus-life": { title: "Campus Life Activities", category: "Student Affairs" },
  "/admin/student-life": { title: "Student Clubs & Houses", category: "Student Affairs" },
  "/admin/facilities": { title: "Infrastructure & Spaces", category: "Operations" },
  "/admin/events": { title: "School Calendar & Events", category: "Engagement" },
  "/admin/gallery": { title: "Campus Media Gallery", category: "Media" },
  "/admin/admissions": { title: "Admissions Roadmap", category: "Enrolment" },
  "/admin/enquiries": { title: "Prospect Inquiries", category: "Admissions" },
  "/admin/careers": { title: "Faculty & Staff Careers", category: "Human Resources" },
  "/admin/careers/applications": { title: "Career Applications", category: "Talent Acquisition" },
  "/admin/privacy/requests": { title: "Data Rights Requests", category: "DPDP & Privacy" },
  "/admin/privacy/consents": { title: "Consent Audit Trail", category: "DPDP & Privacy" },
  "/admin/privacy/cookies": { title: "Cookie Consent & Governance", category: "DPDP & Privacy" },
  "/admin/content": { title: "Landing Page Sections", category: "Web Content" },
  "/admin/settings": { title: "Portal & Brand Settings", category: "Configuration" },
};

export default function AdminHeader({
  onOpenMobileMenu,
  searchTerm,
  onSearchChange,
  searchPlaceholder = "Search records, applicants, programs...",
}: AdminHeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const toast = useAdminToast();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState([
    {
      id: "n1",
      title: "New Admission Enquiry",
      desc: "Arun Kumar registered interest for Grade 6.",
      time: "12m ago",
      unread: true,
    },
    {
      id: "n2",
      title: "Career Application Received",
      desc: "Dr. Ananya Roy applied for Senior Physics Educator.",
      time: "45m ago",
      unread: true,
    },
    {
      id: "n3",
      title: "DPDP Data Request",
      desc: "Pooja Venkatesh requested access to student records.",
      time: "2h ago",
      unread: true,
    },
  ]);

  const currentRoute = routeTitles[pathname] || {
    title: "Administration Portal",
    category: "LAX360",
  };

  const handleLogout = () => {
    AdminAuth.logout();
    router.push("/admin/login");
  };

  const markAllRead = () => {
    setUnreadNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
    toast.info("All notifications marked as read.");
  };

  const unreadCount = unreadNotifications.filter((n) => n.unread).length;

  return (
    <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-[#EAE3D7] px-5 sm:px-8 py-4 flex items-center justify-between gap-4">
      {/* Left: Mobile trigger & Breadcrumb */}
      <div className="flex items-center gap-3.5 min-w-0">
        <button
          type="button"
          onClick={onOpenMobileMenu}
          className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 lg:hidden shrink-0"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="min-w-0">
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
            <span>Portal</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <span className="text-slate-600 font-semibold">{currentRoute.category}</span>
          </div>
          <h1 className="text-lg sm:text-xl font-bold text-slate-900 truncate tracking-tight mt-0.5">
            {currentRoute.title}
          </h1>
        </div>
      </div>

      {/* Right: Search, Notifications & Profile */}
      <div className="flex items-center gap-3 sm:gap-4 shrink-0">
        {/* Search bar (desktop) */}
        {onSearchChange && (
          <div className="hidden md:flex items-center relative w-64 lg:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchTerm || ""}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 bg-slate-50/70 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all shadow-xs"
            />
          </div>
        )}

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setIsNotifOpen(!isNotifOpen);
              setIsProfileOpen(false);
            }}
            className="relative p-2.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-amber-500 ring-2 ring-white" />
            )}
          </button>

          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white shadow-2xl border border-slate-200 py-3.5 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between px-5 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-900">Notifications</span>
                  {unreadCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    className="text-xs text-amber-700 hover:text-amber-800 font-semibold cursor-pointer"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-72 overflow-y-auto divide-y divide-slate-50">
                {unreadNotifications.map((n) => (
                  <div
                    key={n.id}
                    className={`px-5 py-3 hover:bg-slate-50 transition-colors ${
                      n.unread ? "bg-amber-50/40" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs sm:text-sm font-semibold text-slate-900">{n.title}</p>
                      <span className="text-[11px] text-slate-400 shrink-0">{n.time}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{n.desc}</p>
                  </div>
                ))}
              </div>

              <div className="pt-2.5 px-5 border-t border-slate-100 text-center">
                <a
                  href="/admin/enquiries"
                  className="text-xs text-slate-600 hover:text-slate-950 font-semibold block"
                >
                  View all admissions enquiries &rarr;
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Profile Avatar & Menu */}
        <div className="relative">
          <button
            onClick={() => {
              setIsProfileOpen(!isProfileOpen);
              setIsNotifOpen(false);
            }}
            className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <div className="w-9 h-9 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center font-bold text-xs sm:text-sm shadow-xs">
              AD
            </div>
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-60 rounded-2xl bg-white shadow-2xl border border-slate-200 py-2.5 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-5 py-3 border-b border-slate-100">
                <p className="text-sm font-bold text-slate-900">Administrator</p>
                <p className="text-xs text-slate-500">admin@schooldemo.com</p>
              </div>

              <div className="py-1.5">
                <a
                  href="/admin/settings"
                  className="flex items-center gap-3 px-5 py-2 text-xs sm:text-sm text-slate-700 hover:bg-slate-50 transition-colors font-medium"
                >
                  <User className="w-4 h-4 text-slate-400" />
                  <span>Portal Settings</span>
                </a>
                <a
                  href="/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 px-5 py-2 text-xs sm:text-sm text-slate-700 hover:bg-slate-50 transition-colors font-medium"
                >
                  <ExternalLink className="w-4 h-4 text-slate-400" />
                  <span>View Public Site</span>
                </a>
              </div>

              <div className="pt-1.5 border-t border-slate-100">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full text-left px-5 py-2 text-xs sm:text-sm text-rose-600 hover:bg-rose-50 transition-colors font-semibold cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
