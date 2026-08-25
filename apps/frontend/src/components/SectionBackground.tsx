import type { CSSProperties } from "react";
import { sectionBackgrounds } from "../config/sectionBackgrounds";

/**
 * Faint, decorative background layer for a platform-page section. Looked up from
 * sectionBackgrounds by `${platformSlug}-${sectionId}` — renders nothing if that
 * key has no entry, so platforms/sections without a configured background are
 * unaffected. Pair with `relative isolate overflow-hidden` on the section's own
 * wrapper (plain `relative` alone doesn't create the stacking context this needs).
 */
export function SectionBackground({ platformSlug, sectionId }: { platformSlug: string; sectionId: string }) {
  const config = sectionBackgrounds[`${platformSlug}-${sectionId}`];
  if (!config) return null;

  const style: CSSProperties = config.image
    ? {
        backgroundImage: `${config.overlayGradient}, url(${config.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: config.blend ?? "normal",
        opacity: config.opacity,
        filter:
          [config.grayscale ? `grayscale(${config.grayscale}%)` : "", config.blurPx ? `blur(${config.blurPx}px)` : ""]
            .filter(Boolean)
            .join(" ") || undefined,
      }
    : {
        backgroundImage: config.overlayGradient,
        opacity: config.opacity,
      };

  return <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10" style={style} />;
}
