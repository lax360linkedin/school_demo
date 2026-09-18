import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";
import CookieConsentBanner from "@/components/CookieConsentBanner";
import CookiePreferencesModal from "@/components/CookiePreferencesModal";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "LAX360 | Inspire. Learn. Lead.",
  description:
    "A modern educational experience focused on academic excellence, innovation, creativity, and student growth at LAX360.",
  keywords: [
    "LAX360",
    "LAX 360 Academy",
    "International School",
    "IB World School",
    "Cambridge Curriculum",
    "Premium Education",
    "Innovation",
    "Robotics",
    "Leadership",
  ],
  authors: [{ name: "LAX360" }],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} scroll-smooth`}>
      <body className="bg-[#FAF8F5] text-slate-800 overflow-x-hidden antialiased selection:bg-amber-100 selection:text-amber-900">
        {children}
        <WhatsAppButton />
        <CookieConsentBanner />
        <CookiePreferencesModal />
      </body>
    </html>
  );
}
