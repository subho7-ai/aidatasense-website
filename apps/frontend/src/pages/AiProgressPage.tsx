import { Link } from "react-router-dom";
import { ArchitectureBulletList } from "../components/ArchitectureBulletList";
import { ArticleList } from "../components/ArticleList";
import { NetworkPatternBackground } from "../components/NetworkPatternBackground";
import { SectionBlock } from "../components/SectionBlock";
import { aiProgressContent } from "../content";

export function AiProgressPage() {
  return (
    <div className="relative isolate mx-auto max-w-4xl overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
      <NetworkPatternBackground />
      <Link to="/" className="text-sm font-semibold uppercase tracking-wide text-indigo-600 hover:text-indigo-500">
        {aiProgressContent.tagline}
      </Link>
      <h1 className="mt-2 flex items-center gap-3 text-3xl font-bold text-slate-900">
        {aiProgressContent.logoUrl && <img src={aiProgressContent.logoUrl} alt="" className="h-10 w-auto" />}
        {aiProgressContent.name}
      </h1>
      <p className="mt-4 text-lg text-slate-600">{aiProgressContent.heroSummary}</p>

      <div className="mt-8">
        <ArchitectureBulletList bullets={aiProgressContent.architectureBullets} />
      </div>

      {aiProgressContent.sections.map((section) => (
        <SectionBlock key={section.heading} section={section} />
      ))}

      <div className="border-t border-slate-200 py-8">
        <h2 className="text-2xl font-semibold text-slate-900">Latest across Vertex AI, Azure AI Foundry & AWS Bedrock</h2>
        <div className="mt-6">
          <ArticleList articles={aiProgressContent.articles} />
        </div>
      </div>
    </div>
  );
}
