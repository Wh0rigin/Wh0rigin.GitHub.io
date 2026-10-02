<script setup lang="ts">
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
                <p class="projects-eyebrow">Selected work / Open source</p>
                <h3 id="projects-title">代码里的<span>一些想法</span></h3>
                <p class="projects-intro">从开发工具到视觉识别，这是我想与你分享的几个开源项目。</p>
            </div>
            <a class="all-projects" href="https://github.com/Wh0rigin?tab=repositories" target="_blank" rel="noopener noreferrer">
                <span>全部仓库</span>
                <svg aria-hidden="true" viewBox="0 0 20 20"><path d="M5 15 15 5M5 5h10v10" /></svg>
            </a>
        </div>

        <ol class="projects-grid">
            <li v-for="project in projects" :key="project.repo" class="project-item">
                <article class="project-card">
                    <div class="project-topline">
                        <span class="project-category">{{ project.category }}</span>
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
                    <ul class="project-tags" aria-label="技术与工具">
                        <li v-for="tag in project.tags" :key="tag">{{ tag }}</li>
                    </ul>

                    <div class="project-footer">
                        <p class="project-detail">{{ project.detail }}</p>
                        <a class="project-link" :href="`https://github.com/Wh0rigin/${project.repo}`" target="_blank" rel="noopener noreferrer" :aria-label="`在 GitHub 查看 ${project.repo}（新标签页打开）`">
                            <span>查看项目</span>
                            <svg aria-hidden="true" viewBox="0 0 20 20"><path d="M5 15 15 5M5 5h10v10" /></svg>
                        </a>
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
    scroll-margin-top: 100px;
    --project-accent: #003eaa;
    --project-layer: #19d9e9;
    --project-ink: #002578;
    --project-paper: #faffff;
    --project-text: #142957;
    --project-muted: #526886;
    --project-tint: #e9faff;
    --project-line: rgba(0, 59, 158, .19);
}

.projects-heading {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 24px;
    margin-bottom: 32px;
}

.projects-eyebrow {
    display: inline-block;
    margin-bottom: 16px;
    padding: 6px 11px;
    color: #fff;
    background: var(--project-accent);
    box-shadow: 4px 4px 0 var(--project-layer);
    font-size: .7rem;
    font-weight: 850;
    letter-spacing: .15em;
    text-transform: uppercase;
    transform: skewX(-10deg);
}

h3 {
    color: #fff;
    font-size: clamp(1.8rem, 3.5vw, 2.8rem);
    font-style: italic;
    font-weight: 950;
    letter-spacing: -.065em;
    line-height: 1.35;
    text-shadow: 3px 3px 0 var(--project-ink);
}

h3 span {
    display: inline-block;
    margin-left: .15em;
    padding: 0 .16em;
    background: var(--project-accent);
    transform: rotate(-2deg) skewX(-5deg);
}

.projects-intro {
    margin-top: 15px;
    color: #e9f8ff;
    font-size: .85rem;
    line-height: 1.8;
}

.all-projects {
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    gap: 14px;
    min-height: 44px;
    padding: 10px 15px;
    color: var(--project-ink);
    background: #fff;
    box-shadow: 5px 5px 0 var(--project-layer);
    font-size: .8rem;
    font-weight: 850;
    text-decoration: none;
    transform: skewX(-7deg);
}

.all-projects svg, .project-link svg {
    width: 19px;
    height: 19px;
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
    transition: transform 220ms cubic-bezier(.16, 1, .3, 1);
}

.projects-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 30px;
    list-style: none;
}

.project-item { min-width: 0; }

.project-card {
    position: relative;
    isolation: isolate;
    display: flex;
    flex-direction: column;
    height: 100%;
    min-width: 0;
    padding: 26px 28px 22px;
    border: 2px solid var(--project-ink);
    color: var(--project-text);
    background: var(--project-paper);
    box-shadow: 7px 8px 0 var(--project-layer), 12px 13px 0 var(--project-ink);
    transition: transform 320ms cubic-bezier(.16, 1, .3, 1), box-shadow 320ms cubic-bezier(.16, 1, .3, 1);
}

.project-card::before {
    position: absolute;
    z-index: -1;
    top: 0;
    right: 0;
    width: 46%;
    height: 150px;
    background: var(--project-tint);
    clip-path: polygon(40% 0, 100% 0, 100% 100%, 0 61%);
    content: '';
}

.project-topline {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    min-height: 47px;
    margin-bottom: 22px;
}

.project-category {
    position: relative;
    z-index: 1;
    padding: 5px 9px;
    color: #fff;
    background: var(--project-accent);
    font-size: .58rem;
    font-weight: 850;
    letter-spacing: .14em;
    transform: skewX(-9deg) rotate(-2deg);
}

.project-number {
    color: var(--project-accent);
    font-family: Arial, Helvetica, sans-serif;
    font-size: 4.1rem;
    font-style: italic;
    font-weight: 1000;
    letter-spacing: -.12em;
    line-height: .75;
    text-shadow: 3px 3px 0 var(--project-layer);
    transform: rotate(7deg);
}

.project-titleline { display: flex; align-items: center; gap: 18px; }
.project-titlecopy { min-width: 0; }

.project-symbol {
    flex: 0 0 58px;
    height: 58px;
    color: var(--project-accent);
    background: var(--project-tint);
    box-shadow: 4px 4px 0 var(--project-layer);
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
    margin-top: 9px;
    color: var(--project-muted);
    font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
    font-size: .67rem;
    line-height: 1.5;
    overflow-wrap: anywhere;
}

.project-headline { margin-top: 24px; font-size: 1rem; font-weight: 850; line-height: 1.6; }
.project-description { margin-top: 9px; color: var(--project-muted); font-size: .85rem; line-height: 1.9; text-wrap: pretty; }

.project-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 7px;
    margin-top: 19px;
    margin-bottom: 22px;
    list-style: none;
}

.project-tags li {
    padding: 4px 8px;
    border: 1px solid var(--project-line);
    color: var(--project-accent);
    background: var(--project-tint);
    font-size: .61rem;
    font-weight: 750;
    line-height: 1.4;
}

.project-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    margin-top: auto;
    padding-top: 17px;
    border-top: 1px solid var(--project-line);
}

.project-detail { color: var(--project-muted); font-size: .67rem; line-height: 1.7; }

.project-link {
    position: relative;
    isolation: isolate;
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    gap: 9px;
    min-height: 44px;
    padding: 10px 14px;
    color: #fff;
    font-size: .73rem;
    font-weight: 850;
    text-decoration: none;
}

.project-link::before, .project-link::after {
    position: absolute;
    z-index: -1;
    inset: 0;
    background: var(--project-accent);
    transform: skewX(-9deg);
    content: '';
}

.project-link::after { z-index: -2; background: var(--project-layer); transform: translate(4px, 4px) skewX(-9deg); }
.project-link:focus-visible, .all-projects:focus-visible { outline: 3px solid var(--project-accent); outline-offset: 7px; }

.projects-signoff {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    margin-top: 32px;
    color: #fff;
    font-size: .6rem;
    font-weight: 750;
    letter-spacing: .17em;
    line-height: 1.6;
}

:global(html[data-theme="dark"] .projects-section) {
    --project-accent: #e5222d;
    --project-layer: #e5222d;
    --project-ink: #f6f2ec;
    --project-paper: #111115;
    --project-text: #f6f2ec;
    --project-muted: #bfb4b9;
    --project-tint: #2b1117;
    --project-line: rgba(255, 255, 255, .2);
}

:global(html[data-theme="dark"] .project-card) { border-color: rgba(255, 255, 255, .7); box-shadow: 7px 8px 0 #e5222d, 12px 13px 0 #000; }
:global(html[data-theme="dark"] .project-number) { color: #f6f2ec; text-shadow: 3px 3px 0 #e5222d, 5px 5px 0 #08080a; }
:global(html[data-theme="dark"] .all-projects) { color: #08080a; }
:global(html[data-theme="dark"] .project-link::after) { background: #f6f2ec; }
:global(html[data-theme="dark"] .project-symbol) { color: #f6f2ec; background: #08080a; }
:global(html[data-theme="dark"] .project-tags li) { color: #ff9da3; }
:global(html[data-theme="dark"] .projects-intro) { color: #bfb4b9; }
:global(html[data-theme="dark"] .projects-heading h3) { text-shadow: 3px 3px 0 #08080a; }

@media (hover: hover) and (pointer: fine) {
    .project-card:hover { transform: translate(-3px, -4px); box-shadow: 10px 12px 0 var(--project-layer), 15px 17px 0 var(--project-ink); }
    :global(html[data-theme="dark"] .project-card:hover) { box-shadow: 10px 12px 0 #e5222d, 15px 17px 0 #000; }
    .project-link:hover svg, .all-projects:hover svg { transform: translate(2px, -2px); }
}

@media (max-width: 820px) {
    .projects-grid { grid-template-columns: 1fr; gap: 26px; }
    .project-card { padding: 25px 28px 22px; }
    h4 { font-size: 1.8rem; }
}

@media (max-width: 520px) {
    .projects-heading { align-items: flex-start; flex-direction: column; gap: 18px; margin-bottom: 26px; }
    .projects-eyebrow { font-size: .6rem; letter-spacing: .1em; }
    h3 { font-size: clamp(1.5rem, 7vw, 2rem); }
    .projects-intro { font-size: .8rem; }
    .project-card { padding: 22px 20px 20px; box-shadow: 5px 6px 0 var(--project-layer), 9px 10px 0 var(--project-ink); }
    :global(html[data-theme="dark"] .project-card) { box-shadow: 5px 6px 0 #e5222d, 9px 10px 0 #000; }
    .project-topline { margin-bottom: 18px; }
    .project-number { font-size: 3.7rem; }
    .project-titleline { gap: 14px; }
    .project-symbol { flex-basis: 48px; height: 48px; }
    h4 { font-size: clamp(1.2rem, 6vw, 1.65rem); }
    .project-repo { font-size: .61rem; }
    .project-headline { font-size: .9rem; }
    .project-description { font-size: .8rem; }
    .project-footer { flex-wrap: wrap; gap: 12px; }
    .project-detail { flex: 1 1 130px; }
    .projects-signoff { font-size: .51rem; letter-spacing: .08em; }
    .projects-signoff span:last-child { text-align: right; }
}

@media (prefers-reduced-motion: reduce) {
    .project-card, .all-projects svg, .project-link svg { transition: none; }
}
</style>
