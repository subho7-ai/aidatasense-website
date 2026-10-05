import type { ReactNode } from "react";

// Environments a feature moves through, left to right. Each has its own workspace and Unity Catalog catalog.
const STAGES = [
  {
    env: "Dev",
    tone: { box: "border-sky-300 bg-sky-50", text: "text-sky-700", bar: "bg-sky-500" },
    workspace: "Dev workspace",
    catalog: "dev",
    trigger: "Developer works on a feature branch",
    deploys: "You — Git folder + bundle in development mode",
    checks: "Runs against dev data on an all-purpose cluster",
  },
  {
    env: "PR",
    tone: { box: "border-slate-300 bg-slate-50", text: "text-slate-700", bar: "bg-slate-500" },
    workspace: "No deployment",
    catalog: "—",
    trigger: "Pull request into main",
    deploys: "Build validation pipeline",
    checks: "Lint · unit tests · bundle validate · code review",
  },
  {
    env: "Test/Cert",
    tone: { box: "border-amber-300 bg-amber-50", text: "text-amber-700", bar: "bg-amber-500" },
    workspace: "Test/Cert workspace",
    catalog: "cert",
    trigger: "Automatic on merge to main",
    deploys: "Pipeline as service principal",
    checks: "Integration tests on the real job, then business sign-off (UAT)",
  },
  {
    env: "Prod",
    tone: { box: "border-rose-300 bg-rose-50", text: "text-rose-700", bar: "bg-rose-500" },
    workspace: "Prod workspace",
    catalog: "prod",
    trigger: "Approval inside a change window",
    deploys: "Pipeline as service principal",
    checks: "Job runs as the service principal on schedule",
  },
];

// What has to happen to move from one stage to the next.
const GATES = ["Open PR", "Merge", "Approve"];

const TOOLCHAIN = [
  { name: "Azure Repos", role: "Git repository — branches, pull requests, branch policies" },
  { name: "Databricks Git folders", role: "Your branch, checked out inside the workspace, next to the notebooks" },
  { name: "Databricks Asset Bundles", role: "databricks.yml describes jobs, pipelines, and per-environment settings as code" },
  { name: "Azure Pipelines", role: "Tests the code and deploys the bundle to each workspace" },
  { name: "Service principal", role: "The non-human identity that deploys to and runs jobs in Test/Cert and Prod" },
];

function Code({ title, children }: { title: string; children: string }) {
  return (
    <div className="mt-4 overflow-hidden rounded-xl bg-slate-900">
      <div className="border-b border-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
        {title}
      </div>
      <pre className="overflow-x-auto p-4 text-xs leading-relaxed text-slate-100">{children}</pre>
    </div>
  );
}

function Step({ n, title, where, children }: { n: number; title: string; where: string; children: ReactNode }) {
  return (
    <li className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-xs font-semibold text-white">
        {n}
      </span>
      <div>
        <p className="font-semibold text-slate-900">{title}</p>
        <p className="text-xs font-medium uppercase tracking-wide text-indigo-600">{where}</p>
        <div className="mt-1 text-sm text-slate-600">{children}</div>
      </div>
    </li>
  );
}

function PipelineFlow() {
  return (
    <figure className="mt-6 rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
      <div className="flex flex-col gap-2 xl:flex-row xl:items-stretch">
        {STAGES.map((stage, index) => (
          <div key={stage.env} className="flex flex-col gap-2 xl:flex-1 xl:flex-row xl:items-stretch">
            <div className={`flex flex-1 flex-col overflow-hidden rounded-lg border ${stage.tone.box}`}>
              <div className={`h-1 ${stage.tone.bar}`} aria-hidden />
              <div className="flex flex-1 flex-col gap-1.5 p-3">
                <p className={`text-sm font-bold ${stage.tone.text}`}>{stage.env}</p>
                <p className="text-xs text-slate-700">
                  <span className="font-semibold">{stage.workspace}</span>
                  {stage.catalog !== "—" && (
                    <>
                      {" "}
                      · catalog <span className="font-mono">{stage.catalog}</span>
                    </>
                  )}
                </p>
                <p className="text-[11px] leading-snug text-slate-500">
                  <span className="font-semibold text-slate-600">When: </span>
                  {stage.trigger}
                </p>
                <p className="text-[11px] leading-snug text-slate-500">
                  <span className="font-semibold text-slate-600">Deployed by: </span>
                  {stage.deploys}
                </p>
                <p className="text-[11px] leading-snug text-slate-500">
                  <span className="font-semibold text-slate-600">Proves: </span>
                  {stage.checks}
                </p>
              </div>
            </div>
            {index < GATES.length && (
              <div className="flex items-center justify-center gap-1 xl:flex-col" aria-hidden>
                <span className="rounded-full border border-slate-200 bg-white px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                  {GATES[index]}
                </span>
                <span className="text-lg leading-none text-slate-400">
                  <span className="xl:hidden">↓</span>
                  <span className="hidden xl:inline">→</span>
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-lg bg-slate-900 px-3 py-2 text-center text-xs text-slate-200">
        <span className="font-semibold text-white">One source of truth:</span> the same commit on{" "}
        <span className="font-mono">main</span> is deployed to Test/Cert, then Prod — only the bundle target changes.
      </div>
      <figcaption className="mt-3 text-center text-sm text-slate-500">
        A feature&apos;s path from a developer&apos;s branch to production. Each environment has its own workspace and
        catalog; only the pipeline deploys past Dev.
      </figcaption>
    </figure>
  );
}

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

      <PipelineFlow />

      <h3 className="mt-8 text-lg font-semibold text-slate-900">The toolchain</h3>
      <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {TOOLCHAIN.map((tool) => (
          <div key={tool.name} className="rounded-xl border border-slate-200 bg-white p-3">
            <p className="text-sm font-semibold text-slate-900">{tool.name}</p>
            <p className="mt-0.5 text-xs text-slate-600">{tool.role}</p>
          </div>
        ))}
      </div>

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
        <Step n={1} title="Branch" where="Dev workspace · Git folder">
          In your Git folder for <span className="font-mono">retail-pipelines</span>, create{" "}
          <span className="font-mono">feature/loyalty-tier</span> from <span className="font-mono">main</span>. The
          branch exists in Azure Repos; the Git folder is your working copy inside Databricks.
        </Step>
        <Step n={2} title="Build and try it" where="Dev workspace · all-purpose cluster">
          Edit <span className="font-mono">build_loyalty_tiers.py</span> and{" "}
          <span className="font-mono">transforms.py</span>, run the notebook against the{" "}
          <span className="font-mono">dev</span> catalog, and add a unit test. To run the whole job the way the
          pipeline will, deploy your own copy with{" "}
          <span className="font-mono">databricks bundle deploy -t dev</span> — development mode prefixes it with your
          name and pauses its schedule, so it can&apos;t collide with anyone else.
        </Step>
        <Step n={3} title="Commit and push" where="Git folder → Azure Repos">
          Commit and push from the Git folder (or your IDE). Your branch in Azure Repos now has the change.
        </Step>
        <Step n={4} title="Open a pull request" where="Azure Repos · build validation">
          Branch policies on <span className="font-mono">main</span> require a reviewer and a passing build. The
          validation pipeline runs linting, <span className="font-mono">pytest</span>, and{" "}
          <span className="font-mono">databricks bundle validate</span>. Nothing is deployed yet.
        </Step>
        <Step n={5} title="Merge → Test/Cert" where="Azure Pipelines · Test/Cert workspace">
          Merging to <span className="font-mono">main</span> triggers the pipeline. It deploys the bundle to Test/Cert
          as the service principal and runs the job end to end on the <span className="font-mono">cert</span> catalog;
          a failure stops the release here. Business users then validate the new column on production-like data —
          the sign-off that it&apos;s right, not just that it runs.
        </Step>
        <Step n={6} title="Approve → Prod" where="Azure Pipelines · Prod workspace">
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
      <ul className="mt-3 space-y-2 text-slate-600">
        {[
          ["Main is protected", "No direct pushes; every change arrives through a reviewed pull request with a passing build."],
          ["Hands off past Dev", "People can read Test/Cert and Prod, but only the service principal deploys there. No hotfixing in a workspace."],
          ["Same artifact everywhere", "The commit that passed Test/Cert is the one that reaches Prod — environments differ only by bundle target."],
          ["Data stays in its lane", "Each workspace is bound to its own catalog, so a Test/Cert run can never write to Prod data."],
          ["Secrets out of the repo", "Credentials come from Azure Key Vault and pipeline variable groups, never from code or notebooks."],
        ].map(([title, body]) => (
          <li key={title} className="flex gap-2">
            <span className="text-indigo-500">•</span>
            <span>
              <strong className="font-semibold text-slate-900">{title}</strong> — {body}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
