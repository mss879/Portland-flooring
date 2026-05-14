import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Flooring Collections — Premium Hybrid & Timber",
  description:
    "Browse Portland Flooring's curated collections of premium hybrid, timber, and engineered flooring. European Oak, Spotted Gum, Blackbutt, and more — all Australian-stocked.",
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
