import { Lucia } from "lucia";
import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";
import { db } from "@/lib/db";
import { users, sessions } from "@/lib/db/schema";
import { cookies } from "next/headers";
import { cache } from "react";

const adapter = new DrizzleSQLiteAdapter(db, sessions, users);

export const auth = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax" as const,
    },
  },
  getUserAttributes: (data) => ({
    email: data.email,
    name: data.name,
    workflowCount: data.workflowCount,
  }),
});

declare module "lucia" {
  interface Register {
    Lucia: typeof auth;
    DatabaseUserAttributes: {
      email: string;
      name: string | null;
      workflowCount: number;
    };
  }
}

export const getSession = cache(async () => {
  const sessionId = (await cookies()).get(auth.sessionCookieName)?.value ?? null;
  if (!sessionId) return null;
  const { session, user } = await auth.validateSession(sessionId);
  try {
    if (session?.fresh) {
      const sessionCookie = auth.createSessionCookie(session.id);
      (await cookies()).set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
    }
    if (!session) {
      const sessionCookie = auth.createBlankSessionCookie();
      (await cookies()).set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
    }
  } catch {}
  return { session, user };
});
