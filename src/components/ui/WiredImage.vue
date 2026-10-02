<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue';

const props = withDefaults(defineProps<{
    src: string;
    alt: string;
    width: number;
    height: number;
    loading?: 'eager' | 'lazy';
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
const previousSrc = ref('');
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
    state.value = 'ready';
    emit('ready', props.src);
}

function fail(image: HTMLImageElement) {
    if (image !== imageElement.value) return;
    state.value = 'error';
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
    previousSrc.value = props.keepPrevious ? lastReadySrc.value : '';
    state.value = 'loading';
    void nextTick(inspectCachedImage);
}, { immediate: true, flush: 'sync' });

onMounted(inspectCachedImage);
onUnmounted(() => { generation += 1; });
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
            <svg viewBox="0 0 40 40"><path d="M6 8h28v24H6zM6 27l9-9 8 8 5-5 6 6" /><circle cx="26" cy="15" r="2" /></svg>
            <span>{{ state === 'error' ? '图片暂未加载' : 'LOADING IMAGE' }}</span>
        </span>
        <img v-if="hasPrevious && state !== 'ready'" class="wired-image-previous" :src="previousSrc" :alt="alt" :width="width" :height="height" draggable="false" />
        <img
            v-if="src"
            :key="src"
            ref="imageElement"
            class="wired-image-content"
            :src="src"
            :alt="alt"
            :width="width"
            :height="height"
            :loading="loading"
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
.wired-image-placeholder { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; overflow: hidden; border: 1px solid var(--ui-line); color: var(--ui-muted); background: var(--ui-image-placeholder-bg, var(--ui-tint)); opacity: 1; transition: opacity 420ms var(--ease-out); }
.wired-image-placeholder::before { position: absolute; inset: 0; background: repeating-linear-gradient(125deg, transparent 0 16px, color-mix(in srgb, var(--ui-accent) 4%, transparent) 16px 17px); content: ''; }
.wired-image-placeholder::after { position: absolute; inset: 0; background: linear-gradient(110deg, transparent 30%, color-mix(in srgb, var(--ui-layer) 20%, transparent) 50%, transparent 70%); transform: translateX(-100%); animation: image-signal 2.1s ease-in-out infinite; content: ''; }
.wired-image-placeholder svg { width: clamp(22px, 20%, 38px); fill: none; stroke: currentColor; stroke-width: 1.4; opacity: .7; }
.wired-image-placeholder > span { font: italic 750 .54rem/1.4 var(--font-body); letter-spacing: .12em; text-align: center; }
.is-ready .wired-image-placeholder, .has-previous .wired-image-placeholder { opacity: 0; visibility: hidden; transition: opacity 420ms var(--ease-out), visibility 0s 420ms; }
.is-ready .wired-image-placeholder::after, .has-previous .wired-image-placeholder::after, .is-error .wired-image-placeholder::after { animation: none; }
.is-error .wired-image-placeholder > span { letter-spacing: .04em; }
.wired-image--compact .wired-image-placeholder { gap: 0; }
.wired-image--compact .wired-image-placeholder > span { display: none; }
@keyframes image-signal { to { transform: translateX(100%); } }
@media (prefers-reduced-motion: reduce) {
    .wired-image-content, .wired-image-placeholder { transition: none; }
    .wired-image-placeholder::after { animation: none; }
}
</style>
