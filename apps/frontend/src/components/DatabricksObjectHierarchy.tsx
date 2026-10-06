import type { ReactNode } from "react";
import { ComparisonTable } from "./ComparisonTable";

// Tags tie an access object to what depends on it; the violet matches the
// External table chip inside every schema.
const STORAGE_CREDENTIAL_TAG = { label: "Backs external locations", tone: "border-violet-200 bg-violet-50 text-violet-700" };
const EXTERNAL_LOCATION_TAG = {
  label: "Used by external tables, volumes & managed storage",
  tone: "border-violet-200 bg-violet-50 text-violet-700",
};
const FOREIGN_TABLE_TAG = { label: "Used by foreign tables", tone: "border-slate-300 bg-slate-100 text-slate-600" };

const EXTERNAL_ACCESS_OBJECTS = [
  { name: "Service credential", note: "Authenticates to external cloud services" },
  { name: "Storage credential", note: "Cloud identity used to reach storage", tag: STORAGE_CREDENTIAL_TAG },
  { name: "External location", note: "A storage path paired with a credential", tag: EXTERNAL_LOCATION_TAG },
  { name: "Connection", note: "Login details for an external database", tag: FOREIGN_TABLE_TAG },
];

const SHARING_OBJECTS = [
  { name: "Share", note: "A read-only bundle of data you share out" },
  { name: "Recipient", note: "Who a share is granted to" },
  { name: "Provider", note: "An organization sharing data with you" },
  { name: "Clean room", note: "Joint analysis without exposing raw data" },
];

const TABLE_KINDS = [
  { name: "Managed", note: "Unity Catalog manages the files", tone: "border-emerald-200 bg-emerald-50 text-emerald-700" },
  { name: "External", note: "Files in your storage path", tone: "border-violet-200 bg-violet-50 text-violet-700" },
];

const VIEW_KINDS = [
  { name: "View", note: "Runs its query each time", tone: "border-sky-200 bg-sky-50 text-sky-700" },
  { name: "Materialized view", note: "Stores precomputed results", tone: "border-orange-200 bg-orange-50 text-orange-700" },
];

const SCHEMA_OBJECTS = [
  { name: "Volume", note: "Non-tabular files" },
  { name: "Function", note: "Reusable logic, including models" },
];

function DiagramCard({
  title,
  className = "",
  children,
}: {
  title: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <figure className={`mt-6 rounded-xl border border-slate-200 bg-white p-4 sm:p-6 ${className}`}>
      {children}
      <figcaption className="mt-4 text-center text-sm text-slate-500">{title}</figcaption>
    </figure>
  );
}

function NamespaceDiagram() {
  const parts = [
    { value: "prod", label: "Catalog", tone: "border-indigo-300 bg-indigo-50 text-indigo-700" },
    { value: "sales", label: "Schema", tone: "border-sky-300 bg-sky-50 text-sky-700" },
    { value: "orders", label: "Table", tone: "border-emerald-300 bg-emerald-50 text-emerald-700" },
  ];
  return (
    <DiagramCard title="Every object has a three-part name: catalog.schema.object">
      <div className="flex flex-wrap items-start justify-center gap-1 font-mono text-base sm:text-xl">
        {parts.map((part, index) => (
          <div key={part.label} className="flex items-start gap-1">
            <div className="flex flex-col items-center">
              <span className={`rounded-lg border px-3 py-1.5 font-semibold ${part.tone}`}>{part.value}</span>
              <span className="mt-2 font-sans text-xs font-semibold uppercase tracking-wide text-slate-500">
                {part.label}
              </span>
            </div>
            {index < parts.length - 1 && <span className="pt-1.5 text-slate-400">.</span>}
          </div>
        ))}
      </div>
    </DiagramCard>
  );
}

const CONNECTOR = "bg-slate-300";

const ICON_PROPS = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

function ServerIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg {...ICON_PROPS} className={className}>
      <rect x="3" y="3" width="18" height="7" rx="1.5" />
      <rect x="3" y="14" width="18" height="7" rx="1.5" />
      <path d="M7 6.5h.01M7 17.5h.01M11 6.5h6M11 17.5h6" />
    </svg>
  );
}

function DatabaseIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg {...ICON_PROPS} className={className}>
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
      <path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" />
    </svg>
  );
}

function BuildingIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg {...ICON_PROPS} className={className}>
      <rect x="4" y="3" width="16" height="18" rx="1.5" />
      <path d="M9 7h1M14 7h1M9 11h1M14 11h1M9 15h1M14 15h1M10 21v-3h4v3" />
    </svg>
  );
}

function AccountIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg {...ICON_PROPS} className={className}>
      <path d="M12 3l8 3v6c0 4.5-3.4 8.2-8 9-4.6-.8-8-4.5-8-9V6z" />
      <circle cx="12" cy="10" r="2.5" />
      <path d="M7.8 16.5c.9-1.8 2.4-2.7 4.2-2.7s3.3.9 4.2 2.7" />
    </svg>
  );
}

// Outermost boundary: the customer's company, which can hold more than one Databricks account.
function OrganizationFrame({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl border-2 border-dashed border-slate-300 p-2 sm:p-3">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 px-1">
        <div className="flex items-center gap-2 text-slate-700">
          <BuildingIcon className="h-5 w-5 shrink-0" />
          <p className="text-sm font-semibold">Organization</p>
          <span className="text-xs text-slate-500">your company</span>
        </div>
        <p className="text-[11px] text-slate-500">Can hold more than one Databricks account, e.g. one per cloud</p>
      </div>
      <div className="mt-2">{children}</div>
    </div>
  );
}

// The Databricks account: top-level container for identities, billing, metastores, and workspaces.
function AccountFrame({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl border border-indigo-200 bg-indigo-50/30 p-2 sm:p-3">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 px-1">
        <div className="flex items-center gap-2 text-indigo-700">
          <AccountIcon className="h-5 w-5 shrink-0" />
          <p className="text-sm font-semibold">Databricks account</p>
          <span className="text-xs text-indigo-700/70">managed in the account console</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {["Users · groups · service principals", "Billing", "Metastores & workspaces"].map((item) => (
            <span
              key={item}
              className="rounded-full border border-indigo-200 bg-white px-2 py-0.5 text-[11px] font-medium text-indigo-700"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function WorkspaceIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg {...ICON_PROPS} className={className}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18M9 9v11" />
    </svg>
  );
}

// Each environment gets one colour, used for both its workspace and the catalog
// bound to it, so the diagram shows which workspace can reach which data.
const ENVIRONMENTS = [
  { name: "dev", box: "border-sky-300 bg-sky-50", text: "text-sky-700" },
  { name: "cert", box: "border-amber-300 bg-amber-50", text: "text-amber-700" },
  { name: "prod", box: "border-rose-300 bg-rose-50", text: "text-rose-700" },
];

function LockIcon({ className = "h-3 w-3" }: { className?: string }) {
  return (
    <svg {...ICON_PROPS} className={className}>
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

function VerticalConnector({ className = "h-5" }: { className?: string }) {
  return <div className={`mx-auto w-px ${CONNECTOR} ${className}`} aria-hidden />;
}

function ObjectNode({
  name,
  note,
  tone,
  tag,
  compact = false,
}: {
  name: string;
  note: string;
  tone: string;
  tag?: { label: string; tone: string };
  compact?: boolean;
}) {
  return (
    <div className={`rounded-lg border bg-white shadow-sm ${tone} ${compact ? "px-2.5 py-2" : "px-3 py-2.5"}`}>
      <p className="text-sm font-semibold text-slate-900">{name}</p>
      <p className="mt-0.5 text-xs leading-snug text-slate-500">{note}</p>
      {tag && (
        <span className={`mt-1.5 inline-block rounded-full border px-2 py-0.5 text-[11px] font-medium ${tag.tone}`}>
          {tag.label}
        </span>
      )}
    </div>
  );
}

// A schema object that comes in two kinds, shown as a full-width node with a chip per kind.
function KindsNode({
  name,
  note,
  kinds,
}: {
  name: string;
  note: string;
  kinds: { name: string; note: string; tone: string }[];
}) {
  return (
    <div className="col-span-2 rounded-lg border border-emerald-200 bg-white px-2.5 py-2 shadow-sm">
      <p className="text-sm font-semibold text-slate-900">{name}</p>
      <p className="mt-0.5 text-xs leading-snug text-slate-500">{note}</p>
      <div className="mt-2 grid grid-cols-2 gap-1.5">
        {kinds.map((kind) => (
          <div key={kind.name} className={`rounded-md border px-2 py-1.5 ${kind.tone}`}>
            <p className="text-xs font-semibold">{kind.name}</p>
            <p className="text-[11px] leading-snug text-slate-600">{kind.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ObjectGroup({
  label,
  accent,
  children,
}: {
  label: string;
  accent: { bar: string; text: string; bg: string };
  children: ReactNode;
}) {
  return (
    <div className={`flex h-full flex-col rounded-xl border border-slate-200 ${accent.bg}`}>
      <div className={`h-1 rounded-t-xl ${accent.bar}`} aria-hidden />
      <div className="flex flex-1 flex-col p-3">
        <p className={`text-center text-xs font-semibold uppercase tracking-wide ${accent.text}`}>{label}</p>
        <div className="mt-3 flex flex-1 flex-col">{children}</div>
      </div>
    </div>
  );
}

// A row of three short connectors, one centred under each environment column.
function ColumnConnectors({ className = "h-4" }: { className?: string }) {
  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-3" aria-hidden>
      {ENVIRONMENTS.map((env) => (
        <VerticalConnector key={env.name} className={className} />
      ))}
    </div>
  );
}

// Objects registered on the metastore itself rather than inside a catalog.
function MetastoreObjectsPanel() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-slate-300 bg-slate-50">
      <div className="bg-slate-900 px-3 py-2">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-300">Also in the metastore</p>
        <p className="text-xs text-slate-400">Registered outside any catalog</p>
      </div>
      <div className="p-3">
        <ObjectGroup label="External access" accent={{ bar: "bg-amber-400", text: "text-amber-700", bg: "bg-amber-50/40" }}>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
            {EXTERNAL_ACCESS_OBJECTS.map((object) => (
              <ObjectNode key={object.name} {...object} tone="border-amber-200" compact />
            ))}
          </div>
          <p className="mt-2 flex items-start gap-1.5 text-[11px] leading-snug text-slate-500">
            <LockIcon className="mt-0.5 h-3 w-3 shrink-0" />
            Credentials and locations can also be bound to specific workspaces
          </p>
        </ObjectGroup>
      </div>
    </div>
  );
}

// Arrow from a left-column element into the right-hand metastore column (large screens only).
// Centred vertically by default; `position` overrides that when the target isn't level with the middle.
function ArrowToMetastoreColumn({ position = "top-1/2 -translate-y-1/2" }: { position?: string }) {
  return (
    <div className={`absolute left-full hidden items-center lg:flex ${position}`} aria-hidden>
      <div className="h-0.5 w-4 bg-slate-900" />
      <div className="h-0 w-0 border-y-[6px] border-l-[8px] border-y-transparent border-l-slate-900" />
    </div>
  );
}

function SharingGroup() {
  return (
    <div className="relative">
      <p className="mb-2 text-center text-[11px] font-semibold uppercase tracking-wide text-slate-500 lg:hidden">
        Also in the metastore — registered outside any catalog
      </p>
      <ObjectGroup
        label="Sharing & collaboration"
        accent={{ bar: "bg-teal-500", text: "text-teal-700", bg: "bg-teal-50/40" }}
      >
        <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
          {SHARING_OBJECTS.map((object) => (
            <ObjectNode key={object.name} {...object} tone="border-teal-200" compact />
          ))}
        </div>
        <p className="mt-2 text-[11px] leading-snug text-slate-500">
          For sharing with other organizations, or your own metastores in other regions. Environments on the same
          metastore just use grants.
        </p>
      </ObjectGroup>
      {/* The reference label is h-20 and bottom-aligned, so its centre sits 40px (bottom-10) above the shared bottom edge */}
      <ArrowToMetastoreColumn position="bottom-10 translate-y-1/2" />
    </div>
  );
}

// The right-column label the Sharing group points at, mirroring the band → panel link above.
function SharingMetastoreReference() {
  return (
    <div className="mt-auto hidden lg:block">
      <div className="flex h-20 w-full flex-col justify-center rounded-xl bg-slate-900 px-3 shadow-md">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-300">Also in the metastore</p>
        <p className="text-sm font-semibold text-white">Unity Catalog</p>
        <p className="text-xs text-slate-400">Registered outside any catalog</p>
      </div>
    </div>
  );
}

function UnityCatalogObjectModel() {
  return (
    // On large screens this diagram extends into the page's right sidebar column
    // (224px + 40px gap), which is empty this far down the Databricks page.
    <DiagramCard
      className="lg:-mr-[264px]"
      title="Unity Catalog object model: your company holds a Databricks account; inside it, each environment flows from its workspace to its own catalog, while one shared metastore governs them all. Binding a catalog to a workspace is optional, but recommended for isolating environments."
    >
      <OrganizationFrame>
        <AccountFrame>
          {/* Two independent columns so a taller right panel never pushes Sharing down.
              Both columns end on the same line, keeping the Sharing arrow level with its label. */}
          <div className="grid gap-4 lg:grid-cols-[1fr_240px] lg:gap-6">
            <div className="flex flex-col gap-4">
            <div>
              {/* Workspaces */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {ENVIRONMENTS.map((env) => (
                  <div key={env.name} className={`rounded-lg border px-2 py-2 text-center shadow-sm sm:px-3 ${env.box}`}>
                    <div className={`flex items-center justify-center gap-1.5 ${env.text}`}>
                      <WorkspaceIcon className="h-4 w-4 shrink-0" />
                      <p className="text-sm font-semibold">Workspace</p>
                    </div>
                    <p className={`font-mono text-xs font-semibold ${env.text}`}>{env.name}</p>
                    <p className="mt-0.5 hidden text-xs text-slate-500 sm:block">Notebooks · Jobs · Queries</p>
                  </div>
                ))}
              </div>
              <ColumnConnectors />

              {/* Metastore: a horizontal service band every environment passes through */}
              <div className="relative rounded-xl bg-slate-900 px-3 py-2.5 shadow-md sm:flex sm:items-center sm:justify-between sm:gap-4 sm:px-4">
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-white/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-300">
                    Shared service
                  </span>
                  <p className="text-sm font-semibold text-white">Unity Catalog metastore</p>
                </div>
                <p className="mt-1 text-xs text-slate-300 sm:mt-0 sm:text-right">
                  One per region · registry of every object and its permissions
                </p>
                <ArrowToMetastoreColumn />
              </div>
              <ColumnConnectors />

              {/* Catalogs, one per environment, directly under their workspace */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {ENVIRONMENTS.map((env) => (
                  <div key={env.name} className={`rounded-lg border-2 bg-white px-2 py-2 text-center shadow-sm ${env.box}`}>
                    <div className={`flex items-center justify-center gap-1.5 ${env.text}`}>
                      <ServerIcon className="h-4 w-4 shrink-0" />
                      <p className="text-sm font-semibold">Catalog</p>
                    </div>
                    <p className={`font-mono text-xs font-semibold ${env.text}`}>{env.name}</p>
                    <p className={`mt-1 flex items-center justify-center gap-1 text-[11px] ${env.text}`}>
                      <LockIcon className="h-3 w-3 shrink-0" />
                      <span>
                        bound to <span className="hidden sm:inline">{env.name} </span>workspace
                      </span>
                    </p>
                  </div>
                ))}
              </div>
              <ColumnConnectors />

              {/* Schemas */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {ENVIRONMENTS.map((env) => (
                  <div key={env.name} className="rounded-lg border border-sky-300 bg-white px-2 py-2 text-center shadow-sm">
                    <div className="flex items-center justify-center gap-1.5 text-sky-700">
                      <DatabaseIcon className="h-4 w-4 shrink-0" />
                      <p className="text-sm font-semibold">Schemas</p>
                    </div>
                    <p className="font-mono text-[11px] text-slate-500">sales · finance</p>
                  </div>
                ))}
              </div>
              <ColumnConnectors />

              {/* What every schema can hold — shown once instead of per column */}
              <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-3">
                <p className="text-center text-xs font-semibold uppercase tracking-wide text-emerald-700">
                  Inside every schema
                </p>
                <div className="mt-2 grid grid-cols-2 gap-2 md:grid-cols-6 lg:grid-cols-2 xl:grid-cols-6">
                  <KindsNode name="Table" note="Structured rows and columns — two kinds:" kinds={TABLE_KINDS} />
                  <KindsNode name="View" note="Query-defined data — two kinds:" kinds={VIEW_KINDS} />
                  {SCHEMA_OBJECTS.map((object) => (
                    <ObjectNode key={object.name} {...object} tone="border-emerald-200" compact />
                  ))}
                </div>
              </div>
            </div>

              <div className="lg:mt-auto">
                <SharingGroup />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <MetastoreObjectsPanel />
              <SharingMetastoreReference />
            </div>
          </div>
        </AccountFrame>
      </OrganizationFrame>
    </DiagramCard>
  );
}

export function InheritanceDiagram() {
  const levels = [
    { label: "Catalog prod", tone: "border-indigo-300 bg-indigo-50 text-indigo-700", granted: true },
    { label: "Schemas sales, finance", tone: "border-sky-300 bg-sky-50 text-sky-700" },
    { label: "Tables, views, volumes…", tone: "border-emerald-300 bg-emerald-50 text-emerald-700" },
  ];
  return (
    <DiagramCard title="One grant on the catalog flows down to every schema and object inside it">
      <div className="mx-auto max-w-sm">
        <p className="rounded-lg bg-slate-900 px-3 py-2 text-center font-mono text-xs text-slate-100 sm:text-sm">
          GRANT SELECT ON CATALOG prod TO analysts
        </p>
        {levels.map((level) => (
          <div key={level.label} className="flex flex-col items-center">
            <span className="text-lg leading-6 text-slate-400" aria-hidden>
              ↓
            </span>
            <div className={`flex w-full items-center justify-between rounded-lg border px-3 py-2 text-sm ${level.tone}`}>
              <span className="font-semibold">{level.label}</span>
              <span className="text-xs font-medium">{level.granted ? "granted" : "inherited ✓"}</span>
            </div>
          </div>
        ))}
      </div>
    </DiagramCard>
  );
}

function DropTableDiagram() {
  const cases = [
    {
      kind: "Managed table",
      name: "prod.sales.orders",
      tone: { box: "border-emerald-300 bg-emerald-50/60", text: "text-emerald-700" },
      storage: "Managed storage (chosen by Unity Catalog)",
      after: "Definition and data files both deleted",
      filesKept: false,
    },
    {
      kind: "External table",
      name: "prod.sales.orders_ext",
      tone: { box: "border-violet-300 bg-violet-50/60", text: "text-violet-700" },
      storage: "Your path, e.g. abfss://lake/sales/orders",
      after: "Definition deleted — files stay in your storage",
      filesKept: true,
    },
  ];
  return (
    <DiagramCard title="What DROP TABLE removes: a managed table takes its data with it; an external table leaves the files behind">
      <div className="grid gap-4 sm:grid-cols-2">
        {cases.map((item) => (
          <div key={item.kind} className={`rounded-xl border p-3 ${item.tone.box}`}>
            <p className={`text-xs font-semibold uppercase tracking-wide ${item.tone.text}`}>{item.kind}</p>
            <div className="mt-2 rounded-md border border-slate-200 bg-white px-2.5 py-1.5">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">Definition</p>
              <p className="font-mono text-xs text-slate-700">{item.name}</p>
            </div>
            <VerticalConnector className="h-3" />
            <div className="rounded-md border border-slate-200 bg-white px-2.5 py-1.5">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">Data files</p>
              <p className="text-xs text-slate-700">{item.storage}</p>
            </div>
            <p className="mt-3 rounded-md bg-slate-900 px-2.5 py-1.5 font-mono text-xs text-slate-100">
              DROP TABLE {item.name}
            </p>
            <p
              className={`mt-2 text-sm font-medium ${item.filesKept ? "text-emerald-700" : "text-rose-700"}`}
            >
              {item.filesKept ? "✓ " : "✗ "}
              {item.after}
            </p>
          </div>
        ))}
      </div>
    </DiagramCard>
  );
}

const TABLE_COMPARISON = {
  title: "Managed vs. external tables",
  headers: ["", "Managed table", "External table"],
  rows: [
    [
      "Where the data lives",
      "Storage that Unity Catalog chooses and manages (the managed location on the metastore, catalog, or schema)",
      "A path you choose in your own cloud storage, reached through an external location and storage credential",
    ],
    ["Who manages the files", "Databricks — layout, optimization, and cleanup", "You — Unity Catalog only governs access"],
    [
      "DROP TABLE",
      "Deletes the table and its data (recoverable with UNDROP for a short window)",
      "Deletes only the table definition; the files stay put",
    ],
    ["Format", "Delta (the default)", "Delta, Parquet, CSV, JSON, and others"],
    [
      "When to use it",
      "The default and Databricks' recommendation for most tables; gets automatic maintenance like predictive optimization",
      "Data that other tools must read straight from the storage path, or existing data registered without moving it",
    ],
  ],
};

function FlowStep({ label, children, tone = "border-slate-200 bg-white" }: { label: string; children: ReactNode; tone?: string }) {
  return (
    <div className={`rounded-md border px-2.5 py-1.5 ${tone}`}>
      <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">{label}</p>
      <div className="text-xs text-slate-700">{children}</div>
    </div>
  );
}

function FlowArrow({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center gap-1.5 py-1 text-[11px] font-medium text-slate-500">
      <span className="text-base leading-none text-slate-400" aria-hidden>
        ↓
      </span>
      {label}
    </div>
  );
}

function ViewQueryDiagram() {
  return (
    <DiagramCard title="A view recomputes on every query; a materialized view does the work once per refresh and serves stored results">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col rounded-xl border border-sky-300 bg-sky-50/60 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">View</p>
          <div className="mt-2 flex flex-1 flex-col">
            <FlowStep label="Someone queries" tone="border-slate-900 bg-slate-900 [&_p]:text-slate-400 [&_div]:text-slate-100">
              <span className="font-mono">SELECT * FROM daily_revenue</span>
            </FlowStep>
            <FlowArrow label="runs the view's SQL right now" />
            <FlowStep label="Base table">
              <span className="font-mono">prod.sales.orders</span> — scanned and aggregated in full
            </FlowStep>
            <FlowArrow label="result returned, nothing kept" />
            <p className="mt-auto rounded-md bg-white/70 px-2.5 py-1.5 text-sm font-medium text-sky-800">
              Always up to date · pays the full cost every time
            </p>
          </div>
        </div>

        <div className="flex flex-col rounded-xl border border-orange-300 bg-orange-50/60 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-orange-700">Materialized view</p>
          <div className="mt-2 flex flex-1 flex-col">
            <FlowStep label="On refresh (schedule or source change)">
              <span className="font-mono">prod.sales.orders</span> → aggregated, only new data where possible
            </FlowStep>
            <FlowArrow label="results saved" />
            <FlowStep label="Stored results" tone="border-orange-200 bg-white">
              <span className="font-mono">daily_revenue</span> — ready-made rows
            </FlowStep>
            <FlowArrow label="queries read the stored rows" />
            <FlowStep label="Someone queries" tone="border-slate-900 bg-slate-900 [&_p]:text-slate-400 [&_div]:text-slate-100">
              <span className="font-mono">SELECT * FROM daily_revenue</span>
            </FlowStep>
            <p className="mt-3 rounded-md bg-white/70 px-2.5 py-1.5 text-sm font-medium text-orange-800">
              Fast to query · as fresh as the last refresh
            </p>
          </div>
        </div>
      </div>
    </DiagramCard>
  );
}

const VIEW_COMPARISON = {
  title: "Views vs. materialized views",
  headers: ["", "View", "Materialized view"],
  rows: [
    ["What's stored", "Only the query definition", "The query and its precomputed results"],
    [
      "When the work happens",
      "Every time someone queries it",
      "On refresh — scheduled or triggered — processing only new data where possible",
    ],
    ["Freshness", "Always current", "As of the last refresh"],
    ["Query speed", "As fast as the underlying query", "Fast — reads stored results"],
    ["Cost", "Compute on every query", "Compute on each refresh, plus storage for the results"],
    [
      "When to use it",
      "Reusable logic, or exposing a safe subset of rows and columns, where results must always be current",
      "Expensive joins or aggregations queried often — dashboards and reports — where slight staleness is fine",
    ],
  ],
};

function AssetColumn({
  eyebrow,
  title,
  tone,
  items,
  addressedBy,
  governedBy,
}: {
  eyebrow: string;
  title: string;
  tone: { box: string; text: string; chip: string };
  items: { kind: string; name: string }[];
  addressedBy: string;
  governedBy: string;
}) {
  return (
    <div className={`rounded-xl border p-4 ${tone.box}`}>
      <p className={`text-xs font-semibold uppercase tracking-wide ${tone.text}`}>{eyebrow}</p>
      <p className="mt-1 font-semibold text-slate-900">{title}</p>
      <ul className="mt-3 space-y-1.5">
        {items.map((item) => (
          <li key={item.name} className={`flex items-center gap-2 rounded-md border bg-white px-2 py-1.5 ${tone.chip}`}>
            <span className={`w-16 shrink-0 text-xs font-semibold ${tone.text}`}>{item.kind}</span>
            <span className="truncate font-mono text-xs text-slate-700">{item.name}</span>
          </li>
        ))}
      </ul>
      <dl className="mt-3 space-y-1 text-xs text-slate-600">
        <div>
          <dt className="inline font-semibold text-slate-900">Found by: </dt>
          <dd className="inline">{addressedBy}</dd>
        </div>
        <div>
          <dt className="inline font-semibold text-slate-900">Access: </dt>
          <dd className="inline">{governedBy}</dd>
        </div>
      </dl>
    </div>
  );
}

function WorkspaceAssetsDiagram() {
  return (
    <DiagramCard title="Data lives in the catalog; the work that uses it lives in the workspace">
      <div className="grid items-center gap-3 md:grid-cols-[1fr_auto_1fr]">
        <AssetColumn
          eyebrow="Workspace"
          title="The work"
          tone={{ box: "border-amber-300 bg-amber-50/60", text: "text-amber-700", chip: "border-amber-200" }}
          items={[
            { kind: "Notebook", name: "/Shared/clean_orders" },
            { kind: "Job", name: "nightly_orders_load" },
            { kind: "Query", name: "Revenue by region" },
          ]}
          addressedBy="a folder path in the workspace"
          governedBy="workspace permissions (e.g. can view, can run, can manage)"
        />
        <div className="flex flex-row items-center justify-center gap-2 text-xs font-semibold text-slate-500 md:flex-col">
          <span>reads &amp; writes</span>
          <span className="text-xl text-slate-400" aria-hidden>
            <span className="md:hidden">↓</span>
            <span className="hidden md:inline">→</span>
          </span>
        </div>
        <AssetColumn
          eyebrow="Unity Catalog"
          title="The data"
          tone={{ box: "border-emerald-300 bg-emerald-50/60", text: "text-emerald-700", chip: "border-emerald-200" }}
          items={[
            { kind: "Table", name: "prod.sales.orders" },
            { kind: "View", name: "prod.sales.daily_revenue" },
            { kind: "Volume", name: "prod.raw.landing_files" },
          ]}
          addressedBy="its three-part name"
          governedBy="GRANTs on the catalog, schema, or object"
        />
      </div>
    </DiagramCard>
  );
}

function Example({ variant, children }: { variant: "avoid" | "do"; children: ReactNode }) {
  const isDo = variant === "do";
  return (
    <div
      className={`rounded-lg border p-2.5 ${isDo ? "border-emerald-200 bg-emerald-50/70" : "border-rose-200 bg-rose-50/70"}`}
    >
      <p className={`text-[11px] font-semibold uppercase tracking-wide ${isDo ? "text-emerald-700" : "text-rose-700"}`}>
        {isDo ? "✓ Do this" : "✗ Avoid"}
      </p>
      <div className="mt-1.5 space-y-0.5 font-mono text-xs text-slate-700">{children}</div>
    </div>
  );
}

const BEST_PRACTICES: { title: string; why: string; avoid: ReactNode; do: ReactNode }[] = [
  {
    title: "Use domain-aligned schemas",
    why: "Each schema becomes a clear boundary for ownership and permissions. The default schema just turns into a junk drawer.",
    avoid: (
      <>
        <p>prod.default.orders</p>
        <p>prod.default.invoices</p>
        <p>prod.default.tmp_test2</p>
      </>
    ),
    do: (
      <>
        <p>prod.sales.orders</p>
        <p>prod.finance.invoices</p>
      </>
    ),
  },
  {
    title: "Separate dev, cert, and production",
    why: "Experiments can't break production. All workspaces attach to the same metastore, so data is shared through catalogs instead of being copied around.",
    avoid: <p className="font-sans">One workspace where experiments run next to production jobs</p>,
    do: (
      <>
        <p className="font-sans">dev · cert · prod workspaces</p>
        <p className="font-sans text-slate-500">↓ one shared metastore ↓</p>
        <p>catalogs: dev, cert, prod</p>
        <p className="font-sans text-slate-500">each bound to its own workspace</p>
      </>
    ),
  },
  {
    title: "Default to Delta tables",
    why: "Delta gives production pipelines ACID transactions, versioning, and time travel. Plain files give you none of that.",
    avoid: (
      <>
        <p>orders.csv</p>
        <p className="font-sans text-slate-500">no transactions, no history</p>
      </>
    ),
    do: (
      <>
        <p>orders (Delta)</p>
        <p>… VERSION AS OF 12</p>
      </>
    ),
  },
  {
    title: "Grant at the catalog or schema level",
    why: "Privileges inherit downward, so one grant covers today's tables and any added later. Fewer grants, fewer gaps, easier audits.",
    avoid: (
      <>
        <p>GRANT SELECT ON TABLE prod.sales.orders …</p>
        <p>GRANT SELECT ON TABLE prod.sales.returns …</p>
        <p>GRANT SELECT ON TABLE prod.sales.refunds …</p>
      </>
    ),
    do: <p>GRANT SELECT ON SCHEMA prod.sales TO analysts</p>,
  },
];

export function DatabricksObjectHierarchy() {
  return (
    <div className="border-t border-slate-200 py-8">
      <h2 className="text-2xl font-semibold text-slate-900">Databricks Object Hierarchy</h2>
      <p className="mt-3 text-slate-600">
        Databricks organizes and governs data in a three-tier hierarchy, managed by Unity Catalog. Every object is
        addressed with a three-part name, so the same reference works consistently across workspaces.
      </p>
      <UnityCatalogObjectModel />
      <div className="mt-4 rounded-xl border border-indigo-200 bg-indigo-50/50 p-4">
        <p className="font-semibold text-slate-900">One metastore, isolated environments</p>
        <p className="mt-2 text-sm text-slate-600">
          Unity Catalog allows one metastore per region, and every workspace in that region — dev, cert, and prod —
          attaches to it. That doesn't mean they all see the same data. The metastore is the shared{" "}
          <em>registry</em> of what exists and who may use it; the environments are kept apart inside it:
        </p>
        <ul className="mt-2 space-y-1.5 text-sm text-slate-600">
          <li>
            <strong className="font-semibold text-slate-900">A catalog per environment</strong> — dev, cert, and
            prod data live in separate catalogs, each with its own storage.
          </li>
          <li>
            <strong className="font-semibold text-slate-900">Workspace–catalog binding</strong> — the prod catalog
            can be bound to the prod workspace, so it simply isn't reachable from dev or cert, even for someone
            holding a grant on it.
          </li>
          <li>
            <strong className="font-semibold text-slate-900">Grants</strong> — permissions decide who can read or
            write each catalog. Credentials and external locations can be bound and granted the same way.
          </li>
        </ul>
        <p className="mt-2 text-sm text-slate-600">
          The payoff of sharing one metastore: when you <em>do</em> want to share — say, letting cert read a
          sample of prod data — it's a grant, not a copy.
        </p>
      </div>
      <p className="mt-4 text-slate-600">
        Read the diagram top to bottom, one column per environment: people work in a{" "}
        <strong className="font-semibold text-slate-900">workspace</strong>, which reaches its own{" "}
        <strong className="font-semibold text-slate-900">catalog</strong>, which holds{" "}
        <strong className="font-semibold text-slate-900">schemas</strong> of tables, views, volumes, and functions.
        The metastore runs across all three columns as a shared service — every request passes through it to be
        checked against its registry of objects and permissions. Alongside the catalogs, the metastore also
        registers the credentials and connections that give Databricks{" "}
        <strong className="font-semibold text-slate-900">access to external</strong> storage and systems, and the
        objects used for <strong className="font-semibold text-slate-900">sharing and collaborating</strong> with
        other organizations.
      </p>
      <NamespaceDiagram />

      <h3 className="mt-8 text-lg font-semibold text-slate-900">The three tiers</h3>
      <ul className="mt-3 space-y-3 text-slate-600">
        <li>
          <strong className="font-semibold text-slate-900">Catalog</strong> — the top-level container. Catalogs often
          reflect business units, projects, or lifecycle stages (dev, cert, prod). They're registered in a
          metastore managed at the account level, and they're the primary unit for access control.
        </li>
        <li>
          <strong className="font-semibold text-slate-900">Schema (database)</strong> — lives inside a catalog and
          holds the data objects. Each schema defines a default storage location and acts as a logical boundary
          for a domain or project, with its own permissions.
        </li>
        <li>
          <strong className="font-semibold text-slate-900">Tables and other objects</strong> — tables hold
          structured rows and columns, typically in Delta, Parquet, or CSV; Delta is preferred for production
          thanks to ACID transactions, versioning, and schema evolution. Schemas can also contain views, volumes,
          functions, and models.
        </li>
      </ul>

      <h3 className="mt-8 text-lg font-semibold text-slate-900">Managed vs. external tables</h3>
      <p className="mt-3 text-slate-600">
        Every table in Unity Catalog is either <strong className="font-semibold text-slate-900">managed</strong> or{" "}
        <strong className="font-semibold text-slate-900">external</strong>. Both are queried the same way, with the
        same three-part name — the difference is who owns the underlying files.
      </p>
      <ComparisonTable {...TABLE_COMPARISON} embedded />
      <DropTableDiagram />
      <p className="mt-4 text-slate-600">
        <strong className="font-semibold text-slate-900">Rule of thumb:</strong> use managed tables unless something
        outside Databricks needs direct access to the files. A third, less common kind —{" "}
        <strong className="font-semibold text-slate-900">foreign tables</strong> — points at a table in an outside
        database through a <em>connection</em>, so Unity Catalog can query it without copying the data.
      </p>

      <h3 className="mt-8 text-lg font-semibold text-slate-900">Views vs. materialized views</h3>
      <p className="mt-3 text-slate-600">
        Both are defined by a query and queried just like a table. The difference is{" "}
        <strong className="font-semibold text-slate-900">when the work happens</strong>: a{" "}
        <strong className="font-semibold text-slate-900">view</strong> stores only its SQL and runs it every time,
        while a <strong className="font-semibold text-slate-900">materialized view</strong> runs it ahead of time,
        stores the results, and keeps them up to date on each refresh.
      </p>
      <ComparisonTable {...VIEW_COMPARISON} embedded />
      <ViewQueryDiagram />
      <p className="mt-4 text-slate-600">
        <strong className="font-semibold text-slate-900">Rule of thumb:</strong> start with a view. Switch to a
        materialized view when the same expensive query runs again and again and results a few minutes old are
        acceptable.
      </p>

      <p className="mt-8 rounded-lg border border-indigo-200 bg-indigo-50/60 px-4 py-3 text-sm text-slate-700">
        <strong className="font-semibold text-slate-900">Who can see what?</strong> Grants, inherited permissions, row
        filters, column masks, encryption, and sensitive-data handling are covered in{" "}
        <a href="#governance" className="font-semibold text-indigo-600 hover:text-indigo-500">
          Data Governance
        </a>
        .
      </p>

      <h3 className="mt-8 text-lg font-semibold text-slate-900">Workspace-level assets</h3>
      <p className="mt-3 text-slate-600">
        Not everything in Databricks is data. Notebooks, jobs, and queries are the <em>work</em> — the code and
        schedules that read and write data. They live in a workspace, not in a catalog, so they sit outside the
        catalog → schema → table hierarchy entirely.
      </p>
      <WorkspaceAssetsDiagram />
      <p className="mt-4 text-slate-600">
        The two sides are governed separately. Granting someone access to <code className="font-mono text-sm">prod.sales</code>{" "}
        lets them query its tables, but doesn't let them open your notebooks; sharing a notebook doesn't give
        anyone access to the data it reads. Workspace assets are controlled with workspace permissions (and can
        also be governed through Unity Catalog), while data is controlled with catalog grants.
      </p>

      <h3 className="mt-8 text-lg font-semibold text-slate-900">Best practices</h3>
      <div className="mt-3 space-y-4">
        {BEST_PRACTICES.map((practice, index) => (
          <div key={practice.title} className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-xs font-semibold text-white">
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
      <p className="mt-4 text-slate-600">
        Together, this structure keeps data organized, queryable, governable, and reproducible — for structured
        tables and unstructured files alike.
      </p>
    </div>
  );
}
