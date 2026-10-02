<script setup lang="ts">
withDefaults(defineProps<{
    issue?: string;
    headline?: string;
    highlight?: string;
    caption?: string;
}>(), { issue: '001', headline: 'HELLO,', highlight: 'WORLD.', caption: 'A CONNECTION BEGINS.' });
</script>

<template>
    <div class="blog-artwork" aria-hidden="true">
        <div class="art-orbit orbit-one"></div>
        <div class="art-orbit orbit-two"></div>
        <div class="art-cut"></div>
        <span class="art-label">THE WIRED WORLD</span>
        <span class="art-word">{{ headline }}<br><em>{{ highlight }}</em></span>
        <span class="art-issue">{{ issue }}</span>
        <span class="art-signal"><i></i><i></i><i></i><i></i></span>
        <span class="art-caption">{{ caption }}</span>
    </div>
</template>

<style scoped>
.blog-artwork { position: relative; isolation: isolate; width: 100%; height: 100%; min-height: 15.625rem; overflow: hidden; color: #fff; background: linear-gradient(155deg, #24eded, #086ece 45%, #001477); }
.art-orbit { position: absolute; z-index: -1; width: 18.125rem; height: 18.125rem; border: 0.125rem solid #7dfff0; border-radius: 50%; opacity: .65; }
.orbit-one { top: -11.875rem; right: -1.25rem; box-shadow: 0 0 0 1.25rem #71ffec25, 0 0 0 3.25rem #71ffec15; }
.orbit-two { bottom: -13.125rem; left: -5.3125rem; width: 22.5rem; height: 22.5rem; }
.art-cut { position: absolute; z-index: -1; inset: 25% -30% -60% 45%; background: #00175e; transform: rotate(36deg); opacity: .5; }
.art-label { position: absolute; top: 1.375rem; left: 1.5rem; font-size: .58rem; font-weight: 850; letter-spacing: .18em; }
.art-word { position: absolute; top: 31%; left: 1.5rem; font-size: clamp(2.8rem, 5vw, 4.4rem); font-style: italic; font-weight: 950; line-height: .9; letter-spacing: -.065em; transform: rotate(-7deg); text-shadow: 0.25rem 0.25rem 0 #00175e; }
.art-word em { display: inline-block; margin-top: 0.3125rem; padding: 0.1875rem 0.625rem 0.5625rem 0.375rem; color: #003eaa; background: #faffff; box-shadow: 0.3125rem 0.3125rem 0 #26f3ef; }
.art-issue { position: absolute; right: 0.9375rem; bottom: 1.0625rem; font-size: 4.8rem; font-weight: 950; font-style: italic; letter-spacing: -.1em; line-height: 1; opacity: .17; }
.art-caption { position: absolute; bottom: 1.375rem; left: 1.5rem; font-size: .5rem; letter-spacing: .13em; font-weight: 800; }
.art-signal { position: absolute; top: 1.5rem; right: 1.25rem; display: flex; gap: 0.25rem; transform: skewX(-20deg); }
.art-signal i { display: block; width: 0.3125rem; height: 0.75rem; background: #fff; }
.art-signal i:nth-child(2) { opacity: .7; }.art-signal i:nth-child(3) { opacity: .45; }.art-signal i:nth-child(4) { opacity: .25; }
:global(html[data-theme="dark"] .blog-artwork) { background: #e5222d; }
:global(html[data-theme="dark"] .art-cut) { inset: -30% -18% -30% 59%; background: #08080b; opacity: 1; transform: rotate(27deg); }
:global(html[data-theme="dark"] .art-orbit) { border-radius: 0; border-color: #08080b; transform: rotate(25deg); opacity: .4; box-shadow: 0 0 0 1.25rem #ffffff18, 0 0 0 3.25rem #08080b18; }
:global(html[data-theme="dark"] .art-word) { text-shadow: 0.25rem 0.25rem 0 #08080b; }
:global(html[data-theme="dark"] .art-word em) { color: #08080b; background: #fff9f0; box-shadow: 0.375rem 0.375rem 0 #08080b; }
:global(html[data-theme="golden"] .blog-artwork) { color: #191814; background: #ffe32d; }
:global(html[data-theme="golden"] .art-cut) { background: repeating-linear-gradient(0deg, #40b968 0 0.5625rem, #fffdf2 0.5625rem 0.9375rem, #19cbd1 0.9375rem 1.5rem, #fffdf2 1.5rem 1.875rem, #ed9821 1.875rem 2.4375rem, #fffdf2 2.4375rem 2.8125rem, #e34574 2.8125rem 3.375rem); inset: 34% -20% -30% 48%; opacity: 1; }
:global(html[data-theme="golden"] .art-orbit) { border-color: #fffdf2; box-shadow: 0 0 0 1.25rem #f4b72750, 0 0 0 3.25rem #fffdf240; }
:global(html[data-theme="golden"] .art-word) { text-shadow: 0.1875rem 0.1875rem 0 #fffdf2; }
:global(html[data-theme="golden"] .art-word em) { color: #ffe32d; background: #191814; text-shadow: none; box-shadow: 0.3125rem 0.3125rem 0 #fffdf2; }
:global(html[data-theme="golden"] .art-signal i) { background: #191814; }
</style>
