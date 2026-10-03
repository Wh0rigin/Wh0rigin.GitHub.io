<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, useAttrs, watch } from 'vue';
import { clearImageFailure, imageRetryVersion, markImageFailed, openingLoad, settleImageLoading, startImageLoading } from '../../composables/loadingExperience';

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
const wrapperElement = ref<HTMLElement | null>(null);
const enclosingAction = ref<HTMLElement | null>(null);
const state = ref<'loading' | 'ready' | 'error'>('loading');
const retryInFlight = ref(false);
const attrs = useAttrs();
const isDecorative = computed(() => attrs['aria-hidden'] === true || attrs['aria-hidden'] === 'true');
const blocksImageAction = computed(() => state.value === 'error' || retryInFlight.value);
const standaloneRetry = computed(() => blocksImageAction.value && !enclosingAction.value && !isDecorative.value);
const loadingLabel = computed(() => `${props.alt || '图片'}（${state.value === 'error' ? '加载失败，点击重试' : retryInFlight.value ? '正在重试' : '加载中'}）`);
const lastReadySrc = ref('');
const lastReadyImage = ref('');
const previousSrc = ref('');
const attempt = ref(0);
const retrySource = ref('');
const recoveryId = Symbol('image');
const effectiveLoading = computed(() => openingLoad.active && openingLoad.waitForImages ? 'eager' : props.loading);
const hasPrevious = computed(() => props.keepPrevious && !!previousSrc.value && previousSrc.value !== props.src);
let generation = 0;
let previousActionDescription: string | null = null;
let appliedActionDescription: string | undefined;

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
    retryInFlight.value = false;
    clearImageFailure(recoveryId);
    settleImageLoading(recoveryId);
    emit('ready', lastReadyImage.value);
}

function fail(image: HTMLImageElement) {
    if (image !== imageElement.value) return;
    state.value = 'error';
    retryInFlight.value = false;
    markImageFailed(recoveryId);
    settleImageLoading(recoveryId);
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
    if (props.src) startImageLoading(recoveryId);
    else settleImageLoading(recoveryId);
    previousSrc.value = props.keepPrevious ? lastReadyImage.value : '';
    state.value = 'loading';
    retryInFlight.value = false;
    retrySource.value = '';
    void nextTick(inspectCachedImage);
}, { immediate: true, flush: 'sync' });

function retryImage() {
    if (state.value !== 'error') return;
    // Request the failed responsive variant again, bypassing cached broken bytes.
    // Keep external URLs intact because they can contain signatures.
    const source = imageElement.value?.currentSrc || props.src;
    try {
        const url = new URL(source, document.baseURI);
        if (url.origin === location.origin && /^https?:$/.test(url.protocol)) {
            url.searchParams.set('_wired_retry', `${Date.now()}-${attempt.value + 1}`);
            retrySource.value = url.href;
        }
    } catch { /* Let the browser handle unsupported or malformed URLs. */ }
    generation += 1;
    clearImageFailure(recoveryId);
    startImageLoading(recoveryId);
    state.value = 'loading';
    retryInFlight.value = true;
    attempt.value += 1;
    void nextTick(inspectCachedImage);
}
watch(imageRetryVersion, retryImage);

function stopImageAction(event: Event) {
    if (!blocksImageAction.value) return;
    event.preventDefault();
    event.stopImmediatePropagation();
}
function retryFromClick(event: MouseEvent) {
    if (!blocksImageAction.value) return;
    stopImageAction(event);
    retryImage();
}
function retryFromKeyboard(event: KeyboardEvent) {
    if (!blocksImageAction.value || !['Enter', ' '].includes(event.key)) return;
    stopImageAction(event);
    retryImage();
}
function interceptEnclosingClick(event: MouseEvent) {
    if (event.target instanceof Node && wrapperElement.value?.contains(event.target)) retryFromClick(event);
}
function interceptEnclosingKey(event: KeyboardEvent) {
    if (event.target === enclosingAction.value) retryFromKeyboard(event);
}
function restoreActionDescription() {
    const action = enclosingAction.value;
    if (!action || !appliedActionDescription) return;
    if (action.getAttribute('aria-description') === appliedActionDescription) {
        if (previousActionDescription === null) action.removeAttribute('aria-description');
        else action.setAttribute('aria-description', previousActionDescription);
    }
    appliedActionDescription = undefined;
}
function updateActionDescription() {
    const action = enclosingAction.value;
    if (!action) return;
    if (!blocksImageAction.value) { restoreActionDescription(); return; }
    if (!appliedActionDescription) previousActionDescription = action.getAttribute('aria-description');
    appliedActionDescription = state.value === 'error'
        ? `${props.alt || '图片'}加载失败，按 Enter 或空格重试图片。`
        : '图片正在重试，请稍候。';
    action.setAttribute('aria-description', appliedActionDescription);
}
watch([state, retryInFlight], updateActionDescription, { flush: 'post' });

onMounted(() => {
    // Reuse a surrounding link/button for keyboard input, without nesting buttons.
    enclosingAction.value = wrapperElement.value?.parentElement?.closest<HTMLElement>('a[href], button, [role="button"]') ?? null;
    enclosingAction.value?.addEventListener('click', interceptEnclosingClick, true);
    enclosingAction.value?.addEventListener('keydown', interceptEnclosingKey, true);
    updateActionDescription();
    inspectCachedImage();
});
onUnmounted(() => {
    generation += 1;
    clearImageFailure(recoveryId);
    settleImageLoading(recoveryId);
    restoreActionDescription();
    enclosingAction.value?.removeEventListener('click', interceptEnclosingClick, true);
    enclosingAction.value?.removeEventListener('keydown', interceptEnclosingKey, true);
});
</script>

<template>
    <span
        ref="wrapperElement"
        class="wired-image"
        :class="[`is-${state}`, { 'wired-image--fill': fill, 'wired-image--compact': compact, 'has-previous': hasPrevious }]"
        :style="{ '--wired-image-ratio': `${width} / ${height}` }"
        :aria-busy="state === 'loading' || undefined"
        :role="standaloneRetry ? 'button' : state !== 'ready' && !hasPrevious && alt ? 'img' : undefined"
        :tabindex="standaloneRetry ? 0 : undefined"
        :aria-disabled="standaloneRetry && retryInFlight || undefined"
        :aria-label="blocksImageAction || state !== 'ready' && !hasPrevious && alt ? loadingLabel : undefined"
        :title="state === 'error' ? '点击重试这张图片' : retryInFlight ? '正在重试这张图片' : undefined"
        @click.capture="retryFromClick"
        @keydown.capture="retryFromKeyboard"
        @mousedown.capture="stopImageAction"
        @mouseup.capture="stopImageAction"
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
                    <svg v-if="state === 'error'" class="image-symbol-retry" viewBox="0 0 40 40"><path d="M30 14a12 12 0 1 0 2 13M30 6v9H21" /></svg>
                </span>
                <span class="image-placeholder-caption">{{ state === 'error' ? '点击重试' : 'NOW LOADING' }}</span>
                <span class="image-placeholder-bars"><i></i><i></i><i></i></span>
            </span>
        </span>
        <img v-if="hasPrevious && state !== 'ready'" class="wired-image-previous" :src="previousSrc" :alt="alt" :width="width" :height="height" draggable="false" />
        <img
            v-if="src"
            :key="`${src}:${attempt}`"
            ref="imageElement"
            class="wired-image-content"
            :src="retrySource || src"
            :alt="alt"
            :width="width"
            :height="height"
            :loading="effectiveLoading"
            :srcset="retrySource ? undefined : srcset"
            :sizes="sizes"
            :fetchpriority="fetchpriority"
            decoding="async"
            draggable="false"
            :aria-hidden="state !== 'ready' || undefined"
            @load="reveal($event.target as HTMLImageElement)"
            @error="fail($event.target as HTMLImageElement)"
        />
        <span v-if="hasPrevious && state === 'error'" class="image-retry-badge" aria-hidden="true">↻ 点击重试</span>
    </span>
</template>

<style scoped>
.wired-image { position: relative; display: block; width: 100%; aspect-ratio: var(--wired-image-ratio); isolation: isolate; }
.wired-image--fill { height: 100%; aspect-ratio: auto; }
.wired-image.is-error { cursor: pointer; pointer-events: auto; }
.wired-image[role="button"]:focus-visible { outline: 0.1875rem solid var(--accent-strong); outline-offset: 0.3125rem; }
.image-retry-badge { position: absolute; z-index: 2; right: 0.5rem; bottom: 0.5rem; padding: 0.3125rem 0.5625rem; color: var(--text); background: var(--surface); border: 0.0625rem solid var(--border); box-shadow: 0.1875rem 0.1875rem 0 var(--accent); font-size: .7rem; font-weight: 750; }
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
    border: 0.0625rem solid color-mix(in srgb, var(--image-stage-copy) 35%, transparent);
    color: var(--image-stage-copy); background: var(--ui-image-placeholder-bg, var(--image-stage-bg)); opacity: 1; transition: opacity 420ms var(--ease-out);
}
.wired-image-placeholder::after { position: absolute; inset: 0; pointer-events: none; background: linear-gradient(110deg, transparent 30%, #ffffff18 50%, transparent 70%); transform: translateX(-100%); animation: image-signal 2.8s ease-in-out infinite; content: ''; }
.image-placeholder-cut { position: absolute; inset: 49% -18% -25% -20%; background: var(--image-stage-cut); clip-path: polygon(0 24%, 100% 0, 84% 100%, 0 100%); transform: rotate(-16deg); opacity: .45; }
.image-placeholder-orbit { position: absolute; top: -21%; right: -43%; width: 100%; aspect-ratio: 1; border: 0.125rem solid #d6fffc75; border-radius: 50%; box-shadow: 0 0 0 0.5625rem #d6fffc20, 0 0 0 1.5625rem #d6fffc10; transform: rotate(-10deg) scaleY(.7); }
.image-placeholder-index { position: absolute; right: -6%; bottom: -5%; font: italic 1000 clamp(4rem, 86cqi, 28rem)/.8 var(--font-display); letter-spacing: -.14em; opacity: .18; transform: rotate(-9deg); }
.image-placeholder-index::before { content: var(--image-stage-number); }
.image-placeholder-stamp { position: absolute; top: 10%; left: 7%; max-width: 86%; padding: 0.1875rem 0.3125rem; color: var(--image-stage-ink); background: var(--image-stage-paper); font: italic 900 clamp(.35rem, 3.5cqi, .64rem)/1.1 var(--font-display); letter-spacing: .1em; transform: rotate(-5deg) skewX(-8deg); box-shadow: 0.1875rem 0.1875rem 0 var(--image-stage-layer); white-space: nowrap; }
.image-placeholder-signal { position: relative; display: grid; justify-items: center; gap: clamp(0.625rem, 8cqi, 1.5rem); width: 86%; padding-top: 8%; }
.image-placeholder-glyph { position: relative; display: grid; place-items: center; width: 41%; min-width: 2.125rem; max-width: 6.5rem; aspect-ratio: 1.16; color: var(--image-stage-ink); background: var(--image-stage-paper); box-shadow: 0.25rem 0.3125rem 0 var(--image-stage-layer), 0.4375rem 0.5rem 0 var(--image-stage-shadow); transform: rotate(-8deg) skewX(-5deg); }
.image-placeholder-glyph svg { display: block; width: 66%; height: auto; fill: none; stroke: currentColor; stroke-width: 1.8; transform: skewX(5deg) rotate(8deg); }
.image-placeholder-glyph .image-symbol-tv { display: none; }
.wired-image.is-error .image-placeholder-glyph .image-symbol-photo,
.wired-image.is-error .image-placeholder-glyph .image-symbol-tv { display: none; }
.wired-image.is-error .image-placeholder-glyph .image-symbol-retry { display: block; }
.image-placeholder-caption { padding: 0.25rem 0.4375rem; color: var(--image-stage-paper); background: var(--image-stage-ink); font: italic 950 clamp(.49rem, 5.8cqi, 1.1rem)/1.2 var(--font-display); letter-spacing: .035em; white-space: nowrap; transform: rotate(-5deg) skewX(-8deg); box-shadow: 0.1875rem 0.1875rem 0 var(--image-stage-layer); }
.image-placeholder-bars { display: flex; gap: 0.25rem; transform: skewX(-18deg); }
.image-placeholder-bars i { width: clamp(0.3125rem, 5cqi, 0.75rem); height: 0.25rem; background: currentColor; animation: image-pulse 1.2s ease-in-out infinite; }
.image-placeholder-bars i:nth-child(2) { animation-delay: 150ms; }.image-placeholder-bars i:nth-child(3) { animation-delay: 300ms; }
.is-ready .wired-image-placeholder, .has-previous .wired-image-placeholder { opacity: 0; visibility: hidden; transition: opacity 420ms var(--ease-out), visibility 0s 420ms; }
.is-ready .wired-image-placeholder::after, .has-previous .wired-image-placeholder::after, .is-error .wired-image-placeholder::after,
.is-ready .image-placeholder-bars i, .has-previous .image-placeholder-bars i, .is-error .image-placeholder-bars i { animation: none; }
.is-error .image-placeholder-bars { opacity: .35; }

:global(html[data-theme="dark"] .wired-image-placeholder) { --image-stage-number: '05'; --image-stage-bg: #0a0a0d; --image-stage-cut: #e5222d; --image-stage-ink: #09090c; --image-stage-paper: #f6f2ec; --image-stage-layer: #e5222d; --image-stage-shadow: #000; }
:global(html[data-theme="dark"] .image-placeholder-cut) { inset: 2% -25% -8% -20%; opacity: 1; clip-path: polygon(16% 0, 100% 17%, 75% 100%, 0 79%); transform: rotate(-14deg); background: radial-gradient(circle, #09090c66 0 0.0625rem, transparent 0.0875rem) 0 0 / 0.375rem 0.375rem, var(--image-stage-cut); }
:global(html[data-theme="dark"] .image-placeholder-orbit) { top: -15%; right: -49%; border-radius: 0; border: 0.375rem solid #f6f2ec; box-shadow: 0 0 0 0.3125rem #08080a, 0 0 0 0.625rem #f6f2ec; opacity: .9; transform: rotate(29deg); }
:global(html[data-theme="dark"] .image-placeholder-index) { bottom: -2%; right: -12%; opacity: .82; color: #09090c; -webkit-text-stroke: 0.0625rem #f6f2ec; transform: rotate(9deg); }
:global(html[data-theme="dark"] .image-placeholder-stamp) { top: 9%; left: 5%; transform: rotate(-10deg); box-shadow: 0.1875rem 0.1875rem 0 #09090c; }
:global(html[data-theme="dark"] .image-placeholder-glyph) { clip-path: polygon(6% 0, 100% 7%, 91% 100%, 0 89%); filter: drop-shadow(0.25rem 0.3125rem 0 #09090c); transform: rotate(8deg) skewX(-8deg); }
:global(html[data-theme="dark"] .image-placeholder-glyph svg) { transform: rotate(-8deg) skewX(8deg); }
:global(html[data-theme="dark"] .image-placeholder-caption) { color: #09090c; background: #f6f2ec; box-shadow: 0.25rem 0.25rem 0 #09090c; transform: rotate(-8deg); }

:global(html[data-theme="golden"] .wired-image-placeholder) { --image-stage-number: '04'; --image-stage-bg: linear-gradient(140deg, #fff16a, #ffe32d 48%, #ffd21b); --image-stage-copy: #191814; --image-stage-paper: #fffdf2; --image-stage-ink: #191814; --image-stage-layer: #40b968; --image-stage-shadow: #fffdf2; }
:global(html[data-theme="golden"] .image-placeholder-cut) { inset: 53% -25% -17% -22%; background: repeating-linear-gradient(0deg, #40b968 0 0.5rem, #fffdf2 0.5rem 0.75rem, #22cfdf 0.75rem 1.25rem, #fffdf2 1.25rem 1.5rem, #ee9a29 1.5rem 2rem, #fffdf2 2rem 2.25rem, #e64c78 2.25rem 2.75rem, #fffdf2 2.75rem 3rem); opacity: 1; transform: rotate(-24deg); }
:global(html[data-theme="golden"] .image-placeholder-orbit) { border-color: #fffdf2; box-shadow: 0 0 0 0.5625rem #ed982135, 0 0 0 1.375rem #fffdf260; }
:global(html[data-theme="golden"] .image-placeholder-index) { opacity: .45; color: transparent; -webkit-text-stroke: 0.125rem #191814; transform: rotate(8deg); }
:global(html[data-theme="golden"] .image-placeholder-glyph) { color: #ffe32d; background: #191814; transform: rotate(-6deg); }
:global(html[data-theme="golden"] .image-placeholder-glyph .image-symbol-photo) { display: none; }
:global(html[data-theme="golden"] .image-placeholder-glyph .image-symbol-tv) { display: block; transform: rotate(6deg); }
:global(html[data-theme="golden"] .image-placeholder-caption) { color: #ffe32d; background: #191814; }

.wired-image--compact .image-placeholder-index, .wired-image--compact .image-placeholder-stamp,
.wired-image--compact .image-placeholder-caption, .wired-image--compact .image-placeholder-bars { display: none; }
.wired-image--compact .image-placeholder-signal { width: 100%; padding: 0; gap: 0; }
.wired-image--compact .image-placeholder-glyph { width: 45%; min-width: 0; max-width: 2.75rem; box-shadow: 0.125rem 0.125rem 0 var(--image-stage-layer); }
.wired-image--compact .image-placeholder-orbit { border-width: 0.125rem; box-shadow: none; }
@keyframes image-signal { to { transform: translateX(100%); } }
@keyframes image-pulse { 50% { opacity: .25; transform: translateX(0.125rem); } }
@media (prefers-reduced-motion: reduce) {
    .wired-image-content, .wired-image-placeholder { transition: none; }
    .wired-image-placeholder::after, .image-placeholder-bars i { animation: none; }
}
</style>
