"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { formatDate, cn } from "@/lib/utils";
import {
  MAX_AUTOMATIONS,
  type SavedAutomationSummary,
} from "@/lib/automation-config";

export function ReplaceAutomationDialog({
  open,
  items,
  pending,
  error,
  onClose,
  onConfirm,
}: {
  open: boolean;
  items: SavedAutomationSummary[];
  pending: boolean;
  error: string;
  onClose: () => void;
  onConfirm: (id: string) => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [selected, setSelected] = useState("");

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      setSelected("");
      dialog.showModal();
    }
    if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
      className="m-auto w-[calc(100vw-32px)] max-w-md rounded-lg border border-line-strong bg-paper p-0 text-ink shadow-lift"
    >
      <div className="border-b border-line px-6 py-5">
        <p className="label-mono text-rust-deep">Save automation</p>
        <h2
          id={titleId}
          className="mt-2 font-display text-[26px] leading-[1.1] tracking-[-0.02em] text-ink"
        >
          Replace an automation
        </h2>
        <p className="mt-2 text-[13px] leading-relaxed text-muted">
          You&apos;ve saved {items.length} of {MAX_AUTOMATIONS}. Choose which
          automation to replace with this one.
        </p>
      </div>

      <div className="px-6 py-5">
        <fieldset>
          <legend className="sr-only">Choose an automation to replace</legend>
          <div className="divide-y divide-line border-y border-line">
            {items.map((item) => (
              <label
                key={item.id}
                className={cn(
                  "flex cursor-pointer items-start gap-3 px-1 py-3.5 transition-colors",
                  selected === item.id ? "bg-paper-2" : "hover:bg-paper-2",
                )}
              >
                <input
                  type="radio"
                  name="replace-id"
                  value={item.id}
                  checked={selected === item.id}
                  onChange={() => setSelected(item.id)}
                  className="mt-1 h-4 w-4 shrink-0 accent-rust"
                />
                <span className="min-w-0">
                  <span className="block truncate text-[13px] font-medium text-ink">
                    {item.title}
                  </span>
                  <span className="mt-0.5 block font-mono text-[10px] text-muted">
                    Saved {formatDate(item.createdAt)}
                  </span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        {error && (
          <Alert tone="danger" className="mt-4">
            {error}
          </Alert>
        )}
      </div>

      <div className="flex items-center justify-end gap-2 border-t border-line bg-paper-2 px-6 py-4">
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={onClose}
          disabled={pending}
        >
          Cancel
        </Button>
        <Button
          type="button"
          size="sm"
          onClick={() => selected && onConfirm(selected)}
          disabled={!selected || pending}
        >
          {pending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Saving...
            </>
          ) : (
            "Replace and save"
          )}
        </Button>
      </div>
    </dialog>
  );
}
