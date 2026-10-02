<script setup lang="ts">
import WiredBadge from '../ui/WiredBadge.vue';
import WiredImage from '../ui/WiredImage.vue';
import hangzhouEmblem from '../../assets/education/hangzhou-normal-256.webp';
import wanliEmblem from '../../assets/education/zhejiang-wanli-256.webp';

const education = [
    {
        degree: 'M.E',
        degreeName: '工学硕士',
        school: '杭州师范大学',
        schoolUrl: 'https://www.hznu.edu.cn/',
        major: '人工智能',
        majorEnglish: 'Artificial Intelligence',
        emblem: hangzhouEmblem,
        emblemScale: 1.2,
        current: true,
    },
    {
        degree: 'B.E',
        degreeName: '工学学士',
        school: '浙江万里学院',
        schoolUrl: 'https://www.zwu.edu.cn/',
        major: '计算机科学与技术',
        majorEnglish: 'Computer Science and Technology',
        emblem: wanliEmblem,
        emblemScale: 1,
        current: false,
    },
];
</script>

<template>
    <section id="education" class="education-section" aria-labelledby="education-title">
        <div class="education-heading">
            <div>
                <WiredBadge as="p" class="education-eyebrow">Education</WiredBadge>
                <h3 id="education-title">教育经历</h3>
            </div>
            <span class="education-motto" aria-hidden="true">KEEP<br />LEARNING.</span>
        </div>

        <ol class="education-list wired-panel">
            <li v-for="item in education" :key="item.degree" class="education-row" :class="{ 'is-current': item.current }">
                <div class="degree-artwork">
                    <span class="degree-caption" aria-hidden="true">{{ item.current ? 'MASTER' : 'BACHELOR' }}</span>
                    <abbr class="degree-lettering" :title="item.degreeName" :aria-label="`${item.degree}，${item.degreeName}`">
                        <span class="degree-initial" aria-hidden="true">{{ item.degree[0] }}</span>
                        <span class="degree-stop" aria-hidden="true">.</span>
                        <span class="degree-end" aria-hidden="true">E</span>
                    </abbr>
                    <div class="school-emblem">
                        <div class="school-emblem-viewport">
                            <WiredImage :src="item.emblem" :alt="`${item.school}校徽`" :style="{ '--emblem-scale': item.emblemScale }" :width="88" :height="88" compact fill />
                        </div>
                    </div>
                </div>

                <div class="education-copy">
                    <div class="school-line">
                        <h4>{{ item.school }}</h4>
                        <span class="education-status" :class="{ 'status-current': item.current }">
                            <span v-if="item.current" class="status-dot" aria-hidden="true"></span>
                            {{ item.current ? '在读' : '已获学位' }}
                        </span>
                    </div>
                    <p class="education-major">{{ item.major }}</p>
                    <p class="major-english" lang="en">{{ item.majorEnglish }}</p>
                    <a class="school-website" :href="item.schoolUrl" target="_blank" rel="noopener noreferrer" :aria-label="`访问${item.school}官网（新标签页打开）`" :title="`${item.school}官网（新标签页打开）`">
                        <svg aria-hidden="true" viewBox="0 0 20 20"><path d="M5 15 15 5M5 5h10v10" /></svg>
                        <span>官网</span>
                    </a>
                </div>
            </li>
        </ol>
    </section>
</template>

<style scoped lang="less">
.education-section {
    grid-column: 1 / -1;
    min-width: 0;
    scroll-margin-top: 6.25rem;
    --education-ink: #002578;
    --education-accent: #003eaa;
    --education-layer: #19d9e9;
    --education-paper: #faffff;
    --education-tint: #e4faff;
    --education-line: rgba(0, 59, 158, .18);
}

.education-heading {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 1.25rem;
    margin-bottom: 1.75rem;
}

.education-eyebrow {
    margin-bottom: 0.75rem;
    --ui-badge-padding: 0.3125rem 0.6875rem;
    --ui-badge-bg: var(--education-accent);
    --ui-badge-size: .72rem;
    --ui-badge-tracking: .19em;
    --ui-badge-shadow: 0.25rem 0.25rem 0 var(--education-layer);
}

h3 {
    color: #fff;
    font-size: clamp(1.8rem, 3.2vw, 2.5rem);
    font-style: italic;
    font-weight: 900;
    letter-spacing: -.055em;
    text-shadow: 0.1875rem 0.1875rem 0 var(--education-ink);
}

.education-motto {
    color: #fff;
    font-size: clamp(.8rem, 1.5vw, 1rem);
    font-style: italic;
    font-weight: 950;
    letter-spacing: -.025em;
    line-height: 1.05;
    text-align: right;
    transform: rotate(-5deg);
}

.education-list {
    position: relative;
    list-style: none;
    --ui-panel-color: var(--text);
    --ui-panel-bg: var(--education-paper);
    --ui-panel-border-width: 0.1875rem;
    --ui-panel-border: var(--education-ink);
    --ui-panel-back: var(--education-ink);
    --ui-panel-shadow: 0.6875rem 0.6875rem 0 var(--education-layer), 1.0625rem 1.0625rem 0 var(--ui-panel-back);
}

.education-row {
    position: relative;
    display: grid;
    grid-template-columns: 15.625rem minmax(0, 1fr) 3rem;
    align-items: center;
    gap: clamp(1.75rem, 4vw, 3.25rem);
    padding: 1.75rem 2.5rem 1.75rem 1.875rem;
    background: linear-gradient(112deg, var(--education-tint) 0 26%, transparent 26%);
}

.education-row + .education-row {
    border-top: 0.0625rem solid var(--education-line);
}

.degree-artwork {
    position: relative;
    isolation: isolate;
    min-height: 11.875rem;
    transition: transform 320ms cubic-bezier(.16, 1, .3, 1);
}

.degree-artwork::before,
.degree-artwork::after {
    position: absolute;
    z-index: -1;
    inset: 2rem 0.4375rem 0.8125rem -0.25rem;
    background: var(--education-accent);
    clip-path: polygon(0 18%, 94% 0, 100% 73%, 8% 100%);
    content: '';
}

.degree-artwork::before {
    background: var(--education-layer);
    transform: translate(0.6875rem, 0.8125rem) rotate(5deg);
}

.degree-caption {
    position: absolute;
    z-index: 3;
    top: 1.375rem;
    left: 0.1875rem;
    padding: 0.25rem 0.4375rem;
    color: #fff;
    background: var(--education-accent);
    font-size: .58rem;
    font-weight: 800;
    letter-spacing: .22em;
    transform: rotate(-13deg);
}

.degree-lettering {
    position: absolute;
    inset: 1.5625rem 0 0;
    color: #fff;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 10rem;
    font-style: italic;
    font-weight: 1000;
    letter-spacing: -.09em;
    line-height: .82;
    text-decoration: none;
    -webkit-text-stroke: 0.125rem var(--education-ink);
    paint-order: stroke fill;
    text-shadow: 0.4375rem 0.5rem 0 var(--education-layer), 0.8125rem 0.875rem 0 var(--education-ink);
}

.degree-initial,
.degree-stop,
.degree-end {
    position: absolute;
    display: block;
}

.degree-initial {
    z-index: 2;
    top: 1rem;
    left: 0.125rem;
    transform: rotate(-13deg) scaleY(1.08);
}

.degree-end {
    z-index: 1;
    top: 1.75rem;
    left: 8rem;
    font-size: .88em;
    transform: rotate(8deg) skewX(-9deg);
}

.degree-stop {
    z-index: 3;
    top: 4.625rem;
    left: 7rem;
    font-size: .58em;
    transform: rotate(-12deg);
}

.education-row:not(.is-current) .degree-initial {
    top: 1.5rem;
    transform: rotate(5deg) skewY(-5deg);
}

.education-row:not(.is-current) .degree-end {
    top: 0.6875rem;
    left: 6.8125rem;
    transform: rotate(-11deg) skewX(-8deg);
}

.education-row:not(.is-current) .degree-stop { left: 5.8125rem; }

.is-current .degree-lettering { font-size: 10.3rem; }

.education-row:not(.is-current) .degree-artwork::after {
    transform: rotate(5deg);
}

.school-emblem {
    position: absolute;
    z-index: 4;
    top: -0.375rem;
    right: -0.3125rem;
    width: 5.5rem;
    height: 5.5rem;
    padding: 0.3125rem;
    border: 0.125rem solid var(--education-ink);
    border-radius: 50%;
    background: #fff;
    box-shadow: 0.25rem 0.3125rem 0 var(--education-layer);
    transform: rotate(5deg);
}

.school-emblem-viewport {
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 50%;
}

.school-emblem :deep(.wired-image-content) {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
    // Match the visible crest sizes despite different padding in the source files.
    transform: scale(var(--emblem-scale, 1));
}

.education-copy { min-width: 0; padding: 0.75rem 0; }
.school-line { display: flex; flex-wrap: wrap; align-items: center; gap: 0.75rem; }

h4 {
    color: var(--text);
    font-size: clamp(1rem, 1.7vw, 1.25rem);
    font-weight: 750;
    letter-spacing: .02em;
}

.education-status {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.25rem 0.5625rem;
    border: 0.0625rem solid var(--education-line);
    color: var(--text-muted);
    font-size: .68rem;
    font-weight: 650;
    white-space: nowrap;
}

.status-current {
    border-color: transparent;
    color: #fff;
    background: var(--education-accent);
    transform: skewX(-8deg);
}

.status-dot { width: 0.3125rem; height: 0.3125rem; border-radius: 50%; background: #fff; }

.education-major {
    margin-top: 0.875rem;
    color: var(--accent-strong);
    font-size: clamp(1.25rem, 2.7vw, 2rem);
    font-weight: 850;
    letter-spacing: -.035em;
    line-height: 1.4;
}

.major-english {
    margin-top: 0.375rem;
    color: var(--text-muted);
    font-size: .73rem;
    font-weight: 650;
    letter-spacing: .06em;
    line-height: 1.65;
    text-transform: uppercase;
}

.school-website {
    position: absolute;
    top: 50%;
    right: 2.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
    width: 3rem;
    min-height: 3.75rem;
    padding: 0.5rem;
    border: 0.0625rem solid var(--education-line);
    color: var(--education-accent);
    background: var(--education-paper);
    font-size: .68rem;
    font-weight: 750;
    text-decoration: none;
    transform: translateY(-50%);
    transition: color 160ms ease, background-color 160ms ease, box-shadow 160ms ease;
}

.school-website svg {
    width: 1.375rem;
    height: 1.375rem;
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: square;
}

.school-website:hover {
    color: #fff;
    background: var(--education-accent);
    border-color: var(--education-accent);
    box-shadow: 0.25rem 0.25rem 0 var(--education-ink);
}

.school-website:focus-visible {
    outline: 0.1875rem solid var(--accent-strong);
    outline-offset: 0.25rem;
}

:global(html[data-theme="dark"] .education-section) {
    --education-ink: #070709;
    --education-accent: #e5222d;
    --education-layer: #e5222d;
    --education-paper: #111115;
    --education-tint: #251015;
    --education-line: rgba(255, 255, 255, .18);
}

:global(html[data-theme="dark"] .education-list) {
    --ui-panel-border-width: 0.125rem;
    --ui-panel-border: rgba(255, 255, 255, .7);
    --ui-panel-back: #000;
    --ui-panel-shadow: 0.625rem 0.625rem 0 var(--education-layer), 1.125rem 1.125rem 0 var(--ui-panel-back);
}

:global(html[data-theme="dark"] .degree-artwork::after) {
    background: #f6f2ec;
    clip-path: polygon(0 0, 100% 10%, 89% 100%, 6% 90%);
    transform: rotate(-3deg);
}

:global(html[data-theme="dark"] .degree-caption) { color: #fff; background: #08080a; }
:global(html[data-theme="dark"] .degree-lettering) { color: #111115; -webkit-text-stroke-color: #fff; }
:global(html[data-theme="dark"] .school-emblem) { box-shadow: 0.25rem 0.3125rem 0 #08080a, 0.4375rem 0.5rem 0 #e5222d; }

@media (hover: hover) and (pointer: fine) {
    .education-row:hover .degree-artwork { transform: translate(-0.1875rem, -0.1875rem) rotate(-1deg); }
}

@media (max-width: 820px) {
    .education-row { grid-template-columns: 13.125rem minmax(0, 1fr); padding: 1.625rem; gap: 1.875rem; }
    .degree-artwork { min-height: 11rem; }
    .degree-lettering, .is-current .degree-lettering { font-size: 8.7rem; }
    .degree-end { left: 6.875rem; }
    .degree-stop { left: 5.875rem; top: 4.125rem; }
    .education-row:not(.is-current) .degree-end { left: 5.9375rem; }
    .education-row:not(.is-current) .degree-stop { left: 5.125rem; }
    .school-emblem { width: 4.75rem; height: 4.75rem; }
    .school-website {
        position: static;
        flex-direction: row;
        width: fit-content;
        min-height: 2.75rem;
        margin-top: 0.75rem;
        padding: 0.5rem 0.75rem;
        gap: 0.5rem;
        transform: none;
    }
}

@media (max-width: 520px) {
    .education-heading { margin-bottom: 1.375rem; }
    .education-row { grid-template-columns: 7.375rem minmax(0, 1fr); padding: 1.375rem 0.875rem; gap: 1rem; background: transparent; }
    .degree-artwork { min-height: 9.125rem; }
    .degree-artwork::before, .degree-artwork::after { inset: 2.5625rem 0 0.375rem -0.1875rem; }
    .degree-artwork::before { transform: translate(0.375rem, 0.4375rem) rotate(5deg); }
    .degree-caption { top: 2.4375rem; left: 0; padding: 0.1875rem 0.25rem; font-size: .42rem; letter-spacing: .14em; }
    .degree-lettering, .is-current .degree-lettering { inset: 3.125rem 0 0; font-size: 5.2rem; text-shadow: 0.25rem 0.3125rem 0 var(--education-layer), 0.4375rem 0.5rem 0 var(--education-ink); -webkit-text-stroke-width: 0.09375rem; }
    .degree-initial { top: 0.6875rem; left: -0.0625rem; }
    .degree-end { top: 1.1875rem; left: 3.8125rem; }
    .degree-stop { top: 2.8125rem; left: 3.3125rem; }
    .education-row:not(.is-current) .degree-initial { top: 1.0625rem; }
    .education-row:not(.is-current) .degree-end { top: 0.4375rem; left: 3.25rem; }
    .education-row:not(.is-current) .degree-stop { left: 2.8125rem; }
    .school-emblem { top: -0.25rem; right: -0.125rem; width: 3.5rem; height: 3.5rem; padding: 0.1875rem; }
    .education-copy { padding: 0; }
    .school-line { gap: 0.4375rem; }
    h4 { font-size: .95rem; line-height: 1.5; }
    .education-major { margin-top: 0.625rem; font-size: 1.15rem; letter-spacing: -.02em; }
    .major-english { font-size: .6rem; letter-spacing: .025em; }
    .education-status { padding: 0.125rem 0.375rem; font-size: .6rem; }
    .education-list { --ui-panel-shadow: 0.375rem 0.375rem 0 var(--education-layer), 0.6875rem 0.6875rem 0 var(--ui-panel-back); }
    :global(html[data-theme="dark"] .education-list) { --ui-panel-shadow: 0.375rem 0.375rem 0 var(--education-layer), 0.6875rem 0.6875rem 0 var(--ui-panel-back); }
}

@media (prefers-reduced-motion: reduce) {
    .degree-artwork { transition: none; }
}
</style>
