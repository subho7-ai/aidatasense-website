import type { ContentSection } from "@aidatasense/shared";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ComparisonTable } from "./ComparisonTable";
import { ReferenceLinkCard } from "./ReferenceLinkCard";
import { ZoomableImage } from "./ZoomableImage";

// Renders the small inline markup allowed in body text: **bold** and
// [label](url) links, where the label may itself be **bold**.
function renderInline(text: string): ReactNode[] {
  const pattern = /\[(\*\*)?(.+?)\1\]\((.+?)\)|\*\*(.+?)\*\*/g;
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  for (const match of text.matchAll(pattern)) {
    const [whole, boldLabel, label, url, boldText] = match;
    nodes.push(text.slice(lastIndex, match.index));
    if (url) {
      nodes.push(
        <a
          key={match.index}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={`text-indigo-600 underline decoration-indigo-300 underline-offset-2 hover:text-indigo-500 ${
            boldLabel ? "font-semibold" : ""
          }`}
        >
          {label}
        </a>,
      );
    } else {
      nodes.push(
        <strong key={match.index} className="font-semibold text-slate-900">
          {boldText}
        </strong>,
      );
    }
    lastIndex = match.index + whole.length;
  }
  nodes.push(text.slice(lastIndex));
  return nodes;
}

export function SectionBlock({ section }: { section: ContentSection }) {
  const bodyContent = Array.isArray(section.body) ? (
    section.body.map((paragraph, index) => (
      <p key={index} className="mt-3 text-slate-600">
        {renderInline(paragraph)}
      </p>
    ))
  ) : (
    section.body && <p className="mt-3 text-slate-600">{renderInline(section.body)}</p>
  );

  const sideBySideImage = section.imageSideBySide && section.imageUrl;
  const sideBySideDiagram = section.diagramSideBySide && section.diagram;

  return (
    <div className="border-t border-slate-200 py-8">
      {!sideBySideDiagram && <h2 className="text-2xl font-semibold text-slate-900">{section.heading}</h2>}
      {!sideBySideImage && !sideBySideDiagram && bodyContent}
      {sideBySideImage && (
        <div className="mt-4 grid gap-6 sm:grid-cols-2">
          <ZoomableImage
            src={section.imageUrl!}
            alt={section.heading}
            className="w-full rounded-xl border border-slate-200"
          />
          <div className="[&>p:first-child]:mt-0">{bodyContent}</div>
        </div>
      )}
      {sideBySideDiagram && (
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            {section.diagram!.imageUrl && (
              <ZoomableImage
                src={section.diagram!.imageUrl}
                alt={section.diagram!.title}
                className="w-full rounded-xl border border-slate-200"
              />
            )}
            <h2 className="mt-3 text-center text-base font-normal text-slate-700">{section.heading}</h2>
          </div>
          <div className="[&>p:first-child]:mt-0">
            {bodyContent}
            {section.diagramBrief && <p className="mt-3 text-slate-600">{section.diagramBrief}</p>}
          </div>
        </div>
      )}
      {section.diagram && !sideBySideDiagram && (
        <div className="mt-4 grid gap-6 sm:grid-cols-2">
          <ReferenceLinkCard {...section.diagram} className="mt-0 max-w-none" />
          {section.diagramBrief && <p className="text-slate-600">{section.diagramBrief}</p>}
        </div>
      )}
      {!section.diagram && !sideBySideImage && section.imageUrl && (
        section.imageZoomable ? (
          <div className="mt-4">
            <ZoomableImage
              src={section.imageUrl}
              alt={section.imageCaption ?? section.heading}
              className="w-full rounded-xl border border-slate-200"
            />
          </div>
        ) : (
          <img src={section.imageUrl} alt={section.heading} className="mt-4 w-full rounded-xl border border-slate-200" />
        )
      )}
      {!section.diagram && !sideBySideImage && section.imageCaption && (
        <p className="mt-2 text-sm font-semibold text-slate-900">{section.imageCaption}</p>
      )}
      {section.internalLink && (
        <Link
          to={section.internalLink.to}
          className="mt-3 inline-flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-500"
        >
          {section.internalLink.label}
        </Link>
      )}
      {section.diagramAttribution && (
        <a
          href={section.diagramAttribution.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-500 ${
            section.imageCaption ? "mt-1" : "mt-3"
          }`}
        >
          {section.diagramAttribution.label}
        </a>
      )}
      {section.bullets && (
        <ul className="mt-3 space-y-1.5 text-slate-600">
          {section.bullets.map((bullet) => {
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
      )}
      {section.integrations && (
        <>
          <div className="mt-4 flex flex-wrap gap-2">
            {section.integrations.categories.map((category) => (
              <a
                key={category.label}
                href={category.url}
                target="integrations-docs"
                className="rounded-full border border-indigo-200 bg-white px-4 py-1.5 text-sm font-semibold text-indigo-700 shadow-sm transition-colors hover:bg-indigo-50"
              >
                {category.label}
              </a>
            ))}
          </div>
          <a
            href={section.integrations.viewAllUrl}
            target="integrations-docs"
            className="mt-4 inline-flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-500"
          >
            View all integrations →
          </a>
          {section.integrations.callout && (
            <div className="mt-4 rounded-xl border border-indigo-200 bg-indigo-50/50 p-4">
              <p className="text-sm font-semibold text-slate-900">{section.integrations.callout.title}</p>
              <p className="mt-1 text-sm text-slate-600">{section.integrations.callout.body}</p>
            </div>
          )}
        </>
      )}
      {section.comparisonTable && <ComparisonTable {...section.comparisonTable} embedded />}
    </div>
  );
}
