# Handover: AND Intelligence website

## What this is
Next.js 14 (App Router) + React 18 + Tailwind marketing site for "AND Intelligence"
(Singapore self-awareness/DMIT practice). Local path: `/Users/ohnirisa/Downloads/intelligenceweb`.

## Live infra — TWO separate GitHub repos + Vercel projects, don't mix them up
- **Production**: remote `origin` → https://github.com/altnisthon/-intelligenceweb.git → Vercel project
  `andintelligenceweb` → **and-intelligence.com** (+ `www.`). This is the live public site.
- **⚠️ `newrepo` (staging) is stale and has been throughout this whole session.** Every single change this
  session — dozens of commits — was pushed straight to `origin`/production with the user's explicit,
  standing approval each time. `newrepo` was never touched. If a future session wants to use staging again,
  check `git log origin/main` vs `git log newrepo/main` first; assume a large gap.
- **Domain**: `and-intelligence.com` + `www.and-intelligence.com` DNS is managed in **Squarespace's domain DNS
  settings** (not delegated nameservers) — custom `A` records for `@`/`www` point to `76.76.21.21`. Works fine.
- **Vercel CLI**: not globally installed, use `npx vercel <command>` from the repo root. Already authenticated
  as `ohnirisa-7180` on this machine. `npx vercel ls andintelligenceweb` to check deployment status — a fresh
  push typically shows `● Building` for under a minute, then `● Ready`. There is effectively no build-failure
  risk left in this codebase at this point (every session-end push this session built and deployed cleanly) —
  don't over-invest in polling; a single `sleep 45 && curl ... | grep <known-new-string>` against the live URL
  is enough to confirm a deploy landed.
- **gh CLI — installed ad hoc, lives in `/tmp`, does NOT survive a reboot/cleanup.** Git is configured (in
  `~/.gitconfig`, global — **do not edit this**, it's off-limits) to use
  `/tmp/gh-cli/gh_2.96.0_macOS_arm64/bin/gh` as the credential helper for `github.com`. **This broke again
  mid-session** (`/tmp` got cleared) with `could not read Username for 'https://github.com': Device not
  configured` on a `git push`. Fix without touching git config — just restore the binary:
  ```bash
  mkdir -p /tmp/gh-cli && cd /tmp/gh-cli
  curl -sL -o gh.zip "https://github.com/cli/cli/releases/download/v2.96.0/gh_2.96.0_macOS_arm64.zip"
  unzip -o gh.zip && chmod +x gh_2.96.0_macOS_arm64/bin/gh
  /tmp/gh-cli/gh_2.96.0_macOS_arm64/bin/gh auth status   # should already show logged in as altnisthon
  ```
  Once restored, `git push` works immediately, no re-auth needed — expect to hit this again in any fresh
  environment/after any `/tmp` clear. Treat it as a routine first-push hiccup, not a real auth problem.
- **Git identity — fixed but only locally in this repo**: `git config --local user.email "ohnirisa@gmail.com"`
  / `user.name "Nurul Khairunisa"`. Confirmed still correctly set throughout this session. If you ever work
  from a fresh clone, set it again or Vercel will silently block deploys (unverified commit-author email).

## Key files
- `app/layout.tsx` — root layout: fonts (Playfair Display, DM Sans, Cormorant Garamond, Caveat), `<Header/>`,
  `<Footer/>`, global metadata. **Cormorant Garamond's config was widened this session** — it's now
  `style:["normal","italic"], weight:["300","400","500","600"]` (was italic-only, 300/400) so it could be used
  for non-italic section subheadings. Note: **as of the latest sitewide font-consolidation pass, Cormorant is
  no longer used on the About page at all** (see below) — check before assuming it's still needed elsewhere;
  it may currently only be live on `/how-it-works`'s "Different seasons of becoming." heading.
- `app/globals.css` — site-wide default paper background (unchanged). **New this session**: a `.mist-page`
  utility class — a `position:fixed` `::before` pseudo-element holding the same soft indigo/wisteria mist
  gradient used behind the homepage testimonials section, reused as a full-page backdrop. Applied to
  `/trainings`, `/how-it-works`, and `/dmit` (added directly on each page's root `<section>`/wrapping `<div>`).
- `app/page.tsx` — homepage route, just renders `<ParallaxHomepage />`.
- `components/ParallaxHomepage.tsx` — the homepage content, template-literal HTML/CSS/JS
  (`dangerouslySetInnerHTML` + appended `<script>`), same unusual structure as before. **Heavily changed this
  session**, specifically the "A practice for the whole human being" pinned section
  (`#practiceSection`/`.practice-pin-wrap`):
  - **Regulate/Relate/Rise copy is now final, long-form text** (not placeholder) — 3 paragraphs each, written
    to `practicePair1/2/3` inside `.practice-pair-copy`.
  - **The wavy word marquee is gone entirely** — removed the `.practice-marquee-stage` HTML, its CSS, and the
    `buildWaveMarquee`/`buildWavePathD` JS functions. If you see any reference to `practiceMarquee1/2/3` or
    `marqueeRegulate/Relate/Rise`, that's stale, delete it.
  - **Photo is bigger and the row is wider**: `.practice-pair-item{max-width:1680px}`,
    `.practice-pair-photo-wrap{flex:0 0 clamp(380px,44vw,620px)}` (was ~380px cap, now ~620px).
  - **Visual redesign, most recent change**: each Regulate/Relate/Rise pair now has its own accent color via
    inline `--stage-accent`/`--stage-accent-soft` CSS custom properties on `.practice-pair-item`
    (Regulate=`#5b2a98` indigo, Relate=`#ca90dc` wisteria, Rise=`#7fae5a` sage green — a bespoke deeper-green
    not used elsewhere in the palette, chosen for text/decorative legibility against paper). This drives: a
    blurred radial-gradient glow behind the photo (`.practice-pair-glow`), a shadow+inset-ring on the photo
    itself, the big background number's color, and a new short accent-color rule (`.practice-pair-rule`) under
    the stage label. A small color-coded progress-dot row (`.practice-stage-dots`, ids `practiceDot1/2/3`) sits
    near the top of the pinned viewport. The photo+text pair also does a subtle scale-in (0.96→1) alongside its
    opacity crossfade now (set in JS alongside opacity, not pure CSS).
  - **Scroll-capture bug, fixed**: `.practice-pair-copy` (the text column) had `overscroll-behavior:contain`.
    Once that inner box's own scroll was exhausted (or it had nothing to scroll at all), `contain` blocked the
    wheel input from ever chaining through to drive the pinned page scroll — so scrolling while hovering the
    paragraph did nothing, while scrolling over the photo worked normally. **Removed `overscroll-behavior`
    entirely**; `overflow-y:auto` alone is correct here. If you ever add scroll-limited inner containers again
    inside a pinned/scrubbed section, do **not** add `overscroll-behavior:contain` unless you specifically want
    to trap scroll — it will break the outer pinned-scroll mechanic exactly like this.
  - Testimonials `.testi-bird-block` was **shrunk roughly in half** this session (`height:clamp(130px,18vw,240px)`,
    was `clamp(220px,32vw,420px)`; bird width similarly reduced) — "the gradient/mist chunk was too big" was the
    ask. The bird-flight progress math (`updateBirdFlight()`) is relative to the block's own height already, so
    it auto-adapted to the shorter scroll-through distance with no separate constant to retune.
  - The wave-marquee text-tiling bug (visible gap in the loop for short words) was fixed **before** the marquee
    was removed entirely — moot now, but if a similar wavy-SVG-textPath marquee is ever rebuilt, remember: repeat
    count must scale with word length so painted text safely overflows the path's actual length, or short words
    leave a blank gap at the loop seam.
- `components/Footer.tsx` — social icons changed: removed LinkedIn ("in") and Facebook ("f"), kept Instagram
  ("IG"), added a new envelope-icon link to `mailto:andintelligencehq@gmail.com`.
- `components/AboutStory.tsx` — **entirely new client component**, the About page's actual content (replaced
  the old static JSX in `app/about/page.tsx`, which now just renders `<AboutStory />`). Full "Our Story" +
  "Founder" copy (final text, not placeholder), scroll-reveal animations via `IntersectionObserver`
  (`Reveal`/`useInView` helpers defined in this file), a `ParallaxWatermark` component (rAF-driven drift, reads
  a stable wrapping ref's rect — same "don't read your own transformed rect" pattern as the homepage). **Font
  policy for this page, settled this session: only DM Sans (body) and Playfair Display (headings + any
  quote/impactful line) — no Cormorant Garamond anywhere on this page.** Both the h1 and the "A note from the
  founder." h2 are Playfair `font-bold`. The purple-dot "chain" list (Self-awareness → better communication →
  ...) has **no arrows**, just dots — removed on request. The founder-closing sentence was iterated a few times
  live with the user; current final wording: *"Because when people finally understand themselves, they stop
  trying to become someone else and start becoming who they were designed to be."* (split into plum/purple
  color halves via an inline `<span>`, not two separate `<p>`s).
- `components/SeasonsGrid.tsx` — **new client component**, the "Who We Serve" / "Different seasons of
  becoming." section on `/how-it-works` (`app/how-it-works/page.tsx` just renders `<SeasonsGrid />` inside its
  second `<section>`). Renders `seasons` from `lib/data.ts` as **equal-size, full-width cards stacked
  vertically** (not a 3-col grid — that was tried and explicitly reverted per "I want it horizontal so each
  stack up on each other"). Each card restores an old, previously-retired homepage effect: a big background
  "01/02/03" number that **flies upward through the card as it scrolls into view**
  (`translateY(170 - progress*400)`, progress computed per-card from its own `getBoundingClientRect()` in a
  self-perpetuating `requestAnimationFrame` loop — this exact mechanic/formula was recovered from git history,
  commit `a8abba9`, where it originally lived as `updateServeParallax()`). Cards also have a scroll-triggered
  "pop up" entrance (`IntersectionObserver`-driven translateY+scale+opacity) and match the Four Steps cards'
  exact background treatment (`bg-white/60 backdrop-blur-md` + a soft drop shadow) so they read as solid white
  against the new `.mist-page` background instead of blending into it.
  - **The `seasons` data in `lib/data.ts` is now the full long-form essay copy** for all three (Youth 14–19,
    Young Adults 20–35, Mid-life 35–55) — an opening question (Playfair italic pull-quote), two body
    paragraphs, and a "What it looks like" 4-item checklist with diamond (`◇`) bullets. The `Programme`-style
    shape changed: `{ badge, label, title, question, body: string[], checklist: string[] }` — no more `desc`/
    `quote`/`wide` fields, those are gone.
- `components/TrainingsTabs.tsx` (`/trainings`, nav-labeled "Sessions/Workshop") — **Individual Journeys now
  has only one card, "Foundations"** ("Common Ground" and "The Deep Work" were removed — per the user,
  Individual Journeys is really just the one session). The expand-arrow mechanic is unchanged (still works,
  verified), but the expanded panel now renders **real structured content** instead of a placeholder line: a
  new `Programme.detail` field (`{ tagline?, heading?, paragraphs: {label?, text}[], bulletsHeading?, bullets?,
  closing? }` — see `lib/data.ts`) drives it. Foundations' expanded panel has "How it works" + the three
  Regulate/Relate/Rise paragraphs (bold inline stage labels) + a "You leave with" bullet list + a "Best for:"
  closing line. Each of the three Workshops (Steady State, Reading the Room, Aura Farming) has an italic
  "If you're..." tagline + one full paragraph + a "You leave with:" closing sentence — all real, final copy,
  not placeholder.
- `app/privacy/page.tsx` — **no longer a placeholder.** Real Privacy Notice covering DMIT fingerprint
  collection scope/purpose, PDPA compliance statement, and five commitments (Purpose Limitation, Voluntary
  Participation, Confidentiality, Secure Handling, Retention) as a bulleted list, closing with a link to
  `/contact`. Title changed from "Privacy Policy" to "Privacy Notice"; the "Legal" eyebrow label above the
  heading was removed per the user (page now starts directly with the h1).
- `app/journal/page.tsx` — listing page. The old dev-note paragraph ("this section is real infrastructure,
  placeholder content — swap the files...") was replaced with a real one-line intro since it's no longer
  accurate (see below — there is no placeholder content left in the journal at all now).
- `content/journal/*.md` + `lib/posts.ts` — **the entire journal is now sourced from the founder's Substack**
  (`vogueeunice.substack.com` — confirmed by the user to be the AND Intelligence founder's own writing, so
  full-text republishing is authorized; this was explicitly checked before the first post was added, per this
  assistant's copyright-caution policy). All original placeholder/dummy posts (`the-3r-framework`,
  `understanding-dmit`, `welcome-to-the-journal`, and later `why-self-awareness-matters` — the last one was
  genuine written content, not a placeholder, but was removed anyway on request) and their placeholder
  cover images (`.svg` files) were deleted. **Current posts, newest first** (6 total as of this session):
  `the-art-of-looking-away`, `we-all-have-a-monster`, `we-mistook-being-needed-for-being-loved`,
  `the-great-human-operating-manual`, `modern-love-was-never-designed-to-work`,
  `the-personality-you-think-you-have`. **Workflow for adding another one** (established and repeated ~6
  times this session, works reliably): user pastes a `vogueeunice.substack.com/p/<slug>` URL → fetch it with
  the browser tool (not `WebFetch`, which paraphrases/summarizes through a small model instead of returning
  verbatim text — use `get_page_text` / `read_page` on a real browser tab instead) → extract title, "Jul N,
  2026" date, the subtitle/dek as `excerpt`, full body text preserving the author's own short-paragraph
  structure, and the post's embedded Substack CDN image URL (found via `read_page filter:all`, a
  `substackcdn.com/image/fetch/...` link) → `curl` that image down to `/tmp`, copy it into
  `public/journal/<slug>.jpg`, write `content/journal/<slug>.md` with frontmatter
  (`title`/`date`/`excerpt`/`coverImage`) matching the existing file format exactly → `npm run build` to
  confirm the new static path generates → commit + push. No image-embedding-in-body support exists in the
  markdown pipeline (`lib/posts.ts` just runs `remark`/`remark-html` over the body) — only the one frontmatter
  `coverImage` per post is used; if a Substack post has multiple inline images, just use the first/most
  relevant one as the cover and skip the rest, matching the pattern already established across all 6 posts.
- `components/RadialChart.tsx`, `components/Header.tsx`, `components/Logo.tsx`, `app/contact`, `app/faq`,
  `app/dmit` — **unchanged this session**, see prior handover notes if touching these (not reproduced here for
  length; nothing about them is stale, they just weren't part of this session's work).
- `lib/data.ts` — now also exports `ProgrammeParagraph`/`ProgrammeDetail` types (for `TrainingsTabs`) alongside
  the existing `Chip`/`Programme` types, `steps`, and the redesigned `seasons` array (see `SeasonsGrid` above).
- No test suite. `npm run build` is the check that matters (catches type errors + confirms every journal post's
  static path generates). `npm run lint` still prompts an interactive ESLint setup wizard on first run.

## Known quirks / gotchas (new this session — earlier sessions' gotchas below this list still apply)
1. **This session's browser-preview tool had a recurring, session-wide rendering stall** affecting
   `requestAnimationFrame` (scheduled callbacks sometimes just never fire — confirmed via a direct
   `requestAnimationFrame(() => flag='fired')` probe that stayed `'pending'` even after a real 1-second wait),
   `IntersectionObserver` callbacks, and even the `computer` tool's real `scroll` action (timed out after
   30s). Screenshots taken at any non-zero scroll position frequently came back **fully blank** (correct paper
   background color, zero content) even though `getComputedStyle`/`getBoundingClientRect` confirmed the real
   DOM was correct and fully rendered. **This is a tool/environment issue, not a code bug** — verified
   repeatedly by cross-checking against computed styles, `get_page_text`, and against known-working production
   behavior (the exact same `IntersectionObserver` reveal pattern used elsewhere on the live site was already
   confirmed working in earlier sessions). Workarounds that helped, in order of reliability: (a) open a
   **fresh tab** via `tabs_create` + `navigate` — fixed it most of the time, though not always by the end of
   the session; (b) use **mobile-preset viewport** screenshots instead of desktop-sized ones — these kept
   rendering correctly at scroll depth throughout, even when desktop-sized screenshots at the same scroll
   position came back blank; (c) manually force the JS state you want to inspect (e.g. directly set
   `element.style.opacity='1'` instead of relying on the scroll handler to set it) to at least visually verify
   markup/CSS, decoupled from whether the scroll-driven JS pipeline itself is executing in the tool. If a
   future session hits the same wall, don't burn time debugging the *site's* code first — try a fresh tab and
   mobile-viewport screenshots before assuming a real regression.
2. **`overscroll-behavior:contain` inside a pinned/scrubbed section can silently break the whole pin
   mechanic** — see the `ParallaxHomepage.tsx` entry above. Any inner `overflow-y:auto` scroll container living
   inside a `position:sticky` pinned section should almost never have `overscroll-behavior:contain`; without
   it, once the inner box's scroll is exhausted, wheel input correctly falls through to the outer (real, page-
   level) scroll that actually drives the pin's progress calculation.
3. **`WebFetch` paraphrases/summarizes page content through a small model — it does not return verbatim text.**
   For anything requiring exact-text extraction (this session: full Substack article bodies for direct
   republishing), use the browser tool (`preview_start`/`navigate` + `get_page_text` or `read_page`) instead.
   Confirmed directly this session: a `WebFetch` call against a Substack post returned a paraphrased summary
   with `[See original content above...]` placeholders where the real body text should have been.
4. **Republishing third-party content requires an explicit rights check first.** Before importing the first
   Substack post into the journal, this assistant asked the user to confirm `vogueeunice.substack.com` is the
   founder's own writing (not someone else's, which would be copyright infringement to republish in full) —
   the user confirmed it is. That confirmation should be treated as covering the whole publication going
   forward (all 6 posts imported this session came from the same author/publication), but if a *different*
   Substack or outside source is ever proposed for the journal, check again before copying full text.
5. **`git push` failing with `could not read Username for 'https://github.com': Device not configured`** almost
   always means the `/tmp/gh-cli` binary got cleared, not a real auth problem — see the Live Infra section
   above for the one-command fix. Don't touch `~/.gitconfig` or re-run `gh auth login`; the token is fine.

## Naming calls made this session, easy to revisit
- About page fonts: **DM Sans (body) + Playfair Display (headings/quotes) only**, no Cormorant Garamond — an
  explicit, deliberate simplification from an earlier session's "headers=Playfair, subheaders=Cormorant"
  sitewide rule. That sitewide rule may still apply elsewhere (e.g. `/how-it-works`'s season-section heading is
  still Cormorant) — this override was scoped to the About page specifically, not undone globally.
- Who We Serve / seasons cards: **stacked vertically, full-width**, not a 3-column grid — tried the grid first,
  user explicitly asked for the stacked version instead ("I want it horizontal so each stack up on each
  other").
- Individual Journeys is **one card only (Foundations)** — not an oversight, an explicit correction ("the
  individual journey is actually 1 session").
- Journal is **entirely Substack-sourced now** — every placeholder and even the one genuinely-written non-
  Substack post were removed on request; don't add hand-written filler posts back without checking first.
- Practice-section stage colors (Regulate=indigo, Relate=wisteria, Rise=sage-green `#7fae5a`) are a **new,
  bespoke assignment** made this session for visual variety — there was no pre-existing per-stage color
  convention anywhere else in the codebase (chip "highlight" color is a single universal mint-green regardless
  of stage) to match against, so this doesn't need to be reconciled with anything else.
- The visual redesign of the practice section (glow, photo frame, progress dots, scale-in) was delivered as
  "make it more aesthetically pleasing, I'll see if I like it" — **not yet explicitly confirmed liked** by the
  user as of end of session, just deployed. If picking this up, it's worth checking whether the user wants
  further iteration on it before treating it as settled.

## Typical workflow for future changes (unchanged from prior sessions)
1. Edit files locally in `/Users/ohnirisa/Downloads/intelligenceweb`.
2. `npm run dev` (or the Claude Code preview tool, config name `intelligenceweb-dev`) to check changes.
   **Stop the dev server before running `npm run build`** (running both against the same `.next` directory
   corrupts it — `rm -rf .next` and restart the dev server if you see stale/wrong errors after a build).
3. `npm run build` to catch type errors and confirm new journal static paths generate correctly.
4. `git add <specific files>` (never `-A`/`.` — this repo's `.gitignore` doesn't cover `.claude/`, and that
   directory should stay untracked), `git commit`.
5. `git push origin main` — this session, every single push went straight to production (`origin`) with the
   user's ongoing explicit approval; `newrepo`/staging was not used at all. Confirm with the user if that
   convention should still hold, but expect it does.
6. If push fails with a credential error, it's almost certainly the `/tmp/gh-cli` binary gotcha — see Live
   Infra section, one-command fix, not a real problem.
7. Vercel auto-deploys on push (~30-40s typical). Confirm with `sleep 45 && curl -s https://and-intelligence.com/<path> | grep -o "<known new string>"` rather than polling `npx vercel ls` repeatedly — faster and sufficient given this codebase's consistent clean-build track record this session.
