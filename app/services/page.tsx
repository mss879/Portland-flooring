import type { Metadata } from "next";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
  title: "Our Services — Flooring Installation, Restoration & More",
  description:
    "Explore Portland Flooring's full range of services including hybrid flooring installation, floor restoration, vinyl, timber, laminate, epoxy flooring, polishing, and custom solutions across Melbourne & Victoria.",
  alternates: {
    canonical: "https://www.portlands.com.au/services",
  },
};

export default function ServicesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    provider: {
      "@type": "LocalBusiness",
      name: "Portland Flooring",
      url: "https://www.portlands.com.au",
      telephone: "+61420608608",
      address: {
        "@type": "PostalAddress",
        streetAddress: "2B Venture Way",
        addressLocality: "Pakenham",
        addressRegion: "VIC",
        postalCode: "3810",
        addressCountry: "AU",
      },
    },
    serviceType: "Flooring Services",
    areaServed: {
      "@type": "State",
      name: "Victoria",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Flooring Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Flooring Installation" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Floor Restoration" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Vinyl Flooring" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Timber Flooring" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Laminate Flooring" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Epoxy Flooring" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Tile & Carpet" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Floor Polishing" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Floor Repairs" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Customised Solutions" } },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServicesClient />
    </>
  );
}
