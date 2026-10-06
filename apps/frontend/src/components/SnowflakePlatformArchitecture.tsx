import { ComparisonTable } from "./ComparisonTable";
import { Icon, type IconName } from "./diagramIcons";

const LAYERS: { name: string; icon: IconName; color: string; soft: string; what: string; points: string[] }[] = [
  {
    name: "Cloud services",
    icon: "shieldCheck",
    color: "text-sky-700",
    soft: "bg-sky-50 border-sky-200",
    what: "The brain of the platform — always on, managed by Snowflake.",
    points: ["Authentication and access control", "Metadata and transactions", "Query parsing and optimization", "Infrastructure management"],
  },
  {
    name: "Compute",
    icon: "server",
    color: "text-indigo-700",
    soft: "bg-indigo-50 border-indigo-200",
    what: "Virtual warehouses: independent clusters that run your queries.",
    points: ["Each warehouse has its own CPU, memory, and cache", "Start, resize, or suspend in seconds", "Warehouses never compete for resources", "Billed per second while running"],
  },
  {
    name: "Database storage",
    icon: "database",
    color: "text-cyan-700",
    soft: "bg-cyan-50 border-cyan-200",
    what: "One copy of the data, shared by every warehouse.",
    points: ["Compressed, columnar micro-partitions", "Structured, semi-structured, and unstructured data", "Stored in Snowflake-managed cloud storage", "Not directly accessible — only through SQL"],
  },
];

const COMPUTE_TYPES = {
  title: "Warehouse types and serverless compute",
  headers: ["", "Standard warehouse", "Multi-cluster warehouse", "Snowpark-optimized warehouse", "Serverless"],
  rows: [
    [
      "Built for",
      "SQL queries, ELT, and BI",
      "Many users querying at once",
      "Memory-heavy Python: ML training, large UDFs",
      "Background services: Snowpipe, serverless tasks, clustering, MV refresh",
    ],
    ["Who sizes it", "You pick X-Small to 6X-Large", "You set min and max clusters", "You pick the size", "Snowflake sizes it automatically"],
    [
      "How it scales",
      "Scale up: a bigger size for heavier queries",
      "Scale out: adds clusters as queues build",
      "Scale up, with much more memory per node",
      "Automatically, per workload",
    ],
    ["Billing", "Credits per second while running (60-second minimum)", "Per running cluster", "Higher credit rate than standard", "Per use, at serverless rates"],
    ["Idle cost", "None once auto-suspend kicks in", "Extra clusters shut down when load drops", "None once suspended", "None"],
  ],
};

// Which compute options you size yourself vs. which Snowflake runs for you.
const COMPUTE_MAP = [
  {
    title: "Virtual warehouses",
    where: "You choose the size and when it runs",
    tone: "border-indigo-200 bg-indigo-50/60",
    text: "text-indigo-700",
    items: ["Standard warehouse", "Multi-cluster warehouse", "Snowpark-optimized warehouse"],
  },
  {
    title: "Serverless compute",
    where: "Snowflake sizes and runs it for you",
    tone: "border-cyan-200 bg-cyan-50/60",
    text: "text-cyan-700",
    items: ["Snowpipe & Snowpipe Streaming", "Serverless tasks", "Automatic clustering · MV refresh", "Search optimization"],
  },
];

export function SnowflakePlatformArchitecture() {
  return (
    <div className="border-t border-slate-200 py-8">
      <h2 className="text-2xl font-semibold text-slate-900">Platform Architecture</h2>
      <p className="mt-3 text-slate-600">
        Snowflake is a fully managed service built from three independent layers:{" "}
        <strong className="font-semibold text-slate-900">storage</strong>,{" "}
        <strong className="font-semibold text-slate-900">compute</strong>, and{" "}
        <strong className="font-semibold text-slate-900">cloud services</strong>. Because storage and compute are
        separate, any number of teams can work on the same single copy of data, each with its own compute, without
        slowing each other down.
      </p>


      <div className="mt-6 grid gap-3 md:grid-cols-3">
        {LAYERS.map((layer) => (
          <div key={layer.name} className={`rounded-xl border p-4 ${layer.soft}`}>
            <div className={`flex items-center gap-2 ${layer.color}`}>
              <Icon name={layer.icon} className="h-5 w-5" />
              <p className="font-semibold">{layer.name}</p>
            </div>
            <p className="mt-1 text-sm text-slate-700">{layer.what}</p>
            <ul className="mt-2 space-y-1 text-sm text-slate-600">
              {layer.points.map((point) => (
                <li key={point} className="flex gap-2">
                  <span className={layer.color}>•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <h3 className="mt-8 text-lg font-semibold text-slate-900">Who runs what</h3>
      <p className="mt-3 text-slate-600">
        All three layers run in Snowflake&apos;s cloud account, in the AWS, Azure, or Google Cloud region you choose —
        there are no clusters or virtual machines in your own cloud account to manage. That&apos;s the biggest
        architectural difference from Databricks&apos; classic compute plane. Your own cloud storage comes in only where
        you choose it: external stages for loading files, and external or Iceberg tables that keep data in your bucket.
        For private networking, connections to Snowflake can run over AWS PrivateLink, Azure Private Link, or Google
        Cloud Private Service Connect.
      </p>

      <h3 className="mt-8 text-lg font-semibold text-slate-900">Compute types</h3>
      <p className="mt-3 text-slate-600">
        Compute comes in two forms: <strong className="font-semibold text-slate-900">virtual warehouses</strong> that
        you size and schedule, and <strong className="font-semibold text-slate-900">serverless compute</strong> that
        Snowflake runs behind the scenes for background features.
      </p>
      <figure className="mt-6 rounded-xl border border-slate-200 bg-white p-4 sm:p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          {COMPUTE_MAP.map((group) => (
            <div key={group.title} className={`rounded-xl border p-4 ${group.tone}`}>
              <p className={`text-sm font-semibold ${group.text}`}>{group.title}</p>
              <p className="text-xs text-slate-500">{group.where}</p>
              <ul className="mt-3 space-y-1.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-800 shadow-sm"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <figcaption className="mt-4 text-center text-sm text-slate-500">
          Every Snowflake compute option is either a warehouse you control or a serverless service Snowflake manages.
        </figcaption>
      </figure>
      <ComparisonTable {...COMPUTE_TYPES} embedded />
      <p className="mt-4 text-slate-600">
        <strong className="font-semibold text-slate-900">Rule of thumb:</strong> give each workload its own warehouse —
        for example <span className="font-mono text-sm">ELT_WH</span>, <span className="font-mono text-sm">BI_WH</span>,
        and <span className="font-mono text-sm">DS_WH</span> — with auto-suspend on. Scale <em>up</em> when single
        queries are slow; scale <em>out</em> with multi-cluster when many users queue. Put a resource monitor on each so
        a runaway query can&apos;t burn the month&apos;s credits.
      </p>
    </div>
  );
}
