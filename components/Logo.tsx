import Image from "next/image";
import Link from "next/link";

export default function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3 no-underline">
      <Image
        src="/logo.png"
        alt="AND Intelligence"
        width={30}
        height={28}
        style={{ height: "30px", width: "auto" }}
        priority
      />
      <span
        className={`font-sans text-xs font-normal uppercase tracking-[0.28em] ${
          dark ? "text-offwhite" : "text-plum"
        }`}
      >
        AND Intelligence
      </span>
    </Link>
  );
}
