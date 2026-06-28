/**
 * Shared body for /warranty-check and /es/warranty-check.
 * Wave 18 batch 3 — full English layout in both locales via COPY={en,es}.
 */

import Link from "next/link";
import {
  Check, Shield, ShieldCheck, Search, FileText, CalendarClock, ChevronRight,
  Lock, Zap, BadgeCheck, Sparkles, Cog, Wrench, Gauge, ClipboardCheck,
  AlertTriangle, BatteryCharging, ShieldOff, DollarSign,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import type { Locale } from "@/i18n/config";

const HOW_ICONS = [Search, CalendarClock, FileText] as const;
const COVERAGE_ICONS = [ShieldCheck, Cog, Wrench, Gauge, BatteryCharging, BadgeCheck] as const;
const VOID_ICONS = [Cog, AlertTriangle, Gauge, Wrench] as const;
const WHY_ICONS = [DollarSign, ShieldCheck, BadgeCheck] as const;

const COPY = {
  en: {
    home: "Home", crumb: "Warranty Check",
    badge: "Coverage Lookup   ·   In-Service-Date Based",
    h1Lead: "Warranty Check by VIN — ",
    h1Accent: "Is This Car Still Covered?",
    intro: "Remaining factory warranty is one of the most valuable — and most misrepresented — selling points on a used car. Enter a 17-character VIN to find the in-service date and estimate the bumper-to-bumper, powertrain, corrosion, emissions, EV-battery, and CPO coverage that's likely still active — free preview, before you buy.",
    formHeading: "Check Warranty Status by VIN",
    formSub: "Enter any 17-character VIN — we'll find the in-service date so you can estimate remaining factory and CPO coverage",
    formNote: "Free preview · No sign-up · Instant result",
    trustStats: [
      { icon: CalendarClock, value: "In-service", label: "date-based" },
      { icon: Shield, value: "6 coverages", label: "factory + CPO" },
      { icon: BadgeCheck, value: "Transfers", label: "with the VIN" },
      { icon: Zap, value: "Free preview", label: "no sign-up" },
    ],
    h2How: "How a VIN Warranty Check Works",
    howIntro: "Warranty coverage is tracked by the manufacturer against the VIN and its in-service date. Three steps turn that into a clear picture of what's likely still covered.",
    howSteps: [
      { tag: "Step 1", title: "Enter the VIN", body: "Type the 17-character VIN from the dashboard, door jamb, title, or registration. Warranty coverage is keyed to the VIN and its in-service date — not the model year or the owner." },
      { tag: "Step 2", title: "We find the in-service date", body: "The lookup retrieves the in-service date (first retail sale) and vehicle details. That date — plus current mileage — is what every factory coverage clock is measured against." },
      { tag: "Step 3", title: "Estimate remaining coverage", body: "Compare elapsed time and mileage to each coverage limit to see what's likely still active. Confirm exact figures and any CPO extension with the manufacturer or a franchised dealer." },
    ],
    h2Coverages: "The Coverages on a Typical New-Car Warranty",
    coveragesIntro: "A new vehicle ships with several separate coverages, each on its own time-and-mileage clock. Knowing which is which is essential when you value a used car — the figures below are industry-typical and vary by brand.",
    coverages: [
      { title: "Bumper-to-bumper", body: "Covers virtually all components except normal wear items. Commonly around 3 years / 36,000 miles, though it varies by brand. Usually the first coverage to expire." },
      { title: "Powertrain", body: "Covers the engine, transmission, and drivetrain. Often around 5 years / 60,000 miles — up to 10 years / 100,000 miles for some brands such as Hyundai and Kia." },
      { title: "Corrosion / rust", body: "Covers rust-through perforation of body panels. Typically 5–7 years, frequently with no mileage limit at all." },
      { title: "Emissions", body: "Federally mandated coverage for emission-control components. Major parts are commonly covered around 8 years / 80,000 miles." },
      { title: "EV battery", body: "Electric-vehicle battery packs carry their own warranty, often around 8 years / 100,000 miles under federal requirements." },
      { title: "CPO coverage", body: "Certified Pre-Owned programs add manufacturer-backed coverage on top of the factory warranty when a used car passes a certified inspection." },
    ],
    coveragesNoteBoldLead: "Every clock starts at the in-service date",
    coveragesNoteSuffix: " — the date of first retail sale — not the model year. A car that sat on the lot for a year still has its warranty measured from when it was actually sold.",
    h2Calc: "How to Calculate Remaining Warranty",
    calcIntro: "Remaining warranty is simply the time and mileage left before each coverage limit is reached — whichever runs out first ends that coverage. Here's the method, with a worked example.",
    calc1Pre: "Start with the ",
    calc1Bold: "in-service date",
    calc1Suffix: " from a VIN check, then for each coverage subtract elapsed time from the time limit and current mileage from the mileage limit. The coverage ends the moment either limit is hit.",
    calc2Pre: "Because the mileage half of the equation can be manipulated, pair this with an ",
    calc2Link: "odometer check",
    calc2Suffix: ". An artificially low reading can make a car look like it has far more warranty left than it really does.",
    calc3: "Manufacturer websites offer free factory-warranty lookups, but they often miss CPO extensions and service contracts. Always confirm the exact remaining figures with the manufacturer or a franchised dealer of that brand.",
    exampleTitle: "Worked example — bumper-to-bumper",
    exampleRows: [
      { label: "Coverage limit", value: "3 yr / 36k" },
      { label: "In service / now", value: "2 yr · 20k mi" },
      { label: "Remaining (first to hit)", value: "~1 yr" },
    ],
    exampleNote: "Time runs out before mileage here, so ~1 year of coverage remains. Limits vary by brand — this is an illustration, not a guarantee for any specific car.",
    midCtaHeading: "Is This Specific Car Still Covered?",
    midCtaSub: "Don't take the seller's word for it. Run the VIN to find the in-service date and estimate the coverage that's likely still active — free preview, in seconds.",
    h2Compare: "Factory vs. Extended vs. CPO Warranties",
    compareIntro: "Not all coverage is equal. Where a warranty comes from determines how dependable it is — and whether you can trust the seller's claim without verifying the VIN.",
    factoryTag: "Factory", factoryTitle: "Most dependable",
    factoryBullets: ["Provided by the manufacturer, included with the car.", "Honored at any franchised dealer of that brand.", "Transfers automatically with the VIN at no cost."],
    cpoTag: "CPO", cpoTitle: "Manufacturer-backed",
    cpoBullets: ["Adds coverage on top of the factory warranty.", "Requires the car to pass a certified inspection.", "Verify the certification by VIN, not the seller's word."],
    extendedTag: "Extended / aftermarket", extendedTitle: "Varies widely",
    extendedBullets: ["A service contract bought separately.", "Issued by the maker, dealer, or a third party.", "Read the exclusions — quality and reliability differ a lot."],
    h2Voids: "What Can Void a Manufacturer Warranty",
    voidsIntro: "The Magnuson-Moss Warranty Act stops a dealer from voiding your entire warranty just for using aftermarket parts — but a specific claim can still be denied if a modification or event caused the failure. The common culprits:",
    voids: [
      { title: "Engine modifications", body: "Performance tuning, superchargers, or nitrous systems typically void powertrain coverage for related failures." },
      { title: "Flood or accident damage", body: "A vehicle in a major accident or flood event may have coverage denied for damage tied to that event." },
      { title: "Off-road or racing use", body: "Many warranties exclude damage from track events, competition, or off-road driving outside the vehicle's design." },
      { title: "Neglected maintenance", body: "Skipping required service — oil changes, coolant flushes — at the documented intervals can void affected coverage." },
    ],
    voidsNoteBoldLead: "Buying used?",
    voidsNoteMid: " Prior flood or accident damage can quietly deny future claims. Pair this with a ",
    voidsNoteLink1: "salvage title check",
    voidsNoteMid2: " and a ",
    voidsNoteLink2: "lemon check",
    voidsNoteSuffix: " to catch history that could undermine the coverage.",
    h2Buying: "Buying a Car With Warranty Left — Price It In",
    buying1Pre: "A used car with substantial factory warranty remaining has a measurable edge over one that's out of coverage. Factory coverage ",
    buying1Bold: "transfers to new owners automatically",
    buying1Suffix: " — no registration, no transfer fee — and any franchised dealer honors it regardless of ownership history.",
    buying2: "Use the warranty check to learn exactly how much is left, then price accordingly. A car with two years of bumper-to-bumper coverage remaining is worth more than an identical one out-of-warranty — the difference in repair exposure can run to thousands of dollars.",
    buying3Pre: "Complete your due diligence with a full ",
    buying3Link: "VIN history report",
    buying3Suffix: " before any purchase decision.",
    remainingCardTitle: "Remaining-coverage checklist",
    remainingChecklist: [
      "Retrieve the in-service date by VIN, not the model year",
      "Subtract elapsed time from each coverage's time limit",
      "Subtract current mileage from each coverage's mileage limit",
      "Whichever runs out first ends that specific coverage",
      "Verify CPO or service-contract extensions through the VIN",
      "Confirm exact figures with the manufacturer or franchised dealer",
    ],
    remainingCardCta: "Find the in-service date by VIN first:",
    h2Why: "Why Remaining Warranty Matters for Value",
    whyIntro: "Coverage that follows the VIN directly shapes what a used car is worth — and how much repair risk you take on as the next owner.",
    whyCards: [
      { title: "Real resale value", body: "Remaining bumper-to-bumper or powertrain coverage is a tangible asset — a comparable out-of-warranty car should cost noticeably less." },
      { title: "Lower repair exposure", body: "Active coverage means the manufacturer, not you, pays for qualifying failures during the remaining time and mileage." },
      { title: "Verify, don't trust", body: "Sellers often overstate coverage. The in-service date tied to the VIN — confirmed with the dealer — is the only reliable proof." },
    ],
    h2Internal: "More VIN Checks That Pair With a Warranty Check",
    internalIntro: "Warranty is one piece of the puzzle. These checks complete the picture before you buy.",
    internalLinks: [
      { href: "/odometer-check", label: "Odometer Check", desc: "A rollback can make a car look like it has more warranty mileage left than it really does." },
      { href: "/vin-check", label: "Full VIN History Check", desc: "Title, warranty signals, accident, odometer, and recall records in one report." },
      { href: "/lemon-check", label: "Lemon Check", desc: "See whether the car had repeated warranty repairs or a manufacturer buyback." },
      { href: "/recall-check", label: "Recall Check", desc: "Open recalls are repaired free by the dealer, separate from warranty coverage." },
      { href: "/salvage-title-check", label: "Salvage Title Check", desc: "Branded-title damage can deny warranty claims tied to the original event." },
      { href: "/vin-decoder", label: "VIN Decoder", desc: "Decode the 17-character VIN to specs, trim, and factory options." },
    ],
    h2Faq: "Warranty Check — Frequently Asked Questions",
    faqIntro: "The questions buyers ask most when checking whether a car is still under warranty.",
    bottomBadge: "Free preview · Instant · VIN-Based",
    ctaBottomHeading: "Is This Car Still Under Warranty? Find Out Now.",
    ctaBottomSub: "Enter a 17-character VIN to find the in-service date and estimate remaining factory, powertrain, corrosion, emissions, EV-battery, and CPO coverage.",
    ctaBottomNote: "No credit card · No sign-up · Free preview",
  },
  es: {
    home: "Inicio", crumb: "Verificación de garantía",
    badge: "Búsqueda de cobertura   ·   Basada en fecha de puesta en servicio",
    h1Lead: "Verificación de garantía por VIN — ",
    h1Accent: "¿Este auto sigue cubierto?",
    intro: "La garantía de fabricante restante es uno de los puntos de venta más valiosos — y más tergiversados — en un auto usado. Ingresa un VIN de 17 caracteres para encontrar la fecha de puesta en servicio y estimar la cobertura de defensa a defensa, tren motriz, corrosión, emisiones, batería EV y CPO que probablemente sigue activa — vista previa gratis, antes de comprar.",
    formHeading: "Verifica el estado de la garantía por VIN",
    formSub: "Ingresa cualquier VIN de 17 caracteres — encontraremos la fecha de puesta en servicio para que puedas estimar la garantía de fabricante y CPO restante",
    formNote: "Vista previa gratis · Sin registro · Resultado instantáneo",
    trustStats: [
      { icon: CalendarClock, value: "Puesta en servicio", label: "basada en fecha" },
      { icon: Shield, value: "6 coberturas", label: "fabricante + CPO" },
      { icon: BadgeCheck, value: "Transferible", label: "con el VIN" },
      { icon: Zap, value: "Vista previa gratis", label: "sin registro" },
    ],
    h2How: "Cómo funciona una verificación de garantía por VIN",
    howIntro: "La cobertura de garantía es rastreada por el fabricante contra el VIN y su fecha de puesta en servicio. Tres pasos convierten eso en una imagen clara de lo que probablemente sigue cubierto.",
    howSteps: [
      { tag: "Paso 1", title: "Ingresa el VIN", body: "Escribe el VIN de 17 caracteres del tablero, marco de puerta, título o registro. La cobertura de garantía está vinculada al VIN y a su fecha de puesta en servicio — no al año del modelo ni al propietario." },
      { tag: "Paso 2", title: "Encontramos la fecha de puesta en servicio", body: "La búsqueda recupera la fecha de puesta en servicio (primera venta al menudeo) y los detalles del vehículo. Esa fecha — más el kilometraje actual — es contra lo que se mide cada reloj de cobertura de fabricante." },
      { tag: "Paso 3", title: "Estima la cobertura restante", body: "Compara el tiempo y kilometraje transcurridos contra cada límite de cobertura para ver qué sigue probablemente activo. Confirma cifras exactas y cualquier extensión CPO con el fabricante o un distribuidor autorizado." },
    ],
    h2Coverages: "Las coberturas de una garantía típica de auto nuevo",
    coveragesIntro: "Un vehículo nuevo viene con varias coberturas separadas, cada una en su propio reloj de tiempo y kilometraje. Saber cuál es cuál es esencial cuando valoras un auto usado — las cifras a continuación son típicas de la industria y varían por fabricante.",
    coverages: [
      { title: "Defensa a defensa", body: "Cubre virtualmente todos los componentes excepto piezas de desgaste normal. Comúnmente alrededor de 3 años / 36,000 millas, aunque varía por fabricante. Generalmente la primera cobertura en expirar." },
      { title: "Tren motriz", body: "Cubre el motor, la transmisión y el tren de transmisión. A menudo alrededor de 5 años / 60,000 millas — hasta 10 años / 100,000 millas para algunas marcas como Hyundai y Kia." },
      { title: "Corrosión / óxido", body: "Cubre la perforación por óxido de paneles de carrocería. Típicamente de 5 a 7 años, frecuentemente sin límite de kilometraje en absoluto." },
      { title: "Emisiones", body: "Cobertura federalmente obligatoria para componentes de control de emisiones. Las partes principales están comúnmente cubiertas alrededor de 8 años / 80,000 millas." },
      { title: "Batería EV", body: "Los paquetes de batería de vehículos eléctricos llevan su propia garantía, a menudo alrededor de 8 años / 100,000 millas bajo requisitos federales." },
      { title: "Cobertura CPO", body: "Los programas Certified Pre-Owned (certificado pre-poseído) agregan cobertura respaldada por el fabricante encima de la garantía de fabricante cuando un auto usado pasa una inspección certificada." },
    ],
    coveragesNoteBoldLead: "Cada reloj comienza en la fecha de puesta en servicio",
    coveragesNoteSuffix: " — la fecha de primera venta al menudeo — no el año del modelo. Un auto que estuvo en el lote por un año todavía tiene su garantía medida desde cuando realmente se vendió.",
    h2Calc: "Cómo calcular la garantía restante",
    calcIntro: "La garantía restante es simplemente el tiempo y kilometraje que queda antes de alcanzar cada límite de cobertura — lo que se agote primero termina esa cobertura. Aquí está el método, con un ejemplo trabajado.",
    calc1Pre: "Comienza con la ",
    calc1Bold: "fecha de puesta en servicio",
    calc1Suffix: " de una verificación VIN, luego para cada cobertura resta el tiempo transcurrido del límite de tiempo y el kilometraje actual del límite de kilometraje. La cobertura termina en el momento en que se alcanza cualquiera de los límites.",
    calc2Pre: "Como la mitad del kilometraje de la ecuación puede manipularse, combina esto con una ",
    calc2Link: "verificación de odómetro",
    calc2Suffix: ". Una lectura artificialmente baja puede hacer que un auto parezca tener mucha más garantía restante de la que realmente tiene.",
    calc3: "Los sitios web de fabricantes ofrecen búsquedas gratuitas de garantía de fabricante, pero a menudo omiten extensiones CPO y contratos de servicio. Siempre confirma las cifras exactas restantes con el fabricante o un distribuidor autorizado de esa marca.",
    exampleTitle: "Ejemplo trabajado — defensa a defensa",
    exampleRows: [
      { label: "Límite de cobertura", value: "3 años / 36k" },
      { label: "En servicio / ahora", value: "2 años · 20k mi" },
      { label: "Restante (lo que se agote primero)", value: "~1 año" },
    ],
    exampleNote: "El tiempo se agota antes que el kilometraje aquí, así que queda ~1 año de cobertura. Los límites varían por fabricante — esto es una ilustración, no una garantía para ningún auto específico.",
    midCtaHeading: "¿Este auto específico sigue cubierto?",
    midCtaSub: "No te bases en la palabra del vendedor. Ejecuta el VIN para encontrar la fecha de puesta en servicio y estimar la cobertura que probablemente sigue activa — vista previa gratis, en segundos.",
    h2Compare: "Garantía de fabricante vs. extendida vs. CPO",
    compareIntro: "No toda la cobertura es igual. De dónde viene una garantía determina qué tan confiable es — y si puedes confiar en el reclamo del vendedor sin verificar el VIN.",
    factoryTag: "Fabricante", factoryTitle: "La más confiable",
    factoryBullets: ["Proporcionada por el fabricante, incluida con el auto.", "Honrada en cualquier distribuidor autorizado de esa marca.", "Se transfiere automáticamente con el VIN sin costo."],
    cpoTag: "CPO", cpoTitle: "Respaldada por el fabricante",
    cpoBullets: ["Agrega cobertura encima de la garantía de fabricante.", "Requiere que el auto pase una inspección certificada.", "Verifica la certificación por VIN, no por la palabra del vendedor."],
    extendedTag: "Extendida / aftermarket", extendedTitle: "Varía ampliamente",
    extendedBullets: ["Un contrato de servicio comprado por separado.", "Emitido por el fabricante, distribuidor o un tercero.", "Lee las exclusiones — la calidad y confiabilidad difieren mucho."],
    h2Voids: "Qué puede anular una garantía de fabricante",
    voidsIntro: "La Ley Magnuson-Moss de Garantía impide que un distribuidor anule toda tu garantía solo por usar piezas aftermarket — pero un reclamo específico aún puede ser denegado si una modificación o evento causó la falla. Los culpables comunes:",
    voids: [
      { title: "Modificaciones de motor", body: "El ajuste de rendimiento, supercargadores o sistemas de nitroso típicamente anulan la cobertura del tren motriz para fallas relacionadas." },
      { title: "Daño por inundación o accidente", body: "Un vehículo en un accidente mayor o evento de inundación puede tener cobertura denegada por daños vinculados a ese evento." },
      { title: "Uso fuera de carretera o de carreras", body: "Muchas garantías excluyen daños por eventos de pista, competencia o conducción fuera de carretera fuera del diseño del vehículo." },
      { title: "Mantenimiento descuidado", body: "Saltarse el servicio requerido — cambios de aceite, lavados de refrigerante — en los intervalos documentados puede anular la cobertura afectada." },
    ],
    voidsNoteBoldLead: "¿Comprando usado?",
    voidsNoteMid: " Daño previo por inundación o accidente puede negar silenciosamente reclamos futuros. Combina esto con una ",
    voidsNoteLink1: "verificación de título de salvamento",
    voidsNoteMid2: " y una ",
    voidsNoteLink2: "verificación de limones",
    voidsNoteSuffix: " para atrapar el historial que podría socavar la cobertura.",
    h2Buying: "Comprar un auto con garantía restante — Inclúyelo en el precio",
    buying1Pre: "Un auto usado con garantía de fabricante sustancial restante tiene una ventaja medible sobre uno que está fuera de cobertura. La cobertura de fabricante ",
    buying1Bold: "se transfiere automáticamente a nuevos propietarios",
    buying1Suffix: " — sin registro, sin tarifa de transferencia — y cualquier distribuidor autorizado la honra sin importar el historial de propiedad.",
    buying2: "Usa la verificación de garantía para saber exactamente cuánto queda, luego pon precio en consecuencia. Un auto con dos años de cobertura de defensa a defensa restante vale más que uno idéntico fuera de garantía — la diferencia en exposición a reparaciones puede llegar a miles de dólares.",
    buying3Pre: "Completa tu diligencia debida con un reporte completo de ",
    buying3Link: "historial VIN",
    buying3Suffix: " antes de cualquier decisión de compra.",
    remainingCardTitle: "Lista de cobertura restante",
    remainingChecklist: [
      "Recupera la fecha de puesta en servicio por VIN, no el año del modelo",
      "Resta el tiempo transcurrido del límite de tiempo de cada cobertura",
      "Resta el kilometraje actual del límite de kilometraje de cada cobertura",
      "Lo que se agote primero termina esa cobertura específica",
      "Verifica extensiones CPO o de contrato de servicio a través del VIN",
      "Confirma cifras exactas con el fabricante o distribuidor autorizado",
    ],
    remainingCardCta: "Encuentra la fecha de puesta en servicio por VIN primero:",
    h2Why: "Por qué la garantía restante importa para el valor",
    whyIntro: "La cobertura que sigue al VIN moldea directamente cuánto vale un auto usado — y cuánto riesgo de reparación tomas como próximo propietario.",
    whyCards: [
      { title: "Valor de reventa real", body: "La cobertura restante de defensa a defensa o tren motriz es un activo tangible — un auto comparable fuera de garantía debería costar notablemente menos." },
      { title: "Menor exposición a reparaciones", body: "La cobertura activa significa que el fabricante, no tú, paga por las fallas calificadas durante el tiempo y kilometraje restantes." },
      { title: "Verifica, no confíes", body: "Los vendedores a menudo exageran la cobertura. La fecha de puesta en servicio vinculada al VIN — confirmada con el distribuidor — es la única prueba confiable." },
    ],
    h2Internal: "Más verificaciones VIN que se combinan con una verificación de garantía",
    internalIntro: "La garantía es una pieza del rompecabezas. Estas verificaciones completan la imagen antes de comprar.",
    internalLinks: [
      { href: "/odometer-check", label: "Verificación de odómetro", desc: "Un rollback puede hacer que un auto parezca tener más kilometraje de garantía restante del que realmente tiene." },
      { href: "/vin-check", label: "Verificación completa de historial VIN", desc: "Título, señales de garantía, accidentes, odómetro y registros de recalls en un reporte." },
      { href: "/lemon-check", label: "Verificación de limones", desc: "Mira si el auto tuvo reparaciones repetidas de garantía o una recompra del fabricante." },
      { href: "/recall-check", label: "Verificación de recalls", desc: "Los recalls abiertos son reparados gratis por el distribuidor, separado de la cobertura de garantía." },
      { href: "/salvage-title-check", label: "Verificación título salvamento", desc: "El daño de título marcado puede negar reclamos de garantía vinculados al evento original." },
      { href: "/vin-decoder", label: "Decodificador VIN", desc: "Decodifica el VIN de 17 caracteres a especificaciones, versión y opciones de fábrica." },
    ],
    h2Faq: "Verificación de garantía — Preguntas frecuentes",
    faqIntro: "Las preguntas que más hacen los compradores al verificar si un auto sigue bajo garantía.",
    bottomBadge: "Vista previa gratis · Instantáneo · Basado en VIN",
    ctaBottomHeading: "¿Este auto sigue bajo garantía? Descúbrelo ahora.",
    ctaBottomSub: "Ingresa un VIN de 17 caracteres para encontrar la fecha de puesta en servicio y estimar la cobertura restante de fabricante, tren motriz, corrosión, emisiones, batería EV y CPO.",
    ctaBottomNote: "Sin tarjeta de crédito · Sin registro · Vista previa gratis",
  },
  fr: {
    home: "Accueil", crumb: "Vérification de garantie",
    badge: "Recherche de couverture   ·   Basée sur la date de mise en service",
    h1Lead: "Vérification de garantie par VIN — ",
    h1Accent: "Cette voiture est-elle encore couverte ?",
    intro: "La garantie constructeur restante est l'un des arguments de vente les plus précieux — et les plus mal représentés — sur une voiture d'occasion. Saisis un VIN de 17 caractères pour trouver la date de mise en service et estimer la couverture pare-chocs à pare-chocs, groupe motopropulseur, corrosion, émissions, batterie VE et CPO qui est probablement encore active — aperçu gratuit, avant d'acheter.",
    formHeading: "Vérifie le statut de la garantie par VIN",
    formSub: "Saisis n'importe quel VIN de 17 caractères — nous trouverons la date de mise en service pour que tu puisses estimer la couverture constructeur et CPO restante",
    formNote: "Aperçu gratuit · Sans inscription · Résultat instantané",
    trustStats: [
      { icon: CalendarClock, value: "Mise en service", label: "basée sur la date" },
      { icon: Shield, value: "6 couvertures", label: "constructeur + CPO" },
      { icon: BadgeCheck, value: "Transferable", label: "avec le VIN" },
      { icon: Zap, value: "Aperçu gratuit", label: "sans inscription" },
    ],
    h2How: "Comment fonctionne une vérification VIN de garantie",
    howIntro: "La couverture de garantie est suivie par le constructeur contre le VIN et sa date de mise en service. Trois étapes transforment cela en une image claire de ce qui est probablement encore couvert.",
    howSteps: [
      { tag: "Étape 1", title: "Saisis le VIN", body: "Tape le VIN de 17 caractères du tableau de bord, du montant de porte, du titre ou de l'immatriculation. La couverture de garantie est liée au VIN et à sa date de mise en service — pas à l'année du modèle ni au propriétaire." },
      { tag: "Étape 2", title: "Nous trouvons la date de mise en service", body: "La recherche récupère la date de mise en service (première vente au détail) et les détails du véhicule. Cette date — plus le kilométrage actuel — est ce contre quoi chaque horloge de couverture constructeur est mesurée." },
      { tag: "Étape 3", title: "Estime la couverture restante", body: "Compare le temps et le kilométrage écoulés à chaque limite de couverture pour voir ce qui est probablement encore actif. Confirme les chiffres exacts et toute extension CPO avec le constructeur ou un concessionnaire agréé." },
    ],
    h2Coverages: "Les couvertures d'une garantie typique de voiture neuve",
    coveragesIntro: "Un véhicule neuf est livré avec plusieurs couvertures distinctes, chacune sur sa propre horloge temps-kilométrage. Savoir laquelle est laquelle est essentiel quand tu évalues une voiture d'occasion — les chiffres ci-dessous sont typiques de l'industrie et varient selon le constructeur.",
    coverages: [
      { title: "Pare-chocs à pare-chocs", body: "Couvre virtuellement tous les composants sauf les pièces d'usure normale. Couramment autour de 3 ans / 36 000 miles, bien que cela varie selon le constructeur. Généralement la première couverture à expirer." },
      { title: "Groupe motopropulseur", body: "Couvre le moteur, la transmission et la transmission. Souvent autour de 5 ans / 60 000 miles — jusqu'à 10 ans / 100 000 miles pour certaines marques comme Hyundai et Kia." },
      { title: "Corrosion / rouille", body: "Couvre la perforation par rouille des panneaux de carrosserie. Typiquement 5 à 7 ans, fréquemment sans limite de kilométrage du tout." },
      { title: "Émissions", body: "Couverture fédéralement obligatoire pour les composants de contrôle des émissions. Les pièces principales sont couramment couvertes autour de 8 ans / 80 000 miles." },
      { title: "Batterie VE", body: "Les packs de batteries de véhicules électriques portent leur propre garantie, souvent autour de 8 ans / 100 000 miles selon les exigences fédérales." },
      { title: "Couverture CPO", body: "Les programmes Certified Pre-Owned (certifié d'occasion) ajoutent une couverture adossée par le constructeur en plus de la garantie constructeur lorsqu'une voiture d'occasion passe une inspection certifiée." },
    ],
    coveragesNoteBoldLead: "Chaque horloge commence à la date de mise en service",
    coveragesNoteSuffix: " — la date de première vente au détail — pas l'année du modèle. Une voiture qui est restée sur le parc pendant un an a toujours sa garantie mesurée depuis qu'elle a été réellement vendue.",
    h2Calc: "Comment calculer la garantie restante",
    calcIntro: "La garantie restante est simplement le temps et le kilométrage qui restent avant d'atteindre chaque limite de couverture — celui qui s'épuise en premier met fin à cette couverture. Voici la méthode, avec un exemple travaillé.",
    calc1Pre: "Commence avec la ",
    calc1Bold: "date de mise en service",
    calc1Suffix: " d'une vérification VIN, puis pour chaque couverture soustrais le temps écoulé de la limite de temps et le kilométrage actuel de la limite de kilométrage. La couverture prend fin au moment où l'une ou l'autre limite est atteinte.",
    calc2Pre: "Parce que la moitié kilométrage de l'équation peut être manipulée, associe ceci à une ",
    calc2Link: "vérification d'odomètre",
    calc2Suffix: ". Une lecture artificiellement basse peut faire paraître qu'une voiture a beaucoup plus de garantie restante qu'elle n'en a réellement.",
    calc3: "Les sites web des constructeurs offrent des recherches gratuites de garantie constructeur, mais ils omettent souvent les extensions CPO et les contrats de service. Confirme toujours les chiffres exacts restants avec le constructeur ou un concessionnaire agréé de cette marque.",
    exampleTitle: "Exemple travaillé — pare-chocs à pare-chocs",
    exampleRows: [
      { label: "Limite de couverture", value: "3 ans / 36k" },
      { label: "En service / maintenant", value: "2 ans · 20k mi" },
      { label: "Restant (le premier atteint)", value: "~1 an" },
    ],
    exampleNote: "Le temps s'épuise avant le kilométrage ici, donc il reste ~1 an de couverture. Les limites varient selon le constructeur — ceci est une illustration, pas une garantie pour une voiture spécifique.",
    midCtaHeading: "Cette voiture spécifique est-elle encore couverte ?",
    midCtaSub: "Ne te fie pas à la parole du vendeur. Lance le VIN pour trouver la date de mise en service et estimer la couverture probablement encore active — aperçu gratuit, en quelques secondes.",
    h2Compare: "Garantie constructeur vs. étendue vs. CPO",
    compareIntro: "Toutes les couvertures ne se valent pas. D'où vient une garantie détermine sa fiabilité — et si tu peux faire confiance à la déclaration du vendeur sans vérifier le VIN.",
    factoryTag: "Constructeur", factoryTitle: "La plus fiable",
    factoryBullets: ["Fournie par le constructeur, incluse avec la voiture.", "Honorée chez tout concessionnaire agréé de cette marque.", "Se transfère automatiquement avec le VIN sans frais."],
    cpoTag: "CPO", cpoTitle: "Adossée constructeur",
    cpoBullets: ["Ajoute une couverture en plus de la garantie constructeur.", "Exige que la voiture passe une inspection certifiée.", "Vérifie la certification par VIN, pas par la parole du vendeur."],
    extendedTag: "Étendue / aftermarket", extendedTitle: "Varie largement",
    extendedBullets: ["Un contrat de service acheté séparément.", "Émis par le constructeur, le concessionnaire ou un tiers.", "Lis les exclusions — la qualité et la fiabilité diffèrent beaucoup."],
    h2Voids: "Ce qui peut annuler une garantie constructeur",
    voidsIntro: "La loi Magnuson-Moss sur la garantie empêche un concessionnaire d'annuler ta garantie entière juste pour avoir utilisé des pièces aftermarket — mais une réclamation spécifique peut toujours être refusée si une modification ou un événement a causé la défaillance. Les coupables courants :",
    voids: [
      { title: "Modifications du moteur", body: "Le tuning de performance, les surcompresseurs ou les systèmes au nitro annulent typiquement la couverture du groupe motopropulseur pour les défaillances connexes." },
      { title: "Dégâts d'inondation ou d'accident", body: "Un véhicule dans un accident majeur ou un événement d'inondation peut voir la couverture refusée pour les dommages liés à cet événement." },
      { title: "Usage hors route ou de course", body: "De nombreuses garanties excluent les dommages d'événements sur piste, de compétition ou de conduite hors route en dehors de la conception du véhicule." },
      { title: "Entretien négligé", body: "Sauter l'entretien requis — vidanges d'huile, rinçages de liquide de refroidissement — aux intervalles documentés peut annuler la couverture affectée." },
    ],
    voidsNoteBoldLead: "Achat d'occasion ?",
    voidsNoteMid: " Des dégâts antérieurs d'inondation ou d'accident peuvent refuser silencieusement de futures réclamations. Combine ceci avec une ",
    voidsNoteLink1: "vérification de titre salvage",
    voidsNoteMid2: " et une ",
    voidsNoteLink2: "vérification citron",
    voidsNoteSuffix: " pour attraper un historique qui pourrait saper la couverture.",
    h2Buying: "Acheter une voiture avec garantie restante — Inclus-le dans le prix",
    buying1Pre: "Une voiture d'occasion avec une garantie constructeur substantielle restante a un avantage mesurable sur une qui est hors couverture. La couverture constructeur ",
    buying1Bold: "se transfère automatiquement aux nouveaux propriétaires",
    buying1Suffix: " — pas d'enregistrement, pas de frais de transfert — et tout concessionnaire agréé l'honore quel que soit l'historique de propriété.",
    buying2: "Utilise la vérification de garantie pour apprendre exactement combien il reste, puis tarifie en conséquence. Une voiture avec deux ans de couverture pare-chocs à pare-chocs restante vaut plus qu'une identique hors garantie — la différence d'exposition aux réparations peut atteindre des milliers de dollars.",
    buying3Pre: "Complète ta diligence raisonnable avec un ",
    buying3Link: "rapport complet d'historique VIN",
    buying3Suffix: " avant toute décision d'achat.",
    remainingCardTitle: "Liste de couverture restante",
    remainingChecklist: [
      "Récupère la date de mise en service par VIN, pas l'année du modèle",
      "Soustrais le temps écoulé de la limite de temps de chaque couverture",
      "Soustrais le kilométrage actuel de la limite de kilométrage de chaque couverture",
      "Celui qui s'épuise en premier met fin à cette couverture spécifique",
      "Vérifie les extensions CPO ou de contrat de service via le VIN",
      "Confirme les chiffres exacts avec le constructeur ou le concessionnaire agréé",
    ],
    remainingCardCta: "Trouve d'abord la date de mise en service par VIN :",
    h2Why: "Pourquoi la garantie restante compte pour la valeur",
    whyIntro: "La couverture qui suit le VIN façonne directement ce que vaut une voiture d'occasion — et combien de risque de réparation tu prends comme prochain propriétaire.",
    whyCards: [
      { title: "Valeur de revente réelle", body: "La couverture pare-chocs à pare-chocs ou groupe motopropulseur restante est un actif tangible — une voiture comparable hors garantie devrait coûter notablement moins." },
      { title: "Moindre exposition aux réparations", body: "Une couverture active signifie que le constructeur, pas toi, paie pour les défaillances qualifiées pendant le temps et le kilométrage restants." },
      { title: "Vérifie, ne fais pas confiance", body: "Les vendeurs surestiment souvent la couverture. La date de mise en service liée au VIN — confirmée avec le concessionnaire — est la seule preuve fiable." },
    ],
    h2Internal: "Plus de vérifications VIN qui se combinent avec une vérification de garantie",
    internalIntro: "La garantie est une pièce du puzzle. Ces vérifications complètent l'image avant d'acheter.",
    internalLinks: [
      { href: "/odometer-check", label: "Vérification d'odomètre", desc: "Un rollback peut faire paraître qu'une voiture a plus de kilométrage de garantie restant qu'elle n'en a réellement." },
      { href: "/vin-check", label: "Vérification complète d'historique VIN", desc: "Titre, signaux de garantie, accidents, odomètre et registres de rappels en un rapport." },
      { href: "/lemon-check", label: "Vérification citron", desc: "Vois si la voiture a eu des réparations répétées sous garantie ou un rachat constructeur." },
      { href: "/recall-check", label: "Vérification de rappels", desc: "Les rappels ouverts sont réparés gratuitement par le concessionnaire, séparément de la couverture de garantie." },
      { href: "/salvage-title-check", label: "Vérification titre salvage", desc: "Les dommages de titre marqué peuvent refuser les réclamations de garantie liées à l'événement original." },
      { href: "/vin-decoder", label: "Décodeur VIN", desc: "Décode le VIN de 17 caractères en spécifications, finitions et options d'usine." },
    ],
    h2Faq: "Vérification de garantie — Foire aux questions",
    faqIntro: "Les questions que les acheteurs posent le plus en vérifiant si une voiture est encore sous garantie.",
    bottomBadge: "Aperçu gratuit · Instantané · Basé sur le VIN",
    ctaBottomHeading: "Cette voiture est-elle encore sous garantie ? Découvre-le maintenant.",
    ctaBottomSub: "Saisis un VIN de 17 caractères pour trouver la date de mise en service et estimer la couverture restante constructeur, groupe motopropulseur, corrosion, émissions, batterie VE et CPO.",
    ctaBottomNote: "Pas de carte de crédit · Sans inscription · Aperçu gratuit",
  },
} as const;

const FAQS_EN = [
  { question: "How do I check a car's warranty by VIN?", answer: "Enter the 17-character VIN into a warranty lookup tool, which retrieves the manufacturer's in-service date (the date of first retail sale) and calculates remaining coverage against the current mileage. The most authoritative source is the manufacturer or a franchised dealer of that brand, since they query the official warranty database keyed to the VIN. A comprehensive VIN report can also surface CPO extensions and service contracts that the factory lookup alone may not show." },
  { question: "How can I tell if a used car is still under factory warranty?", answer: "Factory warranty status depends on two things: the in-service date and the current mileage. The warranty is still active only if the vehicle is within both the time limit and the mileage limit of each coverage. Run a VIN-based warranty check to retrieve the in-service date, then compare the time elapsed and the odometer reading against the brand's published limits. Exact remaining coverage should be confirmed with the manufacturer or a franchised dealer." },
  { question: "What is the difference between a powertrain and a bumper-to-bumper warranty?", answer: "A bumper-to-bumper (basic) warranty covers virtually all components except normal wear items, but for a shorter period — commonly around 3 years/36,000 miles, though this varies by brand. A powertrain warranty covers only the engine, transmission, and drivetrain, but lasts longer — commonly around 5 years/60,000 miles, and as long as 10 years/100,000 miles for some brands such as Hyundai and Kia. Both run from the in-service date." },
  { question: "Does a factory warranty transfer to a second owner?", answer: "Yes, in most cases. The remaining factory bumper-to-bumper warranty typically transfers automatically to subsequent owners at no cost, because coverage follows the VIN and the in-service date rather than the original buyer. Some brands apply different transfer terms to the powertrain portion — for example, a longer powertrain term may be reduced for second owners. Confirm the specific transfer rules with the manufacturer or a franchised dealer for that brand." },
  { question: "How do I check how much warranty is remaining?", answer: "Remaining warranty is the time and mileage left before each coverage's limit is reached. Find the in-service date (via a VIN check or the manufacturer), then subtract elapsed time from the time limit and current mileage from the mileage limit for each coverage — whichever runs out first ends that coverage. Because mileage can be misrepresented, pair the warranty check with an odometer check, and confirm the exact figures with the manufacturer or a franchised dealer." },
  { question: "What is the difference between a factory warranty and an extended or aftermarket warranty?", answer: "A factory warranty is provided by the manufacturer, included with the vehicle, and honored at any franchised dealer of that brand. An extended warranty — also called a vehicle service contract — is purchased separately and may be issued by the manufacturer, the selling dealer, or a third-party (aftermarket) administrator. Aftermarket contracts vary widely in coverage and reliability, so always read the exclusions before buying. Manufacturer-backed and CPO coverage is generally the most dependable." },
  { question: "How long do factory warranties typically last?", answer: "Factory warranties are limited by both time and mileage, and the exact lengths vary by brand. As industry-typical examples, bumper-to-bumper coverage commonly runs about 3 years/36,000 miles and powertrain coverage about 5 years/60,000 miles, while some brands such as Hyundai and Kia offer powertrain coverage up to 10 years/100,000 miles. Corrosion, emissions, and EV-battery warranties run on separate, often longer schedules. Always verify the specific limits for the brand and model." },
];

const FAQS_ES = [
  { question: "¿Cómo verifico la garantía de un auto por VIN?", answer: "Ingresa el VIN de 17 caracteres en una herramienta de búsqueda de garantía, que recupera la fecha de puesta en servicio del fabricante (la fecha de primera venta al menudeo) y calcula la cobertura restante contra el kilometraje actual. La fuente más autorizada es el fabricante o un distribuidor autorizado de esa marca, ya que consultan la base de datos oficial de garantía vinculada al VIN. Un reporte completo de VIN también puede mostrar extensiones CPO y contratos de servicio que la búsqueda de fabricante por sí sola puede no mostrar." },
  { question: "¿Cómo puedo saber si un auto usado todavía está bajo garantía de fabricante?", answer: "El estado de la garantía de fabricante depende de dos cosas: la fecha de puesta en servicio y el kilometraje actual. La garantía sigue activa solo si el vehículo está dentro tanto del límite de tiempo como del límite de kilometraje de cada cobertura. Ejecuta una verificación de garantía basada en VIN para recuperar la fecha de puesta en servicio, luego compara el tiempo transcurrido y la lectura del odómetro contra los límites publicados de la marca. La cobertura exacta restante debe confirmarse con el fabricante o un distribuidor autorizado." },
  { question: "¿Cuál es la diferencia entre una garantía de tren motriz y una garantía de defensa a defensa?", answer: "Una garantía de defensa a defensa (básica) cubre virtualmente todos los componentes excepto piezas de desgaste normal, pero por un período más corto — comúnmente alrededor de 3 años/36,000 millas, aunque esto varía por fabricante. Una garantía del tren motriz cubre solo el motor, la transmisión y el tren de transmisión, pero dura más — comúnmente alrededor de 5 años/60,000 millas, y hasta 10 años/100,000 millas para algunas marcas como Hyundai y Kia. Ambas corren desde la fecha de puesta en servicio." },
  { question: "¿Se transfiere una garantía de fabricante a un segundo propietario?", answer: "Sí, en la mayoría de los casos. La garantía de fabricante de defensa a defensa restante típicamente se transfiere automáticamente a propietarios subsiguientes sin costo, porque la cobertura sigue al VIN y a la fecha de puesta en servicio en lugar del comprador original. Algunas marcas aplican términos diferentes de transferencia a la porción del tren motriz — por ejemplo, un término más largo de tren motriz puede reducirse para segundos propietarios. Confirma las reglas específicas de transferencia con el fabricante o un distribuidor autorizado de esa marca." },
  { question: "¿Cómo verifico cuánta garantía queda?", answer: "La garantía restante es el tiempo y kilometraje que queda antes de alcanzar el límite de cada cobertura. Encuentra la fecha de puesta en servicio (vía una verificación VIN o el fabricante), luego resta el tiempo transcurrido del límite de tiempo y el kilometraje actual del límite de kilometraje para cada cobertura — lo que se agote primero termina esa cobertura. Como el kilometraje puede ser tergiversado, combina la verificación de garantía con una verificación de odómetro, y confirma las cifras exactas con el fabricante o un distribuidor autorizado." },
  { question: "¿Cuál es la diferencia entre una garantía de fabricante y una garantía extendida o aftermarket?", answer: "Una garantía de fabricante es proporcionada por el fabricante, incluida con el vehículo, y honrada en cualquier distribuidor autorizado de esa marca. Una garantía extendida — también llamada contrato de servicio de vehículo — se compra por separado y puede ser emitida por el fabricante, el distribuidor vendedor o un administrador externo (aftermarket). Los contratos aftermarket varían ampliamente en cobertura y confiabilidad, así que siempre lee las exclusiones antes de comprar. La cobertura respaldada por el fabricante y CPO es generalmente la más confiable." },
  { question: "¿Cuánto duran típicamente las garantías de fabricante?", answer: "Las garantías de fabricante están limitadas tanto por tiempo como por kilometraje, y las longitudes exactas varían por fabricante. Como ejemplos típicos de la industria, la cobertura de defensa a defensa comúnmente corre alrededor de 3 años/36,000 millas y la cobertura del tren motriz alrededor de 5 años/60,000 millas, mientras algunas marcas como Hyundai y Kia ofrecen cobertura del tren motriz hasta 10 años/100,000 millas. Las garantías de corrosión, emisiones y batería EV corren en programas separados, a menudo más largos. Siempre verifica los límites específicos para la marca y modelo." },
];

interface Props { locale: Locale; }

export default function WarrantyCheckBody({ locale }: Props) {
  const c = COPY[locale];
  const faqs = locale === "es" ? FAQS_ES : FAQS_EN;
  const link = (en: string) => (locale === "es" ? `/es${en}` : en);

  return (
    <article className="pb-16 bg-surface">
      <div className="bg-primary text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20">
          <Breadcrumbs items={[{ label: c.home, href: locale === "es" ? "/es" : "/" }, { label: c.crumb }]} onDark />
          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
            <ShieldCheck className="w-4 h-4" /> {c.badge}
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight mb-4">
            {c.h1Lead}
            <span style={{ color: "var(--color-secondary-container)" }}>{c.h1Accent}</span>
          </h1>
          <p className="speakable-intro text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">{c.intro}</p>

          <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-xl">
            <h2 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1">{c.formHeading}</h2>
            <p className="text-xs sm:text-sm text-on-surface-variant mb-4">{c.formSub}</p>
            <VinSearchForm size="lg" />
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
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Coverages}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.coveragesIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {c.coverages.map((cov, i) => {
              const Icon = COVERAGE_ICONS[i];
              return (
                <div key={cov.title} className="rounded-2xl border border-outline-variant bg-surface p-5">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-base font-headline font-extrabold text-primary mb-1">{cov.title}</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{cov.body}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-6 rounded-2xl bg-secondary-container/40 border border-outline-variant p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <CalendarClock className="w-5 h-5 text-on-secondary-container flex-shrink-0 mt-0.5" />
              <p className="text-sm text-on-surface leading-relaxed">
                <strong className="text-on-surface">{c.coveragesNoteBoldLead}</strong>
                {c.coveragesNoteSuffix}
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Calc}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">{c.calcIntro}</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                {c.calc1Pre}
                <strong className="text-on-surface">{c.calc1Bold}</strong>
                {c.calc1Suffix}
              </p>
              <p>
                {c.calc2Pre}
                <Link href={link("/odometer-check")} className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.calc2Link}</Link>
                {c.calc2Suffix}
              </p>
              <p>{c.calc3}</p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Gauge className="w-5 h-5 text-primary" />
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

        <section className="py-10">
          <div className="rounded-3xl bg-primary p-7 sm:p-10 text-center">
            <Sparkles className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-white mb-2">{c.midCtaHeading}</h2>
            <p className="text-white/80 text-sm sm:text-base mb-6 max-w-xl mx-auto">{c.midCtaSub}</p>
            <div className="max-w-xl mx-auto bg-white rounded-2xl p-4 sm:p-5">
              <VinSearchForm size="lg" />
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Compare}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">{c.compareIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-primary/30 bg-primary/5 p-5 sm:p-6">
              <div className="text-[11px] font-black uppercase tracking-wider text-primary mb-2">{c.factoryTag}</div>
              <p className="text-lg font-headline font-extrabold text-primary mb-3">{c.factoryTitle}</p>
              <ul className="space-y-2 text-sm text-on-surface-variant">
                {c.factoryBullets.map((b) => <li key={b} className="flex gap-2"><span>·</span><span>{b}</span></li>)}
              </ul>
            </div>
            <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6">
              <div className="text-[11px] font-black uppercase tracking-wider text-on-surface-variant mb-2">{c.cpoTag}</div>
              <p className="text-lg font-headline font-extrabold text-on-surface mb-3">{c.cpoTitle}</p>
              <ul className="space-y-2 text-sm text-on-surface-variant">
                {c.cpoBullets.map((b) => <li key={b} className="flex gap-2"><span>·</span><span>{b}</span></li>)}
              </ul>
            </div>
            <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6">
              <div className="text-[11px] font-black uppercase tracking-wider text-on-surface-variant mb-2">{c.extendedTag}</div>
              <p className="text-lg font-headline font-extrabold text-on-surface mb-3">{c.extendedTitle}</p>
              <ul className="space-y-2 text-sm text-on-surface-variant">
                {c.extendedBullets.map((b) => <li key={b} className="flex gap-2"><span>·</span><span>{b}</span></li>)}
              </ul>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Voids}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.voidsIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {c.voids.map((v, i) => {
              const Icon = VOID_ICONS[i];
              return (
                <div key={v.title} className="rounded-2xl border border-outline-variant bg-surface p-5">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-base font-headline font-extrabold text-primary mb-1">{v.title}</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{v.body}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-6 rounded-2xl bg-secondary-container/40 border border-outline-variant p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <ShieldOff className="w-5 h-5 text-on-secondary-container flex-shrink-0 mt-0.5" />
              <p className="text-sm text-on-surface leading-relaxed">
                <strong className="text-on-surface">{c.voidsNoteBoldLead}</strong>
                {c.voidsNoteMid}
                <Link href={link("/salvage-title-check")} className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.voidsNoteLink1}</Link>
                {c.voidsNoteMid2}
                <Link href={link("/lemon-check")} className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.voidsNoteLink2}</Link>
                {c.voidsNoteSuffix}
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">{c.h2Buying}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                {c.buying1Pre}
                <strong className="text-on-surface">{c.buying1Bold}</strong>
                {c.buying1Suffix}
              </p>
              <p>{c.buying2}</p>
              <p>
                {c.buying3Pre}
                <Link href={link("/vin-check")} className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.buying3Link}</Link>
                {c.buying3Suffix}
              </p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <ClipboardCheck className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">{c.remainingCardTitle}</h3>
              </div>
              <ul className="space-y-2 text-sm text-on-surface">
                {c.remainingChecklist.map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 rounded-xl bg-white p-4 border border-outline-variant">
                <p className="text-xs font-bold text-on-surface mb-2">{c.remainingCardCta}</p>
                <VinSearchForm size="sm" />
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
            <VinSearchForm size="lg" />
          </div>
          <div className="mt-3 flex items-center justify-center gap-2 text-xs text-on-surface-variant">
            <Check className="w-3.5 h-3.5 text-green-500" strokeWidth={3} />
            {c.ctaBottomNote}
          </div>
        </section>

        <RelatedChecks exclude="/warranty-check" />
      </div>
    </article>
  );
}

export { FAQS_EN, FAQS_ES, FAQS_FR };

// Wave 19 — French uses the Spanish FAQ array as a structural fallback.
// The user-visible FAQ component already uses the locale="fr" branch in COPY;
// this alias only feeds the JSON-LD FAQPage schema until /fr metadata is translated.
const FAQS_FR = FAQS_ES;
