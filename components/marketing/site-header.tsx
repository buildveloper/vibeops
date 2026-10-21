"use client";

import { useRef } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { ButtonLink } from "@/components/ui/button";

const NAV = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#field-notes", label: "Field notes" },
  { href: "#questions", label: "Questions" },
];

export function SiteHeader() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  function openMenu() {
    document.documentElement.style.overflow = "hidden";
    if (!dialogRef.current?.open) dialogRef.current?.showModal();
  }

  function closeMenu() {
    dialogRef.current?.close();
  }

  function handleClose() {
    document.documentElement.style.overflow = "";
  }

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper">
      <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between px-5 sm:px-8">
        <Logo />

        <nav className="hidden items-center gap-7 md:flex" aria-label="Main">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[13px] text-ink-2 transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          <Link
            href="/signin"
            className="text-[13px] text-ink-2 transition-colors hover:text-ink"
          >
            Sign in
          </Link>
          <ButtonLink href="/signup" size="sm">
            Start free
          </ButtonLink>
        </div>

        <button
          type="button"
          onClick={openMenu}
          aria-label="Open menu"
          aria-haspopup="dialog"
          className="flex h-10 w-10 items-center justify-center rounded-sm border border-line-strong text-ink transition-colors hover:bg-paper-2 md:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      <dialog
        ref={dialogRef}
        aria-label="Site menu"
        onClose={handleClose}
        onClick={(event) => {
          if (event.target === dialogRef.current) closeMenu();
        }}
        className="dialog-drawer fixed inset-y-0 right-0 left-auto m-0 h-dvh w-[min(88vw,360px)] max-w-none animate-slide-in-right rounded-none border-0 border-l border-line bg-paper p-0 text-ink shadow-lift md:hidden"
      >
        <div className="flex h-full flex-col">
          <div className="flex h-[72px] items-center justify-between border-b border-line px-5">
            <Logo />
            <button
              type="button"
              onClick={closeMenu}
              aria-label="Close menu"
              className="flex h-10 w-10 items-center justify-center rounded-sm border border-line-strong text-ink transition-colors hover:bg-paper-2"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex flex-1 flex-col px-5 py-6" aria-label="Mobile">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="border-b border-line py-4 font-display text-[28px] leading-none tracking-[-0.02em] text-ink"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/signin"
              onClick={closeMenu}
              className="border-b border-line py-4 font-display text-[28px] leading-none tracking-[-0.02em] text-ink"
            >
              Sign in
            </Link>
          </nav>

          <div className="border-t border-line p-5">
            <ButtonLink href="/signup" className="w-full" onClick={closeMenu}>
              Start free
            </ButtonLink>
            <p className="label-mono mt-4 text-muted">
              Three plans free / No card
            </p>
          </div>
        </div>
      </dialog>
    </header>
  );
}
