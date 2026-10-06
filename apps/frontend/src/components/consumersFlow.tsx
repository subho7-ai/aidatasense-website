import type { ReactNode } from "react";
import { Icon, type IconName, SvgIcon } from "./diagramIcons";

// Shared "Data Consumers" section used by each platform page (Databricks, Snowflake, …).

export const INTERNAL = { stroke: "#6366f1", soft: "#eef2ff", text: "#4338ca" };
export const EXTERNAL = { stroke: "#ea580c", soft: "#fff7ed", text: "#c2410c" };

export type Consumer = { label: string; icon: IconName; external?: boolean };

export type Channel = {
  title: string;
  icon: IconName;
  color: string;
  soft: string;
  tools: [string, string];
  consumers: Consumer[];
};

export type ToolItem = { name: string; what: string; icon: IconName };

export type ConsumersConfig = {
  /** Governance layer every path goes through, e.g. "Unity Catalog". */
  governance: string;
  logo: string;
  sourceSubtitle: string;
  sourceItems: [IconName, string][];
  /** Four short lines for the "One set of rules" note in the source panel. */
  rulesLines: [string, string, string, string];
  channels: Channel[];
  intro: ReactNode;
  internalSubtitle: string;
  internalTools: ToolItem[];
  externalTools: ToolItem[];
  decisions: [string, string, string][];
  ruleOfThumb: ReactNode;
  ariaLabel: string;
};

const ROW_GAP = 118;
const FIRST_ROW = 82;

function ConsumersFlow({ config }: { config: ConsumersConfig }) {
  return (
    <figure className="mt-6 rounded-xl border border-slate-200 bg-white p-3 sm:p-4">
      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 1300 640"
          className="h-auto w-full min-w-[860px]"
          role="img"
          aria-label={config.ariaLabel}
          fontFamily="Inter, system-ui, sans-serif"
        >
          <defs>
            <marker id="consumers-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
              <path d="M0 0L10 5L0 10z" fill="#94a3b8" />
            </marker>
          </defs>

          {/* Source: governed data */}
          <rect x={16} y={30} width={250} height={578} rx={16} fill="#fff8eb" stroke="#e3b56e" strokeWidth={1.5} />
          <rect x={16} y={30} width={250} height={64} rx={16} fill="#f7d8a8" />
          <rect x={16} y={78} width={250} height={16} fill="#f7d8a8" />
          <image href={config.logo} x={30} y={46} width={30} height={30} />
          <text x={70} y={60} fontSize="14" fontWeight="700" fill="#6b4310">
            {config.governance}
          </text>
          <text x={70} y={78} fontSize="11" fill="#7a5520">
            {config.sourceSubtitle}
          </text>
          {config.sourceItems.map(([icon, label], index) => (
            <g key={label}>
              <rect x={34} y={118 + index * 56} width={214} height={44} rx={10} fill="#fff" stroke="#ecd9b5" />
              <SvgIcon name={icon} x={46} y={129 + index * 56} size={22} color="#b45309" />
              <text x={80} y={145 + index * 56} fontSize="12.5" fontWeight="600" fill="#0f172a">
                {label}
              </text>
            </g>
          ))}
          <rect x={34} y={470} width={214} height={120} rx={12} fill="#fff" stroke="#ecd9b5" strokeDasharray="5 4" />
          <SvgIcon name="shieldCheck" x={46} y={484} size={24} color="#15803d" />
          <text x={80} y={498} fontSize="12" fontWeight="700" fill="#15803d">
            One set of rules
          </text>
          {config.rulesLines.map((line, index) => (
            <text key={line} x={46} y={524 + index * 16} fontSize="11" fill="#475569">
              {line}
            </text>
          ))}

          {/* Column headings */}
          <text x={330} y={20} fontSize="11" fontWeight="700" fill="#64748b" letterSpacing="1">
            HOW IT&apos;S CONSUMED
          </text>
          <text x={700} y={20} fontSize="11" fontWeight="700" fill="#64748b" letterSpacing="1">
            WHO CONSUMES IT
          </text>
          <circle cx={900} cy={16} r={5} fill={INTERNAL.soft} stroke={INTERNAL.stroke} strokeWidth={2} />
          <text x={910} y={20} fontSize="11" fill={INTERNAL.text} fontWeight="600">
            Internal
          </text>
          <circle cx={975} cy={16} r={5} fill={EXTERNAL.soft} stroke={EXTERNAL.stroke} strokeWidth={2} />
          <text x={985} y={20} fontSize="11" fill={EXTERNAL.text} fontWeight="600">
            External
          </text>

          {config.channels.map((channel, row) => {
            const yc = FIRST_ROW + row * ROW_GAP;
            return (
              <g key={channel.title}>
                {/* Governance layer → channel */}
                <path d={`M268 ${yc} H326`} stroke="#94a3b8" strokeWidth={1.8} markerEnd="url(#consumers-arrow)" />

                {/* Channel */}
                <rect x={330} y={yc - 46} width={310} height={92} rx={12} fill="#fff" stroke="#cbd5e1" />
                <rect x={330} y={yc - 46} width={5} height={92} rx={2.5} fill={channel.color} />
                <circle cx={362} cy={yc - 14} r={18} fill={channel.soft} />
                <SvgIcon name={channel.icon} x={350} y={yc - 26} size={24} color={channel.color} />
                <text x={392} y={yc - 18} fontSize="13.5" fontWeight="700" fill="#0f172a">
                  {channel.title}
                </text>
                <text x={348} y={yc + 14} fontSize="11" fill="#475569">
                  {channel.tools[0]}
                </text>
                <text x={348} y={yc + 31} fontSize="11" fill="#475569">
                  {channel.tools[1]}
                </text>

                {/* Channel → consumers */}
                <path d={`M642 ${yc} H692`} stroke="#94a3b8" strokeWidth={1.8} markerEnd="url(#consumers-arrow)" />
                <rect x={696} y={yc - 32} width={590} height={64} rx={14} fill="#f8fafc" />
                {channel.consumers.map((consumer, index) => {
                  const tone = consumer.external ? EXTERNAL : INTERNAL;
                  const x = 708 + index * 192;
                  return (
                    <g key={consumer.label}>
                      <rect x={x} y={yc - 20} width={182} height={40} rx={20} fill="#fff" stroke={tone.stroke} strokeWidth={1.6} />
                      <circle cx={x + 20} cy={yc} r={13} fill={tone.soft} />
                      <SvgIcon name={consumer.icon} x={x + 11} y={yc - 9} size={18} color={tone.text} />
                      <text x={x + 40} y={yc + 4} fontSize="11.5" fontWeight="600" fill="#0f172a">
                        {consumer.label}
                      </text>
                    </g>
                  );
                })}
              </g>
            );
          })}
        </svg>
      </div>
      <figcaption className="mt-3 text-center text-sm text-slate-500">
        Five ways governed data leaves the platform, and who typically sits at the end of each. Scroll sideways on
        small screens.
      </figcaption>
    </figure>
  );
}

function ToolList({
  title,
  subtitle,
  tools,
  tone,
}: {
  title: string;
  subtitle: string;
  tools: ToolItem[];
  tone: { stroke: string; soft: string; text: string };
}) {
  return (
    <div className="rounded-xl border bg-white p-4" style={{ borderColor: tone.stroke }}>
      <p className="font-semibold" style={{ color: tone.text }}>
        {title}
      </p>
      <p className="text-xs text-slate-500">{subtitle}</p>
      <ul className="mt-3 space-y-2.5">
        {tools.map((tool) => (
          <li key={tool.name} className="flex gap-3">
            <span
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
              style={{ background: tone.soft, color: tone.text }}
            >
              <Icon name={tool.icon} className="h-4 w-4" />
            </span>
            <div>
              <p className="text-sm font-semibold text-slate-900">{tool.name}</p>
              <p className="text-xs text-slate-600">{tool.what}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function DataConsumersSection({ platform, config }: { platform: string; config: ConsumersConfig }) {
  return (
    <div id="consumers" className="scroll-mt-[180px] border-t border-slate-200 py-8">
      <h2 className="text-2xl font-semibold text-slate-900">Data Consumers</h2>
      <p className="mt-3 text-slate-600">{config.intro}</p>

      <ConsumersFlow config={config} />

      <h3 className="mt-8 text-lg font-semibold text-slate-900">Internal and external tools</h3>
      <p className="mt-3 text-slate-600">
        <strong className="font-semibold text-slate-900">Internal tools</strong> are built into {platform}.{" "}
        <strong className="font-semibold text-slate-900">External tools</strong> live outside it and connect in through
        a warehouse, an API, or a share.
      </p>
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <ToolList
          title={`Internal — built into ${platform}`}
          subtitle={config.internalSubtitle}
          tools={config.internalTools}
          tone={INTERNAL}
        />
        <ToolList
          title="External — connect from outside"
          subtitle="Third-party tools and code, authenticated as users or service identities"
          tools={config.externalTools}
          tone={EXTERNAL}
        />
      </div>

      <h3 className="mt-8 text-lg font-semibold text-slate-900">Which path should I use?</h3>
      <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 font-semibold text-slate-900">Who needs the data</th>
              <th className="px-4 py-3 font-semibold text-slate-900">Use</th>
              <th className="px-4 py-3 font-semibold text-slate-900">Why</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {config.decisions.map(([who, use, why]) => (
              <tr key={who}>
                <td className="px-4 py-3 font-medium text-slate-900">{who}</td>
                <td className="px-4 py-3 text-slate-600">{use}</td>
                <td className="px-4 py-3 text-slate-600">{why}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
        <strong className="font-semibold">Rule of thumb:</strong> {config.ruleOfThumb}
      </p>
    </div>
  );
}
