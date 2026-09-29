<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { useModeStore } from '../../stores/mode';
import FlipTextCarousel from './FlipTextCarousel.vue';

type Phase = 'waiting' | 'moving' | 'arrived' | 'dim' | 'finished';
const modeStore = useModeStore();
const phase = ref<Phase>('waiting');
const day = ref(13);
const highlightedDay = ref<number | null>(13);
const timelineDays = [
    { date: 10, weekday: 'SUN' },
    { date: 11, weekday: 'MON' },
    { date: 12, weekday: 'TUE' },
    { date: 13, weekday: 'WED' },
    { date: 14, weekday: 'THU' },
    { date: 15, weekday: 'FRI' },
    { date: 16, weekday: 'SAT' },
    { date: 17, weekday: 'SUN' },
];
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
        highlightedDay.value = null;
        phase.value = 'moving';
        await delay(900);
        if (!active) return;
        day.value = 14;
        highlightedDay.value = 14;
        phase.value = 'arrived';
        await delay(950);
        if (!active) return;
        phase.value = 'dim';
        await delay(650);
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
    <div class="loading" :class="[`phase-${phase}`, { 'light-loading': modeStore.theme === 'light' }]" aria-label="页面加载中">
        <template v-if="modeStore.theme === 'light'">
            <div class="date-stage" aria-hidden="true">
                <div class="blue-band"></div>
                <svg class="date-line" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <line x1="0" y1="86" x2="100" y2="8" />
                </svg>
                <div class="opening-date">
                    <div class="date-year">2002 <span>NOVEMBER</span></div>
                    <Transition name="day-change" mode="out-in">
                        <span :key="day" class="date-number">{{ day }}</span>
                    </Transition>
                    <span class="date-weekday">{{ day === 13 ? 'WEDNESDAY' : 'THURSDAY' }}</span>
                </div>
                <div class="timeline" :class="{ advanced: phase !== 'waiting' }">
                    <div v-for="(item, index) in timelineDays" :key="item.date" class="timeline-day" :class="{ selected: highlightedDay === item.date }" :style="{ '--x': `${10 + index * 11.5}%`, '--y': `${78 - index * 9}%` }">
                        <span class="timeline-label">
                            <span class="timeline-number">{{ item.date }}</span>
                            <span class="timeline-weekday">{{ item.weekday }}</span>
                            <span v-if="phase === 'arrived' && highlightedDay === item.date" class="date-ripple"></span>
                        </span>
                        <span class="timeline-dot"></span>
                    </div>
                </div>
            </div>
            <div class="loading-indicator" role="status">
                <span>LOADING</span>
                <span class="loading-spinner" aria-hidden="true"></span>
            </div>
        </template>
        <div v-else class="classic-loading">
            <p>LOADING...</p>
            <FlipTextCarousel />
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
.classic-loading { display: grid; gap: 14px; justify-items: center; padding: 24px; text-align: center; }
.classic-loading > p {
    color: var(--text);
    font-size: clamp(2rem, 6vw, 4rem);
    font-weight: 900;
    letter-spacing: .22em;
    animation: pulse 1.5s ease-in-out infinite alternate;
}
.light-loading { display: block; background: #171b2b; color: #fff; }
.light-loading::after {
    position: absolute;
    z-index: 5;
    inset: 0;
    background: #080c19;
    opacity: 0;
    pointer-events: none;
    transition: opacity 650ms ease-in;
    content: '';
}
.light-loading.phase-dim::after,
.light-loading.phase-finished::after { opacity: 1; }
.date-stage {
    position: absolute;
    inset: 0;
    overflow: hidden;
    isolation: isolate;
    background: linear-gradient(160deg, #191d2d, #141825);
}
.blue-band {
    position: absolute;
    top: 41.5%;
    left: -10%;
    width: 120%;
    height: clamp(115px, 20vw, 255px);
    background: linear-gradient(90deg, #0750a7, #0876cf 54%, #0450ac);
    transform: rotate(14deg);
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
    text-shadow: 2px 3px 0 rgba(0, 0, 0, .28);
}
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
@keyframes pulse { to { opacity: .45; } }
@keyframes ripple {
    from { transform: translate(-50%, -50%) scale(.65); opacity: .85; }
    to { transform: translate(-50%, -50%) scale(1.55); opacity: 0; }
}
@media (max-width: 700px) {
    .blue-band { top: calc(39% + 20px); left: -32%; width: 165%; height: 220px; transform: rotate(22deg); }
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
@media (prefers-reduced-motion: reduce) {
    .loading, .light-loading::after, .day-change-enter-active, .day-change-leave-active,
    .timeline, .timeline-day, .timeline-dot { transition-duration: .01ms; }
    .loading-spinner, .classic-loading > p,
    .phase-arrived .date-ripple, .phase-arrived .date-ripple::before,
    .phase-arrived .date-ripple::after { animation: none; }
}
</style>
