import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us — Visit Our Braeside Showroom",
  description:
    "Get in touch with Portland Flooring. Visit our showroom at 1-19 Industrial Drive, Braeside VIC 3195. Call +61 420 608 608 or email info@portlands.com.au for a free consultation.",
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
      email: "info@portlands.com.au",
      url: "https://www.portlands.com.au",
      address: {
        "@type": "PostalAddress",
        streetAddress: "1-19 Industrial Drive",
        addressLocality: "Braeside",
        addressRegion: "VIC",
        postalCode: "3195",
        addressCountry: "AU",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: -37.9635,
        longitude: 145.0635,
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
