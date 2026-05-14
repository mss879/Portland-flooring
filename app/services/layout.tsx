import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services — Flooring Installation, Restoration & More",
  description:
    "Explore Portland Flooring's full range of services including hybrid flooring installation, floor restoration, vinyl, timber, epoxy flooring, polishing, and custom solutions across Melbourne & Victoria.",
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
