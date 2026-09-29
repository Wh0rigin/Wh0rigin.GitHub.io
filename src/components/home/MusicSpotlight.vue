<template>
    <article class="music-card" aria-labelledby="music-title">
        <router-link to="/replica" class="record-scene" aria-label="打开 Vaundy《replica》聆听室">
            <span class="vinyl-disc" aria-hidden="true"><span class="vinyl-label">V.</span></span>
            <img class="album-cover" src="/music/vaundy-replica.jpg" alt="Vaundy《replica》专辑封面" loading="lazy" />
            <span class="record-caption">LISTENING ROOM <b>01</b></span>
        </router-link>

        <div class="music-copy">
            <p class="eyebrow">PERSONAL SOUNDTRACK</p>
            <h3 id="music-title">On repeat<span class="title-period">.</span></h3>
            <p class="album-line"><strong>Vaundy</strong><span>/</span><em>replica</em></p>
            <p class="artist-line">FAVORITE ARTIST <strong>ASIAN KUNG-FU GENERATION</strong></p>
            <router-link to="/replica" class="album-link">进入专辑聆听室 <span aria-hidden="true">↗</span></router-link>
        </div>
    </article>
</template>

<style lang="less" scoped>
.music-card {
    position: relative;
    grid-column: 1 / -1;
    display: grid;
    grid-template-columns: minmax(210px, .7fr) minmax(0, 1.3fr);
    align-items: center;
    gap: clamp(20px, 4vw, 52px);
    overflow: hidden;
    padding: clamp(20px, 3vw, 34px);
    border: var(--panel-border-width) solid var(--border);
    border-radius: var(--panel-radius);
    color: var(--text);
    background: linear-gradient(118deg, var(--surface), color-mix(in srgb, var(--accent-soft) 45%, var(--surface)));
    box-shadow: var(--shadow);
    transition: border-color 220ms ease, transform 220ms ease;

    &::after {
        position: absolute;
        right: -42px;
        bottom: -92px;
        width: 230px;
        aspect-ratio: 1;
        border: 1px solid color-mix(in srgb, var(--accent) 28%, transparent);
        border-radius: 50%;
        box-shadow: 0 0 0 18px color-mix(in srgb, var(--accent) 5%, transparent), 0 0 0 38px color-mix(in srgb, var(--accent) 4%, transparent);
        content: "";
        pointer-events: none;
    }

    &:hover { border-color: var(--accent); }
}

:global(html[data-theme="light"] .music-card) {
    border: 3px solid #003b9e;
    background: linear-gradient(112deg, #faffff 0 80%, #c6f7ff 80%);
    box-shadow: 9px 9px 0 #19d9e9, 14px 14px 0 #002578;
}

:global(html[data-theme="dark"] .music-card) {
    border-color: rgba(255, 255, 255, .68);
    background: linear-gradient(115deg, #17171b 0 80%, color-mix(in srgb, var(--accent) 22%, #17171b) 80%);
    box-shadow: 9px 10px 0 #000, 14px 14px 0 color-mix(in srgb, var(--accent) 46%, transparent);
}

.record-scene {
    position: relative;
    display: block;
    min-height: 210px;
    isolation: isolate;
    text-decoration: none;
}

.vinyl-disc {
    position: absolute;
    top: 50%;
    left: 61%;
    display: grid;
    width: clamp(170px, 20vw, 220px);
    aspect-ratio: 1;
    place-items: center;
    border: 1px solid rgba(255, 255, 255, .16);
    border-radius: 50%;
    background: repeating-radial-gradient(circle, #292a30 0 1px, #15171c 2px 4px);
    box-shadow: 0 16px 28px rgba(0, 0, 0, .28), inset 0 0 22px rgba(0, 0, 0, .5);
    animation: record-spin 32s linear infinite;
    transform: translate(-50%, -50%);

    &::before {
        position: absolute;
        inset: 0;
        border-radius: inherit;
        background: radial-gradient(circle, transparent 0 16%, rgba(255,255,255,.08) 16.2% 16.7%, transparent 17% 34%, rgba(255,255,255,.06) 34.2% 34.7%, transparent 35% 53%, rgba(255,255,255,.06) 53.2% 53.7%, transparent 54%), linear-gradient(125deg, rgba(255,255,255,.14), transparent 35% 75%, rgba(255,255,255,.04));
        content: "";
    }
}

.vinyl-label {
    z-index: 1;
    display: grid;
    width: 34%;
    aspect-ratio: 1;
    place-items: center;
    border: 3px solid #202127;
    border-radius: 50%;
    color: #202127;
    background: #f0d44a;
    font-size: .9rem;
    font-weight: 950;
}

.album-cover {
    position: absolute;
    z-index: 2;
    top: 50%;
    left: 5%;
    width: clamp(130px, 15vw, 168px);
    aspect-ratio: 1;
    border: 4px solid #fff;
    object-fit: cover;
    box-shadow: 0 14px 30px rgba(0, 0, 0, .3);
    transform: translateY(-50%) rotate(-5deg);
    transition: transform 240ms ease;
}

.record-scene:hover .album-cover { transform: translateY(-50%) rotate(-2deg) scale(1.025); }

.record-caption {
    position: absolute;
    right: 2%;
    bottom: 5px;
    color: var(--text-muted);
    font-size: .62rem;
    font-weight: 850;
    letter-spacing: .16em;
}

.record-caption b { margin-left: 5px; color: var(--accent-strong); }
.music-copy { position: relative; z-index: 1; }
.eyebrow { margin-bottom: 8px; color: var(--accent-strong); font-size: .68rem; font-weight: 850; letter-spacing: .18em; }
h3 { font-size: clamp(1.8rem, 3vw, 2.6rem); font-weight: 900; letter-spacing: -.06em; }
.title-period { color: var(--accent-strong); }
.album-line { display: flex; align-items: baseline; gap: 10px; margin-top: 6px; font-size: clamp(1rem, 1.7vw, 1.2rem); }
.album-line strong { color: var(--accent-strong); }
.album-line em { font-style: italic; font-weight: 750; }
.album-line span { color: var(--text-muted); }
.artist-line { display: flex; align-items: baseline; gap: 12px; flex-wrap: wrap; margin-top: 18px; color: var(--text-muted); font-size: .65rem; font-weight: 750; letter-spacing: .12em; }
.artist-line strong { color: var(--text); font-size: .78rem; letter-spacing: .02em; }
.album-link { display: inline-flex; align-items: center; gap: 8px; margin-top: 23px; color: var(--accent-strong); font-size: .88rem; font-weight: 800; text-decoration: none; }
.album-link span { transition: transform 160ms ease; }
.album-link:hover span { transform: translate(3px, -3px); }

@keyframes record-spin { to { rotate: 360deg; } }

@media (max-width: 700px) {
    .music-card { grid-template-columns: 1fr; gap: 10px; padding: 20px; }
    .record-scene { width: min(100%, 340px); min-height: 205px; margin: 0 auto; }
    .vinyl-disc { width: clamp(175px, 55vw, 210px); left: 63%; }
    .album-cover { left: 7%; width: clamp(135px, 42vw, 160px); }
    .record-caption { right: 0; }
}

@media (prefers-reduced-motion: reduce) { .vinyl-disc { animation: none; } }
</style>
