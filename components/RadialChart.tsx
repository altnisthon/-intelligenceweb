"use client";

import { useState } from "react";
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
  const radius = 42;

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
          const isTopHalf = top < 50;
          const isPinned = pinned === i;

          return (
            <div
              key={item.label}
              className={`group absolute -translate-x-1/2 -translate-y-1/2 hover:z-30 ${
                isPinned ? "z-30" : "z-0"
              }`}
              style={{ left: `${left}%`, top: `${top}%` }}
            >
              <button
                type="button"
                onClick={() => setPinned(isPinned ? null : i)}
                className={`relative whitespace-nowrap font-sans text-[9px] uppercase tracking-[0.16em] transition-colors ${
                  isPinned ? "text-plum" : "text-purple/70 group-hover:text-purple"
                }`}
              >
                {item.label}
              </button>

              <div
                className={`pointer-events-none absolute left-1/2 z-20 w-[15rem] -translate-x-1/2 rounded-md border border-lavender bg-paper p-4 text-left shadow-lg transition-opacity duration-150 ${
                  isTopHalf ? "top-[calc(100%+10px)]" : "bottom-[calc(100%+10px)]"
                } ${isPinned ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
              >
                <div className="mb-1 font-sans text-[10px] uppercase tracking-[0.16em] text-purple">
                  {item.label}
                </div>
                <p className="font-sans text-[13px] font-light leading-[1.6] text-muted">
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-2 font-sans text-xs font-light italic text-muted">
        <span className="flex h-4 w-4 flex-none items-center justify-center rounded-full border border-purple/40 text-[10px] not-italic text-purple">
          i
        </span>
        Hover or tap a strength to see what it means.
      </div>
    </div>
  );
}
