"use client";

import { useEffect } from "react";

// ---- Styles (identical to the prototype file) ----
const HOMEPAGE_CSS = `

  :root{
    --purple:#5b2a98;
    --purple-deep:#3d1a6e;
    --ink:#1e1826;
    --bg:#ECE6F5;
    --lavender:#E8DCF5;
    --lavender-border:rgba(232,220,245,0.9);
    --mint:#c5f1b2;
    --orchid:#ca90DC;
    --lilac-border:#cbb8e6;
    --text-secondary:#6B5F7A;
    --cream:#F7F5FA;
  }
  *{box-sizing:border-box;margin:0;padding:0}
  html{scroll-behavior:smooth}
  body{
    min-height:100vh;
    font-family:'DM Sans',system-ui,sans-serif;
    color:var(--ink);
    background-color:var(--bg);
    background-image:
      radial-gradient(58vw 52vh at 80% 12%, rgba(197,241,178,0.42), transparent 60%),
      radial-gradient(52vw 52vh at 6% 52%, rgba(202,144,220,0.20), transparent 60%),
      radial-gradient(48vw 48vh at 94% 90%, rgba(197,241,178,0.34), transparent 60%);
    background-attachment:fixed;
    background-repeat:no-repeat;
    -webkit-font-smoothing:antialiased;
    overflow-x:hidden;
  }
  ::selection{background:var(--mint);color:var(--ink)}
  em{font-style:italic;color:var(--purple)}

  /* ===== REVEAL-ON-SCROLL (bold: bigger travel + rotation on card rows) ===== */
  [data-reveal]{opacity:0;transform:translateY(60px);transition:opacity 1s cubic-bezier(.16,1,.3,1),transform 1s cubic-bezier(.16,1,.3,1)}
  [data-reveal].reveal-left{transform:translateY(30px) translateX(-90px) rotate(-5deg)}
  [data-reveal].reveal-right{transform:translateY(30px) translateX(90px) rotate(5deg)}
  [data-reveal].reveal-pop{transform:translateY(40px) scale(0.85)}
  [data-reveal].in-view{opacity:1;transform:translateY(0) translateX(0) rotate(0deg) scale(1)}

  /* ===== HERO (scroll-scrubbed sequence) ===== */
  .hero-scroll{position:relative;height:550vh}
  .hero-pin{
    position:sticky;top:0;height:100vh;overflow:hidden;
    display:flex;flex-direction:column;align-items:center;justify-content:flex-start;
    text-align:center;padding:2rem clamp(1.5rem,4vw,3rem);
  }
  .hero-content{display:flex;flex-direction:column;align-items:center;will-change:transform}
  .hero-glow{position:absolute;border-radius:50%;pointer-events:none;will-change:transform,filter}
  .hero-glow-a{top:-10%;left:-10%;width:55%;height:55%;background:radial-gradient(circle,rgba(202,144,220,0.22),transparent 70%)}
  .hero-glow-b{bottom:-15%;right:-10%;width:55%;height:55%;background:radial-gradient(circle,rgba(197,241,178,0.32),transparent 70%)}
  .hero-amp{position:relative;width:clamp(245px,35vw,455px);height:auto;display:block;margin-bottom:-0.6rem;will-change:opacity,transform;user-select:none;pointer-events:none;transform-origin:50% 50%}
  .hero-sentence{position:relative;display:flex;flex-wrap:wrap;justify-content:center;gap:.35em .55em;max-width:920px;font-family:'Playfair Display',serif;font-weight:700;font-style:italic;font-size:clamp(28px,4.2vw,56px);line-height:1.18;color:var(--ink)}
  .hs-word{opacity:0;transform:translateY(24px);display:inline-block;will-change:opacity,transform}
  .hs-and{color:var(--purple);font-weight:900;letter-spacing:.02em;text-shadow:0 0 0 rgba(91,42,152,0);transform-origin:50% 55%}
  .hero-pills{position:relative;display:flex;gap:14px;flex-wrap:wrap;justify-content:center;margin-top:1.8rem}
  .hp-pill{position:relative;overflow:hidden;opacity:0;transform:translateY(18px) scale(.9);background:var(--lavender);padding:12px 18px;box-shadow:0 0 0 rgba(91,42,152,0);will-change:opacity,transform,box-shadow}
  .hp-pill::after{content:'';position:absolute;top:0;left:-160%;width:55%;height:100%;background:linear-gradient(115deg,transparent,rgba(255,255,255,0.75),transparent);transform:skewX(-20deg);pointer-events:none}
  .hp-pill.shimmer::after{animation:pillShimmer .85s ease forwards}
  @keyframes pillShimmer{from{left:-160%}to{left:160%}}
  .hp-pill span{font:400 10px 'DM Sans',sans-serif;letter-spacing:.16em;text-transform:uppercase;color:var(--purple)}
  .hero-flyin{position:relative;opacity:0;transform:translateY(90px) scale(.94);margin-top:2.2rem;display:flex;flex-direction:column;align-items:center;will-change:opacity,transform}
  .hero-flyin .hero-copy{font:300 17px/1.85 'DM Sans',sans-serif;color:var(--text-secondary);max-width:34rem;margin:0 0 2rem;text-align:center}
  .hero-flyin .hero-ctas{display:flex;gap:16px;flex-wrap:wrap;justify-content:center}
  .btn-primary{display:inline-block;background:var(--purple);color:var(--cream);padding:16px 30px;font:500 12px 'DM Sans',sans-serif;letter-spacing:.1em;text-transform:uppercase;text-decoration:none;transition:background .3s ease}
  .btn-primary:hover{background:var(--purple-deep)}
  .btn-secondary{display:inline-block;background:transparent;color:var(--ink);padding:16px 30px;border:1px solid var(--lilac-border);font:500 12px 'DM Sans',sans-serif;letter-spacing:.1em;text-transform:uppercase;text-decoration:none;transition:border-color .3s ease,color .3s ease}
  .btn-secondary:hover{border-color:var(--purple);color:var(--purple)}

  /* ===== MARQUEE ===== */
  @keyframes and-marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
  .marquee-wrap{background:rgba(255,255,255,0.4);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);padding:22px 0;overflow:hidden;border-top:1px solid var(--lavender-border);border-bottom:1px solid var(--lavender-border)}
  .and-mq{display:inline-flex;white-space:nowrap;animation:and-marquee 34s linear infinite}
  .and-mq span{font-family:'Playfair Display',serif;font-style:italic;font-weight:400;font-size:26px;color:var(--purple)}
  .and-mq span i{color:var(--orchid);padding:0 26px;font-style:normal}

  /* ===== SHARED SECTION STYLES ===== */
  .section-eyebrow{font:400 10.5px 'DM Sans',sans-serif;letter-spacing:.18em;text-transform:uppercase;color:var(--purple);margin-bottom:1.2rem}
  .section-h2{font-family:'Playfair Display',serif;font-weight:700;font-size:clamp(34px,4vw,50px);line-height:1.08;color:var(--ink);margin:0 0 1.6rem}
  .section-wrap{max-width:1200px;margin:0 auto;padding:7rem clamp(1.5rem,4vw,3rem);position:relative}

  /* ===== WHAT AND IS (pinned scroll sequence) ===== */
  .wai-scroll{position:relative;height:760vh}
  .wai-pin{position:sticky;top:0;height:100vh;overflow:hidden;display:flex;align-items:center;justify-content:center;padding:2rem clamp(1.5rem,4vw,3rem)}
  .wai-stage{position:relative;width:100%;max-width:1280px;height:100%;display:flex;align-items:center}

  .wai-shift-row{position:relative;display:flex;flex-direction:column;align-items:center;text-align:center;will-change:transform;z-index:2}
  .wai-eyebrow{opacity:0;font:400 10.5px 'DM Sans',sans-serif;letter-spacing:.18em;text-transform:uppercase;color:var(--purple);margin-bottom:1rem;will-change:opacity}
  .wai-heading{font-family:'Playfair Display',serif;font-weight:700;font-size:clamp(30px,3.8vw,48px);line-height:1.12;color:var(--ink);margin:0 0 1rem;max-width:22rem}
  .wai-h-part1{opacity:0;display:inline;will-change:opacity}
  .wai-h-part2{opacity:0;font-style:italic;color:var(--purple);display:inline;will-change:opacity}

  .wai-figure-stage{position:relative;width:min(60vw,560px);height:min(60vh,640px);margin-top:.5rem;will-change:transform}
  .wai-img{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;will-change:opacity,clip-path,transform}
  .wai-img-body{opacity:1;clip-path:inset(0 0 100% 0)}
  .wai-img-nervous,.wai-img-heart,.wai-img-clouds{opacity:0}

  .wai-right-col{position:absolute;right:0;top:50%;transform:translateY(-50%);width:min(44%,480px);z-index:2}
  @media (max-width:900px){
    .wai-right-col{position:relative;top:auto;transform:none;width:100%;margin-top:2rem}
    .wai-stage{flex-direction:column}
  }
  .wai-quote{opacity:0;transform:translateY(20px);border-left:3px solid var(--purple);padding-left:1.6rem;margin:0 0 1.6rem;font-family:'Cormorant Garamond',serif;font-style:italic;font-weight:300;font-size:24px;line-height:1.42;color:var(--text-secondary);will-change:opacity,transform}
  .wai-para{opacity:0;transform:translateY(20px);font:300 16px/1.8 'DM Sans',sans-serif;color:var(--text-secondary);margin:0 0 1.2rem;will-change:opacity,transform}

  .wai-card-slot{position:relative;height:170px;margin-top:1rem}
  .wai-card{position:absolute;inset:0;opacity:0;transform:translateY(16px);background:rgba(255,255,255,0.66);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);border:1px solid var(--lavender-border);padding:1.6rem 1.8rem;will-change:opacity,transform}
  .wai-card-num{font-family:'Playfair Display',serif;font-style:italic;font-weight:700;font-size:20px;color:var(--purple);margin-bottom:.5rem}
  .wai-card-title{font-family:'Playfair Display',serif;font-weight:700;font-size:20px;color:var(--ink);margin-bottom:.5rem}
  .wai-card p{font:300 14px/1.65 'DM Sans',sans-serif;color:var(--text-secondary);margin:0}

  .wai-main-content{position:relative;display:flex;width:100%;align-items:center;will-change:opacity,transform}
  .wai-summary{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;opacity:0;pointer-events:none;will-change:opacity,transform}
  .wai-summary-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5px;background:var(--lavender);border:1.5px solid var(--lavender);max-width:1100px;width:100%}
  @media (max-width:860px){.wai-summary-grid{grid-template-columns:1fr}}
  .wai-summary-card{background:rgba(255,255,255,0.68);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);padding:1.8rem 1.6rem;display:flex;flex-direction:column;align-items:center;text-align:center}
  .wai-summary-card img{width:100%;max-width:150px;height:150px;object-fit:contain;margin-bottom:1rem}
  .wai-summary-card .wai-card-num{margin-bottom:.3rem}
  .wai-summary-card .wai-card-title{margin-bottom:.5rem}
  .wai-summary-card p{font:300 13px/1.6 'DM Sans',sans-serif;color:var(--text-secondary);margin:0}

  /* ===== WHO WE SERVE ===== */
  /* ===== WHO WE SERVE ===== */
  .who-we-serve{border-top:1px solid rgba(232,220,245,0.7)}
  .wws-heading{max-width:24rem;margin-bottom:3rem}
  .serve-stack{display:flex;flex-direction:column;gap:1.5px}
  .serve-card{position:relative;background:rgba(255,255,255,0.62);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);border:1px solid var(--lavender-border);border-left:4px solid transparent;padding:2.6rem;overflow:hidden;transition:background .3s ease,border-left-color .3s ease}
  .serve-card:hover{background:#F0FAE8;border-left-color:var(--mint)}
  .serve-num{position:absolute;top:-2rem;right:2rem;font-family:'Playfair Display',serif;font-style:italic;font-weight:900;font-size:170px;color:rgba(91,42,152,0.09);line-height:1;pointer-events:none;will-change:transform}
  .serve-body{position:relative;max-width:38rem}
  .serve-eyebrow{font:400 10px 'DM Sans',sans-serif;letter-spacing:.18em;text-transform:uppercase;color:var(--purple);margin-bottom:1rem}
  .serve-title{font-family:'Playfair Display',serif;font-weight:700;font-size:26px;color:var(--ink);margin-bottom:.9rem}
  .serve-card p{font:300 16px/1.8 'DM Sans',sans-serif;color:var(--text-secondary);margin:0}
  .wws-cta{margin-top:2.5rem;text-align:center}

  /* ===== TESTIMONIALS ===== */
  .testimonials{border-top:1px solid rgba(232,220,245,0.7);position:relative;overflow:hidden}
  .testi-glow{bottom:-20%;right:-8%;width:55%;height:70%;background:radial-gradient(circle,rgba(197,241,178,0.30),transparent 70%)}
  .testi-eyebrow-wrap{text-align:center;margin-bottom:2rem}

  .testi-envelope{position:relative;width:220px;height:150px;margin:0 auto 1.4rem;perspective:900px;opacity:0;transform:scale(0.4);transition:opacity .55s cubic-bezier(.34,1.56,.64,1),transform .55s cubic-bezier(.34,1.56,.64,1)}
  .testi-envelope.env-pop{opacity:1;transform:scale(1)}
  .env-body{position:absolute;inset:0;background:var(--lavender);border:1.5px solid var(--purple);border-radius:4px;z-index:1;box-shadow:0 14px 34px rgba(91,42,152,0.18);overflow:hidden}
  .env-body::before{content:'';position:absolute;left:0;right:0;bottom:0;height:62%;background:rgba(91,42,152,0.07);clip-path:polygon(0 0,50% 68%,100% 0,100% 100%,0 100%)}
  .env-flap{position:absolute;top:0;left:0;right:0;height:62%;background:linear-gradient(135deg,var(--purple),var(--orchid));clip-path:polygon(0 0,100% 0,50% 100%);transform-origin:top center;transform:rotateX(0deg);transition:transform 1s cubic-bezier(.65,0,.35,1);z-index:3;box-shadow:0 6px 18px rgba(91,42,152,0.22)}
  .testi-envelope.env-open .env-flap{transform:rotateX(-155deg)}
  .testi-hint{opacity:0;text-align:center;font-family:'Cormorant Garamond',serif;font-style:italic;font-size:15px;color:var(--text-secondary);margin-bottom:2rem;transition:opacity .6s ease}
  .testi-hint.hint-show{opacity:1}

  .testi-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5px;background:var(--lavender);border:1.5px solid var(--lavender)}
  @media (max-width:860px){.testi-grid{grid-template-columns:1fr}}
  .testi-card{position:relative;background:rgba(255,255,255,0.62);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);padding:2.4rem 2rem;min-height:190px;cursor:pointer;
    display:flex;flex-direction:column;
    opacity:0;transform:translateY(-70px) scale(0.55);
    transition:opacity .7s cubic-bezier(.34,1.2,.64,1),transform .7s cubic-bezier(.34,1.2,.64,1),box-shadow .3s ease;
  }
  .testi-card.card-out{opacity:1;transform:translateY(0) scale(1)}
  .testi-card:hover{transform:translateY(-8px) scale(1.09);box-shadow:0 20px 40px rgba(91,42,152,0.22);z-index:5}
  .quote-mark{font-family:'Playfair Display',serif;font-style:italic;font-weight:900;font-size:48px;color:var(--orchid);line-height:1;margin-bottom:.6rem}
  .testi-card p{position:relative;font-family:'Cormorant Garamond',serif;font-style:italic;font-weight:400;font-size:19px;line-height:1.55;color:var(--ink);margin:0 0 1.4rem;opacity:0;transition:opacity .35s ease}
  .testi-card:hover p{opacity:1}
  .testi-placeholder{font:300 13px/1.7 'DM Sans',sans-serif;font-style:italic;color:var(--text-secondary);opacity:.7;transition:opacity .3s ease;margin:0 0 1.4rem}
  .testi-card:hover .testi-placeholder{opacity:0}
  .testi-name{margin-top:auto;padding-top:1.2rem;font:400 10px 'DM Sans',sans-serif;letter-spacing:.16em;text-transform:uppercase;color:var(--purple)}

  /* ===== FINAL CTA ===== */
  .final-cta{position:relative;overflow:hidden;text-align:center;border-top:1px solid rgba(232,220,245,0.7)}
  .final-cta-inner{max-width:640px;margin:0 auto;padding:9rem clamp(1.5rem,4vw,3rem);position:relative}
  .final-cta h2{font-family:'Playfair Display',serif;font-weight:700;font-size:clamp(32px,4vw,46px);line-height:1.12;color:var(--ink);margin:0 0 1.4rem}
  .final-cta p{font:300 17px/1.8 'DM Sans',sans-serif;color:var(--text-secondary);margin:0 0 2.4rem}
  .final-glow{top:-40%;left:50%;width:130%;height:160%;background:radial-gradient(circle,rgba(202,144,220,0.26),transparent 65%);will-change:transform}

  /* ===== MOBILE: disable scroll-pinned sequences, show static content instead ===== */
  @media (max-width:768px){
    .hero-scroll{height:auto}
    .hero-pin{position:relative;height:auto;min-height:0;padding:5rem clamp(1.5rem,4vw,3rem) 3rem}
    .hero-content{transform:none!important}
    .hero-amp{opacity:1!important}
    .hero-glow-a,.hero-glow-b{transform:none!important;filter:none!important}
    .hs-word,.hp-pill,#heroFlyin{opacity:1!important;transform:none!important;box-shadow:none!important;text-shadow:none!important}

    .wai-scroll{height:auto}
    .wai-pin{position:relative;height:auto;padding:4rem clamp(1.5rem,4vw,3rem)}
    .wai-stage{flex-direction:column}
    .wai-main-content{position:relative;opacity:1!important;transform:none!important;flex-direction:column;pointer-events:auto!important}
    .wai-shift-row{transform:none!important}
    .wai-eyebrow,.wai-h-part1,.wai-h-part2,.wai-quote,.wai-para,.wai-card{opacity:1!important;transform:none!important}
    .wai-figure-stage{transform:none!important;width:min(70vw,300px);height:min(70vw,300px);margin:0 auto 1.5rem}
    .wai-img-body{opacity:1!important;clip-path:none!important}
    .wai-img-nervous,.wai-img-heart,.wai-img-clouds{display:none!important}
    .wai-card-slot{position:relative;height:auto}
    .wai-card{position:relative;margin-bottom:1rem}
    .wai-right-col{position:relative;top:auto;transform:none;width:100%;margin-top:0}
    .wai-summary{display:none!important}

    .testi-card p{opacity:1!important}
    .testi-placeholder{display:none!important}
    .testi-hint{display:none!important}
  }

`;

// ---- Markup (identical to the prototype file, image paths + internal links updated) ----
const HOMEPAGE_BODY = `

<!-- HERO (scroll-scrubbed sequence) -->
<section class="hero-scroll" id="heroScroll">
  <div class="hero-pin">
    <div class="hero-glow hero-glow-a"></div>
    <div class="hero-glow hero-glow-b"></div>
    <div class="hero-content" id="heroContent">
    <img class="hero-amp" id="heroAmp" alt="AND Intelligence" src="/images/and-logo.png">
    <div class="hero-sentence">
      <span class="hs-word" data-start="0.07" data-end="0.16">Regulate.</span>
      <span class="hs-word" data-start="0.16" data-end="0.25">Relate.</span>
      <span class="hs-word" data-start="0.25" data-end="0.34">Rise.</span>
      <span class="hs-word hs-and" data-start="0.41" data-end="0.50">AND</span>
      <span class="hs-word" data-start="0.50" data-end="0.58">know why you can.</span>
    </div>
    <div class="hero-pills">
      <div class="hp-pill" data-start="0.58" data-end="0.66"><span>Self-Awareness</span></div>
      <div class="hp-pill" data-start="0.66" data-end="0.74"><span>Self-Discovery</span></div>
      <div class="hp-pill" data-start="0.74" data-end="0.82"><span>Emotional Intelligence</span></div>
    </div>
    <div class="hero-flyin" id="heroFlyin" data-start="0.84" data-end="1.0">
      <p class="hero-copy">A self-discovery practice that helps you understand how you are wired — and build the self-awareness to live accordingly. Guided reflection, honest conversation, and fingerprint-based intelligence profiling.</p>
      <div class="hero-ctas">
        <a href="/trainings" class="btn-primary">Explore Sessions</a>
        <a href="/how-it-works" class="btn-secondary">How It Works</a>
      </div>
    </div>
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

<!-- WHAT AND IS (pinned scroll sequence) -->
<section class="wai-scroll" id="waiScroll">
  <div class="wai-pin">
    <div class="wai-stage">
      <div class="wai-main-content" id="waiMainContent">
      <div class="wai-shift-row" id="waiShiftRow">
        <div class="wai-eyebrow" id="waiEyebrow">What AND Is</div>
        <h2 class="wai-heading">
          <span class="wai-h-part1" id="waiPart1">A practice for</span> <span class="wai-h-part2" id="waiPart2">the whole human being.</span>
        </h2>
        <div class="wai-figure-stage" id="waiFigureStage">
          <img class="wai-img wai-img-body" id="waiBody" alt="" src="/images/wai-body-figure.webp">
          <img class="wai-img wai-img-nervous" id="waiNervous" alt="" src="/images/wai-nervous-system.webp">
          <img class="wai-img wai-img-heart" id="waiHeart" alt="" src="/images/wai-heart.webp">
          <img class="wai-img wai-img-clouds" id="waiClouds" alt="" src="/images/wai-head-clouds.webp">
        </div>
      </div>

      <div class="wai-right-col">
        <blockquote class="wai-quote" id="waiQuote">You are not a problem to be solved. You are a system to be understood.</blockquote>
        <p class="wai-para" id="waiPara1">Most self-help starts with what you want to change. We start with how you are built. AND sits at the intersection of self-awareness, resilience training and DMIT, a fingerprint-based intelligence profiling; because lasting change comes from working <em>with</em> your nature, not against it.</p>
        <p class="wai-para" id="waiPara2">Every conversation is honest, specific and quietly confident. No jargon, no bootcamp intensity, no promises of a fixed self. Just a clearer picture of who you are — and the practical self-awareness to act on it.</p>

        <div class="wai-card-slot">
          <div class="wai-card" id="waiCard1">
            <div class="wai-card-num">01</div>
            <div class="wai-card-title">Regulate</div>
            <p>Learn to steady your own nervous system before it steadies you.</p>
          </div>
          <div class="wai-card" id="waiCard2">
            <div class="wai-card-num">02</div>
            <div class="wai-card-title">Relate</div>
            <p>Build relationships from a place of understanding, not reaction.</p>
          </div>
          <div class="wai-card" id="waiCard3">
            <div class="wai-card-num">03</div>
            <div class="wai-card-title">Rise</div>
            <p>Grow into the version of yourself your wiring already supports.</p>
          </div>
        </div>
      </div>
      </div>

      <div class="wai-summary" id="waiSummary">
        <div class="wai-summary-grid">
          <div class="wai-summary-card">
            <img id="waiSumNervous" alt="">
            <div class="wai-card-num">01</div>
            <div class="wai-card-title">Regulate</div>
            <p>Learn to steady your own nervous system before it steadies you.</p>
          </div>
          <div class="wai-summary-card">
            <img id="waiSumHeart" alt="">
            <div class="wai-card-num">02</div>
            <div class="wai-card-title">Relate</div>
            <p>Build relationships from a place of understanding, not reaction.</p>
          </div>
          <div class="wai-summary-card">
            <img id="waiSumClouds" alt="">
            <div class="wai-card-num">03</div>
            <div class="wai-card-title">Rise</div>
            <p>Grow into the version of yourself your wiring already supports.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- WHO WE SERVE -->
<section class="who-we-serve">
  <div class="section-wrap">
    <div class="wws-heading">
      <div class="section-eyebrow" data-reveal>Who We Serve</div>
      <h2 class="section-h2" data-reveal>Different seasons of <em>becoming</em>.</h2>
    </div>
    <div class="serve-stack">
      <div class="serve-card reveal-pop" data-reveal>
        <div class="serve-num parallax-el parallax-scale" data-speed="0.35">01</div>
        <div class="serve-body">
          <div class="serve-eyebrow">Youth · Ages 14–19</div>
          <div class="serve-title">Finding footing before the world speeds up</div>
          <p>Identity, pressure, and the first real decisions about who to become. We give teenagers language for what they feel and evidence of what they're capable of.</p>
        </div>
      </div>
      <div class="serve-card reveal-pop" data-reveal>
        <div class="serve-num parallax-el parallax-scale" data-speed="0.35">02</div>
        <div class="serve-body">
          <div class="serve-eyebrow">Young Adults · 20–35</div>
          <div class="serve-title">Building a life on your own terms</div>
          <p>Career, relationships, and the quiet question of whether you're living your own life or someone else's expectations.</p>
        </div>
      </div>
      <div class="serve-card reveal-pop" data-reveal>
        <div class="serve-num parallax-el parallax-scale" data-speed="0.35">03</div>
        <div class="serve-body">
          <div class="serve-eyebrow">Mid-Life · 35–55</div>
          <div class="serve-title">Reassessing without starting over</div>
          <p>The successful, restless middle — where the goal shifts from achieving more to living more deliberately with what matters.</p>
        </div>
      </div>
    </div>
    <div class="wws-cta" data-reveal>
      <a href="/trainings" class="btn-secondary">See All Trainings</a>
    </div>
  </div>
</section>

<!-- TESTIMONIALS -->
<section class="testimonials">
  <div class="glow testi-glow parallax-el" data-speed="0.25"></div>
  <div class="section-wrap">
    <div class="testi-eyebrow-wrap">
      <div class="section-eyebrow" data-reveal>In Their Words</div>
    </div>

    <div class="testi-envelope" id="testiEnvelope">
      <div class="env-body"></div>
      <div class="env-flap"></div>
    </div>
    <div class="testi-hint" id="testiHint">Hover a card to read what they shared</div>

    <div class="testi-grid" id="testiGrid">
      <div class="testi-card" id="testiCard1">
        <div class="quote-mark">"</div>
        <div class="testi-placeholder">A message from Rachel — hover to read</div>
        <p>The profile didn't box me in — it gave me permission. I stopped fighting my own instincts.</p>
        <div class="testi-name">Rachel · Young Adult journey</div>
      </div>
      <div class="testi-card" id="testiCard2">
        <div class="quote-mark">"</div>
        <div class="testi-placeholder">A message from Mei Ling — hover to read</div>
        <p>My son went from shutting down to explaining what he needed. That is not a small thing.</p>
        <div class="testi-name">Mei Ling · Parent, Youth journey</div>
      </div>
      <div class="testi-card" id="testiCard3">
        <div class="quote-mark">"</div>
        <div class="testi-placeholder">A message from David — hover to read</div>
        <p>Honest, warm, and never once made me feel like a project. I felt taken seriously.</p>
        <div class="testi-name">David · Mid-Life journey</div>
      </div>
    </div>
  </div>
</section>

<!-- FINAL CTA -->
<section class="final-cta">
  <div class="glow final-glow parallax-el parallax-scale parallax-rotate" data-speed="0.3"></div>
  <div class="final-cta-inner">
    <h2 class="reveal-pop" data-reveal>Start with understanding. Everything else follows.</h2>
    <p data-reveal>Begin with an introductory conversation. No commitment, no assessment to prepare for — just a first honest conversation about where you are.</p>
    <a href="/contact" class="btn-primary" data-reveal>Begin the Conversation</a>
  </div>
</section>

`;

// ---- Scroll-driven behavior (identical logic to the prototype file) ----
const HOMEPAGE_SCRIPT = `

(function(){
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  const parallaxEls = document.querySelectorAll('.parallax-el');

  const heroScroll = document.getElementById('heroScroll');
  const heroAmp = document.getElementById('heroAmp');
  const heroContent = document.getElementById('heroContent');
  const heroGlowA = document.querySelector('.hero-glow-a');
  const heroGlowB = document.querySelector('.hero-glow-b');
  const scrubEls = document.querySelectorAll('.hs-word, .hp-pill, #heroFlyin');

  const waiScroll = document.getElementById('waiScroll');
  const waiShiftRow = document.getElementById('waiShiftRow');
  const waiEyebrow = document.getElementById('waiEyebrow');
  const waiPart1 = document.getElementById('waiPart1');
  const waiPart2 = document.getElementById('waiPart2');
  const waiFigureStage = document.getElementById('waiFigureStage');
  const waiBody = document.getElementById('waiBody');
  const waiNervous = document.getElementById('waiNervous');
  const waiHeart = document.getElementById('waiHeart');
  const waiClouds = document.getElementById('waiClouds');
  const waiQuote = document.getElementById('waiQuote');
  const waiPara1 = document.getElementById('waiPara1');
  const waiPara2 = document.getElementById('waiPara2');
  const waiCard1 = document.getElementById('waiCard1');
  const waiCard2 = document.getElementById('waiCard2');
  const waiCard3 = document.getElementById('waiCard3');
  const waiMainContent = document.getElementById('waiMainContent');
  const waiSummary = document.getElementById('waiSummary');
  const waiSumNervous = document.getElementById('waiSumNervous');
  const waiSumHeart = document.getElementById('waiSumHeart');
  const waiSumClouds = document.getElementById('waiSumClouds');

  // summary thumbnails reuse the already-embedded images rather than duplicating base64 payloads
  waiSumNervous.src = waiNervous.src;
  waiSumHeart.src = waiHeart.src;
  waiSumClouds.src = waiClouds.src;

  let ticking = false;

  function heroProgress(){
    const wrapperTop = heroScroll.offsetTop;
    const range = heroScroll.offsetHeight - window.innerHeight;
    if (range <= 0) return 0;
    const raw = (window.scrollY - wrapperTop) / range;
    return Math.min(1, Math.max(0, raw));
  }

  function pinProgress(wrapper){
    const wrapperTop = wrapper.offsetTop;
    const range = wrapper.offsetHeight - window.innerHeight;
    if (range <= 0) return 0;
    const raw = (window.scrollY - wrapperTop) / range;
    return Math.min(1, Math.max(0, raw));
  }

  function seg(p, a, b){
    if (b <= a) return p >= b ? 1 : 0;
    return Math.min(1, Math.max(0, (p - a) / (b - a)));
  }

  function fadeRise(el, t, distance){
    el.style.opacity = t;
    el.style.transform = 'translateY(' + ((1 - t) * distance) + 'px)';
  }

  function easeOutBack(t){
    const c1 = 1.70158, c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  }

  function easeOutBackStrong(t){
    const c1 = 3.4, c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  }

  function updateHero(p){
    // vertical position: center the "&" alone at rest, rise as a unit while the headline builds
    const vh = window.innerHeight;
    const ampH = heroAmp.offsetHeight || 260;
    const baseTop = Math.max(0, (vh - ampH) / 2);
    const fullH = heroContent.offsetHeight;
    const finalTop = Math.max(10, (vh - fullH) / 2);
    const riseProgress = seg(p, 0, 0.58);
    heroContent.style.transform = 'translateY(' + (baseTop - (baseTop - finalTop) * riseProgress) + 'px)';

    // ampersand: 1 -> 0.5 (0 to .05), hold, 0.5 -> 1 (.37 to .45), hold at 1
    let ampOp;
    if (p <= 0.05) ampOp = 1 - 0.5 * (p / 0.05);
    else if (p <= 0.34) ampOp = 0.5;
    else if (p <= 0.41) ampOp = 0.5 + 0.5 * ((p - 0.34) / 0.07);
    else ampOp = 1;
    heroAmp.style.opacity = ampOp;

    // background glows: subtle hue + position drift synced to scroll stage
    const hue = p * 22;
    const shiftX = (p - 0.5) * 8;
    if (heroGlowA) {
      heroGlowA.style.filter = 'hue-rotate(' + hue.toFixed(1) + 'deg)';
      heroGlowA.style.transform = 'translate(' + shiftX.toFixed(1) + '%, ' + (shiftX * 0.6).toFixed(1) + '%)';
    }
    if (heroGlowB) {
      heroGlowB.style.filter = 'hue-rotate(' + (-hue).toFixed(1) + 'deg)';
      heroGlowB.style.transform = 'translate(' + (-shiftX).toFixed(1) + '%, ' + (-shiftX * 0.6).toFixed(1) + '%)';
    }

    scrubEls.forEach(function(el){
      const start = parseFloat(el.dataset.start);
      const end = parseFloat(el.dataset.end);
      let t = (p - start) / (end - start);
      t = Math.min(1, Math.max(0, t));
      el.style.opacity = t;
      if (el.classList.contains('hp-pill')) {
        const eased = easeOutBack(t);
        el.style.transform = 'translateY(' + ((1 - eased) * 18) + 'px) scale(' + (0.82 + eased * 0.18) + ')';
        // crisp halo: sharp bright edge + saturated glow ring, peaks well above ambient bg, then dims to a flat pill
        const glow = Math.sin(t * Math.PI) * 0.7;
        el.style.boxShadow =
          '0 0 0 1.5px rgba(91,42,152,' + Math.min(glow * 1.3, 0.9).toFixed(2) + '), ' +
          '0 0 16px 2px rgba(91,42,152,' + glow.toFixed(2) + '), ' +
          '0 0 30px 6px rgba(202,144,220,' + (glow * 0.85).toFixed(2) + ')';
        // shimmer sweep, fires once as the pill crosses its activation point, re-arms if scrolled back
        if (t > 0.4 && !el.dataset.shimmered) {
          el.dataset.shimmered = '1';
          el.classList.add('shimmer');
          setTimeout(function(){ el.classList.remove('shimmer'); }, 900);
        } else if (t < 0.05 && el.dataset.shimmered) {
          delete el.dataset.shimmered;
        }
      } else if (el.id === 'heroFlyin') {
        const eased = easeOutBack(t);
        el.style.transform = 'translateY(' + ((1 - eased) * 90) + 'px) scale(' + (0.9 + eased * 0.1) + ')';
      } else if (el.classList.contains('hs-and')) {
        // stamp: starts oversized + rotated, slams down with overshoot, flashes then settles flat
        const se = easeOutBackStrong(t);
        const scale = 1 + (1 - se) * 2.4;
        const rot = (1 - se) * -16;
        el.style.opacity = Math.min(1, t * 1.8);
        el.style.transform = 'scale(' + scale.toFixed(3) + ') rotate(' + rot.toFixed(2) + 'deg)';
        const flash = Math.max(0, Math.sin(t * Math.PI)) * 0.9;
        el.style.textShadow =
          '0 0 ' + (10 + flash * 18).toFixed(1) + 'px rgba(91,42,152,' + flash.toFixed(2) + '), ' +
          '0 0 ' + (24 + flash * 30).toFixed(1) + 'px rgba(202,144,220,' + (flash * 0.7).toFixed(2) + ')';
      } else {
        const eased = easeOutBack(t);
        el.style.transform = 'translateY(' + ((1 - eased) * 24) + 'px)';
      }
    });
  }

  function updateWai(p){
    // stage 1: "A practice for" appears alone
    waiEyebrow.style.opacity = seg(p, 0.00, 0.04);
    waiPart1.style.opacity = seg(p, 0.00, 0.04);

    // stage 2: figure reveals head -> toe via clip-path, starting big (~60% of screen);
    // "the whole human being." completes near the end of the reveal
    const revealPct = seg(p, 0.05, 0.24) * 100;
    waiBody.style.clipPath = 'inset(0 0 ' + (100 - revealPct).toFixed(1) + '% 0)';
    waiPart2.style.opacity = seg(p, 0.16, 0.24);

    // stage 3: figure shrinks from big intro size down to resting size WHILE heading + figure shift left
    const shiftSeg = seg(p, 0.24, 0.33);
    const shiftEased = easeOutBack(shiftSeg);
    waiShiftRow.style.transform = 'translateX(' + ((1 - shiftEased) * 16) + '%)';
    const figureScale = 1 + (1 - Math.min(1, shiftSeg)) * 0.65; // 1.65 during intro -> 1.0 once shifted left

    // stage 4: quote, then paragraphs fade in on the right (no tilt, straight fade+rise)
    fadeRise(waiQuote, seg(p, 0.30, 0.38), 20);
    fadeRise(waiPara1, seg(p, 0.38, 0.46), 20);
    fadeRise(waiPara2, seg(p, 0.43, 0.51), 20);

    // stage 5: body -> nervous system crossfade, card 01 Regulate
    const nervousIn = seg(p, 0.49, 0.55);
    waiBody.style.opacity = 1 - nervousIn;
    waiNervous.style.opacity = nervousIn;
    const card1In = seg(p, 0.50, 0.55);
    const card1Out = seg(p, 0.57, 0.60);
    fadeRise(waiCard1, Math.max(0, card1In - card1Out), 16);

    // stage 6: nervous -> heart crossfade, card 02 Relate
    const heartIn = seg(p, 0.57, 0.64);
    waiNervous.style.opacity = nervousIn * (1 - heartIn);
    waiHeart.style.opacity = heartIn;
    const card2In = seg(p, 0.59, 0.64);
    const card2Out = seg(p, 0.68, 0.71);
    fadeRise(waiCard2, Math.max(0, card2In - card2Out), 16);

    // stage 7: heart -> head-in-clouds crossfade with a gentle pan up, card 03 Rise
    const cloudsIn = seg(p, 0.68, 0.75);
    waiHeart.style.opacity = heartIn * (1 - cloudsIn);
    waiClouds.style.opacity = cloudsIn;
    const panY = -cloudsIn * 34;
    const card3In = seg(p, 0.70, 0.76);
    fadeRise(waiCard3, card3In, 16);

    waiFigureStage.style.transform = 'scale(' + figureScale.toFixed(3) + ') translateY(' + panY.toFixed(1) + 'px)';

    // stage 8: everything condenses into all 3 cards side by side, each with its own graphic
    const summaryIn = seg(p, 0.84, 0.95);
    waiMainContent.style.opacity = String(1 - summaryIn);
    waiMainContent.style.transform = 'translateY(' + (-summaryIn * 40) + 'px)';
    waiMainContent.style.pointerEvents = summaryIn > 0.5 ? 'none' : 'auto';
    waiSummary.style.opacity = String(summaryIn);
    waiSummary.style.transform = 'translateY(' + ((1 - summaryIn) * 40) + 'px)';
    waiSummary.style.pointerEvents = summaryIn > 0.5 ? 'auto' : 'none';
  }

  function update(){
    const y = window.scrollY;
    const vh = window.innerHeight;

    if (!isMobile) {
      updateHero(heroProgress());
      updateWai(pinProgress(waiScroll));
    }

    parallaxEls.forEach(function(el){
      const speed = parseFloat(el.dataset.speed) || 0.15;
      const rect = el.getBoundingClientRect();
      const centerDelta = (vh / 2) - (rect.top + rect.height / 2);
      let t = 'translateY(' + (centerDelta * speed * -1) + 'px)';

      if (el.classList.contains('final-glow')) {
        t = 'translateX(-50%) ' + t;
      }
      if (el.classList.contains('parallax-scale')) {
        const closeness = 1 - Math.min(Math.abs(centerDelta) / (vh * 0.7), 1);
        const scale = 1 + closeness * 0.3;
        t += ' scale(' + scale.toFixed(3) + ')';
      }
      if (el.classList.contains('parallax-rotate')) {
        t += ' rotate(' + (y * 0.02) + 'deg)';
      }
      el.style.transform = t;
    });

    ticking = false;
  }

  function onScroll(){
    if (!ticking){ requestAnimationFrame(update); ticking = true; }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', update);
  window.addEventListener('load', update);
  update();

  // reveal-on-scroll for sections below the hero
  const revealEls = document.querySelectorAll('[data-reveal]');
  revealEls.forEach(function(el, i){
    if (el.classList.contains('reveal-left') || el.classList.contains('reveal-right')) {
      el.style.transitionDelay = (i % 3) * 130 + 'ms';
    } else {
      el.style.transitionDelay = (i % 4) * 90 + 'ms';
    }
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

  // testimonials: envelope pops, opens, then the 3 cards are pulled out one by one
  const testiEnvelope = document.getElementById('testiEnvelope');
  const testiHint = document.getElementById('testiHint');
  const testiCards = [
    document.getElementById('testiCard1'),
    document.getElementById('testiCard2'),
    document.getElementById('testiCard3')
  ];
  const testiGrid = document.getElementById('testiGrid');

  const testiIo = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if (!entry.isIntersecting) return;
      testiIo.unobserve(entry.target);

      testiEnvelope.classList.add('env-pop');
      setTimeout(function(){ testiEnvelope.classList.add('env-open'); }, 550);
      testiCards.forEach(function(card, i){
        setTimeout(function(){ card.classList.add('card-out'); }, 950 + i * 180);
      });
      setTimeout(function(){ testiHint.classList.add('hint-show'); }, 950 + testiCards.length * 180 + 500);
    });
  }, { threshold: 0.35 });

  testiIo.observe(testiGrid);
})();

`;

export default function ParallaxHomepage() {
  useEffect(() => {
    const script = document.createElement("script");
    script.text = HOMEPAGE_SCRIPT;
    document.body.appendChild(script);
    return () => {
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
