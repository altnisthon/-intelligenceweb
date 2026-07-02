"use client";

import { FormEvent, useState } from "react";

const WEBAPP_URL = process.env.NEXT_PUBLIC_CONTACT_WEBAPP_URL ?? "";
const isConfigured = Boolean(WEBAPP_URL);

const fieldClass =
  "w-full border border-lavender bg-white/60 px-[18px] py-4 font-sans text-[15px] font-light text-plum outline-none transition-colors focus:border-purple";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "sent" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!isConfigured) {
      // eslint-disable-next-line no-console
      console.warn(
        "Contact form isn't connected to the Apps Script Web App yet. Add NEXT_PUBLIC_CONTACT_WEBAPP_URL to .env.local — see README.md."
      );
      setStatus("error");
      return;
    }

    const form = e.currentTarget;
    const data = new FormData(form);
    const params = new URLSearchParams();
    params.append("name", String(data.get("name") ?? ""));
    params.append("email", String(data.get("email") ?? ""));
    params.append("season", String(data.get("season") ?? ""));
    params.append("message", String(data.get("message") ?? ""));

    setStatus("submitting");
    try {
      // Apps Script Web Apps (deployed with "Anyone" access) accept
      // cross-origin POSTs like this directly — no CORS workaround needed,
      // unlike Google Forms' internal endpoint.
      const res = await fetch(WEBAPP_URL, { method: "POST", body: params });
      const json = await res.json().catch(() => null);
      if (!res.ok || (json && json.ok === false)) throw new Error("submit failed");

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
          This form isn&apos;t connected yet — see the README for the (quick) setup steps.
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
