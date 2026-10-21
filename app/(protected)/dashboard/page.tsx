import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { desc, eq } from "drizzle-orm";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { automations } from "@/lib/db/schema";
import { PageHeader } from "@/components/page-header";
import { AUTOMATION_GRID, AutomationRow } from "@/components/automation-row";
import { TemplateShortcuts } from "@/components/template-shortcuts";
import { EmptyState } from "@/components/ui/empty-state";
import { ButtonLink } from "@/components/ui/button";
import { MAX_AUTOMATIONS } from "@/lib/automation-config";
import { firstName, formatDate } from "@/lib/utils";
import { parsePlan, uniqueTools } from "@/lib/plans";

export const metadata: Metadata = {
  title: "Your automations",
  description: "Every automation saved to your VibeOps account.",
};

export default async function AutomationsPage() {
  const { user } = (await getSession()) ?? {};
  if (!user) redirect("/signin");

  const items = await db
    .select()
    .from(automations)
    .where(eq(automations.userId, user.id))
    .orderBy(desc(automations.createdAt))
    .all();

  const plans = items.map((item) => ({
    item,
    plan: parsePlan(item.generatedSteps),
  }));

  const stepCount = plans.reduce(
    (total, entry) => total + (entry.plan?.steps.length ?? 0),
    0,
  );
  const tools = new Set(plans.flatMap((entry) => uniqueTools(entry.plan)));
  const count = items.length;
  const atLimit = count >= MAX_AUTOMATIONS;
  const name = firstName(user.name);

  return (
    <div>
      <PageHeader
        eyebrow={count === 0 ? "Get started" : "Workspace"}
        title="Your automations"
        description={
          name
            ? `Welcome back, ${name}. Everything you've saved lives here.`
            : "Everything you've saved lives here."
        }
        meta={
          <span>
            {count} of {MAX_AUTOMATIONS} used
            {count > 0 ? ` · ${stepCount} steps · ${tools.size} tools` : ""}
          </span>
        }
      />

      {count === 0 ? (
        <div className="mt-8">
          <EmptyState
            label="Start here"
            title="Create your first automation."
            description="Describe something you do by hand — a reminder, a follow-up, an invoice. We'll turn it into clear steps you can review before saving."
            action={
              <ButtonLink href="/dashboard/create" size="md">
                Create automation
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </ButtonLink>
            }
            secondary={
              <Link
                href="/dashboard/examples"
                className="text-[13px] font-medium text-rust-deep underline-offset-4 hover:underline"
              >
                Browse templates
              </Link>
            }
          />
        </div>
      ) : (
        <section className="mt-8" aria-labelledby="saved-automations">
          <div className="flex items-end justify-between gap-4 border-b border-line pb-3">
            <h2
              id="saved-automations"
              className="text-[20px] font-semibold tracking-[-0.02em] text-ink"
            >
              Saved automations
            </h2>
          </div>

          <div className={AUTOMATION_GRID}>
            <span aria-hidden="true" />
            <span className="label-mono hidden text-muted lg:block">
              Automation
            </span>
            <span className="label-mono hidden text-muted lg:block">
              Business
            </span>
            <span className="label-mono hidden text-muted lg:block">Steps</span>
            <span className="label-mono hidden text-muted lg:block">
              Est. time
            </span>
            <span className="label-mono hidden text-muted lg:block">Saved</span>
            <span aria-hidden="true" />
          </div>

          <div>
            {plans.map(({ item, plan }, index) => (
              <AutomationRow
                key={item.id}
                id={item.id}
                title={plan?.title ?? "Untitled automation"}
                businessType={item.businessType}
                goal={item.goal}
                createdAt={item.createdAt}
                plan={plan}
                index={index}
              />
            ))}
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-muted">
              {count} of {MAX_AUTOMATIONS} used / Last saved{" "}
              {formatDate(items[0].createdAt)}
            </p>
            {atLimit && (
              <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-brass">
                Saving a new automation will ask you to replace one
              </p>
            )}
          </div>
        </section>
      )}

      <section className="mt-10" aria-labelledby="template-start">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-3">
          <div>
            <p className="label-mono text-muted">Starting points</p>
            <h2
              id="template-start"
              className="mt-1 text-[20px] font-semibold tracking-[-0.02em] text-ink"
            >
              {count === 0
                ? "Or start from a template"
                : "Start from a template"}
            </h2>
          </div>
          <Link
            href="/dashboard/examples"
            className="group inline-flex items-center gap-1.5 text-[12px] font-medium text-rust-deep transition-colors hover:text-ink"
          >
            Browse all templates
            <ArrowRight
              className="hover-arrow h-3.5 w-3.5"
              aria-hidden="true"
            />
          </Link>
        </div>
        <TemplateShortcuts />
      </section>

      <p className="mt-6 font-mono text-[9px] uppercase tracking-[0.1em] text-muted">
        Export any automation from its detail page.
      </p>
    </div>
  );
}
