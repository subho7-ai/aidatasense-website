import type { PlatformContent } from "@aidatasense/shared";

export const snowflakeContent: PlatformContent = {
  slug: "snowflake",
  name: "Snowflake",
  logoUrl: "https://cdn.simpleicons.org/snowflake",
  tagline: "The AI Data Cloud",
  heroSummary:
    "Snowflake is a cloud-native data platform built on a multi-cluster shared architecture that separates storage and compute, so teams can scale each independently.",
  architectureBullets: [
    "Multiple workloads run concurrently without contention, thanks to the multi-cluster shared architecture",
    "Storage and compute scale independently — pay only for the compute you actually use",
    "Native support for structured and semi-structured data, with built-in AI/ML via Snowflake Cortex",
  ],
  sections: [
    {
      heading: "Architecture Overview",
      body: "Snowflake's architecture splits into three independently scalable layers. The storage layer holds all data in a compressed, columnar format managed entirely by Snowflake, with a single copy shared across every workload. The compute layer consists of virtual warehouses — independent clusters that resize or suspend in seconds — so multiple teams can query the same data without competing for resources. Above both sits the cloud services layer, handling authentication, query optimization, and metadata management, which is what gives the platform its \"no tuning required\" feel.",
    },
    {
      heading: "Key Technical Specs",
      body: "Snowflake supports secure data sharing through Snowgrid, letting organizations share live, governed data across accounts, regions, or clouds without copying it. It natively handles structured data as well as semi-structured formats like JSON, Avro, ORC, Parquet, and XML, queryable directly via the VARIANT type. Snowpark extends the platform with a developer framework for writing pipelines and ML workflows in Python, Java, or Scala that execute inside Snowflake's own compute layer, without moving data to an external engine.",
    },
  ],
  aiSections: [
    {
      heading: "What Is a Gateway?",
      body: [
        "In cloud and API architecture, a gateway is a common, well-established pattern — a single entry point that receives requests, applies policies, and routes traffic to the right backend service. Tools like Apigee (API management) or HL7 gateways (healthcare data integration) are classic examples: they're built to route, authenticate, and manage traffic between systems.",
        "But a traditional gateway isn't built for AI. It can route a request and check a login — but it can't count tokens, manage streaming responses, track which AI model answered a question, or enforce spending limits on an LLM call. AI workloads need something purpose-built: an AI Gateway — a control layer designed specifically to govern models, agents, and AI tool usage, not just generic network traffic.",
      ],
    },
    {
      heading: "Snowflake: Cortex + Cortex AI Gateway",
      body: [
        "Snowflake takes the same layered approach. Cortex is Snowflake's suite of built-in AI capabilities, letting teams build and run AI directly on their data. And just like Databricks, Snowflake has its own equivalent control plane: Cortex AI Gateway, a centralized layer that governs how AI agents access models, tools, and enterprise data — tracking cost, enforcing security policies, and auditing every AI interaction, regardless of which agent or platform it came from.",
        "The takeaway: both platforms recognized the same gap — a normal API gateway isn't enough for AI — and built a dedicated governance layer to close it.",
      ],
    },
  ],
  learnMoreUrl: "https://docs.snowflake.com/",
};
