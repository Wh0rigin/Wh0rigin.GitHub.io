<script setup lang="ts">
import { computed } from 'vue';
import { useModeStore } from '../../../stores/mode';
import WiredTelevisionArt from '../../ui/WiredTelevisionArt.vue';

const modeStore = useModeStore();
const tunedIn = computed(() => modeStore.theme === 'golden');
</script>

<template>
    <div class="footer-television">
        <button class="television-button" :class="{ 'is-tuned': tunedIn }" type="button" :aria-pressed="tunedIn" :aria-label="tunedIn ? '退出黄色电视主题' : '打开小电视彩蛋'" @click="modeStore.tuneTelevision">
            <WiredTelevisionArt id-prefix="footer-tv" :tuned="tunedIn" />
        </button>
        <span class="television-hint" aria-hidden="true">{{ tunedIn ? 'CLICK TO CLOSE' : 'CLICK TO TUNE IN' }}</span>
        <span class="television-announcement" role="status">{{ tunedIn ? '隐藏频道已接通。点击右上角电视按钮可回到白天模式。' : '' }}</span>
    </div>
</template>

<style scoped lang="less">
.footer-television {
    flex: 0 0 9.125rem;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 9.125rem;
}

.television-button {
    display: block;
    width: 100%;
    padding: 0;
    border: 0;
    background: transparent;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    transform: rotate(-5deg);
    transition: transform 400ms cubic-bezier(.16, 1, .3, 1), filter 400ms ease;
}

.television-button.is-tuned { transform: rotate(-2deg); }
.television-button:focus-visible { outline: 0.125rem solid #ffe52e; outline-offset: 0.3125rem; border-radius: 0.5rem; }

.television-hint {
    margin-top: 0.0625rem;
    color: #ffe765;
    font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
    font-size: .54rem;
    font-weight: 750;
    letter-spacing: .12em;
    white-space: nowrap;
}

.television-announcement { position: absolute; width: 0.0625rem; height: 0.0625rem; padding: 0; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }

@media (hover: hover) and (pointer: fine) {
    .television-button:hover { transform: translateY(-0.25rem) rotate(-2deg); filter: drop-shadow(0 0 0.375rem rgba(255, 224, 35, .22)); }
    .television-button:hover :deep(.tv-sparkles) { opacity: 1; }
}

@media (max-width: 600px) {
    .footer-television { width: 7.5rem; }
    .television-button { width: calc(100% - 0.5rem); }
    .television-hint { font-size: .46rem; letter-spacing: .08em; }
}

@media (prefers-reduced-motion: reduce) {
    .television-button { transition: none; }
}
</style>
