import { Code, GitPlatformsCallout, Guardrails, PipelineFlow, type PipelineFlowConfig, Step, type Tool, Toolchain } from "./cicdFlow";
import { DATABRICKS_LOGO } from "./diagramIcons";

const FLOW: PipelineFlowConfig = {
  platform: "Databricks",
  platformLogo: DATABRICKS_LOGO,
  platformColor: "#e5522f",
  platformLaneFill: "#fff7f3",
  devSubs: ["Git folder, Dev", "on dev data", "from the Git folder"],
  envNoun: "workspace",
  containerNoun: "catalog",
  containers: ["dev", "cert", "prod"],
  identity: "service principal",
  identityShort: "SP",
  whatChanges: "bundle target",
  ariaLabel:
    "CI/CD flow: a developer branches and edits in a Databricks Git folder, runs on dev data, and pushes to Azure Repos; a pull request runs validation; merging to main deploys to the Test/Cert workspace; after approval the pipeline deploys to the Prod workspace as a service principal",
};

const TOOLCHAIN: Tool[] = [
  { name: "Azure Repos", role: "Git repository — branches, pull requests, branch policies", icon: "branch", color: "text-[#0078D4]" },
  { name: "Databricks Git folders", role: "Your branch, checked out inside the workspace, next to the notebooks", icon: "folderGit", color: "text-sky-600" },
  { name: "Databricks Asset Bundles", role: "databricks.yml describes jobs, pipelines, and per-environment settings as code", icon: "bundle", color: "text-orange-600" },
  { name: "Azure Pipelines", role: "Tests the code and deploys the bundle to each workspace", icon: "pipeline", color: "text-[#0078D4]" },
  { name: "Service principal", role: "The non-human identity that deploys to and runs jobs in Test/Cert and Prod", icon: "key", color: "text-amber-600" },
];

export function DatabricksDevOpsFlow() {
  return (
    <div className="border-t border-slate-200 py-8">
      <h2 className="text-2xl font-semibold text-slate-900">CI/CD for Data Engineers with Azure DevOps</h2>
      <p className="mt-3 text-slate-600">
        How a data engineer takes a change from a notebook in the Dev workspace to production. The code lives in{" "}
        <strong className="font-semibold text-slate-900">Azure Repos</strong>, you edit it in a{" "}
        <strong className="font-semibold text-slate-900">Git folder</strong> inside Databricks, and{" "}
        <strong className="font-semibold text-slate-900">Azure Pipelines</strong> promotes the same commit through
        Test/Cert and Prod using <strong className="font-semibold text-slate-900">Databricks Asset Bundles</strong>.
      </p>

      <PipelineFlow config={FLOW} />

      <GitPlatformsCallout
        deployLabel="Deploy to Databricks"
        deployCommand="databricks bundle deploy"
        assetNote="Databricks Git folders connect to all three, and the Asset Bundle in your repo doesn't change at all."
      />

      <h3 className="mt-8 text-lg font-semibold text-slate-900">The toolchain</h3>
      <Toolchain tools={TOOLCHAIN} />

      <h3 className="mt-8 text-lg font-semibold text-slate-900">The repo</h3>
      <p className="mt-3 text-slate-600">
        One repo holds the notebooks, the shared Python code, the tests, and the deployment definitions. Nothing about a
        job is configured by hand in a workspace — it&apos;s all in the repo.
      </p>
      <div className="grid gap-4 lg:grid-cols-2">
        <Code title="Repo layout · Azure Repos">{`retail-pipelines/
├── databricks.yml          # bundle: one target per environment
├── resources/
│   └── loyalty_job.yml     # job, tasks, and compute as code
├── src/
│   ├── notebooks/
│   │   └── build_loyalty_tiers.py
│   └── retail/
│       └── transforms.py   # logic you can unit test
├── tests/
│   └── test_transforms.py
└── azure-pipelines.yml     # CI/CD pipeline`}</Code>
        <Code title="databricks.yml · one bundle, three targets">{`bundle:
  name: retail-pipelines

include:
  - resources/*.yml

variables:
  catalog:
    default: dev

targets:
  dev:
    mode: development   # names prefixed with your user, schedules paused
    default: true
    workspace: { host: https://adb-dev.azuredatabricks.net }
  cert:                 # Test/Cert
    workspace: { host: https://adb-cert.azuredatabricks.net }
    variables: { catalog: cert }
  prod:
    mode: production
    workspace: { host: https://adb-prod.azuredatabricks.net }
    variables: { catalog: prod }
    run_as:
      service_principal_name: <application-id>`}</Code>
      </div>

      <h3 className="mt-8 text-lg font-semibold text-slate-900">A feature&apos;s journey, step by step</h3>
      <p className="mt-3 text-slate-600">
        Say you&apos;re adding a new <span className="font-mono text-sm">loyalty_tier</span> column to the customer
        table. Here is everything that happens, and where.
      </p>
      <ol className="mt-4 space-y-3">
        <Step n={1} icon="folderGit" title="Branch" where="Dev workspace · Git folder">
          In your Git folder for <span className="font-mono">retail-pipelines</span>, create{" "}
          <span className="font-mono">feature/loyalty-tier</span> from <span className="font-mono">main</span>. The
          branch exists in Azure Repos; the Git folder is your working copy inside Databricks.
        </Step>
        <Step n={2} icon="play" title="Build and try it" where="Dev workspace · all-purpose cluster">
          Edit <span className="font-mono">build_loyalty_tiers.py</span> and{" "}
          <span className="font-mono">transforms.py</span>, run the notebook against the{" "}
          <span className="font-mono">dev</span> catalog, and add a unit test. To run the whole job the way the
          pipeline will, deploy your own copy with{" "}
          <span className="font-mono">databricks bundle deploy -t dev</span> — development mode prefixes it with your
          name and pauses its schedule, so it can&apos;t collide with anyone else.
        </Step>
        <Step n={3} icon="commit" title="Commit and push" where="Git folder → Azure Repos">
          Commit and push from the Git folder (or your IDE). Your branch in Azure Repos now has the change.
        </Step>
        <Step n={4} icon="pullRequest" title="Open a pull request" where="Azure Repos · build validation">
          Branch policies on <span className="font-mono">main</span> require a reviewer and a passing build. The
          validation pipeline runs linting, <span className="font-mono">pytest</span>, and{" "}
          <span className="font-mono">databricks bundle validate</span>. Nothing is deployed yet.
        </Step>
        <Step n={5} icon="rocket" title="Merge → Test/Cert" where="Azure Pipelines · Test/Cert workspace">
          Merging to <span className="font-mono">main</span> triggers the pipeline. It deploys the bundle to Test/Cert
          as the service principal and runs the job end to end on the <span className="font-mono">cert</span> catalog;
          a failure stops the release here. Business users then validate the new column on production-like data —
          the sign-off that it&apos;s right, not just that it runs.
        </Step>
        <Step n={6} icon="shieldCheck" title="Approve → Prod" where="Azure Pipelines · Prod workspace">
          A final approval, inside the agreed change window, deploys to Prod. The job runs as the service principal
          on its normal schedule. Rolling back means redeploying the previous commit.
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
    - script: pip install -r requirements-dev.txt && pytest tests/
    - script: databricks bundle validate -t cert

- stage: TestCert
  dependsOn: Validate
  condition: and(succeeded(), eq(variables['Build.SourceBranch'], 'refs/heads/main'))
  jobs:
  - deployment: deploy
    environment: databricks-cert
    strategy:
      runOnce:
        deploy:
          steps:
          - checkout: self
          - script: |
              databricks bundle deploy -t cert
              databricks bundle run -t cert loyalty_job

- stage: Prod
  dependsOn: TestCert
  jobs:
  - deployment: deploy
    environment: databricks-prod   # approval + business-hours check
    strategy:
      runOnce:
        deploy:
          steps:
          - checkout: self
          - script: databricks bundle deploy -t prod`}</Code>
      <p className="mt-2 text-xs text-slate-500">
        Each deploy step authenticates as the service principal — for example through an Azure service connection
        with the Azure CLI task — and installs the Databricks CLI first. Those steps are left out to keep the flow
        readable.
      </p>

      <h3 className="mt-8 text-lg font-semibold text-slate-900">Guardrails that make it safe</h3>
      <Guardrails
        items={[
          ["Main is protected", "No direct pushes; every change arrives through a reviewed pull request with a passing build."],
          ["Hands off past Dev", "People can read Test/Cert and Prod, but only the service principal deploys there. No hotfixing in a workspace."],
          ["Same artifact everywhere", "The commit that passed Test/Cert is the one that reaches Prod — environments differ only by bundle target."],
          ["Data stays in its lane", "Each workspace is bound to its own catalog, so a Test/Cert run can never write to Prod data."],
          ["Secrets out of the repo", "Credentials come from Azure Key Vault and pipeline variable groups, never from code or notebooks."],
        ]}
      />
    </div>
  );
}
