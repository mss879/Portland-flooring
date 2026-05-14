import type { Metadata } from "next";
import ProductsClient from "./ProductsClient";

export const metadata: Metadata = {
  title: "Timber & Hybrid Flooring Collections — European Oak, Spotted Gum & More",
  description:
    "Browse Portland Flooring's curated collections of timber and engineered flooring. European Oak, Spotted Gum, Blackbutt — all Australian-stocked and ready for your space.",
  alternates: {
    canonical: "https://portlands.com.au/products",
  },
};

export default function ProductsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Portland Flooring Collections",
    url: "https://portlands.com.au/products",
    description:
      "Curated collections of premium hybrid and timber flooring available in Australia.",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          item: {
            "@type": "Product",
            name: "European Oak Collection",
            description: "Premium European Oak hybrid flooring with authentic grain patterns.",
            brand: { "@type": "Brand", name: "Portland Flooring" },
          },
        },
        {
          "@type": "ListItem",
          position: 2,
          item: {
            "@type": "Product",
            name: "Spotted Gum Collection",
            description: "Australian Spotted Gum hybrid flooring with rich natural tones.",
            brand: { "@type": "Brand", name: "Portland Flooring" },
          },
        },
        {
          "@type": "ListItem",
          position: 3,
          item: {
            "@type": "Product",
            name: "Blackbutt Collection",
            description: "Classic Australian Blackbutt hybrid flooring — warm and versatile.",
            brand: { "@type": "Brand", name: "Portland Flooring" },
          },
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductsClient />
    </>
  );
}
