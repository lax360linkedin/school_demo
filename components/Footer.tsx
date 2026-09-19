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
import { schoolData, SOCIAL_LINKS } from "@/data/school";

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
      <section className="relative w-full py-14 sm:py-16 lg:py-20 bg-[#F5F0E8] overflow-hidden border-t border-[#EAE3D7]">
        <div className="relative w-full px-6 sm:px-10 lg:px-16 max-w-[1800px] mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-[#FDFBF7] to-[#F5EFE6] border border-[#EAE3D7] p-8 sm:p-12 lg:p-14 text-center shadow-lg">
            {/* Slanted Accent Backdrop */}
            <div
              className="absolute -top-32 -left-32 w-96 h-96 bg-amber-100/40 transform -rotate-12 rounded-3xl blur-2xl pointer-events-none"
            />
            <div
              className="absolute -bottom-32 -right-32 w-96 h-96 bg-orange-100/30 transform rotate-12 rounded-3xl blur-2xl pointer-events-none"
            />

            <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#EAE3D7] shadow-sm backdrop-blur-md mb-3 sm:mb-4">
                <GraduationCap className="w-3.5 h-3.5 text-academic-gold" />
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-slate-800">
                  The Next Generation of Leaders
                </span>
              </div>

              <h2 className="text-4xl sm:text-6xl md:text-7xl font-black text-slate-900 tracking-tight uppercase mb-3 sm:mb-4 leading-none">
                SHAPE THE <span className="text-gold-gradient">FUTURE</span>
              </h2>

              <p className="text-base sm:text-xl text-slate-700 font-normal leading-relaxed mb-6 sm:mb-8 max-w-2xl">
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
      <footer id="contact" className="relative bg-slate-900 text-white pt-14 sm:pt-16 pb-12 overflow-hidden border-t border-slate-800">
        <div className="w-full px-6 sm:px-10 lg:px-16 max-w-[1800px] mx-auto">
          {/* Rebalanced 4-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-10 lg:pb-12 border-b border-slate-800">
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

              <div className="pt-2 space-y-4">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-300 w-fit">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  IB World School & Cambridge Certified
                </span>

                {/* Social Media & Contact Buttons */}
                <div className="pt-1">
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 block mb-3">
                    Connect With Us
                  </span>
                  <div className="flex items-center gap-3">
                    {/* WhatsApp */}
                    <a
                      href={SOCIAL_LINKS.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="WhatsApp"
                      title="WhatsApp"
                      className="inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-slate-800/90 border border-slate-700/80 text-slate-300 hover:text-[#25D366] hover:border-[#25D366]/50 hover:bg-[#25D366]/10 shadow-sm transition-all duration-250 ease-out hover:-translate-y-0.5 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-400/80 focus:ring-offset-2 focus:ring-offset-slate-900 cursor-pointer"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="w-5 h-5 fill-current"
                        aria-hidden="true"
                      >
                        <path d="M17.507 14.307l-.009.075c-.239.787-1.168 1.487-1.929 1.656-.514.113-1.189.206-3.447-.732-2.887-1.199-4.743-4.14-4.887-4.333-.142-.191-1.167-1.558-1.167-2.971 0-1.413.738-2.108 1.002-2.395.263-.287.574-.359.765-.359.192 0 .383.003.55.012.177.01.412-.068.644.49.239.574.814 1.986.885 2.13.072.144.12.312.024.503-.095.191-.144.311-.287.478-.143.167-.301.373-.43.501-.144.144-.294.301-.127.588.167.287.744 1.229 1.597 1.99 1.097.978 2.022 1.282 2.309 1.425.287.143.454.12.622-.072.167-.191.717-.837.909-1.124.191-.287.383-.239.645-.143.263.096 1.674.789 1.961.933.287.144.478.216.55.336.072.12.072.694-.167 1.481zM12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.662 1.435 5.178L2 22l4.981-1.396A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.2c-1.636 0-3.158-.475-4.45-1.298l-.319-.202-3.303.926.887-3.21-.212-.338A8.167 8.167 0 013.8 12c0-4.522 3.678-8.2 8.2-8.2s8.2 3.678 8.2 8.2-3.678 8.2-8.2 8.2z" />
                      </svg>
                    </a>

                    {/* Instagram */}
                    <a
                      href={SOCIAL_LINKS.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      title="Instagram"
                      className="inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-slate-800/90 border border-slate-700/80 text-slate-300 hover:text-rose-400 hover:border-rose-400/50 hover:bg-rose-500/10 shadow-sm transition-all duration-250 ease-out hover:-translate-y-0.5 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-400/80 focus:ring-offset-2 focus:ring-offset-slate-900 cursor-pointer"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="w-5 h-5 fill-current"
                        aria-hidden="true"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>

                    {/* YouTube */}
                    <a
                      href={SOCIAL_LINKS.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="YouTube"
                      title="YouTube"
                      className="inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-slate-800/90 border border-slate-700/80 text-slate-300 hover:text-red-500 hover:border-red-500/50 hover:bg-red-500/10 shadow-sm transition-all duration-250 ease-out hover:-translate-y-0.5 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-400/80 focus:ring-offset-2 focus:ring-offset-slate-900 cursor-pointer"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="w-5 h-5 fill-current"
                        aria-hidden="true"
                      >
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    </a>
                  </div>
                </div>
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
