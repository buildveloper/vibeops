import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { LogoMark } from "@/components/ui/logo";

const NAV_LINKS = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#templates", label: "Templates" },
  { href: "#questions", label: "Questions" },
];

export function SiteFooter({ signedIn = false }: { signedIn?: boolean }) {
  const productLinks = signedIn
    ? NAV_LINKS
    : [...NAV_LINKS, { href: "/signup", label: "Start free" }];

  const accountLinks = signedIn
    ? [
        { href: "/dashboard", label: "Your automations" },
        { href: "/dashboard/settings", label: "Settings" },
      ]
    : [
        { href: "/signin", label: "Sign in" },
        { href: "/signup", label: "Create account" },
      ];

  return (
    <footer className="border-t border-line-on-ink bg-ink text-paper">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="flex items-center justify-between border-b border-line-on-ink py-5">
          <p className="label-mono text-muted-on-ink">
            Automation planning for small business
          </p>
          <p className="label-mono text-muted-on-ink">Est. 2026</p>
        </div>

        <div className="py-10 sm:py-14">
          <div className="flex items-start gap-3">
            <LogoMark className="mt-2 h-7 w-7 text-rust-on-ink sm:mt-3 sm:h-9 sm:w-9" />
            <p className="font-display text-[clamp(3.5rem,11vw,9rem)] leading-[0.78] tracking-[-0.06em] text-paper">
              VibeOps
            </p>
          </div>
        </div>

        <div className="grid gap-10 border-t border-line-on-ink py-10 sm:grid-cols-12">
          <div className="sm:col-span-6">
            <p className="max-w-sm text-sm leading-relaxed text-muted-on-ink">
              Describe the work. We&apos;ll build the machine. A clear
              automation for the processes that keep your business moving.
            </p>
          </div>

          <div className="sm:col-span-3">
            <p className="label-mono text-muted-on-ink">Product</p>
            <ul className="mt-4 space-y-2.5">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-paper/80 transition-colors hover:text-paper"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="sm:col-span-3">
            <p className="label-mono text-muted-on-ink">Account</p>
            <ul className="mt-4 space-y-2.5">
              {accountLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-paper/80 transition-colors hover:text-paper"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <p className="label-mono mt-8 text-muted-on-ink">Built by</p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href="https://buildveloper.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1 text-[13px] text-paper/80 transition-colors hover:text-paper"
                >
                  Christopher John
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/shigusna"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] text-paper/80 transition-colors hover:text-paper"
                >
                  @shigusna
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-line-on-ink py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-on-ink">
            &copy; 2026 VibeOps
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-on-ink">
            Templates are illustrative examples, not customer results.
          </p>
        </div>
      </div>
    </footer>
  );
}
