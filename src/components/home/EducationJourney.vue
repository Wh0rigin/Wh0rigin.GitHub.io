<script setup lang="ts">
import hangzhouEmblem from '../../assets/education/hangzhou-normal.png';
import wanliEmblem from '../../assets/education/zhejiang-wanli.png';

const education = [
    {
        degree: 'M.E',
        degreeName: '工学硕士',
        school: '杭州师范大学',
        major: '人工智能',
        majorEnglish: 'Artificial Intelligence',
        emblem: hangzhouEmblem,
        current: true,
    },
    {
        degree: 'B.E',
        degreeName: '工学学士',
        school: '浙江万里学院',
        major: '计算机科学与技术',
        majorEnglish: 'Computer Science and Technology',
        emblem: wanliEmblem,
        current: false,
    },
];
</script>

<template>
    <section id="education" class="education-section" aria-labelledby="education-title">
        <div class="education-heading">
            <div>
                <p class="education-eyebrow">Education</p>
                <h3 id="education-title">教育经历</h3>
            </div>
            <span class="education-motto" aria-hidden="true">KEEP<br />LEARNING.</span>
        </div>

        <ol class="education-list">
            <li v-for="item in education" :key="item.degree" class="education-row" :class="{ 'is-current': item.current }">
                <div class="degree-artwork">
                    <span class="degree-caption" aria-hidden="true">{{ item.current ? 'MASTER' : 'BACHELOR' }}</span>
                    <abbr class="degree-lettering" :title="item.degreeName">{{ item.degree }}</abbr>
                    <div class="school-emblem">
                        <img :src="item.emblem" :alt="`${item.school}校徽`" width="88" height="88" loading="lazy" decoding="async" />
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
                </div>
                <span class="row-arrow" aria-hidden="true">↗</span>
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
    display: inline-block;
    margin-bottom: 12px;
    padding: 5px 11px;
    color: #fff;
    background: var(--education-accent);
    font-size: .72rem;
    font-weight: 850;
    letter-spacing: .19em;
    text-transform: uppercase;
    transform: skewX(-10deg);
    box-shadow: 4px 4px 0 var(--education-layer);
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
    border: 3px solid var(--education-ink);
    background: var(--education-paper);
    box-shadow: 11px 11px 0 var(--education-layer), 17px 17px 0 var(--education-ink);
}

.education-row {
    position: relative;
    display: grid;
    grid-template-columns: 250px minmax(0, 1fr) 36px;
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
    min-height: 164px;
    transition: transform 320ms cubic-bezier(.16, 1, .3, 1);
}

.degree-artwork::before,
.degree-artwork::after {
    position: absolute;
    z-index: -1;
    inset: 18px 14px 8px 0;
    background: var(--education-accent);
    clip-path: polygon(7% 10%, 100% 0, 93% 88%, 0 100%);
    content: '';
}

.degree-artwork::before {
    background: var(--education-layer);
    transform: translate(7px, 9px);
}

.degree-caption {
    position: absolute;
    top: 30px;
    left: 28px;
    color: #fff;
    font-size: .58rem;
    font-weight: 800;
    letter-spacing: .22em;
    transform: rotate(-6deg);
}

.degree-lettering {
    position: absolute;
    top: 55px;
    left: 18px;
    color: #fff;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 6.2rem;
    font-style: italic;
    font-weight: 1000;
    letter-spacing: -.085em;
    line-height: .85;
    text-decoration: none;
    -webkit-text-stroke: 1.5px var(--education-ink);
    paint-order: stroke fill;
    text-shadow: 4px 5px 0 var(--education-layer), 8px 10px 0 var(--education-ink);
    transform: rotate(-6deg);
}

.school-emblem {
    position: absolute;
    z-index: 1;
    top: -3px;
    right: -1px;
    width: 88px;
    height: 88px;
    padding: 5px;
    border: 2px solid var(--education-ink);
    border-radius: 50%;
    background: #fff;
    box-shadow: 4px 5px 0 var(--education-layer);
    transform: rotate(5deg);
}

.school-emblem img {
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: contain;
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

.row-arrow {
    color: var(--education-accent);
    font-size: 2rem;
    font-weight: 800;
    opacity: .4;
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
    border: 2px solid rgba(255, 255, 255, .7);
    box-shadow: 10px 10px 0 #e5222d, 18px 18px 0 #000;
}

:global(html[data-theme="dark"] .degree-artwork::after) {
    background: #f6f2ec;
    clip-path: polygon(0 0, 100% 10%, 89% 100%, 6% 90%);
    transform: rotate(-3deg);
}

:global(html[data-theme="dark"] .degree-caption) { color: #111115; }
:global(html[data-theme="dark"] .degree-lettering) { color: #111115; -webkit-text-stroke-color: #fff; }
:global(html[data-theme="dark"] .school-emblem) { box-shadow: 4px 5px 0 #08080a, 7px 8px 0 #e5222d; }

@media (hover: hover) and (pointer: fine) {
    .education-row:hover .degree-artwork { transform: translate(-3px, -3px) rotate(-1deg); }
}

@media (max-width: 820px) {
    .education-row { grid-template-columns: 210px minmax(0, 1fr); padding: 26px; gap: 30px; }
    .degree-artwork { min-height: 156px; }
    .degree-lettering { font-size: 5.4rem; }
    .school-emblem { width: 76px; height: 76px; }
    .row-arrow { display: none; }
}

@media (max-width: 520px) {
    .education-heading { margin-bottom: 22px; }
    .education-row { grid-template-columns: 118px minmax(0, 1fr); padding: 22px 14px; gap: 16px; background: transparent; }
    .degree-artwork { min-height: 138px; }
    .degree-artwork::before, .degree-artwork::after { inset: 29px 0 10px; }
    .degree-caption { top: 51px; left: 12px; font-size: .42rem; letter-spacing: .14em; }
    .degree-lettering { top: 78px; left: 6px; font-size: 3.5rem; text-shadow: 3px 3px 0 var(--education-layer), 5px 6px 0 var(--education-ink); }
    .school-emblem { top: -4px; right: -2px; width: 56px; height: 56px; padding: 3px; }
    .education-copy { padding: 0; }
    .school-line { gap: 7px; }
    h4 { font-size: .95rem; line-height: 1.5; }
    .education-major { margin-top: 10px; font-size: 1.15rem; letter-spacing: -.02em; }
    .major-english { font-size: .6rem; letter-spacing: .025em; }
    .education-status { padding: 2px 6px; font-size: .6rem; }
    .education-list { box-shadow: 6px 6px 0 var(--education-layer), 11px 11px 0 var(--education-ink); }
    :global(html[data-theme="dark"] .education-list) { box-shadow: 6px 6px 0 #e5222d, 11px 11px 0 #000; }
}

@media (prefers-reduced-motion: reduce) {
    .degree-artwork { transition: none; }
}
</style>
