import tenantsCapacities from "../assets/fabric-docs-tenants-capacities.png";
import { ComparisonTable } from "./ComparisonTable";
import { Icon, type IconName } from "./diagramIcons";
import { DocsFigure } from "./docsFigure";

const LICENSES_URL = "https://learn.microsoft.com/en-us/fabric/enterprise/licenses";

const LAYERS: { name: string; icon: IconName; color: string; soft: string; what: string; points: string[] }[] = [
  {
    name: "Tenant",
    icon: "users",
    color: "text-indigo-700",
    soft: "bg-indigo-50 border-indigo-200",
    what: "Your organization's single Fabric environment, tied to its Microsoft Entra ID tenant.",
    points: ["Tenant settings in the admin portal", "One OneLake per tenant", "Domains group workspaces by business area"],
  },
  {
    name: "Capacity",
    icon: "server",
    color: "text-teal-700",
    soft: "bg-teal-50 border-teal-200",
    what: "A pool of compute bought as an F SKU, in one Azure region.",
    points: ["Shared by every workload in its workspaces", "Sized F2 up to F2048", "Can be paused, resized, or reserved"],
  },
  {
    name: "Workspace",
    icon: "folderGit",
    color: "text-sky-700",
    soft: "bg-sky-50 border-sky-200",
    what: "Where teams build — and the unit of access, Git, and deployment.",
    points: ["Assigned to exactly one capacity", "Holds lakehouses, warehouses, models, reports", "Has its own roles and Git connection"],
  },
];

const ENGINES = {
  title: "Compute engines",
  headers: ["Engine", "Used by", "Language", "Good at"],
  rows: [
    ["Apache Spark", "Data Engineering, Data Science", "Python, SQL, Scala, R", "Large-scale transformation, ML, files of any shape"],
    ["SQL engine", "Warehouse, SQL analytics endpoint", "T-SQL", "Relational modeling, joins, BI-ready star schemas"],
    ["KQL engine", "Eventhouse (Real-Time Intelligence)", "KQL", "Streaming, logs, and time-series at high volume"],
    ["Analysis Services (VertiPaq)", "Power BI semantic models", "DAX", "Interactive reports, including Direct Lake on OneLake"],
    ["Data Factory", "Pipelines, Dataflow Gen2", "Low-code, Power Query", "Moving and preparing data from 200+ sources"],
    ["SQL database", "SQL database in Fabric", "T-SQL", "Operational (OLTP) apps, auto-mirrored into OneLake"],
  ],
};

const CAPACITY_FACTS: [string, string][] = [
  ["Capacity units (CUs)", "Every operation — a Spark job, a query, a report refresh — consumes CUs from the same capacity."],
  ["Smoothing", "Usage is averaged out: interactive operations over minutes, background jobs over 24 hours, so short spikes don't fail."],
  ["Bursting and throttling", "Jobs can briefly use more than the capacity's size; sustained overuse leads to delays, then rejections."],
  ["F64 and Power BI viewers", "From F64 up, people with a free license can view Power BI content in the capacity."],
];

export function FabricPlatformArchitecture() {
  return (
    <div className="border-t border-slate-200 py-8">
      <h2 className="text-2xl font-semibold text-slate-900">Platform Architecture</h2>
      <p className="mt-3 text-slate-600">
        Fabric is organized in three layers: a <strong className="font-semibold text-slate-900">tenant</strong> for the
        whole organization, <strong className="font-semibold text-slate-900">capacities</strong> that provide the
        compute, and <strong className="font-semibold text-slate-900">workspaces</strong> where teams build. Every
        workspace runs on one capacity, and every capacity lives in one Azure region.
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
      <DocsFigure
        src={tenantsCapacities}
        alt="Two example organizations: Retail company A with one tenant holding US, UK, and Germany capacities, each with marketing, sales, and finance workspaces; Retail company B with a military tenant and a commercial tenant, each holding several regional capacities and workspaces"
        caption="Tenants hold capacities, capacities hold workspaces — one company may split by region, or even run separate tenants."
        sourceLabel="Microsoft Learn — Microsoft Fabric concepts and licenses"
        sourceUrl={LICENSES_URL}
      />

      <h3 className="mt-8 text-lg font-semibold text-slate-900">Who runs what</h3>
      <p className="mt-3 text-slate-600">
        Everything runs in Microsoft&apos;s cloud: there are no clusters or virtual networks in your Azure subscription
        to manage. Data lives in OneLake, which is built on Azure Data Lake Storage Gen2 and stays in your
        capacity&apos;s region. Your own storage comes in only where you choose it — through shortcuts to ADLS Gen2,
        Amazon S3, or Google Cloud Storage. For private networking, Fabric supports Private Link at the tenant and
        workspace level, managed private endpoints for Spark, and trusted access to firewall-protected storage accounts.
      </p>

      <h3 className="mt-8 text-lg font-semibold text-slate-900">Compute engines</h3>
      <p className="mt-3 text-slate-600">
        Fabric has no warehouses or clusters to size per workload. Each experience runs on its own serverless engine,
        and every engine reads and writes the same Delta Parquet tables in OneLake — all billed against the capacity.
      </p>
      <ComparisonTable {...ENGINES} embedded />

      <h3 className="mt-8 text-lg font-semibold text-slate-900">How capacity works</h3>
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        {CAPACITY_FACTS.map(([title, body]) => (
          <div key={title} className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="font-semibold text-slate-900">{title}</p>
            <p className="mt-1 text-sm text-slate-600">{body}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-slate-600">
        <strong className="font-semibold text-slate-900">Rule of thumb:</strong> separate development and production
        capacities, so a runaway notebook in Dev can never throttle the reports in Prod. Watch usage in the Fabric
        Capacity Metrics app, and pause pay-as-you-go development capacities outside working hours.
      </p>
    </div>
  );
}
