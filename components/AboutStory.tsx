"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import CtaLink from "@/components/CtaLink";

function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  as?: "div" | "p";
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <Tag
      ref={ref as never}
      className={`transition-all duration-[900ms] ease-out ${
        inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

/** A background watermark image that drifts (parallax) at a slower rate than
 * scroll, computed from its stable wrapping section — not from itself — so
 * the transform never compounds across frames. */
function ParallaxWatermark({
  src,
  className,
  factor = 0.08,
  widthClass = "w-[520px]",
}: {
  src: string;
  className?: string;
  factor?: number;
  widthClass?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const wrap = wrapRef.current;
      const img = imgRef.current;
      if (wrap && img) {
        const rect = wrap.getBoundingClientRect();
        const centerOffset = rect.top + rect.height / 2 - window.innerHeight / 2;
        img.style.transform = `translateY(${-centerOffset * factor}px)`;
      }
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [factor]);

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}
    >
      <div ref={imgRef} className="absolute inset-0 flex items-center justify-center will-change-transform">
        <Image
          src={src}
          alt=""
          width={1024}
          height={1024}
          className={`${widthClass} h-auto opacity-[0.05]`}
        />
      </div>
    </div>
  );
}

function Mist({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 z-0 blur-[6px] ${className}`}
      style={{
        background:
          "radial-gradient(50% 42% at 15% 8%, rgba(91,42,152,0.16), transparent 70%)," +
          "radial-gradient(46% 38% at 85% 22%, rgba(202,144,220,0.16), transparent 70%)," +
          "radial-gradient(50% 46% at 25% 92%, rgba(91,42,152,0.12), transparent 72%)",
      }}
    />
  );
}

const openLines = [
  "We have never had more information about people.",
  "Yet we’ve never understood each other less.",
];

const bodyA = [
  "We live in a world that moves faster than our ability to make sense of ourselves.",
  "We learn how to solve equations before we learn how to process disappointment.",
  "We spend years building careers but very little time understanding what drives our decisions.",
  "We celebrate intelligence, but rarely ask what intelligence truly means.",
];

const labelLines = [
  "Some people are called “too emotional.”",
  "Others are praised for being “logical.”",
  "Children grow up believing they’re either smart or not.",
  "Adults carry labels they never chose.",
];

const bodyB = [
  "Some spend a lifetime trying to become someone they were never meant to be.",
  "Some never discover the strengths they were born with.",
];

const notThrough = [
  "Not through assumptions.",
  "Not through stereotypes.",
  "Not through one-size-fits-all definitions of success.",
  "But through curiosity.",
];

const differently = ["Every person thinks differently.", "Learns differently.", "Feels differently.", "Communicates differently.", "Grows differently."];

const bodyC = [
  "That’s why our work brings together emotional intelligence, behavioural science, multiple intelligences, and DMIT—not as separate disciplines, but as different lenses looking at the same person.",
  "Because no single framework can fully explain a human being.",
  "The more we understand our natural tendencies, our emotions, and our patterns, the more intentionally we can respond to the world around us.",
];

const chain = [
  "Self-awareness becomes better communication.",
  "Better communication builds healthier relationships.",
  "Healthier relationships create stronger families, workplaces, and communities.",
];

const originLines = [
  "This is how AND Intelligence started.",
  "Not with the idea of creating another assessment.",
  "But with a simple belief:",
];

const founderIntro = [
  "Growing up, I found myself asking questions that didn’t seem to have simple answers.",
  "Why do two people experience the same childhood, yet become completely different adults?",
  "Why does one person thrive under pressure while another shuts down?",
  "Why do intelligent people make irrational decisions, sabotage healthy relationships, or struggle to understand themselves?",
];

const founderMid1 = [
  "The more I observed, the more I realised that human behaviour is rarely random. Behind every reaction is a story. Behind every decision is a pattern. Behind every pattern is something waiting to be understood.",
  "That curiosity became a lifelong pursuit.",
  "I immersed myself in psychology, neuroscience, emotional intelligence, behavioural studies, communication, image psychology, multiple intelligences, and eventually Dermatoglyphics Multiple Intelligence Test (DMIT). Each discipline offered another piece of the puzzle—but none of them could explain the whole person on their own.",
  "Because people are never just their personality.",
  "They are a combination of their natural wiring, lived experiences, beliefs, emotions, environment, and the choices they continue to make.",
  "That realisation became the foundation of AND Intelligence.",
  "The word AND was never chosen by accident.",
  "We believe people are never one thing.",
];

const contrastPairs: [string, string][] = [
  ["Logical", "deeply emotional"],
  ["Confident", "insecure"],
  ["Strong", "healing"],
  ["Gifted", "still discovering yourself"],
];

const founderMid2 = [
  "Your strengths and struggles are not contradictions—they coexist. Understanding both is what creates self-awareness.",
  "DMIT is one of the tools we use because it provides an objective glimpse into your innate cognitive tendencies and natural potential. But it is never the destination.",
  "It is the beginning of a much deeper conversation.",
];

const founderMid3 = [
  "At AND Intelligence, we don’t believe assessments should put people into boxes.",
  "We believe they should help people make sense of themselves.",
  "Our goal isn’t to tell you who you are.",
  "It’s to give you the language to understand who you’ve always been, why you think the way you do, how your emotions shape your decisions, and how awareness can become your greatest advantage.",
];

export default function AboutStory() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden px-6 py-28 md:px-10 md:py-36">
        <Mist />
        <ParallaxWatermark src="/images/and-logo.png" widthClass="w-[420px] md:w-[640px]" factor={0.12} />
        <div className="relative z-10 mx-auto max-w-[900px] text-center">
          <Reveal as="div" className="mb-5 font-sans text-[10.5px] uppercase tracking-[0.18em] text-purple">
            Our Story
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mb-10 flex flex-wrap items-center justify-center gap-x-4 font-serif text-[clamp(34px,5.5vw,64px)] font-bold leading-[1.06] text-plum">
              Why
              <Image
                src="/footer-and.png"
                alt="AND"
                width={338}
                height={156}
                style={{ height: "0.78em", width: "auto" }}
              />
              exists.
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="mx-auto max-w-[620px] font-serif text-[clamp(22px,2.6vw,30px)] italic leading-[1.5] text-purple">
              {openLines[0]}
              <br />
              {openLines[1]}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===== STORY BODY ===== */}
      <section className="relative overflow-hidden border-t border-lavender-border/70 px-6 py-24 md:px-10">
        <div className="mx-auto flex max-w-[720px] flex-col gap-7 font-sans text-lg font-light leading-[1.85] text-muted">
          {bodyA.map((line, i) => (
            <Reveal key={line} as="p" delay={i * 60}>
              {line}
            </Reveal>
          ))}

          <Reveal
            as="div"
            className="my-4 flex flex-col gap-2 border-l-2 border-orchid/60 pl-6 font-serif text-[clamp(20px,2.4vw,26px)] italic leading-[1.5] text-plum"
          >
            {labelLines.map((line) => (
              <p key={line} className="m-0">
                {line}
              </p>
            ))}
          </Reveal>

          {bodyB.map((line, i) => (
            <Reveal key={line} as="p" delay={i * 60}>
              {line}
            </Reveal>
          ))}

          <Reveal as="p" className="my-2 font-serif text-[clamp(22px,2.8vw,30px)] font-semibold leading-[1.35] text-purple">
            At AND Intelligence, we believe understanding people begins with understanding ourselves.
          </Reveal>

          <Reveal as="div" className="flex flex-col gap-2">
            {notThrough.map((line, i) => (
              <p
                key={line}
                className={`m-0 ${i === notThrough.length - 1 ? "font-medium text-plum" : "text-muted"}`}
                style={{ paddingLeft: `${Math.min(i, 3) * 14}px` }}
              >
                {line}
              </p>
            ))}
          </Reveal>

          <Reveal as="div" className="flex flex-col gap-1 py-2">
            {differently.map((line, i) => (
              <p
                key={line}
                className="m-0 font-serif text-[clamp(19px,2.2vw,24px)] text-plum"
                style={{ marginLeft: `${i * 22}px`, opacity: 1 - i * 0.09 }}
              >
                {line}
              </p>
            ))}
          </Reveal>

          <Reveal
            as="p"
            className="my-2 text-center font-serif text-[clamp(21px,2.6vw,28px)] italic leading-[1.5] text-purple"
          >
            There isn&apos;t one right way to be human.
          </Reveal>

          {bodyC.map((line, i) => (
            <Reveal key={line} as="p" delay={i * 60}>
              {line}
            </Reveal>
          ))}

          <Reveal as="div" className="relative my-4 pl-7">
            <span
              aria-hidden
              className="absolute bottom-2 left-[3px] top-2 w-px"
              style={{ background: "linear-gradient(to bottom, rgba(91,42,152,.5), rgba(202,144,220,.5))" }}
            />
            {chain.map((line) => (
              <p key={line} className="relative m-0 pb-5 text-plum">
                <span
                  aria-hidden
                  className="absolute -left-7 top-[0.4em] h-2 w-2 rounded-full bg-purple"
                />
                {line}
              </p>
            ))}
          </Reveal>

          {originLines.map((line, i) => (
            <Reveal key={line} as="p" delay={i * 60}>
              {line}
            </Reveal>
          ))}

          <Reveal as="div" className="relative my-6 text-center">
            <span aria-hidden className="block font-serif text-[56px] font-black italic leading-none text-orchid">
              &ldquo;
            </span>
            <p className="mx-auto max-w-[560px] font-serif text-[clamp(24px,3.2vw,34px)] italic leading-[1.4] text-plum">
              The world doesn&apos;t need more labels — it needs more understanding.
            </p>
          </Reveal>

          <Reveal as="div" className="flex flex-col items-center gap-1 pb-4 pt-6 text-center">
            <p className="m-0 font-serif text-[clamp(24px,3.4vw,36px)] font-bold leading-[1.3] text-purple">
              Because different minds aren&apos;t problems to fix.
            </p>
            <p className="m-0 font-serif text-[clamp(24px,3.4vw,36px)] font-bold italic leading-[1.3] text-plum">
              They&apos;re perspectives waiting to be understood.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===== FOUNDER ===== */}
      <section id="founder" className="relative overflow-hidden border-t border-lavender-border/70 px-6 py-28 md:px-10">
        <Mist className="opacity-70" />
        <div className="relative z-10 mx-auto grid max-w-[1100px] gap-14 md:grid-cols-[minmax(0,320px)_1fr] md:gap-16">
          <div className="md:sticky md:top-28 md:self-start">
            <Reveal as="div" className="mb-4 font-sans text-[10.5px] uppercase tracking-[0.18em] text-purple">
              The Founder
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mb-6 font-serif text-[clamp(28px,4vw,42px)] font-bold leading-[1.1] text-plum">
                A note from the founder.
              </h2>
            </Reveal>
            <Reveal delay={140} className="relative aspect-[4/5] w-full max-w-[280px] overflow-hidden rounded-[6px] border border-dashed border-purple/35 bg-lavender/60">
              <ParallaxWatermark src="/fingerprint-purple.png" widthClass="w-[220px]" factor={-0.05} />
              <div className="relative z-10 flex h-full items-center justify-center px-6 text-center font-sans text-xs uppercase tracking-[0.12em] text-purple/70">
                Founder photo
              </div>
            </Reveal>
          </div>

          <div className="flex flex-col gap-7 font-sans text-lg font-light leading-[1.85] text-muted">
            <Reveal as="p" className="font-serif text-[clamp(22px,2.8vw,30px)] italic leading-[1.5] text-purple">
              I was never interested in labels. I was interested in people.
            </Reveal>

            {founderIntro.map((line, i) => (
              <Reveal key={line} as="p" delay={i * 60}>
                {line}
              </Reveal>
            ))}

            {founderMid1.map((line, i) => (
              <Reveal key={line} as="p" delay={i * 40}>
                {line}
              </Reveal>
            ))}

            <Reveal as="div" className="my-2 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-2">
              {contrastPairs.map(([a, b]) => (
                <div key={a} className="flex items-center gap-2 font-serif text-[clamp(16px,1.8vw,19px)] text-plum">
                  <span>{a}</span>
                  <span className="italic text-orchid">&amp;</span>
                  <span className="italic">{b}</span>
                </div>
              ))}
            </Reveal>

            {founderMid2.map((line, i) => (
              <Reveal key={line} as="p" delay={i * 60}>
                {line}
              </Reveal>
            ))}

            {founderMid3.map((line, i) => (
              <Reveal key={line} as="p" delay={i * 60}>
                {line}
              </Reveal>
            ))}

            <Reveal as="div" className="mt-2 flex flex-col items-start gap-1 border-l-2 border-orchid/60 pl-6">
              <p className="m-0 font-serif text-[clamp(20px,2.4vw,26px)] italic leading-[1.4] text-plum">
                Because when people finally understand themselves, they stop trying to become someone else
                — <span className="text-purple">and begin becoming more of who they were designed to be.</span>
              </p>
            </Reveal>

            <Reveal className="mt-6">
              <CtaLink href="/contact" variant="secondary">
                Get In Touch
              </CtaLink>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
