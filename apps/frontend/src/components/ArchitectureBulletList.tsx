export function ArchitectureBulletList({ bullets }: { bullets: string[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {bullets.map((bullet) => (
        <li
          key={bullet}
          className="flex gap-2 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700"
        >
          <span className="text-indigo-500">•</span>
          <span>{bullet}</span>
        </li>
      ))}
    </ul>
  );
}
