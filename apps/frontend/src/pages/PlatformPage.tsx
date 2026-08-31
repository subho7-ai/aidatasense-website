import { Link, Navigate, useParams } from "react-router-dom";
import { Accordion } from "../components/Accordion";
import { ArchitectureBulletList } from "../components/ArchitectureBulletList";
import { ArchitectureDiagram } from "../components/ArchitectureDiagram";
import { ComparisonTable } from "../components/ComparisonTable";
import { NetworkPatternBackground } from "../components/NetworkPatternBackground";
import { PlatformSideNav } from "../components/PlatformSideNav";
import { ReferenceLinkCard } from "../components/ReferenceLinkCard";
import { SectionBlock } from "../components/SectionBlock";
import { VideoSection } from "../components/VideoSection";
import { platformContentBySlug } from "../content";

const SIDE_NAV_SLUGS = ["databricks", "snowflake", "azure-fabric", "gateway"];

export function PlatformPage() {
  const { slug } = useParams<{ slug: string }>();
  const content = slug ? platformContentBySlug[slug] : undefined;

  if (!content) {
    return <Navigate to="/" replace />;
  }

  const hasSideNav = SIDE_NAV_SLUGS.includes(content.slug);
  const isDatabricks = content.slug === "databricks";
  const hasAiSection = Boolean(content.aiSections?.length);
  const hasDeepDive = Boolean(content.deepDiveSections?.length);

  const navItems = [
    { id: "overview", label: "Overview" },
    { id: "architecture", label: "Architecture" },
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

  // Databricks wants its first Overview section (Data Intelligence Platform)
  // to appear before Architecture, with the rest after — a different flow
  // than Snowflake/Fabric, where all Overview content precedes Architecture.
  const preArchitectureSections = isDatabricks ? overviewSections.slice(0, 1) : overviewSections;
  const postArchitectureSections = isDatabricks ? overviewSections.slice(1) : [];

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
              <ul className="space-y-2 text-slate-600">
                {content.architectureDiagram.summaryBullets.map((bullet) => (
                  <li key={bullet} className="flex gap-2">
                    <span className="text-indigo-500">•</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
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
        <SectionBlock key={section.heading} section={section} />
      ))}
    </>
  );

  const postArchitectureBlock = (
    <>
      {postArchitectureSections.map((section) => (
        <SectionBlock key={section.heading} section={section} />
      ))}
    </>
  );

  const useCaseBlock = hasSideNav && (
    <div id="use-case" className="scroll-mt-[180px] border-t border-slate-200 py-8">
      <h2 className="text-2xl font-semibold text-slate-900">Use case</h2>
      {content.useCases && content.useCases.length > 0 ? (
        content.useCases.map((useCase, useCaseIndex) => (
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
                className="mt-4 inline-flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-500"
              >
                {useCase.internalLink.label}
              </Link>
            )}
          </div>
        ))
      ) : (
        <p className="mt-3 text-slate-600">
          [Placeholder] Real-world {content.name} use cases will go here — replace with real content.
        </p>
      )}
    </div>
  );

  const aiBlock = hasAiSection && (
    <div id="ai" className="scroll-mt-[180px]">
      {content.aiSections!.map((section) => (
        <SectionBlock key={section.heading} section={section} />
      ))}
    </div>
  );

  const deepDiveBlock = hasDeepDive && (
    <div id="deep-dive" className="scroll-mt-[180px]">
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
      {content.sidebarSections?.map((section) => (
        <SectionBlock key={section.heading} section={section} />
      ))}
      {content.comparisonTable && <ComparisonTable {...content.comparisonTable} />}
    </>
  );

  if (hasSideNav) {
    const hasSidebar = Boolean(content.videos || content.sidebarSections?.length || content.comparisonTable);
    return (
      <div className="relative isolate mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <NetworkPatternBackground />
        </div>
        <div className={`grid gap-10 ${hasSidebar ? "lg:grid-cols-[180px_1fr_320px]" : "lg:grid-cols-[180px_1fr]"}`}>
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
