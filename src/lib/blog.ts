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

function ensureDir() {
  if (!fs.existsSync(BLOG_DIR)) {
    fs.mkdirSync(BLOG_DIR, { recursive: true });
  }
}

export function getAllPosts(opts?: { includeDrafts?: boolean }): BlogPostMeta[] {
  ensureDir();
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));
  const posts = files
    .map((file) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
      const { data } = matter(raw);
      const slug = file.replace(/\.mdx?$/, "");
      return {
        slug,
        title: String(data.title ?? slug),
        description: String(data.description ?? ""),
        date: String(data.date ?? "1970-01-01"),
        draft: Boolean(data.draft),
        author: data.author ? String(data.author) : undefined,
      } satisfies BlogPostMeta;
    })
    .filter((p) => (opts?.includeDrafts ? true : !p.draft))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
  return posts;
}

export function getPost(slug: string): BlogPost | null {
  ensureDir();
  for (const ext of [".mdx", ".md"]) {
    const full = path.join(BLOG_DIR, `${slug}${ext}`);
    if (!fs.existsSync(full)) continue;
    const raw = fs.readFileSync(full, "utf8");
    const { data, content } = matter(raw);
    return {
      slug,
      title: String(data.title ?? slug),
      description: String(data.description ?? ""),
      date: String(data.date ?? "1970-01-01"),
      draft: Boolean(data.draft),
      author: data.author ? String(data.author) : undefined,
      content,
    };
  }
  return null;
}
