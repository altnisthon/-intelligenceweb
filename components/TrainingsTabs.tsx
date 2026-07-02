"use client";

import { useState } from "react";
import { individualJourneys, workshops, type Programme } from "@/lib/data";
import Chip from "./Chip";

export default function TrainingsTabs() {
  const [tab, setTab] = useState<0 | 1>(0);
  const programmes: Programme[] = tab === 0 ? individualJourneys : workshops;

  const tabClass = (active: boolean) =>
    `flex-1 border-none px-6 py-[18px] font-sans text-xs font-medium uppercase tracking-[0.1em] transition-colors ${
      active ? "bg-purple text-offwhite" : "bg-lavender text-plum hover:bg-lavender/70"
    }`;

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
        {programmes.map((p) => (
          <div
            key={p.name}
            className="flex flex-col items-start gap-5 bg-white/66 p-6 transition-colors hover:bg-white/90 sm:flex-row sm:items-center md:p-9"
          >
            <div className="flex h-14 w-14 flex-none items-center justify-center bg-purple/10 font-serif text-xl font-black text-purple">
              {p.badge}
            </div>
            <div className="flex-1">
              <div className="mb-2 flex flex-wrap items-center gap-3">
                <div className="font-serif text-xl font-bold text-plum md:text-[22px]">
                  {p.name}
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
            <div className="hidden flex-none text-2xl text-orchid transition-colors group-hover:text-purple sm:block">
              →
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
