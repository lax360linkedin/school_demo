"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Compass,
  Users,
  Building2,
  Calendar,
  Image as ImageIcon,
  GraduationCap,
  Inbox,
  BriefcaseBusiness,
  ShieldAlert,
  Cookie,
  BarChart3,
  ExternalLink,
  LogOut,
  X,
  ShieldCheck,
  Sliders,
} from "lucide-react";
import { AdminAuth } from "@/lib/adminStorage";

interface AdminSidebarProps {
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
  newEnquiriesCount?: number;
}

const mainNavItems = [
  { href: "/admin/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/programs", label: "Programs", icon: BookOpen },
  { href: "/admin/campus-life", label: "Campus Life", icon: Compass },
  { href: "/admin/facilities", label: "Facilities", icon: Building2 },
  { href: "/admin/events", label: "Events & Calendar", icon: Calendar },
  { href: "/admin/gallery", label: "Campus Gallery", icon: ImageIcon },
  { href: "/admin/admissions", label: "Admissions", icon: GraduationCap },
  { href: "/admin/enquiries", label: "Enquiries", icon: Inbox, hasBadge: true },
  { href: "/admin/careers", label: "Careers", icon: BriefcaseBusiness },
];

const privacyNavItems = [
  { href: "/admin/privacy/requests", label: "Data Rights Requests", icon: ShieldAlert },
  { href: "/admin/privacy/cookies", label: "Cookie Governance", icon: Cookie },
];

export default function AdminSidebar({
  isMobileOpen = false,
  onCloseMobile,
  newEnquiriesCount = 2,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    AdminAuth.logout();
    router.push("/admin/login");
  };

  const content = (
    <aside className="w-72 h-full bg-white border-r border-[#EAE3D7] flex flex-col justify-between shrink-0 shadow-xs select-none">
      {/* Top Branding */}
      <div className="p-6 border-b border-[#EAE3D7]/70">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-11 h-11 rounded-xl overflow-hidden shadow-xs border border-[#EAE3D7] bg-white flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="LAX360 Logo"
                fill
                className="object-contain p-1.5"
                priority
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-bold tracking-tight text-slate-900">LAX360</span>
                <span className="px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 rounded-md">
                  Admin
                </span>
              </div>
              <p className="text-xs text-slate-700 font-medium">Administration Portal</p>
            </div>
          </div>

          {/* Mobile close trigger */}
          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 lg:hidden"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 overflow-y-auto px-4 py-5 space-y-5">
        <div>
          <p className="px-3 pb-2.5 text-xs font-bold uppercase tracking-wider text-slate-600">
            Management
          </p>

          <div className="space-y-1">
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href === "/admin/careers" && pathname.startsWith("/admin/careers"));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onCloseMobile}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm transition-all duration-150 group ${
                    isActive
                      ? "bg-slate-900 text-white font-semibold shadow-sm shadow-slate-900/10"
                      : "text-slate-700 hover:text-slate-950 hover:bg-slate-100 font-semibold"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Icon
                      className={`w-4 h-4 shrink-0 transition-colors ${
                        isActive ? "text-amber-400" : "text-slate-500 group-hover:text-slate-900"
                      }`}
                    />
                    <span className="truncate">{item.label}</span>
                  </div>

                  {item.hasBadge && newEnquiriesCount > 0 && (
                    <span
                      className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                        isActive
                          ? "bg-amber-400 text-slate-950 font-bold"
                          : "bg-amber-100 text-amber-900"
                      }`}
                    >
                      {newEnquiriesCount}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Privacy & DPDP Section */}
        <div>
          <p className="px-3 pb-2.5 text-xs font-bold uppercase tracking-wider text-slate-600">
            Privacy & Governance
          </p>

          <div className="space-y-1">
            {privacyNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onCloseMobile}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm transition-all duration-150 group ${
                    isActive
                      ? "bg-slate-900 text-white font-semibold shadow-sm shadow-slate-900/10"
                      : "text-slate-700 hover:text-slate-950 hover:bg-slate-100 font-semibold"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Icon
                      className={`w-4 h-4 shrink-0 transition-colors ${
                        isActive ? "text-amber-400" : "text-slate-500 group-hover:text-slate-900"
                      }`}
                    />
                    <span className="truncate">{item.label}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Settings & Public Link */}
        <div className="pt-2 border-t border-slate-100">
          <p className="px-3 pb-2 text-xs font-bold uppercase tracking-wider text-slate-600">
            System
          </p>

          <div className="space-y-1">
            <Link
              href="/admin/settings"
              onClick={onCloseMobile}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm transition-all duration-150 group ${
                pathname === "/admin/settings"
                  ? "bg-slate-900 text-white font-semibold shadow-sm shadow-slate-900/10"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 font-medium"
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <Sliders
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    pathname === "/admin/settings" ? "text-amber-400" : "text-slate-400 group-hover:text-slate-700"
                  }`}
                />
                <span className="truncate">Portal Settings</span>
              </div>
            </Link>

            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 font-medium transition-colors group"
            >
              <div className="flex items-center gap-3">
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-slate-700" />
                <span>Public Website</span>
              </div>
              <span className="text-xs text-slate-400">Live</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Bottom Profile / Logout */}
      <div className="p-4 border-t border-[#EAE3D7]/70 bg-slate-50/50">
        <div className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate">School Administrator</p>
              <p className="text-xs text-slate-500 truncate">admin@schooldemo.com</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            title="Sign Out"
            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors shrink-0 cursor-pointer"
            aria-label="Sign out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block h-screen sticky top-0 z-30">{content}</div>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            onClick={onCloseMobile}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs"
          />
          <div className="relative z-10 h-full flex flex-col">{content}</div>
        </div>
      )}
    </>
  );
}
