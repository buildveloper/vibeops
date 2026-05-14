import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import Link from "next/link";
import { signOut } from "@/lib/auth-actions";
import { Footer } from "@/components/footer";
import type { ReactNode } from "react";

export default async function ProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { user } = (await getSession()) ?? {};
  if (!user) redirect("/signin");

  return (
    <div className="flex min-h-full flex-col">
      <div className="flex flex-1">
        <aside className="fixed inset-y-0 left-0 z-30 flex w-60 flex-col border-r border-slate-800 bg-slate-950">
          <div className="flex h-14 items-center border-b border-slate-800 px-5">
            <Link
              href="/dashboard"
              className="text-base font-semibold tracking-tight text-slate-100"
            >
              VibeOps
            </Link>
          </div>

          <nav className="flex-1 space-y-1 px-3 py-4">
            <SidebarLink href="/dashboard" label="Dashboard" />
            <SidebarLink href="/dashboard/create" label="Create Automation" />
            <SidebarLink
              href="/dashboard/automations"
              label="My Automations"
            />
            <SidebarLink href="/dashboard/examples" label="Examples" />
            <SidebarLink href="/dashboard/settings" label="Settings" />
          </nav>

          <div className="border-t border-slate-800 px-3 py-4">
            <div className="mb-3 rounded-lg bg-slate-900 px-3 py-2">
              <p className="text-xs text-slate-500">Signed in as</p>
              <p className="truncate text-sm font-medium text-slate-300">
                {user.email}
              </p>
              <p className="text-xs text-slate-600">
                {user.workflowCount}/3 automations
              </p>
            </div>
            <form action={signOut}>
              <button className="w-full rounded-lg px-3 py-2 text-left text-sm text-slate-500 transition-colors hover:bg-slate-900 hover:text-slate-300">
                Sign out
              </button>
            </form>
          </div>
        </aside>

        <main className="ml-60 flex flex-1 flex-col px-8 py-8">
          <div className="flex-1">{children}</div>
          <div className="mt-12">
            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
}

function SidebarLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="block rounded-lg px-3 py-2 text-sm text-slate-400 transition-colors hover:bg-slate-900 hover:text-slate-200"
    >
      {label}
    </Link>
  );
}
