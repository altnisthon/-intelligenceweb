import type { Metadata } from "next";
import Container from "@/components/Container";
import CtaLink from "@/components/CtaLink";

export const metadata: Metadata = {
  title: "About",
  description: "The story behind AND Intelligence, and the person leading the practice.",
};

export default function AboutPage() {
  return (
    <>
      <section className="px-6 py-24 md:px-10">
        <Container size="md">
          <div className="mb-4 font-sans text-[10.5px] uppercase tracking-[0.18em] text-purple">
            Our Story
          </div>
          <h1 className="mb-8 font-serif text-[clamp(30px,4vw,50px)] font-bold leading-[1.08] text-plum">
            Why <span className="italic text-purple">AND</span> exists.
          </h1>
          <div className="flex flex-col gap-6 font-sans text-lg font-light leading-[1.85] text-muted">
            <p>
              <em className="text-purple">Placeholder copy — replace with the real founding
              story.</em> AND Intelligence started from a simple observation: most self-improvement
              asks people to change first and understand themselves later. We wanted to flip that —
              start with a grounded, evidence-based picture of how someone is actually wired, and
              let the change follow from there.
            </p>
            <p>
              That&apos;s why DMIT profiling sits at the centre of the practice, alongside honest,
              unhurried conversation. No bootcamp intensity, no promise of a fixed self — just a
              clearer starting point.
            </p>
          </div>
        </Container>
      </section>

      <section
        id="founder"
        className="border-t border-lavender-border/70 px-6 py-24 md:px-10"
      >
        <Container size="md">
          <div className="mb-4 font-sans text-[10.5px] uppercase tracking-[0.18em] text-purple">
            The Founder
          </div>
          <h2 className="mb-8 font-serif text-[clamp(28px,4vw,42px)] font-bold leading-[1.1] text-plum">
            A note from the founder.
          </h2>
          <div className="flex flex-col gap-6 font-sans text-lg font-light leading-[1.85] text-muted">
            <p>
              <em className="text-purple">Placeholder copy — replace with the founder&apos;s real
              bio, photo and voice.</em> Add a short first-person note here: what led you to this
              work, your background (training, certifications, years of practice), and the kind of
              client you love working with most.
            </p>
          </div>
          <div className="mt-10">
            <CtaLink href="/contact" variant="secondary">
              Get In Touch
            </CtaLink>
          </div>
        </Container>
      </section>
    </>
  );
}
