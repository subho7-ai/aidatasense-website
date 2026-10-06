import { Link } from "react-router-dom";
import anthropicIcon from "../assets/ai-anthropic.svg";
import bedrockIcon from "../assets/ai-aws-bedrock.svg";
import foundryIcon from "../assets/ai-azure-foundry.svg";
import vertexIcon from "../assets/ai-google-vertex-ai.svg";
import fabricLogo from "../assets/microsoft-fabric-logo.png";
import { DATABRICKS_LOGO, SNOWFLAKE_LOGO } from "./diagramIcons";

type Tile = { name: string; provider?: string; icon: string; to: string };

const DATA_TILES: Tile[] = [
  { name: "Databricks", icon: DATABRICKS_LOGO, to: "/platforms/databricks" },
  { name: "Snowflake", icon: SNOWFLAKE_LOGO, to: "/platforms/snowflake" },
  { name: "Fabric", provider: "Microsoft", icon: fabricLogo, to: "/platforms/azure-fabric" },
];

const AI_TILES: Tile[] = [
  { name: "Claude", provider: "Anthropic", icon: anthropicIcon, to: "/ai-landscape" },
  { name: "Bedrock", provider: "AWS", icon: bedrockIcon, to: "/ai-landscape" },
  { name: "Vertex AI", provider: "Google Cloud", icon: vertexIcon, to: "/ai-landscape" },
  { name: "AI Foundry", provider: "Azure", icon: foundryIcon, to: "/ai-landscape" },
];

function TileGroup({ label, tiles, tone }: { label: string; tiles: Tile[]; tone: "data" | "ai" }) {
  const styles =
    tone === "data"
      ? "border-indigo-200 bg-white hover:border-indigo-400 focus-visible:ring-indigo-500"
      : "border-violet-200 bg-white hover:border-violet-400 focus-visible:ring-violet-500";
  return (
    <div className={`rounded-2xl border p-3 ${tone === "data" ? "border-indigo-100 bg-indigo-50/70" : "border-violet-100 bg-violet-50/70"}`}>
      <p className={`text-center text-xs font-semibold uppercase tracking-wide ${tone === "data" ? "text-indigo-600" : "text-violet-600"}`}>
        {label}
      </p>
      <div className={`mt-2 grid gap-2 ${tiles.length === 4 ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-3"}`}>
        {tiles.map((tile) => (
          <Link
            key={tile.name}
            to={tile.to}
            className={`flex flex-col items-center gap-1.5 rounded-xl border px-2 py-3 text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 ${styles}`}
          >
            <img src={tile.icon} alt="" className="h-8 w-8 object-contain" />
            <span className="text-xs font-semibold text-slate-900 sm:text-sm">{tile.name}</span>
            {tile.provider && <span className="-mt-1 text-[10px] text-slate-500">{tile.provider}</span>}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function HeroStackGraphic() {
  return (
    <div className="mx-auto mt-8 grid max-w-4xl items-stretch gap-3 md:grid-cols-[3fr_auto_4fr]">
      <TileGroup label="Data platforms" tiles={DATA_TILES} tone="data" />
      <div className="flex items-center justify-center text-2xl font-light text-slate-400" aria-hidden>
        +
      </div>
      <TileGroup label="AI platforms" tiles={AI_TILES} tone="ai" />
    </div>
  );
}
