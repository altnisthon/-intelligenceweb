import type { Metadata } from "next";
import Container from "@/components/Container";
import RadialChart from "@/components/RadialChart";
import { dmitPoints } from "@/lib/data";

export const metadata: Metadata = {
  title: "About DMIT",
  description:
    "Dermatoglyphics Multiple Intelligence Test — reading fingerprint ridge patterns to map innate intelligence and learning style.",
};

export default function DmitPage() {
  return (
    <section className="px-6 py-24 md:px-10">
      <Container className="grid grid-cols-1 items-center gap-16 md:grid-cols-2">
        <div>
          <div className="mb-5 font-sans text-[10.5px] uppercase tracking-[0.18em] text-purple">
            DMIT — Innate Intelligence
          </div>
          <h1 className="mb-6 font-serif text-[clamp(30px,4vw,50px)] font-bold leading-[1.1] text-plum">
            Your fingerprints hold a <span className="italic text-purple">map</span> of how you
            learn.
          </h1>
          <p className="mb-10 max-w-[30rem] font-sans text-[17px] font-light leading-[1.8] text-muted">
            Dermatoglyphics Multiple Intelligence Test reads the ridge patterns formed before
            birth — a stable, physical record of innate potential across the multiple
            intelligences.
          </p>
          <div className="border-t border-lavender">
            {dmitPoints.map((p) => (
              <div
                key={p.title}
                className="flex items-start gap-5 border-b border-lavender py-6 transition-colors hover:bg-mint/35"
              >
                <div className="font-serif text-xl font-black leading-none text-purple">◇</div>
                <div>
                  <div className="mb-1 font-sans text-base font-medium text-plum">{p.title}</div>
                  <p className="font-sans text-sm font-light leading-[1.65] text-muted">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center gap-10">
          <RadialChart />
          <div className="w-full border border-orchid bg-white/58 p-8 backdrop-blur-md">
            <p className="mb-4 font-quote text-2xl italic leading-[1.45] text-plum">
              &ldquo;When she saw her own profile, she stopped apologising for the way her mind
              works.&rdquo;
            </p>
            <div className="font-sans text-[10px] uppercase tracking-[0.16em] text-purple">
              Parent of a Youth client
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
