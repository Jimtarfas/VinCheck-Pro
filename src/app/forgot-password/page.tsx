import type { Metadata } from "next";
import Link from "next/link";
import ForgotPasswordForm from "@/components/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Reset Password",
  description:
    "Reset the password for your CarCheckerVIN account. We'll email you a secure link to set a new password.",
  alternates: { canonical: "/forgot-password" },
};

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 pt-20 pb-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Reset your password</h1>
          <p className="text-slate-700 mt-2">
            Enter your email and we&apos;ll send you a link to set a new password.
          </p>
        </div>
        <ForgotPasswordForm />
        <p className="text-center text-sm text-slate-700 mt-6">
          Remembered it?{" "}
          <Link
            href="/login"
            className="text-primary-600 font-medium hover:text-primary-700 transition-colors"
          >
            Back to log in
          </Link>
        </p>
      </div>
    </div>
  );
}
