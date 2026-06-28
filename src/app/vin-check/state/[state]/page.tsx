import type { Metadata } from "next";
import { notFound } from "next/navigation";
import VinCheckStateBody from "@/components/VinCheckStateBody";
import { states, getStateBySlug, getBrandDescription } from "@/lib/states";
import { hreflangAlternates } from "@/lib/seo/hreflang";

interface Props {
  params: Promise<{ state: string }>;
}

export async function generateStaticParams() {
  return states.map((s) => ({ state: s.slug }));
}

// Per-state SERP hook. The description has only ~155 chars to land a click,
// so we lead with a state-specific differentiator the searcher actually
// cares about (FL hurricane floods, CA lemon-buyback brand, CO hail, etc.),
// then a benefit, then a no-friction promise.
function descriptionHook(state: ReturnType<typeof getStateBySlug>): string {
  if (!state) return "Free VIN check with full vehicle history report.";
  const s = state.slug;
  const leads: Record<string, string> = {
    florida:       "Spot hurricane flood titles and rebuilt cars before you buy in Florida.",
    california:    "Catch California Lemon Law Buyback titles and Song-Beverly buybacks.",
    texas:         "Detect Texas title washing, rebuilt salvage, and hail damage instantly.",
    "new-york":    "Catch flood titles, NY salvage brands, and odometer rollback in seconds.",
    arizona:       "AZ emissions history, salvage and revived-salvage brands — all in one report.",
    colorado:      "Spot Colorado hail damage titles, salvage brands, and accident history.",
    louisiana:     "Detect Louisiana hurricane-flood vehicles and salvage rebuilds before buying.",
    "north-carolina": "Catch NC flood, salvage and rebuilt titles plus odometer fraud instantly.",
    "south-carolina": "Spot SC hurricane-damaged cars, salvage rebuilds and lemon buybacks.",
    georgia:       "Catch Georgia salvage, unrebuildable and flood titles before signing.",
    michigan:      "Spot Michigan rust-belt damage, salvage rebuilds and lemon law buybacks.",
    illinois:      "Catch IL salvage, rebuilt and flood titles plus odometer rollback.",
    ohio:          "Catch Ohio salvage, rebuilt and rust-belt damage in one VIN check.",
    pennsylvania:  "Spot PA reconstructed, salvage and flood titles before you commit.",
    "new-jersey":  "Catch flood, salvage and lemon-buyback brands across NJ vehicle records.",
    virginia:      "Spot Virginia salvage, rebuilt and flood titles plus accident history.",
    washington:    "WA salvage, rebuilt and totaled titles — caught instantly before purchase.",
    massachusetts: "Catch Massachusetts salvage, rebuilt and lemon buyback brands instantly.",
    minnesota:     "Spot Minnesota salvage, prior-salvage, and rust-belt damage records.",
    indiana:       "Catch Indiana salvage, rebuilt, flood and odometer-rollback records.",
    tennessee:     "Spot Tennessee salvage, rebuilt, flood and total-loss titles fast.",
    arkansas:      "Catch Arkansas salvage, rebuilt and prior-salvage titles in seconds.",
    missouri:      "Spot Missouri salvage, rebuilt, prior-salvage and flood titles fast.",
    wisconsin:     "Catch Wisconsin salvage, rebuilt and rust-belt damage instantly.",
    maryland:      "Spot Maryland salvage, rebuilt and flood titles before you buy.",
    nevada:        "Catch Nevada salvage, non-repairable and lemon-buyback brands.",
    oregon:        "Spot Oregon salvage, rebuilt, dismantled and totaled vehicle titles.",
    oklahoma:      "Catch Oklahoma salvage, rebuilt and unrecovered-theft records.",
    kentucky:      "Spot Kentucky salvage, rebuilt and rust-belt damage records.",
    iowa:          "Catch Iowa salvage, rebuilt, prior-salvage and rust-belt damage.",
    alabama:       "Catch Alabama salvage, junk and rebuilt brands before signing.",
    utah:          "Spot Utah salvage, rebuilt and reconditioned titles instantly.",
    kansas:        "Catch Kansas salvage, rebuilt, hail and rust-belt damage fast.",
    nebraska:      "Spot Nebraska salvage, rebuilt and prior-salvage titles fast.",
    idaho:         "Catch Idaho salvage, rebuilt, junk and flood titles before buying.",
    "new-mexico":  "Spot New Mexico salvage, rebuilt and reconstructed vehicle titles.",
    "west-virginia": "Catch WV salvage, rebuilt and rust-belt damage records fast.",
    hawaii:        "Spot Hawaii salvage, reconstructed and salt-corrosion damage records.",
    mississippi:   "Catch Mississippi salvage, rebuilt, junk and flood titles instantly.",
    montana:       "Spot Montana salvage, rebuilt and reconditioned vehicle titles.",
    "rhode-island": "Catch Rhode Island salvage, rebuilt and flood titles before buying.",
    delaware:      "Spot Delaware salvage, distressed, rebuilt and flood titles fast.",
    maine:         "Catch Maine salvage, rebuilt, rust-belt and totaled vehicle titles.",
    "south-dakota": "Spot South Dakota salvage, rebuilt and prior-salvage titles.",
    "north-dakota": "Catch North Dakota salvage, rebuilt and flood titles fast.",
    vermont:       "Spot Vermont salvage, rebuilt and rust-belt damage records.",
    wyoming:       "Catch Wyoming salvage, rebuilt and totaled-vehicle titles.",
    "new-hampshire": "Spot NH salvage, rebuilt and rust-belt damage in one VIN check.",
    alaska:        "Catch Alaska salvage, reconstructed and salt-corrosion damage titles.",
    connecticut:   "Catch CT salvage, rebuilt and flood titles — backed by CT's lemon-law data.",
  };
  return leads[s] || `Catch ${state.name} salvage, rebuilt and flood titles in seconds.`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state: slug } = await params;
  const state = getStateBySlug(slug);
  if (!state) return { title: "VIN Check by State" };

  // /vin-check/state/florida is permanently redirected to /florida-vin-check
  // by next.config.ts. Defensive noindex to drop the stale URL from Google.
  if (slug === "florida") {
    return {
      title: { absolute: "Florida VIN Check (moved)" },
      alternates: { canonical: "https://www.carcheckervin.com/florida-vin-check" },
      robots: { index: false, follow: true },
    };
  }

  const title = `Free ${state.name} VIN Check — Instant ${state.abbr} History`;
  const hook = descriptionHook(state);
  const description = `${hook} Free, instant report — no signup, no card.`;

  return {
    title,
    description,
    keywords: [
      `vin check ${state.name}`,
      `${state.name} vin lookup`,
      `${state.name} dmv vin check`,
      `vehicle history ${state.name}`,
      `${state.name} title check`,
      `${state.name} vin decoder`,
      `${state.name} salvage title check`,
      `${state.name} ${state.abbr} vin check`,
      `free vin check ${state.name}`,
    ],
    alternates: hreflangAlternates(`/vin-check/state/${state.slug}`),
    openGraph: {
      title: `Free ${state.name} VIN Check — Instant ${state.abbr} History`,
      description,
      type: "website",
      url: `https://www.carcheckervin.com/vin-check/state/${state.slug}`,
    },
  };
}

export default async function StatePage({ params }: Props) {
  const { state: slug } = await params;
  const state = getStateBySlug(slug);
  if (!state) notFound();

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${state.name} VIN Check`,
    description: `Free ${state.name} VIN check and vehicle history report. ${state.dmvName} title brand information and lemon law facts.`,
    url: `https://www.carcheckervin.com/vin-check/state/${state.slug}`,
    isPartOf: { "@type": "WebSite", name: "CarCheckerVIN", url: "https://www.carcheckervin.com" },
    about: {
      "@type": "Place",
      name: state.name,
      address: { "@type": "PostalAddress", addressRegion: state.abbr, addressCountry: "US" },
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.carcheckervin.com" },
      { "@type": "ListItem", position: 2, name: "VIN Check", item: "https://www.carcheckervin.com/vin-check" },
      { "@type": "ListItem", position: 3, name: "By State", item: "https://www.carcheckervin.com/vin-check/state" },
      { "@type": "ListItem", position: 4, name: state.name },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What title brands does ${state.name} use?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `The ${state.dmvName} flags vehicles with brands including ${state.titleBrands.join(", ")}. ${getBrandDescription(state.titleBrands[0], state.name)}`,
        },
      },
      {
        "@type": "Question",
        name: `Does ${state.name} have a lemon law?`,
        acceptedAnswer: { "@type": "Answer", text: `Yes. ${state.lemonLawNotes}` },
      },
      {
        "@type": "Question",
        name: `What's unique about checking a VIN in ${state.name}?`,
        acceptedAnswer: { "@type": "Answer", text: state.specialFact },
      },
      {
        "@type": "Question",
        name: `Is a VIN check free for ${state.name} vehicles?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes. You can run a free VIN check on any vehicle registered in ${state.name} to see title brands, salvage and flood records, odometer history, and open recalls before you buy — no signup or credit card required.`,
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <VinCheckStateBody stateSlug={state.slug} locale="en" />
    </>
  );
}
