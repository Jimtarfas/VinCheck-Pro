const stats = [
  { value: "50K+",   label: "Happy Customers" },
  { value: "4.9",    label: "Average Rating" },
  { value: "<60s",   label: "Avg. Delivery Time" },
  { value: "24/7",   label: "Data Available" },
];

export default function TrustBar() {
  return (
    <section className="bg-primary-container py-10 sm:py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
        {stats.map(({ value, label }, i) => (
          <div
            key={label}
            className={`text-center text-white ${i > 0 ? "md:border-l md:border-white/10" : ""} ${i === 2 ? "md:border-l" : ""} ${i % 2 === 1 ? "border-l border-white/10 md:border-l" : ""}`}
          >
            <p className="text-3xl sm:text-4xl font-headline font-black mb-1">{value}</p>
            <p className="text-[11px] sm:text-sm opacity-75 uppercase tracking-widest font-semibold">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
