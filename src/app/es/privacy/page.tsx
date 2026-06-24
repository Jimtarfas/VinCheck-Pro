/**
 * Wave 18c — Spanish privacy policy. Full translation of /privacy with
 * locale-appropriate metadata + hreflang. Replaces the Wave 14 InfoPage stub.
 */

import type { Metadata } from "next";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";

const SITE = "https://www.carcheckervin.com";
const alt = hreflangAlternatesForLocale("/privacy", "es");

export const metadata: Metadata = {
  title: "Política de privacidad",
  description:
    "Política de privacidad de CarCheckerVIN. Conoce cómo recopilamos, usamos y protegemos tu información personal.",
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: {
    title: "Política de privacidad",
    description:
      "Política de privacidad de CarCheckerVIN. Conoce cómo recopilamos, usamos y protegemos tu información personal.",
    url: `${SITE}/es/privacy`,
    type: "article",
    siteName: "CarCheckerVIN",
    locale: "es_US",
  },
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Política de privacidad</h1>
      <div className="prose prose-slate max-w-none space-y-6 text-slate-600 leading-relaxed">
        <p>
          <strong>Última actualización:</strong> 12 de abril de 2026
        </p>
        <p>
          Esta Política de privacidad se aplica a{" "}
          <strong>CarCheckerVIN</strong> (carcheckervin.com), un servicio
          operado por <strong>Cognifyx Solutions LLC</strong>, una sociedad
          de responsabilidad limitada de Nuevo México con domicilio
          registrado en 1209 Mountain Road Pl NE, Ste N, Albuquerque, NM
          87110, Estados Unidos.
        </p>

        <h2 className="text-xl font-semibold text-slate-900 mt-8">1. Información que recopilamos</h2>
        <p>
          Cuando usas CarCheckerVIN, podemos recopilar los Números de Identificación Vehicular (VIN)
          que envías para decodificación, datos básicos de uso (páginas visitadas, funciones
          utilizadas) e información de contacto si te comunicas con soporte.
        </p>

        <h2 className="text-xl font-semibold text-slate-900 mt-8">2. Cómo usamos tu información</h2>
        <p>
          Usamos la información recopilada para proporcionar reportes de historial vehicular,
          mejorar nuestro servicio, responder a consultas de clientes y garantizar la seguridad de
          la plataforma. No vendemos tus datos personales a terceros.
        </p>

        <h2 className="text-xl font-semibold text-slate-900 mt-8">3. Fuentes de datos</h2>
        <p>
          Los datos vehiculares provienen del Sistema Nacional de Información de Títulos de
          Vehículos Motorizados (NMVTIS), bases de datos de fabricantes y la API de Auto.dev. Esta
          es información de especificaciones vehiculares disponible públicamente.
        </p>

        <h2 className="text-xl font-semibold text-slate-900 mt-8">4. Cookies</h2>
        <p>
          Usamos cookies esenciales para mantener la funcionalidad del sitio. No usamos cookies de
          publicidad ni de seguimiento sin tu consentimiento.
        </p>

        <h2 className="text-xl font-semibold text-slate-900 mt-8">5. Seguridad de datos</h2>
        <p>
          Implementamos medidas de seguridad estándar de la industria para proteger tus datos,
          incluyendo conexiones cifradas (HTTPS) y prácticas seguras de almacenamiento de datos.
        </p>

        <h2 className="text-xl font-semibold text-slate-900 mt-8">6. Contacto</h2>
        <p>
          Para consultas relacionadas con privacidad, contáctanos en{" "}
          <a href="mailto:contact@carcheckervin.com" className="text-primary-600 hover:underline">
            contact@carcheckervin.com
          </a>{" "}
          o por correo a:
        </p>
        <address className="not-italic text-slate-700">
          Cognifyx Solutions LLC
          <br />
          1209 Mountain Road Pl NE, Ste N
          <br />
          Albuquerque, NM 87110
          <br />
          Estados Unidos
        </address>
      </div>
    </div>
  );
}
