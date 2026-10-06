import { Icon, type IconName, SNOWFLAKE_LOGO } from "./diagramIcons";

const ARTICLE_URL = "https://www.snowflake.com/en/why-snowflake/what-is-data-cloud/data-cloud-architecture/";
const ICEBERG_URL = "https://docs.snowflake.com/en/user-guide/tables-iceberg";

// The four architectural layers Snowflake describes in its Data Cloud architecture overview.
const LAYERS: { name: string; icon: IconName; color: string; soft: string; body: string }[] = [
  {
    name: "Optimized storage",
    icon: "database",
    color: "text-cyan-700",
    soft: "bg-cyan-50",
    body: "Brings unstructured, semi-structured, and structured data together at near-infinite scale.",
  },
  {
    name: "Elastic, multi-cluster compute",
    icon: "server",
    color: "text-indigo-700",
    soft: "bg-indigo-50",
    body: "Scales up and down with usage, and out to support massive numbers of concurrent users, data volumes, and workloads — all with one engine.",
  },
  {
    name: "Cloud services",
    icon: "sparkles",
    color: "text-violet-700",
    soft: "bg-violet-50",
    body: "Keeps Snowflake self-managing, with automation that removes costly and complex resource work.",
  },
  {
    name: "Snowgrid",
    icon: "globe",
    color: "text-sky-700",
    soft: "bg-sky-50",
    body: "One connected experience across regions and clouds, for unified governance, business continuity, and collaboration within and between organizations.",
  },
];

const SAAS_TRAITS: { label: string; body: string; icon: IconName }[] = [
  { label: "Nothing to install or run", body: "No servers, clusters, or software to provision, patch, or tune", icon: "server" },
  { label: "Always up to date", body: "Snowflake releases updates continuously, with no upgrade projects", icon: "rocket" },
  { label: "Pay for what you use", body: "Storage per terabyte, compute per second while warehouses run", icon: "chart" },
  { label: "Your cloud, your region", body: "Runs on AWS, Azure, or Google Cloud, in the region you choose", icon: "globe" },
];

const KEEP_DATA_OPTIONS: { title: string; body: string; when: string; icon: IconName; recommended?: boolean }[] = [
  {
    title: "Apache Iceberg tables",
    body: "Data is written as Parquet plus Iceberg metadata in your own bucket, through an external volume. Snowflake queries, updates, and governs it there.",
    when: "The main option: full read and write, roles and masking, Time Travel — with the files in your storage",
    icon: "database",
    recommended: true,
  },
  {
    title: "External Iceberg catalogs",
    body: "Tables already managed by AWS Glue, Snowflake Open Catalog (Apache Polaris), or any Iceberg REST catalog can be queried without moving them.",
    when: "Data already lives in a lakehouse that other engines write to",
    icon: "share",
  },
  {
    title: "External tables",
    body: "A read-only table over files in your storage — Parquet, CSV, JSON, and more — queried in place through an external stage.",
    when: "Occasional queries over raw files before deciding what to load",
    icon: "folderGit",
  },
  {
    title: "Tri-Secret Secure",
    body: "On Business Critical edition, data inside Snowflake is encrypted with a key that combines yours with Snowflake's — revoke yours and the data can't be read.",
    when: "Data can move into Snowflake, but you must keep control of the encryption",
    icon: "key",
  },
];

function KeepDataDiagram() {
  return (
    <figure className="mt-4 rounded-xl border border-slate-200 bg-white p-4 sm:p-6">
      <div className="grid items-stretch gap-3 md:grid-cols-[1fr_auto_1fr]">
        <div className="rounded-xl border-2 border-dashed border-sky-300 bg-sky-50/50 p-4">
          <div className="flex items-center gap-2 text-sky-800">
            <img src={SNOWFLAKE_LOGO} alt="" className="h-5 w-5" />
            <p className="text-sm font-semibold">Snowflake&apos;s cloud account</p>
          </div>
          <p className="text-xs text-slate-500">Fully managed by Snowflake</p>
          <div className="mt-3 space-y-2">
            {[
              ["server", "Virtual warehouses", "Run the queries"],
              ["shieldCheck", "Cloud services", "Metadata, security, optimization"],
              ["users", "Roles & policies", "Who can see what"],
            ].map(([icon, title, note]) => (
              <div key={title} className="flex items-center gap-2 rounded-lg border border-sky-200 bg-white px-3 py-2">
                <Icon name={icon as IconName} className="h-4 w-4 shrink-0 text-sky-700" />
                <div>
                  <p className="text-sm font-semibold text-slate-900">{title}</p>
                  <p className="text-xs text-slate-500">{note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-row items-center justify-center gap-2 text-center md:flex-col">
          <span className="text-xs font-semibold text-slate-500">reads &amp; writes in place</span>
          <span className="text-xl text-slate-400" aria-hidden>
            <span className="md:hidden">⇅</span>
            <span className="hidden md:inline">⇄</span>
          </span>
          <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
            private link · same region
          </span>
        </div>

        <div className="rounded-xl border-2 border-dashed border-emerald-300 bg-emerald-50/50 p-4">
          <div className="flex items-center gap-2 text-emerald-800">
            <Icon name="database" className="h-5 w-5" />
            <p className="text-sm font-semibold">Your cloud account</p>
          </div>
          <p className="text-xs text-slate-500">S3, Azure Storage, or Google Cloud Storage — you own it</p>
          <div className="mt-3 space-y-2">
            {[
              ["database", "Iceberg tables", "Parquet + Iceberg metadata"],
              ["share", "Your Iceberg catalog", "Glue, Open Catalog, or REST"],
              ["folderGit", "Raw files", "Queried as external tables"],
            ].map(([icon, title, note]) => (
              <div key={title} className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-white px-3 py-2">
                <Icon name={icon as IconName} className="h-4 w-4 shrink-0 text-emerald-700" />
                <div>
                  <p className="text-sm font-semibold text-slate-900">{title}</p>
                  <p className="text-xs text-slate-500">{note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <figcaption className="mt-4 text-center text-sm text-slate-500">
        The data stays in your bucket; Snowflake brings the compute and the governance to it.
      </figcaption>
    </figure>
  );
}

export function SnowflakePillars() {
  return (
    <div className="border-t border-slate-200 py-8">
      <h2 className="text-2xl font-semibold text-slate-900">The Data Cloud</h2>
      <p className="mt-3 text-slate-600">
        Snowflake is <strong className="font-semibold text-slate-900">software as a service</strong>. There is no
        software to install and no infrastructure to manage: Snowflake runs the whole platform in its own cloud account,
        on the AWS, Azure, or Google Cloud region you pick, and you use it through a browser, SQL, drivers, and APIs.
        That&apos;s the biggest difference from Databricks, where compute can run inside your own cloud account.
      </p>
      <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {SAAS_TRAITS.map((trait) => (
          <div key={trait.label} className="flex gap-2.5 rounded-xl border border-slate-200 bg-white p-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-slate-700">
              <Icon name={trait.icon} className="h-4 w-4" />
            </span>
            <div>
              <p className="text-sm font-semibold text-slate-900">{trait.label}</p>
              <p className="text-xs text-slate-600">{trait.body}</p>
            </div>
          </div>
        ))}
      </div>

      <h3 className="mt-8 text-lg font-semibold text-slate-900">The four architectural layers</h3>
      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {LAYERS.map((layer) => (
          <div key={layer.name} className="flex flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${layer.soft} ${layer.color}`}>
              <Icon name={layer.icon} className="h-5 w-5" />
            </span>
            <p className="mt-3 text-sm font-semibold text-slate-900">{layer.name}</p>
            <p className="mt-1 text-xs text-slate-600">{layer.body}</p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-slate-500">
        Layers as described in{" "}
        <a href={ARTICLE_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-indigo-600 hover:text-indigo-500">
          Snowflake — Data Cloud Architecture
        </a>
        . Icons redrawn in this site&apos;s style.
      </p>

      <h3 className="mt-8 text-lg font-semibold text-slate-900">Don&apos;t want to move your data into Snowflake?</h3>
      <p className="mt-3 text-slate-600">
        Being SaaS usually means loading data into Snowflake-managed storage. For organizations that can&apos;t or
        won&apos;t send gigabytes or terabytes there — because of data residency rules, an existing data lake, or other
        engines that need the same files — Snowflake can work on data that stays in{" "}
        <strong className="font-semibold text-slate-900">your own cloud storage</strong>.
      </p>
      <KeepDataDiagram />
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {KEEP_DATA_OPTIONS.map((option) => (
          <div
            key={option.title}
            className={`rounded-xl border bg-white p-4 ${option.recommended ? "border-emerald-300 ring-1 ring-emerald-200" : "border-slate-200"}`}
          >
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                <Icon name={option.icon} className="h-4 w-4" />
              </span>
              <p className="font-semibold text-slate-900">{option.title}</p>
              {option.recommended && (
                <span className="rounded-full bg-emerald-600 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                  Start here
                </span>
              )}
            </div>
            <p className="mt-2 text-sm text-slate-600">{option.body}</p>
            <p className="mt-2 text-xs text-slate-500">
              <span className="font-semibold text-slate-700">Best when: </span>
              {option.when}
            </p>
          </div>
        ))}
      </div>
      <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
        <strong className="font-semibold">Worth knowing:</strong> the compute still runs in Snowflake&apos;s account, so
        data is read over the network at query time. Keep your bucket in the same cloud region as your Snowflake
        account to avoid egress charges and latency, and use private connectivity so traffic never crosses the public
        internet. External tables are read-only and slower than native tables, and Iceberg tables don&apos;t get
        Fail-safe.{" "}
        <a href={ICEBERG_URL} target="_blank" rel="noopener noreferrer" className="font-semibold underline">
          Iceberg tables in the Snowflake docs →
        </a>
      </p>
    </div>
  );
}
