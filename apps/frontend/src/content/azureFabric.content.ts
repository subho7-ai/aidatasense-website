import type { PlatformContent } from "@aidatasense/shared";
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
    "Power BI: Native OneLake integration — DirectLake queries data directly, no import step.",
    "Real-Time Intelligence: Ingest, query, and act on streaming data using KQL databases.",
  ],
  architectureDiagram: {
    summaryBullets: [
      "Compute engines — Data Factory, Data Engineering, Data Science, Data Warehousing, Real-Time Intelligence, and Power BI all sit above the same OneLake storage layer, instead of each keeping its own copy of data.",
      "Serverless compute — Spark, T-SQL, KQL, and Analysis Services each read and write OneLake directly, so switching engines doesn't mean re-ingesting data.",
      "OneLake storage — data lives in domain-organized folders (e.g. Customer 360, Finance, Service Telemetry) as open Delta Parquet, one copy shared by every engine above it.",
      "Shortcuts — virtualizes external data from Azure, Amazon S3, Google Cloud, Dataverse, and on-premises sources into OneLake without physically copying it.",
      "Mirroring — continuously replicates operational databases like Azure SQL DB into OneLake in near real time, for read-only analytics without touching the source system.",
    ],
  },
  references: [
    {
      title: "Microsoft Fabric OneLake Architecture",
      description:
        "How OneLake unifies every Fabric compute engine over one shared data lake, with Shortcuts and Mirroring pulling in external and operational data without copying it.",
      url: "https://learn.microsoft.com/en-us/fabric/onelake/onelake-overview",
      imageUrl: oneLakeArchitecture,
    },
  ],
  architectureExtraSections: [
    {
      heading: "OneLake in Depth",
      body: "OneLake is Fabric's centralized storage architecture — it unifies your data across regions and clouds into a single logical lake, without moving or duplicating it, so every team works from the same copy instead of collaborating around it.",
      bullets: [
        "Built on ADLS Gen2 — supports Delta, Parquet, CSV, and JSON, with every Fabric compute engine writing tabular data as Delta Parquet so all engines interact with it seamlessly.",
        "Automatic storage — every Fabric workload stores its data in OneLake by default, making it directly accessible with no separate movement or duplication step.",
        "Shortcuts — references to files or locations inside OneLake or external sources (ADLS, Amazon S3, Dataverse) that let you access existing data without copying it, staying in sync with the source.",
        "One governed copy for AI — because all workloads store data in OneLake using an open format, Copilot and data agents access the same governed data as your reports and dashboards, with no separate data-prep pipeline for AI.",
      ],
    },
    {
      heading: "Workspaces",
      body: "Workspaces are logical containers for organizing and managing your data, reports, and other assets — giving each project or team a clear separation of resources for access control and security.",
      bullets: [
        "Per-workspace permissions — each workspace has its own permission set, so only authorized users can view or modify its contents, supporting collaboration without loosening access control.",
        "Compute management — configure a workspace's compute settings directly to balance performance and cost for what it actually runs.",
        "Git integration — connect a workspace to Git to track changes, collaborate on code, and keep a version history of your work.",
      ],
    },
    {
      heading: "Administration and Governance",
      body: "OneLake is centrally governed and open for collaboration — data is secured and governed in one place, so users can find and access what they need without hunting across systems. Fabric administration itself is centralized in the Admin portal.",
      bullets: [
        "Admin portal — manage groups and permissions, configure data sources and gateways, and monitor usage and performance from one place.",
        "Admin APIs and SDKs — automate common administrative tasks and integrate Fabric with other systems programmatically.",
        "OneLake catalog — surfaces sensitivity labels, item metadata, and data refresh status, giving you a direct view into governance status and what needs attention.",
      ],
    },
  ],
  sections: [
    {
      heading: "Why an End-to-End Platform",
      body: [
        "Ingesting, preparing, governing, and analyzing data at scale usually means stitching together disconnected tools across separate teams. Increasingly, that same data also needs to be ready for AI workloads — machine learning models, Copilots, and intelligent agents. Managing all of this across separate systems creates complexity, governance gaps, and duplicated effort.",
        "Microsoft Fabric addresses this by providing one integrated environment across the entire data lifecycle, built on OneLake as the single, unified data lake beneath every workload. Because all data is ingested, prepared, and governed within Fabric, the same data that powers your reports and dashboards is also directly available to Copilot, data agents, and Fabric IQ — the governance work you do once supports both analytics and your organization's AI initiatives.",
      ],
    },
    {
      heading: "Key Technical Specs",
      body: "Fabric is provisioned through Fabric Capacity Units (CUs), sold in SKUs (F2, F4, F8, and up) that pool compute across every workload in a tenant rather than billing each tool separately. Data lives in OneLake as open Delta Parquet, directly readable by non-Fabric engines and compatible with existing ADLS Gen2 tooling. As a native Azure service, Fabric integrates directly with Azure Active Directory for identity and Microsoft Purview for governance, and can virtually mount external Azure data (SQL, Cosmos DB) into OneLake via shortcuts without physically copying it.",
    },
    {
      heading: "Built for Team Collaboration",
      body: "Fabric unifies tools into one SaaS platform so every role works from the same data, without duplicating effort.",
      bullets: [
        "Data engineers — ingest and transform data into OneLake using Pipelines and Notebooks, storing it in Delta-Parquet lakehouses.",
        "Analytics engineers — curate lakehouse data and build Power BI semantic models for self-service analytics.",
        "Data analysts — query OneLake directly via Direct Lake mode and build reports in Power BI.",
        "Data scientists — train models in Python/Spark notebooks and integrate with Azure ML; predictions can ground Copilot and AI agents.",
        "Citizen developers — discover datasets in the OneLake catalog and build dashboards with Power BI templates or Copilot's natural language queries.",
        "Every role feeds the same foundation: clean data and consistent semantic models are what make Copilot and AI agents accurate.",
      ],
    },
  ],
  aiSections: [
    {
      heading: "It Takes the Whole Data Team",
      body: "Every role on the data team shapes how well AI actually works. Data engineers who keep OneLake clean and governed build the foundation Copilot and AI agents depend on. Analytics engineers who build consistent semantic models give AI the business context to answer accurately.",
    },
    {
      heading: "Who Does What",
      body: "Fabric unifies analytics tools into one SaaS platform, so different roles collaborate without duplicating work.",
      bullets: [
        "Data Engineers — Ingest, transform, and load data into OneLake using Pipelines, storing it in Lakehouses as Delta-Parquet; Notebooks handle complex transformations.",
        "Analytics Engineers — Curate lakehouse data assets, ensure data quality, and build Power BI semantic models for self-service analytics.",
        "Data Analysts — Transform data upstream with dataflows, connect directly via Direct Lake mode, and build reports faster in Power BI.",
        "Data Scientists — Build and test ML models in Python/Spark notebooks and integrate with Azure Machine Learning; their predictions can also ground Copilot and AI agents.",
        "Citizen Developers — Discover curated datasets in the OneLake catalog, build reports from Power BI templates, run simple ETL with dataflows, or just ask Copilot in natural language.",
      ],
    },
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
