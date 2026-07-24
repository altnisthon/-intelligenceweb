"use client";

import { useEffect } from "react";

// ---- Styles: paper/ink/indigo/lime/wisteria content sections stay restrained
// (fade+rise reveal), but the hero is now a cinematic pinned scroll-zoom moment
// with a minimal left-edge scroll-progress dot nav, inspired by everswap.com's
// structure — an oversized wordmark over a full-bleed scene, not its 3D engine
// or content. ----
const HOMEPAGE_CSS = `

  :root{
    --paper:#faf6f0;
    --ink:#1e1826;
    --indigo:#5b2a98;
    --indigo-deep:#3d1a6e;
    --lime:#c5f1b2;
    --wisteria:#ca90dc;
    --text-secondary:#6b5f5a;
    --hairline:rgba(30,24,38,0.1);
  }
  *{box-sizing:border-box;margin:0;padding:0}
  .parallax-homepage-root{font-family:'DM Sans',system-ui,sans-serif;color:var(--ink)}
  .parallax-homepage-root em{font-style:italic;color:var(--indigo)}
  .about-video-block em{color:var(--wisteria)}

  /* ===== REVEAL-ON-SCROLL: simple fade + 12-16px rise, no rotation/scale drama ===== */
  [data-reveal]{opacity:0;transform:translateY(16px);transition:opacity .8s cubic-bezier(.16,1,.3,1),transform .8s cubic-bezier(.16,1,.3,1)}
  [data-reveal].in-view{opacity:1;transform:translateY(0)}

  /* ===== HERO: storyboarded 6-beat scroll sequence (video → logo → fingerprint →
     wordmark → Regulate/Relate/Rise photo cycle → condense + settle) ===== */
  .hero-pin-wrap{position:relative;height:550svh}
  .hero-pin{position:sticky;top:0;height:100svh;overflow:hidden}
  .hero-stage{position:relative;width:100%;height:100%}
  .hero-video,.hero-r-photo{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:0;opacity:0}
  .hero-r-photos{position:absolute;inset:0;z-index:0}
  .hero-photo-overlay{position:absolute;inset:0;z-index:1;background:linear-gradient(180deg,rgba(30,24,38,0.35) 0%,rgba(30,24,38,0.75) 100%)}
  .hero-stage-img{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);z-index:2;opacity:0;pointer-events:none}
  .hero-logo{width:clamp(140px,18vw,220px);height:auto}
  .hero-fingerprint{width:clamp(280px,32vw,440px);height:auto}
  .hero-wordmark{width:clamp(300px,42vw,720px);height:auto}
  .hero-r-content{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);z-index:2;opacity:0;text-align:center;padding:0 1.5rem;max-width:640px;display:flex;flex-direction:column;align-items:center}
  .hero-r-word-img{margin-bottom:1rem}
  .hero-r-copy{font:300 17px/1.7 'DM Sans',sans-serif;color:var(--paper);opacity:.9}
  .hero-finale{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);z-index:2;opacity:0;display:flex;flex-direction:column;justify-content:space-between;align-items:center;text-align:center;padding:2rem 1.5rem;height:min(85vh,760px);width:100%}
  @keyframes wordWave{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
  .hero-finale-words{display:flex;gap:12px;justify-content:center;font:400 13px 'DM Sans',sans-serif;letter-spacing:.22em;text-transform:uppercase;color:var(--paper);opacity:.85}
  .hero-finale-words span{display:inline-block;animation:wordWave 2.2s ease-in-out infinite}
  .hero-finale-words span:nth-child(1){animation-delay:0s}
  .hero-finale-words span:nth-child(2){animation-delay:.11s}
  .hero-finale-words span:nth-child(3){animation-delay:.22s}
  .hero-finale-words span:nth-child(4){animation-delay:.33s}
  .hero-finale-words span:nth-child(5){animation-delay:.44s}
  .hero-finale-quote{font-family:'Cormorant Garamond',serif;font-style:italic;font-weight:300;font-size:clamp(18px,2.2vw,24px);line-height:1.5;color:var(--paper);opacity:.9;max-width:30rem}
  .hero-scroll-prompt{position:absolute;left:50%;bottom:2.5rem;transform:translateX(-50%);z-index:2;font:400 11px 'DM Sans',sans-serif;letter-spacing:.2em;text-transform:uppercase;color:var(--paper);opacity:.7}

  /* ===== LEFT-EDGE SCROLL-PROGRESS DOTS (homepage only) ===== */
  .dots-nav{position:fixed;left:2rem;top:50%;transform:translateY(-50%);z-index:40;display:flex;flex-direction:column;gap:16px}
  .dots-nav button{width:9px;height:9px;padding:0;border-radius:50%;border:1.5px solid rgba(30,24,38,0.3);background:transparent;cursor:pointer;transition:background .3s ease,border-color .3s ease,transform .3s ease;filter:drop-shadow(0 0 2px rgba(255,255,255,0.5))}
  .dots-nav button.active{background:var(--indigo);border-color:var(--indigo);transform:scale(1.35)}
  @media (max-width:900px){.dots-nav{display:none}}

  .btn-primary{display:inline-block;background:var(--indigo);color:var(--paper);padding:16px 30px;font:500 12px 'DM Sans',sans-serif;letter-spacing:.1em;text-transform:uppercase;text-decoration:none;transition:background .3s ease}
  .btn-primary:hover{background:var(--indigo-deep)}
  .btn-secondary{display:inline-block;background:transparent;color:var(--ink);padding:16px 30px;border:1px solid var(--hairline);font:500 12px 'DM Sans',sans-serif;letter-spacing:.1em;text-transform:uppercase;text-decoration:none;transition:border-color .3s ease,color .3s ease}
  .btn-secondary:hover{border-color:var(--indigo);color:var(--indigo)}

  /* ===== MARQUEE ===== */
  @keyframes and-marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
  .marquee-wrap{background:rgba(255,255,255,0.5);padding:22px 0;overflow:hidden;border-top:1px solid var(--hairline);border-bottom:1px solid var(--hairline)}
  .and-mq{display:inline-flex;white-space:nowrap;animation:and-marquee 40s linear infinite}
  .and-mq span{font-family:'Playfair Display',serif;font-style:italic;font-weight:400;font-size:26px;color:var(--ink)}
  .and-mq span i{color:var(--wisteria);padding:0 26px;font-style:normal}

  /* ===== SHARED SECTION STYLES ===== */
  .section-eyebrow{font:400 10.5px 'DM Sans',sans-serif;letter-spacing:.18em;text-transform:uppercase;color:var(--indigo);margin-bottom:1.2rem}
  .section-h2{font-family:'Playfair Display',serif;font-weight:700;font-size:clamp(34px,4vw,50px);line-height:1.08;color:var(--ink);margin:0 0 1.6rem}
  .section-wrap{max-width:1200px;margin:0 auto;padding:7rem clamp(1.5rem,4vw,3rem);position:relative}

  /* ===== ABOUT: "And... What?" / "And then what?" (replaces the old Who We Serve) ===== */
  .who-we-serve{border-top:1px solid var(--hairline)}
  .about-beat{max-width:38rem;margin:0 auto 5rem}
  .about-beat-b{max-width:none;text-align:center}
  .bubble-heading{width:clamp(260px,34vw,520px);height:auto;margin-bottom:1.6rem;filter:brightness(0) opacity(.88)}
  .about-beat-b .bubble-heading{margin-left:auto;margin-right:auto;display:block}
  .about-para{font:300 16px/1.85 'DM Sans',sans-serif;color:var(--text-secondary);margin:0 0 1.2rem}

  /* Beat A gets a video backdrop — its bubble-heading reverts to the original
     pale ink since it now sits on a dark video, not flat paper. */
  .about-video-block{position:relative;overflow:hidden}
  .about-video-bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:0;filter:saturate(0.85) contrast(0.95) sepia(0.06) brightness(1.02)}
  .about-video-overlay{position:absolute;inset:0;z-index:1;background:linear-gradient(180deg,rgba(30,24,38,0.45) 0%,rgba(30,24,38,0.78) 100%)}
  .about-video-content{position:relative;z-index:2;max-width:38rem;margin:0 auto;padding:7rem clamp(1.5rem,4vw,3rem)}
  .about-video-block .bubble-heading{filter:none}
  .about-video-block .about-para{color:var(--paper);opacity:.92}
  .and-then-heading{filter:none}

  /* ===== A PRACTICE FOR THE WHOLE HUMAN BEING: pinned scroll-scrub — the body
     drawing wipes in top-to-bottom (head -> toes) while the 7 words rise up
     one after another, then the stage crossfades into the Regulate/Relate/Rise
     photo+copy pairs (one visible at a time), same pin mechanic as the hero. ===== */
  .practice-pin-wrap{position:relative;height:420svh}
  .practice-pin{position:sticky;top:0;height:100svh;overflow:hidden}
  .practice-stage{position:relative;width:100%;height:100%}

  .practice-body-group{position:absolute;inset:0;display:flex;align-items:center;justify-content:center}
  .practice-figure{position:relative;width:min(90vw,900px);height:min(78vh,760px)}
  .practice-body-clip{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;overflow:hidden}
  .practice-body-img{height:100%;width:auto;display:block}
  .practice-word-layer{position:absolute;inset:0;pointer-events:none}
  .practice-word{position:absolute;opacity:0;font-family:'Playfair Display',serif;font-weight:400;color:#000;white-space:nowrap;will-change:transform}
  .practice-word-a{top:0;left:16%;font-size:clamp(30px,4.6vw,64px)}
  .practice-word-practice{top:0;right:14%;font-size:clamp(30px,4.6vw,64px)}
  .practice-word-for{top:32%;left:8%;font-size:clamp(30px,4.6vw,64px)}
  .practice-word-the{top:32%;right:10%;font-size:clamp(30px,4.6vw,64px)}
  .practice-word-whole{top:58%;left:4%;font-size:clamp(30px,4.6vw,64px)}
  .practice-word-human{top:58%;right:6%;font-size:clamp(30px,4.6vw,64px)}
  .practice-word-being{bottom:2%;left:50%;font-size:clamp(30px,4.6vw,64px)}

  .practice-pair-stage{position:absolute;inset:0;display:flex;align-items:center;justify-content:center}
  /* pointer-events:none by default: the three pairs are stacked in the exact
     same spot and only cross-fade via opacity — an invisible (opacity:0)
     sibling still fully captures wheel/pointer events unless disabled, which
     stole scroll input meant for the visible pair's copy box. JS flips this
     to 'auto' only on the currently-visible pair, alongside its opacity. */
  .practice-pair-item{position:absolute;display:flex;align-items:center;gap:2.75rem;opacity:0;pointer-events:none;max-width:1680px;width:100%;padding:0 clamp(1.5rem,4vw,3rem);transition:transform .15s ease-out}
  .practice-pair-photo-wrap{position:relative;flex:0 0 clamp(380px,44vw,620px)}
  .practice-pair-glow{position:absolute;inset:-14%;z-index:0;pointer-events:none;filter:blur(46px);opacity:.65;
    background:radial-gradient(58% 58% at 32% 30%, var(--stage-accent-soft), transparent 72%);
  }
  .practice-pair-photo{position:relative;z-index:1;border-radius:22px;overflow:hidden;
    box-shadow:0 34px 74px -32px rgba(30,24,38,.4), 0 0 0 1.5px var(--stage-accent-soft) inset;
  }
  .practice-pair-photo img{display:block;width:100%;height:auto}
  /* content, not chrome: overflow-y:auto lets the copy scroll internally
     when the text genuinely doesn't fit the pinned viewport, but no
     overscroll-behavior — once this box's own scroll is exhausted (or it
     never needed to scroll at all), the wheel input must fall through to
     drive the pinned page scroll, not get trapped here. */
  .practice-pair-copy{flex:1;min-width:0;max-height:min(82vh,680px);overflow-y:auto;padding-right:.75rem;scrollbar-width:thin;scrollbar-color:var(--stage-accent,var(--indigo)) transparent}
  .practice-pair-copy::-webkit-scrollbar{width:5px}
  .practice-pair-copy::-webkit-scrollbar-thumb{background:var(--stage-accent,var(--indigo));opacity:.4;border-radius:3px}
  .practice-pair-num{display:block;font:400 12px 'DM Sans',sans-serif;letter-spacing:.18em;text-transform:uppercase;color:var(--stage-accent,var(--indigo));opacity:.85;margin-bottom:.4rem}
  .practice-pair-label{font-family:'Playfair Display',serif;font-weight:700;font-size:clamp(26px,3.1vw,36px);color:var(--ink);display:inline-block}
  .practice-pair-rule{display:block;width:44px;height:3px;margin:.7rem 0 1.15rem;border-radius:2px;background:var(--stage-accent,var(--indigo))}
  .practice-pair-copy p{font:300 15.5px/1.7 'DM Sans',sans-serif;color:var(--text-secondary);margin:0 0 1rem}
  .practice-pair-copy p:last-child{margin-bottom:0}

  .practice-stage-dots{position:absolute;top:5.5%;left:50%;transform:translateX(-50%);z-index:5;display:flex;gap:12px}
  .practice-stage-dot{width:7px;height:7px;border-radius:50%;background:rgba(91,42,152,.2);transition:background .45s ease,transform .45s ease}
  .practice-stage-dot.active{transform:scale(1.5)}

  @media (max-width:640px){
    .practice-figure{width:92vw;height:min(58vh,480px)}
    .practice-pair-item{flex-direction:column;text-align:center;gap:.85rem}
    .practice-pair-photo-wrap{flex:0 0 auto;width:78%}
    .practice-pair-rule{margin-left:auto;margin-right:auto}
    .practice-pair-copy{max-height:min(52vh,440px);padding-right:0}
    .practice-pair-copy p{text-align:left;font-size:14.5px}
  }

  .sparkle{position:absolute;width:16px;height:16px;pointer-events:none;animation:sparklePulse 2.4s ease-in-out infinite}
  @keyframes sparklePulse{0%,100%{opacity:.35;transform:scale(.75) rotate(0deg)}50%{opacity:1;transform:scale(1.15) rotate(20deg)}}

  /* ===== TESTIMONIALS: gradient heading beat -> scroll-flown bird -> floating,
     sparkling cards (envelope concept retired) ===== */
  .testimonials{}

  .testi-scene{position:relative;overflow:hidden;background:var(--paper)}
  .testi-scene::before{
    content:'';position:absolute;inset:0;z-index:0;pointer-events:none;
    background:
      radial-gradient(50% 42% at 18% 8%, rgba(91,42,152,0.30), transparent 72%),
      radial-gradient(46% 38% at 82% 22%, rgba(202,144,220,0.26), transparent 72%),
      radial-gradient(55% 48% at 38% 62%, rgba(61,26,110,0.20), transparent 74%),
      radial-gradient(44% 36% at 88% 84%, rgba(202,144,220,0.24), transparent 72%),
      radial-gradient(50% 42% at 8% 92%, rgba(91,42,152,0.18), transparent 74%);
    filter:blur(6px);
  }
  .testi-intro{position:relative;z-index:2;text-align:center;padding:6rem clamp(1.5rem,4vw,3rem) 1rem}
  .testi-eyebrow-light{color:var(--indigo);opacity:.9}
  .testi-heading{width:clamp(340px,46vw,720px);margin:0 auto}

  .testi-bird-block{position:relative;z-index:1;height:clamp(130px,18vw,240px);overflow:hidden}
  .testi-bird{position:absolute;top:35%;left:-15%;width:clamp(90px,12vw,180px);height:auto;transform:translate(-50%,-50%);will-change:left,transform}

  .testi-wrap{position:relative;padding-top:5rem}
  .testi-hint{text-align:center;font-family:'Cormorant Garamond',serif;font-style:italic;font-size:15px;color:var(--text-secondary);margin:0 0 2.6rem}
  @media (max-width:860px){.testi-hint{display:none}}

  .testi-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2.4rem 2rem}
  @media (max-width:860px){.testi-grid{grid-template-columns:1fr;gap:2.2rem}}

  /* floating wrapper carries the continuous whimsical bob; the card inside it
     keeps its own reveal-on-scroll transform, so the two never fight over the
     same transform property. */
  .testi-card-wrap{position:relative;animation:testiFloat 6.5s ease-in-out infinite}
  .testi-card-wrap:nth-child(1){animation-delay:0s}
  .testi-card-wrap:nth-child(2){animation-delay:.85s}
  .testi-card-wrap:nth-child(3){animation-delay:1.7s}
  @keyframes testiFloat{0%,100%{transform:translateY(0) rotate(-0.6deg)}50%{transform:translateY(-13px) rotate(0.6deg)}}
  @media (prefers-reduced-motion:reduce){.testi-card-wrap{animation:none}}

  .testi-sparkle{width:15px;height:15px;z-index:0}
  .testi-sparkle-a{bottom:-10px;left:10%;color:var(--lime);animation-delay:.2s}
  .testi-sparkle-b{bottom:-16px;right:16%;color:var(--wisteria);animation-delay:1.1s}
  .testi-sparkle-c{top:-12px;right:-10px;color:var(--lime);animation-delay:.7s}
  .testi-sparkle-d{top:20%;left:-14px;width:11px;height:11px;color:var(--wisteria);animation-delay:1.6s}
  .testi-sparkle-e{bottom:30%;right:-16px;width:11px;height:11px;color:var(--lime);animation-delay:.45s}

  .testi-card{position:relative;z-index:1;background:#fff;border-radius:16px;padding:2.4rem 2rem;min-height:190px;cursor:pointer;
    box-shadow:0 24px 44px -18px rgba(30,24,38,0.22),0 4px 14px rgba(30,24,38,0.06);
    display:flex;flex-direction:column;
    opacity:0;transform:translateY(16px);
    transition:opacity .7s cubic-bezier(.16,1,.3,1),transform .7s cubic-bezier(.16,1,.3,1),box-shadow .3s ease;
  }
  .testi-card.in-view{opacity:1;transform:translateY(0)}
  .testi-card:hover{box-shadow:0 30px 54px -16px rgba(91,42,152,0.3),0 6px 18px rgba(91,42,152,0.1)}
  .quote-mark{font-family:'Playfair Display',serif;font-style:italic;font-weight:900;font-size:48px;color:var(--wisteria);line-height:1;margin-bottom:.6rem}
  .testi-card p{position:relative;font-family:'Cormorant Garamond',serif;font-style:italic;font-weight:400;font-size:19px;line-height:1.55;color:var(--ink);margin:0 0 1.4rem;opacity:0;transition:opacity .35s ease}
  .testi-card:hover p{opacity:1}
  .testi-placeholder{font:300 13px/1.7 'DM Sans',sans-serif;font-style:italic;color:var(--text-secondary);opacity:.7;transition:opacity .3s ease;margin:0 0 1.4rem}
  .testi-card:hover .testi-placeholder{opacity:0}
  .testi-name{margin-top:auto;padding-top:1.2rem;font:400 10px 'DM Sans',sans-serif;letter-spacing:.16em;text-transform:uppercase;color:var(--indigo)}

  /* mobile: no hover, quotes are always visible, floating + sparkle stay */
  @media (max-width:860px){
    .testi-card p{opacity:1}
    .testi-placeholder{display:none}
  }

  /* ===== FINAL CTA: no special background of its own now — falls back to
     the sitewide default lavender/mint wash, same as any other plain section ===== */
  .final-cta{position:relative;overflow:hidden;text-align:center}
  .final-cta-inner{position:relative;z-index:1;max-width:640px;margin:0 auto;padding:9rem clamp(1.5rem,4vw,3rem)}
  .final-cta-heading{width:clamp(300px,58vw,640px);margin:0 auto 1.6rem;filter:none}
  .final-cta p{font:300 17px/1.8 'DM Sans',sans-serif;color:var(--text-secondary);margin:0 0 2.4rem}

  /* ===== MOBILE: same 6-beat sequence as desktop, just resized to stay legible ===== */
  @media (max-width:640px){
    .hero-logo{width:clamp(90px,22vw,150px)}
    .hero-fingerprint{width:clamp(170px,46vw,280px)}
    .hero-wordmark{width:clamp(220px,72vw,420px)}
    .hero-r-content{padding:0 1.25rem;max-width:100%}
    .hero-r-copy{font-size:15px}
    .hero-finale{padding:1.5rem 1.25rem;height:min(88svh,640px)}
    .hero-finale-words{font-size:11px;gap:8px}
    .hero-finale-quote{font-size:16px;max-width:22rem}
    .hero-scroll-prompt{bottom:1.5rem}
  }

`;

// ---- Markup ----
const HOMEPAGE_BODY = `

<!-- LEFT-EDGE SCROLL-PROGRESS DOTS -->
<nav class="dots-nav" id="dotsNav" aria-label="Section progress">
  <button type="button" data-dot-target="heroSection" aria-label="Hero" class="active"></button>
  <button type="button" data-dot-target="serveSection" aria-label="Who We Serve"></button>
  <button type="button" data-dot-target="testimonialsSection" aria-label="In Their Words"></button>
  <button type="button" data-dot-target="finalCtaSection" aria-label="Begin the Conversation"></button>
</nav>

<!-- HERO: storyboarded scroll sequence -->
<section class="hero-pin-wrap" id="heroSection">
  <div class="hero-pin" id="heroPin">
    <div class="hero-stage">
      <video class="hero-video" id="heroVideo" muted playsinline preload="auto" poster="/hero/hero-video-poster.jpg" src="/hero/hero-video.mp4"></video>

      <div class="hero-r-photos" id="heroRPhotos">
        <img class="hero-r-photo" id="heroRegulatePhoto" src="/hero/regulate.png" alt="">
        <img class="hero-r-photo" id="heroRelatePhoto" src="/hero/relate.png" alt="">
        <img class="hero-r-photo" id="heroRisePhoto" src="/hero/rise.png" alt="">
      </div>

      <div class="hero-photo-overlay"></div>

      <img class="hero-stage-img hero-logo" id="heroLogo" src="/images/and-logo.png" alt="">
      <img class="hero-stage-img hero-fingerprint" id="heroFingerprint" src="/hero/fingerprint.png" alt="">
      <img class="hero-stage-img hero-wordmark" id="heroWordmark" src="/hero/and-intelligence-wordmark-new.png" alt="AND Intelligence">

      <div class="hero-r-content" id="heroRContent">
        <img class="hero-r-word-img hero-wordmark" id="heroRWordImg" src="/hero/regulate-word.png" alt="Regulate">
        <p class="hero-r-copy" id="heroRCopy">Learn to steady your own nervous system before it steadies you.</p>
      </div>

      <div class="hero-finale" id="heroFinale">
        <div class="hero-finale-words">
          <span>Regulate</span><span>·</span><span>Relate</span><span>·</span><span>Rise</span>
        </div>
        <div class="hero-finale-quote">You are not a problem to be solved. You are a system to be understood.</div>
      </div>

      <div class="hero-scroll-prompt" id="heroScrollPrompt">Scroll to explore</div>
    </div>
  </div>
</section>

<!-- MARQUEE -->
<section class="marquee-wrap">
  <div class="and-mq">
    <span>Self-Awareness<i>•</i>Self-Discovery<i>•</i>Emotional Intelligence<i>•</i>Inner Resilience<i>•</i>Self-Regulation<i>•</i>DMIT — Innate Intelligence<i>•</i></span>
    <span>Self-Awareness<i>•</i>Self-Discovery<i>•</i>Emotional Intelligence<i>•</i>Inner Resilience<i>•</i>Self-Regulation<i>•</i>DMIT — Innate Intelligence<i>•</i></span>
  </div>
</section>

<!-- ABOUT: "And... What?" / "And then what?" -->
<section class="who-we-serve" id="serveSection">
  <div class="about-video-block" data-reveal>
    <video class="about-video-bg" id="aboutVideoBg" muted loop playsinline autoplay preload="auto" poster="/hero/and-what-bg-poster.jpg" src="/hero/and-what-bg.mp4"></video>
    <div class="about-video-overlay"></div>
    <div class="about-video-content">
      <img class="bubble-heading" src="/hero/and-what.png" alt="And... What?">
      <p class="about-para" data-reveal>Most self-help starts with what you want to change. We start with how you are built. AND sits at the intersection of self-awareness, resilience training &amp; DMIT, a fingerprint-based intelligence profiling; because lasting change comes from working <em>with</em> your nature, not against it.</p>
      <p class="about-para" data-reveal>Every conversation is honest, specific &amp; quietly confident. No jargon, no bootcamp intensity, no promises of a fixed self. Just a clearer picture of who you are &amp; the practical self-awareness to act on it.</p>
    </div>
  </div>

  <div class="section-wrap">
    <div class="about-beat about-beat-b">
      <img class="bubble-heading and-then-heading" src="/hero/and-then-what-black.png" alt="And then what?" data-reveal>
    </div>
  </div>

  <section class="practice-pin-wrap" id="practiceSection">
    <div class="practice-pin" id="practicePin">
      <div class="practice-stage">
        <div class="practice-body-group" id="practiceBodyGroup">
          <div class="practice-figure">
            <div class="practice-body-clip" id="practiceBodyClip">
              <img class="practice-body-img" src="/hero/body.png" alt="">
            </div>
            <div class="practice-word-layer">
              <span class="practice-word practice-word-a" id="pwA">A</span>
              <span class="practice-word practice-word-practice" id="pwPractice">Practice</span>
              <span class="practice-word practice-word-for" id="pwFor">for</span>
              <span class="practice-word practice-word-the" id="pwThe">the</span>
              <span class="practice-word practice-word-whole" id="pwWhole">whole</span>
              <span class="practice-word practice-word-human" id="pwHuman">human</span>
              <span class="practice-word practice-word-being" id="pwBeing">being</span>
            </div>
          </div>
        </div>

        <div class="practice-stage-dots" aria-hidden="true">
          <span class="practice-stage-dot" id="practiceDot1" style="background:var(--indigo)"></span>
          <span class="practice-stage-dot" id="practiceDot2" style="background:var(--wisteria)"></span>
          <span class="practice-stage-dot" id="practiceDot3" style="background:#7fae5a"></span>
        </div>

        <div class="practice-pair-stage">
          <div class="practice-pair-item" id="practicePair1" style="--stage-accent:#5b2a98;--stage-accent-soft:rgba(91,42,152,.24)">
            <div class="practice-pair-photo-wrap">
              <div class="practice-pair-glow"></div>
              <div class="practice-pair-photo"><img src="/hero/blood.png" alt=""></div>
            </div>
            <div class="practice-pair-copy">
              <span class="practice-pair-num">01</span>
              <span class="practice-pair-label">Regulate</span>
              <span class="practice-pair-rule"></span>
              <p>Everything starts here, because nothing else works without it. When your nervous system is braced for threat - overwhelmed, reactive, flooded - the thinking, feeling parts of you go quiet. You can't connect well, decide well, or grow from that place. Regulate is the skill of coming back: noticing your own signals early and returning yourself to steady ground before the storm makes your choices for you.</p>
              <p>It's worth being clear about what this isn't. Regulation isn't forcing yourself to be calm, and it isn't numbing what you feel. It's the opposite; it's feeling clearly enough to respond on purpose rather than on reflex. The work is quiet and practical: learning your early warning signs, knowing your particular triggers, and finding the specific routes back to calm that actually work for you. That last part matters, because the generic advice ("just breathe") lands differently depending on how you're built. This is where your DMIT profile earns its place, it shows how you take in and process the world, so your way back to steady is tailored to your wiring, not borrowed from someone else's.</p>
              <p>Master this and you've built the foundation the other two stages stand on. Skip it, and every relationship and every ambition ends up running on an unstable base.</p>
            </div>
          </div>
          <div class="practice-pair-item" id="practicePair2" style="--stage-accent:#ca90dc;--stage-accent-soft:rgba(202,144,220,.28)">
            <div class="practice-pair-photo-wrap">
              <div class="practice-pair-glow"></div>
              <div class="practice-pair-photo"><img src="/hero/heart.png" alt=""></div>
            </div>
            <div class="practice-pair-copy">
              <span class="practice-pair-num">02</span>
              <span class="practice-pair-label">Relate</span>
              <span class="practice-pair-rule"></span>
              <p>Once you can steady yourself, you can finally be with people, not managing your own storm while half-listening to theirs. Relate is the outward turn: meeting others as they actually are, rather than as your fears or old patterns assume them to be.</p>
              <p>Here's the quiet truth underneath it: most relational friction isn't really about the other person. It's our own reactivity colliding with theirs. When you're regulated, you see people more accurately, because you're no longer looking through the distortion of your own threat response. That's what makes connection possible, not charisma or technique, but presence. The work looks like listening to understand instead of to reply, catching the story you're telling about someone before you act on it, and communicating what you need without armour. And because how we connect is deeply individual, understanding your own relational wiring - how you naturally give, receive, and express - turns connection from anxious guesswork into something you can navigate with far less self-blame.</p>
              <p>This stage matters because relationships are the medium of nearly everything that gives life weight: your work, your family, your love. Relational skill compounds quietly over decades. And it's reciprocal by design, you were never meant to rise alone.</p>
            </div>
          </div>
          <div class="practice-pair-item" id="practicePair3" style="--stage-accent:#7fae5a;--stage-accent-soft:rgba(127,174,90,.28)">
            <div class="practice-pair-photo-wrap">
              <div class="practice-pair-glow"></div>
              <div class="practice-pair-photo"><img src="/hero/head.png" alt=""></div>
            </div>
            <div class="practice-pair-copy">
              <span class="practice-pair-num">03</span>
              <span class="practice-pair-label">Rise</span>
              <span class="practice-pair-rule"></span>
              <p>From a steady self and honest relationships, growth stops being a grind. Rise is where the whole journey points forward, where you take your natural strengths and use them deliberately, in your work, your choices, and the direction you set for your life.</p>
              <p>We hold this word carefully. Rising isn't climbing over other people, and it isn't chasing a polished, optimised version of you that doesn't exist. It's directional, not comparative, a return to who you already are, lived more fully and on purpose. That's why it lasts: growth that runs along the grain of your nature doesn't depend on willpower to sustain it, the way borrowed ambitions always do. The work is learning where your innate strengths actually lie, then aligning your direction with them and quietly letting go of definitions of success you were handed rather than chose. This is the moment your DMIT profile becomes less a mirror and more a compass.</p>
              <p>And this stage is what gives the other two a point. Regulation and connection without direction just make you a calm, well-related person drifting; Rise is what turns steadiness and belonging into a life that's actually going somewhere: yours.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</section>

<!-- TESTIMONIALS: gradient heading -> bird flies across on scroll -> floating sparkly cards -->
<section class="testimonials" id="testimonialsSection">
  <div class="testi-scene">
    <div class="testi-intro" data-reveal>
      <div class="section-eyebrow testi-eyebrow-light">In Their Words</div>
      <img class="bubble-heading testi-heading" src="/hero/others-think.png" alt="And this is what others like you have said">
    </div>
    <div class="testi-bird-block" id="testiBirdBlock">
      <img class="testi-bird" id="testiBird" src="/hero/bird.png" alt="">
    </div>
  </div>

  <div class="section-wrap testi-wrap">
    <p class="testi-hint" data-reveal>Hover a card to read what they shared</p>

    <div class="testi-grid">
      <div class="testi-card-wrap">
        <svg class="sparkle testi-sparkle testi-sparkle-a" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z"/></svg>
        <svg class="sparkle testi-sparkle testi-sparkle-b" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z"/></svg>
        <svg class="sparkle testi-sparkle testi-sparkle-c" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z"/></svg>
        <svg class="sparkle testi-sparkle testi-sparkle-d" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z"/></svg>
        <svg class="sparkle testi-sparkle testi-sparkle-e" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z"/></svg>
        <div class="testi-card" data-reveal>
          <div class="quote-mark">"</div>
          <div class="testi-placeholder">A message from Rachel — hover to read</div>
          <p>The profile didn't box me in — it gave me permission. I stopped fighting my own instincts.</p>
          <div class="testi-name">Rachel · Young Adult journey</div>
        </div>
      </div>
      <div class="testi-card-wrap">
        <svg class="sparkle testi-sparkle testi-sparkle-a" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z"/></svg>
        <svg class="sparkle testi-sparkle testi-sparkle-b" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z"/></svg>
        <svg class="sparkle testi-sparkle testi-sparkle-c" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z"/></svg>
        <svg class="sparkle testi-sparkle testi-sparkle-d" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z"/></svg>
        <svg class="sparkle testi-sparkle testi-sparkle-e" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z"/></svg>
        <div class="testi-card" data-reveal>
          <div class="quote-mark">"</div>
          <div class="testi-placeholder">A message from Mei Ling — hover to read</div>
          <p>My son went from shutting down to explaining what he needed. That is not a small thing.</p>
          <div class="testi-name">Mei Ling · Parent, Youth journey</div>
        </div>
      </div>
      <div class="testi-card-wrap">
        <svg class="sparkle testi-sparkle testi-sparkle-a" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z"/></svg>
        <svg class="sparkle testi-sparkle testi-sparkle-b" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z"/></svg>
        <svg class="sparkle testi-sparkle testi-sparkle-c" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z"/></svg>
        <svg class="sparkle testi-sparkle testi-sparkle-d" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z"/></svg>
        <svg class="sparkle testi-sparkle testi-sparkle-e" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z"/></svg>
        <div class="testi-card" data-reveal>
          <div class="quote-mark">"</div>
          <div class="testi-placeholder">A message from David — hover to read</div>
          <p>Honest, warm, and never once made me feel like a project. I felt taken seriously.</p>
          <div class="testi-name">David · Mid-Life journey</div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- FINAL CTA -->
<section class="final-cta" id="finalCtaSection">
  <div class="final-cta-inner">
    <img class="bubble-heading final-cta-heading" src="/hero/start-with-understanding.png" alt="Start with understanding. Everything else follows." data-reveal>
    <p data-reveal>Begin with an introductory conversation. No commitment, no assessment to prepare for — just a first honest conversation about where you are.</p>
    <a href="/contact" class="btn-primary" data-reveal>Begin the Conversation</a>
  </div>
</section>

`;

// ---- Behavior: the storyboarded 6-beat hero scroll-scrub (video scrub +
// crossfading logo/fingerprint/wordmark + Regulate/Relate/Rise photo cycle +
// condense-and-settle finale), a left-dot active-section tracker, plus the
// existing reveal-on-scroll and testimonial envelope logic. ----
const HOMEPAGE_SCRIPT = `

(function(){
  // tear down a previous copy of this script's listeners/observers before
  // setting up a new one — guards against React dev-mode double-effect runs
  // (and real remounts) leaking window-level listeners forever.
  if (typeof window.__heroTeardown === 'function') { window.__heroTeardown(); }

  const heroSection = document.getElementById('heroSection');
  const heroVideo = document.getElementById('heroVideo');
  const heroRegulatePhoto = document.getElementById('heroRegulatePhoto');
  const heroRelatePhoto = document.getElementById('heroRelatePhoto');
  const heroRisePhoto = document.getElementById('heroRisePhoto');
  const heroLogo = document.getElementById('heroLogo');
  const heroFingerprint = document.getElementById('heroFingerprint');
  const heroWordmark = document.getElementById('heroWordmark');
  const heroRContent = document.getElementById('heroRContent');
  const heroRWordImg = document.getElementById('heroRWordImg');
  const heroRCopy = document.getElementById('heroRCopy');
  const heroFinale = document.getElementById('heroFinale');
  const heroScrollPrompt = document.getElementById('heroScrollPrompt');

  const R_COPY = {
    Regulate: 'Learn to steady your own nervous system before it steadies you.',
    Relate: 'Build relationships from a place of understanding, not reaction.',
    Rise: 'Grow into the version of yourself your wiring already supports.'
  };

  // real playback (looped), not scroll-scrubbed — scrubbing currentTime on
  // scroll looked staticky/jerky since scroll position never advances as
  // smoothly as real video decode does. The video just plays continuously
  // underneath the logo/fingerprint/wordmark crossfade and fades out on cue.
  //
  // Some mobile browsers (notably iOS Safari in Low Power Mode) silently
  // ignore the "autoplay" attribute even when muted+playsinline, and never
  // fire 'canplay' until a user gesture happens — so alongside the normal
  // readyState/canplay-triggered play(), we also retry once on the first
  // touch/scroll/click anywhere on the page as a safety net.
  const bgVideos = [heroVideo, document.getElementById('aboutVideoBg')].filter(Boolean);
  const pendingPlay = [];
  bgVideos.forEach(function(v){
    v.loop = true;
    function tryPlay(){
      const playPromise = v.play();
      if (playPromise && playPromise.catch) { playPromise.catch(function(){}); }
    }
    if (v.readyState >= 3) {
      tryPlay();
    } else {
      v.addEventListener('canplay', tryPlay, { once: true });
    }
    pendingPlay.push(tryPlay);
  });
  const gestureEvents = ['touchstart', 'scroll', 'click'];
  function retryOnGesture(){
    pendingPlay.forEach(function(fn){ fn(); });
  }
  if (pendingPlay.length) {
    gestureEvents.forEach(function(evt){
      window.addEventListener(evt, retryOnGesture, { passive: true, once: true });
    });
  }

  function heroPinProgress(){
    const top = heroSection.offsetTop;
    const range = heroSection.offsetHeight - window.innerHeight;
    if (range <= 0) return 0;
    const raw = (window.scrollY - top) / range;
    return Math.min(1, Math.max(0, raw));
  }

  function seg(p, a, b){
    if (b <= a) return p >= b ? 1 : 0;
    return Math.min(1, Math.max(0, (p - a) / (b - a)));
  }

  function updateHero(){
    if (!heroSection) return;
    const p = heroPinProgress();

    // beat 1: video plays continuously underneath, fades out as R-photos take over
    const videoOpacity = 1 - seg(p, 0.30, 0.36);
    if (heroVideo) {
      heroVideo.style.opacity = String(videoOpacity);
    }

    // beats 2-4: "&" logo -> fingerprint -> wordmark crossfade, over the video
    const logoOpacity = seg(p, 0.04, 0.11) - seg(p, 0.13, 0.16);
    const fingerprintOpacity = seg(p, 0.13, 0.18) - seg(p, 0.24, 0.28);
    const wordmarkIntroOpacity = seg(p, 0.24, 0.32) - seg(p, 0.36, 0.40);
    heroLogo.style.opacity = String(Math.max(0, logoOpacity));
    heroFingerprint.style.opacity = String(Math.max(0, fingerprintOpacity));

    // beat 5: background swaps between the 3 R-photos; word + copy follow along
    const regulateOpacity = seg(p, 0.34, 0.39) - seg(p, 0.50, 0.54);
    const relateOpacity = seg(p, 0.50, 0.55) - seg(p, 0.68, 0.72);
    const riseOpacity = seg(p, 0.68, 0.73);
    heroRegulatePhoto.style.opacity = String(Math.max(0, regulateOpacity));
    heroRelatePhoto.style.opacity = String(Math.max(0, relateOpacity));
    heroRisePhoto.style.opacity = String(riseOpacity);

    let word = 'Regulate';
    if (p >= 0.70) word = 'Rise';
    else if (p >= 0.52) word = 'Relate';
    if (!heroRWordImg.src.endsWith(word.toLowerCase() + '-word.png')) {
      heroRWordImg.src = '/hero/' + word.toLowerCase() + '-word.png';
      heroRWordImg.alt = word;
      heroRCopy.textContent = R_COPY[word];
    }
    const rContentOpacity = seg(p, 0.35, 0.39) - seg(p, 0.86, 0.90);
    heroRContent.style.opacity = String(Math.max(0, rContentOpacity));

    // beat 6: words condense, wordmark settles, quote fades in, then release
    const finaleOpacity = seg(p, 0.90, 0.97);
    heroFinale.style.opacity = String(finaleOpacity);
    heroFinale.style.transform = 'translate(-50%, ' + ((1 - finaleOpacity) * 16 - 50) + '%)';
    heroWordmark.style.opacity = String(Math.max(wordmarkIntroOpacity, finaleOpacity));

    const promptFade = Math.max(0, 1 - p / 0.05);
    heroScrollPrompt.style.opacity = String(promptFade);
  }

  // A PRACTICE FOR THE WHOLE HUMAN BEING: pinned scroll-scrub, same mechanic
  // as the hero — the body drawing wipes in top-to-bottom (head -> toes) via
  // clip-path while the 7 words rise up one after another, then the whole
  // stage crossfades into the Regulate/Relate/Rise photo+copy pairs, one
  // visible at a time (mirrors the hero's R-photo crossfade pattern).
  const practiceSection = document.getElementById('practiceSection');
  const practiceBodyClip = document.getElementById('practiceBodyClip');
  const practiceBodyGroup = document.getElementById('practiceBodyGroup');
  const practiceWordSegs = [
    ['pwA', 0.03, 0.09, false],
    ['pwPractice', 0.08, 0.14, false],
    ['pwFor', 0.13, 0.19, false],
    ['pwThe', 0.18, 0.24, false],
    ['pwWhole', 0.23, 0.29, false],
    ['pwHuman', 0.28, 0.34, false],
    ['pwBeing', 0.33, 0.39, true]
  ];
  const practiceWordEls = practiceWordSegs.map(function(w){
    return { el: document.getElementById(w[0]), from: w[1], to: w[2], center: w[3] };
  });
  const practicePair1 = document.getElementById('practicePair1');
  const practicePair2 = document.getElementById('practicePair2');
  const practicePair3 = document.getElementById('practicePair3');
  const practiceDot1 = document.getElementById('practiceDot1');
  const practiceDot2 = document.getElementById('practiceDot2');
  const practiceDot3 = document.getElementById('practiceDot3');

  function practicePinProgress(){
    if (!practiceSection) return 0;
    const top = practiceSection.offsetTop;
    const range = practiceSection.offsetHeight - window.innerHeight;
    if (range <= 0) return 0;
    const raw = (window.scrollY - top) / range;
    return Math.min(1, Math.max(0, raw));
  }

  function updatePractice(){
    if (!practiceSection) return;
    const p = practicePinProgress();

    // body wipes in from head to toes as the section pins
    const bodyProgress = seg(p, 0.02, 0.40);
    if (practiceBodyClip) {
      practiceBodyClip.style.clipPath = 'inset(0 0 ' + ((1 - bodyProgress) * 100).toFixed(1) + '% 0)';
    }

    // the 7 words rise up into place one after another
    practiceWordEls.forEach(function(w){
      if (!w.el) return;
      const wp = seg(p, w.from, w.to);
      w.el.style.opacity = String(wp);
      const rise = (1 - wp) * 26;
      w.el.style.transform = (w.center ? 'translateX(-50%) ' : '') + 'translateY(' + rise.toFixed(1) + 'px)';
    });

    // body + words fade out as the practice pairs take over
    if (practiceBodyGroup) {
      practiceBodyGroup.style.opacity = String(Math.max(0, 1 - seg(p, 0.40, 0.46)));
    }

    // Regulate/Relate/Rise pairs cycle one at a time, same crossfade pattern
    // as the hero's Regulate/Relate/Rise R-photos.
    const pair1Opacity = seg(p, 0.48, 0.53) - seg(p, 0.65, 0.69);
    const pair2Opacity = seg(p, 0.65, 0.70) - seg(p, 0.83, 0.87);
    const pair3Opacity = seg(p, 0.83, 0.88);
    // Only the pair that's actually visible should receive wheel/pointer
    // input — otherwise a fully-faded (opacity 0) sibling stacked in the
    // same spot silently eats scroll input meant for the visible one.
    // A small scale-in rides along with the opacity crossfade so each pair
    // visibly settles into place rather than just appearing.
    if (practicePair1) {
      const o1 = Math.max(0, pair1Opacity);
      practicePair1.style.opacity = String(o1);
      practicePair1.style.transform = 'scale(' + (0.96 + o1 * 0.04).toFixed(3) + ')';
      practicePair1.style.pointerEvents = pair1Opacity > 0.5 ? 'auto' : 'none';
    }
    if (practicePair2) {
      const o2 = Math.max(0, pair2Opacity);
      practicePair2.style.opacity = String(o2);
      practicePair2.style.transform = 'scale(' + (0.96 + o2 * 0.04).toFixed(3) + ')';
      practicePair2.style.pointerEvents = pair2Opacity > 0.5 ? 'auto' : 'none';
    }
    if (practicePair3) {
      const o3 = Math.max(0, pair3Opacity);
      practicePair3.style.opacity = String(o3);
      practicePair3.style.transform = 'scale(' + (0.96 + o3 * 0.04).toFixed(3) + ')';
      practicePair3.style.pointerEvents = pair3Opacity > 0.5 ? 'auto' : 'none';
    }
    if (practiceDot1) practiceDot1.classList.toggle('active', pair1Opacity > 0.5);
    if (practiceDot2) practiceDot2.classList.toggle('active', pair2Opacity > 0.5);
    if (practiceDot3) practiceDot3.classList.toggle('active', pair3Opacity > 0.5);
  }

  // Testimonials: the bird flies from fully off-screen left to fully
  // off-screen right across the whole width of its block, with a light
  // bob/rotate to sell the "flying" illusion. Position is driven via the
  // left CSS property as a percentage of the block's own width (not a
  // transform translate relative to the bird's own small size), so the
  // flight path is genuinely edge-to-edge regardless of viewport width.
  // The new bird.png has real alpha transparency, so no mix-blend-mode
  // trick is needed anymore.
  const testiBirdBlock = document.getElementById('testiBirdBlock');
  const testiBird = document.getElementById('testiBird');
  function updateBirdFlight(){
    if (!testiBirdBlock || !testiBird) return;
    const rect = testiBirdBlock.getBoundingClientRect();
    const vh = window.innerHeight;
    const total = rect.height + vh;
    const traveled = vh - rect.top;
    const rawProgress = Math.min(1, Math.max(0, traveled / total));
    // crossing speed: 30% slower than the previous 2.8x multiplier.
    const progress = Math.min(1, rawProgress * 1.96);
    const leftPercent = -15 + progress * 130;
    const bob = Math.sin(progress * Math.PI * 4) * 14;
    const rotate = Math.sin(progress * Math.PI * 4) * 6;
    testiBird.style.left = leftPercent.toFixed(1) + '%';
    testiBird.style.transform = 'translate(-50%, calc(-50% + ' + bob.toFixed(1) + 'px)) rotate(' + rotate.toFixed(1) + 'deg)';
  }

  let ticking = false;
  function onScroll(){
    if (!ticking){ requestAnimationFrame(function(){ updateHero(); updatePractice(); updateBirdFlight(); ticking = false; }); ticking = true; }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', updateHero);
  window.addEventListener('resize', updatePractice);

  updateHero();
  updatePractice();
  updateBirdFlight();

  // left-edge dot nav: highlight whichever homepage section is in view
  const dotsNav = document.getElementById('dotsNav');
  let dotIo = null;
  if (dotsNav) {
    const dots = Array.prototype.slice.call(dotsNav.querySelectorAll('button'));
    dots.forEach(function(dot){
      dot.addEventListener('click', function(){
        const target = document.getElementById(dot.dataset.dotTarget);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    const sectionIds = dots.map(function(d){ return d.dataset.dotTarget; });
    const sections = sectionIds.map(function(id){ return document.getElementById(id); }).filter(Boolean);

    dotIo = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (!entry.isIntersecting) return;
        const idx = sections.indexOf(entry.target);
        dots.forEach(function(dot, i){ dot.classList.toggle('active', i === idx); });
      });
    }, { threshold: 0.5 });

    sections.forEach(function(section){ dotIo.observe(section); });
  }

  // reveal-on-scroll for section content
  const revealEls = document.querySelectorAll('[data-reveal]');
  revealEls.forEach(function(el, i){
    el.style.transitionDelay = (i % 4) * 90 + 'ms';
  });

  const io = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if (entry.isIntersecting){
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach(function(el){ io.observe(el); });

  window.__heroTeardown = function(){
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', updateHero);
    window.removeEventListener('resize', updatePractice);
    gestureEvents.forEach(function(evt){
      window.removeEventListener(evt, retryOnGesture);
    });
    io.disconnect();
    if (dotIo) { dotIo.disconnect(); }
  };
})();

`;

export default function ParallaxHomepage() {
  useEffect(() => {
    const script = document.createElement("script");
    script.text = HOMEPAGE_SCRIPT;
    document.body.appendChild(script);
    return () => {
      if (typeof (window as any).__heroTeardown === "function") {
        (window as any).__heroTeardown();
      }
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: HOMEPAGE_CSS }} />
      <div
        className="parallax-homepage-root"
        dangerouslySetInnerHTML={{ __html: HOMEPAGE_BODY }}
      />
    </>
  );
}
