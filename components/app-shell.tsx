"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowUp,
  BookOpen,
  FolderOpen,
  LogOut,
  Menu,
  Plus,
  Settings,
  X,
} from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { Meter } from "@/components/ui/meter";
import { ButtonLink } from "@/components/ui/button";
import { signOut } from "@/lib/auth-actions";
import { MAX_AUTOMATIONS } from "@/lib/automation-config";
import { cn, initials } from "@/lib/utils";

type ShellUser = {
  email: string;
  name: string | null;
};

const NAV = [
  { href: "/dashboard", label: "Automations", icon: FolderOpen },
  { href: "/dashboard/examples", label: "Templates", icon: BookOpen },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

function isActive(pathname: string, href: string) {
  if (href === "/dashboard") {
    return (
      pathname === "/dashboard" || pathname.startsWith("/dashboard/automations")
    );
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

function SidebarContent({
  user,
  count,
  pathname,
  onNavigate,
}: {
  user: ShellUser;
  count: number;
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <>
      <nav className="flex-1 overflow-y-auto px-3 py-5" aria-label="Primary">
        {pathname !== "/dashboard/create" && (
          <div className="mb-5">
            <ButtonLink
              href="/dashboard/create"
              size="md"
              className="w-full"
              onClick={onNavigate}
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
              New automation
            </ButtonLink>
          </div>
        )}

        <div className="space-y-0.5">
          {NAV.map((item) => {
            const active = isActive(pathname, item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "group relative flex items-center gap-3 rounded-sm px-3 py-2.5 text-[13px] transition-colors",
                  active
                    ? "bg-paper/10 text-paper"
                    : "text-muted-on-ink hover:bg-paper/5 hover:text-paper",
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 bg-rust-on-ink transition-opacity",
                    active ? "opacity-100" : "opacity-0",
                  )}
                />
                <Icon
                  className={cn(
                    "h-[18px] w-[18px] shrink-0",
                    active
                      ? "text-rust-on-ink"
                      : "text-muted-on-ink group-hover:text-paper",
                  )}
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                <span className="flex-1">{item.label}</span>
                {item.href === "/dashboard" && (
                  <span className="font-mono text-[10px] text-muted-on-ink">
                    {count}/{MAX_AUTOMATIONS}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="border-t border-line-on-ink p-4">
        <div className="border border-line-on-ink p-3">
          <div className="flex items-center justify-between gap-3">
            <p className="label-mono text-muted-on-ink">Free plan</p>
            <p className="font-mono text-[10px] text-paper">
              {count}/{MAX_AUTOMATIONS}
            </p>
          </div>
          <Meter
            value={Math.min(count, MAX_AUTOMATIONS)}
            max={MAX_AUTOMATIONS}
            inverse
            className="mt-2"
            label={`${count} of ${MAX_AUTOMATIONS} automations saved`}
          />
          <p className="mt-2 text-[11px] leading-relaxed text-muted-on-ink">
            Saved automations
          </p>
        </div>

        <div className="mt-4 flex items-center gap-2.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line-on-ink bg-paper/10 font-mono text-[10px] text-paper">
            {initials(user.name, user.email)}
          </span>
          <Link
            href="/dashboard/settings"
            onClick={onNavigate}
            className="min-w-0 flex-1"
          >
            <p className="truncate text-[12px] font-medium text-paper transition-colors hover:text-rust-on-ink">
              {user.name || "Your account"}
            </p>
            <p className="truncate font-mono text-[9px] text-muted-on-ink">
              {user.email}
            </p>
          </Link>
          <form action={signOut}>
            <button
              type="submit"
              aria-label="Sign out"
              className="flex h-8 w-8 items-center justify-center rounded-sm text-muted-on-ink transition-colors hover:bg-paper/10 hover:text-paper"
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />
            </button>
          </form>
        </div>

        <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.12em] text-muted-on-ink">
          v1.0 / Early access
        </p>
      </div>
    </>
  );
}

export function AppShell({
  user,
  automationCount,
  children,
}: {
  user: ShellUser;
  automationCount: number;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const menuRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (menuRef.current?.open) menuRef.current.close();
  }, [pathname]);

  function openMenu() {
    if (!menuRef.current?.open) menuRef.current?.showModal();
  }

  function closeMenu() {
    menuRef.current?.close();
  }

  return (
    <div className="min-h-screen bg-paper text-ink">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-line-on-ink bg-ink text-paper lg:flex">
        <div className="flex h-16 shrink-0 items-center border-b border-line-on-ink px-5">
          <Logo href="/dashboard" tone="paper" />
        </div>
        <SidebarContent
          user={user}
          count={automationCount}
          pathname={pathname}
        />
      </aside>

      <div className="lg:pl-64">
        <div className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-line bg-paper px-4 lg:hidden">
          <Logo />
          <div className="flex items-center gap-2">
            <ButtonLink
              href="/dashboard/create"
              size="icon"
              aria-label="New automation"
              className="h-10 w-10"
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
            <button
              type="button"
              onClick={openMenu}
              aria-label="Open navigation"
              aria-haspopup="dialog"
              className="flex h-10 w-10 items-center justify-center rounded-sm border border-line-strong text-ink transition-colors hover:bg-paper-2"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <main id="main" className="min-w-0">
          <div className="mx-auto w-full max-w-[1200px] px-5 py-8 sm:px-8 sm:py-10">
            {children}
          </div>

          <div className="mx-auto w-full max-w-[1200px] px-5 pb-8 sm:px-8">
            <div className="flex flex-col gap-2 border-t border-line pt-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted">
                VibeOps / Automation planning
              </p>
              <div className="flex items-center gap-4">
                <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted">
                  &copy; 2026
                </p>
                <a
                  href="#main"
                  className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-muted transition-colors hover:text-ink"
                >
                  Back to top
                  <ArrowUp className="h-3 w-3" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>

      <dialog
        ref={menuRef}
        aria-label="Navigation"
        onClick={(event) => {
          if (event.target === menuRef.current) closeMenu();
        }}
        className="fixed inset-y-0 right-0 left-auto m-0 h-dvh w-[min(88vw,360px)] max-w-none animate-slide-in-right rounded-none border-0 border-l border-line-on-ink bg-ink p-0 text-paper shadow-lift lg:hidden"
      >
        <div className="flex h-full flex-col">
          <div className="flex h-14 shrink-0 items-center justify-between border-b border-line-on-ink px-4">
            <Logo href="/dashboard" tone="paper" />
            <button
              type="button"
              onClick={closeMenu}
              aria-label="Close navigation"
              className="flex h-9 w-9 items-center justify-center rounded-sm text-muted-on-ink transition-colors hover:bg-paper/10 hover:text-paper"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <SidebarContent
            user={user}
            count={automationCount}
            pathname={pathname}
            onNavigate={closeMenu}
          />
        </div>
      </dialog>
    </div>
  );
}
