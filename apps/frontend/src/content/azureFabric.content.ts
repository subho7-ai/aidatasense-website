import type { PlatformContent } from "@aidatasense/shared";
import fabricShortcuts from "../assets/fabric-docs-shortcuts.png";
import microsoftFabricLogo from "../assets/microsoft-fabric-logo.png";
import oneLakeArchitecture from "../assets/onelake-architecture.png";

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
    "Power BI: Native OneLake integration — Direct Lake queries data directly, no import step.",
    "Real-Time Intelligence: Ingest, query, and act on streaming data using KQL databases.",
  ],
  keepOverviewSectionsTogether: true,
  architectureDiagram: {
    summaryBullets: [
      "Sources — operational databases, SaaS apps, files in other clouds, and streaming sources all land in OneLake through pipelines, mirroring, shortcuts, or Eventstreams.",
      "Ingest — Data Factory pipelines, Dataflow Gen2, Mirroring, OneLake shortcuts, and Eventstreams bring data in without every engine needing its own copy.",
      "Transform — Spark notebooks, Dataflow Gen2, and Warehouse T-SQL all read and write the same Delta Parquet in OneLake, so switching engines doesn't mean re-ingesting data.",
      "Store — every workload's output lands in workspace and item folders (e.g. Customer 360, Finance, Service Telemetry) as open Delta Parquet, one copy shared by everything above it.",
      "Serve — the SQL analytics endpoint, Direct Lake semantic models, and data agents all read that same governed copy, with no separate data-prep pipeline for BI or AI.",
      "Govern — workspace roles, OneLake security, and Microsoft Purview apply to the data once, rather than once per engine.",
    ],
    accordion: {
      heading: "ETL Breakdown",
      items: [
        {
          title: "Extract",
          body: "Getting data in: Data Factory pipelines and Dataflow Gen2 with 200+ connectors, Mirroring for operational databases, Eventstreams for real-time sources, and shortcuts that reference external storage without copying it.",
        },
        {
          title: "Transform",
          body: "Shaping data in OneLake: Spark notebooks and Spark job definitions in a lakehouse, T-SQL in a warehouse, Power Query in Dataflow Gen2, and KQL update policies in an eventhouse — all writing Delta Parquet.",
        },
        {
          title: "Load",
          body: "Delivering curated data: Power BI semantic models in Direct Lake mode read the gold tables straight from OneLake, the SQL analytics endpoint serves SQL tools, and data agents and Copilot answer questions over the same data.",
        },
      ],
    },
  },
  architectureExtraSections: [
    {
      heading: "Shortcuts and Mirroring",
      body: [
        "Fabric has two ways to bring outside data into OneLake, and they work very differently. A shortcut is a pointer: the data stays where it is — in another workspace, in ADLS Gen2, Amazon S3, Google Cloud Storage, or Dataverse — and appears in OneLake as if it were local. Mirroring makes a continuously updated replica of an operational database, such as Azure SQL Database, SQL Server, Azure Cosmos DB, or Snowflake, as Delta tables in OneLake.",
        "Use shortcuts for data already in files or Delta tables that you don't want to move. Use mirroring when the source is a database you shouldn't run analytics against, but want near-real-time copies of.",
      ],
      bullets: [
        "Shortcuts — no copy, no storage cost in OneLake, always as fresh as the source",
        "Mirroring — a managed, near-real-time replica as Delta, with no pipelines to build",
        "Both — show up in the lakehouse like any other table, readable by every Fabric engine",
      ],
      imageUrl: fabricShortcuts,
      imageZoomable: true,
      imageCaption: "Shortcuts connect data across workspaces and clouds without copying it",
      diagramAttribution: {
        label: "Source: Microsoft Learn — OneLake, the OneDrive for data",
        url: "https://learn.microsoft.com/en-us/fabric/onelake/onelake-overview",
      },
    },
    {
      heading: "Integrations",
      body: "Fabric connects to hundreds of sources and destinations through Data Factory, mirrors operational databases into OneLake, references external storage through shortcuts, and brings streaming sources in through the Real-Time hub — with Power BI built in rather than bolted on.",
      integrations: {
        categories: [
          { label: "Data Factory Connectors", url: "https://learn.microsoft.com/en-us/fabric/data-factory/connector-overview" },
          { label: "Mirroring", url: "https://learn.microsoft.com/en-us/fabric/mirroring/overview" },
          { label: "OneLake Shortcuts", url: "https://learn.microsoft.com/en-us/fabric/onelake/onelake-shortcuts" },
          { label: "Real-Time Hub", url: "https://learn.microsoft.com/en-us/fabric/real-time-hub/real-time-hub-overview" },
          { label: "Lakehouse", url: "https://learn.microsoft.com/en-us/fabric/data-engineering/lakehouse-overview" },
          { label: "Data Warehouse", url: "https://learn.microsoft.com/en-us/fabric/data-warehouse/data-warehousing" },
        ],
        viewAllUrl: "https://learn.microsoft.com/en-us/fabric/data-factory/connector-overview",
        callout: {
          title: "Power BI Integration",
          body: "Power BI is part of Fabric itself. Semantic models in Direct Lake mode read Delta tables straight from OneLake — no import, no scheduled refresh to keep a copy in sync.",
        },
      },
    },
  ],
  references: [
    {
      title: "OneLake Architecture",
      description:
        "How OneLake unifies every Fabric compute engine over one shared data lake, with Shortcuts and Mirroring pulling in external and operational data without copying it.",
      url: "https://learn.microsoft.com/en-us/fabric/onelake/onelake-overview",
      imageUrl: oneLakeArchitecture,
    },
  ],
  sections: [
    {
      heading: "Why an End-to-End Platform",
      customBlock: "fabric-overview",
      body: "",
    },
    {
      heading: "Key Technical Specs",
      body: "Fabric is provisioned through capacities measured in capacity units (CUs), sold as F SKUs from F2 upward, which pool compute across every workload instead of billing each tool separately. Data lives in OneLake as open Delta Parquet, readable by non-Fabric engines through an ADLS Gen2-compatible API. As a Microsoft service, Fabric uses Microsoft Entra ID for identity and Microsoft Purview for governance, references external storage through shortcuts, and brings in databases such as Azure SQL Database and Azure Cosmos DB through mirroring.",
    },
    {
      heading: "Built for Team Collaboration",
      body: "Fabric unifies tools into one SaaS platform so every role works from the same data, without duplicating effort.",
      bullets: [
        "Data engineers — ingest and transform data into OneLake using pipelines and notebooks, storing it in Delta Parquet lakehouses.",
        "Analytics engineers — curate lakehouse data and build Power BI semantic models for self-service analytics.",
        "Data analysts — query OneLake directly through Direct Lake mode and build reports in Power BI.",
        "Data scientists — train models in Python and Spark notebooks; predictions can ground Copilot and AI agents.",
        "Citizen developers — discover data in the OneLake catalog and build reports with templates or Copilot.",
        "Every role feeds the same foundation: clean data and consistent semantic models are what make Copilot and AI agents accurate.",
      ],
    },
  ],
  devOpsNavHeading: "CI/CD for Data Engineers with Azure DevOps",
  aiNavHeading: "It Takes the Whole Data Team",
  aiSections: [
    {
      heading: "CI/CD for Data Engineers with Azure DevOps",
      customBlock: "fabric-devops",
      body: "",
    },
    {
      heading: "It Takes the Whole Data Team",
      body: "Every role on the data team shapes how well AI performs — the same clean, governed data that powers your reports is what Copilot and Fabric IQ reason over.",
    },
    {
      heading: "Fabric IQ",
      body: [
        "Fabric IQ (preview) unifies data across OneLake and organizes it according to the language of your business. Its core item is the ontology, which defines your business concepts, relationships, and rules so AI agents can reason across domains using consistent business language rather than raw table schemas.",
        "Fabric IQ is one of three IQ workloads Microsoft provides, each giving agents access to a different kind of organizational context — standalone, but usable together for comprehensive coverage:",
      ],
      bullets: [
        "Fabric IQ — models business data (ontologies, semantic models, graphs) so agents can reason over analytics in OneLake and Power BI.",
        "Foundry IQ — connects structured and unstructured data across Azure, SharePoint, OneLake, and the web, giving agents permission-aware access to enterprise knowledge.",
        "Work IQ — captures collaboration signals from documents, meetings, chats, and workflows, giving agents insight into how your organization actually operates.",
      ],
    },
    {
      heading: "Fabric Data Agents",
      body: "Data agents let users ask questions about organizational data in natural language, translating those questions into structured queries across lakehouses, warehouses, and semantic models. Within Fabric IQ, data agents can connect to your ontology as a source — so they understand and use your business concepts, not just raw schemas, when answering.",
    },
    {
      heading: "Copilot Across Workloads",
      body: "Microsoft Copilot in Fabric is a generative AI assistant available across every Fabric workload:",
      bullets: [
        "Code completion and generation — intelligent code suggestions in notebooks, SQL queries generated from natural language, and KQL translation for real-time analysis.",
        "Data transformation guidance — in Data Factory, code generation and plain-language explanations of complex transformation logic, for both citizen and professional data wranglers.",
        "Report and insight generation — in Power BI, automatic report generation, page summaries, and natural language Q&A over your data.",
      ],
    },
  ],
  useCases: [
    {
      title: "From an Operational Database to Live Reports, Without an ETL Project",
      body: [
        "A retailer runs its order system on Azure SQL Database and wants sales reports that are minutes, not a day, behind — without loading the production database with reporting queries or building and maintaining a nightly ETL job.",
        "Mirroring replicates the order database into OneLake as Delta tables in near real time. A Spark notebook in a lakehouse joins orders with product and store data brought in through shortcuts, and writes a gold sales table. A Power BI semantic model in Direct Lake mode reads that table straight from OneLake, so reports reflect new orders within minutes — with no import refresh — while a data agent lets store managers ask questions in plain language.",
        "The operational database never sees a reporting query, the only copy of the data lives in OneLake, and the whole flow is governed by the same workspace roles and Purview labels.",
      ],
    },
  ],
  sidebarReferences: [
    {
      title: "What is Microsoft Fabric?",
      description: "Microsoft's overview of Fabric: the SaaS foundation, every workload, OneLake, and how they fit together.",
      url: "https://learn.microsoft.com/en-us/fabric/fundamentals/microsoft-fabric-overview",
    },
  ],
  deepDiveSections: [
    {
      heading: "V-Order and Direct Lake",
      body: [
        "Fabric's answer to partitioning and micro-partitions starts at write time. V-Order sorts, encodes, and compresses Parquet files as Fabric writes them, so every engine — Spark, SQL, and Power BI — reads less data, while the files stay standard Parquet that any tool can open.",
        "Direct Lake builds on that: instead of importing data into a Power BI model and refreshing it on a schedule, a Direct Lake semantic model loads only the columns a report needs, straight from the Delta tables in OneLake. Reports get import-like speed with data that's as fresh as the last write.",
      ],
      bullets: [
        "V-Order — applied by default in many workspaces, depending on the workspace's Spark settings — check them before relying on it; files stay fully compatible Parquet and Delta",
        "OPTIMIZE — compacts small files in a lakehouse table, applying V-Order as it goes",
        "Direct Lake — no import copy and no scheduled refresh for the model's data",
        "Fallback — if a query can't run in Direct Lake, the model can fall back to the SQL endpoint",
      ],
      diagramAttribution: {
        label: "Learn more →",
        url: "https://learn.microsoft.com/en-us/fabric/fundamentals/direct-lake-overview",
      },
    },
    {
      heading: "Delta Time Travel in Fabric",
      body: [
        "Delta Lake keeps a transaction log of every change to a table, so a lakehouse table can be queried as it existed at an earlier point, not just its current state. DESCRIBE HISTORY table_name lists each version with its timestamp and the operation that produced it, and a query can target a specific point with VERSION AS OF or TIMESTAMP AS OF — for example, SELECT * FROM orders VERSION AS OF 12 or SELECT * FROM orders TIMESTAMP AS OF '2026-01-01'.",
        "How far back you can go depends on how much history is still retained: running VACUUM permanently removes files older than its retention threshold, so once a version's files are vacuumed, that version can no longer be queried, even though it still appears in the table's log.",
      ],
      code: {
        title: "Spark SQL · history, time travel, and rollback (illustrative)",
        content: `DESCRIBE HISTORY orders;

SELECT * FROM orders VERSION AS OF 12;
SELECT * FROM orders TIMESTAMP AS OF '2026-01-01';

-- Roll the table back to an earlier version
RESTORE TABLE orders TO VERSION AS OF 12;`,
      },
      bullets: [
        "DESCRIBE HISTORY — lists a table's versions, timestamps, and operations.",
        "VERSION AS OF / TIMESTAMP AS OF — query the table as it existed at a specific version or point in time.",
        "VACUUM limits the window — once old files are vacuumed, those versions are no longer queryable.",
      ],
    },
    {
      heading: "Full vs. Incremental Loads",
      body: [
        "A full load reloads an entire table every run — simple to reason about, but it gets slower and more expensive as the source table grows, and it can momentarily disrupt readers while the table is rebuilt. An incremental load instead picks up only the rows that changed since the last run, usually tracked with a watermark — a column like an updated-at timestamp or an incrementing ID that marks how far the last run got.",
        "Full loads suit small reference tables or sources with no reliable change-tracking column. Incremental loads suit large, frequently updated tables where reprocessing everything every run isn't practical. In Fabric, both patterns show up across the same tools: a Data Factory pipeline or Dataflow Gen2 can filter source rows by a watermark column, Dataflow Gen2 also supports incremental refresh natively, and a notebook can express the same idea in Spark with a MERGE statement that upserts only the changed rows into the target Delta table.",
      ],
      code: {
        title: "Notebook (Spark SQL) · incremental upsert with a watermark column (illustrative)",
        content: `MERGE INTO orders_silver AS target
USING (
  SELECT * FROM orders_raw
  WHERE updated_at > (SELECT max(updated_at) FROM orders_silver)
) AS changes
ON target.order_id = changes.order_id
WHEN MATCHED THEN UPDATE SET *
WHEN NOT MATCHED THEN INSERT *`,
      },
      bullets: [
        "Full load — reloads the entire table every run; simplest, but doesn't scale to large tables.",
        "Incremental load — loads only what changed since the last run, tracked by a watermark column.",
        "In Fabric — pipelines and Dataflow Gen2 filter by watermark; notebooks express the same pattern with a Spark MERGE.",
      ],
    },
    {
      heading: "Fabric Terms Every Architect Should Know",
      body: "",
      bullets: [
        "V-Order — a write-time optimization of Parquet files that speeds up reads by every Fabric engine",
        "VertiPaq — the in-memory columnar engine behind Power BI semantic models",
        "Direct Lake — a semantic model mode that reads Delta tables from OneLake on demand, without importing them",
        "XMLA endpoint — programmatic management and querying of semantic models",
        "Semantic link — connects Fabric notebooks to Power BI semantic models",
        "SQL analytics endpoint — the read-only T-SQL view automatically created for every lakehouse",
        "Mirrored database — a near-real-time replica of an operational database in OneLake",
        "OneLake shortcuts — pointers to data in other locations, without copying it",
        "Eventstreams — low-code real-time ingestion and transformation",
        "Eventhouse and KQL database — the store and query engine for telemetry and real-time analytics",
        "Kusto Query Language (KQL) — the query language for real-time, log, and time-series data",
        "OneLake catalog — the place to discover, govern, and reuse Fabric items",
        "Domains — groups of workspaces by business area, with delegated governance",
        "Deployment pipelines — Fabric's built-in Dev → Test → Prod promotion",
        "Variable library — per-environment values for CI/CD",
      ],
    },
  ],
  learnMoreUrl: "https://learn.microsoft.com/fabric/",
};
