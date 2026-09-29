<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useModeStore } from '../../stores/mode';

type Phase = 'waiting' | 'moving' | 'arrived' | 'dim' | 'finished';
const modeStore = useModeStore();
const phase = ref<Phase>('waiting');
const today = new Date();
today.setHours(0, 0, 0, 0);
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);
const displayedDate = ref(yesterday);
const day = computed(() => displayedDate.value.getDate());
const monthName = computed(() => displayedDate.value.toLocaleString('en-US', { month: 'long' }).toUpperCase());
const weekdayName = computed(() => displayedDate.value.toLocaleString('en-US', { weekday: 'long' }).toUpperCase());
const highlightedDate = ref<number | null>(yesterday.getTime());
const timelineDays = Array.from({ length: 8 }, (_, index) => {
    const date = new Date(today);
    date.setDate(date.getDate() + index - 4);
    return {
        timestamp: date.getTime(),
        date: date.getDate(),
        weekday: date.toLocaleString('en-US', { weekday: 'short' }).toUpperCase(),
    };
});
let active = true;
const timers: Array<ReturnType<typeof setTimeout>> = [];
let removeLoadListener: (() => void) | undefined;
let previousOverflow = '';

function delay(ms: number) {
    return new Promise<void>((resolve) => timers.push(setTimeout(resolve, ms)));
}

function waitForLoad() {
    if (document.readyState === 'complete') return Promise.resolve();
    return new Promise<void>((resolve) => {
        const onLoad = () => resolve();
        window.addEventListener('load', onLoad, { once: true });
        removeLoadListener = () => window.removeEventListener('load', onLoad);
    });
}

onMounted(async () => {
    previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    await Promise.all([waitForLoad(), delay(1600)]);
    if (!active) return;
    if (modeStore.theme === 'light') {
        highlightedDate.value = null;
        phase.value = 'moving';
        await delay(900);
        if (!active) return;
        displayedDate.value = today;
        highlightedDate.value = today.getTime();
        phase.value = 'arrived';
        await delay(950);
        if (!active) return;
        phase.value = 'dim';
        await delay(1300);
    }
    if (active) {
        phase.value = 'finished';
        await delay(800);
        if (active) document.documentElement.style.overflow = previousOverflow;
    }
});

onUnmounted(() => {
    active = false;
    timers.forEach(clearTimeout);
    removeLoadListener?.();
    document.documentElement.style.overflow = previousOverflow;
});
</script>

<template>
    <div class="loading" :class="[`phase-${phase}`, { 'light-loading': modeStore.theme === 'light', closing: modeStore.theme === 'light' && (phase === 'dim' || phase === 'finished') }]" aria-label="页面加载中">
        <template v-if="modeStore.theme === 'light'">
            <div class="date-stage" aria-hidden="true">
                <div class="date-composition">
                    <div class="blue-band"></div>
                    <svg class="date-line" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <line x1="0" y1="86" x2="100" y2="8" />
                    </svg>
                    <div class="opening-date">
                        <div class="date-year">{{ displayedDate.getFullYear() }} <span>{{ monthName }}</span></div>
                        <Transition name="day-change" mode="out-in">
                            <span :key="displayedDate.getTime()" class="date-number">{{ day }}</span>
                        </Transition>
                        <span class="date-weekday">{{ weekdayName }}</span>
                    </div>
                    <div class="timeline" :class="{ advanced: phase !== 'waiting' }">
                        <div v-for="(item, index) in timelineDays" :key="item.timestamp" class="timeline-day" :class="{ selected: highlightedDate === item.timestamp, past: item.timestamp < (phase === 'moving' ? today.getTime() : displayedDate.getTime()) }" :style="{ '--x': `${10 + index * 11.5}%`, '--y': `${78 - index * 9}%` }">
                            <span class="timeline-label">
                                <span class="timeline-number">{{ item.date }}</span>
                                <span class="timeline-weekday">{{ item.weekday }}</span>
                                <span v-if="phase === 'arrived' && highlightedDate === item.timestamp" class="date-ripple"></span>
                            </span>
                            <span class="timeline-dot"></span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="loading-indicator" role="status">
                <span>LOADING</span>
                <span class="loading-spinner" aria-hidden="true"></span>
            </div>
            <div class="closing-wipe-underlay" aria-hidden="true"></div>
            <div class="closing-wipe" aria-hidden="true"></div>
        </template>
        <div v-else class="persona-loading" role="status" aria-label="Loading the Wired World">
            <div class="persona-topbar">
                <span class="persona-brand"><i aria-hidden="true"></i> THE WIRED WORLD</span>
                <span class="persona-connection"><i aria-hidden="true"></i> SECURE CONNECTION</span>
            </div>
            <div class="persona-red-slice" aria-hidden="true"></div>
            <span class="persona-number" aria-hidden="true">05</span>
            <main class="persona-copy">
                <p class="persona-kicker">NETWORK ACCESS <span>//</span> WH0RIGIN</p>
                <h1 class="persona-title">
                    <span class="persona-title-now">NOW</span>
                    <span class="persona-title-loading">LOADING<span class="persona-ellipsis">...</span></span>
                </h1>
                <p class="persona-message">The Wired World is opening.</p>
                <div class="persona-progress" aria-hidden="true"><span></span></div>
                <div class="persona-progress-labels"><span>ESTABLISHING CONNECTION</span><span>PLEASE WAIT</span></div>
            </main>
            <div class="persona-footer"><span>PHANTOM LINK <b>05</b></span><span>WH0RIGIN // ONLINE</span></div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.loading {
    position: fixed;
    z-index: 10000;
    inset: 0;
    display: grid;
    place-items: center;
    overflow: hidden;
    background: var(--page-bg);
    transition: opacity 800ms ease, visibility 800ms ease;
}
.phase-finished { opacity: 0; visibility: hidden; pointer-events: none; }
.persona-loading {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    min-height: 100svh;
    overflow: hidden;
    isolation: isolate;
    padding: clamp(24px, 4.5vw, 64px) clamp(24px, 6vw, 88px);
    color: #fff;
    background:
        radial-gradient(ellipse at 68% 52%, rgba(229, 34, 45, .16), transparent 43%),
        #09090c;
    text-align: left;

    &::before {
        position: absolute;
        z-index: 1;
        inset: 0;
        pointer-events: none;
        background: repeating-linear-gradient(135deg, transparent 0 28px, rgba(255, 255, 255, .025) 28px 29px);
        content: "";
    }
}
.persona-topbar,
.persona-footer {
    position: relative;
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    font-size: .7rem;
    font-weight: 850;
    letter-spacing: .2em;
}
.persona-brand { display: inline-flex; align-items: center; gap: 11px; }
.persona-brand i {
    width: 12px;
    height: 12px;
    background: #e5222d;
    transform: rotate(45deg);
    box-shadow: 3px 3px 0 #fff;
}
.persona-connection { display: inline-flex; align-items: center; gap: 9px; color: #c9c5c2; }
.persona-connection i {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #ff3842;
    box-shadow: 0 0 12px rgba(255, 56, 66, .9);
    animation: persona-signal 900ms steps(2, end) infinite;
}
.persona-red-slice {
    position: absolute;
    z-index: 0;
    top: -16%;
    right: -15%;
    width: 72%;
    height: 136%;
    background: linear-gradient(132deg, #a60e19 0%, #e5222d 48%, #fa303b 100%);
    clip-path: polygon(39% 0, 100% 0, 65% 100%, 0 100%);
    transform: translateX(115%) skewX(-5deg);
    animation: persona-slice-enter 720ms cubic-bezier(.16, 1, .3, 1) 90ms both;
}
.persona-number {
    position: absolute;
    z-index: 1;
    right: 3%;
    bottom: -.2em;
    color: rgba(255, 255, 255, .16);
    font-family: Impact, "Arial Black", sans-serif;
    font-size: clamp(20rem, 51vw, 60rem);
    font-style: italic;
    font-weight: 1000;
    letter-spacing: -.17em;
    line-height: .8;
    pointer-events: none;
    transform: rotate(-8deg) scale(.88);
    transform-origin: 70% 80%;
    animation: persona-number-enter 600ms cubic-bezier(.16, 1, .3, 1) 180ms both;
}
.persona-copy {
    position: absolute;
    z-index: 2;
    top: 51%;
    left: clamp(28px, 10vw, 144px);
    width: min(660px, 72vw);
    transform: translateY(-48%);
    animation: persona-copy-enter 520ms cubic-bezier(.16, 1, .3, 1) 170ms both;
}
.persona-kicker {
    display: flex;
    align-items: center;
    gap: 10px;
    color: #f5f0eb;
    font-size: .75rem;
    font-weight: 900;
    letter-spacing: .2em;
}
.persona-kicker::before {
    width: 0;
    height: 0;
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
    border-left: 9px solid #ff3842;
    content: "";
}
.persona-kicker span { color: #ff3842; }
.persona-title {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
    margin: 22px 0 18px;
    color: #fff;
    font-family: Impact, "Arial Black", sans-serif;
    font-style: italic;
    font-weight: 1000;
    letter-spacing: -.075em;
    line-height: .82;
    transform: skewX(-5deg);
}
.persona-title-now { margin-left: .15em; font-size: clamp(2rem, 4.8vw, 4rem); letter-spacing: .02em; }
.persona-title-loading {
    position: relative;
    display: inline-block;
    padding: .035em .2em .11em .12em;
    background: #e5222d;
    clip-path: polygon(4% 0, 100% 0, 96% 100%, 0 88%);
    font-size: clamp(4.5rem, 10vw, 8.2rem);
    text-shadow: 5px 5px 0 #09090c;
}
.persona-ellipsis { color: #09090c; }
.persona-message { margin-top: 22px; color: #d4ced0; font-size: clamp(.95rem, 1.4vw, 1.1rem); font-weight: 550; }
.persona-progress {
    width: min(470px, 70vw);
    height: 10px;
    margin-top: 35px;
    padding: 2px;
    border: 1px solid rgba(255, 255, 255, .68);
    background: rgba(0, 0, 0, .38);
    transform: skewX(-18deg);
}
.persona-progress span {
    display: block;
    width: 36%;
    height: 100%;
    background: repeating-linear-gradient(110deg, #e5222d 0 14px, #ff3842 14px 25px);
    box-shadow: 0 0 12px rgba(229, 34, 45, .8);
    animation: persona-progress-run 1.15s cubic-bezier(.55, 0, .22, 1) infinite alternate;
}
.persona-progress-labels {
    display: flex;
    justify-content: space-between;
    gap: 14px;
    width: min(470px, 70vw);
    margin-top: 10px;
    color: #c5bfc1;
    font-size: .62rem;
    font-weight: 850;
    letter-spacing: .16em;
}
.persona-footer { position: absolute; right: clamp(24px, 6vw, 88px); bottom: clamp(24px, 4.5vw, 64px); left: clamp(24px, 6vw, 88px); color: rgba(255, 255, 255, .78); }
.persona-footer b { margin-left: 6px; color: #ff3842; }
.light-loading { display: block; background: #171b2b; color: #fff; }
.light-loading.closing { background: transparent; }
.light-loading.closing .date-stage { animation: clear-scene 1.3s steps(1, end) both; }
.light-loading.closing .loading-indicator { opacity: 0; transition: opacity 160ms ease; }
.closing-wipe-underlay,
.closing-wipe {
    position: absolute;
    top: 0;
    bottom: 0;
    left: -35vw;
    width: 170vw;
    clip-path: polygon(8% 0, 100% 0, 92% 100%, 0 100%);
    opacity: 0;
    pointer-events: none;
    transform: translate3d(-120%, 0, 0) skewX(-9deg);
    will-change: transform;
}
.closing-wipe-underlay {
    z-index: 6;
    background: #16d9e8;
    translate: clamp(10px, 1.5vw, 22px) clamp(10px, 1.5vw, 22px);
}
.closing-wipe {
    z-index: 7;
    background: linear-gradient(110deg, #0346a8 0%, #086ed5 48%, #13c7df 100%);
}
.closing-wipe::after {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 8%;
    width: clamp(5px, .8vw, 12px);
    background: #a6ffff;
    box-shadow: 0 0 28px rgba(122, 255, 255, .8);
    content: '';
}
.light-loading.closing .closing-wipe-underlay,
.light-loading.closing .closing-wipe {
    opacity: 1;
    animation: blue-screen-wipe 1.3s cubic-bezier(.78, .02, .2, 1) both;
}
.date-stage {
    --band-angle: 14deg;
    position: absolute;
    inset: 0;
    overflow: hidden;
    isolation: isolate;
    background: linear-gradient(160deg, #191d2d, #141825);
}
.date-composition {
    position: absolute;
    inset: 0;
    transform: translate(8vw, 6vh);
}
.blue-band {
    position: absolute;
    top: calc(41.5% + clamp(10px, 5vw, 65px));
    left: -10%;
    width: 120%;
    height: clamp(90px, 10vw, 135px);
    background: linear-gradient(90deg, #0750a7, #0876cf 54%, #0450ac);
    transform: rotate(var(--band-angle));
    box-shadow: 0 12px 0 rgba(0, 0, 0, .1);
}
.date-line {
    position: absolute;
    z-index: 2;
    inset: 0;
    width: 100%;
    height: 100%;
    overflow: visible;
    pointer-events: none;
}
.date-line line {
    stroke: rgba(255, 255, 255, .92);
    stroke-width: 2;
    vector-effect: non-scaling-stroke;
    filter: drop-shadow(0 1px 4px rgba(0, 0, 0, .4));
}
.opening-date {
    position: absolute;
    z-index: 3;
    top: 13%;
    left: 20vw;
    display: grid;
    align-content: start;
    width: 28vw;
    min-width: 180px;
    line-height: .8;
    filter: drop-shadow(4px 7px 0 rgba(4, 22, 64, .25));
}
.date-year {
    position: absolute;
    top: 9vw;
    left: -17vw;
    display: flex;
    align-items: end;
    gap: 10px;
    font-size: clamp(1.5rem, 3.5vw, 3rem);
    font-weight: 950;
    letter-spacing: -.06em;
    transform: rotate(var(--band-angle));
    transform-origin: left center;
}
.date-year span { padding-bottom: 4px; font-size: clamp(.6rem, 1vw, .85rem); letter-spacing: .12em; }
.date-number {
    display: block;
    margin-left: -.075em;
    font-size: clamp(9rem, 20vw, 22rem);
    font-weight: 950;
    font-style: italic;
    letter-spacing: -.16em;
    line-height: .85;
}
.date-weekday {
    position: absolute;
    top: 13vw;
    left: -17vw;
    font-size: clamp(.8rem, 1.2vw, 1.1rem);
    font-weight: 800;
    letter-spacing: .27em;
    transform: rotate(var(--band-angle));
    transform-origin: left center;
}
.day-change-enter-active, .day-change-leave-active { transition: opacity 300ms ease, transform 300ms ease; }
.day-change-enter-from { opacity: 0; transform: translateX(70px) skewX(-12deg); }
.day-change-leave-to { opacity: 0; transform: translateX(-70px) skewX(-12deg); }
.timeline {
    position: absolute;
    z-index: 3;
    inset: 0;
    pointer-events: none;
    transition: transform 900ms cubic-bezier(.32, .02, .18, 1);
}
.timeline.advanced {
    transform: translate(-11.5vw, 9vh);
}
.timeline-day {
    position: absolute;
    top: var(--y);
    left: var(--x);
    width: 0;
    height: 0;
    opacity: .88;
    transition: opacity 240ms ease;
}
.timeline-day.selected { opacity: 1; }
.timeline-label {
    position: absolute;
    bottom: -14px;
    left: clamp(-105px, -8vw, -55px);
    display: flex;
    align-items: baseline;
    gap: clamp(3px, .5vw, 9px);
    white-space: nowrap;
    transform: translateX(-50%);
    transition: transform 450ms ease;
    text-shadow: 2px 3px 0 rgba(0, 0, 0, .28);
}
.timeline-day.past .timeline-label { transform: translate(-50%, 10px); }
.timeline-number {
    font-size: clamp(1.45rem, 4vw, 4.4rem);
    font-weight: 950;
    line-height: .85;
}
.timeline-weekday {
    font-size: clamp(.55rem, 1.2vw, 1rem);
    font-weight: 900;
    letter-spacing: .13em;
}
.timeline-dot {
    position: absolute;
    top: clamp(13px, 2vw, 24px);
    left: 0;
    width: clamp(16px, 2.8vw, 35px);
    aspect-ratio: 1;
    border: 3px solid #fff;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, .25);
    transform: translateX(-50%);
    transition: background 260ms ease, box-shadow 260ms ease;
}
.selected .timeline-dot {
    background: #f4dc19;
    box-shadow: 0 0 0 5px #155fc3, 0 0 0 8px rgba(255, 255, 255, .58);
}
.date-ripple,
.date-ripple::before,
.date-ripple::after {
    position: absolute;
    top: 50%;
    left: 30%;
    width: clamp(56px, 9vw, 140px);
    aspect-ratio: 1;
    border: 2px solid rgba(173, 223, 255, .65);
    border-radius: 50%;
    opacity: 0;
    pointer-events: none;
    transform: translate(-50%, -50%);
}
.date-ripple::before,
.date-ripple::after {
    top: 50%;
    left: 50%;
    width: 100%;
    content: '';
}
.date-ripple::before { transform: translate(-50%, -50%) scale(1.35); }
.date-ripple::after { transform: translate(-50%, -50%) scale(1.7); }
.phase-arrived .date-ripple,
.phase-arrived .date-ripple::before,
.phase-arrived .date-ripple::after {
    animation: ripple 750ms ease-out both;
}
.phase-arrived .date-ripple::before { animation-delay: 90ms; }
.phase-arrived .date-ripple::after { animation-delay: 180ms; }
.loading-indicator {
    position: absolute;
    z-index: 4;
    right: clamp(24px, 4vw, 72px);
    bottom: clamp(24px, 5vh, 60px);
    display: flex;
    align-items: center;
    gap: 14px;
    font-size: clamp(.75rem, 1vw, .95rem);
    font-weight: 850;
    letter-spacing: .2em;
}
.loading-spinner {
    width: 25px;
    aspect-ratio: 1;
    border: 3px solid rgba(255, 255, 255, .3);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin .8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
@keyframes persona-signal { 50% { opacity: .35; } }
@keyframes persona-slice-enter { to { transform: translateX(0) skewX(-5deg); } }
@keyframes persona-number-enter { to { transform: rotate(-8deg) scale(1); } }
@keyframes persona-copy-enter { from { transform: translate(-34px, -48%) skewX(-3deg); } to { transform: translate(0, -48%) skewX(0); } }
@keyframes persona-progress-run { to { transform: translateX(165%); } }
@keyframes ripple {
    from { transform: translate(-50%, -50%) scale(.65); opacity: .85; }
    to { transform: translate(-50%, -50%) scale(1.55); opacity: 0; }
}
@keyframes clear-scene {
    0%, 49% { opacity: 1; }
    50%, 100% { opacity: 0; }
}
@keyframes blue-screen-wipe {
    0% { transform: translate3d(-120%, 0, 0) skewX(-9deg); }
    42% { transform: translate3d(-18%, 0, 0) skewX(-9deg); }
    48%, 53% { transform: translate3d(0, 0, 0) skewX(-9deg); }
    100% { transform: translate3d(120%, 0, 0) skewX(-9deg); }
}
@media (min-width: 701px) and (max-width: 900px) {
    .opening-date { top: 26%; }
}
@media (max-width: 700px) {
    .date-stage { --band-angle: 22deg; }
    .date-composition { transform: translate(4vw, 3vh); }
    .blue-band { top: calc(39% + 75px); left: -32%; width: 165%; height: 110px; }
    .opening-date { top: 18%; left: 34vw; }
    .date-year { top: 126px; left: -32vw; }
    .date-weekday { top: 166px; left: -32vw; }
    .date-number { font-size: clamp(6rem, 31vw, 9rem); }
    .timeline-number { font-size: clamp(1.2rem, 6vw, 2rem); }
    .timeline-weekday { font-size: .55rem; }
    .timeline-label { bottom: 0; left: -35px; }
    .timeline-dot { top: 13px; border-width: 2px; }
    .date-ripple { width: 70px; }
}
@media (max-width: 600px) {
    .persona-loading { padding: 25px 22px; }
    .persona-topbar { font-size: .56rem; letter-spacing: .14em; }
    .persona-brand { gap: 8px; }
    .persona-brand i { width: 9px; height: 9px; }
    .persona-connection { gap: 6px; }
    .persona-red-slice { top: -8%; right: -47%; width: 140%; height: 116%; opacity: .82; }
    .persona-number { right: -8%; bottom: -.08em; font-size: clamp(18rem, 88vw, 34rem); }
    .persona-copy { top: 48%; left: 22px; width: calc(100% - 44px); }
    .persona-kicker { gap: 7px; font-size: .61rem; letter-spacing: .13em; }
    .persona-title { gap: 5px; margin: 21px 0 15px; }
    .persona-title-now { font-size: clamp(1.75rem, 8vw, 2.6rem); }
    .persona-title-loading { font-size: clamp(3.5rem, 14vw, 5.8rem); }
    .persona-message { margin-top: 18px; font-size: .92rem; }
    .persona-progress { width: 100%; margin-top: 28px; }
    .persona-progress-labels { width: 100%; font-size: .52rem; letter-spacing: .1em; }
    .persona-footer { right: 22px; bottom: 25px; left: 22px; font-size: .52rem; letter-spacing: .12em; }
}
@media (prefers-reduced-motion: reduce) {
    .loading, .day-change-enter-active, .day-change-leave-active,
    .timeline, .timeline-day, .timeline-dot, .timeline-label { transition-duration: .01ms; }
    .loading-spinner, .persona-red-slice, .persona-number, .persona-copy,
    .persona-progress span, .persona-connection i,
    .light-loading.closing .date-stage, .light-loading.closing .closing-wipe,
    .phase-arrived .date-ripple, .phase-arrived .date-ripple::before,
    .phase-arrived .date-ripple::after { animation: none; }
    .light-loading.closing .date-stage { opacity: 0; animation: none; }
    .light-loading.closing .closing-wipe-underlay,
    .light-loading.closing .closing-wipe { display: none; }
}
</style>
