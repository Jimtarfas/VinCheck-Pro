import type { MetadataRoute } from "next";
import { makes } from "@/lib/makes";
import { states } from "@/lib/states";
import { LEMON_LAWS } from "@/lib/lemon-laws";
import { LEMON_BRANDS } from "@/lib/lemon-brands";
import { marketplaces } from "@/lib/marketplaces";
import { PAINT_CODE_BRANDS } from "@/lib/paint-codes";
import { BUILD_SHEET_BRANDS } from "@/lib/build-sheets";
import { CHEVY_MODELS } from "@/lib/chevy-models";
import { MERCEDES_MODELS } from "@/lib/mercedes-models";
import { CADILLAC_MODELS } from "@/lib/cadillac-models";
import { GMC_MODELS } from "@/lib/gmc-models";
import { RAM_MODELS } from "@/lib/ram-models";
import { FORD_MODELS } from "@/lib/ford-models";
import { TOYOTA_MODELS } from "@/lib/toyota-models";
import { HONDA_MODELS } from "@/lib/honda-models";
import { DODGE_MODELS } from "@/lib/dodge-models";
import { HARLEY_MODELS } from "@/lib/harley-models";
import { NISSAN_MODELS } from "@/lib/nissan-models";
import { VOLKSWAGEN_MODELS } from "@/lib/volkswagen-models";
import { JEEP_MODELS } from "@/lib/jeep-models";
import { GM_DIVISIONS } from "@/lib/gm-models";
import { ATV_BRANDS } from "@/lib/atv-models";
import { VIN_DECODER_PAGES } from "@/lib/vin-decoder-pages";
import { VIN_LOOKUP_PAGES } from "@/lib/vin-lookup-pages";
import { VIN_CHECK_TYPE_PAGES } from "@/lib/vin-check-type-pages";
import { sanityClient } from "@/sanity/client";
import { groq } from "next-sanity";
import { LOCALES, DEFAULT_LOCALE, type Locale } from "@/i18n/config";
import { pagesWithLocaleVersion, translateSlug } from "@/i18n/slugs";

interface SanityPostStub {
  slug: string;
  publishedAt: string;
  _updatedAt: string;
}

const sanityPostsForSitemap = groq`
  *[_type == "post" && (!defined(noIndex) || noIndex == false) && defined(slug.current)] {
    "slug": slug.current,
    publishedAt,
    _updatedAt
  }
`;

const sanityCategorySlugs = groq`
  *[_type == "category" && defined(slug.current)][].slug.current
`;

const sanityAuthorSlugs = groq`
  *[_type == "author" && defined(slug.current)][].slug.current
`;

const sanityAllTags = groq`
  array::unique(*[_type == "post" && defined(tags)].tags[])
`;

function slugifyTag(tag: string): string {
  return tag
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.carcheckervin.com";
  const now = new Date();

  const makePages: MetadataRoute.Sitemap = makes.map((m) => ({
    url: `${baseUrl}/vin-check/${m.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Exclude Florida — it 301-redirects to /florida-vin-check (a dedicated
  // landing page that ranks better). Listing it here would advertise a URL
  // that immediately bounces to another canonical, wasting crawl budget.
  const statePages: MetadataRoute.Sitemap = states
    .filter((s) => s.slug !== "florida")
    .map((s) => ({
      url: `${baseUrl}/vin-check/state/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    }));

  const marketplacePages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/marketplace-vin-check`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    ...marketplaces.map((m) => ({
      url: `${baseUrl}/marketplace-vin-check/${m.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  // Per-brand paint code pages (/paint-code-lookup/[brand]) — one per brand
  // in the paint-code dataset, targeting "{brand} paint code" / "where is the
  // {brand} paint code" queries that the hub page can't rank for on its own.
  const paintCodeBrandPages: MetadataRoute.Sitemap = PAINT_CODE_BRANDS.map((b) => ({
    url: `${baseUrl}/paint-code-lookup/${b.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  // Per-brand build-sheet pages (/build-sheet/[brand]) — one per brand with a
  // documented factory build-record system (Mercedes Datenkarte, Audi/VW PR
  // codes, Porsche M-codes, BMW option list, etc.), excluding the brands
  // already served by the standalone Ford/GM/Mopar build-sheet pages.
  const buildSheetBrandPages: MetadataRoute.Sitemap = BUILD_SHEET_BRANDS.map((b) => ({
    url: `${baseUrl}/build-sheet/${b.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const buyingGuideStatePages: MetadataRoute.Sitemap = states.map((s) => ({
    url: `${baseUrl}/guides/buying-used-car-in/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  // Per-state stolen-vehicle check pages (/stolen-vehicle-check/[state]) —
  // one for every state, derived from verified DMV/title-brand data.
  const stolenStatePages: MetadataRoute.Sitemap = states.map((s) => ({
    url: `${baseUrl}/stolen-vehicle-check/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Per-state salvage-title check pages (/salvage-title-check/[state]) —
  // one for every state, derived from verified DMV/title-brand data.
  const salvageStatePages: MetadataRoute.Sitemap = states.map((s) => ({
    url: `${baseUrl}/salvage-title-check/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Per-state odometer check pages (/odometer-check/[state]) —
  // one for every state, derived from verified DMV/title-brand data.
  const odometerStatePages: MetadataRoute.Sitemap = states.map((s) => ({
    url: `${baseUrl}/odometer-check/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Per-state vehicle registration pages (/vehicle-registration/[state]) —
  // one for every state, mirroring the salvage/odometer state clusters.
  const registrationStatePages: MetadataRoute.Sitemap = states.map((s) => ({
    url: `${baseUrl}/vehicle-registration/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Per-state vehicle title pages (/vehicle-title/[state]) — one for every
  // state, using verified per-state title-brand data.
  const titleStatePages: MetadataRoute.Sitemap = states.map((s) => ({
    url: `${baseUrl}/vehicle-title/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Per-state bill-of-sale pages (/bill-of-sale/[state]) — one for every
  // state, companion to the title cluster, using verified DMV data only.
  const billOfSaleStatePages: MetadataRoute.Sitemap = states.map((s) => ({
    url: `${baseUrl}/bill-of-sale/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Per-state lemon law check pages (/lemon-check/[state]) — one for each
  // state that has both DMV data and a lemon-law reference entry.
  const lemonStatePages: MetadataRoute.Sitemap = states
    .filter((s) => LEMON_LAWS.some((l) => l.abbr === s.abbr))
    .map((s) => ({
      url: `${baseUrl}/lemon-check/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

  // Per-brand lemon check pages (/lemon-check/brand/[make]).
  const lemonBrandPages: MetadataRoute.Sitemap = LEMON_BRANDS.map((b) => ({
    url: `${baseUrl}/lemon-check/brand/${b.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  // Per-model Chevrolet VIN check pages (/chevrolet-vin-check/[model]) — a
  // hub-and-spoke cluster targeting model-specific VIN-check intent (Silverado,
  // Equinox, Tahoe, Corvette, …) the generic /vin-check/chevrolet can't rank for.
  const chevyModelPages: MetadataRoute.Sitemap = CHEVY_MODELS.map((m) => ({
    url: `${baseUrl}/chevrolet-vin-check/${m.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Per-model Mercedes-Benz VIN check pages (/mercedes-vin-check/[model]) — a
  // hub-and-spoke cluster targeting model-specific VIN-check intent (C-Class,
  // E-Class, GLC, GLE, S-Class, …) the generic /vin-check/mercedes can't rank for.
  const mercedesModelPages: MetadataRoute.Sitemap = MERCEDES_MODELS.map((m) => ({
    url: `${baseUrl}/mercedes-vin-check/${m.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Per-model Cadillac VIN check pages (/cadillac-vin-check/[model]) — a
  // hub-and-spoke cluster targeting model-specific VIN-check intent (Escalade,
  // XT5, CT5, Lyriq, …) the generic /vin-check/cadillac can't rank for.
  const cadillacModelPages: MetadataRoute.Sitemap = CADILLAC_MODELS.map((m) => ({
    url: `${baseUrl}/cadillac-vin-check/${m.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Per-model GMC VIN check pages (/gmc-vin-check/[model]) — a hub-and-spoke
  // cluster targeting model-specific VIN-check intent (Sierra, Yukon, Acadia,
  // Terrain, Canyon, …) the generic /vin-check/gmc can't rank for.
  const gmcModelPages: MetadataRoute.Sitemap = GMC_MODELS.map((m) => ({
    url: `${baseUrl}/gmc-vin-check/${m.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Per-model RAM VIN check pages (/ram-vin-check/[model]) — a hub-and-spoke
  // cluster targeting model-specific VIN-check intent (1500, 2500, 3500,
  // ProMaster, TRX, …) the generic /vin-check/ram can't rank for.
  const ramModelPages: MetadataRoute.Sitemap = RAM_MODELS.map((m) => ({
    url: `${baseUrl}/ram-vin-check/${m.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Per-model Ford VIN check pages (/ford-vin-check/[model]) — a hub-and-spoke
  // cluster targeting model-specific VIN-check intent (F-150, Escape, Explorer,
  // Mustang, Bronco, …) the generic /vin-check/ford can't rank for.
  const fordModelPages: MetadataRoute.Sitemap = FORD_MODELS.map((m) => ({
    url: `${baseUrl}/ford-vin-check/${m.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Per-model Toyota VIN check pages (/toyota-vin-check/[model]) — a hub-and-spoke
  // cluster targeting model-specific VIN-check intent (Camry, Corolla, RAV4,
  // Tacoma, Highlander, …) the generic /vin-check/toyota can't rank for.
  const toyotaModelPages: MetadataRoute.Sitemap = TOYOTA_MODELS.map((m) => ({
    url: `${baseUrl}/toyota-vin-check/${m.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Per-model Honda VIN check pages (/honda-vin-check/[model]) — a hub-and-spoke
  // cluster targeting model-specific VIN-check intent (Civic, Accord, CR-V,
  // Pilot, Odyssey, …) the generic /vin-check/honda can't rank for.
  const hondaModelPages: MetadataRoute.Sitemap = HONDA_MODELS.map((m) => ({
    url: `${baseUrl}/honda-vin-check/${m.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Per-model Dodge VIN check pages (/dodge-vin-check/[model]) — a hub-and-spoke
  // cluster targeting model-specific VIN-check intent (Charger, Challenger,
  // Durango, Hornet, …) the generic /vin-check/dodge can't rank for.
  const dodgeModelPages: MetadataRoute.Sitemap = DODGE_MODELS.map((m) => ({
    url: `${baseUrl}/dodge-vin-check/${m.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Per-model Harley-Davidson VIN check pages (/harley-davidson-vin-check/[model])
  // — a hub-and-spoke cluster targeting model-specific motorcycle VIN-check intent
  // (Street Glide, Road Glide, Sportster, Fat Boy, …).
  const harleyModelPages: MetadataRoute.Sitemap = HARLEY_MODELS.map((m) => ({
    url: `${baseUrl}/harley-davidson-vin-check/${m.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Per-model Nissan VIN check pages (/nissan-vin-check/[model]) — a hub-and-spoke
  // cluster targeting model-specific VIN-check intent (Altima, Rogue, Sentra,
  // Pathfinder, …) the generic /vin-check/nissan can't rank for.
  const nissanModelPages: MetadataRoute.Sitemap = NISSAN_MODELS.map((m) => ({
    url: `${baseUrl}/nissan-vin-check/${m.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Per-model Volkswagen VIN check pages (/volkswagen-vin-check/[model]) — a
  // hub-and-spoke cluster targeting model-specific VW VIN-check intent (Jetta,
  // Tiguan, Passat, Atlas, Golf/GTI, …) the generic /vin-check/volkswagen can't
  // rank for.
  const volkswagenModelPages: MetadataRoute.Sitemap = VOLKSWAGEN_MODELS.map((m) => ({
    url: `${baseUrl}/volkswagen-vin-check/${m.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Per-model Jeep VIN check pages (/jeep-vin-check/[model]) — a hub-and-spoke
  // cluster targeting model-specific VIN-check intent (Wrangler, Grand Cherokee,
  // Cherokee, Gladiator, …) the generic /vin-check/jeep can't rank for.
  const jeepModelPages: MetadataRoute.Sitemap = JEEP_MODELS.map((m) => ({
    url: `${baseUrl}/jeep-vin-check/${m.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Per-division GM VIN decoder pages (/gm-vin-check/[division]) — a hub-and-spoke
  // cluster targeting "GM VIN number decoder" intent, one spoke per GM marque
  // (Chevrolet, GMC, Cadillac, Buick, Pontiac, …) covering WMI + RPO/SPID codes.
  const gmDivisionPages: MetadataRoute.Sitemap = GM_DIVISIONS.map((m) => ({
    url: `${baseUrl}/gm-vin-check/${m.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Per-brand ATV VIN decoder pages (/atv-vin-check/[brand]) — a hub-and-spoke
  // cluster targeting "ATV VIN decoder" intent, one spoke per powersports brand
  // (Honda, Polaris, Yamaha, Can-Am, …) with frame-VIN + theft-check guidance.
  const atvBrandPages: MetadataRoute.Sitemap = ATV_BRANDS.map((m) => ({
    url: `${baseUrl}/atv-vin-check/${m.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // VIN decoder hub-and-spoke cluster (/vin-decoder/[slug]) — one canonical
  // page per brand / vehicle-type / VIN-format keyword family (Chevrolet,
  // GM, Ford, Mercedes-Benz, trailer, classic-car, 10-digit, NHTSA API, …).
  const vinDecoderPages: MetadataRoute.Sitemap = VIN_DECODER_PAGES.map((p) => ({
    url: `${baseUrl}/vin-decoder/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // VIN lookup hub-and-spoke cluster (/vin-lookup/[type]) — one canonical page
  // per "vin lookup" keyword family the -check / -decoder pages don't own
  // (parts, title, antique, truck, trailer, snowmobile, mobile-home).
  const vinLookupPages: MetadataRoute.Sitemap = VIN_LOOKUP_PAGES.map((p) => ({
    url: `${baseUrl}/vin-lookup/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // VIN check by vehicle type cluster (/vin-check/type/[type]) — one canonical
  // "check" page per vehicle class the brand/state/check pages don't already own
  // (snowmobile, dirt-bike, utv, trailer, boat/HIN).
  const vinCheckTypePages: MetadataRoute.Sitemap = VIN_CHECK_TYPE_PAGES.map(
    (p) => ({
      url: `${baseUrl}/vin-check/type/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }),
  );

  let blogPages: MetadataRoute.Sitemap = [];
  let categoryPages: MetadataRoute.Sitemap = [];
  let tagPages: MetadataRoute.Sitemap = [];
  let authorPages: MetadataRoute.Sitemap = [];

  try {
    const [sanityPosts, categorySlugs, authorSlugs, allTags] = await Promise.all([
      sanityClient.fetch<SanityPostStub[]>(sanityPostsForSitemap),
      sanityClient.fetch<string[]>(sanityCategorySlugs),
      sanityClient.fetch<string[]>(sanityAuthorSlugs),
      sanityClient.fetch<string[]>(sanityAllTags),
    ]);

    blogPages = sanityPosts.map((p) => ({
      url: `${baseUrl}/blog/${p.slug}`,
      lastModified: new Date(p._updatedAt || p.publishedAt),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

    categoryPages = (categorySlugs || []).map((slug) => ({
      url: `${baseUrl}/blog/category/${slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

    authorPages = (authorSlugs || []).map((slug) => ({
      url: `${baseUrl}/author/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

    const seenTags = new Set<string>();
    for (const t of allTags || []) {
      const s = slugifyTag(t);
      if (s && !seenTags.has(s)) {
        seenTags.add(s);
        tagPages.push({
          url: `${baseUrl}/blog/tag/${s}`,
          lastModified: now,
          changeFrequency: "weekly" as const,
          priority: 0.6,
        });
      }
    }
  } catch {
    // If Sanity is unreachable during build, just skip Sanity-derived URLs
    blogPages = [];
    categoryPages = [];
    tagPages = [];
    authorPages = [];
  }

  return [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/vin-check`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${baseUrl}/vehicle-history-report`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${baseUrl}/pricing`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    // Reviews subdomain — canonical surface for review-intent queries
    // ("CarCheckerVIN reviews", "is CarCheckerVIN legit", etc.).
    { url: "https://reviews.carcheckervin.com", lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/vin-check/state`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/vin-check/type`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    ...makePages,
    ...statePages,
    ...marketplacePages,
    { url: `${baseUrl}/stolen-vehicle-check`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    ...stolenStatePages,
    { url: `${baseUrl}/salvage-title-check`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    ...salvageStatePages,
    { url: `${baseUrl}/accident-history-check`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/odometer-check`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    ...odometerStatePages,
    // Vehicle Registration hub + 50 per-state DMV registration guides.
    { url: `${baseUrl}/vehicle-registration`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    ...registrationStatePages,
    // Vehicle Title hub + 50 per-state title information & services guides.
    { url: `${baseUrl}/vehicle-title`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    ...titleStatePages,
    // Bill of Sale hub + 50 per-state bill-of-sale & transfer-document guides.
    { url: `${baseUrl}/bill-of-sale`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    ...billOfSaleStatePages,
    // Road & Traffic Signs — evergreen driver-education guide.
    { url: `${baseUrl}/road-traffic-signs`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/lemon-check`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    ...lemonStatePages,
    { url: `${baseUrl}/lemon-check/brand`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    ...lemonBrandPages,
    // Chevrolet VIN check hub + 10 per-model spokes.
    { url: `${baseUrl}/chevrolet-vin-check`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    ...chevyModelPages,
    // Mercedes-Benz VIN check hub + 10 per-model spokes.
    { url: `${baseUrl}/mercedes-vin-check`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    ...mercedesModelPages,
    // Cadillac VIN check hub + 10 per-model spokes.
    { url: `${baseUrl}/cadillac-vin-check`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    ...cadillacModelPages,
    // GMC VIN check hub + 10 per-model spokes.
    { url: `${baseUrl}/gmc-vin-check`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    ...gmcModelPages,
    // RAM VIN check hub + 10 per-model spokes.
    { url: `${baseUrl}/ram-vin-check`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    ...ramModelPages,
    // Ford VIN check hub + 10 per-model spokes.
    { url: `${baseUrl}/ford-vin-check`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    ...fordModelPages,
    // Toyota VIN check hub + 10 per-model spokes.
    { url: `${baseUrl}/toyota-vin-check`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    ...toyotaModelPages,
    // Honda VIN check hub + 10 per-model spokes.
    { url: `${baseUrl}/honda-vin-check`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    ...hondaModelPages,
    // Dodge VIN check hub + 10 per-model spokes.
    { url: `${baseUrl}/dodge-vin-check`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    ...dodgeModelPages,
    // Harley-Davidson VIN check hub + 10 per-model spokes.
    { url: `${baseUrl}/harley-davidson-vin-check`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    ...harleyModelPages,
    // Nissan VIN check hub + 10 per-model spokes.
    { url: `${baseUrl}/nissan-vin-check`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    ...nissanModelPages,
    // Volkswagen VIN check hub + 10 per-model spokes.
    { url: `${baseUrl}/volkswagen-vin-check`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    ...volkswagenModelPages,
    // Jeep VIN check hub + 10 per-model spokes.
    { url: `${baseUrl}/jeep-vin-check`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    ...jeepModelPages,
    // GM VIN decoder hub + 10 per-division spokes.
    { url: `${baseUrl}/gm-vin-check`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    ...gmDivisionPages,
    // ATV VIN decoder hub + 10 per-brand spokes.
    { url: `${baseUrl}/atv-vin-check`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    ...atvBrandPages,
    // Window Sticker Maker — flagship interactive tool. High priority for Google + Bing.
    { url: `${baseUrl}/window-sticker`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    // Window sticker SEO landing pages — VIN lookup + free-by-VIN intent clusters.
    { url: `${baseUrl}/window-sticker-lookup`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/free-window-sticker-by-vin`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/license-plate-lookup`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    // Plate → VIN and State → VIN — keyword-targeted plate-lookup landing pages.
    { url: `${baseUrl}/plate-to-vin`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${baseUrl}/state-to-vin`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    // Free plate lookup — keyword-targeted SEO landing page.
    { url: `${baseUrl}/look-up-car-plates-free`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    // Car Loan Calculator — high-traffic finance tool for organic SEO.
    { url: `${baseUrl}/car-loan-calculator`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    // Car Affordability Calculator — companion finance tool.
    { url: `${baseUrl}/car-affordability-calculator`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    // Trade-In Value Estimator — high-intent used car tool.
    { url: `${baseUrl}/trade-in-value-estimator`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    // Gas Mileage Cost Calculator — high-traffic utility tool.
    { url: `${baseUrl}/gas-mileage-calculator`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${baseUrl}/vin-decoder`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    // VIN decoder cluster — brand / type / format spokes under /vin-decoder.
    ...vinDecoderPages,
    // VIN lookup cluster — hub + type/attribute spokes under /vin-lookup.
    { url: `${baseUrl}/vin-lookup`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    ...vinLookupPages,
    ...vinCheckTypePages,
    // Chassis Number Lookup — international "chassis number = VIN" SEO landing page.
    { url: `${baseUrl}/chassis-number-lookup`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    // Florida VIN Check — state-targeted SEO landing page.
    { url: `${baseUrl}/florida-vin-check`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    // Vehicle Comparison Tool — long-tail SEO (Camry vs Accord, etc.)
    { url: `${baseUrl}/compare-cars`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    // Used Car Inspection Checklist — DIY pre-purchase PPI tool.
    { url: `${baseUrl}/used-car-inspection-checklist`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    // Vehicle Lien Check — dedicated lien/repo landing page.
    { url: `${baseUrl}/vehicle-lien-check`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    // OBD-II Code Lookup — high-volume diagnostic SEO tool.
    { url: `${baseUrl}/obd2-codes`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    // Car Depreciation Calculator — finance suite tool.
    { url: `${baseUrl}/car-depreciation-calculator`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    // Lease vs Buy Calculator — high-intent finance comparison tool.
    { url: `${baseUrl}/lease-vs-buy-calculator`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    // Total Cost of Ownership Calculator — capstone finance tool.
    { url: `${baseUrl}/total-cost-of-ownership-calculator`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    // Diminished Value Calculator — post-accident value-loss SEO tool (17c + market loss).
    { url: `${baseUrl}/diminished-value-calculator`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    // HIN Lookup — boat Hull Identification Number ("boat VIN") decoder, under-served niche.
    { url: `${baseUrl}/hin-lookup`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    // Semi Truck VIN Lookup — low-KD commercial-truck cluster (Freightliner, Peterbilt, trailers).
    { url: `${baseUrl}/semi-truck-vin-lookup`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    // Golf Cart VIN Lookup — lowest-KD cluster; serial decoder (Club Car) + EZGO/Yamaha guides.
    { url: `${baseUrl}/golf-cart-vin-lookup`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${baseUrl}/recall-check`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/market-value`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/warranty-check`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/build-sheet`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    // Make-specific build-sheet siblings to /build-sheet — Ford door data plate / Marti Report,
    // GM RPO / SPID label, and Mopar fender tag / broadcast sheet. Self-canonical, differentiated.
    { url: `${baseUrl}/ford-build-sheet`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/gm-build-sheet`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/mopar-broadcast-sheet`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    // Per-brand build-sheet pages (Mercedes, BMW, Audi, VW, Porsche, Toyota, …).
    ...buildSheetBrandPages,
    { url: `${baseUrl}/paint-code-lookup`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    // Paint Code Finder — color-name + brand directory sibling to /paint-code-lookup.
    { url: `${baseUrl}/paint-code-finder`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    // Per-brand paint code pages (Toyota, Honda, Ford, BMW, …).
    ...paintCodeBrandPages,
    { url: `${baseUrl}/flood-check`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    // ── VIN Lookup keyword cluster (8 hub pages, ~250K combined monthly volume) ──
    // High priority: each targets a distinct intent in the "vin lookup" SERP
    // family, with the FloodCheckBody template and full schema.org JSON-LD.
    { url: `${baseUrl}/vin-number-lookup`,        lastModified: now, changeFrequency: "weekly",  priority: 0.95 },
    { url: `${baseUrl}/carfax-vin-lookup`,        lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${baseUrl}/kbb-vin-lookup`,           lastModified: now, changeFrequency: "weekly",  priority: 0.85 },
    { url: `${baseUrl}/dmv-vin-lookup`,           lastModified: now, changeFrequency: "weekly",  priority: 0.85 },
    { url: `${baseUrl}/vin-owner-lookup`,         lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/vin-number-lookup-texas`,  lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/free-vin-lookup`,          lastModified: now, changeFrequency: "weekly",  priority: 0.85 },
    { url: `${baseUrl}/vin-code-lookup`,          lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    // ── Wave 2 VIN-lookup cluster (15 new pages, ~50K combined monthly volume) ──
    // Brand-specific lookups (intent distinct from /vin-check/<brand>)
    { url: `${baseUrl}/toyota-vin-lookup`,        lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${baseUrl}/honda-vin-lookup`,         lastModified: now, changeFrequency: "weekly",  priority: 0.85 },
    { url: `${baseUrl}/jeep-vin-lookup`,          lastModified: now, changeFrequency: "weekly",  priority: 0.85 },
    { url: `${baseUrl}/gm-vin-lookup`,            lastModified: now, changeFrequency: "weekly",  priority: 0.85 },
    { url: `${baseUrl}/ram-vin-lookup`,           lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${baseUrl}/chevy-vin-lookup`,         lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${baseUrl}/hyundai-vin-lookup`,       lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${baseUrl}/dodge-vin-lookup`,         lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    // Retailer-angle pages
    { url: `${baseUrl}/autozone-vin-lookup`,      lastModified: now, changeFrequency: "weekly",  priority: 0.85 },
    { url: `${baseUrl}/edmunds-vin-lookup`,       lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/oreilly-vin-lookup`,       lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/jd-power-vin-lookup`,      lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    // Vehicle-type pages
    { url: `${baseUrl}/trailer-vin-lookup`,       lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/atv-vin-lookup`,           lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    // California state hub (parallel to /vin-number-lookup-texas)
    { url: `${baseUrl}/vin-lookup-california`,    lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    // ── Tesla wave (30 pages, ~20M monthly AI volume per Semrush analysis) ──
    // Tier 1 — Top-level hubs
    { url: `${baseUrl}/tesla-vin-decoder`,           lastModified: now, changeFrequency: "weekly",  priority: 0.95 },
    { url: `${baseUrl}/tesla-vin-lookup`,            lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${baseUrl}/tesla-vin-history-check`,     lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${baseUrl}/tesla-recall-check`,          lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${baseUrl}/tesla-gigafactory-by-vin`,    lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/tesla-vin-stolen-check`,      lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/tesla-warranty-check`,        lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/tesla-software-update-check`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    // Tier 2 — Per-model VIN decoders
    { url: `${baseUrl}/tesla-model-3-vin-decoder`,   lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${baseUrl}/tesla-model-y-vin-decoder`,   lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${baseUrl}/tesla-model-s-vin-decoder`,   lastModified: now, changeFrequency: "weekly",  priority: 0.85 },
    { url: `${baseUrl}/tesla-model-x-vin-decoder`,   lastModified: now, changeFrequency: "weekly",  priority: 0.85 },
    { url: `${baseUrl}/tesla-cybertruck-vin-decoder`,lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${baseUrl}/tesla-roadster-vin-decoder`,  lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    // Tier 3 — Per-model recall checks
    { url: `${baseUrl}/tesla-model-3-recall-check`,  lastModified: now, changeFrequency: "weekly",  priority: 0.85 },
    { url: `${baseUrl}/tesla-model-y-recall-check`,  lastModified: now, changeFrequency: "weekly",  priority: 0.85 },
    { url: `${baseUrl}/tesla-model-s-recall-check`,  lastModified: now, changeFrequency: "weekly",  priority: 0.85 },
    { url: `${baseUrl}/tesla-model-x-recall-check`,  lastModified: now, changeFrequency: "weekly",  priority: 0.85 },
    { url: `${baseUrl}/tesla-cybertruck-recall-check`,lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/tesla-roadster-recall-check`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    // Tier 4 — Per-model history checks
    { url: `${baseUrl}/tesla-model-3-history-check`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/tesla-model-y-history-check`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/tesla-model-s-history-check`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/tesla-model-x-history-check`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/tesla-cybertruck-history-check`,lastModified: now, changeFrequency: "monthly",priority: 0.8 },
    { url: `${baseUrl}/tesla-roadster-history-check`,lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    // Tier 5 — Per-Gigafactory plant hubs
    { url: `${baseUrl}/tesla-fremont-vin`,           lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/tesla-austin-vin`,            lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/tesla-shanghai-vin`,          lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/tesla-berlin-vin`,            lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/rental-car-check`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/fleet-check`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/classic-car-vin`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/motorcycle-vin-check`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    // Motorcycle VIN Search — interactive decoder tool. High priority for Google + Bing.
    { url: `${baseUrl}/motorcycle-vin-search`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${baseUrl}/rv-vin-check`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/total-loss-check`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/rideshare-check`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/airbag-check`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/hail-damage-check`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/impound-check`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/jdm-import-check`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/dealer-check`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/vin-check-vs-carfax`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/vin-check-vs-autocheck`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/vin-check-vs-vinaudit`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/vin-check-vs-clearvin`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/vin-check-vs-bumper`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/dealers`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/tools`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/research`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/press`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${baseUrl}/blog/category`, lastModified: now, changeFrequency: "weekly", priority: 0.75 },
    ...categoryPages,
    ...tagPages,
    ...blogPages,
    { url: `${baseUrl}/author`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    ...authorPages,
    { url: `${baseUrl}/guides`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/guides/how-to-read-a-vin`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/guides/what-is-a-vin-number`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/guides/free-vin-check`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/guides/used-car-buying-complete-guide`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/guides/vehicle-fraud-prevention`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/guides/vin-decoding-master-guide`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/guides/used-car-financing-guide`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/guides/car-history-report-guide`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    ...buyingGuideStatePages,
    { url: `${baseUrl}/glossary`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/trust`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/help`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/changelog`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/car-news`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${baseUrl}/auto-news`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/refund-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/cookie-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/accessibility`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    // ── Localised pages (Spanish + future locales) ──
    // Every page that has a translated version gets its own sitemap
    // entry so Google can discover the localised URL directly. The
    // hreflang chain on each page tells Google which URLs are
    // equivalents — we don't try to encode that in the sitemap (Next's
    // MetadataRoute.Sitemap type doesn't expose xhtml:link), it
    // happens via <link rel="alternate"> in the page <head>.
    ...localisedPages(baseUrl, now),
  ];
}

/**
 * Emit one entry per (non-default-locale × page-with-translated-slug).
 * The English page is already in the main list above; this just adds
 * the Spanish (and any future) counterparts so they're crawled.
 */
function localisedPages(
  baseUrl: string,
  now: Date
): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  for (const locale of LOCALES) {
    if (locale === DEFAULT_LOCALE) continue;
    for (const { englishPath } of pagesWithLocaleVersion(locale as Locale)) {
      const localised = translateSlug(englishPath, locale as Locale);
      const url =
        localised === "/"
          ? `${baseUrl}/${locale}`
          : `${baseUrl}/${locale}${localised}`;
      entries.push({
        url,
        lastModified: now,
        changeFrequency: "weekly",
        // Same priority signal as the English equivalents — we want
        // Google to crawl them at the same cadence.
        priority: englishPath === "/" ? 1.0 : 0.85,
      });
    }
  }
  return entries;
}
