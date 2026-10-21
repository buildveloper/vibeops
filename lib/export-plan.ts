import type { GeneratedAutomation } from "@/lib/groq";
import { slugify } from "@/lib/utils";

export function buildPlanMarkdown(
  plan: GeneratedAutomation,
  description: string,
): string {
  const lines = [
    `# ${plan.title}`,
    "",
    plan.summary,
    "",
    `**Estimated time returned:** ${plan.estimatedTimeSavings}`,
    "",
    "## Description",
    "",
    `> ${description}`,
    "",
    "## Steps",
    "",
    ...plan.steps.flatMap((step) => [
      `### ${step.step}. ${step.title}`,
      "",
      step.description,
      "",
      `- Trigger: ${step.trigger}`,
      `- Action: ${step.action}`,
      `- Tool: ${step.tool}`,
      `- Frequency: ${step.frequency}`,
      "",
    ]),
    "## Tools",
    "",
    plan.integrations.join(", "),
    "",
  ];

  return lines.join("\n");
}

export function downloadPlanMarkdown(
  plan: GeneratedAutomation,
  description: string,
): void {
  const blob = new Blob([buildPlanMarkdown(plan, description)], {
    type: "text/markdown;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `${slugify(plan.title)}.md`;
  anchor.click();
  URL.revokeObjectURL(url);
}
