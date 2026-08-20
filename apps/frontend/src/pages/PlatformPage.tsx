import { Link, Navigate, useParams } from "react-router-dom";
import { ArchitectureBulletList } from "../components/ArchitectureBulletList";
import { ArchitectureDiagram } from "../components/ArchitectureDiagram";
import { ComparisonTable } from "../components/ComparisonTable";
import { PlatformSideNav } from "../components/PlatformSideNav";
import { ReferenceLinkCard } from "../components/ReferenceLinkCard";
import { SectionBlock } from "../components/SectionBlock";
import { VideoSection } from "../components/VideoSection";
import { platformContentBySlug } from "../content";

const SIDE_NAV_SLUGS = ["databricks", "snowflake", "azure-fabric"];

export function PlatformPage() {
  const { slug } = useParams<{ slug: string }>();
  const content = slug ? platformContentBySlug[slug] : undefined;

  if (!content) {
    return <Navigate to="/" replace />;
  }

  const hasSideNav = SIDE_NAV_SLUGS.includes(content.slug);

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
                  <ReferenceLinkCard key={reference.url} {...reference} className="mt-0 max-w-none" />
                ))}
            </div>
            {content.architectureDiagram.summary ? (
              <p className="text-slate-600">{content.architectureDiagram.summary}</p>
            ) : (
              content.architectureDiagram.layers && (
                <ArchitectureDiagram layers={content.architectureDiagram.layers} />
              )
            )}
          </div>
        </div>
      )}

      {architectureSections.map((section) => (
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

      {overviewSections.map((section) => (
        <SectionBlock key={section.heading} section={section} />
      ))}

      {content.comparisonTable && <ComparisonTable {...content.comparisonTable} />}
    </>
  );

  const useCaseBlock = hasSideNav && (
    <div id="use-case" className="scroll-mt-[180px] border-t border-slate-200 py-8">
      <h2 className="text-2xl font-semibold text-slate-900">Use case</h2>
      <p className="mt-3 text-slate-600">
        [Placeholder] Real-world {content.name} use cases will go here — replace with real content.
      </p>
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
    </>
  );

  if (hasSideNav) {
    const hasSidebar = Boolean(content.videos || content.sidebarSections?.length);
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className={`grid gap-10 ${hasSidebar ? "lg:grid-cols-[180px_1fr_320px]" : "lg:grid-cols-[180px_1fr]"}`}>
          <PlatformSideNav />
          <div>
            {header}
            <div id="overview" className="scroll-mt-[180px]">
              {overviewBlock}
            </div>
            {architectureBlock}
            {useCaseBlock}
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
