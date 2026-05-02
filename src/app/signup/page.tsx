import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AuthForm from "@/components/AuthForm";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create a CarCheckerVIN account to save reports and track vehicle history.",
  alternates: { canonical: "/signup" },
};

export default async function SignupPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    redirect("/");
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 pt-20 pb-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Create Account</h1>
          <p className="text-slate-700 mt-2">Sign up to get started</p>
        </div>
        <AuthForm mode="signup" />
        <p className="text-center text-sm text-slate-700 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-primary-600 font-medium hover:text-primary-700 transition-colors">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
