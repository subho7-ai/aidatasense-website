// Stroke icons on a 24×24 grid, shared by the diagrams (SVG) and cards (HTML).

export const DATABRICKS_LOGO = "https://cdn.simpleicons.org/databricks";
export const SNOWFLAKE_LOGO = "https://cdn.simpleicons.org/snowflake";

export type IconName =
  | "user"
  | "users"
  | "folderGit"
  | "play"
  | "commit"
  | "branch"
  | "pullRequest"
  | "check"
  | "rocket"
  | "shieldCheck"
  | "key"
  | "database"
  | "pipeline"
  | "bundle"
  | "chart"
  | "sparkles"
  | "plug"
  | "share"
  | "server"
  | "export"
  | "globe"
  | "app"
  | "code";

function IconPaths({ name }: { name: IconName }) {
  switch (name) {
    case "user":
      return (
        <>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1" />
        </>
      );
    case "users":
      return (
        <>
          <circle cx="9" cy="8" r="3.5" />
          <path d="M2.5 20v-.5A5.5 5.5 0 0 1 8 14h2a5.5 5.5 0 0 1 5.5 5.5v.5" />
          <circle cx="17" cy="9" r="2.6" />
          <path d="M17.5 14a4.5 4.5 0 0 1 4 4.5v.5" />
        </>
      );
    case "folderGit":
      return (
        <>
          <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <circle cx="9.5" cy="13" r="1.4" />
          <circle cx="15" cy="11" r="1.4" />
          <path d="M9.5 11.6V15M15 12.4a3 3 0 0 1-3 3H9.5" />
        </>
      );
    case "play":
      return (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M10 8.5l5.5 3.5-5.5 3.5z" />
        </>
      );
    case "commit":
      return (
        <>
          <circle cx="12" cy="12" r="3.2" />
          <path d="M3 12h5.8M15.2 12H21" />
        </>
      );
    case "branch":
      return (
        <>
          <circle cx="6" cy="5" r="2" />
          <circle cx="6" cy="19" r="2" />
          <circle cx="18" cy="8" r="2" />
          <path d="M6 7v10M18 10a6 6 0 0 1-6 6H8" />
        </>
      );
    case "pullRequest":
      return (
        <>
          <circle cx="6" cy="6" r="2.4" />
          <circle cx="6" cy="18" r="2.4" />
          <circle cx="18" cy="18" r="2.4" />
          <path d="M6 8.4v7.2M18 15.6V9a3 3 0 0 0-3-3h-4M13 3.5L10.5 6 13 8.5" />
        </>
      );
    case "check":
      return (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M8 12.2l2.8 2.8L16.2 9.5" />
        </>
      );
    case "rocket":
      return (
        <>
          <path d="M12 2.8c3.2 2 5 5.8 5 10l-2 3H9l-2-3c0-4.2 1.8-8 5-10z" />
          <circle cx="12" cy="10" r="1.8" />
          <path d="M9.5 19l-1 2.4M14.5 19l1 2.4M12 19v2.6" />
        </>
      );
    case "shieldCheck":
      return (
        <>
          <path d="M12 3l8 3v6c0 4.5-3.4 8.2-8 9-4.6-.8-8-4.5-8-9V6z" />
          <path d="M8.6 12l2.4 2.4 4.4-4.8" />
        </>
      );
    case "key":
      return (
        <>
          <circle cx="8" cy="15" r="4" />
          <path d="M11 12l8.5-8.5M16 7l2.2 2.2M14 9l2 2" />
        </>
      );
    case "database":
      return (
        <>
          <ellipse cx="12" cy="5" rx="8" ry="3" />
          <path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" />
        </>
      );
    case "pipeline":
      return (
        <>
          <rect x="2.5" y="9" width="5" height="6" rx="1.2" />
          <rect x="9.5" y="9" width="5" height="6" rx="1.2" />
          <rect x="16.5" y="9" width="5" height="6" rx="1.2" />
          <path d="M7.5 12h2M14.5 12h2" />
        </>
      );
    case "bundle":
      return (
        <>
          <path d="M12 2.8l8 4.4v9.6l-8 4.4-8-4.4V7.2z" />
          <path d="M4 7.2l8 4.4 8-4.4M12 11.6V21" />
        </>
      );
    case "chart":
      return (
        <>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M8 16v-4M12 16V8M16 16v-6" />
        </>
      );
    case "sparkles":
      return (
        <>
          <path d="M10 3l1.6 4.4L16 9l-4.4 1.6L10 15l-1.6-4.4L4 9l4.4-1.6z" />
          <path d="M18 13l.8 2.2L21 16l-2.2.8L18 19l-.8-2.2L15 16l2.2-.8z" />
        </>
      );
    case "plug":
      return (
        <>
          <path d="M9 3v4M15 3v4M6.5 7h11v4a5.5 5.5 0 0 1-11 0z" />
          <path d="M12 16.5V21" />
        </>
      );
    case "share":
      return (
        <>
          <circle cx="18" cy="5" r="2.6" />
          <circle cx="6" cy="12" r="2.6" />
          <circle cx="18" cy="19" r="2.6" />
          <path d="M8.3 10.8l7.4-4.4M8.3 13.2l7.4 4.4" />
        </>
      );
    case "server":
      return (
        <>
          <rect x="3" y="3" width="18" height="7" rx="1.5" />
          <rect x="3" y="14" width="18" height="7" rx="1.5" />
          <path d="M7 6.5h.01M7 17.5h.01M11 6.5h6M11 17.5h6" />
        </>
      );
    case "export":
      return (
        <>
          <path d="M14 3h7v7M21 3l-9 9" />
          <path d="M19 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5" />
        </>
      );
    case "globe":
      return (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z" />
        </>
      );
    case "app":
      return (
        <>
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="M3 9h18M7 6.5h.01M10 6.5h.01" />
          <path d="M8 13h8M8 16h5" />
        </>
      );
    case "code":
      return (
        <>
          <path d="M8 7l-5 5 5 5M16 7l5 5-5 5M13.5 4l-3 16" />
        </>
      );
  }
}

// HTML icon for cards and lists.
export function Icon({ name, className = "h-5 w-5" }: { name: IconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <IconPaths name={name} />
    </svg>
  );
}

// Icon placed inside an SVG diagram at (x, y), drawn at `size` px.
export function SvgIcon({
  name,
  x,
  y,
  size = 20,
  color,
}: {
  name: IconName;
  x: number;
  y: number;
  size?: number;
  color: string;
}) {
  return (
    <g
      transform={`translate(${x} ${y}) scale(${size / 24})`}
      fill="none"
      stroke={color}
      strokeWidth={1.9}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <IconPaths name={name} />
    </g>
  );
}
