import type { ReactNode } from "react";

const LEVELS: { level: string; scope: string; control: string }[] = [
  { level: "Organization", scope: "Every app, team, and tenant", control: "Which gateway instance(s) exist, and who can create new APIs or products behind them" },
  { level: "Gateway", scope: "One APIM instance, Unity AI Gateway, or Cortex AI Gateway", control: "Authentication, token limits, content safety, and logging — applied to everything behind it" },
  { level: "API / product", scope: "A named API, or a product grouping several", control: "Subscription keys, per-product rate limits, and which backends a product is allowed to reach" },
  { level: "Model endpoint", scope: "One model deployment or provider", control: "Routing, load balancing, and circuit breakers across backend instances" },
  { level: "Agent / tool", scope: "One agent, app, or service identity", control: "Per-identity quotas, and scoped access to specific tools or MCP servers" },
  { level: "Prompt & response content", scope: "The actual text going in and out", control: "Content safety moderation, PII redaction, and semantic cache lookup" },
];

function Example({ variant, children }: { variant: "avoid" | "do"; children: ReactNode }) {
  const isDo = variant === "do";
  return (
    <div className={`rounded-lg border p-2.5 ${isDo ? "border-emerald-200 bg-emerald-50/70" : "border-rose-200 bg-rose-50/70"}`}>
      <p className={`text-[11px] font-semibold uppercase tracking-wide ${isDo ? "text-emerald-700" : "text-rose-700"}`}>
        {isDo ? "✓ Do this" : "✗ Avoid"}
      </p>
      <div className="mt-1.5 space-y-0.5 text-xs text-slate-700">{children}</div>
    </div>
  );
}

const BEST_PRACTICES: { title: string; why: string; avoid: ReactNode; do: ReactNode }[] = [
  {
    title: "Give every app or agent its own key",
    why: "One shared key makes it impossible to tell which caller is responsible for a spike in cost or a bad prompt.",
    avoid: <p>One API key, pasted into every app and agent</p>,
    do: <p>One subscription key per app or agent, scoped to what it needs</p>,
  },
  {
    title: "Set token limits where they're actually enforced",
    why: "On Classic multi-region APIM, a token limit is tracked per regional gateway, not tenant-wide — assuming otherwise silently multiplies your real ceiling.",
    avoid: <p>One llm-token-limit value, assumed to cap usage across all regions</p>,
    do: <p>A limit set — and verified — on every regional gateway, or move to Premium v2</p>,
  },
  {
    title: "Redact before you log, not after",
    why: "Once a prompt containing PII is written to a log store, deleting it later rarely removes every copy or downstream export.",
    avoid: <p>Logging full prompts and responses, PII included, by default</p>,
    do: <p>Redact or mask sensitive fields before the log write, not as cleanup</p>,
  },
  {
    title: "Route every call through the gateway",
    why: "A direct model call that bypasses the gateway has no rate limit, no content safety check, and no audit trail.",
    avoid: <p>An app with a fallback that calls the model endpoint directly</p>,
    do: <p>Every path to a model — including fallbacks — goes through the gateway</p>,
  },
];

export function GatewayGovernance() {
  return (
    <div id="governance" className="scroll-mt-[180px] border-t border-slate-200 py-8">
      <h2 className="text-2xl font-semibold text-slate-900">Data Governance</h2>
      <p className="mt-3 text-slate-600">
        AI traffic is governed in layers, from the whole organization down to the content of a single prompt. Each
        layer controls something different, and a gap at any one of them is a gap in the whole chain.
      </p>

      <h3 className="mt-8 text-lg font-semibold text-slate-900">At what level</h3>
      <ol className="mt-4 space-y-2">
        {LEVELS.map((item, index) => (
          <li key={item.level} className="flex gap-3 rounded-lg border border-slate-200 bg-white p-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-600 text-xs font-semibold text-white">
              {index + 1}
            </span>
            <div>
              <p className="font-semibold text-slate-900">
                {item.level} <span className="font-normal text-slate-500">· {item.scope}</span>
              </p>
              <p className="text-sm text-slate-600">{item.control}</p>
            </div>
          </li>
        ))}
      </ol>

      <h3 className="mt-8 text-lg font-semibold text-slate-900">Access control</h3>
      <p className="mt-3 text-slate-600">
        Every caller authenticates before a request reaches a model. Apps and agents typically get a subscription key
        or an Entra ID / OAuth identity scoped to one API or product, so a compromised or misbehaving caller can be
        revoked without touching anyone else's access. Human users authenticating through an app sit behind that
        app's own identity, not a shared gateway credential.
      </p>

      <h3 className="mt-8 text-lg font-semibold text-slate-900">Sensitive data in prompts</h3>
      <p className="mt-3 text-slate-600">
        Prompts and responses can carry PII the same way any other request body can, so the same controls apply at
        the gateway: Azure API Management can moderate prompts with Azure AI Content Safety before they reach a
        model; Databricks' Unity AI Gateway has a Sensitive Data Detection guardrail (Beta) that can block or redact
        structured PII such as SSNs and card numbers in requests and responses; Snowflake enforces this through its
        existing masking and governance policies on the data an agent is allowed to touch.
      </p>

      <h3 className="mt-8 text-lg font-semibold text-slate-900">Audit logging</h3>
      <p className="mt-3 text-slate-600">
        Every platform's gateway can log who called what, with which model, and what it cost — not just that a
        request happened. Azure API Management logs prompts and completions to Azure Monitor; Databricks' Unity
        Gateway writes every request and response into a unified trace table (Beta) in OpenTelemetry format;
        Snowflake's Cortex AI Gateway records traces and spans for every request, including the models called, step
        timing, token counts, and errors.
      </p>
      <p className="mt-4 text-slate-600">
        <strong className="font-semibold text-slate-900">Rule of thumb:</strong> if a human can't answer "which
        agent did this, on whose behalf, and what did it cost" from the gateway's logs alone, the logging isn't done
        yet — don't rely on reconstructing it from application code after the fact.
      </p>

      <h3 className="mt-8 text-lg font-semibold text-slate-900">Best practices</h3>
      <div className="mt-3 space-y-4">
        {BEST_PRACTICES.map((practice, index) => (
          <div key={practice.title} className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-600 text-xs font-semibold text-white">
                {index + 1}
              </span>
              <p className="font-semibold text-slate-900">{practice.title}</p>
            </div>
            <p className="mt-2 text-sm text-slate-600">{practice.why}</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              <Example variant="avoid">{practice.avoid}</Example>
              <Example variant="do">{practice.do}</Example>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
