import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Us — Our Story & Craftsmanship",
  description:
    "Learn about Portland Flooring's commitment to premium craftsmanship, expert flooring installation, and sustainable materials. Proudly Australian-owned, serving Pakenham, Melbourne & all of Victoria.",
  alternates: {
    canonical: "https://portlands.com.au/about",
  },
};

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Portland Flooring",
    url: "https://portlands.com.au/about",
    description:
      "Learn about Portland Flooring's commitment to premium craftsmanship, expert flooring installation, and sustainable materials.",
    mainEntity: {
      "@type": "Organization",
      name: "Portland Flooring",
      url: "https://portlands.com.au",
      logo: "https://portlands.com.au/portland-logo.webp",
      foundingLocation: {
        "@type": "Place",
        name: "Pakenham, Victoria, Australia",
      },
      areaServed: {
        "@type": "State",
        name: "Victoria",
      },
      knowsAbout: [
        "Hybrid Flooring",
        "Timber Flooring",
        "Floor Installation",
        "Floor Restoration",
        "Vinyl Flooring",
        "Epoxy Flooring",
        "Floor Polishing",
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutClient />
    </>
  );
}
