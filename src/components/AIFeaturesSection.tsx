import { Bot, Radar, BookOpen, Compass } from "lucide-react";

const aiCards = [
  {
    icon: Bot,
    title: "AI VIN Concierge",
    description:
      "Ask plain-English questions about any VIN report. Our assistant cross-references engine data, recalls, market value, and equipment to give you a clear, honest answer in seconds.",
    accent: "border-primary",
    iconBg: "bg-primary/10 text-primary",
  },
  {
    icon: Radar,
    title: "AI Risk Insights",
    description:
      "Automatic scoring of accident severity, odometer anomalies, title brands, and ownership patterns — surfaced as red flags before you ever open your wallet.",
    accent: "border-secondary",
    iconBg: "bg-secondary-container/20 text-secondary",
  },
  {
    icon: BookOpen,
    title: "AI Vehicle Storyteller",
    description:
      "Turns dense technical records into a readable biography of the car — when and where it was built, how it was optioned, and how it has been driven and serviced.",
    accent: "border-green-500",
    iconBg: "bg-green-500/10 text-green-600",
  },
  {
    icon: Compass,
    title: "AI Vehicle Finder",
    description:
      "Describe the car you want in everyday language. Our finder matches your needs against live listings, MSRP data, and real-world reliability to surface the right VIN for you.",
    accent: "border-purple-500",
    iconBg: "bg-purple-500/10 text-purple-600",
  },
];

export default function AIFeaturesSection() {
  return (
    <section id="ai" className="py-16 sm:py-24 px-4 sm:px-6 bg-surface">
      <div className="max-w-7xl mx-auto text-center">
        <span className="text-xs sm:text-sm font-black text-primary uppercase tracking-[0.2em] mb-3 sm:mb-4 block">
          Powered by Advanced AI
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-headline font-extrabold text-primary mb-5 sm:mb-6 leading-tight">
          Don&apos;t just read data.
          <br className="hidden sm:block" />{" "}
          <span className="text-on-surface">Let AI understand it for you.</span>
        </h2>
        <p className="text-base sm:text-lg text-on-surface-variant max-w-2xl mx-auto mb-12 sm:mb-20 px-2">
          We are the first vehicle history provider to integrate advanced AI
          architecture directly into every report — turning raw VIN data into
          clear answers, stories, and warnings you can actually use.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {aiCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className={`bg-surface-container-low p-6 sm:p-8 rounded-3xl sm:rounded-[2rem] text-left border-t-4 ${card.accent} shadow-sm hover:shadow-md transition-shadow`}
              >
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl ${card.iconBg} flex items-center justify-center mb-4 sm:mb-5`}
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
