/**
 * Faint, decorative network-pattern layer for a full page. Pair with
 * `relative isolate overflow-hidden` on the page's outer wrapper — plain
 * `relative` alone doesn't create the stacking context this needs.
 */
export function NetworkPatternBackground() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 -z-10 bg-repeat opacity-[0.1] [background-image:url('/assets/hero-network-pattern.svg')] [background-size:800px_600px]"
    />
  );
}
