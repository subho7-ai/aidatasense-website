import type { ReactNode } from "react";
import { Icon, type IconName, SvgIcon } from "./diagramIcons";

// Shared building blocks for the per-platform CI/CD sections (Databricks, Snowflake, …).

export const CICD_COLOR = {
  azure: "#0078D4",
  azureSoft: "#E8F2FC",
  ink: "#0f172a",
  muted: "#64748b",
  line: "#cbd5e1",
  green: "#15803d",
  greenSoft: "#dcfce7",
  badge: "#4f46e5",
  dev: "#0284c7",
  devSoft: "#e0f2fe",
  cert: "#b45309",
  certSoft: "#fef3c7",
  prod: "#be123c",
  prodSoft: "#ffe4e6",
};
const COLOR = CICD_COLOR;

export type PipelineFlowConfig = {
  /** Platform shown in the bottom lane, e.g. "Databricks". */
  platform: string;
  platformLogo: string;
  platformColor: string;
  platformLaneFill: string;
  /** Subtitles for the three developer steps: branch + edit, run & test, commit & push. */
  devSubs: [string, string, string];
  /** What one environment is called on this platform, e.g. "workspace" or "account". */
  envNoun: string;
  /** Where data lives inside an environment, e.g. "catalog" or "database". */
  containerNoun: string;
  /** Data container name per environment: dev, Test/Cert, Prod. */
  containers: [string, string, string];
  /** Non-human deploy identity, e.g. "service principal". */
  identity: string;
  /** Short identity used in the Prod note, e.g. "SP". */
  identityShort: string;
  /** Ends the "one source of truth" band: "…only the ___ changes." */
  whatChanges: string;
  ariaLabel: string;
  /** Omit the "match the walkthrough below" sentence when there's no numbered walkthrough on the page. */
  hasWalkthroughBelow?: boolean;
  /** Feature branch name shown in the git graph; defaults to "feature/loyalty-tier". */
  featureBranchName?: string;
  /** Note shown under the Prod environment; defaults to "Scheduled · runs as {identityShort}". */
  prodNote?: string;
};

function StepBadge({ n, x, y }: { n: number; x: number; y: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={11} fill={COLOR.badge} stroke="#fff" strokeWidth={2} />
      <text x={x} y={y + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">
        {n}
      </text>
    </g>
  );
}

function FlowNode({
  x,
  y,
  w,
  icon,
  title,
  sub,
  color,
  soft,
  step,
}: {
  x: number;
  y: number;
  w: number;
  icon: IconName;
  title: string;
  sub: string;
  color: string;
  soft: string;
  step?: number;
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={60} rx={12} fill="#fff" stroke={COLOR.line} />
      <rect x={x} y={y} width={5} height={60} rx={2.5} fill={color} />
      <circle cx={x + 30} cy={y + 30} r={17} fill={soft} />
      <SvgIcon name={icon} x={x + 19} y={y + 19} size={22} color={color} />
      <text x={x + 56} y={y + 27} fontSize="12.5" fontWeight="700" fill={COLOR.ink}>
        {title}
      </text>
      <text x={x + 56} y={y + 44} fontSize="10.5" fill={COLOR.muted}>
        {sub}
      </text>
      {step !== undefined && <StepBadge n={step} x={x + w - 4} y={y + 2} />}
    </g>
  );
}

function EnvironmentNode({
  x,
  y,
  logo,
  name,
  containerNoun,
  container,
  note,
  color,
  soft,
}: {
  x: number;
  y: number;
  logo: string;
  name: string;
  containerNoun: string;
  container: string;
  note: string;
  color: string;
  soft: string;
}) {
  return (
    <g>
      <rect x={x} y={y} width={190} height={92} rx={12} fill="#fff" stroke={color} strokeWidth={1.6} />
      <rect x={x} y={y} width={190} height={30} rx={12} fill={soft} />
      <rect x={x} y={y + 18} width={190} height={12} fill={soft} />
      <image href={logo} x={x + 10} y={y + 5} width={20} height={20} />
      <text x={x + 38} y={y + 20} fontSize="12" fontWeight="700" fill={color}>
        {name}
      </text>
      <SvgIcon name="database" x={x + 12} y={y + 40} size={16} color={color} />
      <text x={x + 34} y={y + 53} fontSize="11" fill={COLOR.ink}>
        {containerNoun}{" "}
        <tspan fontFamily="ui-monospace, monospace" fontWeight="700">
          {container}
        </tspan>
      </text>
      <text x={x + 12} y={y + 77} fontSize="10.5" fill={COLOR.muted}>
        {note}
      </text>
    </g>
  );
}

function LaneLabel({
  y,
  h,
  icon,
  logo,
  title,
  color,
}: {
  y: number;
  h: number;
  icon?: IconName;
  logo?: string;
  title: string;
  color: string;
}) {
  const cy = y + h / 2;
  return (
    <g>
      {logo ? (
        <image href={logo} x={14} y={cy - 26} width={24} height={24} />
      ) : (
        icon && <SvgIcon name={icon} x={14} y={cy - 26} size={24} color={color} />
      )}
      <text x={14} y={cy + 14} fontSize="12" fontWeight="700" fill={color}>
        {title}
      </text>
    </g>
  );
}

function Arrow({ d, dashed = false, color = COLOR.muted }: { d: string; dashed?: boolean; color?: string }) {
  return (
    <path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={1.8}
      strokeDasharray={dashed ? "5 4" : undefined}
      markerEnd={`url(#devops-arrow-${color === COLOR.azure ? "azure" : color === COLOR.green ? "green" : "muted"})`}
    />
  );
}

// Swimlane CI/CD diagram: developer → Azure Repos → Azure Pipelines → the platform's environments.
export function PipelineFlow({ config }: { config: PipelineFlowConfig }) {
  const env = (label: string) => `${label} ${config.envNoun}`;
  return (
    <figure className="mt-6 rounded-xl border border-slate-200 bg-white p-3 sm:p-4">
      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 1310 560"
          className="h-auto w-full min-w-[880px]"
          role="img"
          aria-label={config.ariaLabel}
          fontFamily="Inter, system-ui, sans-serif"
        >
          <defs>
            {[
              ["muted", COLOR.muted],
              ["azure", COLOR.azure],
              ["green", COLOR.green],
            ].map(([id, color]) => (
              <marker
                key={id}
                id={`devops-arrow-${id}`}
                viewBox="0 0 10 10"
                refX="9"
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto-start-reverse"
              >
                <path d="M0 0L10 5L0 10z" fill={color} />
              </marker>
            ))}
          </defs>

          {/* Swimlanes */}
          <rect x={0} y={10} width={1310} height={120} rx={14} fill="#f8fafc" />
          <rect x={0} y={140} width={1310} height={110} rx={14} fill={COLOR.azureSoft} />
          <rect x={0} y={260} width={1310} height={120} rx={14} fill="#f0f7fd" />
          <rect x={0} y={390} width={1310} height={160} rx={14} fill={config.platformLaneFill} />
          <LaneLabel y={10} h={120} icon="user" title="Developer" color={COLOR.ink} />
          <LaneLabel y={140} h={110} icon="branch" title="Azure Repos" color={COLOR.azure} />
          <LaneLabel y={260} h={120} icon="pipeline" title="Azure Pipelines" color={COLOR.azure} />
          <LaneLabel y={390} h={160} logo={config.platformLogo} title={config.platform} color={config.platformColor} />

          {/* Developer lane */}
          <FlowNode x={130} y={40} w={150} icon="folderGit" title="Branch + edit" sub={config.devSubs[0]} color={COLOR.dev} soft={COLOR.devSoft} step={1} />
          <Arrow d="M282 70 H293" />
          <FlowNode x={295} y={40} w={150} icon="play" title="Run & test" sub={config.devSubs[1]} color={COLOR.dev} soft={COLOR.devSoft} step={2} />
          <Arrow d="M447 70 H458" />
          <FlowNode x={460} y={40} w={150} icon="commit" title="Commit & push" sub={config.devSubs[2]} color={COLOR.dev} soft={COLOR.devSoft} step={3} />

          {/* Azure Repos lane: main + feature branch git graph */}
          <path d="M130 225 H1295" stroke={COLOR.azure} strokeWidth={3} strokeLinecap="round" />
          <text x={134} y={243} fontSize="10.5" fontFamily="ui-monospace, monospace" fontWeight="700" fill={COLOR.azure}>
            main
          </text>
          <path d="M160 225 C186 225 186 172 212 172 H640" fill="none" stroke={COLOR.dev} strokeWidth={2.5} />
          <text x={222} y={164} fontSize="10.5" fontFamily="ui-monospace, monospace" fontWeight="700" fill={COLOR.dev}>
            {config.featureBranchName ?? "feature/loyalty-tier"}
          </text>
          {[300, 420, 535].map((cx) => (
            <circle key={cx} cx={cx} cy={172} r={5.5} fill="#fff" stroke={COLOR.dev} strokeWidth={2.5} />
          ))}
          <circle cx={160} cy={225} r={6} fill="#fff" stroke={COLOR.azure} strokeWidth={3} />
          <Arrow d="M535 101 V163" color={COLOR.azure} />
          <text x={541} y={140} fontSize="10" fontWeight="600" fill={COLOR.azure}>
            git push
          </text>

          {/* Pull request */}
          <rect x={640} y={150} width={150} height={44} rx={10} fill="#fff" stroke={COLOR.azure} strokeWidth={1.6} />
          <SvgIcon name="pullRequest" x={651} y={160} size={24} color={COLOR.azure} />
          <text x={683} y={169} fontSize="12" fontWeight="700" fill={COLOR.ink}>
            Pull request
          </text>
          <text x={683} y={184} fontSize="10" fill={COLOR.muted}>
            review + checks
          </text>
          <StepBadge n={4} x={786} y={152} />
          <path d="M790 172 C815 172 815 225 840 225" fill="none" stroke={COLOR.dev} strokeWidth={2.5} />
          <circle cx={840} cy={225} r={7} fill={COLOR.azure} stroke="#fff" strokeWidth={2} />
          <text x={850} y={214} fontSize="10" fontWeight="700" fill={COLOR.azure}>
            merge
          </text>

          {/* Azure Pipelines lane */}
          <FlowNode x={630} y={290} w={170} icon="check" title="PR validation" sub="lint · tests · validate" color={COLOR.green} soft={COLOR.greenSoft} />
          <Arrow d="M715 288 V197" dashed color={COLOR.green} />
          <text x={721} y={278} fontSize="10" fontWeight="600" fill={COLOR.green}>
            must pass
          </text>
          <Arrow d="M840 233 V287" color={COLOR.azure} />
          <FlowNode x={830} y={290} w={160} icon="rocket" title="Deploy Test/Cert" sub="auto on merge" color={COLOR.cert} soft={COLOR.certSoft} step={5} />
          <Arrow d="M992 320 H1003" />
          <FlowNode x={1005} y={290} w={110} icon="shieldCheck" title="Approve" sub="release gate" color={COLOR.badge} soft="#e0e7ff" step={6} />
          <Arrow d="M1117 320 H1128" />
          <FlowNode x={1130} y={290} w={170} icon="rocket" title="Deploy Prod" sub="in change window" color={COLOR.prod} soft={COLOR.prodSoft} />

          {/* Platform lane */}
          <Arrow d="M370 102 V416" dashed />
          <text x={376} y={402} fontSize="10" fontWeight="600" fill={COLOR.muted}>
            your copy
          </text>
          <EnvironmentNode x={275} y={420} logo={config.platformLogo} name={env("Dev")} containerNoun={config.containerNoun} container={config.containers[0]} note="You develop and test here" color={COLOR.dev} soft={COLOR.devSoft} />

          <Arrow d="M910 352 V416" color={COLOR.azure} />
          <SvgIcon name="key" x={918} y={370} size={15} color={COLOR.cert} />
          <text x={937} y={382} fontSize="10" fontWeight="600" fill={COLOR.cert}>
            {config.identity}
          </text>
          <EnvironmentNode x={815} y={420} logo={config.platformLogo} name={env("Test/Cert")} containerNoun={config.containerNoun} container={config.containers[1]} note="Integration tests · UAT" color={COLOR.cert} soft={COLOR.certSoft} />

          <Arrow d="M1215 352 V416" color={COLOR.azure} />
          <SvgIcon name="key" x={1089} y={370} size={15} color={COLOR.prod} />
          <text x={1108} y={382} fontSize="10" fontWeight="600" fill={COLOR.prod}>
            {config.identity}
          </text>
          <EnvironmentNode x={1110} y={420} logo={config.platformLogo} name={env("Prod")} containerNoun={config.containerNoun} container={config.containers[2]} note={config.prodNote ?? `Scheduled · runs as ${config.identityShort}`} color={COLOR.prod} soft={COLOR.prodSoft} />
        </svg>
      </div>
      <div className="mt-3 rounded-lg bg-slate-900 px-3 py-2 text-center text-xs text-slate-200">
        <span className="font-semibold text-white">One source of truth:</span> the same commit on{" "}
        <span className="font-mono">main</span> is deployed to Test/Cert, then Prod — only the {config.whatChanges} changes.
      </div>
      <figcaption className="mt-3 text-center text-sm text-slate-500">
        A feature&apos;s path from a developer&apos;s branch to production.
        {config.hasWalkthroughBelow !== false && " Steps ① to ⑥ match the walkthrough below."} Scroll sideways on
        small screens.
      </figcaption>
    </figure>
  );
}

export function Code({ title, children }: { title: string; children: string }) {
  return (
    <div className="mt-4 overflow-hidden rounded-xl bg-slate-900">
      <div className="border-b border-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
        {title}
      </div>
      <pre className="overflow-x-auto p-4 text-xs leading-relaxed text-slate-100">{children}</pre>
    </div>
  );
}

export function Step({
  n,
  icon,
  title,
  where,
  children,
}: {
  n: number;
  icon: IconName;
  title: string;
  where: string;
  children: ReactNode;
}) {
  return (
    <li className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4">
      <div className="relative shrink-0">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
          <Icon name={icon} className="h-5 w-5" />
        </span>
        <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-semibold text-white ring-2 ring-white">
          {n}
        </span>
      </div>
      <div>
        <p className="font-semibold text-slate-900">{title}</p>
        <p className="text-xs font-medium uppercase tracking-wide text-indigo-600">{where}</p>
        <div className="mt-1 text-sm text-slate-600">{children}</div>
      </div>
    </li>
  );
}

export type Tool = { name: string; role: string; icon: IconName; color: string };

export function Toolchain({ tools }: { tools: Tool[] }) {
  return (
    <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {tools.map((tool) => (
        <div key={tool.name} className="flex gap-3 rounded-xl border border-slate-200 bg-white p-3">
          <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-50 ${tool.color}`}>
            <Icon name={tool.icon} className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm font-semibold text-slate-900">{tool.name}</p>
            <p className="mt-0.5 text-xs text-slate-600">{tool.role}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// "Same process on GitHub or GitLab" callout; only the deploy row differs per platform.
export function GitPlatformsCallout({ deployLabel, deployCommand, assetNote }: { deployLabel: string; deployCommand: string; assetNote: string }) {
  return (
    <div className="mt-6 rounded-xl border border-indigo-200 bg-indigo-50/60 p-4">
      <p className="font-semibold text-slate-900">Using GitHub or GitLab instead? The process is the same.</p>
      <p className="mt-1 text-sm text-slate-600">
        This flow is shown with Azure DevOps, but it holds just as well for GitHub or GitLab. Only the tool names change
        — branch, pull request, validate, deploy to Test/Cert, approve, deploy to Prod stays exactly the same. {assetNote}
      </p>
      <div className="mt-3 overflow-x-auto rounded-lg border border-indigo-100 bg-white">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-3 py-2 font-semibold text-slate-900">Step</th>
              <th className="px-3 py-2 font-semibold text-[#0078D4]">Azure DevOps</th>
              <th className="px-3 py-2 font-semibold text-slate-900">GitHub</th>
              <th className="px-3 py-2 font-semibold text-orange-700">GitLab</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-600">
            {[
              ["Code repository", "Azure Repos", "GitHub repository", "GitLab project"],
              ["Review a change", "Pull request", "Pull request", "Merge request"],
              ["Protect main", "Branch policies", "Branch protection rules", "Protected branches"],
              ["CI/CD pipeline", "Azure Pipelines · azure-pipelines.yml", "GitHub Actions · .github/workflows/*.yml", "GitLab CI/CD · .gitlab-ci.yml"],
              ["Approval before Prod", "Environment approvals", "Environment required reviewers", "Protected environment approvals"],
              [deployLabel, deployCommand, deployCommand, deployCommand],
            ].map(([step, ...tools]) => (
              <tr key={step}>
                <td className="px-3 py-2 font-semibold text-slate-900">{step}</td>
                {tools.map((tool, index) => (
                  <td key={index} className="px-3 py-2">
                    {tool}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function Guardrails({ items }: { items: [string, string][] }) {
  return (
    <ul className="mt-3 space-y-2 text-slate-600">
      {items.map(([title, body]) => (
        <li key={title} className="flex gap-2">
          <span className="text-indigo-500">•</span>
          <span>
            <strong className="font-semibold text-slate-900">{title}</strong> — {body}
          </span>
        </li>
      ))}
    </ul>
  );
}
