import type { Metadata } from "next";
import TeslaModel3RecallCheckBody from "@/components/TeslaModel3RecallCheckBody";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

const FAQS_EN = [
  { question: "Does the Tesla Model 3 have open recalls?", answer: "Yes. Multiple Tesla Model 3 NHTSA recall campaigns remain active as of 2026, including the Dec 2023 Autopilot remediation (campaign 23V-838, approximately 2 million Teslas across Model S, 3, X, and Y), the Jan 2024 power steering campaign that affected approximately 334,000 Model 3 and Model Y units from the 2023 build window, and the Feb 2024 touchscreen-visibility recall (24V-051, approximately 2.2 million vehicles). Whether a specific Model 3 VIN is included in any of those campaigns depends on production date and plant — the only way to know for sure is to run the VIN through the recall check on this page." },
  { question: "Are Tesla Model 3 recall repairs free?", answer: "Yes. Under 49 U.S.C. § 30120, all manufacturer safety recall remedies are free for vehicles 15 model years old or newer, regardless of whether the current owner is the original purchaser. Every Model 3 ever built (production began 2017) is well inside the 15-year federal free-repair window. The remedy is free whether delivered as an over-the-air software update or as a parts replacement at a Tesla service center." },
  { question: "How do I check Tesla Model 3 recalls by VIN?", answer: "Find the 17-character Model 3 VIN on the lower driver-side windshield, the door jamb sticker, the Tesla title, or the insurance card, then enter it into the free Model 3 recall check form on this page. The tool validates the format, then queries the live NHTSA campaign database for every open Model 3 recall attached to your specific VIN. Results return in seconds and include the campaign ID, the defect description, the remedy type, and the federal free-repair window." },
  { question: "What is the Tesla Model 3 Autopilot recall?", answer: "NHTSA campaign 23V-838, issued in December 2023, is the largest Tesla recall in NHTSA history — approximately 2 million Teslas across Model S, Model 3, Model X, and Model Y. The remedy added driver-engagement controls to Autopilot to address concerns that the system could be used in conditions outside its intended operational domain. It was delivered as a free over-the-air software update, with no dealer visit required. The campaign remains attached to a Model 3 VIN until Tesla reports the OTA update has been installed on that specific car." },
  { question: "Do Tesla over-the-air updates count as recall remedies?", answer: "Yes. An estimated 70%+ of Tesla recall campaigns since 2020 have been remediated by free over-the-air software updates, eliminating the need for a dealer visit on most safety remedies. On the Model 3, the Dec 2023 Autopilot remediation and the Feb 2024 touchscreen-visibility recall were both delivered as free OTA updates. Even when the remedy is OTA, the NHTSA campaign stays attached to the VIN until Tesla reports the update as installed, which is why a VIN-specific recall check is still the right way to confirm status." },
  { question: "How long after a Tesla Model 3 recall before the fix is delivered?", answer: "For OTA-remediable Model 3 campaigns (the majority of recent Tesla recalls), the fix often ships within days or weeks of NHTSA approval, pushed automatically to the car the next time it has a Wi-Fi or cellular connection. For hardware-remedy campaigns like the Jan 2024 power-steering action, Tesla schedules service-center appointments as parts become available, which can take weeks or months depending on regional inventory. The recall check on this page reports the current status against your specific VIN." },
  { question: "What if I bought the Model 3 used?", answer: "Open NHTSA recalls travel with the VIN, not with the owner. If you bought a used Model 3, you inherit any open campaign the previous owner did not complete — and the federal free-repair entitlement transfers with the car. That makes a VIN-specific recall check one of the most important steps in any used Tesla purchase: it tells you exactly which open campaigns are still attached to the specific car you are buying." },
];

export const metadata: Metadata = {
  title: "Tesla Model 3 Recall Check — Free NHTSA VIN Lookup",
  description: "Free Tesla Model 3 recall check. Enter any 17-character Model 3 VIN to see open NHTSA campaigns including Autopilot 23V-838, power steering, and touchscreen 24V-051.",
  keywords: ["tesla model 3 recall check", "tesla model 3 recall", "model 3 recall vin", "model 3 autopilot recall", "tesla model 3 nhtsa", "tesla model 3 vin recall lookup", "tesla 23V-838", "tesla model 3 power steering recall", "tesla model 3 touchscreen recall", "tesla model 3 safety recall"],
  alternates: { canonical: "/tesla-model-3-recall-check" },
  openGraph: { title: "Tesla Model 3 Recall Check — Free NHTSA VIN Lookup", description: "Free Tesla Model 3 recall check by VIN. Live NHTSA campaign feed including Autopilot 23V-838, power steering, and touchscreen 24V-051.", url: `${SITE}/tesla-model-3-recall-check`, type: "article", siteName: "CarCheckerVIN" },
  twitter: { card: "summary_large_image", title: "Tesla Model 3 Recall Check — Free NHTSA VIN Lookup", description: "Free Tesla Model 3 recall check by VIN. Live NHTSA campaign feed for every open Model 3 campaign." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", name: "Tesla Model 3 Recall Check", url: `${SITE}/tesla-model-3-recall-check`, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Free Tesla Model 3 recall check by VIN. Queries the live NHTSA campaign feed for every open Model 3 recall — including the Dec 2023 Autopilot remediation (23V-838), the Jan 2024 power steering campaign, and the Feb 2024 touchscreen-visibility recall (24V-051).", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: "Tesla Model 3 Recall Check — Free NHTSA VIN Lookup", description: "How a Tesla Model 3 recall check works, which NHTSA campaigns currently affect the Model 3, how Tesla delivers OTA versus service-center remedies, and why a VIN-specific check is the only reliable status answer.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/tesla-model-3-recall-check` }, datePublished: "2026-06-29", dateModified: new Date().toISOString().slice(0, 10) };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS_EN.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const howToSchema = { "@context": "https://schema.org", "@type": "HowTo", name: "How to Check Tesla Model 3 Recalls by VIN", description: "Run any 17-character Tesla Model 3 VIN against the live NHTSA recall feed to see every open campaign — Autopilot, power steering, touchscreen, and more.", totalTime: "PT1M", step: [
  { "@type": "HowToStep", position: 1, name: "Find the 17-character Model 3 VIN", text: "Read the VIN from the lower driver-side windshield, the door jamb sticker, the Tesla title, or the insurance card. Confirm it is 17 characters with no letters I, O, or Q." },
  { "@type": "HowToStep", position: 2, name: "Enter the VIN into the recall check", text: "Type or paste the Model 3 VIN into the free recall check form on this page. The tool validates the format before it runs." },
  { "@type": "HowToStep", position: 3, name: "Review the open campaigns", text: "See every open Model 3 NHTSA campaign attached to your specific VIN, the campaign ID, the defect description, and whether the remedy is OTA or service center." },
  { "@type": "HowToStep", position: 4, name: "Schedule the remedy", text: "For OTA campaigns, confirm the update has been installed on your car. For hardware campaigns, schedule the free service-center appointment with Tesla." },
] };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE }, { "@type": "ListItem", position: 2, name: "Tesla Model 3 Recall Check", item: `${SITE}/tesla-model-3-recall-check` }] };
const speakableSchema = { "@context": "https://schema.org", "@type": "WebPage", speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] }, url: `${SITE}/tesla-model-3-recall-check` };

export default function TeslaModel3RecallCheckPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <TeslaModel3RecallCheckBody />
    </>
  );
}
