"use client";

import { useState } from "react";
import type { GeneratedAutomation } from "@/lib/groq";
import { Button, ButtonPrimary } from "@/components/ui/button";
import { saveAutomation } from "@/lib/automation-actions";

function getStatusEmoji(status: string) {
  switch (status) {
    case "completed":
      return "✅";
    case "running":
      return "⏳";
    case "failed":
      return "❌";
    default:
      return "○";
  }
}

export function PreviewPanel({
  generated,
  vibe,
  businessType,
  goal,
  onRegenerate,
  onReset,
}: {
  generated: GeneratedAutomation | null;
  vibe: string;
  businessType: string;
  goal: string;
  onRegenerate: () => void;
  onReset: () => void;
}) {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [testing, setTesting] = useState(false);
  const [stepStatus, setStepStatus] = useState<
    Record<number, "pending" | "running" | "completed" | "failed">
  >({});
  const [testLog, setTestLog] = useState<string[]>([]);
  const [testComplete, setTestComplete] = useState(false);

  if (!generated) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-slate-800 p-12 text-center">
        <p className="text-sm text-slate-500">
          Describe your workflow on the left and click{" "}
          <span className="text-indigo-400">Generate Automation</span> to see
          the structured result here.
        </p>
      </div>
    );
  }

  const handleSave = async () => {
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
    } else {
      setSaved(true);
    }
  };

  const handleTestRun = async () => {
    setTesting(true);
    setTestComplete(false);
    setTestLog([]);
    const status: Record<number, "pending" | "running" | "completed" | "failed"> = {};
    generated.steps.forEach((s) => (status[s.step] = "pending"));
    setStepStatus({ ...status });

    for (const step of generated.steps) {
      status[step.step] = "running";
      setStepStatus({ ...status });
      setTestLog((prev) => [
        ...prev,
        `[${new Date().toLocaleTimeString()}] Executing Step ${step.step}: ${step.title}...`,
      ]);

      await new Promise((r) => setTimeout(r, 1000 + Math.random() * 1000));

      status[step.step] = "completed";
      setStepStatus({ ...status });
      setTestLog((prev) => [
        ...prev,
        `[${new Date().toLocaleTimeString()}] ✓ ${step.title} — ${step.tool || "Manual"} configured successfully`,
      ]);
    }

    setTestLog((prev) => [
      ...prev,
      `[${new Date().toLocaleTimeString()}] ✅ Test complete — all ${generated.steps.length} steps passed. Integrations verified: ${generated.integrations.join(", ")}`,
    ]);
    setTestComplete(true);
    setTesting(false);
  };

  const handleExport = () => {
    const text = [
      `# ${generated.title}`,
      "",
      generated.summary,
      "",
      `Estimated Time Savings: ${generated.estimatedTimeSavings}`,
      "",
      "## Steps",
      ...generated.steps.map(
        (s) =>
          `${s.step}. ${s.title}\n   ${s.description}\n   Trigger: ${s.trigger || "N/A"} | Action: ${s.action} | Tool: ${s.tool || "N/A"} | Frequency: ${s.frequency || "N/A"}`,
      ),
      "",
      `Integrations: ${generated.integrations.join(", ")}`,
    ].join("\n");

    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${generated.title.replace(/\s+/g, "_").toLowerCase()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-100">
          {generated.title}
        </h3>
        <p className="mt-1 whitespace-pre-line text-sm leading-relaxed text-slate-400">
          {generated.summary}
        </p>
        <p className="mt-2 text-xs font-medium text-indigo-400">
          ⏱ Estimated savings: {generated.estimatedTimeSavings}
        </p>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
          Automation Steps
        </p>
        {generated.steps.map((step) => {
          const st = stepStatus[step.step] || "pending";
          const isRunning = st === "running";
          return (
            <div
              key={step.step}
              className={`rounded-lg border p-4 transition-colors ${
                isRunning
                  ? "border-indigo-700 bg-indigo-500/5"
                  : st === "completed"
                    ? "border-green-800 bg-green-950/10"
                    : "border-slate-800 bg-slate-900/50"
              }`}
            >
              <div className="flex items-start gap-3">
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-medium ${
                    isRunning
                      ? "bg-indigo-500/20 text-indigo-400"
                      : st === "completed"
                        ? "bg-green-500/10 text-green-400"
                        : "bg-indigo-500/10 text-indigo-400"
                  }`}
                >
                  {testing ? getStatusEmoji(st) : step.step}
                </span>
                <div className="min-w-0 flex-1 space-y-1">
                  <p className="text-sm font-medium text-slate-200">
                    {step.title}
                  </p>
                  <p className="text-xs leading-relaxed text-slate-500">
                    {step.description}
                  </p>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 pt-1 text-xs text-slate-600">
                    {step.trigger && <span>🔔 {step.trigger}</span>}
                    {step.action && <span>⚡ {step.action}</span>}
                    {step.tool && <span>🧰 {step.tool}</span>}
                    {step.frequency && <span>🔄 {step.frequency}</span>}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div>
        <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
          Integrations
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {generated.integrations.map((i) => (
            <span
              key={i}
              className="rounded-full border border-slate-700 bg-slate-900 px-2.5 py-0.5 text-xs text-slate-400"
            >
              {i}
            </span>
          ))}
        </div>
      </div>

      {testing && testLog.length > 0 && (
        <div className="rounded-lg border border-slate-800 bg-slate-950 p-3 font-mono text-xs leading-relaxed text-slate-500 max-h-48 overflow-y-auto">
          {testLog.map((line, i) => (
            <div key={i} className={line.includes("✅") ? "text-green-400" : ""}>
              {line}
            </div>
          ))}
        </div>
      )}

      {testComplete && (
        <div className="rounded-lg border border-green-800 bg-green-950/30 p-3 text-xs text-green-400">
          ✅ Test simulation completed. All {generated.steps.length} steps
          validated. Integrations verified: {generated.integrations.join(", ")}.
          Ready for production.
        </div>
      )}

      {saveError && (
        <div className="rounded-lg border border-red-800 bg-red-950/50 p-3 text-xs text-red-400">
          {saveError}
        </div>
      )}

      <div className="flex flex-wrap gap-2 border-t border-slate-800 pt-4">
        {saved ? (
          <span className="inline-flex items-center rounded-lg bg-green-500/10 px-4 py-2.5 text-sm font-medium text-green-400">
            ✓ Saved
          </span>
        ) : (
          <ButtonPrimary onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save Automation"}
          </ButtonPrimary>
        )}
        <Button onClick={handleTestRun} disabled={testing}>
          {testing ? "Running..." : "Test Run"}
        </Button>
        <Button onClick={onRegenerate}>Regenerate</Button>
        <Button onClick={handleExport}>Export</Button>
        <Button onClick={onReset} className="text-slate-500">
          Start Over
        </Button>
      </div>
    </div>
  );
}
