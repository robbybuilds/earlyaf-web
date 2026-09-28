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
      <Link href="/blog" className="font-mono text-xs text-ink-faint hover:text-ink">
        ← Blog
      </Link>
      {post.draft && (
        <p className="mt-6 inline-flex rounded-full bg-pale-yellow px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider text-pale-yellow-text">
          Draft / example
        </p>
      )}
      <h1 className="mt-4 font-serif text-4xl tracking-[-0.02em] text-ink">{post.title}</h1>
      <p className="mt-3 text-sm text-ink-muted">
        <time dateTime={post.date}>{post.date}</time>
        {post.author ? ` · ${post.author}` : null}
      </p>
      <div className="prose-earlyaf mt-10 space-y-4 text-base leading-relaxed text-ink-muted [&_h2]:mt-10 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:tracking-[-0.02em] [&_h2]:text-ink [&_strong]:text-ink [&_a]:text-ink [&_a]:underline [&_code]:rounded [&_code]:bg-rule/50 [&_code]:px-1 [&_code]:font-mono [&_code]:text-sm">
        <MDXRemote source={post.content} />
      </div>
    </article>
  );
}
