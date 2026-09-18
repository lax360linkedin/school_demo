"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, GraduationCap } from "lucide-react";

interface NavbarProps {
  onOpenAdmissions?: () => void;
}

export default function Navbar({ onOpenAdmissions }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Dedicated Route Navigation Items
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Programs", href: "/programs" },
    { name: "Campus Life", href: "/campus-life" },
    { name: "Facilities", href: "/facilities" },
    { name: "Admissions", href: "/admissions" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
  ];

  // Purely visual scroll state for navbar backdrop blur - NO SCROLL SPY
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Determine active nav item strictly by route pathname - zero scroll-based changes
  const isItemActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname === href || pathname.startsWith(href + "/");
  };

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);

    if (pathname === href) {
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    router.push(href);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  };

  const handleApplyClick = () => {
    setMobileMenuOpen(false);
    if (onOpenAdmissions && pathname === "/admissions") {
      onOpenAdmissions();
    } else {
      router.push("/admissions");
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "instant" });
      }
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-[#FAF8F5]/92 backdrop-blur-xl border-b border-[#EAE3D7] shadow-sm py-3.5"
            : "bg-[#FAF8F5]/80 backdrop-blur-md border-b border-[#EAE3D7]/50 py-4.5"
        }`}
      >
        <div className="w-full px-6 sm:px-10 lg:px-16">
          <div className="flex items-center justify-between">
            {/* LAX360 Brand Logo - Navigates to Home / */}
            <Link
              href="/"
              onClick={() => {
                setMobileMenuOpen(false);
                if (typeof window !== "undefined") {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className="flex items-center gap-3.5 group cursor-pointer"
            >
              <div className="relative w-10 h-10 flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="LAX360 Crest"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
                  priority
                />
              </div>

              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight text-slate-900 flex items-center gap-1.5">
                  LAX360
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-academic-gold animate-pulse" />
                </span>
                <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-slate-500">
                  Academy & Campus
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links - Pure Route-Based Active State */}
            <nav className="hidden md:flex items-center gap-0.5 lg:gap-1 px-3 py-1.5 rounded-full bg-white/90 border border-[#EAE3D7] shadow-sm backdrop-blur-md">
              {navLinks.map((link) => {
                const isActive = isItemActive(link.href);

                return (
                  <button
                    key={link.name}
                    type="button"
                    onClick={() => handleNavClick(link.href)}
                    aria-current={isActive ? "page" : undefined}
                    className={`group relative flex items-center px-3 lg:px-4 py-1.5 text-xs lg:text-sm rounded-full transition-colors duration-200 cursor-pointer select-none ${
                      isActive
                        ? "text-white font-semibold"
                        : "text-slate-700 font-medium hover:text-black hover:bg-stone-100/90"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavPill"
                        className="absolute inset-0 bg-slate-900 rounded-full shadow-sm -z-0"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span
                      className={`relative z-10 transition-colors duration-200 ${
                        isActive ? "text-white" : "group-hover:text-black"
                      }`}
                    >
                      {link.name}
                    </span>
                  </button>
                );
              })}
            </nav>

            {/* Right Side CTA: APPLY NOW (Navigates to /admissions) */}
            <div className="hidden md:flex items-center gap-3">
              <button
                type="button"
                onClick={handleApplyClick}
                className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-white tracking-wide uppercase overflow-hidden transition-all duration-300 bg-slate-900 hover:bg-slate-800 shadow-sm hover:shadow-md hover:scale-[1.03] active:scale-[0.98]"
              >
                <GraduationCap className="w-3.5 h-3.5 text-amber-300" />
                <span>Apply Now</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-white border border-[#EAE3D7] text-slate-700 hover:text-slate-900 focus:outline-none shadow-sm"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer - Route-Based Active State */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-[#FAF8F5]/98 backdrop-blur-2xl md:hidden pt-24 px-6 flex flex-col justify-between pb-10"
          >
            <div className="flex flex-col gap-2">
              <div className="text-[11px] font-bold uppercase tracking-widest text-academic-gold mb-2">
                Navigation
              </div>
              {navLinks.map((link, idx) => {
                const isActive = isItemActive(link.href);

                return (
                  <motion.button
                    key={link.name}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    onClick={() => handleNavClick(link.href)}
                    aria-current={isActive ? "page" : undefined}
                    className={`group text-left text-lg font-bold flex items-center justify-between transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-slate-900 text-white px-4 py-3 rounded-full shadow-sm"
                        : "text-slate-800 hover:text-black py-2.5 px-3 border-b border-[#EAE3D7] hover:bg-stone-100/60 rounded-xl"
                    }`}
                  >
                    <span
                      className={
                        isActive
                          ? "text-white"
                          : "transition-colors duration-200 group-hover:text-black"
                      }
                    >
                      {link.name}
                    </span>
                    <span
                      className={`text-xs font-mono transition-colors duration-200 ${
                        isActive
                          ? "text-slate-300"
                          : "text-slate-400 group-hover:text-black"
                      }`}
                    >
                      0{idx + 1}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            <div className="flex flex-col gap-4 mt-8">
              <button
                type="button"
                onClick={handleApplyClick}
                className="w-full py-3.5 rounded-xl text-center font-bold text-white bg-slate-900 shadow-md flex items-center justify-center gap-2"
              >
                <GraduationCap className="w-5 h-5 text-amber-300" />
                <span>Begin Admission Application</span>
              </button>
              <div className="flex items-center justify-center gap-2">
                <Image
                  src="/logo.png"
                  alt="LAX360"
                  width={18}
                  height={18}
                  className="w-4 h-4 object-contain opacity-80"
                />
                <p className="text-center text-xs text-slate-500 font-medium">
                  LAX360 • Admissions Cycle 2026–2027
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
