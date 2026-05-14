"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { hash, verify } from "argon2";
import { generateId } from "lucia";

export async function signUp(
  prevState: { error?: string },
  formData: FormData,
): Promise<{ error?: string }> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;

  if (!email || !password) {
    return { error: "Email and password are required." };
  }
  if (password.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }

  const normalizedEmail = email.toLowerCase().trim();

  const existing = await db
    .select()
    .from(users)
    .where(eq(users.email, normalizedEmail))
    .get();

  if (existing) {
    return { error: "An account with this email already exists." };
  }

  const userId = generateId(15);
  const passwordHash = await hash(password);

  await db.insert(users).values({
    id: userId,
    email: normalizedEmail,
    name: name?.trim() || null,
    passwordHash,
    workflowCount: 0,
  });

  const session = await auth.createSession(userId, {});
  const sessionCookie = auth.createSessionCookie(session.id);
  (await cookies()).set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  redirect("/dashboard");
}

export async function signIn(
  prevState: { error?: string },
  formData: FormData,
): Promise<{ error?: string }> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  const normalizedEmail = email.toLowerCase().trim();

  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, normalizedEmail))
    .get();

  if (!user) {
    return { error: "Invalid email or password." };
  }

  const valid = await verify(user.passwordHash, password);
  if (!valid) {
    return { error: "Invalid email or password." };
  }

  const session = await auth.createSession(user.id, {});
  const sessionCookie = auth.createSessionCookie(session.id);
  (await cookies()).set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  redirect("/dashboard");
}

export async function signOut() {
  const sessionCookie = auth.createBlankSessionCookie();
  (await cookies()).set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  redirect("/");
}
