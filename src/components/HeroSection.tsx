import Image from "next/image";
import VinSearchForm from "./VinSearchForm";
import VinLocatorHint from "./VinLocatorHint";

const trustedSources = [
  { id: "nmvtis",     src: "https://epicvin.com/img2/security/webp/nmvtis-logo@2x.webp",  alt: "NMVTIS",                  h: "h-5" },
  { id: "niada",      src: "https://epicvin.com/img2/security/png/niada-logo.png",         alt: "NIADA",                   h: "h-4" },
  { id: "blockchain", src: "https://epicvin.com/img2/security/svg/blockchain-icon.svg",    alt: "Blockchain Confirmed Data",h: "h-5" },
];

const stats = [
  { value: "50K+",   label: "Trusted Buyers" },
  { value: "4.9",    label: "Avg Rating" },
  { value: "<60s",   label: "Report Speed" },
  { value: "40+",    label: "Data Points" },
];

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative pt-20 pb-6 sm:pt-24 sm:pb-10 lg:pt-32 lg:pb-16 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #f7f9fc 0%, #eceef1 100%)" }}
    >
      {/* Soft background blobs */}
      <div className="absolute top-0 right-0 w-[32rem] h-[32rem] rounded-full opacity-30 -translate-y-1/2 translate-x-1/3 pointer-events-none"
        style={{ background: "radial-gradient(circle, #003178 0%, transparent 70%)", filter: "blur(80px)" }} />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-20 translate-y-1/2 -translate-x-1/3 pointer-events-none"
        style={{ background: "radial-gradient(circle, #ff9800 0%, transparent 70%)", filter: "blur(60px)" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-12 gap-10 sm:gap-12 items-center">

        {/* ── Left: Content ── */}
        <div className="lg:col-span-7 z-10">

          {/* Eyebrow */}
          <div className="animate-fade-in-up">
            <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-primary/8 border border-primary/10 text-xs sm:text-sm font-semibold text-primary mb-5 sm:mb-6">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Free Vehicle Reports — Instant Results
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-headline font-extrabold text-4xl sm:text-5xl lg:text-7xl leading-tight tracking-tighter text-primary mb-4 sm:mb-6 animate-fade-in-up-delay">
            Know Your Car&apos;s<br />
            <span style={{ color: "var(--color-secondary-container)" }}>Full Story.</span>
          </h1>

          <p className="text-base sm:text-xl text-on-surface-variant font-medium max-w-xl mb-8 sm:mb-10 leading-relaxed animate-fade-in-up-delay-2">
            Decode any VIN to get comprehensive vehicle specs, real photos,
            market values, and ownership history in seconds.
          </p>

          {/* VIN Search */}
          <div className="animate-fade-in-up-delay-3">
            <VinSearchForm size="lg" />
            <VinLocatorHint />
          </div>

          {/* Stats row */}
          <div className="mt-8 sm:mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 animate-fade-in-up-delay-3">
            {stats.map(({ value, label }) => (
              <div key={label} className="text-center lg:text-left">
                <p className="text-xl sm:text-2xl font-headline font-black text-primary leading-none mb-1">{value}</p>
                <p className="text-[10px] sm:text-xs text-on-surface-variant font-medium uppercase tracking-wider">{label}</p>
              </div>
            ))}
          </div>

          {/* Trusted sources — part of hero, no background */}
          <div className="mt-8 pt-6 border-t border-slate-200/60 flex flex-wrap items-center gap-x-5 gap-y-3">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-[0.18em]">Trusted sources:</span>
            {trustedSources.map(({ id, src, alt, h }) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={id} src={src} alt={alt} loading="lazy" decoding="async" className={`${h} w-auto object-contain opacity-50 grayscale`} />
            ))}
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded-full bg-red-700 flex items-center justify-center flex-shrink-0">
                <span className="text-white text-[5px] font-black leading-none">NICB</span>
              </div>
              <span className="text-[10px] font-semibold text-slate-400 tracking-wide">NICB</span>
            </div>
          </div>
        </div>

        {/* ── Right: Car image ── */}
        <div className="lg:col-span-5 relative hidden lg:block animate-fade-in-up-delay-2">
          {/* Rotated bg accent */}
          <div className="absolute inset-0 bg-primary/5 rounded-[40px] rotate-3 -z-10 translate-x-4" />

          {/* Main car image */}
          <div className="relative aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl shadow-primary/15 -rotate-3 hover:rotate-0 transition-transform duration-700">
            <Image
              src="https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=900&q=80"
              alt="Modern luxury SUV — VIN check before you buy"
              fill
              className="object-cover"
              sizes="500px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent" />

            {/* Bottom badges */}
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
              <div className="px-3 py-1.5 bg-white/90 backdrop-blur rounded-xl text-xs font-bold text-on-surface shadow-sm">
                Vehicle Verified ✓
              </div>
              <div className="px-3 py-1.5 rounded-xl text-xs font-bold text-on-secondary-container shadow-sm" style={{ background: "var(--color-secondary-container)" }}>
                40+ Data Points
              </div>
            </div>
          </div>

          {/* VIN badge */}
          <div className="absolute top-6 left-6 px-3 py-2 bg-surface-container-lowest/95 backdrop-blur rounded-xl shadow-lg border border-outline-variant/10">
            <p className="text-[10px] text-outline font-semibold uppercase tracking-wider">VIN Decoded</p>
            <p className="text-xs font-mono font-bold text-primary">17-Char Verified</p>
          </div>
        </div>

      </div>
    </section>
  );
}
