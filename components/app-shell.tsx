"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowUp,
  ArrowUpRight,
  BookOpen,
  FolderOpen,
  LayoutDashboard,
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
import { cn, initials } from "@/lib/utils";

type ShellUser = {
  email: string;
  name: string | null;
  workflowCount: number;
};

const NAV_GROUPS = [
  {
    label: "Workspace",
    items: [
      { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { href: "/dashboard/create", label: "New automation", icon: Plus },
      { href: "/dashboard/automations", label: "Library", icon: FolderOpen },
    ],
  },
  {
    label: "Reference",
    items: [
      { href: "/dashboard/examples", label: "Field notes", icon: BookOpen },
      { href: "/dashboard/settings", label: "Settings", icon: Settings },
    ],
  },
];

function isActive(pathname: string, href: string) {
  if (href === "/dashboard") return pathname === "/dashboard";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function sectionLabel(pathname: string) {
  if (pathname.startsWith("/dashboard/automations/")) return "Library / Plan";
  if (pathname.startsWith("/dashboard/automations")) return "Library";
  if (pathname.startsWith("/dashboard/create")) return "New automation";
  if (pathname.startsWith("/dashboard/examples")) return "Field notes";
  if (pathname.startsWith("/dashboard/settings")) return "Settings";
  return "Operations desk";
}

function SidebarContent({
  user,
  pathname,
  onNavigate,
}: {
  user: ShellUser;
  pathname: string;
  onNavigate?: () => void;
}) {
  const count = user.workflowCount;

  return (
    <>
      <nav className="flex-1 overflow-y-auto px-3 py-5" aria-label="Primary">
        {NAV_GROUPS.map((group) => (
          <div key={group.label} className="mb-6 last:mb-0">
            <p className="label-mono px-3 text-muted-on-ink">{group.label}</p>
            <div className="mt-2 space-y-0.5">
              {group.items.map((item) => {
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
                    {item.href === "/dashboard/automations" && (
                      <span className="font-mono text-[10px] text-muted-on-ink">
                        {count}/3
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-line-on-ink p-4">
        <div className="border border-line-on-ink p-3">
          <div className="flex items-center justify-between gap-3">
            <p className="label-mono text-muted-on-ink">Plan usage</p>
            <p className="font-mono text-[10px] text-paper">{count}/3</p>
          </div>
          <Meter
            value={Math.min(count, 3)}
            inverse
            className="mt-2"
            label={`${count} of 3 plans saved`}
          />
          <Link
            href="/dashboard/automations"
            onClick={onNavigate}
            className="mt-3 flex items-center justify-between text-[11px] text-muted-on-ink transition-colors hover:text-paper"
          >
            <span>Open library</span>
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-4 flex items-center gap-2.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line-on-ink bg-paper/10 font-mono text-[10px] text-paper">
            {initials(user.name, user.email)}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[12px] font-medium text-paper">
              {user.name || "Your account"}
            </p>
            <p className="truncate font-mono text-[9px] text-muted-on-ink">
              {user.email}
            </p>
          </div>
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
  children,
}: {
  user: ShellUser;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const menuRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (menuRef.current?.open) menuRef.current.close();
  }, [pathname]);

  function openMenu() {
    document.documentElement.style.overflow = "hidden";
    if (!menuRef.current?.open) menuRef.current?.showModal();
  }

  function closeMenu() {
    menuRef.current?.close();
  }

  function handleMenuClose() {
    document.documentElement.style.overflow = "";
  }

  return (
    <div className="min-h-screen bg-paper text-ink">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-line-on-ink bg-ink text-paper lg:flex">
        <div className="flex h-16 shrink-0 items-center border-b border-line-on-ink px-5">
          <Logo href="/dashboard" tone="paper" />
        </div>
        <SidebarContent user={user} pathname={pathname} />
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

        <div className="sticky top-0 z-20 hidden h-14 items-center justify-between border-b border-line bg-paper px-8 lg:flex">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.1em]">
            <span className="text-muted">VibeOps</span>
            <span className="text-line-strong" aria-hidden="true">
              /
            </span>
            <span className="text-ink-2">{sectionLabel(pathname)}</span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/dashboard/examples"
              className="text-[12px] text-muted transition-colors hover:text-ink"
            >
              Field notes
            </Link>
            {pathname !== "/dashboard/create" && (
              <ButtonLink href="/dashboard/create" size="sm">
                <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                New automation
              </ButtonLink>
            )}
          </div>
        </div>

        <main id="main" className="min-w-0">
          <div className="mx-auto w-full max-w-[1200px] px-5 py-8 sm:px-8 sm:py-10">
            {children}
          </div>

          <div className="mx-auto w-full max-w-[1200px] px-5 pb-8 sm:px-8">
            <div className="flex flex-col gap-2 border-t border-line pt-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted">
                VibeOps / Operations automation
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
        onClose={handleMenuClose}
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
            pathname={pathname}
            onNavigate={closeMenu}
          />
        </div>
      </dialog>
    </div>
  );
}
