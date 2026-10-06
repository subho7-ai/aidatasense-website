import { type Channel, type ConsumersConfig, DataConsumersSection, type ToolItem } from "./consumersFlow";
import { DATABRICKS_LOGO } from "./diagramIcons";

// The five ways data leaves Databricks, each with the tools behind it and who typically sits at the end.
const CHANNELS: Channel[] = [
  {
    title: "Use it inside Databricks",
    icon: "sparkles",
    color: "#4f46e5",
    soft: "#e0e7ff",
    tools: ["Databricks SQL · AI/BI dashboards · Genie", "Databricks Apps · notebooks"],
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
    tools: ["SQL warehouse over JDBC / ODBC", "SQL Statement API · Python & Node drivers"],
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
    tools: ["Delta Sharing · Clean Rooms", "Marketplace · open catalog APIs (Iceberg)"],
    consumers: [
      { label: "Partners", icon: "globe", external: true },
      { label: "Other regions/accounts", icon: "server" },
      { label: "Snowflake · Trino", icon: "database", external: true },
    ],
  },
  {
    title: "Serve to applications",
    icon: "server",
    color: "#7c3aed",
    soft: "#ede9fe",
    tools: ["Lakebase synced tables (Postgres)", "Model Serving · feature serving"],
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
    tools: ["Scheduled jobs → files, SFTP, Kafka", "Reverse ETL (Census, Hightouch)"],
    consumers: [
      { label: "Back-office systems", icon: "server" },
      { label: "Salesforce & SaaS", icon: "globe", external: true },
    ],
  },
];

const INTERNAL_TOOLS: ToolItem[] = [
  { name: "Databricks SQL & SQL warehouses", what: "Query editor and the compute every SQL and BI path runs on", icon: "database" },
  { name: "AI/BI dashboards", what: "Interactive dashboards, shareable with business users across the account", icon: "chart" },
  { name: "Genie", what: "Ask questions of curated tables in plain language", icon: "sparkles" },
  { name: "Databricks Apps", what: "Host internal data apps (Streamlit, Dash, Flask) next to the data", icon: "app" },
  { name: "Delta Sharing · Clean Rooms · Marketplace", what: "Share live data, collaborate privately, or publish data products", icon: "share" },
  { name: "Lakebase", what: "Managed Postgres with tables synced from Unity Catalog, for millisecond lookups", icon: "server" },
  { name: "Model Serving", what: "Serve ML models, features, and AI agents behind a REST endpoint", icon: "rocket" },
  { name: "Lakeflow Jobs", what: "Schedule exports and pushes to systems that can't pull", icon: "pipeline" },
];

const EXTERNAL_TOOLS: ToolItem[] = [
  { name: "Power BI · Tableau · Looker · Qlik", what: "Connect to a SQL warehouse with the native connectors", icon: "chart" },
  { name: "Excel", what: "Live queries through the ODBC driver and Power Query", icon: "chart" },
  { name: "JDBC / ODBC · Python, Node.js, Go drivers", what: "Any application or service that speaks SQL", icon: "plug" },
  { name: "SQL Statement Execution API", what: "Run SQL over plain HTTPS — no driver needed", icon: "code" },
  { name: "dbt", what: "Model and test data in the lakehouse with SQL", icon: "code" },
  { name: "Snowflake · Trino · DuckDB · Spark", what: "Read Unity Catalog tables through open catalog APIs (Iceberg REST)", icon: "database" },
  { name: "pandas · Spark · Power BI via Delta Sharing", what: "Read shared data without a Databricks account", icon: "share" },
  { name: "Census · Hightouch", what: "Reverse ETL into Salesforce, marketing, and support tools", icon: "export" },
];

const DECISIONS: [string, string, string][] = [
  ["Another department on the same Databricks account", "Grant access in Unity Catalog; share a dashboard or Genie space", "No copy — they query the same governed tables"],
  ["A department on another account, region, or cloud", "Delta Sharing (Databricks-to-Databricks)", "Live data across metastores, no pipelines to maintain"],
  ["A partner without Databricks", "Delta Sharing (open sharing)", "They read with pandas, Spark, or Power BI"],
  ["Analysts in Power BI, Tableau, or Excel", "SQL warehouse + native connector", "Built for many concurrent BI users"],
  ["A custom application or service", "SQL Statement API or JDBC/ODBC on a SQL warehouse", "Standard SQL over a governed connection"],
  ["An app that needs millisecond lookups", "Lakebase synced tables", "Postgres-speed row reads, kept in sync"],
  ["An app that needs predictions", "Model Serving endpoint", "Real-time scoring over REST"],
  ["Another engine — Snowflake, Trino, DuckDB", "Open catalog APIs (Iceberg REST)", "Read the tables in place, still governed"],
  ["A system that can only receive files", "Scheduled job → files, SFTP, or Kafka", "Push on a schedule for consumers that can't pull"],
  ["Salesforce, marketing, or support tools", "Reverse ETL", "Syncs curated data into the tools teams already use"],
];

const CONFIG: ConsumersConfig = {
  governance: "Unity Catalog",
  logo: DATABRICKS_LOGO,
  sourceSubtitle: "Governed gold data",
  sourceItems: [
    ["database", "Gold tables"],
    ["chart", "Views & metric views"],
    ["sparkles", "ML models"],
    ["folderGit", "Volumes (files)"],
  ],
  rulesLines: ["Every path checks the same", "grants, row filters, and", "column masks — and every", "read lands in lineage & audit."],
  channels: CHANNELS,
  intro: (
    <>
      Getting data <em>into</em> the lakehouse is half the job. The other half is getting it to the departments,
      applications, and partners who need it — without copying it into a dozen places or losing control of who sees
      what. Databricks offers five paths out, and all of them go through{" "}
      <strong className="font-semibold text-slate-900">Unity Catalog</strong>, so the same permissions apply no matter
      how the data is read.
    </>
  ),
  internalSubtitle: "No extra software; governed by Unity Catalog out of the box",
  internalTools: INTERNAL_TOOLS,
  externalTools: EXTERNAL_TOOLS,
  decisions: DECISIONS,
  ruleOfThumb: (
    <>
      prefer paths that read data in place — Unity Catalog grants, Delta Sharing, or a SQL warehouse — over paths that
      copy it. Every copy is another place to secure, keep fresh, and reconcile. Push data out only when the consumer
      genuinely can&apos;t pull.
    </>
  ),
  ariaLabel:
    "Data consumers flow: governed gold data in Unity Catalog reaches consumers through five paths — inside Databricks, connect and query, share without copying, serve to applications, and push data out — each leading to internal and external consumers",
};

export function DatabricksDataConsumers() {
  return <DataConsumersSection platform="Databricks" config={CONFIG} />;
}
