import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { safeNextPath } from "@/lib/utils";
import { SignInForm } from "@/components/signin-form";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your VibeOps automations.",
};

export default async function SignInPage({
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
        <p className="label-mono text-rust-deep">Sign in</p>
        <h2 className="mt-3 font-display text-[36px] leading-[1.05] tracking-[-0.03em] text-ink">
          Welcome back.
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Sign in to see your automations.
        </p>
      </div>

      <SignInForm next={next ?? undefined} />

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
