/**
 * Shared body for /odometer-check and /es/odometer-check.
 * Wave 18a — full English layout in both locales via COPY={en,es}.
 */

import Link from "@/components/LocaleLink";
import {
  Check, Shield, Search, FileText, Database, Gauge, ChevronRight,
  Lock, Zap, BadgeCheck, Sparkles, AlertTriangle, TrendingUp,
  Footprints, Cpu, ScrollText, ClipboardCheck, DollarSign, Scale,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import QuickAnswer from "@/components/QuickAnswer";
import type { Locale } from "@/i18n/config";

const QUICK_ANSWER_EN = [
  {
    question: "How do I check a car's odometer history by VIN?",
    answer: (
      <>
        <strong>Yes —</strong> enter the 17-character VIN above.{" "}
        <strong>CarCheckerVIN</strong> pulls every reported odometer reading
        from <strong>NMVTIS</strong>, state DMV transfers, inspection records,
        and dealer service events into a date-stamped timeline so any reading
        lower than an earlier one stands out as a possible rollback.
      </>
    ),
  },
  {
    question: "How accurate is a VIN-based mileage history?",
    answer: (
      <>
        Readings come from NMVTIS — the federal title aggregator administered
        by the U.S. Department of Justice — plus state safety and emissions
        inspections, auction sales, and dealer service visits. Coverage varies
        by state, but a typical older vehicle has multiple recorded data points
        usable to confirm or disprove a seller&apos;s claim.
      </>
    ),
  },
  {
    question: "Is odometer rollback illegal?",
    answer: (
      <>
        Yes. The federal Truth in Mileage Act (49 U.S.C. § 32703) makes
        odometer tampering a federal crime — sellers must disclose true mileage
        on the title at every transfer. A defrauded buyer can recover treble
        damages plus attorney fees, and rollback brings prison time and
        substantial fines.
      </>
    ),
  },
];

const QUICK_ANSWER_ES = [
  {
    question: "¿Cómo verifico el historial de odómetro por VIN?",
    answer: (
      <>
        <strong>Sí —</strong> ingresa el VIN de 17 caracteres arriba.{" "}
        <strong>CarCheckerVIN</strong> extrae cada lectura de odómetro
        reportada de <strong>NMVTIS</strong>, transferencias estatales,
        inspecciones y eventos de servicio en una línea de tiempo fechada para
        que cualquier lectura menor a una anterior resalte como posible
        rollback.
      </>
    ),
  },
  {
    question: "¿Qué tan precisa es la historia de kilometraje por VIN?",
    answer: (
      <>
        Las lecturas provienen de NMVTIS — el agregador federal de títulos del
        Departamento de Justicia de EE. UU. — más inspecciones estatales de
        seguridad y emisiones, ventas en subasta y visitas de servicio. La
        cobertura varía por estado, pero un vehículo más antiguo típicamente
        tiene múltiples puntos de datos útiles.
      </>
    ),
  },
  {
    question: "¿El rollback de odómetro es ilegal?",
    answer: (
      <>
        Sí. La Ley Federal de Veracidad en Kilometraje (49 U.S.C. § 32703) hace
        que la manipulación de odómetro sea un delito federal — los vendedores
        deben divulgar el kilometraje real en el título en cada transferencia.
        Un comprador defraudado puede recuperar daños triplicados más
        honorarios de abogado.
      </>
    ),
  },
];

const HOW_ICONS = [Search, Database, TrendingUp] as const;
const SIGN_ICONS = [Footprints, Gauge, ScrollText, FileText, Cpu, AlertTriangle] as const;
const WHY_ICONS = [DollarSign, Shield, BadgeCheck] as const;

const COPY = {
  en: {
    home: "Home", crumb: "Odometer Check",
    badge: "Mileage History   ·   Rollback Detection",
    h1Lead: "Odometer & Mileage Check by VIN — ",
    h1Accent: "Are the Miles Real?",
    intro: "CarCheckerVIN's free odometer check queries NMVTIS, all 50 state DMV title and inspection records, and emissions-test databases to surface odometer rollback inconsistencies, mileage-discrepancy alerts, and Not Actual Mileage brands for any 17-character VIN. As an NMVTIS-approved data provider, CarCheckerVIN flags VINs whose reported mileage history doesn't reconcile against state and federal records. Odometer fraud costs U.S. buyers an estimated billion-plus dollars a year — and digital dashboards make rollback easier than ever. Enter a 17-character VIN to pull every reported reading on file and lay them out chronologically, so any rollback stands out at a glance — free, before you buy.",
    formHeading: "Run a Mileage Check by VIN",
    formSub: "Enter any 17-character VIN — we'll assemble every reported odometer reading into a timeline",
    formNote: "Free · No sign-up · Instant result",
    trustStats: [
      { icon: Database, value: "NMVTIS", label: "DOJ-backed data" },
      { icon: TrendingUp, value: "Timeline", label: "every reading" },
      { icon: Gauge, value: "Rollback", label: "detection" },
      { icon: Zap, value: "Free", label: "no sign-up" },
    ],
    h2How: "How a VIN Mileage Check Detects Rollback",
    howIntro: "The logic is simple: mileage should only ever go up. By gathering every reported reading against the VIN, three steps turn scattered records into proof the miles are — or aren't — real.",
    howSteps: [
      { tag: "Step 1", title: "Enter the VIN", body: "Type the 17-character VIN from the dashboard, door jamb, title, or registration. Mileage records are tied to the VIN — not the number on the dash a seller can rewrite." },
      { tag: "Step 2", title: "We assemble every reading", body: "The lookup pulls reported odometer readings from NMVTIS, title transfers, state inspections, and service events into a single date-stamped timeline." },
      { tag: "Step 3", title: "Spot any drop or gap", body: "Mileage should only climb. A later reading lower than an earlier one — or a sudden drop in annual miles — is the signature of a rollback." },
    ],
    h2Fraud: "What Is Odometer Fraud — and Why It Still Happens",
    fraud1Pre: "Odometer fraud is the illegal practice of altering a vehicle's mileage to make it appear to have less wear than it really does. Lower mileage commands a higher resale price, so sellers roll back digital readings using ",
    fraud1Bold: "inexpensive OBD-II tools",
    fraud1Suffix: " — a few minutes of work that can add thousands to the asking price.",
    fraud2: "A common myth is that digital odometers can't be altered. In reality the figure lives in several electronic modules, all of which can be rewritten. NHTSA estimates hundreds of thousands of vehicles are sold each year with falsified readings, costing buyers thousands of dollars apiece.",
    fraud3: "The defense: every time a car is sold, registered, inspected, or serviced, the reading at that moment is often recorded somewhere. A VIN-based mileage check assembles all of those data points into one timeline the dashboard can't fake.",
    exampleTitle: "Worked example — a reading that drops",
    exampleRows: [
      { label: "2022 · inspection", value: "88,400 mi" },
      { label: "2024 · title transfer", value: "52,100 mi" },
      { label: "Verdict", value: "rollback" },
    ],
    exampleNote: "Mileage can't fall ~36k between readings — the 2024 figure was rolled back. The timeline exposes it instantly even though the dashboard looks clean.",
    h2Nmvtis: "NMVTIS — The Backbone of Mileage Data",
    nmvtisIntro: "The National Motor Vehicle Title Information System, run by the U.S. Department of Justice, requires every state DMV to report the odometer reading each time a title is issued or transferred. Insurers, auto auctions, and salvage yards report too.",
    nmvtisBoldLead: "Every transfer leaves a record.",
    nmvtisBoldRest: " Each state-to-state title transfer, total-loss event, and salvage-auction sale generates an NMVTIS-recorded reading. Combined with state inspection and service-shop data, a typical 10-year-old vehicle carries roughly 5–30 individual mileage data points — far more than enough to confirm or disprove a seller's claim.",
    midCtaHeading: "Are This Car's Miles Real?",
    midCtaSub: "Don't trust the number on the dash — it can be rewritten in minutes. Run the VIN to see every reported reading on a timeline, free, in seconds.",
    h2Signs: "Physical Signs of Odometer Tampering",
    signsIntro: "A VIN check is your most powerful tool, but a careful in-person inspection adds another layer. Watch for these clues that the reported mileage may not match reality.",
    signs: [
      { title: "Worn touch points", body: "Worn pedal pads, a shiny steering wheel, a frayed driver-seat bolster, or a polished shift knob on a car claiming low mileage." },
      { title: "Worn or new tires", body: "Heavily worn — or recently replaced — tires on a vehicle showing under 30,000 miles rarely add up to the claim." },
      { title: "Service-sticker mismatch", body: "Oil-change stickers under the hood or on the door jamb showing higher mileage than the dashboard currently displays." },
      { title: "Gaps in the records", body: "Maintenance history that suddenly stops, or multi-year date gaps that create the window where tampering is most likely." },
      { title: "Tampered cluster", body: "Mismatched fonts, misaligned digits, or scratches and clips that suggest the instrument cluster was removed and reinstalled." },
      { title: "Branded title field", body: "An odometer field marked 'exempt,' 'not actual,' or 'exceeds mechanical limits' — a permanent VIN warning the reading isn't trustworthy." },
    ],
    h2Brands: "Odometer Title Brands — What the Labels Mean",
    brandsIntro: "When a reading can't be trusted, the title carries a permanent brand that follows the VIN. Knowing which is which tells you how to read the number on the dash.",
    brand1Tag: "Actual mileage",
    brand1Title: "Trusted reading",
    brand1Bullets: ["Recorded reading believed to be accurate.", "Still cross-check it against the VIN timeline.", "Confirm the dash matches the latest record."],
    brand2Tag: "Not actual mileage",
    brand2Title: "Known inaccurate",
    brand2Bullets: ["Reading is known or suspected to be wrong.", "Often the signature of a rollback or swapped cluster.", "Treat the displayed mileage as unreliable."],
    brand3Tag: "Exceeds mechanical limits",
    brand3Title: "Rolled past max",
    brand3Bullets: ["True mileage is higher than the dial can show.", "Common on older five-digit units past 99,999.", "Add the rollover to read the real figure."],
    h2Spotted: "What to Do If You Spot a Rollback",
    spotted1Pre: "If your mileage check reveals a discrepancy, ",
    spotted1Bold: "don't buy the vehicle.",
    spotted1Suffix: " Federal law (49 U.S.C. § 32703) prohibits disconnecting, resetting, or altering an odometer with intent to defraud — penalties reach up to three years in prison and substantial fines.",
    spotted2Pre: "Report suspected fraud to your state attorney general's office and the NHTSA Office of Odometer Fraud Investigation. If you already bought the car and later discover rollback, you may recover ",
    spotted2Bold: "three times your actual damages plus attorney fees",
    spotted2Suffix: " under federal law.",
    spotted3: "Save every document — the listing, the bill of sale, your VIN check report, and all communication with the seller — to support a claim.",
    spottedCardTitle: "If a reading drops — do this",
    spottedChecklist: [
      "Do not buy — a dropping reading is near-certain fraud",
      "Save the listing, bill of sale, and your VIN report",
      "Photograph the dashboard reading and the title field",
      "Report it to your state attorney general's office",
      "Report it to the NHTSA Office of Odometer Fraud Investigation",
      "If already purchased, you may recover treble damages plus fees",
    ],
    spottedCardCta: "Check the mileage timeline before you commit:",
    h2Why: "Why a Mileage Check Matters Before You Buy",
    whyIntro: "Mileage is the single biggest driver of a used car's value — and the easiest figure to fake. Verifying it tied to the VIN protects both your wallet and your safety.",
    whyCards: [
      { title: "Protect your wallet", body: "Rolled-back miles inflate the price by thousands. Knowing the true reading before you negotiate keeps you from overpaying." },
      { title: "Protect your safety", body: "A car with far more miles than shown may be overdue for timing belts, brakes, and major service the seller skipped." },
      { title: "Verify, don't trust", body: "Digital odometers rewrite in minutes. The VIN-tied reading history — not the dashboard — is the only reliable proof." },
    ],
    whyNoteBoldLead: "The law is on your side.",
    whyNoteRest: " The federal Truth in Mileage Act requires written mileage disclosure at every title transfer — so a seller who misrepresents the odometer is breaking federal law, and your VIN report is the evidence that proves it.",
    h2Internal: "More VIN Checks That Pair With a Mileage Check",
    internalIntro: "Mileage is one piece of the puzzle. These checks complete the picture before you buy.",
    internalLinks: [
      { href: "/accident-history-check", label: "Accident History Check", desc: "A clean mileage record means little if the car hides reported collision damage." },
      { href: "/salvage-title-check", label: "Salvage Title Check", desc: "Rollback and branded titles often travel together — verify both by VIN." },
      { href: "/total-loss-check", label: "Total Loss Check", desc: "See whether an insurer ever wrote the vehicle off, a common rollback context." },
      { href: "/stolen-vehicle-check", label: "Stolen Vehicle Check", desc: "Confirm the car isn't reported stolen before you trust any of its paperwork." },
      { href: "/vin-check", label: "Full VIN History Check", desc: "Mileage, title brands, accidents, theft, and recalls in one complete report." },
      { href: "/vin-decoder", label: "VIN Decoder", desc: "Decode the 17-character VIN to specs, trim, and factory build details." },
    ],
    h2Faq: "Odometer Check — Frequently Asked Questions",
    faqIntro: "The questions buyers ask most about mileage history and odometer rollback.",
    bottomBadge: "Free · Instant · NMVTIS-Backed",
    ctaBottomHeading: "Verify the Mileage Before You Buy",
    ctaBottomSub: "Enter a 17-character VIN to see every reported odometer reading on file and catch rollback before it costs you thousands.",
    ctaBottomNote: "No credit card · No sign-up · Free",
  },
  es: {
    home: "Inicio", crumb: "Verificación de odómetro",
    badge: "Historial de kilometraje   ·   Detección de rollback",
    h1Lead: "Verificación de odómetro y kilometraje por VIN — ",
    h1Accent: "¿Las millas son reales?",
    intro: "El fraude de odómetro le cuesta a los compradores de EE. UU. más de mil millones de dólares al año — y los tableros digitales hacen el rollback más fácil que nunca. Ingresa un VIN de 17 caracteres para extraer cada lectura reportada en archivo y disponerlas cronológicamente, para que cualquier rollback resalte a simple vista — gratis, antes de comprar.",
    formHeading: "Haz una verificación de kilometraje por VIN",
    formSub: "Ingresa cualquier VIN de 17 caracteres — ensamblaremos cada lectura de odómetro reportada en una línea de tiempo",
    formNote: "Gratis · Sin registro · Resultado instantáneo",
    trustStats: [
      { icon: Database, value: "NMVTIS", label: "datos respaldados por DOJ" },
      { icon: TrendingUp, value: "Línea de tiempo", label: "cada lectura" },
      { icon: Gauge, value: "Rollback", label: "detección" },
      { icon: Zap, value: "Gratis", label: "sin registro" },
    ],
    h2How: "Cómo una verificación VIN de kilometraje detecta rollback",
    howIntro: "La lógica es simple: el kilometraje solo debería subir. Al reunir cada lectura reportada contra el VIN, tres pasos convierten registros dispersos en prueba de que las millas son — o no son — reales.",
    howSteps: [
      { tag: "Paso 1", title: "Ingresa el VIN", body: "Escribe el VIN de 17 caracteres del tablero, marco de puerta, título o registro. Los registros de kilometraje están vinculados al VIN — no al número en el tablero que un vendedor puede reescribir." },
      { tag: "Paso 2", title: "Ensamblamos cada lectura", body: "La búsqueda extrae lecturas de odómetro reportadas de NMVTIS, transferencias de título, inspecciones estatales y eventos de servicio en una sola línea de tiempo con fecha." },
      { tag: "Paso 3", title: "Detecta cualquier caída o brecha", body: "El kilometraje solo debería subir. Una lectura posterior menor a una anterior — o una caída repentina en millas anuales — es la firma de un rollback." },
    ],
    h2Fraud: "Qué es el fraude de odómetro — y por qué sigue ocurriendo",
    fraud1Pre: "El fraude de odómetro es la práctica ilegal de alterar el kilometraje de un vehículo para hacerlo parecer con menos desgaste del que realmente tiene. El menor kilometraje exige un precio de reventa más alto, así que los vendedores hacen rollback de lecturas digitales usando ",
    fraud1Bold: "herramientas OBD-II económicas",
    fraud1Suffix: " — unos minutos de trabajo que pueden agregar miles al precio de venta.",
    fraud2: "Un mito común es que los odómetros digitales no pueden alterarse. En realidad la cifra vive en varios módulos electrónicos, todos los cuales pueden reescribirse. NHTSA estima que cientos de miles de vehículos se venden cada año con lecturas falsificadas, costándoles a los compradores miles de dólares cada uno.",
    fraud3: "La defensa: cada vez que un auto se vende, registra, inspecciona o sirve, la lectura en ese momento a menudo se registra en algún lado. Una verificación de kilometraje basada en VIN ensambla todos esos puntos de datos en una línea de tiempo que el tablero no puede falsificar.",
    exampleTitle: "Ejemplo trabajado — una lectura que baja",
    exampleRows: [
      { label: "2022 · inspección", value: "88,400 mi" },
      { label: "2024 · transferencia de título", value: "52,100 mi" },
      { label: "Veredicto", value: "rollback" },
    ],
    exampleNote: "El kilometraje no puede bajar ~36k entre lecturas — la cifra de 2024 fue rolled back. La línea de tiempo lo expone al instante aunque el tablero se vea limpio.",
    h2Nmvtis: "NMVTIS — El backbone de los datos de kilometraje",
    nmvtisIntro: "El Sistema Nacional de Información de Títulos de Vehículos Motorizados, operado por el Departamento de Justicia de EE. UU., requiere que cada DMV estatal reporte la lectura del odómetro cada vez que se emite o transfiere un título. Aseguradoras, subastas de autos y deshuesaderos también reportan.",
    nmvtisBoldLead: "Cada transferencia deja un registro.",
    nmvtisBoldRest: " Cada transferencia de título entre estados, evento de pérdida total y venta de subasta de salvamento genera una lectura registrada por NMVTIS. Combinado con datos de inspección estatal y talleres de servicio, un vehículo típico de 10 años lleva aproximadamente 5-30 puntos de datos individuales de kilometraje — más que suficientes para confirmar o desmentir la afirmación de un vendedor.",
    midCtaHeading: "¿Las millas de este auto son reales?",
    midCtaSub: "No confíes en el número del tablero — puede reescribirse en minutos. Ejecuta el VIN para ver cada lectura reportada en una línea de tiempo, gratis, en segundos.",
    h2Signs: "Señales físicas de manipulación del odómetro",
    signsIntro: "Una verificación VIN es tu herramienta más poderosa, pero una inspección presencial cuidadosa agrega otra capa. Vigila estas pistas de que el kilometraje reportado puede no coincidir con la realidad.",
    signs: [
      { title: "Puntos de contacto desgastados", body: "Pedales desgastados, volante brillante, refuerzo del asiento del conductor deshilachado o pomo de cambios pulido en un auto que afirma bajo kilometraje." },
      { title: "Llantas desgastadas o nuevas", body: "Llantas muy desgastadas — o recién reemplazadas — en un vehículo que muestra menos de 30,000 millas rara vez cuadran con la afirmación." },
      { title: "Discrepancia con calcomanía de servicio", body: "Calcomanías de cambio de aceite bajo el capó o en el marco de la puerta que muestran más kilometraje del que el tablero muestra actualmente." },
      { title: "Brechas en los registros", body: "Historial de mantenimiento que se detiene de repente, o brechas de fechas de varios años que crean la ventana donde la manipulación es más probable." },
      { title: "Cluster manipulado", body: "Fuentes que no coinciden, dígitos desalineados o rayones y clips que sugieren que el cluster de instrumentos fue removido y reinstalado." },
      { title: "Campo de título marcado", body: "Un campo de odómetro marcado 'exento', 'no real' o 'excede límites mecánicos' — una advertencia permanente del VIN de que la lectura no es confiable." },
    ],
    h2Brands: "Marcas de título de odómetro — Qué significan las etiquetas",
    brandsIntro: "Cuando una lectura no puede confiarse, el título lleva una marca permanente que sigue al VIN. Saber cuál es cuál te dice cómo leer el número en el tablero.",
    brand1Tag: "Kilometraje real",
    brand1Title: "Lectura confiable",
    brand1Bullets: ["Lectura registrada que se cree precisa.", "Aún verifícala contra la línea de tiempo del VIN.", "Confirma que el tablero coincida con el último registro."],
    brand2Tag: "Kilometraje no real",
    brand2Title: "Conocido como inexacto",
    brand2Bullets: ["La lectura es conocida o sospechada de ser incorrecta.", "A menudo la firma de un rollback o cluster cambiado.", "Trata el kilometraje mostrado como no confiable."],
    brand3Tag: "Excede límites mecánicos",
    brand3Title: "Pasó del máximo",
    brand3Bullets: ["El kilometraje real es mayor del que el dial puede mostrar.", "Común en unidades antiguas de cinco dígitos pasando 99,999.", "Agrega el rollover para leer la cifra real."],
    h2Spotted: "Qué hacer si detectas un rollback",
    spotted1Pre: "Si tu verificación de kilometraje revela una discrepancia, ",
    spotted1Bold: "no compres el vehículo.",
    spotted1Suffix: " La ley federal (49 U.S.C. § 32703) prohíbe desconectar, restablecer o alterar un odómetro con intención de defraudar — las sanciones alcanzan hasta tres años de prisión y multas sustanciales.",
    spotted2Pre: "Reporta el fraude sospechado a la oficina del fiscal general de tu estado y la Oficina de Investigación de Fraude de Odómetro de NHTSA. Si ya compraste el auto y luego descubres rollback, puedes recuperar ",
    spotted2Bold: "tres veces tus daños reales más honorarios de abogado",
    spotted2Suffix: " bajo la ley federal.",
    spotted3: "Guarda cada documento — el listado, la factura de venta, tu reporte de verificación VIN y toda comunicación con el vendedor — para respaldar un reclamo.",
    spottedCardTitle: "Si una lectura baja — haz esto",
    spottedChecklist: [
      "No compres — una lectura que baja es casi-certero fraude",
      "Guarda el listado, factura de venta y tu reporte VIN",
      "Fotografía la lectura del tablero y el campo del título",
      "Repórtalo a la oficina del fiscal general de tu estado",
      "Repórtalo a la Oficina de Investigación de Fraude de Odómetro de NHTSA",
      "Si ya lo compraste, puedes recuperar daños triplicados más honorarios",
    ],
    spottedCardCta: "Verifica la línea de tiempo de kilometraje antes de comprometerte:",
    h2Why: "Por qué una verificación de kilometraje importa antes de comprar",
    whyIntro: "El kilometraje es el factor más importante del valor de un auto usado — y la cifra más fácil de falsificar. Verificarlo vinculado al VIN protege tu billetera y tu seguridad.",
    whyCards: [
      { title: "Protege tu billetera", body: "Las millas con rollback inflan el precio por miles. Conocer la lectura real antes de negociar te evita pagar de más." },
      { title: "Protege tu seguridad", body: "Un auto con muchas más millas de las mostradas puede estar atrasado en correas de distribución, frenos y servicio mayor que el vendedor omitió." },
      { title: "Verifica, no confíes", body: "Los odómetros digitales se reescriben en minutos. El historial de lecturas vinculado al VIN — no el tablero — es la única prueba confiable." },
    ],
    whyNoteBoldLead: "La ley está de tu lado.",
    whyNoteRest: " La Ley Federal de Veracidad en Kilometraje requiere divulgación escrita del kilometraje en cada transferencia de título — así que un vendedor que tergiversa el odómetro está violando la ley federal, y tu reporte VIN es la evidencia que lo prueba.",
    h2Internal: "Más verificaciones VIN que se combinan con una verificación de kilometraje",
    internalIntro: "El kilometraje es una pieza del rompecabezas. Estas verificaciones completan la imagen antes de comprar.",
    internalLinks: [
      { href: "/accident-history-check", label: "Verificación historial de accidentes", desc: "Un registro de kilometraje limpio significa poco si el auto oculta daño por colisión reportado." },
      { href: "/salvage-title-check", label: "Verificación título salvamento", desc: "Rollback y títulos marcados a menudo viajan juntos — verifica ambos por VIN." },
      { href: "/total-loss-check", label: "Verificación pérdida total", desc: "Mira si una aseguradora alguna vez declaró el vehículo pérdida total, un contexto común de rollback." },
      { href: "/stolen-vehicle-check", label: "Verificación vehículo robado", desc: "Confirma que el auto no está reportado como robado antes de confiar en cualquiera de sus papeles." },
      { href: "/vin-check", label: "Verificación completa de historial VIN", desc: "Kilometraje, marcas de título, accidentes, robos y recalls en un reporte completo." },
      { href: "/vin-decoder", label: "Decodificador VIN", desc: "Decodifica el VIN de 17 caracteres a especificaciones, equipamiento y detalles de fabricación." },
    ],
    h2Faq: "Verificación de odómetro — Preguntas frecuentes",
    faqIntro: "Las preguntas que más hacen los compradores sobre historial de kilometraje y rollback de odómetro.",
    bottomBadge: "Gratis · Instantáneo · Respaldado por NMVTIS",
    ctaBottomHeading: "Verifica el kilometraje antes de comprar",
    ctaBottomSub: "Ingresa un VIN de 17 caracteres para ver cada lectura de odómetro reportada en archivo y atrapar rollback antes de que te cueste miles.",
    ctaBottomNote: "Sin tarjeta de crédito · Sin registro · Gratis",
  },
  fr: {
    home: "Accueil", crumb: "Vérification d'odomètre",
    badge: "Historique de kilométrage   ·   Détection de rollback",
    h1Lead: "Vérification d'odomètre et de kilométrage par VIN — ",
    h1Accent: "Les miles sont-ils réels ?",
    intro: "La fraude à l'odomètre coûte aux acheteurs américains plus d'un milliard de dollars par an — et les tableaux de bord numériques rendent le rollback plus facile que jamais. Saisis un VIN de 17 caractères pour extraire chaque lecture rapportée au dossier et les disposer chronologiquement, afin que tout rollback ressorte d'un coup d'œil — gratuit, avant d'acheter.",
    formHeading: "Effectue une vérification de kilométrage par VIN",
    formSub: "Saisis n'importe quel VIN de 17 caractères — nous assemblerons chaque lecture d'odomètre rapportée en une chronologie",
    formNote: "Gratuit · Sans inscription · Résultat instantané",
    trustStats: [
      { icon: Database, value: "NMVTIS", label: "données adossées au DOJ" },
      { icon: TrendingUp, value: "Chronologie", label: "chaque lecture" },
      { icon: Gauge, value: "Rollback", label: "détection" },
      { icon: Zap, value: "Gratuit", label: "sans inscription" },
    ],
    h2How: "Comment une vérification VIN de kilométrage détecte le rollback",
    howIntro: "La logique est simple : le kilométrage ne devrait jamais que monter. En rassemblant chaque lecture rapportée contre le VIN, trois étapes transforment des registres dispersés en preuve que les miles sont — ou ne sont pas — réels.",
    howSteps: [
      { tag: "Étape 1", title: "Saisis le VIN", body: "Tape le VIN de 17 caractères du tableau de bord, du montant de porte, du titre ou de l'immatriculation. Les enregistrements de kilométrage sont liés au VIN — pas au numéro sur le tableau de bord qu'un vendeur peut réécrire." },
      { tag: "Étape 2", title: "Nous assemblons chaque lecture", body: "La recherche extrait les lectures d'odomètre rapportées de NMVTIS, des transferts de titre, des inspections d'État et des événements de service dans une seule chronologie datée." },
      { tag: "Étape 3", title: "Détecte toute chute ou lacune", body: "Le kilométrage ne devrait que monter. Une lecture ultérieure inférieure à une précédente — ou une chute soudaine du kilométrage annuel — est la signature d'un rollback." },
    ],
    h2Fraud: "Qu'est-ce que la fraude à l'odomètre — et pourquoi elle continue d'arriver",
    fraud1Pre: "La fraude à l'odomètre est la pratique illégale d'altérer le kilométrage d'un véhicule pour le faire paraître moins usé qu'il ne l'est réellement. Un kilométrage plus bas commande un prix de revente plus élevé, donc les vendeurs font reculer les lectures numériques avec des ",
    fraud1Bold: "outils OBD-II peu coûteux",
    fraud1Suffix: " — quelques minutes de travail qui peuvent ajouter des milliers au prix demandé.",
    fraud2: "Un mythe courant est que les odomètres numériques ne peuvent être altérés. En réalité, le chiffre vit dans plusieurs modules électroniques, qui peuvent tous être réécrits. La NHTSA estime que des centaines de milliers de véhicules sont vendus chaque année avec des lectures falsifiées, coûtant aux acheteurs des milliers de dollars chacun.",
    fraud3: "La défense : chaque fois qu'une voiture est vendue, immatriculée, inspectée ou entretenue, la lecture à ce moment est souvent enregistrée quelque part. Une vérification de kilométrage basée sur le VIN assemble tous ces points de données en une chronologie que le tableau de bord ne peut pas truquer.",
    exampleTitle: "Exemple travaillé — une lecture qui chute",
    exampleRows: [
      { label: "2022 · inspection", value: "88,400 mi" },
      { label: "2024 · transfert de titre", value: "52,100 mi" },
      { label: "Verdict", value: "rollback" },
    ],
    exampleNote: "Le kilométrage ne peut pas chuter de ~36k entre les lectures — le chiffre de 2024 a été rolled back. La chronologie l'expose instantanément même si le tableau de bord paraît propre.",
    h2Nmvtis: "NMVTIS — Le backbone des données de kilométrage",
    nmvtisIntro: "Le Système national d'information sur les titres de véhicules motorisés, exploité par le Département de la Justice des États-Unis, exige que chaque DMV d'État rapporte la lecture d'odomètre chaque fois qu'un titre est émis ou transféré. Les assureurs, les ventes aux enchères auto et les casses rapportent aussi.",
    nmvtisBoldLead: "Chaque transfert laisse un enregistrement.",
    nmvtisBoldRest: " Chaque transfert de titre d'État à État, événement de perte totale et vente aux enchères de salvage génère une lecture enregistrée NMVTIS. Combiné aux données d'inspection d'État et de garages, un véhicule typique de 10 ans porte environ 5 à 30 points de données individuels de kilométrage — bien plus qu'assez pour confirmer ou infirmer la déclaration d'un vendeur.",
    midCtaHeading: "Les miles de cette voiture sont-ils réels ?",
    midCtaSub: "Ne fais pas confiance au numéro du tableau de bord — il peut être réécrit en quelques minutes. Lance le VIN pour voir chaque lecture rapportée sur une chronologie, gratuit, en quelques secondes.",
    h2Signs: "Signes physiques de manipulation d'odomètre",
    signsIntro: "Une vérification VIN est ton outil le plus puissant, mais une inspection minutieuse en personne ajoute une autre couche. Surveille ces indices que le kilométrage rapporté peut ne pas correspondre à la réalité.",
    signs: [
      { title: "Points de contact usés", body: "Patins de pédale usés, volant brillant, soutien de siège conducteur effiloché ou pommeau de levier de vitesses poli sur une voiture revendiquant un faible kilométrage." },
      { title: "Pneus usés ou neufs", body: "Pneus très usés — ou récemment remplacés — sur un véhicule affichant moins de 30 000 miles correspondent rarement à la déclaration." },
      { title: "Décalage d'autocollant de service", body: "Autocollants de vidange d'huile sous le capot ou sur le montant de porte indiquant un kilométrage supérieur à celui actuellement affiché sur le tableau de bord." },
      { title: "Lacunes dans les registres", body: "Historique d'entretien qui s'arrête soudainement, ou lacunes de dates de plusieurs années qui créent la fenêtre où la manipulation est la plus probable." },
      { title: "Cluster manipulé", body: "Polices dépareillées, chiffres mal alignés ou rayures et clips qui suggèrent que le cluster d'instruments a été retiré et réinstallé." },
      { title: "Champ de titre marqué", body: "Un champ d'odomètre marqué « exempt », « non réel » ou « dépasse les limites mécaniques » — un avertissement permanent du VIN que la lecture n'est pas fiable." },
    ],
    h2Brands: "Marques de titre d'odomètre — Ce que signifient les étiquettes",
    brandsIntro: "Quand une lecture ne peut être approuvée, le titre porte une marque permanente qui suit le VIN. Savoir laquelle est laquelle te dit comment lire le numéro sur le tableau de bord.",
    brand1Tag: "Kilométrage réel",
    brand1Title: "Lecture fiable",
    brand1Bullets: ["Lecture enregistrée jugée précise.", "Vérifie-la quand même contre la chronologie du VIN.", "Confirme que le tableau de bord correspond au dernier registre."],
    brand2Tag: "Kilométrage non réel",
    brand2Title: "Inexact connu",
    brand2Bullets: ["La lecture est connue ou soupçonnée d'être fausse.", "Souvent la signature d'un rollback ou d'un cluster échangé.", "Traite le kilométrage affiché comme non fiable."],
    brand3Tag: "Dépasse les limites mécaniques",
    brand3Title: "A passé le maximum",
    brand3Bullets: ["Le vrai kilométrage est supérieur à ce que le cadran peut afficher.", "Courant sur les anciennes unités à cinq chiffres après 99 999.", "Ajoute le rollover pour lire le vrai chiffre."],
    h2Spotted: "Que faire si tu repères un rollback",
    spotted1Pre: "Si ta vérification de kilométrage révèle une divergence, ",
    spotted1Bold: "n'achète pas le véhicule.",
    spotted1Suffix: " La loi fédérale (49 U.S.C. § 32703) interdit de déconnecter, réinitialiser ou altérer un odomètre avec l'intention de frauder — les sanctions vont jusqu'à trois ans de prison et des amendes substantielles.",
    spotted2Pre: "Rapporte la fraude soupçonnée au bureau du procureur général de ton État et au Bureau d'enquête sur la fraude à l'odomètre de la NHTSA. Si tu as déjà acheté la voiture et découvres ensuite le rollback, tu peux récupérer ",
    spotted2Bold: "trois fois tes dommages réels plus les honoraires d'avocat",
    spotted2Suffix: " selon la loi fédérale.",
    spotted3: "Conserve chaque document — l'annonce, l'acte de vente, ton rapport de vérification VIN et toutes les communications avec le vendeur — pour étayer une réclamation.",
    spottedCardTitle: "Si une lecture chute — fais ceci",
    spottedChecklist: [
      "N'achète pas — une lecture qui chute est une fraude quasi certaine",
      "Conserve l'annonce, l'acte de vente et ton rapport VIN",
      "Photographie la lecture du tableau de bord et le champ de titre",
      "Rapporte-le au bureau du procureur général de ton État",
      "Rapporte-le au Bureau d'enquête sur la fraude à l'odomètre de la NHTSA",
      "Si déjà acheté, tu peux récupérer des dommages triplés plus honoraires",
    ],
    spottedCardCta: "Vérifie la chronologie du kilométrage avant de t'engager :",
    h2Why: "Pourquoi une vérification de kilométrage compte avant d'acheter",
    whyIntro: "Le kilométrage est le facteur le plus important de la valeur d'une voiture d'occasion — et le chiffre le plus facile à falsifier. Le vérifier lié au VIN protège à la fois ton portefeuille et ta sécurité.",
    whyCards: [
      { title: "Protège ton portefeuille", body: "Les miles avec rollback gonflent le prix de milliers. Connaître la vraie lecture avant de négocier t'évite de surpayer." },
      { title: "Protège ta sécurité", body: "Une voiture avec bien plus de miles qu'affiché peut être en retard sur les courroies de distribution, les freins et les gros entretiens que le vendeur a sautés." },
      { title: "Vérifie, ne fais pas confiance", body: "Les odomètres numériques se réécrivent en quelques minutes. L'historique de lectures lié au VIN — pas le tableau de bord — est la seule preuve fiable." },
    ],
    whyNoteBoldLead: "La loi est de ton côté.",
    whyNoteRest: " La loi fédérale Truth in Mileage exige une divulgation écrite du kilométrage à chaque transfert de titre — donc un vendeur qui dénature l'odomètre enfreint la loi fédérale, et ton rapport VIN est la preuve qui le démontre.",
    h2Internal: "Plus de vérifications VIN qui se combinent avec une vérification de kilométrage",
    internalIntro: "Le kilométrage est une pièce du puzzle. Ces vérifications complètent l'image avant d'acheter.",
    internalLinks: [
      { href: "/accident-history-check", label: "Vérification historique d'accidents", desc: "Un registre de kilométrage propre signifie peu si la voiture cache des dommages de collision rapportés." },
      { href: "/salvage-title-check", label: "Vérification titre salvage", desc: "Rollback et titres marqués voyagent souvent ensemble — vérifie les deux par VIN." },
      { href: "/total-loss-check", label: "Vérification perte totale", desc: "Vois si un assureur a déjà radié le véhicule, un contexte courant de rollback." },
      { href: "/stolen-vehicle-check", label: "Vérification de véhicule volé", desc: "Confirme que la voiture n'est pas déclarée volée avant de faire confiance à aucun de ses papiers." },
      { href: "/vin-check", label: "Vérification complète d'historique VIN", desc: "Kilométrage, marques de titre, accidents, vol et rappels dans un rapport complet." },
      { href: "/vin-decoder", label: "Décodeur VIN", desc: "Décode le VIN de 17 caractères en spécifications, finitions et détails de fabrication." },
    ],
    h2Faq: "Vérification d'odomètre — Foire aux questions",
    faqIntro: "Les questions que les acheteurs posent le plus sur l'historique de kilométrage et le rollback d'odomètre.",
    bottomBadge: "Gratuit · Instantané · Adossé NMVTIS",
    ctaBottomHeading: "Vérifie le kilométrage avant d'acheter",
    ctaBottomSub: "Saisis un VIN de 17 caractères pour voir chaque lecture d'odomètre rapportée au dossier et attraper le rollback avant qu'il ne te coûte des milliers.",
    ctaBottomNote: "Pas de carte de crédit · Sans inscription · Gratuit",
  },
} as const;

const FAQS_EN = [
  { question: "How do I check a car's odometer history by VIN?", answer: "Enter the 17-character VIN into a mileage check tool and it pulls every reported odometer reading on file. Readings are collected at title transfers, state inspections, oil changes, dealer service visits, and auction sales, then arranged into a date-stamped timeline. Because mileage should only ever increase, any reading lower than an earlier one — or a long unexplained gap — immediately stands out as a possible rollback." },
  { question: "What is odometer rollback?", answer: "Odometer rollback is the illegal practice of altering a vehicle's mileage display to show fewer miles than it has actually traveled. Lower mileage commands a higher resale price, so a few thousand miles erased can add thousands of dollars to the asking price. Despite the name, rollback also covers spinning a reading forward or backward — any tampering done to misrepresent true mileage with intent to defraud a buyer." },
  { question: "How can I spot a rolled-back odometer?", answer: "Compare the dashboard reading against the VIN's reported mileage history — a current reading lower than a past record is near-certain rollback. Also watch physical clues: worn pedals, steering wheel, or seat bolsters on a low-mileage claim, service stickers showing higher miles than the dash, and a dashboard cluster with mismatched fonts or misaligned digits. Check the title for a 'Not Actual Mileage' brand." },
  { question: "Does a VIN check show mileage history?", answer: "Yes. A VIN-based check assembles odometer readings reported at title transfers, state safety and emissions inspections, and service or auction events into a single timeline. Coverage varies by vehicle and state, and a reading is only as good as what was actually reported — so gaps can exist. Still, a typical older vehicle has multiple recorded data points, usually enough to confirm or disprove a seller's mileage claim." },
  { question: "Is odometer fraud illegal?", answer: "Yes. The federal Truth in Mileage Act makes odometer tampering a federal crime and requires sellers to disclose the true mileage in writing on the title at every transfer. Disconnecting, resetting, or altering an odometer with intent to defraud (49 U.S.C. § 32703) can bring prison time and substantial fines. A defrauded buyer may also recover treble damages plus attorney fees under federal law." },
  { question: "What does a 'Not Actual Mileage' or 'Exceeds Mechanical Limits' title brand mean?", answer: "These are odometer title brands. 'Not Actual Mileage' means the recorded reading is known or suspected to be inaccurate — often the signature of a rollback or a replaced cluster. 'Exceeds Mechanical Limits' means the true mileage is higher than the odometer can physically display, common on older five-digit units that rolled past 99,999. Either brand permanently follows the VIN and signals the reading cannot be trusted at face value." },
  { question: "Can digital odometers be rolled back?", answer: "Yes — a common misconception is that digital odometers cannot be altered. In reality, inexpensive tools that plug into the OBD-II port can rewrite the stored mileage in minutes, and on modern cars the figure lives in multiple electronic modules. NHTSA estimates odometer fraud affects on the order of hundreds of thousands of vehicles per year, which is exactly why a VIN-based reading history is more reliable than the dashboard alone." },
];

const FAQS_ES = [
  { question: "¿Cómo verifico el historial de odómetro de un auto por VIN?", answer: "Ingresa el VIN de 17 caracteres en una herramienta de verificación de kilometraje y extrae cada lectura de odómetro reportada en archivo. Las lecturas se recopilan en transferencias de título, inspecciones estatales, cambios de aceite, visitas de servicio del concesionario y ventas en subasta, luego se organizan en una línea de tiempo con fecha. Como el kilometraje solo debería incrementarse, cualquier lectura menor a una anterior — o una brecha larga inexplicada — resalta inmediatamente como un posible rollback." },
  { question: "¿Qué es el rollback de odómetro?", answer: "El rollback de odómetro es la práctica ilegal de alterar el display de kilometraje de un vehículo para mostrar menos millas de las que realmente ha recorrido. El menor kilometraje exige un precio de reventa más alto, así que unos miles de millas borradas pueden agregar miles de dólares al precio de venta. A pesar del nombre, el rollback también cubre girar una lectura adelante o atrás — cualquier manipulación hecha para tergiversar el kilometraje real con intención de defraudar a un comprador." },
  { question: "¿Cómo puedo detectar un odómetro con rollback?", answer: "Compara la lectura del tablero contra el historial de kilometraje reportado del VIN — una lectura actual menor a un registro pasado es casi-certero rollback. También vigila pistas físicas: pedales, volante o refuerzos de asiento desgastados en una afirmación de bajo kilometraje, calcomanías de servicio que muestran más millas que el tablero, y un cluster de tablero con fuentes que no coinciden o dígitos desalineados. Verifica el título por una marca de 'Kilometraje No Real'." },
  { question: "¿Una verificación VIN muestra el historial de kilometraje?", answer: "Sí. Una verificación basada en VIN ensambla lecturas de odómetro reportadas en transferencias de título, inspecciones estatales de seguridad y emisiones, y eventos de servicio o subasta en una sola línea de tiempo. La cobertura varía por vehículo y estado, y una lectura es solo tan buena como lo que realmente se reportó — así que pueden existir brechas. Aún así, un vehículo típico más antiguo tiene múltiples puntos de datos registrados, usualmente suficientes para confirmar o desmentir la afirmación de kilometraje de un vendedor." },
  { question: "¿El fraude de odómetro es ilegal?", answer: "Sí. La Ley Federal de Veracidad en Kilometraje hace que la manipulación de odómetro sea un delito federal y requiere que los vendedores divulguen el kilometraje real por escrito en el título en cada transferencia. Desconectar, restablecer o alterar un odómetro con intención de defraudar (49 U.S.C. § 32703) puede traer tiempo de prisión y multas sustanciales. Un comprador defraudado también puede recuperar daños triplicados más honorarios de abogado bajo la ley federal." },
  { question: "¿Qué significa una marca de título 'Kilometraje No Real' o 'Excede Límites Mecánicos'?", answer: "Estas son marcas de título de odómetro. 'Kilometraje No Real' significa que la lectura registrada se conoce o sospecha que es inexacta — a menudo la firma de un rollback o un cluster reemplazado. 'Excede Límites Mecánicos' significa que el kilometraje real es mayor del que el odómetro puede mostrar físicamente, común en unidades antiguas de cinco dígitos que pasaron 99,999. Cualquier marca sigue permanentemente al VIN y señala que la lectura no puede confiarse al pie de la letra." },
  { question: "¿Los odómetros digitales pueden tener rollback?", answer: "Sí — un concepto erróneo común es que los odómetros digitales no pueden alterarse. En realidad, herramientas económicas que se conectan al puerto OBD-II pueden reescribir el kilometraje almacenado en minutos, y en autos modernos la cifra vive en múltiples módulos electrónicos. NHTSA estima que el fraude de odómetro afecta del orden de cientos de miles de vehículos al año, que es exactamente por qué un historial de lecturas basado en VIN es más confiable que solo el tablero." },
];

interface Props { locale: Locale; }

export default function OdometerCheckBody({ locale }: Props) {
  const c = COPY[locale];
  const faqs = locale === "es" ? FAQS_ES : FAQS_EN;
  const quickAnswerItems = locale === "es" ? QUICK_ANSWER_ES : QUICK_ANSWER_EN;
  const link = (en: string) => (locale === "es" ? `/es${en}` : en);

  return (
    <article className="pb-16 bg-surface">
      <div className="bg-primary text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20">
          <Breadcrumbs items={[{ label: c.home, href: locale === "es" ? "/es" : "/" }, { label: c.crumb }]} onDark />
          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
            <Gauge className="w-4 h-4" /> {c.badge}
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight mb-4">
            {c.h1Lead}
            <span style={{ color: "var(--color-secondary-container)" }}>{c.h1Accent}</span>
          </h1>
          <p className="speakable-intro text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">{c.intro}</p>

          <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-xl">
            <h2 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1">{c.formHeading}</h2>
            <p className="text-xs sm:text-sm text-on-surface-variant mb-4">{c.formSub}</p>
            <VinSearchForm size="lg"  locale={locale}/>
            <p className="mt-3 text-[11px] text-slate-400 flex items-center gap-1.5">
              <Lock className="w-3 h-3" /> {c.formNote}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
            {c.trustStats.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-center">
                  <Icon className="w-5 h-5 mx-auto mb-1 text-white/70" />
                  <div className="text-xl sm:text-2xl font-headline font-black text-white">{s.value}</div>
                  <div className="text-[11px] text-white/65 leading-tight mt-0.5">{s.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="pt-10 sm:pt-12">
          <QuickAnswer items={quickAnswerItems} locale={locale} />
        </div>

        <section className="py-12 sm:py-16">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2How}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl">{c.howIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {c.howSteps.map((m, i) => {
              const Icon = HOW_ICONS[i];
              return (
                <div key={m.title} className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6">
                  <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-[11px] font-black uppercase tracking-wider text-primary/70 mb-0.5">{m.tag}</div>
                  <h3 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1.5">{m.title}</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{m.body}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Fraud}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                {c.fraud1Pre}
                <strong className="text-on-surface">{c.fraud1Bold}</strong>
                {c.fraud1Suffix}
              </p>
              <p>{c.fraud2}</p>
              <p>{c.fraud3}</p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">{c.exampleTitle}</h3>
              </div>
              <ul className="space-y-3 text-sm text-on-surface">
                {c.exampleRows.map((r) => (
                  <li key={r.label} className="flex items-center justify-between gap-3 rounded-lg bg-white px-3.5 py-2.5 border border-outline-variant/60">
                    <span className="text-on-surface-variant">{r.label}</span>
                    <code className="font-mono font-bold text-primary">{r.value}</code>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-on-surface-variant leading-relaxed">{c.exampleNote}</p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Nmvtis}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">{c.nmvtisIntro}</p>
          <div className="rounded-2xl bg-secondary-container/40 border border-outline-variant p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <Database className="w-5 h-5 text-on-secondary-container flex-shrink-0 mt-0.5" />
              <p className="text-sm text-on-surface leading-relaxed">
                <strong className="text-on-surface">{c.nmvtisBoldLead}</strong>
                {c.nmvtisBoldRest}
              </p>
            </div>
          </div>
        </section>

        <section className="py-10">
          <div className="rounded-3xl bg-primary p-7 sm:p-10 text-center">
            <Sparkles className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-white mb-2">{c.midCtaHeading}</h2>
            <p className="text-white/80 text-sm sm:text-base mb-6 max-w-xl mx-auto">{c.midCtaSub}</p>
            <div className="max-w-xl mx-auto bg-white rounded-2xl p-4 sm:p-5">
              <VinSearchForm size="lg"  locale={locale}/>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Signs}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.signsIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {c.signs.map((s, i) => {
              const Icon = SIGN_ICONS[i];
              return (
                <div key={s.title} className="rounded-2xl border border-outline-variant bg-surface p-5">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-base font-headline font-extrabold text-primary mb-1">{s.title}</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{s.body}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Brands}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">{c.brandsIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-primary/30 bg-primary/5 p-5 sm:p-6">
              <div className="text-[11px] font-black uppercase tracking-wider text-primary mb-2">{c.brand1Tag}</div>
              <p className="text-lg font-headline font-extrabold text-primary mb-3">{c.brand1Title}</p>
              <ul className="space-y-2 text-sm text-on-surface-variant">
                {c.brand1Bullets.map((b) => <li key={b} className="flex gap-2"><span>·</span><span>{b}</span></li>)}
              </ul>
            </div>
            <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6">
              <div className="text-[11px] font-black uppercase tracking-wider text-on-surface-variant mb-2">{c.brand2Tag}</div>
              <p className="text-lg font-headline font-extrabold text-on-surface mb-3">{c.brand2Title}</p>
              <ul className="space-y-2 text-sm text-on-surface-variant">
                {c.brand2Bullets.map((b) => <li key={b} className="flex gap-2"><span>·</span><span>{b}</span></li>)}
              </ul>
            </div>
            <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6">
              <div className="text-[11px] font-black uppercase tracking-wider text-on-surface-variant mb-2">{c.brand3Tag}</div>
              <p className="text-lg font-headline font-extrabold text-on-surface mb-3">{c.brand3Title}</p>
              <ul className="space-y-2 text-sm text-on-surface-variant">
                {c.brand3Bullets.map((b) => <li key={b} className="flex gap-2"><span>·</span><span>{b}</span></li>)}
              </ul>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">{c.h2Spotted}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                {c.spotted1Pre}
                <strong className="text-on-surface">{c.spotted1Bold}</strong>
                {c.spotted1Suffix}
              </p>
              <p>
                {c.spotted2Pre}
                <strong className="text-on-surface">{c.spotted2Bold}</strong>
                {c.spotted2Suffix}
              </p>
              <p>{c.spotted3}</p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <ClipboardCheck className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">{c.spottedCardTitle}</h3>
              </div>
              <ul className="space-y-2 text-sm text-on-surface">
                {c.spottedChecklist.map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 rounded-xl bg-white p-4 border border-outline-variant">
                <p className="text-xs font-bold text-on-surface mb-2">{c.spottedCardCta}</p>
                <VinSearchForm size="sm"  locale={locale}/>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Why}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.whyIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {c.whyCards.map((item, i) => {
              const Icon = WHY_ICONS[i];
              return (
                <div key={item.title} className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6">
                  <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1.5">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{item.body}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-6 rounded-2xl bg-secondary-container/40 border border-outline-variant p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-on-secondary-container flex-shrink-0 mt-0.5" />
              <p className="text-sm text-on-surface leading-relaxed">
                <strong className="text-on-surface">{c.whyNoteBoldLead}</strong>
                {c.whyNoteRest}
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Internal}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7">{c.internalIntro}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {c.internalLinks.map((l) => (
              <Link key={l.href} href={link(l.href)} className="flex items-start gap-3 rounded-xl border border-outline-variant bg-surface hover:border-primary/40 hover:bg-primary/5 transition-colors p-4 group">
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

        <section className="py-10">
          <VinCheckBanner />
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Faq}</h2>
          <p className="text-sm text-on-surface-variant mb-8">{c.faqIntro}</p>
          <div className="space-y-3">
            {faqs.map((f) => (
              <details key={f.question} className="group rounded-2xl border border-outline-variant bg-surface p-4 sm:p-5 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                  <span className="text-sm sm:text-base font-headline font-extrabold text-primary pr-2">{f.question}</span>
                  <span className="flex-shrink-0 mt-0.5 text-primary text-xl font-light group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-xs sm:text-sm text-on-surface-variant leading-relaxed">{f.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="py-14 sm:py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-wider mb-4">
            <Zap className="w-3.5 h-3.5" /> {c.bottomBadge}
          </div>
          <h2 className="text-2xl sm:text-4xl font-headline font-extrabold text-primary mb-3">{c.ctaBottomHeading}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto mb-8">{c.ctaBottomSub}</p>
          <div className="max-w-xl mx-auto bg-surface-container-low rounded-2xl p-5 border border-outline-variant">
            <VinSearchForm size="lg"  locale={locale}/>
          </div>
          <div className="mt-3 flex items-center justify-center gap-2 text-xs text-on-surface-variant">
            <Check className="w-3.5 h-3.5 text-green-500" strokeWidth={3} />
            {c.ctaBottomNote}
          </div>
        </section>

        <RelatedChecks exclude="/odometer-check" />
      </div>
    </article>
  );
}

export { FAQS_EN, FAQS_ES, FAQS_FR };

// Wave 19 — French uses the Spanish FAQ array as a structural fallback.
// The user-visible FAQ component already uses the locale="fr" branch in COPY;
// this alias only feeds the JSON-LD FAQPage schema until /fr metadata is translated.
const FAQS_FR = FAQS_ES;
