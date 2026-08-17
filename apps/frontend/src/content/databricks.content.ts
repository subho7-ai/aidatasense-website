import type { PlatformContent } from "@aidatasense/shared";

export const databricksContent: PlatformContent = {
  slug: "databricks",
  name: "Databricks",
  tagline: "The Lakehouse Platform",
  heroSummary:
    "Databricks unifies data warehousing and data lakes into a single lakehouse architecture, giving teams one platform for analytics, data engineering, and AI.",
  architectureBullets: [
    "Unified architecture that combines the reliability of a data warehouse with the scale and flexibility of a data lake",
    "Delta Lake provides an open, transactional storage layer for reliable, high-performance data pipelines",
    "Unity Catalog delivers centralized governance and fine-grained access control across all data and AI assets",
  ],
  sections: [
    {
      heading: "Architecture Overview",
      body: "Databricks is built on three logical layers: a cloud object storage layer (S3, ADLS, or GCS) holding data in the open Delta Lake format; a set of compute engines — including Spark-based clusters, Photon (Databricks' native vectorized query engine), and SQL warehouses — that read and process that data; and Unity Catalog as the unified metadata and governance layer tracking schemas, lineage, and permissions across every workspace. Because compute is decoupled from storage, teams can scale clusters independently of where the data lives, and multiple engines can read the same underlying Delta tables without duplicating data.",
    },
    {
      heading: "Key Technical Specs",
      body: "Databricks supports SQL, Python, Scala, and R as first-class languages across notebooks and jobs, with native support for Spark DataFrames and Spark SQL. Compute comes in several cluster types — all-purpose clusters for interactive development, job clusters for scheduled production workloads, and serverless SQL warehouses for BI-style queries — each independently sized and auto-scaling. The platform integrates with the broader ecosystem through connectors for cloud storage, ingestion tools (Fivetran, Kafka, Auto Loader), BI tools (Power BI, Tableau, Looker), and MLOps via MLflow and Mosaic AI.",
    },
  ],
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
