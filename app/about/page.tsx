import type { Metadata } from "next";
import Image from "next/image";
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
          <h1 className="mb-8 flex flex-wrap items-center gap-x-3 font-serif text-[clamp(30px,4vw,50px)] font-bold leading-[1.08] text-plum">
            Why
            <Image
              src="/footer-and.png"
              alt="AND"
              width={338}
              height={156}
              style={{ height: "0.75em", width: "auto" }}
            />
            exists.
          </h1>
          <div className="flex flex-col gap-6 font-sans text-lg font-light leading-[1.85] text-muted">
            <p>We have never had more information about people. Yet we&apos;ve never understood each other less.</p>
            <p>We live in a world that moves faster than our ability to make sense of ourselves.</p>
            <p>We learn how to solve equations before we learn how to process disappointment.</p>
            <p>We spend years building careers but very little time understanding what drives our decisions.</p>
            <p>We celebrate intelligence, but rarely ask what intelligence truly means.</p>
            <p>Some people are called &ldquo;too emotional.&rdquo;</p>
            <p>Others are praised for being &ldquo;logical.&rdquo;</p>
            <p>Children grow up believing they&apos;re either smart or not.</p>
            <p>Adults carry labels they never chose.</p>
            <p>Some spend a lifetime trying to become someone they were never meant to be.</p>
            <p>Some never discover the strengths they were born with.</p>
            <p>At AND Intelligence, we believe understanding people begins with understanding ourselves.</p>
            <p>Not through assumptions.</p>
            <p>Not through stereotypes.</p>
            <p>Not through one-size-fits-all definitions of success.</p>
            <p>But through curiosity.</p>
            <p>Every person thinks differently.</p>
            <p>Learns differently.</p>
            <p>Feels differently.</p>
            <p>Communicates differently.</p>
            <p>Grows differently.</p>
            <p>There isn&apos;t one right way to be human.</p>
            <p>
              That&apos;s why our work brings together emotional intelligence, behavioural science,
              multiple intelligences, and DMIT—not as separate disciplines, but as different lenses
              looking at the same person.
            </p>
            <p>Because no single framework can fully explain a human being.</p>
            <p>
              The more we understand our natural tendencies, our emotions, and our patterns, the
              more intentionally we can respond to the world around us.
            </p>
            <p>Self-awareness becomes better communication.</p>
            <p>Better communication builds healthier relationships.</p>
            <p>Healthier relationships create stronger families, workplaces, and communities.</p>
            <p>This is how AND Intelligence started.</p>
            <p>Not with the idea of creating another assessment.</p>
            <p>But with a simple belief:</p>
            <p>The world doesn&apos;t need more labels.</p>
            <p>It needs more understanding.</p>
            <p>Because different minds aren&apos;t problems to fix.</p>
            <p>They&apos;re perspectives waiting to be understood.</p>
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
            <p>I was never interested in labels. I was interested in people.</p>
            <p>Growing up, I found myself asking questions that didn&apos;t seem to have simple answers.</p>
            <p>Why do two people experience the same childhood, yet become completely different adults?</p>
            <p>Why does one person thrive under pressure while another shuts down?</p>
            <p>
              Why do intelligent people make irrational decisions, sabotage healthy relationships,
              or struggle to understand themselves?
            </p>
            <p>
              The more I observed, the more I realised that human behaviour is rarely random. Behind
              every reaction is a story. Behind every decision is a pattern. Behind every pattern is
              something waiting to be understood.
            </p>
            <p>That curiosity became a lifelong pursuit.</p>
            <p>
              I immersed myself in psychology, neuroscience, emotional intelligence, behavioural
              studies, communication, image psychology, multiple intelligences, and eventually
              Dermatoglyphics Multiple Intelligence Test (DMIT). Each discipline offered another
              piece of the puzzle—but none of them could explain the whole person on their own.
            </p>
            <p>Because people are never just their personality.</p>
            <p>
              They are a combination of their natural wiring, lived experiences, beliefs, emotions,
              environment, and the choices they continue to make.
            </p>
            <p>That realisation became the foundation of AND Intelligence.</p>
            <p>The word AND was never chosen by accident.</p>
            <p>We believe people are never one thing.</p>
            <p>You can be logical and deeply emotional.</p>
            <p>Confident and insecure.</p>
            <p>Strong and healing.</p>
            <p>Gifted and still discovering yourself.</p>
            <p>
              Your strengths and struggles are not contradictions—they coexist. Understanding both
              is what creates self-awareness.
            </p>
            <p>
              DMIT is one of the tools we use because it provides an objective glimpse into your
              innate cognitive tendencies and natural potential. But it is never the destination.
            </p>
            <p>It is the beginning of a much deeper conversation.</p>
            <p>At AND Intelligence, we don&apos;t believe assessments should put people into boxes.</p>
            <p>We believe they should help people make sense of themselves.</p>
            <p>Our goal isn&apos;t to tell you who you are.</p>
            <p>
              It&apos;s to give you the language to understand who you&apos;ve always been, why you
              think the way you do, how your emotions shape your decisions, and how awareness can
              become your greatest advantage.
            </p>
            <p>Because when people finally understand themselves, they stop trying to become someone else.</p>
            <p>And they begin becoming more of who they were designed to be.</p>
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
