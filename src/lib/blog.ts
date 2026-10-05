import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export type BlogPostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  draft?: boolean;
  author?: string;
};

export type BlogPost = BlogPostMeta & {
  content: string;
};

/** Normalize gray-matter YAML dates (string | Date) to YYYY-MM-DD. */
export function normalizePostDate(value: unknown): string {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }
  if (typeof value === "string" || typeof value === "number") {
    const parsed = new Date(value);
    if (!Number.isNaN(parsed.getTime())) {
      // Prefer YYYY-MM-DD when the source already looks like one
      const raw = String(value).trim();
      if (/^\d{4}-\d{2}-\d{2}/.test(raw)) return raw.slice(0, 10);
      return parsed.toISOString().slice(0, 10);
    }
  }
  return "1970-01-01";
}

/** Safe Date for sitemap lastModified — never Invalid Date (toISOString throws → HTTP 500). */
export function safeLastModified(value: unknown): Date {
  if (value instanceof Date && !Number.isNaN(value.getTime())) return value;
  const normalized = normalizePostDate(value);
  const d = new Date(normalized);
  if (!Number.isNaN(d.getTime())) return d;
  return new Date("1970-01-01T00:00:00.000Z");
}

function readDirSafe(): string[] {
  try {
    if (!fs.existsSync(BLOG_DIR)) return [];
    return fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));
  } catch {
    // Read-only / missing filesystem on some serverless paths — do not mkdir (EROFS → 500).
    return [];
  }
}

function metaFromFile(file: string): BlogPostMeta | null {
  try {
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
    const { data } = matter(raw);
    const slug = file.replace(/\.mdx?$/, "");
    return {
      slug,
      title: String(data.title ?? slug),
      description: String(data.description ?? ""),
      date: normalizePostDate(data.date),
      draft: Boolean(data.draft),
      author: data.author ? String(data.author) : undefined,
    } satisfies BlogPostMeta;
  } catch {
    return null;
  }
}

export function getAllPosts(opts?: { includeDrafts?: boolean }): BlogPostMeta[] {
  const files = readDirSafe();
  const posts = files
    .map((file) => metaFromFile(file))
    .filter((p): p is BlogPostMeta => p !== null)
    .filter((p) => (opts?.includeDrafts ? true : !p.draft))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
  return posts;
}

export function getPost(slug: string): BlogPost | null {
  for (const ext of [".mdx", ".md"]) {
    const full = path.join(BLOG_DIR, `${slug}${ext}`);
    try {
      if (!fs.existsSync(full)) continue;
      const raw = fs.readFileSync(full, "utf8");
      const { data, content } = matter(raw);
      return {
        slug,
        title: String(data.title ?? slug),
        description: String(data.description ?? ""),
        date: normalizePostDate(data.date),
        draft: Boolean(data.draft),
        author: data.author ? String(data.author) : undefined,
        content,
      };
    } catch {
      continue;
    }
  }
  return null;
}
