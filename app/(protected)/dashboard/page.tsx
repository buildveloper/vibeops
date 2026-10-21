import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight, ArrowUpRight, Plus } from "lucide-react";
import { desc, eq } from "drizzle-orm";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { automations } from "@/lib/db/schema";
import { PageHeader } from "@/components/page-header";
import { StatStrip } from "@/components/stat-strip";
import { AutomationRow } from "@/components/automation-row";
import { EmptyState } from "@/components/ui/empty-state";
import { Badge } from "@/components/ui/badge";
import { Meter } from "@/components/ui/meter";
import { ButtonLink } from "@/components/ui/button";
import { FIELD_NOTES } from "@/lib/examples";
import { buildCreateHref, firstName, formatDate } from "@/lib/utils";
import { parsePlan, uniqueTools } from "@/lib/plans";

export const metadata: Metadata = {
  title: "Operations desk",
  description: "Your saved automation plans and the work they cover.",
};

export default async function DashboardPage() {
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
  const atLimit = count >= 3;
  const name = firstName(user.name);
  const date = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(new Date());

  return (
    <div>
      <PageHeader
        eyebrow="Operations desk"
        title={name ? `Good to see you, ${name}.` : "Good to see you."}
        description="Here is what is on your desk."
        meta={<span>{date}</span>}
      />

      <div className="mt-8">
        <StatStrip
          items={[
            {
              label: "Saved plans",
              value: `${count}/3`,
              detail: atLimit ? "limit reached" : `${3 - count} open`,
            },
            {
              label: "Steps mapped",
              value: String(stepCount).padStart(2, "0"),
              detail: "across your plans",
            },
            {
              label: "Tools in play",
              value: String(tools.size).padStart(2, "0"),
              detail: "unique tools",
            },
          ]}
        />
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
        <section aria-label="Recent plans">
          {count === 0 ? (
            <EmptyState
              label="Blank sheet"
              title="The board is clear."
              description="Describe a process you run by hand and VibeOps will turn it into a step-by-step automation."
              action={
                <ButtonLink href="/dashboard/create" size="md">
                  Map your first automation
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </ButtonLink>
              }
              secondary={
                <Link
                  href="/dashboard/examples"
                  className="text-[13px] font-medium text-rust-deep underline-offset-4 hover:underline"
                >
                  Start from a field note
                </Link>
              }
            />
          ) : (
            <>
              <div className="flex items-end justify-between gap-4 border-b border-line pb-3">
                <h2
                  id="recent-plans"
                  className="text-[20px] font-semibold tracking-[-0.02em] text-ink"
                >
                  Recent plans
                </h2>
                <Link
                  href="/dashboard/automations"
                  className="group inline-flex items-center gap-1.5 text-[12px] font-medium text-rust-deep transition-colors hover:text-ink"
                >
                  View library
                  <ArrowRight
                    className="hover-arrow h-3.5 w-3.5"
                    aria-hidden="true"
                  />
                </Link>
              </div>

              <div>
                {plans.slice(0, 3).map(({ item, plan }, index) => (
                  <AutomationRow
                    key={item.id}
                    id={item.id}
                    title={plan?.title ?? "Untitled plan"}
                    businessType={item.businessType}
                    goal={item.goal}
                    status={item.status}
                    createdAt={item.createdAt}
                    plan={plan}
                    index={index}
                  />
                ))}
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-muted">
                  {count} of 3 plans saved / Last saved{" "}
                  {formatDate(items[0].createdAt)}
                </p>
                {!atLimit && (
                  <ButtonLink
                    href="/dashboard/create"
                    variant="secondary"
                    size="sm"
                  >
                    <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                    Add another plan
                  </ButtonLink>
                )}
              </div>
            </>
          )}
        </section>

        <aside className="space-y-8">
          <section
            aria-labelledby="plan-limit"
            className="border border-line bg-paper p-4"
          >
            <div className="flex items-center justify-between gap-3">
              <p id="plan-limit" className="label-mono text-muted">
                Plan limit
              </p>
              {atLimit ? (
                <Badge tone="rust">Full</Badge>
              ) : (
                <span className="font-mono text-[10px] text-muted">
                  {count}/3
                </span>
              )}
            </div>
            <Meter
              value={count}
              className="mt-3"
              label={`${count} of 3 plans saved`}
            />
            <p className="mt-3 text-[12px] leading-relaxed text-muted">
              {atLimit
                ? "All three slots are full. Delete a plan to save another."
                : `${3 - count} slot${3 - count === 1 ? "" : "s"} open. Each saved plan holds its brief, steps, and tools.`}
            </p>
            <Link
              href="/dashboard/automations"
              className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-medium text-rust-deep transition-colors hover:text-ink"
            >
              Open library
              <ArrowRight className="h-3 w-3" aria-hidden="true" />
            </Link>
          </section>

          <section aria-labelledby="field-notes">
            <div className="flex items-center justify-between gap-3 border-b border-line pb-3">
              <p id="field-notes" className="label-mono text-muted">
                Field notes
              </p>
              <span className="font-mono text-[10px] text-muted">03</span>
            </div>
            <div className="divide-y divide-line">
              {FIELD_NOTES.slice(0, 3).map((note) => (
                <Link
                  key={`${note.business}-${note.goal}`}
                  href={buildCreateHref(note)}
                  className="group flex items-start justify-between gap-3 py-3"
                >
                  <div className="min-w-0">
                    <p className="text-[12px] font-medium text-ink transition-colors group-hover:text-rust-deep">
                      {note.business}
                    </p>
                    <p className="mt-0.5 text-[11px] text-muted">{note.goal}</p>
                  </div>
                  <ArrowUpRight
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </div>
            <Link
              href="/dashboard/examples"
              className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-medium text-rust-deep transition-colors hover:text-ink"
            >
              Browse all field notes
              <ArrowRight className="h-3 w-3" aria-hidden="true" />
            </Link>
          </section>
        </aside>
      </div>
    </div>
  );
}
