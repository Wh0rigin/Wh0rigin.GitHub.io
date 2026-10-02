<script setup lang="ts">
withDefaults(defineProps<{
    idPrefix: string;
    tuned?: boolean;
}>(), { tuned: false });
</script>

<template>
    <svg class="television-art" :class="{ 'is-tuned': tuned }" viewBox="0 0 300 254" aria-hidden="true">
        <defs>
            <clipPath :id="`${idPrefix}-screen`">
                <path d="M49 87Q130 80 211 87Q220 145 211 197Q130 207 48 198Q38 144 49 87Z" />
            </clipPath>
            <pattern :id="`${idPrefix}-grid`" width="22" height="22" patternUnits="userSpaceOnUse" patternTransform="rotate(-3)">
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

        <g :clip-path="`url(#${idPrefix}-screen)`">
            <path fill="#ffe52e" d="M30 76h190v135H30z" />
            <path class="tv-grid" :fill="`url(#${idPrefix}-grid)`" d="M30 76h190v135H30z" />
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
            <g class="tv-greeting" fill="#08080a" font-family="Arial, Helvetica, sans-serif" font-style="normal" font-weight="900" text-anchor="middle">
                <path d="m62 107 140-5-4 77-139 4z" fill="#ffe52e" />
                <!-- Keep both lines within the curved screen, including font fallbacks. -->
                <text x="130" y="136" font-size="27" letter-spacing="-.5" textLength="112" lengthAdjust="spacingAndGlyphs">HELLO</text>
                <text x="130" y="168" font-size="25" letter-spacing="-.5" textLength="112" lengthAdjust="spacingAndGlyphs">WORLD!</text>
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
</template>

<style scoped>
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
@keyframes television-scan {
    0% { opacity: 0; transform: translateY(0); }
    15% { opacity: 1; }
    85% { opacity: .5; }
    100% { opacity: 0; transform: translateY(118px); }
}

@media (prefers-reduced-motion: reduce) {
    .tv-rainbow, .tv-greeting, .tv-dial, .tv-sparkles, .tv-status-light { transition: none; }
    .is-tuned .tv-scan { animation: none; }
}
</style>
