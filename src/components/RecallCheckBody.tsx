/**
 * Shared body for /recall-check and /es/recall-check.
 * Wave 18a — full English layout in both locales via COPY={en,es}.
 */

import Link from "next/link";
import {
  Check, FileText, AlertCircle, Clock, Siren, Wrench, ChevronRight,
  Star, Lock, Zap, BadgeCheck, Building2, ShieldAlert,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import type { Locale } from "@/i18n/config";

const RECORD_ICONS = [AlertCircle, FileText, Siren, ShieldAlert, Wrench, Building2] as const;

const COPY = {
  en: {
    home: "Home", crumb: "Recall Check",
    badge: "NHTSA Safety Recalls",
    h1Lead: "VIN Recall Check — ",
    h1Accent: "Open NHTSA Safety Recalls",
    intro: "Find out if a vehicle has unrepaired safety recalls before you drive or buy it. Enter a 17-character VIN to see the affected component, campaign number, defect, safety risk, and the free dealer remedy. Free preview, no credit card, results in under 5 seconds.",
    formHeading: "Check for Open Safety Recalls by VIN",
    formSub: "Enter any 17-character VIN — cars, trucks, motorcycles, RVs",
    secureNote: "256-bit encrypted · DPPA compliant · No personal data stored",
    trustStats: [
      { icon: Siren, value: "NHTSA", label: "official recall data" },
      { icon: ShieldAlert, value: "Open", label: "unrepaired campaigns flagged" },
      { icon: Clock, value: "< 5 sec", label: "average report time" },
      { icon: BadgeCheck, value: "Free preview", label: "no credit card needed" },
    ],
    statsHeading: "VIN Recall Check — By the Numbers",
    headlineStats: [
      { value: "NHTSA", label: "Official US recall database" },
      { value: "VIN-level", label: "Matched to the exact build range" },
      { value: "6 fields", label: "Captured per recall campaign" },
      { value: "< 5 sec", label: "Average VIN decode time" },
      { value: "$0", label: "Cost for the free preview" },
    ],
    h2Why: "Why an Open Recall Is the Free Fix Most Owners Never Claim",
    whyPre: "A safety recall is issued when a manufacturer or the ",
    whyNhtsa: "National Highway Traffic Safety Administration (NHTSA)",
    whyMid1: " finds that a vehicle has a defect that creates an unreasonable safety risk or fails a federal safety standard. The automaker is then legally required to notify owners and fix the defect ",
    whyBoldFree: "at no cost",
    whyMid1End: ". The catch is that the notice only reaches whoever the manufacturer can find, so used cars that have changed hands often carry open recalls the current driver never heard about.",
    why2: "That gap is dangerous and common. Recalls cover airbag inflators that can rupture, fuel systems that can catch fire, brakes that can fail, and software that can disable safety features. When a vehicle is sold privately, the open recall transfers with it silently. Nothing on the title or the listing warns you, and the seller may not know either.",
    why3: "A VIN recall check closes that gap. It matches the exact 17-character VIN against the NHTSA database and returns every open campaign on file, so you know what is wrong, how serious it is, and that the repair is waiting for you free at any franchised dealer.",
    h2Record: "What Each Recall Record Shows",
    recordIntro: "For every open campaign on file, the report captures the details you need to understand the risk and book the remedy.",
    recordFields: [
      { title: "Affected Component", desc: "The exact system under recall: airbag inflators, brakes, fuel system, steering, wiring, or safety software." },
      { title: "NHTSA Campaign Number", desc: "The official campaign ID a dealer uses to order the right parts and log the remedy. Bring it with the VIN." },
      { title: "Defect Summary", desc: "A plain-language description of what is wrong and the conditions under which the defect can occur." },
      { title: "Safety Risk", desc: "The consequence the recall is meant to prevent, such as fire, loss of steering, or airbag rupture and injury." },
      { title: "Free Remedy", desc: "The repair, replacement, or refund the manufacturer must provide at no cost to the owner at any franchised dealer." },
      { title: "Manufacturer & Date", desc: "Which automaker issued the campaign and when, so you can gauge how recent the recall is and whether parts are available." },
    ],
    h2OpenVs: "Open vs. Completed, and Recall vs. Service Bulletin",
    openVsIntro: "Two distinctions decide what a recall record actually means for you: whether the remedy has been done, and whether you are even looking at a recall.",
    openCardTitle: "Open Recall",
    openCardBody: "A safety defect is confirmed for this VIN and the free repair has not been performed yet.",
    openCardBullets: ["The remedy is available and free, just not done", "Transfers with the car to every new owner", "A negotiating point, and sometimes a do-not-drive warning"],
    doneCardTitle: "Completed Recall & TSBs",
    doneCardBody: "A completed recall was already remedied and logged. A service bulletin (TSB) documents a known fix but carries no free-repair obligation.",
    doneCardBullets: ["Keep the dealer service receipt as proof of completion", "Allow a short lag before a repair shows as completed", "A TSB is guidance, not a recall, and is usually not free"],
    h2Steps: "How to Check a VIN for Recalls — Step-by-Step",
    stepsIntro: "Checking and acting on recalls takes under two minutes.",
    steps: [
      { step: "01", title: "Locate the VIN", body: "The 17-character VIN is on the dashboard through the lower windshield, the driver-side door jamb sticker, and the title. Confirm all three match before you rely on a result." },
      { step: "02", title: "Run the VIN above", body: "Enter the VIN. The lookup matches it against NHTSA campaign data, including the specific build-date and factory ranges each recall targets, so you only see recalls that apply to this exact car." },
      { step: "03", title: "Read each open campaign", body: "For every open recall, review the affected component, the campaign number, the defect summary, and the safety risk. The campaign number is what a dealer needs to order parts." },
      { step: "04", title: "Separate open from completed", body: "Confirm which recalls are still open and which were remedied. If the seller claims a recall was fixed, ask for the dated service receipt rather than trusting the database alone." },
      { step: "05", title: "Book the free remedy", body: "Take the VIN and campaign number to any franchised dealer for the brand. The repair is performed at no cost, even if you are not the original owner. If parts are not ready, ask to join the waiting list." },
    ],
    h2Priority: "Recalls You Should Never Ignore",
    priorityIntro: "Any open recall is worth fixing, but these categories carry the highest injury risk and deserve immediate action.",
    priorities: [
      { flag: "Takata airbag inflator", desc: "Inflators that can rupture and fire metal fragments at occupants. The largest recall in US history; treat as fix-before-driving urgent." },
      { flag: "Fuel system or fire risk", desc: "Leaks, faulty fuel pumps, or wiring that can ignite. Park-outside-until-repaired warnings often accompany these campaigns." },
      { flag: "Brake or steering failure", desc: "Loss of braking or steering control is a direct crash risk. Do not delay the remedy on these." },
      { flag: "Electrical and software faults", desc: "Stalling, unintended acceleration, or disabled safety systems from defective electronics or firmware." },
      { flag: "Seatbelt or restraint defect", desc: "Belts that can fail to latch or restrain properly during a crash, reducing occupant protection." },
      { flag: "Remedy not yet available", desc: "An open recall with parts still in production. Join the dealer waiting list and ask about interim safety measures." },
    ],
    priorityBoldLead: "Bottom line:",
    priorityBoldRest: " a recall remedy is free, legally guaranteed, and tied to your VIN no matter how many owners the car has had. The only cost of an open recall is the risk of leaving it unrepaired.",
    midCtaHeading: "Check a VIN for Open Recalls Now",
    midCtaSub: "Free preview, instant, no credit card. See open NHTSA safety recalls, defect summaries, and the free dealer remedy in under 5 seconds.",
    h2Internal: "Related Vehicle History Checks",
    internalIntro: "A recall check is one safety signal. These checks cover the records it connects to.",
    internalLinks: [
      { href: "/airbag-check", label: "Airbag Check", desc: "Check Takata and airbag-deployment history." },
      { href: "/vin-check", label: "Full VIN Check", desc: "Run a complete vehicle history report." },
      { href: "/accident-history-check", label: "Accident History Check", desc: "Review collision and damage records." },
      { href: "/warranty-check", label: "Warranty Check", desc: "See how recalls relate to factory coverage." },
      { href: "/lemon-check", label: "Lemon Check", desc: "Find buyback and repeat-defect records." },
      { href: "/salvage-title-check", label: "Salvage Title Check", desc: "Verify salvage and rebuilt title brands." },
      { href: "/odometer-check", label: "Odometer Check", desc: "Cross-check mileage for rollback." },
      { href: "/vin-decoder", label: "VIN Decoder", desc: "Decode the build details behind the VIN." },
    ],
    h2Faq: "Frequently Asked Questions — VIN Recall Check",
    faqIntro: "The questions drivers and used-car buyers ask most about safety recalls.",
    bottomBadge: "Free preview · Instant · NHTSA Data",
    ctaBottomHeading: "Don't Drive on an Unrepaired Recall",
    ctaBottomSub: "An open recall can hide behind a clean-looking car. One VIN check shows every unrepaired NHTSA campaign and the free fix waiting at the dealer, in 5 seconds.",
    h2Sources: "Sources & Data Authority",
    sourcesIntro: "Recall data is read alongside federal safety and title records so the full picture is consistent. Below are the primary sources and the agencies you can cross-check with.",
    sourcesNote: "Recall availability varies by vehicle. Very recently announced campaigns may take time to appear in a VIN lookup, and a clear result does not replace confirming status with a franchised dealer before purchase.",
  },
  es: {
    home: "Inicio", crumb: "Verificación de recalls",
    badge: "Recalls de seguridad NHTSA",
    h1Lead: "Verificación VIN de recalls — ",
    h1Accent: "Recalls de seguridad NHTSA abiertos",
    intro: "Descubre si un vehículo tiene recalls de seguridad sin reparar antes de conducirlo o comprarlo. Ingresa un VIN de 17 caracteres para ver el componente afectado, número de campaña, defecto, riesgo de seguridad y la reparación gratuita del concesionario. Vista previa gratuita, sin tarjeta de crédito, resultados en menos de 5 segundos.",
    formHeading: "Verifica recalls de seguridad abiertos por VIN",
    formSub: "Ingresa cualquier VIN de 17 caracteres — autos, camionetas, motocicletas, RVs",
    secureNote: "Cifrado 256-bit · Cumple con DPPA · No se almacenan datos personales",
    trustStats: [
      { icon: Siren, value: "NHTSA", label: "datos oficiales de recalls" },
      { icon: ShieldAlert, value: "Abiertos", label: "campañas sin reparar marcadas" },
      { icon: Clock, value: "< 5 seg", label: "tiempo promedio de reporte" },
      { icon: BadgeCheck, value: "Vista gratis", label: "sin tarjeta de crédito" },
    ],
    statsHeading: "Verificación VIN de recalls — En cifras",
    headlineStats: [
      { value: "NHTSA", label: "Base de datos oficial de recalls de EE. UU." },
      { value: "Por VIN", label: "Coincidencia con el rango exacto de fabricación" },
      { value: "6 campos", label: "Capturados por campaña de recall" },
      { value: "< 5 seg", label: "Tiempo promedio de decodificación VIN" },
      { value: "$0", label: "Costo de la vista previa gratuita" },
    ],
    h2Why: "Por qué un recall abierto es la reparación gratuita que la mayoría de los dueños nunca reclama",
    whyPre: "Un recall de seguridad se emite cuando un fabricante o la ",
    whyNhtsa: "Administración Nacional de Seguridad del Tráfico en Carreteras (NHTSA)",
    whyMid1: " determina que un vehículo tiene un defecto que crea un riesgo de seguridad irrazonable o falla un estándar federal de seguridad. El fabricante está legalmente obligado a notificar a los propietarios y reparar el defecto ",
    whyBoldFree: "sin costo",
    whyMid1End: ". El problema es que el aviso solo llega a quien el fabricante pueda encontrar, así que los autos usados que han cambiado de manos a menudo cargan recalls abiertos de los que el conductor actual nunca se enteró.",
    why2: "Esa brecha es peligrosa y común. Los recalls cubren infladores de bolsas de aire que pueden romperse, sistemas de combustible que pueden incendiarse, frenos que pueden fallar y software que puede deshabilitar funciones de seguridad. Cuando un vehículo se vende de forma privada, el recall abierto se transfiere silenciosamente. Nada en el título o el listado te advierte, y el vendedor puede no saberlo tampoco.",
    why3: "Una verificación VIN de recalls cierra esa brecha. Coincide el VIN exacto de 17 caracteres con la base de datos NHTSA y devuelve cada campaña abierta registrada, así que sabes qué está mal, qué tan serio es y que la reparación te espera gratis en cualquier concesionario franquicia.",
    h2Record: "Qué muestra cada registro de recall",
    recordIntro: "Para cada campaña abierta registrada, el reporte captura los detalles que necesitas para entender el riesgo y reservar la reparación.",
    recordFields: [
      { title: "Componente afectado", desc: "El sistema exacto bajo recall: infladores de bolsas de aire, frenos, sistema de combustible, dirección, cableado o software de seguridad." },
      { title: "Número de campaña NHTSA", desc: "El ID oficial de la campaña que un concesionario usa para ordenar las piezas correctas y registrar la reparación. Tráelo con el VIN." },
      { title: "Resumen del defecto", desc: "Una descripción en lenguaje sencillo de qué está mal y bajo qué condiciones puede ocurrir el defecto." },
      { title: "Riesgo de seguridad", desc: "La consecuencia que el recall busca prevenir, como incendio, pérdida de dirección o ruptura de bolsa de aire y lesión." },
      { title: "Reparación gratuita", desc: "La reparación, reemplazo o reembolso que el fabricante debe proporcionar sin costo al dueño en cualquier concesionario franquicia." },
      { title: "Fabricante y fecha", desc: "Qué fabricante emitió la campaña y cuándo, para que puedas evaluar qué tan reciente es el recall y si hay piezas disponibles." },
    ],
    h2OpenVs: "Abierto vs. completado, y recall vs. boletín de servicio",
    openVsIntro: "Dos distinciones deciden qué significa realmente un registro de recall para ti: si la reparación se hizo, y si siquiera estás viendo un recall.",
    openCardTitle: "Recall abierto",
    openCardBody: "Un defecto de seguridad está confirmado para este VIN y la reparación gratuita no se ha realizado todavía.",
    openCardBullets: ["La reparación está disponible y es gratuita, solo no se ha hecho", "Se transfiere con el auto a cada nuevo dueño", "Un punto de negociación, y a veces una advertencia de no conducir"],
    doneCardTitle: "Recall completado y TSBs",
    doneCardBody: "Un recall completado ya fue reparado y registrado. Un boletín de servicio (TSB) documenta una reparación conocida pero no conlleva obligación de reparación gratuita.",
    doneCardBullets: ["Guarda el recibo de servicio del concesionario como prueba de finalización", "Permite un breve retraso antes de que una reparación aparezca como completada", "Un TSB es guía, no un recall, y usualmente no es gratis"],
    h2Steps: "Cómo verificar un VIN por recalls — Paso a paso",
    stepsIntro: "Verificar y actuar sobre recalls toma menos de dos minutos.",
    steps: [
      { step: "01", title: "Localiza el VIN", body: "El VIN de 17 caracteres está en el tablero a través del parabrisas inferior, la calcomanía del marco de la puerta del conductor y el título. Confirma que los tres coincidan antes de confiar en un resultado." },
      { step: "02", title: "Ejecuta el VIN arriba", body: "Ingresa el VIN. La búsqueda lo coincide con datos de campañas NHTSA, incluyendo los rangos específicos de fecha de fabricación y fábrica que cada recall apunta, así que solo ves recalls que aplican a este auto exacto." },
      { step: "03", title: "Lee cada campaña abierta", body: "Para cada recall abierto, revisa el componente afectado, el número de campaña, el resumen del defecto y el riesgo de seguridad. El número de campaña es lo que un concesionario necesita para ordenar piezas." },
      { step: "04", title: "Separa abierto de completado", body: "Confirma qué recalls siguen abiertos y cuáles fueron reparados. Si el vendedor afirma que un recall fue reparado, pide el recibo de servicio con fecha en lugar de confiar solo en la base de datos." },
      { step: "05", title: "Reserva la reparación gratuita", body: "Lleva el VIN y el número de campaña a cualquier concesionario franquicia de la marca. La reparación se realiza sin costo, incluso si no eres el dueño original. Si las piezas no están listas, pide unirte a la lista de espera." },
    ],
    h2Priority: "Recalls que nunca debes ignorar",
    priorityIntro: "Cualquier recall abierto vale la pena repararlo, pero estas categorías conllevan el mayor riesgo de lesión y merecen acción inmediata.",
    priorities: [
      { flag: "Inflador de bolsa de aire Takata", desc: "Infladores que pueden romperse y disparar fragmentos de metal a los ocupantes. El recall más grande en la historia de EE. UU.; trátalo como urgente, reparar antes de conducir." },
      { flag: "Sistema de combustible o riesgo de incendio", desc: "Fugas, bombas de combustible defectuosas o cableado que puede encenderse. Advertencias de estacionar afuera hasta la reparación a menudo acompañan estas campañas." },
      { flag: "Falla de frenos o dirección", desc: "Pérdida de control de frenos o dirección es un riesgo directo de choque. No demores la reparación en estos." },
      { flag: "Fallas eléctricas y de software", desc: "Apagones, aceleración no intencionada o sistemas de seguridad deshabilitados por electrónicos o firmware defectuosos." },
      { flag: "Defecto de cinturón o sistema de retención", desc: "Cinturones que pueden fallar al abrocharse o sujetar adecuadamente durante un choque, reduciendo la protección del ocupante." },
      { flag: "Reparación aún no disponible", desc: "Un recall abierto con piezas aún en producción. Únete a la lista de espera del concesionario y pregunta sobre medidas de seguridad provisionales." },
    ],
    priorityBoldLead: "En resumen:",
    priorityBoldRest: " una reparación de recall es gratuita, legalmente garantizada y atada a tu VIN sin importar cuántos dueños haya tenido el auto. El único costo de un recall abierto es el riesgo de dejarlo sin reparar.",
    midCtaHeading: "Verifica un VIN por recalls abiertos ahora",
    midCtaSub: "Vista previa gratuita, instantánea, sin tarjeta de crédito. Mira recalls de seguridad NHTSA abiertos, resúmenes de defectos y la reparación gratuita del concesionario en menos de 5 segundos.",
    h2Internal: "Verificaciones de historial vehicular relacionadas",
    internalIntro: "Una verificación de recall es una señal de seguridad. Estas verificaciones cubren los registros con los que se conecta.",
    internalLinks: [
      { href: "/airbag-check", label: "Verificación de bolsa de aire", desc: "Verifica historial de Takata y despliegue de bolsas de aire." },
      { href: "/vin-check", label: "Verificación VIN completa", desc: "Ejecuta un reporte completo de historial vehicular." },
      { href: "/accident-history-check", label: "Verificación historial de accidentes", desc: "Revisa registros de colisiones y daños." },
      { href: "/warranty-check", label: "Verificación de garantía", desc: "Mira cómo los recalls se relacionan con la cobertura de fábrica." },
      { href: "/lemon-check", label: "Verificación de limones", desc: "Encuentra registros de recompras y defectos repetidos." },
      { href: "/salvage-title-check", label: "Verificación título salvamento", desc: "Verifica marcas de título de salvamento y reconstruido." },
      { href: "/odometer-check", label: "Verificación de odómetro", desc: "Verifica el kilometraje cruzado por rollback." },
      { href: "/vin-decoder", label: "Decodificador VIN", desc: "Decodifica los detalles de fabricación detrás del VIN." },
    ],
    h2Faq: "Preguntas frecuentes — Verificación VIN de recalls",
    faqIntro: "Las preguntas que más hacen los conductores y compradores de autos usados sobre recalls de seguridad.",
    bottomBadge: "Vista previa gratuita · Instantánea · Datos NHTSA",
    ctaBottomHeading: "No conduzcas con un recall sin reparar",
    ctaBottomSub: "Un recall abierto puede esconderse detrás de un auto que se ve limpio. Una verificación VIN muestra cada campaña NHTSA sin reparar y la reparación gratuita esperando en el concesionario, en 5 segundos.",
    h2Sources: "Fuentes y autoridad de datos",
    sourcesIntro: "Los datos de recalls se leen junto con registros federales de seguridad y título para que la imagen completa sea consistente. A continuación las fuentes principales y las agencias con las que puedes verificar.",
    sourcesNote: "La disponibilidad de recalls varía por vehículo. Las campañas anunciadas muy recientemente pueden tardar en aparecer en una búsqueda VIN, y un resultado limpio no reemplaza confirmar el estado con un concesionario franquicia antes de la compra.",
  },
} as const;

const FAQS_EN = [
  { q: "How do I check for recalls by VIN?", a: "Enter the full 17-character VIN into a recall lookup tool, which queries the NHTSA recall database for your exact vehicle. Because recalls often target specific build-date ranges or factories, the VIN matches your car against the affected ranges precisely, more reliably than searching by year and model alone. The lookup returns any open (unrepaired) recall campaigns along with the affected component and defect description." },
  { q: "Are recall repairs free?", a: "Yes. Federal law requires the manufacturer to fix a safety recall at no cost to the owner, and the repair is performed free at any franchised dealer for that brand. You do not have to be the original owner or visit the dealer where the car was bought. The free remedy generally applies regardless of how many times the vehicle has changed hands, though very old vehicles can occasionally fall outside a manufacturer's obligation window." },
  { q: "What is the difference between an open and a completed recall?", a: "An open recall means a safety defect has been identified for your vehicle but the free repair has not yet been performed. A completed recall means an authorized dealer has already done the remedy and recorded it. A VIN lookup against NHTSA shows which recalls remain open for that specific vehicle. There can be a short lag between a repair being done and it showing as completed in the database, so keep the service receipt as proof." },
  { q: "What is a safety recall?", a: "A safety recall is issued when a manufacturer or NHTSA determines that a vehicle, tire, equipment, or child seat has a defect that creates an unreasonable safety risk or fails to meet federal safety standards. The manufacturer must notify owners and provide a free remedy, meaning a repair, replacement, or refund. A recall differs from a technical service bulletin, which documents a known issue and repair procedure but does not carry the same free-fix legal obligation." },
  { q: "Where does recall data come from?", a: "Recall information comes from the National Highway Traffic Safety Administration (NHTSA), which maintains the official U.S. recall database. Manufacturers report campaigns to NHTSA, which makes them publicly searchable by VIN. The data is updated as new campaigns are announced and as remedies become available. Be aware that very recently announced recalls, within roughly the past couple of weeks, may not yet appear in a VIN lookup while records are still being processed." },
  { q: "Can you buy or sell a car with an open recall?", a: "In most cases it is legal to sell a used car with an open recall, and buyers can purchase one. The open recall simply transfers with the vehicle and can be repaired for free afterward. New cars face stricter rules: dealers are generally barred from selling a new vehicle with an open recall until it is fixed. When buying used, treat an open recall as a negotiating point and have it remedied at a franchised dealer before or soon after purchase." },
  { q: "What is the Takata airbag recall?", a: "The Takata airbag inflator recall is the largest automotive recall in U.S. history, affecting tens of millions of vehicles across nearly every major manufacturer. The defect involves airbag inflators that can rupture and project metal fragments when deployed, posing a serious injury risk. Because it spans so many makes and model years, checking your VIN against the NHTSA database is the most reliable way to confirm whether your specific vehicle is affected and still unrepaired." },
  { q: "How do I get a recall fixed?", a: "Contact any franchised dealer for your vehicle's brand and provide the VIN and the recall campaign number from your report. The dealer orders the correct parts and performs the remedy at no charge. Repairs typically take a few hours to a full day. If parts are not yet available, ask to join a waiting list. For urgent recalls involving fire or airbag risk, dealers may provide a loaner vehicle while you wait for the remedy." },
];

const FAQS_ES = [
  { q: "¿Cómo verifico recalls por VIN?", a: "Ingresa el VIN completo de 17 caracteres en una herramienta de búsqueda de recalls, que consulta la base de datos de recalls de NHTSA para tu vehículo exacto. Como los recalls a menudo apuntan a rangos específicos de fechas de fabricación o fábricas, el VIN coincide con tu auto contra los rangos afectados de forma precisa, más confiable que buscar solo por año y modelo. La búsqueda devuelve cualquier campaña de recall abierta (sin reparar) junto con el componente afectado y la descripción del defecto." },
  { q: "¿Las reparaciones de recall son gratuitas?", a: "Sí. La ley federal requiere que el fabricante repare un recall de seguridad sin costo al dueño, y la reparación se realiza gratis en cualquier concesionario franquicia de esa marca. No tienes que ser el dueño original ni visitar el concesionario donde se compró el auto. La reparación gratuita generalmente aplica sin importar cuántas veces el vehículo haya cambiado de manos, aunque vehículos muy antiguos ocasionalmente pueden caer fuera de la ventana de obligación del fabricante." },
  { q: "¿Cuál es la diferencia entre un recall abierto y uno completado?", a: "Un recall abierto significa que se ha identificado un defecto de seguridad para tu vehículo pero la reparación gratuita aún no se ha realizado. Un recall completado significa que un concesionario autorizado ya hizo la reparación y la registró. Una búsqueda VIN contra NHTSA muestra qué recalls permanecen abiertos para ese vehículo específico. Puede haber un breve retraso entre que se hace una reparación y que aparezca como completada en la base de datos, así que guarda el recibo de servicio como prueba." },
  { q: "¿Qué es un recall de seguridad?", a: "Un recall de seguridad se emite cuando un fabricante o NHTSA determina que un vehículo, llanta, equipo o asiento infantil tiene un defecto que crea un riesgo de seguridad irrazonable o falla en cumplir estándares federales de seguridad. El fabricante debe notificar a los dueños y proporcionar una reparación gratuita, es decir, reparación, reemplazo o reembolso. Un recall difiere de un boletín de servicio técnico, que documenta un problema conocido y procedimiento de reparación pero no conlleva la misma obligación legal de reparación gratuita." },
  { q: "¿De dónde provienen los datos de recalls?", a: "La información de recalls proviene de la Administración Nacional de Seguridad del Tráfico en Carreteras (NHTSA), que mantiene la base de datos oficial de recalls de EE. UU. Los fabricantes reportan campañas a NHTSA, que las hace públicamente buscables por VIN. Los datos se actualizan a medida que se anuncian nuevas campañas y se vuelven disponibles las reparaciones. Ten en cuenta que recalls anunciados muy recientemente, dentro de aproximadamente las últimas dos semanas, pueden no aparecer aún en una búsqueda VIN mientras los registros se siguen procesando." },
  { q: "¿Puedes comprar o vender un auto con un recall abierto?", a: "En la mayoría de los casos es legal vender un auto usado con un recall abierto, y los compradores pueden comprar uno. El recall abierto simplemente se transfiere con el vehículo y puede repararse gratis después. Los autos nuevos enfrentan reglas más estrictas: a los concesionarios generalmente se les prohíbe vender un vehículo nuevo con un recall abierto hasta que se repare. Al comprar usado, trata un recall abierto como un punto de negociación y haz que lo reparen en un concesionario franquicia antes o poco después de la compra." },
  { q: "¿Qué es el recall de bolsas de aire Takata?", a: "El recall de infladores de bolsas de aire Takata es el recall automotriz más grande en la historia de EE. UU., afectando a decenas de millones de vehículos en casi todos los fabricantes importantes. El defecto involucra infladores de bolsas de aire que pueden romperse y proyectar fragmentos de metal al desplegarse, suponiendo un riesgo serio de lesión. Como abarca tantas marcas y años de modelo, verificar tu VIN contra la base de datos NHTSA es la forma más confiable de confirmar si tu vehículo específico está afectado y aún sin reparar." },
  { q: "¿Cómo reparo un recall?", a: "Contacta a cualquier concesionario franquicia de la marca de tu vehículo y proporciona el VIN y el número de campaña del recall de tu reporte. El concesionario ordena las piezas correctas y realiza la reparación sin cargo. Las reparaciones típicamente toman algunas horas a un día completo. Si las piezas aún no están disponibles, pide unirte a una lista de espera. Para recalls urgentes que involucran riesgo de incendio o bolsa de aire, los concesionarios pueden proporcionar un vehículo de cortesía mientras esperas la reparación." },
];

const SOURCES = [
  { href: "https://www.nhtsa.gov/recalls", label: "NHTSA — Safety Recalls", note: "The official US recall database, searchable by VIN." },
  { href: "https://www.nhtsa.gov/equipment/takata-recall-spotlight", label: "NHTSA — Takata Recall Spotlight", note: "Guidance on the largest airbag recall in US history." },
  { href: "https://www.safercar.gov/", label: "SaferCar.gov", note: "NHTSA consumer safety portal and recall alerts." },
  { href: "https://www.nhtsa.gov/report-a-safety-problem", label: "NHTSA — Report a Safety Problem", note: "Where defect complaints that lead to recalls are filed." },
  { href: "https://vehiclehistory.bja.ojp.gov/", label: "NMVTIS — Bureau of Justice Assistance", note: "Federal title system cross-referenced with safety data." },
  { href: "https://www.ftc.gov/news-events/topics/protecting-consumers/auto-sales-financing", label: "FTC — Auto Sales & Financing", note: "Federal consumer-protection guidance on used-vehicle disclosure." },
];

interface Props { locale: Locale; }

export default function RecallCheckBody({ locale }: Props) {
  const c = COPY[locale];
  const faqs = locale === "es" ? FAQS_ES : FAQS_EN;
  const link = (en: string) => (locale === "es" ? `/es${en}` : en);

  return (
    <article className="pb-16 bg-surface">
      <div className="bg-primary text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20">
          <Breadcrumbs items={[{ label: c.home, href: locale === "es" ? "/es" : "/" }, { label: c.crumb }]} onDark />
          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
            <Siren className="w-4 h-4" /> {c.badge}
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
              <Lock className="w-3 h-3" /> {c.secureNote}
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

      <section aria-labelledby="recall-stats-heading" className="max-w-5xl mx-auto px-4 sm:px-6 -mt-8 sm:-mt-10 relative z-10">
        <div className="rounded-3xl bg-surface-container shadow-md border border-outline-variant p-5 sm:p-7">
          <h2 id="recall-stats-heading" className="text-xs sm:text-sm font-headline font-black uppercase tracking-widest text-primary mb-4 sm:mb-5">
            {c.statsHeading}
          </h2>
          <dl className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
            {c.headlineStats.map((s) => (
              <div key={s.label} className="rounded-2xl bg-primary-container px-4 py-4 sm:py-5">
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-headline font-bold text-2xl sm:text-3xl text-white leading-none mb-2">{s.value}</dd>
                <p className="text-xs sm:text-sm text-on-primary-container leading-snug">{s.label}</p>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">{c.h2Why}</h2>
          <div className="prose prose-slate max-w-none text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
            <p>
              {c.whyPre}
              <a href="https://www.nhtsa.gov/recalls" target="_blank" rel="noopener noreferrer nofollow" className="text-primary underline underline-offset-2">{c.whyNhtsa}</a>
              {c.whyMid1}
              <strong className="text-on-surface">{c.whyBoldFree}</strong>
              {c.whyMid1End}
            </p>
            <p>{c.why2}</p>
            <p>{c.why3}</p>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Record}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8">{c.recordIntro}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {c.recordFields.map((item, i) => {
              const Icon = RECORD_ICONS[i];
              return (
                <div key={item.title} className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-base font-headline font-extrabold text-primary mb-1.5">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">{c.h2OpenVs}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-6 leading-relaxed">{c.openVsIntro}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-error/30 bg-error/5 p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-3">
                <ShieldAlert className="w-5 h-5 text-error" />
                <h3 className="text-base font-headline font-extrabold text-on-surface">{c.openCardTitle}</h3>
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-3">{c.openCardBody}</p>
              <ul className="space-y-1.5 text-sm text-on-surface-variant">
                {c.openCardBullets.map((t) => (
                  <li key={t} className="flex gap-2 items-start">
                    <AlertCircle className="w-4 h-4 text-error flex-shrink-0 mt-0.5" /> {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-3">
                <Check className="w-5 h-5 text-primary" strokeWidth={3} />
                <h3 className="text-base font-headline font-extrabold text-on-surface">{c.doneCardTitle}</h3>
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-3">{c.doneCardBody}</p>
              <ul className="space-y-1.5 text-sm text-on-surface-variant">
                {c.doneCardBullets.map((t) => (
                  <li key={t} className="flex gap-2 items-start">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" strokeWidth={3} /> {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Steps}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8">{c.stepsIntro}</p>
          <div className="space-y-4">
            {c.steps.map((s) => (
              <div key={s.step} className="flex gap-4 sm:gap-6 items-start rounded-2xl border border-outline-variant bg-surface p-5 sm:p-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                  <span className="text-white font-headline font-black text-sm">{s.step}</span>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1.5">{s.title}</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Priority}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8">{c.priorityIntro}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {c.priorities.map((b) => (
              <div key={b.flag} className="flex gap-3 items-start rounded-xl border border-outline-variant bg-surface-container-lowest p-4">
                <AlertCircle className="w-5 h-5 text-error flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-sm font-bold text-on-surface">{b.flag}</strong>
                  <p className="text-xs text-on-surface-variant mt-0.5 leading-relaxed">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-2xl bg-primary/5 border border-primary/20 p-5 sm:p-6">
            <p className="text-sm text-on-surface-variant leading-relaxed">
              <strong className="text-primary">{c.priorityBoldLead}</strong>
              {c.priorityBoldRest}
            </p>
          </div>
        </section>

        <section className="py-10">
          <div className="rounded-3xl bg-primary p-7 sm:p-10 text-center">
            <Star className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-white mb-2">{c.midCtaHeading}</h2>
            <p className="text-white/80 text-sm sm:text-base mb-6 max-w-xl mx-auto">{c.midCtaSub}</p>
            <div className="max-w-xl mx-auto bg-white rounded-2xl p-4 sm:p-5">
              <VinSearchForm size="lg" />
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Internal}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7">{c.internalIntro}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {c.internalLinks.map((l) => (
              <Link
                key={l.href}
                href={link(l.href)}
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

        <section className="py-10">
          <VinCheckBanner />
        </section>

        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Faq}</h2>
          <p className="text-sm text-on-surface-variant mb-8">{c.faqIntro}</p>
          <div className="space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="group rounded-2xl border border-outline-variant bg-surface p-4 sm:p-5 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                  <span className="text-sm sm:text-base font-headline font-extrabold text-primary pr-2">{f.q}</span>
                  <span className="flex-shrink-0 mt-0.5 text-primary text-xl font-light group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-xs sm:text-sm text-on-surface-variant leading-relaxed">{f.a}</p>
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
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Sources}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-6">{c.sourcesIntro}</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            {SOURCES.map((s) => (
              <li key={s.href} className="rounded-xl border border-outline-variant bg-surface-container-lowest p-4">
                <a href={s.href} target="_blank" rel="noopener noreferrer nofollow" className="text-primary font-bold underline underline-offset-2">
                  {s.label} ↗
                </a>
                <p className="mt-1.5 text-xs sm:text-sm text-on-surface-variant leading-relaxed">{s.note}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs text-on-surface-variant italic">{c.sourcesNote}</p>
        </section>

        <RelatedChecks exclude="/recall-check" />
      </div>
    </article>
  );
}

export { FAQS_EN, FAQS_ES };
