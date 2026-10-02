<script setup lang="ts">
import { ref } from 'vue';

const tunedIn = ref(false);
</script>

<template>
    <div class="footer-television">
        <button class="television-button" :class="{ 'is-tuned': tunedIn }" type="button" :aria-pressed="tunedIn" :aria-label="tunedIn ? '关闭小电视彩蛋' : '打开小电视彩蛋'" @click="tunedIn = !tunedIn">
            <svg class="television-art" viewBox="0 0 300 254" aria-hidden="true">
                <defs>
                    <clipPath id="footer-tv-screen">
                        <path d="M49 87Q130 80 211 87Q220 145 211 197Q130 207 48 198Q38 144 49 87Z" />
                    </clipPath>
                    <pattern id="footer-tv-grid" width="22" height="22" patternUnits="userSpaceOnUse" patternTransform="rotate(-3)">
                        <path d="M22 0H0V22" fill="none" stroke="#d4a600" stroke-width="1.2" />
                    </pattern>
                </defs>

                <g class="tv-sparkles" fill="#ffe640">
                    <path d="m17 122 3-8 3 8 8 3-8 3-3 8-3-8-8-3zM278 58l3-9 3 9 9 3-9 3-3 9-3-9-9-3zM278 194l2-6 2 6 6 2-6 2-2 6-2-6-6-2z" />
                </g>

                <g class="tv-antenna" fill="#08080a" stroke="#f9f5dc" stroke-width="2" stroke-linejoin="round">
                    <path d="m136 74-43-53 9-5 42 56zM144 73l36-64 10 1-37 64z" />
                    <path d="M126 75Q126 50 148 50Q170 50 170 75Z" />
                </g>
                <g fill="#08080a" stroke="#f9f5dc" stroke-width="2" stroke-linejoin="round">
                    <path d="m70 204-14 37h12l25-33zM220 205l19 36h12l-11-39z" />
                    <path d="M43 74Q146 65 259 76Q271 128 264 206Q158 220 38 208Q25 152 30 89Q31 77 43 74Z" />
                </g>

                <g clip-path="url(#footer-tv-screen)">
                    <path fill="#ffe52e" d="M30 76h190v135H30z" />
                    <path class="tv-grid" fill="url(#footer-tv-grid)" d="M30 76h190v135H30z" />
                    <g class="tv-rainbow" fill="none" stroke-width="5">
                        <path stroke="#ff8623" d="m30 82 199 98" />
                        <path stroke="#f44753" d="m30 90 199 98" />
                        <path stroke="#fff9ba" d="m30 98 199 98" />
                        <path stroke="#22bb72" d="m30 106 199 98" />
                        <path stroke="#2dcddd" d="m30 114 199 98" />
                        <path stroke="#fff9ba" d="m30 122 199 98" />
                        <path stroke="#3678c5" d="m30 130 199 98" />
                        <path stroke="#f36d9f" d="m30 138 199 98" />
                    </g>
                    <path class="tv-screen-reflection" fill="#fff" fill-opacity=".19" d="m48 85 57-4-65 127H28z" />
                    <g class="tv-greeting" fill="#08080a" font-family="Arial, Helvetica, sans-serif" font-style="italic" font-weight="900" text-anchor="middle">
                        <path d="m64 114 136-5-4 67-137 4z" fill="#ffe52e" />
                        <text x="130" y="140" font-size="29" letter-spacing="-2">HELLO</text>
                        <text x="128" y="166" font-size="26" letter-spacing="-1.5">WORLD!</text>
                    </g>
                    <path class="tv-scan" fill="#fff" fill-opacity=".24" d="M30 86h190v7H30z" />
                </g>
                <path d="M49 87Q130 80 211 87Q220 145 211 197Q130 207 48 198Q38 144 49 87Z" fill="none" stroke="#08080a" stroke-width="4" />

                <g class="tv-controls" fill="none" stroke="#f9f5dc" stroke-linecap="round">
                    <path stroke-width="4" d="m228 97 25 1m-25 8 26 1m-26 8 26 1m-26 8 26 1m-26 8 26 1m-26 8 26 1" />
                    <circle cx="233" cy="153" r="4.5" stroke-width="2" />
                    <circle cx="248" cy="153" r="4.5" stroke-width="2" />
                    <circle cx="240" cy="183" r="16" stroke-width="5" stroke-dasharray="3 3" />
                    <circle cx="240" cy="183" r="10" stroke-width="3" />
                    <path class="tv-dial" d="m240 183 5-6" stroke-width="2" />
                </g>
                <circle class="tv-status-light" cx="254" cy="206" r="2.8" fill="#ffe52e" />
            </svg>
        </button>
        <span class="television-hint" aria-hidden="true">{{ tunedIn ? 'CLICK TO CLOSE' : 'CLICK TO TUNE IN' }}</span>
        <span class="television-announcement" role="status">{{ tunedIn ? 'Hello world！欢迎来到连线世界。' : '' }}</span>
    </div>
</template>

<style scoped lang="less">
.footer-television {
    flex: 0 0 146px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 146px;
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

.television-art { display: block; width: 100%; height: auto; overflow: visible; filter: drop-shadow(4px 5px 0 rgba(0, 0, 0, .28)); }
.tv-grid { opacity: .45; }
.tv-rainbow { transition: opacity 300ms ease, transform 600ms cubic-bezier(.16, 1, .3, 1); }
.tv-greeting { opacity: 0; transform: translateY(12px); transition: opacity 250ms ease, transform 500ms cubic-bezier(.16, 1, .3, 1); }
.tv-dial { transform-origin: 240px 183px; transition: transform 500ms cubic-bezier(.16, 1, .3, 1); }
.tv-scan { opacity: 0; }
.tv-sparkles { opacity: .55; transition: opacity 300ms ease; }
.tv-status-light { transition: fill 250ms ease; }

.is-tuned .tv-greeting { opacity: 1; transform: translateY(0); }
.is-tuned .tv-rainbow { opacity: .35; transform: translate(0, 9px); }
.is-tuned .tv-dial { transform: rotate(70deg); }
.is-tuned .tv-status-light { fill: #4affb0; }
.is-tuned .tv-sparkles { opacity: 1; }
.is-tuned .tv-scan { animation: television-scan 850ms cubic-bezier(.3, 0, .15, 1) both; }
.television-button.is-tuned { transform: rotate(-2deg); }
.television-button:focus-visible { outline: 2px solid #ffe52e; outline-offset: 5px; border-radius: 8px; }

.television-hint {
    margin-top: 1px;
    color: #ffe765;
    font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
    font-size: .54rem;
    font-weight: 750;
    letter-spacing: .12em;
    white-space: nowrap;
}

.television-announcement { position: absolute; width: 1px; height: 1px; padding: 0; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }

@keyframes television-scan {
    0% { opacity: 0; transform: translateY(0); }
    15% { opacity: 1; }
    85% { opacity: .5; }
    100% { opacity: 0; transform: translateY(118px); }
}

@media (hover: hover) and (pointer: fine) {
    .television-button:hover { transform: translateY(-4px) rotate(-2deg); filter: drop-shadow(0 0 6px rgba(255, 224, 35, .22)); }
    .television-button:hover .tv-sparkles { opacity: 1; }
}

@media (max-width: 600px) {
    .footer-television { width: 120px; }
    .television-button { width: calc(100% - 8px); }
    .television-hint { font-size: .46rem; letter-spacing: .08em; }
}

@media (prefers-reduced-motion: reduce) {
    .television-button, .tv-rainbow, .tv-greeting, .tv-dial, .tv-sparkles, .tv-status-light { transition: none; }
    .is-tuned .tv-scan { animation: none; }
}
</style>
