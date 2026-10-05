import type { ReactNode } from "react";

const DATABRICKS_LOGO = "https://cdn.simpleicons.org/databricks";

const COLOR = {
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
  dbx: "#e5522f",
};

type IconName =
  | "user"
  | "folderGit"
  | "play"
  | "commit"
  | "branch"
  | "pullRequest"
  | "check"
  | "rocket"
  | "shieldCheck"
  | "key"
  | "database"
  | "pipeline"
  | "bundle";

// Stroke icons on a 24×24 grid, shared by the SVG diagram and the HTML cards.
function IconPaths({ name }: { name: IconName }) {
  switch (name) {
    case "user":
      return (
        <>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1" />
        </>
      );
    case "folderGit":
      return (
        <>
          <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <circle cx="9.5" cy="13" r="1.4" />
          <circle cx="15" cy="11" r="1.4" />
          <path d="M9.5 11.6V15M15 12.4a3 3 0 0 1-3 3H9.5" />
        </>
      );
    case "play":
      return (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M10 8.5l5.5 3.5-5.5 3.5z" />
        </>
      );
    case "commit":
      return (
        <>
          <circle cx="12" cy="12" r="3.2" />
          <path d="M3 12h5.8M15.2 12H21" />
        </>
      );
    case "branch":
      return (
        <>
          <circle cx="6" cy="5" r="2" />
          <circle cx="6" cy="19" r="2" />
          <circle cx="18" cy="8" r="2" />
          <path d="M6 7v10M18 10a6 6 0 0 1-6 6H8" />
        </>
      );
    case "pullRequest":
      return (
        <>
          <circle cx="6" cy="6" r="2.4" />
          <circle cx="6" cy="18" r="2.4" />
          <circle cx="18" cy="18" r="2.4" />
          <path d="M6 8.4v7.2M18 15.6V9a3 3 0 0 0-3-3h-4M13 3.5L10.5 6 13 8.5" />
        </>
      );
    case "check":
      return (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M8 12.2l2.8 2.8L16.2 9.5" />
        </>
      );
    case "rocket":
      return (
        <>
          <path d="M12 2.8c3.2 2 5 5.8 5 10l-2 3H9l-2-3c0-4.2 1.8-8 5-10z" />
          <circle cx="12" cy="10" r="1.8" />
          <path d="M9.5 19l-1 2.4M14.5 19l1 2.4M12 19v2.6" />
        </>
      );
    case "shieldCheck":
      return (
        <>
          <path d="M12 3l8 3v6c0 4.5-3.4 8.2-8 9-4.6-.8-8-4.5-8-9V6z" />
          <path d="M8.6 12l2.4 2.4 4.4-4.8" />
        </>
      );
    case "key":
      return (
        <>
          <circle cx="8" cy="15" r="4" />
          <path d="M11 12l8.5-8.5M16 7l2.2 2.2M14 9l2 2" />
        </>
      );
    case "database":
      return (
        <>
          <ellipse cx="12" cy="5" rx="8" ry="3" />
          <path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" />
        </>
      );
    case "pipeline":
      return (
        <>
          <rect x="2.5" y="9" width="5" height="6" rx="1.2" />
          <rect x="9.5" y="9" width="5" height="6" rx="1.2" />
          <rect x="16.5" y="9" width="5" height="6" rx="1.2" />
          <path d="M7.5 12h2M14.5 12h2" />
        </>
      );
    case "bundle":
      return (
        <>
          <path d="M12 2.8l8 4.4v9.6l-8 4.4-8-4.4V7.2z" />
          <path d="M4 7.2l8 4.4 8-4.4M12 11.6V21" />
        </>
      );
  }
}

// HTML icon for cards and lists.
export function Icon({ name, className = "h-5 w-5" }: { name: IconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <IconPaths name={name} />
    </svg>
  );
}

// Icon placed inside the SVG diagram at (x, y), drawn at `size` px.
function SvgIcon({ name, x, y, size = 20, color }: { name: IconName; x: number; y: number; size?: number; color: string }) {
  return (
    <g
      transform={`translate(${x} ${y}) scale(${size / 24})`}
      fill="none"
      stroke={color}
      strokeWidth={1.9}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <IconPaths name={name} />
    </g>
  );
}

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

// A white card with an icon chip, a title, and a subtitle.
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

function WorkspaceNode({
  x,
  y,
  name,
  catalog,
  note,
  color,
  soft,
}: {
  x: number;
  y: number;
  name: string;
  catalog: string;
  note: string;
  color: string;
  soft: string;
}) {
  return (
    <g>
      <rect x={x} y={y} width={190} height={92} rx={12} fill="#fff" stroke={color} strokeWidth={1.6} />
      <rect x={x} y={y} width={190} height={30} rx={12} fill={soft} />
      <rect x={x} y={y + 18} width={190} height={12} fill={soft} />
      <image href={DATABRICKS_LOGO} x={x + 10} y={y + 5} width={20} height={20} />
      <text x={x + 38} y={y + 20} fontSize="12" fontWeight="700" fill={color}>
        {name}
      </text>
      <SvgIcon name="database" x={x + 12} y={y + 40} size={16} color={color} />
      <text x={x + 34} y={y + 53} fontSize="11" fill={COLOR.ink}>
        catalog{" "}
        <tspan fontFamily="ui-monospace, monospace" fontWeight="700">
          {catalog}
        </tspan>
      </text>
      <text x={x + 12} y={y + 77} fontSize="10.5" fill={COLOR.muted}>
        {note}
      </text>
    </g>
  );
}

function LaneLabel({ y, h, icon, title, color }: { y: number; h: number; icon: IconName | "databricks"; title: string; color: string }) {
  const cy = y + h / 2;
  return (
    <g>
      {icon === "databricks" ? (
        <image href={DATABRICKS_LOGO} x={14} y={cy - 26} width={24} height={24} />
      ) : (
        <SvgIcon name={icon} x={14} y={cy - 26} size={24} color={color} />
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

// Swimlane CI/CD diagram: developer → Azure Repos → Azure Pipelines → Databricks workspaces.
function PipelineFlow() {
  return (
    <figure className="mt-6 rounded-xl border border-slate-200 bg-white p-3 sm:p-4">
      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 1310 560"
          className="h-auto w-full min-w-[880px]"
          role="img"
          aria-label="CI/CD flow: a developer branches and edits in a Databricks Git folder, runs on dev data, and pushes to Azure Repos; a pull request runs validation; merging to main deploys to the Test/Cert workspace; after approval the pipeline deploys to the Prod workspace as a service principal"
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
          <rect x={0} y={390} width={1310} height={160} rx={14} fill="#fff7f3" />
          <LaneLabel y={10} h={120} icon="user" title="Developer" color={COLOR.ink} />
          <LaneLabel y={140} h={110} icon="branch" title="Azure Repos" color={COLOR.azure} />
          <LaneLabel y={260} h={120} icon="pipeline" title="Azure Pipelines" color={COLOR.azure} />
          <LaneLabel y={390} h={160} icon="databricks" title="Databricks" color={COLOR.dbx} />

          {/* Developer lane */}
          <FlowNode x={130} y={40} w={150} icon="folderGit" title="Branch + edit" sub="Git folder, Dev" color={COLOR.dev} soft={COLOR.devSoft} step={1} />
          <Arrow d="M282 70 H293" />
          <FlowNode x={295} y={40} w={150} icon="play" title="Run & test" sub="on dev data" color={COLOR.dev} soft={COLOR.devSoft} step={2} />
          <Arrow d="M447 70 H458" />
          <FlowNode x={460} y={40} w={150} icon="commit" title="Commit & push" sub="from the Git folder" color={COLOR.dev} soft={COLOR.devSoft} step={3} />

          {/* Azure Repos lane: main + feature branch git graph */}
          <path d="M130 225 H1295" stroke={COLOR.azure} strokeWidth={3} strokeLinecap="round" />
          <text x={134} y={243} fontSize="10.5" fontFamily="ui-monospace, monospace" fontWeight="700" fill={COLOR.azure}>
            main
          </text>
          <path d="M160 225 C186 225 186 172 212 172 H640" fill="none" stroke={COLOR.dev} strokeWidth={2.5} />
          <text x={222} y={164} fontSize="10.5" fontFamily="ui-monospace, monospace" fontWeight="700" fill={COLOR.dev}>
            feature/loyalty-tier
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

          {/* Databricks lane */}
          <Arrow d="M370 102 V416" dashed />
          <text x={376} y={402} fontSize="10" fontWeight="600" fill={COLOR.muted}>
            your copy
          </text>
          <WorkspaceNode x={275} y={420} name="Dev workspace" catalog="dev" note="You develop and test here" color={COLOR.dev} soft={COLOR.devSoft} />

          <Arrow d="M910 352 V416" color={COLOR.azure} />
          <SvgIcon name="key" x={918} y={370} size={15} color={COLOR.cert} />
          <text x={937} y={382} fontSize="10" fontWeight="600" fill={COLOR.cert}>
            service principal
          </text>
          <WorkspaceNode x={815} y={420} name="Test/Cert workspace" catalog="cert" note="Integration tests · UAT" color={COLOR.cert} soft={COLOR.certSoft} />

          <Arrow d="M1215 352 V416" color={COLOR.azure} />
          <SvgIcon name="key" x={1089} y={370} size={15} color={COLOR.prod} />
          <text x={1108} y={382} fontSize="10" fontWeight="600" fill={COLOR.prod}>
            service principal
          </text>
          <WorkspaceNode x={1110} y={420} name="Prod workspace" catalog="prod" note="Scheduled · runs as SP" color={COLOR.prod} soft={COLOR.prodSoft} />
        </svg>
      </div>
      <div className="mt-3 rounded-lg bg-slate-900 px-3 py-2 text-center text-xs text-slate-200">
        <span className="font-semibold text-white">One source of truth:</span> the same commit on{" "}
        <span className="font-mono">main</span> is deployed to Test/Cert, then Prod — only the bundle target changes.
      </div>
      <figcaption className="mt-3 text-center text-sm text-slate-500">
        A feature&apos;s path from a developer&apos;s branch to production. Steps ① to ⑥ match the walkthrough below.
        Scroll sideways on small screens.
      </figcaption>
    </figure>
  );
}

const TOOLCHAIN: { name: string; role: string; icon: IconName; color: string }[] = [
  { name: "Azure Repos", role: "Git repository — branches, pull requests, branch policies", icon: "branch", color: "text-[#0078D4]" },
  { name: "Databricks Git folders", role: "Your branch, checked out inside the workspace, next to the notebooks", icon: "folderGit", color: "text-sky-600" },
  { name: "Databricks Asset Bundles", role: "databricks.yml describes jobs, pipelines, and per-environment settings as code", icon: "bundle", color: "text-orange-600" },
  { name: "Azure Pipelines", role: "Tests the code and deploys the bundle to each workspace", icon: "pipeline", color: "text-[#0078D4]" },
  { name: "Service principal", role: "The non-human identity that deploys to and runs jobs in Test/Cert and Prod", icon: "key", color: "text-amber-600" },
];

function Code({ title, children }: { title: string; children: string }) {
  return (
    <div className="mt-4 overflow-hidden rounded-xl bg-slate-900">
      <div className="border-b border-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
        {title}
      </div>
      <pre className="overflow-x-auto p-4 text-xs leading-relaxed text-slate-100">{children}</pre>
    </div>
  );
}

function Step({
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

export function DatabricksDevOpsFlow() {
  return (
    <div className="border-t border-slate-200 py-8">
      <h2 className="text-2xl font-semibold text-slate-900">CI/CD for Data Engineers with Azure DevOps</h2>
      <p className="mt-3 text-slate-600">
        How a data engineer takes a change from a notebook in the Dev workspace to production. The code lives in{" "}
        <strong className="font-semibold text-slate-900">Azure Repos</strong>, you edit it in a{" "}
        <strong className="font-semibold text-slate-900">Git folder</strong> inside Databricks, and{" "}
        <strong className="font-semibold text-slate-900">Azure Pipelines</strong> promotes the same commit through
        Test/Cert and Prod using <strong className="font-semibold text-slate-900">Databricks Asset Bundles</strong>.
      </p>

      <PipelineFlow />

      <div className="mt-6 rounded-xl border border-indigo-200 bg-indigo-50/60 p-4">
        <p className="font-semibold text-slate-900">Using GitHub or GitLab instead? The process is the same.</p>
        <p className="mt-1 text-sm text-slate-600">
          This flow is shown with Azure DevOps, but it holds just as well for GitHub or GitLab. Only the tool names
          change — branch, pull request, validate, deploy to Test/Cert, approve, deploy to Prod stays exactly the same.
          Databricks Git folders connect to all three, and the Asset Bundle in your repo doesn&apos;t change at all.
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
                ["Deploy to Databricks", "databricks bundle deploy", "databricks bundle deploy", "databricks bundle deploy"],
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

      <h3 className="mt-8 text-lg font-semibold text-slate-900">The toolchain</h3>
      <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {TOOLCHAIN.map((tool) => (
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

      <h3 className="mt-8 text-lg font-semibold text-slate-900">The repo</h3>
      <p className="mt-3 text-slate-600">
        One repo holds the notebooks, the shared Python code, the tests, and the deployment definitions. Nothing about a
        job is configured by hand in a workspace — it&apos;s all in the repo.
      </p>
      <div className="grid gap-4 lg:grid-cols-2">
        <Code title="Repo layout · Azure Repos">{`retail-pipelines/
├── databricks.yml          # bundle: one target per environment
├── resources/
│   └── loyalty_job.yml     # job, tasks, and compute as code
├── src/
│   ├── notebooks/
│   │   └── build_loyalty_tiers.py
│   └── retail/
│       └── transforms.py   # logic you can unit test
├── tests/
│   └── test_transforms.py
└── azure-pipelines.yml     # CI/CD pipeline`}</Code>
        <Code title="databricks.yml · one bundle, three targets">{`bundle:
  name: retail-pipelines

include:
  - resources/*.yml

variables:
  catalog:
    default: dev

targets:
  dev:
    mode: development   # names prefixed with your user, schedules paused
    default: true
    workspace: { host: https://adb-dev.azuredatabricks.net }
  cert:                 # Test/Cert
    workspace: { host: https://adb-cert.azuredatabricks.net }
    variables: { catalog: cert }
  prod:
    mode: production
    workspace: { host: https://adb-prod.azuredatabricks.net }
    variables: { catalog: prod }
    run_as:
      service_principal_name: <application-id>`}</Code>
      </div>

      <h3 className="mt-8 text-lg font-semibold text-slate-900">A feature&apos;s journey, step by step</h3>
      <p className="mt-3 text-slate-600">
        Say you&apos;re adding a new <span className="font-mono text-sm">loyalty_tier</span> column to the customer
        table. Here is everything that happens, and where.
      </p>
      <ol className="mt-4 space-y-3">
        <Step n={1} icon="folderGit" title="Branch" where="Dev workspace · Git folder">
          In your Git folder for <span className="font-mono">retail-pipelines</span>, create{" "}
          <span className="font-mono">feature/loyalty-tier</span> from <span className="font-mono">main</span>. The
          branch exists in Azure Repos; the Git folder is your working copy inside Databricks.
        </Step>
        <Step n={2} icon="play" title="Build and try it" where="Dev workspace · all-purpose cluster">
          Edit <span className="font-mono">build_loyalty_tiers.py</span> and{" "}
          <span className="font-mono">transforms.py</span>, run the notebook against the{" "}
          <span className="font-mono">dev</span> catalog, and add a unit test. To run the whole job the way the
          pipeline will, deploy your own copy with{" "}
          <span className="font-mono">databricks bundle deploy -t dev</span> — development mode prefixes it with your
          name and pauses its schedule, so it can&apos;t collide with anyone else.
        </Step>
        <Step n={3} icon="commit" title="Commit and push" where="Git folder → Azure Repos">
          Commit and push from the Git folder (or your IDE). Your branch in Azure Repos now has the change.
        </Step>
        <Step n={4} icon="pullRequest" title="Open a pull request" where="Azure Repos · build validation">
          Branch policies on <span className="font-mono">main</span> require a reviewer and a passing build. The
          validation pipeline runs linting, <span className="font-mono">pytest</span>, and{" "}
          <span className="font-mono">databricks bundle validate</span>. Nothing is deployed yet.
        </Step>
        <Step n={5} icon="rocket" title="Merge → Test/Cert" where="Azure Pipelines · Test/Cert workspace">
          Merging to <span className="font-mono">main</span> triggers the pipeline. It deploys the bundle to Test/Cert
          as the service principal and runs the job end to end on the <span className="font-mono">cert</span> catalog;
          a failure stops the release here. Business users then validate the new column on production-like data —
          the sign-off that it&apos;s right, not just that it runs.
        </Step>
        <Step n={6} icon="shieldCheck" title="Approve → Prod" where="Azure Pipelines · Prod workspace">
          A final approval, inside the agreed change window, deploys to Prod. The job runs as the service principal
          on its normal schedule. Rolling back means redeploying the previous commit.
        </Step>
      </ol>

      <h3 className="mt-8 text-lg font-semibold text-slate-900">The pipeline</h3>
      <p className="mt-3 text-slate-600">
        One multi-stage YAML pipeline. Pull-request validation is switched on with a branch policy in Azure Repos;
        Test/Cert deploys automatically, and an approval on the Azure Pipelines <em>environment</em> makes Prod wait
        for a person.
      </p>
      <Code title="azure-pipelines.yml (simplified)">{`trigger:
  branches: { include: [main] }   # PR validation: set as a branch policy on main

stages:
- stage: Validate
  jobs:
  - job: checks
    steps:
    - script: pip install -r requirements-dev.txt && pytest tests/
    - script: databricks bundle validate -t cert

- stage: TestCert
  dependsOn: Validate
  condition: and(succeeded(), eq(variables['Build.SourceBranch'], 'refs/heads/main'))
  jobs:
  - deployment: deploy
    environment: databricks-cert
    strategy:
      runOnce:
        deploy:
          steps:
          - checkout: self
          - script: |
              databricks bundle deploy -t cert
              databricks bundle run -t cert loyalty_job

- stage: Prod
  dependsOn: TestCert
  jobs:
  - deployment: deploy
    environment: databricks-prod   # approval + business-hours check
    strategy:
      runOnce:
        deploy:
          steps:
          - checkout: self
          - script: databricks bundle deploy -t prod`}</Code>
      <p className="mt-2 text-xs text-slate-500">
        Each deploy step authenticates as the service principal — for example through an Azure service connection
        with the Azure CLI task — and installs the Databricks CLI first. Those steps are left out to keep the flow
        readable.
      </p>

      <h3 className="mt-8 text-lg font-semibold text-slate-900">Guardrails that make it safe</h3>
      <ul className="mt-3 space-y-2 text-slate-600">
        {[
          ["Main is protected", "No direct pushes; every change arrives through a reviewed pull request with a passing build."],
          ["Hands off past Dev", "People can read Test/Cert and Prod, but only the service principal deploys there. No hotfixing in a workspace."],
          ["Same artifact everywhere", "The commit that passed Test/Cert is the one that reaches Prod — environments differ only by bundle target."],
          ["Data stays in its lane", "Each workspace is bound to its own catalog, so a Test/Cert run can never write to Prod data."],
          ["Secrets out of the repo", "Credentials come from Azure Key Vault and pipeline variable groups, never from code or notebooks."],
        ].map(([title, body]) => (
          <li key={title} className="flex gap-2">
            <span className="text-indigo-500">•</span>
            <span>
              <strong className="font-semibold text-slate-900">{title}</strong> — {body}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
