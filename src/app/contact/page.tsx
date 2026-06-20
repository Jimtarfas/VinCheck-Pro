import type { Metadata } from "next";
import ContactPageBody from "@/components/ContactPageBody";

export const metadata: Metadata = {
  title: "Contact Us — Get in Touch",
  description:
    "Contact CarCheckerVIN for support, partnerships, press inquiries, or legal questions. Email, phone, and message form — our team replies within 24 hours.",
  keywords: [
    "contact carcheckervin",
    "vin check support",
    "vehicle history contact",
    "carcheckervin partnerships",
    "carcheckervin press",
  ],
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact CarCheckerVIN — Support, Partnerships & Press",
    description:
      "Reach the CarCheckerVIN team for help with VIN lookups, vehicle history reports, partnerships, press, or legal inquiries.",
    url: "https://www.carcheckervin.com/contact",
    type: "website",
  },
};

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact CarCheckerVIN",
  url: "https://www.carcheckervin.com/contact",
  description:
    "Contact CarCheckerVIN for support, partnerships, press, and legal inquiries.",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "CarCheckerVIN",
  url: "https://www.carcheckervin.com",
  logo: "https://www.carcheckervin.com/icon.svg",
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+15642123985",
      contactType: "customer support",
      email: "contact@carcheckervin.com",
      areaServed: "US",
      availableLanguage: ["English", "Spanish"],
      hoursAvailable: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    },
  ],
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <ContactPageBody locale="en" />
    </>
  );
}
