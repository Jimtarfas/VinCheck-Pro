import type { Metadata } from "next";
import Link from "@/components/LocaleLink";
import { createClient } from "@/lib/supabase/server";
import ResetPasswordForm from "@/components/ResetPasswordForm";

export const metadata: Metadata = {
  title: "Set a New Password",
  description: "Choose a new password for your CarCheckerVIN account.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/reset-password" },
};

export default async function ResetPasswordPage() {
  // The Supabase recovery link runs through /auth/callback, which exchanges
  // the code for a session before forwarding here. If there's no session the
  // link was invalid or expired — point the user back to request a fresh one.
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 pt-20 pb-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Set a new password</h1>
          <p className="text-slate-700 mt-2">
            Choose a strong password you don&apos;t use elsewhere.
          </p>
        </div>

        {user ? (
          <ResetPasswordForm />
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm text-center">
            <p className="text-sm text-slate-700">
              This password reset link is invalid or has expired.
            </p>
            <Link
              href="/forgot-password"
              className="inline-block mt-4 px-4 py-2.5 bg-primary-600 text-white text-sm font-semibold rounded-xl hover:bg-primary-700 transition-colors"
            >
              Request a new link
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
