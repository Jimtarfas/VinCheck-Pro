/**
 * Shared body for the /contact and /es/contact pages.
 *
 * Wave 16 — same JSX tree on both locales (true visual parity, matching
 * the Wave 13 homepage pattern). The English /contact and Spanish
 * /es/contact pages both render this component, just with locale="en"
 * vs locale="es". Every visible string lives in the COPY map below.
 */

import Link from "next/link";
import {
  Mail,
  Phone,
  Clock,
  MapPin,
  Headphones,
  Handshake,
  Newspaper,
  Scale,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactForm from "@/components/ContactForm";
import type { Locale } from "@/i18n/config";

const COPY = {
  en: {
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Contact",
    h1: "Contact CarCheckerVIN",
    heroLead:
      "Real people, real responses. Whether you need help with a report, want to partner with us, or have a press inquiry, our team is here to help. Most messages get a reply within 24 hours.",
    leftHeading: "Get in touch",
    leftIntro:
      "Pick whichever channel works best for you. For the fastest response, send a message using the form on this page.",
    emailLabel: "Email",
    emailHint: "Replies within one business hour during support hours.",
    phoneLabel: "Phone",
    phoneHint: "Toll-free, US callers.",
    hoursLabel: "Hours",
    hoursValue: "Monday – Friday, 9:00 AM – 6:00 PM Eastern",
    addressLabel: "Address",
    addressValue: "United States — Online Service",
    helpCalloutPrefix: "Looking for help with a specific report or billing question? Our",
    helpCalloutLink: "Help & Support",
    helpCalloutSuffix: "page has answers to the most common questions.",
    formHeading: "Send us a message",
    formIntro: "Fill out the form below and we'll reply by email.",
    reasonsHeading: "Why people contact us",
    reasonsIntro:
      "Not sure which subject to pick? Here are the most common reasons people reach out.",
    reasons: [
      {
        title: "Customer support",
        body: "Questions about a report, a refund, or your account — we reply within one business hour during support hours.",
      },
      {
        title: "Partnerships & API",
        body: "Dealers, lenders, and resellers can request bulk pricing, white-label reports, or API access for high-volume lookups.",
      },
      {
        title: "Press & media",
        body: "Journalists, podcasters, and analysts — request interviews, data, expert quotes, or industry commentary.",
      },
      {
        title: "Legal & compliance",
        body: "DMCA notices, law-enforcement requests, privacy questions, and regulatory inquiries are handled by our legal team.",
      },
    ],
  },
  es: {
    breadcrumbHome: "Inicio",
    breadcrumbCurrent: "Contacto",
    h1: "Contacta a CarCheckerVIN",
    heroLead:
      "Personas reales, respuestas reales. Ya sea que necesites ayuda con un reporte, quieras asociarte con nosotros o tengas una consulta de prensa, nuestro equipo está aquí para ayudarte. La mayoría de los mensajes reciben respuesta en menos de 24 horas.",
    leftHeading: "Ponte en contacto",
    leftIntro:
      "Elige el canal que mejor te funcione. Para la respuesta más rápida, envía un mensaje usando el formulario en esta página.",
    emailLabel: "Correo electrónico",
    emailHint: "Respondemos en menos de una hora hábil durante horario de soporte.",
    phoneLabel: "Teléfono",
    phoneHint: "Línea gratuita para llamadas desde EE. UU.",
    hoursLabel: "Horario",
    hoursValue: "Lunes a viernes, 9:00 AM – 6:00 PM hora del Este",
    addressLabel: "Dirección",
    addressValue: "Estados Unidos — Servicio en línea",
    helpCalloutPrefix:
      "¿Buscas ayuda con un reporte específico o pregunta de facturación? Nuestra página de",
    helpCalloutLink: "Ayuda y Soporte",
    helpCalloutSuffix: "tiene respuestas a las preguntas más comunes.",
    formHeading: "Envíanos un mensaje",
    formIntro: "Completa el formulario y te responderemos por correo.",
    reasonsHeading: "Por qué la gente nos contacta",
    reasonsIntro:
      "¿No sabes qué asunto elegir? Aquí están las razones más comunes por las que la gente nos escribe.",
    reasons: [
      {
        title: "Soporte al cliente",
        body: "Preguntas sobre un reporte, un reembolso o tu cuenta — respondemos en menos de una hora hábil durante el horario de soporte.",
      },
      {
        title: "Asociaciones y API",
        body: "Concesionarios, prestamistas y revendedores pueden solicitar precios por volumen, reportes white-label o acceso API para consultas de alto volumen.",
      },
      {
        title: "Prensa y medios",
        body: "Periodistas, podcasters y analistas — solicita entrevistas, datos, citas de expertos o comentarios del sector.",
      },
      {
        title: "Legal y cumplimiento",
        body: "Avisos DMCA, solicitudes policiales, preguntas de privacidad y consultas regulatorias son manejadas por nuestro equipo legal.",
      },
    ],
  },
  fr: {
    breadcrumbHome: "Accueil",
    breadcrumbCurrent: "Contact",
    h1: "Contacte CarCheckerVIN",
    heroLead:
      "De vraies personnes, de vraies réponses. Que tu aies besoin d'aide avec un rapport, que tu veuilles devenir partenaire ou que tu aies une demande presse, notre équipe est là pour t'aider. La plupart des messages reçoivent une réponse en moins de 24 heures.",
    leftHeading: "Entre en contact",
    leftIntro:
      "Choisis le canal qui te convient le mieux. Pour une réponse plus rapide, envoie un message via le formulaire sur cette page.",
    emailLabel: "Courriel",
    emailHint: "Réponses en moins d'une heure ouvrée pendant les horaires de support.",
    phoneLabel: "Téléphone",
    phoneHint: "Numéro gratuit pour les appelants depuis les États-Unis.",
    hoursLabel: "Horaires",
    hoursValue: "Lundi au vendredi, 9h00 – 18h00 heure de l'Est",
    addressLabel: "Adresse",
    addressValue: "États-Unis — Service en ligne",
    helpCalloutPrefix: "Tu cherches de l'aide pour un rapport précis ou une question de facturation ? Notre page",
    helpCalloutLink: "Aide et support",
    helpCalloutSuffix: "contient les réponses aux questions les plus fréquentes.",
    formHeading: "Envoie-nous un message",
    formIntro: "Remplis le formulaire ci-dessous et nous te répondrons par courriel.",
    reasonsHeading: "Pourquoi les gens nous contactent",
    reasonsIntro:
      "Tu ne sais pas quel sujet choisir ? Voici les raisons les plus fréquentes pour lesquelles les gens nous écrivent.",
    reasons: [
      {
        title: "Support client",
        body: "Questions sur un rapport, un remboursement ou ton compte — nous répondons en moins d'une heure ouvrée pendant les horaires de support.",
      },
      {
        title: "Partenariats et API",
        body: "Concessionnaires, prêteurs et revendeurs peuvent demander des tarifs en volume, des rapports en marque blanche ou un accès API pour les recherches à haut volume.",
      },
      {
        title: "Presse et médias",
        body: "Journalistes, podcasteurs et analystes — demande des entretiens, des données, des citations d'experts ou des commentaires sectoriels.",
      },
      {
        title: "Juridique et conformité",
        body: "Avis DMCA, demandes des forces de l'ordre, questions de confidentialité et demandes réglementaires sont traitées par notre équipe juridique.",
      },
    ],
  },
} as const;

const REASON_ICONS = [Headphones, Handshake, Newspaper, Scale] as const;

export default function ContactPageBody({
  locale = "en",
}: {
  locale?: Locale;
}) {
  const copy = COPY[locale];
  const helpHref = locale === "es" ? "/es/ayuda" : "/help";
  const homeHref = locale === "es" ? "/es" : "/";

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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: contact info */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{copy.leftHeading}</h2>
              <p className="mt-3 text-slate-600 leading-relaxed">{copy.leftIntro}</p>

              <div className="mt-8 space-y-6">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-slate-900">{copy.emailLabel}</div>
                    <a
                      href="mailto:contact@carcheckervin.com"
                      className="text-primary-600 hover:underline"
                    >
                      contact@carcheckervin.com
                    </a>
                    <div className="text-sm text-slate-700">{copy.emailHint}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-slate-900">{copy.phoneLabel}</div>
                    <a href="tel:+15642123985" className="text-primary-600 hover:underline">
                      +1 (564) 212-3985
                    </a>
                    <div className="text-sm text-slate-700">{copy.phoneHint}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-slate-900">{copy.hoursLabel}</div>
                    <div className="text-slate-600">{copy.hoursValue}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-slate-900">{copy.addressLabel}</div>
                    <div className="text-slate-600">{copy.addressValue}</div>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-5 bg-primary-50 rounded-2xl border border-primary-100">
                <p className="text-sm text-slate-700 leading-relaxed">
                  {copy.helpCalloutPrefix}{" "}
                  <Link
                    href={helpHref}
                    className="text-primary-600 hover:underline font-medium"
                  >
                    {copy.helpCalloutLink}
                  </Link>{" "}
                  {copy.helpCalloutSuffix}
                </p>
              </div>
            </div>

            {/* Right: form */}
            <div>
              <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-slate-900">{copy.formHeading}</h2>
                <p className="mt-2 text-slate-600">{copy.formIntro}</p>
                <div className="mt-6">
                  <ContactForm locale={locale} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900">{copy.reasonsHeading}</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{copy.reasonsIntro}</p>

          <ul className="mt-8 space-y-6">
            {copy.reasons.map((r, i) => {
              const Icon = REASON_ICONS[i];
              return (
                <li key={r.title} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{r.title}</h3>
                    <p className="mt-1 text-slate-600 leading-relaxed">{r.body}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
