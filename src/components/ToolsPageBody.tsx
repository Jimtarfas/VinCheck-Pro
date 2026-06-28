/**
 * Shared body for /tools and /es/herramientas.
 * Wave 16c — identical JSX, locale-driven copy.
 */

import Link from "next/link";
import {
  Wrench,
  Search,
  BookOpen,
  MapPin,
  FileText,
  ShieldAlert,
  AlertTriangle,
  Gauge,
  Code,
  Copy,
  Hash,
  TrendingDown,
  Anchor,
  Truck,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import type { Locale } from "@/i18n/config";

const TOOL_ICONS = [
  Search, Wrench, Hash, BookOpen, MapPin, FileText,
  ShieldAlert, AlertTriangle, Gauge, TrendingDown, Anchor, Truck, MapPin,
] as const;

const COPY = {
  en: {
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Free Tools",
    badgeFreeForever: "Free Forever",
    h1: "Free Vehicle Tools",
    heroLead:
      "A complete toolkit for buyers, sellers, fleet managers, and journalists — every tool below is genuinely free, requires no signup, and is powered by the same NMVTIS, NICB, and OEM data that fuels our paid reports.",
    leadParagraph:
      "We built CarCheckerVIN because the data buyers need to make a smart used-car decision should not be locked behind a thirty-dollar paywall. The thirteen tools below cover the most common questions we hear every day: who built this car, has it been stolen, does it have a clean title, has the odometer been rolled back, and what does the law in my state say about title brands. Use them on your next purchase, link to them from your blog, or embed our decoder directly into your own site.",
    allToolsHeading: "All Free Tools",
    allToolsIntro: "Thirteen tools, zero accounts required. Click any card to jump straight into the tool.",
    embedBadge: "For Publishers",
    embedHeading: "Embed Our VIN Decoder",
    embedIntro:
      "Run a car blog, a buyer-education site, or a community forum where readers ask about VINs? Drop our free decoder right onto the page. One iframe tag, no API keys, no tracking pixels.",
    embedCodeLabel: "Embed Code",
    embedPasteHintPre: "Paste anywhere HTML is allowed. Resize",
    embedPasteHintAnd: "and",
    embedPasteHintSuffix: "to fit your layout.",
    livePreviewLabel: "Live Preview",
    whyHeading: "Why Other Sites Embed Our Tools",
    whyP1Lead: "It is genuinely free, with no signup.",
    whyP1:
      "Most VIN tools you find on search results page either funnel readers into a paid lead form or gate the basic decode behind a credit card capture. Our embed is designed for the opposite outcome: your reader pastes a VIN, sees the decoded year/make/model in seconds, and stays on your page. There is no upsell modal, no popup, no email capture.",
    whyP2Lead: "The data is NMVTIS-backed and OEM-verified.",
    whyP2:
      "The decoder pulls from the same federally mandated National Motor Vehicle Title Information System feed and the same manufacturer APIs that power our paid history reports. That means readers get authoritative results — not a regex-matched guess from a 200-line JavaScript snippet. For publishers that care about credibility (auto blogs, journalism outlets, dealer education sites), the difference is meaningful.",
    whyP3LeadPre: "You get a branded link back to",
    whyP3LeadLink: "carcheckervin.com",
    whyP3LeadSuffix: ".",
    whyP3:
      'Every embed includes a small "Powered by CarCheckerVIN" link below the form. That is our only ask in exchange for the free tool. We do not require nofollow, we do not require dofollow — we simply require that the credit link stays visible. If you write about used-car buying, fraud detection, or vehicle research, our team will gladly review your post and consider featuring it in our research hub.',
    faqHeading: "Free Tools FAQ",
    faqIntro: "The most common questions about our free VIN decoder, calculators, and lookup tools.",
    ctaHeading: "Try the Decoder Right Now",
    ctaBody: "Paste any 17-character VIN below. Free decode, no signup, instant results.",
    ctaFooterPre: "Need wholesale access for a dealership? See our",
    ctaFooterLink: "dealer pricing",
    ctaFooterSuffix: ".",
    tools: [
      { title: "VIN Decoder", description: "Instantly decode any 17-character VIN to year, make, model, trim, engine, transmission, plant code, and country of origin. Free and unlimited.", cta: "Decode a VIN" },
      { title: "VIN Check by Make", description: "Browse make-specific VIN check pages with model-year coverage notes, common issues, and recall guidance for 40+ manufacturers.", cta: "Browse Makes" },
      { title: "Chassis Number Lookup", description: "A chassis number is the same as a VIN. Decode any 17-character chassis number to find the car type, make, model, year, and engine — works worldwide.", cta: "Decode a Chassis No." },
      { title: "VIN Glossary", description: "Plain-English definitions for every VIN-related term: WMI, VDS, VIS, check digit, title brand, NMVTIS, salvage, junk, rebuilt, and more.", cta: "Open Glossary" },
      { title: "State VIN Check", description: "State-by-state lookup pages covering DMV title rules, salvage thresholds, branding laws, and known title-washing routes for all 50 states.", cta: "Pick a State" },
      { title: "Vehicle History Report", description: "Pull a full vehicle history report with title brands, accident records, odometer history, theft data, recalls, and market valuation.", cta: "Run a Report" },
      { title: "Stolen Vehicle Lookup", description: "Cross-reference a VIN against the National Insurance Crime Bureau (NICB) database before you hand over money to a private seller.", cta: "Check Theft Status" },
      { title: "Salvage Title Check", description: "See if a vehicle has ever carried a salvage, junk, rebuilt, or flood title in any of the 50 states or U.S. territories.", cta: "Check Salvage" },
      { title: "Odometer Verification", description: "Spot odometer rollback by comparing reported mileage across DMV title transfers, inspection records, and service history snapshots.", cta: "Verify Mileage" },
      { title: "Diminished Value Calculator", description: "Estimate the value your car lost after an accident. Runs the insurer 17c formula and the real market-loss range — claim-ready, no signup.", cta: "Calculate Value Loss" },
      { title: "HIN Lookup (Boat VIN)", description: "A boat's VIN is its 12-character Hull Identification Number. Decode the HIN to the builder code, hull serial, and build date instantly.", cta: "Decode a HIN" },
      { title: "Semi Truck VIN Lookup", description: "Decode any Freightliner, Peterbilt, Kenworth, Volvo or Mack tractor — plus semi trailers — to the make, model year, engine, and GVWR class.", cta: "Decode a Truck VIN" },
      { title: "Golf Cart VIN Lookup", description: "Golf carts use a serial number, not a road VIN. Decode a Club Car serial for the model year instantly, with E-Z-GO and Yamaha brand guides.", cta: "Decode a Cart Serial" },
    ],
    faqs: [
      { q: "Are these vehicle tools really free?", a: "Yes. Every tool on this hub is genuinely free, requires no signup, and is powered by the same NMVTIS, NICB, and OEM data that fuels our paid reports. There is no upsell modal, no popup, and no email capture required to use them." },
      { q: "Do I need an account to use the tools?", a: "No. All of the tools work without an account — there are zero accounts required. Click any tool card to jump straight into the tool and start researching a vehicle." },
      { q: "What does the VIN decoder show?", a: "The VIN decoder instantly decodes any 17-character VIN to its year, make, model, trim, engine, transmission, plant code, and country of origin. It is free and unlimited, with no signup required." },
      { q: "What tools are included in this hub?", a: "The hub bundles thirteen free tools: a VIN decoder, VIN check by make, chassis number lookup, a VIN glossary, a state-by-state VIN check, a full vehicle history report, a stolen vehicle lookup (NICB cross-reference), a salvage title check, odometer verification, a diminished value calculator, a HIN lookup for boats, a semi truck VIN lookup, and a golf cart VIN lookup." },
      { q: "How does the diminished value calculator work?", a: "The diminished value calculator estimates the value your car lost after an accident. It runs the insurer 17c formula alongside the real market-loss range, giving you a claim-ready estimate with no signup." },
      { q: "Is the data behind these tools trustworthy?", a: "Yes. The tools draw on the same federally mandated National Motor Vehicle Title Information System (NMVTIS) feed, NICB theft data, and manufacturer APIs that power our paid history reports — so readers get authoritative results rather than a regex-matched guess from a short JavaScript snippet." },
      { q: "Can I embed the VIN decoder on my own website?", a: "Yes. You can drop our free VIN decoder onto your page with a single iframe tag — no API keys and no tracking pixels. Paste the embed code anywhere HTML is allowed and resize the width and height to fit your layout. Each embed includes a small \"Powered by CarCheckerVIN\" credit link below the form, which is our only ask in exchange for the free tool." },
      { q: "Can I check whether a vehicle is stolen or has a salvage title?", a: "Yes. The stolen vehicle lookup cross-references a VIN against the National Insurance Crime Bureau (NICB) database, and the salvage title check shows whether a vehicle has ever carried a salvage, junk, rebuilt, or flood title in any of the 50 states or U.S. territories." },
    ],
  },
  es: {
    breadcrumbHome: "Inicio",
    breadcrumbCurrent: "Herramientas Gratis",
    badgeFreeForever: "Gratis para siempre",
    h1: "Herramientas vehiculares gratis",
    heroLead:
      "Un kit completo para compradores, vendedores, administradores de flotas y periodistas — cada herramienta a continuación es genuinamente gratis, no requiere registro, y está alimentada por los mismos datos NMVTIS, NICB y OEM que alimentan nuestros reportes pagados.",
    leadParagraph:
      "Construimos CarCheckerVIN porque los datos que los compradores necesitan para tomar una decisión inteligente sobre un auto usado no deberían estar bloqueados detrás de un paywall de treinta dólares. Las trece herramientas a continuación cubren las preguntas más comunes que escuchamos cada día: quién construyó este auto, ha sido robado, tiene un título limpio, se ha retrocedido el odómetro, y qué dice la ley en mi estado sobre marcas de título. Úsalas en tu próxima compra, enlázalas desde tu blog, o incrusta nuestro decodificador directamente en tu propio sitio.",
    allToolsHeading: "Todas las herramientas gratis",
    allToolsIntro: "Trece herramientas, cero cuentas requeridas. Haz clic en cualquier tarjeta para ir directo a la herramienta.",
    embedBadge: "Para editores",
    embedHeading: "Incrusta nuestro decodificador VIN",
    embedIntro:
      "¿Manejas un blog de autos, un sitio de educación para compradores, o un foro comunitario donde los lectores preguntan sobre VINs? Coloca nuestro decodificador gratis directamente en la página. Una etiqueta iframe, sin claves API, sin píxeles de seguimiento.",
    embedCodeLabel: "Código de incrustación",
    embedPasteHintPre: "Pega donde HTML esté permitido. Ajusta",
    embedPasteHintAnd: "y",
    embedPasteHintSuffix: "para que encaje en tu diseño.",
    livePreviewLabel: "Vista previa en vivo",
    whyHeading: "Por qué otros sitios incrustan nuestras herramientas",
    whyP1Lead: "Es genuinamente gratis, sin registro.",
    whyP1:
      "La mayoría de las herramientas VIN que encuentras en la página de resultados de búsqueda o canalizan a los lectores a un formulario de leads pagados o bloquean la decodificación básica detrás de una captura de tarjeta de crédito. Nuestra incrustación está diseñada para el resultado opuesto: tu lector pega un VIN, ve el año/marca/modelo decodificado en segundos, y se queda en tu página. No hay modal de upsell, no hay popup, no hay captura de correo.",
    whyP2Lead: "Los datos están respaldados por NMVTIS y verificados por OEM.",
    whyP2:
      "El decodificador obtiene datos del mismo feed federalmente obligatorio del Sistema Nacional del Título de Vehículos y las mismas APIs de fabricantes que alimentan nuestros reportes pagados de historial. Eso significa que los lectores obtienen resultados autoritativos — no una conjetura basada en regex de un snippet JavaScript de 200 líneas. Para editores que se preocupan por la credibilidad (blogs de autos, medios de periodismo, sitios de educación para concesionarios), la diferencia es significativa.",
    whyP3LeadPre: "Obtienes un enlace de marca de vuelta a",
    whyP3LeadLink: "carcheckervin.com",
    whyP3LeadSuffix: ".",
    whyP3:
      'Cada incrustación incluye un pequeño enlace "Powered by CarCheckerVIN" debajo del formulario. Esa es nuestra única petición a cambio de la herramienta gratis. No requerimos nofollow, no requerimos dofollow — simplemente requerimos que el enlace de crédito se mantenga visible. Si escribes sobre compra de autos usados, detección de fraude o investigación vehicular, nuestro equipo con gusto revisará tu publicación y considerará destacarla en nuestro hub de investigación.',
    faqHeading: "Preguntas frecuentes — Herramientas gratis",
    faqIntro: "Las preguntas más comunes sobre nuestro decodificador VIN gratis, calculadoras y herramientas de búsqueda.",
    ctaHeading: "Prueba el decodificador ahora",
    ctaBody: "Pega cualquier VIN de 17 caracteres abajo. Decodificación gratis, sin registro, resultados al instante.",
    ctaFooterPre: "¿Necesitas acceso al por mayor para un concesionario? Mira nuestros",
    ctaFooterLink: "precios para concesionarios",
    ctaFooterSuffix: ".",
    tools: [
      { title: "Decodificador VIN", description: "Decodifica al instante cualquier VIN de 17 caracteres a año, marca, modelo, trim, motor, transmisión, código de planta y país de origen. Gratis e ilimitado.", cta: "Decodificar un VIN" },
      { title: "Revisión VIN por marca", description: "Navega páginas de revisión VIN específicas por marca con notas de cobertura por año-modelo, problemas comunes y guía de retiros para más de 40 fabricantes.", cta: "Ver marcas" },
      { title: "Búsqueda de número de chasis", description: "Un número de chasis es lo mismo que un VIN. Decodifica cualquier número de chasis de 17 caracteres para encontrar el tipo, marca, modelo, año y motor del auto — funciona mundialmente.", cta: "Decodificar chasis" },
      { title: "Glosario VIN", description: "Definiciones en español claro para cada término relacionado con VIN: WMI, VDS, VIS, dígito verificador, marca de título, NMVTIS, salvamento, chatarra, reconstruido y más.", cta: "Abrir glosario" },
      { title: "Revisión VIN por estado", description: "Páginas de búsqueda estado por estado que cubren reglas de título del DMV, umbrales de salvamento, leyes de marcas y rutas conocidas de lavado de título para los 50 estados.", cta: "Elegir estado" },
      { title: "Reporte de historial vehicular", description: "Obtén un reporte completo de historial vehicular con marcas de título, registros de accidentes, historial de odómetro, datos de robo, retiros y valoración de mercado.", cta: "Ejecutar reporte" },
      { title: "Búsqueda de vehículo robado", description: "Cruza un VIN contra la base de datos del National Insurance Crime Bureau (NICB) antes de entregar dinero a un vendedor privado.", cta: "Verificar robo" },
      { title: "Verificación de título de salvamento", description: "Mira si un vehículo ha tenido alguna vez un título de salvamento, chatarra, reconstruido o inundación en cualquiera de los 50 estados o territorios de EE. UU.", cta: "Verificar salvamento" },
      { title: "Verificación de odómetro", description: "Detecta retroceso de odómetro comparando kilometraje reportado en transferencias de título del DMV, registros de inspección y snapshots de historial de servicio.", cta: "Verificar kilometraje" },
      { title: "Calculadora de valor disminuido", description: "Estima el valor que tu auto perdió después de un accidente. Ejecuta la fórmula 17c del seguro y el rango real de pérdida de mercado — listo para reclamo, sin registro.", cta: "Calcular pérdida de valor" },
      { title: "Búsqueda HIN (VIN de bote)", description: "El VIN de un bote es su Hull Identification Number de 12 caracteres. Decodifica el HIN al código del constructor, número de serie del casco y fecha de construcción al instante.", cta: "Decodificar HIN" },
      { title: "Búsqueda VIN de camión pesado", description: "Decodifica cualquier tractor Freightliner, Peterbilt, Kenworth, Volvo o Mack — más remolques semi — a marca, año modelo, motor y clase GVWR.", cta: "Decodificar VIN camión" },
      { title: "Búsqueda VIN de carrito de golf", description: "Los carritos de golf usan un número de serie, no un VIN de carretera. Decodifica un número de serie Club Car al año modelo al instante, con guías de marcas E-Z-GO y Yamaha.", cta: "Decodificar serie carrito" },
    ],
    faqs: [
      { q: "¿Estas herramientas vehiculares son realmente gratis?", a: "Sí. Cada herramienta en este hub es genuinamente gratis, no requiere registro y está alimentada por los mismos datos NMVTIS, NICB y OEM que alimentan nuestros reportes pagados. No hay modal de upsell, no hay popup, no hay captura de correo requerida para usarlas." },
      { q: "¿Necesito una cuenta para usar las herramientas?", a: "No. Todas las herramientas funcionan sin cuenta — cero cuentas requeridas. Haz clic en cualquier tarjeta de herramienta para ir directo a la herramienta y empezar a investigar un vehículo." },
      { q: "¿Qué muestra el decodificador VIN?", a: "El decodificador VIN decodifica al instante cualquier VIN de 17 caracteres a su año, marca, modelo, trim, motor, transmisión, código de planta y país de origen. Es gratis e ilimitado, sin registro requerido." },
      { q: "¿Qué herramientas se incluyen en este hub?", a: "El hub agrupa trece herramientas gratis: un decodificador VIN, revisión VIN por marca, búsqueda de número de chasis, un glosario VIN, una revisión VIN estado por estado, un reporte completo de historial vehicular, una búsqueda de vehículo robado (cruce NICB), una verificación de título de salvamento, verificación de odómetro, una calculadora de valor disminuido, una búsqueda HIN para botes, una búsqueda VIN de camión pesado y una búsqueda VIN de carrito de golf." },
      { q: "¿Cómo funciona la calculadora de valor disminuido?", a: "La calculadora de valor disminuido estima el valor que tu auto perdió después de un accidente. Ejecuta la fórmula 17c del seguro junto con el rango real de pérdida de mercado, dándote una estimación lista para reclamo sin registro." },
      { q: "¿Los datos detrás de estas herramientas son confiables?", a: "Sí. Las herramientas obtienen datos del mismo feed federalmente obligatorio del Sistema Nacional del Título de Vehículos (NMVTIS), datos de robo de NICB y APIs de fabricantes que alimentan nuestros reportes pagados de historial — para que los lectores obtengan resultados autoritativos en lugar de una conjetura basada en regex de un snippet JavaScript corto." },
      { q: "¿Puedo incrustar el decodificador VIN en mi propio sitio web?", a: "Sí. Puedes colocar nuestro decodificador VIN gratis en tu página con una sola etiqueta iframe — sin claves API y sin píxeles de seguimiento. Pega el código de incrustación donde HTML esté permitido y ajusta el ancho y alto para que encaje en tu diseño. Cada incrustación incluye un pequeño enlace de crédito \"Powered by CarCheckerVIN\" debajo del formulario, que es nuestra única petición a cambio de la herramienta gratis." },
      { q: "¿Puedo verificar si un vehículo está robado o tiene un título de salvamento?", a: "Sí. La búsqueda de vehículo robado cruza un VIN contra la base de datos del National Insurance Crime Bureau (NICB), y la verificación de título de salvamento muestra si un vehículo ha tenido alguna vez un título de salvamento, chatarra, reconstruido o inundación en cualquiera de los 50 estados o territorios de EE. UU." },
    ],
  },
  fr: {
    breadcrumbHome: "Accueil",
    breadcrumbCurrent: "Outils gratuits",
    badgeFreeForever: "Gratuit pour toujours",
    h1: "Outils véhiculaires gratuits",
    heroLead:
      "Une boîte à outils complète pour les acheteurs, vendeurs, gestionnaires de flotte et journalistes — chaque outil ci-dessous est véritablement gratuit, ne nécessite aucune inscription, et est alimenté par les mêmes données NMVTIS, NICB et OEM qui alimentent nos rapports payants.",
    leadParagraph:
      "Nous avons construit CarCheckerVIN parce que les données dont les acheteurs ont besoin pour prendre une décision intelligente sur une voiture d'occasion ne devraient pas être bloquées derrière un paywall de trente USD. Les treize outils ci-dessous couvrent les questions les plus courantes que nous entendons chaque jour : qui a construit cette voiture, a-t-elle été volée, possède-t-elle un titre propre, le compteur kilométrique a-t-il été reculé, et que dit la loi de mon État sur les marques de titre. Utilise-les pour ton prochain achat, lie-les depuis ton blog, ou intègre notre décodeur directement sur ton propre site.",
    allToolsHeading: "Tous les outils gratuits",
    allToolsIntro: "Treize outils, zéro compte requis. Clique sur n'importe quelle carte pour accéder directement à l'outil.",
    embedBadge: "Pour les éditeurs",
    embedHeading: "Intègre notre décodeur VIN",
    embedIntro:
      "Tu gères un blog auto, un site d'éducation pour acheteurs, ou un forum communautaire où les lecteurs posent des questions sur les VIN ? Place notre décodeur gratuit directement sur la page. Une seule balise iframe, sans clé API, sans pixel de suivi.",
    embedCodeLabel: "Code d'intégration",
    embedPasteHintPre: "Colle où le HTML est autorisé. Ajuste",
    embedPasteHintAnd: "et",
    embedPasteHintSuffix: "pour s'adapter à ta mise en page.",
    livePreviewLabel: "Aperçu en direct",
    whyHeading: "Pourquoi d'autres sites intègrent nos outils",
    whyP1Lead: "C'est véritablement gratuit, sans inscription.",
    whyP1:
      "La plupart des outils VIN que tu trouves sur la page de résultats de recherche dirigent les lecteurs vers un formulaire de leads payant ou bloquent le décodage de base derrière une saisie de carte de crédit. Notre intégration est conçue pour le résultat opposé : ton lecteur colle un VIN, voit l'année/marque/modèle décodé en quelques secondes, et reste sur ta page. Pas de modal de vente, pas de popup, pas de capture d'e-mail.",
    whyP2Lead: "Les données sont soutenues par NMVTIS et vérifiées par les OEM.",
    whyP2:
      "Le décodeur tire du même flux fédéralement obligatoire du National Motor Vehicle Title Information System et des mêmes API des fabricants qui alimentent nos rapports d'historique payants. Cela signifie que les lecteurs obtiennent des résultats faisant autorité — pas une supposition basée sur une regex d'un extrait JavaScript de 200 lignes. Pour les éditeurs qui se soucient de la crédibilité (blogs auto, médias journalistiques, sites d'éducation pour concessionnaires), la différence est significative.",
    whyP3LeadPre: "Tu obtiens un lien de marque vers",
    whyP3LeadLink: "carcheckervin.com",
    whyP3LeadSuffix: ".",
    whyP3:
      'Chaque intégration inclut un petit lien "Powered by CarCheckerVIN" sous le formulaire. C\'est notre seule demande en échange de l\'outil gratuit. Nous n\'exigeons pas nofollow, nous n\'exigeons pas dofollow — nous demandons simplement que le lien de crédit reste visible. Si tu écris sur l\'achat de voitures d\'occasion, la détection de fraude ou la recherche véhiculaire, notre équipe examinera volontiers ta publication et envisagera de la mettre en avant dans notre hub de recherche.',
    faqHeading: "FAQ — Outils gratuits",
    faqIntro: "Les questions les plus courantes sur notre décodeur VIN gratuit, nos calculatrices et nos outils de recherche.",
    ctaHeading: "Essaie le décodeur maintenant",
    ctaBody: "Colle n'importe quel VIN de 17 caractères ci-dessous. Décodage gratuit, sans inscription, résultats instantanés.",
    ctaFooterPre: "Tu as besoin d'un accès en gros pour une concession ? Consulte nos",
    ctaFooterLink: "tarifs concessionnaires",
    ctaFooterSuffix: ".",
    tools: [
      { title: "Décodeur VIN", description: "Décode instantanément n'importe quel VIN de 17 caractères en année, marque, modèle, finition, moteur, transmission, code d'usine et pays d'origine. Gratuit et illimité.", cta: "Décoder un VIN" },
      { title: "Vérification VIN par marque", description: "Parcours les pages de vérification VIN spécifiques aux marques avec des notes de couverture par année-modèle, des problèmes courants et des conseils de rappel pour plus de 40 fabricants.", cta: "Parcourir les marques" },
      { title: "Recherche de numéro de châssis", description: "Un numéro de châssis est identique à un VIN. Décode n'importe quel numéro de châssis de 17 caractères pour trouver le type, la marque, le modèle, l'année et le moteur de la voiture — fonctionne dans le monde entier.", cta: "Décoder un châssis" },
      { title: "Glossaire VIN", description: "Définitions en français clair pour chaque terme lié au VIN : WMI, VDS, VIS, chiffre de contrôle, marque de titre, NMVTIS, salvage, junk, reconstruit, et plus.", cta: "Ouvrir le glossaire" },
      { title: "Vérification VIN par État", description: "Pages de recherche État par État couvrant les règles de titre du DMV, les seuils de salvage, les lois de marquage et les routes connues de blanchiment de titre pour les 50 États.", cta: "Choisir un État" },
      { title: "Rapport d'historique véhiculaire", description: "Obtiens un rapport complet d'historique véhiculaire avec marques de titre, registres d'accidents, historique du compteur kilométrique, données de vol, rappels et évaluation du marché.", cta: "Exécuter un rapport" },
      { title: "Recherche de véhicule volé", description: "Croise un VIN avec la base de données du National Insurance Crime Bureau (NICB) avant de remettre de l'argent à un vendeur privé.", cta: "Vérifier le statut de vol" },
      { title: "Vérification de titre salvage", description: "Vois si un véhicule a déjà eu un titre salvage, junk, reconstruit ou d'inondation dans l'un des 50 États ou territoires américains.", cta: "Vérifier salvage" },
      { title: "Vérification du compteur kilométrique", description: "Détecte le recul du compteur kilométrique en comparant le kilométrage déclaré lors des transferts de titre du DMV, des registres d'inspection et des instantanés de l'historique de service.", cta: "Vérifier le kilométrage" },
      { title: "Calculatrice de valeur diminuée", description: "Estime la valeur que ta voiture a perdue après un accident. Exécute la formule 17c de l'assureur et la plage réelle de perte de marché — prête pour la réclamation, sans inscription.", cta: "Calculer la perte de valeur" },
      { title: "Recherche HIN (VIN de bateau)", description: "Le VIN d'un bateau est son Hull Identification Number de 12 caractères. Décode le HIN pour obtenir le code du constructeur, le numéro de série de coque et la date de construction instantanément.", cta: "Décoder un HIN" },
      { title: "Recherche VIN de poids lourd", description: "Décode n'importe quel tracteur Freightliner, Peterbilt, Kenworth, Volvo ou Mack — plus les semi-remorques — en marque, année-modèle, moteur et classe GVWR.", cta: "Décoder un VIN de camion" },
      { title: "Recherche VIN de voiturette de golf", description: "Les voiturettes de golf utilisent un numéro de série, pas un VIN routier. Décode un numéro de série Club Car à l'année-modèle instantanément, avec des guides de marques E-Z-GO et Yamaha.", cta: "Décoder un numéro de voiturette" },
    ],
    faqs: [
      { q: "Ces outils véhiculaires sont-ils vraiment gratuits ?", a: "Oui. Chaque outil de ce hub est véritablement gratuit, ne nécessite aucune inscription et est alimenté par les mêmes données NMVTIS, NICB et OEM qui alimentent nos rapports payants. Pas de modal de vente, pas de popup, pas de capture d'e-mail requise pour les utiliser." },
      { q: "Ai-je besoin d'un compte pour utiliser les outils ?", a: "Non. Tous les outils fonctionnent sans compte — zéro compte requis. Clique sur n'importe quelle carte d'outil pour accéder directement à l'outil et commencer à enquêter sur un véhicule." },
      { q: "Que montre le décodeur VIN ?", a: "Le décodeur VIN décode instantanément n'importe quel VIN de 17 caractères en son année, marque, modèle, finition, moteur, transmission, code d'usine et pays d'origine. Il est gratuit et illimité, sans inscription requise." },
      { q: "Quels outils sont inclus dans ce hub ?", a: "Le hub regroupe treize outils gratuits : un décodeur VIN, une vérification VIN par marque, une recherche de numéro de châssis, un glossaire VIN, une vérification VIN État par État, un rapport complet d'historique véhiculaire, une recherche de véhicule volé (croisement NICB), une vérification de titre salvage, une vérification du compteur kilométrique, une calculatrice de valeur diminuée, une recherche HIN pour bateaux, une recherche VIN de poids lourd et une recherche VIN de voiturette de golf." },
      { q: "Comment fonctionne la calculatrice de valeur diminuée ?", a: "La calculatrice de valeur diminuée estime la valeur que ta voiture a perdue après un accident. Elle exécute la formule 17c de l'assureur aux côtés de la plage réelle de perte de marché, te donnant une estimation prête pour la réclamation sans inscription." },
      { q: "Les données derrière ces outils sont-elles fiables ?", a: "Oui. Les outils s'appuient sur le même flux fédéralement obligatoire du National Motor Vehicle Title Information System (NMVTIS), les données de vol NICB et les API des fabricants qui alimentent nos rapports d'historique payants — pour que les lecteurs obtiennent des résultats faisant autorité plutôt qu'une supposition basée sur une regex d'un court extrait JavaScript." },
      { q: "Puis-je intégrer le décodeur VIN sur mon propre site web ?", a: "Oui. Tu peux placer notre décodeur VIN gratuit sur ta page avec une seule balise iframe — sans clé API et sans pixel de suivi. Colle le code d'intégration là où le HTML est autorisé et ajuste la largeur et la hauteur pour s'adapter à ta mise en page. Chaque intégration inclut un petit lien de crédit \"Powered by CarCheckerVIN\" sous le formulaire, qui est notre seule demande en échange de l'outil gratuit." },
      { q: "Puis-je vérifier si un véhicule est volé ou possède un titre salvage ?", a: "Oui. La recherche de véhicule volé croise un VIN avec la base de données du National Insurance Crime Bureau (NICB), et la vérification de titre salvage montre si un véhicule a déjà eu un titre salvage, junk, reconstruit ou d'inondation dans l'un des 50 États ou territoires américains." },
    ],
  },
} as const;

const embedSnippet = `<iframe src="https://www.carcheckervin.com/embed/vin-decoder"
        width="100%" height="200" frameborder="0"></iframe>`;

export default function ToolsPageBody({
  locale = "en",
}: {
  locale?: Locale;
}) {
  const copy = COPY[locale];
  const homeHref = locale === "es" ? "/es" : "/";
  const dealersHref = locale === "es" ? "/es/para-concesionarios" : "/dealers";

  const TOOL_HREFS = locale === "es"
    ? ["/es", "/es/vin-check", "/es/buscar-numero-chasis", "/es/glosario", "/es/vin-check/state", "/es", "/es/vehiculo-robado", "/es/titulo-salvamento", "/es/verificacion-odometro", "/es/calculadora-valor-disminuido", "/es/buscar-hin-embarcacion", "/es/vin-camion-pesado", "/es/vin-carrito-de-golf"]
    : ["/", "/vin-check", "/chassis-number-lookup", "/glossary", "/vin-check/state", "/", "/stolen-vehicle-check", "/salvage-title-check", "/odometer-check", "/diminished-value-calculator", "/hin-lookup", "/semi-truck-vin-lookup", "/golf-cart-vin-lookup"];

  return (
    <>
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white pt-28 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-5 [&_a]:text-primary-100 [&_a:hover]:text-white [&_span]:text-white [&_li_span]:text-primary-200">
            <Breadcrumbs onDark items={[{ label: copy.breadcrumbHome, href: homeHref }, { label: copy.breadcrumbCurrent }]} />
          </div>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-xs font-semibold uppercase tracking-wider">
            <Wrench className="w-3.5 h-3.5" /> {copy.badgeFreeForever}
          </span>
          <h1 className="mt-5 text-4xl sm:text-5xl font-bold leading-tight">{copy.h1}</h1>
          <p className="mt-5 text-lg text-primary-100 max-w-2xl leading-relaxed">{copy.heroLead}</p>
        </div>
      </section>

      <section className="py-14 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-lg text-slate-600 leading-relaxed">{copy.leadParagraph}</p>
        </div>
      </section>

      <section className="py-14 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold text-slate-900">{copy.allToolsHeading}</h2>
            <p className="mt-3 text-lg text-slate-600 leading-relaxed">{copy.allToolsIntro}</p>
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {copy.tools.map((t, i) => {
              const Icon = TOOL_ICONS[i];
              return (
                <Link
                  key={t.title}
                  href={TOOL_HREFS[i]}
                  className="block bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md hover:border-primary-200 transition"
                >
                  <div className="w-11 h-11 rounded-xl bg-primary-50 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary-600" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-slate-900">{t.title}</h3>
                  <p className="mt-2 text-slate-600 leading-relaxed text-sm">{t.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary-600">
                    {t.cta} &rarr;
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-xs font-semibold uppercase tracking-wider">
              <Code className="w-3.5 h-3.5" /> {copy.embedBadge}
            </span>
            <h2 className="mt-4 text-3xl font-bold text-slate-900">{copy.embedHeading}</h2>
            <p className="mt-3 text-lg text-slate-600 leading-relaxed">{copy.embedIntro}</p>
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Copy className="w-4 h-4 text-primary-600" />
                <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
                  {copy.embedCodeLabel}
                </h3>
              </div>
              <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 font-mono text-sm overflow-x-auto leading-relaxed">
                <code>{embedSnippet}</code>
              </pre>
              <p className="mt-3 text-sm text-slate-700">
                {copy.embedPasteHintPre} <code>width</code> {copy.embedPasteHintAnd} <code>height</code>{" "}
                {copy.embedPasteHintSuffix}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50">
              <div className="bg-slate-100 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-600 border-b border-slate-200">
                {copy.livePreviewLabel}
              </div>
              <iframe
                src="/embed/vin-decoder"
                width="100%"
                height="200"
                title="CarCheckerVIN VIN Decoder"
                className="block w-full"
                style={{ border: "0" }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900">{copy.whyHeading}</h2>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            <strong>{copy.whyP1Lead}</strong> {copy.whyP1}
          </p>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            <strong>{copy.whyP2Lead}</strong> {copy.whyP2}
          </p>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            <strong>
              {copy.whyP3LeadPre}{" "}
              <Link href={homeHref} className="text-primary-600 hover:underline font-medium">
                {copy.whyP3LeadLink}
              </Link>
              {copy.whyP3LeadSuffix}
            </strong>{" "}
            {copy.whyP3}
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900">{copy.faqHeading}</h2>
          <p className="mt-3 text-lg text-slate-600 leading-relaxed">{copy.faqIntro}</p>
          <div className="mt-8 space-y-3">
            {copy.faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                  <span className="text-base font-bold text-slate-900 pr-2">{f.q}</span>
                  <span className="flex-shrink-0 mt-0.5 text-primary-600 text-xl font-light group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 bg-slate-50">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">{copy.ctaHeading}</h2>
          <p className="text-slate-700 mb-8">{copy.ctaBody}</p>
          <div className="flex justify-center">
            <VinSearchForm size="sm" locale={locale} />
          </div>
          <p className="mt-6 text-sm text-slate-700">
            {copy.ctaFooterPre}{" "}
            <Link href={dealersHref} className="text-primary-600 hover:underline">
              {copy.ctaFooterLink}
            </Link>
            {copy.ctaFooterSuffix}
          </p>
        </div>
      </section>
    </>
  );
}

export { COPY as TOOLS_COPY };
