import { useState } from "react";
import type { AccordionItem } from "@aidatasense/shared";

export function Accordion({ items }: { items: AccordionItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mt-4 divide-y divide-slate-200 rounded-xl border border-slate-200">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.title}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold text-slate-900"
            >
              {item.title}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`ml-4 h-4 w-4 shrink-0 text-indigo-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {isOpen && <p className="px-4 pb-4 text-sm text-slate-600">{item.body}</p>}
          </div>
        );
      })}
    </div>
  );
}
