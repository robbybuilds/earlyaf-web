import type { MetadataRoute } from "next";
import { getAllPosts, safeLastModified } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  let posts: MetadataRoute.Sitemap = [];
  try {
    posts = getAllPosts().map((post) => ({
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: safeLastModified(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  } catch {
    // Prefer a partial sitemap over HTTP 500 for crawlers.
    posts = [];
  }

  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/privacy`,
      lastModified: new Date("2026-09-28"),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${siteConfig.url}/terms`,
      lastModified: new Date("2026-09-28"),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    ...posts,
  ];
}
