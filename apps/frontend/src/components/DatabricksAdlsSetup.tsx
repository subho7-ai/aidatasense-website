import type { ReactNode } from "react";
import accessConnectorShot from "../assets/azure-access-connector-managed-id.png";
import { DATABRICKS_LOGO, Icon, type IconName } from "./diagramIcons";
import { ZoomableImage } from "./ZoomableImage";

const MS_DOCS_URL = "https://learn.microsoft.com/en-us/azure/databricks/connect/unity-catalog/cloud-storage/azure-managed-identities";
const EXTERNAL_LOCATIONS_URL = "https://learn.microsoft.com/en-us/azure/databricks/connect/unity-catalog/cloud-storage/external-locations";

const PATH_PARTS: { text: string; label: string; tone: string }[] = [
  { text: "abfss://", label: "Secure ADLS Gen2 driver", tone: "bg-slate-100 text-slate-700 border-slate-300" },
  { text: "landing", label: "Container", tone: "bg-sky-50 text-sky-800 border-sky-300" },
  { text: "@", label: "", tone: "bg-white text-slate-400 border-transparent" },
  { text: "stsalesdata", label: "Storage account", tone: "bg-indigo-50 text-indigo-800 border-indigo-300" },
  { text: ".dfs.core.windows.net", label: "Data Lake endpoint", tone: "bg-slate-100 text-slate-700 border-slate-300" },
  { text: "/sales", label: "Folder path", tone: "bg-emerald-50 text-emerald-800 border-emerald-300" },
];

function Node({ icon, title, sub, tone }: { icon: IconName | "databricks"; title: string; sub: string; tone: string }) {
  return (
    <div className={`flex items-center gap-2 rounded-lg border bg-white px-3 py-2 shadow-sm ${tone}`}>
      {icon === "databricks" ? (
        <img src={DATABRICKS_LOGO} alt="" className="h-5 w-5 shrink-0" />
      ) : (
        <Icon name={icon} className="h-5 w-5 shrink-0" />
      )}
      <div>
        <p className="text-sm font-semibold text-slate-900">{title}</p>
        <p className="text-[11px] text-slate-500">{sub}</p>
      </div>
    </div>
  );
}

function Down({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center gap-1.5 py-1 text-[11px] font-medium text-slate-500">
      <span className="text-base leading-none text-slate-400" aria-hidden>
        ↓
      </span>
      {label}
    </div>
  );
}

function HowItFits() {
  return (
    <figure className="mt-6 rounded-xl border border-slate-200 bg-white p-4 sm:p-6">
      <div className="grid items-start gap-4 md:grid-cols-[1fr_auto_1fr]">
        <div className="rounded-xl border-2 border-dashed border-sky-300 bg-sky-50/50 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">Azure subscription</p>
          <div className="mt-2">
            <Node icon="key" title="Access Connector for Azure Databricks" sub="ac-databricks-sales · managed identity" tone="border-sky-200 text-sky-700" />
            <Down label="Storage Blob Data Contributor role" />
            <Node icon="database" title="ADLS Gen2 storage account" sub="stsalesdata · hierarchical namespace on" tone="border-sky-200 text-sky-700" />
            <Down label="contains" />
            <Node icon="folderGit" title="Containers" sub="landing · managed" tone="border-sky-200 text-sky-700" />
          </div>
        </div>
        <div className="flex flex-row items-center justify-center gap-2 text-center text-xs font-semibold text-slate-500 md:mt-20 md:flex-col">
          <span>connector ID</span>
          <span className="text-xl text-slate-400" aria-hidden>
            <span className="md:hidden">↓</span>
            <span className="hidden md:inline">→</span>
          </span>
          <span>no secrets or keys</span>
        </div>
        <div className="rounded-xl border-2 border-dashed border-orange-300 bg-orange-50/50 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-orange-700">Unity Catalog</p>
          <div className="mt-2">
            <Node icon="shieldCheck" title="Storage credential" sub="adls_sales_cred · wraps the connector" tone="border-orange-200 text-orange-700" />
            <Down label="used by" />
            <Node icon="globe" title="External location" sub="sales_landing · abfss://landing@stsalesdata…/sales" tone="border-orange-200 text-orange-700" />
            <Down label="governs everything under that path" />
            <div className="grid grid-cols-3 gap-1.5">
              {["External tables", "Volumes", "Managed storage"].map((label) => (
                <span key={label} className="rounded-md border border-orange-200 bg-white px-2 py-1.5 text-center text-[11px] font-semibold text-slate-700">
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <figcaption className="mt-4 text-center text-sm text-slate-500">
        Azure grants storage access to a managed identity; Unity Catalog wraps that identity in a storage credential and
        decides who may use which path through external locations.
      </figcaption>
    </figure>
  );
}

// A simplified, clearly labelled mock-up of a Catalog Explorer dialog — not a screenshot.
function MockDialog({
  breadcrumb,
  title,
  fields,
  buttons,
}: {
  breadcrumb: string;
  title: string;
  fields: { label: string; value: string; mono?: boolean; select?: boolean; hint?: string; highlight?: boolean }[];
  buttons: string[];
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-300 bg-white shadow-md">
      <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-3 py-2">
        <span className="flex gap-1" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
        </span>
        <img src={DATABRICKS_LOGO} alt="" className="ml-1 h-4 w-4" />
        <span className="truncate text-[11px] text-slate-500">{breadcrumb}</span>
      </div>
      <div className="p-4">
        <p className="text-base font-semibold text-slate-900">{title}</p>
        <div className="mt-3 space-y-3">
          {fields.map((field) => (
            <div key={field.label}>
              <p className="text-xs font-semibold text-slate-700">{field.label}</p>
              <div
                className={`mt-1 flex items-center justify-between rounded-md border px-2.5 py-1.5 text-sm ${
                  field.highlight ? "border-indigo-400 bg-indigo-50/60 ring-2 ring-indigo-100" : "border-slate-300 bg-white"
                } ${field.mono ? "font-mono text-xs" : ""}`}
              >
                <span className="truncate text-slate-800">{field.value}</span>
                {field.select && <span className="ml-2 text-slate-400">▾</span>}
              </div>
              {field.hint && <p className="mt-0.5 text-[11px] text-slate-500">{field.hint}</p>}
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap justify-end gap-2">
          {buttons.map((button, index) => (
            <span
              key={button}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold ${
                index === buttons.length - 1 ? "bg-[#2272b4] text-white" : "border border-slate-300 bg-white text-slate-700"
              }`}
            >
              {button}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function StepHeader({ n, where, title }: { n: number; where: string; title: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-xs font-semibold text-white">{n}</span>
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-wide text-indigo-600">{where}</p>
        <p className="font-semibold text-slate-900">{title}</p>
      </div>
    </div>
  );
}

function Step({ n, where, title, children }: { n: number; where: string; title: string; children: ReactNode }) {
  return (
    <li className="rounded-xl border border-slate-200 bg-white p-4">
      <StepHeader n={n} where={where} title={title} />
      <div className="mt-3 text-sm text-slate-600">{children}</div>
    </li>
  );
}

function Code({ title, children }: { title: string; children: string }) {
  return (
    <div className="overflow-hidden rounded-xl bg-slate-900">
      <div className="border-b border-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-wide text-slate-400">{title}</div>
      <pre className="overflow-x-auto p-4 text-xs leading-relaxed text-slate-100">{children}</pre>
    </div>
  );
}

export function DatabricksAdlsSetup() {
  return (
    <div id="adls" className="scroll-mt-[180px] border-t border-slate-200 py-8">
      <h2 className="text-2xl font-semibold text-slate-900">Connecting Unity Catalog to ADLS Gen2</h2>
      <p className="mt-3 text-slate-600">
        On Azure Databricks, table data lives in your own Azure Data Lake Storage Gen2 account. Unity Catalog reaches
        it through two objects: a <strong className="font-semibold text-slate-900">storage credential</strong> — an
        Azure managed identity, so there are no keys or secrets to rotate — and an{" "}
        <strong className="font-semibold text-slate-900">external location</strong>, which pairs that credential with
        an <span className="font-mono text-sm">abfss://</span> path and controls who can use it.
      </p>
      <HowItFits />

      <h3 className="mt-8 text-lg font-semibold text-slate-900">Reading an abfss path</h3>
      <figure className="mt-4 rounded-xl border border-slate-200 bg-white p-4 sm:p-6">
        <div className="flex flex-wrap items-start justify-center gap-1 font-mono text-sm sm:text-base">
          {PATH_PARTS.map((part) => (
            <div key={part.text} className="flex flex-col items-center">
              <span className={`rounded-md border px-2 py-1 font-semibold ${part.tone}`}>{part.text}</span>
              {part.label && (
                <span className="mt-1.5 max-w-[8rem] text-center font-sans text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                  {part.label}
                </span>
              )}
            </div>
          ))}
        </div>
        <figcaption className="mt-4 text-center text-sm text-slate-500">
          <span className="font-mono text-xs">abfss://&lt;container&gt;@&lt;storage-account&gt;.dfs.core.windows.net/&lt;path&gt;</span>
        </figcaption>
      </figure>

      <h3 className="mt-8 text-lg font-semibold text-slate-900">How it&apos;s created, step by step</h3>
      <ol className="mt-4 space-y-4">
        <Step n={1} where="Azure portal" title="Create the storage account">
          Create a storage account with <strong className="font-semibold text-slate-900">hierarchical namespace</strong>{" "}
          enabled — that&apos;s what makes it ADLS Gen2 — and add containers, for example{" "}
          <span className="font-mono text-xs">landing</span> for incoming files and{" "}
          <span className="font-mono text-xs">managed</span> for Unity Catalog managed tables.
        </Step>
        <Step n={2} where="Azure portal" title="Create an Access Connector for Azure Databricks">
          The Access Connector is the Azure resource that carries a managed identity for Databricks. Keep the
          system-assigned identity on, and copy the connector&apos;s resource ID once it&apos;s created.
          <figure className="mt-3 rounded-lg border border-slate-200 bg-white p-3">
            <ZoomableImage
              src={accessConnectorShot}
              alt="Azure portal, Create an Access Connector for Azure Databricks, Managed Identity tab, with the system assigned managed identity status set to On"
              className="mx-auto w-full max-w-md"
            />
            <figcaption className="mt-2 text-center text-xs text-slate-500">
              The Managed Identity tab, with the system-assigned identity turned on.{" "}
              <a href={MS_DOCS_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Source: Microsoft Learn — Use Azure managed identities in Unity Catalog
              </a>
            </figcaption>
          </figure>
        </Step>
        <Step n={3} where="Azure portal" title="Let the connector read and write the storage">
          On the storage account, open <strong className="font-semibold text-slate-900">Access control (IAM)</strong>{" "}
          and assign the <strong className="font-semibold text-slate-900">Storage Blob Data Contributor</strong> role to
          the Access Connector&apos;s managed identity. Scope it to a single container if the credential should reach
          only part of the account.
        </Step>
        <Step n={4} where="Databricks · Catalog Explorer" title="Create a storage credential">
          In <strong className="font-semibold text-slate-900">Catalog → External data → Credentials</strong>, create a
          credential of type <em>Azure Managed Identity</em> and paste the Access Connector&apos;s resource ID. You need
          the <span className="font-mono text-xs">CREATE STORAGE CREDENTIAL</span> privilege, which metastore admins
          have.
          <div className="mt-3">
            <MockDialog
              breadcrumb="Catalog › External data › Credentials › Create credential"
              title="Create a new credential"
              fields={[
                { label: "Credential type", value: "Azure Managed Identity", select: true },
                { label: "Credential name", value: "adls_sales_cred", mono: true },
                {
                  label: "Access connector ID",
                  value: "/subscriptions/<sub-id>/resourceGroups/rg-data/providers/Microsoft.Databricks/accessConnectors/ac-databricks-sales",
                  mono: true,
                  highlight: true,
                  hint: "The resource ID you copied in step 2",
                },
                { label: "User-assigned managed identity ID (optional)", value: "—", mono: true },
              ]}
              buttons={["Cancel", "Create"]}
            />
          </div>
        </Step>
        <Step n={5} where="Databricks · Catalog Explorer" title="Create an external location with the abfss path">
          In <strong className="font-semibold text-slate-900">Catalog → External data → External locations</strong>,
          create a location: give it a name, enter the <span className="font-mono text-xs">abfss://</span> URL, pick the
          credential from step 4, and use <strong className="font-semibold text-slate-900">Test connection</strong> to
          confirm read, write, and list permissions before saving.
          <div className="mt-3">
            <MockDialog
              breadcrumb="Catalog › External data › External locations › Create external location"
              title="Create a new external location"
              fields={[
                { label: "External location name", value: "sales_landing", mono: true },
                { label: "URL", value: "abfss://landing@stsalesdata.dfs.core.windows.net/sales", mono: true, highlight: true, hint: "Container, storage account, and folder path" },
                { label: "Storage credential", value: "adls_sales_cred", mono: true, select: true },
                { label: "Comment", value: "Landing zone for sales files" },
              ]}
              buttons={["Cancel", "Test connection", "Create"]}
            />
          </div>
        </Step>
        <Step n={6} where="Databricks · SQL" title="Grant it, and put it to work">
          Grant the location to the groups that need it. Then use the path for external tables and volumes, or as the
          managed storage location of a catalog, so that catalog&apos;s managed tables are written to your container.
        </Step>
      </ol>
      <p className="mt-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-500">
        The two Catalog Explorer panels above are simplified illustrations, not screenshots — field names follow the
        current UI, but its exact look may differ. Full instructions:{" "}
        <a href={EXTERNAL_LOCATIONS_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-indigo-600 hover:text-indigo-500">
          Microsoft Learn — Create an external location
        </a>
        .
      </p>

      <h3 className="mt-8 text-lg font-semibold text-slate-900">The same thing in code</h3>
      <p className="mt-3 text-slate-600">
        Storage credentials are created in Catalog Explorer, the Databricks CLI or REST API, or Terraform — not in SQL.
        Everything after that can be scripted in SQL, which is how CI/CD pipelines set it up in each environment.
      </p>
      <div className="mt-3 grid gap-4 lg:grid-cols-2">
        <Code title="Step 4 · storage credential (Databricks CLI)">{`databricks storage-credentials create --json '{
  "name": "adls_sales_cred",
  "azure_managed_identity": {
    "access_connector_id": "/subscriptions/<sub-id>/resourceGroups/rg-data/providers/Microsoft.Databricks/accessConnectors/ac-databricks-sales"
  },
  "comment": "Access connector for the sales data lake"
}'`}</Code>
        <Code title="Steps 5–6 · external location, grants, and use (SQL)">{`CREATE EXTERNAL LOCATION IF NOT EXISTS sales_landing
  URL 'abfss://landing@stsalesdata.dfs.core.windows.net/sales'
  WITH (STORAGE CREDENTIAL adls_sales_cred)
  COMMENT 'Landing zone for sales files';

GRANT READ FILES, CREATE EXTERNAL TABLE
  ON EXTERNAL LOCATION sales_landing TO \`data_engineers\`;

-- An external table over Parquet files in the landing path
CREATE TABLE prod.raw.orders_landing
  USING PARQUET
  LOCATION 'abfss://landing@stsalesdata.dfs.core.windows.net/sales/orders';

-- Or: managed tables in this catalog go to your own container
CREATE CATALOG sales
  MANAGED LOCATION 'abfss://managed@stsalesdata.dfs.core.windows.net/sales';`}</Code>
      </div>
      <p className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
        <strong className="font-semibold">Rule of thumb:</strong> one Access Connector and storage credential per
        storage account, external locations per container or top-level folder, and grants on the external location —
        never hand people the storage account itself. Reading files directly by path bypasses table-level permissions,
        so keep <span className="font-mono text-xs">READ FILES</span> for the engineers who load data.
      </p>
    </div>
  );
}
