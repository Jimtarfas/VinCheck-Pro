import { Bot, Radar, BookOpen, Compass } from "lucide-react";
import type { Locale } from "@/i18n/config";

const COPY = {
  en: {
    eyebrow: "Powered by Advanced AI",
    headlineLead: "Don't just read data.",
    headlineAccent: "Let AI understand it for you.",
    sub: "We are the first vehicle history provider to integrate advanced AI architecture directly into every report — turning raw VIN data into clear answers, stories, and warnings you can actually use.",
    cards: [
      {
        title: "AI VIN Concierge",
        description:
          "Ask plain-English questions about any VIN report. Our assistant cross-references engine data, recalls, market value, and equipment to give you a clear, honest answer in seconds.",
      },
      {
        title: "AI Risk Insights",
        description:
          "Automatic scoring of accident severity, odometer anomalies, title brands, and ownership patterns — surfaced as red flags before you ever open your wallet.",
      },
      {
        title: "AI Vehicle Storyteller",
        description:
          "Turns dense technical records into a readable biography of the car — when and where it was built, how it was optioned, and how it has been driven and serviced.",
      },
      {
        title: "AI Vehicle Finder",
        description:
          "Describe the car you want in everyday language. Our finder matches your needs against live listings, MSRP data, and real-world reliability to surface the right VIN for you.",
      },
    ],
  },
  es: {
    eyebrow: "Impulsado por IA avanzada",
    headlineLead: "No solo leas datos.",
    headlineAccent: "Deja que la IA los entienda por ti.",
    sub: "Somos el primer proveedor de historial vehicular en integrar arquitectura de IA avanzada directamente en cada reporte — convertimos datos VIN crudos en respuestas claras, historias y advertencias que realmente puedes usar.",
    cards: [
      {
        title: "Asistente IA de VIN",
        description:
          "Haz preguntas en lenguaje natural sobre cualquier reporte VIN. Nuestro asistente cruza datos de motor, retiros, valor de mercado y equipamiento para darte una respuesta clara y honesta en segundos.",
      },
      {
        title: "Análisis de riesgo con IA",
        description:
          "Puntuación automática de la severidad de accidentes, anomalías de odómetro, marcas de título y patrones de propiedad — surgidos como banderas rojas antes de que abras la cartera.",
      },
      {
        title: "Narrador IA del vehículo",
        description:
          "Convierte registros técnicos densos en una biografía legible del auto — cuándo y dónde fue fabricado, cómo fue equipado y cómo ha sido manejado y mantenido.",
      },
      {
        title: "Buscador IA de vehículos",
        description:
          "Describe el auto que quieres en lenguaje cotidiano. Nuestro buscador empareja tus necesidades con listados en vivo, datos de MSRP y confiabilidad real para mostrarte el VIN correcto.",
      },
    ],
  },
} as const;

const CARD_VISUALS = [
  { icon: Bot, accent: "border-primary", iconBg: "bg-primary/10 text-primary" },
  { icon: Radar, accent: "border-secondary", iconBg: "bg-secondary-container/20 text-secondary" },
  { icon: BookOpen, accent: "border-green-500", iconBg: "bg-green-500/10 text-green-600" },
  { icon: Compass, accent: "border-purple-500", iconBg: "bg-purple-500/10 text-purple-600" },
] as const;

export default function AIFeaturesSection({
  locale = "en",
}: {
  locale?: Locale;
}) {
  const copy = COPY[locale];
  return (
    <section id="ai" className="py-16 sm:py-24 px-4 sm:px-6 bg-surface">
      <div className="max-w-7xl mx-auto text-center">
        <span className="text-xs sm:text-sm font-black text-primary uppercase tracking-[0.2em] mb-3 sm:mb-4 block">
          {copy.eyebrow}
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-headline font-extrabold text-primary mb-5 sm:mb-6 leading-tight">
          {copy.headlineLead}
          <br className="hidden sm:block" />{" "}
          <span className="text-on-surface">{copy.headlineAccent}</span>
        </h2>
        <p className="text-base sm:text-lg text-on-surface-variant max-w-2xl mx-auto mb-12 sm:mb-20 px-2">
          {copy.sub}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {copy.cards.map((card, i) => {
            const { icon: Icon, accent, iconBg } = CARD_VISUALS[i];
            return (
              <div
                key={card.title}
                className={`bg-surface-container-low p-6 sm:p-8 rounded-3xl sm:rounded-[2rem] text-left border-t-4 ${accent} shadow-sm hover:shadow-md transition-shadow`}
              >
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl ${iconBg} flex items-center justify-center mb-4 sm:mb-5`}
                >
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-on-surface mb-2 sm:mb-3">
                  {card.title}
                </h3>
                <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
