import Link from "next/link";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={cn("h-6 w-6", className)}
      aria-hidden="true"
    >
      <path
        d="M5 5.5 12 18.5 19 5.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
      <rect x="2.75" y="3.25" width="4.5" height="4.5" rx="1" fill="currentColor" />
      <rect x="16.75" y="3.25" width="4.5" height="4.5" rx="1" fill="currentColor" />
      <rect x="9.75" y="16.25" width="4.5" height="4.5" rx="1" fill="currentColor" />
    </svg>
  );
}

export function Logo({
  href = "/",
  tone = "ink",
  compact = false,
  className,
}: {
  href?: string | null;
  tone?: "ink" | "paper";
  compact?: boolean;
  className?: string;
}) {
  const content = (
    <span className="inline-flex items-center gap-2.5">
      <LogoMark className={tone === "paper" ? "text-paper" : "text-ink"} />
      {!compact && (
        <span
          className={cn(
            "text-[17px] font-semibold tracking-[-0.03em]",
            tone === "paper" ? "text-paper" : "text-ink",
          )}
        >
          VibeOps
        </span>
      )}
    </span>
  );

  if (!href) {
    return <span className={className}>{content}</span>;
  }

  return (
    <Link
      href={href}
      aria-label="VibeOps home"
      className={cn("inline-flex w-fit items-center", className)}
    >
      {content}
    </Link>
  );
}
