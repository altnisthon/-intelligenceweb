import Container from "@/components/Container";
import CtaLink from "@/components/CtaLink";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center px-6 py-24 md:px-10">
      <Container size="md" className="text-center">
        <div className="mb-6 font-serif text-[120px] font-black italic leading-none text-purple/15">
          404
        </div>
        <h1 className="mb-5 font-serif text-3xl font-bold text-plum">
          This page hasn&apos;t found its footing yet.
        </h1>
        <p className="mb-10 font-sans text-base font-light text-muted">
          Let&apos;s get you back to solid ground.
        </p>
        <CtaLink href="/">Back to Home</CtaLink>
      </Container>
    </section>
  );
}
