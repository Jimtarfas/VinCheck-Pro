/**
 * Shared body for /press and /es/prensa.
 * Wave 16c — identical JSX, locale-driven copy.
 */

import Link from "next/link";
import {
  Newspaper,
  Download,
  Image as ImageIcon,
  FileText,
  Users,
  Mail,
  Phone,
  Calendar,
  Building2,
  Award,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import type { Locale } from "@/i18n/config";

const COPY = {
  en: {
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Press",
    badge: "Media Center",
    h1: "Press Kit & Media Center",
    heroLead:
      "Everything journalists, podcasters, and analysts need to write accurately about CarCheckerVIN: company facts, downloadable brand assets, named spokespeople, and direct contact lines for press inquiries.",
    factsHeading: "Quick Facts About CarCheckerVIN",
    factsIntro:
      "The numbers and details most commonly requested by reporters. Everything below is cleared for publication.",
    missionHeading: "Our Mission",
    missionBodyPre:
      "CarCheckerVIN exists to put the same authoritative title, theft, and recall data that insurance companies and franchise dealers rely on into the hands of every used-car buyer in America — for less than the price of a tank of gas. We believe transparency is the single most powerful tool a buyer has, and that it should not be reserved for the people who can afford a thirty-dollar premium report. Read the full story on our",
    missionLink: "About page",
    missionSuffix: ".",
    coverageHeading: "Media Coverage",
    coverageIntroPre: "Featured in:",
    coverageIntroPlaceholder: "[logos coming soon]",
    coverageCard: "Coming soon",
    brandHeading: "Brand Assets",
    brandIntro:
      "Download our logo and brand guidelines. Please use only the official assets below and follow the color and clear-space rules in the guidelines PDF.",
    brandSvgTitle: "Download Logo (SVG)",
    brandSvgSub: "Vector, recommended for digital use.",
    brandPngTitle: "Download Logo (PNG)",
    brandPngSub: "Transparent background, 2x retina-ready.",
    brandPdfTitle: "Brand Guidelines PDF",
    brandPdfSub: "Colors, typography, clear-space, do/don't.",
    brandDownload: "Download",
    spokespeopleHeading: "Spokespeople",
    spokespeopleIntro:
      "Available for interviews, podcasts, and on-the-record commentary. For fastest response, route initial inquiries through our communications lead.",
    announcementsHeading: "Recent Announcements",
    pressContactHeading: "Press Inquiries Contact",
    pressContactBody:
      "For interviews, embargoed previews, custom data pulls, and fact-check requests, reach our communications team directly. We respond to press inquiries within one business day.",
    pressContactAreaServed: "United States — replies in English",
    faqHeading: "Press FAQ",
    faqIntro:
      "The questions journalists, podcasters, and analysts ask most often about CarCheckerVIN.",
    ctaHeading: "Need More Than the Press Kit?",
    ctaBody:
      "For partnership inquiries, sponsorships, or general questions, reach our team through our standard contact channel.",
    ctaButton: "Contact Us →",
    facts: [
      { label: "Founded", value: "2025" },
      { label: "Lifetime VIN Lookups", value: "50,000+" },
      { label: "Data Sources", value: "NMVTIS, NICB, OEM APIs, Auto.dev" },
      { label: "Headquarters", value: "United States" },
      { label: "Reports per Year", value: "300,000+" },
      { label: "Dealer Partners", value: "5,000+" },
    ],
    spokespeople: [
      { name: "Marcus Chen", role: "Founder & CEO", bio: "12 years in automotive data engineering at major insurance carriers; available for interviews on used-car fraud, NMVTIS policy, and dealer pricing." },
      { name: "Priya Anand", role: "Head of Data", bio: "Former lead engineer at a Fortune 100 auto auction; speaks to vehicle data integrity, OEM API integration, and recall reporting." },
      { name: "Devon Whitfield", role: "Lead Research Analyst", bio: "ASE-certified, decade in DMV fraud detection; available for commentary on title washing, VIN cloning, and odometer rollback." },
      { name: "Sara Okonkwo", role: "Communications Lead", bio: "Primary press contact, manages all media requests, embargoed previews, and custom data pulls for journalists and researchers." },
    ],
    announcements: [
      { date: "April 2026", title: "Launched comprehensive blog with 100+ articles", body: "Long-form buyer education library covering every major car-buying decision, with topics ranging from VIN basics to multi-state title transfers." },
      { date: "March 2026", title: "50 state-specific buyer guides published", body: "Complete coverage of state-by-state used-car laws, salvage thresholds, and DMV procedures — written and reviewed by our internal data team." },
      { date: "February 2026", title: "Sanity CMS integration", body: "Migrated long-form editorial content into a structured CMS to support faster publishing, better SEO, and richer cross-linking across our research and guides." },
      { date: "January 2026", title: "50,000 lifetime VIN lookups milestone", body: "Crossed 50,000 free VIN decodes served to private buyers, journalists, and small dealers since launch." },
    ],
    faqs: [
      { q: "What is CarCheckerVIN?", a: "CarCheckerVIN is a vehicle history report platform that provides instant, affordable VIN-based reports covering title, theft, and recall data. It was founded in 2025 and aims to put the same authoritative data insurance companies and franchise dealers rely on into the hands of every used-car buyer for less than the price of a tank of gas." },
      { q: "Who do I contact for media inquiries?", a: "Route press inquiries to the CarCheckerVIN communications team at contact@carcheckervin.com or +1 (564) 212-3985. The team handles interviews, embargoed previews, custom data pulls, and fact-check requests, and responds to press inquiries within one business day." },
      { q: "Where does CarCheckerVIN's data come from?", a: "CarCheckerVIN reports are powered by NMVTIS (the National Motor Vehicle Title Information System), NICB, manufacturer/OEM APIs, and Auto.dev. These sources supply title-brand, theft, and recall records used across the platform's vehicle history reports." },
      { q: "Can I use the CarCheckerVIN logo?", a: "Yes. The official logo is available for download from the Brand Assets section of this press kit in SVG and PNG formats, alongside a brand guidelines PDF. Please use only the official assets and follow the color and clear-space rules in the guidelines." },
      { q: "Who are CarCheckerVIN's spokespeople?", a: "CarCheckerVIN makes several spokespeople available for interviews and on-the-record commentary, including Marcus Chen (Founder & CEO), Priya Anand (Head of Data), Devon Whitfield (Lead Research Analyst), and Sara Okonkwo (Communications Lead). For the fastest response, route initial inquiries through the communications lead." },
      { q: "What topics can CarCheckerVIN comment on?", a: "Available commentary areas include used-car fraud, NMVTIS policy, dealer pricing, vehicle data integrity, OEM API integration, recall reporting, title washing, VIN cloning, and odometer rollback. Spokespeople are available for interviews, podcasts, and on-the-record commentary." },
      { q: "What are the key facts about CarCheckerVIN?", a: "CarCheckerVIN was founded in 2025, is headquartered in the United States, has served 50,000+ lifetime VIN lookups, delivers 300,000+ reports per year, works with 5,000+ dealer partners, and sources data from NMVTIS, NICB, OEM APIs, and Auto.dev." },
    ],
  },
  es: {
    breadcrumbHome: "Inicio",
    breadcrumbCurrent: "Prensa",
    badge: "Centro de medios",
    h1: "Kit de prensa y Centro de medios",
    heroLead:
      "Todo lo que los periodistas, podcasters y analistas necesitan para escribir con precisión sobre CarCheckerVIN: datos de la empresa, recursos de marca descargables, voceros nombrados y líneas de contacto directas para consultas de prensa.",
    factsHeading: "Datos rápidos sobre CarCheckerVIN",
    factsIntro:
      "Los números y detalles más solicitados por reporteros. Todo lo de abajo está autorizado para publicación.",
    missionHeading: "Nuestra misión",
    missionBodyPre:
      "CarCheckerVIN existe para poner los mismos datos autoritativos de título, robo y retiros en los que las aseguradoras y los concesionarios franquiciados confían en manos de cada comprador de auto usado en EE. UU. — por menos del precio de un tanque de gasolina. Creemos que la transparencia es la herramienta más poderosa que tiene un comprador, y que no debería reservarse para quienes pueden pagar un reporte premium de treinta dólares. Lee la historia completa en nuestra",
    missionLink: "página Acerca de",
    missionSuffix: ".",
    coverageHeading: "Cobertura de medios",
    coverageIntroPre: "Presentado en:",
    coverageIntroPlaceholder: "[logos próximamente]",
    coverageCard: "Próximamente",
    brandHeading: "Recursos de marca",
    brandIntro:
      "Descarga nuestro logo y guía de marca. Por favor usa solo los recursos oficiales abajo y sigue las reglas de color y espacio libre en el PDF de guías.",
    brandSvgTitle: "Descargar logo (SVG)",
    brandSvgSub: "Vectorial, recomendado para uso digital.",
    brandPngTitle: "Descargar logo (PNG)",
    brandPngSub: "Fondo transparente, listo para retina 2x.",
    brandPdfTitle: "Guía de marca PDF",
    brandPdfSub: "Colores, tipografía, espacio libre, hacer/no hacer.",
    brandDownload: "Descargar",
    spokespeopleHeading: "Voceros",
    spokespeopleIntro:
      "Disponibles para entrevistas, podcasts y comentarios en el registro. Para respuesta más rápida, dirige consultas iniciales a través de nuestro líder de comunicaciones.",
    announcementsHeading: "Anuncios recientes",
    pressContactHeading: "Contacto para consultas de prensa",
    pressContactBody:
      "Para entrevistas, vistas previas con embargo, extracciones de datos personalizadas y solicitudes de verificación de hechos, contacta a nuestro equipo de comunicaciones directamente. Respondemos a consultas de prensa en un día hábil.",
    pressContactAreaServed: "Estados Unidos — respuestas en inglés",
    faqHeading: "Preguntas frecuentes — Prensa",
    faqIntro:
      "Las preguntas que periodistas, podcasters y analistas hacen con más frecuencia sobre CarCheckerVIN.",
    ctaHeading: "¿Necesitas más que el kit de prensa?",
    ctaBody:
      "Para consultas de asociación, patrocinios o preguntas generales, contacta a nuestro equipo a través de nuestro canal de contacto estándar.",
    ctaButton: "Contáctanos →",
    facts: [
      { label: "Fundada", value: "2025" },
      { label: "Consultas VIN totales", value: "50,000+" },
      { label: "Fuentes de datos", value: "NMVTIS, NICB, APIs OEM, Auto.dev" },
      { label: "Sede", value: "Estados Unidos" },
      { label: "Reportes por año", value: "300,000+" },
      { label: "Concesionarios socios", value: "5,000+" },
    ],
    spokespeople: [
      { name: "Marcus Chen", role: "Fundador y CEO", bio: "12 años en ingeniería de datos automotrices en aseguradoras principales; disponible para entrevistas sobre fraude de autos usados, política NMVTIS y precios de concesionarios." },
      { name: "Priya Anand", role: "Jefa de Datos", bio: "Anteriormente ingeniera líder en una subasta automotriz Fortune 100; habla sobre integridad de datos vehiculares, integración de APIs OEM y reportes de retiros." },
      { name: "Devon Whitfield", role: "Analista de Investigación Líder", bio: "Certificado ASE, una década en detección de fraude del DMV; disponible para comentarios sobre lavado de títulos, clonación VIN y retroceso de odómetro." },
      { name: "Sara Okonkwo", role: "Líder de Comunicaciones", bio: "Contacto principal de prensa, gestiona todas las solicitudes de medios, vistas previas con embargo y extracciones de datos personalizadas para periodistas e investigadores." },
    ],
    announcements: [
      { date: "Abril 2026", title: "Lanzamos blog completo con más de 100 artículos", body: "Biblioteca de educación para compradores de formato largo que cubre cada decisión importante de compra de auto, con temas desde fundamentos de VIN hasta transferencias de título entre estados." },
      { date: "Marzo 2026", title: "50 guías de compra específicas por estado publicadas", body: "Cobertura completa de leyes estatales de autos usados, umbrales de salvamento y procedimientos del DMV — escritas y revisadas por nuestro equipo interno de datos." },
      { date: "Febrero 2026", title: "Integración Sanity CMS", body: "Migramos contenido editorial de formato largo a un CMS estructurado para soportar publicación más rápida, mejor SEO y enlaces cruzados más ricos en nuestra investigación y guías." },
      { date: "Enero 2026", title: "Hito de 50,000 consultas VIN totales", body: "Cruzamos 50,000 decodificaciones VIN gratis entregadas a compradores privados, periodistas y pequeños concesionarios desde el lanzamiento." },
    ],
    faqs: [
      { q: "¿Qué es CarCheckerVIN?", a: "CarCheckerVIN es una plataforma de reportes de historial vehicular que provee reportes instantáneos y asequibles basados en VIN que cubren datos de título, robo y retiros. Fue fundada en 2025 y busca poner los mismos datos autoritativos en los que las aseguradoras y los concesionarios franquiciados confían en manos de cada comprador de auto usado por menos del precio de un tanque de gasolina." },
      { q: "¿A quién contacto para consultas de medios?", a: "Dirige consultas de prensa al equipo de comunicaciones de CarCheckerVIN en contact@carcheckervin.com o +1 (564) 212-3985. El equipo maneja entrevistas, vistas previas con embargo, extracciones de datos personalizadas y solicitudes de verificación de hechos, y responde a consultas de prensa en un día hábil." },
      { q: "¿De dónde provienen los datos de CarCheckerVIN?", a: "Los reportes de CarCheckerVIN están alimentados por NMVTIS (el Sistema Nacional del Título de Vehículos), NICB, APIs de fabricantes/OEM y Auto.dev. Estas fuentes proveen registros de marcas de título, robo y retiros usados en los reportes de historial vehicular de la plataforma." },
      { q: "¿Puedo usar el logo de CarCheckerVIN?", a: "Sí. El logo oficial está disponible para descarga desde la sección de Recursos de Marca de este kit de prensa en formatos SVG y PNG, junto con un PDF de guías de marca. Por favor usa solo los recursos oficiales y sigue las reglas de color y espacio libre en las guías." },
      { q: "¿Quiénes son los voceros de CarCheckerVIN?", a: "CarCheckerVIN pone disponibles varios voceros para entrevistas y comentarios en el registro, incluyendo Marcus Chen (Fundador y CEO), Priya Anand (Jefa de Datos), Devon Whitfield (Analista de Investigación Líder) y Sara Okonkwo (Líder de Comunicaciones). Para la respuesta más rápida, dirige consultas iniciales al líder de comunicaciones." },
      { q: "¿Sobre qué temas puede comentar CarCheckerVIN?", a: "Las áreas de comentario disponibles incluyen fraude de autos usados, política NMVTIS, precios de concesionarios, integridad de datos vehiculares, integración de APIs OEM, reportes de retiros, lavado de títulos, clonación VIN y retroceso de odómetro. Los voceros están disponibles para entrevistas, podcasts y comentarios en el registro." },
      { q: "¿Cuáles son los datos clave sobre CarCheckerVIN?", a: "CarCheckerVIN fue fundada en 2025, tiene sede en Estados Unidos, ha servido más de 50,000 consultas VIN totales, entrega más de 300,000 reportes por año, trabaja con más de 5,000 concesionarios socios y obtiene datos de NMVTIS, NICB, APIs OEM y Auto.dev." },
    ],
  },
} as const;

export default function PressPageBody({
  locale = "en",
}: {
  locale?: Locale;
}) {
  const copy = COPY[locale];
  const homeHref = locale === "es" ? "/es" : "/";
  const aboutHref = locale === "es" ? "/es/acerca-de" : "/about";
  const contactHref = locale === "es" ? "/es/contacto" : "/contact";

  return (
    <>
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white pt-28 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-5 [&_a]:text-primary-100 [&_a:hover]:text-white [&_span]:text-white [&_li_span]:text-primary-200">
            <Breadcrumbs onDark items={[{ label: copy.breadcrumbHome, href: homeHref }, { label: copy.breadcrumbCurrent }]} />
          </div>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-xs font-semibold uppercase tracking-wider">
            <Newspaper className="w-3.5 h-3.5" /> {copy.badge}
          </span>
          <h1 className="mt-5 text-4xl sm:text-5xl font-bold leading-tight">{copy.h1}</h1>
          <p className="mt-5 text-lg text-primary-100 max-w-2xl leading-relaxed">{copy.heroLead}</p>
        </div>
      </section>

      <section className="py-14 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold text-slate-900">{copy.factsHeading}</h2>
            <p className="mt-3 text-lg text-slate-600 leading-relaxed">{copy.factsIntro}</p>
          </div>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {copy.facts.map((f) => (
              <div key={f.label} className="p-5 bg-slate-50 border border-slate-200 rounded-2xl">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-700">{f.label}</div>
                <div className="mt-1.5 text-xl font-bold text-slate-900">{f.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900">{copy.missionHeading}</h2>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            {copy.missionBodyPre}{" "}
            <Link href={aboutHref} className="text-primary-600 hover:underline font-medium">
              {copy.missionLink}
            </Link>
            {copy.missionSuffix}
          </p>
        </div>
      </section>

      <section className="py-14 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold text-slate-900">{copy.coverageHeading}</h2>
            <p className="mt-3 text-lg text-slate-600 leading-relaxed">
              {copy.coverageIntroPre} <em className="text-slate-700">{copy.coverageIntroPlaceholder}</em>
            </p>
          </div>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-20 rounded-2xl border border-dashed border-slate-300 bg-slate-50 flex items-center justify-center text-sm text-slate-600">
                {copy.coverageCard}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold text-slate-900">{copy.brandHeading}</h2>
            <p className="mt-3 text-lg text-slate-600 leading-relaxed">{copy.brandIntro}</p>
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <a href="/logo.svg" download className="p-6 bg-white border border-slate-200 rounded-2xl hover:shadow-md transition flex flex-col gap-3">
              <ImageIcon className="w-6 h-6 text-primary-600" />
              <div>
                <div className="font-bold text-slate-900">{copy.brandSvgTitle}</div>
                <div className="text-sm text-slate-700">{copy.brandSvgSub}</div>
              </div>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary-600">
                <Download className="w-4 h-4" /> {copy.brandDownload}
              </span>
            </a>
            <a href="/logo.svg" download className="p-6 bg-white border border-slate-200 rounded-2xl hover:shadow-md transition flex flex-col gap-3">
              <ImageIcon className="w-6 h-6 text-primary-600" />
              <div>
                <div className="font-bold text-slate-900">{copy.brandPngTitle}</div>
                <div className="text-sm text-slate-700">{copy.brandPngSub}</div>
              </div>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary-600">
                <Download className="w-4 h-4" /> {copy.brandDownload}
              </span>
            </a>
            <a href="/logo.svg" download className="p-6 bg-white border border-slate-200 rounded-2xl hover:shadow-md transition flex flex-col gap-3">
              <FileText className="w-6 h-6 text-primary-600" />
              <div>
                <div className="font-bold text-slate-900">{copy.brandPdfTitle}</div>
                <div className="text-sm text-slate-700">{copy.brandPdfSub}</div>
              </div>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary-600">
                <Download className="w-4 h-4" /> {copy.brandDownload}
              </span>
            </a>
          </div>
        </div>
      </section>

      <section className="py-14 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary-600" />
              <h2 className="text-3xl font-bold text-slate-900">{copy.spokespeopleHeading}</h2>
            </div>
            <p className="mt-3 text-lg text-slate-600 leading-relaxed">{copy.spokespeopleIntro}</p>
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
            {copy.spokespeople.map((p) => (
              <div key={p.name} className="p-6 bg-white border border-slate-200 rounded-2xl">
                <h3 className="text-xl font-bold text-slate-900">{p.name}</h3>
                <p className="text-primary-600 font-medium">{p.role}</p>
                <p className="mt-3 text-slate-600 leading-relaxed text-sm">{p.bio}</p>
                <a href="mailto:contact@carcheckervin.com" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:underline">
                  <Mail className="w-4 h-4" /> contact@carcheckervin.com
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary-600" />
            <h2 className="text-3xl font-bold text-slate-900">{copy.announcementsHeading}</h2>
          </div>
          <ul className="mt-8 space-y-5">
            {copy.announcements.map((a) => (
              <li key={a.title} className="p-5 bg-white border border-slate-200 rounded-2xl">
                <div className="text-xs font-semibold uppercase tracking-wider text-primary-600">{a.date}</div>
                <h3 className="mt-1.5 text-lg font-bold text-slate-900">{a.title}</h3>
                <p className="mt-2 text-slate-600 leading-relaxed">{a.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-14 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 bg-gradient-to-br from-primary-50 to-white border border-primary-100 rounded-2xl">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-primary-600" />
              <h2 className="text-2xl font-bold text-slate-900">{copy.pressContactHeading}</h2>
            </div>
            <p className="mt-3 text-slate-600 leading-relaxed">{copy.pressContactBody}</p>
            <div className="mt-5 space-y-3">
              <a href="mailto:contact@carcheckervin.com" className="flex items-center gap-3 text-slate-700 hover:text-primary-600">
                <Mail className="w-5 h-5 text-primary-600" />
                <span className="font-semibold">contact@carcheckervin.com</span>
              </a>
              <a href="tel:+15642123985" className="flex items-center gap-3 text-slate-700 hover:text-primary-600">
                <Phone className="w-5 h-5 text-primary-600" />
                <span className="font-semibold">+1 (564) 212-3985</span>
              </a>
              <div className="flex items-center gap-3 text-slate-700">
                <Building2 className="w-5 h-5 text-primary-600" />
                <span>{copy.pressContactAreaServed}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900">{copy.faqHeading}</h2>
          <p className="mt-3 text-lg text-slate-600 leading-relaxed">{copy.faqIntro}</p>
          <div className="mt-8 space-y-3">
            {copy.faqs.map((f) => (
              <details key={f.q} className="group p-5 bg-slate-50 border border-slate-200 rounded-2xl [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                  <span className="text-base sm:text-lg font-bold text-slate-900 pr-2">{f.q}</span>
                  <span className="flex-shrink-0 mt-0.5 text-primary-600 text-xl font-light group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-slate-600 leading-relaxed text-sm">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 bg-slate-50">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">{copy.ctaHeading}</h2>
          <p className="text-slate-700 mb-6">{copy.ctaBody}</p>
          <Link href={contactHref} className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors">
            {copy.ctaButton}
          </Link>
        </div>
      </section>
    </>
  );
}

export { COPY as PRESS_COPY };
