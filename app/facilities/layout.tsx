import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Campus Infrastructure & Facilities | LAX360 Academy",
  description:
    "Explore our 28-acre green campus: Olympic aquatic complex, advanced science research labs, robotics incubator, and smart collaborative classrooms.",
};

export default function FacilitiesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
