import Image from "next/image";
import Container from "@/components/Container";
import CtaLink from "@/components/CtaLink";
import Marquee from "@/components/Marquee";
import Testimonials from "@/components/Testimonials";
import { seasons } from "@/lib/data";

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="grid min-h-[90vh] grid-cols-1 md:grid-cols-2">
        <div className="relative flex flex-col items-center justify-center overflow-hidden border-r-0 border-lavender/80 bg-lavender/50 px-8 py-20 md:border-r">
          <div className="pointer-events-none absolute -left-[12%] -top-[10%] h-[72%] w-[72%] rounded-full bg-[radial-gradient(circle,rgba(202,144,220,0.24),transparent_70%)]" />
          <div className="pointer-events-none absolute -bottom-[14%] -right-[10%] h-[60%] w-[60%] rounded-full bg-[radial-gradient(circle,rgba(197,241,178,0.34),transparent_70%)]" />
          <Image
            src="/logo.png"
            alt=""
            width={440}
            height={413}
            priority
            className="relative h-[clamp(160px,32vw,440px)] w-auto"
          />
        </div>
        <div className="relative flex flex-col justify-center overflow-hidden px-8 py-16 md:px-14 md:py-20">
          <div className="pointer-events-none absolute -bottom-[15%] -right-[15%] h-[60%] w-[60%] rounded-full bg-[radial-gradient(circle,rgba(197,241,178,0.5),transparent_70%)]" />
          <div className="relative mb-8 font-sans text-[10.5px] uppercase tracking-[0.18em] text-purple">
            Singapore · Self-Awareness &amp; Self-Discovery
          </div>
          <h1 className="relative mb-7 font-serif text-[clamp(36px,5.2vw,76px)] font-bold italic leading-[1.04] tracking-tight text-plum">
            Regulate. Relate. Rise. <span className="text-purple">AND</span> know why you can.
          </h1>
          <div className="relative mb-8 flex flex-wrap gap-[14px]">
            {["Self-Awareness", "Self-Discovery", "Emotional Intelligence"].map((t) => (
              <div key={t} className="bg-lavender px-[18px] py-3">
                <span className="font-sans text-[10px] uppercase tracking-[0.16em] text-purple">
                  {t}
                </span>
              </div>
            ))}
          </div>
          <p className="relative mb-10 max-w-[34rem] font-sans text-[17px] font-light leading-[1.85] text-muted">
            A self-discovery practice that helps you understand how you are wired — and build the
            self-awareness to live accordingly. Guided reflection, honest conversation, and
            fingerprint-based intelligence profiling.
          </p>
          <div className="relative flex flex-wrap gap-4">
            <CtaLink href="/trainings">Explore Sessions</CtaLink>
            <CtaLink href="/how-it-works" variant="secondary">
              How It Works
            </CtaLink>
          </div>
        </div>
      </section>

      <Marquee />

      {/* WHAT AND IS */}
      <section className="px-6 py-28 md:px-10">
        <Container className="grid grid-cols-1 items-start gap-16 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="mb-5 font-sans text-[10.5px] uppercase tracking-[0.18em] text-purple">
              What AND Is
            </div>
            <h2 className="mb-8 font-serif text-[clamp(30px,4vw,50px)] font-bold leading-[1.08] text-plum">
              A practice for the <span className="italic text-purple">whole</span> human being.
            </h2>
            <blockquote className="border-l-[3px] border-purple pl-6 font-quote text-[26px] font-light italic leading-[1.4] text-muted">
              You are not a problem to be solved. You are a system to be understood.
            </blockquote>
          </div>
          <div>
            <p className="mb-6 font-sans text-lg font-light leading-[1.85] text-muted">
              Most self-help starts with what you want to change. We start with how you are built.
              AND sits at the intersection of self-awareness, resilience training and DMIT, a
              fingerprint-based intelligence profiling; because lasting change comes from working{" "}
              <em className="italic text-purple">with</em> your nature, not against it.
            </p>
            <p className="mb-8 font-sans text-lg font-light leading-[1.85] text-muted">
              Every conversation is honest, specific and quietly confident. No jargon, no bootcamp
              intensity, no promises of a fixed self. Just a clearer picture of who you are — and
              the practical self-awareness to act on it.
            </p>
            <div className="grid grid-cols-1 gap-[1.5px] border-[1.5px] border-lavender bg-lavender sm:grid-cols-3">
              {[
                {
                  n: "01",
                  t: "Regulate",
                  d: "Learn to steady your own nervous system before it steadies you.",
                },
                {
                  n: "02",
                  t: "Relate",
                  d: "Build relationships from a place of understanding, not reaction.",
                },
                {
                  n: "03",
                  t: "Rise",
                  d: "Grow into the version of yourself your wiring already supports.",
                },
              ].map((s) => (
                <div key={s.n} className="bg-white/62 p-7 backdrop-blur-md">
                  <div className="mb-4 font-serif text-xl font-bold italic text-purple">
                    {s.n}
                  </div>
                  <div className="mb-3 font-serif text-lg font-bold text-plum">{s.t}</div>
                  <p className="font-sans text-sm font-light leading-[1.7] text-muted">{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* WHO WE SERVE — teaser */}
      <section className="border-t border-lavender-border/70 px-6 py-28 md:px-10">
        <Container>
          <div className="mb-4 font-sans text-[10.5px] uppercase tracking-[0.18em] text-purple">
            Who We Serve
          </div>
          <h2 className="mb-12 max-w-[24rem] font-serif text-[clamp(30px,4vw,50px)] font-bold leading-[1.08] text-plum">
            Different seasons of <span className="italic text-purple">becoming</span>.
          </h2>
          <div className="grid grid-cols-1 gap-[1.5px] bg-lavender-border/40 md:grid-cols-3">
            {seasons.map((s) => (
              <div
                key={s.label}
                className="flex flex-col justify-between border border-lavender bg-white/62 p-9 backdrop-blur-md transition-colors hover:bg-mint-light"
              >
                <div>
                  <div className="mb-3 font-sans text-[10px] uppercase tracking-[0.18em] text-purple">
                    {s.label}
                  </div>
                  <div className="mb-3 font-serif text-xl font-bold text-plum">{s.title}</div>
                  <p className="font-sans text-sm font-light leading-[1.75] text-muted">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <CtaLink href="/trainings" variant="secondary">
              See All Trainings
            </CtaLink>
          </div>
        </Container>
      </section>

      <Testimonials />

      {/* CTA BAND */}
      <section className="px-6 py-28 md:px-10">
        <Container size="md">
          <div className="relative overflow-hidden border border-lavender bg-white/50 px-8 py-16 text-center backdrop-blur-md md:px-16 md:py-24">
            <div className="pointer-events-none absolute -left-[10%] -top-[30%] h-[120%] w-[55%] rounded-full bg-[radial-gradient(circle,rgba(197,241,178,0.55),transparent_68%)]" />
            <div className="pointer-events-none absolute -bottom-[40%] -right-[8%] h-[120%] w-[55%] rounded-full bg-[radial-gradient(circle,rgba(202,144,220,0.28),transparent_68%)]" />
            <div className="relative">
              <h2 className="mx-auto mb-6 max-w-2xl font-serif text-[clamp(30px,5vw,58px)] font-normal italic leading-[1.12] text-plum">
                Start with understanding.{" "}
                <span className="text-purple">Everything else follows.</span>
              </h2>
              <p className="mx-auto mb-10 max-w-[34rem] font-sans text-lg font-light leading-[1.8] text-muted">
                Begin with an introductory conversation. No commitment, no assessment to prepare
                for — just a first honest conversation about where you are.
              </p>
              <CtaLink href="/contact" variant="invert">
                Begin the Conversation
              </CtaLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
