import { SvgIcon, type IconName } from "./diagramIcons";

// AI gateway architecture: callers flow down into the gateway and its layers,
// then on to backends, with governance and observability underpinning both.
// Stacked (not left-to-right) so it scales to fit narrow content columns
// without shrinking text past readability.

const ARROW_COLOR = "#94a3b8";
const CALLER_COLOR = "#7c3aed";

const CALLERS: { label: string; icon: IconName }[] = [
  { label: "Applications", icon: "app" },
  { label: "AI agents", icon: "sparkles" },
  { label: "Copilots", icon: "users" },
  { label: "MCP clients", icon: "plug" },
];
const CALLER_Y = [30, 82, 134, 186];

const LAYERS: { label: string; icon: IconName }[] = [
  { label: "Identity and auth", icon: "key" },
  { label: "Token limits and budgets", icon: "chart" },
  { label: "Guardrails and PII", icon: "shieldCheck" },
  { label: "Routing and caching", icon: "pipeline" },
  { label: "Logging and metrics", icon: "export" },
];
const LAYER_Y = [310, 366, 422, 478, 534];

const BACKENDS: { label: string; icon: IconName }[] = [
  { label: "Model providers", icon: "server" },
  { label: "MCP servers", icon: "plug" },
  { label: "Data and tools", icon: "database" },
];
const BACKEND_Y = [650, 702, 754];

function Arrow({ d }: { d: string }) {
  return <path d={d} fill="none" stroke={ARROW_COLOR} strokeWidth={1.8} markerEnd="url(#gw-arch-arrow)" />;
}

export function GatewayArchitectureDiagram() {
  return (
    <figure className="mt-6 rounded-xl border border-slate-200 bg-white p-3 sm:p-4">
      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 420 920"
          className="h-auto w-full min-w-[320px]"
          role="img"
          aria-label="AI gateway architecture: applications, AI agents, Copilots, and MCP clients all call one AI gateway, which handles identity and auth, token limits and budgets, guardrails and PII, routing and caching, and logging and metrics, before reaching model providers, MCP servers, and data and tools. Governance (catalog permissions and policy as code) and observability (usage, cost, and audit) underpin the whole gateway."
          fontFamily="Inter, system-ui, sans-serif"
        >
          <defs>
            <marker id="gw-arch-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
              <path d="M0 0L10 5L0 10z" fill={ARROW_COLOR} />
            </marker>
          </defs>

          {/* Callers */}
          <text x={16} y={20} fontSize="11" fontWeight="700" fill="#64748b" letterSpacing="1">
            CALLERS
          </text>
          {CALLERS.map((caller, index) => {
            const y = CALLER_Y[index];
            return (
              <g key={caller.label}>
                <rect x={16} y={y} width={388} height={44} rx={10} fill="#fff" stroke="#cbd5e1" strokeWidth={1.2} />
                <SvgIcon name={caller.icon} x={28} y={y + 12} size={20} color={CALLER_COLOR} />
                <text x={58} y={y + 27} fontSize="13" fontWeight="600" fill="#0f172a">
                  {caller.label}
                </text>
              </g>
            );
          })}
          <Arrow d="M210,230 V252" />

          {/* Gateway */}
          <rect x={16} y={260} width={388} height={340} rx={16} fill="#f5f3ff" stroke="#7c3aed" strokeWidth={2.2} />
          <text x={210} y={286} textAnchor="middle" fontSize="16" fontWeight="800" fill="#4c1d95">
            AI gateway
          </text>
          <text x={210} y={302} textAnchor="middle" fontSize="11" fontWeight="600" fill="#6d28d9">
            one governed entry point
          </text>
          {LAYERS.map((layer, index) => {
            const y = LAYER_Y[index];
            return (
              <g key={layer.label}>
                <rect x={32} y={y} width={356} height={50} rx={10} fill="#fff" stroke="#ddd6fe" strokeWidth={1.2} />
                <SvgIcon name={layer.icon} x={44} y={y + 13} size={20} color="#7c3aed" />
                <text x={74} y={y + 31} fontSize="13" fontWeight="600" fill="#1e1b2e">
                  {layer.label}
                </text>
              </g>
            );
          })}
          <Arrow d="M210,600 V622" />

          {/* Backends */}
          <text x={16} y={638} fontSize="11" fontWeight="700" fill="#64748b" letterSpacing="1">
            BACKENDS
          </text>
          {BACKENDS.map((backend, index) => {
            const y = BACKEND_Y[index];
            return (
              <g key={backend.label}>
                <rect x={16} y={y} width={388} height={44} rx={10} fill="#fff" stroke="#cbd5e1" strokeWidth={1.2} />
                <SvgIcon name={backend.icon} x={28} y={y + 12} size={20} color={CALLER_COLOR} />
                <text x={58} y={y + 27} fontSize="13" fontWeight="600" fill="#0f172a">
                  {backend.label}
                </text>
              </g>
            );
          })}
          <Arrow d="M210,798 V820" />

          {/* Governance and observability, side by side */}
          <rect x={16} y={828} width={188} height={76} rx={12} fill="#f8fafc" stroke="#cbd5e1" strokeWidth={1.2} />
          <SvgIcon name="shieldCheck" x={30} y={844} size={20} color="#15803d" />
          <text x={58} y={854} fontSize="12.5" fontWeight="700" fill="#0f172a">
            Governance
          </text>
          <text x={30} y={880} fontSize="10.5" fill="#475569">
            Catalog permissions
          </text>
          <text x={30} y={894} fontSize="10.5" fill="#475569">
            and policy as code
          </text>

          <rect x={216} y={828} width={188} height={76} rx={12} fill="#f8fafc" stroke="#cbd5e1" strokeWidth={1.2} />
          <SvgIcon name="chart" x={230} y={844} size={20} color="#1d4ed8" />
          <text x={258} y={854} fontSize="12.5" fontWeight="700" fill="#0f172a">
            Observability
          </text>
          <text x={230} y={880} fontSize="10.5" fill="#475569">
            Usage, cost,
          </text>
          <text x={230} y={894} fontSize="10.5" fill="#475569">
            and audit
          </text>
        </svg>
      </div>
      <figcaption className="mt-3 text-center text-sm text-slate-500">
        Every caller reaches models, tools, and data through one governed layer. Databricks implements it as Unity AI
        Gateway, Snowflake as Cortex AI Gateway, and Azure as API Management&apos;s AI gateway. Scroll sideways on
        small screens.
      </figcaption>
    </figure>
  );
}
