import type { ReactNode } from "react";
import securableObjects from "../assets/snowflake-docs-securable-objects-hierarchy.png";
import { ComparisonTable } from "./ComparisonTable";
import { Icon, SNOWFLAKE_LOGO } from "./diagramIcons";
import { ZoomableImage } from "./ZoomableImage";

export const ACCESS_CONTROL_URL = "https://docs.snowflake.com/en/user-guide/security-access-control-overview";

export function DocsFigure({ src, alt, caption, sourceLabel, sourceUrl, maxWidth = "max-w-3xl" }: {
  src: string;
  alt: string;
  caption: string;
  sourceLabel: string;
  sourceUrl: string;
  maxWidth?: string;
}) {
  return (
    <figure className="mt-6 rounded-xl border border-slate-200 bg-white p-4 sm:p-6">
      <ZoomableImage src={src} alt={alt} className={`mx-auto w-full ${maxWidth}`} />
      <figcaption className="mt-4 text-center text-sm text-slate-500">
        {caption}
        <br />
        <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-indigo-600 hover:text-indigo-500">
          Source: Snowflake documentation — {sourceLabel}
        </a>
      </figcaption>
    </figure>
  );
}

function DiagramCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <figure className="mt-6 rounded-xl border border-slate-200 bg-white p-4 sm:p-6">
      {children}
      <figcaption className="mt-4 text-center text-sm text-slate-500">{title}</figcaption>
    </figure>
  );
}

function NamespaceDiagram() {
  const parts = [
    { value: "SALES", label: "Database", tone: "border-indigo-300 bg-indigo-50 text-indigo-700" },
    { value: "GOLD", label: "Schema", tone: "border-sky-300 bg-sky-50 text-sky-700" },
    { value: "ORDERS", label: "Table", tone: "border-emerald-300 bg-emerald-50 text-emerald-700" },
  ];
  return (
    <DiagramCard title="Every object has a three-part name: database.schema.object">
      <div className="flex flex-wrap items-start justify-center gap-1 font-mono text-base sm:text-xl">
        {parts.map((part, index) => (
          <div key={part.label} className="flex items-start gap-1">
            <div className="flex flex-col items-center">
              <span className={`rounded-lg border px-3 py-1.5 font-semibold ${part.tone}`}>{part.value}</span>
              <span className="mt-2 font-sans text-xs font-semibold uppercase tracking-wide text-slate-500">{part.label}</span>
            </div>
            {index < parts.length - 1 && <span className="pt-1.5 text-slate-400">.</span>}
          </div>
        ))}
      </div>
    </DiagramCard>
  );
}

// Same colours as the Databricks page, so dev / Test/Cert / prod read the same everywhere.
const ENVIRONMENTS = [
  { name: "Dev", box: "border-sky-300 bg-sky-50", text: "text-sky-700" },
  { name: "Test/Cert", box: "border-amber-300 bg-amber-50", text: "text-amber-700" },
  { name: "Prod", box: "border-rose-300 bg-rose-50", text: "text-rose-700" },
];

const SCHEMA_OBJECTS: { name: string; kinds: string[] }[] = [
  { name: "Tables", kinds: ["Permanent", "Transient", "Dynamic", "Iceberg"] },
  { name: "Views", kinds: ["Standard", "Secure", "Materialized"] },
  { name: "Stages", kinds: ["Internal", "External"] },
  { name: "Code", kinds: ["Procedures", "UDFs", "Streams & tasks"] },
];

const ACCOUNT_OBJECTS: [string, string][] = [
  ["Warehouses", "Compute for queries and pipelines"],
  ["Roles & users", "Who can do what"],
  ["Integrations", "Storage, API, and Git connections"],
  ["Network policies", "Which networks may connect"],
  ["Shares", "Live data shared with other accounts"],
];

function EnvironmentModelDiagram() {
  return (
    <DiagramCard title="One organization, one account per environment. Each account holds the same database, schemas, and objects — plus its own warehouses, roles, and integrations.">
      <div className="rounded-2xl border-2 border-dashed border-slate-300 p-2 sm:p-3">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 px-1">
          <div className="flex items-center gap-2 text-slate-700">
            <Icon name="users" className="h-5 w-5" />
            <p className="text-sm font-semibold">Snowflake organization</p>
            <span className="text-xs text-slate-500">your company</span>
          </div>
          <p className="text-[11px] text-slate-500">Manages accounts, billing, and cross-account replication</p>
        </div>

        <div className="mt-3 grid gap-4 lg:grid-cols-[1fr_220px]">
          <div>
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {ENVIRONMENTS.map((env) => (
                <div key={env.name} className={`rounded-lg border-2 bg-white px-2 py-2 text-center shadow-sm ${env.box}`}>
                  <div className={`flex items-center justify-center gap-1.5 ${env.text}`}>
                    <img src={SNOWFLAKE_LOGO} alt="" className="h-4 w-4" />
                    <p className="text-sm font-semibold">{env.name}</p>
                  </div>
                  <p className="text-[11px] text-slate-500">account</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-2 sm:gap-3" aria-hidden>
              {ENVIRONMENTS.map((env) => (
                <div key={env.name} className="mx-auto h-4 w-px bg-slate-300" />
              ))}
            </div>
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {ENVIRONMENTS.map((env) => (
                <div key={env.name} className="rounded-lg border-2 border-indigo-300 bg-white px-2 py-2 text-center shadow-sm">
                  <div className="flex items-center justify-center gap-1.5 text-indigo-700">
                    <Icon name="database" className="h-4 w-4" />
                    <p className="text-sm font-semibold">Database</p>
                  </div>
                  <p className="font-mono text-xs font-semibold text-indigo-700">SALES</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-2 sm:gap-3" aria-hidden>
              {ENVIRONMENTS.map((env) => (
                <div key={env.name} className="mx-auto h-4 w-px bg-slate-300" />
              ))}
            </div>
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {ENVIRONMENTS.map((env) => (
                <div key={env.name} className="rounded-lg border border-sky-300 bg-white px-2 py-2 text-center shadow-sm">
                  <div className="flex items-center justify-center gap-1.5 text-sky-700">
                    <Icon name="folderGit" className="h-4 w-4" />
                    <p className="text-sm font-semibold">Schemas</p>
                  </div>
                  <p className="font-mono text-[11px] text-slate-500">RAW · SILVER · GOLD</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-2 sm:gap-3" aria-hidden>
              {ENVIRONMENTS.map((env) => (
                <div key={env.name} className="mx-auto h-4 w-px bg-slate-300" />
              ))}
            </div>
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-3">
              <p className="text-center text-xs font-semibold uppercase tracking-wide text-emerald-700">Inside every schema</p>
              <div className="mt-2 grid grid-cols-2 gap-2 xl:grid-cols-4">
                {SCHEMA_OBJECTS.map((object) => (
                  <div key={object.name} className="rounded-lg border border-emerald-200 bg-white px-2.5 py-2 shadow-sm">
                    <p className="text-sm font-semibold text-slate-900">{object.name}</p>
                    <div className="mt-1.5 flex flex-wrap gap-1">
                      {object.kinds.map((kind) => (
                        <span key={kind} className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
                          {kind}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col overflow-hidden rounded-xl border border-slate-300 bg-slate-50">
            <div className="bg-slate-900 px-3 py-2">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-300">Also in every account</p>
              <p className="text-xs text-slate-400">Account-level objects, outside any database</p>
            </div>
            <ul className="space-y-2 p-3">
              {ACCOUNT_OBJECTS.map(([name, what]) => (
                <li key={name} className="rounded-lg border border-amber-200 bg-white px-2.5 py-2 shadow-sm">
                  <p className="text-sm font-semibold text-slate-900">{name}</p>
                  <p className="text-xs text-slate-500">{what}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </DiagramCard>
  );
}

const TABLE_TYPES = {
  title: "Table types",
  headers: ["Type", "What it is", "Time Travel · Fail-safe", "Use it for"],
  rows: [
    ["Permanent", "The default table", "Up to 90 days* · 7 days", "Production data that must be recoverable"],
    ["Transient", "Persists until dropped, with lighter protection", "0–1 day · none", "Staging and intermediate data you can rebuild"],
    ["Temporary", "Exists only for the session that created it", "0–1 day · none", "Scratch work inside one session"],
    ["Dynamic", "A table defined by a query; Snowflake keeps it refreshed to a target lag", "Like permanent (or transient)", "Declarative pipelines — replaces many streams and tasks"],
    ["Iceberg", "Apache Iceberg format, data in your own cloud storage", "Time Travel (Snowflake-managed) · no Fail-safe", "Open data that other engines also read"],
    ["External", "Read-only table over files in an external stage", "None", "Querying files in place before loading them"],
    ["Hybrid", "Row-based table for fast single-row reads and writes", "Supported, with some limits", "Application lookups (Unistore)"],
  ],
};

const VIEW_TYPES = {
  title: "Views, secure views, materialized views, and dynamic tables",
  headers: ["", "View", "Secure view", "Materialized view", "Dynamic table"],
  rows: [
    ["What's stored", "Only the query", "Only the query", "Query + precomputed results", "Query + precomputed results"],
    ["When the work happens", "Every query", "Every query", "Kept current automatically in the background", "On refresh, to a target lag you set"],
    ["Joins", "Yes", "Yes", "No — one table only", "Yes"],
    ["Hides its definition", "No", "Yes, from non-owners", "Optional (secure MV)", "No"],
    ["Use it for", "Reusable logic", "Sharing data safely, including Secure Data Sharing", "Speeding up a heavy query on one big table", "Multi-step transformations and joins, kept fresh"],
  ],
};

function Example({ variant, children }: { variant: "avoid" | "do"; children: ReactNode }) {
  const isDo = variant === "do";
  return (
    <div className={`rounded-lg border p-2.5 ${isDo ? "border-emerald-200 bg-emerald-50/70" : "border-rose-200 bg-rose-50/70"}`}>
      <p className={`text-[11px] font-semibold uppercase tracking-wide ${isDo ? "text-emerald-700" : "text-rose-700"}`}>
        {isDo ? "✓ Do this" : "✗ Avoid"}
      </p>
      <div className="mt-1.5 space-y-0.5 font-mono text-xs text-slate-700">{children}</div>
    </div>
  );
}

const BEST_PRACTICES: { title: string; why: string; avoid: ReactNode; do: ReactNode }[] = [
  {
    title: "Grant privileges to roles, never to users",
    why: "Users come and go; roles describe jobs. Build access roles that hold privileges and functional roles that people get.",
    avoid: <p>GRANT SELECT ON ALL TABLES IN SCHEMA SALES.GOLD TO USER jdoe;</p>,
    do: (
      <>
        <p>GRANT SELECT ON ALL TABLES IN SCHEMA SALES.GOLD TO ROLE GOLD_READ;</p>
        <p>GRANT ROLE GOLD_READ TO ROLE ANALYST;</p>
      </>
    ),
  },
  {
    title: "Keep ACCOUNTADMIN for emergencies",
    why: "Day-to-day work belongs in SYSADMIN-owned custom roles, so a mistake can't reach account-wide settings.",
    avoid: <p className="font-sans">Everyone defaults to ACCOUNTADMIN</p>,
    do: <p className="font-sans">Two or three named admins, MFA on, everyone else on custom roles</p>,
  },
  {
    title: "One warehouse per workload",
    why: "Loading, BI, and data science never slow each other down, and cost shows up per team.",
    avoid: <p>COMPUTE_WH for everything</p>,
    do: <p>ELT_WH · BI_WH · DS_WH — each with auto-suspend</p>,
  },
  {
    title: "Use transient tables for staging",
    why: "Staging data can be rebuilt, so it doesn't need seven days of Fail-safe storage costs.",
    avoid: <p>CREATE TABLE STG_ORDERS …</p>,
    do: <p>CREATE TRANSIENT TABLE STG_ORDERS …</p>,
  },
];

export function SnowflakeObjectHierarchy() {
  return (
    <div className="border-t border-slate-200 py-8">
      <h2 className="text-2xl font-semibold text-slate-900">Snowflake Object Hierarchy</h2>
      <p className="mt-3 text-slate-600">
        Everything in Snowflake is a securable object in one hierarchy:{" "}
        <strong className="font-semibold text-slate-900">organization → account → database → schema → objects</strong>
        . Warehouses, roles, users, and integrations sit at the account level, outside any database. Access to every
        object is controlled by roles, so the hierarchy is also the map of who can do what.
      </p>
      <DocsFigure
        src={securableObjects}
        alt="Snowflake securable object hierarchy: organization contains accounts; an account contains warehouses, databases, roles, users, and other account objects; a database contains database roles and schemas; a schema contains tables, views, stages, stored procedures, UDFs, and other schema objects"
        caption="The securable object hierarchy, from organization down to tables and functions."
        sourceLabel="Overview of access control"
        sourceUrl={ACCESS_CONTROL_URL}
      />
      <NamespaceDiagram />

      <h3 className="mt-8 text-lg font-semibold text-slate-900">Accounts, databases, and environments</h3>
      <p className="mt-3 text-slate-600">
        An <strong className="font-semibold text-slate-900">organization</strong> groups all of a company&apos;s
        accounts. Each <strong className="font-semibold text-slate-900">account</strong> lives in one cloud region and
        is fully isolated — its own data, warehouses, users, and roles. The cleanest way to separate environments is an
        account each for Dev, Test/Cert, and Prod, holding identically named databases, so the same code runs everywhere.
        Smaller teams often use one account with <span className="font-mono text-sm">SALES_DEV</span>,{" "}
        <span className="font-mono text-sm">SALES_CERT</span>, and <span className="font-mono text-sm">SALES_PROD</span>{" "}
        databases instead; it&apos;s simpler, but isolation then depends entirely on roles.
      </p>
      <EnvironmentModelDiagram />

      <h3 className="mt-8 text-lg font-semibold text-slate-900">Table types</h3>
      <p className="mt-3 text-slate-600">
        Snowflake has more kinds of table than most platforms. The difference is mainly about how long data can be
        recovered, and where it lives.
      </p>
      <ComparisonTable {...TABLE_TYPES} embedded />
      <p className="mt-2 text-xs text-slate-500">
        * Up to 1 day on Standard edition, up to 90 days on Enterprise edition and above.
      </p>

      <h3 className="mt-8 text-lg font-semibold text-slate-900">Views vs. materialized views vs. dynamic tables</h3>
      <p className="mt-3 text-slate-600">
        All four are defined by a query. The difference is <strong className="font-semibold text-slate-900">when the
        work happens</strong> and what they can do: views run their SQL every time, materialized views precompute one
        table, and dynamic tables precompute whole pipelines, joins included.
      </p>
      <ComparisonTable {...VIEW_TYPES} embedded />
      <p className="mt-4 text-slate-600">
        <strong className="font-semibold text-slate-900">Rule of thumb:</strong> start with a view. Make it secure if it
        will be shared. Reach for a materialized view to speed up a heavy query on one large table, and a dynamic table
        when the logic joins several tables or is a step in a pipeline.
      </p>

      <p className="mt-8 rounded-lg border border-indigo-200 bg-indigo-50/60 px-4 py-3 text-sm text-slate-700">
        <strong className="font-semibold text-slate-900">Who can see what?</strong> Roles, the role hierarchy, masking
        and row access policies, encryption, and sensitive-data handling are covered in{" "}
        <a href="#governance" className="font-semibold text-indigo-600 hover:text-indigo-500">
          Data Governance
        </a>
        .
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
    </div>
  );
}
