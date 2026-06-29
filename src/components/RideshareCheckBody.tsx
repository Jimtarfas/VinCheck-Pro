/**
 * Shared body for /rideshare-check and /es/rideshare-check.
 * Wave 18 batch 4 — full English layout in both locales via COPY={en,es}.
 */

import Link from "@/components/LocaleLink";
import {
  Check, FileText, AlertCircle, Clock, Gauge, Wrench, Users, Car,
  ChevronRight, Star, Lock, Zap, BadgeCheck, Building2, ShieldAlert,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import type { Locale } from "@/i18n/config";

const TRUST_ICONS = [Gauge, FileText, Clock, BadgeCheck] as const;
const RECORD_ICONS = [Gauge, FileText, Building2, ShieldAlert, Users, Wrench] as const;
const WEAR_ICONS = [AlertCircle, Wrench, Car, Gauge] as const;
const USE_KIND_ICONS = [Car, Building2, Check] as const;

const COPY = {
  en: {
    home: "Home", crumb: "Rideshare Check",
    badge: "Uber, Lyft & Taxi History",
    h1Lead: "Rideshare & Taxi History Check — ",
    h1Accent: "Spot a Former Uber, Lyft, or Taxi by VIN",
    intro: "CarCheckerVIN's free rideshare check queries NMVTIS, all 50 state DMVs, commercial and for-hire registration records, and insurance use-class signals to surface prior Uber, Lyft, and taxi service for any 17-character VIN. As an NMVTIS-approved data provider, CarCheckerVIN returns the mileage pattern, livery registration history, and commercial-policy indicators that reveal a former rideshare car before you pay private-use prices. Find out whether a used car earned its miles carrying paying passengers before you buy it. Enter a 17-character VIN to read the mileage pattern, commercial or for-hire registration, and insurance signals that reveal former rideshare and taxi use. Free preview, no credit card, results in under 5 seconds.",
    formHeading: "Check for Rideshare and Taxi History by VIN",
    formSub: "Enter any 17-character VIN — cars, SUVs, vans",
    formNote: "256-bit encrypted · DPPA compliant · No personal data stored",
    trustStats: [
      { value: "Mileage", label: "annual-rate patterns flagged" },
      { value: "For-hire", label: "commercial registration records" },
      { value: "< 5 sec", label: "average report time" },
      { value: "Free preview", label: "no credit card needed" },
    ],
    statsHeading: "Rideshare & Taxi Check — By the Numbers",
    headlineStats: [
      { value: "40-60k", label: "Miles a year for a full-time driver" },
      { value: "3-5x", label: "The private-vehicle mileage rate" },
      { value: "NMVTIS", label: "Source for for-hire registration" },
      { value: "<5 sec", label: "Average VIN decode time" },
      { value: "$0", label: "Cost for the free preview" },
    ],
    h2Why: "Why a Former Rideshare Car Is the History No One Lists",
    whyP1: "Millions of cars are driven every day as Uber, Lyft, and taxi vehicles across the United States, so a meaningful share of the used market has carried paying passengers. That history matters because commercial passenger use wears a car differently than private ownership: very high daily mileage, constant short trips, and continuous passenger loading all leave their mark on the drivetrain and the interior.",
    whyP2Pre: "The problem is that this history rarely appears on the listing. Uber and Lyft register most cars as ordinary private vehicles, so there is usually no ",
    whyP2Bold: "rideshare flag",
    whyP2Suffix: " on the title. A seller may not volunteer it, and an inattentive buyer can mistake a worn-out commercial workhorse for a lightly used private car at the same model year.",
    whyP3: "A rideshare and taxi history check reads the signals that do survive. It pulls the mileage pattern, any commercial or for-hire registration, and insurance records tied to the exact 17-character VIN, then lets you weigh them together. No single signal is proof, but read as a set they tell you whether a car likely spent its life carrying strangers, before you base an offer on the assumption it did not.",
    h2Record: "What the Report Reveals",
    recordIntro: "Because rideshare use is inferred rather than labeled, the value is in the signals read together. Here is what the report surfaces for each VIN.",
    recordFields: [
      { title: "Mileage vs. Age", desc: "Odometer readings over time against the model year. An annual rate far above average is the single strongest rideshare and for-hire signal." },
      { title: "Title & Registration", desc: "Commercial, for-hire, and livery designations recorded against the VIN, the clearest mark of a traditional taxi or fleet car." },
      { title: "Commercial Use Records", desc: "NMVTIS and state DMV entries that flag for-hire or commercial passenger use where the vehicle was registered that way." },
      { title: "Insurance Signals", desc: "Commercial or rideshare-endorsed policy records tied to the VIN, a strong hint of for-hire use when present." },
      { title: "Owner & State History", desc: "Number of owners and where the car lived. Frequent ownership in a dense metro fits a rideshare profile." },
      { title: "Wear Indicators", desc: "Service entries and odometer trend that help you judge stop-and-go city wear the mileage number alone hides." },
    ],
    h2Wear: "How Rideshare Use Wears a Vehicle",
    wearIntro: "A full-time Uber or Lyft driver can cover 40,000 to 60,000 miles a year, three to five times the national average. Worse for the car, those miles are mostly stop-and-go city driving with frequent short trips, which is harder on every major system than the same distance on the highway. Evaluate a former rideshare car by the wear behind the odometer, not the number alone.",
    wearItems: [
      { title: "Brake system", body: "Frequent urban stops wear pads and rotors well beyond what the mileage alone would suggest." },
      { title: "Transmission", body: "Continuous city driving causes thermal stress and faster fluid degradation in automatic transmissions." },
      { title: "Suspension", body: "Curb impacts, rough city roads, and heavier passenger loads wear bushings, shocks, and struts faster." },
      { title: "Engine & interior", body: "Short trips that never fully warm the engine accelerate wear, while constant passenger turnover punishes seats, carpets, and handles." },
    ],
    wearOutroPre: "Always get a pre-purchase inspection by an independent mechanic before buying a car with suspected rideshare history, and confirm the odometer reading with our ",
    wearOutroLink: "odometer check",
    wearOutroSuffix: ".",
    h2Signs: "Signs a Used Car Was a Rideshare or Taxi",
    signsIntro: "No single clue is proof. The more of these line up on one car, the more likely it carried paying passengers.",
    signs: [
      { flag: "Mileage far above its age", desc: "A two- to three-year-old car with 80,000 or more miles is a classic full-time rideshare pattern worth questioning." },
      { flag: "For-hire or commercial registration", desc: "Taxi and livery cars are registered commercially, leaving a clear for-hire mark in NMVTIS and DMV records." },
      { flag: "Commercial or rideshare insurance", desc: "A commercial or rideshare-endorsed policy entry tied to the VIN strongly suggests the car carried paying passengers." },
      { flag: "Heavy interior wear", desc: "Worn seat bolsters, sagging carpet, polished door handles, and grab-handle wear point to constant passenger turnover." },
      { flag: "Registered in a major metro", desc: "Rideshare demand concentrates in big cities. A high-mileage car from a dense urban market fits the profile." },
      { flag: "Short, frequent ownership", desc: "Several owners in a few years, especially with mileage spikes, can mark a car cycled through commercial use." },
    ],
    h2Steps: "How to Check a VIN for Rideshare History — Step-by-Step",
    stepsIntro: "Reading the signals takes under two minutes.",
    steps: [
      { step: "01", title: "Locate the VIN", body: "The 17-character VIN is on the dashboard through the lower windshield, the driver-side door jamb sticker, and the title. Confirm all three match before you rely on a result." },
      { step: "02", title: "Run the VIN above", body: "Enter the VIN. The lookup pulls the title, odometer, registration, and insurance-sourced records tied to that exact vehicle." },
      { step: "03", title: "Compare mileage to age", body: "Divide the mileage by the vehicle's age. Forty thousand or more miles a year, especially on a newer car, is a strong commercial-use pattern." },
      { step: "04", title: "Read registration and insurance", body: "Look for commercial or for-hire registration, livery designations, and any commercial or rideshare-endorsed insurance entry. These are the clearest marks of paid passenger use." },
      { step: "05", title: "Inspect and negotiate", body: "Treat the signals as a reason for a mechanic's inspection. Focus on brakes, transmission, and suspension, then use documented commercial use as a negotiating point on price." },
    ],
    h2Compare: "Rideshare vs. Rental vs. Private Use",
    compareIntro: "The three kinds of high-use car carry very different risk. The deciding factor is who maintained the vehicle and how consistently.",
    useKinds: [
      { title: "Rideshare", body: "Owned by an individual driver, used commercially, with highly variable upkeep. The biggest unknown, since maintenance depends entirely on one owner." },
      { title: "Rental & fleet", body: "Fleet-owned, serviced on a fixed schedule, and sold on a set replacement cycle. Often in better mechanical shape than a rideshare car at the same mileage." },
      { title: "Private", body: "Lower typical mileage and gentler use, but quality still varies by owner. A private car is not automatically the safer buy without records." },
    ],
    bottomLineLead: "Bottom line:",
    bottomLineBody: " a former rideshare car is not automatically a bad buy. Judge it on documented maintenance, actual wear, and a clean inspection, then price the commercial history in rather than ignoring it.",
    midCtaHeading: "Check a VIN for Rideshare History Now",
    midCtaSub: "Free preview, instant, no credit card. See the mileage pattern, commercial registration, and insurance signals in under 5 seconds.",
    h2Internal: "Related Vehicle History Checks",
    internalIntro: "A rideshare check is one usage signal. These checks cover the records it connects to.",
    internalLinks: [
      { href: "/odometer-check", label: "Odometer Check", desc: "Verify the mileage and screen for rollback." },
      { href: "/rental-car-check", label: "Rental Car Check", desc: "Spot former fleet and rental vehicles." },
      { href: "/fleet-check", label: "Fleet Check", desc: "Identify ex-corporate and government fleet cars." },
      { href: "/accident-history-check", label: "Accident History Check", desc: "Review collision and damage records." },
      { href: "/vin-check", label: "Full VIN Check", desc: "Run a complete vehicle history report." },
      { href: "/market-value", label: "Market Value", desc: "See how commercial use affects price." },
      { href: "/total-cost-of-ownership-calculator", label: "Cost of Ownership", desc: "Model upkeep on a high-mileage car." },
      { href: "/vin-decoder", label: "VIN Decoder", desc: "Decode the build details behind the VIN." },
    ],
    h2Faq: "Frequently Asked Questions — Rideshare & Taxi History",
    faqIntro: "The questions used-car buyers ask most about former Uber, Lyft, and taxi vehicles.",
    bottomBadge: "Free preview · Instant · VIN-Based",
    ctaBottomHeading: "Don't Overpay for a Former Workhorse",
    ctaBottomSub: "A high-mileage ex-rideshare car can look like a lightly used private one. One VIN check reads the mileage pattern, registration, and insurance signals in 5 seconds, so you negotiate from facts.",
    h2Sources: "Sources & Data Authority",
    sourcesIntro: "Rideshare signals are read alongside federal title, odometer, and consumer-protection records so the full picture stays consistent. Below are the primary sources and the agencies you can cross-check with.",
    sources: [
      { href: "https://vehiclehistory.bja.ojp.gov/", label: "NMVTIS — Bureau of Justice Assistance", note: "Federal title system that records commercial and for-hire designations." },
      { href: "https://www.nhtsa.gov/", label: "NHTSA", note: "Federal vehicle safety authority and odometer-fraud guidance." },
      { href: "https://www.ftc.gov/news-events/topics/protecting-consumers/auto-sales-financing", label: "FTC — Auto Sales & Financing", note: "Federal consumer-protection rules on used-vehicle disclosure." },
      { href: "https://www.consumer.ftc.gov/articles/buying-used-car", label: "FTC — Buying a Used Car", note: "Guidance on inspecting and negotiating a used purchase." },
      { href: "https://www.usa.gov/motor-vehicle-services", label: "USA.gov — Motor Vehicle Services", note: "Directory of state DMV registration and title records." },
      { href: "https://www.dol.gov/agencies/whd/state/contacts", label: "State Agency Directory", note: "Where state-specific rideshare and for-hire rules are administered." },
    ],
    sourcesDisclaimer: "Rideshare use is inferred from supporting signals, not a definitive flag. Absence of a commercial record does not prove a car was never used for rideshare, and a clear result does not replace an independent pre-purchase inspection.",
  },
  es: {
    home: "Inicio", crumb: "Verificación de viajes compartidos",
    badge: "Historial Uber, Lyft y taxi",
    h1Lead: "Verificación de historial de viajes compartidos y taxi — ",
    h1Accent: "Detecta un ex-Uber, Lyft o taxi por VIN",
    intro: "Averigua si un auto usado ganó sus millas llevando pasajeros pagos antes de comprarlo. Ingresa un VIN de 17 caracteres para leer el patrón de kilometraje, registro comercial o de uso comercial, y señales de seguro que revelan uso previo de rideshare y taxi. Vista previa gratis, sin tarjeta de crédito, resultados en menos de 5 segundos.",
    formHeading: "Verifica historial de viajes compartidos y taxi por VIN",
    formSub: "Ingresa cualquier VIN de 17 caracteres — autos, SUVs, vans",
    formNote: "Cifrado de 256 bits · Cumple DPPA · No se guardan datos personales",
    trustStats: [
      { value: "Kilometraje", label: "patrones de tasa anual marcados" },
      { value: "Uso comercial", label: "registros de matrícula comercial" },
      { value: "< 5 seg", label: "tiempo promedio del reporte" },
      { value: "Vista previa gratis", label: "no necesitas tarjeta de crédito" },
    ],
    statsHeading: "Verificación de viajes compartidos y taxi — En números",
    headlineStats: [
      { value: "40-60k", label: "Millas al año para un conductor de tiempo completo" },
      { value: "3-5x", label: "La tasa de kilometraje de un vehículo privado" },
      { value: "NMVTIS", label: "Fuente para registro de uso comercial" },
      { value: "<5 seg", label: "Tiempo promedio de decodificación VIN" },
      { value: "$0", label: "Costo de la vista previa gratis" },
    ],
    h2Why: "Por qué un ex-auto de rideshare es el historial que nadie pone en el anuncio",
    whyP1: "Millones de autos se conducen todos los días como vehículos de Uber, Lyft y taxi en Estados Unidos, así que una parte significativa del mercado de usados ha llevado pasajeros pagos. Ese historial importa porque el uso comercial de pasajeros desgasta un auto de forma distinta a la propiedad privada: kilometraje diario muy alto, viajes cortos constantes y carga continua de pasajeros dejan su marca en el tren motriz y en el interior.",
    whyP2Pre: "El problema es que este historial rara vez aparece en el anuncio. Uber y Lyft registran la mayoría de los autos como vehículos privados ordinarios, así que normalmente no hay una ",
    whyP2Bold: "marca de rideshare",
    whyP2Suffix: " en el título. Un vendedor puede no declararlo, y un comprador desatento puede confundir un caballo de batalla comercial desgastado con un auto privado poco usado del mismo año modelo.",
    whyP3: "Una verificación de historial de rideshare y taxi lee las señales que sí sobreviven. Extrae el patrón de kilometraje, cualquier registro comercial o de uso comercial, y registros de seguro vinculados al VIN exacto de 17 caracteres, y luego te deja sopesarlos juntos. Ninguna señal por sí sola es prueba, pero leídas como conjunto te dicen si un auto probablemente pasó su vida llevando desconocidos, antes de que bases una oferta en la suposición de que no.",
    h2Record: "Lo que revela el reporte",
    recordIntro: "Como el uso de rideshare se infiere en vez de etiquetarse, el valor está en las señales leídas juntas. Esto es lo que el reporte muestra para cada VIN.",
    recordFields: [
      { title: "Kilometraje vs. edad", desc: "Lecturas del odómetro a lo largo del tiempo contra el año modelo. Una tasa anual muy por encima del promedio es la señal más fuerte de rideshare y uso comercial." },
      { title: "Título y matrícula", desc: "Designaciones comerciales, de uso comercial y de transporte registradas contra el VIN, la marca más clara de un taxi tradicional o auto de flota." },
      { title: "Registros de uso comercial", desc: "Entradas en NMVTIS y DMV estatales que marcan uso comercial o de pasajeros comerciales donde el vehículo se registró así." },
      { title: "Señales de seguro", desc: "Registros de pólizas comerciales o con endoso de rideshare vinculados al VIN, una pista fuerte de uso comercial cuando están presentes." },
      { title: "Historial de dueño y estado", desc: "Número de dueños y dónde vivió el auto. Propiedad frecuente en una metrópolis densa encaja con un perfil de rideshare." },
      { title: "Indicadores de desgaste", desc: "Entradas de servicio y tendencia del odómetro que ayudan a juzgar el desgaste urbano de arranque-paro que el número de kilometraje por sí solo esconde." },
    ],
    h2Wear: "Cómo el uso de rideshare desgasta un vehículo",
    wearIntro: "Un conductor de Uber o Lyft de tiempo completo puede cubrir 40,000 a 60,000 millas al año, tres a cinco veces el promedio nacional. Peor para el auto, esas millas son en su mayoría conducción urbana de arranque-paro con viajes cortos frecuentes, lo cual es más duro para cada sistema importante que la misma distancia en carretera. Evalúa un ex-auto de rideshare por el desgaste detrás del odómetro, no por el número solo.",
    wearItems: [
      { title: "Sistema de frenos", body: "Paradas urbanas frecuentes desgastan pastillas y rotores mucho más allá de lo que el kilometraje por sí solo sugeriría." },
      { title: "Transmisión", body: "La conducción urbana continua causa estrés térmico y degradación más rápida del líquido en transmisiones automáticas." },
      { title: "Suspensión", body: "Impactos con bordillos, calles urbanas accidentadas y cargas más pesadas de pasajeros desgastan bujes, amortiguadores y puntales más rápido." },
      { title: "Motor e interior", body: "Viajes cortos que nunca calientan completamente el motor aceleran el desgaste, mientras que la rotación constante de pasajeros castiga asientos, alfombras y manijas." },
    ],
    wearOutroPre: "Siempre obtén una inspección previa a la compra por un mecánico independiente antes de comprar un auto con historial sospechoso de rideshare, y confirma la lectura del odómetro con nuestra ",
    wearOutroLink: "verificación de odómetro",
    wearOutroSuffix: ".",
    h2Signs: "Señales de que un auto usado fue de rideshare o taxi",
    signsIntro: "Ninguna pista por sí sola es prueba. Mientras más de estas se alineen en un auto, más probable es que llevara pasajeros pagos.",
    signs: [
      { flag: "Kilometraje muy por encima de su edad", desc: "Un auto de dos a tres años con 80,000 millas o más es un patrón clásico de rideshare de tiempo completo que vale la pena cuestionar." },
      { flag: "Matrícula comercial o de uso comercial", desc: "Los autos de taxi y transporte están registrados comercialmente, dejando una marca clara de uso comercial en NMVTIS y registros DMV." },
      { flag: "Seguro comercial o de rideshare", desc: "Una entrada de póliza comercial o con endoso de rideshare vinculada al VIN sugiere fuertemente que el auto llevó pasajeros pagos." },
      { flag: "Desgaste interior pesado", desc: "Soportes de asiento desgastados, alfombra hundida, manijas de puerta pulidas y desgaste en agarraderas apuntan a rotación constante de pasajeros." },
      { flag: "Registrado en una gran metrópolis", desc: "La demanda de rideshare se concentra en grandes ciudades. Un auto de alto kilometraje de un mercado urbano denso encaja con el perfil." },
      { flag: "Propiedad corta y frecuente", desc: "Varios dueños en pocos años, especialmente con picos de kilometraje, pueden marcar un auto rotado a través de uso comercial." },
    ],
    h2Steps: "Cómo verificar un VIN para historial de rideshare — Paso a paso",
    stepsIntro: "Leer las señales toma menos de dos minutos.",
    steps: [
      { step: "01", title: "Localiza el VIN", body: "El VIN de 17 caracteres está en el tablero a través del parabrisas inferior, la calcomanía del marco de puerta del lado del conductor, y el título. Confirma que los tres coincidan antes de confiar en un resultado." },
      { step: "02", title: "Ejecuta el VIN arriba", body: "Ingresa el VIN. La búsqueda extrae el título, odómetro, matrícula y registros provenientes de seguros vinculados a ese vehículo exacto." },
      { step: "03", title: "Compara kilometraje con la edad", body: "Divide el kilometraje entre la edad del vehículo. Cuarenta mil millas o más al año, especialmente en un auto más nuevo, es un patrón fuerte de uso comercial." },
      { step: "04", title: "Lee la matrícula y el seguro", body: "Busca matrícula comercial o de uso comercial, designaciones de transporte y cualquier entrada de seguro comercial o con endoso de rideshare. Estas son las marcas más claras de uso pagado de pasajeros." },
      { step: "05", title: "Inspecciona y negocia", body: "Trata las señales como una razón para una inspección de mecánico. Enfócate en frenos, transmisión y suspensión, luego usa el uso comercial documentado como punto de negociación en el precio." },
    ],
    h2Compare: "Rideshare vs. renta vs. uso privado",
    compareIntro: "Los tres tipos de auto de alto uso conllevan riesgos muy distintos. El factor decisivo es quién mantuvo el vehículo y con qué consistencia.",
    useKinds: [
      { title: "Rideshare", body: "Propiedad de un conductor individual, usado comercialmente, con mantenimiento altamente variable. La mayor incógnita, ya que el mantenimiento depende completamente de un dueño." },
      { title: "Renta y flota", body: "Propiedad de flota, con servicio en horario fijo, y vendido en un ciclo de reemplazo establecido. A menudo en mejor forma mecánica que un auto de rideshare al mismo kilometraje." },
      { title: "Privado", body: "Menor kilometraje típico y uso más suave, pero la calidad aún varía por dueño. Un auto privado no es automáticamente la compra más segura sin registros." },
    ],
    bottomLineLead: "En resumen:",
    bottomLineBody: " un ex-auto de rideshare no es automáticamente una mala compra. Júzgalo por el mantenimiento documentado, el desgaste real y una inspección limpia, luego ajusta el precio considerando el historial comercial en vez de ignorarlo.",
    midCtaHeading: "Verifica un VIN por historial de rideshare ahora",
    midCtaSub: "Vista previa gratis, instantánea, sin tarjeta de crédito. Ve el patrón de kilometraje, registro comercial y señales de seguro en menos de 5 segundos.",
    h2Internal: "Verificaciones de historial vehicular relacionadas",
    internalIntro: "Una verificación de rideshare es una señal de uso. Estas verificaciones cubren los registros con los que se conecta.",
    internalLinks: [
      { href: "/odometer-check", label: "Verificación de odómetro", desc: "Verifica el kilometraje y detecta rollback." },
      { href: "/rental-car-check", label: "Verificación de auto de renta", desc: "Detecta vehículos ex-flota y de renta." },
      { href: "/fleet-check", label: "Verificación de flota", desc: "Identifica autos ex-corporativos y de flota gubernamental." },
      { href: "/accident-history-check", label: "Verificación de historial de accidentes", desc: "Revisa registros de colisión y daño." },
      { href: "/vin-check", label: "Verificación VIN completa", desc: "Ejecuta un reporte completo de historial del vehículo." },
      { href: "/market-value", label: "Valor de mercado", desc: "Ve cómo el uso comercial afecta el precio." },
      { href: "/total-cost-of-ownership-calculator", label: "Costo de propiedad", desc: "Modela el mantenimiento en un auto de alto kilometraje." },
      { href: "/vin-decoder", label: "Decodificador VIN", desc: "Decodifica los detalles de construcción detrás del VIN." },
    ],
    h2Faq: "Preguntas frecuentes — Historial de rideshare y taxi",
    faqIntro: "Las preguntas que los compradores de autos usados hacen más sobre ex-vehículos de Uber, Lyft y taxi.",
    bottomBadge: "Vista previa gratis · Instantáneo · Basado en VIN",
    ctaBottomHeading: "No pagues de más por un ex-caballo de batalla",
    ctaBottomSub: "Un ex-auto de rideshare de alto kilometraje puede verse como uno privado poco usado. Una verificación de VIN lee el patrón de kilometraje, matrícula y señales de seguro en 5 segundos, para que negocies con datos.",
    h2Sources: "Fuentes y autoridad de datos",
    sourcesIntro: "Las señales de rideshare se leen junto con registros federales de título, odómetro y protección al consumidor para que el panorama completo se mantenga consistente. Abajo están las fuentes primarias y las agencias con las que puedes cruzar verificaciones.",
    sources: [
      { href: "https://vehiclehistory.bja.ojp.gov/", label: "NMVTIS — Oficina de Asistencia de Justicia", note: "Sistema federal de títulos que registra designaciones comerciales y de uso comercial." },
      { href: "https://www.nhtsa.gov/", label: "NHTSA", note: "Autoridad federal de seguridad vehicular y guía sobre fraude de odómetro." },
      { href: "https://www.ftc.gov/news-events/topics/protecting-consumers/auto-sales-financing", label: "FTC — Ventas y financiamiento de autos", note: "Reglas federales de protección al consumidor sobre divulgación de vehículos usados." },
      { href: "https://www.consumer.ftc.gov/articles/buying-used-car", label: "FTC — Comprar un auto usado", note: "Guía sobre inspeccionar y negociar una compra usada." },
      { href: "https://www.usa.gov/motor-vehicle-services", label: "USA.gov — Servicios de vehículos motorizados", note: "Directorio de registros estatales de matrícula y título del DMV." },
      { href: "https://www.dol.gov/agencies/whd/state/contacts", label: "Directorio de agencias estatales", note: "Donde se administran las reglas específicas de rideshare y uso comercial por estado." },
    ],
    sourcesDisclaimer: "El uso de rideshare se infiere de señales de apoyo, no de una marca definitiva. La ausencia de un registro comercial no prueba que un auto nunca fue usado para rideshare, y un resultado claro no reemplaza una inspección independiente previa a la compra.",
  },
  fr: {
    home: "Accueil", crumb: "V\u00E9rification covoiturage",
    badge: "Historique Uber, Lyft et taxi",
    h1Lead: "V\u00E9rification d'historique covoiturage et taxi \u2014 ",
    h1Accent: "D\u00E9tecte un ex-Uber, Lyft ou taxi par VIN",
    intro: "D\u00E9couvre si une voiture d'occasion a gagn\u00E9 ses miles en transportant des passagers payants avant que tu ne l'ach\u00E8tes. Entre un VIN de 17 caract\u00E8res pour lire le mod\u00E8le de kilom\u00E9trage, l'immatriculation commerciale ou VTC, et les signaux d'assurance qui r\u00E9v\u00E8lent un usage covoiturage et taxi pass\u00E9. Aper\u00E7u gratuit, sans carte de cr\u00E9dit, r\u00E9sultats en moins de 5 secondes.",
    formHeading: "V\u00E9rifie l'historique covoiturage et taxi par VIN",
    formSub: "Entre n'importe quel VIN de 17 caract\u00E8res \u2014 voitures, SUVs, fourgons",
    formNote: "Chiffr\u00E9 256 bits \u00B7 Conforme DPPA \u00B7 Aucune donn\u00E9e personnelle stock\u00E9e",
    trustStats: [
      { value: "Kilom\u00E9trage", label: "mod\u00E8les de taux annuel marqu\u00E9s" },
      { value: "VTC", label: "registres d'immatriculation commerciale" },
      { value: "< 5 sec", label: "temps moyen du rapport" },
      { value: "Aper\u00E7u gratuit", label: "aucune carte de cr\u00E9dit n\u00E9cessaire" },
    ],
    statsHeading: "V\u00E9rification covoiturage et taxi \u2014 En chiffres",
    headlineStats: [
      { value: "40-60k", label: "Miles par an pour un conducteur \u00E0 plein temps" },
      { value: "3-5x", label: "Le taux de kilom\u00E9trage d'un v\u00E9hicule priv\u00E9" },
      { value: "NMVTIS", label: "Source pour l'immatriculation VTC" },
      { value: "<5 sec", label: "Temps moyen de d\u00E9codage VIN" },
      { value: "$0", label: "Co\u00FBt de l'aper\u00E7u gratuit" },
    ],
    h2Why: "Pourquoi une ex-voiture de covoiturage est l'historique que personne n'annonce",
    whyP1: "Des millions de voitures sont conduites chaque jour comme v\u00E9hicules Uber, Lyft et taxi \u00E0 travers les \u00C9tats-Unis, donc une part significative du march\u00E9 de l'occasion a transport\u00E9 des passagers payants. Cet historique compte parce que l'usage commercial de passagers use une voiture diff\u00E9remment de la propri\u00E9t\u00E9 priv\u00E9e : kilom\u00E9trage quotidien tr\u00E8s \u00E9lev\u00E9, trajets courts constants et chargement continu de passagers laissent tous leur marque sur la transmission et l'int\u00E9rieur.",
    whyP2Pre: "Le probl\u00E8me est que cet historique appara\u00EEt rarement dans l'annonce. Uber et Lyft immatriculent la plupart des voitures comme v\u00E9hicules priv\u00E9s ordinaires, donc il n'y a g\u00E9n\u00E9ralement pas de ",
    whyP2Bold: "marque covoiturage",
    whyP2Suffix: " sur le titre. Un vendeur peut ne pas le mentionner volontairement, et un acheteur inattentif peut confondre un cheval de trait commercial \u00E9puis\u00E9 avec une voiture priv\u00E9e l\u00E9g\u00E8rement utilis\u00E9e de la m\u00EAme ann\u00E9e mod\u00E8le.",
    whyP3: "Une v\u00E9rification d'historique covoiturage et taxi lit les signaux qui survivent. Elle extrait le mod\u00E8le de kilom\u00E9trage, toute immatriculation commerciale ou VTC, et les registres d'assurance li\u00E9s au VIN exact de 17 caract\u00E8res, puis te laisse les peser ensemble. Aucun signal seul n'est une preuve, mais lus comme un ensemble ils te disent si une voiture a probablement pass\u00E9 sa vie \u00E0 transporter des inconnus, avant que tu ne bases une offre sur la supposition qu'elle ne l'a pas fait.",
    h2Record: "Ce que r\u00E9v\u00E8le le rapport",
    recordIntro: "Parce que l'usage covoiturage est inf\u00E9r\u00E9 plut\u00F4t qu'\u00E9tiquet\u00E9, la valeur est dans les signaux lus ensemble. Voici ce que le rapport fait ressortir pour chaque VIN.",
    recordFields: [
      { title: "Kilom\u00E9trage vs \u00E2ge", desc: "Lectures de l'odom\u00E8tre dans le temps contre l'ann\u00E9e mod\u00E8le. Un taux annuel bien au-dessus de la moyenne est le signal covoiturage et VTC le plus fort." },
      { title: "Titre et immatriculation", desc: "D\u00E9signations commerciales, VTC et livery enregistr\u00E9es contre le VIN, la marque la plus claire d'un taxi traditionnel ou voiture de flotte." },
      { title: "Registres d'usage commercial", desc: "Entr\u00E9es NMVTIS et DMV d'\u00C9tat qui marquent l'usage VTC ou passagers commercial l\u00E0 o\u00F9 le v\u00E9hicule a \u00E9t\u00E9 immatricul\u00E9 ainsi." },
      { title: "Signaux d'assurance", desc: "Registres de polices commerciales ou avec avenant covoiturage li\u00E9s au VIN, un indice fort d'usage VTC quand pr\u00E9sents." },
      { title: "Historique propri\u00E9taire et \u00E9tat", desc: "Nombre de propri\u00E9taires et o\u00F9 la voiture a v\u00E9cu. Propri\u00E9t\u00E9 fr\u00E9quente dans une m\u00E9tropole dense correspond \u00E0 un profil covoiturage." },
      { title: "Indicateurs d'usure", desc: "Entr\u00E9es de service et tendance de l'odom\u00E8tre qui aident \u00E0 juger l'usure urbaine stop-and-go que le seul chiffre du kilom\u00E9trage cache." },
    ],
    h2Wear: "Comment l'usage covoiturage use un v\u00E9hicule",
    wearIntro: "Un conducteur Uber ou Lyft \u00E0 plein temps peut couvrir 40 000 \u00E0 60 000 miles par an, trois \u00E0 cinq fois la moyenne nationale. Pire pour la voiture, ces miles sont pour la plupart de la conduite urbaine stop-and-go avec des trajets courts fr\u00E9quents, ce qui est plus dur sur chaque syst\u00E8me majeur que la m\u00EAme distance sur autoroute. \u00C9value une ex-voiture de covoiturage par l'usure derri\u00E8re l'odom\u00E8tre, pas seulement le chiffre.",
    wearItems: [
      { title: "Syst\u00E8me de freinage", body: "Arr\u00EAts urbains fr\u00E9quents usent les plaquettes et rotors bien au-del\u00E0 de ce que le kilom\u00E9trage seul sugg\u00E9rerait." },
      { title: "Transmission", body: "La conduite urbaine continue cause stress thermique et d\u00E9gradation plus rapide du fluide dans les transmissions automatiques." },
      { title: "Suspension", body: "Impacts de bordures, routes urbaines accident\u00E9es et charges plus lourdes de passagers usent silentblocs, amortisseurs et jambes de force plus vite." },
      { title: "Moteur et int\u00E9rieur", body: "Trajets courts qui ne r\u00E9chauffent jamais compl\u00E8tement le moteur acc\u00E9l\u00E8rent l'usure, tandis que la rotation constante de passagers punit si\u00E8ges, tapis et poign\u00E9es." },
    ],
    wearOutroPre: "Obtiens toujours une inspection pr\u00E9-achat par un m\u00E9canicien ind\u00E9pendant avant d'acheter une voiture avec un historique covoiturage suspect, et confirme la lecture de l'odom\u00E8tre avec notre ",
    wearOutroLink: "v\u00E9rification d'odom\u00E8tre",
    wearOutroSuffix: ".",
    h2Signs: "Signes qu'une voiture d'occasion \u00E9tait un covoiturage ou taxi",
    signsIntro: "Aucun indice seul n'est une preuve. Plus il y en a qui s'alignent sur une voiture, plus il est probable qu'elle ait transport\u00E9 des passagers payants.",
    signs: [
      { flag: "Kilom\u00E9trage bien au-dessus de son \u00E2ge", desc: "Une voiture de deux \u00E0 trois ans avec 80 000 miles ou plus est un mod\u00E8le classique de covoiturage \u00E0 plein temps qui m\u00E9rite d'\u00EAtre questionn\u00E9." },
      { flag: "Immatriculation VTC ou commerciale", desc: "Les voitures de taxi et livery sont immatricul\u00E9es commercialement, laissant une marque VTC claire dans les registres NMVTIS et DMV." },
      { flag: "Assurance commerciale ou covoiturage", desc: "Une entr\u00E9e de police commerciale ou avec avenant covoiturage li\u00E9e au VIN sugg\u00E8re fortement que la voiture a transport\u00E9 des passagers payants." },
      { flag: "Usure int\u00E9rieure lourde", desc: "Renforts de si\u00E8ge us\u00E9s, tapis affaiss\u00E9, poign\u00E9es de porte polies et usure des poign\u00E9es de maintien pointent vers une rotation constante de passagers." },
      { flag: "Immatricul\u00E9e dans une grande m\u00E9tropole", desc: "La demande covoiturage se concentre dans les grandes villes. Une voiture \u00E0 fort kilom\u00E9trage d'un march\u00E9 urbain dense correspond au profil." },
      { flag: "Propri\u00E9t\u00E9 courte et fr\u00E9quente", desc: "Plusieurs propri\u00E9taires en quelques ann\u00E9es, surtout avec pics de kilom\u00E9trage, peuvent marquer une voiture cycl\u00E9e \u00E0 travers un usage commercial." },
    ],
    h2Steps: "Comment v\u00E9rifier un VIN pour historique covoiturage \u2014 \u00C9tape par \u00E9tape",
    stepsIntro: "Lire les signaux prend moins de deux minutes.",
    steps: [
      { step: "01", title: "Localise le VIN", body: "Le VIN de 17 caract\u00E8res est sur le tableau de bord \u00E0 travers le pare-brise inf\u00E9rieur, la calcomanie du montant de porte c\u00F4t\u00E9 conducteur et le titre. Confirme que les trois correspondent avant de te fier \u00E0 un r\u00E9sultat." },
      { step: "02", title: "Lance le VIN ci-dessus", body: "Entre le VIN. La recherche extrait le titre, l'odom\u00E8tre, l'immatriculation et les registres provenant des assurances li\u00E9s \u00E0 ce v\u00E9hicule exact." },
      { step: "03", title: "Compare kilom\u00E9trage \u00E0 l'\u00E2ge", body: "Divise le kilom\u00E9trage par l'\u00E2ge du v\u00E9hicule. Quarante mille miles ou plus par an, surtout sur une voiture plus r\u00E9cente, est un mod\u00E8le fort d'usage commercial." },
      { step: "04", title: "Lis l'immatriculation et l'assurance", body: "Cherche immatriculation commerciale ou VTC, d\u00E9signations livery et toute entr\u00E9e d'assurance commerciale ou avec avenant covoiturage. Ce sont les marques les plus claires d'usage payant de passagers." },
      { step: "05", title: "Inspecte et n\u00E9gocie", body: "Traite les signaux comme une raison pour une inspection par m\u00E9canicien. Concentre-toi sur freins, transmission et suspension, puis utilise l'usage commercial document\u00E9 comme point de n\u00E9gociation sur le prix." },
    ],
    h2Compare: "Covoiturage vs location vs usage priv\u00E9",
    compareIntro: "Les trois types de voiture \u00E0 fort usage portent des risques tr\u00E8s diff\u00E9rents. Le facteur d\u00E9cisif est qui a entretenu le v\u00E9hicule et avec quelle constance.",
    useKinds: [
      { title: "Covoiturage", body: "Poss\u00E9d\u00E9 par un conducteur individuel, utilis\u00E9 commercialement, avec entretien hautement variable. La plus grande inconnue, puisque l'entretien d\u00E9pend enti\u00E8rement d'un propri\u00E9taire." },
      { title: "Location et flotte", body: "Poss\u00E9d\u00E9 par flotte, entretenu selon un calendrier fixe, et vendu sur un cycle de remplacement \u00E9tabli. Souvent en meilleur \u00E9tat m\u00E9canique qu'une voiture de covoiturage au m\u00EAme kilom\u00E9trage." },
      { title: "Priv\u00E9", body: "Kilom\u00E9trage typique plus bas et usage plus doux, mais la qualit\u00E9 varie encore selon le propri\u00E9taire. Une voiture priv\u00E9e n'est pas automatiquement l'achat plus s\u00FBr sans registres." },
    ],
    bottomLineLead: "En r\u00E9sum\u00E9 :",
    bottomLineBody: " une ex-voiture de covoiturage n'est pas automatiquement un mauvais achat. Juge-la sur l'entretien document\u00E9, l'usure r\u00E9elle et une inspection propre, puis tarife l'historique commercial plut\u00F4t que de l'ignorer.",
    midCtaHeading: "V\u00E9rifie un VIN pour historique covoiturage maintenant",
    midCtaSub: "Aper\u00E7u gratuit, instantan\u00E9, sans carte de cr\u00E9dit. Vois le mod\u00E8le de kilom\u00E9trage, l'immatriculation commerciale et les signaux d'assurance en moins de 5 secondes.",
    h2Internal: "V\u00E9rifications d'historique v\u00E9hicule connexes",
    internalIntro: "Une v\u00E9rification covoiturage est un signal d'usage. Ces v\u00E9rifications couvrent les registres auxquels elle se connecte.",
    internalLinks: [
      { href: "/odometer-check", label: "V\u00E9rification d'odom\u00E8tre", desc: "V\u00E9rifie le kilom\u00E9trage et filtre les rollbacks." },
      { href: "/rental-car-check", label: "V\u00E9rification voiture de location", desc: "D\u00E9tecte les ex-v\u00E9hicules de flotte et de location." },
      { href: "/fleet-check", label: "V\u00E9rification de flotte", desc: "Identifie les ex-voitures de flotte d'entreprise et gouvernementale." },
      { href: "/accident-history-check", label: "V\u00E9rification d'historique d'accidents", desc: "R\u00E9vise les registres de collision et de dommages." },
      { href: "/vin-check", label: "V\u00E9rification VIN compl\u00E8te", desc: "Lance un rapport complet d'historique v\u00E9hicule." },
      { href: "/market-value", label: "Valeur de march\u00E9", desc: "Vois comment l'usage commercial affecte le prix." },
      { href: "/total-cost-of-ownership-calculator", label: "Co\u00FBt de propri\u00E9t\u00E9", desc: "Mod\u00E9lise l'entretien d'une voiture \u00E0 fort kilom\u00E9trage." },
      { href: "/vin-decoder", label: "D\u00E9codeur VIN", desc: "D\u00E9code les d\u00E9tails de construction derri\u00E8re le VIN." },
    ],
    h2Faq: "Questions fr\u00E9quentes \u2014 Historique covoiturage et taxi",
    faqIntro: "Les questions que les acheteurs d'occasion posent le plus sur les ex-v\u00E9hicules Uber, Lyft et taxi.",
    bottomBadge: "Aper\u00E7u gratuit \u00B7 Instantan\u00E9 \u00B7 Bas\u00E9 sur VIN",
    ctaBottomHeading: "Ne paie pas trop pour un ex-cheval de trait",
    ctaBottomSub: "Une ex-voiture de covoiturage \u00E0 fort kilom\u00E9trage peut ressembler \u00E0 une priv\u00E9e l\u00E9g\u00E8rement utilis\u00E9e. Une v\u00E9rification VIN lit le mod\u00E8le de kilom\u00E9trage, l'immatriculation et les signaux d'assurance en 5 secondes, pour que tu n\u00E9gocies avec des faits.",
    h2Sources: "Sources et autorit\u00E9 des donn\u00E9es",
    sourcesIntro: "Les signaux covoiturage sont lus aux c\u00F4t\u00E9s des registres f\u00E9d\u00E9raux de titre, odom\u00E8tre et protection du consommateur pour que l'image compl\u00E8te reste coh\u00E9rente. Ci-dessous les sources principales et les agences avec lesquelles tu peux croiser les v\u00E9rifications.",
    sources: [
      { href: "https://vehiclehistory.bja.ojp.gov/", label: "NMVTIS \u2014 Bureau of Justice Assistance", note: "Syst\u00E8me f\u00E9d\u00E9ral de titres qui enregistre les d\u00E9signations commerciales et VTC." },
      { href: "https://www.nhtsa.gov/", label: "NHTSA", note: "Autorit\u00E9 f\u00E9d\u00E9rale de s\u00E9curit\u00E9 v\u00E9hicule et guide sur la fraude d'odom\u00E8tre." },
      { href: "https://www.ftc.gov/news-events/topics/protecting-consumers/auto-sales-financing", label: "FTC \u2014 Ventes et financement autos", note: "R\u00E8gles f\u00E9d\u00E9rales de protection du consommateur sur la divulgation de v\u00E9hicules d'occasion." },
      { href: "https://www.consumer.ftc.gov/articles/buying-used-car", label: "FTC \u2014 Acheter une voiture d'occasion", note: "Guide sur inspecter et n\u00E9gocier un achat d'occasion." },
      { href: "https://www.usa.gov/motor-vehicle-services", label: "USA.gov \u2014 Services de v\u00E9hicules motoris\u00E9s", note: "R\u00E9pertoire des registres d'immatriculation et de titre DMV d'\u00C9tat." },
      { href: "https://www.dol.gov/agencies/whd/state/contacts", label: "R\u00E9pertoire des agences d'\u00C9tat", note: "O\u00F9 les r\u00E8gles sp\u00E9cifiques \u00E0 l'\u00C9tat sur covoiturage et VTC sont administr\u00E9es." },
    ],
    sourcesDisclaimer: "L'usage covoiturage est inf\u00E9r\u00E9 \u00E0 partir de signaux de soutien, pas d'une marque d\u00E9finitive. L'absence d'un registre commercial ne prouve pas qu'une voiture n'a jamais \u00E9t\u00E9 utilis\u00E9e pour covoiturage, et un r\u00E9sultat clair ne remplace pas une inspection pr\u00E9-achat ind\u00E9pendante.",
  },
} as const;

const FAQS_EN = [
  { question: "Does a VIN check reveal if a car was an Uber or Lyft?", answer: "Usually not directly. Uber and Lyft do not report individual vehicles to NMVTIS or vehicle-history databases, so there is rarely a definitive 'rideshare' flag. Former rideshare use is most often inferred from very high mileage relative to the vehicle's age, commercial or for-hire registration, and commercial-insurance records when those exist. A VIN check surfaces those supporting signals rather than a confirmed Uber or Lyft label." },
  { question: "How can I tell if a used car was a former rideshare vehicle?", answer: "Look at mileage relative to age first: a two- to three-year-old car with 80,000 or more miles is a common rideshare pattern. Then check the title history for commercial or 'for-hire' registration, look for a rideshare-style endorsement or commercial-insurance record, and inspect the interior for heavy seat, carpet, and door-handle wear. No single clue is proof, but several together strongly suggest commercial passenger use." },
  { question: "Why do former rideshare cars have such high mileage and wear?", answer: "A full-time Uber or Lyft driver can cover 40,000 to 60,000 miles a year, three to five times the typical private vehicle. That mileage is mostly stop-and-go city driving with frequent short trips, so brakes, transmissions, and engines wear faster than the same miles on the highway. Constant passenger entry and exit also accelerates interior wear on seats, carpets, and door panels." },
  { question: "Are former rideshare cars a bad buy?", answer: "Not automatically. Like rental cars, former rideshare vehicles were driven regularly and may have been maintained on a predictable schedule, which is gentler than long storage or erratic use. The real risk is variable upkeep, since rideshare cars are owned by individual drivers rather than a maintained fleet. Judge each car on its actual mileage, service records, and a mechanic's inspection rather than on rideshare stigma alone." },
  { question: "How does rideshare or commercial use show up in vehicle history?", answer: "Traditional taxis and livery cars are registered as commercial 'for-hire' vehicles, creating clear NMVTIS and DMV records. Uber and Lyft cars are typically registered as private passenger vehicles, so they often leave no explicit commercial mark. In those cases, the history points are indirect: unusually high annual mileage, a commercial-insurance entry, or a state-specific rideshare registration where local law requires one." },
  { question: "Should I avoid a high-mileage former rideshare car?", answer: "High mileage alone is not a reason to walk away if the price reflects it and the car checks out mechanically. Prioritize a former rideshare car with documented maintenance and a clean pre-purchase inspection over a cheaper one with no records. Pay special attention to brakes, transmission fluid condition, and suspension components, since city stop-and-go driving wears those systems faster than the odometer suggests." },
  { question: "Does commercial-use insurance history appear on a VIN report?", answer: "Sometimes. When a vehicle carried a commercial or rideshare-endorsed policy, that coverage can appear in insurance-sourced records tied to the VIN and is a strong hint of for-hire use. But many part-time rideshare drivers use personal policies with only a rideshare add-on, which may not surface clearly. Treat the absence of a commercial-insurance record as inconclusive rather than proof the car was never used for rideshare." },
];

const FAQS_ES = [
  { question: "¿Una verificación VIN revela si un auto fue Uber o Lyft?", answer: "Usualmente no directamente. Uber y Lyft no reportan vehículos individuales a NMVTIS o bases de datos de historial vehicular, así que rara vez hay una marca definitiva de 'rideshare'. El uso previo de rideshare se infiere más a menudo de un kilometraje muy alto relativo a la edad del vehículo, matrícula comercial o de uso comercial, y registros de seguro comercial cuando existen. Una verificación VIN muestra esas señales de apoyo en vez de una etiqueta confirmada de Uber o Lyft." },
  { question: "¿Cómo puedo saber si un auto usado fue un vehículo ex-rideshare?", answer: "Mira primero el kilometraje relativo a la edad: un auto de dos a tres años con 80,000 millas o más es un patrón común de rideshare. Luego verifica el historial del título por matrícula comercial o de 'uso comercial', busca un endoso estilo rideshare o registro de seguro comercial, e inspecciona el interior por desgaste pesado de asiento, alfombra y manija de puerta. Ninguna pista por sí sola es prueba, pero varias juntas sugieren fuertemente uso comercial de pasajeros." },
  { question: "¿Por qué los ex-autos de rideshare tienen tan alto kilometraje y desgaste?", answer: "Un conductor de Uber o Lyft de tiempo completo puede cubrir 40,000 a 60,000 millas al año, tres a cinco veces el vehículo privado típico. Ese kilometraje es en su mayoría conducción urbana de arranque-paro con viajes cortos frecuentes, así que frenos, transmisiones y motores se desgastan más rápido que las mismas millas en carretera. La entrada y salida constante de pasajeros también acelera el desgaste interior en asientos, alfombras y paneles de puerta." },
  { question: "¿Los ex-autos de rideshare son una mala compra?", answer: "No automáticamente. Como los autos de renta, los vehículos ex-rideshare se conducían regularmente y pueden haber sido mantenidos en un horario predecible, lo cual es más suave que el almacenamiento largo o el uso errático. El riesgo real es el mantenimiento variable, ya que los autos de rideshare son propiedad de conductores individuales en vez de una flota mantenida. Juzga cada auto por su kilometraje real, registros de servicio y la inspección de un mecánico en lugar del estigma del rideshare solo." },
  { question: "¿Cómo aparece el uso de rideshare o comercial en el historial vehicular?", answer: "Los taxis tradicionales y autos de transporte están registrados como vehículos comerciales de 'uso comercial', creando registros claros en NMVTIS y DMV. Los autos de Uber y Lyft típicamente se registran como vehículos privados de pasajeros, así que a menudo no dejan marca comercial explícita. En esos casos, los puntos del historial son indirectos: kilometraje anual inusualmente alto, una entrada de seguro comercial o un registro de rideshare específico del estado donde la ley local lo requiere." },
  { question: "¿Debería evitar un ex-auto de rideshare de alto kilometraje?", answer: "El alto kilometraje por sí solo no es razón para retirarse si el precio lo refleja y el auto pasa la revisión mecánica. Prioriza un ex-auto de rideshare con mantenimiento documentado y una inspección previa a la compra limpia sobre uno más barato sin registros. Presta atención especial a los frenos, condición del líquido de transmisión y componentes de suspensión, ya que la conducción urbana de arranque-paro desgasta esos sistemas más rápido de lo que sugiere el odómetro." },
  { question: "¿El historial de seguro de uso comercial aparece en un reporte VIN?", answer: "A veces. Cuando un vehículo tuvo una póliza comercial o con endoso de rideshare, esa cobertura puede aparecer en registros provenientes de seguros vinculados al VIN y es una pista fuerte de uso comercial. Pero muchos conductores de rideshare de tiempo parcial usan pólizas personales con solo un complemento de rideshare, que puede no aparecer claramente. Trata la ausencia de un registro de seguro comercial como inconcluso en vez de prueba de que el auto nunca fue usado para rideshare." },
];

interface Props { locale: Locale; }

export default function RideshareCheckBody({ locale }: Props) {
  const c = COPY[locale];
  const faqs = locale === "es" ? FAQS_ES : FAQS_EN;
  const link = (en: string) => (locale === "es" ? `/es${en}` : en);

  return (
    <article className="pb-16 bg-surface">
      {/* Hero */}
      <div className="bg-primary text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20">
          <Breadcrumbs items={[{ label: c.home, href: locale === "es" ? "/es" : "/" }, { label: c.crumb }]} onDark />

          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
            <Car className="w-4 h-4" /> {c.badge}
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
            {c.trustStats.map((s, i) => {
              const Icon = TRUST_ICONS[i];
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

      {/* Stats block */}
      <section aria-labelledby="rideshare-stats-heading" className="max-w-5xl mx-auto px-4 sm:px-6 -mt-8 sm:-mt-10 relative z-10">
        <div className="rounded-3xl bg-surface-container shadow-md border border-outline-variant p-5 sm:p-7">
          <h2 id="rideshare-stats-heading" className="text-xs sm:text-sm font-headline font-black uppercase tracking-widest text-primary mb-4 sm:mb-5">
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
        {/* Why */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">{c.h2Why}</h2>
          <div className="prose prose-slate max-w-none text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
            <p>{c.whyP1}</p>
            <p>
              {c.whyP2Pre}
              <strong className="text-on-surface">{c.whyP2Bold}</strong>
              {c.whyP2Suffix}
            </p>
            <p>{c.whyP3}</p>
          </div>
        </section>

        {/* Record fields */}
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

        {/* Wear */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">{c.h2Wear}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-6 leading-relaxed">{c.wearIntro}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {c.wearItems.map((item, i) => {
              const Icon = WEAR_ICONS[i];
              return (
                <div key={item.title} className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="w-5 h-5 text-primary" />
                    <h3 className="text-base font-headline font-extrabold text-on-surface">{item.title}</h3>
                  </div>
                  <p className="text-sm text-on-surface-variant leading-relaxed">{item.body}</p>
                </div>
              );
            })}
          </div>
          <p className="mt-6 text-sm sm:text-base text-on-surface-variant leading-relaxed">
            {c.wearOutroPre}
            <Link href={link("/odometer-check")} className="text-primary underline underline-offset-2 font-medium">{c.wearOutroLink}</Link>
            {c.wearOutroSuffix}
          </p>
        </section>

        {/* Signs */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Signs}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8">{c.signsIntro}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {c.signs.map((b) => (
              <div key={b.flag} className="flex gap-3 items-start rounded-xl border border-outline-variant bg-surface-container-lowest p-4">
                <AlertCircle className="w-5 h-5 text-error flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-sm font-bold text-on-surface">{b.flag}</strong>
                  <p className="text-xs text-on-surface-variant mt-0.5 leading-relaxed">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Step-by-step */}
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

        {/* Rideshare vs rental vs private */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">{c.h2Compare}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-6 leading-relaxed">{c.compareIntro}</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {c.useKinds.map((item, i) => {
              const Icon = USE_KIND_ICONS[i];
              return (
                <div key={item.title} className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Icon className="w-5 h-5 text-primary" {...(i === 2 ? { strokeWidth: 3 } : {})} />
                    <h3 className="text-base font-headline font-extrabold text-on-surface">{item.title}</h3>
                  </div>
                  <p className="text-sm text-on-surface-variant leading-relaxed">{item.body}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-6 rounded-2xl bg-primary/5 border border-primary/20 p-5 sm:p-6">
            <p className="text-sm text-on-surface-variant leading-relaxed">
              <strong className="text-primary">{c.bottomLineLead}</strong>
              {c.bottomLineBody}
            </p>
          </div>
        </section>

        {/* Mid-page CTA */}
        <section className="py-10">
          <div className="rounded-3xl bg-primary p-7 sm:p-10 text-center">
            <Star className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-white mb-2">{c.midCtaHeading}</h2>
            <p className="text-white/80 text-sm sm:text-base mb-6 max-w-xl mx-auto">{c.midCtaSub}</p>
            <div className="max-w-xl mx-auto bg-white rounded-2xl p-4 sm:p-5">
              <VinSearchForm size="lg"  locale={locale}/>
            </div>
          </div>
        </section>

        {/* Internal links */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
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

        {/* VIN Check banner */}
        <section className="py-10">
          <VinCheckBanner />
        </section>

        {/* FAQ */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
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

        {/* Bottom CTA */}
        <section className="py-14 sm:py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-wider mb-4">
            <Zap className="w-3.5 h-3.5" /> {c.bottomBadge}
          </div>
          <h2 className="text-2xl sm:text-4xl font-headline font-extrabold text-primary mb-3">{c.ctaBottomHeading}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto mb-8">{c.ctaBottomSub}</p>
          <div className="max-w-xl mx-auto bg-surface-container-low rounded-2xl p-5 border border-outline-variant">
            <VinSearchForm size="lg"  locale={locale}/>
          </div>
        </section>

        {/* Sources */}
        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Sources}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-6">{c.sourcesIntro}</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            {c.sources.map((s) => (
              <li key={s.href} className="rounded-xl border border-outline-variant bg-surface-container-lowest p-4">
                <a href={s.href} target="_blank" rel="noopener noreferrer nofollow" className="text-primary font-bold underline underline-offset-2">
                  {s.label} ↗
                </a>
                <p className="mt-1.5 text-xs sm:text-sm text-on-surface-variant leading-relaxed">{s.note}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs text-on-surface-variant italic">{c.sourcesDisclaimer}</p>
        </section>

        <RelatedChecks exclude="/rideshare-check" />
      </div>
    </article>
  );
}

export { FAQS_EN, FAQS_ES, FAQS_FR };

// Wave 19 — French uses the Spanish FAQ array as a structural fallback.
// The user-visible FAQ component already uses the locale="fr" branch in COPY;
// this alias only feeds the JSON-LD FAQPage schema until /fr metadata is translated.
const FAQS_FR = FAQS_ES;
