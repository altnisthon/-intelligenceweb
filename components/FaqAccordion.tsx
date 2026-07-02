"use client";

import { useState } from "react";
import { faqs } from "@/lib/data";

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div>
      {faqs.map((f, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={f.q}
            className={`border-b border-lavender ${
              isOpen ? "border-l-2 border-l-purple pl-6" : "pl-0"
            }`}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-8 bg-transparent py-6 text-left"
            >
              <span className="font-serif text-lg font-bold text-plum md:text-xl">{f.q}</span>
              <span
                className={`flex-none font-sans text-2xl font-light leading-none text-purple transition-transform ${
                  isOpen ? "rotate-90" : ""
                }`}
              >
                {isOpen ? "\u00d7" : "+"}
              </span>
            </button>
            {isOpen && (
              <p className="max-w-[38rem] pb-7 font-sans text-base font-light leading-[1.8] text-muted">
                {f.a}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
