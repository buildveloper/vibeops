"use server";

import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { automations, users } from "@/lib/db/schema";
import { eq, and, sql, count } from "drizzle-orm";
import { generateId } from "lucia";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { GeneratedAutomation } from "@/lib/groq";
import {
  MAX_AUTOMATIONS,
  MAX_DESCRIPTION_LENGTH,
} from "@/lib/automation-config";

function sanitizeDescription(input: string): string {
  return input.trim().slice(0, MAX_DESCRIPTION_LENGTH);
}

export async function saveAutomation(data: {
  vibe: string;
  businessType: string;
  goal: string;
  generated: GeneratedAutomation;
  replaceId?: string;
}): Promise<{ error?: string; code?: "limit" | "invalid"; id?: string }> {
  const { user } = (await getSession()) ?? {};
  if (!user) redirect("/signin");

  const sanitizedVibe = sanitizeDescription(data.vibe);
  if (sanitizedVibe.length < 10) {
    return {
      error:
        "Your description is too short. Please provide more detail before saving.",
    };
  }

  const [row] = await db
    .select({ total: count() })
    .from(automations)
    .where(eq(automations.userId, user.id))
    .all();
  const total = row?.total ?? 0;

  const id = generateId(15);
  const newRow = {
    id,
    userId: user.id,
    vibe: sanitizedVibe,
    generatedSteps: JSON.stringify(data.generated),
    businessType: data.businessType,
    goal: data.goal,
    status: "saved",
  };

  const replaceId = data.replaceId;

  if (replaceId) {
    const target = await db
      .select({ id: automations.id })
      .from(automations)
      .where(
        and(eq(automations.id, replaceId), eq(automations.userId, user.id)),
      )
      .get();

    if (!target) {
      return {
        error: "That automation no longer exists. Choose another one.",
        code: "invalid",
      };
    }

    await db.transaction(async (tx) => {
      await tx
        .delete(automations)
        .where(
          and(eq(automations.id, replaceId), eq(automations.userId, user.id)),
        );
      await tx.insert(automations).values(newRow);
    });

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/automations");
    return { id };
  }

  if (total >= MAX_AUTOMATIONS) {
    return {
      error: `Your ${MAX_AUTOMATIONS} automation slots are full. Choose one to replace.`,
      code: "limit",
    };
  }

  await db.insert(automations).values(newRow);

  await db
    .update(users)
    .set({ workflowCount: sql`workflow_count + 1` })
    .where(eq(users.id, user.id));

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/automations");
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

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/automations");
  return {};
}
