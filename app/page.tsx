import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  description:
    "Premium hybrid flooring solutions — elegant, durable, sustainable. Expert installation, restoration & design consultation serving Pakenham, Melbourne & all of Victoria. Proudly Australian owned.",
  alternates: {
    canonical: "https://portlands.com.au",
  },
};

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FlooringStore",
    name: "Portland Flooring",
    url: "https://portlands.com.au",
    logo: "https://portlands.com.au/portland-logo.webp",
    image: "https://portlands.com.au/hero-img.webp",
    description:
      "Premium hybrid flooring solutions — elegant, durable, sustainable. Expert installation, restoration & design consultation serving Pakenham, Melbourne & all of Victoria.",
    telephone: "+61420608608",
    email: "sales@portlands.com.au",
    address: {
      "@type": "PostalAddress",
      streetAddress: "2B Venture Way",
      addressLocality: "Pakenham",
      addressRegion: "VIC",
      postalCode: "3810",
      addressCountry: "AU",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -38.0442,
      longitude: 145.4675,
    },
    areaServed: [
      { "@type": "City", name: "Pakenham" },
      { "@type": "City", name: "Melbourne" },
      { "@type": "State", name: "Victoria" },
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:00",
    },
    sameAs: [],
    priceRange: "$$",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeClient />
    </>
  );
}
