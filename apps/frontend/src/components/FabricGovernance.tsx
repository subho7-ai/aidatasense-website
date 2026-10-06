import fabricLogo from "../assets/microsoft-fabric-logo.png";
import oneLakeSecurity from "../assets/fabric-docs-onelake-security-structure.png";
import { DocsFigure } from "./docsFigure";
import { type GovernanceConfig, GovernanceSection } from "./governanceSection";

const ONELAKE_SECURITY_URL = "https://learn.microsoft.com/en-us/fabric/onelake/security/get-started-security";

const CONFIG: GovernanceConfig = {
  service: "Microsoft Fabric with Microsoft Purview",
  serviceLogo: fabricLogo,
  serviceWhere:
    "Governance is built into the Fabric tenant — admin portal, domains, workspace roles, OneLake security, and the OneLake catalog — with Microsoft Purview adding sensitivity labels, data loss prevention, audit, and the enterprise catalog.",
  intro: (
    <>
      Governance answers three questions: <em>who can see this data</em>, <em>how is it protected</em>, and{" "}
      <em>how do we prove it</em>. In Fabric the answer comes from two places working together:{" "}
      <strong className="font-semibold text-slate-900">Fabric&apos;s own permissions</strong> — tenant, workspace, item,
      and OneLake security — and <strong className="font-semibold text-slate-900">Microsoft Purview</strong>, which
      labels, protects, and audits data across Fabric and the rest of Microsoft 365.
    </>
  ),
  levels: [
    { level: "Tenant", scope: "the whole organization", control: "Tenant settings · Entra ID · Fabric administrators", icon: "users" },
    { level: "Domain", scope: "a business area", control: "Domain admins · delegated settings", icon: "globe" },
    { level: "Capacity", scope: "a pool of compute", control: "Capacity admins · who may assign workspaces", icon: "server" },
    { level: "Workspace", scope: "e.g. Sales-Prod", control: "Admin · Member · Contributor · Viewer", icon: "folderGit" },
    { level: "Item", scope: "a lakehouse, warehouse, model, or report", control: "Sharing: Read · ReadData · ReadAll · Build", icon: "chart" },
    { level: "Table & folder", scope: "inside an item", control: "OneLake security roles · SQL GRANT", icon: "database" },
    { level: "Row & column", scope: "inside a table", control: "RLS · CLS · dynamic data masking · Power BI RLS/OLS", icon: "shieldCheck" },
  ],
  rbacIntro: (
    <>
      Most access is granted through <strong className="font-semibold text-slate-900">workspace roles</strong> —
      Admin, Member, Contributor, and Viewer — given to Microsoft Entra ID users and groups. Below that, individual
      items can be shared, and <strong className="font-semibold text-slate-900">OneLake security</strong> lets you
      define roles on specific tables and folders that every engine respects, while the warehouse and SQL analytics
      endpoint add familiar T-SQL permissions.
    </>
  ),
  rbacFigure: (
    <DocsFigure
      src={oneLakeSecurity}
      alt="OneLake folder structure: a Fabric workspace containing a lakehouse, a warehouse, and a semantic model, each made of folders and files"
      caption="OneLake security follows the folder structure: workspace, then item, then folders and files."
      sourceLabel="Microsoft Learn — Get started with OneLake security"
      sourceUrl={ONELAKE_SECURITY_URL}
      maxWidth="max-w-md"
    />
  ),
  rbacPoints: [
    ["Workspace roles", "Admin and Member manage the workspace; Contributor builds; Viewer reads. Viewers can't see a lakehouse's underlying files."],
    ["Item sharing", "Share a single item without opening the workspace — with Read, ReadData (SQL), ReadAll (OneLake), or Build (for semantic models)."],
    ["OneLake security", "Data access roles on tables and folders, with row- and column-level rules, enforced for Spark, SQL, and Power BI alike."],
    ["Entra groups, not people", "Assign roles to security groups so access follows joiners, movers, and leavers."],
    ["Domains for delegation", "Domain admins can apply settings and labels to their own area without being tenant admins."],
  ],
  rbacCode: {
    title: "Warehouse · object-level permissions for Entra groups (illustrative)",
    code: `-- Analysts can read the gold schema in the warehouse
GRANT SELECT ON SCHEMA::gold TO [sg-sales-analysts];

-- …but not the table that holds raw customer details
DENY SELECT ON OBJECT::gold.customers_pii TO [sg-sales-analysts];`,
  },
  encryptionIntro: (
    <>
      All Fabric data is encrypted at rest and in transit by default. OneLake is built on Azure Storage, so encryption
      at rest is always on; you can add your own keys and keep traffic off the public internet.
    </>
  ),
  encryption: [
    {
      title: "In transit",
      icon: "share",
      points: [
        "TLS 1.2 or later for every connection: browsers, Power BI, SQL clients, APIs",
        "Private Link for the tenant or for individual workspaces",
        "Managed private endpoints and trusted access for Spark to reach protected sources",
      ],
    },
    {
      title: "At rest",
      icon: "database",
      points: [
        "OneLake data encrypted with Microsoft-managed keys, always on",
        "Applies to every item: lakehouse, warehouse, eventhouse, models",
        "Data stays in the region of the workspace's capacity",
      ],
    },
    {
      title: "Your own keys",
      icon: "key",
      points: [
        "Customer-managed keys in Azure Key Vault for workspace data",
        "Purview sensitivity labels can add protection that travels with exported files",
        "Revoke access to your key and the protected data can't be read",
      ],
    },
  ],
  decryption: (
    <>
      Decryption is transparent. When someone opens a report or runs a query, Fabric checks their workspace role, item
      permissions, and OneLake security first; only then is the data read and decrypted. Nobody handles keys. For the
      most sensitive columns, add application-level encryption in a notebook — with a key kept in Azure Key Vault — so
      even people who can read the table only see ciphertext.
    </>
  ),
  encryptionCode: {
    title: "Fabric notebook · encrypt a column with a key from Azure Key Vault (illustrative)",
    code: `from pyspark.sql import functions as F

key = notebookutils.credentials.getSecret("https://kv-sales.vault.azure.net/", "card-key")

(spark.read.table("raw_payments")
    .withColumn("card_number", F.base64(F.aes_encrypt(F.col("card_number"), F.lit(key))))
    .write.mode("overwrite")
    .saveAsTable("secure_payments"))`,
  },
  sensitiveRows: [
    [
      "PII · personal data",
      "Names, emails, phone numbers, addresses, national IDs",
      "Know where it is, hide it from people who don't need it, and be able to delete one person's data on request (GDPR, CCPA).",
      "Purview scans and classifies sensitive data, and sensitivity labels on items flow down to reports and exports. Dynamic data masking and column-level security hide fields in the warehouse; OneLake security limits rows and columns for every engine; Delta DELETE plus VACUUM removes an individual's records.",
    ],
    [
      "PHI · health data",
      "Diagnoses, medical record numbers, claims, lab results",
      "HIPAA: a Business Associate Agreement, encryption, audited access, and only the minimum necessary data per role.",
      "Confirm Fabric's HIPAA scope and Microsoft's BAA for your workloads. Keep PHI in its own workspace and capacity, label it Highly Confidential, use customer-managed keys and Private Link, and mask fields each role doesn't need.",
    ],
    [
      "PCI · payment card data",
      "Card numbers (PAN), expiry dates, card security codes",
      "PCI DSS: never store the security code (CVV) after authorization, and protect stored card numbers by tokenizing, encrypting, or truncating them.",
      "Tokenize or encrypt card numbers before they land, mask all but the last four digits with dynamic data masking, drop CVVs at ingestion, and treat a dedicated workspace and capacity as the cardholder data environment.",
    ],
  ],
  sensitiveCode: [
    {
      title: "Dynamic data masking · last four card digits (illustrative)",
      code: `ALTER TABLE dbo.payments
  ALTER COLUMN card_number
  ADD MASKED WITH (FUNCTION = 'partial(0, "XXXX-XXXX-XXXX-", 4)');

-- Only this group sees full card numbers
GRANT UNMASK TO [sg-pci-full-access];`,
    },
    {
      title: "Row-level security · each user sees their own region (illustrative)",
      code: `CREATE SCHEMA security;
GO
CREATE FUNCTION security.fn_region_filter(@region AS varchar(10))
  RETURNS TABLE WITH SCHEMABINDING
AS RETURN
  SELECT 1 AS allowed
  FROM security.user_regions AS ur
  WHERE ur.user_email = USER_NAME() AND ur.region = @region;
GO
CREATE SECURITY POLICY security.region_policy
  ADD FILTER PREDICATE security.fn_region_filter(region) ON dbo.orders
  WITH (STATE = ON);`,
    },
  ],
  compliance: (
    <>
      Fabric inherits Microsoft&apos;s compliance programs. Check the Microsoft Service Trust Portal for the current HIPAA,
      PCI DSS, and other offerings covering the Fabric workloads you use, and track controls in Purview Compliance
      Manager.
    </>
  ),
  audit: (
    <>
      Fabric activities are recorded in the Microsoft Purview audit log, the workspace lineage view shows how data
      flows from source to report, and the Fabric Capacity Metrics app shows who used how much compute.
    </>
  ),
  ruleOfThumb: (
    <>
      grant access through Entra groups on workspace roles, label sensitive items in Purview so the label follows the
      data, and use OneLake security for table- and row-level rules that apply to every engine. Keep each kind of
      regulated data in its own workspace and capacity.
    </>
  ),
};

export function FabricGovernance() {
  return <GovernanceSection platform="Fabric" config={CONFIG} />;
}
