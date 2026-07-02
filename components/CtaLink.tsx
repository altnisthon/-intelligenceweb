import Link from "next/link";
import { ReactNode } from "react";

export default function CtaLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "invert";
}) {
  const base =
    "inline-block px-[30px] py-4 font-sans text-xs font-medium uppercase tracking-[0.1em] no-underline transition-colors";

  const styles = {
    primary: "bg-purple text-offwhite hover:bg-purple-dark",
    secondary:
      "border border-lavender-border bg-transparent text-plum hover:border-purple hover:text-purple",
    invert: "bg-purple text-offwhite hover:bg-mint hover:text-plum",
  };

  return (
    <Link href={href} className={`${base} ${styles[variant]}`}>
      {children}
    </Link>
  );
}
