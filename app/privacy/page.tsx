import type { Metadata } from "next";
import Container from "@/components/Container";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <section className="px-6 py-24 md:px-10">
      <Container size="md">
        <div className="mb-4 font-sans text-[10.5px] uppercase tracking-[0.18em] text-purple">
          Legal
        </div>
        <h1 className="mb-10 font-serif text-[clamp(28px,4vw,42px)] font-bold leading-[1.1] text-plum">
          Privacy Policy
        </h1>
        <div className="flex flex-col gap-6 font-sans text-base font-light leading-[1.85] text-muted">
          <p className="text-purple">
            <em>
              Placeholder — replace with your actual privacy policy before launch. Since the
              contact form submits data to Google Forms, disclose that here (what&apos;s
              collected, how it&apos;s stored, and how people can request deletion).
            </em>
          </p>
          <p>
            AND Intelligence (&quot;we&quot;, &quot;us&quot;) collects the information you submit
            through our contact form — your name, email address, the season of life you select,
            and your message — in order to respond to your enquiry.
          </p>
          <p>
            This information is stored via Google Forms / Google Sheets and is not sold or shared
            with third parties for marketing purposes.
          </p>
          <p>
            To request that your information be deleted, email hello@andintelligence.sg.
          </p>
        </div>
      </Container>
    </section>
  );
}
