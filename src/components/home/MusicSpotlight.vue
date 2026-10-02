<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import WiredImage from '../ui/WiredImage.vue';

const spotlightOpen = ref(false);
const recordScene = ref<HTMLButtonElement | null>(null);
const closeHintRef = ref<HTMLButtonElement | null>(null);
const vinylRef = ref<HTMLElement | null>(null);
const coverRef = ref<HTMLElement | null>(null);
const spotlightWindowRef = ref<HTMLElement | null>(null);
const viewport = ref({ width: 1, height: 1 });
const artwork = ref({ vinylX: 0, vinylY: 0, vinylRadius: 0, coverX: 0, coverY: 0, coverWidth: 0, coverHeight: 0 });
let geometryFrame = 0;
let scrollSettleFrame = 0;
let scrollLocked = false;
let lockedScrollY = 0;
let originalBodyStyle: string | null = null;
let originalHtmlStyle: string | null = null;

function updateSpotlightGeometry() {
    viewport.value = { width: window.innerWidth, height: window.innerHeight };
    const vinylRect = vinylRef.value?.getBoundingClientRect();
    const coverRect = coverRef.value?.getBoundingClientRect();

    if (vinylRect) {
        artwork.value.vinylX = vinylRect.left + vinylRect.width / 2;
        artwork.value.vinylY = vinylRect.top + vinylRect.height / 2;
        artwork.value.vinylRadius = Math.max(vinylRect.width, vinylRect.height) / 2 + 5;
    }
    if (coverRect) {
        artwork.value.coverX = coverRect.left - 4;
        artwork.value.coverY = coverRect.top - 4;
        artwork.value.coverWidth = coverRect.width + 8;
        artwork.value.coverHeight = coverRect.height + 8;
    }
}

function scheduleGeometryUpdate() {
    cancelAnimationFrame(geometryFrame);
    geometryFrame = requestAnimationFrame(updateSpotlightGeometry);
}

function restoreInlineStyle(element: HTMLElement, style: string | null) {
    if (style === null) element.removeAttribute('style');
    else element.setAttribute('style', style);
}

function scrollImmediatelyTo(top: number) {
    const root = document.documentElement;
    const priorStyle = root.getAttribute('style');
    root.style.scrollBehavior = 'auto';
    window.scrollTo(0, top);
    restoreInlineStyle(root, priorStyle);
}

function lockPageScroll() {
    if (scrollLocked) return;
    const body = document.body;
    const root = document.documentElement;
    scrollLocked = true;
    lockedScrollY = window.scrollY;
    originalBodyStyle = body.getAttribute('style');
    originalHtmlStyle = root.getAttribute('style');

    const bodyPaddingRight = Number.parseFloat(window.getComputedStyle(body).paddingRight) || 0;
    const scrollbarWidth = Math.max(0, window.innerWidth - root.clientWidth);
    root.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.top = `-${lockedScrollY}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.width = '100%';
    body.style.overflow = 'hidden';
    if (scrollbarWidth) body.style.paddingRight = `${bodyPaddingRight + scrollbarWidth}px`;
    scheduleGeometryUpdate();
}

function unlockPageScroll(updateGeometry = true) {
    if (!scrollLocked) return;
    const body = document.body;
    const root = document.documentElement;
    const restoreTo = lockedScrollY;
    scrollLocked = false;
    restoreInlineStyle(body, originalBodyStyle);
    restoreInlineStyle(root, originalHtmlStyle);
    originalBodyStyle = null;
    originalHtmlStyle = null;
    scrollImmediatelyTo(restoreTo);
    if (updateGeometry) scheduleGeometryUpdate();
}

function cancelPendingScrollLock() {
    if (scrollSettleFrame) cancelAnimationFrame(scrollSettleFrame);
    scrollSettleFrame = 0;
}

function lockAfterScrollSettles() {
    cancelPendingScrollLock();
    let previousY = window.scrollY;
    let stableFrames = 0;
    const startedAt = performance.now();

    const checkScroll = () => {
        if (!spotlightOpen.value) {
            scrollSettleFrame = 0;
            return;
        }

        const currentY = window.scrollY;
        stableFrames = Math.abs(currentY - previousY) < 0.5 ? stableFrames + 1 : 0;
        previousY = currentY;

        if (stableFrames >= 6 || performance.now() - startedAt >= 2600) {
            scrollSettleFrame = 0;
            lockPageScroll();
            return;
        }
        scrollSettleFrame = requestAnimationFrame(checkScroll);
    };

    scrollSettleFrame = requestAnimationFrame(checkScroll);
}

function openSpotlight() {
    if (spotlightOpen.value) return;
    spotlightOpen.value = true;
    scheduleGeometryUpdate();
    const compactViewport = window.matchMedia('(max-width: 820px)').matches;
    recordScene.value?.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        block: compactViewport ? 'start' : 'center',
        inline: 'nearest',
    });
    lockAfterScrollSettles();
}

function closeSpotlight() {
    if (!spotlightOpen.value) return;
    spotlightOpen.value = false;
    cancelPendingScrollLock();
    if (scrollLocked) unlockPageScroll();
    else scrollImmediatelyTo(window.scrollY);
    recordScene.value?.focus({ preventScroll: true });
}

function toggleSpotlight() {
    if (spotlightOpen.value) closeSpotlight();
    else openSpotlight();
}

function closeFromHintPointer(event: PointerEvent) {
    if (!spotlightOpen.value) return;
    const rect = closeHintRef.value?.getBoundingClientRect();
    if (!rect || event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) return;

    event.preventDefault();
    event.stopPropagation();
    closeSpotlight();
}

onMounted(() => {
    updateSpotlightGeometry();
    document.addEventListener('pointerdown', closeFromHintPointer, true);
    window.addEventListener('resize', scheduleGeometryUpdate, { passive: true });
    window.addEventListener('scroll', scheduleGeometryUpdate, { passive: true });
});

onUnmounted(() => {
    cancelPendingScrollLock();
    cancelAnimationFrame(geometryFrame);
    document.removeEventListener('pointerdown', closeFromHintPointer, true);
    window.removeEventListener('resize', scheduleGeometryUpdate);
    window.removeEventListener('scroll', scheduleGeometryUpdate);
    if (scrollLocked) unlockPageScroll(false);
});
</script>

<template>
    <article class="music-card" aria-labelledby="music-title">
        <button
            ref="recordScene"
            class="record-scene"
            type="button"
            aria-controls="music-spotlight-window"
            :aria-expanded="spotlightOpen"
            :aria-label="spotlightOpen ? '关闭 replica 聚光窗' : '查看 replica 专辑信息'"
            @click="toggleSpotlight"
        >
            <div
                ref="vinylRef"
                class="vinyl-position"
                aria-hidden="true"
            >
                <div class="vinyl-disc">
                    <div class="vinyl-label">
                        <span>replica</span>
                        <small>VAUNDY · SIDE A</small>
                    </div>
                    <span class="record-spindle"></span>
                </div>
            </div>
            <span ref="coverRef" class="album-cover">
                <WiredImage src="/music/vaundy-replica.jpg" alt="Vaundy《replica》专辑封面" :width="600" :height="600" fill @ready="scheduleGeometryUpdate" />
            </span>
            <span v-if="!spotlightOpen" class="record-hint" aria-hidden="true">Click me</span>
        </button>

        <Teleport to="body">
            <div class="spotlight-portal" :class="{ 'is-open': spotlightOpen }" :aria-hidden="!spotlightOpen" :style="{ '--spotlight-artwork-bottom': `${Math.max(artwork.vinylY + artwork.vinylRadius, artwork.coverY + artwork.coverHeight)}px` }">
                <svg
                    class="spotlight-mask-defs"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    :width="viewport.width"
                    :height="viewport.height"
                    :viewBox="`0 0 ${viewport.width} ${viewport.height}`"
                >
                    <defs>
                        <mask
                            id="spotlight-artwork-cutout"
                            maskUnits="userSpaceOnUse"
                            maskContentUnits="userSpaceOnUse"
                            x="0"
                            y="0"
                            :width="viewport.width"
                            :height="viewport.height"
                        >
                            <rect width="100%" height="100%" fill="white" />
                            <circle :cx="artwork.vinylX" :cy="artwork.vinylY" :r="artwork.vinylRadius" fill="black" />
                            <rect
                                :x="artwork.coverX"
                                :y="artwork.coverY"
                                :width="artwork.coverWidth"
                                :height="artwork.coverHeight"
                                rx="12"
                                fill="black"
                            />
                        </mask>
                    </defs>
                </svg>
                <div class="spotlight-veil"></div>
                <div
                    id="music-spotlight-window"
                    class="spotlight-stack"
                >
                    <span class="spotlight-layer spotlight-layer-back"></span>
                    <span class="spotlight-layer spotlight-layer-front"></span>
                    <div ref="spotlightWindowRef" class="spotlight-window">
                        <span class="spotlight-rays" aria-hidden="true"></span>
                        <div class="spotlight-copy">
                            <p>PERSONAL FAVORITE <span>— 01</span></p>
                            <strong>replica</strong>
                            <span class="spotlight-artist">VAUNDY <i>·</i> ALBUM</span>
                        </div>
                        <span class="spotlight-serial">THE WIRED WORLD <b>/</b> MUSIC ARCHIVE</span>
                    </div>
                </div>
                <blockquote class="spotlight-quote">
                    <cite class="spotlight-speaker">Vaundy <span>ON REPLICA</span></cite>
                    <div class="spotlight-dialogue-body" tabindex="0" aria-label="Vaundy 关于 replica 的引言">
                        <p>我们往往认为原创的东西就有价值，但实际上，即使是原创的东西，也是经过过去的积累而诞生的“复制品”。流行音乐也是通过理解这一点的基础上，从而创造出一些美好而有趣的东西的。换一句话而言“原作就是从复制品的历史中诞生的。”将它称为复制品听起来很廉价，但我希望它有价值。</p>
                    </div>
                    <span class="spotlight-dialogue-arrow" aria-hidden="true"></span>
                </blockquote>
                <button ref="closeHintRef" class="spotlight-hint" type="button" @click.stop="closeSpotlight">Click to close</button>
            </div>
        </Teleport>

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
    grid-template-columns: minmax(17.5rem, 0.9fr) minmax(0, 1.1fr);
    align-items: center;
    gap: clamp(1.5rem, 5vw, 4rem);
    overflow: hidden;
    padding: clamp(1.5rem, 4vw, 3rem);
    border: var(--panel-border-width) solid var(--border);
    border-radius: var(--panel-radius);
    color: var(--text);
    background: linear-gradient(120deg, var(--surface), color-mix(in srgb, var(--accent-soft) 58%, var(--surface)));
    box-shadow: var(--shadow);
    backdrop-filter: blur(0.875rem);
    transition: border-color 220ms ease, box-shadow 220ms ease, transform 220ms ease;

    &::before {
        position: absolute;
        top: -42%;
        right: -8%;
        width: 42%;
        aspect-ratio: 1;
        border: 1.375rem solid color-mix(in srgb, var(--accent) 10%, transparent);
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
    border: 0.1875rem solid #003b9e;
    background: linear-gradient(112deg, #faffff 0 72%, #c6f7ff 72%);
    box-shadow: 0.6875rem 0.6875rem 0 #19d9e9, 1.0625rem 1.0625rem 0 #002578;
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
    outline: 0.1875rem solid var(--accent-strong);
    outline-offset: 0.375rem;
}

:global(html[data-theme="dark"] .music-card) {
    border-color: rgba(255, 255, 255, 0.68);
    background: linear-gradient(120deg, #17171b 0 72%, color-mix(in srgb, var(--accent) 26%, #17171b) 72%);
    box-shadow: 0.75rem 0.75rem 0 #000000, 1.0625rem 1.0625rem 0 color-mix(in srgb, var(--accent) 48%, transparent);
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
    min-height: 21.25rem;
    place-items: center;
    isolation: isolate;
}

.record-hint {
    position: absolute;
    bottom: 0.25rem;
    left: 50%;
    color: var(--accent-strong);
    font-size: .7rem;
    font-weight: 850;
    letter-spacing: .2em;
    line-height: 1;
    transform: translateX(-50%);
    white-space: nowrap;
}

.vinyl-position {
    position: absolute;
    top: 50%;
    left: 58%;
    width: clamp(13.75rem, 27vw, 18.75rem);
    aspect-ratio: 1;
    transform: translate(-50%, -50%);
}

.vinyl-disc {
    position: relative;
    width: 100%;
    height: 100%;
    border: 0.0625rem solid rgba(255, 255, 255, 0.12);
    border-radius: 50%;
    background:
        radial-gradient(circle, transparent 0 15%, rgba(255, 255, 255, 0.04) 15.4% 15.8%, transparent 16.2% 23%, rgba(255, 255, 255, 0.035) 23.4% 23.8%, transparent 24.2% 34%, rgba(255, 255, 255, 0.035) 34.4% 34.8%, transparent 35.2% 46%, rgba(255, 255, 255, 0.035) 46.4% 46.8%, transparent 47.2%),
        repeating-radial-gradient(circle, #282a30 0 0.0625rem, #15171c 0.125rem 0.25rem);
    box-shadow: 0 1.125rem 2.25rem rgba(7, 9, 16, 0.3), inset 0 0 1.375rem rgba(0, 0, 0, 0.5);
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
        margin-top: 0.1875rem;
        font-size: 0.42rem;
        font-weight: 800;
        letter-spacing: 0.08em;
    }
}

.record-spindle {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0.3125rem;
    height: 0.3125rem;
    border: 0.0625rem solid rgba(20, 20, 24, 0.72);
    border-radius: 50%;
    background: #f7ebad;
    transform: translate(-50%, -50%);
}

.album-cover {
    display: block;
    overflow: hidden;
    --ui-image-fit: cover;
    position: absolute;
    z-index: 1;
    top: 50%;
    left: 5%;
    width: clamp(9.25rem, 18vw, 11.875rem);
    aspect-ratio: 1;
    border: 0.3125rem solid rgba(255, 255, 255, 0.92);
    border-radius: 0.5rem;
    object-fit: cover;
    box-shadow: 0 1.125rem 2.375rem rgba(13, 15, 23, 0.3);
    transform: translateY(-50%) rotate(-6deg);
    transition: transform 260ms cubic-bezier(.2, .8, .2, 1), box-shadow 260ms ease;
}

.record-scene:focus-visible .album-cover {
    box-shadow: 0 1.375rem 2.875rem rgba(13, 15, 23, .4);
    transform: translateY(-52%) rotate(-3deg) scale(1.025);
}

.spotlight-mask-defs {
    position: fixed;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    pointer-events: none;
}

.spotlight-portal {
    position: fixed;
    z-index: 1300;
    inset: 0;
    isolation: isolate;
    opacity: 0;
    pointer-events: none;
    transition: opacity 280ms ease, visibility 280ms ease;
    visibility: hidden;
    --spotlight-cutout: url("#spotlight-artwork-cutout");
}

.spotlight-portal.is-open {
    opacity: 1;
    visibility: visible;
}

.spotlight-veil,
.spotlight-stack {
    position: absolute;
    inset: 0;
    -webkit-mask: var(--spotlight-cutout);
    mask: var(--spotlight-cutout);
}

.spotlight-veil {
    background: rgba(5, 8, 18, .4);
    opacity: 0;
    transition: opacity 320ms ease;
}

.spotlight-portal.is-open .spotlight-veil { opacity: 1; }

.spotlight-stack { pointer-events: none; }

.spotlight-layer,
.spotlight-window {
    position: absolute;
    top: clamp(4rem, 7vh, 6.25rem);
    right: clamp(0.75rem, 3vw, 3rem);
    width: 94vw;
    height: 90vh;
    clip-path: polygon(82% 0, 100% 0, 100% 0, 82% 0);
    transition: clip-path 560ms cubic-bezier(.16, 1, .3, 1), transform 560ms cubic-bezier(.16, 1, .3, 1);
}

.spotlight-layer-back {
    z-index: 0;
    background: var(--spotlight-back);
    transform: translate(0.25rem, 0.3125rem) skewY(-.4deg) translate(2.125rem, -1.25rem) scale(.97);
}

.spotlight-layer-front {
    z-index: 1;
    background: var(--spotlight-front);
    transform: translate(0.125rem, 0.1875rem) skewY(-.2deg) translate(2.125rem, -1.25rem) scale(.97);
}

.spotlight-window {
    z-index: 2;
    display: flex;
    align-items: flex-end;
    overflow: hidden;
    padding: clamp(1.75rem, 4vw, 3.25rem) clamp(1.75rem, 5vw, 4.25rem) clamp(2rem, 4vw, 3rem) clamp(3.875rem, 9vw, 7.375rem);
    color: #fff;
    background: var(--spotlight-fill);
    filter: drop-shadow(0 1.125rem 1.375rem rgba(0, 0, 0, .22));
    pointer-events: none;
    transform: translate(2.125rem, -1.25rem) scale(.97);
    transition: clip-path 560ms cubic-bezier(.16, 1, .3, 1), transform 560ms cubic-bezier(.16, 1, .3, 1);
}

.spotlight-portal.is-open .spotlight-layer-back {
    clip-path: polygon(76% 0, 100% 0, 100% 100%, 0 100%);
    transform: translate(0.8125rem, 0.8125rem) skewY(-1deg);
}

.spotlight-portal.is-open .spotlight-layer-front {
    clip-path: polygon(79% 0, 100% 0, 100% 100%, 0 100%);
    transform: translate(0.4375rem, 0.4375rem) skewY(-.5deg);
}

.spotlight-portal.is-open .spotlight-window {
    clip-path: polygon(82% 0, 100% 0, 100% 100%, 0 100%);
    transform: translate(0) scale(1);
}

.spotlight-rays {
    position: absolute;
    inset: -8%;
    opacity: .16;
    background: repeating-conic-gradient(from -28deg at 84% 7%, transparent 0deg 15deg, rgba(255,255,255,.68) 15.5deg 16deg, transparent 16.5deg 31deg);
}

.spotlight-copy {
    position: relative;
    z-index: 1;
    margin-left: auto;
    text-align: right;
    text-shadow: 0.125rem 0.1875rem 0 rgba(0, 0, 0, .2);
}

.spotlight-quote {
    position: absolute;
    z-index: 3;
    left: 43vw;
    right: 8vw;
    bottom: clamp(9.375rem, 22vh, 14.375rem);
    margin: 0;
    padding: 0.75rem;
    color: var(--dialogue-ink);
    text-align: left;
    filter: drop-shadow(0.4375rem 0.5625rem 0 rgba(0, 0, 0, .35));
    opacity: 0;
    transform: translate(1.75rem, 0.875rem) rotate(-1deg) scale(.97);
    transition: opacity 220ms ease, transform 420ms cubic-bezier(.16, 1, .3, 1);
    --dialogue-shape: polygon(6% 7%, 97% 0, 100% 91%, 14% 100%, 6% 83%, 0 72%, 7% 69%);
}

.spotlight-quote::before,
.spotlight-quote::after {
    position: absolute;
    inset: 0;
    clip-path: var(--dialogue-shape);
    background: var(--dialogue-ink);
    content: "";
}

.spotlight-quote::after {
    inset: 0.3125rem;
    background: var(--dialogue-paper);
}

.spotlight-portal.is-open .spotlight-quote {
    opacity: 1;
    transform: translate(0) rotate(-1deg) scale(1);
    transition-delay: 160ms;
}

.spotlight-dialogue-body {
    position: relative;
    z-index: 1;
    padding: clamp(1.875rem, 2.8vw, 2.5rem) clamp(1.875rem, 3vw, 2.625rem) 2.5rem clamp(2.75rem, 5vw, 4.375rem);
    background: transparent;
    pointer-events: auto;
    overscroll-behavior: contain;
    scrollbar-width: thin;
    scrollbar-color: var(--dialogue-ink) var(--dialogue-paper);
}

.spotlight-dialogue-body:focus-visible {
    outline: 0.125rem dashed var(--dialogue-ink);
    outline-offset: -1.125rem;
}

@media (min-width: 1800px) {
    /* The dialogue's angled edges take a percentage of its width. */
    .spotlight-dialogue-body { padding: 2.5rem 8% 3.125rem 16%; }
}

.spotlight-quote p {
    margin: 0;
    font-size: clamp(.88rem, 1.15vw, 1.08rem);
    font-weight: 650;
    letter-spacing: .02em;
    line-height: 1.75;
}

.spotlight-speaker {
    position: absolute;
    z-index: 2;
    top: -1.375rem;
    left: 7%;
    display: flex;
    align-items: baseline;
    gap: 0.75rem;
    padding: 0.5rem 1.375rem;
    border: 0.1875rem solid var(--dialogue-ink);
    color: var(--dialogue-ink);
    background: var(--dialogue-paper);
    font-size: clamp(1rem, 1.6vw, 1.35rem);
    font-style: normal;
    font-weight: 900;
    letter-spacing: -.025em;
    transform: rotate(-7deg) skewX(-9deg);
    box-shadow: 0.3125rem 0.3125rem 0 var(--dialogue-ink);
}

.spotlight-speaker span {
    font-size: .55rem;
    letter-spacing: .12em;
}

.spotlight-dialogue-arrow {
    position: absolute;
    z-index: 2;
    right: -0.75rem;
    bottom: 0.875rem;
    width: 3.875rem;
    height: 2.625rem;
    background: var(--dialogue-ink);
    clip-path: polygon(0 100%, 78% 0, 100% 80%);
    transform: rotate(-8deg);
}

.spotlight-dialogue-arrow::after {
    position: absolute;
    inset: 0.4375rem;
    background: var(--dialogue-paper);
    clip-path: polygon(0 100%, 78% 0, 100% 80%);
    content: "";
}

.spotlight-copy > p { margin-bottom: 0.375rem; font-size: clamp(.57rem, .85vw, .72rem); font-weight: 900; letter-spacing: .18em; }
.spotlight-copy > p span { opacity: .72; }
.spotlight-copy > strong { display: block; font-size: clamp(2.7rem, 6vw, 6rem); font-style: italic; font-weight: 950; letter-spacing: -.09em; line-height: .92; }
.spotlight-artist { display: block; margin-top: 0.6875rem; font-size: clamp(.62rem, .95vw, .8rem); font-weight: 900; letter-spacing: .2em; }
.spotlight-artist i { margin: 0 0.3125rem; font-style: normal; opacity: .68; }
.spotlight-serial { position: absolute; right: clamp(1.5rem, 4vw, 3.375rem); bottom: clamp(0.875rem, 2vw, 1.5rem); color: rgba(255, 255, 255, .76); font-size: .52rem; font-weight: 850; letter-spacing: .14em; }
.spotlight-serial b { margin: 0 0.3125rem; color: #fff; }
.spotlight-hint {
    position: absolute;
    z-index: 3;
    bottom: calc(10vh - clamp(4rem, 7vh, 6.25rem) + clamp(0.875rem, 2vw, 1.5rem));
    left: calc(3vw + clamp(1.5rem, 4vw, 3.375rem));
    padding: 0.3125rem 0;
    border: 0;
    border-bottom: 0.0625rem solid rgba(255, 255, 255, .72);
    color: rgba(255, 255, 255, .94);
    background: transparent;
    font: inherit;
    font-size: .66rem;
    font-weight: 800;
    letter-spacing: .14em;
    line-height: 1.2;
    cursor: pointer;
    pointer-events: auto;
}

.spotlight-hint:focus-visible {
    outline: 0.125rem solid #fff;
    outline-offset: 0.25rem;
}

:global(html[data-theme="light"] .spotlight-portal) {
    --dialogue-paper: #ffffff;
    --dialogue-ink: #111111;
    --spotlight-fill: linear-gradient(125deg, #0750bd 0%, #087cde 68%, #069fcf 100%);
    --spotlight-front: #20dce8;
    --spotlight-back: #003b9e;
}

:global(html[data-theme="dark"] .spotlight-portal) {
    --dialogue-paper: #08090c;
    --dialogue-ink: #ffffff;
    --spotlight-fill: linear-gradient(125deg, #8f080f 0%, #d71925 57%, #fb3038 100%);
    --spotlight-front: #10090b;
    --spotlight-back: #650910;
}

.music-copy {
    max-width: 32.5rem;
}

.eyebrow {
    display: flex;
    align-items: center;
    gap: 0.5625rem;
    margin-bottom: 0.875rem;
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
    margin-top: 0.625rem;
    color: var(--text-muted);
    line-height: 1.7;
}

.music-details {
    display: grid;
    gap: 1.0625rem;
    margin-top: 1.75rem;

    div {
        display: grid;
        gap: 0.3125rem;
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
        margin: 0 0.5rem;
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
    gap: 0.4375rem;
    margin-top: 1.5625rem;
    color: var(--accent-strong);
    font-size: 0.88rem;
    font-weight: 700;
    text-decoration: none;

    span {
        transition: transform 160ms ease;
    }

    &:hover span {
        transform: translate(0.125rem, -0.125rem);
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
        gap: 0.5rem;
    }

    .record-scene {
        width: min(100%, 24.375rem);
        min-height: 19.6875rem;
        margin: 0 auto;
        scroll-margin-top: clamp(4.375rem, 10vh, 5.625rem);
    }

    .vinyl-position {
        width: clamp(13.75rem, 55vw, 17.5rem);
        left: 60%;
    }

    .album-cover {
        left: 8%;
        width: clamp(9.375rem, 38vw, 11.25rem);
    }

    .music-copy {
        max-width: none;
    }

    .spotlight-layer,
    .spotlight-window {
        top: clamp(4.5rem, 9vh, 6rem);
        right: 4vw;
        width: 92vw;
        height: calc(100vh - clamp(4.5rem, 9vh, 6rem) - 1rem);
    }

    .spotlight-window {
        align-items: flex-end;
        padding: 2rem 1.25rem 2.875rem 3.375rem;
    }

    .spotlight-copy > strong { font-size: clamp(3rem, 10vw, 5rem); }
    .spotlight-serial { right: 1.25rem; bottom: 2.625rem; font-size: .46rem; }

    .spotlight-quote {
        --dialogue-top: max(42vh, calc(var(--spotlight-artwork-bottom) + 1.75rem));
        top: var(--dialogue-top);
        left: 5vw;
        right: 5vw;
        bottom: auto;
        max-height: calc(100vh - var(--dialogue-top) - 9.125rem);
        padding: 0.5625rem;
        display: flex;
        transform: translate(1.125rem, 0.75rem) rotate(-1deg);
    }

    .spotlight-dialogue-body {
        min-height: 0;
        width: 100%;
        overflow-y: auto;
        padding: 1.625rem 1.875rem 2.25rem 2.375rem;
    }

    .spotlight-quote p {
        font-size: .82rem;
        line-height: 1.65;
    }

    .spotlight-speaker {
        top: -1.1875rem;
        padding: 0.375rem 0.875rem;
        font-size: 1rem;
    }

    .spotlight-dialogue-arrow {
        right: -0.3125rem;
        bottom: 0.625rem;
        width: 2.875rem;
        height: 2rem;
    }

    .spotlight-hint { left: calc(4vw + 1.125rem); bottom: 1.75rem; }
}

@media (max-width: 520px) {
    .music-card {
        gap: 0;
        padding: 1.25rem;
    }

    .record-scene {
        min-height: 17rem;
    }

    .spotlight-layer,
    .spotlight-window {
        top: clamp(4.375rem, 9vh, 5.625rem);
        right: 4vw;
        width: 92vw;
        height: calc(100vh - clamp(4.375rem, 9vh, 5.625rem) - 0.875rem);
    }

    .spotlight-window { padding: 1.5rem 1.125rem 3.75rem 3rem; }

    .vinyl-position {
        width: min(70vw, 15rem);
        left: 62%;
    }

    .album-cover {
        left: 4%;
        width: min(52vw, 10.3125rem);
    }

    .music-details .band-name {
        font-size: 0.84rem;
    }
}

@media (prefers-reduced-motion: reduce) {
    .vinyl-disc { animation: none; }
    .spotlight-portal,
    .spotlight-veil,
    .spotlight-stack,
    .spotlight-layer,
    .spotlight-window,
    .spotlight-quote,
    .album-cover { transition-duration: .01ms; }
}

@media (hover: hover) and (pointer: fine) {
    .spotlight-layer { pointer-events: none; }

    .record-scene:hover .album-cover { box-shadow: 0 1.375rem 2.875rem rgba(13, 15, 23, .4); transform: translateY(-52%) rotate(-3deg) scale(1.025); }
}
</style>
