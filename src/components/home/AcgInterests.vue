<script setup lang="ts">
import WiredAction from '../ui/WiredAction.vue';
import WiredBadge from '../ui/WiredBadge.vue';

const covers = [
    { id: 2582, title: '铃音', kind: 'ANIME', detail: 'Serial Experiments Lain', image: 'lain', width: 400, height: 570 },
    { id: 237, title: '攻壳机动队', kind: 'ANIME', detail: 'Ghost in the Shell', image: 'ghost-in-the-shell', width: 400, height: 548 },
    { id: 340, title: '虫师', kind: 'ANIME', detail: 'Mushishi', image: 'mushishi', width: 400, height: 566 },
    { id: 32693, title: 'H2 好逑双物语', kind: 'MANGA', detail: '安达充', image: 'h2', width: 239, height: 384 },
    { id: 377599, title: '再见绘梨', kind: 'MANGA', detail: '藤本树', image: 'goodbye-eri', width: 400, height: 629 },
    { id: 36261, title: '晚安，布布', kind: 'MANGA', detail: '浅野一二〇', image: 'goodnight-punpun', width: 400, height: 555 },
];
</script>

<template>
    <article id="acg" class="acg-card wired-panel" aria-labelledby="acg-title">
        <figure class="acg-artwork">
            <span class="tatami-number" aria-hidden="true">4<sup>½</sup></span>
            <a class="favorite-cover" href="https://bgm.tv/subject/4019" target="_blank" rel="noopener noreferrer" aria-label="在 BGM.tv 查看四叠半神话大系（新标签页打开）">
                <WiredBadge flat class="favorite-label">MY FAVORITE / 01</WiredBadge>
                <img src="/acg/tatami-galaxy.jpg" alt="《四叠半神话大系》动画封面" width="800" height="1142" loading="lazy" decoding="async" />
            </a>
            <img class="mochiguma-decoration" src="/acg/mochiguma.svg" alt="" aria-hidden="true" width="300" height="310" draggable="false" />
            <figcaption class="favorite-caption"><strong>良机就在眼前。</strong><span lang="en">THE TATAMI GALAXY</span></figcaption>
        </figure>

        <div class="acg-copy">
            <p class="acg-eyebrow wired-kicker"><span class="wired-kicker-mark" aria-hidden="true"></span> ACG I LOVE</p>
            <h3 id="acg-title">我喜欢的 ACG</h3>
            <p class="acg-intro">从动画到漫画，在故事里寻找新的好奇心。</p>
            <dl class="acg-details">
                <div><dt>最喜欢的动画</dt><dd class="acg-favorite">四叠半神话大系</dd></div>
                <div><dt>也影响过我的动画</dt><dd>铃音 <span>／</span> 攻壳机动队 <span>／</span> 虫师</dd></div>
                <div><dt>喜欢的漫画家</dt><dd>安达充 <span>／</span> 藤本树 <span>／</span> 浅野一二〇</dd></div>
            </dl>
            <WiredAction class="acg-link" href="https://bgm.tv/user/wh0rigin" arrow="up-right" target="_blank" rel="noopener noreferrer" aria-label="在 BGM.tv 查看我的追番记录（新标签页打开）">在 BGM.tv 查看我的追番记录</WiredAction>
        </div>

        <section class="cover-shelf" aria-labelledby="cover-shelf-title">
            <div class="shelf-heading">
                <h4 id="cover-shelf-title">故事的切片<span lang="en">ANIMATION / COMICS</span></h4>
                <p class="shelf-hint">点击封面查看作品<span class="mobile-shelf-hint"> · 左右滑动</span></p>
            </div>
            <ul class="cover-list">
                <li v-for="cover in covers" :key="cover.id">
                    <a class="cover-link" :href="`https://bgm.tv/subject/${cover.id}`" target="_blank" rel="noopener noreferrer" :aria-label="`在 BGM.tv 查看 ${cover.title}（新标签页打开）`">
                        <div class="cover-frame">
                            <img :src="`/acg/${cover.image}.jpg`" :alt="`《${cover.title}》${cover.kind === 'ANIME' ? '动画' : '漫画'}封面`" :width="cover.width" :height="cover.height" loading="lazy" decoding="async" />
                            <WiredBadge flat class="cover-kind">{{ cover.kind }}</WiredBadge>
                        </div>
                        <strong class="cover-title">{{ cover.title }}</strong>
                        <span class="cover-detail">{{ cover.detail }}</span>
                    </a>
                </li>
            </ul>
        </section>
    </article>
</template>

<style scoped>
.acg-card {
    position: relative;
    grid-column: 1 / -1;
    display: grid;
    grid-template-columns: minmax(280px, .9fr) minmax(0, 1.1fr);
    align-items: center;
    gap: 38px clamp(24px, 5vw, 64px);
    padding: clamp(24px, 4vw, 48px);
    border-radius: var(--panel-radius);
    scroll-margin-top: var(--layout-anchor-offset);
    --ui-panel-bg: linear-gradient(112deg, var(--ui-paper) 0 72%, var(--ui-tint) 72%);
    --ui-panel-border-width: 3px;
    --ui-panel-shadow: 11px 11px 0 var(--ui-layer), 17px 17px 0 var(--ui-stage-shadow);
}

.acg-artwork { position: relative; isolation: isolate; display: grid; justify-items: center; gap: 26px; min-width: 0; margin: 0; padding: 20px 18px 0; }
.tatami-number { position: absolute; z-index: -1; right: -8px; bottom: 28px; color: var(--ui-accent); font: italic 950 11.5rem/1 var(--font-display); letter-spacing: -.09em; opacity: .13; }
.tatami-number sup { margin-left: .1em; font-size: .43em; vertical-align: baseline; }
.favorite-cover { position: relative; isolation: isolate; display: block; width: min(100%, 245px); padding: 9px; border: 2px solid var(--ui-ink); color: var(--ui-copy); background: var(--ui-paper); box-shadow: 8px 8px 0 var(--ui-layer), 14px 14px 0 var(--ui-stage-shadow); transform: rotate(-4deg); transition: transform var(--motion-panel) var(--ease-out), box-shadow var(--motion-panel) var(--ease-out); }
.favorite-cover img { display: block; width: 100%; height: auto; }
.favorite-label { position: absolute; z-index: 1; top: -14px; left: -13px; --ui-badge-size: .58rem; --ui-badge-padding: 7px 12px; --ui-badge-transform: rotate(-2deg) skewX(-8deg); }
.mochiguma-decoration { position: absolute; z-index: 2; right: -4px; bottom: 74px; width: clamp(102px, 10vw, 128px); height: auto; transform: rotate(8deg); filter: drop-shadow(4px 6px 0 var(--ui-layer)); pointer-events: none; user-select: none; }
.favorite-caption { position: relative; text-align: center; }
.favorite-caption strong { display: block; font-size: 1.08rem; font-style: italic; letter-spacing: .06em; }
.favorite-caption span { display: block; margin-top: 6px; font-size: .53rem; font-weight: 800; letter-spacing: .2em; color: var(--ui-muted); }
.acg-copy { min-width: 0; max-width: 520px; }
.acg-eyebrow { margin-bottom: 14px; color: var(--accent-strong); --ui-kicker-size: .76rem; --ui-kicker-tracking: .17em; }
.acg-copy h3 { font-size: clamp(1.8rem, 3.2vw, 2.5rem); font-weight: 900; font-style: italic; letter-spacing: -.055em; }
.acg-intro { margin-top: 10px; color: var(--text-muted); line-height: 1.7; }
.acg-details { display: grid; gap: 17px; margin-top: 28px; }
.acg-details > div { display: grid; gap: 5px; }
.acg-details dt { color: var(--text-muted); font-size: .78rem; font-weight: 650; }
.acg-details dd { font-size: 1rem; font-weight: 750; line-height: 1.7; }
.acg-details .acg-favorite { color: var(--accent-strong); font-size: 1.2rem; }
.acg-details dd span { margin: 0 3px; color: var(--ui-muted); font-weight: 400; }
.acg-link { margin: 28px 5px 5px; max-width: calc(100% - 10px); --ui-action-size: .82rem; --ui-action-gap: 12px; }
.cover-shelf { grid-column: 1 / -1; min-width: 0; padding-top: 26px; border-top: 1px solid var(--ui-line); }
.shelf-heading { display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-bottom: 24px; }
.shelf-heading h4 { font-size: 1rem; font-style: italic; font-weight: 850; }
.shelf-heading h4 span { display: inline-block; margin-left: 14px; font-size: .53rem; letter-spacing: .14em; color: var(--ui-muted); }
.shelf-hint { font-size: .64rem; color: var(--ui-muted); }
.mobile-shelf-hint { display: none; }
.cover-list { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 22px; list-style: none; padding: 0 5px 0 0; margin: 0; scrollbar-width: none; }
.cover-list::-webkit-scrollbar { display: none; }
.cover-list li { min-width: 0; }
.cover-link { display: block; color: inherit; text-decoration: none; }
.cover-frame { position: relative; aspect-ratio: 2 / 3; padding: 5px; border: 1px solid var(--ui-ink); background: var(--ui-paper); box-shadow: 5px 5px 0 var(--ui-layer); transform: rotate(-2deg); transition: transform var(--motion-panel) var(--ease-out), box-shadow var(--motion-panel) var(--ease-out); }
.cover-list li:nth-child(even) .cover-frame { transform: rotate(2deg); }
.cover-frame img { display: block; width: 100%; height: 100%; object-fit: contain; }
.cover-kind { position: absolute; bottom: -9px; left: 4px; --ui-badge-size: .46rem; --ui-badge-padding: 4px 7px; --ui-badge-tracking: .12em; }
.cover-title { display: block; margin-top: 20px; font-size: .8rem; line-height: 1.5; }
.cover-detail { display: block; margin-top: 4px; color: var(--ui-muted); font-size: .59rem; line-height: 1.6; }
.favorite-cover:focus-visible, .cover-link:focus-visible { outline: 3px solid var(--ui-layer); outline-offset: 8px; }

@media (hover: hover) and (pointer: fine) {
    .favorite-cover:hover { transform: translateY(-4px) rotate(-1deg); box-shadow: 10px 12px 0 var(--ui-layer), 16px 18px 0 var(--ui-stage-shadow); }
    .cover-link:hover .cover-frame { transform: translateY(-4px) rotate(0); box-shadow: 6px 9px 0 var(--ui-layer); }
    .cover-link:hover .cover-title { color: var(--accent-strong); }
}
@media (max-width: 820px) {
    .acg-card { grid-template-columns: 1fr; gap: 32px; }
    .acg-artwork { width: min(100%, 390px); margin: 0 auto; }
    .acg-copy { max-width: none; }
    .cover-list { gap: 16px; }
}
@media (max-width: 680px) {
    .shelf-heading { flex-wrap: wrap; gap: 8px; margin-bottom: 10px; }
    .shelf-heading h4 span { margin-left: 10px; }
    .mobile-shelf-hint { display: inline; }
    .cover-list { display: flex; gap: 18px; overflow-x: auto; overscroll-behavior-x: contain; scroll-snap-type: x proximity; padding: 12px 9px 14px; margin: 0 -9px; }
    .cover-list li { flex: 0 0 118px; scroll-snap-align: start; }
    .cover-link { margin: 4px; }
}
@media (max-width: 520px) {
    .acg-card { padding: 20px; --ui-panel-shadow: 6px 6px 0 var(--ui-layer), 11px 11px 0 var(--ui-stage-shadow); }
    .acg-artwork { padding: 16px 14px 0; }
    .favorite-cover { width: min(100%, 218px); }
    .mochiguma-decoration { right: -3px; bottom: 72px; width: clamp(82px, 25vw, 108px); }
    .tatami-number { right: -5px; font-size: 9rem; }
    .acg-details dd { font-size: .92rem; }
    .acg-link { --ui-action-size: .75rem; --ui-action-padding: 12px 14px; }
}
@media (prefers-reduced-motion: reduce) {
    .favorite-cover, .cover-frame { transition: none; }
}
</style>
