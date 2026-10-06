import saasArchitecture from "../assets/fabric-docs-saas-architecture.png";
import { Icon, type IconName } from "./diagramIcons";
import { DocsFigure } from "./docsFigure";

const OVERVIEW_URL = "https://learn.microsoft.com/en-us/fabric/fundamentals/microsoft-fabric-overview";

const SAAS_TRAITS: { label: string; body: string; icon: IconName }[] = [
  { label: "Nothing to deploy", body: "No clusters, servers, or storage accounts to set up — sign in and start building", icon: "server" },
  { label: "One capacity, every workload", body: "Compute is bought once as a capacity and shared by every tool", icon: "chart" },
  { label: "Data stored once", body: "Every workload reads and writes the same OneLake, in open Delta Parquet", icon: "database" },
  { label: "Governed from day one", body: "Entra ID identity and Microsoft Purview built in across the tenant", icon: "shieldCheck" },
];

export function FabricOverview() {
  return (
    <div className="border-t border-slate-200 py-8">
      <h2 className="text-2xl font-semibold text-slate-900">Why an End-to-End Platform</h2>
      <p className="mt-3 text-slate-600">
        Ingesting, preparing, governing, and analyzing data at scale usually means stitching together disconnected tools
        across separate teams. Increasingly, that same data also needs to be ready for AI — machine learning models,
        Copilots, and intelligent agents. Managing all of this across separate systems creates complexity, governance
        gaps, and duplicated effort.
      </p>
      <p className="mt-3 text-slate-600">
        Microsoft Fabric addresses this with one integrated <strong className="font-semibold text-slate-900">software-as-a-service</strong>{" "}
        platform across the whole data lifecycle. Every workload sits on <strong className="font-semibold text-slate-900">OneLake</strong>,
        a single data lake for the organization, so the same governed data that powers reports and dashboards is
        directly available to Copilot, data agents, and Fabric IQ.
      </p>
      <DocsFigure
        src={saasArchitecture}
        alt="Microsoft Fabric architecture: Data Factory, Analytics, Databases, Real-Time Intelligence, IQ, and Power BI workloads on top of the Fabric platform, which provides Copilot, OneLake, and governance"
        caption="Six workloads on one platform layer — Copilot, OneLake, and governance shared by all of them."
        sourceLabel="Microsoft Learn — What is Microsoft Fabric?"
        sourceUrl={OVERVIEW_URL}
      />
      <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {SAAS_TRAITS.map((trait) => (
          <div key={trait.label} className="flex gap-2.5 rounded-xl border border-slate-200 bg-white p-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
              <Icon name={trait.icon} className="h-4 w-4" />
            </span>
            <div>
              <p className="text-sm font-semibold text-slate-900">{trait.label}</p>
              <p className="text-xs text-slate-600">{trait.body}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-slate-600">
        Like Snowflake, Fabric is fully SaaS: Microsoft runs all the compute and storage, in the Azure region your
        capacity lives in. Unlike Snowflake, the whole Microsoft analytics stack — data integration, Spark, SQL,
        real-time analytics, and Power BI — comes in the same product, billed against the same capacity.
      </p>
    </div>
  );
}
