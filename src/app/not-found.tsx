import Link from "next/link";
import VinSearchForm from "@/components/VinSearchForm";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 pt-16">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-primary-600 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Page Not Found</h2>
        <p className="text-slate-500 mb-8">The page you&apos;re looking for doesn&apos;t exist. Try searching for a VIN instead.</p>
        <VinSearchForm size="sm" />
        <Link href="/" className="inline-block mt-6 text-primary-600 hover:text-primary-700 font-medium transition-colors">Go back home</Link>
      </div>
    </div>
  );
}
