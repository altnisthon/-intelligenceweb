import Container from "./Container";
import { testimonials } from "@/lib/data";

export default function Testimonials() {
  return (
    <section className="border-t border-lavender-border/70 px-6 py-28 md:px-10">
      <Container>
        <div className="mb-12 text-center font-sans text-[10.5px] uppercase tracking-[0.18em] text-purple">
          In Their Words
        </div>
        <div className="grid grid-cols-1 gap-[1.5px] border-[1.5px] border-lavender bg-lavender md:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-white/66 p-11 backdrop-blur-md">
              <div className="mb-4 font-quote text-[64px] italic leading-[0.6] text-orchid">
                &ldquo;
              </div>
              <p className="mb-7 font-quote text-[23px] italic leading-[1.5] text-plum">
                {t.quote}
              </p>
              <div className="border-t border-lavender pt-5 font-sans text-[10px] uppercase tracking-[0.16em] text-muted">
                {t.name}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
