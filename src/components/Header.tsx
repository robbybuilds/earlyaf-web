import Link from "next/link";
import { siteConfig } from "@/lib/site";

const nav = [
  { href: "/#wedge", label: "Product" },
  { href: "/#reply-radar", label: "Reply Radar" },
  { href: "/blog", label: "Blog" },
];

const ctaBase =
  "min-h-11 items-center justify-center rounded-md bg-accent px-3.5 py-2 text-xs font-medium leading-snug text-white transition-colors hover:bg-accent-hover active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink sm:px-4 sm:text-sm";

const navLinkClassName =
  "inline-flex min-h-11 items-center px-1 text-sm text-ink-muted transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-rule/80 bg-canvas/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl flex-col gap-1 px-5 py-2 sm:h-14 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-8 sm:py-0">
        <div className="flex min-h-11 items-center justify-between gap-3 sm:min-h-0 sm:justify-start">
          <Link
            href="/"
            className="inline-flex min-h-11 shrink-0 items-center font-mono text-sm tracking-tight text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            {siteConfig.name}
            <span className="text-ink-faint">.</span>
          </Link>
          <Link
            href={siteConfig.cta.href}
            className={`inline-flex max-w-[min(100%,14.5rem)] text-center sm:hidden ${ctaBase}`}
          >
            {siteConfig.cta.label}
          </Link>
        </div>

        <nav
          aria-label="Primary"
          className="flex flex-wrap items-center gap-x-4 gap-y-0 sm:flex-nowrap sm:gap-x-6"
        >
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className={navLinkClassName}>
              {item.label}
            </Link>
          ))}
          <Link
            href={siteConfig.cta.href}
            className={`ml-auto hidden sm:inline-flex ${ctaBase}`}
          >
            {siteConfig.cta.label}
          </Link>
        </nav>
      </div>
    </header>
  );
}
