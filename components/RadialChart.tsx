"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const INTELLIGENCES = [
  {
    label: "Linguistic",
    desc: "Sensitivity to words, language and the rhythm of speech. Learns well through reading, writing and storytelling.",
  },
  {
    label: "Visual-Spatial",
    desc: "Thinks in images and pictures, with a strong sense of direction and spatial reasoning. Good at visualizing, design and reading maps.",
  },
  {
    label: "Interpersonal",
    desc: "Attuned to other people's moods, motivations and intentions. Thrives in collaboration, leadership and relationship-building.",
  },
  {
    label: "Intrapersonal",
    desc: "Deep self-awareness of one's own feelings, values and motivations. Comfortable working independently and reflecting inward.",
  },
  {
    label: "Musical",
    desc: "Sensitive to rhythm, pitch, tone and pattern in sound. Learns well through music, rhythm and auditory cues.",
  },
  {
    label: "Bodily-Kinesthetic",
    desc: "Learns through movement, touch and physical doing. Strong body control, coordination and hands-on problem-solving.",
  },
  {
    label: "Naturalistic",
    desc: "Attuned to patterns in nature, plants, animals and the environment. Skilled at observing, classifying and connecting with the natural world.",
  },
  {
    label: "Logical",
    desc: "Reasons through numbers, patterns and abstract logic. Strong in problem-solving, analysis and systematic thinking.",
  },
] as const;

export default function RadialChart() {
  const [pinned, setPinned] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const radius = 42;

  const activeIndex = pinned !== null ? pinned : hovered;
  const active = activeIndex !== null ? INTELLIGENCES[activeIndex] : null;

  function close() {
    setPinned(null);
    setHovered(null);
  }

  useEffect(() => {
    if (pinned === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setPinned(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pinned]);

  return (
    <div className="flex w-full max-w-[420px] flex-col items-center gap-4">
      <div className="relative aspect-square w-full">
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src="/fingerprint-purple.png"
            alt="Fingerprint"
            width={504}
            height={763}
            className="h-[55%] w-auto opacity-90"
          />
        </div>
        {INTELLIGENCES.map((item, i) => {
          const angle = (-90 + i * (360 / INTELLIGENCES.length)) * (Math.PI / 180);
          const left = 50 + radius * Math.cos(angle);
          const top = 50 + radius * Math.sin(angle);
          const isActive = activeIndex === i;

          return (
            <button
              key={item.label}
              type="button"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered((h) => (h === i ? null : h))}
              onFocus={() => setHovered(i)}
              onBlur={() => setHovered((h) => (h === i ? null : h))}
              onClick={() => setPinned((p) => (p === i ? null : i))}
              className={`absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-sans text-[9px] uppercase tracking-[0.16em] transition-colors ${
                isActive ? "text-plum" : "text-purple/70 hover:text-purple"
              }`}
              style={{ left: `${left}%`, top: `${top}%` }}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-2 font-sans text-xs font-light italic text-muted">
        <span className="flex h-4 w-4 flex-none items-center justify-center rounded-full border border-purple/40 text-[10px] not-italic text-purple">
          i
        </span>
        Hover or tap a strength to see what it means.
      </div>

      {active && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center px-6 transition-colors duration-150 ${
            pinned !== null ? "bg-plum/40 backdrop-blur-sm" : "pointer-events-none bg-transparent"
          }`}
          onClick={close}
        >
          <div
            className="pointer-events-auto relative w-full max-w-sm animate-radial-pop rounded-xl border border-lavender bg-paper p-7 text-left shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {pinned !== null && (
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full text-muted transition-colors hover:bg-mint/40 hover:text-plum"
              >
                ✕
              </button>
            )}
            <div className="mb-2 font-sans text-[11px] uppercase tracking-[0.18em] text-purple">
              {active.label}
            </div>
            <p className="font-sans text-[15px] font-light leading-[1.7] text-muted">
              {active.desc}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
