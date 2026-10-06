import { Code, GitPlatformsCallout, Guardrails, PipelineFlow, type PipelineFlowConfig, Step, type Tool, Toolchain } from "./cicdFlow";
import { SNOWFLAKE_LOGO } from "./diagramIcons";

const FLOW: PipelineFlowConfig = {
  platform: "Snowflake",
  platformLogo: SNOWFLAKE_LOGO,
  platformColor: "#0e7fb4",
  platformLaneFill: "#eef8fd",
  devSubs: ["Workspace, Dev", "on dev data", "from the Workspace"],
  envNoun: "account",
  containerNoun: "database",
  containers: ["SALES", "SALES", "SALES"],
  identity: "service user",
  identityShort: "service user",
  whatChanges: "target account",
  ariaLabel:
    "CI/CD flow: a developer branches and edits in a Git-connected Snowflake Workspace, runs on dev data, and pushes to Azure Repos; a pull request runs validation; merging to main deploys to the Test/Cert account; after approval the pipeline deploys to the Prod account as a service user",
};

const TOOLCHAIN: Tool[] = [
  { name: "Azure Repos", role: "Git repository — branches, pull requests, branch policies", icon: "branch", color: "text-[#0078D4]" },
  { name: "Snowsight Workspaces", role: "Edit SQL and Python files from your Git branch, right inside Snowflake", icon: "folderGit", color: "text-sky-600" },
  { name: "Snowflake Git repository", role: "A Git repository object that mirrors your repo, so Snowflake can run files straight from a branch", icon: "bundle", color: "text-cyan-700" },
  { name: "Snowflake CLI", role: "snow git fetch / snow git execute — deploys versioned SQL to each account", icon: "code", color: "text-cyan-700" },
  { name: "Azure Pipelines", role: "Lints, tests, and runs the deployment against each account", icon: "pipeline", color: "text-[#0078D4]" },
  { name: "Service user", role: "A TYPE = SERVICE user with key-pair auth that deploys to Test/Cert and Prod", icon: "key", color: "text-amber-600" },
];

export function SnowflakeDevOpsFlow() {
  return (
    <div className="border-t border-slate-200 py-8">
      <h2 className="text-2xl font-semibold text-slate-900">CI/CD for Data Engineers with Azure DevOps</h2>
      <p className="mt-3 text-slate-600">
        How a data engineer takes a change from the Dev account to production. The code lives in{" "}
        <strong className="font-semibold text-slate-900">Azure Repos</strong>, you edit it in a Git-connected{" "}
        <strong className="font-semibold text-slate-900">Workspace</strong> in Snowsight (or your IDE), and{" "}
        <strong className="font-semibold text-slate-900">Azure Pipelines</strong> promotes the same commit through
        Test/Cert and Prod with the <strong className="font-semibold text-slate-900">Snowflake CLI</strong>.
      </p>

      <PipelineFlow config={FLOW} />

      <GitPlatformsCallout
        deployLabel="Deploy to Snowflake"
        deployCommand="snow git execute"
        assetNote="Snowflake's Git integration connects to all three, and the SQL in your repo doesn't change at all."
      />

      <h3 className="mt-8 text-lg font-semibold text-slate-900">The toolchain</h3>
      <Toolchain tools={TOOLCHAIN} />

      <h3 className="mt-8 text-lg font-semibold text-slate-900">The repo</h3>
      <p className="mt-3 text-slate-600">
        One repo holds the object definitions, the Snowpark code, and the tests. Each environment is its own Snowflake
        account with the same database names, so the same SQL deploys everywhere — only the connection changes.
        Templated values like warehouse names come in as variables.
      </p>
      <div className="grid gap-4 lg:grid-cols-2">
        <Code title="Repo layout · Azure Repos">{`retail-pipelines/
├── deploy/
│   ├── 01_schemas.sql
│   ├── 02_tables.sql
│   ├── 03_customer_tiers.sql   # dynamic table
│   └── 04_tasks.sql
├── snowpark/
│   └── loyalty/
│       └── transforms.py       # logic you can unit test
├── tests/
│   └── test_transforms.py
├── .sqlfluff                   # SQL lint rules
└── azure-pipelines.yml         # CI/CD pipeline`}</Code>
        <Code title="deploy/03_customer_tiers.sql · templated">{`CREATE OR REPLACE DYNAMIC TABLE SALES.GOLD.CUSTOMER_TIERS
  TARGET_LAG = '1 hour'
  WAREHOUSE  = TRANSFORM_{{ env }}_WH
AS
SELECT customer_id,
       SUM(order_total) AS spend_12m,
       CASE
         WHEN SUM(order_total) >= 5000 THEN 'GOLD'
         WHEN SUM(order_total) >= 1000 THEN 'SILVER'
         ELSE 'BRONZE'
       END AS loyalty_tier
FROM SALES.SILVER.ORDERS
WHERE order_date >= DATEADD(month, -12, CURRENT_DATE())
GROUP BY customer_id;`}</Code>
      </div>

      <h3 className="mt-8 text-lg font-semibold text-slate-900">A feature&apos;s journey, step by step</h3>
      <p className="mt-3 text-slate-600">
        Say you&apos;re adding a new <span className="font-mono text-sm">loyalty_tier</span> column to the customer
        table. Here is everything that happens, and where.
      </p>
      <ol className="mt-4 space-y-3">
        <Step n={1} icon="folderGit" title="Branch" where="Dev account · Snowsight Workspace">
          Open the <span className="font-mono">retail-pipelines</span> Workspace, which is connected to Azure Repos,
          and create <span className="font-mono">feature/loyalty-tier</span> from <span className="font-mono">main</span>.
          The Workspace is your working copy inside Snowflake; VS Code with the Snowflake extension works the same way.
        </Step>
        <Step n={2} icon="play" title="Build and try it" where="Dev account · dev warehouse">
          Edit <span className="font-mono">03_customer_tiers.sql</span> and the Snowpark code, run it against the Dev
          account on a small dev warehouse, and add a unit test. Everything you create lands in the Dev account, so it
          can&apos;t touch Test/Cert or Prod data.
        </Step>
        <Step n={3} icon="commit" title="Commit and push" where="Workspace → Azure Repos">
          Commit and push from the Workspace (or your IDE). Your branch in Azure Repos now has the change.
        </Step>
        <Step n={4} icon="pullRequest" title="Open a pull request" where="Azure Repos · build validation">
          Branch policies on <span className="font-mono">main</span> require a reviewer and a passing build. The
          validation pipeline lints the SQL with <span className="font-mono">sqlfluff</span> and runs the Snowpark
          unit tests with <span className="font-mono">pytest</span>. Nothing is deployed yet.
        </Step>
        <Step n={5} icon="rocket" title="Merge → Test/Cert" where="Azure Pipelines · Test/Cert account">
          Merging to <span className="font-mono">main</span> triggers the pipeline. As the service user, it refreshes
          the Snowflake Git repository and runs the deploy scripts against the Test/Cert account; a failure stops the
          release here. Business users then validate the new column on production-like data — the sign-off that
          it&apos;s right, not just that it runs.
        </Step>
        <Step n={6} icon="shieldCheck" title="Approve → Prod" where="Azure Pipelines · Prod account">
          A final approval, inside the agreed change window, runs the same scripts against Prod. Rolling back means
          redeploying the previous commit — and Time Travel can restore data if a change went wrong.
        </Step>
      </ol>

      <h3 className="mt-8 text-lg font-semibold text-slate-900">The pipeline</h3>
      <p className="mt-3 text-slate-600">
        One multi-stage YAML pipeline. Pull-request validation is switched on with a branch policy in Azure Repos;
        Test/Cert deploys automatically, and an approval on the Azure Pipelines <em>environment</em> makes Prod wait
        for a person.
      </p>
      <Code title="azure-pipelines.yml (simplified)">{`trigger:
  branches: { include: [main] }   # PR validation: set as a branch policy on main

stages:
- stage: Validate
  jobs:
  - job: checks
    steps:
    - script: pip install snowflake-cli sqlfluff pytest
    - script: sqlfluff lint deploy/ && pytest tests/

- stage: TestCert
  dependsOn: Validate
  condition: and(succeeded(), eq(variables['Build.SourceBranch'], 'refs/heads/main'))
  jobs:
  - deployment: deploy
    environment: snowflake-cert
    strategy:
      runOnce:
        deploy:
          steps:
          - script: |
              snow git fetch DEVOPS.GIT.RETAIL_REPO -c cert
              snow git execute "@DEVOPS.GIT.RETAIL_REPO/branches/main/deploy/*.sql" \\
                -D "env='CERT'" -c cert

- stage: Prod
  dependsOn: TestCert
  jobs:
  - deployment: deploy
    environment: snowflake-prod   # approval + business-hours check
    strategy:
      runOnce:
        deploy:
          steps:
          - script: |
              snow git fetch DEVOPS.GIT.RETAIL_REPO -c prod
              snow git execute "@DEVOPS.GIT.RETAIL_REPO/branches/main/deploy/*.sql" \\
                -D "env='PROD'" -c prod`}</Code>
      <p className="mt-2 text-xs text-slate-500">
        The <span className="font-mono">cert</span> and <span className="font-mono">prod</span> connections
        authenticate as the service user with a key pair stored in Azure Key Vault. Teams that prefer versioned
        migrations use schemachange instead, and Terraform for account-level objects like warehouses and roles — the
        flow stays the same.
      </p>

      <h3 className="mt-8 text-lg font-semibold text-slate-900">Guardrails that make it safe</h3>
      <Guardrails
        items={[
          ["Main is protected", "No direct pushes; every change arrives through a reviewed pull request with a passing build."],
          ["Hands off past Dev", "People get read roles in Test/Cert and Prod; only the service user's deploy role can create or change objects."],
          ["Same artifact everywhere", "The commit that passed Test/Cert is the one that reaches Prod — environments differ only by target account."],
          ["Data stays in its lane", "Each environment is its own account, so a Test/Cert run can never write to Prod data."],
          ["Secrets out of the repo", "Key pairs live in Azure Key Vault and pipeline variable groups, never in code or worksheets."],
        ]}
      />
    </div>
  );
}
