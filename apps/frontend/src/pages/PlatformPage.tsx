import { Navigate, useParams } from "react-router-dom";
import { ArchitectureBulletList } from "../components/ArchitectureBulletList";
import { SectionBlock } from "../components/SectionBlock";
import { platformContentBySlug } from "../content";

export function PlatformPage() {
  const { slug } = useParams<{ slug: string }>();
  const content = slug ? platformContentBySlug[slug] : undefined;

  if (!content) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">{content.tagline}</p>
      <h1 className="mt-2 text-3xl font-bold text-slate-900">{content.name}</h1>
      <p className="mt-4 text-lg text-slate-600">{content.heroSummary}</p>

      <div className="mt-8">
        <ArchitectureBulletList bullets={content.architectureBullets} />
      </div>

      {content.sections.map((section) => (
        <SectionBlock key={section.heading} section={section} />
      ))}

      <a
        href={content.learnMoreUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-500"
      >
        Read the official docs →
      </a>
    </div>
  );
}
