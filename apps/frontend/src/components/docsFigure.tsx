import type { ReactNode } from "react";
import { ZoomableImage } from "./ZoomableImage";

// A credited documentation diagram: zoomable image, caption, and a source link.
export function DocsFigure({
  src,
  alt,
  caption,
  sourceLabel,
  sourceUrl,
  maxWidth = "max-w-3xl",
}: {
  src: string;
  alt: string;
  caption: ReactNode;
  sourceLabel: string;
  sourceUrl: string;
  maxWidth?: string;
}) {
  return (
    <figure className="mt-6 rounded-xl border border-slate-200 bg-white p-4 sm:p-6">
      <ZoomableImage src={src} alt={alt} className={`mx-auto w-full ${maxWidth}`} />
      <figcaption className="mt-4 text-center text-sm text-slate-500">
        {caption}
        <br />
        <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-indigo-600 hover:text-indigo-500">
          Source: {sourceLabel}
        </a>
      </figcaption>
    </figure>
  );
}

export function DiagramCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <figure className="mt-6 rounded-xl border border-slate-200 bg-white p-4 sm:p-6">
      {children}
      <figcaption className="mt-4 text-center text-sm text-slate-500">{title}</figcaption>
    </figure>
  );
}
