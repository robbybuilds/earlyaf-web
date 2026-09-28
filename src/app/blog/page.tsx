import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog",
  description: `Notes on idea discovery, audience research, and worth-reply distribution from ${siteConfig.legalName}.`,
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  const published = getAllPosts();
  const drafts = getAllPosts({ includeDrafts: true }).filter((p) => p.draft);

  return (
    <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-20">
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-ink-faint">Blog</p>
      <h1 className="mt-3 font-serif text-4xl tracking-[-0.02em] text-ink">Writing for builders</h1>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-muted">
        SEO and AEO publishing surface. Posts land here as MDX under{" "}
        <code className="rounded bg-rule/60 px-1.5 py-0.5 font-mono text-xs">content/blog</code>.
      </p>

      {published.length === 0 ? (
        <div className="mt-12 rounded-xl border border-dashed border-rule bg-surface p-8">
          <p className="text-sm text-ink-muted">
            No published posts yet. The scaffold includes a draft example so MDX and routes are ready for SEO Desk.
          </p>
          {drafts.length > 0 && (
            <ul className="mt-6 space-y-3">
              {drafts.map((post) => (
                <li key={post.slug} className="flex items-baseline justify-between gap-4 border-b border-rule pb-3">
                  <div>
                    <Link href={`/blog/${post.slug}`} className="text-sm font-medium text-ink hover:underline">
                      {post.title}
                    </Link>
                    <p className="mt-1 text-xs text-ink-faint">{post.description}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-pale-yellow px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-pale-yellow-text">
                    Draft
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <ul className="mt-12 divide-y divide-rule border-t border-rule">
          {published.map((post) => (
            <li key={post.slug} className="py-6">
              <time className="font-mono text-xs text-ink-faint" dateTime={post.date}>
                {post.date}
              </time>
              <Link href={`/blog/${post.slug}`} className="mt-2 block font-serif text-2xl text-ink hover:underline">
                {post.title}
              </Link>
              <p className="mt-2 text-sm text-ink-muted">{post.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
