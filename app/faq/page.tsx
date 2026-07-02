import type { Metadata } from "next";
import Container from "@/components/Container";
import FaqAccordion from "@/components/FaqAccordion";

export const metadata: Metadata = {
  title: "FAQ",
  description: "The things people usually want to know before their first conversation.",
};

export default function FaqPage() {
  return (
    <section className="px-6 py-24 md:px-10">
      <Container className="grid grid-cols-1 items-start gap-16 md:grid-cols-[0.85fr_1.15fr]">
        <div className="md:sticky md:top-28">
          <div className="mb-4 font-sans text-[10.5px] uppercase tracking-[0.18em] text-purple">
            Questions
          </div>
          <h1 className="mb-5 font-serif text-[clamp(28px,4vw,46px)] font-bold leading-[1.1] text-plum">
            Before you begin.
          </h1>
          <p className="max-w-[22rem] font-sans text-base font-light leading-[1.8] text-muted">
            The things people usually want to know before their first conversation.
          </p>
        </div>
        <FaqAccordion />
      </Container>
    </section>
  );
}
