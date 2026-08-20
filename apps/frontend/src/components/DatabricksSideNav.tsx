import { useEffect, useState } from "react";

const NAV_ITEMS = [
  { id: "overview", label: "Overview" },
  { id: "architecture", label: "Architecture" },
  { id: "use-case", label: "Use case" },
];

export function DatabricksSideNav() {
  const [activeId, setActiveId] = useState(NAV_ITEMS[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-180px 0px -70% 0px" },
    );

    const elements = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="sticky top-[180px] hidden self-start lg:block">
      <ul className="space-y-1">
        {NAV_ITEMS.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`block border-l-2 py-1.5 pl-4 text-sm transition-colors ${
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
