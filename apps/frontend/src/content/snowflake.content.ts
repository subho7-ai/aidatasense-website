import type { PlatformContent } from "@aidatasense/shared";
import snowflakeArchitectureOverview from "../assets/snowflake-architecture-overview.png";

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
      diagram: {
        title: "Snowflake's Official Architecture Overview",
        description:
          "Cloud Services, Compute (Virtual Warehouses), and Database Storage supporting structured, semi-structured, and unstructured data.",
        url: "https://docs.snowflake.com/en/user-guide/intro-key-concepts",
        imageUrl: snowflakeArchitectureOverview,
      },
      diagramAttribution: {
        label: "Source: Snowflake Documentation",
        url: "https://docs.snowflake.com/en/user-guide/intro-key-concepts",
      },
    },
    {
      heading: "Key Technical Specs",
      body: "Snowflake supports secure data sharing through Snowgrid, letting organizations share live, governed data across accounts, regions, or clouds without copying it. It natively handles structured data as well as semi-structured formats like JSON, Avro, ORC, Parquet, and XML, queryable directly via the VARIANT type. Snowpark extends the platform with a developer framework for writing pipelines and ML workflows in Python, Java, or Scala that execute inside Snowflake's own compute layer, without moving data to an external engine.",
    },
  ],
  aiSections: [
    {
      heading: "What Is a Gateway?",
      body: "A gateway is a common cloud/API pattern — but traditional gateways aren't built for AI.",
      internalLink: {
        label: "Read the full explanation on the Databricks page →",
        to: "/platforms/databricks#ai",
      },
    },
    {
      heading: "Snowflake: Cortex + Cortex AI Gateway",
      body: [
        "Snowflake takes the same layered approach. Cortex is Snowflake's suite of built-in AI capabilities, letting teams build and run AI directly on their data. And just like Databricks, Snowflake has its own equivalent control plane: Cortex AI Gateway, a centralized layer that governs how AI agents access models, tools, and enterprise data — tracking cost, enforcing security policies, and auditing every AI interaction, regardless of which agent or platform it came from.",
        "The takeaway: both platforms recognized the same gap — a normal API gateway isn't enough for AI — and built a dedicated governance layer to close it.",
      ],
    },
    {
      heading: "The Bigger Picture: The LLM Mesh",
      body: [
        "This pattern isn't unique to any one vendor. In \"The LLM Mesh\" (O'Reilly, 2026), author Kurt Muehmel describes it as an industry-wide architecture: a unified gateway that governs every AI agent, tool, and model in an organization — enforcing security, tracking cost, and providing central discovery, all through one abstraction layer instead of scattered, one-off integrations. Databricks' Unity AI Gateway and Snowflake's Cortex AI Gateway are both real-world implementations of this same idea.",
      ],
    },
  ],
  learnMoreUrl: "https://docs.snowflake.com/",
};
