import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { generateAutomation } from "@/lib/groq";
import { checkRateLimit } from "@/lib/rate-limit";
import { MAX_DESCRIPTION_LENGTH } from "@/lib/automation-config";

export async function POST(req: NextRequest) {
  const { user } = (await getSession()) ?? {};
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: { vibe?: string; businessType?: string; goal?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { vibe, businessType, goal } = body;

  if (!vibe || !businessType || !goal) {
    return NextResponse.json(
      { error: "Missing required fields: vibe, businessType, goal" },
      { status: 400 },
    );
  }

  if (typeof vibe !== "string" || typeof businessType !== "string" || typeof goal !== "string") {
    return NextResponse.json({ error: "Invalid field types" }, { status: 400 });
  }

  const sanitizedVibe = vibe.trim().slice(0, MAX_DESCRIPTION_LENGTH);
  if (sanitizedVibe.length < 10) {
    return NextResponse.json(
      { error: "Describe the task in at least 10 characters." },
      { status: 400 },
    );
  }

  const { allowed, retryAfter } = checkRateLimit(user.id);
  if (!allowed) {
    return NextResponse.json(
      {
        error: `You're going a little fast. Try again in ${retryAfter} seconds.`,
        retryAfter,
      },
      {
        status: 429,
        headers: { "Retry-After": String(retryAfter) },
      },
    );
  }

  if (!process.env.GROQ_API_KEY) {
    return NextResponse.json(
      { error: "Groq API key not configured." },
      { status: 500 },
    );
  }

  try {
    const result = await generateAutomation(sanitizedVibe, businessType, goal);
    return NextResponse.json(result);
  } catch (err) {
    console.error("Groq generation error:", err instanceof Error ? err.message : "Unknown error");
    return NextResponse.json(
      { error: "Automation generation failed. Please try again." },
      { status: 500 },
    );
  }
}
