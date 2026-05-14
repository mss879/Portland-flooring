import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us — Our Story & Craftsmanship",
  description:
    "Learn about Portland Flooring's commitment to premium craftsmanship, expert flooring installation, and sustainable materials. Proudly Australian-owned, serving Pakenham, Melbourne & all of Victoria.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
