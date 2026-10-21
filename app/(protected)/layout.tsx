import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { count, eq } from "drizzle-orm";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { automations } from "@/lib/db/schema";
import { AppShell } from "@/components/app-shell";

export default async function ProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { user } = (await getSession()) ?? {};
  if (!user) redirect("/signin");

  const [row] = await db
    .select({ total: count() })
    .from(automations)
    .where(eq(automations.userId, user.id))
    .all();

  return (
    <AppShell
      user={{ email: user.email, name: user.name }}
      automationCount={row?.total ?? 0}
    >
      {children}
    </AppShell>
  );
}
