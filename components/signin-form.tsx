"use client";

import { useActionState } from "react";
import { CircleAlert, Loader2 } from "lucide-react";
import { signIn } from "@/lib/auth-actions";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";

export function SignInForm() {
  const [state, action, pending] = useActionState(signIn, {});

  return (
    <form action={action} className="space-y-5">
      {state?.error && (
        <p
          role="alert"
          className="flex items-start gap-2 border border-danger/30 bg-danger-wash px-3.5 py-3 text-[13px] leading-relaxed text-danger"
        >
          <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {state.error}
        </p>
      )}

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
          placeholder="Your password"
          required
          autoComplete="current-password"
        />
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={pending}>
        {pending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Signing in...
          </>
        ) : (
          "Sign in"
        )}
      </Button>
    </form>
  );
}
