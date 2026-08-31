import type { PlatformContent } from "@aidatasense/shared";
import architectureDiagramImage from "../assets/databricks-architecture-diagram.png";
import dataIntelligencePlatformDiagram from "../assets/data-intelligence-platform-diagram.png";
import databricksHierarchy from "../assets/databricks-hierarchy.png";
import databricksWorkedExample from "../assets/databricks-worked-example.png";
import azureDevopsArchitecture from "../assets/azure-devops-architecture.png";

export const databricksContent: PlatformContent = {
  slug: "databricks",
  name: "Databricks",
  logoUrl: "https://cdn.simpleicons.org/databricks",
  tagline: "The Lakehouse Platform",
  heroSummary:
    "Databricks unifies data warehousing and data lakes into a single lakehouse architecture, giving teams one platform for analytics, data engineering, and AI.",
  architectureBullets: [
    "Lakehouse Foundation: Uses open storage layers like Delta Lake and Apache Iceberg for ACID transactions directly on cloud storage.",
    "Processing Engines: Powered by Apache Spark and the high-performance Photon query engine for large-scale data processing.",
    "Unity Catalog: Provides centralized, cross-cloud governance, data lineage, and security.",
    "AI & Machine Learning: Integrates MLflow and Mosaic AI tools to build, fine-tune, and deploy custom language models and compound AI systems.",
    "Multi-Cloud Support: Runs natively across major cloud providers including AWS, Microsoft Azure, and Google Cloud.",
  ],
  architectureDiagram: {
    summaryBullets: [
      "Sources — files, IoT devices, databases, and business apps generate the raw data that feeds the platform.",
      "Ingest — Lakeflow Connect and Auto Loader bring that data in via batch, streaming, or CDC (Change Data Capture) loads.",
      "Transform — Pipelines and the Spark/Photon engine clean and reshape the ingested data.",
      "Query/Process — data warehousing, ML, and GenAI apps (via Mosaic AI) work with the transformed data, all governed by one Unity Catalog layer.",
      "Serve — results reach users through SQL, AI/BI, and operational databases.",
      "Analyse — dashboards and business apps consume the served data for reporting and decisions.",
      "Integrate — a separate lane covering identity, governance, AI services, and orchestration wraps around every stage, with Google Cloud Storage underlying all of it as the common foundation.",
    ],
    accordion: {
      heading: "ETL Breakdown",
      items: [
        {
          title: "Extract",
          body: "Pulling data from its original sources — files, IoT devices, databases, and business applications — using tools like Lakeflow Connect for batch, streaming, and CDC (Change Data Capture) loads.",
        },
        {
          title: "Transform",
          body: "Cleaning and reshaping raw data using Pipelines and the Spark/Photon processing engine, preparing it for downstream use in warehousing, ML, and AI applications.",
        },
        {
          title: "Load",
          body: "Delivering the processed data to where it's consumed — via Query/Process (data warehousing, ML, and GenAI apps through Mosaic AI), then out to end users through Serve (SQL, AI/BI, operational databases) and Analyse (dashboards, business apps).",
        },
      ],
    },
    extraSection: {
      heading: "Zero-Copy Data Sharing",
      body: "Large organizations often spread data across multiple lakes, sometimes totaling terabytes. Sharing that data the traditional way — physically copying it to another location — is slow, costly, and hard to keep secure once it leaves its original home. Databricks avoids this with Delta Sharing: instead of copying data, you grant time-limited access to it directly, wherever it already lives. Access is automatically revoked when it expires, and the data itself never moves. That cuts down on duplicate storage and data-transfer (egress) costs, and it works across cloud providers — data sitting in Azure, for example, can be securely queried by a partner on GCP or consumed in AWS without ever leaving Azure, making the approach cloud-agnostic.",
      linkLabel: "Learn more →",
      linkUrl: "https://www.databricks.com/product/delta-sharing",
    },
  },
  architectureExtraSections: [
    {
      heading: "Rolling Out Databricks on Azure with DevOps",
      body: "A growing organization is standardizing its Databricks workspaces on Azure and wants deployments to be safe, repeatable, and auditable — not manual clicks in a portal. Engineers push infrastructure and pipeline changes to a Git repository, where a pull request triggers automated testing and an approval gate before anything merges. Once approved, a CI/CD pipeline deploys the changes to Azure, provisioning and configuring resources like managed identities and secrets through Key Vault, while a separate scheduled process continuously checks for configuration drift — catching any manual changes that fall out of sync with what's defined in code. This same DevOps pattern, illustrated below, extends naturally to Databricks workspace and pipeline deployments: version-controlled notebooks and jobs, automated testing before promotion, and consistent environments from development through production.",
      imageUrl: azureDevopsArchitecture,
      imageCaption: "Azure DevOps Architecture",
      diagramAttribution: {
        label: "Source: Microsoft Azure Architecture Center",
        url: "https://learn.microsoft.com/en-us/azure/architecture/guide/devops/devops-get-started",
      },
    },
  ],
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
      heading: "Data Intelligence Platform",
      body: "A Data Intelligence Platform is a lakehouse with a Data Intelligence Engine layered on top — using generative AI to understand the actual semantics of your specific data, not just its schema. That understanding lets the platform automatically optimize performance for your workloads, enable natural-language data discovery and development so people can query and build without only relying on SQL or code, and apply governance and security consistently, without giving up control over data privacy or IP.",
      diagram: {
        title: "What Is a Data Intelligence Platform",
        description:
          "How Databricks layers a Data Intelligence Engine — generative AI plus lakehouse unification — on top of the lakehouse to add natural-language data discovery and unified governance.",
        url: "https://www.databricks.com/blog/what-is-a-data-intelligence-platform",
        imageUrl: dataIntelligencePlatformDiagram,
      },
      diagramBrief:
        "This diagram stacks the platform from the ground up. An Open Data Lake holds all raw data — logs, text, audio, video, images. Delta Lake sits on top as the unified, reliable storage layer, governed by Unity Catalog for security and cataloging. Wrapping around both is the Data Intelligence Engine, which uses generative AI to understand your data's semantics — and it powers four capabilities at the top: Databricks AI for building and serving custom LLMs, Delta Live Tables for automated data quality, Workflows that optimize job cost from past runs, and Databricks SQL for text-to-SQL querying.",
    },
    {
      heading: "What Is a Data Lake",
      body: "A data lake is a repository that stores raw data in its native format — structured, semi-structured, or unstructured — on cheap cloud object storage. That flexibility is also its weakness: data lakes have no built-in transaction support, no schema enforcement, and no data quality guarantees, so they tend to degrade into unreliable, hard-to-trust \"data swamps\" over time.",
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
  sidebarSections: [
    {
      heading: "Integrations",
      body: "Databricks connects seamlessly with a broad ecosystem of technology partners — from data ingestion tools like Fivetran, to BI platforms like Tableau and Power BI, to governance tools like Monte Carlo. Partner Connect makes these integrations fast to set up, often with just a few clicks.",
      integrations: {
        categories: [
          { label: "Data Ingestion", url: "https://docs.databricks.com/gcp/en/integrations/#data-ingestion" },
          {
            label: "Data Preparation & Transformation",
            url: "https://docs.databricks.com/gcp/en/integrations/#data-preparation-and-transformation",
          },
          { label: "Machine Learning", url: "https://docs.databricks.com/gcp/en/integrations/#machine-learning" },
          { label: "BI & Visualization", url: "https://docs.databricks.com/gcp/en/integrations/#bi-and-visualization" },
          { label: "Reverse ETL", url: "https://docs.databricks.com/gcp/en/integrations/#reverse-etl" },
          { label: "Data Governance", url: "https://docs.databricks.com/gcp/en/integrations/#data-governance" },
          { label: "Semantic Layer", url: "https://docs.databricks.com/gcp/en/integrations/#semantic-layer" },
        ],
        viewAllUrl: "https://docs.databricks.com/gcp/en/integrations/",
        callout: {
          title: "Power BI Integration",
          body: "Databricks connects natively to Power BI, letting analysts build live reports and dashboards directly on lakehouse data — no exports, no stale copies, just real-time governed access.",
        },
      },
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
      heading: "Databricks: Genie + Unity AI Gateway",
      body: [
        "Genie is Databricks' AI assistant for talking to your data in plain language. Instead of writing SQL, you ask a question — Genie translates it into a query, grounded in your governed Unity Catalog data, and returns an answer.",
        "Behind the scenes, Unity AI Gateway governs all of this. It's Databricks' centralized control plane for AI — managing cost, security, and access across every model, agent, and tool your organization uses, whether it's Genie, a custom AI agent, or an external model. It answers a different question than data governance: not \"who can access this data,\" but \"what is this AI system allowed to do right now.\"",
      ],
    },
    {
      heading: "The Bigger Picture: The LLM Mesh",
      body: [
        "This pattern isn't unique to any one vendor. In \"The LLM Mesh\" (O'Reilly, 2026), author Kurt Muehmel describes it as an industry-wide architecture: a unified gateway that governs every AI agent, tool, and model in an organization — enforcing security, tracking cost, and providing central discovery, all through one abstraction layer instead of scattered, one-off integrations. Databricks' Unity AI Gateway and Snowflake's Cortex AI Gateway are both real-world implementations of this same idea.",
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
  useCases: [
    {
      title: "Customer Analytics at Scale",
      body: "A retail company collects customer data from its website, mobile app, in-store POS systems, and loyalty program — each in a different format, spread across separate databases. Using Databricks, the company ingests all of this into a single lakehouse, where data engineers clean and unify it with Delta Live Tables. Data scientists then build a customer segmentation model using MLflow, identifying high-value shopper groups. Marketing teams query these segments directly through Databricks SQL to launch targeted campaigns, while executives track results on live dashboards — all from one governed platform, with Unity Catalog ensuring only the right teams see the right data.",
    },
    {
      title: "Migrating a Legacy ETL System Before a Hard Deadline",
      body: [
        "A bank's finance and procurement ETL system — a 5-year-old SQL Server/SSIS pipeline feeding six external systems — needed a new home before its data center's decommission at end of 2026, with zero tolerance for downtime. The team's skillset was C#, SQL, and SSIS; Databricks was still under evaluation, with its DevOps tooling months away from ready and the team not yet trained on Azure.",
        "Rather than rewrite 45 cascading SSIS packages for an unfamiliar platform under deadline pressure, the migration was phased: Phase 1 lifts the existing SSIS logic onto the Azure-SSIS Integration Runtime, unchanged, meeting the deadline with the lowest-risk path available. Phase 2 modernizes into Databricks deliberately, source system by source system, once the DevOps tooling and the team's Azure skills are both actually ready — not forced to arrive at the same time as the deadline.",
        "The logic: a platform rewrite is the right call eventually, but it's the wrong call under a fixed, non-negotiable deadline with a team that hasn't used the target platform yet. Lift-and-shift first buys the time to modernize safely instead of gambling business continuity on a rushed rewrite.",
      ],
      internalLink: {
        label: "Read the full case study →",
        to: "/case-studies/legacy-etl-migration",
      },
    },
  ],
  deepDiveSections: [
    {
      heading: "Object Hierarchy",
      body: "Every Databricks account contains one or more workspaces. Each workspace organizes data through a Catalog (Schema → Table, View, Materialized View, Function), Compute (SQL Warehouse, Cluster), and Notebooks/Jobs/Pipelines — all governed centrally by Unity Catalog (Catalogs, External Locations, Storage Credentials, Access Control).",
      imageUrl: databricksHierarchy,
      imageSideBySide: true,
    },
    {
      heading: "A Worked Example",
      body: "Here's how that hierarchy plays out in practice: a Production workspace containing a Finance catalog, with a Sales schema holding Customer, Orders, and Products tables, plus a Customer_Order_Summary view.",
      imageUrl: databricksWorkedExample,
      imageSideBySide: true,
    },
    {
      heading: "Materialized Views",
      body: "When querying frequently-accessed data, materialized views are typically the best choice for performance on both Databricks and Snowflake — they pre-compute and store query results, refreshing automatically as underlying data changes, so repeated queries don't have to reprocess raw data every time.",
    },
    {
      heading: "A Note on Terminology",
      body: "Unity Catalog is also referred to as a metastore — this is the underlying technical term for the object that stores all catalog metadata, storage credentials, external locations, and access rules. \"Unity Catalog\" is the product name; \"metastore\" is what it's actually called under the hood.",
    },
    {
      heading: "Data Skew vs. Time Skew",
      body: "Data skew happens when data is unevenly distributed across partitions — some partitions end up with far more data than others, often caused by low-cardinality join keys, null-heavy columns, or a few \"celebrity\" values dominating a dataset. Time skew is the resulting performance symptom: certain tasks take substantially longer to finish than others, either because of that underlying data skew or because of uneven computational complexity between tasks. Since a Spark stage only completes when its slowest task finishes, a handful of skewed tasks can stall an entire job — engineers detect this by watching for tasks running 5-10x longer than the median, or a stage stuck at 99% completion. Fixes include enabling Adaptive Query Execution (AQE) to auto-split skewed partitions, salting skewed join keys, handling nulls explicitly, and pre-aggregating data before joins.",
    },
    {
      heading: "The Engine Underneath",
      body: "Both Databricks and Microsoft Fabric run on Apache Spark, but each adds its own acceleration layer. Databricks uses Photon, a proprietary C++ rewrite of Spark's execution engine, delivering some of the fastest SQL performance available. Fabric uses its own Native Execution Engine, built on the open-source Gluten/Velox stack, which has closed much of the performance gap while staying vendor-neutral.",
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
