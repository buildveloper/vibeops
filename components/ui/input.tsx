import type {
  InputHTMLAttributes,
  LabelHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
} from "react";
import { cn } from "@/lib/utils";

const fieldBase =
  "w-full rounded-sm border border-input-line bg-paper text-ink placeholder:text-muted/70 transition-[border-color,box-shadow] duration-150 focus:border-rust focus:outline-none focus:ring-2 focus:ring-rust/20 disabled:cursor-not-allowed disabled:bg-paper-2 disabled:text-muted";

export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        fieldBase,
        "h-12 px-3.5 text-[16px] sm:text-[15px]",
        className,
      )}
      {...props}
    />
  );
}

export function Textarea({
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        fieldBase,
        "min-h-[180px] resize-y px-3.5 py-3 text-[16px] leading-relaxed sm:text-[15px]",
        className,
      )}
      {...props}
    />
  );
}

export function Label({
  className,
  ...props
}: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn("block text-[13px] font-medium text-ink", className)}
      {...props}
    />
  );
}

export function FieldMessage({
  children,
  tone = "muted",
  className,
  id,
}: {
  children: ReactNode;
  tone?: "muted" | "danger" | "success";
  className?: string;
  id?: string;
}) {
  return (
    <p
      id={id}
      className={cn(
        "text-[12px] leading-relaxed",
        tone === "muted" && "text-muted",
        tone === "danger" && "text-danger",
        tone === "success" && "text-pine",
        className,
      )}
    >
      {children}
    </p>
  );
}
