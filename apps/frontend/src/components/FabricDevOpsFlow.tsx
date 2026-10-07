import fabricLogo from "../assets/microsoft-fabric-logo.png";
import deploymentPipelines from "../assets/fabric-docs-deployment-pipelines.png";
import gitBuild from "../assets/fabric-docs-git-build.png";
import { Code, GitPlatformsCallout, Guardrails, PipelineFlow, type PipelineFlowConfig, Step, type Tool, Toolchain } from "./cicdFlow";
import { DocsFigure } from "./docsFigure";

const MANAGE_DEPLOYMENT_URL = "https://learn.microsoft.com/en-us/fabric/cicd/manage-deployment";

const FLOW: PipelineFlowConfig = {
  platform: "Microsoft Fabric",
  platformLogo: fabricLogo,
  platformColor: "#117865",
  platformLaneFill: "#eef9f5",
  devSubs: ["Feature workspace", "on dev data", "from the workspace"],
  envNoun: "workspace",
  containerNoun: "lakehouse",
  containers: ["SalesLakehouse", "SalesLakehouse", "SalesLakehouse"],
  identity: "service principal",
  identityShort: "SP",
  whatChanges: "target workspace",
  ariaLabel:
    "CI/CD flow: a developer branches out to a feature workspace connected to Git, runs on dev data, and commits to Azure Repos; a pull request runs validation; merging to main deploys to the Test workspace with fabric-cicd; after approval the pipeline deploys to the Prod workspace as a service principal",
};

const TOOLCHAIN: Tool[] = [
  { name: "Azure Repos", role: "Git repository — branches, pull requests, branch policies", icon: "branch", color: "text-[#0078D4]" },
  { name: "Fabric Git integration", role: "Connects a workspace to a branch; items are stored in Git as folders of definition files", icon: "folderGit", color: "text-teal-700" },
  { name: "fabric-cicd", role: "Microsoft's open-source Python library that publishes items from the repo to a workspace", icon: "code", color: "text-teal-700" },
  { name: "Azure Pipelines", role: "Runs the checks and calls fabric-cicd for each environment", icon: "pipeline", color: "text-[#0078D4]" },
  { name: "Deployment pipelines", role: "Fabric's built-in, no-code Dev → Test → Prod promotion — an alternative to fabric-cicd", icon: "rocket", color: "text-teal-700" },
  { name: "Service principal", role: "The Entra ID identity that deploys to Test and Prod workspaces", icon: "key", color: "text-amber-600" },
];

export function FabricDevOpsFlow() {
  return (
    <div className="border-t border-slate-200 py-8">
      <h2 className="text-2xl font-semibold text-slate-900">CI/CD for Data Engineers with Azure DevOps</h2>
      <p className="mt-3 text-slate-600">
        How a data engineer takes a change from a feature workspace to production. Each workspace is connected to a Git
        branch in <strong className="font-semibold text-slate-900">Azure Repos</strong>, so notebooks, pipelines,
        lakehouses, and semantic models are versioned as code, and{" "}
        <strong className="font-semibold text-slate-900">Azure Pipelines</strong> promotes the same commit to the Test
        and Prod workspaces with <strong className="font-semibold text-slate-900">fabric-cicd</strong>.
      </p>

      <PipelineFlow config={FLOW} />

      <GitPlatformsCallout
        deployLabel="Deploy to Fabric"
        deployCommand="fabric-cicd publish_all_items"
        assetNote="Fabric's built-in Git integration connects to Azure DevOps and GitHub; on GitLab, keep the repo there and deploy with fabric-cicd from GitLab CI/CD. The item definitions in your repo don't change."
      />

      <h3 className="mt-8 text-lg font-semibold text-slate-900">The toolchain</h3>
      <Toolchain tools={TOOLCHAIN} />

      <h3 className="mt-8 text-lg font-semibold text-slate-900">The repo</h3>
      <p className="mt-3 text-slate-600">
        When a workspace is connected to Git, every item becomes a folder of definition files named after the item and
        its type. A small <span className="font-mono text-sm">parameter.yml</span> swaps values that differ between
        environments — such as the ID of the lakehouse a notebook reads from.
      </p>
      <div className="grid gap-4 lg:grid-cols-2">
        <Code title="Repo layout · Azure Repos">{`retail-fabric/
├── workspace/
│   ├── SalesLakehouse.Lakehouse/
│   ├── Load Orders.Notebook/
│   │   └── notebook-content.py
│   ├── Daily Load.DataPipeline/
│   │   └── pipeline-content.json
│   ├── Sales.SemanticModel/
│   ├── Sales Overview.Report/
│   └── parameter.yml          # per-environment values
├── tests/
│   └── test_transforms.py
├── deploy.py                  # calls fabric-cicd
└── azure-pipelines.yml`}</Code>
        <div className="flex flex-col gap-4">
          <Code title="deploy.py · publish to one environment">{`import sys
from fabric_cicd import FabricWorkspace, publish_all_items, unpublish_all_orphan_items

WORKSPACE_IDS = {"TEST": "<test-workspace-id>", "PROD": "<prod-workspace-id>"}
env = sys.argv[1]

workspace = FabricWorkspace(
    workspace_id=WORKSPACE_IDS[env],
    environment=env,
    repository_directory="workspace",
    item_type_in_scope=["Notebook", "DataPipeline", "SemanticModel", "Report"],
)
publish_all_items(workspace)            # create or update items
unpublish_all_orphan_items(workspace)   # remove items deleted from Git`}</Code>
          <Code title="workspace/parameter.yml">{`find_replace:
  - find_value: "<dev-lakehouse-id>"
    replace_value:
      TEST: "<test-lakehouse-id>"
      PROD: "<prod-lakehouse-id>"`}</Code>
        </div>
      </div>

      <h3 className="mt-8 text-lg font-semibold text-slate-900">A feature&apos;s journey, step by step</h3>
      <p className="mt-3 text-slate-600">
        Say you&apos;re adding a new <span className="font-mono text-sm">loyalty_tier</span> column to the customer
        table. Here is everything that happens, and where.
      </p>
      <ol className="mt-4 space-y-3">
        <Step n={1} icon="folderGit" title="Branch" where="Fabric · feature workspace">
          From the Dev workspace&apos;s source control panel, <strong className="font-semibold text-slate-900">branch out to a
          new workspace</strong>. Fabric creates <span className="font-mono">feature/loyalty-tier</span> in Azure Repos
          and a private feature workspace connected to it — your own copy to work in.
        </Step>
        <Step n={2} icon="play" title="Build and try it" where="Feature workspace · dev data">
          Edit the <span className="font-mono">Load Orders</span> notebook, run it against dev data, and add a unit test
          for the transformation logic. Nothing you do here touches the shared Dev, Test, or Prod workspaces.
        </Step>
        <Step n={3} icon="commit" title="Commit and push" where="Workspace → Azure Repos">
          Commit from the workspace&apos;s source control panel. The changed item definitions land on your branch in
          Azure Repos.
        </Step>
        <Step n={4} icon="pullRequest" title="Open a pull request" where="Azure Repos · build validation">
          Branch policies on <span className="font-mono">main</span> require a reviewer and a passing build. The
          validation pipeline runs the unit tests and checks the parameter file covers every environment. Nothing is
          deployed yet.
        </Step>
        <Step n={5} icon="rocket" title="Merge → Test" where="Azure Pipelines · Test workspace">
          Merging to <span className="font-mono">main</span> triggers the pipeline, which runs{" "}
          <span className="font-mono">deploy.py TEST</span> as the service principal. fabric-cicd publishes the changed
          items to the Test workspace, swapping in Test&apos;s lakehouse ID. Business users then validate the new column
          on production-like data.
        </Step>
        <Step n={6} icon="shieldCheck" title="Approve → Prod" where="Azure Pipelines · Prod workspace">
          A final approval, inside the agreed change window, runs <span className="font-mono">deploy.py PROD</span>.
          Rolling back means redeploying the previous commit.
        </Step>
      </ol>
      <DocsFigure
        src={gitBuild}
        alt="Git-based deployment: a developer pulls and pushes to a feature branch synced with feature workspaces; the feature branch merges into main; build and release pipelines deploy from main to the dev, test, and prod workspaces"
        caption="Microsoft's view of the same pattern: feature workspaces sync with feature branches, and build-and-release pipelines deploy main to each environment."
        sourceLabel="Microsoft Learn — Choose the best Fabric CI/CD workflow option"
        sourceUrl={MANAGE_DEPLOYMENT_URL}
      />

      <h3 className="mt-8 text-lg font-semibold text-slate-900">The pipeline</h3>
      <p className="mt-3 text-slate-600">
        One multi-stage YAML pipeline. Pull-request validation is switched on with a branch policy in Azure Repos; Test
        deploys automatically, and an approval on the Azure Pipelines <em>environment</em> makes Prod wait for a person.
      </p>
      <Code title="azure-pipelines.yml (simplified)">{`trigger:
  branches: { include: [main] }   # PR validation: set as a branch policy on main

stages:
- stage: Validate
  jobs:
  - job: checks
    steps:
    - script: pip install fabric-cicd pytest && pytest tests/

- stage: Test
  dependsOn: Validate
  condition: and(succeeded(), eq(variables['Build.SourceBranch'], 'refs/heads/main'))
  jobs:
  - deployment: deploy
    environment: fabric-test
    strategy:
      runOnce:
        deploy:
          steps:
          - checkout: self
          - script: pip install fabric-cicd && python deploy.py TEST

- stage: Prod
  dependsOn: Test
  jobs:
  - deployment: deploy
    environment: fabric-prod   # approval + business-hours check
    strategy:
      runOnce:
        deploy:
          steps:
          - checkout: self
          - script: pip install fabric-cicd && python deploy.py PROD`}</Code>
      <p className="mt-2 text-xs text-slate-500">
        Each deploy step signs in as the service principal — for example through an Azure service connection with the
        Azure CLI task — and the service principal needs Contributor (or higher) on the target workspace.
      </p>

      <h3 className="mt-8 text-lg font-semibold text-slate-900">The no-code alternative: deployment pipelines</h3>
      <p className="mt-3 text-slate-600">
        Fabric also has built-in <strong className="font-semibold text-slate-900">deployment pipelines</strong>: Git
        updates the Dev workspace, and items are then promoted Dev → Test → Prod inside Fabric, with deployment rules
        that swap data sources per stage. They&apos;re quicker to start with; fabric-cicd gives more control and keeps
        every environment driven from Git.
      </p>
      <DocsFigure
        src={deploymentPipelines}
        alt="Deployment-pipeline flow: feature workspaces sync with feature branches, main updates the dev workspace, and Fabric deployment pipelines promote items from dev to test to prod, triggered from Azure Pipelines"
        caption="Git keeps the Dev workspace current; Fabric deployment pipelines carry items on to Test and Prod."
        sourceLabel="Microsoft Learn — Choose the best Fabric CI/CD workflow option"
        sourceUrl={MANAGE_DEPLOYMENT_URL}
      />

      <h3 className="mt-8 text-lg font-semibold text-slate-900">Monitoring</h3>
      <p className="mt-3 text-slate-600">
        Once something is deployed, the same tenant surfaces how it&apos;s running. The{" "}
        <strong className="font-semibold text-slate-900">Monitoring hub</strong> lists every pipeline, dataflow, and
        notebook run across the tenant — status, duration, and who triggered it — in one place instead of per item.
        For capacity problems rather than a single run, the{" "}
        <strong className="font-semibold text-slate-900">Fabric Capacity Metrics app</strong> shows CU usage and
        throttling per capacity over time, which is usually where an "everything feels slow" complaint gets
        diagnosed. And for one specific slow job, a notebook or pipeline run&apos;s own{" "}
        <strong className="font-semibold text-slate-900">Spark run details</strong> break down stage timings and data
        read and written.
      </p>
      <ul className="mt-3 space-y-1.5 text-slate-600">
        <li className="flex gap-2">
          <span className="text-indigo-500">•</span>
          <span>
            <strong className="font-semibold text-slate-900">Monitoring hub</strong> — every pipeline, dataflow, and
            notebook run across the tenant, with status and duration
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-indigo-500">•</span>
          <span>
            <strong className="font-semibold text-slate-900">Fabric Capacity Metrics app</strong> — CU usage and
            throttling per capacity, for diagnosing tenant-wide slowness
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-indigo-500">•</span>
          <span>
            <strong className="font-semibold text-slate-900">Spark run details</strong> — stage-by-stage timings for
            one notebook or pipeline run, for diagnosing a single slow job
          </span>
        </li>
      </ul>
      <p className="mt-4 text-slate-600">
        <strong className="font-semibold text-slate-900">Rule of thumb:</strong> start at the Monitoring hub for "did
        it run and when," move to Capacity Metrics when everything is slow at once, and drop into Spark run details
        when one job in particular is slow.
      </p>

      <h3 className="mt-8 text-lg font-semibold text-slate-900">Guardrails that make it safe</h3>
      <Guardrails
        items={[
          ["Main is protected", "No direct pushes; every change arrives through a reviewed pull request with a passing build."],
          ["Hands off past Dev", "People get Viewer on Test and Prod; only the service principal deploys there. No editing items live."],
          ["Same artifact everywhere", "The commit that passed Test is the one that reaches Prod — environments differ only by parameter values."],
          ["Data stays in its lane", "Each environment has its own workspace and lakehouse, so a Test run can never write to Prod data."],
          ["Secrets out of the repo", "Credentials come from Azure Key Vault and pipeline variable groups, never from notebooks or Git."],
        ]}
      />
    </div>
  );
}
