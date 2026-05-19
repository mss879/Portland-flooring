import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Us — Australian-Owned Flooring Specialists",
  description:
    "Learn about Portland Flooring's commitment to premium craftsmanship and sustainable materials. Family-owned and Australian-operated, delivering quality flooring solutions across Pakenham, Melbourne & Victoria.",
  alternates: {
    canonical: "https://www.portlands.com.au/about",
  },
};

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Portland Flooring",
    url: "https://www.portlands.com.au/about",
    description:
      "Learn about Portland Flooring's commitment to premium craftsmanship, expert flooring installation, and sustainable materials.",
    mainEntity: {
      "@type": "Organization",
      name: "Portland Flooring",
      url: "https://www.portlands.com.au",
      logo: "https://www.portlands.com.au/portland-logo.webp",
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
