"use client";

import { useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { deleteAutomation } from "@/lib/automation-actions";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";

export function DeletePlanButton({
  id,
  title,
  redirectTo,
  className,
}: {
  id: string;
  title: string;
  redirectTo?: string;
  className?: string;
}) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  function open() {
    setError("");
    document.documentElement.style.overflow = "hidden";
    if (!dialogRef.current?.open) dialogRef.current?.showModal();
  }

  function close() {
    dialogRef.current?.close();
  }

  function handleClose() {
    document.documentElement.style.overflow = "";
    setError("");
  }

  async function handleDelete() {
    setPending(true);
    const result = await deleteAutomation(id);
    setPending(false);

    if (result?.error) {
      setError(result.error);
      return;
    }

    close();
    if (redirectTo) {
      router.push(redirectTo);
    } else {
      router.refresh();
    }
  }

  return (
    <>
      <Button
        type="button"
        variant="dangerGhost"
        size="icon"
        onClick={open}
        aria-label={`Delete ${title}`}
        className={className}
      >
        <Trash2 className="h-4 w-4" />
      </Button>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        onClose={handleClose}
        onClick={(event) => {
          if (event.target === dialogRef.current) close();
        }}
        className="m-auto w-[calc(100vw-32px)] max-w-md rounded-lg border border-line-strong bg-paper p-0 text-ink shadow-lift"
      >
        <div className="border-b border-line px-6 py-5">
          <p className="label-mono text-rust-deep">Delete automation</p>
          <h2
            id={titleId}
            className="mt-2 font-display text-[26px] leading-[1.1] tracking-[-0.02em] text-ink"
          >
            Delete this automation?
          </h2>
        </div>

        <div className="px-6 py-5">
          <p className="text-sm leading-relaxed text-ink-2">
            &ldquo;{title}&rdquo; and its description will be removed from your
            account. This cannot be undone.
          </p>
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
            onClick={close}
            disabled={pending}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="danger"
            size="sm"
            onClick={handleDelete}
            disabled={pending}
          >
            {pending ? "Deleting..." : "Delete automation"}
          </Button>
        </div>
      </dialog>
    </>
  );
}
