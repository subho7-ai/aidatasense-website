import { Icon, type IconName } from "./diagramIcons";

// AI gateway architecture: callers flow down into the gateway and its layers,
// then on to backends, with governance and observability underpinning both.
// Built from plain HTML/CSS (not a scaling SVG) so text stays a fixed size
// and the Callers/Backends rows reflow via a responsive grid.

const CALLER_COLOR = "text-violet-600";

const CALLERS: { label: string; icon: IconName }[] = [
  { label: "Applications", icon: "app" },
  { label: "AI agents", icon: "sparkles" },
  { label: "Copilots", icon: "users" },
  { label: "MCP clients", icon: "plug" },
];

const LAYERS: { label: string; icon: IconName }[] = [
  { label: "Identity and auth", icon: "key" },
  { label: "Token limits and budgets", icon: "chart" },
  { label: "Guardrails and PII", icon: "shieldCheck" },
  { label: "Routing and caching", icon: "pipeline" },
  { label: "Logging and metrics", icon: "export" },
];

const BACKENDS: { label: string; icon: IconName }[] = [
  { label: "Model providers", icon: "server" },
  { label: "MCP servers", icon: "plug" },
  { label: "Data and tools", icon: "database" },
];

function Row({ icon, label }: { icon: IconName; label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2">
      <Icon name={icon} className={`h-4 w-4 shrink-0 ${CALLER_COLOR}`} />
      <span className="text-sm font-semibold text-slate-900">{label}</span>
    </div>
  );
}

function ArrowDown() {
  return (
    <svg width="16" height="22" viewBox="0 0 16 22" fill="none" aria-hidden="true" className="shrink-0">
      <path
        d="M8 0V16M8 16L2 10M8 16L14 10"
        stroke="#94a3b8"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function GatewayArchitectureDiagram() {
  return (
    <figure className="mt-6">
      <div className="mx-auto max-w-[680px] rounded-xl border border-slate-200 bg-white p-4 sm:p-6">
        <p className="text-center text-xs font-semibold uppercase tracking-wide text-slate-500">Callers</p>
        <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-4">
          {CALLERS.map((caller) => (
            <Row key={caller.label} icon={caller.icon} label={caller.label} />
          ))}
        </div>

        <div className="my-3 flex justify-center">
          <ArrowDown />
        </div>

        <div className="rounded-xl border-2 border-violet-600 bg-violet-50 p-3 sm:p-4">
          <p className="text-center text-base font-extrabold text-violet-900">AI gateway</p>
          <p className="text-center text-xs font-semibold text-violet-700">one governed entry point</p>
          <div className="mt-3 space-y-2">
            {LAYERS.map((layer) => (
              <div key={layer.label} className="flex items-center gap-2 rounded-lg border border-violet-200 bg-white px-3 py-2">
                <Icon name={layer.icon} className={`h-4 w-4 shrink-0 ${CALLER_COLOR}`} />
                <span className="text-sm font-semibold text-slate-900">{layer.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="my-3 flex justify-center">
          <ArrowDown />
        </div>

        <p className="text-center text-xs font-semibold uppercase tracking-wide text-slate-500">Backends</p>
        <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3">
          {BACKENDS.map((backend) => (
            <Row key={backend.label} icon={backend.icon} label={backend.label} />
          ))}
        </div>

        <div className="my-3 flex justify-center">
          <ArrowDown />
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            <div className="flex items-center gap-2">
              <Icon name="shieldCheck" className="h-4 w-4 shrink-0 text-emerald-600" />
              <span className="text-sm font-semibold text-slate-900">Governance</span>
            </div>
            <p className="mt-1 text-xs text-slate-600">Catalog permissions and policy as code</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            <div className="flex items-center gap-2">
              <Icon name="chart" className="h-4 w-4 shrink-0 text-blue-600" />
              <span className="text-sm font-semibold text-slate-900">Observability</span>
            </div>
            <p className="mt-1 text-xs text-slate-600">Usage, cost, and audit</p>
          </div>
        </div>
      </div>
      <figcaption className="mx-auto mt-3 max-w-[680px] text-center text-sm text-slate-500">
        Every caller reaches models, tools, and data through one governed layer. Databricks implements it as Unity AI
        Gateway, Snowflake as Cortex AI Gateway, and Azure as API Management&apos;s AI gateway.
      </figcaption>
    </figure>
  );
}
