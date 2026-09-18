import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student Life & Experiences | LAX360 Academy",
  description:
    "A vibrant student community featuring competitive athletics, classical orchestra, robotics clubs, Model UN, and the four-house collegiate spirit.",
};

export default function CampusLifeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
