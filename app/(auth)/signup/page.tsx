import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { safeNextPath } from "@/lib/utils";
import { SignUpForm } from "@/components/signup-form";

export const metadata: Metadata = {
  title: "Create account",
  description:
    "Create a VibeOps account and build your first small business automation.",
};

export default async function SignUpPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const next = safeNextPath((await searchParams).next);
  const { user } = (await getSession()) ?? {};
  if (user) redirect(next ?? "/dashboard");

  return (
    <>
      <div>
        <p className="label-mono text-rust-deep">Create account</p>
        <h2 className="mt-3 font-display text-[36px] leading-[1.05] tracking-[-0.03em] text-ink">
          Create your account.
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Free to start. Three automations included. No card.
        </p>
      </div>

      <SignUpForm next={next ?? undefined} />

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
