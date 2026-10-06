import { type Channel, type ConsumersConfig, DataConsumersSection, type ToolItem } from "./consumersFlow";
import { SNOWFLAKE_LOGO } from "./diagramIcons";

// The five ways data leaves Snowflake, each with the tools behind it and who typically sits at the end.
const CHANNELS: Channel[] = [
  {
    title: "Use it inside Snowflake",
    icon: "sparkles",
    color: "#4f46e5",
    soft: "#e0e7ff",
    tools: ["Snowsight dashboards · Streamlit in Snowflake", "Cortex Analyst · notebooks · worksheets"],
    consumers: [
      { label: "Business users", icon: "users" },
      { label: "Executives", icon: "chart" },
      { label: "Other departments", icon: "users" },
    ],
  },
  {
    title: "Connect and query",
    icon: "plug",
    color: "#0078D4",
    soft: "#e0effb",
    tools: ["Virtual warehouse over JDBC / ODBC", "SQL API · Python connector · Snowpark"],
    consumers: [
      { label: "Power BI · Tableau", icon: "chart", external: true },
      { label: "Internal applications", icon: "app" },
      { label: "dbt & SQL tools", icon: "code", external: true },
    ],
  },
  {
    title: "Share without copying",
    icon: "share",
    color: "#0f766e",
    soft: "#ccfbf1",
    tools: ["Secure Data Sharing · listings · Marketplace", "Reader accounts · Data Clean Rooms"],
    consumers: [
      { label: "Partners", icon: "globe", external: true },
      { label: "Other regions/accounts", icon: "server" },
      { label: "Spark · Trino", icon: "database", external: true },
    ],
  },
  {
    title: "Serve to applications",
    icon: "server",
    color: "#7c3aed",
    soft: "#ede9fe",
    tools: ["Hybrid tables (Unistore)", "Snowpark Container Services · Native Apps"],
    consumers: [
      { label: "Low-latency apps", icon: "app" },
      { label: "AI agents & ML apps", icon: "sparkles" },
    ],
  },
  {
    title: "Push data out",
    icon: "export",
    color: "#b45309",
    soft: "#fef3c7",
    tools: ["COPY INTO @stage → S3, ADLS, GCS files", "Scheduled tasks · reverse ETL"],
    consumers: [
      { label: "Back-office systems", icon: "server" },
      { label: "Salesforce & SaaS", icon: "globe", external: true },
    ],
  },
];

const INTERNAL_TOOLS: ToolItem[] = [
  { name: "Snowsight & virtual warehouses", what: "Worksheets, dashboards, and the compute every SQL and BI path runs on", icon: "database" },
  { name: "Streamlit in Snowflake", what: "Build and share Python data apps that run next to the data", icon: "app" },
  { name: "Cortex Analyst", what: "Ask questions of curated tables in plain language", icon: "sparkles" },
  { name: "Snowflake Notebooks", what: "Python and SQL notebooks for analysis, shareable within the account", icon: "chart" },
  { name: "Secure Data Sharing · listings · Clean Rooms", what: "Share live data, publish data products, or collaborate privately", icon: "share" },
  { name: "Hybrid tables", what: "Row-based tables for fast single-row reads and writes (Unistore)", icon: "server" },
  { name: "Snowpark Container Services", what: "Run containerized apps, APIs, and models inside Snowflake", icon: "rocket" },
  { name: "Tasks & COPY INTO <location>", what: "Schedule exports of query results to files in cloud storage", icon: "pipeline" },
];

const EXTERNAL_TOOLS: ToolItem[] = [
  { name: "Power BI · Tableau · Looker · Sigma", what: "Connect to a virtual warehouse with the native connectors", icon: "chart" },
  { name: "Excel", what: "Live queries through the ODBC driver and Power Query", icon: "chart" },
  { name: "JDBC / ODBC · Python, Node.js, Go, .NET drivers", what: "Any application or service that speaks SQL", icon: "plug" },
  { name: "Snowflake SQL API", what: "Submit SQL over HTTPS — no driver needed", icon: "code" },
  { name: "dbt", what: "Model and test data in Snowflake with SQL", icon: "code" },
  { name: "Spark · Trino · Flink", what: "Read Snowflake-managed Iceberg tables through an Iceberg REST catalog", icon: "database" },
  { name: "Reader accounts", what: "Give a partner without Snowflake read-only access, paid by you", icon: "share" },
  { name: "Census · Hightouch", what: "Reverse ETL into Salesforce, marketing, and support tools", icon: "export" },
];

const DECISIONS: [string, string, string][] = [
  ["Another department in the same account", "Grant a role on the database or schema; share a dashboard or Streamlit app", "No copy — they query the same governed tables"],
  ["A department in another account, region, or cloud", "Secure Data Sharing (direct share in-region, listings across regions)", "Live, read-only data with no pipelines to maintain"],
  ["A partner without Snowflake", "Reader account, or Iceberg tables they can read with their own engine", "Access without them buying Snowflake"],
  ["Analysts in Power BI, Tableau, or Excel", "Virtual warehouse + native connector", "A dedicated BI warehouse keeps queries from competing with ELT"],
  ["A custom application or service", "SQL API or a driver on a virtual warehouse", "Standard SQL over a governed connection"],
  ["An app that needs millisecond lookups", "Hybrid tables", "Row-based storage built for fast point reads and writes"],
  ["An app that needs predictions or an API", "Cortex functions or Snowpark Container Services", "Models and services run where the data lives"],
  ["Another engine — Spark, Trino, Flink", "Snowflake-managed Iceberg tables via an Iceberg REST catalog", "Open format, still governed by Snowflake"],
  ["A system that can only receive files", "COPY INTO an external stage on a scheduled task", "Push on a schedule for consumers that can't pull"],
  ["Salesforce, marketing, or support tools", "Reverse ETL", "Syncs curated data into the tools teams already use"],
];

const CONFIG: ConsumersConfig = {
  governance: "Snowflake Horizon",
  logo: SNOWFLAKE_LOGO,
  sourceSubtitle: "Governed curated data",
  sourceItems: [
    ["database", "Tables & dynamic tables"],
    ["chart", "Secure & materialized views"],
    ["sparkles", "Cortex & ML models"],
    ["folderGit", "Stages (files)"],
  ],
  rulesLines: ["Every path checks the same", "roles, masking policies, and", "row access policies — and", "every query lands in history."],
  channels: CHANNELS,
  intro: (
    <>
      Getting data <em>into</em> Snowflake is half the job. The other half is getting it to the departments,
      applications, and partners who need it — without copying it into a dozen places or losing control of who sees
      what. Snowflake offers five paths out, and all of them are governed by{" "}
      <strong className="font-semibold text-slate-900">Snowflake Horizon</strong> — role-based access, masking, and
      row access policies apply no matter how the data is read.
    </>
  ),
  internalSubtitle: "No extra software; governed by roles and policies out of the box",
  internalTools: INTERNAL_TOOLS,
  externalTools: EXTERNAL_TOOLS,
  decisions: DECISIONS,
  ruleOfThumb: (
    <>
      prefer paths that read data in place — role grants, Secure Data Sharing, or a virtual warehouse — over paths that
      copy it. Every copy is another place to secure, keep fresh, and reconcile. Push data out only when the consumer
      genuinely can&apos;t pull.
    </>
  ),
  ariaLabel:
    "Data consumers flow: governed data in Snowflake reaches consumers through five paths — inside Snowflake, connect and query, share without copying, serve to applications, and push data out — each leading to internal and external consumers",
};

export function SnowflakeDataConsumers() {
  return <DataConsumersSection platform="Snowflake" config={CONFIG} />;
}
