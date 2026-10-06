import type { ReactNode } from "react";
import iconAiReady from "../assets/snowflake-de-icon-ai-ready.svg";
import iconAllData from "../assets/snowflake-de-icon-all-data.svg";
import iconPipelines from "../assets/snowflake-de-icon-pipelines.svg";
import lakehouseDiagram from "../assets/snowflake-de-enterprise-lakehouse.webp";
import openflowConnectors from "../assets/snowflake-de-openflow-connectors.webp";
import pipelineLifecycle from "../assets/snowflake-de-pipeline-lifecycle.svg";
import pipelinesDiagram from "../assets/snowflake-de-pipelines.svg";
import { ComparisonTable } from "./ComparisonTable";
import { Icon, type IconName } from "./diagramIcons";
import { ZoomableImage } from "./ZoomableImage";

const PRODUCT_PAGE = "https://www.snowflake.com/en/product/data-engineering/";

function Figure({ src, alt, caption, maxWidth = "max-w-4xl" }: { src: string; alt: string; caption: ReactNode; maxWidth?: string }) {
  return (
    <figure className="mt-6 rounded-xl border border-slate-200 bg-white p-4 sm:p-6">
      <ZoomableImage src={src} alt={alt} className={`mx-auto w-full ${maxWidth}`} />
      <figcaption className="mt-4 text-center text-sm text-slate-500">
        {caption}
        <br />
        <a href={PRODUCT_PAGE} target="_blank" rel="noopener noreferrer" className="font-semibold text-indigo-600 hover:text-indigo-500">
          Source: Snowflake — Data Engineering
        </a>
      </figcaption>
    </figure>
  );
}

function Code({ title, children }: { title: string; children: string }) {
  return (
    <div className="mt-4 overflow-hidden rounded-xl bg-slate-900">
      <div className="border-b border-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-wide text-slate-400">{title}</div>
      <pre className="overflow-x-auto p-4 text-xs leading-relaxed text-slate-100">{children}</pre>
    </div>
  );
}

const VALUE_PROPS = [
  { icon: iconAiReady, title: "Make your data AI-ready", body: "Spend time on data quality, not infrastructure tuning — the platform runs with near-zero operations." },
  { icon: iconPipelines, title: "Build intelligent pipelines", body: "Develop pipelines faster in SQL, Python, or dbt, with built-in AI assistance." },
  { icon: iconAllData, title: "Connect any data source", body: "Structured, semi-structured, and unstructured data, batch or streaming, on one platform." },
];

// The four stages of the pipeline lifecycle diagram, with the Snowflake features behind each.
const STAGES: { name: string; icon: IconName; color: string; soft: string; summary: string; items: [string, string][] }[] = [
  {
    name: "Ingest",
    icon: "export",
    color: "text-sky-700",
    soft: "border-sky-200 bg-sky-50/60",
    summary: "Get data in from anywhere — databases, SaaS apps, files, streams, and other Snowflake accounts.",
    items: [
      ["Openflow", "Managed integration service built on Apache NiFi, with ready-made connectors"],
      ["Snowpipe", "Loads new files from a stage automatically as they arrive"],
      ["Snowpipe Streaming", "Writes rows directly into tables within seconds"],
      ["Sharing & Marketplace", "Zero-copy access to data other accounts publish"],
    ],
  },
  {
    name: "Transform & orchestrate",
    icon: "pipeline",
    color: "text-indigo-700",
    soft: "border-indigo-200 bg-indigo-50/60",
    summary: "Shape raw data into trusted tables, in the language your team already uses.",
    items: [
      ["Dynamic tables", "Declare the result in SQL; Snowflake keeps it refreshed to a target lag"],
      ["dbt Projects on Snowflake", "Run dbt models natively, with no separate dbt infrastructure"],
      ["Snowpark & pandas on Snowflake", "Python, Java, or Scala DataFrames that execute inside Snowflake"],
      ["Tasks & serverless tasks", "Schedule and chain steps, including stored procedures and UDFs"],
    ],
  },
  {
    name: "Deliver",
    icon: "share",
    color: "text-emerald-700",
    soft: "border-emerald-200 bg-emerald-50/60",
    summary: "Put curated data in front of the people, apps, and agents that need it.",
    items: [
      ["Sharing & replication", "Live data to other accounts, regions, and clouds"],
      ["Openflow", "Bi-directional — push data back out to other systems"],
      ["Worksheets & Streamlit", "Queries and data apps for business users"],
      ["Agentic workflows", "AI agents acting on governed, up-to-date data"],
    ],
  },
  {
    name: "Automate",
    icon: "rocket",
    color: "text-amber-700",
    soft: "border-amber-200 bg-amber-50/60",
    summary: "Develop, deploy, and watch pipelines like software.",
    items: [
      ["Workspaces, notebooks, VS Code", "Build where you're comfortable"],
      ["Git integration", "Version everything and deploy from a branch"],
      ["Database Change Management", "Declarative, repeatable object deployments"],
      ["Snowflake Trail", "Logs, traces, and alerts for pipeline observability"],
    ],
  },
];

const TRANSFORM_CHOICES = {
  title: "Choosing a transformation tool",
  headers: ["", "Dynamic tables", "Streams & tasks", "dbt Projects", "Snowpark / pandas"],
  rows: [
    ["Style", "Declarative SQL — say what, not how", "Imperative — you write each step", "SQL models with tests and docs", "Python, Java, or Scala code"],
    ["Refresh", "Automatic, to a target lag", "On a schedule or when a stream has data", "When the dbt project runs", "When your job runs"],
    ["Best for", "Most batch and near-real-time pipelines", "Fine-grained change processing and side effects", "Teams already standardized on dbt", "Complex logic, ML features, existing Spark/pandas code"],
    ["Orchestration", "Built in — dependencies inferred", "You chain tasks into a graph", "dbt handles model order; schedule with a task", "Schedule with a task or ML Job"],
  ],
};

export function SnowflakeDataEngineering() {
  return (
    <div id="data-engineering" className="scroll-mt-[180px] border-t border-slate-200 py-8">
      <h2 className="text-2xl font-semibold text-slate-900">Data Engineering on Snowflake</h2>
      <p className="mt-3 text-slate-600">
        Snowflake handles the whole pipeline — ingest, transform, orchestrate, and deliver — on the same platform where
        the data lives, so there are no clusters to size or Spark jobs to tune. Pipelines are built in SQL, Python, or
        dbt, and interoperate with open standards including Apache Iceberg, Apache NiFi, Apache Spark, dbt, and pandas.
      </p>

      <div className="mt-6 grid gap-3 md:grid-cols-3">
        {VALUE_PROPS.map((prop) => (
          <div key={prop.title} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <img src={prop.icon} alt="" className="h-10 w-10" />
            <p className="mt-3 font-semibold text-slate-900">{prop.title}</p>
            <p className="mt-1 text-sm text-slate-600">{prop.body}</p>
          </div>
        ))}
      </div>

      <h3 className="mt-8 text-lg font-semibold text-slate-900">The pipeline lifecycle</h3>
      <p className="mt-3 text-slate-600">
        Every pipeline follows the same arc: data is <strong className="font-semibold text-slate-900">ingested</strong>,{" "}
        <strong className="font-semibold text-slate-900">transformed and orchestrated</strong>, then{" "}
        <strong className="font-semibold text-slate-900">delivered</strong> — with an{" "}
        <strong className="font-semibold text-slate-900">automation</strong> layer underneath for development, deployment,
        and monitoring.
      </p>
      <Figure
        src={pipelineLifecycle}
        alt="Snowflake pipeline lifecycle: ingest from on-prem databases, audio and video, SaaS, PDFs, and Kafka through Openflow, streaming, files, and sharing; transform and orchestrate with dynamic tables, Snowpark, tasks, pandas on Snowflake, dbt Projects, and stored procedures; deliver through Openflow, agentic workflows, sharing and replication, and worksheets and Streamlit; automate with Workspaces, notebooks, VS Code, Git integration, Database Change Management, and Snowflake Trail"
        caption="Ingest → transform & orchestrate → deliver, with automation across every stage."
      />
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

      <h3 className="mt-8 text-lg font-semibold text-slate-900">Ingest with Openflow</h3>
      <p className="mt-3 text-slate-600">
        <strong className="font-semibold text-slate-900">Openflow</strong> is Snowflake&apos;s managed data integration
        service, built on Apache NiFi. It brings change data capture from databases such as SQL Server, MySQL, and
        PostgreSQL; SaaS apps such as Workday, Jira, Slack, and Google Ads; streams from Kafka and Kinesis; and
        unstructured content from tools like Box — structured or unstructured, batch or streaming, into one platform.
        Openflow runtimes can run inside Snowflake or in your own cloud account, so source data can be processed close to
        where it lives.
      </p>
      <Figure
        src={openflowConnectors}
        alt="Openflow connectors catalog in Snowflake, listing connectors such as Amazon Ads, Amazon Kinesis, Apache Kafka, Atlassian Jira Cloud, Box, Google Ads, Microsoft SQL Server, MySQL, PostgreSQL, Slack, and Workday, filterable by databases, SaaS, streaming, and unstructured"
        caption="The Openflow connector library — filter by databases, SaaS, streaming, or unstructured sources."
        maxWidth="max-w-3xl"
      />
      <Code title="Snowpipe · load files as they land (illustrative)">{`-- Raw JSON lands in a stage; Snowpipe loads each new file automatically
CREATE OR REPLACE PIPE SALES.RAW.ORDERS_PIPE
  AUTO_INGEST = TRUE
AS
  COPY INTO SALES.RAW.ORDERS (v)
  FROM @SALES.RAW.ORDERS_STAGE
  FILE_FORMAT = (TYPE = 'JSON');`}</Code>

      <h3 className="mt-8 text-lg font-semibold text-slate-900">Transform and orchestrate</h3>
      <p className="mt-3 text-slate-600">
        Transformation happens inside Snowflake, in whichever language suits the team: SQL with DML, stored procedures,
        dbt, or dynamic tables; Python, Scala, or Java through Snowpark; or pandas code running on Snowflake.
        Orchestration comes from streams and tasks — or is built into dynamic tables, which work out their own
        dependencies.
      </p>
      <Figure
        src={pipelinesDiagram}
        alt="Snowflake pipelines: transformation in SQL (DML statements, stored procedures, dbt on Snowflake, dynamic tables), in Python, Scala, and Java (Snowpark DataFrames and stored procedures), and in pandas (pandas on Snowflake); orchestration with streams and tasks and serverless tasks"
        caption="Transformation in SQL, Python, or pandas — orchestrated by streams, tasks, and serverless tasks."
        maxWidth="max-w-3xl"
      />
      <ComparisonTable {...TRANSFORM_CHOICES} embedded />
      <Code title="Dynamic tables · a raw → silver → gold pipeline (illustrative)">{`-- Silver: parse the raw JSON. Refreshes whenever something downstream needs it.
CREATE OR REPLACE DYNAMIC TABLE SALES.SILVER.ORDERS
  TARGET_LAG = DOWNSTREAM
  WAREHOUSE  = TRANSFORM_WH
AS
SELECT v:order_id::STRING          AS order_id,
       v:customer_id::STRING       AS customer_id,
       v:total::NUMBER(12, 2)      AS order_total,
       v:ordered_at::TIMESTAMP_NTZ AS ordered_at
FROM SALES.RAW.ORDERS;

-- Gold: daily revenue, never more than 15 minutes behind.
CREATE OR REPLACE DYNAMIC TABLE SALES.GOLD.DAILY_REVENUE
  TARGET_LAG = '15 minutes'
  WAREHOUSE  = TRANSFORM_WH
AS
SELECT DATE_TRUNC('day', ordered_at) AS order_day,
       SUM(order_total)              AS revenue
FROM SALES.SILVER.ORDERS
GROUP BY 1;`}</Code>
      <p className="mt-4 text-slate-600">
        <strong className="font-semibold text-slate-900">Rule of thumb:</strong> start with dynamic tables — they cover
        most pipelines with the least code and no scheduling. Use streams and tasks when you need step-by-step control or
        side effects such as calling an API, dbt when your team already works in it, and Snowpark when the logic is
        easier to express in Python.
      </p>

      <h3 className="mt-8 text-lg font-semibold text-slate-900">An interoperable lakehouse</h3>
      <p className="mt-3 text-slate-600">
        Pipelines don&apos;t have to end in Snowflake-only storage. With{" "}
        <strong className="font-semibold text-slate-900">Snowflake-managed Iceberg tables</strong>, data can live in
        Snowflake storage or in your own AWS, Azure, or Google Cloud bucket, while the{" "}
        <strong className="font-semibold text-slate-900">Horizon Catalog</strong> manages the Iceberg metadata and exposes
        it through Apache Polaris and Iceberg REST APIs. Engines like Apache Spark, Dremio, Trino, and Apache Flink can
        then read and write the same tables — under the same role-based access and masking rules — while BI tools,
        business applications, and Secure Sharing are served from Snowflake, and a failover region covers business
        continuity.
      </p>
      <Figure
        src={lakehouseDiagram}
        alt="Snowflake enterprise lakehouse: sources (files, databases, web APIs, enterprise applications) are ingested into any storage — Snowflake-managed Iceberg tables in Snowflake storage or cloud provider storage; the Horizon Catalog manages Iceberg metadata with interoperability via Apache Polaris and Iceberg REST APIs; all workloads (data engineering, analytics, AI, applications) serve BI, business applications, Snowflake Intelligence, and secure sharing; external engines Spark, Dremio, Trino, and Flink read and write; data replicates to a failover region"
        caption="One governed lakehouse: any source, any storage, any engine — with RBAC and masking at every boundary."
      />
    </div>
  );
}
