import Image from "next/image";
import { TrendingUp, Users, Shield } from "lucide-react";
import type { Locale } from "@/i18n/config";

const COPY = {
  en: {
    soldIn: "Sold in",
    soldInValue: "3 Days",
    eyebrow: "For Sellers",
    heading: "Selling Your Vehicle?",
    intro:
      "A CarCheckerVIN report helps you sell faster and at a better price. Give buyers the transparency they need to say yes with confidence.",
    imageAlt: "Vehicle listed for sale",
    benefits: [
      {
        title: "Get Top Dollar",
        description: "Vehicles with clean reports command 10–15% higher prices.",
      },
      {
        title: "Attract More Buyers",
        description: "Listings with vehicle reports get 3× more serious inquiries.",
      },
      {
        title: "Reduce Liability",
        description: "Document your vehicle's condition upfront and build buyer trust.",
      },
    ],
  },
  es: {
    soldIn: "Vendido en",
    soldInValue: "3 días",
    eyebrow: "Para vendedores",
    heading: "¿Vendes tu vehículo?",
    intro:
      "Un reporte de CarCheckerVIN te ayuda a vender más rápido y a mejor precio. Dale a los compradores la transparencia que necesitan para decir sí con confianza.",
    imageAlt: "Vehículo en venta",
    benefits: [
      {
        title: "Obtén el mejor precio",
        description: "Los vehículos con reportes limpios alcanzan precios 10–15% más altos.",
      },
      {
        title: "Atrae más compradores",
        description: "Los anuncios con reporte vehicular reciben 3× más consultas serias.",
      },
      {
        title: "Reduce tu responsabilidad",
        description: "Documenta la condición del vehículo desde el inicio y genera confianza.",
      },
    ],
  },
} as const;

const BENEFIT_VISUALS = [
  { icon: TrendingUp, accent: "bg-emerald-50 text-emerald-600" },
  { icon: Users,      accent: "bg-primary/8 text-primary" },
  { icon: Shield,     accent: "bg-violet-50 text-violet-600" },
] as const;

export default function SellerSection({
  locale = "en",
}: {
  locale?: Locale;
}) {
  const copy = COPY[locale];
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-surface">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 sm:gap-16 items-center">

        {/* Image side */}
        <div className="relative hidden lg:block">
          <div className="absolute inset-0 bg-primary/5 rounded-[2.5rem] rotate-2 -z-10" />
          <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-primary/10 -rotate-1 hover:rotate-0 transition-transform duration-500">
            <Image
              src="https://api.auto.dev/photos/retail/1N6ED1EK1SN645592-1.jpg"
              alt={copy.imageAlt}
              fill
              className="object-cover"
              sizes="600px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            <div className="absolute bottom-5 left-5 px-4 py-2.5 bg-surface-container-lowest/95 backdrop-blur rounded-2xl shadow-lg">
              <p className="text-xs text-outline font-medium">{copy.soldIn}</p>
              <p className="text-2xl font-headline font-black text-green-600">{copy.soldInValue}</p>
            </div>
          </div>
        </div>

        {/* Content side */}
        <div>
          <span className="text-xs sm:text-sm font-black text-primary uppercase tracking-[0.2em] mb-3 sm:mb-4 block">{copy.eyebrow}</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-headline font-extrabold text-primary mb-4 sm:mb-5">
            {copy.heading}
          </h2>
          <p className="text-base sm:text-lg text-on-surface-variant mb-8 sm:mb-10">
            {copy.intro}
          </p>

          <div className="space-y-3 sm:space-y-4">
            {copy.benefits.map((b, i) => {
              const { icon: Icon, accent } = BENEFIT_VISUALS[i];
              return (
                <div
                  key={b.title}
                  className="flex gap-4 sm:gap-5 p-4 sm:p-5 bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/10 hover:shadow-lg hover:shadow-outline/5 transition-all duration-300"
                >
                  <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl ${accent} flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <h3 className="font-headline font-bold text-on-surface mb-1">{b.title}</h3>
                    <p className="text-sm text-on-surface-variant">{b.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
