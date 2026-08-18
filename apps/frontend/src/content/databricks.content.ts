import type { PlatformContent } from "@aidatasense/shared";

export const databricksContent: PlatformContent = {
  slug: "databricks",
  name: "Databricks",
  logoUrl: "https://cdn.simpleicons.org/databricks",
  tagline: "The Lakehouse Platform",
  heroSummary:
    "Databricks unifies data warehousing and data lakes into a single lakehouse architecture, giving teams one platform for analytics, data engineering, and AI.",
  architectureBullets: [
    "Unified architecture that combines the reliability of a data warehouse with the scale and flexibility of a data lake",
    "Delta Lake provides an open, transactional storage layer for reliable, high-performance data pipelines",
    "Unity Catalog delivers centralized governance and fine-grained access control across all data and AI assets",
  ],
  architectureDiagram: {
    layers: [
      {
        title: "Control Plane",
        description:
          "The Databricks-managed backend — the web app, job scheduler, and cluster manager. Runs in Databricks' own account, not yours.",
      },
      {
        title: "Compute Plane",
        description:
          "Where your data actually gets processed — Spark clusters and SQL warehouses. Runs in your own cloud account (classic) or a Databricks-managed layer (serverless).",
      },
      {
        title: "Your Cloud Storage",
        description:
          "Your data lives here as Delta tables (open Parquet format) in ADLS, S3, or GCS. Databricks never owns or copies your data.",
      },
    ],
  },
  sections: [
    {
      heading: "What Is a Data Lake",
      body: "A data lake is a repository that stores raw data in its native format — structured, semi-structured, or unstructured — on cheap cloud object storage. That flexibility is also its weakness: data lakes have no built-in transaction support, no schema enforcement, and no data quality guarantees, so they tend to degrade into unreliable, hard-to-trust \"data swamps\" over time.",
    },
    {
      heading: "What Is a Lakehouse",
      body: "A lakehouse is a single architecture that adds the reliability and management features of a data warehouse directly on top of low-cost data lake storage. Instead of running separate systems for BI, data science, and ML — and moving data between them — teams query one copy of the data with warehouse-grade guarantees.",
    },
    {
      heading: "What Is a Delta Table",
      body: "A Delta table is the open storage format that makes the lakehouse possible: a set of Parquet files plus a transaction log that together add database-like guarantees to data sitting in ordinary cloud storage, with no separate database required.",
      bullets: [
        "ACID transactions — safe concurrent reads and writes, no partial or corrupted data",
        "Schema enforcement — bad or mismatched data gets rejected, not silently written",
        "Time travel — query or roll back to a previous version of a table",
      ],
    },
  ],
  comparisonTable: {
    title: "Data Lake vs. Lakehouse",
    headers: ["Capability", "Data Lake", "Lakehouse"],
    rows: [
      ["Transactions", "None", "ACID-compliant"],
      ["Schema enforcement", "None", "Enforced, with governance"],
      ["Data quality", "Unmanaged", "Enforced by the platform"],
      ["File format", "Any format, often proprietary", "Open format (Parquet via Delta Lake)"],
      ["Concurrent reads & writes", "Prone to conflicts", "Reliable, isolated transactions"],
    ],
  },
  learnMoreUrl: "https://docs.databricks.com/",
  videos: [
    {
      title: "Intro to Databricks Lakehouse Platform Architecture and Security",
      youtubeId: "5oz5dwHU_mM",
      description: "An overview of how the lakehouse platform is structured and secured.",
    },
    {
      title: "Intro to Databricks Lakehouse Platform",
      youtubeId: "CfubH7XpRVw",
      description:
        "Learn the origins of Databricks and how the Lakehouse Platform solves data challenges for engineers, analysts, and scientists.",
    },
  ],
};
