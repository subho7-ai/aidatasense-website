import { Link } from "react-router-dom";

type Tile = { name: string; to?: string };

const PLATFORM_TILES: Tile[] = [
  { name: "Databricks", to: "/platforms/databricks" },
  { name: "Snowflake", to: "/platforms/snowflake" },
  { name: "Fabric", to: "/platforms/azure-fabric" },
];
const REPORTING_TILES: Tile[] = [{ name: "Tableau" }, { name: "Power BI" }, { name: "Looker" }];

function TileRow({
  label,
  tiles,
  tileClassName,
  linkClassName = "",
}: {
  label: string;
  tiles: Tile[];
  tileClassName: string;
  linkClassName?: string;
}) {
  return (
    <div>
      <p className="text-center text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</p>
      <div className="mt-2 grid grid-cols-3 gap-2 sm:gap-3">
        {tiles.map((tile) => {
          const className = `rounded-xl border px-2 py-3 text-center text-xs font-semibold sm:px-4 sm:py-4 sm:text-sm ${tileClassName}`;
          return tile.to ? (
            <Link key={tile.name} to={tile.to} className={`${className} ${linkClassName}`}>
              {tile.name}
            </Link>
          ) : (
            <div key={tile.name} className={className}>
              {tile.name}
            </div>
          );
        })}
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
        linkClassName="transition hover:-translate-y-0.5 hover:border-indigo-400 hover:bg-indigo-100 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
      />
      <TileRow
        label="Reporting"
        tiles={REPORTING_TILES}
        tileClassName="border-teal-200 bg-teal-50 text-teal-700"
      />
    </div>
  );
}
