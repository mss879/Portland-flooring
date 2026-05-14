import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us — Visit Our Pakenham Showroom",
  description:
    "Get in touch with Portland Flooring. Visit our showroom at 2B Venture Way, Pakenham VIC 3810. Call +61 420 608 608 or email sales@portlands.com.au for a free consultation.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
