import type { AiProgressContent } from "@aidatasense/shared";

export const aiProgressContent: AiProgressContent = {
  slug: "ai-progress",
  name: "Agentic AI & Model Platforms",
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
      title: "[Placeholder] Vertex AI progress article title",
      source: "Vertex AI",
      url: "https://cloud.google.com/vertex-ai",
      summary: "[Placeholder] Replace with a real article summary.",
      publishedDate: "2026-01-01",
    },
    {
      title: "[Placeholder] Azure AI Foundry progress article title",
      source: "Azure AI Foundry",
      url: "https://azure.microsoft.com/en-us/products/ai-foundry",
      summary: "[Placeholder] Replace with a real article summary.",
      publishedDate: "2026-01-01",
    },
    {
      title: "[Placeholder] AWS Bedrock progress article title",
      source: "AWS Bedrock",
      url: "https://aws.amazon.com/bedrock/",
      summary: "[Placeholder] Replace with a real article summary.",
      publishedDate: "2026-01-01",
    },
  ],
};
