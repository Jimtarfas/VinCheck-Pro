import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
  Wrench,
  Zap,
  Activity,
  Cpu,
  Gauge,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import OBD2CodeLookup from "./OBD2CodeLookup";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: "Free OBD-II Code Lookup — Decode Any Check Engine Light Code",
  description:
    "Instantly decode any OBD-II / DTC trouble code. See meaning, symptoms, probable causes, severity, repair cost estimates and DIY difficulty for hundreds of codes — P0420, P0171, P0300 and more. Free, no signup.",
  keywords: [
    "obd2 code lookup",
    "obd ii codes",
    "diagnostic trouble codes",
    "check engine light codes",
    "p0420 code",
    "p0300 code",
    "p0171 code",
    "engine code lookup",
    "free obd2 scanner codes",
    "what does p0420 mean",
    "dtc lookup",
    "obd-ii code reader",
    "engine code decoder",
    "car diagnostic codes",
    "obd codes list",
    "trouble code lookup",
    "engine light code",
    "obd2 codes meaning",
    "dtc decoder",
    "p code lookup",
    "automotive diagnostic codes",
    "manufacturer specific codes",
    "generic obd codes",
    "powertrain codes",
    "body codes",
    "chassis codes",
    "network codes",
    "obd2 troubleshooting",
    "free check engine code lookup",
    "instant dtc decode",
  ],
  alternates: { canonical: "/obd2-codes" },
  openGraph: {
    title: "Free OBD-II Code Lookup — Decode Any Check Engine Light Code",
    description:
      "Decode any OBD-II diagnostic trouble code. Symptoms, causes, severity, DIY difficulty and repair cost — all free.",
    url: `${SITE}/obd2-codes`,
    type: "website",
    siteName: "CarCheckerVIN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free OBD-II Code Lookup — Decode Any Check Engine Light Code",
    description:
      "Look up any OBD-II / DTC trouble code instantly — meaning, symptoms, causes, severity and repair cost.",
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

/* ─── JSON-LD Schemas ─────────────────────────────────────── */

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": ["WebApplication", "SoftwareApplication"],
  name: "OBD-II Code Lookup",
  description:
    "Free OBD-II diagnostic trouble code (DTC) lookup. Instantly decode any P, B, C or U code with symptoms, probable causes, severity rating, DIY difficulty and estimated repair cost.",
  url: `${SITE}/obd2-codes`,
  applicationCategory: "AutomotiveApplication",
  operatingSystem: "Web Browser",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "Decode any OBD-II / DTC trouble code",
    "Instant search by code or keyword",
    "Symptoms list for each code",
    "Probable causes ranked by likelihood",
    "Severity rating (low / moderate / high / critical)",
    "DIY difficulty rating",
    "Estimated repair cost range",
    "Drivable vs tow recommendation",
    "Coverage of P, B, C and U code categories",
  ],
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
    logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
  },
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Read and Clear OBD-II Codes",
  description:
    "Pull and clear OBD-II diagnostic trouble codes from your vehicle in a few minutes using a basic scanner.",
  totalTime: "PT5M",
  tool: [
    { "@type": "HowToTool", name: "OBD-II scanner or Bluetooth dongle" },
    { "@type": "HowToTool", name: "Smartphone or laptop (for wireless scanners)" },
  ],
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Locate the OBD-II port",
      text: "On almost every vehicle from 1996 or newer, the 16-pin OBD-II port is under the dashboard on the driver's side, near the steering column. It may be hidden behind a small panel.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Plug in your scanner",
      text: "With the ignition off, connect your scanner or wireless dongle to the OBD-II port. Then turn the key to ON (engine off) — you should see the scanner power up.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Read stored codes",
      text: "Use your scanner's 'Read Codes' or 'Diagnostic' menu. Write down every code shown — both stored (active) and pending. Look up each code on this page to see what it means.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Diagnose before clearing",
      text: "Don't clear codes until you've decoded them and ideally fixed the root cause. Clearing codes resets readiness monitors, which can cause your car to fail an emissions test for several weeks.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Clear codes after repair",
      text: "Once the repair is complete, use the 'Clear Codes' or 'Erase' function. Drive the vehicle through several drive cycles to confirm the code does not return.",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does an OBD-II code mean?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An OBD-II code (also called a Diagnostic Trouble Code or DTC) is a 5-character alphanumeric code stored by your car's computer when it detects a problem. The first letter identifies the system — P for Powertrain, B for Body, C for Chassis, U for Network communication. The number that follows pinpoints the specific fault.",
      },
    },
    {
      "@type": "Question",
      name: "Is it safe to drive with the check engine light on?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It depends on the code and how the light is behaving. A solid check engine light usually indicates a non-urgent problem you can address within a week or two. A flashing check engine light means an active misfire or other serious condition — pull over and avoid driving, since you can damage the catalytic converter or internal engine components within minutes.",
      },
    },
    {
      "@type": "Question",
      name: "What does P0420 mean?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "P0420 means 'Catalyst System Efficiency Below Threshold (Bank 1)' — your catalytic converter on engine bank 1 isn't converting exhaust gases as efficiently as it should. Common causes include a worn catalytic converter, a failing downstream oxygen sensor, an exhaust leak, or upstream engine misfires fouling the cat. Repair cost typically runs $200–$2,500 depending on whether you replace just the O2 sensor or the entire converter.",
      },
    },
    {
      "@type": "Question",
      name: "What does P0171 mean?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "P0171 means 'System Too Lean (Bank 1)' — the engine is getting too much air relative to fuel on bank 1. Common causes are a vacuum leak (intake gasket, hoses, or PCV system), a dirty mass air flow (MAF) sensor, a weak fuel pump, a clogged fuel filter, or a failing oxygen sensor. Many P0171s are fixed by cleaning the MAF sensor with proper MAF cleaner or finding a small vacuum leak.",
      },
    },
    {
      "@type": "Question",
      name: "Will clearing OBD codes pass an emissions test?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No — clearing codes resets the OBD-II readiness monitors, and most states require all monitors to be 'ready' before the car can be tested. After clearing, you typically need to drive 50–200 miles through specific drive cycles for monitors to set. Most states allow only one or two monitors to be 'not ready' at the time of inspection.",
      },
    },
    {
      "@type": "Question",
      name: "What's the difference between generic and manufacturer-specific codes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Generic codes (like P0XXX) are defined by the SAE J2012 standard and mean the same thing on every vehicle. Manufacturer-specific codes (P1XXX, B1XXX, C1XXX, U1XXX) are defined by individual automakers — the same number can mean different things on a Ford vs a Toyota. Always confirm manufacturer-specific code definitions in your vehicle's service manual.",
      },
    },
    {
      "@type": "Question",
      name: "Can I read OBD-II codes without a scanner?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "On a small number of older vehicles you can flash the check engine light by jumping pins on the OBD-II connector or cycling the ignition key, but for most 2000+ vehicles you need a scan tool. Inexpensive Bluetooth OBD-II dongles paired with a free smartphone app cost $20–$40 and read all generic OBD-II codes plus live data.",
      },
    },
    {
      "@type": "Question",
      name: "How much does it cost to fix a check engine light?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It varies enormously by code. Cheap fixes include a tightened gas cap (free, P0457), a new oxygen sensor ($150–$400), or new spark plugs ($50–$300). Expensive fixes include a new catalytic converter ($500–$2,500), a transmission rebuild from a P0700 code ($1,500–$4,000), or PCM replacement ($400–$2,000). Always decode the code first to set the right expectation.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE },
    { "@type": "ListItem", position: 2, name: "OBD-II Code Lookup", item: `${SITE}/obd2-codes` },
  ],
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "OBD-II Code Lookup",
  url: `${SITE}/obd2-codes`,
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", "#what-is-obd2", "#severity-levels", ".faq-answer"],
    xpath: ["/html/head/title", "/html/body//h1"],
  },
};

/* ─── Static reference data ──────────────────────────────── */

const TOP_20_CODES = [
  { code: "P0420", title: "Catalyst Efficiency Below Threshold (Bank 1)" },
  { code: "P0430", title: "Catalyst Efficiency Below Threshold (Bank 2)" },
  { code: "P0171", title: "System Too Lean (Bank 1)" },
  { code: "P0174", title: "System Too Lean (Bank 2)" },
  { code: "P0172", title: "System Too Rich (Bank 1)" },
  { code: "P0300", title: "Random/Multiple Cylinder Misfire" },
  { code: "P0301", title: "Cylinder 1 Misfire" },
  { code: "P0302", title: "Cylinder 2 Misfire" },
  { code: "P0303", title: "Cylinder 3 Misfire" },
  { code: "P0304", title: "Cylinder 4 Misfire" },
  { code: "P0011", title: "Camshaft Timing Over-Advanced (Bank 1)" },
  { code: "P0128", title: "Coolant Temp Below Thermostat Regulating Temp" },
  { code: "P0455", title: "EVAP Large Leak Detected" },
  { code: "P0456", title: "EVAP Very Small Leak Detected" },
  { code: "P0442", title: "EVAP Small Leak Detected" },
  { code: "P0700", title: "Transmission Control System Malfunction" },
  { code: "P0750", title: "Shift Solenoid 'A' Malfunction" },
  { code: "P0335", title: "Crankshaft Position Sensor 'A' Malfunction" },
  { code: "P0506", title: "Idle Air Control RPM Lower Than Expected" },
  { code: "U0100", title: "Lost Communication With ECM/PCM 'A'" },
];

export default function OBD2CodesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />

      <main className="pt-28 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "OBD-II Code Lookup" },
            ]}
          />

          <h1 className="mt-6 text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
            Free OBD-II Code Lookup
          </h1>
          <p className="mt-4 text-lg text-slate-700 leading-relaxed">
            Decode any check engine light code instantly. Search by code or keyword to see
            meaning, symptoms, probable causes, severity, DIY difficulty, and estimated
            repair cost. Free, no signup, all generic and common manufacturer-specific
            codes covered.
          </p>

          {/* ── VIN Card CTA near top ── */}
          <div className="mt-8">
            <VinCheckBanner variant="card" />
          </div>

          {/* ── Lookup Tool ── */}
          <div className="mt-8">
            <OBD2CodeLookup />
          </div>

          {/* ── What is an OBD-II code ── */}
          <section id="what-is-obd2" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              What is an OBD-II Code?
            </h2>
            <p className="text-slate-700 leading-relaxed">
              An OBD-II code — also called a Diagnostic Trouble Code or DTC — is a
              5-character code stored in your vehicle&rsquo;s computer when it detects a
              fault. Every car sold in the United States since 1996 uses this same standard
              (defined in SAE J2012), which is why the same scanner works on a Honda Civic,
              a Ford F-150, and a BMW 3 Series.
            </p>
            <p className="mt-3 text-slate-700 leading-relaxed">
              The format is always: <strong>one letter + four digits</strong>. The letter
              identifies the system. The first digit (0 or 1) tells you whether the code is
              generic or manufacturer-specific. The remaining three digits identify the
              specific fault. So <span className="font-mono font-bold">P0420</span> is a
              generic <em>powertrain</em> code, while{" "}
              <span className="font-mono font-bold">P1399</span> is a manufacturer-specific
              powertrain code (Honda, in this case).
            </p>
          </section>

          {/* ── Code Categories ── */}
          <section id="categories" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-5">
              Code Categories Explained
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  letter: "P",
                  name: "Powertrain",
                  icon: Activity,
                  desc: "Engine, transmission, fuel system, ignition, emissions. The largest category — about 70% of codes most drivers encounter.",
                  examples: "P0420, P0171, P0300, P0700",
                  color: "primary",
                },
                {
                  letter: "B",
                  name: "Body",
                  icon: Cpu,
                  desc: "Airbags (SRS), climate control, lighting, power windows, seats and interior electronics.",
                  examples: "B0001, B1000, B1318",
                  color: "purple",
                },
                {
                  letter: "C",
                  name: "Chassis",
                  icon: Gauge,
                  desc: "ABS, traction control, stability control, suspension, steering, tire pressure (TPMS).",
                  examples: "C0035, C1145, C0110",
                  color: "cyan",
                },
                {
                  letter: "U",
                  name: "Network / Communication",
                  icon: Zap,
                  desc: "CAN bus and inter-module communication faults — when modules can't talk to each other on the in-vehicle network.",
                  examples: "U0100, U0140, U0155",
                  color: "slate",
                },
              ].map(({ letter, name, icon: Icon, desc, examples }) => (
                <div
                  key={letter}
                  className="bg-white border border-slate-200 rounded-xl p-5 hover:border-primary-300 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-mono font-bold text-slate-900">
                      {letter}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{name}</p>
                      <p className="text-[11px] text-slate-500">
                        <Icon className="w-3 h-3 inline mr-1" />
                        Category {letter}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">{desc}</p>
                  <p className="mt-2 text-[11px] text-slate-500 font-mono">
                    Examples: {examples}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Top 20 codes ── */}
          <section id="top-codes" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Top 20 Most Common OBD-II Codes
            </h2>
            <p className="text-slate-600 leading-relaxed mb-5">
              These are the codes mechanics see most often. Click any code to decode it.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {TOP_20_CODES.map(({ code, title }) => (
                <Link
                  key={code}
                  href={`/obd2-codes#${code}`}
                  className="flex items-center justify-between gap-3 px-4 py-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-primary-300 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="font-mono font-bold text-sm text-slate-900 flex-shrink-0">
                      {code}
                    </span>
                    <span className="text-xs text-slate-600 truncate">{title}</span>
                  </div>
                  <span className="text-slate-400 font-bold text-xs flex-shrink-0">→</span>
                </Link>
              ))}
            </div>
          </section>

          {/* ── Severity Levels ── */}
          <section id="severity-levels" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-5">
              Severity Levels Explained
            </h2>
            <div className="space-y-3">
              {[
                {
                  label: "Low",
                  pill: "bg-emerald-100 text-emerald-800 border-emerald-200",
                  text: "Minor issue. Continue driving normally; address at your convenience or before an emissions test. Examples: loose gas cap, EVAP small leak, O2 sensor heater fault.",
                },
                {
                  label: "Moderate",
                  pill: "bg-amber-100 text-amber-800 border-amber-200",
                  text: "Address within a few weeks. Affects fuel economy or emissions but not driveability. Examples: dirty MAF, slow O2 sensor, mild lean/rich condition.",
                },
                {
                  label: "High",
                  pill: "bg-orange-100 text-orange-800 border-orange-200",
                  text: "Repair as soon as possible. Continued driving may damage expensive components. Examples: misfires, transmission solenoid faults, catalyst efficiency.",
                },
                {
                  label: "Critical",
                  pill: "bg-red-100 text-red-800 border-red-200",
                  text: "Stop driving. Tow to a repair shop. Risk of safety system failure or major engine/transmission damage. Examples: airbag deployment circuit faults, lost PCM communication.",
                },
              ].map(({ label, pill, text }) => (
                <div key={label} className="flex items-start gap-3 p-4 bg-white border border-slate-200 rounded-xl">
                  <span
                    className={`text-[10px] uppercase font-bold px-2 py-1 rounded border flex-shrink-0 ${pill}`}
                  >
                    {label}
                  </span>
                  <p className="text-sm text-slate-700 leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Mid-page banner ── */}
          <div className="mt-14">
            <VinCheckBanner />
          </div>

          {/* ── Read codes without scanner ── */}
          <section id="read-without-scanner" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              How to Read OBD Codes Without a Scanner
            </h2>
            <p className="text-slate-700 leading-relaxed">
              Most modern cars require a scanner to read trouble codes — but there are a few
              free options before you spend money:
            </p>
            <ul className="mt-4 space-y-3">
              {[
                {
                  title: "Use a free retail scan",
                  detail:
                    "AutoZone, O&rsquo;Reilly, Advance Auto Parts, and most regional chains will scan your codes for free. They&rsquo;ll print out the codes — bring the printout home and decode each one here.",
                },
                {
                  title: "Buy a $20 Bluetooth dongle",
                  detail:
                    "An ELM327-compatible Bluetooth OBD-II dongle plus a free app like Torque, Car Scanner, or OBD Auto Doctor can read codes, clear codes, and show live data on your phone. Strongly recommended if you plan to keep older vehicles.",
                },
                {
                  title: "Check the key-cycle method (older cars only)",
                  detail:
                    "Some pre-2005 GM, Chrysler, and Honda vehicles flash the codes on the dash by cycling the ignition key (typically ON-OFF-ON-OFF-ON without starting). This rarely works on modern vehicles. Search your specific year/make/model to confirm.",
                },
                {
                  title: "Use the iPhone or Android shop apps",
                  detail:
                    "Some vehicles (newer Teslas, GM cars with OnStar, Ford with FordPass) display fault codes directly in the manufacturer&rsquo;s app without needing a scanner.",
                },
              ].map(({ title, detail }) => (
                <li key={title} className="flex gap-3 items-start">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">
                    <strong className="text-slate-900">{title}</strong>{" "}
                    — <span dangerouslySetInnerHTML={{ __html: detail }} />
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* ── Drive vs tow ── */}
          <section id="drive-vs-tow" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              When to Drive vs Tow
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-xl">
                <h3 className="flex items-center gap-2 font-bold text-emerald-900 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  OK to drive (cautiously)
                </h3>
                <ul className="space-y-2 text-sm text-emerald-900">
                  <li>• Solid (not flashing) check engine light</li>
                  <li>• EVAP / gas cap codes (P0440-series, P0455-P0457)</li>
                  <li>• Most O2 sensor heater faults</li>
                  <li>• Catalyst efficiency codes (P0420 / P0430)</li>
                  <li>• Coolant temp circuit faults (P0117 / P0118)</li>
                </ul>
              </div>
              <div className="p-5 bg-red-50 border border-red-200 rounded-xl">
                <h3 className="flex items-center gap-2 font-bold text-red-900 mb-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  Stop &amp; tow
                </h3>
                <ul className="space-y-2 text-sm text-red-900">
                  <li>• Flashing check engine light (active misfire)</li>
                  <li>• Critical-severity airbag/SRS codes (B0001-series)</li>
                  <li>• Low oil pressure or overheating warning</li>
                  <li>• Lost PCM communication (U0100)</li>
                  <li>• Hard-shift / limp-mode transmission codes</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
              <ShieldAlert className="w-5 h-5 flex-shrink-0 mt-0.5 text-amber-600" />
              <p>
                <strong>Rule of thumb:</strong> if the check engine light is flashing, pull
                over within a mile and shut the engine off. Continued driving with an active
                misfire can destroy a $1,500+ catalytic converter in under 10 minutes.
              </p>
            </div>
          </section>

          {/* ── Cross-links ── */}
          <div className="mt-14 grid sm:grid-cols-3 gap-3">
            {[
              { href: "/vin-check", label: "Free VIN Check", sub: "Full vehicle history report" },
              { href: "/recall-lookup", label: "Recall Lookup", sub: "Open NHTSA safety recalls" },
              { href: "/window-sticker", label: "Window Sticker", sub: "Original equipment & options" },
            ].map(({ href, label, sub }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center justify-between gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <div>
                  <p className="font-bold text-slate-900 text-sm">{label}</p>
                  <p className="text-xs text-slate-600 mt-0.5">{sub}</p>
                </div>
                <span className="text-slate-500 font-bold text-xs flex-shrink-0">→</span>
              </Link>
            ))}
          </div>

          {/* ── FAQ ── */}
          <section id="faq" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Frequently Asked Questions
            </h2>
            <dl className="space-y-6">
              {[
                {
                  q: "What does an OBD-II code mean?",
                  a: "It's a 5-character code (1 letter + 4 digits) stored by your car's computer when it detects a fault. The letter identifies the affected system: P=Powertrain, B=Body, C=Chassis, U=Network.",
                },
                {
                  q: "Is it safe to drive with the check engine light on?",
                  a: "A solid CEL is usually OK to drive home, but a flashing CEL means an active misfire — pull over and avoid driving to prevent catalytic converter damage.",
                },
                {
                  q: "What does P0420 mean?",
                  a: "P0420 is 'Catalyst System Efficiency Below Threshold (Bank 1)' — your catalytic converter isn't working efficiently. Often caused by a worn cat, faulty O2 sensor, or exhaust leak. Repair: $200–$2,500.",
                },
                {
                  q: "Will clearing OBD codes pass an emissions test?",
                  a: "No — clearing codes resets readiness monitors. Most states require monitors to be 'set' before testing, which takes 50–200 miles of normal driving across multiple drive cycles.",
                },
                {
                  q: "Can a check engine light come back on after I clear it?",
                  a: "Yes, if the underlying problem isn't fixed. Many codes will return within 1–3 drive cycles. Always diagnose and repair the root cause before clearing.",
                },
                {
                  q: "What's the difference between generic and manufacturer-specific codes?",
                  a: "Generic codes (P0XXX) are the same across all manufacturers. Manufacturer-specific codes (P1XXX, B1XXX, C1XXX, U1XXX) are defined by the automaker and may mean different things on different brands.",
                },
                {
                  q: "How much does it cost to fix a check engine light?",
                  a: "Anywhere from $0 (tighten gas cap) to $4,000+ (transmission rebuild). Decode the specific code first to set the right expectation — this tool gives you a cost range for each code.",
                },
                {
                  q: "Can I read OBD-II codes without a scanner?",
                  a: "On most modern vehicles, no — you need a scan tool. A $20–$40 Bluetooth dongle paired with a free phone app is the cheapest option. Most auto parts stores will also scan your codes for free.",
                },
              ].map(({ q, a }) => (
                <div key={q} className="faq-answer">
                  <dt className="font-bold text-slate-900">{q}</dt>
                  <dd className="mt-1.5 text-slate-600 leading-relaxed">{a}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* ── Related ── */}
          <div className="mt-14">
            <RelatedChecks exclude="/obd2-codes" />
          </div>
        </div>
      </main>

      {/* ── Bottom CTA ── */}
      <section className="py-14 bg-slate-50 border-t border-slate-200">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Buying a Used Car With Active Codes?
          </h2>
          <p className="text-slate-600 mb-6">
            Recurring trouble codes can hint at hidden accident damage, flood history, or
            salvage rebuilds. Run a free VIN check to see the full vehicle history before
            you buy.
          </p>
          <Link
            href="/vin-check"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl transition-colors"
          >
            <Wrench className="w-4 h-4" />
            Run a Free VIN Check
          </Link>
        </div>
      </section>
    </>
  );
}
