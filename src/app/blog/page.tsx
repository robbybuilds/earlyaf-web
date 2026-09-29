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
      <h1 className="mt-3 font-serif text-[2rem] tracking-[-0.02em] text-ink sm:text-4xl">
        Writing for builders
      </h1>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-muted">
        SEO and AEO publishing surface. Posts land here as MDX under{" "}
        <code className="break-all rounded bg-rule/60 px-1.5 py-0.5 font-mono text-sm">
          content/blog
        </code>
        .
      </p>

      {published.length === 0 ? (
        <div className="mt-12 rounded-xl border border-dashed border-rule bg-surface p-8">
          <p className="text-base text-ink-muted">
            No published posts yet. The scaffold includes a draft example so MDX and routes are ready for SEO Desk.
          </p>
          {drafts.length > 0 && (
            <ul className="mt-6 space-y-3">
              {drafts.map((post) => (
                <li
                  key={post.slug}
                  className="flex flex-col gap-2 border-b border-rule pb-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
                >
                  <div className="min-w-0">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex min-h-11 items-center text-base font-medium text-ink hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                    >
                      {post.title}
                    </Link>
                    <p className="mt-1 text-sm text-ink-faint">{post.description}</p>
                  </div>
                  <span className="w-fit shrink-0 rounded-full bg-pale-yellow px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-pale-yellow-text">
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
              <Link
                href={`/blog/${post.slug}`}
                className="mt-2 block min-w-0 font-serif text-xl text-ink hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink sm:text-2xl"
              >
                {post.title}
              </Link>
              <p className="mt-2 text-base text-ink-muted">{post.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
