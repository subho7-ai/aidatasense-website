import type { ArchitectureLayer } from "@aidatasense/shared";

export function ArchitectureDiagram({ layers }: { layers: ArchitectureLayer[] }) {
  return (
    <div className="flex flex-col items-stretch">
      {layers.map((layer, index) => (
        <div key={layer.title}>
          <div className="rounded-xl border border-indigo-200 bg-indigo-50 px-5 py-4">
            <p className="text-sm font-semibold text-indigo-700">{layer.title}</p>
            <p className="mt-1 text-sm text-slate-600">{layer.description}</p>
          </div>
          {index < layers.length - 1 && (
            <div className="flex justify-center py-1 text-indigo-400" aria-hidden>
              ↓
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
