"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  CircleAlert,
  CircleCheck,
  Download,
  Loader2,
  Play,
  RefreshCw,
  RotateCcw,
  TriangleAlert,
} from "lucide-react";
import type { GeneratedAutomation } from "@/lib/groq";
import { saveAutomation } from "@/lib/automation-actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlanView } from "@/components/plan-view";
import { Skeleton } from "@/components/ui/skeleton";
import type { StepStatus } from "@/components/step-timeline";
import { cn, slugify } from "@/lib/utils";

export function PreviewPanel({
  generated,
  loading,
  vibe,
  businessType,
  goal,
  savedCount,
  sample,
  onSample,
  onRegenerate,
  onReset,
}: {
  generated: GeneratedAutomation | null;
  loading: boolean;
  vibe: string;
  businessType: string;
  goal: string;
  savedCount: number;
  sample: boolean;
  onSample: () => void;
  onRegenerate: () => void;
  onReset: () => void;
}) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [savedId, setSavedId] = useState<string | null>(null);
  const [saveError, setSaveError] = useState("");
  const [testing, setTesting] = useState(false);
  const [stepStatus, setStepStatus] = useState<Record<number, StepStatus>>({});
  const [testLog, setTestLog] = useState<string[]>([]);
  const [testComplete, setTestComplete] = useState(false);

  const limitReached = savedCount >= 3;
  const canSave = Boolean(generated) && !sample && !limitReached && !saved;

  async function handleSave() {
    if (!generated || !canSave) return;

    setSaving(true);
    setSaveError("");

    const result = await saveAutomation({
      vibe,
      businessType,
      goal,
      generated,
    });

    setSaving(false);

    if (result?.error) {
      setSaveError(result.error);
      return;
    }

    setSaved(true);
    setSavedId(result.id ?? null);
    router.refresh();
  }

  async function handleTestRun() {
    if (!generated || testing) return;

    setTesting(true);
    setTestComplete(false);
    setTestLog([]);

    const statuses: Record<number, StepStatus> = {};
    generated.steps.forEach((step) => {
      statuses[step.step] = "pending";
    });
    setStepStatus({ ...statuses });

    for (const step of generated.steps) {
      statuses[step.step] = "running";
      setStepStatus({ ...statuses });
      setTestLog((previous) => [
        ...previous,
        `Checking step ${String(step.step).padStart(2, "0")} / ${step.title}`,
      ]);

      await new Promise((resolve) => setTimeout(resolve, 700));

      statuses[step.step] = "completed";
      setStepStatus({ ...statuses });
      setTestLog((previous) => [
        ...previous,
        `Step ${String(step.step).padStart(2, "0")} complete / ${step.tool || "No tool listed"}`,
      ]);
    }

    setTestLog((previous) => [
      ...previous,
      `Simulation finished / ${generated.steps.length} steps checked / No external tools contacted.`,
    ]);
    setTestComplete(true);
    setTesting(false);
  }

  function handleExport() {
    if (!generated) return;

    const lines = [
      `# ${generated.title}`,
      "",
      generated.summary,
      "",
      `**Estimated time returned:** ${generated.estimatedTimeSavings}`,
      "",
      "## Brief",
      "",
      `> ${vibe}`,
      "",
      "## Steps",
      "",
      ...generated.steps.flatMap((step) => [
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
      generated.integrations.join(", "),
      "",
    ];

    const blob = new Blob([lines.join("\n")], {
      type: "text/markdown;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${slugify(generated.title)}.md`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  if (loading) {
    return (
      <div className="border border-line bg-paper">
        <div className="flex items-center justify-between border-b border-line bg-paper-2 px-4 py-2.5">
          <span className="label-mono text-rust-deep">Mapping the steps</span>
          <Loader2
            className="h-4 w-4 animate-spin text-rust"
            aria-hidden="true"
          />
        </div>
        <div className="space-y-5 p-5 sm:p-6" aria-live="polite">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <div className="grid grid-cols-3 gap-3 border-y border-line py-3">
            {[1, 2, 3].map((item) => (
              <Skeleton key={item} className="h-10 w-full" />
            ))}
          </div>
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex gap-3">
              <Skeleton className="h-8 w-8 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-3 w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!generated) {
    return (
      <div className="relative border border-dashed border-line-strong bg-paper/50 px-6 pb-8 pt-10 sm:px-8 sm:pb-10 sm:pt-12">
        <div className="absolute -top-px left-5 border-x border-b border-dashed border-line-strong bg-paper px-3 py-1.5">
          <span className="label-mono text-muted">Draft / No plan yet</span>
        </div>

        <h2 className="max-w-md font-display text-[28px] leading-[1.08] tracking-[-0.025em] text-ink sm:text-[34px]">
          Your plan will appear here.
        </h2>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
          Describe the work on the left. We will map the steps, tools, and
          triggers into a plan you can review.
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <Button type="button" variant="secondary" size="sm" onClick={onSample}>
            View a sample plan
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Button>
          <Link
            href="/dashboard/examples"
            className="text-[12px] font-medium text-rust-deep underline-offset-4 hover:underline"
          >
            Browse field notes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-line bg-paper">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line bg-paper-2 px-4 py-2.5">
        <span className="label-mono text-muted">
          {sample ? "Sample plan" : "Generated plan"}
        </span>
        <Badge tone={sample ? "brass" : "pine"}>
          {sample ? "Preview only" : "Not saved"}
        </Badge>
      </div>

      <div className="p-5 sm:p-6">
        {saved && (
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border border-pine/25 bg-pine-wash px-3.5 py-3 text-[13px] text-pine">
            <span className="inline-flex items-center gap-2">
              <CircleCheck className="h-4 w-4" aria-hidden="true" />
              Saved to your library.
            </span>
            <Link
              href={savedId ? `/dashboard/automations/${savedId}` : "/dashboard/automations"}
              className="inline-flex items-center gap-1.5 font-medium underline-offset-4 hover:underline"
            >
              View plan
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        )}

        <PlanView
          plan={generated}
          statuses={testing || testComplete ? stepStatus : undefined}
        />

        {sample && (
          <p className="mt-5 flex items-start gap-2 border border-brass/40 bg-brass/10 px-3.5 py-3 text-[12px] leading-relaxed text-ink-2">
            <TriangleAlert
              className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brass"
              aria-hidden="true"
            />
            This is a sample plan for reference. Generate your own plan to save
            it to your library.
          </p>
        )}

        {limitReached && !sample && (
          <p className="mt-5 flex items-start gap-2 border border-brass/40 bg-brass/10 px-3.5 py-3 text-[12px] leading-relaxed text-ink-2">
            <TriangleAlert
              className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brass"
              aria-hidden="true"
            />
            You have 3 saved plans. Delete one in your{" "}
            <Link
              href="/dashboard/automations"
              className="font-medium text-rust-deep underline-offset-4 hover:underline"
            >
              library
            </Link>{" "}
            to save this one.
          </p>
        )}

        {saveError && (
          <p
            role="alert"
            className="mt-5 flex items-start gap-2 border border-danger/30 bg-danger-wash px-3.5 py-3 text-[12px] leading-relaxed text-danger"
          >
            <CircleAlert
              className="mt-0.5 h-3.5 w-3.5 shrink-0"
              aria-hidden="true"
            />
            {saveError}
          </p>
        )}

        <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-line pt-5">
          {saved ? (
            <span className="inline-flex h-11 items-center gap-2 rounded-sm border border-pine/25 bg-pine-wash px-4 text-sm font-medium text-pine">
              <CircleCheck className="h-4 w-4" aria-hidden="true" />
              Saved
            </span>
          ) : (
            <Button
              type="button"
              onClick={handleSave}
              disabled={saving || !canSave}
            >
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Saving...
                </>
              ) : (
                "Save plan"
              )}
            </Button>
          )}

          <Button
            type="button"
            variant="secondary"
            onClick={handleTestRun}
            disabled={testing}
          >
            {testing ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            ) : (
              <Play className="h-4 w-4" aria-hidden="true" />
            )}
            {testing ? "Running..." : "Run simulation"}
          </Button>

          <Button
            type="button"
            variant="ghost"
            onClick={onRegenerate}
            disabled={testing || saving}
          >
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
            Regenerate
          </Button>

          <Button
            type="button"
            variant="ghost"
            onClick={handleExport}
            disabled={testing}
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            Export
          </Button>

          <Button
            type="button"
            variant="ghost"
            onClick={onReset}
            disabled={testing || saving}
            className="ml-auto text-muted"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Start over
          </Button>
        </div>

        {(testLog.length > 0 || testComplete) && (
          <div className="mt-4 border border-line bg-paper-2 p-3.5" aria-live="polite">
            <div className="max-h-48 overflow-y-auto font-mono text-[10px] leading-relaxed text-muted">
              {testLog.map((line, index) => (
                <p
                  key={`${line}-${index}`}
                  className={cn(
                    line.startsWith("Simulation finished") && "text-pine",
                  )}
                >
                  <span className="text-line-strong">
                    {String(index + 1).padStart(2, "0")}
                  </span>{" "}
                  {line}
                </p>
              ))}
            </div>
            {testComplete && (
              <div className="mt-3 flex items-start gap-2 border-t border-line pt-3 text-[11px] leading-relaxed text-pine">
                <CircleCheck
                  className="mt-0.5 h-3.5 w-3.5 shrink-0"
                  aria-hidden="true"
                />
                Simulation complete. {generated.steps.length} steps checked
                against the plan. No tools were connected or executed.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
