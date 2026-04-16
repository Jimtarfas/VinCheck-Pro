import { Shield, Clock, Users, Zap } from "lucide-react";
import Image from "next/image";
import VinSearchForm from "./VinSearchForm";

const stats = [
  { icon: Users, label: "Trusted Buyers", value: "50,000+" },
  { icon: Shield, label: "Data Source", value: "NMVTIS" },
  { icon: Clock, label: "Report Speed", value: "<60s" },
  { icon: Zap, label: "Data Points", value: "40+" },
];

const carImages = [
  { src: "https://api.auto.dev/photos/retail/1C4RJKAG1S8728359-1.jpg", alt: "Jeep Grand Cherokee" },
  { src: "https://api.auto.dev/photos/retail/3GN7DNRP3TS104891-1.jpg", alt: "GMC Terrain" },
  { src: "https://api.auto.dev/photos/retail/1C6SRFFT6TN244320-1.jpg", alt: "Ram 1500" },
];

export default function HeroSection() {
  return (
    <section id="hero" className="relative pt-24 pb-16 lg:pt-28 lg:pb-20 overflow-hidden bg-gradient-to-b from-primary-50/60 via-white to-white">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-100/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Content */}
          <div className="text-center lg:text-left">
            <div className="animate-fade-in-up">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 border border-primary-100 text-sm font-medium text-primary-700 mb-6">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Free Vehicle Reports
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.1] tracking-tight text-slate-900 animate-fade-in-up-delay">
              Know Your Car&apos;s
              <span className="text-primary-600"> Full Story</span>
            </h1>

            <p className="mt-5 text-lg text-slate-500 max-w-lg mx-auto lg:mx-0 leading-relaxed animate-fade-in-up-delay-2">
              Decode any VIN to get comprehensive vehicle specs, real photos,
              market values, and ownership history in seconds.
            </p>

            <div className="mt-8 animate-fade-in-up-delay-3">
              <VinSearchForm size="lg" />
            </div>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-4 gap-4 animate-fade-in-up-delay-3">
              {stats.map(({ icon: Icon, label, value }) => (
                <div key={label} className="text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start gap-1.5 mb-1">
                    <Icon className="w-4 h-4 text-primary-500" />
                    <span className="text-lg font-bold text-slate-900">{value}</span>
                  </div>
                  <span className="text-xs text-slate-400">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Car Images Grid */}
          <div className="relative hidden lg:block animate-fade-in-up-delay-2">
            <div className="relative">
              {/* Main large image */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl shadow-slate-900/10 border border-slate-200/60">
                <Image
                  src={carImages[0].src}
                  alt={carImages[0].alt}
                  fill
                  className="object-cover"
                  sizes="600px"
                  priority
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
                  <div className="flex items-center gap-2">
                    <div className="px-2.5 py-1 bg-white/90 backdrop-blur rounded-lg text-xs font-semibold text-slate-800">
                      2025 Jeep Grand Cherokee L
                    </div>
                    <div className="px-2.5 py-1 bg-emerald-500 rounded-lg text-xs font-semibold text-white">
                      50 Photos
                    </div>
                  </div>
                </div>
              </div>

              {/* Two smaller images */}
              <div className="absolute -bottom-6 -left-6 w-36 h-28 rounded-xl overflow-hidden shadow-xl border-4 border-white animate-float">
                <Image
                  src={carImages[1].src}
                  alt={carImages[1].alt}
                  fill
                  className="object-cover"
                  sizes="144px"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-32 h-24 rounded-xl overflow-hidden shadow-xl border-4 border-white animate-float" style={{ animationDelay: "2s" }}>
                <Image
                  src={carImages[2].src}
                  alt={carImages[2].alt}
                  fill
                  className="object-cover"
                  sizes="128px"
                />
              </div>

              {/* VIN badge */}
              <div className="absolute top-4 left-4 px-3 py-2 bg-white/95 backdrop-blur rounded-xl shadow-lg border border-slate-100">
                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">VIN Decoded</p>
                <p className="text-xs font-mono font-bold text-slate-800">1C4RJKAG1S8728359</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
