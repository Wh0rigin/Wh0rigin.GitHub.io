<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { useModeStore } from '../../stores/mode';
import FlipTextCarousel from './FlipTextCarousel.vue';

type Phase = 'waiting' | 'next-day' | 'dim' | 'finished';
const modeStore = useModeStore();
const phase = ref<Phase>('waiting');
const day = ref(13);
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
        day.value = 14;
        phase.value = 'next-day';
        await delay(700);
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
                <div class="date-line"></div>
                <div class="opening-date">
                    <div class="date-year">2002 <span>NOVEMBER</span></div>
                    <Transition name="day-change" mode="out-in">
                        <span :key="day" class="date-number">{{ day }}</span>
                    </Transition>
                    <span class="date-weekday">{{ day === 13 ? 'WEDNESDAY' : 'THURSDAY' }}</span>
                </div>
                <div class="timeline">
                    <div v-for="date in [11, 12, 13, 14, 15, 16, 17]" :key="date" class="timeline-day" :class="{ selected: day === date }">
                        <span class="timeline-number">{{ date }}</span>
                        <span class="timeline-dot"></span>
                    </div>
                </div>
                <div class="orbit orbit-one"></div>
                <div class="orbit orbit-two"></div>
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
    top: 30%;
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
    top: 56%;
    left: -4%;
    width: 112%;
    height: 2px;
    background: rgba(255, 255, 255, .9);
    transform: rotate(-27deg);
    box-shadow: 0 1px 8px rgba(0, 0, 0, .25);
}
.opening-date {
    position: absolute;
    z-index: 3;
    top: 11%;
    left: clamp(32px, 8vw, 150px);
    display: grid;
    align-content: start;
    width: 28vw;
    min-width: 180px;
    line-height: .8;
    filter: drop-shadow(4px 7px 0 rgba(4, 22, 64, .25));
}
.date-year {
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
    font-size: clamp(9rem, 32vw, 31rem);
    font-weight: 950;
    font-style: italic;
    letter-spacing: -.16em;
    line-height: .85;
}
.date-weekday {
    margin: 16px 0 0 8px;
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
    top: 18%;
    right: 4%;
    display: flex;
    align-items: center;
    gap: clamp(16px, 3.4vw, 60px);
    transform: rotate(-27deg);
    transform-origin: right center;
}
.timeline-day {
    display: grid;
    justify-items: center;
    gap: 11px;
    min-width: clamp(25px, 3vw, 44px);
    opacity: .8;
    transition: opacity 450ms ease, transform 450ms ease;
}
.timeline-day.selected { opacity: 1; transform: scale(1.15); }
.timeline-number { font-size: clamp(1rem, 2.8vw, 2.5rem); font-weight: 950; line-height: 1; }
.timeline-dot {
    width: clamp(15px, 2.2vw, 30px);
    aspect-ratio: 1;
    border: 3px solid white;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, .28);
    transition: background 450ms ease, box-shadow 450ms ease;
}
.selected .timeline-dot {
    background: #f4dc19;
    box-shadow: 0 0 0 5px #155fc3, 0 0 0 8px rgba(255, 255, 255, .58);
}
.orbit {
    position: absolute;
    z-index: 2;
    width: 90px;
    aspect-ratio: 1;
    border: 3px solid rgba(171, 225, 255, .65);
    border-radius: 50%;
    pointer-events: none;
}
.orbit-one { top: 51%; left: 55%; animation: orbit-pulse 2s ease-in-out infinite alternate; }
.orbit-two { top: 48%; left: 53.5%; width: 130px; border-color: rgba(171, 225, 255, .3); }
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
@keyframes orbit-pulse { to { transform: scale(1.2); opacity: .4; } }
@media (max-width: 700px) {
    .blue-band { top: 39%; left: -32%; width: 165%; height: 155px; transform: rotate(22deg); }
    .opening-date { top: 25%; left: 8%; }
    .date-number { font-size: clamp(9rem, 43vw, 17rem); }
    .date-line { top: 64%; transform: rotate(-35deg); }
    .timeline {
        top: 18%;
        right: 5%;
        gap: 14px;
        transform: rotate(-25deg) scale(.85);
    }
    .timeline-day:first-child,
    .timeline-day:nth-last-child(-n + 2) { display: none; }
    .orbit-one { top: 52%; left: 66%; }
    .orbit-two { top: 50%; left: 64%; }
}
@media (prefers-reduced-motion: reduce) {
    .loading, .light-loading::after, .day-change-enter-active, .day-change-leave-active,
    .timeline-day, .timeline-dot { transition-duration: .01ms; }
    .loading-spinner, .orbit-one, .classic-loading > p { animation: none; }
}
</style>
