import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";

export const metadata: Metadata = {
  title: "Privacy Notice",
};

const commitments = [
  {
    label: "Purpose Limitation",
    desc: "Your fingerprint impressions will only be collected and used for the purpose of preparing your DMIT assessment and consultation.",
  },
  {
    label: "Voluntary Participation",
    desc: "Submission of fingerprint impressions is entirely voluntary. If you choose not to provide them, we will be unable to perform the DMIT assessment.",
  },
  {
    label: "Confidentiality",
    desc: "All fingerprint data and personal information are treated as confidential and are accessible only to authorised personnel and appointed processing partners involved in producing your assessment.",
  },
  {
    label: "Secure Handling",
    desc: "We implement reasonable administrative and technical safeguards to protect your information against unauthorised access, use, disclosure, alteration, or loss.",
  },
  {
    label: "Retention",
    desc: "Your fingerprint data will only be retained for as long as reasonably necessary to complete the assessment, provide related services, fulfil legal obligations, or resolve service matters. Thereafter, the data will be securely deleted or destroyed in accordance with our internal data retention practices.",
  },
];

export default function PrivacyPage() {
  return (
    <section className="px-6 py-24 md:px-10">
      <Container size="md">
        <div className="mb-4 font-sans text-[10.5px] uppercase tracking-[0.18em] text-purple">
          Legal
        </div>
        <h1 className="mb-10 font-serif text-[clamp(28px,4vw,42px)] font-bold leading-[1.1] text-plum">
          Privacy Notice
        </h1>
        <div className="flex flex-col gap-6 font-sans text-base font-light leading-[1.85] text-muted">
          <p>At AND Intelligence, your privacy and trust are important to us.</p>
          <p>
            As part of our Dermatoglyphics Multiple Intelligence Test (DMIT) service, we may
            collect fingerprint impressions solely for the purpose of analysing dermatoglyphic
            patterns to generate your personalised assessment and consultation. Fingerprints
            collected by AND Intelligence are not used for identity verification, law
            enforcement, surveillance, criminal investigations, immigration purposes, or any
            unlawful activity.
          </p>

          <h2 className="mt-4 font-serif text-2xl font-bold text-plum">Our Commitment</h2>
          <p>
            We are committed to handling your personal information responsibly and in accordance
            with Singapore&apos;s Personal Data Protection Act 2012 (PDPA).
          </p>
          <p>When you choose to undergo a DMIT assessment, you can expect the following:</p>

          <ul className="flex flex-col gap-5">
            {commitments.map((c) => (
              <li key={c.label} className="flex gap-3">
                <span className="mt-[2px] flex-none font-serif text-lg text-purple">◇</span>
                <p className="m-0">
                  <span className="font-medium text-plum">{c.label}</span> – {c.desc}
                </p>
              </li>
            ))}
          </ul>

          <p>
            For any enquiries regarding this Privacy Notice, or the handling of your personal
            data, please contact us through the information provided on our{" "}
            <Link href="/contact" className="text-purple no-underline hover:underline">
              Contact page
            </Link>
            .
          </p>
        </div>
      </Container>
    </section>
  );
}
