import type { ContentSection } from "@aidatasense/shared";

export function SectionBlock({ section }: { section: ContentSection }) {
  return (
    <div className="border-t border-slate-200 py-8">
      <h2 className="text-2xl font-semibold text-slate-900">{section.heading}</h2>
      <p className="mt-3 text-slate-600">{section.body}</p>
    </div>
  );
}
