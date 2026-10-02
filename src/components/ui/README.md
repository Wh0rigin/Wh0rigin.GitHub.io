# 连线世界：共用 UI

共用样式已用于博客、开源项目、教育经历、导航和页脚。三个主题会自动应用，不需要在每个新组件中重复写主题判断。

## 文件分工

- `src/styles/tokens.css`：全站主题、颜色、字体、字号、间距、内容宽度和动画速度。
- `src/styles/primitives.css`：按钮、标签、层叠文字、面板、容器、标签列表和正文排版的实际绘制规则。
- 当前目录的 Vue 组件：提供语义正确、可直接调用的按钮、标签和层叠文字。
- 各页面的样式：保留业务布局、专用插画和特殊动画，通过局部变量调整共用 UI 的尺寸。

两个 CSS 文件在 `App.vue` 中统一引入，新页面不用再次引入。

## 按钮与链接：WiredAction

```vue
<script setup lang="ts">
import WiredAction from '../components/ui/WiredAction.vue';

function saveDraft() {
  // 在这里接入实际的草稿保存逻辑。
}
</script>

<template>
  <WiredAction to="/blog" arrow="right">阅读博客</WiredAction>
  <WiredAction href="https://github.com/Wh0rigin" variant="paper"
    arrow="up-right" target="_blank" rel="noopener noreferrer">GitHub</WiredAction>
  <WiredAction variant="ghost" arrow="left" to="/">回到主页</WiredAction>
  <WiredAction arrow="none" @click="saveDraft">保存草稿</WiredAction>
</template>
```

- `to` 渲染站内 RouterLink；`href` 渲染普通链接；两者都不传时渲染 button。一次使用一种跳转方式。
- `variant`：`primary`（主题色层叠）、`paper`（浅色层叠）、`ghost`（纯文字）。
- `arrow`：`right`、`up-right`、`left`、`none`。
- 普通按钮支持 `type` 和 `disabled`。`aria-label`、`target`、`rel`、`class` 和点击事件会传给实际元素。
- 请勿在按钮/链接内部再嵌套另一个按钮/链接。

## 标签：WiredBadge

```vue
<WiredBadge as="p">Selected work</WiredBadge>
<WiredBadge variant="soft" flat>DEMO</WiredBadge>
<WiredBadge variant="outline" flat>FIELD NOTES</WiredBadge>
<ul class="wired-tags">
  <WiredBadge as="li" variant="tag" flat>TypeScript</WiredBadge>
</ul>
```

`as` 支持 `span`、`p`、`li`。`solid` 是默认的层叠色块；`soft` 是浅底标签；`outline` 是描边标签；`tag` 是技术标签。`flat` 去掉阴影。

## 层叠文字：WiredAccent

```vue
<h2>代码里的 <WiredAccent :depth="3">一些想法</WiredAccent></h2>
```

`depth` 默认是 `2`，也可以使用 `3`。文字与背景分开绘制，装饰层不会拦截点击。

## 共用样式类

```vue
<section class="wired-container">
  <p class="wired-kicker">
    <span class="wired-kicker-mark" aria-hidden="true"></span> FIELD NOTES
  </p>
  <article class="wired-panel wired-panel--interactive custom-card">
    <h2>标题</h2>
    <p>内容</p>
  </article>
</section>
```

- `wired-container`：统一最大宽度与左右留白。
- `wired-panel`：主题配色、边框和两层阴影；自行设置内容的 padding。
- `wired-panel--interactive`：鼠标悬停时抬起，适合可点击卡片或现有项目卡片。
- `wired-kicker` / `wired-kicker-mark`：小标题与斜切标记。
- `wired-tags`：可换行的标签列表。
- `wired-prose`：长文的标题、段落、列表、引用及手机字号。

面板类可以直接加到 `article`、`ol` 或 `router-link` 上，不需要额外的包装节点。

## 正文排版

```vue
<article class="wired-panel wired-prose custom-article">
  <section id="intro">
    <h2>介绍</h2>
    <p>第一段正文。</p>
    <p>第二段正文。</p>
    <blockquote><p>引用内容。</p></blockquote>
    <ul><li>一个要点。</li></ul>
  </section>
</article>
```

正文以 section 为章节。引言、作者信息和文章尾注可以放在 section 外，避免套用正文段落的格式。

## 调整局部尺寸

用 CSS 变量调整尺寸和细节，让绘制规则继续由公共样式负责：

```css
.custom-card {
  padding: var(--space-6);
  --ui-panel-shadow: 6px 6px 0 var(--ui-layer), 11px 11px 0 var(--ui-stage-shadow);
}

.compact-action {
  --ui-action-padding: 10px 14px;
  --ui-action-gap: 9px;
  --ui-action-size: .8rem;
  --ui-action-offset: 4px;
}

.custom-title {
  --ui-accent-offset: 8px;
  --ui-accent-transform: rotate(-2deg) skewX(-5deg);
}

@media (max-width: 680px) {
  .custom-page { --ui-container-gutter: 36px; }
}
```

常用全站变量：`--ui-accent`、`--ui-layer`、`--ui-paper`、`--ui-copy`、`--ui-muted`、`--ui-line`、`--ui-stage-text`、`--font-body`、`--font-display`、`--font-mono`、`--space-1` 到 `--space-8`（提供 1、2、3、4、6、8）、`--layout-content-width`、`--motion-panel`。

新增内容优先组合现有组件和样式类。需要改变整个网站的颜色、字体或动效时修改 tokens；需要改变所有层叠按钮的绘制方式时修改 primitives。人物图像、唱片、聚光灯、加载页等专用视觉继续在各自的业务组件中维护。
