import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPost } from "@/lib/blog";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllPosts({ includeDrafts: true }).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    robots: post.draft ? { index: false, follow: false } : { index: true, follow: true },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
      <Link
        href="/blog"
        className="inline-flex min-h-11 items-center font-mono text-sm text-ink-faint hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
      >
        ← Blog
      </Link>
      {post.draft && (
        <p className="mt-4 inline-flex rounded-full bg-pale-yellow px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider text-pale-yellow-text">
          Draft / example
        </p>
      )}
      <h1 className="mt-4 font-serif text-[2rem] tracking-[-0.02em] text-ink sm:text-4xl">
        {post.title}
      </h1>
      <p className="mt-3 text-sm text-ink-muted">
        <time dateTime={post.date}>{post.date}</time>
        {post.author ? ` · ${post.author}` : null}
      </p>
      <div className="prose-earlyaf mt-10 space-y-4 text-base leading-relaxed text-ink-muted [&_a]:text-ink [&_a]:underline [&_code]:break-all [&_code]:rounded [&_code]:bg-rule/50 [&_code]:px-1 [&_code]:font-mono [&_code]:text-sm [&_h2]:mt-10 [&_h2]:font-serif [&_h2]:text-xl [&_h2]:tracking-[-0.02em] [&_h2]:text-ink sm:[&_h2]:text-2xl [&_img]:h-auto [&_img]:max-w-full [&_pre]:max-w-full [&_pre]:overflow-x-auto [&_strong]:text-ink">
        <MDXRemote source={post.content} />
      </div>
    </article>
  );
}
