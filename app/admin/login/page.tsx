"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  Shield,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { AdminAuth } from "@/lib/adminStorage";
import { useAdminToast } from "@/components/admin/AdminToast";

export default function AdminLoginPage() {
  const router = useRouter();
  const toast = useAdminToast();

  const [email, setEmail] = useState("admin@schooldemo.com");
  const [password, setPassword] = useState("admin123");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    setTimeout(() => {
      const ok = AdminAuth.login(email, password);
      setLoading(false);
      if (ok) {
        toast.success("Welcome back, Administrator.");
        router.push("/admin/dashboard");
      } else {
        setErrorMsg("Invalid administrative credentials. Please verify your email and password.");
        toast.error("Authentication failed. Please verify credentials.");
      }
    }, 450);
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#FAF8F5]">
      {/* Left Column: Editorial Showcase (lg+) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-slate-950 text-white flex-col justify-between p-12 lg:p-16 overflow-hidden">
        {/* Background Image with Dark Vignette */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/campus/library.jpg"
            alt="LAX360 Campus"
            fill
            className="object-cover opacity-25 scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/60" />
        </div>

        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Branding Header */}
        <div className="relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="relative w-14 h-14 rounded-2xl overflow-hidden shadow-lg border border-white/20 bg-white flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="LAX360 Logo"
                fill
                className="object-contain p-2"
                priority
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
                LAX360
                <span className="text-xs px-2.5 py-0.5 rounded-md bg-amber-400/20 text-amber-300 font-semibold border border-amber-400/30">
                  Administration
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 font-medium mt-0.5">
                Institutional Management Portal
              </p>
            </div>
          </div>
        </div>

        {/* Center Editorial Quote */}
        <div className="relative z-10 max-w-lg my-auto py-12">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400 mb-4">
            <Shield className="w-4 h-4" />
            Scholastic Governance
          </span>
          <blockquote className="text-2xl lg:text-3xl font-serif text-slate-100 leading-snug">
            &ldquo;Empowering academic leadership, nurturing human curiosity, and sustaining excellence across our 68-acre institution.&rdquo;
          </blockquote>
          <p className="mt-5 text-xs text-slate-400 tracking-wider font-mono uppercase">
            Established 2004 &bull; Chennai & Bangalore Corridor
          </p>
        </div>

        {/* Bottom Security / Trust Badges */}
        <div className="relative z-10 pt-8 border-t border-slate-800/80 flex items-center justify-between text-xs sm:text-sm text-slate-400">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Role-based Access
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Institutional Security
            </span>
          </div>
          <span className="text-xs text-slate-500 font-mono">Academic Portal</span>
        </div>
      </div>

      {/* Right Column: Authentication Form Card */}
      <div className="flex-1 flex flex-col justify-between p-6 sm:p-12 lg:p-16 max-w-xl mx-auto w-full">
        {/* Top return link */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-950 transition-colors flex items-center gap-2"
          >
            &larr; Return to Public School Site
          </Link>
        </div>

        {/* Center Card */}
        <div className="my-auto py-10">
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 font-serif">
              Sign in to Portal
            </h1>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
              Enter your administrative credentials to manage academic programs, faculty careers, admissions inquiries, and campus data governance.
            </p>
          </div>

          {/* Error Banner */}
          {errorMsg && (
            <div className="mb-6 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Administrative Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@schooldemo.com"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-sm sm:text-base text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-all shadow-xs"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs sm:text-sm font-semibold text-slate-700 uppercase tracking-wider">
                  Password
                </label>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-11 py-3 rounded-xl border border-slate-200 bg-white text-sm sm:text-base text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-all shadow-xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-3 py-3.5 px-5 rounded-xl bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white text-sm sm:text-base font-semibold tracking-wide flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg transition-all disabled:opacity-70 cursor-pointer"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Enter Portal Dashboard</span>
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer info */}
        <div className="pt-6 border-t border-[#EAE3D7] text-center text-xs sm:text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} LAX360 International School. Institutional Administration.</p>
        </div>
      </div>
    </div>
  );
}
