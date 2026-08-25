import type { PlatformContent } from "@aidatasense/shared";
import { Link } from "react-router-dom";
import dataIntelligencePlatformDiagram from "../assets/data-intelligence-platform-diagram.png";

export function PlatformSection({ content }: { content: PlatformContent }) {
  const to = content.slug === "ai-progress" ? "/ai-progress" : `/platforms/${content.slug}`;
  const isDatabricks = content.slug === "databricks";
  const isSnowflake = content.slug === "snowflake";
  // Fabric's logo is a much lighter pastel teal than Snowflake's/agentic AI's icons, so it
  // needs a higher opacity to read as equally visible at a glance.
  const logoWatermarkOpacity = content.slug === "azure-fabric" ? 0.22 : 0.1;

  return (
    <div className="relative isolate flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      {isDatabricks && (
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(99,102,241,0.4), rgba(255,255,255,0.1)), url(${dataIntelligencePlatformDiagram})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundBlendMode: "multiply",
            opacity: 0.3,
            filter: "grayscale(60%) blur(14px)",
          }}
        />
      )}
      {!isDatabricks && content.logoUrl && (
        <img
          src={content.logoUrl}
          alt=""
          aria-hidden="true"
          className={`pointer-events-none absolute -z-10 h-auto ${
            isSnowflake
              ? "left-1/2 top-1/2 w-[190px] -translate-x-1/2 -translate-y-1/2"
              : "bottom-3 right-3 w-[130px]"
          }`}
          style={{ opacity: logoWatermarkOpacity, mixBlendMode: "multiply" }}
        />
      )}
      <h3 className="flex items-center text-xl font-semibold text-slate-900">
        {content.logoUrl ? (
          <img src={content.logoUrl} alt={content.name} className="h-7 w-auto" />
        ) : (
          content.name
        )}
      </h3>
      <Link to={to} className="mt-1 text-sm font-medium text-indigo-600 hover:text-indigo-500">
        {content.tagline}
      </Link>
      {content.slug !== "databricks" && <p className="mt-3 text-sm text-slate-600">{content.heroSummary}</p>}
      {content.architectureBullets.length > 0 && (
        <ul className="mt-4 space-y-1.5 text-sm text-slate-600">
          {content.architectureBullets.map((bullet) => {
            const colonIndex = bullet.indexOf(":");
            const label = colonIndex !== -1 ? bullet.slice(0, colonIndex) : null;
            const rest = colonIndex !== -1 ? bullet.slice(colonIndex + 1) : bullet;
            return (
              <li key={bullet} className="flex gap-2">
                <span className="text-indigo-500">•</span>
                <span>
                  {label && <strong className="font-semibold text-slate-900">{label}:</strong>}
                  {rest}
                </span>
              </li>
            );
          })}
        </ul>
      )}
      <Link
        to={to}
        className={`inline-flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-500 ${
          content.slug === "databricks" ? "mt-5" : "mt-auto pt-5"
        }`}
      >
        Learn more →
      </Link>
    </div>
  );
}
