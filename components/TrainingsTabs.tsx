"use client";

import { useState } from "react";
import { individualJourneys, workshops, type Programme } from "@/lib/data";
import Chip from "./Chip";

export default function TrainingsTabs() {
  const [tab, setTab] = useState<0 | 1>(0);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const programmes: Programme[] = tab === 0 ? individualJourneys : workshops;

  const tabClass = (active: boolean) =>
    `flex-1 border-none px-6 py-[18px] font-sans text-xs font-medium uppercase tracking-[0.1em] transition-colors ${
      active ? "bg-purple text-offwhite" : "bg-lavender text-plum hover:bg-lavender/70"
    }`;

  const toggle = (key: string) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div>
      <div className="mb-10 flex gap-[1.5px]">
        <button type="button" onClick={() => setTab(0)} className={tabClass(tab === 0)}>
          Individual Journeys
        </button>
        <button type="button" onClick={() => setTab(1)} className={tabClass(tab === 1)}>
          Workshops
        </button>
      </div>

      <div className="flex flex-col gap-[1.5px] border-[1.5px] border-lavender bg-lavender">
        {programmes.map((p) => {
          const key = `${tab}-${p.name}`;
          const isOpen = !!expanded[key];
          return (
            <div key={p.name} className="bg-white/60 backdrop-blur-md transition-colors hover:bg-white/90">
              <div className="flex flex-col items-start gap-5 p-6 sm:flex-row sm:items-center md:p-9">
                <div className="flex h-14 w-14 flex-none items-center justify-center bg-purple/10 font-serif text-xl font-black text-purple">
                  {p.badge}
                </div>
                <div className="flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-3">
                    <div className="font-serif text-xl font-bold text-plum md:text-[22px]">
                      {p.name}
                      {tab === 0 && (
                        <span className="ml-2 font-sans text-sm font-normal italic text-muted">
                          (Sessions)
                        </span>
                      )}
                    </div>
                    {p.dmit && (
                      <span className="bg-orchid/20 px-[9px] py-[5px] font-sans text-[9px] uppercase tracking-[0.14em] text-purple">
                        Includes DMIT
                      </span>
                    )}
                  </div>
                  <p className="mb-4 max-w-[42rem] font-sans text-sm font-light leading-[1.7] text-muted">
                    {p.desc}
                  </p>
                  <div className="flex flex-wrap gap-[10px]">
                    {p.chips.map((c) => (
                      <Chip key={c.label} label={c.label} highlight={c.highlight} />
                    ))}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => toggle(key)}
                  aria-expanded={isOpen}
                  aria-label={isOpen ? `Collapse ${p.name} details` : `Expand ${p.name} details`}
                  className="flex flex-none items-center justify-center text-2xl text-orchid transition-transform hover:text-purple sm:h-14 sm:w-14"
                  style={{ transform: isOpen ? "rotate(90deg)" : "none" }}
                >
                  →
                </button>
              </div>
              {isOpen && (
                <div className="border-t border-lavender bg-lavender/20 px-6 py-7 md:px-9">
                  <div className="flex max-w-[42rem] flex-col gap-4">
                    {p.detail?.tagline && (
                      <p className="m-0 font-serif text-lg italic text-purple">
                        {p.detail.tagline}
                      </p>
                    )}
                    {p.detail?.heading && (
                      <div className="font-sans text-[10px] uppercase tracking-[0.18em] text-purple">
                        {p.detail.heading}
                      </div>
                    )}
                    {(p.detail?.paragraphs ?? []).map((para, i) => (
                      <p
                        key={i}
                        className="m-0 font-sans text-sm font-light leading-[1.75] text-muted"
                      >
                        {para.label && (
                          <span className="font-serif font-bold not-italic text-plum">
                            {para.label}{" "}
                          </span>
                        )}
                        {para.text}
                      </p>
                    ))}
                    {p.detail?.bullets && (
                      <div className="mt-1">
                        {p.detail.bulletsHeading && (
                          <div className="mb-3 font-sans text-[10px] uppercase tracking-[0.18em] text-purple">
                            {p.detail.bulletsHeading}
                          </div>
                        )}
                        <ul className="flex flex-col gap-2">
                          {p.detail.bullets.map((b) => (
                            <li
                              key={b}
                              className="flex gap-3 font-sans text-sm font-light leading-[1.7] text-muted"
                            >
                              <span className="mt-[3px] flex-none font-serif text-sm text-purple">
                                ◇
                              </span>
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {p.detail?.closing && (
                      <p className="m-0 font-sans text-sm font-light italic leading-[1.7] text-muted">
                        {p.detail.closing}
                      </p>
                    )}
                    {!p.detail && (
                      <p className="m-0 font-sans text-sm font-light leading-[1.7] text-muted">
                        More on {p.name} — placeholder copy for now. This is where format,
                        duration, session structure, pricing and who it&rsquo;s best suited for
                        will go.
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
