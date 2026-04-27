import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Portland Flooring | Premium Hybrid Flooring in Pakenham VIC",
  description: "Premium hybrid flooring solutions — elegant, durable, sustainable. Serving Pakenham, Melbourne & all of Victoria.",
  openGraph: {
    title: "Portland Flooring | Premium Hybrid Flooring",
    description: "Premium hybrid flooring solutions — elegant, durable, sustainable. Serving Pakenham, Melbourne & all of Victoria.",
    images: ["/opengraph-image.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portland Flooring | Premium Hybrid Flooring",
    description: "Premium hybrid flooring solutions — elegant, durable, sustainable.",
    images: ["/opengraph-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
