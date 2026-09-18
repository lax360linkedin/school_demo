"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { SOCIAL_LINKS } from "@/data/school";

export default function WhatsAppButton() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const whatsappUrl = SOCIAL_LINKS.whatsapp;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with LAX360 on WhatsApp"
      title="Chat with LAX360 on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        delay: 0.8,
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.94 }}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20BA59] text-white shadow-lg hover:shadow-2xl hover:shadow-[#25D366]/40 transition-shadow duration-300 focus:outline-none focus:ring-4 focus:ring-[#25D366]/40 cursor-pointer"
    >
      {/* Official WhatsApp Vector SVG */}
      <svg
        viewBox="0 0 24 24"
        className="w-6 h-6 sm:w-7 sm:h-7 fill-white"
        aria-hidden="true"
      >
        <path d="M17.507 14.307l-.009.075c-.239.787-1.168 1.487-1.929 1.656-.514.113-1.189.206-3.447-.732-2.887-1.199-4.743-4.14-4.887-4.333-.142-.191-1.167-1.558-1.167-2.971 0-1.413.738-2.108 1.002-2.395.263-.287.574-.359.765-.359.192 0 .383.003.55.012.177.01.412-.068.644.49.239.574.814 1.986.885 2.13.072.144.12.312.024.503-.095.191-.144.311-.287.478-.143.167-.301.373-.43.501-.144.144-.294.301-.127.588.167.287.744 1.229 1.597 1.99 1.097.978 2.022 1.282 2.309 1.425.287.143.454.12.622-.072.167-.191.717-.837.909-1.124.191-.287.383-.239.645-.143.263.096 1.674.789 1.961.933.287.144.478.216.55.336.072.12.072.694-.167 1.481zM12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.662 1.435 5.178L2 22l4.981-1.396A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.2c-1.636 0-3.158-.475-4.45-1.298l-.319-.202-3.303.926.887-3.21-.212-.338A8.167 8.167 0 013.8 12c0-4.522 3.678-8.2 8.2-8.2s8.2 3.678 8.2 8.2-3.678 8.2-8.2 8.2z" />
      </svg>
    </motion.a>
  );
}
