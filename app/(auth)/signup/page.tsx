import type { Metadata } from "next";
import Link from "next/link";
import { SignUpForm } from "@/components/signup-form";

export const metadata: Metadata = {
  title: "Create account",
  description:
    "Create a VibeOps account and map your first small business automation.",
};

export default function SignUpPage() {
  return (
    <>
      <div>
        <p className="label-mono text-rust-deep">New account</p>
        <h2 className="mt-3 font-display text-[36px] leading-[1.05] tracking-[-0.03em] text-ink">
          Start with the work.
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Create an account and map your first automation. Three plans
          included.
        </p>
      </div>

      <SignUpForm />

      <p className="text-center text-[13px] text-muted">
        Already have an account?{" "}
        <Link
          href="/signin"
          className="font-medium text-rust-deep underline-offset-4 hover:underline"
        >
          Sign in
        </Link>
      </p>
    </>
  );
}
