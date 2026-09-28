# earlyaf.ai → Vercel (Namecheap)

After the Vercel project has `earlyaf.ai` (and preferably `www.earlyaf.ai`) added under **Project → Settings → Domains**, set these records in Namecheap **Advanced DNS**.

## Apex (`earlyaf.ai`)

Vercel will show one of these patterns. Prefer the values Vercel displays on the domain screen if they differ.

| Type | Host | Value | TTL |
|------|------|-------|-----|
| A | `@` | `76.76.21.21` | Automatic |
| — or — | | | |
| ALIAS / ANAME / CNAME Flattening | `@` | `cname.vercel-dns.com.` | Automatic |

Namecheap often supports **A** for apex. If you use an ALIAS/URL-redirect feature, prefer Vercel’s documented CNAME flattening target instead of an HTTP redirect (redirects hurt apex SEO).

## WWW

| Type | Host | Value | TTL |
|------|------|-------|-----|
| CNAME | `www` | `cname.vercel-dns.com.` | Automatic |

## Cleanup

Remove old A/CNAME/URL Redirect records for `@` and `www` that point elsewhere (parking pages, old hosts). Keep unrelated records (email MX, TXT for SPF/DKIM, etc.).

## Verify

1. Vercel domain status → **Valid**
2. `https://earlyaf.ai` and `https://www.earlyaf.ai` resolve to this marketing site
3. Canonical tags and sitemap use `https://earlyaf.ai`

Propagation can take a few minutes to 48 hours. Start with Vercel’s “Refresh” on the domain page after saving DNS.
