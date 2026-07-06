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
  .about-transition{font-family:'Cormorant Garamond',serif;font-style:italic;font-weight:300;font-size:clamp(20px,2.6vw,28px);color:var(--text-secondary);margin:0 0 3rem}
  .wws-heading{max-width:24rem;margin:0 auto 3rem;text-align:center}
  .serve-stack{display:flex;flex-direction:column;gap:1px;background:var(--hairline);text-align:left}
  .serve-card{position:relative;background:#fff;border-left:4px solid transparent;padding:2.6rem;overflow:hidden;transition:background .3s ease,border-left-color .3s ease}
  .serve-card:hover{background:rgba(197,241,178,0.14);border-left-color:var(--lime)}
  .serve-num{position:absolute;top:-2rem;right:2rem;font-family:'Playfair Display',serif;font-style:italic;font-weight:900;font-size:170px;color:rgba(91,42,152,0.06);line-height:1;pointer-events:none;opacity:0;transition:opacity 1s cubic-bezier(.16,1,.3,1) .15s;will-change:transform}
  .serve-card.in-view .serve-num{opacity:1}
  .serve-body{position:relative;max-width:38rem}
  .serve-eyebrow{font:400 10px 'DM Sans',sans-serif;letter-spacing:.18em;text-transform:uppercase;color:var(--indigo);margin-bottom:1rem}
  .wave-label{display:inline-block;animation:wordWave 2.4s ease-in-out infinite}
  .serve-card:nth-child(1) .wave-label{animation-delay:0s}
  .serve-card:nth-child(2) .wave-label{animation-delay:.25s}
  .serve-card:nth-child(3) .wave-label{animation-delay:.5s}
  .serve-title{font-family:'Playfair Display',serif;font-weight:700;font-size:26px;color:var(--ink);margin-bottom:.9rem}
  .serve-card p{font:300 16px/1.8 'DM Sans',sans-serif;color:var(--text-secondary);margin:0}
  .wws-cta{margin-top:2.5rem;text-align:center}
  .cta-sparkle-wrap{position:relative;display:inline-block}
  .sparkle{position:absolute;width:16px;height:16px;pointer-events:none;animation:sparklePulse 2.4s ease-in-out infinite}
  .sparkle-tl{top:-16px;left:-22px;color:var(--lime);animation-delay:0s}
  .sparkle-tr{top:-18px;right:-24px;color:var(--wisteria);animation-delay:.7s}
  .sparkle-br{bottom:-14px;right:-16px;color:var(--lime);animation-delay:1.4s}
  @keyframes sparklePulse{0%,100%{opacity:.35;transform:scale(.75) rotate(0deg)}50%{opacity:1;transform:scale(1.15) rotate(20deg)}}

  /* ===== TESTIMONIALS: gradient heading beat -> scroll-flown bird -> floating,
     sparkling cards (envelope concept retired) ===== */
  .testimonials{border-top:1px solid var(--hairline)}

  .testi-scene{position:relative;overflow:hidden;background:linear-gradient(170deg,var(--indigo-deep) 0%,var(--indigo) 32%,var(--wisteria) 58%,var(--wisteria) 78%,var(--paper) 100%)}
  .testi-intro{position:relative;z-index:2;text-align:center;padding:6rem clamp(1.5rem,4vw,3rem) 1rem}
  .testi-eyebrow-light{color:var(--lime);opacity:.9}
  .testi-heading{width:clamp(340px,46vw,720px);filter:none;margin:0 auto}

  .testi-bird-block{position:relative;height:clamp(220px,32vw,420px);overflow:hidden}
  .testi-bird{position:absolute;top:50%;left:0;width:clamp(150px,20vw,300px);height:auto;transform:translate(-30%,-50%);mix-blend-mode:multiply;opacity:.92;will-change:transform}

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

  /* ===== FINAL CTA: soft floating-wave gradient in the logo's lavender/mint,
     bubble-font heading over it ===== */
  .final-cta{position:relative;overflow:hidden;text-align:center;border-top:1px solid var(--hairline)}
  .final-cta-bg{position:absolute;inset:0;z-index:0;overflow:hidden;background:var(--paper)}
  .final-cta-blob{position:absolute;width:60vw;height:60vw;border-radius:50%;filter:blur(70px);opacity:.5;will-change:transform}
  .final-cta-blob-a{left:-16vw;top:-20vw;background:radial-gradient(circle at 32% 32%,rgba(176,160,237,0.9),rgba(176,160,237,0) 70%);animation:ctaFloatA 17s ease-in-out infinite}
  .final-cta-blob-b{right:-18vw;top:6vw;width:52vw;height:52vw;background:radial-gradient(circle at 60% 40%,rgba(154,237,182,0.85),rgba(154,237,182,0) 70%);animation:ctaFloatB 21s ease-in-out infinite}
  .final-cta-blob-c{left:18vw;bottom:-24vw;width:50vw;height:50vw;background:radial-gradient(circle at 50% 50%,rgba(202,144,220,0.8),rgba(202,144,220,0) 70%);animation:ctaFloatC 25s ease-in-out infinite}
  @keyframes ctaFloatA{0%,100%{transform:translate(0,0)}50%{transform:translate(5vw,4vw)}}
  @keyframes ctaFloatB{0%,100%{transform:translate(0,0)}50%{transform:translate(-6vw,5vw)}}
  @keyframes ctaFloatC{0%,100%{transform:translate(0,0)}50%{transform:translate(4vw,-5vw)}}
  @media (prefers-reduced-motion:reduce){.final-cta-blob{animation:none}}
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
      <video class="hero-video" id="heroVideo" muted playsinline preload="auto" src="/hero/frame-1.mp4"></video>

      <div class="hero-r-photos" id="heroRPhotos">
        <img class="hero-r-photo" id="heroRegulatePhoto" src="/hero/regulate.png" alt="">
        <img class="hero-r-photo" id="heroRelatePhoto" src="/hero/relate.png" alt="">
        <img class="hero-r-photo" id="heroRisePhoto" src="/hero/rise.png" alt="">
      </div>

      <div class="hero-photo-overlay"></div>

      <img class="hero-stage-img hero-logo" id="heroLogo" src="/images/and-logo.png" alt="">
      <img class="hero-stage-img hero-fingerprint" id="heroFingerprint" src="/hero/fingerprint.png" alt="">
      <img class="hero-stage-img hero-wordmark" id="heroWordmark" src="/hero/and-intelligence-wordmark.png" alt="AND Intelligence">

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
    <span>Self-Awareness<i>•</i>Self-Discovery<i>•</i>Emotional Intelligence<i>•</i>Inner Resilience<i>•</i>Self-Regulation<i>•</i>DMIT — Innate Intelligence<i>•</i>Singapore<i>•</i></span>
    <span>Self-Awareness<i>•</i>Self-Discovery<i>•</i>Emotional Intelligence<i>•</i>Inner Resilience<i>•</i>Self-Regulation<i>•</i>DMIT — Innate Intelligence<i>•</i>Singapore<i>•</i></span>
  </div>
</section>

<!-- ABOUT: "And... What?" / "And then what?" -->
<section class="who-we-serve" id="serveSection">
  <div class="about-video-block" data-reveal>
    <video class="about-video-bg" muted loop playsinline autoplay src="/hero/and-what-bg.mp4"></video>
    <div class="about-video-overlay"></div>
    <div class="about-video-content">
      <img class="bubble-heading" src="/hero/and-what.png" alt="And... What?">
      <p class="about-para" data-reveal>Most self-help starts with what you want to change. We start with how you are built. AND sits at the intersection of self-awareness, resilience training and DMIT, a fingerprint-based intelligence profiling; because lasting change comes from working <em>with</em> your nature, not against it.</p>
      <p class="about-para" data-reveal>Every conversation is honest, specific and quietly confident. No jargon, no bootcamp intensity, no promises of a fixed self. Just a clearer picture of who you are — and the practical self-awareness to act on it.</p>
    </div>
  </div>

  <div class="section-wrap">
    <div class="about-beat about-beat-b">
      <img class="bubble-heading" src="/hero/and-then-what.png" alt="And then what?" data-reveal>
      <p class="about-transition" data-reveal>Well&hellip; you <span class="accent-mark">become<svg class="accent-underline" viewBox="0 0 200 20" preserveAspectRatio="none" aria-hidden="true"><path d="M4,14 C60,6 140,6 196,14"/></svg></span></p>

      <div class="wws-heading">
        <div class="section-eyebrow" data-reveal>Who We Serve</div>
        <h2 class="section-h2" data-reveal>Different seasons of <em>becoming</em>.</h2>
      </div>
      <div class="serve-stack">
        <div class="serve-card" data-reveal>
          <div class="serve-num">01</div>
          <div class="serve-body">
            <div class="serve-eyebrow"><span class="wave-label">Youth</span> · Ages 14–19</div>
            <div class="serve-title">Finding footing before the world speeds up</div>
            <p>Identity, pressure, and the first real decisions about who to become. We give teenagers language for what they feel and evidence of what they're capable of.</p>
          </div>
        </div>
        <div class="serve-card" data-reveal>
          <div class="serve-num">02</div>
          <div class="serve-body">
            <div class="serve-eyebrow"><span class="wave-label">Young Adults</span> · 20–35</div>
            <div class="serve-title">Building a life on your own terms</div>
            <p>Career, relationships, and the quiet question of whether you're living your own life or someone else's expectations.</p>
          </div>
        </div>
        <div class="serve-card" data-reveal>
          <div class="serve-num">03</div>
          <div class="serve-body">
            <div class="serve-eyebrow"><span class="wave-label">Mid-Life</span> · 35–55</div>
            <div class="serve-title">Reassessing without starting over</div>
            <p>The successful, restless middle — where the goal shifts from achieving more to living more deliberately with what matters.</p>
          </div>
        </div>
      </div>
      <div class="wws-cta" data-reveal>
        <span class="cta-sparkle-wrap">
          <svg class="sparkle sparkle-tl" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z"/></svg>
          <svg class="sparkle sparkle-tr" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z"/></svg>
          <svg class="sparkle sparkle-br" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z"/></svg>
          <a href="/trainings" class="btn-secondary">See All Trainings</a>
        </span>
      </div>
    </div>
  </div>
</section>

<!-- TESTIMONIALS: gradient heading -> bird flies across on scroll -> floating sparkly cards -->
<section class="testimonials" id="testimonialsSection">
  <div class="testi-scene">
    <div class="testi-intro" data-reveal>
      <div class="section-eyebrow testi-eyebrow-light">In Their Words</div>
      <img class="bubble-heading testi-heading" src="/hero/other-like-you-said.png" alt="And this is what others like you have said">
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
  <div class="final-cta-bg" aria-hidden="true">
    <span class="final-cta-blob final-cta-blob-a"></span>
    <span class="final-cta-blob final-cta-blob-b"></span>
    <span class="final-cta-blob final-cta-blob-c"></span>
  </div>
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
  if (heroVideo) {
    heroVideo.loop = true;
    function tryPlay(){
      const playPromise = heroVideo.play();
      if (playPromise && playPromise.catch) { playPromise.catch(function(){}); }
    }
    if (heroVideo.readyState >= 3) {
      tryPlay();
    } else {
      heroVideo.addEventListener('canplay', tryPlay, { once: true });
    }
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

  // Who We Serve: the big background "01/02/03" numbers fly upward through
  // each card as you scroll past — they start below the card's resting spot
  // (as if rising in from underneath) and exit off the top, clipped by the
  // card's own overflow:hidden, so they appear to launch up into the card.
  const serveNums = document.querySelectorAll('.serve-num');
  function updateServeParallax(){
    const vh = window.innerHeight;
    serveNums.forEach(function(el){
      // base the offset on the card's own rect, not the number's — the
      // number already has a transform applied, so reading its own rect
      // would feed each frame's output back into itself and compound.
      const card = el.closest('.serve-card');
      const rect = card.getBoundingClientRect();
      const total = rect.height + vh;
      const traveled = vh - rect.top;
      const progress = Math.min(1, Math.max(0, traveled / total));
      const offset = 170 - progress * 400;
      el.style.transform = 'translateY(' + offset.toFixed(1) + 'px)';
    });
  }

  // Testimonials: the paper bird flies from off-screen left to off-screen
  // right as its block scrolls through the viewport, with a light bob/rotate
  // to sell the "flying" illusion. mix-blend-mode:multiply (in CSS) drops the
  // bird PNG's white background so it reads on the gradient below.
  const testiBirdBlock = document.getElementById('testiBirdBlock');
  const testiBird = document.getElementById('testiBird');
  function updateBirdFlight(){
    if (!testiBirdBlock || !testiBird) return;
    const rect = testiBirdBlock.getBoundingClientRect();
    const vh = window.innerHeight;
    const total = rect.height + vh;
    const traveled = vh - rect.top;
    const rawProgress = Math.min(1, Math.max(0, traveled / total));
    // speed up the crossing itself: the bird completes its flight in the
    // first ~55% of the block's scroll-through, then holds off-screen right
    // for the remainder, instead of taking the whole scroll range to cross.
    const progress = Math.min(1, rawProgress * 1.8);
    const xPercent = -30 + progress * 160;
    const bob = Math.sin(progress * Math.PI * 3) * 14;
    const rotate = Math.sin(progress * Math.PI * 3) * 6;
    testiBird.style.transform = 'translate(' + xPercent.toFixed(1) + '%, calc(-50% + ' + bob.toFixed(1) + 'px)) rotate(' + rotate.toFixed(1) + 'deg)';
  }

  let ticking = false;
  function onScroll(){
    if (!ticking){ requestAnimationFrame(function(){ updateHero(); updateServeParallax(); updateBirdFlight(); ticking = false; }); ticking = true; }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', updateHero);
  updateHero();
  updateServeParallax();
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

  // reveal-on-scroll for section content and the hand-lettered accent underline
  const revealEls = document.querySelectorAll('[data-reveal], .accent-mark');
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
