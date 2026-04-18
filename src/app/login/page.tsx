import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AuthForm from "@/components/AuthForm";

export const metadata: Metadata = {
  title: "Log In",
  description: "Log in to your CarCheckerVIN account to access saved reports and history.",
  robots: { index: false, follow: false },
};

export default async function LoginPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    redirect("/");
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 pt-20 pb-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Welcome Back</h1>
          <p className="text-slate-500 mt-2">Log in to your account</p>
        </div>
        <AuthForm mode="login" />
        <p className="text-center text-sm text-slate-500 mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-primary-600 font-medium hover:text-primary-700 transition-colors">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
