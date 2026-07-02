"use client";

import { FormEvent, useState } from "react";

const ACTION_URL = process.env.NEXT_PUBLIC_GOOGLE_FORM_ACTION_URL ?? "";
const ENTRY_NAME = process.env.NEXT_PUBLIC_GOOGLE_FORM_ENTRY_NAME ?? "";
const ENTRY_EMAIL = process.env.NEXT_PUBLIC_GOOGLE_FORM_ENTRY_EMAIL ?? "";
const ENTRY_SEASON = process.env.NEXT_PUBLIC_GOOGLE_FORM_ENTRY_SEASON ?? "";
const ENTRY_MESSAGE = process.env.NEXT_PUBLIC_GOOGLE_FORM_ENTRY_MESSAGE ?? "";

const isConfigured = Boolean(ACTION_URL && ENTRY_NAME && ENTRY_EMAIL && ENTRY_SEASON && ENTRY_MESSAGE);

const fieldClass =
  "w-full border border-lavender bg-white/60 px-[18px] py-4 font-sans text-[15px] font-light text-plum outline-none transition-colors focus:border-purple";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "sent" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!isConfigured) {
      // Dev-time guardrail — see README for how to connect the real Google Form.
      // eslint-disable-next-line no-console
      console.warn(
        "Contact form is not connected to a Google Form yet. Add the NEXT_PUBLIC_GOOGLE_FORM_* values to .env.local — see README.md."
      );
      setStatus("error");
      return;
    }

    const form = e.currentTarget;
    const data = new FormData(form);
    const params = new URLSearchParams();
    params.append(ENTRY_NAME, String(data.get("name") ?? ""));
    params.append(ENTRY_EMAIL, String(data.get("email") ?? ""));
    params.append(ENTRY_SEASON, String(data.get("season") ?? ""));
    params.append(ENTRY_MESSAGE, String(data.get("message") ?? ""));

    setStatus("submitting");
    try {
      // Google Forms doesn't send CORS headers, so we submit "blind" with
      // no-cors — we can't read the response, but the submission still
      // reaches the form (and triggers your email notification, once
      // enabled in the form's Settings > Responses).
      await fetch(ACTION_URL, {
        method: "POST",
        mode: "no-cors",
        body: params,
      });
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="flex flex-col items-start gap-3 border border-lavender bg-white/60 p-10">
        <div className="font-serif text-2xl italic text-purple">Thank you.</div>
        <p className="font-sans text-[15px] font-light leading-[1.8] text-muted">
          We&apos;ve received your message and will reply within two working days to arrange a
          first conversation.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-[1.2rem]">
      <input name="name" required placeholder="Your name" className={fieldClass} />
      <input
        name="email"
        type="email"
        required
        placeholder="Email address"
        className={fieldClass}
      />
      <select name="season" required defaultValue="" className={fieldClass}>
        <option value="" disabled>
          Which season are you in?
        </option>
        <option value="Youth (14–19)">Youth (14–19)</option>
        <option value="Young Adult (20–35)">Young Adult (20–35)</option>
        <option value="Mid-Life (35–55)">Mid-Life (35–55)</option>
      </select>
      <textarea
        name="message"
        required
        rows={4}
        placeholder="What's on your mind?"
        className={`${fieldClass} resize-y`}
      />
      <button
        type="submit"
        disabled={status === "submitting"}
        className="bg-purple px-[17px] py-[17px] font-sans text-xs font-medium uppercase tracking-[0.1em] text-offwhite transition-colors hover:bg-purple-dark disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send Message"}
      </button>

      {status === "error" && !isConfigured && (
        <p className="font-sans text-xs text-purple">
          This form isn&apos;t connected to Google Forms yet — see the README for setup steps.
        </p>
      )}
      {status === "error" && isConfigured && (
        <p className="font-sans text-xs text-purple">
          Something went wrong sending that — mind trying again, or email hello@andintelligence.sg
          directly?
        </p>
      )}
    </form>
  );
}
