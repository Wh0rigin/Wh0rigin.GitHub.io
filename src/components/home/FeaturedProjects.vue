<script setup lang="ts">
import WiredAction from '../ui/WiredAction.vue';
import WiredBadge from '../ui/WiredBadge.vue';
import WiredAccent from '../ui/WiredAccent.vue';
const projects = [
    {
        number: '01',
        name: 'Result Cache',
        repo: 'pi-result-cache',
        category: 'AGENT TOOLS',
        headline: '让重复的工具输出变短。',
        description: '为 Pi Coding Agent 压缩完全重复的 read / grep 结果，让上下文少一点重复，多一点空间。',
        detail: '附 A/B 实验、对比图表与复现说明',
        tags: ['TypeScript', 'Pi Extension', 'SHA-256'],
        symbol: 'cache',
    },
    {
        number: '02',
        name: 'Thinking Router',
        repo: 'pi-thinking-router-jev',
        category: 'ADAPTIVE REASONING',
        headline: '给不同任务，合适的思考深度。',
        description: '根据任务状态与执行反馈调整 Pi 的推理档位，结合 Jev 与本地规则，在稳定和失败之间寻找节奏。',
        detail: '含防抖、手动接管与决策日志',
        tags: ['TypeScript', 'Jev', 'Pi Extension'],
        symbol: 'router',
    },
    {
        number: '03',
        name: 'Email Notification',
        repo: 'dsh-email-notification',
        category: 'WORKFLOW AUTOMATION',
        headline: '任务完成了，邮箱告诉你。',
        description: '为 DeepSeek Harness 加入可选的 Email 会话模式，任务完成后通过 SMTP 发送请求与回复的摘要。',
        detail: '提供配置界面、安装指南与使用示例',
        tags: ['JavaScript', 'Python', 'SMTP'],
        symbol: 'mail',
    },
    {
        number: '04',
        name: 'Crack Detection',
        repo: 'yolov8-crack',
        category: 'COMPUTER VISION',
        headline: '从图像里，发现细小的裂缝。',
        description: '基于 YOLOv8 的基建裂缝目标检测实践，涵盖数据标注转换、模型训练与批量图像推理。',
        detail: '包含训练、推理脚本与评估图示',
        tags: ['Python', 'YOLOv8', 'PyTorch'],
        symbol: 'vision',
    },
];
</script>

<template>
    <section id="projects" class="projects-section" aria-labelledby="projects-title">
        <div class="projects-heading">
            <div>
                <WiredBadge as="p" class="projects-eyebrow">Selected work / Open source</WiredBadge>
                <h3 id="projects-title">代码里的<WiredAccent :depth="3" class="projects-title-accent">一些想法</WiredAccent></h3>
                <p class="projects-intro">从开发工具到视觉识别，这是我想与你分享的几个开源项目。</p>
            </div>
            <WiredAction variant="paper" arrow="up-right" class="all-projects" href="https://github.com/Wh0rigin?tab=repositories" target="_blank" rel="noopener noreferrer">全部仓库</WiredAction>
        </div>

        <ol class="projects-grid">
            <li v-for="project in projects" :key="project.repo" class="project-item">
                <article class="project-card wired-panel wired-panel--interactive">
                    <div class="project-topline">
                        <WiredBadge flat class="project-category">{{ project.category }}</WiredBadge>
                        <span class="project-number" aria-hidden="true">{{ project.number }}</span>
                    </div>

                    <div class="project-titleline">
                        <div class="project-symbol" aria-hidden="true">
                            <svg v-if="project.symbol === 'cache'" viewBox="0 0 64 64">
                                <path d="M13 15h27v26H13zM23 23h27v26H23M19 22h14M19 29h10M30 33h13M30 40h9" />
                            </svg>
                            <svg v-else-if="project.symbol === 'router'" viewBox="0 0 64 64">
                                <path d="M12 48h40M16 41v-9M27 41V24M38 41V16M49 41V8M12 24l15-12 11 2 11-8" />
                            </svg>
                            <svg v-else-if="project.symbol === 'mail'" viewBox="0 0 64 64">
                                <path d="M10 18h44v31H10zM11 20l21 16 21-16M11 47l14-12M53 47 39 35M44 12h12M48 7h8" />
                            </svg>
                            <svg v-else viewBox="0 0 64 64">
                                <path d="M10 23V10h13M41 10h13v13M54 41v13H41M23 54H10V41M36 13l-9 13 10 5-11 10 4 11M15 33h9M41 33h8" />
                            </svg>
                        </div>
                        <div class="project-titlecopy">
                            <h4 lang="en">{{ project.name }}</h4>
                            <p class="project-repo">{{ project.repo }}</p>
                        </div>
                    </div>

                    <p class="project-headline">{{ project.headline }}</p>
                    <p class="project-description">{{ project.description }}</p>
                    <ul class="project-tags wired-tags" aria-label="技术与工具">
                        <WiredBadge v-for="tag in project.tags" :key="tag" as="li" variant="tag" flat class="project-tag">{{ tag }}</WiredBadge>
                    </ul>

                    <div class="project-footer">
                        <p class="project-detail">{{ project.detail }}</p>
                        <WiredAction arrow="up-right" class="project-link" :href="`https://github.com/Wh0rigin/${project.repo}`" target="_blank" rel="noopener noreferrer" :aria-label="`在 GitHub 查看 ${project.repo}（新标签页打开）`">查看项目</WiredAction>
                    </div>
                </article>
            </li>
        </ol>
        <p class="projects-signoff" aria-hidden="true"><span>BUILT WITH CURIOSITY.</span><span>WH0RIGIN / CODE ARCHIVE</span></p>
    </section>
</template>

<style scoped lang="less">
.projects-section {
    grid-column: 1 / -1;
    min-width: 0;
    scroll-margin-top: 6.25rem;
    --project-accent: var(--ui-accent);
    --project-layer: var(--ui-layer);
    --project-ink: var(--ui-ink);
    --project-muted: var(--ui-muted);
    --project-tint: var(--ui-tint);
    --project-line: var(--ui-line);
    --title-middle: var(--ui-layer);
    --title-underlay: var(--ui-ink);
    --title-offset: 0.5rem;
}

.projects-heading {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 1.5rem;
    margin-bottom: 2rem;
}

.projects-eyebrow {
    margin-bottom: 1rem;
    --ui-badge-size: .7rem;
    --ui-badge-bg: var(--project-accent);
    --ui-badge-shadow: 0.25rem 0.25rem 0 var(--project-layer);
}

h3 {
    color: #fff;
    font-size: clamp(1.8rem, 3.5vw, 2.8rem);
    font-style: italic;
    font-weight: 950;
    letter-spacing: -.065em;
    line-height: 1.35;
    text-shadow: 0.1875rem 0.1875rem 0 var(--project-ink);
}

.projects-title-accent {
    margin-left: .15em;
    --ui-accent-padding: .03em .23em .04em;
    --ui-accent-transform: rotate(-2deg) skewX(-5deg);
    --ui-accent-shape: polygon(3% 5%, 100% 0, 96% 93%, 0 100%);
    --ui-accent-bg: var(--project-accent);
    --ui-accent-layer: var(--title-middle);
    --ui-accent-back: var(--title-underlay);
    --ui-accent-offset: var(--title-offset);
    --ui-accent-layer-angle: 1.5deg;
}

.projects-intro {
    margin-top: 1.4375rem;
    color: #e9f8ff;
    font-size: .85rem;
    line-height: 1.8;
}

.all-projects {
    flex-shrink: 0;
    --ui-action-gap: 0.875rem;
    --ui-action-height: 2.75rem;
    --ui-action-padding: 0.625rem 0.9375rem;
    --ui-action-size: .8rem;
    --ui-action-layer: var(--project-layer);
    --ui-action-transform: skewX(-7deg);
    --ui-action-skew: 0deg;
    --ui-action-hover-x: 0.125rem;
    --ui-action-hover-y: -0.125rem;
}

.projects-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.875rem;
    list-style: none;
}

.project-item { min-width: 0; }

.project-card {
    position: relative;
    isolation: isolate;
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 1.625rem 1.75rem 1.375rem;
    --ui-panel-back: var(--project-ink);
    --ui-panel-shadow: 0.4375rem 0.5rem 0 var(--project-layer), 0.75rem 0.8125rem 0 var(--ui-panel-back);
    --ui-panel-hover-shadow: 0.625rem 0.75rem 0 var(--project-layer), 0.9375rem 1.0625rem 0 var(--ui-panel-back);
}

.project-card::before {
    position: absolute;
    z-index: -1;
    top: 0;
    right: 0;
    width: 46%;
    height: 9.375rem;
    background: var(--project-tint);
    clip-path: polygon(40% 0, 100% 0, 100% 100%, 0 61%);
    content: '';
}

.project-topline {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    min-height: 2.9375rem;
    margin-bottom: 1.375rem;
}

.project-category {
    position: relative;
    z-index: 1;
    --ui-badge-padding: 0.3125rem 0.5625rem;
    --ui-badge-color: #fff;
    --ui-badge-bg: var(--project-accent);
    --ui-badge-size: .58rem;
    --ui-badge-tracking: .14em;
    --ui-badge-transform: skewX(-9deg) rotate(-2deg);
}

.project-number {
    color: var(--project-accent);
    font-family: var(--font-display);
    font-size: 4.1rem;
    font-style: italic;
    font-weight: 1000;
    letter-spacing: -.12em;
    line-height: .75;
    text-shadow: 0.1875rem 0.1875rem 0 var(--project-layer);
    transform: rotate(7deg);
}

.project-titleline { display: flex; align-items: center; gap: 1.125rem; }
.project-titlecopy { min-width: 0; }

.project-symbol {
    flex: 0 0 3.625rem;
    height: 3.625rem;
    color: var(--project-accent);
    background: var(--project-tint);
    box-shadow: 0.25rem 0.25rem 0 var(--project-layer);
    transform: rotate(-5deg);
}

.project-symbol svg { width: 100%; height: 100%; fill: none; stroke: currentColor; stroke-width: 2.5; stroke-linecap: square; stroke-linejoin: miter; }

h4 {
    color: var(--project-ink);
    font-size: clamp(1.35rem, 2.4vw, 1.9rem);
    font-style: italic;
    font-weight: 950;
    letter-spacing: -.055em;
    line-height: 1.1;
}

.project-repo {
    margin-top: 0.5625rem;
    color: var(--project-muted);
    font-family: var(--font-mono);
    font-size: .67rem;
    line-height: 1.5;
    overflow-wrap: anywhere;
}

.project-headline { margin-top: 1.5rem; font-size: 1rem; font-weight: 850; line-height: 1.6; }
.project-description { margin-top: 0.5625rem; color: var(--project-muted); font-size: .85rem; line-height: 1.9; text-wrap: pretty; }

.project-tags {
    --ui-tags-gap: 0.4375rem;
    margin-top: 1.1875rem;
    margin-bottom: 1.375rem;
}

.project-tag {
    --ui-badge-padding: 0.25rem 0.5rem;
    --ui-badge-border: var(--project-line);
    --ui-badge-bg: var(--project-tint);
    --ui-badge-size: .61rem;
    --ui-badge-weight: 750;
    --ui-badge-tracking: normal;
    --ui-badge-line-height: 1.4;
}

.project-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin-top: auto;
    padding-top: 1.0625rem;
    border-top: 0.0625rem solid var(--project-line);
}

.project-detail { color: var(--project-muted); font-size: .67rem; line-height: 1.7; }

.project-link {
    flex-shrink: 0;
    --ui-action-bg: var(--project-accent);
    --ui-action-layer: var(--project-layer);
    --ui-action-gap: 0.5625rem;
    --ui-action-height: 2.75rem;
    --ui-action-padding: 0.625rem 0.875rem;
    --ui-action-size: .73rem;
    --ui-action-offset: 0.25rem;
    --ui-action-hover-x: 0.125rem;
    --ui-action-hover-y: -0.125rem;
}

.projects-signoff {
    display: flex;
    justify-content: space-between;
    gap: 1.25rem;
    margin-top: 2rem;
    color: #fff;
    font-size: .6rem;
    font-weight: 750;
    letter-spacing: .17em;
    line-height: 1.6;
}

:global(html[data-theme="dark"] .projects-section) {
    --title-middle: #08080a;
    --title-underlay: #f6f2ec;
}

:global(html[data-theme="dark"] .project-card) { --ui-panel-border: rgba(255, 255, 255, .7); --ui-panel-back: #000; }
:global(html[data-theme="dark"] .project-number) { color: #f6f2ec; text-shadow: 0.1875rem 0.1875rem 0 #e5222d, 0.3125rem 0.3125rem 0 #08080a; }
:global(html[data-theme="dark"] .project-link) { --ui-action-layer: var(--ui-action-underlay); }
:global(html[data-theme="dark"] .project-symbol) { color: #f6f2ec; background: #08080a; }
:global(html[data-theme="dark"] .projects-intro) { color: #bfb4b9; }
:global(html[data-theme="dark"] .projects-heading h3) { text-shadow: 0.1875rem 0.1875rem 0 #08080a; }

@media (max-width: 820px) {
    .projects-grid { grid-template-columns: 1fr; gap: 1.625rem; }
    .project-card { padding: 1.5625rem 1.75rem 1.375rem; }
    h4 { font-size: 1.8rem; }
}

@media (max-width: 520px) {
    .projects-section { --title-offset: 0.3125rem; }
    .projects-heading { align-items: flex-start; flex-direction: column; gap: 1.125rem; margin-bottom: 1.625rem; }
    .projects-eyebrow { --ui-badge-size: .6rem; --ui-badge-tracking: .1em; }
    h3 { font-size: clamp(1.5rem, 7vw, 2rem); }
    .projects-intro { font-size: .8rem; }
    .project-card { padding: 1.375rem 1.25rem 1.25rem; --ui-panel-shadow: 0.3125rem 0.375rem 0 var(--project-layer), 0.5625rem 0.625rem 0 var(--ui-panel-back); }
    .project-topline { margin-bottom: 1.125rem; }
    .project-number { font-size: 3.7rem; }
    .project-titleline { gap: 0.875rem; }
    .project-symbol { flex-basis: 3rem; height: 3rem; }
    h4 { font-size: clamp(1.2rem, 6vw, 1.65rem); }
    .project-repo { font-size: .61rem; }
    .project-headline { font-size: .9rem; }
    .project-description { font-size: .8rem; }
    .project-footer { flex-wrap: wrap; gap: 0.75rem; }
    .project-detail { flex: 1 1 8.125rem; }
    .projects-signoff { font-size: .51rem; letter-spacing: .08em; }
    .projects-signoff span:last-child { text-align: right; }
}

</style>
