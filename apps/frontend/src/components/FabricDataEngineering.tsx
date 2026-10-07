import { ComparisonTable } from "./ComparisonTable";
import { Icon, type IconName } from "./diagramIcons";

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

const VALUE_PROPS: { icon: IconName; title: string; body: string }[] = [
  { icon: "sparkles", title: "Make your data AI-ready", body: "Spend time on data quality, not infrastructure tuning — capacity and compute are managed for you." },
  { icon: "pipeline", title: "Build pipelines your way", body: "Low-code with Dataflow Gen2, code-first with Notebooks, or orchestration-only with Data pipelines." },
  { icon: "database", title: "Connect any data source", body: "200+ connectors, real-time streams, and Shortcuts into external data — all landing in one OneLake." },
];

const STAGES: { name: string; icon: IconName; color: string; soft: string; summary: string; items: [string, string][] }[] = [
  {
    name: "Ingest",
    icon: "export",
    color: "text-sky-700",
    soft: "border-sky-200 bg-sky-50/60",
    summary: "Get data in from anywhere — databases, SaaS apps, files, streams, and other OneLake workspaces.",
    items: [
      ["Data Factory pipelines", "200+ connectors for batch copy and orchestration"],
      ["Dataflow Gen2", "Low-code ingest with Power Query transforms built in"],
      ["Mirroring", "Continuous, near-real-time replication of operational databases"],
      ["OneLake Shortcuts", "Reference external data in place, with nothing physically copied"],
    ],
  },
  {
    name: "Transform & orchestrate",
    icon: "pipeline",
    color: "text-indigo-700",
    soft: "border-indigo-200 bg-indigo-50/60",
    summary: "Shape raw data into trusted tables, in whichever language the team already uses.",
    items: [
      ["Notebooks", "Spark — Python, Scala, SQL, or R — for large-scale or complex transforms"],
      ["Dataflow Gen2", "Power Query (M) transforms for citizen and professional developers alike"],
      ["Warehouse T-SQL", "Stored procedures and views for SQL-first teams"],
      ["Data pipelines", "Schedule and chain notebooks, dataflows, and copy activities into one flow"],
    ],
  },
  {
    name: "Deliver",
    icon: "share",
    color: "text-emerald-700",
    soft: "border-emerald-200 bg-emerald-50/60",
    summary: "Put curated data in front of the people, apps, and agents that need it.",
    items: [
      ["Direct Lake in Power BI", "Reports query OneLake tables directly, no import step"],
      ["SQL analytics endpoint", "Read-only T-SQL over a Lakehouse's tables, auto-generated"],
      ["OneLake Shortcuts out", "Other workspaces and tenants read curated tables without a copy"],
      ["Fabric data agents & Copilot", "AI agents reason over the same governed, curated tables"],
    ],
  },
  {
    name: "Automate",
    icon: "rocket",
    color: "text-amber-700",
    soft: "border-amber-200 bg-amber-50/60",
    summary: "Develop, deploy, and watch pipelines like software.",
    items: [
      ["Git integration", "Version every item and deploy from a branch"],
      ["fabric-cicd or deployment pipelines", "Promote Dev → Test → Prod (see the DevOps tab)"],
      ["Scheduled & event triggers", "Run a pipeline on a schedule or when an Eventstream fires"],
      ["Monitoring hub", "Run history, status, and alerts for every item in the tenant"],
    ],
  },
];

const MEDALLION_LAYERS: { name: string; tone: string; text: string; writtenBy: string; body: string }[] = [
  {
    name: "Bronze",
    tone: "border-amber-300 bg-amber-50/60",
    text: "text-amber-800",
    writtenBy: "Data Factory, Mirroring, Eventstreams",
    body: "Raw data landed exactly as it arrived — unprocessed, in its own lakehouse or schema.",
  },
  {
    name: "Silver",
    tone: "border-slate-300 bg-slate-100/60",
    text: "text-slate-700",
    writtenBy: "Notebooks (Spark)",
    body: "Cleaned, deduped, and conformed into a shared shape other tables can join against.",
  },
  {
    name: "Gold",
    tone: "border-yellow-300 bg-yellow-50/60",
    text: "text-yellow-800",
    writtenBy: "Warehouse (T-SQL), or a notebook",
    body: "Business-ready aggregates — often a star schema in a Warehouse that Power BI queries directly.",
  },
];

const TRANSFORM_CHOICES = {
  title: "Choosing a transformation tool",
  headers: ["", "Dataflow Gen2", "Notebook (Spark)", "Warehouse T-SQL", "Data pipeline"],
  rows: [
    ["Style", "Low-code — Power Query (M)", "Code — Python, Scala, SQL, R", "SQL — stored procedures, views", "No-code orchestration, not transformation itself"],
    ["Best for", "Citizen developers, quick reshaping", "Large-scale or complex transforms, ML prep", "SQL-first teams, set-based logic", "Scheduling and chaining other activities"],
    ["Runs on", "Fabric's Dataflow (Power Query) engine", "Spark, against the shared capacity", "The Warehouse's SQL engine", "Orchestrates other items; its Copy activity does move data and consumes capacity"],
    ["Writes to", "A Lakehouse or Warehouse table", "A Lakehouse's Delta tables", "Warehouse tables and views", "Wherever a Copy activity points — heavy transforms still belong in a notebook, dataflow, or T-SQL"],
  ],
};

export function FabricDataEngineering() {
  return (
    <div id="data-engineering" className="scroll-mt-[180px] border-t border-slate-200 py-8">
      <h2 className="text-2xl font-semibold text-slate-900">Data Engineering on Fabric</h2>
      <p className="mt-3 text-slate-600">
        Fabric handles the whole pipeline — ingest, transform, orchestrate, and deliver — on the same platform where
        the data lives in OneLake, so there's no separate cluster to size or storage account to wire up. Pipelines
        are built low-code, in Spark, or in T-SQL, whichever fits the team and the job.
      </p>

      <div className="mt-6 grid gap-3 md:grid-cols-3">
        {VALUE_PROPS.map((prop) => (
          <div key={prop.title} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
              <Icon name={prop.icon} className="h-5 w-5" />
            </span>
            <p className="mt-3 font-semibold text-slate-900">{prop.title}</p>
            <p className="mt-1 text-sm text-slate-600">{prop.body}</p>
          </div>
        ))}
      </div>

      <h3 className="mt-8 text-lg font-semibold text-slate-900">The pipeline lifecycle</h3>
      <p className="mt-3 text-slate-600">
        Every pipeline follows the same arc: data is <strong className="font-semibold text-slate-900">ingested</strong>
        , <strong className="font-semibold text-slate-900">transformed and orchestrated</strong>, then{" "}
        <strong className="font-semibold text-slate-900">delivered</strong> — with an{" "}
        <strong className="font-semibold text-slate-900">automation</strong> layer underneath for development,
        deployment, and monitoring.
      </p>
      <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {STAGES.map((stage) => (
          <div key={stage.name} className={`rounded-xl border p-4 ${stage.soft}`}>
            <div className={`flex items-center gap-2 ${stage.color}`}>
              <Icon name={stage.icon} className="h-5 w-5" />
              <p className="font-semibold">{stage.name}</p>
            </div>
            <p className="mt-1 text-sm text-slate-700">{stage.summary}</p>
            <ul className="mt-3 space-y-2">
              {stage.items.map(([name, what]) => (
                <li key={name} className="rounded-lg border border-white bg-white/80 px-2.5 py-1.5">
                  <p className="text-sm font-semibold text-slate-900">{name}</p>
                  <p className="text-xs text-slate-600">{what}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <h3 className="mt-8 text-lg font-semibold text-slate-900">Ingest and land it in OneLake</h3>
      <p className="mt-3 text-slate-600">
        <strong className="font-semibold text-slate-900">Data Factory</strong> pipelines bring in batch data through
        200+ connectors covering databases, SaaS apps, and files.{" "}
        <strong className="font-semibold text-slate-900">Mirroring</strong> continuously replicates operational
        databases like Azure SQL DB into OneLake in near real time, without a pipeline to maintain. And{" "}
        <strong className="font-semibold text-slate-900">OneLake Shortcuts</strong> skip ingestion entirely for data
        that already lives in ADLS, Amazon S3, or another workspace — it&apos;s referenced in place, not copied.
      </p>

      <h3 className="mt-8 text-lg font-semibold text-slate-900">Transform and orchestrate</h3>
      <p className="mt-3 text-slate-600">
        Transformation happens wherever the team is most comfortable: Spark notebooks in Python, Scala, SQL, or R;
        low-code Dataflow Gen2 for Power Query-style reshaping; or T-SQL stored procedures and views in a Warehouse.
        Data pipelines tie the pieces together — scheduling a notebook, then a dataflow, then a refresh — without
        doing the transformation work themselves.
      </p>
      <ComparisonTable {...TRANSFORM_CHOICES} embedded />
      <Code title="Notebook · land raw files as a Delta table (illustrative)">{`from pyspark.sql.functions import col

# Read raw files landed in the lakehouse's Files area
df = spark.read.json("Files/raw/orders/*.json")

# Clean up types and write as a managed Delta table
(df.withColumn("order_total", col("total").cast("decimal(12,2)"))
   .write.format("delta")
   .mode("append")
   .saveAsTable("orders_silver"))`}</Code>
      <p className="mt-4 text-slate-600">
        <strong className="font-semibold text-slate-900">Rule of thumb:</strong> reach for Dataflow Gen2 first for
        straightforward reshaping — it covers a lot of ground with no code. Move to a Notebook when the logic is
        complex, the data is large, or you need something Power Query can&apos;t express; use Warehouse T-SQL when
        the team is already SQL-first and the data's already landed there.
      </p>

      <h3 className="mt-8 text-lg font-semibold text-slate-900">Real-Time Intelligence</h3>
      <p className="mt-3 text-slate-600">
        Not every pipeline is batch. For data that needs to be queried or acted on within seconds of arriving,
        Real-Time Intelligence skips the batch tools above: <strong className="font-semibold text-slate-900">Eventstreams</strong>{" "}
        ingest and lightly transform streaming sources — Event Hubs, Kafka, IoT, CDC feeds — into an{" "}
        <strong className="font-semibold text-slate-900">Eventhouse</strong>&apos;s KQL database, which stores and
        indexes events for fast time-series queries. <strong className="font-semibold text-slate-900">Real-Time Dashboards</strong>{" "}
        and <strong className="font-semibold text-slate-900">Data Activator</strong> then query or act on that data
        directly — alerting, messaging, or triggering a pipeline when a condition is met.
      </p>
      <Code title="KQL · events per minute over the last hour (illustrative)">{`OrdersEvents
| where Timestamp > ago(1h)
| summarize EventCount = count() by bin(Timestamp, 1m)
| order by Timestamp asc`}</Code>
      <p className="mt-4 text-slate-600">
        <strong className="font-semibold text-slate-900">Rule of thumb:</strong> reach for Real-Time Intelligence when
        freshness is measured in seconds — alerting, live dashboards, IoT and telemetry. If the question can tolerate
        minutes of latency, land the same stream in a lakehouse through an Eventstream or Mirroring instead, and
        transform it with the regular pipeline tools above.
      </p>

      <h3 className="mt-8 text-lg font-semibold text-slate-900">Medallion architecture in Fabric</h3>
      <p className="mt-3 text-slate-600">
        Most Fabric lakehouses land data in three layers, often as three separate lakehouses — or three schemas in
        one — so each layer can have its own lifecycle and permissions.
      </p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        {MEDALLION_LAYERS.flatMap((layer, index) => {
          const card = (
            <div key={layer.name} className={`flex-1 rounded-xl border p-4 ${layer.tone}`}>
              <p className={`font-semibold ${layer.text}`}>{layer.name}</p>
              <p className="mt-1 text-sm text-slate-700">{layer.body}</p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Typically written by</p>
              <p className="text-xs text-slate-600">{layer.writtenBy}</p>
            </div>
          );
          if (index === MEDALLION_LAYERS.length - 1) return [card];
          return [
            card,
            <span key={`${layer.name}-arrow`} className="hidden text-xl text-slate-400 sm:block" aria-hidden="true">
              →
            </span>,
          ];
        })}
      </div>
      <p className="mt-4 text-slate-600">
        <strong className="font-semibold text-slate-900">Gold often means a Warehouse:</strong> SQL-first teams
        frequently model gold as Warehouse tables with T-SQL, since multi-table transactions and familiar SQL tooling
        make star schemas easier to build and govern there — though a lakehouse&apos;s SQL analytics endpoint can
        serve gold too.
      </p>
    </div>
  );
}
