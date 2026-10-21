import type { Metadata } from "next";
import Link from "next/link";
import { SignInForm } from "@/components/signin-form";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your VibeOps operations desk.",
};

export default function SignInPage() {
  return (
    <>
      <div>
        <p className="label-mono text-rust-deep">Operations desk</p>
        <h2 className="mt-3 font-display text-[36px] leading-[1.05] tracking-[-0.03em] text-ink">
          Welcome back.
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Sign in to your operations desk.
        </p>
      </div>

      <SignInForm />

      <p className="text-center text-[13px] text-muted">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="font-medium text-rust-deep underline-offset-4 hover:underline"
        >
          Create one
        </Link>
      </p>
    </>
  );
}
