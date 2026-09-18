import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admissions 2026–2027 | LAX360 Academy",
  description:
    "Join the LAX360 educational community. Learn about our 4-step admissions roadmap, eligibility criteria, key dates, and submit an online enquiry.",
};

export default function AdmissionsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
