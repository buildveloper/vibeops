"use client";

import { useActionState } from "react";
import { Loader2 } from "lucide-react";
import { updateName } from "@/lib/settings-actions";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { FieldMessage, Input, Label } from "@/components/ui/input";

export function SettingsForm({ initialName }: { initialName: string }) {
  const [state, action, pending] = useActionState(updateName, {});

  return (
    <form action={action} className="mt-5 space-y-4">
      {state?.error && <Alert tone="danger">{state.error}</Alert>}

      {state?.success && <Alert tone="success">Name updated.</Alert>}

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
          Used to greet you. Leave it empty to remove it.
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
