import { Search, Database, FileCheck } from "lucide-react";
import type { Locale } from "@/i18n/config";

const COPY = {
  en: {
    eyebrow: "Simple Process",
    heading: "How It Works",
    sub: "Get your full vehicle history report in three simple steps",
    steps: [
      {
        title: "Find Your VIN",
        description: "Locate the 17-character VIN on your dashboard (visible through the windshield), driver-side door jamb sticker, or vehicle registration.",
      },
      {
        title: "Instant Decoding",
        description: "We query NMVTIS, manufacturer databases, and dealer listings in real time — cross-referencing 40+ data points in under 60 seconds.",
      },
      {
        title: "Get Your Report",
        description: "View a complete breakdown: full specs, real photos, market values, equipment list, recall alerts, and ownership history — all on one screen.",
      },
    ],
  },
  es: {
    eyebrow: "Proceso simple",
    heading: "Cómo funciona",
    sub: "Obtén el reporte completo del historial de tu vehículo en tres pasos sencillos",
    steps: [
      {
        title: "Encuentra tu VIN",
        description: "Ubica el VIN de 17 caracteres en el tablero (visible a través del parabrisas), en la calcomanía del marco de la puerta del conductor o en el registro del vehículo.",
      },
      {
        title: "Decodificación al instante",
        description: "Consultamos NMVTIS, bases de datos del fabricante y listados de concesionarios en tiempo real — cruzando más de 40 puntos de datos en menos de 60 segundos.",
      },
      {
        title: "Recibe tu reporte",
        description: "Visualiza un desglose completo: especificaciones completas, fotos reales, valor de mercado, lista de equipamiento, alertas de retiro e historial de propiedad — todo en una pantalla.",
      },
    ],
  },
  fr: {
    eyebrow: "Processus simple",
    heading: "Comment ça marche",
    sub: "Obtiens le rapport complet de l'historique de ton véhicule en trois étapes simples",
    steps: [
      {
        title: "Trouve ton VIN",
        description: "Repère le VIN de 17 caractères sur le tableau de bord (visible à travers le pare-brise), sur l'autocollant du montant de la portière côté conducteur, ou sur la carte grise du véhicule.",
      },
      {
        title: "Décodage instantané",
        description: "Nous interrogeons NMVTIS, les bases de données des constructeurs et les annonces de concessionnaires en temps réel — en croisant plus de 40 points de données en moins de 60 secondes.",
      },
      {
        title: "Reçois ton rapport",
        description: "Visualise un aperçu complet : spécifications complètes, vraies photos, valeurs de marché, liste d'équipements, alertes de rappel et historique de propriété — le tout sur un seul écran.",
      },
    ],
  },
} as const;

const STEP_VISUALS = [
  { icon: Search, step: "01", accent: "bg-primary/8 text-primary" },
  { icon: Database, step: "02", accent: "bg-secondary-container/15 text-secondary" },
  { icon: FileCheck, step: "03", accent: "bg-green-500/10 text-green-600" },
] as const;

export default function HowItWorks({
  locale = "en",
}: {
  locale?: Locale;
}) {
  const copy = COPY[locale];
  return (
    <section id="how-it-works" className="py-16 sm:py-24 px-4 sm:px-6 bg-surface-container-lowest">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-12 sm:mb-16">
          <span className="text-xs sm:text-sm font-black text-primary uppercase tracking-[0.2em] mb-3 sm:mb-4 block">{copy.eyebrow}</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-headline font-extrabold text-primary mb-3 sm:mb-4">{copy.heading}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto px-2">
            {copy.sub}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10 sm:gap-8 relative">
          {copy.steps.map(({ title, description }, i) => {
            const { icon: Icon, step, accent } = STEP_VISUALS[i];
            return (
              <div key={step} className="relative text-center group">
                <div className="relative z-10 inline-flex flex-col items-center">
                  <div className={`w-16 h-16 rounded-2xl ${accent} flex items-center justify-center mb-5 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  {/* Step number badge */}
                  <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary text-on-primary text-xs font-black font-headline flex items-center justify-center shadow-md">
                    {step.replace("0", "")}
                  </div>
                </div>
                <h3 className="text-xl font-headline font-bold text-primary mb-3">{title}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed max-w-xs mx-auto">{description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
