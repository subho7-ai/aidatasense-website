import gatewayIcon from "../assets/gateway-icon.svg";
import { Code, Guardrails, PipelineFlow, type PipelineFlowConfig, Toolchain, type Tool } from "./cicdFlow";

const FLOW: PipelineFlowConfig = {
  platform: "Azure API Management",
  platformLogo: gatewayIcon,
  platformColor: "#7C3AED",
  platformLaneFill: "#f5f3ff",
  devSubs: ["Feature branch", "against a dev APIM instance", "policy XML + Bicep"],
  envNoun: "instance",
  containerNoun: "APIM instance",
  containers: ["apim-dev", "apim-test", "apim-prod"],
  identity: "service principal",
  identityShort: "SP",
  whatChanges: "target APIM instance",
  ariaLabel:
    "CI/CD flow: a developer branches out to edit policy files against a dev APIM instance and commits to Git; a pull request runs validation; merging to main deploys the policy to the Test APIM instance with Bicep or Terraform; after approval the same artifact deploys to the Prod APIM instance as a service principal",
  hasWalkthroughBelow: false,
  featureBranchName: "feature/token-limit-update",
  prodNote: "Deployed by SP",
};

const TOOLCHAIN: Tool[] = [
  { name: "Git repository", role: "Policy XML, Bicep/Terraform (or APIOps config), and per-environment parameter files", icon: "branch", color: "text-slate-700" },
  { name: "Bicep / Terraform / APIOps", role: "Deploys APIs, products, and policy files from the repo to an APIM instance", icon: "code", color: "text-violet-700" },
  { name: "Azure Pipelines (or equivalent)", role: "Runs validation and calls the deploy tool for each environment", icon: "pipeline", color: "text-[#0078D4]" },
  { name: "Service principal", role: "The Entra ID identity that deploys to Test and Prod APIM instances", icon: "key", color: "text-amber-600" },
];

export function GatewayDevOpsFlow() {
  return (
    <div className="border-t border-slate-200 py-8">
      <h2 className="text-2xl font-semibold text-slate-900">Gateway Policies as Code</h2>
      <p className="mt-3 text-slate-600">
        Gateway policies are config, not clicks: policy XML, API definitions, and product settings live in{" "}
        <strong className="font-semibold text-slate-900">Git</strong>, and a pipeline deploys the same artifact
        through Dev, Test, and Prod with <strong className="font-semibold text-slate-900">Bicep</strong>,{" "}
        <strong className="font-semibold text-slate-900">Terraform</strong>, or{" "}
        <strong className="font-semibold text-slate-900">APIOps</strong> — the same shape as any other platform's
        CI/CD, just deploying policy instead of notebooks or pipelines.
      </p>

      <PipelineFlow config={FLOW} />

      <h3 className="mt-8 text-lg font-semibold text-slate-900">The toolchain</h3>
      <Toolchain tools={TOOLCHAIN} />

      <Code title="main.bicep · deploy a policy file from source control (illustrative)">{`resource ordersApiPolicy 'Microsoft.ApiManagement/service/apis/policies@2024-05-01' = {
  name: 'policy'
  parent: ordersApi
  properties: {
    format: 'rawxml'
    value: loadTextContent('policies/llm-token-limit.xml')
  }
}`}</Code>

      <h3 className="mt-8 text-lg font-semibold text-slate-900">Guardrails that make it safe</h3>
      <Guardrails
        items={[
          ["Main is protected", "No direct pushes; every policy change arrives through a reviewed pull request."],
          ["Same artifact everywhere", "The policy XML that passed Test is the one deployed to Prod — only parameter values differ per environment."],
          ["Secrets out of the repo", "Backend credentials and API keys come from Key Vault, never hardcoded in policy XML."],
        ]}
      />
    </div>
  );
}
