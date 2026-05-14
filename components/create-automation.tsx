"use client";

import { useState } from "react";
import { ButtonPrimary } from "@/components/ui/button";
import { BusinessChips, GoalChips } from "@/components/chips";
import { PreviewPanel } from "@/components/preview-panel";
import type { GeneratedAutomation } from "@/lib/groq";

export function CreateAutomation() {
  const [vibe, setVibe] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [goal, setGoal] = useState("");
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState<GeneratedAutomation | null>(null);
  const [error, setError] = useState("");

  const canGenerate = vibe.trim().length > 10 && businessType && goal && !generating;

  const handleGenerate = async () => {
    setError("");
    setGenerating(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vibe: vibe.trim(), businessType, goal }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Generation failed");
      setResult(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setGenerating(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError("");
    setVibe("");
    setBusinessType("");
    setGoal("");
  };

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
      <div className="flex-1 space-y-5 lg:max-w-lg">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-100">
            Create Automation
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Describe your operation in plain English and let AI structure it
            into a workflow.
          </p>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">
            Describe your workflow
          </label>
          <textarea
            value={vibe}
            onChange={(e) => setVibe(e.target.value)}
            placeholder={`Example: "Every time a new client books an appointment, I manually check my calendar, send them a confirmation text, create a file, and follow up 2 days later. This takes me 20 minutes per client and I sometimes forget the follow-up."`}
            rows={7}
            className="w-full resize-y rounded-lg border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
          <p className="text-xs text-slate-600">
            The more detail you provide, the better the automation.{" "}
            {vibe.length > 0 && (
              <span
                className={
                  vibe.length < 10 ? "text-red-400" : "text-green-400"
                }
              >
                {vibe.length} characters{" "}
                {vibe.length < 10 && "(min 10 needed)"}
              </span>
            )}
          </p>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">
            Business Type
          </label>
          <BusinessChips selected={businessType} onChange={setBusinessType} />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">
            What do you want to automate?
          </label>
          <GoalChips selected={goal} onChange={setGoal} />
        </div>

        {error && (
          <p className="rounded-lg border border-red-800 bg-red-950/50 px-4 py-2.5 text-sm text-red-400">
            {error}
          </p>
        )}

        <ButtonPrimary
          onClick={handleGenerate}
          disabled={!canGenerate}
          className="w-full"
        >
          {generating ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Generating...
            </span>
          ) : (
            "Generate Automation"
          )}
        </ButtonPrimary>
      </div>

      <div className="flex-1 lg:min-w-0">
        <PreviewPanel
          generated={result}
          vibe={vibe}
          businessType={businessType}
          goal={goal}
          onRegenerate={handleGenerate}
          onReset={handleReset}
        />
      </div>
    </div>
  );
}
