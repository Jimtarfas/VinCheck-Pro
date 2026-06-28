/**
 * Shared body for /rv-vin-check and /es/rv-vin-check.
 * Wave 18 batch 3 — full English layout in both locales via COPY={en,es}.
 */

import Link from "next/link";
import {
  Check, Caravan, Truck, Search, FileText, MapPin, ChevronRight,
  Lock, Zap, Sparkles, ShieldCheck, AlertTriangle, Gauge,
  ClipboardCheck, DollarSign, Wrench, Cog,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import type { Locale } from "@/i18n/config";

const HOW_ICONS = [Search, FileText, ClipboardCheck] as const;
const RV_TYPE_ICONS = [Truck, Caravan, Truck, Caravan, Caravan, MapPin] as const;
const REPORT_ICONS = [ShieldCheck, DollarSign, AlertTriangle, Wrench, Cog, Gauge] as const;
const BUY_ICONS = [ShieldCheck, Wrench, FileText] as const;

const COPY = {
  en: {
    home: "Home", crumb: "RV VIN Check",
    badge: "Motorhomes   ·   Trailers   ·   Campers",
    h1Lead: "RV & Motorhome ",
    h1Accent: "VIN Check",
    intro: "An RV is one of the largest purchases in the used-vehicle market, yet many buyers skip the VIN check that's routine for cars. Enter a 17-character VIN to reveal title brands, accident records, active liens, flood damage, and recalls on any motorhome, travel trailer, fifth wheel, or camper — free, before you buy.",
    formHeading: "Run a Free RV VIN Check",
    formSub: "Enter the 17-character VIN from any motorhome, trailer, or camper van for its full history report",
    formNote: "Free · No sign-up · Instant result",
    trustStats: [
      { icon: Caravan, value: "All RVs", label: "motor + towable" },
      { icon: ShieldCheck, value: "NMVTIS", label: "title-backed" },
      { icon: MapPin, value: "By VIN", label: "17-character" },
      { icon: Zap, value: "Free", label: "no sign-up" },
    ],
    quickAnswerTag: "Quick answer",
    quickAnswerLead: "To check an RV by VIN, enter its 17-character VIN and run the history report.",
    quickAnswerBody: " Both motorized RVs (Class A, B, and C motorhomes and camper vans) and towables (travel trailers, fifth wheels, pop-up campers) carry a 17-character VIN, so the check returns NMVTIS-backed title status and brands, accident records, active liens, flood damage, and recalls. On motorhomes the VIN usually reflects the chassis maker (Ford, Freightliner, RAM), not the coach builder (Thor, Winnebago) — confirm both. The check is free and needs no sign-up.",
    h2How: "How an RV VIN Check Works",
    howIntro: "An RV's history is tracked against its 17-character VIN through state DMV and NMVTIS records. Three steps turn that code into a clear picture of what you're buying.",
    howSteps: [
      { tag: "Step 1", title: "Enter the RV VIN", body: "Type the 17-character VIN from the dashboard or door jamb on a motorhome, or the forward-left frame rail or data plate on a travel trailer or camper." },
      { tag: "Step 2", title: "We pull the history", body: "The check queries NMVTIS-backed title records and national data for title status, salvage and flood brands, accident records, liens, and recalls." },
      { tag: "Step 3", title: "Review & verify", body: "Scan for branded titles and unreleased liens, then — for motorhomes — confirm both the chassis manufacturer and the separate coach builder." },
    ],
    h2Types: "RV Types and Where to Find the VIN",
    typesIntro: "RVs span a wide range of configurations, and the VIN location varies by type. Knowing where to look is the first step before running any history check.",
    rvTypes: [
      { title: "Class A motorhomes", body: "VIN is typically on the driver-side dashboard (visible through the windshield) and on the driver-side door jamb, tied to the chassis maker." },
      { title: "Class B camper vans", body: "VIN follows the base-van manufacturer's placement — usually the dashboard and door jamb, just like the cargo van it was built on." },
      { title: "Class C motorhomes", body: "VIN on the dashboard and driver door jamb; a separate coach-builder data plate is often inside the entry door." },
      { title: "Travel trailers & fifth wheels", body: "VIN plate sits on the forward-left (street) side of the frame, or on an exterior data plate near the tongue." },
      { title: "Pop-up & folding campers", body: "VIN plate is usually on the frame, often near the tongue or on the street-side exterior of the unit." },
      { title: "Can't find the VIN?", body: "Cross-check the title, registration, and insurance card — every RV VIN should match across all three before you run a check." },
    ],
    typesNoteBoldLead: "Two manufacturers, one VIN",
    typesNoteSuffix: " — most Class A and C motorhomes are built on a chassis from Ford, Freightliner, Mercedes, RAM, or Workhorse, then a coach builder such as Thor, Winnebago, or Forest River adds the living quarters. The VIN usually tracks the chassis, so coach issues like roof leaks or slideout faults may not appear in VIN-linked records.",
    h2Report: "What an RV VIN Report Covers",
    reportIntro: "An RV VIN report returns the same core data as an automobile history report, with extra weight on the issues that matter most given the high dollar values and complexity of recreational vehicles.",
    reports: [
      { title: "Title status & brands", body: "Salvage, rebuilt, junk, and flood brands reported by state DMVs into NMVTIS — a hail or parking-lot loss can total an RV that looks fine." },
      { title: "Active liens", body: "RVs are often financed on long-term loans. An unreleased lien can block a clean title transfer, so verify lien status before paying." },
      { title: "Accident & structural damage", body: "Chassis, coach-structure, and slideout damage are all extremely expensive to repair — and can trigger an insurance total loss." },
      { title: "Recall information", body: "NHTSA chassis recalls (drivetrain, brakes, safety) surface reliably; coach recalls for appliances and slideouts may report separately." },
      { title: "Chassis vs. coach", body: "The VIN usually reflects the chassis maker (Ford, Freightliner, RAM), not the coach builder (Thor, Winnebago) — confirm both." },
      { title: "Flood & water damage", body: "Water intrusion and flood branding matter doubly for RVs, where roof delamination and mold can hide behind a clean-looking interior." },
    ],
    midCtaHeading: "Checking Out a Specific RV?",
    midCtaSub: "Don't take the seller's word for it. Run the VIN to surface title brands, liens, and accident records — free, in seconds.",
    h2Issues: "RV-Specific Title Issues to Watch For",
    issues1: "RVs face title complications that are less common with cars. Units converted from one use to another — a shuttle bus into a camper van, a commercial van into a DIY build — may carry title history that doesn't reflect the current configuration.",
    issues2BoldLead: "Salvage-branded RVs are a particular concern.",
    issues2Suffix: " A hail storm or parking-lot incident that would be cosmetic on a car can trigger a total-loss declaration on an RV, because coach body repairs are disproportionately expensive. A salvage-branded RV can look perfectly fine yet carry a brand that hammers insurability and resale value.",
    issues3Pre: "Lien releases from lenders — especially on older, financed RVs — may not be cleanly documented in every state system. Always run a ",
    issues3Link1: "salvage title check",
    issues3Mid: " and a full ",
    issues3Link2: "VIN history report",
    issues3Suffix: " before making any offer.",
    checklistTitle: "Used-RV buyer checklist",
    buyingChecklist: [
      "Match the VIN across the frame/dash, title, registration, and insurance",
      "Run the VIN for salvage, rebuilt, junk, and flood title brands",
      "Confirm there are no unreleased liens before handing over money",
      "Identify both the chassis manufacturer and the coach builder",
      "Have an RVIA-certified technician inspect roof, slideouts, and LP gas",
      "Request the maintenance history and any transferable warranties",
    ],
    checklistCta: "Start with the VIN:",
    h2Safely: "Buying a Used RV Safely",
    safelyIntro: "The used-RV market demands more due diligence than used cars: higher dollar amounts, greater complexity, and fewer consumer protections. A private RV sale carries no dealer warranty, no lemon-law coverage, and limited recourse once problems surface.",
    safelyCards: [
      { title: "Verify the title first", body: "Run the VIN for salvage, rebuilt, junk, and flood brands and confirm no unreleased liens before you ever schedule a viewing." },
      { title: "Get an RVIA inspection", body: "A certified technician should check the roof for delamination and water intrusion, the slideout seals, the LP gas system, appliances, and the chassis underbody." },
      { title: "Demand documentation", body: "Request the full maintenance history, any warranties still in effect, and records of past repairs before agreeing on price." },
    ],
    safelyNoteBoldLead: "Accident history is costly.",
    safelyNoteMid: " A Class A motorhome accident can involve chassis, coach-structure, or slideout damage — any of which runs into the thousands. Pair the VIN check with an ",
    safelyNoteLink: "accident history check",
    safelyNoteSuffix: " for complete pre-purchase protection.",
    h2Internal: "More VIN Checks That Pair With an RV Check",
    internalIntro: "The VIN check is one piece. These tools complete the picture before you buy a used RV.",
    internalLinks: [
      { href: "/salvage-title-check", label: "Salvage Title Check", desc: "A hail or parking-lot loss can salvage-brand an RV that looks perfectly fine — catch it before you buy." },
      { href: "/vin-check", label: "Full VIN History Check", desc: "Title, accident, lien, odometer, and recall records for the RV in one complete report." },
      { href: "/accident-history-check", label: "Accident History Check", desc: "Chassis and coach damage is costly — see reported accidents before you make an offer." },
      { href: "/recall-check", label: "Recall Check", desc: "Open NHTSA chassis recalls for the RV's drivetrain, brakes, and safety systems — repaired free by the dealer." },
      { href: "/vehicle-lien-check", label: "Vehicle Lien Check", desc: "RVs are often financed long-term. Confirm the title is free of unreleased liens." },
      { href: "/vin-decoder", label: "VIN Decoder", desc: "Decode the 17-character VIN to the chassis make, model year, and build specs." },
    ],
    h2Faq: "RV VIN Check — Frequently Asked Questions",
    faqIntro: "The questions buyers ask most when checking a motorhome, trailer, or camper by VIN.",
    bottomBadge: "Free · Instant · VIN-Based",
    ctaBottomHeading: "Check Any RV or Motorhome by VIN",
    ctaBottomSub: "Enter the 17-character VIN from any motorhome, travel trailer, fifth wheel, or camper van to get the full history report.",
    ctaBottomNote: "No credit card · No sign-up · Free",
  },
  es: {
    home: "Inicio", crumb: "Verificación VIN de casa rodante",
    badge: "Casas rodantes motorizadas   ·   Remolques   ·   Campers",
    h1Lead: "Verificación VIN de ",
    h1Accent: "casa rodante y RV",
    intro: "Una casa rodante es una de las compras más grandes en el mercado de vehículos usados, sin embargo muchos compradores omiten la verificación VIN que es rutinaria para autos. Ingresa un VIN de 17 caracteres para revelar marcas de título, registros de accidentes, gravámenes activos, daño por inundación y recalls en cualquier casa rodante motorizada, remolque de viaje, quinta rueda o camper — gratis, antes de comprar.",
    formHeading: "Haz una verificación VIN gratis de casa rodante",
    formSub: "Ingresa el VIN de 17 caracteres de cualquier casa rodante motorizada, remolque o camper van para su reporte completo de historial",
    formNote: "Gratis · Sin registro · Resultado instantáneo",
    trustStats: [
      { icon: Caravan, value: "Todos los RV", label: "motorizados + remolcables" },
      { icon: ShieldCheck, value: "NMVTIS", label: "respaldo de título" },
      { icon: MapPin, value: "Por VIN", label: "17 caracteres" },
      { icon: Zap, value: "Gratis", label: "sin registro" },
    ],
    quickAnswerTag: "Respuesta rápida",
    quickAnswerLead: "Para verificar una casa rodante por VIN, ingresa su VIN de 17 caracteres y ejecuta el reporte de historial.",
    quickAnswerBody: " Tanto los RV motorizados (casas rodantes Clase A, B y C y camper vans) como los remolcables (remolques de viaje, quintas ruedas, tiendas de campaña) llevan un VIN de 17 caracteres, así que la verificación devuelve el estado de título respaldado por NMVTIS y marcas, registros de accidentes, gravámenes activos, daño por inundación y recalls. En casas rodantes motorizadas el VIN normalmente refleja al fabricante del chasis (Ford, Freightliner, RAM), no al constructor del coach (Thor, Winnebago) — confirma ambos. La verificación es gratis y no necesita registro.",
    h2How: "Cómo funciona una verificación VIN de RV",
    howIntro: "El historial de un RV se rastrea contra su VIN de 17 caracteres a través de registros DMV estatales y NMVTIS. Tres pasos convierten ese código en una imagen clara de lo que estás comprando.",
    howSteps: [
      { tag: "Paso 1", title: "Ingresa el VIN del RV", body: "Escribe el VIN de 17 caracteres del tablero o marco de puerta en una casa rodante motorizada, o del riel del chasis adelante-izquierdo o placa de datos en un remolque de viaje o camper." },
      { tag: "Paso 2", title: "Extraemos el historial", body: "La verificación consulta registros de título respaldados por NMVTIS y datos nacionales para estado de título, marcas de salvamento e inundación, registros de accidentes, gravámenes y recalls." },
      { tag: "Paso 3", title: "Revisa y verifica", body: "Escanea por títulos marcados y gravámenes no liberados, luego — para casas rodantes motorizadas — confirma tanto al fabricante del chasis como al constructor separado del coach." },
    ],
    h2Types: "Tipos de RV y dónde encontrar el VIN",
    typesIntro: "Los RV abarcan un amplio rango de configuraciones, y la ubicación del VIN varía según el tipo. Saber dónde buscar es el primer paso antes de ejecutar cualquier verificación de historial.",
    rvTypes: [
      { title: "Casas rodantes Clase A", body: "El VIN típicamente está en el tablero del lado del conductor (visible a través del parabrisas) y en el marco de puerta del lado del conductor, vinculado al fabricante del chasis." },
      { title: "Camper vans Clase B", body: "El VIN sigue la ubicación del fabricante de la van base — usualmente el tablero y marco de puerta, igual que la van de carga sobre la que fue construida." },
      { title: "Casas rodantes Clase C", body: "VIN en el tablero y marco de puerta del conductor; una placa de datos separada del constructor del coach a menudo está dentro de la puerta de entrada." },
      { title: "Remolques de viaje y quintas ruedas", body: "La placa VIN se ubica en el lado adelante-izquierdo (calle) del chasis, o en una placa de datos exterior cerca de la lengüeta." },
      { title: "Campers pop-up y plegables", body: "La placa VIN usualmente está en el chasis, a menudo cerca de la lengüeta o en el exterior del lado de calle de la unidad." },
      { title: "¿No encuentras el VIN?", body: "Verifica cruzado el título, registro y tarjeta de seguro — cada VIN de RV debe coincidir en los tres antes de ejecutar una verificación." },
    ],
    typesNoteBoldLead: "Dos fabricantes, un VIN",
    typesNoteSuffix: " — la mayoría de las casas rodantes Clase A y C se construyen sobre un chasis de Ford, Freightliner, Mercedes, RAM o Workhorse, luego un constructor de coach como Thor, Winnebago o Forest River agrega las áreas habitables. El VIN usualmente rastrea el chasis, así que problemas del coach como filtraciones del techo o fallas de slide-out pueden no aparecer en registros vinculados al VIN.",
    h2Report: "Qué cubre un reporte VIN de RV",
    reportIntro: "Un reporte VIN de RV devuelve los mismos datos centrales que un reporte de historial automotriz, con peso extra en los problemas que más importan dados los altos valores en dólares y la complejidad de los vehículos recreativos.",
    reports: [
      { title: "Estado y marcas de título", body: "Marcas de salvamento, reconstruido, chatarra e inundación reportadas por DMV estatales a NMVTIS — una pérdida por granizo o en estacionamiento puede totalizar un RV que se ve bien." },
      { title: "Gravámenes activos", body: "Los RV a menudo se financian con préstamos a largo plazo. Un gravamen no liberado puede bloquear una transferencia limpia de título, así que verifica el estado del gravamen antes de pagar." },
      { title: "Daño por accidente y estructural", body: "Daño al chasis, estructura del coach y slide-out es extremadamente costoso de reparar — y puede activar una pérdida total del seguro." },
      { title: "Información de recalls", body: "Los recalls de chasis NHTSA (tren motriz, frenos, seguridad) aparecen confiablemente; los recalls de coach por aparatos y slide-outs pueden reportarse por separado." },
      { title: "Chasis vs. coach", body: "El VIN normalmente refleja al fabricante del chasis (Ford, Freightliner, RAM), no al constructor del coach (Thor, Winnebago) — confirma ambos." },
      { title: "Daño por inundación y agua", body: "La intrusión de agua y marca por inundación importan doblemente en RV, donde la delaminación del techo y moho pueden esconderse detrás de un interior de apariencia limpia." },
    ],
    midCtaHeading: "¿Revisando un RV específico?",
    midCtaSub: "No te bases en la palabra del vendedor. Ejecuta el VIN para revelar marcas de título, gravámenes y registros de accidentes — gratis, en segundos.",
    h2Issues: "Problemas de título específicos de RV a los que prestar atención",
    issues1: "Los RV enfrentan complicaciones de título menos comunes en autos. Unidades convertidas de un uso a otro — un autobús shuttle a una camper van, una van comercial a una construcción DIY — pueden llevar historial de título que no refleja la configuración actual.",
    issues2BoldLead: "Los RV con marca de salvamento son una preocupación particular.",
    issues2Suffix: " Una tormenta de granizo o incidente de estacionamiento que sería cosmético en un auto puede activar una declaración de pérdida total en un RV, porque las reparaciones del cuerpo del coach son desproporcionadamente costosas. Un RV con marca de salvamento puede verse perfectamente bien y aún así llevar una marca que destroza la asegurabilidad y el valor de reventa.",
    issues3Pre: "Las liberaciones de gravámenes de prestamistas — especialmente en RV financiados más antiguos — pueden no estar claramente documentadas en cada sistema estatal. Siempre ejecuta una ",
    issues3Link1: "verificación de título de salvamento",
    issues3Mid: " y un reporte completo de ",
    issues3Link2: "historial VIN",
    issues3Suffix: " antes de hacer cualquier oferta.",
    checklistTitle: "Lista del comprador de RV usado",
    buyingChecklist: [
      "Coincide el VIN entre el chasis/tablero, título, registro y seguro",
      "Ejecuta el VIN por marcas de título de salvamento, reconstruido, chatarra e inundación",
      "Confirma que no hay gravámenes no liberados antes de entregar dinero",
      "Identifica tanto al fabricante del chasis como al constructor del coach",
      "Pide a un técnico certificado por RVIA que inspeccione techo, slide-outs y gas LP",
      "Solicita el historial de mantenimiento y cualquier garantía transferible",
    ],
    checklistCta: "Comienza con el VIN:",
    h2Safely: "Comprando un RV usado de forma segura",
    safelyIntro: "El mercado de RV usados exige más debida diligencia que los autos usados: cantidades en dólares más altas, mayor complejidad y menos protecciones al consumidor. Una venta privada de RV no incluye garantía de concesionario, cobertura de ley de limones ni recurso limitado una vez que aparecen los problemas.",
    safelyCards: [
      { title: "Verifica el título primero", body: "Ejecuta el VIN por marcas de salvamento, reconstruido, chatarra e inundación y confirma que no haya gravámenes no liberados antes de siquiera programar una visita." },
      { title: "Obtén una inspección RVIA", body: "Un técnico certificado debe verificar el techo por delaminación e intrusión de agua, los sellos de slide-out, el sistema de gas LP, aparatos y el bajo del chasis." },
      { title: "Exige documentación", body: "Solicita el historial completo de mantenimiento, cualquier garantía aún vigente y registros de reparaciones pasadas antes de acordar el precio." },
    ],
    safelyNoteBoldLead: "El historial de accidentes es costoso.",
    safelyNoteMid: " Un accidente de casa rodante motorizada Clase A puede involucrar daño al chasis, estructura del coach o slide-out — cualquiera de los cuales asciende a miles. Combina la verificación VIN con una ",
    safelyNoteLink: "verificación de historial de accidentes",
    safelyNoteSuffix: " para protección pre-compra completa.",
    h2Internal: "Más verificaciones VIN que se combinan con una verificación de RV",
    internalIntro: "La verificación VIN es una pieza. Estas herramientas completan la imagen antes de comprar un RV usado.",
    internalLinks: [
      { href: "/salvage-title-check", label: "Verificación título salvamento", desc: "Una pérdida por granizo o en estacionamiento puede marcar como salvamento un RV que se ve perfectamente bien — atrápalo antes de comprar." },
      { href: "/vin-check", label: "Verificación completa de historial VIN", desc: "Registros de título, accidente, gravamen, odómetro y recalls del RV en un reporte completo." },
      { href: "/accident-history-check", label: "Verificación historial accidentes", desc: "El daño al chasis y coach es costoso — ve los accidentes reportados antes de hacer una oferta." },
      { href: "/recall-check", label: "Verificación de recalls", desc: "Recalls de chasis NHTSA abiertos para el tren motriz, frenos y sistemas de seguridad del RV — reparados gratis por el concesionario." },
      { href: "/vehicle-lien-check", label: "Verificación de gravamen vehicular", desc: "Los RV a menudo se financian a largo plazo. Confirma que el título esté libre de gravámenes no liberados." },
      { href: "/vin-decoder", label: "Decodificador VIN", desc: "Decodifica el VIN de 17 caracteres a la marca del chasis, año modelo y especificaciones de construcción." },
    ],
    h2Faq: "Verificación VIN de RV — Preguntas frecuentes",
    faqIntro: "Las preguntas que más hacen los compradores al verificar una casa rodante motorizada, remolque o camper por VIN.",
    bottomBadge: "Gratis · Instantáneo · Basado en VIN",
    ctaBottomHeading: "Verifica cualquier casa rodante o motorhome por VIN",
    ctaBottomSub: "Ingresa el VIN de 17 caracteres de cualquier casa rodante motorizada, remolque de viaje, quinta rueda o camper van para obtener el reporte completo de historial.",
    ctaBottomNote: "Sin tarjeta de crédito · Sin registro · Gratis",
  },
} as const;

const FAQS_EN = [
  { question: "Do RVs and motorhomes have VINs?", answer: "Yes. Both motorized RVs (Class A, B, and C motorhomes and camper vans) and towable units (travel trailers, fifth wheels, pop-up campers) carry a 17-character Vehicle Identification Number, just like cars. The VIN is how you title, register, insure, and run a history check on any recreational vehicle. Knowing the exact VIN is the starting point for any RV VIN check." },
  { question: "Where is the VIN located on a motorhome or travel trailer?", answer: "On Class A, B, and C motorhomes the VIN is usually on the driver-side dashboard (visible through the windshield) and on the driver-side door jamb, following the chassis manufacturer's placement. On travel trailers, fifth wheels, and pop-up campers the VIN is typically stamped on the forward left (street) side of the frame or on an exterior data plate near the tongue." },
  { question: "How do I check an RV's history by VIN?", answer: "Enter the 17-character VIN from the dashboard, door jamb, or frame plate into a VIN history tool. The report queries NMVTIS-backed title records and other national data sources to return title status, branding, accident records, liens, and recall data. For motorhomes, decode results often reflect the chassis manufacturer rather than the coach builder, so confirm both when reviewing the report." },
  { question: "Is an RV VIN check free?", answer: "Yes. Running an RV VIN check here is free and requires no sign-up — enter the 17-character VIN to see title status, branding signals, accident records, and recall data. A full NMVTIS-backed history report with the complete title-brand and lien detail may carry a fee, but the initial VIN check costs nothing." },
  { question: "Can a VIN check show RV title brands, salvage, flood damage, and liens?", answer: "Yes. RV title brands such as salvage, rebuilt, and flood, plus active liens, can appear in NMVTIS-backed checks the same way they do for cars, because state DMVs report this data into the national system. Liens matter most for RVs since they are often financed with long-term loans, and an unreleased lien can block a clean title transfer. Always verify the lien status before paying." },
  { question: "How does the chassis maker differ from the coach builder in an RV VIN?", answer: "Most Class A and Class C motorhomes are built on a chassis from Ford, Freightliner, Mercedes, RAM, or Workhorse, while a separate company such as Winnebago, Thor, or Forest River builds the living quarters (the coach). The first three VIN characters (the WMI) usually identify the chassis manufacturer, so a VIN decode commonly reflects the chassis maker, not the coach builder." },
  { question: "What is the difference between a motorhome VIN and a towable trailer VIN?", answer: "Both use a 17-character VIN, but a motorized RV (Class A, B, or C) is titled and registered as a self-propelled motor vehicle, with the VIN tied to the chassis manufacturer. A travel trailer or fifth wheel is a non-motorized towable, so its VIN tracks title and lien data but some states register towables separately from standard motor vehicles. Check your state's rules for the exact process." },
  { question: "Are RV recalls included in a VIN check?", answer: "Chassis recalls are well documented. Recall data for the drivetrain, brakes, and safety systems comes from NHTSA and is tied to the chassis manufacturer's VIN, so it surfaces reliably in a VIN check. Coach-specific recalls (appliances, slideouts, electrical) may be reported separately by the coach builder and can be less complete in VIN-linked records, so also check the coach maker's recall notices directly." },
  { question: "Why is a VIN check more important for an RV than a regular car?", answer: "RVs carry higher dollar values, more complex systems, and fewer consumer protections than cars — private RV sales come with no dealer warranty or lemon-law coverage in most states. A modest hail or parking-lot incident can total an RV because coach repairs are so costly, leaving a salvage brand on a unit that looks fine. A VIN check surfaces those title brands, liens, and accident records before you commit thousands of dollars." },
];

const FAQS_ES = [
  { question: "¿Las casas rodantes y motorhomes tienen VIN?", answer: "Sí. Tanto los RV motorizados (casas rodantes Clase A, B y C y camper vans) como las unidades remolcables (remolques de viaje, quintas ruedas, tiendas de campaña) llevan un Número de Identificación Vehicular de 17 caracteres, igual que los autos. El VIN es cómo titulas, registras, aseguras y ejecutas una verificación de historial en cualquier vehículo recreativo. Conocer el VIN exacto es el punto de partida para cualquier verificación VIN de RV." },
  { question: "¿Dónde está ubicado el VIN en una casa rodante motorizada o remolque de viaje?", answer: "En casas rodantes Clase A, B y C el VIN usualmente está en el tablero del lado del conductor (visible a través del parabrisas) y en el marco de puerta del lado del conductor, siguiendo la ubicación del fabricante del chasis. En remolques de viaje, quintas ruedas y tiendas de campaña el VIN típicamente está estampado en el lado adelante-izquierdo (calle) del chasis o en una placa de datos exterior cerca de la lengüeta." },
  { question: "¿Cómo verifico el historial de un RV por VIN?", answer: "Ingresa el VIN de 17 caracteres del tablero, marco de puerta o placa de chasis en una herramienta de historial VIN. El reporte consulta registros de título respaldados por NMVTIS y otras fuentes nacionales de datos para devolver estado de título, marcas, registros de accidentes, gravámenes y datos de recalls. Para casas rodantes motorizadas, los resultados de decodificación a menudo reflejan al fabricante del chasis en lugar del constructor del coach, así que confirma ambos al revisar el reporte." },
  { question: "¿Es gratis una verificación VIN de RV?", answer: "Sí. Ejecutar una verificación VIN de RV aquí es gratis y no requiere registro — ingresa el VIN de 17 caracteres para ver estado de título, señales de marcas, registros de accidentes y datos de recalls. Un reporte completo de historial respaldado por NMVTIS con el detalle completo de marca de título y gravamen puede llevar una tarifa, pero la verificación VIN inicial no cuesta nada." },
  { question: "¿Una verificación VIN puede mostrar marcas de título de RV, salvamento, daño por inundación y gravámenes?", answer: "Sí. Las marcas de título de RV como salvamento, reconstruido e inundación, más gravámenes activos, pueden aparecer en verificaciones respaldadas por NMVTIS de la misma manera que para autos, porque los DMV estatales reportan estos datos al sistema nacional. Los gravámenes importan más para RV ya que a menudo se financian con préstamos a largo plazo, y un gravamen no liberado puede bloquear una transferencia limpia de título. Siempre verifica el estado del gravamen antes de pagar." },
  { question: "¿Cómo difiere el fabricante del chasis del constructor del coach en un VIN de RV?", answer: "La mayoría de las casas rodantes Clase A y Clase C se construyen sobre un chasis de Ford, Freightliner, Mercedes, RAM o Workhorse, mientras que una compañía separada como Winnebago, Thor o Forest River construye las áreas habitables (el coach). Los primeros tres caracteres del VIN (el WMI) usualmente identifican al fabricante del chasis, así que una decodificación VIN comúnmente refleja al fabricante del chasis, no al constructor del coach." },
  { question: "¿Cuál es la diferencia entre un VIN de casa rodante motorizada y un VIN de remolque remolcable?", answer: "Ambos usan un VIN de 17 caracteres, pero un RV motorizado (Clase A, B o C) se titula y registra como vehículo motor autopropulsado, con el VIN vinculado al fabricante del chasis. Un remolque de viaje o quinta rueda es un remolcable no motorizado, así que su VIN rastrea datos de título y gravamen pero algunos estados registran remolcables por separado de los vehículos motor estándar. Revisa las reglas de tu estado para el proceso exacto." },
  { question: "¿Los recalls de RV están incluidos en una verificación VIN?", answer: "Los recalls de chasis están bien documentados. Los datos de recall para el tren motriz, frenos y sistemas de seguridad provienen de NHTSA y están vinculados al VIN del fabricante del chasis, así que aparecen confiablemente en una verificación VIN. Los recalls específicos del coach (aparatos, slide-outs, eléctrico) pueden reportarse por separado por el constructor del coach y pueden ser menos completos en registros vinculados al VIN, así que también revisa los avisos de recall del fabricante del coach directamente." },
  { question: "¿Por qué es más importante una verificación VIN para un RV que para un auto regular?", answer: "Los RV cargan valores en dólares más altos, sistemas más complejos y menos protecciones al consumidor que los autos — las ventas privadas de RV no incluyen garantía de concesionario o cobertura de ley de limones en la mayoría de estados. Un incidente modesto de granizo o estacionamiento puede totalizar un RV porque las reparaciones del coach son tan costosas, dejando una marca de salvamento en una unidad que se ve bien. Una verificación VIN revela esas marcas de título, gravámenes y registros de accidentes antes de que comprometas miles de dólares." },
];

interface Props { locale: Locale; }

export default function RvVinCheckBody({ locale }: Props) {
  const c = COPY[locale];
  const faqs = locale === "es" ? FAQS_ES : FAQS_EN;
  const link = (en: string) => (locale === "es" ? `/es${en}` : en);

  return (
    <article className="pb-16 bg-surface">
      <div className="bg-primary text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20">
          <Breadcrumbs items={[{ label: c.home, href: locale === "es" ? "/es" : "/" }, { label: c.crumb }]} onDark />
          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
            <Caravan className="w-4 h-4" /> {c.badge}
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
        <section className="pt-12 sm:pt-16">
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5 sm:p-7">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-[11px] font-black uppercase tracking-wider text-primary">{c.quickAnswerTag}</span>
            </div>
            <p className="fast-answer text-base sm:text-lg text-on-surface leading-relaxed">
              <strong className="text-primary">{c.quickAnswerLead}</strong>
              {c.quickAnswerBody}
            </p>
          </div>
        </section>

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
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Types}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.typesIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {c.rvTypes.map((t, i) => {
              const Icon = RV_TYPE_ICONS[i];
              return (
                <div key={t.title} className="rounded-2xl border border-outline-variant bg-surface p-5">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-base font-headline font-extrabold text-primary mb-1">{t.title}</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{t.body}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-6 rounded-2xl bg-secondary-container/40 border border-outline-variant p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <Cog className="w-5 h-5 text-on-secondary-container flex-shrink-0 mt-0.5" />
              <p className="text-sm text-on-surface leading-relaxed">
                <strong className="text-on-surface">{c.typesNoteBoldLead}</strong>
                {c.typesNoteSuffix}
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Report}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.reportIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {c.reports.map((r, i) => {
              const Icon = REPORT_ICONS[i];
              return (
                <div key={r.title} className="rounded-2xl border border-outline-variant bg-surface p-5">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-base font-headline font-extrabold text-primary mb-1">{r.title}</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{r.body}</p>
                </div>
              );
            })}
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
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">{c.h2Issues}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>{c.issues1}</p>
              <p>
                <strong className="text-on-surface">{c.issues2BoldLead}</strong>
                {c.issues2Suffix}
              </p>
              <p>
                {c.issues3Pre}
                <Link href={link("/salvage-title-check")} className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.issues3Link1}</Link>
                {c.issues3Mid}
                <Link href={link("/vin-check")} className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.issues3Link2}</Link>
                {c.issues3Suffix}
              </p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <ClipboardCheck className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">{c.checklistTitle}</h3>
              </div>
              <ul className="space-y-2 text-sm text-on-surface">
                {c.buyingChecklist.map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 rounded-xl bg-white p-4 border border-outline-variant">
                <p className="text-xs font-bold text-on-surface mb-2">{c.checklistCta}</p>
                <VinSearchForm size="sm" />
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Safely}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.safelyIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {c.safelyCards.map((item, i) => {
              const Icon = BUY_ICONS[i];
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
              <AlertTriangle className="w-5 h-5 text-on-secondary-container flex-shrink-0 mt-0.5" />
              <p className="text-sm text-on-surface leading-relaxed">
                <strong className="text-on-surface">{c.safelyNoteBoldLead}</strong>
                {c.safelyNoteMid}
                <Link href={link("/accident-history-check")} className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.safelyNoteLink}</Link>
                {c.safelyNoteSuffix}
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
                  <h3 className="text-sm sm:text-base font-headline font-extrabold text-primary pr-2 m-0">{f.question}</h3>
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

        <RelatedChecks exclude="/rv-vin-check" />
      </div>
    </article>
  );
}

export { FAQS_EN, FAQS_ES };
