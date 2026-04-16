import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Shield, Zap, Award } from "lucide-react";

const bullets = [
  { icon: Shield, text: "NMVTIS federal data" },
  { icon: Zap, text: "Under 60 seconds" },
  { icon: Award, text: "50,000+ buyers" },
];

export default function CTASection() {
  return (
    <section className="py-20 bg-primary-600 relative overflow-hidden">
      {/* Background car image with overlay */}
      <div className="absolute inset-0 opacity-10">
        <Image
          src="https://api.auto.dev/photos/retail/1C4RJKAG8S8725250-1.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-primary-700/90 to-primary-600/90" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Don&apos;t Buy Blind. Check the VIN First.
        </h2>
        <p className="text-lg text-primary-100 mb-8 max-w-2xl mx-auto">
          Every used car has a story. Make sure you know it before you buy.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-5 mb-10">
          {bullets.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-primary-100">
              <Icon className="w-4 h-4 text-primary-200" />
              <span className="text-sm font-medium">{text}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/#hero"
            className="group flex items-center gap-2 px-8 py-4 bg-white text-primary-700 font-bold rounded-xl hover:bg-primary-50 transition-all text-lg shadow-xl shadow-primary-900/20">
            Check a VIN Now
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/report/3GN7DNRP3TS104891"
            className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all text-lg">
            View Sample Report
          </Link>
        </div>
      </div>
    </section>
  );
}
