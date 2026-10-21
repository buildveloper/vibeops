import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { getSession } from "@/lib/auth";
import { AppShell } from "@/components/app-shell";

export default async function ProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { user } = (await getSession()) ?? {};
  if (!user) redirect("/signin");

  return (
    <AppShell
      user={{
        email: user.email,
        name: user.name,
        workflowCount: user.workflowCount,
      }}
    >
      {children}
    </AppShell>
  );
}
