export default function Chip({
  label,
  highlight = false,
}: {
  label: string;
  highlight?: boolean;
}) {
  return (
    <span
      className={`inline-block whitespace-nowrap border px-[11px] py-[6px] font-sans text-[10px] uppercase tracking-[0.1em] ${
        highlight
          ? "border-mint bg-mint text-plum"
          : "border-lavender-border bg-transparent text-muted"
      }`}
    >
      {label}
    </span>
  );
}
