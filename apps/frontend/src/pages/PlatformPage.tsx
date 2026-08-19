import { Link, Navigate, useParams } from "react-router-dom";
import { ArchitectureBulletList } from "../components/ArchitectureBulletList";
import { ArchitectureDiagram } from "../components/ArchitectureDiagram";
import { ComparisonTable } from "../components/ComparisonTable";
import { ReferenceLinkCard } from "../components/ReferenceLinkCard";
import { SectionBlock } from "../components/SectionBlock";
import { VideoSection } from "../components/VideoSection";
import { platformContentBySlug } from "../content";

export function PlatformPage() {
  const { slug } = useParams<{ slug: string }>();
  const content = slug ? platformContentBySlug[slug] : undefined;

  if (!content) {
    return <Navigate to="/" replace />;
  }

  const mainContent = (
    <>
      <Link to="/" className="text-sm font-semibold uppercase tracking-wide text-indigo-600 hover:text-indigo-500">
        {content.tagline}
      </Link>
      <h1 className="mt-2 flex items-center gap-3 text-3xl font-bold text-slate-900">
        {content.logoUrl && <img src={content.logoUrl} alt="" className="h-10 w-auto" />}
        {content.name}
      </h1>
      <p className="mt-4 text-lg text-slate-600">{content.heroSummary}</p>

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

      {content.architectureBullets.length > 0 && !content.architectureDiagram && (
        <div className="mt-8">
          <ArchitectureBulletList bullets={content.architectureBullets} />
        </div>
      )}

      {content.sections.map((section) => (
        <SectionBlock key={section.heading} section={section} />
      ))}

      {content.comparisonTable && <ComparisonTable {...content.comparisonTable} />}

      <a
        href={content.learnMoreUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-500"
      >
        Read the official docs →
      </a>
    </>
  );

  if (content.videos) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">{mainContent}</div>
          <div className="lg:col-span-1">
            <VideoSection videos={content.videos} />
          </div>
        </div>
      </div>
    );
  }

  return <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">{mainContent}</div>;
}
