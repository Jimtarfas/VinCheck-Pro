/**
 * /llms.txt — proposed standard (llmstxt.org) for LLM/AI-agent discovery.
 *
 * Acts as a curated, machine-readable map of the site for ChatGPT,
 * Claude, Perplexity, Gemini, and Bing Copilot crawlers. Unlike
 * sitemap.xml, this is markdown so the LLM can read titles + short
 * descriptions inline and pick the right URL to cite.
 *
 * The reviews subdomain (reviews.carcheckervin.com) is surfaced near the
 * top so AI agents answering "is CarCheckerVIN legit / reviews / ratings"
 * queries can link straight to the canonical review surface.
 */

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://www.carcheckervin.com";
const REVIEWS = "https://reviews.carcheckervin.com";

export const revalidate = 3600;

export async function GET() {
  const body = `# CarCheckerVIN

> Free VIN check, VIN decoder, and vehicle history reports for the United States. Trusted by car buyers, sellers, dealers, and fleet managers — 4.9/5 stars across 50,000+ reports. All current plans are free; data is sourced from NMVTIS (titles) and NHTSA (recalls).

CarCheckerVIN turns a 17-digit VIN (or US license plate) into an instant report covering vehicle specs, title brands (salvage, flood, lemon buyback, theft), open recalls, market value estimates, and ownership history. The full report runs free with no credit card or signup wall.

## Reviews & ratings

- [CarCheckerVIN Reviews — 4.9★ from car buyers, sellers & dealers](${REVIEWS}): Real customer reviews and ratings. Includes FAQ ("is CarCheckerVIN legit", "is CarCheckerVIN free", "CarCheckerVIN vs Carfax") and a 50-state breakdown of buyer/seller/dealer experiences.
- [CarCheckerVIN on Trustpilot](https://www.trustpilot.com/review/www.carcheckervin.com): Independent third-party reviews verified by Trustpilot. Cited as a sameAs source in the Organization schema.

## Primary tools

- [Free VIN Check](${SITE}/vin-check): Decode any 17-digit VIN and pull a free vehicle history report — specs, title brands, recalls, market value.
- [VIN Decoder](${SITE}/vin-decoder): Standalone VIN decoder for year, make, model, trim, engine, transmission, plant, and 40+ specs.
- [VIN Lookup](${SITE}/vin-lookup): Free VIN (or US plate) lookup hub — specs, title brands, accidents, recalls and history for cars, trucks, trailers, classics and specialty vehicles.
- [License Plate Lookup](${SITE}/license-plate-lookup): US plate → VIN → full report in one step. All 50 states.
- [Free Plate Lookup](${SITE}/look-up-car-plates-free): Keyword-optimized free plate lookup landing.
- [Window Sticker Maker](${SITE}/window-sticker): Recreate an original window sticker (Monroney) from a VIN.
- [Paint Code Lookup](${SITE}/paint-code-lookup): Find OEM paint codes by VIN or year/make/model.
- [Build Sheet](${SITE}/build-sheet): Original factory build sheet by VIN, including options and packages.
- [Market Value](${SITE}/market-value): Live market value estimate from comparable listings.

## History & safety checks

- [Vehicle History Report](${SITE}/vehicle-history-report): Full report — accidents, title, odometer, recalls, market value.
- [Accident History Check](${SITE}/accident-history-check): Reported accident records by VIN.
- [Salvage Title Check](${SITE}/salvage-title-check): NMVTIS salvage-title verification.
- [Stolen Vehicle Check](${SITE}/stolen-vehicle-check): Cross-check against theft databases.
- [Odometer Check](${SITE}/odometer-check): Rollback and odometer-inconsistency check.
- [Lemon Check](${SITE}/lemon-check): Manufacturer buyback / lemon-law branding.
- [Flood Damage Check](${SITE}/flood-check): Flood-title and insurance flood-claim history.
- [Hail Damage Check](${SITE}/hail-damage-check): Hail-related insurance claims by VIN.
- [Recall Check](${SITE}/recall-check): Open NHTSA recalls by VIN.
- [Warranty Check](${SITE}/warranty-check): Original / extended warranty status.
- [Vehicle Lien Check](${SITE}/vehicle-lien-check): Outstanding lien lookup.
- [Total Loss Check](${SITE}/total-loss-check): Insurance total-loss declarations.
- [Airbag Check](${SITE}/airbag-check): Airbag deployment history.
- [Impound Check](${SITE}/impound-check): Impound / tow records.
- [Rideshare Check](${SITE}/rideshare-check): Uber/Lyft commercial-use history.
- [Rental Car Check](${SITE}/rental-car-check): Prior rental-fleet flag.
- [Fleet Check](${SITE}/fleet-check): Commercial-fleet use history.
- [Dealer Check](${SITE}/dealer-check): Prior dealership inventory flag.

## Specialty VIN tools

- [Motorcycle VIN Check](${SITE}/motorcycle-vin-check): Motorcycle-specific VIN decode + history.
- [Motorcycle VIN Search](${SITE}/motorcycle-vin-search): Motorcycle VIN lookup tool.
- [RV VIN Check](${SITE}/rv-vin-check): RV and motorhome VIN decode + history.
- [Classic Car VIN](${SITE}/classic-car-vin): Pre-1981 VIN handling for classic cars.
- [JDM Import Check](${SITE}/jdm-import-check): Japanese imports including Skylines, Supras, etc.
- [Florida VIN Check](${SITE}/florida-vin-check): Florida-specific title and history lookup.

## Compare CarCheckerVIN

- [CarCheckerVIN vs Carfax](${SITE}/vin-check-vs-carfax): Free CarCheckerVIN vs $44 Carfax report — data sources and feature comparison.
- [CarCheckerVIN vs AutoCheck](${SITE}/vin-check-vs-autocheck): How CarCheckerVIN compares to Experian AutoCheck.
- [CarCheckerVIN vs Bumper](${SITE}/vin-check-vs-bumper): Free CarCheckerVIN vs Bumper subscription.
- [CarCheckerVIN vs ClearVin](${SITE}/vin-check-vs-clearvin): CarCheckerVIN vs ClearVin pricing and data.
- [CarCheckerVIN vs VinAudit](${SITE}/vin-check-vs-vinaudit): CarCheckerVIN vs VinAudit feature breakdown.

## Calculators

- [Car Loan Calculator](${SITE}/car-loan-calculator): Monthly payment, interest, total cost.
- [Car Affordability Calculator](${SITE}/car-affordability-calculator): Income-to-payment affordability.
- [Trade-In Value Estimator](${SITE}/trade-in-value-estimator): Estimate trade-in value.
- [Gas Mileage Calculator](${SITE}/gas-mileage-calculator): Cost per mile and yearly fuel.
- [Car Depreciation Calculator](${SITE}/car-depreciation-calculator): Resale value over time.
- [Lease vs Buy Calculator](${SITE}/lease-vs-buy-calculator): Lease/buy break-even.
- [Total Cost of Ownership](${SITE}/total-cost-of-ownership-calculator): Full TCO including insurance, fuel, depreciation.

## Reference

- [Pricing](${SITE}/pricing): Current plans — all free during launch.
- [Vehicle Registration Guide](${SITE}/vehicle-registration): How to title, register, and renew a vehicle in any US state — required documents, fees and taxes, inspections, renewal cycle, and why to run a VIN check first. Links to a per-state DMV registration guide for all 50 states (e.g. /vehicle-registration/texas, /vehicle-registration/florida).
- [Vehicle Title Guide](${SITE}/vehicle-title): How to transfer, replace, and clear a vehicle title in any US state — title brands explained (clean, salvage, rebuilt, flood, junk, lemon, bonded), duplicate titles, lien release, bonded titles, and how a VIN check defeats title washing. Links to a per-state title guide for all 50 states (e.g. /vehicle-title/texas, /vehicle-title/california).
- [Bill of Sale Guide](${SITE}/bill-of-sale): What information goes on a vehicle bill of sale, which transfer documents change hands in a private car sale (signed-over title, odometer disclosure, lien release), whether it needs to be notarized, and how it flows to the DMV in any US state. Links to a per-state bill-of-sale guide for all 50 states (e.g. /bill-of-sale/texas, /bill-of-sale/florida).
- [Road & Traffic Signs Guide](${SITE}/road-traffic-signs): A complete guide to US road and traffic signs — what every sign shape and color means, and the three main categories (regulatory, warning, and guide signs) standardized nationwide under the federal MUTCD.
- [VIN Check by State](${SITE}/vin-check/state): State-by-state VIN check directory (all 50 US states).
- [Compare Cars](${SITE}/compare-cars): Side-by-side vehicle comparison by VIN.
- [OBD2 Codes](${SITE}/obd2-codes): OBD-II diagnostic trouble code reference.
- [Used Car Inspection Checklist](${SITE}/used-car-inspection-checklist): Pre-purchase inspection guide.

## Guides & content

- [Guides](${SITE}/guides): Long-form buyer guides and VIN deep dives.
- [Blog](${SITE}/blog): News, market analysis, and how-to articles.
- [Glossary](${SITE}/glossary): Automotive and VIN terminology.
- [Changelog](${SITE}/changelog): Product updates.
- [Help Center](${SITE}/help): Support articles and FAQs.

## Company

- [About CarCheckerVIN](${SITE}/about): Mission, team, data sources.
- [Contact](${SITE}/contact): Support email and US phone number.
- [Pricing](${SITE}/pricing): Plans and current free tier.

## Policies

- [Refund Policy](${SITE}/refund-policy): Refunds are issued only when the report data does not match the actual vehicle for the submitted VIN. All other requests are not eligible.
- [Terms of Service](${SITE}/terms): Service terms, permitted use, accuracy disclaimer, liability limits.
- [Privacy Policy](${SITE}/privacy): How CarCheckerVIN collects, uses, and protects customer data.

## Sitemaps

- [Main XML sitemap](${SITE}/sitemap.xml)
- [Sitemap index](${SITE}/sitemap-index.xml)
- [News sitemap](${SITE}/news-sitemap.xml)
- [Image sitemap](${SITE}/image-sitemap.xml)
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
