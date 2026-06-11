export default function Loading() {
  const Block = ({ className = "" }: { className?: string }) => (
    <div className={`animate-pulse rounded-2xl bg-surface-container ${className}`} />
  );
  return (
    <div className="bg-surface min-h-screen">
      <div className="mx-auto max-w-5xl space-y-5 px-4 py-6 sm:px-6">
        {/* header */}
        <div className="animate-pulse rounded-2xl bg-primary/90 p-6">
          <div className="grid gap-4 sm:grid-cols-[260px_1fr]">
            <div className="h-44 rounded-xl bg-white/10" />
            <div className="space-y-3">
              <div className="h-7 w-2/3 rounded-lg bg-white/15" />
              <div className="h-4 w-1/3 rounded bg-white/10" />
              <div className="grid grid-cols-3 gap-3 pt-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-8 rounded bg-white/10" />
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* sections */}
        <Block className="h-44" />
        <Block className="h-72" />
        <Block className="h-56" />
        <Block className="h-64" />
        <span className="sr-only">Loading vehicle history report…</span>
      </div>
    </div>
  );
}
