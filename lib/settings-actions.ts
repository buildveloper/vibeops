"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";

export async function updateName(
  _prevState: { error?: string; success?: boolean },
  formData: FormData,
): Promise<{ error?: string; success?: boolean }> {
  const { user } = (await getSession()) ?? {};
  if (!user) redirect("/signin");

  const name = ((formData.get("name") as string | null) ?? "").trim();

  if (name.length > 80) {
    return { error: "Keep your name under 80 characters." };
  }

  await db
    .update(users)
    .set({ name: name || null })
    .where(eq(users.id, user.id));

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/settings");

  return { success: true };
}
