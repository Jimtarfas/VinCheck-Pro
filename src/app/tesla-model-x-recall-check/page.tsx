import type { Metadata } from "next";
import TeslaModelXRecallCheckBody from "@/components/TeslaModelXRecallCheckBody";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

const FAQS_EN = [
  { question: "Does the Tesla Model X have open recalls?", answer: "Yes. Multiple Tesla Model X NHTSA recall campaigns remain active as of 2026, including the Dec 2023 Autopilot remediation (campaign 23V-838, approximately 2 million Teslas across Model S, 3, X, and Y), the June 2023 front-trunk hood-latch recall (23V-376) covering a Model S and Model X subset, and the Feb 2024 touchscreen-visibility recall (24V-051, approximately 2.2 million vehicles). Early-MX build windows (2016-2017) were also subject to historical suspension-related campaigns. Whether a specific Model X VIN is included depends on production date — the only way to know for sure is to run the VIN through the recall check on this page." },
  { question: "Are Tesla Model X recall repairs free?", answer: "Yes. Under 49 U.S.C. § 30120, all manufacturer safety recall remedies are free for vehicles 15 model years old or newer, regardless of who currently owns the car. Every Model X ever built (production began 2015) is well inside the 15-year federal free-repair window. The remedy is free whether delivered as an over-the-air software update or as a parts replacement at a Tesla service center." },
  { question: "How do I check Tesla Model X recalls by VIN?", answer: "Find the 17-character Model X VIN on the lower driver-side windshield, the door jamb sticker, the Tesla title, or the insurance card, then enter it into the free Model X recall check form on this page. The tool validates the format, then queries the live NHTSA campaign database for every open Model X recall attached to your specific VIN." },
  { question: "What is the Tesla Model X Autopilot recall?", answer: "NHTSA campaign 23V-838, issued in December 2023, is the largest Tesla recall in NHTSA history — approximately 2 million Teslas across Model S, Model 3, Model X, and Model Y. The remedy added driver-engagement controls to Autopilot. It was delivered as a free over-the-air software update, with no service-center visit required." },
  { question: "Do Tesla over-the-air updates count as Model X recall remedies?", answer: "Yes. An estimated 70%+ of Tesla recall campaigns since 2020 have been remediated by free over-the-air software updates. On the Model X, the Dec 2023 Autopilot remediation and the Feb 2024 touchscreen-visibility recall were both delivered as OTA. Hardware actions like the June 2023 hood-latch recall (23V-376) and any historical early-MX suspension campaign still require a service-center visit." },
  { question: "How long after a Tesla Model X recall before the fix is delivered?", answer: "For OTA-remediable Model X campaigns, the fix often ships within days or weeks of NHTSA approval, pushed automatically to the car the next time it has a Wi-Fi or cellular connection. For hardware-remedy campaigns like the June 2023 hood-latch action or an early-MX suspension recall, Tesla schedules service-center appointments as parts become available." },
  { question: "What if I bought the Model X used?", answer: "Open NHTSA recalls travel with the VIN, not with the owner. If you bought a used Model X, you inherit any open campaign the previous owner did not complete — and the federal free-repair entitlement transfers with the car. A VIN-specific recall check is the cleanest way to confirm exactly which open campaigns are still attached to your specific Model X." },
];

export const metadata: Metadata = {
  title: "Tesla Model X Recall Check — Free NHTSA VIN Lookup",
  description: "Free Tesla Model X recall check. Enter any 17-character Model X VIN to see open NHTSA campaigns — Autopilot 23V-838, hood latch 23V-376, touchscreen, suspension.",
  keywords: ["tesla model x recall check", "tesla model x recall", "model x recall vin", "model x autopilot recall", "tesla model x nhtsa", "tesla model x hood latch recall", "tesla model x suspension recall", "tesla model x touchscreen recall", "tesla model x falcon wing recall", "tesla model x safety recall"],
  alternates: { canonical: "/tesla-model-x-recall-check" },
  openGraph: { title: "Tesla Model X Recall Check — Free NHTSA VIN Lookup", description: "Free Tesla Model X recall check by VIN. Live NHTSA feed including Autopilot 23V-838, hood-latch 23V-376, touchscreen 24V-051, and early-MX suspension.", url: `${SITE}/tesla-model-x-recall-check`, type: "article", siteName: "CarCheckerVIN" },
  twitter: { card: "summary_large_image", title: "Tesla Model X Recall Check — Free NHTSA VIN Lookup", description: "Free Tesla Model X recall check by VIN. Live NHTSA feed for every open Model X campaign." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", name: "Tesla Model X Recall Check", url: `${SITE}/tesla-model-x-recall-check`, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Free Tesla Model X recall check by VIN. Queries the live NHTSA campaign feed for every open Model X recall — including the Dec 2023 Autopilot remediation (23V-838), the June 2023 front-trunk hood-latch recall (23V-376), the Feb 2024 touchscreen-visibility recall (24V-051), and historical 2016-2017 early-MX suspension campaigns.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: "Tesla Model X Recall Check — Free NHTSA VIN Lookup", description: "How a Tesla Model X recall check works, which NHTSA campaigns currently affect the Model X, how Tesla delivers OTA versus service-center remedies, and why a VIN-specific check is the only reliable status answer.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/tesla-model-x-recall-check` }, datePublished: "2026-06-29", dateModified: new Date().toISOString().slice(0, 10) };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS_EN.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const howToSchema = { "@context": "https://schema.org", "@type": "HowTo", name: "How to Check Tesla Model X Recalls by VIN", description: "Run any 17-character Tesla Model X VIN against the live NHTSA recall feed to see every open campaign — Autopilot, hood latch, touchscreen, suspension.", totalTime: "PT1M", step: [
  { "@type": "HowToStep", position: 1, name: "Find the 17-character Model X VIN", text: "Read the VIN from the lower driver-side windshield, the door jamb sticker, the Tesla title, or the insurance card. Confirm it is 17 characters with no letters I, O, or Q." },
  { "@type": "HowToStep", position: 2, name: "Enter the VIN into the recall check", text: "Type or paste the Model X VIN into the free recall check form. The tool validates the format before it runs." },
  { "@type": "HowToStep", position: 3, name: "Review the open campaigns", text: "See every open Model X NHTSA campaign attached to your specific VIN, the campaign ID, the defect description, and whether the remedy is OTA or service center." },
  { "@type": "HowToStep", position: 4, name: "Schedule the remedy", text: "For OTA campaigns, confirm the update has been installed on your car. For hardware campaigns, schedule the free service-center appointment with Tesla." },
] };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE }, { "@type": "ListItem", position: 2, name: "Tesla Model X Recall Check", item: `${SITE}/tesla-model-x-recall-check` }] };
const speakableSchema = { "@context": "https://schema.org", "@type": "WebPage", speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] }, url: `${SITE}/tesla-model-x-recall-check` };

export default function TeslaModelXRecallCheckPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <TeslaModelXRecallCheckBody />
    </>
  );
}
