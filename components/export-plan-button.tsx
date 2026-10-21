"use client";

import { Download } from "lucide-react";
import type { GeneratedAutomation } from "@/lib/groq";
import { downloadPlanMarkdown } from "@/lib/export-plan";
import { Button } from "@/components/ui/button";

export function ExportPlanButton({
  plan,
  description,
}: {
  plan: GeneratedAutomation;
  description: string;
}) {
  return (
    <Button
      type="button"
      variant="secondary"
      size="md"
      onClick={() => downloadPlanMarkdown(plan, description)}
    >
      <Download className="h-4 w-4" aria-hidden="true" />
      Export
    </Button>
  );
}
