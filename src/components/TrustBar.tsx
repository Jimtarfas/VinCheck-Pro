const stats = [
  { value: "50K+",   label: "Happy Customers" },
  { value: "4.9",    label: "Average Rating" },
  { value: "<60s",   label: "Avg. Delivery Time" },
  { value: "24/7",   label: "Data Available" },
];

export default function TrustBar() {
  return (
    <section className="bg-primary-container py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map(({ value, label }, i) => (
          <div key={label} className={`text-center text-white ${i > 0 ? "border-l border-white/10" : ""}`}>
            <p className="text-4xl font-headline font-black mb-1">{value}</p>
            <p className="text-sm opacity-75 uppercase tracking-widest font-semibold">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
