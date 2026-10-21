"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Circle,
  CircleCheck,
  FileText,
  Loader2,
} from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { FieldMessage, Label, Textarea } from "@/components/ui/input";
import { BusinessChips, GoalChips } from "@/components/chips";
import { PreviewPanel } from "@/components/preview-panel";
import { FEATURED_NOTE, FEATURED_PLAN } from "@/lib/examples";
import type { GeneratedAutomation } from "@/lib/groq";
import {
  MAX_AUTOMATIONS,
  MAX_DESCRIPTION_LENGTH,
  type SavedAutomationSummary,
} from "@/lib/automation-config";
import { cn } from "@/lib/utils";

export function CreateAutomation({
  initialVibe,
  initialBusiness,
  initialGoal,
  templateLoaded,
  savedAutomations,
}: {
  initialVibe: string;
  initialBusiness: string;
  initialGoal: string;
  templateLoaded: boolean;
  savedAutomations: SavedAutomationSummary[];
}) {
  const [vibe, setVibe] = useState(initialVibe);
  const [businessType, setBusinessType] = useState(initialBusiness);
  const [goal, setGoal] = useState(initialGoal);
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState<GeneratedAutomation | null>(null);
  const [error, setError] = useState("");
  const [sample, setSample] = useState(false);
  const [generationId, setGenerationId] = useState(0);
  const previewRef = useRef<HTMLDivElement>(null);

  const canGenerate =
    vibe.trim().length >= 10 &&
    Boolean(businessType) &&
    Boolean(goal) &&
    !generating;

  const checks = [
    { label: "10+ characters", done: vibe.trim().length >= 10 },
    { label: "A business type", done: Boolean(businessType) },
    { label: "A goal", done: Boolean(goal) },
  ];

  function scrollToPreview() {
    requestAnimationFrame(() => {
      if (window.matchMedia("(max-width: 1023px)").matches) {
        previewRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  }

  const handleGenerate = async () => {
    if (!canGenerate) return;

    setError("");
    setGenerating(true);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vibe: vibe.trim(),
          businessType,
          goal,
        }),
      });

      const data = await response.json().catch(() => null);
      if (!response.ok) {
        if (response.status === 429) {
          const seconds =
            typeof data?.retryAfter === "number" ? data.retryAfter : 30;
          throw new Error(
            `You're going a little fast. Try again in ${seconds} seconds.`,
          );
        }
        throw new Error(
          data?.error || "Something went wrong. Please try again.",
        );
      }

      if (
        !data ||
        typeof data !== "object" ||
        typeof data.title !== "string" ||
        typeof data.summary !== "string" ||
        typeof data.estimatedTimeSavings !== "string" ||
        !Array.isArray(data.steps)
      ) {
        throw new Error(
          "The automation came back incomplete. Please try again.",
        );
      }

      setResult(data as GeneratedAutomation);
      setSample(false);
      setGenerationId((value) => value + 1);
      scrollToPreview();
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setGenerating(false);
    }
  };

  const handleUseExample = () => {
    setVibe(FEATURED_NOTE.vibe);
    setBusinessType(FEATURED_NOTE.business);
    setGoal(FEATURED_NOTE.goal);
    setError("");
  };

  const handleSample = () => {
    setResult(FEATURED_PLAN);
    setSample(true);
    setError("");
    setGenerationId((value) => value + 1);
    scrollToPreview();
  };

  return (
    <div>
      <PageHeader
        eyebrow="New automation"
        title="What do you want to automate?"
        description="Describe the task you do by hand. We'll turn it into clear steps you can review before saving."
        meta={
          <span>
            {savedAutomations.length} of {MAX_AUTOMATIONS} used
          </span>
        }
      />

      {templateLoaded && (
        <div className="mt-6 border-l-2 border-rust bg-paper-2 px-5 py-4">
          <p className="label-mono text-rust-deep">Template loaded</p>
          <p className="mt-1 text-[13px] leading-relaxed text-ink-2">
            Review the description, then create your automation.
          </p>
        </div>
      )}

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-start">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            void handleGenerate();
          }}
          className="min-w-0"
        >
          <fieldset className="border-t border-line py-6">
            <legend className="label-mono mb-3 text-rust-deep">
              01 / Describe it
            </legend>

            <div className="space-y-2">
              <Label htmlFor="vibe">What do you want to automate?</Label>
              <Textarea
                id="vibe"
                name="vibe"
                value={vibe}
                onChange={(event) => setVibe(event.target.value)}
                onKeyDown={(event) => {
                  if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
                    event.preventDefault();
                    void handleGenerate();
                  }
                }}
                maxLength={MAX_DESCRIPTION_LENGTH}
                rows={8}
                placeholder="Example: Every time a new client books an appointment, I manually check my calendar, send a confirmation text, create a file, and follow up 2 days later. This takes me 20 minutes per client and I sometimes forget the follow-up."
                aria-describedby="vibe-helper"
              />
              <div className="flex items-start justify-between gap-4">
                <FieldMessage id="vibe-helper" className="max-w-[40ch]">
                  Include what starts it, the steps, and how often it happens.
                </FieldMessage>
                <span
                  className={cn(
                    "shrink-0 font-mono text-[10px] tabular-nums",
                    vibe.trim().length >= 10 ? "text-pine" : "text-muted",
                  )}
                >
                  {vibe.length}/{MAX_DESCRIPTION_LENGTH}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleUseExample}
              className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-medium text-rust-deep transition-colors hover:text-ink"
            >
              <FileText className="h-3.5 w-3.5" aria-hidden="true" />
              Fill in an example
            </button>
          </fieldset>

          <fieldset className="border-t border-line py-6">
            <legend className="label-mono mb-3 text-rust-deep">
              02 / The business
            </legend>
            <div className="mb-2 flex items-center justify-between gap-3">
              <Label>What kind of business?</Label>
              {businessType && (
                <button
                  type="button"
                  onClick={() => setBusinessType("")}
                  className="text-[11px] text-muted transition-colors hover:text-ink"
                >
                  Clear
                </button>
              )}
            </div>
            <BusinessChips
              selected={businessType}
              onChange={setBusinessType}
            />
          </fieldset>

          <fieldset className="border-t border-line py-6">
            <legend className="label-mono mb-3 text-rust-deep">
              03 / The goal
            </legend>
            <div className="mb-2 flex items-center justify-between gap-3">
              <Label>What do you want to improve?</Label>
              {goal && (
                <button
                  type="button"
                  onClick={() => setGoal("")}
                  className="text-[11px] text-muted transition-colors hover:text-ink"
                >
                  Clear
                </button>
              )}
            </div>
            <GoalChips selected={goal} onChange={setGoal} />
          </fieldset>

          <ul className="grid gap-2 border-t border-line py-4 sm:grid-cols-3">
            {checks.map((check) => (
              <li
                key={check.label}
                className={cn(
                  "flex items-center gap-2 text-[11px]",
                  check.done ? "text-ink" : "text-muted",
                )}
              >
                {check.done ? (
                  <CircleCheck
                    className="h-3.5 w-3.5 shrink-0 text-pine"
                    aria-hidden="true"
                  />
                ) : (
                  <Circle
                    className="h-3.5 w-3.5 shrink-0 text-line-strong"
                    aria-hidden="true"
                  />
                )}
                {check.label}
              </li>
            ))}
          </ul>

          {savedAutomations.length >= MAX_AUTOMATIONS && (
            <Alert tone="warning" className="mb-5">
              You&apos;ve used all {MAX_AUTOMATIONS} automations. You can still
              create and preview one — when you save, you&apos;ll choose which
              automation to replace.{" "}
              <Link
                href="/dashboard"
                className="font-medium text-rust-deep underline-offset-4 hover:underline"
              >
                View your automations
              </Link>
              .
            </Alert>
          )}

          {error && (
            <Alert tone="danger" className="mb-5">
              {error}
            </Alert>
          )}

          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={!canGenerate}
          >
            {generating ? (
              <>
                <Loader2
                  className="h-4 w-4 animate-spin"
                  aria-hidden="true"
                />
                Creating your automation...
              </>
            ) : (
              <>
                Create my automation
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </>
            )}
          </Button>

          {!canGenerate && !generating && (
            <FieldMessage className="mt-2 text-center">
              Fill in the three items above to continue.
            </FieldMessage>
          )}
        </form>

        <div className="min-w-0 scroll-mt-20" ref={previewRef}>
          <PreviewPanel
            key={generationId}
            generated={result}
            loading={generating}
            vibe={vibe}
            businessType={businessType}
            goal={goal}
            savedAutomations={savedAutomations}
            sample={sample}
            onSample={handleSample}
            onRegenerate={() => void handleGenerate()}
          />
        </div>
      </div>
    </div>
  );
}
