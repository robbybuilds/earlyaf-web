# Deploy handoff — earlyaf-web → Vercel → earlyaf.ai

## Done

- Repo: https://github.com/robbybuilds/earlyaf-web (public)
- Local `npm run build` succeeds (App Router, MDX blog, sitemap, robots, privacy/terms)

## Blocked on Vercel auth (box CLI)

On the box, run (or finish an in-progress device login):

```bash
export PATH="$HOME/.local/bin:$PATH"
vercel login
# open the printed https://vercel.com/oauth/device?user_code=… URL and approve
vercel whoami
```

Then from `/workspace/earlyaf-web` (or a fresh clone):

```bash
vercel link --yes          # create project earlyaf-web under your team
vercel --prod --yes
vercel domains add earlyaf.ai
vercel domains add www.earlyaf.ai
```

Prefer linking the GitHub repo in the Vercel dashboard (Import → `robbybuilds/earlyaf-web`) so production redeploys on push to `main`.

## DNS (Namecheap) — current state

As of scaffold time:

- `earlyaf.ai` → Namecheap URL Forward to `http://www.earlyaf.ai/`
- `www.earlyaf.ai` → CNAME `parkingpage.namecheap.com` (parking page)

**After** Vercel shows the domain as added, replace parking/URL-forward with the records in `DNS-NAMECHEAP.md` (typically apex `A` → `76.76.21.21`, `www` `CNAME` → `cname.vercel-dns.com`).

Remove the Namecheap **URL Redirect / Forwarding** on `@` so it does not fight the A record.
