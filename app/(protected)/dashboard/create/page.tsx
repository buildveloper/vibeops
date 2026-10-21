import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { desc, eq } from "drizzle-orm";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { automations } from "@/lib/db/schema";
import { CreateAutomation } from "@/components/create-automation";
import {
  BUSINESS_TYPES,
  GOALS,
  MAX_DESCRIPTION_LENGTH,
  type SavedAutomationSummary,
} from "@/lib/automation-config";
import { parsePlan } from "@/lib/plans";

export const metadata: Metadata = {
  title: "New automation",
  description:
    "Describe a manual process in plain English and turn it into a structured automation.",
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

  const items = await db
    .select()
    .from(automations)
    .where(eq(automations.userId, user.id))
    .orderBy(desc(automations.createdAt))
    .all();

  const savedAutomations: SavedAutomationSummary[] = items.map((item) => ({
    id: item.id,
    title: parsePlan(item.generatedSteps)?.title ?? "Untitled automation",
    createdAt: item.createdAt.getTime(),
  }));

  const initialVibe =
    typeof params.vibe === "string"
      ? params.vibe.slice(0, MAX_DESCRIPTION_LENGTH)
      : "";
  const initialBusiness =
    typeof params.business === "string" &&
    BUSINESS_TYPES.includes(params.business)
      ? params.business
      : "";
  const initialGoal =
    typeof params.goal === "string" && GOALS.includes(params.goal)
      ? params.goal
      : "";

  return (
    <CreateAutomation
      initialVibe={initialVibe}
      initialBusiness={initialBusiness}
      initialGoal={initialGoal}
      templateLoaded={Boolean(initialVibe.trim())}
      savedAutomations={savedAutomations}
    />
  );
}
