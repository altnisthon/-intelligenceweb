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
      <Image
        src="/header-and.png"
        alt="AND Intelligence"
        width={1014}
        height={122}
        style={{ height: "14px", width: "auto", filter: dark ? "none" : "invert(1)" }}
        priority
      />
    </Link>
  );
}
