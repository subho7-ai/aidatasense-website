import type { PlatformContent } from "@aidatasense/shared";
import microsoftFabricLogo from "../assets/microsoft-fabric-logo.png";

export const azureFabricContent: PlatformContent = {
  slug: "azure-fabric",
  name: "Microsoft Fabric",
  logoUrl: microsoftFabricLogo,
  tagline: "The Unified Analytics Platform",
  heroSummary:
    "Microsoft Fabric is an end-to-end analytics platform that brings data engineering, data integration, data warehousing, real-time intelligence, data science, and Power BI together on a unified SaaS platform.",
  architectureBullets: [
    "OneLake: A single logical data lake for the whole organization, shared by every workload.",
    "Data Engineering: Spark-based notebooks and pipelines for large-scale transformation, with autoscaling compute.",
    "Data Factory: 200+ built-in connectors for building and orchestrating data pipelines.",
    "Lakehouse: Combines data lake flexibility with warehouse structure via Delta Lake tables.",
    "Warehouse: A fully transactional, SQL-based analytics warehouse on the same Delta Lake format.",
    "Data Science: Notebook-based ML training and experimentation with MLflow-compatible tracking.",
    "Power BI: Native OneLake integration — DirectLake queries data directly, no import step.",
    "Real-Time Intelligence: Ingest, query, and act on streaming data using KQL databases.",
  ],
  sections: [
    {
      heading: "Architecture Overview",
      body: "Microsoft Fabric is built around OneLake, a single, tenant-wide data lake (built on ADLS Gen2 and the open Delta Parquet format) that every Fabric workload reads from and writes to by default. Rather than Data Factory, Synapse, and Power BI each keeping their own copy of data, they all operate on the same OneLake-managed tables — a dataset ingested once is immediately queryable, transformable, and reportable across the whole suite. This \"one copy of data, many engines\" model is the core idea that separates Fabric from a set of separately-integrated Azure services.",
    },
    {
      heading: "Key Technical Specs",
      body: "Fabric is provisioned through Fabric Capacity Units (CUs), sold in SKUs (F2, F4, F8, and up) that pool compute across every workload in a tenant rather than billing each tool separately. Data lives in OneLake as open Delta Parquet, directly readable by non-Fabric engines and compatible with existing ADLS Gen2 tooling. As a native Azure service, Fabric integrates directly with Azure Active Directory for identity and Microsoft Purview for governance, and can virtually mount external Azure data (SQL, Cosmos DB) into OneLake via shortcuts without physically copying it.",
    },
  ],
  aiSections: [
    {
      heading: "Fabric IQ Data Agents & Copilot",
      body: [
        "Fabric IQ data agents can query your lakehouse tables through the SQL analytics endpoint, translating natural language questions into SQL queries that return accurate answers. The quality of those answers depends directly on how well you structure and document your data.",
        "Copilot capabilities in Fabric also benefit from well-structured lakehouse data. Copilot in Power BI can generate reports and answer business questions when it can reason over clearly defined tables and relationships. The same lakehouse data can feed semantic models that support natural language exploration across Microsoft 365 experiences.",
      ],
    },
  ],
  deepDiveSections: [
    {
      heading: "Architect-Level Fabric Terms",
      body: "",
      bullets: [
        "V-Order — Delta/Parquet optimization for analytical read performance.",
        "VertiPaq — In-memory columnar engine behind Power BI semantic models.",
        "XMLA Endpoint — Programmatic management and automation of semantic models.",
        "Semantic Link — Connects Fabric data science with Power BI semantic models.",
        "Direct Lake on SQL — Direct Lake access pattern using SQL endpoint capabilities.",
        "Direct Lake on OneLake — Low-copy analytical access directly to Delta tables.",
        "Mirrored Database — Near-real-time replication of operational databases into Fabric.",
        "OneLake Shortcuts — Virtual references to data without physically copying it.",
        "Eventstreams — Low-code real-time ingestion and transformation pipeline.",
        "KQL Database — High-performance engine/storage model for telemetry and real-time analytics.",
        "Kusto Query Language (KQL) — Query language for real-time/event/observability workloads.",
        "OneLake Data Hub — Discovery/governance-oriented view of organizational Fabric data.",
        "Fabric Domains — Logical organization of Fabric assets around business domains.",
        "Deployment Pipelines — Dev → Test → Prod lifecycle management for Fabric artifacts.",
        "Mirroring + Direct Lake — A powerful operational DB → Fabric → BI architecture pattern.",
      ],
    },
  ],
  learnMoreUrl: "https://learn.microsoft.com/fabric/",
};
