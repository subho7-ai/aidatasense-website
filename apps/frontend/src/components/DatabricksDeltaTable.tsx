import type { ReactNode } from "react";

// One small story told three ways: an orders table across four commits.
type Action = { kind: "add" | "remove" | "meta"; label: string };
const COMMITS: { version: number; file: string; operation: string; what: string; actions: Action[] }[] = [
  {
    version: 0,
    file: "00000000000000000000.json",
    operation: "CREATE TABLE AS SELECT",
    what: "Table created with orders 1001–1006",
    actions: [
      { kind: "meta", label: "protocol · metaData (schema)" },
      { kind: "add", label: "part-00000.parquet" },
      { kind: "add", label: "part-00001.parquet" },
    ],
  },
  {
    version: 1,
    file: "00000000000000000001.json",
    operation: "WRITE (append)",
    what: "Orders 1007–1008 appended",
    actions: [{ kind: "add", label: "part-00002.parquet" }],
  },
  {
    version: 2,
    file: "00000000000000000002.json",
    operation: "UPDATE",
    what: "Order 1005 marked SHIPPED",
    actions: [
      { kind: "remove", label: "part-00001.parquet" },
      { kind: "add", label: "part-00003.parquet" },
    ],
  },
  {
    version: 3,
    file: "00000000000000000003.json",
    operation: "OPTIMIZE",
    what: "Small files compacted into one",
    actions: [
      { kind: "remove", label: "part-00000.parquet" },
      { kind: "remove", label: "part-00002.parquet" },
      { kind: "remove", label: "part-00003.parquet" },
      { kind: "add", label: "part-00004.parquet" },
    ],
  },
];

const FILES: { name: string; rows: string; activeIn: number[] }[] = [
  { name: "part-00000.parquet", rows: "orders 1001–1003", activeIn: [0, 1, 2] },
  { name: "part-00001.parquet", rows: "orders 1004–1006", activeIn: [0, 1] },
  { name: "part-00002.parquet", rows: "orders 1007–1008", activeIn: [1, 2] },
  { name: "part-00003.parquet", rows: "1004–1006, 1005 updated", activeIn: [2] },
  { name: "part-00004.parquet", rows: "all 8 orders, compacted", activeIn: [3] },
];
const LATEST = 3;

const ROWS = [
  ["1001", "C-17", "DELIVERED", "120.00"],
  ["1002", "C-42", "DELIVERED", "75.50"],
  ["1005", "C-17", "SHIPPED", "310.00"],
  ["1007", "C-08", "PLACED", "42.25"],
  ["…", "", "", ""],
];

const ACTION_TONE: Record<Action["kind"], string> = {
  add: "border-emerald-200 bg-emerald-50 text-emerald-800",
  remove: "border-rose-200 bg-rose-50 text-rose-800",
  meta: "border-slate-200 bg-slate-50 text-slate-600",
};
const ACTION_SIGN: Record<Action["kind"], string> = { add: "+ add", remove: "− remove", meta: "" };

function Card({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <div className="flex flex-col rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{title}</p>
      {subtitle && <p className="font-mono text-xs text-slate-700">{subtitle}</p>}
      <div className="mt-2 flex-1">{children}</div>
    </div>
  );
}

function Code({ title, children }: { title: string; children: string }) {
  return (
    <div className="overflow-hidden rounded-xl bg-slate-900">
      <div className="border-b border-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-wide text-slate-400">{title}</div>
      <pre className="overflow-x-auto p-4 text-xs leading-relaxed text-slate-100">{children}</pre>
    </div>
  );
}

function LogicalPhysicalDiagram() {
  return (
    <figure className="mt-6 rounded-xl border border-slate-200 bg-slate-50/60 p-3 sm:p-5">
      <div className="grid gap-3 lg:grid-cols-[0.9fr_auto_1.35fr_auto_0.85fr]">
        {/* What you query */}
        <Card title="Logical table" subtitle={`prod.sales.orders · version ${LATEST}`}>
          <table className="w-full text-left font-mono text-[11px]">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="py-1 pr-2 font-semibold">order_id</th>
                <th className="py-1 pr-2 font-semibold">customer</th>
                <th className="py-1 pr-2 font-semibold">status</th>
                <th className="py-1 font-semibold">total</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, index) => (
                <tr key={index} className={row[0] === "1005" ? "bg-amber-50 text-amber-900" : "text-slate-700"}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="py-0.5 pr-2">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-2 text-[11px] text-slate-500">
            What a query sees: one table, always consistent. Order 1005 shows its updated status.
          </p>
        </Card>

        <div className="flex items-center justify-center text-xs font-semibold text-slate-500 lg:flex-col">
          <span className="text-lg text-slate-400 lg:hidden">↑</span>
          <span className="hidden text-lg text-slate-400 lg:inline">←</span>
          <span className="ml-2 lg:ml-0">reads</span>
        </div>

        {/* The transaction log */}
        <Card title="Transaction log" subtitle="_delta_log/">
          <ol className="space-y-2">
            {COMMITS.map((commit) => (
              <li key={commit.version} className="rounded-lg border border-indigo-200 bg-indigo-50/40 p-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-indigo-600 px-1.5 py-0.5 font-mono text-[10px] font-bold text-white">
                    v{commit.version}
                  </span>
                  <span className="font-mono text-[11px] text-slate-500">{commit.file}</span>
                </div>
                <p className="mt-1 text-xs text-slate-800">
                  <span className="font-semibold">{commit.operation}</span> — {commit.what}
                </p>
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {commit.actions.map((action) => (
                    <span
                      key={action.label}
                      className={`rounded-full border px-2 py-0.5 font-mono text-[10.5px] ${ACTION_TONE[action.kind]}`}
                    >
                      {ACTION_SIGN[action.kind]} {action.label}
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-2 text-[11px] text-slate-500">
            Every write appends one numbered JSON file of actions. Every 10 commits a checkpoint summarizes the state, so
            readers don&apos;t replay the whole history.
          </p>
        </Card>

        <div className="flex items-center justify-center text-xs font-semibold text-slate-500 lg:flex-col">
          <span className="text-lg text-slate-400 lg:hidden">↑</span>
          <span className="hidden text-lg text-slate-400 lg:inline">←</span>
          <span className="ml-2 lg:ml-0">points to</span>
        </div>

        {/* The data files */}
        <Card title="Data files" subtitle="Parquet in your cloud storage">
          <ul className="space-y-1.5">
            {FILES.map((file) => {
              const active = file.activeIn.includes(LATEST);
              return (
                <li
                  key={file.name}
                  className={`rounded-lg border px-2 py-1.5 ${active ? "border-emerald-300 bg-emerald-50" : "border-slate-200 bg-slate-50"}`}
                >
                  <p className={`font-mono text-[11px] font-semibold ${active ? "text-emerald-800" : "text-slate-400 line-through"}`}>
                    {file.name}
                  </p>
                  <p className="text-[11px] text-slate-500">{file.rows}</p>
                  <p className={`text-[10.5px] font-semibold ${active ? "text-emerald-700" : "text-slate-400"}`}>
                    {active ? `active in v${LATEST}` : `in v${file.activeIn.join(", v")} · kept for time travel`}
                  </p>
                </li>
              );
            })}
          </ul>
        </Card>
      </div>
      <figcaption className="mt-4 text-center text-sm text-slate-500">
        Logical structure vs. physical structure: the table you query is whatever set of Parquet files the transaction
        log says is active at that version.
      </figcaption>
    </figure>
  );
}

function VersionTimeline() {
  return (
    <figure className="mt-6 rounded-xl border border-slate-200 bg-white p-4 sm:p-6">
      <div className="relative">
        <div className="absolute left-0 right-0 top-5 hidden h-0.5 bg-indigo-200 sm:block" aria-hidden />
        <ol className="relative grid gap-4 sm:grid-cols-4">
          {COMMITS.map((commit) => {
            const files = FILES.filter((file) => file.activeIn.includes(commit.version));
            return (
              <li key={commit.version} className="flex flex-col items-start sm:items-center">
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-full font-mono text-sm font-bold ring-4 ring-white ${
                    commit.version === LATEST ? "bg-indigo-600 text-white" : "bg-indigo-100 text-indigo-700"
                  }`}
                >
                  v{commit.version}
                </span>
                <p className="mt-2 text-sm font-semibold text-slate-900 sm:text-center">{commit.operation}</p>
                <div className="mt-2 flex flex-wrap gap-1 sm:justify-center">
                  {files.map((file) => (
                    <span key={file.name} className="rounded-md border border-slate-200 bg-slate-50 px-1.5 py-0.5 font-mono text-[10.5px] text-slate-700">
                      {file.name.replace(".parquet", "")}
                    </span>
                  ))}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
      <figcaption className="mt-4 text-center text-sm text-slate-500">
        Each version is a different set of files. Query any of them by version number or timestamp — until VACUUM
        deletes the files an old version needs.
      </figcaption>
    </figure>
  );
}

export function DatabricksDeltaTable() {
  return (
    <div className="border-t border-slate-200 py-8">
      <h2 className="text-2xl font-semibold text-slate-900">What Is a Delta Table</h2>
      <p className="mt-3 text-slate-600">
        A Delta table is the open storage format that makes the lakehouse possible: a set of Parquet files plus a
        transaction log that together add database-like guarantees to data sitting in ordinary cloud storage, with no
        separate database required.
      </p>
      <ul className="mt-3 space-y-1.5 text-slate-600">
        {[
          ["ACID transactions", "safe concurrent reads and writes, no partial or corrupted data"],
          ["Schema enforcement", "bad or mismatched data gets rejected, not silently written"],
          ["Time travel", "query or roll back to a previous version of a table"],
        ].map(([term, rest]) => (
          <li key={term} className="flex gap-2">
            <span className="text-indigo-500">•</span>
            <span>
              <strong className="font-semibold text-slate-900">{term}</strong> — {rest}
            </span>
          </li>
        ))}
      </ul>

      <h3 className="mt-8 text-lg font-semibold text-slate-900">Inside a Delta table: the transaction log</h3>
      <p className="mt-3 text-slate-600">
        The guarantees come from the <span className="font-mono text-sm">_delta_log/</span> folder that sits next to
        the data files. Every change — an insert, an update, a compaction — is written as one new, numbered commit file
        listing which Parquet files to <strong className="font-semibold text-emerald-700">add</strong> and which to{" "}
        <strong className="font-semibold text-rose-700">remove</strong>. Files are never changed in place; a commit
        either lands completely or not at all, which is what makes writes atomic. Follow one orders table through four
        commits:
      </p>
      <LogicalPhysicalDiagram />

      <h3 className="mt-8 text-lg font-semibold text-slate-900">Every version, on demand</h3>
      <p className="mt-3 text-slate-600">
        Because old files are only <em>marked</em> as removed, every earlier version can still be rebuilt from the log.
        That is time travel — and it is also how a bad change is undone.
      </p>
      <VersionTimeline />

      <h3 className="mt-8 text-lg font-semibold text-slate-900">What&apos;s actually in the log</h3>
      <div className="mt-3 grid gap-4 lg:grid-cols-2">
        <Code title="_delta_log/…0002.json · the UPDATE commit (abridged)">{`{"commitInfo":{"timestamp":1759741200000,"operation":"UPDATE",
  "operationParameters":{"predicate":"[\\"(order_id = 1005)\\"]"}}}
{"remove":{"path":"part-00001.parquet",
  "deletionTimestamp":1759741200000,"dataChange":true}}
{"add":{"path":"part-00003.parquet","partitionValues":{},
  "size":2104,"modificationTime":1759741200000,"dataChange":true,
  "stats":"{\\"numRecords\\":3,
    \\"minValues\\":{\\"order_id\\":1004},
    \\"maxValues\\":{\\"order_id\\":1006}}"}}`}</Code>
        <div className="flex flex-col gap-4">
          <Code title="Time travel and history">{`DESCRIBE HISTORY prod.sales.orders;

SELECT * FROM prod.sales.orders VERSION AS OF 1;
SELECT * FROM prod.sales.orders TIMESTAMP AS OF '2026-10-06 09:00';

-- Undo a bad change by going back to a known-good version
RESTORE TABLE prod.sales.orders TO VERSION AS OF 1;`}</Code>
          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="px-3 py-2 font-semibold">version</th>
                  <th className="px-3 py-2 font-semibold">operation</th>
                  <th className="px-3 py-2 font-semibold">operationMetrics (abridged)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-slate-700">
                {[
                  ["3", "OPTIMIZE", "numAddedFiles: 1, numRemovedFiles: 3"],
                  ["2", "UPDATE", "numUpdatedRows: 1, numAddedFiles: 1, numRemovedFiles: 1"],
                  ["1", "WRITE", "numFiles: 1, numOutputRows: 2"],
                  ["0", "CREATE TABLE AS SELECT", "numFiles: 2, numOutputRows: 6"],
                ].map(([version, operation, metrics]) => (
                  <tr key={version}>
                    <td className="px-3 py-1.5">{version}</td>
                    <td className="px-3 py-1.5">{operation}</td>
                    <td className="px-3 py-1.5">{metrics}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="border-t border-slate-100 px-3 py-1.5 text-[11px] text-slate-500">DESCRIBE HISTORY output, newest first</p>
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <p className="rounded-lg border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-900">
          <strong className="font-semibold">The stats matter.</strong> Each <span className="font-mono text-xs">add</span>{" "}
          records per-column minimum and maximum values, so a query filtering on{" "}
          <span className="font-mono text-xs">order_id = 1007</span> can skip every file whose range doesn&apos;t include
          it — the same idea as Snowflake&apos;s micro-partition pruning.
        </p>
        <p className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          <strong className="font-semibold">Two things to know.</strong> With deletion vectors — on by default for new
          tables in Databricks — an UPDATE or DELETE marks changed rows in a small side file instead of rewriting the
          whole Parquet file. And <span className="font-mono text-xs">VACUUM</span> permanently deletes removed files
          older than the retention period (7 days by default), after which those versions can no longer be read.
        </p>
      </div>
    </div>
  );
}
