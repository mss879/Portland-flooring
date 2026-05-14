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

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What makes Premium Hybrid flooring different from standard vinyl or laminate?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Premium Hybrid is the fastest-growing flooring option, combining the best of laminate and vinyl with a stunning timber look. It features the most stable and 100% waterproof core available worldwide, offering exceptional durability and clarity without splintering or warping.",
        },
      },
      {
        "@type": "Question",
        name: "Is your flooring safe for my family and the environment?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Absolutely. Our Premium Hybrid SPC flooring is completely Eco-Friendly and Floorscore Certified. It contains no heavy metals, phthalates, or methanol. Furthermore, it is CE Certified, guaranteeing it meets the highest standards for health, safety, and environmental protection.",
        },
      },
      {
        "@type": "Question",
        name: "Does the flooring require an additional underlay for noise reduction?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No, it does not. Our Premium Hybrid range comes with built-in Acoustic Backing that is industry-leading and 6-Star rated for noise reduction. This built-in cushioning also makes the floor significantly softer and warmer underfoot compared to natural stone or wood.",
        },
      },
      {
        "@type": "Question",
        name: "How do I maintain and care for my new hybrid floors?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Maintenance is minimal thanks to our surface coating technology—no extra surface treatments are needed. Simply vacuum or sweep regularly and mop occasionally. To protect your investment, we recommend using protective pads on furniture, trimming pet claws, and minimizing direct UV sunlight exposure by covering windows during peak hours.",
        },
      },
      {
        "@type": "Question",
        name: "Can the flooring be installed over my existing floors?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Our Premium Hybrid boards utilize the Uniclic 2G click system, making them quick and easy to install directly over most existing hard floors, saving you significant time and preparation costs.",
        },
      },
      {
        "@type": "Question",
        name: "Can I install this flooring in wet areas like bathrooms?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! Premium Hybrid is 100% waterproof and stain-resistant. It stands up to all spills, making it the perfect seamless flooring solution for kitchens, bathrooms, and laundries.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <HomeClient />
    </>
  );
}
