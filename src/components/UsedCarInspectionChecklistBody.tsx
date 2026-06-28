/**
 * Shared body for /used-car-inspection-checklist and /es/used-car-inspection-checklist.
 * Wave 18.19 — full English layout in both locales via COPY={en,es}.
 */

import Link from "next/link";
import {
  AlertTriangle,
  CheckCircle2,
  ClipboardList,
  Eye,
  ShieldAlert,
  XCircle,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import InspectionChecklist from "@/app/used-car-inspection-checklist/InspectionChecklist";
import { inspectionChecklist } from "@/lib/inspection-checklist";
import type { Locale } from "@/i18n/config";

const TOTAL_ITEMS = inspectionChecklist.reduce((s, sec) => s + sec.items.length, 0);

const COPY = {
  en: {
    home: "Home",
    crumb: "Used Car Inspection Checklist",
    h1: "Used Car Pre-Purchase Inspection Checklist",
    introPre: "A free, interactive ",
    introMid: "-point inspection across 8 categories — exterior, underneath, engine bay, interior, test drive, documents, tires & brakes, and HVAC. Spot deal-breakers before you pay, then generate a printable report you can share with your mechanic or partner.",
    h2WhyPpi: "Why a Pre-Purchase Inspection Matters",
    whyPpi1: "The average used car sale in the US carries $1,400 in undisclosed problems. Sellers warm up the engine, clear the dash codes, and use heavy detailing to mask issues you'd spot in 30 seconds in proper light. A 45-minute DIY inspection eliminates 70–80% of bad buys without spending a dime.",
    whyPpi2: "The goal isn't to find a perfect car — every used car has flaws. The goal is to find flaws the seller hasn't disclosed, then either negotiate the price or walk away. Use this checklist as your script.",
    h2DiyVsMech: "DIY vs Mechanic Pre-Purchase Inspection",
    tblAspect: "Aspect",
    tblDiy: "DIY Checklist",
    tblMech: "Mechanic PPI",
    diyRows: [
      ["Cost", "Free", "$120–$250"],
      ["Time", "45–60 min", "1–2 hours (plus scheduling)"],
      ["Catches deal-breakers", "Yes — frame, title, fluids, smell", "Yes, plus internal compression"],
      ["Catches mechanical wear", "Some — shifts, brakes, leaks", "Most — lift inspection, scan tools"],
      ["When to use", "Every used car, before any deposit", "Final-round candidate, after DIY pass"],
    ] as const,
    diyAfter: "Use the DIY checklist first to filter out the obvious bad buys. Only pay for a mechanic PPI on the final 1–2 cars you're seriously considering.",
    h2RedFlags: "Top 10 Red Flags Buyers Miss",
    topRedFlags: [
      { title: "Mayonnaise residue under the oil cap", detail: "Creamy white-tan film = coolant in the oil. Almost always head gasket failure ($2,500–$6,000)." },
      { title: "Mismatched bolt heads in the engine bay", detail: "Replaced fender, radiator, or core support bolts indicate undisclosed front-end collision repair." },
      { title: "Wavy weld beads on the frame", detail: "Factory frames are spot-welded uniformly. Wavy MIG welds = structural collision repair. Walk away." },
      { title: "Rust on seat-belt brackets or seat tracks", detail: "Metal hardware low in the cabin doesn't rust unless the car was submerged. Classic flood-damage signal." },
      { title: "Wear that doesn't match mileage", detail: "Worn pedals, shiny steering wheel, or threadbare driver seat on a '40k mile' car = likely odometer rollback." },
      { title: "Persistent warning lights", detail: "Sellers often clear codes the day before sale. Drive 10+ minutes; if CEL or ABS comes back, codes weren't fixed." },
      { title: "Title not in the seller's name", detail: "'Title-skipping' curbstoners avoid sales tax and recordable history. Often hides salvage, theft, or fraud." },
      { title: "Strong air freshener masking smell", detail: "Heavy fragrance covers cigarette smoke, mildew, or pet damage — all of which lower resale and signal neglect." },
      { title: "Tires worn unevenly", detail: "Inner-edge wear = bad alignment or worn suspension. Center wear = chronic over-inflation. Outer wear = aggressive driving." },
      { title: "Fresh paint on the engine or undercarriage", detail: "Often hides leak repairs or accident damage. Be skeptical of any 'just detailed' engine bay." },
    ],
    h2DealBreakers: "When to Walk Away — The Deal-Breaker List",
    dealBreakersIntro: "Some findings end the negotiation. If any of these come up, the smart move is to leave without making an offer — there are millions of used cars on the market, you only need one.",
    dealBreakers: [
      "Title is not in the seller's legal name",
      "VIN on title doesn't match dash plate or door jamb sticker",
      "Frame is bent or has aftermarket welds / replacement plates",
      "Mayonnaise residue under the oil cap (head gasket failure)",
      "Mismatched bolts on structural / collision-relevant components",
      "Odometer reading doesn't match the title or service records",
      "Heavy water staining + rust on seat brackets (flood damage)",
    ],
    h2CategoriesPre: "What's Inside the ",
    h2CategoriesSuffix: "-Point Checklist",
    ptsLabel: "pts",
    crossLinks: [
      { href: "/vin-check", label: "Free VIN Check", sub: "Title, accidents, odometer" },
      { href: "/total-cost-of-ownership-calculator", label: "Cost of Ownership", sub: "5-year true cost" },
      { href: "/car-affordability-calculator", label: "Affordability", sub: "What you can afford" },
    ],
    h2Faq: "Frequently Asked Questions",
    faqs: [
      { q: "Can a DIY inspection replace a mechanic's PPI?", a: "It catches 70–80% of bad buys for free. Use the checklist on every car you look at; only pay for a mechanic PPI on your top finalist." },
      { q: "What's the most important thing to check?", a: "Title, VIN, and frame — in that order. Mechanical issues are negotiable; legal and structural issues rarely are." },
      { q: "How long should an inspection take?", a: "Plan on 45–60 minutes including test drive. If a seller rushes you, that's its own red flag." },
      { q: "What is a deal-breaker on a used car?", a: "Title fraud, VIN mismatch, frame welds, head-gasket failure (mayo on oil cap), odometer mismatch, and confirmed flood damage. Walk away in any of these cases." },
      { q: "Can I print or share the report?", a: "Yes. Tap 'Generate Report' to see a print-friendly summary, then 'Print' or 'Copy as Markdown' to share with anyone." },
      { q: "What does each severity mean?", a: "Deal-breaker = walk away. Major = costly fix, negotiate or get mechanic PPI. Minor = cosmetic / routine maintenance. Info = good to know." },
      { q: "Does this work for trucks and SUVs?", a: "Yes — every check applies to passenger cars, SUVs, and trucks. For motorcycles, use our motorcycle VIN check." },
      { q: "Is my progress saved?", a: "Yes. Your answers and vehicle details are stored locally in your browser. Close the tab, come back later, pick up where you left off." },
    ],
    ctaH2: "Don't Buy Without a VIN Check",
    ctaSub: "Even a perfect inspection can't reveal accidents, salvage brands, or odometer rollbacks buried in the title history. A free VIN check takes 60 seconds and pulls the federal NMVTIS record for every report.",
    ctaButton: "Run a Free VIN Check",
    ctaNote1: "Always inspect in daylight",
    ctaNote2: "Never wire money sight-unseen",
  },
  es: {
    home: "Inicio",
    crumb: "Lista de inspección de auto usado",
    h1: "Lista de inspección antes de la compra de auto usado",
    introPre: "Una inspección interactiva gratis de ",
    introMid: " puntos en 8 categorías — exterior, bajo el auto, bajo el cofre, interior, prueba de manejo, documentos, llantas y frenos, y A/C y calefacción. Detecta deal-breakers antes de pagar, y luego genera un reporte imprimible que puedes compartir con tu mecánico o pareja.",
    h2WhyPpi: "Por qué importa una inspección antes de la compra",
    whyPpi1: "La venta promedio de auto usado en EE. UU. lleva $1,400 en problemas no declarados. Los vendedores calientan el motor, borran los códigos del tablero y usan detallado pesado para enmascarar problemas que detectarías en 30 segundos con buena luz. Una inspección DIY de 45 minutos elimina 70-80% de las malas compras sin gastar un centavo.",
    whyPpi2: "El objetivo no es encontrar un auto perfecto — cada auto usado tiene fallas. El objetivo es encontrar fallas que el vendedor no haya declarado, y luego negociar el precio o irte. Usa esta lista de inspección como tu guion.",
    h2DiyVsMech: "DIY vs inspección antes de la compra por mecánico",
    tblAspect: "Aspecto",
    tblDiy: "Lista DIY",
    tblMech: "PPI por mecánico",
    diyRows: [
      ["Costo", "Gratis", "$120-$250"],
      ["Tiempo", "45-60 min", "1-2 horas (más programación)"],
      ["Detecta deal-breakers", "Sí — chasis, título, fluidos, olor", "Sí, más compresión interna"],
      ["Detecta desgaste mecánico", "Algo — cambios, frenos, fugas", "Mayoría — inspección elevada, escáneres"],
      ["Cuándo usar", "Cada auto usado, antes de cualquier depósito", "Candidato final, tras pasar el DIY"],
    ] as const,
    diyAfter: "Usa la lista DIY primero para filtrar las compras malas obvias. Solo paga por un PPI con mecánico en los 1-2 autos finales que estés considerando en serio.",
    h2RedFlags: "Las 10 señales de alerta principales que los compradores pasan por alto",
    topRedFlags: [
      { title: "Residuo de mayonesa bajo la tapa del aceite", detail: "Película cremosa blanco-bronceada = refrigerante en el aceite. Casi siempre falla de empaque de cabeza ($2,500-$6,000)." },
      { title: "Cabezas de tornillos disparejas bajo el cofre", detail: "Tornillos reemplazados en la salpicadera, radiador o soporte central indican reparación de colisión frontal no declarada." },
      { title: "Cordones de soldadura ondulados en el chasis", detail: "Los chasis de fábrica se sueldan por puntos uniformemente. Soldaduras MIG onduladas = reparación estructural por colisión. Aléjate." },
      { title: "Óxido en las hebillas del cinturón o rieles del asiento", detail: "El metal bajo en la cabina no se oxida a menos que el auto haya estado sumergido. Señal clásica de daño por inundación." },
      { title: "Desgaste que no coincide con el kilometraje", detail: "Pedales gastados, volante brillante o asiento del conductor desgastado en un auto de '40 mil millas' = probable rollback de odómetro." },
      { title: "Luces de advertencia persistentes", detail: "Los vendedores a menudo borran los códigos el día antes de la venta. Maneja 10+ minutos; si la luz de CEL o ABS regresa, los códigos no se arreglaron." },
      { title: "Título que no está a nombre del vendedor", detail: "Los curbstoners de 'salto de título' evitan el impuesto a la venta y el historial registrable. A menudo ocultan salvamento, robo o fraude." },
      { title: "Ambientador fuerte enmascarando el olor", detail: "La fragancia pesada cubre humo de cigarro, moho o daño de mascotas — todo lo cual baja la reventa y señala descuido." },
      { title: "Llantas desgastadas de forma despareja", detail: "Desgaste de borde interior = mala alineación o suspensión gastada. Desgaste central = sobreinflado crónico. Desgaste exterior = manejo agresivo." },
      { title: "Pintura fresca en el motor o bajo del auto", detail: "A menudo oculta reparaciones de fugas o daño por accidente. Sé escéptico con cualquier 'recién detallado' bajo el cofre." },
    ],
    h2DealBreakers: "Cuándo alejarte — La lista de deal-breakers",
    dealBreakersIntro: "Algunos hallazgos terminan la negociación. Si aparece cualquiera de estos, lo inteligente es irte sin hacer oferta — hay millones de autos usados en el mercado, solo necesitas uno.",
    dealBreakers: [
      "El título no está a nombre legal del vendedor",
      "El VIN del título no coincide con la placa del tablero ni la calcomanía del marco de puerta",
      "El chasis está doblado o tiene soldaduras de mercado secundario / placas de reemplazo",
      "Residuo de mayonesa bajo la tapa del aceite (falla de empaque de cabeza)",
      "Tornillos disparejos en componentes estructurales / relevantes a colisión",
      "La lectura del odómetro no coincide con el título o los registros de servicio",
      "Manchas pesadas de agua + óxido en las hebillas del asiento (daño por inundación)",
    ],
    h2CategoriesPre: "Qué hay dentro de la lista de ",
    h2CategoriesSuffix: " puntos",
    ptsLabel: "pts",
    crossLinks: [
      { href: "/vin-check", label: "Verificación VIN gratis", sub: "Título, accidentes, odómetro" },
      { href: "/total-cost-of-ownership-calculator", label: "Costo total de propiedad", sub: "Costo real a 5 años" },
      { href: "/car-affordability-calculator", label: "Asequibilidad", sub: "Lo que puedes pagar" },
    ],
    h2Faq: "Preguntas frecuentes",
    faqs: [
      { q: "¿Una inspección DIY puede reemplazar la PPI de un mecánico?", a: "Detecta el 70-80% de las malas compras gratis. Usa la lista de inspección en cada auto que veas; solo paga por un PPI con mecánico en tu finalista." },
      { q: "¿Qué es lo más importante que revisar?", a: "Título, VIN y chasis — en ese orden. Los problemas mecánicos son negociables; los problemas legales y estructurales rara vez lo son." },
      { q: "¿Cuánto debe durar una inspección?", a: "Planea 45-60 minutos incluyendo prueba de manejo. Si un vendedor te apura, eso es su propia señal de alerta." },
      { q: "¿Qué es un deal-breaker en un auto usado?", a: "Fraude de título, VIN no coincide, soldaduras en el chasis, falla de empaque de cabeza (mayonesa en la tapa del aceite), odómetro no coincide y daño por inundación confirmado. Aléjate en cualquiera de estos casos." },
      { q: "¿Puedo imprimir o compartir el reporte?", a: "Sí. Toca 'Generar reporte' para ver un resumen apto para imprimir, luego 'Imprimir' o 'Copiar como Markdown' para compartirlo con cualquiera." },
      { q: "¿Qué significa cada severidad?", a: "Deal-breaker = aléjate. Mayor = arreglo costoso, negocia o consigue PPI con mecánico. Menor = cosmético / mantenimiento de rutina. Info = bueno saberlo." },
      { q: "¿Funciona para camionetas y SUVs?", a: "Sí — cada revisión aplica a autos de pasajeros, SUVs y camionetas. Para motocicletas, usa nuestra verificación VIN de motos." },
      { q: "¿Se guarda mi progreso?", a: "Sí. Tus respuestas y los detalles del vehículo se guardan localmente en tu navegador. Cierra la pestaña, regresa después, retoma donde dejaste." },
    ],
    ctaH2: "No compres sin una verificación VIN",
    ctaSub: "Incluso una inspección perfecta no puede revelar accidentes, marcas de salvamento o rollbacks de odómetro enterrados en el historial del título. Una verificación VIN gratis toma 60 segundos y extrae el registro federal NMVTIS para cada reporte.",
    ctaButton: "Hacer una verificación VIN gratis",
    ctaNote1: "Siempre inspecciona con luz de día",
    ctaNote2: "Nunca transfieras dinero sin ver el auto",
  },
  fr: {
    home: "Accueil",
    crumb: "Liste d'inspection de voiture d'occasion",
    h1: "Liste d'inspection avant achat de voiture d'occasion",
    introPre: "Une inspection interactive gratuite de ",
    introMid: " points en 8 catégories — extérieur, dessous, compartiment moteur, intérieur, essai routier, documents, pneus et freins, et HVAC. Repère les deal-breakers avant de payer, puis génère un rapport imprimable que tu peux partager avec ton mécanicien ou ton partenaire.",
    h2WhyPpi: "Pourquoi une inspection avant achat est importante",
    whyPpi1: "La vente moyenne de voiture d'occasion aux États-Unis comporte 1 400 USD de problèmes non divulgués. Les vendeurs chauffent le moteur, effacent les codes du tableau de bord et utilisent un détaillage poussé pour masquer les problèmes que tu repérerais en 30 secondes sous une bonne lumière. Une inspection DIY de 45 minutes élimine 70 à 80% des mauvais achats sans dépenser un sou.",
    whyPpi2: "Le but n'est pas de trouver une voiture parfaite — chaque voiture d'occasion a des défauts. Le but est de trouver des défauts que le vendeur n'a pas divulgués, puis soit de négocier le prix soit de partir. Utilise cette liste d'inspection comme ton script.",
    h2DiyVsMech: "Inspection DIY vs inspection avant achat par mécanicien",
    tblAspect: "Aspect",
    tblDiy: "Liste DIY",
    tblMech: "PPI par mécanicien",
    diyRows: [
      ["Coût", "Gratuit", "120 à 250 USD"],
      ["Temps", "45 à 60 min", "1 à 2 heures (plus la prise de rendez-vous)"],
      ["Détecte les deal-breakers", "Oui — châssis, titre, fluides, odeur", "Oui, plus la compression interne"],
      ["Détecte l'usure mécanique", "Quelques-uns — changements, freins, fuites", "La plupart — inspection sur pont, outils de scan"],
      ["Quand utiliser", "Chaque voiture d'occasion, avant tout dépôt", "Candidat final, après réussite du DIY"],
    ] as const,
    diyAfter: "Utilise d'abord la liste DIY pour filtrer les mauvais achats évidents. Ne paie pour une PPI mécanicien que sur les 1 à 2 voitures finales que tu considères sérieusement.",
    h2RedFlags: "Top 10 des signaux d'alerte que les acheteurs manquent",
    topRedFlags: [
      { title: "Résidu de mayonnaise sous le bouchon d'huile", detail: "Film crémeux blanc-beige = liquide de refroidissement dans l'huile. Presque toujours une défaillance du joint de culasse (2 500 à 6 000 USD)." },
      { title: "Têtes de boulons dépareillées dans le compartiment moteur", detail: "Boulons remplacés sur l'aile, le radiateur ou le support central indiquent une réparation de collision avant non divulguée." },
      { title: "Cordons de soudure ondulés sur le châssis", detail: "Les châssis d'usine sont soudés par points uniformément. Soudures MIG ondulées = réparation structurelle de collision. Pars." },
      { title: "Rouille sur les supports de ceinture de sécurité ou les rails de siège", detail: "Le matériel métallique bas dans l'habitacle ne rouille pas à moins que la voiture n'ait été submergée. Signal classique de dommages par inondation." },
      { title: "Usure qui ne correspond pas au kilométrage", detail: "Pédales usées, volant brillant, ou siège conducteur élimé sur une voiture de '40k miles' = probable recul du compteur kilométrique." },
      { title: "Voyants d'avertissement persistants", detail: "Les vendeurs effacent souvent les codes la veille de la vente. Conduis 10+ minutes ; si le CEL ou ABS revient, les codes n'ont pas été réparés." },
      { title: "Titre pas au nom du vendeur", detail: "Les curbstoners qui pratiquent le 'title-skipping' évitent la taxe de vente et l'historique enregistrable. Cela cache souvent salvage, vol ou fraude." },
      { title: "Désodorisant fort masquant l'odeur", detail: "Le parfum lourd couvre la fumée de cigarette, la moisissure ou les dommages d'animaux — tout cela diminue la revente et signale la négligence." },
      { title: "Pneus usés de manière inégale", detail: "Usure du bord intérieur = mauvais alignement ou suspension usée. Usure centrale = sur-gonflage chronique. Usure extérieure = conduite agressive." },
      { title: "Peinture fraîche sur le moteur ou le dessous de caisse", detail: "Cache souvent des réparations de fuites ou des dommages d'accident. Sois sceptique de tout compartiment moteur 'fraîchement détaillé'." },
    ],
    h2DealBreakers: "Quand partir — La liste des deal-breakers",
    dealBreakersIntro: "Certaines découvertes mettent fin à la négociation. Si l'une de celles-ci apparaît, le mouvement intelligent est de partir sans faire d'offre — il y a des millions de voitures d'occasion sur le marché, tu n'en as besoin que d'une.",
    dealBreakers: [
      "Le titre n'est pas au nom légal du vendeur",
      "Le VIN sur le titre ne correspond pas à la plaque du tableau de bord ou à l'autocollant du montant de porte",
      "Le châssis est tordu ou a des soudures aftermarket / plaques de remplacement",
      "Résidu de mayonnaise sous le bouchon d'huile (défaillance du joint de culasse)",
      "Boulons dépareillés sur les composants structurels / pertinents pour les collisions",
      "La lecture du compteur kilométrique ne correspond pas au titre ou aux registres de service",
      "Lourdes taches d'eau + rouille sur les supports de siège (dommages d'inondation)",
    ],
    h2CategoriesPre: "Ce qui se trouve dans la liste de ",
    h2CategoriesSuffix: " points",
    ptsLabel: "pts",
    crossLinks: [
      { href: "/vin-check", label: "Vérification VIN gratuite", sub: "Titre, accidents, compteur kilométrique" },
      { href: "/total-cost-of-ownership-calculator", label: "Coût total de propriété", sub: "Coût réel sur 5 ans" },
      { href: "/car-affordability-calculator", label: "Accessibilité", sub: "Ce que tu peux te permettre" },
    ],
    h2Faq: "Questions fréquemment posées",
    faqs: [
      { q: "Une inspection DIY peut-elle remplacer la PPI d'un mécanicien ?", a: "Elle détecte 70 à 80% des mauvais achats gratuitement. Utilise la liste d'inspection sur chaque voiture que tu regardes ; ne paie pour une PPI mécanicien que sur ton finaliste." },
      { q: "Quelle est la chose la plus importante à vérifier ?", a: "Titre, VIN et châssis — dans cet ordre. Les problèmes mécaniques sont négociables ; les problèmes juridiques et structurels le sont rarement." },
      { q: "Combien de temps doit durer une inspection ?", a: "Prévois 45 à 60 minutes incluant l'essai routier. Si un vendeur te presse, c'est son propre signal d'alerte." },
      { q: "Qu'est-ce qu'un deal-breaker sur une voiture d'occasion ?", a: "Fraude de titre, VIN ne correspondant pas, soudures de châssis, défaillance du joint de culasse (mayo sur le bouchon d'huile), compteur kilométrique ne correspondant pas, et dommages d'inondation confirmés. Pars dans tous ces cas." },
      { q: "Puis-je imprimer ou partager le rapport ?", a: "Oui. Tape 'Générer le rapport' pour voir un résumé adapté à l'impression, puis 'Imprimer' ou 'Copier en Markdown' pour partager avec qui que ce soit." },
      { q: "Que signifie chaque sévérité ?", a: "Deal-breaker = pars. Majeur = réparation coûteuse, négocie ou obtiens une PPI mécanicien. Mineur = cosmétique / entretien de routine. Info = bon à savoir." },
      { q: "Cela fonctionne-t-il pour les camions et SUV ?", a: "Oui — chaque vérification s'applique aux voitures de tourisme, SUV et camions. Pour les motocyclettes, utilise notre vérification VIN moto." },
      { q: "Mon progrès est-il sauvegardé ?", a: "Oui. Tes réponses et les détails du véhicule sont stockés localement dans ton navigateur. Ferme l'onglet, reviens plus tard, reprends là où tu t'es arrêté." },
    ],
    ctaH2: "N'achète pas sans vérification VIN",
    ctaSub: "Même une inspection parfaite ne peut pas révéler les accidents, les marques salvage ou les reculs de compteur kilométrique enfouis dans l'historique du titre. Une vérification VIN gratuite prend 60 secondes et extrait le registre fédéral NMVTIS pour chaque rapport.",
    ctaButton: "Exécuter une vérification VIN gratuite",
    ctaNote1: "Inspecte toujours à la lumière du jour",
    ctaNote2: "Ne transfère jamais d'argent sans voir la voiture",
  },
} as const;

interface Props { locale: Locale; }

export default function UsedCarInspectionChecklistBody({ locale }: Props) {
  const c = COPY[locale];
  const link = (en: string) => (locale === "es" ? `/es${en}` : en);

  return (
    <>
      <main className="pt-28 pb-16 print:pt-0">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="print:hidden">
            <Breadcrumbs
              items={[
                { label: c.home, href: locale === "es" ? "/es" : "/" },
                { label: c.crumb },
              ]}
            />
          </div>

          <h1 className="mt-6 text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
            {c.h1}
          </h1>
          <p className="mt-4 text-lg text-slate-700 leading-relaxed">
            {c.introPre}{TOTAL_ITEMS}{c.introMid}
          </p>

          {/* ── VIN Check CTA (top) ── */}
          <div className="mt-8 print:hidden">
            <VinCheckBanner variant="card" />
          </div>

          {/* ── Interactive checklist ── */}
          <div className="mt-10">
            <InspectionChecklist locale={locale} />
          </div>

          {/* ── Why a PPI matters ── */}
          <section id="why-ppi" className="mt-16 print:hidden">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{c.h2WhyPpi}</h2>
            <p className="text-slate-700 leading-relaxed mb-4">{c.whyPpi1}</p>
            <p className="text-slate-700 leading-relaxed">{c.whyPpi2}</p>
          </section>

          {/* ── DIY vs Mechanic ── */}
          <section id="diy-vs-mechanic" className="mt-12 print:hidden">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{c.h2DiyVsMech}</h2>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="text-left px-4 py-3 font-medium">{c.tblAspect}</th>
                    <th className="text-left px-4 py-3 font-medium">{c.tblDiy}</th>
                    <th className="text-left px-4 py-3 font-medium">{c.tblMech}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {c.diyRows.map(([aspect, diy, mech]) => (
                    <tr key={aspect} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-medium text-slate-800">{aspect}</td>
                      <td className="px-4 py-3 text-slate-700">{diy}</td>
                      <td className="px-4 py-3 text-slate-700">{mech}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed">{c.diyAfter}</p>
          </section>

          {/* ── Top 10 Red Flags ── */}
          <section id="red-flags" className="mt-12 print:hidden">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{c.h2RedFlags}</h2>
            <ul className="space-y-3">
              {c.topRedFlags.map(({ title, detail }) => (
                <li key={title} className="flex gap-3 items-start">
                  <Eye className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">
                    <strong className="text-slate-900">{title}</strong> — {detail}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* ── Mid-page banner ── */}
          <div className="mt-12 print:hidden">
            <VinCheckBanner />
          </div>

          {/* ── Walk Away List ── */}
          <section id="deal-breakers" className="mt-12 print:hidden">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{c.h2DealBreakers}</h2>
            <p className="text-slate-700 leading-relaxed mb-5">{c.dealBreakersIntro}</p>
            <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
              <ul className="space-y-2.5">
                {c.dealBreakers.map((d) => (
                  <li key={d} className="flex gap-3 items-start text-sm text-red-900">
                    <ShieldAlert className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* ── Inspection categories overview ── */}
          <section id="categories" className="mt-12 print:hidden">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              {c.h2CategoriesPre}{TOTAL_ITEMS}{c.h2CategoriesSuffix}
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {inspectionChecklist.map((sec) => {
                const t = SECTION_TRANSLATIONS[locale][sec.id] ?? { title: sec.title, description: sec.description };
                return (
                  <div key={sec.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                    <div className="flex items-center gap-2 mb-1.5">
                      <ClipboardList className="w-4 h-4 text-primary-600" />
                      <p className="font-bold text-slate-900 text-sm">{t.title}</p>
                      <span className="ml-auto text-xs text-slate-500 font-mono">
                        {sec.items.length} {c.ptsLabel}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{t.description}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ── Cross-links ── */}
          <div className="mt-12 grid sm:grid-cols-3 gap-3 print:hidden">
            {c.crossLinks.map(({ href, label, sub }) => (
              <Link
                key={href}
                href={link(href)}
                className="flex items-center justify-between gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <div>
                  <p className="font-bold text-slate-900 text-sm">{label}</p>
                  <p className="text-xs text-slate-600 mt-0.5">{sub}</p>
                </div>
                <span className="text-slate-500 font-bold text-xs flex-shrink-0">→</span>
              </Link>
            ))}
          </div>

          {/* ── FAQ ── */}
          <section id="faq" className="mt-14 print:hidden">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">{c.h2Faq}</h2>
            <dl className="space-y-6">
              {c.faqs.map(({ q, a }) => (
                <div key={q}>
                  <dt className="font-bold text-slate-900">{q}</dt>
                  <dd className="mt-1.5 text-slate-600 leading-relaxed">{a}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* ── Related ── */}
          <div className="mt-14 print:hidden">
            <RelatedChecks exclude="/used-car-inspection-checklist" />
          </div>
        </div>
      </main>

      {/* ── Bottom CTA ── */}
      <section className="py-14 bg-slate-50 border-t border-slate-200 print:hidden">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">{c.ctaH2}</h2>
          <p className="text-slate-600 mb-6">{c.ctaSub}</p>
          <Link
            href={link("/vin-check")}
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl transition-colors"
          >
            <CheckCircle2 className="w-5 h-5" />
            {c.ctaButton}
          </Link>
          <div className="mt-6 flex items-center justify-center gap-4 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
              {c.ctaNote1}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <XCircle className="w-3.5 h-3.5 text-red-500" />
              {c.ctaNote2}
            </span>
          </div>
        </div>
      </section>
    </>
  );
}

/* ── Section title/description translations (keyed by section id) ── */
// Pre-emptively widened to include fr; the Locale union still excludes "fr"
// today but the dictionary is ready for the moment it widens.
const SECTION_TRANSLATIONS: Record<Locale | "fr", Record<string, { title: string; description: string }>> = {
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
  fr: {
    exterior: { title: "Tour extérieur", description: "Carrosserie, peinture, vitres et pneus. Cherche les signes de réparation d'accident, les panneaux dépareillés et les dommages climatiques sous une bonne lumière du jour." },
    underneath: { title: "Sous le véhicule", description: "Le châssis, l'échappement et la suspension racontent la vérité sur la vie d'une voiture. Apporte une lampe de poche et ne saute pas cette section." },
    "engine-bay": { title: "Compartiment moteur", description: "Ouvre le capot avec le moteur froid. Beaucoup des pires problèmes sont visibles sans jamais tourner une clé." },
    interior: { title: "Intérieur", description: "Les motifs d'usure, les odeurs et l'électronique révèlent la vraie histoire du véhicule — parfois plus que le vendeur ne le fait." },
    "test-drive": { title: "Essai routier", description: "Conduis au moins 20 minutes incluant les arrêts et démarrages et les vitesses d'autoroute. Démarre toi-même le moteur à froid si possible." },
    documents: { title: "Documents", description: "Les papiers sont là où la fraude se cache habituellement. Vérifie chaque document avant qu'aucun argent ne change de mains." },
    "tires-brakes": { title: "Pneus et freins", description: "Ce sont les choses les moins chères à vérifier et les plus coûteuses à remplacer si tu te trompes." },
    "hvac-electronics": { title: "HVAC et électronique", description: "Les gremlins électriques sont la surprise la plus courante de 'je ne savais pas'. Teste chaque interrupteur, lumière et accessoire." },
  },
};

const FAQS_EN = [
  { question: "Can a DIY inspection replace a mechanic's pre-purchase inspection?", answer: "A DIY checklist filters out 70–80% of bad buys before you pay $150–$250 for a mechanic's PPI. We recommend using this checklist first — if any deal-breakers come up, walk away. If everything looks good, only then pay for a mechanic to inspect mechanical systems you can't see (compression, scan-tool diagnostics, suspension lift inspection)." },
  { question: "What is the most important thing to check on a used car?", answer: "The title, VIN, and frame — in that order. A mismatched VIN or salvage title can make the car worthless or unsellable. A bent or welded frame compromises safety. Mechanical problems are negotiable; structural and legal problems usually aren't." },
  { question: "How long should a pre-purchase inspection take?", answer: "Plan on 45–60 minutes total: 20 minutes walking the vehicle and looking at fluids, 20 minutes test driving, and 10 minutes verifying documents and recalls. Don't let a seller rush you — that's a red flag in itself." },
  { question: "What are deal-breakers on a used car?", answer: "Walk away from a vehicle with: title not in the seller's name, VIN mismatch between title and vehicle, undisclosed salvage or flood title, mayonnaise on the oil cap (head gasket failure), aftermarket frame welds (collision repair), or odometer mismatch with service records." },
  { question: "Can I print this checklist?", answer: "Yes. Fill out the inspection on your phone or laptop, then tap 'Generate Report' and 'Print'. You can also copy a markdown version to text or email to your mechanic, partner, or financing source." },
  { question: "What MPG, mileage, or price should I expect on a used car?", answer: "There's no single answer — but our companion calculators help: try the gas mileage calculator, total cost of ownership calculator, and car affordability calculator. Always pull a free VIN history check before paying any deposit." },
  { question: "What does each severity mean?", answer: "'Deal-breaker' = walk away (frame welds, title fraud, head gasket failure). 'Major' = expensive repair or hidden problem; negotiate hard or get a mechanic PPI. 'Minor' = cosmetic or routine maintenance; use as price leverage. 'Info' = good to know, rarely changes the deal." },
  { question: "Does the checklist work for trucks, SUVs, and motorcycles?", answer: "Most checks apply to all 4-wheel passenger vehicles. For motorcycles, use our motorcycle VIN check tool — frame, suspension, and chain inspection points differ enough that a dedicated checklist works better." },
];

const FAQS_ES = [
  { question: "¿Una inspección DIY puede reemplazar la inspección antes de la compra de un mecánico?", answer: "Una lista de inspección DIY filtra el 70-80% de las malas compras antes de que pagues $150-$250 por una PPI con mecánico. Recomendamos usar esta lista primero — si aparece algún deal-breaker, aléjate. Si todo se ve bien, solo entonces paga por un mecánico para inspeccionar los sistemas mecánicos que no puedes ver (compresión, diagnóstico con escáner, inspección de suspensión en elevador)." },
  { question: "¿Qué es lo más importante que revisar en un auto usado?", answer: "El título, el VIN y el chasis — en ese orden. Un VIN que no coincide o un título de salvamento pueden hacer que el auto sea sin valor o invendible. Un chasis doblado o soldado compromete la seguridad. Los problemas mecánicos son negociables; los problemas estructurales y legales usualmente no." },
  { question: "¿Cuánto debe durar una inspección antes de la compra?", answer: "Planea 45-60 minutos en total: 20 minutos recorriendo el vehículo y viendo fluidos, 20 minutos en prueba de manejo, y 10 minutos verificando documentos y recalls. No dejes que un vendedor te apure — eso es una señal de alerta en sí misma." },
  { question: "¿Cuáles son los deal-breakers en un auto usado?", answer: "Aléjate de un vehículo con: título que no está a nombre del vendedor, VIN no coincide entre título y vehículo, título de salvamento o inundación no declarado, mayonesa en la tapa del aceite (falla de empaque de cabeza), soldaduras de mercado secundario en el chasis (reparación por colisión), u odómetro que no coincide con los registros de servicio." },
  { question: "¿Puedo imprimir esta lista de inspección?", answer: "Sí. Llena la inspección en tu teléfono o laptop, luego toca 'Generar reporte' e 'Imprimir'. También puedes copiar una versión en markdown para enviarla por mensaje o correo a tu mecánico, pareja o fuente de financiamiento." },
  { question: "¿Qué MPG, kilometraje o precio debo esperar en un auto usado?", answer: "No hay una sola respuesta — pero nuestras calculadoras complementarias ayudan: prueba la calculadora de consumo de gasolina, calculadora de costo total de propiedad y calculadora de asequibilidad de auto. Siempre haz una verificación de historial VIN gratis antes de pagar cualquier depósito." },
  { question: "¿Qué significa cada severidad?", answer: "'Deal-breaker' = aléjate (soldaduras de chasis, fraude de título, falla de empaque de cabeza). 'Mayor' = reparación costosa o problema oculto; negocia fuerte o consigue PPI con mecánico. 'Menor' = cosmético o mantenimiento de rutina; úsalo como palanca de precio. 'Info' = bueno saberlo, rara vez cambia el trato." },
  { question: "¿La lista funciona para camionetas, SUVs y motocicletas?", answer: "La mayoría de las revisiones aplican a todos los vehículos de pasajeros de 4 ruedas. Para motocicletas, usa nuestra herramienta de verificación VIN de motocicletas — los puntos de inspección del chasis, suspensión y cadena difieren lo suficiente como para que una lista dedicada funcione mejor." },
];

const FAQS_FR = [
  { question: "Une inspection DIY peut-elle remplacer l'inspection avant achat d'un m\u00e9canicien ?", answer: "Une liste DIY filtre 70 \u00e0 80\u00a0% des mauvais achats avant que tu paies 150-250\u00a0$ pour une PPI chez un m\u00e9canicien. Utilise cette liste d'abord \u2014 si un facteur r\u00e9dhibitoire appara\u00eet, va-t'en. Si tout semble bien, paie alors un m\u00e9canicien pour inspecter les syst\u00e8mes m\u00e9caniques que tu ne peux pas voir (compression, diagnostic au scanner, inspection de suspension sur \u00e9l\u00e9vateur)." },
  { question: "Quelle est la chose la plus importante \u00e0 v\u00e9rifier sur une voiture d'occasion ?", answer: "Le titre, le VIN et le ch\u00e2ssis \u2014 dans cet ordre. Un VIN non concordant ou un titre salvage peut rendre la voiture sans valeur ou invendable. Un ch\u00e2ssis tordu ou soud\u00e9 compromet la s\u00e9curit\u00e9. Les probl\u00e8mes m\u00e9caniques sont n\u00e9gociables\u00a0; les probl\u00e8mes structurels et l\u00e9gaux ne le sont g\u00e9n\u00e9ralement pas." },
  { question: "Combien de temps doit durer une inspection avant achat ?", answer: "Pr\u00e9vois 45-60 minutes au total\u00a0: 20 minutes \u00e0 inspecter le v\u00e9hicule et les fluides, 20 minutes d'essai routier, 10 minutes \u00e0 v\u00e9rifier les documents et rappels. Ne laisse pas un vendeur te bousculer \u2014 c'est un drapeau rouge en soi." },
  { question: "Quels sont les facteurs r\u00e9dhibitoires sur une voiture d'occasion ?", answer: "Va-t'en pour un v\u00e9hicule avec\u00a0: titre pas au nom du vendeur, VIN qui ne correspond pas entre titre et v\u00e9hicule, titre salvage ou inondation non d\u00e9clar\u00e9, mayonnaise sur le bouchon d'huile (panne de joint de culasse), soudures de ch\u00e2ssis apr\u00e8s-march\u00e9 (r\u00e9paration de collision), ou kilom\u00e9trage qui ne concorde pas avec les dossiers d'entretien." },
  { question: "Puis-je imprimer cette liste ?", answer: "Oui. Remplis l'inspection sur ton t\u00e9l\u00e9phone ou ordinateur, puis tape \u00ab\u00a0G\u00e9n\u00e9rer le rapport\u00a0\u00bb et \u00ab\u00a0Imprimer\u00a0\u00bb. Tu peux aussi copier une version Markdown pour l'envoyer par message ou courriel \u00e0 ton m\u00e9canicien, partenaire ou source de financement." },
  { question: "Quel MPG, kilom\u00e9trage ou prix dois-je attendre sur une voiture d'occasion ?", answer: "Il n'y a pas de r\u00e9ponse unique \u2014 mais nos calculateurs compl\u00e9mentaires aident\u00a0: essaie le calculateur de consommation, le calculateur de co\u00fbt total de propri\u00e9t\u00e9 et le calculateur d'abordabilit\u00e9 auto. Fais toujours une v\u00e9rification d'historique VIN gratuite avant de verser tout acompte." },
  { question: "Que signifie chaque s\u00e9v\u00e9rit\u00e9 ?", answer: "\u00ab\u00a0Facteur r\u00e9dhibitoire\u00a0\u00bb = va-t'en (soudures de ch\u00e2ssis, fraude au titre, panne de joint de culasse). \u00ab\u00a0Majeur\u00a0\u00bb = r\u00e9paration co\u00fbteuse ou probl\u00e8me cach\u00e9\u00a0; n\u00e9gocie ferme ou obtiens une PPI. \u00ab\u00a0Mineur\u00a0\u00bb = cosm\u00e9tique ou entretien de routine\u00a0; utilise-le comme levier de prix. \u00ab\u00a0Info\u00a0\u00bb = bon \u00e0 savoir, change rarement la donne." },
  { question: "La liste fonctionne-t-elle pour camions, SUV et motos ?", answer: "La plupart des v\u00e9rifications s'appliquent \u00e0 tous les v\u00e9hicules de tourisme \u00e0 4 roues. Pour les motos, utilise notre outil de v\u00e9rification VIN moto \u2014 le ch\u00e2ssis, la suspension et l'inspection de la cha\u00eene diff\u00e8rent suffisamment pour qu'une liste d\u00e9di\u00e9e fonctionne mieux." },
];

export { FAQS_EN, FAQS_ES, FAQS_FR };
