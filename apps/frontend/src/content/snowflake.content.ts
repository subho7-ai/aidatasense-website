import type { PlatformContent } from "@aidatasense/shared";
import snowflakeArchitectureOverview from "../assets/snowflake-architecture-overview.png";
import snowflakeHierarchy from "../assets/snowflake-hierarchy.png";

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
      body: "",
      diagram: {
        title: "Snowflake's Official Architecture Overview",
        description:
          "Cloud Services, Compute (Virtual Warehouses), and Database Storage supporting structured, semi-structured, and unstructured data.",
        url: "https://docs.snowflake.com/en/user-guide/intro-key-concepts",
        imageUrl: snowflakeArchitectureOverview,
      },
      diagramBrief:
        "Snowflake's architecture splits into three independently scalable layers. The storage layer holds all data in a compressed, columnar format managed entirely by Snowflake, with a single copy shared across every workload. The compute layer consists of virtual warehouses — independent clusters that resize or suspend in seconds — so multiple teams can query the same data without competing for resources. Above both sits the cloud services layer, handling authentication, query optimization, and metadata management, which is what gives the platform its \"no tuning required\" feel.",
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
  useCases: [
    {
      title: "Multi-Source Ingestion: Batch SFTP + Real-Time Kinesis Streaming",
      body: [
        "A client needs the same downstream tables fed from two very different sources, both within a 30-minute SLA from the moment data is received. Batch files arrive over SFTP twice a day, each under 1 GB compressed; a Kinesis stream delivers the same JSON-formatted records in near real time. Both need to land in the same final, transformed Snowflake tables through one consistent pipeline, not two parallel one-off builds.",
        "For the SFTP path, an intermediary service (such as AWS Transfer Family) lands each incoming file into a cloud storage stage. Snowpipe's auto-ingest picks files up the moment they arrive — no polling schedule, no manual COPY INTO — and loads them into a raw landing table. For the Kinesis stream, Snowpipe Streaming writes records directly into an equivalent raw table within seconds of being published, skipping the file-staging step entirely.",
        "Because both sources deliver the same JSON structure, both raw tables feed one shared Stream-and-Task (or Dynamic Table) transformation pipeline. The business logic that shapes the final tables — parsing, validation, deduplication, merges — is written once and applied identically regardless of which path the data took. With Snowpipe's typical sub-minute file-ingestion latency, near-instant streaming ingestion, and a Task cadence of a few minutes, the 30-minute SLA has comfortable margin on both paths under normal conditions.",
      ],
      bulletsHeading: "Key considerations to validate in testing and production",
      bullets: [
        "Idempotency and deduplication — SFTP files can be re-delivered and Kinesis guarantees at-least-once delivery, so the merge logic needs to be tested against replayed and duplicate records, not just the happy path.",
        "Snowpipe and streaming failure visibility — a stalled pipe, a failed cloud storage event notification, or a paused streaming channel can silently stop new data from landing; needs active monitoring (e.g. SYSTEM$PIPE_STATUS) and alerting, not just an assumption that ingestion is always running.",
        "SFTP-to-stage dependency — the intermediary service that moves files from SFTP into cloud storage is outside Snowflake entirely; its own reliability, file-naming consistency, and handling of partial or interrupted transfers all need to be verified independently.",
        "Kinesis backpressure — a burst of records beyond normal volume could outrun the streaming client's throughput or trigger Snowflake-side throttling, risking the 30-minute SLA specifically during traffic spikes rather than steady-state load.",
        "Schema drift — VARIANT columns absorb structural changes at ingestion without erroring, but the transformation logic downstream can break silently if an expected field disappears or changes type, so schema validation and alerting need to sit in the pipeline, not just at load time.",
        "Stream staleness — a Stream that isn't consumed within its retention window goes stale and needs to be recreated, which would create a silent gap in the transformed data if a Task fails repeatedly without being noticed.",
        "End-to-end SLA monitoring — the 30-minute clock starts at \"data received,\" not \"file landed in Snowflake,\" so verifying the SLA in production requires timestamps captured at the true point of receipt, not just component-level ingestion metrics that look fast in isolation.",
      ],
    },
  ],
  deepDiveSections: [
    {
      heading: "Object Hierarchy",
      body: "Every Snowflake organization contains one or more accounts. Each account organizes data through a Database (Schema → Table, View, Materialized View, Stored Procedure, Function) and Warehouses for compute, with a separate Access & Sharing layer covering Users/Roles and cross-account Shares.",
      imageUrl: snowflakeHierarchy,
      imageSideBySide: true,
    },
    {
      heading: "Materialized Views",
      body: "When querying frequently-accessed data, materialized views are typically the best choice for performance on both Databricks and Snowflake — they pre-compute and store query results, refreshing automatically as underlying data changes, so repeated queries don't have to reprocess raw data every time.",
    },
    {
      heading: "Data Skew vs. Time Skew",
      body: "Data skew happens when data is unevenly distributed across partitions — some partitions end up with far more data than others, often caused by low-cardinality join keys, null-heavy columns, or a few \"celebrity\" values dominating a dataset. Time skew is the resulting performance symptom: certain tasks take substantially longer to finish than others, either because of that underlying data skew or because of uneven computational complexity between tasks. Since a Spark stage only completes when its slowest task finishes, a handful of skewed tasks can stall an entire job — engineers detect this by watching for tasks running 5-10x longer than the median, or a stage stuck at 99% completion. Fixes include enabling Adaptive Query Execution (AQE) to auto-split skewed partitions, salting skewed join keys, handling nulls explicitly, and pre-aggregating data before joins.",
    },
  ],
  learnMoreUrl: "https://docs.snowflake.com/",
};
