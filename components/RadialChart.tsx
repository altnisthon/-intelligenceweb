const LABELS = [
  { text: "LOGICAL", top: "-2%", side: "left", pos: "50%", color: "purple" },
  { text: "LINGUISTIC", top: "22%", side: "right", pos: "-4%", color: "orchid" },
  { text: "SPATIAL", top: "60%", side: "right", pos: "-4%", color: "purple" },
  { text: "KINESTHETIC", top: "auto", bottom: "-2%", side: "right", pos: "14%", color: "purple" },
  { text: "MUSICAL", top: "auto", bottom: "-2%", side: "left", pos: "14%", color: "orchid" },
  { text: "INTERPERSONAL", top: "60%", side: "left", pos: "-4%", color: "purple" },
  { text: "INTRAPERSONAL", top: "22%", side: "left", pos: "-6%", color: "purple" },
] as const;

export default function RadialChart() {
  return (
    <div className="relative aspect-square w-full max-w-[420px]">
      <svg viewBox="0 0 400 400" className="h-full w-full overflow-visible">
        <g fill="none" stroke="#5b2a98">
          <ellipse cx="200" cy="200" rx="34" ry="46" strokeOpacity="0.7" strokeWidth="2" />
          <ellipse cx="200" cy="200" rx="58" ry="76" strokeOpacity="0.55" strokeWidth="2" />
          <ellipse cx="200" cy="200" rx="84" ry="108" strokeOpacity="0.45" strokeWidth="2" />
          <ellipse cx="200" cy="200" rx="112" ry="142" strokeOpacity="0.35" strokeWidth="2" />
          <ellipse cx="200" cy="200" rx="142" ry="176" strokeOpacity="0.26" strokeWidth="2" />
          <ellipse cx="200" cy="200" rx="172" ry="210" strokeOpacity="0.18" strokeWidth="2" />
        </g>
      </svg>
      {LABELS.map((l) => (
        <span
          key={l.text}
          className={`absolute font-sans text-[9px] tracking-[0.16em] ${
            l.color === "orchid" ? "text-orchid" : "text-purple"
          }`}
          style={{
            top: l.top === "auto" ? undefined : l.top,
            bottom: "bottom" in l ? l.bottom : undefined,
            [l.side]: l.pos,
            transform: l.text === "LOGICAL" ? "translateX(-50%)" : undefined,
          }}
        >
          {l.text}
        </span>
      ))}
    </div>
  );
}
