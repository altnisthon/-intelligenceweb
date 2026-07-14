import type { Metadata } from "next";
import Container from "@/components/Container";
import CtaLink from "@/components/CtaLink";
import { steps, seasons } from "@/lib/data";

export const metadata: Metadata = {
  title: "How It Works",
  description: "Four steps, no shortcuts: Profile, Reflect, Build, Rise.",
};

export default function HowItWorksPage() {
  return (
    <div className="mist-page">
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

    <section className="border-t border-lavender-border/70 px-6 py-24 md:px-10">
      <Container>
        <div className="mb-4 font-sans text-[10.5px] uppercase tracking-[0.18em] text-purple">
          Who We Serve
        </div>
        <h2 className="mb-12 max-w-[24rem] font-quote text-[clamp(30px,4vw,50px)] font-semibold leading-[1.08] text-plum">
          Different seasons of <span className="italic text-purple">becoming</span>.
        </h2>
        <div className="flex flex-col gap-[1.5px]">
          <div className="relative overflow-hidden border border-lavender border-l-4 border-l-transparent bg-white/62 p-10 backdrop-blur-md transition-colors hover:border-l-mint hover:bg-mint-light">
            <div className="pointer-events-none absolute -top-8 right-8 select-none font-serif text-[180px] font-black italic leading-none text-purple/5">
              01
            </div>
            <div className="relative max-w-[38rem]">
              <div className="mb-4 font-sans text-[10px] uppercase tracking-[0.18em] text-purple">
                {seasons[0].label}
              </div>
              <div className="mb-4 font-serif text-[28px] font-bold text-plum">
                {seasons[0].title}
              </div>
              <p className="mb-6 font-sans text-base font-light leading-[1.8] text-muted">
                {seasons[0].desc}
              </p>
              <div className="border-t border-lavender pt-5 font-quote text-xl italic text-purple">
                {seasons[0].quote}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-[1.5px] md:grid-cols-2">
            {seasons.slice(1).map((s) => (
              <div
                key={s.label}
                className="relative overflow-hidden border border-lavender border-l-4 border-l-transparent bg-white/62 p-10 backdrop-blur-md transition-colors hover:border-l-mint hover:bg-mint-light"
              >
                <div className="pointer-events-none absolute -top-8 right-6 select-none font-serif text-[150px] font-black italic leading-none text-purple/5">
                  {s.badge}
                </div>
                <div className="relative">
                  <div className="mb-4 font-sans text-[10px] uppercase tracking-[0.18em] text-purple">
                    {s.label}
                  </div>
                  <div className="mb-4 font-serif text-2xl font-bold text-plum">{s.title}</div>
                  <p className="mb-6 font-sans text-[15px] font-light leading-[1.75] text-muted">
                    {s.desc}
                  </p>
                  <div className="border-t border-lavender pt-5 font-quote text-[19px] italic text-purple">
                    {s.quote}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 text-center">
          <CtaLink href="/trainings">See All Trainings</CtaLink>
        </div>
      </Container>
    </section>
    </div>
  );
}
