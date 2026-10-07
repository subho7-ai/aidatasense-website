import { Icon, type IconName } from "./diagramIcons";

const HIGHLIGHTS: { label: string; body: string; icon: IconName }[] = [
  { label: "Token-aware", body: "Limits, quotas, and cost are tracked by token, not request — the unit that actually drives spend.", icon: "chart" },
  { label: "Agent-aware", body: "Identity covers not just the human who's logged in, but which agent or service account made the call on their behalf.", icon: "users" },
  { label: "Model-agnostic", body: "The same policies apply whether a request lands on Azure OpenAI, Anthropic, Google, or a self-hosted model.", icon: "share" },
  { label: "Audited by default", body: "Every prompt and response can be logged centrally, instead of scattered across each app's own logging.", icon: "shieldCheck" },
];

export function GatewayOverview() {
  return (
    <div className="border-t border-slate-200 py-8">
      <h2 className="text-2xl font-semibold text-slate-900">Gateway at a Glance</h2>
      <p className="mt-3 text-slate-600">
        An AI gateway is a governed layer that every model, agent, and tool call passes through — instead of each app
        calling a model endpoint directly with its own key and its own ad-hoc logging.
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {HIGHLIGHTS.map((item) => (
          <div key={item.label} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
              <Icon name={item.icon} className="h-5 w-5" />
            </span>
            <p className="mt-3 font-semibold text-slate-900">{item.label}</p>
            <p className="mt-1 text-sm text-slate-600">{item.body}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-slate-600">
        In practice, a gateway is a proxy sitting in front of model endpoints — Azure API Management as a standalone
        Azure resource, or Databricks' Unity AI Gateway (called Unity Gateway in Databricks' docs) and Snowflake's
        Cortex AI Gateway as capabilities built into the
        platform itself. Policies (rate limits, content safety, logging, routing across backends) are configured once
        and apply to every request that passes through, regardless of which app or agent sent it.
      </p>
    </div>
  );
}
