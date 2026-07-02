/**
 * Shared body for /privacy and /es/privacy.
 * Wave 18 batch 4 — full English layout in both locales via COPY={en,es}.
 * EN copy comes from the canonical /privacy page; ES copy is the
 * Wave 18c translation that previously lived inline in /es/privacy.
 */

import { Fragment } from "react";
import type { Locale } from "@/i18n/config";

const COPY = {
  en: {
    h1: "Privacy Policy",
    lastUpdatedLabel: "Last updated:",
    lastUpdatedValue: "April 12, 2026",
    intro: {
      pre: "This Privacy Policy applies to ",
      brandBold: "CarCheckerVIN",
      mid: " (carcheckervin.com), a service operated by ",
      companyBold: "Coconut Ventures LLC",
      suffix:
        ", a New Mexico limited liability company with its registered office at 412 W 7th St, Clovis, NM 88101, USA.",
    },
    sections: [
      {
        h: "1. Information We Collect",
        p: "When you use CarCheckerVIN, we may collect Vehicle Identification Numbers (VINs) you submit for decoding, basic usage data (pages visited, features used), and contact information if you reach out to support.",
      },
      {
        h: "2. How We Use Your Information",
        p: "We use collected information to provide vehicle history reports, improve our service, respond to customer inquiries, and ensure platform security. We do not sell your personal data to third parties.",
      },
      {
        h: "3. Data Sources",
        p: "Vehicle data is sourced from the National Motor Vehicle Title Information System (NMVTIS), manufacturer databases, and the Auto.dev API. This data is publicly available vehicle specification information.",
      },
      {
        h: "4. Cookies",
        p: "We use essential cookies to maintain site functionality. No advertising or tracking cookies are used without your consent.",
      },
      {
        h: "5. Data Security",
        p: "We implement industry-standard security measures to protect your data, including encrypted connections (HTTPS) and secure data storage practices.",
      },
    ],
    contactHeading: "6. Contact",
    contactPre: "For privacy-related inquiries, contact us at ",
    contactSuffix: " or by mail at:",
    addressLines: [
      "Coconut Ventures LLC",
      "412 W 7th St",
      "Clovis, NM 88101",
      "United States",
    ],
  },
  es: {
    h1: "Política de privacidad",
    lastUpdatedLabel: "Última actualización:",
    lastUpdatedValue: "12 de abril de 2026",
    intro: {
      pre: "Esta Política de privacidad se aplica a ",
      brandBold: "CarCheckerVIN",
      mid: " (carcheckervin.com), un servicio operado por ",
      companyBold: "Coconut Ventures LLC",
      suffix:
        ", una sociedad de responsabilidad limitada de Nuevo México con domicilio registrado en 412 W 7th St, Clovis, NM 88101, EE. UU..",
    },
    sections: [
      {
        h: "1. Información que recopilamos",
        p: "Cuando usas CarCheckerVIN, podemos recopilar los Números de Identificación Vehicular (VIN) que envías para decodificación, datos básicos de uso (páginas visitadas, funciones utilizadas) e información de contacto si te comunicas con soporte.",
      },
      {
        h: "2. Cómo usamos tu información",
        p: "Usamos la información recopilada para proporcionar reportes de historial vehicular, mejorar nuestro servicio, responder a consultas de clientes y garantizar la seguridad de la plataforma. No vendemos tus datos personales a terceros.",
      },
      {
        h: "3. Fuentes de datos",
        p: "Los datos vehiculares provienen del Sistema Nacional de Información de Títulos de Vehículos Motorizados (NMVTIS), bases de datos de fabricantes y la API de Auto.dev. Esta es información de especificaciones vehiculares disponible públicamente.",
      },
      {
        h: "4. Cookies",
        p: "Usamos cookies esenciales para mantener la funcionalidad del sitio. No usamos cookies de publicidad ni de seguimiento sin tu consentimiento.",
      },
      {
        h: "5. Seguridad de datos",
        p: "Implementamos medidas de seguridad estándar de la industria para proteger tus datos, incluyendo conexiones cifradas (HTTPS) y prácticas seguras de almacenamiento de datos.",
      },
    ],
    contactHeading: "6. Contacto",
    contactPre: "Para consultas relacionadas con privacidad, contáctanos en ",
    contactSuffix: " o por correo a:",
    addressLines: [
      "Coconut Ventures LLC",
      "412 W 7th St",
      "Clovis, NM 88101",
      "Estados Unidos",
    ],
  },
  fr: {
    h1: "Politique de confidentialité",
    lastUpdatedLabel: "Dernière mise à jour :",
    lastUpdatedValue: "12 avril 2026",
    intro: {
      pre: "Cette politique de confidentialité s'applique à ",
      brandBold: "CarCheckerVIN",
      mid: " (carcheckervin.com), un service exploité par ",
      companyBold: "Coconut Ventures LLC",
      suffix:
        ", une société à responsabilité limitée du Nouveau-Mexique dont le siège social est situé au 412 W 7th St, Clovis, NM 88101, États-Unis.",
    },
    sections: [
      {
        h: "1. Informations que nous collectons",
        p: "Lorsque tu utilises CarCheckerVIN, nous pouvons collecter les numéros d'identification du véhicule (VIN) que tu soumets pour décodage, des données d'utilisation de base (pages visitées, fonctionnalités utilisées) et tes coordonnées si tu contactes le support.",
      },
      {
        h: "2. Comment nous utilisons tes informations",
        p: "Nous utilisons les informations collectées pour fournir des rapports d'historique de véhicule, améliorer notre service, répondre aux demandes des clients et assurer la sécurité de la plateforme. Nous ne vendons pas tes données personnelles à des tiers.",
      },
      {
        h: "3. Sources de données",
        p: "Les données de véhicule proviennent du National Motor Vehicle Title Information System (NMVTIS), des bases de données des constructeurs et de l'API Auto.dev. Il s'agit d'informations de spécifications de véhicule disponibles publiquement.",
      },
      {
        h: "4. Cookies",
        p: "Nous utilisons des cookies essentiels pour maintenir la fonctionnalité du site. Aucun cookie publicitaire ou de suivi n'est utilisé sans ton consentement.",
      },
      {
        h: "5. Sécurité des données",
        p: "Nous mettons en œuvre des mesures de sécurité conformes aux normes de l'industrie pour protéger tes données, notamment des connexions chiffrées (HTTPS) et des pratiques de stockage de données sécurisées.",
      },
    ],
    contactHeading: "6. Contact",
    contactPre: "Pour toute question relative à la confidentialité, contacte-nous à ",
    contactSuffix: " ou par courrier à :",
    addressLines: [
      "Coconut Ventures LLC",
      "412 W 7th St",
      "Clovis, NM 88101",
      "États-Unis",
    ],
  },
} as const;

interface Props {
  locale: Locale;
}

export default function PrivacyBody({ locale }: Props) {
  const c = COPY[locale];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">{c.h1}</h1>
      <div className="prose prose-slate max-w-none space-y-6 text-slate-600 leading-relaxed">
        <p>
          <strong>{c.lastUpdatedLabel}</strong> {c.lastUpdatedValue}
        </p>
        <p>
          {c.intro.pre}
          <strong>{c.intro.brandBold}</strong>
          {c.intro.mid}
          <strong>{c.intro.companyBold}</strong>
          {c.intro.suffix}
        </p>

        {c.sections.map((s) => (
          <Fragment key={s.h}>
            <h2 className="text-xl font-semibold text-slate-900 mt-8">{s.h}</h2>
            <p>{s.p}</p>
          </Fragment>
        ))}

        <h2 className="text-xl font-semibold text-slate-900 mt-8">{c.contactHeading}</h2>
        <p>
          {c.contactPre}
          <a
            href="mailto:contact@carcheckervin.com"
            className="text-primary-600 hover:underline"
          >
            contact@carcheckervin.com
          </a>
          {c.contactSuffix}
        </p>
        <address className="not-italic text-slate-700">
          {c.addressLines.map((line, i) => (
            <Fragment key={line}>
              {line}
              {i < c.addressLines.length - 1 && <br />}
            </Fragment>
          ))}
        </address>
      </div>
    </div>
  );
}
