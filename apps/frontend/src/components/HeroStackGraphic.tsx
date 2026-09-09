const PLATFORM_TILES = ["Databricks", "Snowflake", "Fabric"];
const REPORTING_TILES = ["Tableau", "Power BI", "Looker"];

function TileRow({
  label,
  tiles,
  tileClassName,
}: {
  label: string;
  tiles: string[];
  tileClassName: string;
}) {
  return (
    <div>
      <p className="text-center text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</p>
      <div className="mt-2 grid grid-cols-3 gap-2 sm:gap-3">
        {tiles.map((tile) => (
          <div
            key={tile}
            className={`rounded-xl border px-2 py-3 text-center text-xs font-semibold sm:px-4 sm:py-4 sm:text-sm ${tileClassName}`}
          >
            {tile}
          </div>
        ))}
      </div>
    </div>
  );
}

export function HeroStackGraphic() {
  return (
    <div className="mx-auto mt-8 max-w-md space-y-4">
      <TileRow
        label="Data platforms"
        tiles={PLATFORM_TILES}
        tileClassName="border-indigo-200 bg-indigo-50 text-indigo-700"
      />
      <TileRow
        label="Reporting"
        tiles={REPORTING_TILES}
        tileClassName="border-teal-200 bg-teal-50 text-teal-700"
      />
    </div>
  );
}
