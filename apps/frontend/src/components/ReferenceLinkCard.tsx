import type { ReferenceLink } from "@aidatasense/shared";

export function ReferenceLinkCard({
  title,
  description,
  url,
  imageUrl,
  className = "mt-6 max-w-md",
  fillHeight = true,
}: ReferenceLink & { className?: string; fillHeight?: boolean }) {
  if (imageUrl) {
    return (
      <div
        className={`${className} ${fillHeight ? "flex h-full flex-col" : ""} rounded-xl border border-slate-200 p-4`}
      >
        <img src={imageUrl} alt={title} className="w-full rounded-lg border border-slate-200" />
        <p className="mt-3 text-sm font-semibold text-slate-900">{title}</p>
        <p className="mt-1 text-sm text-slate-600">{description}</p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={`${fillHeight ? "mt-auto" : "mt-3"} pt-2 inline-flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-500`}
        >
          View the full reference →
        </a>
      </div>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${className} flex items-start gap-4 rounded-xl border border-slate-200 p-4 transition-shadow hover:shadow-md`}
    >
      <svg
        viewBox="0 0 48 48"
        fill="none"
        className="h-10 w-10 shrink-0 rounded-lg bg-indigo-50 p-2 text-indigo-600"
        aria-hidden
      >
        <rect x="6" y="6" width="36" height="36" rx="4" stroke="currentColor" strokeWidth="2.5" />
        <path d="M6 18h36M18 18v24" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        <circle cx="30" cy="30" r="2" stroke="currentColor" strokeWidth="2" />
        <path d="M24 30h9M30 24v12" stroke="currentColor" strokeWidth="2" />
      </svg>
      <div>
        <p className="text-sm font-semibold text-slate-900">{title}</p>
        <p className="mt-1 text-sm text-slate-600">{description}</p>
        <span className="mt-2 inline-flex items-center text-sm font-semibold text-indigo-600">
          View the full reference →
        </span>
      </div>
    </a>
  );
}
