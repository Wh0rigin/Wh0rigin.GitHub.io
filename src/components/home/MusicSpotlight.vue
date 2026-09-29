<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

const touchMode = ref(false);
const spotlightOpen = ref(false);
const recordScene = ref<HTMLButtonElement | null>(null);
let touchModeQuery: MediaQueryList | undefined;

function updateTouchMode(event?: MediaQueryListEvent) {
    touchMode.value = event?.matches ?? touchModeQuery?.matches ?? false;
    if (!touchMode.value) spotlightOpen.value = false;
}

function toggleSpotlight() {
    if (touchMode.value) spotlightOpen.value = !spotlightOpen.value;
}

function closeSpotlightOnOutsideTap(event: PointerEvent) {
    if (touchMode.value && spotlightOpen.value && !recordScene.value?.contains(event.target as Node)) {
        spotlightOpen.value = false;
    }
}

onMounted(() => {
    touchModeQuery = window.matchMedia('(hover: none)');
    updateTouchMode();
    touchModeQuery.addEventListener('change', updateTouchMode);
    document.addEventListener('pointerdown', closeSpotlightOnOutsideTap);
});

onUnmounted(() => {
    touchModeQuery?.removeEventListener('change', updateTouchMode);
    document.removeEventListener('pointerdown', closeSpotlightOnOutsideTap);
});
</script>

<template>
    <article class="music-card" :class="{ 'spotlight-pinned': spotlightOpen }" aria-labelledby="music-title">
        <button
            ref="recordScene"
            class="record-scene"
            type="button"
            aria-controls="music-spotlight-window"
            :aria-expanded="touchMode ? spotlightOpen : undefined"
            :aria-label="spotlightOpen ? '关闭 replica 聚光窗' : '查看 replica 专辑信息'"
            @click="toggleSpotlight"
        >
            <div class="vinyl-position" aria-hidden="true">
                <div class="vinyl-disc">
                    <div class="vinyl-label">
                        <span>replica</span>
                        <small>VAUNDY · SIDE A</small>
                    </div>
                    <span class="record-spindle"></span>
                </div>
            </div>
            <img
                class="album-cover"
                src="/music/vaundy-replica.jpg"
                alt="Vaundy《replica》专辑封面"
                loading="lazy"
            />
            <span v-if="touchMode && spotlightOpen" class="spotlight-hint">移开或重新点击唱片以关闭窗口</span>
        </button>

        <div id="music-spotlight-window" class="spotlight-stack" aria-hidden="true">
            <span class="spotlight-layer spotlight-layer-back"></span>
            <span class="spotlight-layer spotlight-layer-front"></span>
            <div class="spotlight-window">
                <span class="spotlight-rays" aria-hidden="true"></span>
                <div class="spotlight-copy">
                    <p>PERSONAL FAVORITE <span>— 01</span></p>
                    <strong>replica</strong>
                    <span class="spotlight-artist">VAUNDY <i>·</i> ALBUM</span>
                </div>
                <span class="spotlight-serial">THE WIRED WORLD <b>/</b> MUSIC ARCHIVE</span>
            </div>
        </div>

        <div class="music-copy">
            <p class="eyebrow"><span aria-hidden="true">♫</span> MUSIC I LOVE</p>
            <h3 id="music-title">我喜欢的音乐</h3>
            <p class="music-intro">音乐，是连线世界里另一种连接方式。</p>

            <dl class="music-details">
                <div>
                    <dt>最喜欢的专辑</dt>
                    <dd><span>Vaundy</span><i>·</i>replica</dd>
                </div>
                <div>
                    <dt>最喜欢的音乐人</dt>
                    <dd class="band-name">ASIAN KUNG-FU GENERATION</dd>
                </div>
            </dl>

            <a
                class="album-link"
                href="https://music.163.com/#/user/home?id=356485354"
                target="_blank"
                rel="noreferrer"
            >
                Get to know me on NetEase Music <span aria-hidden="true">↗</span>
            </a>
        </div>
    </article>
</template>

<style lang="less" scoped>
.music-card {
    position: relative;
    grid-column: 1 / -1;
    display: grid;
    grid-template-columns: minmax(280px, 0.9fr) minmax(0, 1.1fr);
    align-items: center;
    gap: clamp(24px, 5vw, 64px);
    overflow: hidden;
    padding: clamp(24px, 4vw, 48px);
    border: var(--panel-border-width) solid var(--border);
    border-radius: var(--panel-radius);
    color: var(--text);
    background: linear-gradient(120deg, var(--surface), color-mix(in srgb, var(--accent-soft) 58%, var(--surface)));
    box-shadow: var(--shadow);
    backdrop-filter: blur(14px);
    transition: border-color 220ms ease, box-shadow 220ms ease, transform 220ms ease;

    &::before {
        position: absolute;
        top: -42%;
        right: -8%;
        width: 42%;
        aspect-ratio: 1;
        border: 22px solid color-mix(in srgb, var(--accent) 10%, transparent);
        border-radius: 50%;
        pointer-events: none;
        animation: music-orbit 12s linear infinite;
        content: "";
    }

    &:hover {
        border-color: color-mix(in srgb, var(--accent) 42%, var(--border));
    }
}

:global(html[data-theme="light"] .music-card) {
    border: 3px solid #003b9e;
    background: linear-gradient(112deg, #faffff 0 72%, #c6f7ff 72%);
    box-shadow: 11px 11px 0 #19d9e9, 17px 17px 0 #002578;
}

:global(html[data-theme="light"] .music-card::before) {
    top: -20%;
    right: -5%;
    width: 35%;
    border: 0;
    border-radius: 0;
    background: #0cafe2;
    clip-path: polygon(30% 0, 100% 0, 80% 100%, 0 75%);
    opacity: 0.18;
    animation: music-jagged 12s ease-in-out infinite alternate;
}

:global(html[data-theme="light"] .music-card h3) {
    font-style: italic;
    font-weight: 900;
    transform: skewX(-5deg);
}

.record-scene,
.music-copy {
    position: relative;
    z-index: 1;
}

.record-scene {
    z-index: 4;
    width: 100%;
    padding: 0;
    border: 0;
    color: inherit;
    background: transparent;
    font: inherit;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
}

.record-scene:focus-visible {
    outline: 3px solid var(--accent-strong);
    outline-offset: 6px;
}

:global(html[data-theme="dark"] .music-card) {
    border-color: rgba(255, 255, 255, 0.68);
    background: linear-gradient(120deg, #17171b 0 72%, color-mix(in srgb, var(--accent) 26%, #17171b) 72%);
    box-shadow: 12px 12px 0 #000000, 17px 17px 0 color-mix(in srgb, var(--accent) 48%, transparent);
}

:global(html[data-theme="dark"] .music-card::before) {
    top: -32%;
    right: -10%;
    width: 46%;
    border: 0;
    border-radius: 0;
    background: var(--accent);
    clip-path: polygon(18% 0, 100% 7%, 76% 100%, 0 76%);
    opacity: 0.18;
    animation: music-jagged 8s steps(6, end) infinite alternate;
}

.record-scene {
    position: relative;
    display: grid;
    min-height: 300px;
    place-items: center;
    isolation: isolate;
}

.vinyl-position {
    position: absolute;
    top: 50%;
    left: 58%;
    width: clamp(220px, 27vw, 300px);
    aspect-ratio: 1;
    transform: translate(-50%, -50%);
}

.vinyl-disc {
    position: relative;
    width: 100%;
    height: 100%;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 50%;
    background:
        radial-gradient(circle, transparent 0 15%, rgba(255, 255, 255, 0.04) 15.4% 15.8%, transparent 16.2% 23%, rgba(255, 255, 255, 0.035) 23.4% 23.8%, transparent 24.2% 34%, rgba(255, 255, 255, 0.035) 34.4% 34.8%, transparent 35.2% 46%, rgba(255, 255, 255, 0.035) 46.4% 46.8%, transparent 47.2%),
        repeating-radial-gradient(circle, #282a30 0 1px, #15171c 2px 4px);
    box-shadow: 0 18px 36px rgba(7, 9, 16, 0.3), inset 0 0 22px rgba(0, 0, 0, 0.5);
    animation: record-spin 28s linear infinite;

    &::before {
        position: absolute;
        inset: 0;
        border-radius: inherit;
        background: linear-gradient(125deg, rgba(255, 255, 255, 0.16), transparent 28% 70%, rgba(255, 255, 255, 0.04));
        content: "";
    }
}

.vinyl-label {
    position: absolute;
    top: 50%;
    left: 50%;
    display: flex;
    width: 34%;
    aspect-ratio: 1;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border-radius: 50%;
    color: #241a13;
    background: radial-gradient(circle, #ed5b3e 0 7%, #f6d84c 7.5% 68%, #f0a43e 69% 100%);
    transform: translate(-50%, -50%);

    span {
        font-size: clamp(0.68rem, 1.2vw, 0.9rem);
        font-weight: 900;
        letter-spacing: -0.04em;
    }

    small {
        margin-top: 3px;
        font-size: 0.42rem;
        font-weight: 800;
        letter-spacing: 0.08em;
    }
}

.record-spindle {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 5px;
    height: 5px;
    border: 1px solid rgba(20, 20, 24, 0.72);
    border-radius: 50%;
    background: #f7ebad;
    transform: translate(-50%, -50%);
}

.album-cover {
    position: absolute;
    z-index: 1;
    top: 50%;
    left: 5%;
    width: clamp(148px, 18vw, 190px);
    aspect-ratio: 1;
    border: 5px solid rgba(255, 255, 255, 0.92);
    border-radius: 8px;
    object-fit: cover;
    box-shadow: 0 18px 38px rgba(13, 15, 23, 0.3);
    transform: translateY(-50%) rotate(-6deg);
    transition: transform 260ms cubic-bezier(.2, .8, .2, 1), box-shadow 260ms ease;
}

.record-scene:focus-visible .album-cover {
    box-shadow: 0 22px 46px rgba(13, 15, 23, .4);
    transform: translateY(-52%) rotate(-3deg) scale(1.025);
}

.spotlight-stack {
    position: absolute;
    z-index: 2;
    top: 5%;
    right: 3.5%;
    width: 64%;
    height: 88%;
    opacity: 0;
    pointer-events: none;
    transform: translate(28px, -22px) scale(.97);
    transition: opacity 260ms ease, transform 500ms cubic-bezier(.16, 1, .3, 1), visibility 500ms;
    visibility: hidden;
}

.spotlight-layer,
.spotlight-window {
    position: absolute;
    inset: 0;
    clip-path: polygon(13% 0, 100% 0, 100% 100%, 0 100%);
    transition: clip-path 560ms cubic-bezier(.16, 1, .3, 1), transform 560ms cubic-bezier(.16, 1, .3, 1);
}

.spotlight-layer-back {
    z-index: 0;
    background: var(--spotlight-back);
    transform: translate(4px, 5px) skewY(-.4deg);
}

.spotlight-layer-front {
    z-index: 1;
    background: var(--spotlight-front);
    transform: translate(2px, 3px) skewY(-.2deg);
}

.spotlight-window {
    z-index: 2;
    display: flex;
    align-items: flex-end;
    overflow: hidden;
    padding: clamp(26px, 4vw, 52px) clamp(25px, 5vw, 66px) clamp(28px, 4vw, 48px) clamp(58px, 9vw, 118px);
    color: #fff;
    background: var(--spotlight-fill);
    filter: drop-shadow(0 18px 22px rgba(0, 0, 0, .22));
}

.spotlight-rays {
    position: absolute;
    top: -40%;
    right: -13%;
    width: 68%;
    height: 180%;
    opacity: .2;
    background: repeating-linear-gradient(112deg, transparent 0 35px, rgba(255,255,255,.8) 36px 38px, transparent 39px 78px);
    transform: rotate(-10deg);
}

.spotlight-copy {
    position: relative;
    z-index: 1;
    margin-left: auto;
    text-align: right;
    text-shadow: 2px 3px 0 rgba(0, 0, 0, .2);
}

.spotlight-copy > p {
    margin-bottom: 6px;
    font-size: clamp(.57rem, .85vw, .72rem);
    font-weight: 900;
    letter-spacing: .18em;
}

.spotlight-copy > p span { opacity: .72; }

.spotlight-copy > strong {
    display: block;
    font-size: clamp(2.7rem, 6vw, 6rem);
    font-style: italic;
    font-weight: 950;
    letter-spacing: -.09em;
    line-height: .92;
}

.spotlight-artist {
    display: block;
    margin-top: 11px;
    font-size: clamp(.62rem, .95vw, .8rem);
    font-weight: 900;
    letter-spacing: .2em;
}

.spotlight-artist i { margin: 0 5px; font-style: normal; opacity: .68; }

.spotlight-serial {
    position: absolute;
    right: clamp(24px, 4vw, 54px);
    bottom: clamp(14px, 2vw, 24px);
    color: rgba(255, 255, 255, .76);
    font-size: .52rem;
    font-weight: 850;
    letter-spacing: .14em;
}

.spotlight-serial b { margin: 0 5px; color: #fff; }

:global(html[data-theme="light"] .spotlight-stack) {
    --spotlight-fill: linear-gradient(125deg, #0750bd 0%, #087cde 68%, #069fcf 100%);
    --spotlight-front: #20dce8;
    --spotlight-back: #003b9e;
}

:global(html[data-theme="dark"] .spotlight-stack) {
    --spotlight-fill: linear-gradient(125deg, #8f080f 0%, #d71925 57%, #fb3038 100%);
    --spotlight-front: #10090b;
    --spotlight-back: #650910;
}

.record-scene:focus-visible + .spotlight-stack,
.spotlight-pinned .spotlight-stack {
    opacity: 1;
    transform: translate(0, 0) scale(1);
    visibility: visible;
}

.record-scene:focus-visible + .spotlight-stack .spotlight-layer-back,
.spotlight-pinned .spotlight-layer-back { transform: translate(13px, 13px) skewY(-1deg); }

.record-scene:focus-visible + .spotlight-stack .spotlight-layer-front,
.spotlight-pinned .spotlight-layer-front { transform: translate(7px, 7px) skewY(-.5deg); }

.record-scene:focus-visible + .spotlight-stack .spotlight-window,
.spotlight-pinned .spotlight-window { clip-path: polygon(9% 0, 100% 0, 100% 100%, 0 100%); }

.spotlight-hint { display: none; }

.music-copy {
    max-width: 520px;
}

.eyebrow {
    display: flex;
    align-items: center;
    gap: 9px;
    margin-bottom: 14px;
    color: var(--accent-strong);
    font-size: 0.76rem;
    font-weight: 750;
    letter-spacing: 0.17em;
}

.eyebrow span {
    font-size: 1.2rem;
}

h3 {
    font-size: clamp(1.8rem, 3.2vw, 2.5rem);
    font-weight: 800;
    letter-spacing: -0.055em;
}

.music-intro {
    margin-top: 10px;
    color: var(--text-muted);
    line-height: 1.7;
}

.music-details {
    display: grid;
    gap: 17px;
    margin-top: 28px;

    div {
        display: grid;
        gap: 5px;
    }

    dt {
        color: var(--text-muted);
        font-size: 0.78rem;
        font-weight: 650;
    }

    dd {
        color: var(--text);
        font-size: 1.02rem;
        font-weight: 750;
    }

    dd span {
        color: var(--accent-strong);
    }

    dd i {
        margin: 0 8px;
        color: var(--text-muted);
        font-style: normal;
    }

    .band-name {
        font-size: clamp(0.82rem, 1.5vw, 1rem);
        letter-spacing: 0.02em;
    }
}

.album-link {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    margin-top: 25px;
    color: var(--accent-strong);
    font-size: 0.88rem;
    font-weight: 700;
    text-decoration: none;

    span {
        transition: transform 160ms ease;
    }

    &:hover span {
        transform: translate(2px, -2px);
    }
}

@keyframes record-spin {
    to { transform: rotate(360deg); }
}

@keyframes music-orbit {
    to { transform: rotate(360deg); }
}

@keyframes music-jagged {
    to { transform: translate(-9%, 7%) rotate(8deg); }
}

@media (max-width: 820px) {
    .music-card {
        grid-template-columns: 1fr;
        gap: 8px;
    }

    .record-scene {
        width: min(100%, 390px);
        min-height: 260px;
        margin: 0 auto;
    }

    .vinyl-position {
        width: clamp(220px, 55vw, 280px);
        left: 60%;
    }

    .album-cover {
        left: 8%;
        width: clamp(150px, 38vw, 180px);
    }

    .music-copy {
        max-width: none;
    }

    .spotlight-stack {
        top: 24%;
        right: 2%;
        width: 82%;
        height: 68%;
    }

    .spotlight-window {
        align-items: flex-end;
        padding: 32px 20px 46px 54px;
    }

    .spotlight-copy > strong { font-size: clamp(3rem, 10vw, 5rem); }
    .spotlight-serial { right: 20px; bottom: 14px; font-size: .46rem; }

    .spotlight-hint {
        position: absolute;
        z-index: 8;
        left: 50%;
        bottom: 2px;
        width: max-content;
        max-width: calc(100% - 16px);
        padding: 5px 10px;
        border-bottom: 2px solid var(--accent-strong);
        color: var(--text);
        background: var(--surface);
        box-shadow: 3px 3px 0 color-mix(in srgb, var(--accent) 55%, transparent);
        font-size: .66rem;
        font-weight: 650;
        letter-spacing: .04em;
        text-align: center;
        white-space: nowrap;
        transform: translateX(-50%) skewX(-4deg);
    }
}

@media (max-width: 520px) {
    .music-card {
        gap: 0;
        padding: 20px;
    }

    .record-scene {
        min-height: 230px;
    }

    .spotlight-stack { height: 39%; }

    .vinyl-position {
        width: min(70vw, 240px);
        left: 62%;
    }

    .album-cover {
        left: 4%;
        width: min(52vw, 165px);
    }

    .music-details .band-name {
        font-size: 0.84rem;
    }
}

@media (prefers-reduced-motion: reduce) {
    .vinyl-disc { animation: none; }
    .spotlight-stack,
    .spotlight-layer,
    .spotlight-window,
    .album-cover { transition-duration: .01ms; }
}

@media (hover: hover) and (pointer: fine) {
    .record-scene:hover + .spotlight-stack,
    .record-scene:focus-visible + .spotlight-stack { opacity: 1; visibility: visible; }

    .record-scene:hover + .spotlight-stack { transform: translate(0, 0) scale(1); }

    .record-scene:hover + .spotlight-stack .spotlight-layer-back { transform: translate(13px, 13px) skewY(-1deg); }
    .record-scene:hover + .spotlight-stack .spotlight-layer-front { transform: translate(7px, 7px) skewY(-.5deg); }

    .record-scene:hover + .spotlight-stack .spotlight-window,
    .record-scene:focus-visible + .spotlight-stack .spotlight-window { clip-path: polygon(9% 0, 100% 0, 100% 100%, 0 100%); }

    .record-scene:hover .album-cover { box-shadow: 0 22px 46px rgba(13, 15, 23, .4); transform: translateY(-52%) rotate(-3deg) scale(1.025); }
}
</style>
