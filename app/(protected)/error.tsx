"use client";

import { useEffect } from "react";
import { RotateCcw } from "lucide-react";
import { Button, ButtonLink } from "@/components/ui/button";

export default function ProtectedError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="py-10">
      <p className="label-mono text-rust-deep">Something went wrong</p>
      <h1 className="mt-4 max-w-2xl font-display text-[38px] leading-[1.02] tracking-[-0.035em] text-ink sm:text-[46px]">
        This page couldn&apos;t load.
      </h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
        Try again. Your saved automations are safe.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button onClick={reset} size="md">
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Try again
        </Button>
        <ButtonLink href="/dashboard" variant="secondary" size="md">
          Your automations
        </ButtonLink>
      </div>
      {error.digest && (
        <p className="mt-6 font-mono text-[9px] uppercase tracking-[0.12em] text-muted">
          Reference {error.digest}
        </p>
      )}
    </div>
  );
}
