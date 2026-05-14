"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteAutomation } from "@/lib/automation-actions";

export function DeleteButton({ id }: { id: string }) {
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    const result = await deleteAutomation(id);
    if (!result?.error) {
      router.push("/dashboard/automations");
    }
    setDeleting(false);
  };

  if (showConfirm) {
    return (
      <div className="flex items-center gap-1.5">
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="rounded-lg bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/20"
        >
          {deleting ? "Deleting..." : "Confirm Delete"}
        </button>
        <button
          onClick={() => setShowConfirm(false)}
          className="rounded-lg px-3 py-2 text-sm text-slate-500 hover:text-slate-300"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setShowConfirm(true)}
      className="rounded-lg px-4 py-2 text-sm text-slate-500 transition-colors hover:bg-red-500/5 hover:text-red-400"
    >
      Delete
    </button>
  );
}
