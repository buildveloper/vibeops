import type { ComponentProps, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "danger"
  | "dangerGhost"
  | "ink"
  | "paper"
  | "ghostDark";

export type ButtonSize = "sm" | "md" | "lg" | "icon";

const base =
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-sm border font-medium transition-[background-color,border-color,color,transform] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rust focus-visible:ring-offset-2 focus-visible:ring-offset-paper disabled:pointer-events-none disabled:opacity-45 active:translate-y-px";

const variants: Record<ButtonVariant, string> = {
  primary:
    "border-rust bg-rust text-paper hover:border-rust-deep hover:bg-rust-deep",
  secondary:
    "border-line-strong bg-paper text-ink hover:border-ink hover:bg-paper-2",
  ghost:
    "border-transparent bg-transparent text-ink-2 hover:bg-paper-2 hover:text-ink",
  danger:
    "border-danger bg-danger text-paper hover:border-danger/90 hover:bg-danger/90",
  dangerGhost:
    "border-transparent bg-transparent text-muted hover:bg-danger-wash hover:text-danger",
  ink: "border-ink bg-ink text-paper hover:border-ink-2 hover:bg-ink-2",
  paper:
    "border-paper bg-paper text-ink hover:border-paper-2 hover:bg-paper-2",
  ghostDark:
    "border-transparent bg-transparent text-paper/80 hover:bg-paper/10 hover:text-paper",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-[13px]",
  md: "h-11 px-4 text-sm",
  lg: "h-12 px-6 text-[15px]",
  icon: "h-10 w-10 p-0",
};

export function buttonClasses({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}) {
  return cn(base, variants[variant], sizes[size], className);
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  type = "button",
  ...props
}: ComponentProps<"button"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
}) {
  return (
    <button
      type={type}
      className={buttonClasses({ variant, size, className })}
      {...props}
    />
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ComponentProps<typeof Link> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}) {
  return (
    <Link className={buttonClasses({ variant, size, className })} {...props}>
      {children}
    </Link>
  );
}
