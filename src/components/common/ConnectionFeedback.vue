<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { failedImageCount, navigationLoad, retryFailedImages } from '../../composables/loadingExperience';
import WiredAction from '../ui/WiredAction.vue';

const offline = ref(!navigator.onLine);
const showProgress = ref(false);
const slowNavigation = ref(false);
const imageFailures = computed(failedImageCount);
let progressTimer: ReturnType<typeof setTimeout> | undefined;
let slowTimer: ReturnType<typeof setTimeout> | undefined;

watch(() => navigationLoad.pending, (pending) => {
    clearTimeout(progressTimer);
    clearTimeout(slowTimer);
    showProgress.value = false;
    slowNavigation.value = false;
    if (pending) {
        progressTimer = setTimeout(() => { showProgress.value = true; }, 200);
        slowTimer = setTimeout(() => { slowNavigation.value = true; }, 4000);
    }
}, { immediate: true });

function updateConnection() {
    const wasOffline = offline.value;
    offline.value = !navigator.onLine;
    // Retry failed images once when connectivity returns, never in a timed loop.
    if (wasOffline && !offline.value) retryFailedImages();
}
function retryPage() {
    // A failed dynamic import can stay rejected in the browser's module cache.
    const destination = new URL(navigationLoad.target || location.pathname, location.origin);
    if (destination.origin === location.origin) location.assign(destination.href);
}
onMounted(() => {
    window.addEventListener('online', updateConnection);
    window.addEventListener('offline', updateConnection);
});
onUnmounted(() => {
    clearTimeout(progressTimer);
    clearTimeout(slowTimer);
    window.removeEventListener('online', updateConnection);
    window.removeEventListener('offline', updateConnection);
});
</script>

<template>
    <div v-if="showProgress" class="route-progress" role="status">
        <span class="route-progress-track" aria-hidden="true"></span>
        <span class="route-progress-label">{{ slowNavigation ? '连接有些慢，正在打开页面…' : '正在打开页面…' }}</span>
    </div>
    <Transition name="connection-note">
        <aside v-if="offline || navigationLoad.error || imageFailures" class="connection-note" role="status" aria-live="polite">
            <span class="connection-signal" aria-hidden="true">{{ offline ? 'OFFLINE' : 'RECONNECT' }}</span>
            <div class="connection-copy">
                <p v-if="offline">网络暂时断开，已显示的内容可以继续阅读。</p>
                <p v-else-if="navigationLoad.error">页面暂未打开，当前内容已保留。</p>
                <p v-else>{{ imageFailures }} 张图片暂未加载，文字可以先读。</p>
            </div>
            <WiredAction v-if="navigationLoad.error" :disabled="offline" arrow="none" @click="retryPage">重新打开</WiredAction>
            <WiredAction v-else-if="imageFailures" :disabled="offline" arrow="none" @click="retryFailedImages">重试图片</WiredAction>
        </aside>
    </Transition>
</template>

<style scoped>
.route-progress { position: fixed; z-index: 9000; inset: 0 0 auto; height: 3px; pointer-events: none; background: var(--accent-soft); }
.route-progress-track { display: block; width: 100%; height: 100%; overflow: hidden; }
.route-progress-track::before { display: block; width: 35%; height: 100%; background: var(--accent-strong); animation: route-signal 1.4s ease-in-out infinite; content: ''; }
.route-progress-label { position: absolute; top: 86px; right: max(18px, calc((100vw - 1120px) / 2)); padding: 8px 14px; color: var(--text); background: var(--surface); border: 1px solid var(--border); box-shadow: 4px 4px 0 var(--accent); font-size: .8rem; font-weight: 700; transform: skewX(-5deg); }
.connection-note { position: fixed; z-index: 9000; bottom: max(20px, env(safe-area-inset-bottom)); left: 50%; display: flex; align-items: center; gap: 18px; width: max-content; max-width: min(720px, calc(100% - 40px)); padding: 16px 20px; color: var(--text); background: var(--surface); border: 2px solid var(--border); box-shadow: 6px 6px 0 var(--accent); transform: translateX(-50%); }
.connection-signal { flex: 0 0 auto; font: italic 900 .65rem/1.2 var(--font-display); letter-spacing: .08em; color: var(--accent-strong); }
.connection-copy { min-width: 0; font-size: .82rem; line-height: 1.6; }
.connection-note :deep(.wired-action) { flex-shrink: 0; --ui-action-size: .78rem; --ui-action-padding: 8px 12px; }
.connection-note-enter-active, .connection-note-leave-active { transition: opacity 180ms, translate 180ms; }
.connection-note-enter-from, .connection-note-leave-to { opacity: 0; translate: 0 10px; }
@keyframes route-signal { from { transform: translateX(-110%); } to { transform: translateX(390%); } }
@media (max-width: 520px) {
    .connection-note { flex-wrap: wrap; gap: 10px; padding: 13px 15px; max-width: calc(100% - 28px); width: 100%; }
    .connection-signal { width: 100%; }
    .connection-copy { flex: 1 1 140px; }
}
@media (prefers-reduced-motion: reduce) { .route-progress-track::before { animation: none; width: 100%; } }
</style>
