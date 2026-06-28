/**
 * Shared body for /terms and /es/terms.
 * Wave 18 batch 4 — full English layout in both locales via COPY={en,es}.
 * ES copy is the Wave 18c translation previously inlined in /es/terms.
 */

import { Fragment } from "react";
import type { Locale } from "@/i18n/config";

const COPY = {
  en: {
    h1: "Terms of Service",
    lastUpdatedLabel: "Last updated:",
    lastUpdatedValue: "April 12, 2026",
    intro: {
      pre: "These Terms govern your use of ",
      brandBold: "CarCheckerVIN",
      mid: " (carcheckervin.com), operated by ",
      companyBold: "Cognifyx Solutions LLC",
      suffix:
        ", a New Mexico limited liability company with its registered office at 1209 Mountain Road Pl NE, Ste N, Albuquerque, NM 87110, United States (\u201cCognifyx Solutions LLC,\u201d \u201cwe,\u201d \u201cus,\u201d or \u201cour\u201d).",
    },
    sections: [
      {
        h: "1. Acceptance of Terms",
        p: "By using CarCheckerVIN, you agree to these Terms of Service. If you do not agree, please do not use the service.",
      },
      {
        h: "2. Service Description",
        p: "CarCheckerVIN provides vehicle identification number (VIN) decoding and vehicle history report services. Reports include vehicle specifications, equipment details, and related data sourced from third-party databases.",
      },
      {
        h: "3. Accuracy of Information",
        p: "While we strive for accuracy, vehicle data is sourced from third-party providers and we cannot guarantee 100% accuracy. Reports should be used as one factor in your vehicle purchase decision, alongside a physical inspection and test drive.",
      },
      {
        h: "4. Permitted Use",
        p: "You may use CarCheckerVIN for personal, non-commercial vehicle research purposes. Automated scraping, bulk downloads, or redistribution of report data is prohibited.",
      },
      {
        h: "5. Limitation of Liability",
        p: "CarCheckerVIN is provided \u201cas is\u201d without warranties of any kind. We are not liable for any damages arising from the use of our reports or reliance on the information provided.",
      },
    ],
    refundHeading: "6. Refunds",
    refundPre:
      "Refunds are issued only when the data in a report does not match the vehicle identified by the VIN you submitted. See the full ",
    refundLinkLabel: "Refund Policy",
    refundSuffix: " for eligibility criteria, evidence requirements, and the request process.",
    contactHeading: "7. Contact",
    contactPre: "For questions about these terms, contact us at ",
    contactSuffix: " or by mail at:",
    addressLines: [
      "Cognifyx Solutions LLC",
      "1209 Mountain Road Pl NE, Ste N",
      "Albuquerque, NM 87110",
      "United States",
    ],
  },
  es: {
    h1: "Términos de servicio",
    lastUpdatedLabel: "Última actualización:",
    lastUpdatedValue: "12 de abril de 2026",
    intro: {
      pre: "Estos Términos rigen tu uso de ",
      brandBold: "CarCheckerVIN",
      mid: " (carcheckervin.com), operado por ",
      companyBold: "Cognifyx Solutions LLC",
      suffix:
        ", una sociedad de responsabilidad limitada de Nuevo México con domicilio registrado en 1209 Mountain Road Pl NE, Ste N, Albuquerque, NM 87110, Estados Unidos (\u201cCognifyx Solutions LLC,\u201d \u201cnosotros,\u201d \u201cnos\u201d o \u201cnuestro\u201d).",
    },
    sections: [
      {
        h: "1. Aceptación de los términos",
        p: "Al usar CarCheckerVIN, aceptas estos Términos de servicio. Si no estás de acuerdo, por favor no uses el servicio.",
      },
      {
        h: "2. Descripción del servicio",
        p: "CarCheckerVIN proporciona servicios de decodificación del número de identificación vehicular (VIN) y reportes de historial vehicular. Los reportes incluyen especificaciones del vehículo, detalles del equipamiento y datos relacionados obtenidos de bases de datos de terceros.",
      },
      {
        h: "3. Precisión de la información",
        p: "Aunque nos esforzamos por ser precisos, los datos vehiculares provienen de proveedores externos y no podemos garantizar el 100% de precisión. Los reportes deben usarse como un factor en tu decisión de compra de vehículos, junto con una inspección física y una prueba de manejo.",
      },
      {
        h: "4. Uso permitido",
        p: "Puedes usar CarCheckerVIN para fines personales y no comerciales de investigación vehicular. Se prohíbe el rastreo automatizado, las descargas masivas o la redistribución de datos de reportes.",
      },
      {
        h: "5. Limitación de responsabilidad",
        p: "CarCheckerVIN se proporciona \u201ctal cual\u201d sin garantías de ningún tipo. No somos responsables de ningún daño que surja del uso de nuestros reportes o de la confianza en la información proporcionada.",
      },
    ],
    refundHeading: "6. Reembolsos",
    refundPre:
      "Se emiten reembolsos únicamente cuando los datos de un reporte no coinciden con el vehículo identificado por el VIN que enviaste. Consulta la ",
    refundLinkLabel: "Política de reembolsos",
    refundSuffix:
      " completa para conocer los criterios de elegibilidad, los requisitos de evidencia y el proceso de solicitud.",
    contactHeading: "7. Contacto",
    contactPre: "Para preguntas sobre estos términos, contáctanos en ",
    contactSuffix: " o por correo a:",
    addressLines: [
      "Cognifyx Solutions LLC",
      "1209 Mountain Road Pl NE, Ste N",
      "Albuquerque, NM 87110",
      "Estados Unidos",
    ],
  },
} as const;

interface Props {
  locale: Locale;
}

export default function TermsBody({ locale }: Props) {
  const c = COPY[locale];
  const refundHref = locale === "es" ? "/es/refund-policy" : "/refund-policy";

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

        <h2 className="text-xl font-semibold text-slate-900 mt-8">{c.refundHeading}</h2>
        <p>
          {c.refundPre}
          <a href={refundHref} className="text-primary-600 hover:underline">
            {c.refundLinkLabel}
          </a>
          {c.refundSuffix}
        </p>

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
