import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms",
  description: `Terms stub for ${siteConfig.legalName}.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
      <h1 className="font-serif text-4xl tracking-[-0.02em] text-ink">Terms</h1>
      <p className="mt-2 font-mono text-xs text-ink-faint">Stub · last updated 2026-09-28</p>
      <div className="mt-10 space-y-4 text-sm leading-relaxed text-ink-muted">
        <p>
          This marketing site and related open tooling (including Reply Radar) are provided as-is for founders evaluating {siteConfig.legalName}.
        </p>
        <p>
          Product features described as &quot;where we&apos;re going&quot; are ambitions, not current deliverables. Do not rely on this site for legal, investment, or medical advice.
        </p>
        <p>
          Community membership, if any, is governed by Skool and the Agent Founders Club terms. Paid research product terms will publish before billing goes live.
        </p>
      </div>
    </div>
  );
}
