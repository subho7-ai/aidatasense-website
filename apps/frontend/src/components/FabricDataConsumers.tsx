import fabricLogo from "../assets/microsoft-fabric-logo.png";
import oneLakeAccess from "../assets/fabric-docs-onelake-access.png";
import { type Channel, type ConsumersConfig, DataConsumersSection, type ToolItem } from "./consumersFlow";
import { DocsFigure } from "./docsFigure";

const ONELAKE_URL = "https://learn.microsoft.com/en-us/fabric/onelake/onelake-overview";

// The five ways data leaves Fabric, each with the tools behind it and who typically sits at the end.
const CHANNELS: Channel[] = [
  {
    title: "Use it inside Fabric",
    icon: "sparkles",
    color: "#4f46e5",
    soft: "#e0e7ff",
    tools: ["Power BI reports & dashboards (Direct Lake)", "Copilot · data agents · notebooks"],
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
    tools: ["SQL analytics endpoint (T-SQL / TDS)", "XMLA endpoint · KQL query URI"],
    consumers: [
      { label: "Excel · Tableau", icon: "chart", external: true },
      { label: "Internal applications", icon: "app" },
      { label: "dbt & SQL tools", icon: "code", external: true },
    ],
  },
  {
    title: "Share without copying",
    icon: "share",
    color: "#0f766e",
    soft: "#ccfbf1",
    tools: ["OneLake shortcuts · external data sharing", "OneLake APIs (ADLS Gen2-compatible)"],
    consumers: [
      { label: "Partners", icon: "globe", external: true },
      { label: "Other workspaces", icon: "server" },
      { label: "Databricks · Spark", icon: "database", external: true },
    ],
  },
  {
    title: "Serve to applications",
    icon: "server",
    color: "#7c3aed",
    soft: "#ede9fe",
    tools: ["SQL database in Fabric · API for GraphQL", "User data functions · data agent endpoints"],
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
    tools: ["Pipeline Copy activity · Dataflow Gen2 outputs", "Activator alerts · reverse ETL"],
    consumers: [
      { label: "Back-office systems", icon: "server" },
      { label: "Salesforce & SaaS", icon: "globe", external: true },
    ],
  },
];

const INTERNAL_TOOLS: ToolItem[] = [
  { name: "Power BI", what: "Reports, dashboards, and apps — Direct Lake reads OneLake without import", icon: "chart" },
  { name: "Copilot & data agents", what: "Ask questions in plain language over lakehouses, warehouses, and models", icon: "sparkles" },
  { name: "SQL analytics endpoint", what: "Every lakehouse gets a read-only T-SQL endpoint automatically", icon: "database" },
  { name: "OneLake catalog", what: "Find, request, and reuse items across the tenant", icon: "share" },
  { name: "Shortcuts & external data sharing", what: "Reference data across workspaces — or with another tenant — without copies", icon: "share" },
  { name: "SQL database & API for GraphQL", what: "Operational data and a ready-made API for applications", icon: "server" },
  { name: "Notebooks", what: "Python and Spark analysis, shareable within the workspace", icon: "code" },
  { name: "Pipelines & Activator", what: "Push data out on a schedule, or trigger actions when data changes", icon: "pipeline" },
];

const EXTERNAL_TOOLS: ToolItem[] = [
  { name: "Excel · Tableau · Qlik", what: "Connect to the SQL analytics endpoint or a semantic model", icon: "chart" },
  { name: "SSMS · Azure Data Studio · VS Code", what: "Query warehouses and SQL endpoints with T-SQL", icon: "code" },
  { name: "ODBC / JDBC · .NET, Python drivers", what: "Any application that speaks T-SQL over TDS", icon: "plug" },
  { name: "XMLA clients", what: "Tabular Editor, DAX Studio, and others manage and query semantic models", icon: "code" },
  { name: "dbt", what: "Model the warehouse with the dbt-fabric adapter", icon: "code" },
  { name: "Azure Databricks · Spark · Azure Storage tools", what: "Read and write OneLake through its ADLS Gen2-compatible API", icon: "database" },
  { name: "Microsoft Purview", what: "Discover Fabric data in the enterprise data catalog", icon: "shieldCheck" },
  { name: "Census · Hightouch", what: "Reverse ETL into Salesforce, marketing, and support tools", icon: "export" },
];

const DECISIONS: [string, string, string][] = [
  ["Another department in the same tenant", "Share the item, or give their group a workspace role; build reports on it", "No copy — they use the same OneLake data"],
  ["A team in another workspace or domain", "OneLake shortcut to the table or folder", "Live data, governed at the source, no pipelines"],
  ["A partner on another Fabric tenant", "External data sharing", "Shares data in place with another organization's tenant"],
  ["Analysts in Power BI, Excel, or Tableau", "Semantic model (Direct Lake) or the SQL analytics endpoint", "Built for many concurrent BI users"],
  ["A custom application or service", "SQL analytics endpoint over TDS, or API for GraphQL", "Standard T-SQL or a ready-made API"],
  ["An app that needs fast reads and writes", "SQL database in Fabric", "Operational database, mirrored into OneLake for analytics"],
  ["Azure Databricks or another Spark engine", "OneLake ADLS Gen2-compatible API (abfss:// path)", "Same Delta tables, no export"],
  ["A system that can only receive files", "Pipeline Copy activity on a schedule", "Push for consumers that can't pull"],
  ["Salesforce, marketing, or support tools", "Reverse ETL, or pipelines to their APIs", "Syncs curated data into the tools teams already use"],
];

const CONFIG: ConsumersConfig = {
  governance: "OneLake",
  logo: fabricLogo,
  sourceSubtitle: "Governed with Purview",
  sourceItems: [
    ["database", "Lakehouse & warehouse tables"],
    ["chart", "Semantic models"],
    ["sparkles", "Data agents & ML models"],
    ["folderGit", "Files"],
  ],
  rulesLines: ["Every path checks the same", "workspace roles, OneLake", "security, and Purview labels —", "and activity lands in audit."],
  channels: CHANNELS,
  intro: (
    <>
      Getting data <em>into</em> OneLake is half the job. The other half is getting it to the departments, applications,
      and partners who need it — without copying it into a dozen places or losing control of who sees what. Fabric
      offers five paths out, all reading the same <strong className="font-semibold text-slate-900">OneLake</strong>{" "}
      data under the same workspace roles, OneLake security, and Purview labels.
    </>
  ),
  internalSubtitle: "No extra software; governed by workspace roles and OneLake security",
  internalTools: INTERNAL_TOOLS,
  externalTools: EXTERNAL_TOOLS,
  decisions: DECISIONS,
  ruleOfThumb: (
    <>
      prefer paths that read data in place — item sharing, shortcuts, Direct Lake, or the SQL endpoint — over paths that
      copy it. Every copy is another place to secure, keep fresh, and reconcile. Push data out only when the consumer
      genuinely can&apos;t pull.
    </>
  ),
  afterFlow: (
    <DocsFigure
      src={oneLakeAccess}
      alt="OneLake holding Delta-Parquet data for workspaces A and B, written by Fabric workloads and read through the DFS API by Azure Databricks, Azure HDInsight, and other ADLS-compatible applications"
      caption="Because OneLake speaks the ADLS Gen2 (DFS) API, tools outside Fabric — like Azure Databricks — read the same Delta-Parquet data directly."
      sourceLabel="Microsoft Learn — OneLake, the OneDrive for data"
      sourceUrl={ONELAKE_URL}
    />
  ),
  ariaLabel:
    "Data consumers flow: governed data in OneLake reaches consumers through five paths — inside Fabric, connect and query, share without copying, serve to applications, and push data out — each leading to internal and external consumers",
};

export function FabricDataConsumers() {
  return <DataConsumersSection platform="Fabric" config={CONFIG} />;
}
