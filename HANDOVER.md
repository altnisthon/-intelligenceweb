# Handover: AND Intelligence website

## What this is
Next.js 14 (App Router) + React 18 + Tailwind marketing site for "AND Intelligence"
(Singapore self-awareness/DMIT practice). Local path: `/Users/ohnirisa/Downloads/intelligenceweb`.

## Live infra
- **GitHub**: https://github.com/altnisthon/-intelligenceweb — `main` is the only branch, push directly (no PR flow set up).
- **Hosting**: Vercel project `andintelligenceweb` under team `ohnirisa-7180s-projects`.
  Connected to the GitHub repo — **every push to `main` auto-deploys to production**. No manual deploy step needed.
- **Domain**: `and-intelligence.com` + `www.and-intelligence.com`, both live with HTTPS.
  DNS is managed in **Squarespace's domain DNS settings** (not delegated nameservers) — custom `A` records
  for `@` and `www` point to `76.76.21.21`. Vercel later suggested newer records (`216.198.79.1` A record,
  `5b4fd08d06ced813.vercel-dns-017.com` CNAME) as part of an IP range expansion — optional, current setup works fine.
- **Vercel CLI**: not globally installed, use `npx vercel <command>` from the repo root. Already authenticated
  as `ohnirisa-7180` on this machine (session-scoped auth, may need `npx vercel login` again in a new environment).
- **gh CLI**: installed ad hoc at `/tmp/gh-cli/gh_2.96.0_macOS_arm64/bin/gh` (not on PATH permanently, and
  `/tmp` may not persist across reboots). If `git push` fails with "could not read Username", reinstall or
  re-auth `gh`, or just `git push` interactively / via SSH if the user sets that up instead.
- **Git identity**: not configured globally on this machine — commits so far used an auto-detected
  `ohnirisa@batbook.local` identity. If you want commits attributed to your GitHub account, run
  `git config --global user.email "<your-github-email>"` first.
- **Nothing has been committed/pushed yet from the recent homepage rework below** — check `git status` at the
  start of a new session; there's likely a large uncommitted diff in `components/ParallaxHomepage.tsx` and
  new files under `public/hero/`.

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
- `public/hero/` — all assets for the homepage's hero + About section (inventory below).
- `public/images/and-logo.png` — the "&" mark used in the hero's logo beat and in Header/Footer.
  `public/images/wai-*.webp` — leftover illustrated figures from a retired "What AND Is" section, **unused now**,
  left in place, safe to delete whenever.
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
   - The big faint "01/02/03" numbers behind each card (`.serve-num`) have a **continuous scroll-linked
     parallax** (not a one-time reveal) — see gotcha #3 below before touching this.
4. **Testimonials** — envelope-opens/cards-reveal interaction, unchanged from earlier passes.
5. **Final CTA** — unchanged from earlier passes, still uses a placeholder `.photo-slot` (no real photo yet).

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

**Flagged, not yet done**: `frame-1.mp4`, `and-what-bg.mp4`, and the 3 `regulate/relate/rise.png` photos are
all large (multi-MB) and uncompressed — fine for local dev, worth a compression pass (video re-encode +
image compression) before this goes live, since they're some of the first things the homepage loads.

`bird.png` (a torn-newspaper collage swallow illustration, in the source asset folder but not yet copied into
`public/`) was explicitly deferred — not used anywhere yet, no assigned purpose.

## Known quirks / gotchas
1. **Bubble-font PNGs are pale cream ink by design** — they're meant to sit on dark backgrounds (video, hero
   overlay). Any time one of these gets used on the light paper background, it needs
   `filter:brightness(0) opacity(.88)` (see `.bubble-heading` / `.about-video-block .bubble-heading{filter:none}`
   override) or it'll be nearly invisible. If more of these bubble-font assets get used elsewhere
   (`start with understanding.png`, `other like you said.png` are sitting in the source folder for future
   sections), check their background context before assuming the default pale color will read.
2. **`vh` → `svh` for the hero pin**: `.hero-pin-wrap`/`.hero-pin` use `svh` (stable viewport height) instead
   of plain `vh`, specifically to avoid mobile browsers' collapsing address bar causing pin-height jumps
   mid-scroll. If you add more pinned/scrubbed sections, use `svh` there too for the same reason.
3. **Scroll-linked parallax must reference a stable element, not itself**: the `.serve-num` parallax
   (`updateServeParallax()` in `HOMEPAGE_SCRIPT`) computes its offset from the **parent `.serve-card`'s**
   `getBoundingClientRect()`, not the number's own rect. Reading the number's own rect would include the
   transform from the previous frame, compounding every scroll event into runaway drift — this was an actual
   bug caught and fixed during development. Keep this pattern (measure a stable reference, not the thing
   you're transforming) for any future scroll-linked motion.
4. **Effect cleanup matters**: `ParallaxHomepage`'s `useEffect` appends a `<script>` tag and the script itself
   registers `window.__heroTeardown` at the end, which the effect's cleanup calls before removing the script.
   This exists because React (especially Strict Mode in dev) can run the effect twice, and without explicit
   teardown the `window.addEventListener('scroll', ...)` / `IntersectionObserver` instances from the first run
   never get removed — a real leak, not just a dev-mode annoyance, since it'd also leak on every client-side
   navigation away from the homepage. If you add new listeners/observers inside the script, add their
   teardown to `window.__heroTeardown` too.
5. **`position:sticky` is not a reliable containing block for `position:absolute` children** in all browsers —
   `.hero-stage` exists as a plain `position:relative` wrapper *inside* the sticky `.hero-pin` specifically to
   work around this (some browsers resolve absolutely-positioned descendants' percentages against the sticky
   element's un-stuck flow position instead of its current visual position). If you restructure the hero,
   keep this inner wrapper.
6. **`overflow-x:hidden` on an ancestor silently breaks `position:sticky` for its descendants** (setting
   `overflow-x` to non-`visible` forces `overflow-y` to compute as `auto`, turning that element into an
   unintended scroll container). `.parallax-homepage-root` had this bug and was fixed by removing the
   property — don't re-add blanket `overflow-x:hidden` anywhere upstream of the hero pin.
7. **Dev server `.next` cache corruption**: if you see `Cannot find module './NNN.js'` or similar errors after
   a lot of rapid file edits while `npm run dev` is running, stop the dev server, `rm -rf .next`, and restart
   it fresh. Don't delete `.next` while the dev server is still running against it (it'll throw
   `ENOENT ... .next/cache/webpack/...` errors and start 404ing everything) — always stop the server first,
   delete the cache, then start again.
8. **Browser scroll-position restoration** can make a freshly-reloaded page appear to start mid-scroll instead
   of at the top, which looks like a bug but isn't one — if testing scroll-driven behavior, explicitly set
   `history.scrollRestoration = 'manual'` and `window.scrollTo(0, 0)` before relying on scroll position.
9. Testimonial quotes on mobile show directly (no hover) via a CSS override, since `:hover` doesn't work on
   touch devices — don't remove that override without checking mobile again.
10. `.gitignore` covers `node_modules`, `.next`, env files, `.vercel`, `next-env.d.ts`.
11. Local dev-server preview config lives one directory **above** the repo, at
    `/Users/ohnirisa/Downloads/.claude/launch.json` (config name `intelligenceweb-dev`, port 3000) — this is
    how the Claude Code preview tool starts the dev server; unrelated if you're just using `npm run dev` directly.
12. `public/preview.html` is a **standalone, self-contained** copy of the homepage (Tailwind via CDN, all CSS/
    markup/script inlined) built so it can be opened directly without the Next.js dev server. It's a snapshot,
    not auto-synced — if you make further changes to `ParallaxHomepage.tsx`, mirror them here too if you still
    want this file to stay accurate, or just tell whoever's picking this up that it may be stale.

## Naming calls made along the way, easy to revisit
- The About section's CTA is labeled **"See All Trainings"** (linking to `/trainings`), even though an early
  storyboard sketch wrote "SEE ALL RANGES" — there's no "/ranges" concept anywhere else on the site, so
  "Trainings" was kept. Say the word if "Ranges" should actually become a standing term.
- The retired "What AND Is" section's intro **quote** ("You are not a problem to be solved...") now lives in
  the hero's beat 6 finale; its two **paragraphs** now live in the About section's "And... What?" beat — these
  two pieces of copy were split across two different homepage locations on purpose, not duplicated.

## Typical workflow for future changes
1. Edit files locally in `/Users/ohnirisa/Downloads/intelligenceweb`.
2. `npm run dev` (or use the Claude Code preview tool) to check changes at `localhost:3000`, test both
   desktop and mobile viewport sizes — the hero and About section both run the same sequence on both now,
   so always check both when touching `ParallaxHomepage.tsx`.
3. `npm run build` to catch stale references before committing.
4. `git add <files>`, `git commit`, `git push origin main`.
5. Vercel auto-deploys — check `npx vercel ls andintelligenceweb` for build status, or the dashboard at
   https://vercel.com/ohnirisa-7180s-projects/andintelligenceweb.
6. Verify live at https://and-intelligence.com once the deployment shows "Ready".
