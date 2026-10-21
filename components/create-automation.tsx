"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Circle,
  CircleCheck,
  CircleAlert,
  FileText,
  Loader2,
  TriangleAlert,
} from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Button, ButtonLink } from "@/components/ui/button";
import {
  FieldMessage,
  Label,
  Textarea,
} from "@/components/ui/input";
import { BusinessChips, GoalChips } from "@/components/chips";
import { PreviewPanel } from "@/components/preview-panel";
import { FEATURED_NOTE, FEATURED_PLAN } from "@/lib/examples";
import type { GeneratedAutomation } from "@/lib/groq";
import { cn } from "@/lib/utils";

export function CreateAutomation({
  initialVibe,
  initialBusiness,
  initialGoal,
  savedCount,
}: {
  initialVibe: string;
  initialBusiness: string;
  initialGoal: string;
  savedCount: number;
}) {
  const [vibe, setVibe] = useState(initialVibe);
  const [businessType, setBusinessType] = useState(initialBusiness);
  const [goal, setGoal] = useState(initialGoal);
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState<GeneratedAutomation | null>(null);
  const [error, setError] = useState("");
  const [sample, setSample] = useState(false);
  const [generationId, setGenerationId] = useState(0);

  const canGenerate =
    vibe.trim().length >= 10 &&
    Boolean(businessType) &&
    Boolean(goal) &&
    !generating;

  const checks = [
    { label: "At least 10 characters", done: vibe.trim().length >= 10 },
    { label: "A business type", done: Boolean(businessType) },
    { label: "A goal", done: Boolean(goal) },
  ];

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

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Generation failed");
      }

      setResult(data as GeneratedAutomation);
      setSample(false);
      setGenerationId((value) => value + 1);
    } catch (caught) {
      setError(
        caught instanceof Error ? caught.message : "Something went wrong.",
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
  };

  const handleReset = () => {
    setResult(null);
    setError("");
    setSample(false);
    setVibe("");
    setBusinessType("");
    setGoal("");
    setGenerationId((value) => value + 1);
  };

  return (
    <div>
      <PageHeader
        eyebrow="New automation"
        title="Describe the work."
        description="Write it the way you would explain it to a new hire. We will turn it into a structured plan."
        meta={<span>{savedCount} of 3 saved</span>}
        actions={
          <ButtonLink
            href="/dashboard/automations"
            variant="secondary"
            size="sm"
          >
            Library
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </ButtonLink>
        }
      />

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
              01 / The work
            </legend>

            <div className="space-y-2">
              <Label htmlFor="vibe">The work, in your words</Label>
              <Textarea
                id="vibe"
                name="vibe"
                value={vibe}
                onChange={(event) => setVibe(event.target.value)}
                maxLength={2000}
                rows={8}
                placeholder="Example: Every time a new client books an appointment, I manually check my calendar, send a confirmation text, create a file, and follow up 2 days later. This takes me 20 minutes per client and I sometimes forget the follow-up."
                aria-describedby="vibe-helper"
              />
              <div className="flex items-start justify-between gap-4">
                <FieldMessage id="vibe-helper" className="max-w-[40ch]">
                  Include the trigger, the steps, and how often it happens.
                </FieldMessage>
                <span
                  className={cn(
                    "shrink-0 font-mono text-[10px] tabular-nums",
                    vibe.trim().length >= 10 ? "text-pine" : "text-muted",
                  )}
                >
                  {vibe.length}/2000
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleUseExample}
              className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-medium text-rust-deep transition-colors hover:text-ink"
            >
              <FileText className="h-3.5 w-3.5" aria-hidden="true" />
              Use an example brief
            </button>
          </fieldset>

          <fieldset className="border-t border-line py-6">
            <legend className="label-mono mb-3 text-rust-deep">
              02 / The business
            </legend>
            <div className="mb-2 flex items-center justify-between gap-3">
              <Label>Business type</Label>
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
              <Label>What should this automate?</Label>
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

          {savedCount >= 3 && (
            <div className="mb-5 flex items-start gap-2 border border-brass/40 bg-brass/10 px-3.5 py-3 text-[12px] leading-relaxed text-ink-2">
              <TriangleAlert
                className="mt-0.5 h-4 w-4 shrink-0 text-brass"
                aria-hidden="true"
              />
              <p>
                You have 3 saved plans. You can still build and preview a plan,
                but saving requires an open slot.{" "}
                <Link
                  href="/dashboard/automations"
                  className="font-medium text-rust-deep underline-offset-4 hover:underline"
                >
                  Open library
                </Link>
                .
              </p>
            </div>
          )}

          {error && (
            <p
              role="alert"
              className="mb-5 flex items-start gap-2 border border-danger/30 bg-danger-wash px-3.5 py-3 text-[13px] leading-relaxed text-danger"
            >
              <CircleAlert
                className="mt-0.5 h-4 w-4 shrink-0"
                aria-hidden="true"
              />
              {error}
            </p>
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
                Mapping the steps...
              </>
            ) : (
              <>
                Build the plan
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </>
            )}
          </Button>

          {!canGenerate && !generating && (
            <FieldMessage className="mt-2 text-center">
              Add the missing details above to build a plan.
            </FieldMessage>
          )}
        </form>

        <div className="min-w-0 lg:sticky lg:top-20">
          <PreviewPanel
            key={generationId}
            generated={result}
            loading={generating}
            vibe={vibe}
            businessType={businessType}
            goal={goal}
            savedCount={savedCount}
            sample={sample}
            onSample={handleSample}
            onRegenerate={() => void handleGenerate()}
            onReset={handleReset}
          />
        </div>
      </div>
    </div>
  );
}
