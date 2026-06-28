"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  Armchair,
  Car,
  Check,
  CheckCircle2,
  ChevronDown,
  ClipboardCopy,
  ClipboardList,
  Disc,
  FileText,
  Gauge,
  Minus,
  Printer,
  RefreshCcw,
  Settings,
  ShieldAlert,
  Wrench,
  X,
  XCircle,
  Zap,
} from "lucide-react";
import {
  inspectionChecklist,
  type ChecklistSection,
  type ChecklistSeverity,
} from "@/lib/inspection-checklist";

type Verdict = "Pass" | "Fail" | "Skip";

const STORAGE_KEY = "vcp_inspection_checklist_v1";

interface VehicleInfo {
  year: string;
  make: string;
  model: string;
  vin: string;
  mileage: string;
  askingPrice: string;
  sellerName: string;
}

const EMPTY_VEHICLE: VehicleInfo = {
  year: "",
  make: "",
  model: "",
  vin: "",
  mileage: "",
  askingPrice: "",
  sellerName: "",
};

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Car,
  Wrench,
  Settings,
  Armchair,
  Gauge,
  FileText,
  Disc,
  Zap,
};

const TOTAL_ITEMS = inspectionChecklist.reduce((s, sec) => s + sec.items.length, 0);

const COPY = {
  en: {
    severityLabel: { "deal-breaker": "Deal-breaker", major: "Major", minor: "Minor", info: "Info" } as Record<ChecklistSeverity, string>,
    vehicleHeading: "Vehicle Being Inspected",
    year: "Year",
    make: "Make",
    model: "Model",
    vin: "VIN",
    vinPlaceholder: "17-character VIN",
    mileage: "Mileage",
    askingPrice: "Asking price",
    sellerName: "Seller name",
    sellerPlaceholder: "John Doe (private party / dealer)",
    itemsReviewed: (a: number, t: number) => `${a} / ${t} items reviewed`,
    redFlag: (n: number) => `${n} red flag${n === 1 ? "" : "s"}`,
    generateReport: "Generate Report",
    reset: "Reset",
    resetConfirm: "Clear all answers and vehicle info? This can't be undone.",
    failedShort: (n: number) => `${n} failed`,
    pass: "Pass",
    fail: "Fail",
    skip: "Skip",
    redFlagLabel: "Red flag:",
    inspectionReport: "Inspection Report",
    closeReport: "Close report",
    defaultTitleLine: "Used vehicle inspection",
    inspectedOn: "Inspected on",
    seller: "Seller",
    verdictWalkAway: "Walk away or substantial price reduction needed",
    verdictWalkAwayDealBreaker: "One or more deal-breakers were marked Fail. These issues compromise safety, legality, or have repair costs that exceed reasonable depreciation.",
    verdictWalkAwayMajors: "Multiple major issues were flagged. Combined repair costs likely exceed $2,500. Negotiate hard or move on.",
    verdictNegotiate: "Negotiate or get a mechanic PPI",
    verdictNegotiateDetail: "Notable issues found. Get a written repair estimate, deduct from asking price, and consider a paid mechanic pre-purchase inspection.",
    verdictNotStarted: "Inspection not started",
    verdictNotStartedDetail: "Walk through every section and mark Pass / Fail / Skip to get a verdict.",
    verdictSolid: "Looks solid — proceed with confidence",
    verdictSolidDetail: "No deal-breakers and minimal major issues. Run a VIN history check to confirm the title is clean before paying.",
    scoreHeading: "Score",
    scorePassed: "Passed",
    scoreFailed: "Failed",
    scoreSkipped: "Skipped",
    scoreSummary: (a: number, t: number) => `${a} of ${t} items reviewed.`,
    severityHeading: "Failed items by severity",
    sevDealBreakers: "Deal-breakers",
    sevMajor: "Major",
    sevMinor: "Minor",
    sevInfo: "Info",
    dealBreakerCalloutTitle: (n: number) => `${n} deal-breaker${n === 1 ? "" : "s"} found`,
    dealBreakerCalloutBody: "Deal-breaker findings compromise safety, legality, or carry repair costs that exceed reasonable depreciation. The recommendation is to walk away unless the seller drops the price by enough to cover the worst-case repair, plus a margin for unknowns.",
    failedItemsHeading: "Failed items",
    failedItemsNone: "No items were marked Fail. Either the vehicle is in great shape, or you have items still to review.",
    footerNote: "Generated with CarCheckerVIN's free pre-purchase inspection checklist. Not a substitute for a licensed mechanic's pre-purchase inspection.",
    copyAsMarkdown: "Copy as Markdown",
    copied: "Copied!",
    printReport: "Print Report",
    mdGenericTitle: "Used vehicle inspection",
    mdVin: "VIN",
    mdMileage: "Mileage",
    mdAskingPrice: "Asking price",
    mdSeller: "Seller",
    mdScore: "Score",
    mdPassed: "Passed",
    mdFailed: "Failed",
    mdSkipped: "Skipped",
    mdTotalReviewed: "Total reviewed",
    mdSeverityBreakdown: "Severity breakdown (failed items)",
    mdDealBreakers: "Deal-breakers",
    mdMajor: "Major",
    mdMinor: "Minor",
    mdInfo: "Info",
    mdVerdictHeading: "Buyer's verdict",
    mdFailedItems: "Failed items",
    mdNoFailed: "No failed items",
    mdFooter: "_Generated with CarCheckerVIN's free pre-purchase inspection checklist._",
  },
  es: {
    severityLabel: { "deal-breaker": "Deal-breaker", major: "Mayor", minor: "Menor", info: "Info" } as Record<ChecklistSeverity, string>,
    vehicleHeading: "Vehículo siendo inspeccionado",
    year: "Año",
    make: "Marca",
    model: "Modelo",
    vin: "VIN",
    vinPlaceholder: "VIN de 17 caracteres",
    mileage: "Kilometraje",
    askingPrice: "Precio pedido",
    sellerName: "Nombre del vendedor",
    sellerPlaceholder: "Juan Pérez (vendedor particular / agencia)",
    itemsReviewed: (a: number, t: number) => `${a} / ${t} elementos revisados`,
    redFlag: (n: number) => `${n} señal${n === 1 ? "" : "es"} de alerta`,
    generateReport: "Generar reporte",
    reset: "Reiniciar",
    resetConfirm: "¿Borrar todas las respuestas y la info del vehículo? Esto no se puede deshacer.",
    failedShort: (n: number) => `${n} fallidos`,
    pass: "Pasa",
    fail: "Falla",
    skip: "Omitir",
    redFlagLabel: "Señal de alerta:",
    inspectionReport: "Reporte de inspección",
    closeReport: "Cerrar reporte",
    defaultTitleLine: "Inspección de vehículo usado",
    inspectedOn: "Inspeccionado el",
    seller: "Vendedor",
    verdictWalkAway: "Aléjate o requiere reducción de precio sustancial",
    verdictWalkAwayDealBreaker: "Uno o más deal-breakers fueron marcados como Falla. Estos problemas comprometen la seguridad, la legalidad, o tienen costos de reparación que exceden la depreciación razonable.",
    verdictWalkAwayMajors: "Se señalaron múltiples problemas mayores. Los costos combinados de reparación probablemente excedan $2,500. Negocia fuerte o sigue adelante.",
    verdictNegotiate: "Negocia o consigue una PPI con mecánico",
    verdictNegotiateDetail: "Se encontraron problemas notables. Consigue un estimado escrito de reparación, dedúcelo del precio pedido, y considera una inspección antes de la compra pagada con mecánico.",
    verdictNotStarted: "Inspección no iniciada",
    verdictNotStartedDetail: "Recorre cada sección y marca Pasa / Falla / Omitir para obtener un veredicto.",
    verdictSolid: "Se ve sólido — procede con confianza",
    verdictSolidDetail: "Sin deal-breakers y problemas mayores mínimos. Haz una verificación de historial VIN para confirmar que el título está limpio antes de pagar.",
    scoreHeading: "Puntuación",
    scorePassed: "Pasados",
    scoreFailed: "Fallidos",
    scoreSkipped: "Omitidos",
    scoreSummary: (a: number, t: number) => `${a} de ${t} elementos revisados.`,
    severityHeading: "Elementos fallidos por severidad",
    sevDealBreakers: "Deal-breakers",
    sevMajor: "Mayor",
    sevMinor: "Menor",
    sevInfo: "Info",
    dealBreakerCalloutTitle: (n: number) => `${n} deal-breaker${n === 1 ? "" : "s"} encontrado${n === 1 ? "" : "s"}`,
    dealBreakerCalloutBody: "Los hallazgos deal-breaker comprometen la seguridad, la legalidad, o llevan costos de reparación que exceden la depreciación razonable. La recomendación es alejarte a menos que el vendedor baje el precio lo suficiente para cubrir la peor reparación, más un margen para imprevistos.",
    failedItemsHeading: "Elementos fallidos",
    failedItemsNone: "Ningún elemento fue marcado como Falla. O el vehículo está en gran forma, o tienes elementos pendientes por revisar.",
    footerNote: "Generado con la lista de inspección antes de la compra gratis de CarCheckerVIN. No sustituye la inspección antes de la compra de un mecánico licenciado.",
    copyAsMarkdown: "Copiar como Markdown",
    copied: "¡Copiado!",
    printReport: "Imprimir reporte",
    mdGenericTitle: "Inspección de vehículo usado",
    mdVin: "VIN",
    mdMileage: "Kilometraje",
    mdAskingPrice: "Precio pedido",
    mdSeller: "Vendedor",
    mdScore: "Puntuación",
    mdPassed: "Pasados",
    mdFailed: "Fallidos",
    mdSkipped: "Omitidos",
    mdTotalReviewed: "Total revisados",
    mdSeverityBreakdown: "Desglose por severidad (elementos fallidos)",
    mdDealBreakers: "Deal-breakers",
    mdMajor: "Mayor",
    mdMinor: "Menor",
    mdInfo: "Info",
    mdVerdictHeading: "Veredicto del comprador",
    mdFailedItems: "Elementos fallidos",
    mdNoFailed: "Sin elementos fallidos",
    mdFooter: "_Generado con la lista de inspección antes de la compra gratis de CarCheckerVIN._",
  },
  fr: {
    severityLabel: { "deal-breaker": "R\u00e9dhibitoire", major: "Majeur", minor: "Mineur", info: "Info" } as Record<ChecklistSeverity, string>,
    vehicleHeading: "V\u00e9hicule inspect\u00e9",
    year: "Ann\u00e9e",
    make: "Marque",
    model: "Mod\u00e8le",
    vin: "VIN",
    vinPlaceholder: "VIN de 17 caract\u00e8res",
    mileage: "Kilom\u00e9trage",
    askingPrice: "Prix demand\u00e9",
    sellerName: "Nom du vendeur",
    sellerPlaceholder: "Jean Dupont (particulier / concessionnaire)",
    itemsReviewed: (a: number, t: number) => `${a} / ${t} \u00e9l\u00e9ments revus`,
    redFlag: (n: number) => `${n} signal${n === 1 ? "" : "s"} d'alerte`,
    generateReport: "G\u00e9n\u00e9rer le rapport",
    reset: "R\u00e9initialiser",
    resetConfirm: "Effacer toutes les r\u00e9ponses et les infos du v\u00e9hicule\u00a0? C'est irr\u00e9versible.",
    failedShort: (n: number) => `${n} \u00e9chec${n === 1 ? "" : "s"}`,
    pass: "Pass\u00e9",
    fail: "\u00c9chec",
    skip: "Passer",
    redFlagLabel: "Signal d'alerte\u00a0:",
    inspectionReport: "Rapport d'inspection",
    closeReport: "Fermer le rapport",
    defaultTitleLine: "Inspection de v\u00e9hicule d'occasion",
    inspectedOn: "Inspect\u00e9 le",
    seller: "Vendeur",
    verdictWalkAway: "Passe ton chemin ou exige une grosse baisse de prix",
    verdictWalkAwayDealBreaker: "Un ou plusieurs points r\u00e9dhibitoires ont \u00e9t\u00e9 marqu\u00e9s \u00c9chec. Ces probl\u00e8mes compromettent la s\u00e9curit\u00e9, la l\u00e9galit\u00e9, ou entra\u00eenent des co\u00fbts de r\u00e9paration sup\u00e9rieurs \u00e0 une d\u00e9pr\u00e9ciation raisonnable.",
    verdictWalkAwayMajors: "Plusieurs probl\u00e8mes majeurs ont \u00e9t\u00e9 signal\u00e9s. Le co\u00fbt cumul\u00e9 des r\u00e9parations d\u00e9passe probablement 2\u00a0500\u00a0$. N\u00e9gocie fort ou passe ton chemin.",
    verdictNegotiate: "N\u00e9gocie ou demande une PPI m\u00e9canique",
    verdictNegotiateDetail: "Probl\u00e8mes notables trouv\u00e9s. Obtiens un devis de r\u00e9paration \u00e9crit, d\u00e9duis-le du prix demand\u00e9 et envisage une inspection pr\u00e9-achat pay\u00e9e par un m\u00e9canicien.",
    verdictNotStarted: "Inspection non commenc\u00e9e",
    verdictNotStartedDetail: "Parcours chaque section et marque Pass\u00e9 / \u00c9chec / Passer pour obtenir un verdict.",
    verdictSolid: "Semble solide \u2014 avance avec confiance",
    verdictSolidDetail: "Aucun point r\u00e9dhibitoire et tr\u00e8s peu de probl\u00e8mes majeurs. Fais une v\u00e9rification d'historique VIN pour confirmer que le titre est propre avant de payer.",
    scoreHeading: "Score",
    scorePassed: "Pass\u00e9s",
    scoreFailed: "\u00c9chou\u00e9s",
    scoreSkipped: "Pass\u00e9s outre",
    scoreSummary: (a: number, t: number) => `${a} sur ${t} \u00e9l\u00e9ments revus.`,
    severityHeading: "\u00c9l\u00e9ments \u00e9chou\u00e9s par s\u00e9v\u00e9rit\u00e9",
    sevDealBreakers: "R\u00e9dhibitoires",
    sevMajor: "Majeur",
    sevMinor: "Mineur",
    sevInfo: "Info",
    dealBreakerCalloutTitle: (n: number) => `${n} point${n === 1 ? "" : "s"} r\u00e9dhibitoire${n === 1 ? "" : "s"} trouv\u00e9${n === 1 ? "" : "s"}`,
    dealBreakerCalloutBody: "Les points r\u00e9dhibitoires compromettent la s\u00e9curit\u00e9, la l\u00e9galit\u00e9 ou entra\u00eenent des co\u00fbts de r\u00e9paration sup\u00e9rieurs \u00e0 une d\u00e9pr\u00e9ciation raisonnable. La recommandation est de passer ton chemin sauf si le vendeur baisse le prix suffisamment pour couvrir la pire r\u00e9paration, plus une marge pour les inconnus.",
    failedItemsHeading: "\u00c9l\u00e9ments \u00e9chou\u00e9s",
    failedItemsNone: "Aucun \u00e9l\u00e9ment marqu\u00e9 \u00c9chec. Soit le v\u00e9hicule est en pleine forme, soit il te reste des \u00e9l\u00e9ments \u00e0 examiner.",
    footerNote: "G\u00e9n\u00e9r\u00e9 avec la liste d'inspection pr\u00e9-achat gratuite de CarCheckerVIN. Ne remplace pas une inspection pr\u00e9-achat par un m\u00e9canicien agr\u00e9\u00e9.",
    copyAsMarkdown: "Copier en Markdown",
    copied: "Copi\u00e9\u00a0!",
    printReport: "Imprimer le rapport",
    mdGenericTitle: "Inspection de v\u00e9hicule d'occasion",
    mdVin: "VIN",
    mdMileage: "Kilom\u00e9trage",
    mdAskingPrice: "Prix demand\u00e9",
    mdSeller: "Vendeur",
    mdScore: "Score",
    mdPassed: "Pass\u00e9s",
    mdFailed: "\u00c9chou\u00e9s",
    mdSkipped: "Pass\u00e9s outre",
    mdTotalReviewed: "Total revus",
    mdSeverityBreakdown: "R\u00e9partition par s\u00e9v\u00e9rit\u00e9 (\u00e9l\u00e9ments \u00e9chou\u00e9s)",
    mdDealBreakers: "R\u00e9dhibitoires",
    mdMajor: "Majeur",
    mdMinor: "Mineur",
    mdInfo: "Info",
    mdVerdictHeading: "Verdict de l'acheteur",
    mdFailedItems: "\u00c9l\u00e9ments \u00e9chou\u00e9s",
    mdNoFailed: "Aucun \u00e9l\u00e9ment \u00e9chou\u00e9",
    mdFooter: "_G\u00e9n\u00e9r\u00e9 avec la liste d'inspection pr\u00e9-achat gratuite de CarCheckerVIN._",
  },
} as const;

const SEVERITY_PILL: Record<ChecklistSeverity, string> = {
  "deal-breaker": "bg-red-100 text-red-800 border-red-200",
  major: "bg-orange-100 text-orange-800 border-orange-200",
  minor: "bg-amber-100 text-amber-800 border-amber-200",
  info: "bg-slate-100 text-slate-700 border-slate-200",
};

const FAIL_BG: Record<ChecklistSeverity, string> = {
  "deal-breaker": "bg-red-50 border-red-300",
  major: "bg-orange-50 border-orange-300",
  minor: "bg-amber-50 border-amber-300",
  info: "bg-slate-50 border-slate-300",
};

/* ─── Translations for section + item content (keyed by id) ─────── */

interface SectionStrings { title: string; description: string; }
interface ItemStrings { question: string; helpText?: string; redFlagIfFailed: string; }

const SECTION_T: Partial<Record<"en" | "es" | "fr", Record<string, SectionStrings>>> = {
  en: {
    exterior: { title: "Walk-Around Exterior", description: "Body, paint, glass, and tires. Look for accident-repair signs, mismatched panels, and weather damage in good daylight." },
    underneath: { title: "Underneath the Vehicle", description: "The frame, exhaust, and suspension tell the truth about a car's life. Bring a flashlight and don't skip this section." },
    "engine-bay": { title: "Engine Bay", description: "Pop the hood with the engine cold. Many of the worst problems are visible without ever turning a wrench." },
    interior: { title: "Interior", description: "Wear patterns, smells, and electronics reveal the vehicle's real story — sometimes more than the seller does." },
    "test-drive": { title: "Test Drive", description: "Drive at least 20 minutes including stop-and-go and highway speeds. Cold-start the engine yourself if possible." },
    documents: { title: "Documents", description: "Paperwork is where fraud usually hides. Verify every document before any money changes hands." },
    "tires-brakes": { title: "Tires & Brakes", description: "These are the cheapest things to verify and the most expensive to replace if you guess wrong." },
    "hvac-electronics": { title: "HVAC & Electronics", description: "Electrical gremlins are the most common 'I didn't know about that' surprise. Test every switch, light, and accessory." },
  },
  es: {
    exterior: { title: "Recorrido exterior", description: "Carrocería, pintura, vidrios y llantas. Busca señales de reparación de accidentes, paneles disparejos y daño por clima con buena luz de día." },
    underneath: { title: "Bajo el vehículo", description: "El chasis, el escape y la suspensión cuentan la verdad sobre la vida del auto. Trae una linterna y no te saltes esta sección." },
    "engine-bay": { title: "Bajo el cofre", description: "Abre el cofre con el motor frío. Muchos de los peores problemas son visibles sin tocar una llave." },
    interior: { title: "Interior", description: "Los patrones de desgaste, olores y electrónicos revelan la historia real del vehículo — a veces más que el vendedor." },
    "test-drive": { title: "Prueba de manejo", description: "Maneja al menos 20 minutos incluyendo tráfico de pare-y-arranca y velocidades de autopista. Arranca el motor en frío tú mismo si es posible." },
    documents: { title: "Documentos", description: "El papeleo es donde usualmente se esconde el fraude. Verifica cada documento antes de que cambie de manos cualquier dinero." },
    "tires-brakes": { title: "Llantas y frenos", description: "Estas son las cosas más baratas de verificar y las más costosas de reemplazar si adivinas mal." },
    "hvac-electronics": { title: "A/C, calefacción y electrónicos", description: "Los gremlins eléctricos son la sorpresa más común de 'no sabía de eso'. Prueba cada interruptor, luz y accesorio." },
  },
};

const ITEM_T: Partial<Record<"en" | "es" | "fr", Record<string, ItemStrings>>> = {
  en: {
    "ext-panel-gaps": { question: "Are all body panel gaps even and consistent?", helpText: "Compare gaps on doors, hood, trunk, and fenders. Uneven gaps usually mean a prior collision or poor repair.", redFlagIfFailed: "Inconsistent panel gaps strongly suggest prior collision repair — request the full accident history before negotiating." },
    "ext-paint-match": { question: "Does the paint color and texture match across all panels?", helpText: "Look at panels in sunlight from multiple angles. Orange-peel texture differences or color shifts indicate respray.", redFlagIfFailed: "Paint mismatch indicates a respray — usually cosmetic, but could mask body filler from a prior accident." },
    "ext-rust": { question: "Is the body free of rust on rocker panels, wheel arches, and door bottoms?", helpText: "Surface rust is fixable; bubbling or flaking paint indicates rust eating from underneath.", redFlagIfFailed: "Active rust spreads quickly and can total a vehicle structurally. Budget for body work or walk away." },
    "ext-dents": { question: "Are there no major dents, dings, or hail damage?", redFlagIfFailed: "Hail or large dents reduce resale value — use as negotiation leverage." },
    "ext-accident-signs": { question: "Is there no evidence of accident repair (overspray, mismatched bolts, taped seams)?", helpText: "Look under the hood at the inner fenders and around door jambs for overspray. Check that bolt heads aren't scratched (sign of removal).", redFlagIfFailed: "Hidden accident repair is a major red flag — pull the full vehicle history and consider a frame inspection." },
    "ext-headlights": { question: "Are the headlights clear and free of heavy yellowing or moisture?", redFlagIfFailed: "Cloudy headlights reduce visibility at night and indicate sun-baked or older lenses." },
    "ext-tires-match": { question: "Are all 4 tires the same brand, size, and tread depth?", helpText: "Mismatched tires can indicate uneven wear from suspension/alignment problems, or a cheap owner who never aligned them.", redFlagIfFailed: "Mismatched tires often signal alignment or suspension issues. Test for steering pull on the test drive." },
    "ext-windshield": { question: "Is the windshield free of cracks, chips, or pitting?", redFlagIfFailed: "A cracked windshield is a guaranteed fail at inspection — factor $300–$1,200 into your offer." },
    "ext-glass-scratches": { question: "Are all windows free of deep scratches and proper tint (legal where required)?", redFlagIfFailed: "Window damage rarely affects the deal but check local tint laws." },
    "und-oil-leak": { question: "Is the underside free of fresh oil leaks?", helpText: "Wet, dark spots near the engine pan or transmission are active leaks. Old, dry residue is less urgent.", redFlagIfFailed: "Active oil leaks lead to expensive seal/gasket repairs ($500–$3,000+). Verify before buying." },
    "und-coolant-leak": { question: "Is there no green, orange, or pink coolant residue under the vehicle?", redFlagIfFailed: "Coolant leaks can hide head gasket failure or radiator damage — pressure test before purchase." },
    "und-trans-leak": { question: "Are there no red transmission fluid leaks?", redFlagIfFailed: "Transmission leaks can lead to $3,000–$5,000 rebuild costs if ignored. Walk or get a discount." },
    "und-exhaust": { question: "Is the exhaust free of heavy rust, holes, or loose hangers?", redFlagIfFailed: "Exhaust replacement runs $400–$1,500. Listen for rattles or loud drone on test drive." },
    "und-frame-straight": { question: "Is the frame/chassis straight, with no obvious bends or kinks?", redFlagIfFailed: "DEAL BREAKER: A bent frame means the car was in a serious accident. Walk away unless heavily discounted with an engineer's report." },
    "und-frame-welds": { question: "Is the frame free of fresh welds, cut-and-replaced sections, or bolt-on repair plates?", helpText: "Factory welds are uniform and spot-welded. Wavy bead welds indicate aftermarket repair.", redFlagIfFailed: "DEAL BREAKER: Aftermarket frame welds indicate severe collision repair. Walk away — these vehicles are unsafe and uninsurable in many cases." },
    "und-suspension-bushings": { question: "Are suspension bushings firm and free of cracks?", redFlagIfFailed: "Worn bushings cause clunks and uneven tire wear. $300–$800 to replace." },
    "und-cv-boots": { question: "Are the CV boots intact (no rips or grease slung around)?", redFlagIfFailed: "Torn CV boots let water and dirt destroy the joint — $400–$900 per axle if not caught early." },
    "und-driveshaft": { question: "Is the drive shaft free of rust, dents, and worn U-joints (RWD/AWD)?", redFlagIfFailed: "Bad U-joints cause clunking when shifting between drive and reverse." },
    "eng-oil-cap": { question: "Is the underside of the oil cap free of milky/mayonnaise-colored residue?", helpText: "A creamy white-tan film under the oil cap usually means coolant is mixing with oil — head gasket failure.", redFlagIfFailed: "DEAL BREAKER: Mayonnaise on the oil cap = head gasket failure or worse ($2,500–$6,000 repair). Walk away." },
    "eng-coolant-color": { question: "Is the coolant the correct color (green/orange/pink) and free of oil sheen?", redFlagIfFailed: "Rusty or oily coolant indicates internal engine problems or neglect. Get a compression test before buying." },
    "eng-belts-hoses": { question: "Are belts and hoses free of cracks, glazing, or soft spots?", redFlagIfFailed: "Old belts/hoses fail without warning. Budget $200–$600 for replacement." },
    "eng-battery-age": { question: "Is the battery less than 4 years old and free of heavy corrosion?", helpText: "Look for the date sticker on the battery. Most last 4–6 years.", redFlagIfFailed: "Battery near end of life — factor in $150–$300 for replacement." },
    "eng-mismatched-bolts": { question: "Are all engine bay bolts factory-original (no replaced or scratched bolt heads)?", helpText: "Replaced bolts on radiator support, fender, or core support indicate prior front-end collision repair.", redFlagIfFailed: "DEAL BREAKER: Mismatched bolts on structural components signal undisclosed major collision. Walk unless history matches." },
    "eng-recent-paint": { question: "Is the engine and engine bay free of recent overspray or fresh paint?", redFlagIfFailed: "Fresh paint on the engine often hides leak repairs or accident damage. Be very skeptical." },
    "eng-dipstick": { question: "Is the oil on the dipstick clean amber-to-brown (not black, gritty, or milky)?", redFlagIfFailed: "Black or gritty oil signals neglected maintenance. Milky oil = head gasket failure. Both are major concerns." },
    "eng-trans-fluid": { question: "Is the transmission fluid bright red and not burnt-smelling (if applicable)?", redFlagIfFailed: "Brown or burnt-smelling ATF means transmission is on borrowed time. $3,000+ rebuild likely." },
    "int-odometer-match": { question: "Does the odometer reading match the title and service records?", helpText: "Pull the title and any service receipts. Mileage discrepancies are a federal crime.", redFlagIfFailed: "DEAL BREAKER: Odometer rollback is fraud. Run a VIN check immediately — walk away from any mileage mismatch." },
    "int-seat-wear": { question: "Does the seat, pedal, and steering-wheel wear match the stated mileage?", helpText: "A 40,000-mile car shouldn't have a worn-through driver seat or shiny brake pedal. Wear should match miles.", redFlagIfFailed: "Wear that exceeds claimed mileage is a strong odometer-rollback indicator. Pull a VIN history report before buying." },
    "int-dashboard": { question: "Is the dashboard free of major cracks or warping?", redFlagIfFailed: "Cracked dash is cosmetic but signals long sun exposure." },
    "int-headliner": { question: "Is the headliner tight and not sagging?", redFlagIfFailed: "Sagging headliner runs $200–$500 to fix." },
    "int-water-stains": { question: "Is the carpet free of water stains, mildew smell, or rust on seat brackets?", helpText: "Lift the floor mats and feel underneath. Damp carpet, rust on metal, or musty smell = possible flood damage.", redFlagIfFailed: "DEAL BREAKER: Flood damage destroys electronics over time and is often undisclosed. Walk away." },
    "int-electronics": { question: "Do all power windows, locks, mirrors, and seats work in every position?", redFlagIfFailed: "Multiple electrical failures suggest a wiring or BCM issue — diagnostic alone can run $200+." },
    "int-smell": { question: "Is the interior free of smoke, mildew, or 'covered up' heavy air-freshener smell?", redFlagIfFailed: "Heavy fragrance often masks smoke or water damage. Roll down the windows for a few minutes and re-sniff." },
    "int-warning-lights": { question: "After ignition, do all warning lights cycle and then turn off (no permanent CEL/ABS/airbag)?", redFlagIfFailed: "A constant check-engine, ABS, or airbag light can hide $500–$3,000 in repairs. Scan with an OBD-II tool before buying." },
    "td-cold-start": { question: "Does the engine start cleanly from cold without rough idle or long cranking?", helpText: "Insist on a cold start. A warm engine hides many problems — sellers often warm the car up before you arrive.", redFlagIfFailed: "Hard cold-start or rough idle indicates fuel, ignition, or compression problems. Diagnose before buying." },
    "td-startup-smoke": { question: "Is there no blue, white, or black smoke from the exhaust on startup?", helpText: "Blue = burning oil. White (persistent) = coolant in cylinders. Black = rich fuel mixture.", redFlagIfFailed: "Persistent exhaust smoke signals serious engine problems ($1,500–$6,000 repairs). Walk or test compression." },
    "td-trans-shifts": { question: "Does the transmission shift smoothly through all gears with no flare or jerks?", redFlagIfFailed: "Rough or delayed shifts mean the transmission is failing. Rebuilds run $3,000–$5,500." },
    "td-clunks": { question: "Are there no clunks, grinding, or whining noises while driving?", redFlagIfFailed: "Driveline noises usually mean wheel bearings, CV joints, or differential problems. Diagnose before buying." },
    "td-brakes-pulsate": { question: "Do the brakes stop the car straight, without pulsation, squeal, or pulling?", redFlagIfFailed: "Brake pulsation = warped rotors. Pulling = caliper or hydraulic issue. Budget $300–$900 to fix properly." },
    "td-steering-centered": { question: "Is the steering wheel centered when driving straight on a flat road?", redFlagIfFailed: "Off-center steering or pulling indicates alignment or suspension issues. Alignment runs $80–$150." },
    "td-vibration": { question: "Is there no vibration at highway speeds (50–75 mph)?", redFlagIfFailed: "Highway vibration usually means tire balance, bent wheel, or worn tie rod. $50–$300 to address." },
    "td-parking-brake": { question: "Does the parking brake hold the vehicle on a slight incline?", redFlagIfFailed: "Weak parking brake means cable adjustment or rear brake service." },
    "doc-title-name": { question: "Is the title in the seller's legal name and matches their photo ID?", helpText: "If the title is in someone else's name (a 'curbstoner' or unauthorized seller), do not buy.", redFlagIfFailed: "DEAL BREAKER: A title not in the seller's name often signals title-skipping fraud or stolen vehicle. Walk away." },
    "doc-vin-match": { question: "Does the VIN on the title match the dash plate AND the door jamb sticker?", redFlagIfFailed: "DEAL BREAKER: VIN mismatch between title, dash, and door jamb suggests cloned or rebadged stolen vehicle. Do not buy." },
    "doc-salvage-brand": { question: "Is the title clean (no salvage, rebuilt, flood, or junk brand) — or is the brand fully disclosed and priced in?", redFlagIfFailed: "Branded titles cut resale value 30–60% and limit financing/insurance. Only buy at deep discount and with full disclosure." },
    "doc-service-history": { question: "Are there service records covering at least major maintenance (timing belt, transmission, brakes)?", redFlagIfFailed: "Missing records aren't a deal-breaker but reduce buyer confidence. Use as negotiation leverage." },
    "doc-registration": { question: "Is the registration current (not expired more than a few months)?", redFlagIfFailed: "Expired registration may hide unpaid fees, abandoned status, or impound history." },
    "doc-emissions": { question: "Has the vehicle passed its most recent smog/emissions check (where required)?", redFlagIfFailed: "A vehicle that can't pass smog often has expensive problems (catalytic converter, EVAP, O2 sensors)." },
    "doc-recalls": { question: "Have all open recalls been completed?", helpText: "Check at NHTSA.gov by VIN. Open recalls are free to fix at any dealer.", redFlagIfFailed: "Open recalls can usually be fixed for free at the dealer — verify before driving." },
    "tb-tread-uniform": { question: "Is tread depth uniform across each tire (inner, center, outer)?", helpText: "Uneven wear (inner or outer edge worn) signals alignment problems. Use the penny test or a tread gauge.", redFlagIfFailed: "Uneven tread wear means alignment or suspension is off — diagnose before buying tires." },
    "tb-sidewall-cracks": { question: "Are sidewalls free of cracks, bulges, or weather checking?", redFlagIfFailed: "Sidewall damage = imminent blowout. Replace immediately — $400–$1,200 for a set." },
    "tb-flat-spots": { question: "Are tires free of flat-spotting (vibration even after warm-up)?", redFlagIfFailed: "Flat-spotted tires often happen from long storage. Sometimes resolves after driving; sometimes needs replacement." },
    "tb-pad-min": { question: "Are brake pads at least 3 mm thick (across all 4 wheels)?", redFlagIfFailed: "Pads under 3 mm need replacement soon. $300–$700 for full pads-and-rotors job." },
    "tb-rotor-grooves": { question: "Are rotors free of deep grooves, scoring, or rust pitting on the friction surface?", redFlagIfFailed: "Damaged rotors must be machined or replaced. Add $200–$500 to a brake job." },
    "tb-rotor-warp": { question: "Are the rotors free of warping (no pulsation under braking)?", redFlagIfFailed: "Warped rotors must be replaced — they cause longer stopping distances and steering wheel shimmy." },
    "he-ac-cold": { question: "Does the A/C blow cold within 60 seconds (below 50°F at the vent)?", redFlagIfFailed: "Weak A/C signals refrigerant leak or failing compressor. $300–$2,000 to fix properly." },
    "he-heat": { question: "Does the heater blow hot within a few minutes once warm?", redFlagIfFailed: "No heat usually means thermostat stuck open, low coolant, or failed heater core ($800–$2,500)." },
    "he-dash-lights-clear": { question: "After startup, are all dash warning lights off (no CEL/ABS/SRS/TPMS/oil)?", redFlagIfFailed: "Persistent warning lights mean active problems. Get OBD-II codes before negotiating." },
    "he-windows": { question: "Do all power windows go up and down at full speed?", redFlagIfFailed: "Slow or stuck windows indicate worn regulators ($150–$400 each)." },
    "he-locks": { question: "Do all door locks work from key fob and from interior switches?", redFlagIfFailed: "Failed actuators run $100–$300 per door." },
    "he-wipers": { question: "Do all wipers and washers work, including rear (if applicable)?", redFlagIfFailed: "Failed wipers fail safety inspection. Cheap fix unless motor is bad." },
    "he-interior-lights": { question: "Do all interior dome, map, and trunk lights work?", redFlagIfFailed: "Likely just bulbs — minimal cost." },
    "he-infotainment": { question: "Does the infotainment system boot, accept input, and play audio?", redFlagIfFailed: "Replacement head units run $400–$2,500 (especially on luxury cars with integrated systems)." },
    "he-backup-camera": { question: "Does the backup camera display a clear image when in reverse?", redFlagIfFailed: "Backup camera replacement runs $200–$700." },
    "he-bluetooth": { question: "Does Bluetooth pair with your phone and play media/calls?", redFlagIfFailed: "Pairing failures often resolve with a software reset, occasionally need module replacement." },
  },
  es: {
    "ext-panel-gaps": { question: "¿Las separaciones entre paneles de la carrocería son parejas y consistentes?", helpText: "Compara las separaciones en puertas, cofre, cajuela y salpicaderas. Separaciones disparejas usualmente significan una colisión previa o mala reparación.", redFlagIfFailed: "Separaciones disparejas entre paneles sugieren fuertemente reparación previa por colisión — pide el historial completo de accidentes antes de negociar." },
    "ext-paint-match": { question: "¿El color y la textura de la pintura coinciden en todos los paneles?", helpText: "Mira los paneles a la luz del sol desde varios ángulos. Diferencias de textura piel de naranja o cambios de color indican repintado.", redFlagIfFailed: "Pintura que no coincide indica repintado — usualmente cosmético, pero podría enmascarar masilla de un accidente previo." },
    "ext-rust": { question: "¿La carrocería está libre de óxido en estribos, arcos de rueda y partes bajas de puertas?", helpText: "El óxido superficial es reparable; pintura que burbujea o se descascara indica óxido comiendo desde abajo.", redFlagIfFailed: "El óxido activo se expande rápido y puede dejar el vehículo como pérdida total estructuralmente. Presupuesta hojalatería o aléjate." },
    "ext-dents": { question: "¿No hay abolladuras, golpes o daño por granizo importantes?", redFlagIfFailed: "Granizo o abolladuras grandes reducen el valor de reventa — úsalo como palanca de negociación." },
    "ext-accident-signs": { question: "¿No hay evidencia de reparación de accidente (sobreaspersión, tornillos disparejos, costuras con cinta)?", helpText: "Mira bajo el cofre en las salpicaderas internas y alrededor de los marcos de puerta por sobreaspersión. Revisa que las cabezas de tornillos no estén rayadas (señal de removido).", redFlagIfFailed: "Reparación de accidente oculta es una señal de alerta importante — saca el historial completo del vehículo y considera una inspección del chasis." },
    "ext-headlights": { question: "¿Los faros están claros y libres de amarilleo fuerte o humedad?", redFlagIfFailed: "Faros opacos reducen la visibilidad de noche e indican lentes quemados por el sol o más viejos." },
    "ext-tires-match": { question: "¿Las 4 llantas son de la misma marca, tamaño y profundidad de banda?", helpText: "Llantas disparejas pueden indicar desgaste dispar por problemas de suspensión/alineación, o un dueño tacaño que nunca las alineó.", redFlagIfFailed: "Llantas disparejas a menudo señalan problemas de alineación o suspensión. Prueba que no jale el volante en la prueba de manejo." },
    "ext-windshield": { question: "¿El parabrisas está libre de grietas, astillas o picaduras?", redFlagIfFailed: "Un parabrisas agrietado es un fallo garantizado en inspección — considera $300-$1,200 en tu oferta." },
    "ext-glass-scratches": { question: "¿Todas las ventanas están libres de rayones profundos y con polarizado adecuado (legal donde se requiera)?", redFlagIfFailed: "Daño en ventanas rara vez afecta el trato pero revisa las leyes locales de polarizado." },
    "und-oil-leak": { question: "¿La parte de abajo está libre de fugas frescas de aceite?", helpText: "Manchas húmedas y oscuras cerca del cárter o la transmisión son fugas activas. El residuo viejo y seco es menos urgente.", redFlagIfFailed: "Las fugas activas de aceite llevan a reparaciones costosas de sellos/empaques ($500-$3,000+). Verifica antes de comprar." },
    "und-coolant-leak": { question: "¿No hay residuo verde, naranja o rosa de refrigerante bajo el vehículo?", redFlagIfFailed: "Fugas de refrigerante pueden ocultar falla de empaque de cabeza o daño en el radiador — haz una prueba de presión antes de comprar." },
    "und-trans-leak": { question: "¿No hay fugas rojas de fluido de transmisión?", redFlagIfFailed: "Las fugas de transmisión pueden llevar a costos de reconstrucción de $3,000-$5,000 si se ignoran. Aléjate o consigue un descuento." },
    "und-exhaust": { question: "¿El escape está libre de óxido fuerte, agujeros o soportes flojos?", redFlagIfFailed: "El reemplazo del escape va de $400-$1,500. Escucha por traqueteos o zumbido fuerte en la prueba de manejo." },
    "und-frame-straight": { question: "¿El chasis está derecho, sin dobleces o torceduras obvias?", redFlagIfFailed: "DEAL BREAKER: Un chasis doblado significa que el auto estuvo en un accidente grave. Aléjate a menos que tengas un descuento fuerte con un reporte de ingeniero." },
    "und-frame-welds": { question: "¿El chasis está libre de soldaduras frescas, secciones cortadas-y-reemplazadas, o placas de reparación atornilladas?", helpText: "Las soldaduras de fábrica son uniformes y por puntos. Cordones de soldadura ondulados indican reparación de mercado secundario.", redFlagIfFailed: "DEAL BREAKER: Soldaduras de mercado secundario en el chasis indican reparación severa por colisión. Aléjate — estos vehículos son inseguros y no asegurables en muchos casos." },
    "und-suspension-bushings": { question: "¿Los bujes de suspensión están firmes y libres de grietas?", redFlagIfFailed: "Bujes gastados causan golpeteos y desgaste dispar de llantas. $300-$800 para reemplazar." },
    "und-cv-boots": { question: "¿Los guardapolvos de los CV están intactos (sin rasgaduras o grasa alrededor)?", redFlagIfFailed: "Guardapolvos rotos dejan que agua y suciedad destruyan la junta — $400-$900 por eje si no se detecta temprano." },
    "und-driveshaft": { question: "¿La flecha cardán está libre de óxido, abolladuras y crucetas gastadas (RWD/AWD)?", redFlagIfFailed: "Crucetas malas causan golpeteo al cambiar entre drive y reversa." },
    "eng-oil-cap": { question: "¿La parte de abajo de la tapa del aceite está libre de residuo lechoso/color mayonesa?", helpText: "Una película cremosa blanco-bronceada bajo la tapa del aceite usualmente significa que el refrigerante se está mezclando con el aceite — falla de empaque de cabeza.", redFlagIfFailed: "DEAL BREAKER: Mayonesa en la tapa del aceite = falla de empaque de cabeza o peor (reparación de $2,500-$6,000). Aléjate." },
    "eng-coolant-color": { question: "¿El refrigerante es del color correcto (verde/naranja/rosa) y está libre de brillo de aceite?", redFlagIfFailed: "Refrigerante oxidado o aceitoso indica problemas internos del motor o descuido. Haz una prueba de compresión antes de comprar." },
    "eng-belts-hoses": { question: "¿Las bandas y mangueras están libres de grietas, vidriado o puntos blandos?", redFlagIfFailed: "Bandas/mangueras viejas fallan sin aviso. Presupuesta $200-$600 para reemplazo." },
    "eng-battery-age": { question: "¿La batería tiene menos de 4 años y está libre de corrosión pesada?", helpText: "Busca la calcomanía de fecha en la batería. La mayoría dura 4-6 años.", redFlagIfFailed: "Batería cerca del fin de su vida — considera $150-$300 para reemplazo." },
    "eng-mismatched-bolts": { question: "¿Todos los tornillos del compartimento del motor son originales de fábrica (sin cabezas reemplazadas o rayadas)?", helpText: "Tornillos reemplazados en el soporte del radiador, salpicadera o soporte central indican reparación previa de colisión frontal.", redFlagIfFailed: "DEAL BREAKER: Tornillos disparejos en componentes estructurales señalan colisión mayor no declarada. Aléjate a menos que el historial coincida." },
    "eng-recent-paint": { question: "¿El motor y el compartimento del motor están libres de sobreaspersión reciente o pintura fresca?", redFlagIfFailed: "Pintura fresca en el motor a menudo oculta reparaciones de fugas o daño por accidente. Sé muy escéptico." },
    "eng-dipstick": { question: "¿El aceite en la varilla está limpio color ámbar a café (no negro, arenoso o lechoso)?", redFlagIfFailed: "Aceite negro o arenoso señala mantenimiento descuidado. Aceite lechoso = falla de empaque de cabeza. Ambos son preocupaciones importantes." },
    "eng-trans-fluid": { question: "¿El fluido de transmisión está rojo brillante y no huele a quemado (si aplica)?", redFlagIfFailed: "ATF café o con olor a quemado significa que la transmisión está en tiempo prestado. Reconstrucción de $3,000+ probable." },
    "int-odometer-match": { question: "¿La lectura del odómetro coincide con el título y los registros de servicio?", helpText: "Saca el título y cualquier recibo de servicio. Las discrepancias de kilometraje son un crimen federal.", redFlagIfFailed: "DEAL BREAKER: El rollback de odómetro es fraude. Haz una verificación VIN inmediatamente — aléjate de cualquier desacuerdo de kilometraje." },
    "int-seat-wear": { question: "¿El desgaste del asiento, pedal y volante coincide con el kilometraje declarado?", helpText: "Un auto de 40,000 millas no debe tener un asiento del conductor gastado o un pedal de freno brillante. El desgaste debe coincidir con las millas.", redFlagIfFailed: "Desgaste que excede el kilometraje declarado es un fuerte indicador de rollback de odómetro. Saca un reporte de historial VIN antes de comprar." },
    "int-dashboard": { question: "¿El tablero está libre de grietas mayores o deformación?", redFlagIfFailed: "Tablero agrietado es cosmético pero señala larga exposición al sol." },
    "int-headliner": { question: "¿El cielo está apretado y no se está cayendo?", redFlagIfFailed: "Cielo caído cuesta $200-$500 para arreglar." },
    "int-water-stains": { question: "¿La alfombra está libre de manchas de agua, olor a moho o óxido en las hebillas del asiento?", helpText: "Levanta los tapetes y siente debajo. Alfombra húmeda, óxido en metal u olor a moho = posible daño por inundación.", redFlagIfFailed: "DEAL BREAKER: El daño por inundación destruye los electrónicos con el tiempo y a menudo no se declara. Aléjate." },
    "int-electronics": { question: "¿Todas las ventanas eléctricas, seguros, espejos y asientos funcionan en cada posición?", redFlagIfFailed: "Múltiples fallas eléctricas sugieren un problema de cableado o de BCM — el diagnóstico solo puede costar $200+." },
    "int-smell": { question: "¿El interior está libre de humo, moho u olor pesado 'tapado' de ambientador?", redFlagIfFailed: "La fragancia pesada a menudo enmascara humo o daño por agua. Baja las ventanas por unos minutos y vuelve a oler." },
    "int-warning-lights": { question: "Tras la ignición, ¿todas las luces de advertencia ciclan y luego se apagan (sin CEL/ABS/bolsa de aire permanente)?", redFlagIfFailed: "Una luz constante de check-engine, ABS o bolsa de aire puede ocultar $500-$3,000 en reparaciones. Escanea con una herramienta OBD-II antes de comprar." },
    "td-cold-start": { question: "¿El motor arranca limpiamente en frío sin marcha mínima irregular o arranque largo?", helpText: "Insiste en un arranque en frío. Un motor caliente oculta muchos problemas — los vendedores a menudo calientan el auto antes de que llegues.", redFlagIfFailed: "Arranque en frío difícil o marcha mínima irregular indica problemas de combustible, ignición o compresión. Diagnostica antes de comprar." },
    "td-startup-smoke": { question: "¿No hay humo azul, blanco o negro del escape al arrancar?", helpText: "Azul = quemando aceite. Blanco (persistente) = refrigerante en los cilindros. Negro = mezcla de combustible rica.", redFlagIfFailed: "Humo persistente del escape señala problemas serios del motor (reparaciones de $1,500-$6,000). Aléjate o haz prueba de compresión." },
    "td-trans-shifts": { question: "¿La transmisión cambia suavemente por todas las marchas sin flares o tirones?", redFlagIfFailed: "Cambios duros o demorados significan que la transmisión está fallando. Reconstrucciones van de $3,000-$5,500." },
    "td-clunks": { question: "¿No hay golpeteos, rechinidos o quejidos al manejar?", redFlagIfFailed: "Ruidos del tren motriz usualmente significan baleros de rueda, juntas CV o problemas del diferencial. Diagnostica antes de comprar." },
    "td-brakes-pulsate": { question: "¿Los frenos paran el auto derecho, sin pulsación, chillido o tirón?", redFlagIfFailed: "Pulsación de freno = discos deformados. Tirón = problema de mordaza o hidráulico. Presupuesta $300-$900 para arreglar bien." },
    "td-steering-centered": { question: "¿El volante está centrado al manejar derecho en una vía plana?", redFlagIfFailed: "Dirección descentrada o tirón indica problemas de alineación o suspensión. La alineación va de $80-$150." },
    "td-vibration": { question: "¿No hay vibración a velocidades de autopista (50-75 mph)?", redFlagIfFailed: "Vibración en autopista usualmente significa balanceo de llantas, rueda doblada o terminal gastado. $50-$300 para atender." },
    "td-parking-brake": { question: "¿El freno de mano sostiene el vehículo en una pendiente leve?", redFlagIfFailed: "Freno de mano débil significa ajuste de cable o servicio de frenos traseros." },
    "doc-title-name": { question: "¿El título está a nombre legal del vendedor y coincide con su identificación con foto?", helpText: "Si el título está a nombre de alguien más (un 'curbstoner' o vendedor no autorizado), no compres.", redFlagIfFailed: "DEAL BREAKER: Un título que no está a nombre del vendedor a menudo señala fraude de salto de título o vehículo robado. Aléjate." },
    "doc-vin-match": { question: "¿El VIN en el título coincide con la placa del tablero Y la calcomanía del marco de puerta?", redFlagIfFailed: "DEAL BREAKER: VIN no coincide entre título, tablero y marco de puerta sugiere vehículo clonado o robado re-etiquetado. No compres." },
    "doc-salvage-brand": { question: "¿El título está limpio (sin marca de salvamento, reconstruido, inundación o chatarra) — o la marca está completamente declarada y reflejada en el precio?", redFlagIfFailed: "Los títulos marcados cortan el valor de reventa 30-60% y limitan financiamiento/seguro. Solo compra con descuento profundo y declaración completa." },
    "doc-service-history": { question: "¿Hay registros de servicio que cubran al menos el mantenimiento mayor (banda de distribución, transmisión, frenos)?", redFlagIfFailed: "Registros faltantes no son deal-breaker pero reducen la confianza del comprador. Úsalo como palanca de negociación." },
    "doc-registration": { question: "¿El registro está vigente (no vencido por más de unos meses)?", redFlagIfFailed: "Registro vencido puede ocultar cuotas no pagadas, estado de abandono o historial de corralón." },
    "doc-emissions": { question: "¿El vehículo ha pasado su revisión más reciente de smog/emisiones (donde se requiera)?", redFlagIfFailed: "Un vehículo que no pasa smog a menudo tiene problemas costosos (convertidor catalítico, EVAP, sensores O2)." },
    "doc-recalls": { question: "¿Se han completado todos los recalls abiertos?", helpText: "Revisa en NHTSA.gov por VIN. Los recalls abiertos son gratis para arreglar en cualquier agencia.", redFlagIfFailed: "Los recalls abiertos usualmente pueden arreglarse gratis en la agencia — verifica antes de manejar." },
    "tb-tread-uniform": { question: "¿La profundidad de banda es uniforme en cada llanta (interior, centro, exterior)?", helpText: "Desgaste dispar (borde interior o exterior gastado) señala problemas de alineación. Usa la prueba del centavo o un medidor de banda.", redFlagIfFailed: "Desgaste dispar de banda significa que la alineación o suspensión está mal — diagnostica antes de comprar llantas." },
    "tb-sidewall-cracks": { question: "¿Las paredes laterales están libres de grietas, abultamientos o cuarteado por clima?", redFlagIfFailed: "Daño en pared lateral = ponchadura inminente. Reemplaza inmediatamente — $400-$1,200 por un juego." },
    "tb-flat-spots": { question: "¿Las llantas están libres de planos (vibración incluso tras calentar)?", redFlagIfFailed: "Llantas con planos a menudo ocurren por almacenamiento largo. A veces se resuelve manejando; a veces requiere reemplazo." },
    "tb-pad-min": { question: "¿Las balatas tienen al menos 3 mm de grosor (en las 4 ruedas)?", redFlagIfFailed: "Balatas bajo 3 mm necesitan reemplazo pronto. $300-$700 por trabajo completo de balatas-y-discos." },
    "tb-rotor-grooves": { question: "¿Los discos están libres de surcos profundos, marcas o picaduras de óxido en la superficie de fricción?", redFlagIfFailed: "Discos dañados deben rectificarse o reemplazarse. Agrega $200-$500 al trabajo de frenos." },
    "tb-rotor-warp": { question: "¿Los discos están libres de deformación (sin pulsación al frenar)?", redFlagIfFailed: "Discos deformados deben reemplazarse — causan distancias de frenado más largas y temblor del volante." },
    "he-ac-cold": { question: "¿El A/C enfría dentro de 60 segundos (debajo de 50°F en la rejilla)?", redFlagIfFailed: "A/C débil señala fuga de refrigerante o compresor fallando. $300-$2,000 para arreglar bien." },
    "he-heat": { question: "¿La calefacción calienta dentro de unos minutos una vez caliente?", redFlagIfFailed: "Sin calor usualmente significa termostato atorado abierto, refrigerante bajo o calentador interno fallado ($800-$2,500)." },
    "he-dash-lights-clear": { question: "Tras el arranque, ¿todas las luces de advertencia del tablero están apagadas (sin CEL/ABS/SRS/TPMS/aceite)?", redFlagIfFailed: "Luces de advertencia persistentes significan problemas activos. Obtén códigos OBD-II antes de negociar." },
    "he-windows": { question: "¿Todas las ventanas eléctricas suben y bajan a velocidad completa?", redFlagIfFailed: "Ventanas lentas o atoradas indican reguladores gastados ($150-$400 cada uno)." },
    "he-locks": { question: "¿Todos los seguros funcionan desde el control y desde los interruptores interiores?", redFlagIfFailed: "Actuadores fallados van de $100-$300 por puerta." },
    "he-wipers": { question: "¿Todos los limpiaparabrisas y rociadores funcionan, incluyendo el trasero (si aplica)?", redFlagIfFailed: "Limpiaparabrisas fallados reprueban la inspección de seguridad. Arreglo barato a menos que el motor esté mal." },
    "he-interior-lights": { question: "¿Todas las luces interiores del techo, mapa y cajuela funcionan?", redFlagIfFailed: "Probablemente solo focos — costo mínimo." },
    "he-infotainment": { question: "¿El sistema de infoentretenimiento arranca, acepta entrada y reproduce audio?", redFlagIfFailed: "Unidades de reemplazo van de $400-$2,500 (especialmente en autos de lujo con sistemas integrados)." },
    "he-backup-camera": { question: "¿La cámara de reversa muestra una imagen clara al estar en reversa?", redFlagIfFailed: "Reemplazo de cámara de reversa va de $200-$700." },
    "he-bluetooth": { question: "¿Bluetooth se empareja con tu teléfono y reproduce medios/llamadas?", redFlagIfFailed: "Fallas de emparejamiento a menudo se resuelven con un reseteo de software, ocasionalmente requieren reemplazo del módulo." },
  },
};

function localizedSection(locale: "en" | "es" | "fr", section: ChecklistSection) {
  const t = (SECTION_T[locale] ?? SECTION_T.en)?.[section.id];
  return t ?? { title: section.title, description: section.description };
}

function localizedItem(locale: "en" | "es" | "fr", id: string) {
  const t = (ITEM_T[locale] ?? ITEM_T.en)?.[id];
  return t ?? { question: id, helpText: undefined, redFlagIfFailed: "" };
}

interface InspectionChecklistProps {
  locale?: "en" | "es" | "fr";
}

export default function InspectionChecklist({ locale = "en" }: InspectionChecklistProps) {
  const c: (typeof COPY)["en" | "es" | "fr"] = COPY[locale];
  const [vehicle, setVehicle] = useState<VehicleInfo>(EMPTY_VEHICLE);
  // verdicts: { [itemId]: "Pass" | "Fail" | "Skip" }
  const [verdicts, setVerdicts] = useState<Record<string, Verdict>>({});
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(inspectionChecklist.map((s) => [s.id, true])),
  );
  const [reportOpen, setReportOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [copied, setCopied] = useState(false);

  // Load from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { vehicle?: VehicleInfo; verdicts?: Record<string, Verdict> };
        if (parsed.vehicle) setVehicle({ ...EMPTY_VEHICLE, ...parsed.vehicle });
        if (parsed.verdicts) setVerdicts(parsed.verdicts);
      }
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  // Persist on change
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ vehicle, verdicts }));
    } catch {
      // ignore
    }
  }, [vehicle, verdicts, hydrated]);

  function setVerdict(id: string, v: Verdict) {
    setVerdicts((prev) => {
      const next = { ...prev };
      if (prev[id] === v) {
        delete next[id];
      } else {
        next[id] = v;
      }
      return next;
    });
  }

  function toggleSection(id: string) {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function resetAll() {
    if (typeof window !== "undefined") {
      const ok = window.confirm(c.resetConfirm);
      if (!ok) return;
    }
    setVerdicts({});
    setVehicle(EMPTY_VEHICLE);
  }

  // Stats
  const stats = useMemo(() => {
    let pass = 0;
    let fail = 0;
    let skip = 0;
    let answered = 0;
    const failedBySeverity: Record<ChecklistSeverity, number> = {
      "deal-breaker": 0,
      major: 0,
      minor: 0,
      info: 0,
    };
    for (const section of inspectionChecklist) {
      for (const item of section.items) {
        const v = verdicts[item.id];
        if (!v) continue;
        answered++;
        if (v === "Pass") pass++;
        else if (v === "Fail") {
          fail++;
          failedBySeverity[item.severity]++;
        } else if (v === "Skip") skip++;
      }
    }
    const redFlags = failedBySeverity["deal-breaker"] + failedBySeverity["major"];
    return { pass, fail, skip, answered, failedBySeverity, redFlags };
  }, [verdicts]);

  const verdict: { level: "green" | "amber" | "red"; label: string; detail: string } = useMemo(() => {
    if (stats.failedBySeverity["deal-breaker"] > 0) {
      return { level: "red", label: c.verdictWalkAway, detail: c.verdictWalkAwayDealBreaker };
    }
    if (stats.failedBySeverity["major"] >= 2) {
      return { level: "red", label: c.verdictWalkAway, detail: c.verdictWalkAwayMajors };
    }
    if (stats.failedBySeverity["major"] === 1 || stats.failedBySeverity["minor"] >= 3) {
      return { level: "amber", label: c.verdictNegotiate, detail: c.verdictNegotiateDetail };
    }
    if (stats.answered === 0) {
      return { level: "amber", label: c.verdictNotStarted, detail: c.verdictNotStartedDetail };
    }
    return { level: "green", label: c.verdictSolid, detail: c.verdictSolidDetail };
  }, [stats, c]);

  const progressPct = Math.round((stats.answered / TOTAL_ITEMS) * 100);

  const failedItems = useMemo(() => {
    const grouped: { section: ChecklistSection; items: ChecklistSection["items"] }[] = [];
    for (const section of inspectionChecklist) {
      const items = section.items.filter((i) => verdicts[i.id] === "Fail");
      if (items.length) grouped.push({ section, items });
    }
    return grouped;
  }, [verdicts]);

  function buildMarkdown(): string {
    const v = vehicle;
    const titleLine =
      [v.year, v.make, v.model].filter(Boolean).join(" ") || c.mdGenericTitle;
    const lines: string[] = [];
    lines.push(`# ${titleLine}`);
    if (v.vin) lines.push(`**${c.mdVin}:** ${v.vin}`);
    if (v.mileage) lines.push(`**${c.mdMileage}:** ${v.mileage}`);
    if (v.askingPrice) lines.push(`**${c.mdAskingPrice}:** ${v.askingPrice}`);
    if (v.sellerName) lines.push(`**${c.mdSeller}:** ${v.sellerName}`);
    lines.push("");
    lines.push(`## ${c.mdScore}`);
    lines.push(`- ${c.mdPassed}: ${stats.pass}`);
    lines.push(`- ${c.mdFailed}: ${stats.fail}`);
    lines.push(`- ${c.mdSkipped}: ${stats.skip}`);
    lines.push(`- ${c.mdTotalReviewed}: ${stats.answered} / ${TOTAL_ITEMS}`);
    lines.push("");
    lines.push(`## ${c.mdSeverityBreakdown}`);
    lines.push(`- ${c.mdDealBreakers}: ${stats.failedBySeverity["deal-breaker"]}`);
    lines.push(`- ${c.mdMajor}: ${stats.failedBySeverity["major"]}`);
    lines.push(`- ${c.mdMinor}: ${stats.failedBySeverity["minor"]}`);
    lines.push(`- ${c.mdInfo}: ${stats.failedBySeverity["info"]}`);
    lines.push("");
    lines.push(`## ${c.mdVerdictHeading} — ${verdict.level.toUpperCase()}`);
    lines.push(`**${verdict.label}**`);
    lines.push("");
    lines.push(verdict.detail);
    lines.push("");
    if (failedItems.length) {
      lines.push(`## ${c.mdFailedItems}`);
      for (const { section, items } of failedItems) {
        const ls = localizedSection(locale, section);
        lines.push("");
        lines.push(`### ${ls.title}`);
        for (const item of items) {
          const li = localizedItem(locale, item.id);
          lines.push(`- **[${c.severityLabel[item.severity]}]** ${li.question}`);
          lines.push(`  - ${li.redFlagIfFailed}`);
        }
      }
    } else {
      lines.push(`## ${c.mdNoFailed}`);
    }
    lines.push("");
    lines.push(c.mdFooter);
    return lines.join("\n");
  }

  async function copyMarkdown() {
    try {
      await navigator.clipboard.writeText(buildMarkdown());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      setCopied(false);
    }
  }

  function printReport() {
    if (typeof window !== "undefined") window.print();
  }

  return (
    <div className="space-y-6">
      {/* Print-only stylesheet */}
      <style jsx global>{`
        @media print {
          header,
          nav,
          footer,
          .print\\:hidden {
            display: none !important;
          }
          body {
            background: white !important;
          }
          .checklist-print-only {
            display: block !important;
          }
          .checklist-screen-only {
            display: none !important;
          }
          .checklist-print-section {
            page-break-inside: avoid;
          }
        }
        .checklist-print-only {
          display: none;
        }
      `}</style>

      {/* ── Vehicle info ── */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 print:hidden">
        <div className="flex items-center gap-2 mb-4">
          <ClipboardList className="w-5 h-5 text-primary-600" />
          <h2 className="text-lg font-bold text-slate-900">{c.vehicleHeading}</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          <Field label={c.year} value={vehicle.year} onChange={(year) => setVehicle((p) => ({ ...p, year }))} placeholder="2018" />
          <Field label={c.make} value={vehicle.make} onChange={(make) => setVehicle((p) => ({ ...p, make }))} placeholder="Toyota" />
          <Field label={c.model} value={vehicle.model} onChange={(model) => setVehicle((p) => ({ ...p, model }))} placeholder="Camry" />
          <Field label={c.vin} value={vehicle.vin} onChange={(vin) => setVehicle((p) => ({ ...p, vin: vin.toUpperCase() }))} placeholder={c.vinPlaceholder} maxLength={17} />
          <Field label={c.mileage} value={vehicle.mileage} onChange={(mileage) => setVehicle((p) => ({ ...p, mileage }))} placeholder="78,500" />
          <Field label={c.askingPrice} value={vehicle.askingPrice} onChange={(askingPrice) => setVehicle((p) => ({ ...p, askingPrice }))} placeholder="$14,995" />
          <div className="sm:col-span-2">
            <Field label={c.sellerName} value={vehicle.sellerName} onChange={(sellerName) => setVehicle((p) => ({ ...p, sellerName }))} placeholder={c.sellerPlaceholder} />
          </div>
        </div>
      </div>

      {/* ── Progress bar ── */}
      <div className="print:hidden">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between gap-3 text-sm">
            <span className="font-bold text-slate-900">
              {c.itemsReviewed(stats.answered, TOTAL_ITEMS)}
            </span>
            <span
              className={
                "inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full " +
                (stats.redFlags === 0
                  ? "bg-emerald-100 text-emerald-800"
                  : stats.failedBySeverity["deal-breaker"] > 0
                    ? "bg-red-100 text-red-800"
                    : "bg-orange-100 text-orange-800")
              }
            >
              {stats.failedBySeverity["deal-breaker"] > 0 ? (
                <ShieldAlert className="w-3.5 h-3.5" />
              ) : stats.redFlags > 0 ? (
                <AlertTriangle className="w-3.5 h-3.5" />
              ) : (
                <CheckCircle2 className="w-3.5 h-3.5" />
              )}
              {c.redFlag(stats.redFlags)}
            </span>
          </div>
          <div className="mt-2 h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary-600 transition-all"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setReportOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold rounded-lg transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              {c.generateReport}
            </button>
            <button
              type="button"
              onClick={resetAll}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
            >
              <RefreshCcw className="w-3.5 h-3.5" />
              {c.reset}
            </button>
          </div>
        </div>
      </div>

      {/* ── Sections ── */}
      <div className="space-y-4 print:hidden">
        {inspectionChecklist.map((section) => {
          const Icon = ICON_MAP[section.icon] ?? ClipboardList;
          const isOpen = openSections[section.id];
          const ls = localizedSection(locale, section);
          const sectionStats = section.items.reduce(
            (acc, item) => {
              const v = verdicts[item.id];
              if (v === "Pass") acc.pass++;
              else if (v === "Fail") acc.fail++;
              else if (v === "Skip") acc.skip++;
              return acc;
            },
            { pass: 0, fail: 0, skip: 0 },
          );
          return (
            <div
              key={section.id}
              className="rounded-2xl border border-slate-200 bg-white overflow-hidden"
            >
              <button
                type="button"
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center gap-3 p-4 sm:p-5 text-left hover:bg-slate-50 transition-colors"
                aria-expanded={isOpen}
              >
                <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-primary-700" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-slate-900">{ls.title}</h3>
                    <span className="text-xs text-slate-500 font-mono">
                      {sectionStats.pass + sectionStats.fail + sectionStats.skip} / {section.items.length}
                    </span>
                    {sectionStats.fail > 0 && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-red-700 bg-red-50 border border-red-200 rounded-full px-2 py-0.5">
                        <XCircle className="w-3 h-3" />
                        {c.failedShort(sectionStats.fail)}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    {ls.description}
                  </p>
                </div>
                <ChevronDown
                  className={
                    "w-5 h-5 text-slate-400 transition-transform flex-shrink-0 " +
                    (isOpen ? "rotate-180" : "")
                  }
                />
              </button>
              {isOpen && (
                <div className="border-t border-slate-100 divide-y divide-slate-100">
                  {section.items.map((item) => {
                    const li = localizedItem(locale, item.id);
                    const v = verdicts[item.id];
                    const failed = v === "Fail";
                    const cardClass = failed ? FAIL_BG[item.severity] : "bg-white border-transparent";
                    return (
                      <div
                        key={item.id}
                        className={`p-4 sm:p-5 border-l-4 transition-colors ${cardClass}`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                              <span
                                className={`inline-flex items-center text-[10px] uppercase tracking-wide font-bold px-2 py-0.5 rounded-full border ${SEVERITY_PILL[item.severity]}`}
                              >
                                {c.severityLabel[item.severity]}
                              </span>
                            </div>
                            <p className="font-medium text-slate-900 leading-snug">
                              {li.question}
                            </p>
                            {li.helpText && (
                              <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                                {li.helpText}
                              </p>
                            )}
                            {failed && (
                              <p className="mt-2 text-xs text-red-800 bg-white/60 rounded-lg p-2 leading-relaxed border border-red-200">
                                <strong>{c.redFlagLabel}</strong> {li.redFlagIfFailed}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <VerdictButton
                            active={v === "Pass"}
                            tone="emerald"
                            onClick={() => setVerdict(item.id, "Pass")}
                            icon={<Check className="w-3.5 h-3.5" />}
                            label={c.pass}
                          />
                          <VerdictButton
                            active={v === "Fail"}
                            tone="red"
                            onClick={() => setVerdict(item.id, "Fail")}
                            icon={<X className="w-3.5 h-3.5" />}
                            label={c.fail}
                          />
                          <VerdictButton
                            active={v === "Skip"}
                            tone="slate"
                            onClick={() => setVerdict(item.id, "Skip")}
                            icon={<Minus className="w-3.5 h-3.5" />}
                            label={c.skip}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Report modal / view ── */}
      {reportOpen && (
        <ReportView
          locale={locale}
          c={c}
          vehicle={vehicle}
          stats={stats}
          verdict={verdict}
          failedItems={failedItems}
          onClose={() => setReportOpen(false)}
          onPrint={printReport}
          onCopy={copyMarkdown}
          copied={copied}
        />
      )}
    </div>
  );
}

/* ─── Subcomponents ─────────────────────────────────────── */

function Field({
  label,
  value,
  onChange,
  placeholder,
  maxLength,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  maxLength?: number;
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-slate-600">{label}</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
      />
    </label>
  );
}

function VerdictButton({
  active,
  tone,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  tone: "emerald" | "red" | "slate";
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  const activeClasses: Record<typeof tone, string> = {
    emerald: "bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700",
    red: "bg-red-600 text-white border-red-600 hover:bg-red-700",
    slate: "bg-slate-700 text-white border-slate-700 hover:bg-slate-800",
  };
  const idleClasses: Record<typeof tone, string> = {
    emerald: "bg-white text-emerald-700 border-emerald-200 hover:bg-emerald-50",
    red: "bg-white text-red-700 border-red-200 hover:bg-red-50",
    slate: "bg-white text-slate-700 border-slate-200 hover:bg-slate-50",
  };
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-lg border transition-colors ${active ? activeClasses[tone] : idleClasses[tone]}`}
    >
      {icon}
      {label}
    </button>
  );
}

function ReportView({
  locale,
  c,
  vehicle,
  stats,
  verdict,
  failedItems,
  onClose,
  onPrint,
  onCopy,
  copied,
}: {
  locale: "en" | "es" | "fr";
  c: (typeof COPY)["en" | "es" | "fr"];
  vehicle: VehicleInfo;
  stats: {
    pass: number;
    fail: number;
    skip: number;
    answered: number;
    failedBySeverity: Record<ChecklistSeverity, number>;
    redFlags: number;
  };
  verdict: { level: "green" | "amber" | "red"; label: string; detail: string };
  failedItems: { section: ChecklistSection; items: ChecklistSection["items"] }[];
  onClose: () => void;
  onPrint: () => void;
  onCopy: () => void;
  copied: boolean;
}) {
  const titleLine =
    [vehicle.year, vehicle.make, vehicle.model].filter(Boolean).join(" ") || c.defaultTitleLine;

  const verdictColor: Record<typeof verdict.level, string> = {
    green: "bg-emerald-50 border-emerald-300 text-emerald-900",
    amber: "bg-amber-50 border-amber-300 text-amber-900",
    red: "bg-red-50 border-red-300 text-red-900",
  };
  const verdictBadge: Record<typeof verdict.level, string> = {
    green: "bg-emerald-600 text-white",
    amber: "bg-amber-500 text-white",
    red: "bg-red-600 text-white",
  };
  const verdictLetter: Record<typeof verdict.level, string> = {
    green: "GREEN",
    amber: "AMBER",
    red: "RED",
  };

  const dateLocale = locale === "es" ? "es-US" : "en-US";

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/70 flex items-start justify-center overflow-y-auto p-3 sm:p-6 print:static print:bg-white print:p-0 print:overflow-visible"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl my-4 print:shadow-none print:my-0 print:rounded-none">
        {/* Header */}
        <div className="flex items-center justify-between gap-3 p-5 border-b border-slate-200 print:hidden">
          <h2 className="text-lg font-bold text-slate-900">{c.inspectionReport}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={c.closeReport}
            className="w-8 h-8 rounded-lg text-slate-500 hover:bg-slate-100 inline-flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-7 space-y-6 text-slate-800">
          {/* Vehicle */}
          <section className="checklist-print-section">
            <h1 className="text-2xl font-bold text-slate-900">{titleLine}</h1>
            <dl className="mt-3 grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm">
              {vehicle.vin && <ReportField label={c.vin} value={vehicle.vin} />}
              {vehicle.mileage && <ReportField label={c.mileage} value={vehicle.mileage} />}
              {vehicle.askingPrice && <ReportField label={c.askingPrice} value={vehicle.askingPrice} />}
              {vehicle.sellerName && <ReportField label={c.seller} value={vehicle.sellerName} />}
              <ReportField label={c.inspectedOn} value={new Date().toLocaleDateString(dateLocale)} />
            </dl>
          </section>

          {/* Verdict */}
          <section className={`rounded-2xl border p-5 ${verdictColor[verdict.level]} checklist-print-section`}>
            <div className="flex items-center gap-3">
              <span
                className={`inline-flex items-center justify-center text-xs font-extrabold tracking-wide px-3 py-1 rounded-full ${verdictBadge[verdict.level]}`}
              >
                {verdictLetter[verdict.level]}
              </span>
              <p className="font-bold">{verdict.label}</p>
            </div>
            <p className="mt-2 text-sm leading-relaxed">{verdict.detail}</p>
          </section>

          {/* Score */}
          <section className="checklist-print-section">
            <h3 className="font-bold text-slate-900 mb-3">{c.scoreHeading}</h3>
            <div className="grid grid-cols-3 gap-3">
              <ScoreTile color="emerald" label={c.scorePassed} value={stats.pass} />
              <ScoreTile color="red" label={c.scoreFailed} value={stats.fail} />
              <ScoreTile color="slate" label={c.scoreSkipped} value={stats.skip} />
            </div>
            <p className="mt-2 text-xs text-slate-500">
              {c.scoreSummary(stats.answered, TOTAL_ITEMS)}
            </p>
          </section>

          {/* Severity breakdown */}
          <section className="checklist-print-section">
            <h3 className="font-bold text-slate-900 mb-3">{c.severityHeading}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
              <SevTile tone="red" label={c.sevDealBreakers} value={stats.failedBySeverity["deal-breaker"]} />
              <SevTile tone="orange" label={c.sevMajor} value={stats.failedBySeverity["major"]} />
              <SevTile tone="amber" label={c.sevMinor} value={stats.failedBySeverity["minor"]} />
              <SevTile tone="slate" label={c.sevInfo} value={stats.failedBySeverity["info"]} />
            </div>
          </section>

          {/* Deal-breaker callout */}
          {stats.failedBySeverity["deal-breaker"] > 0 && (
            <section className="rounded-2xl border border-red-300 bg-red-50 p-5 checklist-print-section">
              <div className="flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-red-900">
                    {c.dealBreakerCalloutTitle(stats.failedBySeverity["deal-breaker"])}
                  </p>
                  <p className="mt-1 text-sm text-red-800 leading-relaxed">
                    {c.dealBreakerCalloutBody}
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* Failed items grouped */}
          <section className="checklist-print-section">
            <h3 className="font-bold text-slate-900 mb-3">{c.failedItemsHeading}</h3>
            {failedItems.length === 0 ? (
              <p className="text-sm text-slate-600 italic">
                {c.failedItemsNone}
              </p>
            ) : (
              <div className="space-y-4">
                {failedItems.map(({ section, items }) => {
                  const ls = localizedSection(locale, section);
                  return (
                    <div key={section.id} className="rounded-xl border border-slate-200 p-4">
                      <p className="font-bold text-slate-900 text-sm mb-2">{ls.title}</p>
                      <ul className="space-y-2.5">
                        {items.map((item) => {
                          const li = localizedItem(locale, item.id);
                          return (
                            <li key={item.id} className="text-sm">
                              <div className="flex items-center gap-2 flex-wrap mb-1">
                                <span
                                  className={`inline-flex items-center text-[10px] uppercase tracking-wide font-bold px-2 py-0.5 rounded-full border ${SEVERITY_PILL[item.severity]}`}
                                >
                                  {c.severityLabel[item.severity]}
                                </span>
                                <span className="font-medium text-slate-900">{li.question}</span>
                              </div>
                              <p className="text-xs text-slate-700 leading-relaxed pl-1">
                                {li.redFlagIfFailed}
                              </p>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          <p className="text-xs text-slate-500 italic checklist-print-section">
            {c.footerNote}
          </p>
        </div>

        {/* Footer */}
        <div className="flex flex-wrap items-center justify-end gap-2 p-5 border-t border-slate-200 bg-slate-50 rounded-b-2xl print:hidden">
          <button
            type="button"
            onClick={onCopy}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-semibold rounded-lg hover:bg-slate-50 transition-colors"
          >
            <ClipboardCopy className="w-4 h-4" />
            {copied ? c.copied : c.copyAsMarkdown}
          </button>
          <button
            type="button"
            onClick={onPrint}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-bold rounded-lg transition-colors"
          >
            <Printer className="w-4 h-4" />
            {c.printReport}
          </button>
        </div>
      </div>
    </div>
  );
}

function ReportField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2">
      <dt className="text-slate-500 font-medium w-32 flex-shrink-0">{label}</dt>
      <dd className="text-slate-900 font-mono break-all">{value}</dd>
    </div>
  );
}

function ScoreTile({ color, label, value }: { color: "emerald" | "red" | "slate"; label: string; value: number }) {
  const cls: Record<typeof color, string> = {
    emerald: "bg-emerald-50 border-emerald-200 text-emerald-800",
    red: "bg-red-50 border-red-200 text-red-800",
    slate: "bg-slate-50 border-slate-200 text-slate-800",
  };
  return (
    <div className={`rounded-xl border p-3 text-center ${cls[color]}`}>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-xs font-medium mt-0.5">{label}</p>
    </div>
  );
}

function SevTile({ tone, label, value }: { tone: "red" | "orange" | "amber" | "slate"; label: string; value: number }) {
  const cls: Record<typeof tone, string> = {
    red: "bg-red-50 border-red-200 text-red-800",
    orange: "bg-orange-50 border-orange-200 text-orange-800",
    amber: "bg-amber-50 border-amber-200 text-amber-800",
    slate: "bg-slate-50 border-slate-200 text-slate-700",
  };
  return (
    <div className={`rounded-lg border p-3 text-center ${cls[tone]}`}>
      <p className="text-xl font-bold">{value}</p>
      <p className="text-[11px] font-medium mt-0.5">{label}</p>
    </div>
  );
}
