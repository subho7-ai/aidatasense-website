import type { ReactNode } from "react";
import { Icon, type IconName } from "./diagramIcons";

// Shared "Data Governance" section used by each platform page (Databricks, Snowflake, …).

export type GovernanceLevel = { level: string; scope: string; control: string; icon: IconName };
export type CodeSample = { title: string; code: string };
export type EncryptionCard = { title: string; icon: IconName; points: string[] };

export type GovernanceConfig = {
  /** The service that enforces governance, e.g. "Unity Catalog". */
  service: string;
  serviceLogo: string;
  serviceWhere: string;
  intro: ReactNode;
  levels: GovernanceLevel[];
  rbacIntro: ReactNode;
  rbacFigure?: ReactNode;
  rbacPoints: [string, string][];
  rbacCode: CodeSample;
  encryptionIntro: ReactNode;
  encryption: EncryptionCard[];
  decryption: ReactNode;
  encryptionCode: CodeSample;
  /** Rows for the PII / PHI / PCI table: [type, examples, what it needs, how this platform handles it]. */
  sensitiveRows: string[][];
  sensitiveCode: CodeSample[];
  compliance: ReactNode;
  audit: ReactNode;
  ruleOfThumb: ReactNode;
  /** Override the default caption under the levels diagram. */
  levelsCaption?: ReactNode;
};

const LEVEL_TONES = [
  "border-slate-300 bg-slate-100 text-slate-800",
  "border-indigo-200 bg-indigo-50 text-indigo-800",
  "border-sky-200 bg-sky-50 text-sky-800",
  "border-cyan-200 bg-cyan-50 text-cyan-800",
  "border-emerald-200 bg-emerald-50 text-emerald-800",
  "border-amber-200 bg-amber-50 text-amber-800",
  "border-rose-200 bg-rose-50 text-rose-800",
];

// An inverted pyramid: the widest level (account) on top, narrowing to a single column or row.
function LevelsDiagram({
  levels,
  service,
  caption,
}: {
  levels: GovernanceLevel[];
  service: string;
  caption?: ReactNode;
}) {
  return (
    <figure className="mt-6 rounded-xl border border-slate-200 bg-white p-4 sm:p-6">
      <div className="flex flex-col items-center gap-1.5">
        {levels.map((level, index) => {
          const width = 100 - index * (45 / Math.max(levels.length - 1, 1));
          return (
            <div
              key={level.level}
              className={`flex w-full flex-col gap-1 rounded-lg border px-3 py-2 sm:flex-row sm:items-center sm:justify-between ${LEVEL_TONES[index % LEVEL_TONES.length]}`}
              style={{ maxWidth: `${width}%` }}
            >
              <div className="flex items-center gap-2">
                <Icon name={level.icon} className="h-4 w-4 shrink-0" />
                <span className="text-sm font-semibold">{level.level}</span>
                <span className="hidden text-xs opacity-75 md:inline">· {level.scope}</span>
              </div>
              <span className="text-xs font-medium sm:text-right">{level.control}</span>
            </div>
          );
        })}
      </div>
      <figcaption className="mt-4 text-center text-sm text-slate-500">
        {caption ?? (
          <>Control at every level, from the whole account down to a single row or column — all enforced by {service}.</>
        )}
      </figcaption>
    </figure>
  );
}

function Code({ sample }: { sample: CodeSample }) {
  return (
    <div className="overflow-hidden rounded-xl bg-slate-900">
      <div className="border-b border-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
        {sample.title}
      </div>
      <pre className="overflow-x-auto p-4 text-xs leading-relaxed text-slate-100">{sample.code}</pre>
    </div>
  );
}

const SENSITIVE_BADGES: Record<string, string> = {
  PII: "bg-sky-100 text-sky-800",
  PHI: "bg-emerald-100 text-emerald-800",
  PCI: "bg-rose-100 text-rose-800",
};

export function GovernanceSection({ platform, config }: { platform: string; config: GovernanceConfig }) {
  return (
    <div id="governance" className="scroll-mt-[180px] border-t border-slate-200 py-8">
      <h2 className="text-2xl font-semibold text-slate-900">Data Governance</h2>
      <p className="mt-3 text-slate-600">{config.intro}</p>

      <div className="mt-6 flex flex-col gap-3 rounded-xl border border-indigo-200 bg-indigo-50/60 p-4 sm:flex-row sm:items-center">
        <img src={config.serviceLogo} alt="" className="h-10 w-10 shrink-0" />
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">Who manages it</p>
          <p className="font-semibold text-slate-900">{config.service}</p>
          <p className="text-sm text-slate-600">{config.serviceWhere}</p>
        </div>
      </div>

      <h3 className="mt-8 text-lg font-semibold text-slate-900">At what level</h3>
      <p className="mt-3 text-slate-600">
        Governance in {platform} is layered. Each level below can be secured on its own, and controls set higher up
        flow down to everything beneath them.
      </p>
      <LevelsDiagram levels={config.levels} service={config.service} caption={config.levelsCaption} />

      <h3 className="mt-8 text-lg font-semibold text-slate-900">Access control (RBAC)</h3>
      <p className="mt-3 text-slate-600">{config.rbacIntro}</p>
      {config.rbacFigure}
      <ul className="mt-4 space-y-2 text-slate-600">
        {config.rbacPoints.map(([title, body]) => (
          <li key={title} className="flex gap-2">
            <span className="text-indigo-500">•</span>
            <span>
              <strong className="font-semibold text-slate-900">{title}</strong> — {body}
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <Code sample={config.rbacCode} />
      </div>

      <h3 className="mt-8 text-lg font-semibold text-slate-900">Encryption and decryption</h3>
      <p className="mt-3 text-slate-600">{config.encryptionIntro}</p>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {config.encryption.map((card) => (
          <div key={card.title} className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex items-center gap-2 text-indigo-700">
              <Icon name={card.icon} className="h-5 w-5" />
              <p className="font-semibold">{card.title}</p>
            </div>
            <ul className="mt-2 space-y-1.5 text-sm text-slate-600">
              {card.points.map((point) => (
                <li key={point} className="flex gap-2">
                  <span className="text-indigo-500">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
        <p className="font-semibold text-slate-900">How decryption works</p>
        <p className="mt-1">{config.decryption}</p>
      </div>
      <div className="mt-4">
        <Code sample={config.encryptionCode} />
      </div>

      <h3 className="mt-8 text-lg font-semibold text-slate-900">Handling PII, PHI, and PCI data</h3>
      <p className="mt-3 text-slate-600">
        Not all sensitive data is equal. Personal data, health data, and payment card data each come with their own
        rules — and each needs a different mix of the controls above.
      </p>
      <div className="mt-4 grid gap-3 lg:grid-cols-3">
        {config.sensitiveRows.map(([type, examples, needs, how]) => (
          <div key={type} className="flex flex-col rounded-xl border border-slate-200 bg-white p-4">
            <span className={`w-fit rounded-full px-2.5 py-0.5 text-xs font-bold ${SENSITIVE_BADGES[type.split(" ")[0]] ?? "bg-slate-100 text-slate-800"}`}>
              {type}
            </span>
            <p className="mt-2 text-xs text-slate-500">{examples}</p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-500">What it needs</p>
            <p className="text-sm text-slate-700">{needs}</p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-indigo-600">How {platform} handles it</p>
            <p className="text-sm text-slate-700">{how}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        {config.sensitiveCode.map((sample) => (
          <Code key={sample.title} sample={sample} />
        ))}
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4 text-sm text-slate-700">
          <p className="flex items-center gap-2 font-semibold text-emerald-800">
            <Icon name="shieldCheck" className="h-4 w-4" /> Compliance
          </p>
          <p className="mt-1">{config.compliance}</p>
        </div>
        <div className="rounded-xl border border-sky-200 bg-sky-50/60 p-4 text-sm text-slate-700">
          <p className="flex items-center gap-2 font-semibold text-sky-800">
            <Icon name="chart" className="h-4 w-4" /> Audit
          </p>
          <p className="mt-1">{config.audit}</p>
        </div>
      </div>

      <p className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
        <strong className="font-semibold">Rule of thumb:</strong> {config.ruleOfThumb}
      </p>
    </div>
  );
}
