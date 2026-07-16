"use client";

import { useEffect, useRef, useState } from "react";
import { seasons } from "@/lib/data";

export default function SeasonsGrid() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const numRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [inView, setInView] = useState<boolean[]>(() => seasons.map(() => false));

  // "Pop up" entrance: each card starts slightly below and scaled down, then
  // rises to rest as it scrolls into view — so it visibly detaches from the
  // mist background instead of just fading in place.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const idx = cardRefs.current.indexOf(entry.target as HTMLDivElement);
          if (idx === -1) return;
          setInView((prev) => {
            if (prev[idx]) return prev;
            const next = [...prev];
            next[idx] = true;
            return next;
          });
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    cardRefs.current.forEach((card) => card && observer.observe(card));
    return () => observer.disconnect();
  }, []);

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
    <div className="flex flex-col gap-[1.5px]">
      {seasons.map((s, i) => (
        <div
          key={s.label}
          ref={(el) => {
            cardRefs.current[i] = el;
          }}
          className={`relative overflow-hidden border border-lavender border-l-4 border-l-transparent bg-white/60 p-10 shadow-[0_18px_44px_-22px_rgba(30,24,38,0.28)] backdrop-blur-md transition-[background-color,border-color,opacity,transform] duration-700 ease-out hover:border-l-mint hover:bg-mint-light ${
            inView[i] ? "translate-y-0 scale-100 opacity-100" : "translate-y-10 scale-[0.97] opacity-0"
          }`}
        >
          <div
            ref={(el) => {
              numRefs.current[i] = el;
            }}
            className="pointer-events-none absolute -top-8 right-8 select-none font-serif text-[180px] font-black italic leading-none text-purple/5 will-change-transform"
          >
            {s.badge}
          </div>
          <div className="relative max-w-[38rem]">
            <div className="mb-4 font-sans text-[10px] uppercase tracking-[0.18em] text-purple">
              {s.label}
            </div>
            <div className="mb-4 font-serif text-[28px] font-bold leading-[1.2] text-plum">
              {s.title}
            </div>
            <p className="mb-6 font-sans text-base font-light leading-[1.8] text-muted">
              {s.desc}
            </p>
            <div className="border-t border-lavender pt-5 font-quote text-xl italic text-purple">
              {s.quote}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
