/**
 * Shared body for /lemon-check and /es/lemon-check.
 * Wave 16e — identical JSX, locale-driven copy.
 *
 * The biggest single-page refactor in Wave 16 — 14 sections, 20 FAQs,
 * 15 red flags, 5-step pipeline, 8 state-terminology rows, 5 cost
 * cards, 6 how-to steps. Per-state and per-brand link grids use the
 * existing data sources (states, LEMON_LAWS, LEMON_BRANDS) and route
 * to the locale-appropriate subroute.
 */

import Link from "next/link";
import {
  AlertOctagon,
  AlertTriangle,
  Shield,
  ShieldCheck,
  Search,
  FileText,
  Clock,
  Car,
  MapPin,
  ChevronRight,
  Zap,
  BadgeCheck,
  Lock,
  Check,
  Gavel,
  DollarSign,
  Wrench,
  Eye,
  ClipboardList,
  TrendingDown,
  ScrollText,
  Tag,
  ArrowRight,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import StateLemonLawTable from "@/app/lemon-check/StateLemonLawTable";
import { states } from "@/lib/states";
import { LEMON_LAWS } from "@/lib/lemon-laws";
import { LEMON_BRANDS } from "@/lib/lemon-brands";
import type { Locale } from "@/i18n/config";

const STATE_LINKS = states
  .filter((s) => LEMON_LAWS.some((l) => l.abbr === s.abbr))
  .map((s) => ({ slug: s.slug, name: s.name }));

const PIPELINE_ICONS = [AlertTriangle, Gavel, DollarSign, Car, Tag] as const;
const COST_ICONS = [TrendingDown, Shield, DollarSign, ShieldCheck, ScrollText] as const;
const HOWTO_ICONS = [Search, FileText, AlertTriangle, Wrench, Eye, ClipboardList] as const;
const TRUST_ICONS = [MapPin, Shield, Clock, BadgeCheck, AlertOctagon] as const;

const COPY = {
  en: {
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Lemon Check",
    heroBadge: "Lemon Law Buyback Lookup · All 50 States",
    h1Lead: "Lemon Check by VIN —",
    h1Accent: "Catch the Buyback Before You Buy",
    heroLead:
      "Find manufacturer buyback brands, lemon law buyback titles, and warranty repurchase records on any used vehicle. Free preview, no credit card, instant results — sourced from NMVTIS and every U.S. state DMV.",
    searchHeading: "Run a Free Lemon Check",
    searchSub: "Enter any 17-character VIN — cars, trucks, SUVs, leased vehicles, demos",
    trustNote: "256-bit encrypted · DPPA compliant · NMVTIS-sourced title data",
    trustStats: [
      { value: "All 50", label: "states + DC covered" },
      { value: "NMVTIS", label: "federally-sourced" },
      { value: "< 5 sec", label: "average lookup time" },
      { value: "Free", label: "preview, no signup" },
      { value: "Buyback", label: "brands surfaced" },
    ],
    statsHeading: "Lemon Law — By the Numbers",
    headlineStats: [
      { value: "51", label: "US jurisdictions covered (50 states + DC)" },
      { value: "3–4", label: "Repair attempts that typically qualify as a lemon" },
      { value: "30 days", label: "Out-of-service threshold in most state laws" },
      { value: "15–40%", label: "Typical resale discount on a lemon-titled car" },
      { value: "1975", label: "Year Magnuson-Moss Warranty Act passed" },
    ],
    introHeading: "What a Lemon Check Actually Tells You",
    introP1Pre:
      "A \"lemon\" is a vehicle that the manufacturer was forced to repurchase from its original owner under a state lemon law because chronic defects could not be repaired within a reasonable number of attempts. Once repurchased, the manufacturer almost always resells the vehicle — often at dealer-only auctions where consumers cannot see the buyback paperwork. Those vehicles eventually surface on used-car lots, sometimes with the buyback brand prominently disclosed and sometimes minimised or hidden through cross-state",
    introP1Link: "title washing",
    introP1Suffix: ".",
    introP2Pre: "A",
    introP2Bold: "VIN-based lemon check",
    introP2Suffix:
      "pulls the original brand record from NMVTIS, the federal title aggregator administered by the U.S. Department of Justice. NMVTIS receives data from every state DMV and from licensed insurance and salvage operators, so even a vehicle that has been moved across multiple states retains its lemon brand in the federal record.",
    introP3Pre: "This page does three things:",
    introP3Pt1: "(1)",
    introP3Mid1: "runs the lemon check directly from the form above,",
    introP3Pt2: "(2)",
    introP3Mid2: "shows you exactly how state lemon laws differ in the interactive 50-state table below, and",
    introP3Pt3: "(3)",
    introP3Suffix: "walks you through a 6-step pre-purchase process to catch a lemon before you sign anything.",

    statePagesHeading: "Lemon Law Check by State",
    statePagesIntro:
      "Lemon laws are written state by state, and the coverage window, repair-attempt threshold, and buyback title brand all differ. Open your state's guide for the exact rules and a free VIN-based buyback check.",
    brandPagesHeading: "Lemon Check by Brand",
    brandPagesIntro:
      "Each manufacturer's warranty length sets the window in which a recurring defect can qualify under a state lemon law. Open a brand's guide for its coverage terms and a free VIN-based buyback check.",
    brandBrowseAll: "Browse all brands",

    pipelineHeading: "How a Lemon Ends Up on a Used-Car Lot",
    pipelineIntro:
      "Most consumers assume a bought-back lemon disappears from the road. It doesn't. Here's the typical five-step path from defect to dealer lot.",
    pipelineSteps: [
      { title: "Defect surfaces", body: "Original owner experiences a recurring problem — transmission, electrical, drive-by-wire, infotainment — that resists multiple repair attempts during the warranty period." },
      { title: "Lemon claim filed", body: "Owner files under the state lemon law or invokes the Magnuson-Moss Warranty Act. Manufacturer either resolves through arbitration or repurchases the vehicle." },
      { title: "Manufacturer repurchases", body: "Manufacturer refunds the purchase price (minus a mileage-usage fee) or replaces the vehicle. Title is branded 'Manufacturer Buyback' in most states." },
      { title: "Sold at dealer auction", body: "Vehicle is moved to a manufacturer-captive auction (Manheim, ADESA, OPENLANE). Licensed dealers bid. Public consumers cannot attend." },
      { title: "Resold on a used lot", body: "Dealer who bought the buyback resells it on the retail used market — sometimes with the brand disclosure prominent, sometimes minimised or moved across state lines." },
    ],

    redFlagsHeading: "15 Red Flags a Used Car Might Be a Hidden Lemon",
    redFlagsIntroPre: "No single flag is a smoking gun — but two or three of these in the same listing should prompt a careful",
    redFlagsIntroBold: "VIN lemon check",
    redFlagsIntroSuffix: "and a pre-purchase inspection.",
    redFlags: [
      "Multiple service tickets at a single dealer for the same defect within a short window",
      "Ownership transferred back to the manufacturer's captive finance arm shortly after sale",
      "Short initial ownership period (under 18 months) with mileage well below typical use",
      "Dealer-only auction history immediately after the original retail sale",
      "Vehicle re-titled in a different state within 90 days of initial registration",
      "Same VIN appears in the manufacturer's TSB or recall database for a recurring component",
      "Title shows a brief gap in ownership history with the manufacturer as the registered party",
      "Asking price 15–35% below comparable clean-title vehicles in the same trim and mileage",
      "Listing photos avoid the driver-side door jamb (where a 'Lemon Law Buyback' decal must be visible in California)",
      "Seller offers an unusual third-party warranty in lieu of manufacturer CPO coverage",
      "Service history shows multiple component replacements for the same fault code",
      "Recent state inspection performed in a state with weaker title-branding rules",
      "VIN history shows a title issued to a leasing company, then quickly assigned back to the OEM",
      "Vehicle was registered as a 'demo' or 'service loaner' for a year then sold to a dealer",
      "Trade-in or wholesale value flagged 'cannot price' by major valuation guides",
    ],

    termsHeading: "What Buyback Titles Are Actually Called (State by State)",
    termsIntro:
      "The same legal event — manufacturer repurchase — gets eight different official names depending on the state. Searching only for \"lemon\" in a paper title document will miss most of them.",
    stateTerms: [
      { term: "Manufacturer Buyback", states: "Used in the majority of states as the default title-brand term." },
      { term: "Lemon Law Buyback", states: "California, Hawaii, New Jersey, Washington, Alaska — explicit reference to the state lemon statute." },
      { term: "Reacquired Vehicle", states: "Texas and Oregon — preferred terminology to capture both lemon-law and voluntary repurchases." },
      { term: "Warranty Return", states: "Louisiana — focuses on the warranty origin rather than the lemon statute." },
      { term: "Manufacturer Repurchase", states: "Pennsylvania — used on the title alongside the original brand date." },
      { term: "Warranty Nonconformity", states: "Virginia — formal phrase tied to the statute's eligibility language." },
      { term: "Prior Lemon Law Vehicle", states: "Minnesota — appears on the title and on the dealer disclosure form." },
      { term: "Lemon Aid (used-car program)", states: "Massachusetts — distinct used-car program separate from the new-car lemon law." },
    ],

    worstHeading: "The \"Worst Lemon Offenders\" Question",
    worstP1Pre: "One of the most common searches around lemon law buyback is some variant of",
    worstP1Em1: "\"worst lemon cars by VIN\"",
    worstP1Mid: "or",
    worstP1Em2: "\"lemon car list\"",
    worstP1Suffix:
      ". A factual, publisher-neutral answer: there is no single authoritative public list of vehicles ranked by lemon-law eligibility, and naming brands or models by reputation alone risks defaming an entire fleet for the actions of a small percentage of units.",
    worstP2Pre: "The closest thing to a credible data source is the",
    worstP2Bold: "NHTSA Office of Defects Investigation",
    worstP2Suffix:
      "complaint database, which is publicly searchable by year, make, and model. High complaint clusters — especially for drivetrain, electrical, or safety systems — correlate with higher lemon-law eligibility rates. Some publicly reported recurring problem areas across the industry over the last decade have included early-generation dual-clutch transmissions, certain infotainment software releases, and some hybrid/EV battery management systems. A VIN-specific lemon check is always more useful than a model-level reputation: even a model with thousands of complaints will have hundreds of thousands of clean-running units.",

    costHeading: "What a Lemon Title Costs You Long-Term",
    costIntro:
      "Even if the underlying defect was eventually fixed, the brand itself imposes financial costs that follow the VIN for life.",
    costItems: [
      { title: "Resale value drops 15–40%", body: "A lemon-branded title is a permanent valuation discount. Industry valuation guides (Black Book, Manheim Market Report) apply a fixed deduction for branded-title vehicles, and most retail buyers walk away when the brand is disclosed." },
      { title: "Insurance restrictions", body: "Most major carriers — Progressive, Allstate, GEICO, State Farm — will limit lemon-branded vehicles to liability-only coverage, refusing comprehensive and collision. Premiums on the limited coverage are often higher." },
      { title: "Financing limitations", body: "Prime lenders typically decline branded titles outright. Subprime financing is available but at materially higher APRs, with shorter terms and lower loan-to-value ratios." },
      { title: "Warranty implications", body: "The original manufacturer warranty may be void or transferred only on case-by-case approval. Most extended-warranty providers exclude lemon-branded vehicles by policy." },
      { title: "Registration friction", body: "A handful of states require additional inspections or surcharges to register lemon-branded vehicles, and certain states (Hawaii, California) require the buyer to sign a separate disclosure form at registration." },
    ],

    magnusonHeading: "The Federal Backstop: Magnuson-Moss Warranty Act",
    magnusonCardTitle: "When state lemon law doesn't apply, federal law may",
    magnusonBodyPre: "The",
    magnusonBodyBold: "Magnuson-Moss Warranty Act",
    magnusonBodySuffix:
      "(15 U.S.C. § 2301), passed in 1975, is the federal consumer protection law that governs written warranties on consumer products — including motor vehicles. Where state lemon laws are limited to new vehicles within a narrow window, the federal statute is broader in three important ways:",
    magnusonPoints: [
      "It creates a private cause of action for breach of any written or implied warranty — including manufacturers' powertrain warranties, used-car dealer warranties, and certified pre-owned warranties.",
      "It allows recovery of reasonable attorneys' fees, which is the engine that makes lemon-law litigation economically viable for consumers.",
      "It applies in all 50 states and can fill gaps where state lemon laws are weak or where the vehicle is outside the state's warranty window.",
    ],
    magnusonDisclaimer:
      "This summary is informational, not legal advice. Consult a qualified consumer-protection attorney about your specific situation.",

    howToHeading: "How to Lemon-Check a Car Before You Buy — 6 Steps",
    howToIntro:
      "A complete pre-purchase lemon screen takes about 15 minutes spread across the desk and the dealership.",
    howToSteps: [
      { n: "01", title: "Run the VIN", body: "Enter the 17-character VIN above. We query NMVTIS, state DMV title records, and national auction databases in under 5 seconds." },
      { n: "02", title: "Review brand history", body: "Scan the title-history section for any of the buyback brand terms (Manufacturer Buyback, Lemon Law Buyback, Reacquired Vehicle, etc.)." },
      { n: "03", title: "Check NHTSA complaints", body: "Cross-reference the year/make/model in the NHTSA complaint database — high-complaint clusters indicate models with higher lemon eligibility rates." },
      { n: "04", title: "Pull service records", body: "Request a full service history. Repeated work orders for the same defect inside the warranty window are the classic lemon signature." },
      { n: "05", title: "Inspect in person", body: "Look for a California lemon decal on the door jamb, check VIN plates match across the dashboard and door, and verify the dashboard warning indicators clear properly." },
      { n: "06", title: "Get a PPI", body: "An independent pre-purchase inspection by a mechanic familiar with the model is the final filter. Share any VIN-report flags so the mechanic can target those systems." },
    ],

    midCtaHeading: "Don't Buy Someone Else's Lemon",
    midCtaBody:
      "Free, instant lemon check sourced from all 50 state DMVs and NMVTIS. No credit card. No signup.",

    linksHeading: "Companion VIN Check Tools",
    linksIntro:
      "A lemon brand rarely travels alone. Pair this check with these targeted lookups for a complete pre-purchase picture.",
    internalLinks: [
      { label: "Full VIN History Report", desc: "All title brands plus accident, odometer, and theft history in one report." },
      { label: "Accident History Check", desc: "Collision and damage records cross-checked against insurance feeds." },
      { label: "Odometer Check", desc: "Detect mileage rollback fraud — a common companion issue with branded titles." },
      { label: "Stolen Vehicle Check", desc: "NICB cross-reference for theft records on any VIN." },
      { label: "Salvage Title Check", desc: "Distinguish lemon brands from salvage, rebuilt, and junk brands." },
      { label: "Used Car Inspection Checklist", desc: "100-point pre-purchase checklist you can take to a PPI." },
      { label: "VIN Check vs Carfax", desc: "How our free report compares to paid Carfax / AutoCheck reports." },
      { label: "Florida VIN Check", desc: "Florida-specific DHSMV lemon law data and flood-damage overlap." },
    ],

    faqHeading: "Lemon Check FAQ",
    faqIntro:
      "The most-searched questions about lemon law buyback titles, manufacturer repurchases, and VIN-based lemon detection.",
    faqs: [
      { q: "What is a lemon car?", a: "A 'lemon' is a vehicle with a substantial, recurring defect that the manufacturer cannot repair within a reasonable number of attempts during the statutory warranty period. State lemon laws require the manufacturer to repurchase or replace the vehicle. The repurchased vehicle is then often resold and may carry a 'Manufacturer Buyback' or 'Lemon Law Buyback' title brand." },
      { q: "How do I check if a car is a lemon?", a: "Run a VIN-based lemon check. Enter the 17-character VIN above and our system queries NMVTIS and national title history sources for any lemon law buyback brand, manufacturer repurchase event, or warranty return record. NMVTIS pulls from all 50 state DMVs, so cross-state title washing won't hide a brand." },
      { q: "Can a lemon car be resold legally?", a: "Yes. Once a manufacturer repurchases a lemon, they almost always resell it — typically at a dealer-only auction. In most states, the title must carry a permanent 'Manufacturer Buyback' or equivalent brand and the dealer must disclose this brand in writing to the next buyer. Enforcement varies, which is why a VIN-based check is more reliable than the paper title." },
      { q: "What states have the strongest lemon laws?", a: "California, New York, New Jersey, Massachusetts, and Connecticut are commonly cited as having the strongest consumer protections. California's Song-Beverly Act and Tanner Consumer Protection Act extend to leased vehicles and demonstrators. New York and New Jersey both have separately codified used-car lemon laws. Massachusetts has a 15-business-day out-of-service threshold and a dedicated used-car program." },
      { q: "Does a lemon title affect insurance?", a: "Yes, often. Many insurers limit lemon-branded vehicles to liability-only coverage and refuse comprehensive or collision policies, similar to how they treat salvage and rebuilt titles. Premiums can be higher and total-loss payouts are typically discounted by 15–40% to reflect diminished value." },
      { q: "Can you finance a lemon car?", a: "Financing is possible but limited. Most major banks and credit unions decline branded-title vehicles. Buy-here-pay-here lots and subprime lenders may finance lemon-branded cars but at significantly higher interest rates, and loan-to-value ratios are usually capped lower than for clean-title vehicles." },
      { q: "Is a manufacturer buyback the same as a lemon?", a: "Effectively yes in everyday use, with a subtle distinction. 'Lemon Law Buyback' is the formal title brand applied when a vehicle qualifies under a state lemon statute. 'Manufacturer Buyback' is a broader term that can include voluntary buybacks (where the manufacturer repurchases the vehicle as a goodwill resolution without admitting lemon-law eligibility). Both indicate a vehicle the manufacturer reacquired due to defects." },
      { q: "How much less is a lemon worth?", a: "Lemon-branded vehicles typically sell at a 15–40% discount to a clean-title comparable. The exact diminished-value impact depends on the defect type, brand reputation, the state's disclosure rules, and the local market. The discount runs in both directions: a lemon-titled car you buy cheap will resell at a discount, too." },
      { q: "Will a Carfax show a lemon title?", a: "Most major commercial history reports surface a lemon brand if the brand was recorded into NMVTIS. Our free report pulls the same NMVTIS-sourced data plus auction and dealer service data. A title brand cannot legally be hidden if a state agency reported it, but enforcement gaps between states (title washing) can occasionally hide a brand — running a multi-source check is the safest approach." },
      { q: "What if my car is out of warranty?", a: "Most state lemon laws apply only during the original manufacturer's express warranty period (typically 1–2 years or 12,000–24,000 miles). Once the warranty expires, you generally cannot file a new state lemon law claim. However, the federal Magnuson-Moss Warranty Act may still apply to defects that arose during the warranty period and were never properly resolved." },
      { q: "How many repair attempts qualify as a lemon?", a: "Most states require 3 or 4 unsuccessful repair attempts for the same defect, or 30 cumulative days out of service. A single failed repair attempt is sometimes enough for a serious safety defect such as brakes, steering, or airbags — check your specific state's threshold in our interactive table above." },
      { q: "What is title washing?", a: "Title washing is the illegal or quasi-legal practice of moving a vehicle from a state that requires lemon (or salvage, flood) title brands to a state with weaker branding rules, re-titling there, and then bringing the vehicle back to sell with a 'clean' title. NMVTIS was created in 2009 specifically to disrupt this practice — our VIN check pulls the original brand history regardless of where the current paper title was issued." },
      { q: "Are lemons sold at dealer auctions?", a: "Yes — manufacturer-captive auctions (e.g. Manheim's manufacturer lanes, ADESA, OPENLANE) are the standard channel for buyback vehicles. Dealers attending these auctions know the buyback status. The risk to consumers arises later, after the vehicle has moved through 1–2 dealer hands and the buyback documentation may not be passed forward as clearly." },
      { q: "Do leased cars qualify under lemon laws?", a: "Yes in most states. Lemon laws typically cover both purchased and leased vehicles during the statutory warranty period, though the remedy process differs — the manufacturer must work with both the lessee and the leasing company (the legal title holder)." },
      { q: "What is NMVTIS?", a: "NMVTIS — the National Motor Vehicle Title Information System — is a federal system administered by the U.S. Department of Justice that aggregates title brands from all 50 state DMVs, insurance carriers, junk yards, and salvage auctions. It was created in part to prevent title washing of branded vehicles (lemon, salvage, flood, junk). Our VIN check is sourced from NMVTIS-approved data providers." },
      { q: "How long does a lemon brand stay on a title?", a: "Permanently in most states. A manufacturer buyback or lemon law brand follows the VIN for the life of the vehicle and is meant to never be removed. Some states (California specifically) require a physical decal in the door jamb in addition to the title notation." },
      { q: "Can I sue if I bought a lemon unknowingly?", a: "Possibly. If the seller failed to disclose a known buyback brand, you may have a claim under your state's deceptive trade practices act, common-law fraud, or the federal Magnuson-Moss Warranty Act. Document everything — title, disclosures, repair records — and consult a qualified consumer-protection attorney. This page is informational, not legal advice." },
      { q: "Is a CPO car ever a lemon?", a: "It can be, though most manufacturers' Certified Pre-Owned programs explicitly exclude vehicles with prior lemon brands. If you find a CPO car with a buyback brand in its VIN history, that's a strong signal something was missed in the certification process or that the brand was applied after CPO certification — both worth questioning before purchase." },
      { q: "Does my state have used-car lemon protection?", a: "Most states do not. Only a handful — including New York, New Jersey, Massachusetts, Connecticut, Rhode Island, and (in limited form) Hawaii, Arizona, Washington, D.C., and a few others — extend statutory lemon protection to used-car purchases. Outside those states, you must rely on the original manufacturer's warranty (if still active), Magnuson-Moss, and any implied warranty of merchantability that may apply." },
      { q: "What is the Magnuson-Moss Warranty Act?", a: "The Magnuson-Moss Warranty Act (15 U.S.C. § 2301) is a federal consumer protection law that governs written warranties on consumer products. For vehicles, it provides a private cause of action for breach of written or implied warranty and allows recovery of attorneys' fees. It can apply when a state lemon law does not, including in private-party sales and beyond the state warranty window." },
    ],

    bottomBadge: "Free · Instant · 50 States",
    bottomHeading: "One VIN. Every Lemon Brand. Five Seconds.",
    bottomBody:
      "Manufacturer buyback brands and lemon law histories follow the VIN permanently — even when the paper title looks clean. Run the free check before you write a check.",
    bottomFullReport: "Or get the full VIN history report",
  },
  es: {
    breadcrumbHome: "Inicio",
    breadcrumbCurrent: "Verificación Ley Limón",
    heroBadge: "Búsqueda de recompra por Ley Limón · Los 50 estados",
    h1Lead: "Verificación Ley Limón por VIN —",
    h1Accent: "Detecta la recompra antes de comprar",
    heroLead:
      "Encuentra marcas de recompra del fabricante, títulos de recompra por Ley Limón y registros de recompra por garantía en cualquier vehículo usado. Vista previa gratis, sin tarjeta de crédito, resultados al instante — obtenido de NMVTIS y cada DMV estatal de EE. UU.",
    searchHeading: "Ejecuta una verificación Ley Limón gratis",
    searchSub: "Ingresa cualquier VIN de 17 caracteres — autos, camiones, SUVs, vehículos arrendados, demos",
    trustNote: "Encriptado 256 bits · Compatible con DPPA · Datos de título de NMVTIS",
    trustStats: [
      { value: "50 estados", label: "+ DC cubiertos" },
      { value: "NMVTIS", label: "fuente federal" },
      { value: "< 5 seg", label: "tiempo promedio de búsqueda" },
      { value: "Gratis", label: "vista previa, sin registro" },
      { value: "Recompra", label: "marcas reveladas" },
    ],
    statsHeading: "Ley Limón — Los números",
    headlineStats: [
      { value: "51", label: "Jurisdicciones de EE. UU. cubiertas (50 estados + DC)" },
      { value: "3–4", label: "Intentos de reparación que típicamente califican como limón" },
      { value: "30 días", label: "Umbral fuera de servicio en la mayoría de las leyes estatales" },
      { value: "15–40%", label: "Descuento típico de reventa en un auto con título de limón" },
      { value: "1975", label: "Año en que se aprobó la Magnuson-Moss Warranty Act" },
    ],
    introHeading: "Lo que realmente te dice una verificación Ley Limón",
    introP1Pre:
      "Un \"limón\" es un vehículo que el fabricante fue obligado a recomprar a su dueño original bajo una Ley Limón estatal porque defectos crónicos no pudieron repararse dentro de un número razonable de intentos. Una vez recomprado, el fabricante casi siempre revende el vehículo — a menudo en subastas solo para concesionarios donde los consumidores no pueden ver el papeleo de recompra. Esos vehículos eventualmente surgen en lotes de autos usados, a veces con la marca de recompra prominentemente divulgada y a veces minimizada u ocultada mediante el",
    introP1Link: "lavado de títulos entre estados",
    introP1Suffix: ".",
    introP2Pre: "Una",
    introP2Bold: "verificación Ley Limón basada en VIN",
    introP2Suffix:
      "obtiene el registro original de marca de NMVTIS, el agregador federal de títulos administrado por el Departamento de Justicia de EE. UU. NMVTIS recibe datos de cada DMV estatal y de aseguradoras y operadores de salvamento licenciados, así que incluso un vehículo que ha sido movido a través de múltiples estados retiene su marca de limón en el registro federal.",
    introP3Pre: "Esta página hace tres cosas:",
    introP3Pt1: "(1)",
    introP3Mid1: "ejecuta la verificación Ley Limón directamente desde el formulario de arriba,",
    introP3Pt2: "(2)",
    introP3Mid2: "te muestra exactamente cómo difieren las leyes estatales en la tabla interactiva de 50 estados abajo, y",
    introP3Pt3: "(3)",
    introP3Suffix: "te guía a través de un proceso pre-compra de 6 pasos para detectar un limón antes de firmar cualquier cosa.",

    statePagesHeading: "Verificación Ley Limón por estado",
    statePagesIntro:
      "Las leyes limón se escriben estado por estado, y la ventana de cobertura, umbral de intentos de reparación y marca de título de recompra todos difieren. Abre la guía de tu estado para las reglas exactas y una verificación gratis de recompra basada en VIN.",
    brandPagesHeading: "Verificación Ley Limón por marca",
    brandPagesIntro:
      "La duración de la garantía de cada fabricante establece la ventana en la cual un defecto recurrente puede calificar bajo una Ley Limón estatal. Abre la guía de una marca para sus términos de cobertura y una verificación gratis de recompra basada en VIN.",
    brandBrowseAll: "Ver todas las marcas",

    pipelineHeading: "Cómo un limón termina en un lote de autos usados",
    pipelineIntro:
      "La mayoría de los consumidores asume que un limón recomprado desaparece de la carretera. No lo hace. Aquí está la ruta típica de cinco pasos desde el defecto hasta el lote del concesionario.",
    pipelineSteps: [
      { title: "Surge el defecto", body: "El dueño original experimenta un problema recurrente — transmisión, eléctrico, drive-by-wire, infotainment — que resiste múltiples intentos de reparación durante el periodo de garantía." },
      { title: "Reclamo Ley Limón presentado", body: "El dueño presenta bajo la Ley Limón estatal o invoca la Magnuson-Moss Warranty Act. El fabricante resuelve mediante arbitraje o recompra el vehículo." },
      { title: "El fabricante recompra", body: "El fabricante reembolsa el precio de compra (menos una cuota de uso por kilometraje) o reemplaza el vehículo. El título se marca como 'Manufacturer Buyback' en la mayoría de los estados." },
      { title: "Vendido en subasta de concesionarios", body: "El vehículo se mueve a una subasta cautiva del fabricante (Manheim, ADESA, OPENLANE). Concesionarios licenciados ofertan. Los consumidores del público no pueden asistir." },
      { title: "Revendido en un lote usado", body: "El concesionario que compró la recompra la revende en el mercado retail usado — a veces con la divulgación de la marca prominente, a veces minimizada o movida entre estados." },
    ],

    redFlagsHeading: "15 banderas rojas de que un auto usado podría ser un limón oculto",
    redFlagsIntroPre: "Ninguna bandera individual es una prueba contundente — pero dos o tres de estas en el mismo anuncio deberían motivar una cuidadosa",
    redFlagsIntroBold: "verificación VIN Ley Limón",
    redFlagsIntroSuffix: "y una inspección pre-compra.",
    redFlags: [
      "Múltiples órdenes de servicio en un solo concesionario por el mismo defecto en un periodo corto",
      "Propiedad transferida de vuelta al brazo financiero cautivo del fabricante poco después de la venta",
      "Periodo inicial corto de propiedad (menos de 18 meses) con kilometraje muy por debajo del uso típico",
      "Historial de subasta solo para concesionarios inmediatamente después de la venta retail original",
      "Vehículo re-titulado en un estado diferente dentro de 90 días del registro inicial",
      "El mismo VIN aparece en la base de datos TSB o de retiros del fabricante por un componente recurrente",
      "El título muestra un breve hueco en el historial de propiedad con el fabricante como la parte registrada",
      "Precio pedido 15–35% por debajo de vehículos comparables con título limpio en el mismo trim y kilometraje",
      "Las fotos del anuncio evitan el marco de la puerta del conductor (donde una calcomanía 'Lemon Law Buyback' debe ser visible en California)",
      "El vendedor ofrece una garantía inusual de terceros en lugar de cobertura CPO del fabricante",
      "El historial de servicio muestra múltiples reemplazos de componentes para el mismo código de falla",
      "Inspección estatal reciente realizada en un estado con reglas más débiles de marcado de título",
      "El historial VIN muestra un título emitido a una compañía de arrendamiento, luego rápidamente asignado de vuelta al OEM",
      "El vehículo fue registrado como 'demo' o 'préstamo de servicio' por un año y luego vendido a un concesionario",
      "Valor trade-in o mayorista marcado como 'no se puede valorar' por las principales guías de valoración",
    ],

    termsHeading: "Cómo se llaman realmente los títulos de recompra (estado por estado)",
    termsIntro:
      "El mismo evento legal — recompra del fabricante — obtiene ocho nombres oficiales diferentes dependiendo del estado. Buscar solo \"lemon\" en un documento de título en papel se perderá la mayoría de ellos.",
    stateTerms: [
      { term: "Manufacturer Buyback", states: "Usado en la mayoría de los estados como el término predeterminado de marca de título." },
      { term: "Lemon Law Buyback", states: "California, Hawaii, New Jersey, Washington, Alaska — referencia explícita al estatuto estatal de Ley Limón." },
      { term: "Reacquired Vehicle", states: "Texas y Oregon — terminología preferida para capturar recompras de Ley Limón y voluntarias." },
      { term: "Warranty Return", states: "Louisiana — se enfoca en el origen de la garantía en lugar del estatuto de Ley Limón." },
      { term: "Manufacturer Repurchase", states: "Pennsylvania — usado en el título junto con la fecha original de la marca." },
      { term: "Warranty Nonconformity", states: "Virginia — frase formal vinculada al lenguaje de elegibilidad del estatuto." },
      { term: "Prior Lemon Law Vehicle", states: "Minnesota — aparece en el título y en el formulario de divulgación del concesionario." },
      { term: "Lemon Aid (programa de autos usados)", states: "Massachusetts — programa distinto de autos usados separado de la Ley Limón de autos nuevos." },
    ],

    worstHeading: "La pregunta de los \"peores ofensores limón\"",
    worstP1Pre: "Una de las búsquedas más comunes alrededor de recompra por Ley Limón es alguna variante de",
    worstP1Em1: "\"peores autos limón por VIN\"",
    worstP1Mid: "o",
    worstP1Em2: "\"lista de autos limón\"",
    worstP1Suffix:
      ". Una respuesta factual y neutra del editor: no hay una sola lista pública autoritativa de vehículos clasificados por elegibilidad de Ley Limón, y nombrar marcas o modelos solo por reputación arriesga difamar a toda una flota por las acciones de un pequeño porcentaje de unidades.",
    worstP2Pre: "Lo más cercano a una fuente de datos creíble es la base de datos de quejas de la",
    worstP2Bold: "NHTSA Office of Defects Investigation",
    worstP2Suffix:
      ", que es públicamente buscable por año, marca y modelo. Los clusters de quejas altas — especialmente para sistemas de tren motriz, eléctricos o de seguridad — se correlacionan con tasas más altas de elegibilidad de Ley Limón. Algunas áreas de problemas recurrentes reportadas públicamente a través de la industria en la última década han incluido transmisiones de doble embrague de primera generación, ciertos lanzamientos de software de infotainment y algunos sistemas de gestión de batería de híbridos/EV. Una verificación Ley Limón específica del VIN siempre es más útil que una reputación a nivel de modelo: incluso un modelo con miles de quejas tendrá cientos de miles de unidades funcionando limpiamente.",

    costHeading: "Lo que te cuesta a largo plazo un título de limón",
    costIntro:
      "Incluso si el defecto subyacente eventualmente fue arreglado, la marca en sí impone costos financieros que siguen al VIN de por vida.",
    costItems: [
      { title: "El valor de reventa cae 15–40%", body: "Un título con marca de limón es un descuento permanente de valoración. Las guías de valoración de la industria (Black Book, Manheim Market Report) aplican una deducción fija para vehículos con título marcado, y la mayoría de los compradores retail se alejan cuando la marca es divulgada." },
      { title: "Restricciones de seguro", body: "La mayoría de las aseguradoras principales — Progressive, Allstate, GEICO, State Farm — limitarán los vehículos con marca de limón a cobertura solo de responsabilidad, rechazando comprehensive y colisión. Las primas en la cobertura limitada a menudo son más altas." },
      { title: "Limitaciones de financiamiento", body: "Los prestamistas prime típicamente rechazan títulos marcados de plano. El financiamiento subprime está disponible pero a APRs materialmente más altos, con plazos más cortos y ratios de préstamo a valor más bajos." },
      { title: "Implicaciones de garantía", body: "La garantía original del fabricante puede ser nula o transferida solo en aprobación caso por caso. La mayoría de los proveedores de garantía extendida excluyen vehículos con marca de limón por política." },
      { title: "Fricción de registro", body: "Un puñado de estados requieren inspecciones adicionales o sobrecargos para registrar vehículos con marca de limón, y ciertos estados (Hawaii, California) requieren que el comprador firme un formulario separado de divulgación en el registro." },
    ],

    magnusonHeading: "El respaldo federal: Magnuson-Moss Warranty Act",
    magnusonCardTitle: "Cuando la Ley Limón estatal no aplica, la ley federal puede",
    magnusonBodyPre: "La",
    magnusonBodyBold: "Magnuson-Moss Warranty Act",
    magnusonBodySuffix:
      "(15 U.S.C. § 2301), aprobada en 1975, es la ley federal de protección al consumidor que gobierna garantías escritas en productos de consumo — incluyendo vehículos motorizados. Donde las leyes limón estatales están limitadas a vehículos nuevos dentro de una ventana estrecha, el estatuto federal es más amplio en tres formas importantes:",
    magnusonPoints: [
      "Crea una causa privada de acción por incumplimiento de cualquier garantía escrita o implícita — incluyendo garantías de tren motriz del fabricante, garantías de concesionarios de autos usados y garantías certified pre-owned.",
      "Permite la recuperación de honorarios de abogados razonables, lo cual es el motor que hace económicamente viable el litigio de Ley Limón para los consumidores.",
      "Aplica en los 50 estados y puede llenar huecos donde las leyes limón estatales son débiles o donde el vehículo está fuera de la ventana de garantía del estado.",
    ],
    magnusonDisclaimer:
      "Este resumen es informativo, no asesoría legal. Consulta a un abogado calificado de protección al consumidor sobre tu situación específica.",

    howToHeading: "Cómo verificar Ley Limón un auto antes de comprar — 6 pasos",
    howToIntro:
      "Una verificación pre-compra completa de Ley Limón toma alrededor de 15 minutos distribuidos entre el escritorio y el concesionario.",
    howToSteps: [
      { n: "01", title: "Ejecuta el VIN", body: "Ingresa el VIN de 17 caracteres arriba. Consultamos NMVTIS, registros de título del DMV estatal y bases de datos nacionales de subastas en menos de 5 segundos." },
      { n: "02", title: "Revisa el historial de marca", body: "Escanea la sección del historial de título por cualquiera de los términos de marca de recompra (Manufacturer Buyback, Lemon Law Buyback, Reacquired Vehicle, etc.)." },
      { n: "03", title: "Revisa las quejas NHTSA", body: "Cruza el año/marca/modelo en la base de datos de quejas de NHTSA — los clusters de quejas altas indican modelos con tasas más altas de elegibilidad de Ley Limón." },
      { n: "04", title: "Obtén registros de servicio", body: "Solicita un historial completo de servicio. Órdenes de trabajo repetidas para el mismo defecto dentro de la ventana de garantía son la firma clásica del limón." },
      { n: "05", title: "Inspecciona en persona", body: "Busca una calcomanía de limón de California en el marco de la puerta, verifica que las placas VIN coincidan entre el tablero y la puerta, y verifica que los indicadores de advertencia del tablero se limpien correctamente." },
      { n: "06", title: "Obtén una PPI", body: "Una inspección pre-compra independiente por un mecánico familiarizado con el modelo es el filtro final. Comparte cualquier bandera del reporte VIN para que el mecánico pueda enfocar esos sistemas." },
    ],

    midCtaHeading: "No compres el limón de alguien más",
    midCtaBody:
      "Verificación Ley Limón gratis e instantánea obtenida de los 50 DMVs estatales y NMVTIS. Sin tarjeta de crédito. Sin registro.",

    linksHeading: "Herramientas complementarias de verificación VIN",
    linksIntro:
      "Una marca de limón rara vez viaja sola. Acompaña esta verificación con estas búsquedas dirigidas para una imagen pre-compra completa.",
    internalLinks: [
      { label: "Reporte completo de historial VIN", desc: "Todas las marcas de título más historial de accidentes, odómetro y robo en un reporte." },
      { label: "Verificación de historial de accidentes", desc: "Registros de colisiones y daños cruzados contra feeds de aseguradoras." },
      { label: "Verificación de odómetro", desc: "Detecta fraude de retroceso de kilometraje — un problema compañero común con títulos marcados." },
      { label: "Verificación de vehículo robado", desc: "Cruce NICB para registros de robo en cualquier VIN." },
      { label: "Verificación de título de salvamento", desc: "Distingue marcas de limón de marcas de salvamento, reconstruido y chatarra." },
      { label: "Checklist de inspección de auto usado", desc: "Checklist pre-compra de 100 puntos que puedes llevar a una PPI." },
      { label: "VIN Check vs Carfax", desc: "Cómo se compara nuestro reporte gratis con los reportes pagados de Carfax / AutoCheck." },
      { label: "Verificación VIN Florida", desc: "Datos específicos del DHSMV de Florida sobre Ley Limón y solapamiento con daño por inundación." },
    ],

    faqHeading: "Preguntas frecuentes — Ley Limón",
    faqIntro:
      "Las preguntas más buscadas sobre títulos de recompra por Ley Limón, recompras del fabricante y detección de limón basada en VIN.",
    faqs: [
      { q: "¿Qué es un auto limón?", a: "Un 'limón' es un vehículo con un defecto sustancial y recurrente que el fabricante no puede reparar dentro de un número razonable de intentos durante el periodo de garantía estatutaria. Las leyes limón estatales requieren que el fabricante recompre o reemplace el vehículo. El vehículo recomprado se revende a menudo y puede llevar una marca de título 'Manufacturer Buyback' o 'Lemon Law Buyback'." },
      { q: "¿Cómo verifico si un auto es un limón?", a: "Ejecuta una verificación Ley Limón basada en VIN. Ingresa el VIN de 17 caracteres arriba y nuestro sistema consulta NMVTIS y fuentes nacionales de historial de título por cualquier marca de recompra por Ley Limón, evento de recompra del fabricante o registro de devolución por garantía. NMVTIS obtiene datos de los 50 DMVs estatales, así que el lavado de títulos entre estados no ocultará una marca." },
      { q: "¿Un auto limón puede revenderse legalmente?", a: "Sí. Una vez que un fabricante recompra un limón, casi siempre lo revende — típicamente en una subasta solo para concesionarios. En la mayoría de los estados, el título debe llevar una marca permanente 'Manufacturer Buyback' o equivalente y el concesionario debe divulgar esta marca por escrito al siguiente comprador. La aplicación varía, por lo cual una verificación basada en VIN es más confiable que el título en papel." },
      { q: "¿Qué estados tienen las leyes limón más fuertes?", a: "California, New York, New Jersey, Massachusetts y Connecticut son comúnmente citados como teniendo las protecciones al consumidor más fuertes. La Song-Beverly Act y Tanner Consumer Protection Act de California se extienden a vehículos arrendados y demostradores. New York y New Jersey ambos tienen leyes limón de autos usados codificadas separadamente. Massachusetts tiene un umbral fuera de servicio de 15 días hábiles y un programa dedicado de autos usados." },
      { q: "¿Un título de limón afecta el seguro?", a: "Sí, a menudo. Muchas aseguradoras limitan los vehículos con marca de limón a cobertura solo de responsabilidad y rechazan pólizas comprehensive o de colisión, similar a cómo tratan los títulos de salvamento y reconstruidos. Las primas pueden ser más altas y los pagos por pérdida total típicamente se descuentan 15–40% para reflejar el valor disminuido." },
      { q: "¿Se puede financiar un auto limón?", a: "El financiamiento es posible pero limitado. La mayoría de los bancos principales y cooperativas de crédito rechazan vehículos con título marcado. Los lotes buy-here-pay-here y prestamistas subprime pueden financiar autos con marca de limón pero a tasas de interés significativamente más altas, y los ratios de préstamo a valor usualmente son limitados más bajos que para vehículos con título limpio." },
      { q: "¿Una recompra del fabricante es lo mismo que un limón?", a: "Efectivamente sí en uso cotidiano, con una distinción sutil. 'Lemon Law Buyback' es la marca de título formal aplicada cuando un vehículo califica bajo un estatuto estatal de Ley Limón. 'Manufacturer Buyback' es un término más amplio que puede incluir recompras voluntarias (donde el fabricante recompra el vehículo como una resolución de buena voluntad sin admitir elegibilidad de Ley Limón). Ambos indican un vehículo que el fabricante readquirió debido a defectos." },
      { q: "¿Cuánto menos vale un limón?", a: "Los vehículos con marca de limón típicamente se venden a un descuento de 15–40% comparado con un equivalente de título limpio. El impacto exacto del valor disminuido depende del tipo de defecto, reputación de la marca, reglas de divulgación del estado y el mercado local. El descuento corre en ambas direcciones: un auto con título de limón que compras barato también se revenderá con descuento." },
      { q: "¿Un Carfax mostrará un título de limón?", a: "La mayoría de los reportes comerciales principales de historial surgen una marca de limón si la marca fue registrada en NMVTIS. Nuestro reporte gratis obtiene los mismos datos de NMVTIS más datos de subasta y servicio del concesionario. Una marca de título no puede ocultarse legalmente si una agencia estatal la reportó, pero los huecos de aplicación entre estados (lavado de títulos) pueden ocasionalmente ocultar una marca — ejecutar una verificación de múltiples fuentes es el enfoque más seguro." },
      { q: "¿Qué pasa si mi auto está fuera de garantía?", a: "La mayoría de las leyes limón estatales aplican solo durante el periodo de garantía expresa original del fabricante (típicamente 1–2 años o 12,000–24,000 millas). Una vez que la garantía expira, generalmente no puedes presentar un nuevo reclamo estatal de Ley Limón. Sin embargo, la federal Magnuson-Moss Warranty Act puede todavía aplicar a defectos que surgieron durante el periodo de garantía y nunca fueron resueltos apropiadamente." },
      { q: "¿Cuántos intentos de reparación califican como limón?", a: "La mayoría de los estados requieren 3 o 4 intentos de reparación fallidos para el mismo defecto, o 30 días acumulados fuera de servicio. Un solo intento de reparación fallido a veces es suficiente para un defecto serio de seguridad como frenos, dirección o airbags — verifica el umbral específico de tu estado en nuestra tabla interactiva arriba." },
      { q: "¿Qué es el lavado de títulos?", a: "El lavado de títulos es la práctica ilegal o cuasi-legal de mover un vehículo de un estado que requiere marcas de título de limón (o salvamento, inundación) a un estado con reglas más débiles de marcado, re-titularlo allí, y luego traer el vehículo de vuelta para venderlo con un título 'limpio'. NMVTIS fue creado en 2009 específicamente para disrumpir esta práctica — nuestra verificación VIN obtiene el historial original de marca independientemente de dónde se emitió el título de papel actual." },
      { q: "¿Los limones se venden en subastas de concesionarios?", a: "Sí — las subastas cautivas del fabricante (e.g. carriles del fabricante de Manheim, ADESA, OPENLANE) son el canal estándar para vehículos de recompra. Los concesionarios que asisten a estas subastas saben el estado de recompra. El riesgo para los consumidores surge después, una vez que el vehículo se ha movido a través de 1–2 manos de concesionarios y la documentación de recompra puede no pasarse hacia adelante tan claramente." },
      { q: "¿Los autos arrendados califican bajo las leyes limón?", a: "Sí en la mayoría de los estados. Las leyes limón típicamente cubren tanto vehículos comprados como arrendados durante el periodo de garantía estatutaria, aunque el proceso de remedio difiere — el fabricante debe trabajar tanto con el arrendatario como con la compañía de arrendamiento (el titular legal del título)." },
      { q: "¿Qué es NMVTIS?", a: "NMVTIS — el Sistema Nacional del Título de Vehículos — es un sistema federal administrado por el Departamento de Justicia de EE. UU. que agrega marcas de título de los 50 DMVs estatales, aseguradoras, deshuesaderos y subastas de salvamento. Fue creado en parte para prevenir el lavado de títulos de vehículos marcados (limón, salvamento, inundación, chatarra). Nuestra verificación VIN proviene de proveedores de datos aprobados por NMVTIS." },
      { q: "¿Cuánto tiempo se mantiene una marca de limón en un título?", a: "Permanentemente en la mayoría de los estados. Una marca de recompra del fabricante o Ley Limón sigue al VIN durante toda la vida del vehículo y está destinada a nunca ser removida. Algunos estados (California específicamente) requieren una calcomanía física en el marco de la puerta además de la notación del título." },
      { q: "¿Puedo demandar si compré un limón sin saberlo?", a: "Posiblemente. Si el vendedor falló en divulgar una marca de recompra conocida, puedes tener un reclamo bajo el acta de prácticas comerciales engañosas de tu estado, fraude de common-law o la federal Magnuson-Moss Warranty Act. Documenta todo — título, divulgaciones, registros de reparación — y consulta a un abogado calificado de protección al consumidor. Esta página es informativa, no es asesoría legal." },
      { q: "¿Un auto CPO puede ser un limón?", a: "Puede serlo, aunque la mayoría de los programas Certified Pre-Owned de los fabricantes excluyen explícitamente vehículos con marcas previas de limón. Si encuentras un auto CPO con una marca de recompra en su historial VIN, esa es una señal fuerte de que algo se perdió en el proceso de certificación o que la marca se aplicó después de la certificación CPO — ambos vale la pena cuestionar antes de comprar." },
      { q: "¿Mi estado tiene protección de Ley Limón para autos usados?", a: "La mayoría de los estados no la tienen. Solo un puñado — incluyendo New York, New Jersey, Massachusetts, Connecticut, Rhode Island y (en forma limitada) Hawaii, Arizona, Washington, D.C. y algunos otros — extienden protección estatutaria de Ley Limón a compras de autos usados. Fuera de esos estados, debes depender de la garantía original del fabricante (si todavía está activa), Magnuson-Moss y cualquier garantía implícita de comerciabilidad que pueda aplicar." },
      { q: "¿Qué es la Magnuson-Moss Warranty Act?", a: "La Magnuson-Moss Warranty Act (15 U.S.C. § 2301) es una ley federal de protección al consumidor que gobierna garantías escritas en productos de consumo. Para vehículos, provee una causa privada de acción por incumplimiento de garantía escrita o implícita y permite la recuperación de honorarios de abogados. Puede aplicar cuando una Ley Limón estatal no aplica, incluyendo en ventas privadas y más allá de la ventana de garantía estatal." },
    ],

    bottomBadge: "Gratis · Instantáneo · 50 estados",
    bottomHeading: "Un VIN. Cada marca de limón. Cinco segundos.",
    bottomBody:
      "Las marcas de recompra del fabricante e historiales de Ley Limón siguen al VIN permanentemente — incluso cuando el título en papel se ve limpio. Ejecuta la verificación gratis antes de escribir un cheque.",
    bottomFullReport: "O obtén el reporte completo de historial VIN",
  },
} as const;

export default function LemonCheckPageBody({
  locale = "en",
}: {
  locale?: Locale;
}) {
  const copy = COPY[locale];
  const homeHref = locale === "es" ? "/es" : "/";
  const salvageHref = locale === "es" ? "/es/titulo-salvamento" : "/salvage-title-check";
  const stateBaseHref = locale === "es" ? "/es/lemon-check" : "/lemon-check";
  const brandBaseHref = locale === "es" ? "/es/lemon-check/brand" : "/lemon-check/brand";
  const vinCheckHref = locale === "es" ? "/es/revision-vin" : "/vin-check";

  const internalLinkHrefs = locale === "es"
    ? ["/es/revision-vin", "/es/historial-accidentes", "/es/verificacion-odometro", "/es/vehiculo-robado", "/es/titulo-salvamento", "/es/checklist-inspeccion-auto-usado", "/es/carcheckervin-vs-carfax", "/es/florida-revision-vin"]
    : ["/vin-check", "/accident-history-check", "/odometer-check", "/stolen-vehicle-check", "/salvage-title-check", "/used-car-inspection-checklist", "/vin-check-vs-carfax", "/florida-vin-check"];

  return (
    <>
      <article className="pb-16 bg-surface">
        {/* Hero */}
        <div className="bg-primary text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20">
            <Breadcrumbs
              items={[{ label: copy.breadcrumbHome, href: homeHref }, { label: copy.breadcrumbCurrent }]}
              onDark
            />

            <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
              <AlertOctagon className="w-4 h-4" /> {copy.heroBadge}
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight mb-4">
              {copy.h1Lead}{" "}
              <span style={{ color: "var(--color-secondary-container)" }}>{copy.h1Accent}</span>
            </h1>

            <p className="speakable-intro text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">
              {copy.heroLead}
            </p>

            <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-xl">
              <h2 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1">{copy.searchHeading}</h2>
              <p className="text-xs sm:text-sm text-on-surface-variant mb-4">{copy.searchSub}</p>
              <VinSearchForm size="lg" locale={locale} />
              <p className="mt-3 text-[11px] text-slate-400 flex items-center gap-1.5">
                <Lock className="w-3 h-3" /> {copy.trustNote}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-8">
              {copy.trustStats.map((s, i) => {
                const Icon = TRUST_ICONS[i];
                return (
                  <div key={s.label} className="bg-white/10 border border-white/15 rounded-xl px-3 py-3 text-center">
                    <Icon className="w-5 h-5 mx-auto mb-1 text-white/70" />
                    <div className="text-lg sm:text-xl font-headline font-black text-white">{s.value}</div>
                    <div className="text-[10px] sm:text-[11px] text-white/65 leading-tight mt-0.5">{s.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* By the Numbers */}
        <section aria-labelledby="lemon-stats-heading" className="max-w-5xl mx-auto px-4 sm:px-6 -mt-8 sm:-mt-10 relative z-10">
          <div className="rounded-3xl bg-surface-container shadow-md border border-outline-variant p-5 sm:p-7">
            <h2 id="lemon-stats-heading" className="text-xs sm:text-sm font-headline font-black uppercase tracking-widest text-primary mb-4 sm:mb-5">
              {copy.statsHeading}
            </h2>
            <dl className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
              {copy.headlineStats.map((s) => (
                <div key={s.label} className="rounded-2xl bg-primary px-4 py-4 sm:py-5">
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-headline font-bold text-3xl sm:text-4xl text-white leading-none mb-2">{s.value}</dd>
                  <p className="text-xs sm:text-sm text-white/85 leading-snug">{s.label}</p>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* Intro */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">{copy.introHeading}</h2>
            <div className="prose prose-slate max-w-none text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                {copy.introP1Pre}{" "}
                <Link href={salvageHref} className="text-primary font-bold hover:underline">
                  {copy.introP1Link}
                </Link>
                {copy.introP1Suffix}
              </p>
              <p>
                {copy.introP2Pre} <strong className="text-on-surface">{copy.introP2Bold}</strong> {copy.introP2Suffix}
              </p>
              <p>
                {copy.introP3Pre} <strong className="text-on-surface">{copy.introP3Pt1}</strong> {copy.introP3Mid1}{" "}
                <strong className="text-on-surface">{copy.introP3Pt2}</strong> {copy.introP3Mid2}{" "}
                <strong className="text-on-surface">{copy.introP3Pt3}</strong> {copy.introP3Suffix}
              </p>
            </div>
          </section>

          {/* Interactive 50-state table */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <StateLemonLawTable />
          </section>

          {/* Per-state lemon law guides */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{copy.statePagesHeading}</h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl">{copy.statePagesIntro}</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
              {STATE_LINKS.map((st) => (
                <Link
                  key={st.slug}
                  href={`${stateBaseHref}/${st.slug}`}
                  className="flex items-center gap-2 rounded-xl border border-outline-variant bg-surface-container-lowest hover:border-primary/40 hover:bg-primary/5 transition-colors px-3.5 py-2.5 group"
                >
                  <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-bold text-on-surface group-hover:text-primary truncate">{st.name}</span>
                </Link>
              ))}
            </div>
          </section>

          {/* Per-brand lemon check guides */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{copy.brandPagesHeading}</h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl">{copy.brandPagesIntro}</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
              {LEMON_BRANDS.map((br) => (
                <Link
                  key={br.slug}
                  href={`${brandBaseHref}/${br.slug}`}
                  className="flex items-center gap-2 rounded-xl border border-outline-variant bg-surface-container-lowest hover:border-primary/40 hover:bg-primary/5 transition-colors px-3.5 py-2.5 group"
                >
                  <Tag className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-bold text-on-surface group-hover:text-primary truncate">{br.name}</span>
                </Link>
              ))}
            </div>
            <Link href={brandBaseHref} className="inline-flex items-center gap-2 mt-5 text-sm font-bold text-primary hover:underline">
              {copy.brandBrowseAll}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </section>

          {/* Pipeline */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{copy.pipelineHeading}</h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl">{copy.pipelineIntro}</p>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {copy.pipelineSteps.map((step, i) => {
                const Icon = PIPELINE_ICONS[i];
                return (
                  <div key={step.title} className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-4 relative">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-[11px] font-black text-on-surface-variant">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <h3 className="text-sm font-headline font-extrabold text-primary mb-1.5">{step.title}</h3>
                    <p className="text-xs text-on-surface-variant leading-relaxed">{step.body}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Red flags */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{copy.redFlagsHeading}</h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl">
              {copy.redFlagsIntroPre} <strong>{copy.redFlagsIntroBold}</strong> {copy.redFlagsIntroSuffix}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {copy.redFlags.map((flag, i) => (
                <div key={i} className="flex gap-3 items-start rounded-xl border border-outline-variant bg-surface-container-lowest p-4">
                  <div className="w-6 h-6 rounded-full bg-error-container flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[11px] font-black text-on-error-container">{i + 1}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{flag}</p>
                </div>
              ))}
            </div>
          </section>

          {/* State terms */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{copy.termsHeading}</h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl">{copy.termsIntro}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {copy.stateTerms.map((t) => (
                <div key={t.term} className="rounded-xl border border-outline-variant bg-surface-container-lowest p-4">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Tag className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm font-headline font-extrabold text-primary">{t.term}</span>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">{t.states}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Worst offenders */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">{copy.worstHeading}</h2>
            <div className="prose prose-slate max-w-none text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                {copy.worstP1Pre} <em>{copy.worstP1Em1}</em> {copy.worstP1Mid} <em>{copy.worstP1Em2}</em>{copy.worstP1Suffix}
              </p>
              <p>
                {copy.worstP2Pre} <strong className="text-on-surface">{copy.worstP2Bold}</strong> {copy.worstP2Suffix}
              </p>
            </div>
          </section>

          {/* Cost of lemon */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{copy.costHeading}</h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl">{copy.costIntro}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {copy.costItems.map((c, i) => {
                const Icon = COST_ICONS[i];
                return (
                  <div key={c.title} className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5">
                    <div className="w-10 h-10 rounded-xl bg-error-container flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-on-error-container" />
                    </div>
                    <h3 className="text-base font-headline font-extrabold text-primary mb-1.5">{c.title}</h3>
                    <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{c.body}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Magnuson-Moss */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">{copy.magnusonHeading}</h2>
            <div className="rounded-2xl bg-secondary-container/40 border border-secondary-container p-5 sm:p-7">
              <div className="flex items-start gap-3 mb-3">
                <Gavel className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <h3 className="text-base sm:text-lg font-headline font-extrabold text-primary">{copy.magnusonCardTitle}</h3>
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-3">
                {copy.magnusonBodyPre} <strong className="text-on-surface">{copy.magnusonBodyBold}</strong> {copy.magnusonBodySuffix}
              </p>
              <ul className="space-y-2 mb-3">
                {copy.magnusonPoints.map((point, i) => (
                  <li key={i} className="flex gap-2 items-start text-sm text-on-surface-variant">
                    <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" strokeWidth={3} />
                    {point}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-on-surface-variant italic">{copy.magnusonDisclaimer}</p>
            </div>
          </section>

          {/* How to */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{copy.howToHeading}</h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl">{copy.howToIntro}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {copy.howToSteps.map((s, i) => {
                const Icon = HOWTO_ICONS[i];
                return (
                  <div key={s.n} className="rounded-2xl border border-outline-variant bg-surface p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-headline font-black text-primary">{s.n}</span>
                    </div>
                    <h3 className="text-base font-headline font-extrabold text-primary mb-1.5">{s.title}</h3>
                    <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{s.body}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Mid CTA */}
          <section className="py-10">
            <div className="rounded-3xl bg-primary p-7 sm:p-10 text-center">
              <AlertOctagon className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
              <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-white mb-2">{copy.midCtaHeading}</h2>
              <p className="text-white/80 text-sm sm:text-base mb-6 max-w-xl mx-auto">{copy.midCtaBody}</p>
              <div className="max-w-xl mx-auto bg-white rounded-2xl p-4 sm:p-5">
                <VinSearchForm size="lg" locale={locale} />
              </div>
            </div>
          </section>

          {/* Internal links */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{copy.linksHeading}</h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7">{copy.linksIntro}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {copy.internalLinks.map((l, i) => (
                <Link
                  key={internalLinkHrefs[i]}
                  href={internalLinkHrefs[i]}
                  className="flex items-start gap-3 rounded-xl border border-outline-variant bg-surface hover:border-primary/40 hover:bg-primary/5 transition-colors p-4 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <ChevronRight className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-primary group-hover:underline">{l.label}</div>
                    <div className="text-xs text-on-surface-variant mt-0.5">{l.desc}</div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* VIN check banner */}
          <section className="py-10">
            <VinCheckBanner />
          </section>

          {/* FAQ */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{copy.faqHeading}</h2>
            <p className="text-sm text-on-surface-variant mb-8">{copy.faqIntro}</p>
            <div className="space-y-3">
              {copy.faqs.map((f) => (
                <details
                  key={f.q}
                  className="group rounded-2xl border border-outline-variant bg-surface p-4 sm:p-5 [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                    <span className="text-sm sm:text-base font-headline font-extrabold text-primary pr-2">{f.q}</span>
                    <span className="flex-shrink-0 mt-0.5 text-primary text-xl font-light group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="mt-3 text-xs sm:text-sm text-on-surface-variant leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Bottom CTA */}
          <section className="py-14 sm:py-20 text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-wider mb-4">
              <Zap className="w-3.5 h-3.5" /> {copy.bottomBadge}
            </div>
            <h2 className="text-2xl sm:text-4xl font-headline font-extrabold text-primary mb-3">{copy.bottomHeading}</h2>
            <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto mb-8">{copy.bottomBody}</p>
            <div className="max-w-xl mx-auto bg-surface-container-low rounded-2xl p-5 border border-outline-variant">
              <VinSearchForm size="lg" locale={locale} />
            </div>
            <Link href={vinCheckHref} className="inline-flex items-center gap-2 mt-6 text-sm font-bold text-primary hover:underline">
              {copy.bottomFullReport}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </section>

          <RelatedChecks exclude="/lemon-check" />
        </div>
      </article>
    </>
  );
}

export { COPY as LEMON_CHECK_COPY };
