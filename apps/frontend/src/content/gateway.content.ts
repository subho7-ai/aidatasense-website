import type { PlatformContent } from "@aidatasense/shared";
import gatewayIcon from "../assets/gateway-icon.svg";

export const gatewayContent: PlatformContent = {
  slug: "gateway",
  name: "Gateway",
  logoUrl: gatewayIcon,
  tagline: "The AI Control Plane",
  heroSummary:
    "Every major data platform converged on the same idea independently: AI needs its own gateway. A normal API gateway routes requests — an AI gateway governs cost, security, and access across every model, agent, and tool an organization uses.",
  architectureBullets: [
    "One control plane for every model and agent — instead of one-off integrations per team, per tool",
    "Cost and usage tracked centrally, so a runaway agent or an expensive model call doesn't go unnoticed",
    "Every AI interaction is audited — which agent called which model, on which data, and why",
  ],
  keepOverviewSectionsTogether: true,
  architectureExtraSections: [
    {
      heading: "AI Gateway Architecture Diagram",
      customBlock: "gateway-architecture-diagram",
      body: "",
    },
    {
      heading: "Vendor Comparison",
      body: "",
      comparisonTable: {
        title: "Databricks vs. Snowflake vs. Azure API Management",
        headers: ["", "Databricks (Unity AI Gateway)", "Snowflake (Cortex AI Gateway)", "Azure API Management"],
        rows: [
          ["Where it runs", "Built into the workspace, as part of Unity Catalog", "Built into the account — one gateway object, provisioned automatically", "A separate Azure resource (an APIM instance) placed in front of model endpoints"],
          ["What it governs", "Model services, external model providers, MCP servers, and agents", "Model inference calls from any client that can reach its endpoint", "Any OpenAI-, Anthropic-, or Vertex AI-compatible API, plus MCP servers and A2A agent APIs"],
          ["How limits are enforced", "Rate limits, budgets, and per-user quotas on model services", "Budgets and per-user quotas on gateway spend", "llm-token-limit — tokens-per-minute or a token quota, per subscription key or a custom counter"],
          ["Guardrails / content safety", "Sensitive Data Detection guardrail (Beta) — blocks or redacts PII in requests and responses", "Enforced through Cortex's existing governance and masking policies", "Azure AI Content Safety moderation policy on prompts and completions"],
          ["Logging / audit", "Unified trace table (Beta) — every request and response, in OpenTelemetry format", "Traces and spans for every request — models called, step timing, token counts, errors", "Prompts and completions logged to Azure Monitor, with a built-in analytics dashboard"],
          ["Supported model providers", "Databricks-hosted models, plus external providers (OpenAI, Anthropic, Amazon Bedrock) registered as governed securables", "Any model reachable through an OpenAI- or Anthropic-compatible base URL", "Azure OpenAI / Microsoft Foundry, Anthropic, Google Vertex AI, Amazon Bedrock, and self-hosted endpoints"],
        ],
      },
    },
    {
      heading: "Gateway Capabilities",
      body: "",
      bullets: [
        "Token limits — cap consumption per key, user, or app as a rate (tokens per minute) or a quota over a period",
        "Token metrics — emit per-request token counts as custom metrics, with dimensions to filter by caller",
        "Semantic caching — reuse a cached response for a new prompt that's semantically close to a prior one",
        "Load balancing and circuit breakers — distribute requests across model backends and stop sending to one that's failing",
        "Content safety — moderate prompts and completions before they reach a model or a caller",
        "Prompt/response logging — capture full request and response bodies for audit and troubleshooting",
      ],
    },
    {
      heading: "Illustrative APIM Policy",
      body: "A policy file combining three AI gateway capabilities on one API: a token limit, a token metric emitted to Application Insights, and a semantic cache lookup before the request reaches the backend.",
      code: {
        title: "policy.xml · token limit, token metrics, semantic cache (illustrative)",
        content: `<policies>
  <inbound>
    <llm-token-limit counter-key="@(context.Subscription.Id)"
        tokens-per-minute="500" estimate-prompt-tokens="false"
        remaining-tokens-variable-name="remainingTokens" />
    <llm-semantic-cache-lookup score-threshold="0.05"
        embeddings-backend-id="embeddings-backend" />
    <llm-emit-token-metric namespace="llm-metrics">
      <dimension name="API ID" value="@(context.Api.Id)" />
      <dimension name="Subscription" value="@(context.Subscription.Id)" />
    </llm-emit-token-metric>
  </inbound>
  <outbound>
    <llm-semantic-cache-store duration="300" />
  </outbound>
</policies>`,
      },
    },
  ],
  sections: [
    {
      heading: "Gateway at a Glance",
      customBlock: "gateway-overview",
      body: "",
    },
    {
      heading: "Why a Normal API Gateway Isn't Enough",
      body: [
        "A traditional API gateway routes requests, enforces rate limits, and checks auth tokens — all things AI traffic also needs. But AI workloads add problems a normal gateway was never built for: which model actually answered a given prompt, how much a single agent's token usage cost this month, whether an agent was allowed to touch a particular table before it queried it, and whether a chain of tool calls can be reconstructed after the fact.",
        "That gap is why every major data platform has now shipped a dedicated AI gateway sitting in front of models and agents, rather than trying to stretch an existing API gateway to cover it.",
      ],
    },
    {
      heading: "Architecture: Three Vendors, One Pattern",
      body: "The implementations differ, but the shape is identical everywhere it shows up: a single governed layer between every AI agent or tool and the models/data it's allowed to touch.",
      bullets: [
        "Databricks — Unity AI Gateway sits in front of every model endpoint, governed by the same Unity Catalog permissions that already control table access, so a Genie agent's data access and model access are policed by one system, not two.",
        "Snowflake — Cortex AI Gateway governs how agents built on Cortex reach models, tools, and enterprise data, tracking cost and auditing every AI interaction regardless of which agent or platform it originated from.",
        "Microsoft — Azure API Management's AI gateway capabilities sit in front of Azure OpenAI and Microsoft Foundry model deployments, enforcing token limits, content safety, and centralized logging across every app, agent, or Copilot that calls a model — including Fabric's Copilot and data agents, which consume governed models through the same kind of policy layer.",
      ],
    },
  ],
  devOpsNavHeading: "Gateway Policies as Code",
  aiNavHeading: "What Gets Governed That a Normal Gateway Misses",
  aiSections: [
    {
      heading: "Gateway Policies as Code",
      customBlock: "gateway-devops",
      body: "",
    },
    {
      heading: "What Gets Governed That a Normal Gateway Misses",
      body: [
        "AI traffic needs to be metered and audited differently than ordinary API traffic. A request/response pair isn't the unit that matters — token counts are, since that's what usage actually costs. The identity that matters isn't just \"which user is logged in\" but \"which agent, acting on whose behalf, called which model, using which tools, on which data\" — a chain that a normal API gateway has no concept of.",
        "That's why every platform's AI gateway sits as its own layer rather than being bolted onto the existing API gateway: it has to understand tokens, models, agents, and tool calls as first-class things to govern, not just routes and rate limits.",
      ],
    },
    {
      heading: "The Bigger Picture: The LLM Mesh",
      body: [
        "This pattern isn't unique to any one vendor. In \"The LLM Mesh\" (O'Reilly, 2026), author Kurt Muehmel describes it as an industry-wide architecture: a unified gateway that governs every AI agent, tool, and model in an organization — enforcing security, tracking cost, and providing central discovery, all through one abstraction layer instead of scattered, one-off integrations. Databricks' Unity AI Gateway and Snowflake's Cortex AI Gateway are both real-world implementations of this same idea.",
      ],
    },
  ],
  useCases: [
    {
      title: "Governing a Multi-Agent Deployment Across Platforms",
      body: [
        "An organization running Databricks, Snowflake, and Fabric side by side ends up with agents on all three — a Genie agent answering questions over Unity Catalog tables, a Cortex Analyst agent over Snowflake data, and Copilot queries inside Power BI reports. Without a consistent governance layer, each of those is a separate, one-off integration to secure, monitor, and audit.",
        "Because each platform now ships its own AI gateway, the organization doesn't have to build a custom governance layer per platform. It configures access policy once per platform, using the same catalog/permissions model that already governs plain data access, and gets cost tracking and audit logging for AI traffic the same way it already gets them for query traffic.",
      ],
      bulletsHeading: "What to check before trusting it in production",
      bullets: [
        "Policy parity — access rules enforced by the AI gateway need to be verified against the equivalent data-layer permissions, not assumed to match automatically.",
        "Cost attribution — usage needs to be traceable back to the specific agent or user that triggered it, not just aggregated at the workspace level.",
        "Cross-platform consistency — three separate gateways means three separate places policy can drift out of sync unless it's reviewed together, not per platform in isolation.",
      ],
    },
  ],
  deepDiveSections: [
    {
      heading: "Token-Level Metering",
      body: "Unlike a normal API gateway, which typically meters by request count, an AI gateway meters by token — input tokens and output tokens are priced differently and vary by model, so \"how much did this call cost\" can't be answered without knowing the model, the token counts, and the current rate card at the same time. That's why cost tracking lives in the AI gateway itself rather than in generic API analytics.",
    },
    {
      heading: "Agent Identity vs. User Identity",
      body: "An AI gateway has to track two identities per call, not one: the human or process that ultimately requested the action, and the agent or service identity making the actual model/tool call on their behalf. Losing that distinction in the audit log makes it impossible to answer \"who is actually responsible for this,\" which is exactly the question compliance and security teams ask first after an incident.",
    },
    {
      heading: "Enforcement Point: Proxy vs. SDK",
      body: "AI gateways are generally implemented one of two ways: as a network proxy that every model call is routed through (centralized, but requires all traffic to actually go through it), or as an SDK-level interceptor embedded in the calling code (harder to bypass accidentally, but requires every language/framework in use to have a supported SDK). Which approach a given vendor uses under the hood matters less than the guarantee it produces: governance that's enforced centrally, not opt-in per client.",
    },
  ],
  learnMoreUrl: "https://docs.databricks.com/",
};
