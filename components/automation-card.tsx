"use client";

import { useState } from "react";
import Link from "next/link";
import { deleteAutomation } from "@/lib/automation-actions";
import type { GeneratedAutomation } from "@/lib/groq";

export function AutomationCard({
  id,
  vibe,
  businessType,
  goal,
  status,
  createdAt,
  generatedSteps,
}: {
  id: string;
  vibe: string;
  businessType: string;
  goal: string;
  status: string;
  createdAt: Date;
  generatedSteps: string;
}) {
  const [deleting, setDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  let parsed: GeneratedAutomation | null = null;
  try {
    parsed = JSON.parse(generatedSteps);
  } catch {}

  const date = new Date(createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const handleDelete = async () => {
    setDeleting(true);
    await deleteAutomation(id);
    setDeleting(false);
    setShowConfirm(false);
  };

  return (
    <div className="group relative rounded-xl border border-slate-800 bg-slate-900/50 p-5 transition-colors hover:border-slate-700">
      <Link
        href={`/dashboard/automations/${id}`}
        className="block"
      >
        <div className="flex items-start justify-between">
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-sm font-semibold text-slate-100">
              {parsed?.title ?? "Untitled"}
            </h3>
            <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-500">
              {vibe.slice(0, 120)}
              {vibe.length > 120 && "..."}
            </p>
          </div>
          <span className="ml-3 shrink-0 rounded-full bg-indigo-500/10 px-2 py-0.5 text-xs font-medium text-indigo-400">
            {goal}
          </span>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-600">
          <span>{businessType}</span>
          <span>·</span>
          <span>{parsed?.steps.length ?? 0} steps</span>
          <span>·</span>
          <span>{parsed?.estimatedTimeSavings ?? ""}</span>
          <span>·</span>
          <span>{date}</span>
          <span>·</span>
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-medium ${
              status === "saved"
                ? "bg-green-500/10 text-green-400"
                : "bg-slate-700/50 text-slate-400"
            }`}
          >
            {status}
          </span>
        </div>
      </Link>

      <div className="mt-4 flex items-center gap-2 border-t border-slate-800 pt-3">
        <Link
          href="/dashboard/create"
          className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-400 transition-colors hover:border-slate-600 hover:text-slate-200"
        >
          Run Again
        </Link>
        {showConfirm ? (
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="rounded-lg bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-400 transition-colors hover:bg-red-500/20"
            >
              {deleting ? "Deleting..." : "Confirm"}
            </button>
            <button
              onClick={() => setShowConfirm(false)}
              className="rounded-lg px-2 py-1.5 text-xs text-slate-500 hover:text-slate-300"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowConfirm(true)}
            className="rounded-lg px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-red-500/5 hover:text-red-400"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
