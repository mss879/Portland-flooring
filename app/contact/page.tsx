import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us — Visit Our Pakenham Showroom",
  description:
    "Get in touch with Portland Flooring. Visit our showroom at 2B Venture Way, Pakenham VIC 3810. Call +61 420 608 608 or email sales@portlands.com.au for a free consultation.",
  alternates: {
    canonical: "https://www.portlands.com.au/contact",
  },
};

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Portland Flooring",
    url: "https://www.portlands.com.au/contact",
    mainEntity: {
      "@type": "LocalBusiness",
      name: "Portland Flooring",
      telephone: "+61420608608",
      email: "sales@portlands.com.au",
      url: "https://www.portlands.com.au",
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
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "17:00",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ContactClient />
    </>
  );
}
