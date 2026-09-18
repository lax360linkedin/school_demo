"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
} from "lucide-react";
import { schoolData } from "@/data/school";

interface FooterProps {
  onOpenAdmissions?: () => void;
}

export default function Footer({ onOpenAdmissions }: FooterProps) {
  const handleScrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* 18. Final Cinematic CTA Section ("SHAPE THE FUTURE") with Original Cream Gradient Background */}
      <section className="relative w-full py-24 bg-[#F5F0E8] overflow-hidden border-t border-[#EAE3D7]">
        <div className="relative w-full px-6 sm:px-10 lg:px-16 max-w-[1800px] mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-[#FDFBF7] to-[#F5EFE6] border border-[#EAE3D7] p-10 sm:p-16 lg:p-20 text-center shadow-lg">
            {/* Slanted Accent Backdrop */}
            <div
              className="absolute -top-32 -left-32 w-96 h-96 bg-amber-100/40 transform -rotate-12 rounded-3xl blur-2xl pointer-events-none"
            />
            <div
              className="absolute -bottom-32 -right-32 w-96 h-96 bg-orange-100/30 transform rotate-12 rounded-3xl blur-2xl pointer-events-none"
            />

            <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#EAE3D7] shadow-sm backdrop-blur-md mb-6">
                <GraduationCap className="w-3.5 h-3.5 text-academic-gold" />
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-slate-800">
                  The Next Generation of Leaders
                </span>
              </div>

              <h2 className="text-4xl sm:text-6xl md:text-7xl font-black text-slate-900 tracking-tight uppercase mb-6 leading-none">
                SHAPE THE <span className="text-gold-gradient">FUTURE</span>
              </h2>

              <p className="text-base sm:text-xl text-slate-700 font-normal leading-relaxed mb-10 max-w-2xl">
                Give your child an environment where curiosity becomes knowledge and
                knowledge becomes confidence.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <Link
                  href="/programs"
                  className="w-full sm:w-auto px-9 py-4 rounded-full font-bold text-sm text-white bg-slate-900 hover:bg-slate-800 shadow-md hover:scale-105 transition-all flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-4 h-4 text-amber-300" />
                  <span>Explore LAX360</span>
                </Link>

                <Link
                  href="/admissions"
                  className="w-full sm:w-auto px-9 py-4 rounded-full font-bold text-sm text-slate-800 bg-white border border-[#EAE3D7] hover:bg-stone-50 shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  <GraduationCap className="w-4 h-4 text-amber-700" />
                  <span>Contact Admissions</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 19. Institutional 4-Column Footer (Dark navy background) */}
      <footer id="contact" className="relative bg-slate-900 text-white pt-20 pb-12 overflow-hidden border-t border-slate-800">
        <div className="w-full px-6 sm:px-10 lg:px-16 max-w-[1800px] mx-auto">
          {/* Rebalanced 4-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-16 border-b border-slate-800">
            {/* Column 1: School Brand & Identity */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3.5">
                <div className="relative w-12 h-12 flex items-center justify-center">
                  <Image
                    src="/logo.png"
                    alt="LAX360 Crest"
                    width={48}
                    height={48}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-black tracking-tight text-white flex items-center gap-1.5 font-serif">
                    LAX360
                    <span className="inline-block w-2 h-2 rounded-full bg-amber-400" />
                  </span>
                  <span className="text-[11px] tracking-[0.25em] uppercase font-bold text-slate-400">
                    Academy & Campus
                  </span>
                </div>
              </div>

              <p className="text-slate-400 text-[15px] sm:text-base leading-relaxed">
                A premier international school dedicated to inquiry-led academic excellence,
                holistic character development, and future-ready leadership.
              </p>

              <div className="pt-2">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  IB World School & Cambridge Certified
                </span>
              </div>
            </motion.div>

            {/* Column 2: School Links */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <h4 className="text-[18px] sm:text-[19px] font-bold uppercase tracking-wider text-white mb-6">
                Explore LAX360
              </h4>
              <ul className="space-y-3.5 text-[15px] sm:text-base font-medium">
                {[
                  { label: "About Us", href: "/about" },
                  { label: "Our Vision & Ethos", href: "/about" },
                  { label: "Academic Programs", href: "/programs" },
                  { label: "Campus Life", href: "/campus-life" },
                  { label: "Campus Facilities", href: "/facilities" },
                  { label: "Careers", href: "/careers" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="group flex items-center text-white/90 hover:text-amber-300 hover:translate-x-1.5 transition-all duration-200 cursor-pointer text-left"
                    >
                      <span className="relative">
                        {item.label}
                        <span className="absolute left-0 -bottom-0.5 w-0 h-px bg-amber-300 transition-all duration-200 group-hover:w-full" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Column 3: Academics Links */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              <h4 className="text-[18px] sm:text-[19px] font-bold uppercase tracking-wider text-white mb-6">
                Academics
              </h4>
              <ul className="space-y-3.5 text-[15px] sm:text-base font-medium">
                {[
                  { label: "Curriculum Framework", href: "/programs" },
                  { label: "Early Years & Primary", href: "/programs" },
                  { label: "Middle & Senior School", href: "/programs" },
                  { label: "Student Activities", href: "/campus-life" },
                  { label: "Campus Infrastructure", href: "/facilities" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="group flex items-center text-white/90 hover:text-amber-300 hover:translate-x-1.5 transition-all duration-200 cursor-pointer text-left"
                    >
                      <span className="relative">
                        {item.label}
                        <span className="absolute left-0 -bottom-0.5 w-0 h-px bg-amber-300 transition-all duration-200 group-hover:w-full" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Column 4: Admissions & Contact */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.35 }}
            >
              <h4 className="text-[18px] sm:text-[19px] font-bold uppercase tracking-wider text-white mb-6">
                Admissions
              </h4>
              <ul className="space-y-3.5 text-[15px] sm:text-base font-medium mb-7">
                <li>
                  <Link
                    href="/admissions"
                    className="group flex items-center text-white/90 hover:text-amber-300 hover:translate-x-1.5 transition-all duration-200 cursor-pointer text-left"
                  >
                    <span className="relative">
                      Apply Now (2026–2027)
                      <span className="absolute left-0 -bottom-0.5 w-0 h-px bg-amber-300 transition-all duration-200 group-hover:w-full" />
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="group flex items-center text-white/90 hover:text-amber-300 hover:translate-x-1.5 transition-all duration-200 cursor-pointer text-left"
                  >
                    <span className="relative">
                      Book a Campus Visit
                      <span className="absolute left-0 -bottom-0.5 w-0 h-px bg-amber-300 transition-all duration-200 group-hover:w-full" />
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admissions"
                    className="group flex items-center text-white/90 hover:text-amber-300 hover:translate-x-1.5 transition-all duration-200 cursor-pointer text-left"
                  >
                    <span className="relative">
                      Admission Process & FAQs
                      <span className="absolute left-0 -bottom-0.5 w-0 h-px bg-amber-300 transition-all duration-200 group-hover:w-full" />
                    </span>
                  </Link>
                </li>
              </ul>

              {/* Contact Information */}
              <div className="space-y-3.5 pt-6 border-t border-slate-800 text-[15px] sm:text-base text-white font-medium">
                <a
                  href={`mailto:${schoolData.contact.admissionsEmail}`}
                  className="group flex items-center gap-3 text-white hover:text-amber-300 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700/80 flex items-center justify-center flex-shrink-0 group-hover:border-amber-400/50 group-hover:bg-slate-700 transition-all group-hover:scale-105">
                    <Mail className="w-4 h-4 text-amber-300 transition-transform group-hover:rotate-6" />
                  </div>
                  <span className="break-all">{schoolData.contact.admissionsEmail}</span>
                </a>

                <a
                  href={`tel:${schoolData.contact.admissionsPhone.replace(/[^0-9+]/g, "")}`}
                  className="group flex items-center gap-3 text-white hover:text-amber-300 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700/80 flex items-center justify-center flex-shrink-0 group-hover:border-amber-400/50 group-hover:bg-slate-700 transition-all group-hover:scale-105">
                    <Phone className="w-4 h-4 text-amber-300 transition-transform group-hover:rotate-6" />
                  </div>
                  <span>{schoolData.contact.admissionsPhone}</span>
                </a>

                <div className="group flex items-start gap-3 text-white">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700/80 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 text-amber-300" />
                  </div>
                  <span className="text-[14px] sm:text-[15px] leading-snug text-white/90">
                    {schoolData.contact.address}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Bar: Copyright & Social Links */}
          <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] sm:text-[14px] text-white/80 font-medium">
            <p>© 2026 LAX360. All rights reserved.</p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <Link href="/privacy" className="hover:text-amber-300 transition-colors duration-200">
                Privacy Notice
              </Link>
              <Link href="/cookies" className="hover:text-amber-300 transition-colors duration-200">
                Cookie Policy
              </Link>
              <button
                type="button"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    window.dispatchEvent(new CustomEvent("open-cookie-preferences"));
                  }
                }}
                className="hover:text-amber-300 transition-colors duration-200 cursor-pointer text-left"
              >
                Cookie Settings
              </button>
              <Link href="/careers" className="hover:text-amber-300 transition-colors duration-200">
                Careers
              </Link>
              <span className="hover:text-amber-300 cursor-pointer transition-colors duration-200">
                Terms of Enrollment
              </span>
              <span className="hover:text-amber-300 cursor-pointer transition-colors duration-200">
                Accessibility
              </span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
