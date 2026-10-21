import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { desc, eq } from "drizzle-orm";
import { ArrowRight, Plus } from "lucide-react";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { automations } from "@/lib/db/schema";
import { PageHeader } from "@/components/page-header";
import {
  AUTOMATION_GRID,
  AutomationRow,
} from "@/components/automation-row";
import { EmptyState } from "@/components/ui/empty-state";
import { Badge } from "@/components/ui/badge";
import { Meter } from "@/components/ui/meter";
import { ButtonLink } from "@/components/ui/button";
import { parsePlan } from "@/lib/plans";

export const metadata: Metadata = {
  title: "Automation library",
  description: "The automation plans saved to your VibeOps account.",
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

  const count = items.length;
  const atLimit = count >= 3;

  return (
    <div>
      <PageHeader
        eyebrow="Workspace"
        title="Automation library"
        description="Plans you have saved. Three is the current limit."
        meta={<span>{count} of 3 saved</span>}
        actions={
          <ButtonLink
            href="/dashboard/create"
            variant={atLimit ? "secondary" : "primary"}
            size="md"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            {atLimit ? "Build a preview" : "New automation"}
          </ButtonLink>
        }
      />

      <div className="mt-6 flex flex-col gap-3 border-y border-line py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <p className="label-mono text-muted">Plan usage</p>
          <Meter
            value={count}
            className="w-32"
            label={`${count} of 3 plans saved`}
          />
          <p className="font-mono text-[10px] text-muted">{count}/3</p>
        </div>

        {atLimit ? (
          <Badge tone="rust">Limit reached / Delete one to save another</Badge>
        ) : (
          <Badge tone="pine">
            {3 - count} slot{3 - count === 1 ? "" : "s"} open
          </Badge>
        )}
      </div>

      {count === 0 ? (
        <div className="mt-8">
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
        </div>
      ) : (
        <div className="mt-8">
          <div
            className={`hidden border-b border-line pb-2 ${AUTOMATION_GRID}`}
          >
            <span />
            <span className="label-mono text-muted">Plan</span>
            <span className="label-mono text-muted">Business</span>
            <span className="label-mono text-muted">Steps</span>
            <span className="label-mono text-muted">Est. time</span>
            <span className="label-mono text-muted">Saved</span>
            <span className="label-mono text-muted">Status</span>
            <span />
          </div>

          <div>
            {items.map((item, index) => {
              const plan = parsePlan(item.generatedSteps);

              return (
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
              );
            })}
          </div>

          <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.1em] text-muted">
            Plans are stored in your account. Export any plan from the builder.
          </p>
        </div>
      )}
    </div>
  );
}
