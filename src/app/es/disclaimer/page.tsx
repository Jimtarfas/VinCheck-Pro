/**
 * Wave 18c — Spanish disclaimer route.
 * Re-exports the canonical NMVTIS disclaimer from /order/disclaimer so
 * the federally-mandated notice stays in a single source of truth and
 * cannot drift between English and Spanish copies. Only the metadata
 * differs — the NMVTIS notice itself is a US-federal regulatory
 * disclosure that remains in its original legal English form.
 */

import type { Metadata } from "next";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";

const SITE = "https://www.carcheckervin.com";
const alt = hreflangAlternatesForLocale("/disclaimer", "es");

export { default } from "@/app/order/disclaimer/page";

export const metadata: Metadata = {
  title: "Aviso NMVTIS",
  description:
    "Aviso del Sistema Nacional de Información de Títulos de Vehículos Motorizados (NMVTIS) requerido federalmente para los reportes de historial vehicular de CarCheckerVIN. El texto regulatorio se presenta en su forma legal original en inglés.",
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: {
    title: "Aviso NMVTIS",
    description:
      "Aviso NMVTIS requerido federalmente para los reportes de historial vehicular de CarCheckerVIN.",
    url: `${SITE}/es/disclaimer`,
    type: "article",
    siteName: "CarCheckerVIN",
    locale: "es_US",
  },
};
