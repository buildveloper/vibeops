import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { automations } from "@/lib/db/schema";
import { eq, count } from "drizzle-orm";
import Link from "next/link";

export default async function DashboardPage() {
  const { user } = (await getSession()) ?? {};
  if (!user) redirect("/signin");

  const [row] = await db
    .select({ total: count() })
    .from(automations)
    .where(eq(automations.userId, user.id))
    .all();
  const total = row?.total ?? 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-100">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Welcome back{user?.name ? `, ${user.name}` : ""}. Here&apos;s what&apos;s
          happening with your automations.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { label: "Automations Used", value: `${total}/3` },
          { label: "Status", value: total > 0 ? "Active" : "Idle" },
          { label: "Time Saved (est.)", value: `${total * 5}h/wk` },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-slate-800 bg-slate-900/50 p-5"
          >
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
              {stat.label}
            </p>
            <p className="mt-1 text-3xl font-semibold text-slate-100">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
            Automation Limit
          </p>
          <p className="text-xs text-slate-600">{total}/3 used</p>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full rounded-full bg-indigo-500 transition-all duration-500"
            style={{ width: `${(total / 3) * 100}%` }}
          />
        </div>
      </div>

      {total === 0 ? (
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
            Ready to automate your operations?
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Describe your workflow in plain English and let AI build the
            automation — up to 3 free automations.
          </p>
          <Link
            href="/dashboard/create"
            className="mt-4 inline-flex items-center rounded-lg bg-indigo-500 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-400"
          >
            Create Your First Automation
          </Link>
        </div>
      ) : (
        <Link
          href="/dashboard/automations"
          className="inline-flex items-center rounded-lg border border-slate-800 px-5 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:border-slate-700 hover:text-slate-100"
        >
          View all automations →
        </Link>
      )}
    </div>
  );
}
