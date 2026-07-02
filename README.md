# AND Intelligence — website

Rebuilt from the `AND_Intelligence_dc.html` design prototype as a real, multi-page Next.js site
(App Router + TypeScript + Tailwind CSS), ready to push to GitHub and deploy on Vercel.

## Pages

| Route | Purpose |
|---|---|
| `/` | Home — hero, marquee, condensed intro, who-we-serve teaser, testimonials, CTA |
| `/trainings` | Individual Journeys / Workshops tabs, full Who We Serve |
| `/dmit` | DMIT explainer + radial intelligence diagram |
| `/how-it-works` | The 4-step process |
| `/about` | Story + Founder (placeholder copy — see below) |
| `/faq` | Accordion FAQ |
| `/journal`, `/journal/[slug]` | Blog — real infrastructure, placeholder posts |
| `/contact` | Contact form (see Google Forms setup below) |
| `/privacy` | Placeholder privacy policy |

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Connecting the contact form

The contact form (`components/ContactForm.tsx`) posts to a small **Google Apps Script Web App**
that emails you every submission. Earlier drafts tried posting straight to Google Forms'
internal `/formResponse` endpoint — that's an unofficial, reverse-engineered trick, and testing
it against this project's own form showed Google's current Forms backend rejects it outright
(returns a disabled, unfilled form instead of recording anything). The Web App approach below is
officially supported and was the fix.

1. Open [script.google.com](https://script.google.com) → New project.
2. Paste in `create-contact-form.gs` (in this repo, or the copy shared in chat).
3. **Part A** (optional, just creates a record-keeping Google Form): run `createContactForm`
   once, authorize when prompted.
4. **Part B** (the important part): *Deploy* → *New deployment* → gear icon → *Web app* →
   Execute as **Me**, Who has access **Anyone** → *Deploy*. Copy the URL ending in `/exec`.
5. Copy `.env.local.example` to `.env.local` and paste that URL in as
   `NEXT_PUBLIC_CONTACT_WEBAPP_URL`.
6. Restart `npm run dev`. Submitting the form should land an email in your inbox within a
   few seconds.
7. On Vercel: add the same `NEXT_PUBLIC_CONTACT_WEBAPP_URL` under **Project Settings →
   Environment Variables**, then redeploy.

If you ever edit the script, re-deploy via *Deploy* → *Manage deployments* → pencil icon →
*New version* → *Deploy* — editing the code alone doesn't update the live `/exec` URL's
behavior.

Until this is set, the form still renders and validates, but shows a friendly "not connected
yet" message on submit instead of silently failing.

## Journal / blog

Real Markdown-backed infrastructure, placeholder content and placeholder cover art. Each post is
a `.md` file in `content/journal/` with frontmatter:

```md
---
title: "Post title"
date: "2026-01-01"
excerpt: "One-sentence summary shown on the index page."
coverImage: "/journal/post-slug.svg"
---

Body content in Markdown.
```

`coverImage` is optional — omit it and the post just renders without a cover. Drop the actual
image file in `public/journal/` (svg, jpg, or png all work). The three placeholder covers
currently there are original abstract art generated in the site's own colour palette
specifically so nothing here depends on stock photography or unclear licensing — swap them for
real photography whenever you have it.

Add a file, redeploy, and it shows up on `/journal` automatically — no CMS required. If this
grows past a handful of posts, swap `lib/posts.ts` for a real headless CMS (Sanity, Contentful,
Notion-as-CMS, etc.) without touching the page components.

## Content still marked as placeholder

- `/about` — founding story and founder bio/photo
- `/privacy` — full privacy policy text
- `content/journal/*.md` — all three posts

Search the codebase for `Placeholder` to find every spot that needs real copy before launch.

## Design tokens

Colors, type scale and spacing live in `tailwind.config.ts`, matching the original prototype:
Playfair Display (headlines), DM Sans (body/UI), Cormorant Garamond (quotes), on the
lavender/mint gradient background. The `&` mark is `public/logo.png` (also used as the site
favicon via `app/icon.png`) — replace that one file to update the logo everywhere.

## Deploying

1. Push this repo to GitHub.
2. Import it into [Vercel](https://vercel.com/new) — it auto-detects Next.js, no config needed.
3. Add the `NEXT_PUBLIC_GOOGLE_FORM_*` environment variables (see above) before or after the
   first deploy — redeploy after adding them.
4. Point your domain at the Vercel project once you're happy with a preview deploy.
