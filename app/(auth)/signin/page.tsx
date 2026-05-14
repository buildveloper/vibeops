import Link from "next/link";
import { SignInForm } from "@/components/signin-form";

export default function SignInPage() {
  return (
    <>
      <div className="space-y-2 text-center">
        <h2 className="text-xl font-semibold text-slate-100">Welcome back</h2>
        <p className="text-sm text-slate-400">
          Sign in to your VibeOps account.
        </p>
      </div>

      <SignInForm />

      <p className="text-center text-sm text-slate-500">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="font-medium text-indigo-400 hover:text-indigo-300"
        >
          Sign up
        </Link>
      </p>
    </>
  );
}
