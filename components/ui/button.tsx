import { type ButtonHTMLAttributes } from "react";

export function Button({
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-lg bg-slate-100 px-5 py-2.5 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400 disabled:pointer-events-none disabled:opacity-50 ${className}`}
      {...props}
    />
  );
}

export function ButtonPrimary({
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-lg bg-indigo-500 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400 disabled:pointer-events-none disabled:opacity-50 ${className}`}
      {...props}
    />
  );
}
