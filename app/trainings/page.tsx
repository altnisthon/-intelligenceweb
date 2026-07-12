import type { Metadata } from "next";
import Container from "@/components/Container";
import TrainingsTabs from "@/components/TrainingsTabs";

export const metadata: Metadata = {
  title: "Trainings",
  description:
    "Individual journeys and group workshops built around the 3R arc: Regulate, Relate, Rise.",
};

export default function TrainingsPage() {
  return (
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
  );
}
