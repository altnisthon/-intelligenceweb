const WORDS = [
  "Self-Awareness",
  "Self-Discovery",
  "Emotional Intelligence",
  "Inner Resilience",
  "Self-Regulation",
  "DMIT — Innate Intelligence",
  "Singapore",
];

function Track() {
  return (
    <span className="font-serif text-2xl italic text-purple">
      {WORDS.map((w) => (
        <span key={w}>
          {w}
          <span className="px-6 text-orchid">•</span>
        </span>
      ))}
    </span>
  );
}

export default function Marquee() {
  return (
    <section className="overflow-hidden border-y border-lavender-border/90 bg-white/40 py-[22px] backdrop-blur-md">
      <div className="flex w-max animate-marquee whitespace-nowrap">
        <Track />
        <Track />
      </div>
    </section>
  );
}
