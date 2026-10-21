"use client";

import { useActionState } from "react";
import { Loader2 } from "lucide-react";
import { signUp } from "@/lib/auth-actions";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { FieldMessage, Input, Label } from "@/components/ui/input";

export function SignUpForm({ next }: { next?: string }) {
  const [state, action, pending] = useActionState(signUp, {});

  return (
    <form action={action} className="space-y-5">
      {next && <input type="hidden" name="next" value={next} />}

      {state?.error && <Alert tone="danger">{state.error}</Alert>}

      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Jane Smith"
          autoComplete="name"
          aria-describedby="name-helper"
        />
        <FieldMessage id="name-helper">
          Optional. Used to greet you.
        </FieldMessage>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="you@company.com"
          required
          autoComplete="email"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="At least 8 characters"
          required
          minLength={8}
          autoComplete="new-password"
          aria-describedby="password-helper"
        />
        <FieldMessage id="password-helper">
          At least 8 characters.
        </FieldMessage>
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={pending}>
        {pending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Creating account...
          </>
        ) : (
          "Create account"
        )}
      </Button>
    </form>
  );
}
