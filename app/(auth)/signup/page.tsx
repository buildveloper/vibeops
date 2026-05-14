import Link from "next/link";
import { SignUpForm } from "@/components/signup-form";

export default function SignUpPage() {
  return (
    <>
      <div className="space-y-2 text-center">
        <h2 className="text-xl font-semibold text-slate-100">
          Create your account
        </h2>
        <p className="text-sm text-slate-400">
          Start automating your operations today.
        </p>
      </div>

      <SignUpForm />

      <p className="text-center text-sm text-slate-500">
        Already have an account?{" "}
        <Link
          href="/signin"
          className="font-medium text-indigo-400 hover:text-indigo-300"
        >
          Sign in
        </Link>
      </p>
    </>
  );
}
