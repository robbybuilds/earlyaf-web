import Link from "next/link";
import { WaitlistForm } from "@/components/WaitlistForm";
import { siteConfig } from "@/lib/site";

const footerLinkClassName =
  "inline-flex min-h-11 items-center text-ink-muted hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

export function Footer() {
  return (
    <footer className="border-t border-rule bg-surface">
      <div className="mx-auto flex max-w-5xl flex-col gap-10 px-5 py-12 sm:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          <div>
            <p className="font-mono text-sm text-ink">
              {siteConfig.name}
              <span className="text-ink-faint">.</span>
            </p>
            <p className="mt-2 max-w-xs text-base leading-relaxed text-ink-muted">
              Research and reply tools for solo app builders. North star: a listening hub for the markets you sell into.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-10 gap-y-6 text-sm">
            <div className="flex flex-col gap-1">
              <span className="font-mono text-xs uppercase tracking-wider text-ink-faint">Product</span>
              <Link href="/#wedge" className={footerLinkClassName}>
                Wedge
              </Link>
              <Link href="/#reply-radar" className={footerLinkClassName}>
                Reply Radar
              </Link>
              <a
                href={siteConfig.links.replyRadar}
                className={footerLinkClassName}
                rel="noopener noreferrer"
                target="_blank"
              >
                Extension repo
              </a>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-mono text-xs uppercase tracking-wider text-ink-faint">Site</span>
              <Link href="/blog" className={footerLinkClassName}>
                Blog
              </Link>
              <Link href="/privacy" className={footerLinkClassName}>
                Privacy
              </Link>
              <Link href="/terms" className={footerLinkClassName}>
                Terms
              </Link>
            </div>
          </div>
        </div>
        <div className="max-w-md">
          <WaitlistForm variant="compact" source="earlyaf-web-footer" />
        </div>
      </div>
      <div className="border-t border-rule">
        <div className="mx-auto flex max-w-5xl flex-col gap-1 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p className="text-xs text-ink-faint">
            © {new Date().getFullYear()} {siteConfig.legalName}
          </p>
          <p className="text-xs text-ink-faint">Built for founders who ship.</p>
        </div>
      </div>
    </footer>
  );
}
