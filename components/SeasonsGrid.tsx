"use client";

import { useEffect, useRef } from "react";
import { seasons } from "@/lib/data";

export default function SeasonsGrid() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const numRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const vh = window.innerHeight;
      cardRefs.current.forEach((card, i) => {
        const num = numRefs.current[i];
        if (!card || !num) return;
        // base the offset on the card's own rect, not the number's — the
        // number already has a transform applied, so reading its own rect
        // would feed each frame's output back into itself and compound.
        const rect = card.getBoundingClientRect();
        const total = rect.height + vh;
        const traveled = vh - rect.top;
        const progress = Math.min(1, Math.max(0, traveled / total));
        const offset = 170 - progress * 400;
        num.style.transform = `translateY(${offset.toFixed(1)}px)`;
      });
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="grid grid-cols-1 gap-[1.5px] sm:grid-cols-3">
      {seasons.map((s, i) => (
        <div
          key={s.label}
          ref={(el) => {
            cardRefs.current[i] = el;
          }}
          className="relative overflow-hidden border border-lavender border-l-4 border-l-transparent bg-white/62 p-9 backdrop-blur-md transition-colors hover:border-l-mint hover:bg-mint-light"
        >
          <div
            ref={(el) => {
              numRefs.current[i] = el;
            }}
            className="pointer-events-none absolute -top-8 right-6 select-none font-serif text-[150px] font-black italic leading-none text-purple/5 will-change-transform"
          >
            {s.badge}
          </div>
          <div className="relative">
            <div className="mb-4 font-sans text-[10px] uppercase tracking-[0.18em] text-purple">
              {s.label}
            </div>
            <div className="mb-4 font-serif text-xl font-bold leading-[1.25] text-plum">
              {s.title}
            </div>
            <p className="mb-6 font-sans text-sm font-light leading-[1.75] text-muted">
              {s.desc}
            </p>
            <div className="border-t border-lavender pt-5 font-quote text-lg italic text-purple">
              {s.quote}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
