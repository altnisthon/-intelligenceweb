# Handover: AND Intelligence website

## What this is
Next.js 14 (App Router) + React 18 + Tailwind marketing site for "AND Intelligence"
(Singapore self-awareness/DMIT practice). Local path: `/Users/ohnirisa/Downloads/intelligenceweb`.

## Live infra — TWO separate GitHub repos + Vercel projects, don't mix them up
- **Production**: remote `origin` → https://github.com/altnisthon/-intelligenceweb.git → Vercel project
  `andintelligenceweb` → **and-intelligence.com** (+ `www.`). This is the live public site. **Do not push here
  without explicit approval** — it auto-deploys on push, no PR flow, no staging step in front of it.
- **Review/staging**: remote `newrepo` → https://github.com/altnisthon/andintelligencewebnew.git → Vercel
  project `andintelligencewebnew` → https://andintelligencewebnew.vercel.app. This is where in-progress
  homepage work gets pushed for the user to review before it's approved to go to production. **This is the
  remote currently in active use** — `git push newrepo main`, not `git push origin main`, unless told otherwise.
- Local branch `main` tracks `newrepo/main` (check `git status` — it'll say "up to date with 'newrepo/main'").
  There is no branching/PR workflow on either repo; every push to `main` on either remote deploys immediately
  to that remote's Vercel project.
- **Domain**: `and-intelligence.com` + `www.and-intelligence.com` DNS is managed in **Squarespace's domain DNS
  settings** (not delegated nameservers) — custom `A` records for `@`/`www` point to `76.76.21.21`. Works fine;
  Vercel has separately suggested newer records (`216.198.79.1` A, `5b4fd08d06ced813.vercel-dns-017.com` CNAME)
  as an optional IP-range-expansion upgrade, not required.
- **Vercel CLI**: not globally installed, use `npx vercel <command>` from the repo root. Already authenticated
  as `ohnirisa-7180` on this machine (session-scoped auth, may need `npx vercel login` again in a new environment).
  `npx vercel ls andintelligencewebnew` / `npx vercel ls andintelligenceweb` to check either project's deployments
  (note: bare `npx vercel ls` with no project name defaults to whatever project this directory's local `.vercel`
  link points to — check the printed project name before trusting that output).
- **gh CLI**: installed ad hoc at `/tmp/gh-cli/gh_2.96.0_macOS_arm64/bin/gh` (not on PATH permanently, and
  `/tmp` may not persist across reboots). If `git push` fails with "could not read Username", reinstall or
  re-auth `gh`, or just `git push` interactively / via SSH if the user sets that up instead.
- **Git identity — fixed but only locally in this repo**: this machine has no global `user.email`/`user.name`,
  so commits used to fall back to an auto-detected `ohnirisa@batbook.local`, which **silently blocks Vercel
  deployments** (see gotcha #13 below — this cost a lot of debugging time once). It's now set correctly inside
  *this* repo only (`git config --local user.email "ohnirisa@gmail.com"` / user.name "Nurul Khairunisa"). If
  you ever work from a fresh clone or a different repo on this machine, set it again, or better, run
  `git config --global user.email "ohnirisa@gmail.com"` once so it's never an issue again.

## Key files
- `app/layout.tsx` — root layout: fonts (Playfair Display, DM Sans, Cormorant Garamond, Caveat), `<Header/>`,
  `<Footer/>`, global metadata. Shared across all pages.
- `app/page.tsx` — homepage route, just renders `<ParallaxHomepage />`.
- `components/ParallaxHomepage.tsx` — **the homepage content**, and the one file you'll touch most.
  Unusual structure: it's plain HTML/CSS/JS as **template-literal strings** (`HOMEPAGE_CSS`, `HOMEPAGE_BODY`,
  `HOMEPAGE_SCRIPT`) injected via `dangerouslySetInnerHTML` and a manually-appended `<script>` tag — not
  idiomatic React/JSX. This was a ported static prototype and has stayed that way deliberately through several
  redesigns. To change copy, styles, or behavior on the homepage, edit the relevant string inside this file
  (search by class name or text). Mind escaping `` ` `` and `${}` if you ever add template-literal-sensitive
  characters inside these strings.
- `components/Header.tsx`, `components/Footer.tsx`, `Logo.tsx` — shared nav/footer, real JSX components,
  rendered once by the root layout. Header is currently a dark/ink bar with light text and a pill-shaped
  "Begin the Conversation ↗" CTA (matches the hero's dark opening beat).
- Other pages: `app/about`, `app/contact`, `app/dmit`, `app/faq`, `app/how-it-works`, `app/journal`,
  `app/privacy`, `app/trainings` — normal JSX pages, more conventional than the homepage, still on the
  earlier lavender/paper palette (not part of the recent homepage rework).
- `public/hero/` — all assets for the homepage's hero, About section, testimonials and final CTA (inventory below).
- `public/images/and-logo.png` — the "&" mark used in the hero's logo beat and in Header/Footer. Its two
  brand colors (sampled via PIL this session) are **lavender `rgb(176,160,237)` / `#b0a0ed`** and
  **mint `rgb(154,237,182)` / `#9aedb6`** — used directly in the final-CTA gradient blobs and the final-CTA
  heading color. `public/images/wai-*.webp` — leftover illustrated figures from a retired "What AND Is"
  section, **unused now**, left in place, safe to delete whenever.
- `public/logo.png` — main site logo used by Header/Footer.
- `lib/data.ts`, `lib/posts.ts` — site data (e.g. "seasons" content) and journal post loading (uses
  `gray-matter`/`remark` over `content/journal/*.md`).
- No test suite. `npm run lint` / `npm run build` are the only checks (`npm run lint` prompts an interactive
  ESLint setup wizard the first time — just skip it, `npm run build` is the more useful check anyway).

## Current homepage structure (top to bottom)
1. **Hero** (`#heroSection`, `.hero-pin-wrap`) — a ~550svh pinned scroll-scrub sequence, identical behavior on
   desktop and mobile (only element sizes differ via a `@media (max-width:640px)` block):
   - Beat 1 (0–~32% of scroll): `frame-1.mp4` plays as real looping video underneath everything (not
     scroll-scrubbed — earlier attempts at scrubbing `currentTime` to scroll position looked staticky/jerky).
   - Beats 2–4: the "&" logo → `fingerprint.png` → `and-intelligence-wordmark.png` crossfade over the video.
   - Beat 5 (~34–90%): background swaps between `regulate.png` / `relate.png` / `rise.png`, each paired with
     its bubble-font word image (`regulate-word.png` etc., swapped via JS by changing `<img>` `src`) and a
     line of copy.
   - Beat 6 (~90–100%): the three words condense into a wavy "Regulate · Relate · Rise" line, the wordmark
     resettles, a retained quote fades in, then the pin releases.
   - Left-edge scroll-progress dot nav (`#dotsNav`) tracks 4 sections: Hero, the About/Who-We-Serve section,
     Testimonials, Final CTA. Hidden below 900px viewport width.
2. **Marquee** — plain ticker, unchanged from earlier passes.
3. **About section** (`#serveSection`, replaces an earlier "Who We Serve" section) — two beats:
   - **"And... What?"** — full-bleed (`.about-video-block`, sits outside `.section-wrap` so it spans the
     whole viewport width) video background (`and-what-bg.mp4`, muted/loop/autoplay), the `and-what.png`
     bubble-font heading in its **original pale cream color** (legible against the dark video overlay), and
     the two paragraphs retired from the old "What AND Is" section.
   - **"And then what?"** — plain paper background, `and-then-what.png` bubble-font heading **darkened**
     via `filter:brightness(0)` on `.bubble-heading` (it's the same pale-cream asset as the others, but this
     beat has no video behind it, so it'd be nearly invisible on paper without the filter — this filter is
     overridden back to `none` specifically inside `.about-video-block` for the "And... What?" heading).
     Followed by "Well… you *become*" (the `.accent-mark` hand-lettered treatment, reused from the hero's
     "AND"), then the Youth/Young Adults/Mid-Life cards (`.serve-card`), then a "See All Trainings" CTA with
     small sparkle/star SVG accents around it.
   - The big faint "01/02/03" numbers behind each card (`.serve-num`) now **fly upward through the card** as
     you scroll past it (reworked this session — was a subtle background-parallax drift before). See gotcha
     #3 below before touching this.
4. **Testimonials** (`#testimonialsSection`) — **fully reworked this session**, envelope-open interaction
   retired entirely. Three beats:
   - **`.testi-scene`** — full-bleed gradient (`indigo-deep → indigo → wisteria → paper`, 170deg), holding
     the `In Their Words` eyebrow and the `other-like-you-said.png` bubble-font heading (cropped to trim its
     source transparent padding — see gotcha #14 — and enlarged; sits on the gradient so keeps `filter:none`,
     unlike the paper-background bubble headings).
   - **`.testi-bird-block`** — `bird.png` (a torn-newspaper-collage swallow) flies left→right as this block
     scrolls through the viewport, with a bob/rotate for a "flying" feel (`updateBirdFlight()` in
     `HOMEPAGE_SCRIPT`, tied into the same `onScroll` rAF loop as the hero/serve-num parallax). The bird PNG
     itself has a **flat white background, not transparent** — `mix-blend-mode:multiply` on `.testi-bird`
     is what drops the white and lets the gradient show through; don't "fix" this by trying to make the PNG
     transparent, multiply is the intended trick here.
   - **`.testi-wrap` / `.testi-grid`** — 3 floating, sparkling cards (`.testi-card-wrap` does a continuous
     whimsical up/down `translateY` bob via CSS keyframes, independent of the card's own scroll-reveal
     transform so the two don't fight over the same property; each card has 5 small pulsing sparkle SVGs
     around its corners in alternating lime/wisteria). Desktop: hover a card to reveal its quote (placeholder
     text hides on hover). Mobile (`≤860px`): quotes show directly, no hover, sparkles/floating stay. The
     background here is **plain paper** — an earlier attempt at a light gradient wash bleeding down from the
     scene into this section was explicitly reverted (see "reverted" note below) because it created a visible
     hard edge; don't re-add a bleed here unless asked.
5. **Final CTA** (`#finalCtaSection`) — **fully reworked this session**, placeholder photo slot retired.
   `.final-cta-bg` holds 3 blurred, independently-animated radial-gradient "blobs" in the logo's lavender/mint
   (`ctaFloatA/B/C` keyframes, different durations/delays so they read as an organic floating wave, not a
   synced loop; `prefers-reduced-motion` pauses them). Over that, `start-with-understanding.png` (cropped like
   the testimonial heading, and **recolored** — its source pixels were replaced with the logo's lavender
   `#b0a0ed` via PIL, keeping the original alpha shape — so `.final-cta-heading` sets `filter:none` to show
   the true color instead of the usual `brightness(0)` darkening) sits above the paragraph and CTA button.

## Asset inventory (`public/hero/`)
| File | Used for |
|---|---|
| `frame-1.mp4` (29MB) | Hero beat 1 background video |
| `and-what-bg.mp4` (8.9MB) | About section's "And... What?" background video |
| `and-intelligence-wordmark.png` | Hero beats 4 & 6 (bubble-font "And Intelligence") |
| `fingerprint.png` | Hero beat 3 |
| `regulate.png` / `relate.png` / `rise.png` (3.7–5.1MB each) | Hero beat 5 backgrounds |
| `regulate-word.png` / `relate-word.png` / `rise-word.png` | Hero beat 5 bubble-font word labels |
| `and-what.png` / `and-then-what.png` | About section bubble-font headings |
| `bird.png` | Testimonials — flies across the gradient scene on scroll (`mix-blend-mode:multiply`) |
| `other-like-you-said.png` | Testimonials gradient-scene heading (cropped from source, enlarged) |
| `start-with-understanding.png` | Final CTA heading (cropped from source, recolored to logo lavender) |

**Still flagged, not yet done**: `frame-1.mp4`, `and-what-bg.mp4`, and the 3 `regulate/relate/rise.png` photos
are all large (multi-MB) and uncompressed — fine for local dev, worth a compression pass (video re-encode +
image compression) before this goes to production, since they're some of the first things the homepage loads.

**Still unused, sitting in the source folder** (`/Users/ohnirisa/Desktop/andintelligence web/`, not copied
into `public/` yet): `bubble font of and intelligence.png`, `fingerprint 2.png`. No assigned purpose yet — ask
before using if they come up.

## Known quirks / gotchas
1. **Bubble-font PNGs are pale cream ink by design** — meant to sit on dark backgrounds. On a light/paper
   background they need `filter:brightness(0) opacity(.88)` (the `.bubble-heading` default) or they're nearly
   invisible; on a dark background (video, gradient) override back to `filter:none`. The testimonial heading
   uses `filter:none` (sits on a dark gradient); the final-CTA heading also uses `filter:none`, but for a
   different reason — its source pixels were directly recolored to the logo purple, so it doesn't need (and
   shouldn't get) the darkening filter either. Check background context before assuming the default applies.
2. **`vh` → `svh` for the hero pin**: `.hero-pin-wrap`/`.hero-pin` use `svh` (stable viewport height) instead
   of plain `vh`, specifically to avoid mobile browsers' collapsing address bar causing pin-height jumps
   mid-scroll. If you add more pinned/scrubbed sections, use `svh` there too for the same reason.
3. **Scroll-linked parallax must reference a stable element, not itself**: both `updateServeParallax()` (the
   01/02/03 fly-up) and `updateBirdFlight()` (the testimonial bird) in `HOMEPAGE_SCRIPT` compute progress from
   a **stable ancestor's** `getBoundingClientRect()` (the card, or the bird's own wrapping block), not from an
   element that already has a transform applied to it from the previous frame — reading a self-transformed
   rect would compound every scroll event into runaway drift. This was an actual bug caught and fixed early
   on; keep the same pattern for any future scroll-linked motion. The serve-num math specifically: progress
   0→1 as the card scrolls from viewport-bottom to viewport-top, mapped to `translateY` from `+170px` (below
   its resting spot) to `-230px` (flies out through the card's own `overflow:hidden` clip) — i.e. it launches
   up from below, settles at its natural spot roughly mid-scroll, then flies out the top. The bird math is
   similar but also multiplies progress by `1.8` so the crossing completes before the block finishes
   scrolling through (then holds off-screen right) — that's the "faster" flight the user asked for.
4. **Effect cleanup matters**: `ParallaxHomepage`'s `useEffect` appends a `<script>` tag and the script itself
   registers `window.__heroTeardown` at the end, which the effect's cleanup calls before removing the script.
   This exists because React (especially Strict Mode in dev) can run the effect twice, and without explicit
   teardown the `window.addEventListener('scroll', ...)` / `IntersectionObserver` instances from the first run
   never get removed — a real leak, not just a dev-mode annoyance, since it'd also leak on every client-side
   navigation away from the homepage. If you add new listeners/observers inside the script, add their
   teardown to `window.__heroTeardown` too. (The old testimonial-envelope `IntersectionObserver` was removed
   from both the script body and this teardown list when the envelope interaction was retired this session —
   if you still see references to `testiIo`/`testiEnvelope`/`testiCard1..3` anywhere, that's stale, delete it.)
5. **`position:sticky` is not a reliable containing block for `position:absolute` children** in all browsers —
   `.hero-stage` exists as a plain `position:relative` wrapper *inside* the sticky `.hero-pin` specifically to
   work around this. Keep this inner wrapper if you restructure the hero.
6. **`overflow-x:hidden` on an ancestor silently breaks `position:sticky` for its descendants** — don't re-add
   blanket `overflow-x:hidden` anywhere upstream of the hero pin (`.parallax-homepage-root` had this bug once,
   fixed by removing the property).
7. **Dev server `.next` cache corruption — this bit us three times this session.** Running `npm run build`
   while `npm run dev` (or the Claude Code preview tool's dev server) is live against the same `.next`
   directory corrupts it, producing `Cannot find module './NNN.js'` errors on every route including `/`. Fix:
   stop the dev server first, `rm -rf .next`, then restart. **Better: just don't run `npm run build` while a
   dev server is running at all** — stop the dev server, build, then restart it if you need both.
8. **Browser scroll-position restoration** can make a freshly-reloaded page appear to start mid-scroll — set
   `history.scrollRestoration = 'manual'` and `window.scrollTo(0, 0)` before relying on scroll position when
   testing scroll-driven behavior.
9. Testimonial quotes on mobile show directly (no hover) via a CSS override at `≤860px` — don't remove that
   without checking mobile again.
10. `.gitignore` covers `node_modules`, `.next`, env files, `.vercel`, `next-env.d.ts`.
11. Local dev-server preview config lives one directory **above** the repo, at
    `/Users/ohnirisa/Downloads/.claude/launch.json` (config name `intelligenceweb-dev`, `"autoPort": true` is
    now set so the Claude Code preview tool falls back to a random port if another session already has 3000 —
    this matters because **multiple Claude Code sessions/chats can be running a dev server for this same repo
    at once**, and only one can hold port 3000).
12. `public/preview.html` is a **standalone, self-contained** snapshot of the homepage (Tailwind via CDN, all
    CSS/markup/script inlined). **It was not updated with any of this session's testimonial/final-CTA/serve-num
    changes** — it's now stale relative to `ParallaxHomepage.tsx`. Mirror changes here too if you want it to
    stay accurate, or just flag to whoever's next that it may be out of date.
13. **Vercel silently blocks deploys from an unverified commit-author email — and the CLI reports this as a
    confusing, indefinite `UNKNOWN` status with `0ms` duration, not an error.** If `npx vercel ls <project>`
    shows a deployment stuck at `UNKNOWN` for more than ~a minute with no build duration, don't assume it's a
    slow/hung build — check the actual reason via the dashboard (`npx vercel inspect <url>` doesn't surface
    it, but https://vercel.com/ohnirisa-7180s-projects/<project>/<deployment-id> does, under "Deployment
    Blocked"). The fix: `git config user.email "ohnirisa@gmail.com"` (matches the GitHub account), then
    `git commit --amend --reset-author --no-edit` on the bad commit, then
    `git push <remote> main --force-with-lease` (force-push is required since the commit was already pushed;
    scope it to whichever remote/branch you actually need to fix — don't blanket force-push both repos).
14. **Bubble-font source PNGs are exported as big square canvases with lots of transparent padding** (e.g.
    1024×1024 with the actual glyphs only occupying a ~250px-tall strip in the middle) — if you set a bigger
    `width` on one of these via the `.bubble-heading` `clamp()` pattern without cropping first, `height:auto`
    scales the *whole square* up, wasting huge amounts of vertical space (this actually broke the testimonial
    heading sizing once this session). Before enlarging a new bubble-font asset, crop its transparent margins
    first:
    ```python
    from PIL import Image
    im = Image.open('source.png')
    bbox = im.getbbox()  # tight bounding box of non-transparent pixels
    pad = 16
    l, t, r, b = bbox
    im.crop((max(0,l-pad), max(0,t-pad), min(im.width,r+pad), min(im.height,b+pad))).save('public/hero/dest.png')
    ```
15. **To recolor one of these pale-cream bubble-font PNGs to a solid brand color** (rather than just
    darkening/lightening it with a CSS `filter`), replace its RGB channels directly and keep the alpha mask —
    this is how the final-CTA heading got the logo's lavender:
    ```python
    from PIL import Image
    im = Image.open('source.png').convert('RGBA')
    _, _, _, a = im.split()
    solid = Image.new('RGBA', im.size, (176,160,237,255))  # target color
    solid.putalpha(a)
    solid.save('public/hero/dest.png')
    ```
    Remember to set `filter:none` on that image's CSS (not the default `brightness(0)`), or the recolor will
    be immediately undone by the darkening filter.
16. **The Claude Code preview tool's screenshot can show a stale/blank render after a scroll or reload** —
    seen repeatedly this session (screenshot shows blank paper or an old layout even though `getBoundingClientRect`/
    `getComputedStyle` via `preview_eval` confirm the real DOM is correct and in the right scroll position).
    This is a tool-side stale-compositor-tile issue, not a real page bug. Workaround: force a repaint before
    screenshotting, either by toggling a transform (`document.body.style.transform='translateZ(0)'; void
    document.body.offsetHeight; document.body.style.transform='';` via `preview_eval`) or by nudging the
    viewport size via `preview_resize` to a different size and back. If a screenshot looks wrong but the DOM
    state checks out, try this before assuming you broke something.

## Naming calls made along the way, easy to revisit
- The About section's CTA is labeled **"See All Trainings"** (linking to `/trainings`), even though an early
  storyboard sketch wrote "SEE ALL RANGES" — there's no "/ranges" concept anywhere else on the site, so
  "Trainings" was kept. Say the word if "Ranges" should actually become a standing term.
- The retired "What AND Is" section's intro **quote** ("You are not a problem to be solved...") now lives in
  the hero's beat 6 finale; its two **paragraphs** now live in the About section's "And... What?" beat — these
  two pieces of copy were split across two different homepage locations on purpose, not duplicated.
- Testimonials: an interim version of this section had a light wisteria gradient wash continuing from the
  gradient scene down into the plain-paper card area, meant to smooth the transition. The user found the edge
  where it faded out looked like a harsh line even after extending it, and ultimately asked to drop the wash
  entirely and keep the card section plain paper — so **don't reintroduce a bleed/wash here** without it being
  explicitly requested again.

## Typical workflow for future changes
1. Edit files locally in `/Users/ohnirisa/Downloads/intelligenceweb`.
2. `npm run dev` (or the Claude Code preview tool, config name `intelligenceweb-dev`) to check changes at
   `localhost:3000` (or whatever port autoPort assigns if 3000 is taken by another session) — test both
   desktop and mobile viewport sizes; the hero, About, testimonials and final-CTA sections all run
   scroll-linked behavior on both now, so always check both when touching `ParallaxHomepage.tsx`. If a
   screenshot looks blank/stale, see gotcha #16 before assuming something's broken.
3. `npm run build` to catch stale references before committing — but **stop the dev server first** if one's
   running against this repo (gotcha #7), or you'll corrupt its `.next` cache.
4. `git add <files>`, `git commit` — check `git config user.email` resolves to `ohnirisa@gmail.com` first
   (gotcha #13) if this is a fresh clone/environment.
5. `git push newrepo main` to push to the **review** deployment (`andintelligencewebnew.vercel.app`) — this is
   the default target while changes are being reviewed. Only `git push origin main` (production,
   `and-intelligence.com`) once the user has explicitly approved the reviewed changes.
6. Vercel auto-deploys on push — check `npx vercel ls andintelligencewebnew` for build status (watch for the
   `UNKNOWN`-status trap in gotcha #13), or the dashboard at
   https://vercel.com/ohnirisa-7180s-projects/andintelligencewebnew/deployments.
7. Verify live at https://andintelligencewebnew.vercel.app (review) once the deployment shows "Ready". Only
   verify against https://and-intelligence.com after an explicit production push.
