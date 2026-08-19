import type { ContentSection } from "@aidatasense/shared";
import { ReferenceLinkCard } from "./ReferenceLinkCard";

export function SectionBlock({ section }: { section: ContentSection }) {
  return (
    <div className="border-t border-slate-200 py-8">
      <h2 className="text-2xl font-semibold text-slate-900">{section.heading}</h2>
      <p className="mt-3 text-slate-600">{section.body}</p>
      {section.diagram && (
        <div className="mt-4 grid gap-6 sm:grid-cols-2">
          <ReferenceLinkCard {...section.diagram} className="mt-0 max-w-none" />
          {section.diagramBrief && <p className="text-slate-600">{section.diagramBrief}</p>}
        </div>
      )}
      {!section.diagram && section.imageUrl && (
        <img src={section.imageUrl} alt={section.heading} className="mt-4 w-full rounded-xl border border-slate-200" />
      )}
      {section.bullets && (
        <ul className="mt-3 space-y-1.5 text-slate-600">
          {section.bullets.map((bullet) => (
            <li key={bullet} className="flex gap-2">
              <span className="text-indigo-500">•</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
