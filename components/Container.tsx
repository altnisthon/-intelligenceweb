import { ReactNode } from "react";

export default function Container({
  children,
  className = "",
  size = "lg",
}: {
  children: ReactNode;
  className?: string;
  size?: "lg" | "md";
}) {
  const max = size === "lg" ? "max-w-[1200px]" : "max-w-[900px]";
  return <div className={`mx-auto ${max} ${className}`}>{children}</div>;
}
