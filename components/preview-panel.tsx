"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  CircleCheck,
  Download,
  Loader2,
  RefreshCw,
} from "lucide-react";
import type { GeneratedAutomation } from "@/lib/groq";
import { saveAutomation } from "@/lib/automation-actions";
import { downloadPlanMarkdown } from "@/lib/export-plan";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { PlanView } from "@/components/plan-view";
import { Skeleton } from "@/components/ui/skeleton";
import { ReplaceAutomationDialog } from "@/components/replace-automation-dialog";
import {
  MAX_AUTOMATIONS,
  type SavedAutomationSummary,
} from "@/lib/automation-config";

export function PreviewPanel({
  generated,
  loading,
  vibe,
  businessType,
  goal,
  savedAutomations,
  sample,
  onSample,
  onRegenerate,
}: {
  generated: GeneratedAutomation | null;
  loading: boolean;
  vibe: string;
  businessType: string;
  goal: string;
  savedAutomations: SavedAutomationSummary[];
  sample: boolean;
  onSample: () => void;
  onRegenerate: () => void;
}) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [savedId, setSavedId] = useState<string | null>(null);
  const [saveError, setSaveError] = useState("");
  const [replaceOpen, setReplaceOpen] = useState(false);

  const limitReached = savedAutomations.length >= MAX_AUTOMATIONS;
  const canSave = Boolean(generated) && !sample && !saved;

  async function handleSave(replaceId?: string) {
    if (!generated || !canSave || saving) return;

    setSaving(true);
    setSaveError("");

    const result = await saveAutomation({
      vibe,
      businessType,
      goal,
      generated,
      replaceId,
    });

    setSaving(false);

    if (result?.code === "limit") {
      setReplaceOpen(true);
      router.refresh();
      return;
    }

    if (result?.code === "invalid") {
      router.refresh();
    }

    if (result?.error) {
      setSaveError(result.error);
      return;
    }

    setReplaceOpen(false);
    setSaved(true);
    setSavedId(result.id ?? null);
    router.refresh();
  }

  function handleSaveClick() {
    if (limitReached) {
      setReplaceOpen(true);
      return;
    }
    void handleSave();
  }

  if (loading) {
    return (
      <div className="border border-line bg-paper">
        <div className="flex items-center justify-between border-b border-line bg-paper-2 px-4 py-2.5">
          <span className="label-mono text-rust-deep">
            Creating your automation
          </span>
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
          <span className="label-mono text-muted">Preview</span>
        </div>

        <h2 className="max-w-md font-display text-[28px] leading-[1.08] tracking-[-0.025em] text-ink sm:text-[34px]">
          Your automation will appear here.
        </h2>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
          Describe the task on the left. We&apos;ll map the steps, tools, and
          triggers into an automation you can review.
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <Button type="button" variant="secondary" size="sm" onClick={onSample}>
            View a sample automation
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Button>
          <Link
            href="/dashboard/examples"
            className="text-[12px] font-medium text-rust-deep underline-offset-4 hover:underline"
          >
            Browse templates
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="border border-line bg-paper">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line bg-paper-2 px-4 py-2.5">
          <span className="label-mono text-muted">
            {sample ? "Sample automation" : "Your automation"}
          </span>
          <Badge
            tone={saved ? "pine" : sample ? "brass" : "neutral"}
          >
            {saved ? "Saved" : sample ? "Preview only" : "Not saved"}
          </Badge>
        </div>

        <div
          className="p-5 sm:p-6"
          aria-live="polite"
          aria-busy={saving}
        >
          {saved && (
            <div
              role="status"
              className="mb-5 flex flex-wrap items-center justify-between gap-3 border border-pine/25 bg-pine-wash px-3.5 py-3 text-[13px] text-pine"
            >
              <span className="inline-flex items-center gap-2">
                <CircleCheck className="h-4 w-4" aria-hidden="true" />
                Saved to your automations.
              </span>
              <Link
                href={
                  savedId
                    ? `/dashboard/automations/${savedId}`
                    : "/dashboard"
                }
                className="inline-flex items-center gap-1.5 font-medium underline-offset-4 hover:underline"
              >
                View automation
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
          )}

          <PlanView plan={generated} />

          {sample && (
            <Alert tone="warning" className="mt-5">
              This is a sample. Create your own automation to save it.
            </Alert>
          )}

          {limitReached && !sample && !saved && (
            <Alert tone="warning" className="mt-5">
              All {MAX_AUTOMATIONS} automations are in use. Choose one to
              replace when you save.
            </Alert>
          )}

          {saveError && (
            <Alert tone="danger" className="mt-5">
              {saveError}
            </Alert>
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
                onClick={handleSaveClick}
                disabled={saving || !canSave}
              >
                {saving ? (
                  <>
                    <Loader2
                      className="h-4 w-4 animate-spin"
                      aria-hidden="true"
                    />
                    Saving...
                  </>
                ) : (
                  "Save automation"
                )}
              </Button>
            )}

            <Button
              type="button"
              variant="secondary"
              onClick={onRegenerate}
              disabled={saving}
            >
              <RefreshCw className="h-4 w-4" aria-hidden="true" />
              Regenerate
            </Button>

            <Button
              type="button"
              variant="ghost"
              onClick={() => downloadPlanMarkdown(generated, vibe)}
              disabled={saving}
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Export
            </Button>
          </div>
        </div>
      </div>

      {!sample && (
        <ReplaceAutomationDialog
          open={replaceOpen}
          items={savedAutomations}
          pending={saving}
          error={saveError}
          onClose={() => setReplaceOpen(false)}
          onConfirm={(id) => void handleSave(id)}
        />
      )}
    </>
  );
}
