import { useEffect, useState } from "react";

const NAV_ITEMS = [
  { id: "overview", label: "Overview" },
  { id: "architecture", label: "Architecture" },
  { id: "use-case", label: "Use case" },
];

export function PlatformSideNav() {
  const [activeId, setActiveId] = useState(NAV_ITEMS[0].id);

  useEffect(() => {
    const READING_LINE = 180;
    const intersecting = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            intersecting.add(entry.target.id);
          } else {
            intersecting.delete(entry.target.id);
          }
        });

        // Among currently-intersecting sections, pick whichever one's top edge
        // sits closest to the reading line — avoids misfiring when two
        // adjacent sections' edges both graze the observed band at once.
        let closestId: string | null = null;
        let closestDistance = Infinity;
        for (const id of intersecting) {
          const el = document.getElementById(id);
          if (!el) continue;
          const distance = Math.abs(el.getBoundingClientRect().top - READING_LINE);
          if (distance < closestDistance) {
            closestDistance = distance;
            closestId = id;
          }
        }
        if (closestId) {
          setActiveId(closestId);
        }
      },
      { rootMargin: `-${READING_LINE}px 0px -70% 0px` },
    );

    const elements = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="sticky top-[180px] hidden self-start lg:block">
      <ul className="space-y-2">
        {NAV_ITEMS.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`block border-l-[3px] py-2 pl-4 text-base transition-colors ${
                activeId === item.id
                  ? "border-indigo-600 font-semibold text-indigo-600"
                  : "border-slate-200 text-slate-600 hover:border-slate-300 hover:text-indigo-600"
              }`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
