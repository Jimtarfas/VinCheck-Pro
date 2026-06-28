/**
 * Shared body for /guides/used-car-buying-complete-guide and its /es/ twin.
 * Wave 18 batch 2 — full English layout in both locales via COPY={en,es}.
 */

import Link from "next/link";
import {
  Wallet, Search, ClipboardCheck, Handshake, FileText, Car,
  ShieldCheck, TrendingUp, AlertTriangle, Calculator,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import type { Locale } from "@/i18n/config";

const COPY = {
  en: {
    home: "Home",
    guidesCrumb: "Guides",
    crumb: "Used Car Buying Complete Guide",
    h1: "The Complete Used Car Buying Guide (2026 Edition)",
    intro: (
      <>
        Buying a used car in 2026 is a different game than it was even
        three years ago. Inventory has rebalanced, average transaction
        prices have dipped from their pandemic-era peaks, but
        interest rates remain elevated and fraud is more sophisticated
        than ever. This guide walks you through every step of the
        process &mdash; from setting a realistic budget to driving home
        with paperwork that protects you &mdash; with the same playbook
        our analysts use to vet vehicles every day.
      </>
    ),
    vinBoxTitle: "Start With a VIN Check",
    vinBoxBody: (
      <>
        Before you negotiate or sign anything, decode the VIN to
        verify the vehicle&rsquo;s build data, title brand, and
        accident history.
      </>
    ),
    tocLabel: "Table of contents",
    tocHeading: "What's in this guide",
    toc: [
      { href: "#used-car-market-2026", label: "The 2026 used car market at a glance" },
      { href: "#budgeting", label: "Step 1: Build a realistic budget" },
      { href: "#financing", label: "Step 2: Line up financing before you shop" },
      { href: "#where-to-look", label: "Step 3: Where to look for the right car" },
      { href: "#vin-and-history", label: "Step 4: Run the VIN and pull the history" },
      { href: "#inspection", label: "Step 5: Inspection and test drive" },
      { href: "#negotiation", label: "Step 6: Negotiation tactics that actually work" },
      { href: "#paperwork", label: "Step 7: Paperwork, title, and registration" },
      { href: "#post-purchase", label: "Step 8: Post-purchase — the first 30 days" },
      { href: "#mistakes", label: "Common mistakes (and how to avoid them)" },
      { href: "#faq", label: "Frequently asked questions" },
    ],
    h2Market: <>The 2026 used car market at a glance</>,
    marketP1: (
      <>
        According to Cox Automotive&rsquo;s long-running tracker, the
        average listed price for a used vehicle in early 2026 sits in
        the high $24,000s &mdash; roughly $4,000 below the 2022 peak
        but still about 25% above 2019. Days-to-sell have stabilized
        in the high 40s, which means dealers are once again willing
        to negotiate. The Federal Reserve&rsquo;s consumer credit
        data shows the average used-car loan APR hovering near 11%
        for non-prime borrowers, so financing strategy matters more
        than the sticker price you negotiate.
      </>
    ),
    marketP2Pre: "On the supply side, off-lease inventory is finally rebounding after a multi-year drought, which means more 3-year-old vehicles with fresh certifications are hitting franchise lots. That is good news if you are shopping for a late-model commuter, but it has also pushed less desirable trade-ins down the food chain to independent lots and wholesale auctions — the exact pipeline where ",
    marketP2Link: "salvage and rebuilt titles",
    marketP2Suffix: " most often slip through. The takeaway: better deals are available, but vetting matters more than ever.",
    marketP3: "Throughout this guide we will assume you want a reliable, fairly priced vehicle — not the cheapest car you can find. The two are very different goals, and the cheapest listing on Marketplace is almost always the most expensive car you will ever own once repairs, fraud risk, and depreciation are factored in.",
    h2Budget: <>Step 1: Build a realistic budget</>,
    budgetP1: "The single most important financial rule for car buyers is this: the purchase price is only one of five costs. A car that fits your budget at the dealership can absolutely destroy your finances over the next 36 months if you ignore the other four.",
    budgetP2: "Build your budget around the all-in monthly cost of ownership. That number includes:",
    budgetBullets: [
      { bold: "Loan payment", rest: " — principal plus interest, amortized over your chosen term." },
      { bold: "Insurance", rest: " — varies dramatically by ZIP code, age, model, and credit. Always pull a real quote before you sign." },
      { bold: "Fuel or charging", rest: " — estimate from the EPA combined MPG and your annual mileage, not from the dealer's sticker." },
      { bold: "Maintenance & repairs", rest: " — budget roughly $1,200–$1,800 per year for a vehicle out of warranty." },
      { bold: "Registration, taxes, and fees", rest: " — recurring annually in most states." },
    ],
    budgetP3: "A widely cited rule of thumb is the 20/4/10 framework: at least 20% down, no more than four years of financing, and total monthly transportation costs (loan, insurance, fuel, maintenance) below 10% of gross income. In a high-rate environment, that 10% ceiling matters more than ever — stretching to a 72- or 84-month loan is how buyers end up underwater on a vehicle they no longer want.",
    budgetP4Pre: "Once you have a target out-the-door price, write it down. That number, not your monthly payment, is what you will negotiate against. A favorite dealer trick is to lengthen the loan term to hit your monthly payment goal while quietly inflating the total. Anchoring on the all-in price shuts that down. For more on calculating true ownership cost, our deeper ",
    budgetP4Link: "used car financing guide",
    budgetP4Suffix: " walks through APR vs. total cost in detail.",
    h2Financing: <>Step 2: Line up financing before you shop</>,
    financingP1: "Walking into a dealership without a pre-approval is like negotiating salary without knowing market rate. You are asking the seller's finance office to define what you can afford — and they have every incentive to push higher. Pre-approvals from a credit union, community bank, or online lender give you a known APR ceiling and an independent appraisal of how much you can borrow.",
    financingP2: "Three lender types to compare:",
    financingLenders: [
      { bold: "Credit unions", rest: " — consistently the lowest APRs for prime and near-prime borrowers, often 0.5–2 percentage points below national bank averages." },
      { bold: "Banks", rest: " — fast online pre-approvals, integrated with checking accounts, but rates trail credit unions for most borrowers." },
      { bold: "Dealer financing", rest: " — convenient and sometimes competitive (especially on certified-pre-owned programs with manufacturer subvention), but always compare against your pre-approval." },
    ],
    financingP3: "One nuance worth understanding: dealer financing is actually a markup model. The dealer submits your credit application to a network of lenders, receives a buy rate, and adds a markup before quoting you. That markup is negotiable, but only if you know what the buy rate looks like. Walking in with a credit union pre-approval at, say, 8.49% gives you the leverage to say \u201Cmatch or beat\u201D on the spot.",
    financingP4: "A final tip: keep your credit shopping window tight. The major credit bureaus treat all auto-loan inquiries within a 14-day window as a single inquiry for scoring purposes, so you can collect three or four pre-approvals in one week without dinging your score. Stretch that window past 30 days and each pull starts counting separately.",
    h2Where: <>Step 3: Where to look for the right car</>,
    whereP1: "The right marketplace depends on what you are buying. A three-year-old certified Toyota is best sourced through a franchise dealer's CPO program. A 12-year-old high-mileage commuter is almost always cheaper through a private-party sale on Marketplace or Craigslist. The sweet spot for most buyers — a five-to-eight-year-old vehicle with full service records — can come from any of four channels.",
    whereP2: {
      a: "Franchise dealers",
      a2: " offer the strongest CPO programs, manufacturer-backed warranties, and the most recourse if something goes wrong. They are also the most expensive option, typically 5–15% above private-party value. ",
      b: "Independent dealers",
      b2: " sit in the middle — less inventory turnover, smaller warranties, but more flexibility on price. ",
      c: "Online retailers",
      c2: " (Carvana, Vroom-style platforms) offer no-haggle pricing and home delivery, but inventory quality varies and the return windows have shortened in recent years.",
    },
    whereP3: {
      bold: "Private-party sales",
      pre: " deliver the best price for buyers who do their own diligence. Expect to save 10–20% versus dealer pricing, but you absorb all the risk: no warranty, no recourse, no return. That is exactly why running a thorough ",
      link: "VIN check",
      suffix: " and an independent inspection becomes non-negotiable for private-party transactions.",
    },
    whereP4: "When evaluating any listing, look for three signals of a legitimate seller: clear photos taken in natural light, full disclosure of known issues, and willingness to share the VIN before you visit. A seller who refuses to share the VIN over the phone is hiding something — usually a branded title or accident history that they would rather you discover after you have driven 90 minutes to see the car.",
    h2Vin: <>Step 4: Run the VIN and pull the history</>,
    vinP1: {
      pre: "Every used vehicle in the United States manufactured after 1980 carries a 17-character ",
      link: "Vehicle Identification Number",
      suffix: " that encodes its build data and links to its title and event history. A free decode confirms make, model, year, engine, and trim. A paid history report unlocks title brands, accident records, odometer readings, lien data, and recall status.",
    },
    vinP2: "At minimum, before you put down a deposit, you should verify five things:",
    vinBullets: {
      title: { bold: "Title status", preL: " is clean — no salvage, flood, rebuilt, junk, or lemon brand. See our ", linkLabel: "salvage title guide", suffix: " for what each brand means." },
      odo: { bold: "Odometer readings", preL: " trend upward across every recorded event. A drop or plateau is the classic fingerprint of rollback. Our ", linkLabel: "odometer verification tool", suffix: " flags these patterns automatically." },
      acc: { bold: "Accident records", preL: " match what the seller has disclosed. Surprises are a hard stop. Our ", linkLabel: "accident history check", suffix: " shows damage severity, airbag deployment, and structural repairs." },
      recalls: { bold: "Open recalls", rest: " have been completed (or you have budget to address them)." },
      lemon: { bold: "Lemon-law buybacks", preL: " are not in the history. Run a quick ", linkLabel: "lemon check", suffix: " before signing." },
    },
    vinP3: {
      pre: "For a full breakdown of how the 17 characters of a VIN decode and what each position reveals, see our ",
      link1: "how to read a VIN",
      mid: " walkthrough or the deeper ",
      link2: "VIN decoding master guide",
      mid2: ". Buyers who want to compare report providers should review our side-by-side ",
      link3: "CarCheckerVIN vs. Carfax comparison",
      suffix: ".",
    },
    h2Inspection: <>Step 5: Inspection and test drive</>,
    inspP1: "Even the cleanest vehicle history report cannot tell you whether the timing chain is rattling, the brake rotors are warped, or the transmission slips on a 3-to-4 upshift. The history report verifies the past; the inspection and test drive verify the present. Skip either one and you are betting blind.",
    inspP2: "Start with your own walkaround, ideally in daylight. Look for panel-gap inconsistency (a sign of past collision repair), overspray on rubber trim and door jambs, mismatched paint metamerism between adjacent panels, and tire wear that is uneven side-to-side (alignment or suspension damage). Open the hood and look for fresh paint, replaced bolts, and any wiring that does not match factory routing.",
    inspP3: "Then drive the car for at least 30 minutes across mixed conditions: stop-and-go, highway speeds above 60 mph, tight low-speed turns, and a hard but legal braking event. Cycle every accessory — HVAC modes, all power windows, seat heaters, infotainment screens, every camera. Listen for the hum that disappears when you turn the wheel (failing wheel bearing) and the shudder under steady throttle (worn motor mount or driveshaft).",
    inspP4: "Finally, pay $150–$250 for an independent pre-purchase inspection from a mechanic who has no relationship to the seller. They will put it on a lift, run a scan tool against the OBD-II port, and produce a written report that often pays for itself within the first two findings. Refusing a PPI is one of the brightest red flags a private seller can wave.",
    h2Negotiation: <>Step 6: Negotiation tactics that actually work</>,
    negP1: "Effective negotiation starts before you walk in. Pull three comps for the exact same year, trim, mileage, and region. Walk in knowing the 25th-percentile asking price for that vehicle in your market, and frame your opening offer just below it. Anchoring matters: the first number on the table tends to define the range.",
    negP2: "Always negotiate the out-the-door price — the total you will pay including taxes, title, registration, and every dealer fee. Salespeople are trained to redirect to monthly payment because it disguises term length, APR markup, and dealer add-ons. Refuse to discuss monthly payment until the OTD price is locked.",
    negP3: "Watch for these common dealer add-ons in the F&I office: nitrogen tire fill, paint protection packages, VIN etching at $300+, GAP insurance at 3–5x credit union pricing, and extended warranties marked up to 200% of cost. Each one is a separate negotiation; nothing requires you to accept the bundle the finance manager slides across the desk. If the answer to \u201Ccan you remove this?\u201D is \u201Cno,\u201D the right answer is \u201Cthen I'll pass.\u201D",
    negP4: "One more lever: end-of-month and end-of-quarter timing genuinely matters at franchise dealers tied to manufacturer volume bonuses. A salesperson 90% of the way to a tier bonus on the 28th of the month has a different risk tolerance than they do on the 5th.",
    h2Paperwork: <>Step 7: Paperwork, title, and registration</>,
    paperP1: "Paperwork errors are how clean private-party deals turn into months of DMV pain. Before money changes hands, verify five documents in person:",
    paperBullets: [
      { bold: "Title", rest: " — signed by the seller of record, with the VIN matching the dash and door-jamb plates exactly. Any branding (salvage, rebuilt, flood, lemon) must be disclosed and matched to the report you pulled." },
      { bold: "Bill of sale", rest: " — documenting the agreed-upon price, date, both parties' names and addresses, and as-is language." },
      { bold: "Federal odometer disclosure", rest: " — required on every transfer of a vehicle less than 20 years old." },
      { bold: "Lien release", rest: " — if the title shows an active lender, you need a lien release before registration will transfer." },
      { bold: "Smog or safety certificate", rest: " — required at sale in many states; verify expiration date before signing." },
    ],
    paperP2: {
      pre: "If anything in the paperwork conflicts with the vehicle history report you pulled — a different prior owner, a missing brand, an odometer reading that doesn't match the latest event — stop the transaction. State-by-state paperwork varies; if you are unsure, our ",
      link: "state buying guides",
      suffix: " walk through the requirements for each DMV.",
    },
    h2Post: <>Step 8: Post-purchase &mdash; the first 30 days</>,
    postP1: "The first 30 days of ownership matter more than most buyers realize. Three concrete actions on day one: bind insurance coverage before the keys leave the dealer's hand (your existing policy may extend coverage for as few as 14 days), submit your title transfer paperwork to the DMV within the deadline your state requires (often 10 days), and schedule a baseline inspection with a mechanic you trust.",
    postP2: "Within the first month, replace any fluids the seller cannot document — engine oil, brake fluid, coolant, and transmission fluid in particular. New fluids cost less than $400 in parts and reset the maintenance clock so you know exactly where you stand. Pull a fresh OBD-II scan to capture pending codes that may not have triggered the check-engine light yet.",
    postP3: "Finally, register your VIN with the manufacturer's recall notification system (free at the OEM's site or through NHTSA's recall lookup). Recalls issued years after manufacture often miss subsequent owners because the manufacturer only mails the original purchaser. Active registration ensures you receive the notice.",
    h2Mistakes: <>Common mistakes (and how to avoid them)</>,
    mistakesIntro: "After reviewing tens of thousands of customer transactions, five mistakes show up over and over:",
    mistakes: [
      { bold: "Shopping by monthly payment.", rest: " The dealer extends the term, the math works, and you end up upside down for three years.", link: null },
      { bold: "Skipping the VIN check.", rest: " A $14.99 report prevents a $7,000 mistake. Decode it on our ", link: { label: "VIN check page", suffix: " before you commit." } },
      { bold: "Trusting verbal disclosures.", rest: " If it is not in the report and not in the bill of sale, it does not exist legally.", link: null },
      { bold: "Skipping the pre-purchase inspection.", rest: " The mechanic is the only person in the room with no financial stake in your decision.", link: null },
      { bold: "Buying on emotion.", rest: " If you have driven the car twice and you are still hesitating, that is your brain telling you something. Walk away — another one will be on the lot next week.", link: null },
    ],
    h2Faq: "Frequently Asked Questions",
    h2Deeper: "Deeper considerations for the 2026 buyer",
    deeperIntro: "The eight steps above cover the spine of any used-car transaction. The remaining sections address the specialty considerations that come up in roughly one in three transactions: out-of-state purchases, EV and hybrid-specific diligence, fleet and rental history, and what to do when something goes wrong after the sale.",
    h3OutOfState: "Buying a vehicle out of state",
    outOfStateP1: "Out-of-state purchases unlock dramatically larger inventory but introduce three friction points. First, sales tax: most states charge tax based on the buyer's registration state, not the seller's, so you typically pay your home state's rate at DMV registration regardless of where you bought. Second, transport: shipping a vehicle across the country usually runs $900–$1,800 for an enclosed carrier and $500–$1,000 open transport, and adding that to the purchase price often erases the savings versus local inventory. Third, inspection: paying $200–$300 for a remote pre-purchase inspection from a local mechanic is essential because you cannot drive the car yourself first.",
    outOfStateP2: {
      pre: "For multi-state shoppers, our state-by-state ",
      link: "VIN-check directory",
      suffix: " includes registration walkthroughs for every state. The DMV registration deadline matters: most states require transfer within 10–30 days of purchase, and missing the window can void temporary plates and create insurance gaps.",
    },
    h3Ev: "Used EVs and hybrids: the new diligence layer",
    evP1: "Used electric vehicles and hybrids introduce a battery-state diagnostic that traditional ICE buyers never had to think about. The traction battery is the single most expensive replacement part in the vehicle, often $8,000–$22,000 installed for popular EVs once warranty has expired. Always pull a state-of-health report from the vehicle's OBD-II port before purchase: most modern EVs report degraded capacity as a percentage of original. A vehicle showing 88%+ capacity at 100,000 miles is healthy; a vehicle below 80% is in declining-warranty territory and worth substantially less.",
    evP2: "Federal regulations require EV manufacturers to warranty the high-voltage battery for at least eight years or 100,000 miles. Confirm transferability and remaining coverage in writing — not all warranties transfer to a second owner without paperwork. Hybrid buyers face the same considerations on a smaller scale: the high-voltage NiMH or Li-ion pack in a Prius, Camry hybrid, or RAV4 hybrid will typically last 150,000–200,000 miles but is roughly a $2,500–$4,500 replacement cost.",
    h3Fleet: "Fleet, rental, and ride-share returns",
    fleetP1: "Off-lease inventory is well understood, but fleet, rental, and ride-share returns deserve their own consideration. Fleet vehicles (utility, telecom, municipal) typically arrive with rigorous service documentation and predictable highway-heavy mileage patterns — often a buying advantage. Rental returns from major franchises also have documented service intervals but see far harder use, so prefer units with under 40,000 miles. Ride-share returns (former Uber, Lyft, taxi vehicles) are generally risky: a 60,000-mile ride-share car has the wear profile of a 150,000-mile commuter.",
    fleetP2: {
      pre: "Spotting these in a history report: rental brands usually appear explicitly, and a vehicle whose first registered owner was a corporate fleet operator (Hertz, Enterprise, Avis, AT&T, government agency) is identifiable in the title chain. None of these histories is automatically disqualifying, but they should affect the price you pay. Run any suspicious-looking history through our broader ",
      link: "vehicle history report guide",
      suffix: " for the full read-out methodology.",
    },
    h3Wrong: "What to do when something goes wrong",
    wrongP1: "Even with diligent vetting, problems sometimes surface after the sale. Your remedies depend on the seller type. Franchise dealer purchases typically come with implied warranty of merchantability under state law, and some states (Massachusetts, Connecticut, New York, New Jersey) extend statutory used-car warranties for vehicles under specific age and mileage thresholds. Independent dealer purchases vary widely: many require an \u201Cas-is\u201D sale with no warranty, but state law may still impose minimums.",
    wrongP2: "Private-party purchases are almost always sold as-is. Your recourse there is fraud-based: if the seller misrepresented title status, accident history, mileage, or material defects, you may have a consumer-protection claim. Document everything in writing, retain the bill of sale, retain the original listing screenshots, and consult a consumer-protection attorney if losses exceed a few thousand dollars. Many take used-car cases on contingency.",
    h2Related: "Related reading",
    related: [
      { href: "/guides/free-vin-check", title: "Free VIN Check", desc: "Decode any 17-character VIN at no cost." },
      { href: "/guides/how-to-read-a-vin", title: "How to Read a VIN", desc: "Position-by-position breakdown of all 17 characters." },
      { href: "/guides/vehicle-fraud-prevention", title: "Vehicle Fraud Prevention", desc: "Spot title washing, odometer rollback, and VIN cloning." },
      { href: "/guides/used-car-financing-guide", title: "Used Car Financing Guide", desc: "APR, term length, and pre-approval strategy." },
      { href: "/guides/car-history-report-guide", title: "Vehicle History Report Guide", desc: "What's in a report, where the data comes from." },
      { href: "/vin-check-vs-carfax", title: "CarCheckerVIN vs. Carfax", desc: "Side-by-side comparison of features and pricing." },
      { href: "/blog", title: "CarCheckerVIN blog", desc: "Fresh research on used-car pricing and fraud." },
      { href: "/glossary", title: "Used car glossary", desc: "Every dealer and DMV term, explained simply." },
    ],
    h2Continue: "Continue learning",
    continueP: {
      pre: "Ready to vet a specific vehicle? Run any VIN through our free decoder, or jump straight to a focused tool: ",
      a: "stolen vehicle check",
      mid: ", ",
      b: "salvage title check",
      mid2: ", or ",
      c: "lemon law buyback check",
      suffix: ".",
    },
    bottomHeading: "Vetting a used car right now?",
    bottomSub: "Decode the VIN in seconds and pull the full vehicle history before you sign anything.",
  },
  es: {
    home: "Inicio",
    guidesCrumb: "Guías",
    crumb: "Guía completa para comprar un auto usado",
    h1: "La guía completa para comprar un auto usado (Edición 2026)",
    intro: (
      <>
        Comprar un auto usado en 2026 es un juego diferente al que era
        hace apenas tres años. El inventario se ha reequilibrado, los
        precios promedio de transacción han bajado desde sus picos de
        la era pandémica, pero las tasas de interés siguen elevadas y
        el fraude es más sofisticado que nunca. Esta guía te lleva por
        cada paso del proceso &mdash; desde establecer un presupuesto
        realista hasta llegar a casa con papeleo que te protege &mdash;
        con el mismo manual que nuestros analistas usan para evaluar
        vehículos todos los días.
      </>
    ),
    vinBoxTitle: "Comienza con una verificación VIN",
    vinBoxBody: (
      <>
        Antes de negociar o firmar algo, decodifica el VIN para
        verificar los datos de construcción del vehículo, la marca de
        título y el historial de accidentes.
      </>
    ),
    tocLabel: "Tabla de contenidos",
    tocHeading: "Qué hay en esta guía",
    toc: [
      { href: "#used-car-market-2026", label: "El mercado de autos usados 2026 de un vistazo" },
      { href: "#budgeting", label: "Paso 1: Construye un presupuesto realista" },
      { href: "#financing", label: "Paso 2: Asegura financiamiento antes de comprar" },
      { href: "#where-to-look", label: "Paso 3: Dónde buscar el auto adecuado" },
      { href: "#vin-and-history", label: "Paso 4: Ejecuta el VIN y obtén el historial" },
      { href: "#inspection", label: "Paso 5: Inspección y prueba de manejo" },
      { href: "#negotiation", label: "Paso 6: Tácticas de negociación que sí funcionan" },
      { href: "#paperwork", label: "Paso 7: Papeleo, título y registro" },
      { href: "#post-purchase", label: "Paso 8: Después de la compra — los primeros 30 días" },
      { href: "#mistakes", label: "Errores comunes (y cómo evitarlos)" },
      { href: "#faq", label: "Preguntas frecuentes" },
    ],
    h2Market: <>El mercado de autos usados 2026 de un vistazo</>,
    marketP1: (
      <>
        Según el rastreador de Cox Automotive, el precio promedio
        listado para un vehículo usado a principios de 2026 está en
        los $24,000s altos &mdash; aproximadamente $4,000 por debajo
        del pico de 2022 pero todavía cerca del 25% por encima de
        2019. Los días para vender se han estabilizado en los 40
        altos, lo que significa que los concesionarios están una vez
        más dispuestos a negociar. Los datos de crédito al consumidor
        de la Reserva Federal muestran que el APR promedio de
        préstamos para autos usados ronda el 11% para prestatarios
        no-prime, así que la estrategia de financiamiento importa más
        que el precio de etiqueta que negocies.
      </>
    ),
    marketP2Pre: "Por el lado de la oferta, el inventario fuera de leasing finalmente se está recuperando después de una sequía de varios años, lo que significa que más vehículos de 3 años con certificaciones nuevas están llegando a los concesionarios franquiciados. Eso es buena noticia si estás buscando un auto de modelo reciente para uso diario, pero también ha empujado los intercambios menos deseables hacia abajo en la cadena, a lotes independientes y subastas mayoristas — exactamente la tubería por donde los ",
    marketP2Link: "títulos de salvamento y reconstruidos",
    marketP2Suffix: " se cuelan con mayor frecuencia. La conclusión: hay mejores ofertas disponibles, pero la verificación importa más que nunca.",
    marketP3: "A lo largo de esta guía asumiremos que quieres un vehículo confiable y a precio justo — no el auto más barato que puedas encontrar. Son dos objetivos muy diferentes, y el anuncio más barato en Marketplace es casi siempre el auto más caro que poseerás una vez que se factoren reparaciones, riesgo de fraude y depreciación.",
    h2Budget: <>Paso 1: Construye un presupuesto realista</>,
    budgetP1: "La regla financiera más importante para compradores de autos es esta: el precio de compra es solo uno de cinco costos. Un auto que cabe en tu presupuesto en el concesionario puede destruir absolutamente tus finanzas en los próximos 36 meses si ignoras los otros cuatro.",
    budgetP2: "Construye tu presupuesto alrededor del costo mensual total de propiedad. Ese número incluye:",
    budgetBullets: [
      { bold: "Pago del préstamo", rest: " — capital más intereses, amortizado a lo largo del plazo que elijas." },
      { bold: "Seguro", rest: " — varía dramáticamente según código postal, edad, modelo y crédito. Siempre obtén una cotización real antes de firmar." },
      { bold: "Combustible o carga", rest: " — estima desde las MPG combinadas de la EPA y tu kilometraje anual, no desde la etiqueta del concesionario." },
      { bold: "Mantenimiento y reparaciones", rest: " — presupuesta aproximadamente $1,200–$1,800 por año para un vehículo fuera de garantía." },
      { bold: "Registro, impuestos y tarifas", rest: " — recurrentes anualmente en la mayoría de los estados." },
    ],
    budgetP3: "Una regla práctica ampliamente citada es el marco 20/4/10: al menos 20% de pago inicial, no más de cuatro años de financiamiento, y costos mensuales totales de transporte (préstamo, seguro, combustible, mantenimiento) por debajo del 10% del ingreso bruto. En un entorno de tasas altas, ese techo del 10% importa más que nunca — estirarte a un préstamo de 72 u 84 meses es como los compradores terminan bajo el agua en un vehículo que ya no quieren.",
    budgetP4Pre: "Una vez que tengas un precio objetivo total, escríbelo. Ese número, no tu pago mensual, es contra lo que vas a negociar. Un truco favorito de los concesionarios es alargar el plazo del préstamo para alcanzar tu meta de pago mensual mientras inflan silenciosamente el total. Anclarte en el precio total apaga eso. Para más sobre cómo calcular el verdadero costo de propiedad, nuestra ",
    budgetP4Link: "guía de financiamiento de autos usados",
    budgetP4Suffix: " más profunda recorre APR vs. costo total en detalle.",
    h2Financing: <>Paso 2: Asegura financiamiento antes de comprar</>,
    financingP1: "Entrar a un concesionario sin una pre-aprobación es como negociar salario sin conocer la tasa del mercado. Le estás pidiendo a la oficina de finanzas del vendedor que defina lo que puedes pagar — y tienen todo el incentivo para empujar más alto. Las pre-aprobaciones de una cooperativa de crédito, banco comunitario o prestamista en línea te dan un techo conocido de APR y una tasación independiente de cuánto puedes pedir prestado.",
    financingP2: "Tres tipos de prestamistas para comparar:",
    financingLenders: [
      { bold: "Cooperativas de crédito", rest: " — consistentemente los APR más bajos para prestatarios prime y near-prime, a menudo 0.5–2 puntos porcentuales por debajo de los promedios de bancos nacionales." },
      { bold: "Bancos", rest: " — pre-aprobaciones rápidas en línea, integradas con cuentas de cheques, pero las tasas quedan atrás de las cooperativas para la mayoría de los prestatarios." },
      { bold: "Financiamiento del concesionario", rest: " — conveniente y a veces competitivo (especialmente en programas certificados pre-poseídos con subvención del fabricante), pero siempre compara contra tu pre-aprobación." },
    ],
    financingP3: "Un matiz que vale la pena entender: el financiamiento del concesionario es en realidad un modelo de margen. El concesionario envía tu solicitud de crédito a una red de prestamistas, recibe una tasa de compra y agrega un margen antes de cotizarte. Ese margen es negociable, pero solo si sabes cómo se ve la tasa de compra. Entrar con una pre-aprobación de cooperativa de crédito a, digamos, 8.49% te da la palanca para decir \u201Cigualen o mejoren\u201D en el momento.",
    financingP4: "Un consejo final: mantén tu ventana de búsqueda de crédito apretada. Las principales agencias de crédito tratan todas las consultas de préstamos de auto dentro de una ventana de 14 días como una sola consulta para fines de puntuación, así que puedes recolectar tres o cuatro pre-aprobaciones en una semana sin dañar tu puntaje. Estira esa ventana más allá de 30 días y cada consulta empieza a contar por separado.",
    h2Where: <>Paso 3: Dónde buscar el auto adecuado</>,
    whereP1: "El mercado adecuado depende de lo que estés comprando. Un Toyota certificado de tres años es mejor obtenerlo a través del programa CPO de un concesionario franquiciado. Un auto para uso diario de 12 años con alto kilometraje es casi siempre más barato a través de una venta particular en Marketplace o Craigslist. El punto óptimo para la mayoría de los compradores — un vehículo de cinco a ocho años con registros completos de servicio — puede venir de cualquiera de cuatro canales.",
    whereP2: {
      a: "Los concesionarios franquiciados",
      a2: " ofrecen los programas CPO más fuertes, garantías respaldadas por el fabricante y el mayor recurso si algo sale mal. También son la opción más cara, típicamente 5–15% por encima del valor de venta particular. ",
      b: "Los concesionarios independientes",
      b2: " están en el medio — menos rotación de inventario, garantías más pequeñas, pero más flexibilidad en precio. ",
      c: "Los minoristas en línea",
      c2: " (plataformas tipo Carvana, Vroom) ofrecen precios sin regateo y entrega a domicilio, pero la calidad del inventario varía y las ventanas de devolución se han acortado en años recientes.",
    },
    whereP3: {
      bold: "Las ventas particulares",
      pre: " entregan el mejor precio para compradores que hacen su propia diligencia. Espera ahorrar 10–20% versus el precio de concesionario, pero absorbes todo el riesgo: sin garantía, sin recurso, sin devolución. Por eso ejecutar una ",
      link: "verificación VIN",
      suffix: " minuciosa y una inspección independiente se vuelve no negociable para transacciones particulares.",
    },
    whereP4: "Al evaluar cualquier anuncio, busca tres señales de un vendedor legítimo: fotos claras tomadas con luz natural, divulgación completa de problemas conocidos, y disposición a compartir el VIN antes de que visites. Un vendedor que se niega a compartir el VIN por teléfono está ocultando algo — usualmente un título marcado o historial de accidentes que prefiere que descubras después de haber manejado 90 minutos para ver el auto.",
    h2Vin: <>Paso 4: Ejecuta el VIN y obtén el historial</>,
    vinP1: {
      pre: "Cada vehículo usado en los Estados Unidos fabricado después de 1980 lleva un ",
      link: "Número de Identificación de Vehículo",
      suffix: " de 17 caracteres que codifica sus datos de construcción y se vincula a su historial de título y eventos. Una decodificación gratis confirma marca, modelo, año, motor y versión. Un reporte de historial pagado desbloquea marcas de título, registros de accidentes, lecturas de odómetro, datos de gravamen y estado de recalls.",
    },
    vinP2: "Como mínimo, antes de dar un depósito, debes verificar cinco cosas:",
    vinBullets: {
      title: { bold: "El estado del título", preL: " está limpio — sin marca de salvamento, inundación, reconstruido, chatarra o limón. Consulta nuestra ", linkLabel: "guía de título de salvamento", suffix: " para ver qué significa cada marca." },
      odo: { bold: "Las lecturas del odómetro", preL: " tienden hacia arriba a través de cada evento registrado. Una caída o meseta es la huella clásica de manipulación del odómetro. Nuestra ", linkLabel: "herramienta de verificación de odómetro", suffix: " marca estos patrones automáticamente." },
      acc: { bold: "Los registros de accidentes", preL: " coinciden con lo que el vendedor ha divulgado. Las sorpresas son un freno duro. Nuestra ", linkLabel: "verificación de historial de accidentes", suffix: " muestra gravedad del daño, despliegue de bolsas de aire y reparaciones estructurales." },
      recalls: { bold: "Los recalls abiertos", rest: " han sido completados (o tienes presupuesto para atenderlos)." },
      lemon: { bold: "Las recompras por ley de limón", preL: " no están en el historial. Ejecuta una rápida ", linkLabel: "verificación de limones", suffix: " antes de firmar." },
    },
    vinP3: {
      pre: "Para un desglose completo de cómo se decodifican los 17 caracteres de un VIN y qué revela cada posición, consulta nuestro tutorial de ",
      link1: "cómo leer un VIN",
      mid: " o la ",
      link2: "guía maestra de decodificación VIN",
      mid2: " más profunda. Los compradores que quieran comparar proveedores de reportes deberían revisar nuestra ",
      link3: "comparación lado a lado CarCheckerVIN vs. Carfax",
      suffix: ".",
    },
    h2Inspection: <>Paso 5: Inspección y prueba de manejo</>,
    inspP1: "Incluso el reporte de historial de vehículo más limpio no puede decirte si la cadena de distribución está sonando, los rotores de freno están deformados o la transmisión patina en un cambio de 3 a 4. El reporte de historial verifica el pasado; la inspección y prueba de manejo verifican el presente. Salta cualquiera de las dos y estás apostando a ciegas.",
    inspP2: "Comienza con tu propia inspección visual, idealmente a la luz del día. Busca inconsistencia en separaciones de paneles (señal de reparación de colisión pasada), sobrespray en molduras de hule y marcos de puertas, metamerismo de pintura sin coincidir entre paneles adyacentes, y desgaste de llantas que es disparejo de lado a lado (daño de alineación o suspensión). Abre el cofre y busca pintura fresca, tornillos reemplazados y cualquier cableado que no coincida con el ruteo de fábrica.",
    inspP3: "Luego maneja el auto por al menos 30 minutos a través de condiciones mixtas: pare-y-siga, velocidades de autopista por encima de 60 mph, vueltas cerradas a baja velocidad y un evento de frenado fuerte pero legal. Cicla cada accesorio — modos de HVAC, todas las ventanas eléctricas, calentadores de asiento, pantallas de infoentretenimiento, cada cámara. Escucha el zumbido que desaparece cuando giras el volante (rodamiento de rueda fallando) y el temblor bajo aceleración constante (soporte de motor o eje cardán desgastado).",
    inspP4: "Finalmente, paga $150–$250 por una inspección antes de la compra independiente de un mecánico que no tenga relación con el vendedor. La pondrán en un elevador, correrán una herramienta de escaneo contra el puerto OBD-II y producirán un reporte escrito que a menudo se paga solo dentro de los primeros dos hallazgos. Negarse a una PPI es una de las banderas rojas más brillantes que un vendedor particular puede agitar.",
    h2Negotiation: <>Paso 6: Tácticas de negociación que sí funcionan</>,
    negP1: "La negociación efectiva comienza antes de que entres. Saca tres comparables para exactamente el mismo año, versión, kilometraje y región. Entra sabiendo el precio de pedido del percentil 25 para ese vehículo en tu mercado, y enmarca tu oferta inicial justo por debajo. El anclaje importa: el primer número en la mesa tiende a definir el rango.",
    negP2: "Siempre negocia el precio total — el total que pagarás incluyendo impuestos, título, registro y cada tarifa del concesionario. Los vendedores están entrenados para redirigir hacia el pago mensual porque disfraza la duración del plazo, el margen de APR y los extras del concesionario. Rehúsa discutir el pago mensual hasta que el precio total esté fijado.",
    negP3: "Vigila estos extras comunes del concesionario en la oficina de F&I: llenado de llantas con nitrógeno, paquetes de protección de pintura, grabado de VIN a $300+, seguro GAP a 3–5x el precio de cooperativa de crédito, y garantías extendidas con margen de hasta 200% del costo. Cada uno es una negociación separada; nada requiere que aceptes el paquete que el gerente de finanzas desliza a través del escritorio. Si la respuesta a \u201C¿puedes quitar esto?\u201D es \u201Cno,\u201D la respuesta correcta es \u201Centonces paso.\u201D",
    negP4: "Una palanca más: el tiempo de fin-de-mes y fin-de-trimestre genuinamente importa en concesionarios franquiciados ligados a bonos de volumen del fabricante. Un vendedor 90% del camino a un bono de nivel el día 28 del mes tiene una tolerancia al riesgo diferente que el día 5.",
    h2Paperwork: <>Paso 7: Papeleo, título y registro</>,
    paperP1: "Los errores de papeleo son cómo las ofertas particulares limpias se convierten en meses de dolor de DMV. Antes de que cambie el dinero, verifica cinco documentos en persona:",
    paperBullets: [
      { bold: "Título", rest: " — firmado por el vendedor registrado, con el VIN que coincide con las placas del tablero y marco de puerta exactamente. Cualquier marca (salvamento, reconstruido, inundación, limón) debe ser divulgada y coincidir con el reporte que sacaste." },
      { bold: "Factura de venta", rest: " — documentando el precio acordado, fecha, nombres y direcciones de ambas partes, y lenguaje as-is." },
      { bold: "Divulgación federal de odómetro", rest: " — requerida en cada transferencia de un vehículo menor de 20 años." },
      { bold: "Liberación de gravamen", rest: " — si el título muestra un prestamista activo, necesitas una liberación de gravamen antes de que se transfiera el registro." },
      { bold: "Certificado de smog o seguridad", rest: " — requerido en la venta en muchos estados; verifica la fecha de vencimiento antes de firmar." },
    ],
    paperP2: {
      pre: "Si algo en el papeleo entra en conflicto con el reporte de historial de vehículo que sacaste — un dueño previo diferente, una marca faltante, una lectura de odómetro que no coincide con el último evento — detén la transacción. El papeleo varía de estado a estado; si no estás seguro, nuestras ",
      link: "guías de compra estatales",
      suffix: " recorren los requisitos para cada DMV.",
    },
    h2Post: <>Paso 8: Después de la compra &mdash; los primeros 30 días</>,
    postP1: "Los primeros 30 días de propiedad importan más de lo que la mayoría de los compradores se da cuenta. Tres acciones concretas en el día uno: vincula la cobertura de seguro antes de que las llaves dejen la mano del concesionario (tu póliza existente puede extender la cobertura por tan solo 14 días), envía tu papeleo de transferencia de título al DMV dentro del plazo que tu estado requiere (a menudo 10 días), y agenda una inspección de línea base con un mecánico de confianza.",
    postP2: "Dentro del primer mes, reemplaza cualquier fluido que el vendedor no pueda documentar — aceite de motor, líquido de frenos, refrigerante y líquido de transmisión en particular. Los fluidos nuevos cuestan menos de $400 en partes y reinician el reloj de mantenimiento para que sepas exactamente dónde estás parado. Saca un escaneo OBD-II fresco para capturar códigos pendientes que pueden no haber disparado todavía la luz de check-engine.",
    postP3: "Finalmente, registra tu VIN con el sistema de notificación de recalls del fabricante (gratis en el sitio del OEM o a través de la búsqueda de recalls de NHTSA). Los recalls emitidos años después de la fabricación a menudo no alcanzan a los dueños subsecuentes porque el fabricante solo envía correo al comprador original. El registro activo asegura que recibas la notificación.",
    h2Mistakes: <>Errores comunes (y cómo evitarlos)</>,
    mistakesIntro: "Después de revisar decenas de miles de transacciones de clientes, cinco errores aparecen una y otra vez:",
    mistakes: [
      { bold: "Comprar por pago mensual.", rest: " El concesionario extiende el plazo, la matemática funciona y terminas al revés por tres años.", link: null },
      { bold: "Saltar la verificación VIN.", rest: " Un reporte de $14.99 previene un error de $7,000. Decodifícalo en nuestra ", link: { label: "página de verificación VIN", suffix: " antes de comprometerte." } },
      { bold: "Confiar en divulgaciones verbales.", rest: " Si no está en el reporte y no está en la factura de venta, no existe legalmente.", link: null },
      { bold: "Saltar la inspección antes de la compra.", rest: " El mecánico es la única persona en la sala sin participación financiera en tu decisión.", link: null },
      { bold: "Comprar por emoción.", rest: " Si has manejado el auto dos veces y todavía estás dudando, eso es tu cerebro diciéndote algo. Aléjate — otro estará en el lote la próxima semana.", link: null },
    ],
    h2Faq: "Preguntas frecuentes",
    h2Deeper: "Consideraciones más profundas para el comprador 2026",
    deeperIntro: "Los ocho pasos anteriores cubren la columna vertebral de cualquier transacción de auto usado. Las secciones restantes abordan las consideraciones especializadas que aparecen en aproximadamente una de cada tres transacciones: compras fuera del estado, diligencia específica de EV e híbridos, historial de flotas y rentas, y qué hacer cuando algo sale mal después de la venta.",
    h3OutOfState: "Comprar un vehículo fuera del estado",
    outOfStateP1: "Las compras fuera del estado desbloquean inventario dramáticamente mayor pero introducen tres puntos de fricción. Primero, el impuesto de venta: la mayoría de los estados cobran impuesto basado en el estado de registro del comprador, no del vendedor, así que típicamente pagas la tasa de tu estado de origen en el registro del DMV sin importar dónde compraste. Segundo, transporte: enviar un vehículo a través del país usualmente cuesta $900–$1,800 para un transportista cerrado y $500–$1,000 transporte abierto, y agregar eso al precio de compra a menudo borra los ahorros versus inventario local. Tercero, inspección: pagar $200–$300 por una inspección antes de la compra remota de un mecánico local es esencial porque no puedes manejar el auto tú mismo primero.",
    outOfStateP2: {
      pre: "Para compradores multi-estatales, nuestro ",
      link: "directorio de verificación VIN",
      suffix: " estado por estado incluye tutoriales de registro para cada estado. La fecha límite de registro del DMV importa: la mayoría de los estados requieren transferencia dentro de 10–30 días de la compra, y perder la ventana puede anular placas temporales y crear brechas de seguro.",
    },
    h3Ev: "EVs usados e híbridos: la nueva capa de diligencia",
    evP1: "Los vehículos eléctricos e híbridos usados introducen un diagnóstico de estado de batería en el que los compradores de motor de combustión tradicional nunca tuvieron que pensar. La batería de tracción es la pieza de reemplazo individual más cara del vehículo, a menudo $8,000–$22,000 instalada para EVs populares una vez que la garantía ha expirado. Siempre saca un reporte de estado de salud desde el puerto OBD-II del vehículo antes de la compra: la mayoría de los EVs modernos reportan capacidad degradada como porcentaje del original. Un vehículo mostrando 88%+ de capacidad a 100,000 millas está saludable; un vehículo por debajo del 80% está en territorio de garantía en declive y vale sustancialmente menos.",
    evP2: "Las regulaciones federales requieren que los fabricantes de EV den garantía a la batería de alto voltaje por al menos ocho años o 100,000 millas. Confirma la transferibilidad y la cobertura restante por escrito — no todas las garantías se transfieren a un segundo dueño sin papeleo. Los compradores de híbridos enfrentan las mismas consideraciones a menor escala: el paquete de alto voltaje NiMH o Li-ion en un Prius, Camry híbrido o RAV4 híbrido típicamente durará 150,000–200,000 millas pero es aproximadamente un costo de reemplazo de $2,500–$4,500.",
    h3Fleet: "Devoluciones de flota, renta y ride-share",
    fleetP1: "El inventario fuera de leasing es bien entendido, pero las devoluciones de flota, renta y ride-share merecen su propia consideración. Los vehículos de flota (servicios públicos, telecomunicaciones, municipales) típicamente llegan con documentación rigurosa de servicio y patrones predecibles de kilometraje pesado en autopista — a menudo una ventaja de compra. Las devoluciones de renta de franquicias mayores también tienen intervalos de servicio documentados pero ven uso mucho más duro, así que prefiere unidades con menos de 40,000 millas. Las devoluciones de ride-share (ex Uber, Lyft, taxis) son generalmente riesgosas: un auto de ride-share de 60,000 millas tiene el perfil de desgaste de un auto de uso diario de 150,000 millas.",
    fleetP2: {
      pre: "Detectar estos en un reporte de historial: las marcas de renta usualmente aparecen explícitamente, y un vehículo cuyo primer dueño registrado fue un operador corporativo de flota (Hertz, Enterprise, Avis, AT&T, agencia gubernamental) es identificable en la cadena de título. Ninguno de estos historiales es automáticamente descalificante, pero deberían afectar el precio que pagas. Ejecuta cualquier historial sospechoso a través de nuestra ",
      link: "guía de reporte de historial de vehículo",
      suffix: " más amplia para la metodología completa de lectura.",
    },
    h3Wrong: "Qué hacer cuando algo sale mal",
    wrongP1: "Incluso con verificación diligente, los problemas a veces aparecen después de la venta. Tus remedios dependen del tipo de vendedor. Las compras a concesionarios franquiciados típicamente vienen con garantía implícita de comerciabilidad bajo la ley estatal, y algunos estados (Massachusetts, Connecticut, Nueva York, Nueva Jersey) extienden garantías estatutarias de autos usados para vehículos bajo umbrales específicos de edad y kilometraje. Las compras a concesionarios independientes varían ampliamente: muchos requieren una venta \u201Cas-is\u201D sin garantía, pero la ley estatal puede aún imponer mínimos.",
    wrongP2: "Las compras particulares son casi siempre vendidas as-is. Tu recurso ahí está basado en fraude: si el vendedor falsificó el estado del título, historial de accidentes, kilometraje o defectos materiales, puedes tener un reclamo de protección al consumidor. Documenta todo por escrito, guarda la factura de venta, guarda las capturas de pantalla del anuncio original, y consulta un abogado de protección al consumidor si las pérdidas exceden unos pocos miles de dólares. Muchos toman casos de autos usados por contingencia.",
    h2Related: "Lectura relacionada",
    related: [
      { href: "/guides/free-vin-check", title: "Verificación VIN gratis", desc: "Decodifica cualquier VIN de 17 caracteres sin costo." },
      { href: "/guides/how-to-read-a-vin", title: "Cómo leer un VIN", desc: "Desglose posición por posición de los 17 caracteres." },
      { href: "/guides/vehicle-fraud-prevention", title: "Prevención de fraude vehicular", desc: "Detecta lavado de título, manipulación del odómetro y clonación de VIN." },
      { href: "/guides/used-car-financing-guide", title: "Guía de financiamiento de autos usados", desc: "APR, duración del plazo y estrategia de pre-aprobación." },
      { href: "/guides/car-history-report-guide", title: "Guía de reporte de historial de vehículo", desc: "Qué hay en un reporte, de dónde vienen los datos." },
      { href: "/vin-check-vs-carfax", title: "CarCheckerVIN vs. Carfax", desc: "Comparación lado a lado de características y precios." },
      { href: "/blog", title: "Blog de CarCheckerVIN", desc: "Investigación fresca sobre precios y fraude de autos usados." },
      { href: "/glossary", title: "Glosario de autos usados", desc: "Cada término de concesionario y DMV, explicado simplemente." },
    ],
    h2Continue: "Continúa aprendiendo",
    continueP: {
      pre: "¿Listo para evaluar un vehículo específico? Ejecuta cualquier VIN a través de nuestro decodificador gratuito, o salta directamente a una herramienta enfocada: ",
      a: "verificación de vehículo robado",
      mid: ", ",
      b: "verificación de título de salvamento",
      mid2: ", o ",
      c: "verificación de recompra por ley de limón",
      suffix: ".",
    },
    bottomHeading: "¿Evaluando un auto usado ahora mismo?",
    bottomSub: "Decodifica el VIN en segundos y obtén el historial completo del vehículo antes de firmar algo.",
  },
};

const FAQS_EN = [
  { question: "What should I check before buying a used car?", answer: "Before buying a used car, verify the 17-character VIN matches the dashboard, door-jamb plate, and title exactly, then run a vehicle history report to confirm the title is clean and lien-free with no salvage, flood, or odometer-rollback issues. Check for open recalls on NHTSA's free lookup, get an independent pre-purchase inspection, and take a 30-minute test drive across mixed conditions. Skipping the history report or inspection is the most common buyer mistake." },
  { question: "What documents do I need when buying a used car?", answer: "You need the title signed by the seller of record (with the VIN matching the dash and door-jamb plates), a bill of sale listing the price, date, both parties' names and any as-is language, and a federal odometer disclosure (required on transfers of vehicles under 20 years old). If the title shows a lender, get a lien release before registering. Many states also require a valid smog or safety certificate at the time of sale." },
  { question: "Should I get a pre-purchase inspection?", answer: "Yes. A pre-purchase inspection from an independent mechanic with no relationship to the seller typically costs $150 to $250 and is one of the smartest pre-purchase steps. The mechanic puts the car on a lift, runs a scan tool against the OBD-II port, and produces a written report that often pays for itself within the first two findings. A history report verifies the past; the inspection verifies the present. A seller who refuses a pre-purchase inspection is waving a red flag." },
  { question: "How do I negotiate a used car price?", answer: "Pull three comparable listings for the same year, trim, mileage, and region, then make your opening offer just below the lowest asking price. Always negotiate the out-the-door price, the total including taxes, title, registration, and every fee, not the monthly payment, which can hide a longer term and higher rate. Decline add-ons like paint protection, VIN etching, and marked-up extended warranties. Walking in with a credit-union pre-approval gives you the leverage to ask a dealer to match or beat the rate." },
  { question: "How many miles is too many on a used car?", answer: "There is no hard cutoff: condition and maintenance history matter more than the odometer alone. US vehicles are typically driven around 12,000 to 15,000 miles per year, so you can gauge whether a car's mileage is high or low for its age against that benchmark. A well-maintained car with full service records at 120,000 miles is usually a safer bet than a neglected one at 60,000. Confirm odometer readings trend upward across every recorded history event to rule out rollback." },
  { question: "Should I buy from a dealer or a private seller?", answer: "Dealers cost more but offer recourse: certified pre-owned warranties, manufacturer-backed coverage, and in some states an implied warranty of merchantability. Private-party sales are usually 10 to 20% cheaper but are almost always sold as-is with no warranty and no returns, so you absorb all the risk. Private deals make sense if you are confident running a VIN check and paying for an independent inspection; if you want protection and convenience, a dealer is worth the premium." },
  { question: "What red flags mean I should walk away from a used car?", answer: "Walk away if the title is branded salvage, flood, rebuilt, junk, or lemon and was not disclosed, if odometer readings drop or plateau across history events, or if accident records contradict what the seller told you. Other hard stops include a seller who refuses to share the VIN before you visit, refuses an independent pre-purchase inspection, or pushes you to focus on the monthly payment instead of the total price. If the paperwork conflicts with the history report, stop the transaction." },
];

const FAQS_ES = [
  { question: "¿Qué debo verificar antes de comprar un auto usado?", answer: "Antes de comprar un auto usado, verifica que el VIN de 17 caracteres coincida exactamente con el tablero, la placa del marco de puerta y el título, luego ejecuta un reporte de historial de vehículo para confirmar que el título está limpio y libre de gravámenes, sin problemas de salvamento, inundación o manipulación del odómetro. Verifica recalls abiertos en la búsqueda gratuita de NHTSA, obtén una inspección antes de la compra independiente, y haz una prueba de manejo de 30 minutos a través de condiciones mixtas. Saltar el reporte de historial o la inspección es el error más común del comprador." },
  { question: "¿Qué documentos necesito al comprar un auto usado?", answer: "Necesitas el título firmado por el vendedor registrado (con el VIN coincidiendo con las placas del tablero y marco de puerta), una factura de venta listando el precio, fecha, nombres de ambas partes y cualquier lenguaje as-is, y una divulgación federal de odómetro (requerida en transferencias de vehículos menores de 20 años). Si el título muestra un prestamista, obtén una liberación de gravamen antes de registrar. Muchos estados también requieren un certificado válido de smog o seguridad al momento de la venta." },
  { question: "¿Debería obtener una inspección antes de la compra?", answer: "Sí. Una inspección antes de la compra de un mecánico independiente sin relación con el vendedor típicamente cuesta $150 a $250 y es uno de los pasos pre-compra más inteligentes. El mecánico pone el auto en un elevador, corre una herramienta de escaneo contra el puerto OBD-II y produce un reporte escrito que a menudo se paga solo dentro de los primeros dos hallazgos. Un reporte de historial verifica el pasado; la inspección verifica el presente. Un vendedor que rehúsa una inspección antes de la compra está agitando una bandera roja." },
  { question: "¿Cómo negocio el precio de un auto usado?", answer: "Saca tres anuncios comparables para el mismo año, versión, kilometraje y región, luego haz tu oferta inicial justo por debajo del precio más bajo de pedido. Siempre negocia el precio total, el total incluyendo impuestos, título, registro y cada tarifa, no el pago mensual, que puede ocultar un plazo más largo y tasa más alta. Rechaza extras como protección de pintura, grabado de VIN y garantías extendidas con margen. Entrar con una pre-aprobación de cooperativa de crédito te da la palanca para pedirle al concesionario que iguale o mejore la tasa." },
  { question: "¿Cuántas millas son demasiadas en un auto usado?", answer: "No hay un corte estricto: la condición y el historial de mantenimiento importan más que el odómetro solo. Los vehículos en EE. UU. típicamente se manejan alrededor de 12,000 a 15,000 millas por año, así que puedes medir si el kilometraje de un auto es alto o bajo para su edad contra ese punto de referencia. Un auto bien mantenido con registros completos de servicio a 120,000 millas es usualmente una apuesta más segura que uno descuidado a 60,000. Confirma que las lecturas del odómetro tiendan hacia arriba a través de cada evento de historial registrado para descartar manipulación." },
  { question: "¿Debería comprar a un concesionario o a un vendedor particular?", answer: "Los concesionarios cuestan más pero ofrecen recurso: garantías certificadas pre-poseídas, cobertura respaldada por el fabricante, y en algunos estados una garantía implícita de comerciabilidad. Las ventas particulares son usualmente 10 a 20% más baratas pero casi siempre se venden as-is sin garantía y sin devoluciones, así que absorbes todo el riesgo. Las ofertas particulares tienen sentido si estás seguro de ejecutar una verificación VIN y pagar por una inspección independiente; si quieres protección y conveniencia, un concesionario vale la prima." },
  { question: "¿Qué banderas rojas significan que debería alejarme de un auto usado?", answer: "Aléjate si el título está marcado como salvamento, inundación, reconstruido, chatarra o limón y no fue divulgado, si las lecturas del odómetro caen o se estancan a través de eventos del historial, o si los registros de accidentes contradicen lo que el vendedor te dijo. Otros frenos duros incluyen un vendedor que rehúsa compartir el VIN antes de que visites, rehúsa una inspección antes de la compra independiente, o te empuja a enfocarte en el pago mensual en lugar del precio total. Si el papeleo entra en conflicto con el reporte de historial, detén la transacción." },
];

interface Props { locale: Locale; }

export default function GuideUsedCarBuyingBody({ locale }: Props) {
  const c = COPY[locale];
  const faqs = locale === "es" ? FAQS_ES : FAQS_EN;
  const link = (en: string) => (locale === "es" ? `/es${en}` : en);

  return (
    <>
      <article className="pt-28 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: c.home, href: locale === "es" ? "/es" : "/" },
              { label: c.guidesCrumb, href: link("/guides") },
              { label: c.crumb },
            ]}
          />

          <h1 className="mt-6 text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
            {c.h1}
          </h1>
          <p className="mt-4 text-lg text-slate-700 leading-relaxed">
            {c.intro}
          </p>

          <div className="mt-8 p-6 bg-primary-50 rounded-2xl border border-primary-100">
            <h2 className="text-lg font-bold text-slate-900 mb-3">
              {c.vinBoxTitle}
            </h2>
            <p className="text-sm text-slate-600 mb-4">
              {c.vinBoxBody}
            </p>
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
                <li key={t.href}>
                  <a href={t.href} className="text-primary-600 hover:underline font-medium">
                    {t.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <h2 id="used-car-market-2026" className="mt-12 text-2xl font-bold text-slate-900 scroll-mt-24 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-primary-600" /> {c.h2Market}
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.marketP1}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            {c.marketP2Pre}
            <Link href={link("/salvage-title-check")} className="text-primary-600 hover:underline font-medium">{c.marketP2Link}</Link>
            {c.marketP2Suffix}
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.marketP3}</p>

          <h2 id="budgeting" className="mt-12 text-2xl font-bold text-slate-900 scroll-mt-24 flex items-center gap-2">
            <Wallet className="w-6 h-6 text-primary-600" /> {c.h2Budget}
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.budgetP1}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.budgetP2}</p>
          <ul className="mt-4 space-y-2 text-slate-600 list-disc list-inside">
            {c.budgetBullets.map((b) => (
              <li key={b.bold}>
                <strong>{b.bold}</strong>{b.rest}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-slate-600 leading-relaxed">{c.budgetP3}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            {c.budgetP4Pre}
            <Link href={link("/guides/used-car-financing-guide")} className="text-primary-600 hover:underline font-medium">{c.budgetP4Link}</Link>
            {c.budgetP4Suffix}
          </p>

          <h2 id="financing" className="mt-12 text-2xl font-bold text-slate-900 scroll-mt-24 flex items-center gap-2">
            <Calculator className="w-6 h-6 text-primary-600" /> {c.h2Financing}
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.financingP1}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.financingP2}</p>
          <ol className="mt-3 space-y-2 text-slate-600 list-decimal list-inside">
            {c.financingLenders.map((l) => (
              <li key={l.bold}>
                <strong>{l.bold}</strong>{l.rest}
              </li>
            ))}
          </ol>
          <p className="mt-4 text-slate-600 leading-relaxed">{c.financingP3}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.financingP4}</p>

          <h2 id="where-to-look" className="mt-12 text-2xl font-bold text-slate-900 scroll-mt-24 flex items-center gap-2">
            <Search className="w-6 h-6 text-primary-600" /> {c.h2Where}
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.whereP1}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            <strong>{c.whereP2.a}</strong>{c.whereP2.a2}
            <strong>{c.whereP2.b}</strong>{c.whereP2.b2}
            <strong>{c.whereP2.c}</strong>{c.whereP2.c2}
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            <strong>{c.whereP3.bold}</strong>
            {c.whereP3.pre}
            <Link href={link("/vin-check")} className="text-primary-600 hover:underline font-medium">{c.whereP3.link}</Link>
            {c.whereP3.suffix}
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.whereP4}</p>

          <h2 id="vin-and-history" className="mt-12 text-2xl font-bold text-slate-900 scroll-mt-24 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-primary-600" /> {c.h2Vin}
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            {c.vinP1.pre}
            <Link href={link("/guides/what-is-a-vin-number")} className="text-primary-600 hover:underline font-medium">{c.vinP1.link}</Link>
            {c.vinP1.suffix}
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.vinP2}</p>
          <ul className="mt-4 space-y-2 text-slate-600 list-disc list-inside">
            <li>
              <strong>{c.vinBullets.title.bold}</strong>{c.vinBullets.title.preL}
              <Link href={link("/salvage-title-check")} className="text-primary-600 hover:underline font-medium">{c.vinBullets.title.linkLabel}</Link>
              {c.vinBullets.title.suffix}
            </li>
            <li>
              <strong>{c.vinBullets.odo.bold}</strong>{c.vinBullets.odo.preL}
              <Link href={link("/odometer-check")} className="text-primary-600 hover:underline font-medium">{c.vinBullets.odo.linkLabel}</Link>
              {c.vinBullets.odo.suffix}
            </li>
            <li>
              <strong>{c.vinBullets.acc.bold}</strong>{c.vinBullets.acc.preL}
              <Link href={link("/accident-history-check")} className="text-primary-600 hover:underline font-medium">{c.vinBullets.acc.linkLabel}</Link>
              {c.vinBullets.acc.suffix}
            </li>
            <li>
              <strong>{c.vinBullets.recalls.bold}</strong>{c.vinBullets.recalls.rest}
            </li>
            <li>
              <strong>{c.vinBullets.lemon.bold}</strong>{c.vinBullets.lemon.preL}
              <Link href={link("/lemon-check")} className="text-primary-600 hover:underline font-medium">{c.vinBullets.lemon.linkLabel}</Link>
              {c.vinBullets.lemon.suffix}
            </li>
          </ul>
          <p className="mt-4 text-slate-600 leading-relaxed">
            {c.vinP3.pre}
            <Link href={link("/guides/how-to-read-a-vin")} className="text-primary-600 hover:underline font-medium">{c.vinP3.link1}</Link>
            {c.vinP3.mid}
            <Link href={link("/guides/vin-decoding-master-guide")} className="text-primary-600 hover:underline font-medium">{c.vinP3.link2}</Link>
            {c.vinP3.mid2}
            <Link href={link("/vin-check-vs-carfax")} className="text-primary-600 hover:underline font-medium">{c.vinP3.link3}</Link>
            {c.vinP3.suffix}
          </p>

          <h2 id="inspection" className="mt-12 text-2xl font-bold text-slate-900 scroll-mt-24 flex items-center gap-2">
            <ClipboardCheck className="w-6 h-6 text-primary-600" /> {c.h2Inspection}
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.inspP1}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.inspP2}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.inspP3}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.inspP4}</p>

          <h2 id="negotiation" className="mt-12 text-2xl font-bold text-slate-900 scroll-mt-24 flex items-center gap-2">
            <Handshake className="w-6 h-6 text-primary-600" /> {c.h2Negotiation}
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.negP1}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.negP2}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.negP3}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.negP4}</p>

          <h2 id="paperwork" className="mt-12 text-2xl font-bold text-slate-900 scroll-mt-24 flex items-center gap-2">
            <FileText className="w-6 h-6 text-primary-600" /> {c.h2Paperwork}
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.paperP1}</p>
          <ul className="mt-4 space-y-2 text-slate-600 list-disc list-inside">
            {c.paperBullets.map((b) => (
              <li key={b.bold}>
                <strong>{b.bold}</strong>{b.rest}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-slate-600 leading-relaxed">
            {c.paperP2.pre}
            <Link href={link("/guides")} className="text-primary-600 hover:underline font-medium">{c.paperP2.link}</Link>
            {c.paperP2.suffix}
          </p>

          <h2 id="post-purchase" className="mt-12 text-2xl font-bold text-slate-900 scroll-mt-24 flex items-center gap-2">
            <Car className="w-6 h-6 text-primary-600" /> {c.h2Post}
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.postP1}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.postP2}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.postP3}</p>

          <h2 id="mistakes" className="mt-12 text-2xl font-bold text-slate-900 scroll-mt-24 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-amber-500" /> {c.h2Mistakes}
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.mistakesIntro}</p>
          <ol className="mt-4 space-y-3 text-slate-600 list-decimal list-inside">
            {c.mistakes.map((m) => (
              <li key={m.bold}>
                <strong>{m.bold}</strong>{m.rest}
                {m.link && (
                  <>
                    <Link href={link("/vin-check")} className="text-primary-600 hover:underline font-medium">{m.link.label}</Link>
                    {m.link.suffix}
                  </>
                )}
              </li>
            ))}
          </ol>

          <h2 id="faq" className="mt-12 text-2xl font-bold text-slate-900 scroll-mt-24">
            {c.h2Faq}
          </h2>
          <div className="mt-4 space-y-3">
            {faqs.map((faq) => (
              <details key={faq.question} className="group rounded-xl border border-slate-200 bg-white p-5">
                <summary className="flex cursor-pointer items-center justify-between gap-4 list-none">
                  <h3 className="text-base sm:text-lg font-semibold text-slate-900 m-0">
                    {faq.question}
                  </h3>
                  <span className="text-2xl text-primary-600 transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-slate-600 leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>

          <h2 className="mt-12 text-2xl font-bold text-slate-900 scroll-mt-24">
            {c.h2Deeper}
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.deeperIntro}</p>

          <h3 className="mt-6 text-xl font-bold text-slate-900">{c.h3OutOfState}</h3>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.outOfStateP1}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            {c.outOfStateP2.pre}
            <Link href={link("/vin-check")} className="text-primary-600 hover:underline font-medium">{c.outOfStateP2.link}</Link>
            {c.outOfStateP2.suffix}
          </p>

          <h3 className="mt-8 text-xl font-bold text-slate-900">{c.h3Ev}</h3>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.evP1}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.evP2}</p>

          <h3 className="mt-8 text-xl font-bold text-slate-900">{c.h3Fleet}</h3>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.fleetP1}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            {c.fleetP2.pre}
            <Link href={link("/guides/car-history-report-guide")} className="text-primary-600 hover:underline font-medium">{c.fleetP2.link}</Link>
            {c.fleetP2.suffix}
          </p>

          <h3 className="mt-8 text-xl font-bold text-slate-900">{c.h3Wrong}</h3>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.wrongP1}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.wrongP2}</p>

          <h2 className="mt-14 text-2xl font-bold text-slate-900">{c.h2Related}</h2>
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

          <h2 className="mt-14 text-2xl font-bold text-slate-900">{c.h2Continue}</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            {c.continueP.pre}
            <Link href={link("/stolen-vehicle-check")} className="text-primary-600 hover:underline font-medium">{c.continueP.a}</Link>
            {c.continueP.mid}
            <Link href={link("/salvage-title-check")} className="text-primary-600 hover:underline font-medium">{c.continueP.b}</Link>
            {c.continueP.mid2}
            <Link href={link("/lemon-check")} className="text-primary-600 hover:underline font-medium">{c.continueP.c}</Link>
            {c.continueP.suffix}
          </p>
        </div>
      </article>

      <section className="py-14 bg-slate-50">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">{c.bottomHeading}</h2>
          <p className="text-slate-700 mb-6">{c.bottomSub}</p>
          <VinSearchForm size="sm" />
        </div>
      </section>
    </>
  );
}

export { FAQS_EN, FAQS_ES };
