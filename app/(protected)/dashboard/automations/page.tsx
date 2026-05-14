import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { automations } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import Link from "next/link";
import { AutomationCard } from "@/components/automation-card";

export default async function AutomationsPage() {
  const { user } = (await getSession()) ?? {};
  if (!user) redirect("/signin");

  const items = await db
    .select()
    .from(automations)
    .where(eq(automations.userId, user.id))
    .orderBy(desc(automations.createdAt))
    .all();

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-100">
            My Automations
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            {items.length}/3 automations used
          </p>
          <div className="mt-2 h-1.5 w-48 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-indigo-500 transition-all"
              style={{ width: `${(items.length / 3) * 100}%` }}
            />
          </div>
        </div>
        {items.length < 3 && (
          <Link
            href="/dashboard/create"
            className="inline-flex shrink-0 items-center rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-400"
          >
            + New Automation
          </Link>
        )}
      </div>

      {items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-800 p-12 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-900">
            <svg
              className="h-6 w-6 text-slate-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
              />
            </svg>
          </div>
          <h3 className="text-sm font-medium text-slate-300">
            No automations yet
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Describe your messy workflow and let AI structure it for you — up to
            3 free automations.
          </p>
          <Link
            href="/dashboard/create"
            className="mt-4 inline-flex items-center rounded-lg bg-indigo-500 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-400"
          >
            Create Your First Automation
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {items.map((a) => (
            <AutomationCard
              key={a.id}
              id={a.id}
              vibe={a.vibe}
              businessType={a.businessType}
              goal={a.goal}
              status={a.status}
              createdAt={a.createdAt}
              generatedSteps={a.generatedSteps}
            />
          ))}
        </div>
      )}
    </div>
  );
}
