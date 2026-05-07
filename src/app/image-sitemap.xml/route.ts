/**
 * Image sitemap — Bing weights images more heavily than Google does.
 * This dedicated sitemap lists every editorial image (Sanity blog hero
 * images + static brand assets) with title, caption, and a license URL.
 *
 * Spec: https://www.sitemaps.org/protocol.html#image
 */

import { sanityClient, urlFor } from "@/sanity/client";
import { groq } from "next-sanity";

export const revalidate = 3600;

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://www.carcheckervin.com";
const LICENSE = "https://creativecommons.org/licenses/by/4.0/";

interface ImagePost {
  slug: string;
  title: string;
  excerpt?: string;
  heroImage?: { asset?: { _ref?: string }; alt?: string };
  category?: { title?: string };
}

const imagePostsQuery = groq`
  *[_type == "post"
    && (!defined(noIndex) || noIndex == false)
    && defined(heroImage.asset)] {
    "slug": slug.current,
    title,
    excerpt,
    heroImage,
    category->{ title }
  }
`;

function escapeXml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  let posts: ImagePost[] = [];
  try {
    posts = await sanityClient.fetch<ImagePost[]>(imagePostsQuery);
  } catch {
    posts = [];
  }

  const urls = posts
    .filter((p) => p.heroImage?.asset)
    .map((p) => {
      const imgUrl = urlFor(p.heroImage!).width(1600).quality(85).url();
      const pageUrl = `${SITE}/blog/${p.slug}`;
      const alt = p.heroImage?.alt || p.title;
      return `<url>
  <loc>${pageUrl}</loc>
  <image:image>
    <image:loc>${escapeXml(imgUrl)}</image:loc>
    <image:title>${escapeXml(p.title)}</image:title>
    <image:caption>${escapeXml(p.excerpt || alt)}</image:caption>
    <image:license>${LICENSE}</image:license>
  </image:image>
</url>`;
    })
    .join("\n");

  // Also include the OG image / brand image for the homepage
  const homeImage = `<url>
  <loc>${SITE}/</loc>
  <image:image>
    <image:loc>${SITE}/opengraph-image</image:loc>
    <image:title>CarCheckerVIN — Free VIN Check &amp; Vehicle History Reports</image:title>
    <image:caption>Decode any VIN, check title status, accidents, recalls, and market value in seconds.</image:caption>
    <image:license>${LICENSE}</image:license>
  </image:image>
</url>`;

  // Window Sticker Maker — flagship tool page, surface its OG image for Bing/Google image discovery.
  const windowStickerImage = `<url>
  <loc>${SITE}/window-sticker</loc>
  <image:image>
    <image:loc>${SITE}/opengraph-image</image:loc>
    <image:title>Free Window Sticker Maker &mdash; Build a Monroney Label by VIN</image:title>
    <image:caption>Auto-fill any vehicle from a VIN, customize MSRP and factory options, then download or print a Monroney-style window sticker for free.</image:caption>
    <image:license>${LICENSE}</image:license>
  </image:image>
</url>`;

  // Motorcycle VIN Search — interactive decoder tool.
  const motorcycleVinSearchImage = `<url>
  <loc>${SITE}/motorcycle-vin-search</loc>
  <image:image>
    <image:loc>${SITE}/opengraph-image</image:loc>
    <image:title>Free Motorcycle VIN Search &amp; Decoder</image:title>
    <image:caption>Decode any 17-character motorcycle VIN instantly. Manufacturer, country, model year, plant, and production sequence — Harley-Davidson, Honda, Yamaha, Suzuki, Kawasaki, BMW, Ducati, Triumph, KTM, and more.</image:caption>
    <image:license>${LICENSE}</image:license>
  </image:image>
</url>`;

  // License Plate to VIN Lookup — interactive tool page.
  const licensePlateLookupImage = `<url>
  <loc>${SITE}/license-plate-lookup</loc>
  <image:image>
    <image:loc>${SITE}/opengraph-image</image:loc>
    <image:title>Free License Plate to VIN Lookup &mdash; Find Any Car by Plate Number</image:title>
    <image:caption>Enter a license plate number and state to instantly retrieve the VIN and full vehicle details. Free for all 50 US states. Powered by DPPA-compliant data.</image:caption>
    <image:license>${LICENSE}</image:license>
  </image:image>
</url>`;

  // Car Loan Calculator — high-traffic finance tool.
  const carLoanCalcImage = `<url>
  <loc>${SITE}/car-loan-calculator</loc>
  <image:image>
    <image:loc>${SITE}/opengraph-image</image:loc>
    <image:title>Free Car Loan Calculator &mdash; Monthly Payment &amp; Amortization Schedule</image:title>
    <image:caption>Calculate your exact monthly car payment, total interest, and full amortization schedule. Includes down payment, trade-in, state sales tax, and dealer fees for all 50 US states.</image:caption>
    <image:license>${LICENSE}</image:license>
  </image:image>
</url>`;

  // Car Affordability Calculator — companion finance tool.
  const carAffordabilityImage = `<url>
  <loc>${SITE}/car-affordability-calculator</loc>
  <image:image>
    <image:loc>${SITE}/opengraph-image</image:loc>
    <image:title>Free Car Affordability Calculator &mdash; How Much Car Can I Afford?</image:title>
    <image:caption>Enter your income, debts, and expenses to find the maximum car price you can comfortably afford. Uses the 20/4/10 rule, 15% rule, or custom budget with a full debt-to-income ratio check.</image:caption>
    <image:license>${LICENSE}</image:license>
  </image:image>
</url>`;

  // Trade-In Value Estimator — high-intent used car tool.
  const tradeInImage = `<url>
  <loc>${SITE}/trade-in-value-estimator</loc>
  <image:image>
    <image:loc>${SITE}/opengraph-image</image:loc>
    <image:title>Free Trade-In Value Estimator &mdash; How Much Is My Car Worth?</image:title>
    <image:caption>Get instant private party, dealer trade-in, instant cash offer, and auction value estimates based on your vehicle's year, make, mileage, condition, and history.</image:caption>
    <image:license>${LICENSE}</image:license>
  </image:image>
</url>`;

  // Gas Mileage Cost Calculator
  const gasMileageImage = `<url>
  <loc>${SITE}/gas-mileage-calculator</loc>
  <image:image>
    <image:loc>${SITE}/opengraph-image</image:loc>
    <image:title>Free Gas Mileage Cost Calculator &mdash; Fuel Cost Per Mile, Month &amp; Year</image:title>
    <image:caption>Calculate daily, monthly, and annual fuel costs by MPG and gas price. Includes road trip mode, all 50 US state gas prices, and vehicle comparison with break-even analysis.</image:caption>
    <image:license>${LICENSE}</image:license>
  </image:image>
</url>`;

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${homeImage}
${windowStickerImage}
${motorcycleVinSearchImage}
${licensePlateLookupImage}
${carLoanCalcImage}
${carAffordabilityImage}
${tradeInImage}
${gasMileageImage}
${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
