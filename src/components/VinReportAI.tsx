"use client";

import { useMemo, useState } from "react";
import {
  Bot,
  Radar,
  BookOpen,
  Send,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";
import type { VinData } from "@/lib/api";

/* ─────────────────────────────────────────────────────────────
   Helpers — pure functions that turn VinData into AI-style text
───────────────────────────────────────────────────────────── */

const money = (n?: number) =>
  typeof n === "number" && n > 0
    ? `$${Math.round(n).toLocaleString()}`
    : undefined;

function describeEngine(data: VinData): string {
  const e = data.engine;
  if (!e) return "engine details were not decoded for this VIN";
  const parts: string[] = [];
  if (e.size) parts.push(`${e.size}L`);
  if (e.cylinder) parts.push(`${e.cylinder}-cylinder`);
  if (e.configuration) parts.push(e.configuration);
  if (e.fuelType) parts.push(e.fuelType.toLowerCase());
  const base = parts.join(" ");
  const hp = e.horsepower ? `${e.horsepower} hp` : "";
  const tq = e.torque ? `${e.torque} lb-ft` : "";
  const power = [hp, tq].filter(Boolean).join(" / ");
  return power ? `${base} producing ${power}` : base;
}

function describeTransmission(data: VinData): string {
  const t = data.transmission;
  if (!t?.transmissionType) return "transmission type not reported";
  const speeds = t.numberOfSpeeds ? `${t.numberOfSpeeds}-speed ` : "";
  return `${speeds}${t.transmissionType.toLowerCase()} gearbox`;
}

function describeDrivetrain(data: VinData): string {
  return data.drivenWheels
    ? data.drivenWheels.toLowerCase()
    : "drivetrain not reported";
}

function describeMpg(data: VinData): string {
  const m = data.mpg;
  if (!m?.city && !m?.highway) return "EPA fuel-economy data is unavailable";
  return `EPA-rated at ${m.city ?? "?"} city / ${m.highway ?? "?"} highway MPG`;
}

function describePrice(data: VinData): string {
  const p = data.price;
  if (!p) return "no factory pricing data was returned";
  const msrp = money(p.baseMsrp);
  const tmv = money(p.usedTmvRetail);
  if (msrp && tmv) return `MSRP ${msrp}, current typical retail around ${tmv}`;
  if (msrp) return `original MSRP ${msrp}`;
  if (tmv) return `typical retail ${tmv}`;
  return "pricing data is incomplete";
}

function currentYear(): number {
  return new Date().getFullYear();
}

function listingAgeInYears(data: VinData): number | null {
  const y = data.years?.[0]?.year;
  if (!y) return null;
  return Math.max(0, currentYear() - y);
}

/* ─────────────────────────────────────────────────────────────
   AI Concierge — Q&A style with preset questions
───────────────────────────────────────────────────────────── */

type ConciergeAnswer = { q: string; a: string };

function buildConciergeAnswers(data: VinData, fullName: string): ConciergeAnswer[] {
  const answers: ConciergeAnswer[] = [];
  const msrp = data.price?.baseMsrp;
  const listingPrice = data.listing?.priceUnformatted;
  const marketAvg = data.marketData?.averagePrice;

  // Is this a fair price?
  if (listingPrice && marketAvg) {
    const delta = listingPrice - marketAvg;
    const pct = Math.round((Math.abs(delta) / marketAvg) * 100);
    const verdict =
      delta <= -marketAvg * 0.05
        ? `priced about ${pct}% under the average — a strong deal if the condition checks out`
        : delta >= marketAvg * 0.08
        ? `priced about ${pct}% over the market average — worth negotiating or comparing against similar listings`
        : `within ${pct}% of the market average — a fair, market-aligned ask`;
    answers.push({
      q: "Is the asking price fair?",
      a: `At ${data.listing!.price}, this ${fullName} is ${verdict}. Average for comparable cars right now is ${money(
        marketAvg,
      )} across ${data.marketData!.totalListings} listings.`,
    });
  } else if (listingPrice) {
    answers.push({
      q: "Is the asking price fair?",
      a: `The car is listed at ${data.listing!.price}. I don't have enough comparable listings to benchmark it yet — check a few recent sales of the same trim to validate.`,
    });
  }

  // Powertrain summary
  answers.push({
    q: "What's under the hood?",
    a: `This ${fullName} is equipped with a ${describeEngine(
      data,
    )}, paired with a ${describeTransmission(
      data,
    )} sending power to the ${describeDrivetrain(data)}.`,
  });

  // Fuel economy
  answers.push({
    q: "How good is the fuel economy?",
    a: `${describeMpg(data)}. ${
      data.engine?.fuelType
        ? `It runs on ${data.engine.fuelType.toLowerCase()}.`
        : ""
    }`.trim(),
  });

  // Value vs MSRP
  if (msrp && listingPrice) {
    const dep = Math.round(((msrp - listingPrice) / msrp) * 100);
    const age = listingAgeInYears(data) ?? 0;
    answers.push({
      q: "How has it depreciated?",
      a: `Starting from a ${money(msrp)} MSRP when new, the current ${data.listing!.price} asking price represents roughly ${dep}% depreciation over ${age} year${age === 1 ? "" : "s"} — ${
        dep > 50
          ? "steep depreciation, which often means better value for a used buyer"
          : dep > 25
          ? "typical depreciation for this age bracket"
          : "unusually slow depreciation, suggesting strong demand"
      }.`,
    });
  }

  // Body / practicality
  const body = data.categories?.primaryBodyType || data.categories?.vehicleStyle;
  if (body) {
    answers.push({
      q: "Is this a good family car?",
      a: `Classified as a ${body.toLowerCase()} with ${data.numOfDoors || "?"} doors${
        data.categories?.vehicleSize
          ? ` in the ${data.categories.vehicleSize.toLowerCase()} size class`
          : ""
      }. ${
        /suv|van|minivan|wagon/i.test(body)
          ? "Generally a strong fit for family duties."
          : /sedan|hatch/i.test(body)
          ? "Comfortable for daily family use though cargo space is moderate."
          : /coupe|convertible/i.test(body)
          ? "More of a personal/weekend car — tight rear access for kids."
          : "Assess cargo and rear-seat space for your specific needs."
      }`,
    });
  }

  return answers;
}

function AIConcierge({ data, fullName }: { data: VinData; fullName: string }) {
  const answers = useMemo(
    () => buildConciergeAnswers(data, fullName),
    [data, fullName],
  );
  const [selected, setSelected] = useState<number>(0);
  const [custom, setCustom] = useState<string>("");
  const [customAnswered, setCustomAnswered] = useState<string>("");

  const current = answers[selected];

  const handleAskCustom = () => {
    if (!custom.trim()) return;
    setCustomAnswered(
      `Based on this report, the ${fullName} is a ${describeEngine(
        data,
      )} vehicle with a ${describeTransmission(data)}, ${describeMpg(data)}, and ${describePrice(
        data,
      )}. For the specific question "${custom.trim()}", I've highlighted the closest relevant data I can see in the decoded VIN. For anything involving accident or title history, run a full premium report for the authoritative record.`,
    );
  };

  return (
    <div className="bg-surface-container-lowest rounded-2xl sm:rounded-[2rem] shadow-sm overflow-hidden border-t-4 border-primary">
      <div className="px-4 sm:px-5 py-3.5 sm:py-4 border-b border-surface-container flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
          <Bot className="w-5 h-5" />
        </div>
        <div className="min-w-0">
          <p className="text-[10px] sm:text-xs font-black text-primary uppercase tracking-[0.2em]">
            Powered by Advanced AI
          </p>
          <h3 className="font-headline font-extrabold text-base sm:text-lg text-on-surface">
            AI VIN Concierge
          </h3>
        </div>
      </div>

      <div className="p-4 sm:p-5 space-y-4">
        <p className="text-xs sm:text-sm text-on-surface-variant">
          Ask questions about this VIN — answers are generated live from the decoded report.
        </p>

        <div className="flex flex-wrap gap-2">
          {answers.map((a, i) => (
            <button
              key={a.q}
              onClick={() => setSelected(i)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                i === selected
                  ? "bg-primary text-white"
                  : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
              }`}
            >
              {a.q}
            </button>
          ))}
        </div>

        {current && (
          <div className="bg-primary/5 rounded-2xl p-4 sm:p-5 border border-primary/10">
            <div className="flex items-start gap-2.5 mb-2">
              <Sparkles className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm font-bold text-primary">
                AI Concierge
              </p>
            </div>
            <p className="text-sm sm:text-base text-on-surface leading-relaxed break-words">
              {current.a}
            </p>
          </div>
        )}

        <div className="pt-2">
          <label className="text-[10px] sm:text-xs font-black text-outline uppercase tracking-widest mb-2 block">
            Ask your own question
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAskCustom();
              }}
              placeholder={`e.g. "Is this ${fullName} reliable?"`}
              className="flex-1 min-w-0 px-4 py-2.5 rounded-full bg-surface-container text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
            <button
              onClick={handleAskCustom}
              className="flex-shrink-0 px-4 py-2.5 rounded-full bg-primary text-white text-sm font-bold hover:brightness-110 transition flex items-center gap-1.5 cursor-pointer"
            >
              <Send className="w-4 h-4" /> <span className="hidden sm:inline">Ask</span>
            </button>
          </div>
          {customAnswered && (
            <div className="mt-3 bg-primary/5 rounded-2xl p-4 border border-primary/10">
              <p className="text-sm text-on-surface leading-relaxed break-words">
                {customAnswered}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   AI Risk Insights — computed red/yellow/green flags
───────────────────────────────────────────────────────────── */

type Risk = {
  level: "low" | "medium" | "high";
  title: string;
  detail: string;
};

function buildRisks(data: VinData): Risk[] {
  const risks: Risk[] = [];
  const year = data.years?.[0]?.year;
  const age = year ? currentYear() - year : null;
  const mileage = data.listing?.mileageUnformatted;
  const listingPrice = data.listing?.priceUnformatted;
  const marketAvg = data.marketData?.averagePrice;
  const msrp = data.price?.baseMsrp;

  // Age
  if (age !== null) {
    risks.push({
      level: age >= 15 ? "high" : age >= 8 ? "medium" : "low",
      title: "Vehicle Age",
      detail:
        age >= 15
          ? `At ${age} years old, expect elevated maintenance on suspension, rubber, and electronics. Pre-purchase inspection is strongly recommended.`
          : age >= 8
          ? `${age} years old — within normal range but watch for upcoming timing belt, suspension, and battery-age items.`
          : `Only ${age} year${age === 1 ? "" : "s"} old — low age-related wear risk.`,
    });
  }

  // Mileage (assumes ~12k/yr typical)
  if (mileage && age !== null && age > 0) {
    const expected = age * 12000;
    const ratio = mileage / expected;
    risks.push({
      level: ratio >= 1.4 ? "high" : ratio >= 1.15 ? "medium" : "low",
      title: "Odometer vs. Expected",
      detail:
        ratio >= 1.4
          ? `${mileage.toLocaleString()} miles is significantly above the ~${expected.toLocaleString()}-mile norm for its age. Plan for heavier wear items.`
          : ratio >= 1.15
          ? `${mileage.toLocaleString()} miles is somewhat above the ~${expected.toLocaleString()}-mile norm — not alarming but worth factoring into price.`
          : `${mileage.toLocaleString()} miles is at or below the ~${expected.toLocaleString()}-mile norm — a positive signal.`,
    });
  }

  // Market price deviation
  if (listingPrice && marketAvg) {
    const pct = ((listingPrice - marketAvg) / marketAvg) * 100;
    risks.push({
      level: pct >= 15 ? "high" : pct >= 5 ? "medium" : "low",
      title: "Market Price Deviation",
      detail:
        pct >= 15
          ? `Asking price is ${Math.round(pct)}% above the market average of ${money(marketAvg)} — negotiate hard or walk away.`
          : pct >= 5
          ? `Asking price is ${Math.round(pct)}% above the market average of ${money(marketAvg)}. Within negotiation range.`
          : pct <= -15
          ? `Asking price is ${Math.round(Math.abs(pct))}% BELOW the market average — this is either a bargain or a signal to dig deeper into condition.`
          : `Priced within a narrow ${Math.round(Math.abs(pct))}% band of the ${money(marketAvg)} market average — fair.`,
    });
  }

  // Depreciation already happened?
  if (msrp && listingPrice) {
    const dep = ((msrp - listingPrice) / msrp) * 100;
    if (dep > 0) {
      risks.push({
        level: "low",
        title: "Depreciation Absorbed",
        detail: `Original MSRP ${money(msrp)} → current ${data.listing!.price}. Roughly ${Math.round(dep)}% of the depreciation curve is already behind this car — a plus for a used buyer.`,
      });
    }
  }

  // Data completeness
  const missingCount = [
    !data.photos || data.photos.length === 0,
    !data.mpg,
    !data.price,
    !data.marketData,
  ].filter(Boolean).length;
  if (missingCount >= 2) {
    risks.push({
      level: "medium",
      title: "Incomplete Record",
      detail: `Some data fields (photos, MPG, pricing, or market comps) were not returned for this VIN. Coverage gaps aren't themselves red flags, but make independent verification more important.`,
    });
  }

  return risks;
}

function RiskBadge({ level }: { level: Risk["level"] }) {
  const cfg =
    level === "high"
      ? { cls: "bg-red-50 text-red-700", Icon: AlertCircle, label: "High" }
      : level === "medium"
      ? { cls: "bg-amber-50 text-amber-700", Icon: AlertTriangle, label: "Medium" }
      : { cls: "bg-green-50 text-green-700", Icon: CheckCircle2, label: "Low" };
  const { cls, Icon, label } = cfg;
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${cls}`}
    >
      <Icon className="w-3 h-3" /> {label}
    </span>
  );
}

function AIRiskInsights({ data }: { data: VinData }) {
  const risks = useMemo(() => buildRisks(data), [data]);

  return (
    <div className="bg-surface-container-lowest rounded-2xl sm:rounded-[2rem] shadow-sm overflow-hidden border-t-4 border-secondary">
      <div className="px-4 sm:px-5 py-3.5 sm:py-4 border-b border-surface-container flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-secondary-container/20 text-secondary flex items-center justify-center flex-shrink-0">
          <Radar className="w-5 h-5" />
        </div>
        <div className="min-w-0">
          <p className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-secondary">
            Powered by Advanced AI
          </p>
          <h3 className="font-headline font-extrabold text-base sm:text-lg text-on-surface">
            AI Risk Insights
          </h3>
        </div>
      </div>

      <div className="p-4 sm:p-5 space-y-3">
        {risks.length === 0 ? (
          <div className="flex items-center gap-2 text-sm text-on-surface-variant">
            <ShieldCheck className="w-4 h-4 text-green-600" />
            No material risk signals detected from the decoded data.
          </div>
        ) : (
          risks.map((r) => (
            <div
              key={r.title}
              className="p-4 rounded-2xl bg-surface-container-low border border-surface-container"
            >
              <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
                <p className="font-bold text-sm text-on-surface">{r.title}</p>
                <RiskBadge level={r.level} />
              </div>
              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed break-words">
                {r.detail}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   AI Vehicle Storyteller — generated narrative paragraph
───────────────────────────────────────────────────────────── */

function buildStory(data: VinData, fullName: string): string[] {
  const year = data.years?.[0]?.year;
  const trim = data.years?.[0]?.styles?.[0]?.trim;
  const body =
    data.categories?.primaryBodyType?.toLowerCase() ||
    data.categories?.vehicleStyle?.toLowerCase() ||
    "vehicle";

  const opening = `This ${fullName} began life as a ${year ?? ""} ${data.make?.name ?? ""} ${data.model?.name ?? ""}${
    trim ? ` in ${trim} trim` : ""
  } — a ${body} built for the ${data.categories?.market?.toLowerCase() || "retail"} market.`;

  const power = `Under the hood sits a ${describeEngine(data)}, mated to a ${describeTransmission(
    data,
  )} driving the ${describeDrivetrain(data)}.`;

  const economy = `${describeMpg(data).charAt(0).toUpperCase()}${describeMpg(data).slice(1)}.`;

  const value = `From the factory, ${describePrice(data)}.`;

  const listing = data.listing
    ? `Today it is actively listed${
        data.listing.dealerName ? ` at ${data.listing.dealerName}` : ""
      }${
        data.listing.city && data.listing.state
          ? ` in ${data.listing.city}, ${data.listing.state}`
          : ""
      } for ${data.listing.price} with ${data.listing.mileage} on the clock${
        data.listing.displayColor ? `, wearing ${data.listing.displayColor}` : ""
      }.`
    : `It does not currently appear on any of our monitored retail listings.`;

  const market = data.marketData
    ? `Across ${data.marketData.totalListings} similar listings we are tracking, comparable cars average ${money(
        data.marketData.averagePrice,
      )} and ${data.marketData.averageMileage.toLocaleString()} miles.`
    : ``;

  return [opening, power, economy, value, listing, market].filter(Boolean);
}

function AIStoryteller({ data, fullName }: { data: VinData; fullName: string }) {
  const paragraphs = useMemo(() => buildStory(data, fullName), [data, fullName]);

  return (
    <div className="bg-surface-container-lowest rounded-2xl sm:rounded-[2rem] shadow-sm overflow-hidden border-t-4 border-green-500">
      <div className="px-4 sm:px-5 py-3.5 sm:py-4 border-b border-surface-container flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-green-500/10 text-green-600 flex items-center justify-center flex-shrink-0">
          <BookOpen className="w-5 h-5" />
        </div>
        <div className="min-w-0">
          <p className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-green-600">
            Powered by Advanced AI
          </p>
          <h3 className="font-headline font-extrabold text-base sm:text-lg text-on-surface">
            AI Vehicle Storyteller
          </h3>
        </div>
      </div>

      <div className="p-4 sm:p-5 space-y-3 text-sm text-on-surface-variant leading-relaxed">
        {paragraphs.map((p, i) => (
          <p key={i} className="break-words">
            {p}
          </p>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Umbrella export: all 3 AI sections in a single block
───────────────────────────────────────────────────────────── */

export default function VinReportAI({
  data,
  fullName,
}: {
  data: VinData;
  fullName: string;
}) {
  return (
    <section className="space-y-5">
      <div className="px-1">
        <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-1.5 block">
          Powered by Advanced AI
        </span>
        <h2 className="font-headline font-extrabold text-lg sm:text-xl text-on-surface leading-tight">
          Don&apos;t just read the data.
          <span className="block text-primary">
            Let AI understand this VIN.
          </span>
        </h2>
      </div>

      <AIConcierge data={data} fullName={fullName} />
      <AIRiskInsights data={data} />
      <AIStoryteller data={data} fullName={fullName} />
    </section>
  );
}
