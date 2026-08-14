import type { PlatformContent } from "@aidatasense/shared";
import { Link } from "react-router-dom";

export function PlatformSection({ content }: { content: PlatformContent }) {
  const to = content.slug === "ai-progress" ? "/ai-progress" : `/platforms/${content.slug}`;

  return (
    <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <h3 className="text-xl font-semibold text-slate-900">{content.name}</h3>
      <p className="mt-1 text-sm font-medium text-indigo-600">{content.tagline}</p>
      <p className="mt-3 text-sm text-slate-600">{content.heroSummary}</p>
      <ul className="mt-4 space-y-1.5 text-sm text-slate-600">
        {content.architectureBullets.slice(0, 3).map((bullet) => (
          <li key={bullet} className="flex gap-2">
            <span className="text-indigo-500">•</span>
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
      <Link
        to={to}
        className="mt-auto pt-5 inline-flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-500"
      >
        Learn more →
      </Link>
    </div>
  );
}
