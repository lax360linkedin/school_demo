"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AdminAuth, AdminStorage } from "@/lib/adminStorage";
import { AdminToastProvider } from "@/components/admin/AdminToast";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [newEnquiriesCount, setNewEnquiriesCount] = useState(2);

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    // If we're on login page, no need to enforce authentication
    if (isLoginPage) {
      setIsCheckingAuth(false);
      return;
    }

    // Client-side authentication check for all admin routes
    const isAuth = AdminAuth.isAuthenticated();
    if (!isAuth) {
      router.replace("/admin/login");
    } else {
      setIsCheckingAuth(false);
      // Load unread enquiries count
      try {
        const enquiries = AdminStorage.getEnquiries();
        const unread = enquiries.filter((e) => e.status === "New").length;
        setNewEnquiriesCount(unread);
      } catch (e) {
        console.warn(e);
      }
    }
  }, [pathname, isLoginPage, router]);

  // If on login page, render child directly inside Toast provider
  if (isLoginPage) {
    return <AdminToastProvider>{children}</AdminToastProvider>;
  }

  // Loading skeleton while verifying demo session
  if (isCheckingAuth) {
    return (
      <AdminToastProvider>
        <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-3 border-slate-900 border-t-amber-500 rounded-full animate-spin" />
            <p className="text-xs font-semibold text-slate-600 tracking-wide">
              Authenticating Portal Session...
            </p>
          </div>
        </div>
      </AdminToastProvider>
    );
  }

  return (
    <AdminToastProvider>
      <div className="min-h-screen bg-[#FAF8F5] flex font-sans text-slate-900 antialiased selection:bg-amber-100 selection:text-amber-900">
        {/* Admin Navigation Sidebar */}
        <AdminSidebar
          isMobileOpen={isMobileOpen}
          onCloseMobile={() => setIsMobileOpen(false)}
          newEnquiriesCount={newEnquiriesCount}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
          <AdminHeader
            onOpenMobileMenu={() => setIsMobileOpen(true)}
          />

          <main className="flex-1 p-4 sm:p-8 lg:p-10 max-w-7xl w-full mx-auto">
            {children}
          </main>
        </div>
      </div>
    </AdminToastProvider>
  );
}
