import Link from "next/link";
import VinSearchForm from "./VinSearchForm";

export default function CTASection() {
  return (
    <section className="py-24 px-6 bg-surface">
      <div className="max-w-7xl mx-auto bg-primary-container rounded-[3rem] p-12 lg:p-20 relative overflow-hidden shadow-2xl shadow-primary/20">

        {/* Background blobs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-40 pointer-events-none"
          style={{ background: "radial-gradient(circle, #0d47a1 0%, transparent 70%)", filter: "blur(60px)" }} />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full opacity-20 pointer-events-none"
          style={{ background: "radial-gradient(circle, #ff9800 0%, transparent 70%)", filter: "blur(60px)" }} />

        <div className="relative z-10 text-center">
          <h2 className="text-4xl lg:text-6xl font-headline font-extrabold text-white mb-6 leading-tight tracking-tighter">
            Ready to discover<br />the truth?
          </h2>
          <p className="text-primary-fixed/80 text-xl max-w-2xl mx-auto mb-12">
            Don&apos;t leave your investment to chance. Join 50,000+ buyers who made smarter decisions with VINCheck Pro.
          </p>

          <div className="flex flex-col items-center gap-5">
            <div className="w-full max-w-2xl">
              <VinSearchForm size="lg" />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-semibold text-primary-fixed/60 uppercase tracking-widest mt-4">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                NMVTIS Federal Data
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed-dim" />
                Under 60 Seconds
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-fixed-dim" />
                50,000+ Buyers Trust Us
              </span>
            </div>

            <Link
              href="/report/3GN7DNRP3TS104891"
              className="text-sm text-primary-fixed/50 hover:text-primary-fixed transition-colors underline underline-offset-2"
            >
              View sample report →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
