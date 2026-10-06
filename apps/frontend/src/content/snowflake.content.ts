import type { PlatformContent } from "@aidatasense/shared";
import snowflakeArchitectureOverview from "../assets/snowflake-architecture-overview.png";
import snowflakeCdpLifecycle from "../assets/snowflake-docs-cdp-lifecycle.png";
import snowflakeDataSharing from "../assets/snowflake-docs-data-sharing-overview.png";
import snowflakeMlOverview from "../assets/snowflake-docs-ml-overview.png";
import snowflakeMicroPartitions from "../assets/snowflake-docs-tables-clustered1.png";

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
  architectureDiagram: {
    summaryBullets: [
      "Sources — files, SaaS apps, operational databases, and event streams produce the raw data.",
      "Ingest — Snowpipe auto-ingests files from cloud storage, Snowpipe Streaming and the Kafka connector land rows within seconds, and connectors pull from databases and SaaS apps.",
      "Transform — dynamic tables, streams and tasks, Snowpark, and dbt clean and reshape data inside Snowflake, with no separate processing engine.",
      "Store — one copy of every table in Snowflake-managed storage, or as Apache Iceberg tables in your own bucket.",
      "Serve — virtual warehouses power BI, apps, and APIs, and Secure Data Sharing delivers live data to other accounts.",
      "Govern — Snowflake Horizon applies roles, masking and row access policies, tags, and lineage across every stage.",
    ],
    accordion: {
      heading: "ETL Breakdown",
      items: [
        {
          title: "Extract",
          body: "Getting data in: COPY INTO for bulk loads, Snowpipe for continuous file ingestion from a stage, Snowpipe Streaming and the Kafka connector for low-latency rows, and connectors that replicate from databases and SaaS applications.",
        },
        {
          title: "Transform",
          body: "Shaping data inside Snowflake: dynamic tables that refresh to a target lag, streams and tasks for change-driven steps, Snowpark for Python, Java, or Scala logic, and dbt for SQL models — all running on Snowflake compute.",
        },
        {
          title: "Load",
          body: "Delivering curated data: gold tables and secure views queried by BI tools through virtual warehouses, Streamlit apps, Secure Data Sharing to other accounts, and unloads to cloud storage for systems that need files.",
        },
      ],
    },
  },
  architectureExtraSections: [
    {
      heading: "Integrations",
      body: "Snowflake connects with a broad ecosystem of technology partners — from ingestion tools like Fivetran, to BI platforms like Tableau and Power BI, to governance tools like Collibra and Alation. Partner Connect sets up trial integrations in a few clicks, and native drivers and connectors cover everything else.",
      integrations: {
        categories: [
          { label: "Partner Connect", url: "https://docs.snowflake.com/en/user-guide/ecosystem-partner-connect" },
          { label: "Drivers", url: "https://docs.snowflake.com/en/developer-guide/drivers" },
          { label: "Kafka Connector", url: "https://docs.snowflake.com/en/user-guide/kafka-connector" },
          { label: "Spark Connector", url: "https://docs.snowflake.com/en/user-guide/spark-connector" },
          { label: "dbt Projects", url: "https://docs.snowflake.com/en/user-guide/data-engineering/dbt-projects-on-snowflake" },
          { label: "Snowpark", url: "https://docs.snowflake.com/en/developer-guide/snowpark/index" },
        ],
        viewAllUrl: "https://docs.snowflake.com/en/user-guide/ecosystem-all",
        callout: {
          title: "Power BI Integration",
          body: "Power BI connects to Snowflake with its built-in connector, in either import or DirectQuery mode, and supports single sign-on through Microsoft Entra ID — so report access follows the same identities as the data.",
        },
      },
    },
  ],
  references: [
    {
      title: "Snowflake Key Concepts and Architecture",
      description:
        "The official overview of Snowflake's three layers — cloud services, compute (virtual warehouses), and database storage for structured, semi-structured, and unstructured data.",
      url: "https://docs.snowflake.com/en/user-guide/intro-key-concepts",
      imageUrl: snowflakeArchitectureOverview,
    },
  ],
  sections: [
    {
      heading: "The Data Cloud",
      customBlock: "snowflake-pillars",
      body: "",
    },
    {
      heading: "Structured, Semi-Structured, and Unstructured Data",
      body: "Snowflake stores relational tables alongside semi-structured formats — JSON, Avro, ORC, Parquet, and XML — which load into a VARIANT column and can be queried directly with dot notation and FLATTEN, no upfront schema required. Unstructured files such as PDFs and images sit in stages and can be processed with Snowpark or Cortex AI functions.",
      bullets: [
        "VARIANT — holds any semi-structured value; Snowflake stores common paths in columnar form, so queries stay fast",
        "Schema on read — load first, decide the structure later, without breaking ingestion when a new field appears",
        "Unstructured data — files in stages, with directory tables to catalog them and secure URLs to share them",
      ],
    },
    {
      heading: "Apache Iceberg Tables",
      body: "Iceberg tables let Snowflake store data in the open Apache Iceberg format, in a bucket you own, through an external volume. Snowflake can manage the table and its catalog itself, or work with tables managed by an external catalog — so the same data can be read by Spark, Trino, or Flink without copying it out of Snowflake.",
      bullets: [
        "Open format — Parquet data files plus Iceberg metadata, readable by any Iceberg-compatible engine",
        "Your storage — data lives in your S3, Azure, or Google Cloud bucket rather than Snowflake-managed storage",
        "Same governance — Snowflake-managed Iceberg tables get roles, masking, and Time Travel like any other table",
      ],
      diagramAttribution: {
        label: "Learn more →",
        url: "https://docs.snowflake.com/en/user-guide/tables-iceberg",
      },
    },
    {
      heading: "Time Travel and Fail-safe",
      body: [
        "Every change to a permanent table is recoverable for a while. During the Time Travel window — 1 day by default, up to 90 days on Enterprise edition — you can query data as it was at a point in the past, clone it from that moment, or UNDROP a table you deleted. After Time Travel ends, Fail-safe keeps the data for 7 more days, recoverable only by Snowflake support as a last resort.",
        "This is also why staging tables are often transient: they skip Fail-safe and keep at most one day of Time Travel, so you don't pay to store history you'll never need.",
      ],
      imageUrl: snowflakeCdpLifecycle,
      imageZoomable: true,
      imageCaption: "Continuous Data Protection lifecycle",
      diagramAttribution: {
        label: "Source: Snowflake documentation — Understanding & using Time Travel",
        url: "https://docs.snowflake.com/en/user-guide/data-time-travel",
      },
    },
  ],
  devOpsNavHeading: "CI/CD for Data Engineers with Azure DevOps",
  aiNavHeading: "Snowflake: Cortex + Cortex AI Gateway",
  aiSections: [
    {
      heading: "Zero-Copy Cloning and Secure Data Sharing",
      body: [
        "Because Snowflake separates storage from compute, copying data doesn't have to mean duplicating it. A zero-copy clone of a table, schema, or whole database is created in seconds and shares the original's storage until either side changes — ideal for spinning up a test environment from production data.",
        "Secure Data Sharing takes the same idea across accounts: a provider shares live, read-only tables with consumer accounts, and consumers query them with their own compute. Nothing is copied or moved, access can be revoked at any time, and listings and the Marketplace extend sharing across regions and clouds.",
      ],
      imageUrl: snowflakeDataSharing,
      imageZoomable: true,
      imageCaption: "Providers share databases with consumer accounts — shared databases are read-only",
      diagramAttribution: {
        label: "Source: Snowflake documentation — About Secure Data Sharing",
        url: "https://docs.snowflake.com/en/user-guide/data-sharing-intro",
      },
    },
    {
      heading: "Micro-partitions and Clustering",
      body: [
        "Snowflake doesn't ask you to define partitions. Every table is automatically split into micro-partitions — contiguous units of 50 to 500 MB of uncompressed data, stored by column — and Snowflake records the range of values in each. Queries then skip every micro-partition that can't contain a match, a technique called pruning.",
        "Pruning works best when related rows sit together. Data loaded in date order is naturally clustered by date; for very large tables queried on other columns, a clustering key tells Snowflake to keep rows with similar values together, and automatic clustering maintains it in the background.",
      ],
      bullets: [
        "Micro-partitions — automatic, immutable, columnar, with min/max metadata per column",
        "Pruning — filters on well-clustered columns read a small fraction of the table",
        "Clustering keys — only for multi-terabyte tables whose filters don't match load order; maintenance costs credits",
        "Search optimization — a separate service for fast point lookups on high-cardinality columns",
      ],
      imageUrl: snowflakeMicroPartitions,
      imageZoomable: true,
      imageCaption: "A table's logical rows stored physically across micro-partitions",
      diagramAttribution: {
        label: "Source: Snowflake documentation — Micro-partitions & data clustering",
        url: "https://docs.snowflake.com/en/user-guide/tables-clustering-micropartitions",
      },
    },
    {
      heading: "CI/CD for Data Engineers with Azure DevOps",
      customBlock: "snowflake-devops",
      body: "",
    },
    {
      heading: "Snowflake: Cortex + Cortex AI Gateway",
      body: [
        "Cortex is Snowflake's suite of built-in AI capabilities — large language models, AI SQL functions, and agents — that let teams build and run AI directly on their governed data, without moving it to an outside service.",
        "As AI workloads grow, a traditional API gateway isn't enough: it can route a request and check a login, but it can't count tokens, track which model answered, or enforce spending limits on an LLM call. Cortex AI Gateway is Snowflake's centralized layer for this — governing how AI agents access models, tools, and enterprise data, tracking cost, enforcing security policies, and auditing every AI interaction.",
        "The takeaway: Databricks and Snowflake both recognized the same gap — a normal API gateway isn't enough for AI — and built a dedicated governance layer to close it.",
      ],
    },
    {
      heading: "Snowflake ML",
      body: [
        "Snowflake ML is Snowflake's integrated set of capabilities for end-to-end machine learning on top of governed data. Data scientists develop in Snowflake Notebooks or their own IDE, train on the Container Runtime with CPUs or GPUs and familiar libraries like PyTorch, XGBoost, and scikit-learn, and take models to production without moving data out of Snowflake.",
      ],
      bullets: [
        "Develop & iterate — Snowflake ML APIs and Experiments to record and compare training runs",
        "Orchestrate & automate — ML Jobs to run pipelines on the Container Runtime, from Snowflake or an external IDE",
        "Manage — the Feature Store for reusable features and the Model Registry for every model version",
        "Deploy & serve — Model Serving on Snowpark Container Services for inference at scale",
        "Monitor — ML Observability for drift and performance, with explainability and end-to-end ML Lineage",
      ],
      imageUrl: snowflakeMlOverview,
      imageZoomable: true,
      imageCaption: "Snowflake ML — from batch data, streams, and any model to apps, dashboards, and APIs",
      diagramAttribution: {
        label: "Source: Snowflake documentation — Snowflake ML overview",
        url: "https://docs.snowflake.com/en/developer-guide/snowflake-ml/overview",
      },
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
      summaryCard: true,
      body: "A client needs the same Snowflake tables fed from twice-daily SFTP batch files and a real-time Kinesis stream, both within a 30-minute SLA. Snowpipe auto-ingest and Snowpipe Streaming land each source, and one shared transformation pipeline applies the business logic once — with the testing and monitoring needed to keep the SLA in production.",
      internalLink: {
        label: "Read the full case study →",
        to: "/case-studies/snowflake-ingestion",
      },
    },
  ],
  videos: [
    {
      title: "Snowflake Native App Framework",
      youtubeId: "IrKgLGOsUsc",
      description: "Snowflake Developers on building and distributing apps that run inside Snowflake, next to the data.",
    },
  ],
  sidebarReferences: [
    {
      title: "Snowflake Data Cloud Architecture",
      description:
        "Snowflake's own overview of the Data Cloud and its four architectural layers: optimized storage, elastic compute, cloud services, and Snowgrid.",
      url: "https://www.snowflake.com/en/why-snowflake/what-is-data-cloud/data-cloud-architecture/",
    },
  ],
  learnMoreUrl: "https://docs.snowflake.com/",
};
