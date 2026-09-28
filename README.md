# earlyaf-web

Public marketing site for [earlyaf.ai](https://earlyaf.ai).

Clean Next.js (App Router) scaffold for SEO/AEO publishing. **Not** the mid-WIP product app under `EarlyAf`.

## Stack

- Next.js 16 + TypeScript + Tailwind CSS 4
- MDX blog via `content/blog/*.mdx` + `next-mdx-remote`
- Canonical URL, `sitemap.xml`, `robots.txt` aimed at `https://earlyaf.ai`

## Product law (wedge only)

- ICP: solo app builders (agencies later)
- Wedge: free daily idea + Reply Radar (listen/score/queue, manual replies) + research → first experiment
- North star hub language = where we’re going, never what you get today
- No Heyron branding; no full marketing suite / ads / auto-outreach claims
- Public CTA: **Find ideas for my audience**

## Local

```bash
npm install
npm run dev
```

## Blog

Add MDX files under `content/blog/`. Set `draft: true` to hide from the public index and sitemap. Draft routes remain reachable by URL for preview.

## Deploy

Vercel project linked to this repo. Domain: `earlyaf.ai` (see `docs/DNS-NAMECHEAP.md`).
