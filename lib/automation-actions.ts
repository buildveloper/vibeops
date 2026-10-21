"use server";

import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { automations, users } from "@/lib/db/schema";
import { eq, and, sql, count } from "drizzle-orm";
import { generateId } from "lucia";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { GeneratedAutomation } from "@/lib/groq";

const MAX_AUTOMATIONS = 3;
const MAX_VIBE_LENGTH = 2000;

function sanitizeVibe(input: string): string {
  return input.trim().slice(0, MAX_VIBE_LENGTH);
}

export async function saveAutomation(data: {
  vibe: string;
  businessType: string;
  goal: string;
  generated: GeneratedAutomation;
}): Promise<{ error?: string; id?: string }> {
  const { user } = (await getSession()) ?? {};
  if (!user) redirect("/signin");

  const sanitizedVibe = sanitizeVibe(data.vibe);
  if (sanitizedVibe.length < 10) {
    return { error: "Your workflow description is too short. Please provide more detail." };
  }

  const [row] = await db
    .select({ total: count() })
    .from(automations)
    .where(eq(automations.userId, user.id))
    .all();
  const total = row?.total ?? 0;

  if (total >= MAX_AUTOMATIONS) {
    return { error: "You've reached the 3 automation limit. Delete an existing one to create more." };
  }

  const id = generateId(15);

  await db.insert(automations).values({
    id,
    userId: user.id,
    vibe: sanitizedVibe,
    generatedSteps: JSON.stringify(data.generated),
    businessType: data.businessType,
    goal: data.goal,
    status: "saved",
  });

  await db
    .update(users)
    .set({ workflowCount: sql`workflow_count + 1` })
    .where(eq(users.id, user.id));

  revalidatePath("/dashboard/automations");
  revalidatePath("/dashboard");
  return { id };
}

export async function deleteAutomation(id: string): Promise<{ error?: string }> {
  const { user } = (await getSession()) ?? {};
  if (!user) redirect("/signin");

  const item = await db
    .select({ id: automations.id })
    .from(automations)
    .where(and(eq(automations.id, id), eq(automations.userId, user.id)))
    .get();

  if (!item) {
    return { error: "Automation not found." };
  }

  await db.delete(automations).where(eq(automations.id, id));

  await db
    .update(users)
    .set({ workflowCount: sql`MAX(workflow_count - 1, 0)` })
    .where(eq(users.id, user.id));

  revalidatePath("/dashboard/automations");
  revalidatePath("/dashboard");
  return {};
}
