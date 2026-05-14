import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const { user } = (await getSession()) ?? {};
  if (!user) redirect("/signin");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-100">
          Settings
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Manage your account and preferences.
        </p>
      </div>

      <div className="max-w-md space-y-4">
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
            Email
          </p>
          <p className="mt-1 text-sm text-slate-300">
            {user?.email}
          </p>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
            Name
          </p>
          <p className="mt-1 text-sm text-slate-300">
            {user?.name ?? "Not set"}
          </p>
        </div>
      </div>
    </div>
  );
}
