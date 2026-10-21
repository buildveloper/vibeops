import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { and, eq } from "drizzle-orm";
import { ArrowLeft, ArrowRight, CircleAlert } from "lucide-react";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { automations } from "@/lib/db/schema";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { StepTimeline } from "@/components/step-timeline";
import { DeletePlanButton } from "@/components/confirm-dialog";
import { parsePlan, uniqueTools } from "@/lib/plans";
import { buildCreateHref, formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Plan details",
};

export default async function AutomationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { user } = (await getSession()) ?? {};
  if (!user) redirect("/signin");

  const { id } = await params;

  const item = await db
    .select()
    .from(automations)
    .where(and(eq(automations.id, id), eq(automations.userId, user.id)))
    .get();

  if (!item) notFound();

  const plan = parsePlan(item.generatedSteps);
  if (!plan) notFound();

  const tools = uniqueTools(plan);
  const statusLabel =
    item.status === "saved"
      ? "Saved"
      : item.status === "draft"
        ? "Draft"
        : item.status;

  return (
    <div>
      <Link
        href="/dashboard/automations"
        className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.1em] text-muted transition-colors hover:text-ink"
      >
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
        Automation library
      </Link>

      <header className="mt-5 border-b border-line pb-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone={item.status === "saved" ? "pine" : "neutral"}>
                {statusLabel}
              </Badge>
              <Badge tone="neutral" dot={false}>
                {item.businessType}
              </Badge>
              <Badge tone="neutral" dot={false}>
                {item.goal}
              </Badge>
            </div>

            <h1 className="mt-4 font-display text-[34px] leading-[1.02] tracking-[-0.035em] text-ink sm:text-[44px]">
              {plan.title}
            </h1>
            <p className="mt-2 max-w-[62ch] text-sm leading-relaxed text-muted">
              {plan.summary}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <ButtonLink
              href={buildCreateHref({
                vibe: item.vibe,
                business: item.businessType,
                goal: item.goal,
              })}
              variant="secondary"
              size="md"
            >
              Use as brief
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
            <DeletePlanButton
              id={item.id}
              title={plan.title}
              redirectTo="/dashboard/automations"
            />
          </div>
        </div>
      </header>

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div>
          <section aria-labelledby="the-brief">
            <div className="flex items-center justify-between gap-4">
              <p id="the-brief" className="label-mono text-muted">
                The brief
              </p>
              <p className="font-mono text-[10px] text-muted">
                {formatDate(item.createdAt)}
              </p>
            </div>
            <blockquote className="mt-3 border-l-2 border-rust bg-paper-2 px-5 py-4 text-[14px] leading-relaxed text-ink-2">
              &ldquo;{item.vibe}&rdquo;
            </blockquote>
          </section>

          <section aria-labelledby="the-plan" className="mt-10">
            <div className="flex items-center justify-between gap-4 border-b border-line pb-3">
              <p id="the-plan" className="label-mono text-muted">
                The plan
              </p>
              <p className="font-mono text-[10px] text-muted">
                {String(plan.steps.length).padStart(2, "0")} steps
              </p>
            </div>
            <div className="mt-5">
              <StepTimeline steps={plan.steps} />
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <section
            aria-labelledby="plan-details"
            className="border border-line bg-paper p-5 lg:sticky lg:top-20"
          >
            <div className="flex items-center justify-between gap-3">
              <p id="plan-details" className="label-mono text-muted">
                Plan details
              </p>
              <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-muted">
                {item.id.slice(0, 6)}
              </span>
            </div>

            <dl className="mt-3">
              {[
                ["Business", item.businessType],
                ["Goal", item.goal],
                ["Steps", String(plan.steps.length)],
                ["Est. time", plan.estimatedTimeSavings],
                ["Saved", formatDate(item.createdAt)],
                ["Status", statusLabel],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-start justify-between gap-4 border-b border-line py-2.5 last:border-b-0"
                >
                  <dt className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted">
                    {label}
                  </dt>
                  <dd className="text-right text-[12px] font-medium leading-snug text-ink">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-5 border-t border-line pt-4">
              <p className="label-mono text-muted">Tools</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {tools.length > 0 ? (
                  tools.map((tool) => (
                    <span
                      key={tool}
                      className="rounded-xs border border-line bg-paper-2 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.08em] text-ink-2"
                    >
                      {tool}
                    </span>
                  ))
                ) : (
                  <span className="text-[12px] text-muted">
                    No tools listed.
                  </span>
                )}
              </div>
            </div>

            <div className="mt-5 border-t border-line pt-4">
              <div className="flex gap-2">
                <CircleAlert
                  className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted"
                  aria-hidden="true"
                />
                <p className="text-[11px] leading-relaxed text-muted">
                  This is a plan, not a live integration. Connect the listed
                  tools in your automation platform.
                </p>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
