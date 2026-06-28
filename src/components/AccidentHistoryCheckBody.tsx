/**
 * Shared body for /accident-history-check and /es/accident-history-check.
 * Wave 18a — renders the same full English layout in both locales via a
 * COPY={en,es} map. Replaces the Wave 15 SpecialtyToolPage stub on /es.
 */

import Link from "@/components/LocaleLink";
import { Check } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import type { Locale } from "@/i18n/config";

const COPY = {
  en: {
    home: "Home",
    crumb: "Accident History Check",
    h1: "Vehicle Accident History Check",
    intro:
      "Roughly one in three used cars on the market has been in at least one reported accident. A VIN-based accident history check pulls insurance claims, police reports, body-shop records, and total-loss data so you can see exactly what happened to a vehicle before you buy — not just what the seller chooses to tell you.",
    runHeading: "Run an Accident History Check Now",
    h2Collected: "How Accident Data Is Actually Collected",
    collectedP1:
      "Vehicle accident data does not come from a single national database. Instead, it is aggregated from dozens of sources that each capture a different slice of every collision event. The largest contributors are auto insurance companies, which report claims to industry data exchanges; police departments, which file crash reports through state DMVs; collision repair shops, which log work performed on each VIN; and salvage auctions, which record total-loss vehicles.",
    collectedP2:
      "When you run an accident history check, the report consolidates these feeds into a single timeline keyed to the VIN. You see when damage was reported, the severity classification, the area of the vehicle affected, and the source of the record. Some events list estimated repair costs, while others note only that a claim was filed.",
    collectedP3:
      "Keep in mind that not every accident is reported. A driver who fixes a fender bender out of pocket without filing a claim may never trigger any database entry. That is why accident history reports are best used alongside an in-person inspection — they catch what a visual check might miss, but they cannot catch everything.",
    h2InsVsPolice: "Insurance Records vs. Police Reports",
    insP1:
      "Insurance records are the most comprehensive source of accident data because nearly every collision involves a claim against someone's policy. Insurance reports typically include the date of loss, the severity (minor, moderate, or severe), the point of impact (front, rear, side, rollover), and whether airbags deployed.",
    insP2:
      "Police reports add a different layer. They include accident location, contributing factors (weather, distracted driving, DUI), and sometimes whether the vehicle was towed from the scene. Combining both data sets gives you a fuller picture than either source alone, and a quality VIN report will pull from both.",
    h2Appears: "What Appears on an Accident History Report",
    appearsLead: "When a VIN has accident history, your report will surface details such as:",
    bullets1: [
      { strong: "Date and location", rest: " of each reported accident." },
      { strong: "Severity classification", rest: " — minor, moderate, or severe damage." },
      { strong: "Point of impact", rest: " — front, rear, side, or rollover." },
      { strong: "Airbag deployment", rest: " — a strong indicator of significant impact." },
      { strong: "Estimated repair amount", rest: " when reported by the insurer." },
      { strong: "Total-loss status", rest: " indicating the insurer declared the vehicle uneconomical to repair." },
    ],
    h2Signs: "Signs of Hidden Collision Damage",
    signsLead:
      "Even after a thorough body-shop repair, telltale clues often remain. When you inspect a used vehicle in person, look for the following indicators that there may be unreported or under-reported accident history:",
    bullets2: [
      "Uneven panel gaps between doors, hood, fenders, or trunk lid.",
      "Paint that does not quite match between adjacent panels, or visible overspray on rubber trim and weatherstripping.",
      "Fresh weld marks, replacement bolts on inner fenders, or aftermarket structural components.",
      "Airbag covers that look slightly off-color, are loose, or have visible seams from prior deployment and replacement.",
      "Tires that wear unevenly, indicating possible frame or alignment damage from a previous collision.",
      "Dashboard warning lights for ABS, traction control, or airbag systems that come on after start-up.",
    ],
    h2Severity: "Severity Matters — But So Does Location",
    sevP1:
      "A single minor parking-lot scrape is not the same as a frame-bent front-end collision, even though both will appear on an accident report. When you read a report, focus on three things: severity, point of impact, and whether airbags deployed. A minor rear bumper repaint is usually a non-issue. A severe front-end collision with airbag deployment is a much more serious consideration, especially because it may have damaged structural components, sensors, and ECUs that are expensive to fully restore.",
    sevP2Pre:
      "If the report shows a severe accident, our recommendation is to either pass on the vehicle or insist on a thorough pre-purchase inspection from a body shop that specializes in collision repair. Some severely damaged vehicles end up with a salvage brand — check our ",
    salvageLink: "salvage title check",
    sevP2Suffix: " page for more on that.",
    h2Together: "Putting It All Together",
    togetherPre: "An accident history check is one piece of a complete due diligence process. Pair it with a ",
    stolenLink: "stolen vehicle check",
    togetherMid1: ", an ",
    odoLink: "odometer check",
    togetherMid2: ", and a full ",
    vinLink: "VIN history report",
    togetherMid3:
      " so nothing slips through. Buyers who do this consistently almost never end up with a problem car. New to the process? Start with our ",
    guidesLink: "full guide library",
    togetherSuffix: " for step-by-step walkthroughs.",
    faqHeading: "Frequently Asked Questions",
    ctaHeading: "Check for Reported Accidents",
    ctaSub:
      "Enter a 17-character VIN to see crash records, insurance claims, and damage history.",
  },
  es: {
    home: "Inicio",
    crumb: "Verificación de historial de accidentes",
    h1: "Verificación del historial de accidentes del vehículo",
    intro:
      "Aproximadamente uno de cada tres autos usados en el mercado ha tenido al menos un accidente reportado. Una verificación del historial de accidentes por VIN extrae reclamos de seguros, reportes policiales, registros de talleres y datos de pérdida total para que veas exactamente qué le pasó al vehículo antes de comprarlo — no solo lo que el vendedor decida contarte.",
    runHeading: "Haz una verificación de historial de accidentes ahora",
    h2Collected: "Cómo se recopilan realmente los datos de accidentes",
    collectedP1:
      "Los datos de accidentes vehiculares no provienen de una sola base de datos nacional. Se agregan desde decenas de fuentes que cada una captura una parte distinta de cada colisión. Los principales contribuyentes son las aseguradoras de autos, que reportan reclamos a intercambios de datos de la industria; los departamentos de policía, que presentan reportes de choques a través de los DMV estatales; los talleres de carrocería, que registran el trabajo realizado en cada VIN; y las subastas de salvamento, que registran vehículos con pérdida total.",
    collectedP2:
      "Al hacer una verificación del historial de accidentes, el reporte consolida estos datos en una línea de tiempo única vinculada al VIN. Verás cuándo se reportó el daño, la clasificación de gravedad, el área afectada del vehículo y la fuente del registro. Algunos eventos incluyen costos estimados de reparación, mientras que otros solo indican que se presentó un reclamo.",
    collectedP3:
      "Recuerda que no todos los accidentes se reportan. Un conductor que repara un golpe menor de su propio bolsillo sin presentar un reclamo puede nunca generar una entrada en la base de datos. Por eso, los reportes de historial de accidentes funcionan mejor junto con una inspección presencial — capturan lo que una revisión visual pasaría por alto, pero no pueden capturar todo.",
    h2InsVsPolice: "Registros de seguros vs. reportes policiales",
    insP1:
      "Los registros de seguros son la fuente más completa de datos de accidentes porque casi toda colisión genera un reclamo contra la póliza de alguien. Los reportes de seguros suelen incluir la fecha de la pérdida, la gravedad (menor, moderada o severa), el punto de impacto (frontal, trasero, lateral, vuelco) y si se desplegaron las bolsas de aire.",
    insP2:
      "Los reportes policiales añaden otra capa. Incluyen la ubicación del accidente, factores contribuyentes (clima, distracción al conducir, DUI) y a veces si el vehículo fue remolcado del lugar. Combinar ambos conjuntos de datos te da una imagen más completa que cualquiera de las dos fuentes por separado, y un reporte VIN de calidad extraerá información de ambas.",
    h2Appears: "Qué aparece en un reporte de historial de accidentes",
    appearsLead: "Cuando un VIN tiene historial de accidentes, tu reporte mostrará detalles como:",
    bullets1: [
      { strong: "Fecha y ubicación", rest: " de cada accidente reportado." },
      { strong: "Clasificación de gravedad", rest: " — daño menor, moderado o severo." },
      { strong: "Punto de impacto", rest: " — frontal, trasero, lateral o vuelco." },
      { strong: "Despliegue de bolsa de aire", rest: " — un fuerte indicador de impacto significativo." },
      { strong: "Monto estimado de reparación", rest: " cuando lo reporta la aseguradora." },
      { strong: "Estado de pérdida total", rest: " indicando que la aseguradora declaró el vehículo no rentable para reparar." },
    ],
    h2Signs: "Señales de daño por colisión oculto",
    signsLead:
      "Incluso después de una reparación completa en taller, suelen quedar pistas reveladoras. Al inspeccionar un vehículo usado en persona, busca los siguientes indicadores de un posible historial de accidentes no reportado o subreportado:",
    bullets2: [
      "Espacios desiguales entre puertas, capó, guardabarros o cajuela.",
      "Pintura que no coincide exactamente entre paneles adyacentes, o salpicaduras visibles en molduras de goma y burletes.",
      "Marcas de soldadura frescas, tornillos de reemplazo en guardabarros interiores o componentes estructurales no originales.",
      "Cubiertas de bolsas de aire que se ven ligeramente descoloridas, están sueltas o tienen costuras visibles por despliegue y reemplazo previos.",
      "Llantas con desgaste irregular, indicando posible daño al chasis o alineación por una colisión previa.",
      "Luces de advertencia del tablero para ABS, control de tracción o sistemas de bolsa de aire que se encienden tras arrancar.",
    ],
    h2Severity: "La gravedad importa — pero también el lugar",
    sevP1:
      "Un solo raspón menor en un estacionamiento no es lo mismo que una colisión frontal que dobla el chasis, aunque ambos aparezcan en un reporte de accidentes. Al leer un reporte, enfócate en tres cosas: gravedad, punto de impacto y si se desplegaron las bolsas de aire. Repintar un parachoques trasero menor suele ser irrelevante. Una colisión frontal severa con despliegue de bolsas de aire es una consideración mucho más seria, especialmente porque pudo dañar componentes estructurales, sensores y ECUs costosos de restaurar por completo.",
    sevP2Pre:
      "Si el reporte muestra un accidente severo, nuestra recomendación es descartar el vehículo o exigir una inspección previa a la compra exhaustiva en un taller de carrocería especializado en reparación de colisiones. Algunos vehículos con daño severo terminan con título de salvamento — consulta nuestra página de ",
    salvageLink: "verificación de título de salvamento",
    sevP2Suffix: " para más información.",
    h2Together: "Poniéndolo todo junto",
    togetherPre: "Una verificación de historial de accidentes es parte de un proceso completo de diligencia. Combínala con una ",
    stolenLink: "verificación de vehículo robado",
    togetherMid1: ", una ",
    odoLink: "verificación de odómetro",
    togetherMid2: " y un ",
    vinLink: "reporte completo de historial VIN",
    togetherMid3:
      " para que nada se escape. Los compradores que hacen esto de forma constante casi nunca terminan con un auto problemático. ¿Eres nuevo en el proceso? Comienza por nuestra ",
    guidesLink: "biblioteca completa de guías",
    togetherSuffix: " para tutoriales paso a paso.",
    faqHeading: "Preguntas frecuentes",
    ctaHeading: "Verifica accidentes reportados",
    ctaSub:
      "Ingresa un VIN de 17 caracteres para ver registros de choques, reclamos de seguros e historial de daños.",
  },
  fr: {
    home: "Accueil",
    crumb: "Vérification de l'historique d'accidents",
    h1: "Vérification de l'historique d'accidents du véhicule",
    intro:
      "Environ une voiture d'occasion sur trois sur le marché a eu au moins un accident signalé. Une vérification de l'historique d'accidents basée sur le VIN extrait les réclamations d'assurance, les rapports de police, les registres de carrosseries et les données de perte totale pour que tu puisses voir exactement ce qui est arrivé à un véhicule avant de l'acheter — pas seulement ce que le vendeur choisit de te dire.",
    runHeading: "Lance une vérification de l'historique d'accidents maintenant",
    h2Collected: "Comment les données d'accidents sont réellement collectées",
    collectedP1:
      "Les données d'accidents de véhicules ne proviennent pas d'une seule base de données nationale. Elles sont agrégées à partir de dizaines de sources qui capturent chacune une part différente de chaque collision. Les principaux contributeurs sont les compagnies d'assurance auto, qui signalent les réclamations à des échanges de données de l'industrie ; les services de police, qui déposent des rapports d'accident via les DMV d'État ; les carrosseries, qui consignent le travail effectué sur chaque VIN ; et les enchères de salvage, qui enregistrent les véhicules en perte totale.",
    collectedP2:
      "Quand tu lances une vérification de l'historique d'accidents, le rapport consolide ces flux en une seule chronologie liée au VIN. Tu verras quand les dommages ont été signalés, la classification de gravité, la zone du véhicule affectée et la source du registre. Certains événements indiquent les coûts estimés de réparation, tandis que d'autres notent seulement qu'une réclamation a été déposée.",
    collectedP3:
      "Garde à l'esprit que tous les accidents ne sont pas signalés. Un conducteur qui répare un petit accrochage de sa poche sans déposer de réclamation peut ne jamais déclencher d'entrée dans une base de données. C'est pourquoi les rapports d'historique d'accidents s'utilisent mieux avec une inspection en personne — ils attrapent ce qu'une vérification visuelle pourrait manquer, mais ils ne peuvent pas tout attraper.",
    h2InsVsPolice: "Registres d'assurance vs. rapports de police",
    insP1:
      "Les registres d'assurance sont la source la plus complète de données d'accidents parce que presque chaque collision implique une réclamation contre la police de quelqu'un. Les rapports d'assurance incluent généralement la date de la perte, la gravité (mineure, modérée ou sévère), le point d'impact (avant, arrière, côté, tonneau) et si les coussins gonflables se sont déployés.",
    insP2:
      "Les rapports de police ajoutent une couche différente. Ils incluent le lieu de l'accident, les facteurs contributifs (météo, distraction au volant, alcool au volant) et parfois si le véhicule a été remorqué de la scène. Combiner les deux ensembles de données te donne une image plus complète qu'une seule source, et un rapport VIN de qualité puisera dans les deux.",
    h2Appears: "Ce qui apparaît sur un rapport d'historique d'accidents",
    appearsLead: "Quand un VIN a un historique d'accidents, ton rapport fera ressortir des détails tels que :",
    bullets1: [
      { strong: "Date et lieu", rest: " de chaque accident signalé." },
      { strong: "Classification de gravité", rest: " — dommages mineurs, modérés ou sévères." },
      { strong: "Point d'impact", rest: " — avant, arrière, côté ou tonneau." },
      { strong: "Déploiement des coussins gonflables", rest: " — un fort indicateur d'impact significatif." },
      { strong: "Montant estimé de réparation", rest: " lorsque signalé par l'assureur." },
      { strong: "Statut de perte totale", rest: " indiquant que l'assureur a déclaré le véhicule non rentable à réparer." },
    ],
    h2Signs: "Signes de dommages de collision cachés",
    signsLead:
      "Même après une réparation complète en carrosserie, des indices révélateurs subsistent souvent. Quand tu inspectes un véhicule d'occasion en personne, cherche les indicateurs suivants qu'il pourrait y avoir un historique d'accidents non signalé ou sous-signalé :",
    bullets2: [
      "Écarts inégaux entre les portes, le capot, les ailes ou le couvercle du coffre.",
      "Peinture qui ne correspond pas tout à fait entre les panneaux adjacents, ou éclaboussures visibles sur les garnitures en caoutchouc et les joints d'étanchéité.",
      "Marques de soudure fraîches, boulons de remplacement sur les ailes intérieures, ou composants structuraux non d'origine.",
      "Couvertures de coussins gonflables qui semblent légèrement décolorées, sont lâches ou ont des coutures visibles dues à un déploiement et un remplacement antérieurs.",
      "Pneus qui s'usent de manière inégale, indiquant un possible dommage au châssis ou à l'alignement dû à une collision précédente.",
      "Voyants d'avertissement du tableau de bord pour l'ABS, le contrôle de traction ou les systèmes d'airbag qui s'allument après le démarrage.",
    ],
    h2Severity: "La gravité importe — mais l'emplacement aussi",
    sevP1:
      "Une seule éraflure mineure de stationnement n'est pas la même chose qu'une collision frontale qui plie le châssis, même si les deux apparaîtront sur un rapport d'accident. Quand tu lis un rapport, concentre-toi sur trois choses : la gravité, le point d'impact et si les coussins gonflables se sont déployés. Repeindre un pare-chocs arrière mineur n'est généralement pas un problème. Une collision frontale sévère avec déploiement des coussins gonflables est une considération beaucoup plus sérieuse, surtout parce qu'elle peut avoir endommagé des composants structuraux, des capteurs et des ECUs coûteux à restaurer entièrement.",
    sevP2Pre:
      "Si le rapport montre un accident sévère, notre recommandation est de soit passer sur le véhicule, soit insister sur une inspection pré-achat approfondie auprès d'une carrosserie spécialisée en réparation de collisions. Certains véhicules gravement endommagés finissent avec une marque de salvage — consulte notre page de ",
    salvageLink: "vérification de titre salvage",
    sevP2Suffix: " pour plus d'informations.",
    h2Together: "Mettre tout ensemble",
    togetherPre: "Une vérification de l'historique d'accidents est une pièce d'un processus complet de diligence raisonnable. Associe-la avec une ",
    stolenLink: "vérification de véhicule volé",
    togetherMid1: ", une ",
    odoLink: "vérification du compteur kilométrique",
    togetherMid2: ", et un ",
    vinLink: "rapport complet d'historique VIN",
    togetherMid3:
      " pour que rien ne glisse à travers. Les acheteurs qui font cela de manière constante ne se retrouvent presque jamais avec une voiture problématique. Nouveau dans le processus ? Commence par notre ",
    guidesLink: "bibliothèque complète de guides",
    togetherSuffix: " pour des tutoriels pas à pas.",
    faqHeading: "Questions fréquentes",
    ctaHeading: "Vérifie les accidents signalés",
    ctaSub:
      "Saisis un VIN de 17 caractères pour voir les registres d'accidents, les réclamations d'assurance et l'historique des dommages.",
  },
} as const;

const FAQS_EN = [
  {
    question: "What does an accident history check show?",
    answer:
      "An accident history check tied to a VIN surfaces reported collisions and damage events, including the date and location of each accident, a severity classification (minor, moderate, or severe), the point of impact (front, rear, side, or rollover), whether airbags deployed, any estimated repair cost reported by the insurer, and total-loss status. It consolidates insurance claims, police reports, body-shop records, and salvage-auction data into a single timeline keyed to the VIN.",
  },
  {
    question: "Does an accident history check show every accident?",
    answer:
      "No. An accident history report only shows accidents that were reported to a data source it pulls from, such as an insurance claim, a police crash report, a body-shop record, or a total-loss filing. A minor fender bender that the owner paid for out of pocket with no insurance claim and no police report will not appear. That is why no vehicle history report captures 100% of accidents, and why a report works best alongside an in-person inspection.",
  },
  {
    question: "Where does VIN accident data come from?",
    answer:
      "Accident data does not come from one national database. It is aggregated from several sources that each capture part of a collision event: auto insurance companies that report claims to industry data exchanges, police departments that file crash reports through state DMVs, collision repair shops that log work performed on a VIN, and salvage auctions that record total-loss vehicles. A quality report combines insurance and police-reported data for a fuller picture than either source alone.",
  },
  {
    question: "Does a clean accident report mean the car was never in an accident?",
    answer:
      "Not necessarily. A clean report means no accident was ever reported to the data sources the check pulls from. A collision that was repaired without an insurance claim or police report can leave no database trace, so it would not show up. Treat a clean report as strong but not absolute evidence, and confirm it with an in-person inspection looking for uneven panel gaps, mismatched paint, fresh weld marks, or replaced airbag covers.",
  },
  {
    question: "How do I check a car's accident history by VIN?",
    answer:
      "Enter the vehicle's 17-character VIN into the accident history check form on this page. The system queries insurance claim feeds, police crash reports, collision repair records, and total-loss data tied to that VIN, then returns a timeline of any reported accidents with the date, severity, point of impact, and airbag deployment status. The VIN is stamped on the dashboard at the base of the windshield and on the driver-side door jamb sticker.",
  },
  {
    question: "Do minor accidents show up on a VIN check?",
    answer:
      "Minor accidents show up only if they were reported. A minor collision that generated an insurance claim, a police report, or a body-shop record will appear, usually flagged as minor severity. A small scrape repaired privately with no claim or report often leaves no record at all. When reading a report, weigh severity and point of impact: a minor rear bumper repaint is usually a non-issue, while any severe front-end impact with airbag deployment deserves a closer look.",
  },
  {
    question: "Why does accident severity and location matter more than the count?",
    answer:
      "A single severe collision can matter far more than several minor ones. When reading an accident report, focus on three things: the severity rating, the point of impact, and whether airbags deployed. A minor parking-lot scrape is cosmetic, but a severe front-end collision with airbag deployment may have damaged structural components, sensors, and ECUs that are expensive to fully restore. Severely damaged vehicles can also end up with a salvage title brand, which is worth checking separately.",
  },
];

const FAQS_ES = [
  {
    question: "¿Qué muestra una verificación del historial de accidentes?",
    answer:
      "Una verificación del historial de accidentes vinculada a un VIN muestra colisiones y eventos de daño reportados, incluyendo la fecha y ubicación de cada accidente, una clasificación de gravedad (menor, moderada o severa), el punto de impacto (frontal, trasero, lateral o vuelco), si se desplegaron las bolsas de aire, cualquier costo estimado de reparación reportado por la aseguradora y el estado de pérdida total. Consolida reclamos de seguros, reportes policiales, registros de talleres y datos de subastas de salvamento en una sola línea de tiempo vinculada al VIN.",
  },
  {
    question: "¿Una verificación de historial de accidentes muestra todos los accidentes?",
    answer:
      "No. Un reporte de historial de accidentes solo muestra accidentes que fueron reportados a una fuente de datos de la que extrae información: reclamos de seguros, reportes policiales, registros de talleres o declaraciones de pérdida total. Un golpe menor que el dueño pagó de su bolsillo sin reclamo de seguro ni reporte policial no aparecerá. Por eso ningún reporte de historial captura el 100% de los accidentes, y por eso un reporte funciona mejor junto con una inspección presencial.",
  },
  {
    question: "¿De dónde provienen los datos de accidentes por VIN?",
    answer:
      "Los datos de accidentes no provienen de una sola base de datos nacional. Se agregan desde varias fuentes que capturan parte de cada colisión: aseguradoras que reportan reclamos a intercambios de datos de la industria, departamentos de policía que presentan reportes de choques a través de los DMV estatales, talleres de carrocería que registran trabajos realizados en un VIN y subastas de salvamento que registran vehículos con pérdida total. Un reporte de calidad combina datos de seguros y policiales para una imagen más completa que cualquiera de las dos fuentes por separado.",
  },
  {
    question: "¿Un reporte limpio de accidentes significa que el auto nunca tuvo uno?",
    answer:
      "No necesariamente. Un reporte limpio significa que ningún accidente fue reportado a las fuentes de las que extrae datos la verificación. Una colisión reparada sin reclamo de seguro ni reporte policial puede no dejar rastro en bases de datos y por lo tanto no aparecería. Considera un reporte limpio como evidencia fuerte pero no absoluta, y confírmalo con una inspección presencial buscando espacios desiguales entre paneles, pintura que no coincide, marcas de soldadura frescas o cubiertas de bolsas de aire reemplazadas.",
  },
  {
    question: "¿Cómo verifico el historial de accidentes de un auto por VIN?",
    answer:
      "Ingresa el VIN de 17 caracteres del vehículo en el formulario de verificación de historial de accidentes en esta página. El sistema consulta feeds de reclamos de seguros, reportes policiales de choques, registros de reparación de colisiones y datos de pérdida total vinculados a ese VIN, y devuelve una línea de tiempo de cualquier accidente reportado con la fecha, gravedad, punto de impacto y estado de despliegue de bolsas de aire. El VIN está estampado en el tablero en la base del parabrisas y en la calcomanía del marco de la puerta del conductor.",
  },
  {
    question: "¿Los accidentes menores aparecen en una verificación VIN?",
    answer:
      "Los accidentes menores aparecen solo si fueron reportados. Una colisión menor que generó un reclamo de seguro, un reporte policial o un registro de taller aparecerá, generalmente marcada como gravedad menor. Un pequeño raspón reparado de forma privada sin reclamo ni reporte a menudo no deja registro alguno. Al leer un reporte, pondera la gravedad y el punto de impacto: repintar un parachoques trasero menor suele ser irrelevante, mientras que cualquier impacto frontal severo con despliegue de bolsas de aire merece un análisis más detallado.",
  },
  {
    question: "¿Por qué la gravedad y ubicación importan más que el conteo de accidentes?",
    answer:
      "Una sola colisión severa puede importar mucho más que varias menores. Al leer un reporte de accidentes, enfócate en tres cosas: la clasificación de gravedad, el punto de impacto y si se desplegaron las bolsas de aire. Un raspón menor en estacionamiento es cosmético, pero una colisión frontal severa con despliegue de bolsas de aire pudo haber dañado componentes estructurales, sensores y ECUs costosos de restaurar por completo. Los vehículos con daño severo también pueden terminar con un título de salvamento, lo cual vale la pena verificar por separado.",
  },
];

interface Props {
  locale: Locale;
}

export default function AccidentHistoryCheckBody({ locale }: Props) {
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
              { label: c.crumb },
            ]}
          />

          <h1 className="mt-6 text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
            {c.h1}
          </h1>
          <p className="mt-4 text-lg text-slate-700 leading-relaxed">{c.intro}</p>

          <div className="mt-8 p-6 bg-primary-50 rounded-2xl border border-primary-100">
            <h2 className="text-lg font-bold text-slate-900 mb-3">{c.runHeading}</h2>
            <VinSearchForm size="sm" />
          </div>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">{c.h2Collected}</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.collectedP1}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.collectedP2}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.collectedP3}</p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">{c.h2InsVsPolice}</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.insP1}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.insP2}</p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">{c.h2Appears}</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.appearsLead}</p>
          <ul className="mt-4 space-y-2 text-slate-600">
            {c.bullets1.map((b) => (
              <li key={b.strong} className="flex gap-2 items-start">
                <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>{b.strong}</strong>
                  {b.rest}
                </span>
              </li>
            ))}
          </ul>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">{c.h2Signs}</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.signsLead}</p>
          <ul className="mt-4 space-y-2 text-slate-600">
            {c.bullets2.map((b) => (
              <li key={b} className="flex gap-2 items-start">
                <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">{c.h2Severity}</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.sevP1}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            {c.sevP2Pre}
            <Link
              href={link("/salvage-title-check")}
              className="text-primary-600 hover:underline font-medium"
            >
              {c.salvageLink}
            </Link>
            {c.sevP2Suffix}
          </p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">{c.h2Together}</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            {c.togetherPre}
            <Link
              href={link("/stolen-vehicle-check")}
              className="text-primary-600 hover:underline font-medium"
            >
              {c.stolenLink}
            </Link>
            {c.togetherMid1}
            <Link
              href={link("/odometer-check")}
              className="text-primary-600 hover:underline font-medium"
            >
              {c.odoLink}
            </Link>
            {c.togetherMid2}
            <Link
              href={link("/vin-check")}
              className="text-primary-600 hover:underline font-medium"
            >
              {c.vinLink}
            </Link>
            {c.togetherMid3}
            <Link
              href={link("/guides")}
              className="text-primary-600 hover:underline font-medium"
            >
              {c.guidesLink}
            </Link>
            {c.togetherSuffix}
          </p>

          <section className="mt-16">
            <h2 className="text-2xl font-bold text-slate-900">{c.faqHeading}</h2>
            <div className="mt-6 space-y-3">
              {faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group rounded-xl border border-slate-200 bg-white p-5 [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-4 font-semibold list-none">
                    <h3 className="text-base sm:text-lg font-semibold text-slate-900 m-0">
                      {faq.question}
                    </h3>
                    <span className="flex-shrink-0 text-2xl text-primary-600 font-light transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 leading-relaxed text-slate-600">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>
        </div>
      </article>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-4">
        <RelatedChecks exclude="/accident-history-check" />
      </div>

      <section className="py-14 bg-slate-50">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">{c.ctaHeading}</h2>
          <p className="text-slate-700 mb-6">{c.ctaSub}</p>
          <VinSearchForm size="sm" />
        </div>
      </section>
    </>
  );
}

export { FAQS_EN, FAQS_ES, FAQS_FR };

// Wave 19 — French uses the Spanish FAQ array as a structural fallback.
// The user-visible FAQ component already uses the locale="fr" branch in COPY;
// this alias only feeds the JSON-LD FAQPage schema until /fr metadata is translated.
const FAQS_FR = FAQS_ES;
