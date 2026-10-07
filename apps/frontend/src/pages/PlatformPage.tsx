import type { ContentSection } from "@aidatasense/shared";
import type { ComponentType } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Accordion } from "../components/Accordion";
import { ApimTokenGovernanceDeepDive } from "../components/ApimTokenGovernanceDeepDive";
import { ArchitectureBulletList } from "../components/ArchitectureBulletList";
import { ArchitectureDiagram } from "../components/ArchitectureDiagram";
import { ComparisonTable } from "../components/ComparisonTable";
import { DatabricksAdlsSetup } from "../components/DatabricksAdlsSetup";
import { DatabricksDataConsumers } from "../components/DatabricksDataConsumers";
import { DatabricksDeltaTable } from "../components/DatabricksDeltaTable";
import { DatabricksDevOpsFlow } from "../components/DatabricksDevOpsFlow";
import { DatabricksGovernance } from "../components/DatabricksGovernance";
import { DatabricksObjectHierarchy } from "../components/DatabricksObjectHierarchy";
import { DatabricksWorkspaceArchitecture } from "../components/DatabricksWorkspaceArchitecture";
import { SnowflakeDataConsumers } from "../components/SnowflakeDataConsumers";
import { SnowflakeDataEngineering } from "../components/SnowflakeDataEngineering";
import { SnowflakeDevOpsFlow } from "../components/SnowflakeDevOpsFlow";
import { SnowflakeGovernance } from "../components/SnowflakeGovernance";
import { SnowflakeObjectHierarchy } from "../components/SnowflakeObjectHierarchy";
import { SnowflakePillars } from "../components/SnowflakePillars";
import { SnowflakePlatformArchitecture } from "../components/SnowflakePlatformArchitecture";
import { FabricDataConsumers } from "../components/FabricDataConsumers";
import { FabricDataEngineering } from "../components/FabricDataEngineering";
import { FabricDevOpsFlow } from "../components/FabricDevOpsFlow";
import { FabricGovernance } from "../components/FabricGovernance";
import { FabricObjectHierarchy } from "../components/FabricObjectHierarchy";
import { FabricOverview } from "../components/FabricOverview";
import { FabricPlatformArchitecture } from "../components/FabricPlatformArchitecture";
import { NetworkPatternBackground } from "../components/NetworkPatternBackground";
import { PlatformSideNav } from "../components/PlatformSideNav";
import { ReferenceLinkCard } from "../components/ReferenceLinkCard";
import { SectionBlock } from "../components/SectionBlock";
import { VideoSection } from "../components/VideoSection";
import { platformContentBySlug } from "../content";

const SIDE_NAV_SLUGS = ["databricks", "snowflake", "azure-fabric", "gateway"];

// Purpose-built sections that close out the Architecture area, per platform. The last one
// on each list is the Data Consumers section, which gets its own "Consumers" nav link.
const ARCHITECTURE_BLOCKS: Record<string, ComponentType[]> = {
  databricks: [
    DatabricksWorkspaceArchitecture,
    DatabricksObjectHierarchy,
    DatabricksAdlsSetup,
    DatabricksGovernance,
    DatabricksDataConsumers,
  ],
  "azure-fabric": [
    FabricPlatformArchitecture,
    FabricObjectHierarchy,
    FabricDataEngineering,
    FabricGovernance,
    FabricDataConsumers,
  ],
  snowflake: [
    SnowflakePlatformArchitecture,
    SnowflakeObjectHierarchy,
    SnowflakeDataEngineering,
    SnowflakeGovernance,
    SnowflakeDataConsumers,
  ],
};

// Extra side-nav links for sections inside the Architecture area, listed in page order.
const ARCHITECTURE_NAV: Record<string, { id: string; label: string }[]> = {
  databricks: [{ id: "governance", label: "Governance" }],
  "azure-fabric": [
    { id: "data-engineering", label: "Data engineering" },
    { id: "governance", label: "Governance" },
  ],
  snowflake: [
    { id: "data-engineering", label: "Data engineering" },
    { id: "governance", label: "Governance" },
  ],
};

// Components a content section can stand in for, via its customBlock key.
const CUSTOM_BLOCKS: Record<NonNullable<ContentSection["customBlock"]>, ComponentType> = {
  "databricks-devops": DatabricksDevOpsFlow,
  "databricks-delta-table": DatabricksDeltaTable,
  "fabric-devops": FabricDevOpsFlow,
  "fabric-overview": FabricOverview,
  "snowflake-devops": SnowflakeDevOpsFlow,
  "snowflake-pillars": SnowflakePillars,
};

function renderSection(section: ContentSection) {
  const Custom = section.customBlock && CUSTOM_BLOCKS[section.customBlock];
  return Custom ? <Custom /> : <SectionBlock section={section} />;
}

export function PlatformPage() {
  const { slug } = useParams<{ slug: string }>();
  const content = slug ? platformContentBySlug[slug] : undefined;

  if (!content) {
    return <Navigate to="/" replace />;
  }

  const hasSideNav = SIDE_NAV_SLUGS.includes(content.slug);
  const architectureBlocks = ARCHITECTURE_BLOCKS[content.slug] ?? [];
  const isGateway = content.slug === "gateway";
  const hasDevOps = Boolean(content.devOpsNavHeading);
  const hasAiSection = Boolean(content.aiSections?.length);
  const hasDeepDive = Boolean(content.deepDiveSections?.length);

  const navItems = [
    { id: "overview", label: "Overview" },
    { id: "architecture", label: "Architecture" },
    ...(ARCHITECTURE_NAV[content.slug] ?? []),
    ...(architectureBlocks.length > 0 ? [{ id: "consumers", label: "Consumers" }] : []),
    ...(hasDevOps ? [{ id: "devops", label: "DevOps" }] : []),
    ...(hasAiSection ? [{ id: "ai", label: "AI" }] : []),
    { id: "use-case", label: "Use case" },
    ...(hasDeepDive ? [{ id: "deep-dive", label: "Deep Dive" }] : []),
  ];

  // Sections whose heading is about architecture become the "Architecture" nav
  // target; everything else is "Overview". Only matters for platforms that
  // model architecture as a plain section (Snowflake/Azure Fabric) rather than
  // the richer architectureDiagram field (Databricks).
  const architectureSections = content.sections.filter((section) =>
    section.heading.toLowerCase().includes("architecture"),
  );
  const overviewSections = content.sections.filter(
    (section) => !section.heading.toLowerCase().includes("architecture"),
  );

  // Platforms with purpose-built architecture sections (Databricks, Snowflake) show their
  // first Overview section before Architecture and the rest after it; elsewhere all
  // Overview content precedes Architecture.
  const splitsOverview = architectureBlocks.length > 0 && !content.keepOverviewSectionsTogether;
  const preArchitectureSections = splitsOverview ? overviewSections.slice(0, 1) : overviewSections;
  const postArchitectureSections = splitsOverview ? overviewSections.slice(1) : [];

  const header = (
    <>
      <Link to="/" className="text-sm font-semibold uppercase tracking-wide text-indigo-600 hover:text-indigo-500">
        {content.tagline}
      </Link>
      <h1 className="mt-2 flex items-center gap-3 text-3xl font-bold text-slate-900">
        {content.logoUrl && <img src={content.logoUrl} alt="" className="h-10 w-auto" />}
        {content.name}
      </h1>
      <p className="mt-4 text-lg text-slate-600">{content.heroSummary}</p>
    </>
  );

  const architectureBlock = (
    <div
      id={hasSideNav ? "architecture" : undefined}
      className={hasSideNav ? "scroll-mt-[180px]" : undefined}
    >
      {content.architectureDiagram && (
        <div className="border-t border-slate-200 py-8">
          <h2 className="text-2xl font-semibold text-slate-900">Architecture</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div>
              {content.references &&
                content.references.map((reference) => (
                  <ReferenceLinkCard
                    key={reference.url}
                    {...reference}
                    className="mt-0 max-w-none"
                    fillHeight={!content.architectureDiagram?.accordion}
                  />
                ))}
              {content.architectureDiagram.accordion && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-slate-900">
                    {content.architectureDiagram.accordion.heading}
                  </h3>
                  <Accordion items={content.architectureDiagram.accordion.items} />
                </div>
              )}
            </div>
            {content.architectureDiagram.summaryBullets ? (
              <div>
                {content.architectureDiagram.summaryBulletsHeading && (
                  <h3 className="text-lg font-semibold text-slate-900">
                    {content.architectureDiagram.summaryBulletsHeading}
                  </h3>
                )}
                <ul className={`space-y-2 text-slate-600 ${content.architectureDiagram.summaryBulletsHeading ? "mt-3" : ""}`}>
                  {content.architectureDiagram.summaryBullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2">
                      <span className="text-indigo-500">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : content.architectureDiagram.summary ? (
              <p className="text-slate-600">{content.architectureDiagram.summary}</p>
            ) : (
              content.architectureDiagram.layers && (
                <ArchitectureDiagram layers={content.architectureDiagram.layers} />
              )
            )}
          </div>

          {content.architectureDiagram.extraSection && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-slate-900">
                {content.architectureDiagram.extraSection.heading}
              </h3>
              <p className="mt-3 text-slate-600">{content.architectureDiagram.extraSection.body}</p>
              {content.architectureDiagram.extraSection.linkUrl && (
                <a
                  href={content.architectureDiagram.extraSection.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  {content.architectureDiagram.extraSection.linkLabel ?? "Learn more →"}
                </a>
              )}
            </div>
          )}
        </div>
      )}

      {architectureSections.map((section) => (
        <SectionBlock key={section.heading} section={section} />
      ))}
      {content.architectureExtraSections?.map((section) => (
        <SectionBlock key={section.heading} section={section} />
      ))}
      {architectureBlocks.map((Block, index) => (
        <Block key={index} />
      ))}
    </div>
  );

  const overviewBlock = (
    <>
      {content.architectureBullets.length > 0 && !content.architectureDiagram && (
        <div className="mt-8">
          <ArchitectureBulletList bullets={content.architectureBullets} />
        </div>
      )}

      {preArchitectureSections.map((section) => (
        <div key={section.heading}>{renderSection(section)}</div>
      ))}
    </>
  );

  const postArchitectureBlock = (
    <>
      {postArchitectureSections.map((section) => (
        <div key={section.heading}>{renderSection(section)}</div>
      ))}
    </>
  );

  const useCaseBlock = hasSideNav && (
    <div id="use-case" className="scroll-mt-[180px] border-t border-slate-200 py-8">
      <h2 className="text-2xl font-semibold text-slate-900">Use case</h2>
      {content.useCases && content.useCases.length > 0 ? (
        content.useCases.map((useCase, useCaseIndex) =>
          useCase.summaryCard && useCase.internalLink ? (
            <div key={useCase.title} className={useCaseIndex > 0 ? "mt-8 border-t border-slate-200 pt-8" : undefined}>
              <Link
                to={useCase.internalLink.to}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-6 block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">Case study</p>
                <h3 className="mt-1 text-lg font-semibold text-slate-900 group-hover:text-indigo-700">
                  {useCase.title}
                </h3>
                {(Array.isArray(useCase.body) ? useCase.body : [useCase.body]).map((paragraph, index) => (
                  <p key={index} className="mt-2 text-slate-600">
                    {paragraph}
                  </p>
                ))}
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 group-hover:text-indigo-500">
                  {useCase.internalLink.label}
                </span>
              </Link>
            </div>
          ) : (
          <div key={useCase.title} className={useCaseIndex > 0 ? "mt-8 border-t border-slate-200 pt-8" : undefined}>
            <h3 className="mt-6 text-lg font-semibold text-slate-900">{useCase.title}</h3>
            {(Array.isArray(useCase.body) ? useCase.body : [useCase.body]).map((paragraph, index) => (
              <p key={index} className="mt-3 text-slate-600">
                {paragraph}
              </p>
            ))}
            {useCase.bullets && (
              <>
                {useCase.bulletsHeading && (
                  <h4 className="mt-6 text-base font-semibold text-slate-900">{useCase.bulletsHeading}</h4>
                )}
                <ul className="mt-3 space-y-1.5 text-slate-600">
                  {useCase.bullets.map((bullet) => {
                    const dashIndex = bullet.indexOf(" — ");
                    const term = dashIndex !== -1 ? bullet.slice(0, dashIndex) : null;
                    const rest = dashIndex !== -1 ? bullet.slice(dashIndex) : bullet;
                    return (
                      <li key={bullet} className="flex gap-2">
                        <span className="text-indigo-500">•</span>
                        <span>
                          {term && <strong className="font-semibold text-slate-900">{term}</strong>}
                          {rest}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </>
            )}
            {useCase.image && (
              <>
                <img
                  src={useCase.image.url}
                  alt={useCase.image.caption}
                  className="mt-4 w-full rounded-xl border border-slate-200"
                />
                <p className="mt-2 text-sm font-semibold text-slate-900">{useCase.image.caption}</p>
                {useCase.image.attribution && (
                  <a
                    href={useCase.image.attribution.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    {useCase.image.attribution.label}
                  </a>
                )}
              </>
            )}
            {useCase.internalLink && (
              <Link
                to={useCase.internalLink.to}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-500"
              >
                {useCase.internalLink.label}
              </Link>
            )}
          </div>
          ),
        )
      ) : (
        <p className="mt-3 text-slate-600">
          [Placeholder] Real-world {content.name} use cases will go here — replace with real content.
        </p>
      )}
    </div>
  );

  // Side nav targets inside the AI block: "AI" lands on aiNavHeading (default:
  // first AI section) and "DevOps" on devOpsNavHeading.
  const aiNavHeading = content.aiNavHeading ?? content.aiSections?.[0]?.heading;
  const aiBlockAnchors: Record<string, string> = {
    ...(aiNavHeading ? { [aiNavHeading]: "ai" } : {}),
    ...(content.devOpsNavHeading ? { [content.devOpsNavHeading]: "devops" } : {}),
  };
  const aiBlock = hasAiSection && (
    <div>
      {content.aiSections!.map((section) =>
        aiBlockAnchors[section.heading] ? (
          <div key={section.heading} id={aiBlockAnchors[section.heading]} className="scroll-mt-[180px]">
            {renderSection(section)}
          </div>
        ) : (
          <div key={section.heading}>{renderSection(section)}</div>
        ),
      )}
    </div>
  );

  const deepDiveBlock = hasDeepDive && (
    <div id="deep-dive" className="scroll-mt-[180px]">
      {isGateway && (
        <div className="border-t border-slate-200 py-8">
          <ApimTokenGovernanceDeepDive />
        </div>
      )}
      {content.deepDiveSections!.map((section) => (
        <SectionBlock key={section.heading} section={section} />
      ))}
    </div>
  );

  const docsLink = (
    <a
      href={content.learnMoreUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-8 inline-flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-500"
    >
      Read the official docs →
    </a>
  );

  const sidebarContent = (
    <>
      {content.videos && <VideoSection videos={content.videos} />}
      {content.sidebarReferences?.map((reference) => (
        <ReferenceLinkCard key={reference.url} {...reference} className="mt-6" showIcon={false} />
      ))}
      {content.sidebarSections?.map((section) => (
        <SectionBlock key={section.heading} section={section} />
      ))}
      {content.comparisonTable && <ComparisonTable {...content.comparisonTable} />}
    </>
  );

  if (hasSideNav) {
    const hasSidebar = Boolean(
      content.videos || content.sidebarReferences?.length || content.sidebarSections?.length || content.comparisonTable,
    );
    return (
      <div
        className={`relative isolate mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 ${
          content.slug === "azure-fabric" || content.slug === "databricks" ? "overflow-x-clip" : ""
        }`}
      >
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <NetworkPatternBackground />
        </div>
        <div className={`grid gap-10 ${hasSidebar ? "lg:grid-cols-[180px_1fr_224px]" : "lg:grid-cols-[180px_1fr]"}`}>
          <PlatformSideNav items={navItems} />
          <div>
            {header}
            <div id="overview" className="scroll-mt-[180px]">
              {overviewBlock}
            </div>
            {architectureBlock}
            {postArchitectureBlock}
            {aiBlock}
            {useCaseBlock}
            {deepDiveBlock}
            {docsLink}
          </div>
          {hasSidebar && <div>{sidebarContent}</div>}
        </div>
      </div>
    );
  }

  const mainContent = (
    <>
      {header}
      {architectureBlock}
      {overviewBlock}
      {postArchitectureBlock}
      {docsLink}
    </>
  );

  if (content.videos) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">{mainContent}</div>
          <div className="lg:col-span-1">{sidebarContent}</div>
        </div>
      </div>
    );
  }

  return <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">{mainContent}</div>;
}
