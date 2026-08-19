import type { PlatformContent } from "@aidatasense/shared";
import architectureDiagramImage from "../assets/databricks-architecture-diagram.png";
import lakehouseComparisonImage from "../assets/lakehouse-comparison-diagram.png";

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
    summary:
      "This reference diagram traces data end-to-end across seven stages. Sources (files, IoT, databases, business apps) flow into Ingest (Lakeflow Connect, Auto Loader) for batch, streaming, and CDC loads. Transform (Pipelines, Spark/Photon) cleans and reshapes the data, which Query/Process (data warehousing, ML, GenAI apps via Mosaic AI) then works with, all under one Unity Catalog governance layer. Results reach users through Serve (SQL, AI/BI, operational databases) and Analyse (dashboards, business apps), while a separate Integrate lane covers identity, governance, AI services, and orchestration wrapping around every stage — with Google Cloud Storage as the common foundation underneath.",
  },
  references: [
    {
      title: "Databricks Data Intelligence Platform — GCP Reference Architecture",
      description:
        "The full platform overview: how sources, ingestion, transformation, processing, serving, and analytics connect end-to-end on Google Cloud.",
      url: "https://docs.databricks.com/gcp/en/lakehouse-architecture/reference",
      imageUrl: architectureDiagramImage,
    },
  ],
  sections: [
    {
      heading: "What Is a Data Lake",
      body: "A data lake is a repository that stores raw data in its native format — structured, semi-structured, or unstructured — on cheap cloud object storage. That flexibility is also its weakness: data lakes have no built-in transaction support, no schema enforcement, and no data quality guarantees, so they tend to degrade into unreliable, hard-to-trust \"data swamps\" over time.",
    },
    {
      heading: "What Is a Lakehouse",
      body: "A lakehouse is a single architecture that adds the reliability and management features of a data warehouse directly on top of low-cost data lake storage. Instead of running separate systems for BI, data science, and ML — and moving data between them — teams query one copy of the data with warehouse-grade guarantees.",
      imageUrl: lakehouseComparisonImage,
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
