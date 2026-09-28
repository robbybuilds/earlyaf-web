# earlyaf.ai → Vercel project `earlyaf-web` (Namecheap)

Domain is attached on Vercel to project **earlyaf-web**. DNS still points at Namecheap parking / URL forward until you change records.

## Exact records (from `vercel domains verify`, 2026-09-28)

### Apex `earlyaf.ai`

In Namecheap **Advanced DNS**:

1. **Remove** any URL Redirect / Forwarding for `@`.
2. **Remove** old A records for `@` (currently `192.64.119.193` parking).
3. Add **both** A records (preferred set):

| Type | Host | Value | TTL |
|------|------|-------|-----|
| A | `@` | `216.150.1.1` | Automatic |
| A | `@` | `216.150.16.1` | Automatic |

Fallback single A (also accepted by Vercel): `@` → `76.76.21.21`.

### WWW

1. **Remove** CNAME `www` → `parkingpage.namecheap.com`.
2. Add:

| Type | Host | Value | TTL |
|------|------|-------|-----|
| CNAME | `www` | `e9e73f1a9a91b71d.vercel-dns-016.com.` | Automatic |

(Generic fallback: `www` → `cname.vercel-dns.com.`)

## Keep

MX / SPF / DKIM / other non-web records untouched.

## Verify

```bash
vercel domains verify earlyaf.ai
vercel domains verify www.earlyaf.ai
curl -I https://earlyaf.ai
curl -I https://www.earlyaf.ai
```

Until DNS propagates, the live marketing site is: **https://earlyaf-web.vercel.app**
