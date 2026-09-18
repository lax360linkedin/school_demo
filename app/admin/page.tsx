"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AdminAuth } from "@/lib/adminStorage";

export default function AdminIndexPage() {
  const router = useRouter();

  useEffect(() => {
    if (AdminAuth.isAuthenticated()) {
      router.replace("/admin/dashboard");
    } else {
      router.replace("/admin/login");
    }
  }, [router]);

  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <div className="w-8 h-8 border-2 border-slate-900 border-t-amber-500 rounded-full animate-spin" />
        <p className="text-xs text-slate-500">Redirecting to Admin Portal...</p>
      </div>
    </div>
  );
}
