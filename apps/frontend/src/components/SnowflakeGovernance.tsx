import roleHierarchy from "../assets/snowflake-docs-system-role-hierarchy.png";
import { SNOWFLAKE_LOGO } from "./diagramIcons";
import { type GovernanceConfig, GovernanceSection } from "./governanceSection";
import { ACCESS_CONTROL_URL, DocsFigure } from "./SnowflakeObjectHierarchy";

const CONFIG: GovernanceConfig = {
  service: "Snowflake Horizon",
  serviceLogo: SNOWFLAKE_LOGO,
  serviceWhere:
    "Built into the platform — there's nothing to install. Horizon runs in Snowflake's cloud services layer and governs every account in your organization: roles, policies, tags, classification, and access history.",
  intro: (
    <>
      Governance answers three questions: <em>who can see this data</em>, <em>how is it protected</em>, and{" "}
      <em>how do we prove it</em>. In Snowflake the answer is{" "}
      <strong className="font-semibold text-slate-900">role-based access control</strong> plus{" "}
      <strong className="font-semibold text-slate-900">Snowflake Horizon</strong> — masking, row access, tagging,
      classification, and auditing, enforced on every query no matter which tool sends it.
    </>
  ),
  levels: [
    { level: "Organization", scope: "all of a company's accounts", control: "Organization admins · account creation · replication", icon: "users" },
    { level: "Account", scope: "one isolated environment", control: "Users & roles · SSO, MFA, SCIM · network policies", icon: "server" },
    { level: "Database", scope: "e.g. SALES", control: "Ownership · database roles · USAGE", icon: "database" },
    { level: "Schema", scope: "e.g. SALES.GOLD", control: "USAGE · managed access schemas", icon: "folderGit" },
    { level: "Table · view · stage", scope: "a single object", control: "SELECT · INSERT · UPDATE · READ", icon: "chart" },
    { level: "Column", scope: "inside a table", control: "Masking & projection policies · tags", icon: "shieldCheck" },
    { level: "Row", scope: "inside a table", control: "Row access policies", icon: "shieldCheck" },
  ],
  rbacIntro: (
    <>
      Privileges are granted to <strong className="font-semibold text-slate-900">roles</strong>, roles are granted to
      users and to other roles, and a role inherits everything granted to the roles beneath it. System roles sit at the
      top — <span className="font-mono text-sm">ACCOUNTADMIN</span>, <span className="font-mono text-sm">SECURITYADMIN</span>,{" "}
      <span className="font-mono text-sm">USERADMIN</span>, <span className="font-mono text-sm">SYSADMIN</span> — and your
      custom roles hang under <span className="font-mono text-sm">SYSADMIN</span>. Users and group memberships are
      usually synced from Microsoft Entra ID or Okta through SCIM.
    </>
  ),
  rbacFigure: (
    <DocsFigure
      src={roleHierarchy}
      alt="Snowflake role hierarchy: ACCOUNTADMIN above SECURITYADMIN and SYSADMIN; USERADMIN under SECURITYADMIN; custom roles under SYSADMIN; PUBLIC at the bottom; database roles inside a database granted up to custom roles"
      caption="System roles at the top, custom roles under SYSADMIN, and database roles granted up into them."
      sourceLabel="Overview of access control"
      sourceUrl={ACCESS_CONTROL_URL}
      maxWidth="max-w-md"
    />
  ),
  rbacPoints: [
    ["Access roles and functional roles", "Access roles hold privileges on objects; functional roles (ANALYST, ENGINEER) are granted access roles and given to people."],
    ["Ownership", "The role that creates an object owns it and can grant on it; managed access schemas move that decision to the schema owner."],
    ["Future grants", "GRANT … ON FUTURE TABLES covers tables that don't exist yet, so new tables aren't accidentally invisible."],
    ["Keep the hierarchy connected", "Grant custom roles up to SYSADMIN so administrators can manage everything."],
    ["ACCOUNTADMIN is for emergencies", "A handful of named admins with MFA; nobody works in it day to day."],
  ],
  rbacCode: {
    title: "Roles · an access role and a functional role (illustrative)",
    code: `-- Access role: holds the privileges
CREATE ROLE GOLD_READ;
GRANT USAGE  ON DATABASE SALES               TO ROLE GOLD_READ;
GRANT USAGE  ON SCHEMA   SALES.GOLD          TO ROLE GOLD_READ;
GRANT SELECT ON ALL TABLES    IN SCHEMA SALES.GOLD TO ROLE GOLD_READ;
GRANT SELECT ON FUTURE TABLES IN SCHEMA SALES.GOLD TO ROLE GOLD_READ;

-- Functional role: what people actually get
CREATE ROLE ANALYST;
GRANT ROLE GOLD_READ TO ROLE ANALYST;
GRANT ROLE ANALYST   TO ROLE SYSADMIN;   -- keep the hierarchy connected`,
  },
  encryptionIntro: (
    <>
      Everything in Snowflake is encrypted, always — there is no setting to turn it off. Keys are managed by Snowflake
      in a hierarchy and rotated automatically, and on Business Critical edition you can add a key of your own.
    </>
  ),
  encryption: [
    {
      title: "In transit",
      icon: "share",
      points: [
        "TLS 1.2+ for every client connection: Snowsight, drivers, connectors, APIs",
        "Private connectivity over AWS PrivateLink, Azure Private Link, or Google Private Service Connect",
        "Files staged by clients can be encrypted before upload",
      ],
    },
    {
      title: "At rest",
      icon: "database",
      points: [
        "All data encrypted with AES-256, automatically",
        "Hierarchical keys: root, account, table, and file keys",
        "Keys rotated automatically; periodic rekeying on Enterprise and above",
      ],
    },
    {
      title: "Your own key",
      icon: "key",
      points: [
        "Tri-Secret Secure (Business Critical) combines your cloud KMS key with Snowflake's",
        "Data can only be decrypted while both keys are available",
        "Revoke your key and the data can no longer be read",
      ],
    },
  ],
  decryption: (
    <>
      Decryption is transparent. When a role runs a query, Snowflake first checks its privileges and applies masking and
      row access policies; only the data that role may see is decrypted, inside the virtual warehouse. Nobody handles
      keys. For the most sensitive columns, add application-level protection: encrypt values with{" "}
      <span className="font-mono text-xs">ENCRYPT</span> and a passphrase kept outside the code, or tokenize them
      through an external tokenization partner, so even a role that can read the table sees only ciphertext or tokens.
    </>
  ),
  encryptionCode: {
    title: "Column-level encryption · passphrase kept outside the code (illustrative)",
    code: `-- Encrypt on the way in ($pass is set from a secret, never hard-coded)
SELECT ENCRYPT(card_number, $pass) AS card_number_enc
FROM RAW.PAYMENTS;

-- Decrypt only where the passphrase is available
SELECT TO_VARCHAR(DECRYPT(card_number_enc, $pass), 'utf-8') AS card_number
FROM SECURE.PAYMENTS;`,
  },
  sensitiveRows: [
    [
      "PII · personal data",
      "Names, emails, phone numbers, addresses, national IDs",
      "Know where it is, hide it from people who don't need it, and be able to delete one person's data on request (GDPR, CCPA).",
      "Sensitive data classification tags columns with semantic and privacy categories. Tag-based masking policies then mask every tagged column automatically, and row access policies limit rows by region or team. Remember deleted rows stay recoverable through Time Travel and Fail-safe until those windows pass.",
    ],
    [
      "PHI · health data",
      "Diagnoses, medical record numbers, claims, lab results",
      "HIPAA: a Business Associate Agreement, encryption, audited access, and only the minimum necessary data per role.",
      "Use Business Critical edition and sign a BAA with Snowflake before storing PHI. Keep PHI in its own account or database, add Tri-Secret Secure and private connectivity, and mask fields each role doesn't need.",
    ],
    [
      "PCI · payment card data",
      "Card numbers (PAN), expiry dates, card security codes",
      "PCI DSS: never store the security code (CVV) after authorization, and protect stored card numbers by tokenizing, encrypting, or truncating them.",
      "Business Critical supports PCI DSS workloads. Tokenize card numbers through external tokenization or encrypt them, mask all but the last four digits, drop CVVs at ingestion, and keep cardholder data in its own account or database.",
    ],
  ],
  sensitiveCode: [
    {
      title: "Tag-based masking · one policy for every PII column (illustrative)",
      code: `CREATE TAG GOV.TAGS.PII_TYPE ALLOWED_VALUES 'EMAIL', 'PHONE', 'SSN';

CREATE MASKING POLICY GOV.POLICIES.MASK_PII
  AS (val STRING) RETURNS STRING ->
  CASE WHEN IS_ROLE_IN_SESSION('PII_READER') THEN val
       ELSE '***MASKED***' END;

ALTER TAG GOV.TAGS.PII_TYPE SET MASKING POLICY GOV.POLICIES.MASK_PII;

-- Any column with this tag is now masked automatically
ALTER TABLE SALES.GOLD.CUSTOMERS
  MODIFY COLUMN email SET TAG GOV.TAGS.PII_TYPE = 'EMAIL';`,
    },
    {
      title: "Masking + row access · cards and regions (illustrative)",
      code: `CREATE MASKING POLICY GOV.POLICIES.CARD_LAST4
  AS (val STRING) RETURNS STRING ->
  CASE WHEN IS_ROLE_IN_SESSION('PCI_FULL_ACCESS') THEN val
       ELSE 'XXXX-XXXX-XXXX-' || RIGHT(val, 4) END;

ALTER TABLE SECURE.PAYMENTS MODIFY COLUMN card_number
  SET MASKING POLICY GOV.POLICIES.CARD_LAST4;

CREATE ROW ACCESS POLICY GOV.POLICIES.BY_REGION
  AS (region STRING) RETURNS BOOLEAN ->
  IS_ROLE_IN_SESSION('SALES_GLOBAL')
  OR IS_ROLE_IN_SESSION('SALES_' || region);

ALTER TABLE SALES.GOLD.ORDERS
  ADD ROW ACCESS POLICY GOV.POLICIES.BY_REGION ON (region);`,
    },
  ],
  compliance: (
    <>
      Business Critical edition is required for PHI and is the edition for PCI DSS workloads; sign a BAA with Snowflake
      before storing PHI. The Trust Center continuously checks accounts against security benchmarks and flags risky
      settings.
    </>
  ),
  audit: (
    <>
      <span className="font-mono text-xs">ACCOUNT_USAGE.ACCESS_HISTORY</span> records which columns every query read
      or wrote, alongside query and login history — and object lineage in Horizon shows where every table&apos;s data
      came from.
    </>
  ),
  ruleOfThumb: (
    <>
      classify first, then grant through access roles and mask sensitive columns with tag-based policies so new
      columns are covered automatically. Keep each kind of regulated data in its own account or database, on Business
      Critical, with your own key.
    </>
  ),
};

export function SnowflakeGovernance() {
  return <GovernanceSection platform="Snowflake" config={CONFIG} />;
}
