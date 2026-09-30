"use client";

import { FormEvent, useId, useState } from "react";

type WaitlistFormProps = {
  /** Compact layout for footer / secondary surfaces */
  variant?: "default" | "compact";
  className?: string;
  /** Hidden Loops `source` contact property */
  source?: string;
};

type Status =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "success" }
  | { kind: "error"; message: string };

const FORM_ID = process.env.NEXT_PUBLIC_LOOPS_FORM_ID?.trim() ?? "";

function loopsEndpoint(formId: string) {
  return `https://app.loops.so/api/newsletter-form/${formId}`;
}

/**
 * Waitlist email capture for Loops.so.
 *
 * Live path: client POST (application/x-www-form-urlencoded) to the public
 * Loops form endpoint. No API key. See docs/WAITLIST-LOOPS.md.
 *
 * Ops: set NEXT_PUBLIC_LOOPS_FORM_ID on Vercel (project earlyaf-web) and locally
 * in .env.local, then redeploy. Until then this renders a calm Coming soon /
 * disabled placeholder (production) or a subtle ops hint (non-production).
 */
export function WaitlistForm({
  variant = "default",
  className = "",
  source = "earlyaf-web",
}: WaitlistFormProps) {
  const inputId = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const isCompact = variant === "compact";
  const configured = FORM_ID.length > 0;
  const isProd = process.env.NODE_ENV === "production";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!configured || status.kind === "loading") return;

    const trimmed = email.trim();
    if (!trimmed) {
      setStatus({ kind: "error", message: "Enter an email address." });
      return;
    }

    setStatus({ kind: "loading" });

    try {
      const body = new URLSearchParams({
        email: trimmed,
        source,
      });

      const response = await fetch(loopsEndpoint(FORM_ID), {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });

      if (response.status === 429) {
        setStatus({
          kind: "error",
          message: "Too many signups — try again in a little while.",
        });
        return;
      }

      const data = (await response.json()) as {
        success?: boolean;
        message?: string;
      };

      if (!response.ok || data.success === false) {
        setStatus({
          kind: "error",
          message: data.message ?? "Something went wrong. Please try again.",
        });
        return;
      }

      setEmail("");
      setStatus({ kind: "success" });
    } catch {
      setStatus({
        kind: "error",
        message: "Network error. Check your connection and try again.",
      });
    }
  }

  if (!configured) {
    return (
      <PlaceholderForm
        inputId={inputId}
        isCompact={isCompact}
        isProd={isProd}
        className={className}
      />
    );
  }

  if (status.kind === "success") {
    return (
      <div
        className={`rounded-xl border border-rule bg-canvas p-5 sm:p-6 ${className}`}
        role="status"
      >
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-ink-faint">
          Waitlist
        </p>
        <p className="mt-3 text-base leading-relaxed text-ink">
          You&apos;re on the list. We&apos;ll send free daily ideas for solo builders —
          no spam.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`rounded-xl border border-rule bg-canvas ${isCompact ? "p-4 sm:p-5" : "p-5 sm:p-6"} ${className}`}
      noValidate
    >
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-ink-faint">
        Waitlist
      </p>
      {!isCompact && (
        <p className="mt-3 text-base leading-relaxed text-ink-muted">
          Join the waitlist for free daily ideas — audience research for solo app
          builders.
        </p>
      )}
      {isCompact && (
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">
          Free daily ideas for solo builders.
        </p>
      )}

      <div className={`mt-4 flex flex-col gap-3 ${isCompact ? "sm:flex-row sm:items-end" : "sm:flex-row sm:items-end"}`}>
        <div className="min-w-0 flex-1">
          <label htmlFor={inputId} className="sr-only">
            Email address
          </label>
          <input
            id={inputId}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status.kind === "error") setStatus({ kind: "idle" });
            }}
            placeholder="you@example.com"
            disabled={status.kind === "loading"}
            className="min-h-11 w-full rounded-md border border-rule bg-surface px-3.5 text-base text-ink placeholder:text-ink-faint focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:opacity-60"
          />
        </div>
        <button
          type="submit"
          disabled={status.kind === "loading"}
          className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:opacity-60"
        >
          {status.kind === "loading" ? "Joining…" : "Join waitlist"}
        </button>
      </div>

      {status.kind === "error" && (
        <p className="mt-3 text-sm text-ink-muted" role="alert">
          {status.message}
        </p>
      )}

      <p className="mt-3 text-xs leading-relaxed text-ink-faint">
        One honest idea a day. Unsubscribe anytime.
      </p>
    </form>
  );
}

function PlaceholderForm({
  inputId,
  isCompact,
  isProd,
  className,
}: {
  inputId: string;
  isCompact: boolean;
  isProd: boolean;
  className: string;
}) {
  return (
    <div
      className={`rounded-xl border border-dashed border-rule bg-canvas ${isCompact ? "p-4 sm:p-5" : "p-5 sm:p-6"} ${className}`}
      aria-disabled="true"
    >
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-ink-faint">
        Waitlist
      </p>
      <p className={`mt-3 leading-relaxed text-ink-muted ${isCompact ? "text-sm" : "text-base"}`}>
        {isProd
          ? "Coming soon — join the waitlist for free daily ideas for solo builders."
          : "Join the waitlist for free daily ideas — audience research for solo app builders."}
      </p>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="min-w-0 flex-1">
          <label htmlFor={inputId} className="sr-only">
            Email address
          </label>
          <input
            id={inputId}
            type="email"
            placeholder="you@example.com"
            disabled
            className="min-h-11 w-full cursor-not-allowed rounded-md border border-rule bg-surface px-3.5 text-base text-ink-faint placeholder:text-ink-faint opacity-70"
          />
        </div>
        <button
          type="button"
          disabled
          className="inline-flex min-h-11 shrink-0 cursor-not-allowed items-center justify-center rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-white opacity-50"
        >
          Join waitlist
        </button>
      </div>

      <p className="mt-3 text-xs leading-relaxed text-ink-faint">
        {isProd
          ? "Signup isn't live yet. Check back soon."
          : "Waitlist form coming soon — set NEXT_PUBLIC_LOOPS_FORM_ID (Loops → Forms → Settings). Ops: add on Vercel project earlyaf-web, then redeploy."}
      </p>
    </div>
  );
}
