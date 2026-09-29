import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: `Privacy stub for ${siteConfig.legalName}.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
      <h1 className="font-serif text-[2rem] tracking-[-0.02em] text-ink sm:text-4xl">Privacy</h1>
      <p className="mt-2 font-mono text-xs text-ink-faint">Stub · last updated 2026-09-28</p>
      <div className="mt-10 space-y-4 text-base leading-relaxed text-ink-muted">
        <p>
          {siteConfig.legalName} ({siteConfig.url}) is a marketing site. This page is a launch stub and will be replaced with a full policy before collecting personal data beyond standard hosting logs.
        </p>
        <p>
          Hosting and analytics may process IP addresses and request metadata through our providers (for example Vercel). Reply Radar runs locally in your browser; its queue stays on your device unless you choose to share it elsewhere.
        </p>
        <p>
          Questions: contact the operator via the Agent Founders Club Skool community or the GitHub org{" "}
          <a className="text-ink underline" href="https://github.com/robbybuilds">
            robbybuilds
          </a>
          .
        </p>
      </div>
    </div>
  );
}
