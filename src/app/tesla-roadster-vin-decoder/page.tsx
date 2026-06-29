import type { Metadata } from "next";
import TeslaRoadsterVinDecoderBody from "@/components/TeslaRoadsterVinDecoderBody";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

const FAQS_EN = [
  { question: "How do I decode a Tesla Roadster VIN?", answer: "To decode a Tesla Roadster VIN, find the 17-character Vehicle Identification Number on the lower driver-side corner of the windshield, the door jamb sticker, the Tesla title, or the insurance card. Enter it into the free Roadster decoder on this page. The tool first validates that the string is exactly 17 characters and excludes the disallowed letters I, O, Q, then queries NMVTIS for title brand and salvage history and the NHTSA recall feed for any open Roadster safety recalls. Results return in seconds with no account or credit card required." },
  { question: "How many 1st-gen Tesla Roadsters were built?", answer: "Tesla produced approximately 2,400 first-generation Roadsters between 2008 and 2012. The car was built on a stretched Lotus Elise platform with chassis assembly performed by Lotus at Hethel in the UK; Tesla installed the AC Propulsion-derived electric drivetrain at its Menlo Park facility and (after 2010) at the Fremont plant. Because the production run is so small, every surviving 1st-gen Roadster benefits from VIN-level verification before a sale." },
  { question: "What WMI does the original Tesla Roadster use?", answer: "Modern Teslas built at Gigafactory California use the 5YJ WMI, but the original 2008-2012 Roadster used a different VIN format because the chassis was assembled at Lotus Hethel in the UK rather than at a Tesla US plant. Pre-2010 Roadster build numbers vary by chassis batch — early Signature 100 cars, Sport, 2.0, and 2.5 revisions each used distinct sequence ranges." },
  { question: "When does the 2nd-gen Tesla Roadster ship?", answer: "Tesla opened reservations for the second-generation Roadster in 2017 and the production date has been pushed back multiple times. The decoder on this page works for any 17-character Roadster VIN that has been issued, whether or not the car has actually been delivered. Always validate a 2nd-gen Roadster VIN before paying any deposit for a transferred reservation slot." },
  { question: "Is the Tesla Roadster VIN decoder free?", answer: "Yes. Our Tesla Roadster VIN decoder is free, with no sign-up, no credit card, and no hidden charges. You enter the 17-character VIN and we return the decoded specs, the title-brand summary from NMVTIS, and any open recall campaigns from NHTSA. A paid full history report is available if you need every line item." },
  { question: "Where is the VIN on a Tesla Roadster?", answer: "Every US-market Tesla Roadster prints the VIN in at least four places: the lower driver-side windshield, the driver-side door jamb sticker, the Tesla title document, and the insurance ID card. On 1st-gen Roadsters there is also a chassis number stamped on the aluminum bonded tub left over from Lotus Hethel assembly — comparing that stamp against the paperwork is a useful provenance check." },
  { question: "Can a VIN decoder confirm 1st-gen Roadster drivetrain revision?", answer: "Yes. The 1st-gen Roadster moved through several drivetrain revisions between 2008 and 2012 — including the 1.5 update, the Sport variant, the 2.0 platform, and the 2.5 refresh. A Tesla Roadster VIN decoder reads the chassis batch and equipment fields to identify which revision the car left the factory with, which directly affects service parts, motor controller software compatibility, and collector resale value." },
];

export const metadata: Metadata = {
  title: "Tesla Roadster VIN Decoder — Free 1st-Gen & 2nd-Gen Lookup",
  description: "Free Tesla Roadster VIN decoder. Enter any 17-character 1st-gen (2008-2012) or 2nd-gen Roadster VIN for decoded specs, title brands, and open NHTSA recalls.",
  keywords: ["tesla roadster vin decoder", "tesla roadster vin lookup", "1st gen roadster vin", "2nd gen tesla roadster vin", "tesla roadster decoder", "tesla roadster vin check", "tesla roadster history", "tesla roadster salvage check", "tesla roadster nhtsa recall", "tesla roadster sport vin", "tesla roadster 2.5 vin"],
  alternates: { canonical: "/tesla-roadster-vin-decoder" },
  openGraph: { title: "Tesla Roadster VIN Decoder — Free 1st-Gen & 2nd-Gen Lookup", description: "Free Tesla Roadster VIN decoder for 1st-gen (2008-2012) and 2nd-gen cars. Decoded specs, title brands, and open NHTSA recalls — instantly. NMVTIS-sourced.", url: `${SITE}/tesla-roadster-vin-decoder`, type: "article", siteName: "CarCheckerVIN" },
  twitter: { card: "summary_large_image", title: "Tesla Roadster VIN Decoder — Free 1st-Gen & 2nd-Gen Lookup", description: "Free Tesla Roadster VIN decoder for 1st-gen and 2nd-gen cars. Decoded specs, title brands, NHTSA recalls. NMVTIS-sourced." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", name: "Tesla Roadster VIN Decoder", url: `${SITE}/tesla-roadster-vin-decoder`, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Free Tesla Roadster VIN decoder for the 1st-generation Roadster (2008-2012, ~2,400 units, Lotus Elise platform, AC Propulsion-derived drivetrain) and the 2nd-generation Roadster (reservations opened 2017). Returns decoded specs, NMVTIS title brand history, and open NHTSA recall campaigns.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: "Tesla Roadster VIN Decoder — Free 1st-Gen & 2nd-Gen Lookup", description: "What a free Tesla Roadster VIN decoder shows, how the original Lotus-built chassis and Tesla powertrain affect VIN format, and how to use the result before buying a 1st-gen or 2nd-gen Roadster.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/tesla-roadster-vin-decoder` }, datePublished: "2026-06-29", dateModified: new Date().toISOString().slice(0, 10) };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS_EN.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const howToSchema = { "@context": "https://schema.org", "@type": "HowTo", name: "How to Decode a Tesla Roadster VIN for Free", description: "Decode any 17-character Tesla Roadster VIN — 1st-gen 2008-2012 or 2nd-gen — to see decoded specs, title brand history, and open NHTSA recalls in seconds.", totalTime: "PT1M", step: [
  { "@type": "HowToStep", position: 1, name: "Find the 17-character Roadster VIN", text: "Read the VIN from the lower driver-side corner of the windshield, the door jamb sticker, the Tesla title, or the insurance card. Confirm it is 17 characters with no letters I, O, or Q." },
  { "@type": "HowToStep", position: 2, name: "Enter the VIN into the Roadster decoder", text: "Type or paste the Tesla Roadster VIN into the free decoder. The tool validates the format before it runs." },
  { "@type": "HowToStep", position: 3, name: "Review the decoded specs and history", text: "See the decoded year, chassis batch, and drivetrain revision alongside title brands, salvage records, and any open Roadster recalls pulled from NMVTIS and NHTSA." },
  { "@type": "HowToStep", position: 4, name: "Use the result to decide", text: "Treat the Roadster VIN decoder as your first checkpoint. If anything looks off, order a full VIN history report or arrange a specialist inspection before you buy." },
] };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE }, { "@type": "ListItem", position: 2, name: "Tesla Roadster VIN Decoder", item: `${SITE}/tesla-roadster-vin-decoder` }] };
const speakableSchema = { "@context": "https://schema.org", "@type": "WebPage", speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] }, url: `${SITE}/tesla-roadster-vin-decoder` };

export default function TeslaRoadsterVinDecoderPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <TeslaRoadsterVinDecoderBody />
    </>
  );
}
