import type { Metadata } from "next";
import Container from "@/components/Container";
import CtaLink from "@/components/CtaLink";
import { steps } from "@/lib/data";

export const metadata: Metadata = {
  title: "How It Works",
  description: "Four steps, no shortcuts: Profile, Reflect, Build, Rise.",
};

export default function HowItWorksPage() {
  return (
    <section className="px-6 py-24 md:px-10">
      <Container>
        <div className="mb-4 font-sans text-[10.5px] uppercase tracking-[0.18em] text-purple">
          How It Works
        </div>
        <h1 className="mb-14 font-serif text-[clamp(30px,4vw,50px)] font-bold leading-[1.08] text-plum">
          Four steps, <span className="italic text-purple">no shortcuts</span>.
        </h1>
        <div className="grid grid-cols-1 gap-[1.5px] border-[1.5px] border-lavender bg-lavender sm:grid-cols-2 md:grid-cols-4">
          {steps.map((s) => (
            <div key={s.n} className="relative overflow-hidden bg-white/60 p-9 backdrop-blur-md">
              <div className="pointer-events-none absolute -top-6 right-2 select-none font-serif text-[150px] font-black italic leading-none text-purple/5">
                {s.n}
              </div>
              <div className="relative">
                <div className="mb-6 font-sans text-[10px] uppercase tracking-[0.16em] text-purple">
                  {s.kicker}
                </div>
                <div className="mb-4 text-2xl text-purple">◇</div>
                <div className="mb-3 font-serif text-xl font-bold text-plum">{s.title}</div>
                <p className="font-sans text-sm font-light leading-[1.7] text-muted">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-14">
          <CtaLink href="/contact">Begin the Conversation</CtaLink>
        </div>
      </Container>
    </section>
  );
}
