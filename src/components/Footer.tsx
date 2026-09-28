import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-rule bg-surface">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-5 py-12 sm:px-8 sm:flex-row sm:justify-between">
        <div>
          <p className="font-mono text-sm text-ink">
            {siteConfig.name}
            <span className="text-ink-faint">.</span>
          </p>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink-muted">
            Research and reply tools for solo app builders. North star: a listening hub for the markets you sell into.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-10 gap-y-6 text-sm">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs uppercase tracking-wider text-ink-faint">Product</span>
            <Link href="/#wedge" className="text-ink-muted hover:text-ink">
              Wedge
            </Link>
            <Link href="/#reply-radar" className="text-ink-muted hover:text-ink">
              Reply Radar
            </Link>
            <a
              href={siteConfig.links.replyRadar}
              className="text-ink-muted hover:text-ink"
              rel="noopener noreferrer"
              target="_blank"
            >
              Extension repo
            </a>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs uppercase tracking-wider text-ink-faint">Site</span>
            <Link href="/blog" className="text-ink-muted hover:text-ink">
              Blog
            </Link>
            <Link href="/privacy" className="text-ink-muted hover:text-ink">
              Privacy
            </Link>
            <Link href="/terms" className="text-ink-muted hover:text-ink">
              Terms
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-rule">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4 sm:px-8">
          <p className="text-xs text-ink-faint">
            © {new Date().getFullYear()} {siteConfig.legalName}
          </p>
          <p className="text-xs text-ink-faint">Built for founders who ship.</p>
        </div>
      </div>
    </footer>
  );
}
