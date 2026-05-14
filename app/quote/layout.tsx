import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get a Free Quote — Custom Flooring Estimate",
  description:
    "Request a free, no-obligation flooring quote from Portland Flooring. Tell us about your project and our specialists will provide a tailored proposal within 24 hours.",
};

export default function QuoteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
