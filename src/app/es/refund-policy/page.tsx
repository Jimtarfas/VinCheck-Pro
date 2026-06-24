/**
 * Wave 18c — Spanish refund policy. Full translation of /refund-policy.
 * Replaces the Wave 14 InfoPage stub. Compliance-sensitive — text is a
 * faithful Spanish translation of the canonical English policy.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";

const SITE = "https://www.carcheckervin.com";
const alt = hreflangAlternatesForLocale("/refund-policy", "es");

export const metadata: Metadata = {
  title: "Política de reembolsos",
  description:
    "Política de reembolsos de CarCheckerVIN. Los reembolsos se emiten únicamente cuando los datos del reporte de historial vehicular no coinciden con el vehículo real. Conoce los criterios de elegibilidad, requisitos de evidencia y el proceso de solicitud.",
  alternates: { canonical: alt.canonical, languages: alt.languages },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Política de reembolsos",
    description:
      "Política de reembolsos de CarCheckerVIN. Los reembolsos se emiten únicamente cuando los datos del reporte de historial vehicular no coinciden con el vehículo real.",
    url: `${SITE}/es/refund-policy`,
    type: "article",
    siteName: "CarCheckerVIN",
    locale: "es_US",
  },
};

const LAST_UPDATED = "24 de mayo de 2026";
const SUPPORT_EMAIL = "contact@carcheckervin.com";
const SUPPORT_PHONE = "+1 (564) 212-3985";

export default function RefundPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
      <h1 className="text-3xl font-bold text-slate-900 mb-3">Política de reembolsos</h1>
      <p className="text-sm text-slate-500 mb-8">
        <strong>Última actualización:</strong> {LAST_UPDATED}
      </p>

      <div className="prose prose-slate max-w-none space-y-6 text-slate-600 leading-relaxed">
        <div className="not-prose rounded-2xl border-2 border-primary/30 bg-primary/5 p-5 sm:p-6">
          <h2 className="text-base font-bold text-primary mb-2 uppercase tracking-wide">
            La política en una frase
          </h2>
          <p className="text-slate-800 leading-relaxed">
            Emitimos un reembolso <strong>únicamente</strong> cuando los datos de tu reporte
            CarCheckerVIN <strong>no</strong> coinciden con el vehículo real identificado por el
            VIN que enviaste. Todas las demás solicitudes de reembolso no son elegibles.
          </p>
        </div>

        <h2 className="text-xl font-semibold text-slate-900 mt-8">1. Resumen</h2>
        <p>
          <strong>CarCheckerVIN</strong> (carcheckervin.com) es operado por{" "}
          <strong>Cognifyx Solutions LLC</strong>, una sociedad de
          responsabilidad limitada de Nuevo México con domicilio registrado
          en 1209 Mountain Road Pl NE, Ste N, Albuquerque, NM 87110, Estados
          Unidos. CarCheckerVIN vende reportes digitales de historial
          vehicular que se generan y entregan al instante en el momento en
          que se recibe el pago. Debido a que cada reporte es un producto
          digital único producido bajo demanda a partir de bases de datos
          automotrices de terceros, los reembolsos se limitan a la única
          circunstancia descrita a continuación.
        </p>

        <h2 className="text-xl font-semibold text-slate-900 mt-8">
          2. El único escenario elegible para reembolso
        </h2>
        <p>
          Se emitirá un reembolso si, y solo si, el reporte que compraste contiene datos que no
          corresponden al vehículo identificado por el VIN que ingresaste en el pago. Esto incluye
          situaciones en las que el reporte devuelve:
        </p>
        <ul className="list-disc pl-6 space-y-1.5">
          <li>
            Un año, marca o modelo diferente al vehículo vinculado al VIN por registros federales
            (NHTSA / NMVTIS);
          </li>
          <li>
            Especificaciones o equipamiento que son demostrable y materialmente inconsistentes con
            el vehículo real para ese VIN;
          </li>
          <li>
            Un vehículo de una clase completamente diferente (por ejemplo, una motocicleta
            devuelta para un VIN de auto de pasajeros, o viceversa).
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-slate-900 mt-8">
          3. Qué <em>no</em> es elegible para reembolso
        </h2>
        <p>
          Para establecer expectativas claras antes de la compra, las siguientes situaciones no
          califican para reembolso:
        </p>
        <ul className="list-disc pl-6 space-y-1.5">
          <li>
            Arrepentimiento del comprador, cambio de opinión, compra accidental o haber pedido el
            VIN equivocado.
          </li>
          <li>
            Registros limitados o ausentes para vehículos antiguos (típicamente VINs anteriores a
            1981), vehículos solo de salvamento o vehículos no estadounidenses donde las bases de
            datos de terceros tienen menos información.
          </li>
          <li>
            Desacuerdo con los hallazgos del reporte (por ejemplo, un accidente, recall, gravamen
            o marca de título que el cliente cree que no debería aparecer) cuando los datos
            subyacentes se reflejan con precisión desde la base de datos de origen.
          </li>
          <li>
            Imposibilidad de acceder al reporte debido a un enlace de correo expirado, recibo
            faltante o problemas locales de dispositivo/red — en estos casos reenviamos el reporte
            sin cargo.
          </li>
          <li>
            Reportes que el cliente considera incompletos porque una base de datos de terceros no
            devolvió ciertos campos (por ejemplo, fotos faltantes, comparables de valor de mercado
            faltantes o detalles de equipamiento no disponibles). Cuando los proveedores externos
            no devuelven datos, CarCheckerVIN no puede sintetizarlos.
          </li>
          <li>
            Reportes comprados a través de cualquier revendedor externo, tarjeta de regalo,
            crédito promocional o VIN que ya fue reportado dentro del mismo ciclo de facturación.
          </li>
          <li>
            Suscripciones o paquetes después de que se haya generado un reporte desde el paquete.
            Los créditos de reporte no utilizados dentro de un paquete siguen siendo canjeables
            pero no son reembolsables en efectivo.
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-slate-900 mt-8">
          4. Evidencia requerida
        </h2>
        <p>
          Para procesar un reclamo por discrepancia, envía lo siguiente a{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`} className="text-primary-600 hover:underline">
            {SUPPORT_EMAIL}
          </a>{" "}
          dentro de los <strong>30 días</strong> posteriores a la compra original:
        </p>
        <ul className="list-disc pl-6 space-y-1.5">
          <li>El VIN de 17 dígitos que enviaste y tu identificador de orden o recibo.</li>
          <li>
            Una foto de la placa VIN del vehículo, documento de registro o título que muestre
            claramente el mismo VIN.
          </li>
          <li>
            Una nota breve describiendo qué campo(s) del reporte no coinciden con el vehículo
            real (año / marca / modelo / clase / otro).
          </li>
        </ul>
        <p>
          Nuestro equipo revisará el reclamo, verificará la base de datos de origen y responderá
          dentro de <strong>3 días hábiles</strong>.
        </p>

        <h2 className="text-xl font-semibold text-slate-900 mt-8">
          5. Cómo se emiten los reembolsos
        </h2>
        <p>
          Los reembolsos aprobados se emiten al método de pago original utilizado en el pago. La
          mayoría de las redes de tarjetas muestran el crédito dentro de{" "}
          <strong>5 a 10 días hábiles</strong>. Los pagos por transferencia bancaria o billetera
          electrónica pueden tardar más dependiendo del procesador. No emitimos reembolsos en
          efectivo, crédito de tienda ni de método alternativo para un reclamo de pago con tarjeta
          aprobado.
        </p>

        <h2 className="text-xl font-semibold text-slate-900 mt-8">
          6. Contracargos
        </h2>
        <p>
          Recomendamos enfáticamente que los clientes contacten a{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`} className="text-primary-600 hover:underline">
            {SUPPORT_EMAIL}
          </a>{" "}
          antes de iniciar un contracargo con la tarjeta de pago. La mayoría de las solicitudes
          elegibles se resuelven dentro de un día hábil. Los contracargos presentados sin
          contactarnos primero serán impugnados con evidencia que incluye el VIN enviado, el
          reporte entregado, el sello de tiempo de entrega y la dirección IP utilizada en el pago.
        </p>

        <h2 className="text-xl font-semibold text-slate-900 mt-8">
          7. Reportes gratuitos
        </h2>
        <p>
          Los reportes generados bajo un nivel gratuito o crédito promocional no tienen valor
          monetario y por lo tanto no son reembolsables, pero aún puedes reportar una discrepancia
          de datos usando el proceso anterior para que podamos marcar el registro subyacente con
          nuestros proveedores de datos.
        </p>

        <h2 className="text-xl font-semibold text-slate-900 mt-8">
          8. Cambios a esta política
        </h2>
        <p>
          Podemos actualizar esta política ocasionalmente. Los cambios materiales se anunciarán en
          esta página y la fecha de &ldquo;Última actualización&rdquo; será revisada. Las
          solicitudes de reembolso se evalúan bajo la política vigente al momento de la compra
          original.
        </p>

        <h2 className="text-xl font-semibold text-slate-900 mt-8">9. Contacto</h2>
        <p>
          Solicitudes de reembolso, envíos de evidencia y preguntas sobre la política:
        </p>
        <ul className="list-none pl-0 space-y-1.5">
          <li>
            Correo:{" "}
            <a href={`mailto:${SUPPORT_EMAIL}`} className="text-primary-600 hover:underline">
              {SUPPORT_EMAIL}
            </a>
          </li>
          <li>
            Teléfono:{" "}
            <a href={`tel:${SUPPORT_PHONE.replace(/[^+\d]/g, "")}`} className="text-primary-600 hover:underline">
              {SUPPORT_PHONE}
            </a>{" "}
            (Lun–Vie, 9:00–18:00 hora del Este de EE. UU.)
          </li>
          <li>
            Páginas relacionadas:{" "}
            <Link href="/es/terms" className="text-primary-600 hover:underline">Términos de servicio</Link>
            {" · "}
            <Link href="/es/privacy" className="text-primary-600 hover:underline">Política de privacidad</Link>
            {" · "}
            <Link href="/es/pricing" className="text-primary-600 hover:underline">Precios</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
