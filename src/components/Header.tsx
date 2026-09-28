import Link from "next/link";
import { siteConfig } from "@/lib/site";

const nav = [
  { href: "/#wedge", label: "Product" },
  { href: "/#reply-radar", label: "Reply Radar" },
  { href: "/blog", label: "Blog" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-rule/80 bg-canvas/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="font-mono text-sm tracking-tight text-ink">
          {siteConfig.name}
          <span className="text-ink-faint">.</span>
        </Link>
        <nav className="hidden items-center gap-7 sm:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-ink-muted transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href={siteConfig.cta.href}
          className="rounded-md bg-accent px-3.5 py-1.5 text-sm font-medium text-white transition-transform hover:bg-accent-hover active:scale-[0.98]"
        >
          {siteConfig.cta.label}
        </Link>
      </div>
    </header>
  );
}
