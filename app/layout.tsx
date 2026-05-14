import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://portlands.com.au"),
  title: {
    default: "Portland Flooring | Premium Hybrid Flooring in Pakenham VIC",
    template: "%s | Portland Flooring",
  },
  description:
    "Premium hybrid flooring solutions — elegant, durable, sustainable. Expert installation, restoration & design consultation serving Pakenham, Melbourne & all of Victoria.",
  keywords: [
    "hybrid flooring",
    "premium flooring",
    "flooring installation",
    "Pakenham flooring",
    "Melbourne flooring",
    "Victoria flooring",
    "SPC flooring",
    "timber flooring",
    "Premium Hybrid",
    "Portland Flooring",
    "floor restoration",
    "waterproof flooring",
  ],
  authors: [{ name: "Portland Flooring" }],
  creator: "Portland Flooring",
  publisher: "Portland Flooring",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "https://portlands.com.au",
    siteName: "Portland Flooring",
    title: "Portland Flooring | Premium Hybrid Flooring",
    description:
      "Premium hybrid flooring solutions — elegant, durable, sustainable. Serving Pakenham, Melbourne & all of Victoria.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portland Flooring | Premium Hybrid Flooring",
    description:
      "Premium hybrid flooring solutions — elegant, durable, sustainable. Serving Pakenham, Melbourne & Victoria.",
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
