/**
 * Shared body for /guides/car-history-report-guide and its Spanish twin.
 * Wave 18b — full English layout in both locales via COPY={en,es}.
 */

import Link from "next/link";
import {
  FileSearch,
  Database,
  ShieldCheck,
  AlertOctagon,
  DollarSign,
  Layers,
  HelpCircle,
  BookOpen,
  ScrollText,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import type { Locale } from "@/i18n/config";

export const FAQS_EN = [
  {
    question: "What is a vehicle history report?",
    answer:
      "A vehicle history report is a structured summary of every recorded event tied to a specific 17-character VIN. It compiles title transfers, title brands, odometer disclosures, accident and total-loss records, theft flags, lien activity, and open recalls into a chronological timeline. Buyers use it to verify a used car's past before purchase, surfacing problems a seller may not disclose, such as a salvage title, flood damage, or rolled-back mileage.",
  },
  {
    question: "What does a car history report include?",
    answer:
      "A typical report includes title and registration history, brand records (salvage, rebuilt, flood, junk, lemon buyback), the odometer reading chain, accident and damage records, theft and recovery flags, lien and loan history, open and completed safety recalls, factory equipment lists, and where available, service records and a market-value estimate. Coverage of service and accident data varies by provider, since those sources are partly voluntary.",
  },
  {
    question: "Where does vehicle history report data come from?",
    answer:
      "Credible reports draw from several authoritative sources. NMVTIS, run by the U.S. Department of Justice, aggregates title and brand data from state DMVs nationwide. NICB compiles theft and total-loss records from insurance carriers. NHTSA publishes recall campaigns and VIN decoding. Additional data comes from salvage auctions, manufacturer (OEM) build and warranty records, and independent service networks. Providers differ mainly in how they integrate and refresh these feeds.",
  },
  {
    question: "How accurate and complete are vehicle history reports?",
    answer:
      "No vehicle history report is 100% complete. A report only shows events that were actually reported into its source databases, so a fender-bender repaired out of pocket or a flood claim that never reached an insurer will not appear. Comprehensive reports catch the large majority of meaningful issues like title brands and odometer fraud, but they are necessary, not sufficient. Always pair a report with a hands-on pre-purchase mechanical inspection.",
  },
  {
    question: "How much does a vehicle history report cost?",
    answer:
      "Prices range widely. As of early 2026, single reports run about $44.99 at Carfax, $24.99 at AutoCheck, $14.99 at ClearVIN, and $9.99 at VINAudit, while Bumper uses a roughly $19.99 monthly subscription. CarCheckerVIN sells single reports for $14.99 with no subscription or auto-renewal. A free VIN decode confirms basic specs, but title brands, accident records, the odometer chain, and recalls require a paid report.",
  },
  {
    question: "Do I need a history report if the car looks clean?",
    answer:
      "Yes. A clean appearance does not reveal a salvage or flood title, a rolled-back odometer, an open safety recall, an unreleased lien, or accident damage that was cosmetically repaired. These problems are recorded in databases, not visible in a test drive. Running a report before you transact, ideally a fresh one within 24 hours of signing, is inexpensive insurance against buying a vehicle with a hidden, value-destroying history.",
  },
  {
    question: "How do I read a vehicle history report?",
    answer:
      "Read it top to bottom rather than relying on the summary panel. First confirm the report VIN matches the dashboard plate and door-jamb sticker. Check the title and brand history for salvage, flood, or lemon flags and title washing across states. Verify the odometer chain trends upward with no rollbacks. Review accident severity, airbag deployment, and structural repairs. Finally, cross-check open NHTSA recalls and confirm whether each was completed.",
  },
];

export const FAQS_ES = [
  {
    question: "¿Qué es un reporte de historial vehicular?",
    answer:
      "Un reporte de historial vehicular es un resumen estructurado de cada evento registrado vinculado a un VIN específico de 17 caracteres. Compila transferencias de título, marcas de título, declaraciones de odómetro, registros de accidentes y pérdida total, banderas de robo, actividad de gravamen y retiros de seguridad abiertos en una línea de tiempo cronológica. Los compradores lo usan para verificar el pasado de un auto usado antes de comprar, mostrando problemas que un vendedor puede no divulgar, como un título de salvamento, daño por inundación u odómetro retrocedido.",
  },
  {
    question: "¿Qué incluye un reporte de historial del auto?",
    answer:
      "Un reporte típico incluye historial de título y registro, registros de marcas (salvamento, reconstruido, inundación, chatarra, recompra de limón), la cadena de lecturas del odómetro, registros de accidentes y daños, banderas de robo y recuperación, historial de gravámenes y préstamos, retiros de seguridad abiertos y completados, listas de equipo de fábrica y, cuando esté disponible, registros de servicio y una estimación del valor de mercado. La cobertura de datos de servicio y accidentes varía por proveedor, ya que esas fuentes son parcialmente voluntarias.",
  },
  {
    question: "¿De dónde provienen los datos del reporte de historial vehicular?",
    answer:
      "Los reportes confiables se nutren de varias fuentes autorizadas. NMVTIS, operado por el Departamento de Justicia de EE. UU., agrega datos de título y marcas de los DMV estatales a nivel nacional. NICB compila registros de robo y pérdida total de aseguradoras. NHTSA publica campañas de retiros de seguridad y decodificación de VIN. Datos adicionales provienen de subastas de salvamento, registros de construcción y garantía del fabricante (OEM) y redes de servicio independientes. Los proveedores difieren principalmente en cómo integran y actualizan estos flujos de datos.",
  },
  {
    question: "¿Qué tan precisos y completos son los reportes de historial vehicular?",
    answer:
      "Ningún reporte de historial vehicular está 100% completo. Un reporte solo muestra eventos que fueron realmente reportados a sus bases de datos fuente, así que un golpecito reparado de tu bolsillo o un reclamo de inundación que nunca llegó a una aseguradora no aparecerá. Los reportes completos atrapan la gran mayoría de los problemas significativos como marcas de título y fraude de odómetro, pero son necesarios, no suficientes. Siempre combina un reporte con una inspección mecánica antes de la compra en persona.",
  },
  {
    question: "¿Cuánto cuesta un reporte de historial vehicular?",
    answer:
      "Los precios varían ampliamente. A principios de 2026, los reportes individuales cuestan alrededor de $44.99 USD en Carfax, $24.99 USD en AutoCheck, $14.99 USD en ClearVIN y $9.99 USD en VINAudit, mientras que Bumper usa una suscripción mensual de aproximadamente $19.99 USD. CarCheckerVIN vende reportes individuales por $14.99 USD sin suscripción ni renovación automática. Una decodificación VIN gratis confirma las especificaciones básicas, pero las marcas de título, registros de accidentes, la cadena del odómetro y los retiros de seguridad requieren un reporte pagado.",
  },
  {
    question: "¿Necesito un reporte de historial si el auto se ve limpio?",
    answer:
      "Sí. Una apariencia limpia no revela un título de salvamento o inundación, un odómetro retrocedido, un retiro de seguridad abierto, un gravamen no liberado o daño por accidente reparado cosméticamente. Estos problemas están registrados en bases de datos, no son visibles en una prueba de manejo. Ejecutar un reporte antes de transar, idealmente uno fresco dentro de las 24 horas de firmar, es un seguro económico contra comprar un vehículo con un historial oculto que destruye valor.",
  },
  {
    question: "¿Cómo leo un reporte de historial vehicular?",
    answer:
      "Léelo de arriba a abajo en lugar de confiar en el panel de resumen. Primero confirma que el VIN del reporte coincida con la placa del tablero y la calcomanía del marco de la puerta. Verifica el historial de título y marcas para banderas de salvamento, inundación o limón y lavado de título entre estados. Verifica que la cadena del odómetro tienda al alza sin retrocesos. Revisa la gravedad de accidentes, el despliegue de bolsas de aire y las reparaciones estructurales. Finalmente, cruza retiros de seguridad abiertos de NHTSA y confirma si cada uno fue completado.",
  },
];

const COPY = {
  en: {
    home: "Home",
    guides: "Guides",
    crumb: "Vehicle History Report Guide",
    h1: "Vehicle History Reports: Everything You Need to Know",
    intro:
      "A vehicle history report is the single most important document in a used-car transaction \u2014 more important than the listing, the test drive, and even the bill of sale. It is the document that tells you what a seller cannot or will not. This guide covers every section of a modern history report: where the data originates, how to read each section, what to watch for, and how the major providers actually compare in 2026.",
    pullCardTitle: "Pull a history report now",
    pullCardSub:
      "Decode any 17-character VIN to start a free vehicle history check. Premium reports unlock title brands, accidents, odometer chain, and recalls.",
    tocLabel: "Table of contents",
    tocHeading: "In this guide",
    toc: [
      { id: "what-is", label: "What a vehicle history report is" },
      { id: "data-sources", label: "Where the data comes from" },
      { id: "sections", label: "Section-by-section walkthrough" },
      { id: "title", label: "Reading title and brand history" },
      { id: "odometer", label: "Odometer chain and rollback detection" },
      { id: "accidents", label: "Accident and damage records" },
      { id: "recalls", label: "Recalls and safety campaigns" },
      { id: "market", label: "Market value and comparable listings" },
      { id: "compare", label: "Comparing providers" },
      { id: "faq", label: "Frequently asked questions" },
    ],

    whatIsH2: "What a vehicle history report is",
    whatIsP1:
      "A vehicle history report is a structured summary of every recorded event tied to a specific VIN. It draws on title transfers, odometer disclosures, insurance claims, theft reports, accident records, recall campaigns, and service-shop activity. Modern reports present that data chronologically, surfacing the information that matters for a buying decision: title brands, prior owners, accident severity, mileage consistency, and outstanding safety issues.",
    whatIsP2:
      "History reports are not infallible. They reflect what has been reported into the underlying databases, and unreported incidents (a fender-bender repaired privately, a flood claim that never went to insurance) will not appear. Even so, a comprehensive report catches the vast majority of meaningful issues, and running one is a non-negotiable step in any used-car transaction.",

    dataSourcesH2: "Where the data comes from",
    dataSourcesIntro: "Five primary data sources feed every credible vehicle history report:",
    dataSources: [
      {
        boldLead: "NMVTIS",
        body:
          " \u2014 the National Motor Vehicle Title Information System, administered by the U.S. Department of Justice. Aggregates title and brand data from participating state DMVs. Federal law requires all states to report into NMVTIS eventually; nearly all do today. NMVTIS is the single most authoritative source for title-history data in the United States.",
      },
      {
        boldLead: "NICB",
        body:
          " \u2014 the National Insurance Crime Bureau. Aggregates theft and total-loss data from over 1,200 member insurance carriers covering the vast majority of the U.S. insured vehicle fleet. Authoritative source for stolen-vehicle and salvage records.",
      },
      {
        boldLead: "NHTSA",
        body:
          " \u2014 the National Highway Traffic Safety Administration. Publishes recall campaigns, defect investigations, and the vPIC VIN decoding database used industry-wide.",
      },
      {
        boldLead: "Manufacturer (OEM) records",
        body:
          " \u2014 factory build sheets, original equipment lists, warranty records, and dealer service activity. Coverage varies by brand and licensing arrangement.",
      },
      {
        boldLead: "Independent service networks",
        body:
          " \u2014 aftermarket repair shops, oil-change chains, tire and inspection providers, and body shops. These sources are voluntary and incomplete; absence of service records does not mean a vehicle was not maintained.",
      },
    ],
    dataSourcesOutro:
      "Provider differences are largely about how they integrate these sources, how often they refresh, and what proprietary data layer they add on top. CarCheckerVIN\u2019s reports pull from NMVTIS-approved providers and NICB and NHTSA, with manufacturer data integrated where licensing permits.",

    sectionsH2: "Section-by-section walkthrough",
    sectionsIntro:
      "A modern vehicle history report opens with a header section confirming the VIN, decoded specifications (year, make, model, trim, engine, transmission, body, drivetrain), and a summary panel that flags any critical findings. Below that, the report typically breaks into the following sections:",
    sectionsList: [
      "Title and registration history",
      "Brand history (salvage, rebuilt, flood, lemon, etc.)",
      "Odometer reading chain",
      "Accident and damage history",
      "Theft and recovery records",
      "Recall and defect campaigns",
      "Lien and loan history",
      "Service and inspection records",
      "Equipment and option list",
      "Market value and comparable listings",
    ],
    sectionsOutro:
      "Read the report top to bottom, not just the summary panel. The summary surfaces the most obvious red flags, but subtle issues (an unusual ownership pattern, a service gap, a brief out-of-state registration) live deeper in the report.",

    titleH2: "Reading title and brand history",
    titleIntro:
      "The title section lists every recorded title event: issue, transfer, reissue, and any associated brands. The brand history shows every classification ever attached to the vehicle \u2014 salvage, rebuilt, flood, junk, lemon, manufacturer buyback, taxi, fleet, police, and so on. Pay particular attention to:",
    titleBullet1Bold: "Brand washing.",
    titleBullet1Mid:
      " A brand reported in one state but missing from a later state\u2019s title is the classic title-washing fingerprint. See our ",
    titleBullet1Link: "salvage title check",
    titleBullet1Suffix: " for how this works.",
    titleBullet2Bold: "Multi-state hopping.",
    titleBullet2Body:
      " A vehicle titled in three or more states inside five years warrants extra scrutiny. Some moves are legitimate (military, relocation), but rapid hopping is also the playbook for laundering branded titles.",
    titleBullet3Bold: "Use-case brands.",
    titleBullet3Body:
      " Taxi, police, rental, and fleet brands are not necessarily deal breakers but signal high mileage and accelerated wear.",

    odometerH2: "Odometer chain and rollback detection",
    odometerIntro:
      "Every NMVTIS title transfer captures an odometer disclosure. The chain of those readings is what exposes rollback. Three patterns to watch for:",
    odoItem1Bold: "Direct decrease.",
    odoItem1Body: " A reading lower than a previous reading is unambiguous rollback.",
    odoItem2Bold: "Implausible plateau.",
    odoItem2Body:
      " A vehicle showing 84,000 miles in 2022 and 86,000 miles in 2026 is suspicious unless the seller can document storage or non-use.",
    odoItem3Bold: "NOT ACTUAL flag.",
    odoItem3Body:
      " A title may carry a federal disclosure flag (\u201cnot actual,\u201d \u201cexceeds mechanical limits\u201d) that persists in NMVTIS even after the title is transferred. Treat any such flag as definitive.",
    odoOutroPre: "Our ",
    odoOutroLink: "odometer check",
    odoOutroSuffix:
      " tool runs the entire NMVTIS reading chain through a monotonicity validation and surfaces all three patterns automatically.",

    accidentsH2: "Accident and damage records",
    accidentsIntro:
      "The accident section reports every recorded incident and what is known about it: date, location, severity classification, area of impact, airbag deployment, and any structural-repair indicators. Severity classifications are typically reported by source (insurer, police agency, body shop) and may use different scales. Read for:",
    accItem1Bold: "Structural damage.",
    accItem1Body:
      " Frame or unibody repairs change the long-term safety and resale value of the vehicle.",
    accItem2Bold: "Airbag deployment.",
    accItem2Body:
      " Indicates a significant impact and triggers a chain of replacements (airbag modules, sensors, sometimes steering components).",
    accItem3Bold: "Multiple incidents.",
    accItem3Body:
      " Two or three minor accidents are not necessarily disqualifying; a vehicle with five-plus reported incidents is.",
    accItem4Bold: "Claim severity vs. listing description.",
    accItem4Body:
      " A \u201cmoderate\u201d insurance claim with a seller describing it as a \u201ctap in a parking lot\u201d should prompt a closer look.",
    accOutroPre: "Pair the accident section with our ",
    accOutroLink: "accident history check",
    accOutroSuffix: " for the deepest available view.",

    recallsH2: "Recalls and safety campaigns",
    recallsP1:
      "NHTSA maintains the authoritative database of recalls. A history report cross-references the VIN against open and completed recall campaigns. The distinction matters: an open recall is a free manufacturer fix you can schedule with any franchise dealer; a closed recall has already been performed. Buyers should treat any open recall as a budget item (free in time, sometimes hours of dealer wait) and verify completion in writing.",
    recallsP2Pre:
      "One pitfall worth flagging: recall notices are typically mailed to the registered owner. A vehicle that has changed hands two or three times since a recall was issued may have an open campaign that no current owner has ever received notice of. Always cross-check the report\u2019s recall section. Vehicles with a history of lemon-law buybacks warrant our dedicated ",
    recallsP2Link: "lemon check",
    recallsP2Suffix: ".",

    marketH2: "Market value and comparable listings",
    marketP1:
      "Premium history reports include a market-value estimate and a list of comparable listings within your region. The market value is computed from recent transactions of similar VIN configurations (same year, trim, options, mileage band, region). Use it as one input alongside KBB, Edmunds, and CarGurus \u2014 not as a single source of truth.",
    marketP2:
      "The comparable listings are particularly useful for negotiation: walking into a dealership with five comparable units priced 8\u201312% below the sticker is a stronger argument than \u201cthis seems too high.\u201d Premium reports also include an estimate of how brand history affects market value \u2014 a salvage-titled vehicle typically trades 30\u201350% below clean-title comps.",

    compareH2: "Comparing providers",
    compareIntro:
      "Half a dozen providers dominate the consumer vehicle-history market. They differ on data coverage, refresh cadence, presentation, and pricing. We have published deep side-by-side comparisons on each:",
    compareItems: [
      {
        href: "/vin-check-vs-carfax",
        label: "CarCheckerVIN vs. Carfax",
        body:
          " \u2014 Carfax has the deepest service-history dataset; CarCheckerVIN matches on title and accident data at a fraction of the price.",
      },
      {
        href: "/vin-check-vs-autocheck",
        label: "CarCheckerVIN vs. AutoCheck",
        body:
          " \u2014 AutoCheck\u2019s scoring system is auction-focused; CarCheckerVIN presents raw data with cleaner navigation for individual buyers.",
      },
      {
        href: "/vin-check-vs-vinaudit",
        label: "CarCheckerVIN vs. VINAudit",
        body:
          " \u2014 both NMVTIS-approved; CarCheckerVIN adds market-value modeling and a more polished consumer interface.",
      },
      {
        href: "/vin-check-vs-clearvin",
        label: "CarCheckerVIN vs. ClearVIN",
        body:
          " \u2014 comparable feature sets; CarCheckerVIN wins on report readability and recall integration.",
      },
      {
        href: "/vin-check-vs-bumper",
        label: "CarCheckerVIN vs. Bumper",
        body:
          " \u2014 Bumper bundles via subscription; CarCheckerVIN sells per-report with no recurring charges.",
      },
    ],
    compareOutroPre: "For a deeper look at our editorial standards and data partnerships, see our ",
    compareOutroLink: "trust and data sources",
    compareOutroSuffix: " page.",

    faqH2: "Frequently asked questions",

    lienH2: "Lien and lender records",
    lienP1:
      "The lien section of a vehicle history report shows whether any active lender holds a claim against the title. This matters for two reasons. First, an active lien means the title cannot transfer cleanly until the lien is released \u2014 the lender either receives payoff and issues a release, or signs off as the title transfers with the new buyer assuming the obligation. Second, an unreleased historical lien (where the loan was paid but the lender never filed the release) creates a paperwork tangle that can delay registration for weeks.",
    lienP2:
      "Read this section carefully on private-party transactions. Verify that any lien shown as active has been released as of the transaction date, and that the seller can produce written release documentation if the report shows a historical lien. If the report shows an active lien at the moment of inspection, your bank or credit union will typically wire payoff directly to the lender, with the title routed to your address afterward; do not pay the seller directly for a financed vehicle.",

    equipmentH2: "Equipment, options, and build-sheet data",
    equipmentP1:
      "Many premium history reports include a factory equipment list derived from the manufacturer\u2019s build sheet. This is the original list of every option installed at the factory: trim level, wheel package, infotainment package, safety equipment, drivetrain options, and so on. Reading it against the vehicle in front of you exposes two things. First, undisclosed downgrades: cosmetic wheels swapped for cheaper aftermarket sets, premium audio systems pulled and replaced with generic head units, factory navigation removed. Second, undisclosed upgrades: certain aftermarket modifications affect insurance, warranty coverage, and even legality (e.g., emissions tunes that fail state inspections).",
    equipmentP2:
      "The build-sheet data also matters for parts ordering and warranty work. Many components are VIN-specific or trim-specific, and a dealer parts counter that knows the original build avoids ordering wrong parts that delay repairs.",

    intlH2: "International coverage and limitations",
    intlP1:
      "Vehicle history reports are most comprehensive for vehicles titled and registered exclusively in the United States. International coverage varies dramatically. Canadian title and registration data is reasonably integrated with U.S. providers via cross-border data agreements, but Mexican data is sparser. Vehicles imported from Europe, Japan, or other markets typically have no pre-import history available in U.S.-focused reports. If you are buying a recently imported vehicle, the U.S. history begins on the date of registration in this country \u2014 everything before that requires a separate paid service from a provider with access to the source country\u2019s data.",
    intlP2:
      "For exported vehicles, the chain may break in the opposite direction. A vehicle exported and then re-imported (a pattern sometimes used to launder branded titles) may have an opaque international gap in the history. Treat any export-then-reimport pattern as a serious red flag and demand documentary evidence from the seller before transacting.",

    limitsH2: "What a vehicle history report cannot tell you",
    limitsIntro:
      "Setting accurate expectations matters as much as understanding what a report includes. Several categories of vehicle history are systematically absent from even the best reports:",
    limitsItems: [
      {
        boldLead: "Unreported damage.",
        body: " Bodywork done out-of-pocket without an insurance claim never reaches a history report database.",
      },
      {
        boldLead: "Independent service work.",
        body: " Maintenance performed at a non-network mechanic or by the owner is invisible.",
      },
      {
        boldLead: "Cosmetic and interior condition.",
        body: " Reports do not show photos of the current vehicle, only historical events.",
      },
      {
        boldLead: "Mechanical condition today.",
        body: " A clean history does not guarantee the engine, transmission, or driveline are healthy at the moment of inspection.",
      },
      {
        boldLead: "Modifications and aftermarket parts.",
        body: " Lift kits, performance tunes, swapped engines, and other modifications generally do not appear.",
      },
    ],
    limitsOutro:
      "This is why a history report is necessary but not sufficient. The full pre-purchase protocol is the history report plus an in-person inspection plus a paid independent pre-purchase inspection from a mechanic with no relationship to the seller. Each layer catches what the others miss.",

    serviceH2: "Reading service and ownership history",
    serviceP1:
      "The service-history section is where reports differ most dramatically by provider. Carfax partners directly with chains and franchise dealers, capturing oil changes, tire rotations, inspection events, and warranty work. Other providers depend more heavily on state inspection station feeds, which vary by jurisdiction. None of them capture every service event, and absence of a record does not mean absence of service.",
    serviceP2:
      "What to read for: regular service intervals consistent with manufacturer recommendations (every 5,000\u201310,000 miles for oil changes, depending on engine and oil type), inspection events showing the vehicle passing in successive years, and any warranty-claim records that indicate manufacturer involvement. A dense service record is reassuring. A sparse record is not necessarily disqualifying but warrants asking the seller for personal service receipts.",
    serviceP3:
      "The ownership section reports the number of previous owners and, in some cases, the type of owner (personal, lease, fleet, rental). Look for an unusual ownership pattern: three owners in three years on a vehicle with average mileage is unusual and worth investigating. Each transfer represents a moment when an owner decided to sell \u2014 consistent ownership churn often signals an underlying problem the early owners discovered.",

    pricingH2: "Pricing of vehicle history reports in 2026",
    pricingIntro:
      "Pricing varies more than buyers realize. As of early 2026, the major providers price roughly as follows:",
    pricingItems: [
      {
        boldLead: "Carfax",
        body: " \u2014 $44.99 single report, $99.99 three-pack, $44.99 unlimited 30-day. Highest-priced consumer report on the market.",
      },
      {
        boldLead: "AutoCheck",
        body: " \u2014 $24.99 single, $49.99 25-pack monthly subscription. Auction-house standard.",
      },
      {
        boldLead: "VINAudit",
        body: " \u2014 $9.99 single, $24.99 unlimited monthly. NMVTIS-approved provider.",
      },
      {
        boldLead: "ClearVIN",
        body: " \u2014 $14.99 single, variable bulk pricing.",
      },
      {
        boldLead: "Bumper",
        body: " \u2014 $19.99 monthly subscription with included unlimited reports during the period.",
      },
      {
        boldLead: "CarCheckerVIN",
        body: " \u2014 $14.99 single report, no subscription, no auto-renewal.",
      },
    ],
    pricingOutroPre:
      "For high-volume buyers (dealers, fleet managers, wholesale brokers), the per-report economics shift substantially. Most providers offer dealer pricing tiers that drop per-report cost meaningfully. Our dedicated ",
    pricingOutroLink: "dealer-pricing page",
    pricingOutroSuffix: " walks through the bulk rate structure for sales floors and brokers.",

    stagesH2: "How to use a history report at each transaction stage",
    stagesIntro:
      "A vehicle history report has different value at different stages of the buying process. Pulling one too early (before you have decided you are interested) wastes money; pulling one too late (after you have signed paperwork) is useless.",
    stageInitialBold: "Initial screening.",
    stageInitialBody:
      " Use a free VIN decode to confirm the vehicle\u2019s specifications match the listing. No paid report needed yet. Free decodes catch listing misrepresentation in 30 seconds.",
    stagePreVisitBold: "Pre-visit verification.",
    stagePreVisitBody:
      " Once you are seriously interested, pull a paid history report before driving to the seller. The report tells you whether the vehicle is worth the trip; walking away over the phone is far cheaper than walking away after a 90-minute drive.",
    stageInspectionBold: "At inspection.",
    stageInspectionBody:
      " Bring a printed copy of the report to the in-person inspection. Verify each recorded event aligns with what the seller has disclosed and what you can see on the vehicle. Mismatches are negotiating leverage.",
    stageSigningBold: "At signing.",
    stageSigningBody:
      " Pull a fresh report within 24 hours of signing the purchase paperwork. New events do appear in NMVTIS data, and a fresh report ensures no last-minute brand or lien has been recorded between your earlier check and the transaction.",
    stagePostBold: "Post-purchase.",
    stagePostBody:
      " A report immediately after registration locks in the vehicle\u2019s state at the moment ownership changed. If a future dispute arises, having a dated report from the day of purchase is valuable documentary evidence.",

    relatedH2: "Related reading",
    related: [
      { href: "/vin-check", title: "VIN check", desc: "Decode any VIN and pull a full report." },
      { href: "/vin-check-vs-carfax", title: "vs. Carfax", desc: "How the two providers compare in 2026." },
      { href: "/vin-check-vs-autocheck", title: "vs. AutoCheck", desc: "Auction-focused scoring vs. raw data." },
      { href: "/vin-check-vs-vinaudit", title: "vs. VINAudit", desc: "Two NMVTIS-approved providers compared." },
      { href: "/vin-check-vs-clearvin", title: "vs. ClearVIN", desc: "Feature-by-feature comparison." },
      { href: "/vin-check-vs-bumper", title: "vs. Bumper", desc: "Per-report vs. subscription pricing." },
      { href: "/trust", title: "Trust & data sources", desc: "How we source NMVTIS, NICB, NHTSA, OEM data." },
      { href: "/blog", title: "CarCheckerVIN blog", desc: "Fresh research on history reports and fraud." },
    ],

    continueH2: "Continue learning",
    continuePre: "Ready to read your first report? Decode any VIN at our ",
    continueMidLink: "VIN check",
    continueMid: " tool, or read the broader ",
    continueGuideLink: "used car buying guide",
    continueSuffix: " to see how the report fits into the rest of the transaction.",

    bottomCtaH2: "Pull a vehicle history report",
    bottomCtaSub:
      "Title brands, accident records, odometer chain, and recalls \u2014 all in one report sourced from NMVTIS, NICB, and NHTSA.",
  },
  es: {
    home: "Inicio",
    guides: "Guías",
    crumb: "Guía del reporte de historial vehicular",
    h1: "Reportes de historial vehicular: todo lo que necesitas saber",
    intro:
      "Un reporte de historial vehicular es el documento más importante en una transacción de auto usado \u2014 más importante que el anuncio, la prueba de manejo e incluso la factura de compra. Es el documento que te dice lo que un vendedor no puede o no quiere. Esta guía cubre cada sección de un reporte de historial moderno: de dónde provienen los datos, cómo leer cada sección, qué vigilar y cómo los principales proveedores realmente se comparan en 2026.",
    pullCardTitle: "Obtén un reporte de historial ahora",
    pullCardSub:
      "Decodifica cualquier VIN de 17 caracteres para iniciar una verificación gratis de historial vehicular. Los reportes premium desbloquean marcas de título, accidentes, cadena del odómetro y retiros de seguridad.",
    tocLabel: "Tabla de contenidos",
    tocHeading: "En esta guía",
    toc: [
      { id: "what-is", label: "Qué es un reporte de historial vehicular" },
      { id: "data-sources", label: "De dónde provienen los datos" },
      { id: "sections", label: "Recorrido sección por sección" },
      { id: "title", label: "Lectura del historial de título y marcas" },
      { id: "odometer", label: "Cadena del odómetro y detección de retrocesos" },
      { id: "accidents", label: "Registros de accidentes y daños" },
      { id: "recalls", label: "Retiros de seguridad y campañas" },
      { id: "market", label: "Valor de mercado y anuncios comparables" },
      { id: "compare", label: "Comparativa de proveedores" },
      { id: "faq", label: "Preguntas frecuentes" },
    ],

    whatIsH2: "Qué es un reporte de historial vehicular",
    whatIsP1:
      "Un reporte de historial vehicular es un resumen estructurado de cada evento registrado vinculado a un VIN específico. Se nutre de transferencias de título, declaraciones de odómetro, reclamos de seguro, reportes de robo, registros de accidentes, campañas de retiros de seguridad y actividad de talleres de servicio. Los reportes modernos presentan esos datos cronológicamente, mostrando la información que importa para una decisión de compra: marcas de título, propietarios previos, gravedad de accidentes, consistencia de kilometraje y problemas de seguridad pendientes.",
    whatIsP2:
      "Los reportes de historial no son infalibles. Reflejan lo que se ha reportado a las bases de datos subyacentes, y los incidentes no reportados (un golpecito reparado en privado, un reclamo de inundación que nunca llegó al seguro) no aparecerán. Aun así, un reporte completo atrapa la gran mayoría de los problemas significativos, y ejecutar uno es un paso no negociable en cualquier transacción de auto usado.",

    dataSourcesH2: "De dónde provienen los datos",
    dataSourcesIntro: "Cinco fuentes principales de datos alimentan cada reporte de historial vehicular confiable:",
    dataSources: [
      {
        boldLead: "NMVTIS",
        body:
          " \u2014 el Sistema Nacional de Información de Títulos de Vehículos Motorizados, administrado por el Departamento de Justicia de EE. UU. Agrega datos de título y marcas de los DMV estatales participantes. La ley federal requiere que todos los estados reporten a NMVTIS eventualmente; casi todos lo hacen hoy. NMVTIS es la fuente más autorizada para datos de historial de título en Estados Unidos.",
      },
      {
        boldLead: "NICB",
        body:
          " \u2014 el National Insurance Crime Bureau. Agrega datos de robo y pérdida total de más de 1,200 aseguradoras miembro que cubren la gran mayoría de la flota de vehículos asegurados de EE. UU. Fuente autorizada para registros de vehículos robados y de salvamento.",
      },
      {
        boldLead: "NHTSA",
        body:
          " \u2014 la National Highway Traffic Safety Administration. Publica campañas de retiros de seguridad, investigaciones de defectos y la base de datos vPIC de decodificación de VIN usada en toda la industria.",
      },
      {
        boldLead: "Registros del fabricante (OEM)",
        body:
          " \u2014 hojas de construcción de fábrica, listas de equipo original, registros de garantía y actividad de servicio del concesionario. La cobertura varía por marca y acuerdo de licencia.",
      },
      {
        boldLead: "Redes independientes de servicio",
        body:
          " \u2014 talleres de reparación de repuesto, cadenas de cambio de aceite, proveedores de llantas e inspección y talleres de carrocería. Estas fuentes son voluntarias e incompletas; la ausencia de registros de servicio no significa que un vehículo no se haya mantenido.",
      },
    ],
    dataSourcesOutro:
      "Las diferencias entre proveedores se tratan principalmente de cómo integran estas fuentes, con qué frecuencia las actualizan y qué capa de datos propietaria agregan encima. Los reportes de CarCheckerVIN se nutren de proveedores aprobados por NMVTIS y de NICB y NHTSA, con datos del fabricante integrados donde la licencia lo permite.",

    sectionsH2: "Recorrido sección por sección",
    sectionsIntro:
      "Un reporte de historial vehicular moderno abre con una sección de encabezado que confirma el VIN, las especificaciones decodificadas (año, marca, modelo, versión, motor, transmisión, carrocería, tren motriz) y un panel de resumen que señala cualquier hallazgo crítico. Debajo de eso, el reporte típicamente se divide en las siguientes secciones:",
    sectionsList: [
      "Historial de título y registro",
      "Historial de marcas (salvamento, reconstruido, inundación, limón, etc.)",
      "Cadena de lecturas del odómetro",
      "Historial de accidentes y daños",
      "Registros de robo y recuperación",
      "Campañas de retiros de seguridad y defectos",
      "Historial de gravámenes y préstamos",
      "Registros de servicio e inspección",
      "Lista de equipo y opciones",
      "Valor de mercado y anuncios comparables",
    ],
    sectionsOutro:
      "Lee el reporte de arriba a abajo, no solo el panel de resumen. El resumen muestra las banderas rojas más obvias, pero los problemas sutiles (un patrón de propiedad inusual, una brecha de servicio, un registro breve fuera del estado) viven más a fondo en el reporte.",

    titleH2: "Lectura del historial de título y marcas",
    titleIntro:
      "La sección de título lista cada evento de título registrado: emisión, transferencia, reemisión y cualquier marca asociada. El historial de marcas muestra cada clasificación alguna vez adjunta al vehículo \u2014 salvamento, reconstruido, inundación, chatarra, limón, recompra del fabricante, taxi, flota, policía y demás. Presta especial atención a:",
    titleBullet1Bold: "Lavado de marcas.",
    titleBullet1Mid:
      " Una marca reportada en un estado pero ausente del título de un estado posterior es la huella clásica del lavado de título. Mira nuestra ",
    titleBullet1Link: "verificación de título de salvamento",
    titleBullet1Suffix: " para ver cómo funciona esto.",
    titleBullet2Bold: "Salto entre múltiples estados.",
    titleBullet2Body:
      " Un vehículo titulado en tres o más estados dentro de cinco años justifica escrutinio extra. Algunos movimientos son legítimos (militar, reubicación), pero el salto rápido también es el manual para lavar títulos marcados.",
    titleBullet3Bold: "Marcas por uso.",
    titleBullet3Body:
      " Las marcas de taxi, policía, alquiler y flota no son necesariamente deal breakers pero señalan alto kilometraje y desgaste acelerado.",

    odometerH2: "Cadena del odómetro y detección de retrocesos",
    odometerIntro:
      "Cada transferencia de título en NMVTIS captura una declaración del odómetro. La cadena de esas lecturas es lo que expone el retroceso. Tres patrones para vigilar:",
    odoItem1Bold: "Disminución directa.",
    odoItem1Body: " Una lectura menor que una lectura previa es retroceso inequívoco.",
    odoItem2Bold: "Meseta inverosímil.",
    odoItem2Body:
      " Un vehículo que muestra 84,000 millas en 2022 y 86,000 millas en 2026 es sospechoso a menos que el vendedor pueda documentar almacenamiento o no uso.",
    odoItem3Bold: "Bandera NOT ACTUAL.",
    odoItem3Body:
      " Un título puede llevar una bandera federal de declaración (\u201cno real\u201d, \u201cexcede los límites mecánicos\u201d) que persiste en NMVTIS incluso después de transferirse el título. Trata cualquier bandera de ese tipo como definitiva.",
    odoOutroPre: "Nuestra herramienta de ",
    odoOutroLink: "verificación de odómetro",
    odoOutroSuffix:
      " ejecuta toda la cadena de lecturas de NMVTIS a través de una validación de monotonicidad y muestra los tres patrones automáticamente.",

    accidentsH2: "Registros de accidentes y daños",
    accidentsIntro:
      "La sección de accidentes reporta cada incidente registrado y lo que se sabe sobre él: fecha, ubicación, clasificación de gravedad, área de impacto, despliegue de bolsas de aire y cualquier indicador de reparación estructural. Las clasificaciones de gravedad típicamente se reportan por fuente (aseguradora, agencia policial, taller de carrocería) y pueden usar escalas diferentes. Lee buscando:",
    accItem1Bold: "Daño estructural.",
    accItem1Body:
      " Las reparaciones al chasis o unibody cambian la seguridad a largo plazo y el valor de reventa del vehículo.",
    accItem2Bold: "Despliegue de bolsas de aire.",
    accItem2Body:
      " Indica un impacto significativo y dispara una cadena de reemplazos (módulos de bolsa de aire, sensores, a veces componentes de dirección).",
    accItem3Bold: "Múltiples incidentes.",
    accItem3Body:
      " Dos o tres accidentes menores no son necesariamente descalificantes; un vehículo con cinco o más incidentes reportados sí lo es.",
    accItem4Bold: "Gravedad del reclamo vs. descripción del anuncio.",
    accItem4Body:
      " Un reclamo de seguro \u201cmoderado\u201d con un vendedor describiéndolo como un \u201ctoquecito en un estacionamiento\u201d debería motivar una mirada más cercana.",
    accOutroPre: "Combina la sección de accidentes con nuestra ",
    accOutroLink: "verificación de historial de accidentes",
    accOutroSuffix: " para la vista más profunda disponible.",

    recallsH2: "Retiros de seguridad y campañas",
    recallsP1:
      "NHTSA mantiene la base de datos autorizada de retiros de seguridad. Un reporte de historial cruza el VIN contra campañas de retiros abiertas y completadas. La distinción importa: un retiro abierto es una reparación gratis del fabricante que puedes agendar con cualquier concesionario de franquicia; un retiro cerrado ya se realizó. Los compradores deben tratar cualquier retiro abierto como un ítem de presupuesto (gratis en dinero, a veces horas de espera en el concesionario) y verificar la finalización por escrito.",
    recallsP2Pre:
      "Una trampa que vale la pena señalar: los avisos de retiro típicamente se envían por correo al propietario registrado. Un vehículo que ha cambiado de manos dos o tres veces desde que se emitió un retiro puede tener una campaña abierta de la que ningún propietario actual ha recibido aviso. Siempre cruza la sección de retiros del reporte. Los vehículos con historial de recompras por ley de limón ameritan nuestra dedicada ",
    recallsP2Link: "verificación de limones",
    recallsP2Suffix: ".",

    marketH2: "Valor de mercado y anuncios comparables",
    marketP1:
      "Los reportes premium de historial incluyen una estimación de valor de mercado y una lista de anuncios comparables dentro de tu región. El valor de mercado se calcula a partir de transacciones recientes de configuraciones VIN similares (mismo año, versión, opciones, banda de kilometraje, región). Úsalo como una entrada junto con KBB, Edmunds y CarGurus \u2014 no como una sola fuente de verdad.",
    marketP2:
      "Los anuncios comparables son particularmente útiles para negociar: entrar a un concesionario con cinco unidades comparables con precio 8\u201312% por debajo de la etiqueta es un argumento más fuerte que \u201cesto parece muy alto\u201d. Los reportes premium también incluyen una estimación de cómo el historial de marcas afecta el valor de mercado \u2014 un vehículo con título de salvamento típicamente se comercia 30\u201350% por debajo de comparables con título limpio.",

    compareH2: "Comparativa de proveedores",
    compareIntro:
      "Media docena de proveedores dominan el mercado de historial vehicular para consumidores. Difieren en cobertura de datos, cadencia de actualización, presentación y precios. Hemos publicado comparaciones profundas lado a lado sobre cada uno:",
    compareItems: [
      {
        href: "/vin-check-vs-carfax",
        label: "CarCheckerVIN vs. Carfax",
        body:
          " \u2014 Carfax tiene el conjunto de datos de historial de servicio más profundo; CarCheckerVIN iguala en datos de título y accidentes a una fracción del precio.",
      },
      {
        href: "/vin-check-vs-autocheck",
        label: "CarCheckerVIN vs. AutoCheck",
        body:
          " \u2014 el sistema de puntuación de AutoCheck está enfocado en subastas; CarCheckerVIN presenta datos crudos con navegación más limpia para compradores individuales.",
      },
      {
        href: "/vin-check-vs-vinaudit",
        label: "CarCheckerVIN vs. VINAudit",
        body:
          " \u2014 ambos aprobados por NMVTIS; CarCheckerVIN agrega modelado de valor de mercado y una interfaz de consumidor más pulida.",
      },
      {
        href: "/vin-check-vs-clearvin",
        label: "CarCheckerVIN vs. ClearVIN",
        body:
          " \u2014 conjuntos de funciones comparables; CarCheckerVIN gana en legibilidad del reporte e integración de retiros de seguridad.",
      },
      {
        href: "/vin-check-vs-bumper",
        label: "CarCheckerVIN vs. Bumper",
        body:
          " \u2014 Bumper agrupa vía suscripción; CarCheckerVIN vende por reporte sin cargos recurrentes.",
      },
    ],
    compareOutroPre:
      "Para una mirada más profunda a nuestros estándares editoriales y asociaciones de datos, mira nuestra página de ",
    compareOutroLink: "confianza y fuentes de datos",
    compareOutroSuffix: ".",

    faqH2: "Preguntas frecuentes",

    lienH2: "Registros de gravamen y prestamista",
    lienP1:
      "La sección de gravamen de un reporte de historial vehicular muestra si algún prestamista activo tiene un reclamo contra el título. Esto importa por dos razones. Primero, un gravamen activo significa que el título no puede transferirse limpiamente hasta que el gravamen se libere \u2014 el prestamista recibe el pago y emite una liberación, o firma mientras el título se transfiere con el nuevo comprador asumiendo la obligación. Segundo, un gravamen histórico no liberado (donde el préstamo se pagó pero el prestamista nunca presentó la liberación) crea un enredo de papeleo que puede retrasar el registro por semanas.",
    lienP2:
      "Lee esta sección cuidadosamente en transacciones entre particulares. Verifica que cualquier gravamen mostrado como activo haya sido liberado a la fecha de la transacción, y que el vendedor pueda producir documentación escrita de liberación si el reporte muestra un gravamen histórico. Si el reporte muestra un gravamen activo al momento de la inspección, tu banco o cooperativa típicamente transferirá el pago directamente al prestamista, con el título enviado a tu dirección después; no le pagues directamente al vendedor por un vehículo financiado.",

    equipmentH2: "Equipo, opciones y datos de hoja de construcción",
    equipmentP1:
      "Muchos reportes premium de historial incluyen una lista de equipo de fábrica derivada de la hoja de construcción del fabricante. Esta es la lista original de cada opción instalada en la fábrica: nivel de versión, paquete de ruedas, paquete de infoentretenimiento, equipo de seguridad, opciones del tren motriz, etcétera. Leerla contra el vehículo frente a ti expone dos cosas. Primero, degradaciones no divulgadas: ruedas cosméticas cambiadas por sets de repuesto más baratos, sistemas de audio premium retirados y reemplazados por unidades genéricas, navegación de fábrica removida. Segundo, mejoras no divulgadas: ciertas modificaciones de repuesto afectan el seguro, la cobertura de garantía e incluso la legalidad (por ejemplo, ajustes de emisiones que fallan inspecciones estatales).",
    equipmentP2:
      "Los datos de la hoja de construcción también importan para el pedido de partes y trabajo de garantía. Muchos componentes son específicos al VIN o a la versión, y un mostrador de partes del concesionario que conoce la construcción original evita pedir partes equivocadas que retrasan las reparaciones.",

    intlH2: "Cobertura internacional y limitaciones",
    intlP1:
      "Los reportes de historial vehicular son más completos para vehículos titulados y registrados exclusivamente en Estados Unidos. La cobertura internacional varía dramáticamente. Los datos canadienses de título y registro están razonablemente integrados con los proveedores de EE. UU. vía acuerdos de datos transfronterizos, pero los datos mexicanos son más escasos. Los vehículos importados desde Europa, Japón u otros mercados típicamente no tienen historial previo a la importación disponible en reportes enfocados en EE. UU. Si estás comprando un vehículo recientemente importado, el historial de EE. UU. empieza en la fecha de registro en este país \u2014 todo antes de eso requiere un servicio pagado separado de un proveedor con acceso a los datos del país de origen.",
    intlP2:
      "Para vehículos exportados, la cadena puede romperse en la dirección opuesta. Un vehículo exportado y luego re-importado (un patrón a veces usado para lavar títulos marcados) puede tener una brecha internacional opaca en el historial. Trata cualquier patrón de exportar-luego-reimportar como una bandera roja seria y exige evidencia documental del vendedor antes de transar.",

    limitsH2: "Qué no puede decirte un reporte de historial vehicular",
    limitsIntro:
      "Establecer expectativas precisas importa tanto como entender qué incluye un reporte. Varias categorías de historial vehicular están sistemáticamente ausentes incluso de los mejores reportes:",
    limitsItems: [
      {
        boldLead: "Daño no reportado.",
        body: " La carrocería hecha de tu bolsillo sin un reclamo de seguro nunca llega a una base de datos de reporte de historial.",
      },
      {
        boldLead: "Trabajo de servicio independiente.",
        body: " El mantenimiento realizado en un mecánico fuera de red o por el propietario es invisible.",
      },
      {
        boldLead: "Condición cosmética e interior.",
        body: " Los reportes no muestran fotos del vehículo actual, solo eventos históricos.",
      },
      {
        boldLead: "Condición mecánica de hoy.",
        body: " Un historial limpio no garantiza que el motor, la transmisión o el tren motriz estén sanos al momento de la inspección.",
      },
      {
        boldLead: "Modificaciones y partes de repuesto.",
        body: " Kits de elevación, ajustes de rendimiento, motores intercambiados y otras modificaciones generalmente no aparecen.",
      },
    ],
    limitsOutro:
      "Por eso un reporte de historial es necesario pero no suficiente. El protocolo completo antes de la compra es el reporte de historial más una inspección en persona más una inspección antes de la compra independiente y pagada de un mecánico sin relación con el vendedor. Cada capa atrapa lo que las otras pierden.",

    serviceH2: "Lectura de historial de servicio y propiedad",
    serviceP1:
      "La sección de historial de servicio es donde los reportes difieren más dramáticamente por proveedor. Carfax se asocia directamente con cadenas y concesionarios de franquicia, capturando cambios de aceite, rotaciones de llantas, eventos de inspección y trabajo de garantía. Otros proveedores dependen más de los flujos de estaciones de inspección estatales, que varían por jurisdicción. Ninguno de ellos captura cada evento de servicio, y la ausencia de un registro no significa ausencia de servicio.",
    serviceP2:
      "Qué leer: intervalos de servicio regulares consistentes con las recomendaciones del fabricante (cada 5,000\u201310,000 millas para cambios de aceite, dependiendo del motor y tipo de aceite), eventos de inspección que muestran al vehículo pasando en años sucesivos y cualquier registro de reclamo de garantía que indique involucramiento del fabricante. Un registro denso de servicio es tranquilizador. Un registro escaso no es necesariamente descalificante pero amerita pedirle al vendedor recibos personales de servicio.",
    serviceP3:
      "La sección de propiedad reporta el número de propietarios previos y, en algunos casos, el tipo de propietario (personal, arrendamiento, flota, alquiler). Busca un patrón de propiedad inusual: tres propietarios en tres años en un vehículo con kilometraje promedio es inusual y vale la pena investigar. Cada transferencia representa un momento cuando un propietario decidió vender \u2014 la rotación constante de propiedad a menudo señala un problema subyacente que los propietarios tempranos descubrieron.",

    pricingH2: "Precios de reportes de historial vehicular en 2026",
    pricingIntro:
      "Los precios varían más de lo que los compradores se dan cuenta. A principios de 2026, los principales proveedores tienen precios aproximadamente así:",
    pricingItems: [
      {
        boldLead: "Carfax",
        body: " \u2014 $44.99 USD reporte individual, $99.99 USD paquete de tres, $44.99 USD ilimitado por 30 días. El reporte de consumidor más caro del mercado.",
      },
      {
        boldLead: "AutoCheck",
        body: " \u2014 $24.99 USD individual, $49.99 USD paquete de 25 con suscripción mensual. Estándar de casa de subastas.",
      },
      {
        boldLead: "VINAudit",
        body: " \u2014 $9.99 USD individual, $24.99 USD ilimitado mensual. Proveedor aprobado por NMVTIS.",
      },
      {
        boldLead: "ClearVIN",
        body: " \u2014 $14.99 USD individual, precios variables al por mayor.",
      },
      {
        boldLead: "Bumper",
        body: " \u2014 $19.99 USD suscripción mensual con reportes ilimitados incluidos durante el período.",
      },
      {
        boldLead: "CarCheckerVIN",
        body: " \u2014 $14.99 USD reporte individual, sin suscripción, sin renovación automática.",
      },
    ],
    pricingOutroPre:
      "Para compradores de alto volumen (concesionarios, gerentes de flota, corredores mayoristas), la economía por reporte cambia sustancialmente. La mayoría de los proveedores ofrecen niveles de precios para concesionarios que reducen el costo por reporte significativamente. Nuestra dedicada ",
    pricingOutroLink: "página de precios para concesionarios",
    pricingOutroSuffix:
      " recorre la estructura de tarifas al por mayor para pisos de ventas y corredores.",

    stagesH2: "Cómo usar un reporte de historial en cada etapa de la transacción",
    stagesIntro:
      "Un reporte de historial vehicular tiene diferente valor en diferentes etapas del proceso de compra. Sacar uno demasiado temprano (antes de que hayas decidido que estás interesado) desperdicia dinero; sacar uno demasiado tarde (después de haber firmado el papeleo) es inútil.",
    stageInitialBold: "Filtro inicial.",
    stageInitialBody:
      " Usa una decodificación VIN gratis para confirmar que las especificaciones del vehículo coincidan con el anuncio. Aún no se necesita un reporte pagado. Las decodificaciones gratis atrapan la tergiversación del anuncio en 30 segundos.",
    stagePreVisitBold: "Verificación antes de la visita.",
    stagePreVisitBody:
      " Una vez que estés seriamente interesado, saca un reporte pagado de historial antes de manejar hasta el vendedor. El reporte te dice si el vehículo vale el viaje; alejarse por teléfono es mucho más barato que alejarse después de un manejo de 90 minutos.",
    stageInspectionBold: "En la inspección.",
    stageInspectionBody:
      " Lleva una copia impresa del reporte a la inspección en persona. Verifica que cada evento registrado se alinee con lo que el vendedor ha divulgado y lo que puedes ver en el vehículo. Las discrepancias son palanca de negociación.",
    stageSigningBold: "Al firmar.",
    stageSigningBody:
      " Saca un reporte fresco dentro de las 24 horas de firmar el papeleo de compra. Nuevos eventos sí aparecen en datos de NMVTIS, y un reporte fresco asegura que ninguna marca o gravamen de último minuto haya sido registrado entre tu verificación anterior y la transacción.",
    stagePostBold: "Después de la compra.",
    stagePostBody:
      " Un reporte inmediatamente después del registro bloquea el estado del vehículo en el momento en que cambió la propiedad. Si surge una disputa futura, tener un reporte fechado del día de la compra es evidencia documental valiosa.",

    relatedH2: "Lectura relacionada",
    related: [
      { href: "/vin-check", title: "Verificación VIN", desc: "Decodifica cualquier VIN y obtén un reporte completo." },
      { href: "/vin-check-vs-carfax", title: "vs. Carfax", desc: "Cómo se comparan los dos proveedores en 2026." },
      { href: "/vin-check-vs-autocheck", title: "vs. AutoCheck", desc: "Puntuación enfocada en subastas vs. datos crudos." },
      { href: "/vin-check-vs-vinaudit", title: "vs. VINAudit", desc: "Dos proveedores aprobados por NMVTIS comparados." },
      { href: "/vin-check-vs-clearvin", title: "vs. ClearVIN", desc: "Comparación característica por característica." },
      { href: "/vin-check-vs-bumper", title: "vs. Bumper", desc: "Por reporte vs. precios de suscripción." },
      { href: "/trust", title: "Confianza y fuentes de datos", desc: "Cómo obtenemos NMVTIS, NICB, NHTSA, datos OEM." },
      { href: "/blog", title: "Blog de CarCheckerVIN", desc: "Investigación fresca sobre reportes de historial y fraude." },
    ],

    continueH2: "Continúa aprendiendo",
    continuePre: "¿Listo para leer tu primer reporte? Decodifica cualquier VIN en nuestra herramienta de ",
    continueMidLink: "verificación VIN",
    continueMid: ", o lee la ",
    continueGuideLink: "guía completa de compra de auto usado",
    continueSuffix: " más amplia para ver cómo el reporte encaja en el resto de la transacción.",

    bottomCtaH2: "Obtén un reporte de historial vehicular",
    bottomCtaSub:
      "Marcas de título, registros de accidentes, cadena del odómetro y retiros de seguridad \u2014 todo en un reporte obtenido de NMVTIS, NICB y NHTSA.",
  },
} as const;

interface Props {
  locale: Locale;
}

export default function GuideCarHistoryReportBody({ locale }: Props) {
  const c = COPY[locale];
  const faqs = locale === "es" ? FAQS_ES : FAQS_EN;
  const link = (en: string) => (locale === "es" ? `/es${en}` : en);
  const guidesHref = locale === "es" ? "/es/guides" : "/guides";
  const usedCarGuideHref =
    locale === "es"
      ? "/es/guides/used-car-buying-complete-guide"
      : "/guides/used-car-buying-complete-guide";

  return (
    <>
      <article className="pt-28 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: c.home, href: locale === "es" ? "/es" : "/" },
              { label: c.guides, href: guidesHref },
              { label: c.crumb },
            ]}
          />

          <h1 className="mt-6 text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
            {c.h1}
          </h1>
          <p className="mt-4 text-lg text-slate-700 leading-relaxed">{c.intro}</p>

          <div className="mt-8 p-6 bg-primary-50 rounded-2xl border border-primary-100">
            <h2 className="text-lg font-bold text-slate-900 mb-3">{c.pullCardTitle}</h2>
            <p className="text-sm text-slate-600 mb-4">{c.pullCardSub}</p>
            <VinSearchForm size="sm" />
          </div>

          <nav
            aria-label={c.tocLabel}
            className="mt-10 p-6 rounded-2xl border border-slate-200 bg-white"
          >
            <h2 className="text-sm font-bold uppercase tracking-wide text-slate-700 mb-3">
              {c.tocHeading}
            </h2>
            <ol className="space-y-2 text-slate-700 text-sm list-decimal list-inside">
              {c.toc.map((t) => (
                <li key={t.id}>
                  <a
                    href={`#${t.id}`}
                    className="text-primary-600 hover:underline font-medium"
                  >
                    {t.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {/* What is */}
          <h2
            id="what-is"
            className="mt-12 text-2xl font-bold text-slate-900 scroll-mt-24 flex items-center gap-2"
          >
            <FileSearch className="w-6 h-6 text-primary-600" /> {c.whatIsH2}
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.whatIsP1}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.whatIsP2}</p>

          {/* Data sources */}
          <h2
            id="data-sources"
            className="mt-12 text-2xl font-bold text-slate-900 scroll-mt-24 flex items-center gap-2"
          >
            <Database className="w-6 h-6 text-primary-600" /> {c.dataSourcesH2}
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.dataSourcesIntro}</p>
          <ul className="mt-4 space-y-3 text-slate-600 list-disc list-inside">
            {c.dataSources.map((d) => (
              <li key={d.boldLead}>
                <strong>{d.boldLead}</strong>
                {d.body}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-slate-600 leading-relaxed">{c.dataSourcesOutro}</p>

          {/* Sections */}
          <h2
            id="sections"
            className="mt-12 text-2xl font-bold text-slate-900 scroll-mt-24 flex items-center gap-2"
          >
            <Layers className="w-6 h-6 text-primary-600" /> {c.sectionsH2}
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.sectionsIntro}</p>
          <ul className="mt-4 space-y-2 text-slate-600 list-disc list-inside">
            {c.sectionsList.map((s) => (
              <li key={s}>
                <strong>{s}</strong>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-slate-600 leading-relaxed">{c.sectionsOutro}</p>

          {/* Title */}
          <h2
            id="title"
            className="mt-12 text-2xl font-bold text-slate-900 scroll-mt-24 flex items-center gap-2"
          >
            <ScrollText className="w-6 h-6 text-primary-600" /> {c.titleH2}
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.titleIntro}</p>
          <ul className="mt-4 space-y-2 text-slate-600 list-disc list-inside">
            <li>
              <strong>{c.titleBullet1Bold}</strong>
              {c.titleBullet1Mid}
              <Link
                href={link("/salvage-title-check")}
                className="text-primary-600 hover:underline font-medium"
              >
                {c.titleBullet1Link}
              </Link>
              {c.titleBullet1Suffix}
            </li>
            <li>
              <strong>{c.titleBullet2Bold}</strong>
              {c.titleBullet2Body}
            </li>
            <li>
              <strong>{c.titleBullet3Bold}</strong>
              {c.titleBullet3Body}
            </li>
          </ul>

          {/* Odometer */}
          <h2
            id="odometer"
            className="mt-12 text-2xl font-bold text-slate-900 scroll-mt-24 flex items-center gap-2"
          >
            <ShieldCheck className="w-6 h-6 text-primary-600" /> {c.odometerH2}
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.odometerIntro}</p>
          <ol className="mt-4 space-y-2 text-slate-600 list-decimal list-inside">
            <li>
              <strong>{c.odoItem1Bold}</strong>
              {c.odoItem1Body}
            </li>
            <li>
              <strong>{c.odoItem2Bold}</strong>
              {c.odoItem2Body}
            </li>
            <li>
              <strong>{c.odoItem3Bold}</strong>
              {c.odoItem3Body}
            </li>
          </ol>
          <p className="mt-4 text-slate-600 leading-relaxed">
            {c.odoOutroPre}
            <Link
              href={link("/odometer-check")}
              className="text-primary-600 hover:underline font-medium"
            >
              {c.odoOutroLink}
            </Link>
            {c.odoOutroSuffix}
          </p>

          {/* Accidents */}
          <h2
            id="accidents"
            className="mt-12 text-2xl font-bold text-slate-900 scroll-mt-24 flex items-center gap-2"
          >
            <AlertOctagon className="w-6 h-6 text-amber-500" /> {c.accidentsH2}
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.accidentsIntro}</p>
          <ul className="mt-4 space-y-2 text-slate-600 list-disc list-inside">
            <li>
              <strong>{c.accItem1Bold}</strong>
              {c.accItem1Body}
            </li>
            <li>
              <strong>{c.accItem2Bold}</strong>
              {c.accItem2Body}
            </li>
            <li>
              <strong>{c.accItem3Bold}</strong>
              {c.accItem3Body}
            </li>
            <li>
              <strong>{c.accItem4Bold}</strong>
              {c.accItem4Body}
            </li>
          </ul>
          <p className="mt-4 text-slate-600 leading-relaxed">
            {c.accOutroPre}
            <Link
              href={link("/accident-history-check")}
              className="text-primary-600 hover:underline font-medium"
            >
              {c.accOutroLink}
            </Link>
            {c.accOutroSuffix}
          </p>

          {/* Recalls */}
          <h2
            id="recalls"
            className="mt-12 text-2xl font-bold text-slate-900 scroll-mt-24 flex items-center gap-2"
          >
            <ShieldCheck className="w-6 h-6 text-primary-600" /> {c.recallsH2}
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.recallsP1}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            {c.recallsP2Pre}
            <Link
              href={link("/lemon-check")}
              className="text-primary-600 hover:underline font-medium"
            >
              {c.recallsP2Link}
            </Link>
            {c.recallsP2Suffix}
          </p>

          {/* Market */}
          <h2
            id="market"
            className="mt-12 text-2xl font-bold text-slate-900 scroll-mt-24 flex items-center gap-2"
          >
            <DollarSign className="w-6 h-6 text-primary-600" /> {c.marketH2}
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.marketP1}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.marketP2}</p>

          {/* Compare */}
          <h2
            id="compare"
            className="mt-12 text-2xl font-bold text-slate-900 scroll-mt-24 flex items-center gap-2"
          >
            <BookOpen className="w-6 h-6 text-primary-600" /> {c.compareH2}
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.compareIntro}</p>
          <ul className="mt-4 space-y-2 text-slate-600 list-disc list-inside">
            {c.compareItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={link(item.href)}
                  className="text-primary-600 hover:underline font-medium"
                >
                  {item.label}
                </Link>
                {item.body}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-slate-600 leading-relaxed">
            {c.compareOutroPre}
            <Link
              href={link("/trust")}
              className="text-primary-600 hover:underline font-medium"
            >
              {c.compareOutroLink}
            </Link>
            {c.compareOutroSuffix}
          </p>

          {/* FAQ */}
          <h2
            id="faq"
            className="mt-12 text-2xl font-bold text-slate-900 scroll-mt-24 flex items-center gap-2"
          >
            <HelpCircle className="w-6 h-6 text-primary-600" /> {c.faqH2}
          </h2>
          <div className="mt-4 space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-xl border border-slate-200 bg-white p-5"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 list-none">
                  <h3 className="text-base sm:text-lg font-semibold text-slate-900 m-0">
                    {faq.question}
                  </h3>
                  <span className="text-2xl text-primary-600 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-slate-600 leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>

          <h2 className="mt-12 text-2xl font-bold text-slate-900 scroll-mt-24">
            {c.lienH2}
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.lienP1}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.lienP2}</p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900 scroll-mt-24">
            {c.equipmentH2}
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.equipmentP1}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.equipmentP2}</p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900 scroll-mt-24">
            {c.intlH2}
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.intlP1}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.intlP2}</p>

          {/* Limitations */}
          <h2 className="mt-12 text-2xl font-bold text-slate-900 scroll-mt-24">
            {c.limitsH2}
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.limitsIntro}</p>
          <ul className="mt-4 space-y-2 text-slate-600 list-disc list-inside">
            {c.limitsItems.map((i) => (
              <li key={i.boldLead}>
                <strong>{i.boldLead}</strong>
                {i.body}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-slate-600 leading-relaxed">{c.limitsOutro}</p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900 scroll-mt-24">
            {c.serviceH2}
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.serviceP1}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.serviceP2}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.serviceP3}</p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900 scroll-mt-24">
            {c.pricingH2}
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.pricingIntro}</p>
          <ul className="mt-4 space-y-2 text-slate-600 list-disc list-inside">
            {c.pricingItems.map((p) => (
              <li key={p.boldLead}>
                <strong>{p.boldLead}</strong>
                {p.body}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-slate-600 leading-relaxed">
            {c.pricingOutroPre}
            <Link
              href={link("/dealers")}
              className="text-primary-600 hover:underline font-medium"
            >
              {c.pricingOutroLink}
            </Link>
            {c.pricingOutroSuffix}
          </p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900 scroll-mt-24">
            {c.stagesH2}
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.stagesIntro}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            <strong>{c.stageInitialBold}</strong>
            {c.stageInitialBody}
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            <strong>{c.stagePreVisitBold}</strong>
            {c.stagePreVisitBody}
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            <strong>{c.stageInspectionBold}</strong>
            {c.stageInspectionBody}
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            <strong>{c.stageSigningBold}</strong>
            {c.stageSigningBody}
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            <strong>{c.stagePostBold}</strong>
            {c.stagePostBody}
          </p>

          {/* Related */}
          <h2 className="mt-14 text-2xl font-bold text-slate-900">{c.relatedH2}</h2>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {c.related.map((r) => (
              <Link
                key={r.href}
                href={link(r.href)}
                className="block p-5 rounded-2xl border border-slate-200 bg-white hover:border-primary-300 hover:shadow-sm transition"
              >
                <div className="font-semibold text-slate-900">{r.title}</div>
                <p className="mt-1 text-sm text-slate-700">{r.desc}</p>
              </Link>
            ))}
          </div>

          <h2 className="mt-14 text-2xl font-bold text-slate-900">{c.continueH2}</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            {c.continuePre}
            <Link
              href={link("/vin-check")}
              className="text-primary-600 hover:underline font-medium"
            >
              {c.continueMidLink}
            </Link>
            {c.continueMid}
            <Link
              href={usedCarGuideHref}
              className="text-primary-600 hover:underline font-medium"
            >
              {c.continueGuideLink}
            </Link>
            {c.continueSuffix}
          </p>
        </div>
      </article>

      <section className="py-14 bg-slate-50">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">{c.bottomCtaH2}</h2>
          <p className="text-slate-700 mb-6">{c.bottomCtaSub}</p>
          <VinSearchForm size="sm" />
        </div>
      </section>
    </>
  );
}
