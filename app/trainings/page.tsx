import type { Metadata } from "next";
import Container from "@/components/Container";
import TrainingsTabs from "@/components/TrainingsTabs";
import { seasons } from "@/lib/data";

export const metadata: Metadata = {
  title: "Trainings",
  description:
    "Individual journeys and group workshops built around the 3R arc: Regulate, Relate, Rise.",
};

export default function TrainingsPage() {
  return (
    <>
      <section className="px-6 py-24 md:px-10">
        <Container>
          <div className="mb-4 font-sans text-[10.5px] uppercase tracking-[0.18em] text-purple">
            Trainings
          </div>
          <h1 className="mb-5 font-serif text-[clamp(32px,4vw,50px)] font-bold leading-[1.08] text-plum">
            Ways to <span className="italic text-purple">begin</span>.
          </h1>
          <p className="mb-12 max-w-2xl font-sans text-[17px] font-light leading-[1.8] text-muted">
            Whichever path you choose, the arc is the same — the 3R vision at the heart of AND:{" "}
            <strong className="font-medium text-purple">Regulate</strong>,{" "}
            <strong className="font-medium text-purple">Relate</strong>,{" "}
            <strong className="font-medium text-purple">Rise</strong>.
          </p>
          <TrainingsTabs />
        </Container>
      </section>

      <section className="border-t border-lavender-border/70 px-6 py-24 md:px-10">
        <Container>
          <div className="mb-4 font-sans text-[10.5px] uppercase tracking-[0.18em] text-purple">
            Who We Serve
          </div>
          <h2 className="mb-12 max-w-[24rem] font-serif text-[clamp(30px,4vw,50px)] font-bold leading-[1.08] text-plum">
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
        </Container>
      </section>
    </>
  );
}
