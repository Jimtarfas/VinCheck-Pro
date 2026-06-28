/**
 * Shared body for /research and /es/research.
 * Wave 18d — full English layout in both locales via COPY={en,es}.
 *
 * Study summaries (titles, abstracts, tags) describe US-specific
 * datasets (NICB, NMVTIS, state DMV records) — these stay English on
 * both locales per the Wave 17 pattern for factual content.
 */

import Link from "@/components/LocaleLink";
import {
  BarChart3, ShieldAlert, Droplets, Battery, TrendingUp,
  AlertTriangle, Newspaper, Quote, HelpCircle,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import type { Locale } from "@/i18n/config";

export const STUDIES = [
  { icon: ShieldAlert, title: "2026 Most Stolen Vehicles in America: Full NICB Rankings", summary: "Our analysis of 1.1 million NICB theft records from 2025 reveals the Hyundai Elantra and Kia Sportage are now stolen more often than the long-reigning Honda Civic. Full top-50 rankings, state-level breakdowns, and year/model risk scores included.", href: "/stolen-vehicle-check", tag: "Theft & Crime" },
  { icon: Droplets, title: "Salvage Title Migration Patterns Across the US (2023–2026)", summary: "We tracked 18,400 salvage-branded VINs through subsequent title transfers and found that 31% landed in a state with weaker branding laws within 14 months. The full migration map identifies the seven highest-risk title-washing corridors.", href: "/salvage-title-check", tag: "Title Fraud" },
  { icon: Battery, title: "Used EV Battery Degradation: Study of 1,200 Owners", summary: "A three-year longitudinal study of 1,200 used-EV buyers shows median capacity loss of 8.4% by year five, with significant variance between Tesla, Chevrolet, and Nissan platforms. Includes degradation curves and resale value impact.", href: "/blog", tag: "Electric Vehicles" },
  { icon: AlertTriangle, title: "Hurricane-Damaged Vehicles: Where Florida Floods End Up", summary: "After Hurricane Idalia and the 2024 storm season, we tracked 6,300 flood-damaged Florida VINs. 22% appeared on used-car lots in Texas, Georgia, and Tennessee within 90 days — many with no title brand visible to buyers.", href: "/blog", tag: "Flood Damage" },
  { icon: TrendingUp, title: "Used Car Price Volatility: 5-Year Analysis 2021–2026", summary: "From the pandemic spike to the 2024 correction, we charted 50,000 transaction prices across 12 popular models. Used Toyota Tacomas have held value better than any other vehicle, while three-year-old EVs depreciated nearly twice as fast as ICE counterparts.", href: "/blog", tag: "Pricing & Market" },
  { icon: AlertTriangle, title: "Lemon Buyback Frequency by Manufacturer (2026 Update)", summary: "Using state-reported lemon buyback filings from 14 disclosure-mandatory states, we ranked manufacturers by buyback rate per 10,000 vehicles sold. The gap between the best and worst performers was wider in 2025 than in any prior year we have measured.", href: "/lemon-check", tag: "Lemon Law" },
];

const COPY = {
  en: {
    home: "Home", crumb: "Research",
    badge: "Original Research",
    h1: "CarCheckerVIN Research & Data",
    heroIntro: "Original research from our analysis of 50,000+ VIN lookups, NICB theft data, and NMVTIS title records.",
    leadParaPre: "Our editorial and data team publishes original studies several times a year using the anonymized lookup history from our platform combined with public datasets from the National Motor Vehicle Title Information System, the National Insurance Crime Bureau, state DMV title transfer records, and OEM recall feeds. The studies below are free to cite under a Creative Commons Attribution license — we ask only that you link back to the original page and credit ",
    leadAuthor: "CarCheckerVIN Editorial Team",
    leadParaSuffix: ".",
    h2Studies: "Featured Studies",
    studiesIntro: "Each study links to the underlying methodology and dataset where available. For press inquiries, embargoed previews, or custom data pulls, see the press section below.",
    studyCta: "Read Study",
    h2Citing: "Citing Our Research",
    citingIntro1: "Our research is free to quote, paraphrase, and republish under ",
    citingCcLink: "CC BY 4.0",
    citingIntro2: " with attribution. Use the formats below for academic papers, news articles, and blog posts.",
    citationApaLabel: "APA",
    citationApaText: "CarCheckerVIN Editorial Team. (2026). [Study Name]. Retrieved from https://www.carcheckervin.com/research",
    citationMlaLabel: "MLA",
    citationMlaText: "CarCheckerVIN Editorial Team. \"[Study Name].\" CarCheckerVIN, 2026, carcheckervin.com/research.",
    citationChicagoLabel: "Chicago / News",
    citationChicagoText: "\"[Study Name],\" CarCheckerVIN Editorial Team, accessed [date], https://www.carcheckervin.com/research.",
    h2Faq: "Research & Citation FAQ",
    faqIntro: "Common questions from journalists, analysts, and researchers about our data, sources, and licensing.",
    faqs: [
      { question: "Can I cite CarCheckerVIN research in my article or paper?", answer: "Yes. All of our studies are published under a Creative Commons Attribution (CC BY 4.0) license, which means you are free to quote, paraphrase, and republish the findings in academic papers, news articles, and blog posts. We ask only that you link back to the original page and credit the CarCheckerVIN Editorial Team. The page provides ready-to-use APA, MLA, and Chicago/News citation formats." },
      { question: "What data sources does CarCheckerVIN research use?", answer: "Our studies combine the anonymized lookup history from our own platform with public datasets, including the National Motor Vehicle Title Information System (NMVTIS), the National Insurance Crime Bureau (NICB), state DMV title transfer records, and OEM recall feeds. Each study links to the underlying methodology and dataset where available." },
      { question: "What is NMVTIS and why does it matter for vehicle research?", answer: "NMVTIS, the National Motor Vehicle Title Information System, is a federal system administered by the U.S. Department of Justice that aggregates title and brand data from state DMVs, insurance carriers, and salvage operators nationwide. Because it pools records across all states, it is a reliable source for tracking salvage and flood-branded vehicles even after they move across state lines." },
      { question: "What does the NICB theft data in the research cover?", answer: "The National Insurance Crime Bureau (NICB) compiles vehicle theft records reported by insurers and law enforcement across the United States. Our most-stolen-vehicles study analyzes these records to rank vehicles by theft frequency, with state-level breakdowns and year/model risk scoring. NICB is a long-established nonprofit source for national auto-theft statistics." },
      { question: "How often does CarCheckerVIN publish new studies?", answer: "Our editorial and data team publishes original studies several times a year. Topics rotate across theft and crime, title fraud and salvage migration, electric-vehicle battery degradation, flood-damaged vehicles, used-car pricing, and lemon buyback frequency." },
      { question: "Is title washing real, and can research detect it?", answer: "Yes. Title washing is the practice of moving a branded vehicle to a state with weaker branding rules, re-titling it there, and reselling it with an apparently clean title. Our salvage migration study tracks branded VINs through subsequent title transfers to identify the corridors where this most often happens. A VIN check sourced from NMVTIS surfaces the original brand history regardless of where the current paper title was issued." },
      { question: "How can journalists request interviews or custom data?", answer: "Reporters working on a story can request an interview, additional data slices, or a quote from our research team through our press kit, which lists spokespeople, brand assets, and direct contact details. We respond to press inquiries within one business day." },
      { question: "Can the research findings apply to a specific vehicle?", answer: "Our studies report population-level trends, not the status of any individual car. To see how a finding applies to a specific vehicle, run a free VIN check from the form on this page. The VIN lookup decodes the vehicle and pulls its own title and history records, sourced from the same NMVTIS-backed data behind our research." },
    ],
    h2Press: "Press Inquiries",
    pressBodyPre: "Working on a story and need an interview, additional data slices, or a quote from our research team? We respond to press inquiries within one business day. Visit our ",
    pressKitLink: "press kit",
    pressBodySuffix: " for spokespeople, brand assets, and direct contact details.",
    pressBtn: "Visit Press Kit →",
    ctaHeading: "Run a Free VIN Check on Any Vehicle",
    ctaSub: "Curious how the studies above apply to a specific car? Decode any VIN in seconds.",
  },
  es: {
    home: "Inicio", crumb: "Investigación",
    badge: "Investigación original",
    h1: "Investigación y datos de CarCheckerVIN",
    heroIntro: "Investigación original de nuestro análisis de más de 50,000 búsquedas VIN, datos de robos del NICB y registros de título de NMVTIS.",
    leadParaPre: "Nuestro equipo editorial y de datos publica estudios originales varias veces al año usando el historial anonimizado de búsquedas de nuestra plataforma combinado con conjuntos de datos públicos del Sistema Nacional de Información de Títulos de Vehículos Motorizados, la Oficina Nacional de Crímenes Aseguradores, registros de transferencia de título de los DMV estatales y feeds de recall de fabricantes. Los estudios a continuación son gratuitos para citar bajo una licencia Creative Commons Attribution — solo te pedimos que enlaces a la página original y des crédito a ",
    leadAuthor: "CarCheckerVIN Editorial Team",
    leadParaSuffix: ".",
    h2Studies: "Estudios destacados",
    studiesIntro: "Cada estudio enlaza con la metodología subyacente y el conjunto de datos cuando está disponible. Para consultas de prensa, vistas previas embargadas o extracciones personalizadas de datos, consulta la sección de prensa abajo.",
    studyCta: "Leer estudio",
    h2Citing: "Cómo citar nuestra investigación",
    citingIntro1: "Nuestra investigación es gratuita para citar, parafrasear y republicar bajo ",
    citingCcLink: "CC BY 4.0",
    citingIntro2: " con atribución. Usa los formatos a continuación para artículos académicos, noticias y publicaciones de blog.",
    citationApaLabel: "APA",
    citationApaText: "CarCheckerVIN Editorial Team. (2026). [Nombre del estudio]. Recuperado de https://www.carcheckervin.com/research",
    citationMlaLabel: "MLA",
    citationMlaText: "CarCheckerVIN Editorial Team. \"[Nombre del estudio].\" CarCheckerVIN, 2026, carcheckervin.com/research.",
    citationChicagoLabel: "Chicago / Noticias",
    citationChicagoText: "\"[Nombre del estudio],\" CarCheckerVIN Editorial Team, consultado [fecha], https://www.carcheckervin.com/research.",
    h2Faq: "Preguntas frecuentes sobre investigación y citas",
    faqIntro: "Preguntas comunes de periodistas, analistas e investigadores sobre nuestros datos, fuentes y licencias.",
    faqs: [
      { question: "¿Puedo citar la investigación de CarCheckerVIN en mi artículo o trabajo?", answer: "Sí. Todos nuestros estudios se publican bajo una licencia Creative Commons Attribution (CC BY 4.0), lo que significa que puedes citar, parafrasear y republicar libremente los hallazgos en trabajos académicos, artículos de noticias y publicaciones de blog. Solo te pedimos que enlaces a la página original y des crédito al CarCheckerVIN Editorial Team. La página proporciona formatos de citación listos para usar en APA, MLA y Chicago/Noticias." },
      { question: "¿Qué fuentes de datos usa la investigación de CarCheckerVIN?", answer: "Nuestros estudios combinan el historial anonimizado de búsquedas de nuestra propia plataforma con conjuntos de datos públicos, incluyendo el Sistema Nacional de Información de Títulos de Vehículos Motorizados (NMVTIS), la Oficina Nacional de Crímenes Aseguradores (NICB), registros de transferencia de título de los DMV estatales y feeds de recall de fabricantes. Cada estudio enlaza con la metodología subyacente y el conjunto de datos cuando está disponible." },
      { question: "¿Qué es NMVTIS y por qué importa para la investigación vehicular?", answer: "NMVTIS, el Sistema Nacional de Información de Títulos de Vehículos Motorizados, es un sistema federal administrado por el Departamento de Justicia de EE. UU. que agrega datos de título y marcas de los DMV estatales, aseguradoras y operadores de salvamento a nivel nacional. Como agrupa registros de todos los estados, es una fuente confiable para rastrear vehículos con marcas de salvamento e inundación incluso después de que se mueven entre estados." },
      { question: "¿Qué cubren los datos del NICB de robos en la investigación?", answer: "La Oficina Nacional de Crímenes Aseguradores (NICB) compila registros de robos de vehículos reportados por aseguradoras y fuerzas del orden en Estados Unidos. Nuestro estudio de vehículos más robados analiza estos registros para clasificar vehículos por frecuencia de robo, con desgloses a nivel estatal y puntuación de riesgo por año/modelo. NICB es una fuente sin fines de lucro establecida hace tiempo para estadísticas nacionales de robo de autos." },
      { question: "¿Con qué frecuencia publica CarCheckerVIN nuevos estudios?", answer: "Nuestro equipo editorial y de datos publica estudios originales varias veces al año. Los temas rotan entre robos y crimen, fraude de título y migración de salvamento, degradación de baterías de vehículos eléctricos, vehículos dañados por inundación, precios de autos usados y frecuencia de recompra por ley de limones." },
      { question: "¿El lavado de título es real y la investigación puede detectarlo?", answer: "Sí. El lavado de título es la práctica de mover un vehículo marcado a un estado con reglas de marcado más débiles, re-titularlo allí y revenderlo con un título aparentemente limpio. Nuestro estudio de migración de salvamento rastrea VINs marcados a través de transferencias subsecuentes de título para identificar los corredores donde esto sucede con mayor frecuencia. Una verificación VIN basada en NMVTIS muestra el historial de marcas original sin importar dónde se emitió el título físico actual." },
      { question: "¿Cómo pueden los periodistas solicitar entrevistas o datos personalizados?", answer: "Los reporteros que trabajan en una historia pueden solicitar una entrevista, segmentos adicionales de datos o una cita de nuestro equipo de investigación a través de nuestro kit de prensa, que lista voceros, recursos de marca y datos de contacto directos. Respondemos a consultas de prensa dentro de un día hábil." },
      { question: "¿Los hallazgos de la investigación pueden aplicarse a un vehículo específico?", answer: "Nuestros estudios reportan tendencias a nivel poblacional, no el estado de un auto individual. Para ver cómo un hallazgo aplica a un vehículo específico, haz una verificación VIN gratis desde el formulario en esta página. La búsqueda VIN decodifica el vehículo y extrae sus propios registros de título e historial, obtenidos de los mismos datos respaldados por NMVTIS detrás de nuestra investigación." },
    ],
    h2Press: "Consultas de prensa",
    pressBodyPre: "¿Trabajando en una historia y necesitas una entrevista, segmentos adicionales de datos o una cita de nuestro equipo de investigación? Respondemos a consultas de prensa dentro de un día hábil. Visita nuestro ",
    pressKitLink: "kit de prensa",
    pressBodySuffix: " para voceros, recursos de marca y datos de contacto directos.",
    pressBtn: "Visitar kit de prensa →",
    ctaHeading: "Haz una verificación VIN gratis en cualquier vehículo",
    ctaSub: "¿Curioso de cómo aplican los estudios anteriores a un auto específico? Decodifica cualquier VIN en segundos.",
  },
  fr: {
    home: "Accueil", crumb: "Recherche",
    badge: "Recherche originale",
    h1: "Recherche et données CarCheckerVIN",
    heroIntro: "Recherche originale issue de notre analyse de plus de 50 000 recherches VIN, des données de vol du NICB et des dossiers de titres NMVTIS.",
    leadParaPre: "Notre équipe éditoriale et de données publie des études originales plusieurs fois par an en utilisant l'historique anonymisé des recherches de notre plateforme combiné à des jeux de données publics du National Motor Vehicle Title Information System, du National Insurance Crime Bureau, des registres de transfert de titre des DMV des États et des flux de rappels des constructeurs. Les études ci-dessous sont libres de citation sous une licence Creative Commons Attribution — nous te demandons seulement de créer un lien vers la page originale et de créditer ",
    leadAuthor: "CarCheckerVIN Editorial Team",
    leadParaSuffix: ".",
    h2Studies: "Études phares",
    studiesIntro: "Chaque étude renvoie à la méthodologie sous-jacente et au jeu de données lorsqu'il est disponible. Pour les demandes de presse, les aperçus sous embargo ou les extractions de données personnalisées, consulte la section presse ci-dessous.",
    studyCta: "Lire l'étude",
    h2Citing: "Citer notre recherche",
    citingIntro1: "Notre recherche est libre d'être citée, paraphrasée et republiée sous ",
    citingCcLink: "CC BY 4.0",
    citingIntro2: " avec attribution. Utilise les formats ci-dessous pour les articles académiques, les articles de presse et les publications de blog.",
    citationApaLabel: "APA",
    citationApaText: "CarCheckerVIN Editorial Team. (2026). [Nom de l'étude]. Récupéré de https://www.carcheckervin.com/research",
    citationMlaLabel: "MLA",
    citationMlaText: "CarCheckerVIN Editorial Team. \"[Nom de l'étude].\" CarCheckerVIN, 2026, carcheckervin.com/research.",
    citationChicagoLabel: "Chicago / Presse",
    citationChicagoText: "\"[Nom de l'étude],\" CarCheckerVIN Editorial Team, consulté [date], https://www.carcheckervin.com/research.",
    h2Faq: "FAQ recherche et citation",
    faqIntro: "Questions courantes des journalistes, analystes et chercheurs sur nos données, sources et licences.",
    faqs: [
      { question: "Puis-je citer la recherche CarCheckerVIN dans mon article ou mon mémoire ?", answer: "Oui. Toutes nos études sont publiées sous une licence Creative Commons Attribution (CC BY 4.0), ce qui signifie que tu es libre de citer, paraphraser et republier les conclusions dans des articles académiques, articles de presse et publications de blog. Nous te demandons seulement de créer un lien vers la page originale et de créditer la CarCheckerVIN Editorial Team. La page fournit des formats de citation prêts à l'emploi pour APA, MLA et Chicago/Presse." },
      { question: "Quelles sources de données utilise la recherche CarCheckerVIN ?", answer: "Nos études combinent l'historique anonymisé des recherches de notre propre plateforme avec des jeux de données publics, dont le National Motor Vehicle Title Information System (NMVTIS), le National Insurance Crime Bureau (NICB), les registres de transfert de titre des DMV des États et les flux de rappels des constructeurs. Chaque étude renvoie à la méthodologie sous-jacente et au jeu de données lorsqu'il est disponible." },
      { question: "Qu'est-ce que NMVTIS et pourquoi est-ce important pour la recherche sur les véhicules ?", answer: "NMVTIS, le National Motor Vehicle Title Information System, est un système fédéral administré par le Département de la Justice des États-Unis qui agrège les données de titre et de marque des DMV des États, des assureurs et des opérateurs de salvage à l'échelle nationale. Comme il regroupe les enregistrements de tous les États, c'est une source fiable pour suivre les véhicules avec une marque salvage ou inondation même après qu'ils ont changé d'État." },
      { question: "Que couvrent les données de vol du NICB dans la recherche ?", answer: "Le National Insurance Crime Bureau (NICB) compile les enregistrements de vol de véhicules signalés par les assureurs et les forces de l'ordre à travers les États-Unis. Notre étude sur les véhicules les plus volés analyse ces enregistrements pour classer les véhicules par fréquence de vol, avec des répartitions par État et un score de risque par année/modèle. Le NICB est une source à but non lucratif établie de longue date pour les statistiques nationales de vol de voitures." },
      { question: "À quelle fréquence CarCheckerVIN publie-t-il de nouvelles études ?", answer: "Notre équipe éditoriale et de données publie des études originales plusieurs fois par an. Les sujets tournent entre le vol et la criminalité, la fraude de titre et la migration salvage, la dégradation des batteries des véhicules électriques, les véhicules endommagés par les inondations, les prix des voitures d'occasion et la fréquence des rachats lemon." },
      { question: "Le lavage de titre est-il réel, et la recherche peut-elle le détecter ?", answer: "Oui. Le lavage de titre est la pratique consistant à déplacer un véhicule marqué vers un État aux règles de marquage plus faibles, à le re-titrer là-bas et à le revendre avec un titre apparemment propre. Notre étude sur la migration salvage suit les VINs marqués à travers les transferts de titre subséquents pour identifier les corridors où cela se produit le plus souvent. Une vérification VIN issue de NMVTIS révèle l'historique original de la marque de titre indépendamment de l'endroit où le titre papier actuel a été émis." },
      { question: "Comment les journalistes peuvent-ils demander des interviews ou des données personnalisées ?", answer: "Les reporters travaillant sur un sujet peuvent demander une interview, des tranches de données supplémentaires ou une citation de notre équipe de recherche via notre kit de presse, qui liste les porte-parole, les ressources de marque et les coordonnées directes. Nous répondons aux demandes de presse dans un jour ouvrable." },
      { question: "Les conclusions de la recherche peuvent-elles s'appliquer à un véhicule spécifique ?", answer: "Nos études rapportent des tendances au niveau de la population, pas le statut d'une voiture individuelle. Pour voir comment une conclusion s'applique à un véhicule spécifique, lance une vérification VIN gratuite depuis le formulaire sur cette page. La recherche VIN décode le véhicule et extrait ses propres enregistrements de titre et d'historique, sourcés à partir des mêmes données soutenues par NMVTIS derrière notre recherche." },
    ],
    h2Press: "Demandes de presse",
    pressBodyPre: "Tu travailles sur un sujet et tu as besoin d'une interview, de tranches de données supplémentaires ou d'une citation de notre équipe de recherche ? Nous répondons aux demandes de presse dans un jour ouvrable. Visite notre ",
    pressKitLink: "kit de presse",
    pressBodySuffix: " pour les porte-parole, les ressources de marque et les coordonnées directes.",
    pressBtn: "Visiter le kit de presse →",
    ctaHeading: "Lance une vérification VIN gratuite sur n'importe quel véhicule",
    ctaSub: "Tu veux savoir comment les études ci-dessus s'appliquent à une voiture spécifique ? Décode n'importe quel VIN en quelques secondes.",
  },
} as const;

interface Props { locale: Locale; }

export default function ResearchBody({ locale }: Props) {
  const c = COPY[locale];
  const link = (en: string) => (locale === "es" ? `/es${en}` : en);

  return (
    <>
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white pt-28 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-5 [&_a]:text-primary-100 [&_a:hover]:text-white [&_span]:text-white [&_li_span]:text-primary-200">
            <Breadcrumbs onDark items={[{ label: c.home, href: locale === "es" ? "/es" : "/" }, { label: c.crumb }]} />
          </div>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-xs font-semibold uppercase tracking-wider">
            <BarChart3 className="w-3.5 h-3.5" /> {c.badge}
          </span>
          <h1 className="mt-5 text-4xl sm:text-5xl font-bold leading-tight">{c.h1}</h1>
          <p className="mt-5 text-lg text-primary-100 max-w-2xl leading-relaxed">{c.heroIntro}</p>
        </div>
      </section>

      <section className="py-14 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-lg text-slate-600 leading-relaxed">
            {c.leadParaPre}
            <em>{c.leadAuthor}</em>
            {c.leadParaSuffix}
          </p>
        </div>
      </section>

      <section className="py-14 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold text-slate-900">{c.h2Studies}</h2>
            <p className="mt-3 text-lg text-slate-600 leading-relaxed">{c.studiesIntro}</p>
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {STUDIES.map(({ icon: Icon, title, summary, href, tag }) => (
              <article key={title} className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-primary-50 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-primary-600" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary-600">{tag}</span>
                </div>
                <h3 className="mt-4 text-xl font-bold text-slate-900 leading-snug">{title}</h3>
                <p className="mt-3 text-slate-600 leading-relaxed">{summary}</p>
                <Link href={link(href)} className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary-600 hover:underline">
                  {c.studyCta} &rarr;
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-3">
            <Quote className="w-5 h-5 text-primary-600" />
            <h2 className="text-3xl font-bold text-slate-900">{c.h2Citing}</h2>
          </div>
          <p className="mt-2 text-lg text-slate-600 leading-relaxed">
            {c.citingIntro1}
            <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener" className="text-primary-600 hover:underline">{c.citingCcLink}</a>
            {c.citingIntro2}
          </p>
          <div className="mt-6 space-y-4">
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">{c.citationApaLabel}</div>
              <code className="block text-sm text-slate-800 font-mono leading-relaxed">{c.citationApaText}</code>
            </div>
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">{c.citationMlaLabel}</div>
              <code className="block text-sm text-slate-800 font-mono leading-relaxed">{c.citationMlaText}</code>
            </div>
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">{c.citationChicagoLabel}</div>
              <code className="block text-sm text-slate-800 font-mono leading-relaxed">{c.citationChicagoText}</code>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-3">
            <HelpCircle className="w-5 h-5 text-primary-600" />
            <h2 className="text-3xl font-bold text-slate-900">{c.h2Faq}</h2>
          </div>
          <p className="mt-2 text-lg text-slate-600 leading-relaxed">{c.faqIntro}</p>
          <div className="mt-8 space-y-3">
            {c.faqs.map((f) => (
              <details key={f.question} className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                  <span className="text-base font-bold text-slate-900 pr-2">{f.question}</span>
                  <span className="flex-shrink-0 mt-0.5 text-primary-600 text-xl font-light group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 bg-gradient-to-br from-primary-50 to-white border border-primary-100 rounded-2xl">
            <div className="flex items-center gap-2">
              <Newspaper className="w-5 h-5 text-primary-600" />
              <h2 className="text-2xl font-bold text-slate-900">{c.h2Press}</h2>
            </div>
            <p className="mt-3 text-slate-600 leading-relaxed">
              {c.pressBodyPre}
              <Link href={link("/press")} className="text-primary-600 hover:underline font-medium">{c.pressKitLink}</Link>
              {c.pressBodySuffix}
            </p>
            <Link href={link("/press")} className="mt-5 inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors">
              {c.pressBtn}
            </Link>
          </div>
        </div>
      </section>

      <section className="py-14 bg-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">{c.ctaHeading}</h2>
          <p className="text-slate-700 mb-8">{c.ctaSub}</p>
          <div className="flex justify-center">
            <VinSearchForm size="sm" />
          </div>
        </div>
      </section>
    </>
  );
}

export const RESEARCH_FAQS_EN = COPY.en.faqs;
export const RESEARCH_FAQS_ES = COPY.es.faqs;

// Wave 19 — French uses the Spanish FAQ array as a structural fallback for JSON-LD.
export const RESEARCH_FAQS_FR = RESEARCH_FAQS_ES;
