<script setup lang="ts">
import WiredBadge from '../ui/WiredBadge.vue';
import hangzhouEmblem from '../../assets/education/hangzhou-normal.png';
import wanliEmblem from '../../assets/education/zhejiang-wanli.png';

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
                            <img :src="item.emblem" :alt="`${item.school}校徽`" :style="{ '--emblem-scale': item.emblemScale }" width="88" height="88" loading="lazy" decoding="async" />
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
    scroll-margin-top: 100px;
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
    gap: 20px;
    margin-bottom: 28px;
}

.education-eyebrow {
    margin-bottom: 12px;
    --ui-badge-padding: 5px 11px;
    --ui-badge-bg: var(--education-accent);
    --ui-badge-size: .72rem;
    --ui-badge-tracking: .19em;
    --ui-badge-shadow: 4px 4px 0 var(--education-layer);
}

h3 {
    color: #fff;
    font-size: clamp(1.8rem, 3.2vw, 2.5rem);
    font-style: italic;
    font-weight: 900;
    letter-spacing: -.055em;
    text-shadow: 3px 3px 0 var(--education-ink);
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
    --ui-panel-border-width: 3px;
    --ui-panel-border: var(--education-ink);
    --ui-panel-back: var(--education-ink);
    --ui-panel-shadow: 11px 11px 0 var(--education-layer), 17px 17px 0 var(--ui-panel-back);
}

.education-row {
    position: relative;
    display: grid;
    grid-template-columns: 250px minmax(0, 1fr) 48px;
    align-items: center;
    gap: clamp(28px, 4vw, 52px);
    padding: 28px 40px 28px 30px;
    background: linear-gradient(112deg, var(--education-tint) 0 26%, transparent 26%);
}

.education-row + .education-row {
    border-top: 1px solid var(--education-line);
}

.degree-artwork {
    position: relative;
    isolation: isolate;
    min-height: 190px;
    transition: transform 320ms cubic-bezier(.16, 1, .3, 1);
}

.degree-artwork::before,
.degree-artwork::after {
    position: absolute;
    z-index: -1;
    inset: 32px 7px 13px -4px;
    background: var(--education-accent);
    clip-path: polygon(0 18%, 94% 0, 100% 73%, 8% 100%);
    content: '';
}

.degree-artwork::before {
    background: var(--education-layer);
    transform: translate(11px, 13px) rotate(5deg);
}

.degree-caption {
    position: absolute;
    z-index: 3;
    top: 22px;
    left: 3px;
    padding: 4px 7px;
    color: #fff;
    background: var(--education-accent);
    font-size: .58rem;
    font-weight: 800;
    letter-spacing: .22em;
    transform: rotate(-13deg);
}

.degree-lettering {
    position: absolute;
    inset: 25px 0 0;
    color: #fff;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 10rem;
    font-style: italic;
    font-weight: 1000;
    letter-spacing: -.09em;
    line-height: .82;
    text-decoration: none;
    -webkit-text-stroke: 2px var(--education-ink);
    paint-order: stroke fill;
    text-shadow: 7px 8px 0 var(--education-layer), 13px 14px 0 var(--education-ink);
}

.degree-initial,
.degree-stop,
.degree-end {
    position: absolute;
    display: block;
}

.degree-initial {
    z-index: 2;
    top: 16px;
    left: 2px;
    transform: rotate(-13deg) scaleY(1.08);
}

.degree-end {
    z-index: 1;
    top: 28px;
    left: 128px;
    font-size: .88em;
    transform: rotate(8deg) skewX(-9deg);
}

.degree-stop {
    z-index: 3;
    top: 74px;
    left: 112px;
    font-size: .58em;
    transform: rotate(-12deg);
}

.education-row:not(.is-current) .degree-initial {
    top: 24px;
    transform: rotate(5deg) skewY(-5deg);
}

.education-row:not(.is-current) .degree-end {
    top: 11px;
    left: 109px;
    transform: rotate(-11deg) skewX(-8deg);
}

.education-row:not(.is-current) .degree-stop { left: 93px; }

.is-current .degree-lettering { font-size: 10.3rem; }

.education-row:not(.is-current) .degree-artwork::after {
    transform: rotate(5deg);
}

.school-emblem {
    position: absolute;
    z-index: 4;
    top: -6px;
    right: -5px;
    width: 88px;
    height: 88px;
    padding: 5px;
    border: 2px solid var(--education-ink);
    border-radius: 50%;
    background: #fff;
    box-shadow: 4px 5px 0 var(--education-layer);
    transform: rotate(5deg);
}

.school-emblem-viewport {
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 50%;
}

.school-emblem img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
    // Match the visible crest sizes despite different padding in the source files.
    transform: scale(var(--emblem-scale, 1));
}

.education-copy { min-width: 0; padding: 12px 0; }
.school-line { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; }

h4 {
    color: var(--text);
    font-size: clamp(1rem, 1.7vw, 1.25rem);
    font-weight: 750;
    letter-spacing: .02em;
}

.education-status {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 9px;
    border: 1px solid var(--education-line);
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

.status-dot { width: 5px; height: 5px; border-radius: 50%; background: #fff; }

.education-major {
    margin-top: 14px;
    color: var(--accent-strong);
    font-size: clamp(1.25rem, 2.7vw, 2rem);
    font-weight: 850;
    letter-spacing: -.035em;
    line-height: 1.4;
}

.major-english {
    margin-top: 6px;
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
    right: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    width: 48px;
    min-height: 60px;
    padding: 8px;
    border: 1px solid var(--education-line);
    color: var(--education-accent);
    background: var(--education-paper);
    font-size: .68rem;
    font-weight: 750;
    text-decoration: none;
    transform: translateY(-50%);
    transition: color 160ms ease, background-color 160ms ease, box-shadow 160ms ease;
}

.school-website svg {
    width: 22px;
    height: 22px;
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: square;
}

.school-website:hover {
    color: #fff;
    background: var(--education-accent);
    border-color: var(--education-accent);
    box-shadow: 4px 4px 0 var(--education-ink);
}

.school-website:focus-visible {
    outline: 3px solid var(--accent-strong);
    outline-offset: 4px;
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
    --ui-panel-border-width: 2px;
    --ui-panel-border: rgba(255, 255, 255, .7);
    --ui-panel-back: #000;
    --ui-panel-shadow: 10px 10px 0 var(--education-layer), 18px 18px 0 var(--ui-panel-back);
}

:global(html[data-theme="dark"] .degree-artwork::after) {
    background: #f6f2ec;
    clip-path: polygon(0 0, 100% 10%, 89% 100%, 6% 90%);
    transform: rotate(-3deg);
}

:global(html[data-theme="dark"] .degree-caption) { color: #fff; background: #08080a; }
:global(html[data-theme="dark"] .degree-lettering) { color: #111115; -webkit-text-stroke-color: #fff; }
:global(html[data-theme="dark"] .school-emblem) { box-shadow: 4px 5px 0 #08080a, 7px 8px 0 #e5222d; }

@media (hover: hover) and (pointer: fine) {
    .education-row:hover .degree-artwork { transform: translate(-3px, -3px) rotate(-1deg); }
}

@media (max-width: 820px) {
    .education-row { grid-template-columns: 210px minmax(0, 1fr); padding: 26px; gap: 30px; }
    .degree-artwork { min-height: 176px; }
    .degree-lettering, .is-current .degree-lettering { font-size: 8.7rem; }
    .degree-end { left: 110px; }
    .degree-stop { left: 94px; top: 66px; }
    .education-row:not(.is-current) .degree-end { left: 95px; }
    .education-row:not(.is-current) .degree-stop { left: 82px; }
    .school-emblem { width: 76px; height: 76px; }
    .school-website {
        position: static;
        flex-direction: row;
        width: fit-content;
        min-height: 44px;
        margin-top: 12px;
        padding: 8px 12px;
        gap: 8px;
        transform: none;
    }
}

@media (max-width: 520px) {
    .education-heading { margin-bottom: 22px; }
    .education-row { grid-template-columns: 118px minmax(0, 1fr); padding: 22px 14px; gap: 16px; background: transparent; }
    .degree-artwork { min-height: 146px; }
    .degree-artwork::before, .degree-artwork::after { inset: 41px 0 6px -3px; }
    .degree-artwork::before { transform: translate(6px, 7px) rotate(5deg); }
    .degree-caption { top: 39px; left: 0; padding: 3px 4px; font-size: .42rem; letter-spacing: .14em; }
    .degree-lettering, .is-current .degree-lettering { inset: 50px 0 0; font-size: 5.2rem; text-shadow: 4px 5px 0 var(--education-layer), 7px 8px 0 var(--education-ink); -webkit-text-stroke-width: 1.5px; }
    .degree-initial { top: 11px; left: -1px; }
    .degree-end { top: 19px; left: 61px; }
    .degree-stop { top: 45px; left: 53px; }
    .education-row:not(.is-current) .degree-initial { top: 17px; }
    .education-row:not(.is-current) .degree-end { top: 7px; left: 52px; }
    .education-row:not(.is-current) .degree-stop { left: 45px; }
    .school-emblem { top: -4px; right: -2px; width: 56px; height: 56px; padding: 3px; }
    .education-copy { padding: 0; }
    .school-line { gap: 7px; }
    h4 { font-size: .95rem; line-height: 1.5; }
    .education-major { margin-top: 10px; font-size: 1.15rem; letter-spacing: -.02em; }
    .major-english { font-size: .6rem; letter-spacing: .025em; }
    .education-status { padding: 2px 6px; font-size: .6rem; }
    .education-list { --ui-panel-shadow: 6px 6px 0 var(--education-layer), 11px 11px 0 var(--ui-panel-back); }
    :global(html[data-theme="dark"] .education-list) { --ui-panel-shadow: 6px 6px 0 var(--education-layer), 11px 11px 0 var(--ui-panel-back); }
}

@media (prefers-reduced-motion: reduce) {
    .degree-artwork { transition: none; }
}
</style>
