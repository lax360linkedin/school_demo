"use client";

import React from "react";
import Link from "next/link";
import { Compass, Home, BookOpen, Building2, GraduationCap, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  const quickLinks = [
    { title: "Home Campus", href: "/", icon: Home },
    { title: "Academic Programs", href: "/programs", icon: BookOpen },
    { title: "Campus Facilities", href: "/facilities", icon: Building2 },
    { title: "Admissions Process", href: "/admissions", icon: GraduationCap },
    { title: "Contact Desk", href: "/contact", icon: Phone },
  ];

  return (
    <div className="min-h-screen bg-[#FCFBF7] text-slate-800 flex flex-col selection:bg-amber-100 selection:text-amber-900">
      <Navbar />

      <main className="flex-1 flex items-center justify-center pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl w-full text-center space-y-8">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200/70 text-amber-900 flex items-center justify-center mx-auto shadow-xs">
            <Compass className="w-8 h-8 text-amber-800" />
          </div>

          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
              Error 404 • Page Not Found
            </span>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-slate-900 tracking-tight">
              Looking for a Campus Corridor?
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-md mx-auto">
              The page or resource you are looking for is not located here. Explore the primary
              sections below to find your way.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-2 max-w-lg mx-auto">
            {quickLinks.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Link
                  key={idx}
                  href={item.href}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#EAE3D7] text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 transition-all shadow-2xs"
                >
                  <Icon className="w-3.5 h-3.5 text-slate-500" />
                  <span>{item.title}</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-slate-900 text-white font-medium text-xs tracking-wider uppercase hover:bg-slate-800 transition-colors shadow-sm"
            >
              Return to Homepage
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
