import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-full flex-col items-center justify-center px-6 py-12">
      <Link
        href="/"
        className="mb-10 text-lg font-semibold tracking-tight text-slate-100"
      >
        VibeOps
      </Link>
      <div className="w-full max-w-sm space-y-6">{children}</div>
    </div>
  );
}
