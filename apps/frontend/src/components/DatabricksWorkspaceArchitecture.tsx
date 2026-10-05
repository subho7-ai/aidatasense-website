import classicArchitecture from "../assets/databricks-docs-classic-architecture.png";
import objectHierarchy from "../assets/databricks-docs-object-hierarchy.png";
import serverlessArchitecture from "../assets/databricks-docs-serverless-architecture.png";
import { ComparisonTable } from "./ComparisonTable";
import { ZoomableImage } from "./ZoomableImage";

const SOURCE_URL = "https://docs.databricks.com/aws/en/getting-started/high-level-architecture";

function DocsFigure({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return (
    <figure className="mt-6 rounded-xl border border-slate-200 bg-white p-4 sm:p-6">
      <ZoomableImage src={src} alt={alt} className="mx-auto w-full max-w-3xl" />
      <figcaption className="mt-4 text-center text-sm text-slate-500">
        {caption}
        <br />
        <a
          href={SOURCE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-indigo-600 hover:text-indigo-500"
        >
          Source: Databricks documentation — High-level architecture
        </a>
      </figcaption>
    </figure>
  );
}

const CLASSIC_VS_SERVERLESS = {
  title: "Classic vs. serverless compute",
  headers: ["", "Classic compute plane", "Serverless compute plane"],
  rows: [
    ["Where compute runs", "In your cloud account, inside the workspace's virtual network", "In Databricks' account, in the same region as your workspace"],
    ["Who runs the infrastructure", "You choose instance types and sizes; clusters start in your network", "Databricks provisions and scales it; compute starts in seconds"],
    ["Network control", "Full — your VNet/VPC, firewalls, and routing rules", "Databricks-managed, with layered isolation between customer workspaces"],
    ["Isolation", "Natural isolation: it runs in your own cloud account", "Multiple security layers separate each customer's workloads"],
    ["Best for", "Strict network requirements or custom cluster setups", "SQL warehouses, jobs, and notebooks without managing infrastructure"],
  ],
};

const COMPUTE_TYPES = {
  title: "All-purpose vs. job compute vs. SQL warehouse",
  headers: ["", "All-purpose cluster", "Job cluster", "SQL warehouse"],
  rows: [
    ["Also called", "General-purpose / interactive compute", "Jobs compute", "SQL endpoint (older name)"],
    [
      "Built for",
      "Interactive work in notebooks — exploring, developing, debugging",
      "Running a scheduled or triggered job in production",
      "SQL queries, dashboards, and BI tools such as Power BI",
    ],
    ["Languages", "Python, SQL, Scala, R", "Python, SQL, Scala, R", "SQL only"],
    [
      "Lifecycle",
      "Created by a user; stays up until it auto-terminates after idle time, and can be restarted",
      "Created by the job when a run starts, terminated when it ends; can't be restarted",
      "Starts on the first query, scales with load, and stops after idle time",
    ],
    ["Shared by", "Several users at once", "One job run (its tasks can share it)", "Many users and BI connections"],
    [
      "Cost",
      "Highest DBU rate, and it bills while idle",
      "Lower DBU rate than all-purpose; no idle time",
      "Billed per warehouse size while running",
    ],
    [
      "Runs in",
      "Classic plane (or serverless compute for notebooks)",
      "Classic plane (or serverless compute for jobs)",
      "Classic plane for Classic and Pro; serverless plane for Serverless",
    ],
  ],
};

// Which compute options run in which plane — mirrors the classic vs. serverless split above.
const PLANE_MAP = [
  {
    plane: "Classic compute plane",
    where: "Your cloud account",
    tone: "border-indigo-200 bg-indigo-50/60",
    text: "text-indigo-700",
    items: ["All-purpose cluster", "Job cluster", "SQL warehouse — Classic", "SQL warehouse — Pro"],
  },
  {
    plane: "Serverless compute plane",
    where: "Databricks' account, same region",
    tone: "border-orange-200 bg-orange-50/60",
    text: "text-orange-700",
    items: ["Serverless compute for notebooks", "Serverless compute for jobs", "SQL warehouse — Serverless"],
  },
];

export function DatabricksWorkspaceArchitecture() {
  return (
    <div className="border-t border-slate-200 py-8">
      <h2 className="text-2xl font-semibold text-slate-900">Workspace Architecture</h2>
      <p className="mt-3 text-slate-600">
        Every Databricks deployment is split into two halves: a <strong className="font-semibold text-slate-900">control
        plane</strong> that Databricks runs for you, and a <strong className="font-semibold text-slate-900">compute
        plane</strong> where your data is actually processed. Where that compute plane lives — in your cloud account or
        in Databricks&apos; — is the most important architectural choice you make for a workspace.
      </p>

      <h3 className="mt-8 text-lg font-semibold text-slate-900">Account, workspaces, and metastores</h3>
      <p className="mt-3 text-slate-600">
        The <strong className="font-semibold text-slate-900">account</strong> is the top-level container: it manages
        identities, workspaces, metastores, and usage. A <strong className="font-semibold text-slate-900">workspace</strong>{" "}
        is where people run ingestion, exploration, scheduled jobs, and ML training. Each workspace attaches to one{" "}
        <strong className="font-semibold text-slate-900">Unity Catalog metastore</strong> in its region — so workspaces 1
        and 2 below share metastore A, while workspace 3, in another region, uses metastore B.
      </p>
      <DocsFigure
        src={objectHierarchy}
        alt="Databricks object hierarchy: one account containing metastores A and B and workspaces 1, 2, and 3; workspaces 1 and 2 attach to metastore A, workspace 3 to metastore B"
        caption="One account; one metastore per region, shared by every workspace in that region."
      />

      <h3 className="mt-8 text-lg font-semibold text-slate-900">Control plane and classic compute plane</h3>
      <p className="mt-3 text-slate-600">
        The <strong className="font-semibold text-slate-900">control plane</strong> lives in your Databricks account and
        hosts the backend services: the web application, compute orchestration, Unity Catalog, and your queries and
        code. In a <strong className="font-semibold text-slate-900">classic</strong> workspace, the compute plane runs
        in <em>your</em> cloud account, inside the workspace&apos;s own virtual network — so clusters process data next
        to your storage, databases, and other resources.
      </p>
      <DocsFigure
        src={classicArchitecture}
        alt="Classic Databricks architecture: users and applications connect to the control plane in the Databricks account (web application, compute orchestration, Unity Catalog, queries and code); the control plane manages the classic compute plane and workspace storage bucket in your cloud account, and serverless compute in the Databricks account; both compute planes reach your resources"
        caption="Classic architecture: the control plane in Databricks' account; classic compute and workspace storage in yours."
      />
      <ul className="mt-4 space-y-2 text-slate-600">
        <li className="flex gap-2">
          <span className="text-indigo-500">•</span>
          <span>
            <strong className="font-semibold text-slate-900">Workspace storage</strong> — every classic workspace needs a
            storage location in your cloud account (an S3 bucket on AWS, a storage account on Azure). It holds workspace
            system data, the default Unity Catalog workspace catalog, and legacy DBFS. Databricks&apos; guidance is
            explicit: don&apos;t delete or modify it.
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-indigo-500">•</span>
          <span>
            <strong className="font-semibold text-slate-900">Your resources</strong> — your data lakes, databases, and
            other services stay in your account; both compute planes connect to them to read and write data.
          </span>
        </li>
      </ul>

      <h3 className="mt-8 text-lg font-semibold text-slate-900">Serverless workspaces</h3>
      <p className="mt-3 text-slate-600">
        In a <strong className="font-semibold text-slate-900">serverless</strong> workspace, compute runs in a layer
        inside Databricks&apos; account, in the same region as the workspace, with several layers of isolation between
        customers. Instead of a storage bucket in your account, it uses{" "}
        <strong className="font-semibold text-slate-900">default storage</strong> — a fully managed location for
        workspace system data and Unity Catalog assets — and can still connect to storage buckets you own.
      </p>
      <DocsFigure
        src={serverlessArchitecture}
        alt="Serverless Databricks workspace architecture: users and applications connect to the control plane; the serverless compute plane and fully managed default storage sit inside the Databricks account; serverless compute can reach storage buckets in your cloud account"
        caption="Serverless architecture: compute and default storage are fully managed inside Databricks' account."
      />
      <ComparisonTable {...CLASSIC_VS_SERVERLESS} embedded />

      <h3 className="mt-8 text-lg font-semibold text-slate-900">Compute types</h3>
      <p className="mt-3 text-slate-600">
        Inside either plane, Databricks offers different kinds of compute for different jobs. The three you&apos;ll
        meet first are the <strong className="font-semibold text-slate-900">all-purpose cluster</strong> for
        interactive development, the <strong className="font-semibold text-slate-900">job cluster</strong> for
        production pipelines, and the <strong className="font-semibold text-slate-900">SQL warehouse</strong> for SQL
        and BI.
      </p>
      <figure className="mt-6 rounded-xl border border-slate-200 bg-white p-4 sm:p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          {PLANE_MAP.map((plane) => (
            <div key={plane.plane} className={`rounded-xl border p-4 ${plane.tone}`}>
              <p className={`text-sm font-semibold ${plane.text}`}>{plane.plane}</p>
              <p className="text-xs text-slate-500">{plane.where}</p>
              <ul className="mt-3 space-y-1.5">
                {plane.items.map((item) => (
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
          Every compute type runs in one of the two planes. SQL warehouses come in three types, and only Serverless
          runs in Databricks&apos; account.
        </figcaption>
      </figure>
      <ComparisonTable {...COMPUTE_TYPES} embedded />
      <p className="mt-4 text-slate-600">
        <strong className="font-semibold text-slate-900">Rule of thumb:</strong> develop on an all-purpose cluster,
        schedule production on job compute, and point dashboards and BI tools at a SQL warehouse. Running scheduled
        jobs on an all-purpose cluster works, but it costs more and lets one team&apos;s experiments slow down
        production.
      </p>

      <h3 className="mt-8 text-lg font-semibold text-slate-900">What lives in workspace storage</h3>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="font-semibold text-slate-900">File system data</p>
          <p className="mt-1 text-sm text-slate-600">
            What people create: notebooks, SQL queries, dashboards, Git folders, and libraries.
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="font-semibold text-slate-900">System data</p>
          <p className="mt-1 text-sm text-slate-600">
            What Databricks generates as it runs: query results, job outputs, notebook revisions, and cluster logs.
          </p>
        </div>
      </div>
      <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
        <strong className="font-semibold">DBFS is legacy.</strong> Storing and reading data through the DBFS root or
        DBFS mounts is deprecated. Use Unity Catalog volumes and external locations instead.
      </p>

      <p className="mt-6 text-xs text-slate-500">
        Diagrams © Databricks, reproduced from the{" "}
        <a href={SOURCE_URL} target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-700">
          Databricks documentation
        </a>
        . They show AWS; on Azure, the same architecture uses storage accounts and VNets in place of S3 buckets and
        VPCs.
      </p>
    </div>
  );
}
