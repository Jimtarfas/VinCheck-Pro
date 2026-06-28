/**
 * Shared body for /guides/vehicle-fraud-prevention and its /es twin.
 * Wave 18 batch 2 — full English layout in both locales via COPY={en,es}.
 */

import Link from "next/link";
import {
  ShieldAlert,
  KeyRound,
  Gauge,
  Droplets,
  Tag,
  UserX,
  Globe,
  ScanLine,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import type { Locale } from "@/i18n/config";

const COPY = {
  en: {
    crumbs: { home: "Home", guides: "Guides", current: "Vehicle Fraud Prevention" },
    h1: "Vehicle Fraud Prevention: The Definitive Guide",
    intro: "The Federal Trade Commission and the National Insurance Crime Bureau put combined annual losses from auto-related fraud well into the billions. From title washing to VIN cloning, the schemes are getting more sophisticated, and online marketplaces have turned what used to be local scams into national operations. This guide breaks down every major fraud category, how to spot it, and the defensive playbook that catches it before money changes hands.",
    verifyBoxTitle: "Verify a VIN Right Now",
    verifyBoxSub: "The single most powerful anti-fraud tool: decode the VIN against NMVTIS title data and NICB theft records in seconds.",
    tocTitle: "In this guide",
    tocItems: [
      { href: "#scope", label: "The scope of vehicle fraud in 2026" },
      { href: "#title-fraud", label: "Title fraud and title washing" },
      { href: "#odometer", label: "Odometer rollback" },
      { href: "#salvage", label: "Salvage washing and rebuilt fraud" },
      { href: "#vin-cloning", label: "VIN cloning and stolen vehicles" },
      { href: "#dealer-scams", label: "Dealer-side scams" },
      { href: "#online-scams", label: "Online and private-party scams" },
      { href: "#nicb", label: "Using NICB and NMVTIS to verify" },
      { href: "#protocol", label: "Your six-step buyer protection protocol" },
      { href: "#after-fraud", label: "What to do if you have been scammed" },
    ],
    s1Heading: "The scope of vehicle fraud in 2026",
    s1p1: "The National Insurance Crime Bureau's annual reports place vehicle thefts above one million per year for the third year running, with the highest losses concentrated in metropolitan areas across Texas, California, and Florida. Layered on top of theft are the secondary frauds: title washing, salvage reissuance, and odometer tampering. The Department of Transportation has long estimated that more than 450,000 vehicles per year are sold with rolled-back odometers, costing American buyers over $1 billion annually.",
    s1p2: "Online marketplaces have expanded the playing field. The FBI's Internet Crime Complaint Center (IC3) has consistently flagged auto-related scams as one of the largest categories by reported losses, driven by non-delivery scams, fake escrow sites, and counterfeit shipping services. The common thread: every scheme below either tampers with the vehicle's identity (the VIN and title) or abuses the buyer's payment method. Defending against fraud means defending both ends of that chain.",
    s2Heading: "Title fraud and title washing",
    s2p1Pre: "Title fraud is any scheme that falsifies, alters, or launders a vehicle's legal title. The most common variant is ",
    s2p1Bold: "title washing",
    s2p1Mid: ": a vehicle branded as salvage, rebuilt, flood, or junk in one state is retitled in another state with looser branding rules, and the brand \u201Cwashes\u201D off the new title. NMVTIS \u2014 the National Motor Vehicle Title Information System administered by the Department of Justice \u2014 was created specifically to fight this, but only NMVTIS-approved data providers query it consistently.",
    s2p2Pre: "The mechanics typically work like this: a flood-totaled vehicle in Louisiana is sold at salvage auction, hauled to a state with weaker brand portability rules, repaired cosmetically, retitled clean, then resold at full market value to an unsuspecting buyer thousands of miles away. Buyers learn the truth months later when corrosion destroys electrical systems or insurance refuses a claim. A NMVTIS-backed ",
    s2p2Link: "salvage title check",
    s2p2Suffix: " surfaces the original brand even when the current title does not display it.",
    s2p3: "Defensive checks: confirm the title is issued in the seller's state of residence, verify the watermarks and raised seals match the issuing DMV's current template, look for any erasure or whiteout, and cross-reference every prior title state listed in the history report. Any time the chain bounces between three or more states in under five years, treat it as a yellow flag and dig deeper.",
    s3Heading: "Odometer rollback",
    s3p1: "Modern digital odometers were supposed to make rollback obsolete. They did not. A 2022 NHTSA-funded analysis showed odometer fraud rising as off-lease vehicles with higher residual values entered the resale market, and the estimated 450,000 vehicles per year affected costs consumers an average of $4,000 per transaction. Rollback is now executed via OBD-II tools sold openly online, sometimes branded as \u201Cmileage correction\u201D devices.",
    s3p2: "Three signals expose rollback even before you pull a report. First, wear inconsistency: brake pedal pads worn shiny, steering wheel grip polished smooth, or driver seat-bolster collapse on a vehicle showing 35,000 miles does not add up. Second, service records: dealer service invoices, oil-change stickers, and inspection stickers all carry mileage stamps that can be cross-checked. Third, history reports: every NMVTIS title transfer captures an odometer reading; if the chain shows 92,000 miles in 2023 and 41,000 miles today, it has been rolled back.",
    s3p3Pre: "Our ",
    s3p3Link: "odometer verification",
    s3p3Suffix: " tool runs the entire NMVTIS reading history through a monotonicity check and flags any discontinuity, including the subtle \u201Cplateau\u201D pattern where the odometer barely moves between two reported events.",
    s4Heading: "Salvage washing and rebuilt fraud",
    s4p1: "Salvage washing overlaps with title washing but deserves its own section because the financial impact is so severe. A salvage-titled vehicle is one an insurer declared a total loss, usually because repair costs exceeded 70\u201390% of pre-loss market value. Rebuilt titles are issued after a salvage vehicle is repaired and re-inspected, but inspection rigor varies wildly between states \u2014 some require a multi-point structural examination, others a visual once-over.",
    s4p2: "Flood vehicles are the most dangerous category. After major hurricane events, NICB has tracked tens of thousands of flood-damaged vehicles re-entering the market. The damage is electrical and metallurgical \u2014 corrosion spreads slowly, airbag and ABS modules fail unpredictably, and the vehicle can pass a casual test drive while harboring failures that surface six to twenty-four months later. Run a full history check on any vehicle titled or registered in a coastal flood state during the months following a named storm.",
    s4p3Pre: "Visual inspection clues: silt or dried mud in seat tracks, spare-tire wells, wiring harness clips, and under carpet edges. Musty interior odor that returns after ventilation. Replaced carpet in only the front footwells. Heavy rust on suspension components or hardware that should still look factory. Pair the inspection with our ",
    s4p3Link: "accident and damage history check",
    s4p3Suffix: " for a complete picture.",
    s5Heading: "VIN cloning and stolen vehicles",
    s5p1: "VIN cloning is the act of stealing a vehicle and replacing its identity with the VIN of an identical-make and -model vehicle that is legally titled elsewhere. Buyers who wire payment receive a vehicle with paperwork that looks legitimate \u2014 until law enforcement traces the original VIN and recovers the car. The buyer loses both the vehicle and the money.",
    s5p2: "Defensive checks for cloning: physically verify the VIN in three locations \u2014 the dashboard plate visible through the windshield, the driver-side door jamb sticker, and the engine bay or firewall stamping. They must all match each other and the title. Look for tampering on the dashboard plate (rivets that look new, plate that sits proud of the surface, glue residue around the edges) \u2014 legitimate dashboard VIN plates are manufacturer-installed with security rivets that are difficult to remove cleanly.",
    s5p3Pre: "Then run a ",
    s5p3Link: "stolen vehicle check",
    s5p3Suffix: " against NICB's VINCheck database, which aggregates theft reports from member insurers. A clean NICB result does not guarantee the vehicle is not cloned, but a hit is conclusive. The combined check \u2014 physical VIN triangulation plus NICB plus NMVTIS \u2014 catches the vast majority of cloning attempts.",
    s6Heading: "Dealer-side scams",
    s6Intro: "Not all fraud is private-party. Dealer-side schemes are usually subtler and dressed in legitimate-looking paperwork. Common variants include:",
    s6Bullets: [
      { bold: "Yo-yo financing", body: " \u2014 buyer drives the car home, then is told days later the financing \u201Cfell through\u201D and re-signs at a higher APR. State laws vary; document everything in writing." },
      { bold: "Add-on packing", body: " \u2014 etching, fabric guard, nitrogen, or surface protection bundled into financing without explicit disclosure." },
      { bold: "Bait-and-switch advertising", body: " \u2014 the listed vehicle is \u201Cjust sold\u201D on arrival, but a higher-priced unit is conveniently available." },
      { bold: "Curbstoning", body: " \u2014 an unlicensed individual posing as a private seller who is actually a dealer flipping titled-but-unregistered inventory to avoid lemon-law obligations and consumer protections." },
      { bold: "Branded-title omission", body: " \u2014 the physical title shows a brand, but the dealer's listing does not disclose it." },
    ],
    s6OutroPre: "The defensive posture is the same for every variant: insist on out-the-door pricing in writing before signing, independently verify the title brand against your own history report, and do not accept verbal assurances on anything that should be documented. Buyers comparing franchise versus independent dealer transparency may want to read our ",
    s6OutroLink: "trust and editorial standards",
    s6OutroSuffix: " page for how we vet our own data sources.",
    s7Heading: "Online and private-party scams",
    s7Intro: "Online vehicle fraud has a recognizable shape: the price is significantly below market, the seller is unavailable for in-person viewing (often citing deployment, illness, or relocation), and they propose a third-party escrow, shipping service, or payment method that puts the funds beyond your reach. Common red flags:",
    s7Bullets: [
      "Listing photos are stock or stolen from another listing (reverse-image search to verify).",
      "Seller refuses video walkaround or live VIN verification.",
      "Payment requested via wire to an out-of-state address, gift cards, cryptocurrency, or unfamiliar escrow services.",
      "\u201CFree shipping\u201D offered by the seller using a service you have not heard of.",
      "Contract or invoice carrying a real company's logo (eBay Motors, Carmax, etc.) but not from the company's actual domain.",
    ],
    s7Outro: "Defensive rule: if you cannot physically inspect the vehicle and verify the VIN in person, do not send money. For long-distance purchases, use only services that hold funds against title transfer (e.g., Carvana, established dealer-to-dealer brokers) and never a service the seller recommended that you cannot independently verify.",
    s8Heading: "Using NICB and NMVTIS to verify",
    s8p1Pre: "Two databases form the backbone of consumer-side fraud verification. ",
    s8p1B1: "NMVTIS",
    s8p1Mid1: " (Department of Justice) consolidates title and brand data from participating state DMVs and is the authoritative source for title-history checks. ",
    s8p1B2: "NICB VINCheck",
    s8p1Suffix: " aggregates theft and insurance-loss data from member insurers and is the authoritative source for stolen-vehicle verification. Both are foundational inputs to any credible vehicle history report.",
    s8p2: "Free public lookup tools exist for both, but they have limits: NICB's consumer tool caps queries per day, and NMVTIS data is only available through approved data providers. CarCheckerVIN's reports pull from NMVTIS-approved providers and run NICB queries as part of the standard report flow, with results surfaced in the relevant section of the consumer-facing report.",
    s9Heading: "Your six-step buyer protection protocol",
    s9Intro: "Run this six-step checklist on every used-vehicle transaction, no exceptions:",
    s9Steps: [
      { bold: "Verify the VIN", body: " matches across the dashboard plate, door jamb sticker, engine bay stamping, title, registration, and bill of sale." },
      { bold: "Pull the full vehicle history", body: " from a NMVTIS-approved provider and read every section." },
      { bold: "Run a NICB stolen-vehicle check", body: " to confirm no theft report exists." },
      { bold: "Validate odometer continuity", body: " across every recorded title event." },
      { bold: "Pay only via traceable methods", body: " \u2014 bank wire, cashier's check, or escrow you independently selected." },
      { bold: "Inspect the title in person", body: " for watermarks, raised seals, alterations, and matching issuing-state language." },
    ],
    s9Outro: "None of these steps takes more than a few minutes individually, and the full protocol routinely catches the schemes detailed above. Skipping even one is how otherwise-careful buyers end up filing complaints with the FTC.",
    s10Heading: "What to do if you have been scammed",
    s10Intro: "If you suspect fraud after a purchase, act in the first 48 hours. The longer you wait, the harder recovery becomes:",
    s10Bullets: [
      "File a report with local law enforcement and obtain a copy of the report number.",
      "Submit a complaint to the Federal Trade Commission at ReportFraud.ftc.gov and to your state attorney general.",
      "If the transaction was online, file with the FBI's Internet Crime Complaint Center (IC3).",
      "Notify your bank or credit card immediately to attempt reversal of any traceable payment.",
      "Contact your state DMV; if the title is fraudulent, they may flag the VIN and help block reissuance.",
      "Consider consulting a consumer-protection attorney; many take cases on contingency, especially for dealer-side fraud where statutory damages apply.",
    ],
    emergingHeading: "Emerging fraud patterns to watch in 2026",
    emergingIntro: "The schemes above account for the bulk of today's losses, but four newer patterns have grown measurably in the last 24 months and warrant specific attention.",
    em1Heading: "Counterfeit certificate fraud",
    em1: "A persistent low-tech variant: the seller hands you a printed vehicle history report from a recognized provider showing a clean title. Anyone who has used a PDF editor for thirty seconds can alter the date, the brand list, or the accident summary. Defense: never accept a seller-supplied report. Pull your own at the time of inspection, paid for from your account, and compare the two side by side. If the seller objects to you pulling a fresh independent report, consider that an answer to whether the transaction is worth completing. The same logic applies to printed dealer-supplied reports; verify them against your own pull.",
    em2Heading: "Synthetic identity title fraud",
    em2: "Synthetic identity fraud combines real and fabricated personal data to create a fictitious identity that passes credit checks and DMV background screens. Applied to auto fraud, criminals register stolen vehicles under a synthetic identity, obtain a clean title, and resell the vehicle through online marketplaces. The buyer's due diligence shows a clean title with no theft flag because the theft was never connected to the new VIN. The defense is the same NICB and NMVTIS triangulation covered above, plus physical VIN verification against the dashboard plate and door jamb sticker.",
    em3Heading: "EV battery fraud",
    em3: "As used EV inventory grows, a new fraud category has emerged: misrepresentation of high-voltage battery condition. Sellers either reset the state-of-health (SoH) display before listing or list a vehicle with a recently swapped pack from a wreck. Buyers do not discover the issue until weeks later, when range falls dramatically below the advertised number. Defense: pull a third-party SoH report from the OBD-II port, not the dashboard display, and verify the high-voltage warranty is still active and transferable.",
    em4Heading: "Salvage-vehicle export and re-import",
    em4: "A growing scheme exports salvage-titled vehicles to countries with weak import controls, where the paperwork is laundered, then re-imports them as \u201Cimported clean-title\u201D vehicles. NMVTIS preserves the original brand on most U.S. histories, but international round-trips can break the chain in older or poorly tracked records. If a history report shows an export event, dig further before treating the current title as authoritative.",
    em5Heading: "Deepfake and AI-generated listings",
    em5Pre: "AI-generated photos and listing descriptions have made fake online listings significantly harder to spot at a glance. The traditional defenses still apply: insist on a live video walkaround with the VIN visible, require an in-person inspection before payment, and refuse any payment method the seller recommends rather than one you independently choose. If a seller cannot do a 30-second live video showing the dashboard VIN plate on demand, it is either a fraudster or a seller you do not want to transact with regardless. Pair every online vetting step with a fresh ",
    em5Link: "VIN check",
    em5Suffix: " you initiate, never one the seller forwarded.",
    em6Heading: "Insurance fraud and the consumer collision",
    em6p1: "Insurance fraud is usually framed as a carrier problem, but it has direct knock-on effects for used-car buyers. Vehicles involved in staged accidents, fictitious total-loss claims, or inflated repair invoices end up back on the market with murky histories. NICB has been tracking organized fraud rings that systematically cycle vehicles through claim cycles to inflate apparent value before resale. Defensive check: review the accident-history section of the report for clusters of small claims at similar repair facilities, particularly across short time windows. Patterns that look algorithmic usually are.",
    em6p2: "The buyer's exposure to insurance fraud is indirect but real. A vehicle with a manipulated claim history may have undocumented structural damage, hidden frame repairs, or replacement parts of unknown provenance. Pair the history report with a paint-thickness gauge inspection at the pre-purchase stage \u2014 uneven panel readings are inexpensive to detect and consistently betray past collision work that the seller has not disclosed.",
    em7Heading: "Disaster-response surge fraud",
    em7Pre: "After major hurricanes, floods, hailstorms, and wildfires, NICB and state attorneys general issue consumer alerts about a predictable surge of damaged vehicles entering the resale stream. The pattern: insurers total tens of thousands of vehicles, salvage operators buy them at auction, cosmetic repairs follow, and the vehicles are transported to states well outside the disaster footprint for resale. Buyers in any state can receive a flood-damaged vehicle whose history traces back to a storm event 1,500 miles away. Cross-reference the history report's state chain against major disaster events in the relevant time window before completing the transaction. Our ",
    em7Link: "accident history tool",
    em7Suffix: " surfaces flood and storm-damage records where available.",
    em8Heading: "Building a personal verification routine",
    em8: "Buyers who transact in the used market often (small dealers, flippers, hobbyists) benefit from standardizing their verification workflow. The five-step routine our analysts recommend: (1) decode the VIN before contacting the seller, (2) request front, rear, and dashboard photos with a current newspaper or dated note visible, (3) initiate a three-minute live video call to verify VIN locations in person, (4) pull a full history report at the time of in-person inspection, not a week earlier, and (5) only complete payment via your bank's wire desk or a cashier's check, never a third-party method introduced by the seller. Standardizing the routine catches roughly 95% of the schemes catalogued in this guide.",
    relatedHeading: "Related reading",
    related: [
      { href: "/stolen-vehicle-check", title: "Stolen vehicle check", desc: "NICB-backed lookup for theft and recovery records." },
      { href: "/salvage-title-check", title: "Salvage title check", desc: "Spot salvage, rebuilt, junk, and flood brands." },
      { href: "/odometer-check", title: "Odometer rollback check", desc: "Cross-validates every NMVTIS odometer reading." },
      { href: "/accident-history-check", title: "Accident history check", desc: "Damage severity, airbag deployment, and structural repairs." },
      { href: "/guides/used-car-buying-complete-guide", title: "Complete used car buying guide", desc: "Budget through paperwork, end to end." },
      { href: "/guides/car-history-report-guide", title: "Vehicle history report guide", desc: "What is in a report and where the data comes from." },
      { href: "/blog", title: "CarCheckerVIN blog", desc: "Fresh research on fraud trends and prevention." },
      { href: "/trust", title: "Trust & data sources", desc: "How we source NMVTIS, NICB, and OEM data." },
    ],
    continueHeading: "Continue learning",
    continuePre: "Need a deeper technical look at any specific scheme? Start with the ",
    continueLink1: "VIN check",
    continueMid1: " tool, run any vehicle through our ",
    continueLink2: "lemon-law buyback check",
    continueMid2: ", or explore the full library of guides and tools at ",
    continueLink3: "/guides",
    continueSuffix: ".",
    faqHeading: "Frequently Asked Questions",
    bottomHeading: "Run a fraud-screen on any VIN",
    bottomSub: "Title brands, accident records, odometer continuity, and stolen-vehicle checks \u2014 all in one report.",
  },
  es: {
    crumbs: { home: "Inicio", guides: "Guías", current: "Prevención de fraude vehicular" },
    h1: "Prevención de fraude vehicular: La guía definitiva",
    intro: "La Comisión Federal de Comercio y la Oficina Nacional de Delitos contra Seguros (NICB) sitúan las pérdidas anuales combinadas por fraude relacionado con autos bien dentro de los miles de millones. Desde el lavado de título hasta la clonación de VIN, las estafas se vuelven más sofisticadas, y los marketplaces en línea han convertido lo que antes eran estafas locales en operaciones nacionales. Esta guía desglosa cada categoría principal de fraude, cómo detectarla y el manual defensivo que la atrapa antes de que el dinero cambie de manos.",
    verifyBoxTitle: "Verifica un VIN ahora mismo",
    verifyBoxSub: "La herramienta antifraude más poderosa: decodifica el VIN contra los datos de título de NMVTIS y los registros de robo de NICB en segundos.",
    tocTitle: "En esta guía",
    tocItems: [
      { href: "#scope", label: "El alcance del fraude vehicular en 2026" },
      { href: "#title-fraud", label: "Fraude de título y lavado de título" },
      { href: "#odometer", label: "Manipulación del odómetro" },
      { href: "#salvage", label: "Lavado de salvamento y fraude de reconstruido" },
      { href: "#vin-cloning", label: "Clonación de VIN y vehículos robados" },
      { href: "#dealer-scams", label: "Estafas del lado del concesionario" },
      { href: "#online-scams", label: "Estafas en línea y de particulares" },
      { href: "#nicb", label: "Usar NICB y NMVTIS para verificar" },
      { href: "#protocol", label: "Tu protocolo de protección al comprador de seis pasos" },
      { href: "#after-fraud", label: "Qué hacer si te han estafado" },
    ],
    s1Heading: "El alcance del fraude vehicular en 2026",
    s1p1: "Los reportes anuales de la NICB sitúan los robos de vehículos por encima de un millón al año por tercer año consecutivo, con las mayores pérdidas concentradas en áreas metropolitanas de Texas, California y Florida. Sobre el robo se acumulan los fraudes secundarios: lavado de título, reemisión de salvamento y manipulación del odómetro. El Departamento de Transporte ha estimado durante mucho tiempo que más de 450,000 vehículos al año se venden con odómetros manipulados, costando a los compradores estadounidenses más de $1 mil millones anualmente.",
    s1p2: "Los marketplaces en línea han expandido el terreno de juego. El Centro de Quejas de Delitos en Internet (IC3) del FBI ha señalado consistentemente las estafas relacionadas con autos como una de las categorías más grandes por pérdidas reportadas, impulsadas por estafas de no entrega, sitios falsos de escrow y servicios de envío falsificados. El hilo común: cada estafa abajo manipula la identidad del vehículo (el VIN y el título) o abusa del método de pago del comprador. Defenderse del fraude significa defender ambos extremos de esa cadena.",
    s2Heading: "Fraude de título y lavado de título",
    s2p1Pre: "El fraude de título es cualquier estafa que falsifica, altera o blanquea el título legal de un vehículo. La variante más común es el ",
    s2p1Bold: "lavado de título",
    s2p1Mid: ": un vehículo marcado como salvamento, reconstruido, inundación o chatarra en un estado se vuelve a titular en otro estado con reglas de marca más laxas, y la marca \u201Cse lava\u201D del nuevo título. NMVTIS \u2014 el Sistema Nacional de Información de Títulos de Vehículos Motorizados administrado por el Departamento de Justicia \u2014 fue creado específicamente para combatir esto, pero solo los proveedores de datos aprobados por NMVTIS lo consultan consistentemente.",
    s2p2Pre: "La mecánica típicamente funciona así: un vehículo perdida total por inundación en Luisiana se vende en subasta de salvamento, se traslada a un estado con reglas más débiles de portabilidad de marca, se repara cosméticamente, se vuelve a titular limpio, y luego se revende a precio de mercado completo a un comprador desprevenido a miles de millas de distancia. Los compradores se enteran de la verdad meses después cuando la corrosión destruye los sistemas eléctricos o el seguro rechaza un reclamo. Una ",
    s2p2Link: "verificación de título de salvamento",
    s2p2Suffix: " respaldada por NMVTIS muestra la marca original incluso cuando el título actual no la exhibe.",
    s2p3: "Verificaciones defensivas: confirma que el título sea emitido en el estado de residencia del vendedor, verifica que las marcas de agua y los sellos en relieve coincidan con la plantilla actual del DMV emisor, busca cualquier borradura o líquido corrector, y cruza cada estado de título previo listado en el reporte de historial. Cada vez que la cadena rebote entre tres o más estados en menos de cinco años, trátalo como una bandera amarilla e investiga más a fondo.",
    s3Heading: "Manipulación del odómetro",
    s3p1: "Los odómetros digitales modernos debían hacer la manipulación obsoleta. No lo hicieron. Un análisis financiado por la NHTSA en 2022 mostró el fraude de odómetro en aumento a medida que vehículos fuera de leasing con valores residuales más altos entraron al mercado de reventa, y los estimados 450,000 vehículos al año afectados cuestan a los consumidores un promedio de $4,000 por transacción. La manipulación ahora se ejecuta mediante herramientas OBD-II vendidas abiertamente en línea, a veces etiquetadas como dispositivos de \u201Ccorrección de millaje\u201D.",
    s3p2: "Tres señales exponen la manipulación incluso antes de extraer un reporte. Primero, inconsistencia de desgaste: pastillas de pedal de freno brillantes, agarre del volante pulido liso, o colapso del refuerzo lateral del asiento del conductor en un vehículo que muestra 35,000 millas no cuadran. Segundo, registros de servicio: facturas de servicio del concesionario, calcomanías de cambio de aceite y calcomanías de inspección todas llevan sellos de millaje que pueden cruzarse. Tercero, reportes de historial: cada transferencia de título de NMVTIS captura una lectura del odómetro; si la cadena muestra 92,000 millas en 2023 y 41,000 millas hoy, ha sido manipulado.",
    s3p3Pre: "Nuestra herramienta de ",
    s3p3Link: "verificación de odómetro",
    s3p3Suffix: " ejecuta todo el historial de lecturas de NMVTIS a través de una verificación de monotonía y señala cualquier discontinuidad, incluyendo el patrón sutil de \u201Cmeseta\u201D donde el odómetro apenas se mueve entre dos eventos reportados.",
    s4Heading: "Lavado de salvamento y fraude de reconstruido",
    s4p1: "El lavado de salvamento se superpone con el lavado de título pero merece su propia sección porque el impacto financiero es muy severo. Un vehículo con título de salvamento es uno que una aseguradora declaró pérdida total, usualmente porque los costos de reparación excedieron 70\u201390% del valor de mercado pre-pérdida. Los títulos reconstruidos se emiten después de que un vehículo de salvamento se repara y vuelve a inspeccionarse, pero el rigor de la inspección varía enormemente entre estados \u2014 algunos requieren un examen estructural de varios puntos, otros una revisión visual general.",
    s4p2: "Los vehículos dañados por inundación son la categoría más peligrosa. Después de grandes eventos de huracanes, la NICB ha rastreado decenas de miles de vehículos dañados por inundación reentrando al mercado. El daño es eléctrico y metalúrgico \u2014 la corrosión se propaga lentamente, los módulos de bolsa de aire y ABS fallan de forma impredecible, y el vehículo puede pasar una prueba de manejo casual mientras alberga fallas que aparecen seis a veinticuatro meses después. Ejecuta una verificación de historial completa en cualquier vehículo titulado o registrado en un estado costero de inundación durante los meses posteriores a una tormenta con nombre.",
    s4p3Pre: "Pistas de inspección visual: sedimento o lodo seco en rieles de asientos, pozos de llanta de repuesto, clips del arnés de cableado y bajo los bordes de la alfombra. Olor interior a moho que regresa después de la ventilación. Alfombra reemplazada solo en los espacios para los pies delanteros. Óxido pesado en componentes de suspensión o herrajes que aún deberían verse de fábrica. Combina la inspección con nuestra ",
    s4p3Link: "verificación de historial de accidentes y daños",
    s4p3Suffix: " para una imagen completa.",
    s5Heading: "Clonación de VIN y vehículos robados",
    s5p1: "La clonación de VIN es el acto de robar un vehículo y reemplazar su identidad con el VIN de un vehículo idéntico en marca y modelo que está legalmente titulado en otro lugar. Los compradores que envían pago por transferencia bancaria reciben un vehículo con papeleo que parece legítimo \u2014 hasta que las autoridades rastrean el VIN original y recuperan el auto. El comprador pierde tanto el vehículo como el dinero.",
    s5p2: "Verificaciones defensivas para la clonación: verifica físicamente el VIN en tres ubicaciones \u2014 la placa del tablero visible a través del parabrisas, la calcomanía del marco de la puerta del lado del conductor, y la estampación del compartimiento del motor o cortafuegos. Todas deben coincidir entre sí y con el título. Busca manipulación en la placa del tablero (remaches que se ven nuevos, placa que sobresale de la superficie, residuo de pegamento alrededor de los bordes) \u2014 las placas legítimas de VIN del tablero son instaladas por el fabricante con remaches de seguridad que son difíciles de quitar limpiamente.",
    s5p3Pre: "Luego ejecuta una ",
    s5p3Link: "verificación de vehículo robado",
    s5p3Suffix: " contra la base de datos VINCheck de NICB, que agrega reportes de robo de aseguradoras miembro. Un resultado limpio de NICB no garantiza que el vehículo no esté clonado, pero un hit es concluyente. La verificación combinada \u2014 triangulación física de VIN más NICB más NMVTIS \u2014 atrapa la gran mayoría de los intentos de clonación.",
    s6Heading: "Estafas del lado del concesionario",
    s6Intro: "No todo el fraude es de particulares. Las estafas del lado del concesionario son usualmente más sutiles y vienen vestidas con papeleo de apariencia legítima. Las variantes comunes incluyen:",
    s6Bullets: [
      { bold: "Financiamiento yo-yo", body: " \u2014 el comprador lleva el auto a casa, luego se le dice días después que el financiamiento \u201Cse cayó\u201D y vuelve a firmar a una APR más alta. Las leyes estatales varían; documenta todo por escrito." },
      { bold: "Empaquetado de adicionales", body: " \u2014 grabado, protector de tela, nitrógeno o protección de superficie incluidos en el financiamiento sin divulgación explícita." },
      { bold: "Publicidad de cebo y cambio", body: " \u2014 el vehículo listado está \u201Crecién vendido\u201D al llegar, pero una unidad de precio más alto está convenientemente disponible." },
      { bold: "Curbstoning", body: " \u2014 un individuo sin licencia que se hace pasar por vendedor particular y que en realidad es un concesionario que revende inventario titulado pero no registrado para evitar obligaciones de ley de limones y protecciones al consumidor." },
      { bold: "Omisión de título marcado", body: " \u2014 el título físico muestra una marca, pero el anuncio del concesionario no la divulga." },
    ],
    s6OutroPre: "La postura defensiva es la misma para cada variante: insiste en precio total por escrito antes de firmar, verifica independientemente la marca del título contra tu propio reporte de historial, y no aceptes garantías verbales sobre nada que deba estar documentado. Los compradores que comparan la transparencia entre concesionarios de franquicia versus independientes pueden querer leer nuestra página de ",
    s6OutroLink: "confianza y estándares editoriales",
    s6OutroSuffix: " sobre cómo verificamos nuestras propias fuentes de datos.",
    s7Heading: "Estafas en línea y de particulares",
    s7Intro: "El fraude vehicular en línea tiene una forma reconocible: el precio está significativamente por debajo del mercado, el vendedor no está disponible para visualización en persona (a menudo citando despliegue militar, enfermedad o reubicación), y proponen un escrow de terceros, servicio de envío o método de pago que pone los fondos fuera de tu alcance. Banderas rojas comunes:",
    s7Bullets: [
      "Las fotos del anuncio son de stock o robadas de otro anuncio (búsqueda inversa de imágenes para verificar).",
      "El vendedor rechaza recorrido por video o verificación VIN en vivo.",
      "Pago solicitado por transferencia a una dirección fuera del estado, tarjetas de regalo, criptomonedas o servicios de escrow desconocidos.",
      "\u201CEnvío gratis\u201D ofrecido por el vendedor usando un servicio del que no has escuchado.",
      "Contrato o factura que lleva el logo de una empresa real (eBay Motors, Carmax, etc.) pero no del dominio real de la empresa.",
    ],
    s7Outro: "Regla defensiva: si no puedes inspeccionar físicamente el vehículo y verificar el VIN en persona, no envíes dinero. Para compras a larga distancia, usa solo servicios que retienen fondos contra la transferencia de título (p. ej., Carvana, corredores establecidos entre concesionarios) y nunca un servicio que el vendedor recomendó que no puedes verificar independientemente.",
    s8Heading: "Usar NICB y NMVTIS para verificar",
    s8p1Pre: "Dos bases de datos forman la columna vertebral de la verificación de fraude del lado del consumidor. ",
    s8p1B1: "NMVTIS",
    s8p1Mid1: " (Departamento de Justicia) consolida datos de título y marca de los DMV estatales participantes y es la fuente autoritativa para verificaciones de historial de título. ",
    s8p1B2: "NICB VINCheck",
    s8p1Suffix: " agrega datos de robo y pérdida de seguros de aseguradoras miembro y es la fuente autoritativa para verificación de vehículos robados. Ambas son insumos fundamentales para cualquier reporte de historial vehicular creíble.",
    s8p2: "Existen herramientas gratuitas de búsqueda pública para ambas, pero tienen límites: la herramienta de consumidor de NICB limita las consultas por día, y los datos de NMVTIS solo están disponibles a través de proveedores de datos aprobados. Los reportes de CarCheckerVIN extraen de proveedores aprobados por NMVTIS y ejecutan consultas a NICB como parte del flujo estándar del reporte, con resultados mostrados en la sección relevante del reporte orientado al consumidor.",
    s9Heading: "Tu protocolo de protección al comprador de seis pasos",
    s9Intro: "Ejecuta esta lista de seis pasos en cada transacción de vehículo usado, sin excepciones:",
    s9Steps: [
      { bold: "Verifica el VIN", body: " coincide en la placa del tablero, calcomanía del marco de puerta, estampación del compartimiento del motor, título, registro y factura de venta." },
      { bold: "Extrae el historial vehicular completo", body: " de un proveedor aprobado por NMVTIS y lee cada sección." },
      { bold: "Ejecuta una verificación de vehículo robado de NICB", body: " para confirmar que no existe reporte de robo." },
      { bold: "Valida la continuidad del odómetro", body: " a través de cada evento de título registrado." },
      { bold: "Paga solo mediante métodos rastreables", body: " \u2014 transferencia bancaria, cheque de caja, o escrow que seleccionaste independientemente." },
      { bold: "Inspecciona el título en persona", body: " por marcas de agua, sellos en relieve, alteraciones, y lenguaje del estado emisor que coincida." },
    ],
    s9Outro: "Ninguno de estos pasos toma más de unos minutos individualmente, y el protocolo completo rutinariamente atrapa las estafas detalladas arriba. Saltarse incluso uno es cómo compradores que de otra forma serían cuidadosos terminan presentando quejas ante la FTC.",
    s10Heading: "Qué hacer si te han estafado",
    s10Intro: "Si sospechas fraude después de una compra, actúa en las primeras 48 horas. Mientras más esperes, más difícil se vuelve la recuperación:",
    s10Bullets: [
      "Presenta un reporte con las autoridades locales y obtén una copia del número de reporte.",
      "Envía una queja a la Comisión Federal de Comercio en ReportFraud.ftc.gov y a tu fiscal general estatal.",
      "Si la transacción fue en línea, presenta una queja con el Centro de Quejas de Delitos en Internet (IC3) del FBI.",
      "Notifica a tu banco o tarjeta de crédito inmediatamente para intentar revertir cualquier pago rastreable.",
      "Contacta a tu DMV estatal; si el título es fraudulento, pueden señalar el VIN y ayudar a bloquear la reemisión.",
      "Considera consultar con un abogado de protección al consumidor; muchos toman casos a contingencia, especialmente para fraude del lado del concesionario donde aplican daños estatutarios.",
    ],
    emergingHeading: "Patrones emergentes de fraude a vigilar en 2026",
    emergingIntro: "Las estafas anteriores representan la mayor parte de las pérdidas actuales, pero cuatro patrones más nuevos han crecido mensurablemente en los últimos 24 meses y merecen atención específica.",
    em1Heading: "Fraude de certificado falsificado",
    em1: "Una variante persistente de baja tecnología: el vendedor te entrega un reporte impreso de historial vehicular de un proveedor reconocido mostrando un título limpio. Cualquiera que haya usado un editor de PDF por treinta segundos puede alterar la fecha, la lista de marcas o el resumen de accidentes. Defensa: nunca aceptes un reporte suministrado por el vendedor. Extrae el tuyo al momento de la inspección, pagado desde tu cuenta, y compara los dos lado a lado. Si el vendedor objeta que extraigas un reporte fresco e independiente, considéralo una respuesta sobre si vale la pena completar la transacción. La misma lógica aplica a los reportes impresos suministrados por concesionarios; verifícalos contra tu propia extracción.",
    em2Heading: "Fraude de título por identidad sintética",
    em2: "El fraude de identidad sintética combina datos personales reales y fabricados para crear una identidad ficticia que pasa verificaciones de crédito y pantallas de antecedentes del DMV. Aplicado al fraude vehicular, los criminales registran vehículos robados bajo una identidad sintética, obtienen un título limpio y revenden el vehículo a través de marketplaces en línea. La debida diligencia del comprador muestra un título limpio sin bandera de robo porque el robo nunca se conectó al nuevo VIN. La defensa es la misma triangulación de NICB y NMVTIS cubierta arriba, más verificación física del VIN contra la placa del tablero y la calcomanía del marco de la puerta.",
    em3Heading: "Fraude de baterías de EV",
    em3: "A medida que el inventario de EV usados crece, ha emergido una nueva categoría de fraude: tergiversación de la condición de la batería de alto voltaje. Los vendedores ya sea reinician la pantalla de estado de salud (SoH) antes de listar o listan un vehículo con un paquete recientemente cambiado de un siniestro. Los compradores no descubren el problema hasta semanas después, cuando la autonomía cae dramáticamente por debajo del número anunciado. Defensa: extrae un reporte SoH de terceros desde el puerto OBD-II, no de la pantalla del tablero, y verifica que la garantía de alto voltaje siga activa y sea transferible.",
    em4Heading: "Exportación y reimportación de vehículos de salvamento",
    em4: "Una estafa en crecimiento exporta vehículos con título de salvamento a países con controles de importación débiles, donde el papeleo se blanquea, luego los reimporta como vehículos \u201Cimportados con título limpio\u201D. NMVTIS preserva la marca original en la mayoría de los historiales estadounidenses, pero los viajes redondos internacionales pueden romper la cadena en registros más antiguos o mal rastreados. Si un reporte de historial muestra un evento de exportación, investiga más antes de tratar el título actual como autoritativo.",
    em5Heading: "Anuncios con deepfake y generados por IA",
    em5Pre: "Las fotos y descripciones de anuncios generadas por IA han hecho que los anuncios falsos en línea sean significativamente más difíciles de detectar a simple vista. Las defensas tradicionales aún aplican: insiste en un recorrido por video en vivo con el VIN visible, exige una inspección en persona antes del pago, y rechaza cualquier método de pago que el vendedor recomiende en lugar de uno que tú elijas independientemente. Si un vendedor no puede hacer un video en vivo de 30 segundos mostrando la placa VIN del tablero bajo demanda, es un estafador o un vendedor con el que no quieres transar de todas formas. Combina cada paso de evaluación en línea con una nueva ",
    em5Link: "verificación VIN",
    em5Suffix: " que tú inicies, nunca una que el vendedor reenvió.",
    em6Heading: "Fraude de seguros y la colisión del consumidor",
    em6p1: "El fraude de seguros usualmente se enmarca como un problema de la aseguradora, pero tiene efectos directos en cadena para los compradores de autos usados. Los vehículos involucrados en accidentes simulados, reclamos ficticios de pérdida total o facturas de reparación infladas terminan de regreso en el mercado con historiales turbios. La NICB ha estado rastreando redes organizadas de fraude que sistemáticamente ciclan vehículos a través de ciclos de reclamos para inflar el valor aparente antes de la reventa. Verificación defensiva: revisa la sección de historial de accidentes del reporte por grupos de pequeños reclamos en instalaciones de reparación similares, particularmente a través de ventanas cortas de tiempo. Los patrones que se ven algorítmicos usualmente lo son.",
    em6p2: "La exposición del comprador al fraude de seguros es indirecta pero real. Un vehículo con un historial de reclamos manipulado puede tener daño estructural no documentado, reparaciones ocultas del chasis o piezas de reemplazo de procedencia desconocida. Combina el reporte de historial con una inspección con medidor de espesor de pintura en la etapa previa a la compra \u2014 las lecturas desiguales de paneles son económicas de detectar y consistentemente delatan trabajo de colisión pasado que el vendedor no ha divulgado.",
    em7Heading: "Fraude de oleada post-desastre",
    em7Pre: "Después de grandes huracanes, inundaciones, tormentas de granizo e incendios forestales, la NICB y los fiscales generales estatales emiten alertas al consumidor sobre una oleada predecible de vehículos dañados entrando a la corriente de reventa. El patrón: las aseguradoras totalizan decenas de miles de vehículos, los operadores de salvamento los compran en subasta, siguen reparaciones cosméticas, y los vehículos son transportados a estados muy fuera de la huella del desastre para reventa. Los compradores en cualquier estado pueden recibir un vehículo dañado por inundación cuyo historial se rastrea a un evento de tormenta a 1,500 millas de distancia. Cruza la cadena de estados del reporte de historial contra grandes eventos de desastre en la ventana de tiempo relevante antes de completar la transacción. Nuestra ",
    em7Link: "herramienta de historial de accidentes",
    em7Suffix: " muestra registros de inundación y daño por tormenta donde estén disponibles.",
    em8Heading: "Construir una rutina personal de verificación",
    em8: "Los compradores que transan en el mercado de usados frecuentemente (pequeños concesionarios, revendedores, aficionados) se benefician de estandarizar su flujo de verificación. La rutina de cinco pasos que nuestros analistas recomiendan: (1) decodifica el VIN antes de contactar al vendedor, (2) solicita fotos frontal, trasera y del tablero con un periódico actual o nota fechada visible, (3) inicia una videollamada en vivo de tres minutos para verificar ubicaciones de VIN en persona, (4) extrae un reporte de historial completo al momento de la inspección en persona, no una semana antes, y (5) solo completa el pago a través de la mesa de transferencias bancarias de tu banco o un cheque de caja, nunca un método de terceros introducido por el vendedor. Estandarizar la rutina atrapa aproximadamente el 95% de las estafas catalogadas en esta guía.",
    relatedHeading: "Lectura relacionada",
    related: [
      { href: "/stolen-vehicle-check", title: "Verificación de vehículo robado", desc: "Búsqueda respaldada por NICB de registros de robo y recuperación." },
      { href: "/salvage-title-check", title: "Verificación de título de salvamento", desc: "Detecta marcas de salvamento, reconstruido, chatarra e inundación." },
      { href: "/odometer-check", title: "Verificación de manipulación de odómetro", desc: "Valida cruzadamente cada lectura de odómetro de NMVTIS." },
      { href: "/accident-history-check", title: "Verificación de historial de accidentes", desc: "Gravedad del daño, despliegue de bolsas de aire y reparaciones estructurales." },
      { href: "/guides/used-car-buying-complete-guide", title: "Guía completa de compra de auto usado", desc: "Del presupuesto al papeleo, de principio a fin." },
      { href: "/guides/car-history-report-guide", title: "Guía del reporte de historial vehicular", desc: "Qué hay en un reporte y de dónde vienen los datos." },
      { href: "/blog", title: "Blog de CarCheckerVIN", desc: "Investigación fresca sobre tendencias y prevención de fraude." },
      { href: "/trust", title: "Confianza y fuentes de datos", desc: "Cómo obtenemos datos de NMVTIS, NICB y OEM." },
    ],
    continueHeading: "Continuar aprendiendo",
    continuePre: "¿Necesitas una mirada técnica más profunda a cualquier estafa específica? Comienza con la herramienta de ",
    continueLink1: "verificación VIN",
    continueMid1: ", pasa cualquier vehículo por nuestra ",
    continueLink2: "verificación de recompra por ley de limones",
    continueMid2: ", o explora la biblioteca completa de guías y herramientas en ",
    continueLink3: "/guías",
    continueSuffix: ".",
    faqHeading: "Preguntas frecuentes",
    bottomHeading: "Ejecuta una pantalla antifraude en cualquier VIN",
    bottomSub: "Marcas de título, registros de accidentes, continuidad del odómetro y verificaciones de vehículos robados \u2014 todo en un reporte.",
  },
} as const;

const FAQS_EN = [
  { question: "What is title washing and how do I avoid it?", answer: "Title washing is re-titling a branded vehicle \u2014 salvage, flood, junk, or rebuilt \u2014 in a state with weaker branding rules so the brand drops off the new clean-looking title. Avoid it by running a NMVTIS-backed history check, which aggregates title data from all 50 state DMVs and surfaces the original brand even when the current paper title hides it. Also confirm the title is issued in the seller's state of residence and watch for a chain that bounces between three or more states in a few years." },
  { question: "What is VIN cloning?", answer: "VIN cloning is copying a legitimate VIN from a clean, legally titled vehicle onto a stolen car of the same make and model. The stolen car then carries paperwork that looks valid until law enforcement traces the real VIN and recovers it \u2014 leaving the buyer with neither the car nor the money. Defend against it by physically matching the VIN across the dashboard plate, driver-door jamb sticker, and title, checking for tampered rivets or glue, and running a NICB stolen-vehicle check." },
  { question: "What is curbstoning?", answer: "Curbstoning is when an unlicensed dealer poses as a private seller to offload problem cars \u2014 often vehicles with branded titles, undisclosed damage, or rolled-back odometers \u2014 while dodging lemon-law obligations and consumer protections that apply to licensed dealers. Warning signs include a seller whose name does not match the title, multiple vehicles tied to the same phone number, and a refusal to meet at a registered business address. Always verify the seller's name matches the title exactly." },
  { question: "How do I spot odometer fraud?", answer: "Compare the displayed mileage against the vehicle's recorded history: every NMVTIS title transfer captures an odometer reading, so a current number lower than a prior record is conclusive rollback. Also check that wear matches the mileage \u2014 a polished steering wheel, worn brake pedal, or collapsed seat bolster on a car showing low miles does not add up. Cross-reference service stickers, oil-change records, and inspection stamps, which all carry mileage that can be verified against the dashboard reading." },
  { question: "How can a VIN check protect me from used-car fraud?", answer: "A VIN check decodes the vehicle's identity against NMVTIS title and brand records and NICB theft data, surfacing salvage, flood, lemon, and junk brands, odometer discontinuities, and stolen-vehicle reports that a paper title may hide. Because NMVTIS aggregates data from all 50 state DMVs, it defeats cross-state title washing. Always pull the report yourself at the time of inspection \u2014 never trust a printed report the seller hands you, which can be altered in seconds with a PDF editor." },
  { question: "What should I verify before paying for a used car?", answer: "Confirm the VIN matches across the dashboard plate, door-jamb sticker, engine-bay stamping, title, registration, and bill of sale. Pull a full NMVTIS-backed history report and run a NICB stolen-vehicle check. Validate that every recorded odometer reading trends upward. Get an independent pre-purchase inspection from a mechanic who is not the seller's shop. Inspect the title in person for watermarks, raised seals, and alterations. Pay only by traceable methods \u2014 bank wire or cashier's check, never gift cards or crypto." },
  { question: "What are common online car-buying scams?", answer: "The most common online scams share a shape: a price well below market, a seller unavailable for in-person viewing (citing deployment, illness, or relocation), and pressure to use a third-party escrow or shipping service that puts your money beyond reach. Watch for fake escrow sites, listings with stolen or stock photos, invoices using a real company's logo from the wrong domain, and requests for wire transfers, gift cards, or cryptocurrency. The core rule: if you cannot physically inspect the car and verify the VIN in person, do not send money." },
];

const FAQS_ES = [
  { question: "¿Qué es el lavado de título y cómo lo evito?", answer: "El lavado de título es volver a titular un vehículo marcado \u2014 salvamento, inundación, chatarra o reconstruido \u2014 en un estado con reglas de marca más débiles para que la marca desaparezca del nuevo título de apariencia limpia. Evítalo ejecutando una verificación de historial respaldada por NMVTIS, que agrega datos de título de los 50 DMV estatales y muestra la marca original incluso cuando el título físico actual la oculta. También confirma que el título sea emitido en el estado de residencia del vendedor y vigila una cadena que rebota entre tres o más estados en pocos años." },
  { question: "¿Qué es la clonación de VIN?", answer: "La clonación de VIN es copiar un VIN legítimo de un vehículo limpio y legalmente titulado en un auto robado de la misma marca y modelo. El auto robado entonces lleva papeleo que parece válido hasta que las autoridades rastrean el VIN real y lo recuperan \u2014 dejando al comprador sin auto ni dinero. Defiéndete verificando físicamente el VIN en la placa del tablero, calcomanía del marco de puerta del conductor y el título, revisando remaches o pegamento manipulados, y ejecutando una verificación de vehículo robado de NICB." },
  { question: "¿Qué es el curbstoning?", answer: "El curbstoning es cuando un concesionario sin licencia se hace pasar por vendedor particular para deshacerse de autos problemáticos \u2014 a menudo vehículos con títulos marcados, daños no divulgados u odómetros manipulados \u2014 evitando obligaciones de leyes de limones y protecciones al consumidor que aplican a concesionarios licenciados. Las señales de advertencia incluyen un vendedor cuyo nombre no coincide con el título, múltiples vehículos vinculados al mismo número de teléfono y rechazo a reunirse en una dirección comercial registrada. Siempre verifica que el nombre del vendedor coincida exactamente con el título." },
  { question: "¿Cómo detecto fraude de odómetro?", answer: "Compara el millaje mostrado contra el historial registrado del vehículo: cada transferencia de título de NMVTIS captura una lectura del odómetro, así que un número actual menor que un registro previo es manipulación concluyente. También verifica que el desgaste coincida con el millaje \u2014 un volante pulido, pedal de freno desgastado o refuerzo lateral del asiento colapsado en un auto que muestra pocas millas no cuadra. Cruza calcomanías de servicio, registros de cambio de aceite y sellos de inspección, que todos llevan millaje que puede verificarse contra la lectura del tablero." },
  { question: "¿Cómo puede una verificación VIN protegerme del fraude de autos usados?", answer: "Una verificación VIN decodifica la identidad del vehículo contra los registros de título y marca de NMVTIS y los datos de robo de NICB, mostrando marcas de salvamento, inundación, limón y chatarra, discontinuidades del odómetro y reportes de vehículos robados que un título físico puede ocultar. Como NMVTIS agrega datos de los 50 DMV estatales, derrota el lavado de título entre estados. Siempre extrae el reporte tú mismo al momento de la inspección \u2014 nunca confíes en un reporte impreso que el vendedor te entregue, que puede alterarse en segundos con un editor de PDF." },
  { question: "¿Qué debo verificar antes de pagar por un auto usado?", answer: "Confirma que el VIN coincida en la placa del tablero, calcomanía del marco de puerta, estampación del compartimiento del motor, título, registro y factura de venta. Extrae un reporte de historial completo respaldado por NMVTIS y ejecuta una verificación de vehículo robado de NICB. Valida que cada lectura del odómetro registrada tienda hacia arriba. Obtén una inspección independiente previa a la compra de un mecánico que no sea del taller del vendedor. Inspecciona el título en persona por marcas de agua, sellos en relieve y alteraciones. Paga solo por métodos rastreables \u2014 transferencia bancaria o cheque de caja, nunca tarjetas de regalo o criptomonedas." },
  { question: "¿Cuáles son las estafas comunes de compra de autos en línea?", answer: "Las estafas en línea más comunes comparten una forma: un precio muy por debajo del mercado, un vendedor no disponible para visualización en persona (citando despliegue militar, enfermedad o reubicación) y presión para usar un escrow de terceros o servicio de envío que pone tu dinero fuera de alcance. Vigila sitios falsos de escrow, anuncios con fotos robadas o de stock, facturas que usan el logo de una empresa real desde el dominio equivocado, y solicitudes de transferencias bancarias, tarjetas de regalo o criptomonedas. La regla central: si no puedes inspeccionar físicamente el auto y verificar el VIN en persona, no envíes dinero." },
];

interface Props {
  locale: Locale;
}

export default function GuideVehicleFraudPreventionBody({ locale }: Props) {
  const c = COPY[locale];
  const faqs = locale === "es" ? FAQS_ES : FAQS_EN;
  const link = (en: string) => (locale === "es" ? `/es${en}` : en);

  return (
    <>
      <article className="pt-28 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: c.crumbs.home, href: locale === "es" ? "/es" : "/" },
              { label: c.crumbs.guides, href: link("/guides") },
              { label: c.crumbs.current },
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
              {c.verifyBoxTitle}
            </h2>
            <p className="text-sm text-slate-600 mb-4">
              {c.verifyBoxSub}
            </p>
            <VinSearchForm size="sm" />
          </div>

          <nav
            aria-label="Table of contents"
            className="mt-10 p-6 rounded-2xl border border-slate-200 bg-white"
          >
            <h2 className="text-sm font-bold uppercase tracking-wide text-slate-700 mb-3">
              {c.tocTitle}
            </h2>
            <ol className="space-y-2 text-slate-700 text-sm list-decimal list-inside">
              {c.tocItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-primary-600 hover:underline font-medium"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {/* Section 1 */}
          <h2
            id="scope"
            className="mt-12 text-2xl font-bold text-slate-900 scroll-mt-24 flex items-center gap-2"
          >
            <ShieldAlert className="w-6 h-6 text-primary-600" /> {c.s1Heading}
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.s1p1}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.s1p2}</p>

          {/* Section 2 */}
          <h2
            id="title-fraud"
            className="mt-12 text-2xl font-bold text-slate-900 scroll-mt-24 flex items-center gap-2"
          >
            <Tag className="w-6 h-6 text-primary-600" /> {c.s2Heading}
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            {c.s2p1Pre}
            <strong>{c.s2p1Bold}</strong>
            {c.s2p1Mid}
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            {c.s2p2Pre}
            <Link
              href={link("/salvage-title-check")}
              className="text-primary-600 hover:underline font-medium"
            >
              {c.s2p2Link}
            </Link>
            {c.s2p2Suffix}
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.s2p3}</p>

          {/* Section 3 */}
          <h2
            id="odometer"
            className="mt-12 text-2xl font-bold text-slate-900 scroll-mt-24 flex items-center gap-2"
          >
            <Gauge className="w-6 h-6 text-primary-600" /> {c.s3Heading}
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.s3p1}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.s3p2}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            {c.s3p3Pre}
            <Link
              href={link("/odometer-check")}
              className="text-primary-600 hover:underline font-medium"
            >
              {c.s3p3Link}
            </Link>
            {c.s3p3Suffix}
          </p>

          {/* Section 4 */}
          <h2
            id="salvage"
            className="mt-12 text-2xl font-bold text-slate-900 scroll-mt-24 flex items-center gap-2"
          >
            <Droplets className="w-6 h-6 text-primary-600" /> {c.s4Heading}
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.s4p1}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.s4p2}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            {c.s4p3Pre}
            <Link
              href={link("/accident-history-check")}
              className="text-primary-600 hover:underline font-medium"
            >
              {c.s4p3Link}
            </Link>
            {c.s4p3Suffix}
          </p>

          {/* Section 5 */}
          <h2
            id="vin-cloning"
            className="mt-12 text-2xl font-bold text-slate-900 scroll-mt-24 flex items-center gap-2"
          >
            <ScanLine className="w-6 h-6 text-primary-600" /> {c.s5Heading}
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.s5p1}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.s5p2}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            {c.s5p3Pre}
            <Link
              href={link("/stolen-vehicle-check")}
              className="text-primary-600 hover:underline font-medium"
            >
              {c.s5p3Link}
            </Link>
            {c.s5p3Suffix}
          </p>

          {/* Section 6 */}
          <h2
            id="dealer-scams"
            className="mt-12 text-2xl font-bold text-slate-900 scroll-mt-24 flex items-center gap-2"
          >
            <UserX className="w-6 h-6 text-primary-600" /> {c.s6Heading}
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.s6Intro}</p>
          <ul className="mt-4 space-y-2 text-slate-600 list-disc list-inside">
            {c.s6Bullets.map((b) => (
              <li key={b.bold}>
                <strong>{b.bold}</strong>
                {b.body}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-slate-600 leading-relaxed">
            {c.s6OutroPre}
            <Link
              href={link("/trust")}
              className="text-primary-600 hover:underline font-medium"
            >
              {c.s6OutroLink}
            </Link>
            {c.s6OutroSuffix}
          </p>

          {/* Section 7 */}
          <h2
            id="online-scams"
            className="mt-12 text-2xl font-bold text-slate-900 scroll-mt-24 flex items-center gap-2"
          >
            <Globe className="w-6 h-6 text-primary-600" /> {c.s7Heading}
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.s7Intro}</p>
          <ul className="mt-4 space-y-2 text-slate-600 list-disc list-inside">
            {c.s7Bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          <p className="mt-4 text-slate-600 leading-relaxed">{c.s7Outro}</p>

          {/* Section 8 */}
          <h2
            id="nicb"
            className="mt-12 text-2xl font-bold text-slate-900 scroll-mt-24 flex items-center gap-2"
          >
            <KeyRound className="w-6 h-6 text-primary-600" /> {c.s8Heading}
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            {c.s8p1Pre}
            <strong>{c.s8p1B1}</strong>
            {c.s8p1Mid1}
            <strong>{c.s8p1B2}</strong>
            {c.s8p1Suffix}
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.s8p2}</p>

          {/* Section 9 */}
          <h2
            id="protocol"
            className="mt-12 text-2xl font-bold text-slate-900 scroll-mt-24 flex items-center gap-2"
          >
            <CheckCircle2 className="w-6 h-6 text-emerald-500" /> {c.s9Heading}
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.s9Intro}</p>
          <ol className="mt-4 space-y-3 text-slate-600 list-decimal list-inside">
            {c.s9Steps.map((s) => (
              <li key={s.bold}>
                <strong>{s.bold}</strong>
                {s.body}
              </li>
            ))}
          </ol>
          <p className="mt-4 text-slate-600 leading-relaxed">{c.s9Outro}</p>

          {/* Section 10 */}
          <h2
            id="after-fraud"
            className="mt-12 text-2xl font-bold text-slate-900 scroll-mt-24 flex items-center gap-2"
          >
            <AlertTriangle className="w-6 h-6 text-amber-500" /> {c.s10Heading}
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.s10Intro}</p>
          <ul className="mt-4 space-y-2 text-slate-600 list-disc list-inside">
            {c.s10Bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>

          {/* Deep dive: emerging fraud */}
          <h2 className="mt-12 text-2xl font-bold text-slate-900 scroll-mt-24">
            {c.emergingHeading}
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            {c.emergingIntro}
          </p>

          <h3 className="mt-6 text-xl font-bold text-slate-900">
            {c.em1Heading}
          </h3>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.em1}</p>

          <h3 className="mt-8 text-xl font-bold text-slate-900">
            {c.em2Heading}
          </h3>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.em2}</p>

          <h3 className="mt-8 text-xl font-bold text-slate-900">
            {c.em3Heading}
          </h3>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.em3}</p>

          <h3 className="mt-8 text-xl font-bold text-slate-900">
            {c.em4Heading}
          </h3>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.em4}</p>

          <h3 className="mt-8 text-xl font-bold text-slate-900">
            {c.em5Heading}
          </h3>
          <p className="mt-3 text-slate-600 leading-relaxed">
            {c.em5Pre}
            <Link
              href={link("/vin-check")}
              className="text-primary-600 hover:underline font-medium"
            >
              {c.em5Link}
            </Link>
            {c.em5Suffix}
          </p>

          <h3 className="mt-8 text-xl font-bold text-slate-900">
            {c.em6Heading}
          </h3>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.em6p1}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.em6p2}</p>

          <h3 className="mt-8 text-xl font-bold text-slate-900">
            {c.em7Heading}
          </h3>
          <p className="mt-3 text-slate-600 leading-relaxed">
            {c.em7Pre}
            <Link
              href={link("/accident-history-check")}
              className="text-primary-600 hover:underline font-medium"
            >
              {c.em7Link}
            </Link>
            {c.em7Suffix}
          </p>

          <h3 className="mt-8 text-xl font-bold text-slate-900">
            {c.em8Heading}
          </h3>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.em8}</p>

          {/* Related reading */}
          <h2 className="mt-14 text-2xl font-bold text-slate-900">
            {c.relatedHeading}
          </h2>
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

          <h2 className="mt-14 text-2xl font-bold text-slate-900">
            {c.continueHeading}
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            {c.continuePre}
            <Link
              href={link("/vin-check")}
              className="text-primary-600 hover:underline font-medium"
            >
              {c.continueLink1}
            </Link>
            {c.continueMid1}
            <Link
              href={link("/lemon-check")}
              className="text-primary-600 hover:underline font-medium"
            >
              {c.continueLink2}
            </Link>
            {c.continueMid2}
            <Link
              href={link("/guides")}
              className="text-primary-600 hover:underline font-medium"
            >
              {c.continueLink3}
            </Link>
            {c.continueSuffix}
          </p>

          {/* FAQ */}
          <h2 className="mt-14 text-2xl font-bold text-slate-900">
            {c.faqHeading}
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
                <p className="mt-3 text-slate-600 leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </article>

      <section className="py-14 bg-slate-50">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            {c.bottomHeading}
          </h2>
          <p className="text-slate-700 mb-6">{c.bottomSub}</p>
          <VinSearchForm size="sm" />
        </div>
      </section>
    </>
  );
}

export { FAQS_EN, FAQS_ES };
