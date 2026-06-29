import type { Metadata } from "next";
import TeslaSoftwareUpdateCheckBody, { FAQS_EN } from "@/components/TeslaSoftwareUpdateCheckBody";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: "Tesla Software Update Check — Free Autopilot Hardware (HW2-HW4) by VIN",
  description: "Free Tesla software / firmware lookup. Decode Autopilot hardware revision (HW2, HW2.5, HW3, HW4) by VIN to confirm FSD v12+ eligibility. NMVTIS-approved provider.",
  keywords: ["tesla software update check", "tesla firmware lookup", "tesla autopilot hardware", "tesla hw2", "tesla hw2.5", "tesla hw3", "tesla hw4", "tesla ai4", "tesla fsd computer", "tesla fsd v12", "tesla fsd eligibility", "tesla free supercharging", "tesla vin hardware decoder"],
  alternates: { canonical: "/tesla-software-update-check" },
  openGraph: { title: "Tesla Software Update Check — Free Autopilot Hardware (HW2-HW4) by VIN", description: "Free Tesla software lookup. Decode Autopilot hardware revision (HW2, HW2.5, HW3, HW4) by VIN. Confirm FSD v12+ eligibility before you buy.", url: `${SITE}/tesla-software-update-check`, type: "article", siteName: "CarCheckerVIN" },
  twitter: { card: "summary_large_image", title: "Tesla Software Update Check — Autopilot Hardware by VIN", description: "Free Tesla Autopilot hardware decoder. HW2, HW2.5, HW3, HW4 by VIN. Confirm FSD v12+ eligibility." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", name: "Tesla Software Update Check", url: `${SITE}/tesla-software-update-check`, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Free Tesla software / firmware lookup. Decodes the Autopilot hardware revision (HW2 from 2016-2019, HW2.5 from 2017-2019, HW3 / FSD Computer from April 2019 through early 2024, HW4 / AI4 from late 2023 onward) by VIN. Confirms whether a used Tesla is eligible for Full Self-Driving v12+ — HW2 and HW2.5 are permanently ineligible.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: "Tesla Software Update Check — Free Autopilot Hardware (HW2-HW4) by VIN", description: "How a Tesla software update check decodes Autopilot hardware revisions (HW2, HW2.5, HW3, HW4) by VIN, FSD v12+ eligibility rules, and the early Model S free Supercharging perk.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/tesla-software-update-check` }, datePublished: "2026-06-28", dateModified: new Date().toISOString().slice(0, 10) };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS_EN.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const howToSchema = { "@context": "https://schema.org", "@type": "HowTo", name: "How to Check Tesla Autopilot Hardware by VIN", description: "Decode the Autopilot hardware revision (HW2, HW2.5, HW3, HW4) on any Tesla VIN in seconds.", totalTime: "PT1M", step: [
  { "@type": "HowToStep", position: 1, name: "Find the 17-character Tesla VIN", text: "Read the VIN from the lower driver-side corner of the windshield, the door jamb sticker, the Tesla title, or the MyTesla app." },
  { "@type": "HowToStep", position: 2, name: "Enter the VIN into the Tesla software update check tool", text: "Type or paste the Tesla VIN into the free software lookup form. The tool decodes the model year and maps it to the Autopilot hardware revision Tesla shipped." },
  { "@type": "HowToStep", position: 3, name: "Review the hardware revision and firmware eligibility", text: "See whether the Tesla VIN shipped with HW2, HW2.5, HW3, or HW4 / AI4 — and whether the vehicle is eligible for Full Self-Driving v12+ (HW3 / HW4 only)." },
  { "@type": "HowToStep", position: 4, name: "Confirm exact hardware with Tesla service before FSD purchase", text: "For exact hardware confirmation before paying for FSD or premium pricing, a Tesla service center can read the installed Autopilot computer directly." },
] };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE }, { "@type": "ListItem", position: 2, name: "Tesla Software Update Check", item: `${SITE}/tesla-software-update-check` }] };
const speakableSchema = { "@context": "https://schema.org", "@type": "WebPage", speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] }, url: `${SITE}/tesla-software-update-check` };

export default function TeslaSoftwareUpdateCheckPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <TeslaSoftwareUpdateCheckBody />
    </>
  );
}
