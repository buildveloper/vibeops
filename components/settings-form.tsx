"use client";

import { useActionState } from "react";
import { CircleAlert, CircleCheck, Loader2 } from "lucide-react";
import { updateName } from "@/lib/settings-actions";
import { Button } from "@/components/ui/button";
import { FieldMessage, Input, Label } from "@/components/ui/input";

export function SettingsForm({ initialName }: { initialName: string }) {
  const [state, action, pending] = useActionState(updateName, {});

  return (
    <form action={action} className="mt-5 space-y-4">
      {state?.error && (
        <p
          role="alert"
          className="flex items-start gap-2 border border-danger/30 bg-danger-wash px-3.5 py-3 text-[13px] leading-relaxed text-danger"
        >
          <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {state.error}
        </p>
      )}

      {state?.success && (
        <p
          role="status"
          className="flex items-start gap-2 border border-pine/25 bg-pine-wash px-3.5 py-3 text-[13px] leading-relaxed text-pine"
        >
          <CircleCheck className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          Name updated.
        </p>
      )}

      <div className="max-w-md space-y-2">
        <Label htmlFor="name">Display name</Label>
        <Input
          id="name"
          name="name"
          defaultValue={initialName}
          maxLength={80}
          autoComplete="name"
          placeholder="Jane Smith"
          aria-describedby="name-settings-helper"
        />
        <FieldMessage id="name-settings-helper">
          Used on your dashboard greeting. Leave it empty to remove it.
        </FieldMessage>
      </div>

      <Button type="submit" size="md" disabled={pending}>
        {pending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Saving...
          </>
        ) : (
          "Save name"
        )}
      </Button>
    </form>
  );
}
