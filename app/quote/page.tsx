import type { Metadata } from "next";
import QuoteClient from "./QuoteClient";

export const metadata: Metadata = {
  title: "Get a Free Quote — Custom Flooring Estimate",
  description:
    "Request a free, no-obligation flooring quote from Portland Flooring. Tell us about your project and our specialists will provide a tailored proposal within 24 hours. Serving Braeside, Melbourne & Victoria.",
  alternates: {
    canonical: "https://www.portlands.com.au/quote",
  },
};

export default function QuotePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Get a Free Flooring Quote",
    url: "https://www.portlands.com.au/quote",
    description:
      "Request a free, no-obligation flooring quote from Portland Flooring. Tailored proposals within 24 hours.",
    provider: {
      "@type": "LocalBusiness",
      name: "Portland Flooring",
      telephone: "+61420608608",
      email: "info@portlands.com.au",
      address: {
        "@type": "PostalAddress",
        streetAddress: "1-19 Industrial Drive",
        addressLocality: "Braeside",
        addressRegion: "VIC",
        postalCode: "3195",
        addressCountry: "AU",
      },
    },
    potentialAction: {
      "@type": "QuoteAction",
      target: "https://www.portlands.com.au/quote",
      name: "Request a Free Quote",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <QuoteClient />
    </>
  );
}
