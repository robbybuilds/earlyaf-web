import Link from "next/link";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `${siteConfig.name}. — research & reply for solo app builders`,
  alternates: { canonical: "/" },
};

const wedge = [
  {
    id: "daily-idea",
    label: "01",
    title: "Free daily idea",
    body: "A reviewed opportunity you can actually investigate. Built for solo founders who need a realistic starting point, not a dump of trending keywords.",
  },
  {
    id: "reply-radar",
    label: "02",
    title: "Reply Radar",
    body: "Chrome extension that listens on Reddit and X, scores posts for your ICP, and queues the ones worth a manual reply. No auto-send. No outreach blasts.",
  },
  {
    id: "first-experiment",
    label: "03",
    title: "Research → first experiment",
    body: "Turn market evidence into a decision: what to build, who to serve, and how to run one concrete marketing experiment.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-rule">
        <div className="mx-auto max-w-5xl px-5 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-24">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-ink-faint">
            For solo app builders
          </p>
          <h1 className="mt-5 max-w-3xl font-serif text-[2rem] leading-[1.15] tracking-[-0.02em] text-ink sm:text-5xl md:text-[3.25rem]">
            Find ideas your audience already asks for. Reply where it counts.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">
            {siteConfig.name} helps you pick a realistic opportunity, see who needs it, and show up in conversations worth answering yourself.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href={siteConfig.cta.href}
              className="inline-flex min-h-11 items-center justify-center rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              {siteConfig.cta.label}
            </a>
            <a
              href={siteConfig.links.replyRadar}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center rounded-md border border-rule bg-surface px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-ink/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              Get Reply Radar
            </a>
          </div>
          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-ink-faint">
            Where we&apos;re going: a listening hub for the B2B and B2C markets builders sell into. What you get today is the wedge below.
          </p>
        </div>
      </section>

      {/* Wedge */}
      <section id="wedge" className="border-b border-rule scroll-mt-16">
        <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-24">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-ink-faint">
            The wedge
          </p>
          <h2 className="mt-3 max-w-2xl font-serif text-3xl tracking-[-0.02em] text-ink sm:text-4xl">
            Three things that fit a solo builder&apos;s week
          </h2>
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {wedge.map((item) => (
              <article
                key={item.id}
                id={item.id === "reply-radar" ? undefined : item.id}
                className="rounded-xl border border-rule bg-surface p-6 sm:p-7"
              >
                <span className="font-mono text-xs text-ink-faint">{item.label}</span>
                <h3 className="mt-3 text-lg font-medium text-ink">{item.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-ink-muted">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Reply Radar detail */}
      <section id="reply-radar" className="border-b border-rule bg-surface scroll-mt-16">
        <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-ink-faint">
                Reply Radar
              </p>
              <h2 className="mt-3 font-serif text-3xl tracking-[-0.02em] text-ink sm:text-4xl">
                A local queue of posts worth your time
              </h2>
              <p className="mt-5 text-base leading-relaxed text-ink-muted">
                Reply Radar polls public Reddit (and optional X), scores each post for ICP fit, ask specificity, and freshness, then keeps a ranked queue in your browser. You open the URL and reply yourself.
              </p>
              <ul className="mt-8 space-y-3 text-base text-ink-muted">
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink" />
                  Listen on founder-heavy subs by default
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink" />
                  Score for people you can actually help
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink" />
                  Queue locally — dismiss or open when ready
                </li>
              </ul>
              <a
                href={siteConfig.links.replyRadar}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex min-h-11 items-center justify-center rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                Extension on GitHub
              </a>
            </div>
            <div className="rounded-xl border border-rule bg-canvas p-6 sm:p-8">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-ink-faint">
                Honest limits
              </p>
              <div className="mt-5 space-y-4 text-base leading-relaxed text-ink-muted">
                <p>Does not post or reply as you.</p>
                <p>Does not send DMs or run outreach campaigns.</p>
                <p>Does not promise rankings, set-and-forget growth, or a full ads/marketing suite.</p>
                <p className="text-ink">
                  You stay in the conversation. The tool only decides what is worth opening.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="border-b border-rule">
        <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-24">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-ink-faint">
            Who it&apos;s for
          </p>
          <h2 className="mt-3 max-w-xl font-serif text-3xl tracking-[-0.02em] text-ink">
            Solo builders shipping apps
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-rule bg-surface p-6">
              <span className="inline-flex rounded-full bg-pale-green px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider text-pale-green-text">
                Now
              </span>
              <p className="mt-4 text-base leading-relaxed text-ink-muted">
                Indie hackers and AI app founders who need a clear opportunity, dated evidence, and a way to meet buyers in public threads without hiring a growth team.
              </p>
            </div>
            <div className="rounded-xl border border-rule bg-surface p-6">
              <span className="inline-flex rounded-full bg-pale-yellow px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider text-pale-yellow-text">
                Later
              </span>
              <p className="mt-4 text-base leading-relaxed text-ink-muted">
                Agencies may use {siteConfig.name} someday. They are not the buyer we write for today.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA / get started */}
      <section id="get-started" className="scroll-mt-16 border-b border-rule bg-surface">
        <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-24">
          <div className="max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-ink-faint">
              Get started
            </p>
            <h2 className="mt-3 font-serif text-3xl tracking-[-0.02em] text-ink sm:text-4xl">
              Find ideas for your audience
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink-muted">
              Start with Reply Radar while the research product opens up. Join Agent Founders Club if you want the community path, or watch this site for the free daily idea feed.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={siteConfig.links.replyRadar}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                Install Reply Radar
              </a>
              <a
                href={siteConfig.links.skool}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center rounded-md border border-rule bg-canvas px-5 py-2.5 text-sm font-medium text-ink hover:border-ink/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                Agent Founders Club
              </a>
              <Link
                href="/blog"
                className="inline-flex min-h-11 items-center justify-center rounded-md border border-rule bg-canvas px-5 py-2.5 text-sm font-medium text-ink hover:border-ink/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                Read the blog
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
