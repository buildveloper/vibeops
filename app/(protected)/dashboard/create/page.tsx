import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { count, eq } from "drizzle-orm";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { automations } from "@/lib/db/schema";
import { CreateAutomation } from "@/components/create-automation";

export const metadata: Metadata = {
  title: "New automation",
  description:
    "Describe a manual process in plain English and turn it into a structured automation plan.",
};

export default async function CreatePage({
  searchParams,
}: {
  searchParams: Promise<{
    vibe?: string;
    business?: string;
    goal?: string;
  }>;
}) {
  const { user } = (await getSession()) ?? {};
  if (!user) redirect("/signin");

  const params = await searchParams;
  const [row] = await db
    .select({ total: count() })
    .from(automations)
    .where(eq(automations.userId, user.id))
    .all();

  const initialVibe =
    typeof params.vibe === "string" ? params.vibe.slice(0, 2000) : "";
  const initialBusiness =
    typeof params.business === "string" ? params.business : "";
  const initialGoal = typeof params.goal === "string" ? params.goal : "";

  return (
    <CreateAutomation
      initialVibe={initialVibe}
      initialBusiness={initialBusiness}
      initialGoal={initialGoal}
      savedCount={row?.total ?? 0}
    />
  );
}
