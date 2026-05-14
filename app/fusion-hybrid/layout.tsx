import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Premium Hybrid Flooring — Waterproof, Durable & Elegant",
  description:
    "Discover Portland's Premium Hybrid flooring range — 100% waterproof SPC core, scratch-resistant, pet & kid-friendly. Built to last with authentic timber aesthetics. View the full collection.",
};

export default function FusionHybridLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
