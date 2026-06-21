/**
 * Wave 18c — Spanish terms of service. Full translation of /terms.
 * Replaces the Wave 14 InfoPage stub.
 */

import type { Metadata } from "next";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";

const SITE = "https://www.carcheckervin.com";
const alt = hreflangAlternatesForLocale("/terms", "es");

export const metadata: Metadata = {
  title: "Términos de servicio",
  description:
    "Términos de servicio de VINCheck Pro. Revisa los términos y condiciones para usar nuestra plataforma de reportes de historial vehicular.",
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: {
    title: "Términos de servicio",
    description:
      "Términos de servicio de VINCheck Pro. Revisa los términos y condiciones para usar nuestra plataforma de reportes de historial vehicular.",
    url: `${SITE}/es/terms`,
    type: "article",
    siteName: "CarCheckerVIN",
    locale: "es_US",
  },
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Términos de servicio</h1>
      <div className="prose prose-slate max-w-none space-y-6 text-slate-600 leading-relaxed">
        <p>
          <strong>Última actualización:</strong> 12 de abril de 2026
        </p>

        <h2 className="text-xl font-semibold text-slate-900 mt-8">1. Aceptación de los términos</h2>
        <p>
          Al usar VINCheck Pro, aceptas estos Términos de servicio. Si no estás de acuerdo, por
          favor no uses el servicio.
        </p>

        <h2 className="text-xl font-semibold text-slate-900 mt-8">2. Descripción del servicio</h2>
        <p>
          VINCheck Pro proporciona servicios de decodificación del número de identificación
          vehicular (VIN) y reportes de historial vehicular. Los reportes incluyen especificaciones
          del vehículo, detalles del equipamiento y datos relacionados obtenidos de bases de datos
          de terceros.
        </p>

        <h2 className="text-xl font-semibold text-slate-900 mt-8">3. Precisión de la información</h2>
        <p>
          Aunque nos esforzamos por ser precisos, los datos vehiculares provienen de proveedores
          externos y no podemos garantizar el 100% de precisión. Los reportes deben usarse como un
          factor en tu decisión de compra de vehículos, junto con una inspección física y una
          prueba de manejo.
        </p>

        <h2 className="text-xl font-semibold text-slate-900 mt-8">4. Uso permitido</h2>
        <p>
          Puedes usar VINCheck Pro para fines personales y no comerciales de investigación
          vehicular. Se prohíbe el rastreo automatizado, las descargas masivas o la redistribución
          de datos de reportes.
        </p>

        <h2 className="text-xl font-semibold text-slate-900 mt-8">5. Limitación de responsabilidad</h2>
        <p>
          VINCheck Pro se proporciona &ldquo;tal cual&rdquo; sin garantías de ningún tipo. No somos
          responsables de ningún daño que surja del uso de nuestros reportes o de la confianza en
          la información proporcionada.
        </p>

        <h2 className="text-xl font-semibold text-slate-900 mt-8">6. Reembolsos</h2>
        <p>
          Se emiten reembolsos únicamente cuando los datos de un reporte no coinciden con el
          vehículo identificado por el VIN que enviaste. Consulta la{" "}
          <a href="/es/refund-policy" className="text-primary-600 hover:underline">
            Política de reembolsos
          </a>{" "}
          completa para conocer los criterios de elegibilidad, los requisitos de evidencia y el
          proceso de solicitud.
        </p>

        <h2 className="text-xl font-semibold text-slate-900 mt-8">7. Contacto</h2>
        <p>
          Para preguntas sobre estos términos, contáctanos en{" "}
          <a href="mailto:contact@carcheckervin.com" className="text-primary-600 hover:underline">
            contact@carcheckervin.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}
