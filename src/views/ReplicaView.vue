<template>
    <main id="top" class="replica-page">
        <section class="replica-hero" aria-labelledby="replica-title">
            <div class="hero-serial" aria-hidden="true">PERSONAL ARCHIVE <span>—</span> 001</div>
            <div class="hero-copy">
                <p class="eyebrow"><span></span> LISTENING ROOM / SIDE A</p>
                <p class="artist-name">VAUNDY</p>
                <h1 id="replica-title">replica<span>.</span></h1>
                <p class="hero-caption">AN ALBUM I KEEP COMING BACK TO.</p>
                <div class="hero-actions">
                    <a class="action-link primary" href="#listening-notes">打开聆听笔记 <span aria-hidden="true">↓</span></a>
                    <a class="action-link secondary" href="https://music.163.com/#/user/home?id=356485354" target="_blank" rel="noreferrer">
                        NETEASE MUSIC <span aria-hidden="true">↗</span>
                    </a>
                </div>
                <p class="archive-note"><span>NOW SPINNING</span> A small corner for one favorite record.</p>
            </div>

            <div class="record-display" aria-label="Vaundy《replica》专辑封面与唱片装饰">
                <div class="record-shadow" aria-hidden="true"></div>
                <div class="record-disc" aria-hidden="true">
                    <span class="record-ring ring-one"></span>
                    <span class="record-ring ring-two"></span>
                    <span class="record-ring ring-three"></span>
                    <span class="record-center"><b>V.</b><small>SIDE A</small></span>
                </div>
                <figure class="jacket">
                    <img src="/music/vaundy-replica.jpg" alt="Vaundy《replica》专辑封面" fetchpriority="high" />
                    <figcaption>VAUNDY <span>·</span> REPLICA</figcaption>
                </figure>
                <span class="display-index" aria-hidden="true">001</span>
                <span class="display-caption" aria-hidden="true">MY PERSONAL SOUNDTRACK</span>
            </div>

            <div class="hero-bottomline" aria-hidden="true"><span>THE WIRED WORLD</span><span>45 RPM · ALWAYS ON REPEAT</span></div>
        </section>

        <section id="listening-notes" class="notes-section" aria-labelledby="notes-title">
            <div class="notes-heading">
                <p class="eyebrow"><span></span> LISTENING NOTES / 001</p>
                <h2 id="notes-title">关于 <em>replica</em></h2>
                <p class="notes-subtitle">一张专辑，一段只属于自己的聆听记录。</p>
            </div>
            <article class="note-card">
                <span class="note-index" aria-hidden="true">A</span>
                <p>XXXXXXXXXXXXXXXXXXXXXXXXXX</p>
                <span class="note-rule" aria-hidden="true"></span>
            </article>
            <div class="other-favorite">
                <span>ANOTHER FAVORITE</span>
                <strong>ASIAN KUNG-FU GENERATION</strong>
                <router-link to="/">回到连线世界 <span aria-hidden="true">↗</span></router-link>
            </div>
        </section>
    </main>
</template>

<style lang="less" scoped>
.replica-page {
    overflow: clip;
    padding: 72px 0 90px;
    color: var(--text);
}

.replica-hero,
.notes-section {
    width: min(1120px, calc(100% - 48px));
    margin: 0 auto;
}

.replica-hero {
    position: relative;
    display: grid;
    min-height: min(760px, calc(100svh - 72px));
    grid-template-columns: .88fr 1.12fr;
    align-items: center;
    isolation: isolate;
    padding: 66px 0 72px;
}

.replica-hero::before,
.replica-hero::after {
    position: absolute;
    z-index: -1;
    pointer-events: none;
    content: "";
}

.replica-hero::before {
    top: 16%;
    right: -9%;
    width: 66%;
    height: 62%;
    background: color-mix(in srgb, var(--accent) 11%, transparent);
    clip-path: polygon(17% 0, 100% 10%, 82% 100%, 0 78%);
    transform: rotate(-8deg);
}

.replica-hero::after {
    top: 22%;
    right: 0;
    width: 54%;
    height: 1px;
    background: color-mix(in srgb, var(--text) 45%, transparent);
    transform: rotate(-29deg);
    transform-origin: right;
}

:global(html[data-theme="light"] .replica-hero::before) { background: linear-gradient(130deg, rgba(25, 212, 230, .2), rgba(0, 72, 189, .16)); }
:global(html[data-theme="dark"] .replica-hero::before) { background: linear-gradient(130deg, rgba(255, 255, 255, .04), rgba(237, 27, 38, .22)); }

.hero-serial {
    position: absolute;
    top: 25px;
    left: 0;
    color: var(--text-muted);
    font-size: .64rem;
    font-weight: 850;
    letter-spacing: .19em;
}

.hero-serial span { margin: 0 8px; color: var(--accent-strong); }
.hero-copy { position: relative; z-index: 2; padding: 25px 0 0 3.5%; }

.eyebrow {
    display: flex;
    align-items: center;
    gap: 10px;
    color: var(--accent-strong);
    font-size: .68rem;
    font-weight: 900;
    letter-spacing: .18em;
}

.eyebrow span { display: inline-block; width: 22px; height: 3px; background: var(--accent-strong); transform: skewX(-28deg); }
.artist-name { margin-top: 42px; color: var(--text-muted); font-size: .78rem; font-weight: 850; letter-spacing: .35em; }

h1 {
    margin: 3px 0 0 -8px;
    font-size: clamp(5.5rem, 11.4vw, 10.5rem);
    font-weight: 950;
    font-style: italic;
    letter-spacing: -.105em;
    line-height: .92;
    text-transform: lowercase;
    text-shadow: 5px 5px 0 color-mix(in srgb, var(--accent) 19%, transparent);
}

h1 span { color: var(--accent-strong); }
.hero-caption { margin-top: 19px; color: var(--text-muted); font-size: .71rem; font-weight: 850; letter-spacing: .2em; }
.hero-actions { display: flex; align-items: center; gap: 22px; flex-wrap: wrap; margin-top: 38px; }

.action-link {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    font-size: .76rem;
    font-weight: 900;
    letter-spacing: .1em;
    text-decoration: none;
    transition: transform 180ms ease, color 180ms ease, background-color 180ms ease;
}

.action-link:hover { transform: translateY(-2px); }
.action-link.primary { padding: 13px 16px; color: var(--theme-contrast); background: var(--accent-strong); box-shadow: 5px 5px 0 color-mix(in srgb, var(--accent) 65%, transparent); }
.action-link.primary:hover { color: var(--theme-contrast); background: var(--accent); }
.action-link.secondary { color: var(--text); }
.action-link.secondary:hover { color: var(--accent-strong); }
.archive-note { display: flex; gap: 10px; align-items: baseline; margin-top: 54px; color: var(--text-muted); font-size: .73rem; }
.archive-note span { color: var(--accent-strong); font-size: .59rem; font-weight: 900; letter-spacing: .13em; }

.record-display {
    position: relative;
    display: grid;
    min-height: 530px;
    place-items: center;
    isolation: isolate;
}

.record-shadow {
    position: absolute;
    width: min(76%, 460px);
    aspect-ratio: 1;
    border: 1px solid color-mix(in srgb, var(--text) 18%, transparent);
    border-radius: 50%;
    box-shadow: 0 0 0 22px color-mix(in srgb, var(--accent) 5%, transparent), 0 0 0 48px color-mix(in srgb, var(--accent) 4%, transparent);
}

.record-disc {
    position: absolute;
    top: 50%;
    left: 56%;
    width: min(76%, 460px);
    aspect-ratio: 1;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, .17);
    border-radius: 50%;
    background: repeating-radial-gradient(circle, #34353a 0 1px, #101115 2px 4px);
    box-shadow: 0 30px 75px rgba(0, 0, 0, .35), inset 0 0 35px rgba(0, 0, 0, .75);
    animation: record-turn 42s linear infinite;
    transform: translate(-50%, -50%);
}

.record-disc::before {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: radial-gradient(circle, transparent 0 17%, rgba(255,255,255,.08) 17.2% 17.7%, transparent 18% 35%, rgba(255,255,255,.06) 35.2% 35.7%, transparent 36% 54%, rgba(255,255,255,.06) 54.2% 54.7%, transparent 55%), linear-gradient(125deg, rgba(255,255,255,.13), transparent 34% 77%, rgba(255,255,255,.04));
    content: "";
}

.record-center {
    position: absolute;
    top: 50%;
    left: 50%;
    display: flex;
    width: 31%;
    aspect-ratio: 1;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border: 5px solid #202127;
    border-radius: 50%;
    color: #202127;
    background: radial-gradient(circle, #f3dd55 0 66%, #e8a842 67% 100%);
    transform: translate(-50%, -50%);
}

.record-center b { font-size: clamp(1rem, 2vw, 1.6rem); font-weight: 950; }
.record-center small { margin-top: 2px; font-size: .48rem; font-weight: 900; letter-spacing: .14em; }

.jacket {
    position: relative;
    z-index: 1;
    width: min(53%, 318px);
    margin: 0 0 0 -30%;
    padding: 10px 10px 31px;
    border: 1px solid rgba(255, 255, 255, .82);
    color: #201f20;
    background: #f6f3ec;
    box-shadow: 0 24px 58px rgba(0, 0, 0, .37);
    transform: rotate(-7deg);
    transition: transform 320ms cubic-bezier(.2, .8, .2, 1);
}

.record-display:hover .jacket { transform: rotate(-3deg) translateY(-5px); }
.jacket img { display: block; width: 100%; aspect-ratio: 1; object-fit: cover; }
.jacket figcaption { padding: 10px 2px 0; font-size: .58rem; font-weight: 900; letter-spacing: .16em; }
.jacket figcaption span { padding: 0 4px; color: #da2b32; }
.display-index { position: absolute; top: 7%; right: 2%; color: color-mix(in srgb, var(--text) 13%, transparent); font-size: clamp(4rem, 9vw, 8rem); font-weight: 950; letter-spacing: -.12em; }
.display-caption { position: absolute; right: 2%; bottom: 10%; color: var(--text-muted); font-size: .57rem; font-weight: 900; letter-spacing: .16em; writing-mode: vertical-rl; }

.hero-bottomline {
    position: absolute;
    right: 0;
    bottom: 23px;
    left: 0;
    display: flex;
    justify-content: space-between;
    padding-top: 12px;
    border-top: 1px solid color-mix(in srgb, var(--text) 24%, transparent);
    color: var(--text-muted);
    font-size: .59rem;
    font-weight: 850;
    letter-spacing: .15em;
}

.notes-section { display: grid; grid-template-columns: minmax(210px, .72fr) minmax(0, 1.28fr); gap: 30px clamp(25px, 7vw, 100px); padding: 82px 0 25px; border-top: 1px solid color-mix(in srgb, var(--text) 24%, transparent); }
.notes-heading h2 { margin-top: 18px; font-size: clamp(2rem, 4vw, 3.6rem); font-weight: 950; letter-spacing: -.07em; }
.notes-heading h2 em { color: var(--accent-strong); font-style: italic; }
.notes-subtitle { margin-top: 12px; color: var(--text-muted); font-size: .87rem; line-height: 1.8; }

.note-card {
    position: relative;
    display: grid;
    min-height: 220px;
    align-content: center;
    padding: clamp(25px, 5vw, 54px);
    overflow: hidden;
    border: 1px solid color-mix(in srgb, var(--text) 22%, transparent);
    background: color-mix(in srgb, var(--surface) 68%, transparent);
    box-shadow: 8px 8px 0 color-mix(in srgb, var(--accent) 35%, transparent);
}

.note-index { position: absolute; top: -28px; right: 10px; color: color-mix(in srgb, var(--accent) 14%, transparent); font-size: 12rem; font-weight: 950; font-style: italic; line-height: 1; }
.note-card p { position: relative; z-index: 1; max-width: 540px; font-size: clamp(1rem, 1.7vw, 1.25rem); font-weight: 650; line-height: 1.9; overflow-wrap: anywhere; }
.note-rule { position: relative; z-index: 1; width: 62px; height: 4px; margin-top: 24px; background: var(--accent-strong); transform: skewX(-28deg); }
.other-favorite { grid-column: 2; display: flex; align-items: center; gap: 12px 20px; flex-wrap: wrap; margin-top: -3px; color: var(--text-muted); }
.other-favorite > span { font-size: .6rem; font-weight: 900; letter-spacing: .15em; }
.other-favorite strong { color: var(--text); font-size: .76rem; letter-spacing: .03em; }
.other-favorite a { margin-left: auto; color: var(--accent-strong); font-size: .76rem; font-weight: 800; text-decoration: none; }

@keyframes record-turn { to { rotate: 360deg; } }

@media (max-width: 760px) {
    .replica-page { padding-top: 66px; }
    .replica-hero, .notes-section { width: min(100% - 36px, 560px); }
    .replica-hero { min-height: auto; grid-template-columns: 1fr; padding: 70px 0 72px; }
    .replica-hero::before { top: 28%; right: -25%; width: 120%; height: 39%; }
    .replica-hero::after { top: 45%; right: -10%; width: 76%; }
    .hero-copy { padding: 0; }
    .artist-name { margin-top: 28px; }
    h1 { font-size: clamp(5.5rem, 23vw, 8.2rem); }
    .archive-note { margin-top: 27px; }
    .record-display { min-height: clamp(350px, 92vw, 470px); margin-top: 10px; }
    .record-disc, .record-shadow { width: min(82%, 390px); }
    .jacket { width: min(57%, 270px); margin-left: -31%; }
    .display-index { top: 2%; right: 1%; font-size: 5rem; }
    .display-caption { right: 0; bottom: 6%; }
    .hero-bottomline { bottom: 20px; }
    .notes-section { grid-template-columns: 1fr; gap: 24px; padding-top: 55px; }
    .note-card { min-height: 190px; }
    .other-favorite { grid-column: 1; }
}

@media (max-width: 420px) {
    .hero-actions { gap: 16px; margin-top: 28px; }
    .action-link { font-size: .67rem; }
    .hero-bottomline { font-size: .49rem; letter-spacing: .1em; }
    .hero-bottomline span:last-child { text-align: right; }
    .other-favorite { gap: 10px; }
    .other-favorite a { width: 100%; margin-left: 0; }
}

@media (prefers-reduced-motion: reduce) {
    .record-disc { animation: none; }
    .jacket { transition: none; }
}
</style>
