"use client";

import { useActionState } from "react";
import { signUp } from "@/lib/auth-actions";
import { ButtonPrimary } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";

export function SignUpForm() {
  const [state, action, pending] = useActionState(signUp, {});

  return (
    <form action={action} className="space-y-4">
      {state?.error && (
        <p className="rounded-lg border border-red-800 bg-red-950/50 px-4 py-2.5 text-sm text-red-400">
          {state.error}
        </p>
      )}
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Jane Smith"
          autoComplete="name"
        />
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
          placeholder="Min. 8 characters"
          required
          minLength={8}
          autoComplete="new-password"
        />
      </div>
      <ButtonPrimary type="submit" className="w-full" disabled={pending}>
        {pending ? "Creating account..." : "Create account"}
      </ButtonPrimary>
    </form>
  );
}
