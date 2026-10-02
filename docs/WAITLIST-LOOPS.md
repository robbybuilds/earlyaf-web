# Waitlist → Loops.so

Email capture on earlyaf.ai posts to the **public Loops form endpoint**. Zoho Mail is outbound mail infra only; **Loops owns the form and list**.

## Env var

```bash
NEXT_PUBLIC_LOOPS_FORM_ID=<form-id>
```

The form ID is the last path segment of the Form Endpoint shown in Loops:

`https://app.loops.so/api/newsletter-form/<FORM_ID>`

It is public by design (same as an HTML form `action`). Do **not** put a Loops API key in the browser or in `NEXT_PUBLIC_*`.

## Where to paste it

1. **Local:** copy `.env.example` → `.env.local`, set `NEXT_PUBLIC_LOOPS_FORM_ID`, restart `npm run dev`.
2. **Production:** Vercel → project **earlyaf-web** → Settings → Environment Variables → add `NEXT_PUBLIC_LOOPS_FORM_ID` (Production + Preview). Then redeploy (`vercel --prod` or push/merge to `main` if Git deploy is linked).

## How the UI behaves

| `NEXT_PUBLIC_LOOPS_FORM_ID` | UI |
| --- | --- |
| unset / empty | Disabled placeholder. Production: calm “Coming soon”. Non-prod: subtle ops hint. |
| set | Live email + submit via `fetch` POST (`application/x-www-form-urlencoded`) to the Loops form endpoint. Handles success, error JSON, and HTTP 429. |

Component: `src/components/WaitlistForm.tsx` (homepage `#waitlist` / `#get-started`, footer compact).

## Robby checklist

1. Create Loops account + form (and Zoho/DNS separately for sending domain).
2. Copy Form ID from Loops → Forms → Settings → Form Endpoint.
3. Set `NEXT_PUBLIC_LOOPS_FORM_ID` on Vercel project **earlyaf-web** (and `.env.local`).
4. Merge the waitlist PR (if still open) and run `vercel --prod` (or rely on Git deploy).
5. Smoke-test signup on earlyaf.ai.

## Out of scope

No Google Forms, Mailchimp, ConvertKit, Resend signup, or Loops `contacts/create` API from the browser.
