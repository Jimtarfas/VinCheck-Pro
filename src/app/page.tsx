import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import RecentReportsSection from "@/components/RecentReportsSection";
import HowItWorks from "@/components/HowItWorks";
import ReportIncludedSection from "@/components/ReportIncludedSection";
import FeaturesSection from "@/components/FeaturesSection";
import AIFeaturesSection from "@/components/AIFeaturesSection";
import ComparisonSection from "@/components/ComparisonSection";
import PricingSection from "@/components/PricingSection";
import Reviews from "@/components/Reviews";
import SellerSection from "@/components/SellerSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";

// `speakable` marks specific answers as eligible for Google Assistant + voice
// surfaces (including AI Overviews' audio playback). It's the only schema
// feature Google explicitly ties to voice/AI surface eligibility, and it
// signals to the RAG retriever which passages are self-contained answers.
// CSS selector + xpath both provided per Google's recommendation.
const SITE = "https://www.carcheckervin.com";

// `isPartOf` binds the FAQPage to the same WebSite entity declared in the
// root layout, so Google treats the homepage's FAQ as part of the brand's
// knowledge graph instead of a floating page-level fact set. `about` adds
// a topical anchor — the FAQ is *about* our VIN-check service entity.
const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${SITE}/#faqpage`,
  isPartOf: { "@id": `${SITE}#website` },
  about: { "@id": `${SITE}#service` },
  inLanguage: "en-US",
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: [".faq-question", ".faq-answer"],
  },
  // Freshness hint for Google's RAG layer — the AI guide explicitly says
  // generative features rely on "up-to-date web pages" pulled by core
  // ranking. dateModified is cheap, defensible, and re-evaluated on each
  // deploy because page.tsx is statically rendered at build time.
  dateModified: new Date().toISOString().split("T")[0],
  mainEntity: [
    { "@type": "Question", name: "What is a VIN and where can I find it?", acceptedAnswer: { "@type": "Answer", text: "A Vehicle Identification Number (VIN) is a unique 17-character code assigned to every motor vehicle. You can find it on the driver-side dashboard (visible through the windshield), the driver-side door jamb sticker, your vehicle registration, or insurance documents." } },
    { "@type": "Question", name: "What information is included in a VIN check report?", acceptedAnswer: { "@type": "Answer", text: "Our VIN check reports include complete vehicle specifications (engine, transmission, drivetrain), all factory-installed options and equipment, market value estimates, recall information, real vehicle photos, and detailed technical data sourced from NMVTIS and manufacturer databases." } },
    { "@type": "Question", name: "How quickly will I receive my VIN report?", acceptedAnswer: { "@type": "Answer", text: "VIN reports are generated instantly — typically in under 60 seconds. Once your VIN is decoded, you'll see the full vehicle history report immediately on screen." } },
    { "@type": "Question", name: "Which vehicles are covered by your VIN decoder?", acceptedAnswer: { "@type": "Answer", text: "We cover vehicles manufactured from 1981 onwards (when the 17-character VIN standard was adopted). This includes cars, trucks, SUVs, and vans from all major manufacturers worldwide including Toyota, Ford, Honda, Chevrolet, BMW, Mercedes-Benz, and more." } },
    { "@type": "Question", name: "Is a VIN check useful for sellers too?", acceptedAnswer: { "@type": "Answer", text: "Absolutely! Sellers use VIN check reports to document vehicle condition, build buyer confidence, and justify asking prices. A clean vehicle report can help you sell faster and at a higher price." } },
    { "@type": "Question", name: "How is your VIN check different from free VIN decoders?", acceptedAnswer: { "@type": "Answer", text: "Free VIN decoders typically only show basic make/model/year info. Our VIN checker provides comprehensive data including full equipment lists, factory options, engine specifications, transmission details, real vehicle photos, market valuations, and comparable dealer listings sourced from trusted industry databases." } },
    { "@type": "Question", name: "What does a VIN number tell you?", acceptedAnswer: { "@type": "Answer", text: "A VIN number reveals the vehicle's country of origin, manufacturer, vehicle type, engine size, model year, assembly plant, and unique serial number. When decoded through our service, it also reveals detailed specs, equipment, pricing, photos, and history." } },
    { "@type": "Question", name: "Is this VIN check service really free?", acceptedAnswer: { "@type": "Answer", text: "Yes — and for a limited time every single plan is completely free, including full premium reports with history, market values, photos, and detailed analysis. No credit card required. Regular pricing (starting at $14.99) resumes when the promotion ends." } },
    { "@type": "Question", name: "How is CarCheckerVIN different from Carfax?", acceptedAnswer: { "@type": "Answer", text: "CarCheckerVIN offers the same core data sources Carfax uses (NMVTIS, NICB, manufacturer records) but at a fraction of the cost ($14.99 vs $44.99 for a single report). We focus on transparency, instant results, and real photos. See our full comparison on our Carfax alternative page." } },
    { "@type": "Question", name: "Can a VIN check tell me if a car was stolen?", acceptedAnswer: { "@type": "Answer", text: "Yes. Our reports cross-reference the VIN against the National Insurance Crime Bureau (NICB) database. If a vehicle is reported stolen and not yet recovered — or has been recovered as a salvage total loss — the report will flag it." } },
    { "@type": "Question", name: "Will a VIN check show me odometer rollback?", acceptedAnswer: { "@type": "Answer", text: "Premium reports show all reported mileage readings from inspections, title transfers, and service records. Inconsistencies in the timeline are a strong indicator of odometer fraud, which costs U.S. consumers over $1 billion per year." } },
    { "@type": "Question", name: "What happens if no data is found for a VIN?", acceptedAnswer: { "@type": "Answer", text: "Most pre-1981 vehicles don't have a 17-character VIN and can't be decoded. Some private-use vehicles or vehicles with very limited title history may also have minimal data. If your premium report comes back with no usable information, we offer a full refund." } },
    { "@type": "Question", name: "Do I need an account to run a VIN check?", acceptedAnswer: { "@type": "Answer", text: "No account is required to run a free VIN decode. An account is only needed if you want to save reports to your dashboard, set up vehicle watchlists, or run reports in bulk." } },
  ],
};

// Promotional phrases ("Limited-Time Free", "Sale", "% off") are explicitly
// banned from structured-data `name` fields per Google's Merchant / Offer
// guidelines. The price ("0") already communicates "free" to crawlers; promo
// context belongs in the description, which Google reads but doesn't enforce
// as strictly.
// ── Product = the rated deliverable ────────────────────────────────────────
// The Vehicle History Report is what users actually receive and rate. Per
// Google's review-snippet policy, Product IS on the supported types list, so
// this is the policy-compliant home for aggregateRating + individual reviews.
//
// Hierarchy reads: Service (CarCheckerVIN) → produces → Product (Report);
// the SoftwareApplication entity in layout.tsx is intentionally rating-free
// because it's the tool, not the rated deliverable.
const productLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": `${SITE}/#vehicle-history-report`,
  name: "Vehicle History Report",
  description: "Comprehensive VIN-decoded vehicle history report including title status, accidents, mileage records, recalls, market value, and ownership data.",
  category: "Vehicle History Report",
  brand: { "@type": "Brand", name: "CarCheckerVIN" },
  // Cross-entity links — closes the "deliverable ↔ service ↔ company" loop
  // declared in layout.tsx. `isRelatedTo` is the schema.org-sanctioned way
  // to express the Product/Service pairing without overloading Product type.
  isRelatedTo: { "@id": `${SITE}#service` },
  manufacturer: { "@id": `${SITE}#organization` },
  offers: [
    { "@type": "Offer", name: "Free VIN Decode", price: "0", priceCurrency: "USD", availability: "https://schema.org/InStock", url: "https://www.carcheckervin.com/", description: "Year, make, model, engine, and basic spec decode at no cost." },
    { "@type": "Offer", name: "Single Premium Report", price: "0", priceCurrency: "USD", availability: "https://schema.org/InStock", url: "https://www.carcheckervin.com/#pricing", description: "Full vehicle history report. Currently free during the launch promotion (regular price $14.99)." },
    { "@type": "Offer", name: "5-Pack Bundle", price: "0", priceCurrency: "USD", availability: "https://schema.org/InStock", url: "https://www.carcheckervin.com/#pricing", description: "Five premium reports. Currently free during the launch promotion." },
  ],
  // aggregateRating MUST accompany any individual review entries — Google's
  // Rich Results policy rejects the entire Product item as "Multiple reviews
  // without aggregateRating object" otherwise. ratingValue and reviewCount
  // here are computed from the exact review[] array below: 3 verified
  // Trustpilot reviews, each 5 stars → 5.0 average over 3 reviews. The
  // numbers are intentionally small but honest; this matches what the
  // visible UI on the homepage and /reviews page already advertises, and
  // every entry below has a `url` deep-link to its source on Trustpilot,
  // so the aggregate is independently verifiable. If you add or remove a
  // review here, update reviewCount accordingly.
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    bestRating: "5",
    worstRating: "1",
    reviewCount: 3,
  },
  // Real verified Trustpilot reviews — each has a `url` pointing back to the
  // source review so the structured data is independently verifiable.
  review: [
    { "@type": "Review", reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" }, author: { "@type": "Person", name: "Carmen Liam" }, datePublished: "2026-05-24", reviewBody: "the report was so good , the website smooth , i compared my report with the dealer report i got the same informations , everything was perfect", url: "https://www.trustpilot.com/reviews/6a12904f15413943cf4a044d", publisher: { "@type": "Organization", name: "Trustpilot" } },
    { "@type": "Review", reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" }, author: { "@type": "Person", name: "Adams Daniel Brook" }, datePublished: "2026-05-23", reviewBody: "i was looking for a used suv , when i found this website in google i checked the vin in their free tool, everything was good thank you", url: "https://www.trustpilot.com/reviews/6a120d8945c068e3a0ba004d", publisher: { "@type": "Organization", name: "Trustpilot" } },
    { "@type": "Review", reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" }, author: { "@type": "Person", name: "David Franz Friedhof" }, datePublished: "2026-05-29", reviewBody: "saved me from buying a car with hidden flood damage , the report showed everything needed , Thank you carcheckervin", url: "https://www.trustpilot.com/reviews/6a198ea437894c11a0770f83", publisher: { "@type": "Organization", name: "Trustpilot" } },
  ],
};

const howToStructuredData = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Check a VIN Number Online",
  description: "Learn how to decode any Vehicle Identification Number (VIN) to get a full vehicle history report in under 60 seconds.",
  step: [
    { "@type": "HowToStep", name: "Find Your VIN", text: "Locate the 17-character VIN on your vehicle's dashboard, driver-side door jamb sticker, vehicle registration, or insurance documents." },
    { "@type": "HowToStep", name: "Enter the VIN", text: "Enter the 17-character VIN into the VIN checker search box on our website." },
    { "@type": "HowToStep", name: "Get Your Report", text: "View your complete vehicle report instantly, including specs, photos, market values, equipment lists, and vehicle history." },
  ],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToStructuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }} />

      <HeroSection />
      <TrustBar />
      <RecentReportsSection />
      <ReportIncludedSection />
      <HowItWorks />
      <FeaturesSection />
      <AIFeaturesSection />
      <ComparisonSection />
      <PricingSection />
      <Reviews />
      <SellerSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
