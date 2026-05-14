"use client";

import { useActionState } from "react";
import { signIn } from "@/lib/auth-actions";
import { ButtonPrimary } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";

export function SignInForm() {
  const [state, action, pending] = useActionState(signIn, {});

  return (
    <form action={action} className="space-y-4">
      {state?.error && (
        <p className="rounded-lg border border-red-800 bg-red-950/50 px-4 py-2.5 text-sm text-red-400">
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
          placeholder="••••••••"
          required
          autoComplete="current-password"
        />
      </div>
      <ButtonPrimary type="submit" className="w-full" disabled={pending}>
        {pending ? "Signing in..." : "Sign in"}
      </ButtonPrimary>
    </form>
  );
}
