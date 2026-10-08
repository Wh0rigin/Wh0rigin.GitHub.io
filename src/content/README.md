# 添加博客文章

文章摘要放在 `posts.ts`，正文放在 `articles/`。列表只加载摘要，点开文章后再加载对应正文；目录由正文的章节生成。

1. 在 `posts.ts` 的 `posts` 数组中新增一个 `BlogEntry` 对象。
2. `slug` 使用唯一的英文小写短横线名称，例如 `my-first-project`，对应 `/blog/my-first-project`。
3. 填写 `title`、`subtitle`、`date`（`YYYY-MM-DD`）、`summary`、`category`、`tags` 和预计阅读分钟数。`issue` 是展示编号，例如 `002`。
4. 在 `articles/` 新建对应的正文文件，默认导出 `BlogSection[]`。每段填写唯一的 `id`、标题和 `paragraphs`，也可以额外添加 `quote` 或 `items` 列表。
5. 在 `postContent.ts` 的 `articleLoaders` 中，用文章的 `slug` 注册正文文件的动态导入。
6. 正式文章省略 `demo`，或设为 `false`。

## 章节中的外部链接

在对应章节添加 `links`，页面会使用共用的层叠按钮展示，并在新标签页打开：

```ts
links: [
    { label: '在 BGM.tv 查看我的追番记录', href: '你的完整 BGM.tv 记录网址' },
],
```

将示例中的网址替换为实际的 `https://` 地址。动画随笔可以保留自己的感想，完整的观看状态与评分通过此入口查看。

## 每篇文章的封面文字

可在文章对象中添加 `artwork`，让列表与详情封面使用这篇文章自己的文字。省略时使用第一篇文章的默认封面文字：

```ts
artwork: {
    headline: 'ANIME,',
    highlight: 'NOTES.',
    caption: 'STORIES THAT STAY WITH ME.',
},
```

建议主标题每行控制在 6 个英文字母左右，避免在手机或详情页的小封面中挤出边界。

列表按日期倒序排列，同一天发布的文章按 `issue` 编号倒序排列。构建时会为博客列表和每篇文章输出目录入口 HTML，使 GitHub Pages 支持直接打开、刷新文章链接。内容以 Vue 文本插值渲染，不需要写 HTML。
