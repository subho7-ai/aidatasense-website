import { Icon, type IconName } from "./diagramIcons";
import { ComparisonTable } from "./ComparisonTable";

const CALLERS: { name: string; body: string; icon: IconName }[] = [
  { name: "Applications", body: "Web and mobile backends calling a model as part of a feature, through a subscription key or managed identity.", icon: "app" },
  { name: "Agents", body: "Autonomous or semi-autonomous agents making multiple model and tool calls per task, each as their own identity.", icon: "sparkles" },
  { name: "Copilots", body: "In-product assistants — Copilot in Power BI, Fabric data agents, Cortex Analyst — consuming governed models as just another caller.", icon: "users" },
  { name: "MCP tools", body: "Model Context Protocol servers and clients, registered and governed the same way as a model endpoint.", icon: "plug" },
];

const WHICH_GATEWAY = {
  title: "Which gateway should I use?",
  headers: ["Situation", "Reach for", "Why"],
  rows: [
    ["Single cloud, Azure-centric", "Azure API Management", "Native to Azure OpenAI / Microsoft Foundry, with mature multi-region and content-safety tooling"],
    ["Databricks-centric", "Unity AI Gateway", "Same Unity Catalog permissions already governing your tables extend to models, MCP servers, and agents"],
    ["Snowflake-centric", "Cortex AI Gateway", "Zero setup — provisioned automatically per account — and reuses Snowflake's existing governance"],
    ["Multi-cloud, vendor-neutral", "A third-party or open-source AI gateway", "No single vendor's catalog or account model to anchor to; policy travels with you across clouds"],
  ],
};

export function GatewayDataConsumers() {
  return (
    <div id="consumers" className="scroll-mt-[180px] border-t border-slate-200 py-8">
      <h2 className="text-2xl font-semibold text-slate-900">Who Calls the Gateway</h2>
      <p className="mt-3 text-slate-600">
        The same gateway sits in front of every kind of caller, applying one set of policies regardless of what's on
        the other end of the request.
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {CALLERS.map((caller) => (
          <div key={caller.name} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
              <Icon name={caller.icon} className="h-5 w-5" />
            </span>
            <p className="mt-3 font-semibold text-slate-900">{caller.name}</p>
            <p className="mt-1 text-sm text-slate-600">{caller.body}</p>
          </div>
        ))}
      </div>

      <ComparisonTable {...WHICH_GATEWAY} embedded />

      <h3 className="mt-8 text-lg font-semibold text-slate-900">Vendor-neutral gateways</h3>
      <p className="mt-3 text-slate-600">
        For a multi-cloud setup with no single dominant platform, third-party and open-source AI gateways exist as an
        alternative to a single vendor's built-in one — products such as{" "}
        <strong className="font-semibold text-slate-900">Kong AI Gateway</strong>,{" "}
        <strong className="font-semibold text-slate-900">LiteLLM</strong>, and{" "}
        <strong className="font-semibold text-slate-900">Cloudflare AI Gateway</strong> apply the same kind of
        token limits, routing, and logging in front of models from any provider, independent of which cloud or data
        platform a given team is on. This list isn't exhaustive — evaluate current options against your own
        requirements before choosing one.
      </p>
    </div>
  );
}
