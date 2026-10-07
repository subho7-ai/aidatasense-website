import type { ReactNode } from "react";
import fabricLogo from "../assets/microsoft-fabric-logo.png";
import hierarchyWithinTenant from "../assets/fabric-docs-hierarchy-within-tenant.png";
import { ComparisonTable } from "./ComparisonTable";
import { Icon } from "./diagramIcons";
import { DiagramCard, DocsFigure } from "./docsFigure";

const OVERVIEW_URL = "https://learn.microsoft.com/en-us/fabric/fundamentals/microsoft-fabric-overview";

const NAME_PARTS = [
  { value: "SalesLakehouse", label: "Lakehouse / warehouse", tone: "border-indigo-300 bg-indigo-50 text-indigo-700" },
  { value: "dbo", label: "Schema", tone: "border-sky-300 bg-sky-50 text-sky-700" },
  { value: "orders", label: "Table", tone: "border-emerald-300 bg-emerald-50 text-emerald-700" },
];

const PATH_PARTS: { text: string; label: string; tone: string }[] = [
  { text: "abfss://", label: "ADLS-compatible driver", tone: "bg-slate-100 text-slate-700 border-slate-300" },
  { text: "Sales-Prod", label: "Workspace", tone: "bg-sky-50 text-sky-800 border-sky-300" },
  { text: "@onelake.dfs.fabric.microsoft.com", label: "OneLake endpoint", tone: "bg-slate-100 text-slate-700 border-slate-300" },
  { text: "/SalesLakehouse.Lakehouse", label: "Item", tone: "bg-indigo-50 text-indigo-800 border-indigo-300" },
  { text: "/Tables/orders", label: "Table folder", tone: "bg-emerald-50 text-emerald-800 border-emerald-300" },
];

// Same colours as the Databricks and Snowflake pages for Dev / Test / Prod.
const ENVIRONMENTS = [
  { name: "Sales-Dev", capacity: "Dev capacity · F8", box: "border-sky-300 bg-sky-50", text: "text-sky-700" },
  { name: "Sales-Test", capacity: "Dev capacity · F8", box: "border-amber-300 bg-amber-50", text: "text-amber-700" },
  { name: "Sales-Prod", capacity: "Prod capacity · F64", box: "border-rose-300 bg-rose-50", text: "text-rose-700" },
];

const ITEMS: { name: string; kinds: string[] }[] = [
  { name: "Store", kinds: ["Lakehouse", "Warehouse", "Eventhouse", "SQL database"] },
  { name: "Move & transform", kinds: ["Pipeline", "Dataflow Gen2", "Notebook", "Eventstream"] },
  { name: "Serve", kinds: ["Semantic model", "Report", "Dashboard"] },
  { name: "AI", kinds: ["Data agent", "ML model", "Ontology"] },
];

const TENANT_OBJECTS: [string, string][] = [
  ["Tenant settings", "What features are on, and for whom"],
  ["Domains", "Business areas that group workspaces"],
  ["Capacities", "Compute, sizes, and regions"],
  ["OneLake catalog", "Find and govern every item"],
  ["Microsoft Purview", "Labels, DLP, and audit"],
];

function EnvironmentDiagram() {
  return (
    <DiagramCard title="One tenant, one domain, one workspace per environment — Dev and Test share a small capacity, Prod gets its own.">
      <div className="rounded-2xl border-2 border-dashed border-slate-300 p-2 sm:p-3">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 px-1">
          <div className="flex items-center gap-2 text-slate-700">
            <img src={fabricLogo} alt="" className="h-5 w-5" />
            <p className="text-sm font-semibold">Fabric tenant</p>
            <span className="text-xs text-slate-500">your organization · Microsoft Entra ID</span>
          </div>
          <span className="rounded-full border border-teal-300 bg-teal-50 px-2.5 py-0.5 text-[11px] font-semibold text-teal-700">
            Domain · Sales
          </span>
        </div>
        <div className="mt-3 grid gap-4 lg:grid-cols-[1fr_220px]">
          <div>
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {ENVIRONMENTS.map((env) => (
                <div key={env.name} className={`rounded-lg border-2 bg-white px-2 py-2 text-center shadow-sm ${env.box}`}>
                  <div className={`flex items-center justify-center gap-1.5 ${env.text}`}>
                    <Icon name="folderGit" className="h-4 w-4 shrink-0" />
                    <p className="text-sm font-semibold">Workspace</p>
                  </div>
                  <p className={`font-mono text-xs font-semibold ${env.text}`}>{env.name}</p>
                  <p className="text-[11px] text-slate-500">{env.capacity}</p>
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
                    <p className="text-sm font-semibold">Lakehouse</p>
                  </div>
                  <p className="font-mono text-xs font-semibold text-indigo-700">SalesLakehouse</p>
                  <p className="text-[11px] text-slate-500">Tables · Files</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-2 sm:gap-3" aria-hidden>
              {ENVIRONMENTS.map((env) => (
                <div key={env.name} className="mx-auto h-4 w-px bg-slate-300" />
              ))}
            </div>
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-3">
              <p className="text-center text-xs font-semibold uppercase tracking-wide text-emerald-700">Items in every workspace</p>
              <div className="mt-2 grid grid-cols-2 gap-2 xl:grid-cols-4">
                {ITEMS.map((group) => (
                  <div key={group.name} className="rounded-lg border border-emerald-200 bg-white px-2.5 py-2 shadow-sm">
                    <p className="text-sm font-semibold text-slate-900">{group.name}</p>
                    <div className="mt-1.5 flex flex-wrap gap-1">
                      {group.kinds.map((kind) => (
                        <span key={kind} className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
                          {kind}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-3 rounded-lg border border-teal-200 bg-teal-50/60 px-3 py-2 text-center text-xs text-teal-800">
              <strong className="font-semibold">OneLake</strong> — one data lake under every workspace, stored once as
              Delta Parquet
            </div>
          </div>

          <div className="flex flex-col overflow-hidden rounded-xl border border-slate-300 bg-slate-50">
            <div className="bg-slate-900 px-3 py-2">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-300">Also in the tenant</p>
              <p className="text-xs text-slate-400">Managed above any workspace</p>
            </div>
            <ul className="space-y-2 p-3">
              {TENANT_OBJECTS.map(([name, what]) => (
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

const ITEM_COMPARISON = {
  title: "Lakehouse vs. warehouse vs. eventhouse vs. SQL database",
  headers: ["", "Lakehouse", "Warehouse", "Eventhouse", "SQL database"],
  rows: [
    ["Built for", "Data engineering on any data", "SQL analytics and modeling", "Real-time and time-series data", "Operational apps (OLTP)"],
    ["Main language", "Spark (Python, SQL, Scala, R)", "T-SQL", "KQL", "T-SQL"],
    ["Writes with", "Spark, pipelines, dataflows", "T-SQL, with multi-table transactions", "Eventstreams and ingestion", "T-SQL"],
    ["SQL access", "Read-only SQL analytics endpoint", "Full read and write", "Query with KQL or T-SQL", "Full read and write"],
    ["Data in OneLake", "Delta tables + files", "Delta tables", "Can be made available as Delta", "Mirrored automatically as Delta"],
    ["Best for", "Raw-to-curated pipelines, ML, files", "Star schemas and SQL-first teams", "Logs, telemetry, IoT", "App data you also want to analyze"],
  ],
};

const STORAGE_MODES = {
  title: "Semantic model storage modes",
  headers: ["", "Import", "DirectQuery", "Direct Lake"],
  rows: [
    ["Where data lives", "Copied into the model (VertiPaq)", "Stays in the source, queried live", "Reads OneLake Delta files directly — no copy"],
    ["Refresh needed", "Yes, on a schedule", "No — always current", "No — always current"],
    ["Query speed", "Fastest, fully in-memory", "Depends on the source system", "Near-Import speed, with no import step"],
    ["Best for", "Smaller datasets where max performance matters most", "Very large or frequently changing sources", "Large OneLake tables that need Import-like speed without the copy"],
  ],
};

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
    title: "One workspace per environment, per domain",
    why: "Dev, Test, and Prod each get their own workspace, so changes are promoted rather than edited live.",
    avoid: <p>One &quot;Sales&quot; workspace where people build and report at the same time</p>,
    do: <p className="font-mono">Sales-Dev · Sales-Test · Sales-Prod</p>,
  },
  {
    title: "Separate capacities for Dev and Prod",
    why: "Capacity is shared by everything in it; isolating Prod keeps experiments from throttling business reports.",
    avoid: <p>Every workspace on one F64</p>,
    do: <p>Dev and Test on an F8, Prod on its own F64</p>,
  },
  {
    title: "Give workspace roles to Entra groups",
    why: "Access follows joiners, movers, and leavers automatically, and reviews happen in one place.",
    avoid: <p>Twenty individual users added as Members</p>,
    do: <p>sg-sales-engineers → Contributor · sg-sales-analysts → Viewer</p>,
  },
  {
    title: "Keep Admin for a few people",
    why: "Workspace Admins can delete the workspace and change who has access; most builders only need Contributor.",
    avoid: <p>Everyone on the team is Admin</p>,
    do: <p>Two named Admins; builders as Contributors</p>,
  },
];

export function FabricObjectHierarchy() {
  return (
    <div className="border-t border-slate-200 py-8">
      <h2 className="text-2xl font-semibold text-slate-900">Fabric Object Hierarchy</h2>
      <p className="mt-3 text-slate-600">
        Everything in Fabric lives in one hierarchy: <strong className="font-semibold text-slate-900">tenant → workspace
        → item</strong>. Items are the things you build — lakehouses, warehouses, notebooks, pipelines, semantic models,
        reports — and each one stores its data in OneLake, in a folder for its workspace and item.
      </p>
      <DocsFigure
        src={hierarchyWithinTenant}
        alt="Microsoft Fabric tenant containing workspaces, each containing lakehouses, warehouses, datasets, and Kusto databases, each made of folders and files"
        caption="OneLake is organized like the tenant: workspaces are folders, and each item inside is a folder of files."
        sourceLabel="Microsoft Learn — What is Microsoft Fabric?"
        sourceUrl={OVERVIEW_URL}
        maxWidth="max-w-lg"
      />

      <DiagramCard title="In SQL, tables are named item.schema.table — and other workspaces are reached through shortcuts.">
        <div className="flex flex-wrap items-start justify-center gap-1 font-mono text-base sm:text-xl">
          {NAME_PARTS.map((part, index) => (
            <div key={part.label} className="flex items-start gap-1">
              <div className="flex flex-col items-center">
                <span className={`rounded-lg border px-3 py-1.5 font-semibold ${part.tone}`}>{part.value}</span>
                <span className="mt-2 font-sans text-xs font-semibold uppercase tracking-wide text-slate-500">{part.label}</span>
              </div>
              {index < NAME_PARTS.length - 1 && <span className="pt-1.5 text-slate-400">.</span>}
            </div>
          ))}
        </div>
      </DiagramCard>

      <h3 className="mt-8 text-lg font-semibold text-slate-900">Every table has a OneLake path</h3>
      <p className="mt-3 text-slate-600">
        OneLake speaks the same API as Azure Data Lake Storage Gen2, so every table also has an{" "}
        <span className="font-mono text-sm">abfss://</span> path that Spark, Azure Databricks, and other tools can use
        directly.
      </p>
      <figure className="mt-4 rounded-xl border border-slate-200 bg-white p-4 sm:p-6">
        <div className="flex flex-wrap items-start justify-center gap-1 font-mono text-xs sm:text-sm">
          {PATH_PARTS.map((part) => (
            <div key={part.text} className="flex flex-col items-center">
              <span className={`rounded-md border px-2 py-1 font-semibold ${part.tone}`}>{part.text}</span>
              <span className="mt-1.5 max-w-[9rem] text-center font-sans text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                {part.label}
              </span>
            </div>
          ))}
        </div>
      </figure>

      <h3 className="mt-8 text-lg font-semibold text-slate-900">Tenants, domains, and environments</h3>
      <p className="mt-3 text-slate-600">
        A tenant holds all of an organization&apos;s Fabric. <strong className="font-semibold text-slate-900">Domains</strong>{" "}
        group workspaces by business area so governance can be delegated to that area, and{" "}
        <strong className="font-semibold text-slate-900">workspaces</strong> are the unit of access, Git, and deployment.
        The usual way to separate environments is one workspace each for Dev, Test, and Prod — with the same item names
        in each, so the same code runs everywhere.
      </p>
      <EnvironmentDiagram />

      <h3 className="mt-8 text-lg font-semibold text-slate-900">Choosing where data lives</h3>
      <p className="mt-3 text-slate-600">
        All four store data in OneLake as Delta Parquet, so any engine can read any of them. The difference is which
        engine writes, and what each is optimized for.
      </p>
      <ComparisonTable {...ITEM_COMPARISON} embedded />
      <p className="mt-4 text-slate-600">
        <strong className="font-semibold text-slate-900">Rule of thumb:</strong> engineers who think in Spark land and
        clean data in a lakehouse; SQL-first teams model the gold layer in a warehouse. Many teams use both — a
        lakehouse for raw and silver, a warehouse for gold — reading each other through OneLake without copies.
      </p>

      <p className="mt-8 text-slate-600">
        A Power BI semantic model built on Fabric data can connect to that data in three ways, trading off freshness,
        speed, and whether the data is copied at all.
      </p>
      <ComparisonTable {...STORAGE_MODES} embedded />

      <p className="mt-8 rounded-lg border border-indigo-200 bg-indigo-50/60 px-4 py-3 text-sm text-slate-700">
        <strong className="font-semibold text-slate-900">Who can see what?</strong> Workspace roles, item sharing,
        OneLake security, row- and column-level security, encryption, and sensitive-data handling are covered in{" "}
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
