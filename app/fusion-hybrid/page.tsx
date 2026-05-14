import type { Metadata } from "next";
import FusionHybridClient from "./FusionHybridClient";

export const metadata: Metadata = {
  title: "Waterproof SPC Flooring — Scratch-Resistant, Pet & Kid-Friendly",
  description:
    "Discover Portland's Premium Hybrid range — 100% waterproof SPC core, scratch-resistant, pet & kid-friendly. Built to last with authentic timber aesthetics. View colours, specs & installation info.",
  alternates: {
    canonical: "https://portlands.com.au/fusion-hybrid",
  },
};

export default function FusionHybridPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Portland Premium Hybrid Flooring",
    url: "https://portlands.com.au/fusion-hybrid",
    image: "https://portlands.com.au/fusion-hero.webp",
    description:
      "Premium hybrid flooring with SPC stone-polymer composite core — 100% waterproof, scratch-resistant, pet & kid-friendly with authentic timber aesthetics.",
    brand: {
      "@type": "Brand",
      name: "Portland Flooring",
    },
    manufacturer: {
      "@type": "Organization",
      name: "Portland Flooring",
    },
    category: "Hybrid Flooring",
    material: "Stone Polymer Composite (SPC)",
    additionalProperty: [
      { "@type": "PropertyValue", name: "Waterproof", value: "Yes — 100% SPC core" },
      { "@type": "PropertyValue", name: "Scratch Resistant", value: "Yes — AC5 rated" },
      { "@type": "PropertyValue", name: "Pet Friendly", value: "Yes" },
      { "@type": "PropertyValue", name: "Kid Friendly", value: "Yes" },
      { "@type": "PropertyValue", name: "Installation", value: "Click-lock floating floor" },
    ],
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      areaServed: {
        "@type": "Country",
        name: "Australia",
      },
      seller: {
        "@type": "LocalBusiness",
        name: "Portland Flooring",
        telephone: "+61420608608",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FusionHybridClient />
    </>
  );
}
