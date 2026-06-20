import { Camera, DollarSign, Gauge, Settings, BarChart3, Wrench, Cpu, Car, MapPin, AlertTriangle, FileText, ShieldCheck } from "lucide-react";
import type { Locale } from "@/i18n/config";

const COPY = {
  en: {
    sectionAHeading: "Comprehensive 40+ Point Coverage",
    sectionAIntro:
      "We leverage NMVTIS federal data, dealership networks, and insurance databases to give you the most exhaustive vehicle record possible. Here is what's included in every report.",
    coverageColumns: [
      {
        title: "Condition & Value Data",
        items: [
          "Market Valuation (Trade-In & Retail)",
          "Odometer Verification & Rollbacks",
          "Structural Damage & Total Loss",
          "Accident History & Severity",
          "Junk, Lemon & Flood Brands",
        ],
        more: "+ 7 More Checks",
      },
      {
        title: "Ownership & Legal Records",
        items: [
          "Detailed Ownership History",
          "Title Brand Records",
          "State Title Registrations",
          "Active Liens & Auto Loans",
          "Theft & Recovery Records",
        ],
        more: "+ 7 More Checks",
      },
      {
        title: "Technical & Lifecycle Data",
        items: [
          "Original MSRP & Specs",
          "Full Equipment & Options List",
          "Active Safety Recalls",
          "Engine & Powertrain Details",
          "Dealer & Market Listings",
        ],
        more: "+ 8 More Checks",
      },
    ],
    sectionBEyebrow: "The Archive",
    sectionBHeading: "Core Documentation.",
    bentoItems: [
      {
        title: "Accident History",
        desc: "Detailed records of collisions, frame damage, and structural repairs documented by law enforcement and insurers.",
      },
      {
        title: "Title Records",
        desc: "Salvage, flood, lemon, and rebuild brandings that stay with the vehicle's permanent digital ID.",
      },
      {
        title: "Full Specs",
        desc: "Original manufacturer data, equipment packages, and factory build sheets.",
      },
      {
        title: "Safety Recalls",
        desc: "Stay informed about open recalls and safety notices directly from the NHTSA and manufacturers.",
      },
    ],
    sectionCEyebrow: "Everything You Need",
    sectionCHeading: "40+ Data Points, One Report",
    featureGrid: [
      "Real Vehicle Photos",
      "Market Valuation",
      "Full Specifications",
      "Equipment & Options",
      "Price Comparison",
      "Recall Alerts",
      "Engine & Powertrain",
      "Classification",
      "Dealer Listings",
      "Accident History",
      "Title & Ownership",
      "Theft Records",
    ],
  },
  es: {
    sectionAHeading: "Cobertura completa de más de 40 puntos",
    sectionAIntro:
      "Aprovechamos datos federales de NMVTIS, redes de concesionarios y bases de datos de aseguradoras para darte el registro vehicular más exhaustivo posible. Esto es lo que incluye cada reporte.",
    coverageColumns: [
      {
        title: "Datos de condición y valor",
        items: [
          "Valor de mercado (trade-in y retail)",
          "Verificación de odómetro y retrocesos",
          "Daño estructural y pérdida total",
          "Historial de accidentes y severidad",
          "Marcas de chatarra, limón e inundación",
        ],
        more: "+ 7 verificaciones más",
      },
      {
        title: "Propiedad y registros legales",
        items: [
          "Historial detallado de propiedad",
          "Registros de marcas de título",
          "Registros de título estatales",
          "Gravámenes activos y préstamos de auto",
          "Registros de robo y recuperación",
        ],
        more: "+ 7 verificaciones más",
      },
      {
        title: "Datos técnicos y de ciclo de vida",
        items: [
          "MSRP y especificaciones originales",
          "Lista completa de equipamiento y opciones",
          "Retiros de seguridad activos",
          "Detalles de motor y tren motriz",
          "Listados de concesionarios y mercado",
        ],
        more: "+ 8 verificaciones más",
      },
    ],
    sectionBEyebrow: "El archivo",
    sectionBHeading: "Documentación central.",
    bentoItems: [
      {
        title: "Historial de accidentes",
        desc: "Registros detallados de colisiones, daño al chasis y reparaciones estructurales documentadas por autoridades y aseguradoras.",
      },
      {
        title: "Registros de título",
        desc: "Marcas de salvamento, inundación, limón y reconstrucción que permanecen en la identidad digital permanente del vehículo.",
      },
      {
        title: "Especificaciones completas",
        desc: "Datos originales del fabricante, paquetes de equipamiento y hojas de fábrica.",
      },
      {
        title: "Retiros de seguridad",
        desc: "Mantente informado sobre retiros abiertos y avisos de seguridad directamente de la NHTSA y los fabricantes.",
      },
    ],
    sectionCEyebrow: "Todo lo que necesitas",
    sectionCHeading: "40+ puntos de datos, un reporte",
    featureGrid: [
      "Fotos reales del vehículo",
      "Valor de mercado",
      "Especificaciones completas",
      "Equipamiento y opciones",
      "Comparación de precios",
      "Alertas de retiros",
      "Motor y tren motriz",
      "Clasificación",
      "Listados de concesionarios",
      "Historial de accidentes",
      "Título y propiedad",
      "Registros de robo",
    ],
  },
} as const;

const COVERAGE_VISUALS = [
  { icon: Gauge,    accent: "bg-primary/8 text-primary",                       moreColor: "text-primary" },
  { icon: FileText, accent: "bg-secondary-container/15 text-secondary",        moreColor: "text-secondary" },
  { icon: Settings, accent: "bg-tertiary-container/10 text-tertiary-container", moreColor: "text-tertiary-container" },
] as const;

const BENTO_VISUALS = [
  { wide: true,  icon: AlertTriangle, iconColor: "text-secondary",   bg: "bg-surface-container-lowest", dark: false },
  { wide: false, icon: FileText,      iconColor: "text-on-primary",  bg: "bg-primary text-white",       dark: true },
  { wide: false, icon: Settings,      iconColor: "text-primary",     bg: "bg-surface-container-high",   dark: false },
  { wide: true,  icon: Wrench,        iconColor: "text-error",       bg: "bg-surface-container-lowest", dark: false },
] as const;

const GRID_VISUALS = [
  { icon: Camera,        color: "bg-pink-50 text-pink-600" },
  { icon: DollarSign,    color: "bg-emerald-50 text-emerald-600" },
  { icon: Gauge,         color: "bg-amber-50 text-amber-600" },
  { icon: Settings,      color: "bg-violet-50 text-violet-600" },
  { icon: BarChart3,     color: "bg-blue-50 text-blue-600" },
  { icon: Wrench,        color: "bg-red-50 text-red-600" },
  { icon: Cpu,           color: "bg-cyan-50 text-cyan-600" },
  { icon: Car,           color: "bg-indigo-50 text-indigo-600" },
  { icon: MapPin,        color: "bg-teal-50 text-teal-600" },
  { icon: AlertTriangle, color: "bg-orange-50 text-orange-600" },
  { icon: FileText,      color: "bg-purple-50 text-purple-600" },
  { icon: ShieldCheck,   color: "bg-green-50 text-green-600" },
] as const;

export default function FeaturesSection({
  locale = "en",
}: {
  locale?: Locale;
}) {
  const copy = COPY[locale];
  return (
    <>
      {/* SECTION A — Comprehensive 40+ Point Coverage */}
      <section id="features" className="py-16 sm:py-24 px-4 sm:px-6 bg-surface-container-low">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-headline font-extrabold text-primary mb-3 sm:mb-4">
              {copy.sectionAHeading}
            </h2>
            <p className="text-base sm:text-lg text-on-surface-variant max-w-3xl">
              {copy.sectionAIntro}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {copy.coverageColumns.map((col, i) => {
              const { icon: Icon, accent, moreColor } = COVERAGE_VISUALS[i];
              return (
                <div key={col.title} className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl sm:rounded-[2rem] shadow-sm">
                  <div className={`w-12 h-12 rounded-xl ${accent} flex items-center justify-center mb-6`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-headline font-bold text-on-surface mb-6">{col.title}</h4>
                  <ul className="space-y-3">
                    {col.items.map((item) => (
                      <li key={item} className="flex items-center gap-3 text-sm text-on-surface-variant">
                        <span className="w-4 h-4 rounded-full bg-green-500/15 flex items-center justify-center flex-shrink-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        </span>
                        {item}
                      </li>
                    ))}
                    <li className={`text-sm font-bold ${moreColor}`}>{col.more}</li>
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION B — Core Documentation (Bento) */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-surface-container-low">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 sm:mb-14">
            <p className="text-xs sm:text-sm font-black uppercase tracking-[0.2em] mb-3" style={{ color: "var(--color-secondary-container)" }}>{copy.sectionBEyebrow}</p>
            <h3 className="text-3xl sm:text-4xl font-headline font-extrabold text-primary">{copy.sectionBHeading}</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {copy.bentoItems.map((item, i) => {
              const { wide, icon: Icon, iconColor, bg, dark } = BENTO_VISUALS[i];
              return (
                <div
                  key={item.title}
                  className={`${wide ? "md:col-span-2" : ""} ${bg} p-6 sm:p-8 rounded-3xl sm:rounded-[2rem] flex flex-col justify-between group shadow-sm`}
                >
                  <div className="max-w-md">
                    <Icon className={`w-9 h-9 sm:w-10 sm:h-10 ${iconColor} mb-4 sm:mb-6`} />
                    <h4 className={`text-xl sm:text-2xl font-headline font-bold mb-2 sm:mb-3 ${dark ? "text-white" : "text-on-surface"}`}>
                      {item.title}
                    </h4>
                    <p className={`text-sm leading-relaxed ${dark ? "text-white/85" : "text-on-surface-variant"}`}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION C — 12-Feature Icon Grid */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <span className="text-xs sm:text-sm font-black text-primary uppercase tracking-[0.2em] mb-3 sm:mb-4 block">{copy.sectionCEyebrow}</span>
            <h2 className="text-3xl sm:text-4xl font-headline font-extrabold text-primary">
              {copy.sectionCHeading}
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {copy.featureGrid.map((title, i) => {
              const { icon: Icon, color } = GRID_VISUALS[i];
              return (
                <div
                  key={title}
                  className="group p-4 sm:p-5 bg-surface-container-lowest rounded-2xl shadow-sm hover:shadow-lg hover:shadow-outline/5 transition-all duration-300"
                >
                  <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl ${color} flex items-center justify-center mb-2.5 sm:mb-3 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-on-surface">{title}</h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
