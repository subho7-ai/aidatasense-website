import type { ComparisonTableData } from "@aidatasense/shared";

export function ComparisonTable({
  title,
  headers,
  rows,
  embedded = false,
}: ComparisonTableData & { embedded?: boolean }) {
  return (
    <div className={embedded ? "mt-6" : "border-t border-slate-200 py-8"}>
      {embedded ? (
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      ) : (
        <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
      )}
      <div className={`${embedded ? "mt-3" : "mt-6"} overflow-x-auto rounded-xl border border-slate-200`}>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50">
            <tr>
              {headers.map((header) => (
                <th key={header} className="px-4 py-3 font-semibold text-slate-900">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {rows.map((row) => (
              <tr key={row[0]}>
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={cellIndex === 0 ? "px-4 py-3 font-medium text-slate-900" : "px-4 py-3 text-slate-600"}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
