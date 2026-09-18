import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact & Campus Visit | LAX360 Academy",
  description:
    "Connect with our admissions desk, administrative office, and schedule an escorted walking tour of our 28-acre green campus in Chennai.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
