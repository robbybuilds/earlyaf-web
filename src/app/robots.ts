import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // Draft posts stay previewable by URL but should not be crawled.
  // Per-page meta also sets noindex; this is belt-and-suspenders for bots that honor robots.txt.
  const draftPaths = getAllPosts({ includeDrafts: true })
    .filter((p) => p.draft)
    .map((p) => `/blog/${p.slug}`);

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: draftPaths,
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
