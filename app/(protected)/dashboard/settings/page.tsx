import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { count, eq } from "drizzle-orm";
import { ArrowRight, Lock, LogOut } from "lucide-react";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { automations } from "@/lib/db/schema";
import { signOut } from "@/lib/auth-actions";
import { PageHeader } from "@/components/page-header";
import { SettingsForm } from "@/components/settings-form";
import { Button } from "@/components/ui/button";
import { Meter } from "@/components/ui/meter";
import { MAX_AUTOMATIONS } from "@/lib/automation-config";

export const metadata: Metadata = {
  title: "Settings",
  description: "Your VibeOps account and usage.",
};

export default async function SettingsPage() {
  const { user } = (await getSession()) ?? {};
  if (!user) redirect("/signin");

  const [row] = await db
    .select({ total: count() })
    .from(automations)
    .where(eq(automations.userId, user.id))
    .all();
  const savedCount = row?.total ?? 0;

  return (
    <div>
      <PageHeader
        eyebrow="Account"
        title="Settings"
        description="Your account and usage."
      />

      <div className="mt-2 max-w-2xl">
        <section className="border-b border-line py-7">
          <h2 className="text-[18px] font-semibold tracking-[-0.02em] text-ink">
            Profile
          </h2>
          <p className="mt-1 text-[13px] leading-relaxed text-muted">
            The name shown in your account.
          </p>

          <SettingsForm initialName={user.name ?? ""} />

          <div className="mt-6 max-w-md">
            <p className="label-mono text-muted">Email</p>
            <div className="mt-2 flex h-12 items-center justify-between gap-3 border border-line bg-paper-2 px-3.5">
              <span className="truncate text-[14px] text-ink-2">
                {user.email}
              </span>
              <Lock
                className="h-4 w-4 shrink-0 text-muted"
                aria-hidden="true"
              />
            </div>
            <p className="mt-1.5 text-[12px] leading-relaxed text-muted">
              Email changes are not supported yet.
            </p>
          </div>
        </section>

        <section className="border-b border-line py-7">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-[18px] font-semibold tracking-[-0.02em] text-ink">
                Usage
              </h2>
              <p className="mt-1 text-[13px] leading-relaxed text-muted">
                Every account includes {MAX_AUTOMATIONS} saved automations.
              </p>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
              {savedCount} of {MAX_AUTOMATIONS} used
            </span>
          </div>

          <Meter
            value={savedCount}
            max={MAX_AUTOMATIONS}
            className="mt-5 max-w-md"
            label={`${savedCount} of ${MAX_AUTOMATIONS} automations saved`}
          />

          <div className="mt-4 flex flex-wrap items-center gap-4">
            <p className="text-[13px] text-ink-2">
              {savedCount >= MAX_AUTOMATIONS
                ? "All automations are in use. Saving a new one will ask you to replace an existing one."
                : `${MAX_AUTOMATIONS - savedCount} automation${
                    MAX_AUTOMATIONS - savedCount === 1 ? "" : "s"
                  } available.`}
            </p>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 text-[12px] font-medium text-rust-deep transition-colors hover:text-ink"
            >
              View automations
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </section>

        <section className="border-b border-line py-7">
          <h2 className="text-[18px] font-semibold tracking-[-0.02em] text-ink">
            Session
          </h2>
          <p className="mt-1 text-[13px] leading-relaxed text-muted">
            Signed in as <span className="text-ink-2">{user.email}</span>.
            Sessions are cookie-based and expire automatically.
          </p>

          <form action={signOut} className="mt-4">
            <Button type="submit" variant="secondary" size="md">
              <LogOut className="h-4 w-4" aria-hidden="true" />
              Sign out
            </Button>
          </form>
        </section>

        <section className="py-7">
          <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted">
            VibeOps v1.0 / Early access
          </p>
        </section>
      </div>
    </div>
  );
}
