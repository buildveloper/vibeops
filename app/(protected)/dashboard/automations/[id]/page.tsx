import { getSession } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { db } from "@/lib/db";
import { automations } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import Link from "next/link";
import { DeleteButton } from "@/components/delete-button";
import type { GeneratedAutomation } from "@/lib/groq";

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

  let generated: GeneratedAutomation;
  try {
    generated = JSON.parse(item.generatedSteps);
  } catch {
    notFound();
  }

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <Link
          href="/dashboard/automations"
          className="mb-2 inline-block text-xs text-slate-500 hover:text-slate-300"
        >
          ← Back to Automations
        </Link>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-100">
          {generated.title}
        </h1>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-indigo-500/10 px-2.5 py-0.5 text-xs font-medium text-indigo-400">
            {item.goal}
          </span>
          <span className="rounded-full bg-slate-800 px-2.5 py-0.5 text-xs text-slate-400">
            {item.businessType}
          </span>
          <span className="text-xs text-slate-600">
            {generated.estimatedTimeSavings} saved
          </span>
        </div>
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
        <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
          Original Vibe
        </p>
        <p className="mt-2 text-sm leading-relaxed text-slate-300">
          {item.vibe}
        </p>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
          Steps
        </p>
        {generated.steps.map((step) => (
          <div
            key={step.step}
            className="rounded-lg border border-slate-800 bg-slate-900/50 p-4"
          >
            <div className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500/10 text-xs font-medium text-indigo-400">
                {step.step}
              </span>
              <div className="min-w-0 space-y-1">
                <p className="text-sm font-medium text-slate-200">
                  {step.title}
                </p>
                <p className="text-xs leading-relaxed text-slate-500">
                  {step.description}
                </p>
                <div className="flex flex-wrap gap-x-3 gap-y-1 pt-1 text-xs text-slate-600">
                  {step.trigger && <span>🔔 {step.trigger}</span>}
                  {step.action && <span>⚡ {step.action}</span>}
                  {step.tool && <span>🧰 {step.tool}</span>}
                  {step.frequency && <span>🔄 {step.frequency}</span>}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2 border-t border-slate-800 pt-4">
        <Link
          href="/dashboard/create"
          className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 transition-colors hover:border-slate-600 hover:text-slate-100"
        >
          Run Again
        </Link>
        <DeleteButton id={item.id} />
      </div>
    </div>
  );
}
