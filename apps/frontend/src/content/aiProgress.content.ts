import type { AiProgressContent } from "@aidatasense/shared";
import agenticAiLogo from "../assets/agentic-ai-logo.png";

export const aiProgressContent: AiProgressContent = {
  slug: "ai-progress",
  name: "Agentic AI & Model Platforms",
  logoUrl: agenticAiLogo,
  tagline: "The frontier of agentic AI",
  heroSummary:
    "Agentic AI systems can plan, reason, and take action across tools and data sources — every major cloud now offers a platform for building them, from Vertex AI to Azure AI Foundry to AWS Bedrock.",
  architectureBullets: [
    "Google Vertex AI Agent Builder for building and deploying grounded, tool-using AI agents",
    "Microsoft Azure AI Foundry's agent service for orchestrating multi-agent workflows in the enterprise",
    "AWS Bedrock Agents for connecting foundation models to APIs, data, and multi-step tasks",
  ],
  sections: [
    {
      heading: "What Is Agentic AI",
      body: "Agentic AI systems extend a foundation model with capabilities beyond simple prompt-response: planning (breaking a goal into an ordered sequence of steps), tool use (calling external APIs, databases, or functions to gather information or take action), memory (retaining context across steps or sessions), and multi-step execution with self-correction (evaluating each action's outcome and revising the plan when something fails). This plan–act–observe–revise loop is what separates an \"agent\" from a standard chatbot, and it's the pattern every major agent-building platform is designed around.",
    },
    {
      heading: "Platform Comparison",
      body: "Google's Vertex AI Agent Builder is built around Gemini models and emphasizes grounding — connecting agents to Google Search, enterprise data via Vertex AI Search, and custom tools through function calling. Microsoft's Azure AI Foundry Agent Service supports OpenAI and open-weight models from its catalog, and focuses on multi-agent orchestration through Semantic Kernel and AutoGen, with deep ties into Microsoft 365 and Azure AD. AWS Bedrock Agents is model-agnostic across Bedrock's foundation models (Anthropic Claude, Meta Llama, Amazon Nova, and others), orchestrating tool use through action groups backed by AWS Lambda — a natural fit for teams already on AWS.",
    },
  ],
  learnMoreUrl: "https://cloud.google.com/vertex-ai",
  articles: [
    {
      title: "Google Consolidates Vertex AI Into the Gemini Enterprise Agent Platform",
      source: "Vertex AI",
      url: "https://cloud.google.com/blog/products/ai-machine-learning/more-ways-to-build-and-scale-ai-agents-with-vertex-ai-agent-builder",
      summary:
        "Google has folded Vertex AI Agent Builder and Agentspace into a unified Gemini Enterprise Agent Platform, adding a low-code Agent Designer plus agent-level tracing and evaluation tools for debugging production agents.",
      publishedDate: "2026-02-01",
    },
    {
      title: "Microsoft Foundry Adds Agent Framework and Foundry IQ at Build 2026",
      source: "Azure AI Foundry",
      url: "https://devblogs.microsoft.com/foundry/agent-service-build2026/",
      summary:
        "At Build 2026, Microsoft shipped the Agent Framework — unifying Semantic Kernel and AutoGen into one orchestration layer — alongside Foundry IQ, a managed retrieval layer, and native publishing of Foundry agents directly into Teams and Microsoft 365 Copilot.",
      publishedDate: "2026-05-01",
    },
    {
      title: "Amazon Bedrock AgentCore Adds Web Search and a No-Code Managed Harness",
      source: "AWS Bedrock",
      url: "https://aws.amazon.com/blogs/aws/announcing-web-search-on-amazon-bedrock-agentcore-ground-your-ai-agents-in-current-accurate-web-knowledge/",
      summary:
        "AWS introduced Web Search on Bedrock AgentCore for grounding agents in live, cited web results, plus a managed harness that runs a full agent loop — reasoning, tool selection, execution — from just a model, prompt, and tool list, with no orchestration code required.",
      publishedDate: "2026-04-01",
    },
  ],
};
