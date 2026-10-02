<script setup lang="ts">
import WiredAction from '../ui/WiredAction.vue';
</script>

<template>
    <article id="acg" class="acg-card wired-panel" aria-labelledby="acg-title">
        <div class="acg-artwork" aria-hidden="true">
            <div class="tatami-poster">
                <span class="poster-kicker">MY FAVORITE / ANIMATION</span>
                <span class="tatami-number">4<sup>½</sup></span>
                <div class="tatami-plan">
                    <span class="mat mat-one"></span><span class="mat mat-two"></span>
                    <span class="mat mat-three"></span><span class="mat mat-four"></span>
                    <span class="mat mat-center"></span>
                </div>
                <div class="poster-title"><span>四叠半</span><strong>神话大系</strong></div>
                <span class="poster-english" lang="en">THE TATAMI GALAXY</span>
                <span class="poster-note">良机就在眼前。</span>
            </div>
            <span class="artwork-index">ANIME · COMICS · STORIES</span>
        </div>

        <div class="acg-copy">
            <p class="acg-eyebrow wired-kicker"><span class="wired-kicker-mark" aria-hidden="true"></span> ACG I LOVE</p>
            <h3 id="acg-title">我喜欢的 ACG</h3>
            <p class="acg-intro">从动画到漫画，在故事里寻找新的好奇心。</p>
            <dl class="acg-details">
                <div>
                    <dt>最喜欢的动画</dt>
                    <dd class="acg-favorite">四叠半神话大系</dd>
                </div>
                <div>
                    <dt>也影响过我的动画</dt>
                    <dd>铃音 <span>／</span> 攻壳机动队 <span>／</span> 虫师</dd>
                </div>
                <div>
                    <dt>喜欢的漫画家</dt>
                    <dd>安达充 <span>／</span> 藤本树 <span>／</span> 浅野一二〇</dd>
                </div>
            </dl>
            <WiredAction
                class="acg-link"
                href="https://bgm.tv/user/wh0rigin"
                arrow="up-right"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="在 BGM.tv 查看我的追番记录（新标签页打开）"
            >在 BGM.tv 查看我的追番记录</WiredAction>
        </div>
    </article>
</template>

<style scoped>
.acg-card {
    position: relative;
    grid-column: 1 / -1;
    display: grid;
    grid-template-columns: minmax(280px, .9fr) minmax(0, 1.1fr);
    align-items: center;
    gap: clamp(24px, 5vw, 64px);
    padding: clamp(24px, 4vw, 48px);
    border-radius: var(--panel-radius);
    scroll-margin-top: var(--layout-anchor-offset);
    --ui-panel-bg: linear-gradient(112deg, var(--ui-paper) 0 72%, var(--ui-tint) 72%);
    --ui-panel-border-width: 3px;
    --ui-panel-shadow: 11px 11px 0 var(--ui-layer), 17px 17px 0 var(--ui-stage-shadow);
}

.acg-artwork {
    position: relative;
    display: grid;
    place-items: center;
    min-width: 0;
    min-height: 340px;
    padding: 18px 18px 28px;
}

.tatami-poster {
    position: relative;
    isolation: isolate;
    width: min(100%, 318px);
    aspect-ratio: 1;
    color: var(--ui-label-text);
    transform: rotate(-5deg);
}

.tatami-poster::before,
.tatami-poster::after {
    position: absolute;
    z-index: -1;
    inset: 0;
    content: '';
}

.tatami-poster::before {
    border: 2px solid var(--ui-ink);
    background: var(--ui-accent);
    box-shadow: 8px 8px 0 var(--ui-layer), 14px 14px 0 var(--ui-stage-shadow);
}

.tatami-poster::after {
    background: repeating-linear-gradient(135deg, transparent 0 18px, #ffffff12 18px 19px);
    clip-path: polygon(72% 0, 100% 0, 100% 100%, 18% 100%);
}

.poster-kicker {
    position: absolute;
    top: 19px;
    left: 21px;
    font-size: .54rem;
    font-weight: 850;
    letter-spacing: .15em;
}

.tatami-number {
    position: absolute;
    top: 30px;
    left: 13px;
    font-family: var(--font-display);
    font-size: clamp(6rem, 9vw, 7rem);
    font-weight: 950;
    font-style: italic;
    letter-spacing: -.09em;
    line-height: 1;
}

.tatami-number sup {
    position: relative;
    top: -.16em;
    margin-left: .12em;
    font-size: .43em;
    vertical-align: baseline;
}

.tatami-plan {
    position: absolute;
    top: 49px;
    right: 21px;
    width: 111px;
    aspect-ratio: 1;
    display: grid;
    grid-template: repeat(3, 1fr) / repeat(3, 1fr);
    gap: 3px;
    border: 2px solid currentColor;
    padding: 5px;
    transform: rotate(13deg);
    opacity: .8;
}

.mat {
    border: 1px solid currentColor;
    background: repeating-linear-gradient(0deg, transparent 0 5px, #ffffff35 5px 6px);
}
.mat-one { grid-area: 1 / 1 / 2 / 3; }
.mat-two { grid-area: 1 / 3 / 3 / 4; }
.mat-three { grid-area: 3 / 2 / 4 / 4; }
.mat-four { grid-area: 2 / 1 / 4 / 2; }
.mat-center { grid-area: 2 / 2 / 3 / 3; background: var(--ui-layer); }

.poster-title {
    position: absolute;
    top: 44%;
    left: -8px;
    right: 8px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
    font-size: clamp(2.1rem, 4vw, 2.75rem);
    font-weight: 950;
    letter-spacing: -.065em;
    line-height: 1.18;
    transform: rotate(-3deg);
}

.poster-title span,
.poster-title strong { padding: 3px 13px 5px; }
.poster-title span { color: var(--ui-accent); background: var(--ui-paper); }
.poster-title strong { margin-left: 18px; color: var(--ui-paper-action-text); background: var(--ui-layer); box-shadow: 5px 5px 0 var(--ui-stage-shadow); }

.poster-english,
.poster-note { position: absolute; left: 20px; font-size: .56rem; font-weight: 800; letter-spacing: .08em; }
.poster-english { bottom: 29px; }
.poster-note { bottom: 13px; opacity: .8; }
.artwork-index { position: absolute; bottom: 0; font-size: .54rem; font-weight: 800; letter-spacing: .18em; color: var(--ui-muted); }

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

@media (max-width: 820px) {
    .acg-card { grid-template-columns: 1fr; gap: 24px; }
    .acg-artwork { width: min(100%, 390px); margin: 0 auto; }
    .acg-copy { max-width: none; }
    .tatami-number { font-size: 7rem; }
    .poster-title { font-size: 2.75rem; }
}

@media (max-width: 520px) {
    .acg-card { padding: 20px; --ui-panel-shadow: 6px 6px 0 var(--ui-layer), 11px 11px 0 var(--ui-stage-shadow); }
    .acg-artwork { min-height: 0; padding: 14px 14px 34px; }
    .tatami-poster { aspect-ratio: .9; }
    .tatami-number { font-size: clamp(5rem, 25vw, 7rem); }
    .tatami-plan { top: 43px; right: 17px; width: 33%; }
    .poster-title { top: 46%; font-size: clamp(1.7rem, 9.5vw, 2.75rem); }
    .poster-english { bottom: 24px; font-size: .5rem; }
    .poster-note { bottom: 10px; font-size: .5rem; }
    .poster-kicker { top: 15px; left: 16px; font-size: .48rem; }
    .acg-details dd { font-size: .92rem; }
    .acg-link { --ui-action-size: .75rem; --ui-action-padding: 12px 14px; }
}

@media (max-width: 360px) {
    .poster-title { font-size: 1.65rem; }
}
</style>
