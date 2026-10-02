<script setup lang="ts">
withDefaults(defineProps<{ issue?: string }>(), { issue: '001' });
</script>

<template>
    <div class="blog-artwork" aria-hidden="true">
        <div class="art-orbit orbit-one"></div>
        <div class="art-orbit orbit-two"></div>
        <div class="art-cut"></div>
        <span class="art-label">THE WIRED WORLD</span>
        <span class="art-word">HELLO,<br><em>WORLD.</em></span>
        <span class="art-issue">{{ issue }}</span>
        <span class="art-signal"><i></i><i></i><i></i><i></i></span>
        <span class="art-caption">A CONNECTION BEGINS.</span>
    </div>
</template>

<style scoped>
.blog-artwork { position: relative; isolation: isolate; width: 100%; height: 100%; min-height: 250px; overflow: hidden; color: #fff; background: linear-gradient(155deg, #24eded, #086ece 45%, #001477); }
.art-orbit { position: absolute; z-index: -1; width: 290px; height: 290px; border: 2px solid #7dfff0; border-radius: 50%; opacity: .65; }
.orbit-one { top: -190px; right: -20px; box-shadow: 0 0 0 20px #71ffec25, 0 0 0 52px #71ffec15; }
.orbit-two { bottom: -210px; left: -85px; width: 360px; height: 360px; }
.art-cut { position: absolute; z-index: -1; inset: 25% -30% -60% 45%; background: #00175e; transform: rotate(36deg); opacity: .5; }
.art-label { position: absolute; top: 22px; left: 24px; font-size: .58rem; font-weight: 850; letter-spacing: .18em; }
.art-word { position: absolute; top: 31%; left: 24px; font-size: clamp(2.8rem, 5vw, 4.4rem); font-style: italic; font-weight: 950; line-height: .9; letter-spacing: -.065em; transform: rotate(-7deg); text-shadow: 4px 4px 0 #00175e; }
.art-word em { display: inline-block; margin-top: 5px; padding: 3px 10px 9px 6px; color: #003eaa; background: #faffff; box-shadow: 5px 5px 0 #26f3ef; }
.art-issue { position: absolute; right: 15px; bottom: 17px; font-size: 4.8rem; font-weight: 950; font-style: italic; letter-spacing: -.1em; line-height: 1; opacity: .17; }
.art-caption { position: absolute; bottom: 22px; left: 24px; font-size: .5rem; letter-spacing: .13em; font-weight: 800; }
.art-signal { position: absolute; top: 24px; right: 20px; display: flex; gap: 4px; transform: skewX(-20deg); }
.art-signal i { display: block; width: 5px; height: 12px; background: #fff; }
.art-signal i:nth-child(2) { opacity: .7; }.art-signal i:nth-child(3) { opacity: .45; }.art-signal i:nth-child(4) { opacity: .25; }
:global(html[data-theme="dark"] .blog-artwork) { background: #e5222d; }
:global(html[data-theme="dark"] .art-cut) { inset: -30% -18% -30% 59%; background: #08080b; opacity: 1; transform: rotate(27deg); }
:global(html[data-theme="dark"] .art-orbit) { border-radius: 0; border-color: #08080b; transform: rotate(25deg); opacity: .4; box-shadow: 0 0 0 20px #ffffff18, 0 0 0 52px #08080b18; }
:global(html[data-theme="dark"] .art-word) { text-shadow: 4px 4px 0 #08080b; }
:global(html[data-theme="dark"] .art-word em) { color: #08080b; background: #fff9f0; box-shadow: 6px 6px 0 #08080b; }
:global(html[data-theme="golden"] .blog-artwork) { color: #191814; background: #ffe32d; }
:global(html[data-theme="golden"] .art-cut) { background: repeating-linear-gradient(0deg, #40b968 0 9px, #fffdf2 9px 15px, #19cbd1 15px 24px, #fffdf2 24px 30px, #ed9821 30px 39px, #fffdf2 39px 45px, #e34574 45px 54px); inset: 34% -20% -30% 48%; opacity: 1; }
:global(html[data-theme="golden"] .art-orbit) { border-color: #fffdf2; box-shadow: 0 0 0 20px #f4b72750, 0 0 0 52px #fffdf240; }
:global(html[data-theme="golden"] .art-word) { text-shadow: 3px 3px 0 #fffdf2; }
:global(html[data-theme="golden"] .art-word em) { color: #ffe32d; background: #191814; text-shadow: none; box-shadow: 5px 5px 0 #fffdf2; }
:global(html[data-theme="golden"] .art-signal i) { background: #191814; }
</style>
