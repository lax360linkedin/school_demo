import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Faculty & Staff Careers | LAX360 Academy",
  description:
    "Join our community of passionate educators, mentors, and administrators. Explore open academic and leadership positions at LAX360 Academy.",
};

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
