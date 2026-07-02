import Link from "next/link";
import Image from "next/image";

const COLUMNS = [
  {
    heading: "Practice",
    links: [
      { href: "/trainings", label: "Trainings" },
      { href: "/how-it-works", label: "How It Works" },
      { href: "/dmit", label: "About DMIT" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/about", label: "Our Story" },
      { href: "/about#founder", label: "The Founder" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { href: "/journal", label: "Journal" },
      { href: "/faq", label: "FAQ" },
      { href: "/privacy", label: "Privacy" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-lavender-border/70 bg-lavender/40 px-6 pb-10 pt-20 backdrop-blur-md md:px-10">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-16 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <div className="mb-5 flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="AND Intelligence"
                width={34}
                height={32}
                style={{ height: "34px", width: "auto" }}
              />
              <span className="font-serif text-[28px] font-black italic text-purple">AND</span>
            </div>
            <p className="mb-7 max-w-[20rem] font-sans text-sm font-light leading-[1.75] text-muted">
              A Singapore practice for self-discovery, resilience and emotional intelligence —
              grounded in who you already are.
            </p>
            <div className="flex gap-[10px]">
              {["IG", "in", "f"].map((label) => (
                <a
                  key={label}
                  href="#"
                  className="flex h-[38px] w-[38px] items-center justify-center border border-lavender-border text-[13px] text-muted no-underline transition-colors hover:border-purple hover:text-purple"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <div className="mb-6 font-sans text-[10px] uppercase tracking-[0.16em] text-purple">
                {col.heading}
              </div>
              <div className="flex flex-col gap-[0.9rem]">
                {col.links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="font-sans text-sm font-light text-muted no-underline transition-colors hover:text-plum"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-lavender-border pt-8">
          <div className="font-sans text-xs font-light text-muted">
            © {new Date().getFullYear()} AND Intelligence. Singapore.
          </div>
          <div className="font-sans text-xs font-light text-muted">
            Take human beings seriously.
          </div>
        </div>
      </div>
    </footer>
  );
}
