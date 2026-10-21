import type { GeneratedAutomation } from "@/lib/groq";

export function parsePlan(raw: string): GeneratedAutomation | null {
  try {
    return JSON.parse(raw) as GeneratedAutomation;
  } catch {
    return null;
  }
}

export function uniqueTools(plan: GeneratedAutomation | null): string[] {
  if (!plan) return [];

  const tools = [
    ...(Array.isArray(plan.integrations) ? plan.integrations : []),
    ...(Array.isArray(plan.steps) ? plan.steps.map((step) => step.tool) : []),
  ]
    .flatMap((tool) => (typeof tool === "string" ? tool.split("+") : []))
    .map((tool) => tool.trim())
    .filter(Boolean);

  return Array.from(new Set(tools));
}
