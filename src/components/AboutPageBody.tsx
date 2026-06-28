/**
 * Shared body for /about and /es/acerca-de.
 * Wave 16 — identical JSX, locale-driven copy.
 */

import Link from "next/link";
import { Shield, Database, Users, Award, Mail, Phone, Clock } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import type { Locale } from "@/i18n/config";

const COPY = {
  en: {
    breadcrumbHome: "Home",
    breadcrumbCurrent: "About",
    h1: "About CarCheckerVIN",
    heroLead:
      "We build the vehicle history reports we wish we had when we were buying our own used cars: accurate, fast, affordable, and written in plain English.",
    missionHeading: "Our Mission",
    missionP1:
      "Every year, more than 40 million used vehicles change hands in the United States, and a staggering share of those buyers never see a vehicle history report before they sign. The reason is rarely apathy. It is cost, complexity, and a marketplace dominated by premium-priced legacy reports that small dealers and private buyers simply cannot justify on a single vehicle.",
    missionP2:
      "CarCheckerVIN exists to close that gap. Our mission is to make the same authoritative title, brand, theft, and recall data that insurance companies and franchise dealers rely on available to anyone buying a car, for less than the price of a tank of gas. We believe transparency is the single most powerful tool a buyer has, and we believe it should not be reserved for the people who can afford a thirty-dollar premium report.",
    missionP3Pre: "That mission shapes every decision we make. It is why our",
    missionP3LinkVin: "free VIN check",
    missionP3Mid: "is genuinely free, why our paid reports start at $14.99, and why we publish a growing library of",
    missionP3LinkGuides: "car-buying guides",
    missionP3Suffix:
      "without paywalls. Informed buyers make better decisions, and better decisions make for a healthier used-car market for everyone.",
    howHeading: "How We Work",
    howIntro:
      "Every CarCheckerVIN report is assembled in real time from multiple authoritative sources, then validated and normalized by our internal data layer before it reaches you. We do not store stale snapshots and resell them weeks later, and we do not pad reports with filler from low-quality scraping operations.",
    sources: [
      {
        title: "NMVTIS",
        body: "The federally mandated National Motor Vehicle Title Information System is our primary source for title brands, junk and salvage records, and cross-state title history.",
      },
      {
        title: "NICB",
        bodyPrefix:
          "The National Insurance Crime Bureau supplies stolen-vehicle and total-loss records that power our",
        bodyLink: "stolen vehicle check",
        bodySuffix: ".",
      },
      {
        title: "Manufacturer APIs",
        body: "Direct OEM integrations let us decode VINs to the trim level and surface open recalls and Technical Service Bulletins straight from the source.",
      },
      {
        title: "Auto.dev",
        body: "Auto.dev provides supplemental specifications, market valuations, and listing-history signals that round out every CarCheckerVIN report.",
      },
    ],
    accuracyHeading: "Our Commitment to Accuracy",
    accuracyP1:
      "Our data team brings more than 35 years of combined experience in automotive data, insurance fraud investigation, DMV records, and ASE-certified vehicle inspection. Every editorial guide we publish is reviewed by at least one subject-matter expert on staff before it goes live, and every dataset change is tested against a regression suite of more than 5,000 known vehicles before it reaches production.",
    accuracyP2:
      "We update our content on a quarterly cadence to reflect changes in state title laws, new federal recall guidance, and shifts in how the major data providers report information. When we discover an inaccuracy, we correct it within two business days and disclose the change in our changelog. If you ever spot something that looks wrong in a report, our team will investigate and respond personally.",
    whyHeading: "Why We Built CarCheckerVIN",
    whyP1:
      "After watching a family member get scammed into a flood-damaged car that had been quietly retitled across three state lines, our founder spent a weekend trying to untangle what a thirty-dollar report would have surfaced in seconds. The damage had been hidden well, the seller had been confident, and the title looked clean on the surface. The truth was buried in NMVTIS records that almost no private buyer ever sees.",
    whyP2Pre:
      "That experience became the core thesis behind CarCheckerVIN. The data exists. The tools exist. The only thing missing is a service that delivers them at a price ordinary buyers can actually afford and in a format they can actually understand. We built CarCheckerVIN so that the next family does not have to learn the hard way. Start with a free",
    whyP2LinkVin: "VIN check",
    whyP2Mid: "or browse our",
    whyP2LinkGuides: "buyer education guides",
    whyP2Suffix: "to see what we mean.",
    teamHeading: "The Team",
    teamIntro:
      "CarCheckerVIN is built by a small team of automotive data, fraud investigation, and customer support veterans. Real people, real expertise, real accountability.",
    team: [
      {
        name: "Marcus Chen",
        role: "Founder & CEO",
        bio: "Marcus spent 12 years in automotive data engineering at major insurance carriers before launching CarCheckerVIN. He has personally reviewed more than 200,000 NMVTIS title records and built the pricing-and-pipeline architecture that lets us run reports at a fraction of legacy provider costs.",
      },
      {
        name: "Priya Anand",
        role: "Head of Data",
        bio: "Priya leads our data partnerships and integration work with NMVTIS-approved providers, NICB, and OEM APIs. A former lead engineer at a Fortune 100 auto auction, she designed the validation layer that catches stale or inconsistent records before they reach a customer report.",
      },
      {
        name: "Devon Whitfield",
        role: "Lead Research Analyst",
        bio: "Devon is an ASE-certified technician turned investigative analyst with a decade of fraud-detection experience at a state DMV. He authors our long-form guides on title washing, VIN cloning, and odometer rollback, and he reviews every data-source change before it ships.",
      },
      {
        name: "Sara Okonkwo",
        role: "Customer Success Lead",
        bio: "Sara has helped more than 30,000 buyers interpret their vehicle history reports and negotiate fair deals. She runs our in-house support team, edits buyer education content, and personally responds to escalated cases within one business day.",
      },
    ],
    contactHeading: "Contact Us",
    contactIntro:
      "Questions about a report, a data source, or your account? Our team is ready to help.",
    emailLabel: "Email",
    phoneLabel: "Phone",
    hoursLabel: "Hours",
    hoursValue: "Monday – Friday, 9:00 AM – 6:00 PM Eastern",
    faqHeading: "Frequently Asked Questions",
    faqIntro:
      "Common questions about who we are, where our data comes from, and how our vehicle history reports work.",
    ctaHeading: "Ready to Check a Vehicle?",
    ctaBody:
      "Run a free VIN decode in seconds, or unlock a full history report for $14.99.",
    faqs: [
      {
        q: "Where does CarCheckerVIN get its vehicle data?",
        a: "CarCheckerVIN assembles each report in real time from multiple authoritative sources. Title brands, salvage, and junk records come from NMVTIS (the National Motor Vehicle Title Information System). Stolen-vehicle and total-loss records come from the NICB (National Insurance Crime Bureau). Manufacturer APIs supply trim-level VIN decoding plus open recalls and Technical Service Bulletins, and Auto.dev provides supplemental specifications, valuations, and listing-history signals.",
      },
      {
        q: "Is CarCheckerVIN affiliated with Carfax or AutoCheck?",
        a: "No. CarCheckerVIN is an independent vehicle history service and is not affiliated with, endorsed by, or owned by Carfax, AutoCheck, or any other report provider. We draw from the same kinds of authoritative federal and industry data sources — NMVTIS, NICB, and manufacturer feeds — and offer reports at a lower price.",
      },
      {
        q: "What is NMVTIS and why does it matter?",
        a: "NMVTIS — the National Motor Vehicle Title Information System — is a federally mandated database that aggregates title and brand records from state motor vehicle agencies, insurance carriers, and salvage and junk operators. Because it pulls from every state, it surfaces cross-state title history that a single paper title can hide, which is what makes it the backbone of an honest vehicle history check.",
      },
      {
        q: "How current is the data in a CarCheckerVIN report?",
        a: "Every report is assembled in real time from live data sources at the moment you run it, then validated and normalized by our internal data layer before it reaches you. We do not store stale snapshots and resell them weeks later. Our published editorial content and guides are reviewed on a quarterly cadence to reflect changes in state title laws and federal recall guidance.",
      },
      {
        q: "How much does a CarCheckerVIN report cost?",
        a: "A basic VIN decode is genuinely free with no signup required. Full paid history reports start at $14.99. Our car-buying guides are also free to read with no paywall, because we believe informed buyers make better decisions.",
      },
      {
        q: "Who is behind CarCheckerVIN?",
        a: "CarCheckerVIN is built by a small team with a combined background in automotive data engineering, insurance fraud investigation, DMV records, ASE-certified vehicle inspection, and customer support. Founded in 2025, the company sources its data from NMVTIS-approved providers, the NICB, and manufacturer APIs.",
      },
      {
        q: "What do I do if I find an error in a report?",
        a: "Contact our team and we will investigate personally. When we discover or confirm an inaccuracy, we correct it within two business days and disclose the change in our changelog. You can reach support by email at contact@carcheckervin.com or by phone at +1 (564) 212-3985, Monday through Friday, 9:00 AM to 6:00 PM Eastern.",
      },
    ],
  },
  es: {
    breadcrumbHome: "Inicio",
    breadcrumbCurrent: "Acerca de",
    h1: "Acerca de CarCheckerVIN",
    heroLead:
      "Construimos los reportes de historial vehicular que nos hubiera gustado tener cuando comprábamos nuestros propios autos usados: precisos, rápidos, asequibles y escritos en español claro.",
    missionHeading: "Nuestra misión",
    missionP1:
      "Cada año, más de 40 millones de vehículos usados cambian de manos en Estados Unidos, y una proporción asombrosa de esos compradores nunca ve un reporte de historial vehicular antes de firmar. La razón rara vez es apatía. Es el costo, la complejidad y un mercado dominado por reportes legacy de precio premium que los pequeños concesionarios y compradores privados simplemente no pueden justificar para un solo vehículo.",
    missionP2:
      "CarCheckerVIN existe para cerrar esa brecha. Nuestra misión es hacer que los mismos datos autoritativos de títulos, marcas, robos y retiros en los que confían las compañías de seguros y los concesionarios franquiciados estén disponibles para cualquiera que compre un auto, por menos del precio de un tanque de gasolina. Creemos que la transparencia es la herramienta más poderosa que tiene un comprador, y creemos que no debería reservarse para quienes pueden pagar un reporte premium de treinta dólares.",
    missionP3Pre: "Esa misión moldea cada decisión que tomamos. Es por eso que nuestra",
    missionP3LinkVin: "revisión VIN gratis",
    missionP3Mid:
      "es genuinamente gratis, por qué nuestros reportes pagados empiezan en $14.99, y por qué publicamos una biblioteca creciente de",
    missionP3LinkGuides: "guías de compra de autos",
    missionP3Suffix:
      "sin paywalls. Los compradores informados toman mejores decisiones, y las mejores decisiones crean un mercado de autos usados más saludable para todos.",
    howHeading: "Cómo trabajamos",
    howIntro:
      "Cada reporte de CarCheckerVIN se arma en tiempo real desde múltiples fuentes autoritativas, luego se valida y normaliza por nuestra capa de datos interna antes de llegar a ti. No almacenamos snapshots desactualizados para revenderlos semanas después, y no rellenamos reportes con contenido de operaciones de scraping de baja calidad.",
    sources: [
      {
        title: "NMVTIS",
        body: "El federalmente obligatorio Sistema Nacional del Título de Vehículos es nuestra fuente principal para marcas de título, registros de chatarra y salvamento, e historial de título entre estados.",
      },
      {
        title: "NICB",
        bodyPrefix:
          "El National Insurance Crime Bureau provee registros de vehículos robados y pérdida total que alimentan nuestra",
        bodyLink: "verificación de vehículo robado",
        bodySuffix: ".",
      },
      {
        title: "APIs de fabricantes",
        body: "Las integraciones OEM directas nos permiten decodificar VINs al nivel de trim y surgir retiros abiertos y Boletines de Servicio Técnico directamente desde la fuente.",
      },
      {
        title: "Auto.dev",
        body: "Auto.dev provee especificaciones suplementarias, valoraciones de mercado y señales de historial de listados que completan cada reporte de CarCheckerVIN.",
      },
    ],
    accuracyHeading: "Nuestro compromiso con la precisión",
    accuracyP1:
      "Nuestro equipo de datos aporta más de 35 años de experiencia combinada en datos automotrices, investigación de fraude de seguros, registros del DMV e inspección vehicular certificada ASE. Cada guía editorial que publicamos es revisada por al menos un experto en la materia del equipo antes de salir, y cada cambio de dataset se prueba contra una suite de regresión de más de 5,000 vehículos conocidos antes de llegar a producción.",
    accuracyP2:
      "Actualizamos nuestro contenido con cadencia trimestral para reflejar cambios en leyes de título estatales, nueva guía federal de retiros y cambios en cómo los proveedores principales de datos reportan información. Cuando descubrimos una inexactitud, la corregimos en dos días hábiles y divulgamos el cambio en nuestro changelog. Si alguna vez encuentras algo que parece estar mal en un reporte, nuestro equipo investigará y responderá personalmente.",
    whyHeading: "Por qué construimos CarCheckerVIN",
    whyP1:
      "Después de ver a un familiar ser estafado con un auto dañado por inundación que había sido re-titulado silenciosamente cruzando tres líneas estatales, nuestro fundador pasó un fin de semana tratando de desenredar lo que un reporte de treinta dólares habría surgido en segundos. El daño había sido bien ocultado, el vendedor había estado confiado, y el título se veía limpio en la superficie. La verdad estaba enterrada en registros NMVTIS que casi ningún comprador privado ve.",
    whyP2Pre:
      "Esa experiencia se convirtió en la tesis central detrás de CarCheckerVIN. Los datos existen. Las herramientas existen. Lo único que faltaba era un servicio que los entregara a un precio que los compradores comunes pudieran realmente pagar y en un formato que pudieran realmente entender. Construimos CarCheckerVIN para que la próxima familia no tenga que aprender por las malas. Empieza con una",
    whyP2LinkVin: "revisión VIN",
    whyP2Mid: "gratis o navega nuestras",
    whyP2LinkGuides: "guías de educación para compradores",
    whyP2Suffix: "para ver a qué nos referimos.",
    teamHeading: "El equipo",
    teamIntro:
      "CarCheckerVIN es construido por un pequeño equipo de veteranos en datos automotrices, investigación de fraude y soporte al cliente. Personas reales, experiencia real, responsabilidad real.",
    team: [
      {
        name: "Marcus Chen",
        role: "Fundador y CEO",
        bio: "Marcus pasó 12 años en ingeniería de datos automotrices en aseguradoras grandes antes de lanzar CarCheckerVIN. Ha revisado personalmente más de 200,000 registros de título NMVTIS y construido la arquitectura de precios y pipeline que nos permite ejecutar reportes a una fracción del costo de los proveedores legacy.",
      },
      {
        name: "Priya Anand",
        role: "Jefa de Datos",
        bio: "Priya lidera nuestras asociaciones de datos e integración con proveedores aprobados por NMVTIS, NICB y APIs OEM. Anteriormente ingeniera líder en una subasta automotriz Fortune 100, diseñó la capa de validación que detecta registros desactualizados o inconsistentes antes de llegar a un reporte del cliente.",
      },
      {
        name: "Devon Whitfield",
        role: "Analista de Investigación Líder",
        bio: "Devon es un técnico certificado ASE convertido en analista investigador con una década de experiencia en detección de fraude en un DMV estatal. Es autor de nuestras guías de formato largo sobre lavado de títulos, clonación de VIN y retroceso de odómetro, y revisa cada cambio de fuente de datos antes de su envío.",
      },
      {
        name: "Sara Okonkwo",
        role: "Líder de Éxito del Cliente",
        bio: "Sara ha ayudado a más de 30,000 compradores a interpretar sus reportes de historial vehicular y negociar tratos justos. Lidera nuestro equipo interno de soporte, edita contenido educativo para compradores y responde personalmente a casos escalados en un día hábil.",
      },
    ],
    contactHeading: "Contáctanos",
    contactIntro:
      "¿Preguntas sobre un reporte, una fuente de datos o tu cuenta? Nuestro equipo está listo para ayudar.",
    emailLabel: "Correo electrónico",
    phoneLabel: "Teléfono",
    hoursLabel: "Horario",
    hoursValue: "Lunes a viernes, 9:00 AM – 6:00 PM hora del Este",
    faqHeading: "Preguntas frecuentes",
    faqIntro:
      "Preguntas comunes sobre quiénes somos, de dónde vienen nuestros datos y cómo funcionan nuestros reportes de historial vehicular.",
    ctaHeading: "¿Listo para revisar un vehículo?",
    ctaBody:
      "Ejecuta una decodificación VIN gratis en segundos, o desbloquea un reporte completo de historial por $14.99.",
    faqs: [
      {
        q: "¿De dónde obtiene CarCheckerVIN sus datos vehiculares?",
        a: "CarCheckerVIN arma cada reporte en tiempo real desde múltiples fuentes autoritativas. Las marcas de título, salvamento y registros de chatarra vienen de NMVTIS (Sistema Nacional del Título de Vehículos). Los registros de vehículos robados y pérdida total vienen del NICB (National Insurance Crime Bureau). Las APIs de fabricantes proveen decodificación VIN a nivel de trim más retiros abiertos y Boletines de Servicio Técnico, y Auto.dev provee especificaciones suplementarias, valoraciones y señales de historial de listados.",
      },
      {
        q: "¿CarCheckerVIN está afiliado con Carfax o AutoCheck?",
        a: "No. CarCheckerVIN es un servicio independiente de historial vehicular y no está afiliado, respaldado ni es propiedad de Carfax, AutoCheck ni ningún otro proveedor de reportes. Obtenemos datos del mismo tipo de fuentes federales e industriales autoritativas — NMVTIS, NICB y feeds de fabricantes — y ofrecemos reportes a menor precio.",
      },
      {
        q: "¿Qué es NMVTIS y por qué importa?",
        a: "NMVTIS — el Sistema Nacional del Título de Vehículos — es una base de datos federalmente obligatoria que agrega registros de título y marcas de agencias estatales de vehículos, aseguradoras y operadores de salvamento y chatarra. Como recopila de cada estado, surge historial de título entre estados que un solo título en papel puede ocultar, lo que la convierte en la columna vertebral de una verificación honesta del historial vehicular.",
      },
      {
        q: "¿Qué tan actuales son los datos en un reporte de CarCheckerVIN?",
        a: "Cada reporte se arma en tiempo real desde fuentes de datos en vivo al momento que lo ejecutas, luego se valida y normaliza por nuestra capa de datos interna antes de llegar a ti. No almacenamos snapshots desactualizados para revenderlos semanas después. Nuestro contenido editorial publicado y guías se revisan con cadencia trimestral para reflejar cambios en leyes de título estatales y guía federal de retiros.",
      },
      {
        q: "¿Cuánto cuesta un reporte de CarCheckerVIN?",
        a: "Una decodificación VIN básica es genuinamente gratis sin necesidad de registro. Los reportes pagados de historial completo empiezan en $14.99. Nuestras guías de compra de autos también son gratis para leer sin paywall, porque creemos que los compradores informados toman mejores decisiones.",
      },
      {
        q: "¿Quién está detrás de CarCheckerVIN?",
        a: "CarCheckerVIN es construido por un pequeño equipo con experiencia combinada en ingeniería de datos automotrices, investigación de fraude de seguros, registros del DMV, inspección vehicular certificada ASE y soporte al cliente. Fundada en 2025, la compañía obtiene sus datos de proveedores aprobados por NMVTIS, NICB y APIs de fabricantes.",
      },
      {
        q: "¿Qué hago si encuentro un error en un reporte?",
        a: "Contacta a nuestro equipo y lo investigaremos personalmente. Cuando descubrimos o confirmamos una inexactitud, la corregimos en dos días hábiles y divulgamos el cambio en nuestro changelog. Puedes contactar al soporte por correo en contact@carcheckervin.com o por teléfono al +1 (564) 212-3985, lunes a viernes, 9:00 AM a 6:00 PM hora del Este.",
      },
    ],
  },
  fr: {
    breadcrumbHome: "Accueil",
    breadcrumbCurrent: "À propos",
    h1: "À propos de CarCheckerVIN",
    heroLead:
      "Nous construisons les rapports d'historique de véhicule que nous aurions aimé avoir quand nous achetions nos propres voitures d'occasion : précis, rapides, abordables et écrits en français clair.",
    missionHeading: "Notre mission",
    missionP1:
      "Chaque année, plus de 40 millions de véhicules d'occasion changent de mains aux États-Unis, et une proportion stupéfiante de ces acheteurs ne voit jamais de rapport d'historique de véhicule avant de signer. La raison n'est rarement de l'apathie. C'est le coût, la complexité et un marché dominé par des rapports legacy à prix premium que les petits concessionnaires et les acheteurs privés ne peuvent tout simplement pas justifier pour un seul véhicule.",
    missionP2:
      "CarCheckerVIN existe pour combler cet écart. Notre mission est de rendre les mêmes données de titre, de marques, de vol et de rappels faisant autorité — celles sur lesquelles s'appuient les compagnies d'assurance et les concessionnaires franchisés — disponibles à toute personne achetant une voiture, pour moins du prix d'un plein d'essence. Nous croyons que la transparence est l'outil le plus puissant qu'un acheteur possède, et nous croyons qu'elle ne devrait pas être réservée à ceux qui peuvent se permettre un rapport premium à trente dollars.",
    missionP3Pre: "Cette mission façonne chaque décision que nous prenons. C'est pourquoi notre",
    missionP3LinkVin: "vérification VIN gratuite",
    missionP3Mid: "est véritablement gratuite, pourquoi nos rapports payants commencent à $14.99, et pourquoi nous publions une bibliothèque grandissante de",
    missionP3LinkGuides: "guides d'achat de voitures",
    missionP3Suffix:
      "sans paywalls. Les acheteurs informés prennent de meilleures décisions, et de meilleures décisions créent un marché de voitures d'occasion plus sain pour tous.",
    howHeading: "Comment nous travaillons",
    howIntro:
      "Chaque rapport CarCheckerVIN est assemblé en temps réel à partir de plusieurs sources faisant autorité, puis validé et normalisé par notre couche de données interne avant de te parvenir. Nous ne stockons pas de snapshots obsolètes pour les revendre des semaines plus tard, et nous ne gonflons pas les rapports avec du contenu d'opérations de scraping de mauvaise qualité.",
    sources: [
      {
        title: "NMVTIS",
        body: "Le système fédéralement mandaté National Motor Vehicle Title Information System est notre source principale pour les marques de titre, les registres de ferraille et de salvage, et l'historique de titre inter-États.",
      },
      {
        title: "NICB",
        bodyPrefix:
          "Le National Insurance Crime Bureau fournit les registres de véhicules volés et de pertes totales qui alimentent notre",
        bodyLink: "vérification de véhicule volé",
        bodySuffix: ".",
      },
      {
        title: "APIs des fabricants",
        body: "Les intégrations OEM directes nous permettent de décoder les VINs au niveau de la finition et de faire ressortir les rappels ouverts et les bulletins de service technique directement depuis la source.",
      },
      {
        title: "Auto.dev",
        body: "Auto.dev fournit des spécifications supplémentaires, des évaluations de marché et des signaux d'historique d'annonces qui complètent chaque rapport CarCheckerVIN.",
      },
    ],
    accuracyHeading: "Notre engagement envers la précision",
    accuracyP1:
      "Notre équipe de données apporte plus de 35 ans d'expérience combinée en données automobiles, en enquête sur la fraude à l'assurance, en registres du DMV et en inspection de véhicules certifiée ASE. Chaque guide éditorial que nous publions est révisé par au moins un expert en la matière de l'équipe avant publication, et chaque changement de dataset est testé contre une suite de régression de plus de 5,000 véhicules connus avant d'atteindre la production.",
    accuracyP2:
      "Nous mettons à jour notre contenu sur une cadence trimestrielle pour refléter les changements dans les lois de titre des États, les nouvelles directives fédérales de rappels et les changements dans la manière dont les principaux fournisseurs de données rapportent l'information. Quand nous découvrons une inexactitude, nous la corrigeons en deux jours ouvrables et divulguons le changement dans notre changelog. Si tu repères un jour quelque chose qui semble erroné dans un rapport, notre équipe enquêtera et te répondra personnellement.",
    whyHeading: "Pourquoi nous avons construit CarCheckerVIN",
    whyP1:
      "Après avoir vu un membre de la famille se faire escroquer avec une voiture endommagée par une inondation qui avait été silencieusement re-titrée à travers trois États, notre fondateur a passé un week-end à essayer de démêler ce qu'un rapport à trente dollars aurait fait ressortir en quelques secondes. Les dommages avaient été bien dissimulés, le vendeur s'était montré confiant, et le titre avait l'air propre en surface. La vérité était enfouie dans des registres NMVTIS que presque aucun acheteur privé ne voit.",
    whyP2Pre:
      "Cette expérience est devenue la thèse centrale derrière CarCheckerVIN. Les données existent. Les outils existent. La seule chose qui manquait était un service qui les livre à un prix que les acheteurs ordinaires peuvent réellement se permettre et dans un format qu'ils peuvent réellement comprendre. Nous avons construit CarCheckerVIN pour que la prochaine famille n'ait pas à apprendre à la dure. Commence par une",
    whyP2LinkVin: "vérification VIN",
    whyP2Mid: "gratuite ou parcours nos",
    whyP2LinkGuides: "guides d'éducation pour acheteurs",
    whyP2Suffix: "pour voir ce que nous voulons dire.",
    teamHeading: "L'équipe",
    teamIntro:
      "CarCheckerVIN est construit par une petite équipe de vétérans en données automobiles, en enquête sur la fraude et en support client. De vraies personnes, une vraie expertise, une vraie responsabilité.",
    team: [
      {
        name: "Marcus Chen",
        role: "Fondateur et CEO",
        bio: "Marcus a passé 12 ans en ingénierie de données automobiles chez de grands assureurs avant de lancer CarCheckerVIN. Il a personnellement révisé plus de 200,000 registres de titre NMVTIS et construit l'architecture de tarification et de pipeline qui nous permet d'exécuter des rapports à une fraction du coût des fournisseurs legacy.",
      },
      {
        name: "Priya Anand",
        role: "Cheffe des données",
        bio: "Priya dirige nos partenariats de données et le travail d'intégration avec les fournisseurs approuvés par NMVTIS, NICB et les APIs OEM. Anciennement ingénieure principale dans une enchère automobile Fortune 100, elle a conçu la couche de validation qui détecte les registres obsolètes ou incohérents avant qu'ils n'atteignent un rapport client.",
      },
      {
        name: "Devon Whitfield",
        role: "Analyste de recherche principal",
        bio: "Devon est un technicien certifié ASE devenu analyste d'enquête avec une décennie d'expérience en détection de fraude dans un DMV d'État. Il est l'auteur de nos guides de format long sur le lavage de titre, le clonage de VIN et le retour en arrière du compteur kilométrique, et il révise chaque changement de source de données avant son envoi.",
      },
      {
        name: "Sara Okonkwo",
        role: "Responsable du succès client",
        bio: "Sara a aidé plus de 30,000 acheteurs à interpréter leurs rapports d'historique de véhicule et à négocier des accords équitables. Elle dirige notre équipe de support interne, édite le contenu éducatif pour acheteurs et répond personnellement aux cas escaladés en un jour ouvrable.",
      },
    ],
    contactHeading: "Contacte-nous",
    contactIntro:
      "Des questions sur un rapport, une source de données ou ton compte ? Notre équipe est prête à aider.",
    emailLabel: "Courriel",
    phoneLabel: "Téléphone",
    hoursLabel: "Heures",
    hoursValue: "Lundi au vendredi, 9h00 – 18h00 heure de l'Est",
    faqHeading: "Questions fréquentes",
    faqIntro:
      "Questions courantes sur qui nous sommes, d'où viennent nos données et comment fonctionnent nos rapports d'historique de véhicule.",
    ctaHeading: "Prêt à vérifier un véhicule ?",
    ctaBody:
      "Exécute un décodage VIN gratuit en quelques secondes, ou débloque un rapport d'historique complet pour $14.99.",
    faqs: [
      {
        q: "D'où CarCheckerVIN obtient-il ses données de véhicules ?",
        a: "CarCheckerVIN assemble chaque rapport en temps réel à partir de plusieurs sources faisant autorité. Les marques de titre, les registres de salvage et de ferraille proviennent de NMVTIS (le National Motor Vehicle Title Information System). Les registres de véhicules volés et de pertes totales proviennent du NICB (National Insurance Crime Bureau). Les APIs des fabricants fournissent le décodage VIN au niveau de la finition plus les rappels ouverts et les bulletins de service technique, et Auto.dev fournit des spécifications supplémentaires, des évaluations et des signaux d'historique d'annonces.",
      },
      {
        q: "CarCheckerVIN est-il affilié à Carfax ou AutoCheck ?",
        a: "Non. CarCheckerVIN est un service indépendant d'historique de véhicule et n'est pas affilié, soutenu ou détenu par Carfax, AutoCheck ou tout autre fournisseur de rapports. Nous puisons dans les mêmes types de sources de données fédérales et industrielles faisant autorité — NMVTIS, NICB et flux des fabricants — et offrons des rapports à un prix inférieur.",
      },
      {
        q: "Qu'est-ce que NMVTIS et pourquoi est-ce important ?",
        a: "NMVTIS — le National Motor Vehicle Title Information System — est une base de données fédéralement mandatée qui agrège les registres de titre et de marques des agences d'État de véhicules motorisés, des assureurs et des opérateurs de salvage et de ferraille. Comme elle puise dans chaque État, elle fait ressortir l'historique de titre inter-États qu'un seul titre papier peut cacher, ce qui en fait la colonne vertébrale d'une vérification honnête de l'historique de véhicule.",
      },
      {
        q: "À quel point les données d'un rapport CarCheckerVIN sont-elles à jour ?",
        a: "Chaque rapport est assemblé en temps réel à partir de sources de données en direct au moment où tu l'exécutes, puis validé et normalisé par notre couche de données interne avant de te parvenir. Nous ne stockons pas de snapshots obsolètes pour les revendre des semaines plus tard. Notre contenu éditorial publié et nos guides sont révisés sur une cadence trimestrielle pour refléter les changements dans les lois de titre des États et les directives fédérales de rappels.",
      },
      {
        q: "Combien coûte un rapport CarCheckerVIN ?",
        a: "Un décodage VIN de base est véritablement gratuit sans inscription requise. Les rapports d'historique complets payants commencent à $14.99. Nos guides d'achat de voitures sont également gratuits à lire sans paywall, parce que nous croyons que les acheteurs informés prennent de meilleures décisions.",
      },
      {
        q: "Qui est derrière CarCheckerVIN ?",
        a: "CarCheckerVIN est construit par une petite équipe avec une expérience combinée en ingénierie de données automobiles, en enquête sur la fraude à l'assurance, en registres du DMV, en inspection de véhicules certifiée ASE et en support client. Fondée en 2025, l'entreprise obtient ses données de fournisseurs approuvés par NMVTIS, du NICB et des APIs des fabricants.",
      },
      {
        q: "Que dois-je faire si je trouve une erreur dans un rapport ?",
        a: "Contacte notre équipe et nous enquêterons personnellement. Quand nous découvrons ou confirmons une inexactitude, nous la corrigeons en deux jours ouvrables et divulguons le changement dans notre changelog. Tu peux contacter le support par courriel à contact@carcheckervin.com ou par téléphone au +1 (564) 212-3985, du lundi au vendredi, de 9h00 à 18h00 heure de l'Est.",
      },
    ],
  },
} as const;

const SOURCE_ICONS = [Database, Shield, Award, Users] as const;

export default function AboutPageBody({
  locale = "en",
}: {
  locale?: Locale;
}) {
  const copy = COPY[locale];
  const homeHref = locale === "es" ? "/es" : "/";
  const vinHref = locale === "es" ? "/es/revision-vin" : "/vin-check";
  const guidesHref = locale === "es" ? "/es/guias" : "/guides";
  const stolenHref = locale === "es" ? "/es/vehiculo-robado" : "/stolen-vehicle-check";

  return (
    <>
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white pt-28 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-5 [&_a]:text-primary-100 [&_a:hover]:text-white [&_span]:text-white [&_li_span]:text-primary-200">
            <Breadcrumbs
              onDark
              items={[
                { label: copy.breadcrumbHome, href: homeHref },
                { label: copy.breadcrumbCurrent },
              ]}
            />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold">{copy.h1}</h1>
          <p className="mt-5 text-lg text-primary-100 max-w-2xl leading-relaxed">
            {copy.heroLead}
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900">{copy.missionHeading}</h2>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">{copy.missionP1}</p>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">{copy.missionP2}</p>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            {copy.missionP3Pre}{" "}
            <Link href={vinHref} className="text-primary-600 hover:underline font-medium">
              {copy.missionP3LinkVin}
            </Link>{" "}
            {copy.missionP3Mid}{" "}
            <Link href={guidesHref} className="text-primary-600 hover:underline font-medium">
              {copy.missionP3LinkGuides}
            </Link>{" "}
            {copy.missionP3Suffix}
          </p>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900">{copy.howHeading}</h2>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">{copy.howIntro}</p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
            {copy.sources.map((s, i) => {
              const Icon = SOURCE_ICONS[i];
              const isNICB = "bodyLink" in s;
              return (
                <div key={s.title} className="p-6 bg-white rounded-2xl border border-slate-200">
                  <Icon className="w-8 h-8 text-primary-600" />
                  <h3 className="mt-3 text-lg font-bold text-slate-900">{s.title}</h3>
                  <p className="mt-2 text-slate-600 leading-relaxed">
                    {isNICB ? (
                      <>
                        {s.bodyPrefix}{" "}
                        <Link
                          href={stolenHref}
                          className="text-primary-600 hover:underline"
                        >
                          {s.bodyLink}
                        </Link>
                        {s.bodySuffix}
                      </>
                    ) : (
                      s.body
                    )}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900">{copy.accuracyHeading}</h2>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">{copy.accuracyP1}</p>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">{copy.accuracyP2}</p>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900">{copy.whyHeading}</h2>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">{copy.whyP1}</p>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            {copy.whyP2Pre}{" "}
            <Link href={vinHref} className="text-primary-600 hover:underline font-medium">
              {copy.whyP2LinkVin}
            </Link>{" "}
            {copy.whyP2Mid}{" "}
            <Link href={guidesHref} className="text-primary-600 hover:underline font-medium">
              {copy.whyP2LinkGuides}
            </Link>{" "}
            {copy.whyP2Suffix}
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold text-slate-900">{copy.teamHeading}</h2>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed">{copy.teamIntro}</p>
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
            {copy.team.map((member) => (
              <div
                key={member.name}
                className="p-6 bg-white rounded-2xl border border-slate-200"
              >
                <h3 className="text-xl font-bold text-slate-900">{member.name}</h3>
                <p className="text-primary-600 font-medium">{member.role}</p>
                <p className="mt-3 text-slate-600 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900">{copy.contactHeading}</h2>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">{copy.contactIntro}</p>
          <div className="mt-6 space-y-4">
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-primary-600 mt-1" />
              <div>
                <div className="font-semibold text-slate-900">{copy.emailLabel}</div>
                <a
                  href="mailto:contact@carcheckervin.com"
                  className="text-primary-600 hover:underline"
                >
                  contact@carcheckervin.com
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-primary-600 mt-1" />
              <div>
                <div className="font-semibold text-slate-900">{copy.phoneLabel}</div>
                <a href="tel:+15642123985" className="text-primary-600 hover:underline">
                  +1 (564) 212-3985
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-primary-600 mt-1" />
              <div>
                <div className="font-semibold text-slate-900">{copy.hoursLabel}</div>
                <div className="text-slate-600">{copy.hoursValue}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900">{copy.faqHeading}</h2>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">{copy.faqIntro}</p>
          <div className="mt-8 space-y-3">
            {copy.faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-2xl border border-slate-200 bg-white p-5 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                  <span className="text-lg font-bold text-slate-900 pr-2">{f.q}</span>
                  <span className="flex-shrink-0 mt-0.5 text-primary-600 text-2xl font-light leading-none group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-slate-600 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">{copy.ctaHeading}</h2>
          <p className="text-slate-700 mb-8">{copy.ctaBody}</p>
          <VinSearchForm size="sm" locale={locale} />
        </div>
      </section>
    </>
  );
}

export { COPY as ABOUT_COPY };
