import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Academic Programs (K–12) | LAX360 Academy",
  description:
    "Explore our inquiry-led curriculum pathways across Early Childhood, Primary School, Cambridge Lower Secondary, IGCSE, and IB Diploma Programme.",
};

export default function ProgramsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
