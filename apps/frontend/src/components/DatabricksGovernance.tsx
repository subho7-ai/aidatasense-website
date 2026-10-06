import { InheritanceDiagram } from "./DatabricksObjectHierarchy";
import { DATABRICKS_LOGO } from "./diagramIcons";
import { type GovernanceConfig, GovernanceSection } from "./governanceSection";

const CONFIG: GovernanceConfig = {
  service: "Unity Catalog",
  serviceLogo: DATABRICKS_LOGO,
  serviceWhere:
    "One governance layer for the whole account. It runs in the Databricks control plane, and one Unity Catalog metastore per region governs every workspace attached to it.",
  intro: (
    <>
      Governance answers three questions: <em>who can see this data</em>, <em>how is it protected</em>, and{" "}
      <em>how do we prove it</em>. In Databricks the answer to all three is{" "}
      <strong className="font-semibold text-slate-900">Unity Catalog</strong> — permissions, row and column controls,
      lineage, and audit for every table, view, volume, model, and function, across every workspace.
    </>
  ),
  levels: [
    { level: "Account", scope: "the whole organization on Databricks", control: "Users, groups, service principals · SSO + SCIM", icon: "users" },
    { level: "Workspace", scope: "one working environment", control: "Workspace access · catalog binding · notebook & job ACLs", icon: "app" },
    { level: "Metastore", scope: "one per region", control: "Metastore admins · storage credentials · external locations", icon: "server" },
    { level: "Catalog", scope: "e.g. prod", control: "USE CATALOG · ownership · grants inherit down", icon: "database" },
    { level: "Schema", scope: "e.g. prod.gold", control: "USE SCHEMA · CREATE TABLE · MODIFY", icon: "folderGit" },
    { level: "Table · view · volume · model", scope: "a single object", control: "SELECT · MODIFY · READ VOLUME · EXECUTE", icon: "chart" },
    { level: "Row & column", scope: "inside a table", control: "Row filters · column masks", icon: "shieldCheck" },
  ],
  rbacIntro: (
    <>
      Permissions are <strong className="font-semibold text-slate-900">privileges</strong> granted on a securable
      object to a <strong className="font-semibold text-slate-900">principal</strong> — a user, a group, or a service
      principal. Identities live at the account level and are usually synced from Microsoft Entra ID or Okta through
      SCIM, so access follows the same groups people already belong to. A grant on a catalog or schema flows down to
      everything inside it.
    </>
  ),
  rbacFigure: <InheritanceDiagram />,
  rbacPoints: [
    ["Grant to groups, not people", "Access survives joiners, movers, and leavers when it's attached to a group."],
    ["Ownership", "Every object has an owner who can grant on it; make owners groups, never individuals."],
    ["Least privilege", "Grant USE CATALOG and USE SCHEMA to reach objects, then only the object privileges each group needs."],
    ["Attribute-based policies", "Governed tags let one policy mask or filter every column or table carrying a tag, instead of one rule per table."],
    ["Workspace objects are separate", "Notebooks, jobs, and clusters use workspace permissions; Unity Catalog governs the data they touch."],
  ],
  rbacCode: {
    title: "Grants · read gold, build in silver (illustrative)",
    code: `-- Analysts can read every table in prod.gold, including tables added later
GRANT USE CATALOG ON CATALOG prod TO \`analysts\`;
GRANT USE SCHEMA  ON SCHEMA  prod.gold TO \`analysts\`;
GRANT SELECT      ON SCHEMA  prod.gold TO \`analysts\`;

-- Engineers can create and change tables in prod.silver
GRANT USE SCHEMA, CREATE TABLE, MODIFY, SELECT ON SCHEMA prod.silver TO \`data_engineers\`;`,
  },
  encryptionIntro: (
    <>
      Data is encrypted everywhere by default. Because Databricks stores table data in <em>your</em> cloud storage,
      encryption at rest is handled by your cloud provider, and you can add your own keys for both the storage and the
      control plane.
    </>
  ),
  encryption: [
    {
      title: "In transit",
      icon: "share",
      points: [
        "TLS 1.2+ for every connection: browsers, BI tools, APIs, and drivers",
        "Control plane ↔ compute plane traffic is encrypted",
        "Optional encryption between cluster worker nodes",
      ],
    },
    {
      title: "At rest",
      icon: "database",
      points: [
        "Table data in your storage is encrypted by the cloud provider (Azure Storage, S3, GCS)",
        "Cluster disks and workspace storage are encrypted",
        "Serverless compute and default storage are encrypted by Databricks",
      ],
    },
    {
      title: "Your own keys",
      icon: "key",
      points: [
        "Customer-managed keys in Azure Key Vault, AWS KMS, or Google Cloud KMS",
        "Cover managed services (notebooks, secrets, query results) and workspace storage",
        "Revoke the key and Databricks can no longer read that data",
      ],
    },
  ],
  decryption: (
    <>
      Decryption is transparent. When an authorized principal runs a query, Unity Catalog first checks the grants,
      filters, and masks; only then is the data read and decrypted by the storage service using the right key. People
      never handle keys. For the most sensitive columns, you can add application-level encryption with{" "}
      <span className="font-mono text-xs">aes_encrypt</span> and a key kept in a secret scope — then only principals
      allowed to read that secret can decrypt the column, even if they can read the table.
    </>
  ),
  encryptionCode: {
    title: "Column-level encryption · key from a secret scope (illustrative)",
    code: `-- Encrypt on the way in
SELECT aes_encrypt(card_number, secret('pci', 'card-key')) AS card_number_enc
FROM raw.payments;

-- Only principals allowed to read the 'pci' secret can decrypt
SELECT CAST(aes_decrypt(card_number_enc, secret('pci', 'card-key')) AS STRING) AS card_number
FROM secure.payments;`,
  },
  sensitiveRows: [
    [
      "PII · personal data",
      "Names, emails, phone numbers, addresses, national IDs",
      "Know where it is, hide it from people who don't need it, and be able to delete one person's data on request (GDPR, CCPA).",
      "Data classification finds and tags sensitive columns. Column masks hide them by default, row filters limit rows by region or team, and Delta DELETE plus VACUUM permanently removes an individual's records.",
    ],
    [
      "PHI · health data",
      "Diagnoses, medical record numbers, claims, lab results",
      "HIPAA: a Business Associate Agreement, encryption, audited access, and only the minimum necessary data per role.",
      "Enable the compliance security profile on workspaces that process PHI and sign a BAA. Keep PHI in its own catalog bound to those workspaces, use customer-managed keys, and mask fields each role doesn't need.",
    ],
    [
      "PCI · payment card data",
      "Card numbers (PAN), expiry dates, card security codes",
      "PCI DSS: never store the security code (CVV) after authorization, and protect stored card numbers by tokenizing, encrypting, or truncating them.",
      "Tokenize card numbers before they land, or encrypt them with aes_encrypt. Mask all but the last four digits, drop CVVs at ingestion, and treat a dedicated catalog and workspace as the cardholder data environment.",
    ],
  ],
  sensitiveCode: [
    {
      title: "Column mask · last four card digits (illustrative)",
      code: `CREATE FUNCTION gov.masks.card_last4(card STRING)
RETURN CASE
  WHEN is_account_group_member('pci_full_access') THEN card
  ELSE concat('XXXX-XXXX-XXXX-', right(card, 4))
END;

ALTER TABLE secure.payments
  ALTER COLUMN card_number SET MASK gov.masks.card_last4;`,
    },
    {
      title: "Row filter · EU customers for EU staff (illustrative)",
      code: `CREATE FUNCTION gov.filters.customer_region(region STRING)
RETURN is_account_group_member('sales_global')
    OR (region = 'EU' AND is_account_group_member('sales_eu'));

ALTER TABLE prod.gold.customers
  SET ROW FILTER gov.filters.customer_region ON (region);`,
    },
  ],
  compliance: (
    <>
      The compliance security profile adds hardened images, enhanced monitoring, and the controls needed for
      standards such as HIPAA and PCI DSS. Turn it on for workspaces that handle regulated data, and sign a BAA with
      Databricks before processing PHI.
    </>
  ),
  audit: (
    <>
      Every action is recorded in system tables — <span className="font-mono text-xs">system.access.audit</span> for
      who did what, query history for what ran — and Unity Catalog lineage shows which sources fed every table, down to
      the column.
    </>
  ),
  ruleOfThumb: (
    <>
      classify first, then grant to groups at the catalog or schema level and mask sensitive columns by default. Keep
      each kind of regulated data in its own catalog, bound to the workspaces cleared to use it, and protect it with
      your own keys.
    </>
  ),
};

export function DatabricksGovernance() {
  return <GovernanceSection platform="Databricks" config={CONFIG} />;
}
