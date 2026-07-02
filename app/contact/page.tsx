import type { Metadata } from "next";
import Container from "@/components/Container";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell us a little about where you are — we'll reply within two working days.",
};

const INFO = [
  { label: "Email", value: "hello@andintelligence.sg" },
  { label: "Studio", value: "Tanjong Pagar, Singapore" },
  { label: "Sessions", value: "In person & online" },
];

export default function ContactPage() {
  return (
    <section className="px-6 py-24 md:px-10">
      <Container className="grid grid-cols-1 items-start gap-16 md:grid-cols-2">
        <div>
          <div className="mb-4 font-sans text-[10.5px] uppercase tracking-[0.18em] text-purple">
            Get In Touch
          </div>
          <h1 className="mb-6 font-serif text-[clamp(28px,4vw,48px)] font-bold leading-[1.1] text-plum">
            Let&apos;s start the <span className="italic text-purple">conversation</span>.
          </h1>
          <p className="mb-12 max-w-[28rem] font-sans text-[17px] font-light leading-[1.8] text-muted">
            Tell us a little about where you are. We&apos;ll reply within two working days to
            arrange a first conversation.
          </p>
          <div className="flex flex-col gap-8">
            {INFO.map((i) => (
              <div key={i.label} className="flex items-start gap-4">
                <div className="text-lg text-purple">◇</div>
                <div>
                  <div className="mb-1 font-sans text-[10px] uppercase tracking-[0.16em] text-purple">
                    {i.label}
                  </div>
                  <div className="font-sans text-base font-light text-muted">{i.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <ContactForm />
      </Container>
    </section>
  );
}
