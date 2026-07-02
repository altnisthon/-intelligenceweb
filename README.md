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

## Connecting the contact form to Google Forms

The contact form (`components/ContactForm.tsx`) submits directly to a Google Form's response
endpoint — no backend needed, and you get a normal Google Forms/Sheets inbox plus email
notifications.

1. **Create the Google Form** with four fields, in this order:
   - Name — Short answer
   - Email — Short answer
   - Which season are you in? — Multiple choice: `Youth (14–19)`, `Young Adult (20–35)`,
     `Mid-Life (35–55)`
   - What's on your mind? — Paragraph

2. **Turn on notifications**: in the form, go to *Responses* → the three-dot menu → *Get email
   notifications for new responses*. This is what actually notifies you when someone submits.

3. **Get the field IDs**: click *Send* → the link icon → check *Shorten URL* off → open the
   **pre-filled link** option (⋮ menu → "Get pre-filled link"), fill in dummy values for every
   field, click *Get link*, then open that link and look at the URL — you'll see parameters like
   `entry.123456789=Jane`. Copy each `entry.XXXXXXXXX` name against the field it belongs to.

4. **Get the action URL**: take the form's normal share URL (ends in `/viewform`) and change the
   ending to `/formResponse`.

5. Copy `.env.local.example` to `.env.local` and fill in the five values:

   ```bash
   cp .env.local.example .env.local
   ```

6. Restart `npm run dev`. Submitting the form should now create a new row in the linked Google
   Sheet and trigger your notification email.

7. When deploying to Vercel, add the same five `NEXT_PUBLIC_GOOGLE_FORM_*` variables under
   **Project Settings → Environment Variables**.

Until these are set, the form still renders and validates normally, but shows a friendly
"not connected yet" message instead of silently failing.

## Journal / blog

Real Markdown-backed infrastructure, placeholder content. Each post is a `.md` file in
`content/journal/` with frontmatter:

```md
---
title: "Post title"
date: "2026-01-01"
excerpt: "One-sentence summary shown on the index page."
---

Body content in Markdown.
```

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
