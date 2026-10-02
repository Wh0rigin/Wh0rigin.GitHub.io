<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
import { clearImageFailure, imageRetryVersion, markImageFailed } from '../../composables/loadingExperience';

const props = withDefaults(defineProps<{
    src: string;
    alt: string;
    width: number;
    height: number;
    loading?: 'eager' | 'lazy';
    srcset?: string;
    sizes?: string;
    fetchpriority?: 'high' | 'low' | 'auto';
    fill?: boolean;
    compact?: boolean;
    keepPrevious?: boolean;
}>(), { loading: 'lazy', fill: false, compact: false, keepPrevious: false });

const emit = defineEmits<{
    (event: 'ready', src: string): void;
    (event: 'error', src: string): void;
}>();
const imageElement = ref<HTMLImageElement | null>(null);
const state = ref<'loading' | 'ready' | 'error'>('loading');
const lastReadySrc = ref('');
const lastReadyImage = ref('');
const previousSrc = ref('');
const attempt = ref(0);
const recoveryId = Symbol('image');
const hasPrevious = computed(() => props.keepPrevious && !!previousSrc.value && previousSrc.value !== props.src);
let generation = 0;

async function reveal(image = imageElement.value) {
    if (!image || image !== imageElement.value || !image.complete || !image.naturalWidth) return;
    const currentGeneration = generation;
    // A load event can precede decoding. Keep the placeholder until the pixels are ready.
    try { await image.decode(); } catch { /* Some formats can render even when decode() rejects. */ }
    if (currentGeneration !== generation || image !== imageElement.value || !image.complete || !image.naturalWidth) return;
    if (state.value === 'ready' && lastReadySrc.value === props.src) return;
    lastReadySrc.value = props.src;
    lastReadyImage.value = image.currentSrc || props.src;
    state.value = 'ready';
    clearImageFailure(recoveryId);
    emit('ready', lastReadyImage.value);
}

function fail(image: HTMLImageElement) {
    if (image !== imageElement.value) return;
    state.value = 'error';
    markImageFailed(recoveryId);
    emit('error', props.src);
}

function inspectCachedImage() {
    const image = imageElement.value;
    if (!image?.complete || !props.src) return;
    if (image.naturalWidth) void reveal(image);
    else fail(image);
}

watch(() => props.src, () => {
    generation += 1;
    clearImageFailure(recoveryId);
    previousSrc.value = props.keepPrevious ? lastReadyImage.value : '';
    state.value = 'loading';
    void nextTick(inspectCachedImage);
}, { immediate: true, flush: 'sync' });

watch(imageRetryVersion, () => {
    if (state.value !== 'error') return;
    generation += 1;
    clearImageFailure(recoveryId);
    state.value = 'loading';
    attempt.value += 1;
    void nextTick(inspectCachedImage);
});

onMounted(inspectCachedImage);
onUnmounted(() => { generation += 1; clearImageFailure(recoveryId); });
</script>

<template>
    <span
        class="wired-image"
        :class="[`is-${state}`, { 'wired-image--fill': fill, 'wired-image--compact': compact, 'has-previous': hasPrevious }]"
        :style="{ '--wired-image-ratio': `${width} / ${height}` }"
        :aria-busy="state === 'loading' || undefined"
        :role="state !== 'ready' && !hasPrevious && alt ? 'img' : undefined"
        :aria-label="state !== 'ready' && !hasPrevious && alt ? `${alt}（${state === 'error' ? '暂未加载' : '加载中'}）` : undefined"
    >
        <span class="wired-image-placeholder" aria-hidden="true">
            <span class="image-placeholder-cut"></span>
            <span class="image-placeholder-orbit"></span>
            <span class="image-placeholder-index"></span>
            <span class="image-placeholder-stamp">THE WIRED WORLD</span>
            <span class="image-placeholder-signal">
                <span class="image-placeholder-glyph">
                    <svg class="image-symbol-photo" viewBox="0 0 40 40"><path d="M6 8h28v24H6zM6 27l9-9 8 8 5-5 6 6" /><circle cx="26" cy="15" r="2" /></svg>
                    <svg class="image-symbol-tv" viewBox="0 0 40 40"><path d="m12 4 8 7 8-7M5 12h30v23H5zM9 16h19v15H9zM31 18v6" /><circle cx="31" cy="29" r="1" /></svg>
                </span>
                <span class="image-placeholder-caption">{{ state === 'error' ? '图片暂未加载' : 'NOW LOADING' }}</span>
                <span class="image-placeholder-bars"><i></i><i></i><i></i></span>
            </span>
        </span>
        <img v-if="hasPrevious && state !== 'ready'" class="wired-image-previous" :src="previousSrc" :alt="alt" :width="width" :height="height" draggable="false" />
        <img
            v-if="src"
            :key="`${src}:${attempt}`"
            ref="imageElement"
            class="wired-image-content"
            :src="src"
            :alt="alt"
            :width="width"
            :height="height"
            :loading="loading"
            :srcset="srcset"
            :sizes="sizes"
            :fetchpriority="fetchpriority"
            decoding="async"
            draggable="false"
            :aria-hidden="state !== 'ready' || undefined"
            @load="reveal($event.target as HTMLImageElement)"
            @error="fail($event.target as HTMLImageElement)"
        />
    </span>
</template>

<style scoped>
.wired-image { position: relative; display: block; width: 100%; aspect-ratio: var(--wired-image-ratio); isolation: isolate; }
.wired-image--fill { height: 100%; aspect-ratio: auto; }
.wired-image-content, .wired-image-previous { position: absolute; inset: 0; display: block; width: 100%; height: 100%; object-fit: var(--ui-image-fit, contain); }
.wired-image-content { opacity: 0; transition: opacity 420ms var(--ease-out); }
.is-ready .wired-image-content { opacity: 1; }
.has-previous .wired-image-content { transition: none; }
.wired-image-placeholder {
    --image-stage-number: '03';
    --image-stage-bg: linear-gradient(150deg, #31e9ee, #087acc 43%, #003eaa 75%, #00175e);
    --image-stage-cut: #23e8ed;
    --image-stage-copy: #faffff;
    --image-stage-paper: #faffff;
    --image-stage-ink: #002578;
    --image-stage-layer: #22e5ed;
    --image-stage-shadow: #002578;
    position: absolute; inset: 0; container-type: inline-size; display: grid; place-items: center; overflow: hidden;
    border: 1px solid color-mix(in srgb, var(--image-stage-copy) 35%, transparent);
    color: var(--image-stage-copy); background: var(--ui-image-placeholder-bg, var(--image-stage-bg)); opacity: 1; transition: opacity 420ms var(--ease-out);
}
.wired-image-placeholder::after { position: absolute; inset: 0; pointer-events: none; background: linear-gradient(110deg, transparent 30%, #ffffff18 50%, transparent 70%); transform: translateX(-100%); animation: image-signal 2.8s ease-in-out infinite; content: ''; }
.image-placeholder-cut { position: absolute; inset: 49% -18% -25% -20%; background: var(--image-stage-cut); clip-path: polygon(0 24%, 100% 0, 84% 100%, 0 100%); transform: rotate(-16deg); opacity: .45; }
.image-placeholder-orbit { position: absolute; top: -21%; right: -43%; width: 100%; aspect-ratio: 1; border: 2px solid #d6fffc75; border-radius: 50%; box-shadow: 0 0 0 9px #d6fffc20, 0 0 0 25px #d6fffc10; transform: rotate(-10deg) scaleY(.7); }
.image-placeholder-index { position: absolute; right: -6%; bottom: -5%; font: italic 1000 clamp(4rem, 86cqi, 28rem)/.8 var(--font-display); letter-spacing: -.14em; opacity: .18; transform: rotate(-9deg); }
.image-placeholder-index::before { content: var(--image-stage-number); }
.image-placeholder-stamp { position: absolute; top: 10%; left: 7%; max-width: 86%; padding: 3px 5px; color: var(--image-stage-ink); background: var(--image-stage-paper); font: italic 900 clamp(.35rem, 3.5cqi, .64rem)/1.1 var(--font-display); letter-spacing: .1em; transform: rotate(-5deg) skewX(-8deg); box-shadow: 3px 3px 0 var(--image-stage-layer); white-space: nowrap; }
.image-placeholder-signal { position: relative; display: grid; justify-items: center; gap: clamp(10px, 8cqi, 24px); width: 86%; padding-top: 8%; }
.image-placeholder-glyph { position: relative; display: grid; place-items: center; width: 41%; min-width: 34px; max-width: 104px; aspect-ratio: 1.16; color: var(--image-stage-ink); background: var(--image-stage-paper); box-shadow: 4px 5px 0 var(--image-stage-layer), 7px 8px 0 var(--image-stage-shadow); transform: rotate(-8deg) skewX(-5deg); }
.image-placeholder-glyph svg { display: block; width: 66%; height: auto; fill: none; stroke: currentColor; stroke-width: 1.8; transform: skewX(5deg) rotate(8deg); }
.image-placeholder-glyph .image-symbol-tv { display: none; }
.image-placeholder-caption { padding: 4px 7px; color: var(--image-stage-paper); background: var(--image-stage-ink); font: italic 950 clamp(.49rem, 5.8cqi, 1.1rem)/1.2 var(--font-display); letter-spacing: .035em; white-space: nowrap; transform: rotate(-5deg) skewX(-8deg); box-shadow: 3px 3px 0 var(--image-stage-layer); }
.image-placeholder-bars { display: flex; gap: 4px; transform: skewX(-18deg); }
.image-placeholder-bars i { width: clamp(5px, 5cqi, 12px); height: 4px; background: currentColor; animation: image-pulse 1.2s ease-in-out infinite; }
.image-placeholder-bars i:nth-child(2) { animation-delay: 150ms; }.image-placeholder-bars i:nth-child(3) { animation-delay: 300ms; }
.is-ready .wired-image-placeholder, .has-previous .wired-image-placeholder { opacity: 0; visibility: hidden; transition: opacity 420ms var(--ease-out), visibility 0s 420ms; }
.is-ready .wired-image-placeholder::after, .has-previous .wired-image-placeholder::after, .is-error .wired-image-placeholder::after,
.is-ready .image-placeholder-bars i, .has-previous .image-placeholder-bars i, .is-error .image-placeholder-bars i { animation: none; }
.is-error .image-placeholder-bars { opacity: .35; }

:global(html[data-theme="dark"] .wired-image-placeholder) { --image-stage-number: '05'; --image-stage-bg: #0a0a0d; --image-stage-cut: #e5222d; --image-stage-ink: #09090c; --image-stage-paper: #f6f2ec; --image-stage-layer: #e5222d; --image-stage-shadow: #000; }
:global(html[data-theme="dark"] .image-placeholder-cut) { inset: 2% -25% -8% -20%; opacity: 1; clip-path: polygon(16% 0, 100% 17%, 75% 100%, 0 79%); transform: rotate(-14deg); background: radial-gradient(circle, #09090c66 0 1px, transparent 1.4px) 0 0 / 6px 6px, var(--image-stage-cut); }
:global(html[data-theme="dark"] .image-placeholder-orbit) { top: -15%; right: -49%; border-radius: 0; border: 6px solid #f6f2ec; box-shadow: 0 0 0 5px #08080a, 0 0 0 10px #f6f2ec; opacity: .9; transform: rotate(29deg); }
:global(html[data-theme="dark"] .image-placeholder-index) { bottom: -2%; right: -12%; opacity: .82; color: #09090c; -webkit-text-stroke: 1px #f6f2ec; transform: rotate(9deg); }
:global(html[data-theme="dark"] .image-placeholder-stamp) { top: 9%; left: 5%; transform: rotate(-10deg); box-shadow: 3px 3px 0 #09090c; }
:global(html[data-theme="dark"] .image-placeholder-glyph) { clip-path: polygon(6% 0, 100% 7%, 91% 100%, 0 89%); filter: drop-shadow(4px 5px 0 #09090c); transform: rotate(8deg) skewX(-8deg); }
:global(html[data-theme="dark"] .image-placeholder-glyph svg) { transform: rotate(-8deg) skewX(8deg); }
:global(html[data-theme="dark"] .image-placeholder-caption) { color: #09090c; background: #f6f2ec; box-shadow: 4px 4px 0 #09090c; transform: rotate(-8deg); }

:global(html[data-theme="golden"] .wired-image-placeholder) { --image-stage-number: '04'; --image-stage-bg: linear-gradient(140deg, #fff16a, #ffe32d 48%, #ffd21b); --image-stage-copy: #191814; --image-stage-paper: #fffdf2; --image-stage-ink: #191814; --image-stage-layer: #40b968; --image-stage-shadow: #fffdf2; }
:global(html[data-theme="golden"] .image-placeholder-cut) { inset: 53% -25% -17% -22%; background: repeating-linear-gradient(0deg, #40b968 0 8px, #fffdf2 8px 12px, #22cfdf 12px 20px, #fffdf2 20px 24px, #ee9a29 24px 32px, #fffdf2 32px 36px, #e64c78 36px 44px, #fffdf2 44px 48px); opacity: 1; transform: rotate(-24deg); }
:global(html[data-theme="golden"] .image-placeholder-orbit) { border-color: #fffdf2; box-shadow: 0 0 0 9px #ed982135, 0 0 0 22px #fffdf260; }
:global(html[data-theme="golden"] .image-placeholder-index) { opacity: .45; color: transparent; -webkit-text-stroke: 2px #191814; transform: rotate(8deg); }
:global(html[data-theme="golden"] .image-placeholder-glyph) { color: #ffe32d; background: #191814; transform: rotate(-6deg); }
:global(html[data-theme="golden"] .image-placeholder-glyph .image-symbol-photo) { display: none; }
:global(html[data-theme="golden"] .image-placeholder-glyph .image-symbol-tv) { display: block; transform: rotate(6deg); }
:global(html[data-theme="golden"] .image-placeholder-caption) { color: #ffe32d; background: #191814; }

.wired-image--compact .image-placeholder-index, .wired-image--compact .image-placeholder-stamp,
.wired-image--compact .image-placeholder-caption, .wired-image--compact .image-placeholder-bars { display: none; }
.wired-image--compact .image-placeholder-signal { width: 100%; padding: 0; gap: 0; }
.wired-image--compact .image-placeholder-glyph { width: 45%; min-width: 0; max-width: 44px; box-shadow: 2px 2px 0 var(--image-stage-layer); }
.wired-image--compact .image-placeholder-orbit { border-width: 2px; box-shadow: none; }
@keyframes image-signal { to { transform: translateX(100%); } }
@keyframes image-pulse { 50% { opacity: .25; transform: translateX(2px); } }
@media (prefers-reduced-motion: reduce) {
    .wired-image-content, .wired-image-placeholder { transition: none; }
    .wired-image-placeholder::after, .image-placeholder-bars i { animation: none; }
}
</style>
