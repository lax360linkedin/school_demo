import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | LAX360 Academy",
  description:
    "Discover the foundational ethos, leadership, 28-acre green bio-campus, and Socratic inquiry pedagogy of LAX360 Academy.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
